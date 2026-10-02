// Try seed files before they are pushed: office/data/db.js plus the rows of the given seed files, as a db.js.
//   node tools/seed-json.mjs db/seed/51-derek.sql [more.sql] --out /tmp/db-try.js [--json /tmp/db-try.json]
// Then: node tools/db-lint.mjs /tmp/db-try.js, or SO_DB_JSON=/tmp/db-try.json tools/office-check.sh <outdir>.
// Reads `REPLACE INTO <table> (<columns>) VALUES (…), (…)`, `UPDATE <table> SET <col> = <value>[, …] WHERE <col> = <value> [AND …]` and `DELETE FROM <table> WHERE <col> IN (…) [AND <col> = …]` statements (split like tools/dolt.mjs: a semicolon
// at the end of a line). Also says which statements are too long for the DoltHub write API.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const args = process.argv.slice(2), files = [];
let out = null, json = null;
for (let i = 0; i < args.length; i++) { if (args[i] === '--out') out = args[++i]; else if (args[i] === '--json') json = args[++i]; else files.push(args[i]); }
if (!files.length || (!out && !json)) { console.error('usage: node tools/seed-json.mjs <seed.sql…> --out <db.js> [--json <db.json>]'); process.exit(2); }
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'office', 'data', 'db.js'), 'utf8'), ctx);
const DB = JSON.parse(JSON.stringify(ctx.window.SO_DB));
const KEYS = { config: ['k'], places: ['id'], npcs: ['id'], chatter: ['npc', 'seq'], episodes: ['id'], turns: ['episode', 'seq'], phrases: ['id'], items: ['id'],
  calendar: ['hero', 'day', 'time'], schedule: ['npc', 'seq'], weather: ['day'], smalltalk: ['topic', 'seq'], bills: ['id'], heroes: ['id'], messages: ['id'], holidays: ['date'], recipes: ['id'], replies: ['id'], mail: ['id'], radio: ['id'], tv: ['id'], routines: ['id'], tasks: ['id'] };
const JSON_COLS = { turns: ['answers', 'distractors', 'hints', 'hints_ko', 'distractors_ko', 'reactions', 'reactions_ko'], tasks: ['choices'] };
const DEFAULTS = { episodes: { hero: 'jun' }, calendar: { hero: 'jun' }, messages: { hero: 'all', kind: 'text' }, holidays: { kind: 'observance' }, replies: { tone: 'good', delay: 10 }, mail: { hero: 'all', kind: 'junk' }, radio: { kind: 'news', sort: 0 }, tv: { kind: 'news', live: 0, sort: 0 }, routines: { hero: 'all', every: 'week', parity: 0, miss_points: 5, sort: 0 }, tasks: { hero: 'all', day_from: 1, sort: 0 } };
const PAD = 3 + 'sim-office seed '.length * 64 + 1;
let bad = 0;
function values(text, where) {            // the tuples of a VALUES list: strings ('' is a quote), numbers, NULL
  const rows = [];
  let i = 0, row = null;
  const fail = (msg) => { throw new Error(`${where}: ${msg} near "${text.slice(Math.max(0, i - 40), i + 40).replace(/\s+/g, ' ')}"`); };
  while (i < text.length) {
    const c = text[i];
    if (/\s|,/.test(c)) { i++; continue; }
    if (c === '(' && !row) { row = []; i++; continue; }
    if (c === ')' && row) { rows.push(row); row = null; i++; continue; }
    if (!row) fail('expected (');
    if (c === "'") {
      let s = '';
      for (i++; i < text.length; i++) {
        if (text[i] === '\\') { s += text[i + 1]; i++; }
        else if (text[i] === "'" && text[i + 1] === "'") { s += "'"; i++; }
        else if (text[i] === "'") break;
        else s += text[i];
      }
      if (text[i] !== "'") fail('string not closed');
      i++;
      row.push(s);
    } else {
      const m = /^(NULL|-?\d+(\.\d+)?)/i.exec(text.slice(i));
      if (!m) fail('unexpected value');
      row.push(/null/i.test(m[1]) ? null : Number(m[1]));
      i += m[1].length;
    }
  }
  if (row) fail('tuple not closed');
  return rows;
}
for (const file of files) {
  const clean = fs.readFileSync(file, 'utf8').split('\n').filter(l => !/^\s*--/.test(l)).join('\n');
  const list = clean.split(/;\s*\n/).map(s => s.trim()).filter(Boolean).map(s => s.replace(/;$/, ''));
  list.forEach((sql, n) => {
    const where = `${path.basename(file)} statement ${n + 1}`;
    const size = encodeURIComponent(sql).length + PAD;
    if (size > 15500) { console.log(`${where}: too long for the DoltHub API (${size} bytes URL-encoded, limit 15500): split the VALUES list`); bad++; }
    const del = /^DELETE\s+FROM\s+`?(\w+)`?\s+WHERE\s+([\s\S]+)$/i.exec(sql);
    if (del) {          // DELETE FROM t WHERE col IN (…) [AND col = v …]
      const t = del[1], conds = del[2].split(/\s+AND\s+/i).map(c => {
        const mm = /^`?(\w+)`?\s*(=|IN)\s*([\s\S]+)$/i.exec(c.trim());
        if (!mm) return null;
        const vals = values(/^IN$/i.test(mm[2]) ? mm[3] : `(${mm[3]})`, where)[0].map(String);
        return (r) => vals.includes(String(r[mm[1]] ?? (DEFAULTS[t] || {})[mm[1]]));
      });
      if (!DB[t] || conds.some(c => !c)) { console.log(`${where}: cannot read this DELETE (left out): ${sql.slice(0, 60)}`); bad++; return; }
      const before = DB[t].length;
      DB[t] = DB[t].filter(r => !conds.every(c => c(r)));
      console.log(`${where}: ${t} ${before - DB[t].length} row(s) deleted`);
      return;
    }
    const up = /^UPDATE\s+`?(\w+)`?\s+SET\s+([\s\S]+?)\s+WHERE\s+([\s\S]+)$/i.exec(sql);
    if (up && !/\bCASE\b/i.test(up[2])) {          // UPDATE t SET col = v[, col = v] WHERE col = v [AND col = v] (values like in VALUES)
      const t = up[1], sets = [], re = /\s*`?(\w+)`?\s*=\s*('(?:[^'\\]|\\.|'')*'|NULL|-?\d+(?:\.\d+)?)\s*(?:,|$)/giy;
      let mm, ok = true;
      while ((mm = re.exec(up[2].trim()))) sets.push([mm[1], values(`(${mm[2]})`, where)[0][0]]);
      const conds = up[3].split(/\s+AND\s+/i).map(c => { const x = /^`?(\w+)`?\s*=\s*([\s\S]+)$/.exec(c.trim()); return x ? [x[1], String(values(`(${x[2]})`, where)[0][0])] : (ok = false); });
      if (!DB[t] || !sets.length || !ok) { console.log(`${where}: cannot read this UPDATE (left out): ${sql.slice(0, 60)}`); bad++; return; }
      const hit = DB[t].filter(r => conds.every(([c, v]) => String(r[c] ?? (DEFAULTS[t] || {})[c]) === v));
      hit.forEach(r => sets.forEach(([c, v]) => { r[c] = (JSON_COLS[t] || []).includes(c) && typeof v === 'string' ? JSON.parse(v) : v; }));
      console.log(`${where}: ${t} ${hit.length} row(s) updated`);
      return;
    }
    const m = /^REPLACE\s+INTO\s+`?(\w+)`?\s*\(([^)]*)\)\s*VALUES\s*([\s\S]*)$/i.exec(sql);
    if (!m) { console.log(`${where}: not a REPLACE INTO … VALUES statement (left out): ${sql.slice(0, 60)}`); return; }
    const t = m[1], cols = m[2].split(',').map(s => s.trim().replace(/`/g, ''));
    if (!KEYS[t]) { console.log(`${where}: unknown table ${t}`); bad++; return; }
    let rows;
    try { rows = values(m[3], where); } catch (e) { console.log(e.message); bad++; return; }
    rows.forEach((r, k) => {
      if (r.length !== cols.length) { console.log(`${where}: row ${k + 1} has ${r.length} values for ${cols.length} columns (${String(r[0])}, ${String(r[1])})`); bad++; return; }
      const o = Object.assign({}, DEFAULTS[t] || {});
      cols.forEach((c, j) => { o[c] = r[j]; });
      for (const c of JSON_COLS[t] || []) if (typeof o[c] === 'string') { try { o[c] = JSON.parse(o[c]); } catch (e) { console.log(`${where}: ${t}.${c} of ${r[0]}/${r[1]} is not JSON: ${e.message}`); bad++; } }
      if (t === 'config') { DB.config[o.k] = isNaN(o.v) ? o.v : Number(o.v); return; }
      DB[t] = DB[t] || [];
      const at = DB[t].findIndex(x => KEYS[t].every(k => String(x[k] ?? (DEFAULTS[t] || {})[k]) === String(o[k])));
      if (at >= 0) DB[t][at] = Object.assign({}, DB[t][at], o); else DB[t].push(o);
    });
    console.log(`${where}: ${t} ${rows.length} row(s), ${size} bytes`);
  });
}
if (out) fs.writeFileSync(out, `window.SO_DB = ${JSON.stringify(DB, null, 1)};\n`);
if (json) fs.writeFileSync(json, JSON.stringify(DB));
console.log(`${bad} problem(s)` + (out ? `, wrote ${out}` : '') + (json ? `, wrote ${json}` : ''));
process.exit(bad ? 1 : 0);

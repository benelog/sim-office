// DoltHub helper for the Sim Office game data (database benelog/sim-office, branch main).
//   node tools/dolt.mjs push db/schema.sql db/seed/*.sql   # run each SQL statement through the DoltHub write API (one commit per statement)
//   node tools/dolt.mjs query "select count(*) from episodes"
//   node tools/dolt.mjs pull                                # every table → office/data/db.js (window.SO_DB), so the game runs from file://
// Needs DOLTHUB_TOKEN (see .envrc). The write API takes one statement per operation, so seeds should use
// multi-row INSERTs. Statements are split on ";\n" (a semicolon at the end of a line); comments (-- …) are dropped.
import fs from 'node:fs';
import path from 'node:path';

const OWNER = 'benelog', REPO = 'sim-office', BRANCH = 'main';
const API = `https://www.dolthub.com/api/v1alpha1/${OWNER}/${REPO}`;
const TOKEN = process.env.DOLTHUB_TOKEN;
if (!TOKEN) { console.error('DOLTHUB_TOKEN is not set (source .envrc)'); process.exit(2); }
const H = { authorization: 'token ' + TOKEN };
const TABLES = ['config', 'places', 'npcs', 'chatter', 'episodes', 'turns', 'phrases', 'items', 'calendar', 'schedule', 'weather', 'smalltalk', 'bills', 'heroes', 'messages', 'holidays', 'recipes', 'replies', 'mail', 'radio', 'tv', 'routines', 'tasks', 'plans', 'friends', 'cards'];
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function query(sql) {
  const r = await (await fetch(`${API}/${BRANCH}?q=${encodeURIComponent(sql)}`, { headers: H })).json();
  if (r.query_execution_status !== 'Success') throw new Error(r.query_execution_message + '\n  in: ' + sql.slice(0, 200));
  return r;
}
// DoltHub names each commit "Run SQL query: <statement>" cut at ~1000 bytes; a cut inside a Korean character fails
// the write ("Incorrect string value … for column 'description'"), so every statement gets an ASCII comment of
// more than 1000 bytes in front. Concurrent pushes fail with "dataset head is not ancestor of commit": retried.
const PAD = '-- ' + 'sim-office seed '.repeat(64) + '\n';
async function write(sql, tries) {
  const enc = encodeURIComponent(PAD + sql);
  if (enc.length > 15500) throw new Error(`statement too long for the DoltHub API (${enc.length} bytes URL-encoded, limit ~16000): split the VALUES list\n  in: ` + sql.slice(0, 120));
  let r;
  try { r = await (await fetch(`${API}/write/${BRANCH}/${BRANCH}?q=${enc}`, { method: 'POST', headers: H })).json(); }
  catch (e) { if ((tries || 0) < 6) { await sleep(3000); return write(sql, (tries || 0) + 1); } throw e; }   // a network hiccup
  if (!r.operation_name) throw new Error(JSON.stringify(r).slice(0, 300));
  for (let i = 0; i < 60; i++) {
    await sleep(1500);
    const s = await (await fetch(`${API}/write?operationName=${encodeURIComponent(r.operation_name)}`, { headers: H })).json();
    if (s.done) {
      const d = s.res_details || {};
      if (d.query_execution_status !== 'Success') {
        if (/not ancestor|conflict/i.test(d.query_execution_message) && (tries || 0) < 6) { await sleep(2000 + Math.random() * 3000); return write(sql, (tries || 0) + 1); }
        throw new Error(d.query_execution_message + '\n  in: ' + sql.slice(0, 300));
      }
      return d;
    }
  }
  throw new Error('operation timed out: ' + sql.slice(0, 100));
}
function statements(text) {
  const clean = text.split('\n').filter(l => !/^\s*--/.test(l)).join('\n');
  return clean.split(/;\s*\n/).map(s => s.trim()).filter(Boolean).map(s => s.replace(/;$/, ''));
}

const [cmd, ...args] = process.argv.slice(2);
if (cmd === 'query') {
  const r = await query(args.join(' '));
  console.log(JSON.stringify(r.rows, null, 1));
} else if (cmd === 'push') {
  for (const file of args) {
    const list = statements(fs.readFileSync(file, 'utf8'));
    console.log(`${file}: ${list.length} statement(s)`);
    for (const [i, sql] of list.entries()) {
      const t = Date.now();
      try { await write(sql); console.log(`  ${i + 1}/${list.length} ok (${((Date.now() - t) / 1000).toFixed(1)}s) ${sql.slice(0, 60).replace(/\s+/g, ' ')}`); }
      catch (e) { console.error(`  ${i + 1}/${list.length} FAILED: ${e.message}`); process.exit(1); }
    }
  }
} else if (cmd === 'pull') {
  const db = {};
  for (const t of TABLES) {
    const rows = [];
    for (let off = 0; ; off += 500) {
      let r;
      try { r = await query(`select * from \`${t}\` limit 500 offset ${off}`); }
      catch (e) { if (/not found|does not exist/i.test(e.message)) { console.log(`(no table ${t})`); break; } throw e; }
      const types = Object.fromEntries(r.schema.map(c => [c.columnName, c.columnType]));
      r.rows.forEach(row => {
        Object.keys(row).forEach(k => {
          const v = row[k], ty = types[k] || '';
          if (v === null || v === undefined) return;
          if (/^json/.test(ty)) row[k] = typeof v === 'string' ? JSON.parse(v) : v;
          else if (/int|decimal|float|double/.test(ty)) row[k] = Number(v);
        });
        rows.push(row);
      });
      if (r.rows.length < 500) break;
    }
    db[t] = rows;
    console.log(`${t}: ${rows.length} rows`);
  }
  if (db.config) db.config = Object.fromEntries(db.config.map(r => [r.k, isNaN(r.v) ? r.v : Number(r.v)]));
  const out = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'office', 'data', 'db.js');
  fs.writeFileSync(out, `/* Generated by tools/dolt.mjs pull from DoltHub ${OWNER}/${REPO} (${new Date().toISOString()}). Do not edit: change the database and pull again. */\nwindow.SO_DB = ${JSON.stringify(db, null, 1)};\n`);
  console.log('wrote', out);
} else {
  console.log('usage: node tools/dolt.mjs push <sql files> | query <sql> | pull');
}

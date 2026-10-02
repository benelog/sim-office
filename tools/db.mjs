// The game data: db/ (the modules people write, see db/README.md) → office/data/db.js (what the game reads), and the
// published copy on DoltHub (benelog/sim-office).
//   node tools/db.mjs build [--out <db.js>] [--json <db.json>] [--no-lint]   # db/ → office/data/db.js, then tools/db-lint.mjs
//   node tools/db.mjs diff [--sql <file>]        # what differs between db/ and DoltHub (the statements push would send)
//   node tools/db.mjs push                       # send those changes to DoltHub (REPLACE / DELETE, one commit each)
//   node tools/db.mjs pull [--out <db.js>]       # DoltHub → office/data/db.js (to look at what is published)
//   node tools/db.mjs query "select …"           # a read on DoltHub
//   node tools/db.mjs sql <file.sql…>            # run SQL statements on DoltHub as they are (schema changes: ALTER TABLE …)
// diff, push, pull, query and sql need DOLTHUB_TOKEN (source .envrc).
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { readSchema, normalizeRow, sortRows, keyOf, gameData, writeGameData, ROOT } from './lib/schema.mjs';
import { readSources } from './lib/sources.mjs';
import * as dolt from './lib/dolthub.mjs';

const [cmd, ...rest] = process.argv.slice(2);
const opt = (name) => { const i = rest.indexOf(name); return i >= 0 ? rest[i + 1] : null; };
const schema = readSchema();

async function local() {
  const { tables, problems } = await readSources(schema);
  if (problems.length) { problems.forEach(p => console.error(p)); console.error(`${problems.length} problem(s) in db/`); process.exit(1); }
  return tables;
}

// the published tables, normalized like the local ones; columns DoltHub has and db/schema.sql does not are reported
async function published() {
  const out = {};
  for (const t of Object.keys(schema)) {
    const rows = await dolt.tableRows(t);
    if (!rows) { console.log(`(no table ${t} on DoltHub)`); out[t] = []; continue; }
    const extra = rows.length ? Object.keys(rows[0]).filter(c => !schema[t].col[c]) : [];
    if (extra.length) console.log(`warn: DoltHub ${t} has columns that db/schema.sql does not: ${extra.join(', ')}`);
    out[t] = rows.map(r => normalizeRow(schema[t], r));
  }
  return out;
}

const sqlValue = (col, v) => v == null ? 'NULL'
  : col.kind === 'num' ? String(Number(v))
  : `'${(col.kind === 'json' ? JSON.stringify(v) : String(v)).replace(/\\/g, '\\\\').replace(/'/g, "''")}'`;

// the statements that make DoltHub hold what db/ holds: REPLACE for new and changed rows (as few statements as fit
// the API), DELETE for rows that are gone
function changes(mine, theirs) {
  const sql = [], report = [];
  for (const t of Object.keys(schema)) {
    const S = schema[t];
    const a = new Map(sortRows(S, (mine[t] || []).map(r => normalizeRow(S, r))).map(r => [keyOf(S, r), r]));
    const b = new Map((theirs[t] || []).map(r => [keyOf(S, r), r]));
    const put = [...a.values()].filter(r => !b.has(keyOf(S, r)) || JSON.stringify(b.get(keyOf(S, r))) !== JSON.stringify(r));
    const gone = [...b.values()].filter(r => !a.has(keyOf(S, r)));
    if (!put.length && !gone.length) continue;
    const name = (r) => S.pk.map(k => r[k]).join('/');
    report.push(`${t}: ${put.filter(r => b.has(keyOf(S, r))).length} changed, ${put.filter(r => !b.has(keyOf(S, r))).length} new, ${gone.length} gone` +
      `\n  ${put.concat(gone).slice(0, 12).map(r => (gone.includes(r) ? '−' : b.has(keyOf(S, r)) ? '~' : '+') + name(r)).join(' ')}${put.length + gone.length > 12 ? ' …' : ''}`);
    const head = `REPLACE INTO ${t} (${S.cols.map(c => c.name).join(', ')}) VALUES\n`;
    let batch = [];
    const flush = () => { if (batch.length) sql.push(head + batch.join(',\n')); batch = []; };
    for (const r of put) {
      const tuple = `  (${S.cols.map(c => sqlValue(c, r[c.name])).join(', ')})`;
      if (batch.length && dolt.statementSize(head + batch.concat(tuple).join(',\n')) > dolt.MAX_URL) flush();
      batch.push(tuple);
    }
    flush();
    for (let i = 0; i < gone.length; i += 50) {
      const where = gone.slice(i, i + 50).map(r => '(' + S.pk.map(k => `${k} = ${sqlValue(S.col[k], r[k])}`).join(' AND ') + ')').join(' OR ');
      sql.push(`DELETE FROM ${t} WHERE ${where}`);
    }
  }
  return { sql, report };
}

async function run(list) {
  for (const [i, sql] of list.entries()) {
    const t = Date.now();
    try { await dolt.write(sql); console.log(`  ${i + 1}/${list.length} ok (${((Date.now() - t) / 1000).toFixed(1)}s) ${sql.slice(0, 70).replace(/\s+/g, ' ')}`); }
    catch (e) { console.error(`  ${i + 1}/${list.length} FAILED: ${e.message}`); process.exit(1); }
  }
}

if (cmd === 'build') {
  const db = gameData(schema, await local());
  const out = opt('--out'), json = opt('--json');
  const file = writeGameData(db, 'build from db/', out || undefined);
  console.log('wrote ' + path.relative(ROOT, file) + Object.keys(db).filter(t => t !== 'config').map((t, i) => (i % 8 ? ' ' : '\n  ') + `${t} ${db[t].length}`).join(','));
  if (json) { fs.writeFileSync(json, JSON.stringify(db)); console.log('wrote ' + json); }
  if (!rest.includes('--no-lint')) process.exit(spawnSync(process.execPath, [path.join(ROOT, 'tools', 'db-lint.mjs'), file], { stdio: 'inherit' }).status);
} else if (cmd === 'diff' || cmd === 'push') {
  const { sql, report } = changes(await local(), await published());
  if (!sql.length) { console.log(`DoltHub ${dolt.NAME} holds what db/ holds.`); process.exit(0); }
  report.forEach(l => console.log(l));
  if (opt('--sql')) { fs.writeFileSync(opt('--sql'), sql.join(';\n\n') + ';\n'); console.log('wrote ' + opt('--sql')); }
  if (cmd === 'diff') console.log(`${sql.length} statement(s): node tools/db.mjs push sends them`);
  else { console.log(`pushing ${sql.length} statement(s) to ${dolt.NAME}`); await run(sql); }
} else if (cmd === 'pull') {
  const file = writeGameData(gameData(schema, await published()), `pull from DoltHub ${dolt.NAME} (${new Date().toISOString()})`, opt('--out') || undefined);
  console.log('wrote ' + path.relative(ROOT, file));
} else if (cmd === 'query') {
  console.log(JSON.stringify((await dolt.query(rest.join(' '))).rows, null, 1));
} else if (cmd === 'sql') {
  for (const f of rest) { const list = dolt.statements(fs.readFileSync(f, 'utf8')); console.log(`${f}: ${list.length} statement(s)`); await run(list); }
} else {
  console.log(fs.readFileSync(new URL(import.meta.url), 'utf8').split('\n').filter(l => l.startsWith('//')).map(l => l.slice(3)).join('\n'));
  process.exit(cmd ? 2 : 0);
}

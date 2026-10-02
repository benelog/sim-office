// The DoltHub API for the published copy of the game data (database benelog/sim-office, branch main).
// Reads go through the SQL read API; writes through the write API, one statement (one commit) at a time.
// Needs DOLTHUB_TOKEN (see .envrc).
const OWNER = 'benelog', REPO = 'sim-office', BRANCH = 'main';
export const NAME = `${OWNER}/${REPO}`;
const API = `https://www.dolthub.com/api/v1alpha1/${OWNER}/${REPO}`;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function headers() {
  if (!process.env.DOLTHUB_TOKEN) { console.error('DOLTHUB_TOKEN is not set (source .envrc)'); process.exit(2); }
  return { authorization: 'token ' + process.env.DOLTHUB_TOKEN };
}

export async function query(sql) {
  const r = await (await fetch(`${API}/${BRANCH}?q=${encodeURIComponent(sql)}`, { headers: headers() })).json();
  if (r.query_execution_status !== 'Success') throw new Error(r.query_execution_message + '\n  in: ' + sql.slice(0, 200));
  return r;
}

// every row of a table (500 at a time), or null when there is no such table
export async function tableRows(t) {
  const rows = [];
  for (let off = 0; ; off += 500) {
    let r;
    try { r = await query(`select * from \`${t}\` limit 500 offset ${off}`); }
    catch (e) { if (/not found|does not exist/i.test(e.message)) return null; throw e; }
    rows.push(...r.rows);
    if (r.rows.length < 500) return rows;
  }
}

// DoltHub names each commit "Run SQL query: <statement>" cut at ~1000 bytes; a cut inside a Korean character fails
// the write ("Incorrect string value … for column 'description'"), so every statement gets an ASCII comment of
// more than 1000 bytes in front. Concurrent pushes fail with "dataset head is not ancestor of commit": retried.
const PAD = '-- ' + 'sim-office seed '.repeat(64) + '\n';
export const MAX_URL = 15500;
export const statementSize = (sql) => encodeURIComponent(PAD + sql).length;

export async function write(sql, tries = 0) {
  const enc = encodeURIComponent(PAD + sql);
  if (enc.length > MAX_URL) throw new Error(`statement too long for the DoltHub API (${enc.length} bytes URL-encoded, limit ~16000)\n  in: ` + sql.slice(0, 120));
  let r;
  try { r = await (await fetch(`${API}/write/${BRANCH}/${BRANCH}?q=${enc}`, { method: 'POST', headers: headers() })).json(); }
  catch (e) { if (tries < 6) { await sleep(3000); return write(sql, tries + 1); } throw e; }   // a network hiccup
  if (!r.operation_name) throw new Error(JSON.stringify(r).slice(0, 300));
  for (let i = 0; i < 60; i++) {
    await sleep(1500);
    const s = await (await fetch(`${API}/write?operationName=${encodeURIComponent(r.operation_name)}`, { headers: headers() })).json();
    if (s.done) {
      const d = s.res_details || {};
      if (d.query_execution_status !== 'Success') {
        if (/not ancestor|conflict/i.test(d.query_execution_message) && tries < 6) { await sleep(2000 + Math.random() * 3000); return write(sql, tries + 1); }
        throw new Error(d.query_execution_message + '\n  in: ' + sql.slice(0, 300));
      }
      return d;
    }
  }
  throw new Error('operation timed out: ' + sql.slice(0, 100));
}

// the statements of a .sql file: split on a semicolon at the end of a line, comment lines (-- …) dropped
export function statements(text) {
  const clean = text.split('\n').filter(l => !/^\s*--/.test(l)).join('\n');
  return clean.split(/;\s*\n/).map(s => s.trim()).filter(Boolean).map(s => s.replace(/;$/, ''));
}

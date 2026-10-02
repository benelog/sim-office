// The game data as people write it: the modules under db/ (db/world/*.mjs, db/scenarios/<hero>/*.mjs), read into the
// rows of the tables in db/schema.sql. See db/README.md for the shape. A module exports one array (or object) per
// table, and these are written inside what they belong to:
//   episodes[].turns      the turns in order (seq 1, 2, …); distractors [{ text, text_ko, reaction, reaction_ko }]
//                         stand for the four columns distractors, distractors_ko, reactions, reactions_ko
//   episodes[].calendar   its entry on the hero's calendar ({ day, time, title, title_ko }: place and hero come from
//                         the episode)
//   episodes[].phrases    the expressions it teaches
//   npcs[].chatter        what the person says in passing, in turn ({ line, line_ko })
//   npcs[].schedule       where the person is through the day, first match wins ({ days, time_from, time_to, place })
//   messages[].replies    the answers you can send ({ label, label_ko, tone, … }: id <msg>_a, _b … and sort 1, 2 …)
//   smalltalk             { '<topic>': [{ line, line_ko }] }
//   config                { <k>: [<v>, '<note>'] }
// `export const hero = 'derek'` gives the hero of the module's episodes and calendar rows that do not say.
// A seq, id or sort written out wins over the one the order gives.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT } from './schema.mjs';

const LETTERS = 'abcdefghijklmnopqrstuvwxyz';

export function sourceFiles(dir = path.join(ROOT, 'db')) {
  const out = [];
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name)).forEach(e => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else if (e.name.endsWith('.mjs')) out.push(p);
  });
  walk(dir);
  return out;
}

// → { tables: { name: rows }, where: { 'table key': file }, problems: [] }
export async function readSources(schema, files = sourceFiles()) {
  const tables = {}, where = {}, problems = [];
  const add = (t, row, file) => {
    if (!schema[t]) { problems.push(`${rel(file)}: no table ${t} in db/schema.sql`); return; }
    for (const k of Object.keys(row)) if (!schema[t].col[k]) problems.push(`${rel(file)}: ${t} ${row[schema[t].pk[0]]}: no column ${k}`);
    const key = t + ' ' + schema[t].pk.map(k => row[k]).join('/');
    if (where[key]) problems.push(`${rel(file)}: ${key} is also in ${rel(where[key])}`);
    where[key] = file;
    (tables[t] = tables[t] || []).push(row);
  };
  for (const file of files) {
    const mod = await import(pathToFileURL(file).href + '?t=' + fs.statSync(file).mtimeMs);
    for (const [name, value] of Object.entries(mod)) {
      if (name === 'hero') continue;
      if (name === 'config') { Object.entries(value).forEach(([k, v]) => add('config', Array.isArray(v) ? { k, v: String(v[0]), note: v[1] ?? null } : { k, v: String(v) }, file)); continue; }
      if (name === 'smalltalk') { Object.entries(value).forEach(([topic, list]) => list.forEach((r, i) => add('smalltalk', { topic, seq: i + 1, ...r }, file))); continue; }
      if (!Array.isArray(value)) { problems.push(`${rel(file)}: export ${name} is not a list`); continue; }
      for (const item of value) {
        const r = { ...item };
        if (name === 'episodes') {
          const { turns = [], phrases = [], calendar = [] } = r;
          delete r.turns; delete r.phrases; delete r.calendar;
          if (r.hero == null && mod.hero) r.hero = mod.hero;
          add('episodes', r, file);
          turns.forEach((t, i) => add('turns', turnRow(r.id, i + 1, t), file));
          phrases.forEach(p => add('phrases', { episode: r.id, ...p }, file));
          [].concat(calendar).forEach(c => add('calendar', { place: r.place, episode: r.id, hero: r.hero, ...c }, file));
        } else if (name === 'npcs') {
          const { chatter = [], schedule = [] } = r;
          delete r.chatter; delete r.schedule;
          add('npcs', r, file);
          chatter.forEach((c, i) => add('chatter', { npc: r.id, seq: i + 1, ...c }, file));
          schedule.forEach((s, i) => add('schedule', { npc: r.id, seq: i + 1, ...s }, file));
        } else if (name === 'messages') {
          const { replies = [] } = r;
          delete r.replies;
          add('messages', r, file);
          replies.forEach((x, i) => add('replies', { id: `${r.id}_${LETTERS[i]}`, msg: r.id, sort: i + 1, ...x }, file));
        } else if (name === 'calendar') {
          add('calendar', mod.hero && r.hero == null ? { ...r, hero: mod.hero } : r, file);
        } else add(name, r, file);
      }
    }
  }
  return { tables, where, problems };
}

function turnRow(episode, seq, t) {
  const r = { episode, seq, ...t };
  if (Array.isArray(t.distractors) && t.distractors.some(d => d && typeof d === 'object')) {
    const list = t.distractors, col = (k) => list.some(d => d[k] != null) ? list.map(d => d[k] ?? null) : null;
    r.distractors = list.map(d => d.text);
    r.distractors_ko = col('text_ko');
    r.reactions = col('reaction');
    r.reactions_ko = col('reaction_ko');
  }
  return r;
}

export const rel = (file) => path.relative(ROOT, file);

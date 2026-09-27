// Checks the Sim Office data pulled from DoltHub (office/data/db.js, made by `node tools/dolt.mjs pull`).
//   node tools/db-lint.mjs [path/to/db.js]
// Prints one line per problem and exits 1 if there are any (0 when clean). Warnings (prefixed "warn") do not fail.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.join(path.dirname(new URL(import.meta.url).pathname), '..');
const dbFile = process.argv[2] || path.join(root, 'office', 'data', 'db.js');
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(dbFile, 'utf8'), ctx, { filename: dbFile });
vm.runInContext(fs.readFileSync(path.join(root, 'lib', 'matcher.js'), 'utf8'), ctx, { filename: 'lib/matcher.js' });
const DB = ctx.window.SO_DB, M = ctx.window.LP_MATCHER;
if (!DB) { console.error('no window.SO_DB in ' + dbFile); process.exit(2); }

// Kenney Food Kit nodes available in the `food` pack (office/PLAN.md section 4).
const FOOD = new Set(`apple banana orange lemon grapes strawberry watermelon pear cherries avocado tomato onion carrot broccoli
cabbage corn pepper paprika mushroom pumpkin egg bread loaf loaf-baguette croissant muffin donut donut-sprinkles cookie cupcake
cake-slicer pancakes waffle burger burger-cheese fries hot-dog pizza pizza-box sandwich sub salad taco sushi-salmon maki-salmon
rice-ball chinese bowl-soup bowl-cereal plate plate-dinner glass mug cup-coffee cup-tea frappe soda soda-can soda-bottle
bottle-ketchup peanut-butter honey cheese bacon meat-patty sausage turkey fish can carton carton-small bag styrofoam ice-cream
popsicle candy-bar chocolate barrel`.split(/\s+/));
const MODELS = /^(man|woman)-[a-z]+(-\d)?$/;   // a person made by tools/office-characters.py (office/models/<id>.js)
const HHMM = /^([01]\d|2[0-3]):[0-5]\d$/;
const ITEM_KINDS = new Set(['grocery', 'meal', 'drink', 'fare', 'ticket', 'rent', 'other']);

const problems = [], warnings = [];
const bad = (where, msg) => problems.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`warn ${where}: ${msg}`);
const rows = (t) => Array.isArray(DB[t]) ? DB[t] : (bad(t, 'table missing'), []);
const ids = (t, key = 'id') => new Set(rows(t).map(r => r[key]));

const places = ids('places'), npcs = ids('npcs'), episodes = ids('episodes');
const npcById = Object.fromEntries(rows('npcs').map(n => [n.id, n]));

for (const p of rows('places')) {
  if (!p.zone) bad(`places ${p.id}`, 'no zone');
  if (!p.name_ko) warn(`places ${p.id}`, 'no name_ko');
}
for (const n of rows('npcs')) {
  const w = `npcs ${n.id}`;
  if (n.place && !places.has(n.place)) bad(w, `place "${n.place}" not in places`);
  if (!MODELS.test(n.model || '') || !fs.existsSync(path.join(root, 'office', 'models', n.model + '.js'))) bad(w, `model "${n.model}" is not a person in office/models (man-*, woman-*)`);
  if (n.voice_pitch != null && (n.voice_pitch < 0.5 || n.voice_pitch > 1.5)) bad(w, `voice_pitch ${n.voice_pitch} out of range`);
  if (n.voice_rate != null && (n.voice_rate < 0.5 || n.voice_rate > 1.5)) bad(w, `voice_rate ${n.voice_rate} out of range`);
}
for (const c of rows('chatter')) if (!npcs.has(c.npc)) bad(`chatter ${c.npc}/${c.seq}`, 'npc does not exist');

const heroes = new Set((DB.heroes || []).map(h => h.id));
for (const h of DB.heroes || []) {
  const w = `heroes ${h.id}`;
  for (const k of ['home_bed', 'home_kitchen', 'home_desk', 'home_door', 'desk']) if (h[k] && !places.has(h[k])) bad(w, `${k} "${h[k]}" not in places`);
  if (!fs.existsSync(path.join(root, 'office', 'models', h.model + '.js'))) bad(w, `model "${h.model}" is not in office/models`);
  if (!rows('episodes').some(e => (e.hero || 'jun') === h.id)) warn(w, 'has no episodes');
}
for (const e of rows('episodes')) {
  const w = `episodes ${e.id}`;
  if (heroes.size && !heroes.has(e.hero || 'jun')) bad(w, `hero "${e.hero}" not in heroes`);
  if (e.npc === (e.hero || 'jun')) bad(w, `the hero ${e.npc} cannot be the person of their own episode`);
  for (const r of String(e.requires || '').split(',').map(s => s.trim()).filter(Boolean)) {
    const req = rows('episodes').find(x => x.id === r);
    if (req && (req.hero || 'jun') !== (e.hero || 'jun')) bad(w, `requires ${r}, an episode of another hero`);
  }
  if (!places.has(e.place)) bad(w, `place "${e.place}" not in places`);
  if (!npcs.has(e.npc)) bad(w, `npc "${e.npc}" not in npcs`);
  else if (npcById[e.npc].place !== e.place) warn(w, `npc ${e.npc} normally stands at ${npcById[e.npc].place}, episode is at ${e.place}`);
  if (!HHMM.test(e.time_from || '') || !HHMM.test(e.time_to || '')) bad(w, `bad time ${e.time_from}–${e.time_to}`);
  else if (e.time_from >= e.time_to) bad(w, `time_from ${e.time_from} is not before time_to ${e.time_to}`);
  if (e.day_from > e.day_to) bad(w, `day_from ${e.day_from} > day_to ${e.day_to}`);
  if (!Number.isInteger(e.reward ?? 0) || !Number.isInteger(e.energy ?? 0)) bad(w, 'reward and energy must be whole numbers');
  const nt = rows('turns').filter(t => t.episode === e.id).length, np = rows('phrases').filter(p => p.episode === e.id).length;
  if (nt && (nt < 3 || nt > 6)) bad(w, `${nt} turns (want 3-6)`);
  if (np < 4 || np > 8) bad(w, `${np} phrases (want 4-8)`);
  for (const r of String(e.requires || '').split(',').map(s => s.trim()).filter(Boolean)) {
    if (!episodes.has(r)) bad(w, `requires unknown episode "${r}"`);
    else {
      const req = rows('episodes').find(x => x.id === r);
      if (req.day_from > e.day_to) bad(w, `requires ${r}, which only opens on day ${req.day_from}`);
    }
  }
}

const turnsBy = {};
for (const t of rows('turns')) (turnsBy[t.episode] = turnsBy[t.episode] || []).push(t);
for (const e of rows('episodes')) if (!turnsBy[e.id]) bad(`episodes ${e.id}`, 'has no turns');
const isStrArr = (a, n) => Array.isArray(a) && a.every(s => typeof s === 'string' && s.trim()) && (n == null || a.length === n);
for (const [ep, list] of Object.entries(turnsBy)) {
  if (!episodes.has(ep)) bad(`turns ${ep}`, 'episode does not exist');
  const seqs = list.map(t => t.seq).sort((a, b) => a - b);
  seqs.forEach((s, i) => { if (s !== i + 1) bad(`turns ${ep}`, `seq not 1..n: ${seqs.join(',')}`); });
  for (const t of list) {
    const w = `turns ${ep}#${t.seq}`;
    for (const who of [t.speaker, t.reply_speaker]) if (who && !npcs.has(who) && who !== 'player') bad(w, `speaker "${who}" not in npcs`);
    const hero = (rows('episodes').find(e => e.id === ep) || {}).hero || 'jun';
    for (const who of [t.speaker, t.reply_speaker]) if (who === hero) bad(w, `speaker "${who}" is the hero of this episode (the player)`);
    if (!t.line || !t.prompt || !t.model) bad(w, 'line, prompt and model are required');
    const groups = t.answers;
    if (!Array.isArray(groups) || !groups.length) { bad(w, 'answers is not a non-empty array'); continue; }
    for (const g of groups) {
      const ok = typeof g === 'string' || (g && typeof g === 'object' && (Array.isArray(g.all) || Array.isArray(g.any)) &&
        Object.keys(g).every(k => k === 'all' || k === 'any'));
      if (!ok) bad(w, `bad answer group ${JSON.stringify(g)}`);
    }
    if (!M.match(t.model, groups)) bad(w, `model does not match answers: "${t.model}"`);
    if (!isStrArr(t.distractors, 3)) bad(w, 'distractors must be 3 strings');
    else for (const d of t.distractors) {
      if (M.match(d, groups)) bad(w, `distractor matches answers: "${d}"`);
      if (M.normalize(d) === M.normalize(t.model)) bad(w, `distractor equals model: "${d}"`);
    }
    if (!isStrArr(t.hints, 2)) bad(w, 'hints must be 2 strings');
    if (t.hints_ko != null && !isStrArr(t.hints_ko, 2)) bad(w, 'hints_ko must be 2 strings');
    if (!t.situation_ko && t.situation) warn(w, 'no situation_ko');
    if (!t.prompt_ko) warn(w, 'no prompt_ko');
  }
}

for (const p of rows('phrases')) {
  const w = `phrases ${p.id}`;
  if (p.episode && !episodes.has(p.episode)) bad(w, `episode "${p.episode}" does not exist`);
  if (p.episode && !String(p.id).startsWith(p.episode + '.')) bad(w, `id should start with "${p.episode}."`);
}
for (const i of rows('items')) {
  const w = `items ${i.id}`;
  if (!ITEM_KINDS.has(i.kind)) bad(w, `kind "${i.kind}" is not one of ${[...ITEM_KINDS].join('/')}`);
  if (i.model && !FOOD.has(i.model)) bad(w, `model "${i.model}" is not a food pack node`);
  if (i.place && !places.has(i.place)) bad(w, `place "${i.place}" not in places`);
  if (!(i.price >= 0)) bad(w, `bad price ${i.price}`);
}
for (const c of rows('calendar')) {
  const w = `calendar ${c.hero || 'jun'} ${c.day} ${c.time}`;
  if (!HHMM.test(c.time || '')) bad(w, 'bad time');
  if (c.place && !places.has(c.place)) bad(w, `place "${c.place}" not in places`);
  if (heroes.size && !heroes.has(c.hero || 'jun')) bad(w, `hero "${c.hero}" not in heroes`);
  if (c.episode) {
    const e = rows('episodes').find(x => x.id === c.episode);
    if (!e) bad(w, `episode "${c.episode}" does not exist`);
    else if (c.day < e.day_from || c.day > e.day_to) bad(w, `episode ${e.id} is not open on day ${c.day}`);
    else if ((e.hero || 'jun') !== (c.hero || 'jun')) bad(w, `episode ${e.id} belongs to ${e.hero}, the calendar row to ${c.hero}`);
  }
}

const count = (t) => `${t} ${Array.isArray(DB[t]) ? DB[t].length : 0}`;
console.log(['places', 'npcs', 'chatter', 'episodes', 'turns', 'phrases', 'items', 'calendar'].map(count).join(', '));
warnings.forEach(l => console.log(l));
problems.forEach(l => console.log(l));
console.log(`${problems.length} problem(s), ${warnings.length} warning(s)`);
process.exit(problems.length ? 1 : 0);

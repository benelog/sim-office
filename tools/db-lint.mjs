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
const DB = ctx.window.SO_DB;
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
const ITEM_KINDS = new Set(['grocery', 'meal', 'drink', 'fare', 'ticket', 'rent', 'other', 'gear']);

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
// an episode's hero: a hero id, a list ('jun,derek') or all
const heroesOf = (h) => { const s = String(h || 'jun'); return s === 'all' ? Array.from(heroes) : s.split(',').map(x => x.trim()).filter(Boolean); };
for (const h of DB.heroes || []) {
  const w = `heroes ${h.id}`;
  for (const k of ['home_bed', 'home_kitchen', 'home_desk', 'home_door', 'desk']) if (h[k] && !places.has(h[k])) bad(w, `${k} "${h[k]}" not in places`);
  if (!fs.existsSync(path.join(root, 'office', 'models', h.model + '.js'))) bad(w, `model "${h.model}" is not in office/models`);
  if (!rows('episodes').some(e => heroesOf(e.hero).includes(h.id))) warn(w, 'has no episodes');
}
for (const e of rows('episodes')) {
  const w = `episodes ${e.id}`;
  if (heroes.size && (!heroesOf(e.hero).length || heroesOf(e.hero).some(h => !heroes.has(h)))) bad(w, `hero "${e.hero}" not in heroes`);
  if (heroesOf(e.hero).includes(e.npc)) bad(w, `the hero ${e.npc} cannot be the person of their own episode`);
  for (const r of String(e.requires || '').split(',').map(s => s.trim()).filter(Boolean)) {
    const req = rows('episodes').find(x => x.id === r);
    if (req && heroesOf(e.hero).some(h => !heroesOf(req.hero).includes(h))) bad(w, `requires ${r}, an episode of another hero`);
  }
  if (!places.has(e.place)) bad(w, `place "${e.place}" not in places`);
  if (!npcs.has(e.npc)) bad(w, `npc "${e.npc}" not in npcs`);
  else if (npcById[e.npc].place !== e.place) warn(w, `npc ${e.npc} normally stands at ${npcById[e.npc].place}, episode is at ${e.place}`);
  if (!HHMM.test(e.time_from || '') || !HHMM.test(e.time_to || '')) bad(w, `bad time ${e.time_from}–${e.time_to}`);
  else if (e.time_from >= e.time_to) bad(w, `time_from ${e.time_from} is not before time_to ${e.time_to}`);
  if (e.day_to != null && e.day_from > e.day_to) bad(w, `day_from ${e.day_from} > day_to ${e.day_to}`);          // NULL: no last day
  if (!Number.isInteger(e.reward ?? 0) || !Number.isInteger(e.energy ?? 0)) bad(w, 'reward and energy must be whole numbers');
  const nt = rows('turns').filter(t => t.episode === e.id).length, np = rows('phrases').filter(p => p.episode === e.id).length;
  if (nt && (nt < 3 || nt > 6)) bad(w, `${nt} turns (want 3-6)`);
  if (np > 8) warn(w, `${np} phrases (more than 8)`);          // phrases are kept in the save but no longer shown (2026-10-02): none is fine
  for (const r of String(e.requires || '').split(',').map(s => s.trim()).filter(Boolean)) {
    if (!episodes.has(r)) bad(w, `requires unknown episode "${r}"`);
    else {
      const req = rows('episodes').find(x => x.id === r);
      if (e.day_to != null && req.day_from > e.day_to) bad(w, `requires ${r}, which only opens on day ${req.day_from}`);
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
    const hs = heroesOf((rows('episodes').find(e => e.id === ep) || {}).hero);
    for (const who of [t.speaker, t.reply_speaker]) if (who && hs.includes(who)) bad(w, `speaker "${who}" is the hero of this episode (the player)`);
    // multiple choice only (2026-10-02): the model and three plausible wrong answers, each with how the other person reacts,
    // all in English and Korean (the screen shows one language). answers/hints are no longer used by the game.
    if (!t.line || !t.prompt || !t.model) bad(w, 'line, prompt and model are required');
    const norm = (x) => String(x).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    for (const k of ['distractors', 'distractors_ko', 'reactions', 'reactions_ko']) if (!isStrArr(t[k], 3)) bad(w, `${k} must be 3 strings`);
    if (isStrArr(t.distractors, 3)) for (const d of t.distractors) if (norm(d) === norm(t.model)) bad(w, `distractor equals model: "${d}"`);
    if (isStrArr(t.distractors, 3)) {
      const longest = Math.max(...t.distractors.map(d => d.length));
      if (t.model.length > longest * 1.3) warn(w, `the model (${t.model.length}) is much longer than every wrong answer (${longest}): a giveaway`);
    }
    for (const k of ['situation', 'line', 'prompt', 'model']) if (t[k] && !t[k + '_ko']) warn(w, `no ${k}_ko`);
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

const MSG_KINDS = new Set(['text', 'email', 'voicemail', 'alert']);
for (const m of DB.messages || []) {
  const w = `messages ${m.id}`;
  if (m.hero && m.hero !== 'all' && heroes.size && !heroes.has(m.hero)) bad(w, `hero "${m.hero}" not in heroes`);
  if (!HHMM.test(m.time || '')) bad(w, `bad time ${m.time}`);
  if (!(m.day >= 1)) bad(w, `bad day ${m.day}`);
  if (!MSG_KINDS.has(m.kind)) bad(w, `kind "${m.kind}" is not one of ${[...MSG_KINDS].join('/')}`);
  if (!m.sender || !m.body) bad(w, 'sender and body are required');
  if (m.hero && m.hero === m.sender) bad(w, 'the hero cannot send a message to themselves');
  if (m.kind === 'email' && !m.subject) warn(w, 'an email without a subject');
  if (!m.body_ko) warn(w, 'no body_ko');
}
const start = String((DB.config || {}).start_date || '');
if (start && (!/^\d{4}-\d{2}-\d{2}$/.test(start) || new Date(start + 'T00:00:00Z').getUTCDay() !== 1)) bad('config start_date', `"${start}" is not a Monday (YYYY-MM-DD)`);
for (const h of DB.holidays || []) {
  const w = `holidays ${h.date}`;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(h.date || '') || isNaN(Date.parse(h.date))) bad(w, 'date is not YYYY-MM-DD');
  if (!/^(federal|observance)$/.test(h.kind || '')) bad(w, `kind "${h.kind}" is not federal/observance`);
  if (!h.name_ko) warn(w, 'no name_ko');
}

const itemIds = ids('items');
for (const r of DB.recipes || []) {
  const w = `recipes ${r.id}`, list = String(r.ingredients || '').split(',').map(x => x.trim()).filter(Boolean);
  if (!list.length) bad(w, 'no ingredients');
  for (const x of list) {
    const it = rows('items').find(i => i.id === x);
    if (!it) bad(w, `ingredient "${x}" not in items`);
    else if (it.kind !== 'grocery' || !it.place) bad(w, `ingredient "${x}" is not a grocery sold somewhere`);
  }
  if (!(r.minutes > 0) || !(r.energy > 0)) bad(w, 'minutes and energy must be above 0');
  if (r.steps && r.steps_ko && r.steps.split(' | ').length !== r.steps_ko.split(' | ').length) bad(w, 'steps and steps_ko differ in number');
  if (!r.name_ko) warn(w, 'no name_ko');
}
for (const i of rows('items')) if (i.cook_only && !(DB.recipes || []).some(r => String(r.ingredients).split(',').map(x => x.trim()).includes(i.id))) bad(`items ${i.id}`, 'cook_only but in no recipe');


const MAIL_KINDS = new Set(['junk', 'bill', 'letter', 'notice', 'card']), msgIds = new Set((DB.messages || []).map(m => m.id));
for (const r of DB.replies || []) {
  const w = `replies ${r.id}`, m = (DB.messages || []).find(x => x.id === r.msg);
  if (!m) { bad(w, `message "${r.msg}" does not exist`); continue; }
  if (!/^(good|ok|poor)$/.test(r.tone || '')) bad(w, `tone "${r.tone}" is not good/ok/poor`);
  if (!r.label) bad(w, 'no label');
  if (r.answer && !r.answer_ko) warn(w, 'no answer_ko');
  if (!r.tip_ko) warn(w, 'no tip_ko');
  if (m.kind === 'alert') bad(w, 'an alert cannot be answered');
}
for (const m of DB.messages || []) if (/^(text|email|voicemail)$/.test(m.kind) && !(DB.replies || []).some(r => r.msg === m.id) && /reply|RSVP|call (us|me|back)/i.test(m.body) && !/^(alert)$/.test(m.kind)) warn(`messages ${m.id}`, 'asks for an answer but has no replies');
const holidayDates = new Set((DB.holidays || []).filter(h => h.kind === 'federal').map(h => h.date));
for (const m of DB.mail || []) {
  const w = `mail ${m.id}`, t = start ? new Date(new Date(start + 'T00:00:00Z').getTime() + (m.day - 1) * 864e5) : null;
  if (m.hero && m.hero !== 'all' && heroes.size && !heroes.has(m.hero)) bad(w, `hero "${m.hero}" not in heroes`);
  if (!MAIL_KINDS.has(m.kind)) bad(w, `kind "${m.kind}" is not one of ${[...MAIL_KINDS].join('/')}`);
  if (!m.sender || !m.body) bad(w, 'sender and body are required');
  if (!m.body_ko) warn(w, 'no body_ko');
  if (t && (t.getUTCDay() === 0 || holidayDates.has(t.toISOString().slice(0, 10)))) bad(w, `day ${m.day} is a Sunday or federal holiday: no mail`);
}

const RADIO_KINDS = new Set(['news', 'community', 'sports', 'traffic', 'ad']);
for (const r of DB.radio || []) {
  const w = `radio ${r.id}`;
  if (!RADIO_KINDS.has(r.kind)) bad(w, `kind "${r.kind}" is not one of ${[...RADIO_KINDS].join('/')}`);
  if (!r.text) bad(w, 'no text');
  if (!r.text_ko) warn(w, 'no text_ko');
  if (r.day != null && (r.kind === 'traffic' || r.kind === 'ad')) warn(w, `a ${r.kind} for one day is only heard in the rush hours or not at all`);
}
if ((DB.radio || []).length && !(DB.radio || []).some(r => r.day == null && r.kind === 'traffic')) warn('radio', 'no traffic report for any day');

for (const c of DB.tv || []) {
  const w = `tv ${c.id}`;
  if (!/^(news|tech)$/.test(c.kind)) bad(w, `kind "${c.kind}" is not news/tech`);
  if (!/^UC[\w-]{22}$/.test(c.channel || '')) bad(w, `channel "${c.channel}" is not a YouTube channel id (UC + 22)`);
  if (!c.note_ko) warn(w, 'no note_ko');
}
for (const p of rows('places')) if (p.kind === 'tv' && !/^home/.test(p.zone)) warn(`places ${p.id}`, 'a TV outside a home: Watch TV is only offered at home');

const count = (t) => `${t} ${Array.isArray(DB[t]) ? DB[t].length : 0}`;
// routines (meetings after the missions): their conversations exist, come after the missions, are at the routine's place
// and open around its time; every hero of the routine has at least one
const ROUTINE_DAYS = new Set(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']);
for (const r of DB.routines || []) {
  const w = `routines ${r.id}`;
  if (!r.title_ko) warn(w, 'no title_ko');
  if (!places.has(r.place)) bad(w, `place "${r.place}" not in places`);
  if (!HHMM.test(r.time || '')) bad(w, `bad time ${r.time}`);
  if (!['week', '2weeks', 'month'].includes(r.every)) bad(w, `every "${r.every}" is not week, 2weeks or month`);
  const days = String(r.days || '').split(',').map(x => x.trim()).filter(Boolean);
  if (!days.length || days.some(d => !ROUTINE_DAYS.has(d))) bad(w, `days "${r.days}" are not names of days`);
  const pool = String(r.episodes || '').split(',').map(x => x.trim()).filter(Boolean);
  for (const id of pool) {
    const e = rows('episodes').find(x => x.id === id);
    if (!e) { bad(w, `episode "${id}" does not exist`); continue; }
    if ((e.day_from || 1) <= (+(DB.config || {}).mission_days || 15)) bad(w, `episode ${id} opens during the missions (day_from ${e.day_from})`);
    if (e.place !== r.place) warn(w, `episode ${id} is at ${e.place}, the routine at ${r.place}`);
    if (HHMM.test(r.time || '') && HHMM.test(e.time_from || '') && !(e.time_from <= r.time && r.time < e.time_to)) bad(w, `episode ${id} is open ${e.time_from}–${e.time_to}, not around ${r.time}`);
  }
  for (const h of heroesOf(r.hero)) if (!pool.some(id => { const e = rows('episodes').find(x => x.id === id); return e && heroesOf(e.hero).includes(h); })) bad(w, `no conversation for ${h}`);
}

// tasks (what comes up at your desk): three choices with both languages, whole points and minutes, something good
// and something bad among them, a known sender, a real hero, a day and times that can happen
const TASK_KINDS = new Set(['build', 'review', 'alert', 'ticket', 'email', 'chat']);
for (const t of DB.tasks || []) {
  const w = `tasks ${t.id}`;
  if (!TASK_KINDS.has(t.kind)) bad(w, `kind "${t.kind}" is not one of ${Array.from(TASK_KINDS).join(', ')}`);
  if (t.sender && !npcs.has(t.sender)) bad(w, `sender "${t.sender}" not in npcs`);
  const hs = heroesOf(t.hero);
  if (!hs.length || hs.some(h => !heroes.has(h))) bad(w, `hero "${t.hero}" not in heroes`);
  if (t.sender && hs.includes(t.sender)) bad(w, `the sender ${t.sender} is a hero of this task (the player)`);
  if (!t.title_ko || !t.body_ko) bad(w, 'title_ko and body_ko are required');
  for (const k of ['time_from', 'time_to']) if (t[k] && !HHMM.test(t[k])) bad(w, `bad ${k} ${t[k]}`);
  if (t.time_from && t.time_to && t.time_from >= t.time_to) bad(w, `time_from ${t.time_from} is not before time_to ${t.time_to}`);
  const cs = Array.isArray(t.choices) ? t.choices : [];
  if (cs.length !== 3) bad(w, `${cs.length} choices (want 3)`);
  cs.forEach((c, i) => {
    for (const k of ['t', 't_ko', 'r', 'r_ko']) if (!c[k]) bad(w, `choice ${i + 1} has no ${k}`);
    if (!Number.isInteger(c.points ?? 0) || !Number.isInteger(c.minutes ?? 0) || (c.minutes || 0) < 0 || (c.minutes || 0) > 120) bad(w, `choice ${i + 1}: points and minutes (0-120) must be whole numbers`);
  });
  if (cs.length && !(Math.max(...cs.map(c => c.points || 0)) > 0 && Math.min(...cs.map(c => c.points || 0)) < 0)) bad(w, 'want a choice with points and one that loses some');
}

console.log(['places', 'npcs', 'chatter', 'episodes', 'turns', 'phrases', 'items', 'calendar', 'messages', 'holidays', 'recipes', 'replies', 'mail', 'radio', 'tv', 'routines', 'tasks'].map(count).join(', '));
warnings.forEach(l => console.log(l));
problems.forEach(l => console.log(l));
console.log(`${problems.length} problem(s), ${warnings.length} warning(s)`);
process.exit(problems.length ? 1 : 0);

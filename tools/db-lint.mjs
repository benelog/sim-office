// Checks the Sim Office data (office/data/db.js, made by `node tools/db.mjs build` from db/, or `pull` from DoltHub).
//   node tools/db-lint.mjs [path/to/db.js]
// Prints one line per problem and exits 1 if there are any (0 when clean). Warnings (prefixed "warn") do not fail.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, readSchema, readGameData } from './lib/schema.mjs';

const dbFile = process.argv[2] || path.join(ROOT, 'office', 'data', 'db.js');
const DB = readGameData(dbFile);
if (!DB) { console.error('no window.SO_DB in ' + dbFile); process.exit(2); }
// `db.mjs build` and `pull` write every table of db/schema.sql with its defaults, so past here no table or hero is missing
const TABLES = Object.keys(readSchema());
const absent = TABLES.filter(t => !DB[t]);
if (absent.length) { console.error(`no table ${absent.join(', ')} in ${dbFile}: build it again with tools/db.mjs`); process.exit(2); }

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
const byId = (t) => new Map(DB[t].map(r => [r.id, r]));
const places = byId('places'), npcs = byId('npcs'), episodes = byId('episodes'), items = byId('items'), heroes = byId('heroes');
const plans = byId('plans'), cards = byId('cards'), cfg = DB.config, heroIds = Array.from(heroes.keys());

// a list in a column or in config, read the way the game reads it (listOf in office/engine/core.js)
const listOf = (v) => v == null ? [] : String(v).split(/[,\s]+/).filter(Boolean);
const pairsOf = (v) => listOf(v).map(x => x.split(':')).filter(x => x[0]);          // 'jun:0,derek:168'
const isDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(Date.parse(s));
const checkKind = (w, v, set, key = 'kind') => { if (!set.has(v)) bad(w, `${key} "${v}" is not one of ${Array.from(set).join(', ')}`); };
// an episode's hero: a hero id, a list ('jun,derek') or all
const heroesOf = (h) => h === 'all' ? heroIds : listOf(h);
const checkHero = (w, h) => { if (!heroes.has(h)) bad(w, `hero "${h}" not in heroes`); };
const checkHeroes = (w, h) => { const hs = heroesOf(h); if (!hs.length || hs.some(x => !heroes.has(x))) bad(w, `hero "${h}" not in heroes`); return hs; };
const MISSION_DAYS = +cfg.mission_days || 15, inMissions = (e) => (e.day_from || 1) <= MISSION_DAYS;
const REMOTE_DAYS = listOf(cfg.remote_days || 'mon,fri');

for (const p of DB.places) {
  if (!p.zone) bad(`places ${p.id}`, 'no zone');
  if (!p.name_ko) warn(`places ${p.id}`, 'no name_ko');
}
for (const n of DB.npcs) {
  const w = `npcs ${n.id}`;
  if (n.place && !places.has(n.place)) bad(w, `place "${n.place}" not in places`);
  if (!MODELS.test(n.model || '') || !fs.existsSync(path.join(ROOT, 'office', 'models', n.model + '.js'))) bad(w, `model "${n.model}" is not a person in office/models (man-*, woman-*)`);
  if (n.voice_pitch != null && (n.voice_pitch < 0.5 || n.voice_pitch > 1.5)) bad(w, `voice_pitch ${n.voice_pitch} out of range`);
  if (n.voice_rate != null && (n.voice_rate < 0.5 || n.voice_rate > 1.5)) bad(w, `voice_rate ${n.voice_rate} out of range`);
}
for (const c of DB.chatter) if (!npcs.has(c.npc)) bad(`chatter ${c.npc}/${c.seq}`, 'npc does not exist');

for (const h of DB.heroes) {
  const w = `heroes ${h.id}`;
  for (const k of ['home_bed', 'home_kitchen', 'home_desk', 'home_door', 'desk']) if (h[k] && !places.has(h[k])) bad(w, `${k} "${h[k]}" not in places`);
  if (!fs.existsSync(path.join(ROOT, 'office', 'models', h.model + '.js'))) bad(w, `model "${h.model}" is not in office/models`);
  if (!DB.episodes.some(e => heroesOf(e.hero).includes(h.id))) warn(w, 'has no episodes');
}
for (const e of DB.episodes) {
  const w = `episodes ${e.id}`;
  checkHeroes(w, e.hero);
  if (heroesOf(e.hero).includes(e.npc)) bad(w, `the hero ${e.npc} cannot be the person of their own episode`);
  for (const r of listOf(e.requires)) {
    const req = episodes.get(r);
    if (req && heroesOf(e.hero).some(h => !heroesOf(req.hero).includes(h))) bad(w, `requires ${r}, an episode of another hero`);
  }
  if (!places.has(e.place)) bad(w, `place "${e.place}" not in places`);
  if (!npcs.has(e.npc)) bad(w, `npc "${e.npc}" not in npcs`);
  else if (npcs.get(e.npc).place !== e.place && !/(^|,)\s*video\s*(,|$)/.test(e.tags || '')) warn(w, `npc ${e.npc} normally stands at ${npcs.get(e.npc).place}, episode is at ${e.place}`);          // a video call is at your desk
  if (!HHMM.test(e.time_from || '') || !HHMM.test(e.time_to || '')) bad(w, `bad time ${e.time_from}–${e.time_to}`);
  else if (e.time_from >= e.time_to) bad(w, `time_from ${e.time_from} is not before time_to ${e.time_to}`);
  if (e.day_to != null && e.day_from > e.day_to) bad(w, `day_from ${e.day_from} > day_to ${e.day_to}`);          // NULL: no last day
  if (!Number.isInteger(e.reward ?? 0) || !Number.isInteger(e.energy ?? 0)) bad(w, 'reward and energy must be whole numbers');
  const nt = DB.turns.filter(t => t.episode === e.id).length, np = DB.phrases.filter(p => p.episode === e.id).length;
  if (nt && (nt < 3 || nt > 6)) bad(w, `${nt} turns (want 3-6)`);
  if (np > 8) warn(w, `${np} phrases (more than 8)`);          // phrases are kept in the save but no longer shown (2026-10-02): none is fine
  for (const r of listOf(e.requires)) {
    if (!episodes.has(r)) bad(w, `requires unknown episode "${r}"`);
    else {
      const req = episodes.get(r);
      if (e.day_to != null && req.day_from > e.day_to) bad(w, `requires ${r}, which only opens on day ${req.day_from}`);
    }
  }
}

const turnsBy = {};
for (const t of DB.turns) (turnsBy[t.episode] = turnsBy[t.episode] || []).push(t);
for (const e of DB.episodes) if (!turnsBy[e.id]) bad(`episodes ${e.id}`, 'has no turns');
const isStrArr = (a, n) => Array.isArray(a) && a.every(s => typeof s === 'string' && s.trim()) && (n == null || a.length === n);
for (const [ep, list] of Object.entries(turnsBy)) {
  if (!episodes.has(ep)) bad(`turns ${ep}`, 'episode does not exist');
  const seqs = list.map(t => t.seq).sort((a, b) => a - b);
  seqs.forEach((s, i) => { if (s !== i + 1) bad(`turns ${ep}`, `seq not 1..n: ${seqs.join(',')}`); });
  for (const t of list) {
    const w = `turns ${ep}#${t.seq}`;
    for (const who of [t.speaker, t.reply_speaker]) if (who && !npcs.has(who) && who !== 'player') bad(w, `speaker "${who}" not in npcs`);
    const hs = heroesOf(episodes.get(ep)?.hero);
    for (const who of [t.speaker, t.reply_speaker]) if (who && hs.includes(who)) bad(w, `speaker "${who}" is the hero of this episode (the player)`);
    // multiple choice only (2026-10-02): the model and three plausible wrong answers, each with how the other person reacts,
    // all in English and Korean (the screen shows one language). answers/hints are no longer used by the game.
    if (!t.line || !t.prompt || !t.model) bad(w, 'line, prompt and model are required');
    const norm = (x) => String(x).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    for (const k of ['distractors', 'distractors_ko', 'reactions', 'reactions_ko']) if (!isStrArr(t[k], 3)) bad(w, `${k} must be 3 strings`);
    if (isStrArr(t.distractors, 3) && t.model) {
      for (const d of t.distractors) if (norm(d) === norm(t.model)) bad(w, `distractor equals model: "${d}"`);
      const longest = Math.max(...t.distractors.map(d => d.length));
      if (t.model.length > longest * 1.3) warn(w, `the model (${t.model.length}) is much longer than every wrong answer (${longest}): a giveaway`);
    }
    for (const k of ['situation', 'line', 'prompt', 'model']) if (t[k] && !t[k + '_ko']) warn(w, `no ${k}_ko`);
  }
}

for (const p of DB.phrases) {
  const w = `phrases ${p.id}`;
  if (p.episode && !episodes.has(p.episode)) bad(w, `episode "${p.episode}" does not exist`);
  if (p.episode && !String(p.id).startsWith(p.episode + '.')) bad(w, `id should start with "${p.episode}."`);
}
for (const i of DB.items) {
  const w = `items ${i.id}`;
  checkKind(w, i.kind, ITEM_KINDS);
  if (i.model && !FOOD.has(i.model)) bad(w, `model "${i.model}" is not a food pack node`);
  if (i.place && !places.has(i.place)) bad(w, `place "${i.place}" not in places`);
  if (!(i.price >= 0)) bad(w, `bad price ${i.price}`);
}
for (const c of DB.calendar) {
  const w = `calendar ${c.hero} ${c.day} ${c.time}`;
  if (!HHMM.test(c.time || '')) bad(w, 'bad time');
  if (c.place && !places.has(c.place)) bad(w, `place "${c.place}" not in places`);
  checkHero(w, c.hero);
  if (c.episode) {
    const e = episodes.get(c.episode);
    if (!e) bad(w, `episode "${c.episode}" does not exist`);
    else if (c.day < e.day_from || (e.day_to != null && c.day > e.day_to)) bad(w, `episode ${e.id} is not open on day ${c.day}`);          // NULL: no last day
    else if (!heroesOf(e.hero).includes(c.hero)) bad(w, `episode ${e.id} belongs to ${e.hero}, the calendar row to ${c.hero}`);
  }
}

const MSG_KINDS = new Set(['text', 'email', 'voicemail', 'alert']);
// a message or a letter that comes back: every (days; 30 or more = the same date every month) and last_day are whole
// numbers, the last day is not before the first, and a row that comes back cannot be answered (replies go by id)
function recurs(w, m) {
  if (m.every != null && !(Number.isInteger(m.every) && m.every >= 1)) bad(w, `every ${m.every} is not a whole number of days`);
  if (m.last_day != null && !(Number.isInteger(m.last_day) && m.last_day >= m.day)) bad(w, `last_day ${m.last_day} is before day ${m.day}`);
  if (m.last_day != null && !m.every) warn(w, 'last_day without every');
  if (m.every && DB.replies.some(r => r.msg === m.id)) bad(w, 'a message that comes back cannot have replies');
}
for (const m of DB.messages) {
  const w = `messages ${m.id}`;
  if (m.hero && m.hero !== 'all') checkHero(w, m.hero);
  if (!HHMM.test(m.time || '')) bad(w, `bad time ${m.time}`);
  if (!(m.day >= 1)) bad(w, `bad day ${m.day}`);
  checkKind(w, m.kind, MSG_KINDS);
  if (!m.sender || !m.body) bad(w, 'sender and body are required');
  if (m.hero && m.hero === m.sender) bad(w, 'the hero cannot send a message to themselves');
  if (m.kind === 'email' && !m.subject) warn(w, 'an email without a subject');
  if (!m.body_ko) warn(w, 'no body_ko');
  recurs(w, m);
}
const start = String(cfg.start_date || '');
if (start && (!isDate(start) || new Date(start + 'T00:00:00Z').getUTCDay() !== 1)) bad('config start_date', `"${start}" is not a Monday (YYYY-MM-DD)`);
// bus delays: chances between 0 and 1, minutes as "a-b", rush hours as "HH:MM-HH:MM", and a full bus's gap within the cap
{
  const RANGE = /^(\d+)-(\d+)$/;
  for (const k of ['bus_late_chance_rain', 'bus_late_chance_rush', 'bus_late_chance', 'bus_full_chance']) if (cfg[k] != null && !(+cfg[k] >= 0 && +cfg[k] <= 1)) bad(`config ${k}`, `"${cfg[k]}" is not a chance between 0 and 1`);
  for (const k of ['bus_late_rain', 'bus_late_rush', 'bus_late', 'bus_full_gap']) {
    const m = cfg[k] == null ? null : RANGE.exec(String(cfg[k]));
    if (cfg[k] != null && (!m || +m[1] > +m[2])) bad(`config ${k}`, `"${cfg[k]}" is not minutes as a-b`);
    else if (m && cfg.bus_delay_max != null && +m[2] > +cfg.bus_delay_max) warn(`config ${k}`, `up to ${m[2]} minutes, more than bus_delay_max ${cfg.bus_delay_max}`);
  }
  if (cfg.bus_delay_max != null && !(Number.isInteger(+cfg.bus_delay_max) && +cfg.bus_delay_max >= 0 && +cfg.bus_delay_max <= 20)) bad('config bus_delay_max', `"${cfg.bus_delay_max}" is not 0 to 20 minutes`);
  if (cfg.bus_rush != null && String(cfg.bus_rush).split(',').some(w => { const m = /^\s*(\d\d:\d\d)-(\d\d:\d\d)\s*$/.exec(w); return !m || m[1] >= m[2]; })) bad('config bus_rush', `"${cfg.bus_rush}" is not HH:MM-HH:MM windows`);
  if (cfg.bus_alert_time != null && !HHMM.test(cfg.bus_alert_time)) bad('config bus_alert_time', `bad time ${cfg.bus_alert_time}`);
  if (cfg.bus_every && cfg.bus_delay_max != null && +cfg.bus_delay_max >= +cfg.bus_every) warn('config bus_delay_max', `a late bus (${cfg.bus_delay_max} min) can come after the next one (every ${cfg.bus_every})`);
}
// the season in the scenery (office/season.js): 'MM-DD' dates in a season from August to July, in order
const SEASON_KEYS = { season_fall: 2, season_bare: 2, season_litter: 4, season_spring: 1, season_lights: 2 };
for (const [k, n] of Object.entries(SEASON_KEYS)) {
  const v = cfg[k];
  if (v == null) continue;
  const list = String(v).split(',').map(s => s.trim());
  const sday = (md) => { const m = /^(\d{2})-(\d{2})$/.exec(md); if (!m) return null; const mm = +m[1], t = Date.UTC(mm >= 8 ? 2001 : 2002, mm - 1, +m[2]); return new Date(t).getUTCDate() === +m[2] ? (t - Date.UTC(2001, 7, 1)) / 864e5 : null; };
  const days = list.map(sday);
  if (list.length !== n || days.some(d => d == null)) bad(`config ${k}`, `"${v}" is not ${n} date(s) MM-DD`);
  else if (days.some((d, i) => i && d < days[i - 1])) bad(`config ${k}`, `"${v}": the dates are not in order (a season runs from August to July)`);
}
for (const h of DB.holidays) {
  const w = `holidays ${h.date}`;
  if (!isDate(h.date)) bad(w, 'date is not YYYY-MM-DD');
  checkKind(w, h.kind, new Set(['federal', 'observance']));
  if (!h.name_ko) warn(w, 'no name_ko');
}

for (const r of DB.recipes) {
  const w = `recipes ${r.id}`, list = listOf(r.ingredients);
  if (!list.length) bad(w, 'no ingredients');
  for (const x of list) {
    const it = items.get(x);
    if (!it) bad(w, `ingredient "${x}" not in items`);
    else if (it.kind !== 'grocery' || !it.place) bad(w, `ingredient "${x}" is not a grocery sold somewhere`);
  }
  if (!(r.minutes > 0) || !(r.energy > 0)) bad(w, 'minutes and energy must be above 0');
  if (r.steps && r.steps_ko && r.steps.split(' | ').length !== r.steps_ko.split(' | ').length) bad(w, 'steps and steps_ko differ in number');
  if (!r.name_ko) warn(w, 'no name_ko');
}
for (const i of DB.items) if (i.cook_only && !DB.recipes.some(r => listOf(r.ingredients).includes(i.id))) bad(`items ${i.id}`, 'cook_only but in no recipe');


const MAIL_KINDS = new Set(['junk', 'bill', 'letter', 'notice', 'card']), msgIds = new Set(DB.messages.map(m => m.id));
for (const r of DB.replies) {
  const w = `replies ${r.id}`, m = DB.messages.find(x => x.id === r.msg);
  if (!m) { bad(w, `message "${r.msg}" does not exist`); continue; }
  checkKind(w, r.tone, new Set(['good', 'ok', 'poor']), 'tone');
  if (!r.label) bad(w, 'no label');
  if (r.answer && !r.answer_ko) warn(w, 'no answer_ko');
  if (!r.tip_ko) warn(w, 'no tip_ko');
  if (m.kind === 'alert') bad(w, 'an alert cannot be answered');
}
for (const m of DB.messages) if (/^(text|email|voicemail)$/.test(m.kind) && !DB.replies.some(r => r.msg === m.id) && /reply|RSVP|call (us|me|back)/i.test(m.body) && !/^(alert)$/.test(m.kind)) warn(`messages ${m.id}`, 'asks for an answer but has no replies');
const holidayDates = new Set(DB.holidays.filter(h => h.kind === 'federal').map(h => h.date));
for (const m of DB.mail) {
  const w = `mail ${m.id}`, t = new Date(Date.parse(start + 'T00:00:00Z') + (m.day - 1) * 864e5);          // Invalid Date when start_date is bad: reported above
  if (m.hero && m.hero !== 'all') checkHero(w, m.hero);
  checkKind(w, m.kind, MAIL_KINDS);
  if (!m.sender || !m.body) bad(w, 'sender and body are required');
  if (!m.body_ko) warn(w, 'no body_ko');
  if (!isNaN(t) && (t.getUTCDay() === 0 || holidayDates.has(t.toISOString().slice(0, 10)))) bad(w, `day ${m.day} is a Sunday or federal holiday: no mail`);
  recurs(w, m);
}
for (const b of DB.bills) if (!b.company) warn(`bills ${b.id}`, 'no company: no statement email after the missions');

const RADIO_KINDS = new Set(['news', 'community', 'sports', 'traffic', 'ad']);
for (const r of DB.radio) {
  const w = `radio ${r.id}`;
  checkKind(w, r.kind, RADIO_KINDS);
  if (!r.text) bad(w, 'no text');
  if (!r.text_ko) warn(w, 'no text_ko');
  if (r.day != null && (r.kind === 'traffic' || r.kind === 'ad')) warn(w, `a ${r.kind} for one day is only heard in the rush hours or not at all`);
}
if (DB.radio.length && !DB.radio.some(r => r.day == null && r.kind === 'traffic')) warn('radio', 'no traffic report for any day');

for (const c of DB.tv) {
  const w = `tv ${c.id}`;
  checkKind(w, c.kind, new Set(['news', 'tech']));
  if (!/^UC[\w-]{22}$/.test(c.channel || '')) bad(w, `channel "${c.channel}" is not a YouTube channel id (UC + 22)`);
  if (!c.note_ko) warn(w, 'no note_ko');
}
for (const p of DB.places) if (p.kind === 'tv' && !/^home/.test(p.zone)) warn(`places ${p.id}`, 'a TV outside a home: Watch TV is only offered at home');

const count = (t) => `${t} ${Array.isArray(DB[t]) ? DB[t].length : 0}`;
// routines (meetings after the missions): their conversations exist, come after the missions, are at the routine's place
// and open around its time; every hero of the routine has at least one
const ROUTINE_DAYS = new Set(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']);
for (const r of DB.routines) {
  const w = `routines ${r.id}`;
  if (!r.title_ko) warn(w, 'no title_ko');
  if (!places.has(r.place)) bad(w, `place "${r.place}" not in places`);
  if (!HHMM.test(r.time || '')) bad(w, `bad time ${r.time}`);
  if (!['week', '2weeks', 'month'].includes(r.every)) bad(w, `every "${r.every}" is not week, 2weeks or month`);
  const days = listOf(r.days);
  if (!days.length || days.some(d => !ROUTINE_DAYS.has(d))) bad(w, `days "${r.days}" are not names of days`);
  const pool = listOf(r.episodes);
  for (const id of pool) {
    const e = episodes.get(id);
    if (!e) { bad(w, `episode "${id}" does not exist`); continue; }
    if (inMissions(e)) bad(w, `episode ${id} opens during the missions (day_from ${e.day_from})`);
    if (e.place !== r.place) warn(w, `episode ${id} is at ${e.place}, the routine at ${r.place}`);
    if (HHMM.test(r.time || '') && HHMM.test(e.time_from || '') && !(e.time_from <= r.time && r.time < e.time_to)) bad(w, `episode ${id} is open ${e.time_from}–${e.time_to}, not around ${r.time}`);
  }
  for (const h of heroesOf(r.hero)) if (!pool.some(id => { const e = episodes.get(id); return e && heroesOf(e.hero).includes(h); })) bad(w, `no conversation for ${h}`);
}

// hybrid work (config hybrid_from, remote_days, remote_people): a routine's days after the start (hybrid_days) and its
// video calls for remote days (remote_episodes: tagged video, at the hero's desk at home, around the routine's time,
// one for every hero of the routine); a video conversation outside every remote_episodes never opens
const isVideo = (e) => /(^|,)\s*video\s*(,|$)/.test(e.tags || ''), remotePools = new Set();
for (const r of DB.routines) {
  const w = `routines ${r.id}`;
  const hybrid = listOf(r.hybrid_days);
  if (r.hybrid_days != null && (!hybrid.length || hybrid.some(d => !ROUTINE_DAYS.has(d)))) bad(w, `hybrid_days "${r.hybrid_days}" are not names of days`);
  if (REMOTE_DAYS.some(d => hybrid.includes(d))) warn(w, `hybrid_days "${r.hybrid_days}" include a remote day: a video call`);
  const pool = listOf(r.remote_episodes);
  for (const id of pool) {
    remotePools.add(id);
    const e = episodes.get(id);
    if (!e) { bad(w, `remote episode "${id}" does not exist`); continue; }
    if (!isVideo(e)) bad(w, `remote episode ${id} is not tagged video`);
    if (inMissions(e)) bad(w, `remote episode ${id} opens during the missions (day_from ${e.day_from})`);
    const homes = heroesOf(e.hero).map(h => heroes.get(h)?.home_desk);
    if (!homes.includes(e.place)) warn(w, `remote episode ${id} is at ${e.place}, not at its hero's desk at home`);
    if (HHMM.test(r.time || '') && HHMM.test(e.time_from || '') && !(e.time_from <= r.time && r.time < e.time_to)) bad(w, `remote episode ${id} is open ${e.time_from}–${e.time_to}, not around ${r.time}`);
  }
  if (pool.length) for (const h of heroesOf(r.hero)) if (!pool.some(id => { const e = episodes.get(id); return e && heroesOf(e.hero).includes(h); })) bad(w, `no video call for ${h}`);
}
for (const e of DB.episodes) if (isVideo(e) && !remotePools.has(e.id)) bad(`episodes ${e.id}`, 'tagged video but in no routine\'s remote_episodes: it never opens');
if (cfg.hybrid_from != null && cfg.hybrid_from !== '') {
  const iso = String(cfg.hybrid_from), t = Date.parse(iso + 'T00:00:00Z'), s0 = start ? Date.parse(start + 'T00:00:00Z') : null;
  if (!isDate(iso)) bad('config hybrid_from', `"${iso}" is not a date (YYYY-MM-DD)`);
  else if (s0 != null && (t - s0) / 864e5 + 1 <= MISSION_DAYS) bad('config hybrid_from', `${iso} falls in the missions (day ${(t - s0) / 864e5 + 1})`);
  if (!REMOTE_DAYS.length || REMOTE_DAYS.some(d => !['mon', 'tue', 'wed', 'thu', 'fri'].includes(d))) bad('config remote_days', `"${cfg.remote_days}" are not weekday names`);
  if (REMOTE_DAYS.length >= 5) bad('config remote_days', 'every weekday is remote: no office days');
  for (const id of listOf(cfg.remote_people)) if (!npcs.has(id)) bad('config remote_people', `"${id}" not in npcs`);
}

// tasks (what comes up at your desk): three choices with both languages, whole points and minutes, something good
// and something bad among them, a known sender, a real hero, a day and times that can happen
const TASK_KINDS = new Set(['build', 'review', 'alert', 'ticket', 'email', 'chat']);
for (const t of DB.tasks) {
  const w = `tasks ${t.id}`;
  checkKind(w, t.kind, TASK_KINDS);
  if (t.sender && !npcs.has(t.sender)) bad(w, `sender "${t.sender}" not in npcs`);
  const hs = checkHeroes(w, t.hero);
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

// plans (benefits in the HR portal): a known kind, both languages, premiums and prices that are numbers, the copays
// of the kind; config benefits_now / benefits_default name plans of each kind for every hero, and the dates follow
// open < close < start
const PLAN_KINDS = { medical: ['doctor', 'specialist', 'urgent', 'er', 'rx'], dental: ['cleaning', 'filling'], vision: ['eye_exam', 'glasses'] };
for (const p of DB.plans) {
  const w = `plans ${p.id}`;
  if (!PLAN_KINDS[p.kind]) { bad(w, `kind "${p.kind}" is not one of ${Object.keys(PLAN_KINDS).join(', ')}`); continue; }
  if (!p.name_ko || !p.note || !p.note_ko) bad(w, 'name_ko, note and note_ko are required');
  for (const k of ['premium', 'deductible', 'oop_max', 'hsa']) if (p[k] != null && !(Number.isFinite(+p[k]) && +p[k] >= 0)) bad(w, `${k} must be a number of 0 or more`);
  const c = p.copays && typeof p.copays === 'object' ? p.copays : null;
  if (!c) bad(w, 'copays is not a JSON object');
  else for (const k of PLAN_KINDS[p.kind]) if (!Number.isFinite(c[k]) || c[k] < 0) bad(w, `copays.${k} missing or not a number of 0 or more`);
}
if (DB.plans.length) {
  const checkPlanSet = (s, w) => {
    const planIds = String(s || '').split('@')[0].split('+').filter(x => !/^\d+(\.\d+)?$/.test(x));
    planIds.forEach(id => { if (!plans.has(id)) bad(w, `plan "${id}" not in plans`); });
    for (const k of Object.keys(PLAN_KINDS)) if (planIds.filter(id => plans.get(id)?.kind === k).length !== 1) bad(w, `want one ${k} plan in "${s}"`);
    const ep = String(s || '').split('@')[1];
    if (ep && !episodes.has(ep)) bad(w, `episode "${ep}" does not exist`);
  };
  for (const k of Object.keys(PLAN_KINDS)) if (!DB.plans.some(p => p.kind === k)) bad('plans', `no ${k} plan`);
  checkPlanSet(cfg.benefits_default, 'config benefits_default');
  const now = Object.fromEntries(pairsOf(cfg.benefits_now));
  for (const h of heroIds) { if (!now[h]) bad('config benefits_now', `no plans for ${h}`); else checkPlanSet(now[h], `config benefits_now ${h}`); }
  const ds = ['benefits_open', 'benefits_close', 'benefits_start'].map(k => String(cfg[k] || ''));
  if (ds.some(d => !isDate(d)) || !(ds[0] <= ds[1] && ds[1] < ds[2])) bad('config benefits_open/close/start', `want dates with open <= close < start, not ${ds.join(', ')}`);
  for (const k of ['k401_auto', 'k401_match', 'k401_match_up_to', 'k401_max', 'tax_state', 'tax_ss', 'tax_medicare']) if (!Number.isFinite(+cfg[k]) || +cfg[k] < 0) bad(`config ${k}`, 'want a number of 0 or more');
}

// friends (what coworkers say and do as you get closer): a coworker of config friend_people, a known kind, both
// languages, the placeholder an invitation or a cover needs, a closeness the levels reach; a tip names a task that can
// come to those heroes and does not come from the hero who plays it; every coworker can invite you and say they missed you
const FRIEND_KINDS = new Set(['lunch', 'diner', 'invite', 'noshow', 'coffee', 'umbrella', 'cover', 'text', 'tip']);
const PALS = new Set(listOf(cfg.friend_people));
for (const p of PALS) if (!npcs.has(p)) bad('config friend_people', `"${p}" not in npcs`);
for (const x of listOf(cfg.friend_start)) { const m = /^(\w+)\/(\w+):(\d+)$/.exec(x); if (!m || !heroes.has(m[1]) || !PALS.has(m[2]) || m[1] === m[2] || +m[3] > 100) bad('config friend_start', `"${x}" is not hero/coworker:0-100`); }
for (const f of DB.friends) {
  const w = `friends ${f.id}`, hs = checkHeroes(w, f.hero);
  if (!PALS.has(f.npc)) bad(w, `npc "${f.npc}" is not one of config friend_people`);
  checkKind(w, f.kind, FRIEND_KINDS);
  if (hs.length === 1 && hs[0] === f.npc) bad(w, `only for ${f.npc}, who is the player then`);
  if (!f.line || !f.line_ko) bad(w, 'line and line_ko are required');
  if (!Number.isInteger(f.need ?? 0) || (f.need || 0) < 0 || (f.need || 0) > 100) bad(w, `need ${f.need} is not 0-100`);
  const need = { invite: '{time}', cover: '{meeting}' }[f.kind];
  if (need && !(String(f.line).includes(need) && String(f.line_ko || '').includes(need))) bad(w, `${f.kind} wants ${need} in line and line_ko`);
  if (!need && /\{\w+\}/.test(String(f.line) + (f.line_ko || ''))) bad(w, 'a placeholder this kind does not fill');
  if (f.kind === 'tip') {
    const t = DB.tasks.find(x => x.id === f.task);
    if (!t) bad(w, `task "${f.task}" not in tasks`);
    else if (!hs.some(h => heroesOf(t.hero).includes(h) && h !== f.npc)) bad(w, `task ${f.task} never comes to a hero this tip is for`);
  } else if (f.task) bad(w, 'only a tip names a task');
}
if (DB.friends.length) for (const p of PALS) for (const k of ['invite', 'noshow', 'lunch']) if (!DB.friends.some(f => f.npc === p && f.kind === k)) bad(`friends ${p}`, `no ${k} line`);

// the pharmacy and the clinic: a conversation tagged errand is opened by the engine when it applies, so it says which
// kind it is (pickup | otc | rx at a place of kind pharmacy, clinic + cold | flu at a place of kind clinic), and both
// illnesses have a clinic visit; medicine sold at a pharmacy is gear (a day's doses per use); the rules in config are
// numbers (copay_*, ill_chance and flu_share as month:percent, ill_days as cold:days,flu:days)
const placeKind = (id) => places.get(id)?.kind;
const tagsOf = (e) => listOf(e.tags);
const CARE = ['pickup', 'otc', 'rx', 'clinic'];
for (const e of DB.episodes.filter(e => tagsOf(e).includes('errand'))) {
  const w = `episodes ${e.id}`, kinds = CARE.filter(k => tagsOf(e).includes(k));
  if (kinds.length !== 1) { bad(w, `an errand needs one of ${CARE.join(', ')} in its tags (has ${kinds.join(', ') || 'none'})`); continue; }
  const want = kinds[0] === 'clinic' ? 'clinic' : 'pharmacy';
  if (placeKind(e.place) !== want) bad(w, `a ${kinds[0]} errand at ${e.place}, which is not a place of kind ${want}`);
  if (kinds[0] === 'clinic' && tagsOf(e).filter(t => t === 'cold' || t === 'flu').length !== 1) bad(w, 'a clinic visit needs cold or flu in its tags');
  if (kinds[0] !== 'pickup' && inMissions(e)) warn(w, `opens on day ${e.day_from}, but people only fall ill after the missions`);
}
if (DB.episodes.some(e => tagsOf(e).includes('errand'))) for (const k of ['cold', 'flu']) if (!DB.episodes.some(e => tagsOf(e).includes('errand') && tagsOf(e).includes('clinic') && tagsOf(e).includes(k))) bad('episodes', `no clinic visit for the ${k} (tags errand,clinic,${k})`);
for (const i of DB.items.filter(i => placeKind(i.place) === 'pharmacy')) {
  if (i.kind !== 'gear') bad(`items ${i.id}`, `sold at the pharmacy but kind "${i.kind}" (medicine is gear: taxed, kept in the bag)`);
  if (!(i.uses >= 1) || !(i.price > 0)) bad(`items ${i.id}`, 'medicine needs a price and uses (days of doses)');
}
for (const k of Object.keys(cfg).filter(k => /^copay_/.test(k))) if (!(Number(cfg[k]) >= 0)) bad(`config ${k}`, `"${cfg[k]}" is not an amount of dollars`);
for (const k of ['ill_chance', 'flu_share']) if (cfg[k] != null && !String(cfg[k]).split(',').every(p => { const m = /^\s*(\d{1,2}):(\d+(\.\d+)?)\s*$/.exec(p); return m && +m[1] >= 1 && +m[1] <= 12 && +m[2] <= 100; })) bad(`config ${k}`, `"${cfg[k]}" is not month:percent,…`);
if (cfg.ill_days != null && !String(cfg.ill_days).split(',').every(p => /^\s*(cold|flu):\d+\s*$/.test(p))) bad('config ill_days', `"${cfg.ill_days}" is not cold:days,flu:days`);

// cards (credit cards, Menu > Bank): a kind, a deposit that is the limit of a secured card, a limit and a score for
// an unsecured one, rates that a bank could charge, both languages; a card to become that exists and is unsecured;
// at least one secured card for a hero without credit history; the heroes' starting cards exist (config card_start)
for (const c of DB.cards) {
  const w = `cards ${c.id}`;
  checkKind(w, c.kind, new Set(['secured', 'unsecured']));
  if (!/^\d{4}$/.test(String(c.last4 || ''))) bad(w, `last4 "${c.last4}" is not four digits`);
  if (c.kind === 'secured' && !(c.deposit > 0)) bad(w, 'a secured card needs a deposit (it is the limit)');
  if (c.kind === 'secured' && c.min_score != null) bad(w, 'a secured card is for no credit history: no min_score');
  if (c.kind === 'unsecured' && !(c.credit_limit > 0)) bad(w, 'an unsecured card needs a credit_limit');
  if (c.kind === 'unsecured' && !(c.min_score >= 300 && c.min_score <= 850)) bad(w, `min_score ${c.min_score} is not a score (300-850)`);
  if (!(c.apr > 0 && c.apr <= 36)) bad(w, `apr ${c.apr} is not between 0 and 36`);
  if (!(c.min_due > 0) || !(c.min_pct > 0 && c.min_pct <= 10)) bad(w, 'min_due must be above 0 and min_pct 0-10');
  if (!(c.late_fee >= 0 && c.late_fee <= 41)) bad(w, `late_fee ${c.late_fee} is over the legal limit ($41)`);
  if (c.cash_back != null && !(c.cash_back >= 0 && c.cash_back <= 5)) bad(w, `cash_back ${c.cash_back} is not 0-5`);
  if (c.graduates_to && cards.get(c.graduates_to)?.kind !== 'unsecured') bad(w, `graduates_to "${c.graduates_to}" is not an unsecured card`);
  if (c.graduates_to && c.kind !== 'secured') bad(w, 'only a secured card graduates');
  if (!c.name_ko || !c.note_ko) bad(w, 'name_ko and note_ko are required');
}
if (DB.cards.length) {
  if (!DB.cards.some(c => c.kind === 'secured')) bad('cards', 'no secured card: a hero without credit history cannot get one');
  for (const [h, id] of pairsOf(cfg.card_start)) {
    checkHero('config card_start', h);
    if (id && !cards.has(id)) bad('config card_start', `card "${id}" not in cards`);
  }
  for (const [h, n] of pairsOf(cfg.credit_months)) if (!(+n >= 0)) bad('config credit_months', `${h}: "${n}" is not a number of months`);
  for (const [h, id] of pairsOf(cfg.card_start)) if (id && !(pairsOf(cfg.credit_months).find(x => x[0] === h) || [])[1]) warn('config card_start', `${h} starts with a card but has no credit_months (no score until the first statement)`);
  const dom = +cfg.card_close_dom;
  if (cfg.card_close_dom != null && !(Number.isInteger(dom) && dom >= 1 && dom <= 28)) bad('config card_close_dom', `${cfg.card_close_dom} is not a date of every month (1-28)`);
  if (cfg.card_due_days != null && !(+cfg.card_due_days >= 21)) bad('config card_due_days', 'the law gives at least 21 days to pay');
}

// cash and the online store: the ATMs the config names are places of kind atm, cash-only places sell something, the
// checkout for cash back and the carrier's counter exist; a catalog row delivers an item that goes in the bag
for (const id of listOf(cfg.atm_own)) if (placeKind(id) !== 'atm') bad(`config atm_own`, `"${id}" is not a place of kind atm`);
for (const id of listOf(cfg.cash_only)) {
  if (!places.has(id)) bad('config cash_only', `"${id}" not in places`);
  else if (!DB.items.some(i => i.place === id)) warn('config cash_only', `nothing is sold at "${id}"`);
}
for (const k of ['cash_back_place', 'order_pickup']) if (cfg[k] && !places.has(cfg[k])) bad(`config ${k}`, `"${cfg[k]}" not in places`);
for (const k of ['atm_amounts', 'cash_back']) for (const n of listOf(cfg[k])) if (!(+n > 0 && +n % 20 === 0)) bad(`config ${k}`, `${n} is not a multiple of $20 (the bills)`);
for (const p of DB.places) if (p.kind === 'atm' && !/^(city|market|diner|airport|hotel|office)$/.test(p.zone)) warn(`places ${p.id}`, `an ATM in zone ${p.zone}`);
const ORDER_KINDS = new Set(['grocery', 'gear', 'other']);
for (const c of DB.catalog) {
  const w = `catalog ${c.id}`, it = items.get(c.item);
  if (!it) bad(w, `item "${c.item}" not in items`);
  else if (!ORDER_KINDS.has(it.kind)) bad(w, `item ${c.item} is a ${it.kind}: only groceries, gear and other things are delivered`);
  if (!(Number.isInteger(c.qty) && c.qty >= 1)) bad(w, `qty ${c.qty} is not a whole number of packages`);
  if (!(c.price > 0)) bad(w, `bad price ${c.price}`);
  if (![0, 1].includes(c.signature ?? 0)) bad(w, 'signature must be 0 or 1');
  if (!c.name_ko) bad(w, 'no name_ko');
  if (c.note && !c.note_ko) bad(w, 'no note_ko');
}

// home_events (home life): repairs say where and what they do, noises have four choices with both languages and how
// the night goes, the engine's messages exist for every hero with the same {placeholders} in both languages
const HOME_KINDS = new Set(['repair', 'noise', 'text', 'email']), HOME_PLACES = new Set(['eat', 'sleep', 'desk']);
const HOME_EFFECTS = new Set(['cook', 'dishes', 'cold', 'sleep', 'shower', 'fridge']), HOME_VARS = new Set(['name', 'thing', 'when', 'cost', 'fee', 'order', 'day']);
const HOME_NOTES = ['trash_smell', 'trash_fee', 'fix_ask', 'fix_entry', 'fix_done'];
const holes = (s) => Array.from(String(s || '').matchAll(/\{(\w+)\}/g), m => m[1]).sort().join(',');
for (const r of DB.home_events) {
  const w = `home_events ${r.id}`;
  checkKind(w, r.kind, HOME_KINDS);
  checkHeroes(w, r.hero);
  if (!r.title_ko || !r.body_ko) bad(w, 'title_ko and body_ko are required');
  if (r.kind === 'repair') {
    checkKind(w, r.place, HOME_PLACES, 'place');
    checkKind(w, r.effect, HOME_EFFECTS, 'effect');
    if (!Number.isInteger(r.days) || r.days < 1 || r.days > 7) bad(w, `days ${r.days} (want 1-7)`);
    if (!(+r.cost > 0)) bad(w, 'a repair needs a cost (what a homeowner pays)');
  } else if (r.kind === 'noise') {
    const cs = Array.isArray(r.choices) ? r.choices : [];
    if (cs.length !== 4) bad(w, `${cs.length} choices (want 4)`);
    cs.forEach((c, i) => {
      for (const k of ['t', 't_ko', 'r', 'r_ko']) if (!c[k]) bad(w, `choice ${i + 1} has no ${k}`);
      if (!Number.isInteger(c.points ?? 0) || !Number.isInteger(c.energy ?? 0) || (c.energy || 0) > 0 || (c.energy || 0) < -40) bad(w, `choice ${i + 1}: points and energy (-40 to 0) must be whole numbers`);
    });
    if (cs.length && !(Math.max(...cs.map(c => c.points || 0)) > 0 && Math.min(...cs.map(c => c.points || 0)) < 0)) bad(w, 'want a choice with points and one that loses some');
  } else if (HOME_KINDS.has(r.kind)) {
    if (!/^n_[a-z_]+$/.test(r.id)) bad(w, 'a message id is n_<what>[_<hero>]');
    if (!r.sender) bad(w, 'no sender');
    else if (/^[a-z]+$/.test(r.sender) && !npcs.has(r.sender)) bad(w, `sender "${r.sender}" not in npcs`);
    for (const k of holes(r.body + r.body_ko).split(',').filter(Boolean)) if (!HOME_VARS.has(k)) bad(w, `unknown placeholder {${k}}`);
    if (holes(r.body) !== holes(r.body_ko)) bad(w, `placeholders differ: "${holes(r.body)}" in English, "${holes(r.body_ko)}" in Korean`);
  }
}
if (DB.home_events.length) for (const h of heroIds) {
  const mineOf = (k) => DB.home_events.filter(r => r.kind === k && heroesOf(r.hero).includes(h));
  if (!mineOf('repair').length) bad('home_events', `no repair for ${h}`);
  if (!mineOf('noise').length) bad('home_events', `no noise for ${h}`);
  for (const n of HOME_NOTES) if (!DB.home_events.some(r => r.id === `n_${n}_${h}` || r.id === `n_${n}`)) bad('home_events', `no message n_${n} for ${h}`);
}

console.log(['places', 'npcs', 'chatter', 'episodes', 'turns', 'phrases', 'items', 'calendar', 'messages', 'holidays', 'recipes', 'replies', 'mail', 'radio', 'tv', 'routines', 'tasks', 'plans', 'friends', 'cards', 'catalog', 'home_events'].map(count).join(', '));
warnings.forEach(l => console.log(l));
problems.forEach(l => console.log(l));
console.log(`${problems.length} problem(s), ${warnings.length} warning(s)`);
process.exitCode = problems.length ? 1 : 0;          // not process.exit: it drops what a pipe has not taken yet, the end of the report

/* Sim Office — the tables of the game data (office/data/db.js), dates and holidays, places. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- data access
const byId = (t) => { const m = {}; rows(t).forEach(r => { m[r.id] = r; }); return m; };
const PLACES = byId('places'), NPCS = byId('npcs'), ITEMS = byId('items'), EPISODES = byId('episodes'), PHRASES = byId('phrases');
const TURNS = {};
rows('turns').forEach(t => { (TURNS[t.episode] = TURNS[t.episode] || []).push(t); });
Object.values(TURNS).forEach(l => l.sort((a, b) => a.seq - b.seq));
const SPEAKERS = {};            // episode → the people with a line in it besides the one you talk to
Object.keys(TURNS).forEach(id => {
  const who = new Set();
  TURNS[id].forEach(t => [t.speaker, t.reply_speaker].forEach(x => { if (x && x !== 'player' && x !== 'you') who.add(x); }));
  SPEAKERS[id] = Array.from(who);
});
const CHATTER = {};
rows('chatter').slice().sort((a, b) => a.seq - b.seq).forEach(c => { (CHATTER[c.npc] = CHATTER[c.npc] || []).push(c); });
const SCHEDULE = {}, SMALLTALK = {};
rows('schedule').slice().sort((a, b) => a.seq - b.seq).forEach(s => { (SCHEDULE[s.npc] = SCHEDULE[s.npc] || []).push(s); });
rows('smalltalk').slice().sort((a, b) => a.seq - b.seq).forEach(c => { (SMALLTALK[c.topic] = SMALLTALK[c.topic] || []).push(c); });
const WEATHER = rows('weather').slice().sort((a, b) => a.day - b.day);
const isWeekend = (d) => (d - 1) % 7 >= 5;
// Real dates: game day 1 is config start_date (a Monday), written the American way (Mon, Oct 5).
// Holidays (holidays table) go by the date; on a federal one banks are closed and buses keep the weekend timetable.
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const START = (() => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(CFG.start_date || '')); return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : null; })();
const dateOf = (d) => START == null ? null : new Date(START + (d - 1) * 864e5);
const dateShort = (d) => { const t = dateOf(d); return t ? `${weekday(d).slice(0, 3)}, ${MONTHS[t.getUTCMonth()].slice(0, 3)} ${t.getUTCDate()}` : `${weekday(d).slice(0, 3)} · Day ${d}`; };
const dateLong = (d) => { const t = dateOf(d); return t ? `${weekday(d)}, ${MONTHS[t.getUTCMonth()]} ${t.getUTCDate()}` : `${weekday(d)}, Day ${d}`; };
const dateKo = (d) => { const t = dateOf(d); return (t ? `${t.getUTCMonth() + 1}월 ${t.getUTCDate()}일 ` : `${d}일째 `) + WEEKDAYS_KO[(d - 1) % 7]; };
const dateKoShort = (d) => { const t = dateOf(d); return (t ? `${t.getUTCMonth() + 1}월 ${t.getUTCDate()}일` : `${d}일째`) + ` (${WEEKDAYS_KO[(d - 1) % 7][0]})`; };
const dShort = (d) => KO() ? dateKoShort(d) : dateShort(d), dLong = (d) => KO() ? dateKo(d) : dateLong(d);
const dMonth = (d) => KO() ? dateKoShort(d).replace(/ \(.\)$/, '') : dateShort(d).replace(/^\w+, /, '');      // Oct 5 / 10월 5일
const HOLIDAYS = {};
rows('holidays').forEach(h => { HOLIDAYS[h.date] = h; });
const holidayOf = (d) => { const t = dateOf(d); return (t && HOLIDAYS[t.toISOString().slice(0, 10)]) || null; };
const dayOff = (d) => { const h = holidayOf(d); return !!h && h.kind === 'federal'; };
const isoOf = (d) => { const t = dateOf(d); return t ? t.toISOString().slice(0, 10) : null; };
// The company's own days off (config company_holidays: dates), like Thanksgiving and the day after: nobody is
// expected at the office. offWork: a weekend or one of those. The bank is closed on weekends and federal holidays.
const COMPANY_OFF = new Set(listOf(CFG.company_holidays));
const companyOff = (d) => COMPANY_OFF.has(isoOf(d));
const offWork = (d) => isWeekend(d) || companyOff(d);
const bankClosed = (d) => isWeekend(d) || dayOff(d);
// Payday every other Friday: config payday_days, and then every payday_every days. When the bank is closed on a
// payday (a federal holiday), the money comes the business day before.
const PAY_EVERY = +CFG.payday_every || 0, PAY_LAST = Math.max(0, ...PAYDAYS);
const payDue = (d) => PAYDAYS.includes(d) || (PAY_EVERY > 0 && PAY_LAST > 0 && d > PAY_LAST && (d - PAY_LAST) % PAY_EVERY === 0);
function isPayday(d) {
  if (bankClosed(d)) return false;
  for (let n = d; n < d + 7; n++) { if (payDue(n)) return true; if (!bankClosed(n + 1)) return false; }
  return false;
}
// Rent (or the mortgage) is due on the 1st of every month (config rent_day_of_month); a monthly bill (every 28 days
// or more) comes on the same date every month as on its first day. Without a start date: every 30 days.
const RENT_DOM = +CFG.rent_day_of_month || 1;
function onDateOfMonth(d, dom) {
  const t = dateOf(d);
  if (!t) return false;
  const last = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 0)).getUTCDate();
  return t.getUTCDate() === Math.min(dom, last);
}
const MESSAGES = rows('messages').slice().sort((a, b) => (a.day - b.day) || (hm(a.time, 0) - hm(b.time, 0)));
const REPLIES = rows('replies').slice().sort((a, b) => (a.sort || 0) - (b.sort || 0));
const MAIL = rows('mail').slice().sort((a, b) => a.day - b.day);
const builtinZoneOf = (id) => Object.keys(BUILTIN_PLACES).find(z => BUILTIN_PLACES[z].includes(id)) || null;
function place(id) {
  const owner = HEROES.find(h => h.desk === id);
  if (owner && PLACES[id]) {
    const me = owner.id === (G ? G.hero : DEFAULT_HERO);
    return Object.assign({}, PLACES[id], me ? { name: 'Your desk', name_ko: '내 자리' } : { name: `${owner.name}'s desk`, name_ko: `${owner.name_ko || owner.name}의 자리` });
  }
  if (PLACES[id]) return PLACES[id];
  return { id, name: pretty(id), zone: builtinZoneOf(id) || fileZoneOf(id), kind: BUILTIN_KIND[id] || null };
}
function fileZoneOf(id) { const zs = window.SO_ZONES || {}; return Object.keys(zs).find(z => zs[z] && zs[z].places && zs[z].places[id]) || null; }
const placeKind = (id) => (PLACES[id] && PLACES[id].kind) || BUILTIN_KIND[id] || null;
const zoneOfPlace = (id) => place(id).zone;
function npcRow(id) {
  if (NPCS[id]) return NPCS[id];
  const ep = episodes().find(e => e.npc === id);
  return { id, name: pretty(id), model: CHARACTERS[hash(id) % CHARACTERS.length], place: ep ? ep.place : null, voice_pitch: 1, voice_rate: 0.95 };
}
const zoneName = (z) => { const s = zoneSpecs[z] || (window.SO_ZONES || {})[z]; return [(s && s.name) || (ZONE_NAMES[z] || [pretty(z)])[0], (s && s.name_ko) || (ZONE_NAMES[z] || [])[1] || '']; };

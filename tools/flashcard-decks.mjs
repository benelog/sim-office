#!/usr/bin/env node
// Makes flashcard decks (JSON files for `flashcard-cli import`) from office/data/db.js.
//
//   node tools/flashcard-decks.mjs <out dir>        writes <out dir>/NN-<slug>.json, one file per deck
//
// A deck is 10–30 cards: one game day (or a weekend, or a kind of routine meeting) of one hero, numbered in the
// order of the game. Cards are the episode's phrases (text, meaning_ko, note_ko); an episode without phrases (routine
// meetings, the review, the pharmacy and the clinic) gives the hero's lines instead. The deck story is the dialogue
// of its episodes, in English only. The plan of decks is DECKS below: every episode with turns must be in exactly
// one deck, which this script checks.
//
// To put the decks on the server: delete the old ones, then import the files in reverse order (the deck list shows
// the newest first, so the last file goes in first):
//   cd ../flashcard/flashcard-cli && for f in $(ls -r <out dir>/*.json); do go run . import "$f"; done

import fs from 'node:fs';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname);
const root = path.join(here, '..');
const outDir = process.argv[2];
if (!outDir) { console.error('usage: node tools/flashcard-decks.mjs <out dir>'); process.exit(2); }

const w = {};
new Function('window', fs.readFileSync(path.join(root, 'office/data/db.js'), 'utf8'))(w);
const db = w.SO_DB;

// [hero, title, episode ids]. The hero is 'all' for decks every hero plays.
const DECKS = [
  ['jun', 'Day 1: the bus, a latte and your badge', ['d1_bus', 'd1_coffee', 'd1_badge']],
  ['jun', 'Day 1: onboarding, standup and your desk', ['d1_onboarding', 'd1_standup', 'd1_desk']],
  ['jun', 'Day 1: lunch at the diner and the market', ['d1_lunch', 'd1_market']],
  ['jun', 'Day 2: a code review, a moved meeting and IT support', ['d2_code_review', 'd2_reschedule', 'd2_it_laptop']],
  ['jun', 'Day 3: a one-on-one, tacos and sprint planning', ['d3_one_on_one', 'd3_lunch', 'd3_planning']],
  ['jun', 'Day 4: the deadline, benefits and time off', ['d4_deadline', 'd4_benefits', 'd4_pto']],
  ['jun', 'Day 5: the demo, your pay stub and happy hour', ['d5_demo', 'd5_paystub', 'd5_happy_hour']],
  ['jun', 'Weekend: the park, groceries and a leaky faucet', ['w_park', 'w_market', 'w_faucet']],
  ['jun', 'Day 8: a blocker, the kickoff call and a trip request', ['d8_standup', 'd8_kickoff', 'd8_trip_approval']],
  ['jun', 'Day 9: scope, booking the trip and code reviews', ['d9_scope', 'd9_travel_booking', 'd9_code_review']],
  ['jun', 'Day 10: contract terms, sign-off and the handoff', ['d10_contract_terms', 'd10_approval', 'd10_handoff']],
  ['jun', 'Day 11: check-in, security and a delayed flight', ['d11_checkin', 'd11_security', 'd11_gate']],
  ['jun', 'Day 11: the hotel, the client site and dinner', ['d11_hotel_checkin', 'd11_client_visit', 'd11_dinner']],
  ['jun', 'Day 12: signing, checkout and the flight home', ['d12_signing', 'd12_checkout', 'd12_flight_home']],
  ['jun', "Weekend: brunch and Carl's barbecue", ['w_brunch', 'w_neighbor_bbq']],
  ['jun', 'Day 15: the trip report, expenses and a sick call', ['d15_trip_report', 'd15_expenses', 'd15_sick_call']],
  ['jun', 'Standups in the room and on video', ['rt_standup_jun_1', 'rt_standup_jun_2', 'rt_standup_jun_3', 'rt_standup_jun_4', 'rt_standup_jun_5', 'rt_video_jun_1', 'rt_video_jun_2', 'rt_video_jun_3']],
  ['jun', 'One-on-ones and the 90-day review', ['rt_1on1_jun_1', 'rt_1on1_jun_2', 'rt_1on1_jun_3', 'rv_jun']],

  ['derek', 'Day 1: the usual, a favor from Maya and your status update', ['dk_d1_coffee', 'dk_d1_buddy', 'dk_d1_standup']],
  ['derek', 'Days 1–2: welcoming Jun, the review and a bad estimate', ['dk_d1_welcome', 'dk_d2_review', 'dk_d2_estimate']],
  ['derek', 'Days 2–3: a regular at the diner, your career and tacos', ['dk_d2_diner', 'dk_d3_one_on_one', 'dk_d3_tacos']],
  ['derek', 'Days 3–4: holding the line and an incident', ['dk_d3_planning', 'dk_d4_incident']],
  ['derek', 'Day 5: sharing the credit and happy hour', ['dk_d5_demo', 'dk_d5_happy_hour']],
  ['derek', "Weekend: groceries and Carl's lawn mower", ['dk_w_market', 'dk_w_park']],
  ['derek', 'Day 8: fog, risk and a postmortem', ['dk_d8_coffee', 'dk_d8_risk', 'dk_d8_postmortem']],
  ['derek', 'Day 9: delegating, ordering in and a review', ['dk_d9_delegate', 'dk_d9_lunch', 'dk_d9_review']],
  ['derek', 'Day 10: the one-page plan and the handoff', ['dk_d10_stretch', 'dk_d10_handoff']],
  ['derek', 'Day 11: covering for Jun', ['dk_d11_call', 'dk_d11_unblock']],
  ['derek', 'Day 12: the interview panel and good news', ['dk_d12_panel', 'dk_d12_signed']],
  ['derek', 'Weekend: the mower, the market and a rainy brunch', ['dk_w2_mower', 'dk_w2_market', 'dk_w2_brunch']],
  ['derek', 'Day 15: Jun is back, comp time and coffee for Carl', ['dk_d15_back', 'dk_d15_comp_time', 'dk_d15_carl']],
  ['derek', 'Standups in the room and on video', ['rt_standup_dk_1', 'rt_standup_dk_2', 'rt_standup_dk_3', 'rt_standup_dk_4', 'rt_standup_dk_5', 'rt_video_dk_1', 'rt_video_dk_2', 'rt_video_dk_3']],
  ['derek', 'One-on-ones and the year-end review', ['rt_1on1_dk_1', 'rt_1on1_dk_2', 'rt_1on1_dk_3', 'rv_derek']],

  ['priya', 'Day 1: coffee, priorities, standup and the meeting room', ['pr_d1_coffee', 'pr_d1_priorities', 'pr_d1_standup', 'pr_d1_room']],
  ['priya', 'Day 2: finding a time and design trade-offs', ['pr_d2_find_time', 'pr_d2_design']],
  ['priya', 'Day 3: feedback from Maya and sprint planning', ['pr_d3_one_on_one', 'pr_d3_planning']],
  ['priya', "Day 4: what to cut and the client's expectations", ['pr_d4_scope', 'pr_d4_client']],
  ['priya', 'Day 5: the demo, the retro and happy hour', ['pr_d5_demo', 'pr_d5_happy_hour']],
  ['priya', 'Weekend: brunch, the farmers market and groceries', ['pr_w_brunch', 'pr_w_farmers', 'pr_w_grocery']],
  ['priya', 'Day 8: coffee in the fog and the kickoff call', ['pr_d8_coffee', 'pr_d8_prep', 'pr_d8_kickoff']],
  ['priya', 'Day 9: the wish list and the action items', ['pr_d9_scope', 'pr_d9_actions']],
  ['priya', 'Day 10: the contract, the price and the refund fix', ['pr_d10_contract', 'pr_d10_signoff', 'pr_d10_refund']],
  ['priya', 'Day 11: a last-minute clause and coaching Jun', ['pr_d11_clause', 'pr_d11_jun']],
  ['priya', 'Day 12: signed, headcount and a new position', ['pr_d12_signed', 'pr_d12_headcount', 'pr_d12_hiring']],
  ['priya', 'Weekend: a park bench and a rainy diner', ['pr_w2_carl', 'pr_w2_rainy']],
  ['priya', 'Day 15: treats, standup and the first applicants', ['pr_d15_coffee', 'pr_d15_standup', 'pr_d15_applicants']],
  ['priya', 'Standups in the room and on video', ['rt_standup_pr_1', 'rt_standup_pr_2', 'rt_standup_pr_3', 'rt_standup_pr_4', 'rt_standup_pr_5', 'rt_video_pr_1', 'rt_video_pr_2', 'rt_video_pr_3']],
  ['priya', 'PM-EM syncs, sprint planning and the year-end review', ['rt_1on1_pr_1', 'rt_1on1_pr_2', 'rt_1on1_pr_3', 'rt_planning_pr_1', 'rt_planning_pr_2', 'rv_priya']],

  ['all', 'The pharmacy and the clinic', ['ph_pickup', 'ph_rx', 'ph_otc', 'cl_cold', 'cl_flu']],
  ['all', 'Retros, all-hands and sprint planning', ['rt_retro_1', 'rt_retro_2', 'rt_retro_3', 'rt_allhands_1', 'rt_allhands_2', 'rt_planning_dev_1', 'rt_planning_dev_2']],
];

const byId = (rows) => Object.fromEntries(rows.map((r) => [r.id, r]));
const episodes = byId(db.episodes);
const heroes = byId(db.heroes);
const places = byId(db.places);
const npcs = byId(db.npcs);
const turnsOf = {};
for (const t of db.turns) (turnsOf[t.episode] ??= []).push(t);
for (const list of Object.values(turnsOf)) list.sort((a, b) => a.seq - b.seq);
const phrasesOf = {};
for (const p of db.phrases) (phrasesOf[p.episode] ??= []).push(p);

// --- the plan must cover every episode once ---
const seen = new Map();
for (const [, title, ids] of DECKS) for (const id of ids) {
  if (!episodes[id]) throw new Error(`deck "${title}": unknown episode ${id}`);
  if (seen.has(id)) throw new Error(`episode ${id} is in two decks: "${seen.get(id)}" and "${title}"`);
  seen.set(id, title);
}
const missing = db.episodes.filter((e) => turnsOf[e.id] && !seen.has(e.id)).map((e) => e.id);
if (missing.length) throw new Error(`episodes in no deck: ${missing.join(', ')}`);

// --- helpers ---
const DAY1 = new Date(Date.UTC(2026, 9, 5)); // game day 1 = Monday 2026-10-05
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function dateOf(day) {
  const d = new Date(DAY1.getTime() + (day - 1) * 86400000);
  return { wd: WEEKDAYS[d.getUTCDay()], md: `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}` };
}
function dayLabel(e) {
  const from = dateOf(e.day_from);
  if (e.day_to == null) return `Any day from day ${e.day_from} (${from.wd}, ${from.md})`;
  if (e.day_to === e.day_from) return `Day ${e.day_from} (${from.wd}, ${from.md})`;
  const to = dateOf(e.day_to);
  const span = to.md.startsWith(from.md.split(' ')[0]) ? `${from.md}–${to.md.split(' ')[1]}` : `${from.md}–${to.md}`;
  return `Days ${e.day_from}–${e.day_to} (${from.wd}–${to.wd}, ${span})`;
}
const speakerName = (id, hero) => (id === hero.id ? hero.name : heroes[id]?.name ?? npcs[id]?.name ?? id);
const heroName = (e, hero) => hero ?? heroes[e.hero] ?? heroes[e.hero.split(',')[0]];
const normalize = (s) => s.toLowerCase().replace(/[…]/g, '').replace(/[.?!,;:'"]+$/g, '').trim();
const isIdiom = (text) => /…$/.test(text) || !/[.?!]$/.test(text) || /^[a-z]/.test(text);

// A line of the episode that uses the phrase, as "Speaker: line", or null.
function exampleOf(e, phrase, hero) {
  const needle = normalize(phrase.text);
  if (!needle) return null;
  for (const t of turnsOf[e.id] || []) {
    const lines = [[t.speaker || e.npc, t.line], [hero.id, t.model], [t.reply_speaker || t.speaker || e.npc, t.reply_line]];
    for (const [who, text] of lines) if (text && text.toLowerCase().includes(needle)) return `${speakerName(who, hero)}: ${text}`;
  }
  return null;
}

function cardsOf(e, hero) {
  const tags = ['sim-office'];
  if (!e.hero.includes(',') && e.hero !== 'all') tags.push(heroes[e.hero].name);
  const phrases = phrasesOf[e.id] || [];
  if (phrases.length) {
    return phrases.map((p) => ({
      text: p.text, meaning: p.meaning_ko, cardType: isIdiom(p.text) ? 'idiom' : 'sentence',
      tags: [...tags, p.category].filter(Boolean), example: exampleOf(e, p, hero),
      notes: [p.note_ko, `— ${e.title_ko}`].filter(Boolean).join('\n'),
    }));
  }
  return (turnsOf[e.id] || []).map((t) => ({
    text: t.model, meaning: t.model_ko, cardType: 'sentence', tags: [...tags, 'dialogue'],
    example: `${speakerName(t.speaker || e.npc, hero)}: ${t.line}`,
    notes: [t.prompt_ko, `— ${e.title_ko}`].filter(Boolean).join('\n'),
  }));
}

function storyOf(e, hero) {
  const out = [`## ${dayLabel(e)} · ${e.title}`, `*${places[e.place]?.name ?? e.place} · ${npcs[e.npc]?.name ?? e.npc}*`, ''];
  if (e.summary) out.push(`> ${e.summary}`, '');
  for (const t of turnsOf[e.id] || []) {
    if (t.situation) out.push(`*${t.situation}*`, '');
    out.push(`**${speakerName(t.speaker || e.npc, hero)}**: ${t.line}`, '');
    out.push(`**${hero.name}**: ${t.model}`, '');
    if (t.reply_line) out.push(`**${speakerName(t.reply_speaker || t.speaker || e.npc, hero)}**: ${t.reply_line}`, '');
  }
  return out.join('\n').trimEnd();
}

function intro(heroId) {
  if (heroId === 'all') return 'Episodes every hero plays: Jun, Derek or Priya at the pharmacy, the clinic and the meetings the whole team sits in.';
  const h = heroes[heroId];
  return `**${h.full_name}** · ${h.role}\n${h.bio}`;
}

// --- write the decks ---
fs.mkdirSync(outDir, { recursive: true });
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
let n = 0;
const report = [];
for (const [heroId, title, ids] of DECKS) {
  n += 1;
  const who = heroId === 'all' ? 'Everyone' : heroes[heroId].name;
  const hero = heroId === 'all' ? { id: 'you', name: 'You' } : heroes[heroId];
  const eps = ids.map((id) => episodes[id]);
  const cards = eps.flatMap((e) => cardsOf(e, hero));
  if (cards.length < 10 || cards.length > 30) throw new Error(`deck ${n} "${title}" has ${cards.length} cards (want 10–30)`);
  const num = String(n).padStart(2, '0');
  const name = `Sim Office ${num} · ${who} · ${title}`;
  const description = `Sim Office(미국 IT 회사 생활 체험 게임) ${who === 'Everyone' ? '공통' : who} · 대화 ${eps.length}편: ${eps.map((e) => e.title_ko).join(', ')}. 스토리에 대화 전문(영어)이 있다.`;
  const story = `${intro(heroId)}\n\n${eps.map((e) => storyOf(e, hero)).join('\n\n---\n\n')}\n`;
  const file = path.join(outDir, `${num}-${slugify(`${who} ${title}`)}.json`);
  fs.writeFileSync(file, JSON.stringify({ name, description, story, cards }, null, 1) + '\n');
  report.push(`${num} ${String(cards.length).padStart(2)} cards  ${name}`);
}
console.log(report.join('\n'));
console.log(`${n} decks, ${DECKS.flatMap((d) => d[2]).length} episodes → ${outDir}`);

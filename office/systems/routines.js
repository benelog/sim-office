/* Sim Office — meetings that come back (routines table). One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- meetings that come back (routines table)
// After the missions, on working days: the daily standup, a 1:1 every other week, sprint planning and retro, the
// monthly all-hands. A routine takes its conversations (only the hero's own) in turn; one opens around its time like
// any other conversation and is done for that day only (G.rdone { '<routine>@<day>': 1 }). A meeting you miss on a
// day you came in costs miss_points and gets a text from the manager (missedRoutines, at the end of the day).
const ROUTINES = rows('routines').slice().sort((a, b) => (a.sort || 0) - (b.sort || 0));
const ROUTINE_OF = {};
ROUTINES.forEach(r => listOf(r.episodes).concat(listOf(r.remote_episodes)).forEach(id => { if (!ROUTINE_OF[id]) ROUTINE_OF[id] = r; }));
const routineDays = (r, d) => listOf(hybridOn(d) && r.hybrid_days ? r.hybrid_days : r.days);          // hybrid work: some meetings move to office days
function routineOn(r, d) {
  if (d <= MISSION_DAYS || myOff(d) || !forHero(r.hero, G.hero) || !routineDays(r, d).includes(DAY_NAMES[(d - 1) % 7])) return false;
  if (r.every === '2weeks') return Math.floor((d - 1) / 7) % 2 === (+r.parity || 0);
  if (r.every === 'month') { const t = dateOf(d); return !!t && t.getUTCDate() <= 7; }
  return true;
}
const routineMemo = {};
function routinesOn(d) {          // that day's meetings: [{ r, ep, key }]
  if (!G) return [];
  const remote = remoteDay(d), k = G.hero + '@' + d + (remote ? '@' + callPlace(d) : '');
  if (routineMemo[k]) return routineMemo[k];
  const out = [];
  ROUTINES.forEach(r => {
    if (!routineOn(r, d)) return;
    // a remote day: a video call, from the routine's own pool for those (remote_episodes) when it has one
    const away = (x) => !!r.remote_episodes && remoteDay(x), own = away(d);
    const pool = listOf(own ? r.remote_episodes : r.episodes).map(id => EPISODES[id]).filter(e => e && mine(e));
    if (!pool.length) return;
    let n = 0;
    for (let x = MISSION_DAYS + 1; x < d; x++) if (routineOn(r, x) && away(x) === own) n++;
    const ep = pool[n % pool.length];
    out.push({ r, ep: remote ? asCall(ep, d) : ep, key: r.id + '@' + d });
  });
  return (routineMemo[k] = out);
}
const routineDue = (ep) => routinesOn(G.day).some(x => x.ep.id === ep.id && !(G.rdone && G.rdone[x.key]));
function routineCal() {          // the meetings on the calendar, from last week to two weeks ahead
  if (!G || !ROUTINES.length) return [];
  const out = [], d0 = Math.floor((G.day - 1) / 7) * 7 + 1;
  for (let d = Math.max(MISSION_DAYS + 1, d0 - 7); d < d0 + 14; d++) routinesOn(d).forEach(x => {
    if (x.ep.remote) { if (!fired()) out.push({ day: d, time: x.r.time, title: x.r.title + ' (video call)', title_ko: (x.r.title_ko || x.r.title) + ' (화상 회의)', place: x.ep.place, episode: x.ep.id, rkey: x.key }); return; }          // hybrid work
    out.push({ day: d, time: x.r.time, title: x.r.title, title_ko: x.r.title_ko, place: x.r.place, episode: x.ep.id, rkey: x.key });
  });
  return out;
}
const meetingName = (r) => /^\d/.test(r.title) ? 'your ' + r.title : 'the ' + r.title.charAt(0).toLowerCase() + r.title.slice(1);          // the daily standup, your 1:1 with Maya
function missedRoutines(d) {
  const w = work();
  if (w.fired || !/^(on|late|noon)$/.test(w.record[d] || '')) return [];
  const miss = routinesOn(d).filter(x => !(G.rdone && G.rdone[x.key]) && !coveredFor(x, d));          // a close friend may give your update
  miss.forEach(x => addScore(-(x.r.miss_points == null ? 5 : +x.r.miss_points), `Missed: ${x.r.title}`, `빠짐: ${x.r.title_ko || x.r.title}`));
  if (miss.length) notify(BOSS, `Hey ${G.name}, we missed you at ${miss.map(x => meetingName(x.r)).join(' and ')} today. Please make it to the team meetings, or give me a heads-up if you can't.`,
    `${hero().name_ko || G.name}, 오늘 ${miss.map(x => x.r.title_ko || x.r.title).join('·')}에 안 보이던데요. 팀 회의에는 꼭 와 주고, 못 오면 미리 알려 줘요.`, 'text');
  return miss;
}
// SO.debug: the meetings of a day
debugPart({
  routines: (d) => routinesOn(d == null ? G.day : d).map(x => ({ id: x.r.id, ep: x.ep.id, time: x.r.time, done: !!(G.rdone && G.rdone[x.key]) }))
});

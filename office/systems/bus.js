/* Sim Office — the bus timetable, delays and full buses. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- the bus timetable
// Every bus_every minutes from bus_first to bus_last (bus_every_weekend on weekends and federal holidays): you
// wait for the next one, and after the last one you walk.
// Buses run late (from game day bus_delay_from): on a rainy day most of them (bus_late_chance_rain) by bus_late_rain
// minutes, a few more in the rush; in the rush hours of a working day (bus_rush) about half (bus_late_chance_rush) by
// bus_late_rush; at other times now and then (bus_late_chance) by bus_late. In the rush hours a bus can be full
// (bus_full_chance, half again in the rain, never two in a row): it drives past and the one behind it comes
// bus_full_gap minutes later. Nobody gets on more than bus_delay_max minutes after the time on the timetable. It is
// all made from the day and the departure (busRand, not the dice of the moment), so the bus panel, the button, the
// ride, the radio's traffic report and Fairview Transit's alert on a rainy morning (transit_sender, bus_alert_time) agree.
const busEvery = (d = G ? G.day : 0) => +((d && (isWeekend(d) || dayOff(d)) && CFG.bus_every_weekend) || CFG.bus_every) || 0;
const busRange = (v, lo, hi) => { const m = /^\s*(\d+)\s*-\s*(\d+)\s*$/.exec(String(v == null ? '' : v)); return m ? [+m[1], Math.max(+m[1], +m[2])] : [lo, hi]; };
const busNum = (v, dflt) => v == null || v === '' || isNaN(+v) ? dflt : +v;
const busRand = (d, t, k) => { const x = Math.sin(d * 37.719 + t * 0.6173 + k * 11.13) * 43758.5453; return x - Math.floor(x); };
const busPick = (r, x) => r[0] + Math.floor(x * (r[1] - r[0] + 1));
const BUS_RUSH = listOf(CFG.bus_rush || '07:00-09:30,16:30-18:30').map(w => w.split('-').map(x => hm(x, 0)));
const BUS_WHY = { rain: [' in the rain', '비 때문에 '], rush: [' in the rush-hour traffic', '출퇴근길 정체로 '], other: ['', ''] };
const TRANSIT = CFG.transit_sender || 'Fairview Transit', BUS_LINE = String(CFG.bus_line || '12');
const busMemo = {};
function busDay(d) {             // the day's buses: [{ t: the time on the timetable, late, full, at: when it comes, board: when you get on, why }]
  if (busMemo[d]) return busMemo[d];
  const every = busEvery(d), first = hm(CFG.bus_first, 360), last = hm(CFG.bus_last, 1350), out = [];
  if (!every) return (busMemo[d] = out);
  const rain = weatherOf(d).kind === 'rain', work = !offWork(d) && !dayOff(d), max = busNum(CFG.bus_delay_max, 15), on = d >= busNum(CFG.bus_delay_from, 2) && max > 0;
  const R = { rain: busRange(CFG.bus_late_rain, 5, 10), rush: busRange(CFG.bus_late_rush, 3, 8), other: busRange(CFG.bus_late, 1, 3) }, gap = busRange(CFG.bus_full_gap, 4, 8);
  const P = { rain: busNum(CFG.bus_late_chance_rain, 0.8), rush: busNum(CFG.bus_late_chance_rush, 0.5), other: busNum(CFG.bus_late_chance, 0.1), full: busNum(CFG.bus_full_chance, 0.06) };
  let before = false;
  for (let t = first; t <= last; t += every) {
    const rush = work && BUS_RUSH.some(([a, b]) => t >= a && t < b), why = rain ? 'rain' : rush ? 'rush' : 'other';
    let late = 0, full = false;
    if (on) {
      if (busRand(d, t, 1) < (rain && rush ? 1 - (1 - P.rain) * (1 - P.rush) : P[why])) late = Math.min(max, busPick(R[why], busRand(d, t, 2)) + (rain && rush ? Math.floor(busRand(d, t, 3) * 4) : 0));
      full = rush && !before && t < last && gap[0] < max && busRand(d, t, 4) < P.full * (rain ? 1.5 : 1);
      if (full) late = Math.min(late, max - gap[0]);
    }
    const at = t + late, board = full ? Math.min(t + max, at + busPick(gap, busRand(d, t, 5))) : at;
    out.push({ t, late, full, at, board, why: late || full ? why : '' });
    before = full;
  }
  return (busMemo[d] = out);
}
function busAt(min, d) {         // the first bus you can still get on at min (after a full one, the bus behind it); null after the last
  if (!busEvery(d)) return { t: Math.floor(min), late: 0, full: false, at: Math.floor(min), board: Math.floor(min), why: '' };
  return busDay(d == null ? (G ? G.day : 1) : d).find(b => b.board >= min) || null;
}
function nextBus(min) {          // when you get on the next bus (minutes of the day); null after the last one
  const b = busAt(min);
  return b ? b.board : null;
}
const busLate = (b) => b.board - b.t;
function busNext(b, min) {       // the next bus in a few words, for the button at the stop: [en, ko]
  if (b.full && min <= b.at) return [`the ${clock(b.t)} is full, next ${clock(b.board)}`, `${clockKo(b.t)} 버스 만원, 다음 ${clockKo(b.board)}`];
  return busLate(b) > 0 ? [`next ${clock(b.board)} (${busLate(b)} min late)`, `다음 ${clockKo(b.board)} (${busLate(b)}분 지연)`] : [`next ${clock(b.t)}`, `다음 ${clockKo(b.t)}`];
}
function busStatus(b, min) {     // the bus panel: the next bus and the three after it, [en, ko] (HTML)
  const n = Math.ceil(b.board - min), w = BUS_WHY[b.why] || BUS_WHY.other;
  const when = n >= 1 ? [`, in ${n} min`, ` (${n}분 뒤)`] : [', boarding now', ' (지금 탑승 중)'];
  const head = b.full && min <= b.at ? [`The <b>${clock(b.t)}</b> bus is full and won't stop (it passes at ${clock(b.at)}). The one behind it comes at <b>${clock(b.board)}</b>${when[0]}.`, `<b>${clockKo(b.t)}</b> 버스는 만원이라 서지 않고 지나가요(${clockKo(b.at)}). 뒤차가 <b>${clockKo(b.board)}</b>에 와요${when[1]}.`]
    : b.full ? [`The <b>${clock(b.t)}</b> bus went by full. The one behind it comes at <b>${clock(b.board)}</b>${when[0]}.`, `<b>${clockKo(b.t)}</b> 버스는 만원이라 지나갔어요. 뒤차가 <b>${clockKo(b.board)}</b>에 와요${when[1]}.`]
      : b.late ? [`The <b>${clock(b.t)}</b> bus is running ${b.late} min late${w[0]}: it comes at <b>${clock(b.board)}</b>${when[0]}.`, `<b>${clockKo(b.t)}</b> 버스가 ${w[1]}${b.late}분 늦어요. <b>${clockKo(b.board)}</b>에 와요${when[1]}.`]
        : [`Next bus at <b>${clock(b.t)}</b>${when[0]}.`, `다음 버스 <b>${clockKo(b.t)}</b>${when[1]}.`];
  const after = busDay(G.day).filter(x => x.t > b.t).slice(0, 3);
  if (!after.length) return head;
  const tag = (x) => x.full ? [' full', ' 만원'] : x.late ? [` ${x.late} min late`, ` ${x.late}분 지연`] : ['', ''];
  return [head[0] + `<br>After it: ${after.map(x => clock(x.t) + tag(x)[0]).join(' · ')}.`, head[1] + `<br>그다음: ${after.map(x => clockKo(x.t) + tag(x)[1]).join(' · ')}.`];
}
function busRideText(b, min, waited) {     // what the ride was like, up to the name of the stop: [en, ko]
  const w = BUS_WHY[b.why] || BUS_WHY.other;
  if (b.full && min <= b.at) return [`The ${clock(b.t)} bus was full and drove right past. You got on the one behind it at ${clock(b.board)} and rode`, `${clockKo(b.t)} 버스가 만원이라 그냥 지나갔어요. ${clockKo(b.board)}에 뒤차를 타고`];
  if (b.full) return [`You got on the ${clock(b.board)} bus, the one behind a full ${clock(b.t)}, and rode`, `만원이던 ${clockKo(b.t)} 버스의 뒤차(${clockKo(b.board)})를 타고`];
  if (b.late && waited >= 1) return [`The ${clock(b.t)} bus was ${b.late} minutes late${w[0]}. You waited ${waited} minutes and rode`, `${clockKo(b.t)} 버스가 ${w[1]}${b.late}분 늦게 왔어요. ${waited}분을 기다려 버스를 타고`];
  return [waited >= 2 ? `You waited ${waited} minutes for the ${clock(b.board)} bus and rode` : 'You ride the bus', `${waited >= 2 ? `${waited}분을 기다려 ` : ''}버스를 타고`];
}
function busOnAir(d, m) {        // the radio's traffic report on the buses of the next hour and a half, or null when they are on time
  const soon = busDay(d).filter(b => b.t >= m - 10 && b.t < m + 90 && (b.late >= 3 || b.full));
  if (!soon.length) return null;
  const most = Math.max(...soon.map(b => b.late)), full = soon.some(b => b.full), w = BUS_WHY[soon[0].why === 'rain' ? 'rain' : 'rush'];
  return { kind: 'traffic', en: `${TRANSIT} says the Number ${BUS_LINE} is running up to ${Math.max(3, most)} minutes behind${w[0]}${full ? ', and some buses are too full to stop, so leave a little early' : ''}.`,
    ko: `${BUS_LINE}번 버스가 ${w[1]}최대 ${Math.max(3, most)}분까지 늦게 다니고 있습니다${full ? '. 만원이라 정류장을 그냥 지나치는 버스도 있으니 조금 일찍 나서세요' : ''}.` };
}
function busAlert() {            // Fairview Transit's alert on a rainy day, once, from bus_alert_time
  if (!G || G.busAlert === G.day || G.minute < hm(CFG.bus_alert_time, 390)) return;
  const late = busDay(G.day).filter(b => b.why === 'rain' && b.late);
  if (!late.length) return;
  G.busAlert = G.day;
  const lo = Math.min(...late.map(b => b.late)), hi = Math.max(...late.map(b => b.late)), full = busDay(G.day).some(b => b.full);
  notify(TRANSIT, `Service alert: rain is slowing the Number ${BUS_LINE} today. Buses are running ${lo === hi ? lo : lo + ' to ' + hi} minutes late${full ? ', and some rush-hour buses may be too full to stop' : ''}. Please allow extra time.`,
    `운행 알림: 오늘은 비 때문에 ${BUS_LINE}번 버스가 ${lo === hi ? lo : lo + '~' + hi}분 늦게 다닙니다${full ? '. 출퇴근 시간에는 만원이라 정류장을 그냥 지나치는 버스도 있을 수 있습니다' : ''}. 시간 여유를 두고 나오세요.`);
}
// SO.debug: the bus: the next one, a ride, the timetable of a day with its delays
debugPart({
  nextBus(min) { const t = G ? nextBus(min == null ? G.minute : min) : null; return t == null ? null : hhmm(t); }, ride(pid) { return ride(pid); },
  buses: (d) => busDay(d == null ? (G ? G.day : 1) : d).map(b => ({ time: hhmm(b.t), late: b.late, full: b.full, at: hhmm(b.at), board: hhmm(b.board), why: b.why }))
});

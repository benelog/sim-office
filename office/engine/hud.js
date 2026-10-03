/* Sim Office — the HUD: clock, money, energy, the goal box, small talk in passing, the guide marker. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- HUD: clock, money, energy, objective, next event
let hudTimer = 0, goalTimer = 0, goalTarget = null;
function hud() {
  if (!G) return;
  $('hud-day').textContent = dShort(G.day);
  const hol = holidayOf(G.day);
  $('hud-day').title = tr(`${dateLong(G.day)} · Day ${G.day}${hol ? ' · ' + hol.name : ''}`, `${dateKo(G.day)} · ${G.day}일째${hol ? ' · ' + (hol.name_ko || hol.name) : ''}`);
  $('hud-time').textContent = clk(G.minute);
  const wx = weatherNow(), hw = $('hud-weather'), dark = darkAt(G.minute);
  const dry = wx.kind === 'rain' && wx.rain < 0.04, lifted = wx.kind === 'fog' && wx.fog < 0.05;
  if (hw) {
    hw.textContent = `${dry ? '☁️' : lifted ? '⛅' : dark && wx.kind === 'clear' ? '🌙' : WX_ICON[wx.kind] || ''} ${KO() ? toC(wx.temp) + '°C' : wx.temp + '°F'}${soaked() ? ' 💧' : ''}`;
    const sun = sunOf(G.day);
    hw.title = tr(`${WX_NAME[wx.kind] || ''}, high ${wx.high}°F, low ${wx.low}°F (${toC(wx.temp)}°C now). ${wx.row.forecast || ''}${sun ? ' ' + sunText(G.day) + '.' : ''}${soaked() ? ' You are wet from the rain.' : ''}`,
      `${WX_NAME_KO[wx.kind] || ''}, 최고 ${toC(wx.high)}°C, 최저 ${toC(wx.low)}°C (지금 ${wx.temp}°F). ${wx.row.forecast_ko || ''}${sun ? ` 해돋이 ${hhmm(sun.rise)}, 해넘이 ${hhmm(sun.set)}.` : ''}${soaked() ? ' 비에 젖었어요.' : ''}`);
  }
  const m = $('hud-money');
  m.textContent = usd(G.money);
  m.classList.toggle('neg', G.money < 0);
  cashHud();
  const e = G.energy / E_MAX;
  $('hud-energy').style.width = (e * 100).toFixed(1) + '%';
  const box = document.querySelector('#bar .energy');
  box.classList.toggle('low', G.energy < 30 && G.energy >= 20);
  box.classList.toggle('empty', G.energy < 20);
  box.title = `${tr('Energy', '에너지')} ${Math.round(G.energy)} / ${E_MAX}`;
  const sc = $('hud-score');
  if (sc) { sc.textContent = '★ ' + score(); sc.title = tr(`Score ${score()} · ${standing()[0]}`, `점수 ${score()} · ${standing()[1]}`); sc.className = 'score ' + standing()[2]; }
}
function setBox(el, en, ko, warn) {          // en and ko are HTML
  if (!en) { el.hidden = true; return; }
  el.hidden = false;
  el.innerHTML = tr(en, ko);
  el.classList.toggle('warn', !!warn);
}
function updateGoal() {
  if (!G || state === 'title' || !Z) { setBox($('goal'), null); setBox($('next'), null); goalTarget = null; return; }
  const open = openEpisodes();
  let en = null, ko = null, warn = false;
  goalTarget = null;
  if (open.length) {
    const ep = open.find(e => isPhone(e) ? placeIn(e.place, zoneId) : e.npc && npcActors[e.npc]) || open[0];
    const n = npcRow(ep.npc), pid = isPhone(ep) ? ep.place : npcPlaceNow(n) || ep.place, pz = placeIn(pid, zoneId) ? zoneId : zoneOfPlace(pid);
    const pl = place(pid);
    if (pz === zoneId && ep.remote) {          // hybrid work: a meeting on video
      en = `Join the video call at ${esc(pl.name)}: <b>${esc(ep.title)}</b>`;
      ko = `${esc(loc(pl))}에서 화상 회의에 참여하세요: <b>${esc(loc(ep, 'title'))}</b>`;
      goalTarget = Z.places[pid] ? { at: Z.places[pid].at } : null;
    } else if (pz === zoneId && isPhone(ep)) {
      en = `Take the call at ${esc(pl.name)}: <b>${esc(ep.title)}</b>`;
      ko = `${esc(loc(pl))}에서 전화하세요: <b>${esc(loc(ep, 'title'))}</b>`;
      goalTarget = Z.places[pid] ? { at: Z.places[pid].at } : null;
    } else if (pz === zoneId) {
      en = `Talk to ${esc(n.name)}: <b>${esc(ep.title)}</b>`;
      ko = `${esc(fullName(n))}에게 말을 거세요: <b>${esc(loc(ep, 'title'))}</b>`;
      goalTarget = npcActors[ep.npc] ? { actor: npcActors[ep.npc] } : (Z.places[pid] ? { at: Z.places[pid].at } : null);
    } else {
      const zn = zoneName(pz);
      en = `Go to ${esc(pl.name)} (${esc(zn[0])})`;
      ko = `${esc(loc(pl))}(${esc(zn[1] || zn[0])})에 가세요 · ${esc(loc(ep, 'title'))}`;
      const via = pz && routeTo(zoneId, pz);
      if (via) goalTarget = { at: via.at, portal: true };
    }
  } else {
    const later = episodes().filter(laterToday).sort(epOrder)[0];
    const atWork = (zoneId === 'office' || remoteHere()) && !myOff(G.day) && !fired() && G.inDay === G.day && G.minute < 17 * 60, desk = remoteHere() ? hero().home_desk : hero().desk;
    const hg = hybridGoal();          // hybrid work: a remote day asks you to log in at your desk at home
    if (hg) {
      en = hg.en; ko = hg.ko; warn = hg.warn; goalTarget = hg.target;
    } else if (later && atWork) {
      en = `Work at your desk until ${clock(hm(later.time_from, 0))}. Next: ${esc(later.title)}`;
      ko = `${clockKo(hm(later.time_from, 0))}까지 자리에서 일하세요. 다음: ${esc(loc(later, 'title'))}`;
      if (Z.places[desk]) goalTarget = { at: Z.places[desk].at };
    } else if (later) {
      en = `Free until ${clock(hm(later.time_from, 0))}. Next: ${esc(later.title)}`;
      ko = `${clockKo(hm(later.time_from, 0))}까지 자유 시간. 다음: ${esc(loc(later, 'title'))}`;
    } else if (atWork && freePlay()) {
      const s = weekStats(G.day);
      en = `<b>At work.</b> Work at your desk: ${hrs(workedOn(G.day))} today, ${hrs(s.mins)} of about ${hrs(s.want)} this week.`;
      ko = `<b>근무 중.</b> 자리에서 일하세요: 오늘 ${hrs(workedOn(G.day))}, 이번 주 약 ${hrs(s.want)} 중 ${hrs(s.mins)}.`;
      if (Z.places[desk]) goalTarget = { at: Z.places[desk].at };
    } else if (G.minute >= 20 * 60) {
      const home = TRAVEL_ZONES.includes(zoneId) ? 'hotel' : hero().home_zone;
      const bed = home === 'hotel' ? 'hotel_room' : hero().home_bed;
      if (zoneId === home) { en = 'Time for bed. Go to your bed and sleep.'; ko = '잘 시간이에요. 침대에 가서 주무세요.'; if (Z.places[bed]) goalTarget = { at: Z.places[bed].at }; }
      else { en = `Head ${home === 'hotel' ? 'back to the hotel' : 'home'} and get some sleep.`; ko = home === 'hotel' ? '호텔로 돌아가 잠을 자세요.' : '집에 가서 잠을 자세요.'; const via = routeTo(zoneId, home); if (via) goalTarget = { at: via.at, portal: true }; }
    } else if (fired()) {
      en = `You no longer work at ${esc(CFG.company)}. Your time is your own.`;
      ko = `이제 ${esc(CFG.company)} 직원이 아니에요. 시간은 마음대로 쓰세요.`;
    } else if (leaveOf(G.day) === 'pto' && G.minute < 17 * 60) {
      en = '<b>PTO today.</b> No work: the day is yours.';
      ko = '<b>오늘은 연차.</b> 출근하지 않아도 돼요. 마음대로 보내세요.';
    } else if (leaveOf(G.day) && G.inDay !== G.day) {
      en = 'You called in sick today. Stay home and rest.';
      ko = '오늘은 병가를 냈어요. 집에서 쉬세요.';
    } else if (!myOff(G.day) && G.inDay !== G.day && G.minute < 17 * 60 && zoneId !== 'office' && !TRAVEL_ZONES.includes(zoneId)) {
      const late = G.minute > hm(CFG.late_after, 555);
      en = `${late ? "You're late! " : ''}Go to work at <b>${esc(CFG.company)}</b>${late ? '' : `: be in by ${clock(hm(CFG.late_after, 555))}`}.`;
      ko = `${late ? '지각이에요! ' : ''}<b>${esc(ZONE_NAMES.office[1] || CFG.company)}</b>에 출근하세요${late ? '' : ` (${clockKo(hm(CFG.late_after, 555))}까지)`}.`;
      warn = late;
      const via = routeTo(zoneId, 'office');
      if (via) goalTarget = { at: via.at, portal: true };
    } else if (!myOff(G.day) && G.outDay === G.day && G.minute < EARLY() && zoneId !== 'office' && !TRAVEL_ZONES.includes(zoneId)) {
      en = `Head back to work at <b>${esc(CFG.company)}</b> before ${clock(EARLY())}.`;
      ko = `${clockKo(EARLY())} 전에 <b>${esc(ZONE_NAMES.office[1] || CFG.company)}</b>로 돌아가세요.`;
      const via = routeTo(zoneId, 'office');
      if (via) goalTarget = { at: via.at, portal: true };
    } else if (companyOff(G.day) && !isWeekend(G.day)) {
      const hol = holidayOf(G.day);
      en = `<b>Day off${hol ? ': ' + esc(hol.name) : ''}.</b> ${esc(CFG.company)} is closed today.`;
      ko = `<b>쉬는 날${hol ? ': ' + esc(loc(hol)) : ''}.</b> 오늘은 ${esc(ZONE_NAMES.office[1] || CFG.company)}가 쉬어요.`;
    } else if (freePlay()) {
      en = `<b>Free play.</b> Live your life in ${esc(CFG.city)}: work, shop, cook, explore.`;
      ko = `<b>자유 플레이.</b> ${esc(zoneName('city')[1] || CFG.city)}에서 살아 보세요: 일하고, 장 보고, 요리하고, 구경하세요.`;
    } else {
      en = 'Free time. Explore, shop, or grab something to eat.';
      ko = '자유 시간. 둘러보거나 장을 보거나 뭔가 먹어요.';
    }
  }
  const bus = en && busHint();          // a goal in the other town: the way there is the bus stop of this one
  if (bus) {
    en += `<br><small>That's across town: take the Number ${BUS_LINE} bus at the ${esc(place(bus.pid).name)} (on foot, about ${bus.walk} min).</small>`;
    ko += `<br><small>다른 동네예요: ${esc(loc(place(bus.pid)))}에서 ${BUS_LINE}번 버스를 타세요(걸으면 약 ${bus.walk}분).</small>`;
    goalTarget = { at: bus.at };
  }
  if (G.energy < 30) { warn = true; en += `<br><small>Low energy (${Math.round(G.energy)}). Eat something or rest.</small>`; ko += `<br><small>에너지가 낮아요(${Math.round(G.energy)}). 뭔가 먹거나 쉬세요.</small>`; }
  const sick = illNote(); if (sick) { en += `<br><small>${sick[0]}</small>`; ko += `<br><small>${sick[1]}</small>`; }
  setBox($('goal'), en, ko, warn);
  const cal = calendar().filter(c => c.day === G.day && hm(c.time, 0) >= G.minute - 30 && !firedOut(c.place)).sort((a, b) => hm(a.time, 0) - hm(b.time, 0))[0];
  if (cal) setBox($('next'), `Next: <b>${clock(hm(cal.time, 0))}</b> ${esc(cal.title)}${cal.place ? ' · ' + esc(place(cal.place).name) : ''}`, `다음 일정: <b>${clockKo(hm(cal.time, 0))}</b> ${esc(loc(cal, 'title'))}${cal.place ? ' · ' + esc(loc(place(cal.place))) : ''}`);
  else setBox($('next'), null);
  Object.values(npcActors).forEach(a => { if (a.mark) a.mark.visible = open.some(e => e.npc === a.id && !isPhone(e)); });
  phoneMarks(open.filter(e => isPhone(e) && Z.places[e.place] && placeIn(e.place, zoneId) && !(talk && talk.ep.id === e.id)));
  // people with nothing to discuss make small talk as you pass (a bubble; Chat also says it aloud)
  if (state === 'play' && player) Object.values(npcActors).forEach(a => {
    if (a.leaving || open.some(e => e.npc === a.id) || !(CHATTER[a.id] || []).length) return;
    if (Math.hypot(a.pos.x - player.pos.x, a.pos.z - player.pos.z) > 2.0 || elapsed - (a.chatAt || -99) < 40) return;
    a.chatAt = elapsed;
    const c = remark(a);
    say(a, personal(c.line), c.line_ko && personalKo(c.line_ko), 3.5);
  });
}
// The town is two towns with a long road between them: when the goal is in the other one (more than BUS_FAR away along
// the road), the goal box says to take the bus and the marker points at the nearest bus stop
const BUS_FAR = 45;
function busHint() {
  if (zoneId !== 'city' || !goalTarget || !player) return null;
  const to = goalTarget.actor ? [goalTarget.actor.pos.x, goalTarget.actor.pos.z] : goalTarget.at;
  if (!to || Math.abs(to[0] - player.pos.x) < BUS_FAR) return null;
  let best = null, bd = Infinity;
  Object.keys(Z.places).forEach(pid => {
    const pl = Z.places[pid];
    if (!pl || !pl.at || !isBusStop(pid)) return;
    const d = Math.hypot(pl.at[0] - player.pos.x, pl.at[1] - player.pos.z);
    if (d < bd) { bd = d; best = { pid, at: pl.at }; }
  });
  if (!best || Math.abs(best.at[0] - to[0]) < BUS_FAR) return null;
  best.walk = Math.round(Math.hypot(to[0] - player.pos.x, to[1] - player.pos.z) / WALK * (+CFG.minutes_per_second || 1) / 5) * 5;          // game minutes on foot
  return best;
}
// what somebody says in passing: their own lines in turn, and every third time (the first time too) a remark
// about the weather, the day of the week or the time of day (smalltalk table)
function remark(a) {
  a.chatN = (a.chatN || 0) + 1;
  const lines = CHATTER[a.id] || [];
  // first, what anybody would say at the sight of you: dripping wet indoors, or in late this morning
  const about = Z.indoor && soaked() ? 'you:wet' : zoneId === 'office' && G.lateDay === G.day && G.minute < 12 * 60 ? 'you:late'
    : zoneId === 'office' && G.dirtyDay === G.day && (hash(a.id) + G.day) % 2 === 0 ? 'you:laundry' : null;
  if (about && (SMALLTALK[about] || []).length && a.about !== about + G.day) {
    a.about = about + G.day;
    return SMALLTALK[about][(hash(a.id) + G.day) % SMALLTALK[about].length];
  }
  if (a.chatN % 3 === 1 || !lines.length) {
    const wx = weatherNow(), wd = (G.day - 1) % 7, m = G.minute, topics = [];
    if (wx.kind !== 'rain' || wx.rain > 0.04 || Z.indoor) topics.push('weather:' + (wx.kind === 'fog' && wx.fog < 0.05 ? 'partly' : wx.kind));
    if (wd === 0 && m < 12 * 60) topics.push('day:monday');
    if (wd === 4) topics.push('day:friday');
    if (wd >= 5) topics.push('day:weekend');
    if (dayOff(G.day)) topics.push('holiday');
    if (zoneId === 'office' && hybridOn(G.day) && !offWork(G.day)) topics.push(remoteDay(G.day) ? 'hybrid:remote' : 'hybrid:office');          // hybrid work: a quiet floor, or everybody in
    if (m < 9 * 60 && Z.indoor) topics.push('time:morning');
    if (m >= 11.5 * 60 && m < 13.5 * 60) topics.push('time:lunch');
    if (m >= 17.5 * 60) topics.push('time:evening');
    const sun = sunOf(G.day);
    if (sun && sun.set <= 18.6 * 60 && m >= sun.set - 20) topics.push('time:dark');         // autumn: dark before you leave work
    const pool = topics.reduce((l, t) => l.concat(SMALLTALK[t] || []), []).filter(c => !(darkAt(m) && /weather:(clear|partly)/.test(c.topic)));
    if (pool.length) return pool[(hash(a.id) + G.day * 7 + a.chatN) % pool.length];
  }
  if (!lines.length) return { line: 'Hi there!', line_ko: '안녕하세요!' };
  a.chatIdx = ((a.chatIdx == null ? -1 : a.chatIdx) + 1) % lines.length;
  return lines[a.chatIdx];
}
// a phone episode has nobody to stand there: the ! floats over the place
let phones = {};
function phoneMarks(list) {
  const keep = new Set(list.map(e => e.id));
  Object.keys(phones).forEach(id => { if (!keep.has(id) || phones[id].parent !== zoneGroup) { if (phones[id].parent) phones[id].parent.remove(phones[id]); delete phones[id]; } });
  list.forEach(e => {
    if (phones[e.id]) return;
    const m = new T.Sprite(new T.SpriteMaterial({ map: bangTex, depthWrite: false, toneMapped: false }));
    m.scale.setScalar(0.22);
    const at = Z.places[e.place].at;
    m.position.set(at[0], 0.95, at[1]);
    m.renderOrder = 5;
    zoneGroup.add(m);
    phones[e.id] = m;
  });
}
// the guide on the ground: a ring at the person, a beam at the way out toward them
const marker = (function () {
  const group = new T.Group();
  const ring = new T.Mesh(new T.RingGeometry(0.34, 0.44, 32).rotateX(-Math.PI / 2), new T.MeshBasicMaterial({ color: 0xf2b632, transparent: true, opacity: 0.85, depthWrite: false, toneMapped: false }));
  ring.position.y = 0.02;
  const beam = new T.Mesh(new T.CylinderGeometry(0.22, 0.32, 3.2, 20, 1, true).translate(0, 1.6, 0),
    new T.MeshBasicMaterial({ color: 0xf2c75a, transparent: true, opacity: 0.2, depthWrite: false, side: T.DoubleSide, blending: T.AdditiveBlending, toneMapped: false }));
  group.add(ring, beam);
  group.visible = false;
  return { group, ring, beam };
})();
function markerTick(t) {
  const g = goalTarget;
  const show = !!g && (state === 'play') && !!player;
  marker.group.visible = show;
  if (!show) return;
  if (g.actor) marker.group.position.set(g.actor.pos.x, 0, g.actor.pos.z);
  else marker.group.position.set(g.at[0], 0, g.at[1]);
  const near = Math.hypot(marker.group.position.x - player.pos.x, marker.group.position.z - player.pos.z);
  marker.beam.visible = (!!g.portal || !g.actor) && near > 2.2;
  marker.beam.material.opacity = clamp((near - 2.2) / 4, 0, 1) * 0.2;
  marker.ring.scale.setScalar(1 + Math.sin(t * 4) * 0.08);
}

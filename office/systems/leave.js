/* Sim Office — time off: PTO and sick days. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- time off: PTO and sick days
// What Maya says on day 4: PTO builds up a little every paycheck (config pto_hours_year, 15 days a year), and sick
// days are separate: config sick_hours (40, California's minimum) at the start, back to full on January 1. You text
// your manager before standup (config sick_call_by) to be out sick today, or later for the next working day; with no
// sick time left it comes out of PTO, and with none of that either the day is unpaid (taken off the next paycheck).
// PTO is asked for in the HR portal at least config pto_notice_days ahead, after the missions; the manager answers
// the next morning (no: not enough PTO, or the team's sprint planning). A day of leave is a day off for you: no
// attendance, no meetings, no week review hours (myOff). G.leave = { pto, sick (hours), days { day: pto | sick |
// unpaid }, req [{ day, made, status pending | approved | declined | cancelled, why }], unpaid (days to take off pay) }.
const perHero = (v, id, def) => { const s = String(v == null ? '' : v); if (!/:/.test(s)) return s === '' ? def : +s; const m = listOf(s).map(x => x.split(':')).find(x => x[0].trim() === id); return m ? +m[1] : def; };
const LEAVE_DAY = 8, SICK_HOURS = +CFG.sick_hours || 40, PTO_NOTICE = +CFG.pto_notice_days || 14;
const ptoPerPay = () => Math.round(perHero(CFG.pto_hours_year, G.hero, 120) / 26 * 100) / 100;
const leave = () => G.leave || (G.leave = { pto: perHero(CFG.pto_start, G.hero, 0), sick: SICK_HOURS, days: {}, req: [], unpaid: 0 });
const leaveOf = (d) => !G ? null : (G.leave && G.leave.days[d]) || (G.sickFor === d ? 'sick' : null);
const myOff = (d) => offWork(d) || !!leaveOf(d);          // a day you are not expected at work
const days1 = (h) => Math.round(h / LEAVE_DAY * 10) / 10;
const leaveText = (h) => tr(`${Math.round(h * 10) / 10} h (${days1(h)} day${days1(h) === 1 ? '' : 's'})`, `${Math.round(h * 10) / 10}시간(${days1(h)}일)`);
const nextWorkday = (d) => { while (myOff(d)) d++; return d; };
function leaveChanged() { Object.keys(routineMemo).forEach(k => delete routineMemo[k]); goalTimer = 0; }
// texting in sick: today before standup if you have not come in yet, otherwise the next working day
function sickTarget() {
  if (!G || fired()) return null;
  const today = G.minute < hm(CFG.sick_call_by, 570) && !myOff(G.day) && G.inDay !== G.day;
  if (today) return G.day;
  let d = G.day + 1;
  while (offWork(d) || leaveOf(d) === 'pto') d++;          // the next day you would go in (already off sick: nothing to text)
  return d;
}
function takeSick(d, quiet) {
  const L = leave();
  if (leaveOf(d) || offWork(d)) return null;
  const from = L.sick >= LEAVE_DAY ? 'sick' : L.pto >= LEAVE_DAY ? 'pto' : 'unpaid';
  if (from === 'sick') L.sick -= LEAVE_DAY; else if (from === 'pto') L.pto -= LEAVE_DAY; else L.unpaid = (L.unpaid || 0) + 1;
  L.days[d] = from === 'unpaid' ? 'unpaid' : 'sick';
  G.sickFor = d;
  leaveChanged();
  logEvent('leave', 'Called in sick', 0, { ko: '병가 연락' });
  const when = d === G.day ? 'today' : weekday(d), whenKo = d === G.day ? '오늘' : WEEKDAYS_KO[(d - 1) % 7];
  const recent = Object.keys(L.days).filter(x => +x > d - 30 && +x <= d && L.days[x] !== 'pto').length;
  if (!quiet) {
    notify(BOSS, `Sorry to hear that, ${G.name}. Take ${when} off and rest. I'll let the team know.${from === 'pto' ? ' You\'re out of sick time, so this comes out of your PTO.' : from === 'unpaid' ? ' You\'re out of sick time and PTO, so this one will be unpaid.' : ''}`,
      `${hero().name_ko || G.name}, 저런. ${whenKo}은 쉬면서 몸조리해요. 팀에는 내가 말해 둘게요.${from === 'pto' ? ' 병가가 다 떨어져서 이번은 연차에서 빠져요.' : from === 'unpaid' ? ' 병가도 연차도 없어서 이번은 무급이에요.' : ''}`, 'text');
    if (recent === 3) notify(BOSS, `${G.name}, I noticed you've been out sick a few times this month. No problem with that, but if something's going on, I'm happy to talk. Your health comes first.`,
      `${hero().name_ko || G.name}, 이번 달에 몇 번 아팠네요. 쉬는 건 괜찮은데, 혹시 무슨 일이 있으면 편하게 얘기해요. 건강이 먼저예요.`, 'text');
  }
  return { day: d, from };
}
function callInSick() {
  const d = sickTarget();
  if (d == null) return null;
  if (leaveOf(d)) { toast(`You're already off on ${dShort(d)}.`, `${dShort(d)}은 이미 쉬는 날이에요.`, null, 3); return null; }
  const r = takeSick(d);
  if (r) toast(tr(`You texted ${firstName(NPCS[BOSS])}: out sick ${d === G.day ? 'today' : dShort(d)}.`, `${firstName(NPCS[BOSS])}에게 문자: ${d === G.day ? '오늘' : dShort(d)} 병가.`), null, null, 3.5);
  return r;
}
// PTO: the days you can ask for (working days after the missions, at least pto_notice_days ahead, in the next 8 weeks)
function ptoDays() {
  const out = [];
  for (let d = Math.max(G.day + PTO_NOTICE, MISSION_DAYS + 1); d <= G.day + 56; d++) if (!myOff(d) && !leave().req.some(r => r.day === d && r.status === 'pending')) out.push(d);
  return out;
}
const pendingPto = () => leave().req.filter(r => r.status === 'pending').length * LEAVE_DAY;
function requestPto(d) {
  const L = leave();
  if (fired() || !ptoDays().includes(+d)) return false;
  if (L.pto - pendingPto() < LEAVE_DAY) { toast(`Not enough PTO: you have ${leaveText(L.pto - pendingPto())} free.`, `연차가 부족해요: 쓸 수 있는 건 ${leaveText(L.pto - pendingPto())}.`, 'bad', 3.5); return false; }
  L.req.push({ day: +d, made: G.day, status: 'pending' });
  logEvent('leave', 'Asked for PTO', 0, { ko: '연차 신청' });
  toast(`PTO request sent for ${dShort(+d)}. ${firstName(NPCS[BOSS])} will answer by tomorrow.`, `${dShort(+d)} 연차를 신청했어요. ${firstName(NPCS[BOSS])}가 내일까지 답할 거예요.`, null, 3.5);
  return true;
}
function cancelPto(d) {
  const L = leave(), r = L.req.find(x => x.day === +d && (x.status === 'pending' || x.status === 'approved'));
  if (!r || +d <= G.day) return false;
  if (r.status === 'approved') { L.pto += LEAVE_DAY; delete L.days[d]; leaveChanged(); }
  r.status = 'cancelled';
  return true;
}
// the next morning (from goToSleep): the manager answers PTO requests; payday adds PTO and takes off unpaid days;
// January 1 fills the sick time again. Returns lines for the morning card.
function leaveMorning() {
  const L = leave(), out = [], boss = firstName(NPCS[BOSS] || { name: 'Maya' }), me = hero().name_ko || G.name;
  L.req.filter(r => r.status === 'pending').forEach(r => {
    const planning = ROUTINES.some(x => x.id === 'planning' && routineOn(x, r.day));
    if (fired()) r.status = 'declined';
    else if (L.pto < LEAVE_DAY) { r.status = 'declined'; r.why = 'balance'; }
    else if (planning) { r.status = 'declined'; r.why = 'planning'; }
    else { r.status = 'approved'; L.pto -= LEAVE_DAY; L.days[r.day] = 'pto'; leaveChanged(); }
    if (fired()) return;
    const day = dateLong(r.day), dayKo = dateKo(r.day);
    if (r.status === 'approved') {
      notify(BOSS, `Approved your PTO for ${day}. Enjoy! Just make sure anything urgent is handed off before you go.`, `${dayKo} 연차 승인했어요. 잘 쉬어요! 급한 일은 가기 전에 넘겨 주고요.`, 'text');
      out.push(tr(`🏖️ ${esc(boss)} approved your PTO for <b>${esc(day)}</b>. PTO left: ${leaveText(L.pto)}.`, `🏖️ ${esc(josa(boss, '이', '가'))} <b>${esc(dayKo)}</b> 연차를 승인했어요. 남은 연차: ${leaveText(L.pto)}.`));
    } else {
      const why = r.why === 'planning' ? ['that\'s our sprint planning day, and I need everyone there. Could you pick another day?', '그날은 스프린트 계획 날이라 다 있어야 해요. 다른 날로 골라 줄래요?']
        : ['you don\'t have enough PTO built up for that yet.', '아직 그만큼 연차가 쌓이지 않았어요.'];
      notify(BOSS, `Sorry, ${G.name}, I can't approve PTO for ${day}: ${why[0]}`, `${me}, 미안해요. ${dayKo} 연차는 승인하기 어려워요. ${why[1]}`, 'text');
      out.push(tr(`🗓️ ${esc(boss)} turned down your PTO for <b>${esc(day)}</b>: ${esc(why[0])}`, `🗓️ ${esc(josa(boss, '이', '가'))} <b>${esc(dayKo)}</b> 연차를 거절했어요. ${esc(why[1])}`));
    }
  });
  const t = dateOf(G.day);
  if (t && t.getUTCMonth() === 0 && t.getUTCDate() === 1) { L.sick = SICK_HOURS; out.push(tr(`🩺 A new year: your sick time is back to ${leaveText(SICK_HOURS)}.`, `🩺 새해가 되어 병가가 ${leaveText(SICK_HOURS)}으로 다시 채워졌어요.`)); }
  const d = leaveOf(G.day);
  if (d === 'pto') out.push(tr('🏖️ You\'re on <b>PTO</b> today. No work: the day is yours, and it\'s paid.', '🏖️ 오늘은 <b>연차</b>예요. 출근하지 않아도 되고, 유급이에요.'));
  else if (d) out.push(tr(`🤒 You're out sick today${d === 'unpaid' ? ' (unpaid)' : ''}. Stay home and rest.`, `🤒 오늘은 병가예요${d === 'unpaid' ? '(무급)' : ''}. 집에서 쉬세요.`));
  return out;
}
function sickButton() {
  const d = sickTarget();
  if (d == null || leaveOf(d)) return '';
  return `<button type="button" data-leave="sick">${tr(`🤒 Text ${esc(firstName(NPCS[BOSS]))}: out sick ${d === G.day ? 'today' : esc(dShort(d))}`, `🤒 ${esc(firstName(NPCS[BOSS]))}에게 문자: ${d === G.day ? '오늘' : esc(dShort(d))} 병가`)}</button>`;
}
function leavePanel() {          // Work record: the balances, the requests, asking for PTO and texting in sick
  const L = leave(), free = L.pto - pendingPto(), opts = ptoDays();
  const ST = { pending: ['waiting for an answer', '답을 기다리는 중'], approved: ['approved', '승인됨'], declined: ['turned down', '거절됨'], cancelled: ['cancelled', '취소함'] };
  const reqs = L.req.filter(r => r.day >= G.day - 7).slice().sort((a, b) => a.day - b.day);
  const sick = Object.keys(L.days).map(Number).filter(d => L.days[d] !== 'pto').sort((a, b) => b - a).slice(0, 5);
  return `<h3>${tr('Time off', '휴가')}</h3><div class="sum"><div><b>${leaveText(L.pto)}</b>${tr('PTO', '연차')}</div><div><b>${leaveText(L.sick)}</b>${tr('sick time', '병가')}</div></div>
    <p class="fine">${tr(`PTO builds up ${ptoPerPay()} h every payday. Ask for it in the HR portal at least ${PTO_NOTICE} days ahead; ${esc(firstName(NPCS[BOSS]))} answers the next morning. Sick time is separate: text your manager before ${clock(hm(CFG.sick_call_by, 570))} to be out today, or later for the next working day. It fills up again on January 1. With no sick time left a sick day comes out of PTO, and then it's unpaid.`,
      `연차는 월급날마다 ${ptoPerPay()}시간씩 쌓여요. HR 포털에서 적어도 ${PTO_NOTICE}일 전에 신청하면 ${esc(firstName(NPCS[BOSS]))}가 다음 날 아침에 답해요. 병가는 따로예요: ${clockKo(hm(CFG.sick_call_by, 570))} 전에 매니저에게 문자하면 오늘, 그 뒤면 다음 근무일이 병가예요. 1월 1일에 다시 채워져요. 병가가 떨어지면 연차에서, 연차도 없으면 무급이에요.`)}</p>
    ${reqs.map(r => `<div class="row"><span class="when">${esc(dShort(r.day))}</span><div class="main"><div class="t">${tr('PTO', '연차')}</div><div class="s">${esc(tr(ST[r.status][0], ST[r.status][1]))}</div></div>${(r.status === 'pending' || r.status === 'approved') && r.day > G.day ? `<button type="button" data-leave="cancel:${r.day}">${tr('Cancel', '취소')}</button>` : ''}</div>`).join('')}
    ${sick.map(d => `<div class="row"><span class="when">${esc(dShort(d))}</span><div class="main"><div class="t">${tr('Sick day', '병가')}${L.days[d] === 'unpaid' ? tr(' (unpaid)', ' (무급)') : ''}</div></div></div>`).join('')}
    <div class="leave-ask">${opts.length && free >= LEAVE_DAY ? `<select id="pto-day" aria-label="${tr('Day', '날짜')}">${opts.map(d => `<option value="${d}">${esc(dShort(d))}</option>`).join('')}</select> <button type="button" data-leave="pto">${tr('Ask for PTO', '연차 신청')}</button>`
      : `<span class="fine">${free < LEAVE_DAY ? tr(`Not enough PTO for a day yet (${leaveText(Math.max(0, free))} free).`, `아직 하루치 연차가 없어요(쓸 수 있는 연차 ${leaveText(Math.max(0, free))}).`) : tr('No days to ask for yet.', '아직 신청할 수 있는 날이 없어요.')}</span>`} ${sickButton()}</div>`;
}
on('morning', () => fired() ? null : leaveMorning(), 210);          // PTO answers, a day off today, the sick time of a new year
// SO.debug: time off
debugPart({
  get leave() { return G ? JSON.parse(JSON.stringify(leave())) : null; }, leaveOf: (d) => leaveOf(d == null ? G.day : d),
  callInSick() { return callInSick(); }, requestPto(d) { return requestPto(d); }, cancelPto(d) { return cancelPto(d); }, ptoDays() { return ptoDays(); }
});

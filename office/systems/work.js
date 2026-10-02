/* Sim Office — the job: the score, showing up on time, getting fired; the missions, then free play. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- work: the score, showing up on time, getting fired
// G.score: points for what you say (the right answer the first time 10, the second time 5, later 2) and for showing up
// on a working day (on time +5, late −10, in after noon −20, not at all −30). Holidays are working days at the office.
// G.work = { pts, record { day: on | late | noon | absent | trip | sick }, warned 0..2, fired (day), streak }: strikes
// for being late (config late_points), coming in after noon (noon_points) or not coming (absent_points); five on-time
// days in a row take one off. At warn_points the manager has a word with you (a text), at final_points HR sends a
// final written warning, at fire_points you are let go: the last paycheck (the days you worked since the last payday)
// comes at once, the work conversations are over, and your badge no longer opens the door of the office.
const WORK_ZONES = ['office'].concat(TRAVEL_ZONES);
const BOSS = 'maya', HR = 'linda';
const work = () => G.work || (G.work = { pts: 0, record: {}, warned: 0, fired: null, streak: 0 });
const fired = () => !!G && !!G.work && !!G.work.fired;
// pay every other Friday: the hero's, times the raises from reviews (G.raise, 1 at the start); with the plans table,
// the pay stub of day d (today by default): the benefits and the 401(k) in effect then (see benefits, below)
const netPay = (d) => benefitsOn() ? payStub(d).net : cents(+hero().salary_net * ((G && G.raise) || 1)), grossPay = (d) => benefitsOn() ? payStub(d).gross : Math.round(+hero().salary_gross * ((G && G.raise) || 1));
const colleague = (id) => !!NPCS[id] && !!NPCS[id].place && zoneOfPlace(NPCS[id].place) === 'office';
const firedOut = (pid, ep) => fired() && ((!!pid && WORK_ZONES.includes(zoneOfPlace(pid))) || (!!ep && isPhone(ep) && colleague(ep.npc)));
const score = () => G ? Math.round(G.score || 0) : 0;
function addScore(n, en, ko) {
  if (!G || !n) return;
  G.score = (G.score || 0) + n;
  G.points = (G.points || []).concat({ day: G.day, minute: Math.floor(G.minute), n, en, ko }).slice(-300);
  const sc = $('hud-score');
  if (sc) { sc.classList.remove('pop', 'up', 'down'); void sc.offsetWidth; sc.classList.add('pop', n > 0 ? 'up' : 'down'); }
}
const STANDING = [['Good standing', '근무 양호', 'ok'], ['Verbal warning', '구두 경고', 'warn'], ['Final warning', '최종 경고', 'bad'], ['Let go', '해고됨', 'fired']];
const standing = () => !G ? STANDING[0] : fired() ? STANDING[3] : STANDING[(G.work && G.work.warned) || 0];
const ATTEND = {
  on: ['On time', '정시 출근', 5], late: ['Late', '지각', -10], noon: ['In after noon', '오후 출근', -20], absent: ['Did not come in', '결근', -30],
  trip: ['Business trip', '출장', 0], sick: ['Called in sick', '병가', 0], pto: ['PTO', '연차', 0], early: ['Left early', '조퇴', -10]
};
// the first time at work on a working day: on time, late, or in after lunch (from travel)
function checkIn() {
  const w = work(), d = G.day, m = Math.floor(G.minute), start = hm(CFG.work_start, 540);
  G.inDay = d; G.inAt = m;
  if (w.fired || myOff(d)) return null;
  const kind = m <= hm(CFG.late_after, 555) ? 'on' : m < 12 * 60 ? 'late' : 'noon';
  w.record[d] = kind;
  addScore(ATTEND[kind][2], ATTEND[kind][0], ATTEND[kind][1]);
  if (kind === 'on') { onTime(); return kind; }
  G.lateDay = d;
  w.streak = 0;
  toast(kind === 'late' ? `You're late: it's ${clock(m)}, and work starts at ${clock(start)}.` : `It's ${clock(m)}. You've missed the whole morning.`,
    kind === 'late' ? `지각이에요. 지금은 ${clockKo(m)}이고 업무는 ${clockKo(start)}에 시작해요.` : `지금은 ${clockKo(m)}. 오전을 통째로 빠졌어요.`, 'bad', 4.5);
  strike(kind === 'late' ? +CFG.late_points : +CFG.noon_points, true, 'late');
  return kind;
}
function onTime() {
  const w = work();
  w.streak = (w.streak || 0) + 1;
  if (w.streak % 5 === 0 && w.pts > 0) { w.pts--; return true; }        // a good week makes up for a bad morning
  return false;
}
// at the end of a working day (from goToSleep): you never came in, or you were on a trip or called in sick
function closeDay(d, away) {
  const w = work();
  if (w.fired || offWork(d)) return null;
  if (w.record[d]) return leftEarly(d, away);
  const off = leaveOf(d);          // you texted in sick, or took the day as PTO
  const kind = off ? (off === 'pto' ? 'pto' : 'sick') : (away || G.tripDay === d) ? 'trip' : G.inDay === d ? null : 'absent';
  if (!kind) return null;
  w.record[d] = kind;
  if (kind !== 'absent') return kind;
  w.streak = 0;
  addScore(ATTEND.absent[2], ATTEND.absent[0], ATTEND.absent[1]);
  strike(+CFG.absent_points, false, 'absent');
  return kind;
}
// you came in, went out before early_before and never came back (not for a trip): left early (w.left { day: minute })
function leftEarly(d, away) {
  const w = work();
  if (G.outDay !== d || G.outAt == null || away || G.tripDay === d || !/^(on|late|noon)$/.test(w.record[d])) return null;
  w.left = Object.assign({}, w.left, { [d]: G.outAt });
  w.streak = 0;
  addScore(ATTEND.early[2], ATTEND.early[0], ATTEND.early[1]);
  strike(+CFG.early_points, false, 'early');
  return 'early';
}
// strikes add up: a word from the manager, a final warning from HR, and then you are let go
function strike(n, now, why) {
  const w = work();
  w.pts += n;
  if (w.pts >= +CFG.fire_points) { fire(now); return; }
  if (w.pts >= +CFG.final_points && w.warned < 2) {
    w.warned = 2;
    notify(HR, `FINAL WRITTEN WARNING. ${G.name}, this is a formal warning about your attendance: you have been late, absent or gone early too often. One more late arrival, early departure or unexcused absence will lead to the end of your employment with ${CFG.company}. Please come see me if something is going on. — ${(NPCS[HR] || { name: 'HR' }).name}, HR`,
      `최종 서면 경고. ${hero().name_ko || G.name} 님, 근태에 관한 공식 경고입니다. 지각·결근·조퇴가 너무 잦습니다. 한 번 더 지각·조퇴하거나 무단결근하면 ${CFG.company}와의 고용 관계가 종료됩니다. 무슨 사정이 있다면 찾아와 주세요. — 인사팀 ${(NPCS[HR] || {}).name_ko || (NPCS[HR] || { name: 'HR' }).name}`, 'email');
  } else if (w.pts >= +CFG.warn_points && w.warned < 1) {
    w.warned = 1;
    const me = hero().name_ko || G.name, home = hybridStrike(why);          // hybrid work: the words for a remote day
    if (home) notify(BOSS, home[0], home[1], 'text');
    else if (why === 'early') notify(BOSS, `Hey ${G.name}, I came by your desk this afternoon and you had already left. Everything okay? Unless we've talked about it, please stay at least until ${clock(EARLY())}.`,
      `${me}, 오후에 자리에 가 봤더니 벌써 퇴근했더라고요. 괜찮아요? 미리 얘기한 게 아니면 적어도 ${clockKo(EARLY())}까지는 있어 주세요.`, 'text');
    else if (why === 'absent') notify(BOSS, `Hey ${G.name}, you didn't come in and I didn't hear from you. Everything okay? If you're sick, just text me before standup.`,
      `${me}, 출근도 안 하고 연락도 없었네요. 괜찮아요? 아프면 스탠드업 전에 문자만 주세요.`, 'text');
    else notify(BOSS, `Hey ${G.name}, I noticed you weren't here on time. Everything okay? We need you at standup. Please be in by ${clock(hm(CFG.work_start, 540))} from now on.`,
      `${me}, 오늘 제시간에 안 왔던데 괜찮아요? 스탠드업에 꼭 있어야 해요. 앞으로는 ${clockKo(hm(CFG.work_start, 540))}까지 와 주세요.`, 'text');
  }
  if (now) saveGame();
}
function fire(now, why) {          // why: 'probation' (not through probation), otherwise attendance
  const w = work();
  if (w.fired) return;
  w.fired = G.day;
  let lastPay = G.day;
  while (lastPay > 0 && !isPayday(lastPay)) lastPay--;
  const worked = Object.keys(w.record).filter(d => +d > lastPay && /^(on|late|noon|trip|sick|pto)$/.test(w.record[d]) && leaveOf(+d) !== 'unpaid').length;
  const final = cents(netPay() * worked / 10);
  addScore(-50, 'Let go', '해고');
  const because = why === 'probation' ? ['you did not pass your extended probation', '연장된 수습 기간을 통과하지 못해'] : ['of repeated lateness and absences', '잦은 지각과 결근으로'];
  notify(HR, `${G.name}, as we discussed, your employment with ${CFG.company} ends today because ${because[0]}. Your badge and your accounts have been turned off.${final ? ` Your final paycheck of ${usd2(final)} has been deposited.` : ''} Please return your laptop to the front desk. We wish you well.`,
    `${hero().name_ko || G.name} 님, ${because[1]} 오늘부로 ${CFG.company}와의 고용이 종료됩니다. 출입증과 계정은 비활성화되었습니다.${final ? ` 마지막 급여 ${usd2(final)}가 입금되었습니다.` : ''} 노트북은 프런트에 반납해 주세요. 앞날에 행운을 빕니다.`, 'email');
  if (final) pay(final, 'Final paycheck (direct deposit)', 'income', { ko: '마지막 급여 (계좌 입금)' });
  logEvent('fired', 'Let go', 0, { ko: '해고됨' });
  if (now) letGo();
}
// fired on the spot, at work: the manager and HR walk you out
function letGo() {
  saveGame();
  if (zoneId !== 'office' && remoteDay(G.day)) { letGoRemote(); return; }          // hybrid work: at home, on a video call
  const boss = firstName(NPCS[BOSS] || { name: 'Maya' }), hr = firstName(NPCS[HR] || { name: 'Linda' });
  showCard({ kicker: CFG.company, title: tr("You're let go", '해고되었습니다'),
    body: tr(`<p>${esc(boss)} and ${esc(hr)} from HR are waiting for you by the front desk.</p><p class="quote">“${esc(G.name)}, we've talked about this. You've been late or absent too many times, so we're letting you go, effective today. I'm sorry it came to this.”</p><p>Your badge is turned off and you're walked out of the building. Your final paycheck goes to your bank account.</p>`,
      `<p>${esc(josa(boss, '과', '와'))} 인사팀 ${esc(josa(hr, '이', '가'))} 프런트 옆에서 기다리고 있어요.</p><p class="quote">“${esc(myName())}, 이 얘기는 전에도 했죠. 지각과 결근이 너무 많아서 오늘부로 함께할 수 없게 됐어요. 이렇게 돼서 유감이에요.”</p><p>출입증이 비활성화되고 건물 밖으로 안내받습니다. 마지막 급여는 은행 계좌로 들어옵니다.</p>`),
    ok: tr('Leave the building', '건물에서 나가기'), state: 'card' }, () => { travel('city', 'office_door'); });
  speak(`${G.name}, we've talked about this. You've been late or absent too many times, so we're letting you go, effective today.`, voiceOf(NPCS[BOSS]));
}
// at the door of the office after you were let go: the badge reader blinks red and the front desk stops you
function stoppedAtDoor() {
  const w = work(), desk = NPCS.tom ? 'tom' : null, who = desk ? firstName(NPCS[desk]) : tr('The guard', '경비원');
  const line = `Sorry, ${G.name}. Your badge has been deactivated, and I can't let you in. If you left anything at your desk, HR will mail it to you.`;
  if (w.stopDay === G.day) { toast(tr('Your badge no longer opens this door.', '출입증으로 더는 이 문을 열 수 없어요.'), null, 'bad', 3); return; }
  w.stopDay = G.day;
  saveGame();
  showCard({ kicker: tr('At the front door', '정문 앞'), title: tr('Your badge doesn\'t work', '출입증이 안 열려요'),
    body: tr(`<p>The badge reader beeps and blinks red. ${esc(who)} comes over from the front desk.</p><p class="quote">“${esc(line)}”</p><p>You no longer work at ${esc(CFG.company)}.</p>`,
      `<p>출입증 리더기가 삐 소리를 내며 빨간 불이 깜빡입니다. 프런트에서 ${esc(josa(who, '이', '가'))} 다가옵니다.</p><p class="quote">“미안해요, ${esc(myName())}. 출입증이 비활성화돼서 들여보내 드릴 수가 없어요. 자리에 두고 간 물건은 인사팀이 우편으로 보내 줄 거예요.”</p><p>이제 ${esc(CFG.company)} 직원이 아닙니다.</p>`),
    ok: tr('Walk away', '돌아서기'), state: 'card' });
  speak(line, voiceOf(desk ? NPCS[desk] : null));
}
// ---------------------------------------------------------------- missions, then free play
// Every conversation of the hero is a mission of the first config mission_days days (15: two weeks and the Monday
// after). Finishing all
// of them: a congratulation, a bonus deposit (mission_bonus) and points (mission_points). From the day after, it is
// free play: no set conversations, only the town, the bills and the job (work still starts at 9:00, and late
// mornings still add up). G.mission = { day, all (every mission done), bonus } once the missions are settled.
const MISSION_DAYS = +CFG.mission_days || 14;
const missions = () => episodes().filter(e => (e.day_from || 1) <= MISSION_DAYS && !isErrand(e));
const missionsOf = (id) => rows('episodes').filter(e => (e.hero || DEFAULT_HERO) === id && (e.day_from || 1) <= MISSION_DAYS && !isErrand(e)).length;
const missionCount = () => { const all = missions(); return [all.filter(e => G.done[e.id]).length, all.length]; };
const freePlay = () => !!G && G.day > MISSION_DAYS;

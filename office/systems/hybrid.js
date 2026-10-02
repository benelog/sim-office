/* Sim Office — hybrid work: Mondays and Fridays from home. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- hybrid work: Mondays and Fridays from home
// From config hybrid_from (a date after the missions; Linda's email two weeks ahead) the office days are Tuesday to
// Thursday and config remote_days (mon,fri) are worked from home: the people in config remote_people stay away from the
// office (Tom at the front desk and Sam from IT still come in), and you log in at your desk at home (the hero's
// home_desk) instead of walking into the office. Logging in is checking in (checkIn: on time by late_after, late,
// after noon), never logging in is a missed day (closeDay), and logging off or walking out of home before
// early_before is stepping out: come back (or log back in) or it is leaving early (leftEarly), like going out of the
// office. Coming to the office on a remote day is fine and counts the same. A meeting on a remote day is a video call
// (asCall: it opens at the desk where you work today, like a phone call, without the people in the room), with its own
// conversations when the routine has remote_episodes (the standup); routines.hybrid_days moves sprint planning and the
// retro to office days. "Work for an hour" works at the home desk while you are logged in, and what comes up there
// counts like at the office, so do the hours in the week review. work().home { day: 1 }: the days you logged in from
// home. G.login = { day, from home | office, at, off }: where you work today, and whether you logged off.
const HYBRID_FROM = (() => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(CFG.hybrid_from || '')); return m && START != null ? Math.round((Date.UTC(+m[1], +m[2] - 1, +m[3]) - START) / 864e5) + 1 : null; })();
const REMOTE_DAYS = listOf(CFG.remote_days || 'mon,fri'), REMOTE_PEOPLE = listOf(CFG.remote_people);
const hybridOn = (d) => HYBRID_FROM != null && d >= Math.max(HYBRID_FROM, MISSION_DAYS + 1);
const remoteDay = (d) => hybridOn(d) && !offWork(d) && REMOTE_DAYS.includes(DAY_NAMES[(d - 1) % 7]);
const homeToday = (n, pid) => !!G && !!pid && REMOTE_PEOPLE.includes(n.id) && zoneOfPlace(pid) === 'office' && remoteDay(G.day);          // (scheduledPlace)
const loginToday = () => G && G.login && G.login.day === G.day ? G.login : null;
// where you are with work on a remote day: null (not a remote day for you), out (not logged in yet), in (logged in at
// home), office (came in), away (stepped out or logged off before early_before), off (logged off for the day)
function loginState() {
  if (!G || !remoteDay(G.day) || myOff(G.day) || fired()) return null;
  const L = loginToday();
  if (G.inDay !== G.day) return 'out';
  if (G.outDay === G.day) return 'away';
  if (L && L.off) return 'off';
  return L && L.from === 'home' ? 'in' : 'office';
}
const remoteHere = () => loginState() === 'in' && atHome();          // working at the desk at home right now
// the video call of a meeting: at your desk at the office if you came in today, otherwise at your desk at home
const callPlace = (d) => { const L = loginToday(); return d === G.day && G.inDay === d && L && L.from === 'office' ? hero().desk : hero().home_desk; };
const CALLS = {};
function asCall(ep, d) {
  const pid = callPlace(d), k = ep.id + '@' + pid;
  return CALLS[k] || (CALLS[k] = Object.assign({}, ep, { place: pid, tags: (ep.tags ? ep.tags + ',' : '') + 'phone,video', remote: true }));
}
function onCall(list) {          // (episodes) today's meetings as video calls on a remote day
  return !G || !remoteDay(G.day) ? list : list.map(e => ROUTINE_OF[e.id] ? asCall(e, G.day) : e);
}
function logIn() {
  const s = loginState(), d = G.day, m = Math.floor(G.minute);
  if (!s || s === 'in') return null;
  if (s === 'out' && G.minute >= 17 * 60) { toast(`It's ${clock(m)}. Too late to log in today.`, `${clockKo(m)}예요. 오늘 로그인하기엔 너무 늦었어요.`, 'bad', 3); return null; }
  G.login = { day: d, from: 'home', at: s === 'out' ? m : (loginToday() || {}).at, off: false };
  if (G.outDay === d) G.outDay = null;          // back at work: not leaving early after all
  const w = work();
  w.home = Object.assign({}, w.home, { [d]: 1 });
  const kind = s === 'out' ? checkIn() : 'back';          // the first time today: on time, late, or after noon (and maybe the last strike)
  if (fired()) return kind;
  if (kind === 'on') toast(`Logged in at ${clock(m)}. You're on time.`, `${clockKo(m)}에 로그인했어요. 제시간이에요.`, 'good', 3);
  else if (kind === 'back') toast(`Logged back in at ${clock(m)}.`, `${clockKo(m)}에 다시 로그인했어요.`, null, 2.6);
  player.sit = true; play(player, 'sit');
  goalTimer = 0; actSig = '';
  saveGame();
  return kind;
}
function logOff() {
  if (loginState() !== 'in') return false;
  const d = G.day, m = Math.floor(G.minute);
  G.login.off = true;
  if (m < EARLY()) {          // like walking out of the office: log back in, or it is leaving early
    G.outDay = d; G.outAt = m;
    toast(`Logged off at ${clock(m)}. Log back in before ${clock(EARLY())}, or it counts as leaving early.`, `${clockKo(m)}에 로그아웃했어요. ${clockKo(EARLY())} 전에 다시 로그인하지 않으면 조퇴예요.`, 'bad', 4.5);
  } else toast(`Logged off at ${clock(m)}. ${hrs(workedOn(d))} at your desk today.`, `${clockKo(m)}에 로그아웃했어요. 오늘 자리에서 ${hrs(workedOn(d))} 일했어요.`, null, 3.2);
  player.sit = false;
  goalTimer = 0; actSig = '';
  saveGame();
  return true;
}
// (travel) walking out of home while logged in: stepping out, like going out of the office
function leftHome(z) {
  if (loginState() !== 'in' || G.minute >= EARLY() || TRAVEL_ZONES.includes(z)) return;
  G.outDay = G.day; G.outAt = Math.floor(G.minute);
  toast(`Stepping away from your desk at ${clock(G.minute)}. Be back at it (or at the office) before ${clock(EARLY())}, or it counts as leaving early.`, `${clockKo(G.minute)}에 자리를 비워요. ${clockKo(EARLY())} 전에 돌아오지(또는 사무실에 가지) 않으면 조퇴예요.`, null, 4.5);
}
// (arrived) the office on a remote day: you work there today; home again after stepping out: back at your desk
function hybridArrived(z) {
  if (!G || !remoteDay(G.day) || fired()) return;
  const L = loginToday();
  if (z === 'office' && G.inDay === G.day) G.login = { day: G.day, from: 'office', at: L ? L.at : Math.floor(G.minute), off: false };
  else if (z === hero().home_zone && L && L.from === 'home' && !L.off && G.outDay === G.day) { G.outDay = null; toast('Back home: still logged in.', '집에 돌아왔어요. 로그인 상태 그대로예요.', null, 2.6); }
}
// (computeActions) joining a video call while not logged in logs you in first
function joinCall(ep) {
  if (ep.remote && atHome() && /^(out|away|off)$/.test(loginState() || '')) logIn();
  return !fired();
}
// (placeActions) the desk at home: log in, work, log off
function hybridActions(pid) {
  const s = pid === hero().home_desk && atHome() ? loginState() : null, out = [];
  if (!s) return out;
  if (s === 'in') {
    out.push({ key: 'work:' + pid, label: tr('Work for an hour', '한 시간 일하기'), run: () => workHour() });
    out.push({ key: 'logoff:' + pid, label: tr('Log off', '로그아웃'), run: () => logOff() });
  } else if (s !== 'out' || G.minute < 17 * 60) {
    const label = s === 'out' ? tr('Log in to work', '업무 로그인') : s === 'office' ? tr('Log in from home', '집에서 로그인') : tr('Log back in', '다시 로그인');
    out.push({ key: 'login:' + pid + s, label, run: () => logIn() });
  }
  return out;
}
// (updateGoal) a remote day: log in at your desk at home, or log back in after stepping out
function hybridGoal() {
  const s = loginState();
  if (!s || zoneId === 'office' || TRAVEL_ZONES.includes(zoneId)) return null;
  const home = hero().home_zone, desk = hero().home_desk, here = zoneId === home;
  let target = null;
  if (here) target = Z.places[desk] ? { at: Z.places[desk].at } : null;
  else { const via = routeTo(zoneId, home); if (via) target = { at: via.at, portal: true }; }
  const orOffice = here ? '' : tr(' (or go to the office)', ' (사무실에 가도 돼요)');
  if (s === 'out' && G.minute < 17 * 60) {
    const late = G.minute > hm(CFG.late_after, 555);
    return { warn: late, target, en: `${late ? "You're late! " : ''}<b>Remote day.</b> Log in at your desk at home${late ? '' : ` by ${clock(hm(CFG.late_after, 555))}`}${orOffice}.`,
      ko: `${late ? '지각이에요! ' : ''}<b>재택근무 날.</b> 집 책상에서 로그인하세요${late ? '' : ` (${clockKo(hm(CFG.late_after, 555))}까지)`}${orOffice}.` };
  }
  if (s === 'away' && G.minute < EARLY()) return { warn: false, target, en: `Log back in at your desk at home before ${clock(EARLY())}${orOffice}.`, ko: `${clockKo(EARLY())} 전에 집 책상에서 다시 로그인하세요${orOffice}.` };
  return null;
}
// (goToSleep) the morning card's work line (usual: the office one): a remote day, and the first day of hybrid work
function hybridMorning(d, usual) {
  if (!hybridOn(d) || fired()) return usual;
  const first = d === Math.max(HYBRID_FROM, MISSION_DAYS + 1);
  const intro = first ? tr(`🏢 <b>Hybrid work</b> from today: ${esc(CFG.company)} is in the office ${officeNames()[0]} and works from home on ${remoteNames()[0]}. `, `🏢 오늘부터 <b>하이브리드 근무</b>: ${josa(officeNames()[1], '은', '는')} 사무실, ${josa(remoteNames()[1], '은', '는')} 집에서 일해요. `) : '';
  if (!remoteDay(d) || myOff(d)) return intro + usual;
  return intro + tr(`🏠 <b>Remote day.</b> Log in at your desk at home by <b>${clock(hm(CFG.late_after, 555))}</b> and stay online until at least ${clock(EARLY())}. Meetings are video calls.`,
    `🏠 <b>재택근무 날.</b> <b>${clockKo(hm(CFG.late_after, 555))}</b>까지 집 책상에서 로그인하고 적어도 ${clockKo(EARLY())}까지는 접속해 있으세요. 회의는 화상으로 해요.`);
}
// the days by name: [English, Korean] (remote: Mondays and Fridays; office: Tuesday to Thursday)
const dayNames = (list, plural) => { const ix = list.map(x => DAY_NAMES.indexOf(x)).filter(i => i >= 0 && i < 5).sort(), en = ix.map(i => WEEKDAYS[i] + (plural ? 's' : '')), ko = ix.map(i => WEEKDAYS_KO[i]);
  if (ix.length > 2 && ix[ix.length - 1] - ix[0] === ix.length - 1) return [`${en[0]} to ${en[en.length - 1]}`, `${ko[0]}부터 ${ko[ko.length - 1]}까지`];
  return [en.length > 1 ? en.slice(0, -1).join(', ') + ' and ' + en[en.length - 1] : en.join(''), ko.length === 2 ? josa(ko[0], '과', '와') + ' ' + ko[1] : ko.join('·')]; };
const remoteNames = () => dayNames(REMOTE_DAYS, true), officeNames = () => dayNames(DAY_NAMES.slice(0, 5).filter(x => !REMOTE_DAYS.includes(x)), false);
// (calendar) a remote day ahead, or a day you worked from home
function hybridCal(d) {
  if (!remoteDay(d) || myOff(d)) return null;
  const w = work();
  if (w.home && w.home[d]) return tr('Worked from home', '재택근무함');
  if (w.record[d]) return null;
  return tr(`Remote day: log in from home by ${clock(hm(CFG.late_after, 555))}`, `재택근무: ${clockKo(hm(CFG.late_after, 555))}까지 집에서 로그인`);
}
// (strike) the manager's first word on a remote day
function hybridStrike(why) {
  if (!remoteDay(G.day) || (G.inDay === G.day && (loginToday() || {}).from === 'office')) return null;          // came to the office: the usual words
  const me = hero().name_ko || G.name;
  if (why === 'early') return [`Hey ${G.name}, I pinged you this afternoon and you'd already logged off. Everything okay? Unless we've talked about it, please stay online at least until ${clock(EARLY())} on remote days.`,
    `${me}, 오후에 메시지를 보냈는데 벌써 로그아웃했더라고요. 괜찮아요? 미리 얘기한 게 아니면 재택하는 날에도 적어도 ${clockKo(EARLY())}까지는 접속해 있어 주세요.`];
  if (why === 'absent') return [`Hey ${G.name}, you never logged in today and I didn't hear from you. Everything okay? Remote days are still work days. If you're sick, just text me before standup.`,
    `${me}, 오늘 로그인도 안 하고 연락도 없었네요. 괜찮아요? 재택하는 날도 근무일이에요. 아프면 스탠드업 전에 문자만 주세요.`];
  return [`Hey ${G.name}, you logged in late today. Everything okay? On remote days, please be online by ${clock(hm(CFG.work_start, 540))}, the same as at the office.`,
    `${me}, 오늘 로그인이 늦었네요. 괜찮아요? 재택하는 날에도 사무실처럼 ${clockKo(hm(CFG.work_start, 540))}까지는 접속해 주세요.`];
}
// (letGo) let go on a remote day, at home: a video call with your manager and HR
function letGoRemote() {
  const boss = firstName(NPCS[BOSS] || { name: 'Maya' }), hr = firstName(NPCS[HR] || { name: 'Linda' });
  showCard({ kicker: CFG.company, title: tr("You're let go", '해고되었습니다'),
    body: tr(`<p>A video call pops up on your laptop: ${esc(boss)} and ${esc(hr)} from HR.</p><p class="quote">“${esc(G.name)}, we've talked about this. You've been late or absent too many times, so we're letting you go, effective today. I'm sorry it came to this.”</p><p>When the call ends, your accounts stop working. Please bring the laptop and your badge to the front desk. Your final paycheck goes to your bank account.</p>`,
      `<p>노트북에 화상 통화가 뜹니다. ${esc(josa(boss, '과', '와'))} 인사팀 ${esc(hr)}예요.</p><p class="quote">“${esc(myName())}, 이 얘기는 전에도 했죠. 지각과 결근이 너무 많아서 오늘부로 함께할 수 없게 됐어요. 이렇게 돼서 유감이에요.”</p><p>통화가 끝나자 계정이 모두 막힙니다. 노트북과 출입증은 프런트에 반납해 주세요. 마지막 급여는 은행 계좌로 들어옵니다.</p>`),
    ok: tr('Close the laptop', '노트북 닫기'), state: 'card' });
  speak(`${G.name}, we've talked about this. You've been late or absent too many times, so we're letting you go, effective today.`, voiceOf(NPCS[BOSS]));
}
// (Work record) the rules, today, and the days from home this week
function hybridPanel() {
  if (HYBRID_FROM == null || G.day < HYBRID_FROM - 14 || fired()) return '';
  const s = loginState(), L = loginToday(), w = work(), from = Math.floor((G.day - 1) / 7) * 7 + 1;
  const homeDays = Object.keys(w.home || {}).map(Number).filter(d => d >= from && d < from + 7).length;
  const NOW = { out: ['Not logged in yet.', '아직 로그인하지 않았어요.'], in: [`Logged in from home${L && L.at != null ? ' at ' + clock(L.at) : ''}.`, `${L && L.at != null ? clockKo(L.at) + '에 ' : ''}집에서 로그인했어요.`],
    office: ['At the office today.', '오늘은 사무실에 나왔어요.'], away: [`Stepped away at ${clock(G.outAt || 0)}: log back in before ${clock(EARLY())}.`, `${clockKo(G.outAt || 0)}에 자리를 비웠어요. ${clockKo(EARLY())} 전에 다시 로그인하세요.`], off: ['Logged off for the day.', '오늘은 로그아웃했어요.'] };
  return `<h3>${tr('Hybrid work', '하이브리드 근무')}</h3><p class="fine">${tr(`${hybridOn(G.day) ? 'Since' : 'From'} ${esc(dateLong(HYBRID_FROM))}: ${officeNames()[0]} at the office, ${remoteNames()[0]} from home. On a remote day, log in at your desk at home by ${clock(hm(CFG.late_after, 555))} and stay online until at least ${clock(EARLY())}: logging in late is late, never logging in is a missed day. The standup is a video call, sprint planning and the retro are on office days, and you can always come to the office instead.`,
    `${dateKo(HYBRID_FROM)}${hybridOn(G.day) ? '부터' : '부터 시작'}: ${josa(officeNames()[1], '은', '는')} 사무실, ${josa(remoteNames()[1], '은', '는')} 집에서 일해요. 재택하는 날에는 ${clockKo(hm(CFG.late_after, 555))}까지 집 책상에서 로그인하고 적어도 ${clockKo(EARLY())}까지 접속해 있으세요. 늦게 로그인하면 지각, 로그인하지 않으면 결근이에요. 스탠드업은 화상으로, 스프린트 계획과 회고는 사무실 나오는 날에 하고, 언제든 사무실에 나와도 돼요.`)}</p>
    ${s ? `<p class="fine">${tr('Today', '오늘')}: ${esc(tr(NOW[s][0], NOW[s][1]))}</p>` : ''}${hybridOn(G.day) ? `<p class="fine">${tr(`This week: ${homeDays} day${homeDays === 1 ? '' : 's'} from home.`, `이번 주 재택: ${homeDays}일.`)}</p>` : ''}`;
}
// SO.debug
debugPart({
  // hybrid work: is a day remote, where you are with logging in today (null | out | in | office | away | off), log in or off at the desk at home
  remote: (d) => remoteDay(d == null ? G.day : d), get hybrid() { return { from: HYBRID_FROM, days: REMOTE_DAYS.slice(), people: REMOTE_PEOPLE.slice() }; },
  get login() { return G ? { remote: remoteDay(G.day), state: loginState(), login: loginToday() ? Object.assign({}, loginToday()) : null, inAt: G.inDay === G.day ? G.inAt : null, home: !!(work().home || {})[G.day] } : null; },
  logIn() { return logIn(); }, logOff() { return logOff(); }
});

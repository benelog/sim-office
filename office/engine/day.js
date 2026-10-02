/* Sim Office — the end of a day (sleep and the morning card) and cards. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- sleep: the end of a day
const isRentDay = (d) => START != null ? onDateOfMonth(d, RENT_DOM) : d >= RENT_DAY && (d - RENT_DAY) % 30 === 0;
function trySleep(pid) {
  if (G.minute < 20 * 60 && G.energy > 25) { toast("It's too early to sleep. Come back after 8 PM.", '아직 잘 시간이 아니에요. 오후 8시 이후에 오세요.'); return; }
  if (noiseNight(pid)) return;          // a loud neighbor first (home life): the card goes on to sleep
  goToSleep(false, pid);
}
function goToSleep(late, pid) {
  if (!G) return;
  if (talk) endTalk();
  if (!panel.hidden) closePanel();
  const day = G.day;
  const today = G.log.filter(l => l.day === day);
  const eps = today.filter(l => l.type === 'episode');
  const spent = -today.filter(l => l.amount < 0 && l.type !== 'atm').reduce((s, l) => s + l.amount, 0);          // atm: cash in or out of checking
  const earned = today.filter(l => l.amount > 0 && l.type !== 'atm').reduce((s, l) => s + l.amount, 0);
  const gained = (G.points || []).filter(p => p.day === day).reduce((n, p) => n + p.n, 0);
  const missed = episodes().filter(e => !G.done[e.id] && e.day_to != null && e.day_to === day && G.day >= (e.day_from || 1) && !firedOut(e.place, e));
  const away = TRAVEL_ZONES.includes(zoneId);
  logEvent('sleep', late ? 'Fell asleep' : 'Slept', 0);
  const inAt = G.inDay === day ? G.inAt : null, wasLate = G.lateDay === day, fromHome = !!(work().home || {})[day], wasRemote = remoteDay(day);          // (hybrid work)
  hush = true;
  const wasFired = fired();
  const att = closeDay(day, away);           // a working day you never came in: a strike (and maybe the end of the job)
  const skipped = missedRoutines(day);          // meetings you were at work for but did not go to
  const week = weekReview(day);          // the last working day of a week in free play: the manager's note
  const deskMins = workedOn(day), deskTasks = tasksOn(day);
  const firedNow = !wasFired && fired();
  const missionNote = closeMissions(day);          // the last day of the missions: free play from tomorrow
  G.day += 1;
  G.minute = DAY_START;
  G.energy = late ? Math.round(E_MAX * 0.8) : E_MAX;          // asleep on your feet at 11 PM is not a night's rest
  G.wet = 0;
  const morning = hooks('morning', { day, away, late, att, skipped, week, firedNow, wasRemote, missionNote });
  const wx = weatherOf(G.day);
  const sun = sunOf(G.day);
  morning.unshift(tr(`${WX_ICON[wx.kind] || ''} <b>${WX_NAME[wx.kind] || pretty(wx.kind)}</b>, high ${wx.high_f}°F, low ${wx.low_f}°F. ${esc(wx.forecast || '')}${sun ? ` ${sunText(G.day)}.` : ''}`,
    `${WX_ICON[wx.kind] || ''} <b>${WX_NAME_KO[wx.kind] || wx.kind}</b>, 최고 ${toC(wx.high_f)}°C, 최저 ${toC(wx.low_f)}°C. ${esc(wx.forecast_ko || '')}${sun ? ` 해돋이 ${clockKo(sun.rise)}, 해넘이 ${clockKo(sun.set)}.` : ''}`));
  const cal = calendar().filter(c => c.day === G.day && !firedOut(c.place)).sort((a, b) => hm(a.time, 0) - hm(b.time, 0));
  const workAt = hybridMorning(G.day, !myOff(G.day) && !fired() ? tr(`Work starts at <b>${clock(hm(CFG.work_start, 540))}</b>: be in by ${clock(hm(CFG.late_after, 555))}.`, `업무는 <b>${clockKo(hm(CFG.work_start, 540))}</b>에 시작해요. ${clockKo(hm(CFG.late_after, 555))}까지 출근하세요.`) : '');          // (hybrid work: a remote day logs in from home)
  const body = `<div class="sum"><div><b>${eps.length}</b>${tr('conversations', '대화')}</div><div><b>${gained >= 0 ? '+' : '−'}${Math.abs(gained)}</b>${tr('points', '점수')}</div><div><b>${usd2(spent)}</b>${tr('spent', '지출')}</div><div><b>${usd2(earned)}</b>${tr('earned', '수입')}</div></div>
    ${eps.length ? '<ul>' + eps.map(l => `<li>${esc(logText(l))}</li>`).join('') + '</ul>' : ''}
    ${missed.length ? `<p>${tr('Missed', '놓친 일')}: ${missed.map(e => esc(loc(e, 'title'))).join(', ')}</p>` : ''}
    ${deskMins ? `<p>${tr(`You worked <b>${hrs(deskMins)}</b> at your desk${deskTasks.length ? ` and handled ${deskTasks.length === 1 ? 'one thing' : deskTasks.length + ' things'} that came up` : ''}.`, `자리에서 <b>${hrs(deskMins)}</b> 일했어요${deskTasks.length ? `. 중간에 생긴 일 ${deskTasks.length}건을 처리했어요` : ''}.`)}</p>` : ''}
    ${inAt != null ? `<p>${tr(`You ${fromHome ? 'logged in from home' : 'got to work'} at <b>${clock(inAt)}</b>${wasLate ? ', late' : inAt <= hm(CFG.work_start, 540) ? ', on time' : ''}.`, `<b>${clockKo(inAt)}</b>에 ${fromHome ? '집에서 로그인' : '출근'}했어요${wasLate ? ' (지각)' : inAt <= hm(CFG.work_start, 540) ? ' (정시)' : ''}.`)}</p>` : ''}
    <p>${tr('Score', '점수')} <b>★ ${score()}</b> · ${tr(standing()[0], standing()[1])}${day <= MISSION_DAYS ? ` · ${tr('Missions', '미션')} <b>${missionCount().join(' / ')}</b>` : ''}</p>
    <h3>${tr(`${dateLong(G.day)} · Day ${G.day}`, `${dateKo(G.day)} · ${G.day}일째`)}</h3>${morning.map(m => `<p>${m}</p>`).join('')}
    ${cal.length ? '<ul>' + cal.map(c => `<li><b>${esc(c.time)}</b> ${esc(loc(c, 'title'))}${c.place ? ' · ' + esc(loc(place(c.place))) : ''}</li>`).join('') + '</ul>' : `<p>${isWeekend(G.day) ? tr('Weekend. No work today.', '주말이에요. 오늘은 출근하지 않아요.') : companyOff(G.day) ? tr('Company holiday. No work today.', '회사 휴일이에요. 오늘은 출근하지 않아요.') : tr('Nothing on the calendar.', '달력에 일정이 없어요.')}</p>`}
    ${workAt ? `<p>${workAt}</p>` : ''}
    <p>${tr('Balance', '잔액')}: <b>${usd2(G.money)}</b></p>`;
  saveGame();
  state = 'sleep';
  const wake = pid && zoneId ? [zoneId, pid] : away ? ['hotel', 'hotel_room'] : [hero().home_zone, hero().home_bed];
  const p = enterZone(wake[0], wake[1]).then(() => { if (player) player.heading += 0; saveGame(); });
  showCard({ kicker: late ? tr('You fell asleep', '잠들었어요') : tr('Good night', '잘 자요'), title: tr(`${dateLong(day)} is over`, `${dateKo(day)}이 지났어요`), body, ok: tr('Start the day', '하루 시작'), state: 'sleep' }, () => { goalTimer = 0; });
  return p;
}

// The morning card: what each part of the game adds when a day ends, by on('morning', fn, order) (engine/hooks.js).
// fn gets the night: { day (the day that ended), away (asleep on a trip), late (fell asleep at 11 PM), att (how the day
// at work ended: closeDay), skipped (meetings missed), week (the week at the desk), firedNow, wasRemote, missionNote }.
//   100 the day at work (here)       200 the review (systems/review)     210 time off (leave)     220 benefits
//   230 coworkers (friends)          240 a cold or the flu (health)      250 home life (home)
//   300 holidays and days off (here) 400 pay, rent and bills (here)      500 the credit card (credit)
//   510 the bank (here)              590 the phone rings again (here)    600 the kitchen, 610 laundry (household)
on('morning', (n) => {
  const out = [], w = work(), warned = w.warned === 2 ? ['HR has sent you a <b>final written warning</b>.', '인사팀이 <b>최종 서면 경고</b>를 보냈어요.'] : w.warned === 1 ? ['Your manager has noticed.', '매니저가 알아챘어요.'] : ['', ''];
  if (n.firedNow) out.push(tr(`📧 <b>You've been let go.</b> ${esc(CFG.company)} ended your job for missing too much work. Your badge no longer works, and your final paycheck has been deposited.`, `📧 <b>해고되었습니다.</b> 결근이 너무 잦아 ${esc(CFG.company)}에서 고용을 끝냈어요. 출입증은 이제 안 열리고, 마지막 급여는 계좌에 들어왔어요.`));
  else if (n.att === 'early') out.push(tr(`⚠️ You left work early yesterday (${clock(w.left[n.day])}). ${warned[0]}`, `⚠️ 어제 일찍 퇴근했어요(${clockKo(w.left[n.day])}). 조퇴예요. ${warned[1]}`));
  else if (n.att === 'absent' && n.wasRemote) out.push(tr(`⚠️ You never logged in yesterday. ${warned[0]}`, `⚠️ 어제 로그인하지 않았어요. 결근이에요. ${warned[1]}`));
  else if (n.att === 'absent') out.push(tr(`⚠️ You didn't show up for work yesterday. ${warned[0]}`, `⚠️ 어제 출근하지 않았어요. ${warned[1]}`));
  if (n.skipped.length) out.push(tr(`📅 You missed ${n.skipped.map(x => esc(meetingName(x.r))).join(' and ')} yesterday. Your manager noticed.`, `📅 어제 ${n.skipped.map(x => esc(x.r.title_ko || x.r.title)).join('·')}에 빠졌어요. 매니저가 알아챘어요.`));
  const wk = n.week;
  if (wk) out.push(wk.grade === 'good' ? tr(`📈 Your manager liked your week: <b>${hrs(wk.mins)}</b> at your desk (the team expects about ${hrs(wk.want)}). +${wk.n} points.`, `📈 매니저가 이번 주 일에 만족했어요: 자리에서 <b>${hrs(wk.mins)}</b> 일함(팀 기대치 약 ${hrs(wk.want)}). +${wk.n}점.`)
    : wk.grade === 'low' ? tr(`📉 This week you put <b>${hrs(wk.mins)}</b> into your work (the team expects about ${hrs(wk.want)}). Your manager noticed. −${Math.abs(wk.n)} points.`, `📉 이번 주에 자리에서 <b>${hrs(wk.mins)}</b>만 일했어요(팀 기대치 약 ${hrs(wk.want)}). 매니저가 알아챘어요. −${Math.abs(wk.n)}점.`)
      : tr(`📊 This week: <b>${hrs(wk.mins)}</b> at your desk (the team expects about ${hrs(wk.want)}).`, `📊 이번 주: 자리에서 <b>${hrs(wk.mins)}</b> 일함(팀 기대치 약 ${hrs(wk.want)}).`));
  out.push(n.missionNote);
  if (n.late) out.push(tr('You stayed up too late and did not sleep well. You start the day a little tired.', '너무 늦게까지 깨어 있어서 잠을 설쳤어요. 조금 피곤한 채로 하루를 시작합니다.'));
  return out;
}, 100);
on('morning', () => {
  const out = [], hol = holidayOf(G.day);
  if (hol) out.push(tr(`🗓️ <b>${esc(hol.name)}</b>${hol.kind === 'federal' ? ' (federal holiday)' : ''}. ${esc(hol.note || '')}`, `🗓️ <b>${esc(loc(hol))}</b>${hol.kind === 'federal' ? ' (연방 공휴일)' : ''}. ${esc(hol.note_ko || '')}`));
  if (companyOff(G.day) && !isWeekend(G.day) && !fired()) out.push(tr(`🏖️ ${esc(CFG.company)} is closed today: a paid day off.`, `🏖️ 오늘은 ${esc(ZONE_NAMES.office[1] || CFG.company)} 휴일이에요. 유급 휴일입니다.`));
  const special = holidayHours(G.day);
  if (special.length) out.push(tr(`🕘 Holiday hours: ${special.map(x => `${esc(hoursName(x.id)[0])} ${x.h[0] === x.h[1] ? 'closed' : clock(x.h[0]) + ' – ' + clock(x.h[1])}`).join(' · ')}.`,
    `🕘 휴일 영업시간: ${special.map(x => `${esc(hoursName(x.id)[1] || hoursName(x.id)[0])} ${x.h[0] === x.h[1] ? '휴무' : clockKo(x.h[0]) + ' – ' + clockKo(x.h[1])}`).join(' · ')}.`));
  return out;
}, 300);
on('morning', () => {
  const out = [], me = hero(), housing = me.housing_name || 'Rent', housingKo = me.housing_name_ko || (/mortgage/i.test(housing) ? '주택 담보 대출' : '월세');
  if (isPayday(G.day) && !fired()) {
    // unpaid sick days come off this paycheck (a working day is a tenth of two weeks); PTO builds up a little
    const L = leave(), off = Math.min(10, L.unpaid || 0), cut = cents(netPay() * off / 10), net = cents(netPay() - cut);          // at most the whole paycheck; the rest waits for the next one
    L.unpaid = (L.unpaid || 0) - off; L.pto = Math.round((L.pto + ptoPerPay()) * 100) / 100;
    if (net > 0) pay(net, 'Paycheck (direct deposit)', 'income', { ko: '급여 (계좌 입금)' }); notify(CFG.bank_name, `A direct deposit of ${usd2(net)} from ${CFG.company} has posted to checking ···4821.`, `${CFG.company}의 급여 ${usd2(net)}가 계좌 ···4821에 입금되었습니다.`);
    out.push(tr(`Payday: <b>${usd2(net)}</b> was deposited to your account (gross ${usd(grossPay())})${payDue(G.day) ? '' : ', early because the bank is closed on payday'}.${off ? ` ${usd2(cut)} less for ${off} unpaid day${off === 1 ? '' : 's'} off.` : ''} PTO +${ptoPerPay()} h (now ${leaveText(L.pto)}).`,
      `월급날: <b>${usd2(net)}</b>가 계좌에 들어왔어요 (세전 ${usd(grossPay())})${payDue(G.day) ? '' : '. 급여일에 은행이 쉬어서 미리 들어왔어요'}.${off ? ` 무급 휴가 ${off}일로 ${usd2(cut)} 적게 들어왔어요.` : ''} 연차 +${ptoPerPay()}시간(지금 ${leaveText(L.pto)}).`));
    out.push(...benefitsPaid(net, cut));          // the pay stub, the 401(k) and the HSA
  }
  if (isRentDay(G.day)) { pay(-me.housing, housing, 'bill', { ko: housingKo }); notify(CFG.bank_name, `${housing} payment of ${usd2(+me.housing)} was sent from checking ···4821.`, `${housingKo} ${usd2(+me.housing)}가 계좌에서 나갔습니다.`); out.push(tr(`${housing}: <b>${usd2(+me.housing)}</b> was paid ${/mortgage/i.test(housing) ? 'to the bank' : 'to your landlord'}.`, `${housingKo}: <b>${usd2(+me.housing)}</b>를 ${/mortgage/i.test(housing) ? '은행에' : '집주인에게'} 냈어요.`)); }
  billsDue(G.day).forEach(b => { pay(-b.amount, b.name, 'bill', { ko: b.name_ko }); notify(CFG.bank_name, `Autopay: ${usd2(+b.amount)} was paid to ${b.name} from checking ···4821.`, `자동이체: ${b.name_ko || b.name} ${usd2(+b.amount)}가 빠져나갔습니다.`); out.push(tr(`Autopay: <b>${usd2(+b.amount)}</b> for ${esc(String(b.name).toLowerCase())}.`, `자동이체: ${esc(b.name_ko || b.name)} <b>${usd2(+b.amount)}</b>.`)); });
  return out;
}, 400);
on('morning', () => [
  G.feeDay === G.day && tr(`The bank charged a <b>${usd2(+CFG.overdraft_fee)}</b> overdraft fee.`, `은행이 초과 인출 수수료 <b>${usd2(+CFG.overdraft_fee)}</b>를 물렸어요.`),
  G.money < 0 && tr(`Your account is <b>overdrawn</b>. Spend carefully${fired() ? '' : ' until payday'}.`, `계좌 잔액이 <b>마이너스</b>예요. ${fired() ? '' : '월급날까지 '}아껴 쓰세요.`)
], 510);
on('morning', () => { hush = false; }, 590);          // overnight the phone stays quiet (systems/phone.js); from here on it rings

// ---------------------------------------------------------------- cards (conversation complete, day summary)
let cardDone = null;
function showCard(c, then) {
  const card = $('card');
  card.querySelector('.kicker').textContent = c.kicker || '';
  card.querySelector('h2').textContent = c.title || '';
  card.querySelector('.card-body').innerHTML = c.body || '';
  card.querySelector('.ok').textContent = c.ok || tr('Continue', '계속');
  card.classList.toggle('choose', !!c.choose);          // pick one of the choices in the body before going on
  card.hidden = false;
  state = c.state || 'card';
  cardDone = then || null;
  if (!c.choose) setTimeout(() => card.querySelector('.ok').focus(), 50);
}
function closeCard(force) {          // force: also a card waiting for a choice (the debug API, a new game)
  if ($('card').classList.contains('choose') && !force) return;
  $('card').classList.remove('choose');
  $('card').hidden = true;
  state = 'play';
  const f = cardDone;
  cardDone = null;
  if (f) f();
}
$('card').querySelector('.ok').addEventListener('click', () => closeCard());

/* Sim Office — the review: 90 days for Jun, the year-end review for the others. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- the review: 90 days for Jun, the year-end review for the others
// A conversation tagged review (one for each hero, Maya's office, early January) is the meeting; when it is over the
// card shows how the time since you started went (reviewScore): attendance 40, the team meetings you came to 20, the
// weeks at your desk 25, what came up at your desk 15, and 5 for every mission done. 80 or more exceeds expectations,
// 55 meets them, below that needs improvement. A raise goes into every paycheck after (G.raise; config raise_meets,
// raise_exceeds, in percent), the year-end review also pays review_bonus for exceeding. A new hire who needs
// improvement has probation extended (config probation_extend_days): on that morning the time since is looked at
// again, and needing improvement then ends the job. Missing the meeting by the last day it is open: the review
// happens anyway, by email, 10 points lower. G.review = { day, kind, total, rating, raise, bonus, missed, extendTo, final }.
const RATING = { exceeds: ['Exceeds expectations', '기대 이상'], meets: ['Meets expectations', '기대 충족'], needs: ['Needs improvement', '개선 필요'] };
const reviewEp = () => episodes().find(e => hasTag(e, 'review'));
const probation = () => /new hire/i.test(hero().role || '');
function reviewScore(from, to, penalty) {
  const w = work(), rec = (d) => w.record[d] || '', parts = [];
  let att = 40, late = 0, noon = 0, absent = 0, early = 0;
  for (let d = from; d <= to; d++) { const r = rec(d); if (r === 'late') late++; if (r === 'noon') noon++; if (r === 'absent') absent++; if (w.left && w.left[d] != null) early++; }
  att = Math.max(0, att - late * 5 - noon * 8 - absent * 12 - early * 6);
  parts.push({ en: 'Attendance', ko: '근태', got: att, max: 40, note: [late || noon || absent || early ? [late && `${late} late`, noon && `${noon} in after noon`, absent && `${absent} missed`, early && `${early} left early`].filter(Boolean).join(', ') : 'on time every day',
    late || noon || absent || early ? [late && `지각 ${late}`, noon && `오후 출근 ${noon}`, absent && `결근 ${absent}`, early && `조퇴 ${early}`].filter(Boolean).join(', ') : '매일 정시'] });
  let due = 0, came = 0;
  for (let d = Math.max(from, MISSION_DAYS + 1); d <= to; d++) if (/^(on|late|noon)$/.test(rec(d))) routinesOn(d).forEach(x => { due++; if (G.rdone && G.rdone[x.key]) came++; });
  const meet = due ? Math.round(20 * came / due) : 20;
  parts.push({ en: 'Team meetings', ko: '팀 회의', got: meet, max: 20, note: due ? [`${came} of ${due}`, `${due}번 중 ${came}번`] : ['none yet', '아직 없음'] });
  const weeks = Object.keys(G.weeks || {}).map(Number).filter(d => d >= from && d <= to).map(d => G.weeks[d]);
  const desk = weeks.length ? Math.round(25 * weeks.reduce((a, x) => a + (x.grade === 'good' ? 1 : x.grade === 'ok' ? 0.6 : 0.2), 0) / weeks.length) : 15;
  parts.push({ en: 'Work at your desk', ko: '자리에서 한 일', got: desk, max: 25, note: weeks.length ? [`${weeks.filter(x => x.grade === 'good').length} good weeks of ${weeks.length}`, `${weeks.length}주 중 충분했던 주 ${weeks.filter(x => x.grade === 'good').length}`] : ['no full weeks yet', '아직 평가한 주 없음'] });
  const tasks = (G.taskLog || []).filter(x => x.day >= from && x.day <= to);
  const tk = tasks.length ? Math.round(15 * clamp(tasks.reduce((a, x) => a + x.n, 0) / tasks.length / 8, 0, 1)) : 10;
  parts.push({ en: 'What came up', ko: '중간에 생긴 일', got: tk, max: 15, note: tasks.length ? [`${tasks.filter(x => x.n > 0).length} of ${tasks.length} handled well`, `${tasks.length}건 중 ${tasks.filter(x => x.n > 0).length}건 잘 처리`] : ['nothing came up', '없었음'] });
  parts.push(...teamPart());          // coworkers who are friends
  if (from <= MISSION_DAYS && G.mission && G.mission.all) parts.push({ en: 'Your first two weeks', ko: '첫 2주', got: 5, max: 0, note: ['every mission done', '미션 모두 완료'] });
  if (penalty) parts.push({ en: 'Missed the review meeting', ko: '평가 면담에 빠짐', got: -penalty, max: 0, note: ['', ''] });
  const total = clamp(parts.reduce((a, x) => a + x.got, 0), 0, 100);
  return { total, parts, rating: total >= 80 ? 'exceeds' : total >= 55 ? 'meets' : 'needs' };
}
const raisePct = (k) => +CFG[k] || (k === 'raise_exceeds' ? 5 : 3);
// the meeting is over (or missed): the result, the raise or the extension, the manager's note; returns the card body
function holdReview(missed) {
  if (!G || G.review || fired()) return null;
  const kind = probation() ? 'probation' : 'annual', res = reviewScore(1, G.day, missed ? 10 : 0), me = hero().name_ko || G.name;
  const raise = res.rating === 'exceeds' ? raisePct('raise_exceeds') : res.rating === 'meets' ? raisePct('raise_meets') : 0;
  const bonus = kind === 'annual' && res.rating === 'exceeds' ? +CFG.review_bonus || 1500 : 0;
  const before = netPay();
  G.review = { day: G.day, kind, total: res.total, rating: res.rating, raise, bonus, missed: !!missed };
  if (raise) G.raise = Math.round(((G.raise || 1) * (1 + raise / 100)) * 10000) / 10000;
  if (bonus) pay(bonus, 'Performance bonus', 'income', { ko: '성과 보너스' });
  if (kind === 'probation' && res.rating === 'needs') G.review.extendTo = G.day + (+CFG.probation_extend_days || 30);
  addScore(res.rating === 'exceeds' ? 30 : res.rating === 'meets' ? 10 : -20, `Review: ${RATING[res.rating][0]}`, `평가: ${RATING[res.rating][1]}`);
  logEvent('review', `Review: ${RATING[res.rating][0]}`, 0, { ko: `평가: ${RATING[res.rating][1]}` });
  const what = kind === 'probation' ? ['90-day review', '90일 평가'] : ['year-end review', '연말 평가'];
  const raiseEn = raise ? ` Your pay goes up ${raise}%: from the next paycheck it's ${usd2(netPay())} instead of ${usd2(before)}.` : '';
  const raiseKo = raise ? ` 급여가 ${raise}% 오릅니다. 다음 급여부터 ${usd2(before)}가 아니라 ${usd2(netPay())}예요.` : '';
  const line = res.rating === 'needs' ? (kind === 'probation'
    ? [`Your probation is extended until ${dateLong(G.review.extendTo)}. Let's work on showing up on time, the team meetings and steady work at your desk, and we'll look again then.`, `수습 기간이 ${dateKo(G.review.extendTo)}까지 연장돼요. 제시간 출근, 팀 회의, 꾸준한 업무를 같이 챙겨 보고 그때 다시 봐요.`]
    : ['No raise this time. Let\'s put together a plan for the next quarter and check in every week.', '이번에는 인상이 없어요. 다음 분기 계획을 같이 세우고 매주 점검해요.'])
    : kind === 'probation' ? [`You've passed your probation. Welcome to the team for real.${raiseEn}`, `수습을 통과했어요. 이제 정말 팀원이에요.${raiseKo}`]
      : [`Thank you for a good year.${raiseEn}${bonus ? ` There's a ${usd(bonus)} bonus in your account, too.` : ''}`, `한 해 수고 많았어요.${raiseKo}${bonus ? ` 보너스 ${usd(bonus)}도 계좌에 넣었어요.` : ''}`];
  notify(BOSS, `${missed ? `${G.name}, since we couldn't meet, here is your ${what[0]} in writing. ` : `Thanks for the talk today, ${G.name}. `}Overall: ${RATING[res.rating][0]} (${res.total}/100). ${line[0]}`,
    `${missed ? `${me}, 만나지 못해서 ${what[1]} 결과를 글로 보내요. ` : `${me}, 오늘 얘기 고마워요. `}종합: ${RATING[res.rating][1]}(${res.total}/100). ${line[1]}`, missed ? 'email' : 'text');
  saveGame();
  return reviewBody(res, line, what);
}
function reviewBody(res, line, what) {
  return `<p class="big">${tr(`Overall: <b>${RATING[res.rating][0]}</b> · ${res.total}/100`, `종합: <b>${RATING[res.rating][1]}</b> · ${res.total}/100`)}</p>
    <ul>${res.parts.map(x => `<li><b>${esc(tr(x.en, x.ko))}</b> ${x.max ? `${x.got}/${x.max}` : (x.got > 0 ? '+' : '−') + Math.abs(x.got)}${x.note[0] ? ` · ${esc(tr(x.note[0], x.note[1]))}` : ''}</li>`).join('')}</ul>
    <p class="quote">“${esc(tr(line[0], line[1]))}”</p>`;
}
function showReview(body) {
  if (!body) return;
  const r = G.review;
  showCard({ kicker: tr(r.kind === 'probation' ? '90-day review' : 'Year-end review', r.kind === 'probation' ? '90일 평가' : '연말 평가'), title: tr(RATING[r.rating][0], RATING[r.rating][1]), body, ok: tr('Continue', '계속'), state: 'card' }, () => { goalTimer = 0; });
}
// the morning (from goToSleep): a missed meeting is held by email; an extended probation is looked at again
function reviewMorning(prev) {
  const out = [];
  if (!G || fired()) return out;
  const ep = reviewEp();
  if (!G.review && ep && ep.day_to != null && prev >= ep.day_to && !G.done[ep.id]) {
    holdReview(true);
    out.push(tr(`📋 You missed your review meeting, so ${esc(firstName(NPCS[BOSS]))} sent it by email: <b>${RATING[G.review.rating][0]}</b> (${G.review.total}/100). Check your phone.`, `📋 평가 면담에 빠져서 ${esc(josa(firstName(NPCS[BOSS]), '이', '가'))} 결과를 이메일로 보냈어요: <b>${RATING[G.review.rating][1]}</b>(${G.review.total}/100). 휴대전화를 확인하세요.`));
  }
  const r = G.review;
  if (r && r.extendTo && !r.final && G.day >= r.extendTo) {
    const res = reviewScore(r.day + 1, G.day - 1, 0);
    r.final = res.rating;
    if (res.rating === 'needs') {
      fire(false, 'probation');
      out.push(tr(`📧 <b>Your probation has ended, and so has your job.</b> ${esc(CFG.company)} looked at the month since your review (${res.total}/100) and let you go.`, `📧 <b>수습 기간이 끝났고, 고용도 끝났어요.</b> ${esc(CFG.company)}가 평가 뒤 한 달(${res.total}/100)을 보고 고용을 끝냈어요.`));
    } else {
      notify(BOSS, `${G.name}, good news: the last month went well (${res.total}/100), so you've passed your probation. Keep it up!`, `${hero().name_ko || G.name}, 좋은 소식이에요. 지난 한 달이 좋았어요(${res.total}/100). 수습 통과예요. 계속 이렇게 해요!`, 'text');
      addScore(15, 'Passed probation', '수습 통과');
      out.push(tr(`✅ You've passed your probation (${res.total}/100). ${esc(firstName(NPCS[BOSS]))} sent a note.`, `✅ 수습을 통과했어요(${res.total}/100). ${esc(josa(firstName(NPCS[BOSS]), '이', '가'))} 메시지를 보냈어요.`));
    }
  }
  return out;
}
function checkMissions() {          // after a conversation: was it the last mission?
  if (!G || G.mission || G.day > MISSION_DAYS) return false;
  const [got, all] = missionCount();
  if (!all || got < all) return false;
  const bonus = fired() ? 0 : +CFG.mission_bonus || 0, pts = +CFG.mission_points || 0;
  G.mission = { day: G.day, all: true, bonus };
  if (bonus) pay(bonus, `Bonus from ${CFG.company}`, 'income', { ko: `${CFG.company} 보너스` });
  addScore(pts, 'Every mission done', '미션 모두 완료');
  if (!fired()) notify(BOSS, `${G.name}, you got through everything we planned for your first weeks here, and it showed. Thank you! There's a ${usd(bonus)} bonus on its way to your account.`,
    `${hero().name_ko || G.name}, 그동안 계획한 일을 전부 해냈네요. 정말 고마워요! 보너스 ${usd(bonus)}가 계좌로 들어갈 거예요.`, 'text');
  logEvent('mission', 'Finished every mission', 0, { ko: '미션 모두 완료' });
  saveGame();
  const days = MISSION_DAYS - G.day;
  showCard({ kicker: tr('Missions', '미션'), title: tr('Congratulations!', '축하합니다!'),
    body: tr(`<p class="big">🎉 You finished all <b>${all}</b> missions${fired() ? '' : ` at ${esc(CFG.company)}`}.</p>
      <div class="sum">${bonus ? `<div><b>+${usd(bonus)}</b>bonus</div>` : ''}<div><b>+${pts}</b>points</div><div><b>★ ${score()}</b>score</div><div><b>${esc(standing()[0])}</b>at work</div></div>
      ${bonus ? `<p>Maya sent a thank-you note, and a bonus of <b>${usd(bonus)}</b> is in your account.</p>` : ''}
      <p>${days > 0 ? `Until then the time is yours, and from ${esc(dateLong(MISSION_DAYS + 1))} it's <b>free play</b>` : `From tomorrow it's <b>free play</b>`}: no more set conversations. Live your life in ${esc(CFG.city)}: ${fired() ? 'find your own way' : 'go to work on time'}, pay the bills, cook, shop, jog, and explore.</p>`,
      `<p class="big">🎉 미션 <b>${all}</b>개를 모두 해냈어요.</p>
      <div class="sum">${bonus ? `<div><b>+${usd(bonus)}</b>보너스</div>` : ''}<div><b>+${pts}</b>점수</div><div><b>★ ${score()}</b>총점</div><div><b>${esc(standing()[1])}</b>근무 평가</div></div>
      ${bonus ? `<p>${esc(firstName(NPCS[BOSS] || { name: 'Maya' }))}가 감사 인사를 보냈고, 보너스 <b>${usd(bonus)}</b>가 계좌에 들어왔어요.</p>` : ''}
      <p>${days > 0 ? `남은 날은 자유롭게 보내고, ${esc(dateKo(MISSION_DAYS + 1))}부터는 <b>자유 플레이</b>예요` : '내일부터는 <b>자유 플레이</b>예요'}. 정해진 대화는 더 없어요. ${esc(zoneName('city')[1] || CFG.city)}에서 살아 보세요: ${fired() ? '새 길을 찾고' : '제시간에 출근하고'}, 공과금을 내고, 요리하고, 장 보고, 달리고, 구경하세요.</p>`),
    ok: tr('Keep going', '계속하기'), state: 'card' }, () => { goalTimer = 0; });
  speak('Congratulations!', heroVoice());
  return true;
}
// the end of the last day of the missions (from goToSleep): free play from tomorrow
function closeMissions(day) {
  if (!G || day !== MISSION_DAYS) return null;
  const [got, all] = missionCount();
  if (!G.mission) G.mission = { day, all: false, bonus: 0 };
  return G.mission.all ? tr(`🎉 Your missions are behind you. From today it's <b>free play</b>: no set conversations, just your life in ${esc(CFG.city)}.`, `🎉 미션이 끝났어요. 오늘부터 <b>자유 플레이</b>예요. 정해진 대화 없이 ${esc(zoneName('city')[1] || CFG.city)}에서 살아 보세요.`)
    : tr(`🗓️ The missions are over: you finished <b>${got} of ${all}</b> missions (all of them earns a bonus, so no bonus this time). From today it's <b>free play</b>.`, `🗓️ 미션 기간이 끝났어요. 미션 <b>${all}개 중 ${got}개</b>를 해냈어요(모두 해내야 보너스가 나와서 이번에는 없어요). 오늘부터 <b>자유 플레이</b>예요.`);
}
// Sales tax and tips: prices on a menu or a shelf are before tax. Meals, drinks and other goods are taxed
// (config sales_tax); groceries and fares are not. Where food or drinks are served the panel asks about a tip
// (config tip_options, percent of the price before tax): tip_default at a table (diner, restaurant), none at a counter.
const TAX = Math.max(0, +CFG.sales_tax || 0), TIPS = listOf(CFG.tip_options).map(Number).filter(n => n >= 0);
const cents = (n) => Math.round(n * 100) / 100;
const pct = (r) => +(r * 100).toFixed(2) + '%';
const taxed = (i) => /^(meal|drink|other|gear)$/.test(i.kind);
const tipAsked = (pid) => TIPS.length > 1 && rows('items').some(i => i.place === pid && /^(meal|drink)$/.test(i.kind) && +i.price > 0);
const tableService = (pid) => /diner|restaurant/.test(pid || '');
const tipChoice = {};
const tipRate = (pid) => !tipAsked(pid) ? 0 : (tipChoice[pid] != null ? tipChoice[pid] : tableService(pid) ? +CFG.tip_default || 0 : 0) / 100;
// A punch card (config punch_card_place, punch_card_every: 6 = buy 5 drinks, the 6th is free). The tip on a free
// drink still goes by its full price.
const PUNCH_AT = String(CFG.punch_card_place || ''), PUNCH_N = +CFG.punch_card_every || 0;
const punchable = (i) => PUNCH_N > 1 && !!PUNCH_AT && i.place === PUNCH_AT && i.kind === 'drink' && +i.price > 0;
const punches = (pid) => (G && G.punch && G.punch[pid]) || 0;
const onTheHouse = (i) => punchable(i) && punches(i.place) >= PUNCH_N - 1;
function billFor(i) {
  const list = +i.price || 0, free = onTheHouse(i), price = free ? 0 : list, tax = taxed(i) ? cents(price * TAX) : 0;
  const tip = /^(meal|drink)$/.test(i.kind) ? cents(list * tipRate(i.place)) : 0;
  return { price, tax, tip, total: cents(price + tax + tip), free, list };
}
const receipt = (b) => (b.free ? tr('free with your punch card', '스탬프 카드로 무료') : usd2(b.price)) + (b.tax ? tr(` + tax ${usd2(b.tax)}`, ` + 세금 ${usd2(b.tax)}`) : '') + (b.tip ? tr(` + tip ${usd2(b.tip)}`, ` + 팁 ${usd2(b.tip)}`) : '') + (b.tax || b.tip ? ` = ${usd2(b.total)}` : '');
// Bills on autopay (bills table): due on their day, then every `every` days
const billsDue = (d) => rows('bills').filter(b => d >= b.day && ((+b.every || 30) >= 28 && START != null ? onDateOfMonth(d, dateOf(b.day).getUTCDate()) : (d - b.day) % (+b.every || 30) === 0));
on('morning', (n) => reviewMorning(n.day), 200);          // a missed review by email, the end of an extended probation
// SO.debug: the review
debugPart({
  get review() { return G && G.review ? Object.assign({}, G.review) : null; }, set review(v) { if (G) G.review = v; }, reviewScore(from, to) { return reviewScore(from || 1, to || G.day, 0); }, get netPay() { return netPay(); }
});

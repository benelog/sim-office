/* Sim Office — a credit card and a credit score (cards table). One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- a credit card and a credit score (cards table)
// Jun has just moved to the U.S.: no credit history, no score, and the only card he can get is a secured one (the
// deposit, taken from checking, is the limit). Derek and Priya have had credit for years (config credit_months) and
// already have the bank's rewards card (config card_start), autopay on. Apply in Menu > Bank: every application is a
// hard inquiry, and an unsecured card needs a score of cards.min_score. At a shop you pay by debit card (checking, at
// once) or by credit card (acct.use, switched in the shop and in the bank): a charge adds to the card balance, up to
// the limit. A statement on config card_close_dom every month (an email, and a letter by mail): the balance and a
// minimum payment (the greater of cards.min_due or cards.min_pct % plus interest and fees, all of it when less, plus
// anything past due), due config card_due_days later. Pay in the bank from checking (the statement balance, the
// minimum, all, or an amount) or by autopay (off | min | statement) on the morning of the due date. The statement
// balance paid in full by the due date keeps the grace period: no interest; otherwise the next statement charges
// cards.apr / 365 on every day's balance. Not even the minimum by the due date: a late fee the next morning; still
// not paid by the next due date (30 days past due), the bank reports it late: a mark on your credit report.
// The score (300-850) is what the bureaus make of what the bank reports at each statement: 580, +10 for each month
// paid as agreed (at most 100), −90 for each late mark in two years, the share of the limit on the last statement
// (under 10% +70, under 30% +50, under 50% +20, under 75% 0, more −30), +1 for every two months of history (at most
// 70), −6 for each application in a year (at most 30). The best-known score needs six months of history; this one,
// like the free scores in banking apps, needs one statement, so Jun's first score comes with his first statement.
// After config card_graduate_after on-time payments in a row and no late mark, a secured card becomes its
// cards.graduates_to card (limit config card_limit) and the deposit comes back to checking.
// G.credit = { acct: null | { id, opened, limit, deposit, bal, use debit | credit, autopay off | min | statement, acc
// (each day's balance added up this cycle), buys, fees, grace, streak, st { day, due, bal, min, interest, fees, back,
// paid, pastDue, late }, tx [] }, since (the first card's day), inq [days], lates [days], reports [{ day, util, ontime }],
// scores [{ day, n }], mail [the bank's letters, as mail rows], upto (the last morning looked at) }.
const CARDS = rows('cards').slice().sort((a, b) => (a.sort || 0) - (b.sort || 0)), CARD_BY = byId('cards');
const CLOSE_DOM = +CFG.card_close_dom || 20, DUE_DAYS = +CFG.card_due_days || 25, GRADUATE = +CFG.card_graduate_after || 3, REMIND = +CFG.card_reminder_days || 5;
const heroPick = (v, id) => { const m = listOf(v).map(x => String(x).split(':')).find(x => x[0].trim() === id); return m ? m[1].trim() : null; };
const cardOf = (a) => CARD_BY[a.id] || { id: a.id, name: pretty(a.id), kind: 'unsecured', last4: '0000', apr: 20, min_due: 25, min_pct: 1, late_fee: 30, cash_back: 0 };
const cardName = (c, ko) => `${ko ? c.name_ko || c.name : c.name} ···${c.last4}`;
const closesOn = (d) => START != null ? onDateOfMonth(d, CLOSE_DOM) : d % 30 === 0;
const nextClose = (d) => { let x = d + 1; while (!closesOn(x) && x < d + 32) x++; return x; };
function credit() {
  if (G.credit) return G.credit;
  const C = G.credit = { acct: null, since: null, inq: [], lates: [], reports: [], scores: [], mail: [], upto: G.day };
  const c = CARD_BY[heroPick(CFG.card_start, G.hero)];
  if (c) { C.acct = openAcct(c, 1, 'statement'); C.since = 1; }          // had it before day 1
  const n = creditScore();
  if (n != null) C.scores.push({ day: G.day, n });
  return C;
}
function openAcct(c, day, autopay) {
  const secured = c.kind === 'secured';
  return { id: c.id, opened: day, limit: secured ? +c.deposit : perHero(CFG.card_limit, G.hero, +c.credit_limit || 1000), deposit: secured ? +c.deposit : 0,
    bal: 0, use: 'credit', autopay: autopay || 'off', acc: 0, buys: 0, fees: 0, grace: true, streak: 0, st: null, tx: [] };
}
const BANDS = [[800, 'Exceptional', '최우수'], [740, 'Very good', '매우 좋음'], [670, 'Good', '좋음'], [580, 'Fair', '보통'], [300, 'Poor', '나쁨']];
const bandOf = (n) => BANDS.find(b => n >= b[0]) || BANDS[BANDS.length - 1];
const utilPoints = (u) => u < 0.1 ? 70 : u < 0.3 ? 50 : u < 0.5 ? 20 : u < 0.75 ? 0 : -30;
function creditFactors() {
  const C = G.credit, before = perHero(CFG.credit_months, G.hero, 0), last = C.reports[C.reports.length - 1];
  return {
    scored: before > 0 || C.reports.length > 0,
    months: before > 0 ? before + (G.day - 1) / 30.4 : C.since != null ? (G.day - C.since) / 30.4 : 0,
    ontime: before + C.reports.filter(r => r.ontime).length,
    util: last ? last.util : before > 0 ? perHero(CFG.credit_util_start, G.hero, 0.1) : null,
    lates: C.lates.filter(d => G.day - d < 730).length,
    inq: C.inq.filter(d => G.day - d < 365).length
  };
}
function creditScore() {
  const f = creditFactors();
  if (!f.scored) return null;
  return clamp(Math.round(580 + Math.min(100, f.ontime * 10) - 90 * f.lates + utilPoints(f.util == null ? 0.3 : f.util) + Math.min(70, Math.floor(f.months / 2)) - Math.min(30, 6 * f.inq)), 300, 850);
}
const scoreNow = () => { const s = G && G.credit && G.credit.scores; return s && s.length ? s[s.length - 1].n : null; };
function rescore(d) {          // the bureaus update the score: [before, now]
  const C = credit(), was = scoreNow(), n = creditScore();
  if (n != null) C.scores = C.scores.concat({ day: d, n }).slice(-24);
  return [was, n];
}
const cardTx = (text, ko, amount) => { const a = G.credit.acct; a.tx = a.tx.concat({ day: G.day, minute: Math.floor(G.minute), text, ko: ko || '', amount }).slice(-30); };
function addMail(m) {          // a letter from the bank (it comes with the mail; recurring() adds them to the mailbox)
  const C = credit();
  C.mail = C.mail.concat(Object.assign({ sender: CFG.bank_name, kind: 'letter' }, m)).slice(-30);
  Object.keys(recurMemo).filter(k => k.startsWith('mail@')).forEach(k => delete recurMemo[k]);
}
const creditMail = (upTo) => G && G.credit ? G.credit.mail.filter(m => m.day <= upTo) : [];
// how a purchase at a shop is paid (from buy): null = the debit card (checking), 'credit' = the credit card, or why the card was declined
function payBy(price) {
  const a = G && CARDS.length ? credit().acct : null;
  if (!a || a.use !== 'credit' || !(price > 0)) return null;
  const free = cents(a.limit - a.bal);
  if (price > free + 0.001) return tr(`Your credit card was declined: ${usd2(price)} is more than your available credit (${usd2(Math.max(0, free))}). Pay down the card in the bank, or switch to debit.`,
    `신용카드 승인이 거절됐어요. ${usd2(price)}는 사용 가능 한도(${usd2(Math.max(0, free))})보다 많아요. 은행에서 카드 대금을 갚거나 체크카드로 바꾸세요.`);
  return 'credit';
}
function cardCharge(amount, text, type, extra) {          // as pay(), but on the card (amount > 0)
  const a = credit().acct, c = cardOf(a);
  a.bal = cents(a.bal + amount); a.buys = cents(a.buys + amount);
  cardTx(text, (extra || {}).ko, -amount);
  logEvent('card', text, 0, Object.assign({ card: -amount }, extra || {}));          // not from checking: the bank's list leaves it out
  toast(`💳 ${usd2(amount)} on your ${cardName(c)}. Card balance ${usd2(a.bal)}.`, `💳 신용카드 결제 ${usd2(amount)} (${cardName(c, true)}). 카드 잔액 ${usd2(a.bal)}.`, null, 2.5);
}
// a payment from checking: what = 'statement' (the rest of the statement balance) | 'min' (the rest of the minimum) |
// 'all' | an amount. auto: autopay (it goes through even when checking is short: the bank's overdraft rules apply).
function cardPay(what, auto) {
  const a = G && credit().acct;
  if (!a) return 0;
  const st = a.st, owed = Math.max(0, a.bal);
  const say = (en, ko, bad) => { if (!panel.hidden && panelKind === 'bank') note(tr(en, ko), bad); else toast(en, ko, bad ? 'bad' : null, 3.5); };
  const x = cents(Math.min(owed, Math.max(0, what === 'all' ? owed : what === 'statement' ? (st ? st.bal - st.paid : 0) : what === 'min' ? (st ? st.min - st.paid : 0) : +what || 0)));
  if (!(x > 0)) { if (!auto) say('Nothing to pay.', '낼 금액이 없어요.', true); return 0; }
  if (!auto && G.money < x) { say(`Not enough in checking: you have ${usd2(G.money)}.`, `입출금 계좌 잔액이 부족해요: ${usd2(G.money)}.`, true); return 0; }
  pay(-x, auto ? 'Credit card autopay' : 'Credit card payment', 'cardpay', { ko: auto ? '신용카드 자동 납부' : '신용카드 대금 납부' });
  a.bal = cents(a.bal - x);
  if (st) st.paid = cents(st.paid + x);
  cardTx('Payment, thank you', '납부 감사합니다', x);
  if (!auto) say(`Paid ${usd2(x)} to your card from checking. Card balance ${usd2(a.bal)}.`, `입출금 계좌에서 카드 대금 ${usd2(x)}를 냈어요. 카드 잔액 ${usd2(a.bal)}.`);
  return x;
}
function payoff(bal, c) {          // paying only the minimum every month: how many months, and the interest (as a statement says)
  const r = (+c.apr || 0) / 100 / 12;
  let b = bal, months = 0, paid = 0;
  while (b > 0.005 && months < 600) { const i = b * r, p = Math.min(b + i, Math.max(+c.min_due || 25, b * (+c.min_pct || 1) / 100 + i)); b = b + i - p; paid += p; months++; }
  return { months, interest: cents(paid - bal) };
}
// the statement (the morning of the closing date): interest when the grace period is gone, cash back, the minimum,
// the report to the credit bureaus (the share of the limit, paid as agreed), a new score, and a secured card graduating
function closeStatement(d, out) {
  const C = G.credit, a = C.acct, c = cardOf(a), prev = a.st;
  const interest = a.grace ? 0 : cents(a.acc * (+c.apr || 0) / 100 / 365), back = cents(a.buys * (+c.cash_back || 0) / 100);
  a.bal = cents(a.bal + interest - back);
  if (interest) cardTx('Interest charge', '이자', -interest);
  if (back) cardTx('Cash back', '캐시백', back);
  const owe = Math.max(0, a.bal), pastDue = prev ? cents(Math.max(0, prev.min - prev.paid)) : 0;
  const min = owe <= 0 ? 0 : cents(Math.min(owe, Math.max(+c.min_due || 25, owe * (+c.min_pct || 1) / 100 + interest + a.fees) + pastDue));
  if (prev && prev.min > 0) a.streak = prev.late ? 0 : a.streak + 1;          // one more payment on time in a row (or back to none)
  if (owe <= 0) a.grace = true;
  a.st = { day: d, due: d + DUE_DAYS, bal: cents(a.bal), min, interest, fees: a.fees, back, buys: a.buys, paid: 0, pastDue, late: false };
  a.acc = 0; a.buys = 0; a.fees = 0;
  C.reports = C.reports.concat({ day: d, util: a.limit ? Math.round(owe / a.limit * 1000) / 1000 : 0, ontime: !prev || !prev.late }).slice(-36);
  const [was, n] = rescore(d), due = a.st.due, me = hero().name_ko || G.name;
  if (owe > 0 || interest || back) {
    const autoEn = a.autopay === 'statement' ? ' AutoPay will pay the statement balance from checking on the due date.' : a.autopay === 'min' ? ' AutoPay will pay the minimum from checking on the due date.' : ' AutoPay is off: pay it under Bank in the app.';
    const autoKo = a.autopay === 'statement' ? ' 납부 기한에 자동 납부로 명세서 금액이 입출금 계좌에서 나갑니다.' : a.autopay === 'min' ? ' 납부 기한에 자동 납부로 최소 금액이 입출금 계좌에서 나갑니다.' : ' 자동 납부가 꺼져 있습니다. 앱의 은행 메뉴에서 내 주세요.';
    notify(CFG.bank_name, `Your ${cardName(c)} statement is ready: balance ${usd2(owe)}, minimum payment ${usd2(min)} due ${dateShort(due)}.${autoEn}`,
      `${cardName(c, true)} 명세서가 나왔습니다. 청구 금액 ${usd2(owe)}, 최소 결제 금액 ${usd2(min)}, 납부 기한 ${fmtDate(due)[1]}.${autoKo}`, 'email');
    const po = owe > min + 0.005 ? payoff(owe, c) : null;
    addMail({ id: `cc_st@${d}`, day: nextMailDay(d + 2), kind: 'bill', subject: 'Your card statement', subject_ko: '신용카드 명세서',
      body: `${cardName(c)}. Statement closing date: ${dateLong(d)}. New balance: ${usd2(owe)}. Minimum payment: ${usd2(min)}, due ${dateLong(due)}.${interest ? ` Interest charged: ${usd2(interest)}.` : ''}${back ? ` Cash back: ${usd2(back)}.` : ''} Late payment warning: if we do not receive your minimum payment by the due date, you may have to pay a late fee of up to ${usd(+c.late_fee || 0)}.${po ? ` Minimum payment warning: if you make only the minimum payment each month, it will take you about ${po.months} months to pay off this balance, and you will pay about ${usd2(po.interest)} in interest.` : ''}`,
      body_ko: `${cardName(c, true)}. 명세서 마감일: ${dateKo(d)}. 이번 청구 금액: ${usd2(owe)}. 최소 결제 금액: ${usd2(min)}, 납부 기한 ${dateKo(due)}.${interest ? ` 이자: ${usd2(interest)}.` : ''}${back ? ` 캐시백: ${usd2(back)}.` : ''} 연체 경고: 납부 기한까지 최소 결제 금액이 들어오지 않으면 최대 ${usd(+c.late_fee || 0)}의 연체료가 붙을 수 있습니다.${po ? ` 최소 결제 경고: 매달 최소 금액만 내면 이 금액을 다 갚는 데 약 ${po.months}개월이 걸리고, 이자로 약 ${usd2(po.interest)}를 더 내게 됩니다.` : ''}` });
    out.push(tr(`💳 Card statement: <b>${usd2(owe)}</b>, minimum ${usd2(min)} due <b>${esc(dateShort(due))}</b>.${interest ? ` Interest ${usd2(interest)}.` : ''}${back ? ` Cash back ${usd2(back)}.` : ''}${a.autopay === 'off' ? ' Pay it in Menu > Bank.' : ' AutoPay is on.'}`,
      `💳 카드 명세서: <b>${usd2(owe)}</b>, 최소 ${usd2(min)}, 납부 기한 <b>${esc(dateKoShort(due))}</b>.${interest ? ` 이자 ${usd2(interest)}.` : ''}${back ? ` 캐시백 ${usd2(back)}.` : ''}${a.autopay === 'off' ? ' 메뉴 > 은행에서 내세요.' : ' 자동 납부가 켜져 있어요.'}`));
  }
  if (n != null && was == null) {
    notify(CFG.bank_name, `${G.name}, you have a credit score now: ${n} (${bandOf(n)[1]}). It comes from what we report to the credit bureaus each month. Check it any time under Bank in the app.`,
      `${me} 님, 이제 신용 점수가 생겼습니다: ${n}점(${bandOf(n)[2]}). 매달 신용평가기관에 보고하는 기록으로 매겨집니다. 앱의 은행 메뉴에서 언제든 확인하세요.`, 'alert');
    out.push(tr(`📈 You have a <b>credit score</b> now: <b>${n}</b> (${bandOf(n)[1]}).`, `📈 이제 <b>신용 점수</b>가 생겼어요: <b>${n}점</b>(${bandOf(n)[2]}).`));
  } else if (n != null && n !== was) out.push(tr(`📊 Your credit score: <b>${n}</b> (${n > was ? '+' : '−'}${Math.abs(n - was)}).`, `📊 신용 점수: <b>${n}점</b>(${n > was ? '+' : '−'}${Math.abs(n - was)}).`));
  const to = c.kind === 'secured' && CARD_BY[c.graduates_to];
  if (to && a.streak >= GRADUATE && !C.lates.length) graduate(a, to, out);
}
function graduate(a, to, out) {          // a secured card becomes an ordinary card, and the deposit comes back
  const back = a.deposit;
  a.id = to.id; a.limit = perHero(CFG.card_limit, G.hero, +to.credit_limit || 1000); a.deposit = 0;
  if (back) pay(back, 'Secured card deposit returned', 'income', { ko: '보증금형 카드 보증금 반환' });
  const me = hero().name_ko || G.name;
  notify(CFG.bank_name, `Good news, ${G.name}: after ${GRADUATE} on-time payments in a row, your secured card has graduated to the ${cardName(to)}: a ${usd(a.limit)} limit${+to.cash_back ? ` and ${+to.cash_back}% cash back` : ''}. Your ${usd(back)} deposit is back in checking.`,
    `${me} 님, 좋은 소식입니다. ${GRADUATE}번 연속으로 제때 납부하셔서 보증금형 카드가 일반 카드(${cardName(to, true)})로 바뀌었습니다. 한도는 ${usd(a.limit)}${+to.cash_back ? `, 캐시백 ${+to.cash_back}%` : ''}입니다. 보증금 ${usd(back)}는 입출금 계좌로 돌려드렸습니다.`, 'email');
  addMail({ id: `cc_grad@${G.day}`, day: nextMailDay(G.day + 3), subject: 'Your new card is enclosed', subject_ko: '새 카드를 보내 드립니다',
    body: `Congratulations! Your ${cardName(to)} is enclosed, with a credit limit of ${usd(a.limit)}. Your balance, due date and AutoPay setting stay the same. Sign the back of the card and cut up your old one.`,
    body_ko: `축하합니다! 새 카드(${cardName(to, true)})를 동봉합니다. 신용 한도는 ${usd(a.limit)}입니다. 잔액, 납부 기한, 자동 납부 설정은 그대로입니다. 카드 뒷면에 서명하고, 예전 카드는 잘라서 버리세요.` });
  out.push(tr(`🎉 Your secured card <b>graduated</b> to the ${esc(cardName(to))}: limit ${usd(a.limit)}, and your ${usd(back)} deposit is back in checking.`,
    `🎉 보증금형 카드가 <b>일반 카드</b>(${esc(cardName(to, true))})로 바뀌었어요. 한도 ${usd(a.limit)}, 보증금 ${usd(back)}는 입출금 계좌로 돌아왔어요.`));
}
// one morning of the card (creditMorning): the day's balance for interest, the statement, the reminder, autopay on the
// due date, and the morning after it: a late fee, or a late mark when the last one is still unpaid
function creditDay(d, out) {
  const C = G.credit, a = C.acct;
  if (!a) return;
  a.acc = cents(a.acc + Math.max(0, a.bal));
  if (closesOn(d) && d > a.opened) closeStatement(d, out);
  const st = a.st;
  if (!st || !(st.min > 0)) return;
  const c = cardOf(a), left = cents(st.min - st.paid), me = hero().name_ko || G.name;
  if (d === st.due - REMIND && a.autopay === 'off' && left > 0)
    notify(CFG.bank_name, `Reminder: your ${cardName(c)} payment is due ${dateShort(st.due)}. Minimum ${usd2(left)}; pay the statement balance of ${usd2(cents(st.bal - st.paid))} to avoid interest.`,
      `알림: ${cardName(c, true)} 납부 기한은 ${fmtDate(st.due)[1]}입니다. 최소 ${usd2(left)}이고, 이자를 피하려면 명세서 금액 ${usd2(cents(st.bal - st.paid))}를 모두 내세요.`, 'email');
  if (d === st.due) {
    if (a.autopay !== 'off') {
      const x = cardPay(a.autopay === 'min' ? 'min' : 'statement', true);
      if (x) {
        notify(CFG.bank_name, `AutoPay: ${usd2(x)} was paid to your ${cardName(c)} from checking ···4821.`, `자동 납부: 입출금 계좌 ···4821에서 ${cardName(c, true)} 대금 ${usd2(x)}가 나갔습니다.`);
        out.push(tr(`💳 AutoPay paid <b>${usd2(x)}</b> on your credit card.`, `💳 자동 납부로 신용카드 대금 <b>${usd2(x)}</b>를 냈어요.`));
      }
    } else if (left > 0) {
      notify(CFG.bank_name, `Your ${cardName(c)} payment is due today: minimum ${usd2(left)}.`, `오늘이 ${cardName(c, true)} 납부 기한입니다: 최소 ${usd2(left)}.`);
      out.push(tr(`⏰ Your credit card payment is due <b>today</b>: at least ${usd2(left)} (Menu > Bank).`, `⏰ 오늘이 신용카드 <b>납부 기한</b>이에요: 최소 ${usd2(left)} (메뉴 > 은행).`));
    }
  }
  if (d !== st.due + 1) return;
  if (st.paid >= st.min - 0.005) { a.grace = st.paid >= st.bal - 0.005; return; }
  st.late = true; a.grace = false;
  const fee = +c.late_fee || 0;
  if (fee) { a.bal = cents(a.bal + fee); a.fees = cents(a.fees + fee); cardTx('Late fee', '연체료', -fee); }
  if (st.pastDue > 0 && st.paid < st.pastDue - 0.005) {          // the last statement's minimum is now 30 days past due
    C.lates = C.lates.concat(d);
    const n = rescore(d)[1];
    notify(CFG.bank_name, `${G.name}, your ${cardName(c)} is 30 days past due, so we have reported a late payment to the credit bureaus. A ${usd2(fee)} late fee was added. Please pay at least ${usd2(cents(st.min - st.paid + fee))} as soon as you can.`,
      `${me} 님, ${cardName(c, true)} 대금이 30일 연체되어 신용평가기관에 연체를 보고했습니다. 연체료 ${usd2(fee)}가 붙었습니다. 되도록 빨리 최소 ${usd2(cents(st.min - st.paid + fee))}를 내 주세요.`, 'email');
    out.push(tr(`⚠️ Your card payment is <b>30 days late</b>: the bank reported it to the credit bureaus${n != null ? `, and your score fell to <b>${n}</b>` : ''}. A ${usd2(fee)} late fee was added.`,
      `⚠️ 카드 대금이 <b>30일 연체</b>되어 은행이 신용평가기관에 보고했어요${n != null ? `. 점수가 <b>${n}점</b>으로 떨어졌어요` : ''}. 연체료 ${usd2(fee)}가 붙었어요.`));
  } else {
    notify(CFG.bank_name, `We didn't receive your minimum payment of ${usd2(st.min)} on your ${cardName(c)} by ${dateShort(st.due)}. A ${usd2(fee)} late fee was added, and interest now applies to your balance. Pay before your next due date to keep it off your credit report.`,
      `${fmtDate(st.due)[1]}까지 ${cardName(c, true)}의 최소 결제 금액 ${usd2(st.min)}가 들어오지 않았습니다. 연체료 ${usd2(fee)}가 붙었고, 이제 잔액에 이자가 붙습니다. 다음 납부 기한 전에 내시면 신용 기록에는 남지 않습니다.`, 'email');
    out.push(tr(`⚠️ You missed the minimum payment on your credit card: a <b>${usd2(fee)}</b> late fee, and interest from now on. Pay before the next due date, or it goes on your credit report.`,
      `⚠️ 신용카드 최소 결제 금액을 내지 못했어요: 연체료 <b>${usd2(fee)}</b>, 이제부터 이자도 붙어요. 다음 납부 기한 전에 내지 않으면 신용 기록에 남아요.`));
  }
}
function creditMorning() {          // from goToSleep (and the debug api): every morning since the last one looked at
  if (!G || !CARDS.length) return [];
  const C = credit(), out = [];
  for (let d = C.upto + 1; d <= G.day; d++) creditDay(d, out);
  C.upto = Math.max(C.upto, G.day);
  return out;
}
// applying (Menu > Bank): a hard inquiry; a secured card takes the deposit from checking and needs no history,
// an unsecured one needs a job and a score of cards.min_score. The answer comes at once, with a letter by mail.
function applyCard(id) {
  const C = credit(), c = CARD_BY[id];
  if (!c || C.acct) return false;
  const say = (en, ko, bad) => { if (!panel.hidden) note(tr(en, ko), bad); else toast(en, ko, bad ? 'bad' : 'good', 4); };
  if (c.kind === 'secured' && G.money < +c.deposit) { say(`The deposit is ${usd(+c.deposit)}, and checking has ${usd2(G.money)}.`, `보증금은 ${usd(+c.deposit)}인데 입출금 계좌에는 ${usd2(G.money)}가 있어요.`, true); return false; }
  C.inq = C.inq.concat(G.day);
  const n = creditScore(), why = c.kind === 'secured' ? null : fired() ? 'income' : n == null ? 'history' : n < (+c.min_score || 0) ? 'score' : null;
  rescore(G.day);
  const me = hero().name_ko || G.name;
  if (why) {
    const r = { income: ['no current income from an employer', '현재 직장 소득이 없음'], history: ['no credit history in the U.S., not enough to give you a score', '미국 신용 기록이 없어 점수를 낼 수 없음'],
      score: [`a credit score of ${n} (this card needs ${c.min_score} or more)`, `신용 점수 ${n}점(이 카드는 ${c.min_score}점 이상)`] }[why];
    const tip = why !== 'income' && CARDS.some(x => x.kind === 'secured') ? [' A secured card is a good way to build credit first.', ' 먼저 보증금형 카드로 신용을 쌓아 보세요.'] : ['', ''];
    notify(CFG.bank_name, `${G.name}, we're sorry: we can't approve your application for the ${c.name} right now. The main reason: ${r[0]}. A letter with the details is on its way.${tip[0]}`,
      `${me} 님, 죄송합니다. 지금은 ${c.name_ko || c.name} 신청을 승인할 수 없습니다. 주된 이유: ${r[1]}. 자세한 내용은 우편으로 보내 드립니다.${tip[1]}`, 'email');
    addMail({ id: `cc_no@${G.day}_${C.inq.length}`, day: nextMailDay(G.day + 2), subject: 'About your credit card application', subject_ko: '신용카드 신청 결과 안내',
      body: `Thank you for applying for the ${c.name}. We are unable to approve it at this time. Principal reason: ${r[0]}. Our decision was based in part on information from a consumer credit bureau. You have the right to a free copy of your credit report from that bureau within 60 days, and to dispute anything in it that is wrong.`,
      body_ko: `${josa(c.name_ko || c.name, '을', '를')} 신청해 주셔서 감사합니다. 지금은 승인해 드릴 수 없습니다. 주된 이유: ${r[1]}. 이 결정에는 신용평가기관의 정보가 일부 쓰였습니다. 60일 안에 그 기관에서 신용 보고서를 무료로 받아 볼 수 있고, 틀린 내용이 있으면 정정을 요청할 수 있습니다. (adverse action notice: 신청 거절 사유 통지)` });
    logEvent('credit', `Card application declined: ${c.name}`, 0, { ko: `카드 신청 거절: ${c.name_ko || c.name}` });
    say(`Declined: ${r[0]}.${tip[0]}`, `거절됐어요: ${r[1]}.${tip[1]}`, true);
    return true;
  }
  if (c.kind === 'secured') pay(-c.deposit, 'Secured card deposit', 'cardpay', { ko: '보증금형 카드 보증금' });
  C.acct = openAcct(c, G.day, 'off');
  if (C.since == null) C.since = G.day;
  notify(CFG.bank_name, `Welcome, ${G.name}! Your ${cardName(c)} is approved, with a ${usd(C.acct.limit)} limit${C.acct.deposit ? ' (your deposit)' : ''}. It is in your phone's wallet now, and the card comes by mail in a few days. Your first statement closes ${dateShort(nextClose(G.day))}.`,
    `${me} 님, 환영합니다! 신청하신 카드(${cardName(c, true)})가 승인되었습니다. 한도는 ${usd(C.acct.limit)}${C.acct.deposit ? '(보증금)' : ''}입니다. 지금 바로 휴대전화 지갑에서 쓸 수 있고, 실물 카드는 며칠 뒤 우편으로 갑니다. 첫 명세서는 ${fmtDate(nextClose(G.day))[1]}에 마감합니다.`, 'email');
  addMail({ id: `cc_card@${G.day}`, day: nextMailDay(G.day + 3), subject: 'Your new credit card', subject_ko: '새 신용카드가 도착했습니다',
    body: `Your ${cardName(c)} is enclosed. Credit limit: ${usd(C.acct.limit)}. APR on purchases: ${+c.apr}%. Pay the statement balance in full by the due date each month and you pay no interest. Set up AutoPay in the app so you never miss a due date.`,
    body_ko: `새 카드(${cardName(c, true)})를 동봉합니다. 신용 한도: ${usd(C.acct.limit)}. 구매 연이율(APR): ${+c.apr}%. 매달 납부 기한까지 명세서 금액을 모두 내면 이자가 없습니다. 납부 기한을 놓치지 않도록 앱에서 자동 납부를 설정하세요.` });
  logEvent('credit', `Card approved: ${c.name}`, 0, { ko: `카드 승인: ${c.name_ko || c.name}` });
  say(`Approved! Your ${cardName(c)} is ready to use: limit ${usd(C.acct.limit)}. Shops now charge it (switch back to debit any time).`, `승인됐어요! 새 카드(${cardName(c, true)})를 바로 쓸 수 있어요. 한도 ${usd(C.acct.limit)}. 이제 가게에서 이 카드로 결제해요(언제든 체크카드로 바꿀 수 있어요).`);
  return true;
}
function cardCalendar(d) {          // the calendar: the closing date and the due date
  const a = G && G.credit && G.credit.acct, out = [];
  if (!a) return out;
  if (closesOn(d) && d > a.opened) out.push(tr('Credit card statement closes', '신용카드 명세서 마감'));
  if (a.st && a.st.due === d && a.st.min > 0) out.push(tr(`Credit card payment due: minimum ${usd2(a.st.min)}, statement ${usd2(a.st.bal)}${a.autopay !== 'off' ? ' (AutoPay)' : ''}`, `신용카드 납부 기한: 최소 ${usd2(a.st.min)}, 명세서 ${usd2(a.st.bal)}${a.autopay !== 'off' ? ' (자동 납부)' : ''}`));
  return out;
}
const modeGroup = (key, cur, list, label) => `<div class="mode" role="group" aria-label="${esc(label)}">${list.map(([k, en, ko]) => `<button type="button" data-credit="${key}:${k}" aria-pressed="${cur === k}">${tr(en, ko)}</button>`).join('')}</div>`;
function cardShopRow() {          // the shop panel: pay by debit card or credit card
  const a = G && CARDS.length ? credit().acct : null;
  if (!a) return '';
  const c = cardOf(a), free = Math.max(0, cents(a.limit - a.bal));
  return `<div class="row tips"><div class="main"><div class="t">${tr('Pay with', '결제 수단')}</div><div class="s">${a.use === 'credit' ? tr(`${esc(cardName(c))}: ${usd2(free)} available`, `${esc(cardName(c, true))}: ${usd2(free)} 사용 가능`) : tr(`Debit card: from checking at once (${usd2(G.money)})`, `체크카드: 입출금 계좌에서 바로 (${usd2(G.money)})`)}</div></div>
    ${modeGroup('use', a.use, [['debit', 'Debit', '체크카드'], ['credit', 'Credit', '신용카드']], tr('Pay with', '결제 수단'))}</div>`;
}
const monthsText = (m) => { const y = Math.floor(m / 12), mo = Math.floor(m % 12); return y ? tr(`${y} year${y === 1 ? '' : 's'}${mo ? ` ${mo} month${mo === 1 ? '' : 's'}` : ''}`, `${y}년${mo ? ` ${mo}개월` : ''}`) : tr(`${mo} month${mo === 1 ? '' : 's'}`, `${mo}개월`); };
function creditPanel() {          // Menu > Bank: the card (or the cards to apply for), the score and what makes it
  if (!G || !CARDS.length) return '';
  const C = credit(), a = C.acct, n = scoreNow();
  let h = `<h3>${tr('Credit card', '신용카드')}</h3>`;
  if (a) {
    const c = cardOf(a), st = a.st, free = Math.max(0, cents(a.limit - a.bal));
    h += `<div class="sum"><div><b>${usd2(a.bal)}</b>${tr('card balance', '카드 잔액')}</div><div><b>${usd2(free)}</b>${tr('available credit', '사용 가능 한도')}</div></div>
      <p class="fine">${esc(cardName(c, KO()))} · ${tr('limit', '한도')} ${usd(a.limit)}${a.deposit ? tr(` (your ${usd(a.deposit)} deposit)`, ` (보증금 ${usd(a.deposit)})`) : ''} · APR ${+c.apr}%${+c.cash_back ? tr(` · ${+c.cash_back}% cash back`, ` · 캐시백 ${+c.cash_back}%`) : ''}.
      ${tr(`Statements close on the ${ordinal(CLOSE_DOM)} of every month, and the payment is due ${DUE_DAYS} days later.`, `명세서는 매달 ${CLOSE_DOM}일에 마감하고, 대금은 ${DUE_DAYS}일 뒤까지 내요.`)}${c.kind === 'secured' && c.graduates_to ? tr(` After ${GRADUATE} on-time payments in a row it becomes an ordinary card (on time so far: ${a.streak}).`, ` ${GRADUATE}번 연속으로 제때 내면 일반 카드로 바뀌어요(지금까지 ${a.streak}번).`) : ''}</p>`;
    if (st) {
      const left = cents(st.min - st.paid), rest = cents(st.bal - st.paid);
      const state = st.min <= 0 ? tr('Nothing to pay', '낼 금액 없음') : rest <= 0.005 ? tr('Paid in full: no interest', '전액 납부: 이자 없음')
        : st.late ? tr(`Late: ${usd2(Math.max(0, left))} of the minimum unpaid`, `연체: 최소 금액 중 ${usd2(Math.max(0, left))} 미납`)
          : left > 0.005 ? tr(`${usd2(left)} of the minimum left`, `최소 금액 중 ${usd2(left)} 남음`) : tr(`Minimum paid. Pay the rest (${usd2(rest)}) by the due date to avoid interest.`, `최소 금액은 냈어요. 이자를 피하려면 나머지 ${usd2(rest)}도 기한까지 내세요.`);
      const po = rest > st.min + 0.005 && !st.late ? payoff(rest, c) : null;
      h += `<div class="row"><span class="when">${esc(dMonth(st.day))}</span><div class="main"><div class="t">${tr(`Statement ${usd2(st.bal)} · minimum ${usd2(st.min)} · due ${esc(dShort(st.due))}`, `명세서 ${usd2(st.bal)} · 최소 ${usd2(st.min)} · 기한 ${esc(dShort(st.due))}`)}</div>
        <div class="s">${state}${st.interest ? tr(` · interest ${usd2(st.interest)}`, ` · 이자 ${usd2(st.interest)}`) : ''}${st.fees ? tr(` · fees ${usd2(st.fees)}`, ` · 수수료 ${usd2(st.fees)}`) : ''}${st.back ? tr(` · cash back ${usd2(st.back)}`, ` · 캐시백 ${usd2(st.back)}`) : ''}</div>
        ${po ? `<div class="s">${tr(`Only the minimum every month: about ${po.months} months to pay off, ${usd2(po.interest)} in interest.`, `매달 최소 금액만 내면: 다 갚는 데 약 ${po.months}개월, 이자 ${usd2(po.interest)}.`)}</div>` : ''}</div></div>`;
    } else h += `<p class="fine">${tr(`No statement yet: the first closes on ${esc(dShort(nextClose(G.day)))}.`, `아직 명세서가 없어요. 첫 명세서는 ${esc(dShort(nextClose(G.day)))}에 마감해요.`)}</p>`;
    const restSt = st ? cents(st.bal - st.paid) : 0, restMin = st ? cents(st.min - st.paid) : 0;
    if (a.bal > 0) h += `<div class="leave-ask">${restSt > 0 ? `<button type="button" data-credit="pay:statement">${tr(`Pay statement ${usd2(Math.min(restSt, a.bal))}`, `명세서 금액 ${usd2(Math.min(restSt, a.bal))} 내기`)}</button>` : ''}${restMin > 0 && restMin < restSt ? `<button type="button" data-credit="pay:min">${tr(`Pay minimum ${usd2(restMin)}`, `최소 금액 ${usd2(restMin)} 내기`)}</button>` : ''}${a.bal > restSt + 0.005 ? `<button type="button" data-credit="pay:all">${tr(`Pay all ${usd2(a.bal)}`, `전액 ${usd2(a.bal)} 내기`)}</button>` : ''}
      <input id="card-amount" type="number" min="1" step="0.01" inputmode="decimal" placeholder="${tr('Amount', '금액')}" aria-label="${tr('Amount', '금액')}"><button type="button" data-credit="pay:other">${tr('Pay', '내기')}</button></div>`;
    h += `<div class="row tips"><div class="main"><div class="t">${tr('AutoPay', '자동 납부')}</div><div class="s">${tr('From checking, on the due date', '납부 기한에 입출금 계좌에서')}</div></div>${modeGroup('autopay', a.autopay, [['off', 'Off', '끄기'], ['min', 'Minimum', '최소 금액'], ['statement', 'Statement', '명세서 금액']], tr('AutoPay', '자동 납부'))}</div>
      <div class="row tips"><div class="main"><div class="t">${tr('Pay at shops with', '가게에서 결제')}</div><div class="s">${a.use === 'credit' ? tr('Credit card: pay the statement later', '신용카드: 나중에 명세서로') : tr('Debit card: from checking at once', '체크카드: 입출금 계좌에서 바로')}</div></div>${modeGroup('use', a.use, [['debit', 'Debit', '체크카드'], ['credit', 'Credit', '신용카드']], tr('Pay with', '결제 수단'))}</div>`;
    const tx = a.tx.slice().reverse().slice(0, 8);
    if (tx.length) h += tx.map(t => `<div class="row"><span class="when">${esc(dMonth(t.day))} · ${clk(t.minute)}</span><div class="main"><div class="t">${esc(tr(t.text, t.ko))}</div><div class="s">${tr('Credit card', '신용카드')}</div></div><span class="price ${t.amount < 0 ? 'out' : 'in'}">${t.amount < 0 ? '−' : '+'}${usd2(Math.abs(t.amount))}</span></div>`).join('');
  } else {
    h += `<p class="fine">${tr('You pay with your debit card: the money leaves checking at once. A credit card lets you pay later, and paying it on time builds a credit score (landlords, phone plans and car loans look at it).', '지금은 체크카드로 결제해요. 돈이 입출금 계좌에서 바로 나가요. 신용카드는 나중에 갚는 카드이고, 제때 갚으면 신용 점수가 쌓여요(집주인, 휴대전화 요금제, 자동차 대출이 이 점수를 봐요).')}</p>`
      + CARDS.map(c => `<div class="row"><div class="main"><div class="t">${esc(loc(c))}</div><div class="s">${esc(tr(c.note, c.note_ko))}</div>
        <div class="s">${c.kind === 'secured' ? tr(`Deposit ${usd(+c.deposit)} = limit`, `보증금 ${usd(+c.deposit)} = 한도`) : tr(`Score ${c.min_score}+`, `점수 ${c.min_score}점 이상`)} · APR ${+c.apr}%${+c.cash_back ? tr(` · ${+c.cash_back}% cash back`, ` · 캐시백 ${+c.cash_back}%`) : ''}</div></div>
        <button type="button" data-credit="apply:${esc(c.id)}">${tr('Apply', '신청')}</button></div>`).join('');
  }
  h += `<h3>${tr('Credit score', '신용 점수')}</h3>`;
  if (n == null) h += `<p class="fine">${tr(`No score yet: there is no U.S. credit history in your name. A score appears when a card's first statement is reported to the credit bureaus${a ? ` (${esc(dShort(nextClose(G.day)))})` : ''}.`, `아직 점수가 없어요. 내 이름으로 된 미국 신용 기록이 없어서예요. 카드의 첫 명세서가 신용평가기관에 보고되면 점수가 생겨요${a ? `(${esc(dShort(nextClose(G.day)))})` : ''}.`)}</p>`;
  else {
    const f = creditFactors(), b = bandOf(n), prev = C.scores.length > 1 ? C.scores[C.scores.length - 2].n : null;
    h += `<div class="sum"><div><b>${n}</b>${tr(b[1], b[2])} · 300–850${prev != null && prev !== n ? ` · ${n > prev ? '▲' : '▼'} ${Math.abs(n - prev)}` : ''}</div></div>`
      + [[tr('Payment history', '납부 기록'), tr(`${Math.round(f.ontime)} month${f.ontime === 1 ? '' : 's'} paid as agreed${f.lates ? `, ${f.lates} late` : ', none late'}`, `약정대로 낸 달 ${Math.round(f.ontime)}개월${f.lates ? `, 연체 ${f.lates}번` : ', 연체 없음'}`)],
        [tr('Credit used', '한도 사용률'), f.util == null ? '—' : `${Math.round(f.util * 100)}%` + tr(' of your limit on the last statement (under 30% is good, under 10% better)', ' (마지막 명세서 기준, 30% 아래면 좋고 10% 아래면 더 좋아요)')],
        [tr('Age of credit', '신용 기록 기간'), monthsText(f.months)],
        [tr('Hard inquiries', '하드 조회'), tr(`${f.inq} in the last year (applications)`, `최근 1년 ${f.inq}번(카드 신청)`)]]
        .map(([t, s]) => `<div class="row"><div class="main"><div class="t">${t}</div><div class="s">${s}</div></div></div>`).join('');
  }
  return h + `<p class="fine">${tr('Debit or credit? Debit takes the money from checking at once. Credit borrows it until the statement: pay the statement balance in full by the due date and it costs nothing (and builds your score). Carry a balance and interest (APR) is added; miss the minimum and there is a late fee, and a month later it goes on your credit report.',
    '체크카드와 신용카드의 차이: 체크카드는 입출금 계좌에서 바로 돈이 나가요. 신용카드는 명세서가 나올 때까지 빌려 쓰는 거예요. 납부 기한까지 명세서 금액을 전부 내면 비용이 없고 점수도 쌓여요. 잔액을 남기면 이자(APR)가 붙고, 최소 금액도 못 내면 연체료가, 한 달이 더 지나면 신용 기록에 연체가 남아요.')}</p>`;
}
function creditClick(b) {          // the buttons of the bank panel and the shop panel (data-credit="what:arg")
  const [what, arg] = String(b.dataset.credit).split(':'), C = credit(), body = panel.querySelector('.panel-body'), y = body.scrollTop;
  let ok = false;
  if (what === 'use' && C.acct) { C.acct.use = arg === 'credit' ? 'credit' : 'debit'; ok = true; }
  else if (what === 'autopay' && C.acct) { C.acct.autopay = /^(off|min|statement)$/.test(arg) ? arg : 'off'; ok = true; }
  else if (what === 'pay') ok = cardPay(arg === 'other' ? +((panel.querySelector('#card-amount') || {}).value || 0) : arg) > 0;
  else if (what === 'apply') ok = applyCard(arg);
  if (!ok) return;
  saveGame();
  const nt = panel.querySelector('.panel-note'), keep = [nt.textContent, nt.className];
  renderPanel();
  nt.textContent = keep[0]; nt.className = keep[1]; body.scrollTop = y;
}
const cardDebug = {          // SO.debug.card
  get state() { return G && CARDS.length ? JSON.parse(JSON.stringify(credit())) : null; },
  get score() { return G && CARDS.length ? (credit(), scoreNow()) : null; }, get factors() { return G && CARDS.length ? (credit(), creditFactors()) : null; },
  apply(id) { applyCard(id); return !!credit().acct; }, use(k) { const a = credit().acct; if (a) a.use = k === 'debit' ? 'debit' : 'credit'; return a ? a.use : null; },
  autopay(m) { const a = credit().acct; if (a) a.autopay = /^(off|min|statement)$/.test(m) ? m : 'off'; return a ? a.autopay : null; },
  pay(what) { return cardPay(what); }, tick() { return creditMorning(); }, charge(amount, text) { if (!credit().acct) return null; cardCharge(+amount, text || 'Test', 'card'); return credit().acct.bal; },
  statement() { const a = credit().acct, out = []; if (!a) return null; closeStatement(G.day, out); return Object.assign({ lines: out }, a.st); }          // close a statement now
};
on('morning', () => creditMorning(), 500);          // the credit card: a statement, autopay, a late fee, the score
debugPart({ card: cardDebug });

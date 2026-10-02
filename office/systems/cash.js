/* Sim Office — cash: the wallet, ATMs, cash back, places that take only cash. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- cash: the wallet, ATMs, cash back, places that take only cash
// G.money is the checking account (the debit card, paychecks, autopay); G.cash is the cash in your wallet (config
// start_cash for each hero, given on day 1 or to a save from before there was cash). Most places take the card; the
// places in config cash_only (the farmers market stands by Seaside Park) take only cash. Cash comes from an ATM
// (places of kind atm): your own credit union's (config atm_own) is free and takes deposits, another bank's charges
// config atm_fee for every withdrawal, shown on the screen before you accept it. Up to config atm_daily_limit a day
// in $20 bills, never more than is in checking. At the checkout of the market (config cash_back_place) the cashier
// gives cash back (config cash_back: the amounts) with a purchase made there in the last half hour, at no fee.
// Cash spent is logged with cash: 1 (not a line in the bank's list); a withdrawal, a deposit or cash back is logged
// as type atm (money moving between checking and the wallet: neither spent nor earned).
// G.atm = { day, out (withdrawn that day) }, G.cashBackAt (the purchase cash back was given with).
const CASH_ONLY = new Set(listOf(CFG.cash_only)), ATM_OWN = new Set(listOf(CFG.atm_own));
const ATM_FEE = +CFG.atm_fee || 0, ATM_LIMIT = +CFG.atm_daily_limit || 500, CASH_BACK_AT = String(CFG.cash_back_place || '');
const ATM_AMOUNTS = listOf(CFG.atm_amounts || '20,40,60,100,200').map(Number), CASH_BACK = listOf(CFG.cash_back || '20,40').map(Number);
const cashOnly = (pid) => !!pid && CASH_ONLY.has(pid);
const wallet = () => !G ? 0 : G.cash == null ? (G.cash = perHero(CFG.start_cash, G.hero, 0)) : G.cash;
const atms = () => rows('places').filter(p => p.kind === 'atm');
const atmFee = (pid) => ATM_OWN.has(pid) ? 0 : ATM_FEE;
const atmOut = () => G.atm && G.atm.day === G.day ? G.atm.out : 0;
const nameKo = (p) => p.name_ko || p.name;
const storeOf = (pid) => { const z = zoneOfPlace(pid), d = PLACES[z + '_door']; return d ? [d.name, nameKo(d)] : zoneName(z); };          // Fairview Market
let atmAsk = null;          // { pid, n }: a withdrawal waiting for you to accept the fee
function payCash(amount, text, type, extra) {
  G.cash = cents(wallet() + amount);
  logEvent(type || 'spend', text, amount, Object.assign({ cash: 1 }, extra || null));
}
function atmList() {          // the ATMs and what they cost, for the panels
  const l = atms();
  return [l.map(p => `${p.name} (${atmFee(p.id) ? usd2(atmFee(p.id)) + ' fee' : 'free'})`).join(', '), l.map(p => `${nameKo(p)} (${atmFee(p.id) ? '수수료 ' + usd2(atmFee(p.id)) : '수수료 없음'})`).join(', ')];
}
function cashShort(b) {         // the shop's note when the wallet is short at a cash-only place
  const [en, ko] = atmList();
  return tr(`Cash only, sorry: that's ${receipt(b)}, and you have ${usd2(wallet())} in cash. Get cash at an ATM: ${en}.`, `죄송하지만 현금만 받아요. ${receipt(b)}인데 지갑 속 현금은 ${usd2(wallet())}예요. ATM에서 현금을 찾으세요: ${ko}.`);
}
function cashNote(pid, sub) {   // over the list of a shop: cash only, and how much you have
  if (!cashOnly(pid)) return '';
  sub.textContent = tr('Cash ', '현금 ') + usd2(wallet());
  const [en, ko] = atmList();
  return `<p class="fine">${tr(`💵 <b>Cash only.</b> In your wallet: <b>${usd2(wallet())}</b>. ATMs: ${esc(en)}.`, `💵 <b>현금만 받아요.</b> 지갑 속 현금: <b>${usd2(wallet())}</b>. ATM: ${esc(ko)}.`)}</p>`;
}
function cashHud() {
  const el = $('hud-cash');
  if (!el) return;
  el.textContent = '💵 ' + usd(wallet());
  el.title = tr('Cash in your wallet', '지갑 속 현금');
}
function bankCash() {           // Menu > Bank: the wallet, the ATMs, cash back, where only cash will do
  const [en, ko] = atmList(), only = Array.from(CASH_ONLY).filter(id => PLACES[id]);
  const back = CASH_BACK_AT && PLACES[CASH_BACK_AT] ? [` Cash back at the ${storeOf(CASH_BACK_AT)[0]} checkout is free.`, ` ${storeOf(CASH_BACK_AT)[1]} 계산대의 캐시백은 수수료가 없어요.`] : ['', ''];
  return `<p class="fine">${tr(`💵 Cash in your wallet: <b>${usd2(wallet())}</b>. ATMs: ${esc(en)}.${esc(back[0])}${only.length ? ` Cash only: ${esc(only.map(id => PLACES[id].name).join(', '))}.` : ''}`,
    `💵 지갑 속 현금: <b>${usd2(wallet())}</b>. ATM: ${esc(ko)}.${esc(back[1])}${only.length ? ` 현금만 받는 곳: ${esc(only.map(id => nameKo(PLACES[id])).join(', '))}.` : ''}`)}</p>`;
}
function atmSays(ok, why, en, ko) {
  if (panelKind === 'atm' && !panel.hidden) note(tr(en, ko), !ok);
  else if (!panel.hidden || state === 'play') toast(en, ko, ok ? 'good' : 'bad', 4);
  return { ok, why, cash: wallet(), money: G.money };
}
// take cash out: the fee of another bank's ATM is shown first (accept: you said yes on its screen)
function withdraw(pid, n, accept) {
  n = Math.round(+n);
  const fee = atmFee(pid), where = place(pid);
  if (placeKind(pid) !== 'atm') return atmSays(false, 'atm', 'There is no ATM here.', '여기에는 ATM이 없어요.');
  if (!(n > 0) || n % 20) return atmSays(false, 'bills', 'This ATM gives $20 bills only.', '이 ATM은 20달러 지폐만 나와요.');
  if (atmOut() + n > ATM_LIMIT) return atmSays(false, 'limit', `That's over your daily ATM limit of ${usd(ATM_LIMIT)} (${usd(Math.max(0, ATM_LIMIT - atmOut()))} left today).`, `하루 ATM 인출 한도 ${usd(ATM_LIMIT)}를 넘어요 (오늘 남은 한도 ${usd(Math.max(0, ATM_LIMIT - atmOut()))}).`);
  if (G.money < n + fee) return atmSays(false, 'funds', `Insufficient funds: checking has ${usd2(G.money)}${fee ? `, and this ATM adds a ${usd2(fee)} fee` : ''}.`, `잔액이 부족해요. 계좌에 ${usd2(G.money)}${fee ? `가 있고, 이 ATM은 수수료 ${usd2(fee)}가 더 붙어요` : '뿐이에요'}.`);
  if (fee && !accept) { atmAsk = { pid, n }; return { ok: false, why: 'fee', fee, cash: wallet(), money: G.money }; }
  atmAsk = null;
  pay(-n, `ATM withdrawal (${where.name})`, 'atm', { ko: `ATM 출금 (${nameKo(where)})` });
  if (fee) pay(-fee, `ATM fee (${where.name})`, 'fee', { ko: `ATM 수수료 (${nameKo(where)})` });
  G.cash = cents(wallet() + n);
  G.atm = { day: G.day, out: atmOut() + n };
  advanceMinutes(2);
  if (player) play(player, 'interact-right', { once: true });
  saveGame();
  return atmSays(true, 'ok', `Take your cash: ${usd(n)} in twenties${fee ? `, and a ${usd2(fee)} fee` : ''}. Cash in your wallet: ${usd2(wallet())}.`, `20달러 지폐로 ${usd(n)} 찾았어요${fee ? `(수수료 ${usd2(fee)})` : ''}. 지갑 속 현금: ${usd2(wallet())}.`);
}
function deposit(pid, n) {      // your own credit union's ATM takes bills (whole dollars)
  const most = Math.floor(wallet());
  n = n == null ? most : Math.min(most, Math.floor(+n));
  if (!ATM_OWN.has(pid)) return atmSays(false, 'atm', 'This ATM does not take deposits for your bank.', '이 ATM에서는 내 은행으로 입금할 수 없어요.');
  if (!(n >= 1)) return atmSays(false, 'cash', 'You have no bills to deposit.', '입금할 지폐가 없어요.');
  G.cash = cents(wallet() - n);
  pay(n, `ATM deposit (${place(pid).name})`, 'atm', { ko: `ATM 입금 (${nameKo(place(pid))})` });
  advanceMinutes(2);
  saveGame();
  return atmSays(true, 'ok', `Deposited ${usd(n)} in bills. Checking: ${usd2(G.money)}.`, `지폐 ${usd(n)} 입금했어요. 계좌 잔액: ${usd2(G.money)}.`);
}
function boughtAt(pid) {        // the last purchase today at the shelves of the store a checkout is in (a minute stamp)
  const z = zoneOfPlace(pid), names = new Set(rows('items').filter(i => i.place && zoneOfPlace(i.place) === z && !cashOnly(i.place)).map(i => i.name));
  const l = G.log.slice().reverse().find(x => x.day === G.day && x.type === 'spend' && !x.cash && names.has(x.text));
  return l ? l.day * 1440 + l.minute : null;
}
const cashBackOk = () => { const at = boughtAt(CASH_BACK_AT); return at != null && G.day * 1440 + G.minute - at <= 30 && G.cashBackAt !== at; };
function cashBack(n) {
  n = Math.round(+n);
  if (!CASH_BACK.includes(n)) return atmSays(false, 'amount', `Cash back comes in ${CASH_BACK.map(x => usd(x)).join(', ')}.`, `캐시백은 ${CASH_BACK.map(x => usd(x)).join(', ')} 중에서 골라요.`);
  if (!cashBackOk()) return atmSays(false, 'purchase', 'Buy something first: the cashier gives cash back with a purchase.', '먼저 물건을 사세요. 캐시백은 물건을 살 때 함께 받아요.');
  if (G.money < n) return atmSays(false, 'funds', `Your card is declined for that: checking has ${usd2(G.money)}.`, `카드가 거절됐어요. 계좌 잔액이 ${usd2(G.money)}예요.`);
  G.cashBackAt = boughtAt(CASH_BACK_AT);
  pay(-n, `Cash back (${storeOf(CASH_BACK_AT)[0]})`, 'atm', { ko: `캐시백 (${storeOf(CASH_BACK_AT)[1]})` });
  G.cash = cents(wallet() + n);
  saveGame();
  return atmSays(true, 'ok', `The cashier hands you ${usd(n)} with your receipt. Cash in your wallet: ${usd2(wallet())}.`, `계산원이 영수증과 함께 현금을 건네줘요: ${usd(n)}. 지갑 속 현금: ${usd2(wallet())}.`);
}
function atmPanel(h, sub, body, pid) {
  const back = pid === CASH_BACK_AT, fee = back ? 0 : atmFee(pid), left = Math.max(0, ATM_LIMIT - atmOut());
  h.textContent = back ? tr('Cash back', '캐시백') : loc(place(pid));
  sub.textContent = tr(`Checking ···4821 · ${usd2(G.money)}`, `입출금 계좌 ···4821 · ${usd2(G.money)}`);
  let html = `<div class="sum"><div><b>${usd2(G.money)}</b>${tr('in checking', '계좌 잔액')}</div><div><b>${usd2(wallet())}</b>${tr('cash in your wallet', '지갑 속 현금')}</div>${back ? '' : `<div><b>${usd(left)}</b>${tr('left to take out today', '오늘 남은 인출 한도')}</div>`}</div>`;
  if (back) {
    const ok = cashBackOk();
    html += `<p class="fine">${tr(`Cash back with a debit card purchase: no fee. It comes out of checking along with your groceries.`, '체크카드로 물건을 사면서 현금을 함께 받는 캐시백이에요. 수수료가 없고, 장 본 금액과 함께 계좌에서 빠져나가요.')}${ok ? '' : ' ' + tr('Buy something at the store first.', '먼저 가게에서 물건을 사세요.')}</p>
      <div class="leave-ask">${CASH_BACK.map(n => `<button type="button" data-cashback="${n}" ${ok && n <= G.money ? '' : 'disabled'}>${usd(n)}</button>`).join('')}</div>`;
  } else {
    const own = Array.from(ATM_OWN).filter(id => PLACES[id]).map(id => place(id));
    html += `<p class="fine">${!fee ? tr(`${esc(CFG.bank_name)}'s own ATM: no fee, open around the clock. Up to ${usd(ATM_LIMIT)} a day in $20 bills. It takes cash deposits too.`, `내 신용조합(${esc(CFG.bank_name)})의 ATM이에요. 수수료가 없고 24시간 열려 있어요. 하루 ${usd(ATM_LIMIT)}까지 20달러 지폐로 찾을 수 있고, 현금 입금도 돼요.`)
      : tr(`⚠️ This ATM is not your bank's: it charges <b>${usd2(fee)}</b> for every withdrawal, on top of the cash you take out.${own.length ? ` ${esc(own.map(p => p.name).join(', '))} is free for you.` : ''}`, `⚠️ 내 은행의 ATM이 아니라서 인출할 때마다 <b>${usd2(fee)}</b>의 수수료가 붙어요.${own.length ? ` ${esc(own.map(nameKo).join(', '))}는 수수료가 없어요.` : ''}`)}</p>`;
    const ask = atmAsk && atmAsk.pid === pid ? atmAsk.n : null;
    if (ask != null) html += `<div class="row atm-fee"><div class="main"><div class="t">${tr(`This ATM charges a ${usd2(fee)} fee for this withdrawal, in addition to any fee your bank may charge. Do you accept the fee?`, `이 ATM은 이번 인출에 ${usd2(fee)}의 수수료를 받습니다. 거래 은행의 수수료는 따로입니다. 수수료에 동의하시겠습니까?`)}</div>
      <div class="s">${tr(`${usd(ask)} + fee ${usd2(fee)} = ${usd2(ask + fee)} from checking`, `${usd(ask)} + 수수료 ${usd2(fee)} = 계좌에서 ${usd2(ask + fee)}`)}</div></div><button type="button" data-atm-ok="${ask}">${tr('Accept fee', '수수료 동의')}</button><button type="button" class="danger" data-atm-no="1">${tr('Cancel', '취소')}</button></div>`;
    else html += `<h3>${tr('Withdraw cash', '현금 인출')}</h3><div class="leave-ask">${ATM_AMOUNTS.map(n => `<button type="button" data-atm="${n}" ${n > left || n + fee > G.money ? 'disabled' : ''}>${usd(n)}</button>`).join('')}</div>`;
    if (!fee && ATM_OWN.has(pid) && wallet() >= 1) html += `<h3>${tr('Deposit cash', '현금 입금')}</h3><div class="leave-ask"><button type="button" data-atm-in="1">${tr(`Deposit ${usd(Math.floor(wallet()))} in bills`, `지폐 ${usd(Math.floor(wallet()))} 입금`)}</button></div>`;
  }
  body.innerHTML = html;
}

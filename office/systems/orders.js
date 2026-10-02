/* Sim Office — shopping online: an order from the phone, a package at the door. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- shopping online: an order from the phone, a package at the door
// Phone > Shop online (config order_store; catalog table: what it sells, item = the items row that goes in your bag,
// qty packages of it). Paid with the debit card at once: the prices, sales tax on all but groceries, and config
// order_shipping unless the order comes to config order_free_over. The carrier (config order_carrier) brings it on
// the config order_days-th business day after the order (Monday to Friday, not a federal holiday), some time between
// 10 AM and 5 PM; tracking comes by email and text (shipped the next morning, out for delivery at 8:30). Nobody home:
// the package is left at your front door and goes in your bag when you next come home. A package with a catalog row
// that needs a signature cannot be left: a door tag ("Sorry we missed you"), another try the next delivery day
// (Monday to Saturday), and after config order_tries tries it waits at the carrier's counter (config order_pickup,
// in the market) for config order_hold_days, then goes back to the store and the money comes back. Home means your
// home zone when the driver comes. G.orders [{ id, track, day, lines [[catalog id, n]], sub, tax, ship, total, sig,
// due, at, tries, state placed | door | held | done | returned, sent { ship, out }, missed, hold, until, got, tag }].
const CATALOG = rows('catalog').slice().sort((a, b) => (a.sort || 0) - (b.sort || 0)), CAT = byId('catalog');
const STORE = [CFG.order_store || 'Northpine', CFG.order_store_ko || CFG.order_store || 'Northpine'];
const CARRIER = [CFG.order_carrier || 'Parcel Express', CFG.order_carrier_ko || CFG.order_carrier || 'Parcel Express'];
const SHIP = +(CFG.order_shipping == null ? 5.99 : CFG.order_shipping), FREE_OVER = +CFG.order_free_over || 35;
const ORDER_DAYS = +CFG.order_days || 2, ORDER_TRIES = +CFG.order_tries || 2, HOLD_DAYS = +CFG.order_hold_days || 7;
const PICKUP_AT = String(CFG.order_pickup || '');
let cart = { of: null, n: {} };
const theCart = () => { if (cart.of !== G) cart = { of: G, n: {} }; return cart.n; };
const orders = () => G.orders || (G.orders = []);
const bizDay = (d) => !isWeekend(d) && !dayOff(d);
function arrival(d) { for (let n = 0; n < ORDER_DAYS;) { d++; if (bizDay(d)) n++; } return d; }
const dropAt = (o) => 600 + hash(o.id + ':' + o.tries) % 420;          // 10:00 to 16:59
function orderBill(lines) {
  let sub = 0, tax = 0;
  lines.forEach(([id, n]) => { const c = CAT[id], i = ITEMS[c.item] || {}; sub += +c.price * n; if (taxed(i)) tax += +c.price * n * TAX; });
  sub = cents(sub); tax = cents(tax);
  const ship = !lines.length || sub >= FREE_OVER ? 0 : SHIP;
  return { sub, tax, ship, total: cents(sub + tax + ship) };
}
const cartLines = () => Object.keys(theCart()).filter(id => CAT[id] && theCart()[id] > 0).map(id => [id, theCart()[id]]);
const linesText = (o) => [o.lines.map(([id, n]) => `${CAT[id] ? CAT[id].name : id}${n > 1 ? ' ×' + n : ''}`).join(', '), o.lines.map(([id, n]) => `${CAT[id] ? nameKo(CAT[id]) : id}${n > 1 ? ' ×' + n : ''}`).join(', ')];
function placeOrder() {
  const lines = cartLines(), b = orderBill(lines);
  if (!lines.length) { note(tr('Your cart is empty.', '장바구니가 비었어요.'), true); return null; }
  if (G.money < b.total) { note(tr(`Your debit card was declined: checking has ${usd2(G.money)}.`, `체크카드가 거절됐어요. 계좌 잔액이 ${usd2(G.money)}예요.`), true); return null; }
  const now = G.day * 1440 + Math.floor(G.minute);
  const o = Object.assign({ id: 'NP-' + (100000 + hash(G.name + now + orders().length) % 900000), day: G.day, lines, sig: lines.some(([id]) => +CAT[id].signature), tries: 0, state: 'placed', sent: {} }, b);
  o.track = '1PX' + String(hash(o.id) % 1e9).padStart(9, '0');
  o.due = arrival(G.day); o.at = dropAt(o);
  pay(-o.total, `${STORE[0]} order ${o.id}`, 'spend', { ko: `${STORE[1]} 주문 ${o.id}`, tax: o.tax || undefined });
  orders().push(o);
  cart.n = {};
  const [en, ko] = linesText(o);
  notify(STORE[0], `Thanks for your order ${o.id}: ${en}. ${usd2(o.total)} was charged to your debit card ···4821. Arriving ${dateLong(o.due)} by ${CARRIER[0]}.${o.sig ? ' Someone will need to sign for it.' : ''}`,
    `주문 ${o.id} 감사합니다: ${ko}. 체크카드 ···4821로 ${usd2(o.total)}가 결제되었습니다. ${dateKo(o.due)}에 ${CARRIER[1]}로 도착합니다.${o.sig ? ' 받을 때 서명이 필요합니다.' : ''}`, 'email');
  saveGame();
  note(tr(`Order ${o.id} placed: ${usd2(o.total)}. Arriving ${dShort(o.due)}.`, `주문 ${o.id} 완료: ${usd2(o.total)}. ${dShort(o.due)} 도착 예정.`));
  return o;
}
function takeIn(o) {            // the package goes in your bag
  o.lines.forEach(([id, n]) => { const c = CAT[id]; if (c && ITEMS[c.item]) for (let k = 0; k < n * (+c.qty || 1); k++) addLot(c.item); });
  o.state = 'done'; o.got = o.got || G.day;
}
// what happens to the orders by now (from checkPhone, while you walk about): tracking, the driver, the door, the counter
function ordersTick() {
  if (!G || !G.orders || !G.orders.length) return;
  const now = G.day * 1440 + G.minute, home = zoneId === hero().home_zone;
  let changed = false;
  G.orders.forEach(o => {
    const [en, ko] = linesText(o);
    if (o.state === 'placed') {
      if (!o.sent.ship && now >= (o.day + 1) * 1440 + 450) {
        o.sent.ship = 1; changed = true;
        notify(STORE[0], `Your order ${o.id} has shipped with ${CARRIER[0]} (tracking number ${o.track}). Arriving ${dateLong(o.due)}.`, `주문 ${o.id}이 ${CARRIER[1]}로 발송되었습니다(운송장 번호 ${o.track}). ${dateKo(o.due)} 도착 예정.`, 'email');
      }
      if (o.sent.out !== o.due && now >= o.due * 1440 + 510) {
        o.sent.out = o.due; changed = true;
        notify(CARRIER[0], `Your package ${o.track} from ${STORE[0]} is out for delivery today.${o.sig ? ' A signature is required.' : ''}`, `${STORE[1]}에서 보낸 소포(${o.track})가 오늘 배송을 시작했습니다.${o.sig ? ' 받는 분의 서명이 필요합니다.' : ''}`, 'text');
      }
      const t = o.due * 1440 + o.at;
      if (now >= t) {
        changed = true;
        const there = home && now - t < 30;          // home when the driver knocked (not a day the clock skipped)
        if (there) {
          takeIn(o);
          toast(`📦 The ${CARRIER[0]} driver knocks${o.sig ? ' and you sign for the package' : ''}: ${en}. It's in your bag.`, `📦 ${CARRIER[1]} 기사가 문을 두드려요${o.sig ? '. 서명하고 소포를 받았어요' : ''}: ${ko}. 가방에 넣었어요.`, 'good', 6);
        } else if (!o.sig) {
          o.state = 'door'; o.got = o.due;
          notify(CARRIER[0], `Delivered at ${clock(o.at)}. Your package ${o.track} was left at your front door.`, `${clockKo(o.at)}에 배달했습니다. 소포(${o.track})를 현관 앞에 두었습니다.`, 'text');
        } else {
          o.tries++; o.missed = o.due; o.tag = true;
          if (o.tries < ORDER_TRIES) {
            o.due = nextMailDay(o.due + 1); o.at = dropAt(o);
            notify(CARRIER[0], `Sorry we missed you! Package ${o.track} needs a signature and no one was home. We'll try again ${dateLong(o.due)}, 10 AM to 5 PM.`, `부재중이라 소포(${o.track})를 전하지 못했습니다. 서명이 필요한 소포라 ${dateKo(o.due)} 오전 10시~오후 5시에 다시 배달하겠습니다.`, 'text');
          } else {
            o.state = 'held'; o.hold = o.due + 1; o.until = o.hold + HOLD_DAYS - 1;
            notify(CARRIER[0], `Sorry we missed you again. Package ${o.track} will be at the ${CARRIER[0]} counter in ${storeOf(PICKUP_AT)[0]} from ${dateLong(o.hold)} until ${dateLong(o.until)}. Bring a photo ID.`, `또 부재중이라 소포(${o.track})를 전하지 못했습니다. ${dateKo(o.hold)}부터 ${dateKo(o.until)}까지 ${storeOf(PICKUP_AT)[1]}의 ${CARRIER[1]} 창구에 보관합니다. 사진이 붙은 신분증을 가져오세요.`, 'text');
          }
        }
      }
    }
    if (o.state === 'door' && home) {
      takeIn(o); changed = true;
      toast(`📦 You bring in the package from ${STORE[0]}: ${en}. It's in your bag.`, `📦 ${STORE[1]}에서 온 소포를 들여왔어요: ${ko}. 가방에 넣었어요.`, 'good', 6);
    }
    if (o.tag && home && o.state !== 'done') {
      o.tag = false; changed = true;
      toast(`📋 A door tag from ${CARRIER[0]}: "Sorry we missed you." ${o.state === 'held' ? `Pick up the package at the ${CARRIER[0]} counter in ${storeOf(PICKUP_AT)[0]} with a photo ID.` : `They'll try again ${dateLong(o.due)}.`}`,
        `📋 현관문에 ${CARRIER[1]}의 부재 안내 쪽지("Sorry we missed you")가 붙어 있어요. ${o.state === 'held' ? `사진이 붙은 신분증을 들고 ${storeOf(PICKUP_AT)[1]}의 ${CARRIER[1]} 창구에서 찾으세요.` : `${dateKo(o.due)}에 다시 온대요.`}`, null, 7);
    }
    if (o.state === 'held' && G.day > o.until) {
      o.state = 'returned'; o.tag = false; changed = true;
      pay(o.total, `Refund: ${STORE[0]} order ${o.id}`, 'income', { ko: `환불: ${STORE[1]} 주문 ${o.id}` });
      notify(STORE[0], `Your package ${o.track} wasn't picked up, so ${CARRIER[0]} sent it back to us. We've refunded ${usd2(o.total)} to your card ···4821.`, `소포(${o.track})를 찾아가지 않아 ${CARRIER[1]}가 저희에게 돌려보냈습니다. 카드 ···4821로 ${usd2(o.total)}를 환불했습니다.`, 'email');
    }
  });
  if (changed) saveGame();
}
const pickupReady = () => !G ? [] : orders().filter(o => o.state === 'held' && G.day >= o.hold);
function pickup() {
  const list = pickupReady();
  if (!list.length) return false;
  list.forEach(takeIn);
  advanceMinutes(3);
  if (player) play(player, 'interact-right', { once: true });
  const all = list.map(linesText);
  toast(`You show your photo ID at the ${CARRIER[0]} counter and get your package: ${all.map(x => x[0]).join('; ')}.`, `${CARRIER[1]} 창구에서 사진이 붙은 신분증을 보여 주고 소포를 받았어요: ${all.map(x => x[1]).join('; ')}.`, 'good', 6);
  saveGame();
  return true;
}
function orderStatus(o) {
  const now = G.day * 1440 + G.minute;
  if (o.state === 'done') return [`Delivered ${dateShort(o.got)}`, `${dShort(o.got)} 받음`];
  if (o.state === 'returned') return [`Returned to ${STORE[0]}: ${usd2(o.total)} refunded`, `${STORE[1]}로 반송: ${usd2(o.total)} 환불`];
  if (o.state === 'door') return [`Delivered ${dateShort(o.got)}: waiting at your front door`, `${dShort(o.got)} 배달됨: 현관 앞에 있어요`];
  if (o.state === 'held') return [`At the ${CARRIER[0]} counter in ${storeOf(PICKUP_AT)[0]}${G.day < o.hold ? ` from ${dateShort(o.hold)}` : ''} until ${dateShort(o.until)}. Bring a photo ID.`, `${storeOf(PICKUP_AT)[1]}의 ${CARRIER[1]} 창구에 ${G.day < o.hold ? `${dShort(o.hold)}부터 ` : ''}${dShort(o.until)}까지 보관 중. 사진이 붙은 신분증을 가져가세요.`];
  if (o.missed) return [`Missed you ${dateShort(o.missed)} (signature needed) · trying again ${dateShort(o.due)}`, `${dShort(o.missed)} 부재(서명 필요) · ${dShort(o.due)}에 다시 배달`];
  if (o.sent.out === o.due && G.day === o.due) return ['Out for delivery today', '오늘 배송 중'];
  return o.sent.ship || now >= (o.day + 1) * 1440 + 450 ? [`Shipped · arriving ${dateShort(o.due)}`, `발송됨 · ${dShort(o.due)} 도착 예정`] : [`Ordered · arriving ${dateShort(o.due)}`, `주문함 · ${dShort(o.due)} 도착 예정`];
}
function shopLink() {           // at the top of the phone: the online store
  if (!CATALOG.length || !G) return '';
  const n = orders().filter(o => o.state === 'placed' || o.state === 'door' || o.state === 'held').length;
  return `<p class="fine"><button type="button" data-shop-online="1">${tr(`🛒 Shop online: ${esc(STORE[0])}`, `🛒 온라인 쇼핑: ${esc(STORE[1])}`)}</button>${n ? tr(` ${n} order${n === 1 ? '' : 's'} on the way.`, ` 배송 중인 주문 ${n}건.`) : ''}</p>`;
}
function orderPanel(h, sub, body) {
  h.textContent = tr(STORE[0], STORE[1]);
  sub.textContent = tr(`Debit card ···4821 · ${usd2(G.money)}`, `체크카드 ···4821 · ${usd2(G.money)}`);
  const c = theCart(), lines = cartLines(), b = orderBill(lines);
  const mine = orders().filter(o => o.state !== 'done' && o.state !== 'returned' || G.day - (o.got || o.until || o.day) <= 7).slice().reverse().slice(0, 6);
  let html = `<p class="fine">${tr(`Everyday things delivered by ${esc(CARRIER[0])} in about ${ORDER_DAYS} business days. Shipping ${usd2(SHIP)}, free on orders of ${usd(FREE_OVER)} or more. Sales tax on everything but groceries. ✍️ = someone has to be home to sign for it.`,
    `${esc(CARRIER[1])}가 영업일 기준 약 ${ORDER_DAYS}일 만에 배달해요. 배송비 ${usd2(SHIP)}, ${usd(FREE_OVER)} 이상 주문하면 무료. 식료품 말고는 판매세가 붙어요. ✍️ = 받을 때 서명이 필요해서 누군가 집에 있어야 해요.`)}</p>`;
  if (lines.length) html += `<h3>${tr('Cart', '장바구니')}</h3><div class="sum"><div><b>${usd2(b.sub)}</b>${tr('items', '상품')}</div><div><b>${usd2(b.tax)}</b>${tr('sales tax', '판매세')}</div><div><b>${b.ship ? usd2(b.ship) : tr('Free', '무료')}</b>${tr('shipping', '배송비')}</div><div><b>${usd2(b.total)}</b>${tr('total', '합계')}</div></div>
    ${b.ship ? `<p class="fine">${tr(`Add ${usd2(FREE_OVER - b.sub)} more for free shipping.`, `${usd2(FREE_OVER - b.sub)}어치 더 담으면 배송비가 무료예요.`)}</p>` : ''}
    <div class="leave-ask"><button type="button" data-order="1" ${G.money < b.total ? 'disabled' : ''}>${tr(`Place order · ${usd2(b.total)}`, `주문하기 · ${usd2(b.total)}`)}</button><span class="fine">${tr(`Arrives ${dateShort(arrival(G.day))}`, `${dShort(arrival(G.day))} 도착 예정`)}</span></div>`;
  if (mine.length) html += `<h3>${tr('Your orders', '내 주문')}</h3>` + mine.map(o => { const [en, ko] = linesText(o), st = orderStatus(o);
    return `<div class="row"><span class="when">${esc(dMonth(o.day))}</span><div class="main"><div class="t">${esc(tr(en, ko))}</div><div class="s">📦 ${esc(tr(st[0], st[1]))} · ${esc(o.id)}</div></div><span class="price out">${usd2(o.total)}</span></div>`; }).join('');
  html += `<h3>${tr('Shop', '상품')}</h3>` + CATALOG.map(x => {
    const i = ITEMS[x.item] || {}, u = usesOf(i) * (+x.qty || 1), n = c[x.id] || 0;
    const facts = [+x.signature ? tr('✍️ signature required', '✍️ 서명 필요') : '', i.kind === 'grocery' ? tr('grocery, no tax', '식료품, 면세') : '', u > 1 && i.energy ? tr(`${u} portions`, `${u}회분`) : '', +i.shelf_days > 0 ? tr(`keeps ${+i.shelf_days} days`, `${+i.shelf_days}일 보관`) : '', tr(x.note || '', x.note_ko)].filter(Boolean);
    return `<div class="row"><button type="button" class="play" data-say="${esc(x.name)}" aria-label="Say it">▶</button><div class="main"><div class="t">${esc(loc(x))}${n ? ` <b>×${n}</b>` : ''}</div><div class="s">${esc(facts.join(' · '))}</div></div>
      <span class="price">${usd2(+x.price)}</span>${n ? `<button type="button" class="danger" data-cart="${esc(x.id)}|-1" aria-label="${tr('Remove one', '하나 빼기')}">−</button>` : ''}<button type="button" data-cart="${esc(x.id)}|1" ${n >= 5 ? 'disabled' : ''}>${tr('Add', '담기')}</button></div>`; }).join('');
  body.innerHTML = html;
}
// the panels and their buttons (renderPanel, the panel's click handler), and what you can do at a place (placeActions)
function moneyPanel(h, sub, body) { if (panelKind === 'atm') atmPanel(h, sub, body, panelArg); else orderPanel(h, sub, body); }
function moneyClick(b) {
  if (b.dataset.shopOnline) { openPanel('order'); return; }
  if (panelKind !== 'atm' && panelKind !== 'order') return;
  const y = panel.querySelector('.panel-body').scrollTop, n = panel.querySelector('.panel-note'), keep = () => { const t = n.textContent, k = n.className; renderPanel(); n.textContent = t; n.className = k; panel.querySelector('.panel-body').scrollTop = y; };
  if (b.dataset.atm) { withdraw(panelArg, +b.dataset.atm, false); keep(); }
  if (b.dataset.atmOk) { withdraw(panelArg, +b.dataset.atmOk, true); keep(); }
  if (b.dataset.atmNo) { atmAsk = null; note(tr('Cancelled. No fee was charged.', '취소했어요. 수수료는 나가지 않았어요.')); keep(); }
  if (b.dataset.atmIn) { deposit(panelArg); keep(); }
  if (b.dataset.cashback) { cashBack(+b.dataset.cashback); keep(); }
  if (b.dataset.cart) { const [id, d] = b.dataset.cart.split('|'), c = theCart(); c[id] = clamp((c[id] || 0) + +d, 0, 5); keep(); }
  if (b.dataset.order) { placeOrder(); keep(); }
}
function moneyActions(pid) {
  const out = [];
  if (!G) return out;
  if (placeKind(pid) === 'atm') { const fee = atmFee(pid); out.push({ key: 'atm:' + pid, label: fee ? tr(`Use the ATM · ${usd2(fee)} fee`, `ATM 이용 · 수수료 ${usd2(fee)}`) : tr('Use the ATM · no fee', 'ATM 이용 · 수수료 없음'), run: () => { atmAsk = null; openPanel('atm', pid); } }); }
  if (pid === CASH_BACK_AT && CASH_BACK.length && !closedNow(zoneOfPlace(pid)) && cashBackOk()) out.push({ key: 'cashback:' + pid, label: tr('Ask for cash back', '캐시백 받기'), run: () => openPanel('atm', pid) });
  const ready = pid === PICKUP_AT ? pickupReady().length : 0;
  if (ready) out.push({ key: 'pickup:' + pid + ready, label: tr(`Pick up a package (${CARRIER[0]})`, `소포 찾기 (${CARRIER[1]})`), run: () => pickup() });
  return out;
}
// for tests: SO.debug.cash, atm(placeId, amount, accept), deposit(), cashBack(n), order([catalog ids]), orders, deliver(), pickup()
const moneyDebug = {
  get cash() { return G ? wallet() : null; }, set cash(v) { if (G) G.cash = cents(+v || 0); },
  atm(pid, n, accept) { return G ? withdraw(pid || Array.from(ATM_OWN)[0], n, !!accept) : null; },
  deposit(pid, n) { return G ? deposit(pid || Array.from(ATM_OWN)[0], n) : null; }, cashBack(n) { return G ? cashBack(n) : null; },
  get catalog() { return CATALOG.map(c => c.id); },
  order(ids) { if (!G) return null; cart = { of: G, n: {} }; listOf(ids).forEach(id => { if (CAT[id]) cart.n[id] = (cart.n[id] || 0) + 1; }); const o = placeOrder(); return o ? { id: o.id, total: o.total, due: o.due, at: hhmm(o.at), sig: o.sig } : null; },
  get orders() { return G ? JSON.parse(JSON.stringify(orders())) : []; },
  // jump the clock to the next time the driver comes (a minute after) and let it happen; returns the orders' states
  deliver() { const o = G && orders().filter(x => x.state === 'placed').sort((a, b) => (a.due * 1440 + a.at) - (b.due * 1440 + b.at))[0]; if (o) { G.day = o.due; G.minute = o.at + 1; goalTimer = 0; ordersTick(); } return G ? orders().map(x => x.state) : []; },
  ordersTick() { ordersTick(); return orders().map(x => x.state); }, pickup() { return pickup(); }
};
debugPart(moneyDebug);          // cash, ATMs, online orders

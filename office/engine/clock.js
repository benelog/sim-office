/* Sim Office — which conversations are open, the clock, money and energy. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- the clock, money and energy
const openEpisodes = () => episodes().filter(isOpen).sort(epOrder);
function epOrder(a, b) { return ((a.sort || 0) - (b.sort || 0)) || (hm(a.time_from, 0) - hm(b.time_from, 0)) || String(a.id).localeCompare(b.id); }
const hasTag = (ep, tag) => listOf(ep.tags).includes(tag);          // tags: comma-separated (phone, errand, sick, review, video …)
const isPhone = (ep) => hasTag(ep, 'phone');
const isErrand = (ep) => hasTag(ep, 'errand');          // the pharmacy and the clinic: not missions, open when they apply (careDue)
const dayIn = (ep) => (ep.day_from == null || G.day >= ep.day_from) && (ep.day_to == null || G.day <= ep.day_to);
// a place id can be in more than one zone (office_door is outside and inside): the zone's own places come first
function placeIn(pid, z) { const sp = zoneSpec(z).places[pid]; return (!!sp && !sp.guessed) || zoneOfPlace(pid) === z; }
function isOpen(ep) {
  if (!G) return false;
  if (ROUTINE_OF[ep.id]) { if (!routineDue(ep)) return false; }          // a meeting that comes back: today's, not done yet
  else if (isErrand(ep)) { if (!careDue(ep)) return false; }
  else if (G.done[ep.id] || (ep.day_from != null && G.day < ep.day_from) || (ep.day_to != null && G.day > ep.day_to)) return false;
  if (G.minute < hm(ep.time_from, 0) || G.minute > hm(ep.time_to, 1439) + 0.999) return false;
  if (firedOut(ep.place, ep)) return false;          // let go: the work conversations are over
  return listOf(ep.requires).every(id => G.done[id]);
}
function laterToday(ep) {        // not open yet, but will be later today
  if (!G || isOpen(ep) || firedOut(ep.place, ep) || isErrand(ep)) return false;
  if (ROUTINE_OF[ep.id]) { if (!routineDue(ep)) return false; }
  else if (G.done[ep.id] || (ep.day_from != null && G.day < ep.day_from) || (ep.day_to != null && G.day > ep.day_to)) return false;
  return hm(ep.time_from, 0) > G.minute && listOf(ep.requires).every(id => G.done[id]);
}
function tickClock(dt) {
  const mins = dt * (+CFG.minutes_per_second || 1) * debugSpeed;
  advanceMinutes(mins);
}
function advanceMinutes(mins) {
  if (!G) return;
  G.minute += mins;
  G.energy = clamp(G.energy + (+CFG.energy_per_hour || -6) * mins / 60, 0, E_MAX);
  if (G.minute >= DAY_END && state === 'play') { toast("It's late. You fall asleep.", '늦었어요. 잠이 듭니다.'); goToSleep(true); }
}
function pay(amount, text, type, extra) {
  const before = G.money;
  G.money = Math.round((G.money + amount) * 100) / 100;
  logEvent(type || (amount >= 0 ? 'income' : 'spend'), text, amount, extra);
  if (amount < 0) bankWatch(before);
}
// The bank: a payment that takes the account below zero costs an overdraft fee (config overdraft_fee, once a day),
// and falling below config low_balance brings an alert on the phone
function bankWatch(before) {
  const fee = +CFG.overdraft_fee || 0, low = +CFG.low_balance || 0;
  if (fee && G.money < 0 && G.feeDay !== G.day) {
    G.feeDay = G.day;
    G.money = Math.round((G.money - fee) * 100) / 100;
    logEvent('fee', 'Overdraft fee', -fee);
    notify(CFG.bank_name, `Your checking account is overdrawn. A ${usd2(fee)} overdraft fee was charged. Available balance: ${usd2(G.money)}.`,
      `계좌 잔액이 마이너스가 되어 초과 인출 수수료 ${usd2(fee)}가 부과되었습니다. 잔액: ${usd2(G.money)}. (overdrawn: 잔액보다 많이 빠져나간)`);
  } else if (low && before >= low && G.money < low && G.money >= 0) {
    notify(CFG.bank_name, `Low balance alert: checking ···4821 is at ${usd2(G.money)}.`, `잔액 부족 알림: 계좌 잔액이 ${usd2(G.money)}입니다.`);
  }
}

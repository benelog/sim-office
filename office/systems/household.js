/* Sim Office — laundry and the kitchen (what keeps how long, cooking). One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- laundry: clean clothes, detergent, the laundry room
// G.clean is how many clean outfits are in your closet (config closet_outfits, 5 at the start). Every morning you
// put one on; with none left you wear yesterday's clothes and people notice (smalltalk you:laundry). Do a load at
// the door of your home: renters use the building's laundry room (items laundry_load, open config laundry_hours),
// a house has its own washer and dryer. Either way it takes a detergent pod (items detergent) and 90 minutes.
const CLOSET = +CFG.closet_outfits || 7, LAUNDRY_MIN = 90;
const cleanClothes = () => G ? (G.clean == null ? 5 : G.clean) : 0;
const ownWasher = () => /mortgage/i.test(hero().housing_name || '');
const laundryHours = () => String(CFG.laundry_hours || '07:00-22:00').split('-').map(x => hm(x, 0));
function laundryLabel() {
  const n = cleanClothes();
  return tr(`Do laundry · ${n} clean outfit${n === 1 ? '' : 's'} left`, `빨래하기 · 깨끗한 옷 ${n}벌 남음`);
}
function doLaundry() {
  if (!G) return false;
  const [open, close] = laundryHours(), load = ITEMS.laundry_load, fee = ownWasher() ? 0 : +(load && load.price) || 0;
  const where = ownWasher() ? 'your washer and dryer' : 'the laundry room';
  if (cleanClothes() >= CLOSET) { toast('All your clothes are clean. No laundry today.', '옷이 다 깨끗해요. 오늘은 빨래할 게 없어요.'); return false; }
  if (!ownWasher() && (G.minute < open || G.minute + LAUNDRY_MIN > close)) {
    toast(`The laundry room is open ${clock(open)} to ${clock(close)}. Start your last load by ${clock(close - LAUNDRY_MIN)}.`, `세탁실은 ${hhmm(open)}~${hhmm(close)}에 열어요. 마지막 빨래는 ${hhmm(close - LAUNDRY_MIN)}까지 시작하세요.`, 'bad', 5);
    return false;
  }
  if (ownWasher() && (G.minute < 6 * 60 || G.minute + LAUNDRY_MIN > DAY_END - 30)) {
    toast(`It's too late to start a load tonight: the washer and the dryer take an hour and a half. Start by ${clock(DAY_END - 30 - LAUNDRY_MIN)}.`, `오늘 밤 빨래를 시작하기엔 너무 늦었어요. 세탁과 건조에 1시간 반이 걸려요. ${hhmm(DAY_END - 30 - LAUNDRY_MIN)}까지 시작하세요.`, 'bad', 5);
    return false;
  }
  if (!portions('detergent')) { toast("You're out of laundry detergent. Fairview Market sells detergent pods.", '세탁 세제가 없어요. 페어뷰 마켓에서 세제 캡슐을 팝니다.', 'bad', 5); return false; }
  if (fee && G.money < fee) { toast(`You need ${usd2(fee)} for the washer and the dryer.`, `세탁기와 건조기에 ${usd2(fee)}가 필요해요.`, 'bad'); return false; }
  useOne('detergent');
  if (fee) pay(-fee, 'Laundry room (wash and dry)', 'spend', { ko: '세탁실 (세탁·건조)' });
  advanceMinutes(LAUNDRY_MIN);
  G.clean = CLOSET;
  logEvent('laundry', 'Did the laundry', 0);
  if (player) play(player, 'interact-right', { once: true });
  saveGame();
  toast(`You washed, dried and folded a load in ${where}${fee ? ` (${usd2(fee)})` : ''}. ${CLOSET} clean outfits. ${portions('detergent')} detergent pod${portions('detergent') === 1 ? '' : 's'} left.`,
    `${ownWasher() ? '집 세탁기와 건조기로' : '세탁실에서'} 빨래를 빨고 말려서 갰어요${fee ? ` (${usd2(fee)})` : ''}. 깨끗한 옷 ${CLOSET}벌, 세제 ${portions('detergent')}회분 남음.`, 'good', 5);
  return true;
}
function wakeDressed() {            // in the morning: put on a clean outfit (what the morning card says about it)
  const n = cleanClothes();
  if (n > 0) { G.clean = n - 1; G.dirtyDay = null; }
  else G.dirtyDay = G.day;
  if (G.dirtyDay === G.day) return tr(`👕 You're out of clean clothes, so you put on yesterday's. <b>Do laundry</b> at home${portions('detergent') ? '' : ' (buy detergent at Fairview Market first)'}.`, `👕 깨끗한 옷이 없어서 어제 옷을 입었어요. 집에서 <b>빨래</b>하세요${portions('detergent') ? '' : '(먼저 페어뷰 마켓에서 세제를 사세요)'}.`);
  if (G.clean <= 1) return tr(`👕 ${G.clean ? 'Only one clean outfit left after today' : "You're wearing your last clean outfit"}. Time to do laundry${portions('detergent') ? '' : ': buy detergent at Fairview Market first'}.`, `👕 ${G.clean ? '오늘 입은 옷 말고 깨끗한 옷이 한 벌 남았어요' : '마지막 깨끗한 옷을 입었어요'}. 빨래할 때예요${portions('detergent') ? '' : '. 먼저 페어뷰 마켓에서 세제를 사세요'}.`);
  return null;
}

// ---------------------------------------------------------------- the kitchen: what keeps how long, and cooking
// What is in your bag is kept package by package: G.lots [{ id, day (bought), left (portions) }]; G.inventory
// (id → packages) follows it. A grocery keeps items.shelf_days days after the day it was bought (best by that
// day; NULL keeps), then it has gone bad and can only be thrown out. A package has items.uses portions, and
// items.cook_only things are not eaten as they are. Recipes (recipes table) take one portion of each
// ingredient, the oldest package first, and are cooked in the kitchen at home.
const RECIPES = rows('recipes').slice().sort((a, b) => (a.sort || 0) - (b.sort || 0));
const usesOf = (i) => Math.max(1, +(i && i.uses) || 1);
const bestBy = (lot) => { const i = ITEMS[lot.id], n = i && i.shelf_days != null ? +i.shelf_days : 0; return n > 0 ? lot.day + n : null; };
const gone = (lot) => { const d = bestBy(lot); return d != null && G.day > d; };
const shortName = (id) => String((ITEMS[id] || { name: pretty(id) }).name).replace(/\s*\(.*\)\s*/, '').replace(/,.*$/, '');
const itemName = (id) => KO() && ITEMS[id] && ITEMS[id].name_ko ? String(ITEMS[id].name_ko).replace(/\s*\(.*\)\s*/, '') : shortName(id).toLowerCase();
function lots() {
  if (!Array.isArray(G.lots)) {          // a save from before: everything was bought today
    G.lots = [];
    Object.keys(G.inventory || {}).forEach(id => { for (let k = 0; k < G.inventory[id]; k++) G.lots.push({ id, day: G.day, left: usesOf(ITEMS[id]) }); });
  }
  return G.lots;
}
function syncBag() {
  G.lots = lots().filter(l => l.left > 0);
  G.inventory = {};
  G.lots.forEach(l => { G.inventory[l.id] = (G.inventory[l.id] || 0) + 1; });
}
function addLot(id) { lots().push({ id, day: G.day, left: usesOf(ITEMS[id]) }); syncBag(); }
const goodLots = (id) => lots().filter(l => l.id === id && l.left > 0 && !gone(l)).sort((a, b) => a.day - b.day);
const portions = (id) => goodLots(id).reduce((n, l) => n + l.left, 0);
function useOne(id) { const l = goodLots(id)[0]; if (!l) return false; l.left--; syncBag(); return true; }
const needs = (r) => listOf(r.ingredients);
const canCook = (r) => needs(r).every(id => portions(id) > 0);
const atHome = () => !!G && zoneId === hero().home_zone;
function cook(id) {
  const r = RECIPES.find(x => x.id === id);
  if (!r || !G) return false;
  if (!atHome()) { if (!panel.hidden) note(tr('You can only cook in your kitchen at home.', '요리는 집 부엌에서만 할 수 있어요.'), true); return false; }
  if (!canCook(r)) { if (!panel.hidden) note(tr(`You are missing: ${needs(r).filter(x => !portions(x)).map(shortName).join(', ').toLowerCase()}.`, `없는 재료: ${needs(r).filter(x => !portions(x)).map(itemName).join(', ')}.`), true); return false; }
  if (homeCook(r)) return false;          // a broken stove (home life)
  needs(r).forEach(useOne);
  G.energy = clamp(G.energy + (+r.energy || 0), 0, E_MAX);
  G.cooked = (G.cooked || 0) + 1;
  advanceMinutes(+r.minutes || 15);
  logEvent('cook', r.name, 0, { id: r.id });
  if (player) play(player, 'interact-right', { once: true });
  saveGame();
  if (!panel.hidden) { renderPanel(); note(tr(`You made ${r.name.toLowerCase()} in ${r.minutes} minutes. Energy +${r.energy}.`, `${r.minutes}분 걸려 ${josa(loc(r), '을', '를')} 만들었어요. 에너지 +${r.energy}.`)); }
  return true;
}
function toss(n) {
  const l = lots()[n];
  if (!l) return;
  const name = shortName(l.id);
  l.left = 0;
  syncBag();
  logEvent('toss', name, 0);
  saveGame();
  renderPanel();
  note(tr(`You threw out the ${name.toLowerCase()}.`, `${josa(itemName(l.id), '을', '를')} 버렸어요.`));
}
function kitchenNews() {          // in the morning: what went bad overnight, what should be used today
  const bad = lots().filter(l => bestBy(l) === G.day - 1), last = lots().filter(l => bestBy(l) === G.day);
  const names = (l) => Array.from(new Set(l.map(x => itemName(x.id)))).join(', '), out = [];
  if (bad.length) out.push(tr(`🗑️ Gone bad in your kitchen: <b>${esc(names(bad))}</b>. Throw it out (Inventory).`, `🗑️ 부엌에서 상한 것: <b>${esc(names(bad))}</b>. 가방에서 버리세요.`));
  if (last.length) out.push(tr(`Use it or lose it: the <b>${esc(names(last))}</b> ${last.length > 1 || /s$/.test(names(last)) ? 'are' : 'is'} best by today.`, `오늘까지 먹어야 해요: <b>${esc(names(last))}</b>.`));
  return out;
}
on('morning', () => kitchenNews(), 600);          // what spoiled overnight, what is good until today
on('morning', () => ITEMS.detergent ? wakeDressed() : null, 610);          // clean clothes running out
// SO.debug: laundry and the kitchen: the packages in the bag, the recipes that can be made now, cook(recipeId), eat(itemId), toss(n)
debugPart({
  get clean() { return cleanClothes(); }, set clean(v) { if (G) G.clean = +v; }, laundry() { return doLaundry(); },
  // the kitchen: the packages in the bag, the recipes that can be made now, cook(recipeId), eat(itemId), toss(n)
  get lots() { return G ? lots().map(l => Object.assign({ bestBy: bestBy(l), gone: gone(l) }, l)) : []; }, get recipes() { return G ? RECIPES.filter(canCook).map(r => r.id) : []; },
  cook(id) { return cook(id); }, eat(id) { return eat(id); }, toss(n) { toss(n); return G.lots.length; }
});

/* Sim Office — home life: the trash, things that break, loud neighbors (home_events table). One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- home life: the trash, things that break, loud neighbors (home_events table)
// The trash: cooking, eating and throwing food out fill the kitchen can (config trash_bags: bags for each cook, eat
// and toss in the log since you last took it out, and a little every day). Renters (Jun, Priya) take the bags to the
// building's bins any time. Derek's house has a cart (config trash_cart_bags) that the truck empties on pickup day
// (config trash_pickup_day, a day late in a week with one of config trash_holidays on or before it) only if he
// wheeled it to the curb the night before; when it is full the rest wait by the garage. With config
// trash_smell_bags or more left at home it smells: fruit flies and a worse night every morning, a word from the
// landlord, the management or the HOA on the second morning, a charge (config trash_fee) from the fourth (once a week).
// Things break (after the missions; config repair_chance on a morning, not within repair_gap_days of the last one):
// a row of kind repair says where it is reported (a kind of place at home) and what it does until the visit (cook: no
// recipe on the stove or in the oven, dishes: cooking takes longer, cold: cold nights, sleep: a dripping faucet,
// shower: no hot water, fridge: config repair_fridge_items spoil). Report it there: renters text the landlord or file
// a request, and the visit comes on a weekday 9 to noon with a notice of entry the evening before, free; Derek calls
// a repair service, which comes on his next day off (not a holiday) 8 to 10 AM, and he pays (cost). The answers are
// the rows of kind text and email (n_<what>_<hero>).
// Late at night a neighbor may be loud (config noise_chance, noise_gap_days; rows of kind noise): a card with four
// things to do, each with how the night goes (energy the next morning) and points.
// G.home = { trash (bags at 'at'), at (day * 1440 + minute), cart, curb (the pickup day the cart is out for), over
// (bags left beside a full cart), smell (smelly mornings in a row), fee (day), missed, fix { id, day, asked, visit,
// order } | null, fixes [{ id, day, asked, visit }], noise [{ day, id, pick, energy, n }] }.
const HOME_EV = rows('home_events').slice().sort((a, b) => (a.sort || 0) - (b.sort || 0));
const REPAIRS = HOME_EV.filter(r => r.kind === 'repair'), NOISES = HOME_EV.filter(r => r.kind === 'noise' && Array.isArray(r.choices));
const TRASH_W = { cook: perHero(CFG.trash_bags, 'cook', 0.15), eat: perHero(CFG.trash_bags, 'eat', 0.05), toss: perHero(CFG.trash_bags, 'toss', 0.1) };
const TRASH_DAY = perHero(CFG.trash_bags, 'day', 0.15), SMELL_BAGS = +CFG.trash_smell_bags || 3, CART_BAGS = +CFG.trash_cart_bags || 4;
const PICKUP = Math.max(0, WEEKDAYS.indexOf(CFG.trash_pickup_day || 'Thursday')), TRASH_OFF = new Set(listOf(CFG.trash_holidays));
const FRIDGE = new Set(listOf(CFG.repair_fridge_items || 'milk,bacon,deli_turkey,ground_beef,ice_cream,frozen_pizza'));          // what a warm fridge spoils
const stamp = () => G.day * 1440 + Math.floor(G.minute);
const homeState = () => G.home || (G.home = { trash: 0, at: stamp(), cart: 0, curb: null, over: 0, smell: 0, fee: null, missed: 0, fix: null, fixes: [], noise: [] });          // a save from before starts with an empty can
const bagsOf = (x) => Math.ceil(Math.round(x * 100) / 100);
function trashNow() {          // bags at home now: what was there at the last count, and what the log adds since
  const H = homeState();
  return H.trash + G.log.reduce((n, l) => n + (TRASH_W[l.type] && l.day * 1440 + l.minute > H.at ? TRASH_W[l.type] : 0), 0);
}
function pickupDay(d) {          // the pickup of the week of day d (Derek's street): a day late after a holiday
  const mon = Math.floor((d - 1) / 7) * 7 + 1;
  for (let x = mon; x <= mon + PICKUP; x++) if (TRASH_OFF.has(isoOf(x))) return mon + PICKUP + 1;
  return mon + PICKUP;
}
const nextPickup = () => pickupDay(G.day) > G.day ? pickupDay(G.day) : pickupDay(G.day + 7);
const curbTonight = () => ownWasher() && pickupDay(G.day + 1) === G.day + 1 && G.minute >= 17 * 60;
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
// the engine's messages (rows of kind text and email): n_<what>_<hero> or n_<what>; {name} {thing} {when} {cost} {fee}
// {order} {day} filled in each language; sent now, or later (G.later, like the answer to a reply)
const homeNote = (what) => HOME_EV.find(r => r.id === `n_${what}_${G.hero}`) || HOME_EV.find(r => r.id === `n_${what}`) || null;
function sendNote(what, vars, at) {
  const r = homeNote(what);
  if (!r) return null;
  const v = Object.assign({ name: [G.name, hero().name_ko || G.name] }, vars), fill = (s, i) => String(s || '').replace(/\{(\w+)\}/g, (m, k) => v[k] ? v[k][i] : m);
  const msg = { sender: r.sender, kind: r.kind === 'email' ? 'email' : 'text', body: fill(r.body, 0), body_ko: fill(r.body_ko, 1) };
  if (at != null && at > stamp()) (G.later = G.later || []).push(Object.assign({ at }, msg));
  else notify(msg.sender, msg.body, msg.body_ko, msg.kind);
  return r;
}
// at the door of your home: take the trash out (Derek: into the cart), or wheel the cart to the curb the night before pickup
function homeActions(pid, kind) {
  if (!G || !atHome()) return [];
  const out = [], H = homeState(), n = bagsOf(trashNow());
  if (kind === 'door') {
    if (curbTonight() && H.curb !== G.day + 1 && (n || H.cart)) out.push({ key: 'curb:' + pid, label: tr('Wheel the trash cart to the curb · pickup tomorrow', '수거통을 길가에 내놓기 · 내일 수거'), run: () => toCurb() });
    else if (n) out.push({ key: 'trash:' + pid + n, label: ownWasher() ? tr(`Take out the trash · ${plural(n, 'bag')} · cart ${H.cart}/${CART_BAGS}`, `쓰레기 내놓기 · ${n}봉지 · 수거통 ${H.cart}/${CART_BAGS}`)
      : tr(`Take out the trash · ${plural(n, 'bag')}`, `쓰레기 버리기 · ${n}봉지`), run: () => takeOut() });
  }
  const f = H.fix, r = f && repairRow(f.id);
  if (r && kind === r.place && !fixedNow()) {
    if (f.asked == null) out.push({ key: 'fix:' + pid, label: reportLabel(r), run: () => reportFix() });
    else { const t = visitShort(f.visit); out.push({ key: 'fixing:' + pid, label: tr(`${pretty(r.title)}: repair ${t[0]}`, `${r.title_ko || r.title} 수리: ${t[1]}`), run: () => toast(`The ${r.title} gets fixed ${t[0]}.`, `${r.title_ko || r.title} 수리는 ${t[1]}.`, null, 3.5) }); }
  }
  return out;
}
function takeOut(quiet) {
  const H = homeState(), n = bagsOf(trashNow());
  if (!n) { if (!quiet) toast('The trash can is nearly empty.', '쓰레기통이 거의 비어 있어요.'); return 0; }
  if (!ownWasher()) {
    H.trash = 0; H.at = stamp();
    advanceMinutes(5);
    logEvent('trash', 'Took out the trash', 0, { ko: '쓰레기 버림' });
    saveGame();
    toast(`You take ${plural(n, 'bag')} down to the building's bins: trash in the dumpster; cans, bottles and flattened boxes in the blue recycling bin.`,
      `${n}봉지를 건물 수거함에 버렸어요. 일반 쓰레기는 대형 수거함에, 캔·병·납작하게 접은 상자는 파란 재활용 통에 넣었어요.`, 'good', 4.5);
    return n;
  }
  const put = Math.min(n, CART_BAGS - H.cart), left = n - put, when = nextPickup();
  if (!put) { if (!quiet) toast(`The cart is full until pickup on ${weekday(when)}. The bags wait by the garage.`, `수거통이 ${WEEKDAYS_KO[(when - 1) % 7]} 수거 때까지 꽉 찼어요. 봉지는 차고 옆에 둬요.`, 'bad', 4); return 0; }
  H.cart += put; H.trash = left; H.over = left; H.at = stamp();
  advanceMinutes(3);
  logEvent('trash', 'Took out the trash', 0, { ko: '쓰레기 내놓음' });
  saveGame();
  if (!quiet) toast(`You put ${plural(put, 'bag')} in the cart by the garage (${H.cart}/${CART_BAGS}).${left ? ` It's full: ${left} more wait beside it.` : ''} Pickup is ${weekday(when)}: wheel the cart to the curb the night before.`,
    `차고 옆 수거통에 ${put}봉지를 넣었어요(${H.cart}/${CART_BAGS}).${left ? ` 꽉 차서 ${left}봉지는 옆에 뒀어요.` : ''} 수거는 ${WEEKDAYS_KO[(when - 1) % 7]}이에요. 전날 밤에 수거통을 길가에 내놓으세요.`, left ? 'bad' : 'good', 5);
  return put;
}
function toCurb() {
  const H = homeState();
  if (!curbTonight()) return false;
  if (bagsOf(trashNow())) takeOut(true);
  H.curb = G.day + 1;
  advanceMinutes(3);
  saveGame();
  toast(`You wheel the cart down the driveway to the curb (${plural(H.cart, 'bag')}). The truck comes tomorrow at 7.`, `수거통을 진입로 끝 길가로 끌어다 놓았어요(${H.cart}봉지). 수거 트럭은 내일 아침 7시에 와요.`, 'good', 4);
  return true;
}
// things that break: report them where they are; the visit fixes them
const repairRow = (id) => REPAIRS.find(r => r.id === id) || null;
const visitHours = () => ownWasher() ? [8 * 60, 10 * 60] : [9 * 60, 12 * 60];
function visitText(d) {
  const [a, b] = visitHours();
  return [`${dateLong(d)}, between ${clock(a)} and ${b === 720 ? 'noon' : clock(b)}`, `${dateKo(d)} ${clockKo(a)}~${b === 720 ? '정오' : clockKo(b)}`];
}
function visitShort(d) { const [a, b] = visitHours(); return [`${dateShort(d)}, ${clock(a)}–${b === 720 ? 'noon' : clock(b)}`, `${dateKoShort(d)} ${clockKo(a)}~${b === 720 ? '정오' : clockKo(b)}`]; }
function fixedNow() { const f = G && G.home && G.home.fix; return !!f && f.visit != null && (G.day > f.visit || (G.day === f.visit && G.minute >= visitHours()[1])); }
function broken(effect) { const f = G && G.home && G.home.fix, r = f && repairRow(f.id); return !!r && (!effect || r.effect === effect) && !fixedNow(); }
const PLACE_OF = { eat: 'home_kitchen', sleep: 'home_bed', desk: 'home_desk' };
const fixPlace = (r) => { const p = hero()[PLACE_OF[r.place]]; return p ? loc(place(p)) : pretty(r.place); };
function reportVia() { const r = homeNote('fix_ask'), s = r ? r.sender : null; return NPCS[s] ? 'text' : ownWasher() ? 'call' : 'portal'; }
function reportLabel(r) {
  const via = reportVia(), s = (homeNote('fix_ask') || {}).sender, who = NPCS[s] ? firstName(NPCS[s]) : s, th = [r.title, r.title_ko || r.title];
  return via === 'text' ? tr(`Text ${who} about the ${th[0]}`, `${who}에게 문자: ${th[1]} 고장`) : via === 'call' ? tr(`Call a repair service: ${th[0]}`, `수리 업체에 전화: ${th[1]}`) : tr(`Request a repair: ${th[0]}`, `수리 요청: ${th[1]}`);
}
function startFix(r) {
  const H = homeState();
  H.fix = { id: r.id, day: G.day, asked: null, visit: null, order: 4000 + Math.floor(Math.random() * 6000) };
  return tr(`🔧 ${esc(r.body)} Report it at home (${esc(fixPlace(r))}).`, `🔧 ${esc(r.body_ko || r.body)} 집에서 수리를 요청하세요(${esc(fixPlace(r))}).`);
}
const pickRepair = () => pickFresh(REPAIRS.filter(mine), homeState().fixes);
function reportFix() {
  const H = homeState(), f = H.fix, r = f && repairRow(f.id);
  if (!r || f.asked != null || fixedNow()) return false;
  let d = G.day + Math.max(1, +r.days || 1);
  if (ownWasher()) while (!myOff(d) || dayOff(d)) d++;          // a homeowner is home for it: the next day off (not a holiday)
  else while (isWeekend(d) || dayOff(d)) d++;          // the landlord's people come on weekdays
  f.asked = G.day; f.visit = d;
  const [, end] = visitHours(), t = visitText(d), cost = usd(+r.cost || 0);
  const vars = { thing: [r.title, r.title_ko || r.title], when: t, cost: [cost, cost], order: [String(f.order), String(f.order)] };
  sendNote('fix_ask', vars, stamp() + (ownWasher() ? 2 : 12));
  sendNote('fix_entry', vars, Math.max(stamp() + 30, (d - 1) * 1440 + 18 * 60));          // the notice of entry (Derek: a reminder) the evening before
  sendNote('fix_done', vars, d * 1440 + end);
  const via = reportVia(), s = (homeNote('fix_ask') || {}).sender, who = NPCS[s] ? firstName(NPCS[s]) : s;
  advanceMinutes(via === 'call' ? 10 : 5);
  logEvent('repair', `Asked for a repair: ${r.title}`, 0, { ko: `수리 요청: ${r.title_ko || r.title}` });
  saveGame();
  if (via === 'text') toast(`You text ${who} about the ${r.title}.`, `${who}에게 ${r.title_ko || r.title} 고장을 문자로 알렸어요.`, 'good', 3.5);
  else if (via === 'call') toast(`You call ${who}: a technician comes ${t[0]}, about ${cost}.`, `${who}에 전화했어요. 기사가 ${t[1]}에 와요. 비용은 약 ${cost}.`, 'good', 5);
  else toast(`You file a maintenance request for the ${r.title} in the resident portal.`, `입주민 포털에 ${r.title_ko || r.title} 수리 요청을 넣었어요.`, 'good', 3.5);
  return true;
}
function homeCook(recipe) {          // from cook(): a broken stove stops what needs it, a broken dishwasher makes it longer
  if (broken('cook') && /stove|oven/.test(recipe.tool || '')) {
    const r = repairRow(G.home.fix.id), m = tr(`The ${r.title} doesn't work. Make something that needs no stove or oven until it's fixed.`, `${r.title_ko || r.title} 고장이에요. 고칠 때까지는 불을 쓰지 않는 걸 만드세요.`);
    if (!panel.hidden) note(m, true); else toast(m, null, 'bad');
    return true;
  }
  if (broken('dishes')) { advanceMinutes(15); toast('No dishwasher: you do the dishes by hand (15 minutes).', '식기세척기가 고장이라 설거지를 손으로 했어요(15분).', null, 3); }
  return false;
}
// a loud neighbor late at night: before you fall asleep at home (from trySleep), a card with what you could do
const pickNoise = () => pickFresh(NOISES.filter(mine), homeState().noise);
function noiseNight(pid) {
  if (!G || !freePlay() || !atHome() || state !== 'play') return false;
  const H = homeState(), last = H.noise.length ? H.noise[H.noise.length - 1].day : -99, wk = (G.day - 1) % 7;
  if (G.day - last < (+CFG.noise_gap_days || 5) || Math.random() >= perHero(CFG.noise_chance, wk === 4 || wk === 5 ? 'weekend' : 'weekday', 0.1)) return false;
  const r = pickNoise();
  if (!r) return false;
  showNoise(r, pid);
  return true;
}
// the card (engine/choices.js), then sleep: what you do costs energy tomorrow
function showNoise(r, pid) {
  showChoices({ row: r, kind: 'noise', kicker: `🔊 ${tr('Late at night', '늦은 밤')}`, ok: tr('Go to sleep', '잠자기'),
    pick(c, i, n) {
      const e = Math.min(0, Math.round(+c.energy || 0)), H = homeState();
      H.noise = H.noise.concat({ day: G.day, id: r.id, pick: i, energy: e, n }).slice(-60);
      return ` · ${e ? tr(`energy tomorrow −${-e}`, `내일 에너지 −${-e}`) : tr('a good night\'s sleep', '푹 잠')}`;
    },
    done() { goToSleep(false, pid); } });
}
// the next morning (from goToSleep; day is the day that ended): the trash and the truck, the smell, what is broken,
// the night's noise. Returns lines for the morning card.
function homeMorning(day, away) {
  if (!G || away) return [];
  const H = homeState(), out = [];
  H.trash = trashNow() + TRASH_DAY; H.at = stamp();
  if (ownWasher()) {
    if (pickupDay(G.day) === G.day) {
      if (H.curb === G.day && H.cart) out.push(tr(`🚛 The garbage truck came at 7 and emptied your cart. You roll it back up the driveway.`, '🚛 아침 7시에 쓰레기 수거 트럭이 와서 수거통을 비웠어요. 수거통을 진입로 안으로 다시 끌어다 놓아요.'));
      else if (H.cart) { H.missed = (H.missed || 0) + 1; out.push(tr(`🚛 The garbage truck came by at 7, but your cart wasn't at the curb. It stays full (${H.cart}/${CART_BAGS}) until next week.`, `🚛 아침 7시에 수거 트럭이 지나갔는데 수거통이 길가에 없었어요. 다음 주까지 꽉 찬 채(${H.cart}/${CART_BAGS})예요.`)); }
      if (H.curb === G.day) H.cart = 0;
      H.curb = null;
    }
    if (H.curb != null && H.curb < G.day) H.curb = null;
    if (pickupDay(G.day + 1) === G.day + 1 && (H.cart || bagsOf(H.trash))) out.push(tr(`🗑️ Trash pickup is tomorrow: wheel the cart to the curb tonight, after 5 PM.`, '🗑️ 내일이 쓰레기 수거일이에요. 오늘 저녁 5시 이후에 수거통을 길가에 내놓으세요.'));
    const mon = Math.floor((G.day - 1) / 7) * 7 + 1;
    if (G.day === mon && pickupDay(G.day) !== mon + PICKUP) sendNote('trash_holiday', { day: [weekday(pickupDay(G.day)), WEEKDAYS_KO[(pickupDay(G.day) - 1) % 7]] });
  }
  const bags = bagsOf(H.trash);
  if (bags >= SMELL_BAGS) {
    H.smell = (H.smell || 0) + 1;
    G.energy -= 5;
    out.push(tr(`🪰 ${bags} bags of trash ${ownWasher() && H.over ? 'by the garage' : 'at home'}: it smells, and the fruit flies kept you up (energy −5). Take it out.`, `🪰 ${ownWasher() && H.over ? '차고 옆에' : '집에'} 쓰레기 ${bags}봉지가 쌓여 있어요. 냄새가 나고 날파리 때문에 잠을 설쳤어요(에너지 −5). 내다 버리세요.`));
    const others = !ownWasher() || H.over > 0;          // a house: only the bags outside bother the neighbors
    if (others && H.smell === 2) sendNote('trash_smell');
    if (others && H.smell >= 4 && (H.fee == null || G.day - H.fee >= 7)) {
      const fee = perHero(CFG.trash_fee, G.hero, 35), r = sendNote('trash_fee', { fee: [usd2(fee), usd2(fee)] });
      if (fee && r) { H.fee = G.day; pay(-fee, r.title, 'bill', { ko: r.title_ko }); out.push(tr(`💸 ${esc(r.title)}: <b>${usd2(fee)}</b> for the trash.`, `💸 ${esc(r.title_ko || r.title)}: 쓰레기 때문에 <b>${usd2(fee)}</b>.`)); }
    }
  } else H.smell = 0;
  const f = H.fix, r = f && repairRow(f.id);
  if (r && f.day < G.day && (f.visit == null || f.visit >= G.day)) {          // it was broken last night
    const low = weatherOf(day).low_f, cold = low < 50 ? 15 : 10, th = [esc(pretty(r.title)), esc(r.title_ko || r.title)];
    const fx = { sleep: [5, 'kept you up: energy −5.', '때문에 잠을 설쳤어요: 에너지 −5.'], cold: [cold, `is still broken: a cold night (${low}°F), energy −${cold}.`, `고장이라 추운 밤을 보냈어요(${toC(low)}°C): 에너지 −${cold}.`],
      shower: [8, 'is out: a cold shower, energy −8.', '고장이라 찬물로 샤워했어요: 에너지 −8.'], cook: [0, 'is still broken: nothing on the stove or in the oven.', '고장이라 가스레인지와 오븐을 쓸 수 없어요.'],
      dishes: [0, 'is still broken: dishes by hand, cooking takes 15 minutes longer.', '고장이라 설거지를 손으로 해서 요리가 15분 더 걸려요.'], fridge: [0, 'is warm: the food in it spoils.', '안이 미지근해서 음식이 상해요.'] }[r.effect] || [0, 'is still broken.', '아직 고장이에요.'];
    G.energy -= fx[0];
    if (r.effect === 'fridge') lots().forEach(l => { const i = ITEMS[l.id], n = i && i.shelf_days != null ? +i.shelf_days : 0; if (n > 0 && FRIDGE.has(l.id) && l.left > 0 && !gone(l)) l.day = G.day - n - 1; });          // kitchenNews lists them
    const t = f.visit != null ? visitText(f.visit) : null;
    out.push(tr(`🔧 The ${th[0].toLowerCase()} ${fx[1]} ${t ? (f.visit === G.day ? `The repair is today, ${t[0].replace(/^[^,]+, [^,]+, /, '')}.` : `The repair is ${t[0]}.`) : `Report it at home (${esc(fixPlace(r))}).`}`,
      `🔧 ${th[1]} ${fx[2]} ${t ? (f.visit === G.day ? `오늘 수리하러 와요(${t[1].replace(/^.*요일 /, '')}).` : `수리는 ${t[1]}.`) : `집에서 수리를 요청하세요(${esc(fixPlace(r))}).`}`));
    if (f.visit === G.day && ownWasher() && +r.cost) {          // the repair service is paid on the spot
      pay(-(+r.cost), `Home repair: ${r.title}`, 'bill', { ko: `집 수리: ${r.title_ko || r.title}` });
      out.push(tr(`💳 The repair comes to <b>${usd2(+r.cost)}</b> for the service call, parts and labor, paid by card.`, `💳 수리비는 출장비·부품·공임을 합쳐 <b>${usd2(+r.cost)}</b>, 카드로 냈어요.`));
    }
  }
  if (f && f.visit != null && f.visit < G.day) { H.fixes = H.fixes.concat({ id: f.id, day: f.day, asked: f.asked, visit: f.visit }).slice(-40); H.fix = null; }
  const lastFix = H.fixes.length ? H.fixes[H.fixes.length - 1].visit : MISSION_DAYS;
  if (!H.fix && freePlay() && G.day - lastFix >= (+CFG.repair_gap_days || 7) && Math.random() < (+CFG.repair_chance || 0.08)) { const nr = pickRepair(); if (nr) out.push(startFix(nr)); }
  const nz = H.noise.length && H.noise[H.noise.length - 1];
  if (nz && nz.day === day && nz.energy) { G.energy += nz.energy; out.push(tr(`😴 The neighbors' noise cost you sleep: energy −${-nz.energy}.`, `😴 이웃의 소음 때문에 잠이 모자라요: 에너지 −${-nz.energy}.`)); }
  G.energy = clamp(G.energy, 10, E_MAX);
  return out;
}
const homeDebug = {          // SO.debug.home
  get state() { return G ? Object.assign(JSON.parse(JSON.stringify(homeState())), { bags: +trashNow().toFixed(2), pickup: pickupDay(G.day), next: nextPickup(), broken: broken(), fixed: fixedNow() }) : null; },
  trash(n) { const H = homeState(); H.trash = +n; H.at = stamp(); return +trashNow().toFixed(2); },
  takeOut: () => takeOut(), curb: () => toCurb(), pickupDay: (d) => pickupDay(d == null ? G.day : d), report: () => reportFix(),
  breakNow(id) { const r = id ? repairRow(id) : pickRepair(); return r ? startFix(r) : null; },          // something breaks now (the morning card's line)
  noise(id) { const r = id ? NOISES.find(x => x.id === id) : pickNoise(); if (r) showNoise(r, hero().home_bed); return r ? r.id : null; },          // a loud night (then sleep)
  pick(i) { const now = choiceOf('noise'); return now ? pickChoice(i == null ? bestChoice(now.row) : +i) : false; }, get noiseNow() { const now = choiceOf('noise'); return now ? { id: now.row.id, picked: now.picked } : null; },
  morning: (day) => homeMorning(day == null ? G.day - 1 : day)
};
on('morning', (n) => homeMorning(n.day, n.away), 250);          // the trash and the truck, what is broken, last night's noise
// SO.debug
debugPart({
  home: homeDebug,          // home life: state, trash(n), takeOut(), curb(), breakNow(id), report(), noise(id), pick(i), morning()
});

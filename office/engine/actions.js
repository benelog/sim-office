/* Sim Office — what you can do here (the action buttons). One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- what you can do here (the action buttons)
let actions = [], actSig = '', actTimer = 0;
const busItem = (i) => i.kind === 'fare' && /bus/.test(i.id) && !/shuttle|airport/.test(i.id);
function itemsAt(pid) {
  return rows('items').filter(i => i.place === pid && /^(grocery|meal|drink|gear)$/.test(i.kind));
}
const faresAt = (pid) => rows('items').filter(i => i.place === pid && i.kind === 'fare' && !busItem(i));
function isBusStop(pid) { return pid === 'bus_stop' || rows('items').some(i => i.place === pid && busItem(i)); }
function placeActions(pid) {
  const out = [], kind = placeKind(pid), pl = place(pid);
  if (kind === 'sleep') out.push({ key: 'sleep:' + pid, label: tr('Sleep', '잠자기'), run: () => trySleep(pid) });
  if (kind === 'eat' && atHome() && RECIPES.length) out.push({ key: 'cook:' + pid, label: tr('Cook a meal', '요리하기'), run: () => openPanel('cook') });
  if (kind === 'eat') out.push({ key: 'eat:' + pid, label: tr('Eat something', '뭔가 먹기'), run: () => openPanel('inventory') });
  const shut = G && (closedNow(pid) ? pid : closedNow(zoneOfPlace(pid)) ? zoneOfPlace(pid) : null);
  if (itemsAt(pid).length && shut) out.push({ key: 'shut:' + pid, label: shutAllDay(shut) ? tr('Closed today', '오늘 휴무') : tr(`Closed · open ${hoursText(shut)}`, `영업 종료 · ${hoursText(shut)}`), run: () => toast(`${pl.name} is closed. Hours: ${hoursText(shut)}`, `${loc(pl)} 영업 종료. 영업시간 ${hoursText(shut)}`, 'bad') });
  else if (itemsAt(pid).length) out.push({ key: 'shop:' + pid, label: shopLabel(pid, pl), run: () => openPanel('shop', pid) });
  if (isBusStop(pid) && zoneId === 'city') {
    const bb = G ? busAt(G.minute) : null, nb = G ? bb && bb.board : 0, bn = bb && busEvery() ? busNext(bb, G.minute) : null;
    if (nb == null) out.push({ key: 'bus:' + pid, label: tr('No more buses tonight', '오늘 버스 끊김'), run: () => toast(`The last bus left at ${clock(hm(CFG.bus_last, 1350))}. You'll have to walk.`, `막차가 ${clockKo(hm(CFG.bus_last, 1350))}에 떠났어요. 걸어가야 해요.`, 'bad', 4) });
    else out.push({ key: 'bus:' + pid, label: tr(`Take the bus · ${bn ? bn[0] + ' · ' : ''}${usd2(busFare())}`, `버스 타기 · ${bn ? bn[1] + ' · ' : ''}${usd2(busFare())}`), run: () => openPanel('bus', pid) });
  }
  if ((kind === 'work' || pid === hero().desk) && !fired()) out.push({ key: 'work:' + pid, label: tr('Work for an hour', '한 시간 일하기'), run: () => workHour() });
  if (G) hybridActions(pid).forEach(a => out.push(a));          // hybrid work: the desk at home on a remote day (log in, work, log off)
  if (MAIL.length && G && zoneId === 'city' && pid === hero().home_door) { const n = newMail().length; out.push({ key: 'mail:' + pid + n, label: tr('Check the mailbox', '우편함 보기') + (n ? ` (${n})` : ''), run: () => openPanel('mailbox') }); }
  if (TV.length && G && kind === 'tv' && atHome()) out.push({ key: 'tv:' + pid, label: tr('Watch TV', 'TV 보기'), run: () => sitForTv(pid) });
  if (RADIO.length && G && kind === 'desk' && atHome()) out.push({ key: 'radio:' + pid, label: tr(`Turn on the radio (${STATION})`, `라디오 켜기 (${STATION})`), run: () => openPanel('radio') });
  if (G && zoneId === hero().home_zone && kind === 'door' && ITEMS.detergent) out.push({ key: 'laundry:' + pid + cleanClothes(), label: laundryLabel(), run: () => doLaundry() });
  if (window.SO_JOG && G && zoneId === hero().home_zone && kind === 'door') out.push({ key: 'jog:' + pid, label: tr('Go for a jog', '조깅하기'), run: () => startJog(true) });
  homeActions(pid, kind).forEach(a => out.push(a));          // take out the trash, report what is broken (home life)
  if (kind === 'seat') out.push({ key: 'sit:' + pid, label: tr('Sit down', '앉기'), run: () => { player.sit = true; play(player, 'sit'); } });
  lunchActions(pid).forEach(x => out.push(x));          // lunch with coworkers (the office kitchen, the diner booth)
  careActions(pid).forEach(a => out.push(a));          // a flu shot at the pharmacy
  moneyActions(pid).forEach(a => out.push(a));          // an ATM, cash back, a package at the carrier's counter
  return out;
}
function shopLabel(pid, pl) {
  const its = itemsAt(pid);
  if (its.every(i => i.kind === 'fare')) return tr('Pay: ' + its[0].name, '내기: ' + loc(its[0]));
  if (its.length === 1) return tr('Buy: ' + its[0].name, '사기: ' + loc(its[0]));
  if (/coffee|cafe/.test(pid)) return tr('Order a drink', '음료 주문');
  if (/diner|restaurant|kitchen/.test(pid)) return tr('Order food', '음식 주문');
  if (/market|shelves/.test(pid)) return tr('Shop for groceries', '장보기');
  return tr('Buy at ' + pl.name, loc(pl) + '에서 사기');
}
function computeActions() {
  if (state !== 'play' || busy || !player || !Z) return [];
  const list = [];
  const open = openEpisodes();
  Object.values(npcActors).forEach(a => {
    const d = Math.hypot(a.pos.x - player.pos.x, a.pos.z - player.pos.z);
    if (d > TALK_R || a.leaving) return;
    const ep = open.find(e => e.npc === a.id && !isPhone(e));
    if (ep) list.push({ d: d - 1, key: 'ep:' + ep.id, label: tr(`Talk to ${a.name.split(' ')[0]}: ${ep.title}`, `${firstName(npcRow(a.id))}에게 말 걸기: ${loc(ep, 'title')}`) + (+ep.reward < 0 ? ` (${usd2(-ep.reward)})` : ''), run: () => beginEpisode(ep, a) });
    else list.push({ d: d + 0.3, key: 'chat:' + a.id, label: tr(`Chat with ${a.name.split(' ')[0]}`, `${josa(firstName(npcRow(a.id)), '과', '와')} 잡담`), run: () => chatter(a) });
  });
  Object.keys(Z.places).forEach(pid => {
    const pl = Z.places[pid];
    if (!pl || !pl.at) return;
    const d = Math.hypot(pl.at[0] - player.pos.x, pl.at[1] - player.pos.z);
    if (d > PLACE_R) return;
    open.filter(e => isPhone(e) && e.place === pid).forEach(ep => list.push({ d: d - 1, key: 'ep:' + ep.id, run: () => { if (joinCall(ep)) beginEpisode(ep, null); },
      label: ep.remote ? tr(`Join the video call: ${ep.title}`, `화상 회의 참여: ${loc(ep, 'title')}`) : tr(`Phone ${npcRow(ep.npc).name.split(' ')[0]}: ${ep.title}`, `${firstName(npcRow(ep.npc))}에게 전화: ${loc(ep, 'title')}`) }));
    placeActions(pid).forEach((a, i) => list.push(Object.assign({ d: d + 0.1 + i * 0.01 }, a)));
  });
  list.sort((a, b) => a.d - b.d);
  return list.slice(0, 3);
}
function renderActions() {
  const sig = actions.map(a => a.key + a.label).join('|');
  if (sig === actSig) return;
  actSig = sig;
  const box = $('acts');
  box.innerHTML = '';
  actions.forEach((a, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    if (i) b.className = 'alt';
    b.innerHTML = esc(a.label) + (i ? '' : ' <kbd>E</kbd>');
    b.addEventListener('click', () => { if (state === 'play') a.run(); });
    box.appendChild(b);
  });
}
function chatter(a) {
  a.chatAt = elapsed;
  if (friendChat(a)) return;          // a coworker: closer, and a Friend may have a coffee or an umbrella for you
  const c = remark(a);
  say(a, personal(c.line), c.line_ko && personalKo(c.line_ko), 3.5);
  speak(personal(c.line), voiceOf(a.row));
  play(a, 'interact-right', { once: true });
}
const busFare = () => { const f = rows('items').find(i => busItem(i) && !/pass/.test(i.id)); return f ? +f.price : +CFG.bus_fare || 2.5; };
const hasPass = () => G && G.pass === G.day;

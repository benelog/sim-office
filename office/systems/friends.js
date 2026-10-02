/* Sim Office — coworkers: how close you are (friends table). One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- coworkers: how close you are (friends table)
// Each coworker (config friend_people, without the hero you play) is 0-100 close to you: G.friends.people { id: { pts,
// last (the last day you spent time together), chat, coffee (days) } }, starting from config friend_start for people
// who already know each other. It grows when you chat (friend_chat, the first time a day), have lunch together in the
// office kitchen (friend_lunch, everyone at the table), finish a conversation with them (up to friend_talk, by its
// points; friend_meeting for everybody else in it, and in a meeting), answer their texts (friend_reply, by the tone)
// and handle well what they sent to your desk (friend_task); after friend_fade_days apart it fades by friend_fade a
// day. config friend_levels: Friendly, Friend, Close friend. What it brings (friends table, by kind; lines of a kind in
// turn): from Friendly, a tip on a desk task card (tip); from Friend, a coffee on a morning chat at work (coffee, once
// a week each), a spare umbrella on a rainy day when you have none (umbrella, given back at the end of your next day
// at work), a text on weekends (text), and after the missions an invitation to lunch at the diner that really
// happens (invite at friend_invite_time: they wait in the booth from 15 minutes before friend_lunch_time for an hour,
// and you Have lunch with them there and pay for friend_diner_item; noshow when you do not come); a Close friend
// gives your update at a team meeting you missed (cover, once every friend_cover_days: no points lost, no note from
// the manager). What they talk about at lunch: lunch, diner. At the review, a point for each coworker who is a Friend
// or closer (friend_review at most). G.friends also keeps { lunch (day), invite { day, npc, done, noshow }, inviteDay,
// asked, lend { npc, day }, cover, textWeek, lastText, said { '<kind>@<id>': n }, news [[en, ko]] }.
const FRIEND_ROWS = rows('friends').slice().sort((a, b) => (a.sort || 0) - (b.sort || 0));
const FRIEND_PEOPLE = listOf(CFG.friend_people == null ? 'maya,derek,priya,jun,sam,linda,tom' : CFG.friend_people);
const FRIEND_AT = (listOf(CFG.friend_levels).length === 3 ? listOf(CFG.friend_levels) : [20, 45, 70]).map(Number);
const BOND = [['Coworker', '아는 사이'], ['Friendly', '친한 동료'], ['Friend', '친구'], ['Close friend', '절친']];
const fcfg = (k, d) => { const v = CFG['friend_' + k]; return v == null || v === '' || isNaN(+v) ? d : +v; };
const REPLY_PTS = { good: 3, ok: 1, poor: -2 };
listOf(CFG.friend_reply).forEach(x => { const [k, v] = x.split(':'); if (k && v != null && !isNaN(+v)) REPLY_PTS[k] = +v; });
const LUNCH_AT = hm(CFG.friend_lunch_time, 750), LUNCH_FROM = 11.5 * 60, LUNCH_TO = 14.5 * 60;
const enFirst = (id) => String((NPCS[id] || { name: pretty(id) }).name).split(' ')[0];
const koFirst = (id) => String((NPCS[id] || {}).name_ko || enFirst(id)).split(' ')[0];
const namesEn = (ids) => { const n = ids.map(enFirst); return n.length > 1 ? n.slice(0, -1).join(', ') + ' and ' + n[n.length - 1] : n[0] || ''; };
const namesKo = (ids, a, b) => { const n = ids.map(koFirst); return n.slice(0, -1).concat(josa(n[n.length - 1] || '', a, b)).join('·'); };
const fill = (s, v) => String(s == null ? '' : s).replace(/\{(\w+)\}/g, (m, k) => v[k] != null ? v[k] : m);
function isPal(id) { return !!G && !!id && id !== G.hero && FRIEND_PEOPLE.includes(id) && !!NPCS[id]; }
function pals() { return FRIEND_PEOPLE.filter(isPal); }
function friends() { const F = G.friends || (G.friends = {}); F.people = F.people || {}; return F; }
function bond(id) {
  const P = friends().people;
  if (!P[id]) {          // the first time: friend_start ('jun/derek:10'), or strangers
    const s = listOf(CFG.friend_start).map(x => /^(\w+)\/(\w+):(\d+)$/.exec(x)).find(m => m && m[1] === G.hero && m[2] === id);
    P[id] = { pts: s ? +s[3] : 0, last: 0 };
  }
  return P[id];
}
const closeness = (id) => isPal(id) ? bond(id).pts : 0;
const bondLevel = (pts) => FRIEND_AT.filter(n => pts >= n).length;
const levelOf = (id) => bondLevel(closeness(id));
function befriend(id, n) {          // closer (or not): a toast when it reaches a new level
  if (!isPal(id) || !n || fired()) return 0;
  const b = bond(id), was = bondLevel(b.pts);
  b.pts = clamp(Math.round((b.pts + n) * 10) / 10, 0, 100);
  if (n > 0) b.last = G.day;
  const now = bondLevel(b.pts);
  if (now > was && !hush) toast(`🤝 You and ${enFirst(id)} are closer now: ${BOND[now][0]}.`, `🤝 ${namesKo([id], '과', '와')} 더 가까워졌어요: ${BOND[now][1]}.`, null, 4);
  return n;
}
const friendLines = (id, kind) => FRIEND_ROWS.filter(r => r.npc === id && r.kind === kind && forHero(r.hero || 'all', G.hero) && closeness(id) >= (+r.need || 0));
function friendLine(id, kind) {
  const list = friendLines(id, kind), F = friends(), k = kind + '@' + id;
  if (!list.length) return null;
  F.said = F.said || {};
  const r = list[(F.said[k] || 0) % list.length];
  F.said[k] = (F.said[k] || 0) + 1;
  return r;
}
// Chat with someone (chatter): closer, once a day; a Friend may have something for you. True when they said it.
function friendChat(a) {
  if (!isPal(a.id) || fired()) return false;
  const b = bond(a.id), F = friends();
  if (b.chat !== G.day) { b.chat = G.day; befriend(a.id, fcfg('chat', 2)); }
  let r = null, done = null;
  if (levelOf(a.id) >= 2 && weatherOf(G.day).kind === 'rain' && ITEMS.umbrella && !G.inventory.umbrella && !F.lend && (r = friendLine(a.id, 'umbrella'))) {
    lots().push({ id: 'umbrella', day: G.day, left: 1, lent: a.id });
    syncBag();
    F.lend = { npc: a.id, day: G.day };
    done = [`☂️ ${enFirst(a.id)} lent you an umbrella. You'll give it back at work.`, `☂️ ${namesKo([a.id], '이', '가')} 우산을 빌려줬어요. 회사에서 돌려주면 돼요.`];
  } else if (levelOf(a.id) >= 2 && zoneId === 'office' && !myOff(G.day) && G.minute < 11 * 60 && G.day - (b.coffee || -99) >= 7 && (r = friendLine(a.id, 'coffee'))) {
    const e = fcfg('coffee_energy', 8);
    b.coffee = G.day;
    G.energy = clamp(G.energy + e, 0, E_MAX);
    done = [`☕ ${enFirst(a.id)} brought you a coffee. Energy +${e}.`, `☕ ${namesKo([a.id], '이', '가')} 커피를 사다 줬어요. 에너지 +${e}.`];
  }
  if (!r) return false;
  say(a, r.line, r.line_ko, 4);
  speak(r.line, voiceOf(a.row));
  play(a, 'interact-right', { once: true });
  toast(done[0], done[1], null, 4.5);
  saveGame();
  return true;
}
// Lunch together (placeActions): in the office kitchen with whoever of them is there at lunchtime, or in the booth at
// the diner with the one who invited you today (you pay for config friend_diner_item, with tax and the tip)
function lunchActions(pid) {
  if (!G || fired() || (pid !== 'office_kitchen' && pid !== 'diner_table') || G.minute < LUNCH_FROM || G.minute > LUNCH_TO || friends().lunch === G.day) return [];
  const diner = pid === 'diner_table', inv = friends().invite, it = diner ? ITEMS[CFG.friend_diner_item || 'diner_club'] : null;
  const ids = Object.values(npcActors).filter(a => !a.leaving && !a.walk && a.place === pid && isPal(a.id) && (!diner || (inv && inv.day === G.day && inv.npc === a.id && !inv.done))).map(a => a.id);
  if (!ids.length || (diner && !it)) return [];
  const cost = it ? ' · ' + usd2(billFor(it).total) : '';
  return [{ key: 'lunch:' + pid + ids.join(','), label: tr(`Have lunch with ${namesEn(ids)}${cost}`, `${namesKo(ids, '과', '와')} 점심 먹기${cost}`), run: () => haveLunch(pid, ids) }];
}
function haveLunch(pid, ids) {
  const F = friends(), it = pid === 'diner_table' ? ITEMS[CFG.friend_diner_item || 'diner_club'] : null;
  let bill = null;
  if (it) {
    bill = billFor(it);
    if (G.money < bill.total) { toast(`You can't afford lunch here (${receipt(bill)}).`, `여기서 점심을 사 먹을 돈이 부족해요 (${receipt(bill)}).`, 'bad', 3.5); return false; }
    pay(-bill.total, it.name, 'spend', Object.assign({ ko: it.name_ko }, bill.tax || bill.tip ? { tax: bill.tax, tip: bill.tip } : null));
    F.invite.done = true;
  }
  F.lunch = G.day;
  const energy = it ? +it.energy || 0 : fcfg('lunch_energy', 10), before = ids.map(closeness);
  G.energy = clamp(G.energy + energy, 0, E_MAX);
  ids.forEach(id => befriend(id, it ? fcfg('diner', 10) : fcfg('lunch', 6)));
  advanceMinutes(it ? 45 : 30);
  const said = ids.slice(0, 2).map(id => ({ id, r: friendLine(id, it ? 'diner' : 'lunch') })).filter(x => x.r);
  logEvent('lunch', `Lunch with ${namesEn(ids)}`, 0, { ko: `${namesKo(ids, '과', '와')} 점심` });
  saveGame();
  if (player) { player.sit = true; play(player, 'sit'); }
  const intro = it ? tr(`You share a booth by the window and order the ${esc(String(it.name).toLowerCase())} (${receipt(bill)}).`, `창가 부스에 함께 앉아 ${esc(josa(it.name_ko || it.name, '을', '를'))} 시켰어요 (${receipt(bill)}).`)
    : tr('You sit down together in the kitchen with something from the snack shelf.', '탕비실 간식 선반에서 먹을 걸 챙겨 함께 앉았어요.');
  showCard({ kicker: tr('Lunch', '점심'), title: tr(`Lunch with ${namesEn(ids)}`, `${namesKo(ids, '과', '와')} 점심`),
    body: `<p>${intro}</p>${said.map(x => `<p class="quote"><b>${esc(firstName(NPCS[x.id]))}:</b> “${esc(shown(x.r.line, x.r.line_ko))}”</p>`).join('')}
      <p class="score-line">${ids.map((id, k) => `🤝 ${esc(firstName(NPCS[id]))} · ${esc(tr(BOND[levelOf(id)][0], BOND[levelOf(id)][1]))} ${Math.round(closeness(id))} (${closeness(id) - before[k] >= 0 ? '+' : '−'}${Math.abs(Math.round((closeness(id) - before[k]) * 10) / 10)})`).join(' · ')}</p>
      <p class="score-line">${tr('Energy', '에너지')} +${energy} · ${tr('now', '지금')} ${clk(G.minute)}</p>`,
    ok: tr('Back to it', '돌아가기'), state: 'card' }, () => { goalTimer = 0; });
  if (said[0]) speak(said[0].r.line, voiceOf(NPCS[said[0].id]));
  return true;
}
// where the one who invited you is at lunchtime (npcPlaceNow): the booth at the diner, until you have eaten together
function lunchPlace(n) {
  const inv = G && G.friends && G.friends.invite;
  return inv && inv.day === G.day && inv.npc === n.id && !inv.done && !inv.noshow && G.minute >= LUNCH_AT - 15 && G.minute < LUNCH_AT + 60 ? 'diner_table' : null;
}
// a working day after the missions, at friend_invite_time: a Friend at work with nothing on at lunchtime may text you
// (force: the debug API, anyone of them, any day you work)
function inviteLunch(id, force) {
  const F = friends(), d = G.day;
  if (fired() || myOff(d) || (F.invite && F.invite.day === d)) return null;
  const busy = (p) => routinesOn(d).some(x => hm(x.r.time, 0) < LUNCH_AT + 75 && hm(x.ep.time_to, 1439) > LUNCH_AT - 30 && listOf(x.r.people).concat(SPEAKERS[x.ep.id] || [], [x.ep.npc]).includes(p))
    || episodes().some(e => !ROUTINE_OF[e.id] && dayIn(e) && !G.done[e.id] && (e.npc === p || (SPEAKERS[e.id] || []).includes(p)) && hm(e.time_from, 0) < LUNCH_AT + 60 && hm(e.time_to, 1439) > LUNCH_AT - 15);
  const h = hoursOf('diner');
  if (!force && (d - (F.inviteDay || -99) < fcfg('invite_days', 5) || (h && (LUNCH_AT < h[0] || LUNCH_AT + 60 > h[1])))) return null;
  const can = (id ? [id] : pals()).filter(p => isPal(p) && (force || (levelOf(p) >= 2 && !busy(p) && scheduledPlace(NPCS[p]) && zoneOfPlace(scheduledPlace(NPCS[p])) === 'office')) && friendLines(p, 'invite').length);
  const who = anyOf(can);
  if (!who) return null;
  const r = friendLine(who, 'invite');
  F.invite = { day: d, npc: who };
  F.inviteDay = d;
  notify(who, fill(r.line, { time: clock(LUNCH_AT) }), fill(r.line_ko, { time: clockKo(LUNCH_AT) }), 'text');
  npcSig = '';
  return who;
}
function noShow(inv) {          // you did not come: a little less close, and a text that says it's fine
  inv.noshow = true;
  befriend(inv.npc, -fcfg('noshow', 4));
  const r = friendLine(inv.npc, 'noshow');
  if (r) notify(inv.npc, r.line, r.line_ko, 'text');
}
function weekendText() {          // the closest Friend (not the one who texted last time) says hello
  const F = friends(), list = pals().filter(p => levelOf(p) >= 2 && friendLines(p, 'text').length).sort((a, b) => closeness(b) - closeness(a));
  const p = list.find(x => x !== F.lastText) || list[0];
  if (!p) return null;
  const r = friendLine(p, 'text');
  F.lastText = p;
  notify(p, r.line, r.line_ko, 'text');
  return p;
}
// every half second while you walk about (frame): the invitation, a lunch you missed, the weekend text
function friendTick() {
  if (!G || fired() || state !== 'play' || !FRIEND_ROWS.length) return;
  const F = friends(), d = G.day, m = G.minute, inv = F.invite, week = Math.floor((d - 1) / 7);
  if (inv && inv.day === d && !inv.done && !inv.noshow && m >= LUNCH_AT + 60) noShow(inv);
  if (freePlay() && F.asked !== d && m >= hm(CFG.friend_invite_time, 645) && m < LUNCH_AT - 30) { F.asked = d; if (Math.random() < fcfg('invite_chance', 0.4)) inviteLunch(null, false); }
  if (isWeekend(d) && F.textWeek !== week && m >= 11 * 60 && m < 20 * 60) { F.textWeek = week; weekendText(); }
}
// what they say after a conversation (completeEpisode), an answer to their text (replyTo), a task they sent (showTask)
function friendsAfterTalk(ep, got, best) {
  if (!G) return;
  const rt = ROUTINE_OF[ep.id], also = new Set((SPEAKERS[ep.id] || []).concat(rt ? listOf(rt.people).filter(id => NPCS[id] && scheduledPlace(NPCS[id])) : []));
  if (isPal(ep.npc)) befriend(ep.npc, best ? Math.round(fcfg('talk', 4) * got / best) : 1);
  also.delete(ep.npc);
  also.forEach(id => befriend(id, fcfg('meeting', 1)));
}
function friendReply(m, r) { befriend(m.sender, REPLY_PTS[r.tone] || 0); }
function friendTask(t, n) { if (t.sender) befriend(t.sender, Math.sign(n) * fcfg('task', 2)); }
function friendTip(t) {          // on a desk task card: what a Friendly coworker once told you about it
  const r = FRIEND_ROWS.find(x => x.kind === 'tip' && x.task === t.id && isPal(x.npc) && forHero(x.hero || 'all', G.hero) && closeness(x.npc) >= (+x.need || 0));
  return r ? `<p class="tip">💡 <b>${esc(firstName(NPCS[r.npc]))}:</b> “${esc(shown(r.line, r.line_ko))}”</p>` : '';
}
// a meeting you missed on a day you came in (missedRoutines): a Close friend who was there gave your update
function coveredFor(x, d) {
  const F = friends();
  if (fired() || (F.cover && d - F.cover < fcfg('cover_days', 14))) return false;
  const there = listOf(x.r.people).concat(SPEAKERS[x.ep.id] || [], [x.ep.npc]);
  const id = pals().filter(p => there.includes(p) && levelOf(p) >= 3 && friendLines(p, 'cover').length).sort((a, b) => closeness(b) - closeness(a))[0];
  if (!id) return false;
  const r = friendLine(id, 'cover'), what = [meetingName(x.r), x.r.title_ko || x.r.title];
  F.cover = d;
  notify(id, fill(r.line, { meeting: what[0] }), fill(r.line_ko, { meeting: what[1] }), 'text');
  (F.news = F.news || []).push([`🤝 ${esc(enFirst(id))} gave your update at ${esc(what[0])}, so missing it didn't count against you.`, `🤝 ${esc(namesKo([id], '이', '가'))} ${esc(what[1])}에서 내 진행 상황을 대신 말해 줘서 빠진 게 문제 되지 않았어요.`]);
  return true;
}
// the night (goToSleep, after the day changed): a lunch you missed, the umbrella back, time apart; lines for the morning card
function friendsNight(day) {
  const F = friends(), out = [];
  if (fired() || !FRIEND_ROWS.length) return out;
  if (F.invite && F.invite.day === day && !F.invite.done && !F.invite.noshow) noShow(F.invite);
  if (F.lend && F.lend.day < day && /^(on|late|noon)$/.test(work().record[day] || '')) {
    G.lots = lots().filter(l => !l.lent);
    syncBag();
    out.push(tr(`☂️ You gave ${esc(enFirst(F.lend.npc))}'s umbrella back.`, `☂️ ${esc(koFirst(F.lend.npc))}에게 우산을 돌려줬어요.`));
    F.lend = null;
  }
  pals().forEach(id => {
    const b = bond(id), was = bondLevel(b.pts);
    if (b.pts <= 0 || day - (b.last || 0) < fcfg('fade_days', 5)) return;
    b.pts = Math.max(0, Math.round((b.pts - fcfg('fade', 1)) * 10) / 10);
    if (bondLevel(b.pts) < was) out.push(tr(`💤 You and ${esc(enFirst(id))} haven't spent time together lately: ${BOND[bondLevel(b.pts)][0]} now.`, `💤 요즘 ${esc(namesKo([id], '과', '와'))} 함께한 시간이 없어서 조금 멀어졌어요. 이제 ${BOND[bondLevel(b.pts)][1]}예요.`));
  });
  (F.news || []).forEach(n => out.push(tr(n[0], n[1])));
  F.news = [];
  return out;
}
// the review (reviewScore): a point for each coworker who is a Friend or closer
function teamPart() {
  const max = fcfg('review', 3), n = G ? pals().filter(id => levelOf(id) >= 2).length : 0;
  return max > 0 && n ? [{ en: 'Teammates', ko: '동료 관계', got: Math.min(max, n), max: 0, note: [`close with ${n} coworker${n === 1 ? '' : 's'}`, `가까운 동료 ${n}명`] }] : [];
}
// Work record: the people at work, closest first
function friendsPanel() {
  const list = G && FRIEND_ROWS.length ? pals().sort((a, b) => closeness(b) - closeness(a)) : [];
  if (!list.length || fired()) return '';
  const F = friends(), inv = F.invite && F.invite.day === G.day && !F.invite.done && !F.invite.noshow && G.minute < LUNCH_AT + 60 ? F.invite : null, fade = fcfg('fade_days', 5);
  return `<h3>${tr('People', '동료')}</h3>${inv ? `<p class="fine">🍽️ ${tr(`${esc(enFirst(inv.npc))} invited you to lunch: the ${esc(zoneName('diner')[0])}, ${clock(LUNCH_AT)}.`, `${esc(namesKo([inv.npc], '이', '가'))} 점심을 같이 먹자고 했어요: ${esc(zoneName('diner')[1] || zoneName('diner')[0])}, ${clockKo(LUNCH_AT)}.`)}</p>` : ''}
    <p class="fine">${tr(`Chat, have lunch together in the office kitchen around noon, and do well in conversations and meetings with them. ${BOND[1][0]} (${FRIEND_AT[0]}): tips for what comes up at your desk. ${BOND[2][0]} (${FRIEND_AT[1]}): a coffee now and then, a spare umbrella in the rain, texts on weekends, lunch at the diner. ${BOND[3][0]} (${FRIEND_AT[2]}): gives your update at a meeting you missed. After ${fade} days apart it fades.`,
      `잡담하고, 점심때 탕비실에서 같이 밥을 먹고, 함께하는 대화와 회의를 잘 해내면 가까워져요. ${BOND[1][1]}(${FRIEND_AT[0]}): 업무 중에 생긴 일에 대한 조언. ${BOND[2][1]}(${FRIEND_AT[1]}): 가끔 커피, 비 오는 날 여분 우산, 주말 문자, 다이너 점심 초대. ${BOND[3][1]}(${FRIEND_AT[2]}): 빠진 회의에서 내 진행 상황을 대신 말해 줌. ${fade}일 넘게 함께하지 않으면 조금씩 멀어져요.`)}</p>
    ${list.map(id => { const b = bond(id), lv = bondLevel(b.pts), n = NPCS[id];
      return `<div class="row bond"><div class="main"><div class="t">${esc(fullName(n))} <span class="lvl lv${lv}">${esc(tr(BOND[lv][0], BOND[lv][1]))}</span></div><div class="s"><span class="meter"><i style="width:${clamp(b.pts, 0, 100)}%"></i></span> ${esc(loc(n, 'role'))}${b.last ? ' · ' + tr(`last together ${esc(dMonth(b.last))}`, `마지막으로 함께한 날 ${esc(dMonth(b.last))}`) : ''}</div></div><span class="price">${Math.round(b.pts)}</span></div>`; }).join('')}`;
}
function friendsView() { const o = {}; pals().forEach(id => { o[id] = { pts: closeness(id), level: BOND[levelOf(id)][0], last: bond(id).last || 0 }; }); return o; }
on('morning', (n) => friendsNight(n.day), 230);          // coworkers: a lunch you missed, an umbrella back, time apart
// SO.debug
debugPart({
  // coworkers: closeness ({ id: { pts, level, last } }), friend(id, pts) reads or sets one, invite(id) texts an
  // invitation to lunch now, chatWith(id) is Chat with someone here, lunch(pid) has lunch where they are, friendTick()
  get friends() { return G ? friendsView() : {}; }, friend(id, pts) { if (pts != null && isPal(id)) bond(id).pts = clamp(+pts, 0, 100); return closeness(id); },
  invite(id) { return G ? inviteLunch(id || null, true) : null; }, chatWith(id) { const a = npcActors[id]; if (!a) return null; chatter(a); return closeness(id); },
  lunch(pid) { const x = G ? lunchActions(pid || 'office_kitchen')[0] : null; return x ? x.run() : false; }, friendTick() { friendTick(); return G ? JSON.parse(JSON.stringify(friends())) : null; }
});

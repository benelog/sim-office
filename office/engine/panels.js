/* Sim Office — panels: shop, bus, inventory, conversations, calendar …. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- panels: shop, bus, inventory, conversations, calendar
const panel = $('panel');
let panelKind = null, panelArg = null, panelBack = 'play';
function openPanel(kind, arg) {
  toggleMenu(false);
  if (!G) return;
  if (state === 'talk' || state === 'sleep' || state === 'title') return;
  if (panelKind === 'tv' && kind !== 'tv' && !panel.hidden) tvOff();          // the phone or the map over the TV turns it off
  panelKind = kind; panelArg = arg;
  if (state !== 'shop' && state !== 'card') panelBack = state;
  state = kind === 'shop' || kind === 'bus' ? 'shop' : 'card';
  panel.hidden = false;
  panel.querySelector('.panel-note').textContent = '';
  panel.querySelector('.panel-note').className = 'panel-note';
  renderPanel();
}
function closePanel() {
  const wasTv = panelKind === 'tv';
  panel.hidden = true;
  panelKind = null;
  if (state === 'shop' || state === 'card') state = panelBack === 'talk' ? 'play' : (panelBack || 'play');
  goalTimer = 0;
  if (wasTv) tvOff();
}
panel.querySelector('.close').addEventListener('click', closePanel);
function note(text, bad) { const n = panel.querySelector('.panel-note'); n.textContent = text; n.className = 'panel-note' + (bad ? ' bad' : ''); }
function renderPanel() {
  const h = panel.querySelector('h2'), sub = panel.querySelector('.sub'), body = panel.querySelector('.panel-body');
  sub.textContent = tr('Balance ', '잔액 ') + usd2(G.money);
  panel.classList.toggle('wide', panelKind === 'tv');
  if (panelKind === 'shop') {
    h.textContent = loc(place(panelArg));
    body.innerHTML = itemsAt(panelArg).map(i => {
      const facts = KO() ? [i.energy ? `에너지 +${i.energy}` : '', /meal|drink/.test(i.kind) ? '바로 먹음' : i.kind === 'fare' ? '' : '가방에 넣음', i.kind === 'gear' && G.inventory[i.id] ? '이미 있음' : '',
        usesOf(i) > 1 ? `${usesOf(i)}${i.kind === 'gear' ? '회' : '회분'}` : '', +i.shelf_days > 0 ? `${+i.shelf_days}일 보관` : '', +i.cook_only ? '익혀 먹어야 함' : '', i.note_ko || i.note || '']
        : [i.energy ? `energy +${i.energy}` : '', /meal|drink/.test(i.kind) ? 'eat now' : i.kind === 'fare' ? '' : 'to your bag', i.kind === 'gear' && G.inventory[i.id] ? 'you have one' : '',
          usesOf(i) > 1 ? `${usesOf(i)} ${i.kind === 'gear' ? 'uses' : 'portions'}` : '', +i.shelf_days > 0 ? `keeps ${+i.shelf_days} days` : '', +i.cook_only ? 'needs cooking' : '', i.note || ''];
      return `<div class="row"><button type="button" class="play" data-say="${esc(i.name)}" aria-label="Say it">▶</button>
      <div class="main"><div class="t">${esc(loc(i))}</div><div class="s">${esc(facts.filter(Boolean).join(' · '))}</div></div>
      <span class="price">${onTheHouse(i) ? `<s>${usd2(+i.price)}</s> ${tr('Free', '무료')}` : +i.price ? usd2(+i.price) : tr('Free', '무료')}</span><button type="button" data-buy="${esc(i.id)}">${i.kind === 'fare' ? tr('Pay', '내기') : /meal|drink/.test(i.kind) && !+i.price ? tr('Take', '받기') : tr('Buy', '사기')}</button></div>`; }).join('') || `<p class="empty">${tr('Nothing for sale here.', '여기서 파는 게 없어요.')}</p>`;
    const list = itemsAt(panelArg);
    let top = '';
    if (tipAsked(panelArg)) top += `<div class="row tips"><div class="main"><div class="t">${tr('Add a tip?', '팁을 줄까요?')}</div><div class="s">${tableService(panelArg) ? tr('15 to 20% is usual when you are served at a table', '자리에서 서빙을 받으면 보통 15~20%') : tr('Up to you at a counter', '카운터에서는 선택')}</div></div>
      <div class="mode" role="group" aria-label="Tip">${TIPS.map(t => `<button type="button" data-tip="${t}" aria-pressed="${Math.abs(tipRate(panelArg) * 100 - t) < 0.01}">${t ? t + '%' : tr('No tip', '팁 없음')}</button>`).join('')}</div></div>`;
    top += cardShopRow();          // debit or credit card
    if (list.some(punchable)) { const n = punches(panelArg);
      top += `<div class="row punch"><div class="main"><div class="t">${tr('Punch card', '스탬프 카드')} <span class="dots">${'●'.repeat(Math.min(n, PUNCH_N - 1))}${'○'.repeat(Math.max(0, PUNCH_N - 1 - n))}</span></div><div class="s">${n >= PUNCH_N - 1 ? tr('Your next drink is on the house!', '다음 음료는 무료예요!') : tr(`Buy ${PUNCH_N - 1} drinks, get the next one free`, `음료 ${PUNCH_N - 1}잔을 사면 다음 한 잔은 무료`)}</div></div></div>`; }
    if (TAX && list.some(taxed)) top += `<p class="fine">${tr(`Prices do not include ${pct(TAX)} sales tax.${list.some(i => !taxed(i)) ? ' Groceries are not taxed.' : ''}`, `표시 가격에는 판매세 ${pct(TAX)}가 빠져 있어요.${list.some(i => !taxed(i)) ? ' 식료품은 면세예요.' : ''}`)}</p>`;
    else if (list.length && list.every(i => i.kind === 'grocery')) top += `<p class="fine">${tr(`No sales tax on groceries in ${esc(CFG.city)}.`, `${esc(CFG.city)}에서는 식료품에 판매세가 없어요.`)}</p>`;
    top += cashNote(panelArg, sub);
    body.innerHTML = top + body.innerHTML;
  } else if (panelKind === 'bus') {
    h.textContent = tr('Bus', '버스');
    const here = panelArg;
    const stops = Object.keys(Z.places).filter(pid => pid !== here && (DOORS['city:' + pid] || portalsOf(Z).some(p => Math.hypot(p.at[0] - Z.places[pid].at[0], p.at[1] - Z.places[pid].at[1]) < 3)));
    const pass = rows('items').find(i => busItem(i) && /pass/.test(i.id));
    const bb = busAt(G.minute), nb = bb && bb.board, bs = bb && busStatus(bb, G.minute), every = busEvery(), off = isWeekend(G.day) || dayOff(G.day);
    const times = every ? `<p class="fine">${tr(`${nb == null ? `No more buses tonight: the last one left at ${clock(hm(CFG.bus_last, 1350))}.` : bs[0]}
      Every ${every} minutes ${off ? (dayOff(G.day) ? 'today (holiday timetable)' : 'on weekends') : 'on weekdays'}, ${clock(hm(CFG.bus_first, 360))} – ${clock(hm(CFG.bus_last, 1350))}.`,
      `${nb == null ? `오늘 버스는 끊겼어요. 막차는 ${clockKo(hm(CFG.bus_last, 1350))}에 떠났어요.` : bs[1]}
      ${off ? (dayOff(G.day) ? '오늘은 공휴일 시간표로' : '주말에는') : '평일에는'} ${every}분마다, ${clockKo(hm(CFG.bus_first, 360))}~${clockKo(hm(CFG.bus_last, 1350))}.`)}</p>` : '';
    body.innerHTML = times + stops.map(pid => `<div class="row"><div class="main"><div class="t">${esc(loc(place(pid)))}</div><div class="s">${tr('about 15 minutes', '약 15분')}</div></div>
      <span class="price">${hasPass() ? tr('Pass', '정기권') : usd2(busFare())}</span><button type="button" data-ride="${esc(pid)}" ${nb == null ? 'disabled' : ''}>${tr('Ride', '타기')}</button></div>`).join('') || `<p class="empty">${tr('No stops on this line.', '이 노선에는 정류장이 없어요.')}</p>`;
    if (pass && !hasPass()) body.innerHTML += `<div class="row"><div class="main"><div class="t">${esc(loc(pass))}</div><div class="s">${esc(tr(pass.note || '', pass.note_ko))}</div></div>
      <span class="price">${usd2(+pass.price)}</span><button type="button" data-pass="${esc(pass.id)}">${tr('Buy', '사기')}</button></div>`;
  } else if (panelKind === 'inventory') {
    h.textContent = tr('Inventory', '가방');
    const canEat = zoneId === hero().home_zone || zoneId === 'hotel';
    const all = lots().map((l, n) => ({ l, n })).filter(x => x.l.left > 0).sort((a, b) => (gone(b.l) - gone(a.l)) || ((bestBy(a.l) || 999) - (bestBy(b.l) || 999)) || String(a.l.id).localeCompare(b.l.id));
    sub.textContent = tr(`${all.length} item${all.length === 1 ? '' : 's'}`, `${all.length}개`);
    const closet = ITEMS.detergent ? `<p class="fine">${tr(`👕 Clean clothes: <b>${cleanClothes()} of ${CLOSET}</b> outfits${G.dirtyDay === G.day ? " (you're wearing yesterday's)" : ''}. Do laundry at the door of your home.`, `👕 깨끗한 옷: <b>${CLOSET}벌 중 ${cleanClothes()}벌</b>${G.dirtyDay === G.day ? ' (어제 옷을 입고 있어요)' : ''}. 빨래는 집 현관에서 합니다.`)}</p>` : '';
    const head = closet + (RECIPES.length && all.length ? `<p class="fine">${atHome() ? `<button type="button" data-cook-open="1">${tr('Cook a meal', '요리하기')}</button> ` : ''}${tr('Groceries keep for a while, then go bad. Some need cooking: use the kitchen at home.', '식료품은 기한이 지나면 상합니다. 익혀야 먹는 것은 집 부엌에서 요리하세요.')}</p>` : '');
    body.innerHTML = head + all.map(({ l, n }) => {
      const i = ITEMS[l.id] || { id: l.id, name: pretty(l.id), energy: 0 }, by = bestBy(l), bad = gone(l), u = usesOf(i);
      const when = by == null ? '' : bad ? tr(`went bad after ${dateShort(by).replace(/^\w+, /, '')}`, `${dMonth(by)} 지나 상함`) : by === G.day ? tr('best by today', '오늘까지') : by === G.day + 1 ? tr('best by tomorrow', '내일까지') : tr(`best by ${dateShort(by)}`, `${dShort(by)}까지`);
      const btn = bad ? `<button type="button" class="danger" data-toss="${n}">${tr('Throw out', '버리기')}</button>`
        : +i.cook_only ? `<span class="price">${tr('Needs cooking', '익혀야 함')}</span>`
          : i.energy ? `<button type="button" data-eat="${n}" ${canEat ? '' : 'disabled'}>${canEat ? tr('Eat', '먹기') : tr('Eat at home', '집에서 먹기')}</button>` : '';
      const facts = [u > 1 ? tr(`${l.left} of ${u} ${i.kind === 'gear' ? 'uses' : 'portions'} left`, `${u}${i.kind === 'gear' ? '회' : '회분'} 중 ${l.left} 남음`) : '', i.energy && !bad && !+i.cook_only ? tr(`energy +${i.energy}`, `에너지 +${i.energy}`) : ''].filter(Boolean);
      return `<div class="row${bad ? ' bad' : by != null && by <= G.day + 1 ? ' soon' : ''}"><div class="main"><div class="t">${esc(loc(i))}</div>
        <div class="s">${esc(facts.join(' · '))}${when ? `${facts.length ? ' · ' : ''}<span class="by">${esc(when)}</span>` : ''}</div></div>${btn}</div>`; }).join('')
      || `<p class="empty">${tr('Your bag is empty. Groceries you buy at the market go here.', '가방이 비었어요. 마켓에서 산 식료품이 여기 들어와요.')}</p>`;
  } else if (panelKind === 'cook') {
    h.textContent = tr('Cook a meal', '요리하기');
    const able = RECIPES.filter(canCook);
    sub.textContent = tr(`${able.length} of ${RECIPES.length} recipes`, `요리 ${RECIPES.length}가지 중 ${able.length}가지 가능`);
    body.innerHTML = `<p class="fine">${tr('A recipe takes one portion of each ingredient, the oldest first. Buy what is missing at Fairview Market.', '재료마다 1회분씩, 오래된 것부터 씁니다. 없는 재료는 페어뷰 마켓에서 사세요.')}</p>`
      + RECIPES.slice().sort((a, b) => canCook(b) - canCook(a)).map(r => {
        const ok = canCook(r), steps = String(r.steps || '').split(' | ').filter(Boolean), ko = String(r.steps_ko || '').split(' | ');
        return `<div class="row recipe${ok ? '' : ' lack'}"><button type="button" class="play" data-say="${esc(r.name + '. ' + steps.join(' '))}" aria-label="Play">▶</button>
          <div class="main"><div class="t">${esc(loc(r))}</div><div class="s">${tr(`${r.minutes} min · energy +${r.energy}`, `${r.minutes}분 · 에너지 +${r.energy}`)}${r.tool && !KO() ? ' · ' + esc(r.tool) : ''}</div>
          <div class="s need">${needs(r).map(id => `<span class="${portions(id) ? 'have' : 'miss'}">${portions(id) ? '✓' : '✗'} ${esc(itemName(id))}</span>`).join(' ')}</div>
          ${steps.length ? `<details><summary>${tr('How to make it', '만드는 법')}</summary><ol>${steps.map((t, k) => `<li>${esc(tr(t, ko[k]))}</li>`).join('')}</ol></details>` : ''}</div>
          <button type="button" data-cook="${esc(r.id)}" ${ok && atHome() ? '' : 'disabled'}>${!atHome() ? tr('At home', '집에서') : ok ? tr('Cook', '요리') : tr('Missing', '재료 부족')}</button></div>`; }).join('');
  } else if (panelKind === 'calendar') {
    h.textContent = tr('Calendar', '달력');
    const up = Object.keys(HOLIDAYS).sort().map(k => [Math.round((Date.parse(k) - START) / 864e5) + 1, HOLIDAYS[k]]).filter(x => START != null && x[0] > Math.floor((G.day - 1) / 7) * 7 + 7).slice(0, 3);
    sub.textContent = tr(`Week ${Math.floor((G.day - 1) / 7) + 1}`, `${Math.floor((G.day - 1) / 7) + 1}주차`);
    const d0 = Math.floor((G.day - 1) / 7) * 7 + 1;
    let html = '';
    for (let d = d0; d < d0 + 7; d++) {
      const evs = calendar().filter(c => c.day === d && !(fired() && d >= G.work.fired && firedOut(c.place))).sort((a, b) => hm(a.time, 0) - hm(b.time, 0));
      const extra = [];
      if (isPayday(d) && !fired()) extra.push(tr(`Payday: ${usd(netPay(d))} direct deposit`, `월급날: ${usd(netPay(d))} 계좌 입금`));
      if (isRentDay(d)) extra.push(tr(`${hero().housing_name || 'Rent'} due: ${usd(+hero().housing)}`, `${hero().housing_name_ko || '월세'} 납부: ${usd(+hero().housing)}`));
      billsDue(d).forEach(b => extra.push(tr(`Autopay: ${b.name} ${usd2(+b.amount)}`, `자동이체: ${loc(b)} ${usd2(+b.amount)}`)));
      cardCalendar(d).forEach(x => extra.push(x));
      const hol = holidayOf(d);
      if (hol) extra.unshift(tr(`${hol.name}${hol.kind === 'federal' ? ' (federal holiday: banks and post offices closed)' : ''}`, `${loc(hol)}${hol.kind === 'federal' ? ' (연방 공휴일: 은행·우체국 휴무)' : ''}`));
      if (companyOff(d) && !isWeekend(d)) extra.push(tr(`${CFG.company} closed (paid holiday)`, `${ZONE_NAMES.office[1] || CFG.company} 휴무 (유급 휴일)`));
      const lv = leaveOf(d), rq = G.leave && G.leave.req.find(r => r.day === d && r.status === 'pending');
      if (lv && !(G.work && G.work.record[d])) extra.push(lv === 'pto' ? tr('PTO (paid day off)', '연차 (유급 휴가)') : tr('Out sick', '병가'));
      if (rq) extra.push(tr('PTO requested: waiting for an answer', '연차 신청: 답을 기다리는 중'));
      const rec = G.work && G.work.record[d];
      if (rec) extra.push(`${tr('Work', '근무')}: ${tr(ATTEND[rec][0], ATTEND[rec][1])}`);
      if (rec && G.work.left && G.work.left[d] != null) extra.push(`${tr('Work', '근무')}: ${tr(ATTEND.early[0], ATTEND.early[1])} · ${clk(G.work.left[d])}`);
      const hx = hybridCal(d);          // hybrid work: a remote day
      if (hx) extra.push(hx);
      if (!evs.length && !extra.length && d !== G.day) continue;
      html += `<h3>${tr(`${dateLong(d)} · Day ${d}${d === G.day ? ' · today' : ''}`, `${dateKo(d)} · ${d}일째${d === G.day ? ' · 오늘' : ''}`)}</h3>`;
      html += extra.map(x => `<div class="row"><span class="when"></span><div class="main"><div class="t">${esc(x)}</div></div></div>`).join('');
      html += evs.map(c => { const done = c.rkey ? !!(G.rdone && G.rdone[c.rkey]) : c.episode && G.done[c.episode]; const past = d < G.day || (d === G.day && hm(c.time, 0) < G.minute - 60);
        return `<div class="row${done ? ' done' : ''}${past && !done ? ' past' : ''}"><span class="when">${esc(c.time)}</span><div class="main"><div class="t">${esc(loc(c, 'title'))}</div><div class="s">${c.place ? esc(loc(place(c.place))) : ''}</div></div></div>`; }).join('');
      if (!evs.length && !extra.length) html += `<p class="empty">${tr('Nothing scheduled.', '일정 없음.')}</p>`;
    }
    if (up.length) html += `<h3>${tr('Coming up', '다가오는 날')}</h3>` + up.map(x => `<div class="row"><span class="when">${esc(dMonth(x[0]))}</span><div class="main"><div class="t">${esc(loc(x[1]))}</div><div class="s">${esc(tr(x[1].note || '', x[1].note_ko))}</div></div></div>`).join('');
    body.innerHTML = html;
  } else if (panelKind === 'phone') {
    h.textContent = tr('Phone', '휴대전화');
    const list = inbox(), fresh = list.filter(m => m.fresh).length;
    sub.textContent = fresh ? tr(`${fresh} new`, `새 메시지 ${fresh}개`) : tr(`${list.length} messages`, `메시지 ${list.length}개`);
    const ICON = { text: '💬', email: '✉️', voicemail: '📞', alert: '🔔' };
    const sb = G && !fired() && (G.minute >= 17 * 60 || G.minute < hm(CFG.sick_call_by, 570)) ? sickButton() : '';
    body.innerHTML = shopLink() + (sb ? `<p class="fine leave-ask">${sb}</p>` : '') + benefitsLink(true) + list.map(m => `<div class="row msg${m.fresh ? ' new' : ''}"><button type="button" class="play" data-say="${esc((m.subject ? m.subject + '. ' : '') + m.body)}" data-voice="${NPCS[m.sender] ? esc(m.sender) : ''}" aria-label="Play">▶</button>
      <div class="main"><div class="s">${ICON[m.kind] || ''} ${esc(tr(MSG_KIND[m.kind] || 'Message', MSG_KIND_KO[m.kind] || '메시지'))} · ${esc(dShort(m.day))}, ${clk(m.minute)}</div><div class="t">${esc(senderName(m.sender))}${m.subject ? ` <span class="subj">${esc(tr(m.subject, m.subject_ko))}</span>` : ''}</div>
      <div class="b">${esc(shown(m.body, m.body_ko))}</div>${replyBox(m)}</div></div>`).join('')
      || `<p class="empty">${tr('No messages yet. Texts, emails and alerts from your bank arrive here.', '아직 메시지가 없어요. 문자, 이메일, 은행 알림이 여기로 와요.')}</p>`;
    readAll();
  } else if (panelKind === 'tv') {
    tvPanel(h, sub, body);
  } else if (panelKind === 'radio') {
    h.textContent = tr('Radio', '라디오');
    const show = radioShow();
    sub.textContent = `${STATION} · ${clk(G.minute)}`;
    body.innerHTML = `<p class="fine"><button type="button" data-say="${esc(show.map(x => x.en).join(' '))}">${tr('▶ Listen to it all', '▶ 전부 듣기')}</button> ${tr('Local radio: the weather in Fahrenheit, traffic, the news of the town.', '지역 라디오: 날씨, 교통, 동네 소식.')}</p>`
      + show.map(x => `<div class="row msg"><button type="button" class="play" data-say="${esc(x.en)}" aria-label="Play">▶</button><div class="main"><div class="s">📻 ${esc(tr(RADIO_KIND[x.kind] || pretty(x.kind), RADIO_KIND_KO[x.kind]))}</div>
      <div class="b">${esc(tr(x.en, x.ko))}</div></div></div>`).join('');
  } else if (panelKind === 'mailbox') {
    h.textContent = tr('Mailbox', '우편함');
    const got = G.mailGot = G.mailGot || {}, list = myMail().slice().reverse().slice(0, 40), fresh = list.filter(m => !got[m.id]).map(m => m.id);
    sub.textContent = fresh.length ? tr(`${fresh.length} new`, `새 우편 ${fresh.length}통`) : tr(`${list.length} kept`, `${list.length}통 보관`);
    body.innerHTML = (list.map(m => `<div class="row msg${fresh.includes(m.id) ? ' new' : ''}"><button type="button" class="play" data-say="${esc((m.subject ? m.subject + '. ' : '') + m.body)}" aria-label="Play">▶</button>
      <div class="main"><div class="s">${MAIL_ICON[m.kind] || ''} ${esc(tr(MAIL_KIND[m.kind] || 'Mail', MAIL_KIND_KO[m.kind] || '우편'))} · ${esc(dShort(m.day))}</div><div class="t">${esc(m.sender)}${m.subject ? ` <span class="subj">${esc(tr(m.subject, m.subject_ko))}</span>` : ''}</div>
      <div class="b">${esc(shown(m.body, m.body_ko))}</div></div></div>`).join('')
      || `<p class="empty">${tr(`The mailbox is empty. The mail comes after ${clock(mailTime())}, Monday to Saturday.`, `우편함이 비었어요. 우편은 월~토요일 ${clockKo(mailTime())} 이후에 와요.`)}</p>`)
      + (list.length && !fresh.length ? `<p class="fine">${mailDay(G.day) ? (G.minute < mailTime() ? tr(`Nothing new yet. Today's mail comes after ${clock(mailTime())}.`, `아직 새 우편이 없어요. 오늘 우편은 ${clockKo(mailTime())} 이후에 와요.`) : tr('Nothing new today.', '오늘은 새 우편이 없어요.')) : tr('No mail on Sundays and federal holidays.', '일요일과 연방 공휴일에는 우편이 오지 않아요.')}</p>` : '');
    fresh.forEach(id => { got[id] = 1; });
  } else if (panelKind === 'talks' || panelKind === 'phrasebook') {
    // the conversations you have had, newest first: what was said to you, what you answered and the reply, then the
    // expressions the conversation taught (what used to be the Phrasebook); every line can be heard again
    h.textContent = tr('Conversations', '지난 대화');
    const had = G.log.filter(l => l.type === 'episode' && l.id && EPISODES[l.id] && G.done[l.id]).slice().reverse();
    sub.textContent = tr(`${had.length} finished`, `${had.length}개 끝냄`);
    const sayBtn = (text, who) => `<button type="button" class="play" data-say="${esc(text)}" data-voice="${esc(who || '')}" aria-label="Play">▶</button>`;
    body.innerHTML = had.map((l, n) => {
      const ep = EPISODES[l.id], pts = (G.epScore || {})[l.id];
      const lines = (TURNS[l.id] || []).map(t => {
        const who = t.speaker || ep.npc, rs = t.reply_speaker || who;
        return `${t.situation ? `<p class="scene">${esc(turnText(t, 'situation'))}</p>` : ''}
          <div class="said">${sayBtn(personal(t.line), who)}<div><b>${esc(firstName(npcRow(who)))}</b> ${esc(turnText(t, 'line'))}</div></div>
          <div class="said me">${sayBtn(personal(t.model), G.hero)}<div><b>${esc(myName())}</b> ${esc(turnText(t, 'model'))}</div></div>
          ${t.reply_line ? `<div class="said">${sayBtn(personal(t.reply_line), rs)}<div><b>${esc(firstName(npcRow(rs)))}</b> ${esc(shown(t.reply_line, t.reply_ko))}</div></div>` : ''}`;
      }).join('');
      return `<details class="talk"${n ? '' : ' open'}><summary><span class="when">${dShort(l.day)} · ${clk(l.minute)}${pts ? ` · ★ ${pts[0]}/${pts[1]}` : ''}</span> <b>${esc(loc(ep, 'title'))}</b><span class="with"> ${tr(`with ${esc(npcRow(ep.npc).name)} · ${esc(place(ep.place).name)}`, `${esc(fullName(npcRow(ep.npc)))} · ${esc(loc(place(ep.place)))}`)}</span></summary>${lines}</details>`;
    }).join('') || `<p class="empty">${tr('Conversations you finish are kept here, so you can read and hear them again.', '끝낸 대화가 여기 남아요. 다시 읽고 들을 수 있어요.')}</p>`;
  } else if (panelKind === 'bank') {
    h.textContent = tr('Bank', '은행');
    sub.textContent = tr('Checking ···4821', '입출금 계좌 ···4821');
    const soon = [];
    for (let d = G.day + 1; d <= G.day + 14; d++) {
      const when = dShort(d);
      if (isPayday(d) && !fired()) soon.push([when, tr('Paycheck (direct deposit)', '급여 (계좌 입금)'), netPay(d)]);
      if (isRentDay(d)) soon.push([when, tr(hero().housing_name || 'Rent', hero().housing_name_ko || '월세'), -hero().housing]);
      billsDue(d).forEach(b => soon.push([when, tr(b.name + ' (autopay)', loc(b) + ' (자동이체)'), -b.amount]));
    }
    const KIND = { income: ['Deposit', '입금'], spend: ['Debit card', '체크카드'], bill: ['Autopay', '자동이체'], fee: ['Bank fee', '은행 수수료'], atm: ['ATM', 'ATM'] };
    const line = (when, text, amount, kind) => `<div class="row"><span class="when">${esc(when)}</span><div class="main"><div class="t">${esc(text)}</div>${kind ? `<div class="s">${esc(kind)}</div>` : ''}</div><span class="price ${amount < 0 ? 'out' : 'in'}">${amount < 0 ? '−' : '+'}${usd2(Math.abs(amount)).replace('−', '')}</span></div>`;
    const past = G.log.filter(l => l.amount && !l.cash).slice().reverse().slice(0, 60);          // cash spent is not in checking
    body.innerHTML = `<div class="sum"><div><b>${usd2(G.money)}</b>${tr('available balance', '사용 가능 잔액')}</div></div>${bankCash()}
      <h3>${tr('Coming up', '예정')}</h3>${soon.map(x => line(x[0], x[1], x[2])).join('') || `<p class="empty">${tr('Nothing in the next two weeks.', '앞으로 2주 동안 없음.')}</p>`}
      ${stubBox()}${creditPanel()}
      <h3>${tr('Recent transactions', '최근 거래')}</h3>${past.map(l => line(`${dMonth(l.day)} · ${clk(l.minute)}`, logText(l), l.amount,
        (/direct deposit/i.test(l.text) ? tr('Direct deposit', '계좌 입금') : KIND[l.type] ? tr(KIND[l.type][0], KIND[l.type][1]) : '') + (l.tax ? tr(` · tax ${usd2(l.tax)}`, ` · 세금 ${usd2(l.tax)}`) : '') + (l.tip ? tr(` · tip ${usd2(l.tip)}`, ` · 팁 ${usd2(l.tip)}`) : ''))).join('') || `<p class="empty">${tr('No transactions yet.', '아직 거래가 없어요.')}</p>`}`;
  } else if (panelKind === 'work') {
    // the score and the work record: how you stand with your manager, every working day so far, and the points
    const w = work(), st = standing();
    h.textContent = tr('Work record', '근무 기록');
    sub.textContent = `${CFG.company} · ${tr(hero().role, hero().role_ko)}`;
    const days = Object.keys(w.record).map(Number).sort((a, b) => b - a);
    const left = Math.max(0, +CFG.fire_points - w.pts);
    const say = fired() ? tr(`You were let go on ${dateLong(w.fired)}. Your badge no longer opens the office.`, `${dateKo(w.fired)}에 해고되었어요. 출입증으로 더는 사무실에 들어갈 수 없어요.`)
      : w.warned === 2 ? tr('Final warning from HR: one more late morning or missed day and you are out.', '인사팀의 최종 경고: 한 번만 더 지각하거나 결근하면 해고예요.')
        : w.warned === 1 ? tr(`Your manager has talked to you about your hours. Be in by ${clock(hm(CFG.work_start, 540))} and stay until at least ${clock(EARLY())}.`, `매니저가 근무 시간 얘기를 했어요. ${clockKo(hm(CFG.work_start, 540))}까지 출근해서 적어도 ${clockKo(EARLY())}까지 있으세요.`)
          : tr(`Be at the office by ${clock(hm(CFG.late_after, 555))} on working days and stay until at least ${clock(EARLY())}. Late mornings, early afternoons and missed days add up, and too many of them get you fired.`, `평일에는 ${clockKo(hm(CFG.late_after, 555))}까지 사무실에 와서 적어도 ${clockKo(EARLY())}까지 있으세요. 지각·조퇴·결근이 쌓이면 해고될 수 있어요.`);
    const pts = (G.points || []).slice().reverse().slice(0, 40);
    body.innerHTML = `<div class="sum"><div><b>★ ${score()}</b>${tr('score', '점수')}</div><div class="standing ${st[2]}"><b>${tr(st[0], st[1])}</b>${tr('standing', '평가')}</div><div><b>${fired() ? '—' : w.pts + ' / ' + CFG.fire_points}</b>${tr('strikes', '벌점')}</div></div>
      <p class="fine">${esc(say)}${!fired() && w.pts ? tr(` ${left} more strike${left === 1 ? '' : 's'} and you are let go (late ${CFG.late_points}, in after noon ${CFG.noon_points}, leaving before ${clock(EARLY())} ${CFG.early_points}, a missed day ${CFG.absent_points}; five on-time days in a row take one off).`, ` 벌점 ${left}점이 더 쌓이면 해고예요 (지각 ${CFG.late_points}, 오후 출근 ${CFG.noon_points}, ${clockKo(EARLY())} 전 퇴근 ${CFG.early_points}, 결근 ${CFG.absent_points}; 5일 연속 정시 출근하면 1점 감소).`) : ''}</p>
      ${(() => { const [got, all] = missionCount(); const m = G.mission;
        return `<h3>${tr('Missions', '미션')}</h3><p class="fine">${m && m.all ? tr(`🎉 All ${all} done${m.bonus ? `: bonus ${usd(m.bonus)}` : ''}. ${freePlay() ? 'Free play now.' : `Free play from ${dateLong(MISSION_DAYS + 1)}.`}`, `🎉 ${all}개 모두 완료${m.bonus ? `: 보너스 ${usd(m.bonus)}` : ''}. ${freePlay() ? '지금은 자유 플레이.' : `${dateKo(MISSION_DAYS + 1)}부터 자유 플레이.`}`)
          : freePlay() ? tr(`${got} of ${all} done. The missions are over: free play now.`, `${all}개 중 ${got}개 완료. 미션 기간이 끝나 지금은 자유 플레이.`)
            : tr(`<b>${got} of ${all}</b> done, until ${dateLong(MISSION_DAYS)}. Finish all of them for a ${usd(+CFG.mission_bonus || 0)} bonus and ${+CFG.mission_points || 0} points.`, `${dateKo(MISSION_DAYS)}까지 <b>${all}개 중 ${got}개</b> 완료. 모두 해내면 보너스 ${usd(+CFG.mission_bonus || 0)}와 ${+CFG.mission_points || 0}점.`)}</p>`; })()}
      ${(() => { const s = weekStats(G.day), log = (G.taskLog || []).slice().reverse().slice(0, 12), T = byId('tasks');
        const head = freePlay() && s.came ? tr(`This week: <b>${hrs(s.mins)}</b> of about ${hrs(s.want)} (${WORK_HOURS_DAY} h for each day you come in). Your manager looks at the week on its last working day.`, `이번 주: 약 ${hrs(s.want)} 중 <b>${hrs(s.mins)}</b>(출근한 날마다 ${WORK_HOURS_DAY}시간). 매니저가 그 주의 마지막 근무일에 한 주를 돌아봐요.`)
          : tr(`Today: <b>${hrs(workedOn(G.day))}</b>. Use “Work for an hour” at your desk.${freePlay() ? '' : ` After the missions your manager expects about ${WORK_HOURS_DAY} h a day.`}`, `오늘: <b>${hrs(workedOn(G.day))}</b>. 자리에서 “한 시간 일하기”를 하세요.${freePlay() ? '' : ` 미션이 끝나면 매니저는 하루 약 ${WORK_HOURS_DAY}시간을 기대해요.`}`);
        return `<h3>${tr('At your desk', '업무')}</h3><p class="fine">${head}</p>${log.map(x => { const t = T[x.id]; if (!t) return ''; const c = (t.choices || [])[x.pick] || {};
          return `<div class="row"><span class="when">${esc(dShort(x.day))}</span><div class="main"><div class="t">${esc((TASK_KIND[t.kind] || ['📌'])[0] + ' ' + shown(t.title, t.title_ko))}</div><div class="s">${esc(shown(c.t, c.t_ko))}</div></div><span class="price ${x.n < 0 ? 'out' : 'in'}">${x.n ? (x.n > 0 ? '+' : '−') + Math.abs(x.n) : ''}</span></div>`; }).join('')}`; })()}
      ${hybridPanel()}${fired() ? '' : leavePanel()}${benefitsLink()}
      ${friendsPanel()}${healthPanel()}
      <h3>${tr('Attendance', '출근 기록')}</h3>${days.map(d => `<div class="row att ${w.record[d]}"><span class="when">${esc(dShort(d))}</span><div class="main"><div class="t">${esc(tr(ATTEND[w.record[d]][0], ATTEND[w.record[d]][1]))}</div>${d === G.inDay && G.inAt != null ? `<div class="s">${clk(G.inAt)}</div>` : ''}${w.home && w.home[d] ? `<div class="s">${tr('From home', '재택')}</div>` : ''}${w.left && w.left[d] != null ? `<div class="s">${esc(tr(ATTEND.early[0], ATTEND.early[1]))} · ${clk(w.left[d])} · −${Math.abs(ATTEND.early[2])}</div>` : ''}</div><span class="price ${ATTEND[w.record[d]][2] < 0 ? 'out' : 'in'}">${ATTEND[w.record[d]][2] ? (ATTEND[w.record[d]][2] > 0 ? '+' : '−') + Math.abs(ATTEND[w.record[d]][2]) : ''}</span></div>`).join('') || `<p class="empty">${tr('No working days yet.', '아직 근무일이 없어요.')}</p>`}
      <h3>${tr('Points', '점수 내역')}</h3>${pts.map(x => `<div class="row"><span class="when">${esc(dMonth(x.day))} · ${clk(x.minute)}</span><div class="main"><div class="t">${esc(tr(x.en, x.ko))}</div></div><span class="price ${x.n < 0 ? 'out' : 'in'}">${x.n > 0 ? '+' : '−'}${Math.abs(x.n)}</span></div>`).join('') || `<p class="empty">${tr('Points come from what you say in conversations and from showing up on time.', '점수는 대화에서 고른 말과 제시간 출근으로 쌓여요.')}</p>`}`;
  } else if (panelKind === 'map') {
    renderMapPanel(h, sub, body);
  } else if (panelKind === 'benefits') benefitsPanel(h, sub, body);          // the HR portal
  else if (panelKind === 'atm' || panelKind === 'order') moneyPanel(h, sub, body);          // an ATM, the online store
  panel.classList.toggle('map', panelKind === 'map');
}
panel.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  if (b.dataset.say) speak(b.dataset.say, b.dataset.voice ? voiceOf(NPCS[b.dataset.voice] || npcRow(b.dataset.voice)) : undefined);
  if (b.dataset.reply && panelKind === 'phone') { const [mid, rid] = b.dataset.reply.split('|'); const y = panel.querySelector('.panel-body').scrollTop; if (replyTo(mid, rid)) { renderPanel(); panel.querySelector('.panel-body').scrollTop = y; } }
  if (b.dataset.buy) buy(b.dataset.buy);
  moneyClick(b);          // the ATM, cash back, the online store
  if (b.dataset.tip != null && panelKind === 'shop') { tipChoice[panelArg] = +b.dataset.tip; renderPanel(); }
  if (b.dataset.eat) eat(b.dataset.eat);
  if (b.dataset.toss) toss(+b.dataset.toss);
  if (b.dataset.tv && panelKind === 'tv') { const [id, live] = b.dataset.tv.split('|'); if (tvOn(id, live === '1')) renderPanel(); }
  if (b.dataset.cook) cook(b.dataset.cook);
  if (b.dataset.credit) creditClick(b);
  if (b.dataset.leave) {
    const [what, d] = b.dataset.leave.split(':'), y = panel.querySelector('.panel-body').scrollTop;
    const ok = what === 'sick' ? !!callInSick() : what === 'pto' ? requestPto(+(panel.querySelector('#pto-day') || {}).value) : what === 'cancel' ? cancelPto(+d) : false;
    if (ok) { saveGame(); renderPanel(); panel.querySelector('.panel-body').scrollTop = y; }
  }
  if (b.dataset.cookOpen) openPanel('cook');
  if (b.dataset.benefits) benefitsClick(b.dataset.benefits);
  if (b.dataset.ride) ride(b.dataset.ride);
  if (b.dataset.pass) { const it = ITEMS[b.dataset.pass]; if (G.money < +it.price) note(tr("You can't afford that.", '돈이 부족해요.'), true); else { pay(-it.price, it.name, 'spend', { ko: it.name_ko }); G.pass = G.day; saveGame(); renderPanel(); note(tr('Day pass bought. Ride as much as you like today.', '1일 승차권을 샀어요. 오늘은 마음껏 타세요.')); } }
});
$('card').addEventListener('click', (e) => { const b = e.target.closest('button[data-say]'); if (b) speak(b.dataset.say); });

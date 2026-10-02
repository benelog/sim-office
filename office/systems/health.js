/* Sim Office — the pharmacy and the clinic: getting sick, getting better. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- the pharmacy and the clinic: getting sick, getting better
// Fairview Pharmacy (place kind pharmacy, Omar) and the walk-in clinic next to it (kind clinic, Grace) are at the back
// of Fairview Market. Their conversations are tagged errand: not missions, and open only when they apply (careDue),
// in the place's hours (config hours_pharmacy, hours_clinic) and, on a day you are expected at work, from
// early_before (after work). Tag pickup: the prescription of the day-10 voicemail (its days, once); otc: cold medicine
// when you are sick and have none in the bag; clinic + cold | flu: a walk-in visit (the flu at once, a cold from its
// third day, or when HR wants a doctor's note); rx: the antiviral the clinic sent over for the flu.
// Insurance: careCopay(kind) is what you pay: the benefits plan of the day (copayFor: a prescription is rx, the clinic
// a doctor visit), else config copay_rx, copay_clinic, copay_flushot. Medicine without a prescription (items of kind gear sold at the pharmacy) is not
// covered and is taxed; prescriptions are not taxed.
// Getting sick (free play): on a morning a cold or the flu may start (config ill_chance: percent a day by month, times
// ill_wet_factor after a day you got soaked in the rain; flu_share of them are the flu, times flu_shot_factor after a
// flu shot this season; none for ill_rest_days after the last one), lasting ill_days. Each morning: the symptoms and
// less energy (ILL_PAIN), a dose of medicine from the bag takes the edge off, the antiviral (from the clinic in the
// first two days of the flu) ends it a day sooner, going to work with a fever makes it a day longer. Out sick
// sick_note_days working days in a row, HR asks for a doctor's note (the clinic writes one): −10 the day after you
// are back without it. G.health = { ill { kind, from, until, otc, seen, rx ready | taken, pushed }, past [{ kind,
// from, until, seen }], well (the day the last one ended), flushot (day), paid (copays), note { from, day, kind, got,
// closed } }.
const careKind = (ep) => ['pickup', 'otc', 'rx', 'clinic'].find(k => hasTag(ep, k)) || null;
function careCopay(kind) {
  const plan = kind === 'flushot' ? null : copayFor(kind === 'clinic' ? 'doctor' : kind);          // benefits: null without plans
  if (plan != null) return plan;
  const v = CFG['copay_' + kind];
  return v == null || v === '' ? ({ rx: 10, clinic: 40, flushot: 0 }[kind] || 0) : Math.max(0, +v);
}
const byMonth = (v, m, def) => { const x = listOf(v).map(s => s.split(':')).find(p => +p[0] === m); return x ? +x[1] : def; };
const monthOf = (d) => { const t = dateOf(d); return t ? t.getUTCMonth() + 1 : 10; };
const illDays = (k) => { const x = listOf(CFG.ill_days).map(s => s.split(':')).find(p => p[0] === k); return x ? +x[1] : k === 'flu' ? 6 : 4; };
const ILL_PAIN = { cold: [20, 25, 15, 10], flu: [40, 45, 35, 25, 15, 10] };          // energy lost in the morning, day by day
const ILL_NAME = { cold: ['cold', '감기'], flu: ['flu', '독감'] };
const NOTE_DAYS = +CFG.sick_note_days || 3;
const MEDS = () => rows('items').filter(i => i.kind === 'gear' && placeKind(i.place) === 'pharmacy');
const hasMeds = () => MEDS().some(i => portions(i.id) > 0);
const health = () => G.health || (G.health = { ill: null, past: [], well: 0, flushot: null, paid: 0, note: null });
const illDay = () => G && G.health && G.health.ill ? G.day - G.health.ill.from + 1 : 0;
const noteWanted = () => { const n = G && G.health && G.health.note; return !!n && !n.got && !n.closed; };
const illHash = (d, k) => { const x = Math.sin(d * 91.3458 + k * 47.853 + hash(G.name) % 997) * 43758.5453; return x - Math.floor(x); };
// the flu season runs from September to March; a shot is good for the season it was given in
const fluSeason = (d) => { const t = dateOf(d); return t ? t.getUTCFullYear() + (t.getUTCMonth() >= 7 ? 1 : 0) : 1; };
const shotSeason = (d) => { const m = monthOf(d); return m >= 9 || m <= 3; };
const shotThisSeason = (d) => { const s = G && G.health && G.health.flushot; return s != null && fluSeason(s) === fluSeason(d); };
function careOpen(pid) {          // the place's hours, and after work on a day you are expected there
  const h = hoursOf(pid);
  if (h && !(G.minute >= h[0] && G.minute < h[1])) return false;
  return myOff(G.day) || fired() || G.minute >= EARLY();
}
function careDue(ep) {          // isOpen for a conversation tagged errand (besides its time_from–time_to)
  if (!G || (ep.day_from != null && G.day < ep.day_from) || (ep.day_to != null && G.day > ep.day_to) || !careOpen(ep.place)) return false;
  const H = health(), ill = H.ill, kind = careKind(ep);
  if (kind === 'pickup') return !G.done[ep.id];
  if (kind === 'rx') return !!ill && ill.rx === 'ready';
  if (kind === 'otc') return !!ill && !ill.otc && !hasMeds();
  if (kind === 'clinic') {
    const want = hasTag(ep, 'flu') ? 'flu' : 'cold';
    if (ill && !ill.seen) return ill.kind === want && (want === 'flu' || illDay() >= 3 || noteWanted());
    return !ill && noteWanted() && H.note.kind === want;          // over it, but HR still wants a note
  }
  return false;
}
// the chance of falling ill on the morning of day d: { p, flu }
function illChance(d) {
  const H = health(), m = monthOf(d);
  if (H.ill || d - (H.well || 0) < (+CFG.ill_rest_days || 14)) return { p: 0, flu: 0 };
  const p = byMonth(CFG.ill_chance, m, 1) / 100 * (G.wetDay === d - 1 ? +CFG.ill_wet_factor || 3 : 1);
  const flu = byMonth(CFG.flu_share, m, 5) / 100 * (shotThisSeason(d) ? (CFG.flu_shot_factor == null ? 0.4 : +CFG.flu_shot_factor) : 1);
  return { p: Math.min(0.5, p), flu };
}
function illRoll(d) { const c = illChance(d); return c.p && illHash(d, 1) < c.p ? (illHash(d, 2) < c.flu ? 'flu' : 'cold') : null; }          // what the morning of day d brings
function startIll(kind) {
  const H = health();
  H.ill = { kind, from: G.day, until: G.day + illDays(kind) - 1, otc: false, seen: null, rx: null, pushed: false };
  logEvent('health', kind === 'flu' ? 'Came down with the flu' : 'Caught a cold', 0, { ko: kind === 'flu' ? '독감에 걸림' : '감기에 걸림' });
  return H.ill;
}
// a day of being sick, in the morning: how you feel, less energy, a dose of medicine, what to do about work
function illMorning() {
  const ill = health().ill, n = illDay(), out = [], pain = ILL_PAIN[ill.kind] || ILL_PAIN.cold;
  let lose = pain[Math.min(n, pain.length) - 1];
  const med = MEDS().find(i => portions(i.id) > 0);
  if (med) { useOne(med.id); lose = Math.round(lose * 0.6); }
  if (ill.rx === 'taken') lose = Math.max(0, lose - 10);
  G.energy = Math.min(G.energy, E_MAX - lose);
  const SYM = ill.kind === 'flu'
    ? (n === 1 ? ['🤒 You woke up with a fever, chills and aches all over. It feels like <b>the flu</b>.', '🤒 열이 나고 오한이 들고 온몸이 쑤신 채 깼어요. <b>독감</b> 같아요.']
      : n <= 3 ? ['🤒 The flu is hitting hard: a fever of 102°F, and getting out of bed is a struggle.', '🤒 독감이 심해요. 열이 39°C 가까이 오르고, 침대에서 일어나기도 힘들어요.']
        : ['🤒 The fever has broken, but you are still weak and coughing.', '🤒 열은 내렸지만 아직 기운이 없고 기침이 나요.'])
    : (n === 1 ? ['🤧 You woke up with a scratchy throat and a stuffy nose: you have a <b>cold</b>.', '🤧 목이 칼칼하고 코가 막힌 채 깼어요. <b>감기</b>에 걸렸어요.']
      : n === 2 ? ['🤧 Your cold is at its worst: a runny nose, a cough and a heavy head.', '🤧 감기가 가장 심해요. 콧물에 기침, 머리도 무거워요.']
        : ['🤧 Your cold is on its way out, but the cough hangs on.', '🤧 감기가 나아 가지만 기침이 남았어요.']);
  const total = ill.until - ill.from + 1;
  out.push(tr(`${SYM[0]} Day ${n} of about ${total}; energy ${Math.round(G.energy)}.`, `${SYM[1]} ${total}일 중 ${n}일째, 에너지 ${Math.round(G.energy)}.`));
  if (med) out.push(tr(`💊 You took a dose of ${esc(med.name.replace(/\s*\(.*\)$/, ''))}: it takes the edge off (${portions(med.id)} left).`, `💊 ${esc(josa(String(med.name_ko || med.name).replace(/\s*\(.*\)$/, ''), '을', '를'))} 먹었더니 좀 낫네요(${portions(med.id)}회분 남음).`));
  else if (n === 1) out.push(tr('Fairview Pharmacy, at the back of Fairview Market, sells cold medicine, and the walk-in clinic next to it sees patients without an appointment.', '페어뷰 마켓 안쪽의 페어뷰 약국에서 감기약을 팔고, 그 옆 워크인 클리닉은 예약 없이 진료해요.'));
  if (ill.rx === 'ready') out.push(tr('💊 Your flu prescription is waiting at Fairview Pharmacy.', '💊 페어뷰 약국에 독감 처방약이 준비돼 있어요.'));
  const sb = !myOff(G.day) ? sickDayButton() : '', by = hm(CFG.sick_call_by, 570);
  if (sb) out.push(`${tr(ill.kind === 'flu' && n <= 3 ? `With a fever, stay home: everyone at work would catch it. Text your manager before ${clock(by)}.` : `Plenty of people work through a cold, but rest helps. To stay home, text your manager before ${clock(by)}.`,
    ill.kind === 'flu' && n <= 3 ? `열이 있으면 집에서 쉬세요. 회사 사람들에게 옮겨요. ${clockKo(by)} 전에 매니저에게 문자하세요.` : `감기쯤은 참고 출근하는 사람도 많지만 쉬면 빨리 나아요. 쉬려면 ${clockKo(by)} 전에 매니저에게 문자하세요.`)} ${sb}`);
  return out;
}
const sickDayButton = () => { const ill = G.health && G.health.ill, d = sickTarget(); return ill && d != null && d <= ill.until ? sickButton() : ''; };          // only for a day you will still be sick
function sickRun(d) {          // working days out sick in a row up to day d: { n, start }
  let n = 0, start = d;
  for (let x = d; x > 0 && n < 30; x--) { if (offWork(x)) continue; const l = leaveOf(x); if (l !== 'sick' && l !== 'unpaid') break; n++; start = x; }
  return { n, start };
}
// the morning (from goToSleep): the prescription back to stock, a flu made longer by going to work, getting better,
// falling ill, the day's symptoms, and HR's doctor's note. Returns lines for the morning card.
function careMorning(prev) {
  if (!G) return [];
  const H = health(), out = [], w = work(), me = hero().name_ko || G.name;
  const came = (d) => /^(on|late|noon)$/.test(w.record[d] || '');
  const pick = episodes().find(e => isErrand(e) && careKind(e) === 'pickup');
  if (pick && pick.day_to != null && prev === pick.day_to && !G.done[pick.id]) notify(place(pick.place).name, `Hello, this is ${place(pick.place).name} calling for ${G.name}. We held your prescription for seven days, and it has gone back to stock. If you still need it, call us or your doctor's office, and we'll fill it again.`,
    `안녕하세요, ${loc(place(pick.place))}입니다. 처방약을 7일 동안 보관했는데 찾아가지 않으셔서 재고로 돌려놓았습니다. 아직 필요하시면 저희나 병원에 연락 주세요. 다시 조제해 드리겠습니다.`, 'voicemail');
  let ill = H.ill;
  if (ill && ill.kind === 'flu' && !ill.pushed && came(prev) && prev - ill.from <= 2) {
    ill.pushed = true; ill.until++;
    if (!fired()) notify(BOSS, `${G.name}, you didn't look well at all yesterday. If you still have a fever, please stay home today and rest. That's what sick time is for. Just text me before standup.`,
      `${me}, 어제 많이 아파 보이던데요. 아직 열이 있으면 오늘은 집에서 쉬어요. 병가는 그러라고 있는 거예요. 스탠드업 전에 문자만 줘요.`, 'text');
    out.push(tr('🤒 Going to work with a fever made the flu drag on: it will last a day longer.', '🤒 열이 있는데 출근했더니 독감이 길어졌어요. 하루 더 아플 거예요.'));
  }
  if (ill && G.day > ill.until) {
    H.past = (H.past || []).concat({ kind: ill.kind, from: ill.from, until: G.day - 1, seen: ill.seen || null }).slice(-20);
    out.push(tr(`😊 You feel like yourself again: the ${ILL_NAME[ill.kind][0]} is over.`, `😊 몸이 다시 가뿐해요. ${josa(ILL_NAME[ill.kind][1], '이', '가')} 다 나았어요.`));
    H.ill = ill = null; H.well = G.day;
  }
  if (!ill && freePlay()) { const k = illRoll(G.day); if (k) ill = startIll(k); }
  if (ill) illMorning().forEach(m => out.push(m));
  // out sick NOTE_DAYS working days in a row (up to today, or up to yesterday when you are back): HR wants a note
  const r0 = sickRun(G.day), run = r0.n ? r0 : sickRun(G.day - 1);
  const seen = [H.ill, (H.past || []).slice(-1)[0]].some(x => x && x.seen != null && x.seen >= run.start - 3);
  if (!fired() && run.n >= NOTE_DAYS && !seen && !(H.note && H.note.from === run.start)) {
    H.note = { from: run.start, day: G.day, kind: (H.ill || (H.past || []).slice(-1)[0] || { kind: 'cold' }).kind, got: false, closed: false };
    notify(HR, `Hi ${G.name}, I hope you're feeling better. Since you've been out sick ${run.n} working days in a row, our policy asks for a doctor's note. The walk-in clinic next to Fairview Pharmacy can write one. Please send it when you're back. — ${(NPCS[HR] || { name: 'HR' }).name}, HR`,
      `${me} 님, 좀 나아졌기를 바라요. ${run.n}일 연속 병가를 냈으니 회사 규정상 진단서가 필요해요. 페어뷰 약국 옆 워크인 클리닉에서 써 줘요. 복귀하면 보내 주세요. — 인사팀 ${(NPCS[HR] || {}).name_ko || (NPCS[HR] || { name: 'HR' }).name}`, 'email');
    out.push(tr(`📄 HR asks for a <b>doctor's note</b> for your ${run.n} sick days in a row. The walk-in clinic next to Fairview Pharmacy writes them.`, `📄 인사팀이 ${run.n}일 연속 병가에 대한 <b>진단서</b>를 달라고 해요. 페어뷰 약국 옆 워크인 클리닉에서 받을 수 있어요.`));
  } else if (noteWanted() && prev >= H.note.day && came(prev)) {
    H.note.closed = true;
    addScore(-10, "No doctor's note", '진단서 미제출');
    notify(HR, `${G.name}, we still don't have a doctor's note for your sick days. This time I've noted it in your file. Next time, please bring one when you come back.`, `${me} 님, 병가에 대한 진단서를 아직 받지 못했어요. 이번에는 기록만 남겨 둘게요. 다음에는 복귀할 때 꼭 가져와 주세요.`, 'email');
    out.push(tr("📄 You went back to work without the doctor's note HR asked for. −10 points.", '📄 인사팀이 달라던 진단서 없이 복귀했어요. −10점.'));
  }
  return out;
}
// after a pharmacy or clinic conversation (from completeEpisode): the copay, the medicine, the note. Lines for the card.
function careDone(ep) {
  if (!G || !isErrand(ep)) return [];
  const H = health(), ill = H.ill, kind = careKind(ep), out = [], who = firstName(npcRow(ep.npc));
  const charge = (n, en, ko) => { if (n > 0) pay(-n, en, 'spend', { ko }); H.paid = cents((H.paid || 0) + n); return n; };
  if (kind === 'pickup' || kind === 'rx') {
    const c = charge(careCopay('rx'), 'Prescription copay', '처방약 본인 부담금');
    out.push(tr(`<p>💊 Your insurance paid the rest: you paid the <b>${usd2(c)}</b> copay. Prescriptions have no sales tax.</p>`, `<p>💊 나머지는 보험이 냈고, 본인 부담금 <b>${usd2(c)}</b>만 냈어요. 처방약에는 판매세가 없어요.</p>`));
    if (kind === 'rx' && ill) {
      ill.rx = 'taken'; ill.until = Math.max(G.day, ill.until - 1);
      G.energy = clamp(G.energy + 5, 0, E_MAX);
      out.push(tr('<p>You take the first capsule with a snack. The flu should be over a day sooner.</p>', '<p>간식과 함께 첫 캡슐을 먹었어요. 독감이 하루 일찍 나을 거예요.</p>'));
    }
    advanceMinutes(10);
  } else if (kind === 'otc') {
    const i = ITEMS.cold_relief || MEDS()[0];
    if (i) {
      const b = billFor(i);
      pay(-b.total, i.name, 'spend', Object.assign({ ko: i.name_ko }, b.tax ? { tax: b.tax } : null));
      addLot(i.id);
      if (ill) { useOne(i.id); G.energy = clamp(G.energy + 8, 0, E_MAX); }
      out.push(tr(`<p>🧾 ${esc(i.name)}: ${receipt(b)}. Insurance doesn't cover medicine you buy without a prescription.${ill ? ' You take the first dose right away (energy +8); the rest is in your bag, a dose every morning while you are sick.' : ''}</p>`,
        `<p>🧾 ${esc(loc(i))}: ${receipt(b)}. 처방 없이 사는 약은 보험이 안 돼요.${ill ? ' 첫 복용분은 바로 먹었고(에너지 +8), 나머지는 가방에 넣었어요. 아픈 동안 아침마다 먹어요.' : ''}</p>`));
    }
    if (ill) ill.otc = true;
    advanceMinutes(5);
  } else if (kind === 'clinic') {
    const c = charge(careCopay('clinic'), 'Walk-in clinic copay', '클리닉 본인 부담금'), flu = hasTag(ep, 'flu');
    advanceMinutes(40);          // the wait and the visit
    out.push(tr(`<p>🩺 You paid the <b>${usd2(c)}</b> copay for the visit; your insurance pays the rest. With the wait it took about 40 minutes.</p>`, `<p>🩺 진료비는 본인 부담금 <b>${usd2(c)}</b>만 냈고 나머지는 보험이 내요. 기다린 시간까지 40분쯤 걸렸어요.</p>`));
    if (ill) ill.seen = G.day;
    if (noteWanted()) {
      H.note.got = true;
      notify(HR, `Thanks, ${G.name}. We got your doctor's note from the clinic, and your sick days are all set. Feel better!`, `${hero().name_ko || G.name} 님, 클리닉에서 보낸 진단서 잘 받았어요. 병가 처리는 다 됐어요. 얼른 나으세요!`, 'email');
      out.push(tr("<p>📄 The clinic sent your doctor's note to HR.</p>", '<p>📄 클리닉이 진단서를 인사팀에 보냈어요.</p>'));
    } else out.push(tr("<p>📄 You have a doctor's note, in case work asks for one.</p>", '<p>📄 회사에서 달라고 할 때를 위해 진단서를 받아 두었어요.</p>'));
    if (flu && ill && !ill.rx && illDay() <= 2) {          // an antiviral helps in the first two days only
      ill.rx = 'ready';
      out.push(tr(`<p>💊 ${esc(who)} sent a prescription for an antiviral to Fairview Pharmacy next door. Pick it up there.</p>`, `<p>💊 ${esc(josa(who, '이', '가'))} 옆 페어뷰 약국으로 항바이러스제 처방전을 보냈어요. 거기서 찾으세요.</p>`));
    } else if (flu && ill && !ill.rx) out.push(tr("<p>It has been more than two days, so an antiviral wouldn't help much now: rest, fluids and fever medicine.</p>", '<p>이틀이 넘게 지나서 지금은 항바이러스제가 별 도움이 안 돼요. 쉬고, 물 많이 마시고, 해열제를 드세요.</p>'));
    const sb = sickDayButton();
    if (sb) out.push(`<p>${tr(flu ? 'Stay home until the fever has been gone for a day.' : 'If you need a day of rest, let your manager know.', flu ? '열이 내린 뒤 하루가 지날 때까지 집에서 쉬세요.' : '하루 쉬어야 하면 매니저에게 알리세요.')} ${sb}</p>`);
  }
  saveGame();
  return out;
}
// "Text Maya: out sick" on the morning card or after the clinic
$('card').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-leave="sick"]');
  if (!b || !G || !callInSick()) return;
  b.disabled = true;
  b.textContent = tr(`✓ Texted ${firstName(NPCS[BOSS])}`, `✓ ${firstName(NPCS[BOSS])}에게 문자함`);
  saveGame();
});
// a flu shot at the pharmacy counter (September to March, once a season, not while you are sick)
function careActions(pid) {
  if (!G || placeKind(pid) !== 'pharmacy' || !shotSeason(G.day) || shotThisSeason(G.day) || closedNow(pid)) return [];
  const c = careCopay('flushot');
  return [{ key: 'flushot:' + pid, label: tr(`Get a flu shot · ${c ? usd2(c) : 'free'}`, `독감 예방 주사 맞기 · ${c ? usd2(c) : '무료'}`), run: () => fluShot(pid) }];
}
function fluShot(pid) {
  const H = health(), c = careCopay('flushot'), who = firstName(rows('npcs').find(n => n.place === pid) || { name: 'The pharmacist' });
  if (H.ill) { toast(`${who}: "Let's wait until you're feeling better. Come back for it then."`, `${who}: “몸이 나은 다음에 맞아요. 그때 다시 오세요.”`, null, 3.5); return false; }
  if (c > 0 && G.money < c) { toast(`You can't afford it (${usd2(c)}).`, `돈이 부족해요 (${usd2(c)}).`, 'bad'); return false; }
  if (c > 0) { pay(-c, 'Flu shot', 'spend', { ko: '독감 예방 주사' }); H.paid = cents((H.paid || 0) + c); }
  H.flushot = G.day;
  advanceMinutes(20);
  logEvent('health', 'Flu shot', 0, { ko: '독감 예방 주사' });
  saveGame();
  showCard({ kicker: loc(place(pid)), title: tr('Flu shot', '독감 예방 주사'),
    body: tr(`<p>${esc(who)} asks a few questions (any allergies? a fever today?), and you sign a consent form. A quick pinch in the arm, then you wait fifteen minutes to be sure you feel fine.</p><p>${c ? `You paid ${usd2(c)}.` : 'With your insurance it costs <b>nothing</b>: vaccines count as preventive care.'} Your arm may be sore tomorrow, and you are much less likely to get the flu this season.</p>`,
      `<p>${esc(josa(who, '이', '가'))} 몇 가지를 묻고(알레르기 있어요? 오늘 열은요?) 동의서에 서명해요. 팔에 따끔하게 한 대 맞고, 괜찮은지 15분 기다려요.</p><p>${c ? `${usd2(c)}를 냈어요.` : '보험이 있으면 <b>무료</b>예요. 백신은 예방 진료라서요.'} 내일은 팔이 좀 뻐근할 수 있고, 이번 철에는 독감에 걸릴 확률이 훨씬 낮아져요.</p>`),
    ok: tr('Continue', '계속'), state: 'card' }, () => { goalTimer = 0; });
  return true;
}
function illNote() {          // a line under the goal while you are sick: [en, ko]
  const ill = G && G.health && G.health.ill;
  if (!ill) return null;
  const n = illDay(), total = ill.until - ill.from + 1, icon = ill.kind === 'flu' ? '🤒' : '🤧';
  const tip = ill.rx === 'ready' ? ['Your prescription is ready at Fairview Pharmacy.', '페어뷰 약국에 처방약이 준비돼 있어요.'] : hasMeds() ? ['', ''] : ['Medicine helps: Fairview Pharmacy.', '약이 도움이 돼요: 페어뷰 약국.'];
  return [`${icon} ${ill.kind === 'flu' ? 'The flu' : 'A cold'}: day ${n} of about ${total}. ${tip[0]}`, `${icon} ${ILL_NAME[ill.kind][1]}: ${total}일 중 ${n}일째. ${tip[1]}`];
}
function healthPanel() {          // Work record: sick now or not, the flu shot, copays, medicine at home, past illnesses
  if (!G) return '';
  const H = health(), ill = H.ill, meds = MEDS().filter(i => portions(i.id) > 0);
  const shot = shotThisSeason(G.day) ? dMonth(H.flushot) : '—';
  return `<h3>${tr('Health', '건강')}</h3><div class="sum"><div><b>${ill ? tr(pretty(ILL_NAME[ill.kind][0]), ILL_NAME[ill.kind][1]) : tr('Well', '건강')}</b>${ill ? tr(`day ${illDay()} of ${ill.until - ill.from + 1}`, `${ill.until - ill.from + 1}일 중 ${illDay()}일째`) : tr('now', '지금')}</div><div><b>${esc(shot)}</b>${tr('flu shot', '독감 예방 주사')}</div><div><b>${usd2(H.paid || 0)}</b>${tr('copays paid', '낸 본인 부담금')}</div></div>
    <p class="fine">${tr(`With your health insurance a prescription costs you a ${usd2(careCopay('rx'))} copay, a visit to the walk-in clinic ${usd2(careCopay('clinic'))}, a flu shot ${careCopay('flushot') ? usd2(careCopay('flushot')) : 'nothing'}. Medicine without a prescription isn't covered. Out sick ${NOTE_DAYS} working days in a row, HR asks for a doctor's note.`,
      `건강 보험이 있어서 처방약은 본인 부담금 ${usd2(careCopay('rx'))}, 워크인 클리닉 진료는 ${usd2(careCopay('clinic'))}, 독감 예방 주사는 ${careCopay('flushot') ? usd2(careCopay('flushot')) : '무료'}예요. 처방 없이 사는 약은 보험이 안 돼요. ${NOTE_DAYS}일 연속 병가를 내면 인사팀이 진단서를 달라고 해요.`)}</p>
    ${meds.length ? `<p class="fine">💊 ${tr('Medicine in your bag', '가방의 약')}: ${esc(meds.map(i => `${loc(i).replace(/\s*\(.*\)$/, '')} (${portions(i.id)})`).join(', '))}</p>` : ''}
    ${noteWanted() ? `<p class="fine">📄 ${tr("HR is waiting for a doctor's note: the walk-in clinic writes one.", '인사팀이 진단서를 기다려요. 워크인 클리닉에서 받을 수 있어요.')}</p>` : ''}
    ${(H.past || []).slice(-5).reverse().map(x => `<div class="row"><span class="when">${esc(dShort(x.from))}</span><div class="main"><div class="t">${tr(pretty(ILL_NAME[x.kind][0]), ILL_NAME[x.kind][1])}</div><div class="s">${tr(`${x.until - x.from + 1} days`, `${x.until - x.from + 1}일`)}${x.seen ? tr(' · seen at the clinic', ' · 클리닉 진료') : ''}</div></div></div>`).join('')}`;
}
function fallIll(kind, n) {          // the debug API: sick from today (or n days into it), with this morning's symptoms
  const H = health();
  H.ill = null;
  const ill = startIll(kind === 'flu' ? 'flu' : 'cold');
  ill.from = G.day - Math.max(1, +n || 1) + 1;
  ill.until = ill.from + illDays(ill.kind) - 1;
  goalTimer = 0;
  return illMorning();
}
on('morning', (n) => careMorning(n.day), 240);          // a cold or the flu, the doctor's note HR asks for
// SO.debug
debugPart({
  // the pharmacy and the clinic: health (G.health), fallIll('cold' | 'flu', n days in), care() (what is open now), illChance(day), careCopay(kind), flushot()
  get health() { return G ? JSON.parse(JSON.stringify(health())) : null; }, fallIll(kind, n) { return G ? fallIll(kind, n) : null; }, care() { return G ? episodes().filter(e => isErrand(e) && isOpen(e)).map(e => e.id) : []; },
  illChance: (d) => illChance(d == null ? G.day : d), illRoll: (d) => illRoll(d == null ? G.day : d),
  careCopay: (k) => careCopay(k), flushot() { return fluShot('pharmacy'); }
});

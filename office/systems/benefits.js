/* Sim Office — benefits: open enrollment in the HR portal, the pay stub. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- benefits: open enrollment in the HR portal, the pay stub
// The HR portal (a button in the Work record, and on the phone during open enrollment) has your benefits and pay. The
// plans table has the medical, dental and vision plans (premium: out of every paycheck before tax; copays: what a
// visit or a purchase costs you; hsa: what the company puts into a health savings account every paycheck). Open
// enrollment runs config benefits_open – benefits_close (Oct 12–23, during the missions): pick one plan of each kind
// and submit; submitting again replaces it until the window closes. The new plans start on benefits_start (Nov 1);
// without a submission you get benefits_default (the Basic HMO, no dental or vision) until the next open enrollment
// or a life event. Until then each hero has the plans of benefits_now (hero:plan+plan+plan+401k%; @episode: only once
// that conversation is done, the default and k401_auto before). The 401(k) can change any time and counts from the
// next paycheck; the company adds k401_match % of it, up to k401_match_up_to % of pay. A paycheck (payStub): gross
// (salary_gross × G.raise), the premiums and the 401(k) before tax, Social Security and Medicare on pay after the
// premiums, state tax (tax_state %) and federal tax at the hero's own rate on pay after both. That rate is worked out
// so the plans of benefits_now come to heroes.salary_net exactly. Without a plans table the old paycheck stays
// (salary_net × G.raise). copayFor(kind) and planOf(day) are for the pharmacy and the clinic.
// G.benefits = { k401 [{ from (payday), pct }], draft, pick { medical, dental, vision } | null, sent (day), reminded,
// missed, started, hsa, saved { me, co } (401(k) money paid in), stubs [the last 6 pay stubs] }.
const PLANS = rows('plans').slice().sort((a, b) => (a.sort || 0) - (b.sort || 0)), PLAN = byId('plans');
const PLAN_KINDS = ['medical', 'dental', 'vision'], PLAN_KIND_NAME = { medical: ['Medical', '의료'], dental: ['Dental', '치과'], vision: ['Vision', '안과'] };
const CARE = { doctor: ['doctor visit', '진료'], specialist: ['specialist', '전문의'], urgent: ['urgent care', '긴급 진료'], er: ['emergency room', '응급실'], rx: ['generic drugs', '복제약'],
  cleaning: ['cleaning', '스케일링'], filling: ['filling', '충치 치료'], eye_exam: ['eye exam', '시력 검사'], glasses: ['glasses', '안경'] };
const cfgNum = (k, dflt) => CFG[k] != null && CFG[k] !== '' && Number.isFinite(+CFG[k]) ? +CFG[k] : dflt;
const K401_AUTO = cfgNum('k401_auto', 3), K401_MAX = cfgNum('k401_max', 15), MATCH = cfgNum('k401_match', 100) / 100, MATCH_UP_TO = cfgNum('k401_match_up_to', 4);
const TAX_SS = cfgNum('tax_ss', 6.2) / 100, TAX_MED = cfgNum('tax_medicare', 1.45) / 100, TAX_STATE = cfgNum('tax_state', 5.5) / 100;
const isoDay = (s, dflt) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || '')); return m && START != null ? Math.round((Date.UTC(+m[1], +m[2] - 1, +m[3]) - START) / 864e5) + 1 : dflt; };
const ENROLL_FROM = isoDay(CFG.benefits_open, 8), ENROLL_TO = isoDay(CFG.benefits_close, 19), COVER_FROM = isoDay(CFG.benefits_start, 28);
function benefitsOn() { return PLANS.some(p => p.kind === 'medical'); }
const enrollOpen = (d) => d >= ENROLL_FROM && d <= ENROLL_TO;
const nextPayday = (d) => { for (let n = d + 1; n < d + 40; n++) if (isPayday(n)) return n; return d + 14; };          // the first payday after day d
function election(s) {          // 'med_ppo+den_ppo+vis_plan+4@d4_benefits' → { medical, dental, vision, pct, ep }; a kind left out: its cheapest (no coverage)
  const [list, ep] = String(s || '').split('@'), out = { ep: ep || null };
  String(list || '').split('+').map(x => x.trim()).filter(Boolean).forEach(x => { if (/^\d+(\.\d+)?$/.test(x)) out.pct = +x; else if (PLAN[x]) out[PLAN[x].kind] = x; });
  PLAN_KINDS.forEach(k => { if (!out[k]) { const p = PLANS.filter(x => x.kind === k).sort((a, b) => (+a.premium || 0) - (+b.premium || 0))[0]; out[k] = p ? p.id : null; } });
  return out;
}
const picksOf = (e) => ({ medical: e.medical, dental: e.dental, vision: e.vision });
const defaultPlans = () => picksOf(election(CFG.benefits_default));
const nowSpec = (id) => election((listOf(CFG.benefits_now).map(x => x.split(':')).find(x => x[0] === id) || [])[1] || CFG.benefits_default);
const benefits = () => G.benefits || (G.benefits = { k401: [], draft: null, pick: null, sent: null, hsa: 0, saved: { me: 0, co: 0 }, stubs: [] });
function before() {          // the hero's plans and 401(k) until the new plans start
  const e = nowSpec(G.hero);
  return e.ep && !G.done[e.ep] ? Object.assign(defaultPlans(), { pct: K401_AUTO }) : Object.assign(picksOf(e), { pct: e.pct != null ? e.pct : K401_AUTO });
}
const plansOn = (d) => d >= COVER_FROM ? Object.assign({}, benefits().pick || defaultPlans()) : picksOf(before());
function k401On(d) { const c = benefits().k401.filter(x => x.from <= d).pop(); return c ? c.pct : before().pct; }
const planName = (id, ko) => PLAN[id] ? (ko ? PLAN[id].name_ko || PLAN[id].name : PLAN[id].name) : String(id || '');
const planList = (p, ko) => PLAN_KINDS.map(k => p[k]).filter(id => PLAN[id] && (PLAN[id].kind === 'medical' || +PLAN[id].premium > 0)).map(id => planName(id, ko)).join(', ');          // no 'No dental coverage'
function stubLines(gross, picks, k401Pct, rate) {
  gross = cents(gross);
  const prem = PLAN_KINDS.map(k => PLAN[picks[k]]).filter(Boolean).map(p => ({ id: p.id, kind: p.kind, amt: cents(+p.premium || 0) }));
  const pre = cents(prem.reduce((a, p) => a + p.amt, 0)), k401 = cents(gross * k401Pct / 100), fica = gross - pre, taxable = cents(gross - pre - k401);
  const ss = cents(fica * TAX_SS), medicare = cents(fica * TAX_MED), state = cents(taxable * TAX_STATE), fed = cents(taxable * rate);
  const match = cents(gross * Math.min(k401Pct, MATCH_UP_TO) / 100 * MATCH), hsa = PLAN[picks.medical] ? +PLAN[picks.medical].hsa || 0 : 0;
  return { gross, prem, pre, pct: k401Pct, k401, ss, medicare, state, fed, taxable, match, hsa, plans: Object.assign({}, picks), net: cents(gross - pre - k401 - ss - medicare - state - fed) };
}
const fedMemo = {};
function fedRate() {          // the hero's federal rate: what brings the plans of benefits_now to salary_net
  const h = hero();
  if (fedMemo[h.id] != null) return fedMemo[h.id];
  const e = nowSpec(h.id), s = stubLines(+h.salary_gross, picksOf(e), e.pct != null ? e.pct : K401_AUTO, 0);
  return (fedMemo[h.id] = s.taxable > 0 ? clamp((s.net - +h.salary_net) / s.taxable, 0, 0.5) : 0.12);
}
// a paycheck on day d (today by default) with the plans and the 401(k) in effect then, or the ones given
function payStub(d, picks, k401Pct) {
  d = d == null ? G.day : d;
  return Object.assign(stubLines(+hero().salary_gross * ((G && G.raise) || 1), picks || plansOn(d), k401Pct != null ? k401Pct : k401On(d), fedRate()), { day: d });
}
function planOf(d) {          // for the pharmacy and the clinic: the plan rows on day d (today by default), the 401(k) percent, the HSA balance
  if (!G || !benefitsOn()) return null;
  d = d == null ? G.day : d;
  const p = plansOn(d);
  return { medical: PLAN[p.medical] || null, dental: PLAN[p.dental] || null, vision: PLAN[p.vision] || null, k401: k401On(d), hsa: benefits().hsa || 0 };
}
function copayFor(kind, d) {          // what you pay for a kind of care (a key of CARE) on day d with your plans; null when no plan prices it
  const p = planOf(d);
  if (!p) return null;
  for (const k of PLAN_KINDS) { const c = p[k] && p[k].copays; if (c && c[kind] != null) return +c[kind]; }
  return null;
}
function draftOf() { const B = benefits(); return B.draft || (B.draft = Object.assign({}, B.pick || picksOf(before()))); }
function set401k(p) {          // from the next paycheck
  p = Math.round(+p);
  if (!G || fired() || !benefitsOn() || !Number.isFinite(p)) return false;
  p = clamp(p, 0, K401_MAX);
  const B = benefits(), from = nextPayday(G.day);
  B.k401 = B.k401.filter(x => x.from < from).concat({ from, pct: p });
  logEvent('benefits', `401(k) set to ${p}%`, 0, { ko: `401(k) ${p}%로 바꿈` });
  return true;
}
// submit in open enrollment: the draft, or { medical, dental, vision }, or 'plan+plan+plan' (a kind left out: none)
function enroll(choice) {
  if (!G || fired() || !benefitsOn() || !enrollOpen(G.day)) return false;
  const B = benefits(), want = typeof choice === 'string' ? election(choice) : choice || {}, pick = Object.assign({}, draftOf());
  PLAN_KINDS.forEach(k => { if (want[k] && PLAN[want[k]] && PLAN[want[k]].kind === k) pick[k] = want[k]; });
  if (PLAN_KINDS.some(k => !PLAN[pick[k]] || PLAN[pick[k]].kind !== k)) return false;
  B.pick = pick; B.draft = Object.assign({}, pick); B.sent = G.day;
  const first = nextPayday(COVER_FROM - 1), s = payStub(first, pick);
  notify(HR, `Your benefits choices are in: ${planList(pick)}. They start ${dateLong(COVER_FROM)}. From your paycheck on ${dateLong(first)} the premiums come to ${usd2(s.pre)}, before tax. You can change them in the HR portal until ${dateLong(ENROLL_TO)}.`,
    `복리후생 선택이 접수됐어요: ${planList(pick, true)}. ${dateKo(COVER_FROM)}에 시작해요. ${dateKo(first)} 급여부터 보험료 ${usd2(s.pre)}가 세전으로 빠져요. ${dateKo(ENROLL_TO)}까지는 HR 포털에서 바꿀 수 있어요.`, 'email');
  logEvent('benefits', 'Benefits enrollment submitted', 0, { ko: '복리후생 가입 제출' });
  saveGame();
  return true;
}
// the morning (from goToSleep): open enrollment and its last days, missing it, the new plans starting
function benefitsMorning() {
  const out = [];
  if (!G || fired() || !benefitsOn()) return out;
  const B = benefits(), d = G.day, me = hero().name_ko || G.name, dflt = defaultPlans();
  if (enrollOpen(d) && !B.sent) {
    const left = ENROLL_TO - d + 1, when = left === 1 ? ['today is the last day', '오늘이 마지막 날'] : left <= 3 ? [`${left} days left`, `${left}일 남음`] : null;
    out.push(tr(`🩺 <b>Open enrollment</b>: pick your medical, dental and vision plans in the HR portal (on your phone or in your work record) by ${esc(dateLong(ENROLL_TO))}${when ? ` (${when[0]})` : ''}. Without it you get the ${esc(planName(dflt.medical))} with no dental or vision.`,
      `🩺 <b>복리후생 정기 가입</b>: ${esc(dateKo(ENROLL_TO))}까지 HR 포털(휴대전화나 근무 기록)에서 의료·치과·안과 플랜을 고르세요${when ? `(${when[1]})` : ''}. 안 하면 치과·안과 없이 ${esc(planName(dflt.medical, true))}에 가입돼요.`));
    if (left <= 3 && !B.reminded) {
      B.reminded = d;
      notify(HR, `Hi ${G.name}, I don't see your benefits choices yet. Open enrollment closes ${dateLong(ENROLL_TO)}. If you don't submit, you'll get the ${planName(dflt.medical)} with no dental or vision from ${dateLong(COVER_FROM)}.`,
        `${me} 님, 아직 복리후생 선택이 안 보여요. 정기 가입은 ${dateKo(ENROLL_TO)}에 끝나요. 제출하지 않으면 ${dateKo(COVER_FROM)}부터 치과·안과 없이 ${planName(dflt.medical, true)}에 가입돼요.`, 'email');
    }
  }
  if (d > ENROLL_TO && !B.sent && !B.missed) {
    B.missed = d;
    notify(HR, `${G.name}, open enrollment closed and I didn't get your choices, so from ${dateLong(COVER_FROM)} you'll have the ${planName(dflt.medical)}, just you, with no dental or vision. You can change it at the next open enrollment, or within 30 days of a life event like getting married or having a baby.`,
      `${me} 님, 정기 가입이 끝났는데 선택한 플랜을 받지 못했어요. 그래서 ${dateKo(COVER_FROM)}부터는 치과·안과 없이 본인만 ${planName(dflt.medical, true)}에 가입돼요. 다음 정기 가입 때나, 결혼·출산 같은 생활의 변화가 있으면 30일 안에 바꿀 수 있어요.`, 'email');
    out.push(tr(`🩺 You missed open enrollment, so from ${esc(dateLong(COVER_FROM))} you have the <b>${esc(planName(dflt.medical))}</b> with no dental or vision.`, `🩺 복리후생 정기 가입을 놓쳐서 ${esc(dateKo(COVER_FROM))}부터 치과·안과 없이 <b>${esc(planName(dflt.medical, true))}</b>에 가입돼요.`));
  }
  if (d >= COVER_FROM && !B.started) {
    B.started = d;
    const p = plansOn(d);
    out.push(tr(`🩺 Your new benefits have started: ${esc(planList(p))}. Your insurance cards are in the mail.`, `🩺 새 복리후생이 시작됐어요: ${esc(planList(p, true))}. 보험 카드는 우편으로 와요.`));
  }
  return out;
}
// payday (from goToSleep, after the deposit): keep the stub, add to the 401(k) and the HSA; a line for the morning card
function benefitsPaid(net, cut) {
  if (!G || !benefitsOn()) return [];
  const B = benefits(), s = Object.assign(payStub(G.day), { unpaid: cut || 0, paid: net });
  B.stubs = (B.stubs || []).concat(s).slice(-6);
  const sv = B.saved || { me: 0, co: 0 };
  B.saved = { me: cents(sv.me + s.k401), co: cents(sv.co + s.match) };
  if (s.hsa) B.hsa = cents((B.hsa || 0) + s.hsa);
  const tax = cents(s.fed + s.state + s.ss + s.medicare);
  return [tr(`🧾 Pay stub: ${usd2(s.gross)} − taxes ${usd2(tax)} − insurance ${usd2(s.pre)} − 401(k) ${usd2(s.k401)}${cut ? ` − unpaid days ${usd2(cut)}` : ''} = <b>${usd2(Math.max(0, net))}</b>. The whole stub is in the Bank.`,
    `🧾 급여명세서: ${usd2(s.gross)} − 세금 ${usd2(tax)} − 보험료 ${usd2(s.pre)} − 401(k) ${usd2(s.k401)}${cut ? ` − 무급 휴가 ${usd2(cut)}` : ''} = <b>${usd2(Math.max(0, net))}</b>. 자세한 명세서는 은행에 있어요.`)];
}
function stubHtml(s) {          // gross, then what comes out, in the order Linda reads it (federal, FICA, state, insurance, 401(k)), then net
  const line = (en, ko, amt, cls) => `<tr${cls ? ` class="${cls}"` : ''}><td>${esc(tr(en, ko))}</td><td>${amt}</td></tr>`, minus = (n) => '−' + usd2(n), r = (x) => +(x * 100).toFixed(2);
  return `<table class="stub">${[line('Gross pay', '세전 급여', usd2(s.gross), 'top'), line('Federal income tax', '연방 소득세', minus(s.fed)),
    line(`Social Security (${r(TAX_SS)}%)`, `사회보장세 (${r(TAX_SS)}%)`, minus(s.ss)), line(`Medicare (${r(TAX_MED)}%)`, `메디케어 (${r(TAX_MED)}%)`, minus(s.medicare)),
    line('State income tax', '주 소득세', minus(s.state)),
    ...s.prem.filter(p => p.amt).map(p => line(`${PLAN_KIND_NAME[p.kind][0]}: ${planName(p.id)}`, `${PLAN_KIND_NAME[p.kind][1]}: ${planName(p.id, true)}`, minus(p.amt))),
    line(`401(k) (${s.pct}%)`, `401(k) (${s.pct}%)`, minus(s.k401)), s.unpaid ? line('Unpaid days off', '무급 휴가', minus(s.unpaid)) : '',
    line('Net pay', '실수령액', usd2(s.paid != null ? Math.max(0, s.paid) : s.net), 'net')].join('')}</table>
    <p class="fine">${tr(`Insurance and the 401(k) come out before tax, so they lower your income tax.${s.match || s.hsa ? ` On top, from ${esc(CFG.company)}: ${[s.match ? `401(k) match ${usd2(s.match)}` : '', s.hsa ? `HSA ${usd2(s.hsa)}` : ''].filter(Boolean).join(' · ')}.` : ''}`,
      `보험료와 401(k)는 세전으로 빠져서 소득세가 줄어요.${s.match || s.hsa ? ` 회사가 따로 넣어 준 돈: ${[s.match ? `401(k) 매칭 ${usd2(s.match)}` : '', s.hsa ? `HSA ${usd2(s.hsa)}` : ''].filter(Boolean).join(' · ')}.` : ''}`)}</p>`;
}
function stubBox() {          // the Bank: the last pay stub
  if (!G || !benefitsOn()) return '';
  const last = (benefits().stubs || []).slice(-1)[0];
  return last ? `<h3>${tr('Pay stub', '급여명세서')} · ${esc(dShort(last.day))}</h3>${stubHtml(last)}` : '';
}
function benefitsLink(phone) {          // the way into the HR portal: the Work record always, the phone in open enrollment
  if (!G || fired() || !benefitsOn() || (phone && !enrollOpen(G.day))) return '';
  return `<p class="fine leave-ask"><button type="button" data-benefits="open">${enrollOpen(G.day) ? tr(`🩺 HR portal: open enrollment (until ${esc(dShort(ENROLL_TO))})`, `🩺 HR 포털: 복리후생 정기 가입 (${esc(dShort(ENROLL_TO))}까지)`) : tr('🩺 HR portal: benefits and pay', '🩺 HR 포털: 복리후생과 급여')}</button></p>`;
}
function benefitsPanel(h, sub, body) {
  h.textContent = tr('HR portal', 'HR 포털');
  sub.textContent = tr(`${CFG.company} · Benefits and pay`, `${ZONE_NAMES.office[1] || CFG.company} · 복리후생과 급여`);
  const B = benefits(), d = G.day, open = enrollOpen(d) && !fired(), dflt = defaultPlans();
  const sel = open ? draftOf() : d > ENROLL_TO ? plansOn(Math.max(d, COVER_FROM)) : plansOn(d), changed = open && B.sent && PLAN_KINDS.some(k => sel[k] !== B.pick[k]);
  const left = ENROLL_TO - d + 1;
  const head = d < ENROLL_FROM ? tr(`Open enrollment for the plans that start ${esc(dateLong(COVER_FROM))} runs ${esc(dMonth(ENROLL_FROM))} – ${esc(dMonth(ENROLL_TO))}. These are your plans until then.`, `${esc(dateKo(COVER_FROM))}에 시작하는 플랜의 정기 가입은 ${esc(dMonth(ENROLL_FROM))}부터 ${esc(dMonth(ENROLL_TO))}까지예요. 그때까지는 지금 플랜이에요.`)
    : open ? tr(`<b>Open enrollment is open</b> until ${esc(dateLong(ENROLL_TO))}${left === 1 ? ' (the last day)' : ` (${left} days left)`}. Pick one plan of each kind and submit; you can change and submit again until it closes. The new plans start ${esc(dateLong(COVER_FROM))}. If you don't submit, you get the ${esc(planName(dflt.medical))} with no dental or vision.`,
      `<b>복리후생 정기 가입 기간</b>이에요. ${esc(dateKo(ENROLL_TO))}까지${left === 1 ? '(오늘이 마지막 날)' : `(${left}일 남음)`} 종류마다 플랜을 하나씩 골라 제출하세요. 마감 전에는 바꿔서 다시 제출할 수 있어요. 새 플랜은 ${esc(dateKo(COVER_FROM))}에 시작해요. 제출하지 않으면 치과·안과 없이 ${esc(planName(dflt.medical, true))}에 가입돼요.`)
      : tr(`Your plans ${d >= COVER_FROM ? 'since' : 'from'} ${esc(dateLong(COVER_FROM))}${B.missed && !B.sent ? ' (you missed open enrollment, so you have the default)' : ''}. You can change them at the next open enrollment, or within 30 days of a life event such as getting married or having a baby.`,
        `${esc(dateKo(COVER_FROM))}부터의 플랜이에요${B.missed && !B.sent ? '(정기 가입을 놓쳐서 기본 플랜이에요)' : ''}. 다음 정기 가입 때나, 결혼·출산 같은 생활의 변화가 있으면 30일 안에 바꿀 수 있어요.`);
  const status = !open ? '' : B.sent && !changed ? tr(`✅ Submitted on ${esc(dShort(B.sent))}. These are your plans from ${esc(dShort(COVER_FROM))}.`, `✅ ${esc(dShort(B.sent))}에 제출했어요. ${esc(dShort(COVER_FROM))}부터 이 플랜이에요.`)
    : changed ? tr('⚠️ You changed something: submit again to keep it.', '⚠️ 바꾼 것이 있어요. 다시 제출해야 반영돼요.') : tr('⚠️ Not submitted yet.', '⚠️ 아직 제출하지 않았어요.');
  const plans = PLAN_KINDS.map(k => `<h3>${tr(PLAN_KIND_NAME[k][0], PLAN_KIND_NAME[k][1])}</h3>` + PLANS.filter(p => p.kind === k).map(p => {
    const on = sel[k] === p.id, c = p.copays || {};
    const facts = [+p.deductible ? tr(`deductible ${usd(+p.deductible)}`, `공제액 ${usd(+p.deductible)}`) : '', +p.oop_max ? tr(`out-of-pocket max ${usd(+p.oop_max)}`, `본인 부담 상한 ${usd(+p.oop_max)}`) : '',
      ...Object.keys(c).map(x => `${tr((CARE[x] || [x])[0], (CARE[x] || [])[1])} ${usd(+c[x])}`)].filter(Boolean);
    return `<div class="row plan${on ? ' on' : ''}"><div class="main"><div class="t">${esc(loc(p))}${on && !open ? ' ✓' : ''}</div><div class="s">${esc(facts.join(' · '))}</div><div class="s">${esc(tr(p.note, p.note_ko))}</div></div>
      <span class="price">${usd2(+p.premium || 0)}<small>${tr(' /paycheck', ' /급여')}</small></span>${open ? `<button type="button" data-benefits="pick:${esc(p.id)}" aria-pressed="${on}">${on ? tr('Chosen', '선택함') : tr('Choose', '고르기')}</button>` : ''}</div>`;
  }).join('')).join('');
  const next = nextPayday(d), cur = k401On(next), gross = payStub(next).gross, lost = cents(gross * Math.max(0, MATCH_UP_TO - cur) / 100 * MATCH);
  const k401 = `<h3>401(k)</h3><p class="fine">${tr(`You put <b>${cur}%</b> of every paycheck into your retirement account, before tax. ${esc(CFG.company)} adds ${MATCH === 1 ? 'the same amount' : `${Math.round(MATCH * 100)}% of it`}, up to ${MATCH_UP_TO}% of your pay. A change counts from the paycheck on ${esc(dShort(next))}.`,
    `급여마다 <b>${cur}%</b>를 세전으로 퇴직연금 계좌에 넣어요. ${esc(ZONE_NAMES.office[1] || CFG.company)}는 급여의 ${MATCH_UP_TO}%까지 ${MATCH === 1 ? '같은 금액을' : `그 ${Math.round(MATCH * 100)}%를`} 더 넣어 줘요. 바꾸면 ${esc(dShort(next))} 급여부터 적용돼요.`)}</p>
    ${fired() ? '' : `<div class="leave-ask k401"><button type="button" data-benefits="k401:${cur - 1}" aria-label="${tr('Less', '줄이기')}" ${cur <= 0 ? 'disabled' : ''}>−</button><b>${cur}%</b><button type="button" data-benefits="k401:${cur + 1}" aria-label="${tr('More', '늘리기')}" ${cur >= K401_MAX ? 'disabled' : ''}>+</button>
      <span class="fine">${lost ? tr(`You're leaving ${usd2(lost)} of the company's money on the table every paycheck.`, `급여마다 회사가 주는 돈 ${usd2(lost)}를 놓치고 있어요.`) : tr(`You get the full match: ${usd2(cents(gross * Math.min(cur, MATCH_UP_TO) / 100 * MATCH))} a paycheck.`, `매칭을 다 받아요: 급여마다 ${usd2(cents(gross * Math.min(cur, MATCH_UP_TO) / 100 * MATCH))}.`)}</span></div>`}
    <p class="fine">${tr(`Paid in so far: you ${usd2(B.saved.me)}, ${esc(CFG.company)} ${usd2(B.saved.co)}.${B.hsa || plansOn(next).medical && +(PLAN[plansOn(next).medical] || {}).hsa ? ` Your HSA: ${usd2(B.hsa || 0)}.` : ''}`, `지금까지 넣은 돈: 나 ${usd2(B.saved.me)}, 회사 ${usd2(B.saved.co)}.${B.hsa || plansOn(next).medical && +(PLAN[plansOn(next).medical] || {}).hsa ? ` HSA 잔액: ${usd2(B.hsa || 0)}.` : ''}`)}</p>`;
  // your paycheck: the first one with the plans on screen (in open enrollment: the ones you are picking)
  const first = open || (d > ENROLL_TO && d < COVER_FROM) ? nextPayday(COVER_FROM - 1) : next, s = payStub(first, sel), now = payStub(next), diff = cents(s.net - now.net);
  const pay = `<h3>${tr('Your paycheck', '내 급여')}</h3><p class="fine">${first === next ? tr(`Next paycheck, ${esc(dShort(next))}: <b>${usd2(s.net)}</b>.`, `다음 급여 ${esc(dShort(next))}: <b>${usd2(s.net)}</b>.`)
    : tr(`Next paycheck, ${esc(dShort(next))}: <b>${usd2(now.net)}</b>. With ${open ? 'these choices' : 'these plans'}, from ${esc(dShort(first))}: <b>${usd2(s.net)}</b>${diff ? ` (${diff > 0 ? '+' : '−'}${usd2(Math.abs(diff))})` : ''}.`,
      `다음 급여 ${esc(dShort(next))}: <b>${usd2(now.net)}</b>. ${open ? '지금 고른 플랜으로' : '이 플랜으로'} ${esc(dShort(first))}부터: <b>${usd2(s.net)}</b>${diff ? `(${diff > 0 ? '+' : '−'}${usd2(Math.abs(diff))})` : ''}.`)}</p>${stubHtml(s)}`;
  body.innerHTML = `<p class="fine">${head}</p>${status ? `<p class="fine"><b>${status}</b></p>` : ''}${plans}
    ${open ? `<p class="fine leave-ask"><button type="button" data-benefits="submit">${B.sent ? tr('Submit again', '다시 제출') : tr('Submit my choices', '선택 제출')}</button></p>` : ''}${k401}${pay}`;
}
function benefitsClick(what) {
  const [k, v] = String(what).split(':'), y = panel.querySelector('.panel-body').scrollTop;
  if (k === 'open') { openPanel('benefits'); return; }
  let ok = false;
  if (k === 'pick' && PLAN[v] && enrollOpen(G.day) && !fired()) { draftOf()[PLAN[v].kind] = v; ok = true; }
  else if (k === 'k401') ok = set401k(+v);
  else if (k === 'submit' && (ok = enroll())) note(tr('Submitted. HR sent you a confirmation email.', '제출했어요. 인사팀이 확인 이메일을 보냈어요.'));
  if (ok) { saveGame(); renderPanel(); panel.querySelector('.panel-body').scrollTop = y; }
}
on('morning', () => benefitsMorning(), 220);          // open enrollment, missing it, the new plans starting
// SO.debug
debugPart({
  // benefits: the save's G.benefits with the plans in effect today and from the start date; enroll(choice?) submits the draft or 'plan+plan+plan';
  // draft(planId) picks one in the portal; set401k(pct); payStub(day?) and the helpers for the pharmacy and the clinic, planOf(day?), copayFor(kind, day?)
  get benefits() { return G ? Object.assign(JSON.parse(JSON.stringify(benefits())), { now: plansOn(G.day), from: plansOn(COVER_FROM), pct: k401On(nextPayday(G.day)), open: enrollOpen(G.day), on: benefitsOn() }) : null; },
  enroll(choice) { return enroll(choice); }, draft(id) { if (!G || !PLAN[id] || !enrollOpen(G.day)) return false; draftOf()[PLAN[id].kind] = id; return true; }, set401k(p) { return set401k(p); },
  payStub(d) { return G ? payStub(d == null ? G.day : +d) : null; }, planOf(d) { return planOf(d); }, copayFor(kind, d) { return copayFor(kind, d); }
});

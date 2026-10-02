/* Sim Office — the phone (texts, emails, voicemails, alerts) and the mailbox at home. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- the phone: texts, emails, voicemails and alerts
// Messages (messages table) arrive when the clock passes their day and time, the bank's alerts (notify) when
// something happens to the account. Kept in the save: G.got { id: 1 unread | 2 read }, G.notes [{ day, minute,
// sender, kind, body, body_ko, read }]. Menu > Phone (P) lists them, newest first.
const MSG_KIND = { text: 'Text', email: 'Email', voicemail: 'Voicemail', alert: 'Alert' }, MSG_KIND_KO = { text: '문자', email: '이메일', voicemail: '음성 메시지', alert: '알림' };
const senderName = (id) => NPCS[id] ? fullName(NPCS[id]) : String(id || '');
// A message or a letter can come back (messages/mail every: days between, 30 or more = the same date every month;
// last_day: the last game day it can come): each time is its own message, '<id>@<day>' after the first. After the
// missions the engine also sends the weather service's alerts (rain, fog, a freeze) and an email from each company
// on autopay five days before the bill (bills.company). Kept per day (recurMemo).
function occurrences(r, upTo) {
  const every = +r.every || 0, last = Math.min(upTo, r.last_day == null ? Infinity : +r.last_day), out = [];
  if (!every) return r.day <= last ? [r.day] : [];
  if (every >= 30 && START != null) { const dom = dateOf(r.day).getUTCDate(); for (let d = r.day; d <= last; d++) if (onDateOfMonth(d, dom)) out.push(d); }
  else for (let d = r.day; d <= last; d += every) out.push(d);
  return out;
}
const recurMemo = {};
function recurring(list, key, upTo, shift) {          // the rows of a table as they arrive, up to a day (memo per hero and day)
  const k = key + '@' + G.hero + '@' + upTo;
  if (recurMemo[k]) return recurMemo[k];
  const out = [];
  list.filter(m => (!m.hero || m.hero === 'all' || m.hero === G.hero) && m.sender !== G.hero).forEach(m => occurrences(m, upTo).forEach(d => {
    const day = shift ? shift(d) : d;
    if (day <= upTo) out.push(d === m.day ? Object.assign({}, m, { day }) : Object.assign({}, m, { id: m.id + '@' + d, day, base: m.id }));
  }));
  if (key === 'msg') made(upTo).forEach(m => out.push(m));
  if (key === 'mail') creditMail(upTo).forEach(m => out.push(m));          // the bank's letters about the credit card
  out.sort((a, b) => (a.day - b.day) || (hm(a.time, 0) - hm(b.time, 0)));
  Object.keys(recurMemo).filter(x => x.startsWith(key + '@')).forEach(x => delete recurMemo[x]);
  return (recurMemo[k] = out);
}
const fmtDate = (d) => { const t = dateOf(d); return t ? [`${MONTHS[t.getUTCMonth()].slice(0, 3)} ${t.getUTCDate()}`, `${t.getUTCMonth() + 1}월 ${t.getUTCDate()}일`] : [`day ${d}`, `${d}일째`]; };
function made(upTo) {          // the engine's own: weather alerts and bill statements, after the missions
  const out = [], WXS = CFG.weather_sender || 'Fairview Weather';
  for (let d = MISSION_DAYS + 1; d <= upTo; d++) {
    const w = weatherOf(d);
    if (MESSAGES.some(m => m.day === d && m.sender === WXS)) continue;
    const msg = w.kind === 'rain' ? [`Rain today, with a high of ${w.high_f}°F. Allow extra time for your commute and bring an umbrella.`, `오늘 비, 최고 ${toC(w.high_f)}°C. 출근길에 시간 여유를 두고 우산을 챙기세요.`]
      : w.kind === 'fog' ? ['Dense fog advisory until 10 AM. Slow down and use your low beams.', '오전 10시까지 짙은 안개 주의보. 속도를 줄이고 하향등을 켜세요.']
        : w.low_f <= 32 ? [`Freeze warning tonight: a low of ${w.low_f}°F. Bring pets and plants inside and cover outdoor pipes.`, `오늘 밤 한파 경보: 최저 ${toC(w.low_f)}°C. 반려동물과 화분은 안으로 들이고 바깥 수도관을 덮으세요.`] : null;
    if (msg) out.push({ id: 'wx@' + d, day: d, time: '06:45', kind: 'alert', sender: WXS, body: msg[0], body_ko: msg[1] });
  }
  rows('bills').filter(b => b.company).forEach(b => {
    for (let d = MISSION_DAYS + 6; d <= upTo + 5; d++) if (billsDue(d).includes(b) && d - 5 <= upTo) {
      const [en, ko] = fmtDate(d);
      out.push({ id: 'bill_' + b.id + '@' + d, day: d - 5, time: '08:10', kind: 'email', sender: b.company, subject: 'Your statement is ready', subject_ko: '이번 달 명세서가 나왔습니다',
        body: `Your ${String(b.name).toLowerCase()} statement is ready: ${usd2(+b.amount)} due ${en}. AutoPay is on, so it will be paid from checking ···4821 that day. No action needed.`,
        body_ko: `${b.name_ko || b.name} 명세서가 나왔습니다. ${ko}에 ${usd2(+b.amount)}가 빠져나갑니다. 자동이체가 설정되어 있어 따로 하실 일은 없습니다.` });
    }
  });
  return out;
}
const myMessages = () => recurring(MESSAGES, 'msg', G.day);
const unread = () => !G ? 0 : myMessages().filter(m => (G.got || {})[m.id] === 1).length + (G.notes || []).filter(n => !n.read).length;
const sound = (function () {          // small sounds made with Web Audio (no files): the phone's chime
  let ctx = null, failed = false;
  function context() {
    if (!ctx && !failed) { try { const A = window.AudioContext || window.webkitAudioContext; if (A) ctx = new A(); else failed = true; } catch (e) { failed = true; } }
    if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  }
  function tone(freq, at, dur, vol, type, cut) {
    const c = context();
    if (!c || c.state !== 'running') return;
    try {
      const o = c.createOscillator(), g = c.createGain(), t = c.currentTime + at;
      o.type = type || 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
      g.gain.exponentialRampToValueAtTime(vol * 0.8, t + dur * 0.8);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      let out = o;
      if (cut) { const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = cut; o.connect(f); out = f; }
      out.connect(g); g.connect(c.destination);
      o.start(t); o.stop(t + dur + 0.02);
    } catch (e) { /* no sound */ }
  }
  return { context, chime() { tone(1318.5, 0, 0.22, 0.07); tone(1760, 0.11, 0.3, 0.06); },
    ring() { [0, 0.5, 1.4, 1.9].forEach(t => { tone(440, t, 0.4, 0.05); tone(480, t, 0.4, 0.05); }); },
    honk(vol) { [[0, 0.16], [0.24, 0.42]].forEach(([t, d]) => { tone(415, t, d, 0.05 * vol, 'sawtooth', 1400); tone(523, t, d, 0.04 * vol, 'sawtooth', 1400); }); } };
})();
function phoneBadge() {
  const n = unread(), b = $('menu-btn'), p = document.querySelector('#menu button[data-open="phone"]');
  if (n) b.dataset.n = n > 9 ? '9+' : String(n); else delete b.dataset.n;
  if (p) p.textContent = tr('Phone', '휴대전화') + (n ? ` (${n})` : '');
}
let hush = false;                // overnight the alerts arrive without a sound: the morning card tells
function ping(sender, kind, text, ko) {
  if (state !== 'play' || hush) return;
  const cut = (t, n) => String(t).length > n ? String(t).slice(0, n - 2).replace(/\s+\S*$/, '') + '…' : String(t);
  const short = cut(text, 84), shortKo = ko ? cut(ko, 70) : '';
  toast(kind === 'voicemail' ? `📞 Missed call from ${senderName(sender)}. Voicemail: ${short}` : `📱 ${MSG_KIND[kind] || 'Message'} from ${senderName(sender)}: ${short}`,
    shortKo && (kind === 'voicemail' ? `📞 ${senderName(sender)}의 부재중 전화. 음성 메시지: ${shortKo}` : `📱 ${senderName(sender)}의 ${MSG_KIND_KO[kind] || '메시지'}: ${shortKo}`), 'phone', 6);
  if (kind === 'voicemail') sound.ring(); else sound.chime();
}
function notify(sender, body, ko, kind) {
  if (!G) return;
  G.notes = (G.notes || []).concat({ day: G.day, minute: Math.floor(G.minute), sender, kind: kind || 'alert', body, body_ko: ko || '', read: 0 }).slice(-40);
  ping(sender, kind || 'alert', body, ko);
  phoneBadge();
}
function checkPhone() {          // what has come in by now (only while you are walking about: not in the middle of a conversation)
  if (!G || state !== 'play') return;
  busAlert();
  ordersTick();          // packages: tracking, the driver at the door
  G.got = G.got || {};
  const now = G.day * 1440 + G.minute;
  const back = (G.later || []).filter(x => x.at <= now);
  if (back.length) {           // the answers to your replies
    G.later = G.later.filter(x => x.at > now);
    back.forEach(x => notify(x.sender, x.body, x.body_ko, x.kind));
  }
  const due = myMessages().filter(m => !G.got[m.id] && (m.day < G.day || (m.day === G.day && hm(m.time, 0) <= G.minute)));
  if (!due.length) { if (back.length) saveGame(); return; }
  due.forEach(m => { G.got[m.id] = 1; });
  const fresh = due.filter(m => m.day === G.day && G.minute - hm(m.time, 0) < 120).pop();
  if (fresh) ping(fresh.sender, fresh.kind, fresh.subject || personal(fresh.body), fresh.subject ? fresh.subject_ko : fresh.body_ko);
  phoneBadge();
}
function inbox() {               // everything that has arrived, newest first
  const got = G.got || {};
  return myMessages().filter(m => got[m.id]).map(m => ({ n: -1, id: m.id, day: m.day, minute: hm(m.time, 0), sender: m.sender, kind: m.kind, subject: m.subject, subject_ko: m.subject_ko, body: personal(m.body), body_ko: m.body_ko, fresh: got[m.id] === 1 }))
    .concat((G.notes || []).map((n, i) => ({ n: i, day: n.day, minute: n.minute, sender: n.sender, kind: n.kind, body: n.body, body_ko: n.body_ko, fresh: !n.read })))
    .sort((a, b) => (b.day - a.day) || (b.minute - a.minute) || (b.n - a.n)).slice(0, 80);          // the newest 80
}
function readAll() {
  Object.keys(G.got || {}).forEach(id => { G.got[id] = 2; });
  (G.notes || []).forEach(n => { n.read = 1; });
  phoneBadge();
}

// Answering a message: a text or email goes out and the answer comes back a few minutes later (G.later), a
// voicemail is called back and the call is heard at once. G.replied { messageId: replyId } keeps what you said.
const repliesTo = (id) => REPLIES.filter(r => r.msg === id);
function replyTo(msgId, replyId) {
  const m = myMessages().find(x => x.id === msgId), r = REPLIES.find(x => x.id === replyId && x.msg === msgId);
  if (!G || !m || !r || (G.replied || {})[msgId] || !(G.got || {})[msgId]) return false;
  (G.replied = G.replied || {})[msgId] = r.id;
  friendReply(m, r);
  const call = m.kind === 'voicemail';
  if (call) advanceMinutes(5);
  else if (r.answer) (G.later = G.later || []).push({ at: G.day * 1440 + Math.floor(G.minute) + Math.max(1, +r.delay || 10), sender: r.answer_from || m.sender,
    kind: m.kind === 'email' ? 'email' : 'text', body: personal(r.answer), body_ko: r.answer_ko || '' });
  logEvent('reply', call ? `Called back ${senderName(m.sender)}` : `Replied to ${senderName(m.sender)}`, 0, { ko: call ? `${senderName(m.sender)}에게 다시 전화함` : `${senderName(m.sender)}에게 답장함` });
  saveGame();
  return true;
}
const TONE = { good: ['👍', 'Natural', '자연스러워요'], ok: ['🙂', 'Understood, but stiff', '통하지만 딱딱해요'], poor: ['😬', 'Awkward', '어색해요'] };
function replyBox(m) {
  if (m.n !== -1 || !m.id) return '';
  const opts = repliesTo(m.id);
  if (!opts.length) return '';
  const call = m.kind === 'voicemail', done = (G.replied || {})[m.id], mine = opts.find(o => o.id === done);
  if (!mine) return `<div class="reply"><span class="ask">${call ? tr('📞 Call back and say:', '📞 다시 전화해서:') : tr('↩︎ Reply:', '↩︎ 답장:')}</span>${opts.map(o => `<button type="button" data-reply="${esc(m.id)}|${esc(o.id)}">${esc(shown(o.label, o.label_ko))}</button>`).join('')}</div>`;
  const t = TONE[mine.tone] || TONE.good, from = mine.answer_from || m.sender;
  return `<div class="reply done"><div class="said-me"><button type="button" class="play" data-say="${esc(personal(mine.label))}" data-voice="${esc(G.hero)}" aria-label="Play">▶</button><div><b>${tr('You', '나')}${call ? tr(' (call)', ' (통화)') : ''}:</b> ${esc(shown(mine.label, mine.label_ko))}</div></div>
    ${call && mine.answer ? `<div class="said-me"><button type="button" class="play" data-say="${esc(personal(mine.answer))}" data-voice="${NPCS[from] ? esc(from) : ''}" aria-label="Play">▶</button><div><b>${esc(senderName(from))}:</b> ${esc(shown(mine.answer, mine.answer_ko))}</div></div>` : ''}
    <div class="tone ${esc(mine.tone)}">${t[0]} ${tr(t[1], t[2])}${KO() && mine.tip_ko ? ' · ' + esc(mine.tip_ko) : ''}</div></div>`;
}

// ---------------------------------------------------------------- the mailbox at home: what the post brings
// Mail (mail table) comes Monday to Saturday after config mail_time, but not on federal holidays; G.mailGot { id: 1 }
// is what you have taken out of the mailbox. Check it outside your front door (the city map, at your building).
const mailTime = () => hm(CFG.mail_time, 13 * 60);
const mailDay = (d) => (d - 1) % 7 !== 6 && !dayOff(d);
const nextMailDay = (d) => { while (!mailDay(d)) d++; return d; };          // a letter due on a Sunday or a holiday comes the next mail day
const myMail = () => recurring(MAIL, 'mail', G.day, nextMailDay).filter(m => m.day < G.day || (m.day === G.day && G.minute >= mailTime()));
const newMail = () => !G ? [] : myMail().filter(m => !(G.mailGot || {})[m.id]);
const MAIL_ICON = { junk: '🗑️', bill: '🧾', letter: '✉️', notice: '📋', card: '💌' }, MAIL_KIND = { junk: 'Junk mail', bill: 'Bill', letter: 'Letter', notice: 'Notice', card: 'Card' };
const MAIL_KIND_KO = { junk: '광고 우편', bill: '청구서', letter: '편지', notice: '안내문', card: '카드' };
// SO.debug: the phone and the mailbox: what has arrived, unread, replies
debugPart({
  get inbox() { return G ? inbox() : []; }, get unread() { return unread(); }, checkPhone() { checkPhone(); return unread(); },
  reply(msgId, replyId) { return replyTo(msgId, replyId); }, get replied() { return G ? Object.assign({}, G.replied) : {}; }, get later() { return G ? (G.later || []).slice() : []; },
  get mail() { return G ? myMail().map(m => ({ id: m.id, day: m.day, kind: m.kind, fresh: !(G.mailGot || {})[m.id] })) : []; }, get newMail() { return newMail().length; }
});

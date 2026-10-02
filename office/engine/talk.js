/* Sim Office — conversations: an episode's turns, multiple choice. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- conversations: an episode's turns
const dlg = $('dialog');
let talk = null;          // { ep, turns, idx, actor, misses }
const personal = (s) => s == null ? '' : String(s).replace(/\{name\}/g, G ? G.name : heroOf(DEFAULT_HERO).name);          // English: shown and spoken
const personalKo = (s) => s == null ? '' : String(s).replace(/\{name\}/g, (G ? hero() : heroOf(DEFAULT_HERO)).name_ko || (G ? G.name : ''));
const shown = (en, ko) => KO() && ko ? personalKo(ko) : personal(en);          // a line on the screen, in its language
const myName = () => !G ? '' : KO() && hero().name_ko ? hero().name_ko : G.name;
function speakerOf(id) {
  if (!id) return talk && talk.actor;
  if (id === 'player' || id === 'you') return player;
  return npcActors[id] || (talk && talk.ep.npc === id ? talk.actor : null);
}
const speakerName = (id) => !id ? (talk ? fullName(npcRow(talk.ep.npc)) : '') : (id === 'player' || id === 'you') ? myName() : fullName(npcRow(id));
function beginEpisode(ep, actor) {
  if (+ep.reward < 0 && G.money + +ep.reward < 0) { toast(`You can't afford this (${usd2(-ep.reward)}).`, `돈이 부족해요 (${usd2(-ep.reward)}).`, 'bad'); return; }
  const turns = TURNS[ep.id] || [];
  actor = actor || npcActors[ep.npc] || null;
  talk = { ep, turns, idx: 0, actor, misses: 0, points: 0, best: 0 };
  state = 'talk';
  goalTarget = null;
  hideBubbles();
  if (actor && player) {
    player.want = Math.atan2(actor.pos.x - player.pos.x, actor.pos.z - player.pos.z);
    player.sit = false;
  }
  if (!turns.length) { completeEpisode(); return; }
  dlg.hidden = false;
  $('side').hidden = true;
  showTurn();
}
// A turn: the line, what you want to get across (the prompt), and four things you could say: the right one and three
// that sound fine but miss (a wrong fact, the wrong tone for the person, or not what was asked). A wrong one gets a
// reaction (turns.reactions) and you pick again; points go by how many tries it took (TURN_POINTS).
const TURN_POINTS = [10, 5, 2, 0];
const turnText = (t, k) => shown(t[k], t[k + '_ko']);
const choiceText = (t, i) => i < 0 ? turnText(t, 'model') : shown((t.distractors || [])[i], (t.distractors_ko || [])[i]);
function showTurn() {
  const t = talk.turns[talk.idx];
  talk.misses = 0;
  talk.wrong = [];
  talk.showing = 'line';
  talk.fb = null;
  talk.order = shuffle([-1].concat((t.distractors || []).slice(0, 3).map((_, i) => i)));
  dlg.classList.remove('answered');
  relangTurn();
  dlg.querySelector('.leave').hidden = false;
  dlg.querySelector('.next').hidden = true;
  const who = speakerOf(t.speaker);
  if (who && who !== player) { say(who, personal(t.line), t.line_ko && personalKo(t.line_ko), 4); play(who, 'interact-right', { once: true }); }
  speak(personal(t.line), voiceOf(npcRow(t.speaker || talk.ep.npc)));
}
// what the conversation window shows, in the language of the screen (again when the language changes)
function relangTurn() {
  const t = talk.turns[talk.idx];
  if (!t) return;
  dlg.querySelector('.ep').textContent = (talk.ep.remote ? '📹 ' : '') + loc(talk.ep, 'title');          // a video call (hybrid work)
  dlg.querySelector('.step').textContent = `${talk.idx + 1} / ${talk.turns.length}`;
  dlg.querySelector('.situation').textContent = turnText(t, 'situation');
  const reply = talk.showing === 'reply', rs = t.reply_speaker || t.speaker;
  dlg.querySelector('.who').textContent = speakerName(reply ? rs : t.speaker) + ':';
  dlg.querySelector('.say').textContent = reply ? shown(t.reply_line, t.reply_ko) : turnText(t, 'line');
  dlg.querySelector('.prompt').textContent = turnText(t, 'prompt');
  renderChoices();
  if (talk.fb) feedback(talk.fb[0], talk.fb[1], talk.fb[2]); else feedback('', '');
  const next = dlg.querySelector('.next');
  next.textContent = talk.idx + 1 < talk.turns.length ? tr('Continue ▸', '계속 ▸') : tr('Finish ▸', '마치기 ▸');
}
function renderChoices() {
  const t = talk.turns[talk.idx], box = dlg.querySelector('.choices');
  box.innerHTML = '';
  talk.order.forEach(i => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = choiceText(t, i);
    if (talk.wrong.includes(i)) { b.classList.add('wrong'); b.disabled = true; }
    b.addEventListener('click', () => pick(i));
    box.appendChild(b);
  });
}
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function feedback(kind, en, ko) {
  const f = dlg.querySelector('.feedback');
  f.className = 'feedback ' + kind;
  f.textContent = en ? tr(en, ko) : '';
  if (talk) talk.fb = en ? [kind, en, ko] : null;
}
// you said something that missed: you hear yourself, then how it went down
function pick(i) {
  if (!talk || dlg.classList.contains('answered')) return;
  if (i < 0) { answered(); return; }
  const t = talk.turns[talk.idx];
  if (talk.wrong.includes(i)) return;
  talk.misses++;
  talk.wrong.push(i);
  renderChoices();
  const said = personal((t.distractors || [])[i]);
  say(player, said, personalKo((t.distractors_ko || [])[i] || ''), 3);
  speak(said, heroVoice());
  play(player, 'emote-no', { once: true });
  const re = personal((t.reactions || [])[i] || ''), reKo = personalKo((t.reactions_ko || [])[i] || '');
  const name = speakerName(t.speaker).split(' ')[0], nameEn = npcRow(t.speaker || talk.ep.npc).name.split(' ')[0];
  if (!re) { feedback('miss', "That didn't come out right. Try something else.", '말이 잘못 나갔어요. 다른 말을 골라 보세요.'); return; }
  feedback('miss', `${nameEn}: “${re}”`, `${name}: “${reKo || re}”`);
  const who = speakerOf(t.speaker);
  if (who && who !== player) { say(who, re, reKo, 3.6); play(who, 'emote-no', { once: true }); }
  speak(re, voiceOf(npcRow(t.speaker || talk.ep.npc)), true);
}
dlg.querySelector('.leave').addEventListener('click', () => { endTalk(); toast('You can pick up the conversation later.', '나중에 다시 이야기할 수 있어요.', null, 2.4); });
function endTalk() {
  dlg.hidden = true;
  $('side').hidden = false;
  talk = null;
  if (state === 'talk') state = 'play';
  hideBubbles();
  goalTimer = 0;
}
let replyTimer = null;
function answered() {
  const t = talk.turns[talk.idx], mine = talk, text = personal(t.model);
  const pts = TURN_POINTS[Math.min(talk.misses, TURN_POINTS.length - 1)];
  talk.points += pts;
  talk.best += TURN_POINTS[0];
  addScore(pts, `${talk.ep.title} (${talk.idx + 1})`, `${talk.ep.title_ko || talk.ep.title} (${talk.idx + 1})`);
  dlg.classList.add('answered');
  dlg.querySelector('.leave').hidden = true;
  say(player, text, t.model_ko && personalKo(t.model_ko), 3.4);
  speak(text, heroVoice());          // you say it aloud, in your own voice; the reply waits for you to finish
  play(player, 'emote-yes', { once: true });
  feedback('ok', `✓ ${text}  +${pts}`, `✓ ${turnText(t, 'model')}  +${pts}`);
  clearTimeout(replyTimer);
  replyTimer = setTimeout(() => {
    if (talk !== mine) return;
    if (t.reply_line) {
      const rs = t.reply_speaker || t.speaker;
      talk.showing = 'reply';
      relangTurn();
      const who = speakerOf(rs);
      if (who && who !== player) { say(who, personal(t.reply_line), t.reply_ko && personalKo(t.reply_ko), 4.5); play(who, 'interact-left', { once: true }); }
      speak(personal(t.reply_line), voiceOf(npcRow(rs || talk.ep.npc)), true);
    }
    showNext();
  }, fastMode ? 250 : 1300);
}
function showNext() {
  const next = dlg.querySelector('.next');
  next.textContent = talk && talk.idx + 1 < talk.turns.length ? tr('Continue ▸', '계속 ▸') : tr('Finish ▸', '마치기 ▸');
  next.hidden = false;
  next.focus();
}
dlg.querySelector('.next').addEventListener('click', () => {
  if (!talk) return;
  talk.idx++;
  if (talk.idx < talk.turns.length) showTurn(); else completeEpisode();
});
function completeEpisode() {
  const ep = talk.ep, got = talk.points, best = talk.best;
  dlg.hidden = true;
  $('side').hidden = false;
  talk = null;
  G.done[ep.id] = true;
  const rt = ROUTINE_OF[ep.id] && routinesOn(G.day).find(x => x.ep.id === ep.id);
  if (rt) (G.rdone = G.rdone || {})[rt.key] = 1;          // a meeting is done for today only
  (G.epScore = G.epScore || {})[ep.id] = [got, best];
  friendsAfterTalk(ep, got, best);          // closer to the people in it
  if (hasTag(ep, 'sick')) takeSick(nextWorkday(G.day + 1), true);          // a sick day: the next working day (you told your manager)
  if (+ep.reward) pay(+ep.reward, ep.title, +ep.reward > 0 ? 'income' : 'spend', { ko: ep.title_ko });
  if (ep.energy) G.energy = clamp(G.energy + +ep.energy, 0, E_MAX);
  rows('phrases').filter(p => p.episode === ep.id && !G.phrases.includes(p.id)).forEach(p => G.phrases.push(p.id));
  logEvent('episode', ep.title, 0, { id: ep.id, ko: ep.title_ko });
  saveGame();
  npcSig = '';
  const body = [];
  if (ep.summary) body.push(`<p>${esc(shown(ep.summary, ep.summary_ko))}</p>`);
  if (best) body.push(`<p class="score-line">★ <b>+${got}</b> ${tr(`of ${best} points${got === best ? ': you got every turn right the first time.' : '.'}`, `/ ${best}점${got === best ? ': 모든 말을 한 번에 맞게 했어요.' : '.'}`)} ${tr('Score', '점수')} <b>${score()}</b></p>`);
  if (+ep.reward > 0) body.push(tr(`<p><b>${usd2(+ep.reward)}</b> added to your account.</p>`, `<p>계좌에 <b>${usd2(+ep.reward)}</b>가 들어왔어요.</p>`));
  if (+ep.reward < 0) body.push(tr(`<p>You paid <b>${usd2(-ep.reward)}</b>. Balance: ${usd2(G.money)}.</p>`, `<p><b>${usd2(-ep.reward)}</b>를 냈어요. 잔액: ${usd2(G.money)}.</p>`));
  careDone(ep).forEach(l => body.push(l));          // the pharmacy and the clinic: the copay, the medicine, the note
  if (!G.mission && G.day <= MISSION_DAYS) { const [got, all] = missionCount(); if (all) body.push(`<p class="score-line">${tr('Missions', '미션')} <b>${got} / ${all}</b>${got === all ? tr(' · all done!', ' · 모두 완료!') : ''}</p>`); }
  showCard({ kicker: tr('Conversation complete', '대화 끝'), title: loc(ep, 'title'), body: body.join(''), ok: tr('Continue', '계속'), state: 'card' }, () => { goalTimer = 0; if (hasTag(ep, 'review')) showReview(holdReview(false)); else checkMissions(); });
}

/* Sim Office — voices (speechSynthesis; American English first). One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- voice (speechSynthesis; American English first)
let voices = [], usVoices = [];
function pickVoices() {
  if (!window.speechSynthesis) return;
  voices = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang));
  usVoices = voices.filter(v => /^en[-_]US/i.test(v.lang));
}
if (window.speechSynthesis) { pickVoices(); if (speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', pickVoices); }
// Everybody has a voice of their own, the hero too (the npcs row with the hero's id). Which of the browser's voices:
// the one the person's voice_like names (a pattern, tried on the American voices first), else one of the American
// voices of the person's gender (picked by their id, so people differ where the system has several), else the
// default American voice with the pitch shifted down for a man or up for a woman. Pitch and rate are the person's.
const MALE_VOICE = /\b(male|guy|david|mark|alex|fred|tom|aaron|eric|roger|christopher|brian|andrew|davis|tony|jason|steffan|brandon|ralph|junior|reed|rocko|eddy|albert|bruce|grandpa)\b/i;
const FEMALE_VOICE = /\b(female|zira|aria|jenny|samantha|victoria|allison|ava|susan|michelle|ana|sara|nancy|amber|ashley|cora|elizabeth|jane|monica|kathy|nicky|joanna|kendra|kimberly|salli|ivy|emma|flo|sandy|shelley|grandma)\b|Google US English/i;
const voiceOf = (n) => n ? { id: n.id, pitch: n.voice_pitch, rate: n.voice_rate, like: n.voice_like, male: /^man-/.test(n.model || '') } : {};
const heroVoice = () => G ? voiceOf(NPCS[G.hero] || { id: G.hero, model: G.model, voice_pitch: 1, voice_rate: 0.97 }) : {};
function voiceFor(v) {
  let voice = null, shift = 0;
  if (v.like) { try { const re = new RegExp('\\b(?:' + v.like + ')\\b', 'i'); voice = usVoices.find(x => re.test(x.name)) || null; } catch (e) { /* bad pattern */ } }
  if (!voice && v.male != null) {
    const pool = usVoices.filter(x => (v.male ? MALE_VOICE : FEMALE_VOICE).test(x.name) && !(v.male ? FEMALE_VOICE : MALE_VOICE).test(x.name));
    if (pool.length) voice = pool[hash(v.id || '') % pool.length];
  }
  if (!voice) {
    voice = usVoices.find(x => /Google US English/i.test(x.name)) || usVoices[0] || voices[0] || null;
    const isMale = !!voice && MALE_VOICE.test(voice.name) && !FEMALE_VOICE.test(voice.name);
    if (v.male === true && !isMale) shift = -0.3;
    if (v.male === false && isMale) shift = 0.3;
  }
  return { voice, shift };
}
function speak(text, v, queue) {          // queue: after what is being said now (the reply to what you just said)
  if (!voiceBox.checked || !window.speechSynthesis || !text) return;
  const clean = String(text).replace(/[…]/g, ',').replace(/^\(.*\)$/, '').trim();
  if (!clean) return;
  v = v || {};
  try {
    if (!queue) speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(clean), pick = voiceFor(v);
    if (pick.voice) { u.voice = pick.voice; u.lang = pick.voice.lang; } else u.lang = 'en-US';
    u.rate = +v.rate || 0.95;
    u.pitch = clamp((+v.pitch || 1) + pick.shift, 0.4, 1.8);
    speechSynthesis.speak(u);
  } catch (e) { /* no speech here */ }
}

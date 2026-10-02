/* Sim Office — the page: language switch, toasts, loading scripts. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- page chrome
const langBox = $('lang'), voiceBox = $('voice-on');
langBox.value = settings.lang;
voiceBox.checked = settings.voice !== false;
// the page itself: an element with data-ko has its Korean (HTML) there and keeps its English in data-en
function staticLang() {
  document.documentElement.lang = settings.lang;
  document.body.classList.toggle('lang-ko', KO());
  document.querySelectorAll('[data-ko]').forEach(el => {
    if (el.dataset.en == null) el.dataset.en = el.innerHTML;
    el.innerHTML = KO() ? el.dataset.ko : el.dataset.en;
  });
  document.querySelectorAll('[data-ko-label]').forEach(el => {
    if (el.dataset.enLabel == null) el.dataset.enLabel = el.getAttribute('aria-label') || el.title || '';
    const v = KO() ? el.dataset.koLabel : el.dataset.enLabel;
    if (el.hasAttribute('aria-label')) el.setAttribute('aria-label', v);
    if (el.title) el.title = v;
  });
}
function applyLang() {          // everything on screen again, in the language picked
  staticLang();
  applyQuality();
  tags.forEach(t => { if (t.en != null) t.el.textContent = tr(t.en, t.ko); });
  if (G) { hud(); phoneBadge(); goalTimer = 0; actSig = ''; }
  if (!panel.hidden && panelKind) renderPanel();
  if (talk && !dlg.hidden) relangTurn();
  if (state === 'title') { markChosen(); renderSaves(); }
  if (state === 'tour') tourLabels();
}
langBox.addEventListener('change', () => { settings.lang = langBox.value === 'ko' ? 'ko' : 'en'; saveSettings(); applyLang(); });
voiceBox.addEventListener('change', () => { settings.voice = voiceBox.checked; saveSettings(); if (!voiceBox.checked && window.speechSynthesis) speechSynthesis.cancel(); });
staticLang();
const narrow = window.matchMedia ? matchMedia('(max-width: 640px)') : null;
function placeSwitches() {
  const opts = Array.from(document.querySelectorAll('#bar label.opt'));
  const inMenu = narrow && narrow.matches;
  opts.forEach(o => { if (inMenu) $('menu').insertBefore(o, $('menu').querySelector('button')); else $('bar').insertBefore(o, $('menu-btn')); });
}
if (narrow) { placeSwitches(); if (narrow.addEventListener) narrow.addEventListener('change', placeSwitches); }
function toast(en, ko, kind, secs) {
  const d = document.createElement('div');
  d.className = 'toast' + (kind ? ' ' + kind : '');
  d.textContent = tr(en, ko);
  $('toasts').appendChild(d);
  while ($('toasts').children.length > 3) $('toasts').firstChild.remove();
  setTimeout(() => { d.classList.add('out'); setTimeout(() => d.remove(), 500); }, (secs || 3.2) * 1000);
}
const loadScript = (src) => new Promise((ok, fail) => {
  const s = document.createElement('script');
  s.src = src;
  s.async = false;
  s.onload = ok;
  s.onerror = () => { s.remove(); fail(new Error('missing ' + src)); };
  document.head.appendChild(s);
});

/* Sim Office — keyboard, touch stick and buttons. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- input
const keys = {};
const stick = { x: 0, y: 0, id: null };
const typing = (e) => e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName);
window.addEventListener('keydown', (e) => {
  if (typing(e)) return;
  keys[e.code] = true;
  if ((e.code === 'KeyE' || e.code === 'Enter') && state === 'play' && actions.length) { e.preventDefault(); actions[0].run(); }
  if (state === 'tour') {
    const what = { Escape: 'back', Space: 'auto', KeyT: 'time', KeyY: 'weather' }[e.code];
    if (what) { e.preventDefault(); tourDo(what); }
    if (/Arrow|Space/.test(e.code)) e.preventDefault();
    return;
  }
  if (e.code === 'Escape') { if (!$('panel').hidden) closePanel(); else if (!$('menu').hidden) toggleMenu(false); }
  const panelKey = { KeyT: 'talks', KeyP: 'phone', KeyN: 'phone', KeyI: 'inventory', KeyC: 'calendar', KeyM: 'map', KeyB: 'bank', KeyR: 'work' }[e.code];
  if (panelKey && G) { if (state === 'play') openPanel(panelKey); else if (panelKind === panelKey) closePanel(); }
  if (/Arrow|Space/.test(e.code)) e.preventDefault();
});
window.addEventListener('keyup', (e) => { keys[e.code] = false; });
window.addEventListener('blur', () => { Object.keys(keys).forEach(k => { keys[k] = false; }); });
const stickEl = $('stick'), knob = stickEl.querySelector('.knob');
function stickMove(e) {
  const r = stickEl.getBoundingClientRect();
  let x = (e.clientX - r.left - r.width / 2) / (r.width / 2), y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
  const l = Math.hypot(x, y);
  if (l > 1) { x /= l; y /= l; }
  stick.x = x; stick.y = y;
  knob.style.transform = `translate(${x * 34}px, ${y * 34}px)`;
}
stickEl.addEventListener('pointerdown', (e) => { stick.id = e.pointerId; stickEl.setPointerCapture(e.pointerId); stickMove(e); });
stickEl.addEventListener('pointermove', (e) => { if (e.pointerId === stick.id) stickMove(e); });
const stickUp = (e) => { if (e.pointerId !== stick.id) return; stick.id = null; stick.x = stick.y = 0; knob.style.transform = ''; };
stickEl.addEventListener('pointerup', stickUp);
stickEl.addEventListener('pointercancel', stickUp);
if (window.matchMedia && matchMedia('(pointer: coarse)').matches) document.body.classList.add('touch');
window.addEventListener('touchstart', () => document.body.classList.add('touch'), { once: true, passive: true });
function readInput() {
  let fwd = 0, turn = 0;
  if (keys.ArrowUp || keys.KeyW) fwd += 1;
  if (keys.ArrowDown || keys.KeyS) fwd -= 1;
  if (keys.ArrowLeft || keys.KeyA) turn += 1;
  if (keys.ArrowRight || keys.KeyD) turn -= 1;
  if (stick.id !== null) { fwd += -stick.y; turn += -stick.x * 0.9; }
  const run = keys.ShiftLeft || keys.ShiftRight || (stick.id !== null && Math.hypot(stick.x, stick.y) > 0.95);
  return { fwd: clamp(fwd, -1, 1), turn: clamp(turn, -1, 1), run };
}

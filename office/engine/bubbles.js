/* Sim Office — speech bubbles and name tags. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- bubbles and tags
const bubbles = {};
const actorOf = (id) => id === 'player' ? player : npcActors[id] || null;
function say(who, text, ko, secs) {
  const a = typeof who === 'string' ? actorOf(who) : who;
  if (!a || !text) return;
  let b = bubbles[a.id];
  if (!b) { b = bubbles[a.id] = document.createElement('div'); b.className = 'bubble' + (a === player ? ' me' : ''); $('bubbles').appendChild(b); }
  b.textContent = tr(text, ko);
  b.classList.remove('hide');
  clearTimeout(b.timer);
  b.timer = setTimeout(() => b.classList.add('hide'), (secs || Math.max(2.6, text.length * 0.075)) * 1000);
}
const hideBubbles = () => Object.values(bubbles).forEach(b => b.classList.add('hide'));
const tmpV = new T.Vector3();
function project(v) {
  tmpV.copy(v).project(camera);
  return { x: (tmpV.x + 1) / 2 * window.innerWidth, y: (1 - tmpV.y) / 2 * window.innerHeight, ok: tmpV.z < 1 && Math.abs(tmpV.x) < 1.15 && Math.abs(tmpV.y) < 1.15 };
}
function placeBubbles() {
  Object.keys(bubbles).forEach(id => {
    const b = bubbles[id], a = actorOf(id);
    if (!a || b.classList.contains('hide')) return;
    const p = project(tmpV.set(a.pos.x, a.bubbleY, a.pos.z));
    b.style.display = p.ok ? '' : 'none';
    const half = Math.min(b.offsetWidth / 2, window.innerWidth / 2 - 8) + 8;
    b.style.left = clamp(p.x, half, window.innerWidth - half) + 'px';
    b.style.top = Math.max(p.y, b.offsetHeight + 52) + 'px';
  });
}
function addTag(text, pos, kind, range, ko) {
  const el = document.createElement('div');
  el.className = 'tag ' + kind;
  el.textContent = tr(text, ko);
  $('tags').appendChild(el);
  tags.push({ el, pos, range, en: text, ko });
}
function placeTags() {
  const show = state === 'play' && player;
  tags.forEach(t => {
    const near = show && Math.hypot(t.pos.x - player.pos.x, t.pos.z - player.pos.z) < t.range;
    const p = near ? project(t.pos) : null;
    if (!p || !p.ok) { t.el.style.display = 'none'; return; }
    t.el.style.display = '';
    t.el.style.left = p.x + 'px';
    t.el.style.top = p.y + 'px';
  });
}

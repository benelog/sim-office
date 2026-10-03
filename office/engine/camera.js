/* Sim Office — the camera: behind the player, from the side in a conversation. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- camera: behind and above the player; from the side in a conversation
const cam = { pos: new T.Vector3(), look: new T.Vector3(), ready: false, orbit: 0, push: null, pull: null };
const ease = (x) => x * x * (3 - 2 * x);
const want = new T.Vector3(), look = new T.Vector3(), rayFrom = new T.Vector3(), rayDir = new T.Vector3();
const ray = new T.Raycaster();
let occluders = [];
// keep the camera in front of walls and buildings between it and the player
function inRoom(v) {           // indoors the camera stays inside the room's rectangle
  if (!Z || !Z.indoor) return;
  const hw = Z.size[0] / 2 - 0.15, hd = Z.size[1] / 2 - 0.15;
  v.x = clamp(v.x, -hw, hw);
  v.z = clamp(v.z, -hd, hd);
}

// Looking round the town (the title screen's "Look around town"): the camera circles a point you move over the
// town. ↑↓ / W S: forward and back, ← → / A D: turn, Q E: sideways, Z X (or the wheel): closer and farther,
// R F: higher and lower, Space: the slow circling on and off, T: the time of day, Y: the weather, Esc: back.
const tour = { x: 0, z: 0, yaw: 0, dist: 24, pitch: 0.42, auto: true, minute: 600, wx: null, drag: null };
const TOUR_TIMES = [[600, 'Morning', '아침'], [780, 'Afternoon', '오후'], [1105, 'Sunset', '해 질 녘'], [1290, 'Night', '밤'], [400, 'Sunrise', '해돋이']];
const TOUR_WX = [null, 'partly', 'cloudy', 'rain', 'fog'];
async function startTour() {
  if (busy || jog) return;
  if (G) { saveGame(); G = null; }
  if (player) scene.remove(player.holder);
  Object.assign(tour, { x: 0, z: 0, yaw: cam.orbit, dist: 24, pitch: 0.42, auto: true, minute: 600, wx: null });
  $('title').hidden = true;
  state = 'tour';
  if (zoneId !== 'city') await enterZone('city');
  state = 'tour';
  fadedNow.forEach(h => setFaded(h, false));
  fadedNow = new Set();
  marker.group.visible = false;
  $('tour').hidden = false;
  document.body.classList.add('touring');
  tourLabels();
  envTimer = 0;
}
function endTour() {
  if (state !== 'tour') return;
  $('tour').hidden = true;
  document.body.classList.remove('touring');
  cam.orbit = tour.yaw;
  showTitle();
  envTimer = 0;
}
function tourLabels() {
  const t = TOUR_TIMES.find(x => x[0] === tour.minute) || TOUR_TIMES[0];
  $('tour').querySelector('[data-tour="time"]').textContent = tr(`Time: ${t[1]}`, `시간: ${t[2] || t[1]}`);
  $('tour').querySelector('[data-tour="weather"]').textContent = tr(`Weather: ${tour.wx ? WX_NAME[tour.wx] : 'Sunny'}`, `날씨: ${tour.wx ? WX_NAME_KO[tour.wx] : '맑음'}`);
  $('tour').querySelector('[data-tour="auto"]').textContent = tr(tour.auto ? 'Circling: on' : 'Circling: off', tour.auto ? '자동 회전: 켬' : '자동 회전: 끔');
}
function tourDo(what) {
  if (what === 'back') { endTour(); return; }
  if (what === 'time') tour.minute = TOUR_TIMES[(TOUR_TIMES.findIndex(x => x[0] === tour.minute) + 1) % TOUR_TIMES.length][0];
  if (what === 'weather') tour.wx = TOUR_WX[(TOUR_WX.indexOf(tour.wx) + 1) % TOUR_WX.length];
  if (what === 'auto') tour.auto = !tour.auto;
  if (what === 'in') tour.dist = clamp(tour.dist * 0.8, 5, 70);
  if (what === 'out') tour.dist = clamp(tour.dist * 1.25, 5, 70);
  envTimer = 0;
  tourLabels();
}
function tourTick(dt) {
  const k = keys, fwd = (k.ArrowUp || k.KeyW ? 1 : 0) - (k.ArrowDown || k.KeyS ? 1 : 0), turn = (k.ArrowLeft || k.KeyA ? 1 : 0) - (k.ArrowRight || k.KeyD ? 1 : 0);
  const side = (k.KeyE ? 1 : 0) - (k.KeyQ ? 1 : 0), zoom = (k.KeyX || k.Minus ? 1 : 0) - (k.KeyZ || k.Equal ? 1 : 0), tilt = (k.KeyR ? 1 : 0) - (k.KeyF ? 1 : 0);
  const fast = k.ShiftLeft || k.ShiftRight ? 2.2 : 1, move = (6 + tour.dist * 0.35) * fast * dt;
  if (fwd || turn || side || zoom || tilt) { if (tour.auto) { tour.auto = false; tourLabels(); } }
  if (tour.auto) tour.yaw += dt * 0.06;
  tour.yaw += turn * 1.3 * dt;
  // forward is away from the camera, over the ground
  const fx = -Math.sin(tour.yaw), fz = -Math.cos(tour.yaw);
  const wk = Z.walk || [-34, -34, 34, 34];
  tour.x = clamp(tour.x + (fx * fwd - fz * side) * move, Math.min(-34, wk[0] - 12), Math.max(34, wk[2] + 12));
  tour.z = clamp(tour.z + (fz * fwd + fx * side) * move, Math.min(-34, wk[1] - 12), Math.max(34, wk[3] + 12));
  tour.dist = clamp(tour.dist * (1 + zoom * 1.1 * dt), 5, 70);
  tour.pitch = clamp(tour.pitch + tilt * 0.7 * dt, 0.06, 1.35);
  const h = Math.cos(tour.pitch) * tour.dist;
  camera.position.set(tour.x + Math.sin(tour.yaw) * h, Math.max(0.7, Math.sin(tour.pitch) * tour.dist), tour.z + Math.cos(tour.yaw) * h);
  camera.lookAt(tour.x, 0.8, tour.z);
  cam.pos.copy(camera.position);
  cam.look.set(tour.x, 0.8, tour.z);
}
canvas.addEventListener('pointerdown', (e) => { if (state !== 'tour') return; tour.drag = { id: e.pointerId, x: e.clientX, y: e.clientY }; canvas.setPointerCapture(e.pointerId); });
canvas.addEventListener('pointermove', (e) => {
  if (state !== 'tour' || !tour.drag || tour.drag.id !== e.pointerId) return;
  tour.yaw -= (e.clientX - tour.drag.x) * 0.006;
  tour.pitch = clamp(tour.pitch + (e.clientY - tour.drag.y) * 0.004, 0.06, 1.35);
  tour.drag.x = e.clientX; tour.drag.y = e.clientY;
  if (tour.auto) { tour.auto = false; tourLabels(); }
});
['pointerup', 'pointercancel'].forEach(n => canvas.addEventListener(n, () => { tour.drag = null; }));
canvas.addEventListener('wheel', (e) => { if (state !== 'tour') return; e.preventDefault(); tour.dist = clamp(tour.dist * (e.deltaY > 0 ? 1.1 : 0.9), 5, 70); }, { passive: false });

function cameraTick(dt) {
  if (!Z) { camera.position.set(0, 3, 8); camera.lookAt(0, 1, 0); return; }
  if (state === 'tour') { tourTick(dt); return; }
  if (state === 'title' || !player) {
    cam.orbit += dt * 0.06;
    const r = Math.max(Z.size[0], Z.size[1]) * 0.45 + 4;
    camera.position.set(Math.sin(cam.orbit) * r, Z.indoor ? 3.2 : 7, Math.cos(cam.orbit) * r);
    camera.lookAt(0, 0.6, 0);
    return;
  }
  const p = player.pos;
  const other = talk && talk.actor;
  const portrait = window.innerWidth < window.innerHeight;
  if (state === 'talk' && other) {            // a three-quarter two-shot from the player's side: the other person's face
    let dx = other.pos.x - p.x, dz = other.pos.z - p.z;
    const l = Math.hypot(dx, dz) || 1;
    dx /= l; dz /= l;
    let sx = -dz, sz = dx;
    if (!cam.side) cam.side = sx * (cam.pos.x - p.x) + sz * (cam.pos.z - p.z) < 0 ? -1 : 1;
    sx *= cam.side; sz *= cam.side;
    const back = portrait ? 1.7 : 0.9, side = portrait ? 1.7 : 2.1;          // for people HEAD_Y tall
    want.set(p.x - dx * back + sx * side, portrait ? 1.6 : 1.4, p.z - dz * back + sz * side);
    look.set(p.x + dx * l * 0.6, portrait ? -0.15 : 0.26, p.z + dz * l * 0.6);
    inRoom(want);
  } else {
    cam.side = 0;
    // behind and above; when a wall or a building is in the way, rise over it rather than zoom into the head
    const sx = Math.sin(player.heading), sz = Math.cos(player.heading);
    const back = Z.indoor ? 2.9 : 3.6, high = Z.indoor ? 1.8 : 2.1;
    want.set(p.x - sx * back, high, p.z - sz * back);
    inRoom(want);
    const squeezed = back - Math.hypot(want.x - p.x, want.z - p.z);     // a small room pushed the camera in: look down more
    if (squeezed > 0) want.y += squeezed * 0.75;
    look.set(p.x + sx * 1.0, HEAD_Y * 0.55, p.z + sz * 1.0);
    const zoom = cam.push ? ease(Math.min(1, (cam.push.t += dt) / cam.push.dur)) * 0.62
      : cam.pull ? (1 - ease(Math.min(1, (cam.pull.t += dt) / cam.pull.dur))) * 0.55 : 0;
    if (cam.pull && cam.pull.t >= cam.pull.dur) cam.pull = null;
    if (zoom) want.lerp(rayTo.set(p.x + sx * 0.25, HEAD_Y * 0.85, p.z + sz * 0.25), zoom);
  }
  const k = cam.ready ? 1 - Math.exp(-dt * (cam.push ? 9 : 3.5)) : 1;
  cam.ready = true;
  cam.pos.lerp(want, k);
  cam.look.lerp(look, k);
  if (cam.pos.y < 0.3) cam.pos.y = 0.3;
  inRoom(cam.pos);
  camera.position.copy(cam.pos);
  camera.lookAt(cam.look);
  const faded = new Set();
  fadeHits(cam.pos, rayTo.set(p.x, HEAD_Y * 0.55, p.z), faded);         // the body and the head
  fadeHits(cam.pos, rayTo.set(p.x, HEAD_Y * 0.92, p.z), faded);
  if (other) { fadeHits(cam.pos, rayTo.set(other.pos.x, HEAD_Y * 0.55, other.pos.z), faded); fadeHits(cam.pos, rayTo.set(other.pos.x, HEAD_Y * 0.92, other.pos.z), faded); }
  fadedNow.forEach(h => { if (!faded.has(h)) setFaded(h, false); });
  faded.forEach(h => { if (!fadedNow.has(h)) setFaded(h, true); });
  fadedNow = faded;
}
// walls, shelves and lamps between the camera and the people turn see-through
const rayTo = new T.Vector3(), fadeMats = new Map();
let fadedNow = new Set(), occluderSet = new Set();
function fadeHits(from, to, out) {
  rayDir.subVectors(to, from);
  const d = rayDir.length();
  if (d < 1e-3 || !occluders.length) return;
  rayDir.divideScalar(d);
  ray.set(from, rayDir);
  ray.far = d - 0.25;
  ray.intersectObjects(occluders, true).forEach(h => {
    let o = h.object;
    while (o && !occluderSet.has(o)) o = o.parent;
    if (o) out.add(o);
  });
}
function fadedOf(m) {
  let f = fadeMats.get(m);
  if (!f) { f = m.clone(); f.transparent = true; f.opacity = 0.22; f.depthWrite = false; fadeMats.set(m, f); }
  return f;
}
function setFaded(h, on) {
  h.traverse(o => {
    if (!o.isMesh) return;
    if (on && !o.userData.solidMat) { o.userData.solidMat = o.material; o.material = Array.isArray(o.material) ? o.material.map(fadedOf) : fadedOf(o.material); }
    else if (!on && o.userData.solidMat) { o.material = o.userData.solidMat; delete o.userData.solidMat; }
  });
}

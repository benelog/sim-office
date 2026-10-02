/* Sim Office — the map (Menu > Map): the town, or the room you are in. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- the map (Menu > Map, M): the town, or the room you are in
// Drawn on a canvas from the zone's data: road tiles (the kit's 3 x 3 cells with sidewalks), props by their
// footprints (SO_ZONE_KIT.BOX), places as pins, doors, the streets and areas the zone names in `map`, the people
// (where they are now, or the door of the building they are in), the goal, and you. Redrawn while open.
const MAP = { tab: 'town', canvas: null, zone: null };
let mapTimer = 0;
const MAPC = {
  grass: '#c5dcae', pave: '#e2ddd2', road: '#faf8f3', roadEdge: '#c9c2b4', line: '#d8cfba', stripe: '#ffffff',
  floor: '#ece6da', wall: '#5b6477', furniture: '#d9cdb9', furnitureEdge: '#a8967c', box: '#c9c4ba',
  building: '#efe2cc', buildingEdge: '#b39a76', tower: '#d5dfe9', towerEdge: '#8ea2b7', home: '#f5c98d', office: '#8ebfdc', diner: '#ef9b88', market: '#93cf9b',
  tree: '#5d9c4b', treeEdge: '#43773a', bush: '#7eb567', rock: '#a9a59d', rockEdge: '#7d7a73', path: '#d9cdb0', water: '#7fb8e6', waterEdge: '#5e98c9',
  car: '#8b95a6', bench: '#a67c5b', lamp: '#6b7380', fence: '#8d6d4c', planter: '#6a9d55', flower: { red: '#e0575a', yellow: '#f2c74c', purple: '#a074c9' },
  pin: '#2f7d7a', pinEdge: '#215c5a', door: '#7b5a3e', label: '#1d2433', labelBox: 'rgba(255,255,255,0.88)', street: '#7a7366', area: '#3f6b3a',
  you: '#16233b', person: '#e0a33a', personEdge: '#8a5f12', bang: '#c24a3d', goal: '#e0a33a'
};
const KEY_BUILDINGS = { seaside_labs: 'office', diner: 'diner', market: 'market' };      // a prop with home: '<hero>' is that hero's home
const OPEN_DIRS = { straight: [0, 2], crossing: [0, 2], bend: [2, 1], end: [2], square: [], all: [0, 1, 2, 3] };     // east, south, west, north at turn 0
function mapZone() { return MAP.tab === 'room' && zoneId && zoneId !== 'city' ? zoneId : 'city'; }
// world-axis rectangle of a prop's footprint, from the zone kit's bounding boxes (like the engine's solids)
function footprint(p) {
  const at = p.at || [0, 0], turn = p.turn || 0;
  if (p.pack === 'box' || !p.pack) { const sz = p.size || [1, 1, 1]; return rectOf(at[0], at[1], sz[0], sz[2], turn); }
  const kit = window.SO_ZONE_KIT || {}, b = kit.BOX && kit.BOX[p.pack] && kit.BOX[p.pack][p.node];
  const s = (PACK_SCALE[p.pack] || 1) * (p.scale || 1);
  if (!b) { const sz = propSize(p); return rectOf(at[0], at[1], sz[0], sz[2], turn); }
  const a = turn * Math.PI / 180, c = Math.cos(a), sn = Math.sin(a);
  const cx = (b[0] + b[1]) / 2 * s, cz = (b[2] + b[3]) / 2 * s, w = (b[1] - b[0]) * s, d = (b[3] - b[2]) * s;
  const mx = at[0] + cx * c + cz * sn, mz = at[1] - cx * sn + cz * c;
  const W = Math.abs(w * c) + Math.abs(d * sn), D = Math.abs(w * sn) + Math.abs(d * c);
  return { x0: mx - W / 2, x1: mx + W / 2, z0: mz - D / 2, z1: mz + D / 2 };
}
function mapBounds(spec) {
  const b = spec.walk || [-spec.size[0] / 2, -spec.size[1] / 2, spec.size[0] / 2, spec.size[1] / 2], m = spec.indoor ? 0.7 : spec.bounds ? 1.5 : 3.5;
  return { x0: b[0] - m, x1: b[2] + m, z0: b[1] - m, z1: b[3] + m };
}
// where someone (an npc row) is on the map of zone `mz`: their spot, or the door of the building they are in
function personOnMap(n, mz, spec) {
  const a = npcActors[n.id];
  if (a && zoneId === mz) return a.leaving ? null : { at: [a.pos.x, a.pos.z], inside: null };
  const pid = npcPlaceNow(n), pz = zoneOfPlace(pid);
  if (!pz) return null;
  if (pz === mz) { const pl = spec.places[pid]; return pl && !pl.guessed ? { at: pl.at, inside: null } : null; }
  if (mz !== 'city') return null;
  const via = routeTo('city', pz);
  return via && via.to === pz ? { at: via.at, inside: pz } : null;
}
function youOnMap(mz, spec) {
  if (!player || !G) return null;
  if (zoneId === mz) return { at: [player.pos.x, player.pos.z], heading: player.heading, inside: null };
  if (mz !== 'city') return null;
  const via = routeTo('city', zoneId);
  return via ? { at: via.at, inside: via.to === zoneId ? zoneId : (TRAVEL_ZONES.includes(zoneId) ? zoneId : via.to) } : null;
}
function goalOnMap(mz, spec) {
  if (!G) return null;
  if (zoneId === mz && goalTarget) return goalTarget.actor ? [goalTarget.actor.pos.x, goalTarget.actor.pos.z] : goalTarget.at;
  const ep = openEpisodes()[0];
  if (!ep) return null;
  const pid = isPhone(ep) ? ep.place : npcPlaceNow(npcRow(ep.npc)) || ep.place, pz = zoneOfPlace(pid);
  if (pz === mz) { const pl = spec.places[pid]; return pl ? pl.at : null; }
  if (mz !== 'city') return null;
  const via = pz && routeTo('city', pz);
  return via ? via.at : null;
}
function renderMapPanel(h, sub, body) {
  const spec = zoneSpec(mapZone());
  h.textContent = MAP.tab === 'room' && spec.id !== 'city' ? loc(spec) : tr(`${CFG.city} · town map`, `${zoneName('city')[1] || CFG.city} 지도`);
  sub.textContent = tr(`${weekday(G.day)}, ${clock(G.minute)}`, `${WEEKDAYS_KO[(G.day - 1) % 7]}, ${clockKo(G.minute)}`);
  const tabs = zoneId && zoneId !== 'city' ? `<div class="tabs" role="tablist"><button type="button" role="tab" data-tab="town" aria-selected="${MAP.tab !== 'room'}">${tr('Town', '시내')}</button><button type="button" role="tab" data-tab="room" aria-selected="${MAP.tab === 'room'}">${esc(tr(zoneName(zoneId)[0], zoneName(zoneId)[1]))}</button></div>` : '';
  body.innerHTML = `${tabs}<canvas class="map" aria-label="Map"></canvas>
    <div class="legend"><span><i class="you"></i>${tr('You', '나')}</span><span><i class="person"></i>${tr('People', '사람')}</span><span><i class="bang">!</i>${tr('Someone to talk to', '이야기할 사람')}</span><span><i class="goal"></i>${tr('Where to go', '갈 곳')}</span><span><i class="door"></i>${tr('Door', '문')}</span></div>
    <div class="map-list"></div>`;
  MAP.canvas = body.querySelector('canvas.map');
  body.querySelectorAll('.tabs button').forEach(b => b.addEventListener('click', () => { MAP.tab = b.dataset.tab; renderPanel(); }));
  drawMap();
}
function drawMap() {
  const cv = MAP.canvas;
  if (!cv || !cv.isConnected || !G) return;
  const mz = mapZone(), spec = zoneSpec(mz), B = mapBounds(spec);
  const bw = B.x1 - B.x0, bd = B.z1 - B.z0;
  const body = cv.parentElement, avail = Math.max(240, body.clientWidth - 2);
  const maxH = Math.max(220, window.innerHeight - 250);
  const s = Math.min(avail / bw, maxH / bd);
  const W = Math.round(bw * s), H = Math.round(bd * s), dpr = Math.min(2, window.devicePixelRatio || 1);
  if (cv.width !== W * dpr || cv.height !== H * dpr) { cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px'; }
  const g = cv.getContext('2d');
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  const X = (x) => (x - B.x0) * s, Y = (z) => (z - B.z0) * s;
  const rect = (r, fill, stroke, lw) => { g.beginPath(); g.rect(X(r.x0), Y(r.z0), (r.x1 - r.x0) * s, (r.z1 - r.z0) * s); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw || 1; g.stroke(); } };
  const disc = (x, z, r, fill, stroke, lw) => { g.beginPath(); g.arc(X(x), Y(z), r, 0, Math.PI * 2); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw || 1; g.stroke(); } };
  const halo = (text, x, y, font, color, align) => { g.font = font; g.textAlign = align || 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = 3; g.strokeStyle = 'rgba(255,255,255,0.9)'; g.strokeText(text, x, y); g.fillStyle = color; g.fillText(text, x, y); };
  g.fillStyle = spec.indoor ? '#d7d3ca' : MAPC.grass;
  g.fillRect(0, 0, W, H);
  g.save();
  g.beginPath(); g.rect(0, 0, W, H); g.clip();
  if (spec.indoor) rect({ x0: -spec.size[0] / 2, x1: spec.size[0] / 2, z0: -spec.size[1] / 2, z1: spec.size[1] / 2 }, MAPC.floor, MAPC.wall, 2);
  // ----- tiles: roads as cells with sidewalks, pavement, paths
  const tiles = spec.tiles || [], props = spec.props || [];
  const roadS = (PACK_SCALE.roads || 3);
  const later = [];      // crosswalk stripes over the asphalt
  tiles.forEach(p => {
    if (!p || !p.at) return;
    if (p.pack === 'roads' && /^road-/.test(p.node || '')) {
      const S = roadS * (p.scale || 1), half = S / 2, band = 0.4 * S;
      const kind = /straight|crossing/.test(p.node) ? (/crossing/.test(p.node) ? 'crossing' : 'straight') : /bend/.test(p.node) ? 'bend' : /end/.test(p.node) ? 'end' : /square/.test(p.node) ? 'square' : 'all';
      rect({ x0: p.at[0] - half, x1: p.at[0] + half, z0: p.at[1] - half, z1: p.at[1] + half }, MAPC.pave);
      const turn = Math.round((p.turn || 0) / 90), open = OPEN_DIRS[kind].map(d => (((d - turn) % 4) + 4) % 4);
      g.fillStyle = MAPC.road;
      g.fillRect(X(p.at[0] - band), Y(p.at[1] - band), 2 * band * s, 2 * band * s);
      open.forEach(d => {
        const [dx, dz] = [[1, 0], [0, 1], [-1, 0], [0, -1]][d];
        const x0 = p.at[0] + (dx > 0 ? band : dx < 0 ? -half : -band), x1 = p.at[0] + (dx > 0 ? half : dx < 0 ? -band : band);
        const z0 = p.at[1] + (dz > 0 ? band : dz < 0 ? -half : -band), z1 = p.at[1] + (dz > 0 ? half : dz < 0 ? -band : band);
        g.fillRect(X(x0), Y(z0), (x1 - x0) * s, (z1 - z0) * s);
      });
      if (kind === 'crossing') later.push([p.at, open.includes(0) ? 'x' : 'z', S]);
    } else if (p.pack === 'roads') rect({ x0: p.at[0] - roadS / 2, x1: p.at[0] + roadS / 2, z0: p.at[1] - roadS / 2, z1: p.at[1] + roadS / 2 }, MAPC.pave);
    else if (/path|floor/i.test(p.node || '')) { const r = footprint(p); if (/Circle/.test(p.node)) disc((r.x0 + r.x1) / 2, (r.z0 + r.z1) / 2, (r.x1 - r.x0) / 2 * s, MAPC.path); else rect(r, MAPC.path); }
  });
  later.forEach(([at, along, S]) => {
    g.fillStyle = MAPC.stripe;
    for (let i = -2; i <= 2; i++) {
      if (along === 'x') g.fillRect(X(at[0] + i * 0.27 * S) - 1.5, Y(at[1] - 0.36 * S), 3, 0.72 * S * s);
      else g.fillRect(X(at[0] - 0.36 * S), Y(at[1] + i * 0.27 * S) - 1.5, 0.72 * S * s, 3);
    }
  });
  // ----- props: water and ground first, then buildings and furniture, then the small things
  const order = (p) => p.pack === 'box' && (p.size || [1, 1, 1])[1] <= 0.03 ? 0 : /^(building|house|wall)/.test(p.node || '') || p.pack === 'box' ? 1 : p.pack === 'furniture' || p.pack === 'homeware' || p.pack === 'extras' ? 2 : 3;
  props.slice().sort((a, b) => order(a) - order(b)).forEach(p => {
    if (!p || !p.at) return;
    const node = p.node || '', r = footprint(p);
    if (p.pack === 'box') {
      const flat = (p.size || [1, 1, 1])[1] <= 0.03;
      if (flat) rect(r, /#4f97d6|#5aa0d8/i.test(p.color || '') ? MAPC.water : (p.color || MAPC.box));
      else if (spec.indoor && (p.size || [1])[1] >= 1) rect(r, MAPC.wall);
      else rect(r, p.color || MAPC.box, 'rgba(0,0,0,0.18)');
      return;
    }
    if (p.pack === 'city' || p.pack === 'buildings') {
      if (/^building-skyscraper/.test(node)) rect(r, MAPC.tower, MAPC.towerEdge, 1.2);
      else if (/^(building|house|low-detail)/.test(node)) { const key = p.home ? (G && p.home === G.hero ? 'home' : null) : KEY_BUILDINGS[p.id]; rect(r, key ? MAPC[key] : MAPC.building, MAPC.buildingEdge, 1.2); }
      else if (/^tree/.test(node)) disc(p.at[0], p.at[1], Math.max(3, 0.55 * s), MAPC.tree, MAPC.treeEdge);
      else if (/^fence/.test(node)) rect(r, MAPC.fence);
      else if (/^planter/.test(node)) rect(r, MAPC.planter);
      else if (/^detail-(parasol|awning|overhang)/.test(node)) rect(r, 'rgba(255,255,255,0.35)');
      return;
    }
    if (p.pack === 'nature' || p.pack === 'park' || p.pack === 'wild') {
      const sc = (PACK_SCALE[p.pack] || 1) * (p.scale || 1);
      if (/^tree/.test(node)) disc(p.at[0], p.at[1], Math.max(3, (p.pack === 'nature' ? 1.6 : 0.32) * sc * s), /fall|autumn|twisted/.test(node) ? '#c98a3e' : /dark|pine|dead/.test(node) ? '#3f7a3c' : MAPC.tree, MAPC.treeEdge);
      else if (/^plant|^grass|^bush|^fern|^clover/.test(node)) disc(p.at[0], p.at[1], Math.max(1.5, (p.pack === 'nature' ? 0.8 : 0.16) * sc * s), MAPC.bush);
      else if (/^flower|^petal/.test(node)) disc(p.at[0], p.at[1], 1.6, MAPC.flower[(node.match(/red|yellow|purple/) || [/-4/.test(node) ? 'yellow' : 'red'])[0]]);
      else if (/^(rock|stone|pebble)/.test(node)) rect(r, MAPC.rock, MAPC.rockEdge);
      else if (/^statue/.test(node)) { rect(r, '#e9e4d8', MAPC.rockEdge); }
      else if (/^fence/.test(node)) rect(r, MAPC.fence);
      else if (/^(log|stump|canoe|bridge|sign|pot)/.test(node)) rect(r, MAPC.bench);
      else if (/^lily/.test(node)) disc(p.at[0], p.at[1], 1.6, MAPC.bush);
      return;
    }
    if (p.pack === 'cars') { rect(r, MAPC.car, 'rgba(0,0,0,0.2)'); return; }
    if (p.pack === 'roads') {
      if (/^light|^traffic|^electricity/.test(node)) disc(p.at[0], p.at[1], 1.8, MAPC.lamp);
      else if (/^dumpster|^construction-barrier/.test(node)) rect(r, '#8d9aa5');
      else if (/^road-sign|^sign/.test(node)) disc(p.at[0], p.at[1], 1.4, MAPC.lamp);
      return;
    }
    if (p.pack === 'furniture') {
      if (/^wall/.test(node)) rect(r, MAPC.wall);
      else if (/^(floor|rug)/.test(node)) return;
      else if (/^bench|^chair|^stool|^lounge/.test(node)) rect(r, MAPC.bench);
      else if (/^(lamp|plant|potted|books|laptop|computer|pillow|toaster|radio|speaker)/.test(node) || (p.lift || 0) > 0.1) return;
      else rect(r, MAPC.furniture, MAPC.furnitureEdge);
      return;
    }
    if (p.pack === 'extras') { if (!p.lift) rect(r, MAPC.furniture, MAPC.furnitureEdge); return; }
  });
  // ----- streets and areas named by the zone
  const M = spec.map || {};
  g.textBaseline = 'middle';
  (M.streets || []).forEach(st => {
    g.save();
    if (st.along === 'x') { g.translate(X(B.x0 + 1.2), Y(st.at)); g.textAlign = 'left'; }
    else { g.translate(X(st.at), Y(B.z0 + 1.2)); g.rotate(Math.PI / 2); g.textAlign = 'left'; }
    g.font = '600 10px ' + getComputedStyle(document.body).fontFamily;
    g.lineWidth = 3; g.strokeStyle = 'rgba(255,255,255,0.85)'; g.strokeText(st.name, 0, 0);
    g.fillStyle = MAPC.street; g.fillText(st.name, 0, 0);
    g.restore();
  });
  (M.areas || []).forEach(a => {
    halo(loc(a), X(a.at[0]), Y(a.at[1]), 'italic 600 11px ' + getComputedStyle(document.body).fontFamily, a.water ? '#2f6f9f' : MAPC.area);
  });
  // ----- doors (portals) and places
  portalsOf(spec).forEach(p => {
    const w = Math.max(6, (p.size ? p.size[0] : 1) * s), d = Math.max(4, (p.size ? p.size[1] : 0.6) * s);
    g.fillStyle = MAPC.door; g.fillRect(X(p.at[0]) - w / 2, Y(p.at[1]) - d / 2, w, d);
    g.strokeStyle = '#fff'; g.lineWidth = 1; g.strokeRect(X(p.at[0]) - w / 2, Y(p.at[1]) - d / 2, w, d);
  });
  const font = getComputedStyle(document.body).fontFamily;
  const labels = [];
  Object.keys(spec.places).forEach(pid => {
    const pl = spec.places[pid];
    if (!pl || !pl.at || pl.guessed || HEROES.some(h => h.home_door === pid && h.id !== G.hero)) return;
    const info = place(pid), isDoor = placeKind(pid) === 'door' || /_door$/.test(pid);
    const x = X(pl.at[0]), y = Y(pl.at[1]);
    if (isDoor) { g.fillStyle = MAPC.pin; g.beginPath(); g.moveTo(x, y - 5); g.lineTo(x + 5, y); g.lineTo(x, y + 5); g.lineTo(x - 5, y); g.closePath(); g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 1.2; g.stroke(); }
    else { g.beginPath(); g.arc(x, y, 5.5, 0, Math.PI * 2); g.fillStyle = MAPC.pin; g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 1.5; g.stroke(); g.beginPath(); g.arc(x, y, 2, 0, Math.PI * 2); g.fillStyle = '#fff'; g.fill(); }
    labels.push({ x, y: y - 9, text: loc(info), sub: null, w: 0 });
  });
  // ----- the goal, the people, you
  const goal = goalOnMap(mz, spec);
  if (goal) { g.setLineDash([3, 3]); disc(goal[0], goal[1], 12, null, MAPC.goal, 2.5); g.setLineDash([]); }
  const open = openEpisodes();
  const seen = {};
  cast().forEach(n => {
    const at = personOnMap(n, mz, spec);
    if (!at) return;
    const k = at.at[0].toFixed(1) + ',' + at.at[1].toFixed(1), j = (seen[k] = (seen[k] || 0) + 1) - 1;
    const x = X(at.at[0]) + (at.inside ? (j % 3) * 9 - 9 : 0), y = Y(at.at[1]) + (at.inside ? 10 + Math.floor(j / 3) * 9 : 0);
    g.beginPath(); g.arc(x, y, 4.5, 0, Math.PI * 2); g.fillStyle = MAPC.person; g.fill(); g.strokeStyle = MAPC.personEdge; g.lineWidth = 1.2; g.stroke();
    if (open.some(e => e.npc === n.id && !isPhone(e))) { g.beginPath(); g.arc(x + 4, y - 5, 5, 0, Math.PI * 2); g.fillStyle = MAPC.bang; g.fill(); halo('!', x + 4, y - 5, 'bold 8px ' + font, '#fff'); g.lineWidth = 1; }
    if (!at.inside) labels.push({ x: x + 7, y, text: firstName(n), person: true, left: true });
    else if (j === 0) {
      const names = cast().filter(m => { const q = personOnMap(m, mz, spec); return q && q.inside === at.inside; }).map(m => firstName(m));
      const where = TRAVEL_ZONES.includes(at.inside) ? ` · ${tr(zoneName(at.inside)[0].split(',')[0], zoneName(at.inside)[1])}` : '';      // by the shuttle: say where they are
      labels.push({ x: x + 12, y: y + 4, text: (names.length > 2 ? `${names[0]}, ${names[1]} +${names.length - 2}` : names.join(', ')) + where, person: true, left: true });
    }
  });
  const you = youOnMap(mz, spec);
  if (you) {
    const x = X(you.at[0]), y = Y(you.at[1]) - (you.inside ? 12 : 0);
    g.save(); g.translate(x, y);
    if (you.heading != null) { g.rotate(-you.heading + Math.PI); g.beginPath(); g.moveTo(0, -9); g.lineTo(6, 7); g.lineTo(0, 3.5); g.lineTo(-6, 7); g.closePath(); }
    else { g.beginPath(); g.arc(0, 0, 6, 0, Math.PI * 2); }
    g.fillStyle = MAPC.you; g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 1.6; g.stroke();
    g.restore();
    labels.push({ x: x + 9, y, text: tr('You', '나') + (you.inside ? tr(` · in ${zoneName(you.inside)[0].split(',')[0]}`, ` · ${zoneName(you.inside)[1] || zoneName(you.inside)[0]} 안`) : ''), you: true, left: true });
  }
  // labels last, so that they lie over everything, each in a small box; you and the people first, then the
  // places, each label at the first of a few spots round its mark that is clear of the labels already placed
  const placed = [];
  const overlap = (a) => placed.reduce((sum, b) => sum + Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)), 0);
  labels.sort((a, b) => (b.you ? 2 : b.person ? 1 : 0) - (a.you ? 2 : a.person ? 1 : 0)).forEach(l => {
    g.font = '600 10px ' + font;
    const tw = g.measureText(l.text).width, sw = l.sub ? (g.font = '9px ' + font, g.measureText(l.sub).width) : 0;
    const w = Math.max(tw, sw) + 8, hgt = l.sub ? 23 : 14, ax = l.left ? l.x - 7 : l.x, ay = l.left ? l.y : l.y + 9;    // ax, ay: the mark
    // spots round the mark: right, left, above, below, then the corners; the first clear one, else the least covered
    const spots = [[ax + 8, ay - hgt / 2], [ax - w - 8, ay - hgt / 2], [ax - w / 2, ay - hgt - 8], [ax - w / 2, ay + 8],
      [ax + 6, ay - hgt - 6], [ax - w - 6, ay - hgt - 6], [ax + 6, ay + 6], [ax - w - 6, ay + 6]];
    if (!l.left) spots.unshift(spots.splice(2, 1)[0]);       // places: above first
    let box = null, best = Infinity;
    for (const [sx, sy] of spots) { const b = { x: clamp(sx, 0, W - w), y: clamp(sy, 0, H - hgt), w, h: hgt }, o = overlap(b); if (o < best) { best = o; box = b; } if (!o) break; }
    placed.push(box);
    g.fillStyle = l.you ? MAPC.you : MAPC.labelBox; g.beginPath(); if (g.roundRect) g.roundRect(box.x, box.y, w, hgt, 4); else g.rect(box.x, box.y, w, hgt); g.fill();
    g.fillStyle = l.you ? '#fff' : l.person ? '#6d4a0a' : MAPC.label; g.textAlign = 'left'; g.textBaseline = 'middle';
    g.font = (l.you ? '700 ' : '600 ') + '10px ' + font;
    g.fillText(l.text, box.x + 4, box.y + 7.5);
    if (l.sub) { g.font = '9px ' + font; g.fillStyle = '#5b6477'; g.fillText(l.sub, box.x + 4, box.y + 17); }
  });
  // compass
  halo('N', W - 14, 14, '700 11px ' + font, MAPC.label);
  g.beginPath(); g.moveTo(W - 14, 20); g.lineTo(W - 10, 30); g.lineTo(W - 14, 27); g.lineTo(W - 18, 30); g.closePath(); g.fillStyle = MAPC.label; g.fill();
  g.restore();
  // ----- the list under the map: places with people or something to do, and where everyone out of town is
  const list = body.querySelector('.map-list');
  if (list) {
    const items = [];
    Object.keys(spec.places).forEach(pid => {
      const pl = spec.places[pid];
      if (!pl || pl.guessed) return;
      const people = cast().filter(n => { const at = personOnMap(n, mz, spec); return at && !at.inside && Math.hypot(at.at[0] - pl.at[0], at.at[1] - pl.at[1]) < 2.2; }).map(n => firstName(n));
      const acts = placeActions(pid).map(a => a.label.replace(/ \(.*\)$/, ''));
      const talk = open.filter(e => (isPhone(e) ? e.place === pid : cast().some(n => n.id === e.npc && (npcPlaceNow(n) === pid)))).map(e => loc(e, 'title'));
      if (!people.length && !acts.length && !talk.length) return;
      items.push(`<div class="row"><div class="main"><div class="t">${esc(loc(place(pid)))}</div><div class="s">${esc(people.concat(acts).join(' · '))}</div>${talk.length ? `<div class="s talk">! ${esc(talk.join(' · '))}</div>` : ''}</div></div>`);
    });
    if (mz === 'city') {
      const gone = cast().filter(n => !personOnMap(n, mz, spec));
      const away = gone.filter(n => npcPlaceNow(n)).map(n => { const zn = zoneName(zoneOfPlace(npcPlaceNow(n))); return `${firstName(n)} (${tr(zn[0], zn[1])})`; });
      const off = gone.filter(n => !npcPlaceNow(n)).map(n => firstName(n));
      if (off.length) items.push(`<div class="row"><div class="main"><div class="t">${tr('Off today or gone home', '쉬는 날이거나 퇴근함')}</div><div class="s">${esc(off.join(', '))}</div></div></div>`);
      if (away.length) items.push(`<div class="row"><div class="main"><div class="t">${tr('Out of town', '출장 중')}</div><div class="s">${esc(away.join(', '))}${tr(' · by the airport shuttle', ' · 공항 셔틀로')}</div></div></div>`);
    }
    list.innerHTML = items.join('');
  }
}

function buy(id) {
  const i = ITEMS[id];
  if (!i || !G) return false;
  if (i.place && (closedNow(i.place) || closedNow(zoneOfPlace(i.place)))) { if (!panel.hidden) note(tr('Sorry, we are closed.', '죄송해요, 영업이 끝났어요.'), true); return false; }
  const b = billFor(i), price = b.total, cash = cashOnly(i.place), by = cash ? null : payBy(price);          // a cash-only place takes it from your wallet; by: 'credit' (the credit card), or why it was declined; null: debit
  if (by && by !== 'credit') { if (!panel.hidden) note(by, true); return false; }
  if (!by && (cash ? wallet() : G.money) < price) { if (!panel.hidden) note(cash ? cashShort(b) : tr(`You can't afford that (${receipt(b)}).`, `돈이 부족해요 (${receipt(b)}).`), true); speak(cash ? "Sorry, cash only." : "Sorry, you can't afford that."); return false; }
  (by ? cardCharge : cash ? payCash : pay)(by ? price : -price, i.name, by ? 'card' : 'spend', Object.assign({ ko: i.name_ko }, b.tax || b.tip ? { tax: b.tax, tip: b.tip } : null));
  speak(i.name);
  if (i.kind === 'fare') note(tr(`Paid ${usd2(price)}: ${i.name}.`, `${usd2(price)} 냈어요: ${loc(i)}.`));
  else if (/^(meal|drink)$/.test(i.kind)) {
    G.energy = clamp(G.energy + (+i.energy || 0), 0, E_MAX);
    advanceMinutes(i.kind === 'meal' ? 20 : 5);
    let card = '';
    if (punchable(i)) {
      G.punch = G.punch || {};
      G.punch[i.place] = b.free ? 0 : punches(i.place) + 1;
      card = b.free ? tr(' This one was on the house.', ' 이번 잔은 무료예요.') : onTheHouse(i) ? tr(' Your punch card is full: the next drink is free.', ' 스탬프가 다 찼어요. 다음 음료는 무료예요.') : tr(` Punch card: ${punches(i.place)} of ${PUNCH_N - 1}.`, ` 스탬프 ${PUNCH_N - 1}개 중 ${punches(i.place)}개.`);
    }
    note(`${loc(i)}: ${receipt(b)}. ${tr('Energy', '에너지')} +${i.energy || 0}.${card}`);
    if (player) play(player, 'interact-right', { once: true });
  } else if (i.kind === 'grocery') {
    addLot(id);
    const by = bestBy({ id, day: G.day });
    note(tr(`${i.name} is in your bag (${G.inventory[id]}).${by != null ? ` Best by ${dateShort(by)}.` : ''}`, `${loc(i)}을(를) 가방에 넣었어요 (${G.inventory[id]}).${by != null ? ` ${dShort(by)}까지 먹으세요.` : ''}`));
  } else {
    addLot(id);
    note(tr(`${i.name}: ${receipt(b)}. It is in your bag.`, `${loc(i)}: ${receipt(b)}. 가방에 넣었어요.`));
  }
  saveGame();
  if (!panel.hidden) { const n = panel.querySelector('.panel-note').textContent; renderPanel(); panel.querySelector('.panel-note').textContent = n; }
  return true;
}
function eat(n) {          // a portion of a package in the bag (its place in G.lots), or of the oldest package of an item (its id)
  const l = ITEMS[n] ? goodLots(n)[0] : lots()[+n];
  if (!l || l.left < 1 || gone(l)) return false;
  const id = l.id, i = ITEMS[id] || { energy: 0, name: pretty(id) };
  if (+i.cook_only) { if (!panel.hidden) note(tr(`The ${shortName(id).toLowerCase()} needs cooking.`, `${josa(itemName(id), '은', '는')} 익혀 먹어야 해요.`), true); return false; }
  l.left--;
  syncBag();
  G.energy = clamp(G.energy + (+i.energy || 0), 0, E_MAX);
  advanceMinutes(10);
  logEvent('eat', i.name, 0);
  saveGame();
  renderPanel();
  note(tr(`You had some ${shortName(id).toLowerCase()}. Energy +${i.energy || 0}.`, `${josa(itemName(id), '을', '를')} 먹었어요. 에너지 +${i.energy || 0}.`));
  return true;
}
async function ride(pid) {
  const fare = hasPass() ? 0 : busFare();
  if (G.money < fare) { note(tr("You can't afford the fare.", '요금이 부족해요.'), true); return; }
  const bb = busAt(G.minute), nb = bb && bb.board;
  if (nb == null) { note(tr(`No more buses tonight. The last one left at ${clock(hm(CFG.bus_last, 1350))}.`, `오늘 버스는 끊겼어요. 막차는 ${clockKo(hm(CFG.bus_last, 1350))}에 떠났어요.`), true); return; }
  const waited = Math.max(0, Math.round(nb - G.minute)), said = busRideText(bb, G.minute, waited);
  if (fare) pay(-fare, 'Bus fare', 'spend', { ko: '버스 요금' });
  closePanel();
  advanceMinutes(waited + 15);
  await enterZone('city', pid);
  toast(`${said[0]} to ${place(pid).name}.`, `${said[1]} ${place(pid).name_ko || place(pid).name}에 왔어요.`, null, 4);
}

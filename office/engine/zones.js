/* Sim Office — zones (office/zones/<zone>.js) and building one. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- zones
// A zone spec (PLAN.md §5) from zones/<zone>.js, normalized; or a generated room with every place of the zone in a row.
const zoneSpecs = {};
let zoneFiles = [];
function placesOfZone(z) {
  const ids = rows('places').filter(p => p.zone === z).map(p => p.id);
  (BUILTIN_PLACES[z] || []).forEach(id => { if (!ids.includes(id)) ids.push(id); });
  return ids;
}
function zoneSpec(z) {
  if (zoneSpecs[z]) return zoneSpecs[z];
  const file = (window.SO_ZONES || {})[z];
  return (zoneSpecs[z] = file ? normalizeZone(z, file) : defaultZone(z));
}
function normalizeZone(z, f) {
  const Z = Object.assign({ indoor: false, size: [30, 30], floor: '#b9b4a8', tiles: [], props: [], places: {}, portals: [], lights: [] }, f);
  Z.id = z;
  Z.name = Z.name || (ZONE_NAMES[z] || [pretty(z)])[0];
  Z.name_ko = Z.name_ko || (ZONE_NAMES[z] || [])[1] || '';
  // where you can walk: the rectangle `size` round the origin, or `bounds` [x0, z0, x1, z1] when the zone says (the city: out to the trail and the beach)
  Z.walk = Array.isArray(f.bounds) ? f.bounds.slice() : [-Z.size[0] / 2, -Z.size[1] / 2, Z.size[0] / 2, Z.size[1] / 2];
  Z.places = Object.assign({}, Z.places);
  const missing = placesOfZone(z).filter(id => !Z.places[id] && (PLACES[id] ? PLACES[id].zone === z : true));
  if (missing.length) {
    const base = (Z.places[Z.spawn] || Object.values(Z.places)[0] || { at: [0, 0] }).at;
    missing.forEach((id, i) => { Z.places[id] = { at: [base[0] + (i - (missing.length - 1) / 2) * 1.4, base[1] + 1.2], guessed: true }; });
    if (rows('places').some(p => p.zone === z && missing.includes(p.id))) warnOnce('places:' + z, `zones/${z}.js has no position for ${missing.filter(id => PLACES[id]).join(', ')}; placed near the spawn`);
  }
  if (!Z.spawn || !Z.places[Z.spawn]) Z.spawn = Object.keys(Z.places)[0];
  return Z;
}
function defaultZone(z) {
  const ids = placesOfZone(z);
  const gap = 3.2, n = Math.max(1, ids.length);
  const indoor = z !== 'city';
  const w = n * gap + 3, d = indoor ? 9 : 12;
  const places = {}, props = [], portals = [];
  const KIND = {
    sleep: [[1.1, 0.4, 1.9], '#6d86b8'], eat: [[1.4, 0.9, 0.6], '#b9a27f'], shop: [[1.6, 1.3, 0.5], '#8fb57a'], transit: [[0.2, 2.0, 0.2], '#3f6fb0'],
    desk: [[1.2, 0.72, 0.7], '#a47d57'], work: [[1.2, 0.72, 0.7], '#a47d57'], counter: [[1.6, 0.95, 0.6], '#9c8a74']
  };
  ids.forEach((id, i) => {
    const x = -((n - 1) * gap) / 2 + i * gap;
    places[id] = { at: [x, 0.6], face: [x, 3] };
    const door = DOORS[z + ':' + id];
    if (door) {
      props.push({ pack: 'box', size: [1.1, 1.5, 0.12], color: '#7b5a3e', at: [x, -2.3] });
      portals.push({ at: [x, -1.7], size: [1.2, 0.8], to: door[0], arrive: door[1], label: 'To ' + zoneName(door[0])[0] });
    } else {
      const k = KIND[placeKind(id)] || [[1.0, 0.8, 0.6], '#9aa3b5'];
      props.push({ pack: 'box', size: k[0], color: k[1], at: [x, -1.4], solid: true });
    }
  });
  if (indoor) {
    const H = 1.4, t = 0.2;
    props.push({ pack: 'box', size: [w + t * 2, H, t], color: '#e8e2d6', at: [0, -d / 2 - t / 2] }, { pack: 'box', size: [w + t * 2, 0.3, t], color: '#e8e2d6', at: [0, d / 2 + t / 2] },
      { pack: 'box', size: [t, H, d], color: '#e8e2d6', at: [-w / 2 - t / 2, 0] }, { pack: 'box', size: [t, H, d], color: '#e8e2d6', at: [w / 2 + t / 2, 0] });
  } else {
    for (let x = -w / 2 + 2; x < w / 2; x += 4.5) props.push({ pack: 'box', size: [3.6, 3 + (hash(x) % 4), 2.4], color: ['#c9b8a4', '#a9b8c9', '#c4c0b5'][hash(x) % 3], at: [x, -d / 2 + 1.3], solid: true });
  }
  const floors = { home: '#d8c9ae', city: '#8e9a7c', office: '#cfd3d6', diner: '#caa98a', market: '#d9d6cc', airport: '#d7d9de', hotel: '#b8a58f', client: '#c9ccd2' };
  return { walk: [-w / 2, -d / 2, w / 2, d / 2], id: z, generated: true, name: zoneName(z)[0], name_ko: zoneName(z)[1], indoor, size: [w, d], floor: floors[z] || '#c8c8c8', tiles: [], props, places, portals,
    spawn: ids.find(id => DOORS[z + ':' + id]) || ids[0], lights: [], ambient: indoor ? 1 : undefined };
}
// the first portal to take from zone `from` to reach zone `to` (breadth-first over the portals)
function routeTo(from, to) {
  if (from === to) return null;
  const seen = new Set([from]), queue = [[from, null]];
  while (queue.length) {
    const [z, first] = queue.shift();
    for (const p of portalsOf(zoneSpec(z))) {
      if (!p.to || seen.has(p.to)) continue;
      const f = first || p;
      if (p.to === to) return f;
      seen.add(p.to);
      queue.push([p.to, f]);
    }
  }
  return null;
}

// ---------------------------------------------------------------- building a zone
let zoneId = null, Z = null, zoneGroup = null, buildToken = 0, busy = false, portalArmed = false;
let solids = [], zoneProps = {}, zoneAll = [], npcActors = {}, tags = [], disposables = [];
function propSize(p) {
  const s = (p.pack === 'box' ? 1 : (PACK_SCALE[p.pack] || 1)) * (p.scale || 1);
  if (p.pack === 'box') return p.size || [1, 1, 1];
  if (Array.isArray(p.solid)) return [p.solid[0], 0.8 * s, p.solid[1]];
  if (p.pack === 'city') return [0.9 * s, 1.4 * s, 0.9 * s];
  if (p.pack === 'roads') return [0.25 * s, 0.5 * s, 0.25 * s];
  if (p.pack === 'cars') return [1.8 * s, 1.2 * s, 4 * s];
  if (p.pack === 'buildings') return [4 * s, 5 * s, 3 * s];
  if (p.pack === 'homeware') return [1.5 * s, 1.5 * s, 1 * s];
  if (p.pack === 'food') return [0.25 * s, 0.25 * s, 0.25 * s];
  return [0.5 * s, 0.6 * s, 0.5 * s];
}
function rectOf(x, z, w, d, turn) {       // turn: the box turns with the prop (solid [w, d] is already in world axes)
  if (turn && Math.abs(Math.sin(turn * Math.PI / 180)) > 0.7) [w, d] = [d, w];
  return { x0: x - w / 2, x1: x + w / 2, z0: z - d / 2, z1: z + d / 2 };
}
function addProp(p, isTile) {
  if (!p || !p.at) return null;
  const holder = new T.Group();
  let obj = null, fallback = false;
  if (p.pack === 'box' || !p.pack) {
    const sz = p.size || [1, 1, 1];
    obj = new T.Mesh(boxGeo, toon(p.color || '#9aa3b5'));
    obj.scale.set(sz[0], sz[1], sz[2]);
  } else {
    obj = packNode(p.pack, p.node);
    if (obj) {
      const s = (PACK_SCALE[p.pack] || 1) * (p.scale || 1);
      if ((window.SO_ZONE_KIT || {}).ORIGIN === 'center') {      // the zone kit asks for footprint-centred nodes
        const off = centreOf(p.pack, p.node, obj);
        const g = new T.Group();
        obj.position.copy(off);
        g.add(obj);
        obj = g;
      }
      obj.scale.multiplyScalar(s);
    }
    else {
      fallback = true;
      const sz = isTile ? [3 * (p.scale || 1), 0.02, 3 * (p.scale || 1)] : propSize(p);
      obj = new T.Mesh(boxGeo, toon(isTile ? '#7d828c' : '#a7abb3'));
      obj.scale.set(sz[0], sz[1], sz[2]);
    }
  }
  holder.add(obj);
  holder.position.set(p.at[0], (p.lift || 0) + (isTile ? 0.001 : 0), p.at[1]);
  holder.rotation.y = (p.turn || 0) * Math.PI / 180;
  zoneGroup.add(holder);
  holder.updateMatrixWorld(true);
  holder.traverse(o => { o.matrixAutoUpdate = false; });
  const flat = isTile || p.pack === 'food' || /^(floor|rug|path|driveway|tile|road-(?!sign))/i.test(p.node || '');
  shadows(holder, !flat);
  if (!isTile && !flat) zoneBox.union(new T.Box3().setFromObject(holder));
  if (p.pack === 'roads' && /^light-(square|curved)/.test(p.node || '')) addLamp(p, holder);
  if (p.solid && !isTile) {
    if (Array.isArray(p.solid)) solids.push(rectOf(p.at[0], p.at[1], p.solid[0], p.solid[1], 0));
    else if (p.pack === 'box' || fallback) { const sz = p.pack === 'box' ? (p.size || [1, 1, 1]) : propSize(p); solids.push(rectOf(p.at[0], p.at[1], sz[0], sz[2], p.turn)); }
    else {
      const b = new T.Box3().setFromObject(holder);
      if (!b.isEmpty()) solids.push({ x0: b.min.x, x1: b.max.x, z0: b.min.z, z1: b.max.z });
    }
  }
  if (!isTile && !(p.pack === 'food') && !/^(floor|rug)/i.test(p.node || '')) { occluders.push(holder); occluderSet.add(holder); }
  const rec = { spec: p, holder, object: obj };
  if (p.id) zoneProps[p.id] = rec;
  zoneAll.push(rec);
  return rec;
}
function zonePacks(spec) {
  const need = new Set();
  (spec.tiles || []).concat(spec.props || []).forEach(p => { if (p && p.pack && p.pack !== 'box') need.add(p.pack); });
  return need;
}
async function enterZone(z, arrive, at, heading) {
  const token = ++buildToken;
  busy = true;
  $('fade').classList.add('on');
  const spec = zoneSpec(z);
  const need = zonePacks(spec);
  npcsIn(z).forEach(n => need.add(n.row.model));
  if (G) need.add(G.model);
  await Promise.all(Array.from(need).map(loadPack));
  reportMissing();
  if (token !== buildToken) return false;
  if (talk) endTalk();
  endLife();
  pathQueue.length = 0;
  nav = null;
  movers.length = 0;
  if (zoneGroup) scene.remove(zoneGroup);
  disposables.forEach(d => d.dispose());
  disposables = [];
  zoneGroup = new T.Group();
  scene.add(zoneGroup);
  Z = spec;
  zoneId = z;
  solids = []; zoneProps = {}; zoneAll = []; npcActors = {}; occluders = []; occluderSet = new Set(); fadedNow = new Set();
  tags.forEach(t => t.el.remove());
  tags = [];
  Object.keys(bubbles).forEach(k => { bubbles[k].remove(); delete bubbles[k]; });
  // floor: the walkable rectangle indoors, a wide ground outdoors
  const [w, d] = spec.size;
  const fw = spec.indoor ? w : w + 160, fd = spec.indoor ? d : d + 160;
  const fg = new T.PlaneGeometry(fw, fd).rotateX(-Math.PI / 2);
  disposables.push(fg);
  const floor = new T.Mesh(fg, toon(spec.floor || '#c8c8c8'));
  floor.position.y = -0.01;
  floor.receiveShadow = true;
  zoneGroup.add(floor);
  if (spec.indoor) {           // the rest of the building around the room, seen over the walls
    const og = new T.PlaneGeometry(w + 80, d + 80).rotateX(-Math.PI / 2);
    disposables.push(og);
    const outer = new T.Mesh(og, toon('#' + new T.Color(spec.outside || spec.floor || '#c8c8c8').lerp(new T.Color('#8a8f99'), 0.55).getHexString()));
    outer.position.y = -0.03;
    outer.receiveShadow = true;
    zoneGroup.add(outer);
  }
  zoneBox.makeEmpty();
  lamps.length = 0;
  (spec.tiles || []).forEach(t => addProp(t, true));
  (spec.props || []).forEach(p => addProp(p, false));
  setupLights();
  // portal signs and place labels
  portalsOf(spec).forEach(p => {
    addTag(p.label || ('To ' + zoneName(p.to)[0]), new T.Vector3(p.at[0], 1.1, p.at[1]), 'portal', 14, p.label_ko || (zoneName(p.to)[1] ? '→ ' + zoneName(p.to)[1] : ''));
    const g = new T.PlaneGeometry(p.size ? p.size[0] : 1, p.size ? p.size[1] : 1).rotateX(-Math.PI / 2);
    disposables.push(g);
    const m = new T.Mesh(g, portalMat);
    m.position.set(p.at[0], 0.015, p.at[1]);
    m.renderOrder = 1;
    zoneGroup.add(m);
  });
  Object.keys(spec.places).forEach(id => {
    if (placeActions(id).length) addTag(place(id).name, new T.Vector3(spec.places[id].at[0], 0.02, spec.places[id].at[1]), 'place', 5, place(id).name_ko);
  });
  zoneGroup.add(marker.group);
  lampTimer = 0;
  applyEnvironment();
  // people
  refreshNpcs(true);
  if (G) {
    ensurePlayer();
    const pl = arrive && spec.places[arrive] ? spec.places[arrive] : null;
    const spot = at || (pl ? pl.at : (spec.places[spec.spawn] || { at: [0, 0] }).at);
    player.pos.set(spot[0], 0, spot[1]);
    if (heading != null) player.heading = heading;
    else if (pl && pl.face) player.heading = Math.atan2(pl.face[0] - spot[0], pl.face[1] - spot[1]);
    else player.heading = Math.atan2(-spot[0], -spot[1]);
    player.sit = false;
    const onTop = Object.values(npcActors).find(a => Math.hypot(a.pos.x - player.pos.x, a.pos.z - player.pos.z) < 0.7);
    if (onTop) {
      player.pos.copy(freeSpot(onTop, 1.0));
      player.heading = Math.atan2(onTop.pos.x - player.pos.x, onTop.pos.z - player.pos.z);
    }
    collide(player.pos, true);
    scene.add(player.holder);
  }
  portalArmed = false;
  cam.ready = false;
  if (spec.setup) { try { spec.setup(api); } catch (e) { console.error(`zones/${z}.js setup:`, e); } }
  if (jogTrail) { jogTrail.dispose(); jogTrail = null; }
  if (z === 'city' && window.SO_JOG) { try { jogTrail = SO_JOG.trail(api); } catch (e) { console.error('Sim Office jog:', e); } }
  startLife();
  startSeason();
  busy = false;
  setTimeout(() => $('fade').classList.remove('on'), 60);
  if (G) { G.zone = z; if (state === 'play') arrived(z); saveGame(); }
  goalTimer = 0; actTimer = 0;
  return true;
}
// coming into a zone on a working day: the office is the first time at work today (on time, late), a trip zone is
// a day away on business
let checkedIn = null;
function arrived(z) {
  if (myOff(G.day)) return;
  if (TRAVEL_ZONES.includes(z)) G.tripDay = G.day;
  if (z === 'office' && G.outDay === G.day) G.outDay = null;          // back from lunch or an errand
  if (z === 'office' && G.inDay !== G.day && G.minute < 17 * 60) checkedIn = checkIn();
  hybridArrived(z);          // hybrid work: came to the office on a remote day, or home again after stepping out
}
// going out of the office on a working day before config early_before: fine for lunch, but if you don't come back it
// is leaving early (closeDay)
const EARLY = () => hm(CFG.early_before, 960);
function leftOffice(z) {
  if (!G || myOff(G.day) || fired() || G.inDay !== G.day || TRAVEL_ZONES.includes(z) || G.minute >= EARLY()) return;
  G.outDay = G.day; G.outAt = Math.floor(G.minute);
  toast(`Heading out at ${clock(G.minute)}. Be back before ${clock(EARLY())}, or it counts as leaving early.`, `${clockKo(G.minute)}에 나가요. ${clockKo(EARLY())} 전에 돌아오지 않으면 조퇴예요.`, null, 4.5);
}
const portalMat = new T.MeshBasicMaterial({ color: 0x3fb5ad, transparent: true, opacity: 0.35, depthWrite: false, toneMapped: false });

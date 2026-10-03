/* Sim Office — the player and the people around: where they are through the day. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- the player and the people around
let player = null;
function ensurePlayer() {
  if (player && player.model === G.model && player.boxed === !packReady(G.model)) return;
  if (player) scene.remove(player.holder);
  player = makeActor('player', G.model, { name: G.name });
  player.boxed = !packReady(G.model);
  player.bubbleY = BUBBLE_Y;
}
// where an npc is now: at the place of its first open episode; otherwise where the schedule table puts them at this
// time of this day, or nowhere (null: off work, at home) when no row fits; without rows, always at their own place
// days: 'all', 'weekday', 'weekend' (a company holiday counts as a weekend), names of days ('mon,tue,wed'), or
// game days ('11-12'). Shift workers are not at a place that is closed all day (holiday hours).
const DAY_NAMES = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
function scheduledPlace(n) {
  const list = SCHEDULE[n.id];
  if (!list || !G) return homeToday(n, n.place) ? null : n.place;
  const days = offWork(G.day) ? 'weekend' : 'weekday', name = DAY_NAMES[(G.day - 1) % 7];
  const onDay = (d) => { const m = /^(\d+)(?:-(\d+))?$/.exec(d); return m ? G.day >= +m[1] && G.day <= +(m[2] || m[1]) : d === 'all' || d === days || listOf(d).includes(name); };      // '11-12': those game days
  const s = list.find(s => onDay(String(s.days)) && G.minute >= hm(s.time_from, 0) && G.minute < hm(s.time_to, 1440));
  if (!s || shutAllDay(s.place) || shutAllDay(zoneOfPlace(s.place))) return null;
  if (homeToday(n, s.place)) return null;          // hybrid work: a remote day, working from home
  return s.place;
}
function npcPlaceNow(n) {
  if (!G) return scheduledPlace(n);
  const open = openEpisodes().filter(e => e.place);
  // their own conversation first; otherwise one they have a line in (a meeting: everybody who speaks is in the room,
  // also round the phone of a call), if it is in the building they work in (not the client on the screen)
  const ep = open.find(e => e.npc === n.id && !isPhone(e))
    || open.find(e => e.npc !== n.id && ((SPEAKERS[e.id] || []).includes(n.id) || listOf((ROUTINE_OF[e.id] || {}).people).includes(n.id)) && n.place && zoneOfPlace(n.place) === zoneOfPlace(e.place) && scheduledPlace(n) && zoneOfPlace(scheduledPlace(n)) === zoneOfPlace(e.place));
  if (ep) return ep.place;
  const lunch = lunchPlace(n);          // a coworker who invited you to lunch waits at the diner
  if (lunch) return lunch;
  // somebody on the next shift at the same counter steps away while a coworker there has a conversation waiting
  const at = scheduledPlace(n);
  if (at && open.some(e => e.place === at && e.npc && e.npc !== n.id && !isPhone(e) && npcRow(e.npc).place === n.place)) return null;
  return at;
}
// opening hours (config hours_<zone or place>, hours_<…>_weekend: 'HH:MM-HH:MM'); never closed while a conversation waits there
// holiday hours: hours_<id>_<YYYY-MM-DD> ('07:00-16:00', or 'closed': [0, 0])
function hoursOf(id, d) {
  if (!G || !id) return null;
  d = d == null ? G.day : d;
  const v = CFG['hours_' + id + '_' + isoOf(d)] || (isWeekend(d) && CFG['hours_' + id + '_weekend']) || CFG['hours_' + id];
  if (/^closed$/i.test(String(v || ''))) return [0, 0];
  const m = /^(\d{1,2}:\d{2})-(\d{1,2}:\d{2})$/.exec(String(v || ''));
  return m ? [hm(m[1], 0), hm(m[2], 1440)] : null;
}
const shutAllDay = (id) => { const h = hoursOf(id); return !!h && h[0] === h[1]; };
// places with their own hours today (holiday hours): [{ id, h }]
function holidayHours(d) {
  const iso = isoOf(d), end = '_' + iso;
  return !iso ? [] : Object.keys(CFG).filter(k => k.startsWith('hours_') && k.endsWith(end)).map(k => ({ id: k.slice(6, -end.length), h: hoursOf(k.slice(6, -end.length), d) })).filter(x => x.h);
}
const hoursName = (id) => (zoneSpecs[id] || (window.SO_ZONES || {})[id]) ? zoneName(id) : [place(id).name, loc(place(id))];
function closedNow(id) {
  const h = hoursOf(id);
  if (!h || (G.minute >= h[0] && G.minute < h[1])) return false;
  return !openEpisodes().some(e => e.place === id || zoneOfPlace(e.place) === id);
}
const hoursText = (id) => { const h = hoursOf(id); return !h ? '' : h[0] === h[1] ? tr('closed today', '오늘 휴무') : `${clock(h[0])} – ${clock(h[1])}`; };
function npcsIn(z) {
  const spec = zoneSpec(z);
  const out = [];
  const byPlace = {};
  cast().concat(orphanNpcs()).forEach(n => {
    const pid = npcPlaceNow(n);
    if (!pid || !placeIn(pid, z)) return;
    const pl = spec.places[pid];
    if (!pl) return;
    const k = byPlace[pid] = (byPlace[pid] || 0) + 1;
    // the first one there has the place itself; the others stand round it, clear of the furniture and of one another
    let off = [0, 0];
    if (k > 1) {
      const spots = [];
      for (const r of [0.8, 1.1, 1.4]) for (let j = 0; j < 10; j++) spots.push([Math.cos(k * 2.1 + j * 0.63) * r, Math.sin(k * 2.1 + j * 0.63) * r]);
      const B = spec.walk || [-99, -99, 99, 99];
      const free = (o) => { const x = pl.at[0] + o[0], q = pl.at[1] + o[1];
        return x > B[0] + 0.3 && x < B[2] - 0.3 && q > B[1] + 0.3 && q < B[3] - 0.3 && (z !== zoneId || !solids.some(b => x > b.x0 - NPC_R && x < b.x1 + NPC_R && q > b.z0 - NPC_R && q < b.z1 + NPC_R))
          && !out.some(w => Math.hypot(w.at[0] - x, w.at[1] - q) < 0.6); };
      off = spots.find(free) || spots[0];
    }
    out.push({ row: n, place: pid, at: [pl.at[0] + off[0], pl.at[1] + off[1]], face: pl.face, sit: !!pl.sit && k === 1 });
  });
  return out;
}
function orphanNpcs() {     // people named by episodes but missing from the npcs table
  const seen = new Set(cast().map(n => n.id)), out = [];
  episodes().forEach(e => { if (e.npc && !seen.has(e.npc)) { seen.add(e.npc); out.push(npcRow(e.npc)); } });
  return out;
}
let npcSig = '';
function refreshNpcs(force) {
  if (!zoneId) return;
  const want = npcsIn(zoneId);
  const sig = want.map(w => w.row.id + '@' + w.place).join('|');
  if (!force && sig === npcSig) return;
  npcSig = sig;
  const keep = new Set(want.map(w => w.row.id));
  // someone whose place moved while you are here walks there (or out through the nearest door); on entering a zone,
  // at the start of a day or when the debug API sets the clock (force), everyone is simply where they belong
  const live = !force && G && state === 'play' && !busy;
  Object.keys(npcActors).forEach(id => {
    if (keep.has(id)) return;
    const a = npcActors[id];
    if (live && !a.leaving && leaveZone(a)) return;
    if (a.leaving && live) return;
    dropNpc(id);
  });
  want.forEach(w => {
    const put = () => {
      if (!zoneId || !keep.has(w.row.id)) return;
      let a = npcActors[w.row.id];
      if (!a) {
        a = npcActors[w.row.id] = makeActor(w.row.id, w.row.model, { name: w.row.name, row: w.row });
        a.mark = new T.Sprite(new T.SpriteMaterial({ map: bangTex, depthWrite: false, toneMapped: false }));
        a.mark.scale.setScalar(0.2);
        a.mark.position.y = MARK_Y;
        a.mark.renderOrder = 5;
        a.mark.visible = false;
        a.holder.add(a.mark);
        zoneGroup.add(a.holder);
      }
      a.leaving = false;
      const home = w.face ? Math.atan2(w.face[0] - w.at[0], w.face[1] - w.at[1])
        : player ? Math.atan2(player.pos.x - w.at[0], player.pos.z - w.at[1]) : Math.atan2(-w.at[0], -w.at[1]);
      if (a.place !== w.place) {
        const was = a.place;
        a.place = w.place;
        a.goal = { at: w.at, home, sit: w.sit, place: w.place };
        if (live && was) walkTo(a, w.at);
        else arrive(a);
      } else if (force && a.walk) arrive(a);
    };
    if (packs[w.row.model] && packs[w.row.model].status !== 'loading') put();
    else loadPack(w.row.model).then(() => { reportMissing(); put(); });
  });
}
function dropNpc(id) {
  const a = npcActors[id];
  if (!a) return;
  if (a.walk && a.walk.req) a.walk.req.cancelled = true;
  zoneGroup.remove(a.holder);
  delete npcActors[id];
  if (bubbles[id]) { bubbles[id].remove(); delete bubbles[id]; }
}
// standing at the goal: facing the way the place says, sitting if it is a seat, a cup in hand in a kitchen or at the coffee cart
function arrive(a) {
  const g = a.goal;
  if (a.walk && a.walk.req) a.walk.req.cancelled = true;
  a.walk = null;
  if (!g) return;
  if (a.leaving) { dropNpc(a.id); return; }
  a.pos.set(g.at[0], 0, g.at[1]);
  a.home = g.home;
  a.heading = g.home;
  a.sit = !!g.sit;
  a.wantCup = !a.sit && /kitchen|coffee/.test(g.place || '');
  holdCup(a, a.wantCup);
  play(a, rest(a), { fade: 0.25 });
  a.gestureAt = elapsed + 12 + Math.random() * 25;
}
function walkTo(a, at) {
  if (a.walk && a.walk.req) a.walk.req.cancelled = true;
  if (Math.hypot(at[0] - a.pos.x, at[1] - a.pos.z) > 40) { a.walk = null; arrive(a); return; }          // the other end of town: by bus, not on foot
  a.wantCup = false;
  holdCup(a, false);
  a.sit = false;
  if (gesturing(a) || a.current !== a.actions.walk) play(a, 'idle', { fade: 0.25 });
  const w = a.walk = { path: null, i: 0, blocked: 0, req: null, to: at };
  w.req = requestPath([a.pos.x, a.pos.z], at, {}, (path) => {
    if (a.walk !== w) return;
    w.req = null;
    if (!path) arrive(a);           // no way there: just be there
    else { w.path = path; w.i = 0; }
  });
}
function leaveZone(a) {             // out through the nearest door; gone when there
  let best = null, bd = Infinity;
  (Z.portals || []).filter(p => !p.hero).forEach(p => { const d = Math.hypot(p.at[0] - a.pos.x, p.at[1] - a.pos.z); if (d < bd) { bd = d; best = p; } });
  if (!best || bd > 40) return false;
  a.leaving = true;
  a.place = null;
  a.goal = { at: best.at, home: a.heading, sit: false, place: null };
  walkTo(a, best.at);
  return true;
}

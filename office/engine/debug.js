/* Sim Office — for tests (headless Chrome): window.SO.debug. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';

// ---------------------------------------------------------------- for tests (headless Chrome): SO.debug
const wait = (ms) => new Promise(r => setTimeout(r, ms));
async function until(cond, ms) { for (let t = 0; t < (ms || 5000); t += 50) { if (cond()) return true; await wait(50); } return false; }
function nearSpot(ep) {           // where to stand to talk: in front of the person
  const pid = isPhone(ep) ? ep.place : npcPlaceNow(npcRow(ep.npc)) || ep.place;
  return { zone: zoneOfPlace(pid), pid };
}
function debugPath(from, to, opts) {          // the way between two points and whether it crosses anything solid
  const p = findPath(from, to, opts || {}), g = navGrid(), bad = [];
  if (p) for (let i = 1; i < p.length; i++) {
    const a = p[i - 1], b = p[i], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / (NAV_CELL * 0.5));
    for (let j = 0; j < n; j++) {
      const x = a[0] + (b[0] - a[0]) * j / n, z = a[1] + (b[1] - a[1]) * j / n;
      const ci = Math.floor((x - g.x0) / NAV_CELL), ck = Math.floor((z - g.z0) / NAV_CELL);
      if (ci >= 0 && ck >= 0 && ci < g.nx && ck < g.nz && g.block[ck * g.nx + ci]) bad.push([+x.toFixed(2), +z.toFixed(2)]);
    }
  }
  return { path: p && p.map(q => [+q[0].toFixed(2), +q[1].toFixed(2)]), crosses: bad.slice(0, 5) };
}
const debug = {
  path: debugPath,
  get ready() { return ready; }, get state() { return state; }, get busy() { return busy; },
  get day() { return G ? G.day : null; }, get time() { return G ? hhmm(G.minute) : null; }, get minute() { return G ? G.minute : null; },
  get money() { return G ? G.money : null; }, get energy() { return G ? Math.round(G.energy * 10) / 10 : null; }, get zone() { return zoneId; },
  get zones() { return ZONE_ORDER.slice(); }, get save() { return G ? JSON.parse(JSON.stringify(G)) : lastSave(); }, get saves() { return savedGames().map(g => g.name); },
  get actions() { return actions.map(a => a.label); }, get npcs() { return Object.keys(npcActors).filter(id => !npcActors[id].leaving); },
  get walking() { return Object.keys(npcActors).filter(id => npcActors[id].walk); },
  get models() { const o = {}; Object.keys(packs).forEach(k => { o[k] = packs[k].status; }); return o; },
  set speed(v) { debugSpeed = +v || 1; }, set fast(v) { fastMode = !!v; },
  get gfx() { return gfxHigh() ? 'high' : 'low'; }, set gfx(v) { settings.gfx = v === 'low' ? 'low' : 'high'; applyQuality(); },
  get hero() { return G ? G.hero : null; }, get heroes() { return HEROES.map(h => h.id); },
  // the language of the screen, the score and the work record; wrong(n) picks the n-th wrong answer of the turn on screen
  get lang() { return settings.lang; }, set lang(v) { settings.lang = v === 'ko' ? 'ko' : 'en'; langBox.value = settings.lang; saveSettings(); applyLang(); },
  get mission() { return G ? { count: missionCount(), state: G.mission || null, free: freePlay() } : null; },
  get score() { return score(); }, get work() { return G ? JSON.parse(JSON.stringify(work())) : null; }, get standing() { return standing()[0]; },
  get choices() { return Array.from(dlg.querySelectorAll('.choices button')).map(b => b.textContent); },
  wrong(n) { if (!talk) return null; const i = talk.order.filter(x => x >= 0)[n || 0]; pick(i); return dlg.querySelector('.feedback').textContent; },
  tour: { async start() { await startTour(); return state; }, do(what) { tourDo(what); return Object.assign({}, tour); }, get view() { return Object.assign({}, tour); }, get ref() { return tour; } },
  // the jogging game: jog.start(story) and what a run says about itself; jog.press(0 | 1) steps, jog.auto(n) lands the next n steps on the beat
  jog: {
    async start(story) { await startJog(!!story); return !!jog; },
    get on() { return !!jog; }, get state() { return jog ? jog.state : null; },
    press(foot) { if (jog) jog.press(foot); },
    stop() { if (jog) jog.stop(); },
    records() { return window.SO_JOG ? SO_JOG.records() : null; }
  },
  voice(id) { const p = voiceFor(voiceOf(NPCS[id] || {})); return { name: p.voice ? p.voice.name : null, shift: p.shift }; },
  async start(heroId) {          // a new game as that hero (anything else: the first hero)
    await until(() => ready, 20000);
    if (talk) endTalk();
    $('card').hidden = true; panel.hidden = true;
    await startGame(newGame(heroId), true);
    return true;
  },
  async goto(zone, placeId) {
    if (!G) await this.start();
    if (talk) endTalk();
    if (!$('card').hidden) closeCard(true);
    if (!panel.hidden) closePanel();
    state = 'play';
    await enterZone(zone, placeId || null);
    return zoneId;
  },
  episodes() { return openEpisodes().map(e => e.id); },
  // walk: true lets people walk to where the new time puts them (as when the clock runs), instead of placing them there
  setTime(t, walk) { if (G) { G.minute = typeof t === 'number' ? t : hm(t, G.minute); goalTimer = 0; npcSig = ''; refreshNpcs(!walk); } return this.time; },
  // send someone in this zone walking to a place (as when an episode moves them); returns the path length or null
  walk(id, placeId) {
    const a = npcActors[id], pl = Z && Z.places[placeId];
    if (!a || !pl) return null;
    a.place = placeId;
    a.goal = { at: pl.at, home: pl.face ? Math.atan2(pl.face[0] - pl.at[0], pl.face[1] - pl.at[1]) : a.heading, sit: !!pl.sit, place: placeId };
    walkTo(a, pl.at);
    return true;
  },
  where(id) { const a = npcActors[id]; return a ? { at: [+a.pos.x.toFixed(2), +a.pos.z.toFixed(2)], walking: !!a.walk, sit: a.sit, anim: a.current ? a.current.getClip().name : null, cup: !!a.cup } : null; },
  // the zone's background life: counts, and paused (settable) to freeze it for screenshots
  life: {
    get paused() { return lifePaused; }, set paused(v) { lifePaused = !!v; },
    get cars() { return life && life.info ? life.info().cars : 0; }, get walkers() { return life && life.info ? life.info().walkers : 0; },
    get sitters() { return life && life.info ? life.info().sitters : 0; }, get signal() { return life && life.info ? life.info().signal : null; },
    get ms() { return +lifeMs.toFixed(3); },          // average time of one update (ms)
    info() { return life && life.info ? life.info() : null; }
  },
  setDay(d) { if (G) { G.day = +d; goalTimer = 0; refreshNpcs(true); } return G && G.day; },
  // the season in the scenery: season() what it shows here now, season('2026-12-15') as on that date, season(null) back to the game's date
  season(iso) { if (iso !== undefined) { seasonForce = iso ? new Date(iso + 'T00:00:00Z') : null; startSeason(); } return season ? season.info() : null; },
  async startEpisode(id) {
    const ep = (G && episodes().find(e => e.id === id)) || EPISODES[id];          // today's version (a video call on a remote day)
    if (!ep) throw new Error('no episode ' + id);
    if (!G) await this.start();
    if (!$('card').hidden) closeCard(true);
    if (!panel.hidden) closePanel();
    if (talk) endTalk();
    state = 'play';
    const s = nearSpot(ep);
    if (s.zone && !placeIn(s.pid, zoneId)) await enterZone(s.zone, s.pid);
    npcSig = '';
    refreshNpcs(true);
    if (isPhone(ep)) {
      const at = (Z.places[ep.place] || { at: [0, 0] }).at;
      player.pos.set(at[0], 0, at[1]);
      collide(player.pos, true);
      beginEpisode(ep, null);
      return state;
    }
    await until(() => npcActors[ep.npc] || !npcRow(ep.npc), 3000);
    const a = npcActors[ep.npc];
    if (a) {
      const spot = freeSpot(a, 0.9);
      collide(spot, true);
      player.pos.copy(spot);
      player.heading = Math.atan2(a.pos.x - spot.x, a.pos.z - spot.z);
      cam.ready = false;
    }
    beginEpisode(ep, a || null);
    return state;
  },
  // finish what is on screen now: answer the turn with the model answer, continue, or close a card or panel
  async advance() {
    if (state === 'talk' && talk) {
      if (!dlg.classList.contains('answered')) answered();
      await until(() => !dlg.querySelector('.next').hidden, 4000);
      dlg.querySelector('.next').click();
      await wait(60);
      return 'turn';
    }
    if (choiceNow && choiceNow.picked == null) { pickChoice(bestChoice(choiceNow.row)); return choiceNow.spec.kind; }
    if (!$('card').hidden) { closeCard(true); await wait(60); return 'card'; }
    if (!panel.hidden) { closePanel(); return 'panel'; }
    return state;
  },
  async autoplayEpisode(id) {
    if (!(talk && talk.ep.id === id)) await this.startEpisode(id);
    for (let i = 0; i < 30 && (state === 'talk' || state === 'card'); i++) await this.advance();
    return !!(G && G.done[id]);
  },
  async sleep() {
    if (!G) return false;
    if (talk) endTalk();
    if (!panel.hidden) closePanel();
    if (!$('card').hidden) closeCard(true);
    state = 'play';
    await goToSleep(false);
    await until(() => !busy, 8000);
    return G.day;
  },
  buy(itemId) { return buy(itemId); },
  // the sun today
  get sun() { const s = sunOf(G ? G.day : 1); return s ? { rise: hhmm(s.rise), set: hhmm(s.set), dark: darkAt(hourNow() * 60), solar: +solarHour(hourNow(), sunDay()).toFixed(2) } : null; },
  get date() { return G ? dateLong(G.day) : null; }, get holiday() { const h = G && holidayOf(G.day); return h ? h.name : null; },
  // the calendar rules for any day: payday, rent, bills, the company's days off, holiday hours, the weather
  rules: (d) => ({ date: isoOf(d), payday: isPayday(d), rent: isRentDay(d), bills: billsDue(d).map(b => b.id), off: offWork(d), company: companyOff(d), hours: holidayHours(d).map(x => [x.id, x.h]), weather: weatherOf(d) }),
  npcAt: (id) => { const n = npcRow(id); return n ? npcPlaceNow(n) : null; },
  get punch() { return G ? Object.assign({}, G.punch) : {}; }, pay(amount, text) { pay(+amount, text || 'Test'); return G.money; },
  arrive(z, place) { return travel(z, place); },
  panel(kind, arg) { if (kind) openPanel(kind, arg); else if (!panel.hidden) closePanel(); return state; },
  mapTab(t) { MAP.tab = t === 'room' ? 'room' : 'town'; if (panelKind === 'map') renderPanel(); return MAP.tab; },
  mapDistrict(d) { MAP.district = d == null ? null : d === 'all' ? 'all' : +d; if (panelKind === 'map') renderPanel(); return MAP.district; },          // the town map: 0 Westside, 1 downtown, 'all'
  warp(x, z, heading) { if (!player || !Z) return null; player.pos.set(x, 0, z); if (heading != null) player.heading = heading; collide(player.pos, true); return [+player.pos.x.toFixed(2), +player.pos.z.toFixed(2)]; },          // stand somewhere in this zone
  closeCard() { if (!$('card').hidden) closeCard(true); if (!panel.hidden) closePanel(); return state; },
  reset() { resetGame(); store.del(SET_KEY); return true; },
  // what stands between the player and the camera (for tuning zone files)
  blockers() {
    if (!player) return [];
    const from = new T.Vector3(player.pos.x, 0.9, player.pos.z), sx = Math.sin(player.heading), sz = Math.cos(player.heading);
    return [[2.6, 1.55], [3.3, 1.85]].map(([b, h]) => {
      const to = new T.Vector3(player.pos.x - sx * b, h, player.pos.z - sz * b);
      inRoom(to);
      const d = to.clone().sub(from), l = d.length();
      ray.set(from, d.normalize()); ray.far = l;
      const hit = ray.intersectObjects(occluders, true)[0];
      if (!hit) return null;
      let o = hit.object, spec = null;
      while (o && !spec) { const rec = Object.values(zoneProps).find(r => r.holder === o); if (rec) spec = rec.spec; o = o.parent; }
      const holder = occluders.find(h => { let q = hit.object; while (q) { if (q === h) return true; q = q.parent; } return false; });
      return { dist: +hit.distance.toFixed(2), mesh: hit.object.name, at: holder ? [+holder.position.x.toFixed(2), +holder.position.z.toFixed(2)] : null };
    });
  }
};
DEBUG_PARTS.forEach(part => Object.defineProperties(debug, Object.getOwnPropertyDescriptors(part)));          // what the systems add (debugPart)
window.SO = { debug, api, keys };

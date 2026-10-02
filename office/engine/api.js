/* Sim Office — what zone files, office/life.js, office/jog.js and office/season.js see; jogging, the life and the season of a zone. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- the api a zone file's setup/update sees
const api = {
  T, scene, camera, renderer, toon, litMaterial, shadows, packNode, addProp: (p) => addProp(p, false), toast, say, speak, play,
  get zone() { return zoneId; }, get spec() { return Z; }, get group() { return zoneGroup; }, get player() { return player; },
  get npcs() { return npcActors; }, get props() { return zoneProps; }, get game() { return G; }, get state() { return state; },
  get day() { return G ? G.day : 0; }, get minute() { return hourNow() * 60; }, isDone: (id) => !!(G && G.done[id]),
  solid: (x0, z0, x1, z1) => solids.push({ x0, z0, x1, z1 }),
  occlude: (obj) => { occluders.push(obj); occluderSet.add(obj); },     // see-through when it hides a person from the camera
  // for office/life.js (and zone files): every placed prop and tile ({ spec, holder, object }), the static solids, people
  // made like the npcs (a.holder to add, api.animate(a, dt) each frame), a way-finder (one search a frame),
  // colliders that move (circles { x, z, r } the player is pushed out of), the light and the graphics setting
  get propList() { return zoneAll; }, get solids() { return solids; }, get movers() { return movers; },
  get elapsed() { return elapsed; }, get gfx() { return gfxHigh() ? 'high' : 'low'; }, get night() { return env.night; },
  get dark() { return darkAt(hourNow() * 60); }, get solarMinute() { return solarHour(hourNow(), sunDay()) * 60; },
  get weather() { return weatherNow(); }, get hero() { return G ? G.hero : null; }, get lang() { return settings.lang; }, get weekend() { return !!G && (offWork(G.day) || dayOff(G.day)); },
  get models() { return Object.keys(window.SO_MODELS || {}); }, characters: CHARACTERS,
  shelter, get raining() { return raining(); },          // an umbrella over a person (life.js: the passers-by)
  actor: (model, opts) => makeActor((opts && opts.id) || 'extra', model, opts), animate, locomotion, gesturing, rest, glowTexture: () => glowTex,
  loadPack, packReady, findPath: (from, to, opts, cb) => requestPath(from, to, opts, cb),
  blocked: (x, z, r) => solids.some(s => x > s.x0 - r && x < s.x1 + r && z > s.z0 - r && z < s.z1 + r),
  street: (kind, at) => street(kind, at),          // life.js: a horn, jaywalking, crossing against the signal
  get date() { return seasonDate(); }, cfg: CFG          // season.js: the game's date (a Date at UTC midnight, or null) and the config
};

// ---------------------------------------------------------------- jogging (office/jog.js): a run round the Fairview Loop, seen through your own eyes
// From the door of your home (story: the run takes 40 minutes of the day and some energy, and you come back home), or
// from the title screen as a game of its own (nobody's day: a clear morning, no clock).
let jog = null, jogTrail = null;
async function startJog(story) {
  if (!window.SO_JOG || jog || busy) return;
  if (story) {
    if (G.energy < 15) { toast("You're too tired to run. Eat something first.", '달리기엔 너무 지쳤어요. 먼저 뭘 좀 드세요.', 'bad'); return; }
    if (G.minute >= 21.5 * 60) { toast("It's too late for a run.", '달리기엔 너무 늦었어요.'); return; }
  }
  const from = story ? { zone: zoneId, place: Object.keys(Z.places).find(p => placeKind(p) === 'door') } : null;
  const who = story ? hero() : heroOf(chosen);
  if (!story) { if (G) { saveGame(); G = null; } if (player) scene.remove(player.holder); }
  state = 'jog';
  $('title').hidden = true;
  $('side').hidden = true;
  toggleMenu(false);
  await enterZone('city', null, SO_JOG.route.pts[0]);
  state = 'jog';
  if (player) player.holder.visible = false;
  marker.group.visible = false;
  jog = SO_JOG.create(Object.assign(Object.create(api), {
    place(x, z, heading) { if (player) { player.pos.set(x, 0, z); player.heading = heading; } cam.pos.copy(camera.position); cam.look.set(x, 0.7, z); }
  }), {
    name: who.name, model: who.model, voice: voiceOf(NPCS[who.id] || { id: who.id, model: who.model }),
    onEnd(result, again) {
      jog = null;
      if (player) player.holder.visible = true;
      resize();
      if (story && result) {
        advanceMinutes(40);
        G.energy = clamp(G.energy - 12, 0, E_MAX);
        logEvent('jog', `Jog: ${result.time.toFixed(2)} s, ${result.score} points`, 0, { time: result.time, score: result.score });
      }
      if (again && (!story || (G.energy >= 15 && G.minute < 21.5 * 60))) { state = story ? 'play' : 'title'; startJog(story); return; }
      if (story) {
        state = 'play';
        enterZone(from.zone, from.place).then(() => {
          $('side').hidden = false;
          if (result) toast(`Good run: ${result.time.toFixed(2)} s. You feel great.`, `잘 달렸어요: ${result.time.toFixed(2)}초. 기분이 상쾌해요.`, 'good', 4);
          saveGame();
        });
      } else showTitle();
    }
  });
}

// ---------------------------------------------------------------- the life of a zone (office/life.js): cars, passers-by, traffic lights, trees
let life = null, lifePaused = false, lifeBroken = false, lifeMs = 0;
function startLife() {
  endLife();
  if (!window.SO_LIFE || !Z || lifeBroken) return;
  try { life = window.SO_LIFE.create(api); } catch (e) { console.error('Sim Office life:', e); life = null; }
}
function endLife() {
  if (!life) return;
  try { life.dispose(); } catch (e) { console.error('Sim Office life:', e); }
  life = null;
  movers.length = 0;
}
function lifeTick(dt) {
  if (!life || lifePaused) return;
  const t0 = performance.now();
  try { life.update(dt); } catch (e) { console.error('Sim Office life:', e); lifeBroken = true; endLife(); }
  lifeMs += (performance.now() - t0 - lifeMs) * 0.05;
}

// ---------------------------------------------------------------- the season in the scenery (office/season.js): autumn colours, bare trees, fallen leaves, holiday lights
// Made with the life of a zone (and again when the graphics setting changes) for the game's date; debug.season(iso)
// shows another date (also on the title screen and the tour, which have none).
let season = null, seasonGfx = null, seasonForce = null;
const seasonDate = () => seasonForce || (G ? dateOf(G.day) : null);
function startSeason() {
  endSeason();
  if (!window.SO_SEASON || !Z) return;
  seasonGfx = gfxHigh();
  try { season = window.SO_SEASON.create(api); } catch (e) { console.error('Sim Office season:', e); season = null; }
}
function endSeason() {
  if (!season) return;
  try { season.dispose(); } catch (e) { console.error('Sim Office season:', e); }
  season = null;
}
function seasonTick(dt) {
  if (!season) return;
  if (seasonGfx !== gfxHigh()) { startSeason(); return; }
  try { season.update(dt); } catch (e) { console.error('Sim Office season:', e); endSeason(); }
}

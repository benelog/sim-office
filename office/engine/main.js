/* Sim Office — the frame loop and the start. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- frame loop
const timer = new T.Timer();
let elapsed = 0, debugSpeed = 1, fastMode = false;
function frame() {
  timer.update();
  const dt = Math.min(timer.getDelta(), 0.1);
  elapsed += dt;
  if (state === 'play' && !busy && G) tickClock(dt);
  pathTick();
  playerTick(dt);
  npcTick(dt, elapsed);
  lifeTick(dt);
  seasonTick(dt);
  portalTick();
  if (Z && Z.update) { try { Z.update(api, dt); } catch (e) { console.error(`zones/${zoneId}.js update:`, e); Z.update = null; } }
  if ((goalTimer -= dt) <= 0 && G) { goalTimer = 0.5; if (state === 'play' && !busy) { refreshNpcs(false); checkPhone(); friendTick(); } updateGoal(); }
  wetTick(dt);
  if ((actTimer -= dt) <= 0) { actTimer = 0.12; actions = computeActions(); renderActions(); }
  if ((hudTimer -= dt) <= 0) { hudTimer = 0.25; hud(); }
  if (panelKind === 'map' && !panel.hidden && (mapTimer -= dt) <= 0) { mapTimer = 0.5; drawMap(); }     // people move while the map is open
  envTick(dt);
  markerTick(elapsed);
  if (jog) jog.update(dt); else cameraTick(dt);
  if (window.SO_JOG && !jog) SO_JOG.sea.near(Z && zoneId === 'city' && player && state !== 'title' ? player.pos.z : -99);          // the surf, south of town
  placeBubbles();
  placeTags();
  walkSignTick();
  renderer.render(scene, camera);
  if (state === 'title') renderPreview(dt);
}

// ---------------------------------------------------------------- start: zone files, character models, title
let ready = false;
async function boot() {
  window.SO_ZONES = window.SO_ZONES || {};
  try { await loadScript('zones/index.js'); } catch (e) { /* no zone files yet */ }
  window.SO_ZONES = window.SO_ZONES || {};
  zoneFiles = Array.isArray(window.SO_ZONE_FILES) ? window.SO_ZONE_FILES.slice() : [];
  const missing = [];
  await Promise.all(zoneFiles.map(z => loadScript(`zones/${z}.js`).catch(() => missing.push(z))));
  const all = Array.from(new Set(zoneFiles.concat(Object.keys(BUILTIN_PLACES))));
  const generated = all.filter(z => !window.SO_ZONES[z]);
  if (generated.length) console.warn(`Sim Office: no zone file for ${generated.join(', ')}; using generated rooms`);
  ZONE_ORDER.push(...all);
  applyQuality();
  renderer.setAnimationLoop(frame);
  await Promise.all(CHARACTERS.map(loadPack));
  reportMissing();
  markChosen();
  const btn = $('new-game');
  btn.disabled = false;
  btn.textContent = tr('New game', '새 게임');
  showTitle();
  newGameLabel();
  ready = true;
  enterZone('city').catch(e => console.error(e));        // the backdrop behind the title
}
const ZONE_ORDER = [];
boot().catch(e => { console.error(e); $('new-game').textContent = tr('Could not start', '시작할 수 없어요'); });

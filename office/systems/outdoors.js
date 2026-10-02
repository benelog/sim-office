/* Sim Office — rain on you (an umbrella, or getting wet) and the street (horns, jaywalking, the walk signal). One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- rain on you: an umbrella, or getting wet
// Outdoors in the rain the people of the game put up umbrellas, and so do you when there is one in your bag
// (items kind gear, id umbrella). Without it you get wet (G.wet 0..1; it dries indoors) and lose energy faster
// (config rain_energy_per_hour), and people remark on it (smalltalk you:wet). The rain can be heard, muffled indoors.
const BROLLY = ['#1f3a5f', '#8a2f3a', '#2f6b4f', '#3a3a44', '#c9a227', '#5a3d7a'];
const brollyGeo = { top: new T.ConeGeometry(0.4, 0.15, 8, 1, true), pole: new T.CylinderGeometry(0.008, 0.008, 0.62, 5), tip: new T.CylinderGeometry(0.006, 0.006, 0.07, 4) };
const brollyMats = {};
function shelter(a, on) {
  if (!a || !a.holder) return;
  on = !!on && !a.sit;
  if (!on) { if (a.brolly && a.brolly.visible) { a.brolly.visible = false; if (a.mark) a.mark.position.y = MARK_Y; } return; }
  if (!a.brolly) {
    const c = BROLLY[hash(a.id + a.model) % BROLLY.length];
    const mat = brollyMats[c] || (brollyMats[c] = litMaterial({ color: new T.Color(c), side: T.DoubleSide }));
    const g = new T.Group(), top = new T.Mesh(brollyGeo.top, mat), pole = new T.Mesh(brollyGeo.pole, toon('#2a2d35')), tip = new T.Mesh(brollyGeo.tip, toon('#2a2d35'));
    top.position.set(0.05, 1.235, -0.04); pole.position.y = 0.93; tip.position.set(0.05, 1.33, -0.04);          // the canopy leans over the head
    top.castShadow = true;
    g.add(top, pole, tip);
    g.position.set(-0.13, 0, 0.1);
    a.holder.add(g);
    a.brolly = g;
  }
  a.brolly.visible = true;
  if (a.mark) a.mark.position.y = MARK_Y + 0.34;
}
const soaked = () => !!G && (G.wet || 0) > 0.3;
const raining = () => !!Z && !Z.indoor && weatherNow().rain > 0.12;
const rainSound = (function () {
  let src = null, gain = null, filter = null, level = 0, muffled = null;
  function start() {
    const c = sound.context();
    if (!c) return false;
    try {
      const len = c.sampleRate * 2, buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      src = c.createBufferSource(); src.buffer = buf; src.loop = true;
      const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 700;
      filter = c.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 6500;
      gain = c.createGain(); gain.gain.value = 0;
      src.connect(hp); hp.connect(filter); filter.connect(gain); gain.connect(c.destination);
      src.start();
      return true;
    } catch (e) { src = null; return false; }
  }
  return {
    set(v, indoors) {
      v = clamp(v, 0, 1) * (indoors ? 0.3 : 1);
      if (v > 0.02 && !src && !start()) return;
      if (!src || (Math.abs(v - level) < 0.02 && indoors === muffled)) return;
      level = v; muffled = indoors;
      const c = sound.context();
      try { gain.gain.setTargetAtTime(v * 0.16, c.currentTime, 0.8); filter.frequency.setTargetAtTime(indoors ? 1100 : 6500, c.currentTime, 0.5); } catch (e) { /* closed */ }
    },
    get level() { return level; }
  };
})();
function wetTick(dt) {
  const inGame = !!G && !!player && !!Z && state !== 'title' && !jog;
  const rains = inGame && raining();
  if (player) shelter(player, rains && !!(G && G.inventory.umbrella));
  Object.values(npcActors).forEach(a => shelter(a, rains && !a.leaving));
  if (!inGame || state !== 'play' || busy) return;
  const mins = dt * (+CFG.minutes_per_second || 1) * debugSpeed, hard = weatherNow().rain;
  if (rains && !G.inventory.umbrella) {
    G.wet = clamp((G.wet || 0) + hard * mins / 40, 0, 1);
    G.energy = clamp(G.energy + (+CFG.rain_energy_per_hour || 0) * hard * mins / 60, 0, E_MAX);
    if (soaked() && G.wetDay !== G.day) {
      G.wetDay = G.day;
      toast("You're getting soaked. An umbrella would help: Fairview Market sells them.", '비에 흠뻑 젖고 있어요. 우산이 있으면 좋겠네요. 페어뷰 마켓에서 팝니다.', 'bad', 5.5);
    }
  } else if (G.wet) G.wet = Math.max(0, G.wet - mins / (Z.indoor ? 50 : 120));
}

// ---------------------------------------------------------------- on the street: horns, jaywalking, the walk signal
// office/life.js tells (api.street) when a car honks at you, when you walk on the road away from a crosswalk
// (jaywalking: against the law in many American cities, and a ticket if the police see it) and when you step onto a
// crosswalk against a steady DON'T WALK. Each is explained once a game day; G.street counts them.
const STREET = {
  honk: ['A driver honks at you. Get out of the road and keep to the sidewalk.', '운전자가 경적을 울려요(honk). 차도에서 나와 인도로 다니세요.'],
  jaywalk: ["That's jaywalking: crossing in the middle of the block. In many US cities it can get you a ticket. Cross at the crosswalk.", '무단횡단(jaywalking)이에요. 미국의 많은 도시에서는 벌금 딱지를 받을 수 있어요. 횡단보도로 건너세요.'],
  dontwalk: ["The signal said DON'T WALK. Wait for the white walking person (WALK) before you cross.", "신호가 DON'T WALK(건너지 마시오)였어요. 흰색 걷는 사람 표시(WALK)가 켜지면 건너세요."]
};
function street(kind, at) {
  if (!G || state !== 'play' || !STREET[kind]) return;
  G.street = G.street || {};
  G.street[kind] = (G.street[kind] || 0) + 1;
  if (kind === 'honk') { const d = player && at ? Math.hypot(at.x - player.pos.x, at.z - player.pos.z) : 3; sound.honk(clamp(1.6 - d / 8, 0.4, 1.2)); }
  if (G.streetDay && G.streetDay[kind] === G.day) return;
  (G.streetDay = G.streetDay || {})[kind] = G.day;
  toast((kind === 'honk' ? '📯 Beep beep! ' : '🚸 ') + STREET[kind][0], (kind === 'honk' ? '📯 빵빵! ' : '🚸 ') + STREET[kind][1], 'bad', 5.5);
}
// the pedestrian signal across the crosswalk near you: a white walking person, or an orange hand (flashing, with
// the seconds left, when it is too late to start crossing)
const walkEl = document.createElement('div');
walkEl.className = 'walk-sign';
walkEl.hidden = true;
$('tags').appendChild(walkEl);
const walkV = new T.Vector3();
function walkSignTick() {
  const w = life && life.walkSign && state === 'play' && !jog ? life.walkSign() : null;
  const p = w ? project(walkV.set(w.x, 1.25, w.z)) : null;
  if (!p || !p.ok) { walkEl.hidden = true; return; }
  walkEl.hidden = false;
  walkEl.style.left = p.x + 'px';
  walkEl.style.top = p.y + 'px';
  const sig = w.state + w.secs;
  if (walkEl.dataset.sig === sig) return;
  walkEl.dataset.sig = sig;
  walkEl.className = 'walk-sign ' + w.state;
  walkEl.innerHTML = w.state === 'walk' ? '<b>🚶</b> WALK' : `<b>✋</b> DON'T WALK${w.secs ? ` <i>${w.secs}</i>` : ''}`;
}
// SO.debug: the street and the rain: how wet you are, who has an umbrella open
debugPart({
  get street() { return G ? Object.assign({}, G.street) : {}; }, get walkSign() { return life && life.walkSign ? life.walkSign() : null; },
  get wet() { return G ? +(G.wet || 0).toFixed(2) : 0; }, set wet(v) { if (G) G.wet = +v; }, get raining() { return raining(); }, get rainSound() { return rainSound.level; },
  get umbrellas() { return Object.values(npcActors).concat(player ? [player] : []).filter(a => a.brolly && a.brolly.visible).map(a => a.id); }
});

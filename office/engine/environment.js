/* Sim Office — sun, sky, weather, street lamps, rain. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- environment: sun, sky and street lamps by the clock outdoors; window and ceiling light indoors
// Outdoors the clock drives everything: the sun rises in the east (+x), stands in the south (+z) at noon and sets in
// the west, at the day's own sunrise and sunset (sunOf, solarHour below); from dusk the moon (blue, from the south-west) takes over and the street lamps
// (roads light-square / light-curved props) glow, lighting the ground with a few point lights that follow you.
// Indoors the light does not change with the clock: a window light (from the side with the most windows) with
// the one shadow map, ceiling lights (the zone's lights, or a grid), a warm fill; only the backdrop darkens at night.
// The weather (weather table, one row a game day): clouds over the sky, a dimmer sun with softer shadows, rain
// (on and off through a rainy day) and morning fog. Temperatures in Fahrenheit, highest at about 3 PM.
const WX_NAME = { clear: 'Sunny', partly: 'Partly cloudy', cloudy: 'Cloudy', rain: 'Rain', fog: 'Fog' };
const WX_NAME_KO = { clear: '맑음', partly: '구름 조금', cloudy: '흐림', rain: '비', fog: '안개' };
const WX_ICON = { clear: '☀️', partly: '⛅', cloudy: '☁️', rain: '🌧️', fog: '🌫️' };
const toC = (f) => Math.round((f - 32) * 5 / 9);
// After the last row of the weather table the weather is made from the season at Fairview: the normal high and low
// for the date, rain more often in winter (and more often the day after rain), fog in summer. A day always gets the
// same weather. Without a start date the table repeats.
const WX_ROWS = {};
WEATHER.forEach(w => { WX_ROWS[w.day] = w; });
const WX_LAST = WEATHER.length ? WEATHER[WEATHER.length - 1].day : 0;
const WX_NORMAL = [[58, 42], [61, 44], [64, 46], [67, 48], [71, 51], [75, 54], [77, 56], [78, 57], [78, 56], [72, 53], [64, 47], [58, 42]];   // the middle of each month: high, low °F
const WX_RAIN = [0.35, 0.33, 0.28, 0.15, 0.06, 0.02, 0.01, 0.01, 0.03, 0.1, 0.25, 0.33];
const WX_FOG = [0.1, 0.08, 0.06, 0.08, 0.15, 0.25, 0.3, 0.3, 0.2, 0.12, 0.1, 0.12];
const WX_SAY = {
  clear: [['Sunny and dry.', '맑고 건조합니다.'], ['Clear skies all day.', '하루 종일 맑은 하늘이에요.'], ['Plenty of sunshine.', '햇볕이 가득합니다.']],
  partly: [['A mix of sun and clouds.', '해와 구름이 번갈아 나옵니다.'], ['Partly cloudy and calm.', '구름이 조금 끼고 바람이 잔잔합니다.'], ['Clouds in the morning, sun in the afternoon.', '아침엔 구름, 오후엔 해가 납니다.']],
  cloudy: [['Gray skies, but dry.', '하늘은 흐리지만 비는 오지 않아요.'], ['Overcast all day.', '하루 종일 흐립니다.'], ['Cloudy and cool.', '흐리고 선선합니다.']],
  rain: [['Rain on and off. Bring an umbrella.', '비가 오락가락합니다. 우산을 챙기세요.'], ['A wet day with steady rain.', '비가 꾸준히 내리는 날이에요.'], ['Showers through the afternoon.', '오후까지 소나기가 옵니다.']],
  fog: [['Morning fog, then some sun.', '아침 안개 뒤에 해가 조금 납니다.'], ['Thick fog early, clearing by noon.', '이른 아침 짙은 안개, 정오쯤 걷힙니다.']]
};
const WX_ADJ = { rain: [-6, 2], cloudy: [-3, 1], fog: [-3, -1], partly: [0, 0], clear: [2, -1] };
const wxHash = (d, k) => { const x = Math.sin(d * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); };
function wxNormal(d) {
  const t = dateOf(d), m = t.getUTCMonth(), f = (t.getUTCDate() - 15) / 30, n = (m + (f < 0 ? 11 : 1)) % 12, a = WX_NORMAL[m], b = WX_NORMAL[n], w = Math.abs(f);
  return [a[0] + (b[0] - a[0]) * w, a[1] + (b[1] - a[1]) * w];
}
function wxDay(d, prev) {
  const m = dateOf(d).getUTCMonth(), [hi, lo] = wxNormal(d);
  const pRain = Math.min(0.7, WX_RAIN[m] * (prev && prev.kind === 'rain' ? 2 : 0.8)), s = wxHash(d, 2);
  const kind = wxHash(d, 1) < pRain ? 'rain' : s < WX_FOG[m] ? 'fog' : s < WX_FOG[m] + 0.2 + WX_RAIN[m] ? 'cloudy' : s < 0.56 + WX_RAIN[m] ? 'partly' : 'clear';
  const noise = (wxHash(d, 3) - 0.5) * 8, high = Math.round(hi + noise + WX_ADJ[kind][0]), low = Math.min(high - 6, Math.round(lo + noise * 0.5 + WX_ADJ[kind][1]));
  const say = WX_SAY[kind][Math.floor(wxHash(d, 4) * WX_SAY[kind].length)];
  const extra = high < 60 ? [' Chilly, so grab a jacket.', ' 쌀쌀하니 재킷을 챙기세요.'] : high >= 82 ? [' Hot in the afternoon.', ' 오후에는 덥습니다.'] : ['', ''];
  return { day: d, kind, high_f: high, low_f: low, forecast: say[0] + extra[0], forecast_ko: say[1] + extra[1] };
}
const wxMade = {};
let wxUpTo = WX_LAST;
function weatherOf(day) {
  day = Math.max(1, day);
  if (WX_ROWS[day]) return WX_ROWS[day];
  if (START != null && WX_LAST && day > WX_LAST) {
    for (; wxUpTo < day; wxUpTo++) wxMade[wxUpTo + 1] = wxDay(wxUpTo + 1, wxMade[wxUpTo] || WX_ROWS[wxUpTo]);
    return wxMade[day];
  }
  return WEATHER.length ? WEATHER[(day - 1) % WEATHER.length] : { day, kind: 'clear', high_f: 72, low_f: 55, forecast: '' };
}
function weatherNow() {
  const day = G ? G.day : 1, h = hourNow(), w = weatherOf(day), k = !G && state === 'tour' && tour.wx ? tour.wx : w.kind;
  const rain = k === 'rain' ? clamp((0.5 + 0.62 * Math.sin(h * 1.3 + day * 2.1)) * 1.6, 0, 1) : 0;
  const fogged = k === 'fog' ? clamp((11 - h) / 2, 0, 1) : 0;
  const cover = k === 'rain' ? 1 : k === 'cloudy' ? 0.92 : k === 'partly' ? 0.45 : k === 'fog' ? Math.max(0.3, fogged * 0.8) : 0.1;
  const temp = Math.round(w.low_f + (w.high_f - w.low_f) * Math.max(0, Math.sin(Math.PI * (h - 5) / 20)));
  return { kind: k, rain, fog: fogged, cover, dark: k === 'rain' ? 0.6 + 0.4 * rain : k === 'cloudy' ? 0.35 : 0, temp, high: w.high_f, low: w.low_f, row: w };
}
// Sunrise and sunset go by the real date at Fairview (config latitude, longitude, utc_offset; the NOAA formulas):
// later sunrises and earlier sunsets as autumn goes on. The clock stays on one offset (no daylight saving change).
// The light of the day (KEYS below, made for a sunrise at 6:30 and a sunset at 7 PM) is stretched to the day's own
// sunrise and sunset (solarHour).
const LAT = +CFG.latitude || 37.6, LON = CFG.longitude == null ? -122.4 : +CFG.longitude, UTC_OFF = CFG.utc_offset == null ? -7 : +CFG.utc_offset, SUN_TPL = [6.5, 19];
const sunMemo = {};
function sunOf(day) {             // { rise, set } in minutes of the local day, or null without a start date
  if (sunMemo[day] !== undefined) return sunMemo[day];
  const t = dateOf(day);
  if (!t) return (sunMemo[day] = null);
  const doy = Math.round((t - Date.UTC(t.getUTCFullYear(), 0, 1)) / 864e5), g = 2 * Math.PI / 365 * doy, rad = Math.PI / 180;
  const eq = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const dec = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const ha = Math.acos(clamp(Math.cos(90.833 * rad) / (Math.cos(LAT * rad) * Math.cos(dec)) - Math.tan(LAT * rad) * Math.tan(dec), -1, 1)) / rad;
  const off = UTC_OFF * 60;
  return (sunMemo[day] = { rise: Math.round(720 - 4 * (LON + ha) - eq + off), set: Math.round(720 - 4 * (LON - ha) - eq + off) });
}
const sunDay = () => G ? G.day : 1;
function solarHour(h, day) {       // the hour of the day's light: the clock stretched so the sun rises at 6:30 and sets at 7 PM
  const s = sunOf(day);
  h = ((h % 24) + 24) % 24;
  if (!s) return h;
  const r = s.rise / 60, t = s.set / 60, [R, S] = SUN_TPL;
  return h < r ? h * R / r : h < t ? R + (h - r) * (S - R) / (t - r) : S + (h - t) * (24 - S) / (24 - t);
}
const darkAt = (min, day) => { const h = solarHour(min / 60, day == null ? sunDay() : day); return h >= 19.4 || h < 6.1; };
const sunText = (d) => { const s = sunOf(d); return s ? `Sunrise ${clock(s.rise)}, sunset ${clock(s.set)}` : ''; };
const zoneBox = new T.Box3(), lamps = [], zoneLights = [];
let lampPool = [], windowDir = new T.Vector3(0.45, 0.78, 0.45).normalize();
const KEYS = [          // hour, sun colour, sun, fill sky, fill ground, fill, sky top, sky horizon, lamps, exposure
  [0, '#a4b2dc', 0.6, '#5c6788', '#22242e', 0.75, '#060b1c', '#1c2848', 1, 1.15],
  [5.0, '#a4b2dc', 0.6, '#5c6788', '#22242e', 0.75, '#060b1c', '#1c2848', 1, 1.15],
  [6.0, '#ff9868', 0.8, '#8c86b0', '#4a3e3a', 0.8, '#34416e', '#e89a7c', 0.6, 1.05],
  [7.0, '#ffb070', 1.8, '#c3cdea', '#6e5c4a', 0.9, '#6d9dd6', '#ffd0a4', 0, 0.9],
  [9.0, '#ffeedd', 2.1, '#dde8ff', '#6d6458', 0.8, '#5c9fe2', '#cde4f6', 0, 0.85],
  [12.0, '#fffaf2', 2.3, '#e4eeff', '#6d6458', 0.8, '#4e97e4', '#d0e8fa', 0, 0.85],
  [16.0, '#fff0da', 2.1, '#e0eaff', '#6d6458', 0.8, '#5899dc', '#d6e5f2', 0, 0.85],
  [17.5, '#ffbe7c', 1.9, '#d6d2e6', '#6c5848', 0.8, '#6a90ca', '#f5c898', 0, 0.9],
  [18.5, '#ff8a4c', 1.6, '#c4b8b4', '#5e4a3a', 0.8, '#4a5c98', '#f5a070', 0.25, 0.95],
  [19.5, '#ff6a40', 0.7, '#8a86a4', '#3a3238', 0.75, '#253062', '#c47a6c', 0.8, 1.05],
  [20.5, '#a4b2dc', 0.6, '#5c6788', '#22242e', 0.75, '#0a1128', '#223052', 1, 1.15],
  [24, '#a4b2dc', 0.6, '#5c6788', '#22242e', 0.75, '#060b1c', '#1c2848', 1, 1.15]
].map(k => k.map(v => typeof v === 'string' ? new T.Color(v) : v));
const env = { sun: new T.Color(), sky: new T.Color(), ground: new T.Color(), top: new T.Color(), horizon: new T.Color(), sunI: 1, fillI: 1, lamp: 0, exposure: 1, night: 0, dir: new T.Vector3() };
const MOON = new T.Vector3(-0.45, 0.78, 0.5).normalize(), sunV = new T.Vector3();
function envAt(h) {
  h = ((h % 24) + 24) % 24;
  let k = 0;
  while (k < KEYS.length - 2 && KEYS[k + 1][0] <= h) k++;
  const A = KEYS[k], B = KEYS[k + 1], t = clamp((h - A[0]) / (B[0] - A[0]), 0, 1);
  env.sun.copy(A[1]).lerp(B[1], t); env.sunI = A[2] + (B[2] - A[2]) * t;
  env.sky.copy(A[3]).lerp(B[3], t); env.ground.copy(A[4]).lerp(B[4], t); env.fillI = A[5] + (B[5] - A[5]) * t;
  env.top.copy(A[6]).lerp(B[6], t); env.horizon.copy(A[7]).lerp(B[7], t);
  env.lamp = A[8] + (B[8] - A[8]) * t; env.exposure = A[9] + (B[9] - A[9]) * t;
  env.night = h < 5 ? 1 : h < 6.2 ? (6.2 - h) / 1.2 : h < 19.3 ? 0 : h < 20.3 ? h - 19.3 : 1;
  const az = Math.PI * (h - 6) / 12.5, el = Math.max(0.2, Math.sin(az));
  sunV.set(Math.cos(az) * Math.cos(el), Math.sin(el), Math.sin(az) * Math.cos(el));
  env.dir.copy(sunV).lerp(MOON, env.night).normalize();
  return env;
}
// the sky: a dome around the camera, horizon colour = fog colour, the sun (or the moon) as a soft disc, stars at night
const sky = (function () {
  const mat = new T.ShaderMaterial({
    uniforms: { top: { value: new T.Color() }, horizon: { value: new T.Color() }, sunDir: { value: new T.Vector3(0, 1, 0) }, sunColor: { value: new T.Color() }, glow: { value: 0 }, stars: { value: 0 },
      cover: { value: 0 }, cloud: { value: new T.Color('#ffffff') }, drift: { value: 0 } },
    vertexShader: 'varying vec3 vDir; void main() { vDir = position; vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position = p.xyww; }',
    fragmentShader: `uniform vec3 top, horizon, sunDir, sunColor, cloud; uniform float glow, stars, cover, drift; varying vec3 vDir;
      float h2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float vnoise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(h2(i), h2(i + vec2(1.0, 0.0)), f.x), mix(h2(i + vec2(0.0, 1.0)), h2(i + vec2(1.0, 1.0)), f.x), f.y); }
      float fbm(vec2 p) { float a = 0.5, s = 0.0; for (int i = 0; i < 4; i++) { s += a * vnoise(p); p = p * 2.03 + 7.1; a *= 0.5; } return s; }
      void main() {
        vec3 d = normalize(vDir);
        float h = max(d.y, 0.0);
        vec3 c = mix(horizon, top, pow(smoothstep(0.0, 0.75, h), 0.7));
        float s = max(dot(d, sunDir), 0.0);
        c += sunColor * (pow(s, 12.0) * 0.45 * glow + pow(s, 3.0) * 0.18 * glow + smoothstep(0.9990, 0.9994, s));
        vec3 q = floor(d * 240.0);
        float r = fract(sin(dot(q, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
        c += stars * step(0.9975, r) * smoothstep(0.06, 0.35, d.y) * vec3(0.85, 0.88, 1.0);
        if (cover > 0.01 && d.y > 0.0) {          // clouds: a layer of noise high above, thinning toward the horizon's haze
          vec2 uv = d.xz / (d.y + 0.14) * 0.85 + vec2(drift, drift * 0.35);
          float n = fbm(uv), th = mix(0.74, 0.16, cover);
          float m = smoothstep(th, th + 0.2, n) * smoothstep(0.0, 0.1, d.y);
          c = mix(c, cloud * (0.82 + 0.3 * fbm(uv * 2.7 + 3.0)), m * mix(0.85, 0.97, cover));
        }
        gl_FragColor = vec4(c, 1.0);
        #include <colorspace_fragment>
      }`,
    side: T.BackSide, depthWrite: false, depthTest: false, fog: false, toneMapped: false
  });
  const m = new T.Mesh(new T.SphereGeometry(300, 24, 12), mat);
  m.frustumCulled = false;
  m.renderOrder = -1000;
  scene.add(m);
  return m;
})();
const fog = new T.Fog(0xffffff, 10, 100);
const glowTex = radialTexture([[0, 'rgba(255,240,205,1)'], [0.22, 'rgba(255,214,150,0.6)'], [0.55, 'rgba(255,190,110,0.16)'], [1, 'rgba(255,180,100,0)']]);
const glowMat = new T.SpriteMaterial({ map: glowTex, blending: T.AdditiveBlending, depthWrite: false, transparent: true, toneMapped: false, opacity: 0 });
function addLamp(p, holder) {        // a street lamp: where its light hangs, and a glow sprite there
  const bb = (((window.SO_ZONE_KIT || {}).BOX || {}).roads || {})[p.node];
  const s = (PACK_SCALE.roads || 3) * (p.scale || 1), heads = [];
  if (bb) {
    const x = (bb[0] + bb[1]) / 2 * s, y = bb[5] * s - 0.08;
    heads.push(new T.Vector3(x, y, bb[2] * s + 0.1));
    if (/double/.test(p.node)) heads.push(new T.Vector3(x, y, bb[3] * s - 0.1));
  } else heads.push(new T.Vector3(0, 1.7, 0));
  heads.forEach(h => {
    holder.localToWorld(h);
    const g = new T.Sprite(glowMat);
    g.position.copy(h);
    g.scale.setScalar(0.9);
    g.renderOrder = 2;
    g.visible = false;
    zoneGroup.add(g);
    lamps.push({ at: h, glow: g });
  });
}
function autoLights(spec) {          // ceiling lights on a grid when the zone gives none
  const [w, d] = spec.size;
  let nx = Math.max(1, Math.round(w / 5)), nz = Math.max(1, Math.round(d / 5));
  while (nx * nz > 6) { if (nx >= nz) nx--; else nz--; }
  const out = [];
  for (let i = 0; i < nx; i++) for (let k = 0; k < nz; k++) out.push({ at: [-w / 2 + (i + 0.5) * w / nx, -d / 2 + (k + 0.5) * d / nz], height: 1.25, color: '#fff0dc', intensity: 1.0 });
  return out;
}
function setupLights() {
  zoneLights.forEach(l => { if (l.parent) l.parent.remove(l); });
  zoneLights.length = 0;
  lampPool = [];
  if (!Z || !zoneGroup) return;
  const high = gfxHigh();
  if (Z.indoor) {
    let list = (Z.lights && Z.lights.length ? Z.lights : autoLights(Z)).slice(0, 8);
    if (!high && list.length > 2) list = list.slice().sort((a, b) => Math.hypot(a.at[0], a.at[1]) - Math.hypot(b.at[0], b.at[1])).slice(0, 2);
    list.forEach(l => {
      const pl = new T.PointLight(l.color || '#fff0dc', (l.intensity == null ? 1.2 : l.intensity) * 1.2, l.range || 9, 1.3);
      pl.position.set(l.at[0], l.height == null ? 1.25 : l.height, l.at[1]);
      zoneGroup.add(pl);
      zoneLights.push(pl);
    });
    // the window light comes from the side of the room with the most windows (a steep angle, so the walls shade only their foot)
    const v = new T.Vector2();
    (Z.props || []).forEach(p => { if (p && /^wallWindow/.test(p.node || '')) v.add(new T.Vector2(p.at[0] / (Z.size[0] || 1), p.at[1] / (Z.size[1] || 1))); });
    const n = v.length();
    if (n > 0.6) v.divideScalar(n); else v.set(0.55, 0.8).normalize();
    windowDir.set(v.x * 0.62, 0.78, v.y * 0.62).normalize();
  } else if (lamps.length) {
    const n = Math.min(high ? 6 : 2, lamps.length);
    for (let i = 0; i < n; i++) {
      const pl = new T.PointLight('#ffc98a', 0, 7.5, 1.4);
      pl.position.copy(lamps[i].at);
      zoneGroup.add(pl);
      zoneLights.push(pl);
      lampPool.push(pl);
    }
  }
}
// fit the one shadow map to the zone: the props' box (with the floor, capped near the zone's size) seen from the light
const shadowView = new T.Matrix4(), boxC = new T.Vector3(), corner = new T.Vector3(), fitBox = new T.Box3();
function fitShadow(dir) {
  if (!Z) return;
  const [w, d] = Z.size, m = Z.indoor ? 0.6 : 6;
  fitBox.copy(zoneBox);
  fitBox.expandByPoint(corner.set(-w / 2, 0, -d / 2)).expandByPoint(corner.set(w / 2, 0, d / 2));
  fitBox.intersect(new T.Box3(new T.Vector3(-w / 2 - m, -1, -d / 2 - m), new T.Vector3(w / 2 + m, 60, d / 2 + m)));
  fitBox.getCenter(boxC);
  const r = fitBox.getSize(corner).length() + 4;
  sun.target.position.copy(boxC);
  sun.position.copy(boxC).addScaledVector(dir, r);
  sun.target.updateMatrixWorld();
  sun.updateMatrixWorld();
  const cam = sun.shadow.camera;
  cam.position.copy(sun.position);
  cam.lookAt(boxC);
  cam.updateMatrixWorld();
  shadowView.copy(cam.matrixWorld).invert();
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity, z0 = Infinity, z1 = -Infinity;
  for (let i = 0; i < 8; i++) {
    corner.set(i & 1 ? fitBox.max.x : fitBox.min.x, i & 2 ? fitBox.max.y : fitBox.min.y, i & 4 ? fitBox.max.z : fitBox.min.z).applyMatrix4(shadowView);
    x0 = Math.min(x0, corner.x); x1 = Math.max(x1, corner.x); y0 = Math.min(y0, corner.y); y1 = Math.max(y1, corner.y); z0 = Math.min(z0, corner.z); z1 = Math.max(z1, corner.z);
  }
  cam.left = x0 - 0.5; cam.right = x1 + 0.5; cam.bottom = y0 - 0.5; cam.top = y1 + 0.5;
  cam.near = Math.max(0.1, -z1 - 2); cam.far = -z0 + 2;
  cam.updateProjectionMatrix();
}
let envTimer = 0, lampTimer = 0;
const hourNow = () => (G ? G.minute : state === 'tour' ? tour.minute : 600) / 60;
function applyEnvironment() {
  if (!Z) return;
  const e = envAt(solarHour(hourNow(), sunDay())), wx = weatherNow(), day = 1 - e.night;
  rainShow(!Z.indoor && state !== 'title' ? wx.rain : 0);
  if (Z.indoor) {
    sky.visible = false;
    const bg = new T.Color(Z.background || '#cdd3dc').lerp(new T.Color('#8f98a6'), wx.cover * 0.5 + wx.dark * 0.3).lerp(new T.Color('#1a2238'), e.night * 0.85);
    scene.background = bg;
    fog.color.copy(bg);
    fog.near = Math.max(Z.size[0], Z.size[1]) * 0.9 + 6;
    fog.far = Math.max(Z.size[0], Z.size[1]) * 1.6 + 30;
    scene.fog = fog;
    // the light from the windows goes with the day outside: warm and low at dusk, a little moonlight at night, flat under clouds
    sun.color.set('#fff1de').lerp(e.sun, 0.35 * day).lerp(new T.Color('#dfe4ec'), wx.cover * 0.5 * day);
    sun.intensity = 1.2 * (0.25 + 0.75 * day) * (1 - 0.45 * wx.cover * day);
    sun.shadow.intensity = 0.8 * (1 - 0.5 * wx.cover);
    fitShadow(windowDir);
    hemi.intensity = 0.85 * (Z.ambient == null ? 0.9 : Z.ambient);
    hemi.color.set('#fff5e8');
    hemi.groundColor.set('#8a7c6a');
    renderer.toneMappingExposure = 0.85;
    return;
  }
  // under clouds the sky loses its blue and the horizon its glow; rain clouds are darker; fog whitens everything near
  const thick = clamp((wx.cover - 0.5) * 2, 0, 1), lum = (c) => 0.3 * c.r + 0.55 * c.g + 0.15 * c.b;
  const grey = (c, k) => { const l = lum(c) * k; return wxTmp.setRGB(l * 0.95, l, l * 1.07); };
  e.top.lerp(grey(e.top, 1.5 - 0.5 * wx.dark), thick * 0.9).lerp(grey(e.horizon, 1), thick * 0.35);
  e.horizon.lerp(grey(e.horizon, 1 - 0.3 * wx.dark), thick * 0.9);
  if (wx.fog) { e.horizon.lerp(wxTmp.set('#dfe3e8').multiplyScalar(0.25 + 0.75 * day), wx.fog * 0.85); e.top.lerp(e.horizon, wx.fog * 0.8); }
  const U = sky.material.uniforms;
  sky.visible = true;
  U.top.value.copy(e.top);
  U.horizon.value.copy(e.horizon);
  U.sunDir.value.copy(e.dir);
  U.sunColor.value.copy(e.sun).multiplyScalar((e.night > 0.5 ? 0.9 : 1.2) * (1 - thick) * (1 - wx.fog * 0.7));
  U.glow.value = e.night > 0.5 ? 0.35 : 1 + (1 - clamp(e.dir.y / 0.6, 0, 1)) * 1.5;
  U.stars.value = clamp((e.night - 0.5) * 2, 0, 1) * (1 - wx.cover);
  U.cover.value = wx.cover;
  U.cloud.value.set('#ffffff').lerp(e.sun, 0.25 * day).multiplyScalar((0.16 + 0.84 * day) * (1 - 0.45 * wx.dark)).lerp(e.horizon, 0.25);
  U.drift.value = elapsed * 0.004 + (G ? G.day * 3.7 + G.minute * 0.002 : 0);
  scene.background = e.horizon;
  const far = Math.max(Z.size[0], Z.size[1]) * 1.2 + 40, haze = Math.max(wx.fog, wx.rain * 0.45);
  fog.color.copy(e.horizon);
  fog.near = far * 0.55 * (1 - haze) + 1.5 * haze;
  fog.far = far * 1.4 * (1 - haze) + (wx.fog > wx.rain * 0.45 ? 26 : 60) * haze;
  scene.fog = fog;
  const dim = 1 - 0.78 * thick * day - 0.5 * wx.fog * day;
  sun.color.copy(e.sun).lerp(wxTmp.set('#e8ecf2'), thick * 0.7 * day);
  sun.intensity = e.sunI * dim;
  sun.shadow.intensity = 0.8 * (1 - 0.7 * Math.max(thick, wx.fog));
  fitShadow(e.dir);
  hemi.intensity = e.fillI * (Z.ambient == null ? 1 : Z.ambient) * (1 + (0.55 * thick + 0.3 * wx.fog) * day) * (1 - 0.22 * wx.dark);
  hemi.color.copy(e.sky).lerp(grey(e.sky, 1.05), thick * 0.8);
  hemi.groundColor.copy(e.ground);
  renderer.toneMappingExposure = e.exposure;
  // street lamps: glows on every lamp, the point lights on the ones nearest to you
  const on = Math.max(e.lamp, wx.dark > 0.8 ? 0.5 : 0, wx.fog > 0.6 ? 0.5 : 0);
  glowMat.opacity = on;
  lamps.forEach(l => { l.glow.visible = on > 0.02; });
  if (lampPool.length) {
    const c = player && state !== 'title' ? player.pos : cam.look;
    if ((lampTimer -= 1) <= 0) {
      lampTimer = 4;
      lamps.slice().sort((a, b) => a.at.distanceToSquared(c) - b.at.distanceToSquared(c)).slice(0, lampPool.length).forEach((l, i) => lampPool[i].position.copy(l.at));
    }
    lampPool.forEach(pl => { pl.intensity = on * 5; pl.visible = on > 0.02; });     // hidden by day: no cost (one shader rebuild at dusk)
  }
}
function envTick(dt) {
  if ((envTimer -= dt) <= 0) {
    envTimer = 0.25;
    applyEnvironment();
    rainSound.set(Z && (G ? state !== 'title' : state === 'tour') && !jog ? weatherNow().rain : 0, !!Z && !!Z.indoor);
  }
  if (Z && !Z.indoor) sky.position.copy(camera.position);
  rainTick(dt);
}
// Rain: short slanted streaks in a box that goes with the camera; how many are drawn follows how hard it rains
const wxTmp = new T.Color();
const rain = (function () {
  const N = 1600, BOX = [18, 9, 18], pos = new Float32Array(N * 6), drops = [];
  for (let i = 0; i < N; i++) drops.push({ x: (Math.random() - 0.5) * BOX[0], y: Math.random() * BOX[1], z: (Math.random() - 0.5) * BOX[2], v: 7.5 + Math.random() * 3.5 });
  const g = new T.BufferGeometry();
  g.setAttribute('position', new T.BufferAttribute(pos, 3).setUsage(T.DynamicDrawUsage));
  g.setDrawRange(0, 0);
  const m = new T.LineSegments(g, new T.LineBasicMaterial({ color: 0xdfe8f4, transparent: true, opacity: 0.42, depthWrite: false, fog: false, toneMapped: false }));
  m.frustumCulled = false;
  m.visible = false;
  m.renderOrder = 3;
  scene.add(m);
  return { N, BOX, pos, drops, mesh: m, amount: 0 };
})();
function rainShow(amount) {
  rain.amount = amount;
  rain.mesh.visible = amount > 0.03;
  rain.mesh.material.opacity = 0.2 + 0.25 * amount;
}
function rainTick(dt) {
  if (!rain.mesh.visible) return;
  const n = Math.round(rain.N * (gfxHigh() ? 1 : 0.45) * clamp(rain.amount, 0.15, 1)), B = rain.BOX, p = rain.pos, wind = 1.1, len = 0.034;
  for (let i = 0; i < n; i++) {
    const d = rain.drops[i];
    d.y -= d.v * dt; d.x += wind * dt;
    if (d.y < 0) { d.y += B[1]; d.x = (Math.random() - 0.5) * B[0]; d.z = (Math.random() - 0.5) * B[2]; }
    p[i * 6] = d.x; p[i * 6 + 1] = d.y; p[i * 6 + 2] = d.z;
    p[i * 6 + 3] = d.x + wind * len; p[i * 6 + 4] = d.y + d.v * len; p[i * 6 + 5] = d.z;
  }
  rain.mesh.geometry.setDrawRange(0, n * 2);
  rain.mesh.geometry.attributes.position.needsUpdate = true;
  rain.mesh.position.set(camera.position.x, 0, camera.position.z);
}

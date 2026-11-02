/* Sim Office — the lawn: a grass material for the town's ground and the land round the homes. One of the engine's plain
   scripts (office/engine, office/systems) that share one scope; office/index.html loads them in order. See office/PLAN.md.
   A canvas of blades (a dark ground between them, three layers of blades lighter toward the top, a few dry ones, clover)
   that tiles; the shader lays it in world space (no UVs needed), twice at different turns blended by a noise so the
   tiles do not show, and adds patches a few metres across (lusher, drier) that also keep it from going flat far off.
   The blades' mean colour is scaled back to the zone's colour, so the town keeps its palette. */
'use strict';
// ---------------------------------------------------------------- the blades
const GRASS_TILE = 1.6;           // metres one canvas covers
const grassTex = {};
function grassCanvas(color) {
  const S = 512, c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d');
  let seed = 7;
  const r = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const hsl = {};
  new T.Color(color).getHSL(hsl, T.SRGBColorSpace);
  const H = hsl.h * 360, Sa = hsl.s * 100, L = hsl.l * 100;
  const col = (dh, ds, dl, a) => `hsla(${H + dh},${clamp(Sa + ds, 0, 100)}%,${clamp(L * dl, 0, 100)}%,${a == null ? 1 : a})`;
  // everything drawn near an edge is drawn again on the other side, so the canvas tiles
  const wrap = (x, y, m, draw) => {
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) {
      const xx = x + i * S, yy = y + j * S;
      if (xx > -m && xx < S + m && yy > -m && yy < S + m) draw(xx, yy);
    }
  };
  g.fillStyle = col(-22, -8, 0.42); g.fillRect(0, 0, S, S);              // the ground under the blades: dark, a little brown
  for (let i = 0; i < 70; i++) {                                         // shade under the clumps
    const x = r() * S, y = r() * S, rad = 14 + r() * 40;
    wrap(x, y, rad, (xx, yy) => {
      const gr = g.createRadialGradient(xx, yy, 0, xx, yy, rad);
      gr.addColorStop(0, col(-10, 0, 0.3, 0.35)); gr.addColorStop(1, col(-10, 0, 0.3, 0));
      g.fillStyle = gr; g.fillRect(xx - rad, yy - rad, rad * 2, rad * 2);
    });
  }
  g.lineCap = 'round';
  const blade = (x, y, len, ang, w, style) => {
    const dx = Math.cos(ang) * len, dy = Math.sin(ang) * len, bend = (r() - 0.5) * len * 0.5;
    wrap(x, y, len + 2, (xx, yy) => {
      g.strokeStyle = style; g.lineWidth = w;
      g.beginPath(); g.moveTo(xx, yy);
      g.quadraticCurveTo(xx + dx * 0.5 - dy / len * bend, yy + dy * 0.5 + dx / len * bend, xx + dx, yy + dy);
      g.stroke();
    });
  };
  // three layers of blades, the lower ones darker (in the shade of the ones over them)
  [[9000, 0.62, 0.16, 1.9], [9000, 0.86, 0.18, 1.6], [6500, 1.08, 0.2, 1.3]].forEach(([n, dl, spread, w]) => {
    for (let i = 0; i < n; i++) {
      const tone = dl + (r() - 0.5) * spread * 2;
      blade(r() * S, r() * S, 5 + r() * 12, r() * Math.PI * 2, w * (0.7 + r() * 0.6), col((r() - 0.5) * 22, (r() - 0.5) * 16, tone));
    }
  });
  for (let i = 0; i < 700; i++)                                          // dry blades and old stems: straw
    blade(r() * S, r() * S, 4 + r() * 10, r() * Math.PI * 2, 1.1, col(-38 + r() * 8, -12, 1.05 + r() * 0.2, 0.85));
  for (let i = 0; i < 1400; i++)                                         // tips catching the light
    blade(r() * S, r() * S, 2 + r() * 4, r() * Math.PI * 2, 1, col(-6 + r() * 10, 6, 1.32 + r() * 0.12, 0.8));
  for (let i = 0; i < 9; i++) {                                          // a few clover patches
    const cx = r() * S, cy = r() * S;
    for (let k = 0; k < 7; k++) {
      const x = cx + (r() - 0.5) * 30, y = cy + (r() - 0.5) * 30, a = r() * 6.28;
      for (let l = 0; l < 3; l++) wrap(x, y, 8, (xx, yy) => {
        g.fillStyle = col(8, 4, 0.82 + r() * 0.1);
        g.beginPath(); g.arc(xx + Math.cos(a + l * 2.09) * 2.6, yy + Math.sin(a + l * 2.09) * 2.6, 2.7, 0, 7); g.fill();
      });
    }
  }
  return c;
}
function grassTexture(color) {
  if (grassTex[color]) return grassTex[color];
  const c = grassCanvas(color);
  // the blades' mean, in linear light: the shader scales it back to the zone's colour
  const px = c.getContext('2d').getImageData(0, 0, c.width, c.height).data, sum = [0, 0, 0], lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  for (let i = 0; i < px.length; i += 16) for (let k = 0; k < 3; k++) sum[k] += lin(px[i + k]);
  const n = px.length / 16, want = new T.Color(color);
  const gain = new T.Vector3(want.r / (sum[0] / n), want.g / (sum[1] / n), want.b / (sum[2] / n));
  const t = new T.CanvasTexture(c);
  t.colorSpace = T.SRGBColorSpace;
  t.wrapS = t.wrapT = T.RepeatWrapping;
  t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return (grassTex[color] = { t, gain });
}

// ---------------------------------------------------------------- the material
// fresh: a material of its own (one whose colour is changed, e.g. dimmed after dark by a zone's dress); else one per colour
// the patches (lusher, paler, yellowing), shared by the ground and the tufts so that the tufts match the ground under them
const GRASS_GLSL = `
  float gHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float gNoise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(gHash(i), gHash(i + vec2(1.0, 0.0)), f.x), mix(gHash(i + vec2(0.0, 1.0)), gHash(i + vec2(1.0, 1.0)), f.x), f.y); }
  vec3 gPatch(vec2 gw) {
    float lush = gNoise(gw * 0.09) * 0.55 + gNoise(gw * 0.31 + 17.0) * 0.3 + gNoise(gw * 1.1 + 9.0) * 0.15;
    vec3 c = mix(vec3(0.72, 0.83, 0.74), vec3(1.2, 1.13, 1.12), lush);
    float dry = smoothstep(0.6, 0.85, gNoise(gw * 0.05 + 41.0) * 0.7 + gNoise(gw * 0.4 + 5.0) * 0.3);
    return mix(c, c * vec3(1.3, 1.1, 0.6), dry * 0.7);
  }`;
const grassMats = {};
function grassMaterial(color, fresh) {
  color = color || '#86b86a';
  if (!fresh && grassMats[color]) return grassMats[color];
  const { t, gain } = grassTexture(color);
  const m = litMaterial({ color: 0xffffff, map: t });
  m.name = 'grass';
  m.userData.lawn = color;
  m.onBeforeCompile = (sh) => {
    sh.uniforms.grassGain = { value: gain };
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vGrassW;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvGrassW = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
        varying vec3 vGrassW;
        uniform vec3 grassGain;
        ${GRASS_GLSL}`)
      .replace('#include <map_fragment>', `
        vec2 gw = vGrassW.xz;
        vec3 ga = texture2D(map, gw / ${GRASS_TILE.toFixed(2)}).rgb;
        vec3 gb = texture2D(map, mat2(0.6, -0.8, 0.8, 0.6) * gw / ${(GRASS_TILE * 1.13).toFixed(3)} + vec2(0.37, 0.71)).rgb;
        vec3 gc = mix(ga, gb, smoothstep(0.42, 0.58, gNoise(gw * 0.55 + 3.1))) * grassGain;
        diffuseColor.rgb *= gc * gPatch(gw);`);
  };
  m.customProgramCacheKey = () => 'grass';
  if (!fresh) grassMats[color] = m;
  return m;
}

// ---------------------------------------------------------------- tufts: blades standing on the lawn round where you look
// High graphics only. Where the lawn is: the ground round the view is drawn once from above into a small mask (only what
// lies within 0.3 m of the lawn's height, so tree tops and roofs do not hide it; lawn white, roads, paths, sand, water,
// walls black), read back, and tufts are put on a grid fixed to the world (a jittered point a cell) where it is white.
// The mask and the tufts are made again when the view has moved TUFT.move from where they were made; the tufts fade out
// (shrink) toward TUFT.view round the view's centre, so the ones made or dropped at the edge are never seen to pop.
// Their normals point up, so they take the light of the ground they stand on; wind sways them.
const TUFT = { reach: 14, view: 10, move: 3.5, cell: 0.27, mask: 256, max: 12000, slab: 0.3 };
const tufts = { mesh: null, rt: null, cam: null, centre: null, made: null, y: 0, lawn: null, zone: null, wait: 0, white: null, black: null, buf: null };
function tuftGeometry() {
  let seed = 11;
  const r = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const pos = [], col = [], nor = [], idx = [];
  for (let b = 0; b < 11; b++) {
    const a = r() * 6.283, d = Math.sqrt(r()) * 0.1, x0 = Math.cos(a) * d, z0 = Math.sin(a) * d;
    const h = 0.05 + r() * 0.07, w = 0.009 + r() * 0.006, face = r() * 6.283, lean = 0.1 + r() * 0.35;
    const fx = Math.cos(face), fz = Math.sin(face), lx = Math.cos(a) * lean * h, lz = Math.sin(a) * lean * h;
    const base = pos.length / 3;
    // two sides at the root, two halfway up (narrower, leaning out), the tip (leaning out most)
    [[-1, 0, 1], [1, 0, 1], [-1, 0.5, 0.65], [1, 0.5, 0.65], [0, 1, 0]].forEach(([sd, t, wd]) => {
      const bend = t * t;
      pos.push(x0 + fx * sd * w * wd + lx * bend, h * t, z0 + fz * sd * w * wd + lz * bend);
      const tone = 0.68 + t * 0.55;
      col.push(tone, tone, tone);
      nor.push(0, 1, 0);
    });
    idx.push(base, base + 1, base + 3, base, base + 3, base + 2, base + 2, base + 3, base + 4);
  }
  const g = new T.BufferGeometry();
  g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new T.Float32BufferAttribute(nor, 3));
  g.setAttribute('color', new T.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  return g;
}
function tuftMaterial() {
  const m = litMaterial({ color: 0xffffff, vertexColors: true, side: T.DoubleSide });
  m.name = 'grass-tufts';
  m.userData.u = { tCentre: { value: new T.Vector2() }, tView: { value: TUFT.view }, tTime: { value: 0 }, tWind: { value: 1 }, tBase: { value: new T.Color() } };
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, m.userData.u);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', `#include <common>
        uniform vec2 tCentre; uniform float tView, tTime, tWind; varying vec2 vTuftRoot;`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        vec3 root = instanceMatrix[3].xyz;
        vTuftRoot = root.xz;
        transformed *= 1.0 - smoothstep(tView * 0.7, tView, distance(root.xz, tCentre));       // fade out toward the edge
        float gust = sin(tTime * 1.6 + root.x * 0.35 + root.z * 0.22) * 0.6 + sin(tTime * 3.7 + root.x * 1.7 - root.z * 1.3) * 0.25;
        vec3 wl = normalize((vec4(0.8, 0.0, 0.6, 0.0) * instanceMatrix).xyz);                    // the wind's way in the tuft's own frame
        transformed.xz += wl.xz * (gust + 0.5) * tWind * position.y * position.y * 2.2;`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
        uniform vec3 tBase; varying vec2 vTuftRoot;
        ${GRASS_GLSL}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
        float tv = gHash(floor(vTuftRoot * 3.0));
        diffuseColor.rgb *= tBase * gPatch(vTuftRoot) * mix(vec3(0.85, 0.95, 0.85), vec3(1.12, 1.06, 0.92), tv);`);
  };
  m.customProgramCacheKey = () => 'grass-tufts';
  return m;
}
// the lawn's meshes in the zone (the engine's ground or a zone's lawn) and their height
function lawnOf(group) {
  let found = null;
  group.traverse(o => { if (!found && o.isMesh && o.visible && o.material && o.material.userData && o.material.userData.lawn) found = o; });
  return found;
}
function tuftMask(cx, cz) {
  const N = TUFT.mask, S = TUFT.reach + 1;
  if (!tufts.rt) {
    tufts.rt = new T.WebGLRenderTarget(N, N);
    tufts.cam = new T.OrthographicCamera(-S, S, S, -S, 0, TUFT.slab * 2);
    tufts.cam.up.set(0, 0, -1);
    tufts.white = new T.MeshBasicMaterial({ color: 0xffffff, side: T.DoubleSide, toneMapped: false });
    tufts.black = new T.MeshBasicMaterial({ color: 0x000000, side: T.DoubleSide, toneMapped: false });
    tufts.buf = new Uint8Array(N * N * 4);
  }
  const c = tufts.cam;
  c.position.set(cx, tufts.y + TUFT.slab, cz);
  c.lookAt(cx, tufts.y - 10, cz);
  c.updateMatrixWorld();
  // everything in the zone black, the lawn white; left out: the marks on the ground that are not the ground (people's
  // shadows, the doorways, the guide) and the sea's surface (a grid round the camera that its shader puts over the sea:
  // flat, it would cover the town; the sand under it stays)
  const saved = [], hidden = [];
  zoneGroup.traverse(o => {
    if (!o.visible) return;
    if (o === marker.group || o.isPoints || o.isLine || o.isSprite || (o.isMesh && (o.material === shadowMat || o.material === portalMat || o.name === 'sea'))) { hidden.push(o); o.visible = false; return; }
    if (o.isMesh) { saved.push([o, o.material]); o.material = o.material && o.material.userData && o.material.userData.lawn ? tufts.white : tufts.black; }
  });
  const was = renderer.getRenderTarget(), auto = renderer.shadowMap.autoUpdate, clear = renderer.getClearColor(new T.Color()), alpha = renderer.getClearAlpha();
  renderer.shadowMap.autoUpdate = false;
  renderer.setRenderTarget(tufts.rt);
  renderer.setClearColor(0x000000, 1);
  renderer.clear();
  renderer.render(zoneGroup, c);
  renderer.readRenderTargetPixels(tufts.rt, 0, 0, N, N, tufts.buf);
  renderer.setRenderTarget(was);
  renderer.setClearColor(clear, alpha);
  renderer.shadowMap.autoUpdate = auto;
  saved.forEach(([o, m]) => { o.material = m; });
  hidden.forEach(o => { o.visible = true; });
}
function tuftsMake(cx, cz) {
  tuftMask(cx, cz);
  const N = TUFT.mask, S = TUFT.reach + 1, px = 2 * S / N, buf = tufts.buf;
  // a pixel row 0 is the bottom of the picture (+z, the camera's up being -z), column 0 its left (-x)
  const lawnAt = (x, z) => {
    const i = Math.floor((x - cx + S) / px), j = Math.floor((cz + S - z) / px);
    if (i < 1 || j < 1 || i >= N - 1 || j >= N - 1) return false;
    const at = (a, b) => buf[(b * N + a) * 4] > 127;
    return at(i, j) && at(i - 1, j) && at(i + 1, j) && at(i, j - 1) && at(i, j + 1);
  };
  const hash = (a, b, k) => { const v = Math.sin(a * 127.1 + b * 311.7 + k * 74.7) * 43758.5453; return v - Math.floor(v); };
  const m = tufts.mesh, M = new T.Matrix4(), q = new T.Quaternion(), p = new T.Vector3(), sc = new T.Vector3(), up = new T.Vector3(0, 1, 0);
  const C = TUFT.cell, R = TUFT.reach, R2 = R * R;
  let n = 0;
  for (let i = Math.floor((cx - R) / C); i <= Math.ceil((cx + R) / C) && n < TUFT.max; i++) {
    for (let k = Math.floor((cz - R) / C); k <= Math.ceil((cz + R) / C) && n < TUFT.max; k++) {
      const x = (i + hash(i, k, 1)) * C, z = (k + hash(i, k, 2)) * C;
      if ((x - cx) * (x - cx) + (z - cz) * (z - cz) > R2 || !lawnAt(x, z)) continue;
      const s = 0.7 + hash(i, k, 3) * 0.7;
      M.compose(p.set(x, tufts.y, z), q.setFromAxisAngle(up, hash(i, k, 4) * 6.283), sc.set(s, s * (0.8 + hash(i, k, 5) * 0.5), s));
      m.setMatrixAt(n++, M);
    }
  }
  m.count = n;
  m.instanceMatrix.needsUpdate = true;
  m.computeBoundingSphere();
  tufts.made = new T.Vector2(cx, cz);
}
const tuftDir = new T.Vector3();
function tuftTick(dt) {
  const zoneNow = zoneGroup && !busy ? zoneGroup : null;
  if (zoneNow !== tufts.zone) {            // a new zone: find its lawn (after its setup has dressed it)
    tufts.zone = zoneNow; tufts.lawn = null; tufts.made = null; tufts.wait = 0.3;
    if (tufts.mesh) tufts.mesh.visible = false;
  }
  if (!zoneNow || !gfxHigh()) { if (tufts.mesh) tufts.mesh.visible = false; return; }
  if (tufts.wait > 0) { tufts.wait -= dt; if (tufts.wait <= 0) { tufts.lawn = lawnOf(zoneGroup); if (tufts.lawn) tufts.y = tufts.lawn.getWorldPosition(new T.Vector3()).y; } return; }
  if (!tufts.lawn) return;
  if (!tufts.mesh) {
    tufts.mesh = new T.InstancedMesh(tuftGeometry(), tuftMaterial(), TUFT.max);
    tufts.mesh.name = 'grass-tufts';
    tufts.mesh.receiveShadow = true;
    tufts.mesh.frustumCulled = false;
    scene.add(tufts.mesh);
  }
  // the view's centre on the ground: where the camera looks, at most 8 m out
  camera.getWorldDirection(tuftDir);
  const cp = camera.position, flat = Math.hypot(tuftDir.x, tuftDir.z) || 1;
  if (cp.y - tufts.y > 22) { tufts.mesh.visible = false; return; }
  const out = tuftDir.y < -0.05 ? Math.min(8, (cp.y - tufts.y) / -tuftDir.y * flat) : 8;
  const cx = cp.x + tuftDir.x / flat * out, cz = cp.z + tuftDir.z / flat * out;
  if (!tufts.made || Math.hypot(cx - tufts.made.x, cz - tufts.made.y) > TUFT.move) tuftsMake(cx, cz);
  const u = tufts.mesh.material.userData.u, wx = weatherNow();
  u.tCentre.value.set(cx, cz);
  u.tTime.value += dt;
  u.tWind.value += ((wx.kind === 'rain' ? 1.9 : wx.kind === 'cloudy' ? 1.3 : wx.kind === 'fog' ? 0.4 : 1) - u.tWind.value) * Math.min(1, dt * 0.5);
  u.tBase.value.set(tufts.lawn.material.userData.lawn).multiply(tufts.lawn.material.color);        // the lawn's colour, dimmed with it after dark
  tufts.mesh.visible = tufts.mesh.count > 0;
}
debugPart({ get tufts() { return { on: !!(tufts.mesh && tufts.mesh.visible), count: tufts.mesh ? tufts.mesh.count : 0, lawnY: tufts.y, made: tufts.made && [+tufts.made.x.toFixed(1), +tufts.made.y.toFixed(1)] }; } });

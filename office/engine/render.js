/* Sim Office — renderer, scene, light, the toon look. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- renderer, scene, light
// Graphics quality: High = one soft shadow map, street lamps and ceiling lights, a vignette; Low = no shadows,
// two point lights at most, pixel ratio 1. Phones and tablets start on Low (settings.gfx remembers a choice).
const coarse = !!(window.matchMedia && matchMedia('(pointer: coarse)').matches);
const gfxHigh = () => (settings.gfx || (coarse ? 'low' : 'high')) === 'high';
const canvas = $('view');
const renderer = new T.WebGLRenderer({ canvas, antialias: true });
renderer.outputColorSpace = T.SRGBColorSpace;
renderer.toneMapping = T.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.type = T.PCFShadowMap;           // r186: PCFSoftShadowMap is gone; PCF with a radius is soft
const scene = new T.Scene();
scene.background = new T.Color('#9fd0f5');
const camera = new T.PerspectiveCamera(50, 1, 0.05, 400);
function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setPixelRatio(gfxHigh() ? Math.min(window.devicePixelRatio || 1, 2) : 1);
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.fov = w < h ? 64 : 50;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();
const hemi = new T.HemisphereLight(0xe6efff, 0x6b6258, 1.1);
const sun = new T.DirectionalLight(0xfff2dd, 2.0);        // the sun or the moon outdoors, the window light indoors
sun.shadow.bias = -0.0006;
sun.shadow.normalBias = 0.05;
sun.shadow.radius = 1.5;
sun.shadow.intensity = 0.8;
scene.add(hemi, sun, sun.target);
function applyQuality() {
  const high = gfxHigh();
  renderer.shadowMap.enabled = high;
  sun.castShadow = high;
  const size = coarse ? 1024 : 2048;
  if (sun.shadow.mapSize.x !== size) { sun.shadow.mapSize.set(size, size); if (sun.shadow.map) { sun.shadow.map.dispose(); sun.shadow.map = null; } }
  document.body.classList.toggle('gfx-low', !high);
  const b = $('gfx-btn');
  if (b) b.textContent = tr('Graphics: ' + (high ? 'High' : 'Low'), '그래픽: ' + (high ? '높음' : '낮음'));
  resize();
  shadowMat.opacity = high ? 0.6 : 1;
  if (zoneGroup) { setupLights(); lampTimer = 0; applyEnvironment(); if (life) startLife(); }
  scene.traverse(o => { if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => { m.needsUpdate = true; }); });
}
// what casts and what takes shadows: people, furniture, buildings, cars and trees cast; floors, tiles and food only take
function shadows(root, cast) {
  root.traverse(o => {
    if (!o.isMesh || o.userData.ink) return;
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    o.castShadow = !!cast && !mats.some(m => m && m.transparent && m.opacity < 0.9);
    o.receiveShadow = true;
  });
  return root;
}

// ---------------------------------------------------------------- toon look: stepped light on the Kenney colours; ink outline on people only
// LOOK (for tuning; localStorage 'so.look'): 'toon5' (default), 'toon3', 'lambert' or 'standard'.
const LOOK = (() => { try { return localStorage.getItem('so.look') || 'toon5'; } catch (e) { return 'toon5'; } })();
function steps(levels) {
  const t = new T.DataTexture(new Uint8Array(levels), levels.length, 1, T.RedFormat);
  t.minFilter = t.magFilter = T.NearestFilter;
  t.needsUpdate = true;
  return t;
}
const gradient = LOOK === 'toon3' ? steps([110, 185, 255]) : steps([96, 138, 180, 220, 255]);
function litMaterial(params) {
  let m;
  if (LOOK === 'lambert') m = new T.MeshLambertMaterial(params);
  else if (LOOK === 'standard') m = new T.MeshStandardMaterial(Object.assign({ roughness: 1, metalness: 0 }, params));
  else m = new T.MeshToonMaterial(Object.assign({ gradientMap: gradient }, params));
  m.userData.lit = true;
  return m;
}
const colorMats = {};
const toon = (color) => colorMats[color] || (colorMats[color] = litMaterial({ color: new T.Color(color) }));
const toonCache = new Map();
function toonOf(m) {          // keeps the Kenney colormap texture (map), unlike the Little Prince engine
  if (!m || (m.userData && m.userData.lit) || m.isShaderMaterial) return m;
  if (toonCache.has(m)) return toonCache.get(m);
  const t = litMaterial({
    color: m.color ? m.color.clone() : new T.Color(0xffffff), map: m.map || null,
    transparent: !!m.transparent, opacity: m.opacity == null ? 1 : m.opacity, alphaTest: m.alphaTest || 0, side: m.side, vertexColors: !!m.vertexColors
  });
  if (m.flatShading) {          // a mesh without normals (the Quaternius colour packs): the loader asks for flat shading, which
    t.defines = Object.assign({}, t.defines, { FLAT_SHADED: '' });     // the toon material has no switch for; its shader has the define
    t.customProgramCacheKey = () => 'flat';
  }
  if (m.emissive && m.emissive.getHex() && !m.emissiveMap) t.emissive = m.emissive.clone();
  t.name = m.name;
  toonCache.set(m, t);
  return t;
}
const inkCache = {};
function inkMaterial(w) {
  const key = w.toFixed(4);
  if (inkCache[key]) return inkCache[key];
  const m = new T.MeshBasicMaterial({ color: INK, side: T.BackSide });
  m.onBeforeCompile = (sh) => { sh.vertexShader = sh.vertexShader.replace('#include <begin_vertex>', `vec3 transformed = position + normal * ${key};`); };
  m.customProgramCacheKey = () => 'ink' + key;
  return (inkCache[key] = m);
}
function outline(root, thin) {        // thin: a factor on the line width (people: 0.5, or their faces get lines)
  const meshes = [];
  root.traverse(o => { if (o.isMesh && !o.userData.ink) meshes.push(o); });
  meshes.forEach(mesh => {
    if (!mesh.geometry.attributes.normal) return;
    if (!mesh.geometry.boundingSphere) mesh.geometry.computeBoundingSphere();
    const w = clamp(mesh.geometry.boundingSphere.radius * 0.022 * (thin || 1), 0.002, 0.03);
    let o;
    if (mesh.isSkinnedMesh) { o = new T.SkinnedMesh(mesh.geometry, inkMaterial(w)); o.bind(mesh.skeleton, mesh.bindMatrix); }
    else o = new T.Mesh(mesh.geometry, inkMaterial(w));
    o.frustumCulled = false;
    o.userData.ink = true;
    mesh.add(o);
  });
}
function radialTexture(stops, size) {
  const c = document.createElement('canvas');
  c.width = c.height = size || 64;
  const g = c.getContext('2d'), r = c.width / 2;
  const grd = g.createRadialGradient(r, r, 0, r, r, r);
  stops.forEach(([o, col]) => grd.addColorStop(o, col));
  g.fillStyle = grd;
  g.fillRect(0, 0, c.width, c.width);
  const t = new T.CanvasTexture(c);
  t.colorSpace = T.SRGBColorSpace;
  return t;
}
const shadowTex = radialTexture([[0, 'rgba(20,24,40,0.45)'], [0.6, 'rgba(20,24,40,0.2)'], [1, 'rgba(20,24,40,0)']]);
const shadowGeo = new T.CircleGeometry(1, 20).rotateX(-Math.PI / 2);
const shadowMat = new T.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false });
const bangTex = (function () {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  g.fillStyle = '#f2b632'; g.strokeStyle = '#1d2433'; g.lineWidth = 5;
  g.beginPath(); g.arc(32, 32, 27, 0, Math.PI * 2); g.fill(); g.stroke();
  g.fillStyle = '#1d2433'; g.font = 'bold 40px Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('!', 32, 34);
  const t = new T.CanvasTexture(c);
  t.colorSpace = T.SRGBColorSpace;
  return t;
})();

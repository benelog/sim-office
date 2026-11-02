/* Sim Office — the sea and the river. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md.
   Adapted from Ultra Water by Humpalumps (MIT, https://github.com/Humpalumps/Ultra-Water, see vendor/ultra-water.LICENSE):
   the Tessendorf FFT ocean (OceanSim.js), the baked foam texture (bakeTextures.js) and the surface shading, breakers and
   swash (OceanSurface.js), scaled down to the town's size and lit like the toon world. */
'use strict';
// ---------------------------------------------------------------- water: FFT waves, the sea at the beach, the river
// The waves come from a Tessendorf FFT simulation on the GPU: 4 cascades of 128² (60, 13.1, 3.1 and 0.83 m) in one
// 128×512 atlas, JONSWAP wind sea plus a swell, foam from the Jacobian. Its displacement and slope textures feed
// three kinds of water:
// - the sea (zone kit dress `sea`, SO_WATER.sea): a camera-centred polar grid displaced by the cascades, with
//   breakers that slow down, bunch up and break on a sloping beach (the eikonal travel time of a straight beach in
//   closed form), whitewater, the sand under it (a toon material: wet sand, the swash running up and draining back,
//   caustics, the water column seen through the surface). The surface draws only what it reflects and its foam
//   over that sand, so the shallows go turquoise and the waterline is where the waves really meet the sand.
// - the river (props with `water`, waterProp): a flat surface whose ripples flow downstream (a two-phase flow map),
//   shelving banks with a foam line, the far bank in its reflection.
// - water seen from inside (ground strips with the pattern 'water'): the same, deep.
// Each reflects the game's own sky (the same gradient, glow and clouds as the dome), the sun or the moon as a GGX
// highlight that breaks into glints, and is tone mapped and fogged like the rest. Without float render targets the
// waves are flat but the rest still works.
const SO_WATER = (function () {
  const N = 128, LOG_N = 7, LENGTHS = [60, 13.1, 3.1, 0.83], GRAV = 9.81, LOOP = 300;
  const COMMON_SIM = `
precision highp float;
precision highp int;
#define N ${N}
#define PI 3.14159265359
#define G ${GRAV.toFixed(2)}
#define ST 7.4e-5
vec2 cmul(vec2 a, vec2 b) { return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x); }
float omega(float k) { return sqrt(G * k + ST * k * k * k); }
`;
  // ---------- the simulation (OceanSim.js)
  const INIT_FRAG = COMMON_SIM + `
uniform vec4 uSpecA[2];  // scale, angle, spreadBlend, swell
uniform vec4 uSpecB[2];  // alpha, peakOmega, gamma, shortWavesFade
uniform vec4 uLength;
uniform vec4 uCut;
uniform float uCapFade;
out vec4 outColor;
uvec2 pcg2d(uvec2 v) {
  v = v * 1664525u + 1013904223u;
  v.x += v.y * 1664525u; v.y += v.x * 1664525u;
  v ^= v >> 16u;
  v.x += v.y * 1664525u; v.y += v.x * 1664525u;
  v ^= v >> 16u;
  return v;
}
vec2 gauss(ivec2 id, int c) {
  uvec2 h = pcg2d(uvec2(id) + uvec2(uint(c) * 7919u, uint(c) * 104729u) + 1337u);
  float u1 = (float(h.x) + 1.0) / 4294967296.0, u2 = float(h.y) / 4294967296.0;
  float r = sqrt(-2.0 * log(u1));
  return r * vec2(cos(2.0 * PI * u2), sin(2.0 * PI * u2));
}
float jonswap(float w, vec4 a, vec4 b) {
  float wp = b.y, sigma = w <= wp ? 0.07 : 0.09;
  float r = exp(-(w - wp) * (w - wp) / (2.0 * sigma * sigma * wp * wp));
  float iw = 1.0 / w, q = wp * iw;
  return a.x * b.x * G * G * iw * iw * iw * iw * iw * exp(-1.25 * q * q * q * q) * pow(b.z, r);
}
float normalisation(float s) {
  float s2 = s * s, s3 = s2 * s, s4 = s3 * s;
  if (s < 5.0) return -0.000564 * s4 + 0.00776 * s3 - 0.044 * s2 + 0.192 * s + 0.163;
  return -4.80e-08 * s4 + 1.07e-05 * s3 - 9.53e-04 * s2 + 5.90e-02 * s + 3.93e-01;
}
float directional(float theta, float w, vec4 a, vec4 b) {
  float x = w / b.y;
  float s = x > 1.0 ? 9.77 * pow(x, -2.5) : 6.97 * pow(x, 5.0);
  s += 16.0 * tanh(min(x, 20.0)) * a.w * a.w;
  float t = theta - a.y;
  return mix(2.0 / PI * cos(t) * cos(t), normalisation(s) * pow(abs(cos(0.5 * t)), 2.0 * s), a.z);
}
vec2 h0(ivec2 id, int c) {
  float L = uLength[c], dk = 2.0 * PI / L;
  vec2 k = vec2(id - N / 2) * dk;
  float kl = length(k);
  float lo = c == 0 ? 1e-4 : uCut[c - 1], hi = c == 3 ? 1e4 : uCut[c];
  if (kl < lo || kl > hi) return vec2(0.0);
  float w = omega(kl), dwdk = (G + 3.0 * ST * kl * kl) / (2.0 * w), theta = atan(k.y, k.x), S = 0.0;
  for (int i = 0; i < 2; i++) {
    if (uSpecA[i].x <= 0.0) continue;
    float fade = c == 3 ? uCapFade : uSpecB[i].w;
    S += jonswap(w, uSpecA[i], uSpecB[i]) * directional(theta, w, uSpecA[i], uSpecB[i]) * exp(-fade * fade * kl * kl);
  }
  return gauss(id, c) * sqrt(2.0 * S * dwdk / kl * dk * dk);
}
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  int c = p.y / N;
  ivec2 id = ivec2(p.x, p.y - c * N);
  vec2 a = h0(id, c), b = h0((N - id) % N, c);
  outColor = vec4(a, b.x, -b.y);
}`;
  const EVOLVE_FRAG = COMMON_SIM + `
uniform highp sampler2D uH0;
uniform vec4 uLength;
uniform float uTime;
layout(location = 0) out vec4 out0;
layout(location = 1) out vec4 out1;
vec2 pack2(vec2 a, vec2 b) { return vec2(a.x - b.y, a.y + b.x); }
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  int c = p.y / N;
  vec2 k = vec2(ivec2(p.x, p.y - c * N) - N / 2) * (2.0 * PI / uLength[c]);
  float kl = length(k), ik = kl > 1e-6 ? 1.0 / kl : 0.0;
  const float W0 = 2.0 * PI / ${LOOP.toFixed(1)};
  float ph = 2.0 * PI * fract(floor(omega(kl) / W0) * (uTime / ${LOOP.toFixed(1)}));
  vec2 e = vec2(cos(ph), sin(ph));
  vec4 h0 = texelFetch(uH0, p, 0);
  vec2 h = cmul(h0.xy, e) + cmul(h0.zw, vec2(e.x, -e.y)), ih = vec2(-h.y, h.x);
  vec2 dx = ih * k.x * ik, dz = ih * k.y * ik;
  vec2 dxdx = -h * k.x * k.x * ik, dzdz = -h * k.y * k.y * ik, dxdz = -h * k.x * k.y * ik;
  vec2 dydx = ih * k.x, dydz = ih * k.y;
  out0 = vec4(pack2(dx, dz), pack2(h, dxdz));
  out1 = vec4(pack2(dydx, dydz), pack2(dxdx, dzdz));
}`;
  const FFT_FRAG = COMMON_SIM + `
uniform highp sampler2D uIn0;
uniform highp sampler2D uIn1;
uniform int uSub;
uniform int uVertical;
layout(location = 0) out vec4 out0;
layout(location = 1) out vec4 out1;
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  int i = uVertical == 1 ? p.y % N : p.x;
  int hs = uSub >> 1;
  int e = (i / uSub) * hs + (i & (hs - 1));
  ivec2 pe, po;
  if (uVertical == 1) { int base = p.y - i; pe = ivec2(p.x, base + e); po = ivec2(p.x, base + e + N / 2); }
  else { pe = ivec2(e, p.y); po = ivec2(e + N / 2, p.y); }
  float a = 2.0 * PI * float(i & (uSub - 1)) / float(uSub);
  vec2 tw = vec2(cos(a), sin(a));
  vec4 e0 = texelFetch(uIn0, pe, 0), o0 = texelFetch(uIn0, po, 0);
  vec4 e1 = texelFetch(uIn1, pe, 0), o1 = texelFetch(uIn1, po, 0);
  out0 = vec4(e0.xy + cmul(tw, o0.xy), e0.zw + cmul(tw, o0.zw));
  out1 = vec4(e1.xy + cmul(tw, o1.xy), e1.zw + cmul(tw, o1.zw));
}`;
  // (uAmp: the day's sea state scales the whole spectrum, so the weather changes the waves without a new spectrum)
  const ASSEMBLE_FRAG = COMMON_SIM + `
uniform highp sampler2D uIn0;
uniform highp sampler2D uIn1;
uniform sampler2D uPrev;
uniform int uCascade;
uniform float uLambda;
uniform float uDt;
uniform float uFoamRecovery;
uniform float uAmp;
layout(location = 0) out vec4 outDisp;
layout(location = 1) out vec4 outSlope;
void main() {
  ivec2 id = ivec2(gl_FragCoord.xy);
  ivec2 p = id + ivec2(0, uCascade * N);
  float s = ((id.x + id.y) & 1) == 0 ? uAmp : -uAmp;
  vec4 a = texelFetch(uIn0, p, 0) * s;
  vec4 b = texelFetch(uIn1, p, 0) * s;
  float dxx = uLambda * b.z, dzz = uLambda * b.w, dxz = uLambda * a.w;
  float jac = (1.0 + dxx) * (1.0 + dzz) - dxz * dxz;
  vec2 slope = b.xy / max(vec2(1.0 + dxx, 1.0 + dzz), vec2(0.2));
  float prev = texelFetch(uPrev, id, 0).w;
  float turb = min(jac, prev + uDt * uFoamRecovery / max(jac, 0.5));
  outDisp = vec4(uLambda * a.x, a.z, uLambda * a.y, turb);
  outSlope = vec4(slope, slope * slope);
}`;
  const FULL_VERT = 'in vec3 position;\nout vec2 vUv;\nvoid main() { vUv = position.xy * 0.5 + 0.5; gl_Position = vec4(position.xy, 0.0, 1.0); }';
  const quadGeo = new T.BufferGeometry();
  quadGeo.setAttribute('position', new T.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
  const quadCam = new T.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quad = new T.Mesh(quadGeo);
  quad.frustumCulled = false;
  const rawPass = (frag, uniforms) => new T.RawShaderMaterial({ glslVersion: T.GLSL3, vertexShader: FULL_VERT, fragmentShader: frag, uniforms: uniforms || {}, depthTest: false, depthWrite: false });
  function pass(mat, target) { quad.material = mat; renderer.setRenderTarget(target); renderer.render(quad, quadCam); }

  // the day's sea: a light onshore breeze and a long, low swell from the south-west (the Pacific), wave heights of a few
  // tens of centimetres; the weather scales it (uAmp)
  const params = { windSpeed: 5.5, windDirection: -75, fetchKm: 30, spreadBlend: 0.85, windSwell: 0.25, gamma: 3.3, shortWavesFade: 0.01,
    capillaryFade: 0.02, waveScale: 1, swellScale: 0.6, swellWindSpeed: 5, swellDirection: -100, swellFetchKm: 400, swellSwell: 1,
    choppiness: 0.8, foamRecovery: 0.7 };
  function jonswapParams(windSpeed, fetchKm) {
    const fetch = fetchKm * 1000;
    return { alpha: 0.076 * Math.pow((GRAV * fetch) / (windSpeed * windSpeed), -0.22), peakOmega: 22 * Math.pow((windSpeed * fetch) / (GRAV * GRAV), -0.33) };
  }
  // a neutral texture for each output when the simulation cannot run (flat water, no foam)
  function flatTex(r, g, b, a) {
    const t = new T.DataTexture(new Float32Array([r, g, b, a]), 1, 1, T.RGBAFormat, T.FloatType);
    t.wrapS = t.wrapT = T.RepeatWrapping;
    t.needsUpdate = true;
    return t;
  }
  const sim = { ok: false, time: 0, parity: 0, disp: [], slope: [], amp: 1, ampWant: 1, skip: 0, acc: 0 };
  for (let c = 0; c < 4; c++) { sim.disp[c] = flatTex(0, 0, 0, 1); sim.slope[c] = flatTex(0, 0, 0, 0); }
  function simInit() {
    if (sim.ok || sim.failed) return sim.ok;
    try {
      if (!renderer.capabilities.isWebGL2 || !renderer.extensions.has('EXT_color_buffer_float')) throw new Error('no float render targets');
      const H = N * LENGTHS.length;
      const fft = { type: T.FloatType, minFilter: T.NearestFilter, magFilter: T.NearestFilter, depthBuffer: false, generateMipmaps: false };
      sim.h0 = new T.WebGLRenderTarget(N, H, fft);
      const half = Object.assign({}, fft, { type: T.HalfFloatType, count: 2 });
      sim.ping = new T.WebGLRenderTarget(N, H, half);
      sim.pong = new T.WebGLRenderTarget(N, H, half);
      const out = { type: T.HalfFloatType, minFilter: T.LinearMipmapLinearFilter, magFilter: T.LinearFilter, wrapS: T.RepeatWrapping, wrapT: T.RepeatWrapping,
        generateMipmaps: true, anisotropy: Math.min(8, renderer.capabilities.getMaxAnisotropy()), depthBuffer: false, count: 2 };
      sim.out = LENGTHS.map(() => [new T.WebGLRenderTarget(N, N, out), new T.WebGLRenderTarget(N, N, out)]);
      const prevClear = renderer.getClearColor(new T.Color()), prevAlpha = renderer.getClearAlpha();
      renderer.setClearColor(0x000000, 1);          // turbulence starts at 1 (no foam): cleared to 0 here, the min() in assemble lifts it
      sim.out.forEach(pair => pair.forEach(rt => { renderer.setRenderTarget(rt); renderer.clear(true, false, false); }));
      renderer.setClearColor(prevClear, prevAlpha);
      const lengths = new T.Vector4(...LENGTHS);
      sim.initMat = rawPass(INIT_FRAG, {
        uSpecA: { value: [new T.Vector4(), new T.Vector4()] }, uSpecB: { value: [new T.Vector4(), new T.Vector4()] }, uLength: { value: lengths },
        uCut: { value: new T.Vector4(...LENGTHS.slice(1).map(L => (2 * Math.PI / L) * 6), 0) }, uCapFade: { value: 0 } });
      sim.evolveMat = rawPass(EVOLVE_FRAG, { uH0: { value: sim.h0.texture }, uLength: { value: lengths }, uTime: { value: 0 } });
      sim.fftMat = rawPass(FFT_FRAG, { uIn0: { value: null }, uIn1: { value: null }, uSub: { value: 2 }, uVertical: { value: 0 } });
      sim.assembleMat = rawPass(ASSEMBLE_FRAG, { uIn0: { value: null }, uIn1: { value: null }, uPrev: { value: null }, uCascade: { value: 0 }, uLambda: { value: 1 },
        uDt: { value: 0 }, uFoamRecovery: { value: 0.7 }, uAmp: { value: 1 } });
      const p = params, u = sim.initMat.uniforms, wind = jonswapParams(p.windSpeed, p.fetchKm), swell = jonswapParams(p.swellWindSpeed, p.swellFetchKm), rad = Math.PI / 180;
      u.uSpecA.value[0].set(p.waveScale, p.windDirection * rad, p.spreadBlend, p.windSwell);
      u.uSpecB.value[0].set(wind.alpha, wind.peakOmega, p.gamma, p.shortWavesFade);
      u.uSpecA.value[1].set(p.swellScale * p.waveScale, p.swellDirection * rad, 1, p.swellSwell);
      u.uSpecB.value[1].set(swell.alpha, swell.peakOmega, p.gamma, p.shortWavesFade);
      u.uCapFade.value = p.capillaryFade;
      pass(sim.initMat, sim.h0);
      renderer.setRenderTarget(null);
      sim.ok = true;
      simStep(0.016);
      foamBake();
    } catch (e) {
      console.warn('Sim Office: flat water (' + e.message + ')');
      sim.failed = true;
      renderer.setRenderTarget(null);
    }
    return sim.ok;
  }
  function simStep(dt) {
    const r = renderer, prevTarget = r.getRenderTarget();
    sim.evolveMat.uniforms.uTime.value = sim.time;
    pass(sim.evolveMat, sim.ping);
    let src = sim.ping, dst = sim.pong;
    const fu = sim.fftMat.uniforms;
    for (let dir = 0; dir < 2; dir++) {
      fu.uVertical.value = dir;
      for (let s = 1; s <= LOG_N; s++) {
        fu.uSub.value = 1 << s;
        fu.uIn0.value = src.textures[0];
        fu.uIn1.value = src.textures[1];
        pass(sim.fftMat, dst);
        [src, dst] = [dst, src];
      }
    }
    const au = sim.assembleMat.uniforms;
    au.uIn0.value = src.textures[0];
    au.uIn1.value = src.textures[1];
    au.uLambda.value = params.choppiness;
    au.uDt.value = dt;
    au.uFoamRecovery.value = params.foamRecovery;
    au.uAmp.value = sim.amp;
    const next = sim.parity ^ 1;
    for (let c = 0; c < sim.out.length; c++) {
      au.uCascade.value = c;
      au.uPrev.value = sim.out[c][sim.parity].textures[0];
      pass(sim.assembleMat, sim.out[c][next]);
      sim.disp[c] = sim.out[c][next].textures[0];
      sim.slope[c] = sim.out[c][next].textures[1];
    }
    sim.parity = next;
    r.setRenderTarget(prevTarget);
  }

  // ---------- the foam texture (bakeTextures.js): R lace, G billow height, BA its gradient
  const FOAM_FRAG = `
precision highp float;
in vec2 vUv;
out vec4 outColor;
vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}
vec2 voronoi(vec2 p, float period) {
  vec2 i = floor(p), f = fract(p);
  float f1 = 8.0, f2 = 8.0;
  for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
    vec2 g = vec2(x, y);
    float d = length(g + hash22(mod(i + g, period)) - f);
    if (d < f1) { f2 = f1; f1 = d; } else if (d < f2) f2 = d;
  }
  return vec2(f1, f2);
}
float billow(vec2 uv) {
  vec2 a = voronoi(uv * 7.0 + 0.3, 7.0), b = voronoi(uv * 17.0 + 0.7, 17.0), c = voronoi(uv * 41.0 + 0.1, 41.0);
  return 0.5 * sqrt(clamp((a.y - a.x) * 2.2, 0.0, 1.0)) + 0.32 * sqrt(clamp((b.y - b.x) * 2.2, 0.0, 1.0)) + 0.18 * sqrt(clamp((c.y - c.x) * 2.2, 0.0, 1.0));
}
void main() {
  vec2 a = voronoi(vUv * 9.0, 9.0), b = voronoi(vUv * 23.0 + 0.5, 23.0), c = voronoi(vUv * 61.0, 61.0);
  float lace = 1.0 - smoothstep(0.0, 0.22, a.y - a.x), fine = 1.0 - smoothstep(0.0, 0.16, b.y - b.x), bubbles = smoothstep(0.55, 0.15, c.x);
  float v = lace * 0.55 + fine * 0.3 + bubbles * 0.25 + (1.0 - a.x) * 0.25;
  const float e = 1.0 / 1024.0;
  vec2 g = vec2(billow(vUv + vec2(e, 0.0)) - billow(vUv - vec2(e, 0.0)), billow(vUv + vec2(0.0, e)) - billow(vUv - vec2(0.0, e))) / (2.0 * e);
  outColor = vec4(clamp(v * 0.85, 0.0, 1.0), billow(vUv), clamp(0.5 + g / 64.0, 0.0, 1.0));
}`;
  // until it is baked (or without render targets): a soft canvas-drawn lace
  const foamFallback = (function () {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    g.fillStyle = 'rgb(90,128,128)'; g.fillRect(0, 0, 64, 64);
    for (let i = 0; i < 90; i++) { g.fillStyle = `rgba(255,${120 + (i * 37) % 120},128,0.5)`; g.beginPath(); g.arc((i * 53) % 64, (i * 29) % 64, 2 + (i % 5), 0, Math.PI * 2); g.fill(); }
    const t = new T.CanvasTexture(c);
    t.wrapS = t.wrapT = T.RepeatWrapping;
    return t;
  })();
  const U = {};          // the uniforms every water material shares (one object each, so one update reaches all)
  function foamBake() {
    const rt = new T.WebGLRenderTarget(512, 512, { wrapS: T.RepeatWrapping, wrapT: T.RepeatWrapping, minFilter: T.LinearMipmapLinearFilter, magFilter: T.LinearFilter,
      generateMipmaps: true, depthBuffer: false, anisotropy: Math.min(8, renderer.capabilities.getMaxAnisotropy()) });
    const m = rawPass(FOAM_FRAG);
    pass(m, rt);
    renderer.setRenderTarget(null);
    m.dispose();
    U.uFoamTex.value = rt.texture;
  }

  // ---------- shading
  Object.assign(U, {
    uDisp0: { value: sim.disp[0] }, uDisp1: { value: sim.disp[1] }, uDisp2: { value: sim.disp[2] },
    uSlope0: { value: sim.slope[0] }, uSlope1: { value: sim.slope[1] }, uSlope2: { value: sim.slope[2] }, uSlope3: { value: sim.slope[3] },
    uLength: { value: new T.Vector4(...LENGTHS) }, uTime: { value: 0 }, uFoamTex: { value: foamFallback },
    // the sky (copied from the dome, so the reflection is the sky you see), the light (the sun or the moon, the sky's fill)
    uTop: { value: new T.Color() }, uHorizon: { value: new T.Color() }, uSkySun: { value: new T.Color() }, uGlow: { value: 1 }, uCover: { value: 0 },
    uCloud: { value: new T.Color(1, 1, 1) }, uDrift: { value: 0 },
    uSunDir: { value: new T.Vector3(0, 1, 0) }, uSunIrr: { value: new T.Color(2, 2, 2) }, uAmbIrr: { value: new T.Color(0.8, 0.8, 0.8) }, uExposure: { value: 0.85 },
    // the sea: its frame (origin and seaward direction on the ground), the beach profile, the travel time, the breakers
    uSeaO: { value: new T.Vector2() }, uSeaDir: { value: new T.Vector2(0, 1) }, uSeaRect: { value: new T.Vector4(200, -3, 140, 0) },
    uSeaBed: { value: new T.Vector4(3, 7, 0.07, -0.12) }, uSeaTau: { value: new T.Vector4(1.6, 100, 6.9, 0) },
    uShoreWave: { value: new T.Vector4(0.13, 11, 1.0, 1.0) }, uShoreReach: { value: 26 },
    uGridScale: { value: 1 }, uCellStep: { value: 1 }
  });
  const GLSL_COMMON = `
#define W_PI 3.14159265359
#define N_TEX ${N.toFixed(1)}
uniform sampler2D uDisp0, uDisp1, uDisp2;
uniform sampler2D uSlope0, uSlope1, uSlope2, uSlope3;
uniform sampler2D uFoamTex;
uniform vec4 uLength;
uniform float uTime;
uniform vec3 uSunDir, uSunIrr, uAmbIrr;
uniform float uExposure;
float w_hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float w_noise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  return mix(mix(w_hash12(i), w_hash12(i + vec2(1.0, 0.0)), u.x), mix(w_hash12(i + vec2(0.0, 1.0)), w_hash12(i + 1.0), u.x), u.y);
}
// the scene's tone mapping (three's ACES fit), for the light the water adds itself; the sky in it is drawn untoned, like the dome
vec3 w_aces(vec3 color) {
  const mat3 IN = mat3(vec3(0.59719, 0.07600, 0.02840), vec3(0.35458, 0.90834, 0.13383), vec3(0.04823, 0.01566, 0.83777));
  const mat3 OUT = mat3(vec3(1.60475, -0.10208, -0.00327), vec3(-0.53108, 1.10813, -0.07276), vec3(-0.07367, -0.00605, 1.07602));
  color = IN * (color * uExposure / 0.6);
  vec3 a = color * (color + 0.0245786) - 0.000090537, b = color * (0.983729 * color + 0.4329510) + 0.238081;
  return clamp(OUT * (a / b), 0.0, 1.0);
}
// diffuse light on a surface facing up, as the toon props get it (Lambert: irradiance / pi)
vec3 w_lit(vec3 albedo, float sunAmount) { return albedo * (uAmbIrr + uSunIrr * sunAmount) / W_PI; }
`;
  // the sea's shared functions (OceanSurface.js SHORE_GLSL, SWASH_GLSL, WATER_GLSL) for a straight sandy beach: the
  // still depth at a distance v out from the sand's flat top (an exponential shelf, D deep in the end, slope s at the
  // top), the travel time of a wave from the waterline out to v (the eikonal of c = sqrt(g depth), in closed form for
  // that shelf: 2 Lc atanh(sqrt(1 - e^(-x/Lc))) / sqrt(g K)), the breakers and the swash on the sand.
  const GLSL_SEA = `
uniform vec2 uSeaO, uSeaDir;
uniform vec4 uSeaBed;      // flat sand width, D, top slope, still water level (y)
uniform vec4 uSeaTau;      // waterline v, Lc, depth far out K
uniform vec4 uShoreWave;   // amplitude, wavelength, speed, steepness
uniform float uShoreReach;
float seaV(vec2 xz) { return dot(xz - uSeaO, uSeaDir) - uSeaBed.x; }
float bedY(float v) { return 0.005 - (v <= 0.0 ? 0.0 : uSeaBed.y * (1.0 - exp(-v * uSeaBed.z / uSeaBed.y))); }
float stillDepth(float v) { return uSeaBed.w - bedY(v); }
float travelTime(float v) {
  float x = v - uSeaTau.x;
  if (x <= 0.0) return 0.0;
  float q = min(sqrt(1.0 - exp(-x / uSeaTau.y)), 0.995);
  return uSeaTau.y / sqrt(9.81 * uSeaTau.z) * log((1.0 + q) / (1.0 - q));
}
// angular frequencies on the 300 s loop of the simulation, so the time can wrap without a jump
float quantW(float w) { const float W0 = 2.0 * W_PI / 300.0; return max(floor(w / W0 + 0.5), 1.0) * W0; }
float shoreNoisePhase(vec2 xz) { return w_noise(xz * 0.035) * 9.0 + w_noise(xz * 0.09 + 7.0) * 2.5; }
float shoreGroup(vec2 xz) {          // the sets drift along the beach (a circle through the noise every 300 s)
  float a = uTime * 2.0 * W_PI / 300.0;
  return 0.45 + 0.55 * w_noise(xz * 0.045 + 2.0 * vec2(cos(a), sin(a)));
}
vec3 cascadeDamp(float depth) {      // long swell gives way to the breakers in the shallows, chop lasts almost to the sand
  float chop = smoothstep(-0.05, 0.35, depth) * mix(0.55, 1.0, smoothstep(0.0, 1.5, depth));
  return vec3(smoothstep(0.25, 1.8, depth), chop, chop);
}
struct Shore { vec3 disp; vec2 slope; float foam; float lip; float residual; float speed; };
Shore shoreWaves(vec2 xz) {
  Shore o = Shore(vec3(0.0), vec2(0.0), 0.0, 0.0, 0.0, 0.0);
  float v = seaV(xz), depth = stillDepth(v);
  float env = smoothstep(uShoreReach, uShoreReach * 0.35, v) * smoothstep(-0.2, 0.08, depth);
  if (env <= 0.0 || uShoreWave.x <= 0.0) return o;
  vec2 dir = -uSeaDir;
  float tau = travelTime(v);
  float shoal = pow(clamp(max(depth, 0.12) / 1.5, 0.04, 1.0), -0.25);
  float cel = sqrt(9.81 * clamp(depth, 0.06, 6.0));
  float amax = 0.42 * max(depth, 0.0) + 0.03;
  float np = shoreNoisePhase(xz), group = shoreGroup(xz), pinch = 0.85;
  for (int i = 0; i < 2; i++) {
    float lambda = uShoreWave.y * (i == 0 ? 1.0 : 0.61);
    float w = quantW(sqrt(9.81 * 2.0 * W_PI / lambda) * uShoreWave.z);
    float k = w / cel;
    float a = min(uShoreWave.x * (i == 0 ? 1.0 : 0.45) * env * shoal * group, amax * (i == 0 ? 1.0 : 0.5));
    float ph = w * (tau + uTime) + np * (i == 0 ? 1.0 : 1.37) + float(i) * 2.1;
    float c = 0.5 + 0.5 * cos(ph), s = sin(ph);
    const float P = 1.6;
    float cp = pow(max(c, 1e-4), P - 1.0);
    float rel = a / max(depth, 0.03);
    float cycle = floor((ph + W_PI) / (2.0 * W_PI));
    float early = w_noise(xz * 0.25 + vec2(cycle * 7.3, cycle * 3.1 + float(i) * 31.0));
    float breaking = smoothstep(0.12 + 0.14 * early, 0.3 + 0.2 * early, rel);
    float pitch = i == 0 ? 2.0 * uShoreWave.w * a * smoothstep(0.16, 0.28, rel) * (1.0 - smoothstep(0.4, 0.6, rel)) : 0.0;
    pitch = min(pitch, 0.35 / (1.08 * k));
    pinch -= 1.08 * pitch * k;
    float qak = min(pinch, uShoreWave.w * a * k * 8.0);
    pinch -= qak;
    float c5 = c * c * c * c * c;
    o.disp.y += a * (2.0 * cp * c - 0.78);
    o.disp.xz += dir * ((qak / k) * s + pitch * c5 * c);
    o.slope += dir * (a * k * P * cp * s / max(1.0 - qak * cos(ph) + 3.0 * pitch * k * c5 * s, 0.2));
    float psi = mod(ph + W_PI, 2.0 * W_PI) - W_PI;
    o.foam += breaking * smoothstep(-0.45, 0.0, psi) * exp(-max(psi, 0.0) * 0.8);
    if (i == 0) {
      o.speed = w / k;
      o.lip = breaking * c5 * smoothstep(0.6, -0.2, psi);
      o.residual = smoothstep(0.18, 0.4, rel) * (0.3 + 0.45 * exp(-mod(ph, 2.0 * W_PI) * 0.4));
    }
  }
  return o;
}
vec3 waterDisplacement(vec2 xz, vec3 lod) {
  vec3 damp = cascadeDamp(stillDepth(seaV(xz)));
  vec3 d = textureLod(uDisp0, xz / uLength.x, max(lod.x, 0.0)).xyz * damp.x
         + textureLod(uDisp1, xz / uLength.y, max(lod.y, 0.0)).xyz * damp.y
         + textureLod(uDisp2, xz / uLength.z, max(lod.z, 0.0)).xyz * damp.z;
  return d + shoreWaves(xz).disp;
}
vec3 waterAt(vec2 q, vec3 lod) {      // the surface over world xz: undo the horizontal push by fixed-point iteration
  vec2 p = q;
  vec3 d = vec3(0.0);
  for (int i = 0; i < 3; i++) { d = waterDisplacement(p, lod); p = q - d.xz; }
  return waterDisplacement(p, lod);
}
// every bore that reaches the waterline runs up the sand and drains back: (film thickness, foam edge, wetness)
vec3 swash(vec2 xz, float hgt) {
  if (hgt < -0.15 || uShoreWave.x <= 0.0) return vec3(0.0);
  float R = 0.55 * uShoreWave.x * shoreGroup(xz);
  if (R < 0.004) return vec3(0.0);
  if (hgt > R) return vec3(0.0, 0.0, 0.5 * smoothstep(1.5 * R, R, hgt));
  float w = quantW(sqrt(9.81 * 2.0 * W_PI / uShoreWave.y) * uShoreWave.z);
  float s = fract((w * uTime + shoreNoisePhase(xz)) / (2.0 * W_PI));
  float eta = R * (s < 0.3 ? sin(s / 0.3 * 1.5708) : cos((s - 0.3) / 0.7 * 1.5708));
  float th = eta - hgt;
  float edge = s < 0.35 ? smoothstep(-0.006, 0.0, th) * (1.0 - smoothstep(0.0, 0.03, th)) : 0.0;
  float sPass = 0.3 + 0.7 * acos(clamp(hgt / R, 0.0, 1.0)) / 1.5708;
  float dry = (s > sPass ? s - sPass : s + 1.0 - sPass) * 2.0 * W_PI / w;
  return vec3(max(th, 0.0), edge, th > 0.0 ? 1.0 : exp(-dry / 5.0));
}
`;
  // the sky as the dome draws it (environment.js), seen in the water; blur softens the clouds on rough water
  const GLSL_SKY = `
uniform vec3 uTop, uHorizon, uSkySun, uCloud;
uniform float uGlow, uCover, uDrift;
uniform vec4 uBank;          // what stands round the water low in its reflection (the far bank's trees): colour, top elevation
float w_h2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float w_vn(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(w_h2(i), w_h2(i + vec2(1.0, 0.0)), f.x), mix(w_h2(i + vec2(0.0, 1.0)), w_h2(i + vec2(1.0, 1.0)), f.x), f.y); }
float w_fbm(vec2 p) { float a = 0.5, s = 0.0; for (int i = 0; i < 4; i++) { s += a * w_vn(p); p = p * 2.03 + 7.1; a *= 0.5; } return s; }
vec3 skyColor(vec3 d, float blur) {
  d.y = max(d.y, 0.0);
  vec3 c = mix(uHorizon, uTop, pow(smoothstep(0.0, 0.75, d.y), 0.7));
  float s = max(dot(d, uSunDir), 0.0);
  c += uSkySun * (pow(s, 12.0) * 0.45 * uGlow + pow(s, 3.0) * 0.18 * uGlow);
#ifndef W_LOW
  if (uCover > 0.01 && d.y > 0.0) {
    vec2 uv = d.xz / (d.y + 0.14) * 0.85 + vec2(uDrift, uDrift * 0.35);
    float n = w_fbm(uv), th = mix(0.74, 0.16, uCover);
    float m = smoothstep(th - blur, th + 0.2 + blur, n) * smoothstep(0.0, 0.1, d.y);
    c = mix(c, uCloud * (0.82 + 0.3 * w_fbm(uv * 2.7 + 3.0)), m * mix(0.85, 0.97, uCover));
  }
#endif
  return c;
}
// the far bank low in the reflection, seen through a calmer normal than the sky (or every ripple flips it)
vec3 bankMix(vec3 c, vec3 d) {
  if (uBank.w <= 0.0) return c;
  float edge = uBank.w * (0.75 + 0.5 * w_vn(vec2(atan(d.z, d.x) * 9.0, 0.5)));
  return mix(c, w_aces(w_lit(uBank.rgb, 0.6)), smoothstep(edge * 1.3, edge * 0.5, abs(d.y)) * 0.85);
}
`;
  // the light the surface itself sends back: GGX sun (three's convention: irradiance x BRDF), glints, Fresnel
  const GLSL_SURF = `
uniform vec3 uAbsorption, uScatter;
uniform vec4 uFoam;          // whitecap bias, scale, shore band (m), brightness
uniform vec4 uOptics;        // base roughness, glints, crest glow, -
float poisson(float lam, float u) {
  if (lam > 6.0) return max(0.0, lam + sqrt(lam) * log(u / (1.0 - u)) / 1.702);
  float p = exp(-lam), F = p, n = 0.0;
  for (int k = 0; k < 14; k++) { if (u <= F) break; n += 1.0; p *= lam / n; F += p; }
  return n;
}
vec3 sunSpecular(vec3 Nrm, vec3 V, float alpha, vec2 xz, float dist, vec2 fw) {
  float NoV = max(dot(Nrm, V), 1e-4), nl = max(dot(Nrm, uSunDir), 0.0);
  float aS = max(alpha, 0.03), aS2 = aS * aS;
  vec3 H = normalize(uSunDir + V);
  float NoH = max(dot(Nrm, H), 0.0), dd = NoH * NoH * (aS2 - 1.0) + 1.0, D = aS2 / (W_PI * dd * dd);
  float vis = 0.5 / (nl * sqrt(NoV * NoV * (1.0 - aS2) + aS2) + NoV * sqrt(nl * nl * (1.0 - aS2) + aS2) + 1e-5);
  float Fs = 0.02 + 0.98 * pow(1.0 - max(dot(V, H), 0.0), 5.0);
  vec3 spec = uSunIrr * (D * vis * Fs * nl);
#ifndef W_LOW
  // glitter: the lobe as a finite number of facets, a Poisson count per cell of about a pixel that twinkles
  if (uOptics.y > 0.0 && dot(spec, vec3(1.0)) > 0.02) {
    float lf = log2(max(max(fw.x, fw.y), 1e-3)) + 1.0, l0 = floor(lf);
    float per = 2e4 * D * NoH * 6.8e-5 / (4.0 * max(dot(V, H), 0.05)), m = 0.0;
    for (int j = 0; j < 2; j++) {
      float l = l0 + float(j), sz = exp2(l);
      vec2 cell = floor(xz / sz);
      float lam = per * sz * sz, tt = uTime * 3.0 + w_hash12(cell + l * 17.17) * 64.0, it = floor(tt);
      float n0 = poisson(lam, clamp(w_hash12(cell * 1.31 + it * 3.7), 1e-4, 0.9999));
      float n1 = poisson(lam, clamp(w_hash12(cell * 1.31 + (it + 1.0) * 3.7), 1e-4, 0.9999));
      m += (j == 0 ? 1.0 - (lf - l0) : lf - l0) * min(mix(n0, n1, smoothstep(0.0, 1.0, tt - it)) / max(lam, 1e-4), 300.0);
    }
    spec *= mix(1.0, m, uOptics.y * smoothstep(1.5, 12.0, dist));
  }
#endif
  return spec;
}
// foam lit like a white prop, a little darker in its creases, glowing where the light comes through
vec3 foamColor(float fh, float dens, float pat, vec3 V, vec3 Nrm, vec2 fg) {
  vec3 fN = normalize(Nrm - vec3(fg.x, 0.0, fg.y) * (0.03 + 0.12 * dens));
  float ao = mix(0.55, 1.0, smoothstep(0.15, 0.75, fh));
  float solid = smoothstep(0.2, 0.9, dens * (0.55 + 0.7 * fh));
  vec3 alb = mix(vec3(0.62, 0.8, 0.84), vec3(0.96), max(solid, smoothstep(0.3, 0.9, pat) * 0.6));
  float sunAmt = clamp(dot(fN, uSunDir) * 0.8 + 0.2, 0.0, 1.0) * mix(ao, 1.0, 0.4) + 0.4 * pow(clamp(dot(uSunDir, -V), 0.0, 1.0), 4.0) * (1.0 - solid);
  return w_aces(uFoam.w * alb * (uAmbIrr * 1.1 * ao + uSunIrr * sunAmt) / W_PI);
}
`;
  // ---------- the sea surface: a polar grid round the camera, kept inside the sea's rectangle
  const SEA_VERT = GLSL_COMMON + GLSL_SEA + `
uniform float uGridScale, uCellStep;
uniform vec4 uSeaRect;       // half the width along the beach, nearest and farthest distance out
varying vec3 vWorld;
varying vec2 vXZ;
#include <fog_pars_vertex>
void main() {
  vec2 local = position.xz;
  float r = length(local);
  vec2 xz = cameraPosition.xz + local * uGridScale;
  vec2 perp = vec2(-uSeaDir.y, uSeaDir.x), rel = xz - uSeaO;
  xz = uSeaO + perp * clamp(dot(rel, perp), -uSeaRect.x, uSeaRect.x) + uSeaDir * clamp(dot(rel, uSeaDir), uSeaRect.y, uSeaRect.z);
  float cell = max(r, 0.4) * uCellStep * uGridScale;
  vec3 d = waterDisplacement(xz, log2(cell * N_TEX / uLength.xyz) + 1.0);
  vXZ = xz;
  vWorld = vec3(xz.x + d.x, uSeaBed.w + d.y, xz.y + d.z);
  vec4 mvPosition = viewMatrix * vec4(vWorld, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`;
  // Over the sand (drawn first, with the water column it sees through, see BED below) the surface adds only its
  // reflection, the sun and its foam, as alpha: the shallows show the sand, the deep the colour of the water.
  const SEA_FRAG = GLSL_COMMON + GLSL_SEA + GLSL_SKY + GLSL_SURF + `
varying vec3 vWorld;
varying vec2 vXZ;
#include <fog_pars_fragment>
void main() {
  vec3 toCam = cameraPosition - vWorld;
  float dist = length(toCam);
  vec3 V = toCam / dist;
  float depth = stillDepth(seaV(vXZ));
  vec3 damp = cascadeDamp(depth);
  vec4 s0 = texture(uSlope0, vXZ / uLength.x) * damp.x, s1 = texture(uSlope1, vXZ / uLength.y) * damp.y;
  vec4 s2 = texture(uSlope2, vXZ / uLength.z) * damp.z, s3 = texture(uSlope3, vXZ / uLength.w) * damp.z;
  s0.zw *= damp.x; s1.zw *= damp.y; s2.zw *= damp.z; s3.zw *= damp.z;
  Shore shore = shoreWaves(vXZ);
  vec2 slope = s0.xy + s1.xy + s2.xy + s3.xy + shore.slope;
  vec2 variance = max(s0.zw - s0.xy * s0.xy, 0.0) + max(s1.zw - s1.xy * s1.xy, 0.0) + max(s2.zw - s2.xy * s2.xy, 0.0) + max(s3.zw - s3.xy * s3.xy, 0.0);
  vec3 Nrm = normalize(vec3(-slope.x, 1.0, -slope.y));
  vec3 dndx = dFdx(Nrm), dndy = dFdy(Nrm);
  float geoVar = min(0.25 * (dot(dndx, dndx) + dot(dndy, dndy)), 0.18);
  float alpha = sqrt(uOptics.x * uOptics.x + variance.x + variance.y + geoVar);
  float NoV = max(dot(Nrm, V), 1e-4), NoL = dot(Nrm, uSunDir);
  vec2 fw = fwidth(vXZ);
  // whitecaps from the Jacobian, the breakers' whitewater, the thin edge where the water runs out over the sand
  float t0 = texture(uDisp0, vXZ / uLength.x).w, t1 = texture(uDisp1, vXZ / uLength.y).w, t2 = texture(uDisp2, vXZ / uLength.z).w;
  float jac = mix(1.0, t0, damp.x) + mix(1.0, t1, damp.y) + mix(1.0, t2, damp.z) - 2.0;
  float foam = clamp((uFoam.x - jac) * uFoam.y, 0.0, 1.0);
  // (the surface fades out where it runs thin over the sand: the vertices are too far apart to place the waterline on a
  // shallow beach, the sand's shader draws it per pixel)
  float thin = smoothstep(0.0, uFoam.z, vWorld.y - bedY(seaV(vWorld.xz)));
  float shoreFoam = clamp(shore.foam, 0.0, 1.0);
  // Fresnel with a roughness-aware F90, the sky (or the far bank) in the reflection, the sun
  float F90 = max(1.0 - 0.7 * sqrt(alpha), 0.02);
  float F = 0.02 + (F90 - 0.02) * pow(1.0 - NoV, 5.0);
  vec3 R = reflect(-V, Nrm);
  R.y = abs(R.y);
  vec3 refl = skyColor(R, alpha);
  vec3 spec = sunSpecular(Nrm, V, alpha, vXZ, dist, fw);
  // crests the sun shines through, and the thin lips of the breakers, glow with the water's colour
  float back = pow(clamp(dot(uSunDir, -V), 0.0, 1.0), 4.0);
  vec3 sss = uOptics.z * max(vWorld.y - uSeaBed.w, 0.0) * back * pow(0.5 - 0.5 * NoL, 2.0) * uScatter * uSunIrr
           + shore.lip * uSunIrr * uScatter * 0.25 * (0.3 + 2.5 * back);
  vec3 lit = w_aces(spec + sss);
  vec3 col = refl * F + lit;
  float a = max(F, max(lit.r, max(lit.g, lit.b)));
  // foam: eroded by age (the pattern's threshold), whitewater riding shoreward with the bore, lace left in the surf
  float cover = 0.0, pat = 0.0, fh = 0.5, dens = 0.0;
  vec2 fg = vec2(0.0);
  if (foam > 0.0) {
    vec4 f0 = texture(uFoamTex, vXZ * 0.33);
    pat = f0.r * 0.65 + texture(uFoamTex, vXZ * 0.093 + 0.37).r * 0.35;
    cover = smoothstep(1.05 - foam, 1.3 - foam, pat) * sqrt(foam);
    fh = f0.g; fg = (f0.ba - 0.5) * 64.0 * 0.33; dens = foam;
  }
  if (shoreFoam > 0.0) {
    const float FLOW_T = 2.5;
    vec2 vel = -uSeaDir * shore.speed;
    float f0 = fract(uTime / FLOW_T), f1 = fract(uTime / FLOW_T + 0.5), wb = abs(2.0 * f0 - 1.0);
    vec4 b0 = texture(uFoamTex, (vWorld.xz - vel * (f0 * FLOW_T)) * 0.45);
    vec4 b1 = texture(uFoamTex, (vWorld.xz - vel * (f1 * FLOW_T)) * 0.45 + 0.43);
    float bh = mix(b0.g, b1.g, wb);
    float sp = mix(b0.r, b1.r, wb) * 0.3 + bh * 0.45 + texture(uFoamTex, vWorld.xz * 0.07 + 0.5).r * 0.25;
    float sc = smoothstep(1.0 - shoreFoam * 1.1, 1.2 - shoreFoam * 1.1, sp) * sqrt(shoreFoam);
    if (sc >= cover) { pat = sp; fh = bh; dens = shoreFoam; fg = mix(b0.ba, b1.ba, wb) * (64.0 * 0.45) - 32.0 * 0.45; }
    cover = max(cover, sc);
  }
  if (shore.residual > 0.0) {
    float fp = fract(uTime / 7.5);
    vec2 drift = -uSeaDir * 0.9;
    float r0 = texture(uFoamTex, (vWorld.xz - drift * fp) * 0.18).r, r1 = texture(uFoamTex, (vWorld.xz - drift * fract(fp + 0.5)) * 0.18 + 0.5).r;
    float rp = mix(r0, r1, abs(2.0 * fp - 1.0));
    float rc = smoothstep(1.2 - shore.residual, 1.35 - shore.residual, rp) * shore.residual;
    if (rc >= cover) { pat = rp; fh = 0.5; fg = vec2(0.0); dens = shore.residual * 0.5; }
    cover = max(cover, rc);
  }
  if (cover > 0.0) {
    float k = cover * mix(0.8, 1.0, smoothstep(0.2, 0.9, dens));
    col = mix(col, foamColor(fh, dens, pat, V, Nrm, fg), k);
    a = mix(a, 1.0, k);
  }
  a = clamp(a, 0.0, 1.0) * thin;
  gl_FragColor = vec4(col / max(a, 1e-3), a);
  #include <colorspace_fragment>
  #include <fog_fragment>
}`;
  // ---------- the sand under the sea (and the beach): a toon material, so it is lit, shadowed and fogged like the
  // props; above the water it gets the swash, wet sand and the foam edge, under it caustics and the water column
  const BED_FRAG_PARS = GLSL_COMMON + GLSL_SEA + `
uniform vec3 uAbsorption, uScatter;
uniform float uCaustic;
varying vec3 vBedPos;
float caustics(vec2 xz, float d) {      // the 3.1 m cascade focuses the sun: 1 / the area ratio of a thin lens
  float L = uLength.z, e = L / N_TEX * 1.5, q = e / L;
  vec2 uv = xz / L;
  float lap = (texture(uSlope2, uv + vec2(q, 0.0)).x - texture(uSlope2, uv - vec2(q, 0.0)).x
             + texture(uSlope2, uv + vec2(0.0, q)).y - texture(uSlope2, uv - vec2(0.0, q)).y) / (2.0 * e);
  return clamp(1.0 / max(1.0 + uCaustic * d * lap, 0.25), 0.0, 3.0);
}
vec3 seaBed(vec3 lit, vec3 p) {
  float still = stillDepth(seaV(p.xz));
  if (still < -0.3) return lit;                  // the dry sand
  float surf = uSeaBed.w;
  if (still < 1.4) surf += waterAt(p.xz, vec3(0.0)).y;
  vec3 sw = swash(p.xz, p.y - uSeaBed.w);
  float above = surf - p.y;
  vec3 foamLit = w_lit(vec3(0.92), max(uSunDir.y, 0.0));
  // the waterline: a frill of foam where the water meets the sand (on the water's side, a little into it)
  float lace = texture(uFoamTex, p.xz * 0.45).r;
  float line = (1.0 - smoothstep(0.0, 0.035, abs(above - 0.008))) * smoothstep(0.25, 0.6, lace + 0.2);
  if (above <= 0.0) {
    lit *= mix(vec3(1.0), vec3(0.66, 0.6, 0.52), sw.z);
    float film = smoothstep(0.0, 0.02, sw.x);
    lit = mix(lit, lit * vec3(0.78, 0.9, 0.95) + w_lit(uScatter, max(uSunDir.y, 0.0)) * 0.6, film * 0.6);
    lit = mix(lit, foamLit, clamp(max(sw.y * (0.5 + lace), line), 0.0, 1.0) * 0.85);
    return lit;
  }
  lit *= vec3(0.66, 0.6, 0.52);
  vec3 V = normalize(cameraPosition - p);
  float cosV = sqrt(max(1.0 - (1.0 - V.y * V.y) / 1.769, 0.0)), cosS = sqrt(max(1.0 - (1.0 - uSunDir.y * uSunDir.y) / 1.769, 0.0));
  lit *= mix(1.0, caustics(p.xz - uSunDir.xz / max(uSunDir.y, 0.2) * above * 0.75, above), smoothstep(0.05, 0.3, uSunDir.y));
  lit *= exp(-uAbsorption * above / max(cosS, 0.3));
  vec3 Tv = exp(-uAbsorption * above / max(cosV, 0.08));
  return mix(lit * Tv + w_lit(uScatter, max(uSunDir.y, 0.0) * 0.8 + 0.2) * (1.0 - Tv), foamLit, line * 0.8);
}
`;
  // ---------- the river and water seen from inside: flat, the ripples flowing, the bed under it in the colour
  const FLAT_VERT = `
varying vec3 vWorld;
varying vec2 vUv;
#include <fog_pars_vertex>
void main() {
  vUv = uv;
  vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
  vec4 mvPosition = viewMatrix * vec4(vWorld, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  #include <fog_vertex>
}`;
  const FLAT_FRAG = GLSL_COMMON + GLSL_SKY + GLSL_SURF + `
uniform vec2 uFlow;          // the current, world m/s
uniform vec4 uRiver;         // width (across uv.y), depth in the middle, width of the shelving bank, ripple strength
uniform vec3 uBedColor;
varying vec3 vWorld;
varying vec2 vUv;
#include <fog_pars_fragment>
vec4 flowSlope(sampler2D tex, float L, vec2 xz, float t, float FT, float off) {
  float f0 = fract(t / FT), f1 = fract(t / FT + 0.5), wb = abs(2.0 * f0 - 1.0);
  return mix(texture(tex, (xz - uFlow * f0 * FT) / L + off), texture(tex, (xz - uFlow * f1 * FT) / L + off + 0.5), wb);
}
void main() {
  vec3 toCam = cameraPosition - vWorld;
  float dist = length(toCam);
  vec3 V = toCam / dist;
  vec2 xz = vWorld.xz;
  float edge = min(vUv.y, 1.0 - vUv.y) * uRiver.x;
  float depth = uRiver.y * (uRiver.z > 0.0 ? smoothstep(0.0, uRiver.z, edge) * 0.85 + 0.15 : 1.0);
  vec4 s = flowSlope(uSlope1, uLength.y, xz, uTime, 7.5, 0.0) * 0.35 + flowSlope(uSlope2, uLength.z, xz, uTime, 2.5, 0.21) + flowSlope(uSlope3, uLength.w, xz, uTime, 1.5, 0.63) * 0.5;
  vec2 slope = s.xy * uRiver.w;
  vec3 Nrm = normalize(vec3(-slope.x, 1.0, -slope.y));
  vec3 dndx = dFdx(Nrm), dndy = dFdy(Nrm);
  float alpha = sqrt(uOptics.x * uOptics.x + max(s.z + s.w - dot(s.xy, s.xy), 0.0) * uRiver.w * uRiver.w + min(0.25 * (dot(dndx, dndx) + dot(dndy, dndy)), 0.18));
  float NoV = max(dot(Nrm, V), 1e-4);
  // the water column over the bed, looked through along the refracted ray
  float cosV = sqrt(max(1.0 - (1.0 - NoV * NoV) / 1.769, 0.0));
  vec3 Tv = exp(-uAbsorption * depth / max(cosV, 0.08)), Ts = exp(-uAbsorption * depth);
  vec3 body = w_aces(w_lit(uBedColor, max(uSunDir.y, 0.0)) * Ts * Tv + w_lit(uScatter, max(uSunDir.y, 0.0) * 0.8 + 0.2) * (1.0 - Tv));
  float F90 = max(1.0 - 0.7 * sqrt(alpha), 0.02), F = 0.02 + (F90 - 0.02) * pow(1.0 - NoV, 5.0);
  vec3 R = reflect(-V, Nrm);
  R.y = abs(R.y);
  vec3 refl = bankMix(skyColor(R, alpha), reflect(-V, normalize(vec3(-slope.x * 0.25, 1.0, -slope.y * 0.25))));
  vec3 col = mix(body, refl, F) + w_aces(sunSpecular(Nrm, V, alpha, xz, dist, fwidth(xz)));
  // a line of foam along the banks, carried with the current
  if (uRiver.z > 0.0) {
    float fp = fract(uTime / 7.5), wb = abs(2.0 * fp - 1.0);
    float lace = mix(texture(uFoamTex, (xz - uFlow * fp * 7.5) * 0.4).r, texture(uFoamTex, (xz - uFlow * fract(fp + 0.5) * 7.5) * 0.4 + 0.5).r, wb);
    float band = 1.0 - smoothstep(0.0, 0.18, edge);
    float cover = smoothstep(1.2 - band, 1.4 - band, lace) * band;
    col = mix(col, foamColor(0.6, 0.4, lace, V, Nrm, vec2(0.0)), cover * 0.6);
  }
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
  #include <fog_fragment>
}`;

  // ---------- materials
  const low = () => !gfxHigh();
  const mats = [];
  function make(vert, frag, own, extra) {
    const m = new T.ShaderMaterial(Object.assign({
      uniforms: Object.assign(T.UniformsUtils.clone(T.UniformsLib.fog), U, own),
      vertexShader: vert, fragmentShader: frag, fog: true
    }, extra || {}));
    m.defines = low() ? { W_LOW: '' } : {};
    mats.push(m);
    return m;
  }
  // colours of the water: what it absorbs per metre (red first), the colour it scatters back, foam and roughness
  const SEA_LOOK = { absorption: [1.5, 0.42, 0.3], scatter: '#2c86b4', bank: null };
  const KINDS = {
    river: { absorption: [1.1, 0.55, 0.62], scatter: '#2f7f86', bed: '#5d5238', depth: 1.4, shelf: 1.6, ripples: 0.16, bank: ['#2c4a24', 0.11], flow: 0.45 },
    harbor: { absorption: [1.2, 0.45, 0.34], scatter: '#2a6f9c', bed: '#3b4a52', depth: 6, shelf: 0, ripples: 0.6, bank: null, flow: 0 }
  };
  const cache = {};
  function flatMaterial(kind, width, flow) {
    const K = KINDS[kind] || KINDS.river, key = kind + ':' + width.toFixed(2) + ':' + flow.join(',');
    if (cache[key]) return cache[key];
    return (cache[key] = make(FLAT_VERT, FLAT_FRAG, {
      uAbsorption: { value: new T.Vector3(...K.absorption) }, uScatter: { value: new T.Color(K.scatter) }, uBedColor: { value: new T.Color(K.bed) },
      uFoam: { value: new T.Vector4(0, 0, 0, 0.95) }, uOptics: { value: new T.Vector4(0.05, 0.3, 0, 0) },
      uBank: { value: K.bank ? new T.Vector4(...new T.Color(K.bank[0]).toArray(), K.bank[1]) : new T.Vector4(0, 0, 0, 0) },
      uFlow: { value: new T.Vector2(flow[0] * K.flow, flow[1] * K.flow) }, uRiver: { value: new T.Vector4(width, K.depth, K.shelf, K.ripples) }
    }));
  }
  // a water surface in place of a box prop (the engine's addProp): { pack: 'box', size, water: 'river' | 'harbor', flow }
  function prop(p, sz) {
    const along = sz[0] >= sz[2], flow = p.flow || (along ? [1, 0] : [0, 1]);
    const g = new T.PlaneGeometry(sz[0], sz[2]).rotateX(-Math.PI / 2);
    if (!along) {          // the shorter side is across: uv.y runs across the river
      const uv = g.attributes.uv;
      for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getY(i), uv.getX(i));
    }
    g.translate(0, sz[1] + 0.001, 0);
    const m = new T.Mesh(g, flatMaterial(typeof p.water === 'string' ? p.water : 'river', along ? sz[2] : sz[0], flow));
    m.name = 'water';
    track(m);
    return m;
  }
  // a strip of the land round a room (the zone kit's ground strips with the pattern 'water'): rect, y, the kind
  function strip(rect, y, kind) {
    const w = rect[2] - rect[0], d = rect[3] - rect[1];
    const g = new T.PlaneGeometry(w, d).rotateX(-Math.PI / 2).translate((rect[0] + rect[2]) / 2, y, (rect[1] + rect[3]) / 2);
    const m = new T.Mesh(g, flatMaterial(kind || 'harbor', d, [1, 0]));
    m.name = 'water';
    track(m);
    return m;
  }
  // The sea (zone kit dress `sea`): the sand from the edge of the grass out under the water, in the sea's own frame
  // (x along the beach, -z out to sea, the grass edge at z 0, as the kit lays it), then the surface once the kit has
  // placed it (seaSurface).
  function seaBed(o) {
    const W = o.width, D = o.depth, beach = o.beach, u = U.uSeaBed.value, shelfD = 7, s0 = 0.07;
    u.set(beach, shelfD, s0, 0);
    const bed = (v) => 0.005 - (v <= 0 ? 0 : shelfD * (1 - Math.exp(-v * s0 / shelfD)));
    const vw = 1.6, level = bed(vw), Lc = shelfD / s0, K = shelfD - (0.005 - level);
    u.w = level;
    U.uSeaTau.value.set(vw, Lc, K, 0);
    U.uSeaRect.value.set(W / 2, 0, D, 0);
    // rows: every 25 cm over the beach and the surf, then wider out to sea
    const rows = [];
    for (let v = -beach; v < 10; v += 0.25) rows.push(v);
    for (let v = 10, step = 0.5; v < D - beach; v += step, step *= 1.12) rows.push(v);
    rows.push(D - beach);
    const nx = Math.max(8, Math.round(W / 4)), pos = [], uv = [], idx = [];
    rows.forEach(v => { for (let i = 0; i <= nx; i++) { const x = -W / 2 + W * i / nx; pos.push(x, bed(v), -(v + beach)); uv.push(x / o.tile[0], (v + beach) / o.tile[1]); } });
    for (let j = 0; j < rows.length - 1; j++) for (let i = 0; i < nx; i++) {
      const a = j * (nx + 1) + i, b = a + nx + 1;
      idx.push(a, a + 1, b, a + 1, b + 1, b);
    }
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    const m = litMaterial({ color: new T.Color('#ffffff'), map: o.sand });
    m.name = 'sea-bed';
    m.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, U, { uAbsorption: SEA_U.uAbsorption, uScatter: SEA_U.uScatter, uCaustic: { value: 0.3 } });
      sh.vertexShader = 'varying vec3 vBedPos;\n' + sh.vertexShader.replace('#include <project_vertex>', '#include <project_vertex>\n  vBedPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
      const line = 'vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;';
      if (sh.fragmentShader.indexOf(line) < 0) { console.warn('Sim Office: the sea bed shader hook is missing'); return; }
      sh.fragmentShader = sh.fragmentShader.replace('void main() {', BED_FRAG_PARS + '\nvoid main() {').replace(line, line + '\n  outgoingLight = seaBed(outgoingLight, vBedPos);');
    };
    m.customProgramCacheKey = () => 'so-sea-bed';
    const mesh = new T.Mesh(g, m);
    mesh.name = 'sea-bed';
    mesh.receiveShadow = true;
    track(mesh);
    return mesh;
  }
  const SEA_U = {
    uAbsorption: { value: new T.Vector3(...SEA_LOOK.absorption) }, uScatter: { value: new T.Color(SEA_LOOK.scatter) },
    uFoam: { value: new T.Vector4(0.4, 1.6, 0.05, 0.95) }, uOptics: { value: new T.Vector4(0.04, 0.3, 1.4, 0) }, uBank: { value: new T.Vector4(0, 0, 0, 0) }
  };
  const grids = {};
  function polarGrid(angular) {          // OceanSurface.js buildGrid: rings that grow geometrically, so cells stay square
    if (grids[angular]) return grids[angular];
    const INNER = 0.4, OUTER = 420, q = 1 + 2 * Math.PI / angular, radii = [];
    for (let r = INNER / 8; r < INNER * 0.99; r *= 1.25) radii.push(r);
    for (let r = INNER; r < OUTER; r *= q) radii.push(r);
    const verts = new Float32Array((1 + radii.length * angular) * 3);
    let v = 3;
    radii.forEach(r => { for (let a = 0; a < angular; a++) { const t = a / angular * Math.PI * 2; verts[v++] = Math.cos(t) * r; verts[v++] = 0; verts[v++] = Math.sin(t) * r; } });
    const idx = [];
    for (let a = 0; a < angular; a++) idx.push(0, 1 + ((a + 1) % angular), 1 + a);
    for (let ring = 0; ring < radii.length - 1; ring++) {
      const i0 = 1 + ring * angular, i1 = i0 + angular;
      for (let a = 0; a < angular; a++) { const b = (a + 1) % angular; idx.push(i0 + a, i0 + b, i1 + a, i0 + b, i1 + b, i1 + a); }
    }
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.BufferAttribute(verts, 3));
    g.setIndex(new T.BufferAttribute(new Uint32Array(idx), 1));
    g.boundingSphere = new T.Sphere(new T.Vector3(), OUTER);
    return (grids[angular] = g);
  }
  let seaMesh = null;
  function seaSurface(placed) {
    placed.updateMatrixWorld(true);
    const o = placed.localToWorld(new T.Vector3(0, 0, 0)), f = placed.localToWorld(new T.Vector3(0, 0, -1)).sub(o);
    U.uSeaO.value.set(o.x, o.z);
    U.uSeaDir.value.set(f.x, f.z).normalize();
    const m = new T.Mesh(polarGrid(low() ? 128 : 256), make(SEA_VERT, SEA_FRAG, SEA_U, { transparent: true }));
    m.frustumCulled = false;
    m.name = 'sea';
    m.renderOrder = 1;
    seaMesh = m;
    track(m);
    return m;
  }
  // the engine's ground stops at the sand, which goes on under the water (the sea's frame from the placed kit piece)
  function landEnd(group) {
    const o = U.uSeaO.value, d = U.uSeaDir.value;
    group.children.forEach(c => {
      if (!c.isMesh || !c.geometry || c.geometry.type !== 'PlaneGeometry' || Math.abs(c.position.y + 0.01) > 1e-4) return;
      const p = c.geometry.parameters, along = Math.abs(d.y) >= Math.abs(d.x), sgn = along ? Math.sign(d.y) : Math.sign(d.x);
      const size = along ? p.height : p.width, ctr = along ? c.position.z : c.position.x, edge = (along ? o.y : o.x) + sgn * 0.3;
      const lo = ctr - size / 2, hi = ctr + size / 2, nlo = sgn > 0 ? lo : Math.max(lo, edge), nhi = sgn > 0 ? Math.min(hi, edge) : hi;
      if (nhi - nlo >= size - 1e-3 || nhi <= nlo) return;
      if (along) { c.scale.z = (nhi - nlo) / size; c.position.z = (nlo + nhi) / 2; } else { c.scale.x = (nhi - nlo) / size; c.position.x = (nlo + nhi) / 2; }
      c.updateMatrix();
    });
  }

  // ---------- every frame
  const tracked = [];
  function track(m) { tracked.push(m); }
  function shown(m) { let o = m; while (o.parent) o = o.parent; return o === scene && m.visible; }
  const AMP = { clear: 1, partly: 1.1, cloudy: 1.3, rain: 1.75, fog: 0.6 };
  let lowNow = null;
  function tick(dt) {
    let any = false;
    for (let i = 0; i < tracked.length && !any; i++) any = shown(tracked[i]);
    if (!any) return;
    if (lowNow !== low()) {          // the graphics setting: fewer vertices, no glints or clouds in the water
      lowNow = low();
      mats.forEach(m => { m.defines = lowNow ? { W_LOW: '' } : {}; m.needsUpdate = true; });
      if (seaMesh) seaMesh.geometry = polarGrid(lowNow ? 128 : 256);
    }
    if (!sim.ok && !sim.failed) simInit();
    sim.time = (sim.time + dt) % LOOP;
    U.uTime.value = sim.time;
    // the weather's sea state, eased in
    const wx = typeof weatherNow === 'function' ? weatherNow() : null;
    sim.ampWant = wx ? (AMP[wx.kind] || 1) : 1;
    sim.amp += (sim.ampWant - sim.amp) * Math.min(1, dt * 0.2);
    U.uShoreWave.value.x = 0.13 * (0.6 + 0.4 * sim.amp);
    if (sim.ok) {
      sim.acc += dt;
      if (!lowNow || (sim.skip ^= 1)) { simStep(sim.acc); sim.acc = 0; }
      U.uDisp0.value = sim.disp[0]; U.uDisp1.value = sim.disp[1]; U.uDisp2.value = sim.disp[2];
      U.uSlope0.value = sim.slope[0]; U.uSlope1.value = sim.slope[1]; U.uSlope2.value = sim.slope[2]; U.uSlope3.value = sim.slope[3];
    }
    // the sky and the light: outdoors as the dome and the lights are now; seen from a room, the day outside
    const S = sky.material.uniforms;
    if (Z && Z.indoor) {
      const e = envAt(solarHour(hourNow(), sunDay()));
      U.uTop.value.copy(e.top); U.uHorizon.value.copy(e.horizon); U.uSunDir.value.copy(e.dir);
      U.uSkySun.value.copy(e.sun).multiplyScalar(e.night > 0.5 ? 0.9 : 1.2);
      U.uGlow.value = e.night > 0.5 ? 0.35 : 1; U.uCover.value = 0;
      U.uSunIrr.value.copy(e.sun).multiplyScalar(e.sunI);
      U.uAmbIrr.value.copy(e.sky).multiplyScalar(e.fillI);
      U.uExposure.value = e.exposure;
    } else {
      U.uTop.value.copy(S.top.value); U.uHorizon.value.copy(S.horizon.value); U.uSunDir.value.copy(S.sunDir.value);
      U.uSkySun.value.copy(S.sunColor.value); U.uGlow.value = S.glow.value; U.uCover.value = S.cover.value;
      U.uCloud.value.copy(S.cloud.value); U.uDrift.value = S.drift.value;
      U.uSunIrr.value.copy(sun.color).multiplyScalar(sun.intensity);
      U.uAmbIrr.value.copy(hemi.color).multiplyScalar(hemi.intensity);
      U.uExposure.value = renderer.toneMappingExposure;
    }
    if (seaMesh) {
      const h = Math.abs(camera.position.y);
      U.uGridScale.value = Math.max(1, h / 4);
      U.uCellStep.value = 2 * Math.PI / (lowNow ? 128 : 256);
    }
  }
  return { prop, strip, seaBed, seaSurface, landEnd, tick, sim, U, params };
})();
window.SO_WATER = SO_WATER;
function waterProp(p, sz) { return SO_WATER.prop(p, sz); }
function waterTick(dt) { try { SO_WATER.tick(dt); } catch (e) { console.error('water:', e); SO_WATER.tick = () => {}; } }

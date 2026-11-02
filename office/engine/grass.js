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
const grassMats = {};
function grassMaterial(color, fresh) {
  color = color || '#86b86a';
  if (!fresh && grassMats[color]) return grassMats[color];
  const { t, gain } = grassTexture(color);
  const m = litMaterial({ color: 0xffffff, map: t });
  m.name = 'grass';
  m.onBeforeCompile = (sh) => {
    sh.uniforms.grassGain = { value: gain };
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vGrassW;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvGrassW = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
        varying vec3 vGrassW;
        uniform vec3 grassGain;
        float gHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float gNoise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
          return mix(mix(gHash(i), gHash(i + vec2(1.0, 0.0)), f.x), mix(gHash(i + vec2(0.0, 1.0)), gHash(i + vec2(1.0, 1.0)), f.x), f.y); }`)
      .replace('#include <map_fragment>', `
        vec2 gw = vGrassW.xz;
        vec3 ga = texture2D(map, gw / ${GRASS_TILE.toFixed(2)}).rgb;
        vec3 gb = texture2D(map, mat2(0.6, -0.8, 0.8, 0.6) * gw / ${(GRASS_TILE * 1.13).toFixed(3)} + vec2(0.37, 0.71)).rgb;
        vec3 gc = mix(ga, gb, smoothstep(0.42, 0.58, gNoise(gw * 0.55 + 3.1))) * grassGain;
        float lush = gNoise(gw * 0.09) * 0.55 + gNoise(gw * 0.31 + 17.0) * 0.3 + gNoise(gw * 1.1 + 9.0) * 0.15;           // patches: deeper green or paler
        gc *= mix(vec3(0.72, 0.83, 0.74), vec3(1.2, 1.13, 1.12), lush);
        float dry = smoothstep(0.6, 0.85, gNoise(gw * 0.05 + 41.0) * 0.7 + gNoise(gw * 0.4 + 5.0) * 0.3);   // dry, yellowing spots
        gc = mix(gc, gc * vec3(1.3, 1.1, 0.6), dry * 0.7);
        diffuseColor.rgb *= gc;`);
  };
  m.customProgramCacheKey = () => 'grass';
  if (!fresh) grassMats[color] = m;
  return m;
}

// Check the generated model packs in office/models/*.js without a browser: decode the base64 .glb and read its JSON chunk.
//
//   node tools/office-models-check.mjs            # every pack: size, node count, texture, animations
//   node tools/office-models-check.mjs --names    # also print the node names of each pack
//   node tools/office-models-check.mjs city food  # only these
//   node tools/office-models-check.mjs --sizes furniture   # bounding box of each piece: size [w h d] and min corner (glTF Y-up)
//
// Fails (exit 1) when a texture is not inside the .glb (an image with a uri), a top-level node name repeats,
// a piece is not at the origin, a person lacks a bone or has other animations than ANIMATIONS, or a file is too big.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'office', 'models');
const ANIMATIONS = ['idle', 'walk', 'sprint', 'sit', 'pick-up', 'emote-yes', 'emote-no', 'holding-right', 'holding-left',
  'holding-both', 'interact-right', 'interact-left', 'crouch', 'jump', 'drive', 'static'];
const BONES = ['root', 'leg-left', 'leg-right', 'torso', 'arm-left', 'arm-right', 'head'];
const COUNTS = { city: 30, roads: 25, cars: 11, furniture: 140, food: 78 };   // top-level nodes per pack
const LIMIT = { character: 350 * 1024, pack: 3 * 1024 * 1024 };               // base64 bytes

const args = process.argv.slice(2);
const names = args.includes('--names');
const sizes = args.includes('--sizes');
const only = args.filter(a => !a.startsWith('--'));

function readPack(file) {
  const src = fs.readFileSync(file, 'utf8');
  const m = src.match(/\(window\.SO_MODELS = window\.SO_MODELS \|\| \{\}\)\['([^']+)'\] = '([A-Za-z0-9+/=]+)';/);
  if (!m) throw new Error('not a SO_MODELS file');
  const bin = Buffer.from(m[2], 'base64');
  if (bin.readUInt32LE(0) !== 0x46546c67) throw new Error('not a .glb');
  const len = bin.readUInt32LE(12);
  if (bin.readUInt32LE(16) !== 0x4e4f534a) throw new Error('first chunk is not JSON');
  return { key: m[1], b64: m[2].length, glb: bin.length, json: JSON.parse(bin.subarray(20, 20 + len).toString('utf8')) };
}

// ---- bounding boxes from the accessors' min/max through the node transforms ----
function trs(n) {
  if (n.matrix) return n.matrix;
  const [x, y, z, w] = n.rotation || [0, 0, 0, 1], [sx, sy, sz] = n.scale || [1, 1, 1], [tx, ty, tz] = n.translation || [0, 0, 0];
  return [(1 - 2 * (y * y + z * z)) * sx, 2 * (x * y + z * w) * sx, 2 * (x * z - y * w) * sx, 0,
    2 * (x * y - z * w) * sy, (1 - 2 * (x * x + z * z)) * sy, 2 * (y * z + x * w) * sy, 0,
    2 * (x * z + y * w) * sz, 2 * (y * z - x * w) * sz, (1 - 2 * (x * x + y * y)) * sz, 0, tx, ty, tz, 1];
}
function mul(a, b) {   // column-major 4x4: a*b
  const o = new Array(16).fill(0);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) o[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k];
  return o;
}
function bounds(j, i, M = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], box = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] }, top = true) {
  const n = j.nodes[i], W = top ? M : mul(M, trs(n));
  if (n.mesh !== undefined) for (const p of j.meshes[n.mesh].primitives) {
    const a = j.accessors[p.attributes.POSITION];
    for (let c = 0; c < 8; c++) {
      const v = [c & 1 ? a.max[0] : a.min[0], c & 2 ? a.max[1] : a.min[1], c & 4 ? a.max[2] : a.min[2]];
      for (let k = 0; k < 3; k++) {
        const w = W[k] * v[0] + W[4 + k] * v[1] + W[8 + k] * v[2] + W[12 + k];
        box.min[k] = Math.min(box.min[k], w); box.max[k] = Math.max(box.max[k], w);
      }
    }
  }
  for (const c of n.children || []) bounds(j, c, W, box, false);
  return box;
}
const r2 = v => Math.round(v * 100) / 100;

let failed = 0;
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.js')).sort()
  .filter(f => !only.length || only.includes(f.slice(0, -3)) || (only.includes('characters') && f.startsWith('character-')));
for (const f of files) {
  const pack = f.slice(0, -3);
  const problems = [];
  let p;
  try { p = readPack(path.join(DIR, f)); } catch (e) { console.log(`${pack}: ${e.message}`); failed++; continue; }
  const j = p.json;
  const nodes = j.nodes || [];
  const top = (j.scenes?.[j.scene || 0]?.nodes || []).map(i => nodes[i]);
  const all = nodes.map(n => n.name);
  const images = j.images || [];
  const anims = (j.animations || []).map(a => a.name);
  const person = pack.startsWith('character-');
  if (p.key !== pack) problems.push(`key '${p.key}' is not the file name`);
  if (images.some(im => im.uri || im.bufferView === undefined)) problems.push('image not embedded (uri)');
  if (pack !== 'furniture' && !images.length) problems.push('no texture');
  if (p.b64 > LIMIT[person ? 'character' : 'pack']) problems.push(`${Math.round(p.b64 / 1024)} KB over the limit`);
  if (person) {
    for (const b of [...BONES, 'body-mesh', 'head-mesh']) if (!all.includes(b)) problems.push(`no node ${b}`);
    const want = [...ANIMATIONS].sort().join(), have = [...anims].sort().join();
    if (want !== have) problems.push(`animations ${have}`);
  } else {
    const seen = new Set(), dup = new Set();
    for (const n of all) (seen.has(n) ? dup : seen).add(n);
    if (dup.size) problems.push(`repeated node names ${[...dup].join(' ')}`);
    if (COUNTS[pack] !== undefined && top.length !== COUNTS[pack]) problems.push(`${top.length} pieces, expected ${COUNTS[pack]}`);
    for (const n of top) {
      const t = n.translation || [0, 0, 0], r = n.rotation || [0, 0, 0, 1], s = n.scale || [1, 1, 1];
      if (t.some(v => Math.abs(v) > 1e-6) || Math.abs(r[3]) < 1 - 1e-6 || s.some(v => Math.abs(v - 1) > 1e-6)) problems.push(`${n.name} is not at the origin`);
    }
  }
  const mats = (j.materials || []).map(m => m.name);
  console.log(`${pack}: js ${Math.round(p.b64 / 1024)} KB, ${person ? `${nodes.length} nodes, ${anims.length} animations` : `${top.length} pieces (${nodes.length} nodes)`}, `
    + `${images.length} embedded image(s), materials ${mats.join(' ')}${problems.length ? '\n  PROBLEMS: ' + problems.join('; ') : ''}`);
  if (names) console.log('  ' + (person ? `${all.join(' ')}\n  animations: ${anims.join(' ')}` : top.map(n => n.name + (n.children ? `{${n.children.map(c => nodes[c].name).join(' ')}}` : '')).join(' ')));
  if (sizes && !person) for (const i of j.scenes[j.scene || 0].nodes) {
    const b = bounds(j, i);
    console.log(`  ${nodes[i].name.padEnd(28)} size [${b.max.map((v, k) => r2(v - b.min[k])).join(', ')}]  min [${b.min.map(r2).join(', ')}]`);
  }
  if (problems.length) failed++;
}
console.log(failed ? `${failed} file(s) with problems` : `ok: ${files.length} file(s)`);
process.exit(failed ? 1 : 0);

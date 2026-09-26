// Check the people of Sim Office (office/models/man-*.js, woman-*.js and their rigs rig-*.js, made by
// tools/office-characters.py) without a browser: decode the base64 .glb and read it.
//
//   node tools/office-characters-check.mjs              # every person and rig
//   node tools/office-characters-check.mjs man-suit     # only these
//   node tools/office-characters-check.mjs --anims      # also list each rig's clips (length, tracks)
//
// A person fails when: it is not one skinned mesh with no animations and no images; its height (top of the mesh in the
// rest pose) is not 0.95 ± 0.02; its feet are not at y = 0 (± 0.01) or its toes do not point to +Z; its extras.rig names
// no rig file; one of its bones is missing from the rig or has another rest transform there; the file is over 400 KB.
// A rig fails when: it has a mesh, its clips are not exactly CLIPS, a track names a node it lacks, or walk_speed,
// run_speed and seat are missing from the armature's extras.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'office', 'models');
const CLIPS = ['idle', 'walk', 'sprint', 'sit', 'emote-yes', 'emote-no', 'interact-right'];
const HEIGHT = [0.93, 0.97], LIMIT = 400 * 1024, SOFT = 300 * 1024;

const args = process.argv.slice(2);
const listAnims = args.includes('--anims');
const only = args.filter(a => !a.startsWith('--'));

function read(id) {
  const src = fs.readFileSync(path.join(DIR, id + '.js'), 'utf8');
  const m = src.match(/\(window\.SO_MODELS = window\.SO_MODELS \|\| \{\}\)\['([^']+)'\] = '([A-Za-z0-9+/=]+)';/);
  if (!m) throw new Error('not a SO_MODELS file');
  const bin = Buffer.from(m[2], 'base64');
  if (bin.readUInt32LE(0) !== 0x46546c67) throw new Error('not a .glb');
  const len = bin.readUInt32LE(12);
  const json = JSON.parse(bin.subarray(20, 20 + len).toString('utf8'));
  const data = bin.subarray(20 + len + 8);
  return { key: m[1], b64: m[2].length, json, data };
}
function floats(g, ai) {        // a float accessor as an array of tuples
  const a = g.json.accessors[ai], v = g.json.bufferViews[a.bufferView];
  const n = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[a.type];
  if (a.componentType !== 5126) throw new Error('not a float accessor');
  const off = (v.byteOffset || 0) + (a.byteOffset || 0), stride = v.byteStride || n * 4, out = [];
  for (let i = 0; i < a.count; i++) {
    const t = [];
    for (let k = 0; k < n; k++) t.push(g.data.readFloatLE(off + i * stride + k * 4));
    out.push(t);
  }
  return out;
}
const near = (a, b, e) => a.length === b.length && a.every((v, i) => Math.abs(v - b[i]) < e);
const trs = (n) => [...(n.translation || [0, 0, 0]), ...(n.rotation || [0, 0, 0, 1]), ...(n.scale || [1, 1, 1])];
const r3 = (v) => Math.round(v * 1000) / 1000;

const all = fs.readdirSync(DIR).filter(f => /^(man|woman|rig)-.*\.js$/.test(f)).map(f => f.slice(0, -3)).sort();
const ids = only.length ? only : all;
const rigs = {};
let failed = 0;
for (const id of all.filter(i => i.startsWith('rig-'))) {
  try { rigs[id] = read(id); } catch (e) { /* reported below */ }
}
for (const id of ids.slice().sort((a, b) => (b.startsWith('rig-') - a.startsWith('rig-')) || a.localeCompare(b))) {
  const problems = [];
  let g;
  try { g = read(id); } catch (e) { console.log(`${id}: ${e.message}`); failed++; continue; }
  const j = g.json, nodes = j.nodes || [];
  const anims = (j.animations || []).map(a => a.name);
  if (g.key !== id) problems.push(`key '${g.key}' is not the file name`);
  if ((j.images || []).length || (j.buffers || []).some(b => b.uri)) problems.push('images or external buffers');
  if (g.b64 > LIMIT) problems.push(`${Math.round(g.b64 / 1024)} KB is over ${LIMIT / 1024} KB`);
  let line;
  if (id.startsWith('rig-')) {
    const arm = nodes.find(n => n.name === id);
    if ((j.meshes || []).length) problems.push('a rig has a mesh');
    if ([...anims].sort().join() !== [...CLIPS].sort().join()) problems.push(`clips ${anims.join(' ')}`);
    for (const a of j.animations || []) for (const c of a.channels) if (!nodes[c.target.node]) problems.push(`${a.name}: a track without its node`);
    const ex = (arm && arm.extras) || {};
    for (const k of ['walk_speed', 'run_speed', 'seat']) if (typeof ex[k] !== 'number') problems.push(`extras.${k} missing`);
    line = `${id}: js ${Math.round(g.b64 / 1024)} KB, ${nodes.length - 1} bones, clips ${anims.length}, walk_speed ${ex.walk_speed}, run_speed ${ex.run_speed}, seat ${ex.seat}`;
    if (listAnims) for (const a of j.animations || []) {
      const t = Math.max(...a.samplers.map(s => j.accessors[s.input].max[0]));
      line += `\n    ${a.name.padEnd(15)} ${t.toFixed(2)} s, ${a.channels.length} tracks`;
    }
  } else {
    if ((j.meshes || []).length !== 1 || (j.skins || []).length !== 1) problems.push(`${(j.meshes || []).length} meshes, ${(j.skins || []).length} skins`);
    if (anims.length) problems.push(`animations in a person: ${anims.join(' ')}`);
    const arm = nodes.find(n => n.name === id);
    const rigId = arm && arm.extras && arm.extras.rig;
    const rig = rigs[rigId];
    if (!arm) problems.push(`no node ${id}`);
    if (!rig) problems.push(`rig '${rigId}' not found`);
    // rest-pose mesh bounds (a skinned mesh is drawn in its bind space) and the feet
    let min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity], verts = 0, pos = [];
    for (const p of (j.meshes[0] || { primitives: [] }).primitives) {
      const v = floats(g, p.attributes.POSITION);
      verts += v.length;
      pos = pos.concat(v);
      v.forEach(q => q.forEach((x, k) => { min[k] = Math.min(min[k], x); max[k] = Math.max(max[k], x); }));
    }
    if (max[1] < HEIGHT[0] || max[1] > HEIGHT[1]) problems.push(`height ${r3(max[1])}`);
    if (Math.abs(min[1]) > 0.01) problems.push(`feet at y ${r3(min[1])}`);
    const feet = pos.filter(q => q[1] < 0.05);
    const toes = Math.max(...feet.map(q => q[2])), heels = -Math.min(...feet.map(q => q[2]));
    if (!(toes > heels)) problems.push(`toes point to -Z (feet z ${r3(-heels)}..${r3(toes)})`);
    // the bones must be the rig's bones, with the same rest transforms
    if (rig) {
      const rn = Object.fromEntries(rig.json.nodes.map(n => [n.name, n]));
      const joints = j.skins[0].joints.map(i => nodes[i]);
      const bad = joints.filter(n => !rn[n.name] || !near(trs(n), trs(rn[n.name]), 2e-3)).map(n => n.name);
      if (bad.length) problems.push(`bones unlike ${rigId}: ${bad.slice(0, 6).join(' ')}${bad.length > 6 ? ' …' : ''}`);
    }
    if (g.b64 > SOFT && g.b64 <= LIMIT) problems.push(`(note: ${Math.round(g.b64 / 1024)} KB is over ${SOFT / 1024} KB)`);
    line = `${id}: js ${Math.round(g.b64 / 1024)} KB, ${rigId}, height ${r3(max[1])}, width ${r3(max[0] - min[0])}, ${verts} vertices, `
      + `materials ${(j.materials || []).map(m => m.name).join(' ')}`;
  }
  const hard = problems.filter(p => !p.startsWith('(note'));
  console.log(line + (problems.length ? '\n  ' + (hard.length ? 'PROBLEMS: ' : '') + problems.join('; ') : ''));
  if (hard.length) failed++;
}
console.log(failed ? `${failed} file(s) with problems` : `ok: ${ids.length} file(s)`);
process.exit(failed ? 1 : 0);

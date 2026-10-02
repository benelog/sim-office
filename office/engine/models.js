/* Sim Office — model packs (office/models/<pack>.js). One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- model packs (office/models/<pack>.js → SO_MODELS[pack])
const packs = {};
const reported = new Set(), pendingMissing = [];
function b64(s) {
  const bin = atob(s), u = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
  return u.buffer;
}
function loadPack(name) {
  if (!name || name === 'box') return Promise.resolve(null);
  if (packs[name]) return packs[name].promise;
  const p = packs[name] = { status: 'loading', gltf: null, nodes: {} };
  p.promise = (async () => {
    const have = () => (window.SO_MODELS || {})[name];
    if (!have()) { try { await loadScript(`models/${name}.js`); } catch (e) { /* reported below */ } }
    if (!have()) { p.status = 'missing'; pendingMissing.push(name); return null; }
    const g = await new Promise((ok, fail) => new T.GLTFLoader().parse(b64(have()), '', ok, fail));
    g.scene.traverse(o => {
      if (o.isMesh) {
        o.material = Array.isArray(o.material) ? o.material.map(toonOf) : toonOf(o.material);
        if (o.isSkinnedMesh) o.frustumCulled = false;
      }
    });
    g.scene.children.forEach(c => { p.nodes[c.name] = c; });
    g.scene.traverse(o => { if (o.name && !p.nodes[o.name]) p.nodes[o.name] = o; });
    // a person without clips of their own names the pack that has them (glTF extras {"rig": "rig-umc"}): load it too
    g.scene.traverse(o => { if (!p.rig && o.userData && typeof o.userData.rig === 'string' && o.userData.rig !== name) p.rig = o.userData.rig; });
    if (p.rig && !g.animations.length) await loadPack(p.rig);
    // a person's mesh has smooth normals (small files, a clean ink line); it is lit flat, the look of the low-poly pack
    if (p.rig) g.scene.traverse(o => { if (o.isMesh) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => { m.flatShading = true; m.needsUpdate = true; }); });
    g.scene.traverse(o => {           // a rig tells how fast its walk and run cycles move the feet (units per second)
      const u = o.userData || {};
      if (+u.walk_speed) p.walkSpeed = +u.walk_speed;
      if (+u.run_speed) p.runSpeed = +u.run_speed;
    });
    if (p.rig && packs[p.rig]) { p.walkSpeed = p.walkSpeed || packs[p.rig].walkSpeed; p.runSpeed = p.runSpeed || packs[p.rig].runSpeed; }
    p.gltf = g;
    p.status = 'ok';
    return g;
  })().catch(e => { p.status = 'missing'; console.warn(`Sim Office: could not read model ${name}: ${e.message}`); return null; });
  return p.promise;
}
function reportMissing() {       // one warning line for every batch of missing packs (not an error: boxes stand in)
  const list = pendingMissing.splice(0).filter(n => !reported.has(n));
  list.forEach(n => reported.add(n));
  if (list.length) console.warn(`Sim Office: model files not found, using boxes: ${list.map(n => `models/${n}.js`).join(', ')}`);
}
function warnOnce(key, msg) { if (reported.has(key)) return; reported.add(key); console.warn('Sim Office: ' + msg); }
const packReady = (name) => packs[name] && packs[name].status === 'ok';
const centres = {};
function centreOf(pack, node, obj) {      // offset that puts a node's footprint centre at 0 and its lowest point on the floor
  const k = pack + ':' + node;
  if (!centres[k]) {
    obj.updateMatrixWorld(true);
    const b = new T.Box3().setFromObject(obj);
    centres[k] = b.isEmpty() ? new T.Vector3() : new T.Vector3(-(b.min.x + b.max.x) / 2, -b.min.y, -(b.min.z + b.max.z) / 2);
  }
  return centres[k];
}
// a copy of one named node of a pack, or null (then the caller builds a box)
function packNode(pack, node) {
  if (!packReady(pack)) return null;
  const src = node ? packs[pack].nodes[node] : packs[pack].gltf.scene;
  if (!src) { warnOnce(pack + ':' + node, `no node "${node}" in models/${pack}.js; using a box`); return null; }
  const o = src.clone(true);
  o.position.set(0, 0, 0);
  return o;
}

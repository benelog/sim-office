/* Sim Office — people: a Quaternius character with its clips, or a box person. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- people: a Quaternius character, or a box person
const boxGeo = new T.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
function boxPerson(model) {
  const g = new T.Group();
  const hue = (hash(model) % 360) / 360;
  const body = new T.Mesh(boxGeo, toon('#' + new T.Color().setHSL(hue, 0.45, 0.5).getHexString()));
  body.scale.set(0.28, 0.33, 0.16);          // as tall as a person model (HEAD_Y)
  body.position.y = 0.45;
  const legs = new T.Mesh(boxGeo, toon('#3b4254'));
  legs.scale.set(0.2, 0.45, 0.12);
  const head = new T.Mesh(boxGeo, toon('#e8c4a0'));
  head.scale.set(0.16, HEAD_Y - 0.78, 0.16);
  head.position.y = 0.78;
  g.add(legs, body, head);
  outline(g);
  shadows(g, true);
  return g;
}
// Animation names: the engine only ever asks for these (the names of the rigs' clips, tools/office-characters.py). A model
// whose clips are named otherwise (Quaternius' own: Idle, Walk, Run, Sitting, Wave…) is mapped by ANIM_ALIASES when the actor is made:
// an exact name first, then the same name ignoring case and punctuation, then the patterns in order. A name a
// model has no clip for plays idle instead (loops) or is skipped (one-shot gestures), see play().
const ANIMS = ['idle', 'walk', 'sprint', 'sit', 'pick-up', 'emote-yes', 'emote-no', 'interact-right', 'interact-left',
  'holding-right', 'holding-left', 'holding-both', 'crouch', 'jump', 'drive', 'static'];
const ANIM_ALIASES = {
  idle: [/^idle$/i, /idle/i, /^(stand|standing)$/i], walk: [/^walk(ing)?$/i, /walk/i], sprint: [/^(sprint|run|running)$/i, /sprint|run/i],
  sit: [/^sit(ting)?$/i, /sit/i], 'pick-up': [/pick.?up/i, /gather|interact/i], 'emote-yes': [/yes|nod|agree/i, /wave/i],
  'emote-no': [/^no$|shake|disagree|refuse/i], 'interact-right': [/interact.?r|wave|hello/i, /interact|punch.?r/i],
  'interact-left': [/interact.?l/i, /interact/i], 'holding-right': [/hold.*r(ight)?$|carry/i, /hold/i], 'holding-left': [/hold.*l(eft)?$/i],
  'holding-both': [/hold.*both|carry/i], crouch: [/crouch/i], jump: [/^jump$/i, /jump/i], drive: [/drive|driving/i], static: [/static|t.?pose/i]
};
const squash = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
function clipFor(clips, name) {
  let c = clips.find(x => x.name === name) || clips.find(x => squash(x.name) === squash(name));
  for (const re of (ANIM_ALIASES[name] || [])) { if (c) break; c = clips.find(x => re.test(x.name)); }
  return c || null;
}
// Bones by pattern (rigs name them differently): the head for a glance, the right hand (or the right arm when a rig
// has no hand bone) for something held. Empty when a model has none: then that detail is left out.
const HEAD_BONE = [/^(mixamorig\d*:?)?head$/i, /^head[\W_]*(bone|jnt|joint)?$/i, /head(?!.*(end|top|mesh))/i];
const HAND_BONE = [/^(mixamorig\d*:?)?right[\W_]*hand$/i, /^(hand|wrist|fist|palm)[\W_]*r(ight)?$/i, /(hand|wrist|fist|palm)[\W_]*r(ight)?$/i, /right[\W_]*(hand|wrist)/i];
const ARM_BONE = [/^arm[\W_]*r(ight)?$/i, /(fore|lower)[\W_]*arm[\W_]*r(ight)?$/i, /right[\W_]*(fore)?arm/i, /arm[\W_]*r(ight)?$/i];
function findBone(root, patterns) {
  const bones = [];
  root.traverse(o => { if (o.isBone) bones.push(o); });
  for (const re of patterns) { const b = bones.find(o => re.test(o.name)); if (b) return b; }
  return null;
}
// where on a bone the hand is, in the bone's own space: the middle of the skin it moves (a hand bone), or near
// the far end of it (an arm bone). Measured once per model from the skin weights.
const gripCache = {};
function gripPoint(root, bone, isHand, key) {
  if (gripCache[key]) return gripCache[key];
  const v = new T.Vector3(), best = new T.Vector3(), sum = new T.Vector3();
  let far = -1, n = 0;
  root.traverse(o => {
    if (!o.isSkinnedMesh) return;
    const bi = o.skeleton.bones.findIndex(b => b.name === bone.name);
    if (bi < 0) return;
    const pos = o.geometry.attributes.position, si = o.geometry.attributes.skinIndex, sw = o.geometry.attributes.skinWeight;
    if (!si || !sw) return;
    const set = new Set();              // the hand with its fingers
    o.skeleton.bones[bi].traverse(c => { const j = o.skeleton.bones.indexOf(c); if (j >= 0) set.add(j); });
    const m = new T.Matrix4().multiplyMatrices(o.skeleton.boneInverses[bi], o.bindMatrix);
    for (let i = 0; i < pos.count; i++) {
      let w = 0;
      for (let k = 0; k < 4; k++) if (set.has(si.getComponent(i, k))) w += sw.getComponent(i, k);
      if (w < 0.5) continue;
      v.fromBufferAttribute(pos, i).applyMatrix4(m);
      sum.add(v); n++;
      const d = v.lengthSq();
      if (d > far) { far = d; best.copy(v); }
    }
  });
  const out = !n ? new T.Vector3() : isHand ? sum.divideScalar(n) : best.multiplyScalar(0.88);
  return (gripCache[key] = out);
}
function makeActor(id, model, opts) {
  opts = opts || {};
  const holder = new T.Group();
  let root, mixer = null;
  const actions = {};
  if (packReady(model)) {
    const g = packs[model].gltf;
    root = T.SkeletonUtils.clone(g.scene);
    outline(root, 0.5);
    shadows(root, true);
    const rig = packs[model].rig, clips = g.animations.length ? g.animations : rig && packReady(rig) ? packs[rig].gltf.animations : [];
    if (clips.length) {
      mixer = new T.AnimationMixer(root);
      ANIMS.forEach(name => { const c = clipFor(clips, name); if (c) actions[name] = mixer.clipAction(c); });
      clips.forEach(c => { if (!actions[c.name]) actions[c.name] = mixer.clipAction(c); });
    }
  } else root = boxPerson(model);
  holder.add(root);
  const shadow = new T.Mesh(shadowGeo, shadowMat);
  shadow.scale.setScalar(0.28);
  shadow.position.y = 0.012;
  shadow.renderOrder = 1;
  holder.add(shadow);
  const a = { id, model, holder, root, mixer, actions, current: null, after: null, hold: false, pos: holder.position, heading: 0, want: null,
    bubbleY: BUBBLE_Y, name: opts.name || id, row: opts.row || null, place: null, sit: false, mark: null, chatIdx: -1,
    idleAnim: 'idle', headBone: findBone(root, HEAD_BONE), look: 0, lookNow: 0, headQ: null, cup: null,
    walkSpeed: packs[model] && packs[model].walkSpeed || 0, runSpeed: packs[model] && packs[model].runSpeed || 0 };
  if (mixer) mixer.addEventListener('finished', () => { const next = a.after || rest(a); a.after = null; play(a, next, { fade: 0.3 }); });
  play(a, 'idle', { fade: 0 });
  return a;
}
const rest = (a) => a.sit ? 'sit' : (a.idleAnim || 'idle');
// a cup in the right hand (holding-right pose); kept upright whatever the arm does. Left out when the model has
// no holding-right clip or no hand/arm bone, or the food pack is missing.
function holdCup(a, on) {
  if (!on) {
    if (a.cup) { a.cup.parent && a.cup.parent.remove(a.cup); a.cup = null; }
    a.idleAnim = 'idle';
    return;
  }
  if (a.cup || !a.mixer) return;
  if (!packReady('food')) { loadPack('food').then(() => { if (a.wantCup) holdCup(a, true); }); return; }
  let bone = findBone(a.root, HAND_BONE), isHand = !!bone;
  if (!bone) bone = findBone(a.root, ARM_BONE);
  const cup = bone && packNode('food', 'cup-coffee');
  if (!cup) return;
  const grip = gripPoint(a.root, bone, isHand, a.model + ':' + bone.name);
  const g = new T.Group();
  cup.traverse(o => { if (o.isMesh) o.castShadow = true; });
  const cb = new T.Box3().setFromObject(cup);
  if (!cb.isEmpty()) cup.position.y = -(cb.min.y + cb.max.y) / 2;       // the hand holds it round the middle
  g.add(cup);
  a.root.updateMatrixWorld(true);
  const s = new T.Vector3();
  bone.getWorldScale(s);
  g.scale.setScalar((PACK_SCALE.food || 0.6) * 0.5 / (s.x || 1));
  g.position.copy(grip);
  bone.add(g);
  a.cup = g;
  a.idleAnim = a.actions['holding-right'] ? 'holding-right' : 'idle';     // no holding clip: the cup in the hand at the side
  if (!a.sit && !a.walk && !gesturing(a)) play(a, a.idleAnim, { fade: 0.3 });
}
// after the mixer: turn the head by a.lookNow (radians about the world's up, whatever the rig's axes), keep a cup level
const upV = new T.Vector3(0, 1, 0), qA = new T.Quaternion(), qB = new T.Quaternion(), axisV = new T.Vector3();
function animate(a, dt) {
  const b = a.headBone;
  if (b && a.headQ) { b.quaternion.multiply(qA.copy(a.headQ).invert()); a.headQ = null; }
  if (a.mixer) a.mixer.update(dt);
  a.lookNow += (a.look - a.lookNow) * (1 - Math.exp(-dt * 3));
  if (b && Math.abs(a.lookNow) > 0.002) {
    b.getWorldQuaternion(qA);
    axisV.copy(upV).applyQuaternion(qA.invert());
    a.headQ = new T.Quaternion().setFromAxisAngle(axisV, a.lookNow);
    b.quaternion.multiply(a.headQ);
  }
  if (a.cup && a.cup.parent) {           // level: the cup's world rotation = the person's facing
    a.cup.parent.getWorldQuaternion(qA);
    a.holder.getWorldQuaternion(qB);
    a.cup.quaternion.copy(qA.invert().multiply(qB));
  }
}
// what plays when a model lacks a clip: a gesture becomes interact-right (once); anything else looping becomes idle (or sit)
const ANIM_FALLBACK = { 'interact-left': 'interact-right', 'pick-up': 'interact-right', 'holding-right': 'interact-right',
  'holding-left': 'interact-right', 'holding-both': 'interact-right', 'emote-no': 'emote-yes' };
function play(a, name, opts) {
  opts = opts || {};
  let act = a && a.actions[name];
  if (!act && a && opts.once && ANIM_FALLBACK[name]) act = a.actions[ANIM_FALLBACK[name]];
  if (!act && a && !opts.once) act = a.actions[a.sit && a.actions.sit ? 'sit' : 'idle'];
  if (!act) return null;
  if (a.current === act && !opts.once) return act;
  act.reset();
  act.setLoop(opts.once ? T.LoopOnce : T.LoopRepeat, Infinity);
  act.clampWhenFinished = !!opts.once;
  act.timeScale = opts.speed || 1;
  act.enabled = true;
  act.setEffectiveWeight(1);
  if (a.current && a.current !== act) act.crossFadeFrom(a.current, opts.fade == null ? 0.25 : opts.fade, false);
  act.play();
  a.current = act;
  a.after = opts.once ? (opts.then || null) : null;
  return act;
}
const gesturing = (a) => a.current && a.current.loop === T.LoopOnce && a.current.isRunning();
function locomotion(a, speed) {
  if (!a.mixer || gesturing(a)) return;
  if (!speed) { play(a, rest(a)); return; }
  // the clip's speed follows the ground speed: by the rig's walk_speed / run_speed (feet do not slide) when it says
  if (Math.abs(speed) > WALK + 0.1 && a.actions.sprint) { play(a, 'sprint'); if (a.current && a.runSpeed) a.current.timeScale = Math.abs(speed) / a.runSpeed; }
  else {
    play(a, 'walk');
    if (a.current) a.current.timeScale = Math.sign(speed) * (a.walkSpeed ? Math.abs(speed) / a.walkSpeed : Math.max(0.6, Math.abs(speed) / WALK) * 1.1);
  }
}

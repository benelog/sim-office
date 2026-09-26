/* The Little Prince in 3D: the engine. Each chapter is a level, levels/chNN.js, which calls LP_GAME.level({...})
   with its world, cast, props and story steps (see README.md). The engine loads the models the level names
   (models/<name>.js, base64 .glb), builds the round world, and runs the steps: walking somewhere, talking to
   someone (a scene from data/scenes.js: typed or chosen answer, judged by lib/matcher.js), or a small quest.
   index.html without a chapter (#14) shows the chapter menu.
   Runs from file:// too: three.js is a plain script (vendor/three-game.min.js) and nothing is fetched. */
(function () {
  'use strict';
  const T = window.THREE;
  const S = window.LP_STORAGE, M = window.LP_MATCHER;
  const BOOK = 'little-prince';
  const CHAPTERS = window.LP_SCENES || [];
  const READY = window.LP_GAME_READY || [];
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX',
    'XX', 'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV', 'XXVI', 'XXVII'];
  const INK = 0x2b2a33;
  const WALK = 0.9, RUN = 2.0, TURN = 2.4;

  S.use(BOOK);
  const settings = S.getSettings();
  const saveSettings = () => S.setSettings(settings);
  const hashNum = (location.hash.match(/(\d+)/) || [])[1];
  const CHAPTER = hashNum ? +hashNum : null;
  const meta = CHAPTER ? CHAPTERS.find(c => c.num === CHAPTER) : null;
  window.addEventListener('hashchange', () => location.reload());
  const gameHref = (n) => 'index.html' + (n ? '#' + n : '');
  // the book itself lives in Book Play (https://github.com/benelog/book-play)
  const bookHref = (n) => `https://book-play.benelog.net/books/${BOOK}/${n ? 'chapters/' + n : ''}`;

  // ---------------------------------------------------------------- page chrome shared by the menu and the levels
  const koBox = $('ko-on');
  koBox.checked = !!settings.koHelp;
  const applyKo = () => document.body.classList.toggle('ko-on', koBox.checked);
  koBox.addEventListener('change', () => { settings.koHelp = koBox.checked; saveSettings(); applyKo(); });
  applyKo();
  const voiceBox = $('voice-on');
  voiceBox.checked = settings.gameVoice !== false;
  voiceBox.addEventListener('change', () => { settings.gameVoice = voiceBox.checked; saveSettings(); if (!voiceBox.checked && window.speechSynthesis) speechSynthesis.cancel(); });

  window.LP_GAME = window.LP_GAME || {};
  if (!meta) { showMenu(); return; }

  function showMenu() {
    document.body.classList.add('menu-mode');
    $('back').href = bookHref();
    $('where').textContent = 'Play it in 3D';
    $('splash').hidden = true;
    const progress = S.getProgress(BOOK);
    $('chapters').innerHTML = CHAPTERS.map(c => {
      const ready = READY.includes(c.num), done = !!progress.completed[c.num];
      const inner = `<b>${ROMAN[c.num]}</b> <span class="t">${esc(c.title)}</span><span class="ko">${esc(c.ko || '')}</span>${done ? ' <i title="completed">✓</i>' : ''}`;
      return `<li class="${ready ? '' : 'soon'}${done ? ' done' : ''}">${ready ? `<a href="${gameHref(c.num)}">${inner}</a>` : `<span>${inner}</span>`}</li>`;
    }).join('');
    $('menu').hidden = false;
  }

  // ---------------------------------------------------------------- level registration
  let L = null;
  const loadScript = (src) => new Promise((ok, fail) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = ok;
    s.onerror = () => fail(new Error('missing ' + src));
    document.head.appendChild(s);
  });
  window.LP_GAME.level = (spec) => { L = spec; };

  // ---------------------------------------------------------------- renderer, camera, sky
  const canvas = $('view');
  const renderer = new T.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(50, 1, 0.05, 400);
  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w < h ? 62 : 50;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  let R = 2;
  const UP = new T.Vector3(0, 1, 0);
  const sunDir = new T.Vector3(0, 1, 0);
  let sunAngle = Math.PI / 2;
  function setSun(a) { sunAngle = a; sunDir.set(0, Math.sin(a), Math.cos(a)); }

  const SKY = { night: '#0d1438', dusk: '#47549f', glow: '#fa9466', day: '#ffdb9e', blue: '#9ec2f5' };
  const vec3 = (hex) => { const c = new T.Color().setStyle(hex, T.NoColorSpace); return new T.Vector3(c.r, c.g, c.b); };   // shader colours, display space
  const skyUniforms = { sun: { value: sunDir }, daylight: { value: 0 } };
  Object.keys(SKY).forEach(k => { skyUniforms[k] = { value: new T.Vector3() }; });
  const sky = new T.Mesh(new T.SphereGeometry(180, 48, 24), new T.ShaderMaterial({
    side: T.BackSide, depthWrite: false, uniforms: skyUniforms,
    vertexShader: 'varying vec3 vDir; void main() { vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `uniform vec3 sun, night, dusk, glow, day, blue; uniform float daylight; varying vec3 vDir;
      void main() {
        vec3 d = normalize(vDir); float s = dot(d, sun);
        float lift = daylight * smoothstep(-0.6, 0.2, s);
        vec3 c = mix(night, dusk, smoothstep(-0.55, 0.25, s));
        c = mix(c, glow, smoothstep(0.05, 0.8, s));
        c = mix(c, day, smoothstep(0.8, 1.0, s));
        c = mix(c, blue, lift * (1.0 - smoothstep(0.3, 0.9, s)) * 0.85);
        gl_FragColor = vec4(c, 1.0);
      }`
  }));
  sky.renderOrder = -2;
  scene.add(sky);

  function radialTexture(stops) {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    stops.forEach(([o, col]) => grd.addColorStop(o, col));
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    const t = new T.CanvasTexture(c);
    t.colorSpace = T.SRGBColorSpace;
    return t;
  }
  const glowTex = radialTexture([[0, 'rgba(255,240,200,1)'], [0.25, 'rgba(255,215,140,0.8)'], [1, 'rgba(255,190,110,0)']]);
  const moonTex = radialTexture([[0, 'rgba(250,248,235,1)'], [0.45, 'rgba(245,242,225,1)'], [0.52, 'rgba(220,225,255,0.25)'], [1, 'rgba(200,210,255,0)']]);
  const sunSprite = new T.Sprite(new T.SpriteMaterial({ map: glowTex, depthWrite: false }));
  sunSprite.scale.setScalar(32);
  sunSprite.renderOrder = -1;
  scene.add(sunSprite);
  const moonSprite = new T.Sprite(new T.SpriteMaterial({ map: moonTex, depthWrite: false, transparent: true }));
  moonSprite.scale.setScalar(10);
  moonSprite.renderOrder = -1;
  moonSprite.visible = false;
  scene.add(moonSprite);

  const stars = (function () {
    const n = 1100, pos = new Float32Array(n * 3), size = new Float32Array(n);
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < n; i++) {
      const z = rnd() * 2 - 1, a = rnd() * Math.PI * 2, r = Math.sqrt(1 - z * z);
      pos.set([r * Math.cos(a) * 170, z * 170, r * Math.sin(a) * 170], i * 3);
      size[i] = 1.5 + rnd() * rnd() * 5;
    }
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.BufferAttribute(pos, 3));
    g.setAttribute('size', new T.BufferAttribute(size, 1));
    const m = new T.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { sun: { value: sunDir }, dpr: { value: renderer.getPixelRatio() }, bright: { value: 1 } },
      vertexShader: `uniform vec3 sun; uniform float dpr; attribute float size; varying float vA;
        void main() { vA = smoothstep(0.35, -0.25, dot(normalize(position), sun)); gl_PointSize = size * dpr; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform float bright; varying float vA;
        void main() { float a = smoothstep(0.5, 0.05, length(gl_PointCoord - 0.5)) * vA * bright; gl_FragColor = vec4(1.0, 0.95, 0.82, a); }`
    });
    const p = new T.Points(g, m);
    p.renderOrder = -1;
    return p;
  })();
  scene.add(stars);

  const sunLight = new T.DirectionalLight(0xfff0d8, 2.4);
  scene.add(sunLight, sunLight.target);
  const hemi = new T.HemisphereLight(0x9fb0ff, 0x2a2440, 0.9);
  scene.add(hemi);

  // ---------------------------------------------------------------- toon look: three tones and an ink outline
  const gradient = (function () {
    const t = new T.DataTexture(new Uint8Array([95, 175, 255]), 3, 1, T.RedFormat);
    t.minFilter = t.magFilter = T.NearestFilter;
    t.needsUpdate = true;
    return t;
  })();
  const toon = (color, extra) => new T.MeshToonMaterial(Object.assign({ color, gradientMap: gradient }, extra || {}));
  const inkCache = {};
  function inkMaterial(w) {
    const key = w.toFixed(4);
    if (inkCache[key]) return inkCache[key];
    const m = new T.MeshBasicMaterial({ color: INK, side: T.BackSide });
    m.onBeforeCompile = (sh) => { sh.vertexShader = sh.vertexShader.replace('#include <begin_vertex>', `vec3 transformed = position + normal * ${key};`); };
    m.customProgramCacheKey = () => 'ink' + key;
    return (inkCache[key] = m);
  }
  function outline(mesh, w) {
    const mat = inkMaterial(w);
    let o;
    if (mesh.isSkinnedMesh) { o = new T.SkinnedMesh(mesh.geometry, mat); o.bind(mesh.skeleton, mesh.bindMatrix); }
    else o = new T.Mesh(mesh.geometry, mat);
    o.frustumCulled = false;
    o.userData.ink = true;
    mesh.add(o);
  }
  // Kenney's pieces come in bright colours; levels recolour them by material name (world.tint)
  let TINT = { rock: '#9a9db3', rockDark: '#7d8098', stone: '#a9abbd', dirt: '#8c8fa6', grass: '#86a567', metal: '#9a9db3', metalDark: '#7d8098' };
  function toonify(root, w) {
    const meshes = [];
    root.traverse(o => { if (o.isMesh && !o.userData.ink) meshes.push(o); });
    meshes.forEach(o => {
      const conv = (m) => {
        const base = (m.name || '').replace(/\.\d+$/, '');
        const t = toon(TINT[base] ? new T.Color(TINT[base]) : m.color.clone(), { transparent: m.transparent, opacity: m.opacity });
        t.name = base;
        return t;
      };
      o.material = Array.isArray(o.material) ? o.material.map(conv) : conv(o.material);
      o.frustumCulled = false;
      if (w) outline(o, w);
    });
  }

  // ---------------------------------------------------------------- the round world
  // Every level is a sphere: a tiny planet (radius 2) or a patch of the Earth (radius 12-20, nearly flat).
  // Positions are [x, z] in world units from the level's centre (the top of the sphere), measured along the ground.
  const tangent = (up, dir) => dir.clone().addScaledVector(up, -dir.dot(up)).normalize();
  const anyTangent = (up) => tangent(up, Math.abs(up.y) < 0.9 ? UP : new T.Vector3(1, 0, 0));
  function at(x, z) {
    if (x && x.isVector3) return x.clone().normalize();
    if (Array.isArray(x)) { z = x[1]; x = x[0]; }
    const d = Math.hypot(x, z);
    if (d < 1e-9) return UP.clone();
    return UP.clone().applyAxisAngle(new T.Vector3(z / d, 0, -x / d), d / R);
  }
  let bumps = 0;
  const BUMP_DIRS = [[0.83, 0.31, -0.46, 0.4], [-0.27, 0.72, 0.64, 1.7], [0.52, -0.61, 0.6, 2.9], [-0.7, -0.2, -0.68, 4.1]]
    .map(([x, y, z, p]) => [new T.Vector3(x, y, z).normalize(), p]);
  function height(up) {
    if (!bumps) return 0;
    let h = 0;
    BUMP_DIRS.forEach(([d, p], i) => { h += Math.sin(up.dot(d) * R * (0.35 + i * 0.12) + p); });
    return bumps * h / BUMP_DIRS.length;
  }
  const ground = (up, lift) => up.clone().multiplyScalar(R + height(up) + (lift || 0));
  function orient(obj, up, fwd, lift) {
    const f = tangent(up, fwd);
    const x = new T.Vector3().crossVectors(up, f).normalize();
    obj.quaternion.setFromRotationMatrix(new T.Matrix4().makeBasis(x, up, f));
    obj.position.copy(ground(up, lift));
  }
  const dayness = (up) => upOf(up).dot(sunDir);
  const surfaceDist = (a, b) => upOf(a).angleTo(upOf(b)) * R;
  function keepAway(up, from, min) {
    if (up.angleTo(from) * R >= min) return up;
    const axis = new T.Vector3().crossVectors(from, up);
    if (axis.lengthSq() < 1e-9) axis.copy(anyTangent(from));
    return from.clone().applyAxisAngle(axis.normalize(), min / R);
  }
  const shadowTex = radialTexture([[0, 'rgba(20,18,40,0.55)'], [0.6, 'rgba(20,18,40,0.25)'], [1, 'rgba(20,18,40,0)']]);
  function blob(size) {
    const m = new T.Mesh(new T.CircleGeometry(size, 24), new T.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }));
    m.geometry.rotateX(-Math.PI / 2);
    m.renderOrder = 1;
    scene.add(m);
    return m;
  }

  // ---------------------------------------------------------------- models
  function b64(s) {
    const bin = atob(s), u = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return u.buffer;
  }
  const gltfs = {};
  const parseModel = (name) => new Promise((ok, fail) => {
    const data = (window.LP_GAME_MODELS || {})[name];
    if (!data) { fail(new Error('model not loaded: ' + name)); return; }
    new T.GLTFLoader().parse(b64(data), '', (g) => { gltfs[name] = g; ok(g); }, fail);
  });
  // a fresh copy of a model (or of one named node of a pack), toon-shaded and outlined
  function instance(name, node, ink) {
    const g = gltfs[name];
    if (!g) throw new Error('model not in level.models: ' + name);
    let src = g.scene;
    if (node) { src = g.scene.getObjectByName(node); if (!src) throw new Error(`no node ${node} in ${name}`); }
    const o = T.SkeletonUtils.clone(src);
    o.position.set(0, 0, 0);
    o.quaternion.identity();
    toonify(o, ink == null ? 0.006 : ink);
    return o;
  }

  // ---------------------------------------------------------------- actors: the player and the cast
  // An actor stands on the ground: { id, up, fwd, holder, mixer, actions, … }. People use the Kenney animations
  // (idle, walk, sprint, interact-right/left, emote-yes/no, sit, pick-up, jump, crouch); other rigs name theirs.
  function makeActor(id, spec) {
    const g = gltfs[spec.model];
    if (!g) throw new Error('model not in level.models: ' + spec.model);
    const root = instance(spec.model, spec.node, spec.ink == null ? 0.005 : spec.ink);
    root.scale.setScalar(spec.scale || 1);
    const holder = new T.Group();
    holder.add(root);
    scene.add(holder);
    const up = at(spec.at || [0, 0]);
    const a = {
      id, spec, holder, root, up, fwd: anyTangent(up), speed: 0,
      name: spec.name || id, bubble: spec.bubble || 0.8 * (spec.scale || 1), solid: spec.solid == null ? 0.35 : spec.solid,
      mixer: null, actions: {}, current: null, after: null, lookAt: spec.face || null, walking: null,
      shadow: spec.shadow === false ? null : blob(spec.shadow || 0.2 * (spec.scale || 1)), hidden: false
    };
    if (g.animations.length) {
      a.mixer = new T.AnimationMixer(root);
      g.animations.forEach(c => { a.actions[c.name] = a.mixer.clipAction(c); });
      a.mixer.addEventListener('finished', () => { const next = a.after || a.spec.idle || 'idle'; a.after = null; play(a, next, { fade: 0.3 }); });
      play(a, spec.idle || 'idle', { fade: 0 });
    }
    return a;
  }
  function play(a, name, opts) {
    if (typeof a === 'string') a = a === 'player' ? player : cast[a];
    opts = opts || {};
    const act = a && a.actions[name];
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
    a.hold = !!opts.hold;          // a looping pose (sit, crouch) that walking must not replace until cleared
    return act;
  }
  const gesturing = (a) => a.hold || (a.current && a.current.loop === T.LoopOnce && a.current.isRunning());
  function upOf(t) {
    if (!t) return null;
    if (t.isVector3) return t;
    if (Array.isArray(t)) return at(t);
    if (typeof t === 'string') { const o = t === 'player' ? player : (cast[t] || props[t]); return o ? o.up : null; }
    if (t.up) return t.up;
    return null;
  }
  function face(a, target) { if (typeof a === 'string') a = a === 'player' ? player : cast[a]; a.lookAt = target; }
  function walkTo(a, target, speed) {
    if (typeof a === 'string') a = a === 'player' ? player : cast[a];
    return new Promise(done => { a.walking = { up: upOf(target).clone(), speed: speed || WALK * 0.8, done }; });
  }

  // ---------------------------------------------------------------- props
  const props = {};
  function addProp(id, spec) {
    const obj = instance(spec.model, spec.node, spec.ink);
    const s = spec.scale || 1;
    if (Array.isArray(s)) obj.scale.set(s[0], s[1], s[2]); else obj.scale.setScalar(s);
    const inner = new T.Group();
    inner.add(obj);
    inner.rotation.y = (spec.turn || 0) * Math.PI / 180;
    const holder = new T.Group();
    holder.add(inner);
    const up = at(spec.at || [0, 0]);
    orient(holder, up, anyTangent(up), spec.lift || 0);
    scene.add(holder);
    const p = { id, spec, holder, inner, object: obj, up, solid: spec.solid || 0 };
    if (spec.shadow) { p.shadowMesh = blob(spec.shadow); orient(p.shadowMesh, up, anyTangent(up), 0.004); }
    if (spec.hidden) holder.visible = false;
    if (id) props[id] = p;
    return p;
  }
  function scatter(list, clear) {
    let seed = (CHAPTER || 1) * 97 + 13;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const half = L.world.area || null;       // on the Earth, only within this radius of the centre
    (list || []).forEach(sp => {
      for (let i = 0; i < (sp.count || 1); i++) {
        let up, tries = 0;
        do {
          if (sp.within || half) {
            const lo = (sp.within || [0, half])[0], hi = (sp.within || [0, half])[1];
            const r = Math.sqrt(lo * lo + rnd() * (hi * hi - lo * lo)), a = rnd() * Math.PI * 2;
            up = at(r * Math.cos(a), r * Math.sin(a));
          } else { const z = rnd() * 2 - 1, a = rnd() * Math.PI * 2, r = Math.sqrt(1 - z * z); up = new T.Vector3(r * Math.cos(a), z, r * Math.sin(a)); }
        } while (tries++ < 40 && clear.some(([c, rad]) => c.angleTo(up) * R < rad));
        const o = instance(sp.model, sp.node, sp.ink);
        const s = (sp.scale || 1) * (0.75 + rnd() * 0.5);
        o.scale.set(s, s * (sp.flat || 1), s);
        o.rotation.y = rnd() * Math.PI * 2;
        const holder = new T.Group();
        holder.add(o);
        orient(holder, up, anyTangent(up), -(sp.sink || 0.01));
        scene.add(holder);
      }
    });
  }
  function light(target, h, color, intensity, range) {
    const l = new T.PointLight(color || 0xffc873, intensity == null ? 2 : intensity, range || 0, 1.6);
    l.position.copy(ground(upOf(target), h == null ? 1 : h));
    scene.add(l);
    return l;
  }
  function halo(target, h, size) {
    const s = new T.Sprite(new T.SpriteMaterial({ map: glowTex, depthWrite: false, transparent: true, opacity: 0, blending: T.AdditiveBlending }));
    s.position.copy(ground(upOf(target), h == null ? 1 : h));
    s.scale.setScalar(size || 0.8);
    scene.add(s);
    return s;
  }
  // make every material named `name` inside a prop or actor glow (on) or not
  function glow(obj, name, on, color, strength) {
    if (typeof obj === 'string') obj = obj === 'player' ? player : (cast[obj] || props[obj]);
    const root = obj.holder || obj;
    root.traverse(o => {
      if (!o.isMesh || o.userData.ink) return;
      (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => {
        if (m.name === name && m.emissive) { m.emissive.set(on ? (color || 0xffc050) : 0x000000); m.emissiveIntensity = on ? (strength || 1.4) : 0; }
      });
    });
  }

  // ---------------------------------------------------------------- bubbles, voice, goal
  const bubbles = {};
  function actorOf(who) { return typeof who === 'string' ? (who === 'player' ? player : cast[who]) : who; }
  function say(who, text, secs) {
    const a = actorOf(who);
    if (!a) return;
    let b = bubbles[a.id];
    if (!b) { b = bubbles[a.id] = document.createElement('div'); b.className = 'bubble' + (a === player ? ' me' : ''); $('bubbles').appendChild(b); }
    b.textContent = text;
    b.classList.remove('hide');
    clearTimeout(b.timer);
    b.timer = setTimeout(() => b.classList.add('hide'), (secs || Math.max(2.2, text.length * 0.07)) * 1000);
    if (a !== player) speak(text, a.spec.voice);
  }
  const hideBubbles = () => Object.values(bubbles).forEach(b => b.classList.add('hide'));
  const tmp = new T.Vector3();
  function placeBubbles() {
    Object.keys(bubbles).forEach(id => {
      const b = bubbles[id], a = id === 'player' ? player : cast[id];
      if (!a || b.classList.contains('hide')) return;
      a.holder.localToWorld(tmp.set(0, a.bubble, 0));
      tmp.project(camera);
      const vis = tmp.z < 1 && Math.abs(tmp.x) < 1.2 && Math.abs(tmp.y) < 1.2 && !a.hidden;
      b.style.display = vis ? '' : 'none';
      b.style.left = ((tmp.x + 1) / 2 * window.innerWidth) + 'px';
      b.style.top = ((1 - tmp.y) / 2 * window.innerHeight) + 'px';
    });
  }
  let voices = [];
  function pickVoices() { voices = window.speechSynthesis ? speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang)) : []; }
  if (window.speechSynthesis) { pickVoices(); if (speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', pickVoices); }
  function speak(text, v) {
    if (!voiceBox.checked || !window.speechSynthesis) return;
    const clean = String(text).replace(/[…]/g, ',').replace(/^\(.*\)$/, '');
    if (!clean.trim()) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(clean);
    v = v || {};
    const voice = (v.like && voices.find(x => new RegExp(v.like, 'i').test(x.name))) || voices.find(x => /en[-_]GB/i.test(x.lang)) || voices[0];
    if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = 'en-GB';
    u.rate = v.rate || 0.92;
    u.pitch = v.pitch || 1;
    speechSynthesis.speak(u);
  }
  const goalBox = $('goal'), meterBox = $('meter');
  function goal(en, ko, warn) {
    if (!en) { goalBox.hidden = true; return; }
    goalBox.hidden = false;
    goalBox.querySelector('.en').textContent = en;
    goalBox.querySelector('.ko').textContent = ko || '';
    goalBox.classList.toggle('warn', !!warn);
  }
  function meter(frac, label) {
    if (frac == null) { meterBox.hidden = true; return; }
    meterBox.hidden = false;
    meterBox.querySelector('.fill').style.width = Math.max(0, Math.min(100, frac * 100)) + '%';
    meterBox.querySelector('span').textContent = label || Math.round(frac * 100) + '%';
  }

  // ---------------------------------------------------------------- hotspots: things to do (the action button)
  const hotspots = {};
  function hotspot(id, spec) { if (spec) hotspots[id] = Object.assign({ radius: 0.8 }, spec); else delete hotspots[id]; }
  let action = null;          // what the action button does now
  function nearestAction() {
    if (state !== 'play') return null;
    let best = null, bestD = Infinity;
    const consider = (d, label, run) => { if (d < bestD) { bestD = d; best = { label, run }; } };
    const s = step();
    if (s && s.talk && cast[s.talk] && !cast[s.talk].hidden) {
      const c = cast[s.talk];
      const d = surfaceDist(player, c);
      if (d < (c.spec.talkRadius || 1.0)) consider(d - 0.5, s.label || 'Talk', () => openStepScene());
    }
    Object.entries(hotspots).forEach(([id, h]) => {
      const d = surfaceDist(player, h.at || id);
      if (d < h.radius && (!h.when || h.when(api))) consider(d, h.label || 'Use', () => h.action(api, id));
    });
    Object.values(cast).forEach(c => {
      if (!c.spec.chat || c.hidden || (s && s.talk === c.id)) return;
      const d = surfaceDist(player, c);
      if (d < (c.spec.talkRadius || 1.0)) consider(d + 0.2, 'Talk', () => chatter(c));
    });
    return best;
  }
  function chatter(c) {
    const lines = typeof c.spec.chat === 'function' ? c.spec.chat(api) : c.spec.chat;
    const list = Array.isArray(lines) ? lines : [lines];
    c.chatIdx = ((c.chatIdx == null ? -1 : c.chatIdx) + 1) % list.length;
    say(c, list[c.chatIdx], 3);
    if (c.spec.chatAnim) play(c, c.spec.chatAnim, { once: true });
  }

  // ---------------------------------------------------------------- input
  const keys = {};
  const stick = { x: 0, y: 0, id: null };
  const typing = (e) => e.target && /INPUT|TEXTAREA/.test(e.target.tagName);
  window.addEventListener('keydown', (e) => {
    if (typing(e)) return;
    keys[e.code] = true;
    if ((e.code === 'KeyE' || e.code === 'Enter') && action && !$('act').hidden) { e.preventDefault(); action.run(); }
    if (/Arrow|Space/.test(e.code)) e.preventDefault();
  });
  window.addEventListener('keyup', (e) => { keys[e.code] = false; });
  window.addEventListener('blur', () => { Object.keys(keys).forEach(k => { keys[k] = false; }); });
  $('act').addEventListener('click', () => { if (action) action.run(); });
  const stickEl = $('stick'), knob = stickEl.querySelector('.knob');
  function stickMove(e) {
    const r = stickEl.getBoundingClientRect();
    let x = (e.clientX - r.left - r.width / 2) / (r.width / 2), y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    const l = Math.hypot(x, y);
    if (l > 1) { x /= l; y /= l; }
    stick.x = x; stick.y = y;
    knob.style.transform = `translate(${x * 34}px, ${y * 34}px)`;
  }
  stickEl.addEventListener('pointerdown', (e) => { stick.id = e.pointerId; stickEl.setPointerCapture(e.pointerId); stickMove(e); });
  stickEl.addEventListener('pointermove', (e) => { if (e.pointerId === stick.id) stickMove(e); });
  const stickUp = (e) => { if (e.pointerId !== stick.id) return; stick.id = null; stick.x = stick.y = 0; knob.style.transform = ''; };
  stickEl.addEventListener('pointerup', stickUp);
  stickEl.addEventListener('pointercancel', stickUp);
  if (window.matchMedia && matchMedia('(pointer: coarse)').matches) document.body.classList.add('touch');
  window.addEventListener('touchstart', () => document.body.classList.add('touch'), { once: true, passive: true });
  function readInput() {
    let fwd = 0, turn = 0;
    if (keys.ArrowUp || keys.KeyW) fwd += 1;
    if (keys.ArrowDown || keys.KeyS) fwd -= 1;
    if (keys.ArrowLeft || keys.KeyA) turn += 1;
    if (keys.ArrowRight || keys.KeyD) turn -= 1;
    if (stick.id !== null) { fwd += -stick.y; turn += -stick.x * 0.9; }
    const run = keys.ShiftLeft || keys.ShiftRight || (stick.id !== null && Math.hypot(stick.x, stick.y) > 0.95);
    return { fwd: Math.max(-1, Math.min(1, fwd)), turn: Math.max(-1, Math.min(1, turn)), run };
  }

  // ---------------------------------------------------------------- movement
  const solids = () => Object.values(cast).filter(c => !c.hidden && c.solid).map(c => [c.up, c.solid])
    .concat(Object.values(props).filter(p => p.solid && p.holder.visible).map(p => [p.up, p.solid]));
  function moveActor(a, dist) {
    const p = ground(a.up).addScaledVector(a.fwd, dist);
    let up = p.normalize();
    solids().forEach(([u, r]) => { if (u !== a.up) up = keepAway(up, u, r + (a === player ? 0.05 : 0)); });
    if (L.world.area && a === player) {                         // the Earth: stay near the scene
      const d = up.angleTo(UP) * R;
      if (d > L.world.area) up = UP.clone().applyAxisAngle(new T.Vector3().crossVectors(UP, up).normalize(), L.world.area / R);
    }
    a.fwd.copy(tangent(up, a.fwd));
    a.up.copy(up);
  }
  function playerTick(dt) {
    const locked = state !== 'play' || player.frozen;
    const inp = locked ? { fwd: 0, turn: 0, run: false } : readInput();
    if (inp.fwd && player.hold) player.hold = false;               // walking gets up from a sit
    if (inp.turn) player.fwd.applyAxisAngle(player.up, inp.turn * TURN * dt);
    const speed = inp.fwd * (inp.run && inp.fwd > 0 ? RUN : WALK) * (player.spec.speed || 1);
    player.speed = speed;
    if (speed) moveActor(player, speed * dt);
    if (player.walking) actorWalk(player, dt);
    else animateLocomotion(player, speed);
    orient(player.holder, player.up, player.fwd, player.spec.lift || 0);
  }
  function animateLocomotion(a, speed) {
    if (!a.mixer || gesturing(a)) return;
    if (!speed) play(a, a.spec.idle || 'idle');
    else if (Math.abs(speed) > WALK * (a.spec.speed || 1) + 0.1 && a.actions[a.spec.run || 'sprint']) play(a, a.spec.run || 'sprint');
    else { play(a, a.spec.walk || 'walk'); if (a.current) a.current.timeScale = Math.sign(speed) * (a.spec.walkRate || 1.1); }
  }
  function actorWalk(a, dt) {
    const w = a.walking;
    const d = a.up.angleTo(w.up) * R;
    if (d < 0.06) { a.walking = null; animateLocomotion(a, 0); w.done(); return; }
    const want = tangent(a.up, w.up.clone().sub(a.up));
    a.fwd.lerp(want, 1 - Math.exp(-dt * 8)).normalize();
    a.hold = false;
    moveActor(a, Math.min(d, w.speed * dt));
    animateLocomotion(a, w.speed);
  }
  function castTick(dt) {
    Object.values(cast).forEach(c => {
      c.holder.visible = !c.hidden;
      if (c.shadow) c.shadow.visible = !c.hidden;
      if (c.walking) actorWalk(c, dt);
      else {
        const t = c.lookAt === 'player' || (c.lookAt == null && c.spec.watch !== false && surfaceDist(player, c) < 1.6) ? player.up : upOf(c.lookAt);
        if (t && t.angleTo(c.up) > 1e-4) {
          const want = tangent(c.up, t.clone().sub(c.up));
          c.fwd.lerp(want, 1 - Math.exp(-dt * 5)).normalize();
        }
      }
      orient(c.holder, c.up, c.fwd, c.spec.lift || 0);
      if (c.mixer) c.mixer.update(dt);
      if (c.shadow) orient(c.shadow, c.up, c.fwd, 0.006);
    });
    if (player.mixer) player.mixer.update(dt);
    if (player.shadow) orient(player.shadow, player.up, player.fwd, 0.006);
  }

  // ---------------------------------------------------------------- camera
  const cam = { pos: new T.Vector3(), look: new T.Vector3(), up: new T.Vector3(0, 1, 0), ready: false, talkWith: null, shot: null };
  function cameraTick(dt) {
    const base = ground(player.up);
    let want, look, up;
    const other = cam.talkWith && (cast[cam.talkWith] || null);
    const cs = L.camera || {};
    if (cam.shot) {                                            // a level's own framing
      want = cam.shot.pos; look = cam.shot.look; up = cam.shot.up || look.clone().normalize();
    } else if (state === 'talk' || (state === 'done' && cam.talkWith)) {   // frame both speakers from the side
      const a = base, b = other ? ground(other.up) : base.clone().addScaledVector(player.fwd, 1);
      const mid = a.clone().add(b).multiplyScalar(0.5);
      const u = mid.clone().normalize();
      let side = new T.Vector3().crossVectors(u, b.clone().sub(a));
      if (side.lengthSq() < 1e-8) side = new T.Vector3().crossVectors(u, player.fwd);
      side.normalize();
      if (side.dot(cam.pos.clone().sub(mid)) < 0) side.negate();
      const span = Math.max(1, a.distanceTo(b));
      want = mid.clone().addScaledVector(u, 1.0 * (cs.talkHeight || 1)).addScaledVector(side, (2.2 + span * 0.7) * (cs.talkDistance || 1));
      look = mid.clone().addScaledVector(u, -0.05);
      up = look.clone().normalize();
    } else {
      const back = cs.back || 2.7, high = cs.height || 1.5;
      want = base.clone().addScaledVector(player.up, high).addScaledVector(player.fwd, -back);
      look = base.clone().addScaledVector(player.up, 0.45).addScaledVector(player.fwd, 0.9);
      up = player.up;
    }
    const k = cam.ready ? 1 - Math.exp(-dt * 3.2) : 1;
    cam.ready = true;
    cam.pos.lerp(want, k);
    cam.look.lerp(look, k);
    cam.up.lerp(up, k).normalize();
    const cu = cam.pos.clone().normalize();
    const floor = R + height(cu) + 0.25;
    if (cam.pos.length() < floor) cam.pos.setLength(floor);
    camera.position.copy(cam.pos);
    camera.up.copy(cam.up);
    camera.lookAt(cam.look);
  }

  // ---------------------------------------------------------------- story steps
  // A step: { goal: [en, ko], talk: castId, scene: n } — go and talk; { scene: n } — the scene opens at once
  // (narration); { at: [x, z] | id, radius, goal } — walk there (then its scene, if any); { quest(g, dt) } —
  // returns true when done, or a number 0–1 for the meter; { until(g) } — any condition. Optional hooks:
  // enter(g), leave(g), opened(g), answered(g), replied(g), skip(g) (what the autoplay test does to finish a quest).
  let state = 'intro', stepIdx = -1, stepTime = 0, time = 0;
  const step = () => ((L && L.steps) || [])[stepIdx];
  function enterStep(i) {
    const prev = step();
    if (prev && prev.leave) prev.leave(api);
    stepIdx = i;
    stepTime = 0;
    meter(null);
    const s = step();
    if (!s) { finish(); return; }
    state = 'play';
    if (s.goal) goal(s.goal[0], s.goal[1]); else goal(null);
    if (s.enter) s.enter(api);
    if (s.scene != null && !s.talk && s.at == null) setTimeout(() => { if (step() === s && state === 'play') openStepScene(); }, (s.delay == null ? 0.8 : s.delay) * 1000);
  }
  function completeStep() {
    if (state === 'done') return;
    enterStep(stepIdx + 1);
  }
  function stepTick(dt) {
    stepTime += dt;
    const s = step();
    if (!s || state !== 'play') return;
    if (s.at != null && surfaceDist(player, s.at) < (s.radius || 0.8)) {
      if (s.scene != null) openStepScene(); else completeStep();
      return;
    }
    if (s.quest) {
      const r = s.quest(api, dt);
      if (typeof r === 'number') { meter(r, s.meter ? s.meter(api, r) : null); if (r >= 1) completeStep(); }
      else if (r === true) completeStep();
      return;
    }
    if (s.until && s.until(api)) completeStep();
  }

  // ---------------------------------------------------------------- dialogue (scenes.js)
  const dlg = $('dialog');
  let misses = 0, scene_ = null;
  function speakerActor(name, fallback) {
    if (!name || /^narrator$/i.test(name)) return null;
    const map = L.speakers || {};
    if (map[name]) return map[name] === 'player' ? player : cast[map[name]];
    const who = Object.values(cast).find(c => c.name === name);
    if (who) return who;
    if (player.name === name) return player;
    return fallback;
  }
  function openStepScene() {
    const s = step();
    const sc = meta.scenes[s.scene];
    if (!sc) { console.warn('no scene', s.scene); completeStep(); return; }
    state = 'talk';
    scene_ = sc;
    cam.talkWith = s.talk || s.with || null;
    misses = 0;
    dlg.hidden = false;
    dlg.classList.remove('answered');
    goalBox.hidden = true;
    meterBox.hidden = true;
    dlg.querySelector('.situation').textContent = sc.situation;
    dlg.querySelector('.situation-ko').textContent = sc.situationKo || '';
    dlg.querySelector('.who').textContent = sc.speaker + ':';
    dlg.querySelector('.say').textContent = sc.line;
    dlg.querySelector('.prompt').textContent = sc.prompt;
    dlg.querySelector('.prompt-ko').textContent = sc.promptKo || '';
    feedback('', '');
    const box = dlg.querySelector('.choices');
    box.innerHTML = '';
    shuffle([sc.model].concat(sc.distractors || [])).forEach(text => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = text;
      b.addEventListener('click', () => {
        if (dlg.classList.contains('answered')) return;
        if (text === sc.model) { b.classList.add('right'); answered(text); }
        else { b.classList.add('wrong'); b.disabled = true; feedback('miss', 'Not quite. Read the situation again.', '상황을 다시 읽어 보세요.'); }
      });
      box.appendChild(b);
    });
    dlg.querySelector('.typing input').value = '';
    dlg.querySelector('.leave').hidden = !s.talk;
    dlg.querySelector('.next').hidden = true;
    setMode(settings.answerMode === 'choose' ? 'choose' : 'type');
    const who = speakerActor(sc.speaker, cast[s.talk] || cast[s.with] || null);
    if (who && who !== player) { say(who, sc.line, 3); if (who.spec.talkAnim) play(who, who.spec.talkAnim, { once: true }); }
    else if (!who) speak(sc.line, (L.narrator || {}).voice || { pitch: 0.9, rate: 0.9 });
    if (s.opened) s.opened(api);
  }
  function setMode(mode) {
    settings.answerMode = mode;
    saveSettings();
    dlg.dataset.mode = mode;
    dlg.querySelectorAll('.mode button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
    if (mode === 'type' && !dlg.classList.contains('answered') && !document.body.classList.contains('touch')) setTimeout(() => dlg.querySelector('.typing input').focus(), 0);
  }
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function feedback(kind, en, ko) {
    const f = dlg.querySelector('.feedback');
    f.className = 'feedback ' + kind;
    f.innerHTML = en ? esc(en) + (ko ? `<span class="ko">${esc(ko)}</span>` : '') : '';
  }
  dlg.querySelector('.typing').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!scene_ || dlg.classList.contains('answered')) return;
    const input = dlg.querySelector('.typing input');
    const text = input.value.trim();
    if (!text) return;
    if (M.match(text, scene_.answers)) { answered(text); return; }
    misses++;
    if (misses >= 3) feedback('miss', `Try saying: "${scene_.model}"`, '예시 답을 따라 입력해 보세요.');
    else feedback('miss', 'Hint: ' + (scene_.hints[misses - 1] || scene_.hints[0]), (scene_.hintsKo || [])[misses - 1] || '');
    input.select();
  });
  dlg.querySelectorAll('.mode button').forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode)));
  dlg.querySelector('.leave').addEventListener('click', () => {
    dlg.hidden = true; state = 'play'; cam.talkWith = null; hideBubbles();
    const s = step(); if (s && s.goal) goal(s.goal[0], s.goal[1]);
  });
  function answered(text) {
    const s = step(), sc = scene_;
    dlg.classList.add('answered');
    dlg.querySelector('.leave').hidden = true;
    say(player, text, 3.2);
    play(player, player.spec.answerAnim || 'emote-yes', { once: true });
    feedback('ok', '✓ ' + text);
    if (s.answered) s.answered(api);
    setTimeout(() => {
      if (!sc.reply) { showNext(); return; }
      dlg.querySelector('.who').textContent = sc.reply.speaker + ':';
      dlg.querySelector('.say').textContent = sc.reply.line;
      const who = speakerActor(sc.reply.speaker, cast[s.talk] || cast[s.with] || null);
      if (who) {
        say(who, sc.reply.line, 4);
        if (who !== player) play(who, s.replyAnim || who.spec.replyAnim || 'emote-no', { once: true, speed: 0.8 });
      } else speak(sc.reply.line, (L.narrator || {}).voice || { pitch: 0.9, rate: 0.9 });
      if (s.replied) s.replied(api);
      showNext();
    }, 1400);
  }
  function showNext() {
    const next = dlg.querySelector('.next');
    next.hidden = false;
    next.focus();
  }
  dlg.querySelector('.next').addEventListener('click', () => {
    dlg.hidden = true;
    cam.talkWith = null;
    state = 'play';
    completeStep();
  });

  // ---------------------------------------------------------------- the end of a level
  function finish() {
    if (state === 'done') return;
    state = 'done';
    goal(null);
    meter(null);
    const p = S.getProgress(BOOK);
    p.completed[CHAPTER] = true;
    S.setProgress(p);
    S.addHistory({ type: 'done', book: BOOK, chapter: CHAPTER, title: meta.title, mode: 'game' });
    const d = L.done || {};
    $('done-title').textContent = `Chapter ${ROMAN[CHAPTER]} complete`;
    $('done-text').textContent = d.en || '';
    $('done-ko').textContent = d.ko || '';
    const next = READY.find(n => n > CHAPTER);
    $('next-ch').hidden = !next;
    if (next) $('next-ch').href = gameHref(next);
    setTimeout(() => { $('done').hidden = false; $('stay').focus(); }, 1200);
  }
  $('stay').addEventListener('click', () => {
    $('done').hidden = true;
    state = 'play';
    stepIdx = ((L && L.steps) || []).length;
    const f = L.free || ['Walk around as long as you like.', '마음껏 걸어 다녀 보세요.'];
    goal(f[0], f[1]);
  });

  // ---------------------------------------------------------------- the api a level sees
  const cast = {};
  let player = null;
  const api = {
    T, scene, camera, toon, instance, glowTex,
    get R() { return R; }, get time() { return time; }, get stepTime() { return stepTime; }, get state() { return state; },
    get player() { return player; }, cast, props, sunDir,
    at, ground, height, orient, tangent, dayness, surfaceDist, upOf,
    get sunAngle() { return sunAngle * 180 / Math.PI; }, setSun: (deg) => setSun(deg * Math.PI / 180),
    say, speak, goal, meter, hotspot, play, face, walkTo, addProp, light, halo, glow, blob,
    next: () => completeStep(), get step() { return stepIdx; },
    shot: (pos, look, up) => { cam.shot = pos ? { pos, look, up } : null; },
    show: (id, on) => { const c = cast[id]; if (c) c.hidden = !on; else if (props[id]) props[id].holder.visible = !!on; },
    data: {}
  };

  // ---------------------------------------------------------------- building a level
  async function build() {
    await loadScript(`levels/ch${String(CHAPTER).padStart(2, '0')}.js`);
    if (!L) throw new Error('level did not register');
    const names = Array.from(new Set(L.models || []));
    await Promise.all(names.map(n => (window.LP_GAME_MODELS || {})[n] ? null : loadScript(`models/${n}.js`)));
    await Promise.all(names.map(parseModel));

    const w = L.world = Object.assign({ radius: 2, ground: '#a3a8c0', day: 0, sun: 60 }, L.world || {});
    R = w.radius;
    bumps = w.bumps || 0;
    TINT = Object.assign(TINT, w.tint || {});
    Object.entries(Object.assign({}, SKY, w.sky || {})).forEach(([k, v]) => { if (skyUniforms[k]) skyUniforms[k].value.copy(vec3(v)); });
    stars.material.uniforms.bright.value = w.stars == null ? 1 : w.stars;
    setSun(w.sun * Math.PI / 180);
    moonSprite.visible = !!w.moon;
    if (w.moon) moonSprite.position.copy(new T.Vector3(...(Array.isArray(w.moon) ? w.moon : [0.4, 0.6, 0.7])).normalize().multiplyScalar(160));

    const geo = new T.SphereGeometry(R, Math.max(72, Math.round(R * 14)), Math.max(48, Math.round(R * 10)));
    if (bumps) {
      const pos = geo.attributes.position, v = new T.Vector3();
      for (let i = 0; i < pos.count; i++) { v.fromBufferAttribute(pos, i).normalize(); const h = R + height(v); pos.setXYZ(i, v.x * h, v.y * h, v.z * h); }
      geo.computeVertexNormals();
    }
    scene.add(new T.Mesh(geo, toon(w.ground)));
    if (R < 6) scene.add(new T.Mesh(new T.SphereGeometry(R + 0.025, 72, 48), new T.MeshBasicMaterial({ color: INK, side: T.BackSide })));
    if (w.planets) distantPlanets();

    const clear = [];
    Object.entries(L.props || {}).forEach(([id, sp]) => { const p = addProp(id, sp); clear.push([p.up, (sp.clear == null ? 0.5 : sp.clear)]); });
    const ps = Object.assign({ model: 'prince', name: 'The little prince' }, L.player || {});
    if (ps.model === 'pilot' && !(L.player || {}).name) ps.name = 'The pilot';
    player = makeActor('player', ps);
    const face0 = ps.face ? upOf(ps.face) : null;
    if (face0 && face0.angleTo(player.up) > 1e-4) player.fwd = tangent(player.up, face0.clone().sub(player.up));
    clear.push([player.up, 0.6]);
    Object.entries(L.cast || {}).forEach(([id, sp]) => {
      const c = makeActor(id, sp);
      c.hidden = !!sp.hidden;
      cast[id] = c;
      clear.push([c.up, 0.55]);
    });
    Object.values(cast).forEach(c => {
      const t = upOf(c.spec.face || 'player');
      if (t && t.angleTo(c.up) > 1e-4) c.fwd = tangent(c.up, t.clone().sub(c.up));
    });
    scatter(w.scatter, clear);
    if (L.setup) L.setup(api);
  }

  function distantPlanets() {
    [[new T.Vector3(-30, 14, -26), 3.2, '#d8a36a'], [new T.Vector3(34, -8, -20), 2.2, '#8fb0c9'], [new T.Vector3(-18, -22, 30), 4.0, '#c98f8f'],
      [new T.Vector3(22, 26, 28), 1.4, '#e3d18a']].forEach(([pos, r, col], i) => {
      const m = new T.Mesh(new T.SphereGeometry(r, 32, 20), toon(col));
      m.position.copy(pos);
      m.add(new T.Mesh(new T.SphereGeometry(r * 1.03, 32, 20), new T.MeshBasicMaterial({ color: INK, side: T.BackSide })));
      if (i === 1) {
        const ring = new T.Mesh(new T.RingGeometry(r * 1.4, r * 1.9, 48), toon('#d9c7a0', { side: T.DoubleSide }));
        ring.rotation.set(1.2, 0.3, 0);
        m.add(ring);
      }
      scene.add(m);
    });
  }

  // ---------------------------------------------------------------- frame loop
  const clock = new T.Timer();
  function frame() {
    clock.update();
    const dt = Math.min(clock.getDelta(), 0.1);
    if (state !== 'intro') time += dt;
    if (state !== 'intro' && L.world.day) setSun(sunAngle + dt * Math.PI * 2 / L.world.day);
    sunLight.position.copy(sunDir).multiplyScalar(40);
    sunLight.intensity = 2.4 * Math.max(0, Math.min(1, dayness(player.up) * 2 + 0.6));
    sunSprite.position.copy(sunDir).multiplyScalar(160);
    const lit = Math.max(0, Math.min(1, dayness(player.up) * 3 + 0.5));
    hemi.intensity = (L.world.ambient || 0.55) + lit * 0.5;
    skyUniforms.daylight.value += (Math.max(0, Math.min(1, dayness(player.up) * 4)) - skyUniforms.daylight.value) * Math.min(1, dt * 3);
    playerTick(dt);
    castTick(dt);
    if (state === 'play') stepTick(dt);
    if (L.update) L.update(api, dt);
    action = nearestAction();
    const actBtn = $('act');
    actBtn.hidden = !action;
    if (action) actBtn.firstChild.textContent = action.label + ' ';
    cameraTick(dt);
    placeBubbles();
    renderer.render(scene, camera);
  }

  // ---------------------------------------------------------------- start
  document.title = `The Little Prince · ${ROMAN[CHAPTER]}. ${meta.title} · Sim Office`;
  $('back').href = gameHref();
  $('where').textContent = `${ROMAN[CHAPTER]} · ${meta.title}`;
  $('to-book').href = bookHref(CHAPTER);
  document.querySelector('#splash .kicker').textContent = `The Little Prince · Chapter ${ROMAN[CHAPTER]}`;
  document.querySelector('#splash h1').textContent = meta.title;
  document.querySelector('#splash .summary').textContent = meta.summary;
  document.querySelector('#splash .summary-ko').textContent = meta.summaryKo || '';
  build().then(() => {
    const role = (L.player || {}).model === 'pilot' ? 'the pilot' : 'the little prince';
    document.querySelector('#splash .role').textContent = `You play ${role}.`;
    if (L.intro) {
      document.querySelector('#splash .intro').textContent = L.intro[0];
      document.querySelector('#splash .intro-ko').textContent = L.intro[1] || '';
    }
    renderer.setAnimationLoop(frame);
    const btn = $('start');
    btn.disabled = false;
    btn.textContent = '▶ Start';
    btn.focus();
    btn.addEventListener('click', () => {
      $('splash').hidden = true;
      enterStep(0);
    });
  }).catch((e) => {
    console.error(e);
    $('start').textContent = /missing levels/.test(e.message) ? 'This chapter is not built yet' : 'Could not load the 3D models';
  });

  // ---------------------------------------------------------------- for tests (headless Chrome): LP_GAME.debug
  window.LP_GAME.api = api;
  window.LP_GAME.keys = keys;
  window.LP_GAME.debug = {
    get state() { return state; }, get step() { return stepIdx; }, get steps() { return ((L && L.steps) || []).length; },
    get ready() { return !$('start').disabled; },
    start() { if (state === 'intro') $('start').click(); },
    // finish whatever the current step waits for: go to the one to talk to or the place (teleport), answer with the
    // model answer, continue, or run the step's own skip() for a quest
    async advance() {
      const wait = (ms) => new Promise(r => setTimeout(r, ms));
      if (state === 'done') return 'done';
      if (state === 'talk') {
        if (!dlg.classList.contains('answered')) { answered(scene_.model); await wait(1700); }
        dlg.querySelector('.next').click();
        await wait(200);
        return 'scene';
      }
      const s = step();
      if (!s) return 'none';
      const target = s.talk ? cast[s.talk].up : (s.at != null ? upOf(s.at) : null);
      if (target) {
        const off = anyTangent(target);
        const axis = new T.Vector3().crossVectors(target, off).normalize();
        player.up.copy(target).applyAxisAngle(axis, (s.talk ? 0.6 : 0.1) / R).normalize();
        player.fwd.copy(tangent(player.up, target.clone().sub(player.up)));
        await wait(300);
        if (s.talk && state === 'play') openStepScene();
        return s.talk ? 'talk' : 'walk';
      }
      if (s.skip) { s.skip(api); await wait(500); return 'skip'; }
      await wait(600);
      return 'wait';
    },
    async autoplay(max) {
      const log = [];
      for (let i = 0; i < (max || 80) && state !== 'done'; i++) log.push(stepIdx + ':' + await this.advance());
      return log;
    }
  };
})();

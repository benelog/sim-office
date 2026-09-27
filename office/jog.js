/* Sim Office: jogging, a mini-game. The Fairview Loop is a running trail round the town: down the west side, along
   the beach with the sea on your right, up the east side and back along the river. You run by yourself and see
   through your own eyes; what you do is keep the rhythm of your two feet: left, right, left, right, on the beat
   (← → or A D or F J; on a phone the two halves of the screen). Steps on the beat build your pace, so you run
   faster, pass the other runners and finish in a better time; the score counts how well the steps were timed.
     window.SO_JOG.trail(api)          the trail, the start line and the distance posts, added to the city zone
     window.SO_JOG.create(api, opts)   a run: { update(dt), stop(), dispose() }; opts.onEnd(result | null)
   The engine (game.js) starts a run from the door of your home ("Go for a jog") and from the title screen
   (the game on its own), calls update every frame instead of its own camera, and takes the result. The best time
   and the best score are kept in localStorage so.v1.jog. */
(function () {
  'use strict';
  const X = 20.6, ZN = -19.0, ZS = 29.9, CORNER = 3.2, WIDTH = 1.8, START = [-X, 2.5];
  const BEAT = 0.4, WINDOW = 0.17, SLOW = 2.2, FAST = 5.6, AHEAD = 1.7;
  const KEYS = { ArrowLeft: 0, KeyA: 0, KeyF: 0, ArrowRight: 1, KeyD: 1, KeyJ: 1 };
  const RECORD_KEY = 'so.v1.jog';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const fmt = (t) => `${Math.floor(t / 60)}:${(t % 60).toFixed(2).padStart(5, '0')}`;
  const ordinal = (n) => n + (['th', 'st', 'nd', 'rd'][n % 100 > 10 && n % 100 < 14 ? 0 : n % 10] || 'th');

  // ------------------------------------------------------------ the route: a closed line with rounded corners
  const route = (function () {
    const C = [[-X, ZS], [X, ZS], [X, ZN], [-X, ZN]], pts = [START.slice()];
    C.forEach((c, i) => {
      const prev = i ? C[i - 1] : START, next = i < 3 ? C[i + 1] : START;
      const unit = (a, b) => { const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1; return [(b[0] - a[0]) / l, (b[1] - a[1]) / l]; };
      const din = unit(prev, c), dout = unit(c, next);
      const A = [c[0] - din[0] * CORNER, c[1] - din[1] * CORNER], B = [c[0] + dout[0] * CORNER, c[1] + dout[1] * CORNER];
      for (let j = 0; j <= 10; j++) {
        const u = j / 10, a = (1 - u) * (1 - u), b = 2 * (1 - u) * u, w = u * u;
        pts.push([a * A[0] + b * c[0] + w * B[0], a * A[1] + b * c[1] + w * B[1]]);
      }
    });
    pts.push(START.slice());
    const cum = [0];
    for (let j = 1; j < pts.length; j++) cum.push(cum[j - 1] + Math.hypot(pts[j][0] - pts[j - 1][0], pts[j][1] - pts[j - 1][1]));
    const length = cum[cum.length - 1];
    function at(s, out) {             // the point and the direction at distance s along the loop
      s = ((s % length) + length) % length;
      let lo = 1, hi = pts.length - 1;
      while (lo < hi) { const m = (lo + hi) >> 1; if (cum[m] < s) lo = m + 1; else hi = m; }
      const a = pts[lo - 1], b = pts[lo], seg = (cum[lo] - cum[lo - 1]) || 1, u = (s - cum[lo - 1]) / seg;
      out = out || {};
      out.x = a[0] + (b[0] - a[0]) * u; out.z = a[1] + (b[1] - a[1]) * u;
      out.dx = (b[0] - a[0]) / seg; out.dz = (b[1] - a[1]) / seg;
      return out;
    }
    return { pts, cum, length, at };
  })();
  // where you are on the loop, in words
  function stretch(s) {
    const p = route.at(s);
    if (Math.abs(p.dz) > 0.7) return p.dz > 0 ? 'West side' : 'East side';
    return p.dx > 0 ? 'Along the beach' : 'Along the river';
  }

  // ------------------------------------------------------------ the trail in the city
  function canvasTexture(T, w, h, draw) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    draw(c.getContext('2d'), w, h);
    const t = new T.CanvasTexture(c);
    t.colorSpace = T.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }
  function trail(api) {
    const T = api.T, grp = new T.Group(), own = [];
    grp.name = 'jog-trail';
    const keep = (o) => { own.push(o); return o; };
    // the ribbon: u across the trail, v along it (one tile every 2 units)
    const pos = [], uv = [], idx = [], p = {};
    const n = Math.ceil(route.length / 0.5);
    for (let i = 0; i <= n; i++) {
      route.at(Math.min(route.length - 1e-4, i / n * route.length), p);
      const nx = -p.dz, nz = p.dx, v = i / n * route.length / 2;
      pos.push(p.x - nx * WIDTH / 2, 0, p.z - nz * WIDTH / 2, p.x + nx * WIDTH / 2, 0, p.z + nz * WIDTH / 2);
      uv.push(0, v, 1, v);
      if (i) { const a = (i - 1) * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
    }
    const geo = keep(new T.BufferGeometry());
    geo.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
    geo.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    const tex = keep(canvasTexture(T, 128, 128, (g, w, h) => {
      g.fillStyle = '#b4563f'; g.fillRect(0, 0, w, h);
      for (let i = 0; i < 900; i++) { g.fillStyle = Math.random() < 0.5 ? 'rgba(255,220,200,0.10)' : 'rgba(60,20,10,0.12)'; g.fillRect(Math.random() * w, Math.random() * h, 2, 2); }
      g.fillStyle = '#f3ece0'; g.fillRect(4, 0, 5, h); g.fillRect(w - 9, 0, 5, h);
      g.fillStyle = 'rgba(243,236,224,0.85)'; g.fillRect(w / 2 - 2, 0, 4, h * 0.5);
    }));
    tex.wrapS = T.ClampToEdgeWrapping; tex.wrapT = T.RepeatWrapping;
    const mat = keep(api.litMaterial({ map: tex, side: T.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
    const ribbon = new T.Mesh(geo, mat);
    ribbon.position.y = 0.03;
    ribbon.receiveShadow = true;
    grp.add(ribbon);
    // the start and finish: a chequered line, two posts and a banner over the trail
    const s0 = route.at(0.01), turn = Math.atan2(s0.dx, s0.dz);
    const gate = new T.Group();
    gate.position.set(s0.x, 0, s0.z);
    gate.rotation.y = turn;
    const chq = keep(canvasTexture(T, 128, 32, (g, w, h) => { for (let i = 0; i < 8; i++) for (let j = 0; j < 2; j++) { g.fillStyle = (i + j) % 2 ? '#1d2433' : '#ffffff'; g.fillRect(i * 16, j * 16, 16, 16); } }));
    const line = new T.Mesh(keep(new T.PlaneGeometry(WIDTH, 0.4).rotateX(-Math.PI / 2)), keep(new T.MeshBasicMaterial({ map: chq, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 })));
    line.position.y = 0.035;
    gate.add(line);
    const postGeo = keep(new T.BoxGeometry(0.1, 2.3, 0.1)), postMat = keep(api.litMaterial({ color: new T.Color('#2f7d7a') }));
    [-1, 1].forEach(k => { const m = new T.Mesh(postGeo, postMat); m.position.set(k * (WIDTH / 2 + 0.12), 1.15, 0); m.castShadow = true; gate.add(m); });
    const banner = keep(canvasTexture(T, 512, 96, (g, w, h) => {
      g.fillStyle = '#2f7d7a'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#ffffff'; g.font = 'bold 44px Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText('FAIRVIEW LOOP', w / 2, 34);
      g.font = '600 24px Arial, sans-serif'; g.fillStyle = '#d8f3ee'; g.fillText('START  ·  FINISH', w / 2, 74);
    }));
    const flag = new T.Mesh(keep(new T.BoxGeometry(WIDTH + 0.34, 0.42, 0.05)), [postMat, postMat, postMat, postMat,
      keep(new T.MeshBasicMaterial({ map: banner, toneMapped: false })), keep(new T.MeshBasicMaterial({ map: banner, toneMapped: false }))]);
    flag.position.set(0, 2.1, 0);
    flag.castShadow = true;
    gate.add(flag);
    grp.add(gate);
    // a post every quarter of the way
    [[0.25, '1/4'], [0.5, '1/2'], [0.75, '3/4']].forEach(([f, text]) => {
      const q = route.at(route.length * f), nx = -q.dz, nz = q.dx;
      const sign = keep(canvasTexture(T, 128, 96, (g, w, h) => {
        g.fillStyle = '#f7f3e8'; g.fillRect(0, 0, w, h); g.strokeStyle = '#2f7d7a'; g.lineWidth = 8; g.strokeRect(4, 4, w - 8, h - 8);
        g.fillStyle = '#1d2433'; g.font = 'bold 50px Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, w / 2, h / 2 + 3);
      }));
      const post = new T.Group();
      const pole = new T.Mesh(keep(new T.BoxGeometry(0.06, 1.0, 0.06)), postMat);
      pole.position.y = 0.5;
      const face = new T.MeshBasicMaterial({ map: sign, toneMapped: false });
      keep(face);
      const board = new T.Mesh(keep(new T.BoxGeometry(0.5, 0.36, 0.04)), [postMat, postMat, postMat, postMat, face, face]);
      board.position.y = 1.1;
      post.add(pole, board);
      post.position.set(q.x - nx * (WIDTH / 2 + 0.3), 0, q.z - nz * (WIDTH / 2 + 0.3));      // on the left of the trail, facing the runner
      post.rotation.y = Math.atan2(q.dx, q.dz) + Math.PI;
      grp.add(post);
    });
    api.group.add(grp);
    return { group: grp, dispose() { if (grp.parent) grp.parent.remove(grp); own.forEach(o => o.dispose && o.dispose()); } };
  }

  // ------------------------------------------------------------ records
  function records() { try { return JSON.parse(localStorage.getItem(RECORD_KEY) || 'null') || {}; } catch (e) { return {}; } }
  function keepRecord(r) {
    const rec = records(), out = { time: false, score: false };
    rec.runs = (rec.runs || 0) + 1;
    if (!rec.time || r.time < rec.time) { rec.time = r.time; rec.timeBy = r.name; out.time = true; }
    if (!rec.score || r.score > rec.score) { rec.score = r.score; rec.scoreBy = r.name; out.score = true; }
    try { localStorage.setItem(RECORD_KEY, JSON.stringify(rec)); } catch (e) { /* private mode */ }
    return out;
  }

  // ------------------------------------------------------------ sound: a soft tick on the beat, a step when you land one
  function sounds() {
    let ctx = null;
    try { const A = window.AudioContext || window.webkitAudioContext; if (A) ctx = new A(); } catch (e) { ctx = null; }
    function blip(freq, dur, vol, type) {
      if (!ctx || ctx.state !== 'running') return;
      try {
        const o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
        o.type = type || 'sine';
        o.frequency.setValueAtTime(freq, t);
        o.frequency.exponentialRampToValueAtTime(Math.max(30, freq * 0.5), t + dur);
        g.gain.setValueAtTime(vol, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); g.connect(ctx.destination);
        o.start(t); o.stop(t + dur + 0.02);
      } catch (e) { /* no sound */ }
    }
    return {
      resume() { if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {}); },
      tick(foot) { blip(foot ? 990 : 880, 0.05, 0.035, 'triangle'); },
      step(foot, good) { blip(foot ? 150 : 130, 0.11, good ? 0.3 : 0.16, 'sine'); },
      miss() { blip(90, 0.12, 0.08, 'sawtooth'); },
      count(last) { blip(last ? 880 : 440, 0.18, 0.18, 'square'); },
      close() { if (ctx) ctx.close().catch(() => {}); }
    };
  }

  // ------------------------------------------------------------ the sea: waves you hear near the beach
  // Filtered noise that swells and falls back like surf (two layers, each with a slow swell of its own), made with
  // Web Audio, no sound files. sea.near(z) sets how loud by how far south you are (the beach is at z 31); the engine
  // calls it while you walk in town, a run while you jog. Silent until the page has had a click or a key.
  const sea = (function () {
    let ctx = null, master = null, level = 0, failed = false;
    function start() {
      if (ctx || failed) return;
      try {
        const A = window.AudioContext || window.webkitAudioContext;
        if (!A) { failed = true; return; }
        ctx = new A();
        const len = ctx.sampleRate * 3, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
        let last = 0;
        for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + 0.04 * w) / 1.04; d[i] = last * 6 + w * 0.15; }      // brown noise with a little hiss
        master = ctx.createGain();
        master.gain.value = 0;
        master.connect(ctx.destination);
        [[480, 'lowpass', 0.11, 0.55, 0.4], [1500, 'bandpass', 0.071, 0.22, 0.18]].forEach(([freq, type, rate, base, depth], i) => {
          const src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain(), lfo = ctx.createOscillator(), lg = ctx.createGain();
          src.buffer = buf; src.loop = true; src.playbackRate.value = 1 - i * 0.13;
          f.type = type; f.frequency.value = freq; f.Q.value = 0.6;
          g.gain.value = base;
          lfo.frequency.value = rate; lg.gain.value = depth;
          lfo.connect(lg); lg.connect(g.gain);
          src.connect(f); f.connect(g); g.connect(master);
          src.start(0, i * 1.1); lfo.start();
        });
      } catch (e) { failed = true; ctx = null; }
    }
    function set(v) {
      v = clamp(v, 0, 1);
      if (v > 0.01 && !ctx) start();
      if (!ctx || Math.abs(v - level) < 0.01) return;
      level = v;
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      try { master.gain.setTargetAtTime(v * 0.5, ctx.currentTime, 0.6); } catch (e) { /* closed */ }
    }
    return { set, near(z) { set((z - 9) / 20); }, get level() { return level; } };
  })();

  // ------------------------------------------------------------ a run
  function create(api, opts) {
    opts = opts || {};
    const T = api.T, cam = api.camera, root = new T.Group(), sfx = sounds();
    api.group.add(root);
    let dead = false, phase = 'ready', clock = -3.6, runT = 0, s = 0, v = 0, pace = 0.15, score = 0, combo = 0, best = 0, place = 1;
    let beatNo = 0, counted = 4, bob = 0, lastFoot = -1, said = 0, sway = 0;
    const tally = { perfect: 0, good: 0, ok: 0, miss: 0 };
    const beats = [];                  // { t, foot, state: null | 'perfect' | 'good' | 'ok' | 'miss' }
    const me = { x: 0, z: 0, dx: 0, dz: 1 }, tmp = {};
    const name = opts.name || 'You';
    const fovBefore = cam.fov;

    // ----- the screen
    const el = document.createElement('div');
    el.id = 'jog';
    el.innerHTML = `
      <div class="jog-top">
        <div class="cell"><span>Time</span><b class="time">0:00.00</b></div>
        <div class="cell"><span>Place</span><b class="place">1st</b></div>
        <div class="cell"><span>Speed</span><b class="speed">0.0 mph</b></div>
        <div class="cell"><span>Score</span><b class="score">0</b></div>
      </div>
      <div class="jog-way"><div class="bar"><i></i></div><span class="where"></span></div>
      <div class="jog-judge"></div>
      <div class="jog-count"></div>
      <div class="jog-pace"><span>Pace</span><div class="bar"><i></i></div><b class="combo"></b></div>
      <canvas class="jog-lane" width="360" height="200"></canvas>
      <div class="jog-pads"><button type="button" class="pad l" aria-label="Left foot">← Left<small>A · F</small></button><button type="button" class="pad r" aria-label="Right foot">Right →<small>D · J</small></button></div>
      <button type="button" class="jog-stop">Stop</button>
      <p class="jog-help">Step on the beat: <b>left, right, left, right</b>. Good timing builds your pace.<span class="ko"> 박자에 맞춰 왼발, 오른발을 번갈아 누르세요. 박자가 맞을수록 빨라집니다.</span></p>
      <div class="jog-result" hidden><div class="card"><p class="kicker"></p><h2></h2><div class="card-body"></div>
        <div class="buttons"><button type="button" class="again">Run again</button><button type="button" class="done ghost">Done</button></div></div></div>`;
    document.body.appendChild(el);
    document.body.classList.add('jogging');
    const $ = (q) => el.querySelector(q);
    const lane = $('.jog-lane'), g2 = lane.getContext('2d');
    const flash = [0, 0];
    let judgeT = 0;
    function judge(text, kind) {
      const j = $('.jog-judge');
      j.textContent = text;
      j.className = 'jog-judge show ' + kind;
      judgeT = 0.45;
    }

    // ----- the other runners
    const rivals = [];
    // looks nobody in the town wears (office/models/<look>.js, loaded when the run starts)
    const pick = ['woman-adventurer', 'man-hoodie-2', 'woman-punk', 'man-adventurer'].filter(m => m !== opts.model).slice(0, 3);
    [[3.05, -0.6, 'Morning!'], [3.75, -0.15, 'Nice pace!'], [4.45, 0.3, 'Looking good!']].forEach(([speed, side, hello], i) => {
      const model = pick[i];
      if (!model) return;
      const r = { a: null, s: 2.6 + i * 0.9, v: 0, speed, side, hello, wob: Math.random() * 6, passed: false };
      rivals.push(r);
      api.loadPack(model).then(() => {
        if (dead || !api.packReady(model)) return;
        r.a = api.actor(model, { id: 'jogger' + i, name: 'Runner' });
        root.add(r.a.holder);
        poseRival(r);
      });
    });
    function poseRival(r) {
      if (!r.a) return;
      route.at(r.s, tmp);
      r.a.pos.set(tmp.x - tmp.dz * r.side, 0, tmp.z + tmp.dx * r.side);
      r.a.heading = Math.atan2(tmp.dx, tmp.dz);
      r.a.holder.rotation.y = r.a.heading;
    }

    // ----- input
    function press(foot) {
      if (dead || phase !== 'run') return;
      sfx.resume();
      flash[foot] = 0.18;
      const t = runT;
      let hit = null, bd = WINDOW;
      beats.forEach(b => { const d = Math.abs(b.t - t); if (!b.state && d <= bd) { bd = d; hit = b; } });
      if (!hit) { combo = 0; pace = clamp(pace - 0.03, 0, 1); judge(t < (beats[0] ? beats[0].t : 0) ? 'Too early' : 'Off beat', 'miss'); sfx.miss(); return; }
      if (hit.foot !== foot) { hit.state = 'miss'; tally.miss++; combo = 0; pace = clamp(pace - 0.07, 0, 1); judge('Wrong foot', 'miss'); sfx.miss(); return; }
      const kind = bd <= 0.055 ? 'perfect' : bd <= 0.11 ? 'good' : 'ok';
      hit.state = kind;
      tally[kind]++;
      combo++;
      best = Math.max(best, combo);
      pace = clamp(pace + { perfect: 0.05, good: 0.03, ok: 0.012 }[kind], 0, 1);
      score += Math.round({ perfect: 100, good: 60, ok: 25 }[kind] * (1 + Math.min(combo, 40) / 20));
      judge({ perfect: 'Perfect!', good: 'Good', ok: 'OK' }[kind] + (combo >= 5 ? `  ×${combo}` : ''), kind);
      sfx.step(foot, kind !== 'ok');
      lastFoot = foot;
    }
    const onKey = (e) => {
      if (dead) return;
      if (e.code === 'Escape') { e.preventDefault(); stop(); return; }
      if (KEYS[e.code] == null || e.repeat) return;
      e.preventDefault();
      press(KEYS[e.code]);
    };
    window.addEventListener('keydown', onKey, true);
    $('.pad.l').addEventListener('pointerdown', (e) => { e.preventDefault(); press(0); });
    $('.pad.r').addEventListener('pointerdown', (e) => { e.preventDefault(); press(1); });
    $('.jog-stop').addEventListener('click', () => stop());
    $('.again').addEventListener('click', () => end(true));
    $('.done').addEventListener('click', () => end(false));

    // ----- the lanes: the steps come down to the line, left foot on the left, right foot on the right
    function drawLane() {
      const w = lane.width, h = lane.height, lineY = h - 46, cx = [w * 0.3, w * 0.7];
      g2.clearRect(0, 0, w, h);
      for (let f = 0; f < 2; f++) {
        const grd = g2.createLinearGradient(0, 0, 0, h);
        grd.addColorStop(0, 'rgba(22,35,59,0)'); grd.addColorStop(1, 'rgba(22,35,59,0.55)');
        g2.fillStyle = grd;
        g2.fillRect(cx[f] - 56, 0, 112, h);
        g2.fillStyle = flash[f] > 0 ? 'rgba(242,182,50,0.95)' : 'rgba(255,255,255,0.9)';
        g2.fillRect(cx[f] - 56, lineY - 2, 112, 4);
        g2.beginPath(); g2.ellipse(cx[f], lineY, 30, 17, 0, 0, Math.PI * 2);
        g2.strokeStyle = flash[f] > 0 ? '#f2b632' : 'rgba(255,255,255,0.75)'; g2.lineWidth = 3; g2.stroke();
      }
      beats.forEach(b => {
        const d = b.t - runT;
        if (d > AHEAD || d < -0.3) return;
        const y = lineY - d / AHEAD * (lineY + 20), x = cx[b.foot];
        const col = b.state === 'miss' ? 'rgba(194,74,61,0.5)' : b.state ? 'rgba(111,208,140,0.35)' : b.foot ? '#ffd9a0' : '#a8e6dd';
        g2.save();
        g2.translate(x, y);
        g2.rotate(b.foot ? 0.18 : -0.18);
        g2.fillStyle = col;
        g2.beginPath(); g2.ellipse(0, -3, 13, 19, 0, 0, Math.PI * 2); g2.fill();          // the sole
        g2.beginPath(); g2.ellipse(0, 19, 9, 8, 0, 0, Math.PI * 2); g2.fill();            // the heel
        g2.fillStyle = 'rgba(22,35,59,0.85)'; g2.font = 'bold 15px Arial, sans-serif'; g2.textAlign = 'center'; g2.textBaseline = 'middle';
        if (!b.state) g2.fillText(b.foot ? 'R' : 'L', 0, -2);
        g2.restore();
      });
    }

    // ----- the end
    let result = null;
    function finish() {
      phase = 'done';
      const steps = tally.perfect + tally.good + tally.ok + tally.miss;
      result = { time: +runT.toFixed(2), score, combo: best, place, runners: rivals.length + 1, steps, accuracy: steps ? Math.round((tally.perfect + tally.good + tally.ok) / steps * 100) : 0,
        perfect: tally.perfect, good: tally.good, ok: tally.ok, miss: tally.miss, name };
      const before = records(), news = keepRecord(result), rec = records();
      result.bestTime = news.time; result.bestScore = news.score;
      $('.jog-result .kicker').textContent = news.time ? 'New best time!' : place === 1 ? 'You won the race' : 'Fairview Loop';
      $('.jog-result h2').textContent = `${fmt(result.time)} · ${ordinal(place)} of ${result.runners}`;
      $('.jog-result .card-body').innerHTML = `<div class="sum"><div><b>${score.toLocaleString('en-US')}</b>score</div><div><b>${result.accuracy}%</b>on the beat</div><div><b>×${best}</b>best streak</div></div>
        <p>Perfect ${tally.perfect} · Good ${tally.good} · OK ${tally.ok} · Missed ${tally.miss}</p>
        <p>Best time: <b>${fmt(rec.time)}</b>${news.time && before.time ? ` (was ${fmt(before.time)})` : ''} · Best score: <b>${(rec.score || 0).toLocaleString('en-US')}</b></p>
        <p class="ko">기록 ${fmt(result.time)}, ${result.runners}명 중 ${place}등. 박자 정확도 ${result.accuracy}%.</p>`;
      $('.jog-result').hidden = false;
      el.classList.add('over');
      if (api.speak && opts.voice) api.speak(place === 1 ? 'Yes! New personal best!' : 'Whew. Good run.', opts.voice);
      setTimeout(() => { const b = $('.again'); if (b && !dead) b.focus(); }, 60);
    }
    function stop() {                  // given up before the finish: no record
      if (dead) return;
      if (phase === 'done') { end(false); return; }
      result = null;
      end(false);
    }
    function end(again) {
      if (dead) return;
      const r = result;
      dispose();
      if (opts.onEnd) opts.onEnd(r, again);
    }

    // ----- every frame
    function update(dt) {
      if (dead) return;
      clock += dt;
      flash[0] -= dt; flash[1] -= dt;
      if ((judgeT -= dt) <= 0) $('.jog-judge').classList.remove('show');
      if (phase === 'ready') {
        const left = Math.ceil(-clock);
        if (left !== counted && left <= 3) { counted = left; $('.jog-count').textContent = left > 0 ? String(left) : 'Go!'; sfx.count(left <= 0); }
        if (clock >= 0) { phase = 'run'; runT = 0; setTimeout(() => { $('.jog-count').textContent = ''; }, 600); el.classList.add('running'); }
      }
      if (phase === 'run') {
        runT += dt;
        // the beats to come; the first one a little after the start
        while (beatNo * BEAT + 1.2 < runT + AHEAD + 0.5) { beats.push({ t: beatNo * BEAT + 1.2, foot: beatNo % 2, state: null, ticked: false }); beatNo++; }
        beats.forEach(b => {
          if (!b.ticked && runT >= b.t) { b.ticked = true; sfx.tick(b.foot); bob = 1; sway = b.foot ? 1 : -1; }
          if (!b.state && runT > b.t + WINDOW) { b.state = 'miss'; tally.miss++; combo = 0; pace = clamp(pace - 0.07, 0, 1); judge('Missed', 'miss'); }
        });
        while (beats.length && beats[0].t < runT - 1) beats.shift();
        pace = clamp(pace - dt * 0.012, 0, 1);
        const want = SLOW + (FAST - SLOW) * pace;
        v += (want - v) * Math.min(1, dt * 1.8);
        s += v * dt;
        rivals.forEach(r => {
          r.wob += dt;
          const target = r.speed * (1 + 0.06 * Math.sin(r.wob * 0.7 + r.speed));
          r.v += (target - r.v) * Math.min(1, dt * 1.2);
          r.s += r.v * dt;
          if (!r.passed && s > r.s + 0.4 && runT > 3) {           // you go past: the runner's etiquette
            r.passed = true;
            if (api.speak && opts.voice && performance.now() - said > 2500) { said = performance.now(); api.speak('On your left!', opts.voice); }
            judge('On your left!', 'good');
          } else if (r.passed && r.s > s + 0.4) r.passed = false;
        });
        place = 1 + rivals.filter(r => r.s > s).length;
        if (s >= route.length) { s = route.length; finish(); }
      }
      rivals.forEach(r => {
        if (!r.a) return;
        poseRival(r);
        api.locomotion(r.a, phase === 'run' || (phase === 'done' && r.s < route.length + 6) ? Math.max(1.4, r.v) : 0);
        if (phase === 'done') { r.v *= 1 - Math.min(1, dt * 0.8); r.s += r.v * dt; }
        api.animate(r.a, dt);
      });
      // your eyes: on the right half of the trail, the head rising and falling with the steps
      route.at(s, me);
      const px = me.x - me.dz * 0.42, pz = me.z + me.dx * 0.42;
      bob = Math.max(0, bob - dt / BEAT);
      const lift = Math.sin(bob * Math.PI) * 0.035 * clamp(v / 3, 0.3, 1.4);
      cam.position.set(px - me.dz * sway * 0.02 * bob, 0.84 + lift, pz + me.dx * sway * 0.02 * bob);
      route.at(s + 3.2, tmp);
      cam.up.set(sway * 0.012 * bob, 1, 0);
      cam.lookAt(tmp.x - tmp.dz * 0.42, 0.74, tmp.z + tmp.dx * 0.42);
      const fov = 66 + 10 * clamp((v - SLOW) / (FAST - SLOW), 0, 1);
      if (Math.abs(cam.fov - fov) > 0.05) { cam.fov += (fov - cam.fov) * Math.min(1, dt * 3); cam.updateProjectionMatrix(); }
      if (api.place) api.place(px, pz, Math.atan2(me.dx, me.dz));
      sea.near(pz);
      // the numbers
      $('.time').textContent = fmt(runT);
      $('.place').textContent = ordinal(place);
      $('.speed').textContent = (v * 1.6).toFixed(1) + ' mph';
      $('.score').textContent = score.toLocaleString('en-US');
      $('.jog-way .bar i').style.width = (s / route.length * 100).toFixed(1) + '%';
      $('.jog-way .where').textContent = phase === 'ready' ? 'Fairview Loop' : stretch(s);
      $('.jog-pace .bar i').style.width = (pace * 100).toFixed(0) + '%';
      $('.jog-pace .combo').textContent = combo >= 2 ? '×' + combo : '';
      drawLane();
    }
    function dispose() {
      if (dead) return;
      dead = true;
      window.removeEventListener('keydown', onKey, true);
      el.remove();
      document.body.classList.remove('jogging');
      if (root.parent) root.parent.remove(root);
      cam.up.set(0, 1, 0);
      cam.fov = fovBefore;
      cam.updateProjectionMatrix();
      sfx.close();
      sea.set(0);
    }
    sfx.resume();
    return { update, stop, dispose, get state() { return { phase, s: +s.toFixed(2), v: +v.toFixed(2), pace: +pace.toFixed(2), score, combo, place, time: +runT.toFixed(2), length: +route.length.toFixed(1), next: beats.find(b => !b.state) || null, result }; },
      press, get now() { return runT; } };
  }

  window.SO_JOG = { route, trail, create, records, sea };
})();

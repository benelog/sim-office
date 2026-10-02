/* Sim Office: the season in the scenery, by the game's real date (game day 1 is config start_date; the calendar runs
   from October into February). Made by the engine (game.js) after it builds a zone and thrown away when you leave:
   window.SO_SEASON.create(api) → { update(dt), dispose(), info() }; SO_SEASON.at(date, cfg) tells the stage of a date.
   Fairview is on the coast of Northern California, so the autumn comes late and the winter is green and wet:
   - Autumn colours (config season_fall 'from,full'): the broadleaf trees of the town (nature tree-common-*) turn red,
     orange, gold or rust, each tree its own colour and a few days apart. About a third of them (and the twisted tree)
     are live oaks and stay green all year, like the pines. The leaves are recoloured in the shader (a tint by the
     brightness of the texture), so a season costs no textures and no draw calls.
   - Bare trees (season_bare 'first,last'): from the first date the turned trees drop their leaves one by one, each on
     its own day, until the last date; the leaves come back in spring (season_spring). The woods beyond town (pack
     'wild', instanced) thin out the same way and turn with the town.
   - Fallen leaves (season_litter 'start,peak,raking,raked'): leaves on the lawns and sidewalks under the turning trees
     and in the park (not in the middle of a road), more and more through November, at their most until the raking
     starts in December, then a few left, gone brown. One instanced mesh; fewer than half as many on Low graphics.
   - Holiday decorations (season_lights 'up,last day'): from the day after Thanksgiving to the first weekend of January,
     strings of coloured lights along the shop awnings, the house fronts, the bus shelter and the park fence, the
     trees on the office plaza wrapped in lights, the big pine in Seaside Park as the town tree with a star, wreaths
     on the doors and the street lamps; at the office a decorated tree in the lobby and a string along the reception
     desk. The bulbs are points (a few draw calls); after dark (indoors: always) they glow and twinkle.
   Dates are 'MM-DD' in the season that runs from August to July, so '01-03' is after '11-27'. Without a date (the
   title screen, the tour) nothing changes; SO.debug.season('2026-12-16') shows a date anywhere. */
(function () {
  'use strict';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ramp = (x, a, b) => clamp((x - a) / Math.max(1, b - a), 0, 1);
  const hash = (x, z, k) => { const s = Math.sin(x * 12.9898 + z * 78.233 + (k || 0) * 37.719) * 43758.5453; return s - Math.floor(s); };
  const DEFAULTS = { season_fall: '10-20,11-15', season_bare: '12-01,01-10', season_litter: '11-01,11-25,12-15,01-20', season_spring: '03-01', season_lights: '11-27,01-03' };
  // the season's year starts on August 1: the day of a date in it, and of an 'MM-DD' in the same season
  function seasonStart(date) { const y = date.getUTCFullYear(); return Date.UTC(date.getUTCMonth() >= 7 ? y : y - 1, 7, 1); }
  function sday(date) { return Math.round((date.getTime() - seasonStart(date)) / 864e5); }
  function mdDay(md, date) {
    const m = /^(\d{2})-(\d{2})$/.exec(String(md || '').trim());
    if (!m) return null;
    const y0 = new Date(seasonStart(date)).getUTCFullYear(), mm = +m[1];
    return Math.round((Date.UTC(mm >= 8 ? y0 : y0 + 1, mm - 1, +m[2]) - seasonStart(date)) / 864e5);
  }
  function dates(cfg, key, date) {
    const own = String((cfg && cfg[key]) || DEFAULTS[key]).split(',').map(s => mdDay(s, date));
    return own.some(v => v == null) ? DEFAULTS[key].split(',').map(s => mdDay(s, date)) : own;
  }
  // The stage of the season on a date: fall 0..1 (how far the colours have come), bare 0..1 (the share of the turned
  // trees without leaves), litter 0..1 (leaves on the ground), lights (the holiday decorations are up).
  function at(date, cfg) {
    if (!date) return { day: null, fall: 0, bare: 0, litter: 0, lights: false, spring: 0, F: [0, 0], B: [0, 0] };
    const s = sday(date), F = dates(cfg, 'season_fall', date), B = dates(cfg, 'season_bare', date), L = dates(cfg, 'season_litter', date);
    const spring = dates(cfg, 'season_spring', date)[0], D = dates(cfg, 'season_lights', date);
    const green = s >= spring;
    const litter = green || s < L[0] ? 0 : s < L[1] ? ramp(s, L[0], L[1]) : s < L[2] ? 1 : 1 - 0.85 * ramp(s, L[2], L[3]);
    return { day: s, iso: date.toISOString().slice(0, 10), fall: green ? 0 : ramp(s, F[0], F[1]), bare: green ? 0 : ramp(s, B[0], B[1]), litter,
      lights: s >= D[0] && s <= D[1], spring: green ? 1 : 0, F, B };
  }

  // the trees that turn: Stylized Nature broadleaf trees in town, Ultimate Nature broadleaf trees in the woods
  const TURNS = /^tree-(common|twisted)/, WILD_TURNS = /^wild-tree-(common|birch|willow)/;
  const TINTS = ['#b5321c', '#d4651b', '#dca62a', '#94471c'];          // red, orange, gold, rust
  const LITTER = ['#b8461f', '#cf7a26', '#ddb03a', '#8d4a22', '#a8622b', '#c2953b'];
  const BULBS = ['#ff4a3d', '#ffd23f', '#3fd36b', '#4aa8ff', '#ff8ad8', '#fff2c8'];
  // Holiday decorations by zone, in the zone's own coordinates. strings: [x0, y0, z0, x1, y1, z1, hooks, sag] (a string
  // hung on hooks, sagging between them); wrap: [x, z] of a tree (the nearest prop) wrapped in lights, star: with a star
  // on top; wreaths: [x, y, z, facing° (0 = +z, 90 = +x)]; lampWreaths: a wreath on every street lamp; tree: a decorated
  // tree standing at [x, z] with its height; gifts under it.
  const DECOR = {
    city: {
      strings: [
        [3.62, 1.0, 3.02, 5.98, 1.0, 3.02, 4, 0.05],               // the diner's awning
        [9.82, 1.0, 3.31, 12.18, 1.0, 3.31, 4, 0.05],              // the market's awning
        [-7.08, 1.17, -2.24, -4.12, 1.17, -2.24, 4, 0.05],         // the bus shelter
        [-13.38, 0.6, 4.62, -8.42, 0.6, 4.62, 6, 0.06],            // the park fence, both sides of the gate
        [-6.58, 0.6, 4.62, -1.62, 0.6, 4.62, 6, 0.06],
        [-8.38, 1.42, 4.6, -6.62, 1.42, 4.6, 2, 0.12],             // over the park gate
        [-13.38, 0.6, -4.72, -12.42, 0.6, -4.72, 2, 0.05],         // the front-garden fences on Maple Street
        [-7.38, 0.6, -4.72, -6.42, 0.6, -4.72, 2, 0.05],
        [-13.1, 1.32, -6.14, -7.5, 1.32, -6.14, 6, 0.08],          // the apartment building, over the ground floor
        [-11.25, 1.55, -13.36, -8.75, 1.55, -13.36, 4, 0.06],      // Derek's house, along the eaves of the porch
        [10.4, 1.3, 9.4, 10.4, 1.3, 13.0, 5, 0.07]                 // Cedar Street Lofts (Priya)
      ],
      wrap: [[5.4, -4.6], [12.6, -4.4]],
      star: [[-2.8, 10.4]],
      wreaths: [[4.8, 0.92, 3.46, 180], [11.0, 0.92, 3.76, 180], [-9.88, 0.95, -6.16, 0], [-10.0, 1.0, -13.36, 180], [10.39, 1.0, 11.2, 270],
        [7.25, 1.1, -5.93, 0], [9.15, 1.1, -5.93, 0]],
      lampWreaths: true
    },
    office: {
      strings: [[-7.2, 0.36, 2.83, -5.8, 0.36, 2.83, 3, 0.05]],   // along the reception desk
      tree: { at: [-5.45, 4.35], h: 1.45 },
      wreaths: [[-8.96, 0.95, 2.5, 90]]                             // on the lobby's west wall
    }
  };

  let bulbTex = null, haloTex = null, starTex = null;
  function canvasTex(T, size, draw) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    draw(c.getContext('2d'), size);
    const t = new T.CanvasTexture(c);
    t.colorSpace = T.SRGBColorSpace;
    return t;
  }
  function textures(T) {
    if (bulbTex) return;
    const radial = (stops) => (g, n) => { const r = n / 2, grd = g.createRadialGradient(r, r, 0, r, r, r); stops.forEach(s => grd.addColorStop(s[0], s[1])); g.fillStyle = grd; g.fillRect(0, 0, n, n); };
    bulbTex = canvasTex(T, 32, radial([[0, 'rgba(255,255,255,1)'], [0.55, 'rgba(255,255,255,1)'], [0.8, 'rgba(255,255,255,0.5)'], [1, 'rgba(255,255,255,0)']]));
    haloTex = canvasTex(T, 64, radial([[0, 'rgba(255,255,255,0.9)'], [0.2, 'rgba(255,255,255,0.45)'], [0.55, 'rgba(255,255,255,0.1)'], [1, 'rgba(255,255,255,0)']]));
    starTex = canvasTex(T, 64, (g, n) => {
      radial([[0, 'rgba(255,236,170,0.9)'], [0.35, 'rgba(255,214,120,0.35)'], [1, 'rgba(255,200,100,0)']])(g, n);
      g.fillStyle = '#ffd34d'; g.strokeStyle = '#b8860b'; g.lineWidth = 2;
      g.beginPath();
      for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? n * 0.16 : n * 0.38; g.lineTo(n / 2 + Math.cos(a) * r, n / 2 + Math.sin(a) * r); }
      g.closePath(); g.fill(); g.stroke();
    });
  }

  // Autumn leaves: a copy of a leaves material whose colour is pulled toward a tint by uFall, keeping the texture's
  // light and dark (one shader for every copy; the flat-shaded Quaternius colour packs keep their define).
  const fallMats = new Map();
  function fallMat(src, tint) {
    const key = src.uuid + tint;
    if (fallMats.has(key)) return fallMats.get(key);
    const m = src.clone();
    m.defines = Object.assign({}, src.defines);
    const U = { uFallTint: { value: new window.THREE.Color(tint) }, uFall: { value: 0 } };
    const base = src.customProgramCacheKey ? src.customProgramCacheKey() : '';
    m.customProgramCacheKey = () => base + '|fall';
    m.onBeforeCompile = (sh) => {
      sh.uniforms.uFallTint = U.uFallTint; sh.uniforms.uFall = U.uFall;
      sh.fragmentShader = 'uniform vec3 uFallTint; uniform float uFall;\n' + sh.fragmentShader.replace('#include <map_fragment>', `#include <map_fragment>
        float fallL = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
        diffuseColor.rgb = mix(diffuseColor.rgb, uFallTint * clamp(fallL / 0.1, 0.3, 1.7), uFall);`);
    };
    m.userData.fall = U;
    m.name = (src.name || 'leaves') + '-fall';
    fallMats.set(key, m);
    return m;
  }
  const noRay = () => {};
  const isLeaves = (m) => !!m && /^(leaves|Green|DarkGreen)/.test(m.name || '');

  function create(api) {
    const T = api.T, zone = api.zone, Z = api.spec, high = api.gfx === 'high';
    const date = api.date, S = at(date, api.cfg);
    const root = new T.Group();
    root.name = 'season';
    api.group.add(root);
    const own = [], undo = [], twinkle = [], glows = [];
    const keep = (o) => { own.push(o); return o; };
    let dead = false, wildDone = false, t = 0, stats = { trees: 0, turned: 0, bareTrees: 0, leaves: 0, bulbs: 0, wreaths: 0 };
    textures(T);

    // ------------------------------------------------------------ trees: colour and bare branches
    (api.propList || []).forEach(r => {
      if (!r.spec || r.spec.pack !== 'nature' || !TURNS.test(r.spec.node || '')) return;
      const x = r.spec.at[0], z = r.spec.at[1], h = hash(x, z, 1);
      stats.trees++;
      if (h < 0.3 || /twisted/.test(r.spec.node)) return;            // a live oak: green all year
      const k = Math.floor(hash(x, z, 2) * TINTS.length), fall = S.fall > 0 ? ramp(S.day, S.F[0] + k * 4, S.F[1] + k * 4) : 0;
      const drop = S.B[0] + hash(x, z, 3) * (S.B[1] - S.B[0]);
      const bare = !S.spring && S.day != null && S.bare > 0 && S.day >= drop;
      r.holder.traverse(o => {
        if (!o.isMesh || o.userData.ink) return;
        const orig = o.userData.seasonOrig || o.material;
        if (!isLeaves(orig)) return;
        o.userData.seasonOrig = orig;
        undo.push(() => { o.material = orig; o.visible = true; });
        o.visible = !bare;
        o.material = fall > 0 ? fallMat(orig, TINTS[k]) : orig;
        if (fall > 0) o.material.userData.fall.uFall.value = fall;
      });
      if (fall > 0) stats.turned++;
      if (bare) stats.bareTrees++;
    });
    // the woods beyond town (built once and kept by the zone kit, maybe still loading): their broadleaf trees turn
    // with the town and lose their leaves tree by tree (the instance count of the leaves)
    function wild() {
      const g = api.group.getObjectByName('dress-wild');
      if (!g || !g.children.length) return false;
      g.children.forEach(im => {
        if (!im.isInstancedMesh || !WILD_TURNS.test(im.name)) return;
        const orig = im.userData.seasonOrig || im.material;
        if (!isLeaves(orig)) return;
        im.userData.seasonOrig = orig;
        if (im.userData.seasonCount == null) {        // once: shuffle the trees (by their number, so the parts of one kind of tree go alike), so the bare ones are all over the woods
          const n0 = im.count, list = [], m = new T.Matrix4();
          let seed = n0 * 7 + 3;
          for (let i = 0; i < n0; i++) { im.getMatrixAt(i, m); list.push(m.clone()); }
          for (let i = n0 - 1; i > 0; i--) { seed = (seed * 16807) % 2147483647; const j = seed % (i + 1), x = list[i]; list[i] = list[j]; list[j] = x; }
          list.forEach((mm, i) => im.setMatrixAt(i, mm));
          im.instanceMatrix.needsUpdate = true;
          im.userData.seasonCount = n0;
        }
        const n = im.userData.seasonCount, k = S.bare > 0.3 ? 3 : Array.from(im.name).reduce((a, ch) => a + ch.charCodeAt(0), 0) % TINTS.length;
        im.material = S.fall > 0 ? fallMat(orig, TINTS[k]) : orig;
        if (S.fall > 0) im.material.userData.fall.uFall.value = S.fall * 0.85;
        im.count = Math.max(0, Math.round(n * (1 - 0.8 * S.bare)));
        undo.push(() => { im.material = orig; im.count = n; });
      });
      return true;
    }
    if (!Z.indoor) wildDone = wild();

    // ------------------------------------------------------------ leaves on the ground
    if (!Z.indoor && S.litter > 0) {
      const tiles = [], solids = api.solids || [];
      (api.propList || []).forEach(r => {
        if (!r.spec || r.spec.pack !== 'roads' || !/^(road-|tile-)/.test(r.spec.node || '')) return;
        const b = new T.Box3().setFromObject(r.holder);
        if (!b.isEmpty() && b.max.y < 0.2) tiles.push({ b, road: /^road-/.test(r.spec.node), cx: (b.min.x + b.max.x) / 2, cz: (b.min.z + b.max.z) / 2 });
      });
      const ground = (x, z) => {             // the height to lie at, or null where a leaf does not go (the middle of a road, in a building)
        if (solids.some(s => x > s.x0 && x < s.x1 && z > s.z0 && z < s.z1 && (s.x1 - s.x0) * (s.z1 - s.z0) > 1)) return null;
        for (const tl of tiles) {
          if (x < tl.b.min.x || x > tl.b.max.x || z < tl.b.min.z || z > tl.b.max.z) continue;
          if (tl.road && Math.max(Math.abs(x - tl.cx), Math.abs(z - tl.cz)) < 1.12) return null;
          return tl.b.max.y + 0.008;
        }
        return 0.012;
      };
      const spots = [];
      let seed = 1;
      const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
      const put = (x, z) => { const y = ground(x, z); if (y != null) spots.push([x, y, z, rnd() * 6.283, LITTER[Math.floor(rnd() * LITTER.length)]]); };
      (api.propList || []).forEach(r => {
        if (!r.spec || r.spec.pack !== 'nature' || !TURNS.test(r.spec.node || '') || /twisted/.test(r.spec.node) || hash(r.spec.at[0], r.spec.at[1], 1) < 0.3) return;
        for (let i = 0; i < 46; i++) {
          const a = rnd() * 6.283, d = 0.3 + 1.5 * Math.sqrt(rnd()), drift = rnd() < 0.3 ? rnd() * 1.6 : 0;   // the wind takes some east
          put(r.spec.at[0] + Math.cos(a) * d + drift, r.spec.at[1] + Math.sin(a) * d + drift * 0.3);
        }
      });
      if (zone === 'city') for (let i = 0; i < 140; i++) put(-13.3 + rnd() * 11.6, 4.9 + rnd() * 8.5);      // the park lawn
      for (let i = spots.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); const s = spots[i]; spots[i] = spots[j]; spots[j] = s; }
      const n = Math.round(spots.length * S.litter * (high ? 1 : 0.45));
      if (n > 0) {
        const g = keep(new T.BufferGeometry());
        g.setAttribute('position', new T.Float32BufferAttribute([0.06, 0, 0, 0, 0, 0.035, -0.06, 0, 0, 0, 0, -0.035], 3));
        g.setAttribute('normal', new T.Float32BufferAttribute([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0], 3));
        g.setIndex([0, 3, 1, 1, 3, 2]);
        const mat = keep(api.litMaterial({ color: new T.Color('#ffffff'), side: T.DoubleSide }));
        const im = new T.InstancedMesh(g, mat, n);
        const m4 = new T.Matrix4(), q = new T.Quaternion(), e = new T.Euler(), p = new T.Vector3(), sc = new T.Vector3(), c = new T.Color();
        for (let i = 0; i < n; i++) {
          const s = spots[i];
          q.setFromEuler(e.set((hash(i, 1) - 0.5) * 0.5, s[3], (hash(i, 2) - 0.5) * 0.5));
          sc.setScalar(0.8 + hash(i, 3) * 0.6);
          im.setMatrixAt(i, m4.compose(p.set(s[0], s[1], s[2]), q, sc));
          c.set(s[4]);
          if (S.bare > 0.5) c.lerp(new T.Color('#7a5a3a'), 0.35);            // old leaves go brown
          im.setColorAt(i, c);
        }
        im.receiveShadow = true;
        im.name = 'season-leaves';
        root.add(im);
        stats.leaves = n;
      }
    }

    // ------------------------------------------------------------ holiday decorations
    const D = S.lights && DECOR[zone];
    if (D) {
      const bulbs = [];            // [x, y, z, colour, parent]
      const along = (a, b, sag, parent) => {
        const len = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]), n = Math.max(2, Math.round(len / 0.11));
        for (let i = 0; i <= n; i++) {
          const u = i / n, dip = sag * 4 * u * (1 - u);
          bulbs.push([a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u - dip, a[2] + (b[2] - a[2]) * u, BULBS[bulbs.length % BULBS.length], parent || null]);
        }
      };
      (D.strings || []).forEach(s => {
        const hooks = Math.max(1, s[6] || 1);
        for (let h = 0; h < hooks; h++) {
          const u0 = h / hooks, u1 = (h + 1) / hooks, P = (u) => [s[0] + (s[3] - s[0]) * u, s[1] + (s[4] - s[1]) * u, s[2] + (s[5] - s[2]) * u];
          along(P(u0), P(u1), s[7] || 0);
        }
      });
      // a tree wrapped in lights (in the tree's own coordinates, so the lights sway with it)
      const nearest = (x, z) => {
        let best = null, bd = 1.2;
        (api.propList || []).forEach(r => { if (!r.spec || !/^tree/.test(r.spec.node || '')) return; const d = Math.hypot(r.spec.at[0] - x, r.spec.at[1] - z); if (d < bd) { bd = d; best = r; } });
        return best;
      };
      const wrap = (holder, star) => {
        holder.updateMatrixWorld(true);
        const b = new T.Box3().setFromObject(holder), inv = new T.Matrix4().copy(holder.matrixWorld).invert();
        const cx = (b.min.x + b.max.x) / 2, cz = (b.min.z + b.max.z) / 2, H = b.max.y, R = Math.min(b.max.x - b.min.x, b.max.z - b.min.z) / 2;
        const y0 = H * (star ? 0.2 : 0.3), y1 = H * 0.93, turns = star ? 6 : 4.5, steps = Math.round(turns * 2 * Math.PI * R * 0.6 / 0.12) + 20;
        const g = new T.Vector3();
        for (let i = 0; i <= steps; i++) {
          const u = i / steps, r = R * (1.02 - 0.92 * u) * (star ? 0.92 : 1.2), a = u * turns * 2 * Math.PI;
          g.set(cx + Math.cos(a) * r, y0 + (y1 - y0) * u, cz + Math.sin(a) * r).applyMatrix4(inv);
          bulbs.push([g.x, g.y, g.z, BULBS[i % BULBS.length], holder]);
        }
        if (star) {
          const sp = starSprite(0.55 / Math.max(0.01, holder.scale.x));
          sp.position.copy(g.set(cx, H + 0.12, cz).applyMatrix4(inv));
          holder.add(sp);
          undo.push(() => holder.remove(sp));
        }
      };
      (D.wrap || []).forEach(p => { const r = nearest(p[0], p[1]); if (r) wrap(r.holder, false); });
      (D.star || []).forEach(p => { const r = nearest(p[0], p[1]); if (r) wrap(r.holder, true); });
      // a decorated tree indoors: a small pine with lights, baubles and presents under it
      if (D.tree) {
        const [tx, tz] = D.tree.at, th = D.tree.h, solid = { x0: tx - 0.3, z0: tz - 0.3, x1: tx + 0.3, z1: tz + 0.3 };
        if (!(api.solids || []).some(s => s.x0 === solid.x0 && s.z0 === solid.z0)) api.solid(solid.x0, solid.z0, solid.x1, solid.z1);
        const holder = new T.Group();
        holder.position.set(tx, 0, tz);
        root.add(holder);
        api.loadPack('nature').then(() => {
          if (dead) return;
          const pine = api.packNode('nature', 'tree-pine-3');
          if (pine) { pine.scale.setScalar(th / 7.16); holder.add(api.shadows(pine, true)); }
          else holder.add(new T.Mesh(keep(new T.ConeGeometry(0.42, th, 8).translate(0, th / 2 + 0.1, 0)), api.toon('#2f6b3a')));
          const baubles = keep(new T.IcosahedronGeometry(0.035, 0)), cols = ['#d23b3b', '#e8c33a', '#3b6fd2', '#f0f0f0', '#c0389a'];
          const bm = new T.InstancedMesh(baubles, api.litMaterial({ color: new T.Color('#ffffff') }), 28), m4 = new T.Matrix4(), c = new T.Color();
          own.push(bm.material);
          for (let i = 0; i < 28; i++) {
            const u = 0.12 + 0.75 * hash(i, 5), a = i * 2.4, r = 0.43 * (1 - u) * 0.95 + 0.02;
            bm.setMatrixAt(i, m4.makeTranslation(Math.cos(a) * r, th * (0.18 + 0.8 * u), Math.sin(a) * r));
            bm.setColorAt(i, c.set(cols[i % cols.length]));
          }
          holder.add(bm);
          const gifts = new T.InstancedMesh(keep(new T.BoxGeometry(1, 1, 1).translate(0, 0.5, 0)), api.litMaterial({ color: new T.Color('#ffffff') }), 4);
          own.push(gifts.material);
          [[0.3, 0.05, 0.16, 0.14, 0.12, '#c8322f'], [-0.2, 0.28, 0.12, 0.1, 0.12, '#2f7fc8'], [0.08, -0.33, 0.18, 0.09, 0.13, '#e2b53a'], [-0.32, -0.1, 0.1, 0.12, 0.1, '#3d9a54']].forEach((gq, i) => {
            gifts.setMatrixAt(i, m4.makeScale(gq[2], gq[3], gq[4]).setPosition(gq[0], 0, gq[1]));
            gifts.setColorAt(i, c.set(gq[5]));
          });
          holder.add(gifts);
          holder.updateMatrixWorld(true);
          const lights = [];
          for (let i = 0; i <= 60; i++) { const u = i / 60, a = u * 5 * 2 * Math.PI, r = 0.44 * (1 - u) + 0.03; lights.push([Math.cos(a) * r, th * (0.16 + 0.8 * u), Math.sin(a) * r, BULBS[i % BULBS.length], holder]); }
          addBulbs(lights);
          const sp = starSprite(0.32);
          sp.position.set(0, th + 0.12, 0);
          holder.add(sp);
        });
      }
      // wreaths: a ring of green with a red bow, one instanced mesh for all
      const wreaths = (D.wreaths || []).slice();
      if (D.lampWreaths) (api.propList || []).forEach(r => {
        if (!r.spec || r.spec.pack !== 'roads' || !/^light-(square|curved)/.test(r.spec.node || '')) return;
        const b = new T.Box3().setFromObject(r.holder), x = r.spec.at[0], z = r.spec.at[1];
        const dx = (b.min.x + b.max.x) / 2 - x, dz = (b.min.z + b.max.z) / 2 - z, l = Math.hypot(dx, dz) || 1;
        wreaths.push([x + dx / l * 0.045, 1.0, z + dz / l * 0.045, Math.atan2(dx, dz) * 180 / Math.PI, 0.75]);
      });
      if (wreaths.length) {
        const im = new T.InstancedMesh(keep(wreathGeometry(T)), keep(api.litMaterial({ color: new T.Color('#ffffff'), vertexColors: true })), wreaths.length);
        const m4 = new T.Matrix4(), q = new T.Quaternion(), up = new T.Vector3(0, 1, 0), p = new T.Vector3(), sc = new T.Vector3();
        wreaths.forEach((w, i) => im.setMatrixAt(i, m4.compose(p.set(w[0], w[1], w[2]), q.setFromAxisAngle(up, w[3] * Math.PI / 180), sc.setScalar(w[4] || 1))));
        im.castShadow = true;
        im.name = 'season-wreaths';
        root.add(im);
        stats.wreaths = wreaths.length;
      }
      addBulbs(bulbs);
    }
    // a star on top of a tree: a sprite that always faces you (the camera's look-through rays pass it by)
    function starSprite(size) {
      const sp = new T.Sprite(keep(new T.SpriteMaterial({ map: starTex, transparent: true, depthWrite: false, toneMapped: false })));
      sp.scale.setScalar(size);
      sp.raycast = noRay;
      glows.push(sp);
      return sp;
    }
    // The bulbs: points with a round sprite, in two sets that twinkle against each other, and a halo round each one
    // that comes up after dark (one set of points for every parent: the street, or a tree that sways)
    function addBulbs(list) {
      const byParent = new Map();
      list.forEach(b => { const k = b[4] || root; if (!byParent.has(k)) byParent.set(k, []); byParent.get(k).push(b); });
      byParent.forEach((items, parent) => {
        const scale = parent === root ? 1 : (parent.scale.x || 1);
        [0, 1].forEach(set => {
          const mine = items.filter((b, i) => i % 2 === set);
          if (!mine.length) return;
          const pos = [], col = [], c = new T.Color();
          mine.forEach(b => { pos.push(b[0], b[1], b[2]); c.set(b[3]); col.push(c.r, c.g, c.b); });
          const g = keep(new T.BufferGeometry());
          g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
          g.setAttribute('color', new T.Float32BufferAttribute(col, 3));
          const bulb = new T.Points(g, keep(new T.PointsMaterial({ size: 0.075 / scale, map: bulbTex, vertexColors: true, transparent: true, alphaTest: 0.3, toneMapped: false })));
          const halo = new T.Points(g, keep(new T.PointsMaterial({ size: 0.3 / scale, map: haloTex, vertexColors: true, transparent: true, depthWrite: false, blending: T.AdditiveBlending, toneMapped: false, opacity: 0 })));
          halo.renderOrder = 2;
          bulb.name = halo.name = 'season-bulbs';
          bulb.raycast = halo.raycast = noRay;
          parent.add(bulb, halo);
          if (parent !== root) undo.push(() => parent.remove(bulb, halo));
          twinkle.push({ bulb, halo, ph: set * Math.PI + hash(pos[0], pos[2], 6) * 2 });
          stats.bulbs += mine.length;
        });
      });
    }

    function update(dt) {
      if (dead) return;
      t += dt;
      if (!wildDone && !Z.indoor && (t % 1) < dt) wildDone = wild();
      if (!twinkle.length && !glows.length) return;
      // how much the lights glow: indoors always; outdoors from dusk, a little under heavy cloud by day
      const night = Z.indoor ? 0.75 : clamp(Math.max(api.night || 0, api.dark ? 0.8 : 0, (api.weather && api.weather.dark) || 0), 0, 1);
      twinkle.forEach(tw => {
        const w = 0.75 + 0.25 * Math.sin(t * 1.7 + tw.ph);
        tw.halo.material.opacity = night * w * (high ? 1 : 0.8);
        tw.halo.visible = night > 0.05;
        tw.bulb.material.color.setScalar(0.75 + 0.25 * (night * w + (1 - night)));
      });
      glows.forEach(sp => { sp.material.opacity = 0.85 + 0.15 * night; });
    }
    function dispose() {
      dead = true;
      undo.forEach(f => f());
      if (root.parent) root.parent.remove(root);
      own.forEach(o => o.dispose && o.dispose());
    }
    function info() { return Object.assign({ zone, date: S.iso || null, fall: +S.fall.toFixed(2), bare: +S.bare.toFixed(2), litter: +S.litter.toFixed(2), lights: S.lights }, stats); }
    return { update, dispose, info };
  }

  // a wreath: a ring of green (darker and lighter tufts) with a red bow at the bottom, in vertex colours, facing +z
  function wreathGeometry(T) {
    const parts = [], col = new T.Color();
    const ring = new T.TorusGeometry(0.12, 0.045, 5, 14).toNonIndexed();
    const bow = new T.BoxGeometry(0.1, 0.05, 0.03).translate(0, -0.13, 0.03).toNonIndexed();
    const tails = new T.BoxGeometry(0.03, 0.08, 0.02).translate(0, -0.18, 0.03).toNonIndexed();
    [[ring, null], [bow, '#c4252a'], [tails, '#a81f24']].forEach(([g, c]) => {
      const n = g.attributes.position.count, cs = [];
      for (let i = 0; i < n; i++) { col.set(c || (Math.floor(i / 6) % 3 ? '#2f6b34' : '#4a8a3c')); cs.push(col.r, col.g, col.b); }
      g.setAttribute('color', new T.Float32BufferAttribute(cs, 3));
      parts.push(g);
    });
    const out = new T.BufferGeometry(), pos = [], nor = [], cs = [];
    parts.forEach(g => { pos.push(...g.attributes.position.array); nor.push(...g.attributes.normal.array); cs.push(...g.attributes.color.array); g.dispose(); });
    out.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
    out.setAttribute('normal', new T.Float32BufferAttribute(nor, 3));
    out.setAttribute('color', new T.Float32BufferAttribute(cs, 3));
    return out;
  }

  window.SO_SEASON = { create, at, DECOR };
})();

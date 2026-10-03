/* Sim Office: the background life of a zone, made by the engine (office/engine) after it builds a zone and thrown away
   when you leave: window.SO_LIFE.create(api) → { update(dt), dispose(), info() }.
   - Trees (city tree-*) sway a little: their prop groups are turned by a small angle, no vertex shader.
   - Traffic lights (roads traffic-light): the lamp faces are found in the model by their colour in the colormap and
     covered with lamps of their own (emissive when lit). They change every 15 s: 12 s green and 3 s amber for one
     axis, then the other (a 30 s cycle); a light controls the traffic its lamps face.
   - Cars (cars pack, Quaternius, scale 0.5), each a Yuka Vehicle (vendor/yuka.min.js, MIT: steering behaviours) following
     the lane: the road tiles (tiles with node road-*) make a grid of cells; a car keeps to the right
     lane through each cell, picks a way at every junction, turns round at a dead end, rolls its wheels, slows
     and stops for people, cars and red lights in front, and pushes you out of its way (it never runs you over).
     Lanes blocked by a parked car (a solid on the lane) are never entered. Headlights and tail lights after 19:30.
   - Passers-by: people not in the zone's cast walk round the blocks on the sidewalks (A* legs between the
     corners, one search a frame through the engine), as Yuka Vehicles that keep apart and step round you
     (Separation, ObstacleAvoidance), and wave when you come close. You cannot talk to them.
   - Somebody sits on a park bench or a diner chair.
   How busy the streets are goes with the clock and the weather when you come into the zone: the most cars in the rush
   hours of a working day (7:30 to 9:30, 16:30 to 18:30), few late in the evening, fewer people out in the rain or
   fog and nobody on a bench in the rain.
   You on the road: a car that has to stop for you honks after a moment; walking on the road away from a crosswalk is
   jaywalking, and stepping onto a signalled crosswalk on a steady DON'T WALK is against the signal (api.street(kind)
   tells the engine: 'honk', 'jaywalk', 'dontwalk'). The pedestrian signals go with the traffic lights: WALK for 8 s at
   the start of the parallel green, then a flashing DON'T WALK with a countdown until the cross traffic gets its green
   (walkSign() gives the nearest one to you).
   Low graphics: 2 cars, 2 passers-by, 1 sitter (before that). */
(function () {
  'use strict';
  const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]];              // east, south, west, north (x right, z towards the viewer)
  const OPEN = { straight: [0, 2], bend: [2, 1] };               // at turn 0: road-straight runs along x, road-bend joins -x and +z
  // LANE: how far from the middle of the road a car drives (the road is 2.4 wide on a 3 x 3 tile, so a lane is 1.2 and
  // its middle 0.6 out). CARS: the type and a tint on the paint (null: the pack's own colour).
  const LANE = 0.6, CRUISE = 2.4, TURNING = 1.4, CYCLE = 30, GREEN = 12, WALK_S = 8, ROAD_HALF = 1.2;
  const CARS = [['taxi', null], ['sedan', null], ['suv', '#c9d6e6'], ['hatchback', '#f2d4b0'], ['sports-car', null], ['sports-car-2', '#c5e0c8']];
  const SEATS = /^(bench|benchCushion|chair|chairCushion|chairRounded|chairModernCushion|chairModernFrameCushion)$/;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = (l) => l[Math.floor(Math.random() * l.length)];
  const opp = (d) => (d + 2) % 4;
  const right = (d) => [-DIRS[d][1], DIRS[d][0]];                // the right-hand side of a heading
  let spriteTex = null;
  function whiteGlow(T) {
    if (spriteTex) return spriteTex;
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d'), grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(0.25, 'rgba(255,255,255,0.7)'); grd.addColorStop(0.6, 'rgba(255,255,255,0.15)'); grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
    spriteTex = new T.CanvasTexture(c);
    spriteTex.colorSpace = T.SRGBColorSpace;
    return spriteTex;
  }

  function create(api) {
    const T = api.T, Z = api.spec, zone = api.zone, high = api.gfx === 'high';
    const Y = window.YUKA;               // steering for cars and passers-by; without it (vendor/yuka.min.js missing) the streets stay empty
    if (!Y) console.warn('Sim Office: vendor/yuka.min.js not loaded: no cars or passers-by');
    const root = new T.Group();
    api.group.add(root);
    const own = [], undo = [];
    let dead = false, t = rnd(0, CYCLE);
    const L = { cars: [], walkers: [], sitters: [], trees: [], lights: [] };
    const mat = (m) => { own.push(m); return m; };
    const geo = (g) => { own.push(g); return g; };
    const props = api.propList || [];
    // how busy it is now, as factors on the numbers of cars and of people on foot
    const busy = (function () {
      const h = api.minute / 60, wx = api.weather || { rain: 0, fog: 0 }, weekend = !!api.weekend;
      const rush = !weekend && ((h >= 7.5 && h < 9.5) || (h >= 16.5 && h < 18.5));
      const late = h >= 21 || h < 6, evening = h >= 19.5 && !late;
      const cars = late ? 0.5 : evening ? 0.75 : rush ? 1.6 : weekend ? 0.8 : 1;
      const lunch = h >= 11.5 && h < 13.5;
      let feet = late ? 0.3 : evening ? 0.6 : rush || lunch || (weekend && h >= 10 && h < 17) ? 1.5 : 1;
      if (wx.rain > 0.05) feet *= 0.5; else if (wx.fog > 0.4) feet *= 0.75;
      return { cars, feet, wet: wx.rain > 0.05 };
    })();
    const some = (base, f) => Math.max(1, Math.round(base * f));

    // ------------------------------------------------------------ trees
    props.forEach(r => {
      if (!/^tree/.test(r.spec.node || '')) return;
      const h = r.holder;
      L.trees.push({ h, x: h.rotation.x, z: h.rotation.z, ph: rnd(0, 6.3), amp: rnd(0.012, 0.022), f: rnd(1.1, 1.6) });
    });
    undo.push(() => L.trees.forEach(tr => { tr.h.rotation.x = tr.x; tr.h.rotation.z = tr.z; tr.h.updateMatrix(); }));

    // ------------------------------------------------------------ the road grid
    const S = ((window.SO_ZONE_KIT || {}).SCALE || {}).roads || 3, H = S / 2;
    const cells = new Map(), key = (i, k) => i + ',' + k;
    (Z.tiles || []).forEach(p => {
      if (p.pack !== 'roads' || !/^road-/.test(p.node || '') || /curve|side|half/.test(p.node) || (p.scale && p.scale !== 1)) return;
      const i = Math.round(p.at[0] / S), k = Math.round(p.at[1] / S);
      if (Math.abs(p.at[0] - i * S) > 0.3 || Math.abs(p.at[1] - k * S) > 0.3) return;
      const kind = /straight|crossing/.test(p.node) ? 'straight' : /bend/.test(p.node) ? 'bend' : 'all';
      const a = (p.turn || 0) * Math.PI / 180, open = new Set();
      (OPEN[kind] || [0, 1, 2, 3]).forEach(d => {
        const [x, z] = DIRS[d], rx = x * Math.cos(a) + z * Math.sin(a), rz = -x * Math.sin(a) + z * Math.cos(a);
        open.add(DIRS.findIndex(v => Math.abs(v[0] - rx) < 0.5 && Math.abs(v[1] - rz) < 0.5));
      });
      cells.set(key(i, k), { i, k, x: i * S, z: k * S, open, crossing: /crossing/.test(p.node), junction: kind === 'all', signal: null });
    });
    const nbr = (c, d) => cells.get(key(c.i + DIRS[d][0], c.k + DIRS[d][1])) || null;
    const joined = (c, d) => { const n = c.open.has(d) && nbr(c, d); return !!n && n.open.has(opp(d)); };
    const solids = (api.solids || []).slice();
    const laneMemo = new Map();
    function laneBlocked(c, d) {             // a parked car (or anything solid) on this lane of this cell
      const k = key(c.i, c.k) + ':' + d;
      if (laneMemo.has(k)) return laneMemo.get(k);
      const [dx, dz] = DIRS[d], [rx, rz] = right(d);
      const cx = c.x + rx * LANE, cz = c.z + rz * LANE, hx = dx ? H : 0.42, hz = dz ? H : 0.42;
      const b = solids.some(s => s.x1 > cx - hx && s.x0 < cx + hx && s.z1 > cz - hz && s.z0 < cz + hz);
      laneMemo.set(k, b);
      return b;
    }
    const hasWayOn = (n, e) => DIRS.some((_, f) => f !== opp(e) && joined(n, f) && !laneBlocked(nbr(n, f), f));
    const enterable = (n, e) => !laneBlocked(n, e) && (hasWayOn(n, e) || !laneBlocked(n, opp(e)));
    function chooseExit(c, din) {
      const opts = [];
      [0, 1, 2, 3].forEach(e => {
        if (e === opp(din) || !joined(c, e) || !enterable(nbr(c, e), e)) return;
        opts.push(e);
        if (e === din) opts.push(e, e);          // going straight on is likelier
      });
      return opts.length ? pick(opts) : opp(din);
    }
    function cellPath(c, din, dout) {        // the lane through a cell as a polyline with lengths
      const [ix, iz] = DIRS[din], [ox, oz] = DIRS[dout], ri = right(din), ro = right(dout);
      const E = [c.x - ix * H + ri[0] * LANE, c.z - iz * H + ri[1] * LANE];
      const X = [c.x + ox * H + ro[0] * LANE, c.z + oz * H + ro[1] * LANE];
      let pts;
      if (din === dout) pts = [E, X];
      else if (dout === opp(din)) {          // turning round: a loop inside the cell
        const P1 = [E[0] + ix * (H + 0.9), E[1] + iz * (H + 0.9)], P2 = [X[0] + ix * (H + 0.9), X[1] + iz * (H + 0.9)];
        pts = [];
        for (let j = 0; j <= 14; j++) {
          const u = j / 14, a = (1 - u) ** 3, b = 3 * (1 - u) ** 2 * u, q = 3 * (1 - u) * u * u, w = u ** 3;
          pts.push([a * E[0] + b * P1[0] + q * P2[0] + w * X[0], a * E[1] + b * P1[1] + q * P2[1] + w * X[1]]);
        }
      } else {
        const Q = ix ? [X[0], E[1]] : [E[0], X[1]];
        pts = [];
        for (let j = 0; j <= 10; j++) {
          const u = j / 10, a = (1 - u) ** 2, b = 2 * (1 - u) * u, w = u * u;
          pts.push([a * E[0] + b * Q[0] + w * X[0], a * E[1] + b * Q[1] + w * X[1]]);
        }
      }
      const cum = [0];
      for (let j = 1; j < pts.length; j++) cum.push(cum[j - 1] + Math.hypot(pts[j][0] - pts[j - 1][0], pts[j][1] - pts[j - 1][1]));
      return { pts, cum, len: cum[cum.length - 1], turn: din !== dout };
    }
    function sample(path, s, out) {           // position and direction at distance s
      const { pts, cum } = path;
      let j = 1;
      while (j < pts.length - 1 && cum[j] < s) j++;
      const a = pts[j - 1], b = pts[j], seg = (cum[j] - cum[j - 1]) || 1, u = Math.max(0, Math.min(1, (s - cum[j - 1]) / seg));
      out.x = a[0] + (b[0] - a[0]) * u; out.z = a[1] + (b[1] - a[1]) * u;
      out.dx = (b[0] - a[0]) / seg; out.dz = (b[1] - a[1]) / seg;
      return out;
    }

    // ------------------------------------------------------------ traffic lights
    const LAMP = { red: '#ff3b2f', amber: '#ffb020', green: '#35e06a' };
    const lampMat = {};
    Object.keys(LAMP).forEach(n => {
      const c = new T.Color(LAMP[n]);
      lampMat[n] = {
        on: mat(api.litMaterial({ color: c.clone().multiplyScalar(0.3), emissive: c, emissiveIntensity: 1.1 })),
        off: mat(api.litMaterial({ color: c.clone().multiplyScalar(0.22) }))
      };
    });
    const glowMats = {};
    Object.keys(LAMP).forEach(n => { glowMats[n] = mat(new T.SpriteMaterial({ map: whiteGlow(T), color: new T.Color(LAMP[n]), blending: T.AdditiveBlending, depthWrite: false, transparent: true, toneMapped: false, opacity: 0.8 })); });
    props.forEach(r => {
      if (!/^traffic-light/.test(r.spec.node || '')) return;
      let mesh = null;
      r.object.traverse(o => { if (o.isMesh && !o.userData.ink && !mesh) mesh = o; });
      const lamps = mesh && lampFaces(T, mesh);
      if (!lamps) return;
      mesh.updateMatrixWorld(true);
      const nW = lamps.normal.clone().transformDirection(mesh.matrixWorld);
      const light = { axis: Math.abs(nW.x) > Math.abs(nW.z) ? 'x' : 'z', parts: {}, at: new T.Vector3(), glow: null, mesh };
      Object.keys(LAMP).forEach(n => {
        if (!lamps[n]) return;
        const m = new T.Mesh(lamps[n].geo, lampMat[n].off);        // the geometry is cached for every visit: not disposed
        m.userData.ink = true;
        mesh.add(m);
        undo.push(() => mesh.remove(m));
        light.parts[n] = { m, c: lamps[n].c.clone().applyMatrix4(mesh.matrixWorld).addScaledVector(nW, 0.05) };
      });
      light.glow = new T.Sprite(glowMats.red);
      light.glow.scale.setScalar(0.45);
      light.glow.visible = false;
      root.add(light.glow);
      r.holder.getWorldPosition(light.at);
      L.lights.push(light);
    });
    cells.forEach(c => {                      // a junction with lights round it is signalled
      if (!c.junction) return;
      if (L.lights.some(l => Math.hypot(l.at.x - c.x, l.at.z - c.z) < S * 1.05)) c.signal = true;
    });
    const phaseOf = (axis) => {               // 'green' | 'amber' | 'red' for traffic along axis
      const p = t % CYCLE, xs = p < GREEN ? 'green' : p < CYCLE / 2 ? 'amber' : 'red';
      const zs = p < CYCLE / 2 ? 'red' : p < CYCLE / 2 + GREEN ? 'green' : 'amber';
      return axis === 'x' ? xs : zs;
    };
    let lastPhase = '';
    function lightsTick(night) {
      const ph = phaseOf('x') + phaseOf('z');
      if (ph === lastPhase && !night) return;
      lastPhase = ph;
      L.lights.forEach(l => {
        const st = phaseOf(l.axis);
        Object.keys(l.parts).forEach(n => { l.parts[n].m.material = n === st ? lampMat[n].on : lampMat[n].off; });
        const lit = l.parts[st];
        l.glow.visible = !!lit && night > 0.3;
        if (lit) { l.glow.position.copy(lit.c); l.glow.material = glowMats[st]; }
      });
    }

    // ------------------------------------------------------------ cars
    // Each car is a Yuka Vehicle following the lane through its cell and the next one (FollowPathBehavior); life.js
    // works out how far it may still go (a red light, people or a car in front) and sets the vehicle's maxSpeed from
    // that, so it brakes and stops like before. Where it is on the lane (s) and when it enters the next cell are read
    // back from its position every frame.
    const tmp = { x: 0, z: 0, dx: 0, dz: 1 }, tmp2 = { x: 0, z: 0, dx: 0, dz: 1 };
    const headMat = mat(new T.SpriteMaterial({ map: whiteGlow(T), color: new T.Color('#fff4d6'), blending: T.AdditiveBlending, depthWrite: false, transparent: true, toneMapped: false }));
    const tailMat = mat(new T.SpriteMaterial({ map: whiteGlow(T), color: new T.Color('#ff2a1a'), blending: T.AdditiveBlending, depthWrite: false, transparent: true, toneMapped: false, opacity: 0.85 }));
    const beamGeo = geo(new T.PlaneGeometry(1.1, 1.7).rotateX(-Math.PI / 2));
    const beamMat = mat(new T.MeshBasicMaterial({ map: whiteGlow(T), color: new T.Color('#fff0c8'), blending: T.AdditiveBlending, depthWrite: false, transparent: true, toneMapped: false, opacity: 0.35 }));
    const carsEM = Y ? new Y.EntityManager() : null, dirTmp = Y ? new Y.Vector3() : null;
    function yPath(pts) { const p = new Y.Path(); pts.forEach(q => p.add(new Y.Vector3(q[0], 0, q[1]))); return p; }
    function nextState(cell, dout) {          // where the lane goes after this cell (back the way it came at a dead end)
      const n = nbr(cell, dout), c = n || cell, din = n ? dout : opp(dout), out = chooseExit(c, din);
      return { cell: c, din, dout: out, path: cellPath(c, din, out) };
    }
    function progress(path, x, z) {          // how far along the lane the point nearest to (x, z) is, and whether (x, z) is past its end
      const { pts, cum } = path;
      let best = 0, bd = Infinity;
      for (let j = 1; j < pts.length; j++) {
        const a = pts[j - 1], b = pts[j], vx = b[0] - a[0], vz = b[1] - a[1], L2 = vx * vx + vz * vz || 1e-9;
        const u = Math.max(0, Math.min(1, ((x - a[0]) * vx + (z - a[1]) * vz) / L2));
        const d = (x - a[0] - vx * u) ** 2 + (z - a[1] - vz * u) ** 2;
        if (d < bd) { bd = d; best = cum[j - 1] + Math.sqrt(L2) * u; }
      }
      const e = pts[pts.length - 1], f = pts[pts.length - 2];
      return { s: best, past: (x - e[0]) * (e[0] - f[0]) + (z - e[1]) * (e[1] - f[1]) > 0 };
    }
    function lane(car) {                     // the waypoints ahead: the rest of this cell's lane and the whole of the next
      const pts = [];
      car.path.pts.forEach((q, j) => { if (car.path.cum[j] > car.s + 0.2) pts.push(q); });
      car.next.path.pts.forEach((q, j) => { if (j > 0) pts.push(q); });
      if (pts.length < 2) pts.unshift(car.path.pts[car.path.pts.length - 1]);
      car.follow.path = yPath(pts);
    }
    function makeCar(type, tint, cell, din, s0) {
      const obj = api.packNode('cars', type);
      if (!obj) return null;
      const kit = window.SO_ZONE_KIT || {};
      const box = ((kit.BOX || {}).cars || {})[type] || [-0.9, 0.9, -2.1, 2.1, 0, 1.2];
      const k = (kit.SCALE || {}).cars || 0.5, g = new T.Group(), wheels = [], lamps = [];
      obj.scale.setScalar(k);
      obj.traverse(o => {
        if (!o.isMesh) return;
        // the paint ('paint' materials) takes the tint; the head and tail light materials glow at night
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        const own = mats.map(m => {
          if (/^paint/.test(m.name) && tint) { const c = m.clone(); c.color.multiply(new T.Color(tint)); return mat(c); }
          if (/^(Head|Tail)lights/i.test(m.name)) { const c = m.clone(); c.emissive = new T.Color(/^Head/i.test(m.name) ? '#fff1c0' : '#ff3a2a'); c.emissiveIntensity = 0; lamps.push(c); return mat(c); }
          return m;
        });
        o.material = Array.isArray(o.material) ? own : own[0];
        const w = /wheel-(front|back)/.exec(o.name);
        if (w) {
          o.rotation.order = 'YXZ';
          o.geometry.computeBoundingBox();
          const bb = o.geometry.boundingBox;
          wheels.push({ o, front: w[1] === 'front', r: Math.max(0.05, (bb.max.y - bb.min.y) / 2 * k) });
        }
      });
      g.add(obj);
      api.shadows(g, true);
      const lights = [];
      const fz = box[3] * k, bz = box[2] * k, wx = box[1] * k - 0.14, y = box[5] * k * 0.33;
      [[wx, fz, headMat, 0.42], [-wx, fz, headMat, 0.42], [wx, bz, tailMat, 0.3], [-wx, bz, tailMat, 0.3]].forEach(([x, z, m, sc]) => {
        const sp = new T.Sprite(m);
        sp.position.set(x, y, z + Math.sign(z) * 0.03);
        sp.scale.setScalar(sc);
        sp.visible = false;
        g.add(sp);
        lights.push(sp);
      });
      const beam = new T.Mesh(beamGeo, beamMat);
      beam.position.set(0, 0.03, fz + 0.95);
      beam.visible = false;
      g.add(beam);
      lights.push(beam);
      root.add(g);
      const half = (box[3] - box[2]) * k / 2;
      const veh = new Y.Vehicle();
      veh.maxSpeed = CRUISE; veh.maxForce = 4; veh.mass = 1; veh.boundingRadius = half; veh.updateOrientation = true;
      const follow = new Y.FollowPathBehavior(yPath([[cell.x, cell.z], [cell.x, cell.z + 1]]), 0.45);
      veh.steering.add(follow);
      veh.setRenderComponent(g, (e, r) => { r.position.set(e.position.x, 0, e.position.z); r.quaternion.copy(e.rotation); });
      carsEM.add(veh);
      const car = { type, g, veh, follow, wheels, lights, lamps, cell, din, dout: 0, path: null, next: null, s: s0, v: 0, half, ghost: 0, stuck: 0, steer: 0,
        m1: { x: 0, z: 0, r: 0.5 }, m2: { x: 0, z: 0, r: 0.5 }, x: 0, z: 0, dx: 0, dz: 1 };
      putCar(car, cell, din, s0);
      api.movers.push(car.m1, car.m2);
      return car;
    }
    function putCar(car, cell, din, s0) {    // the car on the lane of a cell, coming in from din, s0 along it
      car.cell = cell; car.din = din;
      car.dout = chooseExit(cell, din);
      car.path = cellPath(cell, din, car.dout);
      car.s = Math.min(s0, car.path.len * 0.9);
      car.next = nextState(cell, car.dout);
      car.ghost = 0; car.stuck = 0; car.waitMe = 0;
      sample(car.path, car.s, tmp);
      car.veh.position.set(tmp.x, 0, tmp.z);
      car.veh.velocity.set(0, 0, 0);
      car.veh.lookAt(new Y.Vector3(tmp.x + tmp.dx, 0, tmp.z + tmp.dz));
      car.dx = tmp.dx; car.dz = tmp.dz;
      lane(car);
      pose(car);
    }
    function pose(car) {                     // the car's place, heading and movers (two circles along it) from its vehicle
      const p = car.veh.position, vel = car.veh.velocity, sp = car.veh.getSpeed();
      car.x = p.x; car.z = p.z; car.v = sp;
      if (sp > 0.02) { car.dx = vel.x / sp; car.dz = vel.z / sp; }
      else { const d = car.veh.getDirection(dirTmp); if (Math.hypot(d.x, d.z) > 0.5) { car.dx = d.x; car.dz = d.z; } }
      car.g.position.set(p.x, 0, p.z);
      car.g.quaternion.copy(car.veh.rotation);
      const off = car.half * 0.5;
      car.m1.x = p.x + car.dx * off; car.m1.z = p.z + car.dz * off;
      car.m2.x = p.x - car.dx * off; car.m2.z = p.z - car.dz * off;
    }
    // how far the car may still go before the stop line of a red light ahead (Infinity if it may go on)
    function signalRoom(car) {
      const n1 = nbr(car.cell, car.dout);
      if (!n1 || car.cell.signal) return Infinity;
      const axis = DIRS[car.dout][0] ? 'x' : 'z', left = car.path.len - car.s;
      let room;
      if (n1.signal) room = car.cell.crossing ? left - H - 0.75 - car.half : left - car.half - 0.15;
      else if (n1.crossing) { const n2 = nbr(n1, car.dout); if (!n2 || !n2.signal) return Infinity; room = left + H - 0.75 - car.half; }
      else return Infinity;
      const st = phaseOf(axis);
      if (st === 'green' || room < -0.2) return Infinity;
      if (st === 'amber' && room < 1.0) return Infinity;
      return Math.max(0, room);
    }
    function carTick(car, dt, people, night, me) {     // before the vehicles move: how fast this car may go
      if (car.ghost > 0) car.ghost -= dt;
      let room = signalRoom(car), byCar = false, byMe = Infinity;
      const fx = car.dx, fz = car.dz;
      people.forEach(p => {
        const rx = p.x - car.x, rz = p.z - car.z, f = rx * fx + rz * fz, lat = Math.abs(rx * fz - rz * fx);
        if (f > 0 && f < 4.5 && lat < 0.75) { const r = f - car.half - 0.55; room = Math.min(room, r); if (p === me) byMe = r; }
      });
      // held up by you (not by a red light): after a moment the driver honks, at most every 7 s
      if (me && byMe <= room + 0.01 && byMe < 0.6 && car.v < 0.2 && signalRoom(car) > byMe) {
        car.waitMe = (car.waitMe || 0) + dt;
        if (car.waitMe > 1.3 && api.elapsed > (car.honkAt || 0)) { car.honkAt = api.elapsed + 7; if (api.street) api.street('honk', { x: car.x, z: car.z }); }
      } else car.waitMe = 0;
      if (car.ghost <= 0) L.cars.forEach(o => {
        if (o === car) return;
        [o.m1, o.m2].forEach(m => {
          const rx = m.x - car.x, rz = m.z - car.z, f = rx * fx + rz * fz, lat = Math.abs(rx * fz - rz * fx);
          if (f > 0 && f < 5 && lat < 0.75) { const r = f - car.half - 0.9; if (r < room) { room = r; byCar = true; } }
        });
      });
      const target = car.path.turn ? TURNING : CRUISE;
      car.veh.maxSpeed = room <= 0 ? 0 : Math.min(target, Math.sqrt(2 * 3.5 * room));
      if (car.v < 0.05 && byCar) { if ((car.stuck += dt) > 5) { car.ghost = 2.5; car.stuck = 0; } } else car.stuck = 0;
    }
    function carAfter(car, dt, night) {           // after the vehicles moved: the cell it is in, the wheels, the lights
      const at = progress(car.path, car.veh.position.x, car.veh.position.z);
      car.s = at.s;
      let guard = 0;
      while ((at.past || car.s >= car.path.len - 0.05) && guard++ < 4) {
        const n = car.next;
        car.cell = n.cell; car.din = n.din; car.dout = n.dout; car.path = n.path;
        car.next = nextState(car.cell, car.dout);
        const again = progress(car.path, car.veh.position.x, car.veh.position.z);
        car.s = again.s; at.past = again.past;
        lane(car);
      }
      pose(car);
      sample(car.path, Math.min(car.path.len, car.s + 0.7), tmp2);        // the front wheels turn towards where the lane goes
      const want = Math.atan2(tmp2.dx * car.dz - tmp2.dz * car.dx, tmp2.dx * car.dx + tmp2.dz * car.dz);
      car.steer += (Math.max(-0.5, Math.min(0.5, want * 1.6)) - car.steer) * Math.min(1, dt * 6);
      car.wheels.forEach(w => { w.o.rotation.x += car.v * dt / w.r; if (w.front) w.o.rotation.y = car.steer; });
      const on = night;
      car.lights.forEach(l => { l.visible = on; });
      car.lamps.forEach(m => { m.emissiveIntensity = on ? 1.2 : 0; });
    }
    // where a car can start: a plain cell of road (no junction, no crosswalk) and a way in
    const starts = [];
    cells.forEach(c => {
      if (c.junction || c.crossing || c.signal) return;
      c.open.forEach(d => { if (!laneBlocked(c, d) && enterable(c, d) && hasWayOn(c, d)) starts.push([c, d]); });
    });
    // A long zone (the town: two towns and the road between them) keeps its life round you: cars start near you, and a
    // car or a passer-by that gets more than FAR away comes back somewhere near you that you are not looking at
    const FAR = 48;
    const focus = () => { const pl = api.player; return pl && api.state !== 'title' ? [pl.pos.x, pl.pos.z] : [0, 0]; };
    const nearStarts = () => { const f = focus(), near = starts.filter(([c]) => Math.hypot(c.x - f[0], c.z - f[1]) < FAR * 0.6); return near.length >= 4 ? near : starts; };
    function startCars() {
      if (dead || !cells.size || !Y) return;
      const n = some(high ? 4 : 2, busy.cars);
      const used = [];
      const pl = api.player, from = nearStarts();
      for (let tries = 0; tries < 80 && L.cars.length < n && from.length; tries++) {
        const [c, d] = pick(from);
        if (used.some(u => Math.hypot(u.x - c.x, u.z - c.z) < (n > 4 ? 5 : 6.5))) continue;
        if (pl && Math.hypot(pl.pos.x - c.x, pl.pos.z - c.z) < 3) continue;
        const [type, tint] = CARS[L.cars.length % CARS.length];
        const car = makeCar(type, tint, c, d, rnd(0.2, 1.6));
        if (!car) break;
        used.push(c);
        L.cars.push(car);
      }
    }

    // ------------------------------------------------------------ people: passers-by and sitters
    // who can be a passer-by: people nobody in the cast is (man-*, woman-*), then people from the cast who are not in
    // this zone; never the player's own look
    const npcRows = ((window.SO_DB || {}).npcs || []);
    function castModels() {
      const inZone = new Set(Object.values(api.npcs || {}).map(a => a.model)), cast = new Set(npcRows.map(n => n.model));
      if (api.player) inZone.add(api.player.model);
      const ready = (m) => api.packReady(m) && !inZone.has(m);
      const fresh = api.models.filter(m => /^(man|woman)-/.test(m) && ready(m));
      const shuffle = (l) => { for (let i = l.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [l[i], l[j]] = [l[j], l[i]]; } return l; };
      return shuffle(fresh.filter(m => !cast.has(m))).concat(shuffle(fresh.filter(m => cast.has(m))));
    }
    function person(model, id) {
      const a = api.actor(model, { id });
      root.add(a.holder);
      a.mover = { x: 0, z: 0, r: 0.22 };
      api.movers.push(a.mover);
      return a;
    }
    // the sidewalk round every block: the ring of non-road cells closed in by roads, 1.35 in from the road's middle
    function rings() {
      if (!cells.size) return [];
      let i0 = Infinity, i1 = -Infinity, k0 = Infinity, k1 = -Infinity;
      cells.forEach(c => { i0 = Math.min(i0, c.i); i1 = Math.max(i1, c.i); k0 = Math.min(k0, c.k); k1 = Math.max(k1, c.k); });
      const seen = new Set(), out = [];
      for (let i = i0; i <= i1; i++) for (let k = k0; k <= k1; k++) {
        if (cells.has(key(i, k)) || seen.has(key(i, k))) continue;
        const stack = [[i, k]], comp = [];
        let open = false;
        seen.add(key(i, k));
        while (stack.length) {
          const [a, b] = stack.pop();
          comp.push([a, b]);
          DIRS.forEach(([dx, dz]) => {
            const x = a + dx, z = b + dz;
            if (x < i0 || x > i1 || z < k0 || z > k1) { open = true; return; }
            if (cells.has(key(x, z)) || seen.has(key(x, z))) return;
            seen.add(key(x, z));
            stack.push([x, z]);
          });
        }
        if (open) continue;
        const ci = comp.map(c => c[0]), ck = comp.map(c => c[1]);
        const x0 = (Math.min(...ci) - 1) * S + 1.35, x1 = (Math.max(...ci) + 1) * S - 1.35;
        const z0 = (Math.min(...ck) - 1) * S + 1.35, z1 = (Math.max(...ck) + 1) * S - 1.35;
        out.push({ corners: [[x0, z0], [x1, z0], [x1, z1], [x0, z1]], legs: {} });
      }
      return out;
    }
    // Passers-by are Yuka Vehicles too: they follow the way round the block (three-pathfinding's paths, FollowPathBehavior),
    // keep apart from one another (SeparationBehavior) and step round the player (ObstacleAvoidanceBehavior on a
    // stand-in entity that follows the player); life.js still stops them when somebody is right in their way.
    const peopleEM = Y ? new Y.EntityManager() : null, playerObs = Y ? new Y.GameEntity() : null;
    if (playerObs) { playerObs.boundingRadius = 0.32; playerObs.position.set(1e6, 0, 1e6); }
    let ringList = null;
    function startWalkers(models) {
      const f = focus(), mid = (ring) => [(ring.corners[0][0] + ring.corners[2][0]) / 2, (ring.corners[0][1] + ring.corners[2][1]) / 2];
      const rs = ringList = rings().sort((a, b) => Math.hypot(mid(a)[0] - f[0], mid(a)[1] - f[1]) - Math.hypot(mid(b)[0] - f[0], mid(b)[1] - f[1]));
      if (!rs.length || !Y) return;
      const n = Math.min(some(high ? 4 : 2, busy.feet), models.length);
      for (let j = 0; j < n; j++) {
        const ring = rs[j % rs.length], dir = j < rs.length ? 1 : -1;
        const leg = Math.floor(rnd(0, 4)), u = rnd(0.1, 0.9);
        const A = ring.corners[leg], B = ring.corners[(leg + dir + 4) % 4];
        const a = person(models.shift(), 'walker' + j);
        a.pos.set(A[0] + (B[0] - A[0]) * u, 0, A[1] + (B[1] - A[1]) * u);
        a.heading = Math.atan2(B[0] - A[0], B[1] - A[1]);
        const veh = new Y.Vehicle();
        veh.maxSpeed = 0; veh.maxForce = 5; veh.mass = 1; veh.boundingRadius = 0.22; veh.updateOrientation = false;
        veh.updateNeighborhood = true; veh.neighborhoodRadius = 1.4;
        veh.position.set(a.pos.x, 0, a.pos.z);
        const follow = new Y.FollowPathBehavior(yPath([[B[0], B[1]]]), 0.3);
        const apart = new Y.SeparationBehavior(); apart.weight = 0.5;
        const round = new Y.ObstacleAvoidanceBehavior([playerObs]); round.weight = 1.2;
        veh.steering.add(follow); veh.steering.add(apart); veh.steering.add(round);
        peopleEM.add(veh);
        const w = { a, veh, follow, ring, dir, leg: (leg + dir + 4) % 4, path: null, v: rnd(0.85, 1.1), wait: 0, waveAt: 0, waving: 0, blocked: 0, req: null, face: null };
        L.walkers.push(w);
        route(w, true);
      }
    }
    function route(w, fromHere) {            // the way to the next corner: from the ring's cache, or one search
      const c = w.ring.corners, to = c[w.leg], from = [w.a.pos.x, w.a.pos.z];
      const lk = ((w.leg - w.dir + 4) % 4) + '>' + w.leg;
      const take = (p) => { w.path = p; w.follow.path = yPath(p); };
      if (!fromHere && w.ring.legs[lk]) { take(w.ring.legs[lk]); return; }
      w.path = null;
      w.req = api.findPath(from, to, {}, (p) => {
        if (dead) return;
        w.req = null;
        if (!fromHere && p) w.ring.legs[lk] = p;
        take(p || [to]);
      });
    }
    function walkerTick(w, dt, pl, others) {   // before the vehicles move: may this one walk on?
      const a = w.a, veh = w.veh;
      let go = false;
      w.face = null;
      const toP = pl ? Math.hypot(pl.pos.x - a.pos.x, pl.pos.z - a.pos.z) : 99;
      if (w.waving > 0) {
        w.waving -= dt;
        w.face = Math.atan2(pl.pos.x - a.pos.x, pl.pos.z - a.pos.z);
      } else if (pl && toP < 1.6 && api.elapsed > w.waveAt && api.state === 'play') {
        w.waveAt = api.elapsed + rnd(22, 35);
        w.waving = 1.6;
        api.play(a, a.actions['interact-right'] ? 'interact-right' : 'emote-yes', { once: true, fade: 0.2 });
      } else if (w.path) {
        const p = w.follow.path.current();
        let dx = p.x - a.pos.x, dz = p.z - a.pos.z;
        const d = Math.hypot(dx, dz) || 1;
        dx /= d; dz /= d;
        let stop = false;
        if (pl && toP < 0.8 && ((pl.pos.x - a.pos.x) * dx + (pl.pos.z - a.pos.z) * dz) / toP > 0.3) stop = true;
        others.forEach(o => {
          if (o === a || stop) return;
          const rx = o.pos.x - a.pos.x, rz = o.pos.z - a.pos.z, od = Math.hypot(rx, rz);
          if (od < 0.62 && (rx * dx + rz * dz) / (od || 1) > 0.5) stop = true;
        });
        if (stop && (w.blocked += dt) > 2.2) {       // somebody stays in the way: step round them for a moment
          stop = false;
          if (w.blocked > 3.4) w.blocked = 0;
        } else if (!stop) w.blocked = 0;
        go = !stop;
        if (stop && toP < 1) w.face = Math.atan2(pl.pos.x - a.pos.x, pl.pos.z - a.pos.z);
      }
      veh.maxSpeed = go ? w.v : 0;
      if (!go) veh.velocity.set(0, 0, 0);
    }
    function walkerAfter(w, dt) {              // after the vehicles moved: the person follows, turns and animates
      const a = w.a, veh = w.veh, vel = veh.velocity, sp = veh.getSpeed();
      a.pos.x = veh.position.x; a.pos.z = veh.position.z;
      if (w.path && w.follow.path.finished()) {
        const e = w.follow.path.current();
        if (Math.hypot(e.x - a.pos.x, e.z - a.pos.z) < 0.12) { w.leg = (w.leg + w.dir + 4) % 4; route(w, false); }
      }
      const face = w.face != null ? w.face : sp > 0.05 ? Math.atan2(vel.x, vel.z) : null;
      if (face != null) { let d = face - a.heading; d = Math.atan2(Math.sin(d), Math.cos(d)); a.heading += d * (1 - Math.exp(-dt * 7)); }
      a.holder.rotation.y = a.heading;
      if (w.waving <= 0) api.locomotion(a, sp > 0.05 ? sp : 0);
      if (api.shelter) api.shelter(a, api.raining);          // an umbrella in the rain
      api.animate(a, dt);
      a.mover.x = a.pos.x; a.mover.z = a.pos.z;
    }
    function startSitters(models) {
      if (zone !== 'city' && zone !== 'diner') return;
      if (zone === 'city' && busy.wet) return;
      const places = Object.values(Z.places || {}).map(p => p.at).filter(Boolean);
      const box = new T.Box3(), c = new T.Vector3();
      const seats = props.filter(r => SEATS.test(r.spec.node || '')).map(r => {
        box.setFromObject(r.holder);
        box.getCenter(c);
        return { x: c.x, z: c.z, turn: (r.spec.turn || 0) * Math.PI / 180, park: /bench/.test(r.spec.node) && c.z > 5 };
      }).filter(s => !places.some(p => Math.hypot(p[0] - s.x, p[1] - s.z) < 1.3));
      seats.sort((a, b) => (b.park - a.park) || (Math.random() - 0.5));
      const n = Math.min(high ? 2 : 1, models.length, seats.length);
      const taken = [];
      for (let j = 0; j < seats.length && L.sitters.length < n; j++) {
        const s = seats[j];
        if (taken.some(o => Math.hypot(o.x - s.x, o.z - s.z) < 1.2)) continue;
        taken.push(s);
        const a = person(models.shift(), 'sitter' + j);
        a.pos.set(s.x - Math.sin(s.turn) * 0.07, 0, s.z - Math.cos(s.turn) * 0.07);      // well back on the seat
        a.heading = s.turn;
        a.holder.rotation.y = s.turn;
        a.sit = true;
        api.play(a, 'sit', { fade: 0 });
        a.mover.x = s.x; a.mover.z = s.z;
        L.sitters.push({ a, lookAt: 0 });
      }
    }
    function sitterTick(s, dt, pl) {
      const a = s.a, e = api.elapsed;
      if (pl && Math.hypot(pl.pos.x - a.pos.x, pl.pos.z - a.pos.z) < 2.2) {
        let d = Math.atan2(pl.pos.x - a.pos.x, pl.pos.z - a.pos.z) - a.heading;
        d = Math.atan2(Math.sin(d), Math.cos(d));
        a.look = Math.max(-0.9, Math.min(0.9, d));
        s.lookAt = e + 2;
      } else if (e > s.lookAt) { a.look = Math.random() < 0.4 ? 0 : rnd(-0.6, 0.6); s.lookAt = e + rnd(4, 12); }
      api.animate(a, dt);
    }

    // ------------------------------------------------------------ you on foot: crosswalks, the walk signal, jaywalking
    // A crossing cell's road runs along one axis and people cross along the other; it is signalled when a signalled
    // junction is next to it along the road. Its WALK goes with the green of the traffic people walk beside.
    const walks = [];
    cells.forEach(c => {
      if (!c.crossing) return;
      const axis = c.open.has(0) || c.open.has(2) ? 'x' : 'z', along = axis === 'x' ? [0, 2] : [1, 3];
      if (along.some(d => { const n = nbr(c, d); return n && n.signal; })) walks.push({ c, axis });
    });
    function pedSignal(roadAxis) {          // 'walk' | 'flash' | 'dont', and the countdown while it flashes
      const start = roadAxis === 'x' ? CYCLE / 2 : 0, e = ((t % CYCLE) - start + CYCLE) % CYCLE, stop = CYCLE / 2;
      return e < WALK_S ? { state: 'walk', secs: 0 } : e < stop ? { state: 'flash', secs: Math.ceil(stop - e) } : { state: 'dont', secs: 0 };
    }
    function onAsphalt(c, x, z) {             // on the road surface of a cell (not the curb round it)
      const rx = x - c.x, rz = z - c.z;
      for (const d of c.open) {
        const along = rx * DIRS[d][0] + rz * DIRS[d][1], lat = Math.abs(rx * DIRS[d][1] - rz * DIRS[d][0]);
        if (along > -ROAD_HALF && along <= H + 0.01 && lat < ROAD_HALF) return true;
      }
      return false;
    }
    const foot = { cell: null, onFor: 0, told: false };
    function footTick(dt, pl) {
      if (!pl || !cells.size || !L.cars.length || api.state !== 'play') { foot.cell = null; foot.onFor = 0; return; }
      const c = cells.get(key(Math.round(pl.pos.x / S), Math.round(pl.pos.z / S)));
      const on = !!c && onAsphalt(c, pl.pos.x, pl.pos.z);
      if (!on) { foot.cell = null; foot.onFor = 0; foot.told = false; return; }
      if (foot.cell !== c) { foot.cell = c; foot.onFor = 0; foot.told = false; }
      foot.onFor += dt;
      if (foot.told || foot.onFor < 0.35) return;
      const w = walks.find(x => x.c === c);
      if (w) {                                // on a crosswalk: fine unless the signal said DON'T WALK when you stepped on
        foot.told = true;
        if (pedSignal(w.axis).state === 'dont' && api.street) api.street('dontwalk', { x: c.x, z: c.z });
        return;
      }
      if (c.crossing) { foot.told = true; return; }            // a crosswalk without lights: people have the right of way
      const inner = !c.junction || (Math.abs(pl.pos.x - c.x) < 0.9 && Math.abs(pl.pos.z - c.z) < 0.9);
      if (inner && foot.onFor > 0.6) { foot.told = true; if (api.street) api.street('jaywalk', { x: c.x, z: c.z }); }
    }
    function walkSign() {                     // the pedestrian signal across the crosswalk nearest to you (within 4.5)
      const pl = api.player;
      if (!pl || !walks.length) return null;
      let best = null, bd = 4.5;
      walks.forEach(w => { const d = Math.hypot(pl.pos.x - w.c.x, pl.pos.z - w.c.z); if (d < bd) { bd = d; best = w; } });
      if (!best) return null;
      // the signal stands on the far side of the road from you
      const across = best.axis === 'x' ? 'z' : 'x', side = Math.sign(pl.pos[across] - best.c[across]) || 1, p = pedSignal(best.axis);
      const at = { x: best.c.x, z: best.c.z };
      at[across] -= side * 1.45;
      return { state: p.state, secs: p.secs, x: at.x, z: at.z };
    }

    // ------------------------------------------------------------ start (cars wait for their pack)
    if (cells.size) {
      if (api.packReady('cars')) startCars();
      else api.loadPack('cars').then(startCars);
    }
    // the cast's looks are loaded first (quick when they already are), so passers-by match the people of the game
    const looks = Array.from(new Set(npcRows.map(n => n.model).filter(m => /^(man|woman)-/.test(m))));
    Promise.all(looks.map(m => api.loadPack(m))).then(() => {
      if (dead) return;
      const models = castModels();
      if (cells.size) startWalkers(models);
      startSitters(models);
    });

    function update(dt) {
      if (dead) return;
      t += dt;
      const e = api.elapsed, min = api.minute, night = api.dark != null ? (api.dark ? 1 : 0) : (min >= 19.5 * 60 || min < 6.5 * 60) ? 1 : 0;
      L.trees.forEach(tr => {
        const gust = 0.65 + 0.35 * Math.sin(e * 0.21 + tr.ph);
        tr.h.rotation.x = tr.x + tr.amp * gust * Math.sin(e * tr.f + tr.ph);
        tr.h.rotation.z = tr.z + tr.amp * 0.8 * gust * Math.sin(e * tr.f * 0.77 + tr.ph * 1.9);
        tr.h.updateMatrix();
      });
      lightsTick(api.night || night);
      const pl = api.player, people = [];
      if (pl && api.state !== 'title') people.push(pl.pos);
      Object.values(api.npcs || {}).forEach(a => people.push(a.pos));
      L.walkers.forEach(w => people.push(w.a.pos));
      if (Y) {
        const who = pl && api.state !== 'title' ? pl : null;
        if (who) playerObs.position.set(who.pos.x, 0, who.pos.z); else playerObs.position.set(1e6, 0, 1e6);
        L.cars.forEach(c => carTick(c, dt, people, !!night, who ? who.pos : null));
        carsEM.update(dt);
        L.cars.forEach(c => carAfter(c, dt, !!night));
        const others = Object.values(api.npcs || {}).concat(L.walkers.map(w => w.a));
        L.walkers.forEach(w => walkerTick(w, dt, who, others));
        peopleEM.update(dt);
        L.walkers.forEach(w => walkerAfter(w, dt));
      }
      L.sitters.forEach(s => sitterTick(s, dt, pl));
      footTick(dt, pl && api.state !== 'title' ? pl : null);
      if ((recallAt -= dt) <= 0) { recallAt = 1.5; recall(); }
    }
    let recallAt = 1.5;
    function recall() {             // bring back a car or a passer-by that went far from you (one a time)
      if (!Y || dead) return;
      const f = focus(), far = (x, z) => Math.hypot(x - f[0], z - f[1]) > FAR, hidden = (x, z) => Math.hypot(x - f[0], z - f[1]) > 16;
      const car = L.cars.find(c => far(c.x, c.z));
      if (car) {
        const from = nearStarts().filter(([c]) => hidden(c.x, c.z) && !L.cars.some(o => o !== car && Math.hypot(o.x - c.x, o.z - c.z) < 6));
        if (from.length) { const [c, d] = pick(from); putCar(car, c, d, rnd(0.2, 1.6)); }
        return;
      }
      const w = L.walkers.find(x => far(x.a.pos.x, x.a.pos.z));
      if (!w || !ringList) return;
      const near = ringList.slice().sort((a, b) => Math.hypot(a.corners[0][0] - f[0], a.corners[0][1] - f[1]) - Math.hypot(b.corners[0][0] - f[0], b.corners[0][1] - f[1]));
      const ring = near.find(rg => L.walkers.filter(o => o.ring === rg).length < 2) || near[0];
      const leg = Math.floor(rnd(0, 4)), A = ring.corners[leg], B = ring.corners[(leg + w.dir + 4) % 4], u = rnd(0.1, 0.9);
      const x = A[0] + (B[0] - A[0]) * u, z = A[1] + (B[1] - A[1]) * u;
      if (!hidden(x, z)) return;
      if (w.req) w.req.cancelled = true;
      w.ring = ring; w.leg = (leg + w.dir + 4) % 4;
      w.a.pos.set(x, 0, z); w.veh.position.set(x, 0, z); w.veh.velocity.set(0, 0, 0);
      route(w, true);
    }
    function dispose() {
      dead = true;
      L.walkers.forEach(w => { if (w.req) w.req.cancelled = true; });
      undo.forEach(f => f());
      if (root.parent) root.parent.remove(root);
      own.forEach(o => o.dispose && o.dispose());
    }
    function info() {
      return { busy, cars: L.cars.length, walkers: L.walkers.length, sitters: L.sitters.length, trees: L.trees.length, lights: L.lights.length,
        signal: L.lights.length || [...cells.values()].some(c => c.signal) ? { x: phaseOf('x'), z: phaseOf('z') } : null, walks: walks.length,
        walk: walks.map(w => Object.assign({ at: [w.c.x, w.c.z], axis: w.axis }, pedSignal(w.axis))), foot: { on: !!foot.cell, told: foot.told },
        at: L.cars.map(c => [+c.x.toFixed(1), +c.z.toFixed(1), +c.v.toFixed(2)]).concat(L.walkers.map(w => [+w.a.pos.x.toFixed(1), +w.a.pos.z.toFixed(1)])) };
    }
    return { update, dispose, info, walkSign };
  }

  // The lamp faces of a traffic light: its triangles whose colormap colour is the red, amber or green of a lamp and
  // that face the same way as the red one; one geometry per colour, a hair in front. Cached per geometry.
  const lampCache = new Map();
  function lampFaces(T, mesh) {
    const g = mesh.geometry;
    if (lampCache.has(g)) return lampCache.get(g);
    let out = null;
    try { out = findLamps(T, mesh); } catch (e) { out = null; }
    lampCache.set(g, out);
    return out;
  }
  function findLamps(T, mesh) {
    const g = mesh.geometry, img = mesh.material && mesh.material.map && mesh.material.map.image;
    const pos = g.attributes.position, uv = g.attributes.uv;
    if (!img || !uv || !img.width) return null;
    const cv = document.createElement('canvas');
    cv.width = img.width; cv.height = img.height;
    const cx = cv.getContext('2d', { willReadFrequently: true });
    cx.drawImage(img, 0, 0);
    const px = cx.getImageData(0, 0, cv.width, cv.height).data;
    const idx = g.index ? g.index.array : null, n = idx ? idx.length / 3 : pos.count / 3;
    const A = new T.Vector3(), B = new T.Vector3(), C = new T.Vector3(), N = new T.Vector3(), E1 = new T.Vector3(), E2 = new T.Vector3();
    const tris = [];
    for (let f = 0; f < n; f++) {
      const ia = idx ? idx[f * 3] : f * 3, ib = idx ? idx[f * 3 + 1] : f * 3 + 1, ic = idx ? idx[f * 3 + 2] : f * 3 + 2;
      let u = (uv.getX(ia) + uv.getX(ib) + uv.getX(ic)) / 3, v = (uv.getY(ia) + uv.getY(ib) + uv.getY(ic)) / 3;
      u -= Math.floor(u); v -= Math.floor(v);
      const o = (Math.min(cv.height - 1, Math.floor(v * cv.height)) * cv.width + Math.min(cv.width - 1, Math.floor(u * cv.width))) * 4;
      const r = px[o], gg = px[o + 1], b = px[o + 2];
      let kind = null;
      if (r > 150 && gg < 100 && b < 100) kind = 'red';
      else if (gg > 100 && gg > r * 1.3 && gg > b * 1.05) kind = 'green';
      else if (r > 170 && gg > 90 && b < 120 && r > gg) kind = 'amber?';
      if (!kind) continue;
      A.fromBufferAttribute(pos, ia); B.fromBufferAttribute(pos, ib); C.fromBufferAttribute(pos, ic);
      N.crossVectors(E1.subVectors(B, A), E2.subVectors(C, A)).normalize();
      tris.push({ kind, a: A.clone(), b: B.clone(), c: C.clone(), n: N.clone(), m: A.clone().add(B).add(C).divideScalar(3) });
    }
    const red = tris.filter(x => x.kind === 'red'), green = tris.filter(x => x.kind === 'green');
    if (!red.length || !green.length) return null;
    const normal = new T.Vector3();
    red.forEach(x => normal.add(x.n));
    normal.normalize();
    const centre = (l) => l.reduce((s, x) => s.add(x.m), new T.Vector3()).divideScalar(l.length);
    const rc = centre(red), gc = centre(green.filter(x => x.n.dot(normal) > 0.6)), ac = rc.clone().add(gc).multiplyScalar(0.5);
    let rad = 0;
    red.forEach(x => { rad = Math.max(rad, x.a.distanceTo(rc), x.b.distanceTo(rc), x.c.distanceTo(rc)); });
    rad *= 1.2;
    const sets = {
      red: red.filter(x => x.n.dot(normal) > 0.6),
      green: green.filter(x => x.n.dot(normal) > 0.6 && x.m.distanceTo(gc) < rad),
      amber: tris.filter(x => x.kind === 'amber?' && x.n.dot(normal) > 0.6 && x.m.distanceTo(ac) < rad)
    };
    const res = { normal };
    Object.keys(sets).forEach(k => {
      const l = sets[k];
      if (!l.length) return;
      const arr = new Float32Array(l.length * 9), nor = new Float32Array(l.length * 9), off = normal.clone().multiplyScalar(0.0025);
      l.forEach((x, j) => {
        [x.a, x.b, x.c].forEach((p, q) => {
          arr.set([p.x + off.x, p.y + off.y, p.z + off.z], j * 9 + q * 3);
          nor.set([normal.x, normal.y, normal.z], j * 9 + q * 3);
        });
      });
      const geo = new T.BufferGeometry();
      geo.setAttribute('position', new T.BufferAttribute(arr, 3));
      geo.setAttribute('normal', new T.BufferAttribute(nor, 3));
      res[k] = { geo, c: centre(l) };
    });
    return res;
  }

  window.SO_LIFE = { create };
})();

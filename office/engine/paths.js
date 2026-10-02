/* Sim Office — finding a way: A* on a grid. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- finding a way: A* on a grid of 0.25 over the zone, solids blocked
// Requests wait in a queue and one is served per frame. Paths are smoothed (straight runs where nothing is in the
// way) and end at the exact goal, even when the goal itself is next to a desk. (three-pathfinding was tried on
// 2026-09-27: a navigation mesh of the free cells took 1.3-2.7 s to build per zone, a hitch on every first search,
// so the grid stays.)
const NAV_CELL = 0.25;
let nav = null;
const pathQueue = [];
function navGrid() {
  const key = zoneId + ':' + solids.length;
  if (nav && nav.key === key) return nav;
  const w = Z.walk[2] - Z.walk[0], d = Z.walk[3] - Z.walk[1], nx = Math.max(1, Math.ceil(w / NAV_CELL)), nz = Math.max(1, Math.ceil(d / NAV_CELL));
  const g = { key, nx, nz, x0: Z.walk[0], z0: Z.walk[1], block: new Uint8Array(nx * nz) };
  const r = NPC_R * 0.8, m = Math.ceil(r / NAV_CELL);
  for (let i = 0; i < nx; i++) for (let k = 0; k < nz; k++) if (i < m || k < m || i >= nx - m || k >= nz - m) g.block[k * nx + i] = 1;
  solids.forEach(s => {
    const i0 = Math.max(0, Math.floor((s.x0 - r - g.x0) / NAV_CELL)), i1 = Math.min(nx - 1, Math.floor((s.x1 + r - g.x0) / NAV_CELL));
    const k0 = Math.max(0, Math.floor((s.z0 - r - g.z0) / NAV_CELL)), k1 = Math.min(nz - 1, Math.floor((s.z1 + r - g.z0) / NAV_CELL));
    for (let k = k0; k <= k1; k++) for (let i = i0; i <= i1; i++) {
      const cx = g.x0 + (i + 0.5) * NAV_CELL, cz = g.z0 + (k + 0.5) * NAV_CELL;
      if (cx > s.x0 - r && cx < s.x1 + r && cz > s.z0 - r && cz < s.z1 + r) g.block[k * nx + i] = 1;
    }
  });
  return (nav = g);
}
function requestPath(from, to, opts, cb) {
  const req = { from, to, opts: opts || {}, cb, zone: zoneId, cancelled: false };
  pathQueue.push(req);
  return req;
}
function pathTick() {
  while (pathQueue.length) {
    const r = pathQueue.shift();
    if (r.cancelled || r.zone !== zoneId || !Z) continue;
    let p = null;
    try { p = findPath(r.from, r.to, r.opts); } catch (e) { console.error('Sim Office path:', e); }
    r.cb(p);
    return;                          // one search a frame
  }
}
function findPath(from, to, opts) {
  const g = navGrid(), nx = g.nx, nz = g.nz;
  let block = g.block;
  if (opts.avoid && opts.avoid.length) {            // e.g. the player standing in the way: blocked for this search only
    block = block.slice();
    opts.avoid.forEach(c => {
      for (let k = Math.floor((c.z - c.r - g.z0) / NAV_CELL); k <= Math.floor((c.z + c.r - g.z0) / NAV_CELL); k++)
        for (let i = Math.floor((c.x - c.r - g.x0) / NAV_CELL); i <= Math.floor((c.x + c.r - g.x0) / NAV_CELL); i++)
          if (i >= 0 && k >= 0 && i < nx && k < nz) block[k * nx + i] = 1;
    });
  }
  const cellOf = (x, z) => [clamp(Math.floor((x - g.x0) / NAV_CELL), 0, nx - 1), clamp(Math.floor((z - g.z0) / NAV_CELL), 0, nz - 1)];
  const free = (i, k) => i >= 0 && k >= 0 && i < nx && k < nz && !block[k * nx + i];
  function nearestFree(c) {
    if (free(c[0], c[1])) return c;
    for (let r = 1; r < 14; r++) {
      let best = null, bd = Infinity;
      for (let dk = -r; dk <= r; dk++) for (let di = -r; di <= r; di++) {
        if (Math.max(Math.abs(di), Math.abs(dk)) !== r || !free(c[0] + di, c[1] + dk)) continue;
        const dd = di * di + dk * dk;
        if (dd < bd) { bd = dd; best = [c[0] + di, c[1] + dk]; }
      }
      if (best) return best;
    }
    return null;
  }
  const s = nearestFree(cellOf(from[0], from[1])), e = nearestFree(cellOf(to[0], to[1]));
  if (!s || !e) return null;
  const N = nx * nz, sI = s[1] * nx + s[0], eI = e[1] * nx + e[0];
  const gs = new Float32Array(N).fill(Infinity), came = new Int32Array(N).fill(-1), closed = new Uint8Array(N);
  const heap = [], hf = [];
  const h = (i) => { const dx = Math.abs(i % nx - e[0]), dz = Math.abs(Math.floor(i / nx) - e[1]); return Math.max(dx, dz) + 0.4142 * Math.min(dx, dz); };
  const push = (i, f) => {
    heap.push(i); hf.push(f);
    let c = heap.length - 1;
    while (c > 0) { const p = (c - 1) >> 1; if (hf[p] <= hf[c]) break; [heap[p], heap[c]] = [heap[c], heap[p]]; [hf[p], hf[c]] = [hf[c], hf[p]]; c = p; }
  };
  const pop = () => {
    const top = heap[0], li = heap.pop(), lf = hf.pop();
    if (heap.length) {
      heap[0] = li; hf[0] = lf;
      let c = 0;
      for (;;) {
        const l = c * 2 + 1, r = l + 1;
        let m = c;
        if (l < heap.length && hf[l] < hf[m]) m = l;
        if (r < heap.length && hf[r] < hf[m]) m = r;
        if (m === c) break;
        [heap[m], heap[c]] = [heap[c], heap[m]]; [hf[m], hf[c]] = [hf[c], hf[m]]; c = m;
      }
    }
    return top;
  };
  gs[sI] = 0;
  push(sI, h(sI));
  let found = sI === eI, steps = 0;
  while (heap.length && !found && steps++ < 60000) {
    const cur = pop();
    if (closed[cur]) continue;
    closed[cur] = 1;
    const ci = cur % nx, ck = (cur - ci) / nx;
    for (let dk = -1; dk <= 1; dk++) for (let di = -1; di <= 1; di++) {
      if (!di && !dk) continue;
      const ni = ci + di, nk = ck + dk;
      if (!free(ni, nk)) continue;
      if (di && dk && (!free(ci + di, ck) || !free(ci, ck + dk))) continue;      // no cutting corners
      const n = nk * nx + ni, cost = gs[cur] + (di && dk ? 1.4142 : 1);
      if (cost >= gs[n]) continue;
      gs[n] = cost;
      came[n] = cur;
      if (n === eI) { found = true; break; }
      push(n, cost + h(n));
    }
  }
  if (!found) return null;
  const cells = [];
  for (let c = eI; c !== -1; c = came[c]) { cells.push(c); if (c === sI) break; }
  cells.reverse();
  const pts = cells.map(c => [g.x0 + (c % nx + 0.5) * NAV_CELL, g.z0 + (Math.floor(c / nx) + 0.5) * NAV_CELL]);
  // straighten: from each point, jump to the farthest one in plain sight
  const sight = (a, b) => {
    const d = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.ceil(d / (NAV_CELL * 0.5));
    for (let j = 1; j < n; j++) { const c = cellOf(a[0] + (b[0] - a[0]) * j / n, a[1] + (b[1] - a[1]) * j / n); if (!free(c[0], c[1])) return false; }
    return true;
  };
  const out = [pts[0]];
  for (let i = 0; i < pts.length - 1;) {
    let j = pts.length - 1;
    while (j > i + 1 && !sight(pts[i], pts[j])) j--;
    out.push(pts[j]);
    i = j;
  }
  out.push([to[0], to[1]]);
  if (Math.hypot(out[0][0] - from[0], out[0][1] - from[1]) < NAV_CELL) out.shift();
  return out;
}

/* Sim Office — movement and collision. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- movement and collision
const insideSolid = (x, z) => solids.some(s => x > s.x0 - PLAYER_R && x < s.x1 + PLAYER_R && z > s.z0 - PLAYER_R && z < s.z1 + PLAYER_R);
function freeSpot(a, dist) {     // where to stand to talk to a: in front if free, otherwise to the side or behind
  const f = a.home == null ? a.heading : a.home;
  const B = Z.walk;
  for (const r of [dist, dist + 0.25, dist + 0.5]) {
    for (const turn of [0, 0.6, -0.6, 1.2, -1.2, 1.7, -1.7, 2.4, -2.4, Math.PI]) {
      const x = a.pos.x + Math.sin(f + turn) * r, z = a.pos.z + Math.cos(f + turn) * r;
      if (x < B[0] + PLAYER_R || x > B[2] - PLAYER_R || z < B[1] + PLAYER_R || z > B[3] - PLAYER_R || insideSolid(x, z)) continue;
      if (Object.values(npcActors).some(o => o !== a && Math.hypot(o.pos.x - x, o.pos.z - z) < 0.5)) continue;
      return new T.Vector3(x, 0, z);
    }
  }
  return new T.Vector3(a.pos.x + Math.sin(f) * dist, 0, a.pos.z + Math.cos(f) * dist);
}
function collide(p, noPeople) {
  for (let pass = 0; pass < 2; pass++) {
    for (const s of solids) {
      const x0 = s.x0 - PLAYER_R, x1 = s.x1 + PLAYER_R, z0 = s.z0 - PLAYER_R, z1 = s.z1 + PLAYER_R;
      if (p.x <= x0 || p.x >= x1 || p.z <= z0 || p.z >= z1) continue;
      const dl = p.x - x0, dr = x1 - p.x, dn = p.z - z0, ds = z1 - p.z, m = Math.min(dl, dr, dn, ds);
      if (m === dl) p.x = x0; else if (m === dr) p.x = x1; else if (m === dn) p.z = z0; else p.z = z1;
    }
    if (!noPeople) Object.values(npcActors).forEach(a => {
      const dx = p.x - a.pos.x, dz = p.z - a.pos.z, d = Math.hypot(dx, dz), min = PLAYER_R + NPC_R;
      if (d < min && d > 1e-6) { p.x = a.pos.x + dx / d * min; p.z = a.pos.z + dz / d * min; }
    });
    if (!noPeople) movers.forEach(m => {          // things that move (cars, passers-by): circles set by life.js each frame
      const dx = p.x - m.x, dz = p.z - m.z, d = Math.hypot(dx, dz), min = PLAYER_R + m.r;
      if (d < min && d > 1e-6) { p.x = m.x + dx / d * min; p.z = m.z + dz / d * min; }
    });
  }
  if (Z) {
    p.x = clamp(p.x, Z.walk[0] + PLAYER_R, Z.walk[2] - PLAYER_R);
    p.z = clamp(p.z, Z.walk[1] + PLAYER_R, Z.walk[3] - PLAYER_R);
  }
}
const movers = [];
const nextPos = new T.Vector3();
function playerTick(dt) {
  if (!player) return;
  const locked = state !== 'play' || busy;
  const inp = locked ? { fwd: 0, turn: 0, run: false } : readInput();
  if (inp.fwd) player.sit = false;
  if (inp.turn) player.heading += inp.turn * TURN * dt;
  const tired = G && G.energy < 20 ? (G.energy <= 0 ? 0.45 : 0.65) : 1;
  const speed = inp.fwd * (inp.run && inp.fwd > 0 ? RUN : WALK) * tired;
  if (speed) {
    nextPos.set(player.pos.x + Math.sin(player.heading) * speed * dt, 0, player.pos.z + Math.cos(player.heading) * speed * dt);
    collide(nextPos);
    player.pos.copy(nextPos);
  }
  if (player.want != null) {         // turning to face someone
    let d = player.want - player.heading;
    d = Math.atan2(Math.sin(d), Math.cos(d));
    player.heading += d * (1 - Math.exp(-dt * 8));
    if (Math.abs(d) < 0.01) player.want = null;
  }
  locomotion(player, speed);
  player.holder.rotation.y = player.heading;
  if (player.mixer) player.mixer.update(dt);
}
const NPC_WALK = 1.0, GESTURES = ['emote-yes', 'interact-right', 'pick-up'];
function npcTick(dt, t) {
  Object.values(npcActors).forEach(a => {
    let want = a.home;
    const talking = talk && talk.actor === a;
    const toP = player ? Math.hypot(player.pos.x - a.pos.x, player.pos.z - a.pos.z) : 99;
    const faceP = player ? Math.atan2(player.pos.x - a.pos.x, player.pos.z - a.pos.z) : 0;
    if (a.walk) want = walkStep(a, dt, talking, toP, faceP);
    else if (player && (talking || (toP < 2.4 && !a.sit))) want = faceP;
    if (want != null) {
      let d = want - a.heading;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      a.heading += d * (1 - Math.exp(-dt * (a.walk ? 8 : 5)));
    }
    a.holder.rotation.y = a.heading;
    if (a.mark) { a.mark.position.y = MARK_Y + Math.sin(t * 3 + a.pos.x) * 0.03; a.mark.material.opacity = talking ? 0 : 1; a.mark.material.transparent = true; }
    // now and then: a gesture when standing (every 20 to 40 s), a glance around when sitting; a seated person looks at you
    if (!a.walk && !talking && a.mixer) {
      if (a.sit) {
        if (toP < 2.4) { let d = faceP - a.heading; d = Math.atan2(Math.sin(d), Math.cos(d)); a.look = clamp(d, -0.9, 0.9); a.lookAt = t + 3; }
        else if (t > (a.lookAt || 0)) { a.look = Math.random() < 0.4 ? 0 : (Math.random() - 0.5) * 1.1; a.lookAt = t + 5 + Math.random() * 9; }
      } else {
        a.look = 0;
        if (t > (a.gestureAt || (a.gestureAt = t + 10 + Math.random() * 25)) && state !== 'talk') {
          a.gestureAt = t + 20 + Math.random() * 20;
          const list = (a.cup ? ['emote-yes'] : GESTURES).filter(n => a.actions[n]);
          if (list.length && !gesturing(a)) play(a, anyOf(list), { once: true, fade: 0.3 });
        }
      }
    } else a.look = 0;
    animate(a, dt);
  });
}
// one step along the way; stops for the player in front (and after a while looks for a way around)
function walkStep(a, dt, talking, toP, faceP) {
  const w = a.walk;
  if (!w.path || talking) { locomotion(a, 0); return talking ? faceP : null; }
  const p = w.path[w.i];
  let dx = p[0] - a.pos.x, dz = p[1] - a.pos.z, d = Math.hypot(dx, dz);
  if (d < 0.03) {
    w.i++;
    if (w.i >= w.path.length) { arrive(a); return a.home; }
    return null;
  }
  dx /= d; dz /= d;
  let stop = false;
  if (player && toP < PLAYER_R + NPC_R + 0.35) {
    const ahead = ((player.pos.x - a.pos.x) * dx + (player.pos.z - a.pos.z) * dz) / (toP || 1);
    stop = ahead > 0.2;
  }
  if (stop) {
    w.blocked += dt;
    locomotion(a, 0);
    if (w.blocked > 2.5 && !w.req) {            // still in the way: go round
      w.blocked = 0;
      const goal = w.to;
      w.req = requestPath([a.pos.x, a.pos.z], goal, { avoid: [{ x: player.pos.x, z: player.pos.z, r: 0.45 }] }, (path) => {
        if (a.walk !== w) return;
        w.req = null;
        if (path) { w.path = path; w.i = 0; }
      });
    }
    return faceP;
  }
  w.blocked = Math.max(0, w.blocked - dt);
  const step = Math.min(d, NPC_WALK * dt);
  a.pos.x += dx * step;
  a.pos.z += dz * step;
  locomotion(a, NPC_WALK);
  return Math.atan2(dx, dz);
}
function portalTick() {
  if (!Z || !player || busy || state !== 'play') return;
  const inside = portalsOf(Z).find(p => {
    const w = (p.size || [1, 1])[0] / 2, d = (p.size || [1, 1])[1] / 2;
    return Math.abs(player.pos.x - p.at[0]) <= w && Math.abs(player.pos.z - p.at[1]) <= d;
  });
  if (!inside) { portalArmed = true; return; }
  if (!portalArmed) return;
  portalArmed = false;
  if (inside.when && !inside.when(api)) return;
  if (TRAVEL_ZONES.includes(inside.to) && !TRAVEL_ZONES.includes(zoneId) && !tripToday()) { toast('No trip scheduled.', '예정된 출장이 없어요.'); return; }
  if (closedNow(inside.to) && shutAllDay(inside.to)) { const zn = zoneName(inside.to), hol = holidayOf(G.day); toast(`${zn[0]} is closed today${hol ? ` for ${hol.name}` : ''}.`, `${zn[1] || zn[0]}은(는) 오늘 ${hol ? josa(loc(hol), '이라', '라') + ' ' : ''}문을 열지 않아요.`, 'bad', 4); return; }
  if (closedNow(inside.to)) { const zn = zoneName(inside.to); toast(`${zn[0]} is closed. Hours: ${hoursText(inside.to)}`, `${zn[1] || zn[0]}은(는) 문을 닫았어요. 영업시간 ${hoursText(inside.to)}`, 'bad', 4); return; }
  const pid = portalPlace(inside), fares = pid ? faresAt(pid) : [];
  const fare = fares.reduce((t, i) => t + +i.price, 0);
  if (fare && G.money < fare) { toast(`You can't afford the fare (${usd2(fare)}).`, '요금이 부족해요.', 'bad'); return; }
  fares.forEach(i => pay(-i.price, i.name, 'spend', { ko: i.name_ko }));
  if (fare) toast(`Paid ${usd2(fare)}: ${fares.map(i => i.name).join(', ')}`, `${usd2(fare)} 냈어요: ${fares.map(i => loc(i)).join(', ')}`);
  let flight = 0;
  if (zoneId === 'airport' && inside.to === 'hotel') { flight = 120; G.trip = true; }
  if (zoneId === 'airport' && !TRAVEL_ZONES.includes(inside.to) && G.trip) { flight = 120; G.trip = false; }
  travel(inside.to, inside.arrive, null, flight);
}
function tripToday() { return episodes().some(e => !G.done[e.id] && dayIn(e) && TRAVEL_ZONES.includes(zoneOfPlace(e.place))); }
function portalPlace(p) {        // the place a portal belongs to: the nearest one in this zone
  let best = null, bd = 3;
  Object.keys(Z.places).forEach(pid => { const a = Z.places[pid].at; const d = a ? Math.hypot(a[0] - p.at[0], a[1] - p.at[1]) : 9; if (d < bd) { bd = d; best = pid; } });
  return best;
}
async function travel(z, arrive, at, minutes) {
  if (!z) return;
  if (z === 'office' && zoneId !== 'office' && fired()) { stoppedAtDoor(); return; }          // let go: the badge no longer opens the door
  if (zoneId === 'office' && z !== 'office' && state === 'play') leftOffice(z);
  if (G && zoneId === hero().home_zone && z !== zoneId && state === 'play') leftHome(z);          // hybrid work: out of home while logged in
  if (minutes) advanceMinutes(minutes);
  if (state !== 'play') return;
  // through a door: the camera leans in on you as the screen darkens, and pulls back out in the new place
  busy = true;
  cam.push = { t: 0, dur: 0.34 };
  $('fade').classList.add('on');
  if (!fastMode) await new Promise(r => setTimeout(r, 300));
  cam.push = null;
  if (await enterZone(z, arrive, at)) cam.pull = { t: 0, dur: 0.75 };
  const zn = zoneName(z);
  if (z === 'office' && checkedIn) {        // the first time in today (enterZone: arrived)
    const kind = checkedIn;
    checkedIn = null;
    if (kind !== 'on') return;
    if (G.minute <= hm(CFG.work_start, 540)) { toast(`${zn[0]} · ${clock(G.minute)}. You're on time.`, `${zn[1] || zn[0]} · ${clockKo(G.minute)}. 제시간에 왔어요.`, 'good', 3); return; }
  }
  if (z === 'office' && !npcsIn(z).length) {
    if (isWeekend(G.day)) toast("It's the weekend. Nobody is in the office.", '주말이라 사무실에 아무도 없어요.', null, 4);
    else if (companyOff(G.day)) toast("It's a company holiday. Nobody is in the office.", '회사 휴일이라 사무실에 아무도 없어요.', null, 4);
    else toast('The office is empty. Everyone has gone home.', '사무실이 비었어요. 모두 퇴근했어요.', null, 4);
    return;
  }
  if (minutes) toast(`After a ${minutes / 60}-hour flight: ${zn[0]}`, `${minutes / 60}시간 비행 후: ${zn[1] || zn[0]}`, null, 3);
  else toast(zn[0], zn[1], null, 2.2);
}

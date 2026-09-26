/* XV. The Geographer — the sixth planet: an old scholar at a desk with an enormous register. He records mountains
   and oceans but never goes to see them; that is the explorers' work. So between the first two scenes the prince
   becomes his explorer: he visits the mountain (bringing back a stone as proof), the ocean and the town of this
   planet the geographer has never walked over. The last scene sends him on to the Earth, low in the sky. */
(function () {
  const OCEAN = [-2.1, 1.5], OCEAN_R = 0.55, TOWN = [0.7, 3.4], DEPART = [-3.3, -0.4];
  const PLACES = {
    mountain: { at: 'mountain', radius: 1.2, label: 'Take a stone',
      say: 'A mountain, with snow on top! I will take a stone as proof.', anim: 'pick-up' },
    ocean: { at: OCEAN, radius: 1.0, label: 'Look',
      say: 'An ocean! A small one, but very blue.', anim: 'emote-yes' },
    town: { at: TOWN, radius: 1.2, label: 'Look',
      say: 'A town, with a church tower and little red roofs.', anim: 'emote-yes' }
  };
  const found = new Set();
  let oceanUp, earth, earthHalo, marker, glow = 0;

  // a thin cap of the sphere around `up`: water, a sandy shore and an ink rim
  function cap(g, up, angle, lift, color, basic) {
    const T = g.T;
    const geo = new T.SphereGeometry(g.R + lift, 48, 6, 0, Math.PI * 2, 0, angle);
    const m = new T.Mesh(geo, basic ? new T.MeshBasicMaterial({ color }) : g.toon(color));
    m.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), up);
    g.scene.add(m);
    return m;
  }

  LP_GAME.level({
    models: ['prince', 'geographer', 'desk', 'ledger', 'books', 'mountain', 'house', 'tower', 'tree', 'nature'],
    world: {
      radius: 3, ground: '#b9b48e', sun: 75, planets: true, stars: 0.35,
      sky: { night: '#5d74b8', dusk: '#7d98d4' },   // a day planet: the side away from the sun stays blue
      tint: { grass: '#7f9f5c', rock: '#a29d8a', rockDark: '#8a8573', stone: '#b0ab98' },
      scatter: [
        { model: 'tree', count: 7, scale: 1.1 },
        { model: 'nature', node: 'rock_smallC', count: 6, scale: 0.5 },
        { model: 'nature', node: 'stone_smallB', count: 5, scale: 0.45 },
        { model: 'nature', node: 'rock_smallFlatA', count: 4, scale: 0.6 },
        { model: 'nature', node: 'grass', count: 18, scale: 0.6 },
        { model: 'nature', node: 'grass_large', count: 8, scale: 0.6 },
        { model: 'nature', node: 'grass_leafs', count: 12, scale: 0.8 }
      ]
    },
    player: { model: 'prince', at: [0.9, -2.3], face: 'desk' },
    props: {
      desk: { model: 'desk', at: [0, 0], scale: 0.9, turn: -90, solid: 0.36, shadow: 0.34 },
      ledger: { model: 'ledger', at: [0, 0.02], scale: 1.0, turn: -90, lift: 0.29, clear: 0 },
      proof: { model: 'nature', node: 'rock_smallC', at: [-0.2, -0.04], scale: 0.16, lift: 0.29, hidden: true, clear: 0 },
      booksL: { model: 'books', at: [-0.55, 0.28], scale: 1.1, turn: 20, solid: 0.2, shadow: 0.2 },
      booksR: { model: 'books', at: [0.56, 0.2], scale: 0.9, turn: -35, solid: 0.18, shadow: 0.17 },
      mountain: { model: 'mountain', at: [2.3, 1.1], scale: 1.1, turn: 30, solid: 0.45, clear: 0.9 },
      // the ocean is drawn in setup(); this invisible speck only makes it solid and keeps the scatter off it
      ocean: { model: 'tree', at: OCEAN, scale: 0.001, solid: OCEAN_R - 0.05, clear: OCEAN_R + 0.35, ink: 0 },
      house1: { model: 'house', at: [TOWN[0] - 0.36, TOWN[1] - 0.08], scale: 1.7, turn: 200 },
      house2: { model: 'house', at: [TOWN[0] + 0.38, TOWN[1] - 0.16], scale: 1.6, turn: 160 },
      house3: { model: 'house', at: [TOWN[0] + 0.08, TOWN[1] + 0.4], scale: 1.7, turn: 180 },
      house4: { model: 'house', at: [TOWN[0] - 0.46, TOWN[1] + 0.44], scale: 1.5, turn: 230 },
      tower: { model: 'tower', at: [TOWN[0] + 0.02, TOWN[1] + 0.04], scale: 1.7, turn: 180, solid: 0.6, clear: 0.9 }
    },
    cast: {
      geo: { model: 'geographer', name: 'The geographer', scale: 1.15, at: [0, 0.3], face: [0, -2], bubble: 0.9, solid: 0.3,
        talkRadius: 1.1, voice: { pitch: 0.7, rate: 0.85 }, talkAnim: 'interact-right',
        chat: () => found.size < 3
          ? ['Well? What have you seen?', 'Mountains, oceans, towns… I write down only what lasts.', 'Bring me proof, explorer!']
          : ['Come here and tell me everything!'] }
    },
    speakers: { 'The geographer': 'geo' },
    steps: [
      { goal: ['An old gentleman sits at a desk with an enormous book. Walk to him and talk to him.',
        '큰 책을 펼친 노신사가 책상에 앉아 있습니다. 다가가서 말을 걸어 보세요.'], talk: 'geo', scene: 0 },
      {
        goal: ['He has never seen his own planet: a geographer does not go exploring. Be his explorer! Visit the mountain, the ocean and the town. For the mountain, he wants a stone as proof.',
          '지리학자는 자기 별을 한 번도 본 적이 없습니다. 지리학자는 탐험하러 다니지 않으니까요. 당신이 탐험가가 되어 산과 바다와 마을을 찾아가 보세요. 산에서는 증거로 돌을 하나 가져오래요.'],
        enter(g) {
          found.clear();
          g.say('geo', 'My own planet? I have never looked. Go and see for me!', 3.5);
          Object.entries(PLACES).forEach(([id, p]) => g.hotspot(id, {
            at: p.at, radius: p.radius, label: p.label,
            when: () => !found.has(id),
            action(g2) {
              found.add(id);
              g2.play('player', p.anim, { once: true });
              g2.say('player', p.say, 3.2);
            }
          }));
        },
        quest: () => found.size / 3,
        meter: () => `Explored ${found.size} / 3`,
        leave(g) { Object.keys(PLACES).forEach(id => g.hotspot(id, null)); },
        skip() { Object.keys(PLACES).forEach(id => found.add(id)); }
      },
      {
        goal: ['You have seen it all. Go back to the geographer and report.', '다 둘러봤어요. 지리학자에게 돌아가 보고하세요.'],
        talk: 'geo', scene: 1,
        opened(g) { g.show('proof', true); }
      },
      {
        scene: 2, with: 'geo', delay: 1.6,
        enter(g) { g.say('player', 'My flower… she has only four thorns.', 2.4); }
      },
      {
        goal: ['Set off for the Earth! Walk toward the blue planet low in the sky.', '지구로 떠나세요! 하늘 낮은 곳의 푸른 별 쪽으로 걸어가세요.'],
        at: DEPART, radius: 0.6,
        enter(g) { glow = 1; marker.visible = true; },
        leave(g) { g.say('geo', 'Good luck, explorer!', 2.5); g.play('player', 'emote-yes', { once: true }); }
      }
    ],
    setup(g) {
      const T = g.T;
      oceanUp = g.at(OCEAN);
      const a = OCEAN_R / g.R;
      cap(g, oceanUp, a + 0.03, 0.004, 0x2b2a33, true);
      cap(g, oceanUp, a + 0.022, 0.007, '#e3d3a0');
      cap(g, oceanUp, a, 0.011, '#4f8fc8');
      cap(g, oceanUp, a * 0.45, 0.013, '#6aa8dc');

      // the Earth, low over the horizon beyond the place to set off from
      const du = g.at(DEPART);
      const out = g.tangent(du, du.clone().sub(new T.Vector3(0, 1, 0)));
      const dir = out.addScaledVector(du, 0.22).normalize();
      earth = new T.Group();
      earth.position.copy(g.ground(du)).addScaledVector(dir, 60);
      earth.add(new T.Mesh(new T.SphereGeometry(4, 32, 20), g.toon('#4d86c4')));
      earth.add(new T.Mesh(new T.SphereGeometry(4.12, 32, 20), new T.MeshBasicMaterial({ color: 0x2b2a33, side: T.BackSide })));
      [[0.5, 0.6, 0.62, 1.7], [-0.7, 0.2, 0.68, 1.4], [0.1, -0.7, 0.7, 1.2], [-0.2, 0.85, -0.5, 1.0]].forEach(([x, y, z, s]) => {
        const land = new T.Mesh(new T.SphereGeometry(s, 16, 10), g.toon('#78a55a'));
        land.position.set(x, y, z).normalize().multiplyScalar(4 - s * 0.55);
        earth.add(land);
      });
      g.scene.add(earth);
      earthHalo = g.halo(du, 0, 1);
      earthHalo.position.copy(earth.position);
      earthHalo.scale.setScalar(16);
      earthHalo.material.opacity = 0.25;
      marker = g.halo(DEPART, 0.08, 0.7);
      marker.material.opacity = 0.9;
      marker.visible = false;
    },
    update(g, dt) {
      earth.rotation.y += dt * 0.05;
      if (glow) { glow += dt; earthHalo.material.opacity = 0.35 + 0.2 * Math.sin(glow * 2.5); marker.scale.setScalar(0.6 + 0.15 * Math.sin(glow * 4)); }
    },
    done: {
      en: 'The geographer taught you a new word, "ephemeral", and it made you think of your flower. Still, you set off for the planet he recommended: the Earth.',
      ko: '지리학자에게서 "덧없다(ephemeral)"라는 새 낱말을 배웠고, 그 말에 당신의 꽃이 떠올랐습니다. 그래도 당신은 그가 권한 별, 지구로 길을 떠납니다.'
    },
    free: ['Walk round the geographer\'s planet as long as you like.', '지리학자의 별을 마음껏 걸어 다녀 보세요.']
  });
})();

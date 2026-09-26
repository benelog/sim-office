/* XIV. The Lamplighter — the smallest planet: one street lamp, one lamplighter. A day lasts one minute; he lights
   the lamp at every dusk and puts it out at every dawn. Between the two scenes the prince tries what the second one
   is about: keeping up with the sun by walking slowly round the planet. */
(function () {
  const QUEST = 40;           // seconds of sunshine without a break: longer than half a day, so standing still fails
  let lampOn = false, busy = 0, light, halo, sun = 0, warned = false;

  LP_GAME.level({
    models: ['prince', 'lamplighter', 'lamp', 'nature'],
    world: {
      radius: 2, ground: '#a3a8c0', day: 60, sun: 140, planets: true,
      scatter: [
        { model: 'nature', node: 'craterLarge', count: 3, scale: 0.85, flat: 0.5, sink: 0.02 },
        { model: 'nature', node: 'crater', count: 6, scale: 0.65, flat: 0.5, sink: 0.02 },
        { model: 'nature', node: 'rock_smallC', count: 5, scale: 0.55 },
        { model: 'nature', node: 'stone_smallB', count: 5, scale: 0.45 },
        { model: 'nature', node: 'rock_smallFlatA', count: 4, scale: 0.6 },
        { model: 'nature', node: 'stone_smallFlatA', count: 4, scale: 0.6 },
        { model: 'nature', node: 'grass', count: 12, scale: 0.6 },
        { model: 'nature', node: 'grass_large', count: 6, scale: 0.6 },
        { model: 'nature', node: 'grass_leafs', count: 10, scale: 0.8 }
      ]
    },
    player: { model: 'prince', at: [-2.1, 0], face: 'lamp' },
    props: { lamp: { model: 'lamp', at: [0, 0], scale: 1.15, solid: 0.3, shadow: 0.16, lift: -0.02 } },
    cast: {
      keeper: { model: 'lamplighter', name: 'The lamplighter', scale: 1.18, at: [0.48, 0], face: 'lamp', bubble: 0.95, solid: 0.42,
        voice: { pitch: 0.75, rate: 0.9 } }
    },
    steps: [
      { goal: ['Walk to the lamplighter and talk to him.', '점등인에게 걸어가 말을 걸어 보세요.'], talk: 'keeper', scene: 0 },
      {
        goal: ['His day lasts one minute, and the planet is so small you can walk round it. Try it: stay in the sunshine for 40 seconds. Walk toward the setting sun!',
          '이 별의 하루는 1분이고, 별이 아주 작아서 걸어서 한 바퀴 돌 수 있습니다. 직접 해 보세요: 40초 동안 햇빛 속에 머물러 보세요. 지는 해를 향해 걸어가세요!'],
        enter() { sun = 0; warned = false; },
        quest(g, dt) {
          if (g.dayness(g.player.up) > 0.02) {
            sun += dt;
            if (warned && sun > 1) { warned = false; g.goal(this.goal[0], this.goal[1]); }
          } else {
            if (sun > 3 && !warned) { warned = true; g.goal('Night caught up with you. Walk toward the setting sun and try again.', '밤이 따라왔어요. 지는 해 쪽으로 걸어가서 다시 해 보세요.', true); }
            sun = 0;
          }
          return sun / QUEST;
        },
        meter: (g) => `☀ ${Math.floor(sun)} / ${QUEST} s`,
        leave(g) { g.play('player', 'emote-yes', { once: true }); g.say('player', 'I walked with the sun!', 2.5); },
        skip() { sun = QUEST; }
      },
      { goal: ['You kept up with the sun! Go back and tell the lamplighter how he could rest.', '해를 따라잡았어요! 점등인에게 돌아가 쉬는 방법을 알려 주세요.'], talk: 'keeper', scene: 1 }
    ],
    setup(g) {
      light = g.light('lamp', 1.1, 0xffc873, 0);
      halo = g.halo('lamp', 1.1, 0.8);
      lampOn = g.dayness('lamp') < 0.02;
      g.glow('lamp', 'glass', lampOn);
    },
    update(g, dt) {
      // the lamplighter follows the orders: light at dusk, put out at dawn
      const want = g.dayness('lamp') < 0.02;
      busy -= dt;
      if (want !== lampOn && busy <= 0) {
        busy = 1.2;
        const k = g.cast.keeper;
        g.face(k, 'lamp');
        g.play(k, 'interact-right', { once: true, speed: 0.7 });
        setTimeout(() => { lampOn = want; g.glow('lamp', 'glass', lampOn); g.face(k, null); }, 450);
        if (g.state !== 'talk') g.say(k, want ? 'Good evening.' : 'Good morning.', 2);
      }
      const k = 1 - Math.exp(-dt * 6);
      light.intensity += ((lampOn ? 2.2 : 0) - light.intensity) * k;
      halo.material.opacity += ((lampOn ? 0.6 : 0) - halo.material.opacity) * k;
    },
    done: {
      en: 'Of all the grown-ups you have met, the lamplighter is the one who cares for something other than himself. You would like to stay, but his little planet has no room for a second person.',
      ko: '지금까지 만난 어른 가운데 점등인만이 자기 아닌 것을 돌봅니다. 머물고 싶지만, 이 작은 별에는 한 사람이 더 있을 자리가 없습니다.'
    },
    free: ['Walk round the planet as long as you like.', '마음껏 별을 걸어 다녀 보세요.']
  });
})();

/* Diner: the Sunny Side Diner on Main Street, one room of 12 x 8. The door is at the west end of the south
   wall. A long counter with bar stools runs along the north side with plates of food on it; Rosa works
   behind it (diner_counter), in front of a glass partition with the kitchen (stoves, fridge, sink) behind.
   Four tables with two chairs each fill the dining room; the one by the south windows is where you sit to
   order a meal (diner_table). */
(function () {
  var K = SO_ZONE_KIT;
  function f(node, x, z, turn, extra) { return K.prop('furniture', node, x, z, turn, extra); }
  function food(node, x, z, turn, extra) { return K.prop('food', node, x, z, turn, extra); }
  function c(node, x, z, turn, extra) { return K.prop('city', node, x, z, turn, extra); }
  function r(node, x, z, turn, extra) { return K.prop('roads', node, x, z, turn, extra); }
  function car(node, x, z, turn, extra) { return K.prop('cars', node, x, z, turn, extra); }
  var BAR = 0.42, TABLE = 0.33;
  var props = [];
  function add(list) { props = props.concat(list); }

  add(K.walls(12, 8, { n: 'wwwwwwwwwwww', s: 'wDwWWwwWWwWw', w: 'wwWWww', e: 'wwWWww' }));

  // ----- kitchen behind a glass partition
  add(K.wallLine(-1, -2.6, 'x', 'wWWWWWw', 180, true));
  add([
    f('kitchenFridge', -0.5, -3.83, 0, { solid: 'fit' }),
    f('kitchenCabinet', 0.2, -3.76, 0, { solid: 'fit' }),
    f('kitchenStove', 0.63, -3.76, 0, { solid: 'fit' }),
    f('kitchenStove', 1.06, -3.76, 0, { solid: 'fit' }),
    f('kitchenCabinet', 1.49, -3.76, 0, { solid: 'fit' }),
    f('kitchenSink', 1.92, -3.76, 0, { solid: 'fit' }),
    f('kitchenCabinet', 2.35, -3.76, 0, { solid: 'fit' }),
    f('kitchenFridge', 3.2, -3.83, 0, { solid: 'fit' }),
    f('kitchenCabinet', 3.63, -3.76, 0, { solid: 'fit' }),
    f('kitchenMicrowave', 3.63, -3.8, 0, { lift: 0.45 }),
    f('hoodModern', 0.85, -3.86, 0, { lift: 0.8 }),
    food('meat-patty', 0.63, -3.7, 0, { lift: 0.45, scale: 0.35 }),
    food('bacon', 1.06, -3.7, 0, { lift: 0.45, scale: 0.35 }),
    food('pizza-box', 4.6, -3.7, 0, { solid: 'fit', scale: 0.6 })
  ]);

  // ----- the counter, stools and food
  for (var i = 0; i < 10; i++) add([f('kitchenBar', 0.2 + 0.43 * i, -1.6, 0, { solid: 'fit' })]);
  [0.5, 1.3, 2.1, 2.9, 3.7].forEach(function (x) { add([f('stoolBar', x, -1.12, 0)]); });
  add([
    f('kitchenCoffeeMachine', 4.1, -1.65, 0, { lift: BAR }),
    food('cup-coffee', 3.7, -1.55, 0, { lift: BAR, scale: 0.35 }),
    food('pancakes', 2.9, -1.58, 0, { lift: BAR, scale: 0.4 }),
    food('burger', 2.1, -1.58, 0, { lift: BAR, scale: 0.4 }),
    food('fries', 2.3, -1.6, 0, { lift: BAR, scale: 0.4 }),
    food('soda', 1.3, -1.6, 0, { lift: BAR, scale: 0.35 }),
    food('bottle-ketchup', 1.55, -1.65, 0, { lift: BAR, scale: 0.4 }),
    food('donut-sprinkles', 0.4, -1.6, 0, { lift: BAR, scale: 0.4 }),
    food('muffin', 0.65, -1.62, 0, { lift: BAR, scale: 0.35 }),
    f('radio', 4.6, -1.62, 0, { lift: BAR }),
    f('televisionModern', 5.92, -1.5, 270, { lift: 0.6 }),
    f('pottedPlant', 5.6, -1.2, 0, { solid: 'fit' })
  ]);

  // ----- four tables
  [[-2.8, -2.2], [-2.8, 0.6], [0.9, 2.4], [3.6, 2.4]].forEach(function (t, n) {
    add([
      f('table', t[0], t[1], 0, { solid: 'fit' }),
      f('chair', t[0], t[1] - 0.38, 0),
      f('chair', t[0], t[1] + 0.38, 180),
      food(['bottle-ketchup', 'glass', 'bottle-ketchup', 'glass'][n], t[0] + 0.28, t[1] - 0.05, 0, { lift: TABLE, scale: 0.35 })
    ]);
  });
  add([
    food('plate-dinner', -2.8, 0.55, 0, { lift: TABLE, scale: 0.4 }),
    food('sandwich', 3.55, 2.4, 0, { lift: TABLE, scale: 0.4 }),
    f('pottedPlant', -5.6, -3.6, 0, { solid: 'fit' }),
    f('pottedPlant', -5.6, 3.6, 0, { solid: 'fit' }),
    f('pottedPlant', 5.6, 3.6, 0, { solid: 'fit' }),
    f('coatRackStanding', -3.6, 3.55, 0, { solid: 'fit' }),
    f('rugDoormat', -4.5, 3.3, 0),
    // plants by the front windows and on two tables
    f('pottedPlant', -1.6, 3.72, 0, { solid: 'fit' }),
    f('pottedPlant', 2.3, 3.72, 0, { solid: 'fit' }),
    f('plantSmall2', -2.95, -2.25, 0, { lift: TABLE }),
    f('plantSmall3', 0.75, 2.45, 0, { lift: TABLE })
  ]);

  // ----- outside: Main Street in front (south), the neighbours on both sides, the alley behind
  add([
    c('building-c', 8.3, 0.3, 0), c('building-f', -8.4, 0.2, 0),
    c('building-d', -7.0, 13.6, 180), c('building-h', -1.5, 13.6, 180), c('building-b', 4.0, 13.6, 180), c('low-detail-building-wide-a', 9.5, 13.8, 180),
    c('low-detail-building-g', -2.5, -9.5, 0), c('low-detail-building-wide-b', 4.5, -9.8, 0),
    r('dumpster', 1.2, -5.6, 0), r('light-square', -2.5, 5.9, 0), r('light-square', 4.5, 5.9, 0),
    car('sedan', -0.6, 7.3, 90), car('taxi', 6.6, 7.3, 90), car('hatchback-sports', -6.2, 9.7, 270),
    c('tree-small', 1.8, 11.6, 0), c('tree-small', -4.4, 11.6, 0)
  ]);

  SO_ZONES.diner = {
    name: 'Sunny Side Diner', name_ko: '서니 사이드 식당',
    indoor: true,
    size: [12, 8],
    floor: '#c9b8a0',
    props: props,
    places: {
      diner_counter: { at: [2.1, -2.1], face: [2.1, -1.0] },
      diner_table: { at: [0.9, 2.02], face: [0.9, 2.4], sit: true },
      diner_door: { at: [-4.4, 2.4], face: [-3.0, 1.2] }
    },
    portals: [
      { at: [-4.5, 3.7], size: [0.9, 0.5], to: 'city', arrive: 'diner_door', label: 'Leave the diner', label_ko: '식당에서 나가기' }
    ],
    spawn: 'diner_door',
    lights: [
      { at: [2, -1], height: 1.2, color: '#ffe0b0', intensity: 1.1 },
      { at: [-2.5, 1], height: 1.2, color: '#ffe0b0', intensity: 1.0 },
      { at: [2.5, 2.5], height: 1.2, color: '#ffe0b0', intensity: 0.9 }
    ],
    ambient: 0.9,
    background: '#bcd7ec',
    outside: '#c9c6bf',
    setup: function (api) {
      K.dress(api, {
        floor: { pattern: 'check', a: '#f2ecdd', b: '#b8433a' },
        floors: [{ pattern: 'tile', a: '#dcdcd6', b: '#a9a79f', rect: [-1, -4, 6, -2.6] }],
        walls: { color: '#f6e6bd', trim: '#c0392b', base: '#7e2a23' },
        ground: { pattern: 'asphalt', strips: [
          { pattern: 'sidewalk', rect: [-80, 4.02, 80, 6.4] }, { pattern: 'road', rect: [-80, 6.4, 80, 10.6] },
          { pattern: 'sidewalk', rect: [-80, 10.6, 80, 12.4] }, { pattern: 'sidewalk', rect: [-80, -80, -6.02, 6.4] }, { pattern: 'sidewalk', rect: [6.02, -80, 80, 6.4] }] },
        skyline: { kind: 'city', seed: 11 },
        panels: [
          { kind: 'sign', wall: 'w', along: -3.0, y: 0.95, w: 1.6, h: 0.42, text: 'Sunny Side Diner', sub: 'Breakfast all day', bg: '#c0392b', fg: '#fff6d8', border: '#ffd166', frame: '#7e2a23' },
          { kind: 'menu', at: [2.1, -2.55], turn: 0, y: 1.0, w: 1.7, h: 0.5, frame: '#6b4a2f', text: 'TODAY', items: [['Pancake stack', '$7.50'], ['Club sandwich', '$9.25'], ['Burger & fries', '$11.00']] },
          { kind: 'tv', at: [5.853, -1.5], turn: 270, y: 0.885, w: 0.6, h: 0.33, depth: 0, game: true, a: '#6fb1e0', b: '#9fd0f0', text: 'FVW 2 - 1 RDG' },
          { kind: 'poster', wall: 'e', along: 1.0, y: 0.85, w: 0.45, h: 0.6, frame: '#ffffff', text: 'Pie of the Day', lines: ['Apple, a la mode', '$4.50 a slice'], band: '#e76f51' },
          { kind: 'photo', wall: 'e', along: 3.0, y: 0.85, w: 0.6, h: 0.42, frame: '#6b4a2f', sky: '#f0b27a' }
        ]
      });
    },
    update: function (api) { K.tick(api); }
  };
})();

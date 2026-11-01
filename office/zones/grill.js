/* Grill: the Harbor Grill, the seafood restaurant next to the diner on Maple Street downtown, one room of 12 x 8.
   The door is at the west end of the south wall, with the host stand (grill_host) just inside. A bar runs along the
   north side, Theo behind it (grill_bar) in front of the bottles. Tables with cloths fill the dining room; you sit at
   the one by the south windows, facing the harbor across the street, and order there (grill_table): a server comes to
   you, unlike at the diner's counter. */
(function () {
  var K = SO_ZONE_KIT;
  function f(node, x, z, turn, extra) { return K.prop('furniture', node, x, z, turn, extra); }
  function food(node, x, z, turn, extra) { return K.prop('food', node, x, z, turn, extra); }
  function c(node, x, z, turn, extra) { return K.prop('city', node, x, z, turn, extra); }
  function r(node, x, z, turn, extra) { return K.prop('roads', node, x, z, turn, extra); }
  function car(node, x, z, turn, extra) { return K.prop('cars', node, x, z, turn, extra); }
  var BAR = 0.42, TABLE = 0.33, BACK = 0.45;
  var props = [];
  function add(list) { props = props.concat(list); }

  add(K.walls(12, 8, { n: 'wwwwwwwwwwww', s: 'wDwWWwwWWwWw', w: 'wwWWwwww', e: 'wwWWwwww' }));

  // ----- the bar: a wall closes it off from the dining room at the west end, the east end meets the wall
  add(K.wallLine(-0.15, -4, 'z', 'ww', 90, true));
  for (var i = 0; i < 14; i++) add([f('kitchenBar', 0.2 + 0.43 * i, -2.0, 0, { solid: 'fit' })]);
  [0.6, 1.5, 2.4, 3.3, 4.2, 5.1].forEach(function (x) { add([f('stoolBar', x, -1.52, 0)]); });
  for (var j = 0; j < 13; j++) add([f('kitchenCabinet', 0.4 + 0.43 * j, -3.76, 0, { solid: 'fit' })]);
  add([
    food('soda-bottle', 0.6, -3.72, 0, { lift: BACK, scale: 0.4 }),
    food('soda-bottle', 0.85, -3.75, 0, { lift: BACK, scale: 0.4 }),
    food('soda-bottle', 1.1, -3.7, 0, { lift: BACK, scale: 0.4 }),
    food('glass', 1.6, -3.7, 0, { lift: BACK, scale: 0.35 }),
    food('glass', 1.82, -3.76, 0, { lift: BACK, scale: 0.35 }),
    food('soda-bottle', 3.9, -3.72, 0, { lift: BACK, scale: 0.4 }),
    food('soda-bottle', 4.15, -3.75, 0, { lift: BACK, scale: 0.4 }),
    food('lemon', 4.5, -3.7, 0, { lift: BACK, scale: 0.4 }),
    f('kitchenCoffeeMachine', 5.1, -3.8, 0, { lift: BACK }),
    food('glass', 1.5, -2.0, 0, { lift: BAR, scale: 0.35 }),
    food('lemon', 1.8, -2.02, 0, { lift: BAR, scale: 0.35 }),
    food('plate-dinner', 3.3, -2.0, 0, { lift: BAR, scale: 0.4 }),
    food('fish', 3.3, -2.0, 0, { lift: BAR + 0.03, scale: 0.35 }),
    food('glass', 3.6, -1.98, 0, { lift: BAR, scale: 0.35 }),
    f('lampRoundTable', 5.1, -2.0, 0, { lift: BAR })
  ]);

  // ----- the host stand
  add([
    f('kitchenBar', -4.82, 0.7, 180, { solid: 'fit' }),
    f('kitchenBar', -4.39, 0.7, 180, { solid: 'fit' }),
    f('books', -4.7, 0.7, 0, { lift: BAR }),
    f('lampRoundTable', -4.3, 0.7, 0, { lift: BAR }),
    f('coatRackStanding', -3.6, 3.55, 0, { solid: 'fit' }),
    f('rugDoormat', -4.5, 3.3, 0)
  ]);

  // ----- the dining room: yours is the first table
  [[2.0, 2.7], [-1.4, 2.7], [4.6, 2.7], [0.3, 0.5], [3.3, 0.5], [-2.7, -0.2], [-2.7, -2.7]].forEach(function (t, n) {
    add([
      f('tableCloth', t[0], t[1], 0, { solid: 'fit' }),
      f('chairCushion', t[0], t[1] - 0.38, 0),
      f('chairCushion', t[0], t[1] + 0.38, 180),
      food('glass', t[0] + 0.3, t[1] - 0.08, 0, { lift: TABLE, scale: 0.3 }),
      food(n % 2 ? 'lemon' : 'bread', t[0] - 0.28, t[1] + 0.05, 0, { lift: TABLE, scale: 0.3 })
    ]);
  });
  add([
    food('plate-dinner', 3.3, 0.55, 0, { lift: TABLE, scale: 0.4 }),
    food('fish', 3.3, 0.55, 0, { lift: TABLE + 0.03, scale: 0.35 }),
    food('plate-dinner', -2.7, -2.75, 0, { lift: TABLE, scale: 0.4 }),
    food('fries', -2.7, -2.75, 0, { lift: TABLE + 0.03, scale: 0.35 }),
    food('bowl-soup', 4.6, 2.65, 0, { lift: TABLE, scale: 0.4 }),
    f('rugRectangle', 1.8, 0.5, 0, { scale: 1.3 }),
    f('pottedPlant', -5.6, -3.6, 0, { solid: 'fit' }),
    f('pottedPlant', -5.6, 3.6, 0, { solid: 'fit' }),
    f('pottedPlant', 5.6, 3.6, 0, { solid: 'fit' }),
    f('pottedPlant', -0.6, -1.6, 0, { solid: 'fit' }),
    f('lampSquareFloor', 5.6, -0.9, 0, { solid: 'fit' }),
    f('plantSmall2', 0.15, 0.45, 0, { lift: TABLE })
  ]);

  // ----- outside: the street in front (south) and the harbor past it, the neighbours on both sides, the alley behind
  add([
    c('building-c', 8.3, 0.3, 0), c('building-f', -8.4, 0.2, 0),
    c('low-detail-building-g', -2.5, -9.5, 0), c('low-detail-building-wide-b', 4.5, -9.8, 0),
    r('dumpster', 1.2, -5.6, 0), r('light-square', -2.5, 5.9, 0), r('light-square', 4.5, 5.9, 0),
    car('sedan', -0.6, 7.3, 90), car('hatchback', 5.2, 9.7, 270),
    f('bench', -1.0, 11.6, 180), f('bench', 3.6, 11.6, 180)
  ]);

  SO_ZONES.grill = {
    name: 'Harbor Grill', name_ko: '하버 그릴',
    indoor: true,
    size: [12, 8],
    floor: '#7a5233',
    props: props,
    places: {
      grill_host: { at: [-4.6, 0.2], face: [-4.6, 1.6] },
      grill_bar: { at: [2.9, -2.75], face: [2.9, -1.5] },
      grill_table: { at: [2.0, 2.32], face: [2.0, 2.7], sit: true },
      grill_door: { at: [-4.4, 2.4], face: [-3.0, 1.2] }
    },
    portals: [
      { at: [-4.5, 3.7], size: [0.9, 0.5], to: 'city', arrive: 'grill_door', label: 'Leave the Harbor Grill', label_ko: '하버 그릴에서 나가기' }
    ],
    spawn: 'grill_door',
    lights: [
      { at: [2.8, -1.2], height: 1.2, color: '#ffd9a0', intensity: 1.0 },
      { at: [-2.6, 0.8], height: 1.2, color: '#ffe0b0', intensity: 0.95 },
      { at: [2.6, 1.9], height: 1.2, color: '#ffe0b0', intensity: 0.95 }
    ],
    ambient: 0.8,
    background: '#bcd7ec',
    outside: '#c9c6bf',
    setup: function (api) {
      K.dress(api, {
        floor: { pattern: 'wood', a: '#7a5233' },
        floors: [{ pattern: 'tile', a: '#3a4c60', b: '#2b3a4c', rect: [-0.15, -4, 6, -2] }],
        walls: { color: '#e9e1cf', trim: '#c9a227', base: '#20344f' },
        ground: { pattern: 'asphalt', strips: [
          { pattern: 'sidewalk', rect: [-80, 4.02, 80, 6.4] }, { pattern: 'road', rect: [-80, 6.4, 80, 10.6] },
          { pattern: 'sidewalk', rect: [-80, 10.6, 80, 12.4] }, { pattern: 'water', rect: [-80, 12.4, 80, 80] },
          { pattern: 'sidewalk', rect: [-80, -80, -6.02, 4.02] }, { pattern: 'sidewalk', rect: [6.02, -80, 80, 4.02] }] },
        skyline: { kind: 'harbor', seed: 5 },
        panels: [
          { kind: 'sign', wall: 'w', along: -3.0, y: 0.95, w: 1.6, h: 0.42, text: 'Harbor Grill', sub: 'Seafood & steaks', bg: '#20344f', fg: '#f4e7c5', border: '#c9a227', frame: '#121f30' },
          { kind: 'menu', at: [2.9, -3.95], turn: 0, y: 1.0, w: 1.9, h: 0.55, frame: '#4a3322', text: 'TODAY', items: [['Grilled salmon', '$26.00'], ['Fish and chips', '$19.50'], ['Clam chowder', '$9.50']] },
          { kind: 'poster', wall: 'e', along: 2.6, y: 0.85, w: 0.45, h: 0.6, frame: '#ffffff', text: 'Key Lime Pie', lines: ['Made here daily', '$8.50 a slice'], band: '#2a6f97' },
          { kind: 'photo', wall: 'n', along: -4.4, y: 0.85, w: 0.7, h: 0.45, frame: '#4a3322', sky: '#8fc1de' },
          { kind: 'photo', wall: 'n', along: -2.6, y: 0.85, w: 0.7, h: 0.45, frame: '#4a3322', sky: '#f0b27a' },
          { kind: 'photo', wall: 'w', along: 2.6, y: 0.85, w: 0.6, h: 0.42, frame: '#4a3322', sky: '#a7d3cb' }
        ]
      });
    },
    update: function (api) { K.tick(api); }
  };
})();

/* Airport: the terminal of Fairview Regional Airport, one hall of 22 x 10. The shuttle from downtown drops
   you at the west door (airport_door). Check-in counters line the north wall of the west half, with Amy at
   the middle one (airport_checkin). Security splits the hall: a rope line runs north-south with one lane
   past the X-ray belt (bins on a counter) and through the scanner frame, where Lee checks you
   (airport_security). East of it is the gate: rows of cushioned benches (airport_gate), a gate desk and
   flight screens, and the boarding door in the east wall, which takes you to the hotel on the other end of
   the trip (airport_arrive; you also come back through it). */
(function () {
  var K = SO_ZONE_KIT;
  function f(node, x, z, turn, extra) { return K.prop('furniture', node, x, z, turn, extra); }
  function food(node, x, z, turn, extra) { return K.prop('food', node, x, z, turn, extra); }
  function box(size, x, z, color, extra) {
    var o = { pack: 'box', size: size, at: [x, z], color: color };
    for (var k in extra) o[k] = extra[k];
    return o;
  }
  var D = 0.384;
  var props = [];
  function add(list) { props = props.concat(list); }

  add(K.walls(22, 10, { n: 'wwwwwwwwwwwwwWWwWWwWWw', s: 'wwWWwwWWwwwwwWWwWWwWWw', w: 'wwwwwwwDww', e: 'wwDwWWwWWw' }));

  // ----- check-in: five counters along the north wall, agents stand behind them
  [-9.0, -8.0, -7.0, -6.0, -5.0].forEach(function (x) {
    add([
      f('desk', x, -2.8, 180, { solid: 'fit' }),
      f('computerScreen', x + 0.1, -2.9, 180, { lift: D }),
      f('cardboardBoxClosed', x + 0.5, -2.8, 0, { solid: 'fit' })
    ]);
  });
  add([
    K.prop('extras', 'ticket-machine', -4.0, -4.6, 0, { solid: 'fit' }),       // self check-in kiosks
    K.prop('extras', 'ticket-machine', -3.4, -4.6, 0, { solid: 'fit' }),
    f('coatRackStanding', -9.4, -1.5, 0, { solid: 'fit' }),
    f('coatRackStanding', -7.9, -1.5, 0, { solid: 'fit' }),
    f('coatRackStanding', -6.1, -1.5, 0, { solid: 'fit' }),
    f('coatRackStanding', -4.6, -1.5, 0, { solid: 'fit' }),
    f('cardboardBoxClosed', -10.6, -4.6, 0, { solid: 'fit' }),
    f('cardboardBoxClosed', -10.6, -4.6, 15, { lift: 0.28 }),
    f('cardboardBoxOpen', -10.55, -4.2, 0, { solid: 'fit' }),
    f('pottedPlant', -10.6, 4.5, 0, { solid: 'fit' }),
    f('pottedPlant', -10.6, 0.6, 0, { solid: 'fit' }),
    f('loungeDesignSofa', -7.5, 4.72, 180, { solid: 'fit' }),
    f('loungeDesignSofa', -5.8, 4.72, 180, { solid: 'fit' }),
    f('trashcan', -4.7, 4.7, 0, { solid: 'fit' })
  ]);

  // ----- security: X-ray belt, bins, scanner frame, and a rope line from wall to wall with one gap
  for (var i = 0; i < 7; i++) add([f('kitchenBar', -2.0 + 0.43 * i, 0.25, 0, { solid: 'fit' })]);
  add([
    f('cardboardBoxOpen', -1.6, 0.22, 0, { lift: 0.42 }),
    f('cardboardBoxOpen', -0.6, 0.22, 0, { lift: 0.42 }),
    food('bag', -0.1, 0.22, 90, { lift: 0.42, scale: 0.5 }),
    f('cardboardBoxOpen', 0.5, 0.22, 0, { lift: 0.42 }),
    K.prop('extras', 'machine-window', 0.35, 0.25, 90, { scale: 0.46 }),      // X-ray tunnel over the belt
    K.prop('extras', 'scanner-high', 1.4, 1.2, 0, { scale: 0.88 }),           // walk-through scanner (its feet are solid, see setup)
    f('desk', 2.3, -0.9, 90, { solid: 'fit' }),
    f('computerScreen', 2.3, -0.9, 90, { lift: D })
  ]);
  function rope(z0, z1) {
    var out = [], n = Math.max(1, Math.round((z1 - z0) / 1.1)), step = (z1 - z0) / n;
    for (var k = 0; k <= n; k++) out.push(f('coatRackStanding', 1.4, z0 + k * step, 0));
    out.push(box([0.04, 0.04, z1 - z0], 1.4, (z0 + z1) / 2, '#b03030', { lift: 0.55, solid: [0.2, z1 - z0] }));
    return out;
  }
  add(rope(-4.85, 0.3));
  add(rope(2.1, 4.85));

  // ----- gate: benches, gate desk, flight screens
  [[-1.3, 180], [-0.9, 0], [1.9, 180], [2.3, 0]].forEach(function (row) {
    for (var b = 0; b < 9; b++) {
      var x = 4.4 + 0.4 * b, seat = row[0] === -1.3 && b === 4;   // airport_gate: that seat stays free to sit on
      add([f('benchCushion', x, row[0], row[1], seat ? {} : { solid: 'fit' })]);
    }
  });
  add([
    f('desk', 9.8, 0.3, 270, { solid: 'fit' }),
    f('desk', 9.8, 1.03, 270, { solid: 'fit' }),
    f('computerScreen', 9.85, 0.5, 270, { lift: D }),
    box([0.05, 0.68, 0.05], 6.25, -4.45, '#3b3f46'),                          // posts of the departures board
    box([0.05, 0.68, 0.05], 7.75, -4.45, '#3b3f46'),
    K.prop('extras', 'vending-machine', 3.9, 3.3, 90, { solid: 'fit', scale: 1.25 }),
    f('pottedPlant', 3.6, -4.5, 0, { solid: 'fit' }),
    f('pottedPlant', 10.5, 4.5, 0, { solid: 'fit' }),
    f('pottedPlant', 3.6, 4.5, 0, { solid: 'fit' }),
    f('trashcan', 8.3, 4.6, 0, { solid: 'fit' }),
    f('coatRackStanding', 9.2, -1.4, 0, { solid: 'fit' }),
    f('coatRackStanding', 9.2, -3.6, 0, { solid: 'fit' })
  ]);

  // ----- outside: the apron with a plane at the gate (east) and one taxiing (north), the curb and the parking lot (south)
  add([
    box([2.3, 0.95, 0.9], 12.5, -2.5, '#c9ced6'),                            // the jet bridge to the plane
    K.prop('cars', 'suv', -3.0, 7.6, 90), K.prop('cars', 'taxi', 2.5, 7.6, 90),
    K.prop('cars', 'sedan', -8.0, 12.2, 0), K.prop('cars', 'suv', -5.4, 12.2, 180), K.prop('cars', 'hatchback', 4.0, 12.2, 0),
    K.prop('cars', 'suv', 14.5, 3.5, 0), K.prop('cars', 'sports-car-2', -2.0, -8.5, 90),
    K.prop('roads', 'light-square', -6.0, 5.9, 0), K.prop('roads', 'light-square', 4.0, 5.9, 0),
    K.prop('roads', 'construction-cone', 13.0, -5.0, 0), K.prop('roads', 'construction-cone', 13.6, -5.0, 0)
  ]);

  SO_ZONES.airport = {
    name: 'Fairview Regional Airport', name_ko: '페어뷰 지역 공항',
    indoor: true,
    size: [22, 10],
    floor: '#d6d8dc',
    props: props,
    places: {
      airport_checkin: { at: [-7.0, -3.4], face: [-7.0, -2.0] },
      airport_security: { at: [2.3, -0.1], face: [1.6, 1.2] },
      airport_gate: { at: [6.0, -1.36], face: [6.0, -2.4], sit: true },
      airport_door: { at: [-9.4, 2.5], face: [-7.5, 1.2] },
      airport_arrive: { at: [9.4, -2.5], face: [7.5, -1.8] }
    },
    portals: [
      { at: [-10.7, 2.5], size: [0.5, 0.9], to: 'city', arrive: 'airport_shuttle', label: 'Take the shuttle downtown', label_ko: '시내 셔틀 타기' },
      { at: [10.7, -2.5], size: [0.5, 0.9], to: 'hotel', arrive: 'hotel_shuttle', label: 'Board your flight', label_ko: '비행기 타기' }
    ],
    spawn: 'airport_door',
    lights: [
      { at: [-7, -1], height: 1.25, color: '#ffffff', intensity: 1.1 },
      { at: [0, 1], height: 1.25, color: '#ffffff', intensity: 1.0 },
      { at: [7, 0.5], height: 1.25, color: '#fff4e0', intensity: 1.0 }
    ],
    ambient: 1.0,
    background: '#bcd7ec',
    outside: '#6c7076',
    setup: function (api) {
      api.solid(1.25, 0.3, 1.55, 0.55); api.solid(1.25, 1.85, 1.55, 2.1);     // the scanner's feet
      K.dress(api, {
        floor: { pattern: 'gloss', a: '#dde0e5' },
        floors: [{ pattern: 'carpet', a: '#51627c', rect: [3.4, -4.95, 11, 4.95] }],
        walls: { color: '#e5e9ee', trim: '#8fa0b3', base: '#4a5563' },
        ground: { pattern: 'grass', a: '#8fb36a', strips: [
          { pattern: 'concrete', a: '#b9bcbd', rect: [-80, -9, 80, -5.02] }, { pattern: 'concrete', a: '#b9bcbd', rect: [11.02, -9, 80, 5.02] },
          { pattern: 'taxiway', rect: [-80, -12, 80, -9] }, { pattern: 'runway', rect: [-80, -24, 80, -18] },
          { pattern: 'sidewalk', rect: [-80, 5.02, 80, 6.4] }, { pattern: 'road', rect: [-80, 6.4, 80, 10.2] }, { pattern: 'lot', rect: [-80, 10.8, 80, 13.8] },
          { pattern: 'asphalt', rect: [-80, 5.02, -11.02, -9] }] },
        skyline: { kind: 'airport', seed: 5, r: 26 },
        planes: [{ at: [17.3, -2.5], turn: 270, scale: 0.9, tail: '#2f6fb3' }, { at: [-6.0, -10.5], turn: 90, scale: 0.8, tail: '#d4513c' }],
        panels: [
          { kind: 'sign', wall: 'n', along: -7.0, y: 1.0, w: 4.4, h: 0.32, text: 'Check-in', sub: 'Fairview Air  ·  Bags and boarding passes', bg: '#1d2b3f', fg: '#ffffff', border: '#f2c230', frame: '#101a28' },
          { kind: 'lightbox', wall: 'e', along: -2.5, y: 1.08, w: 2.2, h: 0.3, mark: 'B12', text: 'Gate B12', sub: 'Flight 482 to Ridgeport', frame: '#101a28' },
          { kind: 'lightbox', wall: 'n', along: 0.9, y: 1.02, w: 1.8, h: 0.3, mark: '→', text: 'Security', sub: 'Have your ID and boarding pass ready', frame: '#101a28' },
          { kind: 'lightbox', wall: 'n', along: 2.95, y: 1.02, w: 1.7, h: 0.3, mark: 'B', text: 'Gates B1 - B20', frame: '#101a28' },
          { kind: 'flights', at: [7.0, -4.47], turn: 0, y: 1.02, w: 1.6, h: 0.62, key: 'departures', rim: 0.05, live: function (api, q) {
            var d = api.day || 1, home = d >= 12;
            q.clock = String(Math.floor((api.minute || 600) / 60)).padStart(2, '0') + ':' + String(Math.floor((api.minute || 600) % 60)).padStart(2, '0');
            q.rows = [
              ['06:55', 'DENVER', 'FA 210', 'B4', 'DEPARTED'],
              [home ? '11:40' : '07:30', home ? 'FAIRVIEW' : 'RIDGEPORT', home ? 'FA 483' : 'FA 482', 'B12', home ? 'FULL' : 'DELAYED'],
              ['08:15', 'CHICAGO', 'FA 318', 'B7', 'BOARDING'],
              ['09:05', 'SEATTLE', 'FA 144', 'B9', 'ON TIME'],
              ['10:20', 'AUSTIN', 'FA 527', 'B2', 'ON TIME']
            ];
          } },
          { kind: 'poster', wall: 's', along: -1.0, y: 0.85, w: 0.5, h: 0.7, frame: '#ffffff', text: 'Visit Fairview', lines: ['Lakes, trails', 'and good coffee'], band: '#2a9d8f' },
          { kind: 'map', wall: 'w', along: -2.0, y: 0.85, w: 0.9, h: 0.6, frame: '#2e2e33', text: 'Downtown shuttle' }
        ]
      });
    },
    update: function (api) { K.tick(api); }
  };
})();

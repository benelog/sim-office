/* Hotel: the Harbor View Hotel near Summit Retail, one floor of 16 x 10 cut into a lobby, a guest room and a
   restaurant. The airport shuttle drops you at the side door in the west wall (hotel_shuttle); the front
   door in the south wall leads to the client's office (hotel_door). Kelly works the front desk in the
   middle of the lobby (hotel_desk), with sofas by the west wall and the lift doors behind her. Your room is
   in the north-east corner behind two walls, with a double bed to sleep in (hotel_room), a desk and a TV.
   The restaurant fills the south-east corner: four round tables and a coffee counter (hotel_restaurant). */
(function () {
  var K = SO_ZONE_KIT;
  function f(node, x, z, turn, extra) { return K.prop('furniture', node, x, z, turn, extra); }
  function food(node, x, z, turn, extra) { return K.prop('food', node, x, z, turn, extra); }
  var D = 0.384;
  var props = [];
  function add(list) { props = props.concat(list); }

  add(K.walls(16, 10, { n: 'wwwwwwwwwwwWWwWw', s: 'wWWwwwwDwwwWWwWw', w: 'wwDwwwwWWw', e: 'wWWwwwWWww' }));

  // ----- lobby and front desk
  [-2.2, -1.47, -0.74].forEach(function (x) { add([f('desk', x, -1.6, 180, { solid: 'fit' })]); });
  add([
    f('computerScreen', -1.3, -1.7, 180, { lift: D }),
    f('computerKeyboard', -1.3, -1.52, 180, { lift: D }),
    f('lampSquareTable', -2.4, -1.65, 0, { lift: D }),
    f('plantSmall2', -0.55, -1.6, 0, { lift: D }),
    f('bookcaseClosedWide', -1.47, -4.85, 0, { solid: 'fit' }),
    f('pottedPlant', -2.6, -4.6, 0, { solid: 'fit' }),
    f('pottedPlant', -0.3, -4.6, 0, { solid: 'fit' }),
    { pack: 'box', size: [0.08, 0.14, 0.03], at: [-4.9, -4.97], lift: 0.5, color: '#3b4250' },   // call button between the lift doors (drawn in setup)
    f('rugRectangle', -5.5, 2.5, 0),
    f('loungeSofa', -5.5, 1.62, 0, { solid: 'fit' }),
    f('loungeSofa', -5.5, 3.4, 180, { solid: 'fit' }),
    f('tableCoffee', -5.5, 2.5, 0, { solid: 'fit' }),
    food('cup-tea', -5.6, 2.45, 0, { lift: 0.23, scale: 0.35 }),
    f('lampRoundFloor', -6.3, 1.6, 0, { solid: 'fit' }),
    f('pottedPlant', -7.6, 4.6, 0, { solid: 'fit' }),
    f('pottedPlant', -7.6, 0.6, 0, { solid: 'fit' }),
    f('cardboardBoxClosed', -3.4, -1.6, 0, { solid: 'fit' }),          // somebody's luggage
    f('coatRackStanding', -2.0, 4.6, 0, { solid: 'fit' }),
    f('rugDoormat', -0.5, 4.3, 0)
  ]);

  // ----- guest room (north-east)
  add(K.wallLine(3, -5, 'z', 'wwwwh', 90, true));
  add(K.wallLine(3.07, -0.5, 'x', 'h.,www', 180, true));
  add([
    f('bedDouble', 6.4, -4.4, 0, { solid: 'fit' }),
    f('cabinetBed', 5.6, -4.8, 0, { solid: 'fit' }),
    f('cabinetBed', 7.2, -4.8, 0, { solid: 'fit' }),
    f('lampRoundTable', 5.6, -4.8, 0, { lift: 0.23 }),
    f('lampRoundTable', 7.2, -4.8, 0, { lift: 0.23 }),
    f('rugRectangle', 6.4, -2.6, 0),
    f('desk', 7.78, -2.3, 270, { solid: 'fit' }),
    f('laptop', 7.8, -2.3, 270, { lift: D }),
    f('lampSquareTable', 7.8, -2.55, 0, { lift: D }),
    f('chairDesk', 7.35, -2.3, 90),
    f('cabinetTelevision', 6.4, -0.72, 180, { solid: 'fit' }),
    f('televisionModern', 6.4, -0.72, 180, { lift: 0.31 }),
    f('loungeChair', 3.6, -4.2, 90, { solid: 'fit' }),
    f('pottedPlant', 3.4, -1.0, 0, { solid: 'fit' }),
    f('cardboardBoxClosed', 4.8, -4.7, 0, { solid: 'fit' })            // your suitcase
  ]);

  // ----- restaurant (south-east)
  [[4.6, 1.6], [6.9, 1.6], [4.6, 3.7], [6.9, 3.7]].forEach(function (t, n) {
    add([
      f('tableRound', t[0], t[1], 0, { solid: 'fit' }),
      f('chair', t[0] - 0.55, t[1], 90),
      f('chair', t[0] + 0.55, t[1], 270),
      food(n % 2 ? 'cup-tea' : 'glass', t[0] + 0.12, t[1] - 0.1, 0, { lift: 0.37, scale: 0.35 }),
      food(n % 2 ? 'glass' : 'cup-tea', t[0] - 0.12, t[1] + 0.12, 0, { lift: 0.37, scale: 0.35 })
    ]);
  });
  add([
    food('plate-dinner', 4.6, 1.6, 0, { lift: 0.37, scale: 0.35 }),
    f('kitchenBar', 7.9, 1.2, 270, { solid: 'fit' }),
    f('kitchenBar', 7.9, 1.63, 270, { solid: 'fit' }),
    f('kitchenBar', 7.9, 2.06, 270, { solid: 'fit' }),
    f('kitchenCoffeeMachine', 7.9, 1.2, 270, { lift: 0.42 }),
    food('croissant', 7.9, 1.65, 0, { lift: 0.42, scale: 0.4 }),
    food('muffin', 7.9, 2.0, 0, { lift: 0.42, scale: 0.4 }),
    f('pottedPlant', 7.6, 4.6, 0, { solid: 'fit' }),
    f('pottedPlant', 3.0, 0.4, 0, { solid: 'fit' })
  ]);

  // ----- outside: the harbor behind the hotel (north), the street and Summit Retail's tower in front (south)
  add([
    K.prop('city', 'building-skyscraper-a', 0.0, 14.5, 180), K.prop('city', 'building-f', -6.5, 14.0, 180), K.prop('city', 'building-g', 6.5, 14.0, 180),
    K.prop('city', 'low-detail-building-wide-b', 12.5, 3.0, 270), K.prop('city', 'building-h', -12.0, 2.0, 90),
    K.prop('roads', 'light-square', -4.0, -6.2, 180), K.prop('roads', 'light-square', 4.0, -6.2, 180),
    K.prop('roads', 'light-square', -3.0, 6.0, 0), K.prop('roads', 'light-square', 4.0, 6.0, 0),
    f('bench', -1.0, -6.6, 180), f('bench', 1.6, -6.6, 180),
    K.prop('city', 'tree-large', -6.5, -6.4, 0), K.prop('city', 'tree-large', 6.5, -6.4, 0),
    K.prop('cars', 'taxi', 1.5, 7.4, 90), K.prop('cars', 'sedan', -5.0, 9.6, 270)
  ]);

  SO_ZONES.hotel = {
    name: 'Harbor View Hotel', name_ko: '하버 뷰 호텔',
    indoor: true,
    size: [16, 10],
    floor: '#d8cbb8',
    props: props,
    places: {
      hotel_desk: { at: [-1.47, -2.2], face: [-1.47, -0.6] },
      hotel_room: { at: [5.72, -4.05], face: [4.7, -4.05], sit: true },
      hotel_restaurant: { at: [4.05, 1.6], face: [4.6, 1.6], sit: true },
      hotel_door: { at: [-0.5, 3.4], face: [-1.0, 2.0] },
      hotel_shuttle: { at: [-6.4, -2.5], face: [-4.5, -2.0] }
    },
    portals: [
      { at: [-0.5, 4.7], size: [0.9, 0.5], to: 'client', arrive: 'client_door', label: 'Walk to Summit Retail', label_ko: '서밋 리테일로 가기' },
      { at: [-7.7, -2.5], size: [0.5, 0.9], to: 'airport', arrive: 'airport_arrive', label: 'Take the shuttle to the airport', label_ko: '공항 셔틀 타기' }
    ],
    spawn: 'hotel_shuttle',
    lights: [
      { at: [-3, 0], height: 1.2, color: '#ffe6c0', intensity: 1.1 },
      { at: [6, -2.6], height: 1.1, color: '#ffd9a0', intensity: 0.9 },
      { at: [5.8, 2.6], height: 1.2, color: '#ffe6c0', intensity: 1.0 }
    ],
    ambient: 0.85,
    background: '#bcd7ec',
    outside: '#c9c6bf',
    setup: function (api) {
      K.dress(api, {
        floor: { pattern: 'marble', a: '#ece2d0' },
        floors: [
          { pattern: 'hotel', a: '#7c2f3a', b: '#c9a25a', rect: [3, -5, 8, -0.5] },        // your room
          { pattern: 'wood', a: '#a8784c', rect: [3, 0, 8, 5] },                           // restaurant
          { pattern: 'hotel', a: '#2f4a6b', b: '#c9a25a', rect: [-7, 1.2, -4, 3.8] }        // lobby lounge
        ],
        walls: { color: '#efe3d0', trim: '#6b4a2f', base: '#4a3322' },
        ground: { pattern: 'sidewalk', strips: [
          { pattern: 'water', rect: [-80, -80, 80, -8.5] },
          { pattern: 'road', rect: [-80, 6.4, 80, 10.4] }, { pattern: 'road', rect: [9.6, -8.5, 13.6, 6.4], dir: 'z' },
          { pattern: 'asphalt', rect: [-80, -8.5, -8.02, 6.4] }] },
        skyline: { kind: 'harbor', seed: 9 },
        panels: [
          { kind: 'elevator', wall: 'n', along: -5.5, y: 0.53, w: 0.9, h: 1.05, floor: '3', frame: '#6c7480', rim: 0.08 },
          { kind: 'elevator', wall: 'n', along: -4.3, y: 0.53, w: 0.9, h: 1.05, floor: '1', frame: '#6c7480', rim: 0.08 },
          { kind: 'sign', wall: 'n', along: -1.47, y: 1.03, w: 1.9, h: 0.38, text: 'Harbor View Hotel', sub: 'Reception', bg: '#243b55', fg: '#f3e2b3', border: '#c9a25a', frame: '#1a2a3d' },
          { kind: 'photo', wall: 'w', along: 0.0, y: 0.85, w: 0.8, h: 0.5, frame: '#6b4a2f', sky: '#9cc9e8' },
          { kind: 'art', at: [3.04, -2.8], turn: 90, y: 0.82, w: 0.7, h: 0.45, frame: '#6b4a2f', seed: 6, palette: ['#264653', '#c9a25a', '#e9d8a6', '#94d2bd'] },
          { kind: 'tv', at: [6.4, -0.787], turn: 180, y: 0.595, w: 0.6, h: 0.33, depth: 0, text: 'Ridgeport: rain later, high of 64' },
          { kind: 'poster', wall: 'e', along: 3.6, y: 0.85, w: 0.5, h: 0.66, frame: '#6b4a2f', text: 'Harbor Grill', lines: ['Breakfast 6:30-10', 'Dinner 5-10'], band: '#243b55', bg: '#f7efe0' },
          { kind: 'map', wall: 's', along: -3.5, y: 0.85, w: 0.8, h: 0.55, frame: '#2e2e33', text: 'Ridgeport' }
        ]
      });
    },
    update: function (api) { K.tick(api); }
  };
})();

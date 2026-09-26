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
    { pack: 'box', size: [0.9, 1.05, 0.05], at: [-5.5, -4.95], color: '#a7b0bd' },      // lift doors
    { pack: 'box', size: [0.9, 1.05, 0.05], at: [-4.3, -4.95], color: '#a7b0bd' },
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
    ambient: 0.85
  };
})();

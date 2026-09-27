/* Office: Seaside Labs on the 3rd floor, one open floor of 18 x 12. You come in through the door at the
   west end of the south wall into the lobby, where Tom sits behind the reception desk (office_lobby). The
   open-plan area in the middle has two rows of three desks back to back; yours (office_desk) and Derek's
   (office_desk_team) face the south aisle. Along the north wall: Maya's manager corner in the north-west
   (office_manager), Linda's HR desk (office_hr) and the glass-walled meeting room in the north-east with a
   long table for six and a TV (office_meeting). Sam's IT help desk with spare monitors and boxes is on the
   west wall (office_it), and the kitchen with coffee, fridge, microwave and a breakfast bar is in the
   south-east (office_kitchen). */
(function () {
  var K = SO_ZONE_KIT;
  function f(node, x, z, turn, extra) { return K.prop('furniture', node, x, z, turn, extra); }
  function food(node, x, z, turn, extra) { return K.prop('food', node, x, z, turn, extra); }
  function c(node, x, z, turn, extra) { return K.prop('city', node, x, z, turn, extra); }
  function box(size, x, z, color, extra) { var o = { pack: 'box', size: size, at: [x, z], color: color }; for (var k in extra) o[k] = extra[k]; return o; }
  var D = 0.384, STREET = -3.1;      // desk top; the street is three floors down   // desk top
  var props = [];
  function add(list) { props = props.concat(list); }

  add(K.walls(18, 12, { n: 'wWWwwWWwwWWwwWWwww', s: 'wDwwWWwwWWwwWWwwww', w: 'wWWwwwwwwWWw', e: 'wWWwwWWwwWWw' }));

  // ----- lobby and reception (south-west); a half-height partition behind Tom carries the company sign
  add(K.wallLine(-7.75, 1.3, 'x', 'wwh', 0, true));
  add([
    f('desk', -6.865, 2.6, 180, { solid: 'fit' }),
    f('desk', -6.135, 2.6, 180, { solid: 'fit' }),
    f('computerScreen', -6.7, 2.5, 180, { lift: D }),
    f('computerKeyboard', -6.7, 2.7, 180, { lift: D }),
    f('plantSmall1', -5.9, 2.55, 0, { lift: D }),
    f('rugRectangle', -8.1, 4.2, 90),
    f('loungeDesignSofa', -8.7, 4.2, 90, { solid: 'fit' }),
    f('tableCoffee', -7.95, 4.2, 90, { solid: 'fit' }),
    f('pottedPlant', -8.65, 5.6, 0, { solid: 'fit' }),
    f('pottedPlant', -8.65, 2.8, 0, { solid: 'fit' }),
    f('pottedPlant', -5.4, 5.6, 0, { solid: 'fit' }),
    f('rugDoormat', -7.5, 5.2, 0)
  ]);

  // ----- open-plan desks: two rows of three, back to back
  [-1.6, 0.3, 2.2].forEach(function (x, n) {
    add([
      f('desk', x, 2.2, 0, { solid: 'fit' }),             // row A, you sit on the south side
      f('chairDesk', x, 2.75, 180)
    ]);
    if (x < 2) add([
      f('desk', x, 1.8, 180, { solid: 'fit' }),           // row B, sitting on the north side (none across from
      f('chairDesk', x, 1.25, 0)                          // Derek, so you can talk to him over his desk)
    ]);
  });
  add([
    // row A: Derek's colleague, you, Derek
    f('laptop', -1.6, 2.15, 0, { lift: D }),
    f('computerScreen', 0.2, 2.1, 0, { lift: D }),          // your desk
    f('laptop', 0.48, 2.2, 0, { lift: D }),
    f('computerMouse', 0.05, 2.28, 0, { lift: D }),
    f('computerScreen', 2.0, 2.1, 0, { lift: D }),          // Derek's desk: two screens
    f('computerScreen', 2.42, 2.1, 0, { lift: D }),
    f('computerKeyboard', 2.2, 2.28, 0, { lift: D }),
    food('mug', 1.95, 2.3, 0, { lift: D, scale: 0.35 }),
    food('cup-coffee', 0.62, 2.33, 0, { lift: D, scale: 0.3 }),                   // your desk: coffee and notes
    box([0.13, 0.006, 0.18], -0.12, 2.3, '#fbfbf6', { lift: D, turn: 12 }),
    box([0.13, 0.006, 0.18], -1.35, 2.3, '#fbfbf6', { lift: D, turn: -8 }),
    f('books', -1.9, 2.1, 0, { lift: D }),
    food('mug', -1.35, 1.78, 0, { lift: D, scale: 0.35 }),
    // row B
    f('computerScreen', -1.6, 1.9, 180, { lift: D }),
    f('computerKeyboard', -1.6, 1.72, 180, { lift: D }),
    f('laptop', 0.3, 1.85, 180, { lift: D }),
    f('bookcaseOpenLow', 2.2, 1.0, 0, { solid: 'fit' }),
    f('plantSmall1', 2.1, 1.0, 0, { lift: 0.4 }),
    f('pottedPlant', -2.6, 2.0, 0, { solid: 'fit' }),
    f('pottedPlant', 3.2, 2.0, 0, { solid: 'fit' }),
    f('trashcan', 3.2, 3.0, 0, { solid: 'fit' })
  ]);

  // a second pod of four desks and the printer
  [-0.6, 1.3].forEach(function (x) {
    add([
      f('desk', x, -1.2, 0, { solid: 'fit' }),
      f('chairDesk', x, -0.65, 180),
      f('desk', x, -1.6, 180, { solid: 'fit' }),
      f('chairDesk', x, -2.15, 0),
      f('computerScreen', x - 0.1, -1.3, 0, { lift: D }),
      f('computerKeyboard', x - 0.05, -1.1, 0, { lift: D }),
      f('laptop', x, -1.65, 180, { lift: D }),
      food(x < 0 ? 'mug' : 'cup-coffee', x + 0.25, -1.15, 0, { lift: D, scale: 0.32 })
    ]);
  });
  add([
    // the printer: a copier body, scanner lid, control panel and a paper tray towards the desks (east)
    box([0.4, 0.3, 0.46], -3.4, -1.4, '#e7e7e3', { solid: [0.4, 0.46] }),
    box([0.41, 0.02, 0.47], -3.4, -1.4, '#b8bec7', { lift: 0.08 }),
    box([0.41, 0.035, 0.47], -3.4, -1.4, '#5e6570', { lift: 0.3 }),
    box([0.08, 0.02, 0.16], -3.24, -1.52, '#27303c', { lift: 0.335 }),
    box([0.2, 0.012, 0.26], -3.14, -1.4, '#f4f4f0', { lift: 0.19 }),
    box([0.16, 0.01, 0.22], -3.12, -1.4, '#ffffff', { lift: 0.2 }),
    f('cardboardBoxClosed', -3.4, -0.95, 0, { solid: 'fit' }),
    f('pottedPlant', 2.3, -1.4, 0, { solid: 'fit' })
  ]);

  // ----- manager's corner (north-west): Maya faces the room
  add([
    f('bookcaseClosedWide', -7.0, -5.84, 0, { solid: 'fit' }),
    f('bookcaseOpen', -8.2, -5.84, 0, { solid: 'fit' }),
    f('books', -8.2, -5.84, 0, { lift: 0.37 }),
    f('desk', -7.0, -4.3, 180, { solid: 'fit' }),
    f('laptop', -7.0, -4.25, 180, { lift: D }),
    f('lampSquareTable', -6.72, -4.4, 0, { lift: D }),
    f('chairDesk', -7.0, -4.85, 0),
    f('chair', -7.3, -3.65, 180),
    f('chair', -6.7, -3.65, 180),
    f('pottedPlant', -8.65, -4.3, 0, { solid: 'fit' }),
    f('rugRectangle', -7.0, -3.9, 0),
    f('bookcaseOpenLow', -8.75, -2.6, 90, { solid: 'fit' }),
    f('bookcaseOpenLow', -8.35, -2.6, 90, { solid: 'fit' })
  ]);

  // ----- HR (north wall, middle): Linda at a standing desk
  add([
    f('bookcaseClosed', -2.6, -5.85, 0, { solid: 'fit' }),
    f('bookcaseClosed', -2.2, -5.85, 0, { solid: 'fit' }),
    f('desk', -1.3, -4.3, 180, { solid: 'fit' }),
    f('computerScreen', -1.3, -4.4, 180, { lift: D }),
    f('computerKeyboard', -1.3, -4.2, 180, { lift: D }),
    f('chair', -1.9, -3.65, 180),
    f('pottedPlant', -0.2, -5.6, 0, { solid: 'fit' }),
    f('cabinetBedDrawer', -0.6, -5.85, 0, { solid: 'fit' })
  ]);

  // ----- meeting room (north-east), glass walls on two sides
  add(K.wallLine(4, -6, 'z', 'WWWWh', 90, true));
  add(K.wallLine(4.07, -1.5, 'x', 'WW.,Wh', 180, true));
  add([
    f('tableCross', 6.075, -3.8, 0, { solid: 'fit' }),
    f('tableCross', 6.925, -3.8, 0, { solid: 'fit' }),
    f('chair', 5.9, -4.35, 0), f('chair', 6.5, -4.35, 0), f('chair', 7.1, -4.35, 0),
    f('chair', 5.9, -3.25, 180), f('chair', 6.5, -3.25, 180), f('chair', 7.1, -3.25, 180),
    f('laptop', 6.5, -3.7, 180, { lift: 0.35 }),
    food('glass', 5.9, -3.95, 0, { lift: 0.35, scale: 0.3 }),
    food('glass', 7.1, -3.65, 0, { lift: 0.35, scale: 0.3 }),
    f('televisionModern', 8.92, -3.8, 270, { lift: 0.45 }),
    f('cabinetTelevision', 8.84, -3.8, 270, { solid: 'fit' }),
    f('pottedPlant', 4.4, -5.6, 0, { solid: 'fit' }),
    f('pottedPlant', 8.6, -5.6, 0, { solid: 'fit' }),
    f('pottedPlant', 8.6, -1.95, 0, { solid: 'fit' })
  ]);

  // ----- IT help desk (west wall): Sam behind two desks of monitors
  add([
    f('desk', -7.8, -0.9, 270, { solid: 'fit' }),
    f('desk', -7.8, -0.17, 270, { solid: 'fit' }),
    f('computerScreen', -7.85, -1.1, 270, { lift: D }),
    f('computerScreen', -7.85, -0.6, 270, { lift: D }),
    f('computerScreen', -7.85, 0.05, 270, { lift: D }),
    f('laptop', -7.75, -0.25, 90, { lift: D }),
    f('cardboardBoxOpen', -8.65, 0.75, 0, { solid: 'fit' }),
    f('cardboardBoxClosed', -8.3, 0.8, 0, { solid: 'fit' }),
    f('cardboardBoxClosed', -8.3, 0.8, 30, { lift: 0.28 }),
    f('cardboardBoxClosed', -8.72, -1.6, 0, { solid: 'fit' }),
    f('bookcaseOpenLow', -8.8, -2.1, 90, { solid: 'fit' })
  ]);

  // ----- kitchen (south-east)
  add([
    f('kitchenFridge', 8.84, 2.215, 270, { solid: 'fit' }),
    f('kitchenCabinet', 8.77, 2.645, 270, { solid: 'fit' }),
    f('kitchenCoffeeMachine', 8.82, 2.645, 270, { lift: 0.45 }),
    f('kitchenCabinet', 8.77, 3.075, 270, { solid: 'fit' }),
    f('kitchenMicrowave', 8.82, 3.075, 270, { lift: 0.45 }),
    f('kitchenSink', 8.77, 3.505, 270, { solid: 'fit' }),
    f('kitchenCabinet', 8.77, 3.935, 270, { solid: 'fit' }),
    food('cup-coffee', 8.75, 3.9, 0, { lift: 0.45, scale: 0.35 }),
    f('kitchenBar', 7.0, 2.6, 90, { solid: 'fit' }),
    f('kitchenBar', 7.0, 3.03, 90, { solid: 'fit' }),
    f('kitchenBar', 7.0, 3.46, 90, { solid: 'fit' }),
    food('donut-sprinkles', 7.0, 2.75, 0, { lift: 0.42, scale: 0.35 }),
    food('donut', 7.02, 2.95, 0, { lift: 0.42, scale: 0.35 }),
    food('cup-coffee', 7.0, 3.4, 90, { lift: 0.42, scale: 0.35 }),
    f('stoolBar', 6.6, 2.6, 90),
    f('stoolBar', 6.6, 3.03, 90),
    f('stoolBar', 6.6, 3.46, 90),
    f('tableRound', 6.0, 5.0, 0, { solid: 'fit' }),
    f('chair', 5.5, 5.0, 90),
    f('chair', 6.5, 5.0, 270),
    f('trashcan', 8.75, 4.5, 0, { solid: 'fit' }),
    f('pottedPlant', 8.65, 5.6, 0, { solid: 'fit' }),
    f('pottedPlant', 4.6, 5.6, 0, { solid: 'fit' }),
    K.prop('extras', 'vending-machine', 7.65, 5.62, 180, { solid: 'fit', scale: 1.25 })
  ]);

  // ----- outside, three floors down: the street, the neighbours' roofs and the towers of downtown
  add([
    c('building-skyscraper-a', -4.5, -14.0, 0, { lift: STREET }),
    c('building-g', 3.5, -13.0, 0, { lift: STREET }),
    c('building-skyscraper-c', 12.0, -12.5, 0, { lift: STREET }),
    c('low-detail-building-wide-a', 15.5, -2.5, 270, { lift: STREET }),
    c('building-b', 15.0, 4.5, 270, { lift: STREET }),
    c('building-e', -5.0, 12.5, 180, { lift: STREET }),
    c('low-detail-building-d', 4.5, 13.0, 180, { lift: STREET }),
    c('building-skyscraper-b', -16.0, -3.0, 90, { lift: STREET }),
    c('low-detail-building-wide-b', -15.5, 6.0, 90, { lift: STREET }),
    c('tree-large', -1.0, 8.6, 0, { lift: STREET }), c('tree-large', 6.0, 8.6, 0, { lift: STREET }), c('tree-large', -10.5, 8.6, 0, { lift: STREET })
  ]);

  SO_ZONES.office = {
    name: 'Seaside Labs, 3rd floor', name_ko: '시사이드 랩스 3층',
    indoor: true,
    size: [18, 12],
    floor: '#d9d3c7',
    props: props,
    places: {
      office_lobby: { at: [-6.5, 2.0], face: [-6.5, 3.3] },
      office_desk: { at: [0.3, 2.75], face: [0.3, 2.2], sit: true },
      office_desk_team: { at: [2.2, 2.75], face: [2.2, 2.2], sit: true },
      office_desk_priya: { at: [-1.6, 2.75], face: [-1.6, 2.2], sit: true },
      office_kitchen: { at: [8.0, 3.3], face: [8.8, 3.3] },
      office_meeting: { at: [7.1, -3.25], face: [7.1, -3.8], sit: true },
      office_manager: { at: [-7.0, -4.85], face: [-7.0, -3.6], sit: true },
      office_hr: { at: [-1.3, -4.9], face: [-1.3, -3.5] },
      office_it: { at: [-8.45, -0.55], face: [-7.2, -0.55] },
      office_door: { at: [-7.2, 4.35], face: [-6.5, 3.3] }
    },
    portals: [
      { at: [-7.5, 5.7], size: [0.9, 0.5], to: 'city', arrive: 'office_door', label: 'Leave the office', label_ko: '사무실에서 나가기' }
    ],
    spawn: 'office_door',
    lights: [
      { at: [-6, 3.5], height: 1.25, color: '#fff2dc', intensity: 1.0 },
      { at: [0.3, 2], height: 1.25, color: '#ffffff', intensity: 1.2 },
      { at: [6.5, -3.8], height: 1.25, color: '#ffffff', intensity: 1.0 },
      { at: [-5, -4], height: 1.25, color: '#fff2dc', intensity: 0.9 },
      { at: [7, 4], height: 1.25, color: '#fff2dc', intensity: 0.9 }
    ],
    ambient: 0.9,
    background: '#bcd7ec',
    outside: '#62666d',
    setup: function (api) {
      var roofs = '#8e949c';
      K.dress(api, {
        floor: { pattern: 'carpet', a: '#8b95a3' },
        floors: [
          { pattern: 'tile', a: '#ecebe6', b: '#c3bfb5', rect: [4.4, 1.7, 9, 6] },                  // kitchen
          { pattern: 'wood', a: '#c9a57c', rect: [-9, 1.3, -4.9, 6] },                              // lobby
          { pattern: 'carpet', a: '#6f7b8d', rect: [4, -6, 9, -1.5] }                               // meeting room
        ],
        walls: { color: '#e9e7e2', trim: '#b9c0c8', base: '#59616c' },
        tower: { bottom: STREET, color: '#b7c0ca', glass: '#4f6680', edge: roofs },
        ground: { pattern: 'sidewalk', y: STREET, strips: [
          { pattern: 'road', rect: [-80, 7.2, 80, 11], dir: 'x' }, { pattern: 'road', rect: [-80, -11.2, 80, -7.4], dir: 'x' },
          { pattern: 'road', rect: [10.4, -80, 13.4, 80], dir: 'z' }, { pattern: 'road', rect: [-13.4, -80, -10.4, 80], dir: 'z' }] },
        skyline: { kind: 'downtown', seed: 7, y: STREET, h: 13 },
        panels: [
          { kind: 'sign', at: [-6.5, 1.34], turn: 0, y: 0.95, w: 1.7, h: 0.42, text: 'Seaside Labs', sub: 'Welcome, new hires!', bg: '#1d4e6b', logo: '#7fd1c7', frame: '#12303f' },
          { kind: 'board', wall: 'n', along: 7.5, y: 0.78, w: 1.5, h: 0.72, text: 'Sprint 14', frame: '#9aa3ad', rim: 0.03 },
          { kind: 'tv', at: [8.853, -3.8], turn: 270, y: 0.735, w: 0.6, h: 0.33, depth: 0, a: '#2b4c7e', b: '#0f1f3a', text: 'Q3 roadmap: Summit Retail pilot' },
          { kind: 'art', wall: 'n', along: -4.5, y: 0.85, w: 0.62, h: 0.44, frame: '#2e2e33', seed: 2, palette: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261'] },
          { kind: 'poster', wall: 'n', along: -0.55, y: 0.85, w: 0.4, h: 0.55, frame: '#ffffff', text: 'Open Enrollment', lines: ['Benefits: Nov 1-15', 'Ask Linda in HR'], band: '#3d6fb4' },
          { kind: 'poster', wall: 's', along: 7.7, y: 0.85, w: 0.45, h: 0.6, frame: '#ffffff', text: 'Lunch & Learn', lines: ['Thursday 12:00', 'Pizza in the kitchen'], band: '#e07a3f' },
          { kind: 'photo', wall: 's', along: 3.5, y: 0.85, w: 0.8, h: 0.5, frame: '#2e2e33', sky: '#8cc4e8' },
          { kind: 'map', wall: 'w', along: -2.5, y: 0.85, w: 0.7, h: 0.5, frame: '#2e2e33', text: 'Fairview' }
        ]
      });
    },
    update: function (api) { K.tick(api); }
  };
})();

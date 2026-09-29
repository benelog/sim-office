/* Priya's home: a loft at Cedar Street Lofts downtown, on the second floor, one open room of 8 x 6 with windows
   on every side. The bed area is the north-west corner (a double bed, a night stand, a closet on the west wall)
   behind a half-height partition with low bookcases. Her desk stands under the big north windows next to a
   whiteboard with the roadmap; the kitchen runs along the east half of the north wall (sink, stove, a built-in
   fridge in the corner) with an island and three stools in front of it. The sofa, a chair, a glass coffee table
   and a rug face the TV on the west wall. The door is at the east end of the south wall and leads down to Cedar
   Street (city: priya_door). The day starts next to the bed (priya_bed).
   Furniture: Kenney's Furniture Kit (the modern pieces), with Quaternius's bed, night stand and closet. */
(function () {
  var K = SO_ZONE_KIT;
  function f(node, x, z, turn, extra) { return K.prop('furniture', node, x, z, turn, extra); }
  function h(node, x, z, turn, extra) { return K.prop('homeware', node, x, z, turn, extra); }
  function food(node, x, z, turn, extra) { return K.prop('food', node, x, z, turn, extra); }
  function out(pack, node, x, z, turn, extra) { extra = extra || {}; extra.lift = STREET; return K.prop(pack, node, x, z, turn, extra); }
  var DESK = 0.384, COUNTER = 0.45, STREET = -2.2;      // desk top, counter top; the street is a floor and a half down

  var props = [].concat(
    K.walls(8, 6, { n: 'wWWWwWWw', s: 'WWWWwwDw', w: 'WWwWwW', e: 'wWWWWw' }),
    [
      // ----- bed area, behind a half-height partition (x -1.7) with low bookcases
      h('bed-double', -3.2, -2.12, 0, { solid: 'fit' }),
      h('night-stand', -2.4, -2.8, 0, { solid: 'fit' }),
      f('lampSquareTable', -2.4, -2.8, 0, { lift: 0.2 }),
      h('closet', -3.8, -0.55, 90, { solid: 'fit' }),
      f('rugSquare', -2.5, -0.85, 0, { scale: 0.9 }),
      f('paneling', -1.7, -2.75, 90, { solid: 'fit' }),
      f('paneling', -1.7, -2.25, 90, { solid: 'fit' }),
      f('paneling', -1.7, -1.75, 90, { solid: 'fit' }),
      f('paneling', -1.7, -1.25, 90, { solid: 'fit' }),
      f('bookcaseOpenLow', -1.55, -1.7, 90, { solid: 'fit' }),
      f('bookcaseOpenLow', -1.55, -1.3, 90, { solid: 'fit' }),
      f('plantSmall1', -1.55, -1.3, 0, { lift: 0.4 }),
      f('books', -1.55, -1.72, 90, { lift: 0.4 }),
      // ----- desk under the north windows
      f('desk', -0.6, -2.8, 0, { solid: 'fit' }),
      f('laptop', -0.75, -2.78, 0, { lift: DESK }),
      f('computerScreen', -0.42, -2.9, -10, { lift: DESK, scale: 0.9 }),
      food('cup-tea', -0.9, -2.7, 0, { lift: DESK, scale: 0.4 }),
      f('chairDesk', -0.6, -2.3, 180),
      f('lampSquareFloor', -1.4, -2.85, 0, { solid: 'fit' }),
      f('plantSmall3', -0.3, -2.7, 0, { lift: DESK }),
      // ----- kitchen along the north wall, the island and its stools
      f('kitchenCabinetDrawer', 1.635, -2.77, 0, { solid: 'fit' }),
      f('kitchenSink', 2.065, -2.77, 0, { solid: 'fit' }),
      f('kitchenStoveElectric', 2.495, -2.77, 0, { solid: 'fit' }),
      f('kitchenCabinet', 2.925, -2.77, 0, { solid: 'fit' }),
      f('kitchenCabinet', 3.355, -2.77, 0, { solid: 'fit' }),
      f('kitchenFridgeBuiltIn', 3.785, -2.77, 0, { solid: 'fit' }),
      f('kitchenCoffeeMachine', 3.355, -2.83, 0, { lift: COUNTER }),
      f('kitchenBlender', 1.6, -2.85, 0, { lift: COUNTER }),
      f('kitchenCabinet', 2.07, -1.35, 180, { solid: 'fit' }),
      f('kitchenCabinetDrawer', 2.5, -1.35, 180, { solid: 'fit' }),
      f('kitchenCabinet', 2.93, -1.35, 180, { solid: 'fit' }),
      food('bowl-cereal', 2.1, -1.3, 0, { lift: COUNTER, scale: 0.4 }),
      food('glass', 2.3, -1.25, 0, { lift: COUNTER, scale: 0.4 }),
      food('avocado', 2.85, -1.4, 0, { lift: COUNTER, scale: 0.4 }),
      food('lemon', 2.98, -1.3, 0, { lift: COUNTER, scale: 0.4 }),
      f('stoolBar', 2.07, -0.9, 180), f('stoolBar', 2.5, -0.9, 180), f('stoolBar', 2.93, -0.9, 180),
      // ----- living area: the TV on the west wall, the sofa facing it
      f('cabinetTelevision', -3.85, 1.5, 90, { solid: 'fit' }),
      f('televisionModern', -3.85, 1.5, 90, { lift: 0.31 }),
      f('rugRectangle', -2.6, 1.5, 90),
      f('tableCoffeeGlass', -2.65, 1.5, 90, { solid: 'fit' }),
      food('cup-coffee', -2.65, 1.4, 0, { lift: 0.23, scale: 0.35 }),
      f('loungeDesignSofa', -1.5, 1.5, 270, { solid: 'fit' }),
      f('loungeDesignChair', -2.6, 2.7, 180, { solid: 'fit' }),
      f('lampRoundFloor', -1.5, 2.45, 0, { solid: 'fit' }),
      f('pottedPlant', -3.8, 2.75, 0, { solid: 'fit' }),
      f('pottedPlant', -3.8, 0.55, 0, { solid: 'fit' }),
      // ----- by the door, the east wall
      f('rugDoormat', 2.5, 2.45, 0),
      f('coatRackStanding', 3.7, 2.75, 0, { solid: 'fit' }),
      f('benchCushionLow', 1.5, 2.8, 180, { solid: 'fit' }),
      f('bookcaseClosedWide', 3.85, 0.9, 270, { solid: 'fit' }),
      f('plantSmall2', 3.85, 0.7, 0, { lift: 0.79 }),
      f('speakerSmall', 3.85, 1.15, 270, { lift: 0.79 }),
      f('pottedPlant', 3.8, -0.1, 0, { solid: 'fit' }),
      f('pottedPlant', 0.3, 2.78, 0, { solid: 'fit' }),
      // a small round table for two between the island and the door
      f('rugRound', 1.0, 0.75, 0),
      f('tableRound', 1.0, 0.75, 0, { solid: 'fit', scale: 0.8 }),
      f('chairModernCushion', 0.45, 0.75, 90), f('chairModernCushion', 1.55, 0.75, 270),
      f('plantSmall1', 1.0, 0.75, 0, { lift: 0.3 })
    ],
    // ----- outside, a floor and a half down: Cedar Street (east), the parking lot and the market, downtown's towers
    [
      out('city', 'building-skyscraper-a', -7.5, -11.5, 0), out('city', 'building-d', -1.5, -11.0, 0),
      out('city', 'building-skyscraper-c', 4.5, -12.0, 0), out('city', 'building-f', 11.0, -11.0, 0),
      out('city', 'building-h', -10.0, -1.0, 90), out('city', 'building-a', -10.0, 4.5, 90),
      out('city', 'building-g', 13.5, -3.0, 270), out('city', 'low-detail-building-wide-a', 14.0, 4.0, 270),
      out('city', 'building-e', -3.0, 11.5, 180), out('city', 'building-b', 5.0, 11.5, 180),
      out('city', 'tree-large', 5.4, -5.0, 0), out('city', 'tree-large', 5.4, 1.0, 0), out('city', 'tree-small', -2.5, -5.4, 0),
      out('roads', 'light-square', 5.6, -2.0, 90), out('roads', 'light-square', 5.6, 4.0, 90),
      out('cars', 'taxi', 7.2, -3.0, 0), out('cars', 'sedan', 9.2, 3.0, 180), out('cars', 'hatchback', -3.0, 6.0, 90)
    ]);

  SO_ZONES.home_priya = {
    name: 'Your loft', name_ko: '내 로프트',
    indoor: true,
    size: [8, 6],
    floor: '#cfd2d4',
    outside: '#c9c6bf',
    background: '#c3dcf0',
    props: props,
    places: {
      priya_bed: { at: [-2.45, -1.8], face: [-1.8, -1.0], sit: true },
      priya_kitchen: { at: [2.07, -2.05], face: [2.07, -2.8] },
      priya_desk: { at: [-0.6, -2.27], face: [-0.6, -2.8], sit: true },
      priya_out: { at: [2.5, 1.9], face: [2.0, 0.5] },
      priya_tv: { at: [-1.38, 1.5], face: [-3.85, 1.5], sit: true }
    },
    portals: [
      { at: [2.5, 2.75], size: [0.9, 0.5], to: 'city', arrive: 'priya_door', label: 'Go outside', label_ko: '밖으로 나가기' }
    ],
    spawn: 'priya_bed',
    lights: [
      { at: [0, 0.3], height: 1.25, color: '#f4f8ff', intensity: 1.2 },
      { at: [2.5, -2.0], height: 1.2, color: '#ffffff', intensity: 0.9 },
      { at: [-2.8, -1.6], height: 1.0, color: '#ffeacc', intensity: 0.6 }
    ],
    ambient: 1.0,
    setup: function (api) {
      K.dress(api, {
        floor: { pattern: 'concrete', a: '#d2d5d6' },
        floors: [
          { pattern: 'wood', a: '#e0cba8', rect: [-4, -3, -1.7, 0.1] },                              // bed area
          { pattern: 'gloss', a: '#e6e9ec', rect: [1.3, -3, 4, -0.6] }                               // kitchen
        ],
        walls: { color: '#f2f4f6', trim: '#c5ccd4', base: '#8d97a3' },
        tower: { bottom: STREET, color: '#b4563f', glass: '#4f6680', edge: '#8e949c' },              // a brick building
        ground: { pattern: 'sidewalk', y: STREET, strips: [
          { pattern: 'road', rect: [6.2, -80, 10.2, 80], dir: 'z' },                                 // Cedar Street
          { pattern: 'road', rect: [-80, -8.6, 80, -5.6], dir: 'x' },
          { pattern: 'lot', rect: [-8, 4.6, 4.5, 7.4], dir: 'x' }] },                                // the parking lot
        skyline: { kind: 'downtown', seed: 12, y: STREET, h: 12 },
        panels: [
          { kind: 'board', wall: 'n', along: 0.55, y: 0.82, w: 0.85, h: 0.55, text: 'Q4 roadmap', frame: '#9aa3ad', rim: 0.03 },
          { kind: 'poster', wall: 'e', along: 2.5, y: 0.85, w: 0.42, h: 0.56, frame: '#ffffff', text: 'Ship it', lines: ['Small steps', 'Every week'], band: '#3d6fb4', bg: '#f7f9fc' },
          { kind: 'art', wall: 'n', along: -3.5, y: 0.9, w: 0.6, h: 0.42, frame: '#2e2e33', seed: 13, palette: ['#264653', '#8ecae6', '#219ebc', '#e9ecef', '#ffb703'] },
          { kind: 'tv', at: [-3.783, 1.5], turn: 90, y: 0.585, w: 0.6, h: 0.33, depth: 0, a: '#5b7fa6', b: '#22344d', text: 'Markets: tech up 1.2%' }
        ]
      });
    },
    update: function (api) { K.tick(api); }
  };
})();

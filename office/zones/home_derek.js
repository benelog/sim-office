/* Derek's home: a detached house on River Road at the north edge of Fairview, one floor of 10 x 7. The bedroom
   is the north-west corner behind two walls (a double bed with two night stands, a closet and a dresser along
   the west wall); its door opens south into the living room (a corner sofa and an armchair around a coffee
   table, the TV on the bedroom's wall, a bookcase, speakers). The home-office nook is under the middle window of
   the north wall: a desk with two screens for the nights he is on call, a bookcase and boxes of old hardware.
   The kitchen runs along the east end of the north wall and turns the corner down the east wall, with a dining
   table for four in front of it. The front door is in the south wall and leads out to the front yard and
   River Road (city: derek_door); the washer and dryer stand by the east wall near it. The day starts next to the
   bed (derek_bed). Behind the house (north) are the back yard, the Fairview River and the mountains.
   Furniture: Quaternius's Ultimate Furniture Pack (pack 'homeware') with Kenney's Furniture Kit for the walls,
   kitchen, lamps, rugs, screens and odds and ends. */
(function () {
  var K = SO_ZONE_KIT;
  function f(node, x, z, turn, extra) { return K.prop('furniture', node, x, z, turn, extra); }
  function h(node, x, z, turn, extra) { return K.prop('homeware', node, x, z, turn, extra); }
  function food(node, x, z, turn, extra) { return K.prop('food', node, x, z, turn, extra); }
  function c(node, x, z, turn, extra) { return K.prop('city', node, x, z, turn, extra); }
  function r(node, x, z, turn, extra) { return K.prop('roads', node, x, z, turn, extra); }
  function car(node, x, z, turn, extra) { return K.prop('cars', node, x, z, turn, extra); }
  function n(node, x, z, turn, extra) { return K.prop('nature', node, x, z, turn, extra); }
  function b(node, x, z, turn, extra) { return K.prop('buildings', node, x, z, turn, extra); }
  var DESK = 0.42, TABLE = 0.33, COUNTER = 0.45;      // tops: the desk (homeware desk at 1.15), the dining table, the kitchen counter

  SO_ZONES.home_derek = {
    name: 'Your house', name_ko: '내 집',
    indoor: true,
    size: [10, 7],
    floor: '#b07d4f',
    outside: '#7aa85a',
    background: '#bcd9ee',
    props: [].concat(
      K.walls(10, 7, { n: 'wwWwwWwwWw', s: 'wWWwwwDwWw', w: 'wWwwWWw', e: 'wwWwWww' }),
      // the bedroom's walls: east (x -1.5) and south (z -0.5, the doorway at its east end)
      K.wallLine(-1.5, -3.5, 'z', 'www', 270, true),
      K.wallLine(-5, -0.5, 'x', 'wwh', 0, true),
      [
        // ----- bedroom
        h('bed-double', -3.6, -2.62, 0, { solid: 'fit' }),
        h('night-stand', -4.5, -3.3, 0, { solid: 'fit' }),
        h('night-stand', -2.7, -3.3, 0, { solid: 'fit' }),
        f('lampRoundTable', -4.5, -3.3, 0, { lift: 0.2 }),
        f('lampRoundTable', -2.7, -3.3, 0, { lift: 0.2 }),
        f('books', -2.68, -3.22, 20, { lift: 0.2, scale: 0.8 }),
        h('closet', -4.8, -1.15, 90, { solid: 'fit' }),
        f('cardboardBoxClosed', -4.8, -1.75, 0, { solid: 'fit', scale: 0.9 }),
        h('closet-short', -1.75, -1.2, 270, { solid: 'fit' }),
        f('plantSmall1', -1.75, -1.0, 0, { lift: 0.91 }),
        f('rugRound', -2.35, -1.55, 0, { scale: 0.9 }),
        // ----- home office nook (north wall, under the window)
        h('bookcase', -1.0, -3.36, 0, { solid: 'fit' }),
        h('desk', 0.5, -3.27, 0, { solid: 'fit', scale: 1.15 }),
        f('computerScreen', 0.3, -3.33, 12, { lift: DESK, scale: 0.9 }),
        f('computerScreen', 0.7, -3.33, -12, { lift: DESK, scale: 0.9 }),
        f('computerKeyboard', 0.45, -3.16, 0, { lift: DESK, scale: 0.85 }),
        f('computerMouse', 0.72, -3.16, 0, { lift: DESK }),
        food('mug', 0.18, -3.18, 40, { lift: DESK, scale: 0.4 }),
        h('office-chair', 0.5, -2.75, 180),
        f('lampSquareFloor', -0.3, -3.36, 0, { solid: 'fit' }),
        f('cardboardBoxOpen', 1.35, -3.3, 0, { solid: 'fit' }),
        f('cardboardBoxClosed', 1.75, -3.32, 15, { solid: 'fit', scale: 0.9 }),
        f('trashcan', -0.25, -2.95, 0, { solid: 'fit', scale: 0.8 }),
        // ----- kitchen: along the north wall, then down the east wall
        f('kitchenFridgeLarge', 2.59, -3.3, 0, { solid: 'fit' }),
        f('kitchenCabinet', 3.065, -3.27, 0, { solid: 'fit' }),
        f('kitchenSink', 3.495, -3.27, 0, { solid: 'fit' }),
        f('kitchenCabinetDrawer', 3.925, -3.27, 0, { solid: 'fit' }),
        f('kitchenStove', 4.355, -3.27, 0, { solid: 'fit' }),
        f('kitchenCabinet', 4.785, -3.27, 0, { solid: 'fit' }),
        f('kitchenCabinet', 4.775, -2.83, 270, { solid: 'fit' }),
        f('kitchenCabinetDrawer', 4.775, -2.4, 270, { solid: 'fit' }),
        f('kitchenCoffeeMachine', 3.065, -3.33, 0, { lift: COUNTER }),
        f('toaster', 3.93, -3.35, 0, { lift: COUNTER }),
        f('kitchenMicrowave', 4.8, -2.83, 270, { lift: COUNTER }),
        f('kitchenBlender', 4.8, -2.4, 270, { lift: COUNTER }),
        food('loaf', 4.78, -3.3, 30, { lift: COUNTER, scale: 0.4 }),
        f('trashcan', 4.8, -1.95, 0, { solid: 'fit' }),
        // dining table for four
        f('rugRectangle', 3.2, -1.0, 0, { scale: 1.1 }),
        h('table-1', 3.2, -1.0, 90, { solid: 'fit' }),
        h('chair', 2.9, -1.48, 0), h('chair', 3.5, -1.48, 0),
        h('chair', 2.9, -0.52, 180), h('chair', 3.5, -0.52, 180),
        food('plate', 2.9, -1.12, 0, { lift: TABLE, scale: 0.22 }),
        food('pancakes', 2.9, -1.12, 0, { lift: TABLE + 0.01, scale: 0.3 }),
        food('mug', 3.12, -1.15, 0, { lift: TABLE, scale: 0.4 }),
        food('carton', 3.3, -0.98, 20, { lift: TABLE, scale: 0.4 }),
        food('apple', 3.55, -0.9, 0, { lift: TABLE, scale: 0.4 }),
        food('banana', 3.62, -1.05, 60, { lift: TABLE, scale: 0.4 }),
        // ----- living room
        f('cabinetTelevision', -3.6, -0.33, 0, { solid: 'fit' }),
        f('televisionModern', -3.6, -0.33, 0, { lift: 0.31 }),
        f('speaker', -4.2, -0.38, 0, { solid: 'fit' }),
        f('speaker', -3.0, -0.38, 0, { solid: 'fit' }),
        f('rugRectangle', -3.6, 0.95, 0),
        h('sofa-corner', -3.6, 2.1, 180, { solid: 'fit' }),
        h('table-2', -3.6, 0.95, 90, { solid: 'fit', scale: 0.55 }),
        f('books', -3.8, 0.95, 15, { lift: 0.18 }),
        food('cup-coffee', -3.4, 0.9, 0, { lift: 0.18, scale: 0.4 }),
        h('armchair', -2.15, 1.25, 270, { solid: 'fit' }),
        h('bookcase', -4.87, 0.45, 90, { solid: 'fit' }),
        f('lampRoundFloor', -4.8, 1.25, 0, { solid: 'fit' }),
        f('pottedPlant', -4.75, 3.2, 0, { solid: 'fit' }),
        f('sideTableDrawers', -2.6, 3.3, 180, { solid: 'fit' }),
        f('radio', -2.6, 3.32, 180, { lift: 0.384 }),
        f('bear', -4.55, 2.2, 140, { scale: 0.6 }),
        f('pillowBlue', -3.2, 2.35, 200, { lift: 0.2 }),
        // the hall between the bedroom wall and the front door: a runner, a bookcase on the bedroom's wall, boxes
        f('rugRectangle', 0.4, 0.6, 90, { scale: 0.9 }),
        h('bookcase', -1.27, -1.6, 90, { solid: 'fit' }),
        f('cardboardBoxClosed', -1.22, -2.35, 5, { solid: 'fit' }),
        f('cardboardBoxClosed', -1.22, -2.35, 30, { lift: 0.28, scale: 0.85 }),
        f('pottedPlant', -1.9, 3.2, 0, { solid: 'fit' }),
        // ----- by the front door and the laundry corner
        f('bench', 0.3, 3.3, 180, { solid: 'fit' }),
        f('coatRackStanding', 2.35, 3.2, 0, { solid: 'fit' }),
        f('rugDoormat', 1.5, 2.95, 0),
        f('washer', 4.78, 2.2, 270, { solid: 'fit' }),
        f('dryer', 4.78, 2.62, 270, { solid: 'fit' }),
        f('cardboardBoxClosed', 4.75, 3.2, 10, { solid: 'fit' }),
        f('pottedPlant', 4.75, 0.4, 0, { solid: 'fit' }),
        f('sideTable', 4.8, 1.2, 270, { solid: 'fit' }),
        f('plantSmall2', 4.8, 1.05, 0, { lift: 0.384 }),
        f('books', 4.8, 1.35, 100, { lift: 0.384 })
      ],
      // ----- outside: the front yard, its fence and River Road (south); the back yard and the river (north)
      [
        c('fence-1x3', -6.6, 6.3, 0, { scale: 0.8 }), c('fence-1x3', -3.5, 6.3, 0, { scale: 0.8 }), c('fence-1x3', -0.6, 6.3, 0, { scale: 0.8 }),
        c('fence-1x3', 3.8, 6.3, 0, { scale: 0.8 }),
        c('fence-1x3', -6.6, -7.2, 0, { scale: 0.8 }), c('fence-1x3', -3.5, -7.2, 0, { scale: 0.8 }), c('fence-1x3', -0.4, -7.2, 0, { scale: 0.8 }),
        c('fence-1x3', 2.7, -7.2, 0, { scale: 0.8 }), c('fence-1x3', 5.8, -7.2, 0, { scale: 0.8 }),
        n('tree-common-1', -7.2, -5.2, 0), n('tree-pine-1', 7.6, -5.8, 40), n('tree-common-3', 2.2, -8.1, 80), n('tree-pine-3', -3.4, -8.2, 0),
        n('tree-common-2', -6.6, 4.6, 120), n('tree-common-5', 4.3, 5.0, 30),
        n('bush-flowers', -2.6, 4.3, 0), n('bush', -0.4, 4.4, 60), n('bush-flowers', 3.0, 4.2, 0), n('bush', -5.6, -4.3, 0), n('bush-flowers', 0.4, -4.4, 0),
        n('flower-3-group', -4.0, -4.6, 0), n('flower-4-group', 3.6, -4.5, 0), n('rock-1', 5.4, -8.3, 0, { scale: 0.5 }),
        f('bench', -2.0, -5.2, 0),
        car('suv', 7.0, 3.6, 0), car('hatchback', -8.5, 9.4, 270),
        b('house-2', -12.5, 0.5, 180), b('house-1', 13.0, 0.0, 180),
        c('building-type-c', -7.5, 15.6, 180), c('building-type-f', 0.5, 15.8, 180), c('building-type-a', 8.5, 15.6, 180),
        r('light-square', -1.0, 7.0, 0), r('light-square', 9.5, 7.0, 0), c('tree-large', -4.0, 13.0, 0), c('tree-small', 5.0, 13.0, 0)
      ]),
    places: {
      derek_bed: { at: [-2.85, -2.2], face: [-1.9, -2.2], sit: true },
      derek_kitchen: { at: [3.5, -2.45], face: [3.5, -3.3] },
      derek_desk: { at: [0.5, -2.73], face: [0.5, -3.3], sit: true },
      derek_out: { at: [1.5, 2.4], face: [1.2, 1.0] }
    },
    portals: [
      { at: [1.5, 3.25], size: [0.9, 0.5], to: 'city', arrive: 'derek_door', label: 'Go outside', label_ko: '밖으로 나가기' }
    ],
    spawn: 'derek_bed',
    lights: [
      { at: [-3.5, 1.2], height: 1.2, color: '#ffdfb0', intensity: 1.1 },
      { at: [3.2, -1.4], height: 1.2, color: '#ffe8c8', intensity: 1.1 },
      { at: [-3.3, -2.0], height: 1.1, color: '#ffd9a0', intensity: 0.8 },
      { at: [0.5, -2.9], height: 0.9, color: '#ffe2b8', intensity: 0.6 }
    ],
    ambient: 0.85,
    setup: function (api) {
      K.dress(api, {
        floor: { pattern: 'wood', a: '#b07d4f' },
        floors: [
          { pattern: 'carpet', a: '#a88f78', rect: [-5, -3.5, -1.5, -0.5] },                       // bedroom
          { pattern: 'check', a: '#efe6d2', b: '#b5653f', rect: [2.2, -3.5, 5, -1.9] }             // kitchen
        ],
        walls: { color: '#e6cfa6', trim: '#f7f0e0', base: '#7a5230' },
        ground: { pattern: 'grass', strips: [
          { pattern: 'water', rect: [-90, -18, 90, -9.4] },                                         // the Fairview River
          { pattern: 'sand', rect: [-90, -9.4, 90, -8.7] },
          { pattern: 'sidewalk', rect: [-90, 6.6, 90, 8.0] }, { pattern: 'road', rect: [-90, 8.0, 90, 12.0] },
          { pattern: 'sidewalk', rect: [-90, 12.0, 90, 13.6] },
          { pattern: 'sidewalk', rect: [1.1, 3.55, 1.9, 6.6] },                                      // the path from the door
          { pattern: 'asphalt', rect: [6.0, 1.0, 8.0, 6.6] }] },                                     // the driveway
        mountains: { side: 'n', from: 17.5, depth: 22, width: 260, height: 8.5, seed: 5 },
        wild: { seed: 17, rects: [[-80, -8, -16, 6], [16, -8, 80, 6], [-80, 19, 80, 40]], density: 5 },
        panels: [
          { kind: 'photo', wall: 'n', along: -3.6, y: 0.88, w: 0.6, h: 0.36, frame: '#6b4a2f', sky: '#f0b27a' },
          { kind: 'art', wall: 'w', along: 2.0, y: 0.85, w: 0.7, h: 0.45, frame: '#6b4a2f', seed: 9, palette: ['#bc6c25', '#dda15e', '#606c38', '#283618', '#fefae0'] },
          { kind: 'map', wall: 'e', along: -0.6, y: 0.85, w: 0.7, h: 0.5, frame: '#6b4a2f', text: 'Fairview' },
          { kind: 'poster', wall: 'n', along: 1.5, y: 0.85, w: 0.4, h: 0.52, frame: '#2e2e33', text: 'On call', lines: ['Pager first', 'Coffee second', 'Panic never'], band: '#bc4b32', bg: '#fff6e6' },
          { kind: 'tv', at: [-3.6, -0.263], turn: 0, y: 0.585, w: 0.6, h: 0.33, depth: 0, game: true, text: 'FVW 2 - 1 RDG' }
        ]
      });
    },
    update: function (api) { K.tick(api); }
  };
})();

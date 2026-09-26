/* Home: Jun's studio apartment on Maple Street, one room of 7 x 5. The bed with a night stand and a wardrobe
   are in the north-west corner, the desk (laptop, office chair, bookcase, floor lamp) under the middle window,
   and a small kitchen (fridge, counter, sink, stove, coffee machine) along the east end of the north wall. The
   sofa, armchair, rug, coffee table and TV make a living corner in the south-west; the front door is at the east
   end of the south wall and leads out to the sidewalk in front of the apartment building (city: apartment_door).
   The day starts next to the bed (home_bed). The furniture is Quaternius's Ultimate Furniture Pack (pack
   'homeware', scale 0.4; bed, night stand, wardrobe, bookcase, desk, chairs, table, sofa, armchair) with
   Kenney's Furniture Kit for the walls, kitchen, lamps, rugs, TV and plants. */
(function () {
  var K = SO_ZONE_KIT;
  function f(node, x, z, turn, extra) { return K.prop('furniture', node, x, z, turn, extra); }
  function h(node, x, z, turn, extra) { return K.prop('homeware', node, x, z, turn, extra); }
  function food(node, x, z, turn, extra) { return K.prop('food', node, x, z, turn, extra); }
  function c(node, x, z, turn, extra) { return K.prop('city', node, x, z, turn, extra); }
  function r(node, x, z, turn, extra) { return K.prop('roads', node, x, z, turn, extra); }
  function car(node, x, z, turn, extra) { return K.prop('cars', node, x, z, turn, extra); }

  SO_ZONES.home = {
    name: 'Your apartment', name_ko: '내 아파트',
    indoor: true,
    size: [7, 5],
    floor: '#c89a6a',
    outside: '#80ad5f',
    background: '#bcd9ee',
    props: [].concat(
      K.walls(7, 5, { n: 'wWwWwww', s: 'wwWwwwD', w: 'wwWww', e: 'wwWww' }),
      [
        // bed corner (the bed's head against the north wall), a wardrobe along the west wall
        h('bed-twin', -2.95, -1.78, 0, { solid: 'fit', scale: 0.85 }),
        h('night-stand', -2.35, -2.33, 0, { solid: 'fit' }),
        f('lampRoundTable', -2.35, -2.33, 0, { lift: 0.2 }),
        h('closet', -3.28, -0.55, 90, { solid: 'fit' }),
        f('rugRound', -2.3, -0.9, 0),
        // desk
        h('bookcase', -1.55, -2.36, 0, { solid: 'fit', scale: 0.9 }),
        h('desk', -0.8, -2.25, 0, { solid: 'fit' }),
        f('laptop', -0.8, -2.29, 0, { lift: 0.37 }),
        food('mug', -0.52, -2.25, 30, { lift: 0.37, scale: 0.4 }),
        h('office-chair', -0.8, -1.72, 180),
        f('lampSquareFloor', -0.2, -2.33, 0, { solid: 'fit' }),
        f('trashcan', 0.25, -2.3, 0, { solid: 'fit' }),
        // kitchen along the north wall
        f('kitchenFridgeSmall', 1.5, -2.33, 0, { solid: 'fit' }),
        f('kitchenCabinet', 1.93, -2.26, 0, { solid: 'fit' }),
        f('kitchenSink', 2.36, -2.26, 0, { solid: 'fit' }),
        f('kitchenStove', 2.79, -2.26, 0, { solid: 'fit' }),
        f('kitchenCabinet', 3.22, -2.26, 0, { solid: 'fit' }),
        f('kitchenCoffeeMachine', 3.22, -2.32, 0, { lift: 0.45 }),
        f('kitchenMicrowave', 1.93, -2.3, 0, { lift: 0.45 }),
        f('pottedPlant', 3.25, -0.9, 0, { solid: 'fit' }),
        // two-seat table
        h('table-1', 1.1, 0.3, 0, { solid: 'fit', scale: 0.8 }),
        h('chair', 1.1, 0.95, 180),
        h('chair', 1.1, -0.35, 0),
        food('bowl-cereal', 1.0, 0.45, 0, { lift: 0.27, scale: 0.4 }),
        food('carton-small', 1.25, 0.15, 0, { lift: 0.27, scale: 0.4 }),
        // living corner
        f('rugRectangle', -2.4, 1.2, 90),
        h('sofa-2', -3.2, 1.2, 90, { solid: 'fit', scale: 0.85 }),
        h('armchair', -2.45, 1.98, 180, { solid: 'fit' }),
        h('table-2', -2.5, 1.15, 90, { solid: 'fit', scale: 0.55 }),
        food('cup-tea', -2.5, 1.0, 0, { lift: 0.18, scale: 0.4 }),
        f('cabinetTelevision', -1.6, 1.2, 270, { solid: 'fit' }),
        f('televisionModern', -1.6, 1.2, 270, { lift: 0.31 }),
        f('lampRoundFloor', -3.25, 0.45, 0, { solid: 'fit' }),
        f('pottedPlant', -3.25, 2.2, 0, { solid: 'fit' }),
        // by the door
        f('coatRackStanding', 2.1, 2.2, 0, { solid: 'fit' }),
        f('rugDoormat', 3.0, 1.6, 0),
        f('pottedPlant', 0.4, 2.25, 0, { solid: 'fit' })
      ],
      // ----- outside: Maple Street in front (south), backyards behind, the neighbours' houses
      [
        c('building-type-c', -6.5, 13.4, 180), c('building-type-e', 0.5, 13.6, 180), c('building-type-b', 7.5, 13.5, 180),
        c('building-type-d', -9.8, -9.6, 0), c('building-type-g', 1.5, -9.8, 0), c('building-type-h', 9.5, -9.6, 0),
        c('tree-large', -5.2, -4.8, 0), c('tree-small', 4.8, -4.6, 0), c('tree-large', 6.5, 3.4, 0),
        c('tree-small', -6.2, 3.2, 0), c('tree-large', -2.5, 10.8, 0), c('tree-small', 4.0, 11.0, 0),
        c('fence-1x3', -1.4, -5.2, 0, { scale: 0.8 }), c('fence-1x3', 1.8, -5.2, 0, { scale: 0.8 }),
        r('light-square', 1.0, 4.2, 0), car('sedan', -3.0, 5.6, 90), car('suv', 6.0, 9.6, 270)
      ]),
    places: {
      home_bed: { at: [-2.42, -1.55], face: [-1.4, -1.55], sit: true },
      home_desk: { at: [-0.8, -1.7], face: [-0.8, -2.2], sit: true },
      home_kitchen: { at: [2.36, -1.5], face: [2.36, -2.3] },
      home_door: { at: [3.0, 1.0], face: [2.6, -0.2] }
    },
    portals: [
      { at: [3.0, 2.25], size: [0.9, 0.5], to: 'city', arrive: 'apartment_door', label: 'Go outside', label_ko: '밖으로 나가기' }
    ],
    spawn: 'home_bed',
    lights: [
      { at: [0, 0], height: 1.2, color: '#ffe8c8', intensity: 1.2 },
      { at: [-0.3, -2.1], height: 0.9, color: '#ffd9a0', intensity: 0.6 }
    ],
    ambient: 0.9,
    setup: function (api) {
      K.dress(api, {
        floor: { pattern: 'wood', a: '#c79866' },
        floors: [{ pattern: 'tile', a: '#e9e4da', b: '#b9b2a4', rect: [1.1, -2.5, 3.5, -1.55] }],
        walls: { color: '#f1e6d2', trim: '#fbf7ee', base: '#a57b52' },
        ground: { pattern: 'grass', strips: [
          { pattern: 'sidewalk', rect: [-80, 2.55, 80, 4.4] }, { pattern: 'road', rect: [-80, 4.4, 80, 8.4] },
          { pattern: 'sidewalk', rect: [-80, 8.4, 80, 10.2] }, { pattern: 'sidewalk', rect: [2.6, 2.5, 3.4, 2.56] }] },
        skyline: { kind: 'suburb', seed: 3 },
        panels: [
          { kind: 'photo', wall: 'n', along: -3.05, y: 0.82, w: 0.42, h: 0.3, frame: '#6b4a2f' },
          { kind: 'art', wall: 'w', along: 1.2, y: 0.85, w: 0.72, h: 0.42, frame: '#2e2e33', seed: 4 },
          { kind: 'poster', wall: 'e', along: 1.0, y: 0.78, w: 0.36, h: 0.5, frame: '#ffffff', text: 'Farmers Market', lines: ['Saturdays 8-1', 'Oak Ave & Main'], band: '#2a9d8f' },
          { kind: 'tv', at: [-1.667, 1.2], turn: 270, y: 0.585, w: 0.6, h: 0.33, depth: 0, text: 'Fairview: sunny, high of 72' }
        ]
      });
    },
    update: function (api) { K.tick(api); }
  };
})();

/* City: downtown Fairview, 39 x 39, outdoors. Three streets each way (every road tile is 3 x 3) make four
   blocks around the crossroads at the origin; Maple Street runs east-west through z = 0 and Lake Avenue
   north-south through x = 0, and both carry on to the edge of town (Lake Avenue crosses the river on a bridge
   to the north). North-west: the homes, with the apartment building (apartment_door) and the bus stop on the
   Maple Street sidewalk. North-east: the office towers; Seaside Labs is the tall one (office_door) with a plaza
   and Nina's coffee cart on the corner. South-west: Seaside Park with trees, flower beds, a monument and benches
   (park_bench). South-east: the diner (diner_door) and the grocery store (market_door) face Maple Street, with a
   small parking lot behind them (parking). The airport shuttle waits at the east end of Maple Street
   (airport_shuttle). The Fairview River runs along the north edge of town with the mountains rising beyond it
   (from z -48, low enough for the camera, which looks down, to see the ridge); south of town the plain runs down
   to a beach and the sea (from z 31; the range and the sea are SO_ZONE_KIT.dress, which also scatters the woods
   of the plains around town, pack 'wild', where nobody can walk). Roads and sidewalks are walkable;
   buildings, parked cars, trees, water and street furniture block.
   Trees, bushes, flowers, rocks and the park's paths are Quaternius's Stylized Nature MegaKit (pack 'nature', scale 0.4),
   the park's signs, lilies and ornaments Kenney's Nature Kit (pack 'park'); six buildings (the apartment house, two
   homes, three downtown) are Quaternius's Buildings Pack (pack 'buildings'), the rest Kenney's city kits; the
   `map` block names the streets and areas for the town map (Menu > Map). */
(function () {
  var K = SO_ZONE_KIT;
  function f(node, x, z, turn, extra) { return K.prop('furniture', node, x, z, turn, extra); }
  function c(node, x, z, turn, extra) { return K.prop('city', node, x, z, turn, extra); }
  function b(node, x, z, turn, extra) { return K.prop('buildings', node, x, z, turn, extra); }   // Quaternius Buildings Pack (scale 1)
  function r(node, x, z, turn, extra) { return K.prop('roads', node, x, z, turn, extra); }
  function car(node, x, z, turn, extra) { return K.prop('cars', node, x, z, turn, extra); }
  function food(node, x, z, turn, extra) { return K.prop('food', node, x, z, turn, extra); }
  // plants and rocks: Quaternius Stylized Nature MegaKit (pack 'nature', scale 0.4); signs, lilies, logs, pots, the canoe
  // and the monument: Kenney Nature Kit (pack 'park', scale 2). RESIZE tunes a few pieces to the sizes the park was laid out for.
  var PARK = /^(sign|lily|log|stump|pot_|canoe|statue|bridge|fence)/;
  var RESIZE = { 'tree-twisted-1': 0.6, 'tree-common-5': 0.85, bush: 1.2, 'plant-1-big': 0.6, 'pebble-square-1': 2.5, mushroom: 1.5, 'path-square-thin': 1.25, 'path-round-wide': 1.2 };
  function n(node, x, z, turn, extra) {
    extra = extra || {};
    if (RESIZE[node]) extra.scale = (extra.scale || 1) * RESIZE[node];
    return K.prop(PARK.test(node) ? 'park' : 'nature', node, x, z, turn, extra);
  }
  // a tree, a bush or a rock that blocks; the footprint is roughly the trunk / the piece
  function tree(node, x, z, turn, scale) { return n(node, x, z, turn || 0, { solid: [0.5, 0.5], scale: scale || 1 }); }
  function bush(node, x, z, turn, scale) { return n(node, x, z, turn || 0, { solid: 'fit', scale: scale || 1 }); }
  function bit(node, x, z, turn, scale) { return n(node, x, z, turn || 0, { scale: scale || 1 }); }    // no collision: flowers, grass, lilies
  function flower(node, x, z, turn) { return bit(node, x, z, turn, 0.55); }
  // a path piece as a thin plate: the kit's pieces have a 0.05 base that prop() would lift them by; sink it instead
  function plate(node, x, z, turn, scale) { var o = n(node, x, z, turn || 0, { scale: scale || 1 }); o.lift = 0.02; return o; }

  // ----- ground: road grid on 3 x 3 tiles, cell (i, k) has its centre at (3i, 3k), i and k in -6..6
  var tiles = [];
  function tile(node, i, k, turn) { tiles.push(r(node, 3 * i, 3 * k, turn || 0)); }
  var ROAD = [-5, 0, 5];
  var BEND = { '-5,-5': 90, '5,-5': 0, '-5,5': 180, '5,5': 270 };  // road-bend joins -x and +z at turn 0
  for (var i = -6; i <= 6; i++) for (var k = -6; k <= 6; k++) {
    var v = ROAD.indexOf(i) >= 0 && (i === 0 || Math.abs(k) <= 5);   // on a north-south road
    var h = ROAD.indexOf(k) >= 0 && (k === 0 || Math.abs(i) <= 5);   // on an east-west road
    var key = i + ',' + k;
    if (BEND[key] !== undefined) tile('road-bend', i, k, BEND[key]);
    else if (v && h) tile('road-crossroad-line', i, k, 0);
    else if (h) tile(k === 0 && Math.abs(i) === 1 ? 'road-crossing' : 'road-straight', i, k, 0);
    else if (v) tile(i === 0 && Math.abs(k) === 1 ? 'road-crossing' : 'road-straight', i, k, 90);
    else if (Math.abs(i) >= 1 && Math.abs(i) <= 4 && Math.abs(k) >= 1 && Math.abs(k) <= 4) {
      // blocks: the two commercial blocks (east) are paved; the homes and the park only along Maple Street
      if (i > 0 || Math.abs(k) === 1) tile('tile-low', i, k, 0);
    }
  }
  tile('tile-low', 6, -1, 0);           // airport shuttle stop, east end of Maple Street
  tiles.push(r('road-straight', 0, -21, 90));                                                          // Lake Avenue north of town: the running trail crosses it here
  [-24, -27].forEach(function (z) { tiles.push(r('road-straight', 0, z, 90, { lift: 0.05 })); });    // the Lake Avenue bridge over the river, clear of the trail
  // garden paths
  [-5.0, -4.6].forEach(function (z) { tiles.push(c('path-short', -9.88, z, 0)); });
  // the park's entrance path, from the gate to the plaza
  [5.35, 6.35].forEach(function (z) { tiles.push(plate('path-square-thin', -7.5, z, 90, 1.1)); });
  tiles.push(plate('path-round-wide', -7.5, 7.6, 0, 1.9));          // the plaza between the benches
  tiles.push(plate('path-round-wide', -7.5, 10.9, 0, 1.5));         // under the monument
  [9.3, 9.9].forEach(function (z) { tiles.push(plate('path-square-thin', -7.5, z, 90, 0.9)); });

  var props = [
    // ----- north-west: homes on Maple Street
    b('building-2-large', -10.3, -7.3, 0, { solid: 'fit', id: 'apartment', home: 'jun' }),      // Jun's apartment building (red roof, dormers)
    c('building-type-a', -4.4, -7.0, 0, { solid: 'fit' }),
    b('house-1', -10, -11.4, 180, { solid: 'fit', id: 'derek_house', home: 'derek' }),      // Derek's house, its front on River Road
    b('house-2', -4.5, -11.6, 180, { solid: 'fit' }),
    tree('tree-common-1', -13.0, -9.5),
    tree('tree-common-5', -7.2, -9.6),
    tree('tree-common-2', -2.2, -9.3),
    c('fence', -12.9, -4.75, 0, { solid: 'fit', scale: 0.7 }),
    c('fence', -6.9, -4.75, 0, { solid: 'fit', scale: 0.7 }),
    c('planter', -11.3, -4.85, 0, { solid: 'fit' }),
    c('planter', -8.45, -4.85, 0, { solid: 'fit' }),
    // front gardens: flowers and shrubs behind the fences
    flower('flower-3-group', -12.8, -5.3, 0), flower('flower-4', -12.3, -5.25, 30), flower('flower-3-group', -13.3, -5.3, 0),
    flower('flower-4-group', -7.2, -5.3, 0), flower('flower-3', -6.6, -5.3, 60), flower('flower-4-group', -6.1, -5.25, 0),
    bush('bush-flowers', -13.0, -5.6, 0, 1.0), bush('bush-flowers', -5.2, -5.5, 20, 1.0), bush('bush-flowers', -1.9, -5.9, 0, 0.9),
    bit('grass-wispy-short', -11.0, -5.6, 0, 0.6), bit('grass-short', -3.0, -5.7, 40, 0.6),
    // bus stop on Maple Street
    { pack: 'box', size: [1.5, 0.9, 0.06], at: [-5.0, -2.85], color: '#8fb3cf', solid: [1.5, 0.1] },
    c('detail-overhang-wide', -5.6, -2.55, 0),                                      // the shelter's roof on two posts
    f('bench', -5.23, -2.6, 0),
    f('bench', -4.77, -2.6, 0),
    r('road-sign-street', -6.1, -1.85, 0, { solid: [0.2, 0.2] }),
    r('light-square', -12.5, -1.75, 180, { solid: [0.2, 0.2] }),
    r('light-square', -2.3, -1.75, 180, { solid: [0.2, 0.2] }),

    // ----- north-east: offices
    c('building-skyscraper-b', 8.2, -8, 0, { solid: 'fit', id: 'seaside_labs' }),
    c('building-skyscraper-a', 4.0, -10.9, 0, { solid: 'fit' }),
    b('building-3-big', 12, -11.6, 0, { solid: 'fit' }),
    b('building-4', 12.2, -6.7, 90, { solid: 'fit' }),
    c('planter', 6.6, -5.0, 0, { solid: 'fit' }),
    c('planter', 9.8, -5.0, 0, { solid: 'fit' }),
    c('tree-small', 5.4, -4.6, 0, { solid: [0.4, 0.4] }),
    c('tree-small', 12.6, -4.4, 0, { solid: [0.4, 0.4] }),
    n('pot_large', 11.4, -4.5, 0, { solid: 'fit', scale: 0.8 }),
    bit('plant-1-big', 11.4, -4.5, 0, 0.6),
    f('bench', 6.6, -4.25, 0),
    f('bench', 9.8, -4.25, 0),
    // Nina's coffee cart on the corner of Maple and Lake
    f('kitchenBar', 3.3, -4.0, 0, { solid: 'fit' }),
    f('kitchenBar', 3.73, -4.0, 0, { solid: 'fit' }),
    f('kitchenBar', 4.16, -4.0, 0, { solid: 'fit' }),
    f('kitchenCoffeeMachine', 3.3, -4.02, 0, { lift: 0.42 }),
    food('cup-coffee', 3.85, -3.98, 0, { lift: 0.42, scale: 0.4 }),
    food('cup-coffee', 4.05, -3.96, 40, { lift: 0.42, scale: 0.4 }),
    food('muffin', 4.25, -4.0, 0, { lift: 0.42, scale: 0.4 }),
    c('detail-parasol-a', 2.4, -3.2, 0, { solid: [0.3, 0.3], scale: 0.7 }),
    c('detail-parasol-b', 5.2, -2.7, 0, { solid: [0.3, 0.3], scale: 0.7 }),
    f('trashcan', 4.8, -4.3, 0, { solid: 'fit' }),
    r('light-square', 6.5, -1.75, 180, { solid: [0.2, 0.2] }),
    r('light-square', 12.5, -1.75, 180, { solid: [0.2, 0.2] }),
    r('light-square', 1.75, -7.0, 90, { solid: [0.2, 0.2] }),

    // ----- crossroads at the origin
    r('traffic-light', -1.75, -1.75, 180, { solid: [0.25, 0.25] }),
    r('traffic-light', 1.75, -1.75, 90, { solid: [0.25, 0.25] }),
    r('traffic-light', -1.75, 1.75, 270, { solid: [0.25, 0.25] }),
    r('traffic-light', 1.75, 1.75, 0, { solid: [0.25, 0.25] }),
    r('road-sign-stop', -13.25, 1.75, 0, { solid: [0.2, 0.2] }),
    r('road-sign-stop', 13.25, -1.75, 180, { solid: [0.2, 0.2] }),

    // ----- south-west: Seaside Park (x -13.5..-1.5, z 4.65..13.5; Elm Street's tile runs to x -13.5), the gate at x = -7.5 on Maple Street
    c('fence', -12.9, 4.65, 0, { solid: 'fit', scale: 0.7 }),
    c('fence', -11.9, 4.65, 0, { solid: 'fit', scale: 0.7 }),
    c('fence', -10.9, 4.65, 0, { solid: 'fit', scale: 0.7 }),
    c('fence', -9.9, 4.65, 0, { solid: 'fit', scale: 0.7 }),
    c('fence', -8.9, 4.65, 0, { solid: 'fit', scale: 0.7 }),
    c('fence', -6.1, 4.65, 0, { solid: 'fit', scale: 0.7 }),
    c('fence', -5.1, 4.65, 0, { solid: 'fit', scale: 0.7 }),
    c('fence', -4.1, 4.65, 0, { solid: 'fit', scale: 0.7 }),
    c('fence', -3.1, 4.65, 0, { solid: 'fit', scale: 0.7 }),
    c('fence', -2.1, 4.65, 0, { solid: 'fit', scale: 0.7 }),
    { pack: 'box', size: [0.08, 1.45, 0.08], at: [-8.38, 4.6], color: '#4a5a3c', solid: [0.1, 0.1] },     // the gate's posts (the sign is drawn in setup)
    { pack: 'box', size: [0.08, 1.45, 0.08], at: [-6.62, 4.6], color: '#4a5a3c', solid: [0.1, 0.1] },
    c('planter', -8.4, 5.2, 0, { solid: 'fit' }),
    c('planter', -6.6, 5.2, 0, { solid: 'fit' }),
    // the plaza: benches round the stone circle, the monument behind them
    f('bench', -7.72, 9.0, 180),
    f('bench', -7.28, 9.0, 180),
    f('bench', -9.0, 7.6, 90),
    f('bench', -6.0, 7.6, 270),
    f('trashcan', -8.3, 9.05, 0, { solid: 'fit' }),
    n('statue_obelisk', -7.5, 10.9, 0, { solid: [0.7, 0.7] }),
    flower('flower-3', -8.4, 10.3, 0), flower('flower-4', -8.6, 11.0, 0), flower('flower-3-group', -8.3, 11.6, 0),
    flower('flower-4-group', -6.6, 10.3, 0), flower('flower-3', -6.4, 11.0, 0), flower('flower-4', -6.7, 11.6, 0),
    flower('flower-3-group', -7.9, 11.9, 0), flower('flower-4-group', -7.1, 11.9, 0),
    // flowers along the entrance path
    flower('flower-4-group', -8.2, 5.4, 0), flower('flower-3-group', -8.25, 6.1, 0), flower('flower-4', -8.15, 6.7, 0),
    flower('flower-3', -6.8, 5.4, 0), flower('flower-3-group', -6.75, 6.1, 0), flower('flower-4-group', -6.85, 6.7, 0),
    // shrubs inside the fence
    bush('bush-flowers', -12.9, 5.6, 0, 0.9), bush('bush-flowers', -11.2, 5.4, 0, 1), bush('bush', -9.8, 5.5, 30, 1),
    bush('bush-flowers', -5.0, 5.4, 0, 1), bush('bush-flowers', -2.6, 5.6, 0, 0.9),
    // trees
    tree('tree-common-1', -12.2, 6.9),
    tree('tree-common-3', -13.1, 10.4),
    tree('tree-common-2', -12.4, 12.3),
    tree('tree-common-2', -4.0, 6.6),
    tree('tree-pine-4', -2.8, 10.4),
    tree('tree-common-2', -5.6, 12.6),
    tree('tree-pine-2', -13.1, 7.9),
    tree('tree-common-3', -9.6, 12.5),
    tree('tree-common-5', -10.2, 9.6, 0, 1.1),
    tree('tree-pine-3', -2.3, 13.0, 0, 0.9),
    // the quiet corner: a fallen log, a stump, mushrooms, rocks
    n('log', -11.6, 10.6, 35, { solid: 'fit' }),
    bush('stump_round', -10.8, 11.4, 0, 1),
    bit('mushroom-laetiporus', -11.3, 11.7, 0, 0.7), bit('mushroom', -12.2, 8.3, 0, 0.7),
    n('rock-1', -13.1, 12.8, 20, { solid: 'fit', scale: 0.6 }),
    bit('rock-2', -12.5, 13.2, 0, 0.8), bit('pebble-square-1', -13.3, 11.6, 0, 0.8),
    n('rock-2', -3.4, 8.6, 70, { solid: 'fit', scale: 0.5 }),
    bit('grass-tall', -13.3, 8.6, 0, 0.6), bit('grass-short', -9.2, 6.4, 0, 0.6), bit('grass-wispy-short', -5.2, 8.6, 0, 0.6), bit('grass-short', -4.4, 11.6, 0, 0.6),
    bit('grass-short', -11.0, 8.9, 0, 0.6), bit('grass-wispy-short', -6.2, 10.8, 0, 0.6),
    r('light-square', -12.5, 1.75, 0, { solid: [0.2, 0.2] }),
    r('light-square', -4.0, 1.75, 0, { solid: [0.2, 0.2] }),

    // ----- south-east: diner, grocery store, parking lot
    c('building-e', 5.4, 5.0, 180, { solid: 'fit', id: 'diner' }),
    c('detail-awning-wide', 4.8, 3.25, 180),
    c('building-a', 11.0, 5.2, 180, { solid: 'fit', id: 'market' }),
    c('detail-awning-wide', 11.0, 3.54, 180),
    food('barrel', 12.35, 3.45, 0, { solid: 'fit' }),
    food('watermelon', 12.35, 3.45, 0, { lift: 0.41, scale: 0.8 }),
    f('cardboardBoxOpen', 9.75, 3.5, 0, { solid: 'fit', scale: 1.6 }),
    food('apple', 9.72, 3.5, 0, { lift: 0.42, scale: 0.8 }),
    food('orange', 9.85, 3.46, 0, { lift: 0.42, scale: 0.8 }),
    r('dumpster', 3.0, 7.4, 90, { solid: 'fit' }),
    b('building-1-small', 11.8, 11.2, 270, { solid: 'fit', id: 'priya_lofts', home: 'priya' }),      // Cedar Street Lofts (Priya), its front on the parking lot
    car('sedan', 3.6, 10.8, 0, { solid: 'fit' }),
    car('suv', 5.2, 10.8, 0, { solid: 'fit' }),
    car('hatchback', 6.8, 10.8, 0, { solid: 'fit' }),
    r('construction-cone', 8.1, 12.3, 0),
    n('pot_small', 2.9, 3.3, 0, { solid: 'fit', scale: 0.9 }),
    bit('plant-1', 2.9, 3.3, 0, 0.6),
    r('light-square', 2.3, 1.75, 0, { solid: [0.2, 0.2] }),
    r('light-square', 8.2, 1.75, 0, { solid: [0.2, 0.2] }),
    r('light-square', 13.2, 8.0, 270, { solid: [0.2, 0.2] }),

    // ----- cars parked along the streets
    car('taxi', -8.0, 0.8, 90, { solid: 'fit' }),
    car('sedan', 13.0, -0.8, 270, { solid: 'fit' }),
    car('sports-car-2', -0.8, 9.5, 180, { solid: 'fit' }),
    car('sports-car', 0.8, -10.5, 0, { solid: 'fit' }),
    car('suv', 14.2, 7.5, 180, { solid: 'fit' }),

    // ----- airport shuttle stop, east end of Maple Street
    car('suv', 18.0, -0.8, 90, { solid: 'fit', id: 'airport_shuttle' }),
    r('road-sign-street', 19.0, -2.0, 0, { solid: [0.2, 0.2] }),
    f('bench', 17.0, -3.8, 0),
    f('bench', 17.45, -3.8, 0),

    // ----- the Fairview River along the north edge, Lake Avenue crossing it on a bridge
    { pack: 'box', size: [98.5, 0.02, 5.6], at: [-50.75, -25.4], color: '#4f97d6', solid: [98.5, 5.6] },
    { pack: 'box', size: [98.5, 0.02, 5.6], at: [50.75, -25.4], color: '#4f97d6', solid: [98.5, 5.6] },
    { pack: 'box', size: [3.0, 0.02, 5.6], at: [0, -25.4], color: '#4f97d6' },
    { pack: 'box', size: [0.12, 0.42, 6.0], at: [-1.42, -25.5], color: '#8a7a66', lift: 0.05, solid: [0.14, 6.0] },   // the bridge's railings
    { pack: 'box', size: [0.12, 0.42, 6.0], at: [1.42, -25.5], color: '#8a7a66', lift: 0.05, solid: [0.14, 6.0] },
    // the bank: reeds, rocks, a canoe pulled up on the grass, lilies in the water
    n('canoe', -13.6, -22.15, 80, { solid: 'fit' }),
    bit('grass-tall', -11.0, -22.25, 0, 0.6), bit('grass-tall', -3.3, -22.25, 30, 0.6), bit('grass-tall', 5.5, -22.25, 0, 0.6),
    bit('grass-tall', 12.5, -22.25, 60, 0.6), bit('grass-short', -16.2, -22.25, 0, 0.6), bit('grass-short', 8.6, -22.25, 0, 0.6), bit('grass-wispy-short', -7.8, -22.25, 0, 0.6),
    bit('rock-2', -16.0, -22.25, 0, 0.9), bit('rock-1', -6.4, -22.25, 10, 0.5), bit('rock-1', 3.6, -22.25, 0, 0.9),
    bit('rock-3', 15.2, -22.25, 50, 0.55),
    bit('lily_large', -8.0, -23.4, 0, 0.8), bit('lily_small', -7.3, -23.8, 0, 0.8), bit('lily_large', 4.2, -23.5, 40, 0.8), bit('lily_small', 10.6, -23.3, 0, 0.8),
    bit('lily_small', -14.6, -23.6, 0, 0.8), bit('lily_large', 16.4, -23.7, 0, 0.8),

    // ----- scenery at the edge of town
    tree('tree-pine-4', -18.0, -17.6),
    tree('tree-common-1', -18.2, 9.0),
    tree('tree-pine-1', -17.8, -8.0),
    tree('tree-common-3', 18.0, 18.0),
    tree('tree-pine-3', 17.8, 9.5),
    tree('tree-pine-2', 18.2, -12.0),
    tree('tree-common-2', 8.0, 18.2),
    tree('tree-pine-4', -9.0, 18.0),
    tree('tree-pine-3', -6.0, -17.6),
    tree('tree-pine-4', 9.0, -17.6),
    tree('tree-pine-1', -18.5, 2.6),
    tree('tree-common-5', -18.4, -13.5),
    tree('tree-common-1', -18.6, 14.6),
    tree('tree-common-2', 18.5, 4.0),
    tree('tree-pine-2', 14.0, 18.3),
    tree('tree-common-5', -14.2, 18.4),
    tree('tree-common-1', -3.6, -17.7),
    tree('tree-pine-4', 3.8, -17.7),
    tree('tree-twisted-1', 15.0, -17.5),
    tree('tree-common-1', -13.5, -17.6),
    n('rock-3', -17.6, 13.2, 0, { solid: 'fit', scale: 0.7 }),
    n('rock-2', 17.3, 12.6, 30, { solid: 'fit', scale: 0.6 }),
    bit('grass-tall', -17.2, -3.0, 0, 0.6), bit('grass-short', 17.6, -6.5, 0, 0.6), bit('grass-tall', 12.0, -17.9, 0, 0.6), bit('grass-short', -11.6, -17.6, 0, 0.6)
  ];

  SO_ZONES.city = {
    name: 'Downtown Fairview', name_ko: '페어뷰 시내',
    indoor: false,
    size: [39, 39],
    floor: '#86b86a',
    tiles: tiles,
    props: props,
    places: {
      apartment_door: { at: [-9.88, -3.9], face: [-7.5, -3.6] },
      bus_stop: { at: [-3.9, -2.3], face: [-3.9, -0.8] },
      coffee_cart: { at: [3.73, -4.55], face: [3.73, -3.2] },
      park_bench: { at: [-7.5, 9.0], face: [-7.5, 8.0], sit: true },
      office_door: { at: [8.2, -4.4], face: [6.0, -4.2] },
      diner_door: { at: [4.8, 2.2], face: [3.0, 2.0] },
      market_door: { at: [11.0, 2.3], face: [9.0, 2.1] },
      parking: { at: [9.2, 9.0], face: [5.2, 10.8] },
      airport_shuttle: { at: [18.0, -3.0], face: [18.0, -1.2] },
      derek_door: { at: [-10.0, -13.72], face: [-10.0, -15.0] },
      priya_door: { at: [9.95, 11.2], face: [8.5, 11.2] }
    },
    portals: [
      // the homes: a door is there only in the game of the hero who lives behind it
      { at: [-9.88, -5.05], size: [1.0, 0.6], to: 'home', arrive: 'home_door', label: 'Go home', label_ko: '집에 들어가기', hero: 'jun' },
      { at: [-10.0, -13.5], size: [1.0, 0.24], to: 'home_derek', arrive: 'derek_out', label: 'Go home', label_ko: '집에 들어가기', hero: 'derek' },
      { at: [10.27, 11.2], size: [0.3, 1.0], to: 'home_priya', arrive: 'priya_out', label: 'Go home', label_ko: '집에 들어가기', hero: 'priya' },
      { at: [8.2, -5.6], size: [1.4, 0.6], to: 'office', arrive: 'office_door', label: 'Enter Seaside Labs', label_ko: '시사이드 랩스에 들어가기' },
      { at: [4.8, 3.05], size: [1.0, 0.6], to: 'diner', arrive: 'diner_door', label: 'Enter the diner', label_ko: '식당에 들어가기' },
      { at: [11.0, 3.35], size: [1.0, 0.6], to: 'market', arrive: 'market_door', label: 'Enter the grocery store', label_ko: '식료품점에 들어가기' },
      { at: [18.0, -1.9], size: [1.2, 0.6], to: 'airport', arrive: 'airport_door', label: 'Take the airport shuttle', label_ko: '공항 셔틀 타기' }
    ],
    // you can walk out of town as far as the running trail round it (office/jog.js), the river bank and the beach
    bounds: [-21.9, -22.45, 21.9, 33.7],
    spawn: 'apartment_door',
    ambient: 1.0,
    // the town map (Menu > Map): street names along the roads, names of areas without a place of their own
    map: {
      streets: [
        { name: 'Maple Street', along: 'x', at: 0 }, { name: 'Lake Avenue', along: 'z', at: 0 },
        { name: 'River Road', along: 'x', at: -15 }, { name: 'Birch Street', along: 'x', at: 15 },
        { name: 'Elm Street', along: 'z', at: -15 }, { name: 'Cedar Street', along: 'z', at: 15 }
      ],
      areas: [
        { name: 'Seaside Park', name_ko: '시사이드 공원', at: [-11.5, 11.5] },
        { name: 'Fairview River', name_ko: '페어뷰 강', at: [10, -25.4], water: true },
        { name: 'Seaside Labs', name_ko: '시사이드 랩스', at: [8.2, -8.6] }
      ]
    },
    setup: function (api) {
      api.solid(-19.0, 21.3, 19.0, 27.3);          // the woods between the town and the beach
      // signs on the fronts of the buildings you go into, the bus stop's timetable, Nina's cart and the park gate
      K.dress(api, { mountains: { side: 'n', from: 48, depth: 44, width: 380, height: 7.5, seed: 3 }, sea: { side: 's', from: 31, beach: 3, width: 340, depth: 140 },
        // the plains beyond the edge of town (out of reach): woods west and east of town on both banks of the river, north
        // of the river up to the foothills, and south of town down to the beach
        wild: { seed: 11, rects: [[-90, -46, -21.5, -29], [-90, -22, -21.5, 19.5], [21.5, -46, 90, -29], [21.5, -22, 90, 19.5], [-21.5, -46, 21.5, -29], [-90, 21, 90, 27.5]],
          avoid: [[-90, -3, 90, 3], [-3, -46, 3, 19.5],
            [-23.2, -23, -19.2, 32], [19.2, -23, 23.2, 32], [-24, 26.8, 24, 32]] },          // the running trail (office/jog.js), with room on both sides
        panels: [
        { kind: 'sign', at: [8.2, -5.94], turn: 0, y: 1.75, w: 2.6, h: 0.52, text: 'Seaside Labs', bg: '#1d4e6b', logo: '#7fd1c7', frame: '#12303f' },
        { kind: 'sign', at: [5.4, 3.47], turn: 180, y: 1.55, w: 2.8, h: 0.5, text: 'Sunny Side Diner', bg: '#c0392b', fg: '#fff6d8', border: '#ffd166', frame: '#7e2a23' },
        { kind: 'sign', at: [11.0, 3.77], turn: 180, y: 1.75, w: 2.4, h: 0.48, text: 'Fairview Market', bg: '#3f8f5a', logo: '#ffd166', frame: '#2f6b45' },
        { kind: 'sign', at: [11.0, 3.77], turn: 180, y: 2.3, w: 1.9, h: 0.3, text: 'Pharmacy · Walk-in Clinic', bg: '#2b6cb0', fg: '#ffffff', frame: '#1d4f86', depth: 0.02 },          // inside, at the back
        { kind: 'poster', at: [-5.35, -2.81], turn: 0, y: 0.5, w: 0.62, h: 0.8, frame: '#5f6f7f', text: 'Route 5', lines: ['Maple St - Downtown', 'Every 15 min, 6am-11pm', 'Fare $2.00'], band: '#2b5d8a', depth: 0.01 },
        { kind: 'sign', at: [-4.1, -2.26], turn: 0, y: 1.3, w: 0.5, h: 0.22, text: 'BUS', sub: 'Route 5', bg: '#2b5d8a', frame: '#1c3d5c', depth: 0.02 },
        { kind: 'sign', at: [3.73, -3.89], turn: 0, y: 0.24, w: 1.15, h: 0.28, text: "Nina's Coffee", bg: '#5b3a29', fg: '#ffe8c7', border: '#d9a066', depth: 0.005, frame: false },
        { kind: 'sign', at: [-7.5, 4.62], turn: 180, y: 1.28, w: 1.84, h: 0.3, text: 'Seaside Park', bg: '#3f6b3a', fg: '#f4ecd6', border: '#c9b98a', frame: '#2b4a28', depth: 0.04 }
      ] });
    },
    update: function (api) { K.tick(api); }
  };
})();

/* City: Fairview, outdoors: two towns on Maple Street with a long country road between them. Every road tile is 3 x 3.
   Westside, the town where people live, is round the origin: three streets each way make four blocks round the
   crossroads, Maple Street running east-west through z = 0 and Oak Avenue north-south through x = 0 (it carries on
   north over the river on a bridge). North-west: the homes, with the apartment building (apartment_door), Derek's
   house on River Road and the Westside bus stop on the Maple Street sidewalk (bus_stop). North-east: more houses.
   South-west: Seaside Park with trees, flower beds, a monument and benches (park_bench); along its fence on Maple
   Street the weekend farmers market (farm_stand, bakery_stand) and another bank's ATM by the gate (atm_park).
   South-east: a laundromat and the grocery store (market_door) on Maple Street, Cedar Street Lofts (Priya) and the
   residents' lot behind them.
   East of Westside Maple Street runs on through fields and woods for about two miles (x 19.5 to 85.5: a long walk, so
   people take the Number 12 bus), with a footpath on its north side and street lamps on the south.
   Downtown is the same grid again round x = DX (105), Lake Avenue running north-south through it: Seaside Labs is the
   tall tower in the north-east block (office_door) with a plaza, Nina's coffee cart on the corner and the credit
   union's ATM beside it (atm_cu); the downtown bus stop is across Lake Avenue (bus_stop_downtown); the diner
   (diner_door) and the Harbor Grill are south-east, the public parking lot (parking) south-west, and the airport
   shuttle waits at the east end of Maple Street (airport_shuttle).
   The Fairview River runs along the north edge with the mountains rising beyond it (from z -48, low enough for the
   camera, which looks down, to see the ridge); south the plain runs down to a beach and the sea (from z 31; the range
   and the sea are SO_ZONE_KIT.dress, which also scatters the woods of the plains, pack 'wild', where nobody can walk).
   You can walk round Westside out to the running trail (office/jog.js), the river bank and the beach, along the
   country road, and round downtown; the country beyond is solid (setup). Roads and sidewalks are walkable;
   buildings, parked cars, trees, water and street furniture block.
   Trees, bushes, flowers, rocks and the park's paths are Quaternius's Stylized Nature MegaKit (pack 'nature', scale 0.4),
   the park's signs, lilies and ornaments Kenney's Nature Kit (pack 'park'); the apartment house, two homes, Priya's
   lofts and three downtown buildings are Quaternius's Buildings Pack (pack 'buildings'), the rest Kenney's city kits; the
   `map` block names the streets and areas for the town map (Menu > Map). */
(function () {
  var K = SO_ZONE_KIT;
  var DX = 105;                         // downtown's crossroads (x); Westside's is the origin
  var ROAD_END = 19.5, TOWN_START = DX - 19.5;      // the country road: the ends of the two towns' grids
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

  // ----- ground: a road grid on 3 x 3 tiles for each town, cell (i, k) with its centre at (x0 + 3i, 3k), i and k in -6..6
  var tiles = [];
  function tile(node, x, z, turn) { tiles.push(r(node, x, z, turn || 0)); }
  var ROAD = [-5, 0, 5];
  var BEND = { '-5,-5': 90, '5,-5': 0, '-5,5': 180, '5,5': 270 };  // road-bend joins -x and +z at turn 0
  function grid(x0, paved) {
    for (var i = -6; i <= 6; i++) for (var k = -6; k <= 6; k++) {
      var v = ROAD.indexOf(i) >= 0 && (i === 0 || Math.abs(k) <= 5);   // on a north-south road
      var h = ROAD.indexOf(k) >= 0 && (k === 0 || Math.abs(i) <= 5);   // on an east-west road
      var key = i + ',' + k, x = x0 + 3 * i, z = 3 * k;
      if (BEND[key] !== undefined) tile('road-bend', x, z, BEND[key]);
      else if (v && h) tile('road-crossroad-line', x, z, 0);
      else if (h) tile(k === 0 && Math.abs(i) === 1 ? 'road-crossing' : 'road-straight', x, z, 0);
      else if (v) tile(i === 0 && Math.abs(k) === 1 ? 'road-crossing' : 'road-straight', x, z, 90);
      else if (Math.abs(i) >= 1 && Math.abs(i) <= 4 && Math.abs(k) >= 1 && Math.abs(k) <= 4 && paved(i, k)) tile('tile-low', x, z, 0);
    }
  }
  grid(0, function (i, k) { return (i > 0 && k > 0) || Math.abs(k) === 1; });      // Westside: the shops' block is paved, the homes and the park only along Maple Street
  grid(DX, function () { return true; });                                          // downtown: paved
  // the country road between them; a crosswalk where the running trail crosses it
  for (var x = ROAD_END + 1.5; x < TOWN_START; x += 3) tile(x === 21 ? 'road-crossing' : 'road-straight', x, 0, 0);
  tile('tile-low', DX + 18, -3, 0);           // airport shuttle stop, east end of Maple Street downtown
  tiles.push(r('road-straight', 0, -21, 90));                                                          // Oak Avenue north of town: the running trail crosses it here
  [-24, -27].forEach(function (z) { tiles.push(r('road-straight', 0, z, 90, { lift: 0.05 })); });    // the Oak Avenue bridge over the river, clear of the trail
  // garden paths
  [-5.0, -4.6].forEach(function (z) { tiles.push(c('path-short', -9.88, z, 0)); });
  // the park's entrance path, from the gate to the plaza
  [5.35, 6.35].forEach(function (z) { tiles.push(plate('path-square-thin', -7.5, z, 90, 1.1)); });
  tiles.push(plate('path-round-wide', -7.5, 7.6, 0, 1.9));          // the plaza between the benches
  tiles.push(plate('path-round-wide', -7.5, 10.9, 0, 1.5));         // under the monument
  [9.3, 9.9].forEach(function (z) { tiles.push(plate('path-square-thin', -7.5, z, 90, 0.9)); });

  // a sign on two posts by the road (its face is drawn in setup: SIGNS)
  var SIGNS = [];
  function roadSign(x, z, turn, w, text, sub, bg) {
    var a = turn * Math.PI / 180, ux = Math.cos(a), uz = -Math.sin(a);       // along the face
    SIGNS.push({ kind: 'sign', at: [x + Math.sin(a) * 0.05, z + Math.cos(a) * 0.05], turn: turn, y: 1.55, w: w, h: 0.62, text: text, sub: sub, bg: bg || '#1f6f43', fg: '#ffffff', border: '#ffffff', frame: '#2c3a33', depth: 0.04 });
    return [-1, 1].map(function (s) { return { pack: 'box', size: [0.08, 1.9, 0.08], at: [x + ux * s * (w / 2 - 0.15), z + uz * s * (w / 2 - 0.15)], color: '#7d838c', solid: [0.12, 0.12] }; });
  }

  var props = [
    // ================================================================ Westside
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
    // the Westside bus stop on Maple Street: the Number 12 downtown
    { pack: 'box', size: [1.5, 0.9, 0.06], at: [-5.0, -2.85], color: '#8fb3cf', solid: [1.5, 0.1] },
    c('detail-overhang-wide', -5.6, -2.55, 0),                                      // the shelter's roof on two posts
    f('bench', -5.23, -2.6, 0),
    f('bench', -4.77, -2.6, 0),
    r('road-sign-street', -6.1, -1.85, 0, { solid: [0.2, 0.2] }),
    r('light-square', -12.5, -1.75, 180, { solid: [0.2, 0.2] }),
    r('light-square', -2.3, -1.75, 180, { solid: [0.2, 0.2] }),

    // ----- north-east: more houses, two along Maple Street and two along River Road
    c('building-type-b', 5.0, -7.0, 0, { solid: 'fit' }),
    c('building-type-h', 11.2, -7.0, 0, { solid: 'fit' }),
    c('building-type-f', 4.0, -11.4, 180, { solid: 'fit' }),
    c('building-type-g', 10.4, -11.4, 180, { solid: 'fit' }),
    tree('tree-common-2', 8.45, -9.0),
    tree('tree-common-1', 13.1, -9.6),
    tree('tree-pine-3', 1.9, -9.0, 0, 0.9),
    c('fence', 2.6, -4.75, 0, { solid: 'fit', scale: 0.7 }),
    c('fence', 8.4, -4.75, 0, { solid: 'fit', scale: 0.7 }),
    c('planter', 9.4, -4.85, 0, { solid: 'fit' }),
    flower('flower-3-group', 2.1, -5.3, 0), flower('flower-4', 3.1, -5.25, 20), flower('flower-4-group', 8.7, -5.3, 0), flower('flower-3', 12.6, -5.3, 40),
    bush('bush-flowers', 8.05, -5.6, 0, 0.9), bush('bush', 13.0, -5.6, 30, 0.9),
    bit('grass-short', 5.8, -5.0, 0, 0.6), bit('grass-wispy-short', 10.4, -5.2, 0, 0.6),
    r('light-square', 6.5, -1.75, 180, { solid: [0.2, 0.2] }),
    r('light-square', 12.5, -1.75, 180, { solid: [0.2, 0.2] }),
    r('light-square', 1.75, -7.0, 90, { solid: [0.2, 0.2] }),

    // ----- the crossroads
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
    // another bank's ATM by the park gate (atm_park: a fee), and the weekend farmers market along the park fence: a fruit
    // stand (farm_stand) and a bakery stand (bakery_stand), cash only (config cash_only, hours_farm_stand…)
    { pack: 'box', size: [0.5, 1.3, 0.4], at: [-5.6, 4.25], color: '#7a2f3b', solid: [0.5, 0.4] },
    { pack: 'box', size: [0.3, 0.2, 0.02], at: [-5.6, 4.04], lift: 0.78, color: '#16233b' },
    f('kitchenBar', -10.6, 4.2, 180, { solid: 'fit' }),
    f('kitchenBar', -10.17, 4.2, 180, { solid: 'fit' }),
    f('kitchenBar', -9.74, 4.2, 180, { solid: 'fit' }),
    food('apple', -10.72, 4.2, 0, { lift: 0.42, scale: 0.8 }), food('pear', -10.5, 4.24, 30, { lift: 0.42, scale: 0.8 }),
    food('tomato', -10.25, 4.18, 0, { lift: 0.42, scale: 0.8 }), food('honey', -10.02, 4.22, 0, { lift: 0.42, scale: 0.7 }),
    food('pumpkin', -9.75, 4.2, 20, { lift: 0.42, scale: 0.7 }),
    f('cardboardBoxOpen', -9.3, 4.25, 0, { solid: 'fit', scale: 1.3 }),
    food('apple', -9.3, 4.25, 0, { lift: 0.33, scale: 0.8 }),
    c('detail-parasol-b', -11.15, 3.9, 0, { solid: [0.3, 0.3], scale: 0.7 }),
    f('kitchenBar', -12.6, 4.2, 180, { solid: 'fit' }),
    f('kitchenBar', -12.17, 4.2, 180, { solid: 'fit' }),
    food('loaf', -12.7, 4.2, 90, { lift: 0.42, scale: 0.7 }), food('bread', -12.48, 4.22, 0, { lift: 0.42, scale: 0.7 }),
    food('muffin', -12.28, 4.18, 0, { lift: 0.42, scale: 0.7 }), food('bag', -12.06, 4.22, 0, { lift: 0.42, scale: 0.7 }),
    c('detail-parasol-a', -13.1, 3.9, 0, { solid: [0.3, 0.3], scale: 0.7 }),

    // ----- south-east: the laundromat and the grocery store on Maple Street, Cedar Street Lofts and the residents' lot
    c('building-h', 5.0, 5.0, 180, { solid: 'fit', id: 'laundromat' }),
    c('detail-awning-wide', 5.0, 3.25, 180),
    c('building-c', 8.0, 5.1, 180, { solid: 'fit' }),
    c('building-a', 11.0, 5.2, 180, { solid: 'fit', id: 'market' }),
    c('detail-awning-wide', 11.0, 3.54, 180),
    food('barrel', 12.35, 3.45, 0, { solid: 'fit' }),
    food('watermelon', 12.35, 3.45, 0, { lift: 0.41, scale: 0.8 }),
    f('cardboardBoxOpen', 9.75, 3.5, 0, { solid: 'fit', scale: 1.6 }),
    food('apple', 9.72, 3.5, 0, { lift: 0.42, scale: 0.8 }),
    food('orange', 9.85, 3.46, 0, { lift: 0.42, scale: 0.8 }),
    r('dumpster', 3.0, 7.4, 90, { solid: 'fit' }),
    b('building-1-small', 11.8, 11.2, 270, { solid: 'fit', id: 'priya_lofts', home: 'priya' }),      // Cedar Street Lofts (Priya), its front on the lot
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

    // ----- the Fairview River along the north edge, Oak Avenue crossing it on a bridge
    { pack: 'box', size: [98.5, 0.02, 5.6], at: [-50.75, -25.4], color: '#4f97d6', solid: [98.5, 5.6] },
    { pack: 'box', size: [228.5, 0.02, 5.6], at: [115.75, -25.4], color: '#4f97d6', solid: [228.5, 5.6] },
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

    // ----- scenery at the edge of Westside
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
    bit('grass-tall', -17.2, -3.0, 0, 0.6), bit('grass-short', 17.6, -6.5, 0, 0.6), bit('grass-tall', 12.0, -17.9, 0, 0.6), bit('grass-short', -11.6, -17.6, 0, 0.6),

    // ================================================================ the country road (Maple Street, x 19.5..85.5)
    // a footpath along the north side, lamps on the south, power poles beyond the path
    { pack: 'box', size: [TOWN_START - ROAD_END, 0.02, 1.1], at: [(ROAD_END + TOWN_START) / 2, -2.2], color: '#cdbf9c' }
  ];
  for (var lx = 26; lx < TOWN_START - 2; lx += 11) props.push(r('light-square', lx, 1.75, 0, { solid: [0.2, 0.2] }));
  for (var px = 25; px < TOWN_START - 2; px += 10) props.push(r('electricity-pole', px, -5.2, 90, { scale: 1.6 }));
  [[29, -3.3, 'grass-tall'], [34.5, 2.4, 'grass-short'], [41, -3.4, 'grass-wispy-tall'], [47.5, 2.5, 'grass-tall'], [53, -3.3, 'grass-short'],
    [60.5, 2.4, 'grass-wispy-short'], [66, -3.4, 'grass-tall'], [72.5, 2.5, 'grass-short'], [78, -3.3, 'grass-wispy-tall']].forEach(function (g) { props.push(bit(g[2], g[0], g[1], g[0] * 7, 0.6)); });
  [[31, 3.6, 'tree-common-2'], [38, -4.6, 'tree-pine-3'], [44, 3.8, 'tree-common-1'], [57, -4.7, 'tree-common-5'], [63, 3.7, 'tree-pine-2'], [75, -4.6, 'tree-common-3'], [80, 3.6, 'tree-pine-4']]
    .forEach(function (t) { props.push(tree(t[2], t[0], t[1])); });
  // the signs: to downtown at the edge of Westside, to Westside at the edge of downtown
  props.push.apply(props, roadSign(24.5, 3.3, 270, 1.9, 'Downtown', '2 mi  ·  Seaside Labs  ·  Airport shuttle'));
  props.push.apply(props, roadSign(TOWN_START - 1.5, -4.1, 90, 1.9, 'Westside', '2 mi  ·  Seaside Park  ·  Maple St Apts'));
  props.push.apply(props, roadSign(TOWN_START - 3.5, 3.8, 270, 2.6, 'Welcome to Downtown', 'Fairview', '#2b5d8a'));

  // ================================================================ downtown (x DX-19.5..DX+19.5)
  props.push(
    // ----- north-west: the downtown bus stop on Maple Street (the Number 12 back to Westside) and two towers
    { pack: 'box', size: [1.5, 0.9, 0.06], at: [DX - 5.0, -2.85], color: '#8fb3cf', solid: [1.5, 0.1] },
    c('detail-overhang-wide', DX - 5.6, -2.55, 0),
    f('bench', DX - 5.23, -2.6, 0),
    f('bench', DX - 4.77, -2.6, 0),
    r('road-sign-street', DX - 6.1, -1.85, 0, { solid: [0.2, 0.2] }),
    c('building-skyscraper-c', DX - 10.5, -7.6, 0, { solid: 'fit' }),
    c('building-skyscraper-a', DX - 5.0, -8.4, 0, { solid: 'fit' }),
    b('building-1-large', DX - 8.5, -12.05, 180, { solid: 'fit' }),
    c('planter', DX - 12.6, -4.9, 0, { solid: 'fit' }),
    c('planter', DX - 8.4, -4.9, 0, { solid: 'fit' }),
    c('tree-small', DX - 2.4, -4.6, 0, { solid: [0.4, 0.4] }),
    r('light-square', DX - 12.0, -1.75, 180, { solid: [0.2, 0.2] }),
    r('light-square', DX - 1.75, -7.0, 270, { solid: [0.2, 0.2] }),

    // ----- north-east: offices; Seaside Labs is the tall one, with a plaza and Nina's coffee cart on the corner of Maple and Lake
    c('building-skyscraper-b', DX + 8.2, -8, 0, { solid: 'fit', id: 'seaside_labs' }),
    c('building-skyscraper-a', DX + 4.0, -10.9, 0, { solid: 'fit' }),
    b('building-3-big', DX + 12, -11.6, 0, { solid: 'fit' }),
    b('building-4', DX + 12.2, -6.7, 90, { solid: 'fit' }),
    c('planter', DX + 6.6, -5.0, 0, { solid: 'fit' }),
    c('planter', DX + 9.8, -5.0, 0, { solid: 'fit' }),
    c('tree-small', DX + 5.4, -4.6, 0, { solid: [0.4, 0.4] }),
    c('tree-small', DX + 12.6, -4.4, 0, { solid: [0.4, 0.4] }),
    n('pot_large', DX + 11.4, -4.5, 0, { solid: 'fit', scale: 0.8 }),
    bit('plant-1-big', DX + 11.4, -4.5, 0, 0.6),
    f('bench', DX + 6.6, -4.25, 0),
    f('bench', DX + 9.8, -4.25, 0),
    f('kitchenBar', DX + 3.3, -4.0, 0, { solid: 'fit' }),
    f('kitchenBar', DX + 3.73, -4.0, 0, { solid: 'fit' }),
    f('kitchenBar', DX + 4.16, -4.0, 0, { solid: 'fit' }),
    f('kitchenCoffeeMachine', DX + 3.3, -4.02, 0, { lift: 0.42 }),
    food('cup-coffee', DX + 3.85, -3.98, 0, { lift: 0.42, scale: 0.4 }),
    food('cup-coffee', DX + 4.05, -3.96, 40, { lift: 0.42, scale: 0.4 }),
    food('muffin', DX + 4.25, -4.0, 0, { lift: 0.42, scale: 0.4 }),
    c('detail-parasol-a', DX + 2.4, -3.2, 0, { solid: [0.3, 0.3], scale: 0.7 }),
    c('detail-parasol-b', DX + 5.2, -2.7, 0, { solid: [0.3, 0.3], scale: 0.7 }),
    f('trashcan', DX + 4.8, -4.3, 0, { solid: 'fit' }),
    r('light-square', DX + 6.5, -1.75, 180, { solid: [0.2, 0.2] }),
    r('light-square', DX + 12.5, -1.75, 180, { solid: [0.2, 0.2] }),
    r('light-square', DX + 1.75, -7.0, 90, { solid: [0.2, 0.2] }),
    // the credit union's ATM on Lake Avenue, by the coffee cart (atm_cu): free for the heroes, who bank there
    { pack: 'box', size: [0.5, 1.3, 0.4], at: [DX + 2.4, -6.1], color: '#2b5d8a', solid: [0.5, 0.4] },
    { pack: 'box', size: [0.3, 0.2, 0.02], at: [DX + 2.4, -5.89], lift: 0.78, color: '#16233b' },

    // ----- the crossroads of Maple and Lake
    r('traffic-light', DX - 1.75, -1.75, 180, { solid: [0.25, 0.25] }),
    r('traffic-light', DX + 1.75, -1.75, 90, { solid: [0.25, 0.25] }),
    r('traffic-light', DX - 1.75, 1.75, 270, { solid: [0.25, 0.25] }),
    r('traffic-light', DX + 1.75, 1.75, 0, { solid: [0.25, 0.25] }),
    r('road-sign-stop', DX - 13.25, 1.75, 0, { solid: [0.2, 0.2] }),
    r('road-sign-stop', DX + 13.25, -1.75, 180, { solid: [0.2, 0.2] }),

    // ----- south-west: the public parking lot (parking: pay at the machine) and two office buildings on Maple Street
    c('building-b', DX - 11.5, 4.8, 180, { solid: 'fit' }),
    c('building-f', DX - 3.5, 4.8, 180, { solid: 'fit' }),
    car('sedan', DX - 11.4, 10.8, 0, { solid: 'fit' }),
    car('suv', DX - 9.8, 10.8, 0, { solid: 'fit' }),
    car('hatchback', DX - 8.2, 10.8, 0, { solid: 'fit' }),
    car('sports-car', DX - 4.6, 10.8, 0, { solid: 'fit' }),
    { pack: 'box', size: [0.4, 1.2, 0.3], at: [DX - 7.5, 7.0], color: '#2b5d8a', solid: [0.4, 0.3] },          // the pay machine
    { pack: 'box', size: [0.24, 0.16, 0.02], at: [DX - 7.5, 7.16], lift: 0.75, color: '#16233b' },
    r('construction-cone', DX - 6.5, 12.6, 0),
    r('light-square', DX - 12.0, 1.75, 0, { solid: [0.2, 0.2] }),
    r('light-square', DX - 1.75, 8.0, 270, { solid: [0.2, 0.2] }),

    // ----- south-east: the diner and the Harbor Grill on Maple Street, an office behind them
    c('building-e', DX + 5.4, 5.0, 180, { solid: 'fit', id: 'diner' }),
    c('detail-awning-wide', DX + 4.8, 3.25, 180),
    c('building-d', DX + 11.0, 5.0, 180, { solid: 'fit' }),
    c('detail-awning-wide', DX + 11.0, 3.4, 180),
    b('building-2-small', DX + 10.5, 10.6, 0, { solid: 'fit' }),
    r('dumpster', DX + 3.0, 7.4, 90, { solid: 'fit' }),
    n('pot_small', DX + 2.9, 3.3, 0, { solid: 'fit', scale: 0.9 }),
    bit('plant-1', DX + 2.9, 3.3, 0, 0.6),
    c('tree-small', DX + 6.0, 9.4, 0, { solid: [0.4, 0.4] }),
    r('light-square', DX + 2.3, 1.75, 0, { solid: [0.2, 0.2] }),
    r('light-square', DX + 8.2, 1.75, 0, { solid: [0.2, 0.2] }),
    r('light-square', DX + 13.2, 8.0, 270, { solid: [0.2, 0.2] }),

    // ----- cars parked along the streets
    car('taxi', DX - 8.0, 0.8, 90, { solid: 'fit' }),
    car('sedan', DX + 13.0, -0.8, 270, { solid: 'fit' }),
    car('sports-car-2', DX + 0.8, -10.5, 0, { solid: 'fit' }),

    // ----- airport shuttle stop, east end of Maple Street
    car('suv', DX + 18.0, -0.8, 90, { solid: 'fit', id: 'airport_shuttle' }),
    r('road-sign-street', DX + 19.0, -2.0, 0, { solid: [0.2, 0.2] }),
    f('bench', DX + 17.0, -3.8, 0),
    f('bench', DX + 17.45, -3.8, 0),

    // ----- scenery at the edge of downtown
    tree('tree-pine-4', DX - 17.6, -9.0), tree('tree-common-1', DX - 17.8, 8.5), tree('tree-common-3', DX + 17.8, 9.0), tree('tree-pine-2', DX + 18.0, -12.0),
    tree('tree-pine-3', DX - 9.0, -17.8), tree('tree-common-2', DX + 9.0, -17.8), tree('tree-common-5', DX - 9.0, 17.8), tree('tree-pine-4', DX + 9.0, 17.8),
    bit('grass-tall', DX - 17.3, -4.0, 0, 0.6), bit('grass-short', DX + 17.6, 4.5, 0, 0.6)
  );

  SO_ZONES.city = {
    name: 'Fairview', name_ko: '페어뷰',
    indoor: false,
    size: [39, 39],          // the part of town you see round you (fog, the shadow map); you can walk the whole of `bounds`
    floor: '#86b86a',
    tiles: tiles,
    props: props,
    places: {
      apartment_door: { at: [-9.88, -3.9], face: [-7.5, -3.6] },
      bus_stop: { at: [-3.9, -2.3], face: [-3.9, -0.8] },
      park_bench: { at: [-7.5, 9.0], face: [-7.5, 8.0], sit: true },
      market_door: { at: [11.0, 2.3], face: [9.0, 2.1] },
      derek_door: { at: [-10.0, -13.72], face: [-10.0, -15.0] },
      priya_door: { at: [9.95, 11.2], face: [8.5, 11.2] },
      atm_park: { at: [-5.6, 3.6], face: [-5.6, 4.25] },
      farm_stand: { at: [-10.17, 3.45], face: [-10.17, 4.2] },
      bakery_stand: { at: [-12.4, 3.45], face: [-12.4, 4.2] },
      bus_stop_downtown: { at: [DX - 3.9, -2.3], face: [DX - 3.9, -0.8] },
      coffee_cart: { at: [DX + 3.73, -4.55], face: [DX + 3.73, -3.2] },
      office_door: { at: [DX + 8.2, -4.4], face: [DX + 6.0, -4.2] },
      atm_cu: { at: [DX + 2.4, -5.45], face: [DX + 2.4, -6.1] },
      diner_door: { at: [DX + 4.8, 2.2], face: [DX + 3.0, 2.0] },
      parking: { at: [DX - 7.5, 6.3], face: [DX - 7.5, 7.0] },
      airport_shuttle: { at: [DX + 18.0, -3.0], face: [DX + 18.0, -1.2] }
    },
    portals: [
      // the homes: a door is there only in the game of the hero who lives behind it
      { at: [-9.88, -5.05], size: [1.0, 0.6], to: 'home', arrive: 'home_door', label: 'Go home', label_ko: '집에 들어가기', hero: 'jun' },
      { at: [-10.0, -13.5], size: [1.0, 0.24], to: 'home_derek', arrive: 'derek_out', label: 'Go home', label_ko: '집에 들어가기', hero: 'derek' },
      { at: [10.27, 11.2], size: [0.3, 1.0], to: 'home_priya', arrive: 'priya_out', label: 'Go home', label_ko: '집에 들어가기', hero: 'priya' },
      { at: [11.0, 3.35], size: [1.0, 0.6], to: 'market', arrive: 'market_door', label: 'Enter the grocery store', label_ko: '식료품점에 들어가기' },
      { at: [DX + 8.2, -5.6], size: [1.4, 0.6], to: 'office', arrive: 'office_door', label: 'Enter Seaside Labs', label_ko: '시사이드 랩스에 들어가기' },
      { at: [DX + 4.8, 3.05], size: [1.0, 0.6], to: 'diner', arrive: 'diner_door', label: 'Enter the diner', label_ko: '식당에 들어가기' },
      { at: [DX + 18.0, -1.9], size: [1.2, 0.6], to: 'airport', arrive: 'airport_door', label: 'Take the airport shuttle', label_ko: '공항 셔틀 타기' }
    ],
    // you can walk round Westside out to the running trail round it (office/jog.js), the river bank and the beach,
    // along the country road and round downtown (setup makes the rest solid)
    bounds: [-21.9, -22.45, DX + 21, 33.7],
    spawn: 'apartment_door',
    ambient: 1.0,
    // the town map (Menu > Map): street names along the roads, names of areas without a place of their own; the map
    // shows one of the districts at a time (or all of them)
    map: {
      districts: [
        { name: 'Westside', name_ko: '웨스트사이드', rect: [-21.9, -22.45, 21.9, 22] },
        { name: 'Downtown', name_ko: '다운타운', rect: [DX - 21, -20.5, DX + 21, 20.5] }
      ],
      streets: [
        { name: 'Maple Street', along: 'x', at: 0, span: [-21, 19.5] }, { name: 'Maple Street', along: 'x', at: 0, span: [DX - 19.5, DX + 19.5] }, { name: 'Oak Avenue', along: 'z', at: 0 },
        { name: 'River Road', along: 'x', at: -15, span: [-21, 19.5] }, { name: 'Birch Street', along: 'x', at: 15, span: [-21, 19.5] },
        { name: 'Elm Street', along: 'z', at: -15, span: [-16.5, 16.5] }, { name: 'Cedar Street', along: 'z', at: 15, span: [-16.5, 16.5] },
        { name: 'Lake Avenue', along: 'z', at: DX }, { name: 'First Street', along: 'z', at: DX - 15, span: [-16.5, 16.5] }, { name: 'Second Street', along: 'z', at: DX + 15, span: [-16.5, 16.5] },
        { name: 'Harbor Street', along: 'x', at: -15, span: [DX - 19.5, DX + 19.5] }, { name: 'Ocean Avenue', along: 'x', at: 15, span: [DX - 19.5, DX + 19.5] }
      ],
      areas: [
        { name: 'Seaside Park', name_ko: '시사이드 공원', at: [-11.5, 11.5] },
        { name: 'Fairview River', name_ko: '페어뷰 강', at: [10, -25.4], water: true },
        { name: 'Wash & Fold', name_ko: '빨래방', at: [5.0, 5.2] },
        { name: 'Seaside Labs', name_ko: '시사이드 랩스', at: [DX + 8.2, -8.6] },
        { name: 'Harbor Grill', name_ko: '하버 그릴', at: [DX + 11.0, 5.2] },
        { name: 'to Downtown, 2 mi', name_ko: '다운타운까지 약 3km', at: [52, 4.2] }
      ]
    },
    setup: function (api) {
      // the country nobody walks in: round Westside (the woods between the town and the beach), beside the country
      // road, and round downtown
      api.solid(-19.0, 21.3, 19.0, 27.3);
      api.solid(21.9, -22.45, TOWN_START - 1.5, -3.2);
      api.solid(21.9, 2.3, TOWN_START - 1.5, 33.7);
      api.solid(TOWN_START - 1.5, -22.45, DX + 21, -20.5);
      api.solid(TOWN_START - 1.5, 20.5, DX + 21, 33.7);
      // signs on the fronts of the buildings you go into, the bus stops' timetables, Nina's cart and the park gate
      var mid = (ROAD_END + TOWN_START) / 2;
      K.dress(api, { mountains: { side: 'n', from: 48, depth: 44, width: 420, height: 7.5, seed: 3, cx: mid }, sea: { side: 's', from: 31, beach: 3, width: 400, depth: 140, cx: mid },
        // the plains beyond the edge of the towns (out of reach): woods west of Westside, both banks of the river, the
        // fields beside the country road, round downtown and south down to the beach
        wild: { seed: 11, rects: [[-90, -46, -21.5, -29], [-90, -22, -21.5, 19.5], [-21.5, -46, DX + 60, -29], [21.5, -22, TOWN_START - 1, 19.5],
          [TOWN_START - 1, -22, DX + 21, -21], [DX + 21.5, -22, DX + 60, 19.5], [-90, 21, DX + 60, 27.5]],
          avoid: [[-90, -3, DX + 60, 3], [-3, -46, 3, 19.5], [ROAD_END, -4.4, TOWN_START, 3.2],
            [-23.2, -23, -19.2, 32], [19.2, -23, 23.2, 32], [-24, 26.8, 24, 32]] },          // the running trail (office/jog.js), with room on both sides
        panels: SIGNS.concat([
        { kind: 'sign', at: [DX + 8.2, -5.94], turn: 0, y: 1.75, w: 2.6, h: 0.52, text: 'Seaside Labs', bg: '#1d4e6b', logo: '#7fd1c7', frame: '#12303f' },
        { kind: 'sign', at: [DX + 5.4, 3.47], turn: 180, y: 1.55, w: 2.8, h: 0.5, text: 'Sunny Side Diner', bg: '#c0392b', fg: '#fff6d8', border: '#ffd166', frame: '#7e2a23' },
        { kind: 'sign', at: [DX + 11.0, 3.63], turn: 180, y: 1.55, w: 2.3, h: 0.46, text: 'Harbor Grill', bg: '#20344f', fg: '#f4e7c5', border: '#c9a227', frame: '#121f30' },
        { kind: 'sign', at: [11.0, 3.77], turn: 180, y: 1.75, w: 2.4, h: 0.48, text: 'Fairview Market', bg: '#3f8f5a', logo: '#ffd166', frame: '#2f6b45' },
        { kind: 'sign', at: [11.0, 3.77], turn: 180, y: 2.3, w: 1.9, h: 0.3, text: 'Pharmacy · Walk-in Clinic', bg: '#2b6cb0', fg: '#ffffff', frame: '#1d4f86', depth: 0.02 },          // inside, at the back
        { kind: 'sign', at: [5.0, 3.47], turn: 180, y: 1.6, w: 2.2, h: 0.42, text: 'Wash & Fold', sub: 'Laundromat · open late', bg: '#3b7fb6', fg: '#ffffff', border: '#d6ecfa', frame: '#25567d' },
        { kind: 'poster', at: [-5.35, -2.81], turn: 0, y: 0.5, w: 0.62, h: 0.8, frame: '#5f6f7f', text: 'Route 12', lines: ['To Downtown', 'Every 20 min, 6am-10:30pm', 'Fare $2.50'], band: '#2b5d8a', depth: 0.01 },
        { kind: 'sign', at: [-4.1, -2.26], turn: 0, y: 1.3, w: 0.5, h: 0.22, text: 'BUS', sub: 'Route 12', bg: '#2b5d8a', frame: '#1c3d5c', depth: 0.02 },
        { kind: 'poster', at: [DX - 5.35, -2.81], turn: 0, y: 0.5, w: 0.62, h: 0.8, frame: '#5f6f7f', text: 'Route 12', lines: ['To Westside', 'Every 20 min, 6am-10:30pm', 'Fare $2.50'], band: '#2b5d8a', depth: 0.01 },
        { kind: 'sign', at: [DX - 4.1, -2.26], turn: 0, y: 1.3, w: 0.5, h: 0.22, text: 'BUS', sub: 'Route 12', bg: '#2b5d8a', frame: '#1c3d5c', depth: 0.02 },
        { kind: 'sign', at: [DX + 3.73, -3.89], turn: 0, y: 0.24, w: 1.15, h: 0.28, text: "Nina's Coffee", bg: '#5b3a29', fg: '#ffe8c7', border: '#d9a066', depth: 0.005, frame: false },
        { kind: 'sign', at: [DX - 7.5, 7.16], turn: 0, y: 1.05, w: 0.5, h: 0.22, text: 'PAY HERE', sub: 'Parking $18 / day', bg: '#2b5d8a', depth: 0.01, frame: false },
        { kind: 'sign', at: [-7.5, 4.62], turn: 180, y: 1.28, w: 1.84, h: 0.3, text: 'Seaside Park', bg: '#3f6b3a', fg: '#f4ecd6', border: '#c9b98a', frame: '#2b4a28', depth: 0.04 },
        { kind: 'sign', at: [DX + 2.4, -5.89], turn: 0, y: 1.1, w: 0.48, h: 0.2, text: 'ATM', sub: 'Fairview Credit Union', bg: '#1b4f7a', depth: 0.01, frame: false },
        { kind: 'sign', at: [-5.6, 4.04], turn: 180, y: 1.1, w: 0.48, h: 0.2, text: 'ATM', sub: 'Tidewell Bank', bg: '#7a2f3b', depth: 0.01, frame: false },
        { kind: 'sign', at: [-11.4, 4.55], turn: 180, y: 1.3, w: 2.8, h: 0.42, text: 'Farmers Market', sub: 'Sat & Sun 8 AM - 1 PM  ·  Cash only', bg: '#5f8a35', fg: '#fffbe8', border: '#f2d16b', frame: '#43612a', depth: 0.03 }
      ]) });
    },
    update: function (api) { K.tick(api); }
  };
})();

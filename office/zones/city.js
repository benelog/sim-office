/* City: downtown Fairview, 39 x 39, outdoors. Three streets each way (every road tile is 3 x 3) make four
   blocks around the crossroads at the origin; Main Street runs east-west through z = 0 and Oak Avenue
   north-south through x = 0, and both carry on to the edge of town. North-west: Maple Street homes, with the
   apartment building (apartment_door) and the bus stop on the Main Street sidewalk. North-east: the office
   towers; Lakeside Labs is the tall one (office_door) with a plaza and Nina's coffee cart on the corner.
   South-west: the park with trees and benches (park_bench). South-east: the diner (diner_door) and the
   grocery store (market_door) face Main Street, with a small parking lot behind them (parking). The airport
   shuttle waits at the east end of Main Street (airport_shuttle). Roads and sidewalks are walkable; buildings,
   parked cars, trees and street furniture block. */
(function () {
  var K = SO_ZONE_KIT;
  function f(node, x, z, turn, extra) { return K.prop('furniture', node, x, z, turn, extra); }
  function c(node, x, z, turn, extra) { return K.prop('city', node, x, z, turn, extra); }
  function r(node, x, z, turn, extra) { return K.prop('roads', node, x, z, turn, extra); }
  function car(node, x, z, turn, extra) { return K.prop('cars', node, x, z, turn, extra); }
  function food(node, x, z, turn, extra) { return K.prop('food', node, x, z, turn, extra); }

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
      // blocks: the two commercial blocks (east) are paved; the homes and the park only along Main Street
      if (i > 0 || Math.abs(k) === 1) tile('tile-low', i, k, 0);
    }
  }
  tile('tile-low', 6, -1, 0);           // airport shuttle stop, east end of Main Street
  // garden paths
  [-5.0, -4.6].forEach(function (z) { tiles.push(c('path-short', -9.88, z, 0)); });
  [4.8, 5.4, 6.0, 6.6, 7.2, 7.8, 8.4].forEach(function (z) { tiles.push(c('path-short', -7.5, z, 0)); });
  [-8.1, -6.9].forEach(function (x) { tiles.push(c('path-short', x, 8.4, 0)); });

  var props = [
    // ----- north-west: homes on Maple Street
    c('building-type-f', -10, -7.5, 0, { solid: 'fit', id: 'apartment' }),        // Jun's apartment building
    c('building-type-a', -4.4, -7.0, 0, { solid: 'fit' }),
    c('building-type-h', -10, -11.6, 180, { solid: 'fit' }),
    c('building-type-g', -4.5, -11.6, 180, { solid: 'fit' }),
    c('tree-large', -13.0, -9.5, 0, { solid: [0.4, 0.4] }),
    c('tree-small', -7.2, -9.6, 0, { solid: [0.4, 0.4] }),
    c('tree-small', -2.2, -9.3, 0, { solid: [0.4, 0.4] }),
    c('fence', -12.9, -4.75, 0, { solid: 'fit', scale: 0.7 }),
    c('fence', -6.9, -4.75, 0, { solid: 'fit', scale: 0.7 }),
    c('planter', -11.3, -4.85, 0, { solid: 'fit' }),
    c('planter', -8.45, -4.85, 0, { solid: 'fit' }),
    // bus stop on Main Street
    { pack: 'box', size: [1.5, 0.9, 0.06], at: [-5.0, -2.85], color: '#8fb3cf', solid: [1.5, 0.1] },
    c('detail-overhang-wide', -5.6, -2.55, 0),                                      // the shelter's roof on two posts
    f('bench', -5.23, -2.6, 0),
    f('bench', -4.77, -2.6, 0),
    r('road-sign-street', -6.1, -1.85, 0, { solid: [0.2, 0.2] }),
    r('light-square', -12.5, -1.75, 180, { solid: [0.2, 0.2] }),
    r('light-square', -2.3, -1.75, 180, { solid: [0.2, 0.2] }),

    // ----- north-east: offices
    c('building-skyscraper-b', 8.2, -8, 0, { solid: 'fit', id: 'lakeside_labs' }),
    c('building-skyscraper-a', 4.0, -10.9, 0, { solid: 'fit' }),
    c('building-g', 12, -11.5, 0, { solid: 'fit' }),
    c('building-b', 12, -6.8, 90, { solid: 'fit' }),
    c('planter', 6.6, -5.0, 0, { solid: 'fit' }),
    c('planter', 9.8, -5.0, 0, { solid: 'fit' }),
    c('tree-small', 5.4, -4.6, 0, { solid: [0.4, 0.4] }),
    c('tree-small', 12.6, -4.4, 0, { solid: [0.4, 0.4] }),
    f('bench', 6.6, -4.25, 0),
    f('bench', 9.8, -4.25, 0),
    // Nina's coffee cart on the corner of Main and Oak
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

    // ----- south-west: the park
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
    c('tree-large', -12.0, 6.5, 0, { solid: [0.4, 0.4] }),
    c('tree-large', -10.5, 9.8, 0, { solid: [0.4, 0.4] }),
    c('tree-large', -12.4, 12.4, 0, { solid: [0.4, 0.4] }),
    c('tree-large', -4.0, 6.3, 0, { solid: [0.4, 0.4] }),
    c('tree-large', -2.8, 10.4, 0, { solid: [0.4, 0.4] }),
    c('tree-large', -6.2, 12.6, 0, { solid: [0.4, 0.4] }),
    c('tree-small', -9.3, 6.2, 0, { solid: [0.4, 0.4] }),
    c('tree-small', -5.6, 9.9, 0, { solid: [0.4, 0.4] }),
    c('tree-small', -8.8, 12.2, 0, { solid: [0.4, 0.4] }),
    c('tree-small', -2.3, 13.0, 0, { solid: [0.4, 0.4] }),
    c('planter', -8.4, 5.2, 0, { solid: 'fit' }),
    c('planter', -6.6, 5.2, 0, { solid: 'fit' }),
    f('bench', -7.72, 9.0, 180),
    f('bench', -7.28, 9.0, 180),
    f('bench', -9.0, 7.6, 90),
    f('bench', -6.0, 7.6, 270),
    f('trashcan', -8.3, 9.05, 0, { solid: 'fit' }),
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
    c('building-h', 11.8, 11.2, 270, { solid: 'fit' }),
    car('sedan', 3.6, 10.8, 0, { solid: 'fit' }),
    car('suv', 5.2, 10.8, 0, { solid: 'fit' }),
    car('hatchback-sports', 6.8, 10.8, 0, { solid: 'fit' }),
    r('construction-cone', 8.1, 12.3, 0),
    r('light-square', 2.3, 1.75, 0, { solid: [0.2, 0.2] }),
    r('light-square', 8.2, 1.75, 0, { solid: [0.2, 0.2] }),
    r('light-square', 13.2, 8.0, 270, { solid: [0.2, 0.2] }),

    // ----- cars parked along the streets
    car('taxi', -8.0, 0.8, 90, { solid: 'fit' }),
    car('sedan', 13.0, -0.8, 270, { solid: 'fit' }),
    car('delivery', -0.8, 9.5, 180, { solid: 'fit' }),
    car('sedan-sports', 0.8, -10.5, 0, { solid: 'fit' }),
    car('van', 14.2, 7.5, 180, { solid: 'fit' }),

    // ----- airport shuttle stop, east end of Main Street
    car('van', 18.0, -0.8, 90, { solid: 'fit', id: 'airport_shuttle' }),
    r('road-sign-street', 19.0, -2.0, 0, { solid: [0.2, 0.2] }),
    f('bench', 17.0, -3.8, 0),
    f('bench', 17.45, -3.8, 0),

    // ----- scenery at the edge of town
    c('tree-large', -18.0, -18.0, 0, { solid: [0.4, 0.4] }),
    c('tree-large', -18.2, 9.0, 0, { solid: [0.4, 0.4] }),
    c('tree-small', -17.8, -8.0, 0, { solid: [0.4, 0.4] }),
    c('tree-large', 18.0, 18.0, 0, { solid: [0.4, 0.4] }),
    c('tree-small', 17.8, 9.5, 0, { solid: [0.4, 0.4] }),
    c('tree-large', 18.2, -12.0, 0, { solid: [0.4, 0.4] }),
    c('tree-small', 8.0, 18.2, 0, { solid: [0.4, 0.4] }),
    c('tree-large', -9.0, 18.0, 0, { solid: [0.4, 0.4] }),
    c('tree-small', -6.0, -18.2, 0, { solid: [0.4, 0.4] }),
    c('tree-large', 9.0, -18.0, 0, { solid: [0.4, 0.4] })
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
      airport_shuttle: { at: [18.0, -3.0], face: [18.0, -1.2] }
    },
    portals: [
      { at: [-9.88, -5.05], size: [1.0, 0.6], to: 'home', arrive: 'home_door', label: 'Go home', label_ko: '집에 들어가기' },
      { at: [8.2, -5.6], size: [1.4, 0.6], to: 'office', arrive: 'office_door', label: 'Enter Lakeside Labs', label_ko: '레이크사이드 랩스에 들어가기' },
      { at: [4.8, 3.05], size: [1.0, 0.6], to: 'diner', arrive: 'diner_door', label: 'Enter the diner', label_ko: '식당에 들어가기' },
      { at: [11.0, 3.35], size: [1.0, 0.6], to: 'market', arrive: 'market_door', label: 'Enter the grocery store', label_ko: '식료품점에 들어가기' },
      { at: [18.0, -1.9], size: [1.2, 0.6], to: 'airport', arrive: 'airport_door', label: 'Take the airport shuttle', label_ko: '공항 셔틀 타기' }
    ],
    spawn: 'apartment_door',
    ambient: 1.0,
    setup: function (api) {
      // signs on the fronts of the buildings you go into, the bus stop's timetable and Nina's cart
      K.dress(api, { panels: [
        { kind: 'sign', at: [8.2, -5.94], turn: 0, y: 1.75, w: 2.6, h: 0.52, text: 'Lakeside Labs', bg: '#1d4e6b', logo: '#7fd1c7', frame: '#12303f' },
        { kind: 'sign', at: [5.4, 3.47], turn: 180, y: 1.55, w: 2.8, h: 0.5, text: 'Sunny Side Diner', bg: '#c0392b', fg: '#fff6d8', border: '#ffd166', frame: '#7e2a23' },
        { kind: 'sign', at: [11.0, 3.77], turn: 180, y: 1.75, w: 2.4, h: 0.48, text: 'Fairview Market', bg: '#3f8f5a', logo: '#ffd166', frame: '#2f6b45' },
        { kind: 'poster', at: [-5.35, -2.81], turn: 0, y: 0.5, w: 0.62, h: 0.8, frame: '#5f6f7f', text: 'Route 5', lines: ['Maple St - Downtown', 'Every 15 min, 6am-11pm', 'Fare $2.00'], band: '#2b5d8a', depth: 0.01 },
        { kind: 'sign', at: [-4.1, -2.26], turn: 0, y: 1.3, w: 0.5, h: 0.22, text: 'BUS', sub: 'Route 5', bg: '#2b5d8a', frame: '#1c3d5c', depth: 0.02 },
        { kind: 'sign', at: [3.73, -3.89], turn: 0, y: 0.24, w: 1.15, h: 0.28, text: "Nina's Coffee", bg: '#5b3a29', fg: '#ffe8c7', border: '#d9a066', depth: 0.005, frame: false }
      ] });
    },
    update: function (api) { K.tick(api); }
  };
})();

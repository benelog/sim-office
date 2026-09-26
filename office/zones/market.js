/* Market: Fairview Fresh, the grocery store on Main Street, one room of 14 x 10. The door is at the west end
   of the south wall, with boxes standing in for shopping carts next to it and Mike's checkout counter just
   inside (market_checkout). Three double-sided aisles of open shelves stocked with groceries run north-south
   through the middle (market_shelves is in the first aisle); fresh produce is laid out on tables along the east
   wall, and a row of fridges stands along the north wall. */
(function () {
  var K = SO_ZONE_KIT;
  function f(node, x, z, turn, extra) { return K.prop('furniture', node, x, z, turn, extra); }
  function food(node, x, z, turn, extra) { return K.prop('food', node, x, z, turn, extra); }
  function x_(node, x, z, turn, extra) { return K.prop('extras', node, x, z, turn, extra); }
  var props = [];
  function add(list) { props = props.concat(list); }

  add(K.walls(14, 10, { n: 'wwwwwwwwwwwwww', s: 'wDwWWwwwwWWwww', w: 'wwwwwwwwww', e: 'wwWWwwwwww' }));

  // ----- aisles: five double-sided shelves of groceries each (Kenney Mini Market), a sign hanging over each
  var AISLES = ['1  Pantry', '2  Bakery & Snacks', '3  Drinks', '4  Deli & Dairy'];
  [-3.5, -1.0, 1.5, 4.0].forEach(function (x, a) {
    for (var i = 0; i < 5; i++) add([x_(['shelf-boxes', 'shelf-bags'][(i + a) % 2], x, -3.4 + 0.8 * i, 90, { solid: 'fit' })]);
  });

  // ----- freezers along the north wall, produce along the east wall
  [2.8, 3.95, 5.1, 6.25].forEach(function (x) { add([x_('freezers-standing', x, -4.72, 0, { solid: 'fit', scale: 1.15 })]); });
  [[-2.4, ['apple', 'orange', 'lemon']], [-1.2, ['tomato', 'carrot', 'onion']], [0.0, ['broccoli', 'cabbage', 'corn']], [1.2, ['banana', 'grapes', 'pear']]].forEach(function (t) {
    add([f('table', 6.5, t[0], 90, { solid: 'fit' })]);
    t[1].forEach(function (n, j) { add([food(n, 6.5, t[0] - 0.28 + 0.28 * j, 0, { lift: 0.33, scale: 0.6 })]); });
  });
  add([
    x_('display-fruit', 6.5, 2.45, 0, { solid: 'fit' }),
    x_('display-fruit', 6.5, 3.2, 40, { solid: 'fit' }),
    f('pottedPlant', 6.6, 4.6, 0, { solid: 'fit' }),
    x_('freezer', 4.0, 1.3, 0, { solid: 'fit' }),
    // bakery table in the middle of the store
    x_('display-bread', 0.4, 1.85, 0, { solid: 'fit' }),
    f('table', 1.8, 1.85, 0, { solid: 'fit' }),
    f('table', 2.64, 1.85, 0, { solid: 'fit' }),
    food('loaf', 1.55, 1.85, 0, { lift: 0.33, scale: 0.5 }),
    food('loaf-baguette', 1.95, 1.85, 30, { lift: 0.33, scale: 0.5 }),
    food('croissant', 2.4, 1.8, 0, { lift: 0.33, scale: 0.5 }),
    food('cupcake', 2.7, 1.9, 0, { lift: 0.33, scale: 0.5 }),
    food('donut-sprinkles', 2.9, 1.8, 0, { lift: 0.33, scale: 0.5 })
  ]);

  // ----- entrance: carts and baskets, the checkout with a magazine rack
  add([
    x_('shopping-cart', -6.6, 2.1, 0, { solid: 'fit', scale: 1.3 }),
    x_('shopping-cart', -6.6, 2.74, 0, { solid: 'fit', scale: 1.3 }),
    x_('shopping-cart', -6.6, 3.38, 0, { solid: 'fit', scale: 1.3 }),
    x_('shopping-basket', -6.6, 4.0, 0, { solid: 'fit', scale: 1.2 }),
    x_('shopping-basket', -6.6, 4.0, 15, { lift: 0.2, scale: 1.2 }),
    f('desk', -3.3, 2.6, 0, { solid: 'fit' }),
    f('desk', -2.57, 2.6, 0, { solid: 'fit' }),
    x_('cash-register', -3.05, 2.6, 180, { lift: 0.384, scale: 0.42 }),
    food('bag', -2.35, 2.6, 90, { lift: 0.38, scale: 0.5 }),
    food('candy-bar', -2.7, 2.5, 0, { lift: 0.38, scale: 0.5 }),
    f('bookcaseOpenLow', -1.35, 2.6, 0, { solid: 'fit' }),
    food('chocolate', -1.35, 2.6, 0, { lift: 0.2, scale: 0.5 }),
    f('rugDoormat', -5.5, 4.3, 0),
    f('pottedPlant', -4.4, 4.6, 0, { solid: 'fit' })
  ]);

  // ----- outside: the parking lot in front (south) and Main Street beyond it, the neighbours
  add([
    K.prop('cars', 'suv', -2.8, 7.4, 180), K.prop('cars', 'sedan', 1.1, 7.4, 180), K.prop('cars', 'van', 5.0, 7.4, 0),
    K.prop('cars', 'hatchback-sports', -4.1, 11.2, 90),
    K.prop('roads', 'light-square', -6.0, 6.0, 0), K.prop('roads', 'light-square', 3.2, 6.0, 0),
    K.prop('city', 'building-g', -10.2, -0.5, 0), K.prop('city', 'building-c', 10.0, -0.8, 0),
    K.prop('city', 'building-a', -5.0, 17.0, 180), K.prop('city', 'building-d', 1.0, 17.0, 180), K.prop('city', 'low-detail-building-wide-a', 7.0, 17.2, 180),
    K.prop('city', 'low-detail-building-e', -3.0, -10.0, 0), K.prop('city', 'tree-large', 9.0, 7.0, 0), K.prop('city', 'tree-small', -9.2, 7.5, 0)
  ]);

  SO_ZONES.market = {
    name: 'Fairview Fresh grocery', name_ko: '페어뷰 프레시 식료품점',
    indoor: true,
    size: [14, 10],
    floor: '#e3e0d6',
    props: props,
    places: {
      market_shelves: { at: [-2.25, -2.2], face: [-2.6, -3.4] },
      market_checkout: { at: [-2.93, 3.15], face: [-2.93, 2.0] },
      market_door: { at: [-5.3, 3.4], face: [-4.0, 2.2] }
    },
    portals: [
      { at: [-5.5, 4.7], size: [0.9, 0.5], to: 'city', arrive: 'market_door', label: 'Leave the store', label_ko: '가게에서 나가기' }
    ],
    spawn: 'market_door',
    lights: [
      { at: [-2, -2], height: 1.25, color: '#ffffff', intensity: 1.1 },
      { at: [3, -1], height: 1.25, color: '#ffffff', intensity: 1.0 },
      { at: [-3, 3], height: 1.25, color: '#fff4e0', intensity: 0.9 }
    ],
    ambient: 0.95,
    background: '#bcd7ec',
    outside: '#62666d',
    setup: function (api) {
      var hang = [];   // a sign on the south end of each aisle
      AISLES.forEach(function (t, a) {
        var x = [-3.5, -1.0, 1.5, 4.0][a];
        hang.push({ kind: 'sign', at: [x, 0.21], turn: 0, y: 0.97, w: 0.72, h: 0.2, text: t, bg: '#2f6b45', border: false, frame: '#1f4a30', depth: 0.02, key: 'aisle' + a });
      });
      K.dress(api, {
        floor: { pattern: 'tile', a: '#eceae3', b: '#cbc6ba' },
        floors: [{ pattern: 'wood', a: '#b98c5e', rect: [5.6, -3.2, 7, 4] }],
        walls: { color: '#e7efe5', trim: '#3f8f5a', base: '#2f6b45' },
        ground: { pattern: 'asphalt', strips: [
          { pattern: 'sidewalk', rect: [-80, 5.02, 80, 6.2] }, { pattern: 'lot', rect: [-80, 6.2, 80, 9.4] },
          { pattern: 'road', rect: [-80, 10.4, 80, 14.4] }, { pattern: 'sidewalk', rect: [-80, 14.4, 80, 16] }] },
        skyline: { kind: 'city', seed: 21 },
        panels: hang.concat([
          { kind: 'sign', wall: 'n', along: -2.3, y: 1.0, w: 2.4, h: 0.44, text: 'Fairview Market', sub: 'Fresh every day', bg: '#3f8f5a', fg: '#ffffff', logo: '#ffd166', frame: '#2f6b45' },
          { kind: 'poster', wall: 's', along: 0.5, y: 0.85, w: 0.5, h: 0.66, frame: '#ffffff', text: 'Weekly Specials', lines: ['Strawberries', 'Buy one, get one free', 'Milk $2.99'], band: '#d1495b' },
          { kind: 'poster', at: [-1.47, 2.51], turn: 180, y: 0.49, w: 0.13, h: 0.17, depth: 0.004, frame: false, text: 'TECH', lines: ['AI at work'], band: '#264653', key: 'mag1' },
          { kind: 'poster', at: [-1.3, 2.51], turn: 180, y: 0.49, w: 0.13, h: 0.17, depth: 0.004, frame: false, text: 'COOK', lines: ['30-minute meals'], band: '#e76f51', key: 'mag2' },
          { kind: 'poster', at: [-1.13, 2.51], turn: 180, y: 0.49, w: 0.13, h: 0.17, depth: 0.004, frame: false, text: 'HOME', lines: ['Small spaces'], band: '#2a9d8f', key: 'mag3' }
        ])
      });
    },
    update: function (api) { K.tick(api); }
  };
})();

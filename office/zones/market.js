/* Market: Fairview Fresh, the grocery store on Main Street, one room of 14 x 10. The door is at the west end
   of the south wall, with boxes standing in for shopping carts next to it and Mike's checkout counter just
   inside (market_checkout). Three double-sided aisles of open shelves stocked with groceries run north-south
   through the middle (market_shelves is in the first aisle); fresh produce is laid out on tables along the east
   wall, and a row of fridges stands along the north wall. */
(function () {
  var K = SO_ZONE_KIT;
  function f(node, x, z, turn, extra) { return K.prop('furniture', node, x, z, turn, extra); }
  function food(node, x, z, turn, extra) { return K.prop('food', node, x, z, turn, extra); }
  var props = [];
  function add(list) { props = props.concat(list); }

  add(K.walls(14, 10, { n: 'wwwwwwwwwwwwww', s: 'wDwWWwwwwWWwww', w: 'wwwwwwwwww', e: 'wwWWwwwwww' }));

  // ----- aisles: each is two rows of open shelves back to back, 10 shelves long, stocked on three levels
  var LEVELS = [0.13, 0.37, 0.61];
  var STOCK = [
    ['can', 'soda-can', 'carton-small', 'peanut-butter', 'honey', 'can', 'soda-bottle', 'carton'],      // aisle 1: pantry
    ['bread', 'loaf', 'croissant', 'muffin', 'bowl-cereal', 'cookie', 'donut', 'candy-bar'],            // aisle 2: bakery, snacks
    ['soda-bottle', 'soda', 'carton', 'bottle-ketchup', 'chocolate', 'can', 'honey', 'bag'],            // aisle 3: drinks
    ['egg', 'cheese', 'carton-small', 'sausage', 'bacon', 'fish', 'cheese', 'egg']                      // aisle 4: deli
  ];
  [-3.5, -1.0, 1.5, 4.0].forEach(function (x, a) {
    for (var i = 0; i < 10; i++) {
      var z = -3.6 + 0.4 * i;
      add([
        f('bookcaseOpen', x - 0.125, z, 270, { solid: 'fit' }),
        f('bookcaseOpen', x + 0.125, z, 90, { solid: 'fit' })
      ]);
      LEVELS.forEach(function (y, l) {
        var west = STOCK[a][(i + l) % 8], east = STOCK[a][(i + 2 * l + 3) % 8];
        add([
          food(west, x - 0.13, z, 270, { lift: y, scale: 0.5 }),
          food(east, x + 0.13, z, 90, { lift: y, scale: 0.5 })
        ]);
      });
    }
  });

  // ----- fridges along the north wall, produce along the east wall
  [3.3, 3.73, 4.16, 4.59, 5.02, 5.45, 5.88].forEach(function (x) { add([f('kitchenFridge', x, -4.83, 0, { solid: 'fit' })]); });
  add([f('kitchenFridgeLarge', 6.45, -4.6, 270, { solid: 'fit' })]);
  [[-2.4, ['apple', 'orange', 'lemon']], [-1.2, ['tomato', 'carrot', 'onion']], [0.0, ['broccoli', 'cabbage', 'corn']], [1.2, ['banana', 'grapes', 'pear']]].forEach(function (t) {
    add([f('table', 6.5, t[0], 90, { solid: 'fit' })]);
    t[1].forEach(function (n, j) { add([food(n, 6.5, t[0] - 0.28 + 0.28 * j, 0, { lift: 0.33, scale: 0.6 })]); });
  });
  add([
    food('watermelon', 6.5, 2.4, 0, { solid: 'fit', scale: 0.8 }),
    food('pumpkin', 6.5, 3.0, 0, { solid: 'fit', scale: 0.8 }),
    f('pottedPlant', 6.6, 4.6, 0, { solid: 'fit' }),
    // bakery table in the middle of the store
    f('table', 1.8, 1.85, 0, { solid: 'fit' }),
    f('table', 2.64, 1.85, 0, { solid: 'fit' }),
    food('loaf', 1.55, 1.85, 0, { lift: 0.33, scale: 0.5 }),
    food('loaf-baguette', 1.95, 1.85, 30, { lift: 0.33, scale: 0.5 }),
    food('croissant', 2.4, 1.8, 0, { lift: 0.33, scale: 0.5 }),
    food('cupcake', 2.7, 1.9, 0, { lift: 0.33, scale: 0.5 }),
    food('donut-sprinkles', 2.9, 1.8, 0, { lift: 0.33, scale: 0.5 })
  ]);

  // ----- entrance: carts (boxes) and the checkout
  add([
    f('cardboardBoxClosed', -6.7, 2.4, 0, { solid: 'fit' }),
    f('cardboardBoxClosed', -6.7, 2.4, 20, { lift: 0.28 }),
    f('cardboardBoxClosed', -6.7, 2.7, 0, { solid: 'fit' }),
    f('cardboardBoxOpen', -6.65, 3.05, 0, { solid: 'fit' }),
    f('desk', -3.3, 2.6, 0, { solid: 'fit' }),
    f('desk', -2.57, 2.6, 0, { solid: 'fit' }),
    f('computerScreen', -3.0, 2.52, 0, { lift: 0.38 }),
    f('computerKeyboard', -3.0, 2.72, 0, { lift: 0.38 }),
    food('bag', -2.35, 2.6, 90, { lift: 0.38, scale: 0.5 }),
    food('candy-bar', -2.7, 2.5, 0, { lift: 0.38, scale: 0.5 }),
    f('bookcaseOpenLow', -1.8, 2.6, 0, { solid: 'fit' }),
    food('chocolate', -1.8, 2.6, 0, { lift: 0.37, scale: 0.5 }),
    f('rugDoormat', -5.5, 4.3, 0),
    f('pottedPlant', -4.4, 4.6, 0, { solid: 'fit' })
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
    ambient: 0.95
  };
})();

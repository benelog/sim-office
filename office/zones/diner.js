/* Diner: the Sunny Side Diner on Main Street, one room of 12 x 8. The door is at the west end of the south
   wall. A long counter with bar stools runs along the north side with plates of food on it; Rosa works
   behind it (diner_counter), in front of a glass partition with the kitchen (stoves, fridge, sink) behind.
   Four tables with two chairs each fill the dining room; the one by the south windows is where you sit to
   order a meal (diner_table). */
(function () {
  var K = SO_ZONE_KIT;
  function f(node, x, z, turn, extra) { return K.prop('furniture', node, x, z, turn, extra); }
  function food(node, x, z, turn, extra) { return K.prop('food', node, x, z, turn, extra); }
  var BAR = 0.42, TABLE = 0.33;
  var props = [];
  function add(list) { props = props.concat(list); }

  add(K.walls(12, 8, { n: 'wwwwwwwwwwww', s: 'wDwWWwwWWwWw', w: 'wwWWww', e: 'wwWWww' }));

  // ----- kitchen behind a glass partition
  add(K.wallLine(-1, -2.6, 'x', 'wWWWWWw', 180, true));
  add([
    f('kitchenFridge', -0.5, -3.83, 0, { solid: 'fit' }),
    f('kitchenCabinet', 0.2, -3.76, 0, { solid: 'fit' }),
    f('kitchenStove', 0.63, -3.76, 0, { solid: 'fit' }),
    f('kitchenStove', 1.06, -3.76, 0, { solid: 'fit' }),
    f('kitchenCabinet', 1.49, -3.76, 0, { solid: 'fit' }),
    f('kitchenSink', 1.92, -3.76, 0, { solid: 'fit' }),
    f('kitchenCabinet', 2.35, -3.76, 0, { solid: 'fit' }),
    f('kitchenFridge', 3.2, -3.83, 0, { solid: 'fit' }),
    f('kitchenCabinet', 3.63, -3.76, 0, { solid: 'fit' }),
    f('kitchenMicrowave', 3.63, -3.8, 0, { lift: 0.45 }),
    f('hoodModern', 0.85, -3.86, 0, { lift: 0.8 }),
    food('meat-patty', 0.63, -3.7, 0, { lift: 0.45, scale: 0.35 }),
    food('bacon', 1.06, -3.7, 0, { lift: 0.45, scale: 0.35 }),
    food('pizza-box', 4.6, -3.7, 0, { solid: 'fit', scale: 0.6 })
  ]);

  // ----- the counter, stools and food
  for (var i = 0; i < 10; i++) add([f('kitchenBar', 0.2 + 0.43 * i, -1.6, 0, { solid: 'fit' })]);
  [0.5, 1.3, 2.1, 2.9, 3.7].forEach(function (x) { add([f('stoolBar', x, -1.12, 0)]); });
  add([
    f('kitchenCoffeeMachine', 4.1, -1.65, 0, { lift: BAR }),
    food('cup-coffee', 3.7, -1.55, 0, { lift: BAR, scale: 0.35 }),
    food('pancakes', 2.9, -1.58, 0, { lift: BAR, scale: 0.4 }),
    food('burger', 2.1, -1.58, 0, { lift: BAR, scale: 0.4 }),
    food('fries', 2.3, -1.6, 0, { lift: BAR, scale: 0.4 }),
    food('soda', 1.3, -1.6, 0, { lift: BAR, scale: 0.35 }),
    food('bottle-ketchup', 1.55, -1.65, 0, { lift: BAR, scale: 0.4 }),
    food('donut-sprinkles', 0.4, -1.6, 0, { lift: BAR, scale: 0.4 }),
    food('muffin', 0.65, -1.62, 0, { lift: BAR, scale: 0.35 }),
    f('radio', 4.6, -1.62, 0, { lift: BAR }),
    f('televisionModern', 5.92, -1.5, 270, { lift: 0.6 }),
    f('pottedPlant', 5.6, -1.2, 0, { solid: 'fit' })
  ]);

  // ----- four tables
  [[-2.8, -2.2], [-2.8, 0.6], [0.9, 2.4], [3.6, 2.4]].forEach(function (t, n) {
    add([
      f('table', t[0], t[1], 0, { solid: 'fit' }),
      f('chair', t[0], t[1] - 0.38, 0),
      f('chair', t[0], t[1] + 0.38, 180),
      food(['bottle-ketchup', 'glass', 'bottle-ketchup', 'glass'][n], t[0] + 0.28, t[1] - 0.05, 0, { lift: TABLE, scale: 0.35 })
    ]);
  });
  add([
    food('plate-dinner', -2.8, 0.55, 0, { lift: TABLE, scale: 0.4 }),
    food('sandwich', 3.55, 2.4, 0, { lift: TABLE, scale: 0.4 }),
    f('pottedPlant', -5.6, -3.6, 0, { solid: 'fit' }),
    f('pottedPlant', -5.6, 3.6, 0, { solid: 'fit' }),
    f('pottedPlant', 5.6, 3.6, 0, { solid: 'fit' }),
    f('coatRackStanding', -3.6, 3.55, 0, { solid: 'fit' }),
    f('rugDoormat', -4.5, 3.3, 0)
  ]);

  SO_ZONES.diner = {
    name: 'Sunny Side Diner', name_ko: '서니 사이드 식당',
    indoor: true,
    size: [12, 8],
    floor: '#c9b8a0',
    props: props,
    places: {
      diner_counter: { at: [2.1, -2.1], face: [2.1, -1.0] },
      diner_table: { at: [0.9, 2.02], face: [0.9, 2.4], sit: true },
      diner_door: { at: [-4.4, 2.4], face: [-3.0, 1.2] }
    },
    portals: [
      { at: [-4.5, 3.7], size: [0.9, 0.5], to: 'city', arrive: 'diner_door', label: 'Leave the diner', label_ko: '식당에서 나가기' }
    ],
    spawn: 'diner_door',
    lights: [
      { at: [2, -1], height: 1.2, color: '#ffe0b0', intensity: 1.1 },
      { at: [-2.5, 1], height: 1.2, color: '#ffe0b0', intensity: 1.0 },
      { at: [2.5, 2.5], height: 1.2, color: '#ffe0b0', intensity: 0.9 }
    ],
    ambient: 0.9
  };
})();

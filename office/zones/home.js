/* Home: Jun's studio apartment on Maple Street, one room of 7 x 5. The bed with a night stand is in the
   north-west corner, the desk (laptop, desk chair, bookcase, floor lamp) under the middle window, and a
   small kitchen (fridge, counter, sink, stove, coffee machine) along the east end of the north wall. The
   sofa, rug, coffee table and TV make a living corner in the south-west; the front door is at the east end
   of the south wall and leads out to the sidewalk in front of the apartment building (city: apartment_door).
   The day starts next to the bed (home_bed). */
(function () {
  var K = SO_ZONE_KIT;
  function f(node, x, z, turn, extra) { return K.prop('furniture', node, x, z, turn, extra); }
  function food(node, x, z, turn, extra) { return K.prop('food', node, x, z, turn, extra); }

  SO_ZONES.home = {
    name: 'Your apartment', name_ko: '내 아파트',
    indoor: true,
    size: [7, 5],
    floor: '#cdb79a',
    tiles: K.floor(-3.5, -2.5, 3.5, 2.5),
    props: [].concat(
      K.walls(7, 5, { n: 'wWwWwww', s: 'wwWwwwD', w: 'wwWww', e: 'wwWww' }),
      [
        // bed corner
        f('bedSingle', -2.9, -1.9, 0, { solid: 'fit' }),
        f('cabinetBed', -2.4, -2.33, 0, { solid: 'fit' }),
        f('lampRoundTable', -2.4, -2.33, 0, { lift: 0.23 }),
        f('rugRound', -2.3, -1.2, 0),
        // desk
        f('bookcaseOpen', -1.6, -2.35, 0, { solid: 'fit' }),
        f('books', -1.6, -2.35, 0, { lift: 0.37 }),
        f('books', -1.62, -2.33, 0, { lift: 0.61 }),
        f('desk', -0.8, -2.2, 0, { solid: 'fit' }),
        f('laptop', -0.8, -2.24, 0, { lift: 0.38 }),
        food('mug', -0.52, -2.2, 30, { lift: 0.38, scale: 0.4 }),
        f('chairDesk', -0.8, -1.7, 180),
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
        f('table', 1.1, 0.3, 0, { solid: 'fit' }),
        f('chair', 0.85, 0.75, 180),
        f('chair', 1.35, -0.15, 0),
        food('bowl-cereal', 0.95, 0.35, 0, { lift: 0.33, scale: 0.4 }),
        food('carton-small', 1.3, 0.2, 0, { lift: 0.33, scale: 0.4 }),
        // living corner
        f('rugRectangle', -2.4, 1.2, 90),
        f('loungeSofa', -3.25, 1.2, 90, { solid: 'fit' }),
        f('tableCoffee', -2.5, 1.2, 90, { solid: 'fit' }),
        food('cup-tea', -2.5, 1.05, 0, { lift: 0.23, scale: 0.4 }),
        f('cabinetTelevision', -1.6, 1.2, 270, { solid: 'fit' }),
        f('televisionModern', -1.6, 1.2, 270, { lift: 0.31 }),
        f('lampRoundFloor', -3.25, 0.45, 0, { solid: 'fit' }),
        f('pottedPlant', -3.25, 2.2, 0, { solid: 'fit' }),
        // by the door
        f('coatRackStanding', 2.1, 2.2, 0, { solid: 'fit' }),
        f('rugDoormat', 3.0, 1.6, 0),
        f('pottedPlant', 0.4, 2.25, 0, { solid: 'fit' })
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
    ambient: 0.9
  };
})();

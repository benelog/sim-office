/* Client: the Summit Retail office, one floor of 12 x 8, across the street from the hotel. The door is in
   the south wall; the lobby on the west side has the reception desk under the company sign (client_lobby),
   a sofa and a coffee counter. The glass-walled meeting room in the north-east has a long table with a
   cloth, seven chairs and a TV on the wall; Greg Whitfield waits for you on the far side of the table
   (client_meeting). */
(function () {
  var K = SO_ZONE_KIT;
  function f(node, x, z, turn, extra) { return K.prop('furniture', node, x, z, turn, extra); }
  function food(node, x, z, turn, extra) { return K.prop('food', node, x, z, turn, extra); }
  var D = 0.384;
  var props = [];
  function add(list) { props = props.concat(list); }

  add(K.walls(12, 8, { n: 'wwwwwwwWWwWw', s: 'wwDwwWWwWWww', w: 'wwWWwwww', e: 'wWWwwwww' }));

  // ----- lobby and reception
  add([
    f('desk', -4.4, 0.6, 180, { solid: 'fit' }),
    f('desk', -3.67, 0.6, 180, { solid: 'fit' }),
    f('computerScreen', -4.2, 0.5, 180, { lift: D }),
    f('computerKeyboard', -4.2, 0.68, 180, { lift: D }),
    f('plantSmall3', -3.45, 0.6, 0, { lift: D }),
    f('pottedPlant', -5.6, -3.6, 0, { solid: 'fit' }),
    f('pottedPlant', -2.4, -3.6, 0, { solid: 'fit' }),
    f('loungeDesignSofa', -5.72, 2.4, 90, { solid: 'fit' }),
    f('tableCoffeeSquare', -5.0, 2.4, 0, { solid: 'fit' }),
    f('rugSquare', -5.0, 2.4, 0),
    f('kitchenBar', -1.4, 3.8, 180, { solid: 'fit' }),
    f('kitchenBar', -0.97, 3.8, 180, { solid: 'fit' }),
    f('kitchenCoffeeMachine', -1.4, 3.8, 180, { lift: 0.42 }),
    food('cup-coffee', -0.95, 3.8, 0, { lift: 0.42, scale: 0.35 }),
    f('pottedPlant', -5.6, 3.6, 0, { solid: 'fit' }),
    f('rugDoormat', -3.5, 3.3, 0)
  ]);

  // ----- meeting room (north-east), glass on the two inner sides
  add(K.wallLine(0, -4, 'z', 'WWWWh', 90, true));
  add(K.wallLine(0.07, 0.5, 'x', '.,WWWWh', 180, true));
  add([
    f('tableCrossCloth', 2.575, -2.6, 0, { solid: 'fit' }),
    f('tableCrossCloth', 3.425, -2.6, 0, { solid: 'fit' }),
    f('chair', 2.4, -3.15, 0), f('chair', 3.0, -3.15, 0), f('chair', 3.6, -3.15, 0),
    f('chair', 2.4, -2.05, 180), f('chair', 3.0, -2.05, 180), f('chair', 3.6, -2.05, 180),
    f('chair', 4.15, -2.6, 270),
    f('laptop', 3.0, -2.7, 0, { lift: 0.35 }),
    food('glass', 2.4, -2.75, 0, { lift: 0.35, scale: 0.3 }),
    food('glass', 3.6, -2.45, 0, { lift: 0.35, scale: 0.3 }),
    food('cup-coffee', 2.45, -2.42, 0, { lift: 0.35, scale: 0.3 }),
    f('cabinetTelevision', 5.84, -2.6, 270, { solid: 'fit' }),
    f('televisionModern', 5.84, -2.6, 270, { lift: 0.31 }),
    f('pottedPlant', 0.5, -3.6, 0, { solid: 'fit' }),
    f('pottedPlant', 5.6, -3.6, 0, { solid: 'fit' }),
    f('pottedPlant', 5.6, 0.0, 0, { solid: 'fit' }),
    f('bookcaseClosedWide', 1.5, -3.85, 0, { solid: 'fit' })
  ]);

  // ----- open corner south-east
  add([
    f('desk', 3.0, 2.8, 0, { solid: 'fit' }),
    f('chairDesk', 3.0, 3.3, 180),
    f('computerScreen', 3.0, 2.72, 0, { lift: D }),
    f('desk', 4.6, 2.8, 0, { solid: 'fit' }),
    f('chairDesk', 4.6, 3.3, 180),
    f('laptop', 4.6, 2.75, 0, { lift: D }),
    f('pottedPlant', 5.6, 3.6, 0, { solid: 'fit' })
  ]);

  // ----- outside: the street in front (south) with the hotel across it, towers around
  add([
    K.prop('city', 'building-skyscraper-c', -1.0, 12.5, 180), K.prop('city', 'building-d', 5.5, 12.0, 180), K.prop('city', 'building-b', -7.0, 12.0, 180),
    K.prop('city', 'building-skyscraper-a', 10.0, -2.0, 270), K.prop('city', 'low-detail-building-wide-a', -10.0, -1.0, 90),
    K.prop('city', 'building-g', 2.0, -9.5, 0), K.prop('city', 'low-detail-building-c', -5.0, -9.5, 0),
    K.prop('roads', 'light-square', -2.0, 5.0, 0), K.prop('roads', 'light-square', 4.0, 5.0, 0),
    K.prop('city', 'tree-small', 1.0, 4.9, 0), K.prop('cars', 'sports-car', 3.0, 6.4, 90), K.prop('cars', 'police', -4.5, 8.6, 270)
  ]);

  SO_ZONES.client = {
    name: 'Summit Retail, head office', name_ko: '서밋 리테일 본사',
    indoor: true,
    size: [12, 8],
    floor: '#d4d9d6',
    props: props,
    places: {
      client_lobby: { at: [-4.0, 0.05], face: [-4.0, 1.4] },
      client_meeting: { at: [3.0, -3.15], face: [3.0, -2.6], sit: true },
      client_door: { at: [-3.3, 2.4], face: [-2.2, 1.2] }
    },
    portals: [
      { at: [-3.5, 3.7], size: [0.9, 0.5], to: 'hotel', arrive: 'hotel_door', label: 'Walk back to the hotel', label_ko: '호텔로 돌아가기' }
    ],
    spawn: 'client_door',
    lights: [
      { at: [-3.5, 1], height: 1.2, color: '#fff4e0', intensity: 1.0 },
      { at: [3, -2.6], height: 1.2, color: '#ffffff', intensity: 1.1 },
      { at: [3.8, 2.8], height: 1.2, color: '#fff4e0', intensity: 0.8 }
    ],
    ambient: 0.9,
    background: '#bcd7ec',
    outside: '#c9c6bf',
    setup: function (api) {
      K.dress(api, {
        floor: { pattern: 'concrete', a: '#c9ccca' },
        floors: [
          { pattern: 'carpet', a: '#5f6d77', rect: [0, -4, 6, 0.5] },       // meeting room
          { pattern: 'carpet', a: '#8a9199', rect: [2, 1.6, 6, 4] }         // open corner
        ],
        walls: { color: '#e2e8e5', trim: '#1f6f5c', base: '#2f3b3a' },
        ground: { pattern: 'sidewalk', strips: [
          { pattern: 'road', rect: [-80, 5.6, 80, 9.6] }, { pattern: 'road', rect: [-12.4, -80, -8.4, 5.6], dir: 'z' }] },
        skyline: { kind: 'city', seed: 31 },
        panels: [
          { kind: 'sign', wall: 'n', along: -4.0, y: 1.0, w: 2.2, h: 0.42, text: 'Summit Retail', sub: 'Head office', bg: '#1f6f5c', fg: '#ffffff', logo: '#f4d35e', frame: '#164f42' },
          { kind: 'tv', at: [5.774, -2.6], turn: 270, y: 0.595, w: 0.6, h: 0.33, depth: 0, a: '#1f6f5c', b: '#0f3a30', text: 'Summit Retail x Lakeside Labs' },
          { kind: 'art', wall: 'n', along: 5.5, y: 0.85, w: 0.6, h: 0.45, frame: '#2e2e33', seed: 8, palette: ['#1f6f5c', '#f4d35e', '#ee964b', '#f95738'] },
          { kind: 'photo', wall: 'w', along: 2.4, y: 0.85, w: 0.8, h: 0.5, frame: '#2e2e33', sky: '#9cc9e8' },
          { kind: 'poster', wall: 's', along: 4.5, y: 0.85, w: 0.45, h: 0.6, frame: '#ffffff', text: 'Store #120', lines: ['Opening soon', 'Ridgeport Mall'], band: '#1f6f5c' }
        ]
      });
    },
    update: function (api) { K.tick(api); }
  };
})();

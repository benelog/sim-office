/* Zones of Sim Office: which places, props and doors each part of Fairview has.
   The engine (game.js) loads this file first and then zones/<name>.js for every name in SO_ZONE_FILES; each of
   those files sets SO_ZONES.<name> in the shape described in office/PLAN.md section 5. A zone file may build its
   props with SO_ZONE_KIT below (walls around a room, a row of wall pieces, a floor of tiles, a prop whose solid
   box is fitted to its model); what reaches the engine is still plain data.

   Conventions (lengths in game units: a person is 0.67 tall, a furniture wall 1.29 high and 1 wide):
   - x to the right, z towards the camera's default side ("south"); size [w, d] is centred on the origin.
   - turn in degrees, counterclockwise seen from above: 0 = the model's front (Kenney +Z) looks towards +z,
     90 = towards +x, 180 = -z, 270 = -x. lift raises a prop off the floor (desk top 0.38, counter 0.42).
   - The engine puts a node's own origin at `at`. Kenney's furniture has its origin at a corner (x 0..w,
     z -d..0), so the zone files never write that by hand: they give the middle of the footprint to
     SO_ZONE_KIT.prop(), which works out the origin from BOX (ORIGIN = 'origin'; set it to 'center' if the
     engine ever centres nodes itself). Roads, buildings, cars and food are centred already.
   - solid: true = the placed model's bounding box (what the kit's solid: 'fit' becomes); [w, d] = a box of
     that size in the model's own axes, centred on at (the engine swaps w and d for turn 90/270). Explicit
     boxes are only used for centred models (trees, poles) and pack: 'box'. */
window.SO_ZONES = {};
window.SO_ZONE_FILES = ['home', 'city', 'office', 'diner', 'market', 'airport', 'hotel', 'client'];

(function () {
  var ORIGIN = 'origin';
  var SCALE = { furniture: 1, city: 3, roads: 3, cars: 0.6, food: 0.6 };
  // Bounding box of each Kenney model at scale 1: [minx, maxx, minz, maxz, miny, maxy].
  var BOX = {
    furniture: {
      bathroomCabinet:[0.2,0.43,-0.21,-0.08,0,0.39], bathroomCabinetDrawer:[0,0.43,-0.45,-0.13,0.058,0.53],
      bathroomMirror:[0,0.301,-0.049,0.096,0,0.435], bathroomSink:[0,0.34,-0.29,0,-0.4,0.16],
      bathroomSinkSquare:[0,0.43,-0.45,-0.15,0.057,0.637], bathtub:[0,1.19,-0.56,0,-0,0.42],
      bear:[0,0.39,-0.247,0,0,0.45], bedBunk:[0,0.571,-1.095,0,0,0.85], bedDouble:[-0,0.956,-1.125,0,0,0.375],
      bedSingle:[0.385,0.956,-1.125,0,0,0.375], bench:[0,0.4,-0.2,0,0,0.47], benchCushion:[0,0.4,-0.2,0,0,0.46],
      benchCushionLow:[-0.01,0.41,-0.21,0.01,0,0.2], bookcaseClosed:[0,0.4,-0.25,0,0,0.85],
      bookcaseClosedDoors:[0,0.4,-0.25,0,0,0.85], bookcaseClosedWide:[0,0.8,-0.25,0,0,0.79],
      bookcaseOpen:[0,0.4,-0.25,0,0,0.88], bookcaseOpenLow:[0,0.4,-0.25,0,0,0.4], books:[0,0.15,-0.095,0,0,0.104],
      cabinetBed:[-0.01,0.256,-0.205,0.01,0,0.233], cabinetBedDrawer:[-0.01,0.256,-0.205,0.012,0,0.263],
      cabinetBedDrawerTable:[-0.01,0.256,-0.205,0.012,0,0.263], cabinetTelevision:[0,0.8,-0.25,0,0,0.31],
      cabinetTelevisionDoors:[0,0.8,-0.25,0.01,0,0.31], cardboardBoxClosed:[0,0.212,-0.212,0,0,0.281],
      cardboardBoxOpen:[-0.08,0.292,-0.212,0,0,0.281], ceilingFan:[-0.172,0.283,-0.264,0.261,-0.134,0],
      chair:[0,0.2,-0.2,0,0,0.47], chairCushion:[0,0.2,-0.2,0,0,0.46], chairDesk:[0,0.335,-0.314,0,0,0.608],
      chairModernCushion:[0,0.2,-0.2,0,-0,0.46], chairModernFrameCushion:[0,0.2,-0.2,0,-0,0.46],
      chairRounded:[0,0.2,-0.2,0,0,0.455], coatRack:[0,0.448,-0.134,0,0,0.28],
      coatRackStanding:[-0.136,0.136,-0.136,0.136,0,0.77], computerKeyboard:[0,0.282,-0.118,-0,0,0.028],
      computerMouse:[-0.025,0.025,-0.085,0,0,0.024], computerScreen:[-0,0.393,-0.104,-0,-0,0.294],
      desk:[-0.01,0.724,-0.38,0.012,0,0.384], deskCorner:[0,0.974,-0.974,0,0,0.384],
      doorway:[0,0.486,-0.101,0.012,0,1.01], doorwayFront:[0,0.486,-0.101,0.012,0,1.01],
      doorwayOpen:[0,0.486,-0.089,0,0,1.01], dryer:[0,0.39,-0.35,0.03,0,0.47], floorCorner:[0,0.55,-0.55,0,-0,0.05],
      floorCornerRound:[0,0.55,-0.55,0,0,0.05], floorFull:[0,1,-1,0,0,0.05], floorHalf:[0,0.5,-1,0,0,0.05],
      hoodLarge:[-0,0.43,-0.285,0,0,0.37], hoodModern:[-0,0.43,-0.285,0,-0.03,0.37], kitchenBar:[0,0.43,-0.21,0,0,0.42],
      kitchenBarEnd:[0,0.102,-0.21,0,0,0.42], kitchenBlender:[0,0.136,-0.109,0,0,0.228],
      kitchenCabinet:[0,0.43,-0.45,0,0,0.45], kitchenCabinetCornerInner:[0,0.46,-0.46,0,0,0.45],
      kitchenCabinetCornerRound:[0,0.45,-0.45,0,0,0.45], kitchenCabinetDrawer:[0,0.43,-0.45,0,0,0.45],
      kitchenCabinetUpper:[0,0.43,-0.21,0.01,0,0.39], kitchenCabinetUpperCorner:[0,0.215,-0.21,0,0,0.39],
      kitchenCabinetUpperDouble:[0,0.43,-0.21,0.01,0,0.39], kitchenCabinetUpperLow:[0,0.43,-0.21,0.01,0,0.195],
      kitchenCoffeeMachine:[0,0.19,-0.24,0,0,0.177], kitchenFridge:[0,0.43,-0.282,0.01,0,0.92],
      kitchenFridgeBuiltIn:[0,0.43,-0.45,0,0,0.869], kitchenFridgeLarge:[0,0.52,-0.342,0.064,-0,0.92],
      kitchenFridgeSmall:[0,0.43,-0.282,0.01,0,0.6], kitchenMicrowave:[0,0.29,-0.22,0.01,0,0.18],
      kitchenSink:[0,0.43,-0.45,0,0,0.49], kitchenStove:[0,0.43,-0.45,0,0,0.45],
      kitchenStoveElectric:[0,0.43,-0.45,0,0,0.45], lampRoundFloor:[-0.016,0.136,-0.148,0.028,0,0.86],
      lampRoundTable:[-0.016,0.136,-0.148,0.028,0,0.314], lampSquareCeiling:[0,0.12,-0.12,0,0,0.23],
      lampSquareFloor:[0,0.12,-0.12,0,0,0.86], lampSquareTable:[0,0.12,-0.12,0,0,0.29],
      lampWall:[-0.113,0.113,0,0.15,0,0.093], laptop:[0,0.264,-0.24,0,0,0.162], loungeChair:[0,0.49,-0.41,0,0,0.46],
      loungeChairRelax:[0,0.49,-0.675,0,0,0.63], loungeDesignChair:[0,0.73,-0.41,0,0,0.4],
      loungeDesignSofa:[0,1.12,-0.41,0,0,0.4], loungeDesignSofaCorner:[0,1.35,-1.35,0,-0,0.4],
      loungeSofa:[0,0.98,-0.41,0,0,0.46], loungeSofaCorner:[0,0.98,-0.98,0,0,0.46],
      loungeSofaLong:[0,0.98,-0.41,0.41,0,0.46], loungeSofaOttoman:[0.47,0.91,-0.04,0.41,0,0.23],
      paneling:[0,0.5,0,0.03,0,0.595], pillow:[0,0.23,-0.088,0,0,0.222], pillowBlue:[0,0.23,-0.063,0,0,0.129],
      pillowBlueLong:[-0.13,0.387,-0.088,0,-0,0.222], pillowLong:[0,0.387,-0.088,0,-0,0.222],
      plantSmall1:[-0.047,0.047,-0.047,0.047,0,0.14], plantSmall2:[-0.047,0.047,-0.047,0.047,0,0.14],
      plantSmall3:[-0.049,0.049,-0.042,0.042,0,0.145], pottedPlant:[-0.106,0.106,-0.121,0.121,0,0.654],
      radio:[0,0.315,-0.098,0,0,0.228], rugDoormat:[0,0.429,-0.237,0,0,0.01], rugRectangle:[0,1.57,-0.92,0,0,0.01],
      rugRound:[0,0.92,-0.92,0,0,0.01], rugRounded:[0,1.57,-0.92,0,0,0.01], rugSquare:[0,0.904,-0.92,0,0,0.01],
      shower:[-0.562,0,-0.562,0.02,0,1.094], showerRound:[-0,0.562,-0.562,0,0,1.094],
      sideTable:[-0.01,0.524,-0.21,0.01,0,0.384], sideTableDrawers:[-0.01,0.524,-0.21,0.012,0,0.384],
      speaker:[-0,0.148,-0.148,-0,0,0.636], speakerSmall:[0,0.148,-0.133,0,0,0.298], stairs:[0,1.823,-0.79,0,0,1.34],
      stairsCorner:[0.164,1.938,-1.426,0,0,1.34], stairsOpen:[0,1.823,-0.79,0,0,1.34],
      stairsOpenSingle:[0,1.823,-0.79,0,0,1.34], stoolBar:[0,0.265,-0.23,0,0,0.435],
      stoolBarSquare:[0.056,0.209,-0.189,-0.041,0,0.405], table:[0,0.841,-0.447,0,0,0.327],
      tableCloth:[0,0.841,-0.447,0,0,0.327], tableCoffee:[-0.461,0.2,-0.3,0.1,-0,0.23],
      tableCoffeeGlass:[-0.461,0.2,-0.3,0.1,-0,0.23], tableCoffeeGlassSquare:[-0.461,-0.061,-0.3,0.1,-0,0.23],
      tableCoffeeSquare:[-0.461,-0.061,-0.3,0.1,-0,0.23], tableCross:[0,0.852,-0.447,0,0,0.347],
      tableCrossCloth:[0,0.852,-0.447,0,0,0.347], tableGlass:[0,0.841,-0.447,0,0,0.327],
      tableRound:[0,0.693,-0.8,0,-0.27,0.097], televisionAntenna:[-0.132,0.132,-0.08,0,0,0.103],
      televisionModern:[-0.342,0.342,-0.064,0.064,0,0.455], televisionVintage:[0,0.41,-0.27,0,0,0.27],
      toaster:[-0.094,0.094,-0.05,0.05,0,0.13], toilet:[-0,0.313,-0,0.477,0,0.451],
      toiletSquare:[0,0.304,-0.387,0,0,0.451], trashcan:[-0.104,0.104,-0.112,0.122,-0,0.428], wall:[0,1,-0.05,0,0,1.29],
      wallCorner:[0,0.55,-0.55,0,-0,1.29], wallCornerRond:[0,0.55,-0.55,0,0,1.29], wallDoorway:[0,1,-0.07,0.02,0,1.29],
      wallDoorwayWide:[0,1,-0.07,0.02,-0,1.29], wallHalf:[0,0.5,-0.05,0,0,1.29], wallWindow:[0,1,-0.07,0.02,0,1.29],
      wallWindowSlide:[0,1,-0.07,0.02,0,1.29], washer:[0,0.39,-0.35,0.04,0,0.47],
      washerDryerStacked:[0,0.39,-0.35,0.04,0,0.94]
    },
    city: {
      'building-a':[-0.442,0.442,-0.47,0.47,0,1.293], 'building-b':[-0.485,0.485,-0.47,0.47,0,1.293],
      'building-c':[-0.442,0.442,-0.545,0.545,0,0.893], 'building-d':[-0.42,0.42,-0.45,0.45,0,1.293],
      'building-e':[-0.82,0.82,-0.504,0.504,0,0.893], 'building-f':[-0.42,0.42,-0.515,0.515,0,1.693],
      'building-g':[-0.485,0.485,-0.461,0.461,0,1.693], 'building-h':[-0.442,0.442,-0.504,0.504,0,1.293],
      'building-skyscraper-a':[-0.68,0.68,-0.68,0.68,0,2.88], 'building-skyscraper-b':[-0.68,0.68,-0.68,0.68,0,4.48],
      'building-skyscraper-c':[-0.64,0.64,-0.694,0.694,0,4.08], 'building-type-a':[-0.65,0.65,-0.514,0.514,0,0.834],
      'building-type-b':[-0.914,0.914,-0.57,0.57,0,1.138], 'building-type-c':[-0.643,0.643,-0.514,0.514,0,1.034],
      'building-type-d':[-0.878,0.878,-0.514,0.514,0,1.238], 'building-type-e':[-0.65,0.65,-0.514,0.514,0,1.138],
      'building-type-f':[-0.714,0.714,-0.703,0.703,0,1.138], 'building-type-g':[-0.725,0.725,-0.589,0.589,0,0.768],
      'building-type-h':[-0.65,0.65,-0.458,0.458,0,0.737], 'detail-awning':[-0.2,0.2,0.1,0.248,-0,0.4],
      'detail-awning-wide':[-0.4,0.4,0.1,0.248,-0,0.4], 'detail-parasol-a':[-0.173,0.173,-0.2,0.2,0,0.45],
      'detail-parasol-b':[-0.173,0.173,-0.2,0.2,0,0.45], 'driveway-short':[-0.18,0.18,-0.1,0.1,0,0.01],
      fence:[-0.238,0.238,-0.038,0.038,0,0.27], 'fence-1x3':[-0.638,0.638,-0.2,0.238,-0,0.27],
      'path-short':[-0.1,0.1,-0.1,0.1,0,0.01], planter:[-0.2,0.2,-0.151,0.149,0,0.177],
      'tree-large':[-0.105,0.105,-0.121,0.121,0,0.767], 'tree-small':[-0.105,0.105,-0.121,0.121,0,0.567]
    },
    cars: {
      ambulance:[-0.75,0.75,-1.65,1.6,-0,1.8], delivery:[-0.75,0.75,-1.65,1.6,-0,1.65],
      'hatchback-sports':[-0.65,0.65,-1.45,1.4,-0,1.1], police:[-0.75,0.75,-1.55,1.55,-0,1.3],
      sedan:[-0.75,0.75,-1.3,1.25,-0,1.3], 'sedan-sports':[-0.65,0.65,-1.3,1.25,-0,1.1],
      suv:[-0.75,0.75,-1.35,1.35,-0,1.3], taxi:[-0.75,0.75,-1.4,1.35,-0,1.5], truck:[-0.75,0.75,-1.5,1.45,-0,1.3],
      van:[-0.75,0.75,-1.4,1.35,-0,1.35]
    },
    roads: {
      'construction-barrier':[-0.068,0.068,-0.112,0.112,0,0.13],
      'construction-cone':[-0.038,0.038,-0.038,0.038,0,0.094], dumpster:[-0.13,0.145,-0.185,0.185,0,0.209],
      'electricity-pole':[-0.297,0.282,-0.107,0.107,0,0.525], 'light-curved':[-0.025,0.025,-0.2,0.025,0,0.675],
      'light-square':[-0.025,0.025,-0.213,0.025,0,0.6], 'light-square-double':[-0.025,0.025,-0.212,0.212,0,0.6],
      'road-bend':[-0.5,0.5,-0.5,0.5,0,0.02], 'road-bend-sidewalk':[-0.5,0.5,-0.5,0.5,0,0.02],
      'road-crossing':[-0.5,0.5,-0.5,0.5,0,0.02], 'road-crossroad':[-0.5,0.5,-0.5,0.5,0,0.02],
      'road-crossroad-line':[-0.5,0.5,-0.5,0.5,0,0.02], 'road-curve':[-1,1,-1,1,0,0.02],
      'road-end':[-0.5,0.5,-0.5,0.5,0,0.02], 'road-intersection':[-0.5,0.5,-0.5,0.5,0,0.02],
      'road-intersection-line':[-0.5,0.5,-0.5,0.5,0,0.02], 'road-side':[-0.5,0.5,-0.81,0.5,-0,0.02],
      'road-sign-stop':[-0.051,0.026,-0.069,0.069,0,0.494], 'road-sign-street':[-0.171,0.025,-0.025,0.171,0,0.475],
      'road-square':[-0.5,0.5,-0.5,0.5,0,0.02], 'road-straight':[-0.5,0.5,-0.5,0.5,0,0.02],
      'road-straight-half':[-0.25,0.25,-0.5,0.5,0,0.02], 'sign-highway':[-0.107,0.025,-0.5,0.5,0,0.707],
      'tile-low':[-0.5,0.5,-0.5,0.5,0,0.02], 'traffic-light':[-0.073,0.045,-0.045,0.045,0,0.515]
    }
  };

  function r2(v) { return Math.round(v * 100) / 100; }
  function rot(x, z, turn) {
    var r = turn * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
    return [x * c + z * s, -x * s + z * c];
  }
  function box(pack, node) { return (BOX[pack] || {})[node] || null; }

  // Footprint [w, d] in world x/z of a model placed with this turn and extra scale.
  function size(pack, node, scale, turn) {
    var b = box(pack, node);
    if (!b) return null;
    var s = (SCALE[pack] || 1) * (scale || 1), w = (b[1] - b[0]) * s, d = (b[3] - b[2]) * s;
    var r = (turn || 0) * Math.PI / 180, c = Math.abs(Math.cos(r)), n = Math.abs(Math.sin(r));
    return [r2(w * c + d * n), r2(w * n + d * c)];
  }

  // A prop whose footprint is centred on [x, z]. solid: 'fit' blocks the model's own bounding box.
  function prop(pack, node, x, z, turn, extra) {
    var o = { pack: pack, node: node, at: [r2(x), r2(z)] };
    if (turn) o.turn = turn;
    for (var k in extra) o[k] = extra[k];
    if (o.solid === 'fit') o.solid = true;
    var b = box(pack, node);
    if (ORIGIN === 'origin' && b) {
      var s = (SCALE[pack] || 1) * (o.scale || 1);
      var c = rot((b[0] + b[1]) / 2 * s, (b[2] + b[3]) / 2 * s, o.turn || 0);
      o.at = [r2(x - c[0]), r2(z - c[1])];
      if (b[4] < -0.005) o.lift = r2((o.lift || 0) - b[4] * s);
    }
    return o;
  }

  var PIECE = { w: ['wall', 1], W: ['wallWindow', 1], D: ['wallDoorway', 1], h: ['wallHalf', 0.5], '.': [null, 1], ',': [null, 0.5] };

  // Wall pieces along a straight line from [x, z], one character each: w wall, W window, D doorway, h half wall
  // (0.5), '.' gap of 1, ',' gap of 0.5. dir 'x' runs towards +x, 'z' towards +z. turn: which way the fronts look.
  // solid: give each piece a thin box (inner walls); the room's outer walls need none (size keeps you inside).
  function wallLine(x, z, dir, pattern, turn, solid) {
    var out = [], t = 0;
    for (var i = 0; i < pattern.length; i++) {
      var p = PIECE[pattern.charAt(i)], len = p[1];
      if (p[0]) {
        var cx = dir === 'x' ? x + t + len / 2 : x, cz = dir === 'x' ? z : z + t + len / 2;
        out.push(prop('furniture', p[0], cx, cz, turn, solid ? { solid: true } : {}));
      }
      t += len;
    }
    return out;
  }

  // The four outer walls of a room of size [w, d] (whole numbers), fronts facing in. Each side is a pattern
  // (see wallLine) read west to east (n, s) or north to south (w, e); a missing side is a plain wall.
  function walls(w, d, sides) {
    sides = sides || {};
    function run(len, pat) { var s = pat || ''; while (s.length < len) s += 'w'; return s; }
    var o = 0.03;
    return [].concat(
      wallLine(-w / 2, -d / 2 - o, 'x', run(w, sides.n), 0),
      wallLine(-w / 2, d / 2 + o, 'x', run(w, sides.s), 180),
      wallLine(-w / 2 - o, -d / 2, 'z', run(d, sides.w), 90),
      wallLine(w / 2 + o, -d / 2, 'z', run(d, sides.e), 270));
  }

  // Floor tiles (floorFull, 1 x 1) over the rectangle x0..x1, z0..z1 (whole numbers).
  function floor(x0, z0, x1, z1, node) {
    var out = [];
    for (var x = x0; x < x1; x++) for (var z = z0; z < z1; z++)
      out.push(prop('furniture', node || 'floorFull', x + 0.5, z + 0.5, 0));
    return out;
  }

  window.SO_ZONE_KIT = { ORIGIN: ORIGIN, SCALE: SCALE, BOX: BOX, size: size, prop: prop, wallLine: wallLine, walls: walls, floor: floor };
})();

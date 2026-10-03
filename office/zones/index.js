/* Zones of Sim Office: which places, props and doors each part of Fairview has.
   The engine (office/engine) loads this file first and then zones/<name>.js for every name in SO_ZONE_FILES; each of
   those files sets SO_ZONES.<name> in the shape described in office/PLAN.md section 5. A zone file may build its
   props with SO_ZONE_KIT below (walls around a room, a row of wall pieces, a floor of tiles, a prop whose solid
   box is fitted to its model); what reaches the engine is still plain data. A zone's setup(api) may call
   SO_ZONE_KIT.dress(api, {...}) for what data cannot say (patterned floors, wall trim and colour, the land and the
   town seen outside, signs and pictures drawn on canvases), and its update(api) SO_ZONE_KIT.tick(api) for the night.

   Conventions (lengths in game units: a person is about 0.95 tall, a furniture wall 1.29 high and 1 wide):
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
window.SO_ZONE_FILES = ['home', 'home_derek', 'home_priya', 'city', 'office', 'diner', 'market', 'airport', 'hotel', 'client'];

(function () {
  var ORIGIN = 'origin';
  var SCALE = { furniture: 1, city: 3, roads: 3, cars: 0.5, food: 0.6, extras: 1, nature: 0.4, park: 2, homeware: 0.4, buildings: 1, wild: 1 };
  // Bounding box of each model at scale 1: [minx, maxx, minz, maxz, miny, maxy] (Quaternius packs: node tools/office-models-check.mjs --box <pack>).
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
      'tree-large':[-0.105,0.105,-0.121,0.121,0,0.767], 'tree-small':[-0.105,0.105,-0.121,0.121,0,0.567],
      'detail-overhang':[-0.25,0.25,0.05,0.25,0,0.4], 'detail-overhang-wide':[-0.5,0.5,0.05,0.25,0,0.4],
      'low-detail-building-a':[-0.25,0.25,-0.25,0.25,0,2], 'low-detail-building-b':[-0.25,0.25,-0.25,0.25,0,2.23],
      'low-detail-building-c':[-0.25,0.25,-0.25,0.25,0,2.25], 'low-detail-building-d':[-0.25,0.25,-0.25,0.25,0,1.75],
      'low-detail-building-e':[-0.25,0.25,-0.25,0.25,0,1.8], 'low-detail-building-f':[-0.25,0.25,-0.25,0.25,0,2],
      'low-detail-building-g':[-0.25,0.25,-0.25,0.25,0,2], 'low-detail-building-h':[-0.25,0.25,-0.25,0.25,0,2.1],
      'low-detail-building-i':[-0.25,0.25,-0.25,0.25,0,1.77], 'low-detail-building-j':[-0.25,0.25,-0.25,0.25,0,1.75],
      'low-detail-building-k':[-0.25,0.25,-0.25,0.25,0,1.55], 'low-detail-building-l':[-0.25,0.25,-0.25,0.25,0,1.85],
      'low-detail-building-m':[-0.25,0.25,-0.25,0.25,0,1.98], 'low-detail-building-n':[-0.25,0.25,-0.25,0.25,0,0.7],
      'low-detail-building-wide-a':[-0.5,0.5,-0.25,0.25,0,1.1], 'low-detail-building-wide-b':[-0.5,0.5,-0.25,0.25,0,1.15]
    },
    // Nature Kit (trees, bushes, flowers, rocks, paths); all centred, with a 0.05 base under the ground (prop() lifts them)
    // Kenney Nature Kit odds and ends (pack 'park'): signs, lilies, logs, pots, statues; the plants are Quaternius now
    park: {
      sign:[-0.15,0.15,-0.05,0.02,-0.05,0.36], lily_large:[-0.14,0.13,-0.16,0.15,-0.05,0.05], lily_small:[-0.09,0.1,-0.11,0.11,-0.05,-0.01],
      log:[-0.11,0.12,-0.35,0.36,-0.05,0.12], log_large:[-0.5,0.5,-0.25,0.3,-0.05,0.37], stump_round:[-0.16,0.16,-0.19,0.18,-0.05,0.16],
      stump_old:[-0.16,0.2,-0.19,0.18,-0.05,0.22], pot_large:[-0.28,0.28,-0.24,0.25,-0.05,0.15], pot_small:[-0.16,0.16,-0.14,0.14,-0.05,0.22],
      canoe:[-0.15,0.15,-0.57,0.58,-0.05,0.13], statue_column:[-0.15,0.15,-0.15,0.15,-0.05,0.95], statue_obelisk:[-0.15,0.16,-0.15,0.16,-0.05,0.83],
      statue_block:[-0.2,0.2,-0.2,0.2,-0.05,0.35], bridge_wood:[-0.52,0.52,-0.52,0.52,-0.05,0.35], fence_simple:[-0.5,0.5,-0.5,-0.43,-0.05,0.3],
      fence_gate:[-0.5,0.5,-0.5,-0.43,-0.05,0.3]
    },
    // Quaternius Stylized Nature MegaKit (scale 0.4): trees symmetric about the trunk, roots left under the floor
    nature: {
      bush:[-0.92,0.99,-0.97,0.99,0,1.35], 'bush-flowers':[-0.92,0.99,-0.97,0.99,0,1.35], clover:[-0.5,0.29,-0.4,0.36,0,1.13],
      fern:[-1.38,1.45,-1.28,1.37,0,0.76], 'flower-3':[-0.48,0.43,-0.52,0.36,0,2.05], 'flower-3-group':[-0.61,0.87,-0.8,0.79,0,2.02],
      'flower-4':[-0.51,0.57,-0.4,0.37,0,2.39], 'flower-4-group':[-0.93,0.85,-0.64,0.73,0,2.43], 'grass-short':[-0.36,0.28,-0.48,0.26,0,1.31],
      'grass-tall':[-0.4,0.49,-0.48,0.51,0,1.84], 'grass-wispy-short':[-0.73,0.59,-0.58,0.63,0,0.99], 'grass-wispy-tall':[-0.74,0.8,-0.82,0.78,0,1.64],
      mushroom:[-0.33,0.23,-0.45,0.33,0,0.45], 'mushroom-laetiporus':[-0.65,0.72,-0.33,0.77,0,0.61], 'path-round-small-1':[-0.54,0.52,-0.7,0.77,0,0.14],
      'path-round-small-2':[-0.56,0.58,-0.76,0.6,0,0.12], 'path-round-small-3':[-0.59,0.61,-0.69,0.6,0,0.13],
      'path-round-thin':[-0.7,0.76,-1.09,1,0,0.13], 'path-round-wide':[-1.05,1.08,-1.13,1.01,0,0.14], 'path-square-small-1':[-0.52,0.5,-0.48,0.5,0,0.17],
      'path-square-small-2':[-0.5,0.5,-0.5,0.51,0,0.14], 'path-square-small-3':[-0.41,0.44,-0.56,0.53,0,0.2],
      'path-square-thin':[-0.77,0.79,-1,0.99,0,0.2], 'path-square-wide':[-1.02,1.03,-1,0.99,0,0.2], 'pebble-round-1':[-0.22,0.28,-0.16,0.22,0,0.09],
      'pebble-round-2':[-0.22,0.23,-0.22,0.19,0,0.1], 'pebble-round-3':[-0.23,0.22,-0.22,0.27,0,0.1], 'pebble-square-1':[-0.23,0.2,-0.2,0.24,0,0.22],
      'pebble-square-2':[-0.2,0.19,-0.12,0.16,0,0.14], 'pebble-square-3':[-0.19,0.2,-0.17,0.15,0,0.16], 'petal-1':[-0.26,0.2,-0.23,0.23,0,0.24],
      'petal-2':[-0.32,0.35,-0.33,0.3,0,0.24], 'petal-3':[-0.31,0.3,-0.27,0.33,0,0.19], 'plant-1':[-0.71,0.56,-0.76,0.62,0,0.98],
      'plant-1-big':[-0.87,0.94,-1.04,0.92,0,2.31], 'plant-7':[-0.45,0.6,-0.46,0.5,0.08,0.33], 'rock-1':[-1.73,1.5,-1.15,1.84,0,1.99],
      'rock-2':[-1.71,1.34,-1.16,1.33,0,1.85], 'rock-3':[-1.82,1.6,-0.89,2.6,0,1.99], 'tree-common-1':[-2.19,2.19,-2.35,2.35,0,7.02],
      'tree-common-2':[-2.24,2.24,-2.42,2.42,0,7.4], 'tree-common-3':[-2.08,2.08,-2.18,2.18,0,9.18], 'tree-common-5':[-1.91,1.91,-2.16,2.16,0,6.76],
      'tree-dead-1':[-3.52,3.52,-2.9,2.9,0,9.16], 'tree-pine-1':[-2.5,2.5,-2.48,2.48,0,7.08], 'tree-pine-2':[-2.89,2.89,-2.69,2.69,0,7.14],
      'tree-pine-3':[-2.11,2.11,-2.29,2.29,0,7.16], 'tree-pine-4':[-2.93,2.93,-2.95,2.95,0,10], 'tree-twisted-1':[-11.34,11.34,-6.73,6.73,0,16.52]
    },
    // Quaternius Cars Pack (scale 0.5), centred, front +z
    cars: {
      hatchback:[-0.82,0.82,-1.65,1.66,-0.03,1.12], police:[-0.89,0.89,-1.87,1.86,-0.02,1.22], sedan:[-0.9,0.9,-2.11,2.11,0.01,1.18],
      'sports-car':[-0.9,0.9,-1.98,1.98,-0.01,1.15], 'sports-car-2':[-0.94,0.94,-2.03,1.9,-0.02,1.19], suv:[-1.06,1.06,-2.1,2.1,-0.02,1.51],
      taxi:[-0.9,0.9,-2.01,2.21,-0.01,1.3]
    },
    // Quaternius Ultimate Furniture (scale 0.4), centred on the footprint
    homeware: {
      armchair:[-0.82,0.82,-0.72,0.72,0,1.36], 'bed-double':[-1.41,1.41,-2.13,2.13,0,1.56], 'bed-twin':[-1.03,1.03,-2.13,2.13,0,1.56],
      bookcase:[-0.92,0.92,-0.33,0.33,0,3.37], chair:[-0.25,0.25,-0.32,0.32,0,1.07], closet:[-0.78,0.78,-0.44,0.44,0,2.98],
      'closet-short':[-0.78,0.78,-0.45,0.45,0,2.27], desk:[-0.91,0.91,-0.42,0.42,0,0.92], 'door-1':[-0.87,0.87,-0.16,0.16,0,3.14],
      'door-2':[-0.8,0.8,-0.16,0.16,0,3.08], 'door-3':[-0.87,0.87,-0.16,0.16,0,3.14], 'night-stand':[-0.29,0.29,-0.25,0.25,0,0.51],
      'office-chair':[-0.36,0.36,-0.4,0.4,0,1.13], 'sofa-1':[-2.12,2.12,-0.89,0.89,0,1.51], 'sofa-2':[-2,2,-0.77,0.77,0,1.45],
      'sofa-corner':[-2,2,-1.4,1.4,0,1.45], stool:[-0.25,0.25,-0.27,0.27,0,0.58], 'table-1':[-0.71,0.71,-1.39,1.39,0,0.82],
      'table-2':[-0.71,0.71,-1.39,1.39,0,0.82]
    },
    // Quaternius Buildings Pack (scale 1), centred, front +z
    buildings: {
      'building-1-large':[-4,4,-1.37,1.37,0,4.67], 'building-1-small':[-1.87,1.87,-1.37,1.37,0,4.66], 'building-2-large':[-2.86,2.86,-1.11,1.11,0,5.92],
      'building-2-small':[-1.79,1.79,-1.24,1.24,0,4.97], 'building-3-big':[-2.35,2.35,-2.2,2.2,0,5.68], 'building-3-small':[-1.53,1.53,-2.2,2.2,0,5.68],
      'building-4':[-2.32,2.32,-1.93,1.93,0,5.49], 'house-1':[-1.28,1.28,-1.93,1.93,0,3.18], 'house-2':[-1.82,1.82,-1.54,1.54,0,2.93]
    },
    // Quaternius Ultimate Nature Pack (scale 1): the country beyond town (dress scatters it), trees symmetric
    wild: {
      'bush-1':[-0.66,0.66,-0.85,0.85,0,1.21], 'bush-2':[-0.67,0.67,-0.66,0.66,0,1.03], 'bush-berries':[-0.72,0.67,-0.86,0.86,0,1.24],
      flowers:[-0.36,0.13,-0.5,0.11,0,0.82], grass:[-0.2,0.18,-0.16,0.16,0,1], 'grass-short':[-0.19,0.13,-0.26,0.18,0,0.4],
      log:[-0.3,0.33,-1.5,1.17,0,0.75], 'plant-1':[-0.59,0.61,-0.37,0.57,0,0.48], 'plant-2':[-0.38,0.31,-0.35,0.34,0,1.77],
      'rock-1':[-0.24,0.24,-0.25,0.22,0,0.83], 'rock-2':[-0.28,0.28,-0.29,0.28,0,0.55], 'rock-3':[-0.46,0.28,-0.29,0.51,0,0.55],
      'rock-4':[-0.44,0.3,-0.63,0.63,0,0.51], 'rock-moss-1':[-0.18,0.3,-0.22,0.24,0,0.78], 'rock-moss-2':[-0.26,0.35,-0.36,0.29,0,0.55],
      stump:[-0.81,0.55,-0.45,0.58,0,0.62], 'tree-autumn-1':[-0.97,0.97,-1.6,1.6,0,2.44], 'tree-autumn-2':[-0.84,0.84,-1.6,1.6,0,3.07],
      'tree-birch-1':[-0.88,0.88,-1.91,1.91,0,3.57], 'tree-birch-2':[-0.74,0.74,-1.23,1.23,0,3.99], 'tree-birch-3':[-0.81,0.81,-1.13,1.13,0,4.02],
      'tree-common-1':[-0.97,0.97,-1.6,1.6,0,2.44], 'tree-common-2':[-0.84,0.84,-1.6,1.6,0,3.07], 'tree-common-3':[-0.7,0.7,-0.79,0.79,0,3.38],
      'tree-common-4':[-1.1,1.1,-1.12,1.12,0,2.67], 'tree-common-5':[-0.82,0.82,-1.41,1.41,0,2.48], 'tree-pine-1':[-1.02,1.02,-0.98,0.98,0,2.69],
      'tree-pine-2':[-0.98,0.98,-1.02,1.02,0,3.55], 'tree-pine-3':[-1.1,1.1,-1.01,1.01,0,3.31], 'tree-pine-4':[-0.73,0.73,-0.95,0.95,0,3.34],
      'tree-pine-5':[-0.79,0.79,-0.71,0.71,0,2.69], 'tree-willow-1':[-0.95,0.95,-1.87,1.87,0,2.83], 'tree-willow-2':[-1.08,1.08,-2.8,2.8,0,3.27]
    },
    // odds and ends from other Kenney kits (Mini Market, Mini Arcade, Factory Kit); all centred
    extras: {
      'cash-register':[-0.4,0.45,-0.4,0.45,0,0.59], 'display-bread':[-0.35,0.35,-0.3,0.3,0,0.5],
      'display-fruit':[-0.3,0.3,-0.3,0.3,0,0.52], freezer:[-0.4,0.4,-0.3,0.3,0,0.35],
      'freezers-standing':[-0.5,0.5,-0.5,0,0,0.9], 'machine-window':[-0.6,0.6,-0.75,0.75,0,1.29],
      'scanner-high':[-0.24,0.24,-0.89,0.88,0,1.27],
      'shelf-bags':[-0.4,0.4,-0.35,0.35,0,0.89], 'shelf-boxes':[-0.4,0.4,-0.35,0.35,0,0.85],
      'shopping-basket':[-0.17,0.18,-0.18,0.17,0,0.25], 'shopping-cart':[-0.15,0.15,-0.25,0.23,0,0.39],
      'ticket-machine':[-0.2,0.2,-0.16,0.24,0,0.92], 'vending-machine':[-0.25,0.25,-0.22,0.25,0,0.75]
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


  // ================================================================ dressing a room (browser only)
  // SO_ZONE_KIT.dress(api, opts) is called from a zone's setup(api), after the engine has built the props. It adds
  // what plain props cannot say: floors and ground with a pattern (textures drawn on canvases, so they work from
  // file://), a trim and a baseboard on the walls and their colour, the town seen over the walls (a ring painted
  // with buildings, hills or cranes), signs and pictures on the walls. SO_ZONE_KIT.tick(api) from update(api, dt)
  // turns the painted town to its night version after dark. Everything is made once per zone and kept.
  //   opts.floor: pattern name or { pattern, a, b } for the whole room; opts.floors: [{ pattern, rect: [x0, z0, x1, z1] }]
  //   opts.walls: { color, back, trim, base, scale }   (back: the other side; scale: height of the pieces, 1 = 1.29)
  //   opts.ground: { pattern, y, strips: [{ pattern, rect, dir: 'x' | 'z' }] }   (the land around the room)
  //   opts.mountains: { side: 'n' | 's' | 'w' | 'e', from, depth, width, height, seed, cx, cz }   (a range beyond the town;
  //     cx, cz move its middle off the centre)
  //   opts.sea: { side, from, beach, width, depth, cx, cz }   (the sea beyond the town, a strip of sand before it)
  //   opts.wild: { seed, rects: [[x0, z0, x1, z1], ...], avoid: [[x0, z0, x1, z1], ...], density }   (woods on the plains beyond town)
  //   opts.tower: { top, bottom, color }   (the building under a room that is not on the ground floor)
  //   opts.skyline: { kind: 'city' | 'suburb' | 'airport' | 'harbor', seed, r, y, h }
  //   opts.panels: [{ kind, wall: 'n' | 's' | 'w' | 'e', along, y, w, h, ... }] or with at: [x, z] and turn
  var BUILT = {}, TEX = {}, MATS = {};
  function rng(seed) { var s = (seed * 2654435761) >>> 0 || 7; return function () { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  function shade(hex, f) {        // f > 0 lighter, f < 0 darker
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    function c(v) { return Math.max(0, Math.min(255, Math.round(f > 0 ? v + (255 - v) * f : v * (1 + f)))); }
    return 'rgb(' + c(r) + ',' + c(g) + ',' + c(b) + ')';
  }
  function tex(api, key, w, h, draw) {
    if (TEX[key]) return TEX[key];
    var T = api.T, c = document.createElement('canvas');
    c.width = w; c.height = h;
    draw(c.getContext('2d'), w, h, rng(key.length * 131 + key.charCodeAt(0) * 7 + key.charCodeAt(key.length - 1)));
    var t = new T.CanvasTexture(c);
    t.colorSpace = T.SRGBColorSpace;
    t.wrapS = t.wrapT = T.RepeatWrapping;
    t.anisotropy = 8;
    return (TEX[key] = t);
  }
  function litMat(api, key, map, extra) {         // a material lit like the props (the engine's look), with a texture
    if (MATS[key]) return MATS[key];
    var m = api.toon('#ffffff').clone();
    m.map = map;
    for (var k in extra || {}) m[k] = extra[k];
    m.name = 'dress-' + key;
    return (MATS[key] = m);
  }
  function flatMat(api, key, map, extra) {        // unlit (signs, screens, the painted town)
    if (MATS[key]) return MATS[key];
    var o = { map: map };
    for (var k in extra || {}) o[k] = extra[k];
    var m = new api.T.MeshBasicMaterial(o);
    m.name = 'dress-' + key;
    return (MATS[key] = m);
  }
  // a horizontal rectangle x0..x1, z0..z1 at height y whose texture repeats every tile[0] (along x) by tile[1] (along z)
  function flat(api, rect, y, mat, tile, turn) {
    var T = api.T, w = rect[2] - rect[0], d = rect[3] - rect[1];
    var q = turn ? [d, w] : [w, d];
    var g = new T.PlaneGeometry(q[0], q[1]).rotateX(-Math.PI / 2);
    var uv = g.attributes.uv;
    for (var i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * q[0] / tile[0], uv.getY(i) * q[1] / tile[1]);
    if (turn) g.rotateY(Math.PI / 2);
    var m = new T.Mesh(g, mat);
    m.position.set((rect[0] + rect[2]) / 2, y, (rect[1] + rect[3]) / 2);
    m.receiveShadow = true;
    return m;
  }

  // the country beyond the town's edge (the city zone): the local -z of a piece is "away from town"; a side turns it
  function sideTurn(side) { return { n: 0, w: Math.PI / 2, s: Math.PI, e: -Math.PI / 2 }[side || 'n']; }
  function sidePlace(mesh, side, from) {       // the near edge of the piece `from` out of the centre, on that side
    var t = sideTurn(side);
    mesh.rotation.y = t;
    mesh.position.set(-Math.sin(t) * from, mesh.position.y, -Math.cos(t) * from);
    return mesh;
  }
  function shiftBy(mesh, o) {                    // o.cx, o.cz: the middle of the piece moved off the centre (a long town)
    mesh.position.x += o.cx || 0;
    mesh.position.z += o.cz || 0;
    return mesh;
  }
  // A range of mountains: a strip of triangles `width` long along the side and `depth` deep, foothills at the near
  // edge rising to a ridge of peaks (sums of bumps along the strip), coloured by height (forest, rock, snow) and flat
  // shaded. Lit like the props and dimmed after dark with the rest of the outside.
  function mountains(api, keep, o) {
    var T = api.T, W = o.width || 300, D = o.depth || 36, H = o.height || 16, r = rng(o.seed || 3);
    var nx = Math.round(W / 4), nz = Math.max(4, Math.round(D / 4));
    var peaks = [];
    for (var i = 0; i < Math.round(W / 14); i++) peaks.push([(r() - 0.5) * W, 0.45 + r() * 0.55, 8 + r() * 12]);   // x, height, half-width
    function h(x, v) {          // v: 0 at the near edge (the foothills) .. 1 at the far edge
      var s = 0;
      peaks.forEach(function (pk) { var d = (x - pk[0]) / pk[2]; s += pk[1] * Math.exp(-d * d); });
      var rise = v < 0.55 ? Math.pow(v / 0.55, 1.6) : 1 - 0.35 * (v - 0.55) / 0.45;       // up to the ridge, then a little down
      return H * Math.min(1.35, s) * rise * (0.85 + 0.15 * Math.sin(x * 0.7) * Math.sin(x * 0.23));
    }
    var pos = [], col = [], c = new T.Color(), low = new T.Color('#5f9250'), mid = new T.Color('#7f8a77'), top = new T.Color('#eef2f5');
    function vert(i, k) {
      var x = -W / 2 + i * W / nx, v = k / nz, z = -v * D, jit = (rng(i * 131 + k * 7)() - 0.5) * 1.6;
      return [x + jit, h(x, v), z + jit];
    }
    function paint(y) {
      var t = y / H;
      if (t < 0.45) c.copy(low).lerp(mid, t / 0.45); else if (t < 0.72) c.copy(mid); else c.copy(mid).lerp(top, Math.min(1, (t - 0.72) / 0.14));
      col.push(c.r, c.g, c.b);
    }
    for (var i2 = 0; i2 < nx; i2++) for (var k2 = 0; k2 < nz; k2++) {
      var a = vert(i2, k2), b = vert(i2 + 1, k2), d2 = vert(i2, k2 + 1), e = vert(i2 + 1, k2 + 1);
      [[a, b, e], [a, e, d2]].forEach(function (tri) {           // counter-clockwise seen from above: the faces look up
        tri.forEach(function (q) { pos.push(q[0], q[1], q[2]); });
        var y = (tri[0][1] + tri[1][1] + tri[2][1]) / 3;
        paint(y); paint(y); paint(y);
      });
    }
    var g = new T.BufferGeometry();
    g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
    g.setAttribute('color', new T.Float32BufferAttribute(col, 3));
    g.computeVertexNormals();
    var m = api.litMaterial({ color: new T.Color('#ffffff'), vertexColors: true });
    m.name = 'dress-mountains';
    (keep.outdoor = keep.outdoor || []).push(m);
    var mesh = new T.Mesh(g, m);
    mesh.position.y = -0.02;
    mesh.receiveShadow = true;
    mesh.name = 'mountains';
    return shiftBy(sidePlace(mesh, o.side, o.from || 36), o);
  }
  // The country beyond town: trees, bushes and rocks of the 'wild' pack (Quaternius Ultimate Nature) scattered over
  // rectangles nobody can walk to, as InstancedMesh per piece (a few draw calls for hundreds of trees). density is
  // pieces per 100 square units (default 4); avoid keeps corridors clear (the streets running out of town).
  var WILD = [['tree-common-1', 5], ['tree-common-2', 5], ['tree-common-3', 4], ['tree-common-4', 4], ['tree-common-5', 4],
    ['tree-autumn-1', 2], ['tree-autumn-2', 2], ['tree-pine-1', 4], ['tree-pine-2', 4], ['tree-pine-3', 3], ['tree-pine-4', 3], ['tree-pine-5', 3],
    ['tree-birch-1', 3], ['tree-birch-2', 2], ['tree-birch-3', 2], ['tree-willow-1', 1], ['tree-willow-2', 1],
    ['bush-1', 6], ['bush-2', 6], ['bush-berries', 3], ['rock-1', 2], ['rock-2', 2], ['rock-3', 1], ['rock-4', 1], ['rock-moss-1', 2], ['rock-moss-2', 1],
    ['stump', 1], ['log', 1], ['plant-1', 3], ['plant-2', 3], ['flowers', 3], ['grass', 4], ['grass-short', 4]];
  function wild(api, keep, o) {
    var T = api.T, g = new T.Group(), r = rng(o.seed || 5), density = o.density || 4;
    g.name = 'dress-wild';
    var total = 0;
    WILD.forEach(function (k) { total += k[1]; });
    var spots = {};
    (o.rects || []).forEach(function (rc) {
      var n = Math.round((rc[2] - rc[0]) * (rc[3] - rc[1]) * density / 100);
      for (var i = 0; i < n; i++) {
        var x = rc[0] + r() * (rc[2] - rc[0]), z = rc[1] + r() * (rc[3] - rc[1]);
        if ((o.avoid || []).some(function (a) { return x > a[0] && x < a[2] && z > a[1] && z < a[3]; })) continue;
        var pick = r() * total, name = WILD[0][0];
        for (var j = 0; j < WILD.length; j++) { pick -= WILD[j][1]; if (pick <= 0) { name = WILD[j][0]; break; } }
        (spots[name] = spots[name] || []).push([x, z, r() * Math.PI * 2, 0.85 + r() * 0.4]);
      }
    });
    api.loadPack('wild').then(function () {
      if (!api.packReady('wild')) return;
      var m4 = new T.Matrix4(), pos = new T.Vector3(), q = new T.Quaternion(), up = new T.Vector3(0, 1, 0), sc = new T.Vector3();
      Object.keys(spots).forEach(function (name) {
        var node = api.packNode('wild', name), list = spots[name];
        if (!node) return;
        node.updateMatrixWorld(true);
        node.traverse(function (mesh) {
          if (!mesh.isMesh) return;
          var im = new T.InstancedMesh(mesh.geometry, mesh.material, list.length);
          list.forEach(function (sp, i) {
            q.setFromAxisAngle(up, sp[2]);
            sc.setScalar(sp[3]);
            m4.compose(pos.set(sp[0], -0.03, sp[1]), q, sc).multiply(mesh.matrixWorld);
            im.setMatrixAt(i, m4);
          });
          im.instanceMatrix.needsUpdate = true;
          im.castShadow = true;
          im.receiveShadow = true;
          im.frustumCulled = false;
          im.name = 'wild-' + name;
          g.add(im);
        });
      });
    });
    return g;
  }

  // the sea: water out to the horizon (fog takes it), a strip of sand between the grass and the water
  function sea(api, keep, o) {
    var T = api.T, W = o.width || 320, D = o.depth || 130, beach = o.beach == null ? 3 : o.beach;
    var grp = new T.Group();
    grp.name = 'sea';
    var wt = patternTex(api, { pattern: 'water', a: '#4a8fbf' });
    grp.add(flat(api, [-W / 2, -D, W / 2, -beach], 0.006, outMat(api, keep, wt), wt.tile));
    if (beach > 0) {
      var st = patternTex(api, 'sand');
      grp.add(flat(api, [-W / 2, -beach, W / 2, 0], 0.005, outMat(api, keep, st), st.tile));
      var foam = flat(api, [-W / 2, -beach - 0.5, W / 2, -beach + 0.1], 0.007, flatMat(api, 'foam', null, { color: new T.Color('#dbeaf2'), transparent: true, opacity: 0.55 }), [1, 1]);
      grp.add(foam);
    }
    return shiftBy(sidePlace(grp, o.side, o.from || 31), o);
  }

  // ---------- patterns: [tile size in game units along u, along v, canvas w, h, draw]
  function noise(g, w, h, r, n, cols, size) {
    for (var i = 0; i < n; i++) { g.fillStyle = cols[Math.floor(r() * cols.length)]; var s = size * (0.5 + r()); g.fillRect(r() * w, r() * h, s, s); }
  }
  var PATTERNS = {
    carpet: [0.8, 0.8, 256, 256, function (g, w, h, r, o) {           // carpet tiles laid in quarter turns
      var a = o.a || '#8a94a2';
      for (var i = 0; i < 2; i++) for (var j = 0; j < 2; j++) {
        var x = i * 128, y = j * 128;
        g.fillStyle = shade(a, (r() - 0.5) * 0.06); g.fillRect(x, y, 128, 128);
        g.strokeStyle = 'rgba(0,0,0,0.07)'; g.lineWidth = 1.5;
        for (var k = 3; k < 128; k += 5) { g.beginPath(); if ((i + j) % 2) { g.moveTo(x + k, y); g.lineTo(x + k, y + 128); } else { g.moveTo(x, y + k); g.lineTo(x + 128, y + k); } g.stroke(); }
        g.strokeStyle = 'rgba(0,0,0,0.12)'; g.lineWidth = 1; g.strokeRect(x + 0.5, y + 0.5, 127, 127);
      }
      noise(g, w, h, r, 900, ['rgba(255,255,255,0.10)', 'rgba(0,0,0,0.10)', 'rgba(60,80,120,0.12)'], 1.6);
    }],
    wood: [1.2, 1.2, 512, 512, function (g, w, h, r, o) {             // planks along x
      var a = o.a || '#c89a6a', rows = 7, rh = h / rows;
      for (var k = 0; k < rows; k++) {
        var x = -r() * 300;
        while (x < w) {
          var len = 160 + r() * 260;
          g.fillStyle = shade(a, (r() - 0.5) * 0.14); g.fillRect(x, k * rh, len, rh);
          g.strokeStyle = 'rgba(90,50,20,0.16)'; g.lineWidth = 1;
          for (var q = 0; q < 4; q++) {
            var yy = k * rh + 3 + r() * (rh - 6);
            g.beginPath(); g.moveTo(x, yy); g.bezierCurveTo(x + len * 0.3, yy + (r() - 0.5) * 6, x + len * 0.7, yy + (r() - 0.5) * 6, x + len, yy); g.stroke();
          }
          g.fillStyle = 'rgba(60,35,15,0.45)'; g.fillRect(x, k * rh, 2, rh);
          x += len;
        }
        g.fillStyle = 'rgba(60,35,15,0.35)'; g.fillRect(0, k * rh, w, 2);
      }
    }],
    check: [0.5, 0.5, 128, 128, function (g, w, h, r, o) {            // diner checkerboard
      var a = o.a || '#f1ece0', b = o.b || '#2f3440';
      g.fillStyle = a; g.fillRect(0, 0, w, h);
      g.fillStyle = b; g.fillRect(0, 0, 64, 64); g.fillRect(64, 64, 64, 64);
      noise(g, w, h, r, 160, ['rgba(255,255,255,0.08)', 'rgba(0,0,0,0.06)'], 1.5);
      g.strokeStyle = 'rgba(0,0,0,0.15)'; g.strokeRect(0.5, 0.5, 127, 127); g.strokeRect(64.5, 0.5, 0, 127);
    }],
    tile: [1.0, 1.0, 256, 256, function (g, w, h, r, o) {             // big shop floor tiles with grout
      var a = o.a || '#ebe9e2';
      g.fillStyle = o.b || '#c9c4b8'; g.fillRect(0, 0, w, h);
      for (var i = 0; i < 2; i++) for (var j = 0; j < 2; j++) {
        g.fillStyle = shade(a, (r() - 0.5) * 0.05); g.fillRect(i * 128 + 2, j * 128 + 2, 124, 124);
      }
      noise(g, w, h, r, 500, ['rgba(0,0,0,0.05)', 'rgba(120,110,90,0.08)', 'rgba(255,255,255,0.2)'], 1.8);
    }],
    gloss: [2.0, 2.0, 256, 256, function (g, w, h, r, o) {            // polished terrazzo with a sheen
      var a = o.a || '#dcdfe4';
      for (var i = 0; i < 2; i++) for (var j = 0; j < 2; j++) {
        g.fillStyle = shade(a, (r() - 0.5) * 0.04); g.fillRect(i * 128, j * 128, 128, 128);
      }
      noise(g, w, h, r, 2200, ['rgba(80,90,110,0.18)', 'rgba(255,255,255,0.5)', 'rgba(150,130,110,0.15)', 'rgba(40,50,70,0.12)'], 1.4);
      var s = g.createLinearGradient(0, 0, w, h);
      s.addColorStop(0, 'rgba(255,255,255,0)'); s.addColorStop(0.45, 'rgba(255,255,255,0.16)'); s.addColorStop(0.55, 'rgba(255,255,255,0.16)'); s.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = s; g.fillRect(0, 0, w, h);
      g.strokeStyle = 'rgba(90,100,120,0.35)'; g.lineWidth = 1.5;
      g.strokeRect(0.5, 0.5, 255, 255); g.beginPath(); g.moveTo(128, 0); g.lineTo(128, 256); g.moveTo(0, 128); g.lineTo(256, 128); g.stroke();
    }],
    hotel: [1.0, 1.0, 256, 256, function (g, w, h, r, o) {            // hotel carpet: diamonds and dots
      var a = o.a || '#7c2f3a', b = o.b || '#c9a25a';
      g.fillStyle = a; g.fillRect(0, 0, w, h);
      noise(g, w, h, r, 1200, ['rgba(0,0,0,0.10)', 'rgba(255,255,255,0.05)'], 1.5);
      g.strokeStyle = b; g.globalAlpha = 0.6; g.lineWidth = 3;
      g.beginPath(); g.moveTo(0, 128); g.lineTo(128, 0); g.lineTo(256, 128); g.lineTo(128, 256); g.closePath(); g.stroke();
      g.beginPath(); g.moveTo(0, 0); g.lineTo(0, 0); g.stroke();
      g.globalAlpha = 0.8; g.fillStyle = b;
      [[128, 128], [0, 0], [256, 0], [0, 256], [256, 256]].forEach(function (p) { g.beginPath(); g.arc(p[0], p[1], 12, 0, 7); g.fill(); });
      g.fillStyle = a; [[128, 128], [0, 0], [256, 0], [0, 256], [256, 256]].forEach(function (p) { g.beginPath(); g.arc(p[0], p[1], 6, 0, 7); g.fill(); });
      g.globalAlpha = 1;
    }],
    marble: [1.2, 1.2, 256, 256, function (g, w, h, r, o) {           // cream marble tiles with veins
      var a = o.a || '#ece3d3';
      for (var i = 0; i < 2; i++) for (var j = 0; j < 2; j++) {
        g.fillStyle = shade(a, (r() - 0.5) * 0.05); g.fillRect(i * 128, j * 128, 128, 128);
        g.strokeStyle = 'rgba(120,105,90,0.22)'; g.lineWidth = 1.2;
        for (var v = 0; v < 3; v++) {
          g.beginPath(); var x = i * 128 + r() * 128, y = j * 128;
          g.moveTo(x, y); g.bezierCurveTo(x + (r() - 0.5) * 90, y + 40, x + (r() - 0.5) * 90, y + 90, x + (r() - 0.5) * 60, y + 128); g.stroke();
        }
      }
      g.strokeStyle = 'rgba(110,95,80,0.35)'; g.lineWidth = 1.5;
      g.strokeRect(0.5, 0.5, 255, 255); g.beginPath(); g.moveTo(128, 0); g.lineTo(128, 256); g.moveTo(0, 128); g.lineTo(256, 128); g.stroke();
    }],
    concrete: [2.4, 2.4, 256, 256, function (g, w, h, r, o) {         // polished concrete
      g.fillStyle = o.a || '#c7c9c8'; g.fillRect(0, 0, w, h);
      for (var i = 0; i < 40; i++) { g.fillStyle = 'rgba(' + (r() < 0.5 ? '255,255,255' : '60,60,60') + ',0.025)'; g.beginPath(); g.arc(r() * w, r() * h, 10 + r() * 40, 0, 7); g.fill(); }
      noise(g, w, h, r, 900, ['rgba(0,0,0,0.08)', 'rgba(255,255,255,0.12)'], 1.3);
      g.fillStyle = 'rgba(0,0,0,0.18)'; g.fillRect(0, 0, w, 1.5); g.fillRect(0, 0, 1.5, h);
    }],
    // ----- outside
    grass: [3, 3, 256, 256, function (g, w, h, r, o) {
      g.fillStyle = o.a || '#80ad5f'; g.fillRect(0, 0, w, h);
      for (var i = 0; i < 70; i++) { g.fillStyle = r() < 0.5 ? 'rgba(40,90,30,0.10)' : 'rgba(200,230,140,0.10)'; g.beginPath(); g.arc(r() * w, r() * h, 8 + r() * 26, 0, 7); g.fill(); }
      noise(g, w, h, r, 1400, ['rgba(40,80,20,0.25)', 'rgba(210,235,150,0.25)'], 1.6);
    }],
    asphalt: [3, 3, 256, 256, function (g, w, h, r, o) {
      g.fillStyle = o.a || '#62666d'; g.fillRect(0, 0, w, h);
      noise(g, w, h, r, 2500, ['rgba(0,0,0,0.18)', 'rgba(255,255,255,0.10)', 'rgba(120,110,100,0.2)'], 1.4);
    }],
    sidewalk: [1.6, 1.6, 256, 256, function (g, w, h, r, o) {
      for (var i = 0; i < 2; i++) for (var j = 0; j < 2; j++) { g.fillStyle = shade(o.a || '#c9c6bf', (r() - 0.5) * 0.06); g.fillRect(i * 128, j * 128, 128, 128); }
      noise(g, w, h, r, 1200, ['rgba(0,0,0,0.08)', 'rgba(255,255,255,0.15)'], 1.4);
      g.fillStyle = 'rgba(70,65,60,0.35)'; g.fillRect(0, 0, w, 2); g.fillRect(0, 128, w, 2); g.fillRect(0, 0, 2, h); g.fillRect(128, 0, 2, h);
    }],
    road: [4, 0, 512, 256, function (g, w, h, r, o) {                 // u along the road, v across it (the whole width)
      g.fillStyle = o.a || '#5b5f66'; g.fillRect(0, 0, w, h);
      noise(g, w, h, r, 3000, ['rgba(0,0,0,0.15)', 'rgba(255,255,255,0.08)'], 1.5);
      g.fillStyle = '#e8e6df'; g.fillRect(0, 10, w, 5); g.fillRect(0, h - 15, w, 5);
      g.fillStyle = '#e9c24a'; g.fillRect(0, h / 2 - 7, w, 4); g.fillRect(0, h / 2 + 3, w, 4);
    }],
    lot: [1.3, 0, 128, 256, function (g, w, h, r, o) {               // one parking stall: u along the row, v the stall's depth
      g.fillStyle = o.a || '#62666d'; g.fillRect(0, 0, w, h);
      noise(g, w, h, r, 700, ['rgba(0,0,0,0.15)', 'rgba(255,255,255,0.08)'], 1.4);
      g.fillStyle = '#eceae3'; g.fillRect(0, 0, 4, h * 0.8);
    }],
    runway: [8, 0, 512, 256, function (g, w, h, r, o) {
      g.fillStyle = '#50545b'; g.fillRect(0, 0, w, h);
      noise(g, w, h, r, 3000, ['rgba(0,0,0,0.15)', 'rgba(255,255,255,0.08)'], 1.5);
      g.fillStyle = '#f2f2ee'; g.fillRect(0, 14, w, 6); g.fillRect(0, h - 20, w, 6); g.fillRect(0, h / 2 - 4, w * 0.45, 8);
      g.fillStyle = 'rgba(40,40,40,0.25)'; for (var i = 0; i < 6; i++) g.fillRect(r() * w, h * 0.3 + r() * h * 0.4, 60 + r() * 120, 6);
    }],
    taxiway: [3, 0, 256, 256, function (g, w, h, r, o) {
      g.fillStyle = '#6a6e74'; g.fillRect(0, 0, w, h);
      noise(g, w, h, r, 1500, ['rgba(0,0,0,0.15)', 'rgba(255,255,255,0.08)'], 1.5);
      g.fillStyle = '#f0c030'; g.fillRect(0, h / 2 - 3, w, 6);
    }],
    water: [5, 5, 256, 256, function (g, w, h, r, o) {
      g.fillStyle = o.a || '#4a86ad'; g.fillRect(0, 0, w, h);
      g.strokeStyle = 'rgba(255,255,255,0.28)'; g.lineWidth = 2;
      for (var i = 0; i < 40; i++) { var x = r() * w, y = r() * h, l = 10 + r() * 24; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + l / 2, y - 4, x + l, y); g.stroke(); }
      noise(g, w, h, r, 600, ['rgba(0,30,60,0.15)', 'rgba(255,255,255,0.08)'], 2);
    }],
    sand: [3, 3, 256, 256, function (g, w, h, r, o) {
      g.fillStyle = o.a || '#e3d3a6'; g.fillRect(0, 0, w, h);
      noise(g, w, h, r, 2200, ['rgba(120,90,40,0.12)', 'rgba(255,250,230,0.25)', 'rgba(180,150,90,0.15)'], 1.5);
    }],
    gravel: [2, 2, 256, 256, function (g, w, h, r, o) {
      g.fillStyle = o.a || '#a8a39a'; g.fillRect(0, 0, w, h);
      noise(g, w, h, r, 4000, ['rgba(0,0,0,0.18)', 'rgba(255,255,255,0.2)', 'rgba(120,100,80,0.2)'], 1.8);
    }],
    facade: [1.2, 1.1, 128, 128, function (g, w, h, r, o) {          // a wall with one window (the floors under an office)
      g.fillStyle = o.a || '#b9c2cc'; g.fillRect(0, 0, w, h);
      g.fillStyle = o.b || '#51667e'; g.fillRect(14, 24, 100, 70);
      g.fillStyle = 'rgba(255,255,255,0.22)'; g.beginPath(); g.moveTo(14, 94); g.lineTo(60, 24); g.lineTo(84, 24); g.lineTo(38, 94); g.fill();
      g.fillStyle = 'rgba(0,0,0,0.18)'; g.fillRect(0, 118, w, 10);
    }]
  };
  function patternTex(api, p) {
    if (typeof p === 'string') p = { pattern: p };
    var P = PATTERNS[p.pattern];
    if (!P) return null;
    var key = 'pat:' + p.pattern + ':' + (p.a || '') + ':' + (p.b || '');
    return { t: tex(api, key, P[2], P[3], function (g, w, h, r) { P[4](g, w, h, r, p); }), tile: [p.tile || P[0], P[1]], key: key };
  }

  // ---------- the town over the walls: a ring painted with a skyline (transparent sky), day and night
  function drawSkyline(kind, night, seed) {
    return function (g, w, h) {
      var r = rng(seed), H = h;
      function win(x, y, bw, bh, lit, dark) {           // a grid of windows on a building face
        for (var yy = y + 8; yy < H - 10; yy += 14) for (var xx = x + 5; xx < x + bw - 8; xx += 11) {
          g.fillStyle = night ? (r() < 0.35 ? lit : dark) : (r() < 0.2 ? lit : dark);
          g.fillRect(xx, yy, 6, 8);
        }
      }
      function box(x, bw, bh, col) { g.fillStyle = col; g.fillRect(x, H - bh, bw, bh); if (x + bw > w) g.fillRect(x - w, H - bh, bw, bh); }
      if (kind === 'suburb') {
        g.fillStyle = night ? '#1d2a33' : '#a9c49a';                              // far hills
        g.beginPath(); g.moveTo(0, H);
        for (var x = 0; x <= w; x += 8) g.lineTo(x, H - 150 - 40 * Math.sin(x / w * Math.PI * 6) - 25 * Math.sin(x / w * Math.PI * 14 + 1));
        g.lineTo(w, H); g.fill();
        for (var i = 0; i < 70; i++) {                                              // trees
          var tx = r() * w, ts = 18 + r() * 26;
          g.fillStyle = night ? '#16241b' : ['#5f8f4f', '#6f9c56', '#557f47'][i % 3];
          g.beginPath(); g.arc(tx, H - 70 - r() * 40, ts, 0, 7); g.arc(tx + ts * 0.7, H - 60 - r() * 30, ts * 0.8, 0, 7); g.fill();
        }
        for (var k = 0; k < 16; k++) {                                              // houses with gable roofs
          var hx = (k + r() * 0.5) * w / 16, hw = 60 + r() * 50, hh = 40 + r() * 30;
          g.fillStyle = night ? '#2a3140' : ['#e9dcc6', '#d8e2ea', '#f0d9c0', '#dfe6d4', '#e8cfcf'][k % 5];
          g.fillRect(hx, H - hh, hw, hh);
          g.fillStyle = night ? '#1b1f2a' : ['#8a5a4a', '#5f6b7a', '#7a4f3d'][k % 3];
          g.beginPath(); g.moveTo(hx - 6, H - hh); g.lineTo(hx + hw / 2, H - hh - 28 - r() * 10); g.lineTo(hx + hw + 6, H - hh); g.fill();
          g.fillStyle = night ? (r() < 0.6 ? '#ffd47a' : '#384055') : '#8fb0c8';
          g.fillRect(hx + 10, H - hh + 12, 12, 12); g.fillRect(hx + hw - 22, H - hh + 12, 12, 12);
        }
        return;
      }
      if (kind === 'airport') {
        g.fillStyle = night ? '#1b2433' : '#b9c7cf';                                // far hills
        g.beginPath(); g.moveTo(0, H);
        for (var x2 = 0; x2 <= w; x2 += 8) g.lineTo(x2, H - 90 - 30 * Math.sin(x2 / w * Math.PI * 4) - 12 * Math.sin(x2 / w * Math.PI * 18));
        g.lineTo(w, H); g.fill();
        for (var hk = 0; hk < 5; hk++) {                                            // hangars
          var ax = hk * w / 5 + r() * 120, aw = 150 + r() * 60, ah = 50 + r() * 20;
          g.fillStyle = night ? '#2b3242' : '#d5d9de';
          g.fillRect(ax, H - ah, aw, ah);
          g.beginPath(); g.ellipse(ax + aw / 2, H - ah, aw / 2, 22, 0, Math.PI, 0); g.fill();
          g.fillStyle = night ? '#1d222d' : '#9aa3ad'; g.fillRect(ax + 20, H - ah + 12, aw - 40, ah - 12);
        }
        var cx = w * 0.62;                                                          // control tower
        g.fillStyle = night ? '#2f3646' : '#e3e5e8'; g.fillRect(cx, H - 230, 26, 230);
        g.fillStyle = night ? '#3a4254' : '#cfd4da'; g.fillRect(cx - 18, H - 262, 62, 32);
        g.fillStyle = night ? '#9fe0ff' : '#5f7f99'; g.fillRect(cx - 14, H - 256, 54, 18);
        g.fillStyle = night ? '#ff5050' : '#b0b6bd'; g.fillRect(cx + 11, H - 280, 4, 18);
        for (var tl = 0; tl < 6; tl++) {                                            // tails of parked planes
          var px = r() * w;
          g.fillStyle = night ? '#394157' : '#f4f5f6'; g.beginPath(); g.moveTo(px, H - 30); g.lineTo(px + 26, H - 90); g.lineTo(px + 44, H - 90); g.lineTo(px + 40, H - 30); g.fill();
          g.fillStyle = ['#2f6fb3', '#d4513c', '#2e8f7a'][tl % 3]; g.fillRect(px + 24, H - 86, 18, 16);
        }
        return;
      }
      // city, downtown, harbor: two rows of towers (far pale, near with windows)
      var far = night ? '#232c45' : (kind === 'harbor' ? '#b8c6d4' : '#afbdcc');
      for (var f = 0; f < 38; f++) {
        var fx = r() * w, fw = 40 + r() * 70, fh = (kind === 'downtown' ? 180 : 110) + r() * (kind === 'downtown' ? 250 : 170);
        box(fx, fw, fh, far);
        if (r() < 0.3) { g.fillStyle = far; g.fillRect(fx + fw / 2 - 1, H - fh - 26, 3, 26); }
      }
      var nearCols = night ? ['#161c2e', '#1b2236', '#20263a'] : ['#8c9bb0', '#9aa6b6', '#7f8fa6', '#a39c93', '#b2a89b'];
      for (var n = 0; n < 22; n++) {
        var nx = r() * w, nw = 60 + r() * 90, nh = (kind === 'downtown' ? 120 : 70) + r() * (kind === 'downtown' ? 260 : 150);
        if (kind === 'harbor') nh *= 0.6;
        var col = nearCols[n % nearCols.length];
        box(nx, nw, nh, col);
        g.save(); g.beginPath(); g.rect(nx, H - nh, nw, nh); g.clip();
        for (var yy = H - nh + 10; yy < H - 12; yy += 16) for (var xx = nx + 6; xx < nx + nw - 8; xx += 12) {
          g.fillStyle = night ? (r() < 0.4 ? '#ffd98a' : 'rgba(40,50,70,0.9)') : (r() < 0.25 ? 'rgba(255,255,255,0.35)' : 'rgba(40,60,90,0.28)');
          g.fillRect(xx, yy, 7, 9);
        }
        g.restore();
      }
      if (kind === 'harbor') {                                                      // cranes and a far shore
        for (var c = 0; c < 4; c++) {
          var kx = w * (0.1 + c * 0.25) + r() * 60;
          g.strokeStyle = night ? '#3a2f2f' : '#c9553d'; g.lineWidth = 6;
          g.beginPath(); g.moveTo(kx, H); g.lineTo(kx, H - 170); g.lineTo(kx + 120, H - 170); g.moveTo(kx - 40, H - 170); g.lineTo(kx, H - 170);
          g.moveTo(kx + 20, H); g.lineTo(kx + 20, H - 170); g.stroke();
          g.lineWidth = 2; g.beginPath(); g.moveTo(kx + 90, H - 170); g.lineTo(kx + 90, H - 110); g.stroke();
        }
      }
    };
  }

  // ---------- panels: signs, pictures, screens, doors drawn on a canvas
  function fitText(g, text, maxW, px, weight, family) {
    var s = px;
    do { g.font = (weight || 'bold') + ' ' + s + 'px ' + (family || '"Trebuchet MS", "Segoe UI", Arial, sans-serif'); s -= 2; } while (g.measureText(text).width > maxW && s > 8);
  }
  var PANELS = {
    sign: function (g, w, h, r, o) {                  // company or shop sign
      g.fillStyle = o.bg || '#1f3a4d'; g.fillRect(0, 0, w, h);
      if (o.border !== false) { g.strokeStyle = o.border || 'rgba(255,255,255,0.5)'; g.lineWidth = h * 0.05; g.strokeRect(h * 0.08, h * 0.08, w - h * 0.16, h - h * 0.16); }
      var x = w / 2;
      if (o.logo) {                                   // a simple round mark left of the name
        g.fillStyle = o.logo; g.beginPath(); g.arc(h * 0.55, h / 2, h * 0.3, 0, 7); g.fill();
        g.fillStyle = o.bg || '#1f3a4d'; g.beginPath(); g.moveTo(h * 0.33, h * 0.62); g.lineTo(h * 0.5, h * 0.38); g.lineTo(h * 0.6, h * 0.52); g.lineTo(h * 0.68, h * 0.42); g.lineTo(h * 0.78, h * 0.62); g.fill();
        x = h * 0.95 + (w - h * 0.95) / 2;
      }
      var maxW = (o.logo ? w - h * 1.1 : w - h * 0.4);
      g.fillStyle = o.fg || '#ffffff'; g.textAlign = 'center'; g.textBaseline = 'middle';
      fitText(g, o.text, maxW, Math.round(h * (o.sub ? 0.46 : 0.58)), 'bold', o.font);
      g.fillText(o.text, x, h * (o.sub ? 0.4 : 0.53));
      if (o.sub) { fitText(g, o.sub, maxW, Math.round(h * 0.2), 'normal', o.font); g.globalAlpha = 0.85; g.fillText(o.sub, x, h * 0.76); g.globalAlpha = 1; }
    },
    lightbox: function (g, w, h, r, o) {              // airport sign: dark with a yellow arrow or letter box
      g.fillStyle = o.bg || '#1d2b3f'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#f2c230'; g.fillRect(h * 0.12, h * 0.15, h * 0.7, h * 0.7);
      g.fillStyle = '#1d2b3f'; g.textAlign = 'center'; g.textBaseline = 'middle';
      fitText(g, o.mark || '→', h * 0.6, Math.round(h * 0.55)); g.fillText(o.mark || '→', h * 0.47, h * 0.53);
      g.fillStyle = '#ffffff'; g.textAlign = 'left';
      fitText(g, o.text, w - h * 1.2, Math.round(h * 0.46)); g.fillText(o.text, h * 1.0, h * (o.sub ? 0.4 : 0.53));
      if (o.sub) { g.fillStyle = '#b9c6d8'; fitText(g, o.sub, w - h * 1.2, Math.round(h * 0.22), 'normal'); g.fillText(o.sub, h * 1.0, h * 0.77); }
    },
    flights: function (g, w, h, r, o) {               // departures board
      g.fillStyle = '#0d1624'; g.fillRect(0, 0, w, h);
      var rows = o.rows || [], lh = h / (rows.length + 2.2), cols = [0.03, 0.19, 0.53, 0.68, 0.8];
      g.fillStyle = '#23406a'; g.fillRect(0, 0, w, lh);
      g.fillStyle = '#ffffff'; g.textBaseline = 'middle'; g.textAlign = 'left';
      fitText(g, o.title || 'DEPARTURES', w * 0.6, Math.round(lh * 0.62)); g.fillText(o.title || 'DEPARTURES', w * 0.03, lh * 0.52);
      g.textAlign = 'right'; g.fillText(o.clock || '', w * 0.97, lh * 0.52); g.textAlign = 'left';
      g.font = 'bold ' + Math.round(lh * 0.36) + 'px "Courier New", monospace'; g.fillStyle = '#9fb4cf';
      ['TIME', 'DESTINATION', 'FLIGHT', 'GATE', 'STATUS'].forEach(function (t, i) { g.fillText(t, w * cols[i], lh * 1.5); });
      rows.forEach(function (row, k) {
        var y = lh * (2.6 + k);
        if (k % 2) { g.fillStyle = 'rgba(255,255,255,0.06)'; g.fillRect(0, y - lh / 2, w, lh); }
        g.font = 'bold ' + Math.round(lh * 0.5) + 'px "Courier New", monospace';
        row.forEach(function (t, i) {
          g.fillStyle = i === 4 ? (/DELAY|CANCEL|FULL/.test(t) ? '#ff7a5c' : /BOARD/.test(t) ? '#7de38f' : '#f5d36a') : '#f4f1e6';
          g.fillText(t, w * cols[i], y);
        });
      });
    },
    menu: function (g, w, h, r, o) {                  // diner menu board (chalk)
      g.fillStyle = '#2d332f'; g.fillRect(0, 0, w, h);
      g.strokeStyle = '#a0764a'; g.lineWidth = h * 0.04; g.strokeRect(0, 0, w, h);
      g.fillStyle = '#f7e7a8'; g.textAlign = 'center'; g.textBaseline = 'middle';
      fitText(g, o.text || 'MENU', w * 0.8, Math.round(h * 0.13), 'bold', '"Comic Sans MS", "Trebuchet MS", sans-serif'); g.fillText(o.text || 'MENU', w / 2, h * 0.13);
      var items = o.items || [], lh = (h * 0.78) / Math.max(1, items.length);
      items.forEach(function (it, k) {
        var y = h * 0.28 + lh * k;
        g.fillStyle = '#f2f0ea'; g.textAlign = 'left'; fitText(g, it[0], w * 0.62, Math.round(lh * 0.55), 'normal', '"Comic Sans MS", "Trebuchet MS", sans-serif'); g.fillText(it[0], w * 0.08, y);
        g.fillStyle = '#ffc56b'; g.textAlign = 'right'; g.fillText(it[1], w * 0.92, y);
      });
    },
    art: function (g, w, h, r, o) {                   // abstract print: blocks and circles
      var pal = o.palette || ['#e76f51', '#f4a261', '#e9c46a', '#2a9d8f', '#264653'];
      g.fillStyle = o.bg || '#f4efe6'; g.fillRect(0, 0, w, h);
      for (var i = 0; i < 7; i++) {
        g.fillStyle = pal[i % pal.length]; g.globalAlpha = 0.85;
        if (r() < 0.5) { g.beginPath(); g.arc(r() * w, r() * h, (0.1 + r() * 0.25) * Math.min(w, h), 0, 7); g.fill(); }
        else g.fillRect(r() * w * 0.8, r() * h * 0.8, (0.15 + r() * 0.4) * w, (0.1 + r() * 0.3) * h);
      }
      g.globalAlpha = 1;
    },
    photo: function (g, w, h, r, o) {                 // landscape: sky, hills, lake
      var s = g.createLinearGradient(0, 0, 0, h * 0.6); s.addColorStop(0, o.sky || '#7fb6e0'); s.addColorStop(1, '#f6d9b0');
      g.fillStyle = s; g.fillRect(0, 0, w, h);
      g.fillStyle = '#fff1c7'; g.beginPath(); g.arc(w * 0.72, h * 0.3, h * 0.09, 0, 7); g.fill();
      g.fillStyle = '#7c8fa8'; g.beginPath(); g.moveTo(0, h * 0.6); g.lineTo(w * 0.25, h * 0.28); g.lineTo(w * 0.45, h * 0.5); g.lineTo(w * 0.62, h * 0.35); g.lineTo(w, h * 0.6); g.fill();
      g.fillStyle = '#5f8a57'; g.fillRect(0, h * 0.6, w, h * 0.4);
      g.fillStyle = '#5d9cc4'; g.beginPath(); g.ellipse(w * 0.5, h * 0.8, w * 0.35, h * 0.1, 0, 0, 7); g.fill();
    },
    board: function (g, w, h, r, o) {                 // whiteboard with sticky notes and a chart
      g.fillStyle = '#fbfbf8'; g.fillRect(0, 0, w, h);
      g.strokeStyle = '#9aa3ad'; g.lineWidth = h * 0.03; g.strokeRect(0, 0, w, h);
      g.fillStyle = '#2d4a7a'; g.textAlign = 'left'; g.textBaseline = 'top';
      fitText(g, o.text || 'Sprint 14', w * 0.5, Math.round(h * 0.1), 'bold'); g.fillText(o.text || 'Sprint 14', w * 0.05, h * 0.06);
      ['TO DO', 'DOING', 'DONE'].forEach(function (c, i) {
        var x = w * (0.05 + i * 0.19);
        g.fillStyle = '#556'; g.font = 'bold ' + Math.round(h * 0.06) + 'px Arial'; g.fillText(c, x, h * 0.22);
        for (var k = 0; k < 3 - (i === 2 ? 0 : i); k++) { g.fillStyle = ['#ffe27a', '#9ee6b0', '#ffb3c1', '#a6d4ff'][(i + k) % 4]; g.fillRect(x, h * (0.32 + k * 0.2), w * 0.13, h * 0.15); }
      });
      g.strokeStyle = '#d0463a'; g.lineWidth = h * 0.02; g.beginPath();
      var cx = w * 0.62, cy = h * 0.82;
      g.moveTo(cx, h * 0.3); g.lineTo(cx, cy); g.lineTo(w * 0.95, cy); g.stroke();
      g.strokeStyle = '#2d6fcf'; g.beginPath(); g.moveTo(cx, h * 0.38);
      for (var p = 1; p <= 6; p++) g.lineTo(cx + p * (w * 0.33 / 6), h * 0.38 + p * (h * 0.4 / 6) + (r() - 0.5) * h * 0.06);
      g.stroke();
    },
    tv: function (g, w, h, r, o) {                    // a TV showing the news or a game
      var s = g.createLinearGradient(0, 0, 0, h); s.addColorStop(0, o.a || '#4f86c6'); s.addColorStop(1, o.b || '#1d3557');
      g.fillStyle = s; g.fillRect(0, 0, w, h);
      if (o.game) {
        g.fillStyle = '#3f8f3f'; g.fillRect(0, h * 0.35, w, h * 0.65);
        g.strokeStyle = '#fff'; g.lineWidth = h * 0.02; g.strokeRect(w * 0.1, h * 0.45, w * 0.8, h * 0.45); g.beginPath(); g.moveTo(w / 2, h * 0.45); g.lineTo(w / 2, h * 0.9); g.stroke();
        g.fillStyle = '#e63946'; g.beginPath(); g.arc(w * 0.3, h * 0.6, h * 0.05, 0, 7); g.fill(); g.fillStyle = '#f1faee'; g.beginPath(); g.arc(w * 0.65, h * 0.7, h * 0.05, 0, 7); g.fill();
        g.fillStyle = 'rgba(0,0,0,0.6)'; g.fillRect(w * 0.05, h * 0.06, w * 0.4, h * 0.14);
        g.fillStyle = '#fff'; g.font = 'bold ' + Math.round(h * 0.1) + 'px Arial'; g.textBaseline = 'middle'; g.fillText(o.text || 'FVW 2 - 1 RDG', w * 0.07, h * 0.13);
        return;
      }
      g.fillStyle = 'rgba(255,255,255,0.18)'; g.beginPath(); g.arc(w * 0.3, h * 0.42, h * 0.2, 0, 7); g.fill();
      g.fillRect(w * 0.55, h * 0.25, w * 0.35, h * 0.08); g.fillRect(w * 0.55, h * 0.4, w * 0.28, h * 0.06);
      g.fillStyle = '#d62828'; g.fillRect(0, h * 0.72, w * 0.28, h * 0.16);
      g.fillStyle = '#f1f1f1'; g.fillRect(w * 0.28, h * 0.72, w * 0.72, h * 0.16);
      g.fillStyle = '#fff'; g.font = 'bold ' + Math.round(h * 0.1) + 'px Arial'; g.textBaseline = 'middle'; g.fillText('LIVE', w * 0.04, h * 0.8);
      g.fillStyle = '#1d3557'; fitText(g, o.text || 'Fairview: sunny, high of 72', w * 0.68, Math.round(h * 0.09)); g.fillText(o.text || 'Fairview: sunny, high of 72', w * 0.31, h * 0.8);
    },
    elevator: function (g, w, h, r, o) {              // brushed steel doors with a floor display
      var s = g.createLinearGradient(0, 0, w, 0);
      s.addColorStop(0, '#9aa3ad'); s.addColorStop(0.3, '#cfd5db'); s.addColorStop(0.5, '#aeb6bf'); s.addColorStop(0.7, '#d7dce1'); s.addColorStop(1, '#9aa3ad');
      g.fillStyle = s; g.fillRect(0, h * 0.12, w, h * 0.88);
      g.strokeStyle = 'rgba(255,255,255,0.12)'; for (var y = h * 0.12; y < h; y += 3) { g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
      g.fillStyle = '#5d6670'; g.fillRect(w / 2 - 2, h * 0.12, 4, h * 0.88);
      g.fillStyle = '#1d232b'; g.fillRect(0, 0, w, h * 0.12);
      g.fillStyle = '#ff9f43'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.font = 'bold ' + Math.round(h * 0.08) + 'px "Courier New", monospace';
      g.fillText((o.floor || '1') + ' ▲', w / 2, h * 0.065);
    },
    poster: function (g, w, h, r, o) {                // a poster or notice: a colour band, big text, small text
      g.fillStyle = o.bg || '#fff8e8'; g.fillRect(0, 0, w, h);
      g.fillStyle = o.band || '#d1495b'; g.fillRect(0, 0, w, h * 0.3);
      g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle';
      fitText(g, o.text || '', w * 0.86, Math.round(h * 0.15)); g.fillText(o.text || '', w / 2, h * 0.15);
      g.fillStyle = o.fg || '#2b2d42';
      (o.lines || []).forEach(function (l, k) { fitText(g, l, w * 0.86, Math.round(h * 0.09), k ? 'normal' : 'bold'); g.fillText(l, w / 2, h * (0.42 + k * 0.13)); });
    },
    map: function (g, w, h, r, o) {                   // a city map
      g.fillStyle = '#eef0e6'; g.fillRect(0, 0, w, h);
      g.fillStyle = '#b9dca0'; g.fillRect(w * 0.08, h * 0.55, w * 0.3, h * 0.35);
      g.fillStyle = '#a9cfe8'; g.beginPath(); g.moveTo(w * 0.7, 0); g.quadraticCurveTo(w * 0.8, h * 0.5, w, h * 0.7); g.lineTo(w, 0); g.fill();
      g.strokeStyle = '#ffffff'; g.lineWidth = h * 0.05;
      [0.3, 0.5, 0.75].forEach(function (f) { g.beginPath(); g.moveTo(0, h * f); g.lineTo(w, h * f); g.stroke(); g.beginPath(); g.moveTo(w * f, 0); g.lineTo(w * f, h); g.stroke(); });
      g.fillStyle = '#d62828'; g.beginPath(); g.arc(w * 0.55, h * 0.42, h * 0.05, 0, 7); g.fill();
      g.fillStyle = '#333'; g.font = 'bold ' + Math.round(h * 0.08) + 'px Arial'; g.fillText(o.text || 'Fairview', w * 0.05, h * 0.12);
    },
    glow: function (g, w, h, r, o) {                  // a lit window of a far building (night view) or a plain colour
      g.fillStyle = o.bg || '#ffffff'; g.fillRect(0, 0, w, h);
    }
  };
  var WALLS = { n: [0, 1], s: [0, -1], w: [1, 0], e: [-1, 0] };
  function panel(api, p) {
    var T = api.T, sz = api.spec.size, w = p.w || 1, h = p.h || 0.5, d = p.depth == null ? 0.03 : p.depth;
    var at = p.at, turn = p.turn || 0;
    if (p.wall) {                                     // on the inside of an outer wall
      var off = 0.02;
      at = p.wall === 'n' ? [p.along, -sz[1] / 2 + off] : p.wall === 's' ? [p.along, sz[1] / 2 - off] : p.wall === 'w' ? [-sz[0] / 2 + off, p.along] : [sz[0] / 2 - off, p.along];
      turn = { n: 0, s: 180, w: 90, e: 270 }[p.wall];
    }
    var ppu = p.ppu || 256, cw = Math.min(2048, Math.round(w * ppu)), ch = Math.min(1024, Math.round(h * ppu));
    var key = 'panel:' + (p.key || JSON.stringify(p, function (k, v) { return /^(at|turn|y|wall|along|frame|rim|depth|lit|live)$/.test(k) ? undefined : v; }));
    var t = tex(api, key, cw, ch, function (g, W, H, r) { (PANELS[p.kind] || PANELS.sign)(g, W, H, r, p); });
    t.wrapS = t.wrapT = T.ClampToEdgeWrapping;
    var grp = new T.Group();
    if (d > 0 && p.frame !== false) {
      var fr = new T.Mesh(new T.BoxGeometry(w + (p.rim == null ? 0.04 : p.rim), h + (p.rim == null ? 0.04 : p.rim), d), api.toon(p.frame || '#3b3f46'));
      fr.position.z = d / 2;
      fr.castShadow = false; fr.receiveShadow = true;
      grp.add(fr);
    }
    var face = new T.Mesh(new T.PlaneGeometry(w, h), p.lit ? litMat(api, key, t) : flatMat(api, key, t, { toneMapped: false }));
    face.position.z = d + 0.002;
    grp.add(face);
    grp.position.set(at[0], p.y == null ? 0.8 : p.y, at[1]);
    grp.rotation.y = turn * Math.PI / 180;
    return grp;
  }

  var WALL_NODES = { wall: [1, -0.05, 0], wallHalf: [0.5, -0.05, 0], wallWindow: [1, -0.07, 0.02], wallWindowSlide: [1, -0.07, 0.02], wallDoorway: [1, -0.07, 0.02, 1], wallDoorwayWide: [1, -0.07, 0.02, 1] };
  // wall pieces of the room: colour, height, a trim on top and a baseboard (both one InstancedMesh each)
  function dressWalls(api, o, keep) {
    var T = api.T, sy = o.scale || 1, H = 1.29, list = [];
    api.group.children.forEach(function (hold) {
      var n = hold.children[0];
      if (n && WALL_NODES[n.name]) list.push([hold, WALL_NODES[n.name]]);
    });
    list.forEach(function (it) {
      var hold = it[0];
      if (sy !== 1) { hold.scale.y = sy; hold.updateMatrix(); hold.updateMatrixWorld(true); }
      var paint = { _defaultMat: o.color, metalDark: o.back || (o.color && shade(o.color, -0.12)) };
      if (o.color) hold.traverse(function (m) {
        if (!m.isMesh) return;
        var arr = Array.isArray(m.material) ? m.material : [m.material];
        var out = arr.map(function (mt) {
          var col = mt && paint[mt.name];
          if (!col) return mt;
          var k = 'wall:' + mt.uuid + ':' + col;
          if (!MATS[k]) { MATS[k] = mt.clone(); MATS[k].color.set(col); }
          return MATS[k];
        });
        m.material = Array.isArray(m.material) ? out : out[0];
      });
    });
    if (keep.trims) return keep.trims.forEach(function (x) { api.group.add(x); });
    var geo = new T.BoxGeometry(1, 1, 1), M = new T.Matrix4(), L = new T.Matrix4(), q = new T.Quaternion(), v = new T.Vector3(), s = new T.Vector3();
    var cap = new T.InstancedMesh(geo, api.toon(o.trim || '#8a8176'), list.length);
    var base = new T.InstancedMesh(geo, api.toon(o.base || o.trim || '#8a8176'), list.length);
    var nb = 0, t = 0.035, b = 0.07;
    list.forEach(function (it, i) {
      var hold = it[0], P = it[1], len = P[0], z0 = P[1] - 0.012, z1 = P[2] + 0.012;
      L.compose(v.set(len / 2, H + t / (2 * sy), (z0 + z1) / 2), q.identity(), s.set(len + 0.004, t / sy, z1 - z0));
      cap.setMatrixAt(i, M.multiplyMatrices(hold.matrixWorld, L));
      if (P[3]) return;
      L.compose(v.set(len / 2, b / (2 * sy), P[2] + 0.009), q.identity(), s.set(len, b / sy, 0.018));
      base.setMatrixAt(nb++, M.multiplyMatrices(hold.matrixWorld, L));
    });
    base.count = nb;
    cap.receiveShadow = base.receiveShadow = true;
    keep.trims = [cap, base];
    api.group.add(cap, base);
  }

  function outMat(api, keep, p) {         // a material of the land outside, dimmed after dark by skyTint
    var m = litMat(api, 'out:' + p.key, p.t);
    (keep.outdoor = keep.outdoor || []).push(m);
    return m;
  }
  // props standing outside the room (the neighbours' houses, parked cars) get their own copies of their materials,
  // so that skyTint can dim them after dark without touching the same models elsewhere
  function outsideProps(api, keep) {
    var sz = api.spec.size, X = sz[0] / 2 + 0.3, Z = sz[1] / 2 + 0.3, clones = keep.clones || (keep.clones = {});
    keep.outProps = keep.outProps || [];
    api.group.children.forEach(function (hold) {
      if (hold.isMesh || hold.name === 'dress' || (Math.abs(hold.position.x) < X && Math.abs(hold.position.z) < Z)) return;
      hold.traverse(function (m) {
        if (!m.isMesh || m.userData.ink) return;
        var one = function (mt) {
          if (!mt || !mt.color) return mt;
          if (!clones[mt.uuid]) { clones[mt.uuid] = mt.clone(); keep.outProps.push([clones[mt.uuid], mt.color.clone()]); }
          return clones[mt.uuid];
        };
        m.material = Array.isArray(m.material) ? m.material.map(one) : one(m.material);
      });
    });
  }
  function dress(api, o) {
    var T = api.T, Z = api.spec, id = api.zone, keep = BUILT[id] || (BUILT[id] = {});
    if (Z.indoor) outsideProps(api, keep);
    if (o.walls) dressWalls(api, o.walls, keep);
    if (o.ground) api.group.children.forEach(function (c) {      // the engine's plain outer plane: our ground replaces it
      if (c.isMesh && c.geometry && c.geometry.type === 'PlaneGeometry' && Math.abs(c.position.y + 0.03) < 1e-4) c.visible = false;
    });
    if (keep.group) { api.group.add(keep.group); refresh(api, keep); return keep.group; }
    keep.live = [];
    var g = keep.group = new T.Group();
    g.name = 'dress';
    var w = Z.size[0], d = Z.size[1];
    // floors
    if (o.floor) {
      var f = patternTex(api, o.floor);
      g.add(flat(api, [-w / 2, -d / 2, w / 2, d / 2], 0.002, litMat(api, f.key, f.t), f.tile));
    }
    (o.floors || []).forEach(function (p) {
      var f2 = patternTex(api, p);
      g.add(flat(api, p.rect, 0.003, litMat(api, f2.key, f2.t), f2.tile));
    });
    // the land around: patterned ground and strips (roads, sidewalks, water)
    if (o.ground) {
      var gy = o.ground.y == null ? -0.03 : o.ground.y, R = Math.max(w, d) / 2 + 70;
      var gp = patternTex(api, o.ground.pattern || 'grass');
      g.add(flat(api, [-R, -R, R, R], gy, outMat(api, keep, gp), gp.tile));
      (o.ground.strips || []).forEach(function (sp, k) {
        var st = patternTex(api, sp), across = sp.dir === 'z' ? sp.rect[2] - sp.rect[0] : sp.rect[3] - sp.rect[1];
        var tile = [st.tile[0], st.tile[1] || across];
        g.add(flat(api, sp.rect, gy + 0.004 + k * 0.001, outMat(api, keep, st), tile, sp.dir === 'z'));
      });
    }
    // the country beyond the edge of town
    if (o.mountains) g.add(mountains(api, keep, o.mountains));
    if (o.sea) g.add(sea(api, keep, o.sea));
    if (o.wild) g.add(wild(api, keep, o.wild));
    // the building under a room upstairs: four faces with windows
    if (o.tower) {
      var tw = o.tower, top = tw.top == null ? -0.02 : tw.top, bot = tw.bottom, hh = top - bot, m = tw.margin == null ? 0.3 : tw.margin;
      var ft = patternTex(api, { pattern: 'facade', a: tw.color, b: tw.glass }), fm = outMat(api, keep, ft);
      [[0, -d / 2 - m, w + 2 * m, 180], [0, d / 2 + m, w + 2 * m, 0], [-w / 2 - m, 0, d + 2 * m, 270], [w / 2 + m, 0, d + 2 * m, 90]].forEach(function (f3) {
        var pg = new T.PlaneGeometry(f3[2], hh), uv = pg.attributes.uv;
        for (var i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * f3[2] / ft.tile[0], uv.getY(i) * hh / ft.tile[1]);
        var pm = new T.Mesh(pg, fm);
        pm.position.set(f3[0], bot + hh / 2, f3[1]);
        pm.rotation.y = f3[3] * Math.PI / 180;
        g.add(pm);
      });
      var roof = new T.Mesh(new T.BoxGeometry(w + 2 * m, 0.08, d + 2 * m), api.toon(tw.edge || '#8d949c'));
      roof.position.y = top - 0.05;
      g.add(roof);
    }
    // the painted town on a ring around the room
    if (o.skyline) {
      var sk = o.skyline, r = sk.r || Math.max(w, d) / 2 + 11, hgt = sk.h || 8, y0 = sk.y == null ? -0.4 : sk.y;
      var reps = Math.max(1, Math.round(2 * Math.PI * r / 32)), seed = sk.seed || 1;
      var half = function (night) { return function (g) { g.scale(0.5, 0.5); drawSkyline(sk.kind, night, seed)(g, 2048, 512); }; };   // drawn at 2048 x 512, kept at half size
      var day = tex(api, 'sky:' + sk.kind + ':' + seed + ':d', 1024, 256, half(false));
      var night = tex(api, 'sky:' + sk.kind + ':' + seed + ':n', 1024, 256, half(true));
      var cg = new T.CylinderGeometry(r, r, hgt, 72, 1, true);
      var uv2 = cg.attributes.uv;
      for (var j = 0; j < uv2.count; j++) uv2.setX(j, uv2.getX(j) * reps);
      var sm = new T.MeshBasicMaterial({ map: day, transparent: true, side: T.BackSide, depthWrite: false, fog: true, toneMapped: false });
      var ring = new T.Mesh(cg, sm);
      ring.position.y = y0 + hgt / 2;
      ring.rotation.y = (sk.turn || 0) * Math.PI / 180;
      ring.renderOrder = -1;
      g.add(ring);
      keep.sky = { mat: sm, day: day, night: night };
    }
    (o.panels || []).forEach(function (p) {
      if (p.live) return;
      var m = panel(api, p);
      g.add(m);
      if (p.at && api.occlude) api.occlude(m);     // a free-standing sign fades when it stands between the camera and a person
    });
    (o.planes || []).forEach(function (p) { g.add(airplane(api, p)); });
    api.group.add(g);
    keep.live = (o.panels || []).filter(function (p) { return p.live; });
    refresh(api, keep);
    return g;
  }
  // a parked airliner made of simple shapes (no plane in the Kenney kits we use): at [x, z], turn, scale, tail colour
  function airplane(api, p) {
    var T = api.T, g = new T.Group(), white = api.toon('#f3f4f6'), grey = api.toon('#aab2bc'), tail = api.toon(p.tail || '#2f6fb3'), glass = api.toon('#2c3e55');
    function add(geo, mat, x, y, z, rx, ry, rz) { var m = new T.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.set(rx || 0, ry || 0, rz || 0); m.castShadow = true; m.receiveShadow = true; g.add(m); return m; }
    var R = 0.55, L = 7;
    add(new T.CylinderGeometry(R, R, L, 20), white, 0, 1.2, 0, Math.PI / 2);                      // fuselage along z
    add(new T.SphereGeometry(R, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), white, 0, 1.2, L / 2, Math.PI / 2);   // nose
    add(new T.ConeGeometry(R, 1.6, 20), white, 0, 1.35, -L / 2 - 0.8, -Math.PI / 2).scale.set(1, 1, 0.7);    // tail cone
    add(new T.BoxGeometry(7.5, 0.1, 1.3), grey, 0, 0.95, 0.2, 0, 0, 0);                         // wings
    add(new T.BoxGeometry(2.6, 0.08, 0.7), grey, 0, 1.45, -L / 2 - 0.9);                          // tail plane
    add(new T.BoxGeometry(0.1, 1.5, 1.1), tail, 0, 2.1, -L / 2 - 0.9, -0.35);                     // fin
    add(new T.BoxGeometry(0.02, 0.18, L * 0.8), glass, R - 0.02, 1.35, 0.3);                      // windows
    add(new T.BoxGeometry(0.02, 0.18, L * 0.8), glass, -R + 0.02, 1.35, 0.3);
    add(new T.BoxGeometry(0.6, 0.12, 0.4), glass, 0, 1.45, L / 2 + 0.25, -0.5);                   // cockpit
    [-1.9, 1.9].forEach(function (x) { add(new T.CylinderGeometry(0.28, 0.24, 1.0, 14), grey, x, 0.72, 0.6, Math.PI / 2); });   // engines
    [[0, 3.1], [-0.9, -0.3], [0.9, -0.3]].forEach(function (w) { add(new T.CylinderGeometry(0.03, 0.03, 0.6, 6), grey, w[0], 0.35, w[1]); add(new T.CylinderGeometry(0.16, 0.16, 0.12, 12), api.toon('#2a2d33'), w[0], 0.1, w[1], 0, 0, Math.PI / 2); });
    g.position.set(p.at[0], p.lift || 0, p.at[1]);
    g.rotation.y = (p.turn || 0) * Math.PI / 180;
    g.scale.setScalar(p.scale || 1);
    return g;
  }
  // after dark the painted town lights its windows; at dusk it warms up. Live panels (a departures board) are
  // drawn for the day they are on, so they are made on every visit.
  function refresh(api, keep) {
    (keep.live || []).forEach(function (p) {
      var q = {};
      for (var k in p) q[k] = p[k];
      if (typeof p.live === 'function') p.live(api, q);
      q.key = p.key + ':' + JSON.stringify([q.rows, q.text, q.clock]);
      if (keep.liveMesh && keep.liveMesh[p.key]) keep.group.remove(keep.liveMesh[p.key]);
      keep.liveMesh = keep.liveMesh || {};
      keep.group.add(keep.liveMesh[p.key] = panel(api, q));
    });
    keep.step = null;
    skyTint(api, keep);
  }
  function skyTint(api, keep) {
    var h = (api.solarMinute || api.minute || 600) / 60, step = Math.round(h * 12);   // every five minutes
    if (step === keep.step) return;
    keep.step = step;
    var e = Math.max(0, Math.min(1, Math.sin(Math.PI * (h - 6) / 14))), night = h < 6 || h > 20;
    var dim = night ? 0.42 : e < 0.35 ? 0.6 + 0.4 * e / 0.35 : 1;
    (keep.outdoor || []).forEach(function (m) { m.color.setRGB(dim, dim, dim * (night ? 1.15 : 1)); });
    (keep.outProps || []).forEach(function (q) { q[0].color.copy(q[1]).multiplyScalar(dim); if (night) q[0].color.b *= 1.15; });
    if (!keep.sky) return;
    var sm = keep.sky.mat, map = night ? keep.sky.night : keep.sky.day;
    if (sm.map !== map) { sm.map = map; sm.needsUpdate = true; }
    if (night) sm.color.setRGB(0.85, 0.85, 0.95);
    else if (e < 0.35) sm.color.setRGB(1, 0.8 + 0.2 * e / 0.35, 0.68 + 0.32 * e / 0.35);
    else sm.color.setRGB(1, 1, 1);
  }
  function tick(api) {
    var keep = BUILT[api.zone];
    if (keep) skyTint(api, keep);
  }

  window.SO_ZONE_KIT = { ORIGIN: ORIGIN, SCALE: SCALE, BOX: BOX, size: size, prop: prop, wallLine: wallLine, walls: walls, floor: floor,
    dress: dress, tick: tick, panel: panel, airplane: airplane, PATTERNS: PATTERNS, PANELS: PANELS };
})();

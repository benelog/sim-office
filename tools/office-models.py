"""Build the model packs of Sim Office (office/) from Kenney's and Quaternius's CC0 kits.

    blender -b --python tools/office-models.py                          # every pack
    blender -b --python tools/office-models.py -- city food             # only these
    blender -b --python tools/office-models.py -- --list                # packs, sources and node counts
    blender -b --python tools/office-models.py -- food --keep-glb /tmp/glb   # also keep the .glb (to inspect)
    blender -b --python tools/office-models.py -- --copy-from /tmp/kenney-packs   # first copy the sources

Kenney sources are kenney/<kit>/<name>.glb (+ Textures/colormap.png, License.txt), copied from the unpacked
Kenney zips with --copy-from <dir> (only the files a pack uses). Quaternius sources are quaternius/<kit>/<file>
(.fbx from the pack zips, .gltf + .bin + textures, or poly.pizza's .glb conversions; see office/models/README.md
for where each came from). Each pack becomes office/models/<pack>.js: one .glb as base64 (the game runs from
file://, where neither fetch() nor external textures work), with the texture inside the .glb. The people are
made by tools/office-characters.py (Quaternius).

- A prop pack holds one node per piece: Kenney pieces are named exactly like the Kenney file (building-a, desk,
  cup-coffee); Quaternius pieces get kebab-case game names (sedan, tree-pine-1, bed-double) mapped to the source
  file in PACKS. Every piece is at the origin with its feet at y=0; Kenney pieces keep the file's own origin,
  Quaternius furniture and buildings are centred on their footprint, cars and plants keep the source origin.
  A piece made of several nodes (a car with its wheels, a desk with its drawer) keeps them as children named
  <piece>_<node> (sedan_body, sedan_wheel-front-left, desk_drawer). One material per texture ('colormap'; the
  Stylized Nature MegaKit has one per texture file); untextured kits have colour materials (wood, metal, paint)
  shared across pieces.
"""
import base64
import json
import os
import shutil
import struct
import sys
import tempfile

import bpy
from mathutils import Matrix, Vector

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
KENNEY = os.path.join(ROOT, 'kenney')
QUATERNIUS = os.path.join(ROOT, 'quaternius')
OUT = os.path.join(ROOT, 'office', 'models')

# kit folder in kenney/ -> (folder in the Kenney zip, models subfolder)
KITS = {
    'city-kit-commercial': ('kenney_city-kit-commercial_2.1', 'Models/GLB format'),
    'city-kit-suburban': ('kenney_city-kit-suburban_20', 'Models/GLB format'),
    'city-kit-roads': ('kenney_city-kit-roads', 'Models/GLB format'),
    'furniture-kit': ('kenney_furniture-kit', 'Models/GLTF format'),
    'food-kit': ('kenney_food-kit', 'Models/GLB format'),
    'mini-market': ('kenney_mini-market', 'Models/GLB format'),
    'mini-arcade': ('kenney_mini-arcade', 'Models/GLB format'),
    'factory-kit': ('kenney_factory-kit_3.0', 'Models/GLB format'),
    'nature-kit': ('kenney_nature-kit', 'Models/GLTF format'),
}
# Quaternius kits: folder in quaternius/ -> file format of the sources (a pack lists them as 'q:<kit>')
QKITS = {
    'cars': 'fbx',                        # Cars Pack: 7 cars, body + 3 wheel objects, colour materials
    'stylized-nature-megakit': 'gltf',    # textured trees, plants, rocks, paths (bark and leaves textures)
    'ultimate-furniture': 'glb',          # poly.pizza's glb of the FBX: RootNode + parts at scale 100
    'buildings': 'glb',                   # same shape as the furniture
    'ultimate-nature': 'fbx',             # 150 low-poly plants and rocks, colour materials; the far scenery
}


FURNITURE = """bathroomCabinetDrawer bathroomCabinet bathroomMirror bathroomSink bathroomSinkSquare bathtub bear bedBunk
bedDouble bedSingle benchCushion benchCushionLow bench bookcaseClosedDoors bookcaseClosed bookcaseClosedWide bookcaseOpen
bookcaseOpenLow books cabinetBedDrawer cabinetBedDrawerTable cabinetBed cabinetTelevisionDoors cabinetTelevision
cardboardBoxClosed cardboardBoxOpen ceilingFan chairCushion chairDesk chair chairModernCushion chairModernFrameCushion
chairRounded coatRack coatRackStanding computerKeyboard computerMouse computerScreen deskCorner desk doorwayFront doorway
doorwayOpen dryer floorCorner floorCornerRound floorFull floorHalf hoodLarge hoodModern kitchenBarEnd kitchenBar
kitchenBlender kitchenCabinetCornerInner kitchenCabinetCornerRound kitchenCabinetDrawer kitchenCabinet
kitchenCabinetUpperCorner kitchenCabinetUpperDouble kitchenCabinetUpper kitchenCabinetUpperLow kitchenCoffeeMachine
kitchenFridgeBuiltIn kitchenFridge kitchenFridgeLarge kitchenFridgeSmall kitchenMicrowave kitchenSink kitchenStoveElectric
kitchenStove lampRoundFloor lampRoundTable lampSquareCeiling lampSquareFloor lampSquareTable lampWall laptop loungeChair
loungeChairRelax loungeDesignChair loungeDesignSofaCorner loungeDesignSofa loungeSofaCorner loungeSofa loungeSofaLong
loungeSofaOttoman paneling pillowBlue pillowBlueLong pillow pillowLong plantSmall1 plantSmall2 plantSmall3 pottedPlant radio
rugDoormat rugRectangle rugRounded rugRound rugSquare shower showerRound sideTableDrawers sideTable speaker speakerSmall
stairsCorner stairs stairsOpen stairsOpenSingle stoolBar stoolBarSquare tableCloth tableCoffeeGlass tableCoffeeGlassSquare
tableCoffee tableCoffeeSquare tableCrossCloth tableCross tableGlass table tableRound televisionAntenna televisionModern
televisionVintage toaster toilet toiletSquare trashcan wallCorner wallCornerRond wallDoorway wallDoorwayWide wall wallHalf
wallWindow wallWindowSlide washerDryerStacked washer""".split()

FOOD = """apple banana orange lemon grapes strawberry watermelon pear cherries avocado tomato onion carrot broccoli cabbage
corn pepper paprika mushroom pumpkin egg bread loaf loaf-baguette croissant muffin donut donut-sprinkles cookie cupcake
cake-slicer pancakes waffle burger burger-cheese fries hot-dog pizza pizza-box sandwich sub salad taco sushi-salmon
maki-salmon rice-ball chinese bowl-soup bowl-cereal plate plate-dinner glass mug cup-coffee cup-tea frappe soda soda-can
soda-bottle bottle-ketchup peanut-butter honey cheese bacon meat-patty sausage turkey fish can carton carton-small bag
styrofoam ice-cream popsicle candy-bar chocolate barrel""".split()

# The Nature Kit pieces still in use after the plants moved to Quaternius (2026-09-27): park ornaments,
# water lilies, a canoe, signs. Colour materials, recoloured like before.
PARK = """sign lily_large lily_small log log_large stump_round stump_old pot_large pot_small canoe statue_column
statue_obelisk statue_block bridge_wood fence_simple fence_gate""".split()

# Stylized Nature MegaKit (standard): game name -> source file. Trees carry the 'tree-' prefix (the engine sways
# and maps them by it), paths 'path-' (laid flat), the rest by what they are.
MEGAKIT = {
    'tree-common-1': 'CommonTree_1', 'tree-common-2': 'CommonTree_2', 'tree-common-3': 'CommonTree_3', 'tree-common-5': 'CommonTree_5',
    'tree-pine-1': 'Pine_1', 'tree-pine-2': 'Pine_2', 'tree-pine-3': 'Pine_3', 'tree-pine-4': 'Pine_4',
    'tree-twisted-1': 'TwistedTree_1', 'tree-dead-1': 'DeadTree_1',
    'bush': 'Bush_Common', 'bush-flowers': 'Bush_Common_Flowers', 'clover': 'Clover_1', 'fern': 'Fern_1',
    'flower-3': 'Flower_3_Single', 'flower-3-group': 'Flower_3_Group', 'flower-4': 'Flower_4_Single', 'flower-4-group': 'Flower_4_Group',
    'grass-short': 'Grass_Common_Short', 'grass-tall': 'Grass_Common_Tall', 'grass-wispy-short': 'Grass_Wispy_Short', 'grass-wispy-tall': 'Grass_Wispy_Tall',
    'mushroom': 'Mushroom_Common', 'mushroom-laetiporus': 'Mushroom_Laetiporus',
    'pebble-round-1': 'Pebble_Round_1', 'pebble-round-2': 'Pebble_Round_2', 'pebble-round-3': 'Pebble_Round_3',
    'pebble-square-1': 'Pebble_Square_1', 'pebble-square-2': 'Pebble_Square_2', 'pebble-square-3': 'Pebble_Square_3',
    'petal-1': 'Petal_1', 'petal-2': 'Petal_2', 'petal-3': 'Petal_3',
    'plant-1': 'Plant_1', 'plant-1-big': 'Plant_1_Big', 'plant-7': 'Plant_7',
    'rock-1': 'Rock_Medium_1', 'rock-2': 'Rock_Medium_2', 'rock-3': 'Rock_Medium_3',
    'path-round-small-1': 'RockPath_Round_Small_1', 'path-round-small-2': 'RockPath_Round_Small_2', 'path-round-small-3': 'RockPath_Round_Small_3',
    'path-round-thin': 'RockPath_Round_Thin', 'path-round-wide': 'RockPath_Round_Wide',
    'path-square-small-1': 'RockPath_Square_Small_1', 'path-square-small-2': 'RockPath_Square_Small_2', 'path-square-small-3': 'RockPath_Square_Small_3',
    'path-square-thin': 'RockPath_Square_Thin', 'path-square-wide': 'RockPath_Square_Wide',
}
# material name per texture file of the MegaKit
MEGAKIT_TEX = {
    'Bark_NormalTree.png': 'bark', 'Bark_TwistedTree.png': 'bark-twisted', 'Bark_DeadTree.png': 'bark-dead',
    'Leaves_NormalTree_C.png': 'leaves', 'Leaves_TwistedTree_C.png': 'leaves-twisted', 'Leaf_Pine_C.png': 'leaves-pine',
    'Leaves.png': 'leaves-plant', 'Flowers.png': 'flowers', 'Grass.png': 'grass', 'Mushrooms.png': 'mushrooms',
    'PathRocks_Diffuse.png': 'path-rocks', 'Rocks_Diffuse.png': 'rocks',
}
DECIMATE = {'Bark': 0.25, 'PathRocks': 0.4, 'Rocks': 0.6}     # source material prefix -> ratio: dense trunks and path stones; the leaf cards stay

# Cars Pack: game name -> file; and the material that is the paint of each car (renamed 'paint' so the game can tint it)
CARS = {'sedan': 'NormalCar1', 'hatchback': 'NormalCar2', 'sports-car': 'SportsCar', 'sports-car-2': 'SportsCar2',
        'suv': 'SUV', 'taxi': 'Taxi', 'police': 'Cop'}
CAR_PAINT = {'sedan': 'Blue', 'hatchback': 'LightBlue', 'sports-car': 'Orange', 'sports-car-2': 'White', 'suv': 'White', 'taxi': 'Yellow', 'police': 'White'}
CAR_PARTS = {'BackWheels': 'wheel-back', 'FrontLeftWheel': 'wheel-front-left', 'FrontRightWheel': 'wheel-front-right'}

# Ultimate Furniture Pack (the home): game name -> file
HOMEWARE = {'bed-double': 'BedDouble', 'bed-twin': 'BedTwin', 'bookcase': 'Bookcase_Books', 'armchair': 'Sofa_individual', 'chair': 'Chair',
            'closet': 'Closet', 'closet-short': 'ShortCloset', 'desk': 'Desk', 'door-1': 'Door1', 'door-2': 'Door2', 'door-3': 'Door3',
            'night-stand': 'NightStand', 'office-chair': 'OfficeChair', 'sofa-1': 'Sofa', 'sofa-2': 'Sofa2', 'sofa-corner': 'Sofa3',
            'stool': 'Stool', 'table-1': 'Table', 'table-2': 'Table2'}

# Buildings Pack: European town houses; game name -> file
BUILDINGS = {'building-1-large': 'Building1_Large', 'building-1-small': 'Building1_Small', 'building-2-large': 'Building2_Large',
             'building-2-small': 'Building2_Small', 'building-3-big': 'Building3_Big', 'building-3-small': 'Building3_Small',
             'building-4': 'Building4', 'house-1': 'House1', 'house-2': 'House2'}

# Ultimate Nature Pack: the country beyond the edge of town (SO_ZONE_KIT.dress scatters them as instances)
WILD = {'tree-common-1': 'CommonTree_1', 'tree-common-2': 'CommonTree_2', 'tree-common-3': 'CommonTree_3', 'tree-common-4': 'CommonTree_4',
        'tree-common-5': 'CommonTree_5', 'tree-autumn-1': 'CommonTree_Autumn_1', 'tree-autumn-2': 'CommonTree_Autumn_2',
        'tree-pine-1': 'PineTree_1', 'tree-pine-2': 'PineTree_2', 'tree-pine-3': 'PineTree_3', 'tree-pine-4': 'PineTree_4', 'tree-pine-5': 'PineTree_5',
        'tree-birch-1': 'BirchTree_1', 'tree-birch-2': 'BirchTree_2', 'tree-birch-3': 'BirchTree_3', 'tree-willow-1': 'Willow_1', 'tree-willow-2': 'Willow_2',
        'bush-1': 'Bush_1', 'bush-2': 'Bush_2', 'bush-berries': 'BushBerries_1', 'rock-1': 'Rock_1', 'rock-2': 'Rock_2', 'rock-3': 'Rock_3', 'rock-4': 'Rock_4',
        'rock-moss-1': 'Rock_Moss_1', 'rock-moss-2': 'Rock_Moss_2', 'stump': 'TreeStump', 'log': 'WoodLog', 'grass': 'Grass', 'grass-short': 'Grass_Short',
        'flowers': 'Flowers', 'plant-1': 'Plant_1', 'plant-2': 'Plant_2'}

# pack -> list of (kit, pieces); a Kenney kit lists piece names (the first kit's texture is the material 'colormap',
# others 'colormap-<kit>'), a Quaternius kit ('q:<kit>') maps game names to source files
PACKS = {
    'city': [
        ('city-kit-commercial', [f'building-{c}' for c in 'abcdefgh'] + [f'building-skyscraper-{c}' for c in 'abc']
         + ['detail-awning', 'detail-awning-wide', 'detail-parasol-a', 'detail-parasol-b', 'detail-overhang', 'detail-overhang-wide']
         + [f'low-detail-building-{c}' for c in 'abcdefghijklmn'] + ['low-detail-building-wide-a', 'low-detail-building-wide-b']),
        ('city-kit-suburban', [f'building-type-{c}' for c in 'abcdefgh']
         + ['tree-large', 'tree-small', 'fence', 'fence-1x3', 'planter', 'driveway-short', 'path-short']),
    ],
    'roads': [('city-kit-roads', """road-straight road-straight-half road-crossroad road-crossroad-line road-intersection
        road-intersection-line road-bend road-bend-sidewalk road-curve road-crossing road-end road-side road-square tile-low
        light-square light-square-double light-curved traffic-light road-sign-stop road-sign-street construction-cone
        construction-barrier dumpster electricity-pole sign-highway""".split())],
    'cars': [('q:cars', CARS)],
    'furniture': [('furniture-kit', FURNITURE)],
    'food': [('food-kit', FOOD)],
    # a pack of odds and ends from other Kenney kits: shop fittings (Mini Market), machines (Mini Arcade),
    # airport security and screens (Factory Kit)
    'extras': [
        ('mini-market', ['cash-register', 'shopping-cart', 'shopping-basket', 'display-fruit', 'display-bread', 'freezer',
                         'freezers-standing', 'shelf-boxes', 'shelf-bags']),
        ('mini-arcade', ['vending-machine', 'ticket-machine']),
        ('factory-kit', ['scanner-high', 'machine-window']),
    ],
    'nature': [('q:stylized-nature-megakit', MEGAKIT)],
    'park': [('nature-kit', PARK)],
    'homeware': [('q:ultimate-furniture', HOMEWARE)],
    'buildings': [('q:buildings', BUILDINGS)],
    'wild': [('q:ultimate-nature', WILD)],
}
UNTEXTURED = {'furniture', 'park', 'cars', 'homeware', 'buildings', 'wild'}      # colour materials only
CENTRED = {'ultimate-furniture', 'buildings'}     # Quaternius kits whose pieces are re-centred on their footprint
JPEG = {'nature'}                                 # packs whose opaque textures go in as JPEG (the leaf cutouts stay PNG)
# Flat-shaded packs: faceted low-poly pieces go out with their vertices welded and no normals (a third of the bytes);
# three.js's GLTFLoader flat-shades a mesh without normals, and the engine keeps that on its toon material.
FLAT = {'cars', 'homeware', 'buildings', 'wild'}
QUANTIZE = {'nature'}                             # normals as bytes, texture coordinates as 16-bit (KHR_mesh_quantization)

# The Nature Kit's own palette is mint and orange (a stylised look of its own); the game recolours its named
# materials to the greens and browns of the Kenney city kits it stands next to. sRGB hex per material name.
RECOLOR = {
    'park': {
        'leafsGreen': '#62b24f', 'leafsDark': '#3e8f46', 'grass': '#72bf5a', 'leafsFall': '#e2903c',
        'woodBark': '#8f6142', 'woodBarkDark': '#74492f', 'wood': '#b58455', 'woodDark': '#8d6239', 'woodInner': '#e9d3b3', 'woodBirch': '#efe9dd',
        'stone': '#cfd3cf', 'stoneDark': '#a2a7a4', 'dirt': '#a88863', 'dirtDark': '#86694a',
        'colorRed': '#d94b4f', 'colorYellow': '#f2c14e', 'colorPurple': '#9a7ad6', 'colorTan': '#d9b27c',
    },
}


def srgb_to_linear(hex_color):
    def ch(v):
        c = v / 255.0
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    h = hex_color.lstrip('#')
    return tuple(ch(int(h[i:i + 2], 16)) for i in (0, 2, 4)) + (1.0,)


def recolor(pack):
    for name, hex_color in RECOLOR.get(pack, {}).items():
        m = bpy.data.materials.get(name)
        node = principled(m)
        if not node:
            continue          # this pack uses only some of the kit's materials
        node.inputs['Base Color'].default_value = srgb_to_linear(hex_color)

LIMIT = 3 * 1024 * 1024   # base64 bytes per pack
LIMITS = {'nature': 4 * 1024 * 1024}     # the textured trees are bigger


# ---------- sources ----------

def src(kit, name):
    return os.path.join(KENNEY, kit, name + '.glb')


def copy_sources(zips, packs):
    """Copy the .glb files the packs use, their texture and License.txt from the unpacked Kenney zips to kenney/<kit>/."""
    for pack in packs:
        for kit, names in PACKS[pack]:
            if kit.startswith('q:'):
                continue          # Quaternius sources are copied by hand (README)
            folder, sub = KITS[kit]
            base = os.path.join(zips, folder)
            dst = os.path.join(KENNEY, kit)
            os.makedirs(dst, exist_ok=True)
            shutil.copy2(os.path.join(base, 'License.txt'), os.path.join(dst, 'License.txt'))
            tex = os.path.join(base, sub, 'Textures', 'colormap.png')
            if os.path.exists(tex):
                os.makedirs(os.path.join(dst, 'Textures'), exist_ok=True)
                shutil.copy2(tex, os.path.join(dst, 'Textures', 'colormap.png'))
            for n in names:
                shutil.copy2(os.path.join(base, sub, n + '.glb'), src(kit, n))
    print('copied sources to', KENNEY)


# ---------- Blender ----------

def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def import_glb(path):
    if not os.path.exists(path):
        raise SystemExit(f'missing source {path} (run with --copy-from <unpacked Kenney zips>)')
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=path, import_pack_images=True)
    new = [o for o in bpy.data.objects if o not in before]
    for o in new:      # the Nature Kit's 'tmpParent' empties land in an 'Orphan Nodes' collection outside the view layer
        if o.name not in bpy.context.view_layer.objects:
            bpy.context.scene.collection.objects.link(o)
    return new


def texture_image(mat):
    if not mat or not mat.node_tree:
        return None
    for n in mat.node_tree.nodes:
        if n.type == 'TEX_IMAGE' and n.image:
            return n.image
    return None


def principled(mat):
    return next((n for n in mat.node_tree.nodes if n.type == 'BSDF_PRINCIPLED'), None) if mat and mat.node_tree else None


def material_key(mat):
    """Materials that look the same share one: by texture file, else by base name and colour."""
    img = texture_image(mat)
    if img:
        return ('tex', os.path.normpath(bpy.path.abspath(img.filepath)))
    base = mat.name.split('.')[0]
    col = None
    for n in mat.node_tree.nodes if mat.node_tree else []:
        for inp in n.inputs:
            if inp.type == 'RGBA' and not inp.is_linked:
                col = tuple(round(v, 4) for v in inp.default_value)
                break
        if col:
            break
    return ('col', base, col)


def merge_materials(objs, tex_names):
    """One material per texture / colour. tex_names: normalised texture path -> material name."""
    canon = {}
    for ob in objs:
        if ob.type != 'MESH':
            continue
        for slot in ob.material_slots:
            m = slot.material
            if not m:
                continue
            k = material_key(m)
            if k not in canon:
                canon[k] = m
                if k[0] == 'tex':
                    m.name = tex_names.get(k[1], m.name)
                    texture_image(m).name = m.name
            slot.material = canon[k]
    for m in list(bpy.data.materials):
        if m.users == 0:
            bpy.data.materials.remove(m)
    for im in list(bpy.data.images):
        if im.users == 0:
            bpy.data.images.remove(im)
    # colour materials: drop Blender's .001 suffixes where the base name is free
    for m in canon.values():
        base = m.name.split('.')[0]
        if m.name != base and base not in bpy.data.materials:
            m.name = base
    for im in bpy.data.images:
        if not im.packed_file:
            im.pack()
    return list(canon.values())


def is_identity(M):
    return all(abs(M[i][j] - (1.0 if i == j else 0.0)) < 1e-6 for i in range(4) for j in range(4))


def add_piece(kit, name):
    """Import one Kenney file as a node called `name` at the origin; extra nodes become children <name>_<node>."""
    objs = import_glb(src(kit, name))
    tops = [o for o in objs if o.parent is None]
    top = tops[0] if len(tops) == 1 else None
    if top and not is_identity(top.matrix_basis) and top.type == 'MESH' and not top.children:
        top.data.transform(top.matrix_basis)          # a lone scaled mesh (food): bake its transform
        top.matrix_basis = Matrix.Identity(4)
    if not top or not is_identity(top.matrix_basis):
        top = bpy.data.objects.new(name, None)
        bpy.context.scene.collection.objects.link(top)
        for o in tops:
            mw = o.matrix_world.copy()
            o.parent = top
            o.matrix_world = mw
    taken = set()
    for o in objs:
        if o is top:
            continue
        base = f'{name}_{o.name.split(".")[0].replace("(Clone)", "")}'
        n, i = base, 1
        while n in taken:
            i += 1
            n = f'{base}-{i}'
        taken.add(n)
        o.name = n
    top.name = name
    if top.name != name:
        raise SystemExit(f'node name {name} taken by another object')
    if top.data is not None:
        top.data.name = name
    return top, objs + ([top] if top not in objs else [])


def world_bounds(meshes):
    pts = [o.matrix_world @ v.co for o in meshes for v in o.data.vertices]
    return [min(p[i] for p in pts) for i in range(3)], [max(p[i] for p in pts) for i in range(3)]


def decimate_materials(o, ratios):
    """Collapse the faces of the materials named <prefix>... to `ratio` of their triangles (ratios: prefix -> ratio):
    the mesh is split by material, the dense parts get a Decimate modifier, and everything is joined again."""
    if not any(sl.material and sl.material.name.startswith(pre) for sl in o.material_slots for pre in ratios):
        return
    bpy.ops.object.select_all(action='DESELECT')
    o.select_set(True)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.separate(type='MATERIAL')
    bpy.ops.object.mode_set(mode='OBJECT')
    parts = list(bpy.context.selected_objects)
    for part in parts:
        used = {part.material_slots[p.material_index].material.name for p in part.data.polygons if part.material_slots}
        ratio = next((r for pre, r in ratios.items() if any(n.startswith(pre) for n in used)), None)
        if ratio is None:
            continue
        bpy.context.view_layer.objects.active = part
        mod = part.modifiers.new('decimate', 'DECIMATE')
        mod.ratio = ratio
        bpy.ops.object.modifier_apply(modifier=mod.name)
    bpy.ops.object.select_all(action='DESELECT')
    for part in parts:
        part.select_set(True)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.join()


def weld(o):
    """Merge the vertices that sit on one another (the flat-shaded kits: no normals, so shared vertices are fine)."""
    bpy.ops.object.select_all(action='DESELECT')
    o.select_set(True)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.remove_doubles(threshold=0.0002)
    bpy.ops.object.mode_set(mode='OBJECT')


def add_quaternius(kit, name, file, flat=False):
    """Import one Quaternius file as a node called `name`: transforms baked, empties dropped, parts as children
    <name>_<part>. Cars keep the wheels' origins (their axles) so the game can roll and steer them."""
    fmt = QKITS[kit]
    path = os.path.join(QUATERNIUS, kit, f'{file}.{fmt}')
    if not os.path.exists(path):
        raise SystemExit(f'missing source {path}')
    before = set(bpy.data.objects)
    if fmt == 'fbx':
        bpy.ops.import_scene.fbx(filepath=path)
    else:
        bpy.ops.import_scene.gltf(filepath=path, import_pack_images=True)
    objs = [o for o in bpy.data.objects if o not in before]
    for o in objs:
        if o.name not in bpy.context.view_layer.objects:
            bpy.context.scene.collection.objects.link(o)
    meshes = [o for o in objs if o.type == 'MESH']
    if fmt == 'fbx':                       # the FBX importer leaves Alpha at 0 (an invisible, MASK material once exported)
        for o in meshes:
            for sl in o.material_slots:
                node = principled(sl.material)
                if node:
                    node.inputs['Alpha'].default_value = 1.0
                if sl.material:
                    sl.material.use_backface_culling = True
    for o in meshes:                       # flatten: every mesh at the top, world transform baked into the vertices
        mw = o.matrix_world.copy()
        o.parent = None
        o.matrix_world = mw
        if kit == 'cars':                  # keep the translation (a wheel turns about its own origin)
            rs = mw.copy()
            rs.translation = (0.0, 0.0, 0.0)
            o.data.transform(rs)
            o.matrix_world = Matrix.Translation(mw.to_translation())
        else:
            o.data.transform(mw)
            o.matrix_world = Matrix.Identity(4)
    for o in objs:
        if o.type != 'MESH':
            bpy.data.objects.remove(o)
    if kit in CENTRED:                     # footprint centred on the origin, feet on the floor
        lo, hi = world_bounds(meshes)
        shift = Matrix.Translation((-(lo[0] + hi[0]) / 2, -(lo[1] + hi[1]) / 2, -lo[2]))
        for o in meshes:
            o.data.transform(shift)
    for o in meshes:                       # drop the material slots nothing uses (the car wheels list the body's)
        used = {p.material_index for p in o.data.polygons}
        for i in reversed(range(len(o.material_slots))):
            if i not in used:
                bpy.context.view_layer.objects.active = o
                o.active_material_index = i
                bpy.ops.object.material_slot_remove()
        if flat:
            weld(o)
    if kit == 'stylized-nature-megakit':
        for o in meshes:
            decimate_materials(o, DECIMATE)
    if kit == 'cars':                      # a wheel turns about its origin: put it at the middle of the wheel
        for o in meshes:
            if o.name.split('.')[0] == file:
                continue
            lo, hi = world_bounds([o])
            c = Vector(((lo[0] + hi[0]) / 2, (lo[1] + hi[1]) / 2, (lo[2] + hi[2]) / 2))
            o.data.transform(Matrix.Translation(-(c - o.matrix_world.to_translation())))
            o.matrix_world = Matrix.Translation(c)
        body = next(o for o in meshes if o.name.split('.')[0] == file)
        for sl in body.material_slots:
            if sl.material and sl.material.name.split('.')[0] == CAR_PAINT[name]:
                sl.material.name = 'paint'
    if len(meshes) == 1:
        top = meshes[0]
        top.name = name
        top.data.name = name
        return top, [top]
    top = bpy.data.objects.new(name, None)
    bpy.context.scene.collection.objects.link(top)
    taken = set()
    for o in meshes:
        mw = o.matrix_world.copy()
        o.parent = top
        o.matrix_world = mw
        part = o.name.split('.')[0]
        if kit == 'cars':
            part = 'body' if part == file else CAR_PARTS.get(part.split('_', 1)[1], part.lower())
        base = f'{name}_{part.lower()}'
        n, i = base, 1
        while n in taken:
            i += 1
            n = f'{base}-{i}'
        taken.add(n)
        o.name = n
        o.data.name = n
    return top, meshes + [top]


def export_glb(path, objs, jpeg=False, flat=False):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.select_set(True)
    bpy.ops.export_scene.gltf(filepath=path, export_format='GLB', use_selection=True, export_yup=True,
                              export_apply=False, export_image_format='JPEG' if jpeg else 'AUTO', export_texcoords=True,
                              export_normals=not flat, export_tangents=False, export_materials='EXPORT', export_vertex_color='NONE',
                              export_animations=True, export_animation_mode='ACTIONS', export_skins=True,
                              export_morph=False, export_extras=False, export_cameras=False, export_lights=False)


def build_pack(pack):
    objs, tex = [], {}
    for i, (kit, names) in enumerate(PACKS[pack]):
        if kit.startswith('q:'):
            q = kit[2:]
            for png, mat in MEGAKIT_TEX.items():
                tex[os.path.normpath(os.path.join(QUATERNIUS, q, png))] = mat
            for n, file in names.items():
                top, made = add_quaternius(q, n, file, flat=pack in FLAT)
                objs += made
            continue
        p = os.path.normpath(os.path.join(KENNEY, kit, 'Textures', 'colormap.png'))
        tex[p] = 'colormap' if i == 0 else 'colormap-' + kit.replace('city-kit-', '')
        for n in names:
            top, made = add_piece(kit, n)
            objs += made
    merge_materials(objs, tex)
    recolor(pack)
    return objs


# ---------- smaller vertex data: KHR_mesh_quantization ----------

def quantize_glb(path):
    """Rewrite NORMAL as normalized bytes and TEXCOORD_0 as normalized 16-bit (when in 0..1) in a .glb; the binary
    buffer and its bufferViews are rebuilt. three.js reads both natively (KHR_mesh_quantization)."""
    with open(path, 'rb') as fh:
        d = fh.read()
    jlen = struct.unpack('<I', d[12:16])[0]
    j = json.loads(d[20:20 + jlen])
    blen = struct.unpack('<I', d[20 + jlen:24 + jlen])[0]
    bin_ = d[28 + jlen:28 + jlen + blen]
    old = j['bufferViews']
    views, chunks, copied = [], [], {}
    def add_view(data, target=None, stride=None):
        v = {'buffer': 0, 'byteOffset': 0, 'byteLength': len(data)}
        if target is not None:
            v['target'] = target
        if stride:
            v['byteStride'] = stride
        views.append(v)
        chunks.append(data)
        return len(views) - 1
    def copy_view(i):
        if i not in copied:
            v = old[i]
            off = v.get('byteOffset', 0)
            copied[i] = add_view(bin_[off:off + v['byteLength']], v.get('target'), v.get('byteStride'))
        return copied[i]
    kind = {}          # accessor index -> attribute name
    for mesh in j['meshes']:
        for prim in mesh['primitives']:
            for attr, ai in prim['attributes'].items():
                kind[ai] = attr
    for ai, a in enumerate(j['accessors']):
        attr = kind.get(ai)
        v = old[a['bufferView']]
        off = v.get('byteOffset', 0) + a.get('byteOffset', 0)
        if attr == 'NORMAL' and a['componentType'] == 5126 and not v.get('byteStride'):
            vals = struct.unpack_from(f'<{a["count"] * 3}f', bin_, off)
            q = [max(-127, min(127, round(x * 127))) for x in vals]
            data = b''.join(struct.pack('<bbbb', q[k], q[k + 1], q[k + 2], 0) for k in range(0, len(q), 3))
            a.update({'bufferView': add_view(data, 34962, 4), 'byteOffset': 0, 'componentType': 5120, 'normalized': True, 'min': [-1, -1, -1], 'max': [1, 1, 1]})
        elif attr == 'TEXCOORD_0' and a['componentType'] == 5126 and not v.get('byteStride'):
            vals = struct.unpack_from(f'<{a["count"] * 2}f', bin_, off)
            if min(vals) < 0 or max(vals) > 1:
                a['bufferView'] = copy_view(a['bufferView'])
                continue
            data = struct.pack(f'<{len(vals)}H', *[round(x * 65535) for x in vals])
            a.update({'bufferView': add_view(data, 34962, 4), 'byteOffset': 0, 'componentType': 5123, 'normalized': True, 'min': [0, 0], 'max': [1, 1]})
        else:
            a['bufferView'] = copy_view(a['bufferView'])
    for im in j.get('images', []):
        im['bufferView'] = copy_view(im['bufferView'])
    out, off = [], 0
    for v, c in zip(views, chunks):
        v['byteOffset'] = off
        pad = (4 - len(c) % 4) % 4
        out.append(c + b'\x00' * pad)
        off += len(c) + pad
    j['bufferViews'] = views
    j['buffers'] = [{'byteLength': off}]
    j.setdefault('extensionsUsed', []).append('KHR_mesh_quantization')
    j.setdefault('extensionsRequired', []).append('KHR_mesh_quantization')
    js = json.dumps(j, separators=(',', ':')).encode()
    js += b' ' * ((4 - len(js) % 4) % 4)
    body = b''.join(out)
    with open(path, 'wb') as fh:
        fh.write(b'glTF' + struct.pack('<II', 2, 28 + len(js) + len(body)) + struct.pack('<I', len(js)) + b'JSON' + js
                 + struct.pack('<I', len(body)) + b'BIN\x00' + body)


# ---------- checks on the written .glb ----------

def read_glb(path):
    with open(path, 'rb') as fh:
        d = fh.read()
    n = struct.unpack('<I', d[12:16])[0]
    return json.loads(d[20:20 + n])


def check(pack, path):
    j = read_glb(path)
    nodes = j.get('nodes', [])
    names = [n.get('name') for n in nodes]
    problems = []
    if any('uri' in im for im in j.get('images', [])):
        problems.append('external image uri')
    want = [n for _, ns in PACKS[pack] for n in ns]      # a dict lists its game names
    top = [nodes[i].get('name') for s in j['scenes'] for i in s['nodes']]
    dup = sorted({n for n in names if names.count(n) > 1})
    if dup:
        problems.append(f'duplicate node names {dup}')
    miss = [n for n in want if n not in top]
    extra = [n for n in top if n not in want]
    if miss:
        problems.append(f'missing {miss}')
    if extra:
        problems.append(f'unexpected top nodes {extra}')
    for i in (i for s in j['scenes'] for i in s['nodes']):
        n = nodes[i]
        if any(abs(v) > 1e-6 for v in n.get('translation', [0, 0, 0])) or n.get('rotation', [0, 0, 0, 1]) != [0, 0, 0, 1] and n.get('rotation') is not None:
            problems.append(f'{n.get("name")} not at the origin')
    if pack not in UNTEXTURED and not j.get('images'):
        problems.append('no texture')
    return problems


# ---------- main ----------

def main():
    argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
    keep = copy_from = None
    if '--keep-glb' in argv:
        i = argv.index('--keep-glb')
        keep = argv[i + 1]
        del argv[i:i + 2]
    if '--copy-from' in argv:
        i = argv.index('--copy-from')
        copy_from = argv[i + 1]
        del argv[i:i + 2]
    wanted = []
    for a in argv:
        if a.startswith('--'):
            continue
        wanted.append(a)
    if '--list' in argv:
        for p, parts in PACKS.items():
            print(f'{p:20} {", ".join(k for k, _ in parts):40} {sum(len(n) for _, n in parts)} node(s)')
        return
    unknown = [w for w in wanted if w not in PACKS]
    if unknown:
        raise SystemExit('unknown pack(s): ' + ', '.join(unknown))
    packs = wanted or list(PACKS)
    if copy_from:
        copy_sources(copy_from, packs)
    os.makedirs(OUT, exist_ok=True)
    tmp = keep or tempfile.mkdtemp()
    os.makedirs(tmp, exist_ok=True)
    failed = []
    for pack in packs:
        reset()
        objs = build_pack(pack)
        path = os.path.join(tmp, pack + '.glb')
        export_glb(path, objs, jpeg=pack in JPEG, flat=pack in FLAT)
        if pack in QUANTIZE:
            quantize_glb(path)
        problems = check(pack, path)
        with open(path, 'rb') as fh:
            b64 = base64.b64encode(fh.read()).decode('ascii')
        kits = ', '.join(('Quaternius ' + k[2:] + ' (CC0, quaternius.com)') if k.startswith('q:') else ('Kenney ' + k + ' (CC0, www.kenney.nl)')
                         for k, _ in PACKS[pack])
        with open(os.path.join(OUT, pack + '.js'), 'w') as fh:
            fh.write(f'/* Generated by tools/office-models.py from {kits}. Do not edit. */\n'
                     f"(window.SO_MODELS = window.SO_MODELS || {{}})['{pack}'] = '{b64}';\n")
        limit = LIMITS.get(pack, LIMIT)
        if len(b64) > limit:
            problems.append(f'{len(b64) // 1024} KB base64 is over {limit // 1024} KB')
        print(f'{pack}: glb {os.path.getsize(path) // 1024} KB, js {len(b64) // 1024} KB'
              + ('' if not problems else '  PROBLEMS: ' + '; '.join(problems)))
        if problems:
            failed.append(pack)
    if failed:
        raise SystemExit('failed: ' + ', '.join(failed))


main()

"""Build the model packs of Sim Office (office/) from Kenney's CC0 kits.

    blender -b --python tools/office-models.py                          # every pack
    blender -b --python tools/office-models.py -- city food             # only these
    blender -b --python tools/office-models.py -- --list                # packs, sources and node counts
    blender -b --python tools/office-models.py -- food --keep-glb /tmp/glb   # also keep the .glb (to inspect)
    blender -b --python tools/office-models.py -- --copy-from /tmp/kenney-packs   # first copy the sources

Sources are kenney/<kit>/<name>.glb (+ Textures/colormap.png, License.txt), copied from the unpacked Kenney
zips with --copy-from <dir> (only the files a pack uses). Each pack becomes office/models/<pack>.js: one .glb
as base64 (the game runs from file://, where neither fetch() nor external textures work), with the texture
inside the .glb. The people are not Kenney's: tools/office-characters.py makes them (Quaternius).

- A prop pack (city, roads, cars, furniture, food, extras, nature) holds one node per piece, named exactly like the Kenney file
  (building-a, desk, cup-coffee), at the origin with the file's own origin (feet at y=0). A piece made of
  several nodes (a car with its wheels, a desk with its drawer) keeps them as children named <piece>_<node>
  (sedan_body, sedan_wheel-front-left, desk_drawer). One material per texture ('colormap'); the furniture has
  no texture, its materials are colours (wood, metal, ...) shared across pieces.
"""
import base64
import json
import os
import shutil
import struct
import sys
import tempfile

import bpy
from mathutils import Matrix

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
KENNEY = os.path.join(ROOT, 'kenney')
OUT = os.path.join(ROOT, 'office', 'models')

# kit folder in kenney/ -> (folder in the Kenney zip, models subfolder)
KITS = {
    'city-kit-commercial': ('kenney_city-kit-commercial_2.1', 'Models/GLB format'),
    'city-kit-suburban': ('kenney_city-kit-suburban_20', 'Models/GLB format'),
    'city-kit-roads': ('kenney_city-kit-roads', 'Models/GLB format'),
    'car-kit': ('kenney_car-kit', 'Models/GLB format'),
    'furniture-kit': ('kenney_furniture-kit', 'Models/GLTF format'),
    'food-kit': ('kenney_food-kit', 'Models/GLB format'),
    'mini-market': ('kenney_mini-market', 'Models/GLB format'),
    'mini-arcade': ('kenney_mini-arcade', 'Models/GLB format'),
    'factory-kit': ('kenney_factory-kit_3.0', 'Models/GLB format'),
    'nature-kit': ('kenney_nature-kit', 'Models/GLTF format'),
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

# Nature Kit: colour materials like the furniture (no texture). Trees, bushes, flowers, rocks, paths, a bridge, a few
# park ornaments; for the park, the gardens and the edge of town.
NATURE = """tree_oak tree_oak_fall tree_default tree_default_fall tree_detailed tree_detailed_dark tree_fat tree_fat_fall
tree_small tree_small_fall tree_tall tree_thin tree_thin_fall tree_pineDefaultA tree_pineRoundA tree_pineTallA
tree_pineSmallA tree_simple tree_plateau tree_cone plant_bush plant_bushDetailed plant_bushLarge plant_bushSmall
plant_flatShort plant_flatTall grass grass_large grass_leafs flower_purpleA flower_purpleB flower_redA flower_redB
flower_yellowA flower_yellowB lily_large lily_small rock_smallA rock_smallB rock_smallC rock_largeA rock_largeB rock_tallA
stone_smallA stone_largeA stump_round stump_old log log_large fence_simple fence_simpleLow fence_gate fence_planks
path_stone path_stoneCircle path_stoneCorner path_stoneEnd path_wood path_woodCorner path_woodEnd bridge_wood
bridge_stoneRound sign statue_column statue_obelisk statue_block pot_large pot_small mushroom_red mushroom_tanGroup
canoe""".split()

# pack -> list of (kit, [piece names]); the first kit's texture is the material 'colormap', others 'colormap-<kit>'
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
    'cars': [('car-kit', ['sedan', 'sedan-sports', 'suv', 'hatchback-sports', 'taxi', 'van', 'delivery', 'police', 'truck',
                          'ambulance', 'wheel-default'])],
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
    'nature': [('nature-kit', NATURE)],
}
UNTEXTURED = {'furniture', 'nature'}      # colour materials only

# The Nature Kit's own palette is mint and orange (a stylised look of its own); the game recolours its named
# materials to the greens and browns of the Kenney city kits it stands next to. sRGB hex per material name.
RECOLOR = {
    'nature': {
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
            raise SystemExit(f'{pack}: no material {name} to recolour')
        node.inputs['Base Color'].default_value = srgb_to_linear(hex_color)

LIMIT = 3 * 1024 * 1024   # base64 bytes per pack


# ---------- sources ----------

def src(kit, name):
    return os.path.join(KENNEY, kit, name + '.glb')


def copy_sources(zips, packs):
    """Copy the .glb files the packs use, their texture and License.txt from the unpacked Kenney zips to kenney/<kit>/."""
    for pack in packs:
        for kit, names in PACKS[pack]:
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


def export_glb(path, objs):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.select_set(True)
    bpy.ops.export_scene.gltf(filepath=path, export_format='GLB', use_selection=True, export_yup=True,
                              export_apply=False, export_image_format='AUTO', export_texcoords=True,
                              export_normals=True, export_tangents=False, export_materials='EXPORT',
                              export_animations=True, export_animation_mode='ACTIONS', export_skins=True,
                              export_morph=False, export_extras=False, export_cameras=False, export_lights=False)


def build_pack(pack):
    objs, tex = [], {}
    for i, (kit, names) in enumerate(PACKS[pack]):
        p = os.path.normpath(os.path.join(KENNEY, kit, 'Textures', 'colormap.png'))
        tex[p] = 'colormap' if i == 0 else 'colormap-' + kit.replace('city-kit-', '')
        for n in names:
            top, made = add_piece(kit, n)
            objs += made
    merge_materials(objs, tex)
    recolor(pack)
    return objs


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
    want = [n for _, ns in PACKS[pack] for n in ns]
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
        export_glb(path, objs)
        problems = check(pack, path)
        with open(path, 'rb') as fh:
            b64 = base64.b64encode(fh.read()).decode('ascii')
        kits = ', '.join('Kenney ' + k for k, _ in PACKS[pack])
        with open(os.path.join(OUT, pack + '.js'), 'w') as fh:
            fh.write(f'/* Generated by tools/office-models.py from {kits} (CC0, www.kenney.nl). Do not edit. */\n'
                     f"(window.SO_MODELS = window.SO_MODELS || {{}})['{pack}'] = '{b64}';\n")
        if len(b64) > LIMIT:
            problems.append(f'{len(b64) // 1024} KB base64 is over {LIMIT // 1024} KB')
        print(f'{pack}: glb {os.path.getsize(path) // 1024} KB, js {len(b64) // 1024} KB'
              + ('' if not problems else '  PROBLEMS: ' + '; '.join(problems)))
        if problems:
            failed.append(pack)
    if failed:
        raise SystemExit('failed: ' + ', '.join(failed))


main()

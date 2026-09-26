"""Build the people of Sim Office (office/) from Quaternius' CC0 character packs.

    blender -b --python tools/office-characters.py                           # every person and both rigs
    blender -b --python tools/office-characters.py -- man-suit woman-dress-2 # only these (a rig id builds that rig)
    blender -b --python tools/office-characters.py -- --list                 # ids, sources and colours
    blender -b --python tools/office-characters.py -- men --keep-glb /tmp/glb   # also keep the .glb files ('men', 'women', 'rigs')

Sources (only the files used are in the repo; the two packs are built alike, https://quaternius.com/packs/ultimatemodularmen.html
and https://quaternius.com/packs/ultimatemodularwomen.html):
- quaternius/ultimate-modular-characters/<Outfit>.gltf: Quaternius "Ultimate Modular Men" (Suit, Casual_2, Casual_Hoodie,
  Worker, Adventurer, Farmer; exported by Quaternius from his Humans_Master.blend, which is not copied here). Every file
  has the same 62-bone armature 'CharacterArmature' and its parts as separate skinned meshes <Outfit>_Head/_Body/_Legs/_Feet,
  so a person is put together from parts of several outfits (a suit body with another head).
- quaternius/ultimate-modular-women/<Outfit>.glb: Quaternius "Ultimate Modular Women" (Casual, Formal, Suit, Adventurer,
  Punk): the same armature (bone names and rest pose of their own), the same four parts per outfit, the same 24 actions.
  Google Drive refuses the pack's own files (download quota), so these are the pack's .fbx files as poly.pizza serves them
  (FBX2glTF): the armature under a 'RootNode' scaled by 100 (centimetres), actions named 'CharacterArmature|<name>' whose
  keys run 1.25 x slow (30 fps frames read as 24 fps), and 'Formad_Head' (sic) in Formal.glb; normalize_fbx() undoes that.

Output, one .glb as base64 per file (the game runs from file://): office/models/<id>.js with
`(window.SO_MODELS = window.SO_MODELS || {})['<id>'] = '<base64>';`
- A person (man-*, woman-*): the armature (node <id>, glTF extras {"rig": "rig-umc" | "rig-women"}) and one skinned mesh
  <id>-mesh, NO animations. Feet at y=0, facing +Z, height HEIGHT (scale baked into the mesh and the bones), colour
  materials only (no texture, no UVs), smooth vertex normals (shared vertices: small files; the engine draws them flat).
- A rig (rig-umc, rig-women): the same armature with no mesh and the animations under the engine's names (CLIPS), for
  every person of that rig (the bones have the same names and rest pose). glTF extras on the armature node: walk_speed and
  run_speed (ground speed of the feet in the walk / sprint cycle, units per second) and seat (hip height of 'sit').
  Made here: 'sit' (a still pose on a seat SEAT high), 'emote-no' (a head shake) and, for the women, 'interact-right'
  (a small right-hand gesture); the rest are Quaternius' own (CLIPS).
"""
import base64
import json
import math
import os
import struct
import sys
import tempfile

import bpy
from mathutils import Matrix, Quaternion, Vector

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
UMC = os.path.join(ROOT, 'quaternius', 'ultimate-modular-characters')
WOMEN = os.path.join(ROOT, 'quaternius', 'ultimate-modular-women')
OUT = os.path.join(ROOT, 'office', 'models')

SRC = {'umc': (UMC, '.gltf'), 'women': (WOMEN, '.glb')}     # rig -> source folder and file type
HEIGHT = {'umc': 0.96, 'women': 0.94}      # top of the head (a bare head; a cap adds a little)
TOP = {'umc': 1.856, 'women': 1.797}       # top of the hair in the source (Suit / Casual head, Blender units)
FBX_FPS = 24 / 30                          # women: the FBX2glTF keys' time scale (see normalize_fbx)
SEAT = 0.24                              # seat height of the Kenney chairs and benches (chair, chairDesk, bench)
HIP_OVER_SEAT = 0.05                     # hip joint above the seat when sitting
LIMIT = {'person': 400 * 1024, 'rig': 400 * 1024}   # base64 bytes

# engine clip name -> source action (None: made here)
CLIPS = {
    'umc': {'idle': 'Idle_Neutral', 'walk': 'Walk', 'sprint': 'Run', 'sit': None, 'emote-yes': 'Wave', 'emote-no': None,
            'interact-right': 'Interact'},
    'women': {'idle': 'Idle_Neutral', 'walk': 'Walk', 'sprint': 'Run', 'sit': None, 'emote-yes': 'Wave', 'emote-no': None,
              'interact-right': 'Interact'},
}
RIG_SOURCE = {'rig-umc': 'Suit', 'rig-women': 'Casual'}     # the outfit file whose animations make the rig

# ---------- the people ----------
# colours are sRGB hex. A key 'Mat' recolours that material everywhere, 'part:Mat' only on that part (head, body, legs, feet).
SKIN = {'light': '#f2c7a0', 'fair': '#e8b48c', 'tan': '#c98f62', 'brown': '#9c6a45', 'dark': '#6e4a33'}
HAIR = {'black': '#1f1a17', 'dark': '#3a2a1f', 'brown': '#6b4a2e', 'auburn': '#8a3f22', 'blond': '#c9a55a', 'grey': '#9a9794'}


def person(rig, head, body, legs, feet, colors, note):
    return {'rig': rig, 'parts': {'head': head, 'body': body, 'legs': legs, 'feet': feet}, 'colors': colors or {}, 'note': note}


def man(head, body, legs, feet, colors=None, note=''):
    return person('umc', head, body, legs, feet, colors, note)


def woman(head, body, legs, feet, colors=None, note=''):
    return person('women', head, body, legs, feet, colors, note)


PEOPLE = {
    # --- men (UMC parts: outfit name as the file, part as the mesh) ---
    'man-suit': man('Suit', 'Suit', 'Suit', 'Suit', {'Suit': '#2b3440', 'Tie': '#7a2330', 'Skin': SKIN['fair'], 'Hair': HAIR['grey']},
                    'navy suit, red tie, grey hair'),
    'man-suit-2': man('Casual_2', 'Suit', 'Suit', 'Suit', {'Suit': '#6e737a', 'Tie': '#2f4f7a', 'Skin': SKIN['brown'], 'Skin_Darker': '#83573a',
                                                            'Hair': HAIR['black']}, 'grey suit, blue tie'),
    'man-casual': man('Suit', 'Casual_2', 'Casual_2', 'Suit', {'LightBrown': '#3f6fa8', 'LightBlue': '#b8a27a', 'Skin': SKIN['light'],
                                                                'Hair': HAIR['brown']}, 'blue polo, khakis'),
    'man-casual-2': man('Casual_Hoodie', 'Casual_2', 'Casual_2', 'Casual_2', {'LightBrown': '#3b3f46', 'LightBlue': '#34507a',
                                                                              'Red_Dark': '#2d2d2d', 'Skin': SKIN['tan'], 'Hair': HAIR['black']},
                        'charcoal tee, jeans'),
    'man-hoodie': man('Adventurer', 'Casual_Hoodie', 'Casual_2', 'Casual_2', {'Purple': '#56705a', 'LightBlue': '#2e4466', 'Red_Dark': '#8c8c8c',
                                                                              'Skin': SKIN['fair'], 'Hair': HAIR['dark'], 'Eyebrows': HAIR['dark']},
                      'green hoodie, jeans, beard'),
    'man-hoodie-2': man('Casual_Hoodie', 'Casual_Hoodie', 'Casual_2', 'Casual_Hoodie', {'Purple': '#2c3a5c', 'LightBlue': '#3d5d8a',
                                                                                         'Skin': SKIN['dark'], 'Hair': HAIR['black']},
                        'navy hoodie, jeans'),
    'man-worker': man('Casual_Hoodie', 'Worker', 'Casual_2', 'Worker', {'Worker_Vest': '#2f7a4c', 'Worker_Yellow': '#e3d9c4', 'LightBrown': '#e9e4d8',
                                                                        'LightBlue': '#2e4466', 'Skin': SKIN['light'], 'Hair': HAIR['blond']},
                      'green store vest over a white shirt'),
    'man-worker-2': man('Suit', 'Worker', 'Suit', 'Suit', {'Worker_Vest': '#23304a', 'Worker_Yellow': '#8fa3b8', 'LightBrown': '#8fa3b8',
                                                           'Suit': '#1d2433', 'Skin': SKIN['brown'], 'Hair': HAIR['black']},
                        'dark navy uniform vest, blue-grey shirt'),
    'man-farmer': man('Adventurer', 'Farmer', 'Farmer', 'Farmer', {'LightBlue': '#4d6a8a', 'body:Brown': '#a8473a', 'Beige': '#d8cbb0',
                                                                   'Skin': SKIN['fair'], 'Hair': HAIR['grey'], 'Eyebrows': '#7d7a77'},
                      'overalls over a red shirt, work gloves, grey hair and beard'),
    'man-adventurer': man('Adventurer', 'Adventurer', 'Adventurer', 'Adventurer', {'Skin': SKIN['tan']}, 'field jacket, cargo pants, beard'),
    'man-casual-3': man('Casual_Hoodie', 'Suit', 'Casual_2', 'Suit', {'Suit': '#7a5a3f', 'White': '#a9c4e0', 'Tie': '#a9c4e0',
                                                                      'LightBlue': '#34507a', 'Black': '#5a3b26', 'Skin': SKIN['light'],
                                                                      'Hair': HAIR['auburn']}, 'brown blazer, blue shirt, jeans'),
    # --- women (Ultimate Modular Women parts, like the men). Heads: Casual (long hair Hair_Blond, brows Hair_Brown),
    # Formal (long hair Red), Adventurer (short hair Hair_Brown); the Punk head (a mohawk) is too tall ---
    'woman-suit': woman('Casual', 'Suit', 'Suit', 'Suit', {'Black': '#2b3440', 'White': '#eef0f2', 'Skin': SKIN['fair'],
                                                           'head:Hair_Blond': HAIR['black'], 'head:Hair_Brown': HAIR['black']},
                        'navy pantsuit, white blouse, black hair'),
    'woman-suit-2': woman('Formal', 'Suit', 'Suit', 'Suit', {'Black': '#6b2232', 'White': '#f0ece4', 'Skin': SKIN['light'],
                                                             'head:Red': HAIR['brown']}, 'burgundy suit (hotel uniform), brown hair'),
    'woman-casual': woman('Casual', 'Casual', 'Casual', 'Casual', {'White': '#7d9c7a', 'Orange': '#3a3f4a', 'Skin': SKIN['brown'],
                                                                   'head:Hair_Blond': HAIR['dark'], 'head:Hair_Brown': HAIR['dark']},
                          'sage tee, dark trousers, long dark hair'),
    'woman-casual-2': woman('Casual', 'Casual', 'Casual', 'Casual', {'White': '#2f7f86', 'Orange': '#2e3038', 'Skin': SKIN['brown'],
                                                                     'head:Hair_Blond': HAIR['black'], 'head:Hair_Brown': HAIR['black']},
                            'teal top, charcoal trousers'),
    'woman-casual-3': woman('Casual', 'Casual', 'Casual', 'Casual', {'White': '#e58f9a', 'Orange': '#1f1f24', 'Grey': '#1f1f24',
                                                                     'Skin': SKIN['tan'], 'head:Hair_Blond': HAIR['dark'],
                                                                     'head:Hair_Brown': HAIR['dark']}, 'pink diner tee, black trousers'),
    'woman-formal': woman('Formal', 'Formal', 'Formal', 'Formal', {'LimeGreen': '#a63d4a', 'Gold': '#d9b25c', 'Skin': SKIN['fair'],
                                                                   'head:Red': HAIR['blond'], 'feet:Red': '#4a2a2a'}, 'red dress, blond hair'),
    'woman-formal-2': woman('Formal', 'Formal', 'Formal', 'Formal', {'LimeGreen': '#1f5f5b', 'Gold': '#3a3a40', 'Skin': SKIN['light'],
                                                                     'head:Red': HAIR['black'], 'feet:Red': '#1f1f24'}, 'dark teal dress, black hair'),
    'woman-formal-3': woman('Formal', 'Formal', 'Formal', 'Formal', {'LimeGreen': '#27406e', 'Gold': '#c9a55a', 'Skin': SKIN['fair'],
                                                                     'head:Red': HAIR['auburn'], 'feet:Red': '#1f1f24'}, 'navy uniform dress, auburn hair'),
    'woman-adventurer': woman('Adventurer', 'Adventurer', 'Adventurer', 'Adventurer', {'Skin': SKIN['tan']},
                              'field jacket, shorts, boots, short brown hair'),
    'woman-adventurer-2': woman('Adventurer', 'Adventurer', 'Adventurer', 'Adventurer', {'LightGreen': '#d9a441', 'Green': '#b98a30',
                                                                                         'Skin': SKIN['light'], 'head:Hair_Brown': HAIR['auburn']},
                                'mustard shirt, shorts, auburn hair'),
    'woman-punk': woman('Casual', 'Punk', 'Punk', 'Punk', {'Pink': '#3f5fa8', 'Black': '#2a2a2e', 'Skin': SKIN['dark'],
                                                           'head:Hair_Blond': HAIR['black'], 'head:Hair_Brown': HAIR['black']},
                        'blue crop top, black pants'),
}
RIGS = {'rig-umc': 'umc', 'rig-women': 'women'}
PART_MESH = {'head': '_Head', 'body': '_Body', 'legs': '_Legs', 'feet': '_Feet'}
MESH_PREFIX = {'Casual_2': 'Casual2', 'Casual_Hoodie': 'Casual'}                        # file -> mesh name prefix
MESH_NAME = {('umc', 'Farmer', 'legs'): 'Farmer_Pants', ('women', 'Formal', 'head'): 'Formad_Head'}


# ---------- Blender helpers ----------

def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def srgb_to_linear(h):
    h = h.lstrip('#')
    out = []
    for i in (0, 2, 4):
        c = int(h[i:i + 2], 16) / 255
        out.append(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4)
    return out + [1.0]


def principled(mat):
    return next((n for n in mat.node_tree.nodes if n.type == 'BSDF_PRINCIPLED'), None) if mat and mat.use_nodes else None


def base_color(mat):
    b = principled(mat)
    return list(b.inputs['Base Color'].default_value) if b else list(mat.diffuse_color)


def colour_material(name, rgba):
    m = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    m.use_nodes = True
    b = principled(m)
    if b is None:
        m.node_tree.nodes.clear()
        b = m.node_tree.nodes.new('ShaderNodeBsdfPrincipled')
        o = m.node_tree.nodes.new('ShaderNodeOutputMaterial')
        m.node_tree.links.new(b.outputs[0], o.inputs[0])
    for n in list(m.node_tree.nodes):          # a plain colour: drop any texture or colour ramp feeding the BSDF
        if n.type not in ('BSDF_PRINCIPLED', 'OUTPUT_MATERIAL'):
            m.node_tree.nodes.remove(n)
    b.inputs['Base Color'].default_value = rgba
    b.inputs['Roughness'].default_value = 0.9
    b.inputs['Metallic'].default_value = 0.0
    m.diffuse_color = rgba
    return m


MADE = {}      # material name -> the clean colour material made for the person being built


def recolour(ob, part, colors):
    """Give every slot of `ob` a clean colour material named after the source material (Skin, Hair, ...), recoloured
    by colors['part:Mat'] or colors['Mat']. A part-specific colour gets its own material 'Mat-part'."""
    for slot in ob.material_slots:
        src = slot.material
        if not src:
            continue
        base = src.name.split('.')[0]
        key = f'{part}:{base}'
        name = f'{base}-{part}' if key in colors else base
        if name not in MADE:
            rgba = srgb_to_linear(colors[key] if key in colors else colors[base]) if (key in colors or base in colors) else base_color(src)
            MADE[name] = colour_material(name + '~new', rgba)
        slot.material = MADE[name]
    return ob


def tidy_materials():
    made = set(MADE.values())
    for m in list(bpy.data.materials):
        if m not in made:
            bpy.data.materials.remove(m)
    for m in list(bpy.data.materials):
        if m.name.endswith('~new'):
            m.name = m.name[:-4]
    MADE.clear()


def import_gltf(path):
    if not os.path.exists(path):
        raise SystemExit(f'missing source {path}')
    before = set(bpy.data.objects)
    acts = set(bpy.data.actions)
    bpy.ops.import_scene.gltf(filepath=path, merge_vertices=True, import_shading='SMOOTH')
    objs = [o for o in bpy.data.objects if o not in before]
    if path.endswith('.glb'):
        objs = normalize_fbx(objs, [a for a in bpy.data.actions if a not in acts])
    return objs


def import_outfit(rig, outfit):
    folder, ext = SRC[rig]
    return import_gltf(os.path.join(folder, outfit + ext))


def normalize_fbx(objs, actions):
    """An FBX2glTF file (the women) as if Quaternius had exported it: the armature at the origin at scale 1 (the RootNode's
    scale of 100 baked into the bones, the mesh and the location keys), the parts its children, the helper empties gone,
    the actions named as in the men's files and their keys at the source's speed (times x 24/30)."""
    arm = next(o for o in objs if o.type == 'ARMATURE')
    meshes = [o for o in objs if o.type == 'MESH' and o.parent is arm]
    M = arm.matrix_world.copy()
    sc = M.to_scale()
    if max(sc) - min(sc) > 1e-4:
        raise SystemExit(f'{arm.name}: non-uniform scale {tuple(sc)}')
    for o in meshes:
        mw = o.matrix_world.copy()
        o.parent = None
        o.matrix_world = mw
    arm.parent = None
    arm.matrix_world = M
    bpy.ops.object.select_all(action='DESELECT')
    for o in [arm] + meshes:
        o.select_set(True)
    bpy.context.view_layer.objects.active = arm
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    for o in meshes:
        o.parent = arm
        o.matrix_parent_inverse = Matrix.Identity(4)
        o.matrix_basis = Matrix.Identity(4)
        for m in o.modifiers:
            if m.type == 'ARMATURE':
                m.object = arm
    for a in actions:
        a.name = a.name.split('|', 1)[-1]
        for fc in fcurves(a):
            loc = fc.data_path.endswith('.location')
            for k in fc.keyframe_points:
                for pt in (k.co, k.handle_left, k.handle_right):
                    pt.x *= FBX_FPS
                    if loc:
                        pt.y *= sc.x
    for o in objs:
        if o is not arm and o not in meshes:
            bpy.data.objects.remove(o, do_unlink=True)
    return [arm] + meshes


def fcurves(action):
    out = []
    for layer in action.layers:
        for strip in layer.strips:
            for bag in strip.channelbags:
                out += list(bag.fcurves)
    return out


def scale_rig(arm, s):
    """Bake a uniform scale into the bones (rest) and into every action's bone locations."""
    bpy.context.view_layer.objects.active = arm
    bpy.ops.object.mode_set(mode='EDIT')
    ends = {eb.name: (eb.head * s, eb.tail * s, eb.roll) for eb in arm.data.edit_bones}
    for eb in arm.data.edit_bones:        # absolute values: moving a connected child's head moves its parent's tail too
        eb.head, eb.tail, eb.roll = ends[eb.name]
    bpy.ops.object.mode_set(mode='OBJECT')
    for a in bpy.data.actions:
        for fc in fcurves(a):
            if fc.data_path.endswith('.location'):
                for k in fc.keyframe_points:
                    k.co.y *= s
                    k.handle_left.y *= s
                    k.handle_right.y *= s


def clear_anim(arm):
    ad = arm.animation_data
    if ad:
        for t in list(ad.nla_tracks):
            ad.nla_tracks.remove(t)
        ad.action = None
    for pb in arm.pose.bones:
        pb.matrix_basis = Matrix.Identity(4)


UMC_FINGERS = ('Index', 'Middle', 'Ring', 'Pinky', 'Thumb')


def is_umc_finger(name):
    return name.startswith(UMC_FINGERS)


def relax_fingers(arm, meshes, rig):
    """Make the fingers' pose in the first idle frame (a relaxed hand) their rest pose, in the meshes and the bones, so
    the clips need no finger channels (the rig drops them). The rig and every person of it do the same, so they match."""
    idle = bpy.data.actions.get(CLIPS[rig]['idle'])
    if idle is None:
        raise SystemExit('no idle action for the fingers')
    use_action(arm, idle)
    bpy.context.scene.frame_set(0)
    bpy.context.view_layer.update()
    basis = {pb.name: pb.matrix_basis.copy() for pb in arm.pose.bones if is_umc_finger(pb.name)}
    use_action(arm, None)
    for pb in arm.pose.bones:
        pb.matrix_basis = basis.get(pb.name, Matrix.Identity(4))
    bpy.context.view_layer.update()
    for ob in meshes:
        mod = next(m for m in ob.modifiers if m.type == 'ARMATURE')
        name = mod.name
        bpy.ops.object.select_all(action='DESELECT')
        bpy.context.view_layer.objects.active = ob
        ob.select_set(True)
        bpy.ops.object.modifier_apply(modifier=name)
        m = ob.modifiers.new(name, 'ARMATURE')
        m.object = arm
    bpy.ops.object.select_all(action='DESELECT')
    bpy.context.view_layer.objects.active = arm
    arm.select_set(True)
    bpy.ops.object.mode_set(mode='POSE')
    for pb in arm.pose.bones:
        if hasattr(pb, 'select'):
            pb.select = is_umc_finger(pb.name)
        else:
            pb.bone.select = is_umc_finger(pb.name)
    bpy.ops.pose.armature_apply(selected=True)
    bpy.ops.object.mode_set(mode='OBJECT')
    for pb in arm.pose.bones:
        pb.matrix_basis = Matrix.Identity(4)


def prune_actions(actions, drop=lambda bone: False, eps=1e-4):
    """Drop the channels of bones in `drop`, and every channel that stays at the rest value (location 0, rotation
    identity, scale 1) for the whole clip: a clip without a track leaves that bone at rest in three.js."""
    for a in actions:
        groups = {}
        for fc in fcurves(a):
            if '"' not in fc.data_path:
                continue
            bone = fc.data_path.split('"')[1]
            prop = fc.data_path.rsplit('.', 1)[-1]
            groups.setdefault((bone, prop), []).append(fc)
        for (bone, prop), fcs in groups.items():
            rest = {'location': [0, 0, 0], 'rotation_quaternion': [1, 0, 0, 0], 'scale': [1, 1, 1],
                    'rotation_euler': [0, 0, 0]}.get(prop)
            still = rest is not None and all(abs(k.co.y - rest[fc.array_index]) < eps for fc in fcs for k in fc.keyframe_points)
            if drop(bone) or still or prop == 'scale':
                for fc in fcs:
                    for layer in a.layers:
                        for strip in layer.strips:
                            for bag in strip.channelbags:
                                if fc in list(bag.fcurves):
                                    bag.fcurves.remove(fc)


def use_action(arm, act):
    ad = arm.animation_data or arm.animation_data_create()
    ad.action = act
    if act is not None and getattr(act, 'slots', None) and len(act.slots):
        ad.action_slot = act.slots[0]


def export_glb(path, objs, animations):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.select_set(True)
    bpy.ops.export_scene.gltf(filepath=path, export_format='GLB', use_selection=True, export_yup=True, export_apply=False,
                              export_texcoords=False, export_normals=True, export_tangents=False, export_materials='EXPORT',
                              export_animations=animations, export_animation_mode='ACTIONS', export_force_sampling=False,
                              export_optimize_animation_size=True, export_anim_slide_to_zero=True, export_reset_pose_bones=True,
                              export_skins=True, export_influence_nb=4, export_morph=False, export_extras=True,
                              export_cameras=False, export_lights=False, export_def_bones=False, export_leaf_bone=False)


# ---------- people ----------

def mesh_name(rig, outfit, part):
    return MESH_NAME.get((rig, outfit, part)) or MESH_PREFIX.get(outfit, outfit) + PART_MESH[part]


def build_person(pid, spec):
    rig = spec['rig']
    s = HEIGHT[rig] / TOP[rig]
    arm = None
    parts = []
    loaded = {}
    for part in ('body', 'head', 'legs', 'feet'):
        outfit = spec['parts'][part]
        if outfit not in loaded:
            loaded[outfit] = import_outfit(rig, outfit)
        objs = loaded[outfit]
        want = mesh_name(rig, outfit, part)
        ob = next((o for o in objs if o.type == 'MESH' and o.name.split('.')[0] == want), None)
        if ob is None:
            raise SystemExit(f'{pid}: no mesh {want} in {outfit}{SRC[rig][1]}')
        if arm is None:
            arm = next(o for o in objs if o.type == 'ARMATURE')
        mw = ob.matrix_world.copy()
        ob.parent = arm
        ob.matrix_world = mw
        for m in ob.modifiers:
            if m.type == 'ARMATURE':
                m.object = arm
        recolour(ob, part, spec['colors'])
        ob.name = f'{pid}-{part}'
        parts.append(ob)
    keep = set(parts) | {arm}
    for o in list(bpy.data.objects):
        if o not in keep:
            bpy.data.objects.remove(o, do_unlink=True)
    clear_anim(arm)
    relax_fingers(arm, parts, rig)
    for a in list(bpy.data.actions):
        bpy.data.actions.remove(a)
    return finish_person(pid, arm, parts, s, 'rig-' + rig)


def finish_person(pid, arm, parts, s, rig):
    tidy_materials()
    # one mesh, smooth shaded, scale baked in
    bpy.ops.object.select_all(action='DESELECT')
    for o in parts:
        o.select_set(True)
    bpy.context.view_layer.objects.active = parts[0]
    if len(parts) > 1:
        bpy.ops.object.join()
    mesh = bpy.context.view_layer.objects.active
    for m in list(mesh.modifiers):
        if m.type != 'ARMATURE':
            mesh.modifiers.remove(m)
    me = mesh.data
    while me.uv_layers:
        me.uv_layers.remove(me.uv_layers[0])
    for a in list(me.color_attributes):
        me.color_attributes.remove(a)
    for a in list(me.attributes):
        if a.name in ('sharp_face', 'sharp_edge'):
            me.attributes.remove(a)
    if me.has_custom_normals:
        bpy.ops.mesh.customdata_custom_splitnormals_clear()
    me.shade_smooth()
    # bake the object transforms, then the scale
    for o in (arm, mesh):
        if any(abs(v) > 1e-6 for v in o.location) or any(abs(v) > 1e-6 for v in o.rotation_euler) or any(abs(v - 1) > 1e-6 for v in o.scale):
            raise SystemExit(f'{pid}: {o.name} is not at the origin')
    me.transform(Matrix.Scale(s, 4))
    scale_rig(arm, s)
    mesh.name = me.name = pid + '-mesh'
    arm.name = pid
    arm.data.name = pid
    arm['rig'] = rig
    return [arm, mesh]


# ---------- rigs: the shared animations ----------

def arm_space_follow(pb):
    """The armature-space matrix of pb when its own pose is the rest pose (it only follows its parent)."""
    if pb.parent is None:
        return pb.bone.matrix_local.copy()
    return pb.parent.matrix @ pb.parent.bone.matrix_local.inverted() @ pb.bone.matrix_local


def rotate_about_head(pb, axis, deg):
    M = pb.matrix.copy()
    h = M.translation.copy()
    pb.matrix = Matrix.Translation(h) @ Matrix.Rotation(math.radians(deg), 4, axis) @ Matrix.Translation(-h) @ M
    bpy.context.view_layer.update()


def pose_from(arm, act, frame):
    use_action(arm, act)
    bpy.context.scene.frame_set(frame)
    bpy.context.view_layer.update()
    return {pb.name: pb.matrix_basis.copy() for pb in arm.pose.bones}


def set_pose(arm, basis):
    use_action(arm, None)
    for pb in arm.pose.bones:
        pb.matrix_basis = basis.get(pb.name, Matrix.Identity(4))
    bpy.context.view_layer.update()


def key_pose(arm, act, frame):
    use_action(arm, act)
    for pb in arm.pose.bones:
        pb.rotation_mode = 'QUATERNION'
        pb.keyframe_insert('location', frame=frame, group=pb.name)
        pb.keyframe_insert('rotation_quaternion', frame=frame, group=pb.name)


def new_action(arm, name, keys):
    """keys: list of (frame, {bone: matrix_basis}). The action holds every bone at every key."""
    act = bpy.data.actions.new(name)
    for frame, basis in keys:
        set_pose(arm, basis)
        key_pose(arm, act, frame)
    use_action(arm, None)
    return act


def sit_pose(arm, base, s, poles=None, arms=(-14, -38)):
    """From a standing pose (bone -> matrix_basis): the body down so the hips are SEAT + HIP_OVER_SEAT high, thighs
    forward, shins straight down, the feet (bones of their own under the root) under the knees, forearms on the thighs.
    Both rigs name these bones alike: Body, UpperLeg.L/R, LowerLeg.L/R, Foot.L/R, UpperArm.L/R, LowerArm.L/R."""
    set_pose(arm, base)
    pb = arm.pose.bones
    hip_now = (pb['UpperLeg.L'].head.z + pb['UpperLeg.R'].head.z) / 2
    pb['Body'].matrix = Matrix.Translation((0, 0, (SEAT + HIP_OVER_SEAT) / s - hip_now)) @ pb['Body'].matrix
    bpy.context.view_layer.update()
    for side in 'LR':
        ul, ll, ft = pb['UpperLeg.' + side], pb['LowerLeg.' + side], pb['Foot.' + side]
        out = 4 if side == 'L' else -4           # knees a little apart
        ul.matrix = (Matrix.Translation(ul.matrix.translation) @ Matrix.Rotation(math.radians(out), 4, 'Z')
                     @ Matrix.Rotation(math.radians(-88), 4, 'X') @ ul.bone.matrix_local.to_3x3().to_4x4())
        bpy.context.view_layer.update()
        knee = ll.matrix.translation.copy()
        ll.matrix = Matrix.Translation(knee) @ Matrix.Rotation(math.radians(-4), 4, 'X') @ ll.bone.matrix_local.to_3x3().to_4x4()
        bpy.context.view_layer.update()
        ankle = ll.matrix @ Vector((0, ll.bone.length, 0))
        rest_ankle = ll.bone.tail_local
        ft.matrix = Matrix.Translation(ankle - rest_ankle) @ ft.bone.matrix_local
        if poles and pb.get(poles + side):
            pt = pb[poles + side]
            pt.matrix = Matrix.Translation(ankle - rest_ankle + Vector((0, -0.3 / s * 0.05, 0.3 / s * 0.05))) @ pt.bone.matrix_local
        bpy.context.view_layer.update()
        rotate_about_head(pb['UpperArm.' + side], 'X', arms[0])
        rotate_about_head(pb['LowerArm.' + side], 'X', arms[1])
    return {b.name: b.matrix_basis.copy() for b in pb}


def head_shake(arm, base, head='Head', neck='Neck'):
    """Shake the head (a 'no'): yaw about the head bone's own axis (it points up)."""
    keys = []
    for f, a in [(0, 0), (6, 24), (13, -24), (20, 20), (27, -14), (33, 0), (40, 0)]:
        b = dict(base)
        q = Quaternion((0, 1, 0), math.radians(a * 0.7))
        b[head] = base[head] @ q.to_matrix().to_4x4()
        qn = Quaternion((0, 1, 0), math.radians(a * 0.3))
        b[neck] = base[neck] @ qn.to_matrix().to_4x4()
        keys.append((f, b))
    return keys


def foot_speed(arm, act, foot, fps):
    """Ground speed of an in-place cycle: how fast the foot moves back while it is down."""
    use_action(arm, act)
    f0, f1 = int(act.frame_range[0]), int(act.frame_range[1])
    pts = []
    for f in range(f0, f1 + 1):
        bpy.context.scene.frame_set(f)
        p = arm.matrix_world @ arm.pose.bones[foot].head
        pts.append((p.y, p.z))
    low = min(z for _, z in pts)
    v = [abs(pts[i + 1][0] - pts[i][0]) * fps for i in range(len(pts) - 1)
         if pts[i][1] < low + 0.02 * (max(z for _, z in pts) - low + 1e-6) + 0.01 and pts[i + 1][1] < low + 0.05]
    v.sort()
    use_action(arm, None)
    return v[len(v) // 2] if v else 0.0


def build_rig(rid):
    rig = RIGS[rid]
    objs = import_outfit(rig, RIG_SOURCE[rid])
    arm = next(o for o in objs if o.type == 'ARMATURE')
    for o in list(bpy.data.objects):
        if o is not arm:
            bpy.data.objects.remove(o, do_unlink=True)
    clear_anim(arm)
    relax_fingers(arm, [], rig)
    s = HEIGHT[rig] / TOP[rig]
    fps = bpy.context.scene.render.fps
    acts = {}
    for clip, src in CLIPS[rig].items():
        if src:
            a = bpy.data.actions.get(src)
            if a is None:
                raise SystemExit(f'{rid}: no action {src}')
            acts[clip] = a
    idle0 = pose_from(arm, acts['idle'], 0)
    sit = sit_pose(arm, idle0, s, poles='PT.')
    acts['sit'] = new_action(arm, 'sit', [(0, sit), (1, sit)])
    acts['emote-no'] = new_action(arm, 'emote-no', head_shake(arm, idle0))
    meta = {'walk_speed': foot_speed(arm, acts['walk'], 'Foot.L', fps) * s,
            'run_speed': foot_speed(arm, acts['sprint'], 'Foot.L', fps) * s,
            'seat': SEAT}
    prune_actions(acts.values(), drop=is_umc_finger)
    for a in acts.values():
        for fc in fcurves(a):
            for k in fc.keyframe_points:
                k.interpolation = 'LINEAR'
    return finish_rig(rid, arm, acts, s, meta)


def finish_rig(rid, arm, acts, s, meta):
    for a in list(bpy.data.actions):
        if a not in acts.values():
            bpy.data.actions.remove(a)
    for clip, a in acts.items():
        a.name = clip
        a.use_fake_user = True
    clear_anim(arm)
    scale_rig(arm, s)
    arm.name = rid
    arm.data.name = rid
    for k, v in meta.items():
        arm[k] = round(v, 3)
    # the exporter takes the actions that fit the armature; give each a slot bound to it
    for a in acts.values():
        use_action(arm, a)
    use_action(arm, None)
    return [arm]


# ---------- the written .glb: smaller skin weights ----------

def write_glb(path, j, bin_):
    js = json.dumps(j, separators=(',', ':')).encode('utf8')
    js += b' ' * (-len(js) % 4)
    bin_ += b'\0' * (-len(bin_) % 4)
    with open(path, 'wb') as fh:
        fh.write(struct.pack('<III', 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(bin_)))
        fh.write(struct.pack('<II', len(js), 0x4E4F534A) + js)
        fh.write(struct.pack('<II', len(bin_), 0x004E4942) + bin_)


def quantize_weights(path):
    """WEIGHTS_0 as normalized unsigned bytes (core glTF) instead of floats: a quarter of the size."""
    with open(path, 'rb') as fh:
        d = fh.read()
    n = struct.unpack('<I', d[12:16])[0]
    j = json.loads(d[20:20 + n])
    bin_ = d[20 + n + 8:]
    views = [bytes(bin_[v.get('byteOffset', 0):v.get('byteOffset', 0) + v['byteLength']]) for v in j['bufferViews']]
    done = set()
    for m in j.get('meshes', []):
        for prim in m['primitives']:
            ai = prim['attributes'].get('WEIGHTS_0')
            if ai is None or ai in done:
                continue
            acc = j['accessors'][ai]
            if acc['componentType'] != 5126 or acc.get('byteOffset', 0) or j['bufferViews'][acc['bufferView']].get('byteStride'):
                continue
            vals = struct.unpack(f'<{acc["count"] * 4}f', views[acc['bufferView']][:acc['count'] * 16])
            out = bytearray()
            for i in range(acc['count']):
                w = vals[i * 4:i * 4 + 4]
                t = sum(w) or 1.0
                q = [int(round(x / t * 255)) for x in w]
                q[q.index(max(q))] += 255 - sum(q)       # the bytes add up to exactly 255
                out += bytes(q)
            views[acc['bufferView']] = bytes(out)
            acc['componentType'] = 5121
            acc['normalized'] = True
            acc.pop('min', None)
            acc.pop('max', None)
            done.add(ai)
    blob = bytearray()
    for v, data in zip(j['bufferViews'], views):
        blob += b'\0' * (-len(blob) % 4)
        v['byteOffset'] = len(blob)
        v['byteLength'] = len(data)
        blob += data
    j['buffers'][0]['byteLength'] = len(blob)
    write_glb(path, j, bytes(blob))


# ---------- checks on the written .glb ----------

def read_glb(path):
    with open(path, 'rb') as fh:
        d = fh.read()
    n = struct.unpack('<I', d[12:16])[0]
    return json.loads(d[20:20 + n])


def check(pid, path):
    j = read_glb(path)
    problems = []
    if j.get('images'):
        problems.append('has images')
    names = [n.get('name') for n in j.get('nodes', [])]
    anims = sorted(a['name'] for a in j.get('animations', []))
    if pid in RIGS:
        want = sorted(CLIPS[RIGS[pid]])
        if anims != want:
            problems.append(f'animations {anims}, expected {want}')
        if j.get('meshes'):
            problems.append('rig has a mesh')
    else:
        if anims:
            problems.append(f'person has animations {anims}')
        if len(j.get('meshes', [])) != 1 or len(j.get('skins', [])) != 1:
            problems.append(f'{len(j.get("meshes", []))} meshes, {len(j.get("skins", []))} skins')
        if pid not in names or pid + '-mesh' not in names:
            problems.append('node names')
    return problems


# ---------- main ----------

def main():
    argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
    keep = None
    if '--keep-glb' in argv:
        i = argv.index('--keep-glb')
        keep = argv[i + 1]
        del argv[i:i + 2]
    if '--list' in argv:
        for pid, sp in PEOPLE.items():
            src = ', '.join(f'{k} {v}' for k, v in sp['parts'].items())
            print(f'{pid:20} rig-{sp["rig"]:6} {src:70} {sp["note"]}')
        for rid, r in RIGS.items():
            print(f'{rid:20} clips {", ".join(f"{k}<-{v or "made here"}" for k, v in CLIPS[r].items())}')
        return
    wanted = []
    for a in argv:
        if a.startswith('--'):
            continue
        wanted += ([p for p in PEOPLE if p.startswith('man-')] if a == 'men' else
                   [p for p in PEOPLE if p.startswith('woman-')] if a == 'women' else list(RIGS) if a == 'rigs' else [a])
    unknown = [w for w in wanted if w not in PEOPLE and w not in RIGS]
    if unknown:
        raise SystemExit('unknown id(s): ' + ', '.join(unknown))
    todo = wanted or (list(RIGS) + list(PEOPLE))
    os.makedirs(OUT, exist_ok=True)
    tmp = keep or tempfile.mkdtemp()
    os.makedirs(tmp, exist_ok=True)
    failed = []
    for pid in todo:
        reset()
        rig = RIGS.get(pid) or PEOPLE[pid]['rig']
        pack = {'umc': 'Quaternius Ultimate Modular Men', 'women': 'Quaternius Ultimate Modular Women'}[rig]
        if pid in RIGS:
            objs, src = build_rig(pid), f'{pack} ({RIG_SOURCE[pid]}{SRC[rig][1]} animations)'
        else:
            objs = build_person(pid, PEOPLE[pid])
            src = f'{pack} (' + ', '.join(sorted({v + SRC[rig][1] for v in PEOPLE[pid]['parts'].values()})) + ')'
        path = os.path.join(tmp, pid + '.glb')
        if os.environ.get('SO_SAVE_BLEND'):          # debugging: keep the built scene
            bpy.ops.wm.save_as_mainfile(filepath=os.path.join(os.environ['SO_SAVE_BLEND'], pid + '.blend'))
        export_glb(path, objs, pid in RIGS)
        if not os.environ.get("SO_NO_QUANT"):
            quantize_weights(path)
        problems = check(pid, path)
        with open(path, 'rb') as fh:
            b64 = base64.b64encode(fh.read()).decode('ascii')
        with open(os.path.join(OUT, pid + '.js'), 'w') as fh:
            fh.write(f'/* Generated by tools/office-characters.py from {src} (CC0, quaternius.com). Do not edit. */\n'
                     f"(window.SO_MODELS = window.SO_MODELS || {{}})['{pid}'] = '{b64}';\n")
        limit = LIMIT['rig' if pid in RIGS else 'person']
        if len(b64) > limit:
            problems.append(f'{len(b64) // 1024} KB base64 is over {limit // 1024} KB')
        print(f'{pid}: glb {os.path.getsize(path) // 1024} KB, js {len(b64) // 1024} KB'
              + ('' if not problems else '  PROBLEMS: ' + '; '.join(problems)))
        if problems:
            failed.append(pid)
    if failed:
        raise SystemExit('failed: ' + ', '.join(failed))


main()

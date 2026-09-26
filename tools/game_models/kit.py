"""Shared tools for the game model builders (tools/game_models/*.py). Blender units: Z up, characters face -Y.

A builder module defines MODELS = {'name': build}; build() starts from an empty scene (kit.reset() has been
called), creates the objects and returns the list to export. tools/game-models.py exports each model as .glb
and writes models/<name>.js (base64), so the game also runs from file://.
"""
import math
import os

import bmesh
import bpy
from mathutils import Euler, Matrix, Quaternion, Vector

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
GAME = ROOT
KENNEY = os.path.join(GAME, 'kenney')
# animations kept from Kenney's Mini Characters (the humanoid skeleton every person shares)
ACTIONS = ['idle', 'walk', 'sprint', 'interact-right', 'interact-left', 'emote-yes', 'emote-no', 'sit', 'pick-up', 'jump', 'crouch']


# ---------- geometry ----------

def xf(loc=(0, 0, 0), rot=(0, 0, 0), scale=(1, 1, 1)):
    q = rot if isinstance(rot, Quaternion) else Euler(rot).to_quaternion()
    s = Vector(scale) if hasattr(scale, '__len__') else Vector((scale, scale, scale))
    return Matrix.LocRotScale(Vector(loc), q, s)


def toward(d):
    """Rotation that turns +Z toward direction d."""
    return Vector((0, 0, 1)).rotation_difference(Vector(d).normalized())


def sphere(M, seg=18, rings=12):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=rings, radius=1)
    bmesh.ops.transform(bm, matrix=M, verts=bm.verts)
    return bm


def shell(M, n, keep, seg=24, rings=16):
    """Unit sphere keeping the part where dot(v, n) > keep (before M), e.g. hair over the top and back."""
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=rings, radius=1)
    n = Vector(n).normalized()
    geom = bm.verts[:] + bm.edges[:] + bm.faces[:]
    bmesh.ops.bisect_plane(bm, geom=geom, plane_co=n * keep, plane_no=n, clear_inner=True)
    bmesh.ops.transform(bm, matrix=M, verts=bm.verts)
    return bm


def cone(M, r1, r2, d, seg=18):
    """Truncated cone along local Z: radius r1 at -d/2, r2 at +d/2."""
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=seg, radius1=r1, radius2=r2, depth=d)
    bmesh.ops.transform(bm, matrix=M, verts=bm.verts)
    return bm


def box(M):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    bmesh.ops.transform(bm, matrix=M, verts=bm.verts)
    return bm


def torus(M, R, r, seg=24, ring=8):
    bm = bmesh.new()
    rows = []
    for i in range(seg):
        a = 2 * math.pi * i / seg
        row = []
        for j in range(ring):
            b = 2 * math.pi * j / ring
            row.append(bm.verts.new(((R + r * math.cos(b)) * math.cos(a), (R + r * math.cos(b)) * math.sin(a), r * math.sin(b))))
        rows.append(row)
    for i in range(seg):
        for j in range(ring):
            bm.faces.new((rows[i][j], rows[(i + 1) % seg][j], rows[(i + 1) % seg][(j + 1) % ring], rows[i][(j + 1) % ring]))
    bmesh.ops.transform(bm, matrix=M, verts=bm.verts)
    return bm


def star(M, r_out=1.0, r_in=0.45, depth=0.3):
    """Five-pointed star prism in the XZ plane, thickness along Y."""
    bm = bmesh.new()
    front, back = [], []
    for i in range(10):
        a = math.pi / 2 + i * math.pi / 5
        r = r_out if i % 2 == 0 else r_in
        x, z = r * math.cos(a), r * math.sin(a)
        front.append(bm.verts.new((x, -depth / 2, z)))
        back.append(bm.verts.new((x, depth / 2, z)))
    bm.faces.new(front[::-1])
    bm.faces.new(back)
    for i in range(10):
        j = (i + 1) % 10
        bm.faces.new((front[i], front[j], back[j], back[i]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bmesh.ops.transform(bm, matrix=M, verts=bm.verts)
    return bm


class Figure:
    """Collects parts (one material and one bone each) and joins them into one skinned mesh."""

    def __init__(self, name):
        self.name = name
        self.parts = []
        self.mats = {}

    def mat(self, name, hex_color):
        m = bpy.data.materials.get(name) or bpy.data.materials.new(name)
        c = tuple(int(hex_color[i:i + 2], 16) / 255 for i in (1, 3, 5))
        lin = tuple(((v + 0.055) / 1.055) ** 2.4 if v > 0.04045 else v / 12.92 for v in c)
        bsdf = next(n for n in m.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
        bsdf.inputs['Base Color'].default_value = (*lin, 1)
        bsdf.inputs['Roughness'].default_value = 1.0
        bsdf.inputs['Metallic'].default_value = 0.0
        m.diffuse_color = (*lin, 1)
        self.mats[name] = m
        return m

    def add(self, bm, mat, bone, smooth=True):
        me = bpy.data.meshes.new(f'{self.name}-part')
        bm.to_mesh(me)
        bm.free()
        for p in me.polygons:
            p.use_smooth = smooth
        ob = bpy.data.objects.new(me.name, me)
        bpy.context.scene.collection.objects.link(ob)
        me.materials.append(self.mats[mat])
        if bone:
            ob.vertex_groups.new(name=bone).add(list(range(len(me.vertices))), 1.0, 'REPLACE')
        self.parts.append(ob)
        return ob

    def join(self):
        with bpy.context.temp_override(active_object=self.parts[0], selected_editable_objects=self.parts):
            bpy.ops.object.join()
        ob = self.parts[0]
        ob.name = ob.data.name = self.name
        me = ob.data                                  # one slot per material, not one per part
        uniq = []
        for m in me.materials:
            if m not in uniq:
                uniq.append(m)
        idx = [uniq.index(m) for m in me.materials]
        face_mat = [idx[p.material_index] for p in me.polygons]
        me.materials.clear()                          # (resets the face indices, so they are set again after)
        for m in uniq:
            me.materials.append(m)
        for p, i in zip(me.polygons, face_mat):
            p.material_index = i
        return ob


# ---------- scene helpers ----------

def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def import_glb(path):
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=path)
    return [o for o in bpy.data.objects if o not in before]


def rig():
    """Import the Kenney skeleton with its animations; drop its own meshes."""
    objs = import_glb(os.path.join(KENNEY, 'mini-character.glb'))
    arm = next(o for o in objs if o.type == 'ARMATURE')
    for o in objs:
        if o is not arm:
            bpy.data.objects.remove(o)
    for a in list(bpy.data.actions):
        if a.name not in ACTIONS:
            bpy.data.actions.remove(a)
    for m in list(bpy.data.meshes):
        if m.users == 0:
            bpy.data.meshes.remove(m)
    for im in list(bpy.data.images):
        bpy.data.images.remove(im)
    arm.data.pose_position = 'REST'
    return arm


def posed(arm, bone, action, frame=0):
    """Matrix taking a rest-pose point of `bone` to where it is in `action` at `frame`."""
    ad = arm.animation_data or arm.animation_data_create()
    act = bpy.data.actions[action]
    ad.action = act
    if hasattr(ad, 'action_slot') and act.slots:
        ad.action_slot = act.slots[0]
    arm.data.pose_position = 'POSE'
    bpy.context.scene.frame_set(frame)
    bpy.context.view_layer.update()
    pb = arm.pose.bones[bone]
    m = pb.matrix @ pb.bone.matrix_local.inverted()
    ad.action = None
    arm.data.pose_position = 'REST'
    bpy.context.view_layer.update()
    return m


def bind(body, arm, name):
    arm.name = name + '-rig'
    body.parent = arm
    mod = body.modifiers.new('Armature', 'ARMATURE')
    mod.object = arm
    arm.data.pose_position = 'POSE'


def export(path, objs):
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.select_set(True)
    bpy.ops.export_scene.gltf(filepath=path, export_format='GLB', use_selection=True, export_yup=True,
                              export_apply=False, export_animations=True, export_animation_mode='ACTIONS',
                              export_skins=True, export_morph=False, export_extras=False)



# ---------- humanoids on the Kenney skeleton ----------

SHOULDER = {'arm-left': Vector((0.1, 0.017, 0.288)), 'arm-right': Vector((-0.1, 0.017, 0.288))}
HIP = {'leg-left': 0.064, 'leg-right': -0.064}


def arm_dir(side, down=35):
    """Direction of a hanging arm in the rest pose. The Kenney animations hold the arms out to the
    side (their rest pose is a T, idle lowers them by 45°), so the new arms are modelled bent down by `down` degrees."""
    s = 1 if side == 'arm-left' else -1
    a = math.radians(down)
    return Vector((s * math.cos(a), 0.0, -math.sin(a)))


def head_features(f, c, r, eye='eye', skin='skin', blush='blush'):
    """Eyes, blush, ears and a small mouth on a head sphere centred at c, radius r, facing -Y."""
    for s in (1, -1):
        e = c + Vector((s * 0.36 * r, -0.93 * r, -0.02 * r))
        f.add(sphere(xf(e, toward((s * 0.3, -1, 0)), (0.13 * r, 0.13 * r, 0.06 * r)), 12, 8), eye, 'head')
        hl = e + Vector((s * 0.02 * r, -0.05 * r, 0.05 * r))
        f.add(sphere(xf(hl, toward((0, -1, 0)), (0.04 * r, 0.04 * r, 0.02 * r)), 8, 6), 'white', 'head')
        b = c + Vector((s * 0.55 * r, -0.8 * r, -0.3 * r))
        f.add(sphere(xf(b, toward((s * 0.55, -0.8, -0.2)), (0.16 * r, 0.1 * r, 0.03 * r)), 12, 6), blush, 'head')
        f.add(sphere(xf(c + Vector((s * 0.98 * r, 0.05 * r, -0.05 * r)), (0, 0, 0), (0.12 * r, 0.1 * r, 0.18 * r)), 10, 8), skin, 'head')
    f.add(torus(xf(c + Vector((0, -0.96 * r, -0.36 * r)), toward((0, -1, -0.3)), (1, 0.55, 1)), 0.1 * r, 0.018 * r, 12, 5), 'mouth', 'head')


# ---------- props from Kenney kits ----------

def kenney_pieces(names):
    """Import kenney/<name>.glb for each name as one mesh object called <name>, at the origin.
    A pack model built from these keeps each piece as a named node; a level picks one by that name."""
    out = []
    for name in names:
        objs = [o for o in import_glb(os.path.join(KENNEY, name + '.glb')) if o.type == 'MESH']
        for o in objs:
            o.matrix_world = o.matrix_world.copy()
            o.parent = None
        if len(objs) > 1:
            with bpy.context.temp_override(active_object=objs[0], selected_editable_objects=objs):
                bpy.ops.object.join()
        ob = objs[0]
        ob.name = name
        with bpy.context.temp_override(object=ob, selected_editable_objects=[ob]):
            bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
        ob.location = (0, 0, 0)
        out.append(ob)
    for o in list(bpy.data.objects):
        if o not in out:
            bpy.data.objects.remove(o)
    return out

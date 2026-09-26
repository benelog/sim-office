"""The geographer (reference/characters/geographer.jpg): an old, stout scholar with a cloud of wild white hair, round
dark glasses, a navy cardigan over a cream shirt, brown trousers and soft brown shoes."""
import math

from mathutils import Vector

from .kit import (Figure, SHOULDER, HIP, arm_dir, bind, box, cone, head_features, rig, shell, sphere, torus, toward,
                  xf)


def build_geographer():
    arm = rig()
    f = Figure('geographer')
    for name, col in [('skin', '#F0C6A4'), ('blush', '#E9A08C'), ('eye', '#2B2B38'), ('white', '#FFFFFF'),
                      ('mouth', '#A35A50'), ('hair', '#F1EBDD'), ('glasses', '#2A2A30'), ('cardigan', '#4A5A86'),
                      ('rib', '#3E4C74'), ('shirt', '#EDE2C8'), ('button', '#2F3858'), ('trousers', '#5E5047'),
                      ('shoes', '#6E4A30')]:
        f.mat(name, col)

    # head: a big nose, round glasses and a cloud of white hair over the top, sides and back
    c, r = Vector((0, 0.0, 0.47)), 0.112
    f.add(sphere(xf(c, (0, 0, 0), (r, r * 0.97, r * 1.03)), 24, 16), 'skin', 'head')
    head_features(f, c, r)
    f.add(sphere(xf(c + Vector((0, -0.112, -0.012)), (0, 0, 0), (0.024, 0.024, 0.022)), 12, 8), 'skin', 'head')   # nose
    for s in (1, -1):
        e = c + Vector((s * 0.36 * r, -0.97 * r, -0.02 * r))
        f.add(torus(xf(e, toward((s * 0.2, -1, 0))), 0.2 * r, 0.02 * r, 20, 6), 'glasses', 'head')
        f.add(box(xf(c + Vector((s * 0.72 * r, -0.62 * r, 0)), (0, 0, s * 0.9), (0.012, 0.075, 0.006))), 'glasses', 'head')
    f.add(torus(xf(c + Vector((0, -1.0 * r, 0.01 * r)), (math.pi / 2, 0, 0), (1, 1, 1)), 0.075 * r, 0.018 * r, 10, 5),
          'glasses', 'head')                          # bridge
    hc = c + Vector((0, 0.02, 0.02))
    f.add(shell(xf(hc, (0, 0, 0), (r * 1.08, r * 1.1, r * 1.08)), (0, 0.7, 0.7), -0.1), 'hair', 'head')
    for i in range(34):                               # puffs of hair; the face is kept clear
        a = i * 2.39996
        z = 1 - (i + 0.5) / 34 * 1.55
        rr = math.sqrt(max(0.0, 1 - z * z))
        d = Vector((rr * math.cos(a), rr * math.sin(a), z))
        if d.y < -0.35 and d.z < 0.55:
            continue
        if d.z < -0.35 and d.y < 0.3:
            continue
        size = 0.042 + 0.012 * ((i * 7) % 3)
        f.add(sphere(xf(hc + d * r * 1.12, toward(d), (size, size, size * 0.8)), 12, 8), 'hair', 'head')
    for i in range(12):                               # a few wisps sticking out
        a = i * 2.39996 + 0.7
        z = 0.7 - (i + 0.5) / 12 * 1.0
        rr = math.sqrt(max(0.0, 1 - z * z))
        d = Vector((rr * math.cos(a), rr * math.sin(a), z))
        if d.y < -0.3 and d.z < 0.6:
            continue
        tip = (d + Vector((0.4 * math.sin(i * 1.7), 0.2, -0.3))).normalized()
        f.add(cone(xf(hc + d * r * 1.3 + tip * 0.012, toward(tip), (1, 0.6, 1)), 0.02, 0.003, 0.035, 8), 'hair', 'head')

    # body: stout, a buttoned navy cardigan with a ribbed hem, the shirt collar showing in the V
    f.add(cone(xf((0, 0.025, 0.25)), 0.155, 0.125, 0.17, 22), 'cardigan', 'torso')
    f.add(sphere(xf((0, -0.01, 0.23), (0, 0, 0), (0.14, 0.13, 0.1)), 20, 12), 'cardigan', 'torso')      # belly
    f.add(sphere(xf((0, 0.025, 0.335), (0, 0, 0), (0.125, 0.105, 0.05)), 18, 10), 'cardigan', 'torso')
    f.add(torus(xf((0, 0.02, 0.172), (0, 0, 0), (1.0, 0.92, 1)), 0.15, 0.018, 28, 6), 'rib', 'torso')
    f.add(cone(xf((0, -0.1, 0.322), (math.radians(160), 0, 0), (1.1, 0.35, 1)), 0.045, 0.004, 0.075, 3),
          'shirt', 'torso', smooth=False)             # the V of the shirt
    f.add(torus(xf((0, 0.02, 0.358), (0, 0, 0), (1, 1, 1.2)), 0.058, 0.016, 20, 6), 'shirt', 'torso')    # collar
    for z in (0.28, 0.235, 0.19):
        y = -0.012 - 0.13 * math.sqrt(max(0.0, 1 - ((z - 0.23) / 0.1) ** 2))
        f.add(sphere(xf((0, y - 0.004, z), (0, 0, 0), 0.009), 8, 6), 'button', 'torso')

    for side, sh in SHOULDER.items():                # full sleeves with ribbed cuffs, bare hands
        d = arm_dir(side, 35)
        f.add(sphere(xf(sh, (0, 0, 0), 0.046), 12, 8), 'cardigan', side)
        f.add(cone(xf(sh + d * 0.065, toward(d)), 0.045, 0.04, 0.13, 14), 'cardigan', side)
        f.add(torus(xf(sh + d * 0.128, toward(d)), 0.036, 0.01, 14, 5), 'rib', side)
        f.add(sphere(xf(sh + d * 0.16, toward(d), (0.031, 0.027, 0.035)), 12, 8), 'skin', side)

    for side, x in HIP.items():                       # baggy trousers, soft shoes
        f.add(cone(xf((x * 1.15, 0.029, 0.1)), 0.056, 0.05, 0.15, 12), 'trousers', side)
        f.add(sphere(xf((x * 1.15, 0.0, 0.02), (0, 0, 0), (0.05, 0.072, 0.028)), 14, 8), 'shoes', side)

    body = f.join()
    bind(body, arm, 'geographer')
    return [arm, body]


MODELS = {'geographer': build_geographer}

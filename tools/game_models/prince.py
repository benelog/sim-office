"""The little prince (reference/characters/prince.jpg): spiky golden hair, long open yellow coat over a cream tunic
with three star buttons, red scarf, navy boots."""
import math

from mathutils import Vector

from .kit import (Figure, SHOULDER, HIP, arm_dir, bind, box, cone, head_features, posed, rig, shell, sphere, star,
                  torus, toward, xf)

def build_prince():
    arm = rig()
    f = Figure('prince')
    for name, col in [('skin', '#F6D3B5'), ('blush', '#F2A08C'), ('eye', '#2B2B38'), ('white', '#FFFFFF'),
                      ('mouth', '#B5655A'), ('hair', '#F2C94C'), ('coat', '#E8B23A'), ('tunic', '#F1E6CC'),
                      ('star', '#F7D24A'), ('scarf', '#C8462F'), ('boots', '#3B4A72')]:
        f.mat(name, col)

    # head: a round child's head with spiky golden hair
    c, r = Vector((0, 0.0, 0.47)), 0.125
    f.add(sphere(xf(c, (0, 0, 0), (r, r * 0.97, r * 1.02)), 24, 16), 'skin', 'head')
    head_features(f, c, r)
    hc = c + Vector((0, 0.012, 0.012))
    f.add(shell(xf(hc, (0, 0, 0), (r * 1.1, r * 1.1, r * 1.08)), (0, 0.45, 0.89), -0.25), 'hair', 'head')
    n_up = Vector((0, 0.45, 0.89)).normalized()
    for i in range(46):                               # tufts over the shell, swept up and back, a mop of locks
        a = i * 2.39996
        z = 1 - (i + 0.5) / 46 * 1.6
        rr = math.sqrt(max(0.0, 1 - z * z))
        d = Vector((rr * math.cos(a), rr * math.sin(a), z))
        if d.dot(n_up) < -0.12:
            continue
        base = hc + d * r * 1.02
        back = Vector((0, 1, 0.35)) - d * d.dot(Vector((0, 1, 0.35)))
        tip = (d * 0.75 + back.normalized() * 0.55 + Vector((0, 0, 0.25))).normalized()
        f.add(cone(xf(base + tip * 0.02, toward(tip), (1, 0.7, 1)), 0.05, 0.006, 0.08, 10), 'hair', 'head')
    for s_ in (-1.0, -0.5, 0.0, 0.5, 1.0):            # a short fringe over the forehead
        d = Vector((s_ * 0.5, -0.8, 0.38)).normalized()
        base = hc + d * r * 1.02
        tip = (d * 0.4 + Vector((s_ * 0.3, -0.35, -0.8))).normalized()
        f.add(cone(xf(base + tip * 0.012, toward(tip), (1, 0.6, 1)), 0.036, 0.005, 0.05, 10), 'hair', 'head')

    # body: a long open coat over the cream tunic with three star buttons
    f.add(cone(xf((0, 0.02, 0.215)), 0.155, 0.088, 0.25, 24), 'coat', 'torso')
    f.add(sphere(xf((0, 0.02, 0.335), (0, 0, 0), (0.095, 0.085, 0.045)), 18, 10), 'coat', 'torso')
    tilt = math.atan2(0.155 - 0.088, 0.25)
    f.add(box(xf((0, -0.104, 0.215), (-tilt, 0, 0), (0.07, 0.02, 0.245))), 'tunic', 'torso', smooth=False)
    for i, z in enumerate((0.3, 0.255, 0.21)):
        y = -0.115 + (z - 0.215) * math.tan(tilt)    # on the front of the tilted tunic panel
        f.add(star(xf((0, y, z), (-tilt, 0, 0), 0.016), 1.0, 0.45, 0.5), 'star', 'torso', smooth=False)
    for s in (1, -1):                                 # coat edges along the opening
        f.add(box(xf((s * 0.043, -0.104, 0.215), (-tilt, 0, s * 0.35), (0.018, 0.022, 0.245))), 'coat', 'torso')

    # scarf: wound round the neck, one end hanging in front, one streaming behind
    f.add(torus(xf((0, 0.01, 0.35), (0, 0, 0), (1, 1, 1.25)), 0.072, 0.03, 24, 10), 'scarf', 'torso')
    f.add(box(xf((0.055, -0.085, 0.27), (0.12, 0.2, 0.08), (0.045, 0.016, 0.16))), 'scarf', 'torso')
    f.add(box(xf((-0.04, 0.12, 0.31), (1.05, 0, -0.25), (0.05, 0.014, 0.19))), 'scarf', 'torso')

    # arms: coat sleeves with a wider cuff, small hands
    for side, sh in SHOULDER.items():
        d = arm_dir(side)
        f.add(cone(xf(sh + d * 0.065, toward(d)), 0.033, 0.042, 0.13, 14), 'coat', side)
        f.add(sphere(xf(sh, (0, 0, 0), 0.036), 12, 8), 'coat', side)
        f.add(sphere(xf(sh + d * 0.15, toward(d), (0.028, 0.024, 0.032)), 12, 8), 'skin', side)

    # legs: puffy cream trousers and navy boots
    for side, x in HIP.items():
        f.add(cone(xf((x, 0.029, 0.13)), 0.045, 0.04, 0.09, 12), 'tunic', side)
        f.add(sphere(xf((x, 0.029, 0.085), (0, 0, 0), (0.052, 0.05, 0.035)), 14, 8), 'tunic', side)
        f.add(cone(xf((x, 0.029, 0.04)), 0.04, 0.036, 0.075, 12), 'boots', side)
        f.add(sphere(xf((x, 0.0, 0.018), (0, 0, 0), (0.042, 0.062, 0.024)), 14, 8), 'boots', side)

    body = f.join()
    bind(body, arm, 'prince')
    return [arm, body]


MODELS = {'prince': build_prince}

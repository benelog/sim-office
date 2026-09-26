"""The lamplighter (reference/characters/lamplighter.jpg): navy work suit, orange scarf, red knitted cap, white beard,
the long pole for lighting the lamp."""
import math

from mathutils import Vector

from .kit import (Figure, SHOULDER, HIP, arm_dir, bind, box, cone, head_features, posed, rig, shell, sphere, star,
                  torus, toward, xf)

def build_lamplighter():
    arm = rig()
    f = Figure('lamplighter')
    for name, col in [('skin', '#F2C8A6'), ('blush', '#EFA08A'), ('eye', '#2B2B38'), ('white', '#FFFFFF'),
                      ('mouth', '#A8584C'), ('whisker', '#F2EEE6'), ('cap', '#D9502F'), ('suit', '#3E4A6E'),
                      ('scarf', '#E0642E'), ('belt', '#5A3B22'), ('brass', '#C9A646'), ('boots', '#7A4E2D'),
                      ('pole', '#9B6A3C')]:
        f.mat(name, col)

    # head: white hair, a full white beard and a red knitted cap with a pompom
    c, r = Vector((0, 0.0, 0.465)), 0.11
    f.add(sphere(xf(c, (0, 0, 0), (r, r * 0.97, r * 1.03)), 24, 16), 'skin', 'head')
    head_features(f, c, r)
    f.add(sphere(xf(c + Vector((0, -0.05, -0.085)), (0.35, 0, 0), (0.085, 0.055, 0.07)), 18, 12), 'whisker', 'head')   # beard
    for s_ in (1, -1):                                # moustache, white hair over the ears
        f.add(sphere(xf(c + Vector((s_ * 0.028, -0.1, -0.035)), (0, s_ * 0.4, 0), (0.03, 0.014, 0.014)), 12, 8), 'whisker', 'head')
        f.add(sphere(xf(c + Vector((s_ * 0.1, 0.04, -0.01)), (0, 0, 0), (0.035, 0.05, 0.045)), 12, 8), 'whisker', 'head')
    f.add(sphere(xf(c + Vector((0, -0.112, -0.005)), (0, 0, 0), (0.02, 0.02, 0.018)), 10, 8), 'skin', 'head')   # nose
    f.add(shell(xf(c + Vector((0, 0.005, 0.01)), (0, 0, 0), (r * 1.08, r * 1.08, r * 1.1)), (0, 0.2, 1), 0.3), 'cap', 'head')
    f.add(torus(xf(c + Vector((0, 0.005, 0.045)), (-0.2, 0, 0), (1, 1, 1.4)), r * 1.0, 0.016, 28, 8), 'cap', 'head')
    tip_dir = Vector((0.55, 0.3, 0.5)).normalized()
    f.add(cone(xf(c + Vector((0.03, 0.02, 0.09)) + tip_dir * 0.05, toward(tip_dir)), 0.055, 0.012, 0.12, 16), 'cap', 'head')
    f.add(sphere(xf(c + Vector((0.03, 0.02, 0.09)) + tip_dir * 0.115, (0, 0, 0), 0.028), 12, 8), 'whisker', 'head')

    # body: navy work suit with a belt, an orange scarf
    f.add(cone(xf((0, 0.025, 0.25)), 0.14, 0.12, 0.17, 20), 'suit', 'torso')
    f.add(sphere(xf((0, 0.025, 0.335), (0, 0, 0), (0.12, 0.1, 0.05)), 18, 10), 'suit', 'torso')
    f.add(sphere(xf((0, 0.025, 0.175), (0, 0, 0), (0.14, 0.12, 0.04)), 18, 10), 'suit', 'torso')
    f.add(torus(xf((0, 0.025, 0.19), (0, 0, 0), (1.0, 0.86, 1)), 0.138, 0.012, 28, 6), 'belt', 'torso')
    f.add(box(xf((0, -0.097, 0.19), (0, 0, 0), (0.035, 0.012, 0.028))), 'brass', 'torso', smooth=False)
    f.add(torus(xf((0, 0.02, 0.355), (0, 0, 0), (1, 1, 1.25)), 0.075, 0.03, 24, 10), 'scarf', 'torso')
    f.add(box(xf((0.06, -0.095, 0.27), (0.1, 0.15, 0.05), (0.05, 0.016, 0.17))), 'scarf', 'torso')

    for side, sh in SHOULDER.items():
        d = arm_dir(side, 30)
        f.add(cone(xf(sh + d * 0.07, toward(d)), 0.04, 0.036, 0.14, 14), 'suit', side)
        f.add(sphere(xf(sh, (0, 0, 0), 0.042), 12, 8), 'suit', side)
        hand = sh + d * 0.16
        f.add(sphere(xf(hand, toward(d), (0.032, 0.028, 0.036)), 12, 8), 'skin', side)
        if side == 'arm-right':                       # the long pole, upright in the idle pose
            back = posed(arm, side, 'idle').inverted().to_3x3()
            up = (back @ Vector((0, 0, 1))).normalized()
            f.add(cone(xf(hand + up * 0.13, toward(up)), 0.008, 0.008, 0.62, 8), 'pole', side)
            f.add(sphere(xf(hand + up * 0.44, (0, 0, 0), 0.013), 8, 6), 'brass', side)

    for side, x in HIP.items():
        f.add(cone(xf((x * 1.2, 0.029, 0.12)), 0.055, 0.05, 0.11, 12), 'suit', side)
        f.add(cone(xf((x * 1.2, 0.029, 0.045)), 0.046, 0.044, 0.08, 12), 'boots', side)
        f.add(torus(xf((x * 1.2, 0.029, 0.083)), 0.046, 0.01, 14, 5), 'boots', side)
        f.add(sphere(xf((x * 1.2, 0.0, 0.02), (0, 0, 0), (0.047, 0.07, 0.026)), 14, 8), 'boots', side)

    body = f.join()
    bind(body, arm, 'lamplighter')
    return [arm, body]


MODELS = {'lamplighter': build_lamplighter}

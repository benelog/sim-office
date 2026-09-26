"""Small landmarks for a planet a scholar has never walked over, one model each:
    mountain  a snow-capped peak with a lower shoulder, 0.8 high
    house     a cottage, 0.2 high; tower  a church tower, 0.36 high; tree  a round tree, 0.3 high
Material names avoid Kenney's (rock, grass …), which a level may recolour with world.tint.
"""
import math

from .kit import Figure, box, cone, sphere, xf

COLOURS = [('peak', '#8D899F'), ('peakDark', '#747088'), ('snow', '#F4F4F8'), ('wall', '#EFE2C4'), ('roof', '#C0553A'),
           ('door', '#5A3B2A'), ('window', '#F3CF6A'), ('leaf', '#6E9A55'), ('trunk', '#7A5236')]


def _figure(name):
    f = Figure(name)
    for n, col in COLOURS:
        f.mat(n, col)
    return f


def build_mountain():
    f = _figure('mountain')
    for (x, y, r, h, rot, mat) in [(0, 0, 0.42, 0.8, 0.2, 'peak'), (0.26, 0.14, 0.3, 0.48, 0.9, 'peakDark'),
                                   (-0.22, 0.12, 0.26, 0.36, 0.5, 'peakDark')]:
        f.add(cone(xf((x, y, h / 2), (0, 0, rot)), r, 0.0, h, 7), mat, None, smooth=False)
        cap = 0.36 * h                                # the snow: the top of the same cone, a little proud
        f.add(cone(xf((x, y, h - cap / 2 + 0.004), (0, 0, rot)), r * cap / h * 1.08, 0.0, cap, 7), 'snow', None, smooth=False)
    return f.join()


def build_house():
    f = _figure('house')
    f.add(box(xf((0, 0, 0.055), (0, 0, 0), (0.14, 0.11, 0.11))), 'wall', None, smooth=False)
    f.add(cone(xf((0, 0, 0.15), (0, 0, math.pi / 4), (1.2, 0.95, 1)), 0.115, 0.0, 0.09, 4), 'roof', None, smooth=False)
    f.add(box(xf((0.03, -0.056, 0.03), (0, 0, 0), (0.03, 0.004, 0.05))), 'door', None, smooth=False)
    f.add(box(xf((-0.035, -0.056, 0.065), (0, 0, 0), (0.028, 0.004, 0.025))), 'window', None, smooth=False)
    return f.join()


def build_tower():
    f = _figure('tower')
    f.add(box(xf((0, 0, 0.11), (0, 0, 0), (0.09, 0.09, 0.22))), 'wall', None, smooth=False)
    f.add(cone(xf((0, 0, 0.28), (0, 0, math.pi / 4)), 0.075, 0.0, 0.14, 4), 'roof', None, smooth=False)
    f.add(box(xf((0, -0.046, 0.16), (0, 0, 0), (0.03, 0.004, 0.04))), 'window', None, smooth=False)
    f.add(box(xf((0, -0.046, 0.035), (0, 0, 0), (0.035, 0.004, 0.06))), 'door', None, smooth=False)
    return f.join()


def build_tree():
    f = _figure('tree')
    f.add(cone(xf((0, 0, 0.07)), 0.022, 0.016, 0.14, 8), 'trunk', None)
    f.add(sphere(xf((0, 0, 0.2), (0, 0, 0), (0.1, 0.1, 0.11)), 12, 8), 'leaf', None)
    return f.join()


MODELS = {'mountain': lambda: [build_mountain()], 'house': lambda: [build_house()], 'tower': lambda: [build_tower()],
          'tree': lambda: [build_tree()]}

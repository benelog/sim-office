"""The lamplighter's street lamp: a slender iron post with a glass lantern (material 'glass', which the game makes
glow), 1.12 tall at scale 1."""
import math

from mathutils import Vector

from .kit import Figure, box, cone, sphere, torus, xf


def build_lamp():
    f = Figure('lamp')
    f.mat('iron', '#3D4A48')
    f.mat('glass', '#FFE7A0')
    f.add(cone(xf((0, 0, 0.05)), 0.09, 0.06, 0.1, 16), 'iron', None)
    f.add(cone(xf((0, 0, 0.12)), 0.05, 0.035, 0.06, 16), 'iron', None)
    f.add(cone(xf((0, 0, 0.5)), 0.03, 0.022, 0.72, 12), 'iron', None)
    f.add(torus(xf((0, 0, 0.3)), 0.034, 0.008, 16, 5), 'iron', None)
    f.add(box(xf((0, 0, 0.8), (0, 0, 0), (0.22, 0.02, 0.02))), 'iron', None, smooth=False)   # ladder bar
    f.add(cone(xf((0, 0, 0.87), (0, 0, math.pi / 4)), 0.045, 0.06, 0.03, 4), 'iron', None, smooth=False)
    f.add(cone(xf((0, 0, 0.96), (0, 0, math.pi / 4)), 0.055, 0.085, 0.15, 4), 'glass', None, smooth=False)
    for k in range(4):
        a = math.pi / 4 + k * math.pi / 2
        p = Vector((math.cos(a) * 0.07, math.sin(a) * 0.07, 0.96))
        f.add(box(xf(p, (0, 0, a), (0.012, 0.012, 0.16))), 'iron', None, smooth=False)
    f.add(cone(xf((0, 0, 1.07), (0, 0, math.pi / 4)), 0.1, 0.012, 0.08, 4), 'iron', None, smooth=False)
    f.add(sphere(xf((0, 0, 1.12), (0, 0, 0), 0.018), 10, 8), 'iron', None)
    return [f.join()]


MODELS = {'lamp': build_lamp}

"""Scholars' furniture (the geographer, the businessman), one model each:
    desk    a wooden writing desk with an inkwell, top at 0.32
    ledger  an enormous open register with a pencil (sits on the desk: lift 0.32); its pages are material 'page'
    books   a pile of big bound books, 0.3 high
"""
import math

from mathutils import Vector

from .kit import Figure, box, cone, sphere, xf

COLOURS = [('wood', '#8C5B36'), ('woodDark', '#65402A'), ('brass', '#C9A646'), ('ink', '#2B2A33'), ('page', '#F4ECD6'),
           ('cover', '#7A2E2A'), ('coverBlue', '#34507A'), ('coverGreen', '#4E6B3E'), ('coverBrown', '#8A6238'),
           ('pencil', '#E7B53C'), ('lead', '#3A3A3A')]


def _figure(name):
    f = Figure(name)
    for n, col in COLOURS:
        f.mat(n, col)
    return f


def build_desk():
    f = _figure('desk')
    f.add(box(xf((0, 0, 0.305), (0, 0, 0), (0.58, 0.32, 0.03))), 'wood', None, smooth=False)
    f.add(box(xf((0, 0, 0.285), (0, 0, 0), (0.54, 0.28, 0.02))), 'woodDark', None, smooth=False)
    for sx in (1, -1):
        for sy in (1, -1):
            f.add(box(xf((sx * 0.25, sy * 0.12, 0.145), (0, 0, 0), (0.035, 0.035, 0.29))), 'woodDark', None, smooth=False)
        f.add(box(xf((sx * 0.25, 0, 0.05), (0, 0, 0), (0.025, 0.24, 0.025))), 'woodDark', None, smooth=False)
    f.add(box(xf((0, 0.12, 0.2), (0, 0, 0), (0.46, 0.02, 0.14))), 'wood', None, smooth=False)      # back panel
    f.add(box(xf((0.15, -0.135, 0.255), (0, 0, 0), (0.18, 0.02, 0.05))), 'wood', None, smooth=False)   # drawer
    f.add(sphere(xf((0.15, -0.148, 0.255), (0, 0, 0), 0.01), 8, 6), 'brass', None)
    f.add(cone(xf((-0.22, 0.08, 0.34), (0, 0, 0)), 0.03, 0.02, 0.04, 12), 'ink', None)             # inkwell
    f.add(cone(xf((-0.22, 0.08, 0.365), (0, 0, 0)), 0.012, 0.012, 0.012, 10), 'brass', None)
    f.add(cone(xf((-0.2, 0.09, 0.41), (0.3, 0.5, 0)), 0.004, 0.012, 0.1, 6), 'page', None)          # a quill
    return f.join()


def build_ledger():
    f = _figure('ledger')
    open_ = math.radians(8)
    for s in (1, -1):                                 # the two halves, slightly raised toward the spine
        f.add(box(xf((s * 0.105, 0, 0.008), (0, s * open_, 0), (0.215, 0.29, 0.014))), 'cover', None, smooth=False)
        f.add(box(xf((s * 0.1, 0, 0.026), (0, s * open_, 0), (0.195, 0.27, 0.026))), 'page', None, smooth=False)
        for i in range(7):                            # lines of writing
            y = 0.1 - i * 0.032
            w = 0.14 if i % 3 else 0.09
            f.add(box(xf((s * 0.1 - (0.14 - w) / 2 * s, y, 0.041 - 0.0 * i), (0, s * open_, 0), (w, 0.006, 0.002))), 'ink', None, smooth=False)
    f.add(cone(xf((0.13, -0.17, 0.02), (math.pi / 2, 0, 0.5)), 0.008, 0.008, 0.16, 6), 'pencil', None, smooth=False)
    f.add(cone(xf((0.13 + 0.09 * math.sin(0.5), -0.17 - 0.09 * math.cos(0.5), 0.02), (math.pi / 2, 0, 0.5)), 0.008, 0.001, 0.02, 6),
          'lead', None, smooth=False)
    return f.join()


def build_books():
    f = _figure('books')
    z = 0
    for i, (w, d, h, turn, mat) in enumerate([(0.3, 0.22, 0.07, 0.1, 'coverBrown'), (0.27, 0.2, 0.06, -0.15, 'cover'),
                                              (0.29, 0.21, 0.065, 0.3, 'coverBlue'), (0.24, 0.18, 0.05, -0.05, 'coverGreen'),
                                              (0.22, 0.17, 0.05, 0.4, 'cover')]):
        f.add(box(xf((0, 0, z + h / 2), (0, 0, turn), (w, d, h))), mat, None, smooth=False)
        c, s = math.cos(turn), math.sin(turn)
        edge = Vector((0.012 * c - 0 * s, 0.012 * s, 0))
        f.add(box(xf(Vector((0, 0, z + h / 2)) + edge, (0, 0, turn), (w - 0.012, d + 0.004, h * 0.8))), 'page', None, smooth=False)
        z += h
    return f.join()


MODELS = {'desk': lambda: [build_desk()], 'ledger': lambda: [build_ledger()], 'books': lambda: [build_books()]}

"""Ground cover from Kenney's Nature Kit and Space Kit (CC0, kenney/): one pack whose nodes are named after
the source files. Materials keep Kenney's names (rock, rockDark, stone, dirt, grass …); the game recolours them
per level (world.tint)."""
from .kit import kenney_pieces

PIECES = ['rock_smallA', 'rock_smallC', 'rock_smallFlatA', 'rock_smallFlatB', 'stone_smallB', 'stone_smallFlatA',
          'grass', 'grass_large', 'grass_leafs', 'crater', 'craterLarge']


def build_nature():
    return kenney_pieces(PIECES)


MODELS = {'nature': build_nature}

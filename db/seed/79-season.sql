-- The season in the scenery (office/season.js): dates as 'MM-DD' in a season that runs from August to July, so
-- '01-10' comes after '12-01'. Fairview is on the Northern California coast: the colours come late (peak in mid
-- November), the broadleaf trees are bare by the middle of January, and the leaves are back in March. The holiday
-- decorations go up the day after Thanksgiving (2026-11-26) and come down after the first weekend of January.
REPLACE INTO config (k, v, note) VALUES
  ('season_fall', '10-20,11-15', 'autumn colours: the broadleaf trees start to turn, all turned (each tree a few days apart; about a third are live oaks that stay green)'),
  ('season_bare', '12-01,01-10', 'the turned trees drop their leaves one by one between these dates (the woods beyond town thin out the same way)'),
  ('season_litter', '11-01,11-25,12-15,01-20', 'fallen leaves on the lawns and sidewalks: start, most, raking starts, raked (a few stay until spring)'),
  ('season_spring', '03-01', 'the leaves are back and the fallen leaves gone'),
  ('season_lights', '11-27,01-03', 'holiday decorations (string lights, wreaths, the town tree, the lobby tree): first day, last day');

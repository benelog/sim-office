-- A voice for everybody (the heroes speak with the voice of their npcs row): voice_like is a pattern of voice names
-- to look for among the browser's American English voices (Windows/Edge, macOS and iOS names); where none of them
-- is installed the game takes a voice of the person's gender, or shifts the pitch of the default voice.
UPDATE npcs SET voice_like = CASE id
  WHEN 'jun' THEN 'Eric|Brandon|Reed|Aaron'
  WHEN 'derek' THEN 'Guy|Davis|Alex|Tony'
  WHEN 'priya' THEN 'Aria|Ava|Allison|Ashley'
  WHEN 'maya' THEN 'Jenny|Samantha|Michelle|Zira'
  WHEN 'tom' THEN 'Mark|Tom|Jason|Andrew'
  WHEN 'sam' THEN 'David|Roger|Rocko|Brian'
  WHEN 'linda' THEN 'Susan|Victoria|Elizabeth|Nancy'
  WHEN 'rosa' THEN 'Kathy|Monica|Sandy|Jane'
  WHEN 'mike' THEN 'Junior|Andrew|Eddy|Brian'
  WHEN 'nina' THEN 'Sara|Amber|Nicky|Emma'
  WHEN 'carl' THEN 'Fred|Ralph|Grandpa|Christopher'
  WHEN 'greg' THEN 'Christopher|Steffan|Bruce|Albert'
  WHEN 'amy' THEN 'Cora|Ana|Shelley|Flo'
  WHEN 'kelly' THEN 'Michelle|Joanna|Kendra|Ivy'
  WHEN 'lee' THEN 'Roger|Tony|Albert|David'
  ELSE voice_like END;
UPDATE npcs SET voice_pitch = 1.02, voice_rate = 0.97 WHERE id = 'jun';

-- Sim Office game data. Source of truth: DoltHub benelog/sim-office (branch main).
-- Apply with: node tools/dolt.mjs push db/schema.sql   (one statement per DoltHub operation)
-- Export to the game with: node tools/dolt.mjs pull  → office/data/db.js (window.SO_DB)
DROP TABLE IF EXISTS _probe;

CREATE TABLE IF NOT EXISTS config (
  k varchar(64) PRIMARY KEY,
  v varchar(255) NOT NULL,
  note varchar(255)
);

-- Places the player can be. `zone` is the 3D area (city, home, office, diner, market, airport, hotel);
-- positions live in the zone files (office/zones/*.js), keyed by this id.
CREATE TABLE IF NOT EXISTS places (
  id varchar(32) PRIMARY KEY,
  name varchar(80) NOT NULL,
  name_ko varchar(80),
  zone varchar(32) NOT NULL,
  kind varchar(32),
  note varchar(255)
);

-- People. `model` is a Kenney Mini Characters model id (character-male-a … character-female-f).
CREATE TABLE IF NOT EXISTS npcs (
  id varchar(32) PRIMARY KEY,
  name varchar(80) NOT NULL,
  role varchar(80),
  role_ko varchar(80),
  model varchar(32) NOT NULL,
  place varchar(32),
  voice_pitch float DEFAULT 1,
  voice_rate float DEFAULT 0.95,
  voice_like varchar(40),
  bio text,
  bio_ko text
);

-- Idle small talk when you press Talk outside an episode (cycles through seq).
CREATE TABLE IF NOT EXISTS chatter (
  npc varchar(32) NOT NULL,
  seq int NOT NULL,
  line varchar(255) NOT NULL,
  line_ko varchar(255),
  PRIMARY KEY (npc, seq)
);

-- An episode: a conversation with one npc at one place, available on days day_from..day_to (game day 1 = first Monday)
-- between time_from and time_to (HH:MM, 24h). `requires` = comma-separated episode ids that must be done first.
-- reward = dollars paid at the end (0 for most; used for bonuses), energy = change to the energy bar.
CREATE TABLE IF NOT EXISTS episodes (
  id varchar(40) PRIMARY KEY,
  title varchar(120) NOT NULL,
  title_ko varchar(120),
  place varchar(32) NOT NULL,
  npc varchar(32) NOT NULL,
  day_from int DEFAULT 1,
  day_to int DEFAULT 99,
  time_from varchar(5) DEFAULT '00:00',
  time_to varchar(5) DEFAULT '23:59',
  requires varchar(255),
  summary text,
  summary_ko text,
  reward int DEFAULT 0,
  energy int DEFAULT 0,
  sort int DEFAULT 0,
  tags varchar(120)
);

-- One turn of an episode. The npc (or `speaker`) says `line`; `prompt` tells the player what to say;
-- answers = [{all:[kw…]}, {any:[kw…]}] keyword groups for typed answers (lib/matcher.js); model = the example
-- answer (also the correct choice); distractors = 3 wrong choices; hints = shown after misses; reply = what
-- the npc says after a good answer (may be empty).
CREATE TABLE IF NOT EXISTS turns (
  episode varchar(40) NOT NULL,
  seq int NOT NULL,
  speaker varchar(32),
  situation text,
  situation_ko text,
  line text NOT NULL,
  prompt text NOT NULL,
  prompt_ko text,
  answers json NOT NULL,
  model text NOT NULL,
  distractors json NOT NULL,
  hints json,
  hints_ko json,
  reply_speaker varchar(32),
  reply_line text,
  reply_ko text,
  PRIMARY KEY (episode, seq)
);

-- Expressions the episode teaches; they go into the player's phrasebook when the episode is done.
CREATE TABLE IF NOT EXISTS phrases (
  id varchar(48) PRIMARY KEY,
  episode varchar(40),
  text varchar(255) NOT NULL,
  meaning_ko varchar(255) NOT NULL,
  note text,
  note_ko text,
  category varchar(40)
);

-- Things money buys. kind: grocery | meal | drink | fare | ticket | rent | other. `model` is a Kenney Food Kit
-- node name (apple, burger, cup-coffee …) or empty. energy = how much the energy bar recovers when eaten.
CREATE TABLE IF NOT EXISTS items (
  id varchar(40) PRIMARY KEY,
  name varchar(80) NOT NULL,
  name_ko varchar(80),
  kind varchar(20) NOT NULL,
  price decimal(7,2) NOT NULL,
  model varchar(40),
  energy int DEFAULT 0,
  place varchar(32),
  note varchar(255)
);

-- The player's work calendar (shown in the HUD). day = game day, time = HH:MM.
CREATE TABLE IF NOT EXISTS calendar (
  day int NOT NULL,
  time varchar(5) NOT NULL,
  title varchar(120) NOT NULL,
  title_ko varchar(120),
  place varchar(32),
  episode varchar(40),
  PRIMARY KEY (day, time)
);

-- Where a person is through the day. days: weekday | weekend | all. A person with rows here is at the place of the
-- first row that fits the day and the time, and away (at home, off work) when none fits; a person without rows is
-- always at npcs.place. An open episode still puts its person at the episode's place.
CREATE TABLE IF NOT EXISTS schedule (
  npc varchar(32) NOT NULL,
  seq int NOT NULL,
  days varchar(8) NOT NULL DEFAULT 'all',
  time_from varchar(5) NOT NULL,
  time_to varchar(5) NOT NULL,
  place varchar(32) NOT NULL,
  PRIMARY KEY (npc, seq)
);

-- The weather of each game day. kind: clear | partly | cloudy | rain | fog (fog lifts by late morning).
-- Temperatures are in Fahrenheit. Days past the last row repeat the table.
CREATE TABLE IF NOT EXISTS weather (
  day int PRIMARY KEY,
  kind varchar(12) NOT NULL,
  high_f int NOT NULL,
  low_f int NOT NULL,
  forecast varchar(160) NOT NULL,
  forecast_ko varchar(160)
);

-- What people say in passing about the weather, the day or the time. topic: weather:<kind> | day:monday |
-- day:friday | day:weekend | time:morning | time:lunch | time:evening.
CREATE TABLE IF NOT EXISTS smalltalk (
  topic varchar(24) NOT NULL,
  seq int NOT NULL,
  line varchar(255) NOT NULL,
  line_ko varchar(255),
  PRIMARY KEY (topic, seq)
);

-- Bills on autopay: taken from the account in the morning of game day `day`, then every `every` days.
CREATE TABLE IF NOT EXISTS bills (
  id varchar(32) PRIMARY KEY,
  name varchar(80) NOT NULL,
  name_ko varchar(80),
  amount decimal(7,2) NOT NULL,
  day int NOT NULL,
  every int NOT NULL DEFAULT 30,
  note varchar(255)
);

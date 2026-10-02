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
  name_ko varchar(80),
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

-- An episode: a conversation of one hero (heroes.id: whose game it belongs to) with one npc at one place, available on days day_from..day_to (game day 1 = first Monday)
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
  tags varchar(120),
  hero varchar(16) NOT NULL DEFAULT 'jun'          -- a hero id, a list ('jun,derek') or all
);

-- One turn of an episode. The npc (or `speaker`) says `line`; `prompt` is what the player wants to get across (an
-- intent, not a script); model = the right thing to say; distractors = 3 wrong choices that sound plausible (a wrong
-- fact, the wrong tone for the person, or not what was asked), reactions = what the other person says to each of
-- them; reply = what the npc says after the right answer (may be empty). Every text has a Korean twin (_ko): the
-- screen shows one language (multiple choice only since 2026-10-02; answers and hints are no longer used).
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
  line_ko text,
  model_ko text,
  distractors_ko json,
  reactions json,
  reactions_ko json,
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

-- Things money buys. kind: grocery | meal | drink | gear | fare | ticket | rent | other. shelf_days = how long a
-- grocery keeps after you buy it (NULL: it keeps), uses = portions in a package, cook_only = not eaten as it is.
-- `model` is a Kenney Food Kit
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
  note varchar(255),
  note_ko varchar(255),
  shelf_days int,
  uses int NOT NULL DEFAULT 1,
  cook_only tinyint NOT NULL DEFAULT 0
);

-- The work calendar of each hero (shown in the HUD). day = game day, time = HH:MM.
CREATE TABLE IF NOT EXISTS calendar (
  day int NOT NULL,
  time varchar(5) NOT NULL,
  title varchar(120) NOT NULL,
  title_ko varchar(120),
  place varchar(32),
  episode varchar(40),
  hero varchar(16) NOT NULL DEFAULT 'jun',
  PRIMARY KEY (hero, day, time)
);

-- Where a person is through the day. days: weekday | weekend | all, or game days ('11' or '11-12': a trip). A person with rows here is at the place of the
-- first row that fits the day and the time, and away (at home, off work) when none fits; a person without rows is
-- always at npcs.place. An open episode still puts its person at the episode's place.
CREATE TABLE IF NOT EXISTS schedule (
  npc varchar(32) NOT NULL,
  seq int NOT NULL,
  days varchar(40) NOT NULL DEFAULT 'all',          -- all | weekday | weekend | mon,tue,… | game days 11-12
  time_from varchar(5) NOT NULL,
  time_to varchar(5) NOT NULL,
  place varchar(32) NOT NULL,
  PRIMARY KEY (npc, seq)
);

-- The weather of each game day. kind: clear | partly | cloudy | rain | fog (fog lifts by late morning).
-- Temperatures are in Fahrenheit. Days past the last row are made by the engine from the season.
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
  note varchar(255),
  note_ko varchar(255),
  company varchar(60)                              -- who sends the statement email five days before (after the missions)
);

-- The people you can play. Each has a home of their own (a zone, with a bed, a kitchen, a desk and the door in
-- the city), a desk at the office, their own money, and their own episodes and calendar (episodes.hero,
-- calendar.hero). The other heroes are in the game as people (npcs rows with the same id); the one you play is not.
CREATE TABLE IF NOT EXISTS heroes (
  id varchar(16) PRIMARY KEY,
  name varchar(40) NOT NULL,
  full_name varchar(80) NOT NULL,
  name_ko varchar(40),
  full_name_ko varchar(80),
  role varchar(80) NOT NULL,
  role_ko varchar(80),
  model varchar(32) NOT NULL,
  bio text,
  bio_ko text,
  home_zone varchar(32) NOT NULL,
  home_name varchar(80),
  home_name_ko varchar(80),
  home_bed varchar(32) NOT NULL,
  home_kitchen varchar(32),
  home_desk varchar(32),
  home_door varchar(32) NOT NULL,
  desk varchar(32) NOT NULL,
  start_money int NOT NULL,
  salary_net int NOT NULL,
  salary_gross int NOT NULL,
  housing int NOT NULL,
  housing_name varchar(40) NOT NULL DEFAULT 'Rent',
  housing_name_ko varchar(40),
  level varchar(80),
  level_ko varchar(80),
  sort int DEFAULT 0
);

-- What arrives on your phone: texts, emails, voicemails and alerts, on game day `day` at `time`. hero: all, or the
-- hero who gets it. sender: an npcs id (shown by name, read in their voice) or a name; a message from the hero you
-- play is left out. {name} in the body is your name. The bank's alerts (deposits, autopay, low balance) are made
-- by the game, not kept here.
CREATE TABLE IF NOT EXISTS messages (
  id varchar(40) PRIMARY KEY,
  hero varchar(16) NOT NULL DEFAULT 'all',
  day int NOT NULL,
  time varchar(5) NOT NULL,
  kind varchar(12) NOT NULL DEFAULT 'text',
  sender varchar(60) NOT NULL,
  subject varchar(120),
  subject_ko varchar(120),
  body text NOT NULL,
  body_ko text,
  every int,                                       -- comes back every this many days (30 or more: the same date every month)
  last_day int                                     -- the last game day it comes back (NULL: no end)
);

-- Holidays and days people talk about, by their real date (game day 1 is config start_date, a Monday).
-- kind: federal (banks and post offices closed, buses on the weekend timetable) | observance.
CREATE TABLE IF NOT EXISTS holidays (
  date varchar(10) PRIMARY KEY,
  name varchar(80) NOT NULL,
  name_ko varchar(80),
  kind varchar(12) NOT NULL DEFAULT 'observance',
  note varchar(255),
  note_ko varchar(255)
);

-- What you can cook at home. ingredients = items ids, comma-separated: one portion of each. steps are separated by " | ".
CREATE TABLE IF NOT EXISTS recipes (
  id varchar(40) PRIMARY KEY,
  name varchar(80) NOT NULL,
  name_ko varchar(80),
  minutes int NOT NULL DEFAULT 15,
  energy int NOT NULL DEFAULT 30,
  ingredients varchar(255) NOT NULL,
  tool varchar(20),
  steps text,
  steps_ko text,
  sort int DEFAULT 0
);

-- Answers to a message. For a text or email the reply goes out and answer (from answer_from, else the sender) comes
-- back `delay` minutes later, or nothing when answer is NULL. For a voicemail the reply is what you say when you
-- call back, and answer is what you hear, right away. tone: good | ok | poor (tip_ko says why). {name} = your name.
CREATE TABLE IF NOT EXISTS replies (
  id varchar(50) PRIMARY KEY,
  msg varchar(40) NOT NULL,
  sort int DEFAULT 0,
  label varchar(255) NOT NULL,
  label_ko varchar(255),
  tone varchar(8) NOT NULL DEFAULT 'good',
  tip_ko varchar(255),
  answer text,
  answer_ko text,
  answer_from varchar(60),
  delay int NOT NULL DEFAULT 10
);

-- What comes in the mailbox at home: on game day `day` (not on Sundays and federal holidays) after config mail_time.
-- kind: junk | bill | letter | notice | card. hero: all, or the hero who gets it.
CREATE TABLE IF NOT EXISTS mail (
  id varchar(40) PRIMARY KEY,
  hero varchar(16) NOT NULL DEFAULT 'all',
  day int NOT NULL,
  kind varchar(12) NOT NULL DEFAULT 'junk',
  sender varchar(60) NOT NULL,
  subject varchar(120),
  subject_ko varchar(120),
  body text NOT NULL,
  body_ko text,
  every int,                                       -- as messages.every; a letter due on a Sunday or a holiday comes the next mail day
  last_day int
);

-- The local radio station (turn it on at the desk at home). The engine says the time, the date and the weather
-- itself; these are the other parts. day: the game day it is on the air, NULL = any day (taken in turn).
-- kind: news | community | sports | traffic (weekday rush hours) | ad.
CREATE TABLE IF NOT EXISTS radio (
  id varchar(40) PRIMARY KEY,
  day int,
  kind varchar(12) NOT NULL DEFAULT 'news',
  text text NOT NULL,
  text_ko text,
  sort int DEFAULT 0
);

-- TV channels (watch on the sofa at home): real YouTube channels shown in the YouTube player with English captions.
-- channel: the YouTube channel id (UC…); live = 1: it streams live (a Live button besides Latest, the uploads).
-- kind: news | tech.
CREATE TABLE IF NOT EXISTS tv (
  id varchar(24) PRIMARY KEY,
  name varchar(60) NOT NULL,
  kind varchar(8) NOT NULL DEFAULT 'news',
  channel varchar(32) NOT NULL,
  live tinyint NOT NULL DEFAULT 0,
  note varchar(255),
  note_ko varchar(255),
  sort int DEFAULT 0
);

-- Meetings that come back after the missions (free play), on working days: the daily standup, a 1:1 every other
-- week, sprint planning and retro, the monthly all-hands. hero: all, a hero id or a list ('jun,derek'). days: names of
-- days ('mon,tue,wed,thu,fri'). every: week | 2weeks (weeks where (game day - 1) / 7 % 2 = parity) | month (the first
-- such day of the month). time: when it starts (shown on the calendar; the episodes' own time_from–time_to is when the
-- conversation is open). episodes: the conversations, taken in turn (only the hero's own). miss_points: points lost
-- when you were at work and did not go. people: who comes to the meeting (besides those with a line), if at work.
CREATE TABLE IF NOT EXISTS routines (
  id varchar(32) PRIMARY KEY,
  hero varchar(32) NOT NULL DEFAULT 'all',
  title varchar(120) NOT NULL,
  title_ko varchar(120),
  days varchar(40) NOT NULL,
  every varchar(8) NOT NULL DEFAULT 'week',
  parity int NOT NULL DEFAULT 0,
  time varchar(5) NOT NULL,
  place varchar(32) NOT NULL,
  episodes varchar(1000) NOT NULL,
  people varchar(255),
  miss_points int NOT NULL DEFAULT 5,
  sort int NOT NULL DEFAULT 0
);

-- Things that come up while you work at your desk ("Work for an hour" at the office on a working day; at most two a
-- day, the ones not seen yet first). hero: all, a hero id or a list ('jun,derek'). kind: build | review | alert | ticket
-- | email | chat. sender: who it comes from (npcs id; NULL for a system or someone without a person). choices: JSON
-- [{ t, t_ko (what you do), r, r_ko (what happens), points, minutes (how long it takes) }], three of them, shown in a
-- random order. day_from: not before this game day. time_from / time_to: only between these times (NULL: any time).
CREATE TABLE IF NOT EXISTS tasks (
  id varchar(32) PRIMARY KEY,
  hero varchar(32) NOT NULL DEFAULT 'all',
  kind varchar(16) NOT NULL,
  sender varchar(32),
  title varchar(120) NOT NULL,
  title_ko varchar(120),
  body varchar(600) NOT NULL,
  body_ko varchar(600),
  choices json NOT NULL,
  day_from int NOT NULL DEFAULT 1,
  time_from varchar(5),
  time_to varchar(5),
  sort int NOT NULL DEFAULT 0
);

-- Benefits you pick in the HR portal at open enrollment (config benefits_open – benefits_close; they start on
-- benefits_start): one plan of each kind (medical | dental | vision; a "No … coverage" row with premium 0 is the way to
-- go without). premium: dollars out of every paycheck before tax (employee only). deductible, oop_max: dollars a year.
-- copays: JSON of what you pay for a visit or a purchase, by kind of care (medical: doctor, specialist, urgent, er, rx;
-- dental: cleaning, filling; vision: eye_exam, glasses; a high-deductible plan: the full price until the deductible).
-- hsa: what the company puts into your health savings account every paycheck.
CREATE TABLE IF NOT EXISTS plans (
  id varchar(16) PRIMARY KEY,
  kind varchar(8) NOT NULL,
  name varchar(60) NOT NULL,
  name_ko varchar(60),
  premium decimal(8,2) NOT NULL DEFAULT 0,
  deductible int NOT NULL DEFAULT 0,
  oop_max int NOT NULL DEFAULT 0,
  copays json NOT NULL,
  hsa decimal(8,2) NOT NULL DEFAULT 0,
  note varchar(255),
  note_ko varchar(255),
-- What coworkers say and do as you get closer (config friend_*: closeness 0-100 with each coworker, friend_levels for
-- Friendly, Friend and Close friend). npc: the coworker (npcs id). hero: all, a hero id or a list ('jun,derek').
-- kind: lunch | diner (what they talk about at lunch together, in the office kitchen or at the diner) | invite (a text:
-- lunch at the diner, {time}) | noshow (a text when you did not come) | coffee | umbrella (said on a chat) | cover (a
-- text: they gave your update at a meeting you missed, {meeting}) | text (on a weekend) | tip (shown on the card of
-- the desk task `task`, a tasks id). need: the closeness it takes. Lines of a kind come in turn.
CREATE TABLE IF NOT EXISTS friends (
  id varchar(40) PRIMARY KEY,
  npc varchar(32) NOT NULL,
  hero varchar(32) NOT NULL DEFAULT 'all',
  kind varchar(16) NOT NULL,
  task varchar(32),
  need int NOT NULL DEFAULT 0,
  line varchar(400) NOT NULL,
  line_ko varchar(400),
  sort int NOT NULL DEFAULT 0
);

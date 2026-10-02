-- 2026-10-02: missions, then free play. Every hero's conversations (episodes) are the missions of days 1-15 (two weeks
-- and the Monday after: Jun's trip report, expenses and sick call; Derek's and Priya's day 15 are in 72-day15.sql);
-- from day 16 there are no set conversations, only the life of the town and the job. Jun asking for a raise two
-- weeks into the job was not realistic, so that conversation is taken out (it is in the git history, 30-fixes.sql).
-- Finishing every mission: a congratulation, a bonus deposit (mission_bonus) and points (mission_points).
-- Push after 70-life.sql: node tools/dolt.mjs push db/seed/71-missions.sql
DELETE FROM turns WHERE episode IN ('d15_raise');
DELETE FROM phrases WHERE episode IN ('d15_raise');
DELETE FROM episodes WHERE id IN ('d15_raise');
DELETE FROM calendar WHERE hero = 'jun' AND day = 15 AND time = '15:00';
REPLACE INTO config (k, v, note) VALUES
  ('mission_days', '15', 'the missions (every conversation of the hero) run through this game day; free play after that'),
  ('mission_bonus', '1000', 'dollars the company pays when every mission is done'),
  ('mission_points', '200', 'points for finishing every mission');

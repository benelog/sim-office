-- 2026-10-02: two weeks of missions, then free play. Every hero's conversations (episodes) are the missions of
-- days 1-14; from day 15 there are no set conversations, only the life of the town and the job. Jun's four day-15
-- conversations (trip report, expense report, asking for a raise, calling in sick) had no room in week 2 (he is
-- away on the trip until Friday) and are taken out; they are in the git history (db/seed/22-life.sql, 30-fixes.sql).
-- Finishing every mission of the two weeks: a congratulation, a bonus deposit (mission_bonus) and points (mission_points).
-- Push after 70-life.sql: node tools/dolt.mjs push db/seed/71-missions.sql
DELETE FROM turns WHERE episode IN ('d15_trip_report', 'd15_expenses', 'd15_raise', 'd15_sick_call');
DELETE FROM phrases WHERE episode IN ('d15_trip_report', 'd15_expenses', 'd15_raise', 'd15_sick_call');
DELETE FROM episodes WHERE id IN ('d15_trip_report', 'd15_expenses', 'd15_raise', 'd15_sick_call');
DELETE FROM calendar WHERE hero = 'jun' AND day = 15;
REPLACE INTO config (k, v, note) VALUES
  ('mission_days', '14', 'the missions (every conversation of the hero) are the first two weeks; free play after that'),
  ('mission_bonus', '1000', 'dollars the company pays when every mission of the two weeks is done'),
  ('mission_points', '200', 'points for finishing every mission of the two weeks');

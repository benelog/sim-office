-- Time off: PTO and sick days, as Maya explains them on Jun's day 4 (d4_pto): fifteen days of PTO a year that build
-- up a little every paycheck, and five sick days on top (40 hours, California's minimum, given at the start and filled
-- again on January 1). Sick: text your manager before standup to be out today, or later for the next working day; with
-- no sick time left it comes out of PTO, then it's unpaid. PTO is asked for at least two weeks ahead (after the
-- missions), and the manager answers the next morning. Derek and Priya have been at Seaside Labs longer: some PTO in
-- the bank, and Derek, a senior developer, builds it up faster.
REPLACE INTO config (k, v, note) VALUES
  ('pto_hours_year', 'jun:120,derek:160,priya:120', 'PTO hours a year for each hero (hero:hours, or one number), built up evenly over 26 paychecks'),
  ('pto_start', 'jun:0,derek:56,priya:40', 'PTO hours each hero has on day 1 (Jun is new)'),
  ('sick_hours', '40', 'sick time in hours, given at the start and again on January 1 (California: at least 40 hours or five days)'),
  ('pto_notice_days', '14', 'PTO is asked for at least this many days ahead; the manager answers the next morning'),
  ('sick_call_by', '09:30', 'text your manager before this to be out sick today (later: the next working day)');

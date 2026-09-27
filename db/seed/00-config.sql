-- Game constants. Money is in US dollars.
REPLACE INTO config (k, v, note) VALUES
  ('player_name', 'Jun', 'default player name; the player can change it'),
  ('company', 'Seaside Labs', 'the IT company the player works for'),
  ('city', 'Fairview', 'fictional US city'),
  ('start_money', '1200', 'dollars in the bank on day 1'),
  ('salary_net', '2600', 'net pay per paycheck (biweekly, direct deposit on payday Fridays)'),
  ('salary_gross', '3654', 'gross pay per paycheck, shown on the pay stub'),
  ('payday_days', '5,19', 'game days on which the paycheck arrives: every other Friday (day 1 is a Monday, so days 5 and 19)'),
  ('rent', '1450', 'monthly rent, due on day 1 of each month (game day 21)'),
  ('bus_fare', '2.50', 'one bus ride'),
  ('day_start', '07:00', 'the alarm'),
  ('day_end', '23:00', 'you fall asleep wherever you are'),
  ('work_start', '09:00', 'core hours'),
  ('work_end', '18:00', 'core hours'),
  ('minutes_per_second', '1', 'game minutes per real second while walking'),
  ('energy_max', '100', 'the energy bar'),
  ('energy_per_hour', '-6', 'energy lost per game hour awake');

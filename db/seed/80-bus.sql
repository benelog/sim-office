-- Bus delays and full buses: the Number 12 no longer keeps its timetable to the minute. On a rainy day most buses
-- run 5 to 10 minutes late (a few more in the rush hours), in the weekday rush about half run 3 to 8 minutes late,
-- and at other times one now and then is a minute or three behind. In the rush a bus can be too full to stop; the one
-- behind it comes 4 to 8 minutes later. Nobody waits more than 15 minutes past the time on the timetable. The engine
-- makes it all from the day and the departure, so the bus panel, the ride, the radio and the phone agree. Day 1 (the
-- first ride, with Carl) keeps to the timetable.
REPLACE INTO config (k, v, note) VALUES
  ('bus_delay_from', '2', 'the first game day buses can be late or full (day 1 keeps to the timetable)'),
  ('bus_rush', '07:00-09:30,16:30-18:30', 'the rush hours of a working day (buses leaving in them can be late or full)'),
  ('bus_late_chance_rain', '0.8', 'on a rainy day, the share of buses that run late'),
  ('bus_late_rain', '5-10', 'how late a bus runs in the rain, in minutes (up to 3 more in the rush hours)'),
  ('bus_late_chance_rush', '0.5', 'in the rush hours of a dry working day, the share of buses that run late'),
  ('bus_late_rush', '3-8', 'how late a bus runs in the rush hours, in minutes'),
  ('bus_late_chance', '0.1', 'at other times, the share of buses that run a little late'),
  ('bus_late', '1-3', 'how late a bus runs at other times, in minutes'),
  ('bus_full_chance', '0.06', 'in the rush hours, the share of buses too full to stop (half again in the rain; never two in a row)'),
  ('bus_full_gap', '4-8', 'minutes from a full bus to the one behind it'),
  ('bus_delay_max', '15', 'nobody gets on a bus more than this many minutes after the time on the timetable'),
  ('bus_line', '12', 'the bus line number (the Number 12)'),
  ('transit_sender', 'Fairview Transit', 'who sends the service alert on a rainy day'),
  ('bus_alert_time', '06:30', 'when the rainy-day service alert comes');

-- The radio's traffic report on the buses now comes from the engine (how late they really are), so this one no
-- longer says they are late.
REPLACE INTO radio (id, day, kind, text, text_ko, sort) VALUES
  ('rt_bus', NULL, 'traffic', 'Fairview Transit reminds riders that the Number 12 runs every twenty minutes on weekdays and every half hour on weekends. You can see where your bus is on the Fairview Transit app.', '페어뷰 교통공사 안내입니다. 12번 버스는 평일에는 20분, 주말에는 30분 간격으로 다닙니다. 버스가 어디쯤 오는지는 페어뷰 교통공사 앱에서 볼 수 있습니다.', 3);

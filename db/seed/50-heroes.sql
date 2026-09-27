-- The three people you can play, their homes and desks, and Jun as a colleague in the other two games.
REPLACE INTO heroes (id, name, full_name, role, role_ko, model, bio, bio_ko, home_zone, home_name, home_name_ko, home_bed, home_kitchen, home_desk, home_door, desk, start_money, salary_net, salary_gross, housing, housing_name, level, level_ko, sort) VALUES
  ('jun', 'Jun', 'Jun Kim', 'Software developer, new hire', '신입 소프트웨어 개발자',
   'man-casual-3', 'Just moved to Fairview for a first job in the US. Everything is new: the badge, the standup, the tipping.', '미국 첫 직장 때문에 페어뷰로 막 이사 왔습니다. 출입증도, 스탠드업도, 팁도 모두 처음입니다.',
   'home', 'Studio at Maple Street Apartments', '메이플 스트리트 아파트의 원룸', 'home_bed', 'home_kitchen', 'home_desk', 'apartment_door', 'office_desk',
   1200, 2600, 3654, 1450, 'Rent', 'Everyday and first-week English', '일상·입사 첫 주 영어', 1),
  ('derek', 'Derek', 'Derek Alvarez', 'Senior developer, onboarding buddy', '시니어 개발자, 온보딩 버디',
   'man-hoodie', 'Six years at Seaside Labs. Reviews the code, is on call when things break, and shows the new hire the ropes.', '시사이드 랩스 6년 차. 코드를 리뷰하고, 장애가 나면 호출을 받고, 신입에게 일을 가르칩니다.',
   'home_derek', 'House on River Road', '리버 로드의 단독 주택', 'derek_bed', 'derek_kitchen', 'derek_desk', 'derek_door', 'office_desk_team',
   5400, 3900, 5770, 2150, 'Mortgage', 'Mentoring, code review, pushing back', '멘토링·코드 리뷰·반대 의견 말하기', 2),
  ('priya', 'Priya', 'Priya Nair', 'Product manager', '프로덕트 매니저',
   'woman-casual-2', 'Runs the standup, owns the roadmap and talks to the client. Every meeting ends on time.', '스탠드업을 진행하고, 로드맵을 책임지고, 고객과 이야기합니다. 회의는 늘 제시간에 끝납니다.',
   'home_priya', 'Loft at Cedar Street Lofts', '시더 스트리트 로프트', 'priya_bed', 'priya_kitchen', 'priya_desk', 'priya_door', 'office_desk_priya',
   3800, 3500, 5000, 1900, 'Rent', 'Running meetings, negotiating, stakeholders', '회의 진행·협상·이해관계자 소통', 3);

REPLACE INTO places (id, name, name_ko, zone, kind, note) VALUES
  ('derek_door', 'Derek''s house on River Road', '리버 로드의 데릭네 집', 'city', 'door', 'Leads to home_derek derek_out (only in Derek''s game).'),
  ('priya_door', 'Cedar Street Lofts', '시더 스트리트 로프트', 'city', 'door', 'Leads to home_priya priya_out (only in Priya''s game).'),
  ('derek_bed', 'Your bed', '내 침대', 'home_derek', 'sleep', 'Sleep here to end the day.'),
  ('derek_kitchen', 'Kitchen', '부엌', 'home_derek', 'eat', 'Eat groceries from your inventory.'),
  ('derek_desk', 'Home office', '집 서재', 'home_derek', 'desk', 'On-call laptop and phone calls.'),
  ('derek_out', 'Front door', '현관', 'home_derek', 'door', 'Leads to city derek_door.'),
  ('priya_bed', 'Your bed', '내 침대', 'home_priya', 'sleep', 'Sleep here to end the day.'),
  ('priya_kitchen', 'Kitchen island', '아일랜드 부엌', 'home_priya', 'eat', 'Eat groceries from your inventory.'),
  ('priya_desk', 'Desk by the window', '창가 책상', 'home_priya', 'desk', 'Planning and phone calls.'),
  ('priya_out', 'Loft door', '로프트 현관', 'home_priya', 'door', 'Leads to city priya_door.'),
  ('office_desk_priya', 'Priya''s desk', '프리야의 자리', 'office', 'desk', 'Priya''s own desk in the open-plan row (her place to work in her game).');

REPLACE INTO npcs (id, name, role, role_ko, model, place, voice_pitch, voice_rate, voice_like, bio, bio_ko) VALUES
  ('jun', 'Jun Kim', 'Software developer, new hire', '신입 소프트웨어 개발자', 'man-casual-3', 'office_desk', 1, 0.95, NULL, 'The new developer on the team, in his first week. Eager, polite, and full of questions he is a little shy to ask.', '팀에 새로 온 개발자로 첫 주를 보내는 중입니다. 열심이고 공손하며, 묻기 조금 쑥스러운 질문이 많습니다.');

REPLACE INTO chatter (npc, seq, line, line_ko) VALUES
  ('jun', 1, 'Hi! I''m still finding my way around the codebase.', '안녕하세요! 아직 코드베이스를 파악하는 중이에요.'),
  ('jun', 2, 'Quick question: is it okay if I ask a lot of questions?', '잠깐 질문인데요, 질문을 많이 해도 괜찮을까요?'),
  ('jun', 3, 'I finally got my dev environment working!', '드디어 개발 환경이 돌아가요!'),
  ('jun', 4, 'Everyone here has been really welcoming.', '여기 분들이 다 정말 반갑게 맞아 주세요.');

REPLACE INTO schedule (npc, seq, days, time_from, time_to, place) VALUES
  ('jun', 1, 'weekday', '08:45', '12:20', 'office_desk'),
  ('jun', 2, 'weekday', '12:20', '12:45', 'office_kitchen'),
  ('jun', 3, 'weekday', '12:45', '18:00', 'office_desk');

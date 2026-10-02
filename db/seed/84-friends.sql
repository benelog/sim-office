-- Coworkers you get close to (tenth round): closeness 0-100 with each coworker (config friend_people, without the hero
-- you play) that grows when you chat, have lunch together in the office kitchen, get through a conversation or a
-- meeting with them, answer their texts and handle well what they send to your desk, and fades after some days apart.
-- Friendly, Friend and Close friend (friend_levels) bring help: a tip on a desk task card, a coffee on a morning chat, a
-- spare umbrella when it rains, texts on weekends, an invitation to lunch at the Sunny Side Diner that really happens
-- (they wait in the booth, and you have lunch with them there), and a close friend gives your update at a team meeting
-- you missed. The friends table holds what they say and do; kind: lunch | diner (at the table) | invite ({time}) |
-- noshow | coffee | umbrella | cover ({meeting}) | text (weekends) | tip (task: a tasks id). need: closeness needed.
-- The friends table is in db/schema.sql (this CREATE TABLE is the same).
CREATE TABLE IF NOT EXISTS friends (id varchar(40) PRIMARY KEY, npc varchar(32) NOT NULL, hero varchar(32) NOT NULL DEFAULT 'all', kind varchar(16) NOT NULL, task varchar(32), need int NOT NULL DEFAULT 0, line varchar(400) NOT NULL, line_ko varchar(400), sort int NOT NULL DEFAULT 0);

REPLACE INTO config (k, v, note) VALUES
  ('friend_people', 'maya,derek,priya,jun,sam,linda,tom', 'coworkers you can get close to (the hero you play is left out)'),
  ('friend_start', 'jun/derek:10,derek/priya:30,derek/maya:25,derek/sam:20,derek/tom:15,priya/derek:30,priya/maya:25,priya/linda:20,priya/tom:15', 'closeness on day 1, hero/coworker:points (Derek and Priya have worked together for a while; Derek is Jun''s onboarding buddy)'),
  ('friend_levels', '20,45,70', 'closeness (0-100) for Friendly, Friend and Close friend'),
  ('friend_chat', '2', 'closeness for Chat with someone, the first time a day'),
  ('friend_lunch', '6', 'closeness for lunch together in the office kitchen (everyone at the table)'),
  ('friend_diner', '10', 'closeness for lunch at the diner with a Friend who invited you'),
  ('friend_noshow', '4', 'closeness lost when you do not come to a lunch you were invited to'),
  ('friend_talk', '4', 'closeness for a conversation with them, at most (by the points you got in it)'),
  ('friend_meeting', '1', 'closeness with everyone else in a conversation or a meeting you finish'),
  ('friend_reply', 'good:3,ok:1,poor:-2', 'closeness for answering their text or email, by the tone of your answer'),
  ('friend_task', '2', 'closeness for handling well what they sent to your desk (lost for handling it badly)'),
  ('friend_fade', '1', 'closeness lost each day after friend_fade_days without time together'),
  ('friend_fade_days', '5', 'days without time together before closeness starts to fade'),
  ('friend_coffee_energy', '8', 'energy from the coffee a Friend brings you on a morning chat at work (once a week each)'),
  ('friend_lunch_energy', '10', 'energy from lunch in the office kitchen'),
  ('friend_lunch_time', '12:30', 'a Friend who invited you is in the booth at the diner from 15 minutes before this until an hour after'),
  ('friend_invite_time', '10:45', 'when an invitation to lunch at the diner comes (working days after the missions)'),
  ('friend_invite_days', '5', 'at least this many days between two invitations'),
  ('friend_invite_chance', '0.4', 'chance of an invitation on a working day when a Friend is at work'),
  ('friend_diner_item', 'diner_club', 'what you have at the diner with a friend (items id; you pay for it with tax and tip)'),
  ('friend_cover_days', '14', 'a Close friend gives your update at a missed meeting at most once in this many days'),
  ('friend_review', '3', 'at the review: a point for each coworker who is a Friend or closer, at most this many');

REPLACE INTO friends (id, npc, hero, kind, task, need, line, line_ko, sort) VALUES
  ('f_maya_lunch_1', 'maya', 'all', 'lunch', NULL, 0, 'I try to eat lunch away from my desk at least twice a week. Otherwise the whole day blurs together.', '일주일에 두 번은 꼭 자리에서 벗어나서 점심을 먹으려고 해요. 안 그러면 하루가 통째로 흐릿해지거든요.', 10),
  ('f_maya_lunch_2', 'maya', 'all', 'lunch', NULL, 0, 'My first manager told me to write down what I did every Friday. It makes review time so much easier.', '제 첫 매니저가 금요일마다 한 일을 적어 두라고 했어요. 그러면 평가 때가 훨씬 편해요.', 20),
  ('f_maya_lunch_3', 'maya', 'all', 'lunch', NULL, 20, 'Between us, the hardest part of managing is the calendar. I used to write code all day. Now I write agendas.', '우리끼리 얘기지만, 매니저 일에서 제일 힘든 건 일정이에요. 예전엔 하루 종일 코드를 썼는데 이젠 회의 안건을 써요.', 30),
  ('f_maya_diner_1', 'maya', 'all', 'diner', NULL, 45, 'I grew up two hours from here, in a town with one stoplight. Fairview still feels like a big city to me.', '저는 여기서 두 시간 떨어진, 신호등이 하나뿐인 동네에서 자랐어요. 아직도 페어뷰가 대도시 같아요.', 40),
  ('f_maya_diner_2', 'maya', 'all', 'diner', NULL, 45, 'I like hearing how things are going outside the sprint board. You''re doing better than you think.', '스프린트 보드 밖의 얘기를 듣는 게 좋아요. 생각보다 훨씬 잘하고 있어요.', 50),
  ('f_maya_invite_1', 'maya', 'all', 'invite', NULL, 45, 'Want to get out of the office for lunch today? I''ll be at the Sunny Side Diner at {time}, in a booth by the window.', '오늘 점심은 사무실 밖에서 할래요? {time}에 서니 사이드 다이너 창가 부스에 있을게요.', 60),
  ('f_maya_noshow_1', 'maya', 'all', 'noshow', NULL, 0, 'Missed you at lunch. No problem at all, I know some days get busy.', '점심때 못 봤네요. 괜찮아요, 바쁜 날도 있죠.', 70),
  ('f_maya_coffee_1', 'maya', 'all', 'coffee', NULL, 45, 'I walked past the coffee cart and got an extra one. It''s yours if you want it.', '커피 카트 지나다가 한 잔 더 샀어요. 괜찮으면 마셔요.', 80),
  ('f_maya_umbrella_1', 'maya', 'all', 'umbrella', NULL, 45, 'It''s pouring out there. Take the spare umbrella from my office, and bring it back whenever.', '밖에 비가 쏟아져요. 제 방에 있는 여분 우산 가져가요. 아무 때나 돌려주면 돼요.', 90),
  ('f_maya_text_1', 'maya', 'all', 'text', NULL, 45, 'Hope you''re having a restful weekend. No work talk, I promise. I''m finally repotting my plants.', '주말 잘 쉬고 있길 바라요. 일 얘기는 안 할게요. 저는 드디어 화분 분갈이를 하고 있어요.', 100),
  ('f_maya_text_2', 'maya', 'all', 'text', NULL, 45, 'Just tried the new bakery on Lake Avenue. The cinnamon rolls are dangerous.', '레이크 애비뉴에 새로 생긴 빵집에 가 봤어요. 시나몬 롤이 위험할 정도로 맛있어요.', 110),
  ('f_maya_text_3', 'maya', 'all', 'text', NULL, 45, 'A note from your manager: actually rest this weekend. Laptop closed, phone on silent.', '매니저로서 한마디: 이번 주말엔 진짜로 쉬어요. 노트북은 덮고, 휴대전화는 무음으로요.', 120),
  ('f_derek_lunch_1', 'derek', 'all', 'lunch', NULL, 0, 'Pro tip: the leftover pizza from the all-hands is fair game after two o''clock. Before that, people get territorial.', '꿀팁: 전사 회의 끝나고 남은 피자는 두 시가 넘으면 아무나 먹어도 돼요. 그 전엔 다들 자기 거라고 지켜요.', 130),
  ('f_derek_lunch_2', 'derek', 'all', 'lunch', NULL, 0, 'I spent all Saturday fixing my sprinkler system. Owning a house is ninety percent fixing things.', '토요일 내내 스프링클러를 고쳤어요. 집을 갖는다는 건 90%가 뭔가를 고치는 일이에요.', 140),
  ('f_derek_lunch_3', 'derek', 'all', 'lunch', NULL, 20, 'When I started here, I broke production on my second day. Everybody survived, and they still let me merge code.', '저는 여기 와서 둘째 날에 운영 서버를 망가뜨렸어요. 다들 무사했고, 저는 지금도 코드를 머지하고 있어요.', 150),
  ('f_derek_diner_1', 'derek', 'all', 'diner', NULL, 45, 'My mom keeps asking who I''m bringing to Thanksgiving. I tell her the dashboard is my plus-one.', '엄마가 추수감사절에 누구를 데려오냐고 자꾸 물어봐요. 대시보드가 제 동반자라고 해요.', 160),
  ('f_derek_diner_2', 'derek', 'all', 'diner', NULL, 45, 'The burger here is the best in Fairview, and I will defend that like a code review.', '여기 버거가 페어뷰 최고예요. 코드 리뷰에서처럼 끝까지 우길 수 있어요.', 170),
  ('f_derek_invite_1', 'derek', 'all', 'invite', NULL, 45, 'Diner for lunch? I''m craving their cheeseburger. I''ll grab a booth at {time}.', '점심은 다이너 어때요? 거기 치즈버거가 너무 당겨요. {time}에 부스 잡아 둘게요.', 180),
  ('f_derek_noshow_1', 'derek', 'all', 'noshow', NULL, 0, 'Ate my burger solo. No worries, I figured you got stuck in something.', '버거는 혼자 먹었어요. 괜찮아요, 뭔가에 붙잡혔겠거니 했어요.', 190),
  ('f_derek_coffee_1', 'derek', 'all', 'coffee', NULL, 45, 'Coffee run. I got you the usual. Don''t say I never did anything for you.', '커피 사 왔어요. 늘 마시던 걸로요. 제가 해 준 게 없다는 말은 하기 없기예요.', 200),
  ('f_derek_umbrella_1', 'derek', 'all', 'umbrella', NULL, 45, 'You''re not walking home in that. I keep a spare umbrella under my desk. Take it.', '그 비를 맞고 집에 갈 순 없죠. 책상 밑에 여분 우산이 있어요. 가져가요.', 210),
  ('f_derek_cover_1', 'derek', 'all', 'cover', NULL, 70, 'You weren''t at {meeting}, so I gave your update for you. I knew what you were on. Notes are in the team doc.', '{meeting}에 안 와서 제가 대신 진행 상황을 말해 뒀어요. 뭐 하고 있는지 알고 있었거든요. 메모는 팀 문서에 있어요.', 220);

REPLACE INTO friends (id, npc, hero, kind, task, need, line, line_ko, sort) VALUES
  ('f_derek_text_1', 'derek', 'all', 'text', NULL, 45, 'My team lost in overtime. I''m not okay. Anyway, hope your weekend is going better than mine.', '응원하는 팀이 연장전에서 졌어요. 멘탈이 나갔어요. 아무튼 주말은 저보다 잘 보내고 있길 바라요.', 230),
  ('f_derek_text_2', 'derek', 'all', 'text', NULL, 45, 'Fixed the sprinkler. Broke the fence. Owning a house is a journey.', '스프링클러는 고쳤어요. 대신 울타리가 부서졌어요. 집주인의 길은 멀고도 험해요.', 240),
  ('f_derek_text_3', 'derek', 'all', 'text', NULL, 45, 'Found a taco truck parked by the river this morning. Life-changing carnitas. Just thought you should know.', '오늘 아침에 강가에 서 있는 타코 트럭을 발견했어요. 카르니타스가 인생 맛이에요. 알려 주고 싶었어요.', 250),
  ('f_priya_lunch_1', 'priya', 'all', 'lunch', NULL, 0, 'I block lunch on my calendar, or it fills up with meetings. I learned that the hard way.', '점심시간을 달력에 막아 둬요. 안 그러면 회의로 꽉 차거든요. 호되게 겪고 배웠어요.', 260),
  ('f_priya_lunch_2', 'priya', 'all', 'lunch', NULL, 0, 'The store managers in the pilot are great. One of them sends me photos of her shop cat every Monday.', '시범 매장 점장들이 정말 좋아요. 한 분은 월요일마다 가게 고양이 사진을 보내 줘요.', 270),
  ('f_priya_lunch_3', 'priya', 'all', 'lunch', NULL, 20, 'Product work is mostly saying no nicely. I''m still practicing the nicely part.', '프로덕트 일은 대부분 ''안 돼요''를 친절하게 말하는 거예요. ''친절하게'' 쪽은 아직 연습 중이에요.', 280),
  ('f_priya_diner_1', 'priya', 'all', 'diner', NULL, 45, 'My parents still don''t really know what a product manager does. My mom tells people I''m "in computers."', '부모님은 아직도 프로덕트 매니저가 뭘 하는지 잘 몰라요. 엄마는 사람들한테 제가 "컴퓨터 쪽 일"을 한다고 해요.', 290),
  ('f_priya_diner_2', 'priya', 'all', 'diner', NULL, 45, 'I moved here for this job without knowing anyone. Lunches like this are why it feels like home now.', '아는 사람 하나 없이 이 일 때문에 이사 왔어요. 이런 점심 덕분에 이제 여기가 집 같아요.', 300),
  ('f_priya_invite_1', 'priya', 'all', 'invite', NULL, 45, 'Escape the meeting room with me? Sunny Side Diner at {time}. I need soup and a break from slides.', '회의실에서 같이 탈출할래요? {time}에 서니 사이드 다이너에서 봐요. 수프랑 슬라이드 없는 시간이 필요해요.', 310),
  ('f_priya_noshow_1', 'priya', 'all', 'noshow', NULL, 0, 'Had my soup with my phone for company. Totally fine! Hope your day''s going okay.', '수프는 휴대전화랑 둘이 먹었어요. 완전 괜찮아요! 오늘 하루 잘 풀리고 있길 바라요.', 320),
  ('f_priya_coffee_1', 'priya', 'all', 'coffee', NULL, 45, 'I ordered two lattes by mistake. Well, by "mistake." One''s for you.', '라테를 실수로 두 잔 샀어요. 뭐, "실수"로요. 한 잔은 드릴게요.', 330),
  ('f_priya_umbrella_1', 'priya', 'all', 'umbrella', NULL, 45, 'I keep two umbrellas here because I always forget one at home. Take this one.', '늘 집에 하나씩 두고 와서 여기 우산이 두 개 있어요. 이거 가져가요.', 340),
  ('f_priya_cover_1', 'priya', 'all', 'cover', NULL, 70, 'You missed {meeting}, so I shared where your work stands. Hope that''s okay! Notes are in the doc.', '{meeting}에 안 보여서 하던 일의 진행 상황은 제가 공유해 뒀어요. 괜찮죠? 메모는 문서에 있어요.', 350),
  ('f_priya_text_1', 'priya', 'all', 'text', NULL, 45, 'Farmers market haul: way too many peaches. This is a cry for help.', '파머스 마켓에서 복숭아를 너무 많이 샀어요. 이건 구조 요청이에요.', 360),
  ('f_priya_text_2', 'priya', 'all', 'text', NULL, 45, 'Finally watched that documentary everyone talks about. Now I want to redesign everything.', '다들 얘기하던 다큐멘터리를 드디어 봤어요. 이제 뭐든 다시 디자인하고 싶어요.', 370),
  ('f_priya_text_3', 'priya', 'all', 'text', NULL, 45, 'Weekend public service announcement: the coffee cart closes at two on Saturdays. I learned this at 2:05.', '주말 공지: 커피 카트는 토요일엔 두 시에 닫아요. 2시 5분에 알게 됐어요.', 380),
  ('f_jun_lunch_1', 'jun', 'all', 'lunch', NULL, 0, 'I''m still getting used to how big the portions are here. Half my burrito is dinner.', '여기 음식 양에 아직 적응 중이에요. 부리토 반은 저녁밥이 돼요.', 390),
  ('f_jun_lunch_2', 'jun', 'all', 'lunch', NULL, 0, 'I opened a bank account last week. It took three tries to explain that I don''t have a credit history yet.', '지난주에 은행 계좌를 만들었어요. 아직 신용 기록이 없다는 걸 설명하는 데 세 번이나 걸렸어요.', 400),
  ('f_jun_lunch_3', 'jun', 'all', 'lunch', NULL, 20, 'Thanks for always answering my questions. Some days I feel like I ask a hundred.', '늘 질문에 답해 줘서 고마워요. 어떤 날은 백 개는 묻는 것 같아요.', 410),
  ('f_jun_diner_1', 'jun', 'all', 'diner', NULL, 45, 'My mom video-calls every Sunday and asks if I''m eating well. I''m going to show her this pie.', '엄마가 일요일마다 영상 통화로 밥은 잘 먹냐고 물어요. 이 파이를 보여 드려야겠어요.', 420),
  ('f_jun_diner_2', 'jun', 'all', 'diner', NULL, 45, 'When I got here, I didn''t know anyone. Now I have people to eat lunch with. That means a lot.', '처음 왔을 땐 아는 사람이 없었어요. 이제 같이 점심 먹을 사람들이 있어요. 그게 저한텐 커요.', 430),
  ('f_jun_invite_1', 'jun', 'all', 'invite', NULL, 45, 'Would you like to have lunch at the Sunny Side Diner? I''ll be there at {time}. I want to try their pie.', '서니 사이드 다이너에서 점심 같이 할래요? {time}에 거기 있을게요. 파이를 먹어 보고 싶어요.', 440);

REPLACE INTO friends (id, npc, hero, kind, task, need, line, line_ko, sort) VALUES
  ('f_jun_noshow_1', 'jun', 'all', 'noshow', NULL, 0, 'I saved you a seat, but I guess you were busy. It''s okay! The pie was good.', '자리를 맡아 뒀는데 바빴나 봐요. 괜찮아요! 파이 맛있었어요.', 450),
  ('f_jun_coffee_1', 'jun', 'all', 'coffee', NULL, 45, 'I got you a coffee! I hope I remembered your order right.', '커피 사 왔어요! 주문을 제대로 기억했으면 좋겠네요.', 460),
  ('f_jun_umbrella_1', 'jun', 'all', 'umbrella', NULL, 45, 'Please take my umbrella. I live close, and I can run home.', '제 우산 가져가세요. 저는 집이 가까워서 뛰어가면 돼요.', 470),
  ('f_jun_cover_1', 'jun', 'all', 'cover', NULL, 70, 'You weren''t at {meeting}, so I told the team what you''ve been working on. I hope I got it right!', '{meeting}에 안 와서 하고 있는 일을 제가 팀에 말해 뒀어요. 맞게 말했으면 좋겠어요!', 480),
  ('f_jun_text_1', 'jun', 'all', 'text', NULL, 45, 'I cooked Korean food for the first time here. The market didn''t have gochujang, so it was... creative.', '여기 와서 처음으로 한식을 해 먹었어요. 마켓에 고추장이 없어서 좀… 창의적인 맛이었어요.', 490),
  ('f_jun_text_2', 'jun', 'all', 'text', NULL, 45, 'I walked along the beach today. I still can''t believe I live by the ocean now.', '오늘 해변을 따라 걸었어요. 이제 바닷가에 산다는 게 아직도 안 믿겨요.', 500),
  ('f_jun_text_3', 'jun', 'all', 'text', NULL, 45, 'Learned a new word in the laundry room today: "lint trap." My dryer is much happier now.', '오늘 세탁실에서 새 단어를 배웠어요. "lint trap", 보풀 필터래요. 건조기가 훨씬 잘 돌아가요.', 510),
  ('f_sam_lunch_1', 'sam', 'all', 'lunch', NULL, 0, 'Fun fact: the most common password in this building used to be the name of the building. Not anymore.', '재미있는 사실: 예전엔 이 건물에서 제일 흔한 비밀번호가 건물 이름이었어요. 지금은 아니에요.', 520),
  ('f_sam_lunch_2', 'sam', 'all', 'lunch', NULL, 0, 'I build tiny computers on weekends. My apartment is basically a museum of cables.', '주말엔 작은 컴퓨터를 만들어요. 우리 집은 거의 케이블 박물관이에요.', 530),
  ('f_sam_lunch_3', 'sam', 'all', 'lunch', NULL, 20, 'If an email ever makes you panic, that''s exactly when to slow down. Panic is what scammers are selling.', '이메일 하나에 마음이 급해지면 그때가 바로 천천히 할 때예요. 사기꾼이 파는 게 그 조급함이거든요.', 540),
  ('f_sam_diner_1', 'sam', 'all', 'diner', NULL, 45, 'I wanted to be a pilot when I was a kid. Now I help people find the Shift key. Close enough.', '어릴 땐 비행기 조종사가 되고 싶었어요. 지금은 사람들이 시프트 키 찾는 걸 도와요. 비슷하죠, 뭐.', 550),
  ('f_sam_diner_2', 'sam', 'all', 'diner', NULL, 45, 'You''re one of the few people here who actually reads my emails. I noticed.', '제 이메일을 진짜로 읽는 몇 안 되는 사람 중 하나예요. 다 알아요.', 560),
  ('f_sam_invite_1', 'sam', 'all', 'invite', NULL, 45, 'Lunch at the Sunny Side Diner? {time}. I''ll be the one in the booth fixing their Wi-Fi in my head.', '서니 사이드 다이너에서 점심 어때요? {time}에요. 부스에 앉아서 머릿속으로 식당 와이파이를 고치고 있는 사람이 저예요.', 570),
  ('f_sam_noshow_1', 'sam', 'all', 'noshow', NULL, 0, 'Lunch for one today. Closing this ticket: no worries.', '오늘 점심은 혼자였어요. 이 건은 종료 처리할게요. 신경 쓰지 마요.', 580),
  ('f_sam_coffee_1', 'sam', 'all', 'coffee', NULL, 45, 'Grabbed you a coffee. Consider it a bribe to lock your screen when you step away.', '커피 하나 사 왔어요. 자리 비울 때 화면 잠그라고 주는 뇌물이라고 생각해요.', 590),
  ('f_sam_umbrella_1', 'sam', 'all', 'umbrella', NULL, 45, 'Believe it or not, IT keeps loaner umbrellas in the supply closet. Here, take one.', '믿기 어렵겠지만 IT 비품 창고에 빌려주는 우산이 있어요. 자, 하나 가져가요.', 600),
  ('f_sam_cover_1', 'sam', 'all', 'cover', NULL, 70, 'You missed {meeting}, so I sent you my notes. The short version: nothing''s on fire.', '{meeting}에 안 와서 제 메모를 보내 뒀어요. 요약하면, 급한 불은 없어요.', 610),
  ('f_sam_text_1', 'sam', 'all', 'text', NULL, 45, 'Weekend tip: turn on two-step login for your bank app. It takes two minutes. Okay, IT voice off.', '주말 팁: 은행 앱에 2단계 인증을 켜 두세요. 2분이면 돼요. 자, IT 목소리 끕니다.', 620),
  ('f_sam_text_2', 'sam', 'all', 'text', NULL, 45, 'Built a weather station on my balcony. It says 61 degrees. My phone says 63. The war begins.', '베란다에 기상 관측기를 만들었어요. 화씨 61도래요. 휴대전화는 63도라네요. 전쟁 시작이에요.', 630),
  ('f_sam_text_3', 'sam', 'all', 'text', NULL, 45, 'Got a text saying I won a cruise. I never entered a cruise contest. Stay sharp out there.', '크루즈 여행에 당첨됐다는 문자를 받았어요. 응모한 적도 없는데요. 다들 조심하세요.', 640),
  ('f_linda_lunch_1', 'linda', 'all', 'lunch', NULL, 0, 'Little HR secret: you can change your tax withholding any time, not just when you start. A lot of people don''t know that.', '인사팀의 작은 비밀: 원천징수 설정은 입사할 때만이 아니라 아무 때나 바꿀 수 있어요. 모르는 사람이 많아요.', 650),
  ('f_linda_lunch_2', 'linda', 'all', 'lunch', NULL, 0, 'My garden gave me so many tomatoes this year that I started leaving them on people''s desks.', '올해 텃밭에서 토마토가 너무 많이 나서 사람들 책상에 두고 다니기 시작했어요.', 660),
  ('f_linda_lunch_3', 'linda', 'all', 'lunch', NULL, 20, 'People think HR is all about rules. Mostly it''s about listening. The rules are the easy part.', '사람들은 인사팀이 규칙만 다룬다고 생각해요. 대부분은 들어 주는 일이에요. 규칙은 쉬운 부분이고요.', 670);

REPLACE INTO friends (id, npc, hero, kind, task, need, line, line_ko, sort) VALUES
  ('f_linda_diner_1', 'linda', 'all', 'diner', NULL, 45, 'I''ve been here nine years. I watched this company grow from twelve people. It still feels like a family.', '여기 온 지 9년 됐어요. 이 회사가 열두 명일 때부터 크는 걸 봤죠. 아직도 가족 같아요.', 680),
  ('f_linda_diner_2', 'linda', 'all', 'diner', NULL, 45, 'You''ve settled in well. I can tell, because people mention you in a good way.', '잘 적응했네요. 사람들이 좋게 얘기하는 걸 들으면 알 수 있어요.', 690),
  ('f_linda_invite_1', 'linda', 'all', 'invite', NULL, 45, 'Care to join me for lunch? I''ll be at the Sunny Side Diner at {time}. I hear the soup is good today.', '점심 같이 할래요? {time}에 서니 사이드 다이너에 있을게요. 오늘 수프가 맛있대요.', 700),
  ('f_linda_noshow_1', 'linda', 'all', 'noshow', NULL, 0, 'Sorry I missed you at lunch. If something''s going on, my door is always open.', '점심때 못 만나서 아쉬웠어요. 무슨 일 있으면 제 방 문은 늘 열려 있어요.', 710),
  ('f_linda_coffee_1', 'linda', 'all', 'coffee', NULL, 45, 'I brought you a coffee. Don''t tell the others, or I''ll have to bring twelve.', '커피 가져왔어요. 다른 사람들한텐 비밀이에요. 안 그러면 열두 잔을 사 와야 하거든요.', 720),
  ('f_linda_umbrella_1', 'linda', 'all', 'umbrella', NULL, 45, 'Here, take my umbrella. I drove in today, so I won''t need it.', '자, 제 우산 가져가요. 오늘은 차를 갖고 와서 필요 없어요.', 730),
  ('f_linda_cover_1', 'linda', 'all', 'cover', NULL, 70, 'You missed {meeting}. I saved the slides for you and let your manager know you''d catch up.', '{meeting}에 빠졌네요. 슬라이드를 챙겨 뒀고, 매니저에게는 나중에 따로 확인할 거라고 말해 뒀어요.', 740),
  ('f_linda_text_1', 'linda', 'all', 'text', NULL, 45, 'The tomatoes finally stopped. My kitchen will smell like pasta sauce all week.', '토마토가 드디어 끝났어요. 이번 주 내내 부엌에서 파스타 소스 냄새가 날 거예요.', 750),
  ('f_linda_text_2', 'linda', 'all', 'text', NULL, 45, 'Took my nephew to the aquarium. He knew the name of every fish. I knew none.', '조카를 데리고 수족관에 갔어요. 조카는 물고기 이름을 다 알고, 저는 하나도 몰랐어요.', 760),
  ('f_linda_text_3', 'linda', 'all', 'text', NULL, 45, 'A quiet weekend with a book and a pot of tea. Hope you''re getting some rest too.', '책이랑 차 한 주전자로 조용한 주말을 보내고 있어요. 잘 쉬고 있길 바라요.', 770),
  ('f_tom_lunch_1', 'tom', 'all', 'lunch', NULL, 0, 'I know everybody''s coffee order in this building. It''s a gift and a curse.', '이 건물 사람들 커피 주문은 다 외워요. 재능이자 저주죠.', 780),
  ('f_tom_lunch_2', 'tom', 'all', 'lunch', NULL, 0, 'The cleaning crew comes on Thursday nights, so don''t leave anything important on the floor by your desk.', '청소팀이 목요일 밤에 와요. 책상 옆 바닥에 중요한 건 두지 마세요.', 790),
  ('f_tom_lunch_3', 'tom', 'all', 'lunch', NULL, 20, 'Before this, I ran a hotel front desk for ten years. Compared to hotel guests, engineers are easy.', '전에는 10년 동안 호텔 프런트를 맡았어요. 호텔 손님에 비하면 개발자들은 쉬워요.', 800),
  ('f_tom_diner_1', 'tom', 'all', 'diner', NULL, 45, 'My wife and I are training for our first 10K. By training, I mean we bought shoes.', '아내랑 첫 10킬로미터 달리기를 준비하고 있어요. 준비라고 해 봐야 운동화를 산 게 다예요.', 810),
  ('f_tom_diner_2', 'tom', 'all', 'diner', NULL, 45, 'You always say good morning at the front desk. You''d be surprised how many people don''t.', '늘 프런트에서 아침 인사를 해 주잖아요. 안 하는 사람이 얼마나 많은지 알면 놀랄 거예요.', 820),
  ('f_tom_invite_1', 'tom', 'all', 'invite', NULL, 45, 'Lunch buddy? I''ll be at the Sunny Side Diner at {time}. They always save me the corner booth.', '점심 같이 먹을래요? {time}에 서니 사이드 다이너에 있을게요. 거기선 늘 구석 부스를 맡아 줘요.', 830),
  ('f_tom_noshow_1', 'tom', 'all', 'noshow', NULL, 0, 'No lunch buddy today? That''s okay. More fries for me.', '오늘은 점심 같이 못 했네요? 괜찮아요. 감자튀김을 제가 더 먹었죠.', 840),
  ('f_tom_coffee_1', 'tom', 'all', 'coffee', NULL, 45, 'Your usual, from the cart. I told you I know everyone''s order.', '커피 카트에서 늘 마시는 걸로 사 왔어요. 다들 주문을 외운다고 했잖아요.', 850),
  ('f_tom_umbrella_1', 'tom', 'all', 'umbrella', NULL, 45, 'The lost and found has about forty umbrellas. Take one, and bring it back when the sun''s out.', '분실물 보관함에 우산이 마흔 개쯤 있어요. 하나 가져가고 해 나면 돌려줘요.', 860),
  ('f_tom_cover_1', 'tom', 'all', 'cover', NULL, 70, 'You missed {meeting}. I saved you the handout. It''s on your desk.', '{meeting}에 빠졌네요. 나눠 준 자료를 챙겨서 책상에 올려 뒀어요.', 870),
  ('f_tom_text_1', 'tom', 'all', 'text', NULL, 45, 'First practice run for the 10K: two miles. My wife did four. We don''t talk about it.', '10킬로미터 대비 첫 연습: 저는 2마일 뛰었어요. 아내는 4마일요. 그 얘기는 안 하기로 했어요.', 880),
  ('f_tom_text_2', 'tom', 'all', 'text', NULL, 45, 'Saw a seal at the beach this morning. Just one, lying there like it owned the place.', '오늘 아침 해변에서 물개를 봤어요. 딱 한 마리가 주인처럼 누워 있더라고요.', 890),
  ('f_tom_text_3', 'tom', 'all', 'text', NULL, 45, 'Made pancakes for the neighbors this morning. Thirty-six pancakes. I''m retired now.', '오늘 아침에 이웃들한테 팬케이크를 구워 줬어요. 서른여섯 장요. 이제 은퇴합니다.', 900);

REPLACE INTO friends (id, npc, hero, kind, task, need, line, line_ko, sort) VALUES
  ('f_tip_phishing_sam', 'sam', 'all', 'tip', 't_phishing', 20, 'Heads-up: fake payroll emails are going around. If a link isn''t our real domain, don''t click it. Hit Report phishing so I can warn everyone.', '조심하세요. 가짜 급여 이메일이 돌고 있어요. 링크가 우리 회사 진짜 도메인이 아니면 누르지 말고 ''피싱 신고'' 버튼을 눌러 줘요. 그래야 제가 모두에게 알릴 수 있어요.', 910),
  ('f_tip_build_red_derek', 'derek', 'jun', 'tip', 't_build_red', 20, 'If the build goes red after your merge, say you''re on it in the team channel first. Then fix it or revert. Nobody minds a revert.', '머지하고 빌드가 빨개지면 먼저 팀 채널에 제가 보겠다고 남겨요. 그다음 고치든 되돌리든 하면 돼요. 되돌리는 걸 뭐라 하는 사람은 없어요.', 920),
  ('f_tip_build_red_jun', 'jun', 'derek', 'tip', 't_build_red', 20, 'When my build broke last month, you told me to post in the channel first and then fix or revert. It really worked!', '지난달에 제 빌드가 깨졌을 때 먼저 채널에 알리고 고치거나 되돌리라고 해 줬잖아요. 정말 효과 있었어요!', 930),
  ('f_tip_security_alert_sam', 'sam', 'jun,derek', 'tip', 't_security_alert', 20, 'When the scanner flags a library, check whether we use the broken function and send the upgrade. Ten small fixes beat one breach.', '스캐너가 라이브러리를 잡으면 문제 있는 함수를 우리가 쓰는지 확인하고 업그레이드를 올려 줘요. 한 번 뚫리는 것보다 작은 수정 열 번이 나아요.', 940),
  ('f_tip_prod_errors_derek', 'derek', 'jun', 'tip', 't_prod_errors', 20, 'If errors spike after a deploy, roll back first and look for the bug after. The stores come first.', '배포 뒤에 오류가 치솟으면 먼저 롤백하고 버그는 그다음에 찾아요. 매장이 먼저예요.', 950),
  ('f_tip_prod_errors_maya', 'maya', 'derek', 'tip', 't_prod_errors', 20, 'When something breaks after a deploy, say so in the incident channel and roll back. You don''t have to be the hero alone.', '배포 뒤에 뭔가 깨지면 장애 채널에 알리고 롤백해요. 혼자 영웅이 될 필요는 없어요.', 960),
  ('f_tip_store_ticket_priya', 'priya', 'jun,derek', 'tip', 't_store_ticket', 20, 'Some pilot stores still use old browsers on the back-office computer. If a store says something doesn''t work, try it their way first.', '몇몇 시범 매장은 사무실 컴퓨터에서 아직 오래된 브라우저를 써요. 매장에서 뭐가 안 된다고 하면 먼저 그 매장 환경으로 해 봐요.', 970),
  ('f_tip_estimate_derek', 'derek', 'jun', 'tip', 't_estimate', 20, 'When Priya asks how long something will take, look at the code first and give her a range. A quick "two days" always comes back to bite you.', '프리야가 얼마나 걸리냐고 물으면 먼저 코드를 보고 범위로 말해 줘요. 대충 "이틀이요" 하면 꼭 나중에 발목 잡혀요.', 980),
  ('f_tip_estimate_maya', 'maya', 'derek', 'tip', 't_estimate', 20, 'Give product a range, not a single number, and say when you''ll confirm it. It saves everyone a bad week.', '프로덕트 쪽엔 숫자 하나가 아니라 범위로 말하고, 언제 확정할지도 알려 줘요. 그래야 다 같이 힘든 한 주를 피해요.', 990),
  ('f_tip_jun_review_priya', 'priya', 'jun', 'tip', 't_jun_review', 20, 'Derek leaves a lot of comments, but he loves talking through design. Answer each one, and ask him about the big one.', '데릭은 코멘트를 많이 남기지만 설계 얘기를 나누는 걸 정말 좋아해요. 하나하나 답하고, 큰 건은 직접 물어봐요.', 1000),
  ('f_tip_jun_stuck_sam', 'sam', 'jun', 'tip', 't_jun_stuck', 20, 'If your setup breaks after an update, post the error in the team channel. Half the team probably hit the same thing.', '업데이트 뒤에 개발 환경이 깨지면 오류를 팀 채널에 올려요. 팀 절반은 같은 걸 겪었을 거예요.', 1010),
  ('f_tip_jun_docs_linda', 'linda', 'jun', 'tip', 't_jun_docs', 20, 'Someone new starts next month. Anything you fix in the onboarding guide now will save them a whole day.', '다음 달에 새 사람이 와요. 지금 온보딩 가이드를 고쳐 두면 그 사람의 하루를 아껴 줄 거예요.', 1020),
  ('f_tip_dk_big_pr_maya', 'maya', 'derek', 'tip', 't_dk_big_pr', 20, 'Big pull requests from newer people go better when you start with what''s good, then suggest splitting the rest.', '신입의 큰 풀 리퀘스트는 잘한 점부터 말하고 나머지는 나누자고 제안하면 훨씬 잘 풀려요.', 1030),
  ('f_tip_dk_disk_sam', 'sam', 'derek', 'tip', 't_dk_disk', 20, 'Please don''t delete anything on a production database by hand. Open a ticket, and we''ll look at what''s growing together.', '운영 데이터베이스에서 손으로 지우는 건 하지 말아 줘요. 티켓을 열면 뭐가 늘고 있는지 같이 봐요.', 1040),
  ('f_tip_dk_question_priya', 'priya', 'derek', 'tip', 't_dk_question', 20, 'Protect your focus time: tell people when you''ll be free, then really follow up. They''d rather wait twenty minutes than get brushed off.', '집중 시간은 지켜요. 언제 시간이 나는지 말하고 꼭 다시 찾아가요. 무시당하는 것보다 20분 기다리는 게 나아요.', 1050),
  ('f_tip_laptop_update_tom', 'tom', 'all', 'tip', 't_laptop_update', 20, 'When Sam says restart, restart. The automatic one at six once ate my unsaved spreadsheet.', '샘이 재시작하라고 하면 바로 해요. 여섯 시 자동 재시작이 저장 안 한 제 스프레드시트를 날린 적이 있어요.', 1060),
  ('f_tip_training_tom', 'tom', 'all', 'tip', 't_training', 20, 'Linda really does check the training list on Friday afternoon. It''s only half an hour, so get it out of the way.', '린다는 금요일 오후에 정말로 교육 이수 명단을 확인해요. 30분이면 되니까 빨리 끝내 버려요.', 1070);

REPLACE INTO friends (id, npc, hero, kind, task, need, line, line_ko, sort) VALUES
  ('f_tip_fridge_linda', 'linda', 'all', 'tip', 't_fridge', 20, 'Tom means it about the fridge. Put your name and the date on your lunch, and it''s safe.', '톰은 냉장고 얘기에 진심이에요. 점심에 이름이랑 날짜만 적어 두면 안전해요.', 1080),
  ('f_tip_pr_date_derek', 'derek', 'priya', 'tip', 't_pr_date', 20, 'When sales asks for a date before we''ve estimated, give us a day and we''ll get you a range.', '영업팀이 우리가 추정하기도 전에 날짜를 달라고 하면 하루만 줘요. 범위로 알려 줄게요.', 1090),
  ('f_tip_pr_disagree_maya', 'maya', 'priya', 'tip', 't_pr_disagree', 20, 'When the developers can''t agree, ask each for the trade-offs in writing, then decide by what the stores need.', '개발자들 의견이 갈리면 각자 장단점을 글로 받아서 매장에 필요한 쪽으로 정해요.', 1100),
  ('f_tip_pr_greg_numbers_maya', 'maya', 'priya', 'tip', 't_pr_greg_numbers', 20, 'Greg calms down fast if you answer within the hour, even before you have the fix.', '그렉은 해결책이 나오기 전이라도 한 시간 안에 답하면 금방 진정해요.', 1110),
  ('f_tip_pr_notes_derek', 'derek', 'priya', 'tip', 't_pr_notes', 20, 'If you write release notes for the stores, send them to me first. I''ll check they''re accurate.', '매장용 릴리스 노트를 쓰면 먼저 저한테 보내 줘요. 정확한지 봐 줄게요.', 1120),
  ('f_tip_pr_outage_sam', 'sam', 'priya', 'tip', 't_pr_outage', 20, 'When something''s down, the stores would rather hear it from us right away than find out on their own.', '뭔가 멈추면 매장들은 스스로 알아내기보다 우리한테서 바로 듣는 걸 좋아해요.', 1130),
  ('f_tip_pr_scope_maya', 'maya', 'priya', 'tip', 't_pr_scope', 20, 'With Greg''s "just one more" requests, say what it would push back and let him choose. He respects that.', '그렉의 "하나만 더" 요청엔 그게 뭘 밀어내는지 말하고 그가 고르게 해요. 그런 걸 존중하는 사람이에요.', 1140),
  ('f_tip_pr_survey_jun', 'jun', 'priya', 'tip', 't_pr_survey', 20, 'If the survey surprises you, bring it to planning. I think the team would rather change course early.', '설문 결과가 뜻밖이면 계획 회의에 가져와요. 팀은 일찍 방향을 바꾸는 걸 더 좋아할 거예요.', 1150);


-- More everyday realism: real dates and holidays, a phone with texts, emails, voicemails and alerts, a bus
-- timetable, an umbrella for rainy days, the coffee cart's punch card, overdraft fees, being late for work.
REPLACE INTO config (k, v, note) VALUES
  ('start_date', '2026-10-05', 'the real date of game day 1 (a Monday)'),
  ('bus_every', '20', 'minutes between buses on weekdays'),
  ('bus_every_weekend', '30', 'minutes between buses on weekends and federal holidays'),
  ('bus_first', '06:00', 'the first bus of the day'),
  ('bus_last', '22:30', 'the last bus of the day'),
  ('overdraft_fee', '35', 'charged (once a day) when a payment takes the account below zero'),
  ('low_balance', '100', 'the bank sends an alert when the balance falls below this'),
  ('punch_card_place', 'coffee_cart', 'where drinks are stamped on a punch card'),
  ('punch_card_every', '6', 'buy 5 drinks, the 6th is free'),
  ('late_after', '09:15', 'getting to the office after this on a workday is late'),
  ('rain_energy_per_hour', '-10', 'extra energy lost per hour walking in heavy rain without an umbrella'),
  ('bank_name', 'Fairview Credit Union', 'the bank of your checking account');

REPLACE INTO items (id, name, name_ko, kind, price, model, energy, place, note) VALUES
  ('umbrella', 'Compact umbrella', '접이식 우산', 'gear', 12.99, NULL, 0, 'market_shelves', 'keeps you dry on rainy days');

REPLACE INTO holidays (date, name, name_ko, kind, note, note_ko) VALUES
  ('2026-10-12', 'Columbus Day / Indigenous Peoples'' Day', '콜럼버스 데이 · 원주민의 날', 'federal', 'Banks and post offices are closed. Most offices and stores stay open, and buses run on the weekend timetable.', '은행과 우체국은 쉽니다. 회사와 상점은 대부분 문을 열고, 버스는 주말 시간표로 다닙니다.'),
  ('2026-10-31', 'Halloween', '핼러윈', 'observance', 'Kids go trick-or-treating in costume. It is not a day off.', '아이들이 분장을 하고 사탕을 받으러 다닙니다. 쉬는 날은 아닙니다.'),
  ('2026-11-03', 'Election Day', '선거일', 'observance', 'Not a federal holiday, but many employers give time off to vote.', '연방 공휴일은 아니지만 투표할 시간을 주는 회사가 많습니다.'),
  ('2026-11-11', 'Veterans Day', '재향군인의 날', 'federal', 'Banks and post offices are closed. Many offices stay open.', '은행과 우체국은 쉽니다. 문을 여는 회사도 많습니다.'),
  ('2026-11-26', 'Thanksgiving Day', '추수감사절', 'federal', 'Almost everything is closed. Families get together for a turkey dinner.', '거의 모든 곳이 문을 닫습니다. 가족이 모여 칠면조 요리를 먹습니다.'),
  ('2026-11-27', 'Black Friday', '블랙 프라이데이', 'observance', 'The biggest shopping day of the year. Many offices are closed.', '한 해에서 가장 큰 쇼핑 날입니다. 쉬는 회사가 많습니다.');

REPLACE INTO smalltalk (topic, seq, line, line_ko) VALUES
  ('you:wet', 1, 'Oh no, you''re soaked! Did you forget your umbrella?', '이런, 흠뻑 젖었네요! 우산을 깜빡했어요?'),
  ('you:wet', 2, 'You got caught in the rain, huh? Go dry off.', '비를 맞았군요? 가서 좀 말려요.'),
  ('you:wet', 3, 'You look like a drowned rat. No offense!', '물에 빠진 생쥐 같아요. 기분 나쁘게 듣지는 말고요!'),
  ('you:late', 1, 'Running late this morning? It happens.', '오늘 아침엔 좀 늦었네요? 그럴 수도 있죠.'),
  ('you:late', 2, 'Rough commute? I heard traffic was terrible today.', '출근길이 험했어요? 오늘 길이 엄청 막혔다던데요.'),
  ('you:late', 3, 'Better late than never!', '안 오는 것보다는 늦게라도 오는 게 낫죠!'),
  ('holiday', 1, 'The banks are closed today, so don''t bother going.', '오늘은 은행이 쉬니까 갈 필요 없어요.'),
  ('holiday', 2, 'No mail today. It''s a federal holiday.', '오늘은 우편물이 안 와요. 연방 공휴일이거든요.'),
  ('holiday', 3, 'I wish we had the day off like the post office.', '우리도 우체국처럼 쉬면 좋을 텐데요.');

REPLACE INTO messages (id, hero, day, time, kind, sender, subject, body, body_ko) VALUES
  ('m01_bank', 'all', 1, '07:20', 'alert', 'Fairview Credit Union', NULL, 'Alerts are on for checking ···4821. We will text you about deposits, autopay and low balances. Reply STOP to opt out.', '입출금 계좌 ···4821의 알림이 켜졌습니다. 입금, 자동이체, 잔액 부족을 문자로 알려 드립니다. 받지 않으려면 STOP이라고 답장하세요.'),
  ('m01_tom', 'all', 1, '13:10', 'email', 'tom', 'Lunch & Learn this month', 'Hi all, this month''s Lunch & Learn is on the 29th at noon. Pizza is on us. Please RSVP by the 27th so I can get a headcount.', '여러분, 이달의 런치 앤드 런은 29일 정오입니다. 피자는 회사가 삽니다. 인원을 파악할 수 있게 27일까지 참석 여부를 알려 주세요. (RSVP: 참석 여부 회신, headcount: 인원수)'),
  ('m01_carl', 'jun', 1, '18:40', 'text', 'carl', NULL, 'Hi {name}, it''s Carl from 1A. Trash and recycling go out Thursday morning. The bins are behind the building.', '안녕하세요, 1A호 칼이에요. 쓰레기와 재활용품은 목요일 아침에 내놓아요. 수거함은 건물 뒤에 있어요.'),
  ('m01_waste', 'derek', 1, '18:40', 'text', 'Fairview Waste Services', NULL, 'Reminder: trash and recycling pickup on River Road is Thursday. Carts at the curb by 7 AM.', '알림: 리버 로드의 쓰레기·재활용 수거는 목요일입니다. 오전 7시까지 수거통을 길가에 내놓으세요. (curb: 보도 가장자리)'),
  ('m01_lofts', 'priya', 1, '18:40', 'email', 'Cedar Street Lofts', 'Elevator maintenance on Wednesday', 'The elevator will be out of service Wednesday from 9 to 11 AM for maintenance. We apologize for the inconvenience.', '엘리베이터는 점검 때문에 수요일 오전 9시부터 11시까지 운행하지 않습니다. 불편을 드려 죄송합니다. (out of service: 운행 중지)'),
  ('m02_spam', 'all', 2, '10:15', 'voicemail', 'Unknown caller', NULL, 'We have been trying to reach you about your car''s extended warranty. Press 1 to speak to a representative.', '자동차 보증 연장 건으로 연락드렸습니다. 상담원과 통화하려면 1번을 누르세요. (미국에서 아주 흔한 스팸 전화입니다. 그냥 지우세요.)'),
  ('m02_dental', 'all', 2, '16:30', 'text', 'Fairview Dental', NULL, 'Hi {name}, this is a reminder of your cleaning on Oct 20 at 8:30 AM. Reply C to confirm, or call us to reschedule.', '10월 20일 오전 8시 30분 스케일링 예약을 알려 드립니다. 확정하려면 C라고 답장하고, 날짜를 바꾸려면 전화 주세요. (cleaning: 스케일링, reschedule: 일정 변경)'),
  ('m03_weather', 'all', 3, '07:05', 'alert', 'Fairview Weather', NULL, 'Rain today, heavy at times. Allow extra time for your commute and bring an umbrella.', '오늘은 비가 오고 때때로 세차게 내립니다. 출근 시간을 넉넉히 잡고 우산을 챙기세요.'),
  ('m03_sam', 'all', 3, '09:40', 'email', 'sam', 'Your password expires in 5 days', 'Your network password expires in 5 days. Change it from the login screen: at least 12 characters, and don''t reuse an old one. IT will never ask for your password by email.', '네트워크 비밀번호가 5일 뒤에 만료됩니다. 로그인 화면에서 바꾸세요. 12자 이상이어야 하고 예전 것을 다시 쓰면 안 됩니다. IT 팀은 이메일로 비밀번호를 묻지 않습니다. (expire: 만료되다)');

REPLACE INTO messages (id, hero, day, time, kind, sender, subject, body, body_ko) VALUES
  ('m04_city', 'all', 4, '07:10', 'alert', 'City of Fairview', NULL, 'Street sweeping on Maple Street today, 8 to 10 AM. Cars parked on the street will be ticketed.', '오늘 오전 8시부터 10시까지 메이플 스트리트 도로 청소가 있습니다. 길에 세워 둔 차에는 딱지를 뗍니다. (be ticketed: 딱지를 떼이다)'),
  ('m04_parcel', 'all', 4, '14:20', 'text', 'Parcel Express', NULL, 'Your package was delivered at 2:14 PM and left at the front door. Thanks for shipping with us!', '소포가 오후 2시 14분에 배달되어 현관 앞에 놓였습니다.'),
  ('m04_mom_jun', 'jun', 4, '19:30', 'text', 'Mom', NULL, 'How is the new job? Are you eating well? Call us on Sunday. Dad says hi.', '새 직장은 어떠니? 밥은 잘 챙겨 먹고? 일요일에 전화하렴. 아빠가 안부 전한다. (say hi: 안부를 전하다)'),
  ('m04_sis_derek', 'derek', 4, '19:30', 'text', 'Elena (sister)', NULL, 'Are you still coming for Thanksgiving? Mom is already planning the menu. Let me know so I can save you a seat!', '추수감사절에 오는 거 맞지? 엄마가 벌써 메뉴를 짜고 계셔. 자리 맡아 둘 테니 알려 줘!'),
  ('m04_dad_priya', 'priya', 4, '19:30', 'text', 'Dad', NULL, 'Call me this weekend? I want to show you the garden. The tomatoes finally came in.', '이번 주말에 전화할래? 텃밭을 보여 주고 싶구나. 토마토가 드디어 열렸단다.'),
  ('m05_linda', 'all', 5, '10:00', 'email', 'linda', 'Open enrollment starts Monday', 'Open enrollment for health, dental and vision runs October 12 through 23. If you do nothing, your current plan carries over. New hires have 30 days from their start date. Questions? My door is always open.', '건강·치과·안과 보험의 정기 가입 기간은 10월 12일부터 23일까지입니다. 아무것도 하지 않으면 지금 보험이 그대로 이어집니다. 신입 사원은 입사일부터 30일 안에 가입하면 됩니다. (open enrollment: 보험 정기 가입 기간, carry over: 이어지다)'),
  ('m05_derek', 'all', 5, '16:45', 'text', 'derek', NULL, 'Heads up: the build is green again. Nothing to worry about over the weekend. Have a good one!', '참고로 빌드가 다시 정상이에요. 주말 동안 걱정할 일 없어요. 잘 보내요! (heads up: 미리 알려 주는 말)'),
  ('m06_market', 'all', 6, '09:00', 'email', 'Fairview Market', 'This week''s deals', 'Strawberries are buy one, get one free. Rain in the forecast? Compact umbrellas are in aisle 3. Prices are good through Sunday.', '딸기는 하나 사면 하나 더 드립니다. 비 예보가 있나요? 접이식 우산은 3번 통로에 있습니다. 행사 가격은 일요일까지입니다. (aisle: 통로, good through: ~까지 유효)');

REPLACE INTO messages (id, hero, day, time, kind, sender, subject, body, body_ko) VALUES
  ('m07_tom', 'all', 7, '18:00', 'email', 'tom', 'Monday is a regular workday', 'Reminder: the office is open tomorrow. It is a federal holiday, so banks and the post office are closed and the buses run on the weekend timetable. Plan your commute!', '알림: 내일 사무실은 정상 근무입니다. 연방 공휴일이라 은행과 우체국은 쉬고 버스는 주말 시간표로 다닙니다. 출근 계획을 세우세요!'),
  ('m08_fog', 'all', 8, '06:50', 'alert', 'Fairview Weather', NULL, 'Dense fog advisory until 10 AM. Slow down and use your low beams.', '오전 10시까지 짙은 안개 주의보. 속도를 줄이고 하향등을 켜세요. (advisory: 주의보, low beams: 하향등)'),
  ('m09_scam', 'all', 9, '11:20', 'text', '+1 (555) 0142', NULL, 'FINAL NOTICE: Your package is on hold. Confirm your address within 24 hours at the link below or it will be returned.', '최종 통지: 소포가 보류 중입니다. 24시간 안에 아래 링크에서 주소를 확인하지 않으면 반송됩니다. (피싱 문자입니다. 링크를 누르지 말고 지우세요.)'),
  ('m09_sam', 'all', 9, '15:00', 'email', 'sam', 'Phishing test results', 'Thanks to everyone who reported last week''s test email. If you clicked the link, you will get a short training. When in doubt, forward it to IT.', '지난주 모의 피싱 메일을 신고해 주신 분들 고맙습니다. 링크를 누른 분은 짧은 교육을 받게 됩니다. 의심스러우면 IT 팀으로 전달하세요. (when in doubt: 의심스러울 때는)'),
  ('m10_linda', 'all', 10, '09:30', 'email', 'linda', 'Flu shots next Wednesday', 'Free flu shots in the lobby next Wednesday, 10 AM to 2 PM. Bring your insurance card. Walk-ins are welcome.', '다음 주 수요일 오전 10시부터 오후 2시까지 로비에서 독감 예방주사를 무료로 놓아 드립니다. 보험 카드를 가져오세요. 예약 없이 와도 됩니다. (flu shot: 독감 주사, walk-in: 예약 없이 오는 사람)'),
  ('m10_airline', 'jun', 10, '17:00', 'email', 'Crestline Air', 'Check in for your flight to Ridgeport', 'It is time to check in for your flight tomorrow. Check in now to get your boarding pass. Checked bags must be dropped off at least 45 minutes before departure.', '내일 항공편의 체크인이 시작되었습니다. 지금 체크인하고 탑승권을 받으세요. 부치는 짐은 출발 45분 전까지 맡겨야 합니다. (boarding pass: 탑승권)'),
  ('m11_tom', 'all', 11, '08:45', 'email', 'tom', 'Fridge cleanout on Friday', 'Anything left in the kitchen fridge after 4 PM on Friday gets tossed. Please label your food. Thanks for keeping the kitchen clean!', '금요일 오후 4시 이후에 탕비실 냉장고에 남은 것은 모두 버립니다. 음식에 이름을 적어 두세요. (get tossed: 버려지다)'),
  ('m13_library', 'all', 13, '10:30', 'text', 'Fairview Public Library', NULL, 'Your hold is ready for pickup. We will keep it at the front desk for 7 days.', '예약하신 책이 준비되었습니다. 안내 데스크에서 7일 동안 보관합니다. (hold: 예약 도서)'),
  ('m14_weather', 'all', 14, '08:00', 'alert', 'Fairview Weather', NULL, 'Showers through the afternoon. A good day to stay in, or to bring an umbrella if you go out.', '오후까지 소나기가 옵니다. 집에 있기 좋은 날이고, 나간다면 우산을 챙기세요.');

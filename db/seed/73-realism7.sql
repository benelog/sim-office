-- Realism, seventh round: the calendar keeps going after the missions. Payday every other Friday for good (a day
-- early when the bank is closed), rent and the mortgage on the 1st of the month, the company's own holidays (the
-- office is closed and nobody is expected) with holiday hours at the stores, holidays into February, leaving work
-- early counts against you, and the market, the diner and the coffee cart have people on shifts instead of one
-- person working every day from open to close. The weather after the table is made by the engine from the season.
REPLACE INTO config (k, v, note) VALUES
  ('payday_days', '5,19', 'the first paydays (game days, Fridays); after the last one, every payday_every days'),
  ('payday_every', '14', 'days between paydays after payday_days: every other Friday; a day early when the bank is closed'),
  ('rent', '1450', 'monthly rent (the hero''s own housing in heroes), due on rent_day_of_month'),
  ('rent_day_of_month', '1', 'rent or the mortgage comes out on this date of every month (Nov 1 = game day 28)'),
  ('company_holidays', '2026-11-26,2026-11-27,2026-12-24,2026-12-25,2027-01-01,2027-01-18,2027-02-15', 'dates the office is closed: a paid day off, nobody is expected at work'),
  ('early_before', '16:00', 'leaving the office before this on a working day and not coming back is leaving early'),
  ('early_points', '2', 'strikes for leaving early'),
  ('hours_market_2026-11-26', '07:00-16:00', 'Thanksgiving: the market closes early'),
  ('hours_diner_2026-11-26', 'closed', 'Thanksgiving'),
  ('hours_coffee_cart_2026-11-26', 'closed', 'Thanksgiving'),
  ('hours_market_2026-12-24', '07:00-18:00', 'Christmas Eve'),
  ('hours_diner_2026-12-24', '06:30-15:00', 'Christmas Eve'),
  ('hours_coffee_cart_2026-12-24', '08:00-12:00', 'Christmas Eve'),
  ('hours_market_2026-12-25', 'closed', 'Christmas Day'),
  ('hours_diner_2026-12-25', 'closed', 'Christmas Day'),
  ('hours_coffee_cart_2026-12-25', 'closed', 'Christmas Day'),
  ('hours_market_2026-12-31', '07:00-20:00', 'New Year''s Eve'),
  ('hours_diner_2026-12-31', '06:30-16:00', 'New Year''s Eve'),
  ('hours_market_2027-01-01', '09:00-20:00', 'New Year''s Day'),
  ('hours_diner_2027-01-01', '08:00-15:00', 'New Year''s Day'),
  ('hours_coffee_cart_2027-01-01', 'closed', 'New Year''s Day');

REPLACE INTO holidays (date, name, name_ko, kind, note, note_ko) VALUES
  ('2026-11-26', 'Thanksgiving Day', '추수감사절', 'federal', 'Most offices are closed, and so are many stores and restaurants; grocery stores close early. Families get together for a turkey dinner.', '회사는 대부분 쉬고, 상점과 식당도 문을 닫는 곳이 많으며, 식료품점은 일찍 닫습니다. 가족이 모여 칠면조 요리를 먹습니다.'),
  ('2026-12-24', 'Christmas Eve', '크리스마스이브', 'observance', 'Not a federal holiday, but many offices close and stores close early.', '연방 공휴일은 아니지만 쉬는 회사가 많고 상점은 일찍 닫습니다.'),
  ('2026-12-25', 'Christmas Day', '크리스마스', 'federal', 'Almost everything is closed, even most grocery stores.', '식료품점을 포함해 거의 모든 곳이 문을 닫습니다.'),
  ('2026-12-31', 'New Year''s Eve', '새해 전날', 'observance', 'People stay up to count down to midnight. Stores close early.', '자정까지 깨어 카운트다운을 합니다. 상점은 일찍 닫습니다.'),
  ('2027-01-01', 'New Year''s Day', '새해 첫날', 'federal', 'Banks, post offices and most offices are closed. Stores open late.', '은행·우체국과 대부분의 회사가 쉽니다. 상점은 늦게 엽니다.'),
  ('2027-01-18', 'Martin Luther King Jr. Day', '마틴 루서 킹 주니어의 날', 'federal', 'Banks and post offices are closed. Many people volunteer in their community.', '은행과 우체국은 쉽니다. 많은 사람이 지역 봉사 활동을 합니다.'),
  ('2027-02-14', 'Valentine''s Day', '밸런타인데이', 'observance', 'Cards, flowers and chocolate. Restaurants are busy. It is not a day off.', '카드와 꽃, 초콜릿을 주고받습니다. 식당이 붐빕니다. 쉬는 날은 아닙니다.'),
  ('2027-02-15', 'Presidents'' Day', '대통령의 날', 'federal', 'Officially Washington''s Birthday. Banks and post offices are closed, and stores have big sales.', '공식 이름은 워싱턴 탄생일입니다. 은행과 우체국은 쉬고, 상점은 크게 할인합니다.');

DELETE FROM npcs WHERE id IN ('dana');
DELETE FROM chatter WHERE npc IN ('dana');
DELETE FROM schedule WHERE npc IN ('dana');

REPLACE INTO npcs (id, name, role, role_ko, model, place, voice_pitch, voice_rate, voice_like, bio, bio_ko, name_ko) VALUES
  ('gloria', 'Gloria', 'Day cashier at Fairview Market', '페어뷰 마켓 낮 계산원', 'woman-casual', 'market_checkout', 1, 0.94, 'Karen|Moira|Nancy|Susan', 'Has run the morning register for twelve years. Knows the regulars by their coupons and leaves at three to pick up her grandkids.', '12년째 아침 계산대를 지키고 있습니다. 단골을 쿠폰으로 알아보고, 세 시에 손주들을 데리러 퇴근합니다.', '글로리아'),
  ('tyler', 'Tyler', 'Weekend cashier at Fairview Market', '페어뷰 마켓 주말 계산원', 'man-hoodie-2', 'market_checkout', 1.05, 1.02, 'Ryan|Kai|Steffan|Roger', 'High school senior who works weekend mornings and two weeknights. Saving up for a car.', '주말 아침과 평일 저녁 이틀을 일하는 고등학교 3학년입니다. 차를 사려고 돈을 모읍니다.', '타일러'),
  ('marisol', 'Marisol', 'Evening server at the Sunny Side Diner', '서니 사이드 다이너 저녁 종업원', 'woman-punk', 'diner_counter', 1.1, 1, 'Jenny|Aria|Ana|Emma', 'Works the dinner shift between art classes. Draws little suns on the checks.', '미술 수업 사이사이 저녁 교대로 일합니다. 계산서에 작은 해를 그려 줍니다.', '마리솔'),
  ('hector', 'Hector', 'Server at the Sunny Side Diner (weekends)', '서니 사이드 다이너 종업원(주말)', 'man-adventurer', 'diner_counter', 0.9, 0.96, 'Guy|Jason|Eric|Christopher', 'Covers weekend mornings and the early-week evenings. Swears by the pancakes.', '주말 아침과 주초 저녁을 맡습니다. 팬케이크라면 자신 있게 권합니다.', '헥터'),
  ('jess', 'Jess', 'Weekend barista at the coffee cart', '커피 카트 주말 바리스타', 'woman-adventurer', 'coffee_cart', 1.15, 1.02, 'Ava|Amber|Ivy|Ana', 'Nina''s friend who runs the cart on weekends. Plays indie music from a tiny speaker.', '주말에 커피 카트를 맡는 니나의 친구입니다. 작은 스피커로 인디 음악을 틉니다.', '제스');

REPLACE INTO chatter (npc, seq, line, line_ko) VALUES
  ('gloria', 1, 'Morning! The bread just came in. It''s still warm.', '좋은 아침이에요! 빵이 방금 들어왔어요. 아직 따뜻해요.'),
  ('gloria', 2, 'Do you have a rewards card? You''d save on those eggs.', '적립 카드 있어요? 그 달걀 더 싸게 살 수 있는데.'),
  ('gloria', 3, 'I''m off at three. Then it''s time to get my grandkids.', '세 시면 퇴근이에요. 그다음엔 손주들 데리러 가야죠.'),
  ('gloria', 4, 'Self-checkout is open if you only have a few things.', '물건이 몇 개 안 되면 셀프 계산대도 열려 있어요.'),
  ('tyler', 1, 'Hey. Did you find everything okay?', '안녕하세요. 찾으시는 건 다 찾으셨어요?'),
  ('tyler', 2, 'Weekends are busy. Everybody shops for the week.', '주말은 바빠요. 다들 일주일 치 장을 보거든요.'),
  ('tyler', 3, 'Mike usually has the evenings. I cover when he''s off.', '저녁은 보통 마이크가 맡아요. 그가 쉴 때 제가 봐요.'),
  ('tyler', 4, 'I''m saving up for a car. Two more months of Saturdays.', '차 사려고 돈 모으는 중이에요. 토요일 두 달만 더 일하면 돼요.'),
  ('marisol', 1, 'Hi there! Sit anywhere you like.', '어서 오세요! 아무 데나 앉으세요.'),
  ('marisol', 2, 'Rosa does the mornings. I''ve got the dinner crowd.', '아침은 로사가 맡고, 저녁 손님은 제가 받아요.'),
  ('marisol', 3, 'The pie goes fast after six. Just saying.', '파이는 여섯 시 넘으면 금방 떨어져요. 그냥 하는 말이에요.'),
  ('marisol', 4, 'We close at nine thirty, and the kitchen stops at nine.', '아홉 시 반에 문 닫고, 주방 주문은 아홉 시까지예요.'),
  ('hector', 1, 'Coffee''s fresh. Want a cup while you look at the menu?', '커피 막 내렸어요. 메뉴 보시는 동안 한 잔 드릴까요?'),
  ('hector', 2, 'Rosa has the weekday mornings. I''m here weekends and a couple of nights.', '평일 아침은 로사가 해요. 저는 주말이랑 저녁 이틀 나와요.'),
  ('hector', 3, 'Get the pancakes. Trust me.', '팬케이크 드세요. 믿어 보세요.'),
  ('hector', 4, 'Your check comes when you''re ready. No rush.', '계산서는 준비되시면 드릴게요. 천천히 드세요.'),
  ('jess', 1, 'Hi! Nina takes the weekends off, so you get me.', '안녕하세요! 니나는 주말에 쉬어서 오늘은 제가 해요.'),
  ('jess', 2, 'The cold brew is extra strong today.', '오늘 콜드브루는 특히 진해요.'),
  ('jess', 3, 'Got your punch card? I''ll stamp it, same as Nina.', '쿠폰 카드 있어요? 니나처럼 도장 찍어 드릴게요.'),
  ('jess', 4, 'We close at two on weekends.', '주말에는 두 시에 닫아요.');

ALTER TABLE schedule MODIFY days varchar(40) NOT NULL DEFAULT 'all';

DELETE FROM schedule WHERE npc IN ('mike', 'rosa', 'nina');

REPLACE INTO schedule (npc, seq, days, time_from, time_to, place) VALUES
  ('gloria', 1, 'mon,tue,wed,thu,fri', '07:00', '15:00', 'market_checkout'),
  ('mike', 1, 'wed,thu,fri,sat,sun', '15:00', '22:00', 'market_checkout'),
  ('tyler', 1, 'sat,sun', '07:00', '15:00', 'market_checkout'),
  ('tyler', 2, 'mon,tue', '15:00', '22:00', 'market_checkout'),
  ('rosa', 1, 'mon,tue,wed,thu,fri', '06:30', '14:30', 'diner_counter'),
  ('marisol', 1, 'wed,thu,fri,sat,sun', '14:30', '21:30', 'diner_counter'),
  ('hector', 1, 'sat,sun', '06:30', '14:30', 'diner_counter'),
  ('hector', 2, 'mon,tue', '14:30', '21:30', 'diner_counter'),
  ('nina', 1, 'mon,tue,wed,thu,fri', '06:30', '15:00', 'coffee_cart'),
  ('jess', 1, 'sat,sun', '08:00', '14:00', 'coffee_cart');

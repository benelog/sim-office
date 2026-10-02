-- Cash and shopping from your phone (2026-10-03).
-- Cash: G.money stays the checking account (the debit card, paychecks, autopay); the wallet is new (start_cash on day 1).
-- The heroes bank at Fairview Credit Union: its ATM on Lake Avenue by the coffee cart is free and takes deposits;
-- Tidewell Bank's ATM by the Seaside Park gate charges $3 a withdrawal, shown on its screen before you accept. Cash
-- back at the Fairview Market checkout is free with a purchase. The weekend farmers market along the park fence (what
-- Carl tells Priya about in pr_w_farmers: "Bring cash, though") has two stands that take only cash.
-- Shopping online: Northpine (Phone > Shop online) delivers by Parcel Express (the carrier of m04_parcel) in two
-- business days; shipping $5.99, free from $35; sales tax on all but groceries. A package that needs a signature and
-- finds nobody home gets a door tag ("Sorry we missed you"), one more try, then waits at the Parcel Express counter in
-- Fairview Market for a week before it goes back and the money is refunded.
-- The catalog table is in db/schema.sql (this CREATE TABLE is the same).
CREATE TABLE IF NOT EXISTS catalog (id varchar(32) PRIMARY KEY, item varchar(40) NOT NULL, qty int NOT NULL DEFAULT 1, name varchar(120) NOT NULL, name_ko varchar(120), price decimal(7,2) NOT NULL, signature tinyint NOT NULL DEFAULT 0, note varchar(255), note_ko varchar(255), sort int NOT NULL DEFAULT 0);


REPLACE INTO config (k, v, note) VALUES
  ('start_cash', 'jun:40,derek:120,priya:60', 'cash in the wallet on day 1 (hero:dollars, or one number); start_money is the checking account'),
  ('cash_only', 'farm_stand,bakery_stand', 'places that take only cash (the farmers market stands)'),
  ('atm_own', 'atm_cu', 'the ATMs of the heroes'' own bank (Fairview Credit Union): no fee, cash deposits'),
  ('atm_fee', '3', 'what another bank''s ATM charges for each withdrawal (shown before you accept it)'),
  ('atm_daily_limit', '500', 'the most you can take out of ATMs in a day'),
  ('atm_amounts', '20,40,60,100,200', 'the amounts on an ATM''s screen ($20 bills)'),
  ('cash_back_place', 'market_checkout', 'where the cashier gives cash back with a purchase made there (no fee)'),
  ('cash_back', '20,40,60', 'the cash back amounts'),
  ('hours_farm_stand', 'closed', 'the farmers market is on weekends only'),
  ('hours_farm_stand_weekend', '08:00-13:00', 'the farmers market: Saturday and Sunday mornings'),
  ('hours_bakery_stand', 'closed', 'the farmers market is on weekends only'),
  ('hours_bakery_stand_weekend', '08:00-13:00', 'the farmers market: Saturday and Sunday mornings'),
  ('order_store', 'Northpine', 'the online store (Phone > Shop online)'),
  ('order_store_ko', '노스파인', 'its name in Korean'),
  ('order_carrier', 'Parcel Express', 'who brings the packages'),
  ('order_carrier_ko', '파슬 익스프레스', 'its name in Korean'),
  ('order_shipping', '5.99', 'shipping for an order under order_free_over'),
  ('order_free_over', '35', 'orders of this much or more (before tax) ship free'),
  ('order_days', '2', 'a package comes on this business day after the order (Monday to Friday, not federal holidays)'),
  ('order_tries', '2', 'times the driver tries a package that needs a signature before it goes to the counter'),
  ('order_hold_days', '7', 'days a package waits at the counter before it goes back to the store (refunded)'),
  ('order_pickup', 'market_checkout', 'the carrier''s counter: Fairview Market''s checkout (bring a photo ID)');

REPLACE INTO places (id, name, name_ko, zone, kind, note) VALUES
  ('atm_cu', 'Fairview Credit Union ATM', '페어뷰 신용조합 ATM', 'city', 'atm', 'On Lake Avenue by the coffee cart. Free for members, open around the clock, takes deposits.'),
  ('atm_park', 'Tidewell Bank ATM', '타이드웰 은행 ATM', 'city', 'atm', 'By the Seaside Park gate. Charges other banks'' customers $3.'),
  ('farm_stand', 'Hillside Orchards stand', '힐사이드 과수원 가판대', 'city', 'shop', 'Farmers market along the park fence: fruit, honey, cider. Weekends 8 AM to 1 PM, cash only.'),
  ('bakery_stand', 'Bluebird Bakery stand', '블루버드 베이커리 가판대', 'city', 'shop', 'Farmers market along the park fence: bread and kettle corn. Weekends 8 AM to 1 PM, cash only.');

-- The farmers market (cash only): groceries, so no sales tax.
REPLACE INTO items (id, name, name_ko, kind, price, model, energy, place, note, note_ko, shelf_days, uses, cook_only) VALUES
  ('farm_peaches', 'Peaches (3 lb)', '복숭아(3파운드)', 'grocery', 10, NULL, 9, 'farm_stand', 'three pounds for ten', '3파운드에 10달러', 5, 6, 0),
  ('farm_apples', 'Honeycrisp apples (2 lb)', '허니크리스프 사과(2파운드)', 'grocery', 6, 'apple', 8, 'farm_stand', NULL, NULL, 21, 4, 0),
  ('farm_tomatoes', 'Heirloom tomatoes (1 lb)', '에어룸 토마토(1파운드)', 'grocery', 5, 'tomato', 5, 'farm_stand', 'picked yesterday', '어제 딴 것', 5, 3, 0),
  ('farm_honey', 'Wildflower honey (12 oz jar)', '야생화 꿀(12온스 병)', 'grocery', 9, 'honey', 6, 'farm_stand', 'from hives in the hills', '언덕의 벌통에서 딴 꿀', NULL, 12, 0),
  ('farm_cider', 'Apple cider (half gallon)', '애플 사이더(반 갤런)', 'grocery', 6, 'carton', 6, 'farm_stand', 'fresh, unfiltered apple juice', '거르지 않은 생사과 주스', 10, 6, 0),
  ('farm_sourdough', 'Sourdough loaf', '사워도우 빵', 'grocery', 7, 'loaf', 12, 'bakery_stand', 'baked this morning', '오늘 아침에 구움', 4, 6, 0),
  ('farm_cinnamon_rolls', 'Cinnamon rolls (2)', '시나몬 롤(2개)', 'grocery', 6, 'muffin', 14, 'bakery_stand', NULL, NULL, 3, 2, 0),
  ('farm_kettle_corn', 'Kettle corn (big bag)', '케틀콘(큰 봉지)', 'grocery', 5, 'bag', 9, 'bakery_stand', 'sweet and salty popcorn', '달고 짭짤한 팝콘', NULL, 4, 0);

-- What only the online store sells (no place: it comes in a package).
REPLACE INTO items (id, name, name_ko, kind, price, model, energy, place, note, note_ko, shelf_days, uses, cook_only) VALUES
  ('np_ramen', 'Instant ramen (12-pack)', '인스턴트 라면(12개 묶음)', 'grocery', 8.99, 'bowl-soup', 20, NULL, 'just add hot water', '뜨거운 물만 부으면 됨', NULL, 12, 0),
  ('np_granola', 'Granola bars (box of 12)', '그래놀라 바(12개 한 상자)', 'grocery', 7.99, 'candy-bar', 8, NULL, NULL, NULL, NULL, 12, 0),
  ('np_trail_mix', 'Trail mix (2 lb bag)', '트레일 믹스(2파운드 봉지)', 'grocery', 12.99, 'bag', 10, NULL, 'nuts, raisins and chocolate', '견과류, 건포도, 초콜릿', NULL, 10, 0),
  ('np_cold_brew', 'Canned cold brew (4-pack)', '캔 콜드브루(4캔 묶음)', 'grocery', 9.99, 'soda-can', 6, NULL, NULL, NULL, NULL, 4, 0),
  ('np_paper_towels', 'Paper towels (6 rolls)', '키친타월(6롤)', 'other', 11.49, NULL, 0, NULL, NULL, NULL, NULL, 1, 0),
  ('np_toilet_paper', 'Toilet paper (12 rolls)', '화장지(12롤)', 'other', 13.99, NULL, 0, NULL, NULL, NULL, NULL, 1, 0),
  ('np_first_aid', 'First aid kit', '구급상자', 'other', 18.99, NULL, 0, NULL, NULL, NULL, NULL, 1, 0),
  ('np_desk_lamp', 'LED desk lamp', 'LED 책상 스탠드', 'other', 24.99, NULL, 0, NULL, NULL, NULL, NULL, 1, 0),
  ('np_space_heater', 'Small space heater', '소형 전기 히터', 'other', 39.99, NULL, 0, NULL, 'for chilly winter nights', '쌀쌀한 겨울밤에', NULL, 1, 0),
  ('np_headphones', 'Noise-canceling headphones', '노이즈 캔슬링 헤드폰', 'other', 119.99, NULL, 0, NULL, 'for the open office', '개방형 사무실에서', NULL, 1, 0),
  ('np_vacuum', 'Cordless stick vacuum', '무선 스틱 청소기', 'other', 149.99, NULL, 0, NULL, NULL, NULL, NULL, 1, 0);

REPLACE INTO catalog (id, item, qty, name, name_ko, price, signature, note, note_ko, sort) VALUES
  ('c_detergent', 'detergent', 3, 'Laundry pods, 3 packs (48 loads)', '세탁 세제 캡슐 3팩(48회분)', 29.99, 0, 'less than three packs at the store', '매장에서 세 팩 사는 것보다 저렴', 1),
  ('c_paper_towels', 'np_paper_towels', 1, 'Paper towels (6 rolls)', '키친타월(6롤)', 11.49, 0, NULL, NULL, 2),
  ('c_toilet_paper', 'np_toilet_paper', 1, 'Toilet paper (12 rolls)', '화장지(12롤)', 13.99, 0, NULL, NULL, 3),
  ('c_soup', 'canned_soup', 6, 'Chicken noodle soup (6 cans)', '치킨 누들 수프(6캔)', 10.99, 0, NULL, NULL, 4),
  ('c_cereal', 'cereal', 3, 'Cereal (3 boxes)', '시리얼(3상자)', 12.49, 0, NULL, NULL, 5),
  ('c_peanut_butter', 'peanut_butter', 2, 'Peanut butter (2 jars)', '땅콩버터(2병)', 6.49, 0, NULL, NULL, 6),
  ('c_ramen', 'np_ramen', 1, 'Instant ramen (12-pack)', '인스턴트 라면(12개 묶음)', 8.99, 0, 'just add hot water', '뜨거운 물만 부으면 됨', 7),
  ('c_granola', 'np_granola', 1, 'Granola bars (box of 12)', '그래놀라 바(12개 한 상자)', 7.99, 0, NULL, NULL, 8),
  ('c_trail_mix', 'np_trail_mix', 1, 'Trail mix (2 lb bag)', '트레일 믹스(2파운드 봉지)', 12.99, 0, 'nuts, raisins and chocolate', '견과류, 건포도, 초콜릿', 9),
  ('c_cold_brew', 'np_cold_brew', 1, 'Canned cold brew (4-pack)', '캔 콜드브루(4캔 묶음)', 9.99, 0, NULL, NULL, 10),
  ('c_umbrella', 'umbrella', 1, 'Compact umbrella', '접이식 우산', 11.99, 0, 'keeps you dry on rainy days', '비 오는 날 젖지 않게', 11),
  ('c_first_aid', 'np_first_aid', 1, 'First aid kit', '구급상자', 18.99, 0, NULL, NULL, 12),
  ('c_desk_lamp', 'np_desk_lamp', 1, 'LED desk lamp', 'LED 책상 스탠드', 24.99, 0, NULL, NULL, 13),
  ('c_space_heater', 'np_space_heater', 1, 'Small space heater', '소형 전기 히터', 39.99, 0, 'for chilly winter nights', '쌀쌀한 겨울밤에', 14),
  ('c_headphones', 'np_headphones', 1, 'Noise-canceling headphones', '노이즈 캔슬링 헤드폰', 119.99, 1, 'for the open office', '개방형 사무실에서', 15),
  ('c_vacuum', 'np_vacuum', 1, 'Cordless stick vacuum', '무선 스틱 청소기', 149.99, 1, NULL, NULL, 16);

REPLACE INTO messages (id, hero, day, time, kind, sender, subject, subject_ko, body, body_ko, every, last_day) VALUES
  ('m02_cu_atm', 'all', 2, '08:15', 'email', 'Fairview Credit Union', 'Skip the ATM fees', '수수료 없이 현금 찾기', 'Need cash? Our ATM on Lake Avenue, next to the coffee cart, is free for members around the clock and takes deposits. Other banks'' ATMs charge their own fee, usually $3 or more. You can also ask for cash back when you pay with your debit card at Fairview Market.', '현금이 필요하세요? 커피 카트 옆, 레이크 애비뉴에 있는 저희 ATM은 조합원이면 24시간 수수료 없이 쓸 수 있고 입금도 됩니다. 다른 은행의 ATM은 보통 3달러 이상의 자체 수수료를 받습니다. 페어뷰 마켓에서 체크카드로 계산할 때 캐시백을 받으셔도 됩니다.', NULL, NULL),
  ('m05_northpine', 'all', 5, '19:30', 'email', 'Northpine', 'Everyday essentials, delivered', '생활용품을 문 앞까지', 'Welcome to Northpine! Order laundry pods, pantry staples and more from your phone, and get them in about two business days. Shipping is free on orders of $35 or more.', '노스파인에 오신 것을 환영합니다! 세탁 세제, 식료품 같은 생활용품을 휴대전화로 주문하면 영업일 기준 약 2일 만에 받아 보실 수 있습니다. 35달러 이상 주문하면 배송비가 무료입니다.', NULL, NULL),
  ('m06_farmers', 'all', 6, '07:30', 'email', 'Seaside Park Farmers Market', 'Market day!', '오늘은 장날!', 'We''re open today and tomorrow from 8 AM to 1 PM along the Seaside Park fence on Maple Street: peaches, honey, cider, sourdough and kettle corn. The stands take cash only, so stop by an ATM first.', '오늘과 내일 오전 8시부터 오후 1시까지 메이플 스트리트의 시사이드 공원 울타리를 따라 장이 섭니다. 복숭아, 꿀, 애플 사이더, 사워도우, 케틀콘이 있어요. 가판대는 현금만 받으니 ATM에 먼저 들르세요.', 7, NULL);

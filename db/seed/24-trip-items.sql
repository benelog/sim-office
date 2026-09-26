-- Sim Office seed (agent D): things to buy on the business trip (prices in US dollars; place NULL = paid on the company card, not sold in a shop)
-- Generated from structured data; push with: node tools/dolt.mjs push <this file>
-- Statements are split at a semicolon at the end of a line. Each statement is kept under ~11k URL-encoded characters (DoltHub limit).
/* part 1/1: trip_flight trip_hotel_night trip_checked_bag trip_airport_shuttle trip_rideshare trip_latte trip_water trip_breakfast_sandwich trip_airport_burger trip_candy trip_neck_pillow trip_charger trip_hotel_breakfast trip_club_sandwich trip_salmon trip_steak trip_lobby_snack trip_client_dinner ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
REPLACE INTO items (id, name, name_ko, kind, price, model, energy, place, note) VALUES
  ('trip_flight', 'Round-trip flight, Fairview to Ridgeport (main cabin)', '페어뷰–리지포트 왕복 항공권(일반석)', 'ticket', 386.00, NULL, 0, NULL, 'booked by Tom on the company card, not sold in a shop'),
  ('trip_hotel_night', 'Pinecrest Hotel, one night', '파인크레스트 호텔 1박', 'other', 189.00, NULL, 0, NULL, 'company card, under the $200 policy cap'),
  ('trip_checked_bag', 'First checked bag', '첫 번째 위탁 수하물', 'fare', 35.00, NULL, 0, 'airport_checkin', 'reimbursable'),
  ('trip_airport_shuttle', 'Airport shuttle bus, one way', '공항 셔틀버스(편도)', 'fare', 12.00, NULL, 0, 'airport_shuttle', 'Maple Street to the airport, reimbursable'),
  ('trip_rideshare', 'Rideshare, airport to hotel', '차량 호출, 공항에서 호텔까지', 'fare', 38.60, NULL, 0, 'airport_arrive', 'reimbursable up to $50 each way'),
  ('trip_latte', 'Airport latte, large', '공항 라테(큰 것)', 'drink', 6.25, 'cup-coffee', 12, 'airport_gate', NULL),
  ('trip_water', 'Bottled water', '생수', 'drink', 4.29, 'soda-bottle', 5, 'airport_gate', 'airport prices'),
  ('trip_breakfast_sandwich', 'Breakfast sandwich', '아침 샌드위치', 'meal', 9.49, 'sandwich', 25, 'airport_gate', NULL),
  ('trip_airport_burger', 'Cheeseburger and fries', '치즈버거와 감자튀김', 'meal', 17.50, 'burger-cheese', 40, 'airport_gate', NULL),
  ('trip_candy', 'Candy bar', '초코바', 'meal', 3.29, 'candy-bar', 8, 'airport_gate', NULL),
  ('trip_neck_pillow', 'Travel neck pillow', '여행용 목베개', 'other', 24.99, NULL, 0, 'airport_gate', NULL),
  ('trip_charger', 'Phone charger', '휴대폰 충전기', 'other', 29.99, NULL, 0, 'airport_gate', NULL),
  ('trip_hotel_breakfast', 'Hotel breakfast buffet', '호텔 조식 뷔페', 'meal', 0.00, 'pancakes', 35, 'hotel_restaurant', 'included with the room, 6:30 to 10:00'),
  ('trip_club_sandwich', 'Club sandwich', '클럽 샌드위치', 'meal', 16.00, 'sandwich', 30, 'hotel_restaurant', NULL),
  ('trip_salmon', 'Grilled salmon dinner', '연어 구이 저녁', 'meal', 29.00, 'plate-dinner', 40, 'hotel_restaurant', NULL),
  ('trip_steak', 'Steak dinner', '스테이크 저녁', 'meal', 38.00, 'plate-dinner', 45, 'hotel_restaurant', NULL),
  ('trip_lobby_snack', 'Trail mix from the lobby shop', '로비 매점 견과류 믹스', 'meal', 5.49, 'bag', 10, 'hotel_desk', NULL),
  ('trip_client_dinner', 'Client dinner for two, with tip', '고객 저녁 2인(팁 포함)', 'meal', 197.00, 'plate-dinner', 0, NULL, 'company card: $164 plus a 20% tip');

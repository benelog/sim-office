-- Sim Office seed (agent D): calendar for days 8-15
-- Generated from structured data; push with: node tools/dolt.mjs push <this file>
-- Statements are split at a semicolon at the end of a line. Each statement is kept under ~11k URL-encoded characters (DoltHub limit).
/* part 1/1:                             ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
REPLACE INTO calendar (day, time, title, title_ko, place, episode) VALUES
  (8, '09:30', 'Daily standup', '데일리 스탠드업', 'office_desk_team', 'd8_standup'),
  (8, '11:00', 'Kickoff call: Summit Retail', '킥오프 콜: 서밋 리테일', 'office_meeting', 'd8_kickoff'),
  (8, '14:00', 'Ask Maya about the Ridgeport trip', '마야에게 리지포트 출장 요청', 'office_manager', 'd8_trip_approval'),
  (9, '09:30', 'Daily standup', '데일리 스탠드업', 'office_desk_team', NULL),
  (9, '10:30', 'Summit Retail: scope and timeline', '서밋 리테일: 범위와 일정', 'office_meeting', 'd9_scope'),
  (9, '13:30', 'Book travel with Tom', '톰과 출장 예약', 'office_lobby', 'd9_travel_booking'),
  (9, '15:00', 'Code review swap with Derek', '데릭과 코드 리뷰 교환', 'office_desk_team', 'd9_code_review'),
  (10, '09:30', 'Daily standup', '데일리 스탠드업', 'office_desk_team', NULL),
  (10, '10:30', 'Summit Retail: contract terms', '서밋 리테일: 계약 조건', 'office_meeting', 'd10_contract_terms'),
  (10, '14:00', 'Pricing sign-off with Maya', '마야에게 가격 승인 받기', 'office_manager', 'd10_approval'),
  (10, '16:00', 'Handoff to Derek before the trip', '출장 전 데릭에게 인수인계', 'office_desk_team', 'd10_handoff'),
  (11, '07:00', 'Airport shuttle from Maple Street', '메이플 스트리트에서 공항 셔틀', 'airport_shuttle', NULL),
  (11, '07:30', 'Check in: Crestline Air 482', '탑승 수속: 크레스트라인 482편', 'airport_checkin', 'd11_checkin'),
  (11, '08:00', 'Security', '보안 검색', 'airport_security', 'd11_security'),
  (11, '09:30', 'Flight 482 to Ridgeport, gate B12', '482편 리지포트행, B12 게이트', 'airport_gate', 'd11_gate'),
  (11, '12:30', 'Hotel check-in: Pinecrest Hotel', '호텔 체크인: 파인크레스트', 'hotel_desk', 'd11_hotel_checkin'),
  (11, '14:00', 'On-site at Summit Retail', '서밋 리테일 방문', 'client_meeting', 'd11_client_visit'),
  (11, '19:00', 'Dinner with Greg', '그렉과 저녁 식사', 'hotel_restaurant', 'd11_dinner'),
  (12, '09:30', 'Contract signing', '계약 서명', 'client_meeting', 'd12_signing'),
  (12, '12:00', 'Hotel checkout (late checkout until 1 p.m.)', '호텔 체크아웃 (오후 1시까지 연장)', 'hotel_desk', 'd12_checkout'),
  (12, '15:00', 'Flight home', '귀국 비행기', 'airport_gate', 'd12_flight_home'),
  (13, '09:30', 'Brunch at the diner', '다이너에서 브런치', 'diner_counter', 'w_brunch'),
  (13, '16:00', 'Barbecue at Carl''s', '칼네 바비큐', 'bus_stop', 'w_neighbor_bbq'),
  (14, '10:00', 'Sort your trip receipts', '출장 영수증 정리', 'home_desk', NULL),
  (19, '07:00', 'Payday: direct deposit', '월급날: 계좌 입금', NULL, NULL),
  (15, '09:30', 'Standup: trip report', '스탠드업: 출장 보고', 'office_desk_team', 'd15_trip_report'),
  (15, '11:00', 'Expense report with Linda', '린다와 경비 정산', 'office_hr', 'd15_expenses'),
  (15, '15:00', 'Check-in with Maya', '마야와 면담', 'office_manager', 'd15_raise');

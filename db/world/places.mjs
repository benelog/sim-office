// Places: where things happen. The position of each is in the zone files (office/zones/<zone>.js), by id.
// kind: sleep | eat | work | transit | shop | tv | atm | … (see office/PLAN.md section 3).

export const places = [
  {
    id: 'airport_arrive',
    name: 'Arrivals',
    name_ko: '도착 층',
    zone: 'airport',
    kind: 'door',
    note: 'After the flight: leads to the hotel.'
  },
  { id: 'airport_checkin', name: 'Airline check-in counter', name_ko: '항공사 체크인 카운터', zone: 'airport', kind: 'desk' },
  {
    id: 'airport_door',
    name: 'Airport entrance',
    name_ko: '공항 입구',
    zone: 'airport',
    kind: 'door',
    note: 'Leads back to the city.'
  },
  { id: 'airport_gate', name: 'Gate B12', name_ko: 'B12 탑승구', zone: 'airport', kind: 'seat' },
  { id: 'airport_security', name: 'Security checkpoint', name_ko: '보안 검색대', zone: 'airport', kind: 'desk' },
  {
    id: 'airport_shuttle',
    name: 'Airport shuttle stop',
    name_ko: '공항 셔틀 정류장',
    zone: 'city',
    kind: 'transit',
    note: 'Leads to the airport, only on days with a business trip.'
  },
  {
    id: 'apartment_door',
    name: 'Maple Street Apartments',
    name_ko: '메이플 스트리트 아파트',
    zone: 'city',
    kind: 'door',
    note: 'Your building. Leads to home home_door.'
  },
  {
    id: 'atm_cu',
    name: 'Fairview Credit Union ATM',
    name_ko: '페어뷰 신용조합 ATM',
    zone: 'city',
    kind: 'atm',
    note: 'On Lake Avenue by the coffee cart. Free for members, open around the clock, takes deposits.'
  },
  {
    id: 'atm_park',
    name: 'Tidewell Bank ATM',
    name_ko: '타이드웰 은행 ATM',
    zone: 'city',
    kind: 'atm',
    note: "By the Seaside Park gate. Charges other banks' customers $3."
  },
  {
    id: 'bakery_stand',
    name: 'Bluebird Bakery stand',
    name_ko: '블루버드 베이커리 가판대',
    zone: 'city',
    kind: 'shop',
    note: 'Farmers market along the park fence: bread and kettle corn. Weekends 8 AM to 1 PM, cash only.'
  },
  {
    id: 'bus_stop',
    name: 'Westside bus stop',
    name_ko: '웨스트사이드 버스 정류장',
    zone: 'city',
    kind: 'transit',
    note: 'On Maple Street by the apartments: the Number 12 bus downtown, about 15 minutes, $2.50 a ride.'
  },
  {
    id: 'bus_stop_downtown',
    name: 'Downtown bus stop',
    name_ko: '다운타운 버스 정류장',
    zone: 'city',
    kind: 'transit',
    note: 'On Maple Street at Lake Avenue, across from Seaside Labs: the Number 12 bus back to Westside, $2.50 a ride.'
  },
  {
    id: 'client_door',
    name: 'Summit Retail entrance',
    name_ko: '서밋 리테일 입구',
    zone: 'client',
    kind: 'door',
    note: 'Leads back to the hotel.'
  },
  { id: 'client_lobby', name: 'Summit Retail lobby', name_ko: '서밋 리테일 로비', zone: 'client', kind: 'desk' },
  {
    id: 'client_meeting',
    name: 'Summit Retail conference room',
    name_ko: '서밋 리테일 회의실',
    zone: 'client',
    kind: 'meeting'
  },
  {
    id: 'clinic',
    name: 'Fairview Walk-in Clinic',
    name_ko: '페어뷰 워크인 클리닉',
    zone: 'market',
    kind: 'clinic',
    note: 'A walk-in clinic next to the pharmacy: a nurse practitioner sees patients without an appointment.'
  },
  {
    id: 'coffee_cart',
    name: 'Coffee cart on Lake Avenue',
    name_ko: '레이크 애비뉴 커피 카트',
    zone: 'city',
    kind: 'shop',
    note: "Nina's cart: coffee and pastries."
  },
  {
    id: 'derek_bed',
    name: 'Your bed',
    name_ko: '내 침대',
    zone: 'home_derek',
    kind: 'sleep',
    note: 'Sleep here to end the day.'
  },
  {
    id: 'derek_desk',
    name: 'Home office',
    name_ko: '집 서재',
    zone: 'home_derek',
    kind: 'desk',
    note: 'On-call laptop and phone calls.'
  },
  {
    id: 'derek_door',
    name: "Derek's house on River Road",
    name_ko: '리버 로드의 데릭네 집',
    zone: 'city',
    kind: 'door',
    note: "Leads to home_derek derek_out (only in Derek's game)."
  },
  {
    id: 'derek_kitchen',
    name: 'Kitchen',
    name_ko: '부엌',
    zone: 'home_derek',
    kind: 'eat',
    note: 'Eat groceries from your inventory.'
  },
  {
    id: 'derek_out',
    name: 'Front door',
    name_ko: '현관',
    zone: 'home_derek',
    kind: 'door',
    note: 'Leads to city derek_door.'
  },
  {
    id: 'derek_tv',
    name: 'Sofa and TV',
    name_ko: '소파와 TV',
    zone: 'home_derek',
    kind: 'tv',
    note: 'Watch the news or tech videos with English captions.'
  },
  {
    id: 'diner_counter',
    name: 'Diner counter',
    name_ko: '다이너 카운터',
    zone: 'diner',
    kind: 'shop',
    note: 'Order and pay here (Rosa).'
  },
  {
    id: 'diner_door',
    name: 'Sunny Side Diner',
    name_ko: '서니 사이드 다이너',
    zone: 'city',
    kind: 'door',
    note: 'Same id on both sides: the street door in city, the way out in the diner zone.'
  },
  { id: 'diner_table', name: 'Booth by the window', name_ko: '창가 부스 자리', zone: 'diner', kind: 'eat' },
  {
    id: 'farm_stand',
    name: 'Hillside Orchards stand',
    name_ko: '힐사이드 과수원 가판대',
    zone: 'city',
    kind: 'shop',
    note: 'Farmers market along the park fence: fruit, honey, cider. Weekends 8 AM to 1 PM, cash only.'
  },
  {
    id: 'home_bed',
    name: 'Your bed',
    name_ko: '내 침대',
    zone: 'home',
    kind: 'sleep',
    note: 'Sleep here to end the day (next day 07:00, energy 100).'
  },
  {
    id: 'home_desk',
    name: 'Desk by the window',
    name_ko: '창가 책상',
    zone: 'home',
    kind: 'desk',
    note: 'Check the calendar and plan the week.'
  },
  {
    id: 'home_door',
    name: 'Apartment door',
    name_ko: '아파트 현관',
    zone: 'home',
    kind: 'door',
    note: 'Leads to city apartment_door.'
  },
  {
    id: 'home_kitchen',
    name: 'Kitchen',
    name_ko: '부엌',
    zone: 'home',
    kind: 'eat',
    note: 'Eat groceries from your inventory.'
  },
  {
    id: 'home_tv',
    name: 'Sofa and TV',
    name_ko: '소파와 TV',
    zone: 'home',
    kind: 'tv',
    note: 'Watch the news or tech videos with English captions.'
  },
  { id: 'hotel_desk', name: 'Hotel front desk', name_ko: '호텔 프런트', zone: 'hotel', kind: 'desk' },
  {
    id: 'hotel_door',
    name: 'Hotel entrance',
    name_ko: '호텔 입구',
    zone: 'hotel',
    kind: 'door',
    note: 'Leads to the client office.'
  },
  { id: 'hotel_restaurant', name: 'Hotel restaurant', name_ko: '호텔 식당', zone: 'hotel', kind: 'eat' },
  { id: 'hotel_room', name: 'Your hotel room', name_ko: '호텔 방', zone: 'hotel', kind: 'sleep' },
  {
    id: 'hotel_shuttle',
    name: 'Hotel airport shuttle',
    name_ko: '호텔 공항 셔틀',
    zone: 'hotel',
    kind: 'transit',
    note: 'Leads to the airport.'
  },
  {
    id: 'market_checkout',
    name: 'Checkout lane',
    name_ko: '계산대',
    zone: 'market',
    kind: 'shop',
    note: 'Pay here (Mike).'
  },
  {
    id: 'market_door',
    name: 'Fairview Market',
    name_ko: '페어뷰 마켓',
    zone: 'city',
    kind: 'door',
    note: 'Same id on both sides: the street door in city, the way out in the market zone.'
  },
  {
    id: 'market_shelves',
    name: 'Grocery aisles',
    name_ko: '식료품 진열대',
    zone: 'market',
    kind: 'shop',
    note: 'Fruit, vegetables, bread, dairy, frozen food and snacks.'
  },
  { id: 'office_desk', name: 'Your desk', name_ko: '내 자리', zone: 'office', kind: 'desk', note: 'Sit and work.' },
  {
    id: 'office_desk_priya',
    name: "Priya's desk",
    name_ko: '프리야의 자리',
    zone: 'office',
    kind: 'desk',
    note: "Priya's own desk in the open-plan row (her place to work in her game)."
  },
  {
    id: 'office_desk_team',
    name: 'Team desks',
    name_ko: '팀 자리',
    zone: 'office',
    kind: 'desk',
    note: 'Derek sits by the window.'
  },
  {
    id: 'office_door',
    name: 'Seaside Labs entrance',
    name_ko: '시사이드 랩스 입구',
    zone: 'city',
    kind: 'door',
    note: 'Same id on both sides: the street entrance in city, the way out in the office zone.'
  },
  {
    id: 'office_hr',
    name: 'HR office',
    name_ko: '인사팀 사무실',
    zone: 'office',
    kind: 'desk',
    note: 'Linda: paperwork, benefits and payroll.'
  },
  {
    id: 'office_it',
    name: 'IT help desk',
    name_ko: 'IT 헬프데스크',
    zone: 'office',
    kind: 'desk',
    note: 'Sam: laptops, accounts and badges.'
  },
  {
    id: 'office_kitchen',
    name: 'Office kitchen',
    name_ko: '사무실 탕비실',
    zone: 'office',
    kind: 'eat',
    note: 'Free coffee and snacks.'
  },
  {
    id: 'office_lobby',
    name: 'Seaside Labs lobby',
    name_ko: '시사이드 랩스 로비',
    zone: 'office',
    kind: 'desk',
    note: 'Front desk (Tom).'
  },
  {
    id: 'office_manager',
    name: "Maya's office",
    name_ko: '마야의 사무실',
    zone: 'office',
    kind: 'desk',
    note: "Your manager's office."
  },
  {
    id: 'office_meeting',
    name: 'Meeting room',
    name_ko: '회의실',
    zone: 'office',
    kind: 'meeting',
    note: 'Standups, planning and demos.'
  },
  {
    id: 'park_bench',
    name: 'Bench in Seaside Park',
    name_ko: '시사이드 공원 벤치',
    zone: 'city',
    kind: 'seat',
    note: 'Farmers market on Saturday mornings.'
  },
  {
    id: 'parking',
    name: 'Parking lot',
    name_ko: '주차장',
    zone: 'city',
    kind: 'transit',
    note: 'Downtown parking, $18 a day.'
  },
  {
    id: 'pharmacy',
    name: 'Fairview Pharmacy',
    name_ko: '페어뷰 약국',
    zone: 'market',
    kind: 'pharmacy',
    note: 'The pharmacy counter at the back of Fairview Market: prescriptions, cold medicine and flu shots.'
  },
  {
    id: 'priya_bed',
    name: 'Your bed',
    name_ko: '내 침대',
    zone: 'home_priya',
    kind: 'sleep',
    note: 'Sleep here to end the day.'
  },
  {
    id: 'priya_desk',
    name: 'Desk by the window',
    name_ko: '창가 책상',
    zone: 'home_priya',
    kind: 'desk',
    note: 'Planning and phone calls.'
  },
  {
    id: 'priya_door',
    name: 'Cedar Street Lofts',
    name_ko: '시더 스트리트 로프트',
    zone: 'city',
    kind: 'door',
    note: "Leads to home_priya priya_out (only in Priya's game)."
  },
  {
    id: 'priya_kitchen',
    name: 'Kitchen island',
    name_ko: '아일랜드 부엌',
    zone: 'home_priya',
    kind: 'eat',
    note: 'Eat groceries from your inventory.'
  },
  {
    id: 'priya_out',
    name: 'Loft door',
    name_ko: '로프트 현관',
    zone: 'home_priya',
    kind: 'door',
    note: 'Leads to city priya_door.'
  },
  {
    id: 'priya_tv',
    name: 'Sofa and TV',
    name_ko: '소파와 TV',
    zone: 'home_priya',
    kind: 'tv',
    note: 'Watch the news or tech videos with English captions.'
  }
];

// The weather of the first days (the engine makes the rest from the season) and the holidays by date.

export const weather = [
  {
    day: 1,
    kind: 'clear',
    high_f: 74,
    low_f: 56,
    forecast: 'Sunny and mild. A great start to the week.',
    forecast_ko: '맑고 온화합니다. 한 주를 시작하기 좋은 날이에요.'
  },
  {
    day: 2,
    kind: 'partly',
    high_f: 72,
    low_f: 55,
    forecast: 'Partly cloudy with a light breeze.',
    forecast_ko: '구름이 조금 끼고 바람이 살짝 붑니다.'
  },
  {
    day: 3,
    kind: 'rain',
    high_f: 63,
    low_f: 52,
    forecast: 'Rain on and off all day. Bring an umbrella.',
    forecast_ko: '하루 종일 비가 오락가락합니다. 우산을 챙기세요.'
  },
  {
    day: 4,
    kind: 'cloudy',
    high_f: 66,
    low_f: 53,
    forecast: 'Overcast and cool. The rain has moved out.',
    forecast_ko: '흐리고 선선합니다. 비는 지나갔어요.'
  },
  {
    day: 5,
    kind: 'clear',
    high_f: 73,
    low_f: 54,
    forecast: 'Clear skies for Friday. Perfect patio weather.',
    forecast_ko: '금요일은 맑은 하늘. 야외 자리에 앉기 딱 좋은 날씨예요.'
  },
  {
    day: 6,
    kind: 'clear',
    high_f: 76,
    low_f: 57,
    forecast: 'Sunny and warm. A beautiful Saturday.',
    forecast_ko: '맑고 따뜻합니다. 아름다운 토요일이에요.'
  },
  {
    day: 7,
    kind: 'clear',
    high_f: 75,
    low_f: 58,
    forecast: 'Mostly sunny, with a few clouds late in the day.',
    forecast_ko: '대체로 맑고 늦게 구름이 조금 낍니다.'
  },
  {
    day: 8,
    kind: 'fog',
    high_f: 68,
    low_f: 51,
    forecast: 'Foggy this morning, clearing up by noon.',
    forecast_ko: '아침에 안개가 끼고 정오쯤 갭니다.'
  },
  {
    day: 9,
    kind: 'rain',
    high_f: 61,
    low_f: 50,
    forecast: 'A rainy day. Expect a wet commute.',
    forecast_ko: '비 오는 날. 출퇴근길이 젖겠어요.'
  },
  {
    day: 10,
    kind: 'cloudy',
    high_f: 64,
    low_f: 49,
    forecast: 'Cloudy and chilly. You might want a jacket.',
    forecast_ko: '흐리고 쌀쌀합니다. 재킷을 입는 게 좋겠어요.'
  },
  {
    day: 11,
    kind: 'clear',
    high_f: 70,
    low_f: 50,
    forecast: 'Clear and calm. Good flying weather.',
    forecast_ko: '맑고 바람이 없습니다. 비행하기 좋은 날씨예요.'
  },
  {
    day: 12,
    kind: 'partly',
    high_f: 71,
    low_f: 52,
    forecast: 'Partly sunny. No delays expected.',
    forecast_ko: '구름 사이로 해가 납니다. 지연은 없을 거예요.'
  },
  {
    day: 13,
    kind: 'clear',
    high_f: 77,
    low_f: 56,
    forecast: 'Sunny and warm. Great weather for a barbecue.',
    forecast_ko: '맑고 따뜻합니다. 바비큐 하기 좋은 날씨예요.'
  },
  {
    day: 14,
    kind: 'rain',
    high_f: 62,
    low_f: 51,
    forecast: 'Showers through the afternoon. A good day to stay in.',
    forecast_ko: '오후까지 소나기. 집에 있기 좋은 날이에요.'
  },
  {
    day: 15,
    kind: 'cloudy',
    high_f: 65,
    low_f: 50,
    forecast: 'Gray skies, but dry.',
    forecast_ko: '하늘은 흐리지만 비는 오지 않아요.'
  },
  {
    day: 16,
    kind: 'clear',
    high_f: 69,
    low_f: 49,
    forecast: 'Crisp and sunny. It feels like fall.',
    forecast_ko: '상쾌하고 맑습니다. 가을 느낌이 나요.'
  },
  {
    day: 17,
    kind: 'partly',
    high_f: 68,
    low_f: 50,
    forecast: 'A mix of sun and clouds.',
    forecast_ko: '해와 구름이 번갈아 나옵니다.'
  },
  {
    day: 18,
    kind: 'rain',
    high_f: 59,
    low_f: 48,
    forecast: 'Steady rain and a cool breeze. Bundle up.',
    forecast_ko: '비가 계속 오고 바람이 찹니다. 따뜻하게 입으세요.'
  },
  {
    day: 19,
    kind: 'clear',
    high_f: 67,
    low_f: 47,
    forecast: 'Sunny for payday Friday.',
    forecast_ko: '월급날 금요일은 맑습니다.'
  },
  { day: 20, kind: 'clear', high_f: 70, low_f: 49, forecast: 'Blue skies all day.', forecast_ko: '하루 종일 파란 하늘이에요.' },
  {
    day: 21,
    kind: 'fog',
    high_f: 66,
    low_f: 48,
    forecast: 'Morning fog, then some sun.',
    forecast_ko: '아침 안개 뒤에 해가 조금 납니다.'
  }
];

export const holidays = [
  {
    date: '2026-10-12',
    name: "Columbus Day / Indigenous Peoples' Day",
    name_ko: '콜럼버스 데이 · 원주민의 날',
    kind: 'federal',
    note: 'Banks and post offices are closed. Most offices and stores stay open, and buses run on the weekend timetable.',
    note_ko: '은행과 우체국은 쉽니다. 회사와 상점은 대부분 문을 열고, 버스는 주말 시간표로 다닙니다.'
  },
  {
    date: '2026-10-31',
    name: 'Halloween',
    name_ko: '핼러윈',
    note: 'Kids go trick-or-treating in costume. It is not a day off.',
    note_ko: '아이들이 분장을 하고 사탕을 받으러 다닙니다. 쉬는 날은 아닙니다.'
  },
  {
    date: '2026-11-03',
    name: 'Election Day',
    name_ko: '선거일',
    note: 'Not a federal holiday, but many employers give time off to vote.',
    note_ko: '연방 공휴일은 아니지만 투표할 시간을 주는 회사가 많습니다.'
  },
  {
    date: '2026-11-11',
    name: 'Veterans Day',
    name_ko: '재향군인의 날',
    kind: 'federal',
    note: 'Banks and post offices are closed. Many offices stay open.',
    note_ko: '은행과 우체국은 쉽니다. 문을 여는 회사도 많습니다.'
  },
  {
    date: '2026-11-26',
    name: 'Thanksgiving Day',
    name_ko: '추수감사절',
    kind: 'federal',
    note: 'Most offices are closed, and so are many stores and restaurants; grocery stores close early. Families get together for a turkey dinner.',
    note_ko: '회사는 대부분 쉬고, 상점과 식당도 문을 닫는 곳이 많으며, 식료품점은 일찍 닫습니다. 가족이 모여 칠면조 요리를 먹습니다.'
  },
  {
    date: '2026-11-27',
    name: 'Black Friday',
    name_ko: '블랙 프라이데이',
    note: 'The biggest shopping day of the year. Many offices are closed.',
    note_ko: '한 해에서 가장 큰 쇼핑 날입니다. 쉬는 회사가 많습니다.'
  },
  {
    date: '2026-12-24',
    name: 'Christmas Eve',
    name_ko: '크리스마스이브',
    note: 'Not a federal holiday, but many offices close and stores close early.',
    note_ko: '연방 공휴일은 아니지만 쉬는 회사가 많고 상점은 일찍 닫습니다.'
  },
  {
    date: '2026-12-25',
    name: 'Christmas Day',
    name_ko: '크리스마스',
    kind: 'federal',
    note: 'Almost everything is closed, even most grocery stores.',
    note_ko: '식료품점을 포함해 거의 모든 곳이 문을 닫습니다.'
  },
  {
    date: '2026-12-31',
    name: "New Year's Eve",
    name_ko: '새해 전날',
    note: 'People stay up to count down to midnight. Stores close early.',
    note_ko: '자정까지 깨어 카운트다운을 합니다. 상점은 일찍 닫습니다.'
  },
  {
    date: '2027-01-01',
    name: "New Year's Day",
    name_ko: '새해 첫날',
    kind: 'federal',
    note: 'Banks, post offices and most offices are closed. Stores open late.',
    note_ko: '은행·우체국과 대부분의 회사가 쉽니다. 상점은 늦게 엽니다.'
  },
  {
    date: '2027-01-18',
    name: 'Martin Luther King Jr. Day',
    name_ko: '마틴 루서 킹 주니어의 날',
    kind: 'federal',
    note: 'Banks and post offices are closed. Many people volunteer in their community.',
    note_ko: '은행과 우체국은 쉽니다. 많은 사람이 지역 봉사 활동을 합니다.'
  },
  {
    date: '2027-02-14',
    name: "Valentine's Day",
    name_ko: '밸런타인데이',
    note: 'Cards, flowers and chocolate. Restaurants are busy. It is not a day off.',
    note_ko: '카드와 꽃, 초콜릿을 주고받습니다. 식당이 붐빕니다. 쉬는 날은 아닙니다.'
  },
  {
    date: '2027-02-15',
    name: "Presidents' Day",
    name_ko: '대통령의 날',
    kind: 'federal',
    note: "Officially Washington's Birthday. Banks and post offices are closed, and stores have big sales.",
    note_ko: '공식 이름은 워싱턴 탄생일입니다. 은행과 우체국은 쉬고, 상점은 크게 할인합니다.'
  }
];

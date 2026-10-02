// People: who they are, what they say in passing (chatter, in turn) and where they are through the day (schedule:
// the first entry that fits the day and the time; days all | weekday | weekend | mon,tue,… | game days 11-12).
// The heroes are people too (in the games of the other two).

export const npcs = [
  {
    id: 'amy',
    name: 'Amy',
    name_ko: '에이미',
    role: 'Airline check-in agent',
    role_ko: '항공사 체크인 직원',
    model: 'woman-formal-3',
    place: 'airport_checkin',
    voice_pitch: 1.1,
    voice_rate: 0.98,
    voice_like: 'Cora|Ana|Shelley|Flo',
    bio: 'Quick, polite airline agent who has heard every excuse for an overweight bag.',
    bio_ko: '빠르고 공손한 항공사 직원으로, 무게 초과 가방에 대한 온갖 변명을 다 들어 봤습니다.',
    chatter: [
      { line: 'Next in line, please!', line_ko: '다음 분 오세요!' },
      { line: 'Any bags to check today?', line_ko: '오늘 부칠 짐 있으세요?' },
      { line: 'Boarding starts forty minutes before departure.', line_ko: '탑승은 출발 40분 전에 시작합니다.' }
    ]
  },
  {
    id: 'carl',
    name: 'Carl',
    name_ko: '칼',
    role: 'Your neighbor and landlord',
    role_ko: '이웃이자 집주인',
    model: 'man-farmer',
    place: 'bus_stop',
    voice_pitch: 0.8,
    voice_rate: 0.9,
    voice_like: 'Fred|Ralph|Grandpa|Christopher',
    bio: 'Retired bus mechanic who owns your building and lives on the first floor. Calls you "kid" and has an opinion about everything.',
    bio_ko: '은퇴한 버스 정비사로, 당신이 사는 건물의 주인이고 1층에 삽니다. 당신을 "kid"라고 부르고, 모든 일에 한마디씩 합니다.',
    chatter: [
      { line: 'Morning, kid. Bus is running late again.', line_ko: '좋은 아침. 버스가 또 늦네.' },
      { line: 'Looks like rain later. Better grab an umbrella.', line_ko: '이따 비 오겠어. 우산 챙기는 게 좋겠네.' },
      { line: "Trash goes out Monday night. Don't forget.", line_ko: '쓰레기는 월요일 밤에 내놔. 잊지 말고.' },
      { line: 'Back in my day, the fare was a quarter.', line_ko: '내가 젊을 땐 버스비가 25센트였지.' }
    ],
    schedule: [
      { days: 'weekday', time_from: '07:00', time_to: '09:30', place: 'bus_stop' },
      { days: 'weekday', time_from: '15:00', time_to: '18:30', place: 'park_bench' },
      { days: 'weekend', time_from: '08:00', time_to: '18:30', place: 'park_bench' },
      { time_from: '18:30', time_to: '21:00', place: 'apartment_door' }
    ]
  },
  {
    id: 'derek',
    name: 'Derek Alvarez',
    name_ko: '데릭 알바레스',
    role: 'Senior developer, your onboarding buddy',
    role_ko: '시니어 개발자, 온보딩 버디',
    model: 'man-hoodie',
    place: 'office_desk_team',
    voice_pitch: 0.9,
    voice_rate: 0.98,
    voice_like: 'Guy|Davis|Alex|Tony',
    bio: 'Laid-back senior developer who reviews code carefully but kindly. Says "No rush" and "Just ping me" a lot.',
    bio_ko: '느긋한 시니어 개발자로, 코드 리뷰는 꼼꼼하지만 친절합니다. "No rush", "Just ping me"를 입에 달고 삽니다.',
    chatter: [
      { line: "Hey! How's it going?", line_ko: '안녕! 어떻게 돼 가요?' },
      { line: "If the build breaks, it wasn't you. Probably.", line_ko: '빌드가 깨져도 당신 탓은 아니에요. 아마도요.' },
      { line: 'I need more coffee before I look at that pull request.', line_ko: '그 풀 리퀘스트 보기 전에 커피가 더 필요해요.' },
      { line: 'No rush on anything today. Just ping me if you get stuck.', line_ko: '오늘은 급한 거 없어요. 막히면 메시지 줘요.' },
      { line: 'Did you catch the game last night? Total nail-biter.', line_ko: '어젯밤 경기 봤어요? 완전 손에 땀을 쥐게 했어요.' }
    ],
    schedule: [
      { days: 'weekday', time_from: '08:50', time_to: '12:45', place: 'office_desk_team' },
      { days: 'weekday', time_from: '12:45', time_to: '13:20', place: 'office_kitchen' },
      { days: 'weekday', time_from: '13:20', time_to: '18:45', place: 'office_desk_team' }
    ]
  },
  {
    id: 'gloria',
    name: 'Gloria',
    name_ko: '글로리아',
    role: 'Day cashier at Fairview Market',
    role_ko: '페어뷰 마켓 낮 계산원',
    model: 'woman-casual',
    place: 'market_checkout',
    voice_rate: 0.94,
    voice_like: 'Karen|Moira|Nancy|Susan',
    bio: 'Has run the morning register for twelve years. Knows the regulars by their coupons and leaves at three to pick up her grandkids.',
    bio_ko: '12년째 아침 계산대를 지키고 있습니다. 단골을 쿠폰으로 알아보고, 세 시에 손주들을 데리러 퇴근합니다.',
    chatter: [
      { line: "Morning! The bread just came in. It's still warm.", line_ko: '좋은 아침이에요! 빵이 방금 들어왔어요. 아직 따뜻해요.' },
      { line: "Do you have a rewards card? You'd save on those eggs.", line_ko: '적립 카드 있어요? 그 달걀 더 싸게 살 수 있는데.' },
      { line: "I'm off at three. Then it's time to get my grandkids.", line_ko: '세 시면 퇴근이에요. 그다음엔 손주들 데리러 가야죠.' },
      { line: 'Self-checkout is open if you only have a few things.', line_ko: '물건이 몇 개 안 되면 셀프 계산대도 열려 있어요.' }
    ],
    schedule: [
      { days: 'mon,tue,wed,thu,fri', time_from: '07:00', time_to: '15:00', place: 'market_checkout' }
    ]
  },
  {
    id: 'grace',
    name: 'Grace Liu',
    name_ko: '그레이스 리우',
    role: 'Nurse practitioner at the walk-in clinic',
    role_ko: '워크인 클리닉 전문 간호사',
    model: 'woman-formal',
    place: 'clinic',
    voice_pitch: 1.05,
    voice_rate: 0.96,
    voice_like: 'Michelle|Samantha|Joanna|Salli',
    bio: "A nurse practitioner who runs the walk-in clinic next to the pharmacy: colds, flu, sprains and doctor's notes, no appointment needed.",
    bio_ko: '약국 옆 워크인 클리닉을 맡은 전문 간호사(NP)입니다. 감기, 독감, 삔 발목, 진단서까지, 예약 없이 봐 줍니다.',
    chatter: [
      {
        line: 'Walk-ins welcome! The wait is about fifteen minutes today.',
        line_ko: '예약 없이 오셔도 돼요! 오늘은 15분쯤 기다리면 돼요.'
      },
      {
        line: "Wash your hands and get some sleep. That's half of my advice right there.",
        line_ko: '손 잘 씻고 푹 자기. 제 조언의 절반이 그거예요.'
      },
      {
        line: "Flu season is starting. I've seen five fevers since lunch.",
        line_ko: '독감 철이 시작됐어요. 점심 이후로 열나는 환자만 다섯 명 봤어요.'
      }
    ],
    schedule: [
      { days: 'weekday', time_from: '09:00', time_to: '19:00', place: 'clinic' },
      { days: 'weekend', time_from: '10:00', time_to: '16:00', place: 'clinic' }
    ]
  },
  {
    id: 'greg',
    name: 'Greg Whitfield',
    name_ko: '그렉 휘트필드',
    role: 'VP at Summit Retail (client)',
    role_ko: '서밋 리테일 부사장(고객사)',
    model: 'man-suit',
    place: 'client_meeting',
    voice_pitch: 0.85,
    voice_rate: 0.93,
    voice_like: 'Christopher|Steffan|Bruce|Albert',
    bio: "Busy, direct client who wants the bottom line first. Friendly once he trusts you, and he likes people who say \"I don't know, but I'll find out.\"",
    bio_ko: '결론부터 듣고 싶어 하는 바쁘고 직설적인 고객입니다. 믿음이 생기면 다정해지고, "모르지만 알아보겠습니다"라고 말하는 사람을 좋아합니다.',
    chatter: [
      { line: "Let's keep this quick. I've got a call at the top of the hour.", line_ko: '짧게 합시다. 정각에 통화가 있어요.' },
      { line: 'Bottom line: will it be ready for the holidays?', line_ko: '결론만요: 연말 시즌 전에 준비됩니까?' },
      { line: 'Good to see you in person for once.', line_ko: '이번엔 직접 보니 좋네요.' }
    ]
  },
  {
    id: 'hector',
    name: 'Hector',
    name_ko: '헥터',
    role: 'Server at the Sunny Side Diner (weekends)',
    role_ko: '서니 사이드 다이너 종업원(주말)',
    model: 'man-adventurer',
    place: 'diner_counter',
    voice_pitch: 0.9,
    voice_rate: 0.96,
    voice_like: 'Guy|Jason|Eric|Christopher',
    bio: 'Covers weekend mornings and the early-week evenings. Swears by the pancakes.',
    bio_ko: '주말 아침과 주초 저녁을 맡습니다. 팬케이크라면 자신 있게 권합니다.',
    chatter: [
      { line: "Coffee's fresh. Want a cup while you look at the menu?", line_ko: '커피 막 내렸어요. 메뉴 보시는 동안 한 잔 드릴까요?' },
      {
        line: "Rosa has the weekday mornings. I'm here weekends and a couple of nights.",
        line_ko: '평일 아침은 로사가 해요. 저는 주말이랑 저녁 이틀 나와요.'
      },
      { line: 'Get the pancakes. Trust me.', line_ko: '팬케이크 드세요. 믿어 보세요.' },
      { line: "Your check comes when you're ready. No rush.", line_ko: '계산서는 준비되시면 드릴게요. 천천히 드세요.' }
    ],
    schedule: [
      { days: 'sat,sun', time_from: '06:30', time_to: '14:30', place: 'diner_counter' },
      { days: 'mon,tue', time_from: '14:30', time_to: '21:30', place: 'diner_counter' }
    ]
  },
  {
    id: 'jess',
    name: 'Jess',
    name_ko: '제스',
    role: 'Weekend barista at the coffee cart',
    role_ko: '커피 카트 주말 바리스타',
    model: 'woman-adventurer',
    place: 'coffee_cart',
    voice_pitch: 1.15,
    voice_rate: 1.02,
    voice_like: 'Ava|Amber|Ivy|Ana',
    bio: "Nina's friend who runs the cart on weekends. Plays indie music from a tiny speaker.",
    bio_ko: '주말에 커피 카트를 맡는 니나의 친구입니다. 작은 스피커로 인디 음악을 틉니다.',
    chatter: [
      { line: 'Hi! Nina takes the weekends off, so you get me.', line_ko: '안녕하세요! 니나는 주말에 쉬어서 오늘은 제가 해요.' },
      { line: 'The cold brew is extra strong today.', line_ko: '오늘 콜드브루는 특히 진해요.' },
      { line: "Got your punch card? I'll stamp it, same as Nina.", line_ko: '쿠폰 카드 있어요? 니나처럼 도장 찍어 드릴게요.' },
      { line: 'We close at two on weekends.', line_ko: '주말에는 두 시에 닫아요.' }
    ],
    schedule: [
      { days: 'sat,sun', time_from: '08:00', time_to: '14:00', place: 'coffee_cart' }
    ]
  },
  {
    id: 'jun',
    name: 'Jun Kim',
    name_ko: '준 김',
    role: 'Software developer, new hire',
    role_ko: '신입 소프트웨어 개발자',
    model: 'man-casual-3',
    place: 'office_desk',
    voice_pitch: 1.02,
    voice_rate: 0.97,
    voice_like: 'Eric|Brandon|Reed|Aaron',
    bio: 'The new developer on the team, in his first week. Eager, polite, and full of questions he is a little shy to ask.',
    bio_ko: '팀에 새로 온 개발자로 첫 주를 보내는 중입니다. 열심이고 공손하며, 묻기 조금 쑥스러운 질문이 많습니다.',
    chatter: [
      { line: "Hi! I'm still finding my way around the codebase.", line_ko: '안녕하세요! 아직 코드베이스를 파악하는 중이에요.' },
      { line: 'Quick question: is it okay if I ask a lot of questions?', line_ko: '잠깐 질문인데요, 질문을 많이 해도 괜찮을까요?' },
      { line: 'I finally got my dev environment working!', line_ko: '드디어 개발 환경이 돌아가요!' },
      { line: 'Everyone here has been really welcoming.', line_ko: '여기 분들이 다 정말 반갑게 맞아 주세요.' }
    ],
    schedule: [
      { seq: 0, days: '11-12', time_from: '00:00', time_to: '23:59', place: 'client_lobby' },
      { seq: 1, days: 'weekday', time_from: '08:45', time_to: '12:20', place: 'office_desk' },
      { seq: 2, days: 'weekday', time_from: '12:20', time_to: '12:45', place: 'office_kitchen' },
      { seq: 3, days: 'weekday', time_from: '12:45', time_to: '18:00', place: 'office_desk' }
    ]
  },
  {
    id: 'kelly',
    name: 'Kelly',
    name_ko: '켈리',
    role: 'Hotel front desk',
    role_ko: '호텔 프런트 직원',
    model: 'woman-suit-2',
    place: 'hotel_desk',
    voice_pitch: 1.05,
    voice_rate: 0.96,
    voice_like: 'Michelle|Joanna|Kendra|Ivy',
    bio: 'Warm hotel receptionist who always knows a good place to eat nearby.',
    bio_ko: '근처 맛집을 늘 알고 있는 친절한 호텔 프런트 직원입니다.',
    chatter: [
      { line: 'Welcome! Checking in?', line_ko: '어서 오세요! 체크인하세요?' },
      { line: 'Breakfast is from six-thirty to ten in the restaurant.', line_ko: '아침은 식당에서 여섯 시 반부터 열 시까지예요.' },
      { line: 'The Wi-Fi password is on the back of your key card sleeve.', line_ko: '와이파이 비밀번호는 카드키 봉투 뒷면에 있어요.' },
      { line: 'Need a dinner recommendation? Just ask!', line_ko: '저녁 추천 필요하면 물어보세요!' }
    ]
  },
  {
    id: 'lee',
    name: 'Lee',
    name_ko: '리',
    role: 'TSA officer at airport security',
    role_ko: '공항 보안 검색 요원',
    model: 'man-worker-2',
    place: 'airport_security',
    voice_pitch: 0.92,
    voice_rate: 0.92,
    voice_like: 'Roger|Tony|Albert|David',
    bio: 'Calm, firm security officer. Short sentences, clear instructions, and the occasional dry joke.',
    bio_ko: '침착하고 단호한 보안 요원입니다. 짧은 문장과 분명한 지시, 가끔 건조한 농담을 합니다.',
    chatter: [
      { line: 'Laptops out of the bag, please.', line_ko: '노트북은 가방에서 꺼내 주세요.' },
      { line: 'Liquids in a quart-size bag. Three point four ounces or less.', line_ko: '액체는 1쿼트 봉투에. 3.4온스 이하로요.' },
      { line: 'Shoes stay on today. Lucky you.', line_ko: '오늘은 신발 안 벗어도 돼요. 운 좋네요.' },
      { line: 'Step forward, please. Arms up.', line_ko: '앞으로 오세요. 팔 올리세요.' }
    ]
  },
  {
    id: 'linda',
    name: 'Linda Park',
    name_ko: '린다 박',
    role: 'HR and payroll',
    role_ko: '인사·급여 담당',
    model: 'woman-formal-2',
    place: 'office_hr',
    voice_rate: 0.92,
    voice_like: 'Susan|Victoria|Elizabeth|Nancy',
    bio: 'Patient HR specialist who explains forms slowly and clearly. She loves a good acronym: W-4, PTO, FICA, 401(k).',
    bio_ko: '서류를 천천히, 알기 쉽게 설명해 주는 인사 담당자입니다. W-4, PTO, FICA, 401(k) 같은 약어를 좋아합니다.',
    chatter: [
      { line: "Hi there! Door's open if you need anything.", line_ko: '안녕하세요! 필요하면 언제든 들러요.' },
      { line: "Questions about your benefits? It's all in the HR portal.", line_ko: '복리후생이 궁금하면 HR 포털에 다 있어요.' },
      { line: 'Payday is every other Friday, by direct deposit.', line_ko: '급여일은 격주 금요일, 계좌 입금이에요.' },
      { line: 'Make sure your address is up to date in the HR portal.', line_ko: 'HR 포털에 주소가 최신인지 확인해요.' }
    ],
    schedule: [
      { days: 'weekday', time_from: '08:30', time_to: '13:50', place: 'office_hr' },
      { days: 'weekday', time_from: '13:50', time_to: '14:20', place: 'office_kitchen' },
      { days: 'weekday', time_from: '14:20', time_to: '17:00', place: 'office_hr' }
    ]
  },
  {
    id: 'marisol',
    name: 'Marisol',
    name_ko: '마리솔',
    role: 'Evening server at the Sunny Side Diner',
    role_ko: '서니 사이드 다이너 저녁 종업원',
    model: 'woman-punk',
    place: 'diner_counter',
    voice_pitch: 1.1,
    voice_rate: 1,
    voice_like: 'Jenny|Aria|Ana|Emma',
    bio: 'Works the dinner shift between art classes. Draws little suns on the checks.',
    bio_ko: '미술 수업 사이사이 저녁 교대로 일합니다. 계산서에 작은 해를 그려 줍니다.',
    chatter: [
      { line: 'Hi there! Sit anywhere you like.', line_ko: '어서 오세요! 아무 데나 앉으세요.' },
      { line: "Rosa does the mornings. I've got the dinner crowd.", line_ko: '아침은 로사가 맡고, 저녁 손님은 제가 받아요.' },
      { line: 'The pie goes fast after six. Just saying.', line_ko: '파이는 여섯 시 넘으면 금방 떨어져요. 그냥 하는 말이에요.' },
      { line: 'We close at nine thirty, and the kitchen stops at nine.', line_ko: '아홉 시 반에 문 닫고, 주방 주문은 아홉 시까지예요.' }
    ],
    schedule: [
      { days: 'wed,thu,fri,sat,sun', time_from: '14:30', time_to: '21:30', place: 'diner_counter' }
    ]
  },
  {
    id: 'maya',
    name: 'Maya Chen',
    name_ko: '마야 첸',
    role: 'Engineering manager',
    role_ko: '엔지니어링 매니저',
    model: 'woman-suit',
    place: 'office_manager',
    voice_pitch: 1.05,
    voice_rate: 0.94,
    voice_like: 'Jenny|Samantha|Michelle|Zira',
    bio: 'Calm and organized, with a checklist for everything. She ends almost every talk with "Let me know if you have any questions."',
    bio_ko: '차분하고 꼼꼼해서 모든 일에 체크리스트가 있습니다. 대화 끝에는 거의 늘 "Let me know if you have any questions."라고 합니다.',
    chatter: [
      { line: 'Morning! Did you get everything you need?', line_ko: '좋은 아침! 필요한 건 다 받았어요?' },
      {
        line: "I'm in back-to-back meetings until two, but ping me if it's urgent.",
        line_ko: '두 시까지 회의가 줄줄이 있지만, 급하면 메시지 줘요.'
      },
      {
        line: 'Remember, nobody expects you to know everything in week one.',
        line_ko: '기억해요, 첫 주에 다 알 거라고 기대하는 사람은 없어요.'
      },
      { line: 'Let me know if you have any questions, okay?', line_ko: '궁금한 거 있으면 말해 줘요, 알았죠?' }
    ],
    schedule: [
      { days: 'weekday', time_from: '08:15', time_to: '12:15', place: 'office_manager' },
      { days: 'weekday', time_from: '12:15', time_to: '12:50', place: 'office_kitchen' },
      { days: 'weekday', time_from: '12:50', time_to: '18:15', place: 'office_manager' }
    ]
  },
  {
    id: 'mike',
    name: 'Mike',
    name_ko: '마이크',
    role: 'Cashier at Fairview Market',
    role_ko: '페어뷰 마켓 계산원',
    model: 'man-worker',
    place: 'market_checkout',
    voice_pitch: 0.97,
    voice_rate: 0.98,
    voice_like: 'Junior|Andrew|Eddy|Brian',
    bio: 'College student working the evening shift. Knows every sale in the store and talks about them whether you ask or not.',
    bio_ko: '저녁 교대로 일하는 대학생입니다. 가게의 할인 상품을 전부 꿰고 있어서, 묻지 않아도 알려 줍니다.',
    chatter: [
      { line: 'Hey! Strawberries are buy one, get one free this week.', line_ko: '안녕하세요! 이번 주 딸기는 하나 사면 하나 더예요.' },
      { line: "Don't forget your rewards number. You save a ton.", line_ko: '적립 번호 잊지 마요. 꽤 아껴요.' },
      { line: 'We close at ten tonight.', line_ko: '오늘 밤 열 시에 문 닫아요.' },
      { line: "Paper or plastic? Just kidding, I'll ask at checkout.", line_ko: '종이? 비닐? 농담이에요, 계산할 때 물어볼게요.' }
    ],
    schedule: [
      { days: 'wed,thu,fri,sat,sun', time_from: '15:00', time_to: '22:00', place: 'market_checkout' }
    ]
  },
  {
    id: 'nina',
    name: 'Nina',
    name_ko: '니나',
    role: 'Barista at the coffee cart',
    role_ko: '커피 카트 바리스타',
    model: 'woman-adventurer-2',
    place: 'coffee_cart',
    voice_pitch: 1.2,
    voice_rate: 1,
    voice_like: 'Sara|Amber|Nicky|Emma',
    bio: "Cheerful early bird who runs the coffee cart on Lake Avenue. Remembers regulars' orders after two visits.",
    bio_ko: '레이크 애비뉴에서 커피 카트를 하는 명랑한 아침형 인간입니다. 두 번만 오면 단골의 주문을 기억합니다.',
    chatter: [
      { line: 'Morning! The usual?', line_ko: '좋은 아침! 늘 먹던 걸로?' },
      { line: "Cold brew's extra strong today. You've been warned.", line_ko: '오늘 콜드브루 엄청 진해요. 경고했어요.' },
      { line: 'Blueberry muffins just came in. Still warm!', line_ko: '블루베리 머핀 막 들어왔어요. 아직 따뜻해요!' },
      { line: "Have a good one! Don't work too hard.", line_ko: '좋은 하루 보내요! 너무 무리하지 말고요.' }
    ],
    schedule: [
      { days: 'mon,tue,wed,thu,fri', time_from: '06:30', time_to: '15:00', place: 'coffee_cart' }
    ]
  },
  {
    id: 'omar',
    name: 'Omar Haddad',
    name_ko: '오마르 하다드',
    role: 'Pharmacist at Fairview Pharmacy',
    role_ko: '페어뷰 약국 약사',
    model: 'man-suit-2',
    place: 'pharmacy',
    voice_pitch: 0.95,
    voice_rate: 0.94,
    voice_like: 'Guy|Eric|Christopher|Davis',
    bio: "The pharmacist at the back of Fairview Market for nine years. Remembers everyone's allergies and gives the same speech about the store brand to anyone who will listen.",
    bio_ko: '9년째 페어뷰 마켓 안쪽 약국을 지키는 약사입니다. 손님마다 알레르기를 기억하고, 들어 주는 사람만 있으면 자체 브랜드 약 이야기를 늘어놓습니다.',
    chatter: [
      {
        line: 'Flu shots are free with most insurance plans. No appointment needed.',
        line_ko: '독감 예방 주사는 보험이 있으면 대부분 무료예요. 예약도 필요 없어요.'
      },
      {
        line: 'Picking up? I just need a photo ID and your date of birth.',
        line_ko: '약 찾으러 오셨어요? 사진 신분증하고 생년월일만 있으면 돼요.'
      },
      {
        line: 'The store brand works just as well. Same ingredients, smaller price.',
        line_ko: '자체 브랜드도 똑같이 들어요. 성분은 같고 값은 더 싸요.'
      }
    ],
    schedule: [
      { days: 'weekday', time_from: '09:00', time_to: '19:00', place: 'pharmacy' },
      { days: 'weekend', time_from: '10:00', time_to: '17:00', place: 'pharmacy' }
    ]
  },
  {
    id: 'priya',
    name: 'Priya Nair',
    name_ko: '프리야 네어',
    role: 'Product manager',
    role_ko: '프로덕트 매니저',
    model: 'woman-casual-2',
    place: 'office_meeting',
    voice_pitch: 1.12,
    voice_rate: 1,
    voice_like: 'Aria|Ava|Allison|Ashley',
    bio: 'Upbeat product manager who keeps every meeting on time. Her favorite question is "Any blockers?"',
    bio_ko: '회의를 늘 제시간에 끝내는 밝은 프로덕트 매니저입니다. 제일 좋아하는 질문은 "Any blockers?"입니다.',
    chatter: [
      { line: "Standup's at ten sharp! Don't be late.", line_ko: '스탠드업은 열 시 정각이에요! 늦지 마요.' },
      { line: "I'm updating the roadmap. Wish me luck.", line_ko: '로드맵 고치는 중이에요. 행운을 빌어 줘요.' },
      { line: 'Any blockers? No? Great!', line_ko: '막히는 거 있어요? 없어요? 좋아요!' },
      { line: 'This room is booked all afternoon, as usual.', line_ko: '이 방은 늘 그렇듯 오후 내내 예약돼 있어요.' }
    ],
    schedule: [
      { days: 'weekday', time_from: '09:00', time_to: '13:20', place: 'office_meeting' },
      { days: 'weekday', time_from: '13:20', time_to: '13:50', place: 'office_kitchen' },
      { days: 'weekday', time_from: '13:50', time_to: '17:45', place: 'office_meeting' }
    ]
  },
  {
    id: 'rosa',
    name: 'Rosa',
    name_ko: '로사',
    role: 'Server at the Sunny Side Diner',
    role_ko: '서니 사이드 다이너 종업원',
    model: 'woman-casual-3',
    place: 'diner_counter',
    voice_pitch: 1.15,
    voice_rate: 1,
    voice_like: 'Kathy|Monica|Sandy|Jane',
    bio: 'Has worked the diner counter for twenty years. Calls everyone "hon" and remembers how you like your eggs.',
    bio_ko: '20년째 다이너 카운터를 지키고 있습니다. 누구에게나 "hon"이라고 부르고, 손님이 계란을 어떻게 먹는지 기억합니다.',
    chatter: [
      { line: 'Hi, hon! Sit anywhere you like.', line_ko: '어서 와요! 아무 데나 앉아요.' },
      { line: 'Pie of the day is apple. Just saying.', line_ko: '오늘의 파이는 사과예요. 그냥 말하는 거예요.' },
      { line: 'More coffee, hon? Refills are free.', line_ko: '커피 더 줄까요? 리필은 무료예요.' },
      { line: 'Lunch rush starts at noon, so come early.', line_ko: '점심 손님은 정오부터 몰려요, 일찍 와요.' }
    ],
    schedule: [
      { days: 'mon,tue,wed,thu,fri', time_from: '06:30', time_to: '14:30', place: 'diner_counter' }
    ]
  },
  {
    id: 'sam',
    name: 'Sam Reyes',
    name_ko: '샘 레예스',
    role: 'IT help desk',
    role_ko: 'IT 헬프데스크 담당',
    model: 'man-casual-2',
    place: 'office_it',
    voice_pitch: 0.86,
    voice_rate: 0.97,
    voice_like: 'David|Roger|Rocko|Brian',
    bio: 'Unflappable IT guy with three monitors and a cold brew. His first question is always "Have you tried restarting it?"',
    bio_ko: '모니터 세 대와 콜드브루를 곁에 둔 느긋한 IT 담당입니다. 첫 질문은 언제나 "Have you tried restarting it?"입니다.',
    chatter: [
      { line: 'Have you tried turning it off and on again?', line_ko: '껐다가 다시 켜 봤어요?' },
      {
        line: "Don't click on any links from the \"CEO\" asking for gift cards.",
        line_ko: '기프트 카드 달라는 "CEO"의 링크는 누르지 마요.'
      },
      { line: 'Remember to lock your screen when you step away.', line_ko: '자리 비울 때는 화면 잠그는 거 잊지 마요.' },
      {
        line: 'Password expires every ninety days. Sorry, not my rule.',
        line_ko: '비밀번호는 90일마다 만료돼요. 미안, 제가 정한 규칙은 아니에요.'
      }
    ],
    schedule: [
      { days: 'weekday', time_from: '08:30', time_to: '11:40', place: 'office_it' },
      { days: 'weekday', time_from: '11:40', time_to: '12:15', place: 'office_kitchen' },
      { days: 'weekday', time_from: '12:15', time_to: '17:30', place: 'office_it' }
    ]
  },
  {
    id: 'tom',
    name: 'Tom Becker',
    name_ko: '톰 베커',
    role: 'Office manager at the front desk',
    role_ko: '프런트 데스크의 사무 관리자',
    model: 'man-casual',
    place: 'office_lobby',
    voice_pitch: 0.95,
    voice_like: 'Mark|Tom|Jason|Andrew',
    bio: 'Knows everyone in the building and where the good coffee is. Greets people by name and never forgets a birthday.',
    bio_ko: '건물 사람들을 다 알고, 맛있는 커피가 어디 있는지도 압니다. 사람들 이름을 불러 인사하고 생일을 잊는 법이 없습니다.',
    chatter: [
      { line: 'Morning! Badge working okay?', line_ko: '좋은 아침! 출입증은 잘 돼요?' },
      { line: "If you need anything, I'm right here.", line_ko: '필요한 게 있으면 여기 있을게요.' },
      { line: "There's cake in the kitchen. Somebody's birthday, I think.", line_ko: '탕비실에 케이크 있어요. 누구 생일인가 봐요.' },
      { line: 'Heads-up: the elevator on the right is acting up again.', line_ko: '참고로, 오른쪽 엘리베이터가 또 말썽이에요.' }
    ],
    schedule: [
      { days: 'weekday', time_from: '07:45', time_to: '17:30', place: 'office_lobby' }
    ]
  },
  {
    id: 'tyler',
    name: 'Tyler',
    name_ko: '타일러',
    role: 'Weekend cashier at Fairview Market',
    role_ko: '페어뷰 마켓 주말 계산원',
    model: 'man-hoodie-2',
    place: 'market_checkout',
    voice_pitch: 1.05,
    voice_rate: 1.02,
    voice_like: 'Ryan|Kai|Steffan|Roger',
    bio: 'High school senior who works weekend mornings and two weeknights. Saving up for a car.',
    bio_ko: '주말 아침과 평일 저녁 이틀을 일하는 고등학교 3학년입니다. 차를 사려고 돈을 모읍니다.',
    chatter: [
      { line: 'Hey. Did you find everything okay?', line_ko: '안녕하세요. 찾으시는 건 다 찾으셨어요?' },
      { line: 'Weekends are busy. Everybody shops for the week.', line_ko: '주말은 바빠요. 다들 일주일 치 장을 보거든요.' },
      { line: "Mike usually has the evenings. I cover when he's off.", line_ko: '저녁은 보통 마이크가 맡아요. 그가 쉴 때 제가 봐요.' },
      {
        line: "I'm saving up for a car. Two more months of Saturdays.",
        line_ko: '차 사려고 돈 모으는 중이에요. 토요일 두 달만 더 일하면 돼요.'
      }
    ],
    schedule: [
      { days: 'sat,sun', time_from: '07:00', time_to: '15:00', place: 'market_checkout' },
      { days: 'mon,tue', time_from: '15:00', time_to: '22:00', place: 'market_checkout' }
    ]
  }
];

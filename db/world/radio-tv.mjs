// The radio at home (KFVW: the parts besides the time, the date and the weather) and the TV channels.

export const radio = [
  {
    id: 'r01_bike',
    day: 1,
    text: 'The Fairview City Council meets tonight to vote on new bike lanes for Maple Street. Some store owners worry about losing parking spaces. The meeting starts at 7 at City Hall and is open to the public.',
    text_ko: '페어뷰 시의회가 오늘 밤 메이플 스트리트 자전거 도로 신설을 표결합니다. 일부 상인들은 주차 공간이 줄어들까 걱정합니다. 회의는 7시 시청에서 열리며 누구나 참석할 수 있습니다. (open to the public: 일반인에게 공개된)',
    sort: 1
  },
  {
    id: 'r02_bike',
    day: 2,
    text: 'The City Council voted five to two last night to add bike lanes on Maple Street. Work begins in the spring. The council also agreed to keep the metered parking on one side of the street.',
    text_ko: '시의회는 어젯밤 5대 2로 메이플 스트리트 자전거 도로 신설을 가결했습니다. 공사는 봄에 시작합니다. 거리 한쪽의 유료 주차는 그대로 두기로 했습니다. (voted five to two: 5대 2로 가결, metered parking: 미터기 유료 주차)',
    sort: 1
  },
  {
    id: 'r03_library',
    day: 3,
    kind: 'community',
    text: 'The Fairview Public Library is looking for volunteers to read to kids on Saturday mornings. No experience needed. Just sign up at the front desk.',
    text_ko: '페어뷰 공공도서관이 토요일 오전에 아이들에게 책을 읽어 줄 자원봉사자를 찾습니다. 경험은 필요 없습니다. 안내 데스크에서 신청하세요. (sign up: 신청하다)',
    sort: 1
  },
  {
    id: 'r04_pier',
    day: 4,
    text: 'Repairs on the old fishing pier are finally done. The pier reopens to the public this Saturday, after being closed for almost a year.',
    text_ko: '낡은 낚시 부두 보수 공사가 드디어 끝났습니다. 거의 1년 동안 닫혀 있던 부두가 이번 토요일에 다시 개방됩니다. (reopen: 다시 문을 열다)',
    sort: 1
  },
  {
    id: 'r05_game',
    day: 5,
    kind: 'sports',
    text: 'Friday night football: the Fairview High Pelicans play at home against Bay City tonight. Kickoff is at 7. Tickets are five dollars at the gate.',
    text_ko: '금요일 밤 미식축구: 페어뷰 고교 펠리컨스가 오늘 밤 홈에서 베이 시티와 경기합니다. 킥오프는 7시, 입장권은 입구에서 5달러입니다. (kickoff: 경기 시작, at the gate: 입구에서)',
    sort: 1
  },
  {
    id: 'r06_market',
    day: 6,
    kind: 'community',
    text: 'The farmers market is on today until 1 PM in the parking lot behind City Hall. Look for the first apples of the season and pumpkins for Halloween.',
    text_ko: '파머스 마켓이 오늘 오후 1시까지 시청 뒤 주차장에서 열립니다. 이번 철 첫 사과와 핼러윈 호박을 찾아보세요. (farmers market: 농산물 직거래 장터)',
    sort: 1
  },
  {
    id: 'r06_score',
    day: 6,
    kind: 'sports',
    text: 'Last night the Pelicans beat Bay City twenty-four to seventeen. That makes them four and one this season.',
    text_ko: '어젯밤 펠리컨스가 베이 시티를 24대 17로 이겼습니다. 이번 시즌 4승 1패가 되었습니다. (four and one: 4승 1패)',
    sort: 2
  },
  {
    id: 'r07_cleanup',
    day: 7,
    kind: 'community',
    text: 'Volunteers are cleaning up Fairview Beach this morning from 9 to noon. Gloves and bags are provided. Meet at the lifeguard tower.',
    text_ko: '오늘 오전 9시부터 정오까지 자원봉사자들이 페어뷰 해변을 청소합니다. 장갑과 봉투는 나눠 드립니다. 인명 구조대 망루에서 모이세요. (provided: 제공되는)',
    sort: 1
  },
  {
    id: 'r08_holiday',
    day: 8,
    text: 'City offices, the post office and the banks are closed today for the holiday. Trash pickup is one day late this week, and buses run on the weekend schedule.',
    text_ko: '오늘은 공휴일이라 시청, 우체국, 은행이 쉽니다. 이번 주 쓰레기 수거는 하루 늦어지고, 버스는 주말 시간표로 운행합니다. (one day late: 하루 늦게)',
    sort: 1
  },
  {
    id: 'r09_school',
    day: 9,
    text: 'The school board wants to start the high school day thirty minutes later next year, so students can get more sleep. Parents can share their thoughts online until the end of the month.',
    text_ko: '교육위원회가 학생들이 더 잘 수 있도록 내년에 고등학교 등교 시간을 30분 늦추려고 합니다. 학부모는 이달 말까지 온라인으로 의견을 낼 수 있습니다. (school board: 교육위원회)',
    sort: 1
  },
  {
    id: 'r10_power',
    day: 10,
    text: 'Fairview Power says a planned outage will affect about two hundred homes near Ocean Avenue on Thursday from 10 AM to 2 PM, while crews replace old power lines.',
    text_ko: '페어뷰 전력은 목요일 오전 10시부터 오후 2시까지 오션 애비뉴 근처 약 200가구에 계획 정전이 있다고 밝혔습니다. 노후 전선 교체 작업 때문입니다. (planned outage: 계획 정전, crews: 작업반)',
    sort: 1
  },
  {
    id: 'r11_flu',
    day: 11,
    kind: 'community',
    text: 'Free flu shots are available at the Fairview Community Center this Saturday from 10 to 3. No appointment is needed, but bring your insurance card if you have one.',
    text_ko: '이번 토요일 10시부터 3시까지 페어뷰 커뮤니티 센터에서 무료 독감 예방 주사를 맞을 수 있습니다. 예약은 필요 없지만 보험 카드가 있으면 가져오세요. (flu shot: 독감 예방 주사)',
    sort: 1
  },
  {
    id: 'r12_game',
    day: 12,
    kind: 'sports',
    text: "The Pelicans are on the road tonight at Harbor Point. If you can't make the drive, the game is live right here on 88.5, starting at 6:45.",
    text_ko: '펠리컨스가 오늘 밤 하버 포인트 원정 경기를 합니다. 못 가신다면 6시 45분부터 여기 88.5에서 생중계합니다. (on the road: 원정 중, live: 생중계)',
    sort: 1
  },
  {
    id: 'r13_pumpkin',
    day: 13,
    kind: 'community',
    text: 'The pumpkin patch at Miller Farm is open this weekend, with a corn maze and hayrides for the kids. It gets busy after noon, so go early.',
    text_ko: '밀러 농장의 호박밭이 이번 주말에 열립니다. 옥수수 미로와 아이들을 위한 건초 마차도 있습니다. 정오가 지나면 붐비니 일찍 가세요. (corn maze: 옥수수 미로, hayride: 건초 마차 타기)',
    sort: 1
  },
  {
    id: 'r14_storm',
    day: 14,
    text: 'The first real storm of the season is here. Public Works reminds everyone to clear the leaves from storm drains in front of their homes, to keep the streets from flooding.',
    text_ko: '이번 철 첫 폭풍우가 왔습니다. 공공사업국은 거리가 잠기지 않도록 집 앞 빗물 배수구의 낙엽을 치워 달라고 당부합니다. (storm drain: 빗물 배수구, flooding: 침수)',
    sort: 1
  },
  {
    id: 'r15_rent',
    day: 15,
    text: 'A new report says rents in Fairview went up six percent this year. The city is planning more affordable housing near the bus station.',
    text_ko: '새 보고서에 따르면 올해 페어뷰 월세가 6% 올랐습니다. 시는 버스 정류장 근처에 서민 주택을 더 지을 계획입니다. (affordable housing: 저렴한 공공·서민 주택)',
    sort: 1
  },
  {
    id: 'r16_coffee',
    day: 16,
    kind: 'community',
    text: 'A new bakery opens on Maple Street this morning. The first fifty customers get a free cup of coffee.',
    text_ko: '오늘 아침 메이플 스트리트에 새 빵집이 문을 엽니다. 선착순 50명에게 커피 한 잔을 무료로 드립니다. (the first fifty customers: 선착순 50명)',
    sort: 1
  },
  {
    id: 'r17_run',
    day: 17,
    kind: 'community',
    text: 'The Fairview Fun Run is next Saturday. The 5K goes around the Fairview Loop and raises money for the animal shelter. You can still sign up online.',
    text_ko: '페어뷰 펀 런이 다음 주 토요일에 열립니다. 5킬로미터 코스로 페어뷰 루프를 돌며 동물 보호소 기금을 모읍니다. 아직 온라인으로 신청할 수 있습니다. (5K: 5킬로미터 달리기, animal shelter: 동물 보호소)',
    sort: 1
  },
  {
    id: 'r18_detour',
    day: 18,
    text: 'Heads up, drivers: Ocean Avenue is closed between First and Third Street through Friday for repaving. Follow the detour signs.',
    text_ko: '운전자 여러분 주의하세요: 오션 애비뉴 1번가와 3번가 사이가 금요일까지 도로 재포장으로 막힙니다. 우회로 표지판을 따라가세요. (heads up: 주의하세요, detour: 우회로)',
    sort: 1
  },
  {
    id: 'r19_vote',
    day: 19,
    text: "Election Day is less than two weeks away. Mail-in ballots are going out this week. If yours doesn't arrive by the end of the month, call the county elections office.",
    text_ko: '선거일이 2주도 안 남았습니다. 우편 투표용지가 이번 주에 발송됩니다. 이달 말까지 오지 않으면 카운티 선거 사무소에 전화하세요. (mail-in ballot: 우편 투표용지)',
    sort: 1
  },
  {
    id: 'r20_trick',
    day: 20,
    kind: 'community',
    text: 'Downtown stores are handing out candy on Halloween from 3 to 5 PM. Kids in costume are welcome, and so are their parents.',
    text_ko: '핼러윈에 오후 3시부터 5시까지 시내 상점들이 사탕을 나눠 줍니다. 분장한 아이들도, 부모님도 환영합니다. (hand out: 나눠 주다, in costume: 분장한)',
    sort: 1
  },
  {
    id: 'r21_fog',
    day: 21,
    text: 'Dense fog this morning at the airport. Some early flights are delayed. Check with your airline before you head out.',
    text_ko: '오늘 아침 공항에 짙은 안개가 꼈습니다. 이른 항공편 일부가 지연되고 있습니다. 출발 전에 항공사에 확인하세요. (delayed: 지연된, head out: 나서다)',
    sort: 1
  },
  {
    id: 'ra_auto',
    kind: 'ad',
    text: 'Is that check engine light on again? Bring your car to Coastline Auto Repair. Honest prices, and your oil change is done while you wait.',
    text_ko: '엔진 점검등이 또 켜졌나요? 코스트라인 자동차 정비소로 오세요. 정직한 가격, 엔진오일 교환은 기다리시는 동안 끝납니다. (check engine light: 엔진 점검 경고등)',
    sort: 2
  },
  {
    id: 'ra_bank',
    kind: 'ad',
    text: 'Fairview Credit Union: no monthly fees on checking, and free ATMs all over town. Stop by any branch to open an account.',
    text_ko: '페어뷰 신용협동조합: 입출금 계좌 월 수수료 없음, 시내 곳곳 무료 ATM. 가까운 지점에 들러 계좌를 여세요. (checking: 입출금 계좌, branch: 지점)',
    sort: 4
  },
  {
    id: 'ra_diner',
    kind: 'ad',
    text: 'Hungry? Maple Street Diner serves breakfast all day. Pancakes, eggs any style, and the best coffee refills in town.',
    text_ko: '배고프세요? 메이플 스트리트 다이너는 하루 종일 아침 메뉴를 팝니다. 팬케이크, 원하는 대로 익힌 달걀, 시내 최고의 커피 리필. (eggs any style: 원하는 방식으로 조리한 달걀, refill: 리필)',
    sort: 3
  },
  {
    id: 'ra_market',
    kind: 'ad',
    text: 'This week at Fairview Market: strawberries are buy one, get one free. Fairview Market, fresh food, friendly neighbors.',
    text_ko: '이번 주 페어뷰 마켓: 딸기 하나 사면 하나 더. 신선한 음식, 친절한 이웃, 페어뷰 마켓. (buy one, get one free: 1+1)',
    sort: 1
  },
  {
    id: 'rn_blood',
    kind: 'community',
    text: 'The Red Cross blood drive is at the Community Center this week. Walk-ins are welcome, and every donor gets a free T-shirt.',
    text_ko: '이번 주 커뮤니티 센터에서 적십자 헌혈 행사가 열립니다. 예약 없이 와도 되고, 헌혈하신 분은 모두 티셔츠를 받습니다. (blood drive: 헌혈 행사, walk-in: 예약 없이 온 사람)',
    sort: 4
  },
  {
    id: 'rn_bus',
    text: 'Fairview Transit is adding a later bus on weekdays next month. Riders have asked for it for years.',
    text_ko: '페어뷰 교통공사가 다음 달부터 평일 막차를 늦춥니다. 승객들이 몇 년 동안 요청해 온 일입니다. (rider: 승객)',
    sort: 3
  },
  {
    id: 'rn_dog',
    kind: 'community',
    text: 'Lost dog: a small brown terrier named Biscuit, last seen near the park on Maple Street. If you see him, call the animal shelter.',
    text_ko: '개를 찾습니다: 비스킷이라는 작은 갈색 테리어로, 메이플 스트리트 공원 근처에서 마지막으로 보였습니다. 보시면 동물 보호소에 전화 주세요. (last seen: 마지막으로 목격된)',
    sort: 1
  },
  {
    id: 'rn_library',
    kind: 'community',
    text: 'The library now lends more than books: you can borrow a telescope, a sewing machine or a cake pan with your library card.',
    text_ko: '도서관은 이제 책만 빌려주는 게 아닙니다. 도서관 카드로 망원경, 재봉틀, 케이크 틀도 빌릴 수 있습니다. (lend: 빌려주다, borrow: 빌리다)',
    sort: 6
  },
  {
    id: 'rn_potholes',
    text: 'The city asks drivers to report potholes on the Fairview 311 app. Crews say they fix most of them within a week.',
    text_ko: '시는 운전자들에게 페어뷰 311 앱으로 도로 파임을 신고해 달라고 요청합니다. 작업반은 대부분 일주일 안에 고친다고 합니다. (pothole: 도로의 움푹 팬 곳, 311: 민원 전화·앱)',
    sort: 2
  },
  {
    id: 'rn_soccer',
    kind: 'sports',
    text: 'In youth soccer, registration for the spring season is open. Games are Saturday mornings at Fairview Park.',
    text_ko: '유소년 축구 봄 시즌 등록이 시작되었습니다. 경기는 토요일 오전 페어뷰 공원에서 열립니다. (registration: 등록)',
    sort: 5
  },
  {
    id: 'rt_bridge',
    kind: 'traffic',
    text: 'Traffic check: the Harbor Bridge is slow going into downtown, about fifteen minutes from end to end. Route 9 is moving well.',
    text_ko: '교통 정보: 하버 브리지는 시내 방향이 느려서 끝에서 끝까지 15분쯤 걸립니다. 9번 도로는 잘 뚫려 있습니다. (moving well: 소통이 원활한)',
    sort: 1
  },
  {
    id: 'rt_bus',
    kind: 'traffic',
    text: 'Fairview Transit reminds riders that the Number 12 runs every twenty minutes on weekdays and every half hour on weekends. You can see where your bus is on the Fairview Transit app.',
    text_ko: '페어뷰 교통공사 안내입니다. 12번 버스는 평일에는 20분, 주말에는 30분 간격으로 다닙니다. 버스가 어디쯤 오는지는 페어뷰 교통공사 앱에서 볼 수 있습니다.',
    sort: 3
  },
  {
    id: 'rt_clear',
    kind: 'traffic',
    text: 'Good news on the roads: no accidents to report, and traffic is moving at the speed limit on all the main roads.',
    text_ko: '도로 소식은 좋습니다. 사고 소식은 없고, 주요 도로 모두 제한 속도로 달리고 있습니다. (speed limit: 제한 속도)',
    sort: 4
  },
  {
    id: 'rt_crash',
    kind: 'traffic',
    text: 'A minor fender bender on Ocean Avenue at Second Street is blocking the right lane. Expect delays, or take Maple Street instead.',
    text_ko: '오션 애비뉴와 2번가 교차로에서 가벼운 접촉 사고로 오른쪽 차선이 막혀 있습니다. 지체가 예상되니 메이플 스트리트로 돌아가세요. (fender bender: 가벼운 접촉 사고)',
    sort: 2
  },
  {
    id: 'rt_school',
    kind: 'traffic',
    text: 'Drivers, slow down near Fairview Elementary: the school zone speed limit is twenty-five miles an hour when children are present.',
    text_ko: '운전자 여러분, 페어뷰 초등학교 근처에서는 속도를 줄이세요. 어린이가 있을 때 스쿨존 제한 속도는 시속 25마일입니다. (school zone: 어린이 보호 구역)',
    sort: 5
  },
  {
    id: 'rt_signal',
    kind: 'traffic',
    text: 'The traffic lights at Maple and Ocean are working again. Thanks for your patience, and remember to use the crosswalks.',
    text_ko: '메이플과 오션 교차로 신호등이 다시 작동합니다. 기다려 주셔서 감사하고, 횡단보도를 이용하세요. (patience: 인내, 기다려 줌)',
    sort: 6
  }
];

export const tv = [
  {
    id: 'abc',
    name: 'ABC News',
    channel: 'UCBi2mrWuNuyYy4gbM6fU18Q',
    live: 1,
    note: 'ABC News Live streams around the clock.',
    note_ko: 'ABC News Live는 24시간 생방송합니다.',
    sort: 1
  },
  {
    id: 'ap',
    name: 'Associated Press',
    channel: 'UC52X5wxOL_s5yw0dQk7NtgA',
    note: 'Short news clips from the AP newsroom.',
    note_ko: 'AP 통신의 짧은 뉴스 영상.',
    sort: 5
  },
  {
    id: 'bloomberg',
    name: 'Bloomberg TV',
    channel: 'UCIALMKvObZNtJ6AmdCLP7Lg',
    live: 1,
    note: 'Business and market news, live on weekdays.',
    note_ko: '경제·시장 뉴스, 평일 생방송.',
    sort: 6
  },
  {
    id: 'bloombergtech',
    name: 'Bloomberg Tech',
    kind: 'tech',
    channel: 'UCrM7B7SL_g1edFOnmj-SDKg',
    note: 'The business of big tech.',
    note_ko: '빅테크의 비즈니스 소식.',
    sort: 13
  },
  {
    id: 'cbs',
    name: 'CBS News',
    channel: 'UC8p1vwvWtl6T73JiExfWs1g',
    live: 1,
    note: 'CBS News 24/7: national and local stories.',
    note_ko: 'CBS News 24/7: 전국·지역 소식.',
    sort: 3
  },
  {
    id: 'cnbc',
    name: 'CNBC Television',
    channel: 'UCrp_UI8XtuYfpiqluWLD7Lw',
    note: 'Business news and interviews.',
    note_ko: '경제 뉴스와 인터뷰.',
    sort: 7
  },
  {
    id: 'cnet',
    name: 'CNET',
    kind: 'tech',
    channel: 'UCOmcA3f_RrH6b9NmcNa4tdg',
    note: 'Phones, laptops and product launches.',
    note_ko: '휴대폰, 노트북, 신제품 발표.',
    sort: 14
  },
  {
    id: 'fireship',
    name: 'Fireship',
    kind: 'tech',
    channel: 'UCsBjURrPoezykLs9EqgamOA',
    note: 'Fast developer news (The Code Report): the words you hear at work.',
    note_ko: '빠른 개발자 뉴스(The Code Report). 회사에서 듣는 말들.',
    sort: 15
  },
  {
    id: 'ltt',
    name: 'Linus Tech Tips',
    kind: 'tech',
    channel: 'UCXuqSBlHAE6Xw-yeJA0Tunw',
    note: 'PC hardware and tech talk.',
    note_ko: 'PC 하드웨어와 IT 이야기.',
    sort: 16
  },
  {
    id: 'nbc',
    name: 'NBC News',
    channel: 'UCeY0bbntWzzVIaj2z3QigXg',
    live: 1,
    note: 'NBC News NOW: live news all day.',
    note_ko: 'NBC News NOW: 하루 종일 생방송 뉴스.',
    sort: 2
  },
  {
    id: 'pbs',
    name: 'PBS NewsHour',
    channel: 'UC6ZFN9Tx6xh-skXCuRHCDpQ',
    live: 1,
    note: "Public television's evening news: calm and clear, good for listening practice.",
    note_ko: '공영 방송 저녁 뉴스. 차분하고 또렷해서 듣기 연습에 좋아요.',
    sort: 4
  },
  {
    id: 'techcrunch',
    name: 'TechCrunch',
    kind: 'tech',
    channel: 'UCCjyq_K1Xwfg8Lndy7lKMpA',
    note: 'Startups, funding and the tech industry.',
    note_ko: '스타트업, 투자, IT 업계 소식.',
    sort: 12
  },
  {
    id: 'verge',
    name: 'The Verge',
    kind: 'tech',
    channel: 'UCddiUEpeqJcYeBxX1IVBKvQ',
    note: 'Gadget reviews and tech news.',
    note_ko: '기기 리뷰와 IT 소식.',
    sort: 11
  }
];

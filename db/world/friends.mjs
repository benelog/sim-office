// What coworkers say and do as you get closer (config friend_*).

export const friends = [
  {
    id: 'f_derek_coffee_1',
    npc: 'derek',
    kind: 'coffee',
    need: 45,
    line: "Coffee run. I got you the usual. Don't say I never did anything for you.",
    line_ko: '커피 사 왔어요. 늘 마시던 걸로요. 제가 해 준 게 없다는 말은 하기 없기예요.',
    sort: 200
  },
  {
    id: 'f_derek_cover_1',
    npc: 'derek',
    kind: 'cover',
    need: 70,
    line: "You weren't at {meeting}, so I gave your update for you. I knew what you were on. Notes are in the team doc.",
    line_ko: '{meeting}에 안 와서 제가 대신 진행 상황을 말해 뒀어요. 뭐 하고 있는지 알고 있었거든요. 메모는 팀 문서에 있어요.',
    sort: 220
  },
  {
    id: 'f_derek_diner_1',
    npc: 'derek',
    kind: 'diner',
    need: 45,
    line: "My mom keeps asking who I'm bringing to Thanksgiving. I tell her the dashboard is my plus-one.",
    line_ko: '엄마가 추수감사절에 누구를 데려오냐고 자꾸 물어봐요. 대시보드가 제 동반자라고 해요.',
    sort: 160
  },
  {
    id: 'f_derek_diner_2',
    npc: 'derek',
    kind: 'diner',
    need: 45,
    line: 'The burger here is the best in Fairview, and I will defend that like a code review.',
    line_ko: '여기 버거가 페어뷰 최고예요. 코드 리뷰에서처럼 끝까지 우길 수 있어요.',
    sort: 170
  },
  {
    id: 'f_derek_invite_1',
    npc: 'derek',
    kind: 'invite',
    need: 45,
    line: "Diner for lunch? I'm craving their cheeseburger. I'll grab a booth at {time}.",
    line_ko: '점심은 다이너 어때요? 거기 치즈버거가 너무 당겨요. {time}에 부스 잡아 둘게요.',
    sort: 180
  },
  {
    id: 'f_derek_lunch_1',
    npc: 'derek',
    kind: 'lunch',
    line: "Pro tip: the leftover pizza from the all-hands is fair game after two o'clock. Before that, people get territorial.",
    line_ko: '꿀팁: 전사 회의 끝나고 남은 피자는 두 시가 넘으면 아무나 먹어도 돼요. 그 전엔 다들 자기 거라고 지켜요.',
    sort: 130
  },
  {
    id: 'f_derek_lunch_2',
    npc: 'derek',
    kind: 'lunch',
    line: 'I spent all Saturday fixing my sprinkler system. Owning a house is ninety percent fixing things.',
    line_ko: '토요일 내내 스프링클러를 고쳤어요. 집을 갖는다는 건 90%가 뭔가를 고치는 일이에요.',
    sort: 140
  },
  {
    id: 'f_derek_lunch_3',
    npc: 'derek',
    kind: 'lunch',
    need: 20,
    line: 'When I started here, I broke production on my second day. Everybody survived, and they still let me merge code.',
    line_ko: '저는 여기 와서 둘째 날에 운영 서버를 망가뜨렸어요. 다들 무사했고, 저는 지금도 코드를 머지하고 있어요.',
    sort: 150
  },
  {
    id: 'f_derek_noshow_1',
    npc: 'derek',
    kind: 'noshow',
    line: 'Ate my burger solo. No worries, I figured you got stuck in something.',
    line_ko: '버거는 혼자 먹었어요. 괜찮아요, 뭔가에 붙잡혔겠거니 했어요.',
    sort: 190
  },
  {
    id: 'f_derek_text_1',
    npc: 'derek',
    kind: 'text',
    need: 45,
    line: "My team lost in overtime. I'm not okay. Anyway, hope your weekend is going better than mine.",
    line_ko: '응원하는 팀이 연장전에서 졌어요. 멘탈이 나갔어요. 아무튼 주말은 저보다 잘 보내고 있길 바라요.',
    sort: 230
  },
  {
    id: 'f_derek_text_2',
    npc: 'derek',
    kind: 'text',
    need: 45,
    line: 'Fixed the sprinkler. Broke the fence. Owning a house is a journey.',
    line_ko: '스프링클러는 고쳤어요. 대신 울타리가 부서졌어요. 집주인의 길은 멀고도 험해요.',
    sort: 240
  },
  {
    id: 'f_derek_text_3',
    npc: 'derek',
    kind: 'text',
    need: 45,
    line: 'Found a taco truck parked by the river this morning. Life-changing carnitas. Just thought you should know.',
    line_ko: '오늘 아침에 강가에 서 있는 타코 트럭을 발견했어요. 카르니타스가 인생 맛이에요. 알려 주고 싶었어요.',
    sort: 250
  },
  {
    id: 'f_derek_umbrella_1',
    npc: 'derek',
    kind: 'umbrella',
    need: 45,
    line: "You're not walking home in that. I keep a spare umbrella under my desk. Take it.",
    line_ko: '그 비를 맞고 집에 갈 순 없죠. 책상 밑에 여분 우산이 있어요. 가져가요.',
    sort: 210
  },
  {
    id: 'f_jun_coffee_1',
    npc: 'jun',
    kind: 'coffee',
    need: 45,
    line: 'I got you a coffee! I hope I remembered your order right.',
    line_ko: '커피 사 왔어요! 주문을 제대로 기억했으면 좋겠네요.',
    sort: 460
  },
  {
    id: 'f_jun_cover_1',
    npc: 'jun',
    kind: 'cover',
    need: 70,
    line: "You weren't at {meeting}, so I told the team what you've been working on. I hope I got it right!",
    line_ko: '{meeting}에 안 와서 하고 있는 일을 제가 팀에 말해 뒀어요. 맞게 말했으면 좋겠어요!',
    sort: 480
  },
  {
    id: 'f_jun_diner_1',
    npc: 'jun',
    kind: 'diner',
    need: 45,
    line: "My mom video-calls every Sunday and asks if I'm eating well. I'm going to show her this pie.",
    line_ko: '엄마가 일요일마다 영상 통화로 밥은 잘 먹냐고 물어요. 이 파이를 보여 드려야겠어요.',
    sort: 420
  },
  {
    id: 'f_jun_diner_2',
    npc: 'jun',
    kind: 'diner',
    need: 45,
    line: "When I got here, I didn't know anyone. Now I have people to eat lunch with. That means a lot.",
    line_ko: '처음 왔을 땐 아는 사람이 없었어요. 이제 같이 점심 먹을 사람들이 있어요. 그게 저한텐 커요.',
    sort: 430
  },
  {
    id: 'f_jun_invite_1',
    npc: 'jun',
    kind: 'invite',
    need: 45,
    line: "Would you like to have lunch at the Sunny Side Diner? I'll be there at {time}. I want to try their pie.",
    line_ko: '서니 사이드 다이너에서 점심 같이 할래요? {time}에 거기 있을게요. 파이를 먹어 보고 싶어요.',
    sort: 440
  },
  {
    id: 'f_jun_lunch_1',
    npc: 'jun',
    kind: 'lunch',
    line: "I'm still getting used to how big the portions are here. Half my burrito is dinner.",
    line_ko: '여기 음식 양에 아직 적응 중이에요. 부리토 반은 저녁밥이 돼요.',
    sort: 390
  },
  {
    id: 'f_jun_lunch_2',
    npc: 'jun',
    kind: 'lunch',
    line: "I opened a bank account last week. It took three tries to explain that I don't have a credit history yet.",
    line_ko: '지난주에 은행 계좌를 만들었어요. 아직 신용 기록이 없다는 걸 설명하는 데 세 번이나 걸렸어요.',
    sort: 400
  },
  {
    id: 'f_jun_lunch_3',
    npc: 'jun',
    kind: 'lunch',
    need: 20,
    line: 'Thanks for always answering my questions. Some days I feel like I ask a hundred.',
    line_ko: '늘 질문에 답해 줘서 고마워요. 어떤 날은 백 개는 묻는 것 같아요.',
    sort: 410
  },
  {
    id: 'f_jun_noshow_1',
    npc: 'jun',
    kind: 'noshow',
    line: "I saved you a seat, but I guess you were busy. It's okay! The pie was good.",
    line_ko: '자리를 맡아 뒀는데 바빴나 봐요. 괜찮아요! 파이 맛있었어요.',
    sort: 450
  },
  {
    id: 'f_jun_text_1',
    npc: 'jun',
    kind: 'text',
    need: 45,
    line: "I cooked Korean food for the first time here. The market didn't have gochujang, so it was... creative.",
    line_ko: '여기 와서 처음으로 한식을 해 먹었어요. 마켓에 고추장이 없어서 좀… 창의적인 맛이었어요.',
    sort: 490
  },
  {
    id: 'f_jun_text_2',
    npc: 'jun',
    kind: 'text',
    need: 45,
    line: "I walked along the beach today. I still can't believe I live by the ocean now.",
    line_ko: '오늘 해변을 따라 걸었어요. 이제 바닷가에 산다는 게 아직도 안 믿겨요.',
    sort: 500
  },
  {
    id: 'f_jun_text_3',
    npc: 'jun',
    kind: 'text',
    need: 45,
    line: 'Learned a new word in the laundry room today: "lint trap." My dryer is much happier now.',
    line_ko: '오늘 세탁실에서 새 단어를 배웠어요. "lint trap", 보풀 필터래요. 건조기가 훨씬 잘 돌아가요.',
    sort: 510
  },
  {
    id: 'f_jun_umbrella_1',
    npc: 'jun',
    kind: 'umbrella',
    need: 45,
    line: 'Please take my umbrella. I live close, and I can run home.',
    line_ko: '제 우산 가져가세요. 저는 집이 가까워서 뛰어가면 돼요.',
    sort: 470
  },
  {
    id: 'f_linda_coffee_1',
    npc: 'linda',
    kind: 'coffee',
    need: 45,
    line: "I brought you a coffee. Don't tell the others, or I'll have to bring twelve.",
    line_ko: '커피 가져왔어요. 다른 사람들한텐 비밀이에요. 안 그러면 열두 잔을 사 와야 하거든요.',
    sort: 720
  },
  {
    id: 'f_linda_cover_1',
    npc: 'linda',
    kind: 'cover',
    need: 70,
    line: "You missed {meeting}. I saved the slides for you and let your manager know you'd catch up.",
    line_ko: '{meeting}에 빠졌네요. 슬라이드를 챙겨 뒀고, 매니저에게는 나중에 따로 확인할 거라고 말해 뒀어요.',
    sort: 740
  },
  {
    id: 'f_linda_diner_1',
    npc: 'linda',
    kind: 'diner',
    need: 45,
    line: "I've been here nine years. I watched this company grow from twelve people. It still feels like a family.",
    line_ko: '여기 온 지 9년 됐어요. 이 회사가 열두 명일 때부터 크는 걸 봤죠. 아직도 가족 같아요.',
    sort: 680
  },
  {
    id: 'f_linda_diner_2',
    npc: 'linda',
    kind: 'diner',
    need: 45,
    line: "You've settled in well. I can tell, because people mention you in a good way.",
    line_ko: '잘 적응했네요. 사람들이 좋게 얘기하는 걸 들으면 알 수 있어요.',
    sort: 690
  },
  {
    id: 'f_linda_invite_1',
    npc: 'linda',
    kind: 'invite',
    need: 45,
    line: "Care to join me for lunch? I'll be at the Sunny Side Diner at {time}. I hear the soup is good today.",
    line_ko: '점심 같이 할래요? {time}에 서니 사이드 다이너에 있을게요. 오늘 수프가 맛있대요.',
    sort: 700
  },
  {
    id: 'f_linda_lunch_1',
    npc: 'linda',
    kind: 'lunch',
    line: "Little HR secret: you can change your tax withholding any time, not just when you start. A lot of people don't know that.",
    line_ko: '인사팀의 작은 비밀: 원천징수 설정은 입사할 때만이 아니라 아무 때나 바꿀 수 있어요. 모르는 사람이 많아요.',
    sort: 650
  },
  {
    id: 'f_linda_lunch_2',
    npc: 'linda',
    kind: 'lunch',
    line: "My garden gave me so many tomatoes this year that I started leaving them on people's desks.",
    line_ko: '올해 텃밭에서 토마토가 너무 많이 나서 사람들 책상에 두고 다니기 시작했어요.',
    sort: 660
  },
  {
    id: 'f_linda_lunch_3',
    npc: 'linda',
    kind: 'lunch',
    need: 20,
    line: "People think HR is all about rules. Mostly it's about listening. The rules are the easy part.",
    line_ko: '사람들은 인사팀이 규칙만 다룬다고 생각해요. 대부분은 들어 주는 일이에요. 규칙은 쉬운 부분이고요.',
    sort: 670
  },
  {
    id: 'f_linda_noshow_1',
    npc: 'linda',
    kind: 'noshow',
    line: "Sorry I missed you at lunch. If something's going on, my door is always open.",
    line_ko: '점심때 못 만나서 아쉬웠어요. 무슨 일 있으면 제 방 문은 늘 열려 있어요.',
    sort: 710
  },
  {
    id: 'f_linda_text_1',
    npc: 'linda',
    kind: 'text',
    need: 45,
    line: 'The tomatoes finally stopped. My kitchen will smell like pasta sauce all week.',
    line_ko: '토마토가 드디어 끝났어요. 이번 주 내내 부엌에서 파스타 소스 냄새가 날 거예요.',
    sort: 750
  },
  {
    id: 'f_linda_text_2',
    npc: 'linda',
    kind: 'text',
    need: 45,
    line: 'Took my nephew to the aquarium. He knew the name of every fish. I knew none.',
    line_ko: '조카를 데리고 수족관에 갔어요. 조카는 물고기 이름을 다 알고, 저는 하나도 몰랐어요.',
    sort: 760
  },
  {
    id: 'f_linda_text_3',
    npc: 'linda',
    kind: 'text',
    need: 45,
    line: "A quiet weekend with a book and a pot of tea. Hope you're getting some rest too.",
    line_ko: '책이랑 차 한 주전자로 조용한 주말을 보내고 있어요. 잘 쉬고 있길 바라요.',
    sort: 770
  },
  {
    id: 'f_linda_umbrella_1',
    npc: 'linda',
    kind: 'umbrella',
    need: 45,
    line: "Here, take my umbrella. I drove in today, so I won't need it.",
    line_ko: '자, 제 우산 가져가요. 오늘은 차를 갖고 와서 필요 없어요.',
    sort: 730
  },
  {
    id: 'f_maya_coffee_1',
    npc: 'maya',
    kind: 'coffee',
    need: 45,
    line: "I walked past the coffee cart and got an extra one. It's yours if you want it.",
    line_ko: '커피 카트 지나다가 한 잔 더 샀어요. 괜찮으면 마셔요.',
    sort: 80
  },
  {
    id: 'f_maya_diner_1',
    npc: 'maya',
    kind: 'diner',
    need: 45,
    line: 'I grew up two hours from here, in a town with one stoplight. Fairview still feels like a big city to me.',
    line_ko: '저는 여기서 두 시간 떨어진, 신호등이 하나뿐인 동네에서 자랐어요. 아직도 페어뷰가 대도시 같아요.',
    sort: 40
  },
  {
    id: 'f_maya_diner_2',
    npc: 'maya',
    kind: 'diner',
    need: 45,
    line: "I like hearing how things are going outside the sprint board. You're doing better than you think.",
    line_ko: '스프린트 보드 밖의 얘기를 듣는 게 좋아요. 생각보다 훨씬 잘하고 있어요.',
    sort: 50
  },
  {
    id: 'f_maya_invite_1',
    npc: 'maya',
    kind: 'invite',
    need: 45,
    line: "Want to get out of the office for lunch today? I'll be at the Sunny Side Diner at {time}, in a booth by the window.",
    line_ko: '오늘 점심은 사무실 밖에서 할래요? {time}에 서니 사이드 다이너 창가 부스에 있을게요.',
    sort: 60
  },
  {
    id: 'f_maya_lunch_1',
    npc: 'maya',
    kind: 'lunch',
    line: 'I try to eat lunch away from my desk at least twice a week. Otherwise the whole day blurs together.',
    line_ko: '일주일에 두 번은 꼭 자리에서 벗어나서 점심을 먹으려고 해요. 안 그러면 하루가 통째로 흐릿해지거든요.',
    sort: 10
  },
  {
    id: 'f_maya_lunch_2',
    npc: 'maya',
    kind: 'lunch',
    line: 'My first manager told me to write down what I did every Friday. It makes review time so much easier.',
    line_ko: '제 첫 매니저가 금요일마다 한 일을 적어 두라고 했어요. 그러면 평가 때가 훨씬 편해요.',
    sort: 20
  },
  {
    id: 'f_maya_lunch_3',
    npc: 'maya',
    kind: 'lunch',
    need: 20,
    line: 'Between us, the hardest part of managing is the calendar. I used to write code all day. Now I write agendas.',
    line_ko: '우리끼리 얘기지만, 매니저 일에서 제일 힘든 건 일정이에요. 예전엔 하루 종일 코드를 썼는데 이젠 회의 안건을 써요.',
    sort: 30
  },
  {
    id: 'f_maya_noshow_1',
    npc: 'maya',
    kind: 'noshow',
    line: 'Missed you at lunch. No problem at all, I know some days get busy.',
    line_ko: '점심때 못 봤네요. 괜찮아요, 바쁜 날도 있죠.',
    sort: 70
  },
  {
    id: 'f_maya_text_1',
    npc: 'maya',
    kind: 'text',
    need: 45,
    line: "Hope you're having a restful weekend. No work talk, I promise. I'm finally repotting my plants.",
    line_ko: '주말 잘 쉬고 있길 바라요. 일 얘기는 안 할게요. 저는 드디어 화분 분갈이를 하고 있어요.',
    sort: 100
  },
  {
    id: 'f_maya_text_2',
    npc: 'maya',
    kind: 'text',
    need: 45,
    line: 'Just tried the new bakery on Lake Avenue. The cinnamon rolls are dangerous.',
    line_ko: '레이크 애비뉴에 새로 생긴 빵집에 가 봤어요. 시나몬 롤이 위험할 정도로 맛있어요.',
    sort: 110
  },
  {
    id: 'f_maya_text_3',
    npc: 'maya',
    kind: 'text',
    need: 45,
    line: 'A note from your manager: actually rest this weekend. Laptop closed, phone on silent.',
    line_ko: '매니저로서 한마디: 이번 주말엔 진짜로 쉬어요. 노트북은 덮고, 휴대전화는 무음으로요.',
    sort: 120
  },
  {
    id: 'f_maya_umbrella_1',
    npc: 'maya',
    kind: 'umbrella',
    need: 45,
    line: "It's pouring out there. Take the spare umbrella from my office, and bring it back whenever.",
    line_ko: '밖에 비가 쏟아져요. 제 방에 있는 여분 우산 가져가요. 아무 때나 돌려주면 돼요.',
    sort: 90
  },
  {
    id: 'f_priya_coffee_1',
    npc: 'priya',
    kind: 'coffee',
    need: 45,
    line: "I ordered two lattes by mistake. Well, by \"mistake.\" One's for you.",
    line_ko: '라테를 실수로 두 잔 샀어요. 뭐, "실수"로요. 한 잔은 드릴게요.',
    sort: 330
  },
  {
    id: 'f_priya_cover_1',
    npc: 'priya',
    kind: 'cover',
    need: 70,
    line: "You missed {meeting}, so I shared where your work stands. Hope that's okay! Notes are in the doc.",
    line_ko: '{meeting}에 안 보여서 하던 일의 진행 상황은 제가 공유해 뒀어요. 괜찮죠? 메모는 문서에 있어요.',
    sort: 350
  },
  {
    id: 'f_priya_diner_1',
    npc: 'priya',
    kind: 'diner',
    need: 45,
    line: "My parents still don't really know what a product manager does. My mom tells people I'm \"in computers.\"",
    line_ko: '부모님은 아직도 프로덕트 매니저가 뭘 하는지 잘 몰라요. 엄마는 사람들한테 제가 "컴퓨터 쪽 일"을 한다고 해요.',
    sort: 290
  },
  {
    id: 'f_priya_diner_2',
    npc: 'priya',
    kind: 'diner',
    need: 45,
    line: 'I moved here for this job without knowing anyone. Lunches like this are why it feels like home now.',
    line_ko: '아는 사람 하나 없이 이 일 때문에 이사 왔어요. 이런 점심 덕분에 이제 여기가 집 같아요.',
    sort: 300
  },
  {
    id: 'f_priya_invite_1',
    npc: 'priya',
    kind: 'invite',
    need: 45,
    line: 'Escape the meeting room with me? Sunny Side Diner at {time}. I need soup and a break from slides.',
    line_ko: '회의실에서 같이 탈출할래요? {time}에 서니 사이드 다이너에서 봐요. 수프랑 슬라이드 없는 시간이 필요해요.',
    sort: 310
  },
  {
    id: 'f_priya_lunch_1',
    npc: 'priya',
    kind: 'lunch',
    line: 'I block lunch on my calendar, or it fills up with meetings. I learned that the hard way.',
    line_ko: '점심시간을 달력에 막아 둬요. 안 그러면 회의로 꽉 차거든요. 호되게 겪고 배웠어요.',
    sort: 260
  },
  {
    id: 'f_priya_lunch_2',
    npc: 'priya',
    kind: 'lunch',
    line: 'The store managers in the pilot are great. One of them sends me photos of her shop cat every Monday.',
    line_ko: '시범 매장 점장들이 정말 좋아요. 한 분은 월요일마다 가게 고양이 사진을 보내 줘요.',
    sort: 270
  },
  {
    id: 'f_priya_lunch_3',
    npc: 'priya',
    kind: 'lunch',
    need: 20,
    line: "Product work is mostly saying no nicely. I'm still practicing the nicely part.",
    line_ko: "프로덕트 일은 대부분 '안 돼요'를 친절하게 말하는 거예요. '친절하게' 쪽은 아직 연습 중이에요.",
    sort: 280
  },
  {
    id: 'f_priya_noshow_1',
    npc: 'priya',
    kind: 'noshow',
    line: "Had my soup with my phone for company. Totally fine! Hope your day's going okay.",
    line_ko: '수프는 휴대전화랑 둘이 먹었어요. 완전 괜찮아요! 오늘 하루 잘 풀리고 있길 바라요.',
    sort: 320
  },
  {
    id: 'f_priya_text_1',
    npc: 'priya',
    kind: 'text',
    need: 45,
    line: 'Farmers market haul: way too many peaches. This is a cry for help.',
    line_ko: '파머스 마켓에서 복숭아를 너무 많이 샀어요. 이건 구조 요청이에요.',
    sort: 360
  },
  {
    id: 'f_priya_text_2',
    npc: 'priya',
    kind: 'text',
    need: 45,
    line: 'Finally watched that documentary everyone talks about. Now I want to redesign everything.',
    line_ko: '다들 얘기하던 다큐멘터리를 드디어 봤어요. 이제 뭐든 다시 디자인하고 싶어요.',
    sort: 370
  },
  {
    id: 'f_priya_text_3',
    npc: 'priya',
    kind: 'text',
    need: 45,
    line: 'Weekend public service announcement: the coffee cart closes at two on Saturdays. I learned this at 2:05.',
    line_ko: '주말 공지: 커피 카트는 토요일엔 두 시에 닫아요. 2시 5분에 알게 됐어요.',
    sort: 380
  },
  {
    id: 'f_priya_umbrella_1',
    npc: 'priya',
    kind: 'umbrella',
    need: 45,
    line: 'I keep two umbrellas here because I always forget one at home. Take this one.',
    line_ko: '늘 집에 하나씩 두고 와서 여기 우산이 두 개 있어요. 이거 가져가요.',
    sort: 340
  },
  {
    id: 'f_sam_coffee_1',
    npc: 'sam',
    kind: 'coffee',
    need: 45,
    line: 'Grabbed you a coffee. Consider it a bribe to lock your screen when you step away.',
    line_ko: '커피 하나 사 왔어요. 자리 비울 때 화면 잠그라고 주는 뇌물이라고 생각해요.',
    sort: 590
  },
  {
    id: 'f_sam_cover_1',
    npc: 'sam',
    kind: 'cover',
    need: 70,
    line: "You missed {meeting}, so I sent you my notes. The short version: nothing's on fire.",
    line_ko: '{meeting}에 안 와서 제 메모를 보내 뒀어요. 요약하면, 급한 불은 없어요.',
    sort: 610
  },
  {
    id: 'f_sam_diner_1',
    npc: 'sam',
    kind: 'diner',
    need: 45,
    line: 'I wanted to be a pilot when I was a kid. Now I help people find the Shift key. Close enough.',
    line_ko: '어릴 땐 비행기 조종사가 되고 싶었어요. 지금은 사람들이 시프트 키 찾는 걸 도와요. 비슷하죠, 뭐.',
    sort: 550
  },
  {
    id: 'f_sam_diner_2',
    npc: 'sam',
    kind: 'diner',
    need: 45,
    line: "You're one of the few people here who actually reads my emails. I noticed.",
    line_ko: '제 이메일을 진짜로 읽는 몇 안 되는 사람 중 하나예요. 다 알아요.',
    sort: 560
  },
  {
    id: 'f_sam_invite_1',
    npc: 'sam',
    kind: 'invite',
    need: 45,
    line: "Lunch at the Sunny Side Diner? {time}. I'll be the one in the booth fixing their Wi-Fi in my head.",
    line_ko: '서니 사이드 다이너에서 점심 어때요? {time}에요. 부스에 앉아서 머릿속으로 식당 와이파이를 고치고 있는 사람이 저예요.',
    sort: 570
  },
  {
    id: 'f_sam_lunch_1',
    npc: 'sam',
    kind: 'lunch',
    line: 'Fun fact: the most common password in this building used to be the name of the building. Not anymore.',
    line_ko: '재미있는 사실: 예전엔 이 건물에서 제일 흔한 비밀번호가 건물 이름이었어요. 지금은 아니에요.',
    sort: 520
  },
  {
    id: 'f_sam_lunch_2',
    npc: 'sam',
    kind: 'lunch',
    line: 'I build tiny computers on weekends. My apartment is basically a museum of cables.',
    line_ko: '주말엔 작은 컴퓨터를 만들어요. 우리 집은 거의 케이블 박물관이에요.',
    sort: 530
  },
  {
    id: 'f_sam_lunch_3',
    npc: 'sam',
    kind: 'lunch',
    need: 20,
    line: "If an email ever makes you panic, that's exactly when to slow down. Panic is what scammers are selling.",
    line_ko: '이메일 하나에 마음이 급해지면 그때가 바로 천천히 할 때예요. 사기꾼이 파는 게 그 조급함이거든요.',
    sort: 540
  },
  {
    id: 'f_sam_noshow_1',
    npc: 'sam',
    kind: 'noshow',
    line: 'Lunch for one today. Closing this ticket: no worries.',
    line_ko: '오늘 점심은 혼자였어요. 이 건은 종료 처리할게요. 신경 쓰지 마요.',
    sort: 580
  },
  {
    id: 'f_sam_text_1',
    npc: 'sam',
    kind: 'text',
    need: 45,
    line: 'Weekend tip: turn on two-step login for your bank app. It takes two minutes. Okay, IT voice off.',
    line_ko: '주말 팁: 은행 앱에 2단계 인증을 켜 두세요. 2분이면 돼요. 자, IT 목소리 끕니다.',
    sort: 620
  },
  {
    id: 'f_sam_text_2',
    npc: 'sam',
    kind: 'text',
    need: 45,
    line: 'Built a weather station on my balcony. It says 61 degrees. My phone says 63. The war begins.',
    line_ko: '베란다에 기상 관측기를 만들었어요. 화씨 61도래요. 휴대전화는 63도라네요. 전쟁 시작이에요.',
    sort: 630
  },
  {
    id: 'f_sam_text_3',
    npc: 'sam',
    kind: 'text',
    need: 45,
    line: 'Got a text saying I won a cruise. I never entered a cruise contest. Stay sharp out there.',
    line_ko: '크루즈 여행에 당첨됐다는 문자를 받았어요. 응모한 적도 없는데요. 다들 조심하세요.',
    sort: 640
  },
  {
    id: 'f_sam_umbrella_1',
    npc: 'sam',
    kind: 'umbrella',
    need: 45,
    line: 'Believe it or not, IT keeps loaner umbrellas in the supply closet. Here, take one.',
    line_ko: '믿기 어렵겠지만 IT 비품 창고에 빌려주는 우산이 있어요. 자, 하나 가져가요.',
    sort: 600
  },
  {
    id: 'f_tip_build_red_derek',
    npc: 'derek',
    hero: 'jun',
    kind: 'tip',
    task: 't_build_red',
    need: 20,
    line: "If the build goes red after your merge, say you're on it in the team channel first. Then fix it or revert. Nobody minds a revert.",
    line_ko: '머지하고 빌드가 빨개지면 먼저 팀 채널에 제가 보겠다고 남겨요. 그다음 고치든 되돌리든 하면 돼요. 되돌리는 걸 뭐라 하는 사람은 없어요.',
    sort: 920
  },
  {
    id: 'f_tip_build_red_jun',
    npc: 'jun',
    hero: 'derek',
    kind: 'tip',
    task: 't_build_red',
    need: 20,
    line: 'When my build broke last month, you told me to post in the channel first and then fix or revert. It really worked!',
    line_ko: '지난달에 제 빌드가 깨졌을 때 먼저 채널에 알리고 고치거나 되돌리라고 해 줬잖아요. 정말 효과 있었어요!',
    sort: 930
  },
  {
    id: 'f_tip_dk_big_pr_maya',
    npc: 'maya',
    hero: 'derek',
    kind: 'tip',
    task: 't_dk_big_pr',
    need: 20,
    line: "Big pull requests from newer people go better when you start with what's good, then suggest splitting the rest.",
    line_ko: '신입의 큰 풀 리퀘스트는 잘한 점부터 말하고 나머지는 나누자고 제안하면 훨씬 잘 풀려요.',
    sort: 1030
  },
  {
    id: 'f_tip_dk_disk_sam',
    npc: 'sam',
    hero: 'derek',
    kind: 'tip',
    task: 't_dk_disk',
    need: 20,
    line: "Please don't delete anything on a production database by hand. Open a ticket, and we'll look at what's growing together.",
    line_ko: '운영 데이터베이스에서 손으로 지우는 건 하지 말아 줘요. 티켓을 열면 뭐가 늘고 있는지 같이 봐요.',
    sort: 1040
  },
  {
    id: 'f_tip_dk_question_priya',
    npc: 'priya',
    hero: 'derek',
    kind: 'tip',
    task: 't_dk_question',
    need: 20,
    line: "Protect your focus time: tell people when you'll be free, then really follow up. They'd rather wait twenty minutes than get brushed off.",
    line_ko: '집중 시간은 지켜요. 언제 시간이 나는지 말하고 꼭 다시 찾아가요. 무시당하는 것보다 20분 기다리는 게 나아요.',
    sort: 1050
  },
  {
    id: 'f_tip_estimate_derek',
    npc: 'derek',
    hero: 'jun',
    kind: 'tip',
    task: 't_estimate',
    need: 20,
    line: 'When Priya asks how long something will take, look at the code first and give her a range. A quick "two days" always comes back to bite you.',
    line_ko: '프리야가 얼마나 걸리냐고 물으면 먼저 코드를 보고 범위로 말해 줘요. 대충 "이틀이요" 하면 꼭 나중에 발목 잡혀요.',
    sort: 980
  },
  {
    id: 'f_tip_estimate_maya',
    npc: 'maya',
    hero: 'derek',
    kind: 'tip',
    task: 't_estimate',
    need: 20,
    line: "Give product a range, not a single number, and say when you'll confirm it. It saves everyone a bad week.",
    line_ko: '프로덕트 쪽엔 숫자 하나가 아니라 범위로 말하고, 언제 확정할지도 알려 줘요. 그래야 다 같이 힘든 한 주를 피해요.',
    sort: 990
  },
  {
    id: 'f_tip_fridge_linda',
    npc: 'linda',
    kind: 'tip',
    task: 't_fridge',
    need: 20,
    line: "Tom means it about the fridge. Put your name and the date on your lunch, and it's safe.",
    line_ko: '톰은 냉장고 얘기에 진심이에요. 점심에 이름이랑 날짜만 적어 두면 안전해요.',
    sort: 1080
  },
  {
    id: 'f_tip_jun_docs_linda',
    npc: 'linda',
    hero: 'jun',
    kind: 'tip',
    task: 't_jun_docs',
    need: 20,
    line: 'Someone new starts next month. Anything you fix in the onboarding guide now will save them a whole day.',
    line_ko: '다음 달에 새 사람이 와요. 지금 온보딩 가이드를 고쳐 두면 그 사람의 하루를 아껴 줄 거예요.',
    sort: 1020
  },
  {
    id: 'f_tip_jun_review_priya',
    npc: 'priya',
    hero: 'jun',
    kind: 'tip',
    task: 't_jun_review',
    need: 20,
    line: 'Derek leaves a lot of comments, but he loves talking through design. Answer each one, and ask him about the big one.',
    line_ko: '데릭은 코멘트를 많이 남기지만 설계 얘기를 나누는 걸 정말 좋아해요. 하나하나 답하고, 큰 건은 직접 물어봐요.',
    sort: 1000
  },
  {
    id: 'f_tip_jun_stuck_sam',
    npc: 'sam',
    hero: 'jun',
    kind: 'tip',
    task: 't_jun_stuck',
    need: 20,
    line: 'If your setup breaks after an update, post the error in the team channel. Half the team probably hit the same thing.',
    line_ko: '업데이트 뒤에 개발 환경이 깨지면 오류를 팀 채널에 올려요. 팀 절반은 같은 걸 겪었을 거예요.',
    sort: 1010
  },
  {
    id: 'f_tip_laptop_update_tom',
    npc: 'tom',
    kind: 'tip',
    task: 't_laptop_update',
    need: 20,
    line: 'When Sam says restart, restart. The automatic one at six once ate my unsaved spreadsheet.',
    line_ko: '샘이 재시작하라고 하면 바로 해요. 여섯 시 자동 재시작이 저장 안 한 제 스프레드시트를 날린 적이 있어요.',
    sort: 1060
  },
  {
    id: 'f_tip_phishing_sam',
    npc: 'sam',
    kind: 'tip',
    task: 't_phishing',
    need: 20,
    line: "Heads-up: fake payroll emails are going around. If a link isn't our real domain, don't click it. Hit Report phishing so I can warn everyone.",
    line_ko: "조심하세요. 가짜 급여 이메일이 돌고 있어요. 링크가 우리 회사 진짜 도메인이 아니면 누르지 말고 '피싱 신고' 버튼을 눌러 줘요. 그래야 제가 모두에게 알릴 수 있어요.",
    sort: 910
  },
  {
    id: 'f_tip_pr_date_derek',
    npc: 'derek',
    hero: 'priya',
    kind: 'tip',
    task: 't_pr_date',
    need: 20,
    line: "When sales asks for a date before we've estimated, give us a day and we'll get you a range.",
    line_ko: '영업팀이 우리가 추정하기도 전에 날짜를 달라고 하면 하루만 줘요. 범위로 알려 줄게요.',
    sort: 1090
  },
  {
    id: 'f_tip_pr_disagree_maya',
    npc: 'maya',
    hero: 'priya',
    kind: 'tip',
    task: 't_pr_disagree',
    need: 20,
    line: "When the developers can't agree, ask each for the trade-offs in writing, then decide by what the stores need.",
    line_ko: '개발자들 의견이 갈리면 각자 장단점을 글로 받아서 매장에 필요한 쪽으로 정해요.',
    sort: 1100
  },
  {
    id: 'f_tip_pr_greg_numbers_maya',
    npc: 'maya',
    hero: 'priya',
    kind: 'tip',
    task: 't_pr_greg_numbers',
    need: 20,
    line: 'Greg calms down fast if you answer within the hour, even before you have the fix.',
    line_ko: '그렉은 해결책이 나오기 전이라도 한 시간 안에 답하면 금방 진정해요.',
    sort: 1110
  },
  {
    id: 'f_tip_pr_notes_derek',
    npc: 'derek',
    hero: 'priya',
    kind: 'tip',
    task: 't_pr_notes',
    need: 20,
    line: "If you write release notes for the stores, send them to me first. I'll check they're accurate.",
    line_ko: '매장용 릴리스 노트를 쓰면 먼저 저한테 보내 줘요. 정확한지 봐 줄게요.',
    sort: 1120
  },
  {
    id: 'f_tip_pr_outage_sam',
    npc: 'sam',
    hero: 'priya',
    kind: 'tip',
    task: 't_pr_outage',
    need: 20,
    line: "When something's down, the stores would rather hear it from us right away than find out on their own.",
    line_ko: '뭔가 멈추면 매장들은 스스로 알아내기보다 우리한테서 바로 듣는 걸 좋아해요.',
    sort: 1130
  },
  {
    id: 'f_tip_pr_scope_maya',
    npc: 'maya',
    hero: 'priya',
    kind: 'tip',
    task: 't_pr_scope',
    need: 20,
    line: "With Greg's \"just one more\" requests, say what it would push back and let him choose. He respects that.",
    line_ko: '그렉의 "하나만 더" 요청엔 그게 뭘 밀어내는지 말하고 그가 고르게 해요. 그런 걸 존중하는 사람이에요.',
    sort: 1140
  },
  {
    id: 'f_tip_pr_survey_jun',
    npc: 'jun',
    hero: 'priya',
    kind: 'tip',
    task: 't_pr_survey',
    need: 20,
    line: 'If the survey surprises you, bring it to planning. I think the team would rather change course early.',
    line_ko: '설문 결과가 뜻밖이면 계획 회의에 가져와요. 팀은 일찍 방향을 바꾸는 걸 더 좋아할 거예요.',
    sort: 1150
  },
  {
    id: 'f_tip_prod_errors_derek',
    npc: 'derek',
    hero: 'jun',
    kind: 'tip',
    task: 't_prod_errors',
    need: 20,
    line: 'If errors spike after a deploy, roll back first and look for the bug after. The stores come first.',
    line_ko: '배포 뒤에 오류가 치솟으면 먼저 롤백하고 버그는 그다음에 찾아요. 매장이 먼저예요.',
    sort: 950
  },
  {
    id: 'f_tip_prod_errors_maya',
    npc: 'maya',
    hero: 'derek',
    kind: 'tip',
    task: 't_prod_errors',
    need: 20,
    line: "When something breaks after a deploy, say so in the incident channel and roll back. You don't have to be the hero alone.",
    line_ko: '배포 뒤에 뭔가 깨지면 장애 채널에 알리고 롤백해요. 혼자 영웅이 될 필요는 없어요.',
    sort: 960
  },
  {
    id: 'f_tip_security_alert_sam',
    npc: 'sam',
    hero: 'jun,derek',
    kind: 'tip',
    task: 't_security_alert',
    need: 20,
    line: 'When the scanner flags a library, check whether we use the broken function and send the upgrade. Ten small fixes beat one breach.',
    line_ko: '스캐너가 라이브러리를 잡으면 문제 있는 함수를 우리가 쓰는지 확인하고 업그레이드를 올려 줘요. 한 번 뚫리는 것보다 작은 수정 열 번이 나아요.',
    sort: 940
  },
  {
    id: 'f_tip_store_ticket_priya',
    npc: 'priya',
    hero: 'jun,derek',
    kind: 'tip',
    task: 't_store_ticket',
    need: 20,
    line: "Some pilot stores still use old browsers on the back-office computer. If a store says something doesn't work, try it their way first.",
    line_ko: '몇몇 시범 매장은 사무실 컴퓨터에서 아직 오래된 브라우저를 써요. 매장에서 뭐가 안 된다고 하면 먼저 그 매장 환경으로 해 봐요.',
    sort: 970
  },
  {
    id: 'f_tip_training_tom',
    npc: 'tom',
    kind: 'tip',
    task: 't_training',
    need: 20,
    line: "Linda really does check the training list on Friday afternoon. It's only half an hour, so get it out of the way.",
    line_ko: '린다는 금요일 오후에 정말로 교육 이수 명단을 확인해요. 30분이면 되니까 빨리 끝내 버려요.',
    sort: 1070
  },
  {
    id: 'f_tom_coffee_1',
    npc: 'tom',
    kind: 'coffee',
    need: 45,
    line: "Your usual, from the cart. I told you I know everyone's order.",
    line_ko: '커피 카트에서 늘 마시는 걸로 사 왔어요. 다들 주문을 외운다고 했잖아요.',
    sort: 850
  },
  {
    id: 'f_tom_cover_1',
    npc: 'tom',
    kind: 'cover',
    need: 70,
    line: "You missed {meeting}. I saved you the handout. It's on your desk.",
    line_ko: '{meeting}에 빠졌네요. 나눠 준 자료를 챙겨서 책상에 올려 뒀어요.',
    sort: 870
  },
  {
    id: 'f_tom_diner_1',
    npc: 'tom',
    kind: 'diner',
    need: 45,
    line: 'My wife and I are training for our first 10K. By training, I mean we bought shoes.',
    line_ko: '아내랑 첫 10킬로미터 달리기를 준비하고 있어요. 준비라고 해 봐야 운동화를 산 게 다예요.',
    sort: 810
  },
  {
    id: 'f_tom_diner_2',
    npc: 'tom',
    kind: 'diner',
    need: 45,
    line: "You always say good morning at the front desk. You'd be surprised how many people don't.",
    line_ko: '늘 프런트에서 아침 인사를 해 주잖아요. 안 하는 사람이 얼마나 많은지 알면 놀랄 거예요.',
    sort: 820
  },
  {
    id: 'f_tom_invite_1',
    npc: 'tom',
    kind: 'invite',
    need: 45,
    line: "Lunch buddy? I'll be at the Sunny Side Diner at {time}. They always save me the corner booth.",
    line_ko: '점심 같이 먹을래요? {time}에 서니 사이드 다이너에 있을게요. 거기선 늘 구석 부스를 맡아 줘요.',
    sort: 830
  },
  {
    id: 'f_tom_lunch_1',
    npc: 'tom',
    kind: 'lunch',
    line: "I know everybody's coffee order in this building. It's a gift and a curse.",
    line_ko: '이 건물 사람들 커피 주문은 다 외워요. 재능이자 저주죠.',
    sort: 780
  },
  {
    id: 'f_tom_lunch_2',
    npc: 'tom',
    kind: 'lunch',
    line: "The cleaning crew comes on Thursday nights, so don't leave anything important on the floor by your desk.",
    line_ko: '청소팀이 목요일 밤에 와요. 책상 옆 바닥에 중요한 건 두지 마세요.',
    sort: 790
  },
  {
    id: 'f_tom_lunch_3',
    npc: 'tom',
    kind: 'lunch',
    need: 20,
    line: 'Before this, I ran a hotel front desk for ten years. Compared to hotel guests, engineers are easy.',
    line_ko: '전에는 10년 동안 호텔 프런트를 맡았어요. 호텔 손님에 비하면 개발자들은 쉬워요.',
    sort: 800
  },
  {
    id: 'f_tom_noshow_1',
    npc: 'tom',
    kind: 'noshow',
    line: "No lunch buddy today? That's okay. More fries for me.",
    line_ko: '오늘은 점심 같이 못 했네요? 괜찮아요. 감자튀김을 제가 더 먹었죠.',
    sort: 840
  },
  {
    id: 'f_tom_text_1',
    npc: 'tom',
    kind: 'text',
    need: 45,
    line: "First practice run for the 10K: two miles. My wife did four. We don't talk about it.",
    line_ko: '10킬로미터 대비 첫 연습: 저는 2마일 뛰었어요. 아내는 4마일요. 그 얘기는 안 하기로 했어요.',
    sort: 880
  },
  {
    id: 'f_tom_text_2',
    npc: 'tom',
    kind: 'text',
    need: 45,
    line: 'Saw a seal at the beach this morning. Just one, lying there like it owned the place.',
    line_ko: '오늘 아침 해변에서 물개를 봤어요. 딱 한 마리가 주인처럼 누워 있더라고요.',
    sort: 890
  },
  {
    id: 'f_tom_text_3',
    npc: 'tom',
    kind: 'text',
    need: 45,
    line: "Made pancakes for the neighbors this morning. Thirty-six pancakes. I'm retired now.",
    line_ko: '오늘 아침에 이웃들한테 팬케이크를 구워 줬어요. 서른여섯 장요. 이제 은퇴합니다.',
    sort: 900
  },
  {
    id: 'f_tom_umbrella_1',
    npc: 'tom',
    kind: 'umbrella',
    need: 45,
    line: "The lost and found has about forty umbrellas. Take one, and bring it back when the sun's out.",
    line_ko: '분실물 보관함에 우산이 마흔 개쯤 있어요. 하나 가져가고 해 나면 돌려줘요.',
    sort: 860
  }
];

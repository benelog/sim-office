// What people say in passing about the weather, the day or the time, by topic (weather:<kind>, day:monday,
// time:lunch, you:wet, hybrid:office …). One remark in three is one of these.

export const smalltalk = {
  'day:friday': [
    { line: 'Happy Friday!', line_ko: '즐거운 금요일!' },
    { line: 'Any plans for the weekend?', line_ko: '주말에 무슨 계획 있어요?' },
    { line: "We made it. It's finally Friday.", line_ko: '해냈네요. 드디어 금요일이에요.' }
  ],
  'day:monday': [
    { line: 'How was your weekend?', line_ko: '주말 어땠어요?' },
    { line: 'Mondays, am I right?', line_ko: '월요일이 다 그렇죠, 안 그래요?' }
  ],
  'day:weekend': [
    { line: 'Enjoying your weekend?', line_ko: '주말 잘 보내고 있어요?' },
    { line: 'Taking it easy today?', line_ko: '오늘은 쉬엄쉬엄 보내요?' }
  ],
  holiday: [
    { line: "The banks are closed today, so don't bother going.", line_ko: '오늘은 은행이 쉬니까 갈 필요 없어요.' },
    { line: "No mail today. It's a federal holiday.", line_ko: '오늘은 우편물이 안 와요. 연방 공휴일이거든요.' },
    { line: 'I wish we had the day off like the post office.', line_ko: '우리도 우체국처럼 쉬면 좋을 텐데요.' }
  ],
  'hybrid:office': [
    { line: 'Nice to have everyone in the office today.', line_ko: '오늘은 다들 사무실에 있으니 좋네요.' },
    { line: 'I like the office days. Quick questions are so much easier.', line_ko: '사무실 나오는 날이 좋아요. 금방 물어볼 수 있잖아요.' },
    { line: "How's working from home going for you?", line_ko: '재택근무는 어때요?' },
    { line: 'Three days a week, the commute almost feels short.', line_ko: '일주일에 사흘만 출근하니까 출퇴근길이 짧게 느껴져요.' }
  ],
  'hybrid:remote': [
    { line: "Quiet in here today. Everybody's working from home.", line_ko: '오늘은 조용하네요. 다들 재택근무 중이에요.' },
    { line: "You came in today? You've got the whole floor to yourself.", line_ko: '오늘 나왔어요? 층 전체를 혼자 쓰겠네요.' },
    { line: 'Some people like the quiet days at the office. I get it.', line_ko: '조용한 날 일부러 나오는 사람도 있어요. 이해가 가요.' }
  ],
  'time:dark': [
    { line: 'Is it dark already? The days are getting shorter.', line_ko: '벌써 어두워요? 해가 점점 짧아지네요.' },
    { line: 'I hate leaving work in the dark. Fall is here, I guess.', line_ko: '깜깜할 때 퇴근하는 거 싫어요. 가을이 왔나 봐요.' },
    { line: 'The sun sets so early now. Where did the summer go?', line_ko: '요즘 해가 너무 일찍 져요. 여름이 어디 갔나 몰라요.' }
  ],
  'time:evening': [
    { line: 'Long day, huh? Get some rest.', line_ko: '긴 하루였죠? 좀 쉬어요.' },
    { line: 'Heading home? Have a good one!', line_ko: '집에 가요? 좋은 저녁 보내요!' }
  ],
  'time:lunch': [
    { line: 'Have you had lunch yet?', line_ko: '점심 먹었어요?' },
    { line: "I'm starving. Is it lunchtime yet?", line_ko: '배고파 죽겠어요. 아직 점심시간 안 됐어요?' }
  ],
  'time:morning': [
    { line: "Good morning! You're here early.", line_ko: '좋은 아침! 일찍 왔네요.' },
    { line: "Morning! I'm not awake until my second coffee.", line_ko: '좋은 아침! 커피 두 잔은 마셔야 잠이 깨요.' }
  ],
  'weather:clear': [
    { line: "Beautiful day, isn't it?", line_ko: '날씨 정말 좋죠?' },
    { line: 'Can you believe this weather? Not a cloud in the sky.', line_ko: '이 날씨 믿어져요? 구름 한 점 없어요.' },
    { line: "It's too nice out to be stuck inside.", line_ko: '안에만 있기엔 날씨가 너무 좋아요.' }
  ],
  'weather:cloudy': [
    { line: 'Kind of a gloomy day, huh?', line_ko: '좀 우중충한 날이죠?' },
    { line: 'It looks like it could rain any minute.', line_ko: '금방이라도 비가 올 것 같아요.' },
    { line: 'It got chilly all of a sudden.', line_ko: '갑자기 쌀쌀해졌어요.' }
  ],
  'weather:fog': [
    { line: 'I could barely see the road this morning.', line_ko: '오늘 아침엔 길이 거의 안 보였어요.' },
    { line: "It's so foggy out. Drive safe.", line_ko: '안개가 많이 꼈어요. 운전 조심해요.' }
  ],
  'weather:partly': [
    { line: 'Nice out today. Not too hot, not too cold.', line_ko: '오늘 날씨 좋네요. 덥지도 춥지도 않고요.' },
    { line: 'I heard it might cloud over later.', line_ko: '이따가 구름이 낄 수도 있대요.' }
  ],
  'weather:rain': [
    { line: "It's really coming down out there.", line_ko: '밖에 비가 정말 많이 와요.' },
    { line: 'Did you get caught in the rain?', line_ko: '비 맞았어요?' },
    { line: 'I forgot my umbrella. Of course.', line_ko: '우산을 깜빡했어요. 꼭 이런다니까요.' },
    { line: 'Stay dry out there!', line_ko: '비 맞지 말고 다녀요!' }
  ],
  'you:late': [
    { line: 'Running late this morning? It happens.', line_ko: '오늘 아침엔 좀 늦었네요? 그럴 수도 있죠.' },
    { line: 'Rough commute? I heard traffic was terrible today.', line_ko: '출근길이 험했어요? 오늘 길이 엄청 막혔다던데요.' },
    { line: 'Better late than never!', line_ko: '안 오는 것보다는 늦게라도 오는 게 낫죠!' }
  ],
  'you:laundry': [
    { line: 'Rough week? Looks like somebody needs a laundry day.', line_ko: '힘든 한 주예요? 누구 빨래하는 날이 필요해 보이네요.' },
    { line: "Nice shirt. Didn't you wear that yesterday? Just kidding!", line_ko: '셔츠 멋지네요. 어제도 입지 않았어요? 농담이에요!' },
    { line: 'Pro tip: the laundromat on Maple Street is open late.', line_ko: '꿀팁: 메이플 스트리트 빨래방은 늦게까지 열어요.' }
  ],
  'you:wet': [
    { line: "Oh no, you're soaked! Did you forget your umbrella?", line_ko: '이런, 흠뻑 젖었네요! 우산을 깜빡했어요?' },
    { line: 'You got caught in the rain, huh? Go dry off.', line_ko: '비를 맞았군요? 가서 좀 말려요.' },
    { line: 'You look like a drowned rat. No offense!', line_ko: '물에 빠진 생쥐 같아요. 기분 나쁘게 듣지는 말고요!' }
  ]
};

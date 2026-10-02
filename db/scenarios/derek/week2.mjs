// Derek Alvarez's second week and the Monday after (game days 8-15): the missions.

export const hero = 'derek';

export const episodes = [
  {
    id: 'dk_d8_coffee',
    title: 'Fog on Lake Avenue',
    title_ko: '레이크 애비뉴의 안개',
    place: 'coffee_cart',
    npc: 'nina',
    day_from: 8,
    day_to: 8,
    time_from: '07:00',
    time_to: '10:30',
    summary: "A foggy Monday morning. Your punch card was full last week, so today's drink is free. Talk about the slow drive in, treat yourself, and tell Nina about the barbecue.",
    summary_ko: '안개 낀 월요일 아침입니다. 지난주에 쿠폰 카드가 다 차서 오늘 음료는 공짜입니다. 느릿느릿했던 출근길 이야기를 하고, 자신에게 작은 사치를 부리고, 니나에게 바비큐 이야기를 들려주세요.',
    energy: 9,
    sort: 10,
    tags: 'food,coffee,small-talk,weather',
    calendar: { day: 8, time: '08:00', title: "Coffee at Nina's cart (free drink)", title_ko: '니나의 카트에서 커피 (무료 음료)' },
    turns: [
      {
        speaker: 'nina',
        situation: 'Monday morning. Fog hangs over Lake Avenue, and you can barely see the coffee cart until you are standing in front of it.',
        situation_ko: '월요일 아침입니다. 레이크 애비뉴에 안개가 자욱해서 바로 앞에 설 때까지 커피 카트가 잘 보이지 않습니다.',
        line: 'Morning, Derek! I can barely see across the street. How was the drive in?',
        line_ko: '좋은 아침이에요, 데릭! 길 건너편도 잘 안 보여요. 운전해서 오는 거 어땠어요?',
        prompt: 'Tell her about your slow commute in the fog.',
        prompt_ko: '안개 때문에 느렸던 출근길 이야기를 해 주세요.',
        model: 'Traffic was crawling the whole way. It took me twice as long as usual.',
        model_ko: '오는 내내 차가 기어갔어요. 평소보다 두 배는 걸렸어요.',
        distractors: [
          {
            text: 'Smooth, actually. The roads were empty. I got here early for once.',
            text_ko: '사실 순조로웠어요. 길이 텅 비어서 웬일로 일찍 왔어요.',
            reaction: 'Really? Half my regulars are stuck out there.',
            reaction_ko: '정말요? 단골 절반이 길에서 꼼짝 못 하고 있는데요.'
          },
          {
            text: "It's supposed to burn off by noon, though. At least that's what they said.",
            text_ko: '그래도 정오쯤엔 걷힌대요. 적어도 그렇게들 말하더라고요.',
            reaction: 'Sure, but I asked about your drive.',
            reaction_ko: '그렇죠, 근데 운전은 어땠냐고 물은 건데요.'
          },
          {
            text: 'Awful. Everyone in this town drives like an idiot in the fog.',
            text_ko: '최악이었어요. 이 동네 사람들은 안개만 끼면 운전을 엉망으로 해요.',
            reaction: 'Whoa. Somebody needs coffee.',
            reaction_ko: '워. 누가 커피가 급하네요.'
          }
        ],
        reply_speaker: 'nina',
        reply_line: "I believe it. Half my regulars are running late. It's supposed to burn off by noon, though.",
        reply_ko: '그럴 만해요. 단골 절반이 늦고 있어요. 그래도 정오쯤엔 걷힌대요.'
      },
      {
        speaker: 'nina',
        situation: 'She reaches for a large cup, then stops.',
        situation_ko: '그녀가 큰 컵을 집으려다 멈춥니다.',
        line: "The usual? Oh, wait. Your card was full last week. This one's on the house, so get whatever you want.",
        line_ko: '늘 드시던 걸로요? 아, 잠깐만요. 지난주에 쿠폰 다 찼었죠. 이건 공짜니까 마음대로 골라요.',
        prompt: "Since it's free, go for something fancier than usual: a big latte with one more shot of espresso.",
        prompt_ko: '공짜니까 평소보다 좋은 걸로 하세요. 큰 사이즈 라테에 에스프레소 샷 하나 더요.',
        model: "In that case, I'll treat myself. Make it a large latte with an extra shot.",
        model_ko: '그렇다면 오늘은 호사 좀 부려 볼게요. 샷 추가해서 라테 라지로 주세요.',
        distractors: [
          {
            text: 'Just the usual is fine. Large dark roast with room for cream.',
            text_ko: '그냥 늘 먹던 걸로 주세요. 다크 로스트 라지, 크림 넣을 자리 남겨서요.',
            reaction: "The usual? You're sure? It's free, Derek.",
            reaction_ko: '늘 먹던 거요? 진짜요? 공짜라니까요, 데릭.'
          },
          {
            text: "In that case, I'll treat myself. Make it a small iced tea, please.",
            text_ko: '그렇다면 오늘은 호사 좀 부려 볼게요. 아이스티 스몰로 주세요.',
            reaction: "Iced tea? In this fog? That's your treat?",
            reaction_ko: '아이스티요? 이 안개에? 그게 호사예요?'
          },
          {
            text: "In that case, I'll take two large lattes and a couple of muffins, all on the house.",
            text_ko: '그렇다면 라테 라지 두 잔이랑 머핀 두어 개, 전부 공짜로 할게요.',
            reaction: 'Ha! One free drink, Derek. Not the whole cart.',
            reaction_ko: '하! 공짜는 한 잔이에요, 데릭. 카트 전부가 아니고요.'
          }
        ],
        reply_speaker: 'nina',
        reply_line: 'A latte! Look at you, living on the edge.',
        reply_ko: '라테라니! 오늘 아주 과감하시네요.'
      },
      {
        speaker: 'nina',
        situation: 'The milk steamer hisses. Nina talks over it.',
        situation_ko: '우유 스티머가 쉭쉭 소리를 냅니다. 니나가 그 소리 너머로 말합니다.',
        line: 'So how was the barbecue? Mike told me you nearly bought out the market.',
        line_ko: '그래서 바비큐는 어땠어요? 마이크 말로는 마트를 거의 다 털었다던데.',
        prompt: "Tell her how the weekend went: perfect weather, and Carl's side dish was the big hit.",
        prompt_ko: '주말이 어땠는지 말해 주세요. 날씨는 최고였고, 칼이 가져온 음식이 제일 인기였다고요.',
        model: "It was a blast. The weather couldn't have been better, and my neighbor's potato salad stole the show.",
        model_ko: '정말 재밌었어요. 날씨는 더할 나위 없었고, 이웃집 감자 샐러드가 주인공이었어요.',
        distractors: [
          {
            text: "It was a blast. It rained a bit in the afternoon, but my neighbor's potato salad totally stole the show.",
            text_ko: '정말 재밌었어요. 오후에 비가 좀 왔지만, 이웃집 감자 샐러드가 완전 주인공이었어요.',
            reaction: 'Rain? It was sunny all weekend here.',
            reaction_ko: '비요? 여긴 주말 내내 맑았는데요.'
          },
          {
            text: 'It was fine. My neighbor showed up with potato salad nobody asked for, though.',
            text_ko: '그냥 그랬어요. 근데 이웃이 아무도 부탁 안 한 감자 샐러드를 들고 왔더라고요.',
            reaction: "Aw, that's not very neighborly.",
            reaction_ko: '에이, 이웃한테 너무하네요.'
          },
          {
            text: 'Honestly, exhausting. Too many people, and I was cleaning up until midnight.',
            text_ko: '솔직히 진이 빠졌어요. 사람이 너무 많았고, 자정까지 치웠어요.',
            reaction: 'Oh no. Was it at least fun?',
            reaction_ko: '저런. 그래도 재밌긴 했어요?'
          }
        ],
        reply_speaker: 'nina',
        reply_line: 'A potato salad beat your burgers? Ouch.',
        reply_ko: '감자 샐러드가 데릭의 버거를 이겼어요? 저런.'
      },
      {
        speaker: 'nina',
        situation: 'She snaps a lid on the cup and slides it across the counter.',
        situation_ko: '그녀가 컵에 뚜껑을 딱 닫아 카운터 너머로 밀어 줍니다.',
        line: 'Here you go. Big week ahead?',
        line_ko: '여기요. 이번 주 바빠요?',
        prompt: "Say a new project starts today, and joke that you'll need plenty of coffee.",
        prompt_ko: '오늘 새 프로젝트가 시작된다고 하고, 커피가 잔뜩 필요할 거라고 농담하세요.',
        model: "We've got a new project kicking off today, so I'll need all the caffeine I can get.",
        model_ko: '오늘 새 프로젝트가 시작돼서, 카페인이 있는 대로 다 필요할 거예요.',
        distractors: [
          {
            text: "We've got a new project kicking off next month, so this week should be pretty easy.",
            text_ko: '새 프로젝트는 다음 달에 시작이라 이번 주는 꽤 한가할 거예요.',
            reaction: 'Lucky you. Enjoy the quiet while it lasts.',
            reaction_ko: '좋겠네요. 조용할 때 즐겨요.'
          },
          {
            text: "Our client's furious about last week's outage, so I might get chewed out today.",
            text_ko: '지난주 장애 때문에 고객사가 엄청 화나서, 오늘 한 소리 들을지도 몰라요.',
            reaction: "Yikes. I didn't need to know that, but good luck.",
            reaction_ko: '이런. 몰라도 될 얘기 같지만, 행운을 빌어요.'
          },
          {
            text: "Last week was crazy. We had an outage and a new hire. Glad it's over.",
            text_ko: '지난주가 정신없었어요. 장애도 나고 신입도 오고. 끝나서 다행이에요.',
            reaction: 'Glad for you. But I asked about this week.',
            reaction_ko: '다행이네요. 근데 이번 주 얘기 물은 건데요.'
          }
        ],
        reply_speaker: 'nina',
        reply_line: "Then go get 'em. And drive safe tonight!",
        reply_ko: '그럼 가서 멋지게 해내요. 저녁에 운전 조심하고요!'
      }
    ],
    phrases: [
      {
        id: 'dk_d8_coffee.a_blast',
        text: 'It was a blast.',
        meaning_ko: '정말 즐거웠어요.',
        note: '"A blast" = a lot of fun. Casual.',
        note_ko: 'a blast는 아주 재미있었다는 편한 표현입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d8_coffee.burn_off',
        text: "It's supposed to burn off by noon.",
        meaning_ko: '정오쯤엔 걷힌대요.',
        note: 'Fog "burns off" when the sun warms it away. "Supposed to" = that is the forecast.',
        note_ko: '안개가 햇볕에 걷히는 것을 burn off라고 합니다. supposed to는 예보가 그렇다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d8_coffee.crawling',
        text: 'Traffic was crawling.',
        meaning_ko: '차들이 기어가다시피 했어요.',
        note: '"Crawl" = move very slowly. Also: "bumper to bumper".',
        note_ko: 'crawl은 아주 느리게 움직인다는 뜻입니다. bumper to bumper라고도 합니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d8_coffee.kicking_off',
        text: "We've got a new project kicking off today.",
        meaning_ko: '오늘 새 프로젝트가 시작돼요.',
        note: '"Kick off" = start. The first meeting of a project is "the kickoff".',
        note_ko: 'kick off는 시작한다는 뜻입니다. 프로젝트의 첫 회의를 the kickoff라고 합니다.',
        category: 'office'
      },
      {
        id: 'dk_d8_coffee.make_it_a',
        text: 'Make it a large latte with an extra shot.',
        meaning_ko: '샷 추가한 라테 라지로 해 주세요.',
        note: '"Make it a …" changes or decides an order. An extra shot is one more shot of espresso.',
        note_ko: '"Make it a …"는 주문을 바꾸거나 정할 때 씁니다. extra shot은 에스프레소 샷 추가입니다.',
        category: 'food'
      },
      {
        id: 'dk_d8_coffee.stole_the_show',
        text: 'The potato salad stole the show.',
        meaning_ko: '감자 샐러드가 주인공이었어요.',
        note: '"Steal the show" = get more attention and praise than anything else.',
        note_ko: 'steal the show는 다른 무엇보다 관심과 칭찬을 많이 받는다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d8_coffee.treat_myself',
        text: "I'll treat myself.",
        meaning_ko: '오늘은 저한테 선물 좀 할게요.',
        note: 'Allow yourself something nice that you do not usually have.',
        note_ko: '평소에는 잘 하지 않는 좋은 것을 자신에게 허락한다는 뜻입니다.',
        category: 'food'
      },
      {
        id: 'dk_d8_coffee.twice_as_long',
        text: 'It took me twice as long as usual.',
        meaning_ko: '평소보다 두 배나 걸렸어요.',
        note: '"Twice as … as" compares: two times the normal amount.',
        note_ko: '"twice as … as"는 평소의 두 배라고 비교하는 표현입니다.',
        category: 'small-talk'
      }
    ]
  },
  {
    id: 'dk_d8_risk',
    title: 'How risky is it?',
    title_ko: '얼마나 위험한가요?',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 8,
    day_to: 8,
    time_from: '11:30',
    time_to: '16:30',
    summary: 'The kickoff call with Summit Retail is over, and Priya wants the technical risk in words she can use. Say "it depends" well, give a range, and propose a phased rollout.',
    summary_ko: '서밋 리테일 킥오프 콜이 끝났고, 프리야는 기술적 위험을 자신이 쓸 수 있는 말로 듣고 싶어 합니다. "상황에 따라 다르다"를 제대로 말하고, 범위로 추정하고, 단계별 적용을 제안하세요.',
    sort: 20,
    tags: 'meeting,client,risk,estimate',
    calendar: { day: 8, time: '12:00', title: 'Technical risk debrief with Priya', title_ko: '프리야와 기술 위험 정리' },
    turns: [
      {
        speaker: 'priya',
        situation: 'The kickoff call with Summit Retail has just ended. Jun has gone back to his desk. Priya closes the door of the meeting room.',
        situation_ko: '서밋 리테일 킥오프 콜이 방금 끝났습니다. 준은 자리로 돌아갔습니다. 프리야가 회의실 문을 닫습니다.',
        line: 'Okay, you heard Greg. Live inventory for forty stores. Give it to me straight: how risky is this?',
        line_ko: '좋아요, 그렉 말 들었죠. 매장 마흔 곳의 실시간 재고. 돌려 말하지 말고요. 이거 얼마나 위험해요?',
        prompt: 'Give her your honest read: which part is easy, and where the real uncertainty is, which is their old store checkout system.',
        prompt_ko: '솔직한 판단을 말해 주세요. 어느 부분이 쉽고, 진짜 불확실한 건 어디인지요. 바로 그쪽의 오래된 매장 계산 시스템이에요.',
        model: 'The dashboard itself is straightforward. The big unknown is their point-of-sale system.',
        model_ko: '대시보드 자체는 어렵지 않아요. 가장 큰 변수는 그쪽 POS 시스템이에요.',
        distractors: [
          {
            text: 'The dashboard is the hard part. Their point-of-sale system should plug right in.',
            text_ko: '어려운 건 대시보드 쪽이에요. 그쪽 POS 시스템은 그냥 바로 연결될 거예요.',
            reaction: 'Plug right in? Greg made their system sound pretty ancient.',
            reaction_ko: '바로 연결된다고요? 그렉 얘기로는 꽤 오래된 시스템 같던데요.'
          },
          {
            text: "Honestly, there's no real risk here. We've built dashboards like this a dozen times before.",
            text_ko: '솔직히 위험할 건 없어요. 이런 대시보드는 전에도 열 번은 넘게 만들어 봤어요.',
            reaction: "No risk at all? I've heard that before. Give me the real version.",
            reaction_ko: '위험이 하나도 없다고요? 그런 말 전에도 들어 봤어요. 진짜를 말해 줘요.'
          },
          {
            text: 'Forty stores is a lot. How many people does Greg have on his IT team, anyway?',
            text_ko: '매장 마흔 곳이면 많네요. 그런데 그렉 쪽 IT 팀은 몇 명이에요?',
            reaction: 'I can find out. But I asked you how risky this is.',
            reaction_ko: '그건 알아볼 수 있어요. 그런데 제가 물은 건 얼마나 위험하냐예요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'The old one that spits out a file every night. Right.',
        reply_ko: '매일 밤 파일을 하나씩 뱉어 내는 그 오래된 시스템 말이죠. 그렇군요.'
      },
      {
        speaker: 'priya',
        situation: 'Priya opens the timeline on her laptop.',
        situation_ko: '프리야가 노트북에서 일정표를 엽니다.',
        line: 'So can we hit November first or not? I need a yes or a no.',
        line_ko: '그래서 11월 1일 맞출 수 있어요, 없어요? 예스냐 노냐가 필요해요.',
        prompt: 'She wants a yes or no, but the honest answer hinges on getting API access this week. Give her an answer she can work with.',
        prompt_ko: '그녀는 예, 아니오를 원하지만, 정직한 답은 이번 주에 API 접근 권한을 받느냐에 달려 있습니다. 그녀가 써먹을 수 있는 답을 주세요.',
        model: "It depends on how soon we get API access. If we get it this week, we're in good shape. If not, the date is at risk.",
        model_ko: 'API 접근 권한을 얼마나 빨리 받느냐에 달렸어요. 이번 주에 받으면 문제없고요. 못 받으면 그 날짜는 위험해요.',
        distractors: [
          {
            text: "It depends on how soon we get API access. If we get it by the end of the month, we're in good shape for November first.",
            text_ko: 'API 접근 권한을 얼마나 빨리 받느냐에 달렸어요. 이달 말까지만 받으면 11월 1일은 문제없어요.',
            reaction: "End of the month? That's cutting it close. I thought we needed it sooner.",
            reaction_ko: '이달 말이요? 너무 빠듯한데요. 더 빨리 받아야 하는 줄 알았어요.'
          },
          {
            text: "Yes, absolutely. We'll hit November first no matter what happens with their API access.",
            text_ko: '네, 당연하죠. 그쪽 API 접근 권한이 어떻게 되든 11월 1일은 맞출 거예요.',
            reaction: "No matter what? I'm going to quote you on that. Are you sure?",
            reaction_ko: '무슨 일이 있어도요? 그 말 그대로 인용할 거예요. 확실해요?'
          },
          {
            text: "Hard to say. There are a lot of moving parts, so let's revisit it in a couple of weeks.",
            text_ko: '지금은 뭐라 말하기 어렵네요. 변수가 워낙 많으니까 2주쯤 뒤에 다시 얘기해 봐요.',
            reaction: 'A couple of weeks? I need something to tell Greg today.',
            reaction_ko: '2주 뒤요? 오늘 그렉한테 할 말이 있어야 해요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Okay. That's an \"it depends\" I can actually use.",
        reply_ko: '좋아요. 그건 제가 실제로 써먹을 수 있는 "상황에 따라"네요.'
      },
      {
        speaker: 'priya',
        situation: 'She types a note: "API access this week."',
        situation_ko: '그녀가 "이번 주 안에 API 접근 권한"이라고 메모합니다.',
        line: "Ballpark, how long is phase one? I won't hold you to it.",
        line_ko: '대충, 1단계는 얼마나 걸려요? 그대로 지키라고 하진 않을게요.',
        prompt: 'Give her a range, six to eight weeks, and name the one thing it depends on.',
        prompt_ko: '6주에서 8주라는 범위로 말하고, 그게 무엇에 달려 있는지 한 가지를 짚어 주세요.',
        model: 'Ballpark, six to eight weeks, assuming their API does what they say it does.',
        model_ko: '대충 6주에서 8주요. 그쪽 API가 말한 대로 동작한다는 전제로요.',
        distractors: [
          {
            text: 'Ballpark, eight to ten weeks, assuming we get the API access sometime this week.',
            text_ko: '대충 8주에서 10주요. 이번 주 중에 API 접근 권한을 받는다는 전제로요.',
            reaction: 'Eight to ten? That blows right past November. Is that right?',
            reaction_ko: '8주에서 10주요? 그럼 11월을 훌쩍 넘기는데요. 맞아요?'
          },
          {
            text: 'Exactly seven weeks. You can put that in the contract with Greg.',
            text_ko: '딱 7주요. 그렉하고 맺는 계약서에 그대로 넣어도 돼요.',
            reaction: "Whoa, I said I won't hold you to it. Don't make it a promise.",
            reaction_ko: '잠깐만요, 그대로 지키라고 안 한다고 했잖아요. 약속으로 만들진 마요.'
          },
          {
            text: 'Ballpark, six to eight people, assuming Jun stays on it full time.',
            text_ko: '대충 여섯에서 여덟 명이요. 준이 전담으로 붙어 있다는 전제로요.',
            reaction: 'People? I meant time. How many weeks?',
            reaction_ko: '사람이요? 기간을 물은 거예요. 몇 주요?'
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'Six to eight, with an assumption attached. Got it.',
        reply_ko: '6주에서 8주, 전제 하나 붙여서. 알겠어요.'
      },
      {
        speaker: 'priya',
        situation: 'Priya puts down her pen.',
        situation_ko: '프리야가 펜을 내려놓습니다.',
        line: 'And what keeps you up at night?',
        line_ko: '그럼 밤잠 못 이루게 하는 건 뭐예요?',
        prompt: "Tell her the worst case you see in the stores' data, and when you would want to learn about it.",
        prompt_ko: '매장 데이터에서 보이는 최악의 경우와, 그걸 언제 알고 싶은지 말하세요.',
        model: "Worst case, the data from the stores is messy. I'd rather find that out early than in October.",
        model_ko: '최악의 경우는 매장 데이터가 엉망인 거예요. 그건 10월보다 일찍 알아내는 게 나아요.',
        distractors: [
          {
            text: "Worst case, the data from the stores is messy. We'll deal with that in October, at launch.",
            text_ko: '최악의 경우는 매장 데이터가 엉망인 거예요. 그건 10월에 오픈할 때 처리하면 돼요.',
            reaction: "October? That's way too late to find out, Derek.",
            reaction_ko: '10월이요? 그때 알면 너무 늦어요, 데릭.'
          },
          {
            text: "Honestly? My kid's been sick all week, so I'm barely sleeping as it is.",
            text_ko: '솔직히요? 애가 일주일 내내 아파서, 안 그래도 잠을 거의 못 자요.',
            reaction: "Oh no, I'm sorry. I meant on the project, though.",
            reaction_ko: '어머, 안됐네요. 그런데 프로젝트 얘기였어요.'
          },
          {
            text: "Worst case, Greg's team sends us garbage data and then blames us for it. Clients always do that.",
            text_ko: '최악의 경우는 그렉 팀이 쓰레기 데이터를 보내 놓고 우리 탓을 하는 거죠. 고객들은 늘 그래요.',
            reaction: "Let's not go there. We've never even worked with them before.",
            reaction_ko: '그렇게까지 가진 말죠. 그쪽이랑 일해 본 적도 없잖아요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Agreed. Bad news doesn't get better with age.",
        reply_ko: '동의해요. 나쁜 소식은 묵힌다고 좋아지지 않죠.'
      },
      {
        speaker: 'priya',
        situation: 'She stands at the whiteboard with a marker.',
        situation_ko: '그녀가 마커를 들고 화이트보드 앞에 섭니다.',
        line: 'So how do we take some of that risk off the table?',
        line_ko: '그럼 그 위험을 어떻게 좀 덜 수 있을까요?',
        prompt: 'Suggest starting small with five stores, and only then going to all forty.',
        prompt_ko: '처음엔 매장 다섯 곳으로 작게 시작하고, 그다음에야 마흔 곳 전체로 가자고 제안하세요.',
        model: "I'd propose a phased rollout. We pilot with five stores first, then roll it out to the rest.",
        model_ko: '단계별로 적용하자고 제안할게요. 먼저 매장 다섯 곳에서 시범 운영하고, 그다음에 나머지로 넓히는 거예요.',
        distractors: [
          {
            text: "I'd propose a phased rollout. We pilot with fifteen stores first, then do the other twenty-five.",
            text_ko: '단계별로 적용하자고 제안할게요. 먼저 매장 열다섯 곳에서 시범 운영하고, 그다음에 나머지 스물다섯 곳을 하는 거예요.',
            reaction: "Fifteen? That's a big pilot. I thought you'd want it smaller.",
            reaction_ko: '열다섯 곳이요? 시범치고는 크네요. 더 작게 하자고 할 줄 알았어요.'
          },
          {
            text: "Let's just tell Greg forty stores is too many and cut the scope down to twenty.",
            text_ko: '그냥 그렉한테 매장 마흔 곳은 너무 많다고 말하고, 범위를 스무 곳으로 줄여 버려요.',
            reaction: "Cut the scope? Greg just asked for forty. I can't sell that.",
            reaction_ko: '범위를 줄여요? 그렉이 방금 마흔 곳을 원했는데요. 그건 못 팔아요.'
          },
          {
            text: "We could add people. If Maya gives us two more developers, we'd be totally fine.",
            text_ko: '사람을 늘리면 돼요. 마야가 개발자 두 명만 더 주면 전혀 문제없을 거예요.',
            reaction: "More people won't fix messy data, though. What else?",
            reaction_ko: '사람을 늘린다고 엉망인 데이터가 고쳐지진 않잖아요. 다른 건요?'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "A five-store pilot. I love it. I'll float it with Greg on tomorrow's call.",
        reply_ko: '매장 다섯 곳 시범 운영. 아주 좋아요. 내일 통화에서 그렉에게 슬쩍 제안해 볼게요.'
      }
    ],
    phrases: [
      {
        id: 'dk_d8_risk.at_risk',
        text: 'The date is at risk.',
        meaning_ko: '그 날짜는 위험해요.',
        note: "A calm way to warn that a deadline may be missed. The opposite: \"We're in good shape.\"",
        note_ko: "마감을 못 지킬 수 있다고 차분하게 경고하는 표현입니다. 반대는 \"We're in good shape.\"입니다.",
        category: 'meeting'
      },
      {
        id: 'dk_d8_risk.ballpark',
        text: 'Ballpark, six to eight weeks.',
        meaning_ko: '대략 6주에서 8주요.',
        note: 'A "ballpark (figure)" is a rough estimate. From baseball.',
        note_ko: 'ballpark (figure)는 대략적인 추정치입니다. 야구에서 온 말입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d8_risk.big_unknown',
        text: 'The big unknown is their point-of-sale system.',
        meaning_ko: '가장 불확실한 건 그쪽 POS 시스템이에요.',
        note: 'An "unknown" is something you cannot estimate yet because you have no information.',
        note_ko: 'unknown은 정보가 없어 아직 추정할 수 없는 것을 말합니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d8_risk.give_it_straight',
        text: 'Give it to me straight.',
        meaning_ko: '돌려 말하지 말고 솔직하게 말해 줘요.',
        note: 'Asks for the honest truth, even if it is bad news.',
        note_ko: '나쁜 소식이라도 있는 그대로 말해 달라는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d8_risk.hold_you_to_it',
        text: "I won't hold you to it.",
        meaning_ko: '꼭 지키라고 하지는 않을게요.',
        note: '"Hold someone to" a number = make them keep it as a promise.',
        note_ko: 'hold someone to는 그 숫자를 약속으로 지키게 한다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d8_risk.it_depends_on',
        text: 'It depends on how soon we get API access.',
        meaning_ko: 'API 접근 권한을 얼마나 빨리 받느냐에 달렸어요.',
        note: 'A good "it depends" always says what it depends on.',
        note_ko: '좋은 "it depends"는 무엇에 달렸는지를 꼭 말합니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d8_risk.phased_rollout',
        text: "I'd propose a phased rollout.",
        meaning_ko: '단계별 적용을 제안합니다.',
        note: 'Releasing in steps. A "pilot" is a small first test with real users.',
        note_ko: '여러 단계로 나누어 내놓는 것입니다. pilot은 실제 사용자와 하는 작은 첫 시험입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d8_risk.worst_case',
        text: 'Worst case, the data is messy.',
        meaning_ko: '최악의 경우, 데이터가 엉망일 거예요.',
        note: 'Short for "in the worst case". The opposite is "best case".',
        note_ko: '"in the worst case"를 줄인 말입니다. 반대는 best case입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'dk_d8_postmortem',
    title: 'No blame, just causes',
    title_ko: '탓하지 않고 원인만',
    place: 'office_it',
    npc: 'sam',
    day_from: 8,
    day_to: 8,
    time_from: '13:00',
    time_to: '18:00',
    summary: "You go through your postmortem of last Thursday's outage with Sam and Maya. Keep it blameless, tell the trigger from the root cause, and give every action item an owner and a date.",
    summary_ko: '지난 목요일 장애의 사후 분석 보고서를 샘, 마야와 함께 검토합니다. 누구도 탓하지 말고, 계기와 근본 원인을 구분하고, 후속 조치마다 담당자와 날짜를 정하세요.',
    sort: 30,
    tags: 'meeting,incident,postmortem,it',
    calendar: { day: 8, time: '14:00', title: 'Postmortem review with Sam and Maya', title_ko: '샘, 마야와 사후 분석 검토' },
    turns: [
      {
        speaker: 'maya',
        situation: "Monday afternoon in Sam's room. Your postmortem of last Thursday's outage is on the big monitor. Maya has pulled up a chair.",
        situation_ko: '월요일 오후, 샘의 방입니다. 지난 목요일 장애에 대해 당신이 쓴 사후 분석 보고서가 큰 모니터에 떠 있습니다. 마야가 의자를 끌어다 앉았습니다.',
        line: 'Thanks for writing this up, Derek. Before we start: how do you want to run this?',
        line_ko: '정리해 줘서 고마워요, 데릭. 시작하기 전에, 어떤 식으로 진행하고 싶어요?',
        prompt: 'Set the tone: this meeting is about fixing how things work, and nobody here is in trouble.',
        prompt_ko: '분위기를 정하세요. 이 자리는 일하는 방식을 고치려는 것이고, 여기 있는 누구도 혼나는 게 아니라고요.',
        model: "Let's keep it blameless. We're here to fix the process, not to point fingers.",
        model_ko: '누구 탓도 하지 말고 하죠. 손가락질하려는 게 아니라 절차를 고치려고 모인 거니까요.',
        distractors: [
          {
            text: "Let's start with who missed the certificate, and then talk about how to fix it.",
            text_ko: '인증서를 누가 놓쳤는지부터 보고, 그다음에 어떻게 고칠지 얘기하죠.',
            reaction: "Hold on. We don't start with who. That's not how we do these.",
            reaction_ko: "잠깐만요. '누가'부터 시작하진 않아요. 우리는 이런 걸 그렇게 안 해요."
          },
          {
            text: "Let's keep it quick. Everyone's read the doc, so we can just sign off on it.",
            text_ko: '빨리 끝내죠. 다들 문서 읽었으니까 그냥 승인하고 넘어가면 돼요.',
            reaction: 'Quick is fine, but we do need to talk it through first.',
            reaction_ko: '빨리 하는 건 좋은데, 먼저 같이 짚어 보긴 해야 해요.'
          },
          {
            text: "However you like, Maya. It's your meeting, so I'll just follow your lead.",
            text_ko: '편하신 대로 하세요, 마야. 마야 회의니까 저는 따라갈게요.',
            reaction: "It's your postmortem, Derek. You set the tone.",
            reaction_ko: '데릭이 쓴 사후 분석이잖아요. 분위기는 데릭이 정해요.'
          }
        ],
        reply_speaker: 'sam',
        reply_line: "Good, because I've been losing sleep over that certificate.",
        reply_ko: '다행이네요. 그 인증서 때문에 잠을 설쳤거든요.'
      },
      {
        speaker: 'sam',
        situation: 'Sam stares at the timeline on the screen: "8:57, certificate expires."',
        situation_ko: '샘이 화면의 타임라인을 물끄러미 봅니다. "8:57, 인증서 만료."',
        line: 'Be honest, though. It was my certificate. I should have caught it.',
        line_ko: '그래도 솔직히요. 제 인증서였잖아요. 제가 잡았어야 했어요.',
        prompt: 'Sam is beating himself up. Reassure him, and point out that the renewal email was going to a coworker who quit two years ago.',
        prompt_ko: '샘이 자책하고 있습니다. 그를 안심시키고, 갱신 알림 메일이 2년 전에 그만둔 직원에게 가고 있었다는 점을 짚어 주세요.',
        model: 'It could have happened to anyone. The renewal reminder went to someone who left two years ago.',
        model_ko: '누구라도 그럴 수 있었어요. 갱신 알림이 2년 전에 퇴사한 사람한테 가고 있었잖아요.',
        distractors: [
          {
            text: 'It could have happened to anyone. The renewal reminder went to Maya, and she was out that week.',
            text_ko: '누구라도 그럴 수 있었어요. 갱신 알림이 마야한테 갔는데, 마야가 그 주에 자리에 없었잖아요.',
            reaction: 'Wait, it went to Maya? I thought it went to some old inbox.',
            reaction_ko: '잠깐, 마야한테 갔다고요? 안 쓰는 옛날 메일함으로 간 줄 알았는데요.'
          },
          {
            text: "Well, yes, you probably should have caught it. But let's not dwell on it now.",
            text_ko: '뭐, 그렇죠, 잡았어야 했던 건 맞아요. 그래도 지금은 그 얘기에 매달리지 말죠.',
            reaction: 'Ouch. I thought this was supposed to be blameless.',
            reaction_ko: '아프네요. 누구 탓도 안 하기로 한 줄 알았는데.'
          },
          {
            text: "That's not important right now. Let's just get through the timeline first, okay?",
            text_ko: '그건 지금 중요하지 않아요. 일단 타임라인부터 끝까지 봐요, 알았죠?',
            reaction: "Right. Sorry. I'll just sit here and feel bad, then.",
            reaction_ko: '네. 죄송해요. 그럼 그냥 여기 앉아서 자책하고 있을게요.'
          }
        ],
        reply_speaker: 'sam',
        reply_line: "Yeah. An inbox nobody reads. That's the real bug.",
        reply_ko: '그러게요. 아무도 안 읽는 메일함. 그게 진짜 버그네요.'
      },
      {
        speaker: 'maya',
        situation: 'Maya scrolls to the section called "Causes".',
        situation_ko: '마야가 "원인" 항목으로 화면을 내립니다.',
        line: "So what's the root cause, as opposed to the trigger?",
        line_ko: '그럼 계기 말고 근본 원인은 뭐예요?',
        prompt: 'Separate what set the outage off from what really went wrong underneath.',
        prompt_ko: '장애를 터뜨린 것과, 그 밑에서 실제로 잘못된 것을 구분해서 말하세요.',
        model: 'The expired certificate was just the trigger. The root cause is that nobody owned the renewal, so it fell through the cracks.',
        model_ko: '만료된 인증서는 계기였을 뿐이에요. 근본 원인은 갱신을 맡은 사람이 없어서 그냥 빠져 버렸다는 거예요.',
        distractors: [
          {
            text: 'The root cause was the expired certificate itself. The trigger was that nobody owned the renewal, so it fell through the cracks.',
            text_ko: '근본 원인은 만료된 인증서 그 자체예요. 계기는 갱신을 맡은 사람이 없어서 그냥 빠져 버렸다는 거고요.',
            reaction: "Hmm, isn't that backwards? The expiry is what set it off.",
            reaction_ko: '음, 거꾸로 아니에요? 일을 터뜨린 건 만료잖아요.'
          },
          {
            text: "The root cause is that Sam didn't check his calendar. The expired certificate was just the trigger.",
            text_ko: '근본 원인은 샘이 달력을 확인하지 않은 거예요. 만료된 인증서는 계기였을 뿐이고요.',
            reaction: 'Derek, we just agreed to keep this blameless.',
            reaction_ko: '데릭, 방금 누구 탓도 안 하기로 했잖아요.'
          },
          {
            text: 'The certificate expired at 8:57, and the site was down for everyone until the backup kicked in.',
            text_ko: '인증서가 8시 57분에 만료됐고, 백업이 돌기 전까지 모두가 사이트를 못 썼어요.',
            reaction: "That's what happened. I'm asking why it happened.",
            reaction_ko: '그건 무슨 일이 있었는지고요. 저는 왜 일어났는지를 묻는 거예요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "No owner. That's the line I want at the top of the page.",
        reply_ko: '담당자 없음. 그 문장을 보고서 맨 위에 두고 싶네요.'
      },
      {
        speaker: 'maya',
        situation: 'She opens an empty table with three columns: what, who, when.',
        situation_ko: '그녀가 무엇, 누가, 언제의 세 칸짜리 빈 표를 엽니다.',
        line: 'Okay, action items. What do we do, who owns it, and by when?',
        line_ko: '좋아요, 조치 항목이요. 뭘 하고, 누가 맡고, 언제까지 해요?',
        prompt: 'Assign the two fixes: the shared renewal calendar goes to Sam, due Friday, and the expiry alert is yours.',
        prompt_ko: '두 가지 조치를 배정하세요. 공유 갱신 달력은 샘이 금요일까지, 만료 경보는 당신이 맡는다고요.',
        model: "Sam moves the renewals to a shared calendar by Friday, and I'll own the expiry alert.",
        model_ko: '샘이 금요일까지 갱신 일정을 공유 달력으로 옮기고, 만료 경보는 제가 맡을게요.',
        distractors: [
          {
            text: "Sam moves the renewals to a shared calendar by next month, and I'll own the expiry alert.",
            text_ko: '샘이 다음 달까지 갱신 일정을 공유 달력으로 옮기고, 만료 경보는 제가 맡을게요.',
            reaction: "Next month? That's a long time to leave it open. Can we tighten that?",
            reaction_ko: '다음 달이요? 그동안 열어 두기엔 너무 길어요. 좀 당길 수 있어요?'
          },
          {
            text: 'We should probably set up a shared calendar and some kind of alert at some point.',
            text_ko: '언젠가는 공유 달력이랑 무슨 경보 같은 걸 만들어 둬야 할 것 같아요.',
            reaction: "At some point isn't a date, Derek. Who, and when?",
            reaction_ko: "'언젠가'는 날짜가 아니에요, 데릭. 누가, 언제요?"
          },
          {
            text: "I'll take both, the calendar and the alert. It's faster if I just do it myself.",
            text_ko: '달력이랑 경보 둘 다 제가 할게요. 그냥 제가 하는 게 빨라요.',
            reaction: "Both? You've got enough on your plate. Let's spread it out.",
            reaction_ko: '둘 다요? 이미 할 일이 많잖아요. 나눠서 하죠.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Every item with a name and a date. I like it.',
        reply_ko: '항목마다 이름과 날짜가 있네요. 마음에 들어요.'
      },
      {
        speaker: 'maya',
        situation: 'One empty heading is left at the bottom of the page.',
        situation_ko: '보고서 맨 아래에 빈 제목 하나가 남아 있습니다.',
        line: 'Last section. Lessons learned?',
        line_ko: '마지막 항목이에요. 얻은 교훈은요?',
        prompt: "Sum up the lesson: everything hung on one weak spot, and the backup working was a fluke you can't plan around.",
        prompt_ko: '교훈을 정리하세요. 모든 게 약한 고리 하나에 걸려 있었고, 백업이 동작한 건 계획에 넣을 수 없는 요행이었다고요.',
        model: "In hindsight, we had a single point of failure. We were lucky the backup worked, and we shouldn't count on luck.",
        model_ko: '돌이켜 보면 단일 장애점이 있었어요. 백업이 동작한 건 운이 좋았던 거고, 운에 기대면 안 돼요.',
        distractors: [
          {
            text: "In hindsight, the system worked exactly as designed. The backup kicked in, so there's nothing big we need to change.",
            text_ko: '돌이켜 보면 시스템은 설계대로 정확히 동작했어요. 백업이 돌았으니까 크게 바꿀 건 없어요.',
            reaction: "Nothing to change? We got lucky, Derek. Let's not pretend otherwise.",
            reaction_ko: '바꿀 게 없다고요? 운이 좋았던 거예요, 데릭. 아닌 척하지 말죠.'
          },
          {
            text: "Lesson learned: IT needs to keep a much closer eye on certificates. That's really the whole story.",
            text_ko: '교훈은 IT 쪽이 인증서를 훨씬 더 잘 챙겨야 한다는 거예요. 사실 그게 전부예요.',
            reaction: 'That puts it all on Sam again. Try that one more time.',
            reaction_ko: '그러면 또 전부 샘 탓이 되잖아요. 다시 한번 말해 봐요.'
          },
          {
            text: 'In hindsight, we had a single point of failure. The backup failed too, so we were down all day.',
            text_ko: '돌이켜 보면 단일 장애점이 있었어요. 백업까지 실패해서 하루 종일 멈춰 있었고요.',
            reaction: 'Down all day? The backup kicked in. Check the timeline.',
            reaction_ko: '하루 종일요? 백업이 돌았잖아요. 타임라인 봐요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Well said. Send it to the team, and I'll share a summary with Summit Retail. Let me know if you have any questions.",
        reply_ko: '잘 말했어요. 팀에 공유해 줘요. 서밋 리테일에는 제가 요약본을 보낼게요. 궁금한 게 있으면 말해 줘요.'
      }
    ],
    phrases: [
      {
        id: 'dk_d8_postmortem.blameless',
        text: "Let's keep it blameless.",
        meaning_ko: '누구도 탓하지 않는 방식으로 해요.',
        note: 'A blameless postmortem asks "what failed?", not "who failed?", so people speak openly.',
        note_ko: 'blameless postmortem은 "누가 잘못했나"가 아니라 "무엇이 잘못됐나"를 물어서 사람들이 솔직하게 말할 수 있게 합니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d8_postmortem.happened_to_anyone',
        text: 'It could have happened to anyone.',
        meaning_ko: '누구에게나 일어날 수 있는 일이었어요.',
        note: 'Comforts someone who blames himself for a mistake.',
        note_ko: '실수를 자기 탓으로 여기는 사람을 위로하는 말입니다.',
        category: 'office'
      },
      {
        id: 'dk_d8_postmortem.in_hindsight',
        text: 'In hindsight, we had a single point of failure.',
        meaning_ko: '돌이켜 보면 단일 장애점이 있었어요.',
        note: '"In hindsight" = looking back now. A single point of failure is one part whose failure stops everything.',
        note_ko: 'in hindsight는 지금 돌이켜 보면이라는 뜻입니다. single point of failure는 그것 하나가 멈추면 전체가 멈추는 부분입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d8_postmortem.lessons_learned',
        text: 'Lessons learned?',
        meaning_ko: '배운 점은요?',
        note: 'The last part of a postmortem: what you will do differently next time.',
        note_ko: '사후 분석의 마지막 부분으로, 다음에는 무엇을 다르게 할지를 적습니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d8_postmortem.losing_sleep',
        text: "I've been losing sleep over it.",
        meaning_ko: '그것 때문에 잠을 설쳤어요.',
        note: '"Lose sleep over" something = worry about it a lot.',
        note_ko: 'lose sleep over는 무언가를 몹시 걱정한다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d8_postmortem.point_fingers',
        text: "We're not here to point fingers.",
        meaning_ko: '손가락질하려고 모인 게 아니에요.',
        note: '"Point fingers" = blame people.',
        note_ko: 'point fingers는 남을 탓한다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d8_postmortem.through_the_cracks',
        text: 'It fell through the cracks.',
        meaning_ko: '(챙기는 사람이 없어) 빠뜨리고 말았어요.',
        note: 'Said of a task that was forgotten because nobody was responsible for it.',
        note_ko: '책임지는 사람이 없어서 잊힌 일에 대해 씁니다.',
        category: 'office'
      },
      {
        id: 'dk_d8_postmortem.who_owns_it',
        text: 'Who owns it, and by when?',
        meaning_ko: '누가 맡고, 언제까지 하나요?',
        note: '"Own" a task = be the one person responsible for it.',
        note_ko: '일을 own한다는 것은 그 일을 책임지는 한 사람이 된다는 뜻입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'dk_d9_delegate',
    title: 'Letting go of a task',
    title_ko: '일을 맡기기',
    place: 'office_desk',
    npc: 'jun',
    day_from: 9,
    day_to: 9,
    time_from: '09:00',
    time_to: '12:30',
    summary: 'You were about to build the certificate alert yourself. Hand it to Jun instead: say what done looks like, when it is due, and how much freedom he has.',
    summary_ko: '인증서 경보를 직접 만들려던 참이었습니다. 대신 준에게 맡기세요. 완료의 기준이 무엇인지, 언제까지인지, 얼마나 자유롭게 해도 되는지 말해 주세요.',
    sort: 10,
    tags: 'coworker,delegating,mentoring,leadership',
    calendar: { day: 9, time: '10:30', title: 'Hand the certificate alert to Jun', title_ko: '준에게 인증서 경보 맡기기' },
    turns: [
      {
        speaker: 'jun',
        situation: "Tuesday morning. Rain streaks the office windows. You had already opened the editor to write the certificate alert yourself when you remembered what Maya said about delegating. You walk over to Jun's desk.",
        situation_ko: '화요일 아침입니다. 사무실 창문에 빗줄기가 흘러내립니다. 인증서 경보를 직접 만들려고 편집기를 열었다가, 일을 맡기라던 마야의 말이 떠올랐습니다. 준의 자리로 갑니다.',
        line: 'Morning, Derek! Did you need something?',
        line_ko: '안녕하세요, 데릭! 뭐 필요한 거 있으세요?',
        prompt: 'Hand him a task: the certificate expiry alert that came out of the postmortem.',
        prompt_ko: '그에게 일을 하나 맡기세요. 사후 분석에서 나온 인증서 만료 경보예요.',
        model: "I've got something I'd like you to take on: the certificate expiry alert from the postmortem.",
        model_ko: '준이 맡아 줬으면 하는 일이 있어요. 사후 분석에서 나온 인증서 만료 경보요.',
        distractors: [
          {
            text: "I've got something I'd like you to take on: the shared renewal calendar from the postmortem.",
            text_ko: '준이 맡아 줬으면 하는 일이 있어요. 사후 분석에서 나온 공유 갱신 달력이요.',
            reaction: 'The calendar? I thought Sam was doing that one.',
            reaction_ko: '달력이요? 그건 샘이 하는 줄 알았는데요.'
          },
          {
            text: "Drop whatever you're working on right now. You're building the certificate alert, starting today.",
            text_ko: '지금 하던 거 다 내려놔요. 오늘부터 인증서 경보 만드는 거예요, 당장.',
            reaction: 'Oh. Okay. But what about the Summit Retail work?',
            reaction_ko: '아. 네. 그런데 서밋 리테일 일은요?'
          },
          {
            text: "I'm building the certificate expiry alert. Want to sit with me and watch how I do it?",
            text_ko: '제가 인증서 만료 경보를 만들 건데요. 옆에 앉아서 어떻게 하는지 볼래요?',
            reaction: "Sure, I can watch. You don't need me to do anything?",
            reaction_ko: '네, 볼 수는 있어요. 제가 할 건 없는 거예요?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Me? Sure! But I've never touched the monitoring setup.",
        reply_ko: '저요? 좋아요! 그런데 모니터링 쪽은 한 번도 건드려 본 적이 없어요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun opens a new page in his notebook.',
        situation_ko: '준이 공책의 새 페이지를 폅니다.',
        line: "What exactly do you need? I don't want to build the wrong thing.",
        line_ko: '정확히 뭐가 필요하세요? 엉뚱한 걸 만들고 싶지 않아서요.',
        prompt: "Spell out the finish line: thirty days' warning before any certificate expires, posted to the on-call channel.",
        prompt_ko: '어디까지 하면 끝인지 분명히 말하세요. 어떤 인증서든 만료 30일 전에 알리고, 온콜 채널에 올라오게 하는 거예요.',
        model: "Here's what done looks like: an alert that fires thirty days before any certificate expires and posts to the on-call channel.",
        model_ko: '완료 기준은 이거예요. 어떤 인증서든 만료 30일 전에 울려서 온콜 채널에 올라오는 경보요.',
        distractors: [
          {
            text: "Here's what done looks like: an alert that fires three days before any certificate expires and sends an email to Sam's inbox.",
            text_ko: '완료 기준은 이거예요. 어떤 인증서든 만료 사흘 전에 울려서 샘의 메일함으로 메일이 가는 경보요.',
            reaction: "Three days? Isn't that cutting it a little close?",
            reaction_ko: '사흘이요? 좀 빠듯하지 않아요?'
          },
          {
            text: "Just something that warns us before certificates expire. You'll figure out the details as you go.",
            text_ko: '그냥 인증서 만료되기 전에 알려 주는 거면 돼요. 세부 사항은 하면서 알아서 정해요.',
            reaction: "Okay... but how will I know when it's done?",
            reaction_ko: '네... 그런데 언제 끝난 건지 어떻게 알죠?'
          },
          {
            text: 'Build it exactly the way I would: copy my disk-space alert line by line and just change the names.',
            text_ko: '제가 할 방식 그대로 만들어요. 제 디스크 용량 경보를 한 줄씩 복사해서 이름만 바꾸면 돼요.',
            reaction: "Line by line? Um, okay. I thought I'd get to design it.",
            reaction_ko: '한 줄씩이요? 음, 네. 제가 설계해 보는 줄 알았어요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Thirty days before, to the on-call channel. That's clear.",
        reply_ko: '30일 전에, 온콜 채널로. 분명하네요.'
      },
      {
        speaker: 'jun',
        situation: 'He writes it down and underlines it.',
        situation_ko: '그가 받아 적고 밑줄을 긋습니다.',
        line: "When do you need it by? I'm flying to Ridgeport on Thursday.",
        line_ko: '언제까지 필요하세요? 저 목요일에 리지포트로 출장 가거든요.',
        prompt: 'Take the pressure off: give him until the end of next week, and remind him the client work comes first.',
        prompt_ko: '부담을 덜어 주세요. 다음 주 말까지 시간을 주고, 고객 일이 먼저라는 걸 상기시켜 주세요.',
        model: 'No rush. The end of next week is fine. The Summit Retail work takes priority.',
        model_ko: '급하지 않아요. 다음 주 말까지면 돼요. 서밋 리테일 일이 먼저예요.',
        distractors: [
          {
            text: "I'd like it before Thursday, so it's done before your trip. Can you swing that?",
            text_ko: '목요일 전에 됐으면 좋겠어요. 출장 가기 전에 끝나게요. 할 수 있겠어요?',
            reaction: "Before Thursday? I'll try, but I've still got the trip to prep.",
            reaction_ko: '목요일 전이요? 해 볼게요. 그런데 출장 준비도 남았어요.'
          },
          {
            text: 'No rush. The end of next week is fine. Just put it ahead of the Summit Retail stuff.',
            text_ko: '급하지 않아요. 다음 주 말까지면 돼요. 대신 서밋 리테일 일보다 먼저 해요.',
            reaction: "Ahead of Summit Retail? Are you sure? Priya won't like that.",
            reaction_ko: '서밋 리테일보다 먼저요? 정말요? 프리야가 싫어할 텐데요.'
          },
          {
            text: 'Ridgeport, huh? Nice. Is that the Summit Retail trip Priya mentioned?',
            text_ko: '리지포트요? 좋네요. 프리야가 말한 그 서밋 리테일 출장이에요?',
            reaction: 'Yes, that one. But when do you need the alert?',
            reaction_ko: '네, 그거요. 그런데 경보는 언제까지 필요하세요?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Got it. Trip first, alert second.',
        reply_ko: '알겠어요. 출장이 먼저, 경보는 그다음.'
      },
      {
        speaker: 'jun',
        situation: 'Jun taps his pen on the notebook.',
        situation_ko: '준이 펜으로 공책을 톡톡 칩니다.',
        line: 'How should I build it? Is there a design you want me to follow?',
        line_ko: '어떻게 만들까요? 따랐으면 하는 설계가 있으세요?',
        prompt: 'Let him decide how to build it himself, and let him know he can come to you if he gets stuck.',
        prompt_ko: '어떻게 만들지는 그가 직접 정하게 하고, 막히면 당신에게 오면 된다고 알려 주세요.',
        model: "How you build it is your call. I'm here if you hit a wall.",
        model_ko: '어떻게 만들지는 준이 정해요. 막히면 제가 있으니까요.',
        distractors: [
          {
            text: 'Follow my design doc to the letter, and run every change by me first.',
            text_ko: '제 설계 문서를 그대로 따르고, 바꿀 땐 먼저 저한테 물어봐요.',
            reaction: 'Every change? Okay... I thought you said I could own it.',
            reaction_ko: '뭘 바꾸든요? 네... 제가 맡는 거라고 하신 줄 알았어요.'
          },
          {
            text: "That's up to you. Don't come to me with it, though. I'm swamped.",
            text_ko: '그건 알아서 해요. 대신 저한테 가져오진 마요. 저 정신없어요.',
            reaction: "Oh. Okay. I'll try not to bother you.",
            reaction_ko: '아. 네. 귀찮게 안 해 드릴게요.'
          },
          {
            text: "There's a design review every Monday. Ask Maya to add you to it.",
            text_ko: '매주 월요일에 설계 리뷰가 있어요. 마야한테 넣어 달라고 해요.',
            reaction: 'Sure, but do you have a design in mind or not?',
            reaction_ko: '네, 그런데 생각해 두신 설계가 있다는 거예요, 없다는 거예요?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Really? Okay. I'll sketch something and show you.",
        reply_ko: '정말요? 알겠어요. 구상을 그려서 보여 드릴게요.'
      },
      {
        speaker: 'jun',
        situation: 'He looks a little worried that he will let you down.',
        situation_ko: '그는 당신을 실망시킬까 봐 조금 걱정하는 눈치입니다.',
        line: 'Should I send you an update every day?',
        line_ko: '매일 진행 상황을 보내 드릴까요?',
        prompt: 'Daily reports would be overkill. Suggest a single check-in on Wednesday afternoon, before his trip.',
        prompt_ko: '매일 보고는 지나칩니다. 그가 출장 가기 전인 수요일 오후에 한 번만 이야기하자고 제안하세요.',
        model: "No need for daily updates. Let's touch base Wednesday afternoon, before you leave.",
        model_ko: '매일 보고할 필요는 없어요. 수요일 오후에, 떠나기 전에 잠깐 얘기해요.',
        distractors: [
          {
            text: "No need for daily updates. Let's touch base Thursday afternoon, after you land.",
            text_ko: '매일 보고할 필요는 없어요. 목요일 오후에, 도착하고 나서 잠깐 얘기해요.',
            reaction: "Thursday? I'll be in meetings in Ridgeport all afternoon.",
            reaction_ko: '목요일이요? 그날 오후엔 리지포트에서 내내 회의예요.'
          },
          {
            text: 'Yes, every day, at the end of the day, in writing. I want to know exactly where it stands.',
            text_ko: '네, 매일 퇴근 전에 글로 보내요. 어디까지 됐는지 정확히 알고 싶어요.',
            reaction: "Every day? Okay... I'll set a reminder.",
            reaction_ko: '매일이요? 네... 알림 맞춰 둘게요.'
          },
          {
            text: "Don't bother me with updates. Just tell me when it's done, okay?",
            text_ko: '진행 상황으로 귀찮게 하지 마요. 다 되면 그때 말해요, 알았죠?',
            reaction: "Oh. Okay. I'll just figure it out on my own, then.",
            reaction_ko: '아. 네. 그럼 혼자 알아서 해 볼게요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Wednesday works. Thanks for trusting me with this, Derek.',
        reply_ko: '수요일 좋아요. 이 일을 믿고 맡겨 줘서 고마워요, 데릭.'
      }
    ],
    phrases: [
      {
        id: 'dk_d9_delegate.done_looks_like',
        text: "Here's what done looks like.",
        meaning_ko: '완료의 기준은 이래요.',
        note: 'Describes the finished result, so both people expect the same thing.',
        note_ko: '완성된 모습을 설명해서 두 사람이 같은 결과를 기대하게 합니다.',
        category: 'office'
      },
      {
        id: 'dk_d9_delegate.hit_a_wall',
        text: "I'm here if you hit a wall.",
        meaning_ko: '막히면 제가 있어요.',
        note: '"Hit a wall" = reach a point where you cannot make progress.',
        note_ko: 'hit a wall은 더 나아갈 수 없는 지점에 이른다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d9_delegate.no_rush',
        text: 'No rush.',
        meaning_ko: '급하지 않아요.',
        note: 'There is no hurry. Add a date anyway, so "no rush" does not become "never".',
        note_ko: '서두를 필요 없다는 뜻입니다. 그래도 날짜를 덧붙여야 "언젠가"가 되지 않습니다.',
        category: 'office'
      },
      {
        id: 'dk_d9_delegate.take_on',
        text: "I've got something I'd like you to take on.",
        meaning_ko: '맡아 줬으면 하는 일이 있어요.',
        note: '"Take on" = accept a task or responsibility.',
        note_ko: 'take on은 일이나 책임을 맡는다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d9_delegate.takes_priority',
        text: 'The Summit Retail work takes priority.',
        meaning_ko: '서밋 리테일 일이 우선이에요.',
        note: '"Take priority" = be more important and come first.',
        note_ko: 'take priority는 더 중요해서 먼저 한다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d9_delegate.touch_base',
        text: "Let's touch base Wednesday afternoon.",
        meaning_ko: '수요일 오후에 잠깐 이야기해요.',
        note: '"Touch base" = talk briefly to share where things are. From baseball.',
        note_ko: 'touch base는 상황을 공유하려고 짧게 이야기한다는 뜻입니다. 야구에서 온 말입니다.',
        category: 'office'
      },
      {
        id: 'dk_d9_delegate.trusting_me_with',
        text: 'Thanks for trusting me with this.',
        meaning_ko: '이 일을 믿고 맡겨 줘서 고마워요.',
        note: '"Trust someone with" a task = believe they can handle it.',
        note_ko: 'trust someone with는 그 사람이 해낼 수 있다고 믿고 맡긴다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d9_delegate.your_call',
        text: 'How you build it is your call.',
        meaning_ko: '어떻게 만들지는 당신이 정해요.',
        note: "\"It's your call\" = you decide. Gives the other person real ownership.",
        note_ko: "\"It's your call\"은 당신이 결정하라는 뜻입니다. 상대에게 실제 권한을 줍니다.",
        category: 'office'
      }
    ]
  },
  {
    id: 'dk_d9_lunch',
    title: 'Ordering in on a rainy day',
    title_ko: '비 오는 날 배달 시켜 먹기',
    place: 'office_kitchen',
    npc: 'sam',
    day_from: 9,
    day_to: 9,
    time_from: '11:30',
    time_to: '14:30',
    summary: 'Nobody wants to go out in this rain. Go in on a pizza with Sam: agree on the toppings, split the bill, and get change for a twenty.',
    summary_ko: '이런 비에 나가고 싶은 사람은 없습니다. 샘과 돈을 모아 피자를 시키세요. 토핑을 정하고, 값을 나누고, 20달러짜리를 거슬러 받으세요.',
    reward: -13,
    energy: 40,
    sort: 20,
    tags: 'food,lunch,small-talk,money',
    calendar: { day: 9, time: '12:00', title: 'Lunch in the office kitchen', title_ko: '탕비실에서 점심' },
    turns: [
      {
        speaker: 'sam',
        situation: 'Noon. Rain is hammering the kitchen windows. Sam stands there with an empty mug, looking out at the wet parking lot.',
        situation_ko: '정오입니다. 비가 탕비실 창문을 세차게 두드립니다. 샘이 빈 머그잔을 들고 젖은 주차장을 내다보고 있습니다.',
        line: 'Look at that. I was going to walk to the taco truck, but no way am I going out in this.',
        line_ko: '저것 좀 봐요. 타코 트럭까지 걸어가려고 했는데, 이 날씨엔 절대 못 나가요.',
        prompt: "You don't want to go out in this either. Suggest getting food delivered and sharing one with him.",
        prompt_ko: '당신도 이 비에 나가기 싫습니다. 음식을 배달시키고 같이 하나 나눠 먹자고 하세요.',
        model: "Me neither. Let's order in. Want to go in on a pizza?",
        model_ko: '저도요. 시켜 먹어요. 피자 하나 같이 시킬래요?',
        distractors: [
          {
            text: "Come on, it's just water. Grab an umbrella and let's walk over.",
            text_ko: '에이, 그냥 물이잖아요. 우산 챙겨서 같이 걸어가요.',
            reaction: "In this? You're braver than me.",
            reaction_ko: '이 비에요? 저보다 용감하시네요.'
          },
          {
            text: "Me neither. The taco truck delivers, right? Let's order from them.",
            text_ko: '저도요. 타코 트럭도 배달해 주죠? 거기서 시켜요.',
            reaction: "The truck? They don't deliver. Ever.",
            reaction_ko: '트럭이요? 거긴 배달 안 해요. 절대로요.'
          },
          {
            text: "Me neither. I'm ordering a pizza for myself. Good luck out there.",
            text_ko: '저도요. 저는 혼자 피자 시킬 거예요. 나가는 거 잘해 봐요.',
            reaction: "Wow. Okay. I'll just eat crackers, then.",
            reaction_ko: '와. 네. 그럼 저는 크래커나 먹을게요.'
          }
        ],
        reply_speaker: 'sam',
        reply_line: 'You read my mind. The place on Lake Avenue delivers.',
        reply_ko: '제 마음을 읽었네요. 레이크 애비뉴에 있는 가게가 배달해 줘요.'
      },
      {
        speaker: 'sam',
        situation: 'Sam opens the menu on his phone.',
        situation_ko: '샘이 전화기로 메뉴를 엽니다.',
        line: "What do you want on it? I'm a pepperoni guy.",
        line_ko: '뭐 올릴래요? 저는 페퍼로니파예요.',
        prompt: 'Meet him halfway on toppings: his pepperoni on one side, vegetables on the other, and no olives for you.',
        prompt_ko: '토핑은 서로 양보하세요. 한쪽은 그가 좋아하는 페퍼로니, 다른 쪽은 채소로 하고, 당신은 올리브를 빼고 싶어요.',
        model: "I'm not picky. How about half and half? Half pepperoni, half veggie. Just hold the olives.",
        model_ko: '저는 안 가려요. 반반 어때요? 반은 페퍼로니, 반은 채소로요. 올리브만 빼고요.',
        distractors: [
          {
            text: "I'm not picky. How about half and half? Half pepperoni, half veggie. Extra olives on mine.",
            text_ko: '저는 안 가려요. 반반 어때요? 반은 페퍼로니, 반은 채소로요. 제 쪽엔 올리브 듬뿍이요.',
            reaction: 'Extra olives? I thought you hated olives.',
            reaction_ko: '올리브 듬뿍이요? 올리브 싫어하는 줄 알았는데요.'
          },
          {
            text: "Pepperoni again? Let's get something good for once. All veggie, no meat at all.",
            text_ko: '또 페퍼로니요? 이번엔 좀 괜찮은 거 먹어요. 전부 채소로, 고기는 빼고요.',
            reaction: "Hey, pepperoni is good. Can't we meet halfway?",
            reaction_ko: '에이, 페퍼로니 맛있잖아요. 중간에서 만나면 안 돼요?'
          },
          {
            text: "I'm not picky. Do they have a lunch special? Maybe wings, or a sub instead?",
            text_ko: '저는 안 가려요. 거기 점심 특선 있어요? 아니면 윙이나 샌드위치는요?',
            reaction: 'Wings? I thought we were doing pizza.',
            reaction_ko: '윙이요? 피자 먹기로 한 줄 알았는데요.'
          }
        ],
        reply_speaker: 'sam',
        reply_line: 'Half and half, no olives. A large should do it.',
        reply_ko: '반반에 올리브 빼고. 라지면 충분하겠네요.'
      },
      {
        speaker: 'sam',
        situation: 'He adds a large pizza to the cart. The total comes up.',
        situation_ko: '그가 라지 피자를 장바구니에 담습니다. 합계가 나옵니다.',
        line: "Okay, it's twenty-two with tax and delivery, plus the tip. Want to split it?",
        line_ko: '자, 세금이랑 배달비 포함해서 22달러에 팁 따로예요. 나눠 낼래요?',
        prompt: 'Go fifty-fifty with him, tip included.',
        prompt_ko: '팁까지 포함해서 반반 내자고 하세요.',
        model: "Sure, let's split it down the middle. I'll chip in for the tip, too.",
        model_ko: '좋아요, 딱 반씩 내요. 팁도 같이 보탤게요.',
        distractors: [
          {
            text: "Sure, let's split it down the middle. But you tip. The driver doesn't need much.",
            text_ko: '반반 내요. 근데 팁은 샘이 내요. 조금만 줘도 돼요.',
            reaction: "Huh. It's raining sideways out there. The driver's earning it.",
            reaction_ko: '흠. 밖에 비가 옆으로 들이치는데요. 기사님이 고생하시는 거죠.'
          },
          {
            text: "Sure, down the middle. So that's eight each, tip and all?",
            text_ko: '좋아요, 반반이요. 그럼 팁까지 해서 한 사람에 8달러죠?',
            reaction: "Eight? It's twenty-two before the tip, Derek.",
            reaction_ko: '8달러요? 팁 빼고도 22달러예요, 데릭.'
          },
          {
            text: "No, I'll cover the whole thing. You can get the next one.",
            text_ko: '아니요, 제가 다 낼게요. 다음에 샘이 사요.',
            reaction: "No way. Let's split it. You paid last time.",
            reaction_ko: '안 돼요. 나눠 내요. 지난번에 데릭이 냈잖아요.'
          }
        ],
        reply_speaker: 'sam',
        reply_line: "Then it's thirteen each with a four-dollar tip. Easy.",
        reply_ko: '그럼 팁 4달러를 넣어서 한 사람에 13달러네요. 간단하죠.'
      },
      {
        speaker: 'sam',
        situation: 'Sam pays with his card. You open your wallet and find a single bill.',
        situation_ko: '샘이 자기 카드로 결제합니다. 지갑을 열어 보니 지폐가 한 장뿐입니다.',
        line: 'I put it on my card. Pay me back whenever.',
        line_ko: '제 카드로 냈어요. 아무 때나 주세요.',
        prompt: 'You want to pay him now, but your only bill is a twenty.',
        prompt_ko: '지금 갚고 싶은데, 가진 지폐가 20달러짜리 한 장뿐이에요.',
        model: 'All I have on me is a twenty. Can you break it?',
        model_ko: '가진 게 20달러짜리 한 장뿐이에요. 잔돈으로 바꿔 줄 수 있어요?',
        distractors: [
          {
            text: 'All I have on me is a ten. Can you break it?',
            text_ko: '가진 게 10달러짜리 한 장뿐이에요. 바꿔 줄 수 있어요?',
            reaction: 'A ten? That looks like a twenty to me.',
            reaction_ko: '10달러요? 제 눈엔 20달러짜리로 보이는데요.'
          },
          {
            text: "Cool. I'll pay you back next week sometime, then.",
            text_ko: '좋아요. 그럼 다음 주 중에 언제 한번 갚을게요.',
            reaction: "Sure, whenever. Just don't forget.",
            reaction_ko: '네, 아무 때나요. 잊지만 마세요.'
          },
          {
            text: 'You should always carry small bills. Got change?',
            text_ko: '작은 돈은 늘 갖고 다녀야 해요. 거스름돈 있어요?',
            reaction: 'Thanks, Dad. Do you need change or not?',
            reaction_ko: '네, 아버지. 잔돈 필요하다는 거예요, 아니에요?'
          }
        ],
        reply_speaker: 'sam',
        reply_line: "Let me see. A five and two ones. Here's seven back.",
        reply_ko: '어디 봐요. 5달러 한 장에 1달러 두 장. 7달러 거슬러 드릴게요.'
      },
      {
        speaker: 'sam',
        situation: 'Half an hour later the pizza is on the kitchen table, and the rain is still falling. Sam lowers his voice.',
        situation_ko: '30분 뒤 피자가 탕비실 테이블에 놓였고 비는 여전히 내립니다. 샘이 목소리를 낮춥니다.',
        line: 'So, off the record: is the new guy going to survive the Summit Retail project?',
        line_ko: '그래서, 여기서만 하는 얘긴데요. 그 신입, 서밋 리테일 프로젝트에서 버틸 수 있을까요?',
        prompt: 'Stand up for Jun: you have no doubts about him.',
        prompt_ko: '준의 편을 들어 주세요. 당신은 그를 전혀 의심하지 않아요.',
        model: "He'll be fine. He's sharp, and he's more than holding his own.",
        model_ko: '괜찮을 거예요. 똑똑하고, 제 몫 이상을 거뜬히 해내고 있어요.',
        distractors: [
          {
            text: "Between us? He's struggling. I've been redoing half his code.",
            text_ko: '우리끼리 얘긴데요? 힘들어해요. 코드 절반은 제가 다시 짜고 있어요.',
            reaction: 'Really? Huh. He seems so on top of things.',
            reaction_ko: '정말요? 흠. 일을 잘 챙기는 것 같던데요.'
          },
          {
            text: 'The project will be fine. The pilot is only five stores.',
            text_ko: '프로젝트는 괜찮을 거예요. 시범 운영은 매장 다섯 곳뿐이거든요.',
            reaction: 'Sure, but I was asking about Jun.',
            reaction_ko: '그렇겠죠. 그런데 저는 준 얘기를 물은 거예요.'
          },
          {
            text: "Hard to say. He's still new, and Summit Retail is a tough client.",
            text_ko: '모르겠어요. 아직 신입이고, 서밋 리테일은 까다로운 고객이라서요.',
            reaction: "Ouch. You're not exactly a fan, huh?",
            reaction_ko: '아이고. 썩 마음에 들진 않나 보네요?'
          }
        ],
        reply_speaker: 'sam',
        reply_line: 'Good. I like him. He actually reads my emails.',
        reply_ko: '다행이네요. 저는 그 친구가 좋아요. 제 메일을 진짜로 읽거든요.'
      }
    ],
    phrases: [
      {
        id: 'dk_d9_lunch.break_a_twenty',
        text: 'Can you break a twenty?',
        meaning_ko: '20달러짜리 거슬러 줄 수 있어요?',
        note: '"A twenty" = a $20 bill. "Break" it = change it into smaller bills.',
        note_ko: 'a twenty는 20달러 지폐입니다. break는 작은 지폐로 바꾼다는 뜻입니다.',
        category: 'money'
      },
      {
        id: 'dk_d9_lunch.chip_in',
        text: "I'll chip in for the tip.",
        meaning_ko: '팁은 저도 보탤게요.',
        note: '"Chip in" = give some money toward a shared cost.',
        note_ko: 'chip in은 함께 내는 비용에 돈을 보탠다는 뜻입니다.',
        category: 'money'
      },
      {
        id: 'dk_d9_lunch.down_the_middle',
        text: "Let's split it down the middle.",
        meaning_ko: '딱 반씩 나눠요.',
        note: 'Each person pays exactly half.',
        note_ko: '각자 정확히 절반씩 낸다는 뜻입니다.',
        category: 'money'
      },
      {
        id: 'dk_d9_lunch.go_in_on',
        text: 'Want to go in on a pizza?',
        meaning_ko: '같이 돈 내서 피자 시킬래요?',
        note: '"Go in on" something = buy it together and share the cost.',
        note_ko: 'go in on은 함께 사서 값을 나눠 낸다는 뜻입니다.',
        category: 'food'
      },
      {
        id: 'dk_d9_lunch.hold_the_olives',
        text: 'Just hold the olives.',
        meaning_ko: '올리브만 빼 주세요.',
        note: '"Hold the …" = leave that ingredient out.',
        note_ko: '"Hold the …"는 그 재료를 빼 달라는 뜻입니다.',
        category: 'food'
      },
      {
        id: 'dk_d9_lunch.not_picky',
        text: "I'm not picky.",
        meaning_ko: '저는 가리는 거 없어요.',
        note: '"Picky" = hard to please, especially about food.',
        note_ko: 'picky는 특히 음식에 까다롭다는 뜻입니다.',
        category: 'food'
      },
      {
        id: 'dk_d9_lunch.off_the_record',
        text: 'Off the record …',
        meaning_ko: '여기서만 하는 얘긴데요 …',
        note: 'Said before something that should not be repeated to others.',
        note_ko: '다른 사람에게 옮기면 안 되는 말을 하기 전에 씁니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d9_lunch.order_in',
        text: "Let's order in.",
        meaning_ko: '배달시켜 먹어요.',
        note: '"Order in" = have food delivered instead of going out.',
        note_ko: 'order in은 나가지 않고 음식을 배달시킨다는 뜻입니다.',
        category: 'food'
      }
    ]
  },
  {
    id: 'dk_d9_review',
    title: 'The reviewer gets reviewed',
    title_ko: '리뷰어가 리뷰를 받다',
    place: 'office_desk_team',
    npc: 'jun',
    day_from: 9,
    day_to: 10,
    time_from: '13:00',
    time_to: '18:30',
    summary: 'You and Jun trade code reviews. This time he has comments on your pull request. Invite honest feedback, take it graciously, and disagree on one point without getting defensive.',
    summary_ko: '준과 코드 리뷰를 주고받습니다. 이번에는 그가 당신의 풀 리퀘스트에 의견을 냅니다. 솔직한 피드백을 청하고, 기분 좋게 받아들이고, 한 가지는 방어적이지 않게 반대하세요.',
    sort: 30,
    tags: 'dev,code-review,feedback,disagreeing',
    calendar: { day: 9, time: '15:00', title: 'Code review swap with Jun', title_ko: '준과 코드 리뷰 교환' },
    turns: [
      {
        speaker: 'jun',
        situation: 'Jun comes over to your desk with his laptop. His inventory API pull request is ready.',
        situation_ko: '준이 노트북을 들고 당신 자리로 옵니다. 그의 재고 API 풀 리퀘스트가 준비됐습니다.',
        line: 'Hi, Derek. Do you have a few minutes to review my pull request?',
        line_ko: '안녕하세요, 데릭. 제 풀 리퀘스트 리뷰해 주실 시간 좀 있으세요?',
        prompt: 'Agree to look at it, tell him how to get it to you, and that you need twenty minutes.',
        prompt_ko: '봐 주겠다고 하고, 어떻게 보내면 되는지와 20분이 필요하다는 걸 말하세요.',
        model: 'Sure, send me the link. Give me twenty minutes.',
        model_ko: '그럼요, 링크 보내 줘요. 20분만 줘요.',
        distractors: [
          {
            text: "Not now. Just merge it, and I'll look at it later.",
            text_ko: '지금은 안 돼요. 그냥 머지해요. 나중에 볼게요.',
            reaction: "Merge it first? That doesn't feel right.",
            reaction_ko: '먼저 머지하라고요? 그건 좀 아닌 것 같은데요.'
          },
          {
            text: 'Sure, send me the link. Give me two hours or so.',
            text_ko: '그럼요, 링크 보내 줘요. 두 시간쯤 줘요.',
            reaction: 'Two hours? Oh, okay. I thought it was a small one.',
            reaction_ko: '두 시간이요? 아, 네. 작은 건 줄 알았어요.'
          },
          {
            text: 'Sure. Did you get a chance to look at mine yet?',
            text_ko: '그래요. 그런데 제 것도 봤어요?',
            reaction: 'Yes, I did. But could you look at mine first?',
            reaction_ko: '네, 봤어요. 그런데 제 것부터 봐 주실 수 있어요?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Thanks! I looked at yours, too. The gift card one.',
        reply_ko: '고마워요! 저도 데릭 것을 봤어요. 기프트 카드 풀 리퀘스트요.'
      },
      {
        speaker: 'jun',
        situation: 'Twenty minutes later you have left your comments on his code: good overall, one function that does too much. Now it is your turn, and Jun looks like he is holding something back.',
        situation_ko: '20분 뒤, 그의 코드에 코멘트를 남겼습니다. 전반적으로 좋고, 함수 하나가 너무 많은 일을 합니다. 이제 당신 차례인데, 준은 뭔가 하고 싶은 말을 참는 눈치입니다.',
        line: 'Yours looks great. Really.',
        line_ko: '데릭 거 좋아 보여요. 진짜로요.',
        prompt: "You can tell he's holding something back. Get him to say what he really thinks.",
        prompt_ko: '그가 뭔가 말을 아끼고 있다는 게 보입니다. 진짜 생각을 말하게 하세요.',
        model: "Don't hold back. Be honest: is there anything you'd change?",
        model_ko: '망설이지 말아요. 솔직하게요. 바꾸고 싶은 거 있어요?',
        distractors: [
          {
            text: "Thanks! I worked hard on it. Okay, let's merge it, then.",
            text_ko: '고마워요! 공들였거든요. 좋아요, 그럼 머지하죠.',
            reaction: "Oh. Um, sure. If you're sure.",
            reaction_ko: '아. 음, 네. 확실하시다면요.'
          },
          {
            text: "Great? Come on. If you found nothing, you didn't read it.",
            text_ko: '좋다고요? 에이. 아무것도 못 찾았으면 안 읽은 거죠.',
            reaction: "I did read it! I just... didn't want to be rude.",
            reaction_ko: '읽었어요! 그냥... 무례해 보이기 싫었어요.'
          },
          {
            text: "Don't hold back. Anything in my inventory API code you'd change?",
            text_ko: '망설이지 말아요. 제 재고 API 코드에서 바꿀 거 있어요?',
            reaction: 'The inventory API is mine. You mean the gift card one?',
            reaction_ko: '재고 API는 제 거잖아요. 기프트 카드 거 말씀이시죠?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Well, one small thing. There's a variable called data2. Last week you told me that was a bad name.",
        reply_ko: '음, 사소한 거 하나요. data2라는 변수가 있어요. 지난주에 저한테 그건 나쁜 이름이라고 하셨잖아요.'
      },
      {
        speaker: 'jun',
        situation: 'He is right. It was a placeholder, and you forgot about it. Jun watches your face.',
        situation_ko: '그의 말이 맞습니다. 임시로 붙여 놓고 잊어버린 이름입니다. 준이 당신의 표정을 살핍니다.',
        line: 'Sorry. Is it okay that I said that?',
        line_ko: '죄송해요. 제가 그런 말 해도 괜찮은 거죠?',
        prompt: "He caught you breaking your own rule. Own it with good humor, and say you'll fix the name.",
        prompt_ko: '당신이 스스로 정한 규칙을 어긴 걸 그가 잡아냈습니다. 유머 있게 인정하고, 이름을 고치겠다고 하세요.',
        model: "Guilty as charged. I should practice what I preach. I'll rename it.",
        model_ko: '딱 걸렸네요. 남한테 한 말은 저부터 지켜야죠. 이름 바꿀게요.',
        distractors: [
          {
            text: "It's just a placeholder. Nobody's going to read that part anyway.",
            text_ko: '그냥 임시 이름이에요. 어차피 그 부분은 아무도 안 읽어요.',
            reaction: 'Oh. Okay. But you told me placeholders always stick.',
            reaction_ko: '아. 네. 그런데 임시 이름은 꼭 그대로 남는다고 하셨잖아요.'
          },
          {
            text: "Well, it's different for me. I know what data2 means.",
            text_ko: '음, 저는 경우가 달라요. data2가 뭔지 저는 알거든요.',
            reaction: "Um... that's what I said last week, too.",
            reaction_ko: '음... 저도 지난주에 똑같이 말했는데요.'
          },
          {
            text: "You're right. I'll leave a comment explaining it instead of renaming.",
            text_ko: '맞아요. 이름은 그대로 두고 설명하는 주석을 달게요.',
            reaction: 'A comment? But you told me to just pick a better name.',
            reaction_ko: '주석이요? 그냥 더 나은 이름을 고르라고 하셨잖아요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Phew. I was nervous about reviewing a senior developer.',
        reply_ko: '휴. 시니어 개발자를 리뷰하려니 긴장했어요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun scrolls to his next comment, a little braver now.',
        situation_ko: '준이 조금 용기를 얻어 다음 코멘트로 내려갑니다.',
        line: 'One more. You call the payment service for the balance every single time. I think we should cache it.',
        line_ko: '하나 더요. 잔액 조회할 때마다 매번 결제 서비스를 호출하시더라고요. 캐시해야 할 것 같아요.',
        prompt: "Acknowledge his point, but explain why caching a balance is dangerous: an out-of-date number could let a customer pay with money that's already gone.",
        prompt_ko: '그의 의견을 인정하되, 잔액을 캐시하면 왜 위험한지 설명하세요. 낡은 숫자 때문에 이미 쓴 돈으로 또 결제할 수 있다고요.',
        model: "I see where you're coming from, but I'd hold off on caching. A stale balance could let someone spend the same money twice.",
        model_ko: '무슨 말인지 알겠어요. 그런데 캐시는 보류할게요. 잔액이 옛날 값이면 같은 돈을 두 번 쓸 수 있거든요.',
        distractors: [
          {
            text: "I've been doing this for over ten years, Jun. Trust me, I know when to cache and when not to.",
            text_ko: '저 이 일 10년 넘게 했어요, 준. 언제 캐시하고 언제 안 할지는 제가 알아요.',
            reaction: "Sorry. I didn't mean to step on your toes.",
            reaction_ko: '죄송해요. 기분 상하게 하려던 건 아니었어요.'
          },
          {
            text: "Good catch. Let's cache the balance for an hour. The payment service is slow anyway, so it should make the page a lot faster.",
            text_ko: '잘 잡았어요. 잔액을 한 시간 동안 캐시하죠. 어차피 결제 서비스가 느리니까 페이지가 훨씬 빨라질 거예요.',
            reaction: 'Really? Okay. But wait, could the balance be out of date?',
            reaction_ko: '정말요? 네. 근데 잠깐, 그럼 잔액이 옛날 값일 수도 있지 않아요?'
          },
          {
            text: "I see where you're coming from, but caching won't help. The payment service is already fast enough.",
            text_ko: '무슨 말인지 알겠어요. 그런데 캐시해도 소용없어요. 결제 서비스는 이미 충분히 빠르거든요.',
            reaction: 'Really? It took almost a second when I tested it.',
            reaction_ko: '그래요? 제가 테스트했을 땐 거의 1초 걸렸는데요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Oh. I didn't think about that. Correctness first.",
        reply_ko: '아. 그건 생각 못 했어요. 정확한 게 먼저군요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun moves his cursor to the "Delete comment" button.',
        situation_ko: '준이 "코멘트 삭제" 버튼으로 커서를 옮깁니다.',
        line: 'So should I delete my comment?',
        line_ko: '그럼 제 코멘트 지울까요?',
        prompt: 'Tell him to keep the comment, add your reasoning in a note, and leave the door open in case speed becomes a problem.',
        prompt_ko: '코멘트는 남겨 두라고 하고, 당신의 이유를 메모로 덧붙이고, 속도가 문제가 되면 다시 생각해 보겠다고 여지를 남기세요.',
        model: "No, leave it. It was a fair question. I'll add a note explaining why, and I'm open to changing it if the page gets slow.",
        model_ko: '아니요, 그냥 둬요. 타당한 질문이었어요. 왜 그런지 메모를 달아 둘게요. 페이지가 느려지면 바꿀 생각도 있고요.',
        distractors: [
          {
            text: "Yes, go ahead and delete it. We already settled it, so there's really no need to keep it around.",
            text_ko: '네, 그냥 지워요. 이미 얘기로 결론이 났으니까 굳이 코멘트를 남겨 둘 필요는 없어요.',
            reaction: "Okay... but won't the next person ask the same question?",
            reaction_ko: '네... 그런데 다음 사람도 똑같은 걸 묻지 않을까요?'
          },
          {
            text: "No, leave it there, but I'm not changing it. Caching a balance is never going to happen here, no matter how slow it gets.",
            text_ko: '아니요, 그냥 둬요. 그래도 저는 안 바꿔요. 아무리 느려져도 여기서 잔액을 캐시하는 일은 절대 없을 거예요.',
            reaction: "Never? Okay. I'll stop asking, then.",
            reaction_ko: '절대요? 네. 그럼 더 안 물어볼게요.'
          },
          {
            text: "No, leave it. I'll ask Maya to weigh in on it, and she can decide which one of us is right.",
            text_ko: '아니요, 그냥 둬요. 마야한테 의견을 물어볼게요. 우리 중 누가 맞는지 마야가 정하면 돼요.',
            reaction: "Maya? It's just a comment. Do we really need her?",
            reaction_ko: '마야요? 그냥 코멘트 하나인데요. 꼭 마야까지 필요해요?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'That makes sense. I learned something today.',
        reply_ko: '이해됐어요. 오늘 하나 배웠네요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun closes his laptop.',
        situation_ko: '준이 노트북을 덮습니다.',
        line: "I'll split up my function and add the tests, like you said.",
        line_ko: '말씀하신 대로 함수 나누고 테스트 추가할게요.',
        prompt: 'Show your appreciation for his review, and invite him out for coffee on you.',
        prompt_ko: '리뷰해 준 것에 고마움을 표하고, 당신이 사는 커피를 마시러 가자고 하세요.',
        model: "Thanks for the careful review. Want to grab coffee later? I'm buying.",
        model_ko: '꼼꼼하게 리뷰해 줘서 고마워요. 이따 커피 한잔할래요? 제가 살게요.',
        distractors: [
          {
            text: 'Good. And next time, keep the nitpicks to a minimum, okay?',
            text_ko: '좋아요. 그리고 다음엔 사소한 지적은 좀 줄여 줘요, 알았죠?',
            reaction: 'Oh. Sorry. I thought you wanted honest feedback.',
            reaction_ko: '아. 죄송해요. 솔직한 피드백을 원하시는 줄 알았어요.'
          },
          {
            text: "Thanks for the careful review. Want to grab lunch at noon? I'm buying.",
            text_ko: '꼼꼼하게 리뷰해 줘서 고마워요. 열두 시에 점심 같이 먹을래요? 제가 살게요.',
            reaction: 'Lunch? I already ate. Maybe something later?',
            reaction_ko: '점심이요? 저 벌써 먹었어요. 이따가 다른 건 어때요?'
          },
          {
            text: "Great. Send it back to me when it's done, and I'll merge it.",
            text_ko: '좋아요. 다 되면 다시 보내 줘요. 그럼 제가 머지할게요.',
            reaction: 'Will do. Um, was my review okay?',
            reaction_ko: '그럴게요. 음, 제 리뷰는 괜찮았어요?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Sure, how about around three?',
        reply_ko: '좋아요, 세 시쯤 어때요?'
      }
    ],
    phrases: [
      {
        id: 'dk_d9_review.coming_from',
        text: "I see where you're coming from.",
        meaning_ko: '왜 그렇게 생각하는지 알겠어요.',
        note: "Shows you understand someone's reasoning, often before you disagree.",
        note_ko: '상대의 논리를 이해한다는 말로, 흔히 반대 의견을 내기 전에 씁니다.',
        category: 'office'
      },
      {
        id: 'dk_d9_review.dont_hold_back',
        text: "Don't hold back.",
        meaning_ko: '망설이지 말고 다 말해요.',
        note: '"Hold back" = keep from saying what you really think.',
        note_ko: 'hold back은 정말 하고 싶은 말을 참는다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d9_review.fair_question',
        text: 'It was a fair question.',
        meaning_ko: '타당한 질문이었어요.',
        note: 'Tells someone the question was reasonable, even if the answer is no.',
        note_ko: '답이 no이더라도 질문 자체는 합당했다고 말해 줍니다.',
        category: 'office'
      },
      {
        id: 'dk_d9_review.guilty_as_charged',
        text: 'Guilty as charged.',
        meaning_ko: '할 말이 없네요. 제 잘못 맞아요.',
        note: 'A light, humorous way to admit that a criticism is true. From the courtroom.',
        note_ko: '지적이 맞다고 가볍고 재치 있게 인정하는 말입니다. 법정에서 온 표현입니다.',
        category: 'office'
      },
      {
        id: 'dk_d9_review.hold_off_on',
        text: "I'd hold off on caching.",
        meaning_ko: '캐싱은 미루는 게 좋겠어요.',
        note: '"Hold off on" = wait and not do something yet. Softer than "no".',
        note_ko: 'hold off on은 아직 하지 않고 기다린다는 뜻입니다. no보다 부드럽습니다.',
        category: 'office'
      },
      {
        id: 'dk_d9_review.im_buying',
        text: "I'm buying.",
        meaning_ko: '제가 살게요.',
        note: 'You will pay for the drinks or the food.',
        note_ko: '음료나 음식값을 내가 내겠다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d9_review.open_to',
        text: "I'm open to changing it.",
        meaning_ko: '바꿀 생각도 있어요.',
        note: '"Open to" = willing to consider. After "to", use a noun or -ing.',
        note_ko: 'open to는 고려할 뜻이 있다는 말입니다. to 뒤에는 명사나 -ing가 옵니다.',
        category: 'office'
      },
      {
        id: 'dk_d9_review.practice_what_i_preach',
        text: 'I should practice what I preach.',
        meaning_ko: '말한 대로 저부터 실천해야죠.',
        note: 'Do yourself what you tell others to do.',
        note_ko: '남에게 하라고 한 것을 자신도 한다는 뜻입니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'dk_d10_stretch',
    title: 'The one-page plan',
    title_ko: '한 장짜리 계획',
    place: 'office_manager',
    npc: 'maya',
    day_from: 10,
    day_to: 10,
    time_from: '08:30',
    time_to: '13:00',
    summary: "You follow up on last week's 1:1. Show Maya the plan, tell her honestly how delegating went, ask for a bigger role on the Summit Retail project, and agree on a timeline.",
    summary_ko: '지난주 1:1의 후속 면담입니다. 마야에게 계획을 보여 주고, 일을 맡겨 보니 어땠는지 솔직히 말하고, 서밋 리테일 프로젝트에서 더 큰 역할을 요청하고, 일정에 합의하세요.',
    sort: 10,
    tags: 'manager,career,1:1,follow-up',
    calendar: { day: 10, time: '11:00', title: '1:1 follow-up with Maya', title_ko: '마야와 1:1 후속 면담' },
    turns: [
      {
        speaker: 'maya',
        situation: 'Wednesday, cloudy and chilly. You asked Maya for fifteen minutes. The one-page plan she asked for last week is in your hand.',
        situation_ko: '수요일, 흐리고 쌀쌀합니다. 마야에게 15분을 내 달라고 했습니다. 지난주에 그녀가 말한 한 장짜리 계획이 손에 들려 있습니다.',
        line: 'Come on in, Derek. You wanted to follow up on something?',
        line_ko: '들어와요, 데릭. 뭐 이어서 얘기할 게 있다고요?',
        prompt: "Tell her why you're here: you've finished the one-page plan from your last 1:1.",
        prompt_ko: '찾아온 이유를 말하세요. 지난 1:1에서 말한 한 장짜리 계획을 다 만들었다고요.',
        model: 'I wanted to circle back to our 1:1. I put together the one-page plan you asked for.',
        model_ko: '지난 1:1 얘기를 이어서 하고 싶었어요. 말씀하신 한 장짜리 계획을 만들어 왔어요.',
        distractors: [
          {
            text: "I wanted to follow up on last month's 1:1. Here's the five-page plan you asked for.",
            text_ko: '지난달 1:1 얘기를 이어서 하고 싶었어요. 말씀하신 다섯 장짜리 계획이에요.',
            reaction: 'Five pages? I asked for one, Derek.',
            reaction_ko: '다섯 장이요? 한 장이라고 했잖아요, 데릭.'
          },
          {
            text: 'Nothing big. Just a plan I threw together. You can skim it whenever you like.',
            text_ko: '별건 아니에요. 그냥 대충 만든 계획이에요. 시간 날 때 훑어보세요.',
            reaction: "Threw together? Let's see what you've got.",
            reaction_ko: '대충 만들었다고요? 어디 한번 봐요.'
          },
          {
            text: 'Do you have a minute to talk about the Summit Retail timeline with Priya?',
            text_ko: '혹시 프리야랑 같이 서밋 리테일 일정 얘기할 시간 좀 있으세요?',
            reaction: 'We can, but I thought this was about something else.',
            reaction_ko: '그래도 되는데, 다른 얘기인 줄 알았어요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Already? I said next month. I'm impressed.",
        reply_ko: '벌써요? 다음 달이라고 했는데. 놀랍네요.'
      },
      {
        speaker: 'maya',
        situation: 'She reads the page carefully, then looks up.',
        situation_ko: '그녀가 종이를 꼼꼼히 읽고 고개를 듭니다.',
        line: "This covers the gift card project. But I also asked you to delegate. How's that going?",
        line_ko: '기프트 카드 프로젝트는 다 들어 있네요. 그런데 일을 맡기라고도 했잖아요. 그건 어떻게 돼 가요?',
        prompt: 'Show her you listened: tell her which task you gave to Jun rather than doing it yourself.',
        prompt_ko: '그녀의 말을 새겨들었다는 걸 보여 주세요. 직접 하지 않고 준에게 맡긴 일이 무엇인지 말하세요.',
        model: 'I took your feedback to heart. I handed the certificate alert to Jun instead of doing it myself.',
        model_ko: '주신 피드백을 마음에 새겼어요. 인증서 경보는 제가 하지 않고 준에게 맡겼어요.',
        distractors: [
          {
            text: 'I really took your feedback to heart. I handed the expiry alert to Sam instead of doing it myself.',
            text_ko: '주신 피드백을 정말 마음에 새겼어요. 만료 경보는 제가 하지 않고 샘에게 맡겼어요.',
            reaction: 'Sam? I thought Sam had the calendar.',
            reaction_ko: '샘이요? 샘은 달력을 맡은 줄 알았는데요.'
          },
          {
            text: "I'm working on it. It's hard to delegate when Jun is still so new, you know?",
            text_ko: '노력 중이에요. 준이 아직 너무 신입이라 맡기기가 어렵더라고요, 아시죠?',
            reaction: "He's new, but he's not that new. Give him a chance.",
            reaction_ko: '신입이긴 해도 그 정도는 아니에요. 기회를 줘 봐요.'
          },
          {
            text: "I gave the alert to Jun, but I'm keeping an eye on every commit, just in case.",
            text_ko: '경보는 준에게 줬는데, 혹시 몰라서 커밋을 하나하나 다 지켜보고 있어요.',
            reaction: "Every commit? That's not really letting go, is it?",
            reaction_ko: '커밋 하나하나요? 그건 손을 놓은 게 아니잖아요?'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Good. That's exactly what I wanted to see.",
        reply_ko: '좋아요. 제가 보고 싶었던 게 바로 그거예요.'
      },
      {
        speaker: 'maya',
        situation: 'Maya smiles a little.',
        situation_ko: '마야가 살짝 웃습니다.',
        line: 'Be honest. Was it hard to let go?',
        line_ko: '솔직히 말해 봐요. 손 떼기 힘들었죠?',
        prompt: "Be honest: it wasn't easy, and you were tempted to take over.",
        prompt_ko: '솔직하게 말하세요. 쉽지 않았고, 직접 나서고 싶은 마음이 들었다고요.',
        model: 'Honestly, yes. Old habits die hard. I had to resist the urge to jump in.',
        model_ko: '솔직히, 네. 오랜 습관은 쉽게 안 고쳐지더라고요. 끼어들고 싶은 걸 참아야 했어요.',
        distractors: [
          {
            text: "Not at all, honestly. It was easy, and I don't miss doing it one bit.",
            text_ko: '솔직히 전혀요. 쉬웠고, 제가 직접 하던 게 하나도 아쉽지 않아요.',
            reaction: "Not even a little? I don't quite buy that.",
            reaction_ko: '조금도요? 그 말은 잘 안 믿기는데요.'
          },
          {
            text: 'Honestly, yes. In the end, I quietly finished half of it myself last night.',
            text_ko: '솔직히, 네. 결국 어젯밤에 절반은 제가 몰래 끝내 버렸어요.',
            reaction: "Wait, you finished half of it? Then he doesn't own it.",
            reaction_ko: '잠깐, 절반을 끝냈다고요? 그럼 그건 준의 일이 아니잖아요.'
          },
          {
            text: 'Honestly, yes. Jun asks a lot of questions, and it slows me down.',
            text_ko: '솔직히, 네. 준이 질문을 너무 많이 해서 제 일이 느려져요.',
            reaction: "Questions are good. That's how he learns.",
            reaction_ko: '질문은 좋은 거예요. 그렇게 배우는 거죠.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'That urge never goes away completely. You just get better at noticing it.',
        reply_ko: '그 마음은 완전히 없어지지 않아요. 알아차리는 데 능숙해질 뿐이죠.'
      },
      {
        speaker: 'maya',
        situation: 'She puts the page down on her desk.',
        situation_ko: '그녀가 종이를 책상에 내려놓습니다.',
        line: "So what's the ask?",
        line_ko: '그래서, 원하는 게 뭐예요?',
        prompt: 'Ask for a bigger role: technical lead on the Summit Retail dashboard, while Jun does most of the hands-on work.',
        prompt_ko: '더 큰 역할을 요청하세요. 서밋 리테일 대시보드의 기술 책임을 맡고, 실제 구현은 대부분 준이 하는 거예요.',
        model: "I'd like to step up and own the technical side of the Summit Retail dashboard, with Jun doing most of the building.",
        model_ko: '한 단계 더 나서서 서밋 리테일 대시보드의 기술 쪽을 맡고 싶어요. 구현은 대부분 준이 하고요.',
        distractors: [
          {
            text: "I'd like to step up and own the technical side of the gift card project, with Jun doing most of the testing.",
            text_ko: '한 단계 더 나서서 기프트 카드 프로젝트의 기술 쪽을 맡고 싶어요. 테스트는 대부분 준이 하고요.',
            reaction: 'The gift card project is already yours. Think bigger.',
            reaction_ko: '기프트 카드 프로젝트는 이미 데릭 거잖아요. 더 크게 생각해 봐요.'
          },
          {
            text: "I'd like a promotion and a raise. I've been here long enough, and honestly, I think I've more than earned it by now.",
            text_ko: '승진이랑 연봉 인상을 원해요. 여기 있을 만큼 있었고, 솔직히 이제 그럴 자격은 충분하다고 생각해요.',
            reaction: "Whoa. Let's talk about the work first, then the title.",
            reaction_ko: '워워. 직함보다 일 얘기부터 하죠.'
          },
          {
            text: "I'd like to take over the Summit Retail dashboard and build it myself, so Jun can focus on smaller tasks.",
            text_ko: '서밋 리테일 대시보드를 넘겨받아서 제가 직접 만들고 싶어요. 준은 작은 일에 집중하고요.',
            reaction: "Build it yourself? That's the opposite of what we discussed.",
            reaction_ko: '직접 만든다고요? 우리가 얘기한 거랑 정반대잖아요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "That's a bigger stage than gift cards. I think you're ready. Let's make it official for phase one.",
        reply_ko: '기프트 카드보다 큰 무대네요. 준비가 된 것 같아요. 1단계부터 공식적으로 그렇게 하죠.'
      },
      {
        speaker: 'maya',
        situation: 'Maya opens her calendar.',
        situation_ko: '마야가 달력을 엽니다.',
        line: "How will we know it's working?",
        line_ko: '잘되고 있는지 어떻게 알 수 있을까요?',
        prompt: 'Propose short check-ins every other week and a bigger review when the quarter ends.',
        prompt_ko: '격주로 짧게 점검하고, 분기가 끝날 때 크게 한번 돌아보자고 제안하세요.',
        model: 'How about we check in every two weeks and take stock at the end of the quarter?',
        model_ko: '2주마다 점검하고, 분기 말에 전체를 돌아보는 건 어때요?',
        distractors: [
          {
            text: 'How about we check in every two months, and then take stock at the end of the year?',
            text_ko: '두 달마다 점검하고, 그다음에 연말에 전체를 돌아보는 건 어때요?',
            reaction: "Every two months? That's a long time to wait for feedback.",
            reaction_ko: '두 달마다요? 피드백을 기다리기엔 너무 길어요.'
          },
          {
            text: "We'll know when Summit Retail signs the contract. That's all that matters.",
            text_ko: '서밋 리테일이 계약하면 알게 되겠죠. 중요한 건 그것뿐이에요.',
            reaction: "That matters, but I want to see how you're growing, too.",
            reaction_ko: '그것도 중요하지만, 데릭이 어떻게 성장하는지도 보고 싶어요.'
          },
          {
            text: "Trust me, you'll just know. I don't think we need anything formal.",
            text_ko: '믿어 보세요, 그냥 알게 될 거예요. 공식적인 건 필요 없을 것 같아요.',
            reaction: "I'd still like something on the calendar, Derek.",
            reaction_ko: '그래도 달력에 뭔가 잡아 두고 싶어요, 데릭.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Every two weeks, and a review at the end of the quarter. I'll put it in writing. Let me know if you have any questions.",
        reply_ko: '2주마다, 그리고 분기 말에 평가. 문서로 남겨 둘게요. 궁금한 게 있으면 말해 줘요.'
      }
    ],
    phrases: [
      {
        id: 'dk_d10_stretch.circle_back',
        text: 'I wanted to circle back to our 1:1.',
        meaning_ko: '지난 1:1 이야기를 이어서 하고 싶었어요.',
        note: '"Circle back (to)" = return to an earlier topic.',
        note_ko: 'circle back (to)는 앞서 나눈 주제로 돌아간다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d10_stretch.let_go',
        text: 'Was it hard to let go?',
        meaning_ko: '손에서 놓기 어려웠어요?',
        note: '"Let go" = stop holding on; here, stop controlling a task.',
        note_ko: 'let go는 붙잡고 있던 것을 놓는다는 뜻으로, 여기서는 일을 직접 통제하지 않는 것입니다.',
        category: 'office'
      },
      {
        id: 'dk_d10_stretch.old_habits',
        text: 'Old habits die hard.',
        meaning_ko: '오랜 습관은 쉽게 안 고쳐져요.',
        note: 'A saying: it is difficult to change what you have always done.',
        note_ko: '늘 하던 방식은 바꾸기 어렵다는 속담입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d10_stretch.resist_the_urge',
        text: 'I had to resist the urge to jump in.',
        meaning_ko: '끼어들고 싶은 마음을 참아야 했어요.',
        note: '"Urge" = a strong wish to do something. "Jump in" = get involved suddenly.',
        note_ko: 'urge는 하고 싶은 강한 충동입니다. jump in은 갑자기 끼어든다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d10_stretch.step_up',
        text: "I'd like to step up.",
        meaning_ko: '한 단계 더 나서고 싶어요.',
        note: '"Step up" = take more responsibility.',
        note_ko: 'step up은 더 큰 책임을 맡는다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d10_stretch.take_stock',
        text: "Let's take stock at the end of the quarter.",
        meaning_ko: '분기 말에 전체를 돌아봐요.',
        note: '"Take stock" = stop and judge how things are going. A quarter is three months.',
        note_ko: 'take stock은 잠시 멈추고 상황을 평가한다는 뜻입니다. quarter는 석 달입니다.',
        category: 'office'
      },
      {
        id: 'dk_d10_stretch.to_heart',
        text: 'I took your feedback to heart.',
        meaning_ko: '피드백을 마음에 새겼어요.',
        note: '"Take something to heart" = take it seriously and act on it.',
        note_ko: 'take something to heart는 진지하게 받아들이고 행동으로 옮긴다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d10_stretch.whats_the_ask',
        text: "So what's the ask?",
        meaning_ko: '그래서 요청하는 게 뭐예요?',
        note: 'Business English: "the ask" = the thing you are requesting.',
        note_ko: '비즈니스 영어에서 the ask는 요청하는 내용을 말합니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'dk_d10_handoff',
    title: 'Before you fly',
    title_ko: '비행기 타기 전에',
    place: 'office_desk_team',
    npc: 'jun',
    day_from: 10,
    day_to: 10,
    time_from: '14:00',
    time_to: '18:30',
    summary: 'Jun flies to Ridgeport tomorrow and hands his work over to you. Ask the right questions: what is done, what is left, where the docs are, and who to contact.',
    summary_ko: '준이 내일 리지포트로 떠나며 당신에게 일을 넘깁니다. 필요한 질문을 하세요. 무엇이 끝났고, 무엇이 남았고, 문서는 어디 있고, 누구에게 연락하면 되는지요.',
    sort: 20,
    tags: 'coworker,handoff,covering,questions',
    calendar: { day: 10, time: '16:00', title: 'Handoff from Jun before his trip', title_ko: '출장 전 준에게 인수인계 받기' },
    turns: [
      {
        speaker: 'jun',
        situation: 'Wednesday afternoon. Jun flies to Ridgeport tomorrow morning. He stops by your desk with his laptop and a long list.',
        situation_ko: '수요일 오후입니다. 준은 내일 아침 리지포트로 떠납니다. 그가 노트북과 긴 목록을 들고 당신 자리에 들릅니다.',
        line: "Could you cover for me on the inventory API while I'm away?",
        line_ko: '저 없는 동안 재고 API 좀 맡아 주실 수 있어요?',
        prompt: 'Agree to cover for him, and get a picture of where the work is right now.',
        prompt_ko: '대신 맡아 주겠다고 하고, 지금 일이 어디까지 와 있는지 파악하세요.',
        model: 'Of course. Where do things stand right now?',
        model_ko: '물론이죠. 지금 상황이 어디까지 왔어요?',
        distractors: [
          {
            text: "Sure, but I won't touch any bugs while you're gone.",
            text_ko: '그래요, 근데 없는 동안 버그는 안 건드릴 거예요.',
            reaction: 'Oh. Well, there is one bug...',
            reaction_ko: '아. 그게, 버그가 하나 있는데...'
          },
          {
            text: 'Of course. Have a great time in Ridgeport next week.',
            text_ko: '물론이죠. 다음 주에 리지포트 잘 다녀와요.',
            reaction: "Tomorrow, actually. That's why I'm here.",
            reaction_ko: '사실 내일이에요. 그래서 온 거예요.'
          },
          {
            text: 'Of course. What time is your flight tomorrow?',
            text_ko: '물론이죠. 내일 비행기 몇 시예요?',
            reaction: 'Early, seven thirty. But about the API...',
            reaction_ko: '일찍이요, 일곱 시 반. 그런데 API 말인데요...'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "The code is merged, but there's one open bug. Some store IDs come back empty.",
        reply_ko: '코드는 머지됐는데, 버그가 하나 남아 있어요. 일부 매장 ID가 빈 값으로 와요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun turns his laptop toward you. The ticket is open.',
        situation_ko: '준이 노트북을 당신 쪽으로 돌립니다. 티켓이 열려 있습니다.',
        line: 'I wrote down everything I know about the bug.',
        line_ko: '버그에 대해 아는 건 다 적어 놨어요.',
        prompt: "Make sure you both have the same picture: find out what's finished and what still needs work.",
        prompt_ko: '둘이 똑같이 알고 있는지 확인하세요. 무엇이 끝났고 무엇이 아직 남았는지 알아보세요.',
        model: "Just so we're on the same page: what's done, and what's left?",
        model_ko: '서로 같은 내용을 알고 있게 확인하자면요. 끝난 건 뭐고, 남은 건 뭐예요?',
        distractors: [
          {
            text: "Great. So you've already fixed the store ID bug, right?",
            text_ko: '좋아요. 그럼 매장 ID 버그는 이미 다 고쳐 놓은 거죠?',
            reaction: "No, it's still open. That's the whole problem.",
            reaction_ko: '아니요, 아직 열려 있어요. 그게 문제예요.'
          },
          {
            text: "Why is there still an open bug? You should've fixed it before you go.",
            text_ko: '왜 아직 버그가 열려 있어요? 가기 전에 고쳐 놨어야죠.',
            reaction: "I tried. It's just... tricky. Sorry.",
            reaction_ko: '해 봤어요. 그냥... 까다로워요. 죄송해요.'
          },
          {
            text: 'Thanks. Can you also write up notes from the Ridgeport meeting?',
            text_ko: '고마워요. 리지포트 회의 내용도 정리해 줄 수 있어요?',
            reaction: 'Sure, after the trip. But the bug first?',
            reaction_ko: '네, 출장 다녀와서요. 그런데 버그부터 볼까요?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Done: I can reproduce it. Left: finding out why. It only happens with some of the stores.',
        reply_ko: '끝난 것은 버그를 재현할 수 있다는 거예요. 남은 것은 원인 찾기예요. 일부 매장에서만 일어나요.'
      },
      {
        speaker: 'jun',
        situation: 'You skim the ticket. It is detailed, but something is missing.',
        situation_ko: '티켓을 훑어봅니다. 자세하지만 빠진 게 있습니다.',
        line: "It's all in the ticket. Well, most of it.",
        line_ko: '다 티켓에 있어요. 음, 대부분은요.',
        prompt: "He said \"most of it.\" Find out where the documentation is, and what he hasn't written down.",
        prompt_ko: '그는 "대부분"이라고 했습니다. 문서가 어디 있는지, 그리고 그가 적지 않은 게 뭔지 알아내세요.',
        model: "Where do the docs live? And is there anything that's only in your head?",
        model_ko: '문서는 어디 있어요? 그리고 준 머릿속에만 있는 건 없어요?',
        distractors: [
          {
            text: "Most of it is good enough. I'll figure out the rest on my own.",
            text_ko: '대부분이면 충분해요. 나머지는 제가 알아서 할게요.',
            reaction: "Are you sure? Some of it isn't written anywhere.",
            reaction_ko: '정말요? 어디에도 안 적힌 것도 있는데요.'
          },
          {
            text: 'Most of it? Jun, a handoff needs everything. Go back and finish writing it.',
            text_ko: '대부분이요? 준, 인수인계는 전부여야죠. 돌아가서 마저 다 써요.',
            reaction: "Oh. Sorry. I'll... add more tonight.",
            reaction_ko: '아. 죄송해요. 오늘 밤에... 더 적을게요.'
          },
          {
            text: 'Okay. Could you print the ticket out for me before you go?',
            text_ko: '알겠어요. 가기 전에 티켓 좀 출력해 줄 수 있어요?',
            reaction: "Sure. But some of it isn't in the ticket.",
            reaction_ko: '네. 그런데 티켓에 없는 것도 좀 있어요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Good question. The test data is on my laptop. I'll upload it to the shared drive before I go.",
        reply_ko: '좋은 질문이에요. 테스트 데이터가 제 노트북에 있어요. 가기 전에 공유 드라이브에 올릴게요.'
      },
      {
        speaker: 'jun',
        situation: 'He adds "upload test data" to his list.',
        situation_ko: '그가 목록에 "테스트 데이터 올리기"를 추가합니다.',
        line: "Summit Retail's IT team might write to you, too.",
        line_ko: '서밋 리테일 IT 팀이 데릭한테 메일을 보낼 수도 있어요.',
        prompt: "Find out who you should talk to on the client's side if there's a problem.",
        prompt_ko: '문제가 생기면 고객사 쪽에서 누구와 이야기해야 하는지 알아내세요.',
        model: "Who's my point of contact at Summit Retail if something comes up?",
        model_ko: '무슨 일이 생기면 서밋 리테일 쪽 담당자는 누구예요?',
        distractors: [
          {
            text: "Then I'll just forward everything to you in Ridgeport.",
            text_ko: '그럼 오는 건 다 리지포트에 있는 준한테 넘길게요.',
            reaction: "I'll be in meetings all day. That won't really work.",
            reaction_ko: '저 하루 종일 회의예요. 그건 좀 어려워요.'
          },
          {
            text: 'Should I just call Greg directly if something comes up?',
            text_ko: '무슨 일 생기면 그냥 그렉한테 바로 전화하면 돼요?',
            reaction: "Greg? He's not really the technical one.",
            reaction_ko: '그렉이요? 그분은 기술 쪽 사람이 아니에요.'
          },
          {
            text: "I'd rather not deal with the client. Can Priya handle them for me?",
            text_ko: '고객 상대는 안 하고 싶어요. 프리야가 대신 맡아 주면 안 돼요?',
            reaction: "Priya can help, but they'll want someone technical.",
            reaction_ko: '프리야도 도와줄 순 있는데, 그쪽은 기술 담당을 원할 거예요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Greg's IT lead. Her name is Dana. Her email is in the ticket, and Priya knows her, too.",
        reply_ko: '그렉 팀의 IT 책임자예요. 이름은 데이나고요. 메일 주소는 티켓에 있고, 프리야도 그분을 알아요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun checks his itinerary.',
        situation_ko: '준이 출장 일정을 확인합니다.',
        line: "I'll be reachable on chat if anything comes up.",
        line_ko: '무슨 일 있으면 채팅으로 연락돼요.',
        prompt: "Promise not to bother him on the trip unless it's an emergency, ask how to reach him, and let the rest wait until he's back on Monday.",
        prompt_ko: '급한 일이 아니면 출장 중에 방해하지 않겠다고 약속하고, 연락 방법을 묻고, 나머지는 그가 돌아오는 월요일까지 미루세요.',
        model: "I'll only call if it's urgent. What's the best way to reach you? Anything else can wait until Monday.",
        model_ko: '급할 때만 전화할게요. 제일 연락하기 좋은 방법이 뭐예요? 다른 건 월요일까지 기다려도 돼요.',
        distractors: [
          {
            text: "Great, I'll message you a few times a day with updates, just to keep you in the loop while you're away.",
            text_ko: '좋아요, 없는 동안에도 상황을 알 수 있게 하루에 몇 번씩 진행 상황을 메시지로 보낼게요.',
            reaction: "A few times a day? I'll be with the client most of the time.",
            reaction_ko: '하루에 몇 번이요? 저 거의 고객이랑 같이 있을 텐데요.'
          },
          {
            text: "I'll only call if it's urgent. Anything else can wait until you're back on Wednesday.",
            text_ko: '급할 때만 전화할게요. 다른 건 수요일에 돌아오면 그때 해도 돼요.',
            reaction: "Wednesday? I'm back on Monday.",
            reaction_ko: '수요일이요? 저 월요일에 돌아와요.'
          },
          {
            text: "Don't worry, I won't contact you at all, no matter what happens. Just enjoy the trip.",
            text_ko: '걱정 마요, 무슨 일이 있어도 절대 연락 안 할게요. 출장 즐겨요.',
            reaction: 'Not even if something breaks? Please do call me then.',
            reaction_ko: '뭐가 망가져도요? 그럴 땐 꼭 전화 주세요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Chat is best. If it's urgent, call my cell. I'll be in meetings with Greg from two o'clock.",
        reply_ko: '채팅이 제일 좋아요. 급하면 휴대전화로 전화 주세요. 두 시부터는 그렉과 회의예요.'
      },
      {
        speaker: 'jun',
        situation: 'He hesitates before he goes.',
        situation_ko: '그가 가려다 말고 머뭇거립니다.',
        line: "One more thing. The alert you gave me is only half done. There's a draft pull request. Do you want to finish it?",
        line_ko: '하나 더요. 주신 경보 작업이 반밖에 안 됐어요. 초안 풀 리퀘스트가 있는데요. 데릭이 마무리하실래요?',
        prompt: "Don't take the alert back. Make it clear it stays his, and send him off on his trip.",
        prompt_ko: '경보 일을 도로 가져가지 마세요. 그 일은 계속 그의 것이라는 걸 분명히 하고, 출장을 잘 다녀오라고 보내 주세요.',
        model: "No, it's all yours. I'll leave it for you. Safe travels, and don't let Greg push you around.",
        model_ko: '아니요, 그건 전부 준 거예요. 그대로 둘게요. 잘 다녀와요. 그렉한테 휘둘리지 말고요.',
        distractors: [
          {
            text: "Sure, I'll finish it up for you while you're gone. It's really no trouble at all. Safe travels, Jun.",
            text_ko: '그래요, 없는 동안 제가 대신 마무리할게요. 정말 어려운 일도 아니에요. 잘 다녀와요, 준.',
            reaction: 'Oh. Okay. I kind of wanted to finish it myself.',
            reaction_ko: '아. 네. 사실 제가 끝내고 싶었는데요.'
          },
          {
            text: "No, it's yours. Just make sure it's done by the time you're back on Monday.",
            text_ko: '아니요, 준 거예요. 대신 월요일에 돌아올 때까지는 꼭 끝내 놔요.',
            reaction: 'By Monday? I thought you said there was no rush.',
            reaction_ko: '월요일까지요? 급하지 않다고 하신 줄 알았어요.'
          },
          {
            text: "No, let's hand it to Sam. He owns the expiry alert now, right? Safe travels.",
            text_ko: '아니요, 샘한테 넘기죠. 이제 만료 경보는 샘 담당이잖아요? 잘 다녀와요.',
            reaction: 'Sam? I thought it came from you to me.',
            reaction_ko: '샘이요? 데릭이 저한테 주신 거잖아요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Ha! I won't. Thanks, Derek. See you Monday!",
        reply_ko: '하하! 안 그럴게요. 고마워요, 데릭. 월요일에 봬요!'
      }
    ],
    phrases: [
      {
        id: 'dk_d10_handoff.all_yours',
        text: "It's all yours.",
        meaning_ko: '전부 당신 몫이에요.',
        note: 'You may have it or do it. Here: the task stays with you.',
        note_ko: '가져도, 해도 좋다는 뜻입니다. 여기서는 그 일이 계속 당신 것이라는 말입니다.',
        category: 'office'
      },
      {
        id: 'dk_d10_handoff.best_way_to_reach',
        text: "What's the best way to reach you?",
        meaning_ko: '연락하기 가장 좋은 방법이 뭐예요?',
        note: '"Reach" someone = contact them. The answer: chat, email, cell.',
        note_ko: 'reach는 연락이 닿는다는 뜻입니다. 대답은 채팅, 메일, 휴대전화 등입니다.',
        category: 'office'
      },
      {
        id: 'dk_d10_handoff.comes_up',
        text: 'if something comes up',
        meaning_ko: '무슨 일이 생기면',
        note: '"Come up" = happen unexpectedly.',
        note_ko: 'come up은 예상치 못하게 일이 생긴다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d10_handoff.docs_live',
        text: 'Where do the docs live?',
        meaning_ko: '문서는 어디에 있어요?',
        note: 'In tech talk, files and docs "live" in the place where they are kept.',
        note_ko: '개발자들은 파일이나 문서가 보관된 곳을 말할 때 live를 씁니다.',
        category: 'office'
      },
      {
        id: 'dk_d10_handoff.in_your_head',
        text: "Is there anything that's only in your head?",
        meaning_ko: '머릿속에만 있는 내용이 있어요?',
        note: 'Knowledge that is not written down anywhere. A key handoff question.',
        note_ko: '어디에도 적혀 있지 않은 지식을 말합니다. 인수인계의 핵심 질문입니다.',
        category: 'office'
      },
      {
        id: 'dk_d10_handoff.point_of_contact',
        text: "Who's my point of contact?",
        meaning_ko: '제가 연락할 담당자가 누구예요?',
        note: 'The one person you should talk to at another team or company.',
        note_ko: '다른 팀이나 회사에서 내가 이야기해야 할 한 사람입니다.',
        category: 'office'
      },
      {
        id: 'dk_d10_handoff.same_page',
        text: "Just so we're on the same page …",
        meaning_ko: '서로 같은 내용으로 알고 있도록 …',
        note: '"On the same page" = having the same understanding.',
        note_ko: 'on the same page는 같은 내용으로 이해하고 있다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d10_handoff.things_stand',
        text: 'Where do things stand right now?',
        meaning_ko: '지금 상황이 어때요?',
        note: 'Asks for the current state of a piece of work.',
        note_ko: '일의 현재 상태를 묻는 말입니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'dk_d11_call',
    title: 'A quick call to Ridgeport',
    title_ko: '리지포트로 짧은 전화',
    place: 'office_desk_team',
    npc: 'jun',
    day_from: 11,
    day_to: 11,
    time_from: '12:00',
    time_to: '16:00',
    summary: 'Jun is in Ridgeport, and a list you need is missing from his ticket. Call his cell: ask if it is a good time, keep it short, and let him get back to the client.',
    summary_ko: '준은 리지포트에 있고, 당신에게 필요한 목록이 그의 티켓에 빠져 있습니다. 휴대전화로 전화하세요. 통화 괜찮은지 묻고, 짧게 끝내고, 그가 고객에게 돌아갈 수 있게 해 주세요.',
    sort: 10,
    tags: 'phone,coworker,covering',
    calendar: { day: 11, time: '13:00', title: 'Call Jun in Ridgeport', title_ko: '리지포트의 준에게 전화' },
    turns: [
      {
        speaker: 'jun',
        situation: 'Thursday, a clear day. Jun is in Ridgeport. Priya needs to know by the end of the day which stores have the empty-ID bug, and the list is not in the ticket. You tried chat first. No answer, so you call his cell from your desk.',
        situation_ko: '목요일, 맑은 날입니다. 준은 리지포트에 있습니다. 프리야는 어느 매장에서 빈 ID 버그가 나는지 오늘 안에 알아야 하는데, 그 목록이 티켓에 없습니다. 먼저 채팅을 보냈지만 답이 없어서, 자리에서 그의 휴대전화로 전화를 겁니다.',
        line: 'Hello, this is Jun.',
        line_ko: '여보세요, 준입니다.',
        prompt: "Say who's calling, apologize for interrupting his trip, and check that he can talk right now.",
        prompt_ko: '누군지 밝히고, 출장 중에 방해해서 미안하다고 하고, 지금 통화할 수 있는지 확인하세요.',
        model: "Hey, Jun, it's Derek. Sorry to bother you on the road. Is this a good time?",
        model_ko: '준, 저 데릭이에요. 출장 중에 방해해서 미안해요. 지금 통화 괜찮아요?',
        distractors: [
          {
            text: "Hey, it's Derek. Why aren't you answering your chat? I need something.",
            text_ko: '저 데릭이에요. 채팅은 왜 답이 없어요? 필요한 게 있다고요.',
            reaction: 'Sorry! I was checking in. Is something wrong?',
            reaction_ko: '죄송해요! 체크인하고 있었어요. 무슨 일 있어요?'
          },
          {
            text: "Hey, Jun, it's Derek. Quick one: where's the store list? It's not in the ticket.",
            text_ko: '준, 저 데릭이에요. 간단한 건데, 매장 목록 어디 있어요? 티켓에 없던데요.',
            reaction: 'Uh, hi. Hang on, I just got to the hotel.',
            reaction_ko: '어, 안녕하세요. 잠깐만요, 방금 호텔에 왔어요.'
          },
          {
            text: "Hey, Jun, it's Derek. How was the meeting with Greg? Did it go well?",
            text_ko: '준, 저 데릭이에요. 그렉이랑 회의는 어땠어요? 잘됐어요?',
            reaction: "Not yet. It's at two. Is everything okay?",
            reaction_ko: '아직이요. 두 시예요. 별일 없죠?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Hi, Derek! Yes, I just checked in at the hotel. I have a few minutes before I head over to Summit Retail.',
        reply_ko: '안녕하세요, 데릭! 네, 방금 호텔에 체크인했어요. 서밋 리테일로 가기 전에 몇 분 시간이 있어요.'
      },
      {
        speaker: 'jun',
        situation: 'His voice sounds tense.',
        situation_ko: '그의 목소리가 긴장한 듯합니다.',
        line: 'Is everything okay? Did something break?',
        line_ko: '괜찮은 거죠? 뭐가 고장 났어요?',
        prompt: 'Calm him down, and promise this will only take a minute.',
        prompt_ko: '그를 진정시키고, 금방 끝날 거라고 약속하세요.',
        model: "Nothing's on fire. I'll keep it short. I just have one quick question.",
        model_ko: '급한 불 난 거 아니에요. 짧게 할게요. 간단한 질문 하나만 있어요.',
        distractors: [
          {
            text: 'Well, kind of. The inventory API went down this morning.',
            text_ko: '음, 좀 그래요. 오늘 아침에 재고 API가 다운됐어요.',
            reaction: 'What? Down? Oh no. What happened?',
            reaction_ko: '네? 다운이요? 이런. 무슨 일이에요?'
          },
          {
            text: "Not yet, but it might if I can't find what I need from you.",
            text_ko: '아직은요. 그런데 필요한 걸 못 찾으면 그렇게 될지도 몰라요.',
            reaction: "Okay, now I'm nervous. What do you need?",
            reaction_ko: '아, 이제 긴장되네요. 뭐가 필요하세요?'
          },
          {
            text: "Everything's fine here. So how's Ridgeport? Is the hotel nice? Good flight?",
            text_ko: '여긴 다 괜찮아요. 그래서 리지포트는 어때요? 호텔은 좋아요? 비행기는 괜찮았어요?',
            reaction: "It's nice. But I only have a few minutes.",
            reaction_ko: '좋아요. 근데 저 몇 분밖에 없어요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Phew. You scared me for a second.',
        reply_ko: '휴. 잠깐 놀랐어요.'
      },
      {
        speaker: 'jun',
        situation: 'You hear an elevator bell on his end of the line.',
        situation_ko: '수화기 너머로 엘리베이터 벨 소리가 들립니다.',
        line: 'Okay, what do you need?',
        line_ko: '네, 뭐가 필요하세요?',
        prompt: "Ask for the list of stores with the bug, which wasn't in the ticket.",
        prompt_ko: '버그가 나는 매장 목록을 물어보세요. 티켓에는 없었어요.',
        model: "Where's the list of affected stores? I couldn't find it in the ticket.",
        model_ko: '영향받는 매장 목록 어디 있어요? 티켓에서는 못 찾았어요.',
        distractors: [
          {
            text: "Where's the test data? I couldn't find it on the shared drive.",
            text_ko: '테스트 데이터 어디 있어요? 공유 드라이브에서 못 찾았어요.',
            reaction: 'I uploaded it last night. Is that what you need?',
            reaction_ko: '어젯밤에 올렸는데요. 그게 필요하신 거예요?'
          },
          {
            text: 'Can you walk me through the whole bug, from the beginning?',
            text_ko: '버그 전체를 처음부터 하나하나 설명해 줄 수 있어요?',
            reaction: "The whole thing? I don't really have time right now.",
            reaction_ko: '전부요? 지금은 시간이 별로 없어요.'
          },
          {
            text: "Why didn't you put the store list in the ticket? I've been looking for an hour.",
            text_ko: '매장 목록은 왜 티켓에 안 넣었어요? 한 시간째 찾고 있어요.',
            reaction: 'Sorry! I thought I had. Let me think.',
            reaction_ko: '죄송해요! 넣은 줄 알았어요. 잠깐 생각해 볼게요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Oh no, I forgot to attach it. It's a spreadsheet on the shared drive, in the folder called \"inventory-bugs\". Seven stores.",
        reply_ko: '아, 첨부하는 걸 깜빡했어요. 공유 드라이브의 "inventory-bugs" 폴더에 있는 스프레드시트예요. 매장 일곱 곳이에요.'
      },
      {
        speaker: 'jun',
        situation: 'You find the spreadsheet while he is still talking.',
        situation_ko: '그가 말하는 동안 스프레드시트를 찾았습니다.',
        line: "I'm so sorry. I should have put it in the ticket. Do you want me to look at the bug tonight?",
        line_ko: '정말 죄송해요. 티켓에 넣었어야 했는데. 오늘 밤에 제가 버그 볼까요?',
        prompt: 'Let him off the hook: he should put his energy into the client while you handle the bug.',
        prompt_ko: '그의 부담을 덜어 주세요. 그는 고객에게 힘을 쏟고, 버그는 당신이 처리하면 돼요.',
        model: "No worries, that's all I needed. You focus on the client. I'll take it from here.",
        model_ko: '괜찮아요, 필요한 건 그게 다였어요. 준은 고객한테 집중해요. 여기서부턴 제가 할게요.',
        distractors: [
          {
            text: 'That would help, actually. Maybe after your dinner with the client?',
            text_ko: '사실 그러면 도움이 되긴 해요. 고객이랑 저녁 먹고 나서 볼래요?',
            reaction: 'Oh. Sure, I can try after dinner...',
            reaction_ko: '아. 네, 저녁 먹고 해 볼게요...'
          },
          {
            text: "It's fine. Just remember for next time: if it's not in the ticket, it doesn't exist.",
            text_ko: '괜찮아요. 대신 다음번엔 꼭 기억해요. 티켓에 없으면 없는 거예요.',
            reaction: "Right. Sorry again. I'll do better.",
            reaction_ko: '네. 다시 한번 죄송해요. 잘할게요.'
          },
          {
            text: "No worries. I'll have Priya finish the fix while you're in meetings.",
            text_ko: '괜찮아요. 준이 회의하는 동안 프리야한테 수정을 마무리하라고 할게요.',
            reaction: "Priya? Isn't she a product manager?",
            reaction_ko: '프리야요? 프리야는 PM이잖아요?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Thank you. That's a weight off my mind.",
        reply_ko: '고마워요. 마음이 한결 놓이네요.'
      },
      {
        speaker: 'jun',
        situation: 'It is almost time for him to go.',
        situation_ko: '그가 나가야 할 시간이 다 됐습니다.',
        line: "I'm meeting Greg in person at two. Any advice?",
        line_ko: '두 시에 그렉을 직접 만나요. 조언 있으세요?',
        prompt: 'Give him a confidence boost, and end the call so he can get going.',
        prompt_ko: '그에게 자신감을 북돋아 주고, 그가 출발할 수 있게 통화를 마무리하세요.',
        model: "You've got this. Just be yourself. Anyway, I'll let you go. Good luck!",
        model_ko: '준은 해낼 거예요. 평소대로만 해요. 아무튼 이만 끊을게요. 행운을 빌어요!',
        distractors: [
          {
            text: "Don't mess it up. The whole quarter depends on this deal.",
            text_ko: '제발 망치지만 마요. 이번 분기가 다 이 계약에 달렸어요.',
            reaction: 'Gee, thanks. No pressure, then.',
            reaction_ko: '와, 고마워요. 부담 하나도 안 되네요.'
          },
          {
            text: 'Make sure you cover the pilot, the timeline, the API, and the data.',
            text_ko: '시범 운영, 일정, API, 데이터까지 빠짐없이 꼭 다 짚어요.',
            reaction: "Okay... that's a lot. I'll try to remember.",
            reaction_ko: '네... 많네요. 기억해 볼게요.'
          },
          {
            text: "You've got this. Say hi to Dana for me. She's the one who runs the account.",
            text_ko: '준은 해낼 거예요. 데이나한테 안부 전해 줘요. 그 계정 책임자잖아요.',
            reaction: "Dana's their IT lead. Greg runs the account.",
            reaction_ko: '데이나는 IT 책임자예요. 계정은 그렉이 맡고요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Thanks, Derek. I'll message you after the meeting. Bye!",
        reply_ko: '고마워요, 데릭. 회의 끝나고 메시지 보낼게요. 끊을게요!'
      }
    ],
    phrases: [
      {
        id: 'dk_d11_call.all_i_needed',
        text: "That's all I needed.",
        meaning_ko: '필요한 건 그게 전부였어요.',
        note: 'Tells the other person the question is answered and they are free.',
        note_ko: '질문이 해결됐으니 이제 가 봐도 된다고 알려 주는 말입니다.',
        category: 'office'
      },
      {
        id: 'dk_d11_call.good_time',
        text: 'Is this a good time?',
        meaning_ko: '지금 통화 괜찮아요?',
        note: 'Ask this at the start of a call. If not: "Did I catch you at a bad time?"',
        note_ko: '통화를 시작할 때 묻습니다. 바빠 보이면 "Did I catch you at a bad time?"이라고 합니다.',
        category: 'office'
      },
      {
        id: 'dk_d11_call.keep_it_short',
        text: "I'll keep it short.",
        meaning_ko: '짧게 끝낼게요.',
        note: "A promise not to take much of someone's time.",
        note_ko: '상대의 시간을 많이 뺏지 않겠다는 약속입니다.',
        category: 'office'
      },
      {
        id: 'dk_d11_call.let_you_go',
        text: "I'll let you go.",
        meaning_ko: '이만 끊을게요.',
        note: 'A polite way to end a phone call: it sounds like you are freeing the other person.',
        note_ko: '통화를 정중하게 끝내는 말입니다. 상대를 놓아준다는 느낌을 줍니다.',
        category: 'office'
      },
      {
        id: 'dk_d11_call.nothing_on_fire',
        text: "Nothing's on fire.",
        meaning_ko: '급한 불이 난 건 아니에요.',
        note: 'Office slang: there is no emergency.',
        note_ko: '직장에서 쓰는 속어로, 비상 상황이 아니라는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d11_call.sorry_to_bother',
        text: 'Sorry to bother you on the road.',
        meaning_ko: '출장 중에 방해해서 미안해요.',
        note: '"On the road" = traveling, especially for work.',
        note_ko: 'on the road는 특히 일 때문에 이동 중이라는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d11_call.take_it_from_here',
        text: "I'll take it from here.",
        meaning_ko: '여기서부터는 제가 맡을게요.',
        note: 'You will continue the work that someone else started.',
        note_ko: '다른 사람이 시작한 일을 이어받아 계속하겠다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d11_call.youve_got_this',
        text: "You've got this.",
        meaning_ko: '충분히 해낼 수 있어요.',
        note: 'Encouragement before something difficult.',
        note_ko: '어려운 일을 앞둔 사람을 격려하는 말입니다.',
        category: 'small-talk'
      }
    ]
  },
  {
    id: 'dk_d11_unblock',
    title: 'An answer Priya can forward',
    title_ko: '프리야가 그대로 전달할 수 있는 답',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 11,
    day_to: 11,
    time_from: '13:00',
    time_to: '18:00',
    requires: 'dk_d11_call',
    summary: "Summit Retail's IT lead has questions about the bug, and Priya is stuck. Give her the facts in plain English, add a caveat instead of overpromising, and offer to join a call.",
    summary_ko: '서밋 리테일의 IT 책임자가 버그에 대해 물어 왔는데 프리야가 답을 못 하고 있습니다. 쉬운 말로 사실을 알려 주고, 무리한 약속 대신 단서를 달고, 통화에 함께 들어가겠다고 제안하세요.',
    sort: 20,
    tags: 'meeting,client,covering,explaining',
    calendar: {
      day: 11,
      time: '14:30',
      title: "Answer for Summit Retail's IT team (Priya)",
      title_ko: '서밋 리테일 IT팀에 줄 답변 (프리야)'
    },
    turns: [
      {
        speaker: 'priya',
        situation: 'Priya is typing fast. An email from Dana, the IT lead at Summit Retail, is open on her screen.',
        situation_ko: '프리야가 빠르게 타자를 치고 있습니다. 화면에는 서밋 리테일 IT 책임자 데이나의 메일이 열려 있습니다.',
        line: "Derek, thank goodness. Dana wants to know which stores have the empty-ID bug, and I'm stuck. Jun's not answering his chat.",
        line_ko: '데릭, 살았다. 데이나가 어느 매장에서 빈 ID 버그가 나는지 알고 싶어 하는데, 저 막혔어요. 준은 채팅에 답이 없고요.',
        prompt: "Tell her you've already reached Jun, and give her the answer: seven stores, all new this year.",
        prompt_ko: '이미 준과 연락이 닿았다고 하고, 답을 알려 주세요. 매장 일곱 곳이고, 모두 올해 새로 연 곳이에요.',
        model: "I just got off the phone with him. It's seven stores, all of which opened this year.",
        model_ko: '방금 준이랑 통화했어요. 매장 일곱 곳이고, 전부 올해 문을 연 곳이에요.',
        distractors: [
          {
            text: "I just got off the phone with him. It's eleven stores, all of which opened last year.",
            text_ko: '방금 준이랑 통화했어요. 매장 열한 곳이고, 전부 작년에 문을 연 곳이에요.',
            reaction: "Eleven? That's more than I expected. Are you sure?",
            reaction_ko: '열한 곳이요? 생각보다 많네요. 확실해요?'
          },
          {
            text: "Relax. Jun's busy with the client, and this can wait until he's back on Monday.",
            text_ko: '진정해요. 준은 고객 일로 바쁘니까, 이건 월요일에 돌아올 때까지 기다려도 돼요.',
            reaction: 'Monday? Dana needs this today, Derek.',
            reaction_ko: '월요일이요? 데이나는 오늘 필요해요, 데릭.'
          },
          {
            text: "I'll call him right now. Give me ten minutes, and I'll get you the full list.",
            text_ko: '지금 바로 전화해 볼게요. 10분만 주면 전체 목록을 갖다줄게요.',
            reaction: "Haven't you talked to him already? You look like you know something.",
            reaction_ko: '벌써 통화한 거 아니에요? 뭔가 아는 얼굴인데요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "You called him? You're a lifesaver.",
        reply_ko: '전화했어요? 덕분에 살았어요.'
      },
      {
        speaker: 'priya',
        situation: 'You looked at the seven stores before you came over, and the pattern jumped out at you.',
        situation_ko: '오기 전에 그 일곱 매장을 살펴봤더니 공통점이 바로 눈에 들어왔습니다.',
        line: 'Dana also asks why it happens. Keep it simple, please. I have to explain it to Greg.',
        line_ko: '데이나가 왜 그런지도 물어봐요. 간단하게 부탁해요. 그렉한테 설명해야 하거든요.',
        prompt: 'Explain the cause so Greg could follow it: newer stores have longer IDs, and the old system chops them short.',
        prompt_ko: '그렉도 알아들을 수 있게 원인을 설명하세요. 새 매장들은 ID가 더 긴데, 옛 시스템이 그걸 짧게 잘라 버린다고요.',
        model: 'In plain English: the new stores have a longer ID, and the old system cuts it off.',
        model_ko: '쉽게 말하면, 새 매장들은 ID가 더 긴데 옛 시스템이 그걸 잘라 버리는 거예요.',
        distractors: [
          {
            text: 'The POS export truncates the store_id field to eight characters, so the join returns null.',
            text_ko: 'POS export가 store_id 필드를 여덟 글자로 잘라서 join 결과가 null이 나와요.',
            reaction: 'You lost me at "export." Simpler, please.',
            reaction_ko: "'export'에서부터 못 알아듣겠어요. 더 쉽게요."
          },
          {
            text: 'In short: the new stores have a shorter ID, and the new dashboard rejects it.',
            text_ko: '간단히 말하면, 새 매장들은 ID가 더 짧은데 새 대시보드가 그걸 거부하는 거예요.',
            reaction: 'Shorter? I thought the new ones were the long ones.',
            reaction_ko: '더 짧다고요? 새 매장 ID가 긴 줄 알았는데요.'
          },
          {
            text: "Basically, their old system is junk, and Dana's team should have caught this.",
            text_ko: '한마디로 그쪽 옛 시스템이 엉터리고, 데이나 팀이 진작 잡았어야 했어요.',
            reaction: "I can't send that to Greg. Let's keep it friendly.",
            reaction_ko: '그걸 그렉한테 보낼 순 없어요. 좀 부드럽게 가죠.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'A longer ID that gets cut off. Even I understand that.',
        reply_ko: '긴 ID가 잘린다. 그건 저도 이해되네요.'
      },
      {
        speaker: 'priya',
        situation: 'She starts typing her reply to Dana, then stops.',
        situation_ko: '그녀가 데이나에게 답장을 쓰기 시작하다가 멈춥니다.',
        line: "Is it safe to tell her it'll be fixed by Monday?",
        line_ko: '월요일까지 고쳐진다고 말해도 괜찮을까요?',
        prompt: "Don't let her commit to Monday. The fix is easy, but testing needs real data from those stores, so suggest a safer day: Wednesday.",
        prompt_ko: '월요일로 약속하지 못하게 하세요. 수정은 쉽지만 테스트하려면 그 매장들의 실제 데이터가 필요하니, 더 안전한 수요일을 제안하세요.',
        model: "I wouldn't promise Monday. The fix looks simple, but there's one caveat: we need real data from those stores to test it. Let's say Wednesday, to be safe.",
        model_ko: '월요일은 약속 안 하는 게 좋겠어요. 수정은 간단해 보이는데, 단서가 하나 있어요. 그 매장들의 실제 데이터로 테스트해야 해요. 넉넉하게 수요일로 하죠.',
        distractors: [
          {
            text: 'Yes, go ahead and tell her Monday. The fix looks simple, and we can always test it after it goes out to the stores.',
            text_ko: '네, 그냥 월요일이라고 말해요. 수정은 간단해 보이고, 테스트는 매장에 내보낸 다음에 언제든 해 봐도 되니까요.',
            reaction: "Test it after it's live? That makes me nervous.",
            reaction_ko: '내보낸 다음에 테스트한다고요? 그건 불안한데요.'
          },
          {
            text: "I wouldn't promise Monday. The fix looks simple, but there's one catch: we need real data from those stores to test it. Let's say next month, just to be safe.",
            text_ko: '월요일은 약속 안 하는 게 좋겠어요. 수정은 간단해 보이는데, 걸리는 게 하나 있어요. 그 매장들의 실제 데이터로 테스트해야 해요. 넉넉하게 다음 달로 하죠.',
            reaction: 'Next month? For a fix you just called simple?',
            reaction_ko: '다음 달이요? 방금 간단하다고 한 수정인데요?'
          },
          {
            text: "Hard to say right now. Just tell her we're looking into it, and we'll get back to her when we know a lot more about it.",
            text_ko: '지금은 뭐라 말하기 어려워요. 그냥 살펴보는 중이라고만 하고, 더 많이 알게 되면 그때 다시 연락하겠다고 해요.',
            reaction: "She'll want a date, Derek. Give me something.",
            reaction_ko: '데이나는 날짜를 원할 거예요, 데릭. 뭐라도 줘요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'Under-promise and over-deliver. Wednesday it is.',
        reply_ko: '약속은 적게, 결과는 그 이상으로. 수요일로 하죠.'
      },
      {
        speaker: 'priya',
        situation: 'Priya looks at the clock. She has another meeting in fifteen minutes.',
        situation_ko: '프리야가 시계를 봅니다. 15분 뒤에 다른 회의가 있습니다.',
        line: 'Can you write that up for me? Two or three sentences.',
        line_ko: '그거 좀 정리해 줄 수 있어요? 두세 문장으로요.',
        prompt: 'Promise her a brief write-up within ten minutes, written so she can pass it straight to Dana.',
        prompt_ko: '10분 안에 짧게 정리해 주겠다고 약속하세요. 그녀가 데이나에게 바로 넘길 수 있게요.',
        model: "I'll send you a short summary in ten minutes. Feel free to forward it as is.",
        model_ko: '10분 안에 짧게 정리해서 보낼게요. 그대로 전달하셔도 돼요.',
        distractors: [
          {
            text: "I'll send you a short summary in about an hour. Feel free to forward it as is.",
            text_ko: '한 시간쯤 뒤에 짧게 정리해서 보낼게요. 그대로 전달하셔도 돼요.',
            reaction: "An hour? I'm in a meeting in fifteen minutes.",
            reaction_ko: '한 시간이요? 저 15분 뒤에 회의예요.'
          },
          {
            text: "Can't you write it? I already explained it, and I've got my own work.",
            text_ko: '직접 쓰면 안 돼요? 설명은 다 했고, 저도 제 일이 있어요.',
            reaction: "Wow. Okay. I just thought you'd say it better.",
            reaction_ko: '와. 알겠어요. 데릭이 더 잘 쓸 것 같아서 그랬죠.'
          },
          {
            text: "I'll email Dana myself in ten minutes, so you don't have to bother.",
            text_ko: '10분 안에 제가 데이나한테 직접 메일 보낼게요. 신경 안 쓰셔도 돼요.',
            reaction: "Please don't. I'm the one talking to Dana.",
            reaction_ko: '그러지 마요. 데이나랑은 제가 얘기하고 있어요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Perfect. And copy Jun, so he's in the loop when he gets back.",
        reply_ko: '완벽해요. 준도 참조에 넣어 줘요. 돌아왔을 때 상황을 알 수 있게요.'
      },
      {
        speaker: 'priya',
        situation: 'She picks up her laptop to go.',
        situation_ko: '그녀가 가려고 노트북을 집어 듭니다.',
        line: 'One last thing. If Dana wants to talk it through tomorrow, would you join?',
        line_ko: '마지막으로 하나만요. 내일 데이나가 직접 얘기하자고 하면 같이 들어와 줄래요?',
        prompt: "Agree to join, ask to be added to the email conversation, and say you're open any time after ten.",
        prompt_ko: '참여하겠다고 하고, 메일 대화에 넣어 달라고 하고, 열 시 이후엔 언제든 된다고 하세요.',
        model: "Sure, I can hop on a call. Just loop me in on the email thread. I'm free any time after ten.",
        model_ko: '그럼요, 통화 들어갈 수 있어요. 메일 스레드에만 넣어 줘요. 열 시 이후엔 언제든 괜찮아요.',
        distractors: [
          {
            text: "Sure, I can hop on a call. Just loop me in on the email thread. I'm only free before ten, though.",
            text_ko: '그럼요, 통화 들어갈 수 있어요. 메일 스레드에만 넣어 줘요. 근데 저는 열 시 전에만 돼요.',
            reaction: 'Before ten? Let me see if she can do that early.',
            reaction_ko: '열 시 전이요? 데이나가 그렇게 일찍 되는지 볼게요.'
          },
          {
            text: "Do I have to? Jun knows this better. Can't it wait until he's back on Monday?",
            text_ko: '꼭 들어가야 돼요? 준이 더 잘 알잖아요. 월요일에 준 돌아오면 하면 안 돼요?',
            reaction: "Derek, you're the one who found the cause.",
            reaction_ko: '데릭, 원인을 찾은 건 데릭이잖아요.'
          },
          {
            text: 'Sure, but forward me every email Dana sends from now on, not just this one.',
            text_ko: '그래요, 대신 이것만 말고 앞으로 데이나가 보내는 메일은 전부 저한테 넘겨줘요.',
            reaction: "Every email? Let's just start with this thread.",
            reaction_ko: '전부요? 일단 이 스레드부터 하죠.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Done. You really kept things moving today. I'll make sure Maya knows.",
        reply_ko: '그렇게 할게요. 오늘 덕분에 일이 멈추지 않았어요. 마야도 꼭 알게 할게요.'
      }
    ],
    phrases: [
      {
        id: 'dk_d11_unblock.as_is',
        text: 'Feel free to forward it as is.',
        meaning_ko: '그대로 전달하셔도 돼요.',
        note: '"As is" = without any changes. "Feel free to" = you are welcome to.',
        note_ko: 'as is는 아무것도 바꾸지 않고라는 뜻입니다. feel free to는 마음껏 해도 된다는 말입니다.',
        category: 'office'
      },
      {
        id: 'dk_d11_unblock.caveat',
        text: "There's one caveat.",
        meaning_ko: '단서가 하나 있어요.',
        note: 'A caveat is a warning or condition that limits what you just said.',
        note_ko: 'caveat은 방금 한 말에 붙는 주의 사항이나 조건입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d11_unblock.got_off_the_phone',
        text: 'I just got off the phone with him.',
        meaning_ko: '방금 그와 통화를 마쳤어요.',
        note: '"Get off the phone" = finish a call.',
        note_ko: 'get off the phone은 통화를 끝낸다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d11_unblock.hop_on_a_call',
        text: 'I can hop on a call.',
        meaning_ko: '통화에 들어갈 수 있어요.',
        note: '"Hop on" = join quickly and easily. "Loop me in" = include me in the messages.',
        note_ko: 'hop on은 가볍게 바로 참여한다는 뜻입니다. loop me in은 연락에 나도 넣어 달라는 말입니다.',
        category: 'office'
      },
      {
        id: 'dk_d11_unblock.lifesaver',
        text: "You're a lifesaver.",
        meaning_ko: '덕분에 살았어요.',
        note: 'Warm thanks to someone who got you out of a difficult spot.',
        note_ko: '곤란한 상황에서 구해 준 사람에게 하는 따뜻한 감사 표현입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d11_unblock.plain_english',
        text: 'In plain English …',
        meaning_ko: '쉬운 말로 하면 …',
        note: 'Without technical words, so that anyone can understand.',
        note_ko: '전문 용어 없이 누구나 알 수 있게 말한다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d11_unblock.to_be_safe',
        text: "Let's say Wednesday, to be safe.",
        meaning_ko: '넉넉잡아 수요일로 하죠.',
        note: '"To be safe" = to leave some room in case of problems.',
        note_ko: 'to be safe는 문제가 생길 때를 대비해 여유를 둔다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d11_unblock.under_promise',
        text: 'Under-promise and over-deliver.',
        meaning_ko: '약속은 적게, 결과는 그 이상으로.',
        note: 'A business saying: promise less than you think you can do, then do more.',
        note_ko: '할 수 있다고 생각하는 것보다 적게 약속하고 더 많이 해내라는 비즈니스 격언입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'dk_d12_panel',
    title: 'On the interview panel',
    title_ko: '면접관이 되다',
    place: 'office_hr',
    npc: 'linda',
    day_from: 12,
    day_to: 12,
    time_from: '09:00',
    time_to: '15:00',
    summary: 'Linda wants you on the interview panel for a backend developer. Talk about what you look for, what a red flag is, which questions are off-limits, and ask about comp time for your on-call week.',
    summary_ko: '린다가 백엔드 개발자 면접에 당신이 면접관으로 들어와 주길 바랍니다. 무엇을 볼지, 무엇이 위험 신호인지, 어떤 질문이 금지인지 이야기하고, 온콜 주간에 대한 보상 휴가도 물어보세요.',
    sort: 10,
    tags: 'hr,interview,hiring,benefits',
    calendar: { day: 12, time: '10:30', title: 'Interview panel prep with Linda', title_ko: '린다와 면접관 준비' },
    turns: [
      {
        speaker: 'linda',
        situation: 'Friday morning, partly sunny. Linda has three resumes spread out on her desk.',
        situation_ko: '금요일 아침, 구름 사이로 해가 납니다. 린다의 책상에 이력서 세 장이 펼쳐져 있습니다.',
        line: "Derek, thanks for stopping by. We're hiring a backend developer, and I'd like you on the interview panel next week. Can I count on you?",
        line_ko: '데릭, 들러 줘서 고마워요. 백엔드 개발자를 뽑는데, 다음 주 면접관으로 들어와 줬으면 해요. 부탁해도 될까요?',
        prompt: 'Accept, find out when the interviews are, and promise to keep that time free.',
        prompt_ko: '수락하고, 면접이 언제인지 묻고, 그 시간을 비워 두겠다고 약속하세요.',
        model: "I'd be glad to sit in. Which days? I'll block off my calendar.",
        model_ko: '기꺼이 들어갈게요. 무슨 요일이에요? 달력에 시간 비워 둘게요.',
        distractors: [
          {
            text: 'I guess so, if nobody else can. How long will it take?',
            text_ko: '뭐, 다른 사람이 안 된다면요. 얼마나 걸려요?',
            reaction: "Only if you want to. I'd rather have someone who's interested.",
            reaction_ko: '원할 때만요. 관심 있는 사람이 들어오는 게 나아요.'
          },
          {
            text: "I'd be glad to sit in. Is it this Friday? I'll block off my calendar.",
            text_ko: '기꺼이 들어갈게요. 이번 금요일이에요? 달력에 시간 비워 둘게요.',
            reaction: "This Friday? No, it's next week.",
            reaction_ko: '이번 금요일이요? 아니요, 다음 주예요.'
          },
          {
            text: 'Sure, put me down for all of them. I can do every interview.',
            text_ko: '그럼요, 전부 넣어 주세요. 면접은 다 들어갈 수 있어요.',
            reaction: "All of them? Let's start with these three.",
            reaction_ko: '전부요? 일단 이 세 명부터 하죠.'
          }
        ],
        reply_speaker: 'linda',
        reply_line: 'Tuesday and Thursday afternoon. Three candidates, forty-five minutes each.',
        reply_ko: '화요일과 목요일 오후예요. 지원자 세 명, 한 명에 45분씩이에요.'
      },
      {
        speaker: 'linda',
        situation: 'She hands you a blank scorecard.',
        situation_ko: '그녀가 빈 평가표를 건넵니다.',
        line: "You'll run the technical part. What will you be looking for?",
        line_ko: '기술 면접은 데릭이 맡아요. 뭘 보실 거예요?',
        prompt: "Explain that you care about how candidates reason, not gotcha puzzles, and say how you'll see it.",
        prompt_ko: '함정 퍼즐이 아니라 지원자가 어떻게 생각하는지가 중요하다고 설명하고, 그걸 어떻게 볼지 말하세요.',
        model: "I care less about trick questions and more about how they think. I'll have them talk me through a real problem.",
        model_ko: '함정 문제보다는 어떻게 생각하는지를 봐요. 실제 문제 하나를 말로 풀어 보게 할 거예요.',
        distractors: [
          {
            text: "I'll give them a hard puzzle and a ten-minute timer. If they crack under pressure, they're out. It's as simple as that.",
            text_ko: '어려운 퍼즐 하나 주고 10분 타이머를 걸 거예요. 압박에 무너지면 탈락이에요. 간단하죠.',
            reaction: "Hmm. I'd rather see how they work than how they panic.",
            reaction_ko: '음. 당황하는 모습보다 일하는 방식을 보고 싶은데요.'
          },
          {
            text: "Mostly whether they'd fit in. You know, someone I'd want to grab a beer with after work.",
            text_ko: '주로 잘 어울릴지 봐요. 그러니까, 퇴근하고 맥주 한잔하고 싶은 사람인지요.',
            reaction: "A beer? Careful. That's how bias creeps in.",
            reaction_ko: '맥주요? 조심해요. 편견은 그렇게 끼어들어요.'
          },
          {
            text: "I'll mostly look at where they went to school and which big companies they've worked for.",
            text_ko: '주로 어느 학교를 나왔는지, 어떤 큰 회사에서 일했는지를 볼 거예요.',
            reaction: 'We have their resumes for that. I need to know how they code.',
            reaction_ko: '그건 이력서에 다 있어요. 코딩을 어떻게 하는지 알고 싶어요.'
          }
        ],
        reply_speaker: 'linda',
        reply_line: "Good. That's what the scorecard is for. Same questions for everyone, so it's fair.",
        reply_ko: '좋아요. 평가표가 그래서 있는 거예요. 공정하도록 모두에게 같은 질문을 하는 거죠.'
      },
      {
        speaker: 'linda',
        situation: 'Linda picks up her pen.',
        situation_ko: '린다가 펜을 듭니다.',
        line: "And what's a red flag for you?",
        line_ko: '그럼 데릭한테 위험 신호는 뭐예요?',
        prompt: 'Name the warning sign you watch for: a candidate who hogs the credit or blames their former coworkers.',
        prompt_ko: '당신이 경계하는 신호를 말하세요. 공을 독차지하거나 예전 동료들을 탓하는 지원자요.',
        model: 'Someone who takes all the credit, or throws their old team under the bus.',
        model_ko: '공을 혼자 다 차지하거나, 예전 팀한테 책임을 떠넘기는 사람이요.',
        distractors: [
          {
            text: "Someone who's been out of work for a while. Gaps on a resume worry me.",
            text_ko: '한동안 일을 쉰 사람이요. 이력서에 공백이 있으면 걱정돼요.',
            reaction: "Gaps happen for lots of reasons. Let's not go there.",
            reaction_ko: '공백은 여러 이유로 생겨요. 그쪽으로는 가지 말죠.'
          },
          {
            text: "Someone who says \"I don't know.\" That means they're not ready yet.",
            text_ko: '"모르겠어요"라고 하는 사람이요. 아직 준비가 안 됐다는 뜻이니까요.',
            reaction: "Hmm. I'd rather hear \"I don't know\" than a made-up answer.",
            reaction_ko: '음. 지어낸 답보다는 "모르겠어요"가 나아요.'
          },
          {
            text: 'Someone who shows up even five minutes late, or wears jeans to the interview.',
            text_ko: '단 5분이라도 늦게 오거나, 면접에 청바지를 입고 오는 사람이요.',
            reaction: 'Jeans? Half our office wears jeans, Derek.',
            reaction_ko: '청바지요? 우리 사무실 절반이 청바지 입어요, 데릭.'
          }
        ],
        reply_speaker: 'linda',
        reply_line: 'Agreed. How people talk about their last team tells you a lot.',
        reply_ko: '동의해요. 전 팀을 어떻게 말하는지 보면 많은 걸 알 수 있죠.'
      },
      {
        speaker: 'linda',
        situation: 'She becomes more serious.',
        situation_ko: '그녀의 표정이 진지해집니다.',
        line: "Now, my part. Small talk is fine, but there are questions we can't ask. Do you know where the line is?",
        line_ko: '이제 제 담당이요. 가벼운 잡담은 괜찮지만, 물어보면 안 되는 질문들이 있어요. 선이 어디인지 아세요?',
        prompt: "Show her you know which personal topics are off-limits, and what you'll talk about instead.",
        prompt_ko: '어떤 사적인 주제가 금지인지 알고 있다는 걸 보여 주고, 대신 무엇을 이야기할지 말하세요.',
        model: "I'll steer clear of anything personal, like age, family, or where someone is from, and stick to the job.",
        model_ko: '나이, 가족, 출신 같은 사적인 건 피하고, 업무 얘기만 할게요.',
        distractors: [
          {
            text: "I'll avoid anything personal, like age or family. But asking where someone's from is fine, right? It's just small talk.",
            text_ko: '나이나 가족은 피할게요. 근데 출신 묻는 건 잡담이니 괜찮죠?',
            reaction: "Actually, no. That one's off-limits, too.",
            reaction_ko: '아니요, 사실 그것도 금지예요.'
          },
          {
            text: "I'll keep it casual. Asking about their kids or weekend plans helps them relax.",
            text_ko: '편하게 할게요. 아이나 주말 계획을 물으면 긴장이 풀리잖아요.',
            reaction: "Their kids? No. That's exactly the kind of thing we can't ask.",
            reaction_ko: '아이요? 안 돼요. 그게 바로 물어보면 안 되는 거예요.'
          },
          {
            text: "Honestly, I'll ask whatever I need to ask. HR rules shouldn't get in the way of that.",
            text_ko: '솔직히 저는 물어볼 건 물어볼 거예요. 인사팀 규칙이 방해하면 안 되죠.',
            reaction: "They're not HR rules, Derek. They're the law.",
            reaction_ko: '인사팀 규칙이 아니에요, 데릭. 법이에요.'
          }
        ],
        reply_speaker: 'linda',
        reply_line: "Exactly. Even \"Are you married?\" as small talk is off-limits. When in doubt, don't ask.",
        reply_ko: '바로 그거예요. 가벼운 잡담으로 "결혼하셨어요?"라고 묻는 것도 금지예요. 애매하면 묻지 마세요.'
      },
      {
        speaker: 'linda',
        situation: 'She writes your name on the panel list.',
        situation_ko: '그녀가 면접관 명단에 당신의 이름을 적습니다.',
        line: 'One more thing. Please write down your feedback before we debrief, not after.',
        line_ko: '하나 더요. 평가 회의 전에 피드백을 적어 두세요. 끝나고 말고요.',
        prompt: "Agree, and give the reason it matters: so one strong personality in the debrief doesn't sway everyone else.",
        prompt_ko: '동의하고, 그게 왜 중요한지 이유를 말하세요. 평가 회의에서 목소리 센 한 사람이 다른 사람들을 흔들지 않도록요.',
        model: 'That makes sense. That way, nobody gets swayed by the loudest voice in the room.',
        model_ko: '일리가 있네요. 그래야 회의실에서 목소리 제일 큰 사람한테 아무도 휩쓸리지 않죠.',
        distractors: [
          {
            text: "Can't I just share my thoughts in the debrief? Writing it up takes time.",
            text_ko: '그냥 평가 회의에서 생각을 말하면 안 돼요? 글로 쓰려면 시간이 걸려서요.',
            reaction: "It does take time, but it's worth it. Trust me.",
            reaction_ko: '시간은 걸려도 그럴 가치가 있어요. 믿어 봐요.'
          },
          {
            text: 'That makes sense. That way, we can all agree on one score before we write it down.',
            text_ko: '일리가 있네요. 그래야 적기 전에 다 같이 점수 하나로 맞출 수 있죠.',
            reaction: "No, the point is that you don't agree first.",
            reaction_ko: '아니요, 요점은 먼저 맞추지 않는 거예요.'
          },
          {
            text: "Sure. I'll write it up the week after, once I've had some time to think.",
            text_ko: '그럴게요. 좀 생각할 시간을 갖고 그다음 주에 정리해서 쓸게요.',
            reaction: "The week after? We'll all have forgotten by then.",
            reaction_ko: '그다음 주요? 그때면 다 잊어버려요.'
          }
        ],
        reply_speaker: 'linda',
        reply_line: "You've done this before. I'll send the invites today.",
        reply_ko: '해 보신 분이네요. 오늘 초대장을 보낼게요.'
      },
      {
        speaker: 'linda',
        situation: 'You have a question of your own for HR.',
        situation_ko: '인사팀에 물어볼 것이 하나 있습니다.',
        line: "Anything else I can help you with while you're here?",
        line_ko: '온 김에 제가 더 도와드릴 거 있어요?',
        prompt: 'Ask whether you get time off in return for being on call all of last week, weekend included.',
        prompt_ko: '지난주 내내 주말까지 온콜이었던 것에 대해 보상 휴가를 받을 수 있는지 물어보세요.',
        model: 'Actually, yes. I was on call all last week, including the weekend. Am I entitled to any comp time?',
        model_ko: '사실 있어요. 지난주 내내 주말까지 온콜이었는데요. 보상 휴가를 받을 수 있나요?',
        distractors: [
          {
            text: 'Actually, yes. I was on call last night, until about midnight. Am I entitled to any comp time for that?',
            text_ko: '사실 있어요. 어젯밤 자정쯤까지 온콜이었는데요. 그것도 보상 휴가를 받을 수 있나요?',
            reaction: "Just one night? That doesn't really count, I'm afraid.",
            reaction_ko: '하룻밤이요? 그건 안타깝지만 해당이 안 돼요.'
          },
          {
            text: 'Actually, yes. I was on call all last week. I expect at least three days off for that.',
            text_ko: '사실 있어요. 지난주 내내 온콜이었으니까 적어도 사흘은 쉬어야겠어요.',
            reaction: "Three days? Let's see what the policy says first.",
            reaction_ko: '사흘이요? 규정부터 확인해 보죠.'
          },
          {
            text: "Actually, yes. How many vacation days do I have left this year? I've lost track.",
            text_ko: '사실 있어요. 올해 휴가가 며칠 남았어요? 세다가 잊어버렸어요.',
            reaction: 'I can check that. But was there something about on call?',
            reaction_ko: '그건 확인해 드릴게요. 그런데 온콜 얘기도 있지 않았어요?'
          }
        ],
        reply_speaker: 'linda',
        reply_line: 'You are. A week on call earns you half a day. Put in the request, and Maya will approve it. Just use it within sixty days.',
        reply_ko: '받을 수 있어요. 온콜 한 주에 반일이 나와요. 신청하면 마야가 승인할 거예요. 60일 안에만 쓰세요.'
      }
    ],
    phrases: [
      {
        id: 'dk_d12_panel.block_off',
        text: "I'll block off my calendar.",
        meaning_ko: '달력에 시간을 비워 둘게요.',
        note: '"Block off" time = reserve it so nobody books a meeting then.',
        note_ko: 'block off는 다른 회의가 잡히지 않게 시간을 잡아 둔다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d12_panel.comp_time',
        text: 'Am I entitled to any comp time?',
        meaning_ko: '보상 휴가를 받을 수 있나요?',
        note: '"Comp time" (compensatory time) = time off for extra hours. "Entitled to" = having the right to.',
        note_ko: 'comp time(compensatory time)은 추가 근무에 대한 휴가입니다. entitled to는 받을 권리가 있다는 뜻입니다.',
        category: 'hr'
      },
      {
        id: 'dk_d12_panel.off_limits',
        text: 'That question is off-limits.',
        meaning_ko: '그 질문은 금지예요.',
        note: 'Not allowed. In US interviews: age, marriage, children, religion, national origin.',
        note_ko: '허용되지 않는다는 뜻입니다. 미국 면접에서는 나이, 결혼, 자녀, 종교, 출신 국가가 해당됩니다.',
        category: 'office'
      },
      {
        id: 'dk_d12_panel.red_flag',
        text: "What's a red flag for you?",
        meaning_ko: '어떤 게 위험 신호라고 보세요?',
        note: 'A red flag is a warning sign that something may be wrong.',
        note_ko: 'red flag는 무언가 문제가 있을 수 있다는 경고 신호입니다.',
        category: 'office'
      },
      {
        id: 'dk_d12_panel.steer_clear',
        text: "I'll steer clear of anything personal.",
        meaning_ko: '사적인 것은 피할게요.',
        note: '"Steer clear of" = stay away from.',
        note_ko: 'steer clear of는 멀리한다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d12_panel.talk_me_through',
        text: "I'll have them talk me through a real problem.",
        meaning_ko: '실제 문제를 말로 풀어 보게 할 거예요.',
        note: '"Talk someone through" = explain your thinking step by step, out loud.',
        note_ko: 'talk someone through는 생각의 과정을 단계별로 소리 내어 설명한다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d12_panel.under_the_bus',
        text: 'throw someone under the bus',
        meaning_ko: '남에게 책임을 떠넘기다',
        note: 'Blame another person to protect yourself.',
        note_ko: '자신을 지키려고 다른 사람을 탓한다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d12_panel.when_in_doubt',
        text: "When in doubt, don't ask.",
        meaning_ko: '애매하면 묻지 마세요.',
        note: '"When in doubt, …" gives a safe rule for cases when you are not sure.',
        note_ko: '"When in doubt, …"는 확신이 없을 때 따를 안전한 규칙을 말해 줍니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'dk_d12_signed',
    title: 'Good news from Ridgeport',
    title_ko: '리지포트에서 온 좋은 소식',
    place: 'office_desk_team',
    npc: 'jun',
    day_from: 12,
    day_to: 12,
    time_from: '13:00',
    time_to: '18:00',
    summary: 'Jun calls from the airport in Ridgeport: the contract is signed. Congratulate him, tell him how things went while he was away, and make him rest this weekend.',
    summary_ko: '준이 리지포트 공항에서 전화합니다. 계약이 체결됐습니다. 축하해 주고, 그가 없는 동안 일이 어떻게 됐는지 알려 주고, 이번 주말에는 쉬게 하세요.',
    sort: 20,
    tags: 'phone,coworker,covering,congratulations',
    calendar: { day: 12, time: '14:00', title: 'Jun calls from Ridgeport', title_ko: '리지포트에서 준의 전화' },
    turns: [
      {
        speaker: 'jun',
        situation: 'Friday afternoon. Your phone rings at your desk. It is Jun, calling from the airport in Ridgeport.',
        situation_ko: '금요일 오후입니다. 자리에서 전화가 울립니다. 리지포트 공항에서 준이 건 전화입니다.',
        line: "Derek! It's Jun. We signed the contract this morning!",
        line_ko: '데릭! 준이에요. 오늘 아침에 계약서에 사인했어요!',
        prompt: 'Share his excitement, and give him the credit.',
        prompt_ko: '그의 기쁨을 함께 나누고, 공을 그에게 돌리세요.',
        model: "Congratulations! That's huge. You pulled it off!",
        model_ko: '축하해요! 엄청난 일이에요. 준이 해냈어요!',
        distractors: [
          {
            text: 'Great! I knew my prep notes would come in handy.',
            text_ko: '잘됐네요! 제 준비 노트가 쓸모 있을 줄 알았어요.',
            reaction: 'Uh... yeah. They did help, I guess.',
            reaction_ko: '어... 네. 도움이 되긴 했죠.'
          },
          {
            text: 'Oh, good. Did you read the fine print first?',
            text_ko: '아, 잘됐네요. 깨알 같은 조항은 먼저 읽었어요?',
            reaction: "Priya did. Aren't you even a little happy for me?",
            reaction_ko: '프리야가 읽었어요. 저 잘된 거 조금도 안 기뻐요?'
          },
          {
            text: "Congrats! So Greg's signing for all fifty stores?",
            text_ko: '축하해요! 그럼 그렉이 매장 쉰 곳 전부 계약한 거예요?',
            reaction: 'Forty, Derek. Starting with the five-store pilot.',
            reaction_ko: '마흔 곳이에요, 데릭. 다섯 곳 시범 운영부터요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Thank you! Greg shook my hand. I still can't believe it.",
        reply_ko: '감사합니다! 그렉이 악수를 청했어요. 아직도 믿기지 않아요.'
      },
      {
        speaker: 'jun',
        situation: 'You hear a boarding announcement behind him.',
        situation_ko: '그의 뒤로 탑승 안내 방송이 들립니다.',
        line: "But I've been worried about the inventory bug. How bad is it?",
        line_ko: '그런데 재고 버그가 계속 걱정됐어요. 얼마나 심해요?',
        prompt: 'Put his mind at ease: you found what was causing it, and the fix only needs his review.',
        prompt_ko: '그를 안심시키세요. 원인을 찾아냈고, 수정 코드는 그의 리뷰만 남았다고요.',
        model: "It's all taken care of. I tracked down the cause, and the fix is waiting for your review.",
        model_ko: '다 처리됐어요. 원인 찾아냈고, 수정한 건 준 리뷰만 기다리고 있어요.',
        distractors: [
          {
            text: "It's all taken care of. Priya tracked down the cause, and the fix already went out this morning.",
            text_ko: '다 처리됐어요. 프리야가 원인을 찾았고, 수정본은 오늘 아침에 벌써 나갔어요.',
            reaction: "Priya? Really? And it's already live?",
            reaction_ko: '프리야가요? 정말요? 벌써 나갔다고요?'
          },
          {
            text: "Pretty bad, honestly. Dana's been emailing all week. We'll talk on Monday.",
            text_ko: '솔직히 꽤 심해요. 데이나가 일주일 내내 메일 보냈어요. 월요일에 얘기해요.',
            reaction: "Oh no. Now I'm going to worry all weekend.",
            reaction_ko: '이런. 이제 주말 내내 걱정하겠네요.'
          },
          {
            text: "Don't ask. It took me two late nights, and Dana was not happy with us at all.",
            text_ko: '묻지 마요. 이틀 밤을 새웠고, 데이나는 우리한테 전혀 안 좋아했어요.',
            reaction: "Two late nights? I'm so sorry, Derek.",
            reaction_ko: '이틀 밤이요? 정말 죄송해요, 데릭.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Already? I owe you one.',
        reply_ko: '벌써요? 제가 신세 졌네요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun laughs, then turns suspicious.',
        situation_ko: '준이 웃다가 의심스러운 목소리로 바뀝니다.',
        line: "And the alert? You finished that too, didn't you?",
        line_ko: '그럼 경보는요? 그것도 다 끝내 놓으셨죠?',
        prompt: "Reassure him you left the alert alone; it's his, and there's no hurry.",
        prompt_ko: '경보에는 손대지 않았다고 안심시키세요. 그의 일이고, 서두를 것 없다고요.',
        model: "Nope. I didn't lay a finger on it. It's still yours, and it can wait till Monday.",
        model_ko: '아니요. 손끝 하나 안 댔어요. 아직 준 거예요. 월요일까지 기다려도 돼요.',
        distractors: [
          {
            text: 'Just a little. I wrapped up the tests, but the rest is still yours.',
            text_ko: '조금만요. 테스트는 제가 마무리했고, 나머지는 아직 준 거예요.',
            reaction: 'The tests? Aw, I wanted to write those.',
            reaction_ko: '테스트요? 아, 그건 제가 쓰고 싶었는데요.'
          },
          {
            text: "Nope. I didn't touch it. It's still yours. Could you finish it on the plane tonight?",
            text_ko: '아니요. 손 안 댔어요. 아직 준 거예요. 오늘 밤 비행기에서 끝내 줄 수 있어요?',
            reaction: 'On the plane? I was hoping to sleep.',
            reaction_ko: '비행기에서요? 자려고 했는데요.'
          },
          {
            text: "Yep, it's done and merged. I figured you'd be too busy for it.",
            text_ko: '네, 다 끝내서 머지했어요. 준은 너무 바쁠 것 같아서요.',
            reaction: 'Oh. Okay. I really wanted to finish that one.',
            reaction_ko: '아. 네. 그건 정말 제가 끝내고 싶었어요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Good. I want to finish that one myself.',
        reply_ko: '다행이에요. 그건 제 손으로 끝내고 싶어요.'
      },
      {
        speaker: 'jun',
        situation: 'He sounds tired but happy.',
        situation_ko: '그는 지쳤지만 기쁜 목소리입니다.',
        line: "My flight is overbooked, so I'm taking a later one. I can work on the alert at the gate tonight.",
        line_ko: '비행기가 초과 예약돼서 더 늦은 걸로 타요. 오늘 밤 게이트에서 경보 작업 좀 할 수 있겠어요.',
        prompt: 'He wants to work at the gate tonight. As his teammate, look out for him.',
        prompt_ko: '그는 오늘 밤 공항 게이트에서 일하겠다고 합니다. 동료로서 그를 챙겨 주세요.',
        model: "Don't you dare. Call it a day. You've earned it. And unplug this weekend.",
        model_ko: '절대 안 돼요. 오늘은 여기까지 해요. 그럴 자격 충분해요. 그리고 주말엔 일에서 완전히 손 떼요.',
        distractors: [
          {
            text: 'Good idea. If you push it tonight, we can merge it Monday.',
            text_ko: '좋은 생각이에요. 오늘 밤에 올려 두면 월요일 아침에 바로 머지할 수 있겠네요.',
            reaction: "Really? I thought you'd tell me to rest.",
            reaction_ko: '정말요? 쉬라고 하실 줄 알았는데요.'
          },
          {
            text: "Don't. And take Monday off, too. Maya already approved it.",
            text_ko: '하지 마요. 그리고 월요일도 쉬어요. 마야가 이미 승인해 줬어요. 푹 쉬어요.',
            reaction: 'Maya approved it? When did she do that?',
            reaction_ko: '마야가 승인했다고요? 언제요?'
          },
          {
            text: "Up to you, I guess. Just don't send me anything this weekend. I'm offline.",
            text_ko: '그건 뭐, 알아서 해요. 대신 이번 주말엔 저한테 아무것도 보내지 마요. 저 쉬어요.',
            reaction: "Oh. Okay. I'll keep it to myself, then.",
            reaction_ko: '아. 네. 그럼 혼자 하고 말게요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Okay, okay. No laptop. I promise.',
        reply_ko: '알겠어요, 알겠어요. 노트북은 안 열게요. 약속해요.'
      },
      {
        speaker: 'jun',
        situation: 'The announcement behind him gets louder.',
        situation_ko: '그의 뒤에서 안내 방송 소리가 커집니다.',
        line: 'Thanks for covering for me, Derek. Really.',
        line_ko: '대신 맡아 줘서 고마워요, 데릭. 진짜로요.',
        prompt: "Tell him it was no trouble, that's what a team is for, and say goodbye until Monday morning.",
        prompt_ko: '별일 아니었다고, 팀이 그러라고 있는 거라고 하고, 월요일 아침까지 인사하세요.',
        model: "Anytime. That's what teammates are for. See you bright and early on Monday.",
        model_ko: '언제든지요. 팀이 그러라고 있는 거죠. 월요일 아침 일찍 봐요.',
        distractors: [
          {
            text: "No problem. You owe me one, though. I'll collect next week.",
            text_ko: '별말씀을요. 대신 하나 빚진 거예요. 다음 주에 받아 갈게요.',
            reaction: "Ha. Okay. I'll buy the coffee.",
            reaction_ko: '하하. 네. 커피는 제가 살게요.'
          },
          {
            text: "Anytime. That's what teammates are for. See you at the office bright and early tomorrow.",
            text_ko: '언제든지요. 팀이 그러라고 있는 거죠. 내일 아침 일찍 사무실에서 봐요.',
            reaction: "Tomorrow's Saturday, Derek. You said no work!",
            reaction_ko: '내일은 토요일이에요, 데릭. 일하지 말라면서요!'
          },
          {
            text: "Sure. Just don't make it a habit. I have my own work, too.",
            text_ko: '그래요. 버릇 되진 않게 해요. 저도 제 일이 있으니까요.',
            reaction: "Oh. Sorry. I didn't mean to dump it on you.",
            reaction_ko: '아. 죄송해요. 떠넘기려던 건 아니었어요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "See you Monday! Oh, they're calling my flight. Bye!",
        reply_ko: '월요일에 봬요! 아, 제 비행기 탑승 안내가 나와요. 끊을게요!'
      }
    ],
    phrases: [
      {
        id: 'dk_d12_signed.bright_and_early',
        text: 'See you bright and early on Monday.',
        meaning_ko: '월요일 아침 일찍 봐요.',
        note: '"Bright and early" = early in the morning, and fresh.',
        note_ko: 'bright and early는 아침 일찍, 그리고 상쾌하게라는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d12_signed.call_it_a_day',
        text: 'Call it a day.',
        meaning_ko: '오늘은 여기까지 해요.',
        note: 'Stop working for today. "Unplug" = stay away from work and screens.',
        note_ko: '오늘 일을 그만한다는 뜻입니다. unplug는 일과 화면에서 떨어져 쉰다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d12_signed.lay_a_finger',
        text: "I didn't lay a finger on it.",
        meaning_ko: '손끝 하나 대지 않았어요.',
        note: '"Not lay a finger on" = not touch at all.',
        note_ko: 'not lay a finger on은 전혀 건드리지 않는다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d12_signed.owe_you_one',
        text: 'I owe you one.',
        meaning_ko: '제가 신세 졌네요.',
        note: 'Thanks for a favor, with a promise to return it someday.',
        note_ko: '도움에 고마워하며 언젠가 갚겠다고 하는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d12_signed.pulled_it_off',
        text: 'You pulled it off!',
        meaning_ko: '해냈네요!',
        note: '"Pull off" = succeed at something difficult.',
        note_ko: 'pull off는 어려운 일을 해낸다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d12_signed.taken_care_of',
        text: "It's all taken care of.",
        meaning_ko: '다 처리됐어요.',
        note: 'Everything has been handled, so you do not need to worry.',
        note_ko: '모두 처리했으니 걱정할 필요 없다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d12_signed.thats_huge',
        text: "That's huge.",
        meaning_ko: '정말 큰일을 했네요.',
        note: '"Huge" here means very important, great news.',
        note_ko: '여기서 huge는 아주 중요하다, 대단한 소식이라는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d12_signed.tracked_down',
        text: 'I tracked down the cause.',
        meaning_ko: '원인을 찾아냈어요.',
        note: '"Track down" = find after searching.',
        note_ko: 'track down은 찾아다닌 끝에 찾아낸다는 뜻입니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'dk_w2_mower',
    title: 'The mower comes home',
    title_ko: '돌아온 잔디 깎는 기계',
    place: 'derek_door',
    npc: 'carl',
    day_from: 13,
    day_to: 13,
    time_from: '09:00',
    time_to: '15:00',
    summary: 'Carl brings back your lawn mower, fixed. Thank him properly, offer to pay for the parts, ask about your leaking gutter, and say yes to his barbecue.',
    summary_ko: '칼이 고친 잔디 깎는 기계를 가져왔습니다. 제대로 고마움을 전하고, 부품값을 내겠다고 하고, 새는 빗물받이에 대해 묻고, 그의 바비큐 초대를 받아들이세요.',
    sort: 10,
    tags: 'neighbor,homeowner,weekend,favor',
    calendar: { day: 13, time: '10:00', title: 'Carl brings back the mower', title_ko: '칼이 잔디 깎는 기계를 가져옴' },
    turns: [
      {
        speaker: 'carl',
        situation: 'Saturday, sunny and warm. Carl pulls up in front of your house with your lawn mower in the back of his pickup.',
        situation_ko: '토요일, 맑고 따뜻합니다. 칼이 픽업트럭 짐칸에 당신의 잔디 깎는 기계를 싣고 집 앞에 차를 댑니다.',
        line: "Special delivery! She runs like new. It wasn't the spark plug, by the way. The carburetor was all gummed up.",
        line_ko: '특별 배송이야! 새것처럼 잘 돌아가. 그나저나 점화 플러그 문제가 아니었네. 기화기가 찌꺼기로 꽉 막혔더라고.',
        prompt: "Thank him warmly: thanks to him, you didn't have to take it anywhere to get it fixed.",
        prompt_ko: '진심으로 고마워하세요. 그 덕분에 어디 가져가서 고칠 필요가 없었어요.',
        model: "Carl, I can't thank you enough. You saved me a trip to the repair shop.",
        model_ko: '칼, 뭐라고 감사해야 할지 모르겠어요. 덕분에 수리점에 안 가도 됐어요.',
        distractors: [
          {
            text: 'Thanks, Carl. I knew it was the spark plug. You saved me a trip.',
            text_ko: '고마워요, 칼. 점화 플러그 문제일 줄 알았어요. 덕분에 안 가도 됐네요.',
            reaction: "Spark plug? Weren't you listening? It was the carburetor.",
            reaction_ko: '점화 플러그? 내 말 안 들었나? 기화기였다니까.'
          },
          {
            text: 'Took you long enough. I needed it for the yard last weekend.',
            text_ko: '꽤 오래 걸리셨네요. 지난 주말에 마당 정리하려고 했는데.',
            reaction: 'Well, excuse me. Next time take it to the shop.',
            reaction_ko: '거참, 미안하게 됐네. 다음엔 가게에 맡기게.'
          },
          {
            text: "Thanks, Carl. But what's a carburetor? Is that something I should replace?",
            text_ko: '고마워요, 칼. 그런데 기화기가 뭐예요? 그거 갈아야 하는 거예요?',
            reaction: "Nah, just needed cleaning out. She's fine now.",
            reaction_ko: '아니, 청소만 하면 됐어. 이제 멀쩡해.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'Those shops charge ninety bucks just to look at it. Robbery.',
        reply_ko: '그런 가게는 들여다보기만 해도 90달러를 받아. 날강도지.'
      },
      {
        speaker: 'carl',
        situation: 'You pull the cord. The engine starts on the first try.',
        situation_ko: '줄을 당깁니다. 엔진이 한 번에 걸립니다.',
        line: 'Hear that? Purring like a kitten.',
        line_ko: '들리나? 고양이처럼 그르렁거리잖아.',
        prompt: "Offer to pay for whatever parts he bought, and don't take no for an answer.",
        prompt_ko: '그가 산 부품값을 내겠다고 하고, 거절해도 물러서지 마세요.',
        model: 'What do I owe you for the parts? I insist.',
        model_ko: '부품값은 얼마 드리면 돼요? 꼭 드리고 싶어요.',
        distractors: [
          {
            text: "Here's ninety. That's what the shop would charge.",
            text_ko: '여기 90달러요. 가게에 맡겼으면 그만큼 냈을 거예요.',
            reaction: "Put that away. I'm not a repair shop.",
            reaction_ko: '넣어 두게. 내가 수리점인가.'
          },
          {
            text: 'Nice. How often should I change the oil on it?',
            text_ko: '좋네요. 오일은 얼마나 자주 갈아야 해요?',
            reaction: 'Every spring. Read the manual, son.',
            reaction_ko: '봄마다 한 번. 설명서 좀 읽게, 이 사람아.'
          },
          {
            text: 'What do I owe you for the spark plug? I insist.',
            text_ko: '점화 플러그값은 얼마 드리면 돼요? 꼭 드릴게요.',
            reaction: "It wasn't the spark plug. I told you.",
            reaction_ko: '점화 플러그가 아니었다니까. 말했잖나.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'Eleven dollars for a gasket. Keep your money. Buy me a coffee sometime.',
        reply_ko: '개스킷 하나에 11달러 들었네. 돈은 넣어 두게. 언제 커피나 한 잔 사.'
      },
      {
        speaker: 'carl',
        situation: 'Carl opens his toolbox on the tailgate.',
        situation_ko: '칼이 트럭 뒷문 위에 공구함을 엽니다.',
        line: "Anything else need fixing while I've got my tools out?",
        line_ko: '공구 꺼낸 김에 또 고칠 거 있나?',
        prompt: "Bring up the gutter over the front door, leaking since Tuesday, and ask whether it's a job you could do on your own.",
        prompt_ko: '화요일부터 새는 현관 위 빗물받이 얘기를 꺼내고, 그게 혼자서도 할 수 있는 일인지 물어보세요.',
        model: 'Now that you mention it, the gutter over the front door has been leaking since Tuesday. Is that something I can fix myself?',
        model_ko: '말씀하시니까 생각났는데, 현관 위 빗물받이가 화요일부터 새요. 그거 제가 직접 고칠 수 있는 건가요?',
        distractors: [
          {
            text: "Now that you mention it, the kitchen faucet has been dripping since Tuesday. Could you take a look at it while you're here?",
            text_ko: '말씀하시니까 생각났는데, 부엌 수도꼭지가 화요일부터 물이 떨어져요. 오신 김에 한번 봐 주실래요?',
            reaction: 'The faucet? Funny, I saw water by your front door, not the kitchen.',
            reaction_ko: '수도꼭지? 이상하군. 물기는 부엌이 아니라 현관 앞에서 봤는데.'
          },
          {
            text: 'Yes, the gutter over the front door is leaking. As my landlord, you should have fixed it already.',
            text_ko: '네, 현관 위 빗물받이가 새요. 집주인이시니까 그런 건 진작 고쳐 주셨어야죠.',
            reaction: 'Should have? Hold your horses. You never told me.',
            reaction_ko: '진작? 진정하게. 자네가 말을 안 했잖나.'
          },
          {
            text: "No, I think we're all good. I'll call a guy about that leaky gutter over the front door next week.",
            text_ko: '아니요, 다 괜찮아요. 현관 위 빗물받이는 다음 주에 사람 불러서 할게요.',
            reaction: "A guy? Why pay a guy? I'm standing right here.",
            reaction_ko: '사람을? 왜 돈을 써? 내가 바로 여기 있는데.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: "Probably just clogged with leaves. Get a ladder and a pair of gloves. Twenty minutes, tops. I'll hold the ladder.",
        reply_ko: '낙엽으로 막혔을 뿐일 걸세. 사다리하고 장갑을 가져오게. 길어야 20분이야. 사다리는 내가 잡아 주지.'
      },
      {
        speaker: 'carl',
        situation: 'Twenty minutes later the gutter is clear, and your gloves are full of wet leaves.',
        situation_ko: '20분 뒤 빗물받이가 뚫렸고, 장갑에는 젖은 낙엽이 가득합니다.',
        line: 'You should do this every fall, you know. Before the rain, not after.',
        line_ko: '이건 가을마다 해야 해. 비 오기 전에, 오고 나서 말고.',
        prompt: "Own up to procrastinating, and say you're relieved it's done before the weather turns tomorrow.",
        prompt_ko: '미루기만 했다고 인정하고, 내일 날씨가 궂어지기 전에 끝내서 다행이라고 하세요.',
        model: "I know, I keep putting it off. I'm glad we got to it before tomorrow's rain.",
        model_ko: '알아요, 자꾸 미루게 되더라고요. 내일 비 오기 전에 해서 다행이에요.',
        distractors: [
          {
            text: 'I know, I keep putting it off. Good thing we beat the big storm coming tonight.',
            text_ko: '알아요, 자꾸 미루게 되더라고요. 오늘 밤 오는 폭풍 전에 해서 다행이에요.',
            reaction: 'Tonight? The paper says tomorrow, all day.',
            reaction_ko: '오늘 밤? 신문엔 내일 종일이라던데.'
          },
          {
            text: "It's your house, Carl. Shouldn't the landlord do this every fall?",
            text_ko: '칼 집이잖아요. 가을마다 하는 건 집주인 일 아니에요?',
            reaction: 'Says the fella I just helped for free.',
            reaction_ko: '방금 내가 공짜로 도와준 사람이 할 소리는 아니지.'
          },
          {
            text: "Every fall? Next time I'll just pay someone. I'm not a fan of ladders.",
            text_ko: '가을마다요? 다음엔 그냥 사람 쓸래요. 사다리는 별로라서요.',
            reaction: 'Pay someone? For twenty minutes of work?',
            reaction_ko: '사람을 써? 20분짜리 일에?'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'Just in time. Showers all day tomorrow, the paper says.',
        reply_ko: '딱 맞춰 했구먼. 신문에 내일은 종일 소나기라더군.'
      },
      {
        speaker: 'carl',
        situation: 'Carl closes his toolbox and wipes his hands.',
        situation_ko: '칼이 공구함을 닫고 손을 닦습니다.',
        line: "Now it's my turn. I'm grilling at my place today at four. Jun from my building is coming, too. You in?",
        line_ko: '이제 내 차례야. 오늘 네 시에 우리 집에서 고기 굽네. 우리 건물 사는 준도 와. 올 텐가?',
        prompt: 'Accept the invitation, and offer to bring something sweet as a thank-you.',
        prompt_ko: '초대를 받아들이고, 고마움의 표시로 단 걸 가져가겠다고 하세요.',
        model: "I wouldn't miss it. Let me bring dessert. It's the least I can do.",
        model_ko: '절대 안 빠지죠. 디저트는 제가 가져갈게요. 그 정도는 해야죠.',
        distractors: [
          {
            text: "I wouldn't miss it. See you at six, then. Let me bring the dessert.",
            text_ko: '절대 안 빠지죠. 그럼 여섯 시에 봬요. 디저트는 제가 가져갈게요.',
            reaction: 'Six? I said four. The coals will be cold by six.',
            reaction_ko: '여섯 시? 네 시라고 했네. 여섯 시면 숯불 다 식어.'
          },
          {
            text: "Maybe. I'll see how I feel later and let you know, okay?",
            text_ko: '글쎄요. 이따가 컨디션 보고 알려 드릴게요, 괜찮죠?',
            reaction: "Suit yourself. There'll be plenty of food.",
            reaction_ko: '마음대로 하게. 음식은 넉넉할 거야.'
          },
          {
            text: "I'm in, but I'll only stay a few minutes. I've got work to do.",
            text_ko: '갈게요. 근데 몇 분만 있다 갈게요. 할 일이 있어서요.',
            reaction: 'On a Saturday? You work too much, Derek.',
            reaction_ko: '토요일에? 자넨 일을 너무 해, 데릭.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'Dessert works. Nothing with raisins. See you at four, Derek!',
        reply_ko: '디저트 좋지. 건포도 들어간 것만 빼고. 네 시에 보세, 데릭!'
      }
    ],
    phrases: [
      {
        id: 'dk_w2_mower.i_insist',
        text: 'I insist.',
        meaning_ko: '꼭 그러고 싶어요.',
        note: 'Said when someone politely refuses your offer and you really mean it.',
        note_ko: '상대가 예의상 사양할 때, 진심이라는 뜻으로 하는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_w2_mower.least_i_can_do',
        text: "It's the least I can do.",
        meaning_ko: '그 정도는 해야죠.',
        note: 'Said when you give something small in return for a big favor.',
        note_ko: '큰 도움에 작은 것으로 보답할 때 하는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_w2_mower.now_that_you_mention',
        text: 'Now that you mention it …',
        meaning_ko: '말이 나와서 말인데요 …',
        note: 'What you said reminded me of something.',
        note_ko: '상대의 말을 듣고 무언가 떠올랐을 때 씁니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_w2_mower.putting_it_off',
        text: 'I keep putting it off.',
        meaning_ko: '자꾸 미루게 돼요.',
        note: '"Put off" = delay. "Keep …ing" = do again and again.',
        note_ko: 'put off는 미룬다는 뜻이고, "keep …ing"는 자꾸 되풀이한다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_w2_mower.saved_me_a_trip',
        text: 'You saved me a trip to the repair shop.',
        meaning_ko: '덕분에 수리점에 안 가도 됐어요.',
        note: '"Save someone a trip" = make it unnecessary for them to go somewhere.',
        note_ko: 'save someone a trip은 어딘가에 갈 필요가 없게 해 준다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_w2_mower.thank_you_enough',
        text: "I can't thank you enough.",
        meaning_ko: '어떻게 감사해야 할지 모르겠어요.',
        note: 'Very strong thanks, for a big favor.',
        note_ko: '큰 도움을 받았을 때 쓰는 아주 강한 감사 표현입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_w2_mower.tops',
        text: 'Twenty minutes, tops.',
        meaning_ko: '길어야 20분이에요.',
        note: '"Tops" after a number = at the most. Casual.',
        note_ko: '숫자 뒤의 tops는 많아야, 길어야라는 편한 표현입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_w2_mower.what_do_i_owe',
        text: 'What do I owe you for the parts?',
        meaning_ko: '부품값으로 얼마 드리면 돼요?',
        note: 'A natural way to offer payment to a friend or neighbor.',
        note_ko: '친구나 이웃에게 돈을 내겠다고 자연스럽게 말하는 표현입니다.',
        category: 'money'
      }
    ]
  },
  {
    id: 'dk_w2_market',
    title: 'A rain check on the ice cream',
    title_ko: '아이스크림 레인 체크',
    place: 'market_checkout',
    npc: 'mike',
    day_from: 13,
    day_to: 13,
    time_from: '09:00',
    time_to: '16:00',
    summary: "You promised to bring dessert to Carl's barbecue, but the ice cream on sale is sold out. Ask Mike for a rain check, and take the store brand for today.",
    summary_ko: '칼의 바비큐에 디저트를 가져가기로 했는데, 할인하는 아이스크림이 다 팔렸습니다. 마이크에게 레인 체크를 부탁하고, 오늘은 매장 자체 브랜드 제품을 사세요.',
    reward: -4,
    sort: 20,
    tags: 'shopping,market,weekend,sale',
    calendar: { day: 13, time: '13:00', title: 'Dessert run to Fairview Market', title_ko: '페어뷰 마켓에서 디저트 사기' },
    turns: [
      {
        speaker: 'mike',
        situation: "Fairview Market on a warm Saturday. This week's flyer says vanilla ice cream is buy one, get one free, but the shelf in the freezer is empty. You walk up to Mike's lane.",
        situation_ko: '따뜻한 토요일의 페어뷰 마켓입니다. 이번 주 전단에는 바닐라 아이스크림이 하나 사면 하나 더라고 되어 있는데, 냉동고 선반이 텅 비어 있습니다. 마이크의 계산대로 갑니다.',
        line: 'Hey, Derek! Back again? Did you find everything okay?',
        line_ko: '안녕하세요, 데릭! 또 오셨네요? 찾으시는 건 다 찾으셨어요?',
        prompt: "Tell him the sale ice cream from the flyer is gone from the freezer, and ask if there's more in the stockroom.",
        prompt_ko: '전단에 나온 할인 아이스크림이 냉동고에 없다고 하고, 창고에 더 있는지 물어보세요.',
        model: 'Not quite. The ice cream in the flyer is sold out. Do you have any more in the back?',
        model_ko: '다는 아니에요. 전단에 나온 아이스크림이 다 팔렸더라고요. 창고에 더 있어요?',
        distractors: [
          {
            text: 'Not quite. The chocolate ice cream in the flyer is sold out. Is there any more in stock?',
            text_ko: '다는 아니에요. 전단에 나온 초콜릿 아이스크림이 다 팔렸더라고요. 재고 더 있어요?',
            reaction: "Chocolate? The flyer one's vanilla. Let me check anyway.",
            reaction_ko: '초콜릿이요? 전단에 나온 건 바닐라예요. 그래도 확인해 볼게요.'
          },
          {
            text: "No. Your sale ice cream is gone. Why advertise it if you don't have it?",
            text_ko: '아니요. 할인 아이스크림이 없던데요. 없는 걸 왜 광고해요?',
            reaction: "Whoa, easy. I don't write the flyers, man.",
            reaction_ko: '워, 진정하세요. 전단은 제가 만드는 게 아니에요.'
          },
          {
            text: "Yes, thanks. Just this bag of chips, and that's everything for today.",
            text_ko: '네, 고마워요. 이 감자칩 한 봉지만 계산하면 오늘은 다예요.',
            reaction: "Great. No ice cream today? It's a hot one.",
            reaction_ko: '좋아요. 오늘 아이스크림은 안 사세요? 이렇게 더운데.'
          }
        ],
        reply_speaker: 'mike',
        reply_line: "Let me check. Nope, we're cleaned out. It went fast in this heat.",
        reply_ko: '확인해 볼게요. 없네요, 싹 다 나갔어요. 날이 더우니 금방 팔렸어요.'
      },
      {
        speaker: 'mike',
        situation: 'Mike puts down the store phone.',
        situation_ko: '마이크가 매장 전화기를 내려놓습니다.',
        line: 'Sorry about that. The next truck comes on Tuesday.',
        line_ko: '죄송해요. 다음 트럭은 화요일에 와요.',
        prompt: "Ask for a slip that lets you pay the sale price later, once it's back in stock.",
        prompt_ko: '다시 들어오면 나중에 할인 가격으로 살 수 있게 해 주는 쪽지를 달라고 하세요.',
        model: 'Could I get a rain check, so I can get the sale price next week?',
        model_ko: '레인 체크 하나 받을 수 있을까요? 다음 주에 할인 가격으로 사게요.',
        distractors: [
          {
            text: 'Could you hold two for me when the truck comes on Tuesday?',
            text_ko: '화요일에 트럭 오면 두 개만 따로 빼 두실 수 있어요?',
            reaction: "Sorry, we can't hold stock. Store policy.",
            reaction_ko: '죄송해요, 물건을 따로 빼 둘 수는 없어요. 매장 규정이에요.'
          },
          {
            text: 'Could I just get the sale price on the fancy brand instead?',
            text_ko: '그럼 대신 비싼 브랜드를 할인 가격에 주시면 안 돼요?',
            reaction: "Sorry, I can't change prices at the register.",
            reaction_ko: '죄송해요, 계산대에서 가격을 바꿀 수는 없어요.'
          },
          {
            text: 'Could I get a rain check, so I can come back for the sale price tomorrow?',
            text_ko: '레인 체크 하나 받을 수 있을까요? 내일 다시 와서 할인 가격으로 사게요.',
            reaction: "Tomorrow? The truck doesn't come till Tuesday.",
            reaction_ko: '내일이요? 트럭은 화요일에나 와요.'
          }
        ],
        reply_speaker: 'mike',
        reply_line: "Sure thing. I'll write you one. It's good for thirty days.",
        reply_ko: '그럼요. 하나 써 드릴게요. 30일 동안 쓸 수 있어요.'
      },
      {
        speaker: 'mike',
        situation: 'He takes a pad of slips from under the register.',
        situation_ko: '그가 계산대 아래에서 쪽지 묶음을 꺼냅니다.',
        line: "How many do you want on it? There's a limit of two deals per customer.",
        line_ko: '몇 개로 적어 드릴까요? 손님 한 분당 두 개까지예요.',
        prompt: "Take the most he's allowed to give you.",
        prompt_ko: '허용되는 최대 수량으로 받으세요.',
        model: 'Then put me down for two, please.',
        model_ko: '그럼 두 개로 적어 주세요.',
        distractors: [
          {
            text: "Can you make it four? I'll be quick.",
            text_ko: '네 개로 안 될까요? 금방 할게요.',
            reaction: "Sorry, two's the limit. Nothing I can do.",
            reaction_ko: '죄송해요, 두 개가 한도예요. 저도 어쩔 수 없어요.'
          },
          {
            text: 'Then put me down for three, please.',
            text_ko: '그럼 세 개로 적어 주세요.',
            reaction: "Three? The limit's two, remember?",
            reaction_ko: '세 개요? 한도가 두 개라니까요.'
          },
          {
            text: "Just write today's date on it, please.",
            text_ko: '오늘 날짜만 적어 주세요.',
            reaction: 'Sure, but how many do you want on it?',
            reaction_ko: '네, 그런데 몇 개로 적어 드려요?'
          }
        ],
        reply_speaker: 'mike',
        reply_line: "Two it is. Here's your slip. Just show it at the register.",
        reply_ko: '두 개로 했어요. 여기 쪽지요. 계산할 때 보여 주기만 하면 돼요.'
      },
      {
        speaker: 'mike',
        situation: "You still need dessert for four o'clock.",
        situation_ko: '네 시에 가져갈 디저트가 여전히 필요합니다.',
        line: "Do you still need ice cream for today? The store brand isn't on sale, but it's a dollar cheaper anyway.",
        line_ko: '오늘 먹을 아이스크림은 아직 필요하세요? 자체 브랜드는 할인은 안 하는데, 그래도 1달러 더 싸요.',
        prompt: 'Accept the cheaper store brand: at a backyard cookout, no one will notice.',
        prompt_ko: '더 싼 자체 브랜드로 하세요. 뒷마당 바비큐에서는 아무도 눈치채지 못할 거예요.',
        model: "That'll do. At a barbecue, nobody will be able to tell the difference.",
        model_ko: '그거면 돼요. 바비큐에서는 아무도 차이를 모를 거예요.',
        distractors: [
          {
            text: "No thanks. Store brand tastes like cardboard. I'll skip dessert.",
            text_ko: '됐어요. 자체 브랜드는 종이 맛이 나요. 디저트는 그냥 안 할래요.',
            reaction: 'Hey, I eat that stuff! Your call, though.',
            reaction_ko: '에이, 저 그거 먹는데요! 뭐, 알아서 하세요.'
          },
          {
            text: "That'll do. Since it's a dollar more, though, I'll just take one carton.",
            text_ko: '그거면 돼요. 근데 1달러 더 비싸니까 한 통만 살게요.',
            reaction: "A dollar less, actually. It's the cheaper one.",
            reaction_ko: '사실 1달러 싸요. 더 싼 거예요.'
          },
          {
            text: "That'll do. Can I use my rain check on it today, then?",
            text_ko: '그거면 돼요. 그럼 레인 체크를 오늘 이걸로 써도 돼요?',
            reaction: "No, that's only good for the sale brand.",
            reaction_ko: '아니요, 그건 할인 브랜드에만 쓸 수 있어요.'
          }
        ],
        reply_speaker: 'mike',
        reply_line: "Your secret's safe with me. That's four forty-nine.",
        reply_ko: '비밀은 지켜 드릴게요. 4달러 49센트예요.'
      },
      {
        speaker: 'mike',
        situation: 'Mike puts the ice cream in an insulated bag.',
        situation_ko: '마이크가 아이스크림을 보냉 봉투에 담습니다.',
        line: 'Oh, and did the hardware store have your charcoal last week?',
        line_ko: '아, 그리고 지난주에 철물점에 숯 있었어요?',
        prompt: 'Tell him his suggestion worked out, and thank him for it.',
        prompt_ko: '그가 알려 준 게 잘 통했다고 하고, 고마워하세요.',
        model: 'They did. Thanks for the tip. You saved the day.',
        model_ko: '있었어요. 알려 줘서 고마워요. 덕분에 살았어요.',
        distractors: [
          {
            text: "They didn't, but the gas station had some. Thanks anyway.",
            text_ko: '없었는데, 주유소에 좀 있더라고요. 그래도 고마워요.',
            reaction: 'Huh. Sorry they let you down.',
            reaction_ko: '흠. 거기 없었다니 아쉽네요.'
          },
          {
            text: 'Yeah, they did. Kind of pricey there, though.',
            text_ko: '네, 있었어요. 거기 좀 비싸긴 하더라고요.',
            reaction: 'Well, better than nothing, right?',
            reaction_ko: '그래도 없는 것보단 낫죠?'
          },
          {
            text: "I'm using gas this time. Charcoal takes too long.",
            text_ko: '이번엔 가스로 해요. 숯은 너무 오래 걸려요.',
            reaction: 'Oh. I thought you were grilling with charcoal.',
            reaction_ko: '아. 숯으로 구우시는 줄 알았어요.'
          }
        ],
        reply_speaker: 'mike',
        reply_line: "Glad to hear it. Enjoy the barbecue, and don't let that melt!",
        reply_ko: '다행이네요. 바비큐 맛있게 하시고, 그거 녹지 않게 하세요!'
      }
    ],
    phrases: [
      {
        id: 'dk_w2_market.good_for',
        text: "It's good for thirty days.",
        meaning_ko: '30일 동안 쓸 수 있어요.',
        note: '"Good for" + time = valid for that long.',
        note_ko: '"good for + 기간"은 그 기간 동안 유효하다는 뜻입니다.',
        category: 'shopping'
      },
      {
        id: 'dk_w2_market.in_the_back',
        text: 'Do you have any more in the back?',
        meaning_ko: '창고에 더 있어요?',
        note: '"In the back" = in the stockroom, behind the sales floor.',
        note_ko: 'in the back은 매장 뒤편의 창고를 말합니다.',
        category: 'shopping'
      },
      {
        id: 'dk_w2_market.limit_per_customer',
        text: 'a limit of two per customer',
        meaning_ko: '고객 한 명에 두 개까지',
        note: 'Common on sale signs: each shopper may buy only that many.',
        note_ko: '할인 표지에 흔한 문구로, 한 사람이 그 수량까지만 살 수 있다는 뜻입니다.',
        category: 'shopping'
      },
      {
        id: 'dk_w2_market.put_me_down',
        text: 'Put me down for two.',
        meaning_ko: '두 개로 적어 주세요.',
        note: 'Asks someone to write your name on a list for that amount.',
        note_ko: '그 수량으로 내 이름을 명단에 적어 달라는 말입니다.',
        category: 'shopping'
      },
      {
        id: 'dk_w2_market.rain_check',
        text: 'Could I get a rain check?',
        meaning_ko: '레인 체크를 받을 수 있을까요?',
        note: 'In a store: a slip that lets you buy a sold-out sale item later at the sale price. With friends, "take a rain check" means "another time".',
        note_ko: '가게에서는 다 팔린 할인 품목을 나중에 할인 가격으로 살 수 있게 해 주는 쪽지입니다. 친구 사이에서 take a rain check는 다음 기회에라는 뜻입니다.',
        category: 'shopping'
      },
      {
        id: 'dk_w2_market.sold_out',
        text: 'The ice cream is sold out.',
        meaning_ko: '아이스크림이 다 팔렸어요.',
        note: "None left to buy. The cashier may say \"We're cleaned out.\"",
        note_ko: "살 수 있는 것이 남아 있지 않다는 뜻입니다. 계산원은 \"We're cleaned out.\"이라고도 합니다.",
        category: 'shopping'
      },
      {
        id: 'dk_w2_market.store_brand',
        text: 'the store brand',
        meaning_ko: '매장 자체 브랜드',
        note: "The store's own, cheaper version of a product.",
        note_ko: '가게가 자체적으로 내놓는 더 저렴한 제품입니다.',
        category: 'shopping'
      },
      {
        id: 'dk_w2_market.thanks_for_the_tip',
        text: 'Thanks for the tip.',
        meaning_ko: '알려 줘서 고마워요.',
        note: 'A tip can be useful advice, not only money for service.',
        note_ko: 'tip은 서비스에 주는 돈뿐 아니라 유용한 조언도 뜻합니다.',
        category: 'small-talk'
      }
    ]
  },
  {
    id: 'dk_w2_brunch',
    title: 'A rainy Sunday at the Sunny Side',
    title_ko: '비 오는 일요일, 서니 사이드에서',
    place: 'diner_counter',
    npc: 'rosa',
    day_from: 14,
    day_to: 14,
    time_from: '08:00',
    time_to: '14:00',
    summary: 'Showers all day, and the diner is packed. Take a seat at the counter, order brunch just the way you like it, tell Rosa the news about Jun, and ask for a box and the check.',
    summary_ko: '종일 소나기가 오고 다이너는 만석입니다. 카운터에 앉아 브런치를 입맛대로 주문하고, 로사에게 준의 소식을 전하고, 포장 상자와 계산서를 부탁하세요.',
    reward: -19,
    energy: 40,
    sort: 10,
    tags: 'food,diner,weekend,brunch,tipping',
    calendar: { day: 14, time: '10:30', title: 'Brunch at the Sunny Side Diner', title_ko: '서니 사이드 다이너에서 브런치' },
    turns: [
      {
        speaker: 'rosa',
        situation: "Sunday. It has been raining since dawn. The diner's windows are fogged up, and every booth is taken. You shake off your umbrella at the door.",
        situation_ko: '일요일입니다. 새벽부터 비가 옵니다. 다이너 창문에는 김이 서렸고 부스 자리는 모두 찼습니다. 문 앞에서 우산의 물기를 텁니다.',
        line: "Derek! Come in out of the rain, hon. It's a twenty-minute wait for a booth, or you can sit at the counter right now.",
        line_ko: '데릭! 비 맞지 말고 얼른 들어와요. 부스는 20분 기다려야 하고, 카운터는 지금 바로 앉을 수 있어요.',
        prompt: "Take the seat that's free now; you're not in any rush.",
        prompt_ko: '지금 비어 있는 자리에 앉겠다고 하세요. 오늘은 바쁠 게 없어요.',
        model: "The counter's fine by me. I'm in no hurry today.",
        model_ko: '카운터면 좋아요. 오늘은 급할 거 없어요.',
        distractors: [
          {
            text: "A booth for two, please. I don't mind the wait.",
            text_ko: '두 사람 부스로 주세요. 기다려도 괜찮아요.',
            reaction: 'Two? Is someone joining you, hon?',
            reaction_ko: '두 분이요? 누가 같이 와요?'
          },
          {
            text: "Can't you squeeze me into a booth? I'm a regular.",
            text_ko: '부스에 좀 끼워 주면 안 돼요? 단골이잖아요.',
            reaction: "Sorry, hon. Regular or not, there's a wait.",
            reaction_ko: '미안해요. 단골이어도 기다려야 해요.'
          },
          {
            text: "The counter's fine. Can you hurry, though? I'm starving.",
            text_ko: '카운터 좋아요. 근데 빨리 돼요? 배고파요.',
            reaction: "I'll do my best, but the kitchen's slammed.",
            reaction_ko: '최대한 해 볼게요. 그런데 주방이 정신없어요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: "That's what Sundays are for. Coffee's on its way.",
        reply_ko: '일요일은 그러라고 있는 거죠. 커피 금방 가져올게요.'
      },
      {
        speaker: 'rosa',
        situation: 'She pours your coffee and points her pencil at the board.',
        situation_ko: '그녀가 커피를 따르고 연필로 메뉴판을 가리킵니다.',
        line: "What'll it be? The brunch menu's on the board.",
        line_ko: '뭐로 할래요? 브런치 메뉴는 칠판에 있어요.',
        prompt: 'Order the veggie omelet and hash browns, cooked the way you like them: really well done and crunchy.',
        prompt_ko: '채소 오믈렛에 해시 브라운을 주문하세요. 해시 브라운은 당신 취향대로, 아주 잘 익혀서 바삭바삭하게요.',
        model: "I'll have the veggie omelet with hash browns. Could you make them extra crispy?",
        model_ko: '채소 오믈렛에 해시 브라운으로 할게요. 해시 브라운은 아주 바삭하게 해 주실래요?',
        distractors: [
          {
            text: "I'll have the ham and cheese omelet with hash browns. Could you make them extra crispy?",
            text_ko: '햄 치즈 오믈렛에 해시 브라운으로 할게요. 해시 브라운은 아주 바삭하게 해 주실래요?',
            reaction: "Ham and cheese? That's new for you, hon.",
            reaction_ko: '햄 치즈요? 웬일이에요.'
          },
          {
            text: 'Veggie omelet, hash browns. Crispy this time, not like last week.',
            text_ko: '채소 오믈렛, 해시 브라운. 이번엔 바삭하게요. 지난주처럼 말고요.',
            reaction: 'Well, somebody woke up on the wrong side of the bed.',
            reaction_ko: '어머, 누가 아침부터 기분이 안 좋으시네.'
          },
          {
            text: "What do you recommend? I can't really read the board from here.",
            text_ko: '뭐가 맛있어요? 여기서는 칠판 글씨가 잘 안 보여서 못 읽겠어요.',
            reaction: "Everything's good, hon. What are you in the mood for?",
            reaction_ko: '다 맛있어요. 뭐가 당겨요?'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Extra crispy, you got it.',
        reply_ko: '아주 바삭하게, 알겠어요.'
      },
      {
        speaker: 'rosa',
        situation: 'She keeps writing.',
        situation_ko: '그녀가 계속 받아 적습니다.',
        line: 'It comes with toast. Wheat or sourdough? Butter on it?',
        line_ko: '토스트가 같이 나와요. 통밀이요, 사워도우요? 버터 발라 드릴까요?',
        prompt: "Pick the sourdough, and you'd like to butter it yourself.",
        prompt_ko: '사워도우를 고르고, 버터는 직접 바르고 싶다고 하세요.',
        model: 'Sourdough, please, with the butter on the side.',
        model_ko: '사워도우로 주세요. 버터는 따로 주시고요.',
        distractors: [
          {
            text: 'Wheat toast, please, with the butter on the side.',
            text_ko: '통밀 토스트로 주세요. 버터는 따로 주시고요.',
            reaction: 'Wheat? I thought you were a sourdough guy.',
            reaction_ko: '통밀이요? 사워도우파인 줄 알았는데.'
          },
          {
            text: 'Sourdough, please, and lots of butter on it.',
            text_ko: '사워도우로 주세요. 버터 듬뿍 발라서요.',
            reaction: "Lots of butter? Your doctor won't like that.",
            reaction_ko: '버터 듬뿍이요? 의사 선생님이 싫어하겠네.'
          },
          {
            text: 'No toast. Can I swap it for pancakes, free?',
            text_ko: '토스트는 빼고요. 팬케이크로 공짜로 바꿔 줘요?',
            reaction: 'Pancakes are extra, hon. Toast is what it comes with.',
            reaction_ko: '팬케이크는 추가 요금이에요. 원래 토스트가 나와요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Sourdough, butter on the side. Be right back, hon.',
        reply_ko: '사워도우에 버터는 따로. 금방 올게요.'
      },
      {
        speaker: 'rosa',
        situation: 'Your plate is half empty. Rosa comes by with the coffee pot.',
        situation_ko: '접시가 절반쯤 비었습니다. 로사가 커피포트를 들고 옵니다.',
        line: "More coffee? So how's that new kid doing? He was in here yesterday, telling me all about some big trip.",
        line_ko: '커피 더 줄까요? 그래서 그 신입은 잘하고 있어요? 어제 여기 와서 무슨 큰 출장 얘기를 한참 하던데.',
        prompt: "Accept a little more coffee, and share Jun's big news with real pride.",
        prompt_ko: '커피를 조금 더 받고, 준의 큰 소식을 진심으로 자랑스럽게 전하세요.',
        model: "Just a warm-up, thanks. He closed his first deal this week. I couldn't be prouder.",
        model_ko: '조금만 더 주세요, 고마워요. 이번 주에 첫 계약을 따냈어요. 이보다 자랑스러울 수가 없어요.',
        distractors: [
          {
            text: 'Just a warm-up, thanks. He lost the deal, but he learned a lot from it.',
            text_ko: '조금만 더 주세요, 고마워요. 계약은 놓쳤는데, 그래도 많이 배웠대요.',
            reaction: "Aw, that's too bad. He seemed so excited.",
            reaction_ko: '아이고, 안됐네요. 그렇게 들떠 있더니.'
          },
          {
            text: 'Just a warm-up, thanks. He closed his first deal. I taught him everything he knows.',
            text_ko: '조금만 더 주세요, 고마워요. 첫 계약을 따냈어요. 다 제가 가르친 거예요.',
            reaction: "Ha! Modest, aren't we?",
            reaction_ko: '하! 겸손도 하셔라.'
          },
          {
            text: "No more coffee, thanks. And I'd rather not talk about work on a Sunday.",
            text_ko: '커피는 됐어요, 고마워요. 그리고 일요일엔 일 얘기 안 하고 싶어요.',
            reaction: 'Fair enough, hon. Sundays are for resting.',
            reaction_ko: '그래요. 일요일은 쉬는 날이죠.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Good for him! He had a good teacher, I bet.',
        reply_ko: '잘됐네요! 좋은 선생님을 만난 덕이겠죠.'
      },
      {
        speaker: 'rosa',
        situation: 'The omelet was huge. You put down your fork.',
        situation_ko: '오믈렛이 아주 컸습니다. 포크를 내려놓습니다.',
        line: "You're slowing down. Want me to wrap that up for you?",
        line_ko: '속도가 줄었네요. 그거 싸 드릴까요?',
        prompt: 'Ask to take the leftovers home, and ask for the bill without rushing her.',
        prompt_ko: '남은 음식을 싸 가고 싶다고 하고, 그녀를 재촉하지 않으면서 계산서를 부탁하세요.',
        model: 'Yes, please. Could I get a box for the rest? And the check, whenever you get a chance.',
        model_ko: '네, 부탁해요. 남은 거 담을 상자 하나 주실래요? 계산서도요, 시간 날 때요.',
        distractors: [
          {
            text: "No, thanks. I'll finish it here. Could I get some more coffee, though?",
            text_ko: '아니요, 괜찮아요. 여기서 다 먹을게요. 대신 커피 좀 더 주실래요?',
            reaction: 'Sure, hon, but you looked done to me.',
            reaction_ko: '그래요. 근데 다 드신 것 같던데.'
          },
          {
            text: 'Yes, box it up, and bring me the check right now, please. I really need to get going soon.',
            text_ko: '네, 싸 주세요. 그리고 계산서 지금 당장 갖다주세요. 진짜 빨리 가 봐야 해요.',
            reaction: "Okay, okay. Weren't you in no hurry?",
            reaction_ko: '알았어요, 알았어요. 급할 거 없다면서요?'
          },
          {
            text: 'Yes, please. Could you box it up and split the check between two people?',
            text_ko: '네, 부탁해요. 싸 주시고, 계산서는 두 사람으로 나눠 주실래요?',
            reaction: 'Two? You came in alone, hon.',
            reaction_ko: '두 사람이요? 혼자 오셨잖아요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: "One box, one check. That's sixteen twenty-four with tax.",
        reply_ko: '상자 하나, 계산서 하나. 세금 포함 16달러 24센트예요.'
      },
      {
        speaker: 'rosa',
        situation: 'The check says $16.24. You take a twenty out of your wallet. About eighteen percent of fifteen dollars is $2.70.',
        situation_ko: '계산서에는 16.24달러라고 적혀 있습니다. 지갑에서 20달러짜리를 꺼냅니다. 15달러의 18퍼센트쯤이면 2.70달러입니다.',
        line: 'No rush, hon.',
        line_ko: '천천히 해요.',
        prompt: 'Pay with your twenty, and leave a tip of about $2.70.',
        prompt_ko: '20달러로 내고, 팁은 2.70달러쯤 남기세요.',
        model: "Here's a twenty. Could I get a dollar back? The rest is for you.",
        model_ko: '여기 20달러요. 1달러만 거슬러 주실래요? 나머지는 드릴게요.',
        distractors: [
          {
            text: "Here's a twenty. Could I get three dollars back? The rest is for you.",
            text_ko: '여기 20달러요. 3달러 거슬러 주실래요? 나머지는 드릴게요.',
            reaction: 'Three back? That leaves me less than a dollar, hon.',
            reaction_ko: '3달러요? 그럼 저한테 1달러도 안 남는데요.'
          },
          {
            text: "Here's a twenty. I'll need all the change back, every cent.",
            text_ko: '여기 20달러요. 거스름돈은 한 푼도 빠짐없이 다 주세요.',
            reaction: 'Sure thing. Every cent.',
            reaction_ko: '그럼요. 한 푼도 빠짐없이요.'
          },
          {
            text: "Can I pay by card instead? I'll add the tip on there.",
            text_ko: '카드로 내도 돼요? 팁은 거기에 같이 넣을게요.',
            reaction: "Sure, but you've already got a twenty out.",
            reaction_ko: '되긴 하는데, 벌써 20달러 꺼내셨잖아요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: "You're a sweetheart. Stay dry out there!",
        reply_ko: '정말 다정하시네요. 비 맞지 말고 가요!'
      }
    ],
    phrases: [
      {
        id: 'dk_w2_brunch.couldnt_be_prouder',
        text: "I couldn't be prouder.",
        meaning_ko: '더없이 자랑스러워요.',
        note: "\"Couldn't be\" + comparative = as much as possible.",
        note_ko: "\"couldn't be + 비교급\"은 그 이상일 수 없을 만큼이라는 뜻입니다.",
        category: 'small-talk'
      },
      {
        id: 'dk_w2_brunch.dollar_back',
        text: 'Could I get a dollar back?',
        meaning_ko: '1달러만 거슬러 주시겠어요?',
        note: 'When you pay cash, say how much change you want. What is left is the tip.',
        note_ko: '현금으로 낼 때 거스름돈을 얼마 받을지 말합니다. 남는 돈이 팁입니다.',
        category: 'money'
      },
      {
        id: 'dk_w2_brunch.extra_crispy',
        text: 'Could you make them extra crispy?',
        meaning_ko: '아주 바삭하게 해 주시겠어요?',
        note: 'Diners cook to order. Also: "well done", "lightly toasted".',
        note_ko: '다이너는 주문대로 조리해 줍니다. well done, lightly toasted 같은 말도 씁니다.',
        category: 'food'
      },
      {
        id: 'dk_w2_brunch.fine_by_me',
        text: "The counter's fine by me.",
        meaning_ko: '저는 카운터 자리 좋아요.',
        note: '"Fine by me" = I have no problem with that.',
        note_ko: 'fine by me는 나는 그래도 괜찮다는 뜻입니다.',
        category: 'food'
      },
      {
        id: 'dk_w2_brunch.get_a_chance',
        text: 'whenever you get a chance',
        meaning_ko: '시간 날 때',
        note: 'A polite way to ask without hurrying a busy person.',
        note_ko: '바쁜 사람을 재촉하지 않고 정중하게 부탁하는 표현입니다.',
        category: 'food'
      },
      {
        id: 'dk_w2_brunch.in_no_hurry',
        text: "I'm in no hurry.",
        meaning_ko: '급할 거 없어요.',
        note: "You have plenty of time. The opposite: \"I'm in a rush.\"",
        note_ko: "시간이 넉넉하다는 뜻입니다. 반대는 \"I'm in a rush.\"입니다.",
        category: 'small-talk'
      },
      {
        id: 'dk_w2_brunch.on_the_side',
        text: 'with the butter on the side',
        meaning_ko: '버터는 따로 담아서',
        note: 'Served separately, so you add as much as you want.',
        note_ko: '따로 담아 줘서 원하는 만큼 넣을 수 있습니다.',
        category: 'food'
      },
      {
        id: 'dk_w2_brunch.warm_up',
        text: 'Just a warm-up, thanks.',
        meaning_ko: '조금만 더 채워 주세요.',
        note: 'A little more hot coffee in a cup that is not empty. Refills are usually free at a diner.',
        note_ko: '비지 않은 잔에 뜨거운 커피를 조금 더 채우는 것입니다. 다이너에서는 리필이 대개 무료입니다.',
        category: 'food'
      }
    ]
  },
  {
    id: 'dk_d15_back',
    title: 'Welcome back, Jun',
    title_ko: '돌아온 준',
    place: 'office_desk',
    npc: 'jun',
    day_from: 15,
    day_to: 15,
    time_from: '11:00',
    time_to: '12:15',
    summary: 'Jun is back from Ridgeport and has reviewed your store ID fix. Praise his trip report, take his one comment well, explain how the dashboard work will go now that you are the technical lead, and look out for him: he is coughing.',
    summary_ko: '준이 리지포트에서 돌아와 당신의 매장 ID 수정 코드를 리뷰했습니다. 그의 출장 보고를 칭찬하고, 코멘트 하나를 잘 받아들이고, 당신이 기술 책임을 맡은 대시보드 일이 어떻게 진행될지 설명하고, 기침하는 그를 챙겨 주세요.',
    sort: 1500,
    tags: 'coworker,code-review,mentoring,week3',
    calendar: { day: 15, time: '11:00', title: 'Catch up with Jun: the store ID fix', title_ko: '준과 근황 나누기: 매장 ID 수정' },
    turns: [
      {
        situation: "Monday, gray and cool. The standup is over, and you stop by Jun's desk. He's rubbing his eyes.",
        situation_ko: '흐리고 선선한 월요일입니다. 스탠드업이 끝나고 준의 자리에 들릅니다. 그가 눈을 비비고 있습니다.',
        line: "Hey, Derek. Sorry, I'm a bit slow today. Two days of meetings with Greg, and I'm still catching up on sleep.",
        line_ko: '안녕하세요, 데릭. 죄송해요, 오늘 좀 멍해요. 그렉이랑 이틀 내내 회의하고 아직 잠이 모자라요.',
        prompt: 'Welcome him back, and tell him how his trip report in the standup came across.',
        prompt_ko: '돌아온 걸 반겨 주고, 스탠드업에서 한 출장 보고가 어땠는지 말해 주세요.',
        model: 'Welcome back! You nailed the trip report this morning. Everyone was impressed.',
        model_ko: '잘 돌아왔어요! 아침 출장 보고 완벽했어요. 다들 감탄했어요.',
        distractors: [
          {
            text: 'Welcome back. Your trip report ran a little long, though. Keep it shorter next time.',
            text_ko: '잘 돌아왔어요. 근데 출장 보고가 좀 길었어요. 다음엔 짧게 해요.',
            reaction: 'Oh. Sorry. I guess I got a little carried away.',
            reaction_ko: '아. 죄송해요. 좀 신이 났었나 봐요.'
          },
          {
            text: "Welcome back! Great trip report. Too bad Greg still hasn't signed, though.",
            text_ko: '잘 돌아왔어요! 출장 보고 좋았어요. 그렉이 아직 사인 안 한 게 아쉽지만요.',
            reaction: "Hasn't signed? He signed on Friday, Derek. I called you!",
            reaction_ko: '사인 안 했다고요? 금요일에 했어요, 데릭. 전화도 드렸잖아요!'
          },
          {
            text: 'Welcome back! You look terrible. Did you get any sleep at all on the flight?',
            text_ko: '잘 돌아왔어요! 얼굴이 말이 아니네요. 비행기에서 잠은 좀 잤어요?',
            reaction: 'Not really. Thanks for noticing, I guess.',
            reaction_ko: '별로요. 알아봐 주셔서... 고맙네요.'
          }
        ],
        reply_line: "Thanks! I was nervous, but it's easy when the news is good.",
        reply_ko: '고마워요! 떨렸는데, 좋은 소식이라 쉬웠어요.'
      },
      {
        situation: 'He pulls up your pull request for the store ID bug. There is one comment on it.',
        situation_ko: '그가 매장 ID 버그를 고친 당신의 풀 리퀘스트를 띄웁니다. 코멘트가 하나 달려 있습니다.',
        line: 'I went through your fix. It looks good. Just one thing: the tests use made-up IDs. Dana sent us the real data from the seven stores on Friday.',
        line_ko: '수정한 거 봤어요. 좋아요. 하나만요. 테스트가 지어낸 ID를 쓰더라고요. 데이나가 금요일에 매장 일곱 곳의 실제 데이터를 보내 줬어요.',
        prompt: 'Agree it is a fair point, and ask him to check the fix against the real data before the date you gave Dana.',
        prompt_ko: '타당한 지적이라고 인정하고, 데이나에게 약속한 날짜 전에 실제 데이터로 수정을 확인해 달라고 하세요.',
        model: "Good catch. That's why we told Dana Wednesday. Could you run it on her data today?",
        model_ko: '잘 잡았어요. 그래서 데이나한테 수요일이라고 한 거예요. 오늘 그 데이터로 돌려 봐 줄래요?',
        distractors: [
          {
            text: "Good catch. That's why we told Dana Friday. Could you run it on her data this week?",
            text_ko: '잘 잡았어요. 그래서 데이나한테 금요일이라고 한 거예요. 이번 주 안에 그 데이터로 돌려 봐 줄래요?',
            reaction: 'Friday? I thought Priya told her Wednesday.',
            reaction_ko: '금요일이요? 프리야가 수요일이라고 한 줄 알았는데요.'
          },
          {
            text: "No need. The fix is simple, so fake IDs are good enough. Let's just merge it.",
            text_ko: '그럴 필요 없어요. 수정이 간단해서 가짜 ID로 충분해요. 그냥 머지해요.',
            reaction: 'Hmm. But those seven stores are the whole problem.',
            reaction_ko: '음. 근데 문제가 바로 그 일곱 매장인데요.'
          },
          {
            text: "I tested it plenty, Jun. If you don't trust it, go ahead and run it yourself.",
            text_ko: '충분히 테스트했어요, 준. 못 믿겠으면 직접 돌려 봐요.',
            reaction: "Sorry, I didn't mean it that way.",
            reaction_ko: '죄송해요, 그런 뜻은 아니었어요.'
          }
        ],
        reply_line: "Sure. If it passes, I'll approve it this afternoon.",
        reply_ko: '그럴게요. 통과하면 오후에 승인할게요.'
      },
      {
        situation: 'Jun lowers his voice a little.',
        situation_ko: '준이 목소리를 조금 낮춥니다.',
        line: "Maya said you're the technical lead on the dashboard now. Congrats! So... do I report to you now?",
        line_ko: '마야가 이제 데릭이 대시보드 기술 책임이라고 하던데요. 축하해요! 그럼... 이제 데릭한테 보고하는 거예요?',
        prompt: 'Explain how the two of you will work on it, without sounding like his new boss.',
        prompt_ko: '새 상사처럼 들리지 않게, 둘이 이 일을 어떻게 할지 설명하세요.',
        model: "No, Maya's still your manager. I'll help with the big calls, but you'll build most of it.",
        model_ko: '아니요, 매니저는 여전히 마야예요. 큰 결정은 제가 돕고, 만드는 건 대부분 준이 해요.',
        distractors: [
          {
            text: 'Yes, starting today you report to me. Maya made it official in our meeting first thing this morning.',
            text_ko: '네, 오늘부터 저한테 보고해요. 아침 회의에서 마야가 공식적으로 정했어요.',
            reaction: "Oh. Really? Maya didn't mention that part.",
            reaction_ko: '아. 정말요? 마야는 그 얘긴 안 했는데요.'
          },
          {
            text: "Sort of. You'll build most of it, but I'll review every single commit before it goes in.",
            text_ko: '비슷해요. 만드는 건 대부분 준이 하지만, 커밋은 하나하나 들어가기 전에 제가 다 볼 거예요.',
            reaction: "Every commit? Okay... I'll try not to slow you down.",
            reaction_ko: '커밋 하나하나요? 네... 늦어지지 않게 해 볼게요.'
          },
          {
            text: "No, but the deadline's tight, so I'll build most of it. You can help with the testing.",
            text_ko: '아니요, 근데 마감이 빠듯해서 대부분 제가 만들 거예요. 준은 테스트를 도와줘요.',
            reaction: 'Oh. I was hoping to build it. I know their data now.',
            reaction_ko: '아. 제가 만들고 싶었는데요. 이제 그쪽 데이터도 알고요.'
          }
        ],
        reply_line: "Got it. Honestly, that's a relief. I can't wait to start.",
        reply_ko: '알겠어요. 솔직히 마음이 놓이네요. 빨리 시작하고 싶어요.'
      },
      {
        situation: 'Jun coughs into his elbow, then again.',
        situation_ko: '준이 팔꿈치에 대고 기침을 하더니, 또 합니다.',
        line: "Sorry. It's just the dry air on the plane. I'm fine, really.",
        line_ko: '죄송해요. 비행기 안 공기가 건조해서 그래요. 정말 괜찮아요.',
        prompt: 'Look out for him: tell him not to push himself, and what to do if he feels worse.',
        prompt_ko: '그를 챙겨 주세요. 무리하지 말라고 하고, 더 안 좋아지면 어떻게 할지 말해 주세요.',
        model: "Take it easy today. If you feel worse tomorrow, stay home. We'll manage.",
        model_ko: '오늘은 무리하지 마요. 내일 더 안 좋으면 집에서 쉬어요. 우리가 알아서 할게요.',
        distractors: [
          {
            text: 'Push through for now. Phase one kicks off next week, so nobody can be out.',
            text_ko: '일단 버텨 봐요. 다음 주에 1단계 시작이라 아무도 빠지면 안 돼요.',
            reaction: "Right. I'll be fine. I hope.",
            reaction_ko: '그렇죠. 괜찮을 거예요. 아마도요.'
          },
          {
            text: "Okay, but sit a little farther away. I can't afford to get sick this week.",
            text_ko: '알겠어요, 근데 좀 떨어져 앉아요. 이번 주엔 저 아프면 안 돼요.',
            reaction: "Oh. Sure. I'll keep my distance.",
            reaction_ko: '아. 네. 떨어져 있을게요.'
          },
          {
            text: "Go home now. I'll finish testing my fix and approve it myself.",
            text_ko: '지금 집에 가요. 테스트는 제가 마저 하고 제 수정은 제가 승인할게요.',
            reaction: 'Approve your own fix? No, no. I can do the testing.',
            reaction_ko: '직접 승인한다고요? 아니에요. 테스트는 제가 할 수 있어요.'
          }
        ],
        reply_line: "Thanks, Derek. I'll grab some tea from the kitchen and take it slow.",
        reply_ko: '고마워요, 데릭. 탕비실에서 차 한 잔 들고 천천히 할게요.'
      }
    ]
  },
  {
    id: 'dk_d15_comp_time',
    title: 'Half a day off',
    title_ko: '반나절 보상 휴가',
    place: 'office_manager',
    npc: 'maya',
    day_from: 15,
    day_to: 15,
    time_from: '13:30',
    time_to: '17:30',
    summary: 'Your week on call earned you half a day of comp time. Ask Maya for it, pick an afternoon that clashes with nothing, tell her how things are covered, and answer her questions about Jun and the dashboard.',
    summary_ko: '온콜 한 주로 반나절 보상 휴가가 생겼습니다. 마야에게 요청하고, 어떤 일정과도 겹치지 않는 오후를 고르고, 그동안 일이 어떻게 돌아갈지 말하고, 준과 대시보드에 대한 그녀의 질문에 답하세요.',
    sort: 1510,
    tags: 'manager,time-off,comp-time,week3',
    calendar: { day: 15, time: '14:30', title: 'Ask Maya about your comp time', title_ko: '마야에게 보상 휴가 요청' },
    turns: [
      {
        situation: "Monday afternoon. Linda said your week on call earns you half a day off, and Maya approves it. Maya's door is open.",
        situation_ko: '월요일 오후입니다. 린다 말로는 온콜 한 주에 반일 휴가가 나오고, 승인은 마야가 합니다. 마야의 방문이 열려 있습니다.',
        line: "Derek, come on in. What's up?",
        line_ko: '데릭, 들어와요. 무슨 일이에요?',
        prompt: "Check that she has a moment, and say what you've come about.",
        prompt_ko: '잠깐 시간이 되는지 묻고, 무슨 일로 왔는지 말하세요.',
        model: "Got a minute? I'd like to use the comp time from my week on call.",
        model_ko: '잠깐 괜찮으세요? 온콜 주간 보상 휴가를 쓰고 싶어서요.',
        distractors: [
          {
            text: "I'm taking Friday afternoon off. Linda already said it's fine.",
            text_ko: '금요일 오후에 쉴게요. 린다가 이미 괜찮다고 했어요.',
            reaction: 'Linda did? Time off goes through me, Derek.',
            reaction_ko: '린다가요? 휴가는 저를 거쳐야 해요, 데릭.'
          },
          {
            text: "Got a minute? I'd like comp time for the interviews I'm doing this week.",
            text_ko: '잠깐 괜찮으세요? 이번 주에 하는 면접에 대해 보상 휴가를 받고 싶어서요.',
            reaction: "Interviews are part of the job. They don't earn comp time.",
            reaction_ko: '면접은 업무의 일부예요. 보상 휴가는 안 나와요.'
          },
          {
            text: 'Sorry to bother you. Is there any way I could take a whole day off soon?',
            text_ko: '귀찮게 해서 죄송해요. 조만간 하루 통째로 쉴 수 있을까요?',
            reaction: "A whole day? What's the occasion?",
            reaction_ko: '하루 종일이요? 무슨 일 있어요?'
          }
        ],
        reply_line: 'Sure. Linda mentioned it. Half a day, right?',
        reply_ko: '그럼요. 린다한테 들었어요. 반나절이죠?'
      },
      {
        situation: 'Maya opens the team calendar.',
        situation_ko: '마야가 팀 달력을 엽니다.',
        line: 'When were you thinking? The next couple of weeks are pretty full.',
        line_ko: '언제로 생각해요? 앞으로 2주가 꽤 꽉 찼는데요.',
        prompt: "Suggest an afternoon this week that won't get in the way of anything you've already agreed to.",
        prompt_ko: '이미 하기로 한 일에 방해되지 않는, 이번 주 오후 하나를 제안하세요.',
        model: "How about Friday afternoon? My interviews are Tuesday and Thursday, so Friday's clear.",
        model_ko: '금요일 오후는 어때요? 면접이 화요일이랑 목요일이라 금요일은 비어 있어요.',
        distractors: [
          {
            text: "How about Thursday afternoon? My interviews are Tuesday and Friday, so Thursday's clear.",
            text_ko: '목요일 오후는 어때요? 면접이 화요일이랑 금요일이라 목요일은 비어 있어요.',
            reaction: 'Thursday? Linda has you on the panel that day.',
            reaction_ko: '목요일이요? 린다가 그날 면접관으로 넣어 놨던데요.'
          },
          {
            text: "How about all of Friday? I'll make up the other half some other time.",
            text_ko: '금요일 하루 다 쉬면 어때요? 나머지 반나절은 나중에 채울게요.',
            reaction: 'Half a day, Derek. Not a whole one.',
            reaction_ko: '반나절이에요, 데릭. 하루가 아니고요.'
          },
          {
            text: 'How about next Monday afternoon? Things should be quiet once the week starts.',
            text_ko: '다음 주 월요일 오후는 어때요? 주 초엔 한가할 테니까요.',
            reaction: "Next Monday? That's when phase one kicks off.",
            reaction_ko: '다음 주 월요일이요? 그날 1단계 시작이잖아요.'
          }
        ],
        reply_line: 'Friday afternoon works for me.',
        reply_ko: '금요일 오후 좋아요.'
      },
      {
        situation: 'She types it in, then looks up.',
        situation_ko: '그녀가 입력하고 고개를 듭니다.',
        line: 'And if something breaks on Friday afternoon?',
        line_ko: '그런데 금요일 오후에 뭔가 터지면요?',
        prompt: "Reassure her: you're not on call this week, and you'll make sure nothing open depends on you alone.",
        prompt_ko: '그녀를 안심시키세요. 이번 주엔 온콜이 아니고, 진행 중인 일이 당신 혼자에게만 달려 있지 않게 하겠다고요.',
        model: "I'm not on call this week, so that's covered. And I'll leave notes on anything still open.",
        model_ko: '이번 주엔 온콜이 아니라 그건 괜찮아요. 그리고 남은 일은 메모로 정리해 둘게요.',
        distractors: [
          {
            text: "Honestly, nothing ever breaks on a Friday afternoon. Trust me, it'll be totally fine.",
            text_ko: '솔직히 금요일 오후엔 뭐가 터진 적이 없어요. 믿어 보세요, 아무 일 없을 거예요.',
            reaction: 'Famous last words, Derek.',
            reaction_ko: '그런 말이 꼭 사고를 부르던데요, 데릭.'
          },
          {
            text: "I'm on call this week, but I'll keep my phone on me, so I can still jump in if anything happens.",
            text_ko: '이번 주에 온콜이긴 한데, 휴대폰은 들고 있을 테니 무슨 일 생기면 바로 들어올 수 있어요.',
            reaction: "If you're on call, you can't really be off. Let's rethink.",
            reaction_ko: '온콜이면 제대로 쉬는 게 아니잖아요. 다시 생각해 보죠.'
          },
          {
            text: "That's the on-call person's problem. They can handle it without me for once.",
            text_ko: '그건 온콜 담당자 문제죠. 한 번쯤은 저 없이 처리하게 두면 돼요.',
            reaction: "That's a teammate you're talking about.",
            reaction_ko: '지금 동료 얘기 하는 거예요.'
          }
        ],
        reply_line: "Good. Put the request in the system, and I'll approve it today.",
        reply_ko: '좋아요. 시스템에 신청 올려요. 오늘 승인할게요.'
      },
      {
        situation: 'Maya leans back in her chair.',
        situation_ko: '마야가 의자에 등을 기댑니다.',
        line: "While you're here: how's Jun doing? First day back after a big trip.",
        line_ko: '온 김에요. 준은 어때요? 큰 출장 다녀와서 첫날이잖아요.',
        prompt: "Be honest: the work side is going well, but you're a little worried about his health. Say what you told him.",
        prompt_ko: '솔직하게 말하세요. 일은 잘되고 있지만 건강이 조금 걱정됩니다. 그에게 뭐라고 했는지도 말하세요.',
        model: "He's doing well, but he's worn out and coughing. I told him to stay home if it gets worse.",
        model_ko: '잘하고 있는데, 지쳤고 기침을 해요. 더 안 좋아지면 집에서 쉬라고 했어요.',
        distractors: [
          {
            text: "He's full of energy. The trip didn't slow him down one bit, and he's already back to full speed.",
            text_ko: '기운이 넘쳐요. 출장 때문에 조금도 지치지 않았고, 벌써 제 속도로 돌아왔어요.',
            reaction: 'Really? He looked pretty tired in the standup.',
            reaction_ko: '정말요? 스탠드업 때 꽤 피곤해 보이던데요.'
          },
          {
            text: "Honestly, he's slow today. I'd keep an eye on his work this week if I were you.",
            text_ko: '솔직히 오늘 좀 느려요. 저라면 이번 주에 준이 하는 일을 지켜보겠어요.',
            reaction: "That's a little harsh. He just got back from a big trip.",
            reaction_ko: '좀 가혹하네요. 큰 출장에서 막 돌아왔잖아요.'
          },
          {
            text: "He's sick, so I told him to take tomorrow off. I hope that's okay with you.",
            text_ko: '아파서 내일은 쉬라고 했어요. 괜찮으시죠?',
            reaction: "That's my call, Derek. But let's see how he feels.",
            reaction_ko: '그건 제가 정할 일이에요, 데릭. 그래도 상태는 지켜보죠.'
          }
        ],
        reply_line: "Good call. I'll check in with him before he heads home.",
        reply_ko: '잘했어요. 퇴근 전에 제가 한번 들여다볼게요.'
      },
      {
        situation: 'Maya glances at the whiteboard: "Summit dashboard, phase one: Nov 1."',
        situation_ko: '마야가 화이트보드를 흘끗 봅니다. "서밋 대시보드 1단계: 11월 1일".',
        line: 'Last thing. November 1st for the dashboard. Is that still realistic?',
        line_ko: '마지막으로요. 대시보드 11월 1일. 아직 현실적이에요?',
        prompt: "Give her an honest answer as technical lead, and promise she won't be caught off guard.",
        prompt_ko: '기술 책임자로서 솔직하게 답하고, 그녀가 뒤늦게 알고 놀랄 일은 없게 하겠다고 약속하세요.',
        model: "It's tight, but doable if the scope holds. If anything slips, you'll hear it from me first.",
        model_ko: '빠듯하지만 범위만 그대로면 할 수 있어요. 뭐라도 밀리면 제가 제일 먼저 말씀드릴게요.',
        distractors: [
          {
            text: "Easily. We'll probably have it done a week early, so go ahead and tell Priya that today.",
            text_ko: '여유 있어요. 아마 일주일 일찍 끝날 테니 오늘 프리야한테 그렇게 말해도 돼요.',
            reaction: "A week early? Let's not promise Priya that just yet.",
            reaction_ko: '일주일 일찍이요? 프리야한테 그 약속은 아직 하지 말죠.'
          },
          {
            text: "It's tight, but doable if the scope holds. Luckily, it's not due until the middle of December.",
            text_ko: '빠듯하지만 범위만 그대로면 할 수 있어요. 다행히 12월 중순까지잖아요.',
            reaction: "December? It's due November 1st, Derek.",
            reaction_ko: '12월이요? 11월 1일까지예요, 데릭.'
          },
          {
            text: 'Hard to say yet. Ask me again after the kickoff next week. I will know a lot more by then.',
            text_ko: '아직은 뭐라 하기 어려워요. 다음 주 킥오프 끝나고 다시 물어봐 주세요. 그땐 훨씬 더 알 거예요.',
            reaction: 'I need something to give Priya before then.',
            reaction_ko: '그 전에 프리야한테 뭐라도 말해 줘야 해요.'
          }
        ],
        reply_line: "That's all I need to hear. Enjoy your Friday afternoon. You've earned it.",
        reply_ko: '그거면 충분해요. 금요일 오후 잘 쉬어요. 그럴 자격 있어요.'
      }
    ]
  },
  {
    id: 'dk_d15_carl',
    title: 'Coffee for Carl',
    title_ko: '칼에게 커피를',
    place: 'apartment_door',
    npc: 'carl',
    day_from: 15,
    day_to: 15,
    time_from: '18:30',
    time_to: '20:30',
    summary: "On your way home, you stop at Maple Street Apartments to return Carl's cooler from Saturday's barbecue. Thank him, give him the gutter news, pay him back for the mower the way he asked, and ask him to keep an eye on Jun.",
    summary_ko: '퇴근길에 메이플 스트리트 아파트에 들러 토요일 바비큐 때 빌린 칼의 아이스박스를 돌려줍니다. 고맙다고 하고, 빗물받이 소식을 전하고, 그가 원한 방식으로 잔디 깎는 기계 수리에 보답하고, 준을 좀 챙겨 달라고 부탁하세요.',
    sort: 1520,
    tags: 'neighbor,thank-you,evening,week3',
    calendar: { day: 15, time: '18:45', title: "Return Carl's cooler", title_ko: '칼에게 아이스박스 돌려주기' },
    turns: [
      {
        situation: "Evening, gray but dry. On Saturday Carl sent you home with leftovers in his cooler. You bring it back, with a bag of coffee beans from Nina's cart. Carl is sitting on the front steps.",
        situation_ko: '흐리지만 비는 오지 않는 저녁입니다. 토요일에 칼이 남은 음식을 아이스박스에 담아 보내 줬습니다. 그걸 돌려주러 왔습니다. 니나의 카트에서 산 원두 한 봉지도 들고요. 칼은 현관 계단에 앉아 있습니다.',
        line: 'Well, look who it is! What brings you to my neck of the woods on a Monday?',
        line_ko: '이게 누구야! 월요일에 웬일로 우리 동네까지 왔나?',
        prompt: 'Say why you came by, and thank him for the party.',
        prompt_ko: '들른 이유를 말하고, 파티에 대해 고맙다고 하세요.',
        model: 'I came to return your cooler. Thanks again for Saturday. I had a great time.',
        model_ko: '아이스박스 돌려드리러 왔어요. 토요일엔 다시 한번 고마웠어요. 정말 즐거웠어요.',
        distractors: [
          {
            text: 'I came to return your cooler. Thanks again for Sunday. I had a great time.',
            text_ko: '아이스박스 돌려드리러 왔어요. 일요일엔 다시 한번 고마웠어요. 정말 즐거웠어요.',
            reaction: 'Sunday? It poured all Sunday. The barbecue was Saturday!',
            reaction_ko: '일요일? 일요일엔 비가 쏟아졌잖나. 바비큐는 토요일이었지!'
          },
          {
            text: "Just dropping off your cooler. I can't stay long, Carl. I've got a lot going on.",
            text_ko: '아이스박스만 놓고 갈게요. 오래 못 있어요. 할 일이 많아서요.',
            reaction: 'Well, hello to you too. Busy day?',
            reaction_ko: '그래, 나도 반갑네. 바쁜 날이었나 보군?'
          },
          {
            text: 'I came by to check on Jun. Is he home yet? He looked pretty tired today.',
            text_ko: '준 좀 보러 왔어요. 집에 왔어요? 오늘 꽤 피곤해 보였거든요.',
            reaction: "Haven't seen him come in yet. Is that my cooler under your arm?",
            reaction_ko: '아직 들어오는 건 못 봤네. 옆구리에 낀 그거 내 아이스박스 아닌가?'
          }
        ],
        reply_line: 'Glad you came. Jun had three helpings of my ribs, you know.',
        reply_ko: '와 줘서 좋았네. 준은 내 갈비를 세 번이나 가져다 먹었다네.'
      },
      {
        situation: 'Carl takes the cooler and sets it by the door.',
        situation_ko: '칼이 아이스박스를 받아 문 옆에 내려놓습니다.',
        line: "Say, did that gutter of yours hold up in Sunday's rain?",
        line_ko: '그런데 자네 빗물받이는 일요일 비에 잘 버텼나?',
        prompt: "Tell him how it went, and give credit where it's due.",
        prompt_ko: '어떻게 됐는지 말하고, 공을 돌릴 사람에게 돌리세요.',
        model: 'Not a drop at the front door all day. That was all you, Carl.',
        model_ko: '현관 앞에 하루 종일 한 방울도 안 떨어졌어요. 다 칼 덕분이에요.',
        distractors: [
          {
            text: "Not a single drip all day. Turns out I'm pretty handy after all.",
            text_ko: '하루 종일 한 방울도 안 샜어요. 저 생각보다 손재주가 있나 봐요.',
            reaction: 'Ha! And who held the ladder, again?',
            reaction_ko: '하! 그래서 사다리는 누가 잡아 줬더라?'
          },
          {
            text: 'It held up fine, but honestly, I never got around to clearing it.',
            text_ko: '잘 버텼어요. 근데 솔직히 결국 청소는 못 했어요.',
            reaction: 'Never cleared it? I held the ladder for you myself!',
            reaction_ko: '안 치웠다고? 내가 직접 사다리를 잡아 줬는데!'
          },
          {
            text: 'It was fine. Honestly, I could have paid someone to do it anyway.',
            text_ko: '괜찮았어요. 솔직히 그냥 사람 불러서 시켜도 됐을 거예요.',
            reaction: 'Paid someone? Ninety bucks for twenty minutes? Ha!',
            reaction_ko: '돈 주고? 20분짜리 일에 90달러? 하!'
          }
        ],
        reply_line: 'Ha! You did the climbing. I just held the ladder.',
        reply_ko: '하! 올라간 건 자네였지. 난 사다리만 잡았을 뿐이야.'
      },
      {
        situation: 'You hand him the bag of coffee beans. He sniffs it and raises an eyebrow.',
        situation_ko: '원두 봉지를 건넵니다. 그가 냄새를 맡더니 눈썹을 치켜올립니다.',
        line: "What's this for? It's not my birthday.",
        line_ko: '이건 뭐 하러? 내 생일도 아닌데.',
        prompt: 'Remind him what he asked for in return for fixing your mower.',
        prompt_ko: '잔디 깎는 기계를 고쳐 준 대가로 그가 뭘 원했는지 상기시켜 주세요.',
        model: "You told me to buy you a coffee sometime. I figured I'd get you a whole bag.",
        model_ko: '언제 커피나 한 잔 사라고 하셨잖아요. 그래서 아예 한 봉지 사 왔어요.',
        distractors: [
          {
            text: 'You told me to buy you lunch sometime. So I figured coffee beans would do instead.',
            text_ko: '언제 점심이나 사라고 하셨잖아요. 그래서 원두로 대신하면 되겠다 싶었어요.',
            reaction: "Lunch? I said coffee. But I'm not complaining.",
            reaction_ko: '점심? 난 커피라고 했는데. 그래도 불만은 없네.'
          },
          {
            text: "It's for the eleven dollars you spent on the gasket. Now we're even, okay?",
            text_ko: '개스킷에 쓰신 11달러 대신이에요. 이제 빚진 거 없는 거예요, 알았죠?',
            reaction: "Even? I wasn't keeping score, Derek.",
            reaction_ko: '빚? 난 셈 같은 거 안 했네, 데릭.'
          },
          {
            text: "Nina gave it to me for free, so I figured I'd just pass it along to you.",
            text_ko: '니나가 공짜로 준 건데, 그냥 칼한테 넘겨드리려고요.',
            reaction: 'A hand-me-down, huh? Well, it still smells good.',
            reaction_ko: '얻은 걸 넘겨주는 거구먼? 그래도 냄새는 좋네.'
          }
        ],
        reply_line: "From Nina's cart? Now that's a fair trade. Best coffee in Fairview.",
        reply_ko: '니나네 카트 거야? 이거면 공정한 거래지. 페어뷰에서 제일가는 커피니까.'
      },
      {
        situation: 'Carl tucks the bag under his arm and nods toward the building.',
        situation_ko: '칼이 봉지를 옆구리에 끼고 건물 쪽으로 고개를 까딱합니다.',
        line: 'Say, how is the young fella doing? I saw him at the bus stop this morning. He looked like something the cat dragged in.',
        line_ko: '그런데 그 젊은 친구는 어떤가? 아침에 버스 정류장에서 봤는데, 영 몰골이 말이 아니더군.',
        prompt: 'Tell him what you noticed about Jun today, and ask a neighborly favor for him.',
        prompt_ko: '오늘 본 준의 상태를 말하고, 이웃으로서 준을 위해 부탁을 하나 하세요.',
        model: "He's worn out and coughing. Could you keep an eye on him? You're in the same building.",
        model_ko: '많이 지쳤고 기침도 해요. 좀 살펴봐 주실래요? 같은 건물에 사시잖아요.',
        distractors: [
          {
            text: "Oh, he's fine. Kids his age bounce right back in no time. Don't you worry about him at all.",
            text_ko: '아, 괜찮아요. 그 나이 땐 금방 회복해요. 전혀 걱정 안 하셔도 돼요.',
            reaction: "Hmm. He didn't look fine to me.",
            reaction_ko: '흠. 내 눈엔 괜찮아 보이지 않던데.'
          },
          {
            text: "He's sick. Could you tell him I said he's not allowed to come in tomorrow?",
            text_ko: '아파요. 내일 출근하면 안 된다고 제가 그랬다고 전해 주실래요?',
            reaction: "Me? You're his buddy. Tell him yourself, Derek.",
            reaction_ko: '나더러? 자네가 그 친구 버디잖나. 직접 말하게, 데릭.'
          },
          {
            text: "He's worn out from his trip overseas. Could you keep an eye on him for me?",
            text_ko: '해외 출장 때문에 지쳤어요. 저 대신 좀 살펴봐 주실래요?',
            reaction: 'Overseas? I thought he flew to Ridgeport.',
            reaction_ko: '해외? 리지포트에 갔다 온 줄 알았는데.'
          }
        ],
        reply_line: "Will do. I'll bring him a bowl of my chicken soup tonight. Cures anything.",
        reply_ko: '그러지. 오늘 밤에 내 닭고기 수프 한 그릇 갖다주겠네. 뭐든 낫게 하는 수프야.'
      }
    ]
  }
];

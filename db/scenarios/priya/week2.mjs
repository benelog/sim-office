// Priya Nair's second week and the Monday after (game days 8-15): the missions.

export const hero = 'priya';

export const episodes = [
  {
    id: 'pr_d8_coffee',
    title: 'Coffee in the fog',
    title_ko: '안개 낀 아침의 커피',
    place: 'coffee_cart',
    npc: 'nina',
    day_from: 8,
    day_to: 8,
    time_from: '07:00',
    time_to: '10:30',
    summary: "A foggy Monday morning at Nina's cart. Get a large latte for yourself and a coffee for a coworker, and carry them both to the office.",
    summary_ko: '안개 낀 월요일 아침, 니나의 카트입니다. 당신이 마실 라테 큰 컵과 동료에게 줄 커피를 사서 사무실까지 들고 가세요.',
    reward: -9,
    energy: 9,
    sort: 10,
    tags: 'food,order,coffee,weather,small-talk',
    turns: [
      {
        speaker: 'nina',
        situation: "Monday morning. The fog on Lake Avenue is so thick that you hear Nina's cart before you see it.",
        situation_ko: '월요일 아침입니다. 레이크 애비뉴에 안개가 짙어서 니나의 카트는 보이기 전에 소리부터 들립니다.',
        line: 'Morning, Priya! Can you believe this fog? I almost walked right past my own cart.',
        line_ko: '좋은 아침이에요, 프리야! 이 안개 좀 봐요. 제 카트를 지나칠 뻔했다니까요.',
        prompt: 'Agree with her, and pass on the forecast: it should clear up around midday.',
        prompt_ko: '맞장구치고, 일기예보를 전해 주세요. 한낮쯤이면 걷힌다고 합니다.',
        model: "I know! I could barely see across the street. It's supposed to burn off by noon.",
        model_ko: '그러니까요! 길 건너편이 거의 안 보였어요. 정오쯤이면 걷힌대요.',
        distractors: [
          {
            text: "I know! I could barely see across the street. It's supposed to last all week.",
            text_ko: '그러니까요! 길 건너편이 거의 안 보였어요. 일주일 내내 이렇대요.',
            reaction: "All week? Oh, don't say that. I'll lose all my customers.",
            reaction_ko: '일주일 내내요? 아, 그런 말 마요. 손님 다 끊기겠어요.'
          },
          {
            text: "Really? It wasn't that bad by my place. I could see all the way down the block, easy.",
            text_ko: '그래요? 저희 집 쪽은 별로 안 심했어요. 블록 끝까지 다 보이던데요.',
            reaction: 'Really? You must live on the sunny side of town.',
            reaction_ko: '정말요? 동네에서 해 드는 쪽에 사나 봐요.'
          },
          {
            text: "Ugh, don't. I hate fog. It makes me want to crawl back into bed all day.",
            text_ko: '아, 말도 마요. 안개 너무 싫어요. 하루 종일 침대로 돌아가고 싶어져요.',
            reaction: "Ha. Me too. But somebody's got to make the coffee.",
            reaction_ko: '하. 저도요. 그래도 커피는 누군가 만들어야죠.'
          }
        ],
        reply_speaker: 'nina',
        reply_line: "Let's hope so. Nobody can find me in this.",
        reply_ko: '그러길 바라야죠. 이래서는 아무도 저를 못 찾아요.'
      },
      {
        speaker: 'nina',
        situation: 'You have a kickoff call at eleven, and Derek is running the demo. He could use a coffee, too.',
        situation_ko: '열한 시에 킥오프 콜이 있고, 데모는 데릭이 맡습니다. 데릭에게도 커피가 필요할 것 같습니다.',
        line: 'So, the usual? Medium oat latte, extra shot?',
        line_ko: '늘 마시던 걸로요? 귀리 우유 라테 미디엄, 샷 추가?',
        prompt: 'Big day: you want more than usual for yourself, plus a plain brewed coffee for Derek.',
        prompt_ko: '중요한 날입니다. 당신 것은 평소보다 크게, 그리고 데릭에게 줄 평범한 커피도 하나 주문하세요.',
        model: 'Yes, but make it a large today. And a drip coffee for my coworker, please.',
        model_ko: '네, 그런데 오늘은 큰 컵으로요. 그리고 동료 줄 드립 커피도 하나 주세요.',
        distractors: [
          {
            text: 'Yes, but make it a small today. And a drip coffee for my coworker, please.',
            text_ko: '네, 그런데 오늘은 작은 컵으로요. 그리고 동료 줄 드립 커피도 하나 주세요.',
            reaction: 'A small? On a day like this?',
            reaction_ko: '작은 컵이요? 이런 날에요?'
          },
          {
            text: 'Yes, but make it a large today. And another oat latte for my coworker.',
            text_ko: '네, 그런데 오늘은 큰 컵으로요. 그리고 동료 줄 귀리 라테도 하나 더요.',
            reaction: 'Two oat lattes? Does your coworker even like oat milk?',
            reaction_ko: '귀리 라테 두 잔이요? 동료분도 귀리 우유 좋아해요?'
          },
          {
            text: 'No, something different today. Surprise me, and one for my coworker.',
            text_ko: '아뇨, 오늘은 다른 걸로요. 알아서 해 주시고, 동료 것도 하나요.',
            reaction: 'Surprise you? Okay... and what for your coworker?',
            reaction_ko: '알아서요? 음... 그럼 동료분 건 뭘로요?'
          }
        ],
        reply_speaker: 'nina',
        reply_line: 'One large oat latte, one drip. Does your coworker take cream or sugar?',
        reply_ko: '귀리 우유 라테 큰 컵 하나, 드립 하나. 동료분은 크림이나 설탕 넣어요?'
      },
      {
        speaker: 'nina',
        situation: 'Good question. You have no idea how Derek takes his coffee.',
        situation_ko: '좋은 질문입니다. 데릭이 커피를 어떻게 마시는지 전혀 모릅니다.',
        line: 'Cream? Sugar? Both?',
        line_ko: '크림? 설탕? 둘 다?',
        prompt: "You don't know how Derek takes it. Cover both possibilities.",
        prompt_ko: '데릭이 커피를 어떻게 마시는지 모릅니다. 두 경우 다 대비하세요.',
        model: "I'm not sure. Could you leave room for cream? I'll grab some sugar packets just in case.",
        model_ko: '잘 모르겠어요. 크림 넣을 자리 좀 남겨 주실래요? 혹시 모르니 설탕 봉지도 몇 개 챙길게요.',
        distractors: [
          {
            text: "Both, I think. Lots of cream and three sugars, please. He'll love that.",
            text_ko: '둘 다요, 아마. 크림 듬뿍에 설탕 세 개 넣어 주세요. 좋아할 거예요.',
            reaction: "You sure? That's a lot of sugar if you're just guessing.",
            reaction_ko: '정말요? 짐작으로 넣기엔 설탕이 너무 많은데요.'
          },
          {
            text: "I'm not sure. Black, I guess. If he doesn't like it, that's on him.",
            text_ko: '잘 모르겠어요. 그냥 블랙으로요. 마음에 안 들면 본인 사정이죠, 뭐.',
            reaction: 'Ha, cold. Hope he likes it black, then.',
            reaction_ko: '하, 냉정하네. 블랙 좋아하길 바라야겠네요.'
          },
          {
            text: 'No cream, just sugar, please. Derek told me he always takes two sugars in his coffee.',
            text_ko: '크림은 빼고 설탕만 넣어 주세요. 데릭이 늘 커피에 설탕 두 개 넣는다고 했거든요.',
            reaction: 'Two sugars it is. Stirred in?',
            reaction_ko: '설탕 두 개요. 저어 드릴까요?'
          }
        ],
        reply_speaker: 'nina',
        reply_line: 'Smart. Room for cream it is.',
        reply_ko: '현명하네요. 크림 자리 남겨 둘게요.'
      },
      {
        speaker: 'nina',
        situation: 'Two hot cups, a laptop bag and an umbrella. You only have two hands.',
        situation_ko: '뜨거운 컵 두 개에 노트북 가방과 우산까지. 손은 둘뿐입니다.',
        line: 'Here you go. How are you going to carry all that?',
        line_ko: '여기요. 그걸 다 어떻게 들고 가려고요?',
        prompt: 'Your hands are full. Ask for something to hold both cups.',
        prompt_ko: '손이 꽉 찼습니다. 컵 두 개를 담을 것을 달라고 하세요.',
        model: 'Good question. Could I get a drink carrier?',
        model_ko: '그러게요. 음료 캐리어 하나 주실래요?',
        distractors: [
          {
            text: "Easy. I'll just stack one cup on top of the other.",
            text_ko: '간단해요. 컵 하나를 다른 컵 위에 얹으면 돼요.',
            reaction: "Stack them? With hot coffee? Please don't.",
            reaction_ko: '쌓는다고요? 뜨거운 커피를? 제발 그러지 마요.'
          },
          {
            text: 'No idea. Could you walk them over for me?',
            text_ko: '모르겠어요. 사무실까지 좀 갖다주실래요?',
            reaction: "Ha. I'd love to, but who'd run the cart?",
            reaction_ko: '하. 그러고 싶지만 카트는 누가 봐요?'
          },
          {
            text: 'Good question. Could I get lids for these?',
            text_ko: '그러게요. 컵 뚜껑 좀 주실래요?',
            reaction: "They've got lids. It's your hands I'm worried about.",
            reaction_ko: '뚜껑은 있어요. 걱정되는 건 손이에요.'
          }
        ],
        reply_speaker: 'nina',
        reply_line: "Sure thing. That's eight fifty, so nine twenty with tax.",
        reply_ko: '그럼요. 8달러 50센트니까, 세금 포함해서 9달러 20센트예요.'
      },
      {
        speaker: 'nina',
        situation: 'You tap your card. Nina looks you up and down.',
        situation_ko: '카드를 갖다 댑니다. 니나가 당신을 위아래로 훑어봅니다.',
        line: "You've got your game face on. Big meeting?",
        line_ko: '비장한 얼굴인데요. 큰 회의 있어요?',
        prompt: 'Tell her about the big client call later this morning, and ask for her good wishes.',
        prompt_ko: '오늘 오전에 있을 중요한 고객 통화 얘기를 하고, 응원해 달라고 하세요.',
        model: "We're kicking off a new project with a client at eleven. Wish me luck!",
        model_ko: '열한 시에 고객이랑 새 프로젝트를 시작해요. 행운을 빌어 줘요!',
        distractors: [
          {
            text: "We're kicking off a new project with a client at two today. Wish me luck!",
            text_ko: '오늘 두 시에 고객이랑 새 프로젝트를 시작해요. 행운을 빌어 줘요!',
            reaction: 'At two? Then why the game face this early?',
            reaction_ko: '두 시요? 그런데 아침부터 왜 그렇게 비장해요?'
          },
          {
            text: 'Ugh, yes. If this call goes badly, I might lose the whole account.',
            text_ko: '아, 네. 이 통화 망치면 고객사를 통째로 잃을지도 몰라요.',
            reaction: "Whoa. No pressure, huh? You'll be fine.",
            reaction_ko: '와. 부담 엄청나겠네요. 잘될 거예요.'
          },
          {
            text: 'Not really. Just a regular Monday with the same old meetings.',
            text_ko: '아뇨. 늘 똑같은 회의만 있는 평범한 월요일이에요.',
            reaction: "Really? You look like you're heading into battle.",
            reaction_ko: '정말요? 전쟁하러 가는 사람 같은데요.'
          }
        ],
        reply_speaker: 'nina',
        reply_line: "You don't need luck. But good luck! Careful, they're hot.",
        reply_ko: '프리야는 운이 필요 없죠. 그래도 행운을 빌어요! 뜨거우니까 조심하고요.'
      }
    ],
    phrases: [
      {
        id: 'pr_d8_coffee.barely_see',
        text: 'I could barely see across the street.',
        meaning_ko: '길 건너편이 거의 안 보였어요.',
        note: '"Barely" = almost not. Also "I could hardly see."',
        note_ko: 'barely는 거의 ~하지 못한다는 뜻입니다. "I could hardly see."라고도 합니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_d8_coffee.burn_off',
        text: "It's supposed to burn off by noon.",
        meaning_ko: '정오쯤이면 걷힌대요.',
        note: 'Fog "burns off" as the sun warms the air. "Supposed to" = that is what the forecast says.',
        note_ko: '해가 공기를 데우면 안개가 burn off합니다. supposed to는 예보가 그렇다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_d8_coffee.drink_carrier',
        text: 'Could I get a drink carrier?',
        meaning_ko: '음료 캐리어 하나 주시겠어요?',
        note: 'The cardboard tray for two or four cups. Free at most coffee shops.',
        note_ko: '컵 두 개나 네 개를 담는 종이 받침입니다. 대부분의 커피 가게에서 무료로 줍니다.',
        category: 'food'
      },
      {
        id: 'pr_d8_coffee.game_face',
        text: "You've got your game face on.",
        meaning_ko: '단단히 마음먹은 얼굴이네요.',
        note: 'A serious, ready look before something important.',
        note_ko: '중요한 일을 앞두고 각오를 다진 진지한 표정을 말합니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_d8_coffee.just_in_case',
        text: "I'll grab some sugar packets just in case.",
        meaning_ko: '혹시 모르니 설탕 봉지를 몇 개 챙길게요.',
        note: '"Just in case" = because it might be needed.',
        note_ko: 'just in case는 필요할지도 모르니까라는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_d8_coffee.kicking_off',
        text: "We're kicking off a new project.",
        meaning_ko: '새 프로젝트를 시작해요.',
        note: 'From football. The first meeting of a project is "the kickoff".',
        note_ko: '미식축구에서 온 말입니다. 프로젝트의 첫 회의를 the kickoff라고 합니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d8_coffee.make_it_a_large',
        text: 'Make it a large today.',
        meaning_ko: '오늘은 큰 걸로 주세요.',
        note: '"Make it a …" changes an order that was just said.',
        note_ko: '"Make it a …"는 방금 나온 주문을 바꿀 때 씁니다.',
        category: 'food'
      },
      {
        id: 'pr_d8_coffee.room_for_cream',
        text: 'Could you leave room for cream?',
        meaning_ko: '크림 넣을 자리를 남겨 주시겠어요?',
        note: 'Baristas often ask "Room for cream?" Answer "Yes, please" or "No, fill it up."',
        note_ko: '바리스타가 "Room for cream?" 하고 자주 묻습니다. "Yes, please"나 "No, fill it up."으로 답합니다.',
        category: 'food'
      }
    ]
  },
  {
    id: 'pr_d8_prep',
    title: 'Prepping the team for the kickoff',
    title_ko: '킥오프 전에 팀과 준비하기',
    place: 'office_desk_team',
    npc: 'derek',
    day_from: 8,
    day_to: 8,
    time_from: '08:30',
    time_to: '11:00',
    summary: 'An hour before the kickoff with Summit Retail, get the team ready: the game plan, who says what, and who does the talking on pricing.',
    summary_ko: '서밋 리테일과의 킥오프 한 시간 전, 팀을 준비시키세요. 진행 계획, 누가 무엇을 말할지, 가격 이야기는 누가 할지 정합니다.',
    sort: 20,
    tags: 'meeting,planning,client,facilitation',
    calendar: { day: 8, time: '10:00', title: 'Prep for the kickoff with Derek and Jun', title_ko: '데릭, 준과 킥오프 준비' },
    turns: [
      {
        speaker: 'derek',
        situation: 'Standup is at nine thirty this week to make room for the client calls. Afterwards Derek and Jun roll their chairs over.',
        situation_ko: '고객 통화 시간을 내려고 이번 주 스탠드업은 9시 30분입니다. 끝난 뒤 데릭과 준이 의자를 끌고 옵니다.',
        line: "So, eleven o'clock with Summit Retail. What's the plan?",
        line_ko: '그래서, 열한 시에 서밋 리테일이랑. 계획이 뭐예요?',
        prompt: 'Walk them through the order of the call: the checkout demo, then the dashboard project, then next steps.',
        prompt_ko: '통화 순서를 알려 주세요. 결제 화면 데모, 대시보드 프로젝트, 그리고 다음 단계 순입니다.',
        model: "Here's the game plan: the checkout demo first, then the dashboard project, then next steps.",
        model_ko: '계획은 이래요. 먼저 결제 화면 데모, 다음은 대시보드 프로젝트, 그다음은 다음 단계예요.',
        distractors: [
          {
            text: "Here's the game plan: the dashboard project first, then the checkout demo, then pricing.",
            text_ko: '계획은 이래요. 먼저 대시보드 프로젝트, 다음은 결제 화면 데모, 그다음은 가격 얘기예요.',
            reaction: "Dashboard first? Shouldn't we warm them up with the demo?",
            reaction_ko: '대시보드부터요? 데모로 분위기부터 띄워야 하지 않아요?'
          },
          {
            text: "Honestly, I thought we'd just wing it and see what Greg wants to talk about.",
            text_ko: '솔직히 그냥 그때그때 대응하면서 그렉이 무슨 얘기를 하고 싶은지 보려고 했어요.',
            reaction: "Wing it? With Greg? That's brave.",
            reaction_ko: '즉흥으로요? 그렉 상대로? 용감하네요.'
          },
          {
            text: "Here's the game plan: the gift card demo first, then the mobile app, and then next steps.",
            text_ko: '계획은 이래요. 먼저 기프트 카드 데모, 다음은 모바일 앱, 그리고 그다음은 다음 단계예요.',
            reaction: 'Gift cards? I thought I was demoing the new checkout.',
            reaction_ko: '기프트 카드요? 저는 새 결제 화면을 데모하는 줄 알았는데요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Short and sweet. I like it.',
        reply_ko: '짧고 분명하네요. 마음에 들어요.'
      },
      {
        speaker: 'derek',
        situation: 'Three people on one call. Everyone needs a job.',
        situation_ko: '한 통화에 세 사람이 들어갑니다. 저마다 맡을 일이 있어야 합니다.',
        line: "So who's doing what?",
        line_ko: '그럼 누가 뭘 해요?',
        prompt: 'Hand out the roles: Derek shows the demo, Jun handles the technical questions, and you start and wrap up the call.',
        prompt_ko: '역할을 나누세요. 데모는 데릭, 기술 질문은 준, 통화의 시작과 마무리는 당신입니다.',
        model: "Derek, you run the demo. Jun, you take the technical questions. I'll open and close.",
        model_ko: '데릭은 데모를 맡아 줘요. 준은 기술 질문을 받아 주고요. 시작과 마무리는 제가 할게요.',
        distractors: [
          {
            text: "Jun, you run the demo. Derek, you take the technical questions. I'll open and close.",
            text_ko: '준은 데모를 맡아 줘요. 데릭은 기술 질문을 받아 주고요. 시작과 마무리는 제가 할게요.',
            reaction: "Jun on the demo? It's his first client call, Priya.",
            reaction_ko: '준이 데모를요? 고객이랑 처음 하는 통화예요, 프리야.'
          },
          {
            text: "I'll do all the talking. You two just stay on mute unless I call on you.",
            text_ko: '말은 제가 다 할게요. 두 사람은 제가 부를 때까지 음소거하고 있어요.',
            reaction: 'On mute? Then why are we even on the call?',
            reaction_ko: '음소거요? 그럼 우리가 왜 들어가요?'
          },
          {
            text: "Derek, you run the demo. Jun, you handle pricing. I'll open and close the call.",
            text_ko: '데릭은 데모를 맡아 줘요. 준은 가격 얘기를 맡고요. 시작과 마무리는 제가 할게요.',
            reaction: "Jun on pricing? He's been here two weeks.",
            reaction_ko: '준이 가격을요? 온 지 2주밖에 안 됐는데요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Technical questions. Okay. But what if Greg asks something I can't answer?",
        reply_ko: '기술 질문이요. 알겠습니다. 그런데 그렉이 제가 대답 못 할 걸 물으면요?'
      },
      {
        speaker: 'jun',
        situation: "It is Jun's first call with a client. He is turning his pen over and over.",
        situation_ko: '준에게는 고객과의 첫 통화입니다. 펜을 자꾸 돌리고 있습니다.',
        line: "I don't want to make something up and get it wrong.",
        line_ko: '괜히 지어냈다가 틀리고 싶지 않아요.',
        prompt: 'Jun is afraid of guessing wrong. Give him an honest line he can fall back on.',
        prompt_ko: '준은 잘못 짐작해서 틀릴까 봐 걱정합니다. 기댈 수 있는 솔직한 한마디를 알려 주세요.',
        model: "Then say, \"I don't know, but I'll find out.\" Greg respects that.",
        model_ko: '그럼 "잘 모르겠지만 알아보겠습니다"라고 하면 돼요. 그렉은 그런 답을 높이 사요.',
        distractors: [
          {
            text: "Then just give your best guess. Greg won't know the difference.",
            text_ko: '그럼 그냥 최대한 그럴듯하게 짐작해서 말해요. 그렉은 차이를 몰라요.',
            reaction: "Guess? That's exactly what I didn't want to do.",
            reaction_ko: '짐작이요? 그게 바로 제가 안 하고 싶은 건데요.'
          },
          {
            text: "Don't worry, he won't ask you anything. He only talks to me.",
            text_ko: '걱정 마요, 준한테는 아무것도 안 물어볼 거예요. 그렉은 저랑만 얘기해요.',
            reaction: "But I'm the one taking the technical questions, right?",
            reaction_ko: '그래도 기술 질문은 제가 받기로 했잖아요?'
          },
          {
            text: "Then stay quiet and let Derek answer. That's safer for everyone.",
            text_ko: '그럼 가만히 있고 데릭이 대답하게 해요. 그게 다들 안전해요.',
            reaction: 'Oh. Then what am I there for?',
            reaction_ko: '아. 그럼 저는 왜 들어가요?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'That I can do.',
        reply_ko: '그건 할 수 있어요.'
      },
      {
        speaker: 'derek',
        situation: 'Derek has been on calls with Greg before.',
        situation_ko: '데릭은 전에도 그렉과 통화해 본 적이 있습니다.',
        line: 'And what if he brings up money? He always brings up money.',
        line_ko: '그리고 그렉이 돈 얘기를 꺼내면요? 그 사람은 꼭 돈 얘기를 해요.',
        prompt: 'Money is your area. Make sure any pricing question ends up with you.',
        prompt_ko: '돈 문제는 당신 담당입니다. 가격 질문이 나오면 반드시 당신에게 오게 하세요.',
        model: 'Let me do the talking on pricing. If money comes up, just send it my way.',
        model_ko: '가격 얘기는 제가 할게요. 돈 얘기가 나오면 그냥 저한테 넘겨요.',
        distractors: [
          {
            text: 'Derek, you handle pricing. You know Greg better than I do.',
            text_ko: '데릭, 가격은 데릭이 맡아요. 저보다 그렉을 잘 알잖아요.',
            reaction: "Me? Numbers aren't my thing. That's your job.",
            reaction_ko: '제가요? 숫자는 제 분야가 아니에요. 그건 프리야 일이죠.'
          },
          {
            text: 'If he asks, just offer him twenty percent off. Keep him happy.',
            text_ko: '물어보면 그냥 20퍼센트 깎아 준다고 해요. 기분 좋게요.',
            reaction: 'Twenty percent? Did finance sign off on that?',
            reaction_ko: '20퍼센트요? 재무팀에서 승인했어요?'
          },
          {
            text: "Relax, he won't bring it up today. This call is only about the checkout demo.",
            text_ko: '걱정 마요, 오늘은 안 꺼낼 거예요. 이번엔 결제 화면 데모뿐이에요.',
            reaction: 'Trust me, he will. He always does.',
            reaction_ko: '두고 봐요, 꺼낼 거예요. 늘 그래요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Gladly. I write code, not invoices.',
        reply_ko: '기꺼이요. 저는 코드를 쓰지 청구서를 쓰지는 않으니까요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun writes "pricing = Priya" in his notebook and underlines it twice.',
        situation_ko: '준이 공책에 "가격 = 프리야"라고 쓰고 밑줄을 두 번 긋습니다.',
        line: "Is there anything we shouldn't say?",
        line_ko: '하면 안 되는 말이 있어요?',
        prompt: 'No promises about timing today. Tell them what to say instead if Greg presses.',
        prompt_ko: '오늘은 일정에 관한 약속은 금지입니다. 그렉이 밀어붙이면 대신 뭐라고 할지 알려 주세요.',
        model: "Don't commit to any dates on the call. If he pushes, say we'll follow up in writing.",
        model_ko: '통화 중에는 어떤 날짜도 약속하지 마요. 그렉이 밀어붙이면 글로 정리해서 드리겠다고 해요.',
        distractors: [
          {
            text: "Don't commit to any dates on the call. If he pushes, just tell him November first.",
            text_ko: '통화 중에는 어떤 날짜도 약속하지 마요. 그렉이 밀어붙이면 그냥 11월 1일이라고 해요.',
            reaction: "Wait, isn't saying November first a date?",
            reaction_ko: '잠깐, 11월 1일이라고 하는 것도 날짜 아니에요?'
          },
          {
            text: "Don't mention the demo at all. If he asks, say it's still being tested.",
            text_ko: '데모 얘기는 아예 꺼내지 마요. 물어보면 아직 테스트 중이라고 해요.',
            reaction: "But isn't Derek running the demo?",
            reaction_ko: '그런데 데모는 데릭이 하기로 했잖아요?'
          },
          {
            text: "Don't say anything unless I nod at you first. I mean it, both of you.",
            text_ko: '제가 먼저 고개를 끄덕이기 전에는 아무 말도 하지 마요. 진심이에요, 둘 다요.',
            reaction: "Uh... okay. That's a little scary.",
            reaction_ko: '어... 네. 좀 무섭네요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'No dates, no dollars. Got it. See you in there at five to eleven.',
        reply_ko: '날짜 얘기도, 돈 얘기도 안 하기. 알겠어요. 10시 55분에 회의실에서 봐요.'
      }
    ],
    phrases: [
      {
        id: 'pr_d8_prep.do_the_talking',
        text: 'Let me do the talking on pricing.',
        meaning_ko: '가격 이야기는 제가 할게요.',
        note: 'One voice on money keeps the team from saying two different numbers.',
        note_ko: '돈 이야기를 한 사람이 맡아야 팀에서 서로 다른 숫자가 나오지 않습니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d8_prep.dont_commit',
        text: "Don't commit to any dates on the call.",
        meaning_ko: '통화 중에는 어떤 날짜도 약속하지 마세요.',
        note: '"Commit to" = promise. What is said on a call is hard to take back.',
        note_ko: 'commit to는 약속한다는 뜻입니다. 통화에서 한 말은 되돌리기 어렵습니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d8_prep.find_out',
        text: "I don't know, but I'll find out.",
        meaning_ko: '모르겠지만 알아보겠습니다.',
        note: 'Clients trust this more than a confident guess.',
        note_ko: '고객은 자신 있게 하는 짐작보다 이 말을 더 믿습니다.',
        category: 'office'
      },
      {
        id: 'pr_d8_prep.game_plan',
        text: "Here's the game plan.",
        meaning_ko: '진행 계획은 이래요.',
        note: 'A sports word for a plan of action. Common before a client meeting.',
        note_ko: '스포츠에서 온 말로 행동 계획을 뜻합니다. 고객 회의 전에 자주 씁니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d8_prep.open_and_close',
        text: "I'll open and close.",
        meaning_ko: '시작과 마무리는 제가 할게요.',
        note: 'The person who opens and closes a meeting leads it.',
        note_ko: '회의를 열고 닫는 사람이 그 회의를 이끄는 사람입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d8_prep.run_the_demo',
        text: 'You run the demo.',
        meaning_ko: '데모는 당신이 맡아요.',
        note: 'Giving roles before a call: "You run …", "You take …", "You cover …".',
        note_ko: '통화 전에 역할을 나눌 때 "You run …", "You take …", "You cover …"라고 합니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d8_prep.send_it_my_way',
        text: 'Just send it my way.',
        meaning_ko: '저한테 넘기세요.',
        note: '"Send it my way" = pass it to me. Also used for emails and questions.',
        note_ko: 'send it my way는 나에게 넘기라는 뜻입니다. 이메일이나 질문에도 씁니다.',
        category: 'office'
      },
      {
        id: 'pr_d8_prep.short_and_sweet',
        text: 'Short and sweet.',
        meaning_ko: '짧고 분명하네요.',
        note: 'Pleasantly brief. A compliment for a plan, a meeting or an email.',
        note_ko: '짧아서 좋다는 뜻입니다. 계획이나 회의, 이메일을 칭찬할 때 씁니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'pr_d8_kickoff',
    title: 'Running the kickoff call',
    title_ko: '킥오프 콜 진행하기',
    place: 'office_meeting',
    npc: 'greg',
    day_from: 8,
    day_to: 8,
    time_from: '10:30',
    time_to: '13:30',
    summary: 'Run the video call with Greg Whitfield and his team: introductions, the agenda, his goals for the dashboard, what you need from him, and a clear finish.',
    summary_ko: '그렉 휫필드와 그의 팀을 상대로 화상 통화를 진행하세요. 소개, 안건, 대시보드의 목표, 그에게 필요한 것, 그리고 깔끔한 마무리까지.',
    sort: 30,
    tags: 'phone,client,meeting,facilitation,video-call',
    calendar: { day: 8, time: '11:00', title: 'Kickoff call: Summit Retail', title_ko: '킥오프 콜: 서밋 리테일' },
    turns: [
      {
        speaker: 'greg',
        situation: "Eleven o'clock. The fog has lifted. Greg Whitfield appears on the big screen with two people beside him.",
        situation_ko: '열한 시입니다. 안개가 걷혔습니다. 큰 화면에 그렉 휫필드가 두 사람과 함께 나타납니다.',
        line: "Morning, Priya. I've got my team here, and a hard stop at noon.",
        line_ko: '안녕하세요, 프리야. 우리 팀도 같이 왔고, 정오에는 반드시 끝내야 합니다.',
        prompt: 'Show you value their time, and get everyone to say who they are.',
        prompt_ko: '시간을 내 준 데 감사를 표하고, 모두가 누구인지 소개하게 하세요.',
        model: "Thanks for making the time, everyone. Let's do a quick round of introductions.",
        model_ko: '모두 시간 내 주셔서 감사합니다. 짧게 돌아가면서 소개부터 하죠.',
        distractors: [
          {
            text: "Thanks, Greg. Before we start, let me walk you all through our company's history.",
            text_ko: '감사합니다, 그렉. 시작하기 전에 저희 회사 연혁부터 소개해 드릴게요.',
            reaction: "Priya, I said a hard stop. Let's keep it moving.",
            reaction_ko: '프리야, 시간이 정해져 있다고 했습니다. 빨리 진행하죠.'
          },
          {
            text: "Thanks for making the time, everyone. Let's go until one, if that's okay.",
            text_ko: '모두 시간 내 주셔서 감사합니다. 괜찮으시면 한 시까지 하죠.',
            reaction: 'One? I said noon. I meant it.',
            reaction_ko: '한 시요? 정오라고 했습니다. 진심이에요.'
          },
          {
            text: "Great. Let's skip the introductions and jump right into the demo.",
            text_ko: '좋습니다. 소개는 건너뛰고 바로 데모로 들어가죠.',
            reaction: "My team's never met yours. Let's at least do names.",
            reaction_ko: '우리 팀은 그쪽 팀을 처음 봅니다. 이름 정도는 알고 시작하죠.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "Sure. I'm Greg, VP of operations. With me are Dana from IT and Luis from finance.",
        reply_ko: '그러죠. 저는 운영 담당 부사장 그렉입니다. 옆에는 IT의 데이나와 재무의 루이스가 있습니다.'
      },
      {
        speaker: 'greg',
        situation: 'Derek and Jun sit on either side of you.',
        situation_ko: '데릭과 준이 당신의 양옆에 앉아 있습니다.',
        line: 'And who do we have on your side?',
        line_ko: '그쪽은 누가 나와 계십니까?',
        prompt: 'Introduce your two colleagues and their roles. Jun will build most of the dashboard.',
        prompt_ko: '두 동료와 각자의 역할을 소개하세요. 대시보드는 대부분 준이 만듭니다.',
        model: "On our side, this is Derek, our senior developer, and Jun, who'll be building most of the dashboard.",
        model_ko: '저희 쪽은 시니어 개발자 데릭, 그리고 대시보드 대부분을 만들 준입니다.',
        distractors: [
          {
            text: "On our side, this is Jun, our senior developer, and Derek, who'll be building most of the dashboard.",
            text_ko: '저희 쪽은 시니어 개발자 준, 그리고 대시보드 대부분을 만들 데릭입니다.',
            reaction: "Jun's your senior developer? I thought that was Derek.",
            reaction_ko: '준이 시니어 개발자입니까? 데릭인 줄 알았는데요.'
          },
          {
            text: "On our side, this is Derek, our senior developer, and Jun. He's new, so go easy on him.",
            text_ko: '저희 쪽은 시니어 개발자 데릭, 그리고 준입니다. 신입이니 살살 대해 주세요.',
            reaction: "Noted. Let's hope the dashboard isn't new to him.",
            reaction_ko: '알겠습니다. 대시보드까지 처음은 아니길 바랍니다.'
          },
          {
            text: 'On our side, this is Derek, our senior developer, and Jun, from our finance team.',
            text_ko: '저희 쪽은 시니어 개발자 데릭, 그리고 재무팀의 준입니다.',
            reaction: 'Finance? I thought he was one of your developers.',
            reaction_ko: '재무요? 개발자인 줄 알았습니다.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Hi, Greg. Nice to meet you. I'm looking forward to working with you.",
        reply_ko: '안녕하세요, 그렉. 만나서 반갑습니다. 함께 일하게 되어 기대됩니다.'
      },
      {
        speaker: 'greg',
        situation: 'Greg looks at his watch. One hour, no more.',
        situation_ko: '그렉이 시계를 봅니다. 주어진 시간은 딱 한 시간입니다.',
        line: "Likewise. So what's the plan for the hour?",
        line_ko: '저도요. 그럼 한 시간 동안 어떻게 진행합니까?',
        prompt: 'Lay out the hour, following the plan you gave your team, with the dashboard part about what he wants.',
        prompt_ko: '팀에게 말한 계획대로 한 시간 일정을 알려 주세요. 대시보드 부분은 그렉이 원하는 것 중심으로요.',
        model: 'We have three items on the agenda: the checkout demo, your goals for the dashboard, and next steps.',
        model_ko: '안건은 세 가지입니다. 결제 화면 데모, 대시보드에 대한 그렉의 목표, 그리고 다음 단계입니다.',
        distractors: [
          {
            text: 'We have three items on the agenda: the checkout demo, pricing for the dashboard, and then next steps.',
            text_ko: '안건은 세 가지입니다. 결제 화면 데모, 대시보드 가격, 그리고 다음 단계입니다.',
            reaction: 'Pricing? Luis will be thrilled, but I thought this was a kickoff.',
            reaction_ko: '가격이요? 루이스는 좋아하겠지만, 오늘은 킥오프 아닙니까?'
          },
          {
            text: "Well, it depends. We could do the demo, or talk dashboard, or whatever you'd like to start with.",
            text_ko: '글쎄요, 상황 봐서요. 데모를 해도 되고, 대시보드 얘기를 해도 되고, 원하시는 걸로 하죠.',
            reaction: 'Priya, you called the meeting. You tell me.',
            reaction_ko: '프리야, 회의를 잡은 건 그쪽입니다. 그쪽이 정해 주세요.'
          },
          {
            text: 'We have three items on the agenda: the gift card demo, the mobile app, and a date for launch.',
            text_ko: '안건은 세 가지입니다. 기프트 카드 데모, 모바일 앱, 그리고 출시 날짜입니다.',
            reaction: 'Gift cards? I thought I was seeing the new checkout.',
            reaction_ko: '기프트 카드요? 새 결제 화면을 보는 줄 알았는데요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Works for me. Show me the demo.',
        reply_ko: '좋습니다. 데모를 보여 주세요.'
      },
      {
        speaker: 'greg',
        situation: "Derek's demo of the new checkout runs without a hitch. Greg's team claps.",
        situation_ko: '데릭의 새 결제 화면 데모가 매끄럽게 끝납니다. 그렉의 팀이 박수를 칩니다.',
        line: 'Nice. My team loved it. Now, the dashboard. Where do you want to start?',
        line_ko: '좋네요. 우리 팀이 아주 좋아했습니다. 이제 대시보드죠. 어디서부터 시작할까요?',
        prompt: 'Before any features, find out what he wants to have achieved half a year from now.',
        prompt_ko: '기능 얘기 전에, 반년 뒤에 그가 무엇을 이뤄 놓고 싶은지 알아보세요.',
        model: "Let's start with the goal. What does success look like for you six months from now?",
        model_ko: '목표부터 시작하죠. 6개월 뒤에 어떤 모습이면 성공이라고 보십니까?',
        distractors: [
          {
            text: "Let's start with the features. Which screens do you want on the dashboard first?",
            text_ko: '기능부터 시작하죠. 대시보드에 어떤 화면부터 넣고 싶으세요?',
            reaction: 'Screens? Let me tell you the problem first.',
            reaction_ko: '화면이요? 문제부터 말씀드리죠.'
          },
          {
            text: "Let's start with the goal. What does success look like for you six weeks from now?",
            text_ko: '목표부터 시작하죠. 6주 뒤에 어떤 모습이면 성공이라고 보십니까?',
            reaction: "Six weeks? We're thinking bigger than that.",
            reaction_ko: '6주요? 우리는 그보다 크게 보고 있습니다.'
          },
          {
            text: "Let's start with the budget. How much are you planning to spend on this one?",
            text_ko: '예산부터 시작하죠. 이번 건에 얼마나 쓰실 계획이세요?',
            reaction: "Money already? Let's see what we're building first.",
            reaction_ko: '벌써 돈 얘기요? 뭘 만들지부터 봅시다.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Simple. Our store managers are flying blind. I want live inventory for all forty stores on one screen.',
        reply_ko: '간단합니다. 우리 매장 관리자들은 정보 없이 감으로 일하고 있어요. 40개 매장의 실시간 재고를 한 화면에서 보고 싶습니다.'
      },
      {
        speaker: 'greg',
        situation: 'Jun asks how the stores send their data and explains that nightly files will not be enough. Greg nods.',
        situation_ko: '준이 매장에서 데이터를 어떻게 보내는지 묻고, 밤마다 올리는 파일로는 부족하다고 설명합니다. 그렉이 고개를 끄덕입니다.',
        line: "Fine. You'll have API access by Wednesday. What else do you need from me?",
        line_ko: '좋습니다. 수요일까지 API 접근 권한을 드리죠. 그 밖에 저한테 필요한 게 있습니까?',
        prompt: 'Ask for one person on his team who can make calls, so nothing stalls.',
        prompt_ko: '일이 멈추지 않도록, 그쪽 팀에서 결정할 수 있는 사람 한 명을 정해 달라고 하세요.',
        model: "One thing: a single point of contact on your side, so decisions don't get stuck.",
        model_ko: '한 가지요. 결정이 막히지 않도록 그쪽에서 담당자 한 분을 정해 주세요.',
        distractors: [
          {
            text: "One thing: API access by Friday, so the team isn't stuck waiting around.",
            text_ko: '한 가지요. 팀이 기다리지 않도록 API 접근 권한을 금요일까지 주세요.',
            reaction: 'Friday? I just said Wednesday.',
            reaction_ko: '금요일이요? 방금 수요일이라고 했습니다.'
          },
          {
            text: "One thing: we'll need you personally on every call, so that decisions don't stall.",
            text_ko: '한 가지요. 결정이 막히지 않도록 매번 통화에 그렉이 직접 들어와 주세요.',
            reaction: 'Every call? I run operations for forty stores, Priya.',
            reaction_ko: '매번이요? 저는 매장 40곳 운영을 맡고 있습니다, 프리야.'
          },
          {
            text: 'One thing: your sign-off on a November launch date, so we can plan around it.',
            text_ko: '한 가지요. 저희가 계획을 세울 수 있게 11월 출시 날짜를 승인해 주세요.',
            reaction: "A date already? Let's see the scope first.",
            reaction_ko: '벌써 날짜요? 범위부터 봅시다.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "That's Dana. She has the authority to say yes or no.",
        reply_ko: '데이나가 맡을 겁니다. 결정할 권한이 있어요.'
      },
      {
        speaker: 'greg',
        situation: 'The clock says 11:55. Greg starts to gather his papers.',
        situation_ko: '시계가 11시 55분을 가리킵니다. 그렉이 서류를 챙기기 시작합니다.',
        line: 'Five minutes. Where does that leave us?',
        line_ko: '5분 남았습니다. 그래서 정리하면요?',
        prompt: 'Repeat back what you agreed on. One more thing was set: the scope talk is tomorrow at ten thirty.',
        prompt_ko: '합의한 내용을 되짚어 말하세요. 하나 더 정해진 게 있습니다. 범위 논의는 내일 10시 30분입니다.',
        model: 'Let me play that back: API access by Wednesday, Dana is our point of contact, and we talk scope tomorrow at ten thirty.',
        model_ko: '정리해 보겠습니다. 수요일까지 API 접근 권한, 담당자는 데이나, 범위 논의는 내일 10시 30분입니다.',
        distractors: [
          {
            text: 'Let me play that back: API access by Wednesday, Luis is our point of contact, and we talk scope tomorrow at ten thirty.',
            text_ko: '정리해 보겠습니다. 수요일까지 API 접근 권한, 담당자는 루이스, 범위 논의는 내일 10시 30분입니다.',
            reaction: "Luis? No, Dana's your contact. Luis is finance.",
            reaction_ko: '루이스요? 아뇨, 담당자는 데이나입니다. 루이스는 재무예요.'
          },
          {
            text: 'Let me play that back: API access by Friday, Dana is our point of contact, and we talk scope next week at ten thirty.',
            text_ko: '정리해 보겠습니다. 금요일까지 API 접근 권한, 담당자는 데이나, 범위 논의는 다음 주 10시 30분입니다.',
            reaction: 'Wednesday, and tomorrow. Write it down, Priya.',
            reaction_ko: '수요일, 그리고 내일입니다. 적어 두세요, 프리야.'
          },
          {
            text: "Great call, everyone. We'll get started today, and you'll have the whole dashboard by the end of the year.",
            text_ko: '좋은 회의였습니다. 오늘 바로 시작해서 연말까지 대시보드 전체를 드리겠습니다.',
            reaction: "End of the year? We haven't even talked scope.",
            reaction_ko: '연말이요? 범위 얘기도 아직 안 했습니다.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "That's it. And one minute early. Talk tomorrow.",
        reply_ko: '맞습니다. 게다가 1분 일찍 끝났네요. 내일 이야기합시다.'
      }
    ],
    phrases: [
      {
        id: 'pr_d8_kickoff.hard_stop',
        text: 'I have a hard stop at noon.',
        meaning_ko: '정오에는 꼭 끝내야 해요.',
        note: 'The meeting must end at that time, no matter what. Plan your agenda around it.',
        note_ko: '무슨 일이 있어도 그 시간에는 끝내야 한다는 뜻입니다. 안건을 거기에 맞추세요.',
        category: 'meeting'
      },
      {
        id: 'pr_d8_kickoff.items_on_the_agenda',
        text: 'We have three items on the agenda.',
        meaning_ko: '안건이 세 가지 있습니다.',
        note: 'Saying the number first helps people follow along.',
        note_ko: '개수를 먼저 말하면 듣는 사람이 따라오기 쉽습니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d8_kickoff.making_the_time',
        text: 'Thanks for making the time.',
        meaning_ko: '시간 내 주셔서 감사합니다.',
        note: '"Make the time" = find time in a busy schedule. A polite opening with clients.',
        note_ko: 'make the time은 바쁜 일정 중에 시간을 낸다는 뜻입니다. 고객과의 회의를 여는 공손한 말입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d8_kickoff.on_our_side',
        text: 'On our side, this is Derek.',
        meaning_ko: '저희 쪽에서는 이 사람이 데릭입니다.',
        note: '"On our side" / "on your side" = on our team / on your team in a deal.',
        note_ko: 'on our side, on your side는 거래에서 우리 쪽, 그쪽을 가리킵니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d8_kickoff.play_that_back',
        text: 'Let me play that back.',
        meaning_ko: '제가 다시 정리해 볼게요.',
        note: 'Like replaying a recording: you repeat what you heard to check it.',
        note_ko: '녹음을 다시 트는 것처럼, 들은 내용을 되풀이해 확인하는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d8_kickoff.point_of_contact',
        text: 'a single point of contact',
        meaning_ko: '단일 연락 담당자',
        note: 'The one person you go to with questions. Often shortened to POC.',
        note_ko: '질문이 있을 때 찾는 한 사람입니다. 흔히 POC로 줄여 씁니다.',
        category: 'office'
      },
      {
        id: 'pr_d8_kickoff.round_of_introductions',
        text: "Let's do a quick round of introductions.",
        meaning_ko: '짧게 돌아가며 소개합시다.',
        note: 'Everyone says their name and role, one after the other.',
        note_ko: '참석자가 차례로 이름과 역할을 말하는 것입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d8_kickoff.success_look_like',
        text: 'What does success look like for you?',
        meaning_ko: '어떤 모습이면 성공이라고 보세요?',
        note: 'Asks for the goal behind the request. A favorite question of product managers.',
        note_ko: '요청 뒤에 있는 목표를 묻는 말입니다. 프로덕트 매니저가 즐겨 쓰는 질문입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'pr_d9_scope',
    title: 'The wish list: saying "not yet"',
    title_ko: '위시리스트: "아직은 아니에요"라고 말하기',
    place: 'office_meeting',
    npc: 'greg',
    day_from: 9,
    day_to: 9,
    time_from: '10:00',
    time_to: '13:30',
    requires: 'pr_d8_kickoff',
    summary: 'Greg wants the dashboard, the mobile app and the wish list by November first. Protect the date without saying no: offer phases and a choice.',
    summary_ko: '그렉은 대시보드와 모바일 앱, 위시리스트까지 11월 1일에 원합니다. 안 된다고 말하지 않고 날짜를 지키세요. 단계를 나누고 선택지를 주는 겁니다.',
    sort: 10,
    tags: 'phone,client,meeting,negotiation,video-call',
    calendar: { day: 9, time: '10:30', title: 'Summit Retail: scope and timeline', title_ko: '서밋 리테일: 범위와 일정' },
    turns: [
      {
        speaker: 'greg',
        situation: 'Rain runs down the meeting room window. You sent Greg the gift card update this morning, as promised. Now he is back on the screen, and he sounds rushed.',
        situation_ko: '회의실 창문에 빗물이 흘러내립니다. 약속한 대로 오늘 아침 그렉에게 기프트 카드 진행 상황을 보냈습니다. 그렉이 다시 화면에 나타났는데, 급한 기색입니다.',
        line: "Our board wants the dashboard and the mobile app live by November first. And while you're at it, the wish list.",
        line_ko: '이사회는 11월 1일까지 대시보드랑 모바일 앱이 나오길 원합니다. 하는 김에 위시리스트도요.',
        prompt: "Don't refuse him. Show you understand, and suggest sorting out what's essential for that date.",
        prompt_ko: '거절하지 마세요. 이해한다는 걸 보여 주고, 그 날짜에 꼭 필요한 게 뭔지 함께 가려 보자고 하세요.',
        model: "I hear you. Let's look at what has to be live on November first, and what can follow.",
        model_ko: '무슨 말씀인지 알겠습니다. 11월 1일에 꼭 나가야 하는 것과 뒤따라가도 되는 것을 같이 보시죠.',
        distractors: [
          {
            text: "That's not possible, Greg. Three projects by November first just won't happen.",
            text_ko: '그건 불가능합니다, 그렉. 11월 1일까지 세 가지를 다 하는 건 절대 안 됩니다.',
            reaction: "I didn't call to hear what won't happen.",
            reaction_ko: '안 된다는 소리 들으려고 전화한 게 아닙니다.'
          },
          {
            text: "No problem at all. We'll find a way to get all three live by November first.",
            text_ko: '전혀 문제없습니다. 11월 1일까지 세 가지 다 나가게 어떻게든 해 보겠습니다.',
            reaction: "Good. That's exactly what I told the board.",
            reaction_ko: '좋습니다. 제가 이사회에 말한 그대로네요.'
          },
          {
            text: "I hear you. Let's look at what has to be live on December first, and what can follow.",
            text_ko: '무슨 말씀인지 알겠습니다. 12월 1일에 꼭 나가야 하는 것과 뒤따라가도 되는 것을 같이 보시죠.',
            reaction: 'December? I said November first.',
            reaction_ko: '12월이요? 11월 1일이라고 했습니다.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "Everything has to be live. That's what I told the board.",
        reply_ko: '전부 나가야 합니다. 이사회에 그렇게 말했어요.'
      },
      {
        speaker: 'greg',
        situation: 'The dashboard alone is eight weeks of work. The mobile app is another eight.',
        situation_ko: '대시보드만 해도 8주가 걸립니다. 모바일 앱은 8주가 더 필요합니다.',
        line: 'So what can you realistically deliver by November first?',
        line_ko: '그럼 11월 1일까지 현실적으로 뭘 해 줄 수 있습니까?',
        prompt: 'Split the work into two stages: the dashboard by his date, the mobile app in January.',
        prompt_ko: '일을 두 단계로 나누세요. 대시보드는 그가 말한 날짜에, 모바일 앱은 1월에요.',
        model: "Here's what I'd propose: phase one is the dashboard on November first. Phase two is the mobile app, in January.",
        model_ko: '이렇게 제안드리고 싶습니다. 1단계는 11월 1일에 대시보드, 2단계는 1월에 모바일 앱입니다.',
        distractors: [
          {
            text: "Here's what I'd propose: phase one is the mobile app on November first. Phase two is the dashboard, in January.",
            text_ko: '이렇게 제안드리고 싶습니다. 1단계는 11월 1일에 모바일 앱, 2단계는 1월에 대시보드입니다.',
            reaction: 'The app first? The dashboard is what my managers need.',
            reaction_ko: '앱이 먼저요? 우리 관리자들한테 필요한 건 대시보드입니다.'
          },
          {
            text: "Here's what I'd propose: phase one is the dashboard on November first. Phase two is the mobile app, a week later.",
            text_ko: '이렇게 제안드리고 싶습니다. 1단계는 11월 1일에 대시보드, 2단계는 일주일 뒤에 모바일 앱입니다.',
            reaction: 'A week later? That sounds too good to be true.',
            reaction_ko: '일주일 뒤요? 너무 좋아서 믿기지가 않네요.'
          },
          {
            text: 'Honestly, Greg, if your board wanted all three, they should have come to us months ago.',
            text_ko: '솔직히 그렉, 이사회가 세 가지를 다 원했으면 몇 달 전에 말씀하셨어야죠.',
            reaction: "Well, they didn't. So what can you do?",
            reaction_ko: '글쎄요, 안 했습니다. 그래서 뭘 해 줄 수 있습니까?'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "Phased… okay, I could sell that to the board. But the wish list goes into phase one, right? It's a tiny feature.",
        reply_ko: '단계별이라… 좋아요, 그거면 이사회를 설득할 수 있겠어요. 그런데 위시리스트는 1단계에 들어가는 거죠? 아주 작은 기능이잖아요.'
      },
      {
        speaker: 'greg',
        situation: "It is not tiny. Derek's estimate for the wish list was three weeks.",
        situation_ko: '작지 않습니다. 데릭이 추정한 위시리스트 작업은 3주였습니다.',
        line: "Come on. It's just a button.",
        line_ko: '에이. 그냥 버튼 하나잖아요.',
        prompt: "It's three weeks of work, not a button. Show you want it too, but explain what it would do to his date.",
        prompt_ko: '버튼 하나가 아니라 3주짜리 일입니다. 당신도 원한다는 걸 보여 주되, 그 날짜에 어떤 영향을 주는지 설명하세요.',
        model: "I'd love to get to it, and it's on the roadmap. But adding it now would put November first at risk.",
        model_ko: '저도 꼭 하고 싶고, 로드맵에도 있습니다. 하지만 지금 넣으면 11월 1일이 위험해집니다.',
        distractors: [
          {
            text: "It's not just a button, Greg. With all due respect, that's simply not how software works.",
            text_ko: '그냥 버튼이 아닙니다, 그렉. 죄송하지만 소프트웨어는 그렇게 돌아가지 않아요.',
            reaction: "Excuse me? I know enough to know I'm paying for it.",
            reaction_ko: '뭐라고요? 돈 내는 사람이 저라는 건 알 만큼은 압니다.'
          },
          {
            text: "I'd love to get to it, and it's on the roadmap. But it's three days of work, not just a button.",
            text_ko: '저도 꼭 하고 싶고, 로드맵에도 있습니다. 하지만 버튼 하나가 아니라 사흘짜리 작업이에요.',
            reaction: "Three days? Then what's the problem?",
            reaction_ko: '사흘이요? 그럼 뭐가 문제입니까?'
          },
          {
            text: "Okay, fair enough. If it's that small, we'll find a way to squeeze it into phase one.",
            text_ko: '네, 알겠습니다. 그렇게 작다면 어떻게든 1단계에 끼워 넣어 보겠습니다.',
            reaction: "Great. I knew you'd see it my way.",
            reaction_ko: '좋습니다. 제 말이 맞다는 걸 알아줄 줄 알았어요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "I can't move November first.",
        reply_ko: '11월 1일은 옮길 수 없어요.'
      },
      {
        speaker: 'greg',
        situation: 'Greg leans back and crosses his arms.',
        situation_ko: '그렉이 의자에 기대며 팔짱을 낍니다.',
        line: "So you're telling me no.",
        line_ko: '그러니까 안 된다는 거군요.',
        prompt: "Make it clear you're delaying it, not refusing it, and offer it first place in the next phase.",
        prompt_ko: '거절이 아니라 미루는 것뿐이라고 분명히 하고, 다음 단계에서 가장 먼저 하겠다고 제안하세요.',
        model: "It's not a no. It's a not yet. We can put the wish list at the top of phase two.",
        model_ko: '안 된다는 게 아니라 아직은 아니라는 겁니다. 위시리스트를 2단계 맨 앞에 두겠습니다.',
        distractors: [
          {
            text: "Yes, I'm telling you no. The wish list isn't happening this year.",
            text_ko: '네, 안 된다는 겁니다. 위시리스트는 올해 안에는 절대 없을 겁니다, 그렉.',
            reaction: 'Not this year? Then we have a problem, Priya.',
            reaction_ko: '올해 안에는 없다고요? 그럼 문제가 있네요, 프리야.'
          },
          {
            text: "It's not a no. It's a not yet. We can put the wish list at the end of phase two.",
            text_ko: '안 된다는 게 아니라 아직은 아니라는 겁니다. 위시리스트를 2단계 맨 끝에 두겠습니다.',
            reaction: "The end of phase two? That's not much of an offer.",
            reaction_ko: '2단계 맨 끝이요? 그건 제안이라고 하기도 어렵네요.'
          },
          {
            text: "No, no, of course not. I'll talk to the team, and we'll see what we can do.",
            text_ko: '아뇨, 아뇨, 그럴 리가요. 팀이랑 얘기해서 뭘 할 수 있는지 보겠습니다.',
            reaction: "So that's a yes? Good.",
            reaction_ko: '그럼 된다는 거죠? 좋습니다.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Top of phase two. Hmm. And what if I want it sooner anyway?',
        reply_ko: '2단계의 맨 위라. 흠. 그래도 더 빨리 받고 싶다면요?'
      },
      {
        speaker: 'greg',
        situation: 'He tries one more time. You give him the choice instead of the answer.',
        situation_ko: '그렉이 한 번 더 밀어붙입니다. 당신은 답 대신 선택지를 줍니다.',
        line: "It's my money. Put it in phase one.",
        line_ko: '제 돈입니다. 1단계에 넣어 주세요.',
        prompt: "Don't argue. Show him the trade-off and let him pick.",
        prompt_ko: '따지지 마세요. 무엇을 맞바꿔야 하는지 보여 주고 그가 고르게 하세요.',
        model: 'If the wish list comes in, something has to come out. Which would you rather have on November first?',
        model_ko: '위시리스트가 들어오면 다른 게 빠져야 합니다. 11월 1일에 어느 쪽을 받으시겠습니까?',
        distractors: [
          {
            text: "You're right, it's your money. We'll put it in phase one and make it all work.",
            text_ko: '맞습니다, 그렉의 돈이죠. 1단계에 넣고 어떻게든 다 맞춰 보겠습니다.',
            reaction: 'Make it work? You just told me it puts the date at risk.',
            reaction_ko: '다 맞춘다고요? 방금 날짜가 위험해진다고 했잖습니까.'
          },
          {
            text: "It may be your money, Greg, but it's my team. My answer is still phase two.",
            text_ko: '그렉의 돈일지는 몰라도 제 팀입니다. 제 답은 여전히 2단계입니다.',
            reaction: "Your team? I'm the client here, Priya.",
            reaction_ko: '제 팀이라고요? 고객은 저입니다, 프리야.'
          },
          {
            text: "If the wish list comes in, we'll need more budget, Greg. So how much more are you able to spend on it?",
            text_ko: '위시리스트가 들어오면 예산이 더 필요합니다, 그렉. 그럼 얼마나 더 쓰실 수 있습니까?',
            reaction: 'More money? I thought this was about time.',
            reaction_ko: '돈을 더요? 시간 문제인 줄 알았는데요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'The dashboard. No question. Fine, you win. Phase two.',
        reply_ko: '대시보드죠. 말할 것도 없어요. 좋아요, 당신이 이겼어요. 2단계로 합시다.'
      },
      {
        speaker: 'greg',
        situation: 'Jun is taking notes as fast as he can.',
        situation_ko: '준이 있는 힘껏 받아 적고 있습니다.',
        line: 'So what am I telling my board?',
        line_ko: '그럼 이사회에는 뭐라고 하면 됩니까?',
        prompt: 'Sum up the deal for his board, and promise him the revised schedule tomorrow.',
        prompt_ko: '이사회에 전할 합의 내용을 요약하고, 수정한 일정표를 내일 보내겠다고 하세요.',
        model: "Dashboard live on November first, mobile app and wish list in January. You'll have the updated timeline tomorrow.",
        model_ko: '대시보드는 11월 1일에 오픈, 모바일 앱과 위시리스트는 1월입니다. 수정한 일정표는 내일 보내 드리겠습니다.',
        distractors: [
          {
            text: "Dashboard live on November first, mobile app in January, and the wish list in phase one. Timeline's coming tomorrow.",
            text_ko: '대시보드는 11월 1일에 오픈, 모바일 앱은 1월, 위시리스트는 1단계입니다. 일정표는 내일 보내 드리겠습니다.',
            reaction: 'Phase one? I just agreed to phase two.',
            reaction_ko: '1단계요? 방금 2단계로 하자고 했잖습니까.'
          },
          {
            text: "Dashboard and mobile app live on November first, wish list in January. You'll have the timeline tomorrow.",
            text_ko: '대시보드와 모바일 앱은 11월 1일에 오픈, 위시리스트는 1월입니다. 일정표는 내일 보내 드리겠습니다.',
            reaction: "Both on November first? That's not what we just said.",
            reaction_ko: '둘 다 11월 1일이요? 방금 그렇게 얘기하지 않았습니다.'
          },
          {
            text: "Just tell them we're working on it, and that we'll get back to them soon with all the details.",
            text_ko: '그냥 지금 작업 중이고, 곧 자세한 내용을 전부 정리해서 알려 드리겠다고 전해 주세요.',
            reaction: "My board won't accept 'soon,' Priya.",
            reaction_ko: "우리 이사회는 '곧'이라는 말을 안 받아 줍니다, 프리야."
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Sounds like a plan. Thanks for being straight with me.',
        reply_ko: '좋은 계획이네요. 솔직하게 말해 줘서 고마워요.'
      }
    ],
    phrases: [
      {
        id: 'pr_d9_scope.at_risk',
        text: 'That would put November first at risk.',
        meaning_ko: '그러면 11월 1일이 위험해집니다.',
        note: '"Put something at risk" = make it likely to fail. Name the thing the client cares about.',
        note_ko: 'put something at risk는 그것이 실패할 가능성을 높인다는 뜻입니다. 고객이 아끼는 것을 짚어 말하세요.',
        category: 'meeting'
      },
      {
        id: 'pr_d9_scope.i_hear_you',
        text: 'I hear you.',
        meaning_ko: '무슨 말씀인지 알겠어요.',
        note: 'Shows you understand how the other person feels. It does not mean "I agree".',
        note_ko: '상대의 마음을 이해한다는 말입니다. 동의한다는 뜻은 아닙니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d9_scope.not_yet',
        text: "It's not a no. It's a not yet.",
        meaning_ko: '안 된다는 게 아니라 아직은 아니라는 거예요.',
        note: 'Keeps the idea alive and the relationship warm.',
        note_ko: '아이디어도 살리고 관계도 지키는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d9_scope.something_has_to_come_out',
        text: 'If the wish list comes in, something has to come out.',
        meaning_ko: '위시리스트가 들어오면 무언가는 빠져야 해요.',
        note: 'The rule of a fixed date: new work replaces old work.',
        note_ko: '날짜가 고정되어 있을 때의 원칙입니다. 새 일이 들어오면 있던 일이 빠집니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d9_scope.top_of_phase_two',
        text: 'We can put it at the top of phase two.',
        meaning_ko: '2단계의 맨 위에 둘 수 있어요.',
        note: '"At the top of" a list = the first thing to be done.',
        note_ko: 'at the top of는 목록에서 가장 먼저 할 일이라는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d9_scope.what_id_propose',
        text: "Here's what I'd propose.",
        meaning_ko: '제가 제안하고 싶은 건 이렇습니다.',
        note: "\"I'd propose\" is softer than \"I propose\". It invites discussion.",
        note_ko: "I'd propose는 I propose보다 부드럽고, 논의의 여지를 남깁니다.",
        category: 'meeting'
      },
      {
        id: 'pr_d9_scope.while_youre_at_it',
        text: "And while you're at it, the wish list.",
        meaning_ko: '하는 김에 위시리스트도요.',
        note: 'How extra work gets added: "since you are already doing that, do this too."',
        note_ko: '일이 덧붙는 전형적인 말입니다. 어차피 하는 김에 이것도 해 달라는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d9_scope.would_you_rather',
        text: 'Which would you rather have?',
        meaning_ko: '어느 쪽을 받고 싶으세요?',
        note: '"Would rather" = prefer. Giving a choice is easier to accept than a no.',
        note_ko: 'would rather는 더 좋아한다는 뜻입니다. 거절보다 선택지가 받아들이기 쉽습니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'pr_d9_actions',
    title: 'Nailing down the action items',
    title_ko: '액션 아이템 확실히 정하기',
    place: 'office_desk',
    npc: 'jun',
    day_from: 9,
    day_to: 9,
    time_from: '13:00',
    time_to: '18:00',
    requires: 'pr_d9_scope',
    summary: "After the scope call, stop by Jun's desk. Turn his notes into action items, each with an owner and a due date, before anything gets forgotten.",
    summary_ko: '범위 논의 통화가 끝난 뒤 준의 자리에 들르세요. 잊어버리기 전에 준의 메모를 담당자와 기한이 있는 액션 아이템으로 바꾸세요.',
    sort: 20,
    tags: 'meeting,planning,follow-up',
    calendar: { day: 9, time: '14:00', title: 'Action items with Jun', title_ko: '준과 액션 아이템 정리' },
    turns: [
      {
        speaker: 'jun',
        situation: 'It is still raining. Jun is at his desk with three pages of notes from the call.',
        situation_ko: '비가 아직도 옵니다. 준이 통화에서 적은 메모 세 장을 들고 자리에 앉아 있습니다.',
        line: "That was intense. I wrote down everything, but I'm not sure who's doing what.",
        line_ko: '정신없었어요. 다 적긴 했는데 누가 뭘 하는지 모르겠어요.',
        prompt: 'Suggest sorting out who does what right now, before anything slips through the cracks.',
        prompt_ko: '놓치는 게 생기기 전에, 지금 바로 누가 무엇을 할지 정리하자고 하세요.',
        model: "Let's nail down the action items while it's still fresh.",
        model_ko: '기억이 생생할 때 액션 아이템을 확실히 정해 두죠.',
        distractors: [
          {
            text: "Let's sort it out tomorrow. I'm too tired right now.",
            text_ko: '내일 정리해요. 지금은 너무 피곤해요.',
            reaction: 'Tomorrow? I might forget half of it by then.',
            reaction_ko: '내일이요? 그때쯤이면 반은 잊어버릴 것 같은데요.'
          },
          {
            text: "You should've asked during the call. Why didn't you?",
            text_ko: '통화 중에 물어봤어야죠. 왜 안 물어봤어요?',
            reaction: 'Sorry. It was moving really fast.',
            reaction_ko: '죄송해요. 너무 빨리 지나가서요.'
          },
          {
            text: "Just send me your notes, and I'll figure the rest out myself.",
            text_ko: '메모만 보내 줘요. 나머지는 제가 알아서 정리할게요.',
            reaction: 'Oh. Okay. Should I still keep a copy?',
            reaction_ko: '아. 네. 그래도 사본은 갖고 있을까요?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Good idea. I have three so far.',
        reply_ko: '좋은 생각이에요. 지금까지 세 가지예요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun turns to the first page.',
        situation_ko: '준이 첫 장을 펼칩니다.',
        line: 'First, the updated timeline for Greg. Is that mine?',
        line_ko: '첫째, 그렉한테 보낼 수정 일정표요. 그거 제 일이에요?',
        prompt: 'That one is yours, not his. Tell him when Greg will get it: noon tomorrow.',
        prompt_ko: '그건 준이 아니라 당신 일입니다. 그렉이 언제 받을지 말하세요. 내일 정오입니다.',
        model: "I'll take that one. Greg will have it by noon tomorrow.",
        model_ko: '그건 제가 할게요. 내일 정오까지 그렉한테 보낼게요.',
        distractors: [
          {
            text: "Yes, that's yours. Send it to Greg by noon tomorrow.",
            text_ko: '네, 그건 준 일이에요. 내일 정오까지 그렉한테 보내요.',
            reaction: "Me? I don't even know the phase dates by heart.",
            reaction_ko: '제가요? 단계별 날짜도 아직 다 못 외웠는데요.'
          },
          {
            text: "I'll take that one. Greg will have it by noon on Friday.",
            text_ko: '그건 제가 할게요. 금요일 정오까지 그렉한테 보낼게요.',
            reaction: "Friday? Didn't you tell him tomorrow?",
            reaction_ko: '금요일이요? 그렉한테 내일이라고 하지 않았어요?'
          },
          {
            text: "I'll take that one. Greg will get it at some point.",
            text_ko: '그건 제가 할게요. 그렉한텐 언젠가 보낼게요.',
            reaction: 'Should I write a date? Every item needs one, right?',
            reaction_ko: '날짜를 적을까요? 항목마다 있어야 하잖아요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Okay. Timeline: Priya, noon tomorrow.',
        reply_ko: '네. 일정표: 프리야, 내일 정오.'
      },
      {
        speaker: 'jun',
        situation: 'Jun flies to Ridgeport on Thursday morning.',
        situation_ko: '준은 목요일 아침에 리지포트로 떠납니다.',
        line: 'Second, the estimate for the wish list in phase two.',
        line_ko: '둘째, 2단계 위시리스트 추정치요.',
        prompt: "Ask him to take this one on. It doesn't need to be exact, but you need it before his Thursday trip.",
        prompt_ko: '준에게 이걸 맡아 달라고 하세요. 정확하지 않아도 되지만, 목요일 출장 전에는 필요합니다.',
        model: 'Can you own that one? A rough estimate is fine, but I need it before you fly out on Thursday.',
        model_ko: '그건 준이 맡아 줄래요? 대략적인 추정치면 되는데, 목요일에 떠나기 전까지는 필요해요.',
        distractors: [
          {
            text: "Can you own that one? A rough estimate is fine, but I'll need it once you're back from your trip.",
            text_ko: '그건 준이 맡아 줄래요? 대략적인 추정치면 되는데, 출장 다녀온 다음에 주면 돼요.',
            reaction: 'After? I thought you needed it before I fly out.',
            reaction_ko: '다녀온 다음이요? 떠나기 전에 필요한 줄 알았는데요.'
          },
          {
            text: 'Can you own that one? It has to be exact, down to the day. No guessing this time.',
            text_ko: '그건 준이 맡아 줄래요? 하루 단위까지 정확해야 해요. 이번엔 짐작은 안 돼요.',
            reaction: "Down to the day? For a rough feature? That's tough.",
            reaction_ko: '하루 단위까지요? 아직 대충 잡힌 기능인데요? 어렵네요.'
          },
          {
            text: "Derek can own that one. You're too new to estimate something like this.",
            text_ko: '그건 데릭이 맡으면 돼요. 준은 이런 걸 추정하기엔 아직 너무 신입이에요.',
            reaction: 'Oh. Okay. I thought I could do it with his help.',
            reaction_ko: '아. 네. 데릭 도움 받으면 할 수 있을 줄 알았어요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Sure. I'll sit down with Derek this afternoon.",
        reply_ko: '그럼요. 오늘 오후에 데릭과 같이 앉아서 볼게요.'
      },
      {
        speaker: 'derek',
        situation: "Derek walks by with a mug of coffee and looks over Jun's shoulder.",
        situation_ko: '데릭이 커피 잔을 들고 지나가다 준의 어깨 너머로 메모를 봅니다.',
        line: "Don't forget the API access. Greg promised it by tomorrow, and nobody's chasing it.",
        line_ko: 'API 접근 권한 잊지 마요. 그렉이 내일까지 준다고 했는데, 아무도 챙기는 사람이 없어요.',
        prompt: "He's right. Say you'll chase their point of contact early tomorrow morning.",
        prompt_ko: '맞는 말입니다. 내일 아침 일찍 그쪽 담당자에게 확인하겠다고 하세요.',
        model: "You're right. I'll follow up with Dana first thing tomorrow.",
        model_ko: '맞아요. 내일 아침 제일 먼저 데이나한테 확인할게요.',
        distractors: [
          {
            text: "You're right. I'll follow up with Luis first thing tomorrow.",
            text_ko: '맞아요. 내일 아침 제일 먼저 루이스한테 확인할게요.',
            reaction: "Luis? He's finance. Dana's the one who can say yes.",
            reaction_ko: '루이스요? 재무잖아요. 결정할 수 있는 건 데이나예요.'
          },
          {
            text: "That's Jun's job, isn't it? He was the one taking notes.",
            text_ko: '그건 준 일 아니에요? 메모한 사람이 준이잖아요.',
            reaction: "Whoa. He's two weeks in. Someone senior should chase it.",
            reaction_ko: '워. 온 지 2주 된 사람이에요. 이런 건 선임이 챙겨야죠.'
          },
          {
            text: "You're right. Let's give Greg a few days. He'll get to it.",
            text_ko: '맞아요. 그렉한테 며칠 줘 보죠. 알아서 해 주겠죠.',
            reaction: 'A few days? Then the dashboard waits a few days.',
            reaction_ko: '며칠이요? 그럼 대시보드도 며칠 밀리는 거예요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Perfect. No access, no dashboard.',
        reply_ko: '좋아요. 접근 권한이 없으면 대시보드도 없으니까요.'
      },
      {
        speaker: 'jun',
        situation: 'Three items, three owners. Jun opens a new email.',
        situation_ko: '세 가지 일에 담당자도 셋입니다. 준이 새 이메일 창을 엽니다.',
        line: 'Should I send these notes to everyone?',
        line_ko: '이 메모 다 같이 보내 드릴까요?',
        prompt: 'Say yes, today. Tell him what each item needs next to it, and to copy your manager.',
        prompt_ko: '네, 오늘 보내라고 하세요. 항목마다 무엇을 적어야 하는지 말하고, 당신의 매니저를 참조로 넣으라고 하세요.',
        model: 'Yes, please send them out today, with an owner and a due date next to each item. And cc Maya.',
        model_ko: '네, 오늘 보내 줘요. 항목마다 옆에 담당자랑 기한을 적어서요. 그리고 마야도 참조로 넣어 주고요.',
        distractors: [
          {
            text: 'Yes, please send them out today, with an owner and a due date next to each item. And cc Greg.',
            text_ko: '네, 오늘 보내 줘요. 항목마다 옆에 담당자랑 기한을 적어서요. 그리고 그렉도 참조로 넣어 주고요.',
            reaction: 'Greg? I thought these were just for us.',
            reaction_ko: '그렉이요? 이건 우리끼리 보는 건 줄 알았는데요.'
          },
          {
            text: 'Yes, but hold them until Friday, so we can add anything else that comes up this week.',
            text_ko: '네, 그런데 금요일까지 갖고 있어요. 이번 주에 더 생기는 것까지 넣어서 보내게요.',
            reaction: "Friday? I'll be in Ridgeport by then.",
            reaction_ko: '금요일이요? 그땐 저 리지포트에 가 있을 거예요.'
          },
          {
            text: 'No, just keep them for yourself. Everyone was on the call, so they already know what to do.',
            text_ko: '아뇨, 그냥 준만 갖고 있어요. 다들 통화에 있었으니까 뭘 할지 이미 알아요.',
            reaction: "Really? I'm not sure Derek remembers all of it.",
            reaction_ko: '정말요? 데릭이 다 기억할지 모르겠는데요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Owner, due date, cc Maya. They'll go out within the hour.",
        reply_ko: '담당자, 기한, 마야 참조. 한 시간 안에 보낼게요.'
      }
    ],
    phrases: [
      {
        id: 'pr_d9_actions.chasing_it',
        text: "Nobody's chasing it.",
        meaning_ko: '아무도 챙기고 있지 않아요.',
        note: '"Chase" = keep asking until a promised thing arrives.',
        note_ko: 'chase는 약속한 것이 올 때까지 계속 챙겨 묻는다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d9_actions.first_thing',
        text: 'first thing tomorrow',
        meaning_ko: '내일 아침 가장 먼저',
        note: 'Before any other work at the start of the day.',
        note_ko: '하루를 시작하며 다른 일보다 먼저 한다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d9_actions.follow_up_with',
        text: "I'll follow up with Dana.",
        meaning_ko: '데이나에게 다시 확인할게요.',
        note: 'Follow up WITH a person, follow up ON a topic.',
        note_ko: '사람에게는 follow up with, 주제에는 follow up on을 씁니다.',
        category: 'office'
      },
      {
        id: 'pr_d9_actions.ill_take_that_one',
        text: "I'll take that one.",
        meaning_ko: '그건 제가 맡을게요.',
        note: 'Claims a task in a meeting. Short and clear.',
        note_ko: '회의에서 일을 맡겠다고 할 때 쓰는 짧고 분명한 말입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d9_actions.nail_down',
        text: "Let's nail down the action items.",
        meaning_ko: '액션 아이템을 확실히 정합시다.',
        note: '"Nail down" = make final and clear. You can nail down a date, a price or a plan.',
        note_ko: 'nail down은 분명하게 확정한다는 뜻입니다. 날짜, 가격, 계획에 두루 씁니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d9_actions.owner_and_due_date',
        text: 'an owner and a due date',
        meaning_ko: '담당자와 기한',
        note: 'A task without both is only a wish.',
        note_ko: '둘 중 하나라도 없는 할 일은 그저 바람일 뿐입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d9_actions.rough_estimate',
        text: 'A rough estimate is fine.',
        meaning_ko: '대략적인 추정치면 돼요.',
        note: 'Rough = not exact. Also "a ballpark figure".',
        note_ko: 'rough는 정확하지 않아도 된다는 뜻입니다. a ballpark figure라고도 합니다.',
        category: 'office'
      },
      {
        id: 'pr_d9_actions.while_its_fresh',
        text: "while it's still fresh",
        meaning_ko: '아직 기억이 생생할 때',
        note: 'Short for "fresh in our minds". After a day, half the details are gone.',
        note_ko: 'fresh in our minds를 줄인 말입니다. 하루만 지나도 자세한 내용의 절반은 잊힙니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'pr_d10_contract',
    title: 'Holding the line on the contract',
    title_ko: '계약 조건에서 물러서지 않기',
    place: 'office_meeting',
    npc: 'greg',
    day_from: 10,
    day_to: 10,
    time_from: '10:00',
    time_to: '13:30',
    requires: 'pr_d9_scope',
    summary: 'Greg pushes on price, payment terms and uptime. Hold the line on the price, trade one thing for another, and do not agree to what you cannot approve.',
    summary_ko: '그렉이 가격, 지급 조건, 가동률을 밀어붙입니다. 가격은 지키고, 하나를 내주면 하나를 받고, 승인할 수 없는 것에는 동의하지 마세요.',
    sort: 10,
    tags: 'phone,client,meeting,negotiation,contract,video-call',
    calendar: { day: 10, time: '10:30', title: 'Summit Retail: contract terms', title_ko: '서밋 리테일: 계약 조건' },
    turns: [
      {
        speaker: 'greg',
        situation: 'A gray, chilly morning. The proposal is on the screen: $180,000 for phase one, payment Net 30.',
        situation_ko: '흐리고 쌀쌀한 아침입니다. 화면에 제안서가 떠 있습니다. 1단계 18만 달러, 지급 조건 Net 30.',
        line: "I've looked at the numbers. Honestly, one eighty is outside our budget. We were thinking closer to one fifty.",
        line_ko: '숫자를 봤어요. 솔직히 18만은 우리 예산을 벗어나요. 우리는 15만 정도를 생각하고 있었거든요.',
        prompt: "Don't come down on the price. Show him you hear him, then tie the number to what it covers: 40 stores, live data and 3 months of support.",
        prompt_ko: '가격을 내리지 마세요. 그의 입장을 이해한다고 보여 주고, 그 금액에 매장 40곳, 실시간 데이터, 3개월 지원이 들어 있다는 점을 짚으세요.',
        model: 'I understand. The price reflects the work: forty stores, live data, and three months of support.',
        model_ko: '이해합니다. 그 가격에는 일의 크기가 반영되어 있어요. 매장 40곳, 실시간 데이터, 그리고 3개월 지원까지요.',
        distractors: [
          {
            text: 'I understand. The price reflects a lot of work: thirty stores, live data, and six months of support.',
            text_ko: '이해합니다. 그 가격에는 많은 일이 들어 있어요. 매장 30곳, 실시간 데이터, 그리고 6개월 지원까지요.',
            reaction: "Thirty stores? We're rolling out to forty. Did the scope change?",
            reaction_ko: '30곳이요? 우리는 40곳에 도입하는데요. 범위가 바뀌었나요?'
          },
          {
            text: 'I hear you. If one fifty is your budget, I think we can probably make that work for you.',
            text_ko: '무슨 말씀인지 알아요. 예산이 15만이라면, 아마 그 금액으로 맞춰 드릴 수 있을 것 같아요.',
            reaction: 'Really? That was easier than I expected. Can I get that in writing?',
            reaction_ko: '정말요? 생각보다 쉽네요. 그거 서면으로 받을 수 있을까요?'
          },
          {
            text: "Honestly, that's your budget problem, not ours. One eighty is what this work costs, period.",
            text_ko: '솔직히 그건 그쪽 예산 문제지 우리 문제가 아니에요. 이 일은 18만이에요. 그게 끝이에요.',
            reaction: 'Whoa. I was hoping we could have a conversation here, Priya.',
            reaction_ko: '이런. 저는 대화를 좀 해 보고 싶었는데요, 프리야.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'That helps. But I still need the number to come down. Can you meet us halfway? Say, one sixty-five?',
        reply_ko: '도움이 되네요. 그래도 금액을 낮춰야 해요. 중간에서 만날 수 있을까요? 16만 5천 정도?'
      },
      {
        speaker: 'greg',
        situation: 'You are not allowed to approve a discount on your own. Maya is.',
        situation_ko: '당신에게는 혼자서 할인을 승인할 권한이 없습니다. 마야에게는 있습니다.',
        line: 'One sixty-five. Can we shake on that?',
        line_ko: '16만 5천. 그걸로 악수할까요?',
        prompt: "Discounts aren't yours to approve. Don't commit either way today.",
        prompt_ko: '할인은 당신이 승인할 수 있는 일이 아닙니다. 오늘은 어느 쪽으로도 확답하지 마세요.',
        model: "I'm not in a position to agree to that today. I'll need to run that by my manager.",
        model_ko: '오늘 그 자리에서 동의할 수 있는 입장은 아니에요. 매니저와 상의해 봐야 해요.',
        distractors: [
          {
            text: "One sixty-five sounds fair to me. Let's shake on it, and I'll update the proposal.",
            text_ko: '16만 5천이면 저는 괜찮은 것 같아요. 악수하죠. 제안서는 제가 고쳐 둘게요.',
            reaction: "Great, I'll tell finance. You're sure you can sign off on that yourself?",
            reaction_ko: '좋아요, 재무팀에 말할게요. 그런데 그걸 혼자 승인하셔도 되는 거 맞죠?'
          },
          {
            text: "I'm not able to agree to that today. I'll need to check with Derek, our lead developer.",
            text_ko: '오늘은 동의해 드릴 수가 없어요. 수석 개발자인 데릭에게 확인해 봐야 해요.',
            reaction: 'Derek? I thought pricing went through your manager, not engineering.',
            reaction_ko: '데릭이요? 가격은 개발팀이 아니라 매니저를 거치는 줄 알았는데요.'
          },
          {
            text: "No. One eighty is final, and there's nothing more to talk about on the price.",
            text_ko: '안 돼요. 18만이 최종이고, 가격에 대해서는 더 이야기할 게 없어요.',
            reaction: "That's a pretty hard no. I was hoping for a little more flexibility.",
            reaction_ko: '꽤 단호하시네요. 조금은 여지가 있기를 바랐는데요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "Fair enough. While you're at it, payment terms. Our standard is Net 60.",
        reply_ko: '그러죠. 그 김에 지급 조건도 봅시다. 우리 기준은 Net 60이에요.'
      },
      {
        speaker: 'greg',
        situation: 'Net 60 means waiting two months for every payment. You can give a little, if you get something back.',
        situation_ko: 'Net 60이면 돈을 받을 때마다 두 달을 기다려야 합니다. 조금 양보할 수는 있습니다. 받는 것이 있다면요.',
        line: 'Net 30 is tough for our finance team.',
        line_ko: 'Net 30은 우리 재무팀한테 좀 힘들어요.',
        prompt: 'Meet him partway at Net 45, but only in exchange for a purchase order this week.',
        prompt_ko: '중간인 Net 45로 양보하되, 이번 주 안에 발주서를 받는 것을 조건으로 거세요.',
        model: 'If you can commit to a purchase order this week, we can do Net 45.',
        model_ko: '이번 주 안에 발주서를 약속해 주시면, Net 45로 해 드릴 수 있어요.',
        distractors: [
          {
            text: 'Okay, we can do Net 60 for you. We want your finance team happy.',
            text_ko: '좋아요, Net 60으로 해 드릴게요. 재무팀이 만족하셔야죠.',
            reaction: "Net 60, no strings? Well, I won't argue with that.",
            reaction_ko: '아무 조건 없이 Net 60이요? 뭐, 저야 마다할 이유가 없죠.'
          },
          {
            text: 'If your finance team can sign by next month, we could look at Net 45.',
            text_ko: '재무팀이 다음 달까지 서명해 주시면, Net 45를 검토해 볼 수 있어요.',
            reaction: 'Next month? I could probably get a PO out sooner than that.',
            reaction_ko: '다음 달이요? 발주서는 그보다 빨리 낼 수 있을 것 같은데요.'
          },
          {
            text: "Net 30 is our standard too. I'm afraid your finance team will need to adjust.",
            text_ko: 'Net 30은 우리 기준이기도 해요. 죄송하지만 재무팀이 맞춰 주셔야겠어요.',
            reaction: 'So no movement at all? That makes this harder to sell internally.',
            reaction_ko: '조금도 못 움직인다고요? 그러면 내부를 설득하기가 더 어려워져요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'A PO this week for Net 45… I can live with that.',
        reply_ko: '이번 주 발주서에 Net 45라… 그 정도면 받아들일 수 있어요.'
      },
      {
        speaker: 'greg',
        situation: 'Next is the service level agreement, the SLA.',
        situation_ko: '다음은 서비스 수준 협약(SLA)입니다.',
        line: 'Last thing: uptime. We need a guarantee. What can you commit to?',
        line_ko: '마지막으로 가동률이요. 보장이 필요해요. 어디까지 약속할 수 있어요?',
        prompt: 'Commit only to what you can actually deliver: 99.9% uptime, and a response within four hours for critical issues.',
        prompt_ko: '실제로 지킬 수 있는 것만 약속하세요. 가동률 99.9퍼센트, 그리고 심각한 장애에는 4시간 안에 대응입니다.',
        model: 'We only promise what we can stand behind: 99.9 percent uptime and a four-hour response time for critical issues.',
        model_ko: '우리는 책임질 수 있는 것만 약속해요. 가동률 99.9퍼센트, 그리고 심각한 장애에는 4시간 안에 대응합니다.',
        distractors: [
          {
            text: "We can guarantee one hundred percent uptime, and we'll respond to any issue within the hour.",
            text_ko: '가동률 100퍼센트를 보장해 드릴 수 있고, 어떤 문제든 한 시간 안에 대응할게요.',
            reaction: 'A hundred percent? Nobody can promise that. Are you sure?',
            reaction_ko: '100퍼센트요? 그런 약속은 아무도 못 해요. 정말이에요?'
          },
          {
            text: 'We only commit to what we can actually deliver: 99 percent uptime and a twenty-four-hour response for critical issues.',
            text_ko: '우리는 실제로 지킬 수 있는 것만 약속해요. 가동률 99퍼센트, 그리고 심각한 장애에는 24시간 안에 대응합니다.',
            reaction: "Twenty-four hours for a critical issue? Our stores can't wait a whole day.",
            reaction_ko: '심각한 장애에 24시간이요? 우리 매장들은 하루를 통째로 기다릴 수 없어요.'
          },
          {
            text: "Uptime depends on a lot of things on your side, so it's hard for us to promise any specific number.",
            text_ko: '가동률은 그쪽 사정에도 많이 달려 있어서, 구체적인 숫자를 약속하기는 어려워요.',
            reaction: "I need a number, Priya. Legal won't accept \"it depends.\"",
            reaction_ko: '숫자가 필요해요, 프리야. 법무팀은 "상황에 따라 다르다"는 말을 안 받아 줘요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "That's reasonable. Send me the revised terms and I'll share them with legal.",
        reply_ko: '합리적이네요. 수정된 조건을 보내 주면 법무팀과 공유할게요.'
      },
      {
        speaker: 'greg',
        situation: 'He comes back to the price one more time.',
        situation_ko: '그렉이 한 번 더 가격 이야기로 돌아옵니다.',
        line: 'And the price? I need something to tell finance today.',
        line_ko: '가격은요? 오늘 재무팀에 뭐라도 말해 줘야 해요.',
        prompt: "Don't move on the price yet, but tell him he'll hear from you before the day is over. Keep it friendly.",
        prompt_ko: '아직 가격은 움직이지 마세요. 대신 오늘 안에 답을 주겠다고 하세요. 상냥하게요.',
        model: "For now, one eighty stands. I'll have an answer for you by end of day.",
        model_ko: '지금으로서는 18만 그대로예요. 오늘 퇴근 전까지 답을 드릴게요.',
        distractors: [
          {
            text: "Tell finance one sixty-five for now, and I'll confirm it by end of day.",
            text_ko: '재무팀에는 일단 16만 5천이라고 하세요. 오늘 퇴근 전까지 확정해 드릴게요.',
            reaction: "One sixty-five, then. Finance will be happy. I'll hold you to that.",
            reaction_ko: '그럼 16만 5천이네요. 재무팀이 좋아하겠어요. 그 말 꼭 지키세요.'
          },
          {
            text: "The price stays at one eighty for now. I'll get back to you next week.",
            text_ko: '가격은 당분간 18만 그대로예요. 다음 주에 다시 연락드릴게요.',
            reaction: 'Next week? I said I need something for finance today.',
            reaction_ko: '다음 주요? 오늘 재무팀에 줄 게 필요하다고 했잖아요.'
          },
          {
            text: "Tell them one eighty. That's the price, and I don't have anything else for you.",
            text_ko: '18만이라고 하세요. 그게 가격이고, 더 드릴 말씀은 없어요.',
            reaction: "Okay. That's... not very helpful, Priya.",
            reaction_ko: '그래요. 그건… 별로 도움이 안 되네요, 프리야.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'You drive a hard bargain, Priya. End of day, then.',
        reply_ko: '만만치 않게 협상하시네요, 프리야. 그럼 오늘 퇴근 전까지로 합시다.'
      },
      {
        speaker: 'greg',
        situation: 'Almost noon. Derek and Jun have not said a word about money, just as you agreed.',
        situation_ko: '정오가 다 되어 갑니다. 약속한 대로 데릭과 준은 돈 이야기를 한마디도 하지 않았습니다.',
        line: 'So where does that leave us?',
        line_ko: '그래서 우리는 어디까지 온 거죠?',
        prompt: 'Wrap up the meeting: go over what you agreed on and what is still undecided.',
        prompt_ko: '합의한 것과 아직 정해지지 않은 것을 정리하며 회의를 마무리하세요.',
        model: "Here's where we landed: Net 45 with a PO this week, 99.9 percent uptime, and the price is still open.",
        model_ko: '여기까지 정리하면 이래요. 이번 주 발주서를 조건으로 Net 45, 가동률 99.9퍼센트, 그리고 가격은 아직 미정이에요.',
        distractors: [
          {
            text: "Here's where we are: Net 60 with a PO this week, 99.9 percent uptime, and the price is still open for now.",
            text_ko: '지금까지 이래요. 이번 주 발주서를 조건으로 Net 60, 가동률 99.9퍼센트, 그리고 가격은 아직은 미정이에요.',
            reaction: 'Net 60? I thought we settled on Net 45 for a PO this week.',
            reaction_ko: 'Net 60이요? 이번 주 발주서를 주는 대신 Net 45로 정한 줄 알았는데요.'
          },
          {
            text: "So we've agreed: Net 45 with a PO this week, 99.9 percent uptime, and one sixty-five on price.",
            text_ko: '그러니까 합의한 건 이래요. 이번 주 발주서 조건으로 Net 45, 가동률 99.9퍼센트, 가격은 16만 5천.',
            reaction: 'One sixty-five? I thought you still had to check with your manager.',
            reaction_ko: '16만 5천이요? 아직 매니저한테 확인해야 한다고 하지 않았어요?'
          },
          {
            text: "I think we made good progress today. Let's set up another call next week to go over everything.",
            text_ko: '오늘 진전이 꽤 있었던 것 같아요. 다음 주에 통화를 한 번 더 잡아서 전부 다시 훑어보죠.',
            reaction: 'Sure, but before we hang up, can you recap where things stand?',
            reaction_ko: '좋아요. 그런데 끊기 전에 지금 상황을 한번 정리해 줄래요?'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'That matches my notes. Talk soon.',
        reply_ko: '제 메모와 같네요. 또 이야기합시다.'
      }
    ],
    phrases: [
      {
        id: 'pr_d10_contract.hard_bargain',
        text: 'You drive a hard bargain.',
        meaning_ko: '만만치 않게 협상하시네요.',
        note: 'Said, often with a smile, to someone who negotiates firmly.',
        note_ko: '단단하게 협상하는 사람에게 흔히 웃으며 하는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d10_contract.if_you_can_we_can',
        text: 'If you can commit to a purchase order, we can do Net 45.',
        meaning_ko: '발주서를 약속해 주시면 Net 45로 할 수 있어요.',
        note: 'The basic sentence of negotiating: every gift has a condition.',
        note_ko: '협상의 기본 문장입니다. 내주는 것에는 늘 조건이 붙습니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d10_contract.not_in_a_position',
        text: "I'm not in a position to agree to that.",
        meaning_ko: '제가 거기에 동의할 수 있는 입장이 아니에요.',
        note: 'A polite way to say "I am not allowed to" or "I cannot".',
        note_ko: '권한이 없거나 할 수 없다는 것을 공손하게 말하는 표현입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d10_contract.price_reflects',
        text: 'The price reflects the work.',
        meaning_ko: '가격에는 일의 크기가 반영되어 있어요.',
        note: 'Defends a price by pointing at what the client gets for it.',
        note_ko: '고객이 그 값으로 무엇을 받는지 짚어서 가격을 지키는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d10_contract.purchase_order',
        text: 'a purchase order (PO)',
        meaning_ko: '발주서',
        note: "The client's official written order. With a PO, the work and the money are approved.",
        note_ko: '고객이 내는 공식 주문서입니다. 발주서가 나오면 일과 예산이 승인된 것입니다.',
        category: 'office'
      },
      {
        id: 'pr_d10_contract.run_that_by',
        text: "I'll need to run that by my manager.",
        meaning_ko: '매니저와 상의해 봐야 해요.',
        note: '"Run something by someone" = ask for their approval. It also buys you time.',
        note_ko: 'run something by someone은 승인을 구한다는 뜻입니다. 시간을 버는 효과도 있습니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d10_contract.stand_behind',
        text: 'We only promise what we can stand behind.',
        meaning_ko: '저희는 책임질 수 있는 것만 약속합니다.',
        note: '"Stand behind" a promise or a product = guarantee it.',
        note_ko: '약속이나 제품을 stand behind한다는 것은 그것을 보증한다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d10_contract.where_we_landed',
        text: "Here's where we landed.",
        meaning_ko: '이렇게 정리됐습니다.',
        note: '"Land" = end up after a discussion. "Where did we land on the price?"',
        note_ko: 'land는 논의 끝에 이른 결론을 뜻합니다. "Where did we land on the price?"처럼 묻습니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'pr_d10_signoff',
    title: "Getting Maya's sign-off on the price",
    title_ko: '마야에게 가격 승인 받기',
    place: 'office_manager',
    npc: 'maya',
    day_from: 10,
    day_to: 10,
    time_from: '12:50',
    time_to: '18:00',
    requires: 'pr_d10_contract',
    summary: 'Greg asked for one sixty-five. Give Maya the short version, make a recommendation, explain why, and agree on the ceiling.',
    summary_ko: '그렉이 16만 5천을 요구했습니다. 마야에게 요점만 보고하고, 의견을 제안하고, 이유를 설명하고, 양보의 상한선을 정하세요.',
    sort: 20,
    tags: 'meeting,manager,negotiation,approval',
    calendar: { day: 10, time: '14:00', title: 'Pricing sign-off with Maya', title_ko: '마야에게 가격 승인 받기' },
    turns: [
      {
        speaker: 'maya',
        situation: "Maya's office. She has a jacket over her shoulders and the proposal on her screen.",
        situation_ko: '마야의 사무실입니다. 마야는 어깨에 재킷을 걸치고 화면에 제안서를 띄워 놓았습니다.',
        line: "Come on in. How'd the call with Greg go?",
        line_ko: '들어와요. 그렉하고 통화는 어떻게 됐어요?',
        prompt: 'Lead with the bottom line: what Greg asked for, and where you left the price.',
        prompt_ko: '결론부터 말하세요. 그렉이 무엇을 요구했고, 가격은 어디에 두고 왔는지요.',
        model: 'Short version: he wants one sixty-five, and I held the line at one eighty.',
        model_ko: '짧게 말하면, 그렉은 16만 5천을 원하고, 저는 18만에서 물러서지 않았어요.',
        distractors: [
          {
            text: "Quick summary: he wants one fifty, and I didn't budge from one eighty.",
            text_ko: '간단히 말하면, 그렉은 15만을 원하고, 저는 18만에서 꿈쩍 안 했어요.',
            reaction: "One fifty? I heard he'd moved up from there. Which is it?",
            reaction_ko: '15만이요? 거기서 올라왔다고 들었는데요. 어느 쪽이에요?'
          },
          {
            text: 'Good news: he wants one sixty-five, and I told him that should be fine.',
            text_ko: '좋은 소식이에요. 그렉은 16만 5천을 원하는데, 그 정도면 괜찮다고 했어요.',
            reaction: 'You told him that? Priya, you know discounts go through me.',
            reaction_ko: '그렇게 말했어요? 프리야, 할인은 나를 거쳐야 하는 거 알잖아요.'
          },
          {
            text: 'Well, it started with the numbers, then we got into payment terms, and then uptime...',
            text_ko: '음, 처음엔 숫자 얘기로 시작해서, 그다음엔 지급 조건으로 넘어갔고, 그다음엔 가동률…',
            reaction: "Let's skip the play-by-play. What's the bottom line?",
            reaction_ko: '하나하나 중계는 건너뛰죠. 결론이 뭐예요?'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Good. That's about eight percent off. What do you recommend?",
        reply_ko: '잘했어요. 8퍼센트쯤 깎아 달라는 거네요. 어떻게 하면 좋겠어요?'
      },
      {
        speaker: 'maya',
        situation: 'You thought about this over lunch.',
        situation_ko: '점심을 먹으면서 생각해 둔 것이 있습니다.',
        line: 'I want your recommendation, not just the problem.',
        line_ko: '문제만 말고 프리야의 제안을 듣고 싶어요.',
        prompt: 'Propose 5% off, tied to a one-year support contract.',
        prompt_ko: '5퍼센트 할인을 제안하되, 1년 지원 계약을 조건으로 거세요.',
        model: 'My recommendation is five percent off, but only if they sign a one-year support contract.',
        model_ko: '제 제안은 5퍼센트 할인이에요. 다만 1년 지원 계약을 맺는 경우에만요.',
        distractors: [
          {
            text: 'My recommendation is eight percent off, as long as they sign a one-year support contract.',
            text_ko: '제 제안은 8퍼센트 할인이에요. 1년 지원 계약을 맺는다는 조건으로요.',
            reaction: "Eight? That's everything he asked for. What are we getting back?",
            reaction_ko: '8퍼센트요? 그건 그렉이 원한 걸 다 주는 거예요. 우리가 받는 건 뭐죠?'
          },
          {
            text: "Honestly, I'm not sure. What would you do? You've handled more deals like this.",
            text_ko: '솔직히 잘 모르겠어요. 마야라면 어떻게 하겠어요? 이런 거래는 더 많이 해 봤잖아요.',
            reaction: 'I asked for your recommendation, Priya. Take a position.',
            reaction_ko: '프리야의 제안을 물은 거예요. 입장을 정해 봐요.'
          },
          {
            text: 'My recommendation is five percent off, just to keep Greg happy and close it fast.',
            text_ko: '제 제안은 5퍼센트 할인이에요. 그렉 기분도 맞춰 주고 빨리 끝내자는 거죠.',
            reaction: "Five percent for nothing in return? I'm not sure about that.",
            reaction_ko: '아무것도 안 받고 5퍼센트를요? 그건 잘 모르겠네요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'So we give a little now and get a year of steady revenue. I like it.',
        reply_ko: '지금 조금 내주고 1년 동안 안정된 매출을 얻는 거네요. 마음에 들어요.'
      },
      {
        speaker: 'maya',
        situation: 'Maya likes to test an idea before she approves it.',
        situation_ko: '마야는 승인하기 전에 생각을 시험해 보기를 좋아합니다.',
        line: 'Let me push on that. Why not just give him the eight percent and close today?',
        line_ko: '한번 반박해 볼게요. 그냥 8퍼센트 주고 오늘 마무리하면 왜 안 돼요?',
        prompt: 'Defend your plan: explain what giving him everything now would mean for the phases that come later.',
        prompt_ko: '당신의 안을 지키세요. 지금 다 들어주면 이후 단계들에서 어떻게 될지 설명하세요.',
        model: "Because it would set a precedent. He'd expect a discount on every phase after this.",
        model_ko: '선례가 되니까요. 그러면 그렉은 이다음 단계마다 매번 할인을 기대할 거예요.',
        distractors: [
          {
            text: "That's fair. Eight percent and a signature today is probably better than waiting around.",
            text_ko: '일리 있네요. 오늘 8퍼센트 주고 서명받는 게 기다리는 것보다 낫겠어요.',
            reaction: "You're giving in that fast? I was testing you, Priya.",
            reaction_ko: '그렇게 금방 물러서요? 시험해 본 거예요, 프리야.'
          },
          {
            text: "Because Greg always pushes too hard, and I don't want him to think he's won.",
            text_ko: '그렉은 늘 너무 밀어붙이거든요. 자기가 이겼다고 생각하게 두고 싶지 않아요.',
            reaction: "Let's keep this about the business, not about Greg.",
            reaction_ko: '그렉 개인 말고 사업 얘기로만 하죠.'
          },
          {
            text: 'Because I already told Greg on the call that five percent is our final offer.',
            text_ko: '통화할 때 그렉한테 5퍼센트가 최종 제안이라고 이미 말해 버렸거든요.',
            reaction: "You told him that already? I haven't approved anything yet.",
            reaction_ko: '벌써 그렇게 말했어요? 난 아직 아무것도 승인 안 했는데요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Exactly what I wanted to hear. Five percent is my limit, though.',
        reply_ko: '바로 그 말을 듣고 싶었어요. 그래도 5퍼센트가 한계예요.'
      },
      {
        speaker: 'maya',
        situation: 'There is one thing you agreed to on the call without asking her.',
        situation_ko: '통화에서 마야에게 묻지 않고 합의한 것이 하나 있습니다.',
        line: 'Anything else I should know before I sign off?',
        line_ko: '승인하기 전에 내가 알아야 할 게 더 있어요?',
        prompt: "Come clean about the payment terms you agreed to on the call without her, and check that she's okay with them.",
        prompt_ko: '통화에서 마야에게 묻지 않고 정한 지급 조건을 털어놓고, 그래도 괜찮은지 확인하세요.',
        model: 'One more thing: I agreed to Net 45 in exchange for a purchase order this week. Are you comfortable with that?',
        model_ko: '하나 더 있어요. 이번 주 발주서를 받는 대신 Net 45에 합의했어요. 괜찮으시겠어요?',
        distractors: [
          {
            text: 'One more thing: I agreed to Net 60 in exchange for a purchase order this week. Is that okay with you?',
            text_ko: '하나 더 있어요. 이번 주 발주서를 받는 대신 Net 60에 합의했어요. 괜찮으시죠?',
            reaction: "Net 60 for a PO? That's giving him everything he asked for.",
            reaction_ko: '발주서 하나에 Net 60이요? 그렉이 달라는 걸 다 준 거잖아요.'
          },
          {
            text: "No, I think that covers it. The rest of the call was pretty standard stuff, so there's nothing to worry about.",
            text_ko: '아니요, 그게 다인 것 같아요. 나머지는 흔한 얘기였으니까 걱정할 건 하나도 없어요.',
            reaction: "Nothing at all? Greg didn't push on payment terms? That's not like him.",
            reaction_ko: '아무것도요? 그렉이 지급 조건을 안 밀어붙였다고요? 그 사람답지 않은데요.'
          },
          {
            text: "Also, I gave him Net 45 for a PO this week. There wasn't time to check with you, so it's done.",
            text_ko: '그리고 이번 주 발주서 받는 대신 Net 45로 해 줬어요. 물어볼 시간이 없어서 그냥 정했어요.',
            reaction: "Okay... next time, I'd appreciate being asked, not told.",
            reaction_ko: '그래요… 다음엔 통보 말고 먼저 물어봐 줬으면 좋겠어요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Very. A PO this week is worth more than fifteen days. Just don't put the discount in writing until legal reviews it.",
        reply_ko: '그럼요. 이번 주 발주서가 15일보다 값져요. 다만 법무팀이 검토하기 전에는 할인을 서면으로 남기지 마세요.'
      },
      {
        speaker: 'maya',
        situation: 'Maya picks up her pen.',
        situation_ko: '마야가 펜을 집어 듭니다.',
        line: 'So, are we clear on the limits?',
        line_ko: '그럼, 한도는 확실히 정리된 거죠?',
        prompt: "Repeat the limits back to her, and add that you'll get Jun up to speed before his flight.",
        prompt_ko: '한도를 다시 확인해 주고, 준이 비행기를 타기 전에 내용을 알려 주겠다고 덧붙이세요.',
        model: "Clear. Five percent is the ceiling, nothing goes out until legal signs off, and I'll brief Jun before he flies.",
        model_ko: '네. 5퍼센트가 상한선이고, 법무팀이 승인하기 전에는 아무것도 내보내지 않고, 준이 떠나기 전에 제가 설명해 둘게요.',
        distractors: [
          {
            text: "Clear. Eight percent is the ceiling, nothing goes out until legal signs off, and I'll brief Jun before he flies.",
            text_ko: '네. 8퍼센트가 상한선이고, 법무팀이 승인하기 전에는 아무것도 내보내지 않고, 준이 떠나기 전에 설명해 둘게요.',
            reaction: "Eight? I said five was my limit. Let's get this right.",
            reaction_ko: '8퍼센트요? 내 한계는 5라고 했잖아요. 제대로 정리하죠.'
          },
          {
            text: "Got it. Five percent is the ceiling, and I'll email Greg the discount today so Jun can just sign.",
            text_ko: '알겠어요. 5퍼센트가 상한선이고, 오늘 그렉한테 할인 내용을 메일로 보내서 준은 서명만 하면 되게 할게요.',
            reaction: 'Not today. Nothing in writing until legal has reviewed it.',
            reaction_ko: '오늘은 안 돼요. 법무팀이 검토하기 전에는 서면으로 아무것도 안 돼요.'
          },
          {
            text: 'Yes. And if Greg pushes hard, Jun can go up to eight percent to close the deal, right?',
            text_ko: '네. 그런데 그렉이 세게 나오면 준이 계약을 따내려고 8퍼센트까지 가도 되는 거죠?',
            reaction: 'No. The ceiling is the ceiling, Jun included.',
            reaction_ko: '아니요. 상한선은 상한선이에요. 준도 마찬가지고요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Perfect. You have my sign-off. Let me know if you have any questions.',
        reply_ko: '완벽해요. 승인할게요. 궁금한 게 있으면 말해 줘요.'
      }
    ],
    phrases: [
      {
        id: 'pr_d10_signoff.ceiling',
        text: 'Five percent is the ceiling.',
        meaning_ko: '5퍼센트가 상한선이에요.',
        note: 'Ceiling = the highest you may go. The lowest is "the floor".',
        note_ko: 'ceiling은 올라갈 수 있는 가장 높은 선이고, 가장 낮은 선은 the floor입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d10_signoff.comfortable_with',
        text: 'Are you comfortable with that?',
        meaning_ko: '그렇게 해도 괜찮으시겠어요?',
        note: 'Asks if someone accepts a decision. Softer than "Do you agree?"',
        note_ko: '결정을 받아들이는지 묻는 말입니다. "Do you agree?"보다 부드럽습니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d10_signoff.held_the_line',
        text: 'I held the line at one eighty.',
        meaning_ko: '18만에서 물러서지 않았어요.',
        note: '"Hold the line" = refuse to move from your position.',
        note_ko: 'hold the line은 자기 입장에서 물러서지 않는다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d10_signoff.let_me_push',
        text: 'Let me push on that.',
        meaning_ko: '그 부분을 좀 더 따져 볼게요.',
        note: 'A manager testing your idea. It is a good sign, not an attack.',
        note_ko: '매니저가 당신의 생각을 시험해 보는 말입니다. 공격이 아니라 좋은 신호입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d10_signoff.my_recommendation',
        text: 'My recommendation is five percent off.',
        meaning_ko: '제 의견은 5퍼센트 할인입니다.',
        note: 'Bring your manager a recommendation, not only a problem.',
        note_ko: '매니저에게는 문제만이 아니라 해결 의견도 함께 가져가세요.',
        category: 'meeting'
      },
      {
        id: 'pr_d10_signoff.only_if',
        text: '…, but only if they sign a one-year support contract.',
        meaning_ko: '…, 단 1년 지원 계약을 맺는 경우에만요.',
        note: '"Only if" makes the condition strict: no contract, no discount.',
        note_ko: 'only if는 조건을 엄격하게 만듭니다. 계약이 없으면 할인도 없습니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d10_signoff.set_a_precedent',
        text: 'It would set a precedent.',
        meaning_ko: '선례가 될 거예요.',
        note: 'What you do once, people will expect next time.',
        note_ko: '한 번 해 주면 다음에도 기대하게 된다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d10_signoff.short_version',
        text: 'Short version: he wants one sixty-five.',
        meaning_ko: '요점만 말하면, 그는 16만 5천을 원해요.',
        note: 'Announces a summary. The long version follows only if the listener asks.',
        note_ko: '요약을 알리는 말입니다. 자세한 이야기는 상대가 물을 때만 합니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'pr_d10_refund',
    title: 'Did the gift card fix ship?',
    title_ko: '기프트 카드 수정은 배포됐을까',
    place: 'office_desk_team',
    npc: 'derek',
    day_from: 10,
    day_to: 10,
    time_from: '13:20',
    time_to: '18:30',
    summary: 'It is Wednesday, the day you promised Greg. Check with Derek that the gift card refund fix is live, ask about the one catch, and decide what to tell the client.',
    summary_ko: '그렉에게 약속한 수요일입니다. 데릭에게 기프트 카드 환불 수정이 배포됐는지 확인하고, 한 가지 걸리는 점을 묻고, 고객에게 무엇을 알릴지 정하세요.',
    sort: 30,
    tags: 'office,release,follow-up,client',
    calendar: {
      day: 10,
      time: '15:00',
      title: 'Gift card refund fix: release check with Derek',
      title_ko: '기프트 카드 환불 수정: 데릭과 배포 확인'
    },
    turns: [
      {
        speaker: 'derek',
        situation: 'A chilly afternoon. Derek has his hood up and a fresh mug of coffee.',
        situation_ko: '쌀쌀한 오후입니다. 데릭은 후드를 뒤집어쓰고 갓 내린 커피를 들고 있습니다.',
        line: "Uh-oh. You've got that \"is it done yet\" look.",
        line_ko: '아이고. "아직이에요?" 하는 얼굴이네요.',
        prompt: "He's caught you. Own it, and ask how the gift card refund fix is coming along.",
        prompt_ko: '들켰습니다. 순순히 인정하고, 기프트 카드 환불 수정이 어떻게 되어 가는지 물어보세요.',
        model: 'Guilty. Where do we stand on the gift card refund fix?',
        model_ko: '들켰네요. 기프트 카드 환불 수정은 어디까지 됐어요?',
        distractors: [
          {
            text: "Guilty. How's the checkout page redesign coming along?",
            text_ko: '들켰네요. 결제 페이지 개편은 어떻게 되어 가요?',
            reaction: "The redesign? That's next quarter. I thought you were here about the refunds.",
            reaction_ko: '개편이요? 그건 다음 분기예요. 환불 때문에 온 줄 알았는데요.'
          },
          {
            text: "You bet. Greg's waiting, so it had better be done today.",
            text_ko: '당연하죠. 그렉이 기다리니까 오늘은 꼭 끝나 있어야 해요.',
            reaction: 'Whoa, easy. Hello to you too, Priya.',
            reaction_ko: '워워, 진정해요. 나도 반가워요, 프리야.'
          },
          {
            text: "Not at all. When's the gift card fix supposed to go out?",
            text_ko: '전혀요. 기프트 카드 수정은 언제 나갈 예정이었죠?',
            reaction: "\"Supposed to\"? Today, Priya. You're the one who promised Greg Wednesday.",
            reaction_ko: '"예정"이요? 오늘이잖아요, 프리야. 그렉한테 수요일이라고 약속한 사람이 프리야예요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "It went out at noon. It's live in production.",
        reply_ko: '정오에 나갔어요. 운영 환경에 올라가 있어요.'
      },
      {
        speaker: 'derek',
        situation: 'On time. But "live" and "working" are not the same thing.',
        situation_ko: '제때 나갔습니다. 하지만 올라간 것과 잘 돌아가는 것은 다릅니다.',
        line: 'Jun wrote the tests, and I did the release.',
        line_ko: '테스트는 준이 짰고, 릴리스는 제가 했어요.',
        prompt: 'Be glad, but check whether it has actually been tried for real since it went out.',
        prompt_ko: '기뻐하되, 나간 뒤로 실제로 제대로 써 봤는지 확인하세요.',
        model: "That's great news. Has anyone tested it with a real gift card since the release?",
        model_ko: '정말 좋은 소식이네요. 릴리스한 뒤로 실제 기프트 카드로 시험해 본 사람이 있어요?',
        distractors: [
          {
            text: "That's great news. I'll email Greg right now and tell him everything's fixed for good.",
            text_ko: '정말 좋은 소식이네요. 지금 바로 그렉한테 완전히 다 고쳐졌다고 메일 보낼게요.',
            reaction: "Hold on. Before you email anyone, there's something you should know.",
            reaction_ko: '잠깐만요. 누구한테 메일 보내기 전에 알아 둘 게 있어요.'
          },
          {
            text: 'Great news. Did Jun also do the release, or was that someone else?',
            text_ko: '좋은 소식이네요. 릴리스도 준이 했어요, 아니면 다른 사람이 했어요?',
            reaction: 'Uh, I just said I did the release. You okay?',
            reaction_ko: '어, 릴리스는 제가 했다고 방금 말했는데요. 괜찮아요?'
          },
          {
            text: "Okay, but Jun's new. Are you sure his tests actually cover everything?",
            text_ko: '그래요. 그런데 준은 신입이잖아요. 그 테스트가 정말 다 잡아낼까요?',
            reaction: "Jun's tests are solid. I reviewed every one of them.",
            reaction_ko: '준의 테스트는 탄탄해요. 제가 하나하나 다 검토했어요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Jun ran three refunds an hour ago. All three went through. There's one catch, though.",
        reply_ko: '준이 한 시간 전에 환불을 세 건 해 봤어요. 세 건 다 처리됐고요. 그런데 걸리는 게 하나 있어요.'
      },
      {
        speaker: 'derek',
        situation: 'There is always a catch.',
        situation_ko: '걸리는 점은 늘 있기 마련입니다.',
        line: "Gift cards from before last March still fail. It's maybe one refund in a hundred.",
        line_ko: '작년 3월 이전에 산 기프트 카드는 아직 실패해요. 백 건에 한 건 정도요.',
        prompt: "Find out how those customers can get their money back until it's properly fixed.",
        prompt_ko: '제대로 고쳐지기 전까지 그 고객들이 어떻게 환불을 받을 수 있는지 알아보세요.',
        model: 'Is there a workaround for those in the meantime?',
        model_ko: '그동안 그런 경우에 쓸 수 있는 우회 방법이 있어요?',
        distractors: [
          {
            text: 'Is that only for cards from before last May?',
            text_ko: '그거 작년 5월 이전 카드만 그런 거예요?',
            reaction: 'March. Anything bought before last March.',
            reaction_ko: '3월이요. 작년 3월 전에 산 건 전부요.'
          },
          {
            text: 'Can you fix those too before I email Greg today?',
            text_ko: '오늘 그렉한테 메일 보내기 전에 그것도 고쳐 줄 수 있어요?',
            reaction: "Today? No way. That's a whole different code path.",
            reaction_ko: '오늘이요? 절대 안 돼요. 그건 아예 다른 코드 경로예요.'
          },
          {
            text: 'One in a hundred? Nobody will even notice that.',
            text_ko: '백 건에 한 건이요? 그건 아무도 눈치 못 챌 거예요.',
            reaction: "Somebody will. And they'll call support angry.",
            reaction_ko: '누군가는 알아챌 거예요. 그리고 화가 나서 지원팀에 전화하겠죠.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Support can refund them by hand. I'll have a real fix next sprint.",
        reply_ko: '지원팀이 손으로 환불해 줄 수 있어요. 제대로 된 수정은 다음 스프린트에 할게요.'
      },
      {
        speaker: 'derek',
        situation: 'One in a hundred. Greg might never notice. Or he might.',
        situation_ko: '백 건에 한 건. 그렉은 끝내 모를 수도 있습니다. 알게 될 수도 있고요.',
        line: "Do you want to tell Greg now, or wait until it's perfect?",
        line_ko: '그렉한테 지금 말할 거예요, 아니면 완벽해질 때까지 기다릴 거예요?',
        prompt: "You've decided to be upfront with Greg. Say when you'll tell him, and why.",
        prompt_ko: '그렉에게 솔직하게 말하기로 했습니다. 언제 말할지, 그리고 왜 그런지 말하세요.',
        model: "I'll tell him today, known issue and all. I don't want any surprises.",
        model_ko: '오늘 말할 거예요. 알려진 문제까지 전부요. 나중에 놀랄 일은 만들고 싶지 않아요.',
        distractors: [
          {
            text: "Let's wait until next sprint. I'd rather tell him once it's perfect.",
            text_ko: '다음 스프린트까지 기다리죠. 완벽해진 다음에 말하는 게 낫겠어요.',
            reaction: 'Hmm. And if he hits one of those old cards before then?',
            reaction_ko: '흠. 그 전에 그렉이 옛날 카드에 걸리면요?'
          },
          {
            text: "I'll tell him today that it's fixed. The rest can wait until next sprint.",
            text_ko: '오늘 고쳐졌다고만 말할게요. 나머지는 다음 스프린트까지 미뤄도 되잖아요.',
            reaction: "That's not the whole story, though. What if he finds out?",
            reaction_ko: '그건 반쪽짜리 이야기잖아요. 나중에 알게 되면 어쩌려고요?'
          },
          {
            text: "I'll tell him today, and make it clear the old cards are your team's problem.",
            text_ko: '오늘 말할게요. 옛날 카드 문제는 데릭네 팀 문제라고 분명히 해 둘게요.',
            reaction: "My team's problem? We're the same team, Priya.",
            reaction_ko: '우리 팀 문제요? 우리 같은 팀이에요, 프리야.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "And that's why he trusts you.",
        reply_ko: '그래서 그렉이 프리야를 믿는 거예요.'
      },
      {
        speaker: 'derek',
        situation: 'You open a new email to Greg.',
        situation_ko: '그렉에게 보낼 새 이메일을 엽니다.',
        line: 'Anything you need from me for that email?',
        line_ko: '그 이메일에 필요한 거 있어요?',
        prompt: 'Ask him for a short write-up for the release notes, and thank him for seeing the fix through.',
        prompt_ko: '릴리스 노트에 넣을 짧은 글을 부탁하고, 수정을 끝까지 해내 줘서 고맙다고 하세요.',
        model: 'Just two lines for the release notes. And thanks for getting this over the finish line.',
        model_ko: '릴리스 노트에 넣을 두 줄만요. 그리고 이거 끝까지 마무리해 줘서 고마워요.',
        distractors: [
          {
            text: 'Could you write the whole email to Greg for me? You know the details better than I do.',
            text_ko: '그렉한테 보낼 이메일을 통째로 써 줄 수 있어요? 자세한 건 데릭이 더 잘 알잖아요.',
            reaction: "Your email, your voice. I'll give you the technical bits, though.",
            reaction_ko: '프리야 이메일은 프리야 목소리로 써야죠. 기술적인 부분은 드릴게요.'
          },
          {
            text: 'Just a few lines for the release notes. And thanks for writing all those tests yourself.',
            text_ko: '릴리스 노트에 넣을 몇 줄만요. 그리고 그 테스트들을 직접 다 짜 줘서 고마워요.',
            reaction: 'Jun wrote the tests, actually. I just shipped it.',
            reaction_ko: '테스트는 사실 준이 짰어요. 저는 내보내기만 했고요.'
          },
          {
            text: "Just the release notes. Two lines, by four o'clock, please. No later than that.",
            text_ko: '릴리스 노트만요. 두 줄, 네 시까지 부탁해요. 그보다 늦으면 안 돼요.',
            reaction: "Yes, ma'am. Four o'clock sharp.",
            reaction_ko: '네, 알겠습니다. 네 시 정각에요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "No rush, right? Just kidding. You'll have them in ten minutes.",
        reply_ko: '급한 건 아니죠? 농담이에요. 10분 안에 보낼게요.'
      }
    ],
    phrases: [
      {
        id: 'pr_d10_refund.finish_line',
        text: 'Thanks for getting this over the finish line.',
        meaning_ko: '끝까지 마무리해 줘서 고마워요.',
        note: 'From racing. Thanks people for the hard last part of a job.',
        note_ko: '경주에서 온 말입니다. 일의 힘든 마지막 구간을 해낸 사람에게 고마움을 전합니다.',
        category: 'office'
      },
      {
        id: 'pr_d10_refund.in_the_meantime',
        text: 'in the meantime',
        meaning_ko: '그동안에는',
        note: 'During the time before something else happens.',
        note_ko: '다른 일이 일어나기 전까지의 시간을 가리킵니다.',
        category: 'office'
      },
      {
        id: 'pr_d10_refund.known_issue_and_all',
        text: "I'll tell him today, known issue and all.",
        meaning_ko: '알려진 문제까지 포함해서 오늘 말할게요.',
        note: 'A "known issue" is a problem you have found and written down but not fixed yet.',
        note_ko: 'known issue는 찾아내서 기록해 두었지만 아직 고치지 않은 문제입니다.',
        category: 'office'
      },
      {
        id: 'pr_d10_refund.live_in_production',
        text: "It's live in production.",
        meaning_ko: '운영 환경에 올라가 있어요.',
        note: 'Production = the real system that customers use. "Live" = turned on.',
        note_ko: 'production은 고객이 실제로 쓰는 시스템이고, live는 켜져 있다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d10_refund.one_catch',
        text: "There's one catch, though.",
        meaning_ko: '그런데 걸리는 게 하나 있어요.',
        note: 'A catch = a hidden problem in something that sounds good.',
        note_ko: 'catch는 좋아 보이는 일에 숨어 있는 문제를 말합니다.',
        category: 'office'
      },
      {
        id: 'pr_d10_refund.went_through',
        text: 'All three went through.',
        meaning_ko: '세 건 다 처리됐어요.',
        note: 'A payment, refund or order "goes through" when it is completed.',
        note_ko: '결제, 환불, 주문이 완료되면 go through했다고 합니다.',
        category: 'office'
      },
      {
        id: 'pr_d10_refund.where_do_we_stand',
        text: 'Where do we stand on the gift card fix?',
        meaning_ko: '기프트 카드 수정은 어디까지 됐어요?',
        note: 'Asks for the status of one topic. Answer with done, not done, or a date.',
        note_ko: '한 가지 일의 상태를 묻는 말입니다. 끝났는지, 아닌지, 언제 되는지로 답합니다.',
        category: 'office'
      },
      {
        id: 'pr_d10_refund.workaround',
        text: 'Is there a workaround?',
        meaning_ko: '우회할 방법이 있어요?',
        note: 'A temporary way around a problem. Not a fix.',
        note_ko: '문제를 잠시 피해 가는 방법입니다. 수정은 아닙니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'pr_d11_clause',
    title: 'A last-minute clause',
    title_ko: '막판에 끼어든 조항',
    place: 'office_meeting',
    npc: 'greg',
    day_from: 11,
    day_to: 11,
    time_from: '09:00',
    time_to: '12:30',
    summary: 'Jun is on his way to Ridgeport when Greg calls: legal wants a penalty clause. Stay calm, buy time, find the real concern, and offer something better.',
    summary_ko: '준이 리지포트로 가고 있을 때 그렉이 전화합니다. 법무팀이 위약금 조항을 넣자고 합니다. 침착하게 시간을 벌고, 진짜 걱정을 알아내고, 더 나은 안을 내놓으세요.',
    sort: 10,
    tags: 'phone,client,negotiation,contract,escalation',
    calendar: { day: 11, time: '10:00', title: 'Call with Greg: contract clause', title_ko: '그렉과 통화: 계약 조항' },
    turns: [
      {
        speaker: 'greg',
        situation: 'A clear Thursday morning. Jun is in the air. The phone in the meeting room rings.',
        situation_ko: '맑은 목요일 아침입니다. 준은 비행기 안에 있습니다. 회의실 전화가 울립니다.',
        line: "Priya, it's Greg. Sorry to spring this on you, but legal wants to add a clause before Jun gets here.",
        line_ko: '프리야, 그렉이에요. 갑자기 이런 얘기 해서 미안한데, 준이 오기 전에 법무팀이 조항을 하나 넣고 싶어 해요.',
        prompt: 'Keep your cool. Appreciate the warning, and find out what legal wants to add.',
        prompt_ko: '침착하세요. 미리 알려 준 것에 고마워하고, 법무팀이 무엇을 넣으려는지 알아보세요.',
        model: 'Thanks for telling me before the meeting. What exactly does the clause say?',
        model_ko: '회의 전에 알려 줘서 고마워요. 그 조항이 정확히 어떤 내용이에요?',
        distractors: [
          {
            text: "Seriously? The day of the meeting? That's really not how this works, Greg.",
            text_ko: '진심이에요? 회의 당일에요? 이건 정말 이렇게 하는 게 아니죠, 그렉.',
            reaction: "I know, I know. I'm not happy about it either.",
            reaction_ko: '알아요, 알아요. 저도 이게 달갑지 않아요.'
          },
          {
            text: 'No problem at all. Tell legal to add whatever they need, and Jun will sign it.',
            text_ko: '전혀 문제없어요. 법무팀이 필요한 건 다 넣으라고 하세요. 준이 서명할 거예요.',
            reaction: "Don't you want to hear what it says first?",
            reaction_ko: '무슨 내용인지 먼저 들어 봐야 하지 않아요?'
          },
          {
            text: 'Thanks for telling me. Should I ask Jun to push the meeting to next week?',
            text_ko: '알려 줘서 고마워요. 준한테 회의를 다음 주로 미루자고 할까요?',
            reaction: "Let's not go that far. Hear me out first.",
            reaction_ko: '거기까지 가진 말죠. 일단 제 얘기부터 들어 봐요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'A late-delivery penalty. Two percent of the contract for every week past November first.',
        reply_ko: '납기 지연 위약금이에요. 11월 1일을 넘기면 한 주마다 계약 금액의 2퍼센트.'
      },
      {
        speaker: 'greg',
        situation: 'Two percent of $171,000 is more than $3,400 a week. You write the number down.',
        situation_ko: '17만 1천 달러의 2퍼센트면 한 주에 3,400달러가 넘습니다. 당신은 그 숫자를 적어 둡니다.',
        line: "Legal says it's standard. Can I tell them you're fine with it?",
        line_ko: '법무팀은 이게 표준이래요. 괜찮다고 전해도 될까요?',
        prompt: "Don't answer yet. Repeat the terms back to check them, including whether there's a limit on the total.",
        prompt_ko: '아직 답하지 마세요. 조건을 되짚어 확인하고, 총액에 한도가 있는지도 확인하세요.',
        model: 'Let me make sure I have this right: two percent a week, with no cap?',
        model_ko: '제가 제대로 이해했는지 확인할게요. 한 주에 2퍼센트이고, 상한은 없는 거죠?',
        distractors: [
          {
            text: 'Just to be clear: two percent a month, with a cap at ten percent?',
            text_ko: '확실히 해 두자면, 한 달에 2퍼센트이고 상한은 10퍼센트인 거죠?',
            reaction: "A week, not a month. And no, there's no cap.",
            reaction_ko: '한 달이 아니라 한 주요. 그리고 아니요, 상한은 없어요.'
          },
          {
            text: "If legal says it's standard, then sure, you can tell them we're fine.",
            text_ko: '법무팀이 표준이라고 하면, 그래요, 우리는 괜찮다고 전하세요.',
            reaction: 'Really? Just like that? I expected more of a fight.',
            reaction_ko: '정말요? 그렇게 쉽게요? 좀 더 버틸 줄 알았는데요.'
          },
          {
            text: "So that's two percent of the contract for every day past November first?",
            text_ko: '그러니까 11월 1일을 넘기면 하루마다 계약 금액의 2퍼센트라는 거죠?',
            reaction: 'Every week, not every day. Still, I know it adds up.',
            reaction_ko: '하루가 아니라 한 주마다요. 그래도 쌓이면 크다는 건 알아요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'No cap. I know how that sounds.',
        reply_ko: '상한은 없어요. 어떻게 들릴지 저도 압니다.'
      },
      {
        speaker: 'greg',
        situation: 'He wants an answer now. You do not have to give one.',
        situation_ko: '그렉은 지금 답을 원합니다. 하지만 지금 답할 필요는 없습니다.',
        line: 'I need an answer before Jun walks in at two. Yes or no?',
        line_ko: '두 시에 준이 들어오기 전에 답이 필요해요. 예스예요, 노예요?',
        prompt: "Don't let him rush you. Ask for an hour, and promise him an answer.",
        prompt_ko: '재촉에 넘어가지 마세요. 한 시간만 달라고 하고, 답을 주겠다고 약속하세요.',
        model: "I can't agree to that on the spot. Give me an hour, and I'll call you back with an answer.",
        model_ko: '이 자리에서 바로 동의할 수는 없어요. 한 시간만 주세요. 답을 갖고 다시 전화할게요.',
        distractors: [
          {
            text: "Fine, yes. We'll hit November first anyway, so the penalty shouldn't matter.",
            text_ko: '좋아요, 예스예요. 어차피 11월 1일은 맞출 거니까 위약금은 상관없을 거예요.',
            reaction: "Good. I'll let legal know right away.",
            reaction_ko: '좋아요. 법무팀에 바로 알릴게요.'
          },
          {
            text: 'No. And honestly, springing this on us today is not a great look for your side.',
            text_ko: '노예요. 그리고 솔직히 오늘 이걸 갑자기 들이미는 건 그쪽 모양새가 좋지 않아요.',
            reaction: "Wow. Okay. I'm just the messenger here, Priya.",
            reaction_ko: '와. 알겠어요. 저는 말을 전하는 것뿐이에요, 프리야.'
          },
          {
            text: "I can't agree to that right now. Give me until tomorrow morning, and I'll get back to you then.",
            text_ko: '지금 당장은 동의할 수 없어요. 내일 아침까지 시간을 주시면 그때 다시 연락드릴게요.',
            reaction: 'Tomorrow? Jun walks in at two today.',
            reaction_ko: '내일이요? 준은 오늘 두 시에 들어와요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "An hour. Fine. But I'm telling you, the board won't sign without something.",
        reply_ko: '한 시간. 좋아요. 그래도 말해 두는데, 이사회는 뭐라도 없으면 서명하지 않을 겁니다.'
      },
      {
        speaker: 'greg',
        situation: '"Without something." So the penalty itself may not be the point.',
        situation_ko: '"뭐라도 없으면." 그렇다면 위약금 자체가 핵심은 아닐지도 모릅니다.',
        line: 'They were very clear about that.',
        line_ko: '그 부분은 아주 분명하게 말하더라고요.',
        prompt: 'The penalty may not be what they really care about. Find out what is.',
        prompt_ko: '그들이 정말 신경 쓰는 건 위약금이 아닐 수도 있습니다. 진짜 걱정이 무엇인지 알아내세요.',
        model: "Help me understand. What's the concern behind the clause?",
        model_ko: '제가 이해할 수 있게 도와주세요. 그 조항 뒤에 있는 걱정이 뭐예요?',
        distractors: [
          {
            text: 'Would legal take one percent a week instead of two, then?',
            text_ko: '그럼 법무팀이 한 주에 2퍼센트 말고 1퍼센트면 받아 줄까요?',
            reaction: "Maybe. But I don't think the number is really the point for them.",
            reaction_ko: '그럴 수도 있죠. 그런데 그들한테 숫자가 핵심인 것 같진 않아요.'
          },
          {
            text: "Then they'll have to be clear about it without our signature.",
            text_ko: '그렇다면 우리 서명 없이 분명하게 하셔야겠네요, 그렉.',
            reaction: 'Come on, Priya. Nobody wants this deal to fall apart.',
            reaction_ko: '왜 이래요, 프리야. 이 계약이 깨지길 바라는 사람은 없어요.'
          },
          {
            text: 'Is this because our team missed a date with you?',
            text_ko: '혹시 우리 팀이 날짜를 못 지킨 적이 있어서인가요?',
            reaction: "No, no. Your team's been great. This isn't about you.",
            reaction_ko: '아니, 아니요. 그쪽 팀은 훌륭했어요. 그쪽 때문이 아니에요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'They got burned by a vendor last year. Six months late, and nobody said a word until the last week.',
        reply_ko: '작년에 어떤 업체한테 크게 데었어요. 6개월이나 늦었는데, 마지막 주까지 아무도 말을 안 해 줬죠.'
      },
      {
        speaker: 'greg',
        situation: 'So it is about surprises, not about money.',
        situation_ko: '그렇다면 문제는 돈이 아니라 뒤늦게 알게 되는 일입니다.',
        line: "They don't want to be surprised again.",
        line_ko: '다시는 뒤통수 맞고 싶지 않은 거죠.',
        prompt: 'Offer something in place of the penalty that answers their real fear: updates every week, and a written warning the moment a deadline looks shaky.',
        prompt_ko: '위약금 대신 그들의 진짜 걱정을 풀어 줄 안을 내놓으세요. 매주 진행 상황을 알리고, 기한이 흔들리는 순간 서면으로 알리는 것이요.',
        model: 'What if we offered a weekly status report, and written notice as soon as any date is at risk, in place of a penalty?',
        model_ko: '위약금 대신 주간 현황 보고를 드리고, 어떤 날짜든 위험해지는 즉시 서면으로 알려 드리면 어떨까요?',
        distractors: [
          {
            text: 'What if we kept the penalty in, but capped it at five percent of the whole contract and only started it two weeks late?',
            text_ko: '위약금은 그대로 두되, 계약 금액의 5퍼센트로 상한을 두고 2주 늦은 시점부터 적용하면 어떨까요?',
            reaction: "A cap helps, but it's still a penalty. That's not really what they're after.",
            reaction_ko: '상한이 있으면 낫긴 하지만, 그래도 위약금이잖아요. 그들이 원하는 건 그게 아니에요.'
          },
          {
            text: 'What if we sent a monthly status report, and told you about any risks at the end of each quarter?',
            text_ko: '월간 현황 보고를 보내 드리고, 위험 요소는 분기가 끝날 때마다 알려 드리면 어떨까요?',
            reaction: "Once a quarter? That's how they got burned last time.",
            reaction_ko: '분기에 한 번이요? 지난번에 그렇게 당한 거예요.'
          },
          {
            text: "Honestly, we've never missed a date with you, so tell them there's nothing to worry about. Trust us.",
            text_ko: '솔직히 우리는 날짜를 어긴 적이 한 번도 없잖아요. 걱정할 것 없다고 전해 주세요. 믿으셔도 돼요.',
            reaction: "That's what the last vendor said, too. \"Trust us\" won't fly with the board.",
            reaction_ko: '지난 업체도 그렇게 말했어요. "믿어 달라"는 이사회에서 안 통해요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'No surprises in place of penalties… I could take that to legal. Can you put it in an email?',
        reply_ko: '위약금 대신 놀랄 일을 없앤다… 그거라면 법무팀에 가져가 볼 수 있겠어요. 이메일로 보내 줄 수 있어요?'
      },
      {
        speaker: 'greg',
        situation: 'Maya said it yesterday: nothing in writing until she and legal have seen it.',
        situation_ko: '어제 마야가 말했습니다. 마야와 법무팀이 보기 전에는 아무것도 서면으로 남기지 말라고요.',
        line: 'Five lines would do.',
        line_ko: '다섯 줄이면 돼요.',
        prompt: "Don't send anything yet. Tell him what has to happen on your side first, and when he'll get it.",
        prompt_ko: '아직 아무것도 보내지 마세요. 이쪽에서 먼저 거쳐야 할 단계와, 언제 받게 될지를 말하세요.',
        model: "Let me loop in Maya first. You'll have it in writing as soon as she signs off.",
        model_ko: '먼저 마야에게 알릴게요. 마야가 승인하는 대로 서면으로 보내 드릴게요.',
        distractors: [
          {
            text: "Sure, I'll write it up now and send it over in the next ten minutes.",
            text_ko: '그럼요, 지금 바로 써서 10분 안에 보내 드릴게요.',
            reaction: "Ten minutes? Great. That's faster than I expected.",
            reaction_ko: '10분이요? 좋네요. 생각보다 빠르네요.'
          },
          {
            text: "Let me run it by Derek first. You'll have it in writing once he's okay with it.",
            text_ko: '먼저 데릭에게 확인받을게요. 데릭이 괜찮다고 하면 서면으로 보내 드릴게요.',
            reaction: 'Derek? I thought Maya made the calls on contract terms.',
            reaction_ko: '데릭이요? 계약 조건은 마야가 결정하는 줄 알았는데요.'
          },
          {
            text: "I can't put anything in writing. You'll have to take my word for it, Greg.",
            text_ko: '서면으로는 아무것도 못 드려요. 제 말을 믿으셔야 해요, 그렉.',
            reaction: "My word won't get past legal. They need something on paper.",
            reaction_ko: '제 말로는 법무팀을 못 넘어요. 종이로 된 게 필요해요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Fair enough. And Priya? Thanks for not just saying no.',
        reply_ko: '그러죠. 그리고 프리야, 그냥 안 된다고만 하지 않아서 고마워요.'
      }
    ],
    phrases: [
      {
        id: 'pr_d11_clause.give_me_an_hour',
        text: "Give me an hour, and I'll call you back with an answer.",
        meaning_ko: '한 시간만 주세요. 답을 가지고 다시 전화할게요.',
        note: 'Buying time works when you name the time and keep it.',
        note_ko: '시간을 벌려면 기한을 말하고 그 기한을 지켜야 합니다.',
        category: 'office'
      },
      {
        id: 'pr_d11_clause.got_burned',
        text: 'They got burned by a vendor last year.',
        meaning_ko: '작년에 어떤 업체한테 크게 데었어요.',
        note: '"Get burned" = be hurt by trusting someone. A vendor is a company that sells you a service.',
        note_ko: 'get burned는 믿었다가 손해를 본다는 뜻입니다. vendor는 서비스를 파는 업체입니다.',
        category: 'office'
      },
      {
        id: 'pr_d11_clause.have_this_right',
        text: 'Let me make sure I have this right.',
        meaning_ko: '제가 제대로 이해했는지 확인할게요.',
        note: 'Slows the talk down and shows you are listening, not fighting.',
        note_ko: '대화의 속도를 늦추고, 맞서는 것이 아니라 듣고 있음을 보여 줍니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d11_clause.help_me_understand',
        text: 'Help me understand.',
        meaning_ko: '제가 이해할 수 있게 설명해 주세요.',
        note: 'Asks for the reason without sounding like an attack. Softer than "Why?"',
        note_ko: '따지는 느낌 없이 이유를 묻는 말입니다. "Why?"보다 부드럽습니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d11_clause.no_cap',
        text: 'two percent a week, with no cap',
        meaning_ko: '상한 없이 한 주에 2퍼센트',
        note: 'A cap is an upper limit on an amount. "Capped at ten percent" = never more than ten.',
        note_ko: 'cap은 금액의 상한선입니다. capped at ten percent는 10퍼센트를 넘지 않는다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d11_clause.on_the_spot',
        text: "I can't agree to that on the spot.",
        meaning_ko: '이 자리에서 바로 동의할 수는 없어요.',
        note: '"On the spot" = right now, without time to think.',
        note_ko: 'on the spot은 생각할 시간 없이 지금 당장이라는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d11_clause.spring_this_on_you',
        text: 'Sorry to spring this on you.',
        meaning_ko: '갑자기 이런 얘기를 꺼내서 미안해요.',
        note: '"Spring something on someone" = surprise them with it at the last minute.',
        note_ko: 'spring something on someone은 막판에 갑자기 꺼내 놀라게 한다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d11_clause.take_that_to_legal',
        text: 'I could take that to legal.',
        meaning_ko: '그거라면 법무팀에 가져가 볼 수 있겠어요.',
        note: '"Legal" = the legal department. "Take it to" = present it for approval.',
        note_ko: 'legal은 법무팀입니다. take it to는 승인을 받으러 가져간다는 뜻입니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'pr_d11_jun',
    title: 'Coaching Jun before the client visit',
    title_ko: '고객 방문 전에 준에게 조언하기',
    place: 'office_desk_priya',
    npc: 'jun',
    day_from: 11,
    day_to: 11,
    time_from: '12:00',
    time_to: '14:00',
    summary: "Jun calls from his hotel in Ridgeport before his two o'clock meeting with Greg. Calm his nerves and tell him what to say and what not to promise.",
    summary_ko: '준이 그렉과의 두 시 회의를 앞두고 리지포트의 호텔에서 전화합니다. 긴장을 풀어 주고, 무엇을 말하고 무엇을 약속하지 말아야 하는지 알려 주세요.',
    sort: 20,
    tags: 'phone,coaching,client,contract',
    calendar: { day: 11, time: '13:00', title: 'Check-in call with Jun before the client visit', title_ko: '고객 방문 전 준과 점검 통화' },
    turns: [
      {
        speaker: 'jun',
        situation: 'Your phone buzzes on your desk. It is Jun, calling from the Pinecrest Hotel in Ridgeport.',
        situation_ko: '책상 위에서 휴대전화가 울립니다. 리지포트의 파인크레스트 호텔에서 준이 건 전화입니다.',
        line: "Hi, Priya. I just checked in. The meeting with Greg is at two, and honestly, I'm a little nervous.",
        line_ko: '안녕하세요, 프리야. 방금 체크인했어요. 그렉하고 회의는 두 시인데, 솔직히 좀 긴장돼요.',
        prompt: 'Reassure him, and remind him how well he knows this project.',
        prompt_ko: '안심시켜 주세요. 그가 이 프로젝트를 얼마나 잘 아는지 일깨워 주세요.',
        model: "That's completely normal. You know this project better than anyone in that room.",
        model_ko: '그건 아주 당연해요. 그 회의실에서 이 프로젝트를 준보다 잘 아는 사람은 없어요.',
        distractors: [
          {
            text: "Don't be nervous. It's just a meeting, so try not to overthink it, okay?",
            text_ko: '긴장하지 마요. 그냥 회의일 뿐이니까 너무 깊이 생각하지 말고요, 알았죠?',
            reaction: "I know. It's just... easier said than done.",
            reaction_ko: '알아요. 그냥… 말처럼 쉽지가 않네요.'
          },
          {
            text: "You should be a little nervous. This deal is the biggest one we've had all year.",
            text_ko: '좀 긴장하는 게 맞아요. 이번 계약이 올해 우리가 한 것 중에 제일 크거든요.',
            reaction: "Wow. That's not making me feel any better, Priya.",
            reaction_ko: '와. 그 말 들으니까 더 떨리는데요, 프리야.'
          },
          {
            text: "That's normal. Just remember the meeting with Greg is at three, so you have time.",
            text_ko: '당연해요. 그렉하고 회의는 세 시니까, 시간은 충분하다는 것만 기억해요.',
            reaction: 'Three? My calendar says two. Did it move?',
            reaction_ko: '세 시요? 제 일정엔 두 시로 되어 있는데요. 바뀌었어요?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Thanks. I needed that.',
        reply_ko: '고마워요. 그 말이 필요했어요.'
      },
      {
        speaker: 'jun',
        situation: 'You hear him turn a page in his notebook.',
        situation_ko: '준이 공책을 넘기는 소리가 들립니다.',
        line: 'So what should I focus on?',
        line_ko: '그럼 저는 뭐에 집중하면 돼요?',
        prompt: "Tell him to keep to the terms you've already agreed on, and go through them.",
        prompt_ko: '이미 합의한 조건에서 벗어나지 말라고 하고, 하나씩 짚어 주세요.',
        model: 'Stick to what we agreed on: Net 45, five percent with the support contract, and 99.9 percent uptime.',
        model_ko: '우리가 합의한 것만 지켜요. Net 45, 지원 계약을 조건으로 5퍼센트, 그리고 가동률 99.9퍼센트요.',
        distractors: [
          {
            text: 'Keep to the plan we agreed on: Net 45, eight percent with the support contract, and 99.9 percent uptime.',
            text_ko: '합의한 계획대로만 해요. Net 45, 지원 계약을 조건으로 8퍼센트, 그리고 가동률 99.9퍼센트요.',
            reaction: 'Eight? I thought Maya said five was the limit.',
            reaction_ko: '8퍼센트요? 마야는 5가 한도라고 한 줄 알았는데요.'
          },
          {
            text: 'Focus on the basics: Net 30, five percent off no matter what, and a hundred percent uptime.',
            text_ko: '기본만 챙겨요. Net 30, 무슨 일이 있어도 5퍼센트 할인, 그리고 가동률 100퍼센트요.',
            reaction: "Net 30? And a hundred percent? That's not what's in my notes.",
            reaction_ko: 'Net 30이요? 그리고 100퍼센트요? 제 메모랑 다른데요.'
          },
          {
            text: 'Focus on the tech. Leave the business side to Greg, and agree to whatever he proposes.',
            text_ko: '기술 쪽에만 집중해요. 사업 얘기는 그렉한테 맡기고, 그쪽이 뭘 제안하든 동의하고요.',
            reaction: "Agree to anything? That doesn't sound right.",
            reaction_ko: '뭐든 동의하라고요? 그건 좀 아닌 것 같은데요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Net 45, five percent, 99.9. They're on the first page of my notes.",
        reply_ko: 'Net 45, 5퍼센트, 99.9. 메모 첫 장에 적어 뒀어요.'
      },
      {
        speaker: 'jun',
        situation: 'Greg likes to ask for one more thing at the end of a meeting.',
        situation_ko: '그렉은 회의가 끝날 때쯤 하나만 더 하며 부탁하기를 좋아합니다.',
        line: 'What if he asks for something new? A bigger discount, or another feature?',
        line_ko: '그렉이 새로운 걸 요구하면요? 할인을 더 해 달라거나, 기능을 하나 더 넣어 달라거나요.',
        prompt: 'Tell him not to commit to anything new on the spot, and give him a line he can use to buy time.',
        prompt_ko: '새로운 건 그 자리에서 약속하지 말라고 하고, 시간을 벌 수 있는 한마디를 알려 주세요.',
        model: "Don't promise anything in the room. Just say, \"Let me take that back to the team.\"",
        model_ko: '그 자리에서는 아무것도 약속하지 마요. 그냥 "Let me take that back to the team."이라고 하면 돼요.',
        distractors: [
          {
            text: "If it's something small, just say yes. We want Greg happy, and we can figure it out later.",
            text_ko: '사소한 거면 그냥 예스라고 해요. 그렉이 만족해야 하니까, 나머지는 나중에 해결하면 돼요.',
            reaction: "Really? Even a new feature? Derek's team is already stretched.",
            reaction_ko: '정말요? 새 기능도요? 데릭 팀은 이미 빠듯한데요.'
          },
          {
            text: "Just say no to anything new. Tell him, \"That's not in the contract, period.\"",
            text_ko: '새로운 건 전부 거절해요. 그렉한테 "계약서에 없는 건 안 됩니다. 이상입니다."라고 딱 잘라 말하고요.',
            reaction: "Isn't that a little harsh? Greg's the client.",
            reaction_ko: '그건 좀 심하지 않아요? 그렉은 고객이잖아요.'
          },
          {
            text: 'You can go up to eight percent if you need to. Anything more, just say no.',
            text_ko: '필요하면 할인은 8퍼센트까지는 가도 괜찮아요. 그 이상을 요구하면 그냥 안 된다고 하고요.',
            reaction: 'Eight? Maya said five percent was the ceiling.',
            reaction_ko: '8이요? 마야는 5퍼센트가 상한선이라고 했어요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: '"Let me take that back to the team." Okay. That buys me time.',
        reply_ko: '"Let me take that back to the team." 알겠어요. 그러면 시간을 벌 수 있겠네요.'
      },
      {
        speaker: 'jun',
        situation: 'You read the contract draft last night. One line jumped out at you.',
        situation_ko: '어젯밤에 계약서 초안을 읽었습니다. 한 줄이 눈에 걸렸습니다.',
        line: 'Is there anything I should watch out for in the draft?',
        line_ko: '초안에서 조심해야 할 부분이 있어요?',
        prompt: "Point him to the line that bothered you: the draft gives only seven days' notice to cancel, and you want thirty.",
        prompt_ko: '마음에 걸린 줄을 짚어 주세요. 초안에는 해지 통보가 7일 전으로 되어 있는데, 30일은 필요합니다.',
        model: 'Yes. Push back on the seven-day cancellation notice. We need thirty days.',
        model_ko: '네. 7일 전 해지 통보 조항은 받아들이지 말고 반박해요. 30일은 필요해요.',
        distractors: [
          {
            text: 'Yes, the cancellation notice. It says thirty days, and we need at least ninety.',
            text_ko: '네, 해지 통보요. 30일로 되어 있는데, 우리는 최소 90일이 필요해요.',
            reaction: 'Thirty? My copy says seven days. Are we looking at the same draft?',
            reaction_ko: '30일이요? 제 사본엔 7일로 되어 있는데요. 같은 초안 보고 있는 거 맞아요?'
          },
          {
            text: 'Not really. Legal already went through it, so you can just sign where they tell you.',
            text_ko: '딱히 없어요. 법무팀이 이미 다 봤으니까, 하라는 곳에 서명만 하면 돼요.',
            reaction: 'Sign? I thought Maya was signing, not me.',
            reaction_ko: '서명이요? 서명은 제가 아니라 마야가 하는 줄 알았는데요.'
          },
          {
            text: "Yes. Watch the uptime section. They want a hundred percent, and we can't do that.",
            text_ko: '네. 가동률 부분을 조심해요. 100퍼센트를 원하는데, 우린 그건 못 해요.',
            reaction: "Uptime? I thought we'd already settled on 99.9 with Greg.",
            reaction_ko: '가동률이요? 그건 그렉하고 99.9로 이미 정리된 줄 알았는데요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Seven days is too short. Ask for thirty. Got it.',
        reply_ko: '7일은 너무 짧다. 30일을 요청한다. 알겠습니다.'
      },
      {
        speaker: 'jun',
        situation: 'It is almost one thirty. Jun has to leave for Summit Retail soon.',
        situation_ko: '한 시 반이 다 되어 갑니다. 준은 곧 서밋 리테일로 출발해야 합니다.',
        line: 'And what if I get stuck?',
        line_ko: '그리고 제가 막히면요?',
        prompt: 'Tell him he can always reach you, and send him off with some confidence.',
        prompt_ko: '언제든 연락할 수 있다고 하고, 자신감을 실어 보내 주세요.',
        model: "Then step out and call me. I'm only a phone call away. You've got this.",
        model_ko: '그럼 잠깐 나와서 나한테 전화해요. 전화 한 통이면 닿아요. 잘할 거예요.',
        distractors: [
          {
            text: "Then just do your best. I'm in meetings all afternoon, so I can't pick up.",
            text_ko: '그럼 그냥 최선을 다해요. 나는 오후 내내 회의라서 전화를 못 받아요.',
            reaction: "Oh. Okay. I guess I'm on my own, then.",
            reaction_ko: '아. 네. 그럼 저 혼자 해야겠네요.'
          },
          {
            text: "Then just agree with Greg. We can always fix it later. You'll be fine.",
            text_ko: '그럼 그냥 그렉 말에 동의해요. 나중에 언제든 고치면 돼요. 괜찮을 거예요.',
            reaction: 'Agree with him? You just told me not to promise anything.',
            reaction_ko: '동의하라고요? 방금 아무것도 약속하지 말라고 했잖아요.'
          },
          {
            text: "Then let Greg do the talking. Honestly, you're new, so nobody expects much.",
            text_ko: '그럼 그렉이 말하게 둬요. 솔직히 준은 신입이라 다들 기대도 별로 안 해요.',
            reaction: 'Ouch. Thanks, I guess.',
            reaction_ko: '아야. 뭐, 고마워요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Thanks, Priya. I'll text you when it's over.",
        reply_ko: '고마워요, 프리야. 끝나면 문자 드릴게요.'
      }
    ],
    phrases: [
      {
        id: 'pr_d11_jun.better_than_anyone',
        text: 'You know this project better than anyone in that room.',
        meaning_ko: '그 회의실의 누구보다 당신이 이 프로젝트를 잘 알아요.',
        note: "Confidence comes from a fact, not from \"Don't worry.\"",
        note_ko: '자신감은 걱정 말라는 말이 아니라 사실에서 나옵니다.',
        category: 'office'
      },
      {
        id: 'pr_d11_jun.buys_me_time',
        text: 'That buys me time.',
        meaning_ko: '그러면 시간을 벌 수 있겠네요.',
        note: '"Buy time" = get more time before you must decide.',
        note_ko: 'buy time은 결정하기 전에 시간을 더 얻는다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d11_jun.completely_normal',
        text: "That's completely normal.",
        meaning_ko: '그건 아주 당연한 거예요.',
        note: 'Calms someone by telling them everybody feels the same way.',
        note_ko: '누구나 그렇게 느낀다고 말해 주어 마음을 가라앉히는 말입니다.',
        category: 'office'
      },
      {
        id: 'pr_d11_jun.in_the_room',
        text: "Don't promise anything in the room.",
        meaning_ko: '그 자리에서는 아무것도 약속하지 마세요.',
        note: '"In the room" = during the meeting, face to face, where the pressure is.',
        note_ko: 'in the room은 얼굴을 맞대고 압박을 받는 회의 자리를 말합니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d11_jun.phone_call_away',
        text: "I'm only a phone call away.",
        meaning_ko: '전화 한 통이면 닿아요.',
        note: "Tells someone that help is near. Then: \"You've got this\" = you can do it.",
        note_ko: "도움이 가까이 있다는 말입니다. 이어지는 \"You've got this\"는 당신은 할 수 있다는 뜻입니다.",
        category: 'office'
      },
      {
        id: 'pr_d11_jun.stick_to_agreed',
        text: 'Stick to what we agreed on.',
        meaning_ko: '합의한 내용에서 벗어나지 마세요.',
        note: '"Stick to" a plan, a budget, the facts = stay with it.',
        note_ko: '계획, 예산, 사실에 stick to한다는 것은 거기서 벗어나지 않는다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d11_jun.take_that_back',
        text: 'Let me take that back to the team.',
        meaning_ko: '그건 팀에 가져가서 상의해 볼게요.',
        note: 'A safe answer to any new request. It is neither yes nor no.',
        note_ko: '새로운 요청에는 언제나 안전한 답입니다. 예도 아니요도 아닙니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d11_jun.watch_out_for',
        text: 'Is there anything I should watch out for?',
        meaning_ko: '조심해야 할 게 있을까요?',
        note: '"Watch out for" = be careful about. A good question before any meeting.',
        note_ko: 'watch out for는 조심한다는 뜻입니다. 어떤 회의 전에든 좋은 질문입니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'pr_d12_signed',
    title: "It's official: the contract is signed",
    title_ko: '공식 확정: 계약 체결',
    place: 'office_desk_priya',
    npc: 'jun',
    day_from: 12,
    day_to: 12,
    time_from: '10:00',
    time_to: '14:00',
    summary: 'Jun calls from Ridgeport: the contract is signed. Congratulate him, ask how he handled the hard part, and make sure he takes the credit.',
    summary_ko: '준이 리지포트에서 전화합니다. 계약서에 서명이 끝났습니다. 축하하고, 어려운 대목을 어떻게 풀었는지 묻고, 준이 자기 공을 인정하게 해 주세요.',
    sort: 10,
    tags: 'phone,praise,client,contract',
    calendar: { day: 12, time: '10:30', title: 'Contract signing: call from Jun', title_ko: '계약 서명: 준의 전화' },
    turns: [
      {
        speaker: 'jun',
        situation: 'Friday morning, partly sunny. Maya signed from her office a few minutes ago. Your phone rings.',
        situation_ko: '구름 사이로 해가 나는 금요일 아침입니다. 몇 분 전에 마야가 사무실에서 서명했습니다. 휴대전화가 울립니다.',
        line: "Priya! It's signed. Greg signed right after Maya. It's official!",
        line_ko: '프리야! 서명했어요. 마야 다음에 그렉이 바로 서명했어요. 공식적으로 끝났어요!',
        prompt: 'Celebrate with him, and make it clear this win is his.',
        prompt_ko: '함께 기뻐하고, 이번 성과는 준의 것이라고 분명히 말해 주세요.',
        model: "That's fantastic news! Congratulations, Jun. You pulled it off.",
        model_ko: '정말 멋진 소식이에요! 축하해요, 준. 해냈네요.',
        distractors: [
          {
            text: "That's great news! I knew my prep notes would get us over the line.",
            text_ko: '좋은 소식이네요! 내 준비 메모가 결국 통할 줄 알았어요.',
            reaction: 'Uh, yeah. Your notes helped a lot.',
            reaction_ko: '어, 네. 메모가 많이 도움이 됐어요.'
          },
          {
            text: 'Good. Send me the signed copy and your notes by end of day.',
            text_ko: '좋아요. 서명본이랑 메모는 오늘 퇴근 전까지 보내 줘요.',
            reaction: "Oh. Sure, I'll send it over.",
            reaction_ko: '아. 네, 보내 드릴게요.'
          },
          {
            text: 'Fantastic news! So Maya still has to sign it this afternoon?',
            text_ko: '멋진 소식이에요! 그럼 마야는 오늘 오후에 서명하면 되는 거죠?',
            reaction: "No, she signed first. It's done, Priya!",
            reaction_ko: '아니요, 마야가 먼저 했어요. 다 끝났다니까요, 프리야!'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "I can't believe it. My hands are still shaking. I almost froze when he asked about the cancellation clause.",
        reply_ko: '믿기지 않아요. 아직도 손이 떨려요. 해지 조항을 물었을 때는 얼어붙을 뻔했어요.'
      },
      {
        speaker: 'jun',
        situation: '"Almost" is the important word.',
        situation_ko: '중요한 말은 "뻔했다"입니다.',
        line: 'For a second, my mind went blank.',
        line_ko: '잠깐 머릿속이 하얘졌어요.',
        prompt: 'Point out that he got through it anyway, and ask what he did.',
        prompt_ko: '그래도 결국 버텨 냈다는 걸 짚어 주고, 어떻게 했는지 물어보세요.',
        model: "But you didn't freeze. How did you handle it?",
        model_ko: '그래도 얼어붙지 않았잖아요. 어떻게 넘겼어요?',
        distractors: [
          {
            text: 'Was it the uptime question? What did you say?',
            text_ko: '가동률 질문 때문이었어요? 뭐라고 했어요?',
            reaction: 'No, the cancellation clause. Uptime was easy.',
            reaction_ko: '아니요, 해지 조항이요. 가동률은 쉬웠어요.'
          },
          {
            text: "You can't freeze up in front of a client, Jun.",
            text_ko: '고객 앞에서 얼어붙으면 안 돼요, 준.',
            reaction: "I know. That's why I said \"almost.\"",
            reaction_ko: '알아요. 그래서 "뻔했다"고 한 거예요.'
          },
          {
            text: "That happens. Anyway, when's your flight home?",
            text_ko: '그럴 수 있죠. 그건 그렇고, 돌아오는 비행기는 언제예요?',
            reaction: "Oh. At three. But don't you want to hear how it went?",
            reaction_ko: '아. 세 시요. 그런데 어떻게 됐는지 안 궁금해요?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "I said seven days was too short for us and asked for thirty. He said, \"That's fair.\"",
        reply_ko: '7일은 우리에게 너무 짧다고 하고 30일을 요청했어요. 그랬더니 "타당하네요"라고 하더라고요.'
      },
      {
        speaker: 'jun',
        situation: 'He is giving the credit away. You give it back.',
        situation_ko: '준이 공을 남에게 돌리고 있습니다. 당신은 그 공을 돌려줍니다.',
        line: 'I just did what you told me.',
        line_ko: '저는 그냥 프리야가 시킨 대로 했을 뿐이에요.',
        prompt: "He's giving you the credit. Don't take it; hand it back to him.",
        prompt_ko: '준이 공을 당신에게 돌리고 있습니다. 받지 말고 준에게 돌려주세요.',
        model: 'No, you were the one in the room. Give yourself some credit.',
        model_ko: '아니에요, 그 자리에 있던 건 준이었잖아요. 자기 공도 좀 인정해요.',
        distractors: [
          {
            text: 'Well, it was good advice. Glad I could get you ready for it.',
            text_ko: '뭐, 좋은 조언이긴 했죠. 준비시켜 줄 수 있어서 다행이에요.',
            reaction: 'Yeah. Thanks for that.',
            reaction_ko: '네. 그건 고마워요.'
          },
          {
            text: "Don't thank me. Maya's the one who made this deal happen.",
            text_ko: '나한테 고마워하지 마요. 이 계약을 성사시킨 건 마야예요.',
            reaction: 'Maya did a lot, sure. But I was the one sweating in there.',
            reaction_ko: '마야가 많이 하긴 했죠. 그래도 거기서 진땀 뺀 건 저예요.'
          },
          {
            text: 'Still, you asked for sixty days on your own. That was smart.',
            text_ko: '그래도 60일은 준이 알아서 요청했잖아요. 그건 똑똑했어요.',
            reaction: 'Thirty, actually. I stuck to the plan.',
            reaction_ko: '사실 30일이었어요. 계획대로 했어요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Okay. Maybe a little. Oh, and Greg asked who to call day to day. I said you're his main point of contact.",
        reply_ko: '네. 조금은요. 아, 그리고 그렉이 평소에 누구에게 연락하면 되는지 물어서, 프리야가 주 담당자라고 했어요.'
      },
      {
        speaker: 'jun',
        situation: 'Signed is not finished. The real work starts now.',
        situation_ko: '서명했다고 끝난 것이 아닙니다. 진짜 일은 이제 시작입니다.',
        line: 'I also told him about the kickoff next week and the status update every Friday. Was that okay?',
        line_ko: '다음 주 킥오프랑 매주 금요일 현황 보고 얘기도 했어요. 괜찮았죠?',
        prompt: "Confirm he handled it well, and say you'll arrange next week's kickoff with both teams.",
        prompt_ko: '잘 처리했다고 확인해 주고, 다음 주에 양쪽 팀이 함께하는 킥오프를 잡겠다고 하세요.',
        model: "That's exactly right. I'll set up the kickoff with both teams for next week.",
        model_ko: '딱 맞게 했어요. 다음 주에 양쪽 팀이 다 모이는 킥오프는 내가 잡을게요.',
        distractors: [
          {
            text: "That's exactly right. I'll set up the kickoff for the week after next.",
            text_ko: '딱 맞게 했어요. 양쪽 팀 킥오프는 다다음 주로 잡을게요.',
            reaction: 'The week after? I told Greg next week.',
            reaction_ko: '다다음 주요? 그렉한테는 다음 주라고 했는데요.'
          },
          {
            text: "You should have checked with me first. I'll decide when the kickoff happens.",
            text_ko: '먼저 나한테 확인했어야죠. 킥오프를 언제 할지는 내가 정해요.',
            reaction: 'Oh. Sorry. I thought that was the plan.',
            reaction_ko: '아. 죄송해요. 그게 계획인 줄 알았어요.'
          },
          {
            text: "Every Friday? Let's make it monthly. Weekly is too much for our team.",
            text_ko: '매주 금요일이요? 월 1회로 하죠. 매주는 우리 팀한테 너무 많아요.',
            reaction: 'But we promised weekly updates. Greg was really happy about that.',
            reaction_ko: '그래도 매주 보고하기로 약속했잖아요. 그렉이 그걸 정말 좋아했어요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Great. My flight's at three. Should I come into the office tonight?",
        reply_ko: '좋아요. 비행기는 세 시예요. 오늘 저녁에 사무실에 들를까요?'
      },
      {
        speaker: 'jun',
        situation: 'He has been up since five two days in a row.',
        situation_ko: '준은 이틀 연속 새벽 다섯 시에 일어났습니다.',
        line: 'I could write up the trip report.',
        line_ko: '출장 보고서를 써 둘 수도 있어요.',
        prompt: "He's exhausted. Turn down his offer firmly, send him home, and plan to celebrate after the weekend.",
        prompt_ko: '준은 지쳐 있습니다. 단호하게 거절하고 집으로 보내세요. 축하는 주말이 지나고 하자고 하세요.',
        model: "Absolutely not. Go straight home and get some rest. We'll celebrate on Monday.",
        model_ko: '절대 안 돼요. 곧장 집에 가서 쉬어요. 축하는 월요일에 해요.',
        distractors: [
          {
            text: "Sure, if you're up for it. Just send it to me before you leave tonight.",
            text_ko: '그래요, 할 수 있겠으면요. 오늘 밤 퇴근 전에만 보내 줘요.',
            reaction: "Okay... I'll try. I'm pretty tired, though.",
            reaction_ko: '네… 해 볼게요. 좀 피곤하긴 하지만요.'
          },
          {
            text: "Absolutely not. Go home and rest, and we'll celebrate tomorrow at the office.",
            text_ko: '절대 안 돼요. 집에 가서 쉬고, 축하는 내일 사무실에서 해요.',
            reaction: "Tomorrow's Saturday, Priya. You're working the weekend?",
            reaction_ko: '내일은 토요일이에요, 프리야. 주말에도 일해요?'
          },
          {
            text: 'Skip the report. Come in tonight, though, so we can plan the kickoff together.',
            text_ko: '보고서는 됐어요. 대신 오늘 저녁에 들러요. 킥오프 계획을 같이 짜게요.',
            reaction: "Tonight? I've been up since five two days in a row.",
            reaction_ko: '오늘 저녁이요? 이틀 연속 새벽 다섯 시에 일어났는데요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Deal. Have a great weekend, Priya!',
        reply_ko: '좋아요. 주말 잘 보내세요, 프리야!'
      }
    ],
    phrases: [
      {
        id: 'pr_d12_signed.almost_froze',
        text: 'I almost froze.',
        meaning_ko: '얼어붙을 뻔했어요.',
        note: '"Freeze" = be unable to speak or move because you are nervous. Also "My mind went blank."',
        note_ko: 'freeze는 긴장해서 말도 몸도 굳는다는 뜻입니다. "My mind went blank."도 씁니다.',
        category: 'office'
      },
      {
        id: 'pr_d12_signed.exactly_right',
        text: "That's exactly right.",
        meaning_ko: '정확히 잘했어요.',
        note: 'Confirms a decision someone made without you. It builds their confidence.',
        note_ko: '상대가 혼자 내린 결정이 옳았다고 확인해 주는 말입니다. 자신감을 키워 줍니다.',
        category: 'office'
      },
      {
        id: 'pr_d12_signed.get_some_rest',
        text: 'Go straight home and get some rest.',
        meaning_ko: '곧장 집에 가서 좀 쉬어요.',
        note: '"Straight home" = without stopping anywhere.',
        note_ko: 'straight home은 어디에도 들르지 않고 바로 집으로 간다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_d12_signed.give_yourself_credit',
        text: 'Give yourself some credit.',
        meaning_ko: '자기 공을 좀 인정하세요.',
        note: 'Said to someone who is too modest. Credit = praise for what you did.',
        note_ko: '지나치게 겸손한 사람에게 하는 말입니다. credit은 해낸 일에 대한 인정입니다.',
        category: 'office'
      },
      {
        id: 'pr_d12_signed.how_did_you_handle',
        text: 'How did you handle it?',
        meaning_ko: '어떻게 풀었어요?',
        note: 'Invites a person to tell their own success story.',
        note_ko: '상대가 자기가 잘한 이야기를 직접 하게 하는 질문입니다.',
        category: 'office'
      },
      {
        id: 'pr_d12_signed.its_official',
        text: "It's official!",
        meaning_ko: '이제 공식적으로 확정됐어요!',
        note: 'Said when something is finally signed, announced or decided.',
        note_ko: '마침내 서명하거나 발표하거나 결정했을 때 하는 말입니다.',
        category: 'office'
      },
      {
        id: 'pr_d12_signed.pulled_it_off',
        text: 'You pulled it off.',
        meaning_ko: '해냈네요.',
        note: '"Pull off" something hard = succeed at it. Stronger praise than "Good job."',
        note_ko: '어려운 일을 pull off한다는 것은 해낸다는 뜻입니다. "Good job."보다 힘 있는 칭찬입니다.',
        category: 'office'
      },
      {
        id: 'pr_d12_signed.set_up_the_kickoff',
        text: "I'll set up the kickoff with both teams.",
        meaning_ko: '양 팀이 함께하는 킥오프를 잡을게요.',
        note: '"Set up" a meeting = arrange it: the time, the room, the invite.',
        note_ko: '회의를 set up한다는 것은 시간과 회의실, 초대장까지 준비한다는 뜻입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'pr_d12_headcount',
    title: 'Sharing the credit, asking for headcount',
    title_ko: '공을 나누고 인력 요청하기',
    place: 'office_manager',
    npc: 'maya',
    day_from: 12,
    day_to: 12,
    time_from: '12:50',
    time_to: '18:00',
    summary: 'Maya congratulates you on the contract. Share the credit with Jun and Derek, then make the case for one more developer on the team.',
    summary_ko: '마야가 계약 체결을 축하합니다. 준과 데릭에게 공을 돌린 뒤, 개발자가 한 명 더 필요한 이유를 설득력 있게 말하세요.',
    sort: 20,
    tags: 'meeting,manager,praise,hiring,request',
    calendar: { day: 12, time: '13:30', title: 'Maya: the contract and headcount', title_ko: '마야: 계약 보고와 인력 요청' },
    turns: [
      {
        speaker: 'maya',
        situation: "Maya's office, Friday afternoon. The signed contract is on her screen.",
        situation_ko: '금요일 오후, 마야의 사무실입니다. 화면에 서명이 끝난 계약서가 떠 있습니다.',
        line: 'Congratulations, Priya. You ran a great negotiation.',
        line_ko: '축하해요, 프리야. 협상 정말 잘했어요.',
        prompt: 'Accept the praise, but make sure Maya knows what Jun and Derek each did.',
        prompt_ko: '칭찬은 받되, 준과 데릭이 각각 무엇을 했는지 마야가 알게 하세요.',
        model: "Thank you. Credit where it's due: Jun closed it in the room, and Derek kept every date we promised.",
        model_ko: '고마워요. 그런데 공은 제대로 돌려야죠. 현장에서 마무리한 건 준이고, 약속한 날짜를 다 지킨 건 데릭이에요.',
        distractors: [
          {
            text: "Thank you. It took a lot of late nights, but honestly, I'm proud of how I handled Greg this time around.",
            text_ko: '고마워요. 늦게까지 일한 날이 많았지만, 솔직히 이번에 그렉을 상대한 건 제가 생각해도 뿌듯해요.',
            reaction: 'You did. And the team? I hear Jun did well in Ridgeport.',
            reaction_ko: '잘했죠. 그런데 팀은요? 준이 리지포트에서 잘했다던데요.'
          },
          {
            text: 'Thank you. Credit to the team: Derek closed it in the room, and Jun kept every date we promised.',
            text_ko: '고마워요. 공은 팀에 있어요. 현장에서 마무리한 건 데릭이고, 약속한 날짜를 다 지킨 건 준이에요.',
            reaction: 'Derek was in Ridgeport? I thought Jun made the trip.',
            reaction_ko: '데릭이 리지포트에 갔어요? 출장은 준이 간 줄 알았는데요.'
          },
          {
            text: 'Oh, it was nothing. Honestly, Greg was ready to sign from the very start anyway.',
            text_ko: '에이, 별거 아니었어요. 솔직히 그렉은 처음부터 어차피 서명할 생각이었던 것 같아요.',
            reaction: 'Ready to sign? He asked for a penalty clause the day before.',
            reaction_ko: '서명할 생각이었다고요? 전날에 위약금 조항까지 요구했잖아요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Noted. I'll mention both of them to the leadership team.",
        reply_ko: '기억해 둘게요. 경영진에게 두 사람 이야기를 꼭 할게요.'
      },
      {
        speaker: 'maya',
        situation: 'Maya opens the project plan. She always looks ahead.',
        situation_ko: '마야가 프로젝트 계획을 엽니다. 마야는 언제나 앞일을 봅니다.',
        line: 'So. Phase one by November first. Are we staffed for it?',
        line_ko: '자, 1단계는 11월 1일까지예요. 인원은 충분해요?',
        prompt: 'Be straight with her about how the team is coping with only two developers.',
        prompt_ko: '개발자 두 명뿐인 팀이 어떻게 버티고 있는지 솔직하게 말하세요.',
        model: "Honestly, not quite. With two developers, we're stretched thin.",
        model_ko: '솔직히 충분하지는 않아요. 개발자 두 명으로는 빠듯해요.',
        distractors: [
          {
            text: 'Absolutely. Jun and Derek can handle it, no problem at all.',
            text_ko: '그럼요. 준이랑 데릭이면 충분히 해내요. 전혀 문제없어요.',
            reaction: "Really? Derek told me last week he's at capacity.",
            reaction_ko: '정말요? 데릭은 지난주에 이미 한계라고 하던데요.'
          },
          {
            text: "Not quite. Even with three developers, we're stretched thin.",
            text_ko: '충분하지는 않아요. 개발자가 세 명인데도 빠듯해요.',
            reaction: "Three? Who's the third? I count two.",
            reaction_ko: '세 명이요? 세 번째가 누구예요? 내가 보기엔 두 명인데요.'
          },
          {
            text: "Not really, and that's because hiring has been so slow this year.",
            text_ko: '별로요. 그건 올해 채용이 너무 느렸기 때문이에요.',
            reaction: "Let's not point fingers. What do you need?",
            reaction_ko: '남 탓은 하지 말죠. 뭐가 필요해요?'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'I was afraid of that. What are you asking for?',
        reply_ko: '그럴까 봐 걱정했어요. 뭘 요청하려는 거예요?'
      },
      {
        speaker: 'maya',
        situation: 'Bottom line first. You have practiced this sentence.',
        situation_ko: '결론부터입니다. 이 문장은 미리 연습해 두었습니다.',
        line: "Go ahead. I'm listening.",
        line_ko: '말해 봐요. 듣고 있어요.',
        prompt: 'Lead with your ask: you want to add one developer to the team.',
        prompt_ko: '요청부터 말하세요. 팀에 개발자를 한 명 더 두고 싶습니다.',
        model: "I'd like to make the case for one more developer on the team.",
        model_ko: '팀에 개발자가 한 명 더 필요한 이유를 말씀드리고 싶어요.',
        distractors: [
          {
            text: "I'd like to ask for two more developers, starting next week.",
            text_ko: '다음 주부터 개발자 두 명을 더 요청하고 싶어요.',
            reaction: "Two? That's a big ask in a tight year.",
            reaction_ko: '두 명이요? 빠듯한 해에 그건 큰 요청이에요.'
          },
          {
            text: 'So, as you know, the last few weeks have been really busy for us.',
            text_ko: '음, 아시다시피 지난 몇 주 동안 저희가 정말 바빴잖아요.',
            reaction: 'Priya. Bottom line, please.',
            reaction_ko: '프리야. 결론부터요.'
          },
          {
            text: "We need another developer. Without one, I can't promise anything.",
            text_ko: '개발자가 한 명 더 있어야 해요. 없으면 아무것도 약속 못 해요.',
            reaction: 'That sounds like an ultimatum. Try me again.',
            reaction_ko: '최후통첩처럼 들리네요. 다시 말해 봐요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Headcount is tight this year. Why can't we do it with the people we have?",
        reply_ko: '올해는 인원 예산이 빠듯해요. 지금 있는 사람들로는 왜 안 되죠?'
      },
      {
        speaker: 'maya',
        situation: 'You have the numbers ready: two developers, eight weeks, no room for anything to go wrong.',
        situation_ko: '숫자는 준비되어 있습니다. 개발자 두 명에 8주, 그리고 무엇 하나 어긋날 여유가 없습니다.',
        line: 'Convince me.',
        line_ko: '날 설득해 봐요.',
        prompt: 'Make your case with the risk: what happens to the deadline if someone is out.',
        prompt_ko: '위험으로 설득하세요. 누군가 빠지면 마감이 어떻게 되는지요.',
        model: 'With two developers, we have no slack. If one of them is out for a week, November first slips.',
        model_ko: '개발자 두 명으로는 여유가 전혀 없어요. 한 명이 한 주만 빠져도 11월 1일은 밀려요.',
        distractors: [
          {
            text: "We have zero room for error. If either of them is out for even a week, we'd miss December first.",
            text_ko: '실수할 여유가 전혀 없어요. 둘 중 한 명이라도 단 한 주만 빠지면 12월 1일을 놓칠 거예요.',
            reaction: "December? The deadline's November first.",
            reaction_ko: '12월이요? 마감은 11월 1일이에요.'
          },
          {
            text: 'Derek has been working late every night, and honestly, I think he might quit soon.',
            text_ko: '데릭이 매일 밤늦게까지 일하고 있어요. 솔직히 곧 그만둘 것 같기도 해요.',
            reaction: "That's a serious thing to say. Has Derek told you that?",
            reaction_ko: '그건 가볍게 할 말이 아니에요. 데릭이 그렇게 말했어요?'
          },
          {
            text: "Everyone's really busy, and I just think another person would make things much easier.",
            text_ko: '다들 정말 바빠요. 그냥 한 사람만 더 있으면 일이 훨씬 수월해질 것 같아요.',
            reaction: "\"Easier\" won't get past finance. I need something concrete.",
            reaction_ko: '"수월해진다"로는 재무팀을 못 넘어요. 구체적인 게 필요해요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "That's a real risk. What about a contractor? That would be faster.",
        reply_ko: '그건 실제로 있을 수 있는 위험이네요. 계약직은 어때요? 그쪽이 더 빠를 텐데요.'
      },
      {
        speaker: 'maya',
        situation: 'A contractor could start in two weeks. But the work will not end in November.',
        situation_ko: '계약직은 2주 뒤면 시작할 수 있습니다. 하지만 일은 11월에 끝나지 않습니다.',
        line: 'Would that solve it?',
        line_ko: '그러면 해결될까요?',
        prompt: "Accept a contractor for the short term, but argue that the work won't stop after November.",
        prompt_ko: '당장은 계약직을 받아들이되, 일은 11월 뒤에도 계속된다고 주장하세요.',
        model: "I'm open to a contractor to bridge the gap. But with phase two and the support contract, this is long-term work.",
        model_ko: '공백을 메우는 데는 계약직도 좋아요. 하지만 2단계와 지원 계약까지 있으니, 이건 장기적인 일이에요.',
        distractors: [
          {
            text: "A contractor would solve it. Let's go with that, and we can forget about a full-time hire.",
            text_ko: '계약직이면 해결되겠네요. 그걸로 가죠. 정규직 채용 얘기는 이제 없던 걸로 해요.',
            reaction: 'Are you sure? What happens after November?',
            reaction_ko: '정말요? 11월 다음엔 어떻게 하고요?'
          },
          {
            text: "No, a contractor won't work. It has to be full-time, or I don't think we can do this at all.",
            text_ko: '아니요, 계약직으로는 안 돼요. 정규직이어야 해요. 아니면 이 일은 못 할 것 같아요.',
            reaction: "That's a bit rigid. I'm trying to meet you halfway.",
            reaction_ko: '좀 융통성이 없네요. 나도 중간에서 맞춰 보려는 건데요.'
          },
          {
            text: "I'm open to a contractor to bridge the gap. But with phase two and a three-year support contract, it's long-term.",
            text_ko: '공백을 메우는 데는 계약직도 좋아요. 하지만 2단계와 3년짜리 지원 계약이 있으니, 이건 장기적인 일이에요.',
            reaction: 'Three years? I thought Greg signed for one.',
            reaction_ko: '3년이요? 그렉은 1년으로 서명한 줄 알았는데요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Fair. A contractor now, and one full-time position. I'll approve it. Talk to Linda about opening the job.",
        reply_ko: '맞아요. 지금은 계약직, 그리고 정규직 한 자리. 승인할게요. 채용 공고는 린다와 이야기해요.'
      },
      {
        speaker: 'maya',
        situation: 'One position, approved. You try not to smile too much.',
        situation_ko: '한 자리가 승인됐습니다. 너무 활짝 웃지 않으려고 애씁니다.',
        line: 'Is there anything else?',
        line_ko: '다른 건 없어요?',
        prompt: "Wrap up and thank her. You'll send Linda the job description this afternoon.",
        prompt_ko: '마무리하며 고맙다고 하세요. 오늘 오후에 린다에게 직무 기술서를 보낼 겁니다.',
        model: "That's all. Thank you, Maya. I'll get the job description to Linda this afternoon.",
        model_ko: '그게 다예요. 고마워요, 마야. 오늘 오후에 린다에게 직무 기술서를 넘길게요.',
        distractors: [
          {
            text: "Actually, yes. While we're here, could we also talk about opening a second position?",
            text_ko: '사실 있어요. 이왕 얘기 나온 김에, 두 번째 자리를 여는 것도 얘기해 볼 수 있을까요?',
            reaction: "Let's not push our luck, Priya. One position.",
            reaction_ko: '욕심부리지 말죠, 프리야. 한 자리예요.'
          },
          {
            text: "Nothing else, thanks. I'll send the job description to Derek this afternoon.",
            text_ko: '다른 건 없어요, 고마워요. 오늘 오후에 데릭에게 직무 기술서를 보낼게요.',
            reaction: "Derek? Linda's the one who opens the job.",
            reaction_ko: '데릭이요? 채용 공고를 여는 건 린다예요.'
          },
          {
            text: "That's it. Thanks, Maya. I'll get to the job description sometime next week.",
            text_ko: '그게 다예요. 고마워요, 마야. 직무 기술서는 다음 주 중에 쓸게요.',
            reaction: "Next week? We just said we're short on time.",
            reaction_ko: '다음 주요? 시간이 없다고 방금 얘기했잖아요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Good. And Priya? Take the weekend off. Let me know if you have any questions.',
        reply_ko: '좋아요. 그리고 프리야, 주말에는 푹 쉬어요. 궁금한 게 있으면 말해 줘요.'
      }
    ],
    phrases: [
      {
        id: 'pr_d12_headcount.are_we_staffed',
        text: 'Are we staffed for it?',
        meaning_ko: '그 일을 할 인원이 되나요?',
        note: '"Staffed" = having enough people. "Understaffed" = too few.',
        note_ko: 'staffed는 사람이 충분히 있다는 뜻이고, understaffed는 모자란다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d12_headcount.bridge_the_gap',
        text: 'a contractor to bridge the gap',
        meaning_ko: '공백을 메울 계약직',
        note: '"Bridge the gap" = cover the time until the lasting solution arrives.',
        note_ko: 'bridge the gap은 제대로 된 해결책이 올 때까지의 시간을 메운다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d12_headcount.credit_where_due',
        text: "Credit where it's due.",
        meaning_ko: '공은 마땅히 받을 사람에게 돌려야죠.',
        note: 'Short for "Give credit where credit is due." Then name the people.',
        note_ko: '"Give credit where credit is due."를 줄인 말입니다. 이어서 사람들의 이름을 말하세요.',
        category: 'office'
      },
      {
        id: 'pr_d12_headcount.headcount',
        text: 'Headcount is tight this year.',
        meaning_ko: '올해는 인원 예산이 빠듯해요.',
        note: 'Headcount = the number of people a team is allowed to employ.',
        note_ko: 'headcount는 팀이 고용할 수 있도록 허락된 인원수입니다.',
        category: 'office'
      },
      {
        id: 'pr_d12_headcount.make_the_case',
        text: "I'd like to make the case for one more developer.",
        meaning_ko: '개발자가 한 명 더 필요한 이유를 말씀드리고 싶어요.',
        note: 'Tells your manager that a request is coming, with reasons.',
        note_ko: '근거를 갖춘 요청을 하겠다고 매니저에게 알리는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d12_headcount.no_slack',
        text: 'We have no slack.',
        meaning_ko: '우리에게는 여유가 없어요.',
        note: 'Slack = spare time or capacity. A plan with no slack breaks at the first problem.',
        note_ko: 'slack은 남는 시간이나 여력입니다. 여유가 없는 계획은 첫 문제에서 무너집니다.',
        category: 'office'
      },
      {
        id: 'pr_d12_headcount.open_to',
        text: "I'm open to a contractor.",
        meaning_ko: '계약직도 괜찮다고 생각해요.',
        note: "\"I'm open to …\" = I am willing to consider it.",
        note_ko: "\"I'm open to …\"는 고려할 뜻이 있다는 말입니다.",
        category: 'meeting'
      },
      {
        id: 'pr_d12_headcount.stretched_thin',
        text: "We're stretched thin.",
        meaning_ko: '우리는 일손이 빠듯해요.',
        note: 'Too few people doing too much work. It describes the team, not a complaint about anyone.',
        note_ko: '적은 사람이 너무 많은 일을 한다는 뜻입니다. 누구를 탓하는 말이 아니라 팀의 상태를 말합니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'pr_d12_hiring',
    title: 'Opening a position with Linda',
    title_ko: '린다와 채용 공고 내기',
    place: 'office_hr',
    npc: 'linda',
    day_from: 12,
    day_to: 12,
    time_from: '13:00',
    time_to: '18:00',
    requires: 'pr_d12_headcount',
    summary: 'Maya approved one full-time developer. Go through the job requisition with Linda: the role, the hiring manager, the salary range and the timeline.',
    summary_ko: '마야가 정규직 개발자 한 명을 승인했습니다. 린다와 채용 요청서를 작성하세요. 직무, 채용 책임자, 연봉 범위, 일정까지.',
    sort: 30,
    tags: 'hr,hiring,office',
    calendar: { day: 12, time: '15:00', title: 'Open the developer position with Linda', title_ko: '린다와 개발자 채용 공고 내기' },
    turns: [
      {
        speaker: 'linda',
        situation: 'The HR office. Linda has a blank form open and a pen in her hand.',
        situation_ko: '인사팀 사무실입니다. 린다가 빈 양식을 띄워 놓고 펜을 들고 있습니다.',
        line: "Hi, Priya! Maya told me you'd stop by. A new position, how exciting! Is it a new role or a backfill?",
        line_ko: '안녕하세요, 프리야! 마야가 들를 거라고 했어요. 새 자리라니, 신나네요! 새로 생기는 자리예요, 아니면 결원 충원이에요?',
        prompt: "Answer her question, and say what the job is and which project it's for.",
        prompt_ko: '질문에 답하고, 어떤 자리이며 어느 프로젝트를 위한 것인지 말하세요.',
        model: "It's a new role: a full-time developer for the Summit Retail project.",
        model_ko: '새로 생기는 자리예요. 서밋 리테일 프로젝트를 맡을 정규직 개발자요.',
        distractors: [
          {
            text: "It's a backfill. We're replacing a developer who left last month.",
            text_ko: '결원 충원이에요. 지난달에 나간 개발자 자리를 채우는 거예요.',
            reaction: "Oh? I don't have anyone leaving on my list. Who was it?",
            reaction_ko: '어? 제 명단엔 퇴사자가 없는데요. 누구였어요?'
          },
          {
            text: "It's a new role: a part-time contractor for the Summit Retail project.",
            text_ko: '새로 생기는 자리예요. 서밋 리테일 프로젝트를 맡을 시간제 계약직이요.',
            reaction: "Part-time? Maya's note says one full-time position.",
            reaction_ko: '시간제요? 마야 메모에는 정규직 한 자리라고 되어 있어요.'
          },
          {
            text: "It's for Summit Retail. Maya's really excited about it, too.",
            text_ko: '서밋 리테일 때문이에요. 마야도 정말 기대하고 있어요.',
            reaction: 'Great! But is it a new role, or are we replacing someone?',
            reaction_ko: '좋네요! 그런데 새 자리예요, 아니면 누굴 대신하는 거예요?'
          }
        ],
        reply_speaker: 'linda',
        reply_line: 'Wonderful. Then we need a job requisition. We call it a req.',
        reply_ko: '잘됐네요. 그러면 채용 요청서가 필요해요. 줄여서 req라고 불러요.'
      },
      {
        speaker: 'linda',
        situation: 'Linda moves to the second line of the form.',
        situation_ko: '린다가 양식의 둘째 줄로 넘어갑니다.',
        line: "Who's the hiring manager? That's the person the new hire reports to.",
        line_ko: '채용 책임자는 누구예요? 새 직원이 보고하게 될 사람이요.',
        prompt: 'Tell her the new hire will report to Maya, and who will do the interviews: you and Derek.',
        prompt_ko: '새 직원은 마야에게 보고하게 된다고 하고, 면접은 당신과 데릭이 본다고 말하세요.',
        model: "Maya is the hiring manager. I'll be on the interview panel, along with Derek.",
        model_ko: '채용 책임자는 마야예요. 저는 데릭과 함께 면접관으로 들어갈게요.',
        distractors: [
          {
            text: "I'm the hiring manager. Maya and Derek will be on the interview panel.",
            text_ko: '채용 책임자는 저예요. 마야와 데릭이 면접관으로 들어갈 거예요.',
            reaction: "Hmm, Maya's note says the role reports to her.",
            reaction_ko: '음, 마야 메모에는 이 자리가 마야한테 보고한다고 되어 있는데요.'
          },
          {
            text: "Maya is the hiring manager. I'll be on the panel, along with Jun.",
            text_ko: '채용 책임자는 마야예요. 저는 준과 함께 면접관으로 들어갈게요.',
            reaction: "Jun, okay. Wait, isn't he pretty new himself?",
            reaction_ko: '준이요, 알겠어요. 잠깐, 준도 꽤 신입 아니에요?'
          },
          {
            text: "Derek, I think. He's the one who'd be working with the new hire every single day.",
            text_ko: '데릭일 것 같아요. 새 직원이랑 매일매일 같이 일할 사람이 데릭이니까요.',
            reaction: 'Not quite. I mean who they report to, not who they sit next to.',
            reaction_ko: '그게 아니라요. 옆자리에 앉을 사람 말고, 보고받을 사람이요.'
          }
        ],
        reply_speaker: 'linda',
        reply_line: 'Maya, you and Derek. Got it.',
        reply_ko: '마야, 프리야, 데릭. 알겠어요.'
      },
      {
        speaker: 'linda',
        situation: 'You have a number in your head, but it is only a guess.',
        situation_ko: '머릿속에 숫자가 하나 있지만, 짐작일 뿐입니다.',
        line: 'Do you have a salary range in mind? We have to list it in the posting.',
        line_ko: '생각해 둔 연봉 범위가 있어요? 공고에 적어야 하거든요.',
        prompt: "You don't want to make up a number. Ask her what's been approved for a mid-level role.",
        prompt_ko: '숫자를 지어내고 싶지 않습니다. 중간급 자리에 승인된 범위를 물어보세요.',
        model: "I'd rather not guess. What's the approved range for a mid-level developer?",
        model_ko: '짐작으로 말하고 싶진 않아요. 중간급 개발자에게 승인된 범위가 어떻게 돼요?',
        distractors: [
          {
            text: 'I was thinking around one twenty to one forty, so we can attract the best people.',
            text_ko: '12만에서 14만 정도를 생각했어요. 그래야 제일 좋은 사람들을 데려올 수 있으니까요.',
            reaction: "That's above the approved band. Let me check what we actually have.",
            reaction_ko: '그건 승인된 범위보다 높아요. 실제로 얼마가 있는지 확인해 볼게요.'
          },
          {
            text: 'Whatever Derek makes would be a good starting point, I think.',
            text_ko: '데릭이 받는 연봉 정도면 괜찮은 출발점이 될 것 같아요.',
            reaction: "I can't share anyone's salary, Priya. Let's use the approved band.",
            reaction_ko: '다른 사람 연봉은 알려 줄 수 없어요, 프리야. 승인된 범위로 가죠.'
          },
          {
            text: "Does it have to go in the posting? I'd rather keep it private.",
            text_ko: '꼭 공고에 넣어야 해요? 그건 공개 안 했으면 좋겠는데요.',
            reaction: "It does, I'm afraid. We list a range on every posting.",
            reaction_ko: '안타깝지만 넣어야 해요. 모든 공고에 범위를 적거든요.'
          }
        ],
        reply_speaker: 'linda',
        reply_line: "For that level, it's ninety-five to one hundred fifteen thousand a year, plus benefits.",
        reply_ko: '그 직급이면 연 9만 5천에서 11만 5천 달러이고, 복리후생은 별도예요.'
      },
      {
        speaker: 'linda',
        situation: 'Phase one is due on November first.',
        situation_ko: '1단계의 기한은 11월 1일입니다.',
        line: 'And how soon do you need someone?',
        line_ko: '그리고 사람은 얼마나 빨리 필요해요?',
        prompt: 'Give her your timeline, six weeks if possible, and ask how long hiring normally takes.',
        prompt_ko: '가능하면 6주라는 일정을 말하고, 채용이 보통 얼마나 걸리는지 물어보세요.',
        model: 'Ideally within six weeks. How long does the process usually take?',
        model_ko: '가능하면 6주 안이면 좋겠어요. 보통 절차가 얼마나 걸려요?',
        distractors: [
          {
            text: 'As soon as possible. Could we have someone start next Monday?',
            text_ko: '최대한 빨리요. 다음 주 월요일부터 출근할 수 있을까요?',
            reaction: "Monday? We haven't even posted the job yet!",
            reaction_ko: '월요일이요? 아직 공고도 안 올렸는데요!'
          },
          {
            text: "Sometime in the spring is fine. There's no real rush on this one.",
            text_ko: '봄쯤이면 괜찮아요. 이건 딱히 급하지 않아요.',
            reaction: 'Spring? I thought Maya said this was urgent.',
            reaction_ko: '봄이요? 마야는 급하다고 한 것 같은데요.'
          },
          {
            text: 'Six weeks. And can the job be fully remote, or is it on-site?',
            text_ko: '6주요. 그리고 완전 재택도 되나요, 아니면 출근해야 해요?',
            reaction: "We can get to that. First, let's see if six weeks is even doable.",
            reaction_ko: '그건 차차 얘기해요. 먼저 6주가 되긴 하는지부터 보죠.'
          }
        ],
        reply_speaker: 'linda',
        reply_line: "From posting to offer, about five weeks if we move quickly. Referrals are faster, and there's a referral bonus.",
        reply_ko: '공고부터 입사 제안까지, 서두르면 5주쯤 걸려요. 추천은 더 빠르고, 추천 보너스도 있어요.'
      },
      {
        speaker: 'linda',
        situation: 'Your draft of the job description is almost done.',
        situation_ko: '직무 기술서 초안은 거의 다 써 두었습니다.',
        line: "I'll need the job description before I can post it. When can you get it to me?",
        line_ko: '공고를 올리려면 직무 기술서가 있어야 해요. 언제쯤 줄 수 있어요?',
        prompt: 'Promise her a draft by 4 p.m., and invite her to make any changes she wants.',
        prompt_ko: '오후 네 시까지 초안을 주겠다고 하고, 얼마든지 고쳐도 된다고 하세요.',
        model: "You'll have a draft by four o'clock. Feel free to mark it up.",
        model_ko: '네 시까지 초안 보내 드릴게요. 얼마든지 마음껏 고쳐 주세요.',
        distractors: [
          {
            text: "You'll have a draft by Monday. Feel free to mark it up.",
            text_ko: '월요일까지 초안 보내 드릴게요. 얼마든지 마음껏 고쳐 주세요.',
            reaction: "Monday? Then it won't go up until midweek.",
            reaction_ko: '월요일이요? 그럼 공고는 주중에나 올라가겠네요.'
          },
          {
            text: "By four. Just please don't change it, it's already final.",
            text_ko: '네 시까지요. 근데 고치진 말아 주세요. 이미 최종본이에요.',
            reaction: 'Oh. Well, I usually have to edit for legal wording.',
            reaction_ko: '아. 그런데 보통은 제가 법적 표현을 손봐야 하거든요.'
          },
          {
            text: "Could you write it yourself? You've done a lot more of these.",
            text_ko: '직접 써 줄 수 있어요? 이런 건 린다가 훨씬 많이 써 봤잖아요.',
            reaction: "I can help, but I don't know the role like you do.",
            reaction_ko: '도와줄 순 있지만, 그 일은 프리야만큼 잘 몰라요.'
          }
        ],
        reply_speaker: 'linda',
        reply_line: "I will. We'll have it posted by Monday morning. And congratulations on the contract!",
        reply_ko: '그럴게요. 월요일 아침까지 공고를 올릴게요. 그리고 계약 축하해요!'
      }
    ],
    phrases: [
      {
        id: 'pr_d12_hiring.backfill',
        text: 'Is it a new role or a backfill?',
        meaning_ko: '새로 생기는 자리예요, 아니면 빈자리를 채우는 거예요?',
        note: 'A backfill replaces a person who left. A new role adds to the headcount.',
        note_ko: 'backfill은 나간 사람의 자리를 채우는 것이고, 새 자리는 인원이 늘어나는 것입니다.',
        category: 'office'
      },
      {
        id: 'pr_d12_hiring.hiring_manager',
        text: "Who's the hiring manager?",
        meaning_ko: '채용 책임자가 누구예요?',
        note: 'The manager who makes the final decision and will lead the new person.',
        note_ko: '최종 결정을 내리고 새로 온 사람을 이끌 매니저입니다.',
        category: 'office'
      },
      {
        id: 'pr_d12_hiring.interview_panel',
        text: "I'll be on the interview panel.",
        meaning_ko: '저는 면접관으로 참여할게요.',
        note: 'The group of people who interview a candidate.',
        note_ko: '지원자를 면접하는 사람들의 모임입니다.',
        category: 'office'
      },
      {
        id: 'pr_d12_hiring.job_req',
        text: 'a job requisition (a req)',
        meaning_ko: '채용 요청서',
        note: 'The internal form that approves a hire. "The req is open" = you may start hiring.',
        note_ko: '채용을 승인하는 내부 문서입니다. "The req is open"은 채용을 시작해도 된다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d12_hiring.mark_it_up',
        text: 'Feel free to mark it up.',
        meaning_ko: '마음껏 고쳐 주세요.',
        note: '"Mark up" a document = write changes and comments on it.',
        note_ko: '문서를 mark up한다는 것은 고칠 점과 의견을 적어 넣는다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d12_hiring.referral_bonus',
        text: "There's a referral bonus.",
        meaning_ko: '추천 보너스가 있어요.',
        note: 'Money an employee gets when someone they recommended is hired.',
        note_ko: '추천한 사람이 채용되면 직원이 받는 돈입니다.',
        category: 'office'
      },
      {
        id: 'pr_d12_hiring.reports_to',
        text: 'the person the new hire reports to',
        meaning_ko: '새 직원이 보고하는 사람',
        note: '"Report to" someone = have them as your manager.',
        note_ko: '누구에게 report to한다는 것은 그 사람이 내 매니저라는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d12_hiring.salary_range',
        text: 'Do you have a salary range in mind?',
        meaning_ko: '생각하는 연봉 범위가 있어요?',
        note: 'Job postings often list the lowest and highest pay for the role.',
        note_ko: '채용 공고에는 그 자리의 최저와 최고 급여를 밝히는 경우가 많습니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'pr_w2_carl',
    title: 'Good news on a park bench',
    title_ko: '공원 벤치에서 전하는 좋은 소식',
    place: 'park_bench',
    npc: 'carl',
    day_from: 13,
    day_to: 13,
    time_from: '08:00',
    time_to: '18:00',
    summary: 'A warm, sunny Saturday in Seaside Park. Tell Carl about the deal, promise to unplug for the weekend, and say yes to his barbecue.',
    summary_ko: '따뜻하고 화창한 토요일, 시사이드 공원입니다. 칼에게 계약 소식을 전하고, 주말에는 일에서 손을 떼겠다고 약속하고, 바비큐 초대를 받아들이세요.',
    sort: 10,
    tags: 'small-talk,park,invitation',
    calendar: { day: 13, time: '10:00', title: 'Morning in Seaside Park', title_ko: '시사이드 공원에서 보내는 아침' },
    turns: [
      {
        speaker: 'carl',
        situation: 'Saturday morning, sunny and warm. Carl is on his bench with a bag of charcoal at his feet.',
        situation_ko: '화창하고 따뜻한 토요일 아침입니다. 칼이 발치에 숯 한 봉지를 두고 늘 앉는 벤치에 앉아 있습니다.',
        line: 'There she is! You look like somebody who had a good week.',
        line_ko: '왔구먼! 한 주 잘 보낸 사람 얼굴인데.',
        prompt: 'Share your good news from work yesterday.',
        prompt_ko: '어제 회사에서 있었던 좋은 소식을 전하세요.',
        model: 'I did! We closed a big deal yesterday.',
        model_ko: '맞아요! 어제 큰 계약을 따냈어요.',
        distractors: [
          {
            text: 'I did! We closed a big deal on Monday.',
            text_ko: '맞아요! 월요일에 큰 계약을 따냈어요.',
            reaction: "Monday? Then why'd you look so tired all week?",
            reaction_ko: '월요일? 그럼 한 주 내내 왜 그렇게 피곤해 보였나?'
          },
          {
            text: 'Not really. Just a long, busy week.',
            text_ko: '별로요. 그냥 길고 바쁜 한 주였어요.',
            reaction: "Really? With that smile? I don't buy it.",
            reaction_ko: '정말? 그렇게 웃으면서? 못 믿겠는걸.'
          },
          {
            text: 'I did! I closed the biggest deal ever.',
            text_ko: '맞아요! 제가 역대 최대 계약을 따냈어요.',
            reaction: 'Ever? Well, look at you. All by yourself, huh?',
            reaction_ko: '역대? 이야, 대단하네. 혼자서 다 했다는 건가?'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'Well, how about that! Congratulations. So what did you have to give up to get it?',
        reply_ko: '이야, 그것참 잘됐네! 축하해. 그래, 그걸 따내려고 뭘 내줬나?'
      },
      {
        speaker: 'carl',
        situation: 'Carl bought bus parts for thirty years. He knows there is no deal without a price.',
        situation_ko: '칼은 30년 동안 버스 부품을 사들였습니다. 대가 없는 거래가 없다는 것을 잘 압니다.',
        line: 'Nobody signs for free.',
        line_ko: '공짜로 서명하는 사람은 없지.',
        prompt: 'Tell him what you gave up and what you got back, and how you see the trade.',
        prompt_ko: '무엇을 내주고 무엇을 받았는지, 그리고 그 거래를 어떻게 보는지 말하세요.',
        model: "A small discount, but we got a one-year contract in return. I'd call that a win-win.",
        model_ko: '할인을 조금 해 줬지만, 그 대신 1년 계약을 받았어요. 서로 좋은 거래라고 봐요.',
        distractors: [
          {
            text: 'A small discount, but we got a five-year support contract in return. A great trade.',
            text_ko: '할인을 조금 해 줬지만, 그 대신 5년짜리 지원 계약을 받았어요. 아주 좋은 거래죠.',
            reaction: 'Five years, huh? Hope you read the fine print on that one.',
            reaction_ko: '5년이라? 깨알 같은 조항까지 잘 읽어 봤길 바라네.'
          },
          {
            text: "We didn't give up a thing, actually. They took our price, and that was that.",
            text_ko: '사실 하나도 안 내줬어요. 그쪽이 우리 가격을 받아들였고, 그걸로 끝이었어요.',
            reaction: 'Nothing at all? In thirty years, I never once saw that.',
            reaction_ko: '하나도? 30년 동안 그런 건 한 번도 못 봤는데.'
          },
          {
            text: 'Five percent off one eighty, plus Net 45, and a one-year support contract for Summit.',
            text_ko: '18만에서 5퍼센트 할인, 거기에 Net 45, 그리고 서밋과 1년 지원 계약이요.',
            reaction: "Whoa, I don't need the whole contract. Is that stuff even public?",
            reaction_ko: '어이쿠, 계약서를 통째로 읊을 필요는 없어. 그런 거 밖에 말해도 되나?'
          }
        ],
        reply_speaker: 'carl',
        reply_line: "Win-win. That's how I bought parts for thirty years. So, what are you doing with your Saturday? Don't tell me you're working.",
        reply_ko: '양쪽 다 좋은 거래라. 나도 30년 동안 그렇게 부품을 샀지. 그래, 토요일엔 뭘 하나? 설마 일한다는 건 아니겠지.'
      },
      {
        speaker: 'carl',
        situation: 'Your laptop is at home, closed. Maya told you to take the weekend off.',
        situation_ko: '노트북은 집에 덮어 두고 왔습니다. 마야도 주말에는 쉬라고 했습니다.',
        line: "You work too hard. I've said it before.",
        line_ko: '자네는 일을 너무 많이 해. 전에도 말했지.',
        prompt: "Assure him you're taking a real break from work this weekend.",
        prompt_ko: '이번 주말에는 일에서 제대로 손을 놓는다고 안심시키세요.',
        model: "No way. I'm unplugging this weekend. No email until Monday.",
        model_ko: '절대 아니에요. 이번 주말엔 일 완전히 끊어요. 월요일까지 이메일도 안 봐요.',
        distractors: [
          {
            text: "I know. I'll just check my email a few times this weekend.",
            text_ko: '알아요. 그래도 이번 주말엔 이메일을 몇 번만 확인하고 말게요.',
            reaction: "A few times? That's how it starts.",
            reaction_ko: '몇 번만? 원래 그렇게 시작하는 거야.'
          },
          {
            text: "Not this weekend. My laptop's at the office, so no email till Monday.",
            text_ko: '이번 주말은 아니에요. 노트북을 회사에 두고 와서 월요일까지 이메일은 못 봐요.',
            reaction: 'At the office? I saw you carry it home Friday night.',
            reaction_ko: '회사에? 금요일 밤에 들고 들어가는 걸 봤는데.'
          },
          {
            text: 'Well, someone has to. The team would fall apart without me.',
            text_ko: '뭐, 누군가는 해야죠. 솔직히 제가 없으면 팀이 금방 무너질걸요.',
            reaction: "Nobody's that important, kid. Trust me.",
            reaction_ko: '그렇게까지 대단한 사람은 없어. 내 말 믿게.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: "I'll believe it when I see it.",
        reply_ko: '눈으로 봐야 믿겠는걸.'
      },
      {
        speaker: 'carl',
        situation: 'He taps the bag of charcoal with his shoe.',
        situation_ko: '칼이 구두로 숯 봉지를 툭 칩니다.',
        line: "I'm having a barbecue for my tenants at four. Jun's coming, the new kid from your office. Why don't you swing by?",
        line_ko: '네 시에 세입자들 불러서 바비큐를 할 거야. 자네 회사 신참 준도 온다더군. 들르지 그래?',
        prompt: 'Accept the invitation, and offer to bring something.',
        prompt_ko: '초대를 받아들이고, 뭔가 가져가겠다고 하세요.',
        model: "I'd love to. What can I bring?",
        model_ko: '좋아요. 뭘 가져갈까요?',
        distractors: [
          {
            text: "I'd love to. Is it at five o'clock?",
            text_ko: '좋아요. 다섯 시였던가요?',
            reaction: 'Four, I said. Four sharp.',
            reaction_ko: '네 시라니까. 네 시 정각.'
          },
          {
            text: "Maybe. I'll see how I feel.",
            text_ko: '글쎄요. 그때 봐서요.',
            reaction: "Suit yourself. Ribs won't wait, though.",
            reaction_ko: '마음대로 하게. 갈비는 안 기다려 주지만.'
          },
          {
            text: 'Sure. Should I invite Jun?',
            text_ko: '그럼요. 준도 부를까요?',
            reaction: 'Already did. He said yes before you did.',
            reaction_ko: '벌써 불렀지. 자네보다 먼저 온다고 했어.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'Just yourself. Well, maybe some of that lemonade from the market.',
        reply_ko: '몸만 오면 돼. 뭐, 마켓에서 파는 그 레모네이드나 좀 가져오든가.'
      },
      {
        speaker: 'carl',
        situation: 'Carl stands up and lifts the charcoal onto his shoulder.',
        situation_ko: '칼이 일어나 숯 봉지를 어깨에 멥니다.',
        line: "Four o'clock, the yard behind Maple Street Apartments. Don't be late. The ribs go fast.",
        line_ko: '네 시, 메이플 스트리트 아파트 뒤뜰이야. 늦지 말고. 갈비는 금방 동나니까.',
        prompt: "Tell him you'll definitely be there, on time, with what he asked for.",
        prompt_ko: '꼭 가겠다고 하세요. 제시간에, 그가 부탁한 것을 들고요.',
        model: "I wouldn't miss it. I'll be there at four, lemonade in hand.",
        model_ko: '절대 안 빠지죠. 네 시에 레모네이드 들고 갈게요.',
        distractors: [
          {
            text: "Wouldn't miss it. I'll be there at four with some iced tea.",
            text_ko: '절대 안 빠지죠. 네 시에 아이스티 좀 들고 갈게요.',
            reaction: 'Iced tea? I was hoping for that lemonade.',
            reaction_ko: '아이스티? 그 레모네이드를 기대했는데.'
          },
          {
            text: 'Sounds good. I might be a little late, but save me some ribs.',
            text_ko: '좋아요. 조금 늦을 수도 있는데, 갈비 좀 남겨 주세요.',
            reaction: 'Late? I told you, the ribs go fast.',
            reaction_ko: '늦는다고? 갈비는 금방 동난다고 했잖나.'
          },
          {
            text: "I'll be there. The yard behind Oak Street, right? At four.",
            text_ko: '갈게요. 오크 스트리트 뒤뜰 맞죠? 네 시에요.',
            reaction: 'Maple Street Apartments, Priya. I just told you.',
            reaction_ko: '메이플 스트리트 아파트야, 프리야. 방금 말했잖나.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'See you at four, Priya. Bring an appetite.',
        reply_ko: '네 시에 보세, 프리야. 배는 비워서 오고.'
      }
    ],
    phrases: [
      {
        id: 'pr_w2_carl.believe_it_when',
        text: "I'll believe it when I see it.",
        meaning_ko: '눈으로 봐야 믿겠는걸.',
        note: 'Friendly doubt about a promise.',
        note_ko: '약속을 살짝 의심하며 놀리는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_w2_carl.closed_a_deal',
        text: 'We closed a big deal.',
        meaning_ko: '큰 계약을 성사시켰어요.',
        note: '"Close a deal" = complete it. A person who is good at this is "a closer".',
        note_ko: 'close a deal은 거래를 마무리한다는 뜻입니다. 이것을 잘하는 사람을 a closer라고 합니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_w2_carl.how_about_that',
        text: 'Well, how about that!',
        meaning_ko: '이야, 그것참 잘됐네!',
        note: 'Shows happy surprise at good news. It is not a question.',
        note_ko: '좋은 소식에 기쁘게 놀라는 말입니다. 질문이 아닙니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_w2_carl.in_return',
        text: 'We got a one-year contract in return.',
        meaning_ko: '그 대신 1년 계약을 받았어요.',
        note: '"In return" = as the thing you get back for what you gave.',
        note_ko: 'in return은 내준 것에 대한 대가로 받는다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_w2_carl.unplugging',
        text: "I'm unplugging this weekend.",
        meaning_ko: '이번 주말에는 일에서 손을 뗄 거예요.',
        note: 'Like pulling a plug out of the wall: no work, no email.',
        note_ko: '벽에서 플러그를 뽑듯이 일도 이메일도 끊는다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_w2_carl.what_can_i_bring',
        text: 'What can I bring?',
        meaning_ko: '뭘 가져갈까요?',
        note: 'The polite answer to an invitation. If the host says "Just yourself", bring a drink or dessert anyway.',
        note_ko: '초대에 답하는 예의 바른 말입니다. 주인이 "Just yourself"라고 해도 음료나 디저트를 가져가세요.',
        category: 'small-talk'
      },
      {
        id: 'pr_w2_carl.win_win',
        text: "I'd call that a win-win.",
        meaning_ko: '양쪽 모두에게 좋은 거래죠.',
        note: 'A result that is good for both sides.',
        note_ko: '양쪽 모두에게 좋은 결과를 말합니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_w2_carl.wouldnt_miss_it',
        text: "I wouldn't miss it.",
        meaning_ko: '꼭 갈게요.',
        note: "Stronger and warmer than \"I'll come.\"",
        note_ko: "\"I'll come.\"보다 힘 있고 따뜻한 말입니다.",
        category: 'small-talk'
      }
    ]
  },
  {
    id: 'pr_w2_rainy',
    title: 'A rainy Sunday at the diner',
    title_ko: '비 오는 일요일의 다이너',
    place: 'diner_counter',
    npc: 'rosa',
    day_from: 14,
    day_to: 14,
    time_from: '10:00',
    time_to: '20:00',
    summary: 'Showers all afternoon, and you forgot your umbrella. Sit at the counter, ask Rosa what is good on a day like this, wait out the rain, and pay in cash.',
    summary_ko: '오후 내내 소나기가 오는데 우산을 두고 나왔습니다. 카운터에 앉아 이런 날에 뭐가 좋은지 로사에게 묻고, 비가 그치기를 기다렸다가 현금으로 계산하세요.',
    reward: -20,
    energy: 40,
    sort: 10,
    tags: 'food,order,tipping,money,weather',
    calendar: { day: 14, time: '12:30', title: 'Lunch at the Sunny Side Diner', title_ko: '서니 사이드 다이너에서 점심' },
    turns: [
      {
        speaker: 'rosa',
        situation: 'Sunday. The shower starts when you are one block from the diner. You run the rest of the way.',
        situation_ko: '일요일입니다. 다이너까지 한 블록 남았을 때 소나기가 쏟아집니다. 남은 길을 뛰어갑니다.',
        line: "Hi, hon! Look at you, you're soaked. Did you get caught in the rain?",
        line_ko: '어서 와요! 세상에, 흠뻑 젖었네. 비 맞았어요?',
        prompt: "Explain why you're soaked, and ask whether you can take a seat at the counter.",
        prompt_ko: '왜 흠뻑 젖었는지 말하고, 카운터에 앉아도 되는지 물어보세요.',
        model: 'I got caught in a downpour without my umbrella. Is it okay if I sit at the counter?',
        model_ko: '우산 없이 나왔다가 소나기를 만났어요. 카운터에 앉아도 될까요?',
        distractors: [
          {
            text: 'I got caught in the rain because my umbrella broke on the way. Can I sit at a booth?',
            text_ko: '오는 길에 우산이 망가져서 비를 맞았어요. 부스 자리에 앉아도 돼요?',
            reaction: "A booth? Sure, though the counter's warmer, hon.",
            reaction_ko: '부스요? 그래요. 카운터가 더 따뜻하긴 하지만요.'
          },
          {
            text: "Yeah, obviously. Can I get a towel or something? I'm dripping everywhere here.",
            text_ko: '보면 알잖아요. 수건 같은 거 있어요? 여기 물이 줄줄 흐르는데요.',
            reaction: "Well, hello to you too. I'll see what I can find.",
            reaction_ko: '어머, 인사부터 하지. 뭐가 있나 볼게요.'
          },
          {
            text: "It's really pouring out there. Could I just get a coffee to go, please?",
            text_ko: '밖에 비가 엄청 쏟아져요. 그냥 커피 한 잔만 포장해 갈 수 있을까요?',
            reaction: 'To go? In this? Sit down a minute, hon.',
            reaction_ko: '포장이요? 이 비에요? 잠깐 앉았다 가요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Sit anywhere, hon. Let me get you some coffee to warm you up.',
        reply_ko: '아무 데나 앉아요. 몸 좀 녹이게 커피부터 줄게요.'
      },
      {
        speaker: 'rosa',
        situation: 'The coffee is hot and the windows are steamed up.',
        situation_ko: '커피는 뜨겁고 창문에는 김이 서려 있습니다.',
        line: 'Now, what can I get you?',
        line_ko: '자, 뭐 줄까요?',
        prompt: "Let her choose: ask what's good when it's cold and wet out.",
        prompt_ko: '로사에게 맡겨 보세요. 이렇게 춥고 비 오는 날에는 뭐가 좋은지 물어보세요.',
        model: 'What do you recommend on a day like this?',
        model_ko: '이런 날에는 뭐가 좋아요? 추천해 주세요.',
        distractors: [
          {
            text: 'Just a salad and an iced tea, please.',
            text_ko: '그냥 샐러드랑 아이스티 한 잔 주세요.',
            reaction: "Iced tea? You sure, hon? You're shivering.",
            reaction_ko: '아이스티요? 정말요? 덜덜 떨고 있는데.'
          },
          {
            text: "Whatever's fastest. I don't want to wait.",
            text_ko: '제일 빨리 되는 걸로요. 기다리기 싫어요.',
            reaction: "Okay... the kitchen's quick today anyway.",
            reaction_ko: '그래요… 어차피 오늘은 주방이 빨라요.'
          },
          {
            text: "What's popular for brunch on a Saturday?",
            text_ko: '토요일 브런치로는 뭐가 인기예요?',
            reaction: "It's Sunday, hon. But I know just the thing.",
            reaction_ko: '오늘 일요일이에요. 그래도 딱 맞는 게 있죠.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: "Chicken noodle soup and a grilled cheese. It's what I'd have. Cup or bowl?",
        reply_ko: '치킨 누들 수프에 그릴드 치즈죠. 나라면 그걸 먹겠어요. 컵으로 줄까요, 볼로 줄까요?'
      },
      {
        speaker: 'rosa',
        situation: 'A cup is small. A bowl is a meal.',
        situation_ko: '컵은 작습니다. 볼은 한 끼가 됩니다.',
        line: 'Cup or bowl, hon?',
        line_ko: '컵으로 줄까요, 볼로 줄까요?',
        prompt: 'Go for the bigger size, take the sandwich too, and say you need something warm and filling.',
        prompt_ko: '큰 쪽으로 하고 샌드위치도 같이 시키세요. 따뜻하고 든든한 게 필요하다고요.',
        model: 'A bowl, please, with the grilled cheese. I could use some comfort food.',
        model_ko: '볼로 주세요. 그릴드 치즈도요. 마음 편해지는 음식이 좀 필요하네요.',
        distractors: [
          {
            text: "A cup, please, with the grilled cheese. I'm really hungry today.",
            text_ko: '컵으로 주세요. 그릴드 치즈도요. 오늘 정말 배고프거든요.',
            reaction: "A cup won't fill you up, hon. You sure?",
            reaction_ko: '컵으로는 배 안 찰 텐데요. 괜찮겠어요?'
          },
          {
            text: "A bowl, please, but skip the grilled cheese. I'm not all that hungry today.",
            text_ko: '볼로 주세요. 그릴드 치즈는 빼고요. 오늘은 그렇게 배고프진 않아요.',
            reaction: "No grilled cheese? Your loss. It's the best in town.",
            reaction_ko: '그릴드 치즈를 빼요? 손해예요. 이 동네에서 제일 맛있는데.'
          },
          {
            text: "Whichever's bigger, I guess. Just bring it out fast, I'm starving.",
            text_ko: '큰 걸로요, 뭐. 빨리만 갖다주세요. 배고파 죽겠어요.',
            reaction: "Coming, coming. The kitchen's doing its best.",
            reaction_ko: '가요, 가요. 주방도 최선을 다하고 있어요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'One bowl, one grilled cheese. Coming right up.',
        reply_ko: '수프 한 볼, 그릴드 치즈 하나. 금방 나와요.'
      },
      {
        speaker: 'rosa',
        situation: 'The bowl is empty. Outside it is still coming down.',
        situation_ko: '그릇이 비었습니다. 밖에는 아직도 비가 쏟아집니다.',
        line: 'More coffee, hon? Refills are free.',
        line_ko: '커피 더 줄까요? 리필은 공짜예요.',
        prompt: 'Accept the refill, and tell her you plan to stay until the rain stops.',
        prompt_ko: '리필을 받고, 비가 그칠 때까지 있겠다고 하세요.',
        model: "Yes, please. I'm in no hurry. I'll wait out the rain.",
        model_ko: '네, 주세요. 급할 거 없어요. 비 그칠 때까지 있을게요.',
        distractors: [
          {
            text: 'No, thanks. I should get going before it gets worse.',
            text_ko: '아니요, 괜찮아요. 더 심해지기 전에 가 봐야겠어요.',
            reaction: "In this? You'll get soaked all over again.",
            reaction_ko: '이 비에요? 또 흠뻑 젖을 텐데.'
          },
          {
            text: 'Yes, please. How much do I owe you for the refill, then?',
            text_ko: '네, 주세요. 그런데 리필은 얼마 드리면 되나요?',
            reaction: 'Nothing, hon. Refills are free, like I said.',
            reaction_ko: '안 줘도 돼요. 말했잖아요, 리필은 공짜라고.'
          },
          {
            text: "Fill it up. And keep it coming, I'm staying a while.",
            text_ko: '가득 채워요. 계속 갖다주고요. 한참 있을 거니까.',
            reaction: 'All right, all right. Coming right up.',
            reaction_ko: '알았어요, 알았어. 바로 갖다줄게요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Stay as long as you like. Pie of the day is apple. Can I tempt you with a slice?',
        reply_ko: '있고 싶은 만큼 있어요. 오늘의 파이는 사과예요. 한 조각 어때요?'
      },
      {
        speaker: 'rosa',
        situation: 'The pie looks wonderful. But the bowl was big.',
        situation_ko: '파이가 정말 맛있어 보입니다. 하지만 수프가 한가득이었습니다.',
        line: 'It came out of the oven an hour ago.',
        line_ko: '한 시간 전에 오븐에서 꺼낸 거예요.',
        prompt: "You're too full to eat it now. Find a way to have some later.",
        prompt_ko: '지금은 배가 불러 못 먹습니다. 나중에 먹을 방법을 찾아보세요.',
        model: "I'm stuffed, but could I get a slice to go?",
        model_ko: '배가 꽉 찼는데, 한 조각 포장해 갈 수 있을까요?',
        distractors: [
          {
            text: "I'm stuffed. Could I get a slice of cherry to go?",
            text_ko: '배가 꽉 찼어요. 체리 파이 한 조각 포장해 갈 수 있을까요?',
            reaction: "Cherry's gone, hon. Apple's the pie of the day.",
            reaction_ko: '체리는 다 나갔어요. 오늘의 파이는 사과예요.'
          },
          {
            text: "Sure, I'll have a slice here with my coffee.",
            text_ko: '좋아요, 여기서 커피랑 한 조각 먹을게요.',
            reaction: "Room for pie after that bowl? I'm impressed.",
            reaction_ko: '그 수프를 다 먹고도 파이 들어갈 자리가 있어요? 대단하네.'
          },
          {
            text: 'No pie for me. Just bring me the check.',
            text_ko: '파이는 됐어요. 계산서나 갖다주세요.',
            reaction: 'Oh. Okay, hon. Here it comes.',
            reaction_ko: '아. 그래요. 여기 있어요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: "One slice of apple, boxed up. Here's your check, hon: sixteen dollars, so seventeen thirty-two with tax.",
        reply_ko: '사과 파이 한 조각, 포장해 줄게요. 계산서 여기 있어요. 16달러니까, 세금 포함해서 17달러 32센트예요.'
      },
      {
        speaker: 'rosa',
        situation: 'You put a twenty on the counter. That leaves $2.68 for Rosa, about seventeen percent of sixteen dollars.',
        situation_ko: '카운터에 20달러 지폐를 올려놓습니다. 로사에게 2달러 68센트가 남으니, 16달러의 17퍼센트쯤 됩니다.',
        line: 'Let me get your change.',
        line_ko: '거스름돈 갖다줄게요.',
        prompt: "The $2.68 left over is a fair tip. Let her know she doesn't need to bring anything back.",
        prompt_ko: '남는 2달러 68센트면 적당한 팁입니다. 아무것도 가져다줄 필요 없다고 하세요.',
        model: "That's okay. Keep the change.",
        model_ko: '괜찮아요. 잔돈은 가지세요.',
        distractors: [
          {
            text: 'Just give me back two dollars.',
            text_ko: '2달러만 거슬러 주세요.',
            reaction: 'Two dollars. Sure, hon.',
            reaction_ko: '2달러요. 그래요.'
          },
          {
            text: "Thanks. I'll tip on my card.",
            text_ko: '고마워요. 팁은 카드로 줄게요.',
            reaction: 'Your card? You paid cash, hon.',
            reaction_ko: '카드요? 현금으로 냈잖아요.'
          },
          {
            text: 'Sure. Can I get it in quarters?',
            text_ko: '네. 25센트짜리로 줄 수 있어요?',
            reaction: 'Quarters? Let me check the register.',
            reaction_ko: '25센트짜리요? 계산대 좀 볼게요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: "Thank you, hon! Look, the sun's coming out. Stay dry out there.",
        reply_ko: '고마워요! 저기 봐요, 해가 나네요. 비 맞지 말고 가요.'
      }
    ],
    phrases: [
      {
        id: 'pr_w2_rainy.caught_in_a_downpour',
        text: 'I got caught in a downpour.',
        meaning_ko: '폭우를 만났어요.',
        note: 'A downpour is sudden, heavy rain. "Showers" are light and come and go.',
        note_ko: 'downpour는 갑자기 세차게 쏟아지는 비이고, showers는 가볍게 오다 말다 하는 비입니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_w2_rainy.comfort_food',
        text: 'I could use some comfort food.',
        meaning_ko: '마음이 편안해지는 음식이 먹고 싶어요.',
        note: 'Simple, warm food that makes you feel better: soup, grilled cheese, mac and cheese.',
        note_ko: '먹으면 기분이 나아지는 소박하고 따뜻한 음식입니다. 수프, 그릴드 치즈, 맥 앤드 치즈 같은 것들입니다.',
        category: 'food'
      },
      {
        id: 'pr_w2_rainy.cup_or_bowl',
        text: 'Cup or bowl?',
        meaning_ko: '컵으로 드릴까요, 볼로 드릴까요?',
        note: 'Soup sizes. A cup is a small side, a bowl is a full serving.',
        note_ko: '수프의 크기입니다. cup은 곁들이는 작은 양이고 bowl은 한 그릇입니다.',
        category: 'food'
      },
      {
        id: 'pr_w2_rainy.day_like_this',
        text: 'What do you recommend on a day like this?',
        meaning_ko: '이런 날에는 뭘 추천하세요?',
        note: 'Servers know the menu. Asking them is normal and friendly.',
        note_ko: '종업원은 메뉴를 잘 압니다. 물어보는 것은 자연스럽고 친근한 일입니다.',
        category: 'food'
      },
      {
        id: 'pr_w2_rainy.keep_the_change',
        text: 'Keep the change.',
        meaning_ko: '거스름돈은 가지세요.',
        note: 'Leaves the change as the tip when you pay in cash.',
        note_ko: '현금으로 낼 때 거스름돈을 팁으로 남기는 말입니다.',
        category: 'food'
      },
      {
        id: 'pr_w2_rainy.slice_to_go',
        text: "I'm stuffed, but could I get a slice to go?",
        meaning_ko: '배가 꽉 찼는데, 한 조각 포장해 주시겠어요?',
        note: '"To go" = to take with you. The opposite is "for here".',
        note_ko: 'to go는 가지고 간다는 뜻이고, 반대말은 for here입니다.',
        category: 'food'
      },
      {
        id: 'pr_w2_rainy.soaked',
        text: "You're soaked.",
        meaning_ko: '흠뻑 젖었네요.',
        note: 'Completely wet. Also "soaking wet" and "drenched".',
        note_ko: '완전히 젖었다는 뜻입니다. soaking wet, drenched도 씁니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_w2_rainy.wait_out_the_rain',
        text: "I'll wait out the rain.",
        meaning_ko: '비가 그칠 때까지 기다릴게요.',
        note: '"Wait out" something = stay until it is over.',
        note_ko: 'wait out은 그것이 끝날 때까지 기다린다는 뜻입니다.',
        category: 'small-talk'
      }
    ]
  },
  {
    id: 'pr_d15_coffee',
    title: 'Treats for the team',
    title_ko: '팀에 줄 간식',
    place: 'coffee_cart',
    npc: 'nina',
    day_from: 15,
    day_to: 15,
    time_from: '07:00',
    time_to: '09:00',
    summary: "A gray Monday morning at Nina's cart. Tell her about your weekend, get your usual, and pick up pastries for the team: you promised them a celebration.",
    summary_ko: '흐린 월요일 아침, 니나의 카트입니다. 주말 얘기를 하고, 늘 마시던 걸 주문하고, 팀에 줄 빵도 사세요. 축하하자고 약속했으니까요.',
    reward: -28,
    energy: 10,
    sort: 1500,
    tags: 'food,order,coffee,small-talk,week3',
    turns: [
      {
        situation: 'Monday morning. Gray skies over Lake Avenue, but no rain today.',
        situation_ko: '월요일 아침입니다. 레이크 애비뉴 하늘은 흐리지만 오늘은 비가 오지 않습니다.',
        line: 'Morning, Priya! You look rested for a Monday. Good weekend?',
        line_ko: '좋은 아침이에요, 프리야! 월요일치고 얼굴이 좋네요. 주말 잘 보냈어요?',
        prompt: "Tell her yes: you kept work out of your weekend. Mention Saturday's barbecue.",
        prompt_ko: '네, 주말엔 일을 멀리했다고 하세요. 토요일 바비큐 얘기도 하세요.',
        model: "It was great. I didn't open my laptop once, and I went to a barbecue on Saturday.",
        model_ko: '정말 좋았어요. 노트북을 한 번도 안 열었고, 토요일엔 바비큐에 갔어요.',
        distractors: [
          {
            text: "It was great. I didn't open my laptop once, and I went to a barbecue on Sunday.",
            text_ko: '정말 좋았어요. 노트북을 한 번도 안 열었고, 일요일엔 바비큐에 갔어요.',
            reaction: 'On Sunday? In that rain? Brave.',
            reaction_ko: '일요일에요? 그 비에요? 용감하네요.'
          },
          {
            text: 'Not bad. I only answered work emails for an hour or two, then went to a barbecue.',
            text_ko: '나쁘지 않았어요. 업무 메일에 한두 시간만 답하고, 바비큐에 갔어요.',
            reaction: "An hour or two? Priya, that's not a weekend off.",
            reaction_ko: '한두 시간이요? 프리야, 그건 쉰 게 아니에요.'
          },
          {
            text: 'It was great, thanks. Hey, is it supposed to rain again at some point later today?',
            text_ko: '좋았어요, 고마워요. 그런데 오늘 이따가 비가 또 온대요?',
            reaction: "Nope, dry all day. But you didn't answer me. What'd you do?",
            reaction_ko: '아뇨, 종일 안 와요. 그런데 대답을 안 했네요. 뭐 했어요?'
          }
        ],
        reply_line: 'Good for you! The usual, then. Medium oat latte, extra shot.',
        reply_ko: '잘했어요! 그럼 늘 마시던 걸로요. 귀리 우유 라테 미디엄, 샷 추가.'
      },
      {
        situation: "On Friday, you promised Jun you'd celebrate the contract on Monday.",
        situation_ko: '금요일에 준에게 월요일에 계약을 축하하자고 약속했습니다.',
        line: 'Anything else this morning?',
        line_ko: '오늘 아침엔 더 필요한 거 있어요?',
        prompt: 'You want to bring something for the team. Find out what baked goods she has today.',
        prompt_ko: '팀에 뭔가 가져가고 싶습니다. 오늘은 어떤 빵이 있는지 알아보세요.',
        model: "Yes, I'd like to bring something for my team. What pastries do you have today?",
        model_ko: '네, 팀에 뭘 좀 가져가고 싶어서요. 오늘은 어떤 빵이 있어요?',
        distractors: [
          {
            text: "No, that's all for me, thanks. Just the latte this morning, please.",
            text_ko: '아뇨, 그거면 돼요, 고마워요. 오늘 아침엔 라테만 주세요.',
            reaction: "Just the latte, then. You sound like you're forgetting something.",
            reaction_ko: '그럼 라테만요. 뭔가 잊어버린 사람 같은데요.'
          },
          {
            text: 'Yes, something for my team. Could you bring a tray of pastries to our office?',
            text_ko: '네, 팀에 줄 거요. 빵 한 쟁반을 저희 사무실로 갖다주실 수 있어요?',
            reaction: "Bring it over? It's just me and this cart, Priya. I can't leave it.",
            reaction_ko: '갖다 달라고요? 저랑 이 카트뿐이에요, 프리야. 자리를 못 비워요.'
          },
          {
            text: "Yes, my team's celebrating today. Do you have a whole cake I could pick up later?",
            text_ko: '네, 오늘 팀이 축하할 일이 있어서요. 이따 가져갈 홀케이크 하나 있어요?',
            reaction: 'A whole cake? On a cart this size? I wish.',
            reaction_ko: '홀케이크요? 이만한 카트에서요? 그럼 좋겠네요.'
          }
        ],
        reply_line: 'Blueberry muffins and butter croissants, fresh this morning.',
        reply_ko: '블루베리 머핀이랑 버터 크루아상이요. 오늘 아침에 나온 거예요.'
      },
      {
        line: 'Pastries for the team on a Monday? Somebody must have done something right.',
        line_ko: '월요일에 팀 간식이라니요? 누가 뭘 제대로 해냈나 봐요.',
        prompt: "Tell her what you're celebrating, and make it about the team.",
        prompt_ko: '무엇을 축하하는지 말하되, 팀의 공으로 돌리세요.',
        model: 'They did. We signed a big client on Friday, and the team worked hard for it.',
        model_ko: '맞아요. 금요일에 큰 고객사와 계약했는데, 팀이 정말 고생했거든요.',
        distractors: [
          {
            text: 'They did. We signed a big client this morning, and the team worked hard for it.',
            text_ko: '맞아요. 오늘 아침에 큰 고객사와 계약했는데, 팀이 정말 고생했거든요.',
            reaction: "This morning? It's not even eight yet. You people start early.",
            reaction_ko: '오늘 아침에요? 아직 여덟 시도 안 됐는데요. 일찍들 시작하네요.'
          },
          {
            text: 'Somebody did: me. I closed a big deal on Friday, pretty much on my own.',
            text_ko: '누가 해냈냐면, 저요. 금요일에 큰 계약을 거의 혼자 따냈어요.',
            reaction: 'Ha. And the team gets muffins for that?',
            reaction_ko: '하. 그런데 그걸로 팀이 머핀을 받는다고요?'
          },
          {
            text: "Not really. It's just a gray Monday, and I figured everyone could use a treat.",
            text_ko: '딱히요. 그냥 흐린 월요일이라, 다들 단 게 필요할 것 같아서요.',
            reaction: 'Fair enough. But you look way too happy for just a Monday.',
            reaction_ko: '그럴 수도 있죠. 그런데 그냥 월요일치고는 너무 신나 보이는데요.'
          }
        ],
        reply_line: 'Congratulations! Then the team deserves the good stuff. How many do you need?',
        reply_ko: '축하해요! 그럼 팀은 좋은 걸 먹어야죠. 몇 개 필요해요?'
      },
      {
        line: "I've got plenty of both.",
        line_ko: '둘 다 넉넉히 있어요.',
        prompt: 'Order six pastries, three of each kind.',
        prompt_ko: '빵 여섯 개를 두 종류 세 개씩 주문하세요.',
        model: "Let's do half a dozen. Three muffins and three croissants, please.",
        model_ko: '여섯 개 주세요. 머핀 세 개, 크루아상 세 개요.',
        distractors: [
          {
            text: "Let's do a dozen. Six muffins and six croissants, please.",
            text_ko: '열두 개 주세요. 머핀 여섯 개, 크루아상 여섯 개요.',
            reaction: "A dozen? That's my whole tray. How big is this team?",
            reaction_ko: '열두 개요? 그럼 쟁반이 다 비어요. 팀이 몇 명이에요?'
          },
          {
            text: "Let's do half a dozen. Five muffins and just one croissant, please.",
            text_ko: '여섯 개 주세요. 머핀 다섯 개, 크루아상은 한 개만요.',
            reaction: "Five and one? Somebody's going to fight over that croissant.",
            reaction_ko: '다섯이랑 하나요? 크루아상 하나 두고 싸움 나겠네요.'
          },
          {
            text: "Just give me whatever didn't sell yesterday. They won't notice.",
            text_ko: '어제 안 팔린 걸로 아무거나 주세요. 다들 모를 거예요.',
            reaction: "Yesterday's? For a celebration? I don't think so.",
            reaction_ko: '어제 거요? 축하하는 날에요? 그건 안 되죠.'
          }
        ],
        reply_line: "Three and three, boxed up. With your latte, that's twenty-five seventy-five, so twenty-seven eighty-seven with tax.",
        reply_ko: '세 개씩, 상자에 담았어요. 라테까지 25달러 75센트, 세금 포함해서 27달러 87센트예요.'
      }
    ]
  },
  {
    id: 'pr_d15_standup',
    title: 'Jun is back: Monday standup',
    title_ko: '준이 돌아왔다: 월요일 스탠드업',
    place: 'office_desk_team',
    npc: 'derek',
    day_from: 15,
    day_to: 15,
    time_from: '09:00',
    time_to: '11:00',
    summary: 'The first standup since the contract was signed. Welcome Jun back from Ridgeport, keep his trip report short, tell him where his receipts go, thank Derek for covering a bug, and finish on time.',
    summary_ko: '계약 체결 후 첫 스탠드업입니다. 리지포트에서 돌아온 준을 맞이하고, 출장 보고는 짧게 받고, 영수증을 어디에 내는지 알려 주고, 버그를 대신 맡아 준 데릭에게 고마움을 전하고, 제시간에 끝내세요.',
    sort: 1510,
    tags: 'meeting,standup,facilitation,week3',
    calendar: { day: 15, time: '09:30', title: 'Daily standup: Jun is back', title_ko: '데일리 스탠드업: 준 복귀' },
    turns: [
      {
        situation: 'Nine thirty at the team desks. Jun is back for the first time since Wednesday.',
        situation_ko: '아홉 시 반, 팀 자리입니다. 준이 수요일 이후 처음으로 돌아왔습니다.',
        line: "Hey, look who's back! The man who closed Summit Retail.",
        line_ko: '어, 누가 돌아왔나 보세요! 서밋 리테일 계약을 따낸 주인공이요.',
        prompt: 'Start the meeting, welcome Jun back, and have him give his trip update before anyone else.',
        prompt_ko: '회의를 시작하고, 준을 반갑게 맞이하고, 다른 사람보다 먼저 출장 이야기를 하게 하세요.',
        model: "Welcome back, Jun! Let's get started. Why don't you go first and tell us about the trip?",
        model_ko: '돌아온 걸 환영해요, 준! 시작하죠. 준이 먼저 출장 얘기를 해 줄래요?',
        distractors: [
          {
            text: "Welcome back, Jun! How was your week in Ridgeport? Why don't you go first?",
            text_ko: '돌아온 걸 환영해요, 준! 리지포트에서 일주일은 어땠어요? 준이 먼저 해 줄래요?',
            reaction: 'A week? He was gone two days, Priya. Felt longer to me, though.',
            reaction_ko: '일주일이요? 이틀 갔다 왔어요, 프리야. 저한텐 더 길게 느껴졌지만요.'
          },
          {
            text: "Okay, let's get started. Derek, why don't you go first, and Jun, you can go last today?",
            text_ko: '자, 시작하죠. 데릭이 먼저 하고, 준은 오늘 마지막에 해요.',
            reaction: "Me first? I figured you'd want the big news first.",
            reaction_ko: '저부터요? 큰 소식부터 들을 줄 알았는데요.'
          },
          {
            text: 'Welcome back, Jun! Take all the time you need today. Tell us everything, start to finish.',
            text_ko: '돌아온 걸 환영해요, 준! 오늘은 시간 얼마든지 써요. 처음부터 끝까지 다 얘기해 줘요.',
            reaction: "Everything? Careful, Priya. That's how a standup turns into lunch.",
            reaction_ko: '전부요? 조심해요, 프리야. 그러다 스탠드업이 점심시간까지 가요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Thanks! Short version: Greg signed on Friday, phase one kicks off next week, and the dashboard is due November first.',
        reply_ko: '고마워요! 짧게 말하면, 금요일에 그렉이 서명했고, 1단계는 다음 주에 시작하고, 대시보드 마감은 11월 1일이에요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun is on a roll. The short version is getting longer.',
        situation_ko: '준은 신이 났습니다. 짧은 버전이 점점 길어집니다.',
        line: 'Oh, and the hotel had this amazing breakfast, and the shuttle driver told me all about Ridgeport, and—',
        line_ko: '아, 그리고 호텔 조식이 정말 끝내줬고, 셔틀 기사님이 리지포트 얘기를 엄청 해 주셨는데, 그리고…',
        prompt: "Stop him kindly: the stories can wait. Move him on to what's in his way this week.",
        prompt_ko: '부드럽게 끊으세요. 그 이야기는 기다릴 수 있습니다. 이번 주에 막히는 게 있는지로 넘어가세요.',
        model: "I want to hear it all, but let's save the stories for lunch. Anything blocking you this week?",
        model_ko: '다 듣고 싶은데, 그 얘기는 점심때 하죠. 이번 주에 막히는 거 있어요?',
        distractors: [
          {
            text: "Jun, this is a standup, not a travel blog. Just tell us what you're working on.",
            text_ko: '준, 이건 스탠드업이지 여행 블로그가 아니에요. 무슨 일 하고 있는지만 말해요.',
            reaction: 'Oh. Sorry. I guess I got a little carried away.',
            reaction_ko: '아. 죄송해요. 제가 좀 신이 났었나 봐요.'
          },
          {
            text: "I want to hear it all, but let's save the stories for lunch. So, how was your flight back home?",
            text_ko: '다 듣고 싶은데, 그 얘기는 점심때 하죠. 돌아오는 비행기는 어땠어요?',
            reaction: "The flight? Bumpy, but... wait, didn't you just say to save the stories?",
            reaction_ko: '비행기요? 좀 흔들렸는데… 잠깐, 방금 얘기는 나중에 하자고 하지 않았어요?'
          },
          {
            text: "Sounds amazing! Keep going, we've got time. What else did you get to do in Ridgeport?",
            text_ko: '재밌네요! 계속해요, 시간 있어요. 리지포트에서 또 뭐 했어요?',
            reaction: 'Okay! So on Thursday night, I found this little taco place, and—',
            reaction_ko: '좋아요! 그러니까 목요일 밤에 작은 타코집을 발견했는데요, 그게…'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Right, sorry. Just one thing: I need to file my trip expenses, and I've never done it here.",
        reply_ko: '맞아요, 죄송해요. 하나만요. 출장 경비를 처리해야 하는데, 여기서 한 번도 안 해 봤어요.'
      },
      {
        speaker: 'jun',
        line: 'Who do I give my receipts to?',
        line_ko: '영수증은 누구한테 내면 돼요?',
        prompt: 'Send him to the person who handles expenses, and tell him what to bring.',
        prompt_ko: '경비를 담당하는 사람에게 보내고, 무엇을 가져가야 하는지 알려 주세요.',
        model: "Linda in HR handles that. Bring her your receipts, and she'll walk you through the form.",
        model_ko: '그건 인사팀 린다가 맡아요. 영수증을 가져가면 양식 쓰는 걸 차근차근 알려 줄 거예요.',
        distractors: [
          {
            text: "Tom at the front desk handles that. Bring him your receipts, and he'll walk you through it.",
            text_ko: '그건 안내 데스크 톰이 맡아요. 영수증을 가져가면 차근차근 알려 줄 거예요.',
            reaction: 'Tom? I thought he did badges and meeting rooms.',
            reaction_ko: '톰이요? 톰은 출입증이랑 회의실 담당인 줄 알았는데요.'
          },
          {
            text: 'Just hang on to them for now. We usually do all the expenses at the end of the quarter.',
            text_ko: '일단 그냥 갖고 있어요. 경비는 보통 분기 말에 한꺼번에 처리해요.',
            reaction: "The end of the quarter? That's a lot of money to wait for.",
            reaction_ko: '분기 말이요? 기다리기엔 꽤 큰돈인데요.'
          },
          {
            text: "Linda in HR handles that. Don't worry about the receipts. She just needs the total.",
            text_ko: '그건 인사팀 린다가 맡아요. 영수증은 신경 쓰지 마요. 총액만 있으면 돼요.',
            reaction: 'No receipts? Really? That sounds almost too easy.',
            reaction_ko: '영수증 없이요? 정말요? 너무 쉬운데요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Linda. Got it. I'll stop by today.",
        reply_ko: '린다요. 알겠어요. 오늘 들를게요.'
      },
      {
        situation: "Derek's turn. While Jun was away, Derek took over a bug with the store IDs.",
        situation_ko: '데릭 차례입니다. 준이 없는 동안 데릭이 매장 ID 버그를 맡았습니다.',
        line: "My update: I picked up Jun's store ID bug while he was out. It's fixed and live.",
        line_ko: '제 업데이트요. 준이 없는 동안 매장 ID 버그를 맡았어요. 고쳐서 배포까지 했어요.',
        prompt: "Thank him for stepping in, and ask whether it belongs in this week's update to the client.",
        prompt_ko: '대신 맡아 준 데 고마워하고, 이번 주에 고객에게 보내는 업데이트에 넣어야 할지 물어보세요.',
        model: "Thanks for covering, Derek. Should we mention it in Friday's status report to Greg?",
        model_ko: '대신 맡아 줘서 고마워요, 데릭. 금요일에 그렉한테 보내는 현황 보고에 넣을까요?',
        distractors: [
          {
            text: 'Thanks for covering, Derek. Is this the same gift card bug we had last week?',
            text_ko: '대신 맡아 줘서 고마워요, 데릭. 지난주 그 기프트 카드 버그랑 같은 거예요?',
            reaction: 'Different bug. The gift cards are behind us, knock on wood.',
            reaction_ko: '다른 버그예요. 기프트 카드 건은 이제 끝났어요, 제발요.'
          },
          {
            text: 'Thanks, Derek. Jun, next time, please hand off your bugs before you leave on a trip.',
            text_ko: '고마워요, 데릭. 준, 다음엔 출장 가기 전에 버그를 꼭 넘기고 가요.',
            reaction: 'Hey, he did hand it off. It was right there on the board.',
            reaction_ko: '에이, 준은 넘기고 갔어요. 보드에 다 올라와 있었어요.'
          },
          {
            text: "Great, thanks. I'll tell Greg we haven't had a single bug since the contract.",
            text_ko: '좋아요, 고마워요. 그렉한테는 계약 이후로 버그가 하나도 없었다고 할게요.',
            reaction: "Not a single one? I wouldn't put that in writing.",
            reaction_ko: '하나도요? 저라면 그건 글로 안 남겨요.'
          }
        ],
        reply_line: "Worth one line. It's fixed, so it's good news.",
        reply_ko: '한 줄 정도면 좋겠네요. 고쳤으니까 좋은 소식이고요.'
      },
      {
        situation: 'Fourteen minutes so far. Your meetings end on time.',
        situation_ko: '지금까지 14분. 당신의 회의는 제시간에 끝납니다.',
        line: "That's it from me. Anything else before we break?",
        line_ko: '저는 이게 다예요. 끝내기 전에 더 있어요?',
        prompt: "Remind everyone when phase one starts, say you'll send the meeting invite yourself today, and close the standup.",
        prompt_ko: '1단계가 언제 시작하는지 다시 알리고, 오늘 직접 회의 초대를 보내겠다고 하고, 스탠드업을 마치세요.',
        model: "Just one thing: phase one kicks off next week. I'll send the invite today. Thanks, everyone!",
        model_ko: '하나만요. 1단계는 다음 주에 시작해요. 초대는 오늘 보낼게요. 다들 고마워요!',
        distractors: [
          {
            text: "Just one thing: phase one kicks off tomorrow. I'll send the invite tonight. Thanks, everyone!",
            text_ko: '하나만요. 1단계는 내일 시작해요. 초대는 오늘 밤에 보낼게요. 다들 고마워요!',
            reaction: 'Tomorrow? Jun just said next week. Did I miss an email?',
            reaction_ko: '내일요? 준은 방금 다음 주라던데요. 제가 메일을 놓쳤나요?'
          },
          {
            text: "One more thing. Let's walk through the whole phase one plan right now, while we're all here.",
            text_ko: '하나 더요. 다 모인 김에 지금 1단계 계획을 처음부터 끝까지 훑어보죠.',
            reaction: "Now? We're at fourteen minutes, Priya. You never go over.",
            reaction_ko: '지금요? 벌써 14분이에요, 프리야. 시간 넘긴 적 없잖아요.'
          },
          {
            text: 'Just one thing: phase one kicks off next week. Derek, could you send everyone the invite?',
            text_ko: '하나만요. 1단계는 다음 주에 시작해요. 데릭, 다들한테 초대 좀 보내 줄래요?',
            reaction: "Me? Scheduling's your superpower, not mine.",
            reaction_ko: '저요? 일정 잡는 건 프리야 특기잖아요. 제 특기가 아니고요.'
          }
        ],
        reply_line: 'Fifteen minutes on the dot. Some things never change.',
        reply_ko: '딱 15분. 변하지 않는 것도 있네요.'
      }
    ]
  },
  {
    id: 'pr_d15_applicants',
    title: 'The first applicants',
    title_ko: '첫 지원자들',
    place: 'office_hr',
    npc: 'linda',
    day_from: 15,
    day_to: 15,
    time_from: '14:30',
    time_to: '17:00',
    summary: 'The developer job went up this morning, and applications are already coming in. Agree with Linda on who screens what, answer a question about remote work, ask about the contractor, and find time for the first calls.',
    summary_ko: '개발자 채용 공고가 오늘 아침에 올라갔고, 벌써 지원서가 들어오고 있습니다. 누가 무엇을 거를지 린다와 정하고, 재택근무 질문에 답하고, 계약직에 대해 묻고, 첫 통화 일정을 잡으세요.',
    sort: 1520,
    tags: 'hr,hiring,office,week3',
    calendar: { day: 15, time: '15:00', title: 'Hiring: first applicants with Linda', title_ko: '채용: 린다와 첫 지원자 검토' },
    turns: [
      {
        situation: 'Monday afternoon in HR. Linda waves you in, mug in hand.',
        situation_ko: '월요일 오후, 인사팀입니다. 린다가 머그잔을 든 채 들어오라고 손짓합니다.',
        line: 'Priya! The posting went live this morning, and we already have twenty-three applications.',
        line_ko: '프리야! 공고가 오늘 아침에 올라갔는데, 벌써 지원서가 스물세 개나 들어왔어요.',
        prompt: 'Show you are pleased, and ask who looks at the applications first.',
        prompt_ko: '반가워하고, 지원서를 누가 먼저 보는지 물어보세요.',
        model: "Twenty-three already? That's great. Who does the first pass on the resumes?",
        model_ko: '벌써 스물세 개요? 잘됐네요. 이력서는 누가 먼저 걸러요?',
        distractors: [
          {
            text: 'Twenty-three already? Great. Can you forward all of them to Derek by tonight?',
            text_ko: '벌써 스물세 개요? 좋네요. 오늘 밤에 전부 데릭한테 넘겨 줄 수 있어요?',
            reaction: "All twenty-three? To Derek? He'd never forgive us.",
            reaction_ko: '스물세 개 전부요? 데릭한테요? 우릴 절대 용서 안 할걸요.'
          },
          {
            text: "Only twenty-three? I honestly thought we'd have a lot more by now.",
            text_ko: '겨우 스물세 개요? 솔직히 지금쯤이면 훨씬 많을 줄 알았어요.',
            reaction: "It's been six hours, Priya. That's actually a lot.",
            reaction_ko: '여섯 시간 지났어요, 프리야. 사실 많은 거예요.'
          },
          {
            text: "Twenty-three already? That's great. So when does the new developer start?",
            text_ko: '벌써 스물세 개요? 잘됐네요. 그럼 새 개발자는 언제 출근해요?',
            reaction: "Start? We haven't even read a resume yet!",
            reaction_ko: '출근이요? 아직 이력서 한 장도 안 읽었는데요!'
          }
        ],
        reply_line: 'I do a quick screen for the basics. Then I send you the best five or six.',
        reply_ko: '제가 기본 조건만 빠르게 걸러요. 그다음에 제일 괜찮은 대여섯 명을 보내 드려요.'
      },
      {
        situation: "Phase one starts next week, and Derek's days are already full.",
        situation_ko: '다음 주에 1단계가 시작되고, 데릭의 일정은 이미 꽉 찼습니다.',
        line: 'After that comes a thirty-minute phone screen. Should I set those up with you and Derek?',
        line_ko: '그다음엔 30분짜리 전화 면접이 있어요. 프리야랑 데릭으로 잡을까요?',
        prompt: 'Take the phone screens on yourself, and keep Derek for the technical round later.',
        prompt_ko: '전화 면접은 당신이 맡고, 데릭은 나중에 기술 면접에 들어가게 하세요.',
        model: "Just me for the phone screens. Derek has phase one, so let's save him for the technical interview.",
        model_ko: '전화 면접은 저 혼자 할게요. 데릭은 1단계가 있으니까, 기술 면접 때 들어오게 해요.',
        distractors: [
          {
            text: "Just Derek for the phone screens. I'm busy with phase one, so I'll join for the final round.",
            text_ko: '전화 면접은 데릭 혼자 하게 해요. 저는 1단계로 바빠서 최종 면접에 들어갈게요.',
            reaction: "Derek on his own? I heard he's buried in phase one.",
            reaction_ko: '데릭 혼자요? 1단계 일에 파묻혀 있다던데요.'
          },
          {
            text: "Let's skip the phone screens. Just bring the best ones straight in for a full day of interviews instead.",
            text_ko: '전화 면접은 건너뛰죠. 제일 괜찮은 사람들만 바로 불러서 대신 하루 종일 면접 봐요.',
            reaction: "A full day for each of them? That's a lot of everyone's time.",
            reaction_ko: '한 명마다 하루씩이요? 다들 시간을 너무 많이 써요.'
          },
          {
            text: 'Both of us, please. Derek will make the time, even if phase one has to wait a few days.',
            text_ko: '둘 다 넣어 주세요. 1단계가 며칠 밀리더라도 데릭이 시간을 낼 거예요.',
            reaction: "Phase one waits? I don't think Maya would love that.",
            reaction_ko: '1단계를 미룬다고요? 마야가 좋아할 것 같진 않은데요.'
          }
        ],
        reply_line: 'Smart. Engineers hate losing an afternoon to phone calls.',
        reply_ko: '현명하네요. 개발자들은 전화로 오후를 날리는 걸 질색하거든요.'
      },
      {
        situation: 'The team works in the office. Maya is the hiring manager.',
        situation_ko: '팀은 사무실에서 일합니다. 채용 책임자는 마야입니다.',
        line: 'One question keeps coming up. A lot of applicants want to know if the job is remote.',
        line_ko: '자꾸 나오는 질문이 하나 있어요. 지원자가 많이들 재택근무가 되냐고 물어요.',
        prompt: 'Say how the team works today, and leave any exceptions to the person who decides.',
        prompt_ko: '팀이 지금 어떻게 일하는지 말하고, 예외는 결정권자에게 맡기세요.',
        model: "It's in the office for now. If a great candidate needs flexibility, let's ask Maya. It's her call.",
        model_ko: '지금은 사무실 근무예요. 좋은 지원자가 유연 근무가 필요하면 마야에게 물어봐요. 마야가 정할 일이니까요.',
        distractors: [
          {
            text: "Just tell them it's fully remote. We'll get a lot more applicants, and we can sort it out later.",
            text_ko: '완전 재택이라고 해요. 지원자가 훨씬 많아질 거고, 나중에 정리하면 돼요.',
            reaction: 'And then they show up expecting to work from home? No, thanks.',
            reaction_ko: '그러다 재택인 줄 알고 들어오면요? 그건 안 돼요.'
          },
          {
            text: "It's in the office for now. If a great candidate needs flexibility, I'll just decide it case by case.",
            text_ko: '지금은 사무실 근무예요. 좋은 지원자가 유연 근무가 필요하면 제가 그때그때 정할게요.',
            reaction: 'You? I thought Maya was the hiring manager on this one.',
            reaction_ko: '프리야가요? 이번 채용 책임자는 마야인 줄 알았는데요.'
          },
          {
            text: 'Good question. Tell them the range is ninety-five to one fifteen, plus benefits.',
            text_ko: '좋은 질문이에요. 연봉 범위는 9만 5천에서 11만 5천에 복리후생 별도라고 해요.',
            reaction: "That's already in the posting. I was asking about remote.",
            reaction_ko: '그건 공고에 이미 있어요. 재택을 물어본 건데요.'
          }
        ],
        reply_line: "In the office, and Maya decides exceptions. I'll put that in my reply template.",
        reply_ko: '사무실 근무, 예외는 마야가 결정. 답장 양식에 그렇게 넣을게요.'
      },
      {
        line: 'Maya also mentioned a contractor. Is that still happening?',
        line_ko: '마야가 계약직 얘기도 했는데요. 그것도 그대로 진행해요?',
        prompt: 'Confirm it is, and find out how bringing in a contractor works here.',
        prompt_ko: '진행한다고 확인하고, 여기서는 계약직을 어떻게 구하는지 알아보세요.',
        model: "Yes, that's the other half of the plan. Does that go through you, or do we use an agency?",
        model_ko: '네, 그게 계획의 나머지 절반이에요. 그건 린다를 거쳐요, 아니면 에이전시를 써요?',
        distractors: [
          {
            text: "No, Maya dropped the contractor idea on Friday. It's just the one full-time position now.",
            text_ko: '아뇨, 마야가 금요일에 계약직은 없던 걸로 했어요. 이제 정규직 한 자리뿐이에요.',
            reaction: "Really? Her email on Friday said both. I'll double-check with her.",
            reaction_ko: '그래요? 금요일 메일에는 둘 다라고 돼 있었는데요. 마야한테 다시 확인할게요.'
          },
          {
            text: 'Yes, it is. Could you post it next to the full-time job, with the same salary range?',
            text_ko: '네, 진행해요. 정규직 공고 옆에 같은 연봉 범위로 올려 줄 수 있어요?',
            reaction: "Contractors don't really work that way. They're paid by the hour.",
            reaction_ko: '계약직은 보통 그렇게 안 해요. 시간당으로 받거든요.'
          },
          {
            text: 'Yes, and I already promised a friend of mine the job. Can you send her the paperwork?',
            text_ko: '네, 그리고 제 친구한테 벌써 그 자리를 약속했어요. 친구한테 서류 좀 보내 줄래요?',
            reaction: "Whoa. Let's not promise anything to anyone just yet.",
            reaction_ko: '워워. 아직 누구한테도 약속하진 말죠.'
          }
        ],
        reply_line: "We use an agency. I'll send you their contact. They can usually have someone here in two weeks.",
        reply_ko: '에이전시를 써요. 연락처 보내 드릴게요. 보통 2주면 사람을 보내 줘요.'
      },
      {
        situation: 'Your mornings this week are mostly client calls.',
        situation_ko: '이번 주 오전은 대부분 고객 통화입니다.',
        line: 'Last thing. When are you free for the first phone screens?',
        line_ko: '마지막으로요. 첫 전화 면접은 언제 시간 돼요?',
        prompt: 'Offer her the end of the week, after lunch, and say why not earlier in the day.',
        prompt_ko: '이번 주 후반 점심 이후로 제안하고, 왜 더 이른 시간은 안 되는지 말하세요.',
        model: 'Thursday or Friday afternoon works best. My mornings are mostly client calls.',
        model_ko: '목요일이나 금요일 오후가 제일 좋아요. 오전엔 거의 고객 통화가 있어서요.',
        distractors: [
          {
            text: 'Thursday or Friday morning works best. My afternoons are mostly client calls.',
            text_ko: '목요일이나 금요일 오전이 제일 좋아요. 오후엔 거의 고객 통화가 있어서요.',
            reaction: 'Mornings? Huh. I had you down as busy before lunch.',
            reaction_ko: '오전이요? 어라, 점심 전엔 바쁜 걸로 알고 있었는데요.'
          },
          {
            text: "Anytime at all. Just put them on my calendar, and I'll move things around.",
            text_ko: '아무 때나 괜찮아요. 그냥 제 캘린더에 넣어 주면 제가 다른 걸 옮길게요.',
            reaction: 'Anytime? Even on top of your client calls?',
            reaction_ko: '아무 때나요? 고객 통화랑 겹쳐도요?'
          },
          {
            text: "Not this week. Let's wait until phase one is done, sometime in November.",
            text_ko: '이번 주는 안 돼요. 1단계가 끝나는 11월쯤까지 기다리죠.',
            reaction: 'November? You told me you needed someone in six weeks.',
            reaction_ko: '11월이요? 6주 안에 사람이 필요하다고 했잖아요.'
          }
        ],
        reply_line: "Thursday and Friday afternoons. I'll start booking them. Now comes the fun part!",
        reply_ko: '목요일, 금요일 오후요. 바로 잡기 시작할게요. 이제부터가 재밌는 부분이에요!'
      }
    ]
  }
];

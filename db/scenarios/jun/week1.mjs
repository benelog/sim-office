// Jun Kim's first week (game days 1-7: Monday, October 5 to Sunday, October 11): the missions.
// Each episode is a conversation with its turns, its entry on the calendar and the expressions it teaches.

export const hero = 'jun';

export const episodes = [
  {
    id: 'd1_bus',
    title: 'Good morning, neighbor',
    title_ko: '이웃과 아침 인사',
    place: 'bus_stop',
    npc: 'carl',
    day_to: 1,
    time_from: '07:00',
    time_to: '09:30',
    summary: 'Your neighbor Carl is waiting for the bus too. Chat about your first day and find out how to pay the fare.',
    summary_ko: '이웃 칼도 버스를 기다리고 있습니다. 첫 출근 이야기를 나누고 버스 요금 내는 법을 알아보세요.',
    sort: 10,
    tags: 'commute,neighbor,small-talk',
    turns: [
      {
        speaker: 'carl',
        situation: 'It is your first Monday in Fairview. Your neighbor Carl, who also owns your building, is waiting at the bus stop.',
        situation_ko: '페어뷰에서 맞는 첫 월요일입니다. 이웃이자 건물 주인인 칼이 버스 정류장에서 기다리고 있습니다.',
        line: "Well, look who's up early! Heading into work?",
        line_ko: '어이, 누가 이렇게 일찍 나왔나 했더니! 출근하는 거야?',
        prompt: 'Carl is making small talk. Tell him why today is a big day for you.',
        prompt_ko: '칼이 말을 걸어옵니다. 오늘이 왜 특별한 날인지 말해 주세요.',
        model: "Yeah, it's my first day at my new job.",
        model_ko: '네, 오늘 새 직장에 첫 출근하는 날이에요.',
        distractors: [
          {
            text: 'Yeah, back to work after a long week off.',
            text_ko: '네, 일주일 쉬고 다시 출근하는 거예요.',
            reaction: 'A week off? I thought you just moved in!',
            reaction_ko: '일주일 쉬었다고? 이사 온 지 얼마 안 된 줄 알았는데!'
          },
          {
            text: "Yeah. Sorry, I'm not really a morning person.",
            text_ko: '네. 죄송한데 제가 아침엔 좀 약해서요.',
            reaction: "Ha, fair enough. I'll let you wake up.",
            reaction_ko: '하하, 그래. 잠 좀 깨게 놔둬야겠네.'
          },
          {
            text: 'Yeah, are you heading into work too?',
            text_ko: '네, 칼도 출근하시는 길이에요?',
            reaction: "I asked you first, kid! What's the occasion?",
            reaction_ko: '내가 먼저 물었잖아! 무슨 날이야?'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'No kidding! Congrats, kid.',
        reply_ko: '정말? 축하해!'
      },
      {
        speaker: 'carl',
        situation: 'Carl folds his newspaper and turns to you.',
        situation_ko: '칼이 신문을 접고 당신 쪽으로 돌아섭니다.',
        line: "So where's the new gig?",
        line_ko: '그래서 새 직장은 어디야?',
        prompt: 'Tell him where you work and what you do there.',
        prompt_ko: '어디서 일하고 무슨 일을 하는지 말해 주세요.',
        model: "It's at Seaside Labs downtown. I'm a software developer.",
        model_ko: '시내에 있는 시사이드 랩스요. 소프트웨어 개발자예요.',
        distractors: [
          {
            text: "Seaside Labs, downtown. I'm a product manager there.",
            text_ko: '시내에 있는 시사이드 랩스요. 프로덕트 매니저예요.',
            reaction: 'Huh. Your rental application said software developer.',
            reaction_ko: '어? 임대 신청서엔 소프트웨어 개발자라고 돼 있던데.'
          },
          {
            text: "It's on the third floor, by the elevators. Nice office.",
            text_ko: '3층 엘리베이터 옆이에요. 사무실이 좋더라고요.',
            reaction: 'Ha! I meant which company, kid.',
            reaction_ko: '하하! 무슨 회사냐고 물은 거야.'
          },
          {
            text: "Just some tech company. You wouldn't have heard of it.",
            text_ko: '그냥 IT 회사예요. 들어도 모르실 거예요.',
            reaction: 'Try me, kid. I read the paper every day.',
            reaction_ko: '말해 봐. 나 신문은 매일 읽는다고.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'Oh, the tech place by the river. Fancy!',
        reply_ko: '아, 강가에 있는 그 IT 회사. 멋지네!'
      },
      {
        speaker: 'carl',
        situation: 'You have never taken this bus before.',
        situation_ko: '이 버스를 타는 건 처음입니다.',
        line: 'The Number 12 should be here any minute. You got your fare?',
        line_ko: '12번 버스가 곧 올 거야. 차비는 있어?',
        prompt: 'You have never paid for this bus. Find out what it costs and how to pay.',
        prompt_ko: '이 버스 요금을 내 본 적이 없습니다. 얼마인지, 어떻게 내는지 알아보세요.',
        model: 'How much is it? Can I just tap my card?',
        model_ko: '얼마예요? 그냥 카드 대면 되나요?',
        distractors: [
          {
            text: "Yeah, I've got it. Thanks for asking.",
            text_ko: '네, 있어요. 물어봐 주셔서 고마워요.',
            reaction: 'Oh yeah? How much is it, then?',
            reaction_ko: '그래? 그럼 얼만데?'
          },
          {
            text: 'How long is the ride? Is it the Number 12?',
            text_ko: '얼마나 걸려요? 12번 버스 맞죠?',
            reaction: 'Yep, the 12, like I just said. But you got your fare?',
            reaction_ko: '그래, 12번이라니까. 그래서 차비는 있냐고.'
          },
          {
            text: 'Do you have change? I only brought a twenty.',
            text_ko: '잔돈 있으세요? 20달러짜리밖에 없어서요.',
            reaction: "Ha, nice try. I'm not your bank, kid.",
            reaction_ko: '하하, 어림없지. 내가 은행이냐.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'Two fifty. Just tap your card on the reader when you get on.',
        reply_ko: '2달러 50센트. 탈 때 단말기에 카드를 대면 돼.'
      },
      {
        speaker: 'carl',
        situation: 'The bus pulls up and the doors open. Carl waves you ahead.',
        situation_ko: '버스가 서고 문이 열립니다. 칼이 먼저 타라고 손짓합니다.',
        line: 'Here it comes. After you! Have a good one.',
        line_ko: '왔다. 먼저 타! 좋은 하루 보내.',
        prompt: 'He lets you get on first. Answer him warmly.',
        prompt_ko: '그가 먼저 타라고 합니다. 따뜻하게 답해 주세요.',
        model: 'Thanks, Carl! You too.',
        model_ko: '고마워요, 칼! 칼도요.',
        distractors: [
          {
            text: 'Thanks! See you at work.',
            text_ko: '고마워요! 회사에서 봬요.',
            reaction: "Ha! I'm not going where you're going, kid.",
            reaction_ko: '하하! 난 너랑 같은 데 안 가.'
          },
          {
            text: 'Uh-huh. Whatever you say.',
            text_ko: '네, 네. 알았다고요.',
            reaction: 'Somebody got up on the wrong side of the bed.',
            reaction_ko: '누가 아침부터 기분이 안 좋은가 보네.'
          },
          {
            text: 'Thanks! Is this the 12?',
            text_ko: '고마워요! 이게 12번이에요?',
            reaction: 'Sure is. Now hop on before he leaves!',
            reaction_ko: '그렇다니까. 기사 출발하기 전에 얼른 타!'
          }
        ],
        reply_speaker: 'carl',
        reply_line: "Knock 'em dead, kid!",
        reply_ko: '가서 한 방 보여 줘!'
      }
    ],
    phrases: [
      {
        id: 'd1_bus.any_minute',
        text: 'It should be here any minute.',
        meaning_ko: '곧 올 거예요.',
        note: '"Any minute" means very soon.',
        note_ko: 'any minute는 곧, 금방이라는 뜻입니다.',
        category: 'commute'
      },
      {
        id: 'd1_bus.have_a_good_one',
        text: 'Have a good one!',
        meaning_ko: '좋은 하루 보내요!',
        note: 'A casual goodbye; answer with "You too!"',
        note_ko: '편한 작별 인사입니다. "You too!"로 답합니다.',
        category: 'small-talk'
      },
      {
        id: 'd1_bus.heading_into_work',
        text: 'Heading into work?',
        meaning_ko: '출근하는 길이에요?',
        note: 'A friendly morning question; "heading" means going.',
        note_ko: '아침에 가볍게 묻는 말입니다. heading은 가는 중이라는 뜻입니다.',
        category: 'commute'
      },
      {
        id: 'd1_bus.knock_em_dead',
        text: "Knock 'em dead!",
        meaning_ko: '가서 멋지게 해내!',
        note: 'Said to cheer someone on before a big day or performance.',
        note_ko: '중요한 날이나 발표를 앞둔 사람을 응원할 때 씁니다.',
        category: 'small-talk'
      },
      {
        id: 'd1_bus.new_gig',
        text: "Where's the new gig?",
        meaning_ko: '새 일자리는 어디예요?',
        note: '"Gig" is a casual word for a job.',
        note_ko: 'gig는 일자리를 가리키는 편한 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'd1_bus.no_kidding',
        text: 'No kidding!',
        meaning_ko: '정말요? / 설마!',
        note: 'Shows surprise at good or surprising news.',
        note_ko: '좋은 소식이나 놀라운 소식에 놀라움을 나타냅니다.',
        category: 'small-talk'
      },
      {
        id: 'd1_bus.tap_card',
        text: 'Can I just tap my card?',
        meaning_ko: '카드를 대기만 하면 돼요?',
        note: 'Most US buses and shops take contactless cards.',
        note_ko: '미국 버스와 가게 대부분은 비접촉 카드를 받습니다.',
        category: 'commute'
      }
    ]
  },
  {
    id: 'd1_coffee',
    title: 'Coffee on the way in',
    title_ko: '출근길 커피 주문',
    place: 'coffee_cart',
    npc: 'nina',
    day_to: 5,
    time_from: '07:00',
    time_to: '10:30',
    summary: 'Order a latte at the coffee cart near the office: size, milk, name, and payment.',
    summary_ko: '회사 근처 커피 카트에서 라테를 주문하세요. 크기, 우유, 이름, 결제까지.',
    reward: -5,
    energy: 9,
    sort: 20,
    tags: 'food,order,coffee',
    turns: [
      {
        speaker: 'nina',
        situation: 'A small coffee cart stands on the corner of Lake Avenue. The barista smiles at you.',
        situation_ko: '레이크 애비뉴 모퉁이에 작은 커피 카트가 있습니다. 바리스타가 웃으며 맞이합니다.',
        line: 'Morning! What can I get started for you?',
        line_ko: '좋은 아침이에요! 뭐 준비해 드릴까요?',
        prompt: "You'd like a latte, not too big and not too small. Order it.",
        prompt_ko: '라테를 마시고 싶습니다. 너무 크지도 작지도 않은 걸로 주문하세요.',
        model: 'Can I get a medium latte, please?',
        model_ko: '라테 미디엄으로 하나 주시겠어요?',
        distractors: [
          {
            text: 'Can I get a large latte, please?',
            text_ko: '라테 라지로 하나 주시겠어요?',
            reaction: "A large? That's our biggest cup. You sure?",
            reaction_ko: '라지요? 제일 큰 컵인데, 괜찮으세요?'
          },
          {
            text: "What's good here? It's my first time.",
            text_ko: '여기 뭐가 맛있어요? 처음 와 봐서요.',
            reaction: 'Everything! But what are you in the mood for?',
            reaction_ko: '다 맛있죠! 근데 뭐가 당기세요?'
          },
          {
            text: 'Latte. Medium. And make it quick.',
            text_ko: '라테. 미디엄. 빨리 좀 주세요.',
            reaction: 'Okay... coming right up.',
            reaction_ko: '네… 바로 해 드릴게요.'
          }
        ],
        reply_speaker: 'nina',
        reply_line: 'You got it. One medium latte.',
        reply_ko: '알겠어요. 라테 미디엄 하나.'
      },
      {
        speaker: 'nina',
        situation: 'Nina reaches for the milk.',
        situation_ko: '니나가 우유 쪽으로 손을 뻗습니다.',
        line: "Any milk preference? We've got whole, skim, oat, and almond.",
        line_ko: '우유는 뭘로 할까요? 일반 우유, 무지방, 귀리, 아몬드 있어요.',
        prompt: "You can't have dairy, and you're allergic to nuts. Pick your milk.",
        prompt_ko: '유제품을 못 먹고 견과류 알레르기가 있습니다. 우유를 고르세요.',
        model: 'Oat milk, please.',
        model_ko: '귀리 우유로 주세요.',
        distractors: [
          {
            text: 'Almond milk, please.',
            text_ko: '아몬드 우유로 주세요.',
            reaction: 'Almond, sure. No nut allergies, right?',
            reaction_ko: '아몬드요. 견과류 알레르기는 없으시죠?'
          },
          {
            text: 'Skim milk, please.',
            text_ko: '무지방 우유로 주세요.',
            reaction: "Skim? That's still regular dairy, just so you know.",
            reaction_ko: '무지방도 우유는 우유예요, 참고로요.'
          },
          {
            text: "Whatever's fine.",
            text_ko: '아무거나 괜찮아요.',
            reaction: "Then I'll just go with whole milk. That okay?",
            reaction_ko: '그럼 그냥 일반 우유로 할게요. 괜찮아요?'
          }
        ],
        reply_speaker: 'nina',
        reply_line: 'Oat milk. Great choice.',
        reply_ko: '귀리 우유. 좋은 선택이에요.'
      },
      {
        speaker: 'nina',
        situation: 'She picks up a paper cup and a marker.',
        situation_ko: '그녀가 종이컵과 마커를 집어 듭니다.',
        line: "And what's the name for the order?",
        line_ko: '주문하시는 분 성함은요?',
        prompt: 'Give her what she needs to write on the cup.',
        prompt_ko: '컵에 적을 수 있게 그녀가 묻는 것을 알려 주세요.',
        model: "It's Jun. J-U-N.",
        model_ko: '준이에요. J-U-N.',
        distractors: [
          {
            text: 'For here, thanks.',
            text_ko: '여기서 먹고 갈게요.',
            reaction: 'Sorry, I meant your name! For the cup.',
            reaction_ko: '아, 성함 여쭤본 거예요! 컵에 쓰려고요.'
          },
          {
            text: "It's June. J-U-N-E.",
            text_ko: '준이에요. J-U-N-E.',
            reaction: 'June with an E? Got it.',
            reaction_ko: '끝에 E 붙는 거죠? 알겠어요.'
          },
          {
            text: 'Why do you need it?',
            text_ko: '그건 왜 필요한데요?',
            reaction: "Just so we don't mix up the cups!",
            reaction_ko: '컵이 안 바뀌게 하려고요!'
          }
        ],
        reply_speaker: 'nina',
        reply_line: 'Got it!',
        reply_ko: '알겠어요!'
      },
      {
        speaker: 'nina',
        situation: 'The card reader lights up.',
        situation_ko: '카드 단말기에 불이 들어옵니다.',
        line: "That'll be four seventy-five. Card or cash?",
        line_ko: '4달러 75센트입니다. 카드예요, 현금이에요?',
        prompt: "You don't have any cash on you. Answer her.",
        prompt_ko: '현금이 하나도 없습니다. 대답하세요.',
        model: "Card, please. I'll just tap.",
        model_ko: '카드로 할게요. 그냥 갖다 댈게요.',
        distractors: [
          {
            text: 'Card. Three seventy-five, right?',
            text_ko: '카드요. 3달러 75센트 맞죠?',
            reaction: 'Four seventy-five, actually.',
            reaction_ko: '4달러 75센트예요.'
          },
          {
            text: 'Cash. Can you break a twenty?',
            text_ko: '현금이요. 20달러 깨 주실 수 있어요?',
            reaction: "Sure, I can. Let's see the twenty.",
            reaction_ko: '그럼요. 20달러 주세요.'
          },
          {
            text: 'Could you add it to my tab?',
            text_ko: '제 앞으로 달아 두실 수 있어요?',
            reaction: "Sorry, we don't do tabs here. Card or cash?",
            reaction_ko: '죄송해요, 외상은 안 돼요. 카드예요, 현금이에요?'
          }
        ],
        reply_speaker: 'nina',
        reply_line: "Perfect. The screen will ask about a tip. Totally up to you! Here's your latte.",
        reply_ko: '좋아요. 화면에 팁을 물어볼 거예요. 전적으로 마음대로 하세요! 라테 나왔어요.'
      }
    ],
    phrases: [
      {
        id: 'd1_coffee.can_i_get',
        text: 'Can I get a medium latte, please?',
        meaning_ko: '라테 미디엄 하나 주시겠어요?',
        note: '"Can I get …?" is the most common way to order in the US.',
        note_ko: '"Can I get …?"은 미국에서 가장 흔한 주문 표현입니다.',
        category: 'food'
      },
      {
        id: 'd1_coffee.card_or_cash',
        text: 'Card or cash?',
        meaning_ko: '카드예요, 현금이에요?',
        note: 'Answer "Card, please." or "Cash."',
        note_ko: '"Card, please." 또는 "Cash."로 답합니다.',
        category: 'shopping'
      },
      {
        id: 'd1_coffee.get_started',
        text: 'What can I get started for you?',
        meaning_ko: '뭘 준비해 드릴까요?',
        note: 'Baristas say this to take your order.',
        note_ko: '바리스타가 주문을 받을 때 하는 말입니다.',
        category: 'food'
      },
      {
        id: 'd1_coffee.milk_preference',
        text: 'Any milk preference?',
        meaning_ko: '우유는 뭘로 할까요?',
        note: 'Common choices: whole, skim (fat-free), oat, almond.',
        note_ko: '보통 whole(일반), skim(무지방), oat(귀리), almond(아몬드) 중에 고릅니다.',
        category: 'food'
      },
      {
        id: 'd1_coffee.name_for_order',
        text: "What's the name for the order?",
        meaning_ko: '주문하신 분 성함이 뭐예요?',
        note: 'They write your name on the cup and call it when it is ready.',
        note_ko: '컵에 이름을 적어 두었다가 음료가 나오면 불러 줍니다.',
        category: 'food'
      },
      {
        id: 'd1_coffee.thatll_be',
        text: "That'll be four seventy-five.",
        meaning_ko: '4달러 75센트입니다.',
        note: 'Prices are said as two numbers: four (dollars) seventy-five (cents).',
        note_ko: '가격은 달러와 센트를 두 숫자로 나눠 말합니다.',
        category: 'shopping'
      },
      {
        id: 'd1_coffee.up_to_you',
        text: 'Totally up to you.',
        meaning_ko: '전적으로 당신 마음이에요.',
        note: 'Means it is your choice. Tips at a coffee counter are optional.',
        note_ko: '당신이 정하라는 뜻입니다. 카운터 커피의 팁은 선택입니다.',
        category: 'food'
      }
    ]
  },
  {
    id: 'd1_badge',
    title: 'Picking up your badge',
    title_ko: '출입증 받기',
    place: 'office_lobby',
    npc: 'tom',
    day_to: 1,
    time_from: '08:00',
    time_to: '10:30',
    summary: 'It is your first day. Introduce yourself at the front desk and get your badge.',
    summary_ko: '첫 출근 날입니다. 프런트에서 자기소개를 하고 출입증을 받으세요.',
    sort: 30,
    tags: 'onboarding,office,intro',
    calendar: { day: 1, time: '08:30', title: 'Pick up your badge at the front desk', title_ko: '프런트에서 출입증 받기' },
    turns: [
      {
        speaker: 'tom',
        situation: 'You walk up to the front desk on your first morning at Seaside Labs.',
        situation_ko: '시사이드 랩스 첫 출근 아침, 프런트 데스크로 다가갑니다.',
        line: 'Hi there! How can I help you?',
        line_ko: '안녕하세요! 무엇을 도와드릴까요?',
        prompt: "Let him know who you are and why you're here this morning.",
        prompt_ko: '당신이 누구인지, 오늘 아침 왜 왔는지 알려 주세요.',
        model: "Hi, I'm Jun. It's my first day here. I'm joining the engineering team as a developer.",
        model_ko: '안녕하세요, 준이라고 해요. 오늘 첫 출근이에요. 엔지니어링 팀에 개발자로 합류해요.',
        distractors: [
          {
            text: "Hi, I'm Jun. I have an interview here at nine this morning. I'm a little early, I think.",
            text_ko: '안녕하세요, 준이에요. 오늘 아침 아홉 시에 여기서 면접이 있어요. 좀 일찍 온 것 같아요.',
            reaction: 'An interview? Hmm, I have you down as a new hire.',
            reaction_ko: '면접이요? 음, 신입 사원으로 등록돼 있는데요.'
          },
          {
            text: "Hi. Is this where I pick up a visitor pass? I'm meeting someone upstairs.",
            text_ko: '안녕하세요. 방문증은 여기서 받나요? 위층에서 누구 만나기로 해서요.',
            reaction: 'Sure. Who are you here to see?',
            reaction_ko: '그럼요. 누구 만나러 오셨어요?'
          },
          {
            text: "Hey! I'm Jun, the new guy. Honestly, I barely slept last night, I'm so nervous.",
            text_ko: '안녕하세요! 준이에요, 신입이요. 솔직히 너무 긴장돼서 어젯밤에 거의 못 잤어요.',
            reaction: 'Ha, deep breaths. Who are you here to see?',
            reaction_ko: '하하, 심호흡하세요. 누구 만나러 오셨죠?'
          }
        ],
        reply_speaker: 'tom',
        reply_line: 'Welcome aboard! You must be the new developer.',
        reply_ko: '환영해요! 새로 온 개발자군요.'
      },
      {
        speaker: 'tom',
        situation: 'Tom pulls up a form on his screen and points a small camera at you.',
        situation_ko: '톰이 화면에 양식을 띄우고 작은 카메라를 당신 쪽으로 돌립니다.',
        line: 'I just need to see a photo ID for the badge.',
        line_ko: '출입증 만들게 사진 있는 신분증만 보여 주세요.',
        prompt: 'Give him what he asked for.',
        prompt_ko: '그가 달라는 것을 건네세요.',
        model: "Sure, here you go. It's my driver's license.",
        model_ko: '네, 여기 있어요. 운전면허증이에요.',
        distractors: [
          {
            text: "Sure, here you go. It's my credit card.",
            text_ko: '네, 여기 있어요. 신용카드예요.',
            reaction: 'Hmm, I need one with your photo on it.',
            reaction_ko: '음, 사진이 있는 걸로 주셔야 해요.'
          },
          {
            text: 'Sure. Do you need my Social Security number too?',
            text_ko: '네. 사회보장번호도 필요하세요?',
            reaction: 'No, no! Just a photo ID is fine.',
            reaction_ko: '아뇨, 아뇨! 사진 있는 신분증이면 돼요.'
          },
          {
            text: 'Seriously? I already sent all that to HR.',
            text_ko: '또요? 그거 인사팀에 다 보냈는데요.',
            reaction: "I know, sorry. It's just for the badge photo.",
            reaction_ko: '알아요, 미안해요. 출입증 사진 때문에 그래요.'
          }
        ],
        reply_speaker: 'tom',
        reply_line: "Thanks. Okay, smile! … Perfect. Here's your badge.",
        reply_ko: '고마워요. 자, 웃어요! … 좋아요. 출입증 여기 있어요.'
      },
      {
        speaker: 'tom',
        situation: 'The badge has your photo on it. It looks a little surprised.',
        situation_ko: '출입증에 당신 사진이 있습니다. 좀 놀란 표정이네요.',
        line: "Tap it on the reader by the glass doors. It'll get you into the building and up to three.",
        line_ko: '유리문 옆 단말기에 대세요. 건물에 들어오고 3층까지 올라갈 수 있어요.',
        prompt: "You're worried about the day you leave it at home. Ask about that.",
        prompt_ko: '출입증을 집에 두고 오는 날이 걱정됩니다. 그때는 어떻게 하는지 물어보세요.',
        model: 'Got it. What should I do if I forget my badge?',
        model_ko: '알겠어요. 출입증을 깜빡하면 어떻게 해요?',
        distractors: [
          {
            text: 'Got it. So it works on every floor, right?',
            text_ko: '알겠어요. 그럼 모든 층에서 되는 거죠?',
            reaction: "Just the lobby and three. That's where you'll be.",
            reaction_ko: '로비랑 3층만요. 일하실 곳이 거기예요.'
          },
          {
            text: 'Can I take it home, or does it stay here?',
            text_ko: '집에 가져가도 돼요, 아니면 여기 두나요?',
            reaction: "Take it with you! You'll need it every morning.",
            reaction_ko: '가져가세요! 매일 아침 필요해요.'
          },
          {
            text: 'Cool. Can I get a better photo? I look weird.',
            text_ko: '좋아요. 사진 다시 찍으면 안 돼요? 이상하게 나왔어요.',
            reaction: 'Ha! Everyone says that. It grows on you.',
            reaction_ko: '하하! 다들 그래요. 보다 보면 정들어요.'
          }
        ],
        reply_speaker: 'tom',
        reply_line: "Just come see me. I'll give you a temporary one for the day.",
        reply_ko: '저한테 오면 돼요. 그날 쓸 임시 출입증을 드릴게요.'
      },
      {
        speaker: 'tom',
        situation: 'Tom points past a row of plants.',
        situation_ko: '톰이 화분들 너머를 가리킵니다.',
        line: "Maya's expecting you on three. The elevators are right past the plants, on your left.",
        line_ko: '마야가 3층에서 기다리고 있어요. 엘리베이터는 화분 바로 지나서 왼쪽이에요.',
        prompt: "He's been a big help. Let him know before you head up.",
        prompt_ko: '그가 많이 도와줬습니다. 올라가기 전에 마음을 전하세요.',
        model: 'Thanks so much, Tom. I appreciate it.',
        model_ko: '정말 고마워요, 톰. 큰 도움이 됐어요.',
        distractors: [
          {
            text: 'Thanks, Tom. Elevators on the right, then?',
            text_ko: '고마워요, 톰. 그럼 엘리베이터는 오른쪽이죠?',
            reaction: 'On your left, right past the plants.',
            reaction_ko: '왼쪽이에요. 화분 바로 지나서요.'
          },
          {
            text: 'Okay, okay. I can find it myself.',
            text_ko: '네, 네. 혼자 찾아갈 수 있어요.',
            reaction: 'Oh. Sure, of course.',
            reaction_ko: '아. 네, 그럼요.'
          },
          {
            text: 'Thanks, Tom. Can you walk me up there?',
            text_ko: '고마워요, 톰. 저 좀 데려다주실 수 있어요?',
            reaction: "I wish I could, but I've got to stay at the desk.",
            reaction_ko: '그러고 싶은데 데스크를 지켜야 해서요.'
          }
        ],
        reply_speaker: 'tom',
        reply_line: 'Anytime. Have a great first day!',
        reply_ko: '언제든지요. 좋은 첫날 보내요!'
      }
    ],
    phrases: [
      {
        id: 'd1_badge.anytime',
        text: 'Anytime.',
        meaning_ko: '언제든지요.',
        note: 'A casual reply to "Thank you."',
        note_ko: '"Thank you."에 편하게 답하는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'd1_badge.first_day',
        text: "It's my first day here.",
        meaning_ko: '오늘 여기 첫 출근이에요.',
        note: 'A friendly way to explain why you do not know your way around yet.',
        note_ko: '아직 이곳을 잘 모른다는 것을 자연스럽게 알리는 표현입니다.',
        category: 'office'
      },
      {
        id: 'd1_badge.here_you_go',
        text: 'Here you go.',
        meaning_ko: '여기 있어요.',
        note: 'Say this when you hand something to someone.',
        note_ko: '무언가를 건네줄 때 하는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'd1_badge.i_appreciate_it',
        text: 'I appreciate it.',
        meaning_ko: '정말 고마워요.',
        note: 'A slightly warmer way to say thank you.',
        note_ko: '고마움을 조금 더 따뜻하게 전하는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'd1_badge.on_three',
        text: "Maya's expecting you on three.",
        meaning_ko: '마야가 3층에서 기다리고 있어요.',
        note: '"On three" means on the third floor.',
        note_ko: 'on three는 3층에서라는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'd1_badge.photo_id',
        text: 'I just need to see a photo ID.',
        meaning_ko: '사진 있는 신분증만 보여 주세요.',
        note: "A photo ID is usually a driver's license or passport.",
        note_ko: 'photo ID는 보통 운전면허증이나 여권입니다.',
        category: 'office'
      },
      {
        id: 'd1_badge.welcome_aboard',
        text: 'Welcome aboard!',
        meaning_ko: '입사를 환영해요!',
        note: 'Said to someone joining a company or team.',
        note_ko: '회사나 팀에 합류한 사람에게 하는 말입니다.',
        category: 'office'
      },
      {
        id: 'd1_badge.what_if_forget',
        text: 'What should I do if I forget my badge?',
        meaning_ko: '출입증을 깜빡하면 어떻게 하죠?',
        note: '"What should I do if …?" asks about a backup plan.',
        note_ko: '"What should I do if …?"는 만일의 경우를 묻는 표현입니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'd1_onboarding',
    title: 'Onboarding with Maya',
    title_ko: '마야와 온보딩',
    place: 'office_manager',
    npc: 'maya',
    day_to: 1,
    time_from: '08:30',
    time_to: '12:00',
    requires: 'd1_badge',
    summary: 'Meet your manager. Get your laptop, ask about access to the code, and learn what the team is building.',
    summary_ko: '매니저를 만납니다. 노트북을 받고, 코드 접근 권한을 묻고, 팀이 무엇을 만드는지 알아보세요.',
    sort: 40,
    tags: 'onboarding,manager,office',
    calendar: { day: 1, time: '09:00', title: 'Onboarding with Maya', title_ko: '마야와 온보딩' },
    turns: [
      {
        speaker: 'maya',
        situation: 'Maya waves you into her office. There is a box with a new laptop on her desk.',
        situation_ko: '마야가 사무실로 들어오라고 손짓합니다. 책상에 새 노트북 상자가 있습니다.',
        line: "Hey, you made it! I'm Maya, your manager. How was the commute?",
        line_ko: '어, 왔네요! 저는 마야, 매니저예요. 출근길은 어땠어요?',
        prompt: 'Tell her how you got here this morning and how it went.',
        prompt_ko: '오늘 아침 어떻게 왔고 어땠는지 말해 주세요.',
        model: 'Not bad at all. I took the bus, and it was pretty easy.',
        model_ko: '괜찮았어요. 버스 타고 왔는데 꽤 수월했어요.',
        distractors: [
          {
            text: 'Not bad at all. I drove in, and parking was pretty easy.',
            text_ko: '괜찮았어요. 차 몰고 왔는데 주차도 꽤 쉬웠어요.',
            reaction: "Really? Easy parking downtown? That's a first.",
            reaction_ko: '정말요? 시내에서 주차가 쉬웠다고요? 처음 듣네요.'
          },
          {
            text: 'Honestly, kind of awful. The guy next to me smelled.',
            text_ko: '솔직히 좀 최악이었어요. 옆 사람한테서 냄새가 나서요.',
            reaction: 'Oh no. Well, welcome to public transit!',
            reaction_ko: '어머. 뭐, 대중교통에 온 걸 환영해요!'
          },
          {
            text: 'Good, thanks! How long have you been at Seaside Labs?',
            text_ko: '좋았어요! 시사이드 랩스에는 얼마나 계셨어요?',
            reaction: "Oh, a while! But how'd you get in today?",
            reaction_ko: '꽤 됐죠! 그보다 오늘 어떻게 왔어요?'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Good to hear. Parking downtown is a nightmare.',
        reply_ko: '다행이네요. 시내 주차는 악몽이거든요.'
      },
      {
        speaker: 'maya',
        situation: 'She slides the laptop box across the desk, along with a monitor cable and a headset.',
        situation_ko: '그녀가 노트북 상자와 모니터 케이블, 헤드셋을 건넵니다.',
        line: 'So, here is your laptop, a monitor, and a headset. IT already set up your email.',
        line_ko: '자, 이건 노트북, 모니터, 헤드셋이에요. IT팀이 이메일은 벌써 설정해 놨어요.',
        prompt: "You can't do much until you can see the code. Thank her and bring that up.",
        prompt_ko: '코드를 볼 수 있어야 일을 시작할 수 있습니다. 고맙다고 하고 그 얘기를 꺼내세요.',
        model: 'Great, thanks. When will I get access to the code repository?',
        model_ko: '좋네요, 고마워요. 코드 저장소 접근 권한은 언제 받을 수 있어요?',
        distractors: [
          {
            text: 'Great, thanks. When will IT set up my work email account?',
            text_ko: '좋네요, 고마워요. IT팀이 업무용 이메일은 언제 만들어 줘요?',
            reaction: 'Already done! Check your inbox.',
            reaction_ko: '벌써 다 됐어요! 받은편지함 확인해 봐요.'
          },
          {
            text: "Thanks. Could I get a second monitor? One's not really enough.",
            text_ko: '고마워요. 모니터 하나 더 받을 수 있을까요? 하나로는 좀 부족해서요.',
            reaction: "Let's see how you do with one first, okay?",
            reaction_ko: '일단 하나로 해 보고 얘기해요, 알았죠?'
          },
          {
            text: 'Great, thanks. I already have access to the repository, right?',
            text_ko: '좋네요, 고마워요. 저장소 접근 권한은 이미 있는 거죠?',
            reaction: "Not yet, actually. That's on the list for today.",
            reaction_ko: '아직요. 그건 오늘 할 일 목록에 있어요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Derek will add you today. He's your onboarding buddy.",
        reply_ko: '데릭이 오늘 추가해 줄 거예요. 그가 온보딩 버디예요.'
      },
      {
        speaker: 'maya',
        situation: 'Maya opens a slide with the team photo.',
        situation_ko: '마야가 팀 사진이 있는 슬라이드를 엽니다.',
        line: "You'll be on the Payments team with Derek and Priya. Any questions about the team?",
        line_ko: '데릭, 프리야와 함께 결제 팀에서 일하게 될 거예요. 팀에 대해 궁금한 거 있어요?',
        prompt: "You want to know what you'll actually be building. Ask her.",
        prompt_ko: '실제로 무엇을 만들게 될지 궁금합니다. 물어보세요.',
        model: "What's the team working on right now?",
        model_ko: '지금 팀에서 무슨 일을 하고 있어요?',
        distractors: [
          {
            text: 'Which floor does the Payments team sit on?',
            text_ko: '결제 팀은 몇 층에 앉아요?',
            reaction: 'Right here on three. But anything about the work?',
            reaction_ko: '여기 3층이요. 일에 대해서는 궁금한 거 없어요?'
          },
          {
            text: 'How soon can I get promoted on this team?',
            text_ko: '이 팀에서는 승진이 얼마나 빨라요?',
            reaction: "Ha! Let's get you through day one first.",
            reaction_ko: '하하! 일단 첫날부터 잘 보내 봐요.'
          },
          {
            text: 'Is it true the Payments team works late a lot?',
            text_ko: '결제 팀이 야근이 많다는 게 사실이에요?',
            reaction: "Who told you that? We're pretty good about hours.",
            reaction_ko: '누가 그래요? 우리 근무 시간 꽤 잘 지켜요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "We're rebuilding the checkout flow for our retail clients. Big project, fun stuff.",
        reply_ko: '소매업 고객들을 위해 결제 흐름을 다시 만들고 있어요. 큰 프로젝트인데 재밌어요.'
      },
      {
        speaker: 'maya',
        situation: 'She closes the laptop and smiles.',
        situation_ko: '그녀가 노트북을 덮고 웃습니다.',
        line: "Anyway, that's a lot for day one. Let me know if you have any questions, okay? My door's always open.",
        line_ko: '아무튼 첫날치고는 많죠. 궁금한 거 있으면 말해요, 알았죠? 내 방은 언제든 열려 있어요.',
        prompt: "She's offering to help anytime. Accept, and show you're grateful.",
        prompt_ko: '언제든 도와주겠다고 합니다. 고마운 마음을 담아 그러겠다고 하세요.',
        model: 'Thanks, Maya. I will. I really appreciate it.',
        model_ko: '고마워요, 마야. 그럴게요. 정말 감사해요.',
        distractors: [
          {
            text: "Thanks, but I'll try not to bother you much.",
            text_ko: '고마워요. 근데 되도록 귀찮게 안 해 드릴게요.',
            reaction: "You won't bother me. That's literally my job.",
            reaction_ko: '귀찮긴요. 그게 바로 내 일인걸요.'
          },
          {
            text: 'Actually, yes. Can we talk about my salary?',
            text_ko: '사실 있어요. 연봉 얘기 좀 할 수 있을까요?',
            reaction: "Uh, let's save that for HR, okay?",
            reaction_ko: '어, 그건 인사팀이랑 얘기해요, 알았죠?'
          },
          {
            text: 'Thanks. Oh, so is your door usually closed?',
            text_ko: '고마워요. 아, 평소엔 문을 닫아 두세요?',
            reaction: 'Ha, no. I mean you can come to me anytime.',
            reaction_ko: '하하, 아뇨. 언제든 찾아와도 된다는 뜻이에요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Great. Go find Derek. He sits by the window.',
        reply_ko: '좋아요. 데릭을 찾아가 봐요. 창가에 앉아요.'
      }
    ],
    phrases: [
      {
        id: 'd1_onboarding.any_questions',
        text: 'Let me know if you have any questions.',
        meaning_ko: '궁금한 거 있으면 말해 주세요.',
        note: 'Very common at work. Answer "Will do, thanks!"',
        note_ko: '직장에서 매우 흔한 말입니다. "Will do, thanks!"로 답합니다.',
        category: 'office'
      },
      {
        id: 'd1_onboarding.door_always_open',
        text: "My door's always open.",
        meaning_ko: '언제든 찾아와도 돼요.',
        note: "A manager's way to say you can come talk anytime.",
        note_ko: '언제든 이야기하러 와도 된다는 매니저의 말입니다.',
        category: 'office'
      },
      {
        id: 'd1_onboarding.get_access',
        text: 'When will I get access to the code repository?',
        meaning_ko: '코드 저장소 권한은 언제 받나요?',
        note: 'Ask this when you need permissions for a system.',
        note_ko: '어떤 시스템의 권한이 필요할 때 묻는 표현입니다.',
        category: 'office'
      },
      {
        id: 'd1_onboarding.how_was_commute',
        text: 'How was the commute?',
        meaning_ko: '출근길은 어땠어요?',
        note: '"Commute" is the trip between home and work.',
        note_ko: 'commute는 집과 직장 사이를 오가는 길입니다.',
        category: 'commute'
      },
      {
        id: 'd1_onboarding.nightmare',
        text: 'Parking downtown is a nightmare.',
        meaning_ko: '시내 주차는 악몽이에요.',
        note: '"A nightmare" = very difficult or annoying.',
        note_ko: 'a nightmare는 몹시 힘들거나 짜증 나는 일을 뜻합니다.',
        category: 'small-talk'
      },
      {
        id: 'd1_onboarding.onboarding_buddy',
        text: 'onboarding buddy',
        meaning_ko: '온보딩 버디(적응 도우미 동료)',
        note: 'A coworker who helps a new hire in the first weeks.',
        note_ko: '신입의 첫 몇 주를 도와주는 동료입니다.',
        category: 'office'
      },
      {
        id: 'd1_onboarding.working_on',
        text: "What's the team working on right now?",
        meaning_ko: '팀은 지금 무슨 일을 하고 있어요?',
        note: 'A good question for your first days on a team.',
        note_ko: '팀에 합류한 첫날들에 하기 좋은 질문입니다.',
        category: 'office'
      },
      {
        id: 'd1_onboarding.you_made_it',
        text: 'You made it!',
        meaning_ko: '잘 왔어요! / 무사히 왔네요!',
        note: 'A warm greeting when someone arrives, especially for the first time.',
        note_ko: '누군가 도착했을 때, 특히 처음 왔을 때 반갑게 하는 인사입니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'd1_standup',
    title: 'Your first standup',
    title_ko: '첫 스탠드업 회의',
    place: 'office_meeting',
    npc: 'priya',
    day_to: 1,
    time_from: '09:30',
    time_to: '12:30',
    requires: 'd1_onboarding',
    summary: 'The daily standup: say hello to the team, then share what you are doing today and your blockers.',
    summary_ko: '데일리 스탠드업: 팀에 인사하고, 오늘 할 일과 막힌 점(blocker)을 공유하세요.',
    sort: 45,
    tags: 'meeting,standup',
    calendar: { day: 1, time: '10:00', title: 'Daily standup', title_ko: '데일리 스탠드업' },
    turns: [
      {
        speaker: 'priya',
        situation: 'Six people stand around a screen in the meeting room. Priya, the product manager, is running the meeting.',
        situation_ko: '회의실 화면 앞에 여섯 명이 서 있습니다. 프로덕트 매니저 프리야가 회의를 진행합니다.',
        line: "Okay, let's get started. Oh, we have someone new! Want to say a quick hello?",
        line_ko: '자, 시작할게요. 어, 새로운 분이 있네요! 간단히 인사할래요?',
        prompt: 'Everyone is looking at you. Keep it short and friendly.',
        prompt_ko: '모두가 당신을 보고 있습니다. 짧고 친근하게 인사하세요.',
        model: "Hi, everyone. I'm Jun. I just joined as a developer. Excited to be here!",
        model_ko: '안녕하세요, 여러분. 준이에요. 개발자로 막 합류했어요. 함께하게 돼서 기뻐요!',
        distractors: [
          {
            text: "Hey, all. Jun here. I'm the new product manager, so nice to meet you.",
            text_ko: '안녕하세요, 여러분. 준이에요. 새로 온 프로덕트 매니저예요. 반가워요.',
            reaction: "Ha, I think that's me! You're our new developer, right?",
            reaction_ko: '하하, 그건 저 같은데요! 새로 온 개발자죠?'
          },
          {
            text: "Hi. I'm Jun. Before we start, can I ask a few questions about the project?",
            text_ko: '안녕하세요. 준이에요. 시작하기 전에 프로젝트에 대해 몇 가지 물어봐도 될까요?',
            reaction: "Let's save those for after standup, okay?",
            reaction_ko: '그건 스탠드업 끝나고 물어봐요, 알았죠?'
          },
          {
            text: 'Hello. My name is Jun. I am a developer. That is all for now.',
            text_ko: '안녕하십니까. 이름은 준입니다. 개발자입니다. 이상입니다.',
            reaction: 'Okay! Um, welcome, Jun.',
            reaction_ko: '네! 어, 환영해요, 준.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Welcome! We're so happy to have you.",
        reply_ko: '환영해요! 와 줘서 정말 기뻐요.'
      },
      {
        speaker: 'priya',
        situation: 'Everyone else has already said what they did yesterday. Now it is your turn.',
        situation_ko: '다른 사람들은 어제 한 일을 이미 말했습니다. 이제 당신 차례입니다.',
        line: "The format is yesterday, today, and blockers. Since it's your first day, just tell us: what's on your plate today?",
        line_ko: '형식은 어제, 오늘, 블로커예요. 첫날이니까 그냥 말해 줘요. 오늘 할 일이 뭐예요?',
        prompt: "Tell the team what you'll spend today on. You just got your new laptop.",
        prompt_ko: '오늘 무엇을 할지 팀에 말하세요. 새 노트북을 막 받았습니다.',
        model: "Today I'm setting up my laptop and my dev environment.",
        model_ko: '오늘은 노트북이랑 개발 환경을 세팅해요.',
        distractors: [
          {
            text: 'Yesterday I finished my HR paperwork, so nothing new.',
            text_ko: '어제 인사팀 서류를 다 끝내서 새로운 건 없어요.',
            reaction: 'Sure, but what about today?',
            reaction_ko: '좋아요, 근데 오늘은요?'
          },
          {
            text: "Today I'm going to fix a few bugs and ship a feature.",
            text_ko: '오늘은 버그 몇 개 고치고 기능 하나 출시할 거예요.',
            reaction: 'Whoa, ambitious! Maybe start with your laptop?',
            reaction_ko: '와, 의욕 넘치네요! 노트북부터 시작하는 게 어때요?'
          },
          {
            text: "Today I'm just waiting for IT to set up my email.",
            text_ko: '오늘은 그냥 IT팀이 이메일 만들어 주길 기다려요.',
            reaction: "Oh, I think your email's already set up. Check?",
            reaction_ko: '어, 이메일은 이미 설정됐을 거예요. 확인해 볼래요?'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Perfect. That's exactly what day one should look like.",
        reply_ko: '좋아요. 첫날은 딱 그래야죠.'
      },
      {
        speaker: 'priya',
        situation: 'Priya looks at you over her laptop.',
        situation_ko: '프리야가 노트북 너머로 당신을 봅니다.',
        line: 'Any blockers?',
        line_ko: '블로커 있어요?',
        prompt: "Mention the one thing that's still stopping you from working on the code.",
        prompt_ko: '아직 코드 작업을 못 하게 막고 있는 한 가지를 말하세요.',
        model: "Just one. I don't have access to the repository yet.",
        model_ko: '하나 있어요. 아직 저장소 접근 권한이 없어요.',
        distractors: [
          {
            text: "Nope, none. Everything's going great so far!",
            text_ko: '아뇨, 없어요. 지금까지 다 순조로워요!',
            reaction: "Love that! So you're all set up already?",
            reaction_ko: '좋네요! 그럼 세팅은 벌써 다 된 거예요?'
          },
          {
            text: "Yeah. Derek still hasn't given me access to the repo.",
            text_ko: '네. 데릭이 아직 저장소 권한을 안 줬어요.',
            reaction: "Oh, it's only ten. Give him a chance!",
            reaction_ko: '아, 아직 열 시예요. 기회는 줘야죠!'
          },
          {
            text: "Just one. I still don't have my laptop from IT.",
            text_ko: '하나 있어요. 아직 IT팀한테 노트북을 못 받았어요.',
            reaction: 'Really? I thought Maya handed you one this morning.',
            reaction_ko: '정말요? 아침에 마야가 하나 줬다고 들었는데요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'Derek, can you help with that after standup? … Great, he says yes.',
        reply_ko: '데릭, 스탠드업 끝나고 그거 도와줄 수 있어요? … 좋아요, 된대요.'
      },
      {
        speaker: 'priya',
        situation: 'The meeting took twelve minutes. People start to leave.',
        situation_ko: '회의는 12분 걸렸습니다. 사람들이 나가기 시작합니다.',
        line: "That's it for today. Short and sweet. Thanks, everyone!",
        line_ko: '오늘은 여기까지예요. 짧고 굵게. 다들 고마워요!',
        prompt: "The meeting started at ten. Ask Priya whether that's the daily schedule.",
        prompt_ko: '회의는 열 시에 시작했습니다. 매일 이 시간인지 프리야에게 물어보세요.',
        model: 'Thanks! Is standup every day at ten?',
        model_ko: '고마워요! 스탠드업은 매일 열 시예요?',
        distractors: [
          {
            text: 'Thanks! Is standup every day at nine?',
            text_ko: '고마워요! 스탠드업은 매일 아홉 시예요?',
            reaction: "Ten, actually. Nine's way too early for us!",
            reaction_ko: '열 시예요. 아홉 시는 너무 이르죠!'
          },
          {
            text: 'Thanks! Do I have to come every day?',
            text_ko: '고마워요! 저도 매일 와야 해요?',
            reaction: "Um, yes. That's kind of the point.",
            reaction_ko: '음, 네. 원래 그런 거예요.'
          },
          {
            text: 'Thanks! Was that a long one today?',
            text_ko: '고마워요! 오늘은 긴 편이었나요?',
            reaction: 'Long? That was twelve minutes!',
            reaction_ko: '길었다고요? 12분 했는데요!'
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'Every weekday at ten, fifteen minutes max. See you tomorrow!',
        reply_ko: '평일 매일 열 시, 길어야 15분이에요. 내일 봐요!'
      }
    ],
    phrases: [
      {
        id: 'd1_standup.any_blockers',
        text: 'Any blockers?',
        meaning_ko: '막힌 거 있어요?',
        note: 'A blocker is anything that stops your work. Say "No blockers" if there are none.',
        note_ko: 'blocker는 일을 막는 모든 것입니다. 없으면 "No blockers."라고 합니다.',
        category: 'meeting'
      },
      {
        id: 'd1_standup.dont_have_access',
        text: "I don't have access to the repository yet.",
        meaning_ko: '아직 저장소 권한이 없어요.',
        note: 'A common blocker for new hires.',
        note_ko: '신입에게 흔한 blocker입니다.',
        category: 'office'
      },
      {
        id: 'd1_standup.excited_to_be_here',
        text: 'Excited to be here!',
        meaning_ko: '함께하게 돼서 설레요!',
        note: 'A friendly end to a self-introduction at work.',
        note_ko: '직장에서 자기소개를 밝게 마무리하는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'd1_standup.fifteen_max',
        text: 'fifteen minutes max',
        meaning_ko: '길어야 15분',
        note: '"Max" (maximum) after a number means "at most".',
        note_ko: '숫자 뒤의 max는 "최대"라는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'd1_standup.lets_get_started',
        text: "Let's get started.",
        meaning_ko: '시작합시다.',
        note: 'The usual way to open a meeting.',
        note_ko: '회의를 시작할 때 흔히 하는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'd1_standup.on_your_plate',
        text: "What's on your plate today?",
        meaning_ko: '오늘 할 일이 뭐예요?',
        note: '"On your plate" = the work you have to do.',
        note_ko: 'on your plate는 해야 할 일을 뜻합니다.',
        category: 'meeting'
      },
      {
        id: 'd1_standup.short_and_sweet',
        text: 'Short and sweet.',
        meaning_ko: '짧고 굵게.',
        note: 'Brief and pleasant; people like short meetings.',
        note_ko: '짧고 좋다는 뜻입니다. 사람들은 짧은 회의를 좋아합니다.',
        category: 'meeting'
      },
      {
        id: 'd1_standup.thats_it',
        text: "That's it for today.",
        meaning_ko: '오늘은 여기까지예요.',
        note: 'Ends a meeting or a list.',
        note_ko: '회의나 목록을 끝낼 때 씁니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'd1_desk',
    title: 'Your desk and dev setup',
    title_ko: '자리 안내와 개발 환경',
    place: 'office_desk_team',
    npc: 'derek',
    day_to: 1,
    time_from: '09:30',
    time_to: '17:30',
    requires: 'd1_onboarding',
    summary: 'Meet Derek, your onboarding buddy. He shows you your desk and how the team works.',
    summary_ko: '온보딩 버디 데릭을 만납니다. 자리와 팀의 일하는 방식을 알려 줍니다.',
    sort: 50,
    tags: 'coworker,dev,onboarding',
    calendar: { day: 1, time: '11:00', title: 'Desk and dev setup with Derek', title_ko: '데릭과 자리·개발 환경 세팅' },
    turns: [
      {
        speaker: 'derek',
        situation: 'A man in a hoodie looks up from two monitors by the window.',
        situation_ko: '창가에서 모니터 두 대를 보던 후드티 차림의 남자가 고개를 듭니다.',
        line: 'Hey! You must be the new hire. Derek. Welcome to the team!',
        line_ko: '어이! 새로 온 분이죠? 데릭이에요. 팀에 온 걸 환영해요!',
        prompt: 'Return the greeting and tell him who you are.',
        prompt_ko: '인사를 받고 당신이 누구인지 말하세요.',
        model: "Hi, I'm Jun. Nice to meet you, Derek.",
        model_ko: '안녕하세요, 준이에요. 만나서 반가워요, 데릭.',
        distractors: [
          {
            text: "Hi, I'm Jun. Nice to meet you, Tom.",
            text_ko: '안녕하세요, 준이에요. 만나서 반가워요, 톰.',
            reaction: "Derek, actually. Tom's the guy at the front desk.",
            reaction_ko: '데릭이에요. 톰은 프런트 데스크에 있는 사람이고요.'
          },
          {
            text: 'Thanks. Are you my manager, then?',
            text_ko: '고마워요. 그럼 데릭이 제 매니저세요?',
            reaction: "Ha, no, that's Maya. I'm just your buddy.",
            reaction_ko: '하하, 아뇨, 그건 마야죠. 난 그냥 버디예요.'
          },
          {
            text: 'Yeah, hi. So which desk is mine?',
            text_ko: '네, 안녕하세요. 제 자리는 어디예요?',
            reaction: 'Uh, right. Straight to business, huh?',
            reaction_ko: '어, 그래요. 바로 본론이네요?'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Likewise. So this is your desk, right next to mine.',
        reply_ko: '저도요. 여기가 당신 자리예요, 제 바로 옆.'
      },
      {
        speaker: 'derek',
        situation: 'Your monitor is already plugged in. A sticky note says "Welcome!"',
        situation_ko: '모니터는 이미 연결돼 있습니다. 포스트잇에 "Welcome!"이라고 쓰여 있습니다.',
        line: 'Have you set up your dev environment yet?',
        line_ko: '개발 환경 세팅은 했어요?',
        prompt: "You haven't started yet. Ask if there are written instructions to follow.",
        prompt_ko: '아직 시작도 못 했습니다. 따라 할 문서가 있는지 물어보세요.',
        model: 'Not yet. Is there a setup guide I can follow?',
        model_ko: '아직요. 따라 할 수 있는 설치 가이드가 있어요?',
        distractors: [
          {
            text: 'Yeah, I finished it this morning. All good.',
            text_ko: '네, 오늘 아침에 다 끝냈어요. 문제없어요.',
            reaction: "Already? Wait, how'd you clone without access?",
            reaction_ko: '벌써요? 잠깐, 권한도 없이 어떻게 클론했어요?'
          },
          {
            text: 'Not yet. Could you just set it up for me?',
            text_ko: '아직요. 그냥 대신 세팅해 주시면 안 돼요?',
            reaction: "Ha, nice try. You'll learn more doing it yourself.",
            reaction_ko: '하하, 어림없죠. 직접 해 봐야 더 많이 배워요.'
          },
          {
            text: 'Not yet. Is it okay if I use my own laptop?',
            text_ko: '아직요. 제 개인 노트북 써도 괜찮아요?',
            reaction: 'Better not. Security would have my head.',
            reaction_ko: '안 쓰는 게 좋아요. 보안팀한테 혼나요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Yep, it's in the README. Clone the repo, run the setup script, and go grab a coffee. It takes a while.",
        reply_ko: '네, README에 있어요. 저장소를 클론하고 설치 스크립트를 돌린 다음 커피 한 잔 하고 와요. 좀 걸려요.'
      },
      {
        speaker: 'derek',
        situation: 'The setup script starts printing hundreds of lines.',
        situation_ko: '설치 스크립트가 수백 줄을 쏟아내기 시작합니다.',
        line: "If the tests fail on your machine, don't worry. It happens to everybody.",
        line_ko: '테스트가 당신 컴퓨터에서 실패해도 걱정하지 마요. 다들 그래요.',
        prompt: 'You want to know where to turn when something goes wrong.',
        prompt_ko: '문제가 생기면 누구를 찾아가야 할지 알고 싶습니다.',
        model: 'Good to know. Who should I ask if I get stuck?',
        model_ko: '알아 두면 좋겠네요. 막히면 누구한테 물어봐요?',
        distractors: [
          {
            text: 'Good to know. So I can skip the failing tests?',
            text_ko: '알아 두면 좋겠네요. 그럼 실패하는 테스트는 건너뛰어도 돼요?',
            reaction: "Whoa, no. Don't skip them. Just don't panic.",
            reaction_ko: '워, 안 돼요. 건너뛰진 말고, 당황하지 말라는 거예요.'
          },
          {
            text: "That won't happen to me. I'm pretty careful.",
            text_ko: '저한텐 그런 일 없을 거예요. 꽤 꼼꼼하거든요.',
            reaction: 'Famous last words, my friend.',
            reaction_ko: '다들 그렇게 말하죠.'
          },
          {
            text: 'Okay. So how long does the script usually take?',
            text_ko: '알겠어요. 근데 스크립트는 보통 얼마나 걸려요?',
            reaction: 'Like I said, a while. Go grab that coffee.',
            reaction_ko: '말했잖아요, 좀 걸린다고. 커피나 마시고 와요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Just ping me on chat. Seriously, no question is too dumb.',
        reply_ko: '채팅으로 그냥 불러요. 진짜로, 멍청한 질문은 없어요.'
      },
      {
        speaker: 'derek',
        situation: 'Derek opens a pull request on his screen to show you.',
        situation_ko: '데릭이 보여 주려고 화면에 풀 리퀘스트를 엽니다.',
        line: "We push code through pull requests. I'll review your first one. Sound good?",
        line_ko: '코드는 풀 리퀘스트로 올려요. 첫 PR은 내가 리뷰할게요. 괜찮죠?',
        prompt: "You're happy with that plan. Let him know you're grateful.",
        prompt_ko: '그렇게 하면 좋겠습니다. 고마운 마음을 전하세요.',
        model: 'Sounds good. Thanks for your help, Derek.',
        model_ko: '좋아요. 도와줘서 고마워요, 데릭.',
        distractors: [
          {
            text: "Sure, but I doubt you'll find much to fix.",
            text_ko: '좋아요. 근데 고칠 게 별로 없을 거예요.',
            reaction: "Ha. We'll see about that.",
            reaction_ko: '하. 두고 보죠.'
          },
          {
            text: 'Sounds good. Can I just push to main, though?',
            text_ko: '좋아요. 그냥 main에 푸시하면 안 돼요?',
            reaction: 'Nope. Everything goes through a PR. Everything.',
            reaction_ko: '안 돼요. 전부 PR로 가요. 전부요.'
          },
          {
            text: 'Sounds good. So Maya reviews all my PRs?',
            text_ko: '좋아요. 그럼 제 PR은 다 마야가 리뷰해요?',
            reaction: 'No, I will. At least your first one.',
            reaction_ko: '아뇨, 내가 해요. 적어도 첫 번째는요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Anytime. Welcome aboard, for real.',
        reply_ko: '언제든지요. 진심으로 환영해요.'
      }
    ],
    phrases: [
      {
        id: 'd1_desk.get_stuck',
        text: 'Who should I ask if I get stuck?',
        meaning_ko: '막히면 누구에게 물어봐야 해요?',
        note: '"Get stuck" = be unable to continue.',
        note_ko: 'get stuck은 더 진행하지 못하게 되는 것입니다.',
        category: 'office'
      },
      {
        id: 'd1_desk.happens_to_everybody',
        text: 'It happens to everybody.',
        meaning_ko: '누구나 겪는 일이에요.',
        note: 'Makes someone feel better about a problem.',
        note_ko: '문제를 겪는 사람을 안심시키는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'd1_desk.it_takes_a_while',
        text: 'It takes a while.',
        meaning_ko: '시간이 좀 걸려요.',
        note: '"A while" is an unclear, fairly long time.',
        note_ko: 'a while은 꽤 긴, 정해지지 않은 시간입니다.',
        category: 'office'
      },
      {
        id: 'd1_desk.likewise',
        text: 'Likewise.',
        meaning_ko: '저도요.',
        note: 'A short answer to "Nice to meet you."',
        note_ko: '"Nice to meet you."에 대한 짧은 대답입니다.',
        category: 'small-talk'
      },
      {
        id: 'd1_desk.new_hire',
        text: 'You must be the new hire.',
        meaning_ko: '새로 온 분이군요.',
        note: '"New hire" = a person who just joined the company.',
        note_ko: 'new hire는 막 입사한 사람입니다.',
        category: 'office'
      },
      {
        id: 'd1_desk.ping_me',
        text: 'Just ping me.',
        meaning_ko: '그냥 메시지 줘요.',
        note: '"Ping" = send a quick message on chat.',
        note_ko: 'ping은 채팅으로 짧게 연락하는 것입니다.',
        category: 'office'
      },
      {
        id: 'd1_desk.setup_guide',
        text: 'Is there a setup guide I can follow?',
        meaning_ko: '따라 할 수 있는 설치 가이드가 있나요?',
        note: 'Ask for documentation instead of guessing.',
        note_ko: '짐작하지 말고 문서를 요청하는 표현입니다.',
        category: 'office'
      },
      {
        id: 'd1_desk.sound_good',
        text: 'Sound good?',
        meaning_ko: '괜찮죠?',
        note: 'Checks if you agree. Answer "Sounds good!"',
        note_ko: '동의하는지 확인하는 말입니다. "Sounds good!"으로 답합니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'd1_lunch',
    title: 'Lunch at the diner',
    title_ko: '다이너에서 점심',
    place: 'diner_counter',
    npc: 'rosa',
    day_to: 5,
    time_from: '11:30',
    time_to: '14:30',
    summary: 'Order a burger at the Sunny Side Diner: how you want it cooked, for here or to go, the check, and the tip.',
    summary_ko: '서니 사이드 다이너에서 버거를 주문하세요. 굽기, 먹고 갈지 포장할지, 계산서와 팁까지.',
    reward: -20,
    energy: 40,
    sort: 60,
    tags: 'food,diner,tipping',
    calendar: { day: 1, time: '12:00', title: 'Lunch break', title_ko: '점심시간' },
    turns: [
      {
        speaker: 'rosa',
        situation: 'The diner smells like coffee and bacon. A server with a pencil behind her ear waves you to the counter.',
        situation_ko: '다이너에 커피와 베이컨 냄새가 납니다. 귀에 연필을 꽂은 종업원이 카운터로 오라고 손짓합니다.',
        line: 'Hi, hon! Just one today? Sit anywhere you like. What can I get you?',
        line_ko: '어서 와요! 오늘 혼자예요? 아무 데나 앉아요. 뭐 드릴까요?',
        prompt: "You're in the mood for a burger with cheese on it. Order.",
        prompt_ko: '치즈가 올라간 버거가 먹고 싶습니다. 주문하세요.',
        model: 'Can I get a cheeseburger, please?',
        model_ko: '치즈버거 하나 주시겠어요?',
        distractors: [
          {
            text: 'Can I get a hamburger, no cheese?',
            text_ko: '햄버거 하나요, 치즈는 빼고요.',
            reaction: 'Plain hamburger, no cheese. You sure, hon?',
            reaction_ko: '치즈 없는 그냥 햄버거요? 정말요?'
          },
          {
            text: 'Could I see a menu first, please?',
            text_ko: '메뉴판 먼저 볼 수 있을까요?',
            reaction: 'Sure, hon. But you look like you know what you want.',
            reaction_ko: '그럼요. 근데 뭐 먹을지 이미 정한 얼굴인데요.'
          },
          {
            text: 'Cheeseburger. And can you hurry up?',
            text_ko: '치즈버거요. 좀 빨리 주실래요?',
            reaction: 'Well, okay then. Coming right up.',
            reaction_ko: '어, 그래요. 금방 나와요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Sure thing.',
        reply_ko: '그럼요.'
      },
      {
        speaker: 'rosa',
        situation: 'Rosa writes on her notepad.',
        situation_ko: '로사가 수첩에 적습니다.',
        line: 'How would you like that cooked?',
        line_ko: '굽기는 어떻게 해 드릴까요?',
        prompt: 'You like your burger a little pink in the middle. Tell her.',
        prompt_ko: '버거는 가운데가 살짝 분홍빛인 게 좋습니다. 말해 주세요.',
        model: 'Medium, please.',
        model_ko: '미디엄으로 해 주세요.',
        distractors: [
          {
            text: 'Well-done, please.',
            text_ko: '웰던으로 해 주세요.',
            reaction: 'Well-done. No pink at all, then.',
            reaction_ko: '웰던이요. 분홍빛은 하나도 없겠네요.'
          },
          {
            text: 'Rare, please.',
            text_ko: '레어로 해 주세요.',
            reaction: "Rare? That's pretty red in there, hon.",
            reaction_ko: '레어요? 속이 꽤 빨간데, 괜찮아요?'
          },
          {
            text: 'Cheddar, please.',
            text_ko: '체다 치즈로 주세요.',
            reaction: 'Cheddar it is. And how cooked, hon?',
            reaction_ko: '체다로 할게요. 그럼 굽기는요?'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Medium, you got it.',
        reply_ko: '미디엄, 알겠어요.'
      },
      {
        speaker: 'rosa',
        situation: 'She taps the pencil on the pad.',
        situation_ko: '그녀가 연필로 수첩을 톡톡 칩니다.',
        line: 'Comes with fries or a side salad. And is that for here or to go?',
        line_ko: '감자튀김이나 샐러드 중에 고를 수 있어요. 여기서 드세요, 가져가세요?',
        prompt: "You want the fried side, and you're eating right here at the counter.",
        prompt_ko: '튀긴 사이드를 원하고, 여기 카운터에서 먹고 갈 겁니다.',
        model: "Fries, please. And it's for here.",
        model_ko: '감자튀김으로 주세요. 여기서 먹을게요.',
        distractors: [
          {
            text: "Side salad, please. And I'll eat here.",
            text_ko: '샐러드로 주세요. 여기서 먹을게요.',
            reaction: "Salad, got it. Oh, you didn't want the fries?",
            reaction_ko: '샐러드요. 감자튀김은 싫으세요?'
          },
          {
            text: 'Fries. And can you make it to go?',
            text_ko: '감자튀김이요. 포장해 주실 수 있어요?',
            reaction: "Sure, I'll box it up for you.",
            reaction_ko: '그럼요, 포장해 드릴게요.'
          },
          {
            text: "Fries, please. And yes, it's for one.",
            text_ko: '감자튀김이요. 네, 한 명이에요.',
            reaction: 'Got that. But for here or to go, hon?',
            reaction_ko: '그건 알아요. 근데 여기서 드세요, 가져가세요?'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: "It'll be right out, hon.",
        reply_ko: '금방 나와요.'
      },
      {
        speaker: 'rosa',
        situation: 'You finish the burger. It was really good.',
        situation_ko: '버거를 다 먹었습니다. 정말 맛있었어요.',
        line: 'How was everything? Can I get you anything else?',
        line_ko: '다 괜찮았어요? 더 필요한 거 있어요?',
        prompt: "You loved it, and you're ready to pay.",
        prompt_ko: '정말 맛있었고, 이제 계산하고 싶습니다.',
        model: 'It was great, thanks. Could I get the check, please?',
        model_ko: '정말 맛있었어요, 고마워요. 계산서 좀 주시겠어요?',
        distractors: [
          {
            text: 'It was great, thanks. Could I get a slice of pie, too?',
            text_ko: '정말 맛있었어요, 고마워요. 파이도 한 조각 주시겠어요?',
            reaction: 'Ooh, good call. Apple or cherry?',
            reaction_ko: '오, 좋은 선택이에요. 사과, 체리 중에 뭘로요?'
          },
          {
            text: 'It was okay. The fries were a little cold, honestly.',
            text_ko: '그냥 그랬어요. 솔직히 감자튀김이 좀 식었더라고요.',
            reaction: "Oh no, I'm sorry, hon. Want me to take some off?",
            reaction_ko: '어머, 미안해요. 좀 깎아 드릴까요?'
          },
          {
            text: "Nope. Just the check. I've got to get back to work.",
            text_ko: '아뇨. 계산서만 주세요. 빨리 회사 들어가 봐야 해서요.',
            reaction: 'Sure thing. Here you go.',
            reaction_ko: '그래요. 여기 있어요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Here you go, hon. You can pay me right here.',
        reply_ko: '여기 있어요. 여기서 바로 계산하면 돼요.'
      },
      {
        speaker: 'rosa',
        situation: 'The check says $16.50 with tax. You have a twenty-dollar bill.',
        situation_ko: '계산서에는 세금 포함 16.50달러라고 적혀 있습니다. 20달러 지폐가 있습니다.',
        line: 'Sixteen fifty. Whenever you are ready.',
        line_ko: '16달러 50센트예요. 준비되면 주세요.',
        prompt: 'Pay with the bill you have, and leave whatever is left over for her as a tip.',
        prompt_ko: '가진 지폐로 내고, 남는 돈은 팁으로 주세요.',
        model: "Here's a twenty. Keep the change.",
        model_ko: '여기 20달러요. 거스름돈은 가지세요.',
        distractors: [
          {
            text: "Here's a ten. Keep the change.",
            text_ko: '여기 10달러요. 거스름돈은 가지세요.',
            reaction: "Hon, that's a ten. It's sixteen fifty.",
            reaction_ko: '손님, 이건 10달러예요. 16달러 50센트인데요.'
          },
          {
            text: "Here's a twenty. Can I get my change?",
            text_ko: '여기 20달러요. 거스름돈 주시겠어요?',
            reaction: 'Of course. Three fifty, coming right up.',
            reaction_ko: '그럼요. 3달러 50센트 바로 드릴게요.'
          },
          {
            text: 'Do I pay you or up at the register?',
            text_ko: '여기서 내요, 아니면 계산대에서 내요?',
            reaction: "Right here's fine, like I said.",
            reaction_ko: '여기서 내면 된다니까요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Aw, thank you, hon! Come back and see us.',
        reply_ko: '어머, 고마워요! 또 와요.'
      }
    ],
    phrases: [
      {
        id: 'd1_lunch.for_here_or_to_go',
        text: 'For here or to go?',
        meaning_ko: '드시고 가세요, 포장하세요?',
        note: '"To go" = takeout. The British say "takeaway".',
        note_ko: 'to go는 포장입니다. 영국에서는 takeaway라고 합니다.',
        category: 'food'
      },
      {
        id: 'd1_lunch.hon',
        text: 'hon',
        meaning_ko: '(다정한 호칭) 자기, 손님',
        note: 'Short for "honey"; some servers call everyone this.',
        note_ko: 'honey의 줄임말로, 누구에게나 이렇게 부르는 종업원도 있습니다.',
        category: 'food'
      },
      {
        id: 'd1_lunch.how_cooked',
        text: 'How would you like that cooked?',
        meaning_ko: '어떻게 익혀 드릴까요?',
        note: 'Answer rare, medium rare, medium, medium well, or well done.',
        note_ko: 'rare, medium rare, medium, medium well, well done 중에 답합니다.',
        category: 'food'
      },
      {
        id: 'd1_lunch.how_was_everything',
        text: 'How was everything?',
        meaning_ko: '음식은 어떠셨어요?',
        note: 'Servers ask this near the end. "Great, thanks!" is enough.',
        note_ko: '식사가 끝날 즈음 묻는 말입니다. "Great, thanks!"면 충분합니다.',
        category: 'food'
      },
      {
        id: 'd1_lunch.keep_the_change',
        text: 'Keep the change.',
        meaning_ko: '거스름돈은 가지세요.',
        note: 'The extra becomes the tip. At a sit-down restaurant, tip 15-20%.',
        note_ko: '남는 돈이 팁이 됩니다. 앉아서 먹는 식당에서는 15~20%를 줍니다.',
        category: 'food'
      },
      {
        id: 'd1_lunch.right_out',
        text: "It'll be right out.",
        meaning_ko: '금방 나와요.',
        note: 'Your food is coming soon.',
        note_ko: '음식이 곧 나온다는 뜻입니다.',
        category: 'food'
      },
      {
        id: 'd1_lunch.sit_anywhere',
        text: 'Sit anywhere you like.',
        meaning_ko: '아무 데나 앉으세요.',
        note: 'At many diners you seat yourself.',
        note_ko: '많은 다이너에서는 알아서 자리에 앉습니다.',
        category: 'food'
      },
      {
        id: 'd1_lunch.the_check',
        text: 'Could I get the check, please?',
        meaning_ko: '계산서 주시겠어요?',
        note: 'Americans say "check"; "bill" is understood too.',
        note_ko: '미국에서는 check라고 하고, bill도 통합니다.',
        category: 'food'
      }
    ]
  },
  {
    id: 'd1_market',
    title: 'Checking out at the market',
    title_ko: '마트 계산대에서',
    place: 'market_checkout',
    npc: 'mike',
    day_to: 5,
    time_from: '17:00',
    time_to: '22:00',
    summary: 'Pay for your groceries: the rewards card, paper or plastic, and the receipt.',
    summary_ko: '장 본 물건을 계산하세요. 적립 카드, 종이봉투냐 비닐봉지냐, 영수증까지.',
    sort: 70,
    tags: 'shopping,market',
    turns: [
      {
        speaker: 'mike',
        situation: 'You put your groceries on the belt at Fairview Market. The cashier starts scanning.',
        situation_ko: '페어뷰 마켓 계산대 벨트에 물건을 올려놓습니다. 계산원이 바코드를 찍기 시작합니다.',
        line: 'Hey there. Did you find everything okay?',
        line_ko: '안녕하세요. 필요한 건 다 찾으셨어요?',
        prompt: 'Your shopping went fine. Answer him.',
        prompt_ko: '장보기는 문제없었습니다. 대답하세요.',
        model: 'Yeah, I found everything, thanks.',
        model_ko: '네, 다 찾았어요. 고마워요.',
        distractors: [
          {
            text: "I'm fine, thanks. How are you doing?",
            text_ko: '잘 지내요, 고마워요. 그쪽은요?',
            reaction: 'Good, thanks! So, find everything okay?',
            reaction_ko: '잘 지내요! 그래서 다 찾으셨어요?'
          },
          {
            text: "Not really. I couldn't find the milk.",
            text_ko: '아뇨. 우유를 못 찾았어요.',
            reaction: "Oh, it's in the back. Want me to call someone?",
            reaction_ko: '아, 그건 안쪽에 있어요. 직원 불러 드릴까요?'
          },
          {
            text: 'Yeah. Can you just ring me up?',
            text_ko: '네. 그냥 계산이나 해 주세요.',
            reaction: "Uh, sure. That's what I'm doing.",
            reaction_ko: '어, 네. 지금 하고 있잖아요.'
          }
        ],
        reply_speaker: 'mike',
        reply_line: 'Great.',
        reply_ko: '다행이네요.'
      },
      {
        speaker: 'mike',
        situation: 'Mike points at a sign by the register.',
        situation_ko: '마이크가 계산대 옆 안내판을 가리킵니다.',
        line: 'Do you have our rewards card?',
        line_ko: '저희 리워드 카드 있으세요?',
        prompt: "You don't have one. Find out whether joining costs anything.",
        prompt_ko: '없습니다. 가입하는 데 돈이 드는지 알아보세요.',
        model: "No, I don't. Is it free to sign up?",
        model_ko: '아뇨, 없어요. 가입은 무료예요?',
        distractors: [
          {
            text: 'Yeah, I do. Let me find it in my wallet.',
            text_ko: '네, 있어요. 지갑에서 찾아볼게요.',
            reaction: 'Take your time. ...Any luck?',
            reaction_ko: '천천히 찾으세요. …찾으셨어요?'
          },
          {
            text: 'No. Can I still get the sale prices?',
            text_ko: '아뇨. 그래도 할인가 되나요?',
            reaction: "Sorry, only with the card. It's easy to get, though.",
            reaction_ko: '죄송해요, 카드가 있어야 돼요. 만들기는 쉬워요.'
          },
          {
            text: "No thanks, I don't want any more spam.",
            text_ko: '됐어요, 스팸 문자 더 받기 싫어요.',
            reaction: "Fair enough. We don't spam, I promise.",
            reaction_ko: '그러시군요. 스팸은 안 보낸다니까요.'
          }
        ],
        reply_speaker: 'mike',
        reply_line: "Totally free. Next time just punch in your phone number, and you'll get the sale prices.",
        reply_ko: '완전 무료예요. 다음에 전화번호만 누르면 할인가로 살 수 있어요.'
      },
      {
        speaker: 'mike',
        situation: 'He holds up two kinds of bags.',
        situation_ko: '그가 두 종류의 봉투를 들어 보입니다.',
        line: 'Paper or plastic?',
        line_ko: '종이로 드릴까요, 비닐로 드릴까요?',
        prompt: "You'd rather skip the plastic.",
        prompt_ko: '비닐봉투는 피하고 싶습니다.',
        model: 'Paper is fine, thanks.',
        model_ko: '종이봉투면 돼요, 고마워요.',
        distractors: [
          {
            text: 'Plastic is fine, thanks.',
            text_ko: '비닐봉투면 돼요, 고마워요.',
            reaction: 'Plastic, got it. Want it double-bagged?',
            reaction_ko: '비닐로요. 두 겹으로 싸 드릴까요?'
          },
          {
            text: "Whatever. Doesn't matter.",
            text_ko: '아무거나요. 상관없어요.',
            reaction: "Okay... I'll just pick one, then.",
            reaction_ko: '네… 그럼 제가 그냥 고를게요.'
          },
          {
            text: 'Yes, please. Thank you.',
            text_ko: '네, 주세요. 고마워요.',
            reaction: "Ha, that wasn't a yes-or-no question!",
            reaction_ko: '하하, 네 아니오로 대답하는 질문이 아닌데요!'
          }
        ],
        reply_speaker: 'mike',
        reply_line: 'Paper it is. Bags are ten cents each, just so you know.',
        reply_ko: '종이로 할게요. 참고로 봉투는 하나에 10센트예요.'
      },
      {
        speaker: 'mike',
        situation: 'The screen shows the total.',
        situation_ko: '화면에 합계가 나옵니다.',
        line: "Your total's twenty-three eighty-nine. Go ahead and insert or tap whenever you're ready.",
        line_ko: '합계 23달러 89센트입니다. 준비되면 카드 꽂거나 대세요.',
        prompt: 'Pay. You want to keep the receipt, but your hands are full.',
        prompt_ko: '계산하세요. 영수증은 챙기고 싶은데 손이 꽉 찼습니다.',
        model: 'Thanks. Could you put the receipt in the bag?',
        model_ko: '고마워요. 영수증은 봉투에 넣어 주시겠어요?',
        distractors: [
          {
            text: "Thanks. No receipt for me, I don't need it.",
            text_ko: '고마워요. 영수증은 필요 없어요, 버려 주세요.',
            reaction: 'Sure. Not even for returns?',
            reaction_ko: '그래요. 반품할 때 필요할 텐데요?'
          },
          {
            text: 'Thanks. Was that twenty-three nineteen?',
            text_ko: '고마워요. 23달러 19센트였죠?',
            reaction: 'Twenty-three eighty-nine.',
            reaction_ko: '23달러 89센트예요.'
          },
          {
            text: 'Thanks. Can you carry these out to my car?',
            text_ko: '고마워요. 이것 좀 차까지 들어다 주실래요?',
            reaction: "Sorry, we don't do carry-out. Need a cart?",
            reaction_ko: '죄송해요, 그건 안 해요. 카트 드릴까요?'
          }
        ],
        reply_speaker: 'mike',
        reply_line: 'You got it. Have a good night!',
        reply_ko: '알겠어요. 좋은 밤 보내요!'
      }
    ],
    phrases: [
      {
        id: 'd1_market.find_everything',
        text: 'Did you find everything okay?',
        meaning_ko: '찾으시는 건 다 찾으셨어요?',
        note: 'Cashiers say this to almost everyone. "Yes, thanks" is fine.',
        note_ko: '계산원이 거의 모든 손님에게 하는 말입니다. "Yes, thanks."면 됩니다.',
        category: 'shopping'
      },
      {
        id: 'd1_market.free_to_sign_up',
        text: 'Is it free to sign up?',
        meaning_ko: '가입은 무료예요?',
        note: '"Sign up" = register or join.',
        note_ko: 'sign up은 가입하다라는 뜻입니다.',
        category: 'shopping'
      },
      {
        id: 'd1_market.have_a_good_night',
        text: 'Have a good night!',
        meaning_ko: '좋은 저녁 보내세요!',
        note: 'Used as a goodbye in the evening, not only at bedtime.',
        note_ko: '잘 때만이 아니라 저녁에 헤어질 때 쓰는 인사입니다.',
        category: 'small-talk'
      },
      {
        id: 'd1_market.insert_or_tap',
        text: 'Insert or tap whenever you are ready.',
        meaning_ko: '준비되시면 카드를 꽂거나 대세요.',
        note: 'Insert = chip card in the slot. Tap = contactless.',
        note_ko: 'insert는 칩 카드를 꽂는 것, tap은 비접촉으로 대는 것입니다.',
        category: 'shopping'
      },
      {
        id: 'd1_market.paper_or_plastic',
        text: 'Paper or plastic?',
        meaning_ko: '종이봉투요, 비닐봉지요?',
        note: 'Some cities charge a few cents per bag. You can bring your own.',
        note_ko: '봉투값을 몇 센트 받는 도시도 있습니다. 장바구니를 가져가도 됩니다.',
        category: 'shopping'
      },
      {
        id: 'd1_market.punch_in',
        text: 'Just punch in your phone number.',
        meaning_ko: '전화번호만 누르세요.',
        note: '"Punch in" = type numbers on a keypad.',
        note_ko: 'punch in은 키패드에 숫자를 누르는 것입니다.',
        category: 'shopping'
      },
      {
        id: 'd1_market.receipt_in_bag',
        text: 'Could you put the receipt in the bag?',
        meaning_ko: '영수증은 봉투에 넣어 주시겠어요?',
        note: 'A polite request with "Could you …?"',
        note_ko: '"Could you …?"로 하는 정중한 부탁입니다.',
        category: 'shopping'
      },
      {
        id: 'd1_market.rewards_card',
        text: 'Do you have our rewards card?',
        meaning_ko: '저희 적립 카드 있으세요?',
        note: 'Store loyalty programs give sale prices; many use your phone number.',
        note_ko: '가게 멤버십은 할인가를 주고, 전화번호로 쓰는 경우가 많습니다.',
        category: 'shopping'
      }
    ]
  },
  {
    id: 'd2_code_review',
    title: 'Comments on your pull request',
    title_ko: '풀 리퀘스트 리뷰 코멘트',
    place: 'office_desk_team',
    npc: 'derek',
    day_from: 2,
    day_to: 2,
    time_from: '09:00',
    time_to: '17:30',
    summary: 'Derek reviewed your first pull request. Talk through his comments and agree on the next steps.',
    summary_ko: '데릭이 첫 풀 리퀘스트를 리뷰했습니다. 코멘트를 함께 보고 다음 할 일을 정하세요.',
    sort: 10,
    tags: 'dev,code-review,feedback',
    calendar: { day: 2, time: '11:00', title: 'Code review follow-up with Derek', title_ko: '데릭과 코드 리뷰 후속 논의' },
    turns: [
      {
        speaker: 'derek',
        situation: 'Derek rolls his chair over to your desk with his coffee.',
        situation_ko: '데릭이 커피를 들고 의자를 굴려 당신 자리로 옵니다.',
        line: 'Morning! I left a few comments on your pull request. Did you get a chance to look?',
        line_ko: '좋은 아침! 풀 리퀘스트에 코멘트 몇 개 남겼어요. 봤어요?',
        prompt: "You glanced at them, but you're not done. Be honest.",
        prompt_ko: '훑어보긴 했지만 아직 다 보지는 못했습니다. 솔직하게 말하세요.',
        model: "I saw them, but I haven't gone through all of them yet.",
        model_ko: '봤는데, 아직 전부 다 살펴보지는 못했어요.',
        distractors: [
          {
            text: 'Yeah, I fixed all of them last night already. Take a look!',
            text_ko: '네, 어젯밤에 벌써 다 고쳤어요. 한번 봐 주세요!',
            reaction: "All of them? Huh, I don't see a new push yet.",
            reaction_ko: '다요? 어, 아직 새로 푸시된 게 안 보이는데.'
          },
          {
            text: "Not yet. Honestly, I didn't know you'd left any comments.",
            text_ko: '아직요. 솔직히 코멘트 남기신 줄도 몰랐어요.',
            reaction: 'Oh! They should be right there on the PR.',
            reaction_ko: '아! PR에 바로 달려 있을 거예요.'
          },
          {
            text: 'I saw them. Honestly, I think most of them are just nitpicks.',
            text_ko: '봤어요. 솔직히 대부분 그냥 트집 같던데요.',
            reaction: 'Some are. But a couple of them really matter.',
            reaction_ko: '몇 개는 그렇죠. 근데 두어 개는 진짜 중요해요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'No rush. Most of them are just nits.',
        reply_ko: '급할 거 없어요. 대부분 사소한 거예요.'
      },
      {
        speaker: 'derek',
        situation: 'He points at one comment on your screen.',
        situation_ko: '그가 화면의 코멘트 하나를 가리킵니다.',
        line: 'The main one is about error handling. Right now, if the payment call fails, we just swallow the error.',
        line_ko: '제일 중요한 건 에러 처리예요. 지금은 결제 호출이 실패하면 에러를 그냥 삼켜 버려요.',
        prompt: 'Ask for his advice on a better way to handle it.',
        prompt_ko: '더 나은 처리 방법에 대해 그의 조언을 구하세요.',
        model: 'Got it. What do you suggest I do instead?',
        model_ko: '알겠어요. 대신 어떻게 하는 게 좋을까요?',
        distractors: [
          {
            text: 'Got it. So I should just delete the try-catch?',
            text_ko: '알겠어요. 그럼 try-catch를 그냥 지울까요?',
            reaction: 'Whoa, no. Then the whole checkout crashes.',
            reaction_ko: '워, 아뇨. 그럼 결제가 통째로 죽어요.'
          },
          {
            text: 'But it works fine. The call never fails.',
            text_ko: '근데 잘 돌아가요. 그 호출은 실패 안 해요.',
            reaction: 'Never fails on your laptop. Production is different.',
            reaction_ko: '당신 노트북에선 안 죽죠. 운영 환경은 달라요.'
          },
          {
            text: "Okay. I copied that part from Priya's code.",
            text_ko: '네. 그 부분은 프리야 코드에서 가져왔어요.',
            reaction: "Priya doesn't write code, man. Let's just fix it.",
            reaction_ko: '프리야는 코드 안 짜요. 그냥 고칩시다.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Log it, and show the user a friendly message. Maybe add one retry.',
        reply_ko: '로그를 남기고 사용자에게 친절한 메시지를 보여 줘요. 재시도도 한 번 넣고요.'
      },
      {
        speaker: 'derek',
        situation: 'Derek scrolls down to a smaller comment.',
        situation_ko: '데릭이 작은 코멘트로 스크롤을 내립니다.',
        line: "Also, a nit: some of your variable names are a little vague, like 'data2'.",
        line_ko: "그리고 사소한 건데, 변수 이름 몇 개가 좀 모호해요. 'data2' 같은 거요.",
        prompt: "He has a point. Tell him how you'll fix it.",
        prompt_ko: '맞는 말입니다. 어떻게 고칠지 말하세요.',
        model: "That's fair. I'll rename them and push an update.",
        model_ko: '맞는 말이에요. 이름 바꿔서 업데이트 푸시할게요.',
        distractors: [
          {
            text: "Really? 'data2' is pretty clear if you read the code.",
            text_ko: "그래요? 코드 읽어 보면 'data2'도 꽤 명확한데요.",
            reaction: "If I have to read the code to get it, it's not clear.",
            reaction_ko: '코드를 읽어야 알면 명확한 게 아니죠.'
          },
          {
            text: "Fair. I'll rewrite the whole thing from scratch tonight.",
            text_ko: '맞아요. 오늘 밤에 처음부터 다 새로 짤게요.',
            reaction: 'Whoa, no need. Just rename a few things.',
            reaction_ko: '워, 그럴 필요 없어요. 이름 몇 개만 바꿔요.'
          },
          {
            text: "That's fair. Should I rename them in a new PR later?",
            text_ko: '맞아요. 이름은 나중에 다른 PR에서 바꿀까요?',
            reaction: "Nah, just do it in this one. It's quick.",
            reaction_ko: '아뇨, 이번 PR에서 해요. 금방이잖아요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Cool. I'll approve it once the tests pass.",
        reply_ko: '좋아요. 테스트 통과하면 승인할게요.'
      },
      {
        speaker: 'derek',
        situation: 'He finishes his coffee.',
        situation_ko: '그가 커피를 마저 마십니다.',
        line: 'One more thing: can you add a unit test for the failure case?',
        line_ko: '하나 더요. 실패 케이스 단위 테스트 추가해 줄래요?',
        prompt: 'Agree, and give him a deadline: before you leave today.',
        prompt_ko: '그러겠다고 하고, 기한을 알려 주세요. 오늘 퇴근 전입니다.',
        model: "Sure thing. I'll have it done by end of day.",
        model_ko: '그럼요. 오늘 퇴근 전까지 끝낼게요.',
        distractors: [
          {
            text: "Sure thing. I'll have it done by end of week.",
            text_ko: '그럼요. 이번 주 안에 끝낼게요.',
            reaction: 'End of week? I was hoping to merge this today.',
            reaction_ko: '이번 주요? 오늘 머지하고 싶었는데.'
          },
          {
            text: "Sure. I'll add tests for every case while I'm at it.",
            text_ko: '그럼요. 하는 김에 테스트 전부 다 넣을게요.',
            reaction: "Ha, let's not go crazy. Just the failure case.",
            reaction_ko: '하하, 너무 나가지 말고요. 실패 케이스만요.'
          },
          {
            text: "Do I have to? The code's already pretty simple.",
            text_ko: '꼭 해야 돼요? 코드가 꽤 단순한데요.',
            reaction: "Yeah, you do. That's the bug we just talked about.",
            reaction_ko: '네, 해야 돼요. 방금 얘기한 그 버그잖아요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Awesome. Thanks for being open to feedback. Not everyone is.',
        reply_ko: '좋아요. 피드백을 잘 받아 줘서 고마워요. 다 그렇진 않거든요.'
      }
    ],
    phrases: [
      {
        id: 'd2_code_review.by_eod',
        text: "I'll have it done by end of day.",
        meaning_ko: '오늘 안으로 끝낼게요.',
        note: '"End of day" (EOD) = before you leave work today.',
        note_ko: 'end of day(EOD)는 오늘 퇴근 전을 뜻합니다.',
        category: 'office'
      },
      {
        id: 'd2_code_review.get_a_chance',
        text: 'Did you get a chance to look?',
        meaning_ko: '혹시 볼 시간 있었어요?',
        note: 'A soft way to ask if someone has done something.',
        note_ko: '어떤 일을 했는지 부드럽게 묻는 표현입니다.',
        category: 'office'
      },
      {
        id: 'd2_code_review.nit',
        text: "It's just a nit.",
        meaning_ko: '사소한 지적이에요.',
        note: 'In code review, a "nit" is a small, picky comment.',
        note_ko: '코드 리뷰에서 nit은 사소하고 까다로운 지적입니다.',
        category: 'office'
      },
      {
        id: 'd2_code_review.no_rush',
        text: 'No rush.',
        meaning_ko: '급할 거 없어요.',
        note: 'Tells someone they can take their time.',
        note_ko: '천천히 해도 된다는 말입니다.',
        category: 'office'
      },
      {
        id: 'd2_code_review.open_to_feedback',
        text: 'Thanks for being open to feedback.',
        meaning_ko: '피드백을 잘 받아 줘서 고마워요.',
        note: '"Open to" = willing to accept.',
        note_ko: 'open to는 기꺼이 받아들인다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'd2_code_review.push_an_update',
        text: "I'll push an update.",
        meaning_ko: '수정해서 올릴게요.',
        note: '"Push" = upload your code changes.',
        note_ko: 'push는 코드 변경을 올리는 것입니다.',
        category: 'office'
      },
      {
        id: 'd2_code_review.thats_fair',
        text: "That's fair.",
        meaning_ko: '맞는 말이에요.',
        note: 'Accepts a criticism politely.',
        note_ko: '비판을 정중하게 받아들이는 말입니다.',
        category: 'office'
      },
      {
        id: 'd2_code_review.what_do_you_suggest',
        text: 'What do you suggest I do instead?',
        meaning_ko: '대신 어떻게 하면 좋을까요?',
        note: 'Asks for advice without sounding defensive.',
        note_ko: '방어적으로 들리지 않게 조언을 구하는 표현입니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'd2_reschedule',
    title: 'Moving a meeting',
    title_ko: '회의 시간 옮기기',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 2,
    day_to: 2,
    time_from: '10:00',
    time_to: '12:59',
    summary: 'Priya wants to meet at one, but you already have an IT appointment. Move the meeting to two.',
    summary_ko: '프리야가 한 시에 만나자고 하지만 이미 IT 예약이 있습니다. 회의를 두 시로 옮기세요.',
    sort: 20,
    tags: 'meeting,scheduling',
    turns: [
      {
        speaker: 'priya',
        situation: 'Priya catches you after standup with her laptop open.',
        situation_ko: '스탠드업이 끝나고 프리야가 노트북을 연 채 당신을 붙잡습니다.',
        line: "Hey, do you have a sec? I want to go over the checkout designs with you. Does one o'clock work?",
        line_ko: '저기, 잠깐 시간 있어요? 결제 화면 디자인 같이 보고 싶어서요. 한 시 괜찮아요?',
        prompt: "One o'clock is taken: IT is looking at your laptop then. Let her know.",
        prompt_ko: '한 시엔 안 됩니다. 그때 IT팀이 노트북을 봐 주기로 했어요. 알려 주세요.',
        model: 'Sorry, I have an appointment with IT at one.',
        model_ko: '죄송해요, 한 시에 IT팀이랑 약속이 있어요.',
        distractors: [
          {
            text: "Sure, one o'clock works great. See you then!",
            text_ko: '네, 한 시 좋아요. 그때 봬요!',
            reaction: "Perfect! I'll grab us a room.",
            reaction_ko: '좋아요! 회의실 잡아 둘게요.'
          },
          {
            text: 'Sorry, I have an appointment with IT at two.',
            text_ko: '죄송해요, 두 시에 IT팀이랑 약속이 있어요.',
            reaction: 'Oh, at two? So one would work, then?',
            reaction_ko: '아, 두 시요? 그럼 한 시는 되겠네요?'
          },
          {
            text: "No, I can't. I've got way too much going on.",
            text_ko: '아뇨, 안 돼요. 할 일이 너무 많아서요.',
            reaction: 'Oh. Okay, sorry to bother you.',
            reaction_ko: '아. 네, 귀찮게 해서 미안해요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'Oh, no worries.',
        reply_ko: '아, 괜찮아요.'
      },
      {
        speaker: 'priya',
        situation: 'She opens her calendar.',
        situation_ko: '그녀가 캘린더를 엽니다.',
        line: 'Could we do it later this afternoon, then?',
        line_ko: '그럼 오후 늦게 하면 어때요?',
        prompt: 'Your IT appointment should be over by two. Suggest a time.',
        prompt_ko: 'IT 약속은 두 시 전에 끝날 겁니다. 시간을 제안하세요.',
        model: "Could we move it to two o'clock instead?",
        model_ko: '대신 두 시로 옮겨도 될까요?',
        distractors: [
          {
            text: 'Could we push it to tomorrow morning instead?',
            text_ko: '대신 내일 아침으로 미뤄도 될까요?',
            reaction: 'Hmm, I was hoping to get it done today.',
            reaction_ko: '음, 오늘 안에 끝내고 싶었는데요.'
          },
          {
            text: 'Could we move it to one thirty instead?',
            text_ko: '대신 한 시 반으로 옮겨도 될까요?',
            reaction: "One thirty? Won't you still be with IT?",
            reaction_ko: '한 시 반이요? 그때도 IT팀이랑 있지 않아요?'
          },
          {
            text: 'Sure. Just put something on my calendar.',
            text_ko: '네. 그냥 아무 때나 잡아 주세요.',
            reaction: "Okay, but what time's good for you?",
            reaction_ko: '알겠어요, 근데 몇 시가 좋아요?'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Two works for me. I'll send you a calendar invite.",
        reply_ko: '두 시 좋아요. 캘린더 초대 보낼게요.'
      },
      {
        speaker: 'priya',
        situation: 'Priya types the invite.',
        situation_ko: '프리야가 초대를 입력합니다.',
        line: 'How long do you think we need? Usually thirty minutes, but I can book an hour.',
        line_ko: '얼마나 필요할 것 같아요? 보통 30분인데, 한 시간 잡아도 돼요.',
        prompt: "You don't think this needs a long meeting. Tell her.",
        prompt_ko: '회의가 길 필요는 없을 것 같습니다. 그렇게 말하세요.',
        model: 'Thirty minutes should be plenty.',
        model_ko: '30분이면 충분하고도 남을 거예요.',
        distractors: [
          {
            text: "Let's book the full hour, just in case.",
            text_ko: '혹시 모르니 한 시간 다 잡죠.',
            reaction: 'An hour? Okay, if you think we need it.',
            reaction_ko: '한 시간이요? 필요하다면 그렇게 해요.'
          },
          {
            text: "Fifteen minutes, tops. I'm really busy.",
            text_ko: '길어야 15분이요. 제가 많이 바빠서요.',
            reaction: "Oh. Okay, I'll try to be quick.",
            reaction_ko: '아. 네, 빨리 끝내 볼게요.'
          },
          {
            text: 'Two works for me. Book whatever room.',
            text_ko: '두 시 좋아요. 방은 아무 데나 잡아요.',
            reaction: 'Right, two. But how long do we need?',
            reaction_ko: '네, 두 시요. 근데 얼마나 필요해요?'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Great. I'll book the small room by the kitchen.",
        reply_ko: '좋아요. 탕비실 옆 작은 방을 예약할게요.'
      },
      {
        speaker: 'priya',
        situation: 'Your laptop dings. The invite is already there.',
        situation_ko: '노트북에서 알림이 울립니다. 초대가 벌써 와 있습니다.',
        line: 'And if something comes up, just decline it and suggest a new time.',
        line_ko: '그리고 무슨 일 생기면 그냥 거절하고 새 시간을 제안해요.',
        prompt: 'Agree, and promise to tell her if anything changes.',
        prompt_ko: '알겠다고 하고, 바뀌는 게 있으면 알려 주겠다고 하세요.',
        model: "Will do. I'll keep you posted.",
        model_ko: '그럴게요. 계속 상황 알려 드릴게요.',
        distractors: [
          {
            text: "Okay. I'll just skip it if I'm busy.",
            text_ko: '네. 바쁘면 그냥 안 갈게요.',
            reaction: "Um, please don't just skip it. Let me know.",
            reaction_ko: '음, 그냥 빠지진 말고 알려 줘요.'
          },
          {
            text: "Sure. I'll decline it right now, then.",
            text_ko: '네. 그럼 지금 바로 거절할게요.',
            reaction: "Wait, why? Didn't two work for you?",
            reaction_ko: '어, 왜요? 두 시 괜찮다고 하지 않았어요?'
          },
          {
            text: 'Will do. See you at one, then!',
            text_ko: '그럴게요. 그럼 한 시에 봬요!',
            reaction: "Two, remember? You've got IT at one.",
            reaction_ko: '두 시예요, 기억하죠? 한 시엔 IT 약속 있잖아요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'Perfect. See you at two!',
        reply_ko: '좋아요. 두 시에 봐요!'
      }
    ],
    phrases: [
      {
        id: 'd2_reschedule.calendar_invite',
        text: "I'll send you a calendar invite.",
        meaning_ko: '캘린더 초대 보낼게요.',
        note: 'Meetings are usually booked with calendar invites.',
        note_ko: '회의는 보통 캘린더 초대로 잡습니다.',
        category: 'meeting'
      },
      {
        id: 'd2_reschedule.does_it_work',
        text: "Does one o'clock work?",
        meaning_ko: '한 시 괜찮아요?',
        note: 'Asks if a time is okay for you.',
        note_ko: '그 시간이 괜찮은지 묻는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'd2_reschedule.go_over',
        text: 'I want to go over the designs with you.',
        meaning_ko: '디자인을 같이 검토하고 싶어요.',
        note: '"Go over" = review something together.',
        note_ko: 'go over는 함께 검토하는 것입니다.',
        category: 'meeting'
      },
      {
        id: 'd2_reschedule.have_a_sec',
        text: 'Do you have a sec?',
        meaning_ko: '잠깐 시간 돼요?',
        note: '"Sec" = second. A casual way to ask for a short talk.',
        note_ko: 'sec은 second의 줄임말로, 잠깐 이야기하자는 편한 표현입니다.',
        category: 'office'
      },
      {
        id: 'd2_reschedule.keep_you_posted',
        text: "I'll keep you posted.",
        meaning_ko: '계속 알려 드릴게요.',
        note: 'Promises to share updates.',
        note_ko: '진행 상황을 알려 주겠다는 약속입니다.',
        category: 'office'
      },
      {
        id: 'd2_reschedule.move_it_to',
        text: 'Could we move it to two?',
        meaning_ko: '두 시로 옮길 수 있을까요?',
        note: 'A polite way to reschedule.',
        note_ko: '일정을 정중하게 바꾸는 표현입니다.',
        category: 'meeting'
      },
      {
        id: 'd2_reschedule.something_comes_up',
        text: 'If something comes up …',
        meaning_ko: '혹시 일이 생기면…',
        note: '"Come up" = happen unexpectedly.',
        note_ko: 'come up은 뜻밖에 생기는 것입니다.',
        category: 'meeting'
      },
      {
        id: 'd2_reschedule.works_for_me',
        text: 'Two works for me.',
        meaning_ko: '두 시 좋아요.',
        note: 'Accepts a time or plan.',
        note_ko: '시간이나 계획을 받아들이는 말입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'd2_it_laptop',
    title: 'My laptop keeps freezing',
    title_ko: '노트북이 자꾸 멈춰요',
    place: 'office_it',
    npc: 'sam',
    day_from: 2,
    day_to: 2,
    time_from: '12:30',
    time_to: '17:30',
    summary: 'Your laptop freezes when you run the tests. Explain the problem to Sam at the IT help desk.',
    summary_ko: '테스트를 돌리면 노트북이 멈춥니다. IT 헬프데스크의 샘에게 문제를 설명하세요.',
    sort: 30,
    tags: 'it,support,office',
    calendar: { day: 2, time: '13:00', title: 'IT appointment: laptop', title_ko: 'IT 예약: 노트북' },
    turns: [
      {
        speaker: 'sam',
        situation: 'The IT help desk is a small room full of cables. Sam has three monitors and a cold brew.',
        situation_ko: 'IT 헬프데스크는 케이블이 가득한 작은 방입니다. 샘 앞에는 모니터 세 대와 콜드브루가 있습니다.',
        line: "Hey, what's up? You filed the ticket about your laptop, right?",
        line_ko: '안녕하세요, 무슨 일이에요? 노트북 건으로 티켓 올리신 분 맞죠?',
        prompt: 'Confirm it, and explain the problem: it locks up whenever you run the tests.',
        prompt_ko: '맞다고 하고 문제를 설명하세요. 테스트를 돌릴 때마다 먹통이 됩니다.',
        model: "Yeah, that's me. My laptop keeps freezing when I run the tests.",
        model_ko: '네, 저예요. 테스트를 돌리면 노트북이 자꾸 멈춰요.',
        distractors: [
          {
            text: "Yeah, that's me. My laptop won't turn on at all since this morning.",
            text_ko: '네, 저예요. 오늘 아침부터 노트북이 아예 안 켜져요.',
            reaction: "Won't turn on? Then how'd you file the ticket?",
            reaction_ko: '안 켜진다고요? 그럼 티켓은 어떻게 올렸어요?'
          },
          {
            text: 'Yeah. Honestly, this laptop is garbage. Can I just get a new one?',
            text_ko: '네. 솔직히 이 노트북 완전 고물이에요. 그냥 새 거 주시면 안 돼요?',
            reaction: "Whoa, let's figure out what's wrong first.",
            reaction_ko: '워, 일단 뭐가 문제인지부터 봐요.'
          },
          {
            text: "Yeah, that's me. My laptop's been running a little slow lately.",
            text_ko: '네, 저예요. 요즘 노트북이 전체적으로 좀 느려요.',
            reaction: 'Slow how? Like, all the time, or when you do something?',
            reaction_ko: '어떻게 느린데요? 항상요, 아니면 뭘 할 때요?'
          }
        ],
        reply_speaker: 'sam',
        reply_line: 'Ugh, yeah. The older models do that.',
        reply_ko: '아, 네. 구형 모델이 그래요.'
      },
      {
        speaker: 'sam',
        situation: 'Sam leans back in his chair.',
        situation_ko: '샘이 의자에 등을 기댑니다.',
        line: 'Have you tried restarting it?',
        line_ko: '재시작은 해 봤어요?',
        prompt: "You've already done that two times. Tell him.",
        prompt_ko: '벌써 두 번이나 해 봤습니다. 말하세요.',
        model: "Yes, I've restarted it twice already.",
        model_ko: '네, 벌써 두 번 재시작했어요.',
        distractors: [
          {
            text: 'Yes, I restarted it once this morning.',
            text_ko: '네, 오늘 아침에 한 번 재시작했어요.',
            reaction: 'Just once? Try it one more time for me.',
            reaction_ko: '한 번만요? 한 번만 더 해 봐요.'
          },
          {
            text: "Of course I have. I'm a developer, you know.",
            text_ko: '당연하죠. 저 개발자거든요.',
            reaction: 'Hey, I have to ask. Everybody says that.',
            reaction_ko: '저기, 물어봐야 하는 거예요. 다들 그렇게 말해요.'
          },
          {
            text: "No, but I've closed all my other apps.",
            text_ko: '아뇨, 그래도 다른 앱은 다 껐어요.',
            reaction: "Okay, let's start with a restart, then.",
            reaction_ko: '그럼 재시작부터 해 봐요.'
          }
        ],
        reply_speaker: 'sam',
        reply_line: "Okay, then it's probably the memory. Let me check.",
        reply_ko: '그럼 아마 메모리 문제예요. 확인해 볼게요.'
      },
      {
        speaker: 'sam',
        situation: 'He types a few commands on your laptop.',
        situation_ko: '그가 당신 노트북에 명령어 몇 개를 입력합니다.',
        line: "Yeah, you've only got eight gigs of RAM. I can swap it for a new one, but it'll take about an hour to set up.",
        line_ko: '네, 램이 8기가밖에 없네요. 새 걸로 바꿔 줄 수 있는데, 세팅하는 데 한 시간쯤 걸려요.',
        prompt: "You can't just sit around for an hour. Ask about something to work on until then.",
        prompt_ko: '한 시간 동안 손 놓고 있을 수는 없습니다. 그동안 쓸 게 있는지 물어보세요.',
        model: 'That works. Can I use a loaner in the meantime?',
        model_ko: '좋아요. 그동안 대여용 노트북 써도 될까요?',
        distractors: [
          {
            text: "That works. So it'll be ready in ten minutes?",
            text_ko: '좋아요. 그럼 10분이면 준비되는 거죠?',
            reaction: 'More like an hour. Setup takes a while.',
            reaction_ko: '한 시간쯤이요. 세팅이 좀 걸려요.'
          },
          {
            text: "An hour? Can't you just add more RAM to this one?",
            text_ko: '한 시간이요? 그냥 이거에 램만 추가하면 안 돼요?',
            reaction: "It's soldered in, sadly. Swapping is faster.",
            reaction_ko: '아쉽게도 램이 납땜돼 있어요. 바꾸는 게 빨라요.'
          },
          {
            text: 'That works. Can I take the rest of the day off, then?',
            text_ko: '좋아요. 그럼 오늘은 그냥 퇴근해도 될까요?',
            reaction: "Ha, that's between you and Maya.",
            reaction_ko: '하하, 그건 마야랑 얘기해요.'
          }
        ],
        reply_speaker: 'sam',
        reply_line: 'Sure, grab this one. Just log in with your company account.',
        reply_ko: '그럼요, 이거 가져가요. 회사 계정으로 로그인하면 돼요.'
      },
      {
        speaker: 'sam',
        situation: 'Sam hands you a scratched but working laptop.',
        situation_ko: '샘이 긁힌 자국은 있지만 잘 돌아가는 노트북을 건넵니다.',
        line: "Your new machine should be ready by four. I'll ping you.",
        line_ko: '새 노트북은 네 시까지 준비될 거예요. 메시지 줄게요.',
        prompt: "Thank him, and check where you'll get the new one.",
        prompt_ko: '고맙다고 하고, 새 노트북을 어디서 받는지 확인하세요.',
        model: 'Thanks, Sam. Should I pick it up here?',
        model_ko: '고마워요, 샘. 여기로 찾으러 오면 돼요?',
        distractors: [
          {
            text: "Thanks, Sam. So I'll come back at two?",
            text_ko: '고마워요, 샘. 그럼 두 시에 다시 올까요?',
            reaction: "Four, not two. I'll ping you.",
            reaction_ko: '두 시 말고 네 시요. 메시지 줄게요.'
          },
          {
            text: 'Thanks. Can I just keep this one instead?',
            text_ko: '고마워요. 그냥 이걸 계속 쓰면 안 돼요?',
            reaction: "Ha, no. That one's a loaner. It has to come back.",
            reaction_ko: '하하, 안 돼요. 그건 대여용이라 돌려줘야 해요.'
          },
          {
            text: 'Thanks, Sam. Should I email you at four?',
            text_ko: '고마워요, 샘. 네 시에 제가 메일 드릴까요?',
            reaction: "No need. I'll ping you when it's ready.",
            reaction_ko: '그럴 필요 없어요. 준비되면 내가 메시지 줄게요.'
          }
        ],
        reply_speaker: 'sam',
        reply_line: 'Yep, right here. Or I can drop it off at your desk.',
        reply_ko: '네, 여기요. 아니면 자리로 갖다줄 수도 있어요.'
      }
    ],
    phrases: [
      {
        id: 'd2_it_laptop.drop_it_off',
        text: 'I can drop it off at your desk.',
        meaning_ko: '자리로 갖다드릴게요.',
        note: '"Drop off" = bring something and leave it.',
        note_ko: 'drop off는 가져다 두고 가는 것입니다.',
        category: 'office'
      },
      {
        id: 'd2_it_laptop.file_a_ticket',
        text: 'I filed a ticket about my laptop.',
        meaning_ko: '노트북 문제로 티켓을 올렸어요.',
        note: 'IT problems are reported as "tickets".',
        note_ko: 'IT 문제는 ticket으로 접수합니다.',
        category: 'office'
      },
      {
        id: 'd2_it_laptop.gigs',
        text: 'eight gigs of RAM',
        meaning_ko: '램 8기가',
        note: '"Gigs" is short for gigabytes.',
        note_ko: 'gigs는 gigabytes의 줄임말입니다.',
        category: 'office'
      },
      {
        id: 'd2_it_laptop.keeps_freezing',
        text: 'My laptop keeps freezing.',
        meaning_ko: '노트북이 자꾸 멈춰요.',
        note: '"Keep + -ing" describes a problem that happens again and again.',
        note_ko: 'keep + -ing는 계속 반복되는 문제를 말합니다.',
        category: 'office'
      },
      {
        id: 'd2_it_laptop.loaner',
        text: 'Can I use a loaner in the meantime?',
        meaning_ko: '그동안 대여용 기기를 써도 될까요?',
        note: '"In the meantime" = during the waiting time.',
        note_ko: 'in the meantime은 기다리는 동안이라는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'd2_it_laptop.restarted_twice',
        text: "I've restarted it twice already.",
        meaning_ko: '벌써 두 번 재시작했어요.',
        note: 'Use "already" to show you did it before now.',
        note_ko: 'already로 이미 해 봤다는 것을 나타냅니다.',
        category: 'office'
      },
      {
        id: 'd2_it_laptop.tried_restarting',
        text: 'Have you tried restarting it?',
        meaning_ko: '재시작해 봤어요?',
        note: 'The classic first question from IT.',
        note_ko: 'IT가 가장 먼저 하는 전형적인 질문입니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'd3_one_on_one',
    title: 'First one-on-one',
    title_ko: '첫 1:1 면담',
    place: 'office_manager',
    npc: 'maya',
    day_from: 3,
    day_to: 3,
    time_from: '10:30',
    time_to: '13:00',
    summary: 'Your first 1:1 with Maya: how you are settling in, your priorities, and how you like to get feedback.',
    summary_ko: '마야와의 첫 1:1: 적응은 잘 하는지, 우선순위, 피드백을 어떻게 받고 싶은지.',
    sort: 10,
    tags: 'manager,feedback,1:1',
    calendar: { day: 3, time: '11:00', title: '1:1 with Maya', title_ko: '마야와 1:1' },
    turns: [
      {
        speaker: 'maya',
        situation: 'Maya has two cups of tea on her desk, one for you.',
        situation_ko: '마야의 책상에 차 두 잔이 있습니다. 하나는 당신 것입니다.',
        line: 'So, first week. How are you settling in?',
        line_ko: '그래서, 첫 주네요. 적응은 잘하고 있어요?',
        prompt: 'Things are good, and your teammates have made it easy. Tell her.',
        prompt_ko: '잘 지내고 있고, 팀원들 덕분에 수월했습니다. 말하세요.',
        model: "It's going well. Everyone's been really helpful.",
        model_ko: '잘 되고 있어요. 다들 정말 많이 도와줬어요.',
        distractors: [
          {
            text: "Pretty well, though Derek's code reviews are kind of harsh.",
            text_ko: '잘 지내요. 근데 데릭 코드 리뷰가 좀 가혹하더라고요.',
            reaction: "Oh? He's thorough, but I'll keep that in mind.",
            reaction_ko: '그래요? 꼼꼼한 편이긴 한데, 기억해 둘게요.'
          },
          {
            text: "Honestly, I'm a bit lost. Nobody really explains anything.",
            text_ko: '솔직히 좀 헤매요. 아무도 설명을 잘 안 해 줘요.',
            reaction: "Oh no. That's not great. What's been unclear?",
            reaction_ko: '저런. 그건 좀 문제네요. 뭐가 헷갈렸어요?'
          },
          {
            text: "Good! The tea's great, by the way. What kind is it?",
            text_ko: '좋아요! 그나저나 차 맛있네요. 무슨 차예요?',
            reaction: "Ha, just chamomile. But how's work going?",
            reaction_ko: '하하, 그냥 캐모마일이에요. 그래서 일은 어때요?'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Love to hear that. Derek says you're picking things up fast.",
        reply_ko: '반가운 얘기네요. 데릭이 당신이 빨리 배운대요.'
      },
      {
        speaker: 'maya',
        situation: 'She opens a short list on her laptop.',
        situation_ko: '그녀가 노트북에서 짧은 목록을 엽니다.',
        line: "Let's talk priorities. For the next two weeks, I'd like you to focus on the checkout bug backlog. Does that make sense?",
        line_ko: '우선순위 얘기해 봐요. 앞으로 2주 동안은 결제 버그 백로그에 집중해 줬으면 해요. 이해되죠?',
        prompt: "You're on board. Ask where in the backlog to begin.",
        prompt_ko: '동의합니다. 백로그 중 어디부터 시작할지 물어보세요.',
        model: 'Makes sense. Which bugs should I start with?',
        model_ko: '이해했어요. 어떤 버그부터 시작할까요?',
        distractors: [
          {
            text: 'Makes sense. Should I fix all of them in two days?',
            text_ko: '이해했어요. 이틀 안에 다 고치면 될까요?',
            reaction: 'Two weeks, not two days! No need to rush.',
            reaction_ko: '이틀 말고 2주요! 서두를 필요 없어요.'
          },
          {
            text: "Sure. But honestly, I'd rather build new features.",
            text_ko: '네. 근데 솔직히 새 기능 만드는 게 더 좋은데요.',
            reaction: 'I hear you. Bugs first, though. Features come later.',
            reaction_ko: '알아요. 그래도 버그가 먼저예요. 기능은 나중에.'
          },
          {
            text: 'Makes sense. Is it the checkout backlog or login?',
            text_ko: '이해했어요. 결제 백로그예요, 로그인 쪽이에요?',
            reaction: "Checkout. That's where the team is right now.",
            reaction_ko: '결제요. 지금 팀이 거기에 있어요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Start with anything tagged P1. Priya can walk you through them.',
        reply_ko: 'P1 태그가 붙은 것부터요. 프리야가 자세히 설명해 줄 거예요.'
      },
      {
        speaker: 'maya',
        situation: 'Maya closes the list and turns to you.',
        situation_ko: '마야가 목록을 닫고 당신을 봅니다.',
        line: 'Is there anything I can do to support you better?',
        line_ko: '내가 더 잘 도와줄 수 있는 게 있을까요?',
        prompt: "You'd like to understand the bigger picture: what the product does and who uses it.",
        prompt_ko: '제품이 무엇을 하고 누가 쓰는지, 큰 그림을 이해하고 싶습니다.',
        model: 'It would help to get more context about the product and our customers.',
        model_ko: '제품이랑 우리 고객에 대해 배경을 더 알면 도움이 될 것 같아요.',
        distractors: [
          {
            text: 'Honestly, a raise would help a lot. Rent in Fairview is pretty steep.',
            text_ko: '솔직히 연봉 인상이 제일 도움 돼요. 페어뷰 월세가 꽤 비싸서요.',
            reaction: "Ha. Let's revisit that at your review, okay?",
            reaction_ko: '하하. 그건 평가 때 다시 얘기해요, 알았죠?'
          },
          {
            text: "I think I'm good. Maybe just fewer meetings? Standup feels long.",
            text_ko: '괜찮은 것 같아요. 회의만 좀 줄면요? 스탠드업이 길게 느껴져요.',
            reaction: "Really? Standup's fifteen minutes, tops.",
            reaction_ko: '그래요? 스탠드업 길어야 15분인데요.'
          },
          {
            text: 'It would help if Derek reviewed my pull requests a lot faster.',
            text_ko: '데릭이 제 풀 리퀘스트를 훨씬 빨리 리뷰해 주면 도움이 될 것 같아요.',
            reaction: 'Hmm. Have you told Derek that yourself?',
            reaction_ko: '음. 데릭한테 직접 얘기해 봤어요?'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Totally fair. I'll set you up with a product demo next week.",
        reply_ko: '충분히 그래요. 다음 주에 제품 데모를 잡아 줄게요.'
      },
      {
        speaker: 'maya',
        situation: 'She writes a note.',
        situation_ko: '그녀가 메모를 합니다.',
        line: 'And how do you like to get feedback? In the moment, or saved up for our one-on-ones?',
        line_ko: '그리고 피드백은 어떻게 받는 게 좋아요? 그때그때, 아니면 모아 뒀다가 1:1에서?',
        prompt: "You don't like waiting a week to find out what you did wrong. Tell her.",
        prompt_ko: '잘못한 걸 일주일 뒤에야 아는 건 싫습니다. 그렇게 말하세요.',
        model: "I'd prefer to hear it right away, in the moment.",
        model_ko: '그때그때 바로바로 듣는 게 더 좋아요.',
        distractors: [
          {
            text: "I'd prefer to save it up for our one-on-ones, if possible.",
            text_ko: '되도록이면 모아 뒀다가 1:1에서 듣고 싶어요.',
            reaction: "Okay, so you'd rather wait a week to hear it?",
            reaction_ko: '그럼 일주일 기다렸다가 듣는 게 좋다는 거죠?'
          },
          {
            text: "Honestly, I'd prefer not to get much feedback at all.",
            text_ko: '솔직히 피드백은 별로 안 받고 싶어요.',
            reaction: 'Hmm. Everyone needs some, though.',
            reaction_ko: '음. 그래도 다들 조금은 필요해요.'
          },
          {
            text: "I'd prefer it in writing, so I can show it to HR.",
            text_ko: '인사팀에 보여 줄 수 있게 글로 받고 싶어요.',
            reaction: "HR? It's not that kind of feedback, Jun.",
            reaction_ko: '인사팀이요? 그런 피드백이 아니에요, 준.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Noted.',
        reply_ko: '알겠어요.'
      },
      {
        speaker: 'maya',
        situation: 'The 1:1 is almost over.',
        situation_ko: '1:1이 거의 끝나 갑니다.',
        line: "Let's keep this weekly. Same time next Wednesday?",
        line_ko: '이거 매주 해요. 다음 주 수요일 같은 시간 어때요?',
        prompt: 'That schedule suits you. Say so.',
        prompt_ko: '그 일정이 좋습니다. 그렇게 말하세요.',
        model: 'Sounds good. Same time works for me.',
        model_ko: '좋아요. 같은 시간 괜찮아요.',
        distractors: [
          {
            text: 'Sounds good. See you next Thursday, then.',
            text_ko: '좋아요. 그럼 다음 주 목요일에 봬요.',
            reaction: 'Wednesday, actually. Same as today.',
            reaction_ko: '수요일이에요. 오늘이랑 같은 요일.'
          },
          {
            text: "Weekly? Isn't that a bit much, honestly?",
            text_ko: '매주요? 솔직히 좀 많지 않아요?',
            reaction: "Trust me, it helps. Let's try it.",
            reaction_ko: '믿어 봐요, 도움 돼요. 일단 해 봐요.'
          },
          {
            text: "Sure! I'll bring the tea next time.",
            text_ko: '좋아요! 다음엔 제가 차 가져올게요.',
            reaction: 'Ha, deal. So Wednesday works?',
            reaction_ko: '하하, 좋아요. 그래서 수요일 괜찮아요?'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Great. Keep up the good work!',
        reply_ko: '좋아요. 계속 잘해 줘요!'
      }
    ],
    phrases: [
      {
        id: 'd3_one_on_one.in_the_moment',
        text: "I'd prefer to hear it right away.",
        meaning_ko: '바로 듣는 게 좋아요.',
        note: "\"I'd prefer\" is softer than \"I want\".",
        note_ko: "\"I'd prefer\"는 \"I want\"보다 부드럽습니다.",
        category: 'office'
      },
      {
        id: 'd3_one_on_one.keep_up',
        text: 'Keep up the good work!',
        meaning_ko: '계속 잘해 줘요!',
        note: 'Praise and encouragement from a manager.',
        note_ko: '매니저의 칭찬이자 격려입니다.',
        category: 'office'
      },
      {
        id: 'd3_one_on_one.more_context',
        text: 'It would help to get more context.',
        meaning_ko: '배경 설명을 더 들으면 도움이 될 것 같아요.',
        note: 'A polite way to ask for support.',
        note_ko: '도움을 정중하게 요청하는 방법입니다.',
        category: 'office'
      },
      {
        id: 'd3_one_on_one.picking_up_fast',
        text: "You're picking things up fast.",
        meaning_ko: '빨리 배우네요.',
        note: '"Pick up" can mean learn.',
        note_ko: 'pick up은 배우다라는 뜻으로도 씁니다.',
        category: 'office'
      },
      {
        id: 'd3_one_on_one.settling_in',
        text: 'How are you settling in?',
        meaning_ko: '적응은 잘 돼요?',
        note: '"Settle in" = get used to a new place or job.',
        note_ko: 'settle in은 새 장소나 일에 적응하는 것입니다.',
        category: 'office'
      },
      {
        id: 'd3_one_on_one.start_with',
        text: 'Which bugs should I start with?',
        meaning_ko: '어떤 버그부터 시작할까요?',
        note: 'Asks where to begin.',
        note_ko: '어디서부터 시작할지 묻는 표현입니다.',
        category: 'office'
      },
      {
        id: 'd3_one_on_one.talk_priorities',
        text: "Let's talk priorities.",
        meaning_ko: '우선순위 얘기를 해 봐요.',
        note: 'Starts a talk about what matters most.',
        note_ko: '무엇이 가장 중요한지 이야기를 꺼내는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'd3_one_on_one.walk_through',
        text: 'Priya can walk you through them.',
        meaning_ko: '프리야가 하나하나 설명해 줄 거예요.',
        note: '"Walk someone through" = explain step by step.',
        note_ko: 'walk someone through는 차근차근 설명하는 것입니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'd3_lunch',
    title: 'Taco lunch with Derek',
    title_ko: '데릭과 타코 점심',
    place: 'office_desk_team',
    npc: 'derek',
    day_from: 3,
    day_to: 3,
    time_from: '11:30',
    time_to: '13:30',
    summary: 'Derek invites you to lunch at a food truck. Accept, and make small talk about the weekend and Fairview.',
    summary_ko: '데릭이 푸드트럭 점심에 초대합니다. 수락하고 주말과 페어뷰에 대해 가볍게 이야기하세요.',
    reward: -12,
    energy: 35,
    sort: 15,
    tags: 'small-talk,lunch,food',
    calendar: { day: 3, time: '12:00', title: 'Taco lunch with the team', title_ko: '팀과 타코 점심' },
    turns: [
      {
        speaker: 'derek',
        situation: 'It is almost noon. Derek stands up and grabs his jacket.',
        situation_ko: '거의 정오입니다. 데릭이 일어나 재킷을 집어 듭니다.',
        line: 'Hey, a few of us are grabbing tacos from the food truck. Wanna come?',
        line_ko: '저기, 몇 명이서 푸드트럭에 타코 사러 가는데. 같이 갈래요?',
        prompt: "You'd like to go. Say yes and get ready to head out.",
        prompt_ko: '가고 싶습니다. 좋다고 하고 나갈 준비를 하세요.',
        model: "Sure, I'd love to. Let me grab my wallet.",
        model_ko: '좋아요, 같이 가요. 지갑만 챙길게요.',
        distractors: [
          {
            text: "Maybe later? I'll catch up after this ticket.",
            text_ko: '이따 갈까요? 이 티켓 끝내고 따라갈게요.',
            reaction: 'Your call, but the line gets brutal after twelve.',
            reaction_ko: '알아서 해요. 근데 열두 시 넘으면 줄이 장난 아니에요.'
          },
          {
            text: "Tacos? Ugh, I'm not really into food trucks.",
            text_ko: '타코요? 으, 푸드트럭은 별로라서요.',
            reaction: 'Oh. Okay, no pressure.',
            reaction_ko: '아. 그래요, 부담 갖지 마요.'
          },
          {
            text: "Sure, I'd love to. Is it the diner on Lake Avenue?",
            text_ko: '좋아요, 같이 가요. 레이크 애비뉴 다이너예요?',
            reaction: "No, the food truck. It's right out front.",
            reaction_ko: '아뇨, 푸드트럭이요. 바로 앞에 있어요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Nice! The line gets long after twelve, so let's go.",
        reply_ko: '좋아요! 열두 시 넘으면 줄이 길어지니까 가요.'
      },
      {
        speaker: 'derek',
        situation: 'You wait in line at the food truck.',
        situation_ko: '푸드트럭 앞에서 줄을 서 있습니다.',
        line: 'So, any big plans for the weekend?',
        line_ko: '그래서 주말에 무슨 큰 계획 있어요?',
        prompt: "Nothing big is planned, but you'd like to see the park and get to know the town.",
        prompt_ko: '큰 계획은 없지만 공원에도 가 보고 동네를 알아 가고 싶습니다.',
        model: "Not really. I'm thinking of checking out the park and exploring the city.",
        model_ko: '딱히요. 공원에도 가 보고 시내 구경이나 할까 해요.',
        distractors: [
          {
            text: "Yeah, I'm flying back to Seoul for the weekend to see my family and friends.",
            text_ko: '네, 주말에 가족이랑 친구들 보러 서울에 다녀오려고요.',
            reaction: "Whoa, for two days? That's a long flight!",
            reaction_ko: '와, 이틀 동안요? 비행기만 한참인데!'
          },
          {
            text: "Not really. I'll probably just catch up on work all weekend.",
            text_ko: '딱히요. 아마 주말 내내 밀린 일이나 할 것 같아요.',
            reaction: "Dude, no. It's your first week. Go outside!",
            reaction_ko: '에이, 안 돼요. 첫 주잖아요. 밖에 좀 나가요!'
          },
          {
            text: 'Not really. Why, are you and the team doing something fun this weekend?',
            text_ko: '딱히요. 왜요, 팀 사람들이랑 이번 주말에 뭐 재밌는 거 해요?',
            reaction: 'Nah, just chores. But what about you? Anything?',
            reaction_ko: '아뇨, 그냥 집안일이요. 근데 당신은요? 뭐 없어요?'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Oh, you should hit the farmers market at Seaside Park on Saturday. It's great.",
        reply_ko: '아, 토요일에 시사이드 공원 파머스 마켓에 꼭 가 봐요. 좋아요.'
      },
      {
        speaker: 'derek',
        situation: 'You sit on a bench with your tacos.',
        situation_ko: '타코를 들고 벤치에 앉습니다.',
        line: 'Where did you live before you moved here?',
        line_ko: '여기 이사 오기 전엔 어디 살았어요?',
        prompt: 'Tell him about your hometown, Seoul, and that you came over about a month ago.',
        prompt_ko: '고향이 서울이고, 한 달쯤 전에 왔다고 말하세요.',
        model: "I'm originally from Seoul. I moved here about a month ago.",
        model_ko: '원래 서울 출신이에요. 한 달쯤 전에 이사 왔어요.',
        distractors: [
          {
            text: "I'm originally from Seoul. I moved here about a year ago.",
            text_ko: '원래 서울 출신이에요. 1년쯤 전에 이사 왔어요.',
            reaction: 'A year? Huh, I thought you just got here.',
            reaction_ko: '1년이요? 어, 막 온 줄 알았는데.'
          },
          {
            text: "I live on Maple Street now. It's a nice neighborhood.",
            text_ko: '지금은 메이플 스트리트에 살아요. 동네 좋아요.',
            reaction: 'Nice. But where were you before Fairview?',
            reaction_ko: '좋네요. 근데 페어뷰 오기 전엔요?'
          },
          {
            text: "Somewhere pretty far away. It's kind of a long story.",
            text_ko: '꽤 먼 데서요. 얘기하자면 좀 길어요.',
            reaction: "Oh. Okay, no worries, you don't have to say.",
            reaction_ko: '아. 그래요, 괜찮아요, 말 안 해도 돼요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "No way! I've always wanted to go.",
        reply_ko: '정말요? 늘 가 보고 싶었어요.'
      },
      {
        speaker: 'derek',
        situation: 'Derek wipes salsa off his hands.',
        situation_ko: '데릭이 손에 묻은 살사를 닦습니다.',
        line: 'So how are you liking Fairview so far?',
        line_ko: '그래서 페어뷰는 지금까지 어때요?',
        prompt: "You're enjoying it, but one American custom still confuses you: how much extra to leave for servers.",
        prompt_ko: '아주 좋지만 미국 관습 하나가 아직 헷갈립니다. 종업원에게 돈을 얼마나 더 남겨야 하는지요.',
        model: "I like it a lot, but I'm still getting used to tipping.",
        model_ko: '정말 좋아요. 근데 팁 문화엔 아직 적응 중이에요.',
        distractors: [
          {
            text: "I like it a lot, but I'm still getting used to driving here.",
            text_ko: '정말 좋아요. 근데 여기서 운전하는 건 아직 적응 중이에요.',
            reaction: 'Driving? I thought you took the bus.',
            reaction_ko: '운전이요? 버스 타고 다니는 줄 알았는데.'
          },
          {
            text: "It's fine, I guess. Kind of boring compared to Seoul.",
            text_ko: '그냥 그래요. 서울에 비하면 좀 심심해요.',
            reaction: 'Ouch. Give it time, it grows on you.',
            reaction_ko: '아야. 시간을 좀 줘 봐요, 점점 좋아져요.'
          },
          {
            text: 'I like it a lot. I already know how everything works here.',
            text_ko: '정말 좋아요. 여기 돌아가는 건 벌써 다 알아요.',
            reaction: 'Already? Even the weird stuff? Impressive.',
            reaction_ko: '벌써요? 이상한 것까지 다요? 대단하네요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Ha! Everyone struggles with that. Rule of thumb: fifteen to twenty percent at sit-down places.',
        reply_ko: '하! 다들 그걸 어려워해요. 대충 기준은 앉아서 먹는 곳이면 15~20퍼센트예요.'
      }
    ],
    phrases: [
      {
        id: 'd3_lunch.check_out',
        text: "I'm thinking of checking out the park.",
        meaning_ko: '공원에 한번 가 볼까 해요.',
        note: '"Check out" = go and see something new.',
        note_ko: 'check out은 새로운 곳을 가 보는 것입니다.',
        category: 'small-talk'
      },
      {
        id: 'd3_lunch.grabbing_lunch',
        text: "We're grabbing tacos.",
        meaning_ko: '타코 사 먹으러 가요.',
        note: '"Grab" = get something quickly (food, coffee, lunch).',
        note_ko: 'grab은 음식이나 커피를 간단히 사 오는 것입니다.',
        category: 'food'
      },
      {
        id: 'd3_lunch.id_love_to',
        text: "Sure, I'd love to.",
        meaning_ko: '좋아요, 꼭 갈게요.',
        note: 'A warm way to accept an invitation.',
        note_ko: '초대를 반갑게 받아들이는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'd3_lunch.liking_it_so_far',
        text: 'How are you liking Fairview so far?',
        meaning_ko: '페어뷰는 지금까지 어때요?',
        note: 'Asked to newcomers. "So far" = until now.',
        note_ko: '새로 온 사람에게 묻는 말입니다. so far는 지금까지라는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'd3_lunch.originally_from',
        text: "I'm originally from Seoul.",
        meaning_ko: '원래 서울 출신이에요.',
        note: '"Originally" shows where you grew up.',
        note_ko: 'originally는 자란 곳을 나타냅니다.',
        category: 'small-talk'
      },
      {
        id: 'd3_lunch.rule_of_thumb',
        text: 'Rule of thumb: fifteen to twenty percent.',
        meaning_ko: '대략적인 기준은 15~20퍼센트예요.',
        note: '"Rule of thumb" = a simple, practical guide.',
        note_ko: 'rule of thumb은 간단하고 실용적인 기준입니다.',
        category: 'food'
      },
      {
        id: 'd3_lunch.wanna_come',
        text: 'Wanna come?',
        meaning_ko: '같이 갈래요?',
        note: '"Wanna" = want to. Casual spoken English only.',
        note_ko: 'wanna는 want to의 구어체입니다.',
        category: 'small-talk'
      },
      {
        id: 'd3_lunch.weekend_plans',
        text: 'Any big plans for the weekend?',
        meaning_ko: '주말에 특별한 계획 있어요?',
        note: 'Very common Wednesday-to-Friday small talk.',
        note_ko: '수요일부터 금요일까지 아주 흔한 잡담입니다.',
        category: 'small-talk'
      }
    ]
  },
  {
    id: 'd3_planning',
    title: 'Sprint planning',
    title_ko: '스프린트 플래닝',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 3,
    day_to: 3,
    time_from: '13:30',
    time_to: '16:30',
    summary: 'Your first sprint planning: learn what a story point means, estimate a ticket, and take on work.',
    summary_ko: '첫 스프린트 플래닝: 스토리 포인트의 뜻을 배우고, 티켓을 추정하고, 일을 맡으세요.',
    sort: 20,
    tags: 'meeting,planning,agile',
    calendar: { day: 3, time: '14:00', title: 'Sprint planning', title_ko: '스프린트 플래닝' },
    turns: [
      {
        speaker: 'priya',
        situation: 'The whole team is in the meeting room. A board full of tickets is on the screen.',
        situation_ko: '팀 전원이 회의실에 있습니다. 화면에 티켓이 가득한 보드가 떠 있습니다.',
        line: "Welcome to your first sprint planning! We'll go through the tickets and estimate each one in story points.",
        line_ko: '첫 스프린트 플래닝에 온 걸 환영해요! 티켓을 하나씩 보면서 스토리 포인트로 추정할 거예요.',
        prompt: 'Teams measure these differently. Find out how this team sizes its work.',
        prompt_ko: '팀마다 기준이 다릅니다. 이 팀은 일의 크기를 어떻게 매기는지 알아보세요.',
        model: 'Quick question: what does one story point mean for this team?',
        model_ko: '잠깐 질문이요. 이 팀에서 스토리 포인트 1은 어느 정도예요?',
        distractors: [
          {
            text: 'Quick question: how many tickets do we usually finish a sprint?',
            text_ko: '잠깐 질문이요. 한 스프린트에 보통 티켓을 몇 개 끝내요?',
            reaction: "Depends on the sprint. You'll get a feel for it!",
            reaction_ko: '스프린트마다 달라요. 곧 감이 올 거예요!'
          },
          {
            text: 'Honestly, story points are kind of pointless. Can we use hours?',
            text_ko: '솔직히 스토리 포인트는 좀 쓸모없지 않아요? 시간으로 하면 안 돼요?',
            reaction: "Ha, that's a debate for another day.",
            reaction_ko: '하하, 그건 다음에 토론해요.'
          },
          {
            text: "Got it. I've used story points before, so I'll just jump in.",
            text_ko: '알겠어요. 스토리 포인트는 써 봤으니까 바로 할게요.',
            reaction: "Great, but every team's scale is a bit different.",
            reaction_ko: '좋아요. 근데 팀마다 기준이 좀 달라요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Good question. It's about effort and complexity, not hours. A one is tiny, an eight is big.",
        reply_ko: '좋은 질문이에요. 시간이 아니라 노력과 복잡도예요. 1은 아주 작고 8은 커요.'
      },
      {
        speaker: 'priya',
        situation: 'Priya opens the first ticket.',
        situation_ko: '프리야가 첫 번째 티켓을 엽니다.',
        line: "First ticket: add a 'save card for later' checkbox to checkout. What would you estimate?",
        line_ko: "첫 번째 티켓: 결제 화면에 '카드 저장' 체크박스 추가. 얼마로 추정해요?",
        prompt: 'Give your estimate, a three, and your reasoning: easy screen work, but card data needs thorough checking.',
        prompt_ko: '추정치 3을 말하고 이유를 대세요. 화면 작업은 쉽지만 카드 데이터라 꼼꼼히 확인해야 합니다.',
        model: "I'd say a three. The UI is simple, but we need to test it carefully.",
        model_ko: '3이요. UI는 간단한데 테스트는 꼼꼼히 해야 해요.',
        distractors: [
          {
            text: "I'd say an eight. The UI is simple, but testing will take a bit.",
            text_ko: '8이요. UI는 간단한데 테스트에 시간이 좀 걸려요.',
            reaction: "An eight? That's our biggest. For a checkbox?",
            reaction_ko: '8이요? 제일 큰 건데요. 체크박스 하나에?'
          },
          {
            text: "Maybe three hours? It's just one checkbox on the page.",
            text_ko: '세 시간쯤요? 페이지에 체크박스 하나잖아요.',
            reaction: 'Points, not hours, remember?',
            reaction_ko: '시간 말고 포인트요, 기억하죠?'
          },
          {
            text: "That's a one. It's just a checkbox. No real testing needed.",
            text_ko: '그건 1이죠. 체크박스 하나라 테스트도 필요 없어요.',
            reaction: "Hmm, it's people's card info, though. Risky.",
            reaction_ko: '음, 그래도 사람들 카드 정보잖아요. 위험해요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'Derek said three too. Three it is.',
        reply_ko: '데릭도 3이래요. 3으로 하죠.'
      },
      {
        speaker: 'priya',
        situation: 'The next ticket has only one line: "Refunds sometimes fail."',
        situation_ko: '다음 티켓에는 딱 한 줄뿐입니다: "환불이 가끔 실패함."',
        line: "Next one's the refund bug. It's pretty vague. Anybody want to take it?",
        line_ko: '다음은 환불 버그예요. 꽤 모호해요. 맡을 사람?',
        prompt: "Volunteer for it, but say what you'd need before you start.",
        prompt_ko: '맡겠다고 나서되, 시작하기 전에 필요한 게 있다고 말하세요.',
        model: "I can take it, but I'll need more details first.",
        model_ko: '제가 맡을게요. 근데 먼저 세부 정보가 더 필요해요.',
        distractors: [
          {
            text: "I'll take it. Should be fixed by tomorrow, easy.",
            text_ko: '제가 할게요. 내일까지 쉽게 고칠 수 있어요.',
            reaction: "Bold! It's only one line, though. You sure?",
            reaction_ko: '자신만만하네요! 근데 딱 한 줄인데, 괜찮겠어요?'
          },
          {
            text: 'Not me. That ticket is way too vague to work on.',
            text_ko: '전 빠질게요. 그 티켓은 너무 모호해서 못 해요.',
            reaction: 'Fair, but someone has to take it.',
            reaction_ko: '그렇긴 한데, 누군가는 맡아야 해요.'
          },
          {
            text: "I can take it. What's the story point estimate?",
            text_ko: '제가 맡을게요. 스토리 포인트는 몇이에요?',
            reaction: "We haven't estimated it yet. It's that vague.",
            reaction_ko: '아직 추정 안 했어요. 그만큼 모호해요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Love it. I'll add the customer's steps to the ticket.",
        reply_ko: '좋아요. 고객이 겪은 단계를 티켓에 추가할게요.'
      },
      {
        speaker: 'priya',
        situation: 'The sprint board is full now.',
        situation_ko: '이제 스프린트 보드가 꽉 찼습니다.',
        line: "Okay, I think we're at capacity. Does anyone feel like this sprint is too much?",
        line_ko: '자, 이제 꽉 찬 것 같아요. 이번 스프린트가 너무 많다고 느끼는 사람 있어요?',
        prompt: 'You think the team can handle it. Say so.',
        prompt_ko: '팀이 해낼 수 있다고 생각합니다. 그렇게 말하세요.',
        model: 'It looks doable to me.',
        model_ko: '제가 보기엔 할 만해요.',
        distractors: [
          {
            text: 'Way too much, honestly.',
            text_ko: '솔직히 너무 많아요.',
            reaction: 'Oh? Which part feels like too much?',
            reaction_ko: '그래요? 어느 부분이 많아요?'
          },
          {
            text: 'Yes, it looks fine to me.',
            text_ko: '네, 괜찮아 보여요.',
            reaction: "Wait, yes it's too much, or it's fine?",
            reaction_ko: '잠깐, 많다는 거예요, 괜찮다는 거예요?'
          },
          {
            text: "Sure, I'll take more.",
            text_ko: '네, 더 맡을게요.',
            reaction: "Ha, easy, tiger. It's your first sprint.",
            reaction_ko: '하하, 진정해요. 첫 스프린트잖아요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Great. Let's lock it in. Thanks, everyone!",
        reply_ko: '좋아요. 이걸로 확정해요. 다들 고마워요!'
      }
    ],
    phrases: [
      {
        id: 'd3_planning.at_capacity',
        text: "We're at capacity.",
        meaning_ko: '더 받을 여유가 없어요.',
        note: 'The team cannot take more work.',
        note_ko: '팀이 더 이상 일을 받을 수 없다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'd3_planning.id_say',
        text: "I'd say a three.",
        meaning_ko: '3 정도라고 봐요.',
        note: "\"I'd say …\" gives an opinion or an estimate softly.",
        note_ko: "\"I'd say …\"는 의견이나 추정을 부드럽게 말합니다.",
        category: 'meeting'
      },
      {
        id: 'd3_planning.it_is',
        text: 'Three it is.',
        meaning_ko: '3으로 하죠.',
        note: '"[Choice] it is" = that is decided.',
        note_ko: '"[선택] it is"는 그걸로 정했다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'd3_planning.lock_it_in',
        text: "Let's lock it in.",
        meaning_ko: '이걸로 확정해요.',
        note: 'Makes a plan final.',
        note_ko: '계획을 확정할 때 씁니다.',
        category: 'meeting'
      },
      {
        id: 'd3_planning.need_more_details',
        text: "I can take it, but I'll need more details first.",
        meaning_ko: '맡을게요, 그런데 먼저 자세한 정보가 필요해요.',
        note: 'Volunteer and set a condition at the same time.',
        note_ko: '자원하면서 동시에 조건을 거는 표현입니다.',
        category: 'meeting'
      },
      {
        id: 'd3_planning.story_points',
        text: 'story points',
        meaning_ko: '스토리 포인트',
        note: 'A unit for estimating effort in agile teams, not hours.',
        note_ko: '애자일 팀이 시간 대신 노력을 추정하는 단위입니다.',
        category: 'meeting'
      },
      {
        id: 'd3_planning.vague',
        text: "It's pretty vague.",
        meaning_ko: '꽤 모호해요.',
        note: '"Vague" = not clear or detailed.',
        note_ko: 'vague는 분명하지 않거나 자세하지 않다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'd3_planning.what_does_mean',
        text: 'What does one story point mean for this team?',
        meaning_ko: '이 팀에서 스토리 포인트 1은 무슨 뜻이에요?',
        note: 'Every team uses points a little differently, so it is a smart question.',
        note_ko: '팀마다 포인트를 조금씩 다르게 써서 좋은 질문입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'd4_deadline',
    title: 'Pushing the deadline',
    title_ko: '마감 미루기',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 4,
    day_to: 4,
    time_from: '10:15',
    time_to: '15:00',
    summary: 'The refund bug is harder than expected. Tell Priya early, ask for more time, and agree on a smaller scope.',
    summary_ko: '환불 버그가 생각보다 어렵습니다. 프리야에게 미리 알리고, 시간을 더 요청하고, 범위를 줄이는 데 합의하세요.',
    sort: 10,
    tags: 'meeting,negotiation,planning',
    calendar: { day: 4, time: '11:00', title: 'Refund bug check-in with Priya', title_ko: '프리야와 환불 버그 점검' },
    turns: [
      {
        speaker: 'priya',
        situation: 'Priya stops by the meeting room door with her coffee.',
        situation_ko: '프리야가 커피를 들고 회의실 문 앞에 멈춰 섭니다.',
        line: "How's the refund bug coming along? Are we still on track for Friday?",
        line_ko: '환불 버그는 어떻게 돼 가요? 금요일 일정은 아직 맞출 수 있어요?',
        prompt: "It's not going as fast as you hoped. Don't hide it.",
        prompt_ko: '생각만큼 빨리 진행되지 않고 있습니다. 숨기지 마세요.',
        model: "Honestly, it's taking longer than I expected.",
        model_ko: '솔직히 생각보다 오래 걸리고 있어요.',
        distractors: [
          {
            text: 'Yep, totally on track. No problems at all.',
            text_ko: '네, 완전 일정대로예요. 아무 문제 없어요.',
            reaction: 'Great! So I can tell the client Friday?',
            reaction_ko: '좋아요! 그럼 고객한테 금요일이라고 해도 되죠?'
          },
          {
            text: 'Not great. Whoever wrote that code made a mess.',
            text_ko: '별로예요. 그 코드 짠 사람이 엉망으로 짰어요.',
            reaction: 'Okay... but where are you with it?',
            reaction_ko: '음… 그래서 어디까지 됐어요?'
          },
          {
            text: "It's going. Why, did the deadline move up?",
            text_ko: '하고는 있어요. 왜요, 마감이 당겨졌어요?',
            reaction: 'No, still Friday. Are we on track?',
            reaction_ko: '아뇨, 그대로 금요일이에요. 맞출 수 있어요?'
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'Okay. Thanks for flagging it early.',
        reply_ko: '알겠어요. 일찍 알려 줘서 고마워요.'
      },
      {
        speaker: 'priya',
        situation: 'She sits down across from you.',
        situation_ko: '그녀가 맞은편에 앉습니다.',
        line: "What's slowing you down?",
        line_ko: '뭐 때문에 늦어지고 있어요?',
        prompt: 'Explain the cause: the code is years old, and nothing checks it automatically.',
        prompt_ko: '원인을 설명하세요. 몇 년 된 코드인데, 자동으로 확인해 주는 장치가 하나도 없습니다.',
        model: 'The bug is in some old code, and there are no tests for it.',
        model_ko: '버그가 오래된 코드에 있는데, 테스트가 하나도 없어요.',
        distractors: [
          {
            text: "Derek's been too busy to review anything I send him.",
            text_ko: '데릭이 바빠서 제가 보낸 걸 리뷰를 못 해 줘요.',
            reaction: "Hmm, I'll talk to him. But what about the bug itself?",
            reaction_ko: '음, 얘기해 볼게요. 그래도 버그 자체는 어때요?'
          },
          {
            text: 'The bug is in brand-new code, and the tests keep failing.',
            text_ko: '버그가 완전 새 코드에 있는데 테스트가 계속 실패해요.',
            reaction: 'New code? I thought refunds were the old system.',
            reaction_ko: '새 코드요? 환불은 옛날 시스템인 줄 알았는데.'
          },
          {
            text: "Honestly, I've been really tired this week. New city and all.",
            text_ko: '솔직히 이번 주에 너무 피곤했어요. 새 도시라서요.',
            reaction: "That's totally normal. But is something blocking the bug?",
            reaction_ko: '충분히 그럴 수 있죠. 근데 버그 쪽에 막힌 게 있어요?'
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'Ah, the legacy stuff. That makes sense.',
        reply_ko: '아, 레거시 코드군요. 그럴 만하네요.'
      },
      {
        speaker: 'priya',
        situation: 'Priya taps her pen on the table.',
        situation_ko: '프리야가 펜으로 테이블을 톡톡 칩니다.',
        line: 'So what do you need? More time?',
        line_ko: '그래서 뭐가 필요해요? 시간이 더 필요해요?',
        prompt: "You'd need until next Tuesday. Ask for that.",
        prompt_ko: '다음 주 화요일까지는 필요합니다. 그렇게 해 줄 수 있는지 물어보세요.',
        model: 'Could we push the deadline to next Tuesday?',
        model_ko: '마감을 다음 주 화요일로 미룰 수 있을까요?',
        distractors: [
          {
            text: 'Could we push the deadline to next Thursday?',
            text_ko: '마감을 다음 주 목요일로 미룰 수 있을까요?',
            reaction: "Thursday? That's a whole week late.",
            reaction_ko: '목요일이요? 꼬박 일주일 늦는 건데요.'
          },
          {
            text: 'Yes. I need until Tuesday, no matter what.',
            text_ko: '네. 무슨 일이 있어도 화요일까지는 필요해요.',
            reaction: "Whoa. Let's talk options before \"no matter what.\"",
            reaction_ko: "워. '무슨 일이 있어도' 전에 방법부터 얘기해요."
          },
          {
            text: 'Could you give the ticket to Derek instead?',
            text_ko: '그 티켓 그냥 데릭한테 넘겨도 될까요?',
            reaction: "Hmm, he's swamped. Let's figure this out together.",
            reaction_ko: '음, 데릭은 일이 꽉 찼어요. 같이 방법을 찾아봐요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Hmm. Tuesday's tough. The client demo is on Monday.",
        reply_ko: '음. 화요일은 힘들어요. 고객 데모가 월요일이거든요.'
      },
      {
        speaker: 'priya',
        situation: 'She thinks for a moment.',
        situation_ko: '그녀가 잠시 생각합니다.',
        line: 'Is there any way to cut the scope and ship part of it on Friday?',
        line_ko: '범위를 줄여서 금요일에 일부라도 내보낼 방법은 없을까요?',
        prompt: 'Offer a split: the card payments part on Friday, everything else after.',
        prompt_ko: '나눠서 하자고 제안하세요. 카드 결제 부분은 금요일에, 나머지는 그 뒤에요.',
        model: 'We could ship the fix for card payments first and do the rest next week.',
        model_ko: '카드 결제 수정부터 먼저 내보내고 나머지는 다음 주에 할 수 있어요.',
        distractors: [
          {
            text: 'I could just stay late every night this week and ship all of it Friday.',
            text_ko: '제가 이번 주 매일 밤 늦게까지 남아서 금요일에 전부 내보낼게요.',
            reaction: "Please don't. I'd rather cut scope than burn you out.",
            reaction_ko: '그러지 마요. 무리하느니 범위를 줄이는 게 나아요.'
          },
          {
            text: 'We could skip the tests for now and ship the whole fix Friday.',
            text_ko: '일단 테스트는 건너뛰고 금요일에 전체 수정을 내보내면 돼요.',
            reaction: 'No tests on refunds? That scares me a little.',
            reaction_ko: '환불에 테스트가 없다고요? 그건 좀 무서운데요.'
          },
          {
            text: 'We could ship the fix for gift cards first and do the rest on Tuesday.',
            text_ko: '기프트 카드 수정부터 먼저 내보내고 나머지는 화요일에 해요.',
            reaction: 'Gift cards? I thought card payments were the big one.',
            reaction_ko: '기프트 카드요? 카드 결제가 제일 큰 거 아니었어요?'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "That's a great compromise. Let's do that. I'll update the ticket.",
        reply_ko: '좋은 절충안이에요. 그렇게 해요. 티켓을 고칠게요.'
      }
    ],
    phrases: [
      {
        id: 'd4_deadline.coming_along',
        text: "How's it coming along?",
        meaning_ko: '어떻게 돼 가요?',
        note: 'Asks about progress on a task.',
        note_ko: '일의 진행 상황을 묻는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'd4_deadline.compromise',
        text: "That's a great compromise.",
        meaning_ko: '좋은 절충안이에요.',
        note: 'Both sides give a little.',
        note_ko: '양쪽이 조금씩 양보한 방안입니다.',
        category: 'meeting'
      },
      {
        id: 'd4_deadline.cut_the_scope',
        text: 'cut the scope',
        meaning_ko: '범위를 줄이다',
        note: 'Do less so you can finish on time.',
        note_ko: '제때 끝내기 위해 할 일을 줄이는 것입니다.',
        category: 'meeting'
      },
      {
        id: 'd4_deadline.flag_early',
        text: 'Thanks for flagging it early.',
        meaning_ko: '일찍 알려 줘서 고마워요.',
        note: '"Flag" = point out a problem. US managers value early warnings.',
        note_ko: 'flag는 문제를 알리는 것입니다. 미국 매니저들은 이른 경고를 좋아합니다.',
        category: 'meeting'
      },
      {
        id: 'd4_deadline.on_track',
        text: 'Are we still on track for Friday?',
        meaning_ko: '금요일 일정대로 가고 있어요?',
        note: '"On track" = going as planned.',
        note_ko: 'on track은 계획대로 되고 있다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'd4_deadline.push_the_deadline',
        text: 'Could we push the deadline to next Tuesday?',
        meaning_ko: '마감을 다음 주 화요일로 미룰 수 있을까요?',
        note: '"Push (back)" = move to a later time.',
        note_ko: 'push (back)은 더 늦은 때로 미루는 것입니다.',
        category: 'meeting'
      },
      {
        id: 'd4_deadline.slowing_down',
        text: "What's slowing you down?",
        meaning_ko: '뭐 때문에 늦어지고 있어요?',
        note: 'Asks about the cause of a delay.',
        note_ko: '지연의 원인을 묻는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'd4_deadline.taking_longer',
        text: "It's taking longer than I expected.",
        meaning_ko: '생각보다 오래 걸리고 있어요.',
        note: 'An honest, polite way to report a delay.',
        note_ko: '지연을 솔직하고 정중하게 알리는 표현입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'd4_benefits',
    title: 'HR paperwork and benefits',
    title_ko: '인사 서류와 복리후생',
    place: 'office_hr',
    npc: 'linda',
    day_from: 4,
    day_to: 4,
    time_from: '12:30',
    time_to: '17:30',
    summary: 'Finish your new-hire paperwork with Linda: the W-4 tax form, a health insurance plan, and the 401(k).',
    summary_ko: '린다와 신입 서류를 마무리하세요. W-4 세금 양식, 건강보험 플랜, 401(k)까지.',
    sort: 20,
    tags: 'hr,benefits,money',
    calendar: { day: 4, time: '14:00', title: 'Benefits enrollment with HR', title_ko: '인사팀과 복리후생 가입' },
    turns: [
      {
        speaker: 'linda',
        situation: 'Linda has a folder with your name on it.',
        situation_ko: '린다 앞에 당신 이름이 적힌 폴더가 있습니다.',
        line: 'Hi! Thanks for coming by. We just need to finish your new-hire paperwork. Did you fill out your W-4 yet?',
        line_ko: '안녕하세요! 와 줘서 고마워요. 신입 사원 서류만 마무리하면 돼요. W-4는 작성했어요?',
        prompt: "You haven't, and you don't really know what that form does. Ask.",
        prompt_ko: '아직 안 했고, 그 양식이 뭘 하는 건지 잘 모릅니다. 물어보세요.',
        model: "Not yet. What's the W-4 for, exactly?",
        model_ko: '아직요. W-4는 정확히 뭐 하는 거예요?',
        distractors: [
          {
            text: 'Yes, I sent it in last week.',
            text_ko: '네, 그건 지난주에 이미 제출했어요.',
            reaction: "Hmm, I don't see it in here. Are you sure?",
            reaction_ko: '음, 여기엔 없는데요. 확실해요?'
          },
          {
            text: 'Not yet. Can you just fill it out for me?',
            text_ko: '아직요. 그냥 대신 써 주시면 안 돼요?',
            reaction: "I can't, sorry. It has to come from you.",
            reaction_ko: '죄송해요, 그건 안 돼요. 본인이 직접 써야 해요.'
          },
          {
            text: 'Not yet. Is that the health insurance form?',
            text_ko: '아직요. 그게 건강보험 양식이에요?',
            reaction: "No, that comes next. This one's different.",
            reaction_ko: '아뇨, 그건 다음이에요. 이건 다른 거예요.'
          }
        ],
        reply_speaker: 'linda',
        reply_line: 'It tells payroll how much federal income tax to withhold from each paycheck.',
        reply_ko: '급여팀에 매 급여에서 연방 소득세를 얼마나 떼어 둘지 알려 주는 양식이에요.'
      },
      {
        speaker: 'linda',
        situation: 'She puts two brochures in front of you.',
        situation_ko: '그녀가 안내 책자 두 개를 당신 앞에 놓습니다.',
        line: 'Next, health insurance. The PPO costs more per paycheck. The HMO is cheaper, but you need a referral to see a specialist.',
        line_ko: '다음은 건강보험이에요. PPO는 급여마다 더 많이 나가요. HMO는 싸지만 전문의를 보려면 의뢰서가 필요해요.',
        prompt: 'You want to know which plan makes you pay less yourself before the insurance kicks in.',
        prompt_ko: '보험이 적용되기 전에 본인이 내야 하는 돈이 어느 쪽이 더 적은지 알고 싶습니다.',
        model: 'Which plan has the lower deductible?',
        model_ko: '어느 플랜이 공제액이 더 낮아요?',
        distractors: [
          {
            text: 'Which plan has the lower monthly cost?',
            text_ko: '어느 플랜이 매달 더 싸요?',
            reaction: 'The HMO, like I said. Cheaper per paycheck.',
            reaction_ko: '말했듯이 HMO요. 급여마다 덜 나가요.'
          },
          {
            text: "So the HMO doesn't need referrals, right?",
            text_ko: '그럼 HMO는 의뢰서가 필요 없는 거죠?',
            reaction: "No, it's the other way around. The HMO needs them.",
            reaction_ko: '아뇨, 반대예요. HMO가 필요해요.'
          },
          {
            text: "Whichever one's cheaper. I never get sick.",
            text_ko: '그냥 싼 걸로 할게요. 전 안 아파요.',
            reaction: 'Ha, nobody plans to. Want the details first?',
            reaction_ko: '하하, 아프려고 아픈 사람은 없죠. 자세히 들어 볼래요?'
          }
        ],
        reply_speaker: 'linda',
        reply_line: "The PPO. Its deductible is five hundred dollars. The HMO's is fifteen hundred.",
        reply_ko: 'PPO요. 공제액이 500달러예요. HMO는 1,500달러고요.'
      },
      {
        speaker: 'linda',
        situation: 'You look at the monthly costs.',
        situation_ko: '월 비용을 살펴봅니다.',
        line: 'A lot of people your age go with the HMO. But if you see doctors a lot, the PPO is worth it. Which one would you like?',
        line_ko: '또래분들은 HMO를 많이 골라요. 근데 병원을 자주 가면 PPO가 값을 해요. 어느 걸로 할래요?',
        prompt: "Pick the plan where you don't need anyone's permission to see a specialist, and say why.",
        prompt_ko: '전문의를 볼 때 누구 허락도 필요 없는 플랜을 고르고 이유를 말하세요.',
        model: "I'll go with the PPO. I'd like to choose my own doctors.",
        model_ko: 'PPO로 할게요. 의사를 제가 직접 고르고 싶어요.',
        distractors: [
          {
            text: "I'll go with the HMO. I'd like to choose my own doctors.",
            text_ko: 'HMO로 할게요. 의사를 제가 직접 고르고 싶어요.',
            reaction: "With the HMO, you'd need a referral first, though.",
            reaction_ko: 'HMO는 먼저 의뢰서가 필요한데요.'
          },
          {
            text: "I'll take the PPO. I'll see doctors less, so it's worth it.",
            text_ko: 'PPO로 할게요. 병원은 별로 안 가니까 그게 낫겠어요.',
            reaction: 'Hmm, the PPO pays off if you go a lot, though.',
            reaction_ko: '음, PPO는 병원을 자주 가야 이득인데요.'
          },
          {
            text: 'Can I sign up for both of them, just to be safe?',
            text_ko: '혹시 모르니까 둘 다 가입하면 안 돼요?',
            reaction: 'Ha, no. Just one plan per person.',
            reaction_ko: '하하, 안 돼요. 한 사람당 하나예요.'
          }
        ],
        reply_speaker: 'linda',
        reply_line: 'Good choice. And you can still change your mind at open enrollment, October twelfth to the twenty-third.',
        reply_ko: '좋은 선택이에요. 마음이 바뀌면 10월 12일부터 23일까지 정기 가입 기간에 바꿀 수 있어요.'
      },
      {
        speaker: 'linda',
        situation: 'Linda turns to the last page.',
        situation_ko: '린다가 마지막 장을 넘깁니다.',
        line: 'Last thing: the 401(k). The company matches up to four percent. Want to sign up?',
        line_ko: '마지막으로 401(k)요. 회사가 4퍼센트까지 매칭해 줘요. 가입할래요?',
        prompt: "Sign up, and put in exactly enough to get all of the company's money.",
        prompt_ko: '가입하세요. 회사가 주는 돈을 전부 받을 만큼만 정확히 넣으세요.',
        model: "Definitely. I'll contribute four percent to get the full match.",
        model_ko: '물론이죠. 매칭을 다 받게 4퍼센트 넣을게요.',
        distractors: [
          {
            text: "Definitely. I'll contribute two percent and get the full match.",
            text_ko: '물론이죠. 2퍼센트 넣어서 매칭을 다 받을게요.',
            reaction: 'Two percent only gets you half the match, though.',
            reaction_ko: '2퍼센트면 매칭을 절반밖에 못 받아요.'
          },
          {
            text: "Maybe later. I'd rather keep all my paycheck for now.",
            text_ko: '나중에 할게요. 지금은 월급을 다 받고 싶어요.',
            reaction: "You'd be leaving money on the table.",
            reaction_ko: '받을 수 있는 돈을 그냥 두고 가는 건데요.'
          },
          {
            text: 'Sure. Can I take the money out whenever I want?',
            text_ko: '네. 그 돈은 아무 때나 뺄 수 있어요?',
            reaction: "Not without a penalty. It's for retirement.",
            reaction_ko: '벌금 없이는 안 돼요. 은퇴 자금이거든요.'
          }
        ],
        reply_speaker: 'linda',
        reply_line: "Smart move. That's free money. And you're all set!",
        reply_ko: '현명해요. 공짜 돈이니까요. 이제 다 됐어요!'
      }
    ],
    phrases: [
      {
        id: 'd4_benefits.company_match',
        text: 'The company matches up to four percent.',
        meaning_ko: '회사가 4퍼센트까지 매칭해 줘요.',
        note: 'A 401(k) is a retirement account; the match is extra money from the company.',
        note_ko: '401(k)는 퇴직연금 계좌이고, 매칭은 회사가 더 넣어 주는 돈입니다.',
        category: 'hr'
      },
      {
        id: 'd4_benefits.deductible',
        text: 'Which plan has the lower deductible?',
        meaning_ko: '어느 플랜이 공제액이 더 낮아요?',
        note: 'You pay the deductible yourself before insurance pays.',
        note_ko: '보험이 지급하기 전에 먼저 본인이 내는 금액입니다.',
        category: 'hr'
      },
      {
        id: 'd4_benefits.fill_out',
        text: 'Did you fill out your W-4?',
        meaning_ko: 'W-4 작성했어요?',
        note: '"Fill out" a form = complete it.',
        note_ko: '양식을 fill out한다는 것은 작성한다는 뜻입니다.',
        category: 'hr'
      },
      {
        id: 'd4_benefits.free_money',
        text: "That's free money.",
        meaning_ko: '공짜 돈이에요.',
        note: 'People say this about a company match.',
        note_ko: '회사 매칭을 두고 흔히 하는 말입니다.',
        category: 'hr'
      },
      {
        id: 'd4_benefits.go_with',
        text: "I'll go with the PPO.",
        meaning_ko: 'PPO로 할게요.',
        note: '"Go with" = choose.',
        note_ko: 'go with는 고르다라는 뜻입니다.',
        category: 'hr'
      },
      {
        id: 'd4_benefits.paperwork',
        text: 'new-hire paperwork',
        meaning_ko: '신입 서류',
        note: 'Forms every new employee fills out.',
        note_ko: '모든 신입 직원이 작성하는 서류입니다.',
        category: 'hr'
      },
      {
        id: 'd4_benefits.ppo_hmo',
        text: 'PPO or HMO',
        meaning_ko: 'PPO(자유 선택형) 또는 HMO(지정 의사형)',
        note: 'HMO: cheaper, needs referrals. PPO: more choice, costs more.',
        note_ko: 'HMO는 싸지만 의뢰서가 필요하고, PPO는 선택이 넓지만 비쌉니다.',
        category: 'hr'
      },
      {
        id: 'd4_benefits.withhold',
        text: 'how much tax to withhold from each paycheck',
        meaning_ko: '매 급여에서 세금을 얼마나 원천징수할지',
        note: 'US employers take income tax out of every paycheck; the W-4 sets how much.',
        note_ko: '미국 회사는 매 급여에서 소득세를 떼고, W-4가 그 금액을 정합니다.',
        category: 'hr'
      }
    ]
  },
  {
    id: 'd4_pto',
    title: 'Asking about time off',
    title_ko: '휴가 문의하기',
    place: 'office_manager',
    npc: 'maya',
    day_from: 4,
    day_to: 4,
    time_from: '13:30',
    time_to: '18:00',
    summary: 'Your friend is getting married next month. Ask Maya how PTO and sick days work.',
    summary_ko: '다음 달에 친구가 결혼합니다. 마야에게 유급휴가(PTO)와 병가가 어떻게 되는지 물어보세요.',
    sort: 30,
    tags: 'hr,pto,manager',
    calendar: { day: 4, time: '16:00', title: 'Ask Maya about time off', title_ko: '마야에게 휴가 문의' },
    turns: [
      {
        speaker: 'maya',
        situation: "You knock on the frame of Maya's open door.",
        situation_ko: '마야의 열린 문틀을 똑똑 두드립니다.',
        line: "Hey, come on in. What's up?",
        line_ko: '어, 들어와요. 무슨 일이에요?',
        prompt: "Your friend's wedding is coming up. Say what you came to ask about, briefly.",
        prompt_ko: '친구 결혼식이 다가옵니다. 무엇 때문에 왔는지 짧게 말하세요.',
        model: 'I had a quick question about time off.',
        model_ko: '휴가에 대해 잠깐 여쭤볼 게 있어서요.',
        distractors: [
          {
            text: 'I need a week off next month. Is that cool?',
            text_ko: '다음 달에 일주일 쉬어야 하는데 괜찮죠?',
            reaction: "A whole week? Let's talk. What's going on?",
            reaction_ko: '일주일 통째로요? 얘기해 봐요. 무슨 일인데요?'
          },
          {
            text: 'I had a quick question about my paycheck.',
            text_ko: '급여에 대해 잠깐 여쭤볼 게 있어서요.',
            reaction: 'Sure. Though Linda in HR knows that best.',
            reaction_ko: '그래요. 근데 그건 인사팀 린다가 제일 잘 알아요.'
          },
          {
            text: 'Sorry, is now a bad time? I can come back.',
            text_ko: '죄송해요, 지금 바쁘세요? 이따 다시 올게요.',
            reaction: "No, you're fine. Come in. What's up?",
            reaction_ko: '아뇨, 괜찮아요. 들어와요. 무슨 일이에요?'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Sure, shoot.',
        reply_ko: '그럼요, 말해 봐요.'
      },
      {
        speaker: 'maya',
        situation: 'Maya turns away from her screen.',
        situation_ko: '마야가 화면에서 몸을 돌립니다.',
        line: 'What do you want to know?',
        line_ko: '뭐가 궁금해요?',
        prompt: 'Start with the basics: how much paid vacation you get each year.',
        prompt_ko: '기본부터 물어보세요. 1년에 유급 휴가를 얼마나 받는지요.',
        model: 'How many PTO days do we get a year?',
        model_ko: '유급휴가는 1년에 며칠이에요?',
        distractors: [
          {
            text: 'How many sick days do we get a year?',
            text_ko: '병가는 1년에 며칠이에요?',
            reaction: "Five, but that's just for when you're sick.",
            reaction_ko: '5일이요. 근데 그건 아플 때만 쓰는 거예요.'
          },
          {
            text: 'How many PTO days does Derek get a year?',
            text_ko: '데릭은 유급휴가가 1년에 며칠이에요?',
            reaction: "That's between me and Derek. What about yours?",
            reaction_ko: '그건 나랑 데릭 사이 일이죠. 당신 건요?'
          },
          {
            text: 'Is it true we can take unlimited PTO here?',
            text_ko: '유급휴가 무제한이라는 게 사실이에요?',
            reaction: "Unlimited? Where'd you hear that?",
            reaction_ko: '무제한이요? 어디서 들었어요?'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Fifteen days of PTO, plus ten company holidays. It builds up a little every paycheck.',
        reply_ko: '유급휴가 15일에 회사 휴일이 10일이에요. 급여마다 조금씩 쌓여요.'
      },
      {
        speaker: 'maya',
        situation: 'She smiles.',
        situation_ko: '그녀가 웃습니다.',
        line: 'Why, got a trip coming up?',
        line_ko: '왜요, 여행 계획 있어요?',
        prompt: "Explain: a friend's wedding next month. Ask for two days.",
        prompt_ko: '다음 달에 친구 결혼식이 있다고 설명하고, 이틀을 쉬어도 되는지 물어보세요.',
        model: 'Yeah, my friend is getting married next month. Could I take two days off?',
        model_ko: '네, 다음 달에 친구가 결혼해요. 이틀 쉬어도 될까요?',
        distractors: [
          {
            text: 'Yeah, my friend is getting married next week. Could I take two days off?',
            text_ko: '네, 다음 주에 친구가 결혼해요. 이틀 쉬어도 될까요?',
            reaction: "Next week? That's short notice, but okay.",
            reaction_ko: '다음 주요? 좀 급하긴 한데, 알겠어요.'
          },
          {
            text: "Yeah, a wedding next month. I'm taking two weeks off for it.",
            text_ko: '네, 다음 달에 결혼식이 있어요. 2주 쉴 거예요.',
            reaction: "Two weeks? Whoa, let's talk about that.",
            reaction_ko: '2주요? 워, 그건 얘기 좀 해 봐요.'
          },
          {
            text: "Kind of. It's personal, but I'll need some days off next month.",
            text_ko: '비슷해요. 개인적인 일인데 다음 달에 며칠 쉬어야 해요.',
            reaction: 'No need to share. But how many days are we talking?',
            reaction_ko: '얘기 안 해도 돼요. 근데 며칠이나요?'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Of course! Just put it in the HR portal and I'll approve it.",
        reply_ko: '물론이죠! HR 포털에 올리면 승인할게요.'
      },
      {
        speaker: 'maya',
        situation: 'Maya adds one more thing.',
        situation_ko: '마야가 한 가지를 덧붙입니다.',
        line: "And if you're ever sick, don't come in. Just message me before standup.",
        line_ko: '그리고 혹시 아프면 출근하지 마요. 스탠드업 전에 메시지만 줘요.',
        prompt: 'You want to know if being sick eats into your vacation days.',
        prompt_ko: '아프면 휴가 일수가 깎이는지 알고 싶습니다.',
        model: 'Good to know. Are sick days separate from PTO?',
        model_ko: '알겠어요. 병가는 유급휴가랑 따로예요?',
        distractors: [
          {
            text: 'Good to know. Should I message you after standup?',
            text_ko: '알겠어요. 스탠드업 끝나고 메시지 드리면 돼요?',
            reaction: 'Before standup, ideally. So we can plan.',
            reaction_ko: '되도록 스탠드업 전에요. 계획을 짜야 하니까요.'
          },
          {
            text: "Don't worry, I never get sick. I'll be here.",
            text_ko: '걱정 마세요. 전 안 아파요. 꼭 나올게요.',
            reaction: 'Ha. Still, please stay home if you do.',
            reaction_ko: '하하. 그래도 아프면 꼭 집에 있어요.'
          },
          {
            text: "Good to know. Do I need a doctor's note?",
            text_ko: '알겠어요. 의사 소견서도 필요해요?',
            reaction: 'Not for a day or two. Anything else?',
            reaction_ko: '하루 이틀은 필요 없어요. 또 궁금한 거 있어요?'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Yep, you get five sick days. And please actually use them if you need to!',
        reply_ko: '네, 병가는 5일이에요. 필요하면 진짜로 써요!'
      }
    ],
    phrases: [
      {
        id: 'd4_pto.builds_up',
        text: 'It builds up every paycheck.',
        meaning_ko: '급여마다 쌓여요.',
        note: 'Many US companies "accrue" PTO a little at a time.',
        note_ko: '미국 회사 다수는 휴가를 조금씩 적립(accrue)합니다.',
        category: 'hr'
      },
      {
        id: 'd4_pto.dont_come_in',
        text: "If you're sick, don't come in.",
        meaning_ko: '아프면 출근하지 마요.',
        note: '"Come in" = come to the office.',
        note_ko: 'come in은 사무실에 나오는 것입니다.',
        category: 'hr'
      },
      {
        id: 'd4_pto.hr_portal',
        text: 'Put it in the HR portal.',
        meaning_ko: 'HR 포털에 올려요.',
        note: 'Time off is usually requested online.',
        note_ko: '휴가는 보통 온라인으로 신청합니다.',
        category: 'hr'
      },
      {
        id: 'd4_pto.pto',
        text: 'How many PTO days do we get a year?',
        meaning_ko: '1년에 유급휴가가 며칠이에요?',
        note: 'PTO = paid time off (vacation days).',
        note_ko: 'PTO는 paid time off, 즉 유급휴가입니다.',
        category: 'hr'
      },
      {
        id: 'd4_pto.shoot',
        text: 'Sure, shoot.',
        meaning_ko: '그럼요, 말해 봐요.',
        note: '"Shoot" = go ahead and ask.',
        note_ko: 'shoot은 어서 물어보라는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'd4_pto.sick_days',
        text: 'Are sick days separate from PTO?',
        meaning_ko: '병가는 유급휴가와 별도예요?',
        note: 'Some companies have one PTO bank, others keep sick days separate.',
        note_ko: '휴가를 하나로 묶는 회사도, 병가를 따로 두는 회사도 있습니다.',
        category: 'hr'
      },
      {
        id: 'd4_pto.take_days_off',
        text: 'Could I take two days off?',
        meaning_ko: '이틀 쉬어도 될까요?',
        note: '"Take … off" = not work on those days.',
        note_ko: 'take … off는 그날 일을 쉬는 것입니다.',
        category: 'hr'
      },
      {
        id: 'd4_pto.time_off',
        text: 'I had a quick question about time off.',
        meaning_ko: '휴가에 대해 잠깐 여쭤볼 게 있어요.',
        note: '"Time off" = days you do not work. The past tense "had" sounds softer.',
        note_ko: 'time off는 일하지 않는 날입니다. 과거형 had가 더 부드럽게 들립니다.',
        category: 'hr'
      }
    ]
  },
  {
    id: 'd5_demo',
    title: 'Sprint demo and retro',
    title_ko: '스프린트 데모와 회고',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 5,
    day_to: 5,
    time_from: '10:15',
    time_to: '14:00',
    summary: 'Show your card payment fix at the sprint demo, then share what went well and what could be better.',
    summary_ko: '스프린트 데모에서 카드 결제 수정을 보여 주고, 잘된 점과 개선할 점을 나누세요.',
    sort: 10,
    tags: 'meeting,demo,retro',
    calendar: { day: 5, time: '11:00', title: 'Sprint demo and retro', title_ko: '스프린트 데모와 회고' },
    turns: [
      {
        speaker: 'priya',
        situation: 'The team and a few people from sales are in the meeting room.',
        situation_ko: '회의실에 팀원들과 영업팀 몇 명이 있습니다.',
        line: "Okay, demo time! You're up first. Want to show us the card payment fix?",
        line_ko: '자, 데모 시간이에요! 첫 순서예요. 카드 결제 수정 보여 줄래요?',
        prompt: "Get ready to show everyone what's on your laptop.",
        prompt_ko: '노트북 화면을 모두에게 보여 줄 준비를 하세요.',
        model: 'Sure. Let me share my screen.',
        model_ko: '네. 제 화면 공유해 드릴게요.',
        distractors: [
          {
            text: 'Sure. Can someone else drive?',
            text_ko: '네. 누가 대신 띄워 줄래요?',
            reaction: "It's your fix! You should show it.",
            reaction_ko: '당신이 고친 거잖아요! 직접 보여 줘요.'
          },
          {
            text: 'Sure. Let me share the refund fix.',
            text_ko: '네. 환불 수정 화면 공유할게요.',
            reaction: 'Card payments first, please. Refunds are next week.',
            reaction_ko: '카드 결제 먼저요. 환불은 다음 주예요.'
          },
          {
            text: "Uh, do I have to? I'm not ready.",
            text_ko: '어, 꼭 해야 돼요? 준비 안 됐는데.',
            reaction: "You'll be great. Just show what you did.",
            reaction_ko: '잘할 거예요. 한 걸 그냥 보여 주면 돼요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'We can see it. Go ahead.',
        reply_ko: '보여요. 시작해요.'
      },
      {
        speaker: 'priya',
        situation: 'The checkout page is on the big screen.',
        situation_ko: '큰 화면에 결제 페이지가 떠 있습니다.',
        line: 'Walk us through what changed.',
        line_ko: '뭐가 바뀌었는지 차근차근 설명해 줘요.',
        prompt: "Explain what happens now when a payment doesn't go through: what the user sees, and what the system does.",
        prompt_ko: '이제 결제가 실패하면 어떻게 되는지 설명하세요. 사용자에게 무엇이 보이고 시스템은 무엇을 하는지요.',
        model: 'Now, if a payment fails, the user sees a clear error message, and we retry once automatically.',
        model_ko: '이제 결제가 실패하면 사용자에게 분명한 오류 메시지가 보이고, 자동으로 한 번 재시도해요.',
        distractors: [
          {
            text: 'If a payment fails, we now retry it five times in a row before showing an error.',
            text_ko: '결제가 실패하면 이제 오류를 보여 주기 전에 다섯 번 연속으로 재시도해요.',
            reaction: "Five times? Won't that charge people twice?",
            reaction_ko: '다섯 번이요? 그럼 돈이 두 번 빠지지 않아요?'
          },
          {
            text: 'So I refactored the PaymentClient class and wrapped the async payment call in a try-catch block.',
            text_ko: 'PaymentClient 클래스를 리팩터링하고 비동기 결제 호출을 try-catch 블록으로 감쌌어요.',
            reaction: 'Um, maybe in plain English for the sales folks?',
            reaction_ko: '음, 영업팀 분들도 알아듣게 쉽게 말해 줄래요?'
          },
          {
            text: "Before, the old code just swallowed errors. Honestly, whoever wrote it should've known better.",
            text_ko: '전에는 옛날 코드가 에러를 그냥 삼켰어요. 솔직히 그걸 짠 사람이 잘못한 거죠.',
            reaction: "Let's keep it to what changed, okay?",
            reaction_ko: '바뀐 것만 얘기하죠, 네?'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Nice! That'll cut down on support tickets for sure.",
        reply_ko: '좋아요! 고객 문의 티켓이 확실히 줄겠네요.'
      },
      {
        speaker: 'priya',
        situation: 'After the demo, Priya draws two columns on the whiteboard.',
        situation_ko: '데모가 끝나고 프리야가 화이트보드에 두 칸을 그립니다.',
        line: "Let's switch to the retro. What went well this sprint?",
        line_ko: '이제 회고로 넘어가요. 이번 스프린트에서 잘된 건 뭐예요?',
        prompt: 'Give credit to your teammates and to the feedback you got on your work.',
        prompt_ko: '팀원들과, 작업에 대해 받은 피드백에 공을 돌리세요.',
        model: 'The team was really supportive, and the code reviews were super helpful.',
        model_ko: '팀이 정말 많이 도와줬고, 코드 리뷰가 엄청 도움이 됐어요.',
        distractors: [
          {
            text: 'I fixed the card payment bug on time, mostly on my own, which felt great.',
            text_ko: '카드 결제 버그를 거의 혼자 제때 고쳤는데, 그게 뿌듯했어요.',
            reaction: 'Nice! Though I think Derek helped a bit too, no?',
            reaction_ko: '좋네요! 근데 데릭도 좀 도와주지 않았어요?'
          },
          {
            text: 'Honestly, the refund ticket was way too vague. That really slowed me down.',
            text_ko: '솔직히 환불 티켓이 너무 모호했어요. 그것 때문에 많이 늦어졌어요.',
            reaction: 'Hold that thought for the next column!',
            reaction_ko: '그건 다음 칸에 써요!'
          },
          {
            text: "The team was really supportive, and Maya's code reviews helped a lot.",
            text_ko: '팀이 정말 많이 도와줬고, 마야의 코드 리뷰가 많이 도움이 됐어요.',
            reaction: "Maya's? I think Derek did your reviews.",
            reaction_ko: '마야요? 리뷰는 데릭이 해 준 걸로 아는데요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'Aw, love that.',
        reply_ko: '와, 좋네요.'
      },
      {
        speaker: 'priya',
        situation: 'Priya points at the second column.',
        situation_ko: '프리야가 두 번째 칸을 가리킵니다.',
        line: 'And what could we do better?',
        line_ko: '그럼 더 잘할 수 있는 건 뭐예요?',
        prompt: 'Bring up a problem with how work was prepared, using the bug that slowed you down as an example.',
        prompt_ko: '일을 준비하는 과정의 문제를 꺼내세요. 당신을 늦어지게 한 버그를 예로 들어서요.',
        model: 'Some tickets could be clearer before planning. The refund bug was a little vague.',
        model_ko: '플래닝 전에 티켓이 좀 더 명확하면 좋겠어요. 환불 버그는 좀 모호했거든요.',
        distractors: [
          {
            text: 'Priya, your tickets are always confusing. The refund one made no sense at all.',
            text_ko: '프리야, 티켓이 항상 헷갈려요. 환불 건은 아예 말이 안 됐어요.',
            reaction: 'Oof. Okay, noted. Maybe a little gentler next time?',
            reaction_ko: '아이고. 네, 알겠어요. 다음엔 좀 부드럽게 말해 줄래요?'
          },
          {
            text: 'Some tickets could be clearer before planning. The checkbox one was really vague.',
            text_ko: '플래닝 전에 티켓이 좀 더 명확하면 좋겠어요. 체크박스 건이 정말 모호했거든요.',
            reaction: 'The checkbox? I thought that one was pretty clear.',
            reaction_ko: '체크박스요? 그건 꽤 명확했던 것 같은데요.'
          },
          {
            text: 'Honestly, nothing. Everything went perfectly this sprint, no complaints.',
            text_ko: '솔직히 없어요. 이번 스프린트는 다 완벽했어요, 불만 없어요.',
            reaction: "Come on, there's always something. Even small stuff?",
            reaction_ko: '에이, 항상 뭔가 있잖아요. 사소한 거라도요?'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Totally fair. I'll add acceptance criteria to every ticket from now on.",
        reply_ko: '맞는 말이에요. 앞으로 모든 티켓에 인수 조건을 적을게요.'
      }
    ],
    phrases: [
      {
        id: 'd5_demo.acceptance_criteria',
        text: 'acceptance criteria',
        meaning_ko: '인수 조건',
        note: 'The conditions a ticket must meet to be done.',
        note_ko: '티켓이 완료되기 위해 충족해야 할 조건입니다.',
        category: 'meeting'
      },
      {
        id: 'd5_demo.cut_down_on',
        text: "That'll cut down on support tickets.",
        meaning_ko: '문의 티켓이 줄겠네요.',
        note: '"Cut down on" = reduce.',
        note_ko: 'cut down on은 줄이다라는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'd5_demo.do_better',
        text: 'What could we do better?',
        meaning_ko: '뭘 더 잘할 수 있을까요?',
        note: 'Invites honest but kind feedback.',
        note_ko: '솔직하지만 친절한 피드백을 청하는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'd5_demo.retro',
        text: "Let's switch to the retro.",
        meaning_ko: '회고로 넘어가요.',
        note: 'A retro (retrospective) looks back at how the sprint went.',
        note_ko: 'retro(회고)는 스프린트를 돌아보는 회의입니다.',
        category: 'meeting'
      },
      {
        id: 'd5_demo.share_screen',
        text: 'Let me share my screen.',
        meaning_ko: '화면 공유할게요.',
        note: 'Said before showing something in a meeting.',
        note_ko: '회의에서 무언가를 보여 주기 전에 합니다.',
        category: 'meeting'
      },
      {
        id: 'd5_demo.walk_us_through',
        text: 'Walk us through what changed.',
        meaning_ko: '뭐가 바뀌었는지 차근차근 설명해 줘요.',
        note: 'Asks for a step-by-step explanation.',
        note_ko: '단계별 설명을 요청하는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'd5_demo.went_well',
        text: 'What went well?',
        meaning_ko: '뭐가 잘됐어요?',
        note: 'The first question of most retros.',
        note_ko: '대부분의 회고에서 첫 질문입니다.',
        category: 'meeting'
      },
      {
        id: 'd5_demo.youre_up',
        text: "You're up first.",
        meaning_ko: '당신이 첫 순서예요.',
        note: "\"You're up\" = it is your turn.",
        note_ko: "you're up은 당신 차례라는 뜻입니다.",
        category: 'meeting'
      }
    ]
  },
  {
    id: 'd5_paystub',
    title: 'Reading your pay stub',
    title_ko: '급여명세서 읽기',
    place: 'office_hr',
    npc: 'linda',
    day_from: 5,
    day_to: 5,
    time_from: '12:30',
    time_to: '17:30',
    summary: 'Payday! Your first paycheck arrived by direct deposit, but it is smaller than you thought. Linda explains the pay stub.',
    summary_ko: '급여일입니다! 첫 급여가 계좌로 들어왔는데 생각보다 적습니다. 린다가 급여명세서를 설명해 줍니다.',
    sort: 20,
    tags: 'hr,payday,money',
    calendar: { day: 5, time: '14:00', title: 'Pay stub questions with Linda', title_ko: '린다에게 급여명세서 문의' },
    turns: [
      {
        speaker: 'linda',
        situation: 'Your first paycheck hit your bank account this morning. You bring the pay stub to HR.',
        situation_ko: '오늘 아침 첫 급여가 계좌에 들어왔습니다. 급여명세서를 들고 인사팀에 갑니다.',
        line: 'Happy payday! What can I do for you?',
        line_ko: '월급날 축하해요! 뭘 도와드릴까요?',
        prompt: 'Your first paycheck came in smaller than you expected. Tell Linda why you came by.',
        prompt_ko: '첫 월급이 생각보다 적게 들어왔습니다. 린다에게 찾아온 이유를 말하세요.',
        model: 'Hi, Linda. I have a question about my pay stub.',
        model_ko: '안녕하세요, 린다. 급여명세서에 대해 궁금한 게 있어서요.',
        distractors: [
          {
            text: "Hi, Linda. I think my direct deposit didn't come in.",
            text_ko: '안녕하세요, 린다. 월급이 계좌에 안 들어온 것 같아요.',
            reaction: 'Oh no! Hm, it shows it went out this morning. Did you check?',
            reaction_ko: '어머! 음, 오늘 아침에 나간 걸로 나오는데요. 확인해 봤어요?'
          },
          {
            text: 'Hi, Linda. I think payroll messed up my paycheck.',
            text_ko: '안녕하세요, 린다. 급여팀이 제 월급을 잘못 계산한 것 같아요.',
            reaction: "Well, let's not jump to conclusions. Let's take a look first.",
            reaction_ko: '음, 성급하게 단정하진 말고요. 일단 같이 봐요.'
          },
          {
            text: 'Hi, Linda. Could you tell me when the next payday is?',
            text_ko: '안녕하세요, 린다. 다음 월급날이 언제인지 알려 주실래요?',
            reaction: "Every other Friday. But you look like something's bugging you?",
            reaction_ko: '격주 금요일이에요. 그런데 뭔가 신경 쓰이는 게 있는 얼굴인데요?'
          }
        ],
        reply_speaker: 'linda',
        reply_line: "Sure! Let's pull it up together.",
        reply_ko: '그럼요! 같이 열어 봐요.'
      },
      {
        speaker: 'linda',
        situation: 'Linda points at the top of the stub.',
        situation_ko: '린다가 명세서 맨 위를 가리킵니다.',
        line: "This top number, thirty-six fifty-four, is your gross pay. That's before anything comes out.",
        line_ko: '맨 위 숫자, 3,654달러가 총급여예요. 아무것도 떼기 전 금액이죠.',
        prompt: 'Point to the next line, the federal tax taken out, and ask what it is.',
        prompt_ko: '다음 줄, 연방 세금으로 떼인 항목을 가리키며 뭔지 물어보세요.',
        model: "What's this line, federal withholding?",
        model_ko: '이 줄은 뭐예요? 연방 원천징수요?',
        distractors: [
          {
            text: 'So my take-home is thirty-six fifty-four?',
            text_ko: '그럼 제 실수령액이 3,654달러예요?',
            reaction: "No, that's gross. Your take-home is at the very bottom.",
            reaction_ko: '아뇨, 그건 총액이에요. 실수령액은 맨 아래에 있어요.'
          },
          {
            text: 'Why is the government taking so much?',
            text_ko: '정부는 왜 이렇게 많이 떼 가요?',
            reaction: "Ha, everybody says that. Let's go line by line.",
            reaction_ko: '하, 다들 그렇게 말해요. 한 줄씩 봐요.'
          },
          {
            text: "And what's this one, health insurance?",
            text_ko: '그리고 이건 뭐예요, 건강보험이요?',
            reaction: "That's further down. Look at the line right under gross pay.",
            reaction_ko: '그건 더 아래예요. 총급여 바로 밑의 줄을 보세요.'
          }
        ],
        reply_speaker: 'linda',
        reply_line: "That's federal income tax, based on your W-4. You settle up when you file your taxes in April.",
        reply_ko: 'W-4에 따라 떼는 연방 소득세예요. 4월에 세금 신고할 때 정산해요.'
      },
      {
        speaker: 'linda',
        situation: 'Below that there are more lines: FICA, state tax, health insurance, 401(k).',
        situation_ko: '그 아래에 더 많은 줄이 있습니다: FICA, 주세, 건강보험, 401(k).',
        line: "Then FICA. That's Social Security and Medicare. Everyone pays that, seven point six five percent.",
        line_ko: '그다음이 FICA예요. 사회보장세랑 메디케어요. 누구나 내요, 7.65퍼센트.',
        prompt: 'You signed up for the company retirement plan. Ask where it shows up on the stub.',
        prompt_ko: '회사 퇴직연금에 가입했습니다. 그게 명세서 어디에 나오는지 물어보세요.',
        model: "Got it. And where's my 401(k) contribution?",
        model_ko: '알겠어요. 그럼 제 401(k) 납입액은 어디 있어요?',
        distractors: [
          {
            text: 'Got it. So FICA is the state income tax?',
            text_ko: '알겠어요. 그럼 FICA가 주 소득세예요?',
            reaction: "No, state tax is its own line. FICA's Social Security and Medicare.",
            reaction_ko: '아뇨, 주세는 따로 있어요. FICA는 사회보장세랑 메디케어예요.'
          },
          {
            text: "Seven point six five? That's way too much.",
            text_ko: '7.65퍼센트요? 너무 많은데요.',
            reaction: "Ha, tell that to Congress. It's the same for everyone.",
            reaction_ko: '하, 그건 의회에 말해요. 누구나 똑같아요.'
          },
          {
            text: "Got it. And where's my health insurance?",
            text_ko: '알겠어요. 그럼 제 건강보험은 어디 있어요?',
            reaction: 'Just below state tax. Was there something else you were looking for?',
            reaction_ko: '주세 바로 아래요. 혹시 다른 걸 찾고 있었어요?'
          }
        ],
        reply_speaker: 'linda',
        reply_line: 'Right here: four percent, a hundred forty-six dollars. It comes out pre-tax.',
        reply_ko: '여기요. 4퍼센트, 146달러예요. 세전으로 빠져요.'
      },
      {
        speaker: 'linda',
        situation: 'At the bottom is the number you saw in your bank account.',
        situation_ko: '맨 아래에 은행 계좌에서 본 숫자가 있습니다.',
        line: 'After all that, your net pay, your take-home, is twenty-six hundred. It goes straight to your bank by direct deposit.',
        line_ko: '그걸 다 빼고 나면 실수령액, 손에 쥐는 돈이 2,600달러예요. 직접 입금으로 바로 계좌에 들어가요.',
        prompt: 'Now you see where the money went. Wrap things up with Linda.',
        prompt_ko: '이제 돈이 어디로 갔는지 알겠습니다. 린다와 대화를 마무리하세요.',
        model: 'That makes a lot more sense now. Thanks, Linda!',
        model_ko: '이제 훨씬 이해가 되네요. 고마워요, 린다!',
        distractors: [
          {
            text: 'Got it, so twenty-two hundred goes to my bank. Thanks!',
            text_ko: '알겠어요, 그러니까 2,200달러가 계좌로 가는 거죠. 고마워요!',
            reaction: 'Twenty-six hundred, actually. Look at the bottom line.',
            reaction_ko: '2,600달러예요. 맨 아랫줄을 보세요.'
          },
          {
            text: 'Okay. Still feels like a lot less than I was promised.',
            text_ko: '네. 그래도 약속받은 것보다 훨씬 적은 느낌이네요.',
            reaction: "Your salary's the same. It's taxes and benefits. Want to go over it again?",
            reaction_ko: '연봉은 그대로예요. 세금이랑 복리후생이에요. 다시 볼까요?'
          },
          {
            text: 'So should I switch to getting paper checks instead?',
            text_ko: '그럼 차라리 종이 수표로 받는 게 나을까요?',
            reaction: "You could, but it won't change the amount. Is it clearer now?",
            reaction_ko: '그래도 되지만 금액은 똑같아요. 이제 좀 이해됐어요?'
          }
        ],
        reply_speaker: 'linda',
        reply_line: "Anytime! And hey, don't spend it all in one place.",
        reply_ko: '언제든지요! 그리고 한 번에 다 쓰지 마요.'
      }
    ],
    phrases: [
      {
        id: 'd5_paystub.direct_deposit',
        text: 'It goes straight to your bank by direct deposit.',
        meaning_ko: '계좌 입금으로 바로 들어가요.',
        note: 'Most US employers pay by direct deposit, not paper checks.',
        note_ko: '미국 회사 대부분은 종이 수표 대신 계좌 입금으로 급여를 줍니다.',
        category: 'hr'
      },
      {
        id: 'd5_paystub.federal_withholding',
        text: 'federal withholding',
        meaning_ko: '연방 소득세 원천징수',
        note: 'Income tax your employer sends to the government for you.',
        note_ko: '회사가 당신 대신 정부에 내는 소득세입니다.',
        category: 'hr'
      },
      {
        id: 'd5_paystub.fica',
        text: 'FICA',
        meaning_ko: '사회보장세·메디케어세',
        note: 'Social Security (6.2%) + Medicare (1.45%) = 7.65%.',
        note_ko: '사회보장 6.2% + 메디케어 1.45% = 7.65%입니다.',
        category: 'hr'
      },
      {
        id: 'd5_paystub.gross_pay',
        text: 'gross pay',
        meaning_ko: '세전 급여(총액)',
        note: 'Your pay before taxes and deductions.',
        note_ko: '세금과 공제 전의 급여입니다.',
        category: 'hr'
      },
      {
        id: 'd5_paystub.happy_payday',
        text: 'Happy payday!',
        meaning_ko: '월급날 축하해요!',
        note: 'A cheerful greeting on payday Friday.',
        note_ko: '급여일 금요일의 밝은 인사입니다.',
        category: 'hr'
      },
      {
        id: 'd5_paystub.net_pay',
        text: 'net pay (take-home pay)',
        meaning_ko: '실수령액',
        note: 'What actually arrives in your bank account.',
        note_ko: '실제로 계좌에 들어오는 돈입니다.',
        category: 'hr'
      },
      {
        id: 'd5_paystub.pay_stub',
        text: 'I have a question about my pay stub.',
        meaning_ko: '급여명세서에 대해 질문이 있어요.',
        note: 'The pay stub lists your pay and every deduction.',
        note_ko: '급여명세서에는 급여와 모든 공제 항목이 나옵니다.',
        category: 'hr'
      },
      {
        id: 'd5_paystub.pre_tax',
        text: 'It comes out pre-tax.',
        meaning_ko: '세전으로 빠져요.',
        note: 'Pre-tax money lowers your taxable income.',
        note_ko: '세전 공제는 과세 소득을 줄여 줍니다.',
        category: 'hr'
      }
    ]
  },
  {
    id: 'd5_happy_hour',
    title: 'Happy hour invite',
    title_ko: '해피아워 초대',
    place: 'office_desk_team',
    npc: 'derek',
    day_from: 5,
    day_to: 5,
    time_from: '15:00',
    time_to: '18:30',
    summary: 'Derek invites you to Friday happy hour. Decline politely, ask for a rain check, and wish him a good weekend.',
    summary_ko: '데릭이 금요일 해피아워에 초대합니다. 정중히 거절하고, 다음을 기약하고, 좋은 주말을 빌어 주세요.',
    sort: 30,
    tags: 'small-talk,social,invitation',
    calendar: { day: 5, time: '17:30', title: 'Team happy hour (optional)', title_ko: '팀 해피아워(선택)' },
    turns: [
      {
        speaker: 'derek',
        situation: 'It is Friday afternoon. Derek is packing up his laptop.',
        situation_ko: '금요일 오후입니다. 데릭이 노트북을 챙기고 있습니다.',
        line: 'Hey, a bunch of us are going to happy hour at the Anchor after work. You in?',
        line_ko: '저기, 우리 몇 명이 퇴근하고 앵커에 해피 아워 가는데. 같이 갈래요?',
        prompt: "You're exhausted after your first week. Turn him down without hurting his feelings.",
        prompt_ko: '첫 주를 보내고 녹초가 됐습니다. 기분 상하지 않게 거절하세요.',
        model: "Thanks for the invite! I'd love to, but I'm pretty wiped out this week.",
        model_ko: '초대해 줘서 고마워요! 가고 싶은데, 이번 주는 완전히 녹초가 됐어요.',
        distractors: [
          {
            text: "No thanks. I don't really drink with coworkers, so I'll pass.",
            text_ko: '됐어요. 동료들이랑은 술 잘 안 마셔서, 전 빠질게요.',
            reaction: 'Oh. Okay, sure. No worries.',
            reaction_ko: '아. 네, 그래요. 괜찮아요.'
          },
          {
            text: "Sure, I'm in! What time are you heading over to the Anchor?",
            text_ko: '좋아요, 저도 갈게요! 앵커에는 몇 시쯤 출발해요?',
            reaction: 'Awesome! Around five-thirty. You sure? You look pretty beat.',
            reaction_ko: '좋아요! 다섯 시 반쯤요. 진짜 괜찮아요? 많이 지쳐 보이는데.'
          },
          {
            text: "Thanks, but honestly, this job is wearing me down. I'm kind of miserable.",
            text_ko: '고맙지만, 솔직히 이 일 때문에 너무 지쳐요. 좀 비참한 기분이에요.',
            reaction: "Oh no, really? Hey, if you want to talk about it, I'm around.",
            reaction_ko: '아이고, 정말요? 얘기하고 싶으면 언제든 말해요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Totally get it. The first week is exhausting.',
        reply_ko: '완전 이해해요. 첫 주는 진 빠지죠.'
      },
      {
        speaker: 'derek',
        situation: 'He zips up his bag.',
        situation_ko: '그가 가방 지퍼를 올립니다.',
        line: 'No pressure at all. We go pretty much every other Friday.',
        line_ko: '전혀 부담 갖지 마요. 거의 격주 금요일마다 가거든요.',
        prompt: "Let him know you'd really like to join another time.",
        prompt_ko: '다른 때에는 꼭 같이 가고 싶다고 전하세요.',
        model: "Can I take a rain check? I'll definitely come next time.",
        model_ko: '다음으로 미뤄도 될까요? 다음번엔 꼭 갈게요.',
        distractors: [
          {
            text: 'Cool. So the next one is tomorrow? I could do that.',
            text_ko: '좋아요. 그럼 다음 건 내일이에요? 그건 갈 수 있어요.',
            reaction: "Tomorrow's Saturday. Next one's in two weeks.",
            reaction_ko: '내일은 토요일이에요. 다음은 2주 뒤고요.'
          },
          {
            text: "Good, because honestly, happy hours aren't really my thing.",
            text_ko: '다행이네요, 솔직히 해피 아워는 제 취향이 아니라서요.',
            reaction: 'Oh. Alright, fair enough.',
            reaction_ko: '아. 그래요, 알겠어요.'
          },
          {
            text: 'Is it okay if I just stop by for five minutes, then?',
            text_ko: '그럼 5분만 잠깐 들러도 괜찮아요?',
            reaction: "Sure, but you just said you're wiped. Go home and rest!",
            reaction_ko: '그래도 되는데, 방금 녹초라면서요. 집에 가서 쉬어요!'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Rain check it is. I'm holding you to that!",
        reply_ko: '다음으로 미루죠. 약속 지켜요!'
      },
      {
        speaker: 'derek',
        situation: 'Derek puts on his jacket.',
        situation_ko: '데릭이 재킷을 입습니다.',
        line: 'Any plans for tonight, then?',
        line_ko: '그럼 오늘 밤엔 뭐 해요?',
        prompt: 'Tell him your low-key plan: a quick stop at the store, then a quiet night.',
        prompt_ko: '소박한 계획을 말하세요. 가게에 잠깐 들렀다가 조용히 쉴 거예요.',
        model: 'Just grabbing some groceries and getting some rest.',
        model_ko: '그냥 장 좀 보고 푹 쉬려고요.',
        distractors: [
          {
            text: 'Probably going out downtown with some friends.',
            text_ko: '아마 친구들이랑 시내에 놀러 갈 것 같아요.',
            reaction: 'Oh, I thought you were too tired? Ha, okay.',
            reaction_ko: '어, 피곤하다고 하지 않았어요? 하, 그래요.'
          },
          {
            text: 'Not sure yet. What are you guys doing after the Anchor?',
            text_ko: '아직 모르겠어요. 앵커 다음엔 다들 뭐 해요?',
            reaction: 'Ha, probably tacos. But I thought you were heading home?',
            reaction_ko: '하, 아마 타코요. 그런데 집에 간다고 하지 않았어요?'
          },
          {
            text: 'Why, do you need me to work on something tonight?',
            text_ko: '왜요, 오늘 밤에 제가 뭐 작업해야 해요?',
            reaction: "No, no! Just making small talk. Relax, it's Friday.",
            reaction_ko: '아뇨, 아뇨! 그냥 하는 말이에요. 긴장 풀어요, 금요일이잖아요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Sounds perfect. You earned it.',
        reply_ko: '딱 좋네요. 그럴 자격 있어요.'
      },
      {
        speaker: 'derek',
        situation: 'He stops at the door and turns around.',
        situation_ko: '그가 문 앞에서 멈춰 돌아봅니다.',
        line: 'Oh, and great job at the demo today, by the way.',
        line_ko: '아, 그리고 오늘 데모 정말 잘했어요.',
        prompt: 'Take the compliment graciously and say goodbye for the weekend.',
        prompt_ko: '칭찬을 기분 좋게 받고 주말 인사를 하세요.',
        model: 'Thanks, that means a lot! Have a great weekend.',
        model_ko: '고마워요, 그 말 들으니 정말 힘이 나요! 주말 잘 보내요.',
        distractors: [
          {
            text: "Oh, it wasn't that good. I messed up a lot of it.",
            text_ko: '에이, 그렇게 잘하진 않았어요. 많이 망쳤는데요.',
            reaction: 'Come on, take the compliment! It was good.',
            reaction_ko: '에이, 칭찬은 그냥 받아요! 잘했다니까요.'
          },
          {
            text: 'Thanks! See you at the Anchor tomorrow, then.',
            text_ko: '고마워요! 그럼 내일 앵커에서 봐요.',
            reaction: "Tomorrow? It's tonight, and you're skipping it, remember?",
            reaction_ko: '내일요? 오늘 밤이고, 당신은 안 오잖아요.'
          },
          {
            text: 'Thanks. Did Maya say anything about it to you?',
            text_ko: '고마워요. 마야가 그것에 대해 뭐라고 했어요?',
            reaction: "Not to me. But I'm sure she liked it. Go home!",
            reaction_ko: '저한텐 아무 말 없었어요. 분명 좋아했을 거예요. 집에 가요!'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'You too! See you Monday.',
        reply_ko: '당신도요! 월요일에 봐요.'
      }
    ],
    phrases: [
      {
        id: 'd5_happy_hour.happy_hour',
        text: 'happy hour',
        meaning_ko: '해피아워(퇴근 후 할인 시간의 술자리)',
        note: 'Cheaper drinks after work, usually 4 to 7 p.m.; coworkers often go together.',
        note_ko: '퇴근 후 보통 4~7시의 할인 시간으로, 동료끼리 자주 갑니다.',
        category: 'small-talk'
      },
      {
        id: 'd5_happy_hour.holding_you_to_that',
        text: "I'm holding you to that!",
        meaning_ko: '그 약속 지켜야 해요!',
        note: 'Playfully says you will remember the promise.',
        note_ko: '약속을 기억하겠다고 장난스럽게 말하는 표현입니다.',
        category: 'small-talk'
      },
      {
        id: 'd5_happy_hour.love_to_but',
        text: "I'd love to, but I'm pretty wiped out.",
        meaning_ko: '가고 싶은데 너무 지쳤어요.',
        note: "\"I'd love to, but …\" is the politest way to say no.",
        note_ko: "\"I'd love to, but …\"는 가장 정중한 거절입니다.",
        category: 'small-talk'
      },
      {
        id: 'd5_happy_hour.means_a_lot',
        text: 'That means a lot.',
        meaning_ko: '그 말 정말 힘이 돼요.',
        note: 'A warm reply to a compliment.',
        note_ko: '칭찬에 대한 따뜻한 대답입니다.',
        category: 'small-talk'
      },
      {
        id: 'd5_happy_hour.no_pressure',
        text: 'No pressure at all.',
        meaning_ko: '전혀 부담 갖지 마요.',
        note: 'Tells someone they can say no.',
        note_ko: '거절해도 된다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'd5_happy_hour.rain_check',
        text: 'Can I take a rain check?',
        meaning_ko: '다음으로 미뤄도 될까요?',
        note: 'Turn down an invitation now but accept it for later.',
        note_ko: '지금은 거절하지만 다음에 받겠다는 표현입니다.',
        category: 'small-talk'
      },
      {
        id: 'd5_happy_hour.wiped_out',
        text: 'wiped out',
        meaning_ko: '녹초가 된',
        note: 'Very tired. "Beat" means the same.',
        note_ko: '몹시 피곤한 상태입니다. beat도 같은 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'd5_happy_hour.you_in',
        text: 'You in?',
        meaning_ko: '같이 할래요?',
        note: 'Short for "Are you in?" (Will you join?)',
        note_ko: '"Are you in?"(함께할래요?)의 줄임말입니다.',
        category: 'small-talk'
      }
    ]
  },
  {
    id: 'w_park',
    title: 'Saturday in the park',
    title_ko: '공원의 토요일',
    place: 'park_bench',
    npc: 'carl',
    day_from: 6,
    day_to: 7,
    time_from: '08:00',
    time_to: '18:00',
    summary: 'Run into Carl in Seaside Park. Talk about your first week, the farmers market, and trash day.',
    summary_ko: '시사이드 공원에서 칼을 만납니다. 첫 주 이야기, 파머스 마켓, 쓰레기 버리는 날에 대해 이야기하세요.',
    sort: 10,
    tags: 'small-talk,neighbor,home',
    calendar: { day: 6, time: '10:00', title: 'Farmers market in Seaside Park', title_ko: '시사이드 공원 파머스 마켓' },
    turns: [
      {
        speaker: 'carl',
        situation: 'It is a sunny weekend morning. Carl is on a park bench with a newspaper and a paper cup of coffee.',
        situation_ko: '화창한 주말 아침입니다. 칼이 공원 벤치에서 신문과 종이컵 커피를 들고 있습니다.',
        line: 'Hey, neighbor! You survived your first week?',
        line_ko: '어이, 이웃 양반! 첫 주는 무사히 넘겼나?',
        prompt: 'Tell him how the week went: a lot of work, but you liked it.',
        prompt_ko: '한 주가 어땠는지 말하세요. 일은 많았지만 좋았어요.',
        model: 'Barely! It was busy, but good.',
        model_ko: '겨우요! 바빴지만 좋았어요.',
        distractors: [
          {
            text: "Not really. I think I'm quitting.",
            text_ko: '아뇨. 그만둘까 봐요.',
            reaction: 'Whoa, already? That bad, huh?',
            reaction_ko: '어이쿠, 벌써? 그렇게 힘들었어?'
          },
          {
            text: "Yes, but it's my second week now.",
            text_ko: '네, 근데 이제 둘째 주예요.',
            reaction: 'Second? You just started Monday, kid.',
            reaction_ko: '둘째 주? 월요일에 막 시작했잖아.'
          },
          {
            text: 'Barely. Why, did I miss the rent?',
            text_ko: '겨우요. 왜요, 제가 월세 밀렸어요?',
            reaction: 'Ha, no! Just being neighborly.',
            reaction_ko: '하, 아니야! 그냥 이웃끼리 인사지.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: "Ha! That's how it goes. The first week's always a blur.",
        reply_ko: '하! 원래 그래. 첫 주는 늘 정신없이 지나가지.'
      },
      {
        speaker: 'carl',
        situation: 'You can hear music and smell kettle corn from the other side of the park.',
        situation_ko: '공원 건너편에서 음악 소리와 캐틀콘 냄새가 납니다.',
        line: 'So, what brings you to the park?',
        line_ko: '그래, 공원엔 웬일이야?',
        prompt: 'You came for the weekend market people told you about. Say so.',
        prompt_ko: '사람들이 말해 준 주말 장터 때문에 왔다고 말하세요.',
        model: 'I heard about the farmers market, so I came to check it out.',
        model_ko: '파머스 마켓 얘기를 들어서 구경하러 왔어요.',
        distractors: [
          {
            text: "I heard there's a concert today, so I came to see it.",
            text_ko: '오늘 콘서트가 있다고 해서 보러 왔어요.',
            reaction: "Concert? Nah, that music's coming from the market.",
            reaction_ko: '콘서트? 아냐, 그 음악은 장터에서 나는 거야.'
          },
          {
            text: 'Nothing much. I just wanted to get out of that tiny apartment.',
            text_ko: '별거 아니에요. 그냥 그 좁은 집에서 좀 나오고 싶었어요.',
            reaction: "Hey, that tiny apartment's a great deal, kid.",
            reaction_ko: '이봐, 그 좁은 집이 얼마나 싼 건데.'
          },
          {
            text: 'I walk through here every day on my way to the bus stop.',
            text_ko: '버스 정류장 가는 길에 매일 여길 지나가요.',
            reaction: "On a Saturday? Ha. Well, since you're here, look around.",
            reaction_ko: '토요일에? 하. 뭐, 온 김에 구경이나 해.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'Good call. Get the peaches from the stand by the fountain. Best in town.',
        reply_ko: '잘 왔네. 분수대 옆 가판에서 복숭아를 사. 이 동네 최고야.'
      },
      {
        speaker: 'carl',
        situation: 'Carl folds his newspaper.',
        situation_ko: '칼이 신문을 접습니다.',
        line: 'Oh, one more thing. Trash and recycling go out Monday night. Bins go out to the curb.',
        line_ko: '아, 하나 더. 쓰레기랑 재활용은 월요일 밤에 내놔. 통은 길가에 내놓고.',
        prompt: 'Thank him, then find out which bin your empty bottles and cans go in.',
        prompt_ko: '알려 줘서 고맙다고 하고, 빈 병과 캔은 어느 통에 넣는지 물어보세요.',
        model: 'Thanks for the heads-up. Which bin is for recycling?',
        model_ko: '알려 줘서 고마워요. 어느 통이 재활용이에요?',
        distractors: [
          {
            text: 'Thanks. So the bins go out Tuesday morning, right?',
            text_ko: '고마워요. 그럼 통은 화요일 아침에 내놓는 거죠?',
            reaction: 'Monday night, kid. Truck comes early Tuesday.',
            reaction_ko: '월요일 밤이야. 트럭이 화요일 새벽에 와.'
          },
          {
            text: "Can't you just take the bins out for me? I'm pretty busy.",
            text_ko: '그냥 대신 통 좀 내놔 주시면 안 돼요? 제가 좀 바빠서요.',
            reaction: "Ha! I'm your landlord, not your butler.",
            reaction_ko: '하! 난 집주인이지 집사가 아니야.'
          },
          {
            text: "Thanks. Where's the closest place to buy trash bags?",
            text_ko: '고마워요. 쓰레기봉투는 어디서 제일 가깝게 사요?',
            reaction: 'Hardware store on Elm. But you still need to know the bins.',
            reaction_ko: '엘름가 철물점. 근데 통부터 알아야지.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: "Blue one's recycling, green's yard waste, and the black one's regular trash.",
        reply_ko: '파란 건 재활용, 초록은 정원 쓰레기, 검은 건 일반 쓰레기야.'
      },
      {
        speaker: 'carl',
        situation: 'He holds up a finger.',
        situation_ko: '그가 손가락 하나를 들어 보입니다.',
        line: "Just rinse out the cans and bottles first, or the city won't take 'em.",
        line_ko: '캔이랑 병은 먼저 헹궈서 내놔. 안 그러면 시에서 안 가져가.',
        prompt: "Let him know you've taken his tip on board.",
        prompt_ko: '그의 조언을 잘 새겨듣겠다고 하세요.',
        model: "Got it. I'll remember that.",
        model_ko: '알겠어요. 기억할게요.',
        distractors: [
          {
            text: 'Oh. I usually toss them in dirty.',
            text_ko: '아. 전 보통 그냥 버리는데요.',
            reaction: "Well, not anymore you don't.",
            reaction_ko: '이제부턴 그러면 안 되지.'
          },
          {
            text: "Okay. I'll rinse the paper too.",
            text_ko: '네. 종이도 헹굴게요.',
            reaction: "Paper? No, don't get paper wet!",
            reaction_ko: '종이? 아냐, 종이는 적시면 안 돼!'
          },
          {
            text: 'Is that really necessary, though?',
            text_ko: '그거 꼭 해야 해요?',
            reaction: "It is if you don't want a fine, kid.",
            reaction_ko: '벌금 안 내고 싶으면 해야지.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'Enjoy the market, kid.',
        reply_ko: '마켓 구경 잘 해.'
      }
    ],
    phrases: [
      {
        id: 'w_park.a_blur',
        text: "The first week's always a blur.",
        meaning_ko: '첫 주는 늘 정신없이 지나가.',
        note: '"A blur" = so busy you hardly remember it.',
        note_ko: 'a blur는 너무 바빠서 기억도 잘 안 나는 것입니다.',
        category: 'small-talk'
      },
      {
        id: 'w_park.good_call',
        text: 'Good call.',
        meaning_ko: '잘 생각했어요.',
        note: 'Says someone made a good decision.',
        note_ko: '좋은 결정을 했다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'w_park.heads_up',
        text: 'Thanks for the heads-up.',
        meaning_ko: '미리 알려 줘서 고마워요.',
        note: 'A "heads-up" is a warning or useful tip in advance.',
        note_ko: 'heads-up은 미리 주는 경고나 유용한 정보입니다.',
        category: 'home'
      },
      {
        id: 'w_park.rinse_out',
        text: 'Rinse out the cans and bottles.',
        meaning_ko: '캔과 병은 헹궈서 내놔요.',
        note: '"Rinse out" = wash quickly with water.',
        note_ko: 'rinse out은 물로 간단히 헹구는 것입니다.',
        category: 'home'
      },
      {
        id: 'w_park.survived',
        text: 'You survived your first week?',
        meaning_ko: '첫 주 잘 버텼어?',
        note: 'A joking way to ask how a hard week went.',
        note_ko: '힘든 한 주가 어땠는지 농담처럼 묻는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'w_park.to_the_curb',
        text: 'Bins go out to the curb.',
        meaning_ko: '쓰레기통은 길가에 내놔요.',
        note: 'In the US, trash bins are put by the street on pickup day.',
        note_ko: '미국에서는 수거일에 쓰레기통을 길가에 내놓습니다.',
        category: 'home'
      },
      {
        id: 'w_park.what_brings_you',
        text: 'What brings you here?',
        meaning_ko: '여긴 어쩐 일이에요?',
        note: 'A friendly way to ask why someone came.',
        note_ko: '왜 왔는지 친근하게 묻는 표현입니다.',
        category: 'small-talk'
      }
    ]
  },
  {
    id: 'w_market',
    title: 'Weekend grocery run',
    title_ko: '주말 장보기',
    place: 'market_checkout',
    npc: 'mike',
    day_from: 6,
    day_to: 7,
    time_from: '09:00',
    time_to: '21:00',
    summary: 'Stock up for the week. Get the buy-one-get-one deal, use your rewards number, and skip the cash back.',
    summary_ko: '한 주 먹을 것을 사 두세요. 1+1 할인을 챙기고, 적립 번호를 쓰고, 캐시백은 사양하세요.',
    sort: 20,
    tags: 'shopping,market,money',
    calendar: { day: 6, time: '15:00', title: 'Grocery run', title_ko: '장보기' },
    turns: [
      {
        speaker: 'mike',
        situation: 'Mike recognizes you from your first visit.',
        situation_ko: '마이크가 처음 왔을 때의 당신을 알아봅니다.',
        line: 'Hey, welcome back! Stocking up for the week?',
        line_ko: '어서 오세요, 또 오셨네요! 일주일 치 장 보시는 거예요?',
        prompt: 'Say yes, and check that the strawberry deal is still on: buy a box, get a second one free.',
        prompt_ko: '그렇다고 하고, 딸기 행사가 아직 하는지 확인하세요. 한 상자를 사면 한 상자가 공짜예요.',
        model: 'Yeah. Are the strawberries still buy one, get one free?',
        model_ko: '네. 딸기 아직 하나 사면 하나 공짜예요?',
        distractors: [
          {
            text: 'Yeah. Are the strawberries still half off this week?',
            text_ko: '네. 딸기 이번 주에 아직 반값이에요?',
            reaction: "Half off? No, it's a different deal. You get a free box.",
            reaction_ko: '반값요? 아뇨, 다른 행사예요. 한 상자를 공짜로 드려요.'
          },
          {
            text: "Yeah. Can you just ring me up fast? I'm in a rush.",
            text_ko: '네. 그냥 빨리 계산해 주실래요? 제가 급해서요.',
            reaction: "Sure thing. No rush, though, nobody's behind you.",
            reaction_ko: '그럼요. 근데 서두를 필요 없어요, 뒤에 아무도 없어요.'
          },
          {
            text: 'No, just a few things. Do you have reusable bags?',
            text_ko: '아뇨, 몇 개만요. 장바구니 있어요?',
            reaction: 'Bags are a dime each. Anything else you wanted to ask?',
            reaction_ko: '봉투는 하나에 10센트예요. 다른 거 물어볼 거 있으세요?'
          }
        ],
        reply_speaker: 'mike',
        reply_line: 'They sure are. Looks like you only grabbed one box, though.',
        reply_ko: '네, 맞아요. 그런데 한 상자만 가져오셨네요.'
      },
      {
        speaker: 'mike',
        situation: 'There is nobody behind you in line.',
        situation_ko: '당신 뒤에 줄 선 사람이 없습니다.',
        line: 'Want to go grab another one? I can wait.',
        line_ko: '하나 더 가져올래요? 기다릴게요.',
        prompt: "You'd like the free second box. Take him up on his offer.",
        prompt_ko: '공짜 두 번째 상자를 받고 싶습니다. 그의 제안을 받아들이세요.',
        model: "Oh, thanks! I'll be right back.",
        model_ko: '어, 고마워요! 금방 올게요.',
        distractors: [
          {
            text: 'No thanks, one box is plenty.',
            text_ko: '괜찮아요, 한 상자면 충분해요.',
            reaction: "Your call, but the second one's free.",
            reaction_ko: '알아서 하세요, 근데 두 번째는 공짜예요.'
          },
          {
            text: 'Can you go get it for me?',
            text_ko: '가서 좀 가져다주실래요?',
            reaction: 'Uh, I kind of have to stay at the register.',
            reaction_ko: '어, 저는 계산대를 지켜야 해서요.'
          },
          {
            text: 'Sure! Let the next person go ahead.',
            text_ko: '네! 다음 분 먼저 하세요.',
            reaction: "Ha, there's nobody back there. Go ahead, I'll wait.",
            reaction_ko: '하, 뒤에 아무도 없어요. 다녀와요, 기다릴게요.'
          }
        ],
        reply_speaker: 'mike',
        reply_line: 'Take your time.',
        reply_ko: '천천히 다녀와요.'
      },
      {
        speaker: 'mike',
        situation: 'You come back with a second box of strawberries.',
        situation_ko: '딸기 한 상자를 더 들고 돌아옵니다.',
        line: 'Alright. Did you want to use your rewards number today?',
        line_ko: '좋아요. 오늘 리워드 번호 쓰실 거예요?',
        prompt: "Say yes, and that you'll enter your phone number on the keypad yourself.",
        prompt_ko: '네라고 하고, 키패드에 직접 전화번호를 입력하겠다고 하세요.',
        model: "Yes, please. I'll punch in my phone number.",
        model_ko: '네, 쓸게요. 전화번호 누를게요.',
        distractors: [
          {
            text: "No thanks, I don't really care about points.",
            text_ko: '아뇨, 전 포인트에 별 관심 없어요.',
            reaction: "You sure? You'd miss out on the sale prices.",
            reaction_ko: '정말요? 할인가를 못 받으실 텐데요.'
          },
          {
            text: "Yes, please. I'll scan my rewards card.",
            text_ko: '네, 쓸게요. 리워드 카드 찍을게요.',
            reaction: "Sure. Wait, didn't you sign up with your phone last time?",
            reaction_ko: '그러세요. 어, 지난번에 전화번호로 가입하지 않았어요?'
          },
          {
            text: 'Yeah, whatever saves me money. Just hurry, please.',
            text_ko: '네, 돈 아끼는 거면 뭐든요. 빨리만 해 주세요.',
            reaction: "Okay, okay. The keypad's right there.",
            reaction_ko: '네, 네. 키패드 바로 거기 있어요.'
          }
        ],
        reply_speaker: 'mike',
        reply_line: 'You saved four dollars and twelve cents today. Nice!',
        reply_ko: '오늘 4달러 12센트 아끼셨어요. 좋네요!'
      },
      {
        speaker: 'mike',
        situation: 'The card reader shows a question.',
        situation_ko: '카드 단말기에 질문이 뜹니다.',
        line: 'Would you like any cash back?',
        line_ko: '현금 인출도 해 드릴까요?',
        prompt: "You don't need any cash today. Decline.",
        prompt_ko: '오늘은 현금이 필요 없습니다. 거절하세요.',
        model: "No, thanks. I'm good.",
        model_ko: '아뇨, 괜찮아요. 됐어요.',
        distractors: [
          {
            text: 'Yes, twenty, please.',
            text_ko: '네, 20달러요.',
            reaction: 'Twenty? Sure, just hit Yes on the reader.',
            reaction_ko: "20달러요? 네, 단말기에서 '예' 누르세요."
          },
          {
            text: 'No. Why would I?',
            text_ko: '아뇨. 제가 왜요?',
            reaction: 'Just asking. Some folks like it.',
            reaction_ko: '그냥 여쭤본 거예요. 좋아하는 분들도 있어서요.'
          },
          {
            text: 'Is there a fee for that?',
            text_ko: '그거 수수료 있어요?',
            reaction: "Nope, it's free. So, any cash back?",
            reaction_ko: '아뇨, 무료예요. 그래서, 인출하실래요?'
          }
        ],
        reply_speaker: 'mike',
        reply_line: "You got it. Here's your receipt. Have a good weekend!",
        reply_ko: '알겠어요. 영수증 여기요. 좋은 주말 보내요!'
      }
    ],
    phrases: [
      {
        id: 'w_market.bogo',
        text: 'Buy one, get one free',
        meaning_ko: '하나 사면 하나 더(1+1)',
        note: 'Often written BOGO on sale signs.',
        note_ko: '할인 안내판에는 흔히 BOGO라고 씁니다.',
        category: 'shopping'
      },
      {
        id: 'w_market.cash_back',
        text: 'Would you like any cash back?',
        meaning_ko: '현금 인출하시겠어요?',
        note: 'With a debit card, you can take cash from your account at the register.',
        note_ko: '직불카드로 계산대에서 계좌의 현금을 받을 수 있습니다.',
        category: 'shopping'
      },
      {
        id: 'w_market.im_good',
        text: "No, thanks. I'm good.",
        meaning_ko: '괜찮아요.',
        note: "\"I'm good\" is a casual way to decline an offer.",
        note_ko: "\"I'm good\"은 제안을 편하게 거절하는 말입니다.",
        category: 'small-talk'
      },
      {
        id: 'w_market.right_back',
        text: "I'll be right back.",
        meaning_ko: '금방 올게요.',
        note: 'Say this when you leave for a moment.',
        note_ko: '잠깐 자리를 비울 때 하는 말입니다.',
        category: 'shopping'
      },
      {
        id: 'w_market.stocking_up',
        text: 'Stocking up for the week?',
        meaning_ko: '한 주 먹을 거 사 두시는 거예요?',
        note: '"Stock up" = buy a lot to keep at home.',
        note_ko: 'stock up은 집에 두려고 많이 사는 것입니다.',
        category: 'shopping'
      },
      {
        id: 'w_market.take_your_time',
        text: 'Take your time.',
        meaning_ko: '천천히 하세요.',
        note: 'Tells someone not to hurry.',
        note_ko: '서두르지 말라는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'w_market.you_saved',
        text: 'You saved four dollars and twelve cents.',
        meaning_ko: '4달러 12센트 아끼셨어요.',
        note: 'Receipts often show your savings from the rewards card.',
        note_ko: '영수증에 적립 카드로 아낀 금액이 나오는 경우가 많습니다.',
        category: 'shopping'
      }
    ]
  },
  {
    id: 'w_faucet',
    title: 'The leaky faucet',
    title_ko: '물 새는 수도꼭지',
    place: 'apartment_door',
    npc: 'carl',
    day_from: 6,
    day_to: 7,
    time_from: '09:00',
    time_to: '20:00',
    summary: 'Your kitchen faucet drips all night. Ask Carl, your landlord, to fix it, and find out where the laundry room is.',
    summary_ko: '부엌 수도꼭지가 밤새 똑똑 샙니다. 집주인 칼에게 수리를 부탁하고, 세탁실이 어디 있는지도 알아보세요.',
    sort: 30,
    tags: 'home,landlord,repair',
    calendar: { day: 7, time: '10:00', title: 'Ask Carl about the leaky faucet', title_ko: '칼에게 새는 수도꼭지 이야기하기' },
    turns: [
      {
        speaker: 'carl',
        situation: 'Your kitchen faucet dripped all night. You find Carl watering the plants in front of the building.',
        situation_ko: '부엌 수도꼭지가 밤새 똑똑 샜습니다. 건물 앞에서 화초에 물을 주는 칼을 만납니다.',
        line: 'Morning, kid! Everything okay up there?',
        line_ko: '잘 잤어? 위층은 별일 없고?',
        prompt: 'Tell him about the problem in your kitchen.',
        prompt_ko: '부엌에 생긴 문제를 그에게 말하세요.',
        model: 'Not really. My kitchen faucet is leaking. It dripped all night.',
        model_ko: '별로요. 부엌 수도꼭지가 새요. 밤새 똑똑 떨어졌어요.',
        distractors: [
          {
            text: 'Not really. My bathroom sink is leaking. It dripped all night.',
            text_ko: '별로요. 화장실 세면대가 새요. 밤새 똑똑 떨어졌어요.',
            reaction: 'The bathroom? Huh. I just fixed that one last month.',
            reaction_ko: '화장실? 허. 그건 지난달에 고쳤는데.'
          },
          {
            text: 'Not really. The plumbing in this place is a total mess.',
            text_ko: '별로요. 이 집 배관은 완전 엉망이에요.',
            reaction: "Whoa, easy. What's going on exactly?",
            reaction_ko: '어이, 진정해. 정확히 뭐가 문젠데?'
          },
          {
            text: 'Yeah, all good! Just a tiny drip in the kitchen, no big deal.',
            text_ko: '네, 괜찮아요! 부엌에서 조금 새는 정도라 별거 아니에요.',
            reaction: "A drip's never no big deal, kid. That's my water bill.",
            reaction_ko: '새는 게 별게 아닐 리 없지. 내 수도 요금이라고.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'Ah, shoot. Probably the washer. Happens in these old buildings.',
        reply_ko: '아이고. 아마 고무 패킹일 거야. 이런 오래된 건물에선 흔해.'
      },
      {
        speaker: 'carl',
        situation: 'Carl puts down the watering can.',
        situation_ko: '칼이 물뿌리개를 내려놓습니다.',
        line: "I can come take a look. When's a good time?",
        line_ko: '내가 가서 봐 줄게. 언제가 좋아?',
        prompt: "You'll be home all day. Ask him to come later today.",
        prompt_ko: '오늘 하루 종일 집에 있습니다. 오늘 중으로 와 달라고 하세요.',
        model: "Could you come by this afternoon? I'll be home all day.",
        model_ko: '오늘 오후에 와 주실 수 있어요? 하루 종일 집에 있어요.',
        distractors: [
          {
            text: "Could you come by this afternoon? I'll be at work till six.",
            text_ko: '오늘 오후에 와 주실 수 있어요? 전 여섯 시까지 회사에 있어요.',
            reaction: 'At work on a Saturday? Then when do you want me?',
            reaction_ko: '토요일에 회사? 그럼 언제 오라는 거야?'
          },
          {
            text: "Can you come right now? It's driving me crazy.",
            text_ko: '지금 바로 와 주실래요? 미치겠어요.',
            reaction: "Hold your horses, I'm in the middle of the plants here.",
            reaction_ko: '진정해, 나 지금 화초에 물 주는 중이야.'
          },
          {
            text: 'Whenever. Or I can just call a plumber myself.',
            text_ko: '아무 때나요. 아니면 제가 배관공 부를게요.',
            reaction: "No, no, don't do that. I handle the repairs here.",
            reaction_ko: '아냐, 그러지 마. 여기 수리는 내가 해.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'Sure thing.',
        reply_ko: '그러지.'
      },
      {
        speaker: 'carl',
        situation: 'He checks his watch.',
        situation_ko: '그가 시계를 봅니다.',
        line: "How's three o'clock? I'll bring my toolbox.",
        line_ko: '세 시 어때? 공구 상자 들고 갈게.',
        prompt: 'The time he suggests works for you. Let him know and thank him.',
        prompt_ko: '그가 말한 시간이 괜찮습니다. 그렇게 전하고 고맙다고 하세요.',
        model: 'Three works. Thanks a lot.',
        model_ko: '세 시 좋아요. 정말 고마워요.',
        distractors: [
          {
            text: 'Two works. Thanks a lot.',
            text_ko: '두 시 좋아요. 정말 고마워요.',
            reaction: "I said three, kid. I've got to eat lunch first.",
            reaction_ko: '세 시라니까. 점심부터 먹어야지.'
          },
          {
            text: "Okay. Don't be late, though.",
            text_ko: '네. 늦지만 마세요.',
            reaction: "Ha. I've been fixing this place since before you were born.",
            reaction_ko: '하. 네가 태어나기 전부터 이 집 고쳐 왔어.'
          },
          {
            text: 'Should I buy the parts first?',
            text_ko: '제가 부품을 먼저 사 둘까요?',
            reaction: "Nah, I've got washers. So does three work or not?",
            reaction_ko: '아냐, 패킹은 있어. 그래서 세 시 괜찮아?'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'No problem.',
        reply_ko: '별말을.'
      },
      {
        speaker: 'carl',
        situation: 'You also have a pile of laundry and no idea where to wash it.',
        situation_ko: '빨래도 잔뜩 쌓였는데 어디서 빨아야 할지 모릅니다.',
        line: "Anything else while I'm at it?",
        line_ko: '온 김에 또 필요한 거 있어?',
        prompt: 'Your dirty clothes are piling up. Find out where to wash them and what it costs.',
        prompt_ko: '빨랫감이 쌓여 있습니다. 어디서 빨 수 있는지, 얼마인지 물어보세요.',
        model: "Actually, yes. Where's the laundry room, and how much is a load?",
        model_ko: '사실 있어요. 세탁실이 어디예요? 한 번 돌리는 데 얼마예요?',
        distractors: [
          {
            text: "Actually, yes. Could you do my laundry too while you're up there this afternoon?",
            text_ko: '사실 있어요. 오후에 올라오신 김에 제 빨래도 좀 해 주실래요?',
            reaction: "Ha! Nice try. I'm a landlord, not a laundromat.",
            reaction_ko: '하! 꿈도 크네. 난 집주인이지 빨래방이 아니야.'
          },
          {
            text: 'Actually, yes. Is the laundromat on Main open on weekends?',
            text_ko: '사실 있어요. 메인가 빨래방이 주말에도 열어요?',
            reaction: "Why pay downtown prices? We've got machines right here.",
            reaction_ko: '왜 시내 가격을 내? 여기 건물에도 기계 있어.'
          },
          {
            text: 'Actually, yes. Could you lower my rent since the sink leaks?',
            text_ko: '사실 있어요. 싱크대가 새니까 월세 좀 깎아 주실래요?',
            reaction: "Whoa, it's a drip, not a flood. I'm fixing it today.",
            reaction_ko: '어이, 물 좀 새는 거지 홍수가 아니잖아. 오늘 고칠 거야.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'Basement, next to the storage lockers. Two seventy-five a load. It takes quarters or the app.',
        reply_ko: '지하실, 창고 사물함 옆이야. 한 번에 2달러 75센트. 25센트 동전이나 앱으로 돼.'
      }
    ],
    phrases: [
      {
        id: 'w_faucet.a_load',
        text: 'How much is a load?',
        meaning_ko: '한 번 돌리는 데 얼마예요?',
        note: 'A "load" of laundry = one machine full.',
        note_ko: 'a load of laundry는 세탁기 한 번 분량입니다.',
        category: 'home'
      },
      {
        id: 'w_faucet.come_by',
        text: 'Could you come by this afternoon?',
        meaning_ko: '오늘 오후에 들러 주실 수 있어요?',
        note: '"Come by" = visit briefly.',
        note_ko: 'come by는 잠깐 들르는 것입니다.',
        category: 'home'
      },
      {
        id: 'w_faucet.everything_okay',
        text: 'Everything okay up there?',
        meaning_ko: '위층은 별일 없지?',
        note: 'A landlord or neighbor checking on you.',
        note_ko: '집주인이나 이웃이 안부를 확인하는 말입니다.',
        category: 'home'
      },
      {
        id: 'w_faucet.faucet_leaking',
        text: 'My kitchen faucet is leaking.',
        meaning_ko: '부엌 수도꼭지가 새요.',
        note: 'Americans say "faucet"; the British say "tap".',
        note_ko: '미국에서는 faucet, 영국에서는 tap이라고 합니다.',
        category: 'home'
      },
      {
        id: 'w_faucet.laundry_room',
        text: "Where's the laundry room?",
        meaning_ko: '세탁실이 어디예요?',
        note: 'Many US apartment buildings have shared coin laundry.',
        note_ko: '미국 아파트 건물에는 공용 동전 세탁실이 많습니다.',
        category: 'home'
      },
      {
        id: 'w_faucet.shoot',
        text: 'Ah, shoot.',
        meaning_ko: '아이고, 저런.',
        note: 'A mild word for small bad news.',
        note_ko: '작은 나쁜 소식에 쓰는 순한 말입니다.',
        category: 'home'
      },
      {
        id: 'w_faucet.take_a_look',
        text: 'I can come take a look.',
        meaning_ko: '가서 한번 볼게.',
        note: '"Take a look" = check or inspect.',
        note_ko: 'take a look은 확인하거나 살펴보는 것입니다.',
        category: 'home'
      },
      {
        id: 'w_faucet.while_im_at_it',
        text: "Anything else while I'm at it?",
        meaning_ko: '온 김에 다른 건 없어?',
        note: "\"While I'm at it\" = since I'm already doing this.",
        note_ko: "while I'm at it은 하는 김에라는 뜻입니다.",
        category: 'home'
      }
    ]
  }
];

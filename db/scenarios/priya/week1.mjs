// Priya Nair's first week (game days 1-7: Monday, October 5 to Sunday, October 11): the missions.
// Each episode is a conversation with its turns, its entry on the calendar and the expressions it teaches.

export const hero = 'priya';

export const episodes = [
  {
    id: 'pr_d1_coffee',
    title: "The usual at Nina's cart",
    title_ko: '니나의 카트에서 늘 마시던 걸로',
    place: 'coffee_cart',
    npc: 'nina',
    day_to: 5,
    time_from: '07:00',
    time_to: '10:30',
    summary: 'You stop at the coffee cart every morning. Order your usual latte with an extra shot and chat with Nina about the big week ahead.',
    summary_ko: '매일 아침 들르는 커피 카트입니다. 늘 마시던 라테에 샷을 추가해 주문하고, 니나와 바쁜 한 주 이야기를 나누세요.',
    reward: -5,
    energy: 9,
    sort: 10,
    tags: 'food,order,coffee',
    turns: [
      {
        speaker: 'nina',
        situation: "Nina's coffee cart on Lake Avenue. You stop here every morning on your way in.",
        situation_ko: '레이크 애비뉴에 있는 니나의 커피 카트입니다. 출근길에 매일 아침 들르는 곳이에요.',
        line: 'Morning, Priya! The usual?',
        line_ko: '좋은 아침이에요, 프리야! 늘 드시던 걸로요?',
        prompt: 'Say yes to your usual. (Your usual: a medium latte made with oat milk.)',
        prompt_ko: '평소 마시던 걸로 하겠다고 하세요. (평소 메뉴: 귀리 우유로 만든 라테, 미디엄)',
        model: 'Yes, please. A medium oat milk latte.',
        model_ko: '네, 부탁해요. 귀리 우유 라테 미디엄이요.',
        distractors: [
          {
            text: 'Yes, please. A large oat milk latte.',
            text_ko: '네, 부탁해요. 귀리 우유 라테 라지요.',
            reaction: 'A large? Switching it up today?',
            reaction_ko: '라지요? 오늘은 바꿔 보시게요?'
          },
          {
            text: 'Obviously. Same as every single day, Nina.',
            text_ko: '당연하죠. 매일 똑같은 거잖아요, 니나.',
            reaction: 'Whoa, okay. Somebody needs their coffee.',
            reaction_ko: '워, 알았어요. 누가 커피가 급하시네.'
          },
          {
            text: 'Hmm, what do you recommend today?',
            text_ko: '음, 오늘은 뭐가 괜찮아요? 추천해 줄래요?',
            reaction: "Oh! I thought you'd want the usual.",
            reaction_ko: '어머! 늘 드시던 걸로 하실 줄 알았는데.'
          }
        ],
        reply_speaker: 'nina',
        reply_line: 'One medium oat latte, coming up.',
        reply_ko: '귀리 우유 라테 미디엄 하나, 바로 나갑니다.'
      },
      {
        speaker: 'nina',
        situation: 'Nina reaches for a cup.',
        situation_ko: '니나가 컵을 집어 듭니다.',
        line: 'Hot or iced today?',
        line_ko: '오늘은 따뜻한 걸로요, 아이스로요?',
        prompt: 'Hot today. You need extra caffeine to get through this week.',
        prompt_ko: '오늘은 따뜻한 걸로요. 이번 주를 버티려면 카페인이 더 필요합니다.',
        model: "Hot, please. And can I get an extra shot? It's a big week.",
        model_ko: '따뜻한 걸로 주세요. 그리고 샷 하나 추가해 줄래요? 중요한 한 주라서요.',
        distractors: [
          {
            text: "Iced, please. And can I get an extra shot? It's a big week.",
            text_ko: '아이스로 주세요. 그리고 샷 하나 추가해 줄래요? 중요한 한 주라서요.',
            reaction: 'Iced, huh? Okay, iced with an extra shot.',
            reaction_ko: '아이스요? 알겠어요, 아이스에 샷 추가.'
          },
          {
            text: "Hot, please. Could you make it decaf? It's a big week.",
            text_ko: '따뜻한 걸로 주세요. 디카페인으로 해 줄래요? 중요한 한 주라서요.',
            reaction: 'Decaf? For a big week? You sure?',
            reaction_ko: '디카페인이요? 중요한 주에? 정말요?'
          },
          {
            text: "Hot. Ugh, don't even ask. This week is going to be a nightmare.",
            text_ko: '따뜻한 거요. 아, 말도 마요. 이번 주는 완전 악몽일 거예요.',
            reaction: 'Oof. Want something to help with that?',
            reaction_ko: '이런. 그럼 뭐 좀 도움 될 만한 거 드릴까요?'
          }
        ],
        reply_speaker: 'nina',
        reply_line: 'Uh-oh, an extra-shot kind of week. You got it.',
        reply_ko: '이런, 샷 추가가 필요한 한 주군요. 알겠어요.'
      },
      {
        speaker: 'nina',
        situation: 'The smell of fresh muffins comes from the cart.',
        situation_ko: '카트에서 갓 구운 머핀 냄새가 납니다.',
        line: 'Anything to eat with that? The muffins just came out.',
        line_ko: '같이 드실 건요? 머핀이 방금 나왔어요.',
        prompt: "You don't want anything to eat. Turn it down nicely.",
        prompt_ko: '먹을 건 필요 없습니다. 기분 좋게 사양하세요.',
        model: "I'm good, thanks. Just the latte.",
        model_ko: '괜찮아요, 고마워요. 라테만 주세요.',
        distractors: [
          {
            text: "No. I don't eat that kind of stuff.",
            text_ko: '아뇨. 그런 건 안 먹어요.',
            reaction: 'Oh. Okay, then.',
            reaction_ko: '아. 네, 그럼.'
          },
          {
            text: "Sure, I'll take a blueberry one.",
            text_ko: '좋아요, 블루베리로 하나 주세요.',
            reaction: 'One blueberry muffin, coming right up!',
            reaction_ko: '블루베리 머핀 하나, 바로 드릴게요!'
          },
          {
            text: 'Not those. They look kind of dry.',
            text_ko: '그건 됐어요. 좀 퍽퍽해 보여서요.',
            reaction: 'Dry? They just came out of the oven!',
            reaction_ko: '퍽퍽해요? 방금 오븐에서 나온 건데요!'
          }
        ],
        reply_speaker: 'nina',
        reply_line: 'No problem. Maybe tomorrow.',
        reply_ko: '그럼요. 내일은 드셔 보세요.'
      },
      {
        speaker: 'nina',
        situation: 'You hold your card over the reader.',
        situation_ko: '카드를 단말기에 갖다 댑니다.',
        line: "That's five even. Big day today?",
        line_ko: '딱 5달러예요. 오늘 중요한 날이에요?',
        prompt: "Tell her what's happening today: someone new joins your team, and you're leading the ten o'clock meeting.",
        prompt_ko: '오늘 무슨 일이 있는지 말하세요. 팀에 새 사람이 오고, 10시 회의를 당신이 진행합니다.',
        model: "Yeah. A new developer starts today, and I'm running standup at ten.",
        model_ko: '네. 오늘 새 개발자가 첫 출근하고, 10시에 제가 스탠드업을 진행해요.',
        distractors: [
          {
            text: "Kind of. A new designer starts today, and I'm running standup at ten.",
            text_ko: '그런 셈이에요. 오늘 새 디자이너가 오고, 10시에 제가 스탠드업을 진행해요.',
            reaction: 'A designer? Fun! Send them my way.',
            reaction_ko: '디자이너요? 재밌겠네요! 저한테도 보내 주세요.'
          },
          {
            text: "Every day's a big day here. Can I just pay, please? I'm running late.",
            text_ko: '여긴 매일이 중요한 날이에요. 그냥 계산해도 돼요? 늦었거든요.',
            reaction: "Oh. Sure, sorry. You're all set.",
            reaction_ko: '아. 네, 죄송해요. 다 됐어요.'
          },
          {
            text: "Yeah. A client might drop us if Monday's demo goes badly, so…",
            text_ko: '네. 월요일 데모 망치면 고객이 우리랑 끊을 수도 있어서요…',
            reaction: 'Yikes. Well, good luck with that.',
            reaction_ko: '아이고. 뭐, 잘 되길 바랄게요.'
          }
        ],
        reply_speaker: 'nina',
        reply_line: "Fun! Send the new hire my way. Here's your latte. Have a good one!",
        reply_ko: '재밌겠네요! 새로 온 분한테 여기 알려 주세요. 라테 나왔어요. 좋은 하루 보내요!'
      }
    ],
    phrases: [
      {
        id: 'pr_d1_coffee.big_week',
        text: "It's a big week.",
        meaning_ko: '중요한 한 주예요.',
        note: '"Big" here means important and busy: a big day, a big meeting.',
        note_ko: '여기서 big은 중요하고 바쁘다는 뜻입니다. a big day, a big meeting처럼 씁니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_d1_coffee.extra_shot',
        text: 'Can I get an extra shot?',
        meaning_ko: '샷 하나 추가해 주시겠어요?',
        note: '"A shot" is one serving of espresso. "Extra" means one more than usual.',
        note_ko: 'shot은 에스프레소 1회분입니다. extra는 평소보다 하나 더라는 뜻입니다.',
        category: 'food'
      },
      {
        id: 'pr_d1_coffee.five_even',
        text: "That's five even.",
        meaning_ko: '딱 5달러예요.',
        note: '"Even" means exactly, with no cents.',
        note_ko: 'even은 센트 없이 딱 떨어진다는 뜻입니다.',
        category: 'shopping'
      },
      {
        id: 'pr_d1_coffee.im_good',
        text: "I'm good, thanks.",
        meaning_ko: '괜찮아요, 고마워요.',
        note: 'A friendly way to turn down an offer.',
        note_ko: '권하는 것을 상냥하게 사양하는 말입니다.',
        category: 'food'
      },
      {
        id: 'pr_d1_coffee.running',
        text: "I'm running standup at ten.",
        meaning_ko: '열 시에 스탠드업을 진행해요.',
        note: '"To run a meeting" means to lead it.',
        note_ko: 'run a meeting은 회의를 진행한다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d1_coffee.the_usual',
        text: 'The usual?',
        meaning_ko: '늘 드시던 걸로요?',
        note: 'What a barista or server asks a regular. Answer "Yes, please" or "The usual, please."',
        note_ko: '바리스타나 종업원이 단골에게 묻는 말입니다. "Yes, please"나 "The usual, please."로 답합니다.',
        category: 'food'
      }
    ]
  },
  {
    id: 'pr_d1_priorities',
    title: 'Aligning on priorities with Maya',
    title_ko: '마야와 우선순위 맞추기',
    place: 'office_manager',
    npc: 'maya',
    day_to: 1,
    time_from: '08:30',
    time_to: '12:00',
    summary: 'Before standup, agree with Maya on what matters most this sprint: the must-have, the nice-to-have, and a light load for the new developer.',
    summary_ko: '스탠드업 전에 마야와 이번 스프린트에서 가장 중요한 것을 맞추세요. 꼭 해야 할 것, 있으면 좋은 것, 그리고 신입의 업무량까지.',
    sort: 20,
    tags: 'meeting,manager,planning',
    calendar: { day: 1, time: '09:00', title: 'Sprint priorities with Maya', title_ko: '마야와 스프린트 우선순위 정하기' },
    turns: [
      {
        speaker: 'maya',
        situation: "Maya's office. Sunlight falls on the checklist on her desk.",
        situation_ko: '마야의 사무실입니다. 책상 위 체크리스트에 햇빛이 비칩니다.',
        line: 'Morning, Priya. Do you have a few minutes to sync before standup?',
        line_ko: '좋은 아침이에요, 프리야. 스탠드업 전에 몇 분만 맞춰 볼 시간 있어요?',
        prompt: "You're happy to talk. You were hoping to agree on what comes first this sprint.",
        prompt_ko: '기꺼이 이야기하세요. 마침 이번 스프린트에서 무엇을 먼저 할지 맞추고 싶었습니다.',
        model: "Sure. I wanted to align on this sprint's priorities anyway.",
        model_ko: '그럼요. 어차피 이번 스프린트 우선순위를 맞추고 싶었어요.',
        distractors: [
          {
            text: "Sorry, I'm swamped. Can we do it after standup instead?",
            text_ko: '미안해요, 너무 바빠요. 스탠드업 끝나고 하면 안 될까요?',
            reaction: "After standup's too late. It's about the sprint.",
            reaction_ko: '스탠드업 끝나면 늦어요. 스프린트 얘기거든요.'
          },
          {
            text: "Sure. I wanted to talk about next quarter's budget anyway, actually.",
            text_ko: '그럼요. 어차피 다음 분기 예산 얘기를 하고 싶었어요.',
            reaction: 'Budget? Hmm, I was thinking more about this sprint.',
            reaction_ko: '예산이요? 음, 저는 이번 스프린트 얘기를 하려던 건데.'
          },
          {
            text: "Sure, but make it quick. I've got a lot on my plate.",
            text_ko: '좋아요, 근데 빨리 해 주세요. 할 일이 산더미라서요.',
            reaction: "Okay… I'll keep it short.",
            reaction_ko: '그래요… 짧게 할게요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Great minds think alike. Have a seat.',
        reply_ko: '마음이 통했네요. 앉아요.'
      },
      {
        speaker: 'maya',
        situation: 'She opens the roadmap on her screen.',
        situation_ko: '마야가 화면에 로드맵을 띄웁니다.',
        line: "So, what's the top priority for this sprint?",
        line_ko: '그래서 이번 스프린트 최우선은 뭐예요?',
        prompt: 'Tell her what comes first: the checkout work, because of the client demo next Monday.',
        prompt_ko: '무엇이 먼저인지 말하세요. 결제 쪽 작업입니다. 다음 주 월요일에 고객 데모가 있어요.',
        model: 'Our top priority is the new checkout flow. The client demo is next Monday.',
        model_ko: '최우선은 새 결제 흐름이에요. 고객 데모가 다음 주 월요일이거든요.',
        distractors: [
          {
            text: 'The new checkout flow, definitely. The client demo is this Thursday.',
            text_ko: '당연히 결제 흐름이죠. 고객 데모가 이번 주 목요일이에요.',
            reaction: 'Thursday? I had the demo down for next Monday.',
            reaction_ko: '목요일이요? 데모는 다음 주 월요일로 적어 뒀는데.'
          },
          {
            text: "Everything's important. I'd rather not rank things this early on.",
            text_ko: '다 중요해요. 이렇게 일찍부터 순위를 매기고 싶진 않아요.',
            reaction: "Priya, that's the whole point of this meeting.",
            reaction_ko: '프리야, 그걸 정하려고 지금 만난 거잖아요.'
          },
          {
            text: "The wish list feature. Greg keeps bringing it up, so let's just do it first.",
            text_ko: '위시리스트 기능이요. 그렉이 계속 물어보니까 그것부터 하죠.',
            reaction: 'Really? I thought the demo needs the checkout.',
            reaction_ko: '정말요? 데모엔 결제 쪽이 필요한 줄 알았는데.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Agreed. That's the must-have.",
        reply_ko: '동의해요. 그건 꼭 해야 하는 일이죠.'
      },
      {
        speaker: 'maya',
        situation: 'Maya scrolls down the list.',
        situation_ko: '마야가 목록을 아래로 내립니다.',
        line: 'What about the wish list feature? Greg keeps bringing it up.',
        line_ko: '위시리스트 기능은요? 그렉이 계속 얘기하던데.',
        prompt: "You don't think it's urgent. Suggest when to do it.",
        prompt_ko: '급하다고 생각하지 않습니다. 언제 할지 제안하세요.',
        model: "That's a nice-to-have. I'd push it to the next sprint.",
        model_ko: '그건 있으면 좋은 정도예요. 다음 스프린트로 미룰게요.',
        distractors: [
          {
            text: "It's a must-have, honestly. Let's squeeze it into this sprint.",
            text_ko: '그건 꼭 해야 해요. 이번 스프린트에 끼워 넣죠.',
            reaction: "This sprint? On top of the checkout? That's a lot.",
            reaction_ko: '이번 스프린트에요? 결제 작업까지 있는데? 너무 많아요.'
          },
          {
            text: "Greg can keep asking. We're never doing that one.",
            text_ko: '그렉이야 계속 물어보라죠. 그건 절대 안 할 거예요.',
            reaction: "Never? He's our biggest client. Let's not burn that bridge.",
            reaction_ko: '절대요? 제일 큰 고객인데요. 관계를 망치진 말죠.'
          },
          {
            text: "Let's just tell Greg it'll be done by Monday's demo.",
            text_ko: '그냥 그렉한테 월요일 데모까지 된다고 하죠.',
            reaction: "By Monday? We'd be promising something we can't deliver.",
            reaction_ko: '월요일까지요? 못 지킬 약속을 하는 거예요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Makes sense. I'll tell Greg it's on the roadmap, just not yet.",
        reply_ko: '좋아요. 그렉에게는 로드맵에 있지만 아직은 아니라고 말할게요.'
      },
      {
        speaker: 'maya',
        situation: 'She checks one more item on her list.',
        situation_ko: '마야가 목록에서 한 가지를 더 확인합니다.',
        line: 'One more thing. Jun, the new developer, starts today. Can you keep his load light?',
        line_ko: '하나 더요. 새 개발자 준이 오늘 첫 출근이에요. 일을 가볍게 줄 수 있어요?',
        prompt: "Agree, and say how you'll ease him in.",
        prompt_ko: '동의하고, 어떻게 천천히 적응시킬지 말하세요.',
        model: "Of course. I'll give him one small ticket to start with.",
        model_ko: '물론이죠. 처음엔 작은 티켓 하나만 줄게요.',
        distractors: [
          {
            text: "Sure. I'll put him on the checkout flow right away.",
            text_ko: '그럼요. 바로 결제 흐름에 투입할게요.',
            reaction: "The checkout? That's our must-have. Let's start him smaller.",
            reaction_ko: '결제요? 그건 꼭 해야 하는 일이잖아요. 더 작은 걸로 시작해요.'
          },
          {
            text: "Sure, but I can't babysit him. He'll have to figure things out.",
            text_ko: '네, 근데 애 보듯 할 순 없어요. 알아서 해야죠.',
            reaction: "Nobody's asking you to babysit. Just go easy on him.",
            reaction_ko: '애 보라는 게 아니에요. 그냥 살살 해 주라는 거죠.'
          },
          {
            text: 'Of course. Should he join the client demo on Monday?',
            text_ko: '물론이죠. 월요일 고객 데모에 같이 들어가게 할까요?',
            reaction: "Let's not throw him into a client demo in week one.",
            reaction_ko: '첫 주부터 고객 데모에 던져 넣지는 말죠.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Perfect. Nobody should drown in week one.',
        reply_ko: '좋아요. 첫 주부터 일에 파묻히면 안 되죠.'
      },
      {
        speaker: 'maya',
        situation: 'It is almost ten. You stand up.',
        situation_ko: '열 시가 다 되어 갑니다. 당신은 자리에서 일어납니다.',
        line: 'Anything you need from me?',
        line_ko: '제가 도와줄 건 없어요?',
        prompt: "You're worried the client will try to add features. Ask for her support.",
        prompt_ko: '고객이 기능을 더 넣어 달라고 할까 봐 걱정입니다. 마야의 지원을 부탁하세요.',
        model: 'Could you back me up if the client asks for more scope?',
        model_ko: '고객이 범위를 더 늘려 달라고 하면 제 편 좀 들어 줄래요?',
        distractors: [
          {
            text: 'Could you handle the client demo on Monday for me?',
            text_ko: '월요일 고객 데모를 저 대신 좀 맡아 줄 수 있어요?',
            reaction: "The demo's yours, Priya. You know the product best.",
            reaction_ko: '데모는 프리야 몫이에요. 제품은 프리야가 제일 잘 알잖아요.'
          },
          {
            text: "Nope, I think I'm all set. See you at standup in a bit.",
            text_ko: '아뇨, 다 된 것 같아요. 이따 스탠드업에서 봬요.',
            reaction: 'Okay. Shout if anything comes up.',
            reaction_ko: '그래요. 무슨 일 있으면 불러요.'
          },
          {
            text: 'Could you just tell Greg to stop asking for new stuff?',
            text_ko: '그렉한테 새 기능 그만 요청하라고 좀 말해 줄래요?',
            reaction: "I can't just tell a client that. But I can support you.",
            reaction_ko: '고객한테 그렇게 말할 순 없죠. 하지만 힘은 실어 줄 수 있어요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Absolutely. Send him my way. And let me know if you have any questions.',
        reply_ko: '그럼요. 저한테 넘겨요. 궁금한 게 있으면 말해 주고요.'
      }
    ],
    phrases: [
      {
        id: 'pr_d1_priorities.align',
        text: 'I wanted to align on priorities.',
        meaning_ko: '우선순위를 맞추고 싶었어요.',
        note: '"Align on" = come to the same understanding. Very common with managers.',
        note_ko: 'align on은 같은 이해에 이른다는 뜻입니다. 매니저와 이야기할 때 아주 자주 씁니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d1_priorities.back_me_up',
        text: 'Could you back me up?',
        meaning_ko: '제 편을 들어 주시겠어요?',
        note: 'Ask this before a hard conversation, not after.',
        note_ko: '어려운 대화가 끝난 뒤가 아니라 시작하기 전에 부탁하세요.',
        category: 'office'
      },
      {
        id: 'pr_d1_priorities.nice_to_have',
        text: "That's a nice-to-have.",
        meaning_ko: '그건 있으면 좋은 정도예요.',
        note: 'The opposite of a "must-have": good, but not needed now.',
        note_ko: 'must-have의 반대말로, 좋지만 지금 꼭 필요하지는 않다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d1_priorities.push_it',
        text: "I'd push it to the next sprint.",
        meaning_ko: '다음 스프린트로 미루겠어요.',
        note: "\"Push\" = move to a later date. \"I'd\" makes it a suggestion.",
        note_ko: "push는 뒤로 미룬다는 뜻입니다. I'd를 쓰면 제안하는 말투가 됩니다.",
        category: 'meeting'
      },
      {
        id: 'pr_d1_priorities.sync',
        text: 'Do you have a few minutes to sync?',
        meaning_ko: '잠깐 이야기 맞출 시간 있어요?',
        note: '"To sync" is to share updates quickly so everyone has the same information.',
        note_ko: 'sync는 서로 상황을 짧게 공유해 정보를 맞추는 것입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d1_priorities.top_priority',
        text: 'Our top priority is the new checkout flow.',
        meaning_ko: '우리의 최우선 과제는 새 결제 흐름이에요.',
        note: 'Name one top priority. If everything is a priority, nothing is.',
        note_ko: '최우선은 하나만 말하세요. 전부 우선이면 우선순위가 없는 것과 같습니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'pr_d1_standup',
    title: 'Running standup, welcoming Jun',
    title_ko: '스탠드업 진행과 준 환영하기',
    place: 'office_meeting',
    npc: 'derek',
    day_to: 1,
    time_from: '09:30',
    time_to: '12:30',
    summary: 'Run the daily standup: start on time, welcome the new developer, clear his blocker, stop a side discussion, and finish in fifteen minutes.',
    summary_ko: '데일리 스탠드업을 진행하세요. 제시간에 시작하고, 새 개발자를 환영하고, 막힌 점을 풀어 주고, 옆길로 새는 이야기를 끊고, 15분 안에 끝내세요.',
    sort: 30,
    tags: 'meeting,standup,facilitation',
    calendar: { day: 1, time: '10:00', title: "Daily standup (Jun's first day)", title_ko: '데일리 스탠드업(준의 첫날)' },
    turns: [
      {
        speaker: 'derek',
        situation: "Ten o'clock sharp. The team is standing around the table in the meeting room.",
        situation_ko: '열 시 정각입니다. 팀이 회의실 탁자 주위에 서 있습니다.',
        line: "Morning, Priya. Everybody's here, including Jun, the new guy.",
        line_ko: '좋은 아침이에요, 프리야. 새로 온 준까지 다 모였어요.',
        prompt: "It's time. Open the meeting and give the new guy the floor.",
        prompt_ko: '시간이 됐습니다. 회의를 열고, 새로 온 사람에게 말할 기회를 주세요.',
        model: "Okay, let's get started. Jun, want to say a quick hello?",
        model_ko: '자, 시작하죠. 준, 짧게 인사 한마디 해 줄래요?',
        distractors: [
          {
            text: "Alright, let's begin. Derek, want to introduce yourself?",
            text_ko: '좋아요, 시작하죠. 데릭, 자기소개 해 줄래요?',
            reaction: "Me? Everyone knows me. Isn't it Jun's first day?",
            reaction_ko: '저요? 다들 저 알잖아요. 오늘 준이 첫날 아니에요?'
          },
          {
            text: "Let's wait five more minutes. People are always late anyway.",
            text_ko: '5분만 더 기다리죠. 어차피 늘 누군가 늦으니까요.',
            reaction: "Everybody's already here, though.",
            reaction_ko: '근데 다들 벌써 와 있어요.'
          },
          {
            text: "Let's start. Jun, you can skip updates. You haven't done anything yet.",
            text_ko: '시작하죠. 준은 업데이트 건너뛰어요. 아직 한 게 없잖아요.',
            reaction: "Ouch. Go easy on him, it's his first day.",
            reaction_ko: '아야. 살살 해요, 첫날이잖아요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Hi, everyone. I'm Jun. I just joined as a developer. Excited to be here!",
        reply_ko: '안녕하세요, 여러분. 준입니다. 개발자로 막 입사했어요. 함께하게 되어 기쁩니다!'
      },
      {
        speaker: 'jun',
        situation: 'Jun looks a little nervous.',
        situation_ko: '준이 조금 긴장한 것 같습니다.',
        line: 'Sorry, how does this meeting work?',
        line_ko: '죄송한데, 이 회의는 어떻게 하는 거예요?',
        prompt: 'Walk him through the three things each person shares.',
        prompt_ko: '한 사람씩 말하는 세 가지를 설명해 주세요.',
        model: "It's simple: what you did yesterday, what you're doing today, and any blockers.",
        model_ko: '간단해요. 어제 한 일, 오늘 할 일, 그리고 막힌 게 있으면 말하면 돼요.',
        distractors: [
          {
            text: "It's simple: what you did last week, your goals for the month, and any questions.",
            text_ko: '간단해요. 지난주에 한 일, 이번 달 목표, 그리고 궁금한 게 있으면 말하면 돼요.',
            reaction: 'Last week? Sorry, I just started today.',
            reaction_ko: '지난주요? 죄송한데 저 오늘 입사했어요.'
          },
          {
            text: "You'll figure it out. Just watch everyone else and copy what they do.",
            text_ko: '하다 보면 알게 돼요. 그냥 다른 사람들 보고 따라 해요.',
            reaction: "Oh… okay. I'll try.",
            reaction_ko: '아… 네. 해 볼게요.'
          },
          {
            text: "It's every morning at ten, here in this room, for about fifteen minutes.",
            text_ko: '매일 아침 10시에 이 방에서 해요. 15분쯤 걸리고요.',
            reaction: 'Got it. But what do I actually say?',
            reaction_ko: '알겠어요. 근데 실제로 무슨 말을 하면 돼요?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Got it. Today I'm setting up my laptop and my dev environment.",
        reply_ko: '알겠습니다. 오늘은 노트북과 개발 환경을 세팅합니다.'
      },
      {
        speaker: 'jun',
        situation: 'He glances at Derek.',
        situation_ko: '준이 데릭을 흘끗 봅니다.',
        line: "I do have one blocker. I don't have access to the repository yet.",
        line_ko: '막힌 게 하나 있긴 해요. 아직 저장소 권한이 없어요.',
        prompt: "Clear his blocker: get Derek, his onboarding buddy, to sort it out once the meeting's over.",
        prompt_ko: '막힌 걸 풀어 주세요. 회의가 끝나면 그의 온보딩 버디인 데릭이 해결해 주게 하세요.',
        model: 'Derek, can you help Jun with that after standup?',
        model_ko: '데릭, 스탠드업 끝나고 준 그거 좀 도와줄래요?',
        distractors: [
          {
            text: 'Derek, can you drop everything and fix that now?',
            text_ko: '데릭, 하던 거 다 멈추고 지금 그것 좀 해결해 줄래요?',
            reaction: "Um, right now? Isn't the meeting still going?",
            reaction_ko: '어, 지금요? 아직 회의 중 아니에요?'
          },
          {
            text: 'Okay. Just file a ticket with IT and wait.',
            text_ko: '알겠어요. IT에 티켓 올리고 기다려요.',
            reaction: 'Oh. Okay. How long does that usually take?',
            reaction_ko: '아. 네. 그거 보통 얼마나 걸려요?'
          },
          {
            text: 'Jun, can you ask Maya about that after standup?',
            text_ko: '준, 그건 스탠드업 끝나고 마야한테 물어볼래요?',
            reaction: 'Maya? I thought Derek was my onboarding buddy.',
            reaction_ko: '마야요? 데릭이 제 온보딩 버디인 줄 알았는데요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Sure thing. I'll get him access right after this.",
        reply_ko: '그럼요. 끝나자마자 권한을 받게 해 줄게요.'
      },
      {
        speaker: 'derek',
        situation: 'Derek leans on the table. He is just getting started.',
        situation_ko: '데릭이 탁자에 몸을 기댑니다. 이야기가 길어질 기세입니다.',
        line: "While we're all here: I think we should rewrite the payment module. I have a whole plan.",
        line_ko: '다들 모인 김에요. 결제 모듈을 다시 짜야 할 것 같아요. 계획도 다 있어요.',
        prompt: "It's a real issue, but not one for standup. Cut him off politely and offer another time.",
        prompt_ko: '중요한 얘기지만 스탠드업에서 할 건 아닙니다. 정중하게 끊고 다른 시간을 제안하세요.',
        model: "Good topic, but let's take that offline. Can you stay for five minutes after?",
        model_ko: '좋은 주제인데, 그건 따로 얘기해요. 끝나고 5분만 남아 줄래요?',
        distractors: [
          {
            text: 'Derek, not now. Honestly, nobody here wants to hear about the payment module.',
            text_ko: '데릭, 지금은 아니에요. 솔직히 결제 모듈 얘기는 아무도 안 듣고 싶어 해요.',
            reaction: 'Wow. Okay. Noted.',
            reaction_ko: '와. 그래요. 알겠습니다.'
          },
          {
            text: 'Good idea. Go ahead and walk us through the whole plan right now.',
            text_ko: '좋은 생각이에요. 지금 바로 계획 전체를 설명해 줘요.',
            reaction: 'Really? Okay! So first, the database layer…',
            reaction_ko: '정말요? 좋아요! 그럼 먼저 데이터베이스 계층부터…'
          },
          {
            text: "I love it. Let's go ahead and rewrite it this sprint, then.",
            text_ko: '좋네요. 그럼 이번 스프린트에 아예 다시 짜 버리죠.',
            reaction: 'Seriously? I thought the checkout was our must-have.',
            reaction_ko: '진짜요? 결제 흐름이 꼭 해야 할 일인 줄 알았는데.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Fair enough. No rush.',
        reply_ko: '그래요. 급한 건 아니에요.'
      },
      {
        speaker: 'derek',
        situation: 'The clock on the wall says 10:13.',
        situation_ko: '벽시계가 10시 13분을 가리킵니다.',
        line: "That's everybody, I think.",
        line_ko: '이제 다 한 것 같아요.',
        prompt: "Everyone has spoken, and it's 10:13. Close the meeting.",
        prompt_ko: '모두 말했고, 10시 13분입니다. 회의를 마치세요.',
        model: "That's it for today. Thanks, everyone! Same time tomorrow.",
        model_ko: '오늘은 여기까지요. 다들 고마워요! 내일 같은 시간에 봐요.',
        distractors: [
          {
            text: "That's all for today. Thanks, everyone! Same time next week.",
            text_ko: '오늘은 여기까지요. 다들 고마워요! 다음 주 같은 시간에 봐요.',
            reaction: "Next week? It's a daily standup, Priya.",
            reaction_ko: '다음 주요? 매일 하는 스탠드업이잖아요, 프리야.'
          },
          {
            text: "Great. Now let's go around one more time, just to be safe.",
            text_ko: '좋아요. 혹시 모르니 한 바퀴 더 돌아가면서 말해 보죠.',
            reaction: "Again? We'd blow past fifteen minutes.",
            reaction_ko: '또요? 그럼 15분 훌쩍 넘어요.'
          },
          {
            text: "Okay, we're done here. Back to work, everyone. Go.",
            text_ko: '자, 끝났어요. 다들 일하러 가요. 어서요.',
            reaction: "Yes, ma'am. Bit of a drill sergeant today.",
            reaction_ko: '네, 대장님. 오늘 좀 군기반장 같네요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Thirteen minutes. A new record.',
        reply_ko: '13분이네요. 신기록이에요.'
      }
    ],
    phrases: [
      {
        id: 'pr_d1_standup.after_standup',
        text: 'Can you help Jun with that after standup?',
        meaning_ko: '스탠드업 끝나고 준을 도와줄 수 있어요?',
        note: 'Standup is for finding problems, not solving them. Solve them after.',
        note_ko: '스탠드업은 문제를 찾는 자리이지 푸는 자리가 아닙니다. 해결은 끝난 뒤에 합니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d1_standup.any_blockers',
        text: 'Any blockers?',
        meaning_ko: '막히는 거 있어요?',
        note: 'A blocker is anything that stops your work. The facilitator finds an owner for each one.',
        note_ko: 'blocker는 일을 막는 모든 것입니다. 진행자는 blocker마다 해결할 사람을 정합니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d1_standup.get_started',
        text: "Okay, let's get started.",
        meaning_ko: '자, 시작합시다.',
        note: 'The standard way to open a meeting. Say it at the exact start time.',
        note_ko: '회의를 여는 가장 기본적인 말입니다. 정확히 시작 시간에 말하세요.',
        category: 'meeting'
      },
      {
        id: 'pr_d1_standup.quick_hello',
        text: 'Want to say a quick hello?',
        meaning_ko: '짧게 인사할래요?',
        note: 'A relaxed way to invite a new person to introduce themselves.',
        note_ko: '새로 온 사람에게 자기소개를 편하게 권하는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d1_standup.same_time',
        text: 'Same time tomorrow.',
        meaning_ko: '내일 같은 시간에 봐요.',
        note: 'Short for "We will meet at the same time tomorrow."',
        note_ko: '"내일 같은 시간에 만납니다"를 줄인 말입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d1_standup.take_offline',
        text: "Let's take that offline.",
        meaning_ko: '그건 따로 이야기합시다.',
        note: 'A polite way to stop a side discussion. It does not mean "off the internet".',
        note_ko: '옆길로 새는 이야기를 정중하게 끊는 말입니다. 인터넷을 끊는다는 뜻이 아닙니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d1_standup.thats_it',
        text: "That's it for today.",
        meaning_ko: '오늘은 여기까지예요.',
        note: 'Closes a meeting. Often followed by "Thanks, everyone!"',
        note_ko: '회의를 마칠 때 하는 말입니다. 뒤에 "Thanks, everyone!"을 자주 붙입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'pr_d1_room',
    title: 'Booking the meeting room',
    title_ko: '회의실 예약하기',
    place: 'office_lobby',
    npc: 'tom',
    day_to: 1,
    time_from: '12:30',
    time_to: '17:30',
    summary: 'Ask Tom at the front desk to book the meeting room for sprint planning, make the standup a recurring booking, and check the speakerphone.',
    summary_ko: '프런트의 톰에게 스프린트 플래닝용 회의실 예약을 부탁하고, 스탠드업을 반복 예약으로 바꾸고, 스피커폰도 확인해 달라고 하세요.',
    sort: 40,
    tags: 'office,booking,scheduling',
    calendar: { day: 1, time: '14:00', title: 'Book the meeting room with Tom', title_ko: '톰에게 회의실 예약하기' },
    turns: [
      {
        speaker: 'tom',
        situation: 'The front desk. Tom has the room calendar open on his screen.',
        situation_ko: '프런트 데스크입니다. 톰의 화면에 회의실 달력이 떠 있습니다.',
        line: 'Hey, Priya! What can I do for you?',
        line_ko: '안녕하세요, 프리야! 뭘 도와드릴까요?',
        prompt: "Book a room for Wednesday afternoon. It's a big meeting, so you need the large one.",
        prompt_ko: '수요일 오후에 쓸 회의실을 예약하세요. 사람이 많으니 큰 방이 필요합니다.',
        model: "I'd like to book the large meeting room for Wednesday afternoon.",
        model_ko: '수요일 오후에 큰 회의실을 예약하고 싶어요.',
        distractors: [
          {
            text: "I'd like to book the small room by the kitchen for Wednesday afternoon.",
            text_ko: '수요일 오후에 탕비실 옆 작은 방을 예약하고 싶어요.',
            reaction: 'The small room? For sprint planning? It only fits four.',
            reaction_ko: '작은 방이요? 스프린트 플래닝에요? 네 명밖에 안 들어가요.'
          },
          {
            text: 'Could I get the large meeting room for Thursday morning?',
            text_ko: '목요일 오전에 큰 회의실 쓸 수 있을까요?',
            reaction: "Thursday morning? Isn't sprint planning on Wednesday?",
            reaction_ko: '목요일 오전이요? 스프린트 플래닝은 수요일 아니었어요?'
          },
          {
            text: 'I need the big room Wednesday. Just kick out whoever has it.',
            text_ko: '수요일에 큰 방 필요해요. 누가 쓰든 그냥 빼 주세요.',
            reaction: 'Whoa. Let me at least check who has it first.',
            reaction_ko: '워. 누가 쓰는지 먼저 좀 볼게요.'
          }
        ],
        reply_speaker: 'tom',
        reply_line: 'Sprint planning, right? Let me take a look.',
        reply_ko: '스프린트 플래닝이죠? 한번 볼게요.'
      },
      {
        speaker: 'tom',
        situation: 'He runs a finger down the calendar.',
        situation_ko: '톰이 손가락으로 달력을 짚어 내려갑니다.',
        line: 'The sales team has it until two. Is two to four okay?',
        line_ko: '영업팀이 두 시까지 써요. 두 시부터 네 시 괜찮아요?',
        prompt: 'His suggestion fits your plans. Take it.',
        prompt_ko: '그가 제안한 시간이 괜찮습니다. 받아들이세요.',
        model: 'Two to four works for me.',
        model_ko: '두 시부터 네 시면 괜찮아요.',
        distractors: [
          {
            text: 'One to three works for me.',
            text_ko: '한 시부터 세 시면 괜찮아요.',
            reaction: 'Sales has it until two, though.',
            reaction_ko: '근데 영업팀이 두 시까지 써요.'
          },
          {
            text: 'I guess. If I have to.',
            text_ko: '뭐, 어쩔 수 없죠.',
            reaction: "Uh, okay. I'll put you down.",
            reaction_ko: '어, 네. 적어 둘게요.'
          },
          {
            text: "Can't sales just move?",
            text_ko: '영업팀이 옮기면 안 돼요?',
            reaction: 'Sorry, they booked it weeks ago.',
            reaction_ko: '죄송해요, 몇 주 전에 잡은 거라서요.'
          }
        ],
        reply_speaker: 'tom',
        reply_line: "Done. It's yours from two to four.",
        reply_ko: '됐어요. 두 시부터 네 시까지 쓰세요.'
      },
      {
        speaker: 'tom',
        situation: 'Tom keeps the calendar open.',
        situation_ko: '톰이 달력을 그대로 열어 둡니다.',
        line: "Anything else while I'm in here?",
        line_ko: '들어온 김에 더 할 거 있어요?',
        prompt: "Also set up the ten o'clock standup so the room is held for it automatically, Monday to Friday.",
        prompt_ko: '10시 스탠드업도 월요일부터 금요일까지 자동으로 방이 잡히게 해 달라고 하세요.',
        model: "Could you make the ten o'clock standup a recurring booking, every weekday?",
        model_ko: '10시 스탠드업을 평일마다 반복 예약으로 해 줄 수 있어요?',
        distractors: [
          {
            text: "Could you book the room for the ten o'clock standup, but just for tomorrow?",
            text_ko: '10시 스탠드업 때 쓸 방을 내일 하루만 잡아 줄 수 있어요?',
            reaction: 'Just tomorrow? You meet every day, though, right?',
            reaction_ko: '내일만요? 매일 모이지 않아요?'
          },
          {
            text: 'Yes. Can you block nine to nine fifteen every weekday for standup?',
            text_ko: '네. 평일마다 9시부터 9시 15분까지 스탠드업으로 잡아 줄래요?',
            reaction: 'Nine? I thought standup was at ten.',
            reaction_ko: '9시요? 스탠드업은 10시인 줄 알았는데.'
          },
          {
            text: "No, I think that's everything for now. Thanks, Tom. See you later.",
            text_ko: '아뇨, 지금은 그게 다인 것 같아요. 고마워요, 톰. 이따 봐요.',
            reaction: 'Alright! Holler if you think of anything.',
            reaction_ko: '그래요! 생각나는 거 있으면 불러요.'
          }
        ],
        reply_speaker: 'tom',
        reply_line: 'You got it. Ten to ten fifteen, Monday through Friday.',
        reply_ko: '알겠어요. 월요일부터 금요일까지 10시부터 10시 15분.'
      },
      {
        speaker: 'tom',
        situation: 'Tom lowers his voice a little.',
        situation_ko: '톰이 목소리를 조금 낮춥니다.',
        line: 'Heads-up, though: somebody keeps leaving coffee cups in that room.',
        line_ko: '근데 미리 말해 둘게요. 누가 자꾸 그 방에 커피 컵을 두고 가요.',
        prompt: "It's your team's mess. Own it, and say you'll take care of it.",
        prompt_ko: '당신 팀이 어질러 놓은 겁니다. 인정하고, 처리하겠다고 하세요.',
        model: "Sorry about that. I'll remind the team to clean up after themselves.",
        model_ko: '죄송해요. 팀원들한테 쓴 건 각자 치우라고 말해 둘게요.',
        distractors: [
          {
            text: "That's probably the sales team. They had the room right before we did, I think.",
            text_ko: '아마 영업팀일 거예요. 우리 바로 전에 그 방을 썼던 것 같아요.',
            reaction: "Maybe, but it's your team's cups. I've seen the stickers.",
            reaction_ko: '그럴 수도 있지만, 프리야 팀 컵이에요. 스티커 봤어요.'
          },
          {
            text: "It's just coffee cups, Tom. Can't the cleaners get them?",
            text_ko: '그냥 커피 컵이잖아요, 톰. 청소하시는 분이 치우면 되잖아요?',
            reaction: 'The cleaners come once a week, Priya.',
            reaction_ko: '청소는 일주일에 한 번 와요, 프리야.'
          },
          {
            text: 'Oh, sorry. Should I stop bringing coffee to meetings, then?',
            text_ko: '아, 죄송해요. 그럼 회의에 커피를 안 가져갈까요?',
            reaction: 'No, no. Just get folks to take their cups with them.',
            reaction_ko: '아니, 아니에요. 다들 자기 컵만 챙겨 가게 해 줘요.'
          }
        ],
        reply_speaker: 'tom',
        reply_line: "Appreciate it. You're the best.",
        reply_ko: '고마워요. 역시 프리야예요.'
      },
      {
        speaker: 'tom',
        situation: 'He picks up a pen.',
        situation_ko: '톰이 펜을 집어 듭니다.',
        line: 'Do you need anything in the room? Markers, the speakerphone?',
        line_ko: '방에 필요한 거 있어요? 마커나 스피커폰이요?',
        prompt: 'A client is dialing in this week. Ask him to check the phone in the room.',
        prompt_ko: '이번 주에 고객과 통화가 있습니다. 회의실 전화기를 점검해 달라고 하세요.',
        model: 'Could you make sure the speakerphone works? I have a client call this week.',
        model_ko: '스피커폰이 잘 되는지 확인해 줄 수 있어요? 이번 주에 고객 통화가 있어서요.',
        distractors: [
          {
            text: 'Just some fresh markers, please. The old ones are all dried out.',
            text_ko: '새 마커만 좀 주세요. 있던 건 다 말라 버렸어요.',
            reaction: 'Sure, markers. Nothing else you need in there?',
            reaction_ko: '네, 마커요. 그 방에 다른 건 필요 없어요?'
          },
          {
            text: 'Could you make sure the projector works? I have a client demo today.',
            text_ko: '프로젝터가 잘 되는지 확인해 줄래요? 오늘 고객 데모가 있어요.',
            reaction: "Today? I thought the demo was Monday. But sure, I'll check it.",
            reaction_ko: '오늘이요? 데모는 월요일인 줄 알았는데. 그래도 확인해 볼게요.'
          },
          {
            text: 'Make sure the speakerphone actually works this time. The last call was a mess.',
            text_ko: '이번엔 스피커폰 제대로 되게 해 주세요. 지난번 통화 엉망이었어요.',
            reaction: "I'll test it. No need for the tone, though.",
            reaction_ko: '확인할게요. 근데 그런 말투는 필요 없잖아요.'
          }
        ],
        reply_speaker: 'tom',
        reply_line: "I'll test it this afternoon and leave fresh markers, too.",
        reply_ko: '오늘 오후에 시험해 보고, 새 마커도 갖다 놓을게요.'
      }
    ],
    phrases: [
      {
        id: 'pr_d1_room.book_room',
        text: "I'd like to book the large meeting room.",
        meaning_ko: '큰 회의실을 예약하고 싶어요.',
        note: '"Book" and "reserve" mean the same thing here.',
        note_ko: '여기서 book과 reserve는 같은 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d1_room.clean_up',
        text: "I'll remind the team to clean up after themselves.",
        meaning_ko: '팀에게 뒷정리를 하라고 일러둘게요.',
        note: '"Clean up after yourself" = leave the place as you found it.',
        note_ko: 'clean up after yourself는 쓴 자리를 원래대로 해 둔다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d1_room.heads_up',
        text: 'Heads-up: …',
        meaning_ko: '미리 말해 두는데, …',
        note: 'A friendly warning before a small problem gets bigger.',
        note_ko: '작은 문제가 커지기 전에 미리 알려 주는 말입니다.',
        category: 'office'
      },
      {
        id: 'pr_d1_room.make_sure',
        text: 'Could you make sure the speakerphone works?',
        meaning_ko: '스피커폰이 되는지 확인해 주시겠어요?',
        note: '"Make sure" = check that something is true or ready.',
        note_ko: 'make sure는 어떤 것이 제대로인지 확인한다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d1_room.recurring',
        text: 'a recurring booking',
        meaning_ko: '반복 예약',
        note: 'Recurring = happening again and again on a schedule: a recurring meeting.',
        note_ko: 'recurring은 일정에 따라 되풀이된다는 뜻입니다. a recurring meeting처럼 씁니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d1_room.works_for_me',
        text: 'Two to four works for me.',
        meaning_ko: '두 시부터 네 시면 괜찮아요.',
        note: '"… works for me" accepts a time. The question is "Does that work for you?"',
        note_ko: '"… works for me"는 시간을 받아들이는 말입니다. 묻는 말은 "Does that work for you?"입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'pr_d2_find_time',
    title: 'Finding a time with Jun',
    title_ko: '준과 시간 맞추기',
    place: 'office_desk',
    npc: 'jun',
    day_from: 2,
    day_to: 2,
    time_from: '10:00',
    time_to: '12:59',
    summary: 'You want to go over the checkout designs with Jun at one, but he has an IT appointment. Find a new time and send the invite.',
    summary_ko: '준과 한 시에 결제 화면 디자인을 보고 싶은데, 준에게 IT 예약이 있습니다. 다른 시간을 찾고 초대장을 보내세요.',
    sort: 10,
    tags: 'meeting,scheduling',
    calendar: { day: 2, time: '11:00', title: 'Find a time with Jun', title_ko: '준과 시간 맞추기' },
    turns: [
      {
        speaker: 'jun',
        situation: "After standup you stop by Jun's desk. He is reading the team wiki.",
        situation_ko: '스탠드업이 끝나고 준의 자리에 들릅니다. 준은 팀 위키를 읽고 있습니다.',
        line: 'Oh, hi, Priya! Did you need something?',
        line_ko: '어, 안녕하세요, 프리야! 뭐 필요한 거 있으세요?',
        prompt: "Ask if he's free to look at the checkout designs together. You were thinking one o'clock.",
        prompt_ko: '결제 화면 디자인을 같이 볼 시간이 있는지 물어보세요. 한 시쯤을 생각하고 있습니다.',
        model: "Do you have a sec? I want to go over the checkout designs with you. Does one o'clock work?",
        model_ko: '잠깐 시간 돼요? 결제 화면 디자인을 같이 보고 싶어서요. 한 시 괜찮아요?',
        distractors: [
          {
            text: "Hey, got a minute? I'd like to walk you through the checkout designs. Is three o'clock okay?",
            text_ko: '잠깐 시간 있어요? 결제 화면 디자인을 같이 보고 싶어서요. 세 시 괜찮아요?',
            reaction: "Three should work. Weren't you thinking earlier, though?",
            reaction_ko: '세 시면 될 것 같아요. 근데 더 일찍 하려던 거 아니었어요?'
          },
          {
            text: 'I need you in the small room at one for the checkout designs. Clear your calendar.',
            text_ko: '한 시에 결제 디자인 보게 작은 방으로 와요. 일정 비워 두고요.',
            reaction: 'Oh, um… I have IT at one. Is that okay?',
            reaction_ko: '아, 음… 한 시에 IT 예약이 있는데. 괜찮을까요?'
          },
          {
            text: 'Do you have a sec? I want to go over the payment module rewrite. Is right now good?',
            text_ko: '잠깐 시간 돼요? 결제 모듈 재작성 얘기를 하고 싶어서요. 지금 괜찮아요?',
            reaction: 'The payment module? I thought Derek was taking that offline.',
            reaction_ko: '결제 모듈이요? 그건 데릭이랑 따로 얘기하기로 한 줄 알았는데요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Sorry, I have an appointment with IT at one.',
        reply_ko: '죄송해요, 한 시에 IT 예약이 있어요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun checks his calendar.',
        situation_ko: '준이 달력을 확인합니다.',
        line: "Could we move it to two o'clock instead?",
        line_ko: '대신 두 시로 옮길 수 있을까요?',
        prompt: "Accept his time, and say you'll put it on his calendar.",
        prompt_ko: '그가 말한 시간을 받아들이고, 일정에 넣어 주겠다고 하세요.',
        model: "Two works for me. I'll send you a calendar invite.",
        model_ko: '두 시 좋아요. 캘린더 초대 보낼게요.',
        distractors: [
          {
            text: "Three works for me. I'll send you a calendar invite.",
            text_ko: '세 시 좋아요. 캘린더 초대 보낼게요.',
            reaction: 'Three? I said two, I think.',
            reaction_ko: '세 시요? 저 두 시라고 한 것 같은데요.'
          },
          {
            text: 'Two works. Could you send me the calendar invite?',
            text_ko: '두 시 좋아요. 캘린더 초대 좀 보내 줄래요?',
            reaction: 'Oh, sure. How do I do that in this calendar?',
            reaction_ko: '아, 네. 근데 이 캘린더에서 그거 어떻게 해요?'
          },
          {
            text: "Fine, two. But please don't make me reschedule again.",
            text_ko: '알았어요, 두 시. 근데 또 시간 옮기게 하진 마요.',
            reaction: "Oh. Sorry. I'll be there.",
            reaction_ko: '아. 죄송해요. 꼭 갈게요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Great, thank you!',
        reply_ko: '좋아요, 고맙습니다!'
      },
      {
        speaker: 'jun',
        situation: 'He opens a new block on his calendar.',
        situation_ko: '준이 달력에 새 일정을 만듭니다.',
        line: 'How long will it take? I want to block out the time.',
        line_ko: '얼마나 걸려요? 시간을 비워 두려고요.',
        prompt: "Half an hour is plenty. Also tell him where you'll meet: the small room next to the kitchen.",
        prompt_ko: '30분이면 충분합니다. 어디서 볼지도 말하세요. 탕비실 옆 작은 방입니다.',
        model: "Thirty minutes should do it. I'll book the small room by the kitchen.",
        model_ko: '30분이면 될 거예요. 탕비실 옆 작은 방을 잡아 둘게요.',
        distractors: [
          {
            text: "About two hours, I'd say. I'll book the large meeting room.",
            text_ko: '두 시간쯤 걸릴 거예요. 큰 회의실을 잡아 둘게요.',
            reaction: "Two hours? Wow, okay. I'll clear the afternoon.",
            reaction_ko: '두 시간이요? 와, 알겠어요. 오후를 비워 둘게요.'
          },
          {
            text: 'As long as it takes. Just keep your whole afternoon open.',
            text_ko: '걸리는 만큼이요. 오후는 통째로 비워 둬요.',
            reaction: "Oh… the whole afternoon? I'll try.",
            reaction_ko: '아… 오후 내내요? 해 볼게요.'
          },
          {
            text: 'Thirty minutes should do it. Could you book a room for the two of us, then?',
            text_ko: '30분이면 될 거예요. 방은 준이 잡아 줄래요?',
            reaction: 'Sure, um… how do I book a room here?',
            reaction_ko: '네, 음… 여기선 방을 어떻게 잡아요?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Thirty minutes. Got it.',
        reply_ko: '30분. 알겠습니다.'
      },
      {
        speaker: 'jun',
        situation: 'Jun picks up his notebook.',
        situation_ko: '준이 공책을 집어 듭니다.',
        line: 'Should I prepare anything?',
        line_ko: '뭐 준비해야 할 거 있어요?',
        prompt: "There's nothing to prepare, but a quick look at the screens first would help.",
        prompt_ko: '준비할 건 없지만, 화면 시안을 미리 한번 보면 도움이 됩니다.',
        model: 'No prep needed. Just take a look at the mockups beforehand if you have time.',
        model_ko: '준비할 건 없어요. 시간 되면 목업만 미리 한번 봐 둬요.',
        distractors: [
          {
            text: 'Yes, please read the whole design doc and write up your feedback first.',
            text_ko: '네, 디자인 문서 전체를 읽고 피드백을 먼저 써 와요.',
            reaction: 'The whole doc? Okay… by two?',
            reaction_ko: '문서 전체요? 네… 두 시까지요?'
          },
          {
            text: "No prep needed. Just bring your laptop, and we'll look at the code together.",
            text_ko: '준비할 건 없어요. 노트북만 가져와요, 코드를 같이 볼 거니까요.',
            reaction: 'The code? I thought we were looking at designs.',
            reaction_ko: '코드요? 디자인을 보는 줄 알았는데요.'
          },
          {
            text: 'Not really. Honestly, I mostly just need you there to listen.',
            text_ko: '딱히요. 솔직히 그냥 와서 듣기만 하면 돼요.',
            reaction: "Oh. Okay. I'll just listen, then.",
            reaction_ko: '아. 네. 그럼 듣기만 할게요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Will do. I'll look at them before lunch.",
        reply_ko: '그럴게요. 점심 전에 볼게요.'
      },
      {
        speaker: 'jun',
        situation: 'He hesitates for a second.',
        situation_ko: '준이 잠깐 머뭇거립니다.',
        line: 'And, um, what if IT runs long?',
        line_ko: '그리고, 음, IT가 길어지면 어떡하죠?',
        prompt: "Reassure him. If IT takes longer, he only needs to let you know and you'll move it later.",
        prompt_ko: '안심시키세요. IT가 길어지면 알려 주기만 하면 시간을 뒤로 옮기겠다고요.',
        model: "No worries. Just shoot me a message and we'll push it back.",
        model_ko: '걱정 마요. 메시지만 보내 주면 시간 뒤로 미룰게요.',
        distractors: [
          {
            text: "Then you'll just have to leave IT a little early, I guess.",
            text_ko: '그럼 IT에서 좀 일찍 나와야겠네요.',
            reaction: "Leave early? But they're setting up my laptop.",
            reaction_ko: '일찍 나오라고요? 노트북 세팅 중일 텐데요.'
          },
          {
            text: "No worries. If you're running late, I'll just start without you.",
            text_ko: '걱정 마요. 늦으면 그냥 준 없이 시작할게요.',
            reaction: "Oh. Okay. I'll try not to be late.",
            reaction_ko: '아. 네. 안 늦도록 해 볼게요.'
          },
          {
            text: "That's fine, we'll just cancel it then. No big deal.",
            text_ko: '괜찮아요, 그럼 그냥 취소하죠. 별일 아니에요.',
            reaction: "Cancel it? But don't we need it for the demo?",
            reaction_ko: '취소요? 데모 때문에 필요한 거 아니에요?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Thanks, Priya. I'll keep you posted.",
        reply_ko: '고마워요, 프리야. 계속 알려 드릴게요.'
      }
    ],
    phrases: [
      {
        id: 'pr_d2_find_time.does_one_work',
        text: "Does one o'clock work?",
        meaning_ko: '한 시 괜찮아요?',
        note: 'The easiest way to suggest a time. Also: "Does that work for you?"',
        note_ko: '시간을 제안하는 가장 쉬운 방법입니다. "Does that work for you?"도 씁니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d2_find_time.go_over',
        text: 'I want to go over the checkout designs with you.',
        meaning_ko: '결제 화면 디자인을 같이 살펴보고 싶어요.',
        note: '"Go over" = look at something together, step by step.',
        note_ko: 'go over는 함께 차근차근 살펴본다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d2_find_time.have_a_sec',
        text: 'Do you have a sec?',
        meaning_ko: '잠깐 시간 있어요?',
        note: '"A sec" = a second. Ask this before you interrupt someone.',
        note_ko: 'a sec은 a second를 줄인 말입니다. 남의 일을 끊기 전에 물어보세요.',
        category: 'office'
      },
      {
        id: 'pr_d2_find_time.no_prep',
        text: 'No prep needed.',
        meaning_ko: '준비할 건 없어요.',
        note: '"Prep" is short for preparation.',
        note_ko: 'prep은 preparation을 줄인 말입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d2_find_time.push_back',
        text: "We'll push it back.",
        meaning_ko: '시간을 뒤로 미룰게요.',
        note: '"Push back" a meeting = move it later. "Move up" = make it earlier.',
        note_ko: '회의를 push back하면 뒤로 미루는 것이고, move up하면 앞당기는 것입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d2_find_time.send_invite',
        text: "I'll send you a calendar invite.",
        meaning_ko: '캘린더 초대장을 보낼게요.',
        note: 'At American offices a meeting is not real until it is on the calendar.',
        note_ko: '미국 회사에서는 달력에 올라가야 비로소 회의가 잡힌 것입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d2_find_time.should_do_it',
        text: 'Thirty minutes should do it.',
        meaning_ko: '30분이면 될 거예요.',
        note: '"… should do it" = that will be enough.',
        note_ko: '"… should do it"은 그 정도면 충분하다는 뜻입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'pr_d2_design',
    title: 'Design trade-offs with Derek',
    title_ko: '데릭과 디자인 절충하기',
    place: 'office_desk_team',
    npc: 'derek',
    day_from: 2,
    day_to: 2,
    time_from: '14:30',
    time_to: '18:30',
    summary: 'Derek has concerns about the new checkout design. Listen, ask for a simpler version, weigh the trade-off, and get the decision written down.',
    summary_ko: '데릭이 새 결제 화면 디자인을 걱정합니다. 잘 듣고, 더 단순한 안을 묻고, 장단점을 따져 보고, 결정을 글로 남기게 하세요.',
    sort: 20,
    tags: 'meeting,design,negotiation',
    calendar: { day: 2, time: '15:00', title: 'Design trade-offs with Derek', title_ko: '데릭과 디자인 절충 논의' },
    turns: [
      {
        speaker: 'derek',
        situation: 'After the design review with Jun, Derek waves you over to his desk.',
        situation_ko: '준과 디자인 리뷰를 마친 뒤, 데릭이 자기 자리로 오라고 손짓합니다.',
        line: 'So, I looked at the new checkout mockups. They look great, but honestly, I have some concerns.',
        line_ko: '그래서, 새 결제 목업 봤어요. 멋지긴 한데, 솔직히 걱정되는 게 좀 있어요.',
        prompt: 'You want to hear him out. Invite him to explain.',
        prompt_ko: '그의 이야기를 들어 보고 싶습니다. 설명해 달라고 하세요.',
        model: "I'm all ears. What are your concerns?",
        model_ko: '잘 들을게요. 뭐가 걱정이에요?',
        distractors: [
          {
            text: 'Really? The client already loves them.',
            text_ko: '그래요? 고객은 벌써 좋아하는데요.',
            reaction: "Maybe, but they haven't seen the cost yet.",
            reaction_ko: '그렇겠죠. 근데 비용은 아직 안 봤잖아요.'
          },
          {
            text: "Thanks! So you're good to start building?",
            text_ko: '고마워요! 그럼 바로 개발 시작해도 되죠?',
            reaction: 'Not quite. I said I have concerns.',
            reaction_ko: '그건 아니고요. 걱정되는 게 있다니까요.'
          },
          {
            text: "Concerns? It's a bit late for that, Derek.",
            text_ko: '걱정이요? 이제 와서요, 데릭?',
            reaction: "Wow. Okay. I'm just trying to help here.",
            reaction_ko: '와. 그래요. 난 그냥 도우려는 건데.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Okay. It's the one-page layout.",
        reply_ko: '좋아요. 문제는 한 페이지짜리 레이아웃이에요.'
      },
      {
        speaker: 'derek',
        situation: 'He turns his monitor toward you.',
        situation_ko: '데릭이 모니터를 당신 쪽으로 돌립니다.',
        line: "Putting everything on one page means rewriting the address form. That's two weeks, easy.",
        line_ko: '전부 한 페이지에 넣으려면 주소 입력 양식을 다시 짜야 해요. 넉넉히 2주예요.',
        prompt: "Two weeks is too long. Look for a lighter option that's almost as good.",
        prompt_ko: '2주는 너무 깁니다. 거의 비슷한 효과를 내는 더 가벼운 방법을 찾아보세요.',
        model: 'Is there a simpler version that gets us most of the way there?',
        model_ko: '대부분의 효과는 내면서 더 단순한 버전은 없을까요?',
        distractors: [
          {
            text: "Two weeks? Can't you just work faster and get it done in one?",
            text_ko: '2주요? 그냥 더 빨리 해서 1주 만에 끝내면 안 돼요?',
            reaction: "That's not how it works, Priya. Faster means buggier.",
            reaction_ko: '그렇게 되는 게 아니에요, 프리야. 서두르면 버그만 늘어요.'
          },
          {
            text: "Two weeks is fine. Let's go ahead with the full rewrite, then.",
            text_ko: '2주면 괜찮아요. 그럼 전부 다시 짜는 걸로 가죠.',
            reaction: "Really? The demo's Monday, though.",
            reaction_ko: '정말요? 데모가 월요일인데요.'
          },
          {
            text: "Why didn't anyone flag this before the design got approved?",
            text_ko: '디자인 승인 나기 전에 왜 아무도 이 얘길 안 했어요?',
            reaction: "I'm flagging it now. That's what reviews are for.",
            reaction_ko: '지금 말하잖아요. 리뷰가 그러라고 있는 거죠.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'We could keep the old form and tuck it into a section that opens and closes. Three days, maybe.',
        reply_ko: '기존 양식을 그대로 두고 접었다 펴는 영역에 넣을 수 있어요. 사흘쯤 걸릴 거예요.'
      },
      {
        speaker: 'derek',
        situation: 'Two weeks against three days. You like the sound of that.',
        situation_ko: '2주 대 사흘. 듣기에 좋습니다.',
        line: "It's not perfect, though.",
        line_ko: '근데 완벽하진 않아요.',
        prompt: "The idea sounds good, but find out what you'd be giving up.",
        prompt_ko: '좋은 생각 같지만, 대신 무엇을 포기하게 되는지 알아보세요.',
        model: "I like that. What's the trade-off?",
        model_ko: '좋네요. 대신 잃는 건 뭐예요?',
        distractors: [
          {
            text: "Perfect. So it's just as good?",
            text_ko: '완벽하네요. 그럼 똑같이 좋은 거죠?',
            reaction: "Not exactly. That's what I'm saying.",
            reaction_ko: '꼭 그렇진 않아요. 그 얘기를 하는 거예요.'
          },
          {
            text: 'I like that. So, about two weeks?',
            text_ko: '좋네요. 그럼 2주쯤이요?',
            reaction: "No, three days. That's the whole point.",
            reaction_ko: '아뇨, 사흘이요. 그게 핵심이에요.'
          },
          {
            text: "Fine. Just do whatever's fastest, then.",
            text_ko: '좋아요. 그냥 제일 빠른 걸로 해요.',
            reaction: "Sure, but you should know what we'd lose.",
            reaction_ko: '그래요, 근데 뭘 잃는지는 알아야죠.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "It won't look as slick on mobile. Users have to tap one more time.",
        reply_ko: '모바일에서는 덜 매끈해 보일 거예요. 사용자가 한 번 더 눌러야 하고요.'
      },
      {
        speaker: 'derek',
        situation: 'One more tap. The client demo is on Monday.',
        situation_ko: '한 번 더 누르기. 고객 데모는 월요일입니다.',
        line: 'Can you live with that?',
        line_ko: '그 정도는 괜찮겠어요?',
        prompt: 'One extra tap is acceptable for now. Make the call.',
        prompt_ko: '탭 한 번 더는 지금은 감수할 만합니다. 결정하세요.',
        model: "I can live with that. Let's go with the simpler version for now.",
        model_ko: '그 정도는 괜찮아요. 일단 단순한 버전으로 가죠.',
        distractors: [
          {
            text: "Not really. Let's do the full one-page version after all.",
            text_ko: '별로요. 결국 한 페이지짜리 전체 버전으로 가죠.',
            reaction: "The full version? Two weeks? We'd miss the demo.",
            reaction_ko: '전체 버전이요? 2주요? 데모를 놓쳐요.'
          },
          {
            text: "Sure. Let's go simple, as long as it's ready for Friday's client demo.",
            text_ko: '좋아요. 단순하게 가요, 금요일 고객 데모까지만 되면요.',
            reaction: 'Friday? I thought the demo was Monday.',
            reaction_ko: '금요일이요? 데모는 월요일인 줄 알았는데.'
          },
          {
            text: "I don't know. Let's ask Maya and see what she thinks first.",
            text_ko: '모르겠어요. 마야한테 먼저 물어보고 생각을 들어 보죠.',
            reaction: 'We could, but this is your call, Priya.',
            reaction_ko: '그래도 되지만, 이건 프리야가 정할 일이에요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Cool. Good call.',
        reply_ko: '좋아요. 잘 정했어요.'
      },
      {
        speaker: 'derek',
        situation: 'Derek opens the design doc.',
        situation_ko: '데릭이 디자인 문서를 엽니다.',
        line: 'Want me to write that up?',
        line_ko: '제가 정리해 둘까요?',
        prompt: 'Accept, and make sure the decision gets recorded where the whole team can see it.',
        prompt_ko: '그러자고 하고, 팀 전체가 볼 수 있는 곳에 결정을 기록해 달라고 하세요.',
        model: "Yes, please. Could you add it to the design doc so we're all on the same page?",
        model_ko: '네, 부탁해요. 다들 같은 내용을 알 수 있게 디자인 문서에 넣어 줄래요?',
        distractors: [
          {
            text: "No need. We'll both remember it. Let's just get started on it.",
            text_ko: '괜찮아요. 우리 둘 다 기억하잖아요. 그냥 바로 시작하죠.',
            reaction: 'You sure? Jun and the client will ask why it changed.',
            reaction_ko: '정말요? 준이랑 고객이 왜 바뀌었는지 물어볼 텐데요.'
          },
          {
            text: 'Yes, please. Could you just send it to me in a private message?',
            text_ko: '네, 부탁해요. 그냥 저한테 개인 메시지로 보내 줄래요?',
            reaction: 'Just you? The rest of the team should see it too.',
            reaction_ko: '프리야한테만요? 팀 다른 사람들도 봐야죠.'
          },
          {
            text: 'Yes. And write it all up properly, so nobody can blame me if the client hates it.',
            text_ko: '네. 고객이 싫어해도 제 탓 안 되게 꼭 적어 둬요.',
            reaction: "Ha. Nobody's blaming anyone. But sure.",
            reaction_ko: '하. 아무도 누구 탓 안 해요. 그래도 알겠어요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Will do. It'll be in there by end of day.",
        reply_ko: '그럴게요. 오늘 퇴근 전까지 넣어 둘게요.'
      }
    ],
    phrases: [
      {
        id: 'pr_d2_design.all_ears',
        text: "I'm all ears.",
        meaning_ko: '잘 듣고 있어요. / 말해 봐요.',
        note: "Shows you really want to hear the other person's view.",
        note_ko: '상대의 의견을 정말 듣고 싶다는 뜻을 나타냅니다.',
        category: 'office'
      },
      {
        id: 'pr_d2_design.concerns',
        text: 'I have some concerns.',
        meaning_ko: '걱정되는 점이 좀 있어요.',
        note: "A calm, professional way to disagree. Softer than \"I don't like it.\"",
        note_ko: "반대 의견을 차분하고 프로답게 꺼내는 말입니다. \"I don't like it.\"보다 부드럽습니다.",
        category: 'meeting'
      },
      {
        id: 'pr_d2_design.go_with',
        text: "Let's go with the simpler version for now.",
        meaning_ko: '일단 단순한 안으로 갑시다.',
        note: '"Go with" = choose. "For now" leaves the door open to change it later.',
        note_ko: 'go with는 고른다는 뜻입니다. for now는 나중에 바꿀 여지를 남깁니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d2_design.live_with',
        text: 'I can live with that.',
        meaning_ko: '그 정도는 감수할 수 있어요.',
        note: 'You accept something that is not perfect.',
        note_ko: '완벽하지는 않지만 받아들인다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d2_design.same_page',
        text: "so we're all on the same page",
        meaning_ko: '모두가 같은 내용을 알도록',
        note: '"On the same page" = having the same understanding.',
        note_ko: 'on the same page는 같은 이해를 공유한다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d2_design.simpler_version',
        text: 'Is there a simpler version that gets us most of the way there?',
        meaning_ko: '대부분의 효과를 내는 더 단순한 안이 있을까요?',
        note: "A product manager's best question: most of the value for a part of the work.",
        note_ko: '프로덕트 매니저의 가장 좋은 질문입니다. 일은 일부만 하고 가치는 대부분 얻자는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d2_design.trade_off',
        text: "What's the trade-off?",
        meaning_ko: '대신 잃는 게 뭐예요?',
        note: 'A trade-off is what you give up to get something else.',
        note_ko: 'trade-off는 하나를 얻으려고 포기하는 것입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'pr_d3_one_on_one',
    title: '1:1 with Maya: asking for feedback',
    title_ko: '마야와 1:1: 피드백 구하기',
    place: 'office_manager',
    npc: 'maya',
    day_from: 3,
    day_to: 3,
    time_from: '08:30',
    time_to: '12:30',
    summary: 'In your 1:1, ask Maya for feedback on your roadmap presentation, take it well, ask for an example, and give her some feedback too.',
    summary_ko: '1:1에서 마야에게 로드맵 발표에 대한 피드백을 구하고, 잘 받아들이고, 예를 들어 달라고 하고, 마야에게도 피드백을 주세요.',
    sort: 10,
    tags: 'meeting,manager,feedback',
    calendar: { day: 3, time: '09:00', title: '1:1 with Maya', title_ko: '마야와 1:1' },
    turns: [
      {
        speaker: 'maya',
        situation: "Rain taps on the window of Maya's office. You shake out your umbrella at the door.",
        situation_ko: '마야의 사무실 창문에 빗방울이 떨어집니다. 당신은 문 앞에서 우산을 텁니다.',
        line: 'Come on in. Is it still raining out there?',
        line_ko: '들어와요. 밖에 아직 비 와요?',
        prompt: 'Answer her about the weather this morning.',
        prompt_ko: '오늘 아침 날씨에 대해 대답하세요.',
        model: "It's been on and off all morning. Good thing I brought an umbrella.",
        model_ko: '아침 내내 왔다 갔다 해요. 우산 챙겨 오길 잘했어요.',
        distractors: [
          {
            text: "No, it stopped about an hour ago. I didn't even need my umbrella.",
            text_ko: '아뇨, 한 시간쯤 전에 그쳤어요. 우산 쓸 일도 없었어요.',
            reaction: "Huh. Your umbrella's dripping on my floor, though.",
            reaction_ko: '어라. 그런데 우산에서 물이 뚝뚝 떨어지는데요.'
          },
          {
            text: "Ugh, don't ask. My shoes are soaked and the whole day's ruined.",
            text_ko: '말도 마세요. 신발 다 젖었고 오늘 하루 완전히 망했어요.',
            reaction: "Oh no. Well, let's try to make the rest of it better.",
            reaction_ko: '저런. 그럼 남은 하루는 좀 낫게 만들어 봐요.'
          },
          {
            text: "It's supposed to clear up by the weekend, at least.",
            text_ko: '그래도 주말쯤엔 날이 갠다고 하더라고요, 다행히.',
            reaction: 'Sure, but is it raining right now?',
            reaction_ko: '그렇군요. 그런데 지금은 비가 와요?'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Smart. I left mine in the car, of course.',
        reply_ko: '현명하네요. 저는 당연히 차에 두고 왔어요.'
      },
      {
        speaker: 'maya',
        situation: 'Maya closes her laptop to give you her full attention.',
        situation_ko: '마야가 노트북을 덮고 당신에게 집중합니다.',
        line: "So, what's on your mind?",
        line_ko: '그래서, 무슨 얘기 하고 싶어요?',
        prompt: 'You want to hear what she honestly thought of your roadmap presentation last week.',
        prompt_ko: '지난주 로드맵 발표를 그녀가 솔직히 어떻게 봤는지 듣고 싶습니다.',
        model: "I'd love your feedback on my roadmap presentation from last week.",
        model_ko: '지난주 제 로드맵 발표에 대해 피드백을 듣고 싶어요.',
        distractors: [
          {
            text: "I'd love your thoughts on my budget presentation from yesterday.",
            text_ko: '어제 제 예산 발표에 대해 의견을 듣고 싶어요.',
            reaction: "Yesterday? I don't think I saw a budget presentation.",
            reaction_ko: '어제요? 예산 발표는 못 본 것 같은데요.'
          },
          {
            text: 'I just need you to tell me that my roadmap talk last week was good.',
            text_ko: '지난주 로드맵 발표 잘했다고 한마디만 해 주시면 돼요.',
            reaction: "Well, I'd rather give you something useful than a pat on the back.",
            reaction_ko: '음, 칭찬 한마디보다는 도움이 되는 얘기를 해 주고 싶어요.'
          },
          {
            text: 'Not much, really. The roadmap presentation went fine last week.',
            text_ko: '딱히 없어요. 지난주 로드맵 발표는 무난하게 끝났고요.',
            reaction: 'Oh. Okay. Then is there anything else you wanted to cover?',
            reaction_ko: '아, 그래요. 그럼 다른 얘기할 건 있어요?'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Overall, it was strong. The story was clear. One thing: there were a lot of slides, and you ran out of time for questions.',
        reply_ko: '전체적으로 좋았어요. 흐름이 분명했어요. 한 가지, 슬라이드가 많아서 질문받을 시간이 없었어요.'
      },
      {
        speaker: 'maya',
        situation: 'It stings a little. You are the one who keeps meetings on time.',
        situation_ko: '조금 따끔합니다. 회의 시간을 지키는 사람이 바로 당신이니까요.',
        line: 'Does that sound fair?',
        line_ko: '그 정도면 공정한 평가 같아요?',
        prompt: "It stings, but she has a point. Accept it and say what you'll do differently.",
        prompt_ko: '따끔하지만 맞는 말입니다. 받아들이고 다음엔 무엇을 다르게 할지 말하세요.',
        model: "That's fair. I'll cut it down and leave time for Q&A next time.",
        model_ko: '맞는 말이에요. 다음엔 분량을 줄이고 질의응답 시간을 남길게요.',
        distractors: [
          {
            text: 'Honestly, the slides were fine. People just kept showing up late.',
            text_ko: '솔직히 슬라이드는 괜찮았어요. 사람들이 자꾸 늦게 들어와서 그렇죠.',
            reaction: "Hmm. I'm not sure that's what happened. I was there.",
            reaction_ko: '음. 제가 보기엔 그런 것 같지 않았어요. 저도 거기 있었잖아요.'
          },
          {
            text: "That's fair. I'll add more slides so the story is even clearer.",
            text_ko: '맞는 말이에요. 흐름이 더 분명하게 슬라이드를 더 넣을게요.',
            reaction: "More slides? I'd actually go the other way.",
            reaction_ko: '슬라이드를 더요? 저라면 오히려 반대로 하겠어요.'
          },
          {
            text: "That's fair. I'll skip the Q&A next time so we finish on time.",
            text_ko: '맞는 말이에요. 다음엔 제시간에 끝나게 질의응답을 빼 버릴게요.',
            reaction: 'Skip it? The questions are the part people need most.',
            reaction_ko: '빼요? 사람들한테 제일 필요한 게 질문 시간인데요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Great. Also, try leading with the bottom line.',
        reply_ko: '좋아요. 그리고 결론부터 말해 보세요.'
      },
      {
        speaker: 'maya',
        situation: '"The bottom line"? You want to be sure you understand.',
        situation_ko: '"결론부터"? 정확히 이해하고 싶습니다.',
        line: 'Executives want the ask first, and the details second.',
        line_ko: '임원들은 요청을 먼저 듣고, 세부 사항은 그다음에 듣고 싶어 해요.',
        prompt: "You're not sure what that looks like in practice. Ask her to make it concrete.",
        prompt_ko: '실제로 어떻게 하라는 건지 잘 모르겠습니다. 구체적으로 보여 달라고 하세요.',
        model: 'Could you give me an example of what you mean?',
        model_ko: '무슨 뜻인지 예를 하나 들어 주실 수 있어요?',
        distractors: [
          {
            text: 'Got it. So I should put the details first, then?',
            text_ko: '알겠어요. 그럼 세부 사항을 먼저 말하면 되는 거죠?',
            reaction: 'Other way around. The ask comes first.',
            reaction_ko: '반대예요. 요청이 먼저예요.'
          },
          {
            text: "But I did lead with the bottom line, didn't I?",
            text_ko: '그런데 저 결론부터 말하지 않았어요?',
            reaction: 'Not really. As I remember, you started with the background.',
            reaction_ko: '글쎄요. 제 기억엔 배경 설명부터 시작했어요.'
          },
          {
            text: 'So executives just skip the slides entirely?',
            text_ko: '그럼 임원들은 슬라이드는 아예 안 본다는 거예요?',
            reaction: 'No, they still want the slides. Just after the point.',
            reaction_ko: '아뇨, 슬라이드는 봐요. 핵심 다음에요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Sure. Start with: \"We need two more weeks for checkout, and here's why.\" Then the slides.",
        reply_ko: '그럼요. "결제 기능에 2주가 더 필요합니다. 이유는 이렇습니다."로 시작하고, 슬라이드는 그다음에요.'
      },
      {
        speaker: 'maya',
        situation: 'You write it down. Maya smiles.',
        situation_ko: '당신은 받아 적습니다. 마야가 미소 짓습니다.',
        line: 'Now your turn. Is there anything I could be doing better?',
        line_ko: '이제 프리야 차례예요. 제가 더 잘할 수 있는 게 있을까요?',
        prompt: 'Give her one honest request: you keep finding out about client threads late.',
        prompt_ko: '솔직한 요청을 하나 하세요. 고객과 오가는 메일을 늘 늦게 알게 됩니다.',
        model: 'It would help if you looped me in on client emails earlier.',
        model_ko: '고객 이메일에 저를 좀 더 일찍 넣어 주시면 도움이 될 것 같아요.',
        distractors: [
          {
            text: "No, I think everything's great. I can't think of anything.",
            text_ko: '아뇨, 다 좋은 것 같아요. 딱히 떠오르는 게 없어요.',
            reaction: "Really? Nothing at all? I'd genuinely like to hear it.",
            reaction_ko: '정말요? 하나도요? 진심으로 듣고 싶어서 묻는 건데.'
          },
          {
            text: "Honestly, you keep me in the dark on clients. It's frustrating.",
            text_ko: '솔직히 고객 건은 늘 저만 모르게 하시잖아요. 답답해요.',
            reaction: "Oh. I didn't realize it felt that way. Thanks for telling me.",
            reaction_ko: '아. 그렇게 느끼는 줄 몰랐어요. 말해 줘서 고마워요.'
          },
          {
            text: 'It would help if you sent me fewer emails about the client.',
            text_ko: '고객 관련 메일을 좀 덜 보내 주시면 도움이 될 것 같아요.',
            reaction: "Fewer? I thought you'd want to know more, not less.",
            reaction_ko: '덜요? 더 알고 싶어 할 줄 알았는데요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "That's fair. I'll cc you from now on. Let me know if you have any questions.",
        reply_ko: '맞는 말이에요. 앞으로는 참조로 넣을게요. 궁금한 게 있으면 말해 줘요.'
      }
    ],
    phrases: [
      {
        id: 'pr_d3_one_on_one.bottom_line',
        text: 'Lead with the bottom line.',
        meaning_ko: '결론부터 말하세요.',
        note: 'The bottom line is the main point or result. Busy people want it first.',
        note_ko: 'bottom line은 핵심이나 결론입니다. 바쁜 사람은 그것부터 듣고 싶어 합니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d3_one_on_one.example',
        text: 'Could you give me an example of what you mean?',
        meaning_ko: '무슨 뜻인지 예를 들어 주시겠어요?',
        note: 'Turns general feedback into something you can act on.',
        note_ko: '막연한 피드백을 실행할 수 있는 것으로 바꿔 줍니다.',
        category: 'office'
      },
      {
        id: 'pr_d3_one_on_one.it_would_help',
        text: 'It would help if you looped me in earlier.',
        meaning_ko: '더 일찍 끼워 주시면 도움이 되겠어요.',
        note: '"It would help if …" gives feedback without blaming. "Loop in" = include someone.',
        note_ko: '"It would help if …"는 탓하지 않고 피드백을 주는 표현입니다. loop in은 누군가를 끼워 준다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d3_one_on_one.love_feedback',
        text: "I'd love your feedback on my presentation.",
        meaning_ko: '제 발표에 대해 피드백을 듣고 싶어요.',
        note: 'Asking for feedback shows confidence, not weakness.',
        note_ko: '피드백을 구하는 것은 약점이 아니라 자신감의 표시입니다.',
        category: 'office'
      },
      {
        id: 'pr_d3_one_on_one.on_and_off',
        text: "It's been raining on and off.",
        meaning_ko: '비가 오락가락해요.',
        note: '"On and off" = starting and stopping again and again.',
        note_ko: 'on and off는 되풀이해서 시작했다 멈췄다 한다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_d3_one_on_one.on_your_mind',
        text: "What's on your mind?",
        meaning_ko: '무슨 이야기를 하고 싶어요?',
        note: 'How a manager opens a 1:1. You choose the topic.',
        note_ko: '매니저가 1:1을 여는 말입니다. 주제는 당신이 고릅니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d3_one_on_one.thats_fair',
        text: "That's fair.",
        meaning_ko: '맞는 말이에요.',
        note: 'Accepts criticism calmly. Follow it with what you will change.',
        note_ko: '비판을 차분히 받아들이는 말입니다. 뒤에 무엇을 바꿀지 덧붙이세요.',
        category: 'office'
      }
    ]
  },
  {
    id: 'pr_d3_planning',
    title: 'Facilitating sprint planning',
    title_ko: '스프린트 플래닝 진행하기',
    place: 'office_meeting',
    npc: 'derek',
    day_from: 3,
    day_to: 3,
    time_from: '13:30',
    time_to: '16:30',
    summary: "Lead sprint planning: explain story points to Jun, ask for estimates, find an owner for the vague refund bug, and check the team's capacity.",
    summary_ko: '스프린트 플래닝을 이끄세요. 준에게 스토리 포인트를 설명하고, 추정치를 묻고, 애매한 환불 버그를 맡을 사람을 찾고, 팀의 수용량을 확인하세요.',
    sort: 20,
    tags: 'meeting,planning,agile,facilitation',
    calendar: { day: 3, time: '14:00', title: 'Sprint planning', title_ko: '스프린트 플래닝' },
    turns: [
      {
        speaker: 'derek',
        situation: "Two o'clock. Wet umbrellas are drying in the corner of the meeting room.",
        situation_ko: '두 시입니다. 회의실 구석에서 젖은 우산들이 마르고 있습니다.',
        line: "We're all here. The floor is yours.",
        line_ko: '다 모였어요. 시작하세요.',
        prompt: "Open the meeting and tell everyone how it's going to work.",
        prompt_ko: '회의를 열고 오늘 어떻게 진행할지 모두에게 알려 주세요.',
        model: "Welcome to sprint planning. We'll go through the tickets and estimate each one.",
        model_ko: '스프린트 플래닝에 오신 걸 환영해요. 티켓을 하나씩 보면서 각각 추정할게요.',
        distractors: [
          {
            text: "Welcome to the retro. Let's start with what went well this sprint.",
            text_ko: '회고에 오신 걸 환영해요. 이번 스프린트에서 잘된 점부터 시작하죠.',
            reaction: "Retro's on Friday, Priya. Today's planning.",
            reaction_ko: '회고는 금요일이에요, 프리야. 오늘은 플래닝이고요.'
          },
          {
            text: "Okay, let's be quick. I already estimated everything, so just agree with me.",
            text_ko: '자, 빨리 끝내죠. 추정은 제가 다 해 놨으니 그냥 동의해 주세요.',
            reaction: 'Uh, then why are we all here?',
            reaction_ko: '어, 그럼 우린 왜 모인 거예요?'
          },
          {
            text: 'Thanks for coming, everyone. Any questions before we wrap up?',
            text_ko: '다들 와 줘서 고마워요. 마무리하기 전에 질문 있어요?',
            reaction: "Wrap up? We haven't even started.",
            reaction_ko: '마무리요? 아직 시작도 안 했는데요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Quick question: what does one story point mean for this team?',
        reply_ko: '잠깐 질문인데요, 이 팀에서 스토리 포인트 1은 무슨 뜻이에요?'
      },
      {
        speaker: 'jun',
        situation: "It is Jun's first planning meeting.",
        situation_ko: '준에게는 첫 플래닝 회의입니다.',
        line: "So a point isn't the same as an hour?",
        line_ko: '그러니까 1포인트가 1시간이랑 같은 건 아니에요?',
        prompt: "He's on the right track. Confirm it and explain what a point measures here.",
        prompt_ko: '준이 제대로 짚었습니다. 맞다고 해 주고, 여기서 포인트가 무엇을 재는지 설명하세요.',
        model: "Right. It's about effort and complexity, not hours. A one is tiny, an eight is big.",
        model_ko: '맞아요. 시간이 아니라 노력과 복잡도예요. 1은 아주 작은 거고, 8은 큰 거예요.',
        distractors: [
          {
            text: 'Well, roughly. On this team, one point is about half a day of work.',
            text_ko: '음, 대충은요. 우리 팀에선 1포인트가 반나절 정도 일이에요.',
            reaction: "Half a day? I thought it wasn't about time at all.",
            reaction_ko: '반나절이요? 시간이랑은 상관없는 줄 알았는데요.'
          },
          {
            text: 'Pretty much, yes. One point is one hour, so an eight is a full day.',
            text_ko: '거의 같아요. 1포인트가 1시간이니까 8이면 하루 꼬박이죠.',
            reaction: "Oh. Then why don't we just estimate in hours?",
            reaction_ko: '아. 그럼 그냥 시간으로 추정하면 되잖아요?'
          },
          {
            text: 'Come on, Jun, you really should know this by now. Just look it up after the meeting.',
            text_ko: '준, 이 정도는 알고 있어야죠. 회의 끝나고 따로 찾아보세요.',
            reaction: "Oh. Sorry. I'll look it up.",
            reaction_ko: '아. 죄송해요. 찾아볼게요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'That makes sense. Thanks.',
        reply_ko: '이해됐어요. 고맙습니다.'
      },
      {
        speaker: 'derek',
        situation: 'The first ticket is on the screen: a "save card for later" checkbox at checkout.',
        situation_ko: '첫 티켓이 화면에 떠 있습니다. 결제 화면의 "카드 저장" 체크박스입니다.',
        line: "I'd call that one a three.",
        line_ko: '저는 그거 3이라고 봐요.',
        prompt: "Derek gave his number. Get the new guy's view before you settle on it.",
        prompt_ko: '데릭은 자기 숫자를 말했습니다. 정하기 전에 신입의 생각도 들어 보세요.',
        model: 'Jun, what would you estimate?',
        model_ko: '준, 준은 얼마로 추정해요?',
        distractors: [
          {
            text: 'Great, three it is. Next ticket.',
            text_ko: '좋아요, 3으로 하죠. 다음 티켓.',
            reaction: "Hold on. Shouldn't we hear from Jun, too?",
            reaction_ko: '잠깐만요. 준 얘기도 들어 봐야 하지 않아요?'
          },
          {
            text: 'Derek, what would you estimate?',
            text_ko: '데릭, 얼마로 추정해요?',
            reaction: 'I just said three. Were you listening?',
            reaction_ko: '방금 3이라고 했잖아요. 듣고 있었어요?'
          },
          {
            text: "Jun, you agree it's a three, right?",
            text_ko: '준, 3 맞죠? 동의하죠?',
            reaction: 'Uh... sure, I guess.',
            reaction_ko: '어... 네, 그런 것 같아요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "I'd say a three. The UI is simple, but we need to test it carefully.",
        reply_ko: '3이라고 생각해요. 화면은 단순하지만 꼼꼼히 테스트해야 하니까요.'
      },
      {
        speaker: 'derek',
        situation: 'Three it is. The next ticket comes up.',
        situation_ko: '3으로 정했습니다. 다음 티켓이 뜹니다.',
        line: "Next is the refund bug. The ticket's pretty vague.",
        line_ko: '다음은 환불 버그예요. 티켓 내용이 꽤 모호하네요.',
        prompt: 'Find someone with room in their week to own it.',
        prompt_ko: '이번 주에 여유가 있어서 이 티켓을 맡을 사람을 찾으세요.',
        model: 'Who has the capacity to take this one?',
        model_ko: '이번 주에 이거 맡을 여유 있는 사람 있어요?',
        distractors: [
          {
            text: "Jun, you're taking this one. No arguments.",
            text_ko: '준, 이건 준이 맡아요. 토 달지 말고요.',
            reaction: 'Whoa. Maybe ask him first?',
            reaction_ko: '워. 본인한테 먼저 물어보는 게 어때요?'
          },
          {
            text: "Let's skip it. Nobody likes vague tickets.",
            text_ko: '이건 건너뛰죠. 모호한 티켓은 다들 싫어해요.',
            reaction: "We can't skip it. Customers are hitting this bug.",
            reaction_ko: '건너뛸 순 없어요. 고객들이 이 버그를 겪고 있어요.'
          },
          {
            text: 'Who wrote this ticket? It makes no sense.',
            text_ko: '이 티켓 누가 썼어요? 말이 안 되는데요.',
            reaction: 'Does it matter? Someone still needs to take it.',
            reaction_ko: '그게 중요해요? 어쨌든 누군가는 맡아야죠.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "I can take it, but I'll need more details first.",
        reply_ko: '제가 맡을 수 있어요. 다만 먼저 자세한 내용이 필요해요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun has his pen ready.',
        situation_ko: '준이 펜을 들고 기다립니다.',
        line: "Could you add the customer's steps to the ticket?",
        line_ko: '티켓에 고객이 한 단계들을 추가해 주실 수 있어요?',
        prompt: 'Agree, and promise to have them in before you leave today.',
        prompt_ko: '그러겠다고 하고, 오늘 퇴근 전까지 넣어 두겠다고 약속하세요.',
        model: "Sure. I'll add the steps to reproduce it by end of day.",
        model_ko: '그럼요. 오늘 퇴근 전까지 재현 단계를 넣어 둘게요.',
        distractors: [
          {
            text: "Sure. I'll add the steps sometime next week, I think.",
            text_ko: '그럼요. 다음 주 언젠가 단계를 넣어 둘게요, 아마도.',
            reaction: 'Next week? I was hoping to start on it tomorrow.',
            reaction_ko: '다음 주요? 내일부터 시작하려고 했는데요.'
          },
          {
            text: "Can't you just ask the customer yourself? I'm swamped.",
            text_ko: '고객한테 직접 물어보면 안 돼요? 저 지금 정신없어요.',
            reaction: "Oh. Okay. I just thought you'd have the details.",
            reaction_ko: '아. 네. 프리야가 자세한 걸 알 줄 알았어요.'
          },
          {
            text: "Sure. I'll add the customer's email so you can ask her.",
            text_ko: '그럼요. 고객 이메일을 넣어 둘 테니 직접 물어보세요.',
            reaction: "Hmm. I'd rather have the steps in the ticket, if possible.",
            reaction_ko: '음. 가능하면 티켓에 단계가 들어 있으면 좋겠어요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Perfect. Thank you!',
        reply_ko: '좋아요. 고맙습니다!'
      },
      {
        speaker: 'derek',
        situation: 'Derek adds up the numbers on the whiteboard.',
        situation_ko: '데릭이 화이트보드의 숫자를 더합니다.',
        line: "That's thirty-four points. We usually finish about thirty-five.",
        line_ko: '34포인트네요. 우리는 보통 35 정도 끝내요.',
        prompt: 'The sprint is full. Check whether the team is comfortable with the load.',
        prompt_ko: '스프린트가 꽉 찼습니다. 팀이 이 양을 감당할 만한지 확인하세요.',
        model: "Then we're at capacity. Does anyone feel like this is too much?",
        model_ko: '그럼 수용량이 꽉 찼네요. 혹시 너무 많다고 느끼는 사람 있어요?',
        distractors: [
          {
            text: "Then we still have room. Let's pull in two more tickets.",
            text_ko: '그럼 아직 여유가 있네요. 티켓 두 개 더 넣죠.',
            reaction: "Two more? We've got one point left.",
            reaction_ko: '두 개 더요? 1포인트 남았는데요.'
          },
          {
            text: "Great, then it's settled. Everyone just needs to push a little.",
            text_ko: '좋아요, 그럼 확정이에요. 다들 조금만 더 힘내면 돼요.',
            reaction: "Push a little? That's how people burn out.",
            reaction_ko: '조금만 더 힘내라고요? 그러다 다들 지쳐요.'
          },
          {
            text: "That's way over our usual. Should we drop a ticket or two?",
            text_ko: '평소보다 훨씬 많네요. 그럼 티켓을 한두 개 빼야 할까요?',
            reaction: 'Over? Thirty-four is under thirty-five.',
            reaction_ko: '많다고요? 34는 35보다 적은데요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Looks doable to me. Let's lock it in.",
        reply_ko: '할 만해 보여요. 이대로 확정하죠.'
      }
    ],
    phrases: [
      {
        id: 'pr_d3_planning.capacity',
        text: 'Who has the capacity to take this one?',
        meaning_ko: '누가 이걸 맡을 여력이 있어요?',
        note: 'Capacity = how much work a person or team can take on.',
        note_ko: 'capacity는 사람이나 팀이 맡을 수 있는 일의 양입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d3_planning.effort_not_hours',
        text: "It's about effort and complexity, not hours.",
        meaning_ko: '시간이 아니라 노력과 복잡도를 뜻해요.',
        note: 'How most teams explain story points.',
        note_ko: '대부분의 팀이 스토리 포인트를 설명하는 방식입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d3_planning.end_of_day',
        text: 'by end of day',
        meaning_ko: '오늘 퇴근 전까지',
        note: 'Often written EOD. It means before you leave work today.',
        note_ko: 'EOD로 자주 줄여 씁니다. 오늘 퇴근하기 전까지라는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d3_planning.floor_is_yours',
        text: 'The floor is yours.',
        meaning_ko: '이제 말씀하세요. / 진행하세요.',
        note: 'Said to hand the meeting to the next speaker.',
        note_ko: '다음 발언자에게 회의를 넘길 때 하는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d3_planning.go_through',
        text: "We'll go through the tickets and estimate each one.",
        meaning_ko: '티켓을 하나씩 보면서 추정할게요.',
        note: '"Go through" = look at the items of a list one by one.',
        note_ko: 'go through는 목록의 항목을 하나씩 살펴본다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d3_planning.lock_it_in',
        text: "Let's lock it in.",
        meaning_ko: '이대로 확정합시다.',
        note: 'To make a plan final.',
        note_ko: '계획을 최종 확정한다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d3_planning.what_estimate',
        text: 'What would you estimate?',
        meaning_ko: '얼마로 추정해요?',
        note: 'Ask people by name, so the quiet ones speak too.',
        note_ko: '이름을 불러 물으면 조용한 사람도 말하게 됩니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'pr_d4_scope',
    title: 'The refund bug: what to cut',
    title_ko: '환불 버그: 무엇을 뺄 것인가',
    place: 'office_desk_team',
    npc: 'derek',
    day_from: 4,
    day_to: 4,
    time_from: '11:00',
    time_to: '16:00',
    summary: 'Jun has flagged that the refund bug will not be done by Friday. Negotiate with Derek: what ships on Friday, what moves, and the new date.',
    summary_ko: '준이 환불 버그가 금요일까지 안 끝난다고 알렸습니다. 데릭과 협상하세요. 금요일에 무엇을 내보내고, 무엇을 미루고, 새 날짜는 언제인지.',
    sort: 10,
    tags: 'meeting,negotiation,planning',
    calendar: { day: 4, time: '13:00', title: 'Refund bug: scope and dates with Derek', title_ko: '환불 버그: 데릭과 범위·날짜 조정' },
    turns: [
      {
        speaker: 'derek',
        situation: 'A gray, cool morning. Jun has just told you the refund bug is taking longer than he expected.',
        situation_ko: '흐리고 선선한 아침입니다. 준이 방금 환불 버그가 예상보다 오래 걸린다고 알려 왔습니다.',
        line: "Hey. I heard about the refund bug. Jun's deep in the legacy code, huh?",
        line_ko: '안녕하세요. 환불 버그 얘기 들었어요. 준이 레거시 코드에 푹 빠져 있죠?',
        prompt: "Give Jun credit for raising it in time, then get Derek's take.",
        prompt_ko: '준이 제때 알려 준 걸 인정해 주고, 데릭은 어떻게 보는지 물어보세요.',
        model: "Yeah. He flagged it early, which I appreciate. What's your read on it?",
        model_ko: '네. 일찍 알려 줘서 고마웠어요. 데릭은 어떻게 봐요?',
        distractors: [
          {
            text: "Yeah. He should've seen this coming, though. Why didn't he ask for help sooner?",
            text_ko: '네. 그래도 예상은 했어야죠. 왜 도와 달라고 안 했대요?',
            reaction: "Easy. It's legacy code nobody's touched in years.",
            reaction_ko: '살살 해요. 몇 년 동안 아무도 안 건드린 레거시 코드예요.'
          },
          {
            text: "Yeah. Can you take it over? He's clearly in over his head.",
            text_ko: '네. 데릭이 넘겨받으면 안 돼요? 준한테는 확실히 벅차 보여요.',
            reaction: "Whoa, not so fast. He's doing fine. It's just messy code.",
            reaction_ko: '워, 너무 앞서가지 마요. 준은 잘하고 있어요. 코드가 엉망일 뿐이에요.'
          },
          {
            text: "Yeah. Honestly, I think it's a one-line fix. Let's not worry.",
            text_ko: '네. 솔직히 한 줄만 고치면 될 것 같아요. 걱정 말죠.',
            reaction: "One line? I wish. It's bigger than that.",
            reaction_ko: '한 줄이요? 그러면 좋겠네요. 그보다 커요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "It's two bugs, really. Card refunds and gift card refunds. No tests on either one.",
        reply_ko: '사실은 버그가 두 개예요. 카드 환불과 기프트 카드 환불. 둘 다 테스트가 없어요.'
      },
      {
        speaker: 'derek',
        situation: 'Two bugs, not one. You need a date.',
        situation_ko: '버그가 하나가 아니라 둘입니다. 날짜가 필요합니다.',
        line: "So it's more work than the ticket says.",
        line_ko: '그러니까 티켓에 적힌 것보다 일이 많아요.',
        prompt: 'You need a date. Find out how long the whole thing would take.',
        prompt_ko: '날짜가 필요합니다. 전부 고치려면 얼마나 걸리는지 알아보세요.',
        model: "What's the ETA if we fix both?",
        model_ko: '둘 다 고치면 언제쯤 끝나요?',
        distractors: [
          {
            text: 'Can we have both done by Friday?',
            text_ko: '둘 다 금요일까지 끝낼 수 있죠?',
            reaction: 'Friday? Not a chance. Not both.',
            reaction_ko: '금요일이요? 절대 안 돼요. 둘 다는요.'
          },
          {
            text: "What's the ETA on the card fix alone?",
            text_ko: '카드 환불만 고치면 언제 끝나요?',
            reaction: "Just the card one? Let's start with the full picture.",
            reaction_ko: '카드 쪽만요? 일단 전체 그림부터 보죠.'
          },
          {
            text: "Why weren't there any tests on these?",
            text_ko: '왜 둘 다 테스트가 하나도 없었어요?',
            reaction: 'Ancient history. Do you want a date or not?',
            reaction_ko: '그건 옛날 얘기고요. 날짜 필요한 거 아니에요?'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Both? End of next week, realistically.',
        reply_ko: '둘 다요? 현실적으로 다음 주 말이에요.'
      },
      {
        speaker: 'derek',
        situation: 'The client demo is on Monday. End of next week is too late.',
        situation_ko: '고객 데모는 월요일입니다. 다음 주 말은 너무 늦습니다.',
        line: "I know that's not what you wanted to hear.",
        line_ko: '듣고 싶은 대답이 아니라는 건 알아요.',
        prompt: "That's too late for the client. Find out how to get just the card part out this week.",
        prompt_ko: '고객 일정에는 너무 늦습니다. 카드 쪽만이라도 이번 주에 내보낼 방법을 알아보세요.',
        model: 'The client demo is on Monday. What would it take to ship the card fix by Friday?',
        model_ko: '고객 데모가 월요일이에요. 카드 수정을 금요일까지 내보내려면 뭐가 필요해요?',
        distractors: [
          {
            text: 'The client demo is on Friday. What would it take to ship both fixes by then?',
            text_ko: '고객 데모가 금요일이에요. 그때까지 둘 다 내보내려면 뭐가 필요해요?',
            reaction: 'Friday? I thought the demo was Monday.',
            reaction_ko: '금요일이요? 데모는 월요일인 줄 알았는데요.'
          },
          {
            text: "That doesn't work for me. You and Jun will just have to get both done by Friday.",
            text_ko: '그건 안 돼요. 데릭이랑 준이 어떻게든 금요일까지 둘 다 끝내 줘야 해요.',
            reaction: "That's not how this works, Priya. Both won't fit.",
            reaction_ko: '그렇게는 안 돼요, 프리야. 둘 다는 못 들어가요.'
          },
          {
            text: "Okay, end of next week, then. I'll tell the client the demo has to wait.",
            text_ko: '알겠어요, 그럼 다음 주 말로 하죠. 고객한테 데모는 미루자고 할게요.',
            reaction: "Push the demo? That's a big ask for the client.",
            reaction_ko: '데모를 미뤄요? 고객한테 그건 큰 부탁인데요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "If I pair with Jun and we leave the gift cards for later, Friday's doable.",
        reply_ko: '제가 준과 같이 작업하고 기프트 카드를 뒤로 미루면 금요일은 가능해요.'
      },
      {
        speaker: 'derek',
        situation: 'That is a plan you can take to the client.',
        situation_ko: '고객에게 가져갈 수 있는 계획입니다.',
        line: 'But the gift card part needs a new date.',
        line_ko: '그런데 기프트 카드 쪽은 새 날짜가 필요해요.',
        prompt: "Offer a plan with a new date for the gift cards, next Wednesday, and make sure he's on board.",
        prompt_ko: '기프트 카드에 새 날짜(다음 주 수요일)를 넣은 계획을 내놓고, 데릭이 동의하는지 확인하세요.',
        model: "Let's do card refunds on Friday and gift cards by next Wednesday. Does that work for you?",
        model_ko: '카드 환불은 금요일, 기프트 카드는 다음 주 수요일까지로 하죠. 괜찮아요?',
        distractors: [
          {
            text: "Let's do card refunds on Friday and gift cards by this Monday. Does that work?",
            text_ko: '카드 환불은 금요일, 기프트 카드는 이번 월요일까지로 하죠. 괜찮아요?',
            reaction: "By Monday? That's three days away, with a weekend in between.",
            reaction_ko: '월요일까지요? 주말 끼고 사흘 남았는데요.'
          },
          {
            text: "Card refunds Friday, gift cards next Wednesday. I'm telling the client, so make it happen.",
            text_ko: '카드 환불은 금요일, 기프트 카드는 다음 주 수요일. 고객한테 그렇게 말할 테니 꼭 맞춰요.',
            reaction: 'Whoa. Maybe ask me before you promise it to anyone?',
            reaction_ko: '워. 누구한테 약속하기 전에 저한테 먼저 물어봐 줄래요?'
          },
          {
            text: "Let's do gift cards on Friday and card refunds by next Wednesday. Does that work for you?",
            text_ko: '기프트 카드는 금요일, 카드 환불은 다음 주 수요일까지로 하죠. 괜찮아요?',
            reaction: "Other way around. The card fix is the one that's close.",
            reaction_ko: '반대예요. 거의 다 된 건 카드 쪽이에요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Wednesday works. But then I have to drop the search filter ticket.',
        reply_ko: '수요일 괜찮아요. 그런데 그러려면 검색 필터 티켓은 내려놓아야 해요.'
      },
      {
        speaker: 'derek',
        situation: 'Something has to give. You decide quickly.',
        situation_ko: '무언가는 포기해야 합니다. 당신은 빠르게 결정합니다.',
        line: 'Are you okay with that?',
        line_ko: '그래도 괜찮겠어요?',
        prompt: "Accept the trade-off. Say where that ticket goes and who you'll tell.",
        prompt_ko: '맞바꿈을 받아들이세요. 그 티켓을 어디로 옮기고 누구에게 알릴지 말하세요.',
        model: "That's fine. I'll move it to the next sprint and let the client know.",
        model_ko: '괜찮아요. 그건 다음 스프린트로 옮기고 고객한테 알릴게요.',
        distractors: [
          {
            text: "Hmm, can't you squeeze it in over the weekend? The client wants it.",
            text_ko: '음, 주말에 어떻게 끼워 넣을 수 없어요? 고객이 원하는 건데.',
            reaction: "The weekend? No. I'm not doing that to Jun or to me.",
            reaction_ko: '주말이요? 안 돼요. 준한테도 저한테도 그렇게는 못 해요.'
          },
          {
            text: "That's fine. We'll just quietly drop it. The client won't notice.",
            text_ko: '괜찮아요. 그냥 조용히 빼죠. 고객은 눈치 못 챌 거예요.',
            reaction: 'Quietly? That usually comes back to bite you.',
            reaction_ko: '조용히요? 그러면 꼭 나중에 탈이 나요.'
          },
          {
            text: "That's fine. I'll move the refund bug to the next sprint instead, then.",
            text_ko: '괜찮아요. 그럼 대신 환불 버그를 다음 스프린트로 옮길게요.',
            reaction: 'The refund bug? No, I meant the search filter.',
            reaction_ko: '환불 버그요? 아뇨, 검색 필터 말한 거예요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Thanks for not asking for everything at once. I'll grab Jun.",
        reply_ko: '한꺼번에 다 해 달라고 하지 않아서 고마워요. 준을 데려올게요.'
      }
    ],
    phrases: [
      {
        id: 'pr_d4_scope.doable',
        text: "Friday's doable.",
        meaning_ko: '금요일은 가능해요.',
        note: 'Doable = possible with effort.',
        note_ko: 'doable은 노력하면 할 수 있다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d4_scope.does_that_work',
        text: 'Does that work for you?',
        meaning_ko: '그렇게 하면 괜찮아요?',
        note: 'Checks agreement after a proposal. Never skip it.',
        note_ko: '제안한 뒤 동의를 확인하는 말입니다. 빼먹지 마세요.',
        category: 'meeting'
      },
      {
        id: 'pr_d4_scope.drop',
        text: 'I have to drop the search filter ticket.',
        meaning_ko: '검색 필터 티켓은 내려놓아야 해요.',
        note: '"Drop" = stop working on something to make room.',
        note_ko: 'drop은 여유를 만들려고 하던 일을 내려놓는다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'pr_d4_scope.eta',
        text: "What's the ETA?",
        meaning_ko: '언제쯤 끝나요?',
        note: 'ETA = estimated time of arrival. At work: when will it be done?',
        note_ko: 'ETA는 estimated time of arrival의 약자입니다. 직장에서는 언제 끝나는지를 뜻합니다.',
        category: 'office'
      },
      {
        id: 'pr_d4_scope.flagged',
        text: 'He flagged it early.',
        meaning_ko: '그가 일찍 알려 줬어요.',
        note: '"Flag" = point out a problem so people notice. Flagging early is praised.',
        note_ko: 'flag는 문제를 알아차리도록 알린다는 뜻입니다. 일찍 알리면 칭찬받습니다.',
        category: 'office'
      },
      {
        id: 'pr_d4_scope.what_would_it_take',
        text: 'What would it take to ship the card fix by Friday?',
        meaning_ko: '카드 환불 수정을 금요일까지 내보내려면 뭐가 필요해요?',
        note: 'Opens a negotiation. It asks for conditions, not for a yes or no.',
        note_ko: '협상을 여는 말입니다. 예, 아니오가 아니라 조건을 묻습니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d4_scope.your_read',
        text: "What's your read on it?",
        meaning_ko: '상황을 어떻게 보세요?',
        note: "Asks for someone's judgment of a situation.",
        note_ko: '상황에 대한 상대의 판단을 묻는 말입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'pr_d4_client',
    title: 'Setting expectations with the client',
    title_ko: '고객의 기대치 조율하기',
    place: 'office_meeting',
    npc: 'greg',
    day_from: 4,
    day_to: 4,
    time_from: '13:00',
    time_to: '18:00',
    requires: 'pr_d4_scope',
    summary: 'Call Greg Whitfield at Summit Retail. Give him the bottom line, explain what slips and what does not, and do not overpromise.',
    summary_ko: '서밋 리테일의 그렉 휫필드에게 전화하세요. 결론부터 말하고, 무엇이 늦어지고 무엇은 그대로인지 설명하되, 지키지 못할 약속은 하지 마세요.',
    sort: 20,
    tags: 'phone,client,meeting,negotiation',
    calendar: { day: 4, time: '15:00', title: 'Call Greg at Summit Retail', title_ko: '서밋 리테일의 그렉에게 전화' },
    turns: [
      {
        speaker: 'greg',
        situation: "The meeting room is empty. You dial Greg's number on the speakerphone Tom tested on Monday.",
        situation_ko: '회의실이 비어 있습니다. 톰이 월요일에 점검해 둔 스피커폰으로 그렉의 번호를 누릅니다.',
        line: 'Greg Whitfield.',
        line_ko: '그렉 휘트필드입니다.',
        prompt: 'Introduce yourself properly and check that he can talk.',
        prompt_ko: '제대로 자신을 소개하고, 지금 통화할 수 있는지 확인하세요.',
        model: "Hi, Greg. It's Priya Nair from Seaside Labs. Is now a good time?",
        model_ko: '안녕하세요, 그렉. 시사이드 랩스의 프리야 나이르입니다. 지금 통화 괜찮으세요?',
        distractors: [
          {
            text: "Hi, Greg. It's Priya Nair from Summit Retail. Is now a good time?",
            text_ko: '안녕하세요, 그렉. 서밋 리테일의 프리야 나이르입니다. 지금 통화 괜찮으세요?',
            reaction: "Summit Retail? That's us. Who is this?",
            reaction_ko: '서밋 리테일이요? 그건 우리 회사인데요. 누구십니까?'
          },
          {
            text: 'Hey, Greg, Priya here. Got a sec? Got some news. Kind of a bummer.',
            text_ko: '안녕, 그렉, 프리야예요. 잠깐 돼요? 소식이 있는데 좀 별로예요.',
            reaction: 'A bummer? Okay. Who is this, exactly?',
            reaction_ko: '별로라고요? 네. 그런데 정확히 누구십니까?'
          },
          {
            text: "Hi, Greg. It's Priya. So, we've got a problem with the refunds.",
            text_ko: '안녕하세요, 그렉. 프리야예요. 그게, 환불 쪽에 문제가 생겼어요.',
            reaction: 'Priya who? Hold on. Which company?',
            reaction_ko: '프리야 누구요? 잠깐만요. 어느 회사입니까?'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "I've got five minutes. What's the bottom line?",
        reply_ko: '5분 있습니다. 결론이 뭡니까?'
      },
      {
        speaker: 'greg',
        situation: 'Maya told you yesterday: lead with the bottom line.',
        situation_ko: '어제 마야가 말했습니다. 결론부터 말하라고.',
        line: 'Go ahead.',
        line_ko: '말씀하세요.',
        prompt: 'Get straight to it: when the card refund fix and the gift card refunds will each be ready.',
        prompt_ko: '바로 본론으로 가세요. 카드 환불 수정과 기프트 카드 환불이 각각 언제 준비되는지요.',
        model: 'I want to set expectations. The card refund fix ships Friday, but gift card refunds will slip to Wednesday.',
        model_ko: '미리 기대치를 맞춰 두고 싶습니다. 카드 환불 수정은 금요일에 나가지만, 기프트 카드 환불은 수요일로 밀립니다.',
        distractors: [
          {
            text: 'I want to set expectations. Gift card refunds ship Friday, but the card refund fix will slip to Wednesday.',
            text_ko: '미리 기대치를 맞춰 두고 싶습니다. 기프트 카드 환불은 금요일에 나가지만, 카드 환불 수정은 수요일로 밀립니다.',
            reaction: "Hold on. The card fix is what slips? That's the one I care about.",
            reaction_ko: '잠깐만요. 밀리는 게 카드 수정입니까? 제가 신경 쓰는 게 그건데요.'
          },
          {
            text: 'So, a little background first. The refund code is quite old, the ticket was vague, and we found that...',
            text_ko: '그게, 배경부터 말씀드릴게요. 환불 코드가 꽤 오래됐고 티켓도 모호했는데, 알고 보니...',
            reaction: 'Priya, I have five minutes. Bottom line, please.',
            reaction_ko: '프리야, 저 5분밖에 없습니다. 결론만 말해 주세요.'
          },
          {
            text: "Bad news, I'm afraid. Our new developer underestimated the refund bug, so gift cards will be late.",
            text_ko: '안 좋은 소식입니다. 저희 신입 개발자가 환불 버그를 얕봐서 기프트 카드가 늦어지게 됐습니다.',
            reaction: "I don't need to know whose fault it is. When do I get it?",
            reaction_ko: '누구 잘못인지는 알 필요 없습니다. 언제 받을 수 있습니까?'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Slip? Why am I only hearing about this now?',
        reply_ko: '밀린다고요? 왜 이제야 그 얘기를 듣는 겁니까?'
      },
      {
        speaker: 'greg',
        situation: 'He does not sound happy. You stay calm.',
        situation_ko: '그렉의 목소리가 좋지 않습니다. 당신은 침착함을 잃지 않습니다.',
        line: 'Well?',
        line_ko: '그래서요?',
        prompt: "Stay calm. Tell him when the problem came up and why you're calling him now.",
        prompt_ko: '침착하게, 문제가 언제 드러났는지, 왜 지금 전화했는지 말하세요.',
        model: 'We found the issue this morning, and I wanted you to hear it from me right away.',
        model_ko: '오늘 아침에 문제를 발견했고, 다른 데서 듣기 전에 제가 직접 바로 말씀드리고 싶었습니다.',
        distractors: [
          {
            text: 'We actually found the issue last week, and I wanted to be sure before I called you.',
            text_ko: '사실 문제는 지난주에 발견했는데, 확실해진 다음에 전화드리고 싶었습니다.',
            reaction: "Last week? And I'm only hearing about it now?",
            reaction_ko: '지난주요? 그런데 이제야 저한테 말하는 겁니까?'
          },
          {
            text: "Honestly, the original ticket was vague. It's not really on our side.",
            text_ko: '솔직히 원래 티켓이 모호했습니다. 저희 쪽 문제라고 보긴 어렵습니다.',
            reaction: "Not on your side? It's your code, isn't it?",
            reaction_ko: '그쪽 문제가 아니라고요? 그쪽 코드 아닙니까?'
          },
          {
            text: "Things slip sometimes, Greg. That's software. It's only a few days.",
            text_ko: '일정은 원래 좀 밀리기도 해요, 그렉. 소프트웨어가 그렇죠. 며칠뿐이에요.',
            reaction: 'A few days matter to me, Priya. My boss is asking.',
            reaction_ko: '저한텐 며칠도 중요합니다, 프리야. 제 상사가 묻고 있어요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "All right. I appreciate that. Does this affect Monday's demo?",
        reply_ko: '알겠습니다. 그건 고맙군요. 월요일 데모에 영향이 있습니까?'
      },
      {
        speaker: 'greg',
        situation: 'This is the question that matters most to him.',
        situation_ko: '그렉에게 가장 중요한 질문입니다.',
        line: 'I have my whole team coming on Monday.',
        line_ko: '월요일에 우리 팀 전체가 옵니다.',
        prompt: 'Put his mind at ease about Monday, and tell him why.',
        prompt_ko: '월요일 걱정은 덜어 드리고, 그 이유를 말하세요.',
        model: "No, the demo is not affected. Gift card refunds aren't part of it.",
        model_ko: '아뇨, 데모에는 영향이 없습니다. 기프트 카드 환불은 데모에 들어 있지 않거든요.',
        distractors: [
          {
            text: "No, the demo's fine. Card refunds aren't part of it, so we're safe.",
            text_ko: '아뇨, 데모는 괜찮습니다. 카드 환불은 데모에 없으니 문제없어요.',
            reaction: 'Card refunds? I thought those were shipping Friday.',
            reaction_ko: '카드 환불이요? 그건 금요일에 나간다고 하지 않았습니까?'
          },
          {
            text: "I don't think so, but honestly, I'd have to check with the team.",
            text_ko: '아닐 거예요. 그런데 솔직히 팀에 확인해 봐야 알 것 같습니다.',
            reaction: "You don't know? My whole team is coming Monday.",
            reaction_ko: '모르신다고요? 월요일에 우리 팀 전체가 온다니까요.'
          },
          {
            text: "A little. We'll have to skip the refund part on Monday, sorry.",
            text_ko: '조금요. 월요일엔 환불 부분은 빼야 할 것 같아요. 죄송합니다.',
            reaction: 'Skip it? Then what exactly am I showing my team?',
            reaction_ko: '뺀다고요? 그럼 우리 팀한테 대체 뭘 보여 줍니까?'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Good. Can you guarantee Wednesday?',
        reply_ko: '좋습니다. 수요일은 확실히 보장할 수 있습니까?'
      },
      {
        speaker: 'greg',
        situation: 'A guarantee is a big word. Greg likes honest answers.',
        situation_ko: '보장은 무거운 말입니다. 그렉은 솔직한 답을 좋아합니다.',
        line: 'I need something I can tell my boss.',
        line_ko: '제 상사한테 전할 말이 필요합니다.',
        prompt: 'Be honest: no guarantee, but you believe in the date. Offer to check in with him the day before.',
        prompt_ko: '솔직하게 말하세요. 보장은 못 해도 그 날짜에 자신은 있다고요. 하루 전에 상황을 알려 주겠다고 하세요.',
        model: "I don't want to overpromise. I'm confident in Wednesday, and I'll send you an update on Tuesday.",
        model_ko: '지키지 못할 약속은 드리고 싶지 않습니다. 수요일은 자신 있고, 화요일에 진행 상황을 보내 드리겠습니다.',
        distractors: [
          {
            text: "Absolutely. I guarantee Wednesday. You can tell your boss it's a done deal.",
            text_ko: '물론입니다. 수요일은 제가 보장합니다. 상사분께 확정이라고 전하셔도 됩니다.',
            reaction: "A done deal? All right. I'll hold you to that, Priya.",
            reaction_ko: '확정이라고요? 좋습니다. 그 말 꼭 기억하겠습니다, 프리야.'
          },
          {
            text: "I don't want to overpromise. I'm confident in Friday, and I'll send you an update on Thursday.",
            text_ko: '지키지 못할 약속은 드리고 싶지 않습니다. 금요일은 자신 있고, 목요일에 진행 상황을 보내 드리겠습니다.',
            reaction: 'Friday? I thought you said Wednesday.',
            reaction_ko: '금요일이요? 수요일이라고 하지 않았습니까?'
          },
          {
            text: "Honestly, I can't promise anything. It depends on what the team finds next week.",
            text_ko: '솔직히 아무것도 약속드릴 수 없습니다. 다음 주에 팀이 뭘 찾아내느냐에 달렸어요.',
            reaction: "That's not something I can take to my boss.",
            reaction_ko: '그걸로는 제 상사한테 아무 말도 못 합니다.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Fair enough. I like a straight answer. Talk to you Monday, Priya.',
        reply_ko: '좋습니다. 솔직한 답이 마음에 드네요. 월요일에 봅시다, 프리야.'
      }
    ],
    phrases: [
      {
        id: 'pr_d4_client.bottom_line',
        text: "What's the bottom line?",
        meaning_ko: '결론이 뭡니까?',
        note: "A busy person's way of asking for the main point first.",
        note_ko: '바쁜 사람이 핵심부터 말해 달라고 하는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d4_client.good_time',
        text: 'Is now a good time?',
        meaning_ko: '지금 통화 괜찮으세요?',
        note: 'Polite on any phone call, and a must with a busy client.',
        note_ko: '어떤 전화에서든 예의 바른 말이고, 바쁜 고객에게는 꼭 필요합니다.',
        category: 'office'
      },
      {
        id: 'pr_d4_client.hear_it_from_me',
        text: 'I wanted you to hear it from me.',
        meaning_ko: '제가 직접 말씀드리고 싶었습니다.',
        note: 'Bad news is best delivered early and in person.',
        note_ko: '나쁜 소식은 일찍, 직접 전하는 것이 가장 좋습니다.',
        category: 'office'
      },
      {
        id: 'pr_d4_client.not_affected',
        text: 'The demo is not affected.',
        meaning_ko: '데모에는 영향이 없습니다.',
        note: 'Tells the client what stays the same. As important as what changes.',
        note_ko: '고객에게 바뀌지 않는 것을 알려 줍니다. 바뀌는 것만큼 중요합니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d4_client.overpromise',
        text: "I don't want to overpromise.",
        meaning_ko: '지키지 못할 약속은 하고 싶지 않습니다.',
        note: 'The rule is "underpromise and overdeliver".',
        note_ko: '적게 약속하고 더 많이 해내라(underpromise and overdeliver)는 원칙이 있습니다.',
        category: 'office'
      },
      {
        id: 'pr_d4_client.send_update',
        text: "I'll send you an update on Tuesday.",
        meaning_ko: '화요일에 진행 상황을 보내 드리겠습니다.',
        note: 'Always end with the next time they will hear from you.',
        note_ko: '언제 다시 연락할지 말하며 끝내세요.',
        category: 'office'
      },
      {
        id: 'pr_d4_client.set_expectations',
        text: 'I want to set expectations.',
        meaning_ko: '기대치를 맞춰 두고 싶습니다.',
        note: 'Tells people honestly what they will and will not get, before they are surprised.',
        note_ko: '상대가 놀라기 전에 무엇을 받고 무엇을 못 받는지 솔직히 알려 주는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d4_client.slip',
        text: 'Gift card refunds will slip to Wednesday.',
        meaning_ko: '기프트 카드 환불은 수요일로 밀립니다.',
        note: '"Slip" = be delayed. Softer than "We will be late."',
        note_ko: 'slip은 늦어진다는 뜻입니다. "We will be late."보다 부드럽습니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'pr_d5_demo',
    title: 'Running the demo and the retro',
    title_ko: '데모와 회고 진행하기',
    place: 'office_meeting',
    npc: 'derek',
    day_from: 5,
    day_to: 5,
    time_from: '10:15',
    time_to: '14:00',
    summary: 'Run the sprint demo and the retrospective: invite Jun to present, park a side topic, ask what went well, take feedback, and recap the action items.',
    summary_ko: '스프린트 데모와 회고를 진행하세요. 준에게 발표를 청하고, 옆길 이야기는 잠시 미뤄 두고, 잘된 점을 묻고, 피드백을 받아들이고, 액션 아이템을 정리하세요.',
    sort: 10,
    tags: 'meeting,demo,retro,facilitation',
    calendar: { day: 5, time: '11:00', title: 'Sprint demo and retro', title_ko: '스프린트 데모와 회고' },
    turns: [
      {
        speaker: 'derek',
        situation: "Friday, eleven o'clock. The sun is out and the card fix shipped this morning.",
        situation_ko: '금요일 열한 시입니다. 해가 났고, 카드 환불 수정은 오늘 아침에 배포됐습니다.',
        line: "Everybody's here, and the projector actually works today.",
        line_ko: '다 왔어요. 오늘은 프로젝터도 제대로 되네요.',
        prompt: 'Kick off the demo and hand it to Jun first, with his card fix.',
        prompt_ko: '데모를 시작하고, 첫 순서로 준에게 카드 수정을 보여 달라고 넘기세요.',
        model: "Okay, demo time! Jun, you're up first. Want to show us the card payment fix?",
        model_ko: '좋아요, 데모 시간이에요! 준, 첫 순서예요. 카드 결제 수정 보여 줄래요?',
        distractors: [
          {
            text: "Okay, demo time! Jun, you're up first. Want to show us the gift card fix?",
            text_ko: '좋아요, 데모 시간이에요! 준, 첫 순서예요. 기프트 카드 수정 보여 줄래요?',
            reaction: "Gift cards? Those aren't done until Wednesday.",
            reaction_ko: '기프트 카드요? 그건 수요일에야 끝나요.'
          },
          {
            text: "Okay, retro time! Let's start with what went well this week. Jun?",
            text_ko: '좋아요, 회고 시간이에요! 이번 주에 잘된 점부터 시작하죠. 준?',
            reaction: 'Retro already? I thought we were doing the demo first.',
            reaction_ko: '벌써 회고요? 데모부터 하는 줄 알았는데요.'
          },
          {
            text: "Okay, demo time! Derek, why don't you show Jun's fix for him? It'll be faster.",
            text_ko: '좋아요, 데모 시간이에요! 데릭, 준이 고친 거 데릭이 대신 보여 줘요. 그게 빨라요.',
            reaction: "Me? It's his work. Let him show it.",
            reaction_ko: '제가요? 준이 한 일이잖아요. 준이 보여 주게 해요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Sure. Let me share my screen.',
        reply_ko: '네. 화면을 공유할게요.'
      },
      {
        speaker: 'jun',
        situation: "Jun's screen appears on the wall.",
        situation_ko: '준의 화면이 벽에 뜹니다.',
        line: 'Can everyone see it?',
        line_ko: '다들 보여요?',
        prompt: "Confirm it's showing, and ask him to take you through the changes step by step.",
        prompt_ko: '화면이 보인다고 하고, 바뀐 점을 하나씩 설명해 달라고 하세요.',
        model: 'We can see it. Go ahead and walk us through what changed.',
        model_ko: '잘 보여요. 뭐가 바뀌었는지 차근차근 설명해 줘요.',
        distractors: [
          {
            text: "Not yet, it's still loading. Can you share it again?",
            text_ko: '아직요, 로딩 중이에요. 다시 공유해 줄래요?',
            reaction: "Really? It's up on the wall for me.",
            reaction_ko: '그래요? 제 쪽에선 벽에 떠 있는데요.'
          },
          {
            text: 'We can see it. Can you show us the gift card refunds too?',
            text_ko: '잘 보여요. 기프트 카드 환불도 같이 보여 줄래요?',
            reaction: "Gift cards aren't done yet. That's next Wednesday.",
            reaction_ko: '기프트 카드는 아직이에요. 다음 주 수요일이요.'
          },
          {
            text: 'We can see it. Go ahead and show us the code line by line.',
            text_ko: '잘 보여요. 코드를 한 줄씩 보여 주면서 설명해 줘요.',
            reaction: 'Line by line? I was going to show how it works for users.',
            reaction_ko: '한 줄씩요? 사용자 입장에서 어떻게 되는지 보여 드리려고 했는데요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Now, if a payment fails, the user sees a clear error message, and we retry once automatically.',
        reply_ko: '이제 결제가 실패하면 사용자에게 분명한 오류 메시지가 보이고, 자동으로 한 번 다시 시도합니다.'
      },
      {
        speaker: 'derek',
        situation: 'Everyone claps. Derek raises a finger. You look at the clock: ten minutes left.',
        situation_ko: '모두 박수를 칩니다. 데릭이 손가락을 듭니다. 시계를 보니 10분 남았습니다.',
        line: 'That reminds me: we should rethink the whole retry library.',
        line_ko: '그러고 보니, 재시도 라이브러리 전체를 다시 생각해 봐야 해요.',
        prompt: 'Good idea, wrong time. Set it aside for now and say why.',
        prompt_ko: '좋은 생각이지만 지금은 때가 아닙니다. 일단 미뤄 두자고 하고 이유를 말하세요.',
        model: 'Can we park that? We have ten minutes left, and I want to get to the retro.',
        model_ko: '그건 잠깐 미뤄 둘까요? 10분 남았고, 회고로 넘어가고 싶어요.',
        distractors: [
          {
            text: "Can we save that? We've got two minutes left, and I want to get to the retro.",
            text_ko: '그건 나중에 할까요? 2분 남았고, 회고로 넘어가고 싶어요.',
            reaction: 'Two? The clock says ten.',
            reaction_ko: '2분이요? 시계는 10분 남았다는데요.'
          },
          {
            text: 'Derek, not now. Nobody wants to hear about the retry library.',
            text_ko: '데릭, 지금은 아니에요. 재시도 라이브러리 얘기 듣고 싶은 사람 없어요.',
            reaction: 'Okay... noted. Pretty sure some people do.',
            reaction_ko: '네... 알겠어요. 듣고 싶은 사람도 있을 텐데요.'
          },
          {
            text: "Good point. Let's talk it through right now. What would you change first?",
            text_ko: '좋은 지적이에요. 지금 바로 얘기해 보죠. 뭐부터 바꾸고 싶어요?',
            reaction: 'Uh, sure. But do we have time for that?',
            reaction_ko: '어, 좋아요. 그런데 그럴 시간이 있어요?'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Parked. Put it on the list.',
        reply_ko: '미뤄 둘게요. 목록에 적어 두세요.'
      },
      {
        speaker: 'derek',
        situation: 'You draw three columns on the whiteboard.',
        situation_ko: '화이트보드에 세 칸을 그립니다.',
        line: 'Okay. Retro time.',
        line_ko: '좋아요. 회고 시간이에요.',
        prompt: 'Begin with the positives and open the floor.',
        prompt_ko: '좋았던 점부터 시작하고, 말할 사람을 받으세요.',
        model: "Let's start with what went well. Who wants to go first?",
        model_ko: '잘된 점부터 시작하죠. 누가 먼저 말해 볼래요?',
        distractors: [
          {
            text: "Let's start with what went wrong. Who wants to go first?",
            text_ko: '잘못된 점부터 시작하죠. 누가 먼저 말해 볼래요?',
            reaction: 'Ouch, straight to the bad stuff? We usually warm up first.',
            reaction_ko: '아이고, 바로 나쁜 얘기부터요? 보통은 좀 풀고 시작하잖아요.'
          },
          {
            text: "Let's start with the action items. Who owns the ticket template?",
            text_ko: '액션 아이템부터 시작하죠. 티켓 양식은 누가 맡을래요?',
            reaction: "Action items already? Nobody's said anything yet.",
            reaction_ko: '벌써 액션 아이템이요? 아직 아무도 말 안 했는데요.'
          },
          {
            text: "Let's start with what went well. Jun, you first, since you're new.",
            text_ko: '잘된 점부터 시작하죠. 준, 신입이니까 준이 먼저 해요.',
            reaction: 'Easy. Let him jump in if he wants to.',
            reaction_ko: '살살 해요. 하고 싶으면 알아서 하게 둬요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'The team was really supportive, and the code reviews were super helpful.',
        reply_ko: '팀이 정말 많이 도와줬고, 코드 리뷰가 큰 도움이 됐어요.'
      },
      {
        speaker: 'jun',
        situation: 'Second column: what could be better. Jun takes a breath.',
        situation_ko: '둘째 칸은 더 나아질 점입니다. 준이 숨을 고릅니다.',
        line: 'Some tickets could be clearer before planning. The refund bug was a little vague.',
        line_ko: '플래닝 전에 티켓이 좀 더 분명하면 좋겠어요. 환불 버그는 좀 모호했어요.',
        prompt: "He's right, and the tickets are your job. Own it and say what you'll change.",
        prompt_ko: '준의 말이 맞고, 티켓은 당신 몫입니다. 인정하고 무엇을 바꿀지 말하세요.',
        model: "Totally fair. I'll add acceptance criteria to every ticket from now on.",
        model_ko: '정말 맞는 말이에요. 앞으로는 모든 티켓에 인수 조건을 넣을게요.',
        distractors: [
          {
            text: "That's fair, but you could've asked me for details sooner, too.",
            text_ko: '맞는 말인데, 준도 자세한 걸 좀 더 일찍 물어볼 수 있었잖아요.',
            reaction: 'Oh. Okay. I did ask as soon as I could, though.',
            reaction_ko: '아. 네. 그래도 저는 최대한 빨리 물어본 건데요.'
          },
          {
            text: 'Totally fair. Derek will add acceptance criteria to every ticket from now on.',
            text_ko: '정말 맞는 말이에요. 앞으로는 데릭이 모든 티켓에 인수 조건을 넣을 거예요.',
            reaction: 'Derek? I thought writing tickets was your thing.',
            reaction_ko: '데릭이요? 티켓은 프리야가 쓰는 줄 알았어요.'
          },
          {
            text: "Totally fair. I'll rewrite every ticket in the backlog by Monday.",
            text_ko: '정말 맞는 말이에요. 월요일까지 백로그 티켓을 전부 다시 쓸게요.',
            reaction: 'All of them by Monday? That sounds like a lot.',
            reaction_ko: '월요일까지 전부요? 그건 너무 많은 것 같은데요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "I'll second that. Clear tickets save everybody time.",
        reply_ko: '저도 동의해요. 티켓이 분명하면 모두의 시간이 절약되죠.'
      },
      {
        speaker: 'derek',
        situation: 'Two minutes left. Third column: action items.',
        situation_ko: '2분 남았습니다. 셋째 칸은 액션 아이템입니다.',
        line: 'Are we done? I can smell the weekend.',
        line_ko: '끝났어요? 주말 냄새가 나는데.',
        prompt: "Not quite. Sum up who's doing what: you take the ticket template, Derek takes the refund tests.",
        prompt_ko: '아직입니다. 누가 무엇을 하는지 정리하세요. 티켓 양식은 당신이, 환불 테스트는 데릭이 맡습니다.',
        model: "Almost. Let's recap the action items: I own the ticket template, and Derek adds tests for refunds.",
        model_ko: '거의요. 액션 아이템을 정리하죠. 티켓 양식은 제가 맡고, 환불 테스트는 데릭이 추가해요.',
        distractors: [
          {
            text: "Almost. Let's recap the action items: Derek owns the ticket template, and I add tests for refunds.",
            text_ko: '거의요. 액션 아이템을 정리하죠. 티켓 양식은 데릭이 맡고, 환불 테스트는 제가 추가해요.',
            reaction: "Wait, I'm on the template? I thought that was yours.",
            reaction_ko: '잠깐, 양식을 제가요? 그건 프리야 거 아니었어요?'
          },
          {
            text: 'Almost. Quick recap: Jun owns the ticket template, and Derek rewrites the retry library.',
            text_ko: '거의요. 짧게 정리하면, 티켓 양식은 준이 맡고, 재시도 라이브러리는 데릭이 다시 짜요.',
            reaction: 'The retry library? I thought we parked that.',
            reaction_ko: '재시도 라이브러리요? 그건 미뤄 둔 줄 알았는데요.'
          },
          {
            text: "Yep, we're done here. Have a great weekend, everyone, and thanks for coming!",
            text_ko: '네, 다 끝났어요. 다들 주말 잘 보내요. 오늘 와 줘서 정말 고마워요!',
            reaction: "Hang on. Don't we usually go over the action items?",
            reaction_ko: '잠깐만요. 보통 액션 아이템은 정리하고 끝내지 않아요?'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "On it. And we're done two minutes early!",
        reply_ko: '맡을게요. 그리고 2분 일찍 끝났네요!'
      }
    ],
    phrases: [
      {
        id: 'pr_d5_demo.acceptance_criteria',
        text: 'acceptance criteria',
        meaning_ko: '인수 조건(완료 기준)',
        note: 'The list of things that must be true for a ticket to be done.',
        note_ko: '티켓이 끝났다고 하려면 충족해야 하는 조건 목록입니다.',
        category: 'office'
      },
      {
        id: 'pr_d5_demo.action_items',
        text: "Let's recap the action items.",
        meaning_ko: '액션 아이템을 정리합시다.',
        note: 'Action items = tasks from a meeting, each with an owner. "I own it" = it is my job.',
        note_ko: 'action items는 회의에서 나온 할 일이고 저마다 담당자가 있습니다. "I own it"은 내 일이라는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d5_demo.park_that',
        text: 'Can we park that?',
        meaning_ko: '그건 잠시 미뤄 둘까요?',
        note: 'Saves an off-topic idea for later without killing it. The list is the "parking lot".',
        note_ko: '주제에서 벗어난 아이디어를 버리지 않고 나중으로 미룹니다. 그 목록을 parking lot이라고 합니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d5_demo.second_that',
        text: "I'll second that.",
        meaning_ko: '저도 동의해요.',
        note: 'Shows strong agreement with what someone just said.',
        note_ko: '방금 나온 말에 힘주어 동의하는 표현입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d5_demo.up_first',
        text: "You're up first.",
        meaning_ko: '당신이 첫 순서예요.',
        note: "\"You're up\" = it is your turn. Also \"You're up next.\"",
        note_ko: "\"You're up\"은 당신 차례라는 뜻입니다. \"You're up next.\"도 씁니다.",
        category: 'meeting'
      },
      {
        id: 'pr_d5_demo.walk_us_through',
        text: 'Walk us through what changed.',
        meaning_ko: '무엇이 바뀌었는지 차례로 설명해 주세요.',
        note: 'Asks for a step-by-step explanation.',
        note_ko: '단계별 설명을 부탁하는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'pr_d5_demo.went_well',
        text: 'What went well?',
        meaning_ko: '무엇이 잘됐나요?',
        note: 'The first retro question. The second is "What could be better?"',
        note_ko: '회고의 첫 질문입니다. 둘째는 "What could be better?"입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'pr_d5_happy_hour',
    title: 'Happy hour at the Anchor',
    title_ko: '앵커에서 해피아워',
    place: 'office_desk_team',
    npc: 'derek',
    day_from: 5,
    day_to: 5,
    time_from: '15:00',
    time_to: '18:30',
    summary: "Derek invites you to the team happy hour. Say yes, tell him you will be a little late, praise Jun's first week, and take a compliment.",
    summary_ko: '데릭이 팀 해피아워에 초대합니다. 가겠다고 하고, 조금 늦는다고 알리고, 준의 첫 주를 칭찬하고, 칭찬도 기분 좋게 받으세요.',
    sort: 20,
    tags: 'small-talk,social,invitation',
    calendar: { day: 5, time: '17:30', title: 'Team happy hour at the Anchor', title_ko: '앵커에서 팀 해피아워' },
    turns: [
      {
        speaker: 'derek',
        situation: 'Friday afternoon. The sky is clear and half the office is already looking at the door.',
        situation_ko: '금요일 오후입니다. 하늘은 맑고, 사무실 사람 절반은 벌써 문 쪽을 보고 있습니다.',
        line: 'Hey, a bunch of us are going to happy hour at the Anchor after work. You in?',
        line_ko: '저기, 퇴근하고 몇 명이서 앵커로 해피 아워 가요. 같이 갈래요?',
        prompt: "You'd like to go, but you owe the client an update first.",
        prompt_ko: '가고 싶지만, 그 전에 고객에게 진행 상황을 보내야 합니다.',
        model: "I'm in! I just need to send the client an update first.",
        model_ko: '갈래요! 먼저 고객한테 진행 상황만 보내고요.',
        distractors: [
          {
            text: "I can't, sorry. I need to send the client an update first.",
            text_ko: '미안해요, 못 가요. 고객한테 먼저 보낼 게 있어서요.',
            reaction: "Aw, come on. It's Friday. It can't wait an hour?",
            reaction_ko: '에이, 왜요. 금요일인데. 한 시간도 못 기다려요?'
          },
          {
            text: "I'm in! Could you send the client update for me, though?",
            text_ko: '갈래요! 그런데 고객 업데이트는 데릭이 대신 보내 줄래요?',
            reaction: "Ha. Nice try. That one's all yours.",
            reaction_ko: '하. 그렇게는 안 되죠. 그건 프리야 일이에요.'
          },
          {
            text: "I'm in! I just need to finish the gift card fix first.",
            text_ko: '갈래요! 기프트 카드 수정만 먼저 끝내고요.',
            reaction: "You're fixing gift cards? Since when do you write code?",
            reaction_ko: '기프트 카드를 프리야가 고쳐요? 언제부터 코드 짰어요?'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Nice. We're heading out at five thirty.",
        reply_ko: '좋아요. 우리는 다섯 시 반에 나가요.'
      },
      {
        speaker: 'derek',
        situation: 'The update to Greg will take a while.',
        situation_ko: '그렉에게 보낼 글은 시간이 좀 걸릴 것 같습니다.',
        line: "It's perfect patio weather, so we'll be outside.",
        line_ko: '테라스에 앉기 딱 좋은 날씨라서 밖에 있을 거예요.',
        prompt: "Warn him you'll be a bit behind everyone, and ask him to hold a spot for you.",
        prompt_ko: '다른 사람들보다 조금 늦을 거라고 미리 말하고, 자리를 맡아 달라고 하세요.',
        model: 'I might be a few minutes late. Save me a seat?',
        model_ko: '몇 분 늦을 수도 있어요. 자리 좀 맡아 줄래요?',
        distractors: [
          {
            text: 'I might be a couple of hours late. Start without me.',
            text_ko: '두어 시간 늦을 수도 있어요. 먼저 시작해요.',
            reaction: "A couple of hours? We'll be gone by then.",
            reaction_ko: '두어 시간이요? 그땐 우리 다 가고 없어요.'
          },
          {
            text: 'Outside? Could we sit inside instead? I get cold.',
            text_ko: '밖이요? 안에 앉으면 안 돼요? 저 추위 타요.',
            reaction: "Inside? It's seventy degrees and sunny, Priya.",
            reaction_ko: '안에요? 21도에 화창한데요, 프리야.'
          },
          {
            text: 'Grab me the best table, and order for me, too.',
            text_ko: '제일 좋은 자리 잡아 두고, 주문도 해 놔요.',
            reaction: "Order for you? I don't even know what you drink.",
            reaction_ko: '주문까지요? 뭐 마시는지도 모르는데요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'You got it. Best seat on the patio.',
        reply_ko: '그럼요. 테라스에서 제일 좋은 자리로요.'
      },
      {
        speaker: 'derek',
        situation: "Derek nods toward Jun's empty chair.",
        situation_ko: '데릭이 준의 빈 의자 쪽으로 고개를 끄덕입니다.',
        line: "I asked Jun, too, but he's wiped out. He took a rain check.",
        line_ko: '준한테도 물어봤는데, 완전히 녹초래요. 다음에 오겠대요.',
        prompt: 'Jun is worn out. Say you understand, and say something nice about his week.',
        prompt_ko: '준은 지쳤습니다. 이해한다고 하고, 그의 한 주에 대해 좋은 말을 해 주세요.',
        model: 'No wonder. He had a great first week.',
        model_ko: '그럴 만하죠. 첫 주를 정말 잘 보냈잖아요.',
        distractors: [
          {
            text: "Really? It's his first happy hour, though.",
            text_ko: '정말요? 그래도 첫 해피 아워인데요.',
            reaction: "Come on. The guy's earned a quiet night.",
            reaction_ko: '에이. 조용한 밤 보낼 자격은 있죠.'
          },
          {
            text: 'No wonder. He worked all weekend, too.',
            text_ko: '그럴 만하죠. 주말 내내 일했잖아요.',
            reaction: "The weekend? It hasn't even started yet.",
            reaction_ko: '주말이요? 아직 시작도 안 했는데요.'
          },
          {
            text: 'Oh no, is it supposed to rain tonight?',
            text_ko: '어머, 오늘 밤에 비 온대요? 몰랐네요.',
            reaction: "Ha, no. It means he'll come next time.",
            reaction_ko: '하, 아뇨. 다음에 온다는 뜻이에요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'He really did. Flagging that bug early saved us.',
        reply_ko: '정말 그래요. 그 버그를 일찍 알려 준 덕에 살았죠.'
      },
      {
        speaker: 'derek',
        situation: 'Derek gets a little serious for a moment.',
        situation_ko: '데릭이 잠깐 진지해집니다.',
        line: 'By the way, thanks for handling the client yesterday. That could have gone badly.',
        line_ko: '그나저나, 어제 고객 응대해 줘서 고마워요. 잘못하면 일 커질 뻔했어요.',
        prompt: 'Accept the thanks, and give him credit for the part he played.',
        prompt_ko: '고맙다는 말을 받고, 데릭이 맡은 역할을 인정해 주세요.',
        model: "Thanks, that means a lot. I couldn't have done it without you pairing with Jun.",
        model_ko: '고마워요, 그 말 정말 힘이 되네요. 데릭이 준이랑 같이 작업해 주지 않았으면 못 했을 거예요.',
        distractors: [
          {
            text: "Thanks, that means a lot. I couldn't have done it without Maya on the call.",
            text_ko: '고마워요, 그 말 정말 힘이 되네요. 통화에 마야가 같이 있어 주지 않았으면 못 했을 거예요.',
            reaction: "Maya? I didn't know she was on the call.",
            reaction_ko: '마야요? 마야가 통화에 있었는지 몰랐네요.'
          },
          {
            text: "Oh, it was nothing. Greg's easy to handle if you know how to play him.",
            text_ko: '에이, 별거 아니었어요. 그렉 같은 사람은 어떻게 다뤄야 하는지만 알면 쉬워요.',
            reaction: "Huh. Didn't sound that easy from where I sat.",
            reaction_ko: '흠. 제가 보기엔 그렇게 쉬워 보이진 않던데요.'
          },
          {
            text: 'Thanks. Honestly, I was terrified Greg would yell at me the whole time we talked.',
            text_ko: '고마워요. 솔직히 통화 내내 그렉이 소리 지를까 봐 무서워 죽는 줄 알았어요.',
            reaction: "Ha. Well, you didn't sound it. You were great.",
            reaction_ko: '하. 전혀 그렇게 안 들렸어요. 잘했어요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Team effort. Okay, enough of that.',
        reply_ko: '다 같이 한 거죠. 자, 이런 얘기는 그만하고.'
      },
      {
        speaker: 'derek',
        situation: 'He grabs his jacket off the chair.',
        situation_ko: '데릭이 의자에 걸린 재킷을 집어 듭니다.',
        line: "First round's on me.",
        line_ko: '첫 잔은 제가 살게요.',
        prompt: 'Insist on buying the first drinks yourself. He deserves it.',
        prompt_ko: '첫 잔은 당신이 사겠다고 우기세요. 데릭은 그럴 만합니다.',
        model: 'No way. The first round is on me. You earned it.',
        model_ko: '무슨 소리예요. 첫 잔은 제가 살게요. 데릭이 고생했잖아요.',
        distractors: [
          {
            text: "Great, thanks! Then I'll get the second round.",
            text_ko: '좋아요, 고마워요! 그럼 두 번째는 제가 살게요.',
            reaction: "Ha. Deal. But I'm holding you to it.",
            reaction_ko: '하. 좋아요. 그 말 꼭 지켜요.'
          },
          {
            text: "No way. You're buying all night. You owe me.",
            text_ko: '무슨 소리예요. 오늘은 밤새 데릭이 사요. 저한테 빚졌잖아요.',
            reaction: 'Owe you? For what, exactly?',
            reaction_ko: '빚졌다고요? 정확히 뭘요?'
          },
          {
            text: "No way. The first round's on Jun. He earned it.",
            text_ko: '무슨 소리예요. 첫 잔은 준이 사야죠. 준이 고생했잖아요.',
            reaction: "Jun's not even coming, remember?",
            reaction_ko: '준은 안 온다잖아요, 기억 안 나요?'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "I won't argue with that. See you at the Anchor!",
        reply_ko: '그건 사양 안 할게요. 앵커에서 봐요!'
      }
    ],
    phrases: [
      {
        id: 'pr_d5_happy_hour.couldnt_have',
        text: "I couldn't have done it without you.",
        meaning_ko: '당신 없이는 못 했을 거예요.',
        note: 'Shares the credit. Good leaders say it often.',
        note_ko: '공을 나누는 말입니다. 좋은 리더는 자주 씁니다.',
        category: 'office'
      },
      {
        id: 'pr_d5_happy_hour.im_in',
        text: "I'm in!",
        meaning_ko: '저도 갈게요! / 낄게요!',
        note: "Says yes to a plan. The opposite: \"I'm out\" or \"I'll pass.\"",
        note_ko: "계획에 함께하겠다는 말입니다. 반대는 \"I'm out\"이나 \"I'll pass.\"입니다.",
        category: 'small-talk'
      },
      {
        id: 'pr_d5_happy_hour.means_a_lot',
        text: 'Thanks, that means a lot.',
        meaning_ko: '고마워요, 큰 힘이 돼요.',
        note: 'A warm way to accept a compliment.',
        note_ko: '칭찬을 따뜻하게 받아들이는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_d5_happy_hour.no_wonder',
        text: 'No wonder.',
        meaning_ko: '그럴 만하네요.',
        note: 'It is not surprising, given the reason.',
        note_ko: '이유를 알고 보니 놀랍지 않다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_d5_happy_hour.on_me',
        text: 'The first round is on me.',
        meaning_ko: '첫 잔은 제가 살게요.',
        note: '"A round" is one drink for everyone in the group. "On me" = I pay.',
        note_ko: 'a round는 일행 모두에게 돌아가는 한 잔입니다. on me는 내가 낸다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_d5_happy_hour.save_seat',
        text: 'Save me a seat?',
        meaning_ko: '제 자리 좀 맡아 줄래요?',
        note: 'Short for "Can you save me a seat?"',
        note_ko: '"Can you save me a seat?"을 줄인 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_d5_happy_hour.wiped_out',
        text: "He's wiped out.",
        meaning_ko: '그는 완전히 지쳤어요.',
        note: 'Very tired. Also "beat" or "exhausted".',
        note_ko: '몹시 피곤하다는 뜻입니다. beat, exhausted도 씁니다.',
        category: 'small-talk'
      }
    ]
  },
  {
    id: 'pr_w_brunch',
    title: 'Weekend brunch at the diner',
    title_ko: '다이너에서 주말 브런치',
    place: 'diner_counter',
    npc: 'rosa',
    day_from: 6,
    day_to: 7,
    time_from: '09:00',
    time_to: '14:30',
    summary: 'Treat yourself to brunch at the Sunny Side Diner: ask about the specials, change the toast, get the check, and leave a twenty percent tip.',
    summary_ko: '서니 사이드 다이너에서 브런치로 자신에게 한턱내세요. 스페셜을 묻고, 토스트를 바꾸고, 계산서를 받고, 팁 20퍼센트를 남기세요.',
    reward: -22,
    energy: 40,
    sort: 10,
    tags: 'food,order,tipping,money',
    calendar: { day: 6, time: '12:00', title: 'Brunch at the Sunny Side Diner', title_ko: '서니 사이드 다이너에서 브런치' },
    turns: [
      {
        speaker: 'rosa',
        situation: 'A sunny weekend morning. The diner smells like coffee and bacon.',
        situation_ko: '화창한 주말 아침입니다. 다이너에 커피와 베이컨 냄새가 가득합니다.',
        line: 'Morning, hon! Just you today?',
        line_ko: '안녕, 손님! 오늘은 혼자예요?',
        prompt: "You're eating alone. Ask for a seat where you can look out at the street.",
        prompt_ko: '혼자 왔습니다. 바깥 거리가 보이는 자리를 부탁하세요.',
        model: 'Just me today. Could I get a table by the window?',
        model_ko: '오늘은 혼자예요. 창가 자리로 앉을 수 있을까요?',
        distractors: [
          {
            text: 'Two of us, actually. Could we get a booth in the back?',
            text_ko: '사실 두 명이에요. 안쪽 부스 자리로 앉을 수 있을까요?',
            reaction: 'Two? Is someone joining you, hon?',
            reaction_ko: '두 명이요? 누가 더 와요?'
          },
          {
            text: 'Yeah. Give me the window table. That one, right there.',
            text_ko: '네. 창가 테이블 줘요. 저기 저거요.',
            reaction: "Okay... sure. It's all yours.",
            reaction_ko: '네... 그래요. 앉아요.'
          },
          {
            text: 'Just coffee for now. Could I see a menu, please?',
            text_ko: '일단 커피만요. 메뉴판 좀 볼 수 있을까요?',
            reaction: 'Sure, hon. But first, how many in your party?',
            reaction_ko: '그럼요. 그런데 먼저, 몇 분이세요?'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Sure thing. Right this way.',
        reply_ko: '그럼요. 이쪽으로 와요.'
      },
      {
        speaker: 'rosa',
        situation: 'Rosa comes over with a pot of coffee.',
        situation_ko: '로사가 커피 주전자를 들고 옵니다.',
        line: 'Coffee to start?',
        line_ko: '커피부터 드릴까요?',
        prompt: "Accept the coffee, and find out what's good today that isn't on the regular menu.",
        prompt_ko: '커피는 받고, 오늘 메뉴판에 없는 특별 메뉴가 뭔지 알아보세요.',
        model: 'Yes, please. What are the brunch specials today?',
        model_ko: '네, 주세요. 오늘 브런치 스페셜은 뭐예요?',
        distractors: [
          {
            text: 'No, thanks. What are the brunch specials today?',
            text_ko: '아뇨, 괜찮아요. 오늘 브런치 스페셜은 뭐예요?',
            reaction: 'No coffee? Okay, hon. Water, then?',
            reaction_ko: '커피 안 마셔요? 알았어요. 그럼 물 줄까요?'
          },
          {
            text: 'Yes, please. Could I take a look at the dinner menu?',
            text_ko: '네, 주세요. 저녁 메뉴판 좀 볼 수 있어요?',
            reaction: "Dinner? Hon, it's ten in the morning.",
            reaction_ko: '저녁이요? 손님, 지금 아침 열 시예요.'
          },
          {
            text: "Yes. And hurry, please. I'm starving here.",
            text_ko: '네. 그리고 빨리 좀 주세요. 배고파 죽겠어요.',
            reaction: 'Coming right up. No need to rush me, though.',
            reaction_ko: '금방 가요. 그렇게 재촉 안 해도 돼요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: "We've got a veggie omelet with home fries and toast, or blueberry pancakes.",
        reply_ko: '채소 오믈렛에 홈 프라이와 토스트가 나오는 것, 아니면 블루베리 팬케이크가 있어요.'
      },
      {
        speaker: 'rosa',
        situation: 'She takes a pencil from behind her ear.',
        situation_ko: '로사가 귀 뒤에 꽂아 둔 연필을 뺍니다.',
        line: "What'll it be, hon?",
        line_ko: '뭘로 할래요?',
        prompt: "Order the omelet, but you'd rather have wheat bread than white.",
        prompt_ko: '오믈렛을 주문하되, 빵은 흰 빵보다 통밀이 좋습니다.',
        model: "I'll have the veggie omelet. Can I get wheat toast instead of white?",
        model_ko: '채소 오믈렛으로 할게요. 토스트는 흰 빵 말고 통밀로 해 주실 수 있어요?',
        distractors: [
          {
            text: "I'll have the veggie omelet. Can I get hash browns instead of toast?",
            text_ko: '채소 오믈렛으로 할게요. 토스트 대신 해시 브라운으로 해 주실 수 있어요?',
            reaction: 'It already comes with home fries, hon. So no toast at all?',
            reaction_ko: '홈 프라이는 원래 나와요. 그럼 토스트는 아예 빼요?'
          },
          {
            text: "I'll have the blueberry pancakes. Can I get wheat toast with them?",
            text_ko: '블루베리 팬케이크로 할게요. 통밀 토스트도 같이 주실 수 있어요?',
            reaction: "Pancakes and toast? That's a lot of bread, hon.",
            reaction_ko: '팬케이크에 토스트까지요? 빵이 너무 많은데요.'
          },
          {
            text: 'The omelet. And wheat toast. Your white bread is awful, honestly.',
            text_ko: '오믈렛이요. 토스트는 통밀로요. 여기 흰 빵은 솔직히 별로예요.',
            reaction: 'Well, our regulars like it fine. Wheat it is.',
            reaction_ko: '글쎄요, 단골들은 잘만 먹던데. 통밀로 할게요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: "Wheat toast, you got it. It'll be right out.",
        reply_ko: '통밀 토스트, 알겠어요. 금방 나와요.'
      },
      {
        speaker: 'rosa',
        situation: 'The plate is empty. Rosa stops by with the coffee pot again.',
        situation_ko: '접시가 비었습니다. 로사가 다시 커피 주전자를 들고 들릅니다.',
        line: 'How was everything?',
        line_ko: '식사는 어땠어요?',
        prompt: "Tell her you enjoyed it like always, and that you're ready to pay.",
        prompt_ko: '늘 그렇듯 맛있었다고 하고, 계산하겠다고 하세요.',
        model: 'Delicious, as always. Could I get the check, please?',
        model_ko: '언제나처럼 맛있었어요. 계산서 좀 주시겠어요?',
        distractors: [
          {
            text: 'Delicious, thanks. Could I get a coffee refill, please?',
            text_ko: '맛있었어요, 고마워요. 커피 리필 좀 해 주시겠어요?',
            reaction: 'Sure thing. Anything else, or just the coffee?',
            reaction_ko: '그럼요. 다른 건요, 커피만요?'
          },
          {
            text: 'Fine. The eggs were a bit dry. Check, please.',
            text_ko: '그냥 그랬어요. 달걀이 좀 퍽퍽했어요. 계산서요.',
            reaction: "Oh. I'm sorry, hon. I'll let the kitchen know.",
            reaction_ko: '어머. 미안해요. 주방에 말할게요.'
          },
          {
            text: 'Delicious. Could I get this to go, please?',
            text_ko: '맛있었어요. 이거 포장해 주시겠어요?',
            reaction: 'To go? Hon, you cleaned the plate.',
            reaction_ko: '포장이요? 손님, 접시를 싹 비웠는데요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Here you go, hon. Eighteen forty with tax. No rush.',
        reply_ko: '여기요. 세금 포함해서 18달러 40센트예요. 천천히 해요.'
      },
      {
        speaker: 'rosa',
        situation: 'The check says $17.00 plus $1.40 tax. Twenty percent of seventeen dollars is $3.40.',
        situation_ko: '계산서에는 17달러에 세금 1달러 40센트라고 적혀 있습니다. 17달러의 20퍼센트는 3달러 40센트입니다.',
        line: 'Cash or card?',
        line_ko: '현금이에요, 카드예요?',
        prompt: 'Pay with plastic, and leave her a good tip: twenty percent.',
        prompt_ko: '카드로 내고, 팁을 넉넉히 20퍼센트 남기세요.',
        model: "I'll put it on my card. And please add a twenty percent tip.",
        model_ko: '카드로 할게요. 그리고 팁 20퍼센트 더해 주세요.',
        distractors: [
          {
            text: "I'll put it on my card. And please add a ten percent tip.",
            text_ko: '카드로 할게요. 그리고 팁 10퍼센트 더해 주세요.',
            reaction: 'Ten percent. Okay, hon. Thanks.',
            reaction_ko: '10퍼센트요. 네, 고마워요.'
          },
          {
            text: 'Card, please. And add three forty, so it comes to twenty even.',
            text_ko: '카드로요. 팁 3달러 40센트 더해서 딱 20달러 맞춰 주세요.',
            reaction: "Twenty even? I think that'd be twenty-one eighty, hon.",
            reaction_ko: '딱 20달러요? 그러면 21달러 80센트일 텐데요.'
          },
          {
            text: "I'll pay in cash. Here's a twenty. Keep the change.",
            text_ko: '현금으로 할게요. 여기 20달러요. 잔돈은 가지세요.',
            reaction: 'Oh. Well, thank you, hon.',
            reaction_ko: '아. 네, 고마워요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Aw, thank you, hon! You have a great weekend.',
        reply_ko: '어머, 고마워요! 주말 잘 보내요.'
      }
    ],
    phrases: [
      {
        id: 'pr_w_brunch.as_always',
        text: 'Delicious, as always.',
        meaning_ko: '언제나처럼 맛있었어요.',
        note: 'A compliment from a regular.',
        note_ko: '단골이 하는 칭찬입니다.',
        category: 'food'
      },
      {
        id: 'pr_w_brunch.instead_of',
        text: 'Can I get wheat toast instead of white?',
        meaning_ko: '흰 빵 대신 통밀 토스트로 주시겠어요?',
        note: 'American diners are happy to change a dish. Just ask.',
        note_ko: '미국 다이너는 메뉴를 바꿔 달라는 부탁을 잘 들어줍니다. 그냥 물어보세요.',
        category: 'food'
      },
      {
        id: 'pr_w_brunch.just_me',
        text: 'Just me today.',
        meaning_ko: '오늘은 혼자예요.',
        note: 'The answer to "How many?" or "Just you?" at a restaurant.',
        note_ko: '식당에서 "How many?"나 "Just you?"라고 물을 때 하는 답입니다.',
        category: 'food'
      },
      {
        id: 'pr_w_brunch.put_on_card',
        text: "I'll put it on my card.",
        meaning_ko: '카드로 할게요.',
        note: '"Put it on" = charge it to.',
        note_ko: 'put it on은 그쪽으로 결제한다는 뜻입니다.',
        category: 'food'
      },
      {
        id: 'pr_w_brunch.specials',
        text: 'What are the specials today?',
        meaning_ko: '오늘의 스페셜은 뭐예요?',
        note: 'Specials are not on the regular menu, so you have to ask.',
        note_ko: '스페셜은 기본 메뉴판에 없어서 물어봐야 합니다.',
        category: 'food'
      },
      {
        id: 'pr_w_brunch.tip',
        text: 'Please add a twenty percent tip.',
        meaning_ko: '팁 20퍼센트를 더해 주세요.',
        note: 'At a table, 15 to 20 percent of the price before tax. Servers depend on tips.',
        note_ko: '테이블에서 먹으면 세전 가격의 15~20퍼센트입니다. 종업원의 수입은 팁에 달려 있습니다.',
        category: 'food'
      }
    ]
  },
  {
    id: 'pr_w_farmers',
    title: 'The farmers market in Seaside Park',
    title_ko: '시사이드 공원의 파머스 마켓',
    place: 'park_bench',
    npc: 'carl',
    day_from: 6,
    day_to: 7,
    time_from: '08:00',
    time_to: '18:00',
    summary: 'You run into Carl, an old friend from the park, on your way to the farmers market. Ask about the peaches, find an ATM, and talk about your week.',
    summary_ko: '파머스 마켓에 가는 길에 공원에서 알고 지내는 칼을 만납니다. 복숭아 값을 묻고, 현금 인출기를 찾고, 한 주 이야기를 나누세요.',
    sort: 20,
    tags: 'small-talk,park,shopping',
    calendar: { day: 6, time: '10:00', title: 'Farmers market in Seaside Park', title_ko: '시사이드 공원 파머스 마켓' },
    turns: [
      {
        speaker: 'carl',
        situation: 'Seaside Park on a sunny morning. Carl is on his usual bench with a paper bag full of peaches.',
        situation_ko: '화창한 아침의 시사이드 공원입니다. 칼이 늘 앉는 벤치에 복숭아가 가득 든 종이봉투를 들고 있습니다.',
        line: 'Well, look who it is! Morning, Priya. Beautiful day, huh?',
        line_ko: '아니, 이게 누구야! 좋은 아침이야, 프리야. 날씨 좋지?',
        prompt: "You're on your way to the farmers market. Agree about the day, and ask if that's why he's here.",
        prompt_ko: '당신은 파머스 마켓에 가는 길입니다. 날씨에 맞장구치고, 칼도 그래서 왔는지 물어보세요.',
        model: 'Gorgeous! Are you here for the farmers market too?',
        model_ko: '정말 좋네요! 칼도 파머스 마켓 오셨어요?',
        distractors: [
          {
            text: "Is it? I hadn't noticed. Are you on your way home?",
            text_ko: '그래요? 몰랐어요. 댁에 가시는 길이에요?',
            reaction: "Hadn't noticed? Kid, look up. Not a cloud in the sky.",
            reaction_ko: '몰랐다고? 이 사람아, 고개 좀 들어 봐. 구름 한 점 없잖아.'
          },
          {
            text: "Gorgeous! I wish I could enjoy it. I've got work to do.",
            text_ko: '정말 좋네요! 즐기고 싶은데 저는 일이 있어서요.',
            reaction: 'Work? On a day like this? Put the laptop away.',
            reaction_ko: '일? 이런 날에? 노트북은 좀 덮어 둬.'
          },
          {
            text: 'Morning, Carl! Did you get those peaches at the store?',
            text_ko: '안녕하세요, 칼! 그 복숭아 마트에서 사셨어요?',
            reaction: 'The store? Never. Right here at the market.',
            reaction_ko: '마트? 무슨. 바로 여기 마켓에서 샀지.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'Already been. Got the peaches from the stand by the fountain. Best in town.',
        reply_ko: '벌써 다녀왔지. 분수대 옆 가판에서 복숭아를 샀어. 이 동네 최고야.'
      },
      {
        speaker: 'carl',
        situation: 'He holds up a peach the size of a baseball.',
        situation_ko: '칼이 야구공만 한 복숭아를 들어 보입니다.',
        line: "Look at that. You don't get these at the store.",
        line_ko: '이것 좀 봐. 마트에선 이런 거 못 사.',
        prompt: 'Say something nice about the fruit, and find out what they cost.',
        prompt_ko: '복숭아를 칭찬하고, 값이 얼마인지 알아보세요.',
        model: 'They look amazing. How much are they?',
        model_ko: '정말 맛있어 보여요. 그거 얼마예요?',
        distractors: [
          {
            text: 'They look okay. Are they worth the money?',
            text_ko: '그냥 괜찮아 보이네요. 돈 값은 해요?',
            reaction: 'Okay? Kid, these are the best in town.',
            reaction_ko: '괜찮아 보인다고? 이 동네 최고라니까.'
          },
          {
            text: 'They look amazing. Can I have one of yours?',
            text_ko: '정말 맛있어 보여요. 하나 주실래요?',
            reaction: "Ha! Get your own. The stand's right over there.",
            reaction_ko: '하! 자네 건 자네가 사. 가판이 바로 저기야.'
          },
          {
            text: 'They look amazing. Which store has them?',
            text_ko: '정말 맛있어 보여요. 어느 마트예요?',
            reaction: "A store? I just told you, they're from the market.",
            reaction_ko: '마트? 방금 마켓에서 샀다고 했잖아.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'Four dollars a pound, or three pounds for ten. Tell them Carl sent you.',
        reply_ko: '1파운드에 4달러, 3파운드에 10달러야. 칼이 보냈다고 해.'
      },
      {
        speaker: 'carl',
        situation: 'He points across the grass at the white tents.',
        situation_ko: '칼이 잔디밭 건너 하얀 천막들을 가리킵니다.',
        line: "Bring cash, though. Some of the stands don't take cards.",
        line_ko: '그래도 현금은 챙겨. 카드 안 받는 가판도 있거든.',
        prompt: "Thank him for the heads-up. You don't have any cash on you.",
        prompt_ko: '미리 알려 줘서 고맙다고 하세요. 지금 현금이 하나도 없습니다.',
        model: 'Good to know. Is there an ATM nearby?',
        model_ko: '알려 주셔서 다행이에요. 근처에 ATM 있어요?',
        distractors: [
          {
            text: "Good to know. I'll just pay by card, then.",
            text_ko: '그렇군요. 그럼 그냥 카드로 낼게요.',
            reaction: "Card? Didn't you hear me? Some don't take them.",
            reaction_ko: '카드? 내 말 못 들었어? 안 받는 데도 있다니까.'
          },
          {
            text: "Seriously? Who doesn't take cards these days?",
            text_ko: '진짜요? 요즘 카드 안 받는 데가 어디 있어요?',
            reaction: "The farmers, that's who. Small stands, small margins.",
            reaction_ko: '농부들이 그래. 작은 가판은 남는 게 별로 없거든.'
          },
          {
            text: 'Good to know. Could I borrow some cash?',
            text_ko: '그렇군요. 현금 좀 빌려주실 수 있어요?',
            reaction: 'Ha! From your landlord? Nice try, kid.',
            reaction_ko: '하! 집주인한테? 꿈도 꾸지 마.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: "There's one by the park entrance, right next to the coffee cart.",
        reply_ko: '공원 입구에 하나 있어. 커피 카트 바로 옆이야.'
      },
      {
        speaker: 'carl',
        situation: 'Carl moves over to make room on the bench.',
        situation_ko: '칼이 벤치 옆자리를 내줍니다.',
        line: "So how's work? Still running all those meetings?",
        line_ko: '일은 어때? 아직도 그 회의들 다 진행하나?',
        prompt: 'Tell him how your week went: it was crazy, but the team got the release out on schedule.',
        prompt_ko: '이번 주가 어땠는지 말하세요. 정신없었지만 팀이 일정대로 배포했습니다.',
        model: 'Always. It was a hectic week, but we shipped on time.',
        model_ko: '늘 그렇죠. 정신없는 한 주였는데, 제때 배포했어요.',
        distractors: [
          {
            text: 'Always. It was a hectic week, and we missed the deadline.',
            text_ko: '늘 그렇죠. 정신없는 한 주였고, 마감은 놓쳤어요.',
            reaction: "Ah, that's too bad. Next week, then.",
            reaction_ko: '아, 저런. 다음 주엔 되겠지.'
          },
          {
            text: "Don't get me started. The client yelled and Jun nearly quit.",
            text_ko: '말도 마세요. 고객은 소리 지르고, 준은 그만둘 뻔했어요.',
            reaction: 'Whoa. That bad? Sounds like you need this sun.',
            reaction_ko: '저런. 그렇게 심했어? 이 햇볕 좀 쬐어야겠네.'
          },
          {
            text: 'Not really. I mostly just write code these days, Carl.',
            text_ko: '아뇨. 요즘은 거의 코드만 짜요, 칼.',
            reaction: 'Code? I thought you were the boss of the meetings.',
            reaction_ko: '코드? 자네가 회의 대장인 줄 알았는데.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: "That's what I like to hear. But you work too hard, you know.",
        reply_ko: '듣기 좋은 소식이네. 그런데 자네는 일을 너무 많이 해.'
      },
      {
        speaker: 'carl',
        situation: 'Music drifts over from the market.',
        situation_ko: '마켓 쪽에서 음악 소리가 들려옵니다.',
        line: 'What are you doing this weekend to relax?',
        line_ko: '이번 주말엔 쉬려고 뭐 할 거야?',
        prompt: 'Tell him your plan: a meal at home from whatever you find here, then a lazy afternoon.',
        prompt_ko: '계획을 말하세요. 여기서 고른 걸로 집에서 요리하고, 오후엔 느긋하게 보낼 겁니다.',
        model: "I'm going to cook with whatever looks fresh, and then take it easy.",
        model_ko: '싱싱해 보이는 걸로 요리하고, 그다음엔 푹 쉬려고요.',
        distractors: [
          {
            text: "Honestly, I'll probably catch up on work and get ready for Monday.",
            text_ko: '솔직히 밀린 일 하고 월요일 준비나 할 것 같아요.',
            reaction: "Work? On a weekend? Kid, you're hopeless.",
            reaction_ko: '일? 주말에? 이 사람, 못 말리겠네.'
          },
          {
            text: "I'm going to grab a frozen pizza and then take it easy.",
            text_ko: '냉동 피자 하나 사다 먹고 푹 쉬려고요.',
            reaction: 'Frozen pizza? With all this fresh stuff around?',
            reaction_ko: '냉동 피자? 이렇게 싱싱한 게 널렸는데?'
          },
          {
            text: 'Not sure yet. Why, is something wrong at the apartment?',
            text_ko: '아직 몰라요. 왜요, 집에 무슨 문제 있어요?',
            reaction: "No, no. I'm just asking how you are.",
            reaction_ko: '아니, 아니. 그냥 어떻게 지내나 물어본 거야.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: "That's the spirit. Here, take a peach for the road.",
        reply_ko: '바로 그거야. 자, 가는 길에 복숭아 하나 먹어.'
      }
    ],
    phrases: [
      {
        id: 'pr_w_farmers.a_pound',
        text: 'four dollars a pound',
        meaning_ko: '1파운드에 4달러',
        note: 'Produce is sold by the pound (lb). One pound is about 450 grams.',
        note_ko: '과일과 채소는 파운드(lb) 단위로 팝니다. 1파운드는 약 450그램입니다.',
        category: 'shopping'
      },
      {
        id: 'pr_w_farmers.atm',
        text: 'Is there an ATM nearby?',
        meaning_ko: '근처에 현금 인출기가 있나요?',
        note: 'Small stands and markets often take cash only.',
        note_ko: '작은 가판이나 시장은 현금만 받는 곳이 많습니다.',
        category: 'shopping'
      },
      {
        id: 'pr_w_farmers.good_to_know',
        text: 'Good to know.',
        meaning_ko: '알아 두면 좋겠네요.',
        note: 'Thanks someone for a useful piece of information.',
        note_ko: '쓸모 있는 정보를 알려 줘서 고맙다는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_w_farmers.hectic',
        text: 'It was a hectic week.',
        meaning_ko: '정신없는 한 주였어요.',
        note: 'Hectic = very busy, with a lot going on at once.',
        note_ko: 'hectic은 여러 일이 한꺼번에 몰려 몹시 바쁘다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_w_farmers.how_much',
        text: 'How much are they?',
        meaning_ko: '얼마예요?',
        note: 'Use "are they" for more than one thing, "is it" for one.',
        note_ko: '여러 개면 are they, 하나면 is it을 씁니다.',
        category: 'shopping'
      },
      {
        id: 'pr_w_farmers.look_who',
        text: 'Well, look who it is!',
        meaning_ko: '아니, 이게 누구야!',
        note: 'A warm greeting when you run into someone you know.',
        note_ko: '아는 사람을 우연히 만났을 때 하는 반가운 인사입니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_w_farmers.take_it_easy',
        text: "I'm going to take it easy.",
        meaning_ko: '푹 쉴 거예요.',
        note: 'To relax and not do much. Also a casual goodbye: "Take it easy!"',
        note_ko: '별일 없이 쉰다는 뜻입니다. "Take it easy!"는 편한 작별 인사로도 씁니다.',
        category: 'small-talk'
      }
    ]
  },
  {
    id: 'pr_w_grocery',
    title: 'Groceries for the week',
    title_ko: '한 주 장보기',
    place: 'market_checkout',
    npc: 'mike',
    day_from: 6,
    day_to: 7,
    time_from: '09:00',
    time_to: '21:00',
    summary: 'Check out at Fairview Market: use your own bags, catch a wrong price, hand over a coupon, and pay by credit card.',
    summary_ko: '페어뷰 마켓 계산대에서 장바구니를 쓰고, 잘못 찍힌 값을 바로잡고, 쿠폰을 내고, 신용카드로 계산하세요.',
    sort: 30,
    tags: 'shopping,market,money',
    calendar: { day: 7, time: '11:00', title: 'Groceries for the week', title_ko: '한 주 장보기' },
    turns: [
      {
        speaker: 'mike',
        situation: 'Fairview Market. Your cart is full for the week: vegetables, eggs, cheese, coffee beans.',
        situation_ko: '페어뷰 마켓입니다. 채소, 달걀, 치즈, 커피 원두까지 한 주 먹을 것으로 카트가 가득합니다.',
        line: 'Hi there! Did you find everything okay?',
        line_ko: '안녕하세요! 찾으시는 건 다 찾으셨어요?',
        prompt: "Answer him, and let him know you won't need the store's bags today.",
        prompt_ko: '대답하고, 오늘은 가게 봉투가 필요 없다고 알려 주세요.',
        model: 'I did, thanks. Oh, and I brought my own bags.',
        model_ko: '네, 고마워요. 아, 그리고 장바구니 가져왔어요.',
        distractors: [
          {
            text: 'I did, thanks. Could I get a few extra bags?',
            text_ko: '네, 고마워요. 봉투 몇 개 더 주실 수 있어요?',
            reaction: "Sure. They're ten cents each, though.",
            reaction_ko: '그럼요. 근데 하나에 10센트예요.'
          },
          {
            text: "Almost. I couldn't find the coffee beans.",
            text_ko: '거의요. 커피 원두는 못 찾았어요.',
            reaction: "Oh? Looks like there's a bag of them right here.",
            reaction_ko: '네? 여기 원두 한 봉지 있는 것 같은데요.'
          },
          {
            text: "Yeah. Just ring it up, please. I'm in a hurry.",
            text_ko: '네. 그냥 빨리 계산해 주세요. 저 바빠요.',
            reaction: "Sure thing. I'll be quick.",
            reaction_ko: '네, 빨리 해 드릴게요.'
          }
        ],
        reply_speaker: 'mike',
        reply_line: "Nice! That's five cents off for each bag.",
        reply_ko: '좋네요! 봉투 하나에 5센트씩 빼 드려요.'
      },
      {
        speaker: 'mike',
        situation: 'You watch the prices on the screen. The cheddar comes up as $4.49, but the sign on the shelf said $3.49.',
        situation_ko: '화면에 찍히는 값을 봅니다. 체다 치즈가 4달러 49센트로 찍혔는데, 진열대 표지에는 3달러 49센트라고 돼 있었습니다.',
        line: 'Did you know the ice cream is two for eight this week?',
        line_ko: '이번 주에 아이스크림 두 개에 8달러인 거 아셨어요?',
        prompt: "He's talking about ice cream, but the cheese came up a dollar too high. Bring it up politely.",
        prompt_ko: '그는 아이스크림 얘기를 하지만, 치즈 값이 1달러 더 찍혔습니다. 정중하게 말하세요.',
        model: 'Sorry, I think the cheese rang up wrong. The sign said it was on sale.',
        model_ko: '죄송한데, 치즈 값이 잘못 찍힌 것 같아요. 진열대엔 할인이라고 돼 있었어요.',
        distractors: [
          {
            text: 'Sorry, I think the eggs rang up wrong. The sign said they were on sale.',
            text_ko: '죄송한데, 달걀 값이 잘못 찍힌 것 같아요. 진열대엔 할인이라고 돼 있었어요.',
            reaction: "The eggs? They came up two ninety-nine. That's the sale price.",
            reaction_ko: '달걀이요? 2달러 99센트로 찍혔는데요. 그게 할인가예요.'
          },
          {
            text: 'Hey, you overcharged me for the cheese. Fix that, please.',
            text_ko: '저기요, 치즈 값을 더 받으셨잖아요. 그거 지금 바로 고쳐 주세요.',
            reaction: "Whoa, okay. Let me take a look. It's just the system.",
            reaction_ko: '워, 네. 확인해 볼게요. 시스템이 그런 거예요.'
          },
          {
            text: "Two for eight? Great, I'll grab two. Can you hold my spot?",
            text_ko: '두 개에 8달러요? 좋네요, 두 개 가져올게요. 자리 좀 맡아 줄래요?',
            reaction: 'Sure. Freezers are in aisle nine.',
            reaction_ko: '그럼요. 냉동 코너는 9번 통로예요.'
          }
        ],
        reply_speaker: 'mike',
        reply_line: "Let me check. You're right, it's three forty-nine. I'll fix that.",
        reply_ko: '확인해 볼게요. 맞네요, 3달러 49센트예요. 고쳐 드릴게요.'
      },
      {
        speaker: 'mike',
        situation: 'You take a coupon out of your wallet.',
        situation_ko: '지갑에서 쿠폰을 꺼냅니다.',
        line: 'Anything else before I total it up?',
        line_ko: '합계 내기 전에 더 필요한 거 있으세요?',
        prompt: 'Before he totals it, hand over the coupon you brought for the coffee.',
        prompt_ko: '합계를 내기 전에, 커피 원두용으로 가져온 쿠폰을 내미세요.',
        model: "Can I use this coupon? It's for the coffee beans.",
        model_ko: '이 쿠폰 쓸 수 있어요? 커피 원두 쿠폰이에요.',
        distractors: [
          {
            text: "Can I use this coupon? It's for the ice cream.",
            text_ko: '이 쿠폰 쓸 수 있어요? 아이스크림 쿠폰이에요.',
            reaction: 'This one? It says coffee beans on it.',
            reaction_ko: '이거요? 커피 원두라고 적혀 있는데요.'
          },
          {
            text: "No, that's it. Go ahead and total it up.",
            text_ko: '아뇨, 그게 다예요. 합계 내 주세요.',
            reaction: 'Okay. Oh, wait. Is that a coupon in your hand?',
            reaction_ko: '네. 아, 잠깐만요. 손에 든 거 쿠폰이에요?'
          },
          {
            text: "I want this coupon used. Don't tell me it's expired.",
            text_ko: '이 쿠폰 꼭 써야 돼요. 기한 지났다는 말은 마세요.',
            reaction: "Whoa, easy. Let me look. It's good till tomorrow.",
            reaction_ko: '워, 진정하세요. 볼게요. 내일까지 쓸 수 있어요.'
          }
        ],
        reply_speaker: 'mike',
        reply_line: "Sure. It expires tomorrow, so you're just in time. Two dollars off.",
        reply_ko: '그럼요. 내일까지라서 딱 맞춰 오셨네요. 2달러 할인입니다.'
      },
      {
        speaker: 'mike',
        situation: 'The total appears on the card reader.',
        situation_ko: '카드 단말기에 합계가 뜹니다.',
        line: 'Debit or credit?',
        line_ko: '체크카드예요, 신용카드예요?',
        prompt: "You're using your credit card. You don't want to hold on to the receipt: have it go with the groceries.",
        prompt_ko: '신용카드로 냅니다. 영수증은 들고 있기 싫으니 장 본 물건과 같이 넣어 달라고 하세요.',
        model: 'Credit, please. And could you put the receipt in the bag?',
        model_ko: '신용카드요. 그리고 영수증은 봉투에 넣어 주실래요?',
        distractors: [
          {
            text: 'Debit, please. And could you put the receipt in the bag?',
            text_ko: '체크카드요. 그리고 영수증은 봉투에 넣어 주실래요?',
            reaction: 'Debit, okay. Go ahead and enter your PIN.',
            reaction_ko: '체크카드요, 네. 비밀번호 눌러 주세요.'
          },
          {
            text: "Credit, please. And no receipt, thanks. I won't need it.",
            text_ko: '신용카드요. 영수증은 괜찮아요. 필요 없을 거예요.',
            reaction: 'No receipt? Okay. You sure?',
            reaction_ko: '영수증 필요 없어요? 네. 정말요?'
          },
          {
            text: "Credit. Receipt goes in the bag. Hurry, there's a line.",
            text_ko: '신용카드. 영수증은 봉투에. 빨리요, 뒤에 줄 섰어요.',
            reaction: 'Uh, okay. Doing my best here.',
            reaction_ko: '어, 네. 최대한 빨리 하고 있어요.'
          }
        ],
        reply_speaker: 'mike',
        reply_line: "You got it. You're all set.",
        reply_ko: '알겠어요. 다 됐습니다.'
      },
      {
        speaker: 'mike',
        situation: 'Two full bags. They are heavier than they look.',
        situation_ko: '가득 찬 봉투가 둘입니다. 보기보다 무겁습니다.',
        line: 'Need a hand out to your car?',
        line_ko: '차까지 들어다 드릴까요?',
        prompt: "Turn down the help politely. You don't have far to go.",
        prompt_ko: '도움은 정중하게 사양하세요. 멀리 가지 않습니다.',
        model: "No, thanks. I've got it. I live just around the corner.",
        model_ko: '괜찮아요, 고마워요. 들 수 있어요. 바로 근처에 살아요.',
        distractors: [
          {
            text: "Yes, please. My car's parked way out in the back.",
            text_ko: '네, 부탁해요. 차를 저 뒤쪽 끝에 세웠어요.',
            reaction: 'Sure thing. Which row are you in?',
            reaction_ko: '그럼요. 몇 번째 줄이에요?'
          },
          {
            text: "No. I can carry my own groceries. I'm not helpless.",
            text_ko: '아뇨. 장 본 건 제가 들어요. 저 그렇게 약하지 않거든요.',
            reaction: "Oh, no, I didn't mean it like that. Have a good one.",
            reaction_ko: '아, 그런 뜻이 아니었어요. 좋은 하루 보내세요.'
          },
          {
            text: "Sure, thanks. Could you carry them home for me? It's close.",
            text_ko: '네, 고마워요. 집까지 들어다 주실래요? 가까워요.',
            reaction: 'Home? Uh, I can only go as far as the parking lot.',
            reaction_ko: '집까지요? 어, 저는 주차장까지만 갈 수 있어요.'
          }
        ],
        reply_speaker: 'mike',
        reply_line: 'Have a good one! Enjoy the rest of your weekend.',
        reply_ko: '좋은 하루 보내세요! 남은 주말 잘 보내시고요.'
      }
    ],
    phrases: [
      {
        id: 'pr_w_grocery.coupon',
        text: 'Can I use this coupon?',
        meaning_ko: '이 쿠폰 쓸 수 있어요?',
        note: 'Coupons have an expiration date. Check it first.',
        note_ko: '쿠폰에는 유효 기간이 있습니다. 먼저 확인하세요.',
        category: 'shopping'
      },
      {
        id: 'pr_w_grocery.debit_or_credit',
        text: 'Debit or credit?',
        meaning_ko: '체크카드예요, 신용카드예요?',
        note: 'Debit takes the money from your bank account right away.',
        note_ko: 'debit은 은행 계좌에서 바로 돈이 빠져나갑니다.',
        category: 'shopping'
      },
      {
        id: 'pr_w_grocery.find_everything',
        text: 'Did you find everything okay?',
        meaning_ko: '찾으시는 건 다 찾으셨어요?',
        note: 'What cashiers ask at checkout. "I did, thanks" is enough.',
        note_ko: '계산원이 계산대에서 묻는 말입니다. "I did, thanks"면 충분합니다.',
        category: 'shopping'
      },
      {
        id: 'pr_w_grocery.ive_got_it',
        text: "I've got it.",
        meaning_ko: '제가 할 수 있어요.',
        note: 'Turns down help in a friendly way.',
        note_ko: '도움을 상냥하게 사양하는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'pr_w_grocery.on_sale',
        text: 'The sign said it was on sale.',
        meaning_ko: '표지에는 할인이라고 돼 있었어요.',
        note: '"On sale" = at a lower price. "For sale" = you can buy it.',
        note_ko: 'on sale은 할인 중, for sale은 판매 중이라는 뜻입니다.',
        category: 'shopping'
      },
      {
        id: 'pr_w_grocery.own_bags',
        text: 'I brought my own bags.',
        meaning_ko: '장바구니를 가져왔어요.',
        note: 'Many stores charge for bags or give a small discount for yours.',
        note_ko: '봉투값을 받거나, 장바구니를 가져오면 조금 깎아 주는 가게가 많습니다.',
        category: 'shopping'
      },
      {
        id: 'pr_w_grocery.rang_up_wrong',
        text: 'I think the cheese rang up wrong.',
        meaning_ko: '치즈 값이 잘못 찍힌 것 같아요.',
        note: '"I think" keeps it polite. Mistakes at the register are common.',
        note_ko: 'I think를 붙이면 공손해집니다. 계산대에서의 실수는 흔합니다.',
        category: 'shopping'
      }
    ]
  }
];

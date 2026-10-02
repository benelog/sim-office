// Derek Alvarez's first week (game days 1-7: Monday, October 5 to Sunday, October 11): the missions.
// Each episode is a conversation with its turns, its entry on the calendar and the expressions it teaches.

export const hero = 'derek';

export const episodes = [
  {
    id: 'dk_d1_coffee',
    title: "The usual at Nina's cart",
    title_ko: '니나의 카트에서 늘 마시던 걸로',
    place: 'coffee_cart',
    npc: 'nina',
    day_to: 5,
    time_from: '07:00',
    time_to: '10:30',
    summary: "You have stopped at Nina's coffee cart every morning for years. Order the usual, make a little small talk, and turn down a muffin politely.",
    summary_ko: '몇 년째 아침마다 니나의 커피 카트에 들릅니다. 늘 마시던 걸 주문하고, 가볍게 이야기를 나누고, 머핀은 정중히 사양하세요.',
    reward: -5,
    energy: 9,
    sort: 10,
    tags: 'food,coffee,regular,small-talk',
    turns: [
      {
        speaker: 'nina',
        situation: 'The coffee cart on Lake Avenue. Nina spots you in line and is already reaching for a large cup.',
        situation_ko: '레이크 애비뉴의 커피 카트입니다. 줄 서 있는 당신을 본 니나가 벌써 큰 컵을 집어 듭니다.',
        line: 'Morning, Derek! The usual?',
        line_ko: '좋은 아침이에요, 데릭! 늘 드시던 걸로요?',
        prompt: 'Nina already knows your order. Go along with it.',
        prompt_ko: '니나는 이미 당신 주문을 알고 있습니다. 그대로 부탁하세요.',
        model: 'Morning, Nina! Yeah, the usual, please.',
        model_ko: '좋은 아침이에요, 니나! 네, 늘 먹던 걸로 주세요.',
        distractors: [
          {
            text: 'Morning! Hmm, let me look at the menu first.',
            text_ko: '좋은 아침이에요! 음, 메뉴 먼저 좀 볼게요.',
            reaction: "Take your time. It's the same menu as yesterday, though.",
            reaction_ko: '천천히 보세요. 근데 어제랑 메뉴 똑같아요.'
          },
          {
            text: 'Morning, Nina! Yeah, a small iced tea, please.',
            text_ko: '좋은 아침이에요, 니나! 네, 아이스티 스몰로 주세요.',
            reaction: 'Iced tea? You? I already grabbed a large cup for your dark roast.',
            reaction_ko: '아이스티요? 데릭이요? 다크 로스트 하려고 벌써 큰 컵 집었는데요.'
          },
          {
            text: 'Obviously. Same as every day, Nina.',
            text_ko: '당연하죠. 맨날 먹는 그거요, 뻔하잖아요, 니나.',
            reaction: "Okay... somebody's not a morning person today.",
            reaction_ko: '네... 오늘은 아침부터 기분이 별로신가 봐요.'
          }
        ],
        reply_speaker: 'nina',
        reply_line: 'One large dark roast with room for cream. Coming right up!',
        reply_ko: '다크 로스트 라지, 크림 넣을 자리 남겨서. 바로 나와요!'
      },
      {
        speaker: 'nina',
        situation: 'Nina fills the cup while she talks.',
        situation_ko: '니나가 이야기하면서 컵을 채웁니다.',
        line: "So how's your morning going? Busy day ahead?",
        line_ko: '아침은 어때요? 오늘 바쁜 하루예요?',
        prompt: 'Make a little small talk: things are fine, but today will be packed.',
        prompt_ko: '가볍게 대화하세요. 지내는 건 괜찮지만 오늘은 일이 많을 거라고요.',
        model: "Can't complain. It's going to be a busy one, though.",
        model_ko: '그럭저럭 괜찮아요. 근데 오늘은 바쁠 것 같아요.',
        distractors: [
          {
            text: "Pretty quiet, actually. I've got nothing on my calendar.",
            text_ko: '사실 한가해요. 일정이 하나도 없어요.',
            reaction: 'Lucky you! Enjoy the slow day.',
            reaction_ko: '부럽네요! 여유로운 하루 즐기세요.'
          },
          {
            text: 'Honestly, terrible. I barely slept and my inbox is a disaster.',
            text_ko: '솔직히 최악이에요. 잠도 거의 못 잤고 메일함은 엉망이에요.',
            reaction: "Oh no. Well... I'll make it extra strong, I guess.",
            reaction_ko: '어머. 음... 그럼 특별히 진하게 해 드릴게요.'
          },
          {
            text: 'Busy. Can we just do the coffee, please?',
            text_ko: '바빠요. 그냥 커피나 주시면 안 될까요?',
            reaction: "Sure. Sorry, didn't mean to hold you up.",
            reaction_ko: '네. 붙잡으려던 건 아니었어요, 미안해요.'
          }
        ],
        reply_speaker: 'nina',
        reply_line: "Then you'll need this. I made it extra strong.",
        reply_ko: '그럼 이게 필요하겠네요. 특별히 진하게 내렸어요.'
      },
      {
        speaker: 'nina',
        situation: 'A tray of muffins sits next to the register. They smell great.',
        situation_ko: '계산대 옆에 머핀 한 판이 놓여 있습니다. 냄새가 아주 좋습니다.',
        line: 'Want anything to eat with that? The blueberry muffins just came in.',
        line_ko: '같이 드실 거 있어요? 블루베리 머핀 방금 들어왔어요.',
        prompt: "The muffins look good, but you're watching your sugar. Say no nicely.",
        prompt_ko: '머핀이 맛있어 보이지만 당분을 조절하는 중입니다. 기분 좋게 거절하세요.',
        model: "I'm good, thanks. I'm trying to cut back on sweets.",
        model_ko: '괜찮아요, 고마워요. 단것 좀 줄이는 중이라서요.',
        distractors: [
          {
            text: "Sure, I'll take one. Blueberry sounds great.",
            text_ko: '좋아요, 하나 주세요. 블루베리 맛있겠네요.',
            reaction: "Sure! Wait, didn't you tell me last week you were off sweets?",
            reaction_ko: '그래요! 잠깐, 지난주에 단것 끊는다고 하지 않았어요?'
          },
          {
            text: 'No. Those things are basically cake, you know.',
            text_ko: '됐어요. 그거 사실상 케이크잖아요.',
            reaction: "Wow. Okay. I'll let the bakery know.",
            reaction_ko: '와. 네. 빵집에 그렇게 전해 둘게요.'
          },
          {
            text: "I'm good, thanks. I'm trying to cut back on coffee.",
            text_ko: '괜찮아요, 고마워요. 커피를 좀 줄이는 중이라서요.',
            reaction: "Cut back on coffee? You're about to get a large dark roast, Derek.",
            reaction_ko: '커피를 줄인다고요? 지금 다크 로스트 라지 받으려는 참이잖아요, 데릭.'
          }
        ],
        reply_speaker: 'nina',
        reply_line: 'Good for you. More for me, then!',
        reply_ko: '대단하네요. 그럼 제가 더 먹죠!'
      },
      {
        speaker: 'nina',
        situation: 'She stamps your punch card. It is full.',
        situation_ko: '그녀가 쿠폰 카드에 도장을 찍습니다. 칸이 다 찼습니다.',
        line: "That's four fifty. And your card is full, so the next one's on the house.",
        line_ko: '4달러 50센트예요. 그리고 쿠폰이 다 찼으니까 다음 잔은 공짜예요.',
        prompt: 'Pay, let her keep the difference, and say goodbye warmly.',
        prompt_ko: '계산하면서 남는 돈은 가지라고 하고, 다정하게 인사하세요.',
        model: 'Thanks, Nina. Keep the change. Have a good one!',
        model_ko: '고마워요, 니나. 잔돈은 됐어요. 좋은 하루 보내요!',
        distractors: [
          {
            text: "Thanks, Nina. So that's three fifty, right? Here.",
            text_ko: '고마워요, 니나. 그러면 3달러 50센트죠? 여기요.',
            reaction: "It's four fifty, Derek. Prices went up in the spring.",
            reaction_ko: '4달러 50센트예요, 데릭. 봄에 가격 올랐잖아요.'
          },
          {
            text: "Oh, so this one's free? Thanks a lot, Nina!",
            text_ko: '오, 그럼 이번 건 공짜예요? 정말 고마워요, 니나!',
            reaction: "Ha, nice try. The next one's free, not this one.",
            reaction_ko: '하, 어림없죠. 공짜는 다음 잔이에요, 이번 거 말고요.'
          },
          {
            text: "Here's five. Fifty cents back, please. Bye.",
            text_ko: '여기 5달러요. 50센트 거슬러 주세요. 그럼.',
            reaction: "Oh. Sure, here's your fifty cents.",
            reaction_ko: '아. 네, 여기 50센트요.'
          }
        ],
        reply_speaker: 'nina',
        reply_line: "You too, Derek! Don't work too hard.",
        reply_ko: '데릭도요! 너무 무리하지 말고요.'
      }
    ],
    phrases: [
      {
        id: 'dk_d1_coffee.cant_complain',
        text: "Can't complain.",
        meaning_ko: '그럭저럭 괜찮아요.',
        note: "A modest answer to \"How's it going?\": things are fine.",
        note_ko: "\"How's it going?\"에 대한 겸손한 대답으로, 괜찮다는 뜻입니다.",
        category: 'small-talk'
      },
      {
        id: 'dk_d1_coffee.coming_right_up',
        text: 'Coming right up!',
        meaning_ko: '바로 나와요!',
        note: 'Said by staff: your order will be ready very soon.',
        note_ko: '직원이 주문한 것이 곧 나온다고 할 때 씁니다.',
        category: 'food'
      },
      {
        id: 'dk_d1_coffee.cut_back_on',
        text: "I'm trying to cut back on sweets.",
        meaning_ko: '단것을 줄이려는 중이에요.',
        note: '"Cut back on" = have less of something (sugar, coffee, spending).',
        note_ko: 'cut back on은 설탕·커피·지출 같은 것을 줄인다는 뜻입니다.',
        category: 'food'
      },
      {
        id: 'dk_d1_coffee.im_good',
        text: "I'm good, thanks.",
        meaning_ko: '괜찮아요, 됐어요.',
        note: 'A polite "no, thank you" when someone offers you something.',
        note_ko: '누가 무언가를 권할 때 정중히 사양하는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d1_coffee.on_the_house',
        text: "The next one's on the house.",
        meaning_ko: '다음 잔은 가게에서 드려요.',
        note: '"On the house" = free, paid for by the shop.',
        note_ko: 'on the house는 가게가 내는 것, 곧 공짜라는 뜻입니다.',
        category: 'food'
      },
      {
        id: 'dk_d1_coffee.room_for_cream',
        text: 'with room for cream',
        meaning_ko: '크림 넣을 자리를 남겨서',
        note: 'Ask for this so the cup is not filled to the top.',
        note_ko: '컵을 끝까지 채우지 말아 달라고 할 때 씁니다.',
        category: 'food'
      },
      {
        id: 'dk_d1_coffee.the_usual',
        text: 'The usual, please.',
        meaning_ko: '늘 먹던 걸로 주세요.',
        note: 'What a regular says instead of naming the order.',
        note_ko: '단골이 주문 내용을 말하는 대신 쓰는 표현입니다.',
        category: 'food'
      }
    ]
  },
  {
    id: 'dk_d1_buddy',
    title: 'Maya has a favor to ask',
    title_ko: '마야의 부탁',
    place: 'office_manager',
    npc: 'maya',
    day_to: 1,
    time_from: '08:30',
    time_to: '12:00',
    summary: 'A new developer starts today. Maya asks you to be his onboarding buddy. Say yes, ask about him, and be honest about your workload.',
    summary_ko: '오늘 새 개발자가 입사합니다. 마야가 온보딩 버디를 맡아 달라고 합니다. 수락하고, 그에 대해 묻고, 당신의 업무량을 솔직하게 말하세요.',
    sort: 20,
    tags: 'manager,onboarding,mentoring',
    calendar: { day: 1, time: '09:00', title: 'Quick chat with Maya', title_ko: '마야와 짧은 면담' },
    turns: [
      {
        speaker: 'maya',
        situation: 'Monday morning. Maya waves at you from her office door with a checklist in her hand.',
        situation_ko: '월요일 아침입니다. 마야가 체크리스트를 든 채 사무실 문 앞에서 손짓합니다.',
        line: 'Morning, Derek. Got a minute? I have a favor to ask.',
        line_ko: '좋은 아침이에요, 데릭. 잠깐 시간 돼요? 부탁할 게 있어요.',
        prompt: 'You have some time. Let her know, and find out what she needs.',
        prompt_ko: '시간은 있습니다. 그렇게 말하고, 무슨 일인지 알아보세요.',
        model: "Sure, I've got a few minutes. What's up?",
        model_ko: '그럼요, 몇 분 정도는 괜찮아요. 무슨 일이에요?',
        distractors: [
          {
            text: 'Not really. Could you put it in an email?',
            text_ko: '별로요. 메일로 보내 주실 수 있어요?',
            reaction: "It's quicker in person. Two minutes, I promise.",
            reaction_ko: '직접 말하는 게 빨라요. 2분이면 돼요, 약속해요.'
          },
          {
            text: 'Sure, whatever it is, the answer is yes.',
            text_ko: '그럼요, 뭔지 몰라도 무조건 할게요. 다 좋아요.',
            reaction: "Careful. You haven't even heard it yet.",
            reaction_ko: '조심해요. 아직 들어 보지도 않았잖아요.'
          },
          {
            text: 'Sure. Uh-oh, did I break something?',
            text_ko: '네. 이런, 제가 뭐 망가뜨렸어요?',
            reaction: "No, nothing's broken. It's a favor, remember?",
            reaction_ko: '아뇨, 망가진 건 없어요. 부탁이라니까요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Our new developer, Jun, starts today. I'd like you to be his onboarding buddy.",
        reply_ko: '새 개발자 준이 오늘 입사해요. 당신이 온보딩 버디를 맡아 주면 좋겠어요.'
      },
      {
        speaker: 'maya',
        situation: 'She turns her laptop so you can see the onboarding checklist.',
        situation_ko: '그녀가 노트북을 돌려 온보딩 체크리스트를 보여 줍니다.',
        line: 'It means showing him the ropes for the first few weeks: the setup, the codebase, how we work. Are you up for it?',
        line_ko: '처음 몇 주 동안 이것저것 알려 주는 거예요. 개발 환경 설정, 코드베이스, 우리가 일하는 방식 같은 거요. 해 줄 수 있어요?',
        prompt: "Agree, and find out what experience he's coming in with.",
        prompt_ko: '수락하고, 그가 어떤 경력을 가지고 오는지 알아보세요.',
        model: "I'd be happy to. What's his background?",
        model_ko: '기꺼이 할게요. 어떤 경력이 있는 사람이에요?',
        distractors: [
          {
            text: 'I guess so. Does it have to be me, though?',
            text_ko: '그러죠, 뭐. 근데 꼭 제가 해야 해요?',
            reaction: "It doesn't have to be, but you're my first choice.",
            reaction_ko: '꼭 그런 건 아니지만, 당신이 1순위예요.'
          },
          {
            text: "I'd be happy to. When does he start, then?",
            text_ko: '기꺼이 할게요. 그럼 언제부터 출근해요?',
            reaction: "Today, Derek. He's probably in the lobby already.",
            reaction_ko: '오늘이요, 데릭. 아마 벌써 로비에 와 있을 거예요.'
          },
          {
            text: 'Sure. Is he any good, or just a body?',
            text_ko: '그러죠. 잘하는 사람이에요, 아니면 그냥 머릿수예요?',
            reaction: "He's a person, Derek. And yes, he's good.",
            reaction_ko: '사람이에요, 데릭. 그리고 네, 잘해요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Three years of backend work in Seoul. This is his first job in the US, so a lot will be new to him.',
        reply_ko: '서울에서 백엔드 개발을 3년 했어요. 미국에서는 첫 직장이라 낯선 게 많을 거예요.'
      },
      {
        speaker: 'maya',
        situation: 'Maya knows your sprint is already full.',
        situation_ko: '마야는 당신의 스프린트가 이미 꽉 찼다는 것을 압니다.',
        line: "I know you're busy with the checkout rebuild. Do you have the bandwidth for this?",
        line_ko: '결제 개편으로 바쁜 거 알아요. 이것까지 맡을 여유가 있어요?',
        prompt: 'Say yes, but be honest that your sprint is full and something may have to slip.',
        prompt_ko: '하겠다고 하되, 스프린트가 꽉 차서 뭔가 밀릴 수도 있다고 솔직히 말하세요.',
        model: 'I can make time, but I might need to push one of my tickets to the next sprint.',
        model_ko: '시간은 낼 수 있어요. 다만 제 티켓 하나는 다음 스프린트로 미뤄야 할 수도 있어요.',
        distractors: [
          {
            text: 'No problem at all. I can easily do it on top of everything else without anything slipping.',
            text_ko: '전혀 문제없어요. 다른 일 하나도 안 밀리고 전부 거뜬히 같이 할 수 있어요.',
            reaction: "Derek, your sprint is already full. Let's be realistic.",
            reaction_ko: '데릭, 스프린트 이미 꽉 찼잖아요. 현실적으로 생각해요.'
          },
          {
            text: "Honestly, I don't. Could you ask someone else to take him this time?",
            text_ko: '솔직히 여유가 없어요. 이번엔 다른 사람한테 부탁해 주실 수 있어요?',
            reaction: "Hm. I was really hoping it'd be you.",
            reaction_ko: '음. 꼭 당신이 맡아 주길 바랐는데요.'
          },
          {
            text: "I can make time, but I'll need you to cancel all of my meetings for the next month.",
            text_ko: '시간은 낼게요. 대신 한 달 동안 제 회의를 전부 빼 주셔야 해요.',
            reaction: "All of them? That's a lot. What's the smallest thing that would help?",
            reaction_ko: '전부요? 그건 좀 많네요. 최소한 뭐가 있으면 될까요?'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "That's reasonable. Tell Priya which one, and I'll back you up.",
        reply_ko: '그럴 만해요. 어느 티켓인지 프리야에게 말해요. 제가 힘을 실어 줄게요.'
      },
      {
        speaker: 'maya',
        situation: 'She checks a box on her list.',
        situation_ko: '그녀가 목록의 칸 하나에 체크합니다.',
        line: 'One more thing. When you review his first pull request, be kind but honest, okay?',
        line_ko: '하나 더요. 그 친구 첫 풀 리퀘스트를 리뷰할 때, 친절하되 솔직하게 해 줘요, 알았죠?',
        prompt: 'Agree, and promise to keep a close eye on him during his first week.',
        prompt_ko: '그러겠다고 하고, 첫 주 동안 그를 꼼꼼히 챙기겠다고 약속하세요.',
        model: "Of course. I'll check in with him every day this week.",
        model_ko: '물론이죠. 이번 주에는 매일 그 친구 상황을 살필게요.',
        distractors: [
          {
            text: "Of course. I'll just approve it so he doesn't feel bad.",
            text_ko: '물론이죠. 기분 상하지 않게 그냥 승인해 줄게요.',
            reaction: "Kind, yes. But honest, too. A rubber stamp won't help him.",
            reaction_ko: '친절하게는 맞아요. 하지만 솔직하게도요. 무조건 승인은 도움이 안 돼요.'
          },
          {
            text: "Sure, but I don't sugarcoat. He'll have to toughen up.",
            text_ko: '네, 근데 전 돌려 말 안 해요. 알아서 버텨야죠.',
            reaction: "It's his first day, Derek. Kind and honest. Both.",
            reaction_ko: '입사 첫날이에요, 데릭. 친절하고 솔직하게. 둘 다요.'
          },
          {
            text: "Of course. I'll have Priya review it. She knows the code.",
            text_ko: '물론이죠. 프리야한테 리뷰를 맡길게요. 코드를 잘 아니까요.',
            reaction: "Priya? She's our PM. I need you on the code review.",
            reaction_ko: '프리야요? 그녀는 PM이에요. 코드 리뷰는 당신이 해 줘야죠.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Perfect. Let me know if you have any questions.',
        reply_ko: '좋아요. 궁금한 게 있으면 말해 줘요.'
      }
    ],
    phrases: [
      {
        id: 'dk_d1_buddy.back_you_up',
        text: "I'll back you up.",
        meaning_ko: '제가 힘을 실어 줄게요.',
        note: '"Back someone up" = support them, especially in front of others.',
        note_ko: 'back someone up은 특히 다른 사람들 앞에서 편들어 준다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d1_buddy.bandwidth',
        text: 'Do you have the bandwidth for this?',
        meaning_ko: '이걸 할 여력이 있어요?',
        note: '"Bandwidth" = time and energy for more work.',
        note_ko: 'bandwidth는 일을 더 맡을 시간과 여력을 뜻합니다.',
        category: 'office'
      },
      {
        id: 'dk_d1_buddy.check_in_with',
        text: "I'll check in with him every day.",
        meaning_ko: '매일 그를 살펴볼게요.',
        note: 'A short, friendly talk to see how someone is doing.',
        note_ko: '잘 지내는지 짧게 살펴보는 것을 말합니다.',
        category: 'office'
      },
      {
        id: 'dk_d1_buddy.favor_to_ask',
        text: 'I have a favor to ask.',
        meaning_ko: '부탁이 하나 있어요.',
        note: 'Said before asking someone to do something for you.',
        note_ko: '무언가를 부탁하기 전에 하는 말입니다.',
        category: 'office'
      },
      {
        id: 'dk_d1_buddy.got_a_minute',
        text: 'Got a minute?',
        meaning_ko: '잠깐 시간 돼요?',
        note: 'A casual way to start a short talk at work.',
        note_ko: '직장에서 짧은 이야기를 시작할 때 편하게 쓰는 말입니다.',
        category: 'office'
      },
      {
        id: 'dk_d1_buddy.happy_to',
        text: "I'd be happy to.",
        meaning_ko: '기꺼이 할게요.',
        note: 'A warm way to agree to a request.',
        note_ko: '부탁을 흔쾌히 받아들이는 말입니다.',
        category: 'office'
      },
      {
        id: 'dk_d1_buddy.show_the_ropes',
        text: 'show him the ropes',
        meaning_ko: '그에게 일하는 요령을 알려 주다',
        note: 'Teach a newcomer how things are done.',
        note_ko: '새로 온 사람에게 일하는 방법을 가르쳐 준다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d1_buddy.up_for_it',
        text: 'Are you up for it?',
        meaning_ko: '해 볼 마음 있어요?',
        note: 'Asks if someone is willing and has the energy to do something.',
        note_ko: '할 마음과 여력이 있는지 묻는 말입니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'dk_d1_standup',
    title: 'Your status update',
    title_ko: '스탠드업에서 현황 공유',
    place: 'office_meeting',
    npc: 'priya',
    day_to: 1,
    time_from: '09:30',
    time_to: '12:30',
    summary: 'The Monday standup. Give a crisp update: what you wrapped up, what you are picking up, what you are waiting on. Keep a side topic out of the meeting.',
    summary_ko: '월요일 스탠드업입니다. 끝낸 일, 새로 맡는 일, 기다리는 일을 간결하게 공유하세요. 곁가지 주제는 회의 밖으로 돌리세요.',
    sort: 30,
    tags: 'meeting,standup,status',
    calendar: { day: 1, time: '10:00', title: 'Daily standup', title_ko: '데일리 스탠드업' },
    turns: [
      {
        speaker: 'priya',
        situation: 'The team stands around the screen in the meeting room. Jun, the new hire, has just introduced himself.',
        situation_ko: '팀이 회의실 화면 앞에 둘러서 있습니다. 신입 준이 방금 자기소개를 마쳤습니다.',
        line: "Okay, let's keep going. Derek, you're up. Where are we with the checkout API?",
        line_ko: '자, 계속하죠. 데릭 차례예요. 결제 API는 어디까지 됐어요?',
        prompt: "Give your update: you finished the checkout API work last week, and it's waiting on a reviewer.",
        prompt_ko: '근황을 말하세요. 결제 API 작업은 지난주에 끝났고, 지금 리뷰를 기다리고 있습니다.',
        model: "Last week I wrapped up the checkout API changes. They're in review now.",
        model_ko: '결제 API 수정은 지난주에 마무리했어요. 지금 리뷰 중이에요.',
        distractors: [
          {
            text: "Last week I wrapped up the checkout API changes. They're live in production now.",
            text_ko: '결제 API 수정은 지난주에 끝냈고요. 지금 운영 환경에 배포돼 있어요.',
            reaction: 'Live already? I thought it still needed a review.',
            reaction_ko: '벌써 배포됐어요? 아직 리뷰가 필요한 줄 알았는데요.'
          },
          {
            text: "Well, it's a long story. Let me walk you through every file I touched.",
            text_ko: '음, 얘기가 길어요. 제가 고친 파일을 하나하나 다 설명할게요.',
            reaction: "Maybe the short version? We've got a few more people to go.",
            reaction_ko: '짧게 해 줄래요? 아직 몇 명 더 남았어요.'
          },
          {
            text: "It's done, but nobody has reviewed it yet. Not sure what everyone's doing.",
            text_ko: '다 됐는데 아직 아무도 리뷰를 안 했어요. 다들 뭐 하는지 모르겠네요.',
            reaction: "Okay... let's not call people out in standup.",
            reaction_ko: '음... 스탠드업에서 누굴 탓하진 말죠.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'Nice. One less thing on the board.',
        reply_ko: '좋아요. 보드에서 하나 줄었네요.'
      },
      {
        speaker: 'priya',
        situation: 'Priya moves your card on the board.',
        situation_ko: '프리야가 보드에서 당신의 카드를 옮깁니다.',
        line: "And what's on your plate today?",
        line_ko: '그럼 오늘은 뭐 해요?',
        prompt: 'Tell her your plan for today: the saved cards ticket, plus getting Jun up and running.',
        prompt_ko: '오늘 계획을 말하세요. 저장된 카드 티켓, 그리고 준이 일을 시작할 수 있게 돕는 것.',
        model: "Today I'm picking up the saved cards ticket and helping Jun get set up.",
        model_ko: '오늘은 저장된 카드 티켓을 시작하고, 준의 환경 설정을 도울 거예요.',
        distractors: [
          {
            text: "Today I'm picking up the gift card ticket and helping Jun get his laptop set up.",
            text_ko: '오늘은 기프트 카드 티켓을 시작하고, 준의 노트북 환경 설정을 도울 거예요.',
            reaction: "Gift cards? That's not even on the board yet.",
            reaction_ko: '기프트 카드요? 그건 아직 보드에도 없는데요.'
          },
          {
            text: "I'm mostly blocked today, so not much going on until I hear back from someone.",
            text_ko: '오늘은 거의 막혀 있어서, 누가 답을 줄 때까진 별로 할 게 없어요.',
            reaction: "Hold that thought, we'll get to blockers. What are you picking up?",
            reaction_ko: '그건 잠깐만요, 블로커는 이따 해요. 오늘 맡을 건요?'
          },
          {
            text: "Today I'm finishing saved cards and gift cards, and onboarding Jun.",
            text_ko: '오늘 저장된 카드랑 기프트 카드 다 끝내고, 준 온보딩도 할게요.',
            reaction: "All in one day? Let's be realistic, Derek.",
            reaction_ko: '그걸 하루에 다요? 현실적으로 가요, 데릭.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'Great. Thanks for looking after him.',
        reply_ko: '좋아요. 준을 챙겨 줘서 고마워요.'
      },
      {
        speaker: 'priya',
        situation: 'She looks up from her laptop.',
        situation_ko: '그녀가 노트북에서 고개를 듭니다.',
        line: 'Any blockers?',
        line_ko: '블로커 있어요?',
        prompt: "Summit Retail still hasn't sent you their API keys. Ask Priya to chase it.",
        prompt_ko: '서밋 리테일이 아직 API 키를 보내지 않았습니다. 프리야에게 챙겨 달라고 하세요.',
        model: "Just one. I'm still waiting on the API keys from Summit Retail. Could you follow up with them?",
        model_ko: '하나 있어요. 서밋 리테일 API 키를 아직 기다리고 있어요. 그쪽에 확인 좀 해 주시겠어요?',
        distractors: [
          {
            text: "Nope, nothing's really blocking me. I'll ping you later if the Summit Retail keys don't show up.",
            text_ko: '아뇨, 딱히 막힌 건 없어요. 서밋 리테일 키가 안 오면 나중에 말씀드릴게요.',
            reaction: "Wait, you don't have their keys yet? That sounds like a blocker.",
            reaction_ko: '잠깐, 아직 키를 못 받았어요? 그게 블로커 같은데요.'
          },
          {
            text: "Just one. I'm still waiting on the API keys from Sam in IT. Could you follow up with him?",
            text_ko: '하나 있어요. IT팀 샘한테서 API 키를 아직 기다리고 있어요. 그쪽에 확인 좀 해 주시겠어요?',
            reaction: 'Sam? I thought the keys were coming from the client.',
            reaction_ko: '샘이요? 키는 고객사에서 오는 줄 알았는데요.'
          },
          {
            text: "Just one. Summit Retail is dragging their feet as usual. Can you light a fire under Greg's team?",
            text_ko: '하나 있어요. 서밋 리테일이 늘 그렇듯 늑장을 부리네요. 그렉네 팀에 불 좀 붙여 주실래요?',
            reaction: "Easy. Greg's a client, not a teammate.",
            reaction_ko: '진정해요. 그렉은 고객이지, 우리 팀원이 아니에요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "I'll ping Greg's team right after this.",
        reply_ko: '끝나자마자 그렉 팀에 연락할게요.'
      },
      {
        speaker: 'priya',
        situation: 'The standup is at minute twelve. Priya remembers one more thing.',
        situation_ko: '스탠드업이 12분째입니다. 프리야가 한 가지를 더 떠올립니다.',
        line: 'Oh, and Summit Retail asked about gift card support. Derek, how big is that? Can we talk it through now?',
        line_ko: '아, 그리고 서밋 리테일이 기프트 카드 지원에 대해 물어봤어요. 데릭, 그거 얼마나 큰 일이에요? 지금 같이 얘기해 볼 수 있을까요?',
        prompt: "This would eat up everyone's time. Suggest discussing it later, just the two of you.",
        prompt_ko: '다 같이 시간을 뺏길 이야기입니다. 나중에 둘이서 따로 이야기하자고 하세요.',
        model: "Let's take that offline. I don't want to hold up the standup.",
        model_ko: '그건 따로 얘기하죠. 스탠드업을 붙잡아 두고 싶진 않아요.',
        distractors: [
          {
            text: "Sure, let's dig in right now. So first, the payment form would need...",
            text_ko: '좋아요, 지금 바로 파 보죠. 우선 결제 양식에 필요한 게...',
            reaction: "Hmm, we're at minute twelve already...",
            reaction_ko: '음, 벌써 12분째인데요...'
          },
          {
            text: "That's small. Probably two days. You can tell them yes.",
            text_ko: '그건 작아요. 아마 이틀이면 돼요. 된다고 하셔도 돼요.',
            reaction: "Two days? You're sure? I'll pass that on to Greg.",
            reaction_ko: '이틀이요? 확실해요? 그렉한테 그렇게 전할게요.'
          },
          {
            text: "Not now, Priya. This isn't the place for that.",
            text_ko: '지금은 아니에요, 프리야. 여기서 할 얘기가 아니에요.',
            reaction: 'Okay. No need to snap at me.',
            reaction_ko: '알겠어요. 쏘아붙일 필요까진 없잖아요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Good call. I'll put thirty minutes on our calendars for tomorrow.",
        reply_ko: '좋은 판단이에요. 내일 30분 일정을 잡아 둘게요.'
      }
    ],
    phrases: [
      {
        id: 'dk_d1_standup.follow_up',
        text: 'Could you follow up with them?',
        meaning_ko: '그쪽에 다시 확인해 주시겠어요?',
        note: '"Follow up" = contact someone again about something still open.',
        note_ko: 'follow up은 아직 끝나지 않은 일로 다시 연락하는 것입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d1_standup.hold_up',
        text: "I don't want to hold up the standup.",
        meaning_ko: '스탠드업을 붙잡아 두고 싶지 않아요.',
        note: '"Hold up" = delay.',
        note_ko: 'hold up은 지연시키다라는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d1_standup.in_review',
        text: "They're in review now.",
        meaning_ko: '지금 리뷰 중이에요.',
        note: 'The code is waiting for a teammate to review it.',
        note_ko: '코드가 동료의 리뷰를 기다리는 상태입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d1_standup.picking_up',
        text: "I'm picking up the saved cards ticket.",
        meaning_ko: '저장된 카드 티켓을 맡아서 시작해요.',
        note: '"Pick up a ticket" = take it and start working on it.',
        note_ko: 'pick up a ticket은 티켓을 맡아 일을 시작한다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d1_standup.take_offline',
        text: "Let's take that offline.",
        meaning_ko: '그건 따로 이야기하죠.',
        note: 'Moves a side topic out of the meeting so it can end on time.',
        note_ko: '곁가지 주제를 회의 밖으로 돌려 회의를 제때 끝내게 합니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d1_standup.waiting_on',
        text: "I'm still waiting on the API keys.",
        meaning_ko: '아직 API 키를 기다리고 있어요.',
        note: '"Waiting on" something = you cannot go on until you get it.',
        note_ko: 'waiting on은 그것을 받아야 일을 계속할 수 있다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d1_standup.where_are_we',
        text: 'Where are we with the checkout API?',
        meaning_ko: '결제 API는 어디까지 됐어요?',
        note: '"Where are we with …?" asks for the status of a piece of work.',
        note_ko: '"Where are we with …?"는 일의 진행 상황을 묻는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d1_standup.wrapped_up',
        text: 'I wrapped up the API changes.',
        meaning_ko: 'API 수정을 마무리했어요.',
        note: '"Wrap up" = finish.',
        note_ko: 'wrap up은 끝내다라는 뜻입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'dk_d1_welcome',
    title: 'Welcoming the new hire',
    title_ko: '신입 맞이하기',
    place: 'office_desk',
    npc: 'jun',
    day_to: 1,
    time_from: '09:30',
    time_to: '17:30',
    requires: 'dk_d1_buddy',
    summary: 'Jun is at the desk next to yours on his first day. Welcome him, walk him through the dev setup, and make it easy for him to ask questions.',
    summary_ko: '준이 첫 출근 날 당신 옆자리에 있습니다. 반갑게 맞이하고, 개발 환경 설정을 차근차근 알려 주고, 편하게 질문할 수 있게 해 주세요.',
    sort: 40,
    tags: 'coworker,mentoring,onboarding',
    calendar: { day: 1, time: '11:00', title: 'Welcome Jun and help with his dev setup', title_ko: '준 맞이하기, 개발 환경 세팅 돕기' },
    turns: [
      {
        speaker: 'jun',
        situation: 'A young man is unpacking a new laptop at the desk next to yours. You stuck a "Welcome!" note on his monitor this morning.',
        situation_ko: '당신 옆자리에서 한 청년이 새 노트북을 꺼내고 있습니다. 오늘 아침 당신이 그의 모니터에 "Welcome!" 쪽지를 붙여 두었습니다.',
        line: 'Oh, hi. Excuse me, are you Derek? Maya said I should come find you.',
        line_ko: '아, 안녕하세요. 실례지만 데릭 맞으세요? 마야가 찾아가 보라고 해서요.',
        prompt: 'This is the new hire. Confirm who you are and make him feel welcome.',
        prompt_ko: '새로 온 직원입니다. 당신이 누군지 확인해 주고 반갑게 맞아 주세요.',
        model: "That's me. You must be Jun. Welcome to the team!",
        model_ko: '네, 저예요. 준이죠? 팀에 온 걸 환영해요!',
        distractors: [
          {
            text: "That's me. You must be Tom. Welcome to the team!",
            text_ko: '네, 저예요. 톰이죠? 팀에 온 걸 환영해요!',
            reaction: "Um, it's Jun, actually. Jun Kim.",
            reaction_ko: '어, 준이에요. 준 김이요.'
          },
          {
            text: "Yeah. Give me a minute, I'm in the middle of something.",
            text_ko: '네. 잠깐만요, 지금 하던 게 있어서요.',
            reaction: "Oh, sorry. I'll... wait over here.",
            reaction_ko: '아, 죄송해요. 저기서... 기다릴게요.'
          },
          {
            text: "That's me. Did Maya send over your paperwork?",
            text_ko: '네, 저예요. 마야가 서류 같은 거 보내라던가요?',
            reaction: "Paperwork? I don't think so. She just said to find you.",
            reaction_ko: '서류요? 아닐 거예요. 그냥 데릭을 찾아가라고만 했어요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Thank you! Nice to meet you. I'm a little nervous, honestly.",
        reply_ko: '감사합니다! 만나서 반갑습니다. 사실 조금 긴장돼요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun opens the laptop. The screen is still empty.',
        situation_ko: '준이 노트북을 엽니다. 화면은 아직 텅 비어 있습니다.',
        line: "I haven't set up my dev environment yet. Where should I start?",
        line_ko: '아직 개발 환경 설정을 못 했어요. 어디서부터 시작하면 될까요?',
        prompt: 'Offer to guide him step by step, and point him to the setup doc in the repo.',
        prompt_ko: '차근차근 같이 하자고 하고, 저장소의 설치 안내 문서부터 보라고 하세요.',
        model: 'No worries. Let me walk you through it. Start with the README in the repo.',
        model_ko: '걱정 마요. 제가 하나씩 알려 줄게요. 저장소의 README부터 시작해요.',
        distractors: [
          {
            text: "It's all in the docs somewhere in the wiki. You'll figure it out on your own, I'm sure.",
            text_ko: '위키 어딘가 문서에 다 있어요. 혼자서도 알아서 할 수 있을 거예요.',
            reaction: "Oh... okay. I'll try to find it.",
            reaction_ko: '아... 네. 한번 찾아볼게요.'
          },
          {
            text: 'No worries. Skip the docs and just start fixing bugs right away.',
            text_ko: '걱정 마요. 문서는 건너뛰고, 그냥 바로 버그부터 고치기 시작해요.',
            reaction: "Without setting anything up? Won't the code fail to run?",
            reaction_ko: '아무것도 설정 안 하고요? 그럼 코드가 안 돌지 않나요?'
          },
          {
            text: "Let me just set it all up for you tonight. You don't really need to learn any of it.",
            text_ko: '오늘 밤에 제가 다 설정해 둘게요. 그런 건 굳이 하나도 배울 필요 없어요.',
            reaction: "That's kind, but I'd like to learn how it works.",
            reaction_ko: '감사하지만, 저도 어떻게 하는지 배우고 싶어요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Great. I'll clone the repo right now.",
        reply_ko: '좋아요. 지금 바로 저장소를 클론할게요.'
      },
      {
        speaker: 'jun',
        situation: "The setup script prints a wall of red text. Jun's face falls.",
        situation_ko: '설치 스크립트가 빨간 글씨를 가득 쏟아 냅니다. 준의 얼굴이 어두워집니다.',
        line: 'Um, the tests are failing on my machine. Did I break something?',
        line_ko: '어, 제 컴퓨터에서 테스트가 실패해요. 제가 뭘 망가뜨린 건가요?',
        prompt: "He's panicking. Calm him down: this is normal for a first day.",
        prompt_ko: '그가 당황했습니다. 진정시키세요. 첫날에는 흔한 일이라고요.',
        model: "Don't worry, you didn't break anything. It happens to everybody on day one.",
        model_ko: '걱정 마요, 망가뜨린 거 없어요. 첫날엔 다들 이래요.',
        distractors: [
          {
            text: 'Hmm, maybe. Did you change any of the config before you ran the setup script?',
            text_ko: '음, 그럴 수도요. 스크립트 돌리기 전에 설정 뭐 건드렸어요?',
            reaction: 'No, I just ran it like the README said...',
            reaction_ko: '아뇨, README에 나온 대로 실행만 했는데요...'
          },
          {
            text: "Don't worry about the tests. Just skip them for now and push your code anyway.",
            text_ko: '테스트는 신경 쓰지 마요. 일단 건너뛰고 그냥 코드 올려요.',
            reaction: 'Skip them? Is that... allowed here?',
            reaction_ko: '건너뛰라고요? 여기선 그래도... 돼요?'
          },
          {
            text: "Wow, day one and you already broke the build? That's a record.",
            text_ko: '와, 첫날부터 빌드를 깨뜨렸어요? 신기록이네요.',
            reaction: 'Oh no. I knew it.',
            reaction_ko: '아, 이런. 그럴 줄 알았어요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "That's a relief. I thought I broke the build on my first day.",
        reply_ko: '다행이네요. 첫날부터 빌드를 깨뜨린 줄 알았어요.'
      },
      {
        speaker: 'jun',
        situation: 'You fix the missing setting together. The tests turn green.',
        situation_ko: '빠진 설정을 함께 고칩니다. 테스트가 초록색으로 바뀝니다.',
        line: "Sorry, I have so many questions. I don't want to bother you.",
        line_ko: '죄송해요, 질문이 너무 많네요. 귀찮게 해 드리고 싶진 않은데.',
        prompt: 'Make it clear his questions are welcome, whenever he has them.',
        prompt_ko: '질문은 언제든 환영이라는 걸 확실히 알려 주세요.',
        model: "You're not bothering me. Just ping me anytime. There are no dumb questions.",
        model_ko: '전혀 귀찮지 않아요. 언제든 메시지 보내요. 바보 같은 질문은 없어요.',
        distractors: [
          {
            text: "That's okay. Maybe save them up, though, and ask me all at once at the end of the day.",
            text_ko: '괜찮아요. 근데 모아 뒀다가 퇴근할 때 한꺼번에 물어봐요.',
            reaction: "Oh, okay. I'll write them down and wait.",
            reaction_ko: '아, 네. 적어 두고 기다릴게요.'
          },
          {
            text: 'Most of it is in the docs. Try searching there before you ask me.',
            text_ko: '웬만한 건 문서에 있어요. 저한테 묻기 전에 먼저 찾아봐요.',
            reaction: "Right. Sorry. I'll look there first.",
            reaction_ko: '그렇죠. 죄송해요. 먼저 찾아볼게요.'
          },
          {
            text: "Don't worry. I'll ask Maya to find you someone with more time.",
            text_ko: '걱정 마요. 마야한테 시간 여유 있는 사람을 찾아 달라고 할게요.',
            reaction: "Oh, no, I didn't mean... I'm happy working with you.",
            reaction_ko: '아, 아니에요, 그런 뜻이 아니라... 데릭이랑 하는 게 좋아요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Thanks, Derek. That really helps.',
        reply_ko: '고마워요, 데릭. 정말 도움이 돼요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun opens the ticket board.',
        situation_ko: '준이 티켓 보드를 엽니다.',
        line: 'What should I work on first, once everything is running?',
        line_ko: '다 돌아가게 되면, 뭐부터 하면 될까요?',
        prompt: "Suggest an easy first task, and say you'll look at his code tomorrow morning.",
        prompt_ko: '부담 없는 첫 과제를 권하고, 내일 아침에 그의 코드를 봐 주겠다고 하세요.',
        model: "Start with a small bug fix and open a pull request. I'll review it first thing tomorrow.",
        model_ko: '작은 버그 수정부터 해서 풀 리퀘스트를 올려요. 내일 아침에 제일 먼저 리뷰할게요.',
        distractors: [
          {
            text: "Start with the checkout rebuild. It's the biggest project we have right now.",
            text_ko: '결제 개편부터 해요. 지금 우리 프로젝트 중에 제일 큰 거예요.',
            reaction: 'The whole rebuild? On my first day?',
            reaction_ko: '개편 전체를요? 첫날에요?'
          },
          {
            text: "Start with a small bug fix and open a pull request. I'll review it sometime late next week.",
            text_ko: '작은 버그 수정부터 해서 풀 리퀘스트를 올려요. 다음 주 후반쯤 리뷰할게요.',
            reaction: "Next week? Okay... I'll just wait, then.",
            reaction_ko: '다음 주요? 네... 그럼 기다릴게요.'
          },
          {
            text: "Just read the code for a few weeks. Don't open any pull requests yet.",
            text_ko: '몇 주 동안은 코드만 읽어요. 풀 리퀘스트는 아직 올리지 말고요.',
            reaction: 'A few weeks? I was hoping to ship something soon.',
            reaction_ko: '몇 주나요? 빨리 뭔가 올려 보고 싶었는데요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Sounds good. I'll have it up by tonight.",
        reply_ko: '좋아요. 오늘 밤까지 올릴게요.'
      }
    ],
    phrases: [
      {
        id: 'dk_d1_welcome.didnt_break',
        text: "You didn't break anything.",
        meaning_ko: '망가뜨린 거 없어요.',
        note: 'Reassures someone who thinks a problem is their fault.',
        note_ko: '문제가 자기 탓이라고 생각하는 사람을 안심시킵니다.',
        category: 'office'
      },
      {
        id: 'dk_d1_welcome.first_thing',
        text: "I'll review it first thing tomorrow.",
        meaning_ko: '내일 아침에 제일 먼저 리뷰할게요.',
        note: '"First thing" = before anything else in the morning.',
        note_ko: 'first thing은 아침에 다른 일보다 먼저라는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d1_welcome.no_dumb_questions',
        text: 'There are no dumb questions.',
        meaning_ko: '바보 같은 질문은 없어요.',
        note: 'Encourages a newcomer to ask anything.',
        note_ko: '새로 온 사람이 무엇이든 묻도록 북돋는 말입니다.',
        category: 'office'
      },
      {
        id: 'dk_d1_welcome.ping_me_anytime',
        text: 'Just ping me anytime.',
        meaning_ko: '언제든 메시지 줘요.',
        note: '"Ping" = send a short chat message.',
        note_ko: 'ping은 짧은 채팅 메시지를 보낸다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d1_welcome.thats_a_relief',
        text: "That's a relief.",
        meaning_ko: '다행이네요.',
        note: 'Said when a worry turns out to be nothing.',
        note_ko: '걱정하던 일이 별것 아니었을 때 하는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d1_welcome.walk_you_through',
        text: 'Let me walk you through it.',
        meaning_ko: '차근차근 알려 줄게요.',
        note: '"Walk someone through" = explain something step by step.',
        note_ko: 'walk someone through는 단계별로 설명해 준다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d1_welcome.welcome_to_team',
        text: 'Welcome to the team!',
        meaning_ko: '팀에 온 걸 환영해요!',
        note: 'Said to a new teammate on the first day.',
        note_ko: '새 팀원에게 첫날 하는 말입니다.',
        category: 'office'
      },
      {
        id: 'dk_d1_welcome.you_must_be',
        text: 'You must be Jun.',
        meaning_ko: '준이군요.',
        note: 'A friendly way to greet someone you were expecting.',
        note_ko: '기다리던 사람을 반갑게 맞이하는 말입니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'dk_d2_review',
    title: 'Talking through the review',
    title_ko: '리뷰 코멘트 함께 보기',
    place: 'office_desk',
    npc: 'jun',
    day_from: 2,
    day_to: 2,
    time_from: '09:00',
    time_to: '17:30',
    summary: "You left twelve comments on Jun's first pull request, and he looks worried. Talk him through them: praise first, the one real issue, then the nits.",
    summary_ko: '준의 첫 풀 리퀘스트에 코멘트를 열두 개 남겼더니 그가 걱정스러워 보입니다. 칭찬부터 하고, 진짜 문제 하나와 사소한 지적들을 차례로 설명해 주세요.',
    sort: 10,
    tags: 'dev,code-review,feedback,mentoring',
    calendar: { day: 2, time: '11:00', title: 'Walk Jun through the review comments', title_ko: '준과 리뷰 코멘트 함께 보기' },
    turns: [
      {
        speaker: 'jun',
        situation: "You roll your chair over to Jun's desk with your coffee. He has your review open on his screen.",
        situation_ko: '커피를 들고 의자를 굴려 준의 자리로 갑니다. 그의 화면에 당신의 리뷰가 열려 있습니다.',
        line: 'Good morning. I saw your comments on my pull request. There are twelve of them. Is it that bad?',
        line_ko: '좋은 아침이에요. 제 풀 리퀘스트에 남기신 코멘트 봤어요. 열두 개나 되던데요. 그렇게 별로예요?',
        prompt: "He's worried about the twelve comments. Put them in perspective: the work is good, and most are minor.",
        prompt_ko: '코멘트 열두 개에 걱정이 많습니다. 작업은 좋았고 대부분은 사소한 것이라고 짚어 주세요.',
        model: "Not at all. It's a solid first pull request. Most of my comments are just nits.",
        model_ko: '전혀요. 첫 풀 리퀘스트로 탄탄해요. 코멘트 대부분은 그냥 사소한 거예요.',
        distractors: [
          {
            text: "Not at all. It's a solid first pull request. I only left two or three comments.",
            text_ko: '전혀요. 첫 풀 리퀘스트로 탄탄해요. 코멘트는 두세 개밖에 안 남겼어요.',
            reaction: 'Two or three? I counted twelve...',
            reaction_ko: '두세 개요? 저는 열두 개로 셌는데요...'
          },
          {
            text: 'Honestly, it needs a lot of work. Twelve comments is a lot for one PR.',
            text_ko: '솔직히 손볼 게 많아요. PR 하나에 코멘트 열두 개면 많은 거죠.',
            reaction: "Oh. I see. I'll... try harder.",
            reaction_ko: '아. 그렇군요. 더... 열심히 할게요.'
          },
          {
            text: "Don't worry about the comments yet. We can go through them sometime next week.",
            text_ko: '코멘트는 아직 신경 쓰지 마요. 다음 주쯤 같이 훑어봐요.',
            reaction: "Next week? But I'd like to fix them today.",
            reaction_ko: '다음 주요? 오늘 고치고 싶은데요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Oh, good. I was worried all night.',
        reply_ko: '아, 다행이에요. 밤새 걱정했어요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun scrolls through the comments.',
        situation_ko: '준이 코멘트를 쭉 내려 봅니다.',
        line: 'Which comment is the most important one?',
        line_ko: '어떤 코멘트가 제일 중요해요?',
        prompt: 'Point out the real issue: a failed payment call goes unnoticed.',
        prompt_ko: '진짜 문제를 짚어 주세요. 결제 호출이 실패해도 아무도 모르고 넘어간다는 거요.',
        model: 'The main one is error handling. Right now, if the payment call fails, we swallow the error.',
        model_ko: '제일 중요한 건 오류 처리예요. 지금은 결제 호출이 실패하면 오류를 그냥 삼켜 버려요.',
        distractors: [
          {
            text: 'The main one is the variable names. Names like "data2" make the code hard to follow.',
            text_ko: '제일 중요한 건 변수 이름이에요. "data2" 같은 이름은 코드를 따라가기 힘들게 해요.',
            reaction: 'The names? I thought you said those were just nits.',
            reaction_ko: '이름이요? 그건 사소한 거라고 하셨잖아요.'
          },
          {
            text: 'The main one is error handling. Right now, if the payment call fails, the whole app crashes.',
            text_ko: '제일 중요한 건 오류 처리예요. 지금은 결제 호출이 실패하면 앱 전체가 죽어요.',
            reaction: 'It crashes? I tested it, and nothing crashed...',
            reaction_ko: '앱이 죽는다고요? 테스트해 봤는데 안 죽던데요...'
          },
          {
            text: "They're all equally important, honestly. Just go through them one by one.",
            text_ko: '솔직히 열두 개 다 똑같이 중요해요. 처음부터 하나씩 차례로 고쳐 봐요.',
            reaction: "All twelve? Okay... that's a lot.",
            reaction_ko: '열두 개 전부요? 네... 많네요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'I see. So the user never finds out that it failed.',
        reply_ko: '그렇군요. 그러면 사용자는 실패한 줄도 모르겠네요.'
      },
      {
        speaker: 'jun',
        situation: 'He opens the file.',
        situation_ko: '그가 파일을 엽니다.',
        line: 'What should I do instead?',
        line_ko: '그럼 대신 어떻게 해야 할까요?',
        prompt: 'Suggest recording the error and telling the user kindly, and get his view on trying again.',
        prompt_ko: '오류를 기록하고 사용자에게 친절히 알리자고 제안하고, 한 번 더 시도하는 것에 대한 그의 생각을 물어보세요.',
        model: "I'd suggest logging it and showing the user a friendly message. What do you think about adding one retry?",
        model_ko: '로그를 남기고 사용자한테 친절한 메시지를 보여 주는 게 좋겠어요. 재시도 한 번 넣는 건 어떻게 생각해요?',
        distractors: [
          {
            text: "Just wrap it in a try-catch and ignore it. Users won't notice one failed payment anyway.",
            text_ko: '그냥 try-catch로 감싸고 무시해요. 결제 한 번 실패한 건 사용자들이 어차피 모를 거예요.',
            reaction: "But isn't that what the code does now? Swallow it?",
            reaction_ko: '근데 그게 지금 코드가 하는 거 아니에요? 그냥 삼키는 거요?'
          },
          {
            text: "Log it, show the user a friendly message, and add five retries. Don't argue with me, just do it.",
            text_ko: '로그 남기고, 친절한 메시지 보여 주고, 재시도 다섯 번 넣어요. 토 달지 말고 그냥 해요.',
            reaction: 'Oh. Okay. Five retries, got it.',
            reaction_ko: '아. 네. 재시도 다섯 번, 알겠어요.'
          },
          {
            text: "I'd suggest logging it and showing the user the full error message and stack trace. Any thoughts on that?",
            text_ko: '로그를 남기고 사용자한테 전체 오류 메시지랑 스택 트레이스를 보여 주는 게 좋겠어요. 어떻게 생각해요?',
            reaction: "A stack trace? Won't that scare the users?",
            reaction_ko: '스택 트레이스요? 사용자들이 놀라지 않을까요?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "A retry makes sense. I'll add that.",
        reply_ko: '재시도가 맞겠네요. 넣을게요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun points at a smaller comment.',
        situation_ko: '준이 작은 코멘트 하나를 가리킵니다.',
        line: 'And the variable names. Is "data2" really a problem?',
        line_ko: '그리고 변수 이름이요. "data2"가 정말 문제예요?',
        prompt: "Admit it's minor, but explain why naming still matters.",
        prompt_ko: '사소한 거라고 인정하되, 그래도 이름이 왜 중요한지 설명하세요.',
        model: "It's a nit, but a clearer name helps the next person who reads the code.",
        model_ko: '사소한 거긴 한데, 이름이 분명하면 다음에 코드 읽는 사람한테 도움이 돼요.',
        distractors: [
          {
            text: "Yes, it's a serious problem. I can't approve the PR with names like that.",
            text_ko: '네, 심각한 문제예요. 이름이 저러면 PR 승인 못 해요.',
            reaction: 'Really? I thought it was a small thing.',
            reaction_ko: '정말요? 작은 건 줄 알았는데요.'
          },
          {
            text: "No, not really. Leave it as it is. Names don't matter much anyway.",
            text_ko: '아뇨, 별로요. 그냥 둬요. 어차피 이름은 크게 상관없어요.',
            reaction: 'Then why did you leave the comment?',
            reaction_ko: '그럼 왜 코멘트를 다셨어요?'
          },
          {
            text: "It's a nit, but Maya hates names like that, so you'd better change it.",
            text_ko: '사소하긴 한데, 마야가 저런 이름을 싫어해서 바꾸는 게 좋을 거예요.',
            reaction: "Oh. So it's about Maya, not the code?",
            reaction_ko: '아. 그럼 코드 때문이 아니라 마야 때문이에요?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "That's fair. I'll rename them.",
        reply_ko: '맞는 말이에요. 이름을 바꿀게요.'
      },
      {
        speaker: 'jun',
        situation: 'He writes a short to-do list.',
        situation_ko: '그가 할 일을 짧게 적습니다.',
        line: "I'll add a unit test for the failure case, too. Anything else?",
        line_ko: '실패하는 경우에 대한 단위 테스트도 추가할게요. 다른 건요?',
        prompt: 'Nothing more to fix. Tell him what happens next, and give him some credit.',
        prompt_ko: '더 고칠 건 없습니다. 다음 단계가 뭔지 알려 주고 칭찬도 해 주세요.',
        model: "That's it. Once the tests pass, I'll approve it. Nice work, by the way.",
        model_ko: '그거면 돼요. 테스트 통과하면 승인할게요. 그나저나 잘했어요.',
        distractors: [
          {
            text: "That's it. Once the tests pass, Priya will approve it and merge it. Nice work.",
            text_ko: '그거면 돼요. 테스트 통과하면 프리야가 승인하고 머지할 거예요. 잘했어요.',
            reaction: 'Priya? I thought you were reviewing it.',
            reaction_ko: '프리야요? 데릭이 리뷰하시는 줄 알았는데요.'
          },
          {
            text: "Actually, while you're at it, could you also rewrite the whole module?",
            text_ko: '아, 하는 김에 모듈 전체도 다시 짜 줄 수 있어요?',
            reaction: 'The whole module? For my first PR?',
            reaction_ko: '모듈 전체를요? 첫 PR인데요?'
          },
          {
            text: "That's it. Once the tests pass, I'll approve it. Took a while, though.",
            text_ko: '그거면 돼요. 테스트 통과하면 승인할게요. 좀 오래 걸리긴 했네요.',
            reaction: 'Oh. Sorry it took so long.',
            reaction_ko: '아. 오래 걸려서 죄송해요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Thank you! I'll push an update by end of day.",
        reply_ko: '감사합니다! 오늘 퇴근 전까지 수정해서 올릴게요.'
      }
    ],
    phrases: [
      {
        id: 'dk_d2_review.id_suggest',
        text: "I'd suggest logging it.",
        meaning_ko: '로그를 남기면 좋겠어요.',
        note: "\"I'd suggest …\" is softer than \"You should …\".",
        note_ko: "\"I'd suggest …\"는 \"You should …\"보다 부드럽습니다.",
        category: 'office'
      },
      {
        id: 'dk_d2_review.just_nits',
        text: 'Most of my comments are just nits.',
        meaning_ko: '제 코멘트는 대부분 사소한 거예요.',
        note: 'A nit (nitpick) is a tiny issue. Reviewers write "Nit: …" before optional comments.',
        note_ko: 'nit(nitpick)은 아주 사소한 지적입니다. 리뷰어는 선택 사항인 코멘트 앞에 "Nit: …"라고 씁니다.',
        category: 'office'
      },
      {
        id: 'dk_d2_review.main_one',
        text: 'The main one is error handling.',
        meaning_ko: '가장 중요한 건 오류 처리예요.',
        note: 'Tells the listener which point matters most.',
        note_ko: '어느 것이 가장 중요한지 알려 줍니다.',
        category: 'office'
      },
      {
        id: 'dk_d2_review.nice_work',
        text: 'Nice work, by the way.',
        meaning_ko: '그건 그렇고, 잘했어요.',
        note: '"By the way" adds something extra; here, a compliment.',
        note_ko: 'by the way는 덧붙이는 말로, 여기서는 칭찬을 더합니다.',
        category: 'office'
      },
      {
        id: 'dk_d2_review.once_tests_pass',
        text: "Once the tests pass, I'll approve it.",
        meaning_ko: '테스트가 통과하면 승인할게요.',
        note: '"Once" = as soon as, after.',
        note_ko: 'once는 ~하자마자, ~한 뒤에라는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d2_review.solid',
        text: "It's a solid first pull request.",
        meaning_ko: '첫 풀 리퀘스트로 탄탄해요.',
        note: '"Solid" = good and reliable. Start feedback with what works.',
        note_ko: 'solid는 탄탄하고 믿을 만하다는 뜻입니다. 피드백은 잘된 점부터 시작합니다.',
        category: 'office'
      },
      {
        id: 'dk_d2_review.swallow_error',
        text: 'We swallow the error.',
        meaning_ko: '오류를 삼켜 버려요.',
        note: 'The code catches an error and does nothing with it. "We" keeps it from sounding like blame.',
        note_ko: '코드가 오류를 잡고도 아무것도 하지 않는다는 뜻입니다. we를 쓰면 탓하는 말로 들리지 않습니다.',
        category: 'office'
      },
      {
        id: 'dk_d2_review.what_do_you_think',
        text: 'What do you think about adding one retry?',
        meaning_ko: '재시도를 한 번 넣는 건 어떻게 생각해요?',
        note: 'Turns an instruction into a question, so the author decides.',
        note_ko: '지시를 질문으로 바꿔 작성자가 결정하게 합니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'dk_d2_estimate',
    title: 'That is not a two-day job',
    title_ko: '이틀짜리 일이 아니에요',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 2,
    day_to: 2,
    time_from: '10:00',
    time_to: '16:30',
    summary: 'Priya told the client that gift card support would take two days. Push back politely, explain why, and offer a timeboxed spike and a trade-off.',
    summary_ko: '프리야가 고객에게 기프트 카드 지원이 이틀이면 된다고 말했습니다. 정중히 반대하고, 이유를 설명하고, 시간을 정한 사전 조사와 맞바꿀 것을 제안하세요.',
    sort: 20,
    tags: 'meeting,estimate,negotiation,pushing-back',
    calendar: { day: 2, time: '14:00', title: 'Gift card estimate with Priya', title_ko: '프리야와 기프트 카드 일정 추정' },
    turns: [
      {
        speaker: 'priya',
        situation: 'The thirty minutes Priya booked yesterday. She has the roadmap on the big screen.',
        situation_ko: '어제 프리야가 잡아 둔 30분 회의입니다. 큰 화면에 로드맵이 떠 있습니다.',
        line: "Thanks for making time. Summit Retail wants gift card support in checkout. I told them it's probably a two-day job. Does that sound right?",
        line_ko: '시간 내 줘서 고마워요. 서밋 리테일이 결제에 기프트 카드 지원을 원해요. 아마 이틀이면 될 거라고 말해 뒀어요. 맞는 것 같아요?',
        prompt: 'You disagree: you think this will take about a week. Say so tactfully.',
        prompt_ko: '동의하지 않습니다. 일주일쯤 걸릴 것 같아요. 정중하게 말하세요.',
        model: "I'd push back on that. Honestly, it's more like a week.",
        model_ko: '그건 좀 아닌 것 같아요. 솔직히 일주일은 걸려요.',
        distractors: [
          {
            text: 'Sounds about right. Two days should be plenty.',
            text_ko: '얼추 맞는 것 같아요. 이틀이면 충분하죠.',
            reaction: "Great. I'll confirm with Greg this afternoon.",
            reaction_ko: '좋아요. 오늘 오후에 그렉한테 확정해 줄게요.'
          },
          {
            text: 'You promised two days without asking me? Seriously?',
            text_ko: '저한테 묻지도 않고 이틀이라고 약속하셨어요? 진짜요?',
            reaction: "Okay, fair. But let's focus on the estimate.",
            reaction_ko: '네, 그 말도 맞아요. 근데 추정치에 집중해요.'
          },
          {
            text: "I'd push back on that. Honestly, it's more like a month.",
            text_ko: '그건 좀 아닌 것 같아요. 솔직히 한 달은 걸려요.',
            reaction: "A month?! I can't tell Greg a month for one field.",
            reaction_ko: '한 달이요?! 입력란 하나에 한 달이라고 그렉한테 말 못 해요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'A week? Okay, help me understand.',
        reply_ko: '일주일요? 알겠어요, 이해할 수 있게 설명해 줘요.'
      },
      {
        speaker: 'priya',
        situation: 'Priya pulls up the design. It shows one new field on the payment form.',
        situation_ko: '프리야가 디자인을 띄웁니다. 결제 양식에 새 입력란 하나가 보입니다.',
        line: 'What makes it so big? It looks like one extra field on the form.',
        line_ko: '왜 그렇게 커요? 양식에 입력란 하나 더 생기는 것 같은데.',
        prompt: 'Explain where the real work is: behind the form, in old payment code nobody has tests for.',
        prompt_ko: '진짜 일이 어디 있는지 설명하세요. 양식 뒤편, 테스트가 하나도 없는 오래된 결제 코드요.',
        model: 'The form is the easy part. Under the hood, it touches the legacy payment code, and that has no tests.',
        model_ko: '양식은 쉬운 부분이에요. 내부적으로는 레거시 결제 코드를 건드리는데, 거기엔 테스트가 없어요.',
        distractors: [
          {
            text: 'The form is the easy part. Under the hood, it touches the login code, and that has no tests.',
            text_ko: '양식은 쉬운 부분이에요. 내부적으로는 로그인 코드를 건드리는데, 거기엔 테스트가 없어요.',
            reaction: 'The login code? What does that have to do with gift cards?',
            reaction_ko: '로그인 코드요? 그게 기프트 카드랑 무슨 상관이에요?'
          },
          {
            text: "It's not just one field, Priya. You'd understand that if you'd ever read the code.",
            text_ko: '그냥 입력란이 아니에요, 프리야. 코드를 한 번이라도 봤으면 아셨을 거예요.',
            reaction: "Wow. Okay. I'm asking because I have to explain it to Greg.",
            reaction_ko: '와. 네. 그렉한테 설명해야 해서 묻는 건데요.'
          },
          {
            text: "It's hard to explain in a meeting. You'll just have to trust me that it's a lot bigger than it looks.",
            text_ko: '회의에서 설명하기는 좀 어려워요. 보기보다 훨씬 큰 일이라는 것만 그냥 믿어 주세요.',
            reaction: "I do trust you. But Greg won't accept \"trust me.\"",
            reaction_ko: "믿어요. 근데 그렉은 '믿어 달라'로는 안 넘어가요."
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'Ah. The legacy stuff again.',
        reply_ko: '아. 또 레거시군요.'
      },
      {
        speaker: 'priya',
        situation: 'She taps her pen on the table.',
        situation_ko: '그녀가 펜으로 테이블을 톡톡 칩니다.',
        line: 'I hear you. But Greg is expecting a date. What can I tell him?',
        line_ko: '무슨 말인지 알아요. 하지만 그렉이 날짜를 기다리고 있어요. 뭐라고 말하면 될까요?',
        prompt: "You can't give a date yet. Ask for a single day to investigate before you commit to one.",
        prompt_ko: '아직 날짜는 못 줍니다. 약속하기 전에 하루만 조사할 시간을 달라고 하세요.',
        model: "Can we timebox it? Give me one day for a spike, and I'll come back with a real estimate.",
        model_ko: '기간을 정해 두면 어떨까요? 하루만 사전 조사할 시간을 주시면 제대로 된 추정치를 가져올게요.',
        distractors: [
          {
            text: "Just tell him next Friday for sure. I'll work the weekend if I have to.",
            text_ko: '그냥 다음 주 금요일이라고 확실히 말하세요. 필요하면 주말에 일할게요.',
            reaction: "I don't want you working weekends, Derek. That's not a plan.",
            reaction_ko: '주말에 일하는 건 싫어요, 데릭. 그건 계획이 아니잖아요.'
          },
          {
            text: "Can we timebox it? Give me a full week for a spike, and I'll come back with a real estimate.",
            text_ko: '기간을 정해 두면 어떨까요? 일주일 꼬박 사전 조사하면 제대로 된 추정치를 가져올게요.',
            reaction: 'A week just to estimate? Greg will hit the roof.',
            reaction_ko: '추정만 하는 데 일주일요? 그렉이 펄쩍 뛸 거예요.'
          },
          {
            text: "Tell him whatever you want. You're the one who promised him two days.",
            text_ko: '그냥 마음대로 말하세요. 처음에 이틀이면 된다고 약속한 건 프리야잖아요.',
            reaction: 'Okay, I deserved that. But I still need something to tell him.',
            reaction_ko: '네, 그 말 들어도 싸요. 그래도 뭐라고는 말해야 해요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'A one-day spike. I can sell that.',
        reply_ko: '하루짜리 사전 조사. 그건 설득할 수 있어요.'
      },
      {
        speaker: 'priya',
        situation: 'Priya looks at the sprint board. It is full.',
        situation_ko: '프리야가 스프린트 보드를 봅니다. 꽉 차 있습니다.',
        line: 'And if it really is a week, something has to give. What would you drop?',
        line_ko: '그리고 정말 일주일이면 뭔가는 포기해야 해요. 뭘 빼겠어요?',
        prompt: "Name what you'd give up this sprint to make room.",
        prompt_ko: '자리를 만들려면 이번 스프린트에서 무엇을 뺄지 말하세요.',
        model: "It's a trade-off. I'd move saved cards to the next sprint.",
        model_ko: '하나를 얻으려면 하나는 내줘야죠. 저장된 카드를 다음 스프린트로 옮길게요.',
        distractors: [
          {
            text: "It's a trade-off. I'd stop helping Jun for a while.",
            text_ko: '하나를 얻으려면 하나는 내줘야죠. 당분간 준을 돕는 걸 멈출게요.',
            reaction: "Jun? It's his first week. That can't be the thing we drop.",
            reaction_ko: '준이요? 입사 첫 주잖아요. 그걸 뺄 순 없어요.'
          },
          {
            text: "Nothing has to give. I'll just stay late every night this week.",
            text_ko: '포기할 건 없어요. 이번 주에 매일 밤 늦게까지 남으면 돼요.',
            reaction: 'Every night? No. Something has to come off the board.',
            reaction_ko: '매일 밤이요? 안 돼요. 보드에서 뭔가는 빠져야 해요.'
          },
          {
            text: "It's a trade-off. I'd move the checkout API to next sprint.",
            text_ko: '하나를 얻으려면 하나는 내줘야죠. 결제 API를 다음 스프린트로 옮길게요.',
            reaction: "Isn't that already done and in review?",
            reaction_ko: '그건 벌써 끝나서 리뷰 중 아니에요?'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Okay. I'd rather give him an honest date than a missed one. Thanks for being straight with me.",
        reply_ko: '알겠어요. 못 지킬 날짜보다 정직한 날짜를 주는 게 낫죠. 솔직하게 말해 줘서 고마워요.'
      }
    ],
    phrases: [
      {
        id: 'dk_d2_estimate.help_me_understand',
        text: 'Help me understand.',
        meaning_ko: '이해할 수 있게 설명해 주세요.',
        note: 'Asks for the reasons without sounding like an attack.',
        note_ko: '공격적으로 들리지 않게 이유를 묻는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d2_estimate.more_like',
        text: "It's more like a week.",
        meaning_ko: '일주일에 더 가까워요.',
        note: '"More like" corrects an estimate.',
        note_ko: 'more like는 추정치를 바로잡을 때 씁니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d2_estimate.push_back',
        text: "I'd push back on that.",
        meaning_ko: '그건 좀 다르게 생각해요.',
        note: 'A polite, professional way to disagree with a plan or number.',
        note_ko: '계획이나 숫자에 정중하고 프로답게 반대하는 표현입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d2_estimate.something_has_to_give',
        text: 'Something has to give.',
        meaning_ko: '뭔가 하나는 포기해야 해요.',
        note: 'We cannot do everything; one thing must be dropped.',
        note_ko: '전부 다 할 수는 없으니 하나는 빼야 한다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d2_estimate.spike',
        text: 'Give me one day for a spike.',
        meaning_ko: '사전 조사에 하루만 주세요.',
        note: 'A spike is a short investigation to learn how big a task is.',
        note_ko: 'spike는 일이 얼마나 큰지 알아보는 짧은 조사입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d2_estimate.timebox',
        text: 'Can we timebox it?',
        meaning_ko: '시간을 정해 놓고 할까요?',
        note: '"Timebox" = give a task a fixed amount of time and stop when it is up.',
        note_ko: 'timebox는 일에 정해진 시간을 주고 그 시간이 되면 멈추는 것입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d2_estimate.trade_off',
        text: "It's a trade-off.",
        meaning_ko: '하나를 얻으면 하나를 내줘야 해요.',
        note: 'Getting one thing means giving up another.',
        note_ko: '하나를 얻으려면 다른 하나를 포기해야 한다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d2_estimate.under_the_hood',
        text: 'under the hood',
        meaning_ko: '내부적으로는, 겉으로 보이지 않는 곳에서는',
        note: "Inside the system, where users cannot see. From a car's hood.",
        note_ko: '사용자에게 보이지 않는 시스템 내부를 뜻합니다. 자동차 보닛에서 온 말입니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'dk_d2_diner',
    title: 'A regular at the Sunny Side',
    title_ko: '서니 사이드의 단골',
    place: 'diner_counter',
    npc: 'rosa',
    day_from: 2,
    day_to: 5,
    time_from: '11:30',
    time_to: '14:30',
    summary: 'Rosa knows your usual, but today you go with the special. Swap the side, skip the pie, and settle the check like a regular.',
    summary_ko: '로사는 당신이 늘 먹는 메뉴를 알지만 오늘은 스페셜을 고릅니다. 사이드를 바꾸고, 파이는 사양하고, 단골답게 계산하세요.',
    reward: -18,
    energy: 40,
    sort: 30,
    tags: 'food,diner,regular,tipping',
    calendar: { day: 2, time: '12:30', title: 'Lunch at the Sunny Side Diner', title_ko: '서니 사이드 다이너에서 점심' },
    turns: [
      {
        speaker: 'rosa',
        situation: 'The lunch crowd has not arrived yet. Rosa is already pouring a glass of water at your usual seat.',
        situation_ko: '점심 손님이 아직 몰리기 전입니다. 로사가 벌써 당신이 늘 앉는 자리에 물을 따르고 있습니다.',
        line: 'Well, look who it is! Hi, hon. Your usual spot at the counter?',
        line_ko: '어머, 이게 누구야! 안녕, 자기. 늘 앉던 카운터 자리죠?',
        prompt: "Take your usual seat, and find out what she's featuring today.",
        prompt_ko: '늘 앉던 자리에 앉고, 오늘 따로 내놓은 메뉴가 뭔지 알아보세요.',
        model: "Yes, please. What's the special today?",
        model_ko: '네, 그럴게요. 오늘 스페셜은 뭐예요?',
        distractors: [
          {
            text: 'Actually, could I get a booth today?',
            text_ko: '아, 오늘은 부스 자리 앉아도 될까요?',
            reaction: "A booth? You've sat at this counter for years, hon.",
            reaction_ko: '부스요? 몇 년째 이 카운터에 앉았잖아요, 자기.'
          },
          {
            text: 'Yes, please. The turkey club, as usual.',
            text_ko: '네, 그럴게요. 늘 먹던 터키 클럽으로요.',
            reaction: "Already? You're not even curious what's new today?",
            reaction_ko: '벌써요? 오늘 새로 뭐 있는지 안 궁금해요?'
          },
          {
            text: "Sure. I'm in a hurry, so make it quick.",
            text_ko: '네. 바쁘니까 좀 빨리 해 주세요.',
            reaction: 'Well, hello to you too, grumpy.',
            reaction_ko: '어머, 반가워요, 까칠 씨.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Patty melt with fries, thirteen ninety-five.',
        reply_ko: '패티 멜트에 감자튀김, 13달러 95센트예요.'
      },
      {
        speaker: 'rosa',
        situation: 'She takes the pencil from behind her ear.',
        situation_ko: '그녀가 귀에 꽂은 연필을 뺍니다.',
        line: 'Or I can put in your usual: turkey club, no mayo.',
        line_ko: '아니면 늘 먹던 걸로 넣어 줄까요? 터키 클럽, 마요 빼고.',
        prompt: "You want today's special, but with salad on the side, not fries.",
        prompt_ko: '오늘은 스페셜을 먹고 싶은데, 감자튀김 말고 샐러드를 곁들이고 싶습니다.',
        model: "I'll go with the special. Could I get a side salad instead of the fries?",
        model_ko: '스페셜로 할게요. 감자튀김 대신 사이드 샐러드로 바꿔 주실 수 있어요?',
        distractors: [
          {
            text: "Yeah, let's do the usual. Turkey club, no mayo, side salad.",
            text_ko: '네, 늘 먹던 걸로 할게요. 터키 클럽, 마요 빼고, 샐러드로요.',
            reaction: 'The usual? I thought the patty melt caught your eye.',
            reaction_ko: '늘 먹던 거요? 패티 멜트에 눈이 가는 줄 알았는데.'
          },
          {
            text: "I'll go with the special. Could I get the onion rings instead of the fries, please?",
            text_ko: '스페셜로 할게요. 감자튀김 대신 어니언 링으로 바꿔 주실 수 있어요?',
            reaction: "Onion rings? Sure, hon. That's a dollar extra.",
            reaction_ko: '어니언 링이요? 그럼요, 자기. 1달러 추가예요.'
          },
          {
            text: "I'll go with the special, but no fries. Take a dollar off for that.",
            text_ko: '스페셜로 할게요. 감자튀김은 빼고, 그만큼 1달러 깎아 주세요.',
            reaction: "Hon, I don't set the prices. It's thirteen ninety-five.",
            reaction_ko: '자기, 가격은 내가 정하는 게 아니에요. 13달러 95센트예요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Sure thing, hon. Salad it is.',
        reply_ko: '그럼요. 샐러드로 할게요.'
      },
      {
        speaker: 'rosa',
        situation: 'Rosa holds up the coffee pot.',
        situation_ko: '로사가 커피포트를 들어 보입니다.',
        line: 'Coffee while you wait?',
        line_ko: '기다리는 동안 커피 한잔할래요?',
        prompt: "You've had enough caffeine for one day. Decline the coffee.",
        prompt_ko: '오늘은 카페인을 충분히 마셨습니다. 커피는 사양하세요.',
        model: "Just water is fine, thanks. I've already had two cups today.",
        model_ko: '물이면 돼요, 고마워요. 오늘 벌써 두 잔 마셨어요.',
        distractors: [
          {
            text: 'Sure, why not? Fill it up. I can always use more.',
            text_ko: '좋죠, 뭐. 가득 채워 주세요. 커피는 많을수록 좋아요.',
            reaction: 'Here you go, hon. Fresh pot.',
            reaction_ko: '여기요, 자기. 방금 내린 거예요.'
          },
          {
            text: "Just water is fine, thanks. I haven't had any coffee yet today.",
            text_ko: '물이면 돼요, 고마워요. 오늘 아직 커피를 한 잔도 안 마셨어요.',
            reaction: 'No coffee yet? Then you definitely need a cup, hon.',
            reaction_ko: '아직 한 잔도 안 마셨다고요? 그럼 꼭 한 잔 해야죠, 자기.'
          },
          {
            text: "No, thanks. To be honest, your coffee's not really my thing.",
            text_ko: '됐어요. 솔직히 여기 커피는 제 취향이 아니라서요.',
            reaction: "Ouch. Well, the water's free, at least.",
            reaction_ko: '아야. 뭐, 물은 공짜니까요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Smart. Be right back.',
        reply_ko: '현명하네요. 금방 올게요.'
      },
      {
        speaker: 'rosa',
        situation: 'You clean your plate. Rosa comes by with the pie menu.',
        situation_ko: '접시를 깨끗이 비웠습니다. 로사가 파이 메뉴를 들고 옵니다.',
        line: 'How was everything? Did you save room for pie?',
        line_ko: '다 괜찮았어요? 파이 먹을 배는 남겨 뒀죠?',
        prompt: "The food was great, but you can't eat another bite. Wrap things up.",
        prompt_ko: '음식은 아주 좋았지만 더는 못 먹겠습니다. 마무리하세요.',
        model: "It really hit the spot, but I'm stuffed. Just the check, please.",
        model_ko: '정말 딱 좋았어요. 근데 배가 터질 것 같아요. 계산서만 주세요.',
        distractors: [
          {
            text: "Delicious. Sure, I'll have a slice of the apple pie, too.",
            text_ko: '맛있었어요. 그럼 애플파이도 한 조각 주실래요?',
            reaction: 'Apple pie it is! Warm, with ice cream?',
            reaction_ko: '애플파이요! 따뜻하게, 아이스크림 올려서?'
          },
          {
            text: 'It was fine, I guess. The salad was a little sad. Check, please.',
            text_ko: '그냥 그랬어요. 샐러드가 좀 시들했네요. 계산서 주세요.',
            reaction: "Sad, huh? Well, I'll tell the cook.",
            reaction_ko: '시들했다고요? 요리사한테 전할게요.'
          },
          {
            text: 'It really hit the spot. The fries were perfect. Just the check, please.',
            text_ko: '정말 딱 좋았어요. 감자튀김이 완벽했어요. 계산서만 주세요.',
            reaction: 'The fries? Hon, you had the salad.',
            reaction_ko: '감자튀김이요? 자기, 샐러드 먹었잖아요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Here you go, hon. No rush.',
        reply_ko: '여기 있어요. 천천히 해요.'
      },
      {
        speaker: 'rosa',
        situation: 'The check says $15.10 with tax. You put a ten, a five and three ones on the counter.',
        situation_ko: '계산서에는 세금 포함 15.10달러라고 적혀 있습니다. 10달러, 5달러, 1달러 석 장을 카운터에 놓습니다.',
        line: "Fifteen ten. Whenever you're ready, hon.",
        line_ko: '15달러 10센트예요. 편할 때 줘요, 자기.',
        prompt: "Pay with the bills on the counter, and let her know you don't need change.",
        prompt_ko: '카운터에 놓은 돈으로 계산하고, 거스름돈은 필요 없다고 알려 주세요.',
        model: "Here's eighteen. We're all set.",
        model_ko: '여기 18달러요. 이거면 됐어요.',
        distractors: [
          {
            text: "Here's fifteen. We're all set.",
            text_ko: '여기 15달러요. 이거면 됐어요.',
            reaction: "Hon, it's fifteen ten. You're a dime short.",
            reaction_ko: '자기, 15달러 10센트예요. 10센트 모자라요.'
          },
          {
            text: "That's eighteen. Can I get two back?",
            text_ko: '여기 18달러요. 2달러 거슬러 줄래요?',
            reaction: 'Two back? Sure... coming right up.',
            reaction_ko: '2달러 거슬러 달라고요? 네... 금방 줄게요.'
          },
          {
            text: "Here's a twenty. Keep it all, Rosa.",
            text_ko: '여기 20달러요. 전부 가져요, 로사.',
            reaction: 'A twenty? I see a ten, a five and three ones, hon.',
            reaction_ko: '20달러요? 내 눈엔 10달러, 5달러, 1달러 석 장인데요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Thanks, hon! Tell that new kid at your office to come by.',
        reply_ko: '고마워요! 사무실에 새로 온 친구한테도 들르라고 해요.'
      }
    ],
    phrases: [
      {
        id: 'dk_d2_diner.all_set',
        text: "We're all set.",
        meaning_ko: '이걸로 됐어요. (거스름돈은 괜찮아요.)',
        note: 'When you pay cash, it tells the server to keep the change as the tip.',
        note_ko: '현금으로 낼 때 거스름돈을 팁으로 가지라는 뜻이 됩니다.',
        category: 'food'
      },
      {
        id: 'dk_d2_diner.go_with',
        text: "I'll go with the special.",
        meaning_ko: '스페셜로 할게요.',
        note: '"Go with" = choose.',
        note_ko: 'go with는 고르다라는 뜻입니다.',
        category: 'food'
      },
      {
        id: 'dk_d2_diner.hit_the_spot',
        text: 'It really hit the spot.',
        meaning_ko: '딱 좋았어요.',
        note: 'The food was exactly what you wanted.',
        note_ko: '음식이 딱 원하던 것이었다는 뜻입니다.',
        category: 'food'
      },
      {
        id: 'dk_d2_diner.instead_of',
        text: 'Could I get a side salad instead of the fries?',
        meaning_ko: '감자튀김 대신 사이드 샐러드로 주시겠어요?',
        note: 'Most diners let you swap the side.',
        note_ko: '다이너 대부분은 사이드를 바꿔 줍니다.',
        category: 'food'
      },
      {
        id: 'dk_d2_diner.look_who_it_is',
        text: 'Well, look who it is!',
        meaning_ko: '아니, 이게 누구예요!',
        note: 'A warm greeting for someone you know well.',
        note_ko: '잘 아는 사람을 반갑게 맞이하는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d2_diner.save_room',
        text: 'Did you save room for pie?',
        meaning_ko: '파이 먹을 배는 남겨 뒀어요?',
        note: '"Save room for" = leave space in your stomach for dessert.',
        note_ko: 'save room for는 디저트 먹을 배를 남겨 둔다는 뜻입니다.',
        category: 'food'
      },
      {
        id: 'dk_d2_diner.stuffed',
        text: "I'm stuffed.",
        meaning_ko: '배가 너무 불러요.',
        note: 'Very full. Casual.',
        note_ko: '아주 배부르다는 편한 표현입니다.',
        category: 'food'
      },
      {
        id: 'dk_d2_diner.the_special',
        text: "What's the special today?",
        meaning_ko: '오늘의 스페셜은 뭐예요?',
        note: 'The special is a dish offered only that day, often at a good price.',
        note_ko: 'special은 그날만 파는 메뉴로, 값이 좋은 경우가 많습니다.',
        category: 'food'
      }
    ]
  },
  {
    id: 'dk_d3_one_on_one',
    title: 'Where do you go from here?',
    title_ko: '앞으로 어디로 갈까요?',
    place: 'office_manager',
    npc: 'maya',
    day_from: 3,
    day_to: 3,
    time_from: '08:30',
    time_to: '12:00',
    summary: 'Your 1:1 with Maya turns to your career. Say you want the tech lead track, take her feedback well, and ask for a stretch assignment.',
    summary_ko: '마야와의 1:1에서 당신의 커리어 이야기가 나옵니다. 테크 리드 트랙을 원한다고 말하고, 피드백을 잘 받아들이고, 도전적인 과제를 요청하세요.',
    sort: 10,
    tags: 'manager,career,1:1,feedback',
    calendar: { day: 3, time: '09:00', title: '1:1 with Maya', title_ko: '마야와 1:1' },
    turns: [
      {
        speaker: 'maya',
        situation: "Rain taps on the window of Maya's office. She closes her laptop and turns to you.",
        situation_ko: '마야의 사무실 창문에 빗방울이 부딪힙니다. 그녀가 노트북을 덮고 당신을 봅니다.',
        line: 'So, six years at Seaside. Where do you see yourself going from here?',
        line_ko: '그래서, 시사이드에서 6년이네요. 앞으로 어떤 방향으로 가고 싶어요?',
        prompt: "Tell her the career direction you'd like: leading the team technically.",
        prompt_ko: '원하는 커리어 방향을 말하세요. 팀을 기술적으로 이끄는 쪽으로요.',
        model: "I've been thinking about that. I'm interested in the tech lead track.",
        model_ko: '저도 그 생각을 하고 있었어요. 테크 리드 트랙에 관심이 있어요.',
        distractors: [
          {
            text: "I've been thinking about that. I'd like to move into product management.",
            text_ko: '저도 그 생각을 하고 있었어요. 프로덕트 매니지먼트 쪽으로 가고 싶어요.',
            reaction: "Product? Like Priya? That's a surprise.",
            reaction_ko: '프로덕트요? 프리야처럼요? 의외네요.'
          },
          {
            text: "Honestly, I'm happy where I am. I just want to keep coding.",
            text_ko: '솔직히 지금이 좋아요. 그냥 계속 코딩만 하고 싶어요.',
            reaction: "That's fine, too. But I sense there's more.",
            reaction_ko: '그것도 괜찮아요. 근데 뭔가 더 있는 것 같은데요.'
          },
          {
            text: "I've been thinking about that. I want a promotion by next quarter.",
            text_ko: '저도 그 생각을 하고 있었어요. 다음 분기까지는 승진하고 싶어요.',
            reaction: "Let's talk about the path first, not the date.",
            reaction_ko: '날짜보다 방향부터 이야기해요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "I was hoping you'd say that.",
        reply_ko: '그렇게 말해 주길 바랐어요.'
      },
      {
        speaker: 'maya',
        situation: 'Maya leans back in her chair.',
        situation_ko: '마야가 의자에 등을 기댑니다.',
        line: "What draws you to it? You'd write less code, you know.",
        line_ko: '왜 끌리는 거예요? 코드는 덜 짜게 될 텐데요.',
        prompt: 'Explain your reasons: you like helping people grow, and you want more influence over technical choices.',
        prompt_ko: '이유를 설명하세요. 사람들이 성장하도록 돕는 게 좋고, 기술적인 선택에 더 영향력을 갖고 싶다고요.',
        model: "I know. But I really enjoy mentoring, and I'd like more of a say in our technical decisions.",
        model_ko: '알아요. 하지만 멘토링이 정말 즐겁고, 우리 기술 결정에 더 목소리를 내고 싶어요.',
        distractors: [
          {
            text: "I know. Honestly, it's mostly the raise, and I'm getting a little tired of writing code all day.",
            text_ko: '알아요. 솔직히 연봉 때문이 제일 크고, 하루 종일 코딩하는 것도 좀 지겨워졌어요.',
            reaction: "The raise is real, but that alone won't carry you.",
            reaction_ko: '연봉이 오르는 건 맞지만, 그것만으로는 버티기 힘들어요.'
          },
          {
            text: 'I know. But some of our technical decisions lately have been pretty bad, frankly.',
            text_ko: '알아요. 근데 솔직히 요즘 우리 기술 결정 중에 꽤 별로인 게 많았어요.',
            reaction: 'Bad how? That sounds like a different conversation.',
            reaction_ko: '어떻게 별로였는데요? 그건 다른 얘기 같네요.'
          },
          {
            text: "Less code? Oh. I didn't know that. Then maybe I'm not so sure about it after all.",
            text_ko: '코드를 덜 짜요? 아, 몰랐어요. 그럼 다시 생각해 봐야겠네요.',
            reaction: "Hm. Then let's figure out what you really want.",
            reaction_ko: '음. 그럼 정말 원하는 게 뭔지부터 찾아보죠.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "It shows. Jun already told me how much you've helped him.",
        reply_ko: '눈에 보여요. 준이 벌써 당신이 얼마나 도와줬는지 말하더군요.'
      },
      {
        speaker: 'maya',
        situation: 'She chooses her words carefully.',
        situation_ko: '그녀가 조심스럽게 말을 고릅니다.',
        line: "To be candid, there's one gap. You tend to take everything on yourself. A lead has to delegate.",
        line_ko: '솔직히 말하면, 부족한 점이 하나 있어요. 뭐든 혼자 떠안는 경향이 있어요. 리드는 일을 맡길 줄 알아야 해요.',
        prompt: "It stings a little, but she's right. Take it well.",
        prompt_ko: '조금 아프지만 맞는 말입니다. 좋게 받아들이세요.',
        model: "That's fair. Delegating is something I need to work on.",
        model_ko: '맞는 말이에요. 일을 맡기는 건 제가 노력해야 할 부분이에요.',
        distractors: [
          {
            text: "That's not really fair. Nobody else would do it right.",
            text_ko: '그건 좀 억울해요. 다른 사람은 제대로 못 하잖아요.',
            reaction: "That's exactly the habit I'm talking about.",
            reaction_ko: '제가 말하는 게 바로 그 습관이에요.'
          },
          {
            text: "That's only because we're short-staffed, though.",
            text_ko: '그건 우리 팀 인원이 부족해서 그런 거잖아요.',
            reaction: 'Maybe. But leads delegate, whatever the team size.',
            reaction_ko: '그럴 수도요. 하지만 인원이 몇 명이든 리드는 일을 맡겨요.'
          },
          {
            text: "Got it. From now on, I'll just hand all of my work to Jun.",
            text_ko: '알겠어요. 그럼 앞으로는 제 일을 전부 준한테 넘길게요.',
            reaction: 'Everything? To Jun? In his first week?',
            reaction_ko: '전부요? 준한테요? 입사 첫 주에?'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Knowing it is half the battle.',
        reply_ko: '아는 것만으로도 절반은 된 거예요.'
      },
      {
        speaker: 'maya',
        situation: 'Maya opens her notes.',
        situation_ko: '마야가 메모를 엽니다.',
        line: 'So what would help you get there?',
        line_ko: '그럼 거기까지 가려면 뭐가 도움이 될까요?',
        prompt: 'Ask to run the upcoming gift card work yourself, as a challenge to grow into.',
        prompt_ko: '곧 시작할 기프트 카드 작업을 직접 맡아 이끌고 싶다고, 성장할 기회로 삼겠다고 하세요.',
        model: "I'd like to take the lead on the gift card project. It would be a good stretch assignment.",
        model_ko: '기프트 카드 프로젝트를 제가 이끌어 보고 싶어요. 좋은 도전 과제가 될 것 같아요.',
        distractors: [
          {
            text: "I'd like to take the lead on the checkout API. It would be a good stretch assignment.",
            text_ko: '결제 API를 제가 이끌어 보고 싶어요. 좋은 도전 과제가 될 것 같아요.',
            reaction: "That one's already done and in review, isn't it?",
            reaction_ko: '그건 이미 끝나서 리뷰 중이잖아요?'
          },
          {
            text: 'Honestly, a new title would help most. Can we start calling me tech lead now?',
            text_ko: '솔직히 새 직함이 제일 도움이 될 거예요. 지금부터 테크 리드라고 불러 주면 안 돼요?',
            reaction: 'Titles come after the work, Derek.',
            reaction_ko: '직함은 일을 해낸 다음에 따라와요, 데릭.'
          },
          {
            text: "I'd like to do all of the gift card work by myself, start to finish, without anyone's help.",
            text_ko: '기프트 카드 작업을 처음부터 끝까지 누구 도움도 없이 저 혼자 다 해 보고 싶어요.',
            reaction: "Without help? Didn't we just talk about delegating?",
            reaction_ko: '도움 없이요? 방금 일을 맡기는 얘기 했잖아요?'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "I like it. Put together a one-page plan, and we'll revisit this next month.",
        reply_ko: '좋아요. 한 장짜리 계획을 만들어 봐요. 다음 달에 다시 이야기하죠.'
      },
      {
        speaker: 'maya',
        situation: 'She writes a note and looks at the clock. Standup is soon.',
        situation_ko: '그녀가 메모를 하고 시계를 봅니다. 곧 스탠드업입니다.',
        line: 'Anything else on your mind?',
        line_ko: '다른 할 얘기 있어요?',
        prompt: "Ask her what you'd need to show to earn a promotion.",
        prompt_ko: '승진하려면 무엇을 보여 줘야 하는지 물어보세요.',
        model: 'Just one thing. What would it take to get to the next level?',
        model_ko: '하나만요. 다음 단계로 올라가려면 뭐가 필요할까요?',
        distractors: [
          {
            text: 'Just one thing. How much more would the tech lead role actually pay?',
            text_ko: '하나만요. 테크 리드가 되면 연봉이 실제로 얼마나 더 올라요?',
            reaction: "We'll get to comp later. Let's focus on growth first.",
            reaction_ko: '보상은 나중에 얘기해요. 우선 성장에 집중하죠.'
          },
          {
            text: "Nope, I think I'm all set. I'll see you at standup.",
            text_ko: '아뇨, 다 된 것 같아요. 스탠드업에서 봬요.',
            reaction: "Okay. You're sure there's nothing else?",
            reaction_ko: '그래요. 정말 다른 건 없어요?'
          },
          {
            text: "Just one thing. Why didn't I get promoted last year?",
            text_ko: '하나만요. 작년엔 제가 왜 승진을 못 했죠?',
            reaction: "Fair question, but let's look forward, not back.",
            reaction_ko: '그럴 만한 질문이지만, 뒤 말고 앞을 봐요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Lead one project end to end, and show me you can delegate. Let me know if you have any questions.',
        reply_ko: '프로젝트 하나를 처음부터 끝까지 이끌고, 일을 맡길 줄 안다는 걸 보여 줘요. 궁금한 게 있으면 말해 줘요.'
      }
    ],
    phrases: [
      {
        id: 'dk_d3_one_on_one.a_say',
        text: "I'd like more of a say in our technical decisions.",
        meaning_ko: '기술적인 결정에 더 목소리를 내고 싶어요.',
        note: '"Have a say" = have the right to help decide.',
        note_ko: 'have a say는 결정에 참여할 권한이 있다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d3_one_on_one.need_to_work_on',
        text: 'Delegating is something I need to work on.',
        meaning_ko: '일을 맡기는 건 제가 노력해야 할 부분이에요.',
        note: 'A good way to accept feedback without excuses.',
        note_ko: '변명 없이 피드백을 받아들이는 좋은 표현입니다.',
        category: 'office'
      },
      {
        id: 'dk_d3_one_on_one.next_level',
        text: 'What would it take to get to the next level?',
        meaning_ko: '다음 단계로 가려면 무엇이 필요할까요?',
        note: 'A direct but polite way to ask about promotion.',
        note_ko: '승진에 대해 직접적이면서도 정중하게 묻는 표현입니다.',
        category: 'office'
      },
      {
        id: 'dk_d3_one_on_one.revisit',
        text: "We'll revisit this next month.",
        meaning_ko: '다음 달에 다시 이야기해요.',
        note: '"Revisit" = come back to a topic later.',
        note_ko: 'revisit은 나중에 그 주제로 돌아온다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d3_one_on_one.see_yourself',
        text: 'Where do you see yourself going from here?',
        meaning_ko: '앞으로 어떤 방향으로 가고 싶어요?',
        note: "A manager's question about your career goals.",
        note_ko: '매니저가 커리어 목표를 물을 때 하는 말입니다.',
        category: 'office'
      },
      {
        id: 'dk_d3_one_on_one.stretch_assignment',
        text: 'a stretch assignment',
        meaning_ko: '역량을 넓혀 주는 도전적인 과제',
        note: 'Work a little beyond your current level, to help you grow.',
        note_ko: '성장을 위해 지금 수준보다 조금 어려운 일을 말합니다.',
        category: 'office'
      },
      {
        id: 'dk_d3_one_on_one.tech_lead_track',
        text: "I'm interested in the tech lead track.",
        meaning_ko: '테크 리드 트랙에 관심이 있어요.',
        note: "A \"track\" is a career path. A tech lead guides a team's technical work.",
        note_ko: 'track은 커리어 경로입니다. 테크 리드는 팀의 기술적인 일을 이끕니다.',
        category: 'office'
      },
      {
        id: 'dk_d3_one_on_one.to_be_candid',
        text: "To be candid, there's one gap.",
        meaning_ko: '솔직히 말하면, 부족한 점이 하나 있어요.',
        note: '"To be candid" warns that honest feedback is coming.',
        note_ko: 'to be candid는 솔직한 피드백이 나온다는 신호입니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'dk_d3_tacos',
    title: 'Taco lunch with Jun',
    title_ko: '준과 타코 점심',
    place: 'office_desk',
    npc: 'jun',
    day_from: 3,
    day_to: 3,
    time_from: '11:30',
    time_to: '13:30',
    summary: 'Jun is about to work through lunch. Invite him to the taco truck, treat him, and chat about tipping and the weekend.',
    summary_ko: '준이 점심도 거르고 일하려 합니다. 타코 트럭에 같이 가자고 하고, 한턱내고, 팁과 주말에 대해 이야기하세요.',
    reward: -12,
    energy: 35,
    sort: 20,
    tags: 'small-talk,lunch,invitation,food',
    calendar: { day: 3, time: '12:00', title: 'Taco lunch with Jun', title_ko: '준과 타코 점심' },
    turns: [
      {
        speaker: 'jun',
        situation: 'It is almost noon, and the rain has let up for a while. Jun is eating crackers at his desk, staring at his screen.',
        situation_ko: '거의 정오이고 비가 잠시 그쳤습니다. 준이 자리에서 크래커를 먹으며 화면을 들여다보고 있습니다.',
        line: 'Oh, hi, Derek. I was just going to work through lunch.',
        line_ko: '아, 데릭. 점심은 그냥 일하면서 때우려고요.',
        prompt: "Don't let him eat crackers at his desk. Invite him along: a few of you are getting tacos from the truck.",
        prompt_ko: '자리에서 크래커로 때우게 두지 마세요. 몇 명이서 타코 트럭에 가는데 같이 가자고 하세요.',
        model: 'Come on, you need a break. A few of us are grabbing tacos from the food truck. Want to join us?',
        model_ko: '에이, 좀 쉬어야죠. 몇 명이서 푸드트럭에 타코 사러 가는데, 같이 갈래요?',
        distractors: [
          {
            text: "Good call. When you're new, it's smart to show everyone how hard you're working.",
            text_ko: '잘 생각했어요. 신입 때는 다들 보는 앞에서 열심히 일하는 걸 보여 주는 게 좋아요.',
            reaction: "Oh. Right. Then I'll stay here.",
            reaction_ko: '아. 그렇죠. 그럼 여기 있을게요.'
          },
          {
            text: "Nope, you're coming. Close the laptop. I'm not taking no for an answer, Jun.",
            text_ko: '안 돼요, 같이 가요. 노트북 덮어요. 거절은 안 받을 거예요, 준.',
            reaction: 'Okay, okay! Let me at least save my work.',
            reaction_ko: '알았어요, 알았어요! 저장이라도 하게 해 줘요.'
          },
          {
            text: 'Come on, you need a break. A few of us are grabbing pizza and wings at the Anchor. Want to join us?',
            text_ko: '에이, 좀 쉬어야죠. 몇 명이서 앵커에 피자랑 윙 먹으러 가는데, 같이 갈래요?',
            reaction: "The Anchor? Isn't that a bar? At noon?",
            reaction_ko: '앵커요? 거기 술집 아니에요? 대낮에요?'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Tacos? Sure, I'd love to. Let me grab my wallet.",
        reply_ko: '타코요? 좋아요, 가고 싶어요. 지갑 가져올게요.'
      },
      {
        speaker: 'jun',
        situation: 'You wait in line under the awning of the food truck. Jun studies the menu board.',
        situation_ko: '푸드트럭 차양 아래에서 줄을 서 있습니다. 준이 메뉴판을 유심히 봅니다.',
        line: "I've never ordered from a food truck. What do you recommend?",
        line_ko: '푸드트럭에서는 주문해 본 적이 없어요. 뭐가 맛있어요?',
        prompt: "Suggest the fish tacos, and make it clear you're paying.",
        prompt_ko: '피시 타코를 추천하고, 당신이 계산할 거라고 분명히 하세요.',
        model: "You can't go wrong with the fish tacos. And put your wallet away. It's my treat.",
        model_ko: '피시 타코는 실패가 없어요. 그리고 지갑은 넣어 둬요. 내가 살게요.',
        distractors: [
          {
            text: "You can't go wrong with the fish tacos. Oh, I forgot my wallet. Can you cover me?",
            text_ko: '피시 타코는 실패가 없어요. 아, 지갑을 두고 왔네. 대신 내 줄 수 있어요?',
            reaction: "Oh! Sure, no problem. I've got it.",
            reaction_ko: '아! 네, 괜찮아요. 제가 낼게요.'
          },
          {
            text: "You can't go wrong with the beef burritos. And put your wallet away. It's my treat.",
            text_ko: '소고기 부리토는 실패가 없어요. 그리고 지갑은 넣어 둬요. 내가 살게요.',
            reaction: 'Burritos? The guy ahead of us said the tacos are the best.',
            reaction_ko: '부리토요? 앞사람은 타코가 제일 맛있다던데요.'
          },
          {
            text: "The fish tacos are great here. Let's just each pay for our own, though.",
            text_ko: '여기 피시 타코 맛있어요. 근데 계산은 각자 하죠.',
            reaction: 'Oh, sure. Of course.',
            reaction_ko: '아, 네. 물론이죠.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'Really? Thank you! The next one is on me.',
        reply_ko: '정말요? 감사합니다! 다음엔 제가 살게요.'
      },
      {
        speaker: 'jun',
        situation: 'You eat at a picnic table that is still a little wet.',
        situation_ko: '아직 조금 젖은 피크닉 테이블에서 먹습니다.',
        line: 'Can I ask you something? At the diner, I never know how much to tip.',
        line_ko: '뭐 하나 물어봐도 돼요? 다이너에서 팁을 얼마나 줘야 할지 항상 모르겠어요.',
        prompt: "Tell him the norm at sit-down restaurants is 15 to 20 percent, and that at a truck like this it's optional.",
        prompt_ko: '앉아서 먹는 식당에서는 15~20퍼센트가 보통이고, 이런 트럭에서는 자유라고 알려 주세요.',
        model: "Rule of thumb: fifteen to twenty percent at sit-down places. At a truck like this, it's up to you.",
        model_ko: '대략 앉아서 먹는 식당은 15에서 20퍼센트예요. 이런 트럭은 알아서 하면 돼요.',
        distractors: [
          {
            text: "Rule of thumb: about ten percent at sit-down places like the diner. At a truck like this, it's up to you.",
            text_ko: '대략 다이너 같은 앉아서 먹는 식당은 10퍼센트 정도예요. 이런 트럭은 알아서 하면 돼요.',
            reaction: 'Ten? I thought it was more than that here.',
            reaction_ko: '10퍼센트요? 여기선 그것보다 많은 줄 알았는데요.'
          },
          {
            text: 'Rule of thumb: fifteen to twenty percent everywhere, even at a truck like this one.',
            text_ko: '대략 어디서나 15에서 20퍼센트예요. 이런 트럭에서도 마찬가지고요.',
            reaction: 'Even here? But we ordered at the window.',
            reaction_ko: '여기서도요? 창구에서 주문했는데요.'
          },
          {
            text: 'Honestly, tipping is optional everywhere. Nobody really expects it from you.',
            text_ko: '솔직히 팁은 어디서든 선택이에요. 아무도 준한테 기대 안 해요.',
            reaction: "Really? I don't think Rosa would agree with that.",
            reaction_ko: '정말요? 로사는 그렇게 생각 안 할 것 같은데요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Fifteen to twenty. Got it. I'll remember that.",
        reply_ko: '15에서 20. 알겠어요. 기억해 둘게요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun finishes his second taco.',
        situation_ko: '준이 두 번째 타코를 다 먹습니다.',
        line: 'Do you have any plans for the weekend?',
        line_ko: '주말에 무슨 계획 있어요?',
        prompt: "Tell him you're grilling for some friends at your place, if it doesn't rain.",
        prompt_ko: '비만 안 오면 집에서 친구들과 바비큐를 한다고 하세요.',
        model: "I'm having a few friends over for a barbecue, as long as the weather holds.",
        model_ko: '날씨만 괜찮으면 친구 몇 명 불러서 바비큐 할 거예요.',
        distractors: [
          {
            text: "I'm going to a barbecue at a friend's place this weekend, as long as the weather holds.",
            text_ko: '날씨만 괜찮으면 이번 주말에 친구네 집 바비큐에 갈 거예요.',
            reaction: 'Oh, whose place? Someone from work?',
            reaction_ko: '아, 누구네요? 회사 사람이에요?'
          },
          {
            text: "Just work, probably. I'll be catching up on tickets all weekend.",
            text_ko: '아마 일하겠죠. 주말 내내 밀린 티켓 처리할 거예요.',
            reaction: 'All weekend? Derek, you just told me to take a break.',
            reaction_ko: '주말 내내요? 데릭, 방금 저한테 쉬라고 하셨잖아요.'
          },
          {
            text: "Not really your business, but I'll be around. Why do you ask?",
            text_ko: '알 필요는 없지만, 근처에 있을 거예요. 왜요?',
            reaction: 'Oh, sorry. I was just making conversation.',
            reaction_ko: '아, 죄송해요. 그냥 얘기나 하려던 거였어요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'That sounds fun. I hope the rain is gone by then.',
        reply_ko: '재미있겠네요. 그때까지 비가 그쳤으면 좋겠어요.'
      },
      {
        speaker: 'jun',
        situation: 'You walk back to the office. A few drops start to fall again.',
        situation_ko: '사무실로 걸어 돌아갑니다. 빗방울이 다시 떨어지기 시작합니다.',
        line: 'By the way, thank you for this week. I was really nervous on Monday.',
        line_ko: '그런데 이번 주에 고마웠어요. 월요일엔 정말 긴장했거든요.',
        prompt: "Encourage him: tell him how well he's been doing.",
        prompt_ko: '격려해 주세요. 그가 얼마나 잘하고 있는지 말해 주세요.',
        model: "You're doing great. You're picking things up faster than I did.",
        model_ko: '아주 잘하고 있어요. 나보다 훨씬 빨리 배우고 있어요.',
        distractors: [
          {
            text: "No problem. You're doing okay, but you still ask a lot of questions.",
            text_ko: '천만에요. 잘하고는 있는데, 아직 질문이 좀 많아요.',
            reaction: "Oh... sorry. I'll try to ask fewer.",
            reaction_ko: '아... 죄송해요. 덜 물어보도록 할게요.'
          },
          {
            text: "No problem. Honestly, you'd be lost without me, so you're welcome.",
            text_ko: '천만에요. 솔직히 나 없었으면 헤맸을 테니까, 고마워할 만하죠.',
            reaction: 'Ha. Yeah, probably. Thanks, I guess.',
            reaction_ko: '하. 네, 그렇겠죠. 고마워요, 뭐.'
          },
          {
            text: 'Yeah, I could tell. You looked pretty scared on Monday, to be honest.',
            text_ko: '네, 티 났어요. 솔직히 월요일엔 꽤 겁먹은 얼굴이었어요.',
            reaction: "Was it that obvious? That's embarrassing.",
            reaction_ko: '그렇게 티 났어요? 창피하네요.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: 'That means a lot. Thanks for lunch, Derek!',
        reply_ko: '큰 힘이 돼요. 점심 잘 먹었어요, 데릭!'
      }
    ],
    phrases: [
      {
        id: 'dk_d3_tacos.cant_go_wrong',
        text: "You can't go wrong with the fish tacos.",
        meaning_ko: '피시 타코는 실패할 일이 없어요.',
        note: 'A safe recommendation: it is always good.',
        note_ko: '언제 골라도 좋다는 안전한 추천입니다.',
        category: 'food'
      },
      {
        id: 'dk_d3_tacos.friends_over',
        text: "I'm having a few friends over.",
        meaning_ko: '친구 몇 명을 집에 부를 거예요.',
        note: '"Have someone over" = invite them to your home.',
        note_ko: 'have someone over는 집에 초대한다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d3_tacos.join_us',
        text: 'Want to join us?',
        meaning_ko: '같이 갈래요?',
        note: 'A casual invitation. Short for "Do you want to join us?"',
        note_ko: '편한 초대입니다. "Do you want to join us?"를 줄인 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d3_tacos.my_treat',
        text: "It's my treat.",
        meaning_ko: '제가 살게요.',
        note: "You are paying for the other person. Also: \"It's on me.\"",
        note_ko: "상대방 몫까지 내겠다는 뜻입니다. \"It's on me.\"라고도 합니다.",
        category: 'food'
      },
      {
        id: 'dk_d3_tacos.need_a_break',
        text: 'Come on, you need a break.',
        meaning_ko: '에이, 좀 쉬어야죠.',
        note: '"Come on" here gently pushes someone to agree.',
        note_ko: '여기서 come on은 상대가 따르도록 부드럽게 권하는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d3_tacos.picking_things_up',
        text: "You're picking things up fast.",
        meaning_ko: '빨리 배우고 있어요.',
        note: '"Pick up" = learn something by doing it.',
        note_ko: 'pick up은 해 보면서 익힌다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d3_tacos.weather_holds',
        text: 'as long as the weather holds',
        meaning_ko: '날씨만 계속 괜찮으면',
        note: '"The weather holds" = it stays dry and nice.',
        note_ko: 'the weather holds는 날씨가 계속 좋다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d3_tacos.work_through_lunch',
        text: 'I was going to work through lunch.',
        meaning_ko: '점심을 거르고 일하려고 했어요.',
        note: '"Work through lunch" = keep working and skip the lunch break.',
        note_ko: 'work through lunch는 점심시간에 쉬지 않고 일한다는 뜻입니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'dk_d3_planning',
    title: 'Sprint planning: holding the line',
    title_ko: '스프린트 플래닝: 범위 지키기',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 3,
    day_to: 3,
    time_from: '13:30',
    time_to: '16:30',
    summary: 'Report on your spike, vouch for Jun, and push back when one more feature is squeezed into a full sprint.',
    summary_ko: '사전 조사 결과를 보고하고, 준을 믿어 주고, 꽉 찬 스프린트에 기능을 하나 더 끼워 넣으려 할 때 반대 의견을 말하세요.',
    sort: 30,
    tags: 'meeting,planning,agile,scope',
    calendar: { day: 3, time: '14:00', title: 'Sprint planning', title_ko: '스프린트 플래닝' },
    turns: [
      {
        speaker: 'priya',
        situation: 'The whole team is in the meeting room. Rain runs down the windows. Priya has the backlog on the screen.',
        situation_ko: '팀 전체가 회의실에 있습니다. 창문에 빗물이 흘러내립니다. 프리야가 화면에 백로그를 띄웠습니다.',
        line: 'Okay, sprint planning. First up: gift cards. Derek, how did the spike go?',
        line_ko: '자, 스프린트 계획이에요. 첫 번째는 기프트 카드. 데릭, 사전 조사는 어땠어요?',
        prompt: 'Share what the spike showed: possible, but larger than expected at 8 points. Suggest splitting the work.',
        prompt_ko: '사전 조사 결과를 공유하세요. 할 수는 있지만 생각보다 커서 8포인트입니다. 작업을 나누자고 하세요.',
        model: "It's doable, but it's bigger than it looks. I'd say eight points, so let's break it into two tickets.",
        model_ko: '할 수는 있는데 보기보다 커요. 8포인트 정도니까 티켓 두 개로 나누죠.',
        distractors: [
          {
            text: "It's doable, but it's bigger than it looks. I'd say three points, so it fits in one ticket.",
            text_ko: '할 수는 있는데 보기보다 커요. 3포인트 정도라 티켓 하나면 돼요.',
            reaction: "Three points? That's a lot smaller than the week you warned me about.",
            reaction_ko: '3포인트요? 일주일 걸린다고 했던 것보다 훨씬 작은데요.'
          },
          {
            text: "Easy, actually. You were right, it's basically a two-day job. No need to split it.",
            text_ko: '사실 쉬워요. 프리야 말이 맞았어요, 거의 이틀이면 돼요. 나눌 필요도 없어요.',
            reaction: 'Really? Yesterday you said a week.',
            reaction_ko: '정말요? 어제는 일주일이라면서요.'
          },
          {
            text: 'It was rough. I stayed at the office until midnight, and the legacy code is honestly a total nightmare.',
            text_ko: '힘들었어요. 자정까지 사무실에 남았는데, 레거시 코드가 솔직히 완전 악몽이에요.',
            reaction: "Sorry to hear it. But what's the estimate?",
            reaction_ko: '고생했네요. 그래서 추정치는요?'
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'Two tickets. Works for me.',
        reply_ko: '티켓 두 개. 좋아요.'
      },
      {
        speaker: 'priya',
        situation: 'Priya drags a ticket to the top. Jun is sitting next to you, taking notes.',
        situation_ko: '프리야가 티켓 하나를 맨 위로 끌어 올립니다. 준이 옆에 앉아 메모를 하고 있습니다.',
        line: 'Next, the refund bug. I was thinking of giving it to Jun. Is that too much for his first week?',
        line_ko: '다음은 환불 버그. 준한테 줄까 생각 중인데요. 첫 주에 너무 무리일까요?',
        prompt: 'Vouch for Jun, and offer to work alongside him if he runs into trouble.',
        prompt_ko: '준을 믿는다고 말하고, 막히면 옆에서 같이 작업하겠다고 하세요.',
        model: "I think he can handle it. I'll pair with him if he gets stuck.",
        model_ko: '해낼 수 있을 것 같아요. 막히면 제가 같이 붙어서 할게요.',
        distractors: [
          {
            text: "Probably too much. Let's give him something easier for now.",
            text_ko: '아마 무리일 거예요. 일단 더 쉬운 걸 주죠.',
            reaction: "Hm. Jun's sitting right here, you know.",
            reaction_ko: '음. 준이 바로 옆에 있는데요.'
          },
          {
            text: "I think it's too risky for him. I'll just take the refund bug myself.",
            text_ko: '그 친구한텐 너무 위험해요. 환불 버그는 그냥 제가 맡을게요.',
            reaction: "You? You've already got gift cards on your plate.",
            reaction_ko: '데릭이요? 이미 기프트 카드도 맡고 있잖아요.'
          },
          {
            text: "He can handle it alone. He won't need any help from anyone.",
            text_ko: '혼자서도 충분해요. 누구 도움도 필요 없을 거예요.',
            reaction: "No help at all? It's his first week, Derek.",
            reaction_ko: '도움이 하나도 필요 없다고요? 첫 주예요, 데릭.'
          }
        ],
        reply_speaker: 'jun',
        reply_line: "Thanks, Derek. I'll do my best!",
        reply_ko: '고마워요, 데릭. 최선을 다할게요!'
      },
      {
        speaker: 'priya',
        situation: 'The sprint is full. Priya scrolls to one more item.',
        situation_ko: '스프린트가 꽉 찼습니다. 프리야가 항목 하나를 더 찾아 내려갑니다.',
        line: 'One more. Sales wants the export report in this sprint, too. Can we squeeze it in?',
        line_ko: '하나 더요. 영업팀이 이번 스프린트에 내보내기 리포트도 원해요. 끼워 넣을 수 있을까요?',
        prompt: 'Say no: the sprint is full, and adding it would mean dropping something.',
        prompt_ko: '안 된다고 하세요. 스프린트가 꽉 찼고, 그걸 넣으면 다른 걸 빼야 합니다.',
        model: "I don't think so. We're at capacity. If that goes in, something else has to come out.",
        model_ko: '안 될 것 같아요. 이미 여력이 꽉 찼어요. 그게 들어오면 다른 게 빠져야 해요.',
        distractors: [
          {
            text: 'Sure, we can probably squeeze it in if everyone puts in a little extra.',
            text_ko: '네, 다들 조금씩 더 하면 아마 끼워 넣을 수 있을 거예요.',
            reaction: "Extra hours again? That's how we burn people out.",
            reaction_ko: '또 야근이요? 그러다 다들 지쳐요.'
          },
          {
            text: 'Sales always does this. Tell them to plan ahead for once in their lives.',
            text_ko: '영업팀은 맨날 이래요. 제발 한 번이라도 미리 계획하라고 하세요.',
            reaction: "I'll pass on the message, minus the attitude.",
            reaction_ko: '말은 전할게요. 그 말투는 빼고요.'
          },
          {
            text: "I don't think so. Jun's pretty free this sprint, but the rest of us are already at capacity.",
            text_ko: '안 될 것 같아요. 준은 이번에 꽤 여유가 있지만 나머지는 이미 꽉 찼어요.',
            reaction: "Jun's free? We just gave him the refund bug.",
            reaction_ko: '준이 한가하다고요? 방금 환불 버그 줬잖아요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "I was afraid you'd say that. Okay, it goes to the backlog.",
        reply_ko: '그렇게 말할 줄 알았어요. 알겠어요, 백로그로 보내죠.'
      },
      {
        speaker: 'priya',
        situation: 'Priya looks around the table.',
        situation_ko: '프리야가 테이블을 둘러봅니다.',
        line: 'So what can we commit to?',
        line_ko: '그럼 우리 뭘 약속할 수 있죠?',
        prompt: "Say what the team can promise this sprint, and what's only a maybe.",
        prompt_ko: '이번 스프린트에서 팀이 약속할 수 있는 것과, 되면 좋은 것을 나눠 말하세요.',
        model: "Let's commit to the refund bug and the first gift card ticket. The rest is a stretch goal.",
        model_ko: '환불 버그랑 첫 번째 기프트 카드 티켓은 약속하죠. 나머지는 도전 목표로 하고요.',
        distractors: [
          {
            text: "Let's commit to both gift card tickets, the refund bug, and the export report.",
            text_ko: '기프트 카드 티켓 두 개랑 환불 버그, 내보내기 리포트까지 다 약속하죠.',
            reaction: "The export report? You just said we're at capacity.",
            reaction_ko: '내보내기 리포트요? 방금 여력이 없다고 했잖아요.'
          },
          {
            text: "Let's commit to the refund bug and saved cards. Both gift card tickets can be a stretch goal.",
            text_ko: '환불 버그랑 저장된 카드는 약속하죠. 기프트 카드 티켓 두 개는 도전 목표로 하고요.',
            reaction: 'Saved cards? I thought we moved that to next sprint.',
            reaction_ko: '저장된 카드요? 그건 다음 스프린트로 옮긴 줄 알았는데요.'
          },
          {
            text: "I'd rather not commit to anything this time. Let's just see how far we get.",
            text_ko: '이번엔 아무것도 약속 안 하는 게 좋겠어요. 어디까지 가나 보죠, 뭐.',
            reaction: "I can't take \"let's see\" to Greg, Derek.",
            reaction_ko: "그렉한테 '두고 보자'라고 할 순 없어요, 데릭."
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Commit, plus a stretch. Let's lock it in.",
        reply_ko: '약속한 것에 도전 목표 하나. 이걸로 확정해요.'
      }
    ],
    phrases: [
      {
        id: 'dk_d3_planning.bigger_than_it_looks',
        text: "It's bigger than it looks.",
        meaning_ko: '보기보다 커요.',
        note: 'Warns that a task hides more work than people expect.',
        note_ko: '생각보다 일이 많이 숨어 있다고 알리는 말입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d3_planning.break_it_into',
        text: "Let's break it into two tickets.",
        meaning_ko: '티켓 두 개로 나눠요.',
        note: '"Break into" = divide into smaller parts.',
        note_ko: 'break into는 더 작은 부분으로 나눈다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d3_planning.commit_to',
        text: 'What can we commit to?',
        meaning_ko: '무엇을 약속할 수 있어요?',
        note: '"Commit to" = promise to deliver.',
        note_ko: 'commit to는 해내겠다고 약속한다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d3_planning.doable',
        text: "It's doable.",
        meaning_ko: '할 수 있어요.',
        note: 'Possible, but it will take some effort.',
        note_ko: '가능하지만 노력이 좀 든다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d3_planning.has_to_come_out',
        text: 'If that goes in, something else has to come out.',
        meaning_ko: '그걸 넣으면 다른 걸 빼야 해요.',
        note: 'A firm but fair way to protect the team from too much work.',
        note_ko: '팀에 일이 넘치지 않게 막는, 단호하지만 공정한 표현입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d3_planning.pair_with',
        text: "I'll pair with him if he gets stuck.",
        meaning_ko: '막히면 같이 작업할게요.',
        note: '"Pair" = two developers working on one problem together.',
        note_ko: 'pair는 개발자 둘이 한 문제를 함께 푸는 것입니다.',
        category: 'office'
      },
      {
        id: 'dk_d3_planning.squeeze_in',
        text: 'Can we squeeze it in?',
        meaning_ko: '끼워 넣을 수 있을까요?',
        note: '"Squeeze in" = fit something into a full schedule.',
        note_ko: 'squeeze in은 꽉 찬 일정에 무언가를 끼워 넣는다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d3_planning.stretch_goal',
        text: 'The rest is a stretch goal.',
        meaning_ko: '나머지는 도전 목표예요.',
        note: 'Something you will try to do if there is time, but do not promise.',
        note_ko: '시간이 되면 해 보겠지만 약속하지는 않는 목표입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'dk_d4_incident',
    title: 'Checkout is down',
    title_ko: '결제가 멈췄어요',
    place: 'office_it',
    npc: 'sam',
    day_from: 4,
    day_to: 4,
    time_from: '08:30',
    time_to: '15:00',
    summary: 'You are on call and production is throwing errors. Work the incident with Sam, then give Maya a clear status update: impact, cause, next steps.',
    summary_ko: '당신이 온콜 담당인데 운영 환경에서 오류가 쏟아집니다. 샘과 함께 장애를 처리한 뒤, 마야에게 영향·원인·다음 단계를 분명하게 보고하세요.',
    sort: 10,
    tags: 'incident,on-call,status-update,it',
    calendar: { day: 4, time: '09:00', title: 'On call: checkout alert', title_ko: '온콜: 결제 경보' },
    turns: [
      {
        speaker: 'sam',
        situation: "A gray Thursday morning. Your phone buzzes with an alert from production. You are on call this week, so you head straight to Sam's room.",
        situation_ko: '흐린 목요일 아침입니다. 운영 환경 경보로 전화기가 울립니다. 이번 주 온콜 담당이라 곧장 샘의 방으로 갑니다.',
        line: "Hey, Derek. Your phone's going off too, huh? What are you seeing?",
        line_ko: '어, 데릭. 당신 전화도 울리네요? 뭐가 보여요?',
        prompt: 'Describe the alert: more checkout errors than normal since about 9 a.m.',
        prompt_ko: '경보 내용을 말하세요. 9시쯤부터 결제 오류가 평소보다 많습니다.',
        model: "We're seeing elevated error rates on checkout. It started around nine.",
        model_ko: '결제 쪽 오류율이 올라갔어요. 아홉 시쯤부터 시작됐어요.',
        distractors: [
          {
            text: "We're seeing elevated error rates on login. It started around nine.",
            text_ko: '로그인 쪽 오류율이 올라갔어요. 아홉 시쯤부터 시작됐어요.',
            reaction: 'Login? My dashboard says checkout.',
            reaction_ko: '로그인이요? 제 대시보드엔 결제라고 나오는데요.'
          },
          {
            text: "Somebody must have pushed bad code. Was it Jun? He's new here.",
            text_ko: '누가 잘못된 코드를 올렸나 봐요. 준인가? 신입이잖아요.',
            reaction: "Whoa, let's not point fingers before we even look.",
            reaction_ko: '워, 보기도 전에 누구 탓하지 말죠.'
          },
          {
            text: "Everything's broken! I have no idea what's going on. It's a total disaster.",
            text_ko: '전부 다 망가졌어요! 무슨 일인지 하나도 모르겠어요, 완전 난리예요.',
            reaction: 'Whoa, deep breath. What exactly is failing?',
            reaction_ko: '워, 심호흡해요. 정확히 뭐가 실패해요?'
          }
        ],
        reply_speaker: 'sam',
        reply_line: "Yeah, my dashboard's all red. Have you tried restarting it? Kidding. Mostly.",
        reply_ko: '네, 제 대시보드도 온통 빨개요. 재시작은 해 봤어요? 농담이에요. 반쯤은요.'
      },
      {
        speaker: 'sam',
        situation: 'Sam pulls up the logs on his middle monitor.',
        situation_ko: '샘이 가운데 모니터에 로그를 띄웁니다.',
        line: 'Did anything go out this morning?',
        line_ko: '오늘 아침에 뭐 나간 거 있어요?',
        prompt: 'Nobody has shipped code since Tuesday. Say what that tells you, and ask about his side.',
        prompt_ko: '화요일 이후로 코드를 배포한 사람이 없습니다. 그게 무슨 뜻인지 말하고, 그쪽 사정을 물어보세요.',
        model: 'No deploys since Tuesday, so we can rule out a code change. Did anything change on your end?',
        model_ko: '화요일 이후로 배포가 없었으니까 코드 변경은 아니에요. 그쪽에서 바뀐 거 있어요?',
        distractors: [
          {
            text: "Yes, we deployed at eight thirty, so it's probably our code. Should we roll back?",
            text_ko: '네, 8시 반에 배포했으니까 우리 코드 문제일 거예요. 롤백할까요?',
            reaction: 'Eight thirty? The deploy log says Tuesday was the last one.',
            reaction_ko: '8시 반이요? 배포 기록엔 화요일이 마지막인데요.'
          },
          {
            text: 'No deploys since Tuesday, so it must be on your end. What did your team break?',
            text_ko: '화요일 이후로 배포가 없었으니 그쪽 문제겠네요. 그쪽 팀이 뭘 망가뜨렸어요?',
            reaction: 'Whoa. Let me check before you blame my team.',
            reaction_ko: '워. 우리 팀 탓하기 전에 확인부터 할게요.'
          },
          {
            text: "Not sure, I haven't really checked yet. Can you just restart all the servers and see what happens?",
            text_ko: '모르겠어요, 아직 확인을 못 해 봤어요. 그냥 서버 전부 재시작해 보면 안 돼요?',
            reaction: 'I was kidding about restarting, Derek.',
            reaction_ko: '재시작은 농담이었어요, 데릭.'
          }
        ],
        reply_speaker: 'sam',
        reply_line: 'Let me look. Oh. The certificate on the payment gateway expired at 8:57.',
        reply_ko: '어디 봐요. 아. 결제 게이트웨이 인증서가 8시 57분에 만료됐네요.'
      },
      {
        speaker: 'sam',
        situation: 'Customers cannot pay right now. Every minute counts.',
        situation_ko: '지금 고객들이 결제를 못 하고 있습니다. 1분 1초가 급합니다.',
        line: 'I can renew it, but it takes about twenty minutes to roll out. What do you want to do in the meantime?',
        line_ko: '갱신할 수는 있는데, 적용되는 데 20분쯤 걸려요. 그동안 어떻게 할까요?',
        prompt: "Customers can't pay until the renewal is out. Ask Sam for a quick fix in the meantime: route payments to the backup gateway.",
        prompt_ko: '갱신이 끝날 때까지 고객이 결제를 못 합니다. 그동안 결제를 백업 게이트웨이로 돌려 달라고 샘에게 부탁하세요.',
        model: "Let's stop the bleeding first. As a workaround, can you switch traffic to the backup gateway?",
        model_ko: '우선 피해부터 막죠. 임시방편으로 트래픽을 백업 게이트웨이로 돌려 줄 수 있어요?',
        distractors: [
          {
            text: "Honestly, I'd just wait it out. Twenty minutes isn't that long, and customers can try again later.",
            text_ko: '솔직히 그냥 기다리죠. 20분이면 그렇게 길지 않고, 고객은 나중에 다시 하면 돼요.',
            reaction: "Twenty minutes of no sales? Maya won't love that.",
            reaction_ko: '20분 동안 매출이 0이라고요? 마야가 싫어할걸요.'
          },
          {
            text: "Let's stop the bleeding first. Can you roll back Tuesday's deploy while you renew it?",
            text_ko: '우선 피해부터 막죠. 갱신하는 동안 화요일 배포를 롤백해 줄 수 있어요?',
            reaction: "Roll back? You just said it's not a code change.",
            reaction_ko: '롤백이요? 방금 코드 변경은 아니라면서요.'
          },
          {
            text: "Let's get Maya and the whole team in here first and talk through all our options.",
            text_ko: '먼저 마야랑 팀 전체를 불러서 어떻게 할지 같이 얘기해 보죠.',
            reaction: "A meeting? Customers can't pay right now, man.",
            reaction_ko: '회의요? 지금 고객들이 결제를 못 하고 있다고요.'
          }
        ],
        reply_speaker: 'sam',
        reply_line: 'Switching now. Done. Error rates are dropping.',
        reply_ko: '지금 돌려요. 됐어요. 오류율이 떨어지고 있어요.'
      },
      {
        speaker: 'maya',
        situation: 'Maya appears in the doorway with her laptop under her arm.',
        situation_ko: '마야가 노트북을 옆구리에 끼고 문 앞에 나타납니다.',
        line: "I just saw the alert. What's the status? Give me the short version.",
        line_ko: '방금 경보 봤어요. 상황이 어때요? 짧게 말해 줘요.',
        prompt: "Give Maya a quick status: about forty minutes of failed payments, under control now, and you're still watching it.",
        prompt_ko: '마야에게 간단히 보고하세요. 40분쯤 결제가 실패했고, 지금은 잡혔고, 계속 지켜보는 중입니다.',
        model: "Short version: checkout was failing for about forty minutes. It's mitigated now, and we're monitoring it.",
        model_ko: '짧게 말하면, 결제가 40분쯤 실패했어요. 지금은 완화됐고 모니터링 중이에요.',
        distractors: [
          {
            text: "Short version: checkout was failing for about four minutes. It's mitigated now, and we're monitoring it closely.",
            text_ko: '짧게 말하면, 결제가 4분쯤 실패했어요. 지금은 완화됐고 계속 꼼꼼히 모니터링 중이에요.',
            reaction: 'Four minutes? The alert went off way before that.',
            reaction_ko: '4분이요? 경보는 그보다 훨씬 전에 울렸는데요.'
          },
          {
            text: "Short version: it's completely fixed. Nothing to worry about, so we can all move on now.",
            text_ko: '짧게 말하면, 완전히 해결됐어요. 걱정할 거 없으니 이제 다들 넘어가면 돼요.',
            reaction: 'Completely? Sam still looks pretty busy over there.',
            reaction_ko: '완전히요? 샘은 아직 꽤 바빠 보이는데요.'
          },
          {
            text: 'So around nine my phone buzzed, and I came down here, and then Sam pulled up the logs, and after that...',
            text_ko: '그러니까 아홉 시쯤 전화가 울려서 내려왔는데, 샘이 로그를 띄웠고, 그다음에...',
            reaction: 'Derek. The short version, please.',
            reaction_ko: '데릭. 짧게요, 부탁해요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Okay. Good.',
        reply_ko: '알겠어요. 다행이네요.'
      },
      {
        speaker: 'maya',
        situation: 'Maya opens a new page in her notes.',
        situation_ko: '마야가 메모장의 새 페이지를 엽니다.',
        line: 'Do we know the root cause?',
        line_ko: '근본 원인은 알아요?',
        prompt: "Explain what actually broke, based on what Sam found, and what he's doing about it.",
        prompt_ko: '샘이 찾아낸 내용으로 실제 원인을 설명하고, 그가 어떻게 처리하고 있는지 말하세요.',
        model: 'The root cause was an expired certificate on the payment gateway. Sam is renewing it now.',
        model_ko: '근본 원인은 결제 게이트웨이의 인증서 만료였어요. 지금 샘이 갱신하고 있어요.',
        distractors: [
          {
            text: 'The root cause was a bad deploy on the payment gateway. Sam is rolling it back now.',
            text_ko: '근본 원인은 결제 게이트웨이의 잘못된 배포였어요. 지금 샘이 롤백하고 있어요.',
            reaction: "A deploy? Didn't you say nothing went out since Tuesday?",
            reaction_ko: '배포요? 화요일 이후엔 나간 게 없다면서요?'
          },
          {
            text: "Sam's team let the certificate on the payment gateway expire. That one's on them.",
            text_ko: '샘 팀이 결제 게이트웨이 인증서를 만료되게 놔뒀어요. 그건 그쪽 책임이에요.',
            reaction: "Let's keep this blameless, Derek. We fix systems, not people.",
            reaction_ko: '누구 탓은 하지 말죠, 데릭. 고칠 건 사람이 아니라 시스템이에요.'
          },
          {
            text: 'The root cause was an expired certificate on the payment gateway. It renewed itself already.',
            text_ko: '근본 원인은 결제 게이트웨이의 인증서 만료였어요. 벌써 자동으로 갱신됐어요.',
            reaction: 'Already? Then why is Sam still typing?',
            reaction_ko: '벌써요? 그럼 샘은 왜 아직 뭘 치고 있어요?'
          }
        ],
        reply_speaker: 'sam',
        reply_line: 'Ten more minutes and the new one is live.',
        reply_ko: '10분만 더 있으면 새 인증서가 적용돼요.'
      },
      {
        speaker: 'maya',
        situation: 'She looks from Sam to you.',
        situation_ko: '그녀가 샘을 보다가 당신을 봅니다.',
        line: 'Summit Retail is going to ask about this. What are the next steps?',
        line_ko: '서밋 리테일이 이 건에 대해 물어볼 거예요. 다음 단계는 뭐예요?',
        prompt: 'Lay out the follow-up: a written report on what happened by tomorrow, a warning before certificates run out, and regular updates.',
        prompt_ko: '후속 조치를 말하세요. 내일까지 경위 보고서, 인증서가 만료되기 전에 울리는 경보, 그리고 꾸준한 상황 공유.',
        model: "I'll write up a postmortem by tomorrow and add an alert for expiring certificates. I'll keep you posted.",
        model_ko: '내일까지 사후 분석 보고서를 쓰고, 인증서 만료 경보를 추가할게요. 계속 상황 공유할게요.',
        distractors: [
          {
            text: "I'll write up a postmortem by next month and add an alert for expiring certificates. I'll keep you posted.",
            text_ko: '다음 달까지 사후 분석 보고서를 쓰고, 인증서 만료 경보를 추가할게요. 계속 상황 공유할게요.',
            reaction: "Next month? They'll want answers this week.",
            reaction_ko: '다음 달이요? 그쪽은 이번 주에 답을 원할 거예요.'
          },
          {
            text: "Honestly, I'd rather not tell Summit Retail anything at all. It was only forty minutes.",
            text_ko: '솔직히 서밋 리테일한텐 아무 말 안 하는 게 좋겠어요. 40분밖에 안 됐잖아요.',
            reaction: "We don't hide incidents from clients. Not here.",
            reaction_ko: '우리는 고객한테 장애를 숨기지 않아요. 여기선요.'
          },
          {
            text: "I'll promise Greg it will never happen again, and we'll give them a free month of service.",
            text_ko: '그렉한테 다시는 이런 일 없다고 약속하고, 한 달 서비스를 무료로 해 줄게요.',
            reaction: "Whoa. A free month isn't your call to make.",
            reaction_ko: '워. 한 달 무료는 데릭이 정할 일이 아니에요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Perfect. Nicely handled, both of you.',
        reply_ko: '완벽해요. 두 사람 다 잘 처리했어요.'
      }
    ],
    phrases: [
      {
        id: 'dk_d4_incident.error_rates',
        text: "We're seeing elevated error rates on checkout.",
        meaning_ko: '결제에서 오류율이 높아졌어요.',
        note: '"Elevated" = higher than normal. A calm, factual way to report a problem.',
        note_ko: 'elevated는 평소보다 높다는 뜻입니다. 문제를 차분하고 사실대로 알리는 표현입니다.',
        category: 'office'
      },
      {
        id: 'dk_d4_incident.mitigated',
        text: "It's mitigated now, and we're monitoring it.",
        meaning_ko: '지금은 완화됐고, 지켜보는 중이에요.',
        note: '"Mitigated" = the impact has stopped, even if the cause is not fixed yet.',
        note_ko: 'mitigated는 원인은 아직이어도 영향은 멈췄다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d4_incident.on_call',
        text: "I'm on call this week.",
        meaning_ko: '이번 주는 제가 온콜 담당이에요.',
        note: 'The on-call person must answer alerts, even at night or on weekends.',
        note_ko: '온콜 담당자는 밤이나 주말에도 경보에 대응해야 합니다.',
        category: 'office'
      },
      {
        id: 'dk_d4_incident.on_your_end',
        text: 'Did anything change on your end?',
        meaning_ko: '그쪽에서 바뀐 게 있어요?',
        note: '"On your end" = on your side, in your part of the system.',
        note_ko: 'on your end는 당신 쪽, 당신이 맡은 부분이라는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d4_incident.postmortem',
        text: "I'll write up a postmortem.",
        meaning_ko: '사후 분석 보고서를 쓸게요.',
        note: 'A postmortem explains what happened, why, and how to prevent it. "Write up" = write a report.',
        note_ko: 'postmortem은 무슨 일이 왜 일어났고 어떻게 막을지 설명하는 문서입니다. write up은 보고서를 쓴다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d4_incident.rule_out',
        text: 'We can rule out a code change.',
        meaning_ko: '코드 변경은 원인에서 빼도 돼요.',
        note: '"Rule out" = decide that something is not the cause.',
        note_ko: 'rule out은 그것이 원인이 아니라고 배제한다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d4_incident.stop_the_bleeding',
        text: "Let's stop the bleeding first.",
        meaning_ko: '우선 피해부터 막아요.',
        note: 'Limit the damage now, and fix the real cause afterward.',
        note_ko: '지금은 피해를 줄이고 진짜 원인은 나중에 고치자는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'dk_d4_incident.workaround',
        text: 'as a workaround',
        meaning_ko: '임시방편으로',
        note: 'A workaround avoids a problem without really fixing it.',
        note_ko: 'workaround는 문제를 제대로 고치지 않고 피해 가는 방법입니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'dk_d5_demo',
    title: 'Sharing the credit',
    title_ko: '공을 나누기',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 5,
    day_to: 5,
    time_from: '10:15',
    time_to: '14:00',
    summary: 'At the sprint demo, give Jun the credit, handle a question you cannot answer, and speak up in the retro.',
    summary_ko: '스프린트 데모에서 준에게 공을 돌리고, 답할 수 없는 질문에 대처하고, 회고에서 의견을 말하세요.',
    sort: 10,
    tags: 'meeting,demo,retro,credit',
    calendar: { day: 5, time: '11:00', title: 'Sprint demo and retro', title_ko: '스프린트 데모와 회고' },
    turns: [
      {
        speaker: 'priya',
        situation: 'Friday. The team and a few people from sales are in the meeting room. Jun is holding his laptop tightly.',
        situation_ko: '금요일입니다. 회의실에 팀원들과 영업팀 몇 명이 있습니다. 준이 노트북을 꼭 쥐고 있습니다.',
        line: 'Okay, demo time! Derek, do you want to show us the card payment fix?',
        line_ko: '자, 데모 시간이에요! 데릭, 카드 결제 수정 보여 줄래요?',
        prompt: 'Jun did most of the work on this. Make sure he gets the spotlight.',
        prompt_ko: '이 작업은 준이 대부분 했습니다. 그가 주목받게 해 주세요.',
        model: "Actually, Jun did the heavy lifting on that one, so I'll hand it over to him.",
        model_ko: '사실 그건 준이 거의 다 했어요. 그래서 준한테 넘길게요.',
        distractors: [
          {
            text: 'Sure. It was a tough one, but I got it working in the end. Let me share my screen.',
            text_ko: '네. 꽤 까다로웠는데 결국 제가 돌아가게 만들었어요. 화면 공유할게요.',
            reaction: 'Oh. I thought Jun wrote most of it?',
            reaction_ko: '아. 준이 거의 다 짠 줄 알았는데요?'
          },
          {
            text: "Jun can show it. It's a small fix, so even a new guy can demo it.",
            text_ko: '준이 보여 주면 돼요. 작은 수정이라 신입도 데모할 수 있어요.',
            reaction: 'Okay... maybe give him a little more credit than that.',
            reaction_ko: '음... 그것보단 좀 더 인정해 줘도 될 텐데요.'
          },
          {
            text: "Actually, Sam did the heavy lifting on that one, so I'll hand it over to him.",
            text_ko: '사실 그건 샘이 거의 다 했어요. 그래서 샘한테 넘길게요.',
            reaction: "Sam? Sam's in IT. Jun built this, didn't he?",
            reaction_ko: '샘이요? 샘은 IT잖아요. 이건 준이 만든 거 아니에요?'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Love it. Jun, you're up first!",
        reply_ko: '좋아요. 준, 첫 순서예요!'
      },
      {
        speaker: 'priya',
        situation: 'Jun finishes his demo, and people clap. Someone from sales raises a hand.',
        situation_ko: '준이 데모를 마치자 사람들이 박수를 칩니다. 영업팀의 누군가가 손을 듭니다.',
        line: 'A question from sales: how many failed payments will this save us per month? Derek?',
        line_ko: '영업팀 질문이에요. 이걸로 한 달에 실패하는 결제가 몇 건이나 줄어요? 데릭?',
        prompt: "You don't know the figure right now. Be honest, and promise an answer on Monday.",
        prompt_ko: '그 수치는 지금 모릅니다. 솔직하게 말하고 월요일에 답을 주겠다고 약속하세요.',
        model: "I don't have that number off the top of my head. Let me get back to you by Monday.",
        model_ko: '그 숫자는 지금 바로는 모르겠어요. 월요일까지 알려 드릴게요.',
        distractors: [
          {
            text: "Probably around a thousand a month, give or take. Don't quote me on that, though.",
            text_ko: '아마 한 달에 천 건 정도일 거예요. 그렇다고 이 숫자를 인용하진 마세요.',
            reaction: "Hmm, sales will quote you on that. Let's get the real number.",
            reaction_ko: '음, 영업팀은 그대로 인용할 거예요. 진짜 숫자를 구하죠.'
          },
          {
            text: "I don't have that number off the top of my head. Let me get back to you next month.",
            text_ko: '그 숫자는 지금 바로는 모르겠어요. 다음 달까지 알려 드릴게요.',
            reaction: 'Next month is a long time. Can we do sooner?',
            reaction_ko: '다음 달은 너무 늦어요. 좀 더 빨리 안 될까요?'
          },
          {
            text: "That's more of a question for sales, isn't it? We just write the code.",
            text_ko: '그건 영업팀이 알아야 할 질문 아니에요? 우리는 코드만 짜는데요.',
            reaction: "Well, they're asking you, Derek.",
            reaction_ko: '음, 데릭한테 묻는 건데요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Fair enough. I'll note it as an action item.",
        reply_ko: '그럴 수 있죠. 할 일 목록에 적어 둘게요.'
      },
      {
        speaker: 'priya',
        situation: 'Priya looks at the agenda.',
        situation_ko: '프리야가 안건을 봅니다.',
        line: 'Your turn. Anything to show for gift cards?',
        line_ko: '당신 차례예요. 기프트 카드는 보여 줄 거 있어요?',
        prompt: 'Nothing to demo yet. Give a progress report: one of the two tickets is finished, the other is due next week.',
        prompt_ko: '아직 보여 줄 건 없습니다. 진행 상황을 보고하세요. 티켓 두 개 중 하나는 끝났고, 나머지는 다음 주 예정입니다.',
        model: "It's still a work in progress. The first ticket is done, and the second is on track for next week.",
        model_ko: '아직 진행 중이에요. 첫 번째 티켓은 끝났고, 두 번째는 다음 주 일정대로 가고 있어요.',
        distractors: [
          {
            text: "It's all done, actually. Both tickets are finished and tested, so we can ship it to Greg's team today.",
            text_ko: '사실 다 끝났어요. 티켓 두 개 다 끝나고 테스트도 마쳐서 오늘 그렉네 팀에 내보낼 수 있어요.',
            reaction: 'Both? I thought the second one was planned for next week.',
            reaction_ko: '둘 다요? 두 번째는 다음 주 예정인 줄 알았는데요.'
          },
          {
            text: "It's still a work in progress. Neither ticket is done yet, but we should be fine.",
            text_ko: '아직 진행 중이에요. 티켓은 하나도 안 끝났지만 괜찮을 거예요.',
            reaction: 'Neither? I thought the first one was closed.',
            reaction_ko: '하나도요? 첫 번째는 끝난 줄 알았는데요.'
          },
          {
            text: "Not really. The incident ate my whole week, so don't blame me if it's late.",
            text_ko: '별로요. 장애 때문에 이번 주가 통째로 날아갔으니 늦어도 제 탓 하지 마세요.',
            reaction: "Nobody's blaming you. Just tell us where it stands.",
            reaction_ko: '아무도 탓 안 해요. 어디까지 됐는지만 말해 줘요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Good enough for me. Let's switch to the retro.",
        reply_ko: '그 정도면 충분해요. 회고로 넘어가요.'
      },
      {
        speaker: 'priya',
        situation: 'Priya draws two columns on the whiteboard.',
        situation_ko: '프리야가 화이트보드에 두 칸을 그립니다.',
        line: 'What went well this sprint?',
        line_ko: '이번 스프린트에서 잘된 건 뭐예요?',
        prompt: 'Recognize two people: Sam for how he handled the outage, and Jun for how quickly he got up to speed.',
        prompt_ko: '두 사람을 칭찬하세요. 장애 때 샘의 대처, 그리고 준이 얼마나 빨리 적응했는지.',
        model: 'Shout-out to Sam for the quick fix during the incident. And Jun ramped up really fast.',
        model_ko: '장애 때 빠르게 고쳐 준 샘한테 박수를. 그리고 준이 정말 빨리 적응했어요.',
        distractors: [
          {
            text: 'Honestly, I handled the incident pretty well, and I carried most of the sprint.',
            text_ko: '솔직히 장애는 제가 꽤 잘 처리했고, 스프린트도 거의 제가 끌고 갔죠.',
            reaction: "Okay... anyone else you'd like to thank?",
            reaction_ko: '음... 다른 고마운 사람은 없어요?'
          },
          {
            text: 'Shout-out to Jun for the quick fix during the incident. And Sam ramped up really fast.',
            text_ko: '장애 때 빠르게 고쳐 준 준한테 박수를. 그리고 샘이 정말 빨리 적응했어요.',
            reaction: "Wait, wasn't it the other way around?",
            reaction_ko: '잠깐, 반대 아니에요?'
          },
          {
            text: "Not much, honestly. We had an outage, and the gift cards still aren't done.",
            text_ko: '솔직히 별로 없어요. 장애도 났고 기프트 카드도 아직 안 끝났잖아요.',
            reaction: "That's the next column, Derek. What went well?",
            reaction_ko: '그건 다음 칸이에요, 데릭. 잘된 건요?'
          }
        ],
        reply_speaker: 'priya',
        reply_line: 'Agreed on both. Kudos, Sam and Jun!',
        reply_ko: '둘 다 동의해요. 샘, 준, 잘했어요!'
      },
      {
        speaker: 'priya',
        situation: 'She points at the second column.',
        situation_ko: '그녀가 두 번째 칸을 가리킵니다.',
        line: 'And what could we do better?',
        line_ko: '그럼 더 잘할 수 있는 건 뭐예요?',
        prompt: "Name the problem: plans kept shifting during the sprint. Propose freezing what's in once it begins.",
        prompt_ko: '문제를 짚으세요. 스프린트 도중에 계획이 자꾸 바뀌었습니다. 시작하면 더는 바꾸지 말자고 제안하세요.',
        model: "Too much changed mid-sprint. Going forward, let's lock the scope once the sprint starts.",
        model_ko: '스프린트 도중에 너무 많이 바뀌었어요. 앞으로는 스프린트가 시작되면 범위를 고정하죠.',
        distractors: [
          {
            text: 'You keep adding work mid-sprint, Priya. Please stop doing that to the team.',
            text_ko: '프리야가 스프린트 도중에 자꾸 일을 추가하잖아요. 팀한테 제발 그러지 마세요.',
            reaction: 'Ouch. That felt a little personal.',
            reaction_ko: '아야. 좀 저 들으라고 하는 말 같네요.'
          },
          {
            text: "Too much changed mid-sprint. Going forward, let's skip formal planning and just go with the flow.",
            text_ko: '스프린트 도중에 너무 많이 바뀌었어요. 앞으로는 정식 계획 없이 그냥 흐름대로 가죠.',
            reaction: 'Skip planning? I think that would make it worse.',
            reaction_ko: '계획을 건너뛰자고요? 더 나빠질 것 같은데요.'
          },
          {
            text: 'Honestly, nothing. Everything went perfectly this sprint, from start to finish.',
            text_ko: '솔직히 없어요. 이번 스프린트는 처음부터 끝까지 완벽했어요.',
            reaction: 'Perfectly? We had an outage on Thursday.',
            reaction_ko: '완벽했다고요? 목요일에 장애가 났잖아요.'
          }
        ],
        reply_speaker: 'priya',
        reply_line: "Ouch, but fair. I'll push back on late requests myself.",
        reply_ko: '아프지만 맞는 말이에요. 늦게 들어오는 요청은 제가 막을게요.'
      }
    ],
    phrases: [
      {
        id: 'dk_d5_demo.action_item',
        text: 'an action item',
        meaning_ko: '후속 조치 항목',
        note: 'A task someone must do after a meeting.',
        note_ko: '회의 뒤에 누군가 해야 하는 일입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d5_demo.get_back_to_you',
        text: 'Let me get back to you by Monday.',
        meaning_ko: '월요일까지 알려 드릴게요.',
        note: 'Better than guessing. Always add a date.',
        note_ko: '짐작하는 것보다 낫습니다. 날짜를 꼭 덧붙이세요.',
        category: 'meeting'
      },
      {
        id: 'dk_d5_demo.going_forward',
        text: "Going forward, let's lock the scope.",
        meaning_ko: '앞으로는 범위를 고정해요.',
        note: '"Going forward" = from now on.',
        note_ko: 'going forward는 앞으로는, 이제부터는이라는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d5_demo.hand_it_over',
        text: "I'll hand it over to him.",
        meaning_ko: '그에게 넘길게요.',
        note: 'Passes the floor to another speaker.',
        note_ko: '발언 순서를 다른 사람에게 넘길 때 씁니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d5_demo.heavy_lifting',
        text: 'Jun did the heavy lifting on that one.',
        meaning_ko: '그건 준이 거의 다 했어요.',
        note: '"Do the heavy lifting" = do the hardest part of the work. A generous way to give credit.',
        note_ko: 'do the heavy lifting은 가장 힘든 부분을 했다는 뜻입니다. 공을 돌리는 너그러운 표현입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d5_demo.shout_out',
        text: 'Shout-out to Sam for the quick fix.',
        meaning_ko: '빠르게 고쳐 준 샘에게 박수를 보내요.',
        note: 'Public thanks or praise for someone. "Kudos" means the same.',
        note_ko: '누군가를 공개적으로 칭찬하거나 고마워하는 말입니다. kudos도 같은 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d5_demo.top_of_my_head',
        text: "I don't have that number off the top of my head.",
        meaning_ko: '그 숫자는 지금 바로 기억나지 않아요.',
        note: '"Off the top of my head" = from memory, without checking.',
        note_ko: 'off the top of my head는 확인하지 않고 기억만으로라는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'dk_d5_demo.work_in_progress',
        text: "It's still a work in progress.",
        meaning_ko: '아직 진행 중이에요.',
        note: 'Not finished yet, but moving.',
        note_ko: '아직 끝나지 않았지만 진행되고 있다는 뜻입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'dk_d5_happy_hour',
    title: 'Rounding up the team',
    title_ko: '해피아워 멤버 모으기',
    place: 'office_lobby',
    npc: 'tom',
    day_from: 5,
    day_to: 5,
    time_from: '15:00',
    time_to: '18:30',
    summary: 'It is Friday and the sky is clear. Invite Tom to happy hour at the Anchor, tell him what you are celebrating, and explain why Jun is taking a rain check.',
    summary_ko: '금요일이고 하늘이 맑습니다. 톰을 앵커의 해피아워에 초대하고, 무엇을 축하하는지 말하고, 준이 왜 다음으로 미뤘는지 설명하세요.',
    sort: 20,
    tags: 'small-talk,social,invitation',
    calendar: { day: 5, time: '17:30', title: 'Team happy hour at the Anchor', title_ko: '앵커에서 팀 해피아워' },
    turns: [
      {
        speaker: 'tom',
        situation: 'Friday afternoon. Jun has already told you he is too tired to come tonight. You stop at the front desk on your way out.',
        situation_ko: '금요일 오후입니다. 준은 너무 피곤해서 오늘은 못 가겠다고 이미 말했습니다. 나가는 길에 프런트 데스크에 들릅니다.',
        line: 'Happy Friday, Derek! Heading out already?',
        line_ko: '즐거운 금요일이에요, 데릭! 벌써 퇴근해요?',
        prompt: 'Tell Tom about the after-work drinks at the Anchor, and invite him along.',
        prompt_ko: '퇴근 후 앵커에서 한잔하는 자리를 알려 주고 톰을 초대하세요.',
        model: 'Almost. A bunch of us are going to happy hour at the Anchor. Are you in?',
        model_ko: '거의요. 몇 명이서 앵커에 해피아워 가는데, 같이 갈래요?',
        distractors: [
          {
            text: 'Almost. A bunch of us are going to happy hour at the Sunny Side. Are you in?',
            text_ko: '거의요. 몇 명이서 서니 사이드에 해피아워 가는데, 같이 갈래요?',
            reaction: 'The diner? Since when does Rosa serve beer?',
            reaction_ko: '그 다이너요? 로사네가 언제부터 맥주를 팔았어요?'
          },
          {
            text: 'Pretty much. Just dropping off my badge. Have a good weekend, Tom!',
            text_ko: '그런 셈이에요. 출입증만 놓고 가려고요. 주말 잘 보내요, 톰!',
            reaction: 'You too! Doing anything fun tonight?',
            reaction_ko: '데릭도요! 오늘 밤에 뭐 재밌는 거 해요?'
          },
          {
            text: "Almost. We're going to the Anchor, and you're coming whether you like it or not.",
            text_ko: '거의요. 앵커에 가는데, 톰도 싫든 좋든 같이 가는 거예요.',
            reaction: 'Whoa, easy. Ask me nicely and I might say yes.',
            reaction_ko: '워, 진정해요. 좋게 물어보면 갈 수도 있죠.'
          }
        ],
        reply_speaker: 'tom',
        reply_line: 'The Anchor? With the patio? Count me in.',
        reply_ko: '앵커요? 야외 자리 있는 데? 저도 갈게요.'
      },
      {
        speaker: 'tom',
        situation: 'Tom checks the clock above the elevators.',
        situation_ko: '톰이 엘리베이터 위의 시계를 봅니다.',
        line: 'What time are you all heading over?',
        line_ko: '다들 몇 시에 가요?',
        prompt: "Give the time, 5:30, and let him know you're buying the first drinks.",
        prompt_ko: '시간은 5시 반이라고 알려 주고, 처음 마실 건 당신이 산다고 하세요.',
        model: "Around five thirty. And the first round's on me.",
        model_ko: '다섯 시 반쯤이요. 그리고 첫 잔은 제가 살게요.',
        distractors: [
          {
            text: "Around six thirty. And the first round's on me.",
            text_ko: '여섯 시 반쯤이요. 그리고 첫 잔은 제가 살게요.',
            reaction: "Six thirty? That's late. The patio fills up by then.",
            reaction_ko: '여섯 시 반이요? 늦네요. 그때면 야외 자리 다 차요.'
          },
          {
            text: 'Around five thirty. Everyone pays for their own, though.',
            text_ko: '다섯 시 반쯤이요. 근데 계산은 각자 해요.',
            reaction: "Fair enough. I'll bring my wallet.",
            reaction_ko: '그러죠. 지갑 챙길게요.'
          },
          {
            text: 'Right now, actually. Can you leave the desk early?',
            text_ko: '지금 바로요. 데스크 일찍 비우고 나올 수 있어요?',
            reaction: 'Leave early? Somebody has to lock up, Derek.',
            reaction_ko: '일찍 나가라고요? 누군가는 문단속해야죠, 데릭.'
          }
        ],
        reply_speaker: 'tom',
        reply_line: "Now you're talking!",
        reply_ko: '그거 좋네요!'
      },
      {
        speaker: 'tom',
        situation: 'He grins.',
        situation_ko: '그가 활짝 웃습니다.',
        line: "So what's the occasion?",
        line_ko: '그래서 무슨 날이에요?',
        prompt: "Explain why you're celebrating: the outage you got through, and the new guy's first week.",
        prompt_ko: '무엇을 축하하는지 설명하세요. 장애를 넘긴 것, 그리고 신입의 첫 주요.',
        model: 'We survived an incident, and Jun made it through his first week. That calls for a drink.',
        model_ko: '장애를 무사히 넘겼고, 준이 첫 주를 잘 버텼거든요. 한잔할 만하죠.',
        distractors: [
          {
            text: 'We survived an incident, and Jun made it through his first month. That calls for a drink.',
            text_ko: '장애를 무사히 넘겼고, 준이 첫 달을 잘 버텼거든요. 한잔할 만하죠.',
            reaction: "His first month? He started on Monday, didn't he?",
            reaction_ko: '첫 달이요? 월요일에 왔잖아요?'
          },
          {
            text: 'Checkout was down for forty minutes and Summit Retail is furious. Long story.',
            text_ko: '결제가 40분 동안 먹통이었고 서밋 리테일은 엄청 화났어요. 얘기하면 길어요.',
            reaction: "Yikes. Maybe don't say that too loud in the lobby.",
            reaction_ko: '이런. 로비에서 그렇게 크게 말하진 마요.'
          },
          {
            text: "No occasion, really. It's just Friday, and I need a drink after this week.",
            text_ko: '딱히 이유는 없어요. 그냥 금요일이고, 이번 주는 한잔해야겠어요.',
            reaction: 'Ha, fair. Rough week?',
            reaction_ko: '하, 그럴 만하네요. 힘든 한 주였어요?'
          }
        ],
        reply_speaker: 'tom',
        reply_line: "I'll drink to that.",
        reply_ko: '그건 건배할 만하네요.'
      },
      {
        speaker: 'tom',
        situation: 'Tom looks toward the elevators.',
        situation_ko: '톰이 엘리베이터 쪽을 봅니다.',
        line: 'Is Jun coming along?',
        line_ko: '준도 같이 가요?',
        prompt: "Jun is skipping tonight because he's exhausted, but he wants to join next time. Explain.",
        prompt_ko: '준은 너무 지쳐서 오늘은 빠지지만 다음엔 오고 싶어 합니다. 설명하세요.',
        model: "He's taking a rain check. He's pretty wiped out, but he says he'll come next time.",
        model_ko: '다음으로 미룬대요. 꽤 녹초가 됐는데, 다음번엔 오겠대요.',
        distractors: [
          {
            text: "Yeah, he's meeting us there around six. He's just finishing up a ticket.",
            text_ko: '네, 여섯 시쯤 거기서 만나기로 했어요. 티켓 하나만 마무리하고요.',
            reaction: 'Really? He just walked past me with his bag on.',
            reaction_ko: '그래요? 방금 가방 메고 제 앞을 지나갔는데요.'
          },
          {
            text: "Nah, he bailed on us. Kind of antisocial, if you ask me. Maybe he's just not a bar guy.",
            text_ko: '아뇨, 빠졌어요. 좀 비사교적이에요. 술자리 체질이 아닌가 봐요.',
            reaction: "Come on, the kid's had a long week.",
            reaction_ko: '에이, 그 친구 한 주가 길었잖아요.'
          },
          {
            text: "No, he doesn't really drink, so I didn't even bother inviting him.",
            text_ko: '아뇨, 준은 술을 별로 안 마셔서 아예 안 불렀어요.',
            reaction: "You didn't even ask him? That's cold, Derek.",
            reaction_ko: '물어보지도 않았어요? 좀 차갑네요, 데릭.'
          }
        ],
        reply_speaker: 'tom',
        reply_line: 'Poor guy. The first week will do that to you.',
        reply_ko: '안됐네요. 첫 주는 원래 그래요.'
      },
      {
        speaker: 'tom',
        situation: 'Tom starts to tidy up the front desk.',
        situation_ko: '톰이 프런트 데스크를 정리하기 시작합니다.',
        line: 'Mind if I bring Linda? She said she was free tonight.',
        line_ko: '린다 데려가면 곤란할까요? 오늘 밤 시간 된다던데.',
        prompt: "You'd love to have Linda there, too. Say so, and promise them seats.",
        prompt_ko: '린다도 오면 좋겠습니다. 그렇게 말하고, 두 사람 자리를 맡아 두겠다고 하세요.',
        model: "Not at all. The more, the merrier. I'll save you both a seat.",
        model_ko: '전혀요. 많을수록 좋죠. 두 사람 자리 맡아 둘게요.',
        distractors: [
          {
            text: "Yes, I do mind. It's more of a team thing tonight, sorry.",
            text_ko: '네, 좀 곤란해요. 오늘은 팀끼리 하는 자리라서요, 미안해요.',
            reaction: 'Oh. Okay. Never mind, then.',
            reaction_ko: '아. 네. 그럼 됐어요.'
          },
          {
            text: "Not at all. But I'm only buying the first round for the team.",
            text_ko: '전혀요. 근데 첫 잔은 우리 팀 것만 사는 거예요.',
            reaction: "Ha, generous. I'll tell her to bring cash.",
            reaction_ko: '하, 통 크시네. 현금 챙기라고 할게요.'
          },
          {
            text: "Yes, of course! Bring her. I'll save you both a seat.",
            text_ko: '네, 그럼요! 데려와요. 두 사람 자리 맡아 둘게요.',
            reaction: 'Wait. Yes, you mind? Or yes, she can come?',
            reaction_ko: '잠깐만요. 곤란하다는 거예요, 데려오라는 거예요?'
          }
        ],
        reply_speaker: 'tom',
        reply_line: 'See you there. Let me just lock up here.',
        reply_ko: '거기서 봐요. 여기 문단속만 하고요.'
      }
    ],
    phrases: [
      {
        id: 'dk_d5_happy_hour.a_bunch_of_us',
        text: 'A bunch of us are going to happy hour.',
        meaning_ko: '몇 명이 같이 해피아워에 가요.',
        note: '"A bunch of us" = a group of us. Casual.',
        note_ko: 'a bunch of us는 우리 여럿이라는 편한 표현입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d5_happy_hour.calls_for',
        text: 'That calls for a drink.',
        meaning_ko: '그건 한잔해야 할 일이죠.',
        note: '"That calls for …" = that is a good reason for ….',
        note_ko: '"That calls for …"는 그럴 만한 이유가 된다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d5_happy_hour.count_me_in',
        text: 'Count me in.',
        meaning_ko: '저도 갈게요.',
        note: 'Answers "Are you in?" The opposite is "Count me out."',
        note_ko: '"Are you in?"에 대한 대답입니다. 반대는 "Count me out."입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d5_happy_hour.first_round',
        text: "The first round's on me.",
        meaning_ko: '첫 잔은 제가 살게요.',
        note: 'A round is one drink for everyone in the group.',
        note_ko: 'round는 일행 모두에게 한 잔씩 돌리는 것입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d5_happy_hour.more_the_merrier',
        text: 'The more, the merrier.',
        meaning_ko: '많을수록 좋죠.',
        note: 'More people make it more fun. Said when someone asks to bring a friend.',
        note_ko: '사람이 많을수록 즐겁다는 뜻입니다. 누가 친구를 데려와도 되냐고 물을 때 씁니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d5_happy_hour.save_a_seat',
        text: "I'll save you both a seat.",
        meaning_ko: '두 분 자리 맡아 둘게요.',
        note: '"Save a seat" = keep a seat free for someone.',
        note_ko: 'save a seat는 누군가를 위해 자리를 맡아 둔다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d5_happy_hour.taking_rain_check',
        text: "He's taking a rain check.",
        meaning_ko: '그는 다음으로 미뤘어요.',
        note: 'He said no this time but wants to come another time.',
        note_ko: '이번엔 못 오지만 다음에는 오고 싶다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_d5_happy_hour.the_occasion',
        text: "What's the occasion?",
        meaning_ko: '무슨 좋은 일 있어요?',
        note: 'Asks what is being celebrated.',
        note_ko: '무엇을 축하하는지 묻는 말입니다.',
        category: 'small-talk'
      }
    ]
  },
  {
    id: 'dk_w_market',
    title: 'Groceries for the barbecue',
    title_ko: '바비큐 장보기',
    place: 'market_checkout',
    npc: 'mike',
    day_from: 6,
    day_to: 7,
    time_from: '09:00',
    time_to: '21:00',
    summary: 'You are grilling for friends this weekend. Check out at Fairview Market: catch a deal, ask where the charcoal is, and carry it all to the car.',
    summary_ko: '이번 주말 친구들에게 바비큐를 대접합니다. 페어뷰 마켓에서 계산하세요. 할인을 챙기고, 숯이 어디 있는지 묻고, 짐을 차까지 옮기세요.',
    sort: 10,
    tags: 'shopping,market,barbecue,weekend',
    calendar: { day: 6, time: '10:00', title: 'Grocery run for the barbecue', title_ko: '바비큐 장보기' },
    turns: [
      {
        speaker: 'mike',
        situation: 'A sunny weekend. Your cart is full of burger patties, buns, and corn. Mike starts scanning.',
        situation_ko: '화창한 주말입니다. 카트에 버거 패티와 빵, 옥수수가 가득합니다. 마이크가 바코드를 찍기 시작합니다.',
        line: "Hey, Derek! Whoa, that's a lot of burgers. Having a party?",
        line_ko: '어, 데릭! 와, 버거가 엄청 많네요. 파티해요?',
        prompt: 'Tell him what all this food is for.',
        prompt_ko: '이 많은 음식이 어디에 쓸 건지 말하세요.',
        model: "Yeah, I'm having some friends over for a barbecue this weekend.",
        model_ko: '네, 이번 주말에 친구들 불러서 바비큐 하거든요.',
        distractors: [
          {
            text: 'Yeah, my office is having a team picnic on Monday.',
            text_ko: '네, 월요일에 회사에서 팀 소풍을 가거든요.',
            reaction: 'A team picnic on a Monday? Lucky you.',
            reaction_ko: '월요일에 팀 소풍이요? 좋겠네요.'
          },
          {
            text: 'Something like that. Can you just scan them, please?',
            text_ko: '뭐 그런 셈이죠. 그냥 바코드나 좀 찍어 주실래요?',
            reaction: 'Sure thing. Just making conversation.',
            reaction_ko: '그럼요. 그냥 말 좀 건 거예요.'
          },
          {
            text: "No party. They were on sale, so I'm stocking up the freezer for the month.",
            text_ko: '파티는 아니고요. 세일하길래 한 달 치 냉동실 채워 두려고요.',
            reaction: 'On sale? Not the patties. Those are full price.',
            reaction_ko: '세일이요? 패티는 정가인데요.'
          }
        ],
        reply_speaker: 'mike',
        reply_line: 'Nice! Perfect weather for it.',
        reply_ko: '좋네요! 바비큐 하기 딱 좋은 날씨예요.'
      },
      {
        speaker: 'mike',
        situation: 'Mike holds up your bag of corn.',
        situation_ko: '마이크가 옥수수 봉지를 들어 보입니다.',
        line: "Heads-up: corn on the cob is five for two dollars this week, and you've only got three. Want to grab two more?",
        line_ko: '참고로요, 옥수수가 이번 주 다섯 개에 2달러인데 세 개만 담으셨어요. 두 개 더 가져올래요?',
        prompt: 'Thank him for the tip, and go get the extra corn quickly.',
        prompt_ko: '알려 줘서 고맙다고 하고, 얼른 옥수수를 더 가져오세요.',
        model: "Good catch. I'll run and grab two more. I'll be right back.",
        model_ko: '잘 봤네요. 얼른 두 개 더 가져올게요. 금방 와요.',
        distractors: [
          {
            text: "Good catch. I'll run and grab three more. I'll be right back.",
            text_ko: '잘 봤네요. 얼른 세 개 더 가져올게요. 금방 와요.',
            reaction: 'Three? You only need two more to make five.',
            reaction_ko: '세 개요? 다섯 개 되려면 두 개만 더 있으면 돼요.'
          },
          {
            text: 'No, thanks. Three is plenty. Just ring them up as they are.',
            text_ko: '아뇨, 괜찮아요. 세 개면 충분해요. 그냥 찍어 주세요.',
            reaction: "Your call. You're paying more for fewer, though.",
            reaction_ko: '마음대로 하세요. 덜 사고 더 내는 거지만요.'
          },
          {
            text: "Could you go grab them for me? There's a line behind me.",
            text_ko: '직접 좀 가져다줄래요? 뒤에 줄이 있어서요.',
            reaction: "Sorry, I can't leave the register.",
            reaction_ko: '죄송해요, 계산대를 비울 수가 없어요.'
          }
        ],
        reply_speaker: 'mike',
        reply_line: "No problem. I'll keep ringing you up.",
        reply_ko: '괜찮아요. 계속 계산하고 있을게요.'
      },
      {
        speaker: 'mike',
        situation: 'You come back with two more ears of corn.',
        situation_ko: '옥수수 두 개를 더 들고 돌아옵니다.',
        line: 'Did you find everything else okay?',
        line_ko: '다른 건 다 잘 찾으셨어요?',
        prompt: 'One thing on your list was missing: charcoal. Ask where it is.',
        prompt_ko: '목록에서 하나를 못 찾았습니다. 숯이요. 어디 있는지 물어보세요.',
        model: "Almost. I couldn't find the charcoal. Which aisle is it in?",
        model_ko: '거의요. 숯을 못 찾았어요. 몇 번 통로에 있어요?',
        distractors: [
          {
            text: 'Yep, found everything. Thanks for asking, Mike.',
            text_ko: '네, 다 찾았어요. 물어봐 줘서 고마워요, 마이크.',
            reaction: "Great! So you're all set for the grill?",
            reaction_ko: '좋아요! 그럼 그릴 준비는 다 된 거죠?'
          },
          {
            text: "Almost. I couldn't find the hot dog buns. Which aisle?",
            text_ko: '거의요. 핫도그 빵을 못 찾았어요. 몇 번 통로예요?',
            reaction: "Buns? You've got two packs right here.",
            reaction_ko: '빵이요? 여기 두 봉지 있잖아요.'
          },
          {
            text: "Not really. This store's a maze. Why do you keep moving things around?",
            text_ko: '아뇨. 이 가게는 미로 같아요. 왜 자꾸 위치를 바꿔요?',
            reaction: 'Sorry about that. Corporate likes to shuffle things.',
            reaction_ko: '죄송해요. 본사가 자꾸 위치를 바꾸네요.'
          }
        ],
        reply_speaker: 'mike',
        reply_line: "Sorry, we're out. The truck comes Monday. Try Fairview Hardware on Lake Avenue.",
        reply_ko: '죄송해요, 다 떨어졌어요. 월요일에 들어와요. 레이크 애비뉴의 페어뷰 철물점에 가 보세요.'
      },
      {
        speaker: 'mike',
        situation: 'Four full paper bags sit at the end of the belt.',
        situation_ko: '벨트 끝에 가득 찬 종이봉투 네 개가 놓여 있습니다.',
        line: "Your total's sixty-four twenty. Do you need a hand out to your car with all that?",
        line_ko: '총 64달러 20센트예요. 이거 다 차까지 들어다 드릴까요?',
        prompt: 'Turn down the help: you can carry it, and the car is close.',
        prompt_ko: '도움은 사양하세요. 혼자 들 수 있고, 차도 가까이 있습니다.',
        model: "No, thanks. I can manage. I'm parked right out front.",
        model_ko: '괜찮아요. 혼자 할 수 있어요. 바로 앞에 주차했어요.',
        distractors: [
          {
            text: "Yes, please. I'm parked way out at the back of the lot.",
            text_ko: '네, 부탁해요. 주차장 저 뒤쪽 끝에 세워 놨어요.',
            reaction: 'Sure, let me grab someone to help you.',
            reaction_ko: '그럼요, 도와줄 사람 부를게요.'
          },
          {
            text: "No, thanks. So that's forty-six twenty, right?",
            text_ko: '괜찮아요. 그럼 46달러 20센트 맞죠?',
            reaction: "Sixty-four twenty, Derek. Four bags aren't cheap.",
            reaction_ko: '64달러 20센트예요, 데릭. 네 봉지면 싸진 않죠.'
          },
          {
            text: "No. I'm not that old, Mike. I can carry bags.",
            text_ko: '아뇨. 저 그렇게 나이 안 들었어요, 마이크.',
            reaction: 'Whoa, no offense. I ask everybody.',
            reaction_ko: '워, 기분 나쁘라고 한 거 아니에요. 다들 물어봐요.'
          }
        ],
        reply_speaker: 'mike',
        reply_line: 'Alright. Enjoy the barbecue!',
        reply_ko: '알겠어요. 바비큐 맛있게 하세요!'
      }
    ],
    phrases: [
      {
        id: 'dk_w_market.be_right_back',
        text: "I'll be right back.",
        meaning_ko: '금방 올게요.',
        note: 'You are leaving for a very short time.',
        note_ko: '아주 잠깐 자리를 비울 때 씁니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_w_market.five_for_two',
        text: 'five for two dollars',
        meaning_ko: '다섯 개에 2달러',
        note: 'A common sale price. You often need to buy all five to get it.',
        note_ko: '흔한 할인 표시입니다. 다섯 개를 다 사야 적용되는 경우가 많습니다.',
        category: 'shopping'
      },
      {
        id: 'dk_w_market.good_catch',
        text: 'Good catch.',
        meaning_ko: '잘 봤어요.',
        note: 'Thanks someone for noticing a mistake or something you missed.',
        note_ko: '실수나 놓친 것을 알아봐 준 사람에게 하는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_w_market.having_a_party',
        text: 'Having a party?',
        meaning_ko: '파티 하세요?',
        note: 'Short for "Are you having a party?" Cashiers often chat about what you buy.',
        note_ko: '"Are you having a party?"를 줄인 말입니다. 계산원은 산 물건을 두고 말을 걸곤 합니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_w_market.heads_up',
        text: 'Heads-up: corn is on sale.',
        meaning_ko: '참고로, 옥수수가 할인 중이에요.',
        note: '"Heads-up" introduces a useful warning or tip.',
        note_ko: 'heads-up은 유용한 경고나 정보를 알릴 때 씁니다.',
        category: 'shopping'
      },
      {
        id: 'dk_w_market.need_a_hand',
        text: 'Do you need a hand out to your car?',
        meaning_ko: '차까지 들어 드릴까요?',
        note: '"A hand" = help. Answer "I can manage, thanks" if you do not need it.',
        note_ko: 'a hand는 도움을 뜻합니다. 필요 없으면 "I can manage, thanks."라고 답합니다.',
        category: 'shopping'
      },
      {
        id: 'dk_w_market.were_out',
        text: "Sorry, we're out.",
        meaning_ko: '죄송해요, 다 떨어졌어요.',
        note: "\"We're out (of it)\" = there is none left.",
        note_ko: "we're out (of it)은 남은 것이 없다는 뜻입니다.",
        category: 'shopping'
      },
      {
        id: 'dk_w_market.which_aisle',
        text: 'Which aisle is it in?',
        meaning_ko: '몇 번 통로에 있어요?',
        note: 'An aisle is a row between the shelves. The "s" is silent.',
        note_ko: 'aisle은 진열대 사이의 통로입니다. s는 발음하지 않습니다.',
        category: 'shopping'
      }
    ]
  },
  {
    id: 'dk_w_park',
    title: 'Carl and the lawn mower',
    title_ko: '칼과 잔디 깎는 기계',
    place: 'park_bench',
    npc: 'carl',
    day_from: 6,
    day_to: 7,
    time_from: '08:00',
    time_to: '18:00',
    summary: 'You run into Carl, the retired bus mechanic you know from the bus stop, in Seaside Park. Catch up, ask him for a favor, and invite him to the barbecue.',
    summary_ko: '시사이드 공원에서 버스 정류장에서 알고 지내는 은퇴한 버스 정비사 칼을 만납니다. 안부를 나누고, 부탁을 하나 하고, 바비큐에 초대하세요.',
    sort: 20,
    tags: 'small-talk,neighbor,weekend,homeowner',
    calendar: { day: 6, time: '11:30', title: 'Walk in Seaside Park', title_ko: '시사이드 공원 산책' },
    turns: [
      {
        speaker: 'carl',
        situation: 'A sunny morning in Seaside Park. Carl is on his usual bench with the newspaper.',
        situation_ko: '시사이드 공원의 화창한 아침입니다. 칼이 늘 앉는 벤치에서 신문을 보고 있습니다.',
        line: "Well, if it isn't Derek! Haven't seen you at the bus stop lately. What have you been up to?",
        line_ko: '아니, 데릭 아닌가! 요즘 버스 정류장에서 통 못 봤네. 어떻게 지냈나?',
        prompt: "Explain you've been swamped at the office, and this weekend you're finally tackling the garden chores.",
        prompt_ko: '회사 일로 정신이 없었다고 하고, 이번 주말엔 드디어 마당을 손볼 거라고 하세요.',
        model: "Hey, Carl! Work's been crazy. I'm finally catching up on yard work this weekend.",
        model_ko: '안녕하세요, 칼! 일이 정신없었어요. 이번 주말에야 밀린 마당 일을 하고 있어요.',
        distractors: [
          {
            text: "Hey, Carl! I've been on vacation in Mexico. Just got back last night.",
            text_ko: '안녕하세요, 칼! 멕시코로 휴가 갔다가 어젯밤에 막 돌아왔어요.',
            reaction: 'Mexico? Funny, I saw your car in the driveway all week.',
            reaction_ko: '멕시코? 이상하네, 일주일 내내 자네 차가 진입로에 있던데.'
          },
          {
            text: "Hey, Carl! Honestly, it's been awful. My manager says I can't delegate to save my life.",
            text_ko: '안녕하세요, 칼! 솔직히 최악이었어요. 매니저가 저보고 일을 맡길 줄을 전혀 모른대요.',
            reaction: "Whoa, that's a lot for a Saturday morning.",
            reaction_ko: '어이쿠, 주말 아침부터 무거운 얘기로구먼.'
          },
          {
            text: "Oh, hi, Carl. Not much. Listen, I'm kind of in a hurry right now.",
            text_ko: '아, 안녕하세요, 칼. 별일 없어요. 저기, 지금 좀 바빠서요.',
            reaction: "Oh. Well, don't let me keep you.",
            reaction_ko: '아. 그럼 붙잡지 않겠네.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: "Good man. A lawn won't mow itself.",
        reply_ko: '잘하고 있구먼. 잔디가 저절로 깎이진 않으니까.'
      },
      {
        speaker: 'carl',
        situation: 'Carl folds his newspaper.',
        situation_ko: '칼이 신문을 접습니다.',
        line: "Speaking of which, how's that old mower of yours? Still giving you trouble?",
        line_ko: '말 나온 김에, 그 낡은 잔디 깎는 기계는 어떤가? 아직도 말썽인가?',
        prompt: 'Describe the problem: the engine is dead, probably the spark plug. Ask for his help.',
        prompt_ko: '문제를 설명하세요. 엔진이 안 돌고, 아마 점화 플러그 문제 같습니다. 그에게 도움을 청하세요.',
        model: "It won't start. I think it's the spark plug. Would you mind taking a look sometime?",
        model_ko: '시동이 안 걸려요. 점화 플러그 같아요. 언제 한번 봐 주실 수 있어요?',
        distractors: [
          {
            text: "It won't stop leaking oil. I think it's the gas tank. Would you mind taking a look?",
            text_ko: '기름이 계속 새요. 연료 탱크 같아요. 언제 한번 봐 주실 수 있어요?',
            reaction: "Leaking oil? Last time you said it wouldn't even start.",
            reaction_ko: '기름이 샌다고? 지난번엔 시동도 안 걸린다더니.'
          },
          {
            text: "It won't start. You fixed buses, so you can come fix it today, right?",
            text_ko: '시동이 안 걸려요. 버스 고치셨으니까 오늘 와서 고쳐 주실 수 있죠?',
            reaction: 'Today? Pretty bossy for a fella asking a favor.',
            reaction_ko: '오늘? 부탁하는 사람치곤 꽤 당당하구먼.'
          },
          {
            text: "It's working great now, actually. I had it fixed at the hardware store.",
            text_ko: '사실 지금은 아주 잘 돌아가요. 지난주에 철물점에 맡겨서 고쳤거든요.',
            reaction: "Fixed? Then what's that sputtering I hear from your yard?",
            reaction_ko: '고쳤다고? 그럼 자네 마당에서 들리던 털털 소리는 뭔가?'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'For you? Sure. I fixed buses for thirty years. A mower is nothing.',
        reply_ko: '자네 부탁인데, 그럼. 버스를 30년 고쳤어. 잔디 깎는 기계쯤이야.'
      },
      {
        speaker: 'carl',
        situation: 'He takes a small notebook out of his shirt pocket.',
        situation_ko: '그가 셔츠 주머니에서 작은 수첩을 꺼냅니다.',
        line: "I'll come by this afternoon. River Road, right? The house with the blue door?",
        line_ko: '오늘 오후에 들르지. 리버 로드 맞지? 파란 문 있는 집?',
        prompt: "Confirm the address, and invite him to your cookout that afternoon. You'll start grilling at 4.",
        prompt_ko: '주소가 맞다고 하고, 그날 오후 바비큐에 초대하세요. 네 시에 굽기 시작합니다.',
        model: "That's the one. And stay for the barbecue! I'm firing up the grill around four.",
        model_ko: '거기 맞아요. 바비큐도 드시고 가세요! 네 시쯤 그릴에 불 붙일 거예요.',
        distractors: [
          {
            text: "That's the one. And stay for the barbecue! I'm firing up the grill around seven.",
            text_ko: '거기 맞아요. 바비큐도 드시고 가세요! 일곱 시쯤 그릴에 불 붙일 거예요.',
            reaction: "Seven? I'm usually in my pajamas by then.",
            reaction_ko: '일곱 시? 그 시간엔 난 보통 잠옷 차림이야.'
          },
          {
            text: "No, it's the one with the red door. And stay for the barbecue at four!",
            text_ko: '아뇨, 빨간 문 집이에요. 네 시에 바비큐도 드시고 가세요!',
            reaction: "Red? I could've sworn it was blue.",
            reaction_ko: '빨간 문? 분명 파란색이었던 것 같은데.'
          },
          {
            text: "That's the one. Come around four, fix the mower, and then you can head home.",
            text_ko: '거기 맞아요. 네 시쯤 오셔서 기계 고쳐 주시고, 그다음엔 가시면 돼요.',
            reaction: 'Well, all right. Like calling in a hired hand, huh?',
            reaction_ko: '흠, 알겠네. 일꾼 부르듯 하는구먼.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: "Burgers? You don't have to ask me twice.",
        reply_ko: '버거? 두 번 말할 필요 없지.'
      },
      {
        speaker: 'carl',
        situation: 'Carl writes "4 p.m." in his notebook.',
        situation_ko: '칼이 수첩에 "오후 4시"라고 적습니다.',
        line: 'What can I bring?',
        line_ko: '뭘 가져갈까?',
        prompt: "He doesn't need to bring anything. You have it all handled.",
        prompt_ko: '아무것도 안 가져와도 됩니다. 다 준비해 뒀거든요.',
        model: "Just bring yourself. I've got everything covered.",
        model_ko: '그냥 몸만 오세요. 제가 다 준비해 놨어요.',
        distractors: [
          {
            text: 'Bring a side dish and some drinks, if you can.',
            text_ko: '곁들일 음식이랑 음료 좀 가져와 주세요.',
            reaction: 'Drinks and a side? Sure, I can manage that.',
            reaction_ko: '음료랑 곁들일 거? 그래, 그쯤이야.'
          },
          {
            text: "Nothing. Honestly, your cooking isn't my thing.",
            text_ko: '됐어요. 솔직히 칼 요리는 입맛에 안 맞아서요.',
            reaction: "Well! Now I'm definitely bringing my potato salad.",
            reaction_ko: '허! 이제 내 감자 샐러드는 꼭 가져가야겠군.'
          },
          {
            text: "Just bring yourself. I'm grilling hot dogs, not burgers.",
            text_ko: '몸만 오세요. 버거 말고 핫도그 구워요.',
            reaction: 'Hot dogs? Mike says you bought every burger in the store.',
            reaction_ko: '핫도그? 마이크 말로는 가게 버거를 싹쓸이했다던데.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: "I'll bring my potato salad anyway. It's famous on three bus routes.",
        reply_ko: '그래도 내 감자 샐러드는 가져가지. 버스 노선 세 개에서 유명하거든.'
      },
      {
        speaker: 'carl',
        situation: 'Your phone buzzes in your pocket. It is only a message from a friend.',
        situation_ko: '주머니에서 전화기가 울립니다. 친구가 보낸 메시지일 뿐입니다.',
        line: "You young people work too hard. They don't call you on the weekend, do they?",
        line_ko: '젊은 사람들은 일을 너무 많이 해. 주말엔 연락 안 오지?',
        prompt: "Explain that you're the one who gets paged this week, though nothing has happened yet, and you hope it stays that way.",
        prompt_ko: '이번 주는 당신이 호출 담당이지만 아직 아무 일도 없었고, 계속 그러길 바란다고 하세요.',
        model: "I'm on call this week, but it's been quiet so far. Knock on wood.",
        model_ko: '이번 주는 온콜이라서요. 그래도 아직까지는 조용해요. 부정 타지 말아야죠.',
        distractors: [
          {
            text: "I'm on call this week, and it's been crazy. I got paged twice last night.",
            text_ko: '이번 주는 온콜인데 정신없어요. 어젯밤에만 두 번 호출받았어요.',
            reaction: "Twice last night? You don't look like you were up.",
            reaction_ko: '어젯밤에 두 번? 밤새운 얼굴은 아닌데.'
          },
          {
            text: "Never. My phone's off all weekend, every weekend.",
            text_ko: '절대요. 주말엔 매주 전화기를 아예 꺼 두거든요. 연락 올 일이 없어요.',
            reaction: "Then who's buzzing you right now?",
            reaction_ko: '그럼 지금 울리는 건 누군가?'
          },
          {
            text: "It's just a friend. Why are you looking at my phone?",
            text_ko: '그냥 친구 문자예요. 근데 왜 제 전화기를 들여다보세요?',
            reaction: 'Easy, son. Just making small talk.',
            reaction_ko: '진정하게. 그냥 해 본 소리야.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'Knock on wood is right. See you at four, Derek!',
        reply_ko: '그래, 부정 타면 안 되지. 네 시에 보세, 데릭!'
      }
    ],
    phrases: [
      {
        id: 'dk_w_park.been_up_to',
        text: 'What have you been up to?',
        meaning_ko: '그동안 어떻게 지냈어요?',
        note: 'Asks what someone has been doing lately.',
        note_ko: '요즘 무엇을 하며 지냈는지 묻는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_w_park.bring_yourself',
        text: 'Just bring yourself.',
        meaning_ko: '몸만 오세요.',
        note: "A host's answer to \"What can I bring?\" Guests often bring something anyway.",
        note_ko: '"What can I bring?"에 대한 주인의 대답입니다. 그래도 손님은 흔히 무언가를 가져옵니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_w_park.catching_up_on',
        text: "I'm catching up on yard work.",
        meaning_ko: '밀린 마당 일을 하고 있어요.',
        note: '"Catch up on" = do things you did not have time for earlier.',
        note_ko: 'catch up on은 전에 시간이 없어 못 한 일을 한다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_w_park.fire_up_the_grill',
        text: "I'm firing up the grill around four.",
        meaning_ko: '네 시쯤 그릴에 불을 붙일 거예요.',
        note: '"Fire up" = start (a grill, an engine, a laptop).',
        note_ko: 'fire up은 그릴이나 엔진, 노트북을 켠다는 뜻입니다.',
        category: 'food'
      },
      {
        id: 'dk_w_park.giving_trouble',
        text: 'Is it still giving you trouble?',
        meaning_ko: '아직도 말썽이에요?',
        note: 'Said about a machine that does not work well.',
        note_ko: '잘 작동하지 않는 기계에 대해 쓰는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_w_park.if_it_isnt',
        text: "Well, if it isn't Derek!",
        meaning_ko: '아니, 이게 누구야, 데릭 아닌가!',
        note: 'A happy, surprised greeting for someone you know.',
        note_ko: '아는 사람을 반갑고 놀랍게 맞이하는 인사입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_w_park.knock_on_wood',
        text: 'Knock on wood.',
        meaning_ko: '이대로만 가길. (부정 타지 않길.)',
        note: 'Said after mentioning good luck, so that it does not end.',
        note_ko: '좋은 일을 말한 뒤, 그 운이 끝나지 않길 바라며 하는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'dk_w_park.would_you_mind',
        text: 'Would you mind taking a look sometime?',
        meaning_ko: '언제 한번 봐 주실 수 있을까요?',
        note: '"Would you mind …ing?" is a very polite way to ask a favor.',
        note_ko: '"Would you mind …ing?"는 아주 정중하게 부탁하는 표현입니다.',
        category: 'small-talk'
      }
    ]
  }
];

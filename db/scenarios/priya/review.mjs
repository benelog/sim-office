// Priya Nair's review on Monday, January 4 (game day 92; tagged review, config review_*).

export const hero = 'priya';

export const episodes = [
  {
    id: 'rv_priya',
    title: 'Year-end review',
    title_ko: '연말 평가',
    place: 'office_manager',
    npc: 'maya',
    day_from: 92,
    day_to: 96,
    time_from: '15:15',
    time_to: '17:30',
    summary: "Your year-end review with Maya. Look back on the pilot year, take the engineers' feedback, set a goal for next year, and ask about the product's future. Then see your results.",
    summary_ko: '마야와 하는 연말 평가입니다. 시범 운영의 한 해를 돌아보고, 개발자들의 피드백을 받아들이고, 내년 목표를 정하고, 제품의 앞날을 물어보세요. 그다음 결과를 확인하세요.',
    sort: 3000,
    tags: 'meeting,manager,review',
    calendar: { day: 92, time: '15:30', title: 'Year-end review with Maya', title_ko: '마야와 연말 평가' },
    turns: [
      {
        situation: "Monday, January 4. Your year-end review with Maya. This year you launched the store dashboard with Summit Retail and ran the team's planning.",
        situation_ko: '1월 4일 월요일. 마야와 연말 평가를 합니다. 올해 서밋 리테일과 매장 대시보드를 출시했고, 팀의 계획 회의를 이끌었어요.',
        line: 'Happy New Year, Priya. How do you think the year went?',
        line_ko: '새해 복 많이 받아요, 프리야. 한 해가 어땠다고 생각해요?',
        prompt: 'Sum up the year honestly, with something you want to do better.',
        prompt_ko: '한 해를 솔직하게 정리하고, 더 잘하고 싶은 점도 말하세요.',
        model: 'Strong overall. The pilot launched on time and Greg is happy. I want to push back on scope creep earlier.',
        model_ko: '전체적으로 좋았어요. 시범 운영이 제때 시작됐고 그레그도 만족해요. 요구가 불어날 때 더 일찍 선을 긋고 싶어요.',
        distractors: [
          {
            text: 'Great, mostly because I kept pushing the engineers to hit every date we promised.',
            text_ko: '좋았어요. 대부분 제가 약속한 날짜를 다 맞추라고 개발자들을 밀어붙인 덕분이죠.',
            reaction: 'The engineers pushed too. It was a team result.',
            reaction_ko: '개발자들도 애썼어요. 팀이 함께 낸 결과예요.'
          },
          {
            text: 'Messy, honestly. Greg kept changing his mind, and we spent months chasing him.',
            text_ko: '솔직히 엉망이었어요. 그레그가 계속 말을 바꿔서 몇 달을 쫓아다녔어요.',
            reaction: 'He did, and you handled it. What would you do differently?',
            reaction_ko: '그랬죠. 그리고 프리야가 잘 대처했어요. 뭘 다르게 하고 싶어요?'
          },
          {
            text: "I'm honestly not sure how it went. I'd rather hear your view first, Maya.",
            text_ko: '어땠는지 솔직히 잘 모르겠어요. 마야 생각을 먼저 듣고 싶어요.',
            reaction: 'I want your view first.',
            reaction_ko: '먼저 프리야의 생각을 듣고 싶어요.'
          }
        ],
        reply_line: "That's what I saw too.",
        reply_ko: '나도 그렇게 봤어요.'
      },
      {
        line: 'From the engineers: they love your clear specs, but sometimes they hear about promises to the client late. Thoughts?',
        line_ko: '개발자들 얘기: 명세가 명확해서 좋은데, 고객에게 한 약속을 늦게 알게 될 때가 있대요. 어떻게 생각해요?',
        prompt: "Take the feedback and say what you'll change.",
        prompt_ko: '피드백을 받아들이고 무엇을 바꿀지 말하세요.',
        model: "Fair point. I'll bring the team in before I promise dates to Greg.",
        model_ko: '맞는 말이에요. 그레그에게 날짜를 약속하기 전에 팀과 먼저 얘기할게요.',
        distractors: [
          {
            text: 'The client pays us, so sometimes I have to promise before I can ask.',
            text_ko: '돈은 고객이 내니까, 가끔은 물어보기 전에 약속해야 해요.',
            reaction: "True, but a promise the team can't keep costs us more.",
            reaction_ko: '맞아요. 그런데 팀이 못 지키는 약속은 더 비싸게 먹혀요.'
          },
          {
            text: 'Engineers always say that about PMs. It comes with the job, I think.',
            text_ko: '개발자들은 PM한테 늘 그렇게 말해요. 이 일의 숙명 같아요.',
            reaction: "Maybe, but it's worth taking seriously.",
            reaction_ko: '그럴지도 모르지만, 진지하게 받아들일 만해요.'
          },
          {
            text: "Then I just won't talk to Greg at all unless an engineer is there.",
            text_ko: '그럼 개발자가 없으면 그레그랑은 아예 얘기 안 할게요.',
            reaction: 'That goes too far. Just loop them in.',
            reaction_ko: '그건 너무 나갔어요. 그냥 미리 알려 주면 돼요.'
          }
        ],
        reply_line: 'Exactly.',
        reply_ko: '바로 그거예요.'
      },
      {
        line: "What's your goal for next year?",
        line_ko: '내년 목표는 뭐예요?',
        prompt: 'Name a goal for the product that the team can share.',
        prompt_ko: '팀이 함께 가질 수 있는 제품 목표를 말하세요.',
        model: "Grow the pilot to all of Summit Retail's stores, with a rollout plan the team agrees on.",
        model_ko: '팀이 동의하는 확대 계획으로 시범 운영을 서밋 리테일 전 매장으로 넓히는 거예요.',
        distractors: [
          {
            text: "Bring in a second client, so we don't depend so much on Summit Retail.",
            text_ko: '두 번째 고객사를 데려와서 서밋 리테일 의존을 줄이는 거요.',
            reaction: 'Sales handles that. What about our product?',
            reaction_ko: '그건 영업팀 일이에요. 우리 제품은요?'
          },
          {
            text: 'Become a director of product, with a team of my own to manage.',
            text_ko: '제 팀을 둔 프로덕트 디렉터가 되는 거요.',
            reaction: "Let's talk about the steps toward that.",
            reaction_ko: '거기까지 가는 단계를 얘기해 봐요.'
          },
          {
            text: 'Honestly, spend less time on email and more time with the stores.',
            text_ko: '솔직히 이메일은 덜 쓰고 매장에서 시간을 더 보내는 거요.',
            reaction: 'Same! But a work goal?',
            reaction_ko: '나도요! 그래도 일 목표는요?'
          }
        ],
        reply_line: "Good. Let's make that the team's goal, too.",
        reply_ko: '좋아요. 그걸 팀 목표로도 삼아요.'
      },
      {
        line: 'Any questions for me?',
        line_ko: '나한테 물어볼 거 있어요?',
        prompt: 'Ask a question that helps you do the job better.',
        prompt_ko: '일을 더 잘하는 데 도움이 되는 질문을 하세요.',
        model: 'Yes. Where do you see the product in a year, and how can I help get it there?',
        model_ko: '네. 1년 뒤 제품이 어디쯤 있을 거라고 보세요? 거기까지 가는 데 제가 뭘 도우면 될까요?',
        distractors: [
          {
            text: 'Yes, how big is my raise this year, and when does it start?',
            text_ko: '네, 올해 연봉은 얼마나 오르고, 언제부터 적용돼요?',
            reaction: 'Coming up, I promise. Anything about the work?',
            reaction_ko: '곧 얘기할게요, 약속해요. 일에 관해서는요?'
          },
          {
            text: "Nope, I think we're all good. Thanks for making the time today.",
            text_ko: '아니요, 다 괜찮은 것 같아요. 오늘 시간 내 줘서 고마워요.',
            reaction: 'Nothing? This is your time.',
            reaction_ko: '없어요? 프리야의 시간인데요.'
          },
          {
            text: "Why didn't I get a promotion this year, after the pilot went so well?",
            text_ko: '시범 운영이 그렇게 잘됐는데 저는 왜 올해 승진을 못 했어요?',
            reaction: "Let's talk about what a promotion would take, not why it didn't happen.",
            reaction_ko: '왜 안 됐는지보다 승진하려면 뭐가 필요한지 얘기해요.'
          }
        ],
        reply_line: 'Great question. Now let me show you the numbers.',
        reply_ko: '좋은 질문이에요. 자, 이제 숫자를 보여 줄게요.'
      }
    ]
  }
];

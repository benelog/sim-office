// Derek Alvarez's review on Monday, January 4 (game day 92; tagged review, config review_*).

export const hero = 'derek';

export const episodes = [
  {
    id: 'rv_derek',
    title: 'Year-end review',
    title_ko: '연말 평가',
    place: 'office_manager',
    npc: 'maya',
    day_from: 92,
    day_to: 96,
    time_from: '15:15',
    time_to: '17:30',
    summary: "Your year-end review with Maya. Look back on the year, take the team's feedback, set a goal for next year, and ask about growing into a lead. Then see your results.",
    summary_ko: '마야와 하는 연말 평가입니다. 한 해를 돌아보고, 팀의 피드백을 받아들이고, 내년 목표를 정하고, 리드로 성장하는 길을 물어보세요. 그다음 결과를 확인하세요.',
    sort: 3000,
    tags: 'meeting,manager,review',
    calendar: { day: 92, time: '15:30', title: 'Year-end review with Maya', title_ko: '마야와 연말 평가' },
    turns: [
      {
        situation: "Monday, January 4. Your year-end review in Maya's office. Your fourth year at Seaside Labs, and the year you became Jun's onboarding buddy.",
        situation_ko: '1월 4일 월요일. 마야의 방에서 연말 평가를 합니다. 시사이드 랩스에서의 네 번째 해이고, 준의 온보딩 버디가 된 해예요.',
        line: 'Happy New Year, Derek. Big year for you. How do you see it?',
        line_ko: '새해 복 많이 받아요, 데릭. 큰 한 해였죠. 데릭은 어떻게 봐요?',
        prompt: 'Sum up the year honestly, with something you want to change.',
        prompt_ko: '한 해를 솔직하게 정리하고, 바꾸고 싶은 점도 말하세요.',
        model: "A good year. The dashboard launched and onboarding Jun went well. Next year I'd like to hand off more.",
        model_ko: '좋은 한 해였어요. 대시보드가 나왔고 준 온보딩도 잘됐고요. 내년에는 일을 더 넘겨 주고 싶어요.',
        distractors: [
          {
            text: 'Same as every year, really. I closed my tickets, fixed what broke, and kept things running.',
            text_ko: '매년 똑같았죠. 티켓 닫고, 고장 난 거 고치고, 시스템 돌아가게 했어요.',
            reaction: "You did more than tickets, and I'd like you to see that.",
            reaction_ko: '티켓보다 훨씬 많은 걸 했어요. 그걸 데릭도 알았으면 해요.'
          },
          {
            text: "Honestly, I carried the team this year. Without me the dashboard wouldn't have launched.",
            text_ko: '솔직히 올해는 제가 팀을 끌고 갔죠. 제가 없었으면 대시보드는 못 나왔어요.',
            reaction: 'You did a lot, but the launch was a team effort.',
            reaction_ko: '많이 한 건 맞지만, 출시는 팀이 함께 한 거예요.'
          },
          {
            text: 'Tiring, to be honest. Onboarding Jun took a lot of time I needed for my own work.',
            text_ko: '솔직히 피곤했어요. 준 온보딩에 제 일에 써야 할 시간을 많이 뺏겼어요.',
            reaction: 'I hear you. Was any of it worth it?',
            reaction_ko: '그랬겠네요. 그래도 보람은 있었어요?'
          }
        ],
        reply_line: 'Agreed on all of it.',
        reply_ko: '전부 동의해요.'
      },
      {
        line: "From the team: you're the go-to person, which is great, but sometimes you fix things yourself instead of teaching. Thoughts?",
        line_ko: '팀에서 나온 얘기: 다들 데릭을 찾는 건 좋은데, 가르치는 대신 직접 고쳐 버릴 때가 있대요. 어떻게 생각해요?',
        prompt: "Take the feedback and say what you'll do about it.",
        prompt_ko: '피드백을 받아들이고 어떻게 할지 말하세요.',
        model: "That's true. When Jun gets stuck, I'll pair with him instead of just pushing the fix.",
        model_ko: '맞아요. 준이 막히면 고친 걸 그냥 올리지 않고 같이 붙어서 볼게요.',
        distractors: [
          {
            text: "It's just faster if I do it myself. We have deadlines, and teaching takes time.",
            text_ko: '제가 하는 게 그냥 빨라요. 마감이 있고, 가르치는 건 시간이 들잖아요.',
            reaction: 'Faster this week, slower next year. Think about it.',
            reaction_ko: '이번 주엔 빠르지만 내년엔 느려져요. 생각해 봐요.'
          },
          {
            text: 'Who complained about that? Was it Jun? I thought we were getting along fine.',
            text_ko: '누가 그런 불평을 했어요? 준이에요? 사이좋게 지내는 줄 알았는데요.',
            reaction: "Nobody complained. It's a pattern I noticed.",
            reaction_ko: '아무도 불평 안 했어요. 내가 본 패턴이에요.'
          },
          {
            text: "Fine. If that's how it looks, I'll stop jumping in to help people, then.",
            text_ko: '알겠어요. 그렇게 보인다면, 이제 사람들 돕는 데 끼어들지 않을게요.',
            reaction: "That's not what I meant, Derek.",
            reaction_ko: '그런 뜻이 아니에요, 데릭.'
          }
        ],
        reply_line: "That's exactly it.",
        reply_ko: '바로 그거예요.'
      },
      {
        line: "What's your goal for next year?",
        line_ko: '내년 목표는 뭐예요?',
        prompt: "Name a goal that's specific and moves your career forward.",
        prompt_ko: '구체적이고 경력에 도움이 되는 목표를 말하세요.',
        model: "I'd like to lead the offline-mode project and grow toward a tech lead role.",
        model_ko: '오프라인 모드 프로젝트를 이끌면서 테크 리드 역할로 성장하고 싶어요.',
        distractors: [
          {
            text: "Honestly, keep doing what I'm doing. It's working, so why change it?",
            text_ko: '솔직히 지금 하는 걸 계속하는 거요. 잘되고 있으니 바꿀 이유가 있나요?',
            reaction: 'You could, but I think you want more than that.',
            reaction_ko: '그래도 되지만, 데릭은 그 이상을 원하는 것 같은데요.'
          },
          {
            text: "A promotion, plain and simple. That's my goal for next year.",
            text_ko: '승진이요, 간단해요. 그게 내년 목표예요.',
            reaction: "Let's talk about what would get you there.",
            reaction_ko: '거기까지 가려면 뭐가 필요한지 얘기해 봐요.'
          },
          {
            text: 'Fewer meetings, so I have more time to actually write code.',
            text_ko: '회의를 줄여서 실제로 코드 짤 시간을 늘리는 거요.',
            reaction: 'Ha, me too. But a real goal?',
            reaction_ko: '하하, 나도요. 그래도 진짜 목표는요?'
          }
        ],
        reply_line: "I'd love that. Let's make a plan.",
        reply_ko: '좋아요. 계획을 세워 봐요.'
      },
      {
        line: 'Any questions for me?',
        line_ko: '나한테 물어볼 거 있어요?',
        prompt: 'Ask about how to reach your goal.',
        prompt_ko: '목표에 다가가는 방법을 물어보세요.',
        model: "What would a tech lead role look like here, and how would we know I'm ready?",
        model_ko: '여기서 테크 리드는 어떤 역할이고, 제가 준비됐는지 어떻게 알 수 있을까요?',
        distractors: [
          {
            text: 'Yes, is there a bonus this year? And will it come with the next paycheck?',
            text_ko: '네, 올해 보너스 있어요? 다음 급여 때 같이 들어와요?',
            reaction: "We'll get to that in a second. Anything about the work?",
            reaction_ko: '그건 곧 얘기할게요. 일에 관해서는요?'
          },
          {
            text: 'No, not really. I think we covered it all. Thanks for your time, Maya.',
            text_ko: '아니요, 딱히요. 다 얘기한 것 같아요. 시간 내 줘서 고마워요, 마야.',
            reaction: 'Nothing at all? This is your time.',
            reaction_ko: '하나도 없어요? 데릭의 시간인데요.'
          },
          {
            text: 'Is something going on? Are you leaving the company? You can tell me.',
            text_ko: '무슨 일 있어요? 혹시 회사 그만두세요? 말해도 돼요.',
            reaction: 'No! Why would you think that?',
            reaction_ko: '아니요! 왜 그렇게 생각했어요?'
          }
        ],
        reply_line: "Let's write that down together at our next 1:1. Now, the numbers.",
        reply_ko: '다음 1:1에서 같이 정리해 봐요. 자, 이제 숫자를 볼게요.'
      }
    ]
  }
];

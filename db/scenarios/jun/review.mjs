// Jun Kim's review on Monday, January 4 (game day 92; tagged review, config review_*).

export const hero = 'jun';

export const episodes = [
  {
    id: 'rv_jun',
    title: '90-day review',
    title_ko: '90일 평가',
    place: 'office_manager',
    npc: 'maya',
    day_from: 92,
    day_to: 96,
    time_from: '15:15',
    time_to: '17:30',
    summary: 'Your 90-day review with Maya. Give a balanced view of your first three months, take feedback well, set a goal, and ask what comes next. Then see your results.',
    summary_ko: '마야와 하는 90일 평가입니다. 첫 석 달을 균형 있게 돌아보고, 피드백을 잘 받아들이고, 목표를 정하고, 다음 단계를 물어보세요. 그다음 결과를 확인하세요.',
    sort: 3000,
    tags: 'meeting,manager,review',
    calendar: { day: 92, time: '15:30', title: '90-day review with Maya', title_ko: '마야와 90일 평가' },
    turns: [
      {
        situation: "Monday, January 4. Your 90-day review in Maya's office. Linda from HR sent the form, and Maya has it open on her laptop.",
        situation_ko: '1월 4일 월요일. 마야의 방에서 90일 평가를 합니다. 인사팀 린다가 양식을 보냈고, 마야가 노트북에 띄워 두었습니다.',
        line: "Happy New Year, Jun! Three months already. Before I share my notes, how do you think it's gone?",
        line_ko: '새해 복 많이 받아요, 준! 벌써 석 달이네요. 내 메모를 보여 주기 전에, 준은 어땠다고 생각해요?',
        prompt: 'Give an honest, balanced view: something that went well and something you still want to improve.',
        prompt_ko: '잘된 점 하나와 아직 나아지고 싶은 점 하나로, 솔직하고 균형 있게 말하세요.',
        model: "I think it's gone well overall. I've shipped real work, but I'd like to get faster at code reviews.",
        model_ko: '전체적으로 잘 지낸 것 같아요. 실제로 쓰이는 걸 만들었고, 코드 리뷰는 더 빨라지고 싶어요.',
        distractors: [
          {
            text: "Honestly, it's been perfect. I've shipped everything on time and I can't think of anything I'd change.",
            text_ko: '솔직히 완벽했어요. 다 제때 냈고, 바꾸고 싶은 게 하나도 떠오르지 않아요.',
            reaction: "Nobody's perfect after three months, Jun. Let's find something to grow on.",
            reaction_ko: '석 달 만에 완벽한 사람은 없어요, 준. 성장할 점을 하나 찾아봐요.'
          },
          {
            text: "Not great, to be honest. I feel like I've been behind since day one and still haven't caught up.",
            text_ko: '솔직히 별로예요. 첫날부터 뒤처진 느낌이고 아직도 못 따라잡았어요.',
            reaction: "That's harsher than what I've seen. Let's look at the facts.",
            reaction_ko: '내가 본 것보다 훨씬 박하네요. 사실을 같이 봐요.'
          },
          {
            text: "It's been fine, I think. But I'd rather hear first what the team has been saying about me.",
            text_ko: '괜찮았던 것 같아요. 그런데 팀에서 저에 대해 뭐라고 하는지 먼저 듣고 싶어요.',
            reaction: "We'll get there. First I want to hear your view.",
            reaction_ko: '그건 곧 얘기할게요. 먼저 준의 생각을 듣고 싶어요.'
          }
        ],
        reply_line: "That matches a lot of what I wrote. Let's go through it.",
        reply_ko: '내가 적은 것과 많이 같네요. 하나씩 봐요.'
      },
      {
        line: 'One thing from the team: your pull requests are solid, but people sometimes hear about problems late. What could help?',
        line_ko: '팀에서 나온 얘기 하나: 풀 리퀘스트는 탄탄한데, 문제를 늦게 알게 될 때가 있대요. 뭐가 도움이 될까요?',
        prompt: 'Take the feedback without getting defensive, and suggest something concrete.',
        prompt_ko: '방어하지 말고 피드백을 받아들인 뒤, 구체적인 방법을 제안하세요.',
        model: "That's fair. I'll bring up blockers at standup the same day instead of waiting until I've tried everything.",
        model_ko: '맞는 말이에요. 다 해 볼 때까지 기다리지 않고, 막히면 그날 스탠드업에서 바로 말할게요.',
        distractors: [
          {
            text: "Who said that, exactly? I'd like to know so I can go and talk to them about it myself.",
            text_ko: '정확히 누가 그랬어요? 제가 직접 가서 얘기해 보게 알고 싶어요.',
            reaction: "It came from the team, not one person. Let's focus on what you can change.",
            reaction_ko: '한 사람이 아니라 팀에서 나온 얘기예요. 바꿀 수 있는 것에 집중해요.'
          },
          {
            text: "I only wait because I don't want to bother anyone with half-finished problems. That's being polite.",
            text_ko: '반쯤 풀린 문제로 누굴 귀찮게 하기 싫어서 기다리는 거예요. 그게 예의잖아요.',
            reaction: "I get that, but here it's more polite to speak up early.",
            reaction_ko: '이해해요. 그런데 여기서는 일찍 말하는 게 더 예의예요.'
          },
          {
            text: "Okay, that's fair. I'll just try to do better at everything from now on and see how it goes.",
            text_ko: '네, 맞는 말이에요. 앞으로 모든 걸 더 잘해 보고 어떻게 되는지 볼게요.',
            reaction: "That's a bit general. What would you actually do differently?",
            reaction_ko: '좀 막연하네요. 실제로 뭘 다르게 할 거예요?'
          }
        ],
        reply_line: 'Perfect. Small and specific is how it sticks.',
        reply_ko: '좋아요. 작고 구체적이어야 몸에 붙어요.'
      },
      {
        line: "Let's set a goal for the next quarter. What would you like to own?",
        line_ko: '다음 분기 목표를 정해 봐요. 뭘 맡아 보고 싶어요?',
        prompt: "Name one goal that's specific and stretches you a little.",
        prompt_ko: '구체적이고 조금 버거운 목표 하나를 말하세요.',
        model: "I'd like to own the store alerts feature from design to launch, with Derek reviewing.",
        model_ko: '매장 알림 기능을 설계부터 출시까지 맡고 싶어요. 리뷰는 데릭이 봐 주고요.',
        distractors: [
          {
            text: "I'd like to be promoted to senior engineer by the summer, if that's possible here.",
            text_ko: '가능하다면 여름까지 시니어 개발자로 승진하고 싶어요.',
            reaction: "Ambitious! Let's pick something you can finish this quarter first.",
            reaction_ko: '야심 차네요! 먼저 이번 분기 안에 끝낼 수 있는 걸 골라요.'
          },
          {
            text: "Honestly, whatever you think is best for the team. I'm happy to work on anything.",
            text_ko: '솔직히 팀에 제일 좋은 거면 뭐든요. 어떤 일이든 좋아요.',
            reaction: "I want to hear what you want, though. That's the point of a goal.",
            reaction_ko: '그래도 준이 원하는 걸 듣고 싶어요. 목표는 그러라고 있는 거예요.'
          },
          {
            text: 'Maybe learn more about the codebase in general and read more of the docs.',
            text_ko: '전반적으로 코드베이스를 더 익히고 문서를 더 읽어 볼까 해요.',
            reaction: 'Can we make it more concrete? What would you build?',
            reaction_ko: '좀 더 구체적으로 해 볼까요? 뭘 만들 거예요?'
          }
        ],
        reply_line: "Great. I'll write that down, and we'll check in on it in our 1:1s.",
        reply_ko: '좋아요. 적어 두고 1:1 때마다 점검해요.'
      },
      {
        line: 'Before we wrap up, any questions for me?',
        line_ko: '마무리하기 전에, 나한테 물어볼 거 있어요?',
        prompt: 'Ask a useful question about what comes next, not only about money.',
        prompt_ko: '돈 얘기만 말고, 앞으로에 대해 쓸모 있는 질문을 하세요.',
        model: 'Yes. What would you need to see from me to take on bigger projects next year?',
        model_ko: '네. 내년에 더 큰 프로젝트를 맡으려면 제가 뭘 보여 드려야 할까요?',
        distractors: [
          {
            text: 'Yes. How much is my raise going to be, and when does it show up in my paycheck?',
            text_ko: '네. 연봉은 얼마나 오르고, 급여에는 언제부터 반영돼요?',
            reaction: "We'll get to pay in a second, I promise. Anything else on your mind?",
            reaction_ko: '급여 얘기는 곧 할게요, 약속해요. 다른 궁금한 건요?'
          },
          {
            text: "No, I think I'm good. You've covered everything, so can I head back to my desk?",
            text_ko: '아니요, 괜찮아요. 다 말씀해 주셨으니 자리로 돌아가도 될까요?',
            reaction: 'Sure, but this is your time too. Nothing at all?',
            reaction_ko: '그래도 되지만, 이건 준의 시간이기도 해요. 정말 없어요?'
          },
          {
            text: 'Is it true that people sometimes get let go right after their 90-day review?',
            text_ko: '90일 평가 직후에 잘리는 사람도 가끔 있다는 게 사실이에요?',
            reaction: "Only in rare cases, and that's not what this is. Anything else?",
            reaction_ko: '아주 드문 경우고, 지금이 그런 자리는 아니에요. 다른 건요?'
          }
        ],
        reply_line: "Good question. Keep doing what you're doing, and say yes to the alerts project. Now, let me show you the numbers.",
        reply_ko: '좋은 질문이에요. 지금처럼 하면서 알림 프로젝트를 맡아 봐요. 자, 이제 숫자를 보여 줄게요.'
      }
    ]
  }
];

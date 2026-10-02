// Jun Kim's second week and the Monday after (game days 8-15): the missions.

export const hero = 'jun';

export const episodes = [
  {
    id: 'd8_standup',
    title: 'Flagging a blocker at standup',
    title_ko: '스탠드업에서 블로커 알리기',
    place: 'office_desk_team',
    npc: 'derek',
    day_from: 8,
    day_to: 8,
    time_from: '09:00',
    time_to: '10:30',
    summary: 'At the Monday standup, share what you finished, what you are doing today, and what is blocking you.',
    summary_ko: '월요일 스탠드업에서 끝낸 일, 오늘 할 일, 막혀 있는 일을 공유합니다.',
    sort: 810,
    tags: 'meeting,standup,week2',
    calendar: { day: 8, time: '09:30', title: 'Daily standup', title_ko: '데일리 스탠드업' },
    turns: [
      {
        speaker: 'derek',
        situation: "The team gathers by Derek's desk for the Monday standup. It is your turn.",
        situation_ko: '팀이 월요일 스탠드업을 하러 데릭 자리 옆에 모였습니다. 당신 차례입니다.',
        line: "Alright, you're up. What did you get done last week, and what's on your plate today?",
        line_ko: '자, 당신 차례예요. 지난주에 뭘 끝냈고, 오늘은 뭘 할 거예요?',
        prompt: 'Give your update: the login page is done, and the inventory API is next, starting today.',
        prompt_ko: '업데이트를 하세요. 로그인 페이지는 끝났고, 오늘부터 재고 API를 시작합니다.',
        model: "Last week I finished the login page. Today I'm starting on the inventory API.",
        model_ko: '지난주에 로그인 페이지를 끝냈어요. 오늘은 재고 API를 시작해요.',
        distractors: [
          {
            text: "Last week I started the login page. Today I'm finishing the inventory API.",
            text_ko: '지난주에 로그인 페이지를 시작했어요. 오늘은 재고 API를 마무리해요.',
            reaction: "Finishing it? I thought you hadn't touched the API yet.",
            reaction_ko: '마무리요? API는 아직 손도 안 댄 줄 알았는데요.'
          },
          {
            text: "Honestly, it was a tough week. I'm still figuring out how everything works.",
            text_ko: '솔직히 힘든 한 주였어요. 아직 다 어떻게 돌아가는지 파악 중이에요.',
            reaction: 'Totally normal. But for standup, just the quick version: done and doing.',
            reaction_ko: '당연해요. 그래도 스탠드업에선 짧게요. 한 일, 할 일.'
          },
          {
            text: "I'm not sure what to pick up next. What do you think I should work on?",
            text_ko: '다음에 뭘 맡아야 할지 모르겠어요. 뭘 하면 좋을까요?',
            reaction: "Didn't you already have a ticket assigned? Check the board.",
            reaction_ko: '이미 배정된 티켓 있지 않았어요? 보드 확인해 봐요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Nice. The inventory API is a big one.',
        reply_ko: '좋아요. 재고 API는 큰 작업이죠.'
      },
      {
        speaker: 'derek',
        situation: "You can't test the API because you still don't have access to the staging database.",
        situation_ko: '스테이징 데이터베이스 접근 권한이 아직 없어서 API를 테스트할 수 없습니다.',
        line: 'Any blockers?',
        line_ko: '막히는 거 있어요?',
        prompt: 'Something is keeping you from testing the API. Bring it up.',
        prompt_ko: 'API를 테스트하지 못하게 막는 문제가 있습니다. 그걸 말하세요.',
        model: "Yeah, I'm blocked on one thing. I still don't have access to the staging database.",
        model_ko: '네, 하나 막힌 게 있어요. 아직 스테이징 데이터베이스 접근 권한이 없어요.',
        distractors: [
          {
            text: "Nope, no blockers. I'll sort out the database access on my own later.",
            text_ko: '아뇨, 없어요. 데이터베이스 권한은 나중에 제가 알아서 할게요.',
            reaction: "You sure? Access stuff usually needs IT. Don't sit on it.",
            reaction_ko: '정말요? 권한 문제는 보통 IT가 해야 해요. 붙잡고 있지 마요.'
          },
          {
            text: "Yeah. IT still hasn't given me staging database access, which is getting pretty frustrating.",
            text_ko: '네. IT가 아직도 스테이징 데이터베이스 권한을 안 줘서 점점 답답해요.',
            reaction: "Okay, easy. That one's actually on me, not on Sam.",
            reaction_ko: '자, 진정해요. 그건 사실 샘이 아니라 제 잘못이에요.'
          },
          {
            text: "Yeah, one thing. I still don't have access to the production database.",
            text_ko: '네, 하나요. 아직 운영 데이터베이스 접근 권한이 없어요.',
            reaction: "Production? You won't get prod for a while. Which one do you need?",
            reaction_ko: '운영요? 운영은 한동안 못 받아요. 어느 걸 말하는 거예요?'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Ugh, that's on me. I'll ping Sam in IT right after this.",
        reply_ko: '아, 그건 제 잘못이에요. 끝나자마자 IT의 샘에게 연락할게요.'
      },
      {
        speaker: 'derek',
        situation: 'Before the standup ends, you remember the client call later this morning.',
        situation_ko: '스탠드업이 끝나기 전, 오늘 오전의 고객 통화가 떠오릅니다.',
        line: 'Anything else before we wrap up?',
        line_ko: '마무리하기 전에 더 할 말 있어요?',
        prompt: "There's a client call later this morning. Remind the team: it's Summit Retail, at 11.",
        prompt_ko: '오늘 오전 고객 통화를 팀에 상기시키세요. 서밋 리테일, 11시입니다.',
        model: 'Just a reminder that we have the kickoff call with Summit Retail at eleven.',
        model_ko: '다들 잊지 마세요. 11시에 서밋 리테일과 킥오프 콜이 있어요.',
        distractors: [
          {
            text: 'Just a reminder that we have the kickoff call with Summit Retail at one.',
            text_ko: '다들 잊지 마세요. 1시에 서밋 리테일과 킥오프 콜이 있어요.',
            reaction: "One? I've got eleven on my calendar. Double-check that.",
            reaction_ko: '1시요? 제 캘린더엔 11시로 돼 있는데요. 다시 확인해 봐요.'
          },
          {
            text: "Can someone else take the Summit Retail call at eleven? I don't think I'm ready.",
            text_ko: '11시 서밋 리테일 통화는 다른 분이 맡아 주실래요? 전 아직 준비가 안 된 것 같아요.',
            reaction: "You'll be fine. You just listen and ask good questions.",
            reaction_ko: '괜찮을 거예요. 잘 듣고 좋은 질문만 하면 돼요.'
          },
          {
            text: 'Quick question: is the Summit Retail call today or tomorrow?',
            text_ko: '잠깐 질문요. 서밋 리테일 통화가 오늘이에요, 내일이에요?',
            reaction: "Today, isn't it? Check your calendar, it's your project.",
            reaction_ko: '오늘 아니에요? 캘린더 확인해 봐요, 당신 프로젝트잖아요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Good call. Priya's running it, so bring your questions. Okay, that's a wrap, everyone.",
        reply_ko: '좋아요. 프리야가 진행하니까 질문 준비해 와요. 자, 오늘은 여기까지!'
      }
    ],
    phrases: [
      {
        id: 'd8_standup.blocked_on',
        text: "I'm blocked on one thing.",
        meaning_ko: '한 가지 때문에 막혀 있어요.',
        note: 'A blocker is anything that stops your progress. Standups always ask about them.',
        note_ko: 'blocker는 진행을 막는 것입니다. 스탠드업에서 늘 묻습니다.',
        category: 'meeting'
      },
      {
        id: 'd8_standup.on_my_plate',
        text: "What's on your plate today?",
        meaning_ko: '오늘 할 일이 뭐예요?',
        note: 'On your plate means the work you have to do.',
        note_ko: 'on your plate는 해야 할 일을 뜻합니다.',
        category: 'meeting'
      },
      {
        id: 'd8_standup.ping',
        text: "I'll ping Sam right after this.",
        meaning_ko: '끝나자마자 샘에게 연락할게요.',
        note: 'Ping = send someone a quick message.',
        note_ko: 'ping은 짧은 메시지를 보낸다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'd8_standup.thats_a_wrap',
        text: "That's a wrap.",
        meaning_ko: '이걸로 마칠게요.',
        note: 'Said to end a meeting or a job. It comes from film sets.',
        note_ko: '회의나 일을 끝낼 때 씁니다. 영화 촬영장에서 온 말입니다.',
        category: 'meeting'
      },
      {
        id: 'd8_standup.thats_on_me',
        text: "That's on me.",
        meaning_ko: '그건 제 잘못(책임)이에요.',
        note: 'A casual way to take responsibility.',
        note_ko: '책임을 인정하는 가벼운 표현입니다.',
        category: 'office'
      },
      {
        id: 'd8_standup.wrapped_up',
        text: 'I wrapped up the login page.',
        meaning_ko: '로그인 페이지를 마무리했어요.',
        note: 'Wrap up = finish.',
        note_ko: 'wrap up은 끝내다라는 뜻입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'd8_kickoff',
    title: 'Kickoff call with Summit Retail',
    title_ko: '서밋 리테일 킥오프 콜',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 8,
    day_to: 8,
    time_from: '10:30',
    time_to: '12:30',
    summary: 'Priya puts Greg Whitfield from Summit Retail on the big screen. Confirm his requirements and ask the right questions.',
    summary_ko: '프리야가 서밋 리테일의 그렉 휫필드를 큰 화면에 띄웁니다. 요구사항을 확인하고 필요한 질문을 하세요.',
    sort: 820,
    tags: 'client,meeting,requirements,video-call,week2',
    calendar: { day: 8, time: '11:00', title: 'Kickoff call: Summit Retail', title_ko: '킥오프 콜: 서밋 리테일' },
    turns: [
      {
        speaker: 'priya',
        situation: 'You join Priya in the meeting room. Greg from Summit Retail is on the video call.',
        situation_ko: '회의실에서 프리야와 함께합니다. 서밋 리테일의 그렉이 화상 통화에 들어와 있습니다.',
        line: "Greg, this is our new developer. They'll be building most of the dashboard. Want to say hi?",
        line_ko: '그렉, 이쪽은 우리 새 개발자예요. 대시보드 대부분을 만들 거예요. 인사할래요?',
        prompt: 'Introduce yourself to the client and start off on the right foot.',
        prompt_ko: '고객에게 인사하고 좋은 첫인상을 남기세요.',
        model: "Hi Greg, nice to meet you. I'm looking forward to working with you.",
        model_ko: '안녕하세요, 그렉. 반갑습니다. 함께 일하게 되어 기대돼요.',
        distractors: [
          {
            text: "Hey Greg! What's up, man? So you're the client, huh?",
            text_ko: '어, 그렉! 잘 지내요? 그쪽이 고객이구나?',
            reaction: "Ha… yes, that's me. Nice to meet you too.",
            reaction_ko: '하… 네, 접니다. 저도 반가워요.'
          },
          {
            text: "Hi Greg, nice to meet you. I'll be helping out with the mobile app.",
            text_ko: '안녕하세요, 그렉. 반갑습니다. 저는 모바일 앱 쪽을 도울 거예요.',
            reaction: "Oh, I thought Priya said you'd be on the dashboard?",
            reaction_ko: '어, 프리야가 대시보드를 맡는다고 하지 않았어요?'
          },
          {
            text: "Hi Greg. Don't worry, I'll have your dashboard done in no time.",
            text_ko: '안녕하세요, 그렉. 걱정 마세요, 대시보드는 금방 만들어 드릴게요.',
            reaction: "Ha, I like the confidence. Let's see what we're dealing with first.",
            reaction_ko: '하, 자신감 좋네요. 일단 뭘 다뤄야 하는지부터 보죠.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "Likewise! We've got a lot riding on this project, so I'm glad you're on board.",
        reply_ko: '저도요! 이 프로젝트에 걸린 게 많아서, 함께하게 되어 기뻐요.'
      },
      {
        speaker: 'greg',
        situation: "Greg explains that his store managers can't see stock levels in one place.",
        situation_ko: '그렉은 매장 관리자들이 재고를 한곳에서 볼 수 없다고 설명합니다.',
        line: 'Basically, our store managers are flying blind. We want one dashboard with live inventory for all forty stores.',
        line_ko: '한마디로 우리 매장 관리자들은 깜깜이로 일하고 있어요. 매장 40곳 전부의 실시간 재고가 나오는 대시보드 하나를 원해요.',
        prompt: "Before going any further, check that you've understood his request correctly.",
        prompt_ko: '더 나가기 전에, 그의 요청을 제대로 이해했는지 확인하세요.',
        model: 'Just to make sure I understand, you want one dashboard that shows live inventory for all forty stores?',
        model_ko: '제가 제대로 이해했는지 확인하고 싶은데요, 매장 40곳 전부의 실시간 재고를 보여 주는 대시보드 하나를 원하시는 거죠?',
        distractors: [
          {
            text: "So if I've got this right, you want a dashboard with live inventory for your fourteen stores?",
            text_ko: '그러니까 제가 맞게 이해했다면, 매장 14곳의 실시간 재고가 나오는 대시보드를 원하시는 거죠?',
            reaction: "Forty, actually. Four-zero. It's a lot of stores.",
            reaction_ko: '40곳이에요. 사십. 매장이 많아요.'
          },
          {
            text: 'That sounds simple enough. We can have live inventory for all forty stores up in a couple of weeks.',
            text_ko: '그 정도면 간단하네요. 매장 40곳 전부 실시간 재고를 2주면 띄울 수 있어요.',
            reaction: "A couple of weeks? Wow. Let's hear the details first.",
            reaction_ko: '2주요? 와. 일단 자세한 얘기부터 듣죠.'
          },
          {
            text: 'Got it. So should each store manager get their own separate dashboard for their store?',
            text_ko: '알겠어요. 그럼 매장 관리자마다 자기 매장만 보는 대시보드를 따로 드리면 될까요?',
            reaction: "No, that's the whole problem. We want it all in one place.",
            reaction_ko: '아뇨, 그게 바로 문제예요. 전부 한곳에서 보고 싶어요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Exactly. And live means it updates within a few minutes, not overnight.',
        reply_ko: '바로 그거예요. 그리고 실시간이란 밤사이가 아니라 몇 분 안에 갱신된다는 뜻이에요.'
      },
      {
        speaker: 'greg',
        situation: "You don't know how their stores record sales today.",
        situation_ko: '그들의 매장이 지금 판매 데이터를 어떻게 기록하는지 모릅니다.',
        line: 'Our point-of-sale system is kind of old, though. Is that going to be a problem?',
        line_ko: '그런데 우리 POS 시스템이 좀 오래됐어요. 그게 문제가 될까요?',
        prompt: "You can't answer yet. Find out how their stores get sales data out of the system now.",
        prompt_ko: '아직 답할 수 없습니다. 지금 매장 시스템에서 판매 데이터가 어떻게 나오는지 알아보세요.',
        model: 'It depends. Could you walk me through how your point-of-sale system sends data today?',
        model_ko: '상황에 따라 달라요. 지금 POS 시스템이 데이터를 어떻게 보내는지 차근차근 설명해 주실 수 있을까요?',
        distractors: [
          {
            text: "Not at all. We work with old systems like that all the time, so it won't be a problem.",
            text_ko: '전혀 문제없어요. 저희는 오래된 시스템도 늘 다뤄 봤으니까 걱정 마세요.',
            reaction: "Great, that's a relief. Wait, you haven't even seen it yet.",
            reaction_ko: '좋네요, 다행이에요. 잠깐, 아직 보지도 않았잖아요.'
          },
          {
            text: 'Probably. Honestly, you should replace that system before we start anything.',
            text_ko: '아마도요. 솔직히 저희가 시작하기 전에 그 시스템부터 바꾸셔야 해요.',
            reaction: "Replace it? That's a huge project. Not happening this year.",
            reaction_ko: '바꾸라고요? 그건 엄청난 프로젝트예요. 올해는 안 돼요.'
          },
          {
            text: 'It depends. Could you send us a list of all your store locations?',
            text_ko: '상황에 따라 달라요. 매장 위치 목록 전체를 보내 주실 수 있을까요?',
            reaction: 'Sure, but how does that help with the old system?',
            reaction_ko: '그럼요, 근데 그게 오래된 시스템이랑 무슨 상관이죠?'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Sure. Right now each store exports a file every night at midnight, and someone uploads it by hand.',
        reply_ko: '그럼요. 지금은 매장마다 매일 밤 자정에 파일을 내보내고, 누군가 그걸 손으로 올려요.'
      },
      {
        speaker: 'priya',
        situation: "A nightly file can't give Greg live data. Priya looks at you to raise it.",
        situation_ko: '하루 한 번 올리는 파일로는 실시간 데이터가 나올 수 없습니다. 프리야가 말해 보라는 눈짓을 합니다.',
        line: 'Hmm. That could affect the timeline. Want to flag that for Greg?',
        line_ko: '음. 일정에 영향이 있을 수도 있겠네요. 그렉에게 짚어 줄래요?',
        prompt: "Raise it with Greg: explain why the nightly file is a problem, and what you'll need instead (API access).",
        prompt_ko: '그렉에게 말하세요. 매일 밤 파일이 왜 문제인지, 대신 무엇이 필요한지(API 접근) 설명하세요.',
        model: "Nightly files won't be enough for live data, so we'll need API access to your point-of-sale system.",
        model_ko: '매일 밤 파일로는 실시간 데이터가 안 돼서, POS 시스템에 대한 API 접근 권한이 필요해요.',
        distractors: [
          {
            text: 'Nightly files should work fine for now, and we can add live updates later on.',
            text_ko: '당분간은 매일 밤 파일로 충분하고, 실시간 갱신은 나중에 넣으면 돼요.',
            reaction: 'Later? But live data is the whole point for us.',
            reaction_ko: '나중에요? 우리한텐 실시간 데이터가 핵심인데요.'
          },
          {
            text: "Honestly, a nightly file is pretty outdated. Your IT team should've fixed this years ago.",
            text_ko: '솔직히 매일 밤 파일은 꽤 구식이에요. IT 팀이 몇 년 전에 고쳤어야죠.',
            reaction: "Well… I'll pass that along, I guess.",
            reaction_ko: '음… 전해는 드릴게요.'
          },
          {
            text: "Nightly files won't be enough for live data, so we'll need someone to upload them every hour instead.",
            text_ko: '매일 밤 파일로는 실시간 데이터가 부족하니까, 대신 누가 매시간 파일을 올려 주셔야 해요.',
            reaction: "Every hour? By hand? We don't have the staff for that.",
            reaction_ko: '매시간요? 손으로요? 그럴 인력이 없어요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "Got it. I'll loop in our IT folks and get you what you need by Wednesday.",
        reply_ko: '알겠어요. 우리 IT 팀을 참여시켜서 수요일까지 필요한 걸 드릴게요.'
      },
      {
        speaker: 'priya',
        situation: 'The call is almost over.',
        situation_ko: '통화가 거의 끝나 갑니다.',
        line: 'Great. Anything else before we let Greg go?',
        line_ko: '좋아요. 그렉 보내 드리기 전에 더 할 말 있어요?',
        prompt: 'Offer to follow up in writing today so everyone knows what happens next.',
        prompt_ko: '다음에 할 일을 모두가 알 수 있게 오늘 중으로 글로 정리해 보내겠다고 하세요.',
        model: "I'll send a recap email with the next steps later today.",
        model_ko: '오늘 중으로 다음 단계를 정리한 요약 메일을 보내 드릴게요.',
        distractors: [
          {
            text: "I'll send a recap email with the next steps sometime next week.",
            text_ko: '다음 주 중에 다음 단계를 정리한 요약 메일을 보내 드릴게요.',
            reaction: "Next week? Today would be better, while it's fresh.",
            reaction_ko: '다음 주요? 기억 생생할 때 오늘 주시면 좋겠는데요.'
          },
          {
            text: "I'll send over the finished dashboard design by tomorrow morning.",
            text_ko: '내일 아침까지 완성된 대시보드 디자인을 보내 드릴게요.',
            reaction: "Tomorrow? Wow, that's fast. Are you sure about that?",
            reaction_ko: '내일요? 와, 빠르네요. 정말 괜찮겠어요?'
          },
          {
            text: 'Could you send us a summary of everything we talked about today?',
            text_ko: '오늘 얘기한 내용 전부 정리해서 저희한테 보내 주실 수 있을까요?',
            reaction: 'Uh, I was kind of hoping your side would do that.',
            reaction_ko: '어, 그건 그쪽에서 해 주실 줄 알았는데요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Perfect. Talk soon, everyone.',
        reply_ko: '좋아요. 다들 또 얘기해요.'
      }
    ],
    phrases: [
      {
        id: 'd8_kickoff.a_lot_riding',
        text: "We've got a lot riding on this.",
        meaning_ko: '여기에 걸린 게 많아요.',
        note: 'Something important depends on the result.',
        note_ko: '결과에 중요한 것이 달려 있다는 뜻입니다.',
        category: 'client'
      },
      {
        id: 'd8_kickoff.flag',
        text: 'I want to flag something.',
        meaning_ko: '짚고 넘어갈 게 있어요.',
        note: 'Flag = point out a possible problem early.',
        note_ko: 'flag는 문제가 될 만한 것을 미리 알린다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'd8_kickoff.flying_blind',
        text: "We're flying blind.",
        meaning_ko: '정보 없이 감으로 하고 있어요.',
        note: 'Working without the information you need.',
        note_ko: '필요한 정보 없이 일한다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'd8_kickoff.loop_in',
        text: "I'll loop in our IT folks.",
        meaning_ko: '우리 IT 담당자들을 참여시킬게요.',
        note: 'Loop someone in = add them to the conversation or email thread.',
        note_ko: 'loop someone in은 대화나 메일에 누군가를 포함시킨다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'd8_kickoff.make_sure',
        text: 'Just to make sure I understand, …',
        meaning_ko: '제가 제대로 이해했는지 확인하자면…',
        note: 'Restate the request in your own words. Clients love it because it prevents mistakes.',
        note_ko: '요청을 자기 말로 다시 말하는 것입니다. 오해를 막아 줘서 고객들이 좋아합니다.',
        category: 'meeting'
      },
      {
        id: 'd8_kickoff.recap_email',
        text: "I'll send a recap email.",
        meaning_ko: '요약 메일을 보낼게요.',
        note: 'A short email after a meeting listing decisions and next steps.',
        note_ko: '회의 후 결정 사항과 다음 단계를 정리한 짧은 메일입니다.',
        category: 'meeting'
      },
      {
        id: 'd8_kickoff.walk_me_through',
        text: 'Could you walk me through how it works?',
        meaning_ko: '어떻게 돌아가는지 차근차근 설명해 주시겠어요?',
        note: 'Walk someone through = explain step by step.',
        note_ko: 'walk someone through는 단계별로 설명한다는 뜻입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'd8_trip_approval',
    title: 'Asking to visit the client',
    title_ko: '고객사 출장 승인 받기',
    place: 'office_manager',
    npc: 'maya',
    day_from: 8,
    day_to: 8,
    time_from: '13:00',
    time_to: '17:30',
    requires: 'd8_kickoff',
    summary: 'Greg wants to review the contract in person on Thursday and Friday. Ask Maya for approval and learn the travel policy.',
    summary_ko: '그렉이 목요일과 금요일에 직접 만나 계약을 검토하자고 합니다. 마야에게 승인을 받고 출장 규정을 알아보세요.',
    sort: 830,
    tags: 'travel,hr,request,week2',
    calendar: { day: 8, time: '14:00', title: 'Ask Maya about the Ridgeport trip', title_ko: '마야에게 리지포트 출장 요청' },
    turns: [
      {
        speaker: 'maya',
        situation: "After the call, Greg invited you to Ridgeport to go over the contract in person. You stop by Maya's office.",
        situation_ko: '통화 후 그렉이 리지포트에서 직접 계약을 검토하자고 초대했습니다. 마야의 사무실에 들릅니다.',
        line: "Hey, come on in. What's up?",
        line_ko: '어, 들어와요. 무슨 일이에요?',
        prompt: 'Greg wants you in Ridgeport on Thursday and Friday. Ask Maya for the green light.',
        prompt_ko: '그렉이 목요일과 금요일에 리지포트로 와 달라고 했습니다. 마야에게 허락을 구하세요.',
        model: 'Would it be okay if I went to Ridgeport on Thursday and Friday to meet the client?',
        model_ko: '목요일하고 금요일에 고객 만나러 리지포트에 다녀와도 괜찮을까요?',
        distractors: [
          {
            text: 'Would it be okay if I went to Ridgeport next Monday and Tuesday to meet the client?',
            text_ko: '다음 주 월요일하고 화요일에 고객 만나러 리지포트에 다녀와도 괜찮을까요?',
            reaction: 'Next week? I thought Greg wanted you there this week.',
            reaction_ko: '다음 주요? 그렉은 이번 주에 와 달라고 한 줄 알았는데요.'
          },
          {
            text: "Just a heads-up, I'm flying to Ridgeport on Thursday and Friday to meet the client.",
            text_ko: '미리 말씀드려요, 목요일하고 금요일에 고객 만나러 리지포트에 가요.',
            reaction: "Oh. Well, it would've been nice to be asked first.",
            reaction_ko: '아. 음, 먼저 물어봐 줬으면 좋았을 텐데요.'
          },
          {
            text: 'Greg wants someone in Ridgeport on Thursday. Could you go, or maybe Derek?',
            text_ko: '그렉이 목요일에 리지포트에 누가 와 주길 원해요. 직접 가시거나 데릭이 가면 어때요?',
            reaction: "Me? He asked for you, didn't he? Why not go yourself?",
            reaction_ko: '저요? 그렉이 당신을 부른 거 아니에요? 직접 가요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Oh nice, Greg asked for you? Sure. It's a good chance to meet them face to face.",
        reply_ko: '오, 그렉이 당신을 불렀어요? 좋아요. 직접 만날 좋은 기회예요.'
      },
      {
        speaker: 'maya',
        situation: 'Maya pulls up the travel policy on her screen.',
        situation_ko: '마야가 화면에 출장 규정을 띄웁니다.',
        line: 'Just stick to the travel policy. Economy flights, and hotels under two hundred a night.',
        line_ko: '출장 규정만 지켜요. 비행기는 이코노미, 호텔은 1박 200달러 미만.',
        prompt: 'Find out how much you can spend on food each day.',
        prompt_ko: '하루에 식비를 얼마까지 쓸 수 있는지 물어보세요.',
        model: "Got it. What's the per diem for meals?",
        model_ko: '알겠어요. 식비 일일 한도는 얼마예요?',
        distractors: [
          {
            text: 'Got it. Can I book a business-class seat?',
            text_ko: '알겠어요. 비즈니스석으로 예약해도 돼요?',
            reaction: "Economy, remember? It's in the policy.",
            reaction_ko: '이코노미라고 했잖아요. 규정에 있어요.'
          },
          {
            text: 'Okay. Can I stay somewhere nicer, though?',
            text_ko: '네. 그래도 좀 더 좋은 데서 묵으면 안 돼요?',
            reaction: 'Not on our budget. Under two hundred, please.',
            reaction_ko: '우리 예산으론 안 돼요. 200달러 미만으로요.'
          },
          {
            text: 'Got it. Is there a limit on hotel costs?',
            text_ko: '알겠어요. 호텔비에 한도가 있어요?',
            reaction: 'I just said: under two hundred a night.',
            reaction_ko: '방금 말했잖아요. 1박 200달러 미만이요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Sixty-five dollars a day. Keep your receipts, and client dinners go on the company card.',
        reply_ko: '하루 65달러예요. 영수증은 챙기고, 고객과의 저녁은 법인 카드로 해요.'
      },
      {
        speaker: 'maya',
        situation: 'You have never booked a business trip here before.',
        situation_ko: '이 회사에서 출장을 예약해 본 적이 없습니다.',
        line: 'Anything else you need from me?',
        line_ko: '그 밖에 나한테 필요한 거 있어요?',
        prompt: 'Ask whether you book the trip yourself or have Tom, the office manager, do it.',
        prompt_ko: '출장 예약을 직접 하는지, 사무실 관리자인 톰에게 맡기는지 물어보세요.',
        model: 'Should I book everything myself, or go through Tom?',
        model_ko: '예약은 제가 다 직접 해요, 아니면 톰을 통해서 해요?',
        distractors: [
          {
            text: 'Should I just put everything on my own credit card?',
            text_ko: '그냥 전부 제 개인 신용카드로 결제하면 돼요?',
            reaction: "Please don't. We don't want you fronting the money.",
            reaction_ko: '그러지 마요. 당신 돈으로 먼저 내게 하고 싶지 않아요.'
          },
          {
            text: 'Could you book the flight and hotel for me?',
            text_ko: '비행기랑 호텔 좀 대신 예약해 주실래요?',
            reaction: "Ha, I'm not your travel agent. There's a process.",
            reaction_ko: '하, 내가 여행사 직원은 아니잖아요. 절차가 있어요.'
          },
          {
            text: 'Should I book everything myself, or go through Derek?',
            text_ko: '예약은 제가 다 직접 해요, 아니면 데릭을 통해서 해요?',
            reaction: "Derek? He doesn't handle travel. Think front desk.",
            reaction_ko: '데릭요? 데릭은 출장 담당이 아니에요. 프런트 쪽이요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Go through Tom. He has the company card and knows the policy inside out. I'll approve the trip in the system now.",
        reply_ko: '톰을 통해요. 법인 카드도 있고 규정을 훤히 알아요. 지금 시스템에서 출장을 승인할게요.'
      }
    ],
    phrases: [
      {
        id: 'd8_trip_approval.face_to_face',
        text: "It's a good chance to meet face to face.",
        meaning_ko: '직접 만날 좋은 기회예요.',
        note: 'Face to face = in person, not on a call.',
        note_ko: 'face to face는 통화가 아니라 직접 만난다는 뜻입니다.',
        category: 'travel'
      },
      {
        id: 'd8_trip_approval.go_through',
        text: 'Go through Tom.',
        meaning_ko: '톰을 통해서 처리하세요.',
        note: 'Go through someone = use them as the official route.',
        note_ko: 'go through someone은 그 사람을 공식 창구로 삼는다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'd8_trip_approval.inside_out',
        text: 'He knows the policy inside out.',
        meaning_ko: '그는 규정을 훤히 알아요.',
        note: 'Know something inside out = know it completely.',
        note_ko: 'know something inside out은 완전히 안다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'd8_trip_approval.per_diem',
        text: "What's the per diem for meals?",
        meaning_ko: '식비 일일 한도가 얼마예요?',
        note: 'Per diem (Latin: per day) = a daily allowance for meals on a trip.',
        note_ko: 'per diem(라틴어로 하루당)은 출장 중 하루 식비 한도입니다.',
        category: 'travel'
      },
      {
        id: 'd8_trip_approval.stick_to_policy',
        text: 'Just stick to the travel policy.',
        meaning_ko: '출장 규정만 지켜요.',
        note: 'Stick to = follow and not go beyond.',
        note_ko: 'stick to는 벗어나지 않고 따른다는 뜻입니다.',
        category: 'travel'
      },
      {
        id: 'd8_trip_approval.would_it_be_okay',
        text: 'Would it be okay if I went to Ridgeport?',
        meaning_ko: '리지포트에 가도 괜찮을까요?',
        note: 'A polite request. The past tense (went) makes it softer.',
        note_ko: '정중한 부탁입니다. 과거형(went)을 쓰면 더 부드럽습니다.',
        category: 'request'
      }
    ]
  },
  {
    id: 'd9_scope',
    title: 'Negotiating scope and timeline',
    title_ko: '범위·일정 협상',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 9,
    day_to: 9,
    time_from: '10:00',
    time_to: '12:30',
    requires: 'd8_kickoff',
    summary: 'Greg wants the dashboard and the mobile app by November 1. Push back politely and offer a phased plan.',
    summary_ko: '그렉은 대시보드와 모바일 앱을 11월 1일까지 원합니다. 정중히 반대하고 단계별 계획을 제안하세요.',
    sort: 910,
    tags: 'client,negotiation,video-call,week2',
    calendar: { day: 9, time: '10:30', title: 'Summit Retail: scope and timeline', title_ko: '서밋 리테일: 범위와 일정' },
    turns: [
      {
        speaker: 'greg',
        situation: 'Greg is back on the video call with Priya and you. He sounds rushed.',
        situation_ko: '그렉이 다시 화상 통화에 들어왔습니다. 급해 보입니다.',
        line: 'So, our board wants the dashboard and the mobile checkout app live by November first. Can you make that happen?',
        line_ko: '그래서, 이사회가 대시보드랑 모바일 결제 앱을 11월 1일까지 오픈하길 원해요. 가능하겠어요?',
        prompt: "Both by November first isn't realistic. Tell him so, tactfully.",
        prompt_ko: '11월 1일까지 둘 다는 현실적으로 불가능합니다. 요령 있게 그렇게 말하세요.',
        model: "I understand the pressure, but we can't commit to that date for both projects.",
        model_ko: '압박이 크신 건 이해하지만, 두 프로젝트 모두 그 날짜까지는 약속드릴 수 없어요.',
        distractors: [
          {
            text: "I understand the pressure. We'll make it work and get both done by November first.",
            text_ko: '압박이 크신 건 이해해요. 어떻게든 11월 1일까지 둘 다 끝낼게요.',
            reaction: "Really? Both? That's great. Priya, you're okay with that?",
            reaction_ko: '정말요? 둘 다요? 좋네요. 프리야, 괜찮은 거죠?'
          },
          {
            text: "That's not realistic at all. Your board needs to be a little more reasonable.",
            text_ko: '그건 전혀 현실적이지 않아요. 이사회가 좀 더 합리적이어야죠.',
            reaction: "Well, I'll be sure to tell them you said that.",
            reaction_ko: '그럼, 그렇게 말씀하셨다고 꼭 전하죠.'
          },
          {
            text: 'I understand. Could your board move the date up to mid-October instead?',
            text_ko: '이해해요. 이사회에서 날짜를 10월 중순으로 당겨 줄 수 있을까요?',
            reaction: "October? That's even sooner. Did you mean later?",
            reaction_ko: '10월요? 그건 더 빠르잖아요. 늦추자는 말 아니었어요?'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "Hmm. I was afraid you'd say that. So what can you do?",
        reply_ko: '음. 그렇게 말할까 봐 걱정했어요. 그럼 뭘 할 수 있죠?'
      },
      {
        speaker: 'greg',
        situation: 'The dashboard alone will take about eight weeks. The mobile app needs another eight.',
        situation_ko: '대시보드만 약 8주, 모바일 앱은 8주가 더 걸립니다.',
        line: 'What can you realistically deliver by November first?',
        line_ko: '11월 1일까지 현실적으로 뭘 해 줄 수 있어요?',
        prompt: 'Propose doing them one after the other: the dashboard by the deadline, the app in January.',
        prompt_ko: '하나씩 순서대로 하자고 제안하세요. 대시보드는 마감일까지, 앱은 1월에.',
        model: 'What if we phased it? We deliver the dashboard by November first and the mobile app in January.',
        model_ko: '단계를 나누면 어떨까요? 11월 1일까지 대시보드를, 1월에 모바일 앱을 드리는 거죠.',
        distractors: [
          {
            text: 'What if we phased it? We deliver the mobile app by November first and the dashboard in January.',
            text_ko: '단계를 나누면 어떨까요? 11월 1일까지 모바일 앱을, 1월에 대시보드를 드리는 거죠.',
            reaction: 'The app first? But the dashboard is what my managers need most.',
            reaction_ko: '앱 먼저요? 우리 관리자들한테 제일 급한 건 대시보드인데요.'
          },
          {
            text: 'We could deliver both by November first if your team tests everything every day.',
            text_ko: '그쪽 팀이 매일 전부 테스트해 주시면 11월 1일까지 둘 다 드릴 수 있어요.',
            reaction: "Wait, you just said you couldn't do both. Which is it?",
            reaction_ko: '잠깐, 방금 둘 다는 안 된다고 했잖아요. 뭐가 맞아요?'
          },
          {
            text: 'Realistically? Probably not much. It depends on how fast your team gets back to us.',
            text_ko: '현실적으로요? 별로 없을 거예요. 그쪽 팀이 얼마나 빨리 답을 주느냐에 달렸죠.',
            reaction: "That's not really an answer. Give me something I can take to the board.",
            reaction_ko: '그건 답이 아니죠. 이사회에 가져갈 만한 걸 주세요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Phased… okay, I could sell that to the board. But what if we paid more?',
        reply_ko: '단계별이라… 좋아요, 그거면 이사회를 설득할 수 있겠어요. 그런데 돈을 더 내면요?'
      },
      {
        speaker: 'greg',
        situation: 'Priya shakes her head slightly. Adding people late would not speed things up.',
        situation_ko: '프리야가 살짝 고개를 젓습니다. 늦게 사람을 더 넣는다고 빨라지지 않습니다.',
        line: 'Could you add more people and still do it all by November?',
        line_ko: '사람을 더 넣어서 11월까지 전부 할 수는 없을까요?',
        prompt: "Priya doesn't think more people would help. Explain to Greg why.",
        prompt_ko: '프리야는 사람을 늘려도 소용없다고 봅니다. 그 이유를 그렉에게 설명하세요.',
        model: "Honestly, adding people this late won't make it much faster, and quality would suffer. That's the trade-off.",
        model_ko: '솔직히 이렇게 늦게 사람을 넣어도 크게 빨라지지 않고, 품질이 떨어질 거예요. 그게 득실이에요.',
        distractors: [
          {
            text: 'Sure. If you cover the extra cost, we can bring in five more developers and hit November.',
            text_ko: '그럼요. 추가 비용을 내 주시면 개발자 다섯 명을 더 넣어서 11월에 맞출 수 있어요.',
            reaction: "Great, let's do it. Priya, why are you shaking your head?",
            reaction_ko: '좋아요, 그렇게 하죠. 프리야, 왜 고개를 저어요?'
          },
          {
            text: "Honestly, more people won't help much. The real problem is that your team keeps changing the requirements.",
            text_ko: '솔직히 사람을 늘려도 별 도움이 안 돼요. 진짜 문제는 그쪽 팀이 요구 사항을 자꾸 바꾸는 거예요.',
            reaction: "We've had exactly one call. I'm not sure that's fair.",
            reaction_ko: '통화 딱 한 번 했는데요. 그건 좀 억울하네요.'
          },
          {
            text: "Honestly, we'd need at least twenty more people to do both, and we just don't have them.",
            text_ko: '솔직히 둘 다 하려면 최소 스무 명은 더 필요한데, 저희한테 그만한 인력이 없어요.',
            reaction: "So it's just headcount? Then I'll find you contractors.",
            reaction_ko: '그럼 인원 문제일 뿐이네요? 계약직을 구해 드리죠.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "Fair enough. I'd rather have it done right. Let's go with the phased plan.",
        reply_ko: '그럴 만하네요. 제대로 하는 게 낫죠. 단계별 계획으로 갑시다.'
      },
      {
        speaker: 'priya',
        situation: 'Priya is taking notes.',
        situation_ko: '프리야가 메모하고 있습니다.',
        line: "Great. I'll update the timeline. Can you confirm the plan with Greg before we hang up?",
        line_ko: '좋아요. 제가 일정 업데이트할게요. 끊기 전에 그렉과 계획을 확인해 줄래요?',
        prompt: 'Recap what you agreed on, and promise the revised schedule by tomorrow.',
        prompt_ko: '합의한 내용을 다시 정리하고, 수정된 일정을 내일까지 보내겠다고 하세요.',
        model: "So to confirm, phase one is the dashboard on November first, and we'll send an updated timeline tomorrow.",
        model_ko: '확인차 말씀드리면, 1단계는 11월 1일 대시보드이고, 내일 수정된 일정을 보내 드릴게요.',
        distractors: [
          {
            text: "So to confirm, phase one is the mobile app on November first, and we'll send a timeline tomorrow.",
            text_ko: '확인차 말씀드리면, 1단계는 11월 1일 모바일 앱이고, 내일 일정을 보내 드릴게요.',
            reaction: "Wait, the dashboard comes first, right? That's what we agreed.",
            reaction_ko: '잠깐, 대시보드가 먼저죠? 그렇게 합의했잖아요.'
          },
          {
            text: "So to confirm, phase one is the dashboard on December first, and we'll send an updated timeline tomorrow.",
            text_ko: '확인차 말씀드리면, 1단계는 12월 1일 대시보드이고, 내일 수정된 일정을 보내 드릴게요.',
            reaction: "December? We said November first. Let's not slip already.",
            reaction_ko: '12월요? 11월 1일이라고 했잖아요. 벌써 밀리면 안 되죠.'
          },
          {
            text: "So could you send us an updated timeline from your side by tomorrow, and we'll go from there?",
            text_ko: '그럼 그쪽에서 내일까지 수정된 일정을 보내 주시면, 거기서부터 진행할까요?',
            reaction: 'From my side? I thought Priya was updating it.',
            reaction_ko: '우리 쪽에서요? 프리야가 업데이트하는 줄 알았는데요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Sounds like a plan. Thanks for being straight with me.',
        reply_ko: '좋은 계획이네요. 솔직하게 말해 줘서 고마워요.'
      }
    ],
    phrases: [
      {
        id: 'd9_scope.cant_commit',
        text: "We can't commit to that date.",
        meaning_ko: '그 날짜는 약속드릴 수 없어요.',
        note: 'Firm but polite. Better than saying yes and missing the deadline.',
        note_ko: '단호하지만 정중합니다. 약속하고 못 지키는 것보다 낫습니다.',
        category: 'negotiation'
      },
      {
        id: 'd9_scope.phased_it',
        text: 'What if we phased it?',
        meaning_ko: '단계별로 나누면 어떨까요?',
        note: 'What if we…? (past tense) is a soft way to propose an idea.',
        note_ko: 'What if we…?(과거형)는 아이디어를 부드럽게 제안하는 방법입니다.',
        category: 'negotiation'
      },
      {
        id: 'd9_scope.realistically',
        text: 'What can you realistically deliver?',
        meaning_ko: '현실적으로 무엇을 납품할 수 있나요?',
        note: 'Deliver = finish and hand over work.',
        note_ko: 'deliver는 일을 끝내 넘겨준다는 뜻입니다.',
        category: 'negotiation'
      },
      {
        id: 'd9_scope.sell_to_board',
        text: 'I could sell that to the board.',
        meaning_ko: '그거면 이사회를 설득할 수 있겠어요.',
        note: 'Sell an idea to someone = convince them.',
        note_ko: 'sell an idea to someone은 설득한다는 뜻입니다.',
        category: 'negotiation'
      },
      {
        id: 'd9_scope.straight_with_me',
        text: 'Thanks for being straight with me.',
        meaning_ko: '솔직하게 말해 줘서 고마워요.',
        note: 'Be straight with someone = be honest.',
        note_ko: 'be straight with someone은 솔직하다는 뜻입니다.',
        category: 'negotiation'
      },
      {
        id: 'd9_scope.to_confirm',
        text: 'So to confirm, …',
        meaning_ko: '확인하자면…',
        note: 'Use it to close a discussion and make the agreement clear.',
        note_ko: '논의를 마무리하며 합의를 분명히 할 때 씁니다.',
        category: 'meeting'
      },
      {
        id: 'd9_scope.trade_off',
        text: "That's the trade-off.",
        meaning_ko: '그게 대가(득실)예요.',
        note: 'A trade-off: you get one thing by giving up another.',
        note_ko: 'trade-off는 하나를 얻으려고 다른 것을 포기하는 것입니다.',
        category: 'negotiation'
      }
    ]
  },
  {
    id: 'd9_travel_booking',
    title: 'Booking the trip with Tom',
    title_ko: '톰과 출장 예약하기',
    place: 'office_lobby',
    npc: 'tom',
    day_from: 9,
    day_to: 10,
    time_from: '09:00',
    time_to: '17:30',
    requires: 'd8_trip_approval',
    summary: 'Maya approved your trip. Tom books your flight and hotel on the company card. Tell him what you need.',
    summary_ko: '마야가 출장을 승인했습니다. 톰이 법인 카드로 항공편과 호텔을 예약합니다. 필요한 것을 말하세요.',
    sort: 920,
    tags: 'travel,booking,week2',
    calendar: { day: 9, time: '13:30', title: 'Book travel with Tom', title_ko: '톰과 출장 예약' },
    turns: [
      {
        speaker: 'tom',
        situation: 'You go to the front desk to book your trip with Tom.',
        situation_ko: '출장 예약을 하러 프런트의 톰에게 갑니다.',
        line: "Maya told me you're heading to Ridgeport. What dates are we looking at?",
        line_ko: '마야가 리지포트 간다고 하던데요. 날짜가 어떻게 돼요?',
        prompt: 'Give Tom your dates: out early on Thursday, home later on Friday.',
        prompt_ko: '톰에게 날짜를 말하세요. 목요일 일찍 떠나서 금요일 늦게 돌아옵니다.',
        model: 'I need to fly out Thursday morning and come back Friday afternoon.',
        model_ko: '목요일 아침에 출발해서 금요일 오후에 돌아와야 해요.',
        distractors: [
          {
            text: 'I need to fly out Wednesday morning and come back Friday afternoon.',
            text_ko: '수요일 아침에 출발해서 금요일 오후에 돌아와야 해요.',
            reaction: "Wednesday? Maya's approval says Thursday and Friday.",
            reaction_ko: '수요일요? 마야 승인엔 목요일, 금요일로 돼 있는데요.'
          },
          {
            text: "Thursday morning, and can we make it first class? It's a long day.",
            text_ko: '목요일 아침이요. 그리고 일등석으로 해 주실래요? 긴 하루라서요.',
            reaction: 'Sorry, economy only. Maya would have my head.',
            reaction_ko: '미안해요, 이코노미만 돼요. 마야한테 혼나요.'
          },
          {
            text: "I'm not sure yet. Could you check with Greg what works for him?",
            text_ko: '아직 모르겠어요. 그렉한테 언제가 좋은지 물어봐 주실래요?',
            reaction: "Me? It's your trip. Didn't you two already set the dates?",
            reaction_ko: '제가요? 당신 출장이잖아요. 둘이 날짜 정한 거 아니었어요?'
          }
        ],
        reply_speaker: 'tom',
        reply_line: "Okay, there's a nine-thirty on Thursday with Crestline Air. It's a nonstop, about two hours.",
        reply_ko: '좋아요, 목요일 9시 30분 크레스트라인 항공편이 있어요. 직항이고 약 두 시간이에요.'
      },
      {
        speaker: 'tom',
        situation: 'Tom is filling out the booking form.',
        situation_ko: '톰이 예약 양식을 채우고 있습니다.',
        line: 'Aisle or window? And do you have a frequent flyer number?',
        line_ko: '통로석, 창가석? 그리고 마일리지 회원 번호 있어요?',
        prompt: "Tell him you prefer the aisle, and that you haven't joined their miles program.",
        prompt_ko: '통로석을 원한다고 하고, 그 항공사 마일리지 프로그램에 가입하지 않았다고 하세요.',
        model: "Aisle, please. And I don't have a frequent flyer number yet.",
        model_ko: '통로석으로 부탁해요. 그리고 마일리지 회원 번호는 아직 없어요.',
        distractors: [
          {
            text: "Window, please. And I don't have a frequent flyer number yet.",
            text_ko: '창가석으로 부탁해요. 그리고 마일리지 회원 번호는 아직 없어요.',
            reaction: 'Window? I had you down as an aisle person. Okay, window.',
            reaction_ko: '창가요? 통로 좋아하는 줄 알았는데. 알겠어요, 창가로.'
          },
          {
            text: "Aisle. And can you get me extra legroom? I'm kind of tall.",
            text_ko: '통로석요. 그리고 다리 공간 넓은 자리로 해 주실래요? 제가 키가 좀 커서요.',
            reaction: "That costs extra. Policy's plain economy, sorry.",
            reaction_ko: '그건 추가 요금이에요. 규정상 일반 이코노미예요, 미안해요.'
          },
          {
            text: 'Aisle, please. My frequent flyer number should be in my file.',
            text_ko: '통로석으로 부탁해요. 마일리지 번호는 제 기록에 있을 거예요.',
            reaction: "Hmm, I don't see one here. Are you sure you have one?",
            reaction_ko: '음, 여기엔 없는데요. 번호 있는 거 확실해요?'
          }
        ],
        reply_speaker: 'tom',
        reply_line: "Aisle it is. I'll sign you up for their program so you get the miles.",
        reply_ko: '통로석으로 할게요. 마일리지 받게 회원 가입도 해 둘게요.'
      },
      {
        speaker: 'tom',
        situation: 'Now the hotel. The policy cap is two hundred dollars a night.',
        situation_ko: '이제 호텔입니다. 규정상 한도는 1박 200달러입니다.',
        line: "There's the Pinecrest Hotel near Summit's office, one eighty-nine a night. That's under the cap.",
        line_ko: '서밋 사무실 근처에 파인크레스트 호텔이 있어요. 1박 189달러. 한도 안이에요.',
        prompt: "Before he books it, find out how far it is from Summit's office and whether you get a morning meal.",
        prompt_ko: '예약하기 전에 서밋 사무실에서 얼마나 먼지, 아침이 나오는지 물어보세요.',
        model: 'Is it within walking distance of their office? And is breakfast included?',
        model_ko: '고객사 사무실까지 걸어갈 수 있는 거리예요? 그리고 아침 식사 포함이에요?',
        distractors: [
          {
            text: "One eighty-nine? Isn't that over the two hundred cap, though?",
            text_ko: '189달러요? 그거 200달러 한도 넘지 않아요?',
            reaction: "No, it's under. One eighty-nine is less than two hundred.",
            reaction_ko: '아뇨, 안 넘어요. 189는 200보다 적잖아요.'
          },
          {
            text: "Can we find something nicer? I'd like a place with a pool.",
            text_ko: '좀 더 좋은 데 없을까요? 수영장 있는 데면 좋겠어요.',
            reaction: 'On a two-hundred cap? This is about as nice as it gets.',
            reaction_ko: '200달러 한도로요? 이 정도면 제일 좋은 편이에요.'
          },
          {
            text: 'Is it close to the airport? And does it have free parking for guests?',
            text_ko: '공항에서 가까운 편이에요? 그리고 투숙객 무료 주차도 되나요?',
            reaction: "Airport's twenty minutes. But you won't have a car, right?",
            reaction_ko: '공항은 20분이요. 근데 차 없잖아요?'
          }
        ],
        reply_speaker: 'tom',
        reply_line: "Five-minute walk, and yes, breakfast is included. I'll put it all on the company card.",
        reply_ko: '걸어서 5분이고, 네, 조식 포함이에요. 전부 법인 카드로 할게요.'
      },
      {
        speaker: 'tom',
        situation: 'You will also need to get from the Ridgeport airport to the hotel.',
        situation_ko: '리지포트 공항에서 호텔까지도 가야 합니다.',
        line: "Ground transportation is on you, but it's reimbursable. Just keep the receipts.",
        line_ko: '현지 교통비는 본인이 내는데, 환급돼요. 영수증만 챙겨요.',
        prompt: 'Ask whether you can use a ride-hailing app from the airport or should stick to the shuttle.',
        prompt_ko: '공항에서 차량 호출 앱을 써도 되는지, 셔틀을 타야 하는지 물어보세요.',
        model: 'Is it okay to take a rideshare from the airport, or should I take the shuttle?',
        model_ko: '공항에서 차량 호출 서비스를 타도 괜찮아요, 아니면 셔틀을 타야 해요?',
        distractors: [
          {
            text: 'Can I just rent a car at the airport and keep it for the whole trip instead?',
            text_ko: '그냥 공항에서 차를 빌려서 출장 내내 써도 돼요?',
            reaction: "You could, but the hotel's a five-minute walk from Summit.",
            reaction_ko: '그래도 되지만, 호텔에서 서밋까지 걸어서 5분이에요.'
          },
          {
            text: "So I have to pay for the ride myself? That doesn't seem fair.",
            text_ko: '그럼 차비를 제가 내야 해요? 그건 좀 불공평한데요.',
            reaction: 'You get it back. Just keep the receipts, like I said.',
            reaction_ko: '돌려받아요. 말했듯이 영수증만 챙기면 돼요.'
          },
          {
            text: 'Could you put the airport ride on the company card for me now?',
            text_ko: '공항 가는 차비도 지금 법인 카드로 결제해 주실래요?',
            reaction: "I can't. Ground transportation's on you, then you expense it.",
            reaction_ko: '그건 안 돼요. 현지 교통비는 직접 내고 경비 청구해요.'
          }
        ],
        reply_speaker: 'tom',
        reply_line: "A rideshare is fine, up to fifty bucks each way. Here's your itinerary. Have a good trip!",
        reply_ko: '차량 호출 괜찮아요, 편도 50달러까지요. 여기 여행 일정표예요. 잘 다녀와요!'
      }
    ],
    phrases: [
      {
        id: 'd9_travel_booking.aisle_or_window',
        text: 'Aisle or window?',
        meaning_ko: '통로석이요, 창가석이요?',
        note: 'Aisle rhymes with mile. The s is silent.',
        note_ko: 'aisle은 mile과 운이 맞고 s는 발음하지 않습니다.',
        category: 'travel'
      },
      {
        id: 'd9_travel_booking.fly_out',
        text: 'I need to fly out Thursday morning.',
        meaning_ko: '목요일 아침에 출발해야 해요.',
        note: 'Fly out = leave by plane. Fly back / come back = return.',
        note_ko: 'fly out은 비행기로 떠나다, fly back은 돌아오다입니다.',
        category: 'travel'
      },
      {
        id: 'd9_travel_booking.itinerary',
        text: "Here's your itinerary.",
        meaning_ko: '여기 여행 일정표예요.',
        note: 'Itinerary = your flight, hotel and schedule in one document.',
        note_ko: 'itinerary는 항공, 호텔, 일정을 담은 문서입니다.',
        category: 'travel'
      },
      {
        id: 'd9_travel_booking.nonstop',
        text: "It's a nonstop flight.",
        meaning_ko: '직항이에요.',
        note: 'Nonstop = no stops. A connecting flight means you change planes.',
        note_ko: 'nonstop은 경유 없음, connecting flight는 갈아타는 비행편입니다.',
        category: 'travel'
      },
      {
        id: 'd9_travel_booking.on_you',
        text: 'Ground transportation is on you.',
        meaning_ko: '현지 교통비는 본인이 먼저 내요.',
        note: 'Something is on you = you pay for it (here, and claim it back later).',
        note_ko: 'something is on you는 당신이 낸다는 뜻입니다(여기서는 나중에 청구).',
        category: 'travel'
      },
      {
        id: 'd9_travel_booking.reimbursable',
        text: "It's reimbursable.",
        meaning_ko: '나중에 돌려받을 수 있어요.',
        note: 'Reimburse = pay back money you spent for work.',
        note_ko: 'reimburse는 업무로 쓴 돈을 돌려준다는 뜻입니다.',
        category: 'travel'
      },
      {
        id: 'd9_travel_booking.under_the_cap',
        text: "That's under the cap.",
        meaning_ko: '한도 이내예요.',
        note: 'Cap = the maximum amount allowed.',
        note_ko: 'cap은 허용되는 최대 금액입니다.',
        category: 'travel'
      },
      {
        id: 'd9_travel_booking.walking_distance',
        text: 'Is it within walking distance?',
        meaning_ko: '걸어갈 수 있는 거리예요?',
        note: 'A common question about hotels and restaurants.',
        note_ko: '호텔이나 식당에 대해 흔히 묻는 질문입니다.',
        category: 'hotel'
      }
    ]
  },
  {
    id: 'd9_code_review',
    title: 'Trading code reviews',
    title_ko: '코드 리뷰 주고받기',
    place: 'office_desk_team',
    npc: 'derek',
    day_from: 9,
    day_to: 10,
    time_from: '13:00',
    time_to: '18:30',
    summary: 'Ask Derek to review your pull request, take his feedback well, and give some feedback on his code.',
    summary_ko: '데릭에게 풀 리퀘스트 리뷰를 부탁하고, 피드백을 잘 받아들이고, 그의 코드에도 피드백을 주세요.',
    sort: 930,
    tags: 'office,code-review,feedback,week2',
    calendar: { day: 9, time: '15:00', title: 'Code review swap with Derek', title_ko: '데릭과 코드 리뷰 교환' },
    turns: [
      {
        speaker: 'derek',
        situation: 'Your inventory API pull request is ready. Derek is at his desk.',
        situation_ko: '재고 API 풀 리퀘스트가 준비됐습니다. 데릭이 자리에 있습니다.',
        line: "Hey, what's up?",
        line_ko: '어, 무슨 일이에요?',
        prompt: 'Your inventory API code is ready. Ask Derek to look it over.',
        prompt_ko: '재고 API 코드가 준비됐습니다. 데릭에게 봐 달라고 하세요.',
        model: 'Do you have a few minutes to review my pull request?',
        model_ko: '제 풀 리퀘스트 리뷰해 줄 시간 좀 있어요?',
        distractors: [
          {
            text: "Can you approve my pull request? It's ready to merge now.",
            text_ko: '제 풀 리퀘스트 승인해 줄래요? 이제 머지하면 돼요.',
            reaction: 'Approve it without looking? Ha, nice try. Send me the link.',
            reaction_ko: '보지도 않고 승인하라고요? 하, 꿈도 커요. 링크 보내요.'
          },
          {
            text: "Could you take over my pull request? I'm kind of stuck.",
            text_ko: '제 풀 리퀘스트 좀 맡아 줄래요? 좀 막혀서요.',
            reaction: "Stuck? I thought you said it was done. What's going on?",
            reaction_ko: '막혀요? 다 됐다고 한 줄 알았는데. 무슨 일이에요?'
          },
          {
            text: 'Do you have a few minutes to review my login page PR?',
            text_ko: '제 로그인 페이지 PR 리뷰해 줄 시간 좀 있어요?',
            reaction: "The login page? Didn't that merge last week?",
            reaction_ko: '로그인 페이지요? 그거 지난주에 머지되지 않았어요?'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Sure, send me the link. Give me twenty minutes.',
        reply_ko: '그럼요, 링크 보내 줘요. 20분만 줘요.'
      },
      {
        speaker: 'derek',
        situation: 'Derek left a comment: one function is too long and has no tests.',
        situation_ko: '데릭이 댓글을 남겼습니다. 함수 하나가 너무 길고 테스트가 없습니다.',
        line: 'Looks good overall. But this function is doing a lot. Mind splitting it up and adding a couple of tests?',
        line_ko: '전체적으로 좋아요. 근데 이 함수가 하는 일이 너무 많네요. 쪼개고 테스트 몇 개 추가해 줄래요?',
        prompt: "Take his suggestions well and say you'll make the changes.",
        prompt_ko: '그의 제안을 잘 받아들이고 고치겠다고 하세요.',
        model: "Thanks for the feedback. Good point, I'll split it up and add some tests.",
        model_ko: '피드백 고마워요. 좋은 지적이에요, 함수 나누고 테스트도 추가할게요.',
        distractors: [
          {
            text: 'It works fine, though. Do we really need tests for something this small?',
            text_ko: '그래도 잘 돌아가는데요. 이렇게 작은 것까지 테스트가 꼭 필요해요?',
            reaction: 'Small things break too. Humor me, okay?',
            reaction_ko: '작은 것도 깨져요. 그냥 해 줘요, 네?'
          },
          {
            text: "Thanks for the feedback. I'll rename the variables and add some comments.",
            text_ko: '피드백 고마워요. 변수 이름 바꾸고 주석 좀 달게요.',
            reaction: "That's not really what I meant. Read my comment again?",
            reaction_ko: '그런 뜻은 아니었는데요. 제 댓글 다시 읽어 볼래요?'
          },
          {
            text: "Sorry, I'm still new. I should've known better. I'll redo the whole thing.",
            text_ko: '죄송해요, 아직 신입이라. 제가 더 잘했어야 했는데. 전부 다시 할게요.',
            reaction: "Whoa, no need to redo it. It's a small change.",
            reaction_ko: '워, 다시 할 필요 없어요. 작은 수정이에요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Appreciate it. Oh, and I've got one for you too, if you have time.",
        reply_ko: '고마워요. 아, 나도 하나 부탁할 게 있는데, 시간 되면요.'
      },
      {
        speaker: 'derek',
        situation: "You review Derek's code. A variable named data2 is confusing.",
        situation_ko: '데릭의 코드를 리뷰합니다. data2라는 변수 이름이 헷갈립니다.',
        line: "Be honest. Anything you'd change?",
        line_ko: '솔직하게 말해 줘요. 바꾸고 싶은 거 있어요?',
        prompt: 'One variable name in his code confused you. Point it out kindly.',
        prompt_ko: '그의 코드에서 변수 이름 하나가 헷갈렸습니다. 부드럽게 짚어 주세요.',
        model: 'It looks great. One small thing: maybe rename data2 to something clearer, like storeInventory?',
        model_ko: '아주 좋아요. 사소한 거 하나만요. data2를 storeInventory처럼 더 분명한 이름으로 바꾸면 어때요?',
        distractors: [
          {
            text: "Honestly, data2 is a pretty bad name. Nobody's going to understand what it means.",
            text_ko: '솔직히 data2는 꽤 나쁜 이름이에요. 아무도 그게 뭔지 모를 거예요.',
            reaction: "Oof. Okay, fair, but you could've been a little nicer.",
            reaction_ko: '윽. 그래요, 맞는 말인데, 좀 부드럽게 말해도 됐잖아요.'
          },
          {
            text: "It looks great. Honestly, I wouldn't change anything. You're way more senior than me.",
            text_ko: '아주 좋아요. 솔직히 바꿀 건 하나도 없어요. 저보다 훨씬 선배시잖아요.',
            reaction: 'Come on, I asked you to be honest. Nothing at all?',
            reaction_ko: '에이, 솔직하게 말해 달라고 했잖아요. 정말 하나도 없어요?'
          },
          {
            text: 'It looks great. One small thing: maybe add a few more tests for the store lookup?',
            text_ko: '아주 좋아요. 사소한 거 하나만요. 매장 조회 테스트를 몇 개 더 넣으면 어때요?',
            reaction: 'Tests are already there, at the bottom. Anything else catch your eye?',
            reaction_ko: '테스트는 맨 아래에 이미 있어요. 다른 건 눈에 띈 거 없어요?'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Ha, fair. data2 was a placeholder I forgot about. Nice catch. Coffee later?',
        reply_ko: '하, 맞아요. data2는 임시로 붙이고 잊어버린 거예요. 잘 찾았네요. 이따 커피 할래요?'
      },
      {
        speaker: 'derek',
        situation: 'Derek wants to grab coffee this afternoon.',
        situation_ko: '데릭이 오후에 커피 한잔하자고 합니다.',
        line: 'Want to grab coffee later? My treat for the review.',
        line_ko: '이따 커피 한잔할래요? 리뷰해 준 답례로 내가 살게요.',
        prompt: 'Accept, and suggest meeting at 3 p.m.',
        prompt_ko: '좋다고 하고 오후 3시를 제안하세요.',
        model: 'Sure, how about around three?',
        model_ko: '좋아요, 3시쯤 어때요?',
        distractors: [
          {
            text: 'Sure, how about around ten?',
            text_ko: '좋아요, 10시쯤 어때요?',
            reaction: 'Ten? I meant this afternoon.',
            reaction_ko: '10시요? 오늘 오후 말한 건데요.'
          },
          {
            text: "Sure. You're paying, right?",
            text_ko: '좋아요. 당신이 사는 거죠?',
            reaction: 'Uh, yeah, I just said my treat.',
            reaction_ko: '어, 네, 방금 내가 산다고 했잖아요.'
          },
          {
            text: "Can't, I'm too busy this week.",
            text_ko: '안 돼요, 이번 주는 너무 바빠요.',
            reaction: 'Oh. No worries, another time then.',
            reaction_ko: '아. 괜찮아요, 그럼 다음에요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Three works. I'll swing by your desk.",
        reply_ko: '3시 좋아요. 자리로 들를게요.'
      }
    ],
    phrases: [
      {
        id: 'd9_code_review.good_point',
        text: 'Good point.',
        meaning_ko: '좋은 지적이에요.',
        note: 'Accept feedback without getting defensive.',
        note_ko: '방어적이지 않게 피드백을 받아들이는 말입니다.',
        category: 'office'
      },
      {
        id: 'd9_code_review.mind_splitting',
        text: 'Mind splitting it up?',
        meaning_ko: '나눠 줄래요?',
        note: 'Mind + -ing? is a friendly request. Answer "Not at all" or "Sure".',
        note_ko: 'Mind + -ing?는 친근한 부탁입니다. Not at all이나 Sure로 답합니다.',
        category: 'office'
      },
      {
        id: 'd9_code_review.my_treat',
        text: 'My treat.',
        meaning_ko: '제가 살게요.',
        note: 'I will pay for you.',
        note_ko: '내가 계산하겠다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'd9_code_review.nice_catch',
        text: 'Nice catch.',
        meaning_ko: '잘 찾았네요.',
        note: 'Said when someone spots a mistake.',
        note_ko: '누군가 실수를 찾아냈을 때 하는 말입니다.',
        category: 'office'
      },
      {
        id: 'd9_code_review.one_small_thing',
        text: 'One small thing: …',
        meaning_ko: '사소한 거 하나만요.',
        note: "Softens feedback so it doesn't sound like criticism.",
        note_ko: '피드백이 비판처럼 들리지 않게 부드럽게 합니다.',
        category: 'office'
      },
      {
        id: 'd9_code_review.swing_by',
        text: "I'll swing by your desk.",
        meaning_ko: '자리로 들를게요.',
        note: 'Swing by = visit briefly.',
        note_ko: 'swing by는 잠깐 들른다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'd9_code_review.take_a_look',
        text: 'Could you take a look at my pull request?',
        meaning_ko: '제 풀 리퀘스트 좀 봐 줄래요?',
        note: 'Take a look = check or review something quickly.',
        note_ko: 'take a look은 가볍게 확인하거나 검토한다는 뜻입니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'd10_contract_terms',
    title: 'Negotiating the contract terms',
    title_ko: '계약 조건 협상',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 10,
    day_to: 10,
    time_from: '10:00',
    time_to: '12:30',
    requires: 'd9_scope',
    summary: "Greg pushes on price, payment terms and uptime. Hold your ground, find the middle, and don't agree to what you can't approve.",
    summary_ko: '그렉이 가격, 지급 조건, 가동률을 밀어붙입니다. 버틸 곳은 버티고, 중간을 찾되, 승인할 수 없는 것에는 동의하지 마세요.',
    sort: 1010,
    tags: 'client,negotiation,contract,video-call,week2',
    calendar: { day: 10, time: '10:30', title: 'Summit Retail: contract terms', title_ko: '서밋 리테일: 계약 조건' },
    turns: [
      {
        speaker: 'greg',
        situation: 'Priya shares the proposal on screen: $180,000 for phase one, payment Net 30.',
        situation_ko: '프리야가 제안서를 화면에 띄웁니다. 1단계 18만 달러, 지급 조건 Net 30.',
        line: "Okay, I've looked at the numbers. Honestly, one eighty is a bit outside our budget. We were thinking closer to one fifty.",
        line_ko: '자, 숫자는 봤어요. 솔직히 18만은 예산을 좀 넘어요. 우린 15만 정도를 생각하고 있었어요.',
        prompt: 'Acknowledge his budget worry, but remind him the price also covers three months of support after launch.',
        prompt_ko: '예산 걱정은 이해한다고 하되, 이 가격에 출시 후 3개월 지원이 포함된다는 걸 상기시키세요.',
        model: 'I understand. Keep in mind the price includes three months of support after launch.',
        model_ko: '이해합니다. 다만 이 가격에는 출시 후 3개월 지원이 포함되어 있다는 점을 기억해 주세요.',
        distractors: [
          {
            text: "I understand. If one fifty is your budget, I'm sure we can make that work.",
            text_ko: '이해합니다. 예산이 15만이라면 저희가 맞춰 드릴 수 있을 거예요.',
            reaction: "Really? Great. Priya, you're good with that?",
            reaction_ko: '정말요? 좋네요. 프리야, 괜찮은 거죠?'
          },
          {
            text: 'I understand. Keep in mind the price includes a full year of support after launch.',
            text_ko: '이해합니다. 다만 이 가격에는 출시 후 1년 지원이 포함되어 있다는 점을 기억해 주세요.',
            reaction: "A full year? That's not what I see in the proposal.",
            reaction_ko: '1년요? 제안서엔 그렇게 안 나와 있는데요.'
          },
          {
            text: "Honestly, one eighty is already a great price. You won't find anything cheaper.",
            text_ko: '솔직히 18만이면 이미 아주 좋은 가격이에요. 이보다 싼 데는 없을 거예요.',
            reaction: 'Maybe, but I still have to answer to my CFO.',
            reaction_ko: '그럴지도요. 그래도 전 CFO한테 설명해야 해요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'That helps. But I still need to get the number down. Can you meet us halfway? Say, one sixty-five?',
        reply_ko: '도움이 되네요. 그래도 금액을 낮춰야 해요. 중간에서 만날 수 있을까요? 16만 5천 정도?'
      },
      {
        speaker: 'greg',
        situation: 'You are not allowed to approve discounts on your own.',
        situation_ko: '당신은 혼자서 할인을 승인할 권한이 없습니다.',
        line: 'So, one sixty-five. Can we shake on that?',
        line_ko: '그럼 16만 5천. 이걸로 악수할까요?',
        prompt: "Discounts aren't your call. Don't say yes; tell him what you'll do instead.",
        prompt_ko: '할인은 당신이 결정할 일이 아닙니다. 승낙하지 말고, 대신 어떻게 할지 말하세요.',
        model: "I can't approve that on my own, but let me run it by my manager and get back to you.",
        model_ko: '제 선에서 승인할 수는 없지만, 매니저에게 확인하고 다시 연락드릴게요.',
        distractors: [
          {
            text: "Sure, one sixty-five works for us. Let's shake on it and move on to the next item.",
            text_ko: '좋아요, 16만 5천이면 됩니다. 악수하고 다음 항목으로 넘어가죠.',
            reaction: 'Great! Glad we sorted that out. Priya, you heard it.',
            reaction_ko: '좋아요! 해결돼서 다행이네요. 프리야, 들었죠?'
          },
          {
            text: 'One sixty-five is too low. My manager would never agree to that.',
            text_ko: '16만 5천은 너무 낮아요. 저희 매니저는 절대 동의 안 할 거예요.',
            reaction: "Never? Then we're stuck. Can you at least ask?",
            reaction_ko: '절대요? 그럼 막혔네요. 물어보기라도 해 줄래요?'
          },
          {
            text: "I can't say yes to that, but let me ask Priya after the call and get back to you.",
            text_ko: '그건 제가 승낙할 수 없지만, 통화 끝나고 프리야에게 물어보고 다시 연락드릴게요.',
            reaction: "Priya's sitting right next to you. Priya?",
            reaction_ko: '프리야가 바로 옆에 있잖아요. 프리야?'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "Fair enough. While you're at it, let's talk payment terms.",
        reply_ko: '그러죠. 그 김에 지급 조건도 얘기합시다.'
      },
      {
        speaker: 'greg',
        situation: 'Greg wants to pay 60 days after each invoice instead of 30.',
        situation_ko: '그렉은 송장마다 30일이 아니라 60일 뒤에 지급하길 원합니다.',
        line: 'Our standard is Net 60. Net 30 is tough for our finance team.',
        line_ko: '우리 기준은 Net 60이에요. Net 30은 재무팀이 힘들어해요.',
        prompt: 'Your standard is thirty days and his is sixty. Offer a compromise.',
        prompt_ko: '당신 쪽 기준은 30일, 그쪽은 60일입니다. 타협안을 내세요.',
        model: 'How about we meet in the middle at Net 45?',
        model_ko: '중간에서 Net 45로 맞추면 어떨까요?',
        distractors: [
          {
            text: 'Net 60 works for us, no problem at all.',
            text_ko: 'Net 60이면 저희는 전혀 문제없어요.',
            reaction: 'Oh, great. That was easier than I thought.',
            reaction_ko: '오, 좋네요. 생각보다 쉬웠네요.'
          },
          {
            text: "Sorry, Net 30 is final. We can't budge on that.",
            text_ko: '죄송하지만 Net 30이 최종이에요. 그건 못 바꿔요.',
            reaction: "That's a tough position. I'll have to take it upstairs.",
            reaction_ko: '강경하시네요. 윗선에 올려 봐야겠어요.'
          },
          {
            text: 'How about we meet in the middle at Net 90?',
            text_ko: '중간에서 Net 90으로 맞추면 어떨까요?',
            reaction: "Ninety? That's not the middle. I'd take it, though!",
            reaction_ko: '90일요? 그건 중간이 아니잖아요. 저야 좋지만요!'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Net 45… I can live with that.',
        reply_ko: 'Net 45라… 그 정도면 받아들일 수 있어요.'
      },
      {
        speaker: 'greg',
        situation: 'Next is the service level agreement, the SLA.',
        situation_ko: '다음은 서비스 수준 협약(SLA)입니다.',
        line: 'Last thing: uptime. We need a guarantee. What can you commit to?',
        line_ko: '마지막으로 가동률이요. 보장이 필요해요. 어디까지 약속할 수 있어요?',
        prompt: "Offer your team's standard: 99.9% uptime, with critical issues answered within four hours.",
        prompt_ko: '팀의 기준을 제시하세요. 가동률 99.9%, 심각한 장애는 4시간 안에 대응.',
        model: 'We can commit to 99.9 percent uptime and a four-hour response time for critical issues.',
        model_ko: '가동률 99.9퍼센트, 그리고 심각한 장애에는 4시간 내 대응을 약속드릴 수 있습니다.',
        distractors: [
          {
            text: "We can guarantee 100 percent uptime, and we'll fix any critical issue within an hour.",
            text_ko: '가동률 100퍼센트를 보장하고, 심각한 장애는 한 시간 안에 고쳐 드릴게요.',
            reaction: "A hundred percent? Nobody can promise that. Let's be realistic.",
            reaction_ko: '100퍼센트요? 그건 아무도 약속 못 해요. 현실적으로 가죠.'
          },
          {
            text: 'We can commit to 99 percent uptime and a four-day response time for critical issues.',
            text_ko: '가동률 99퍼센트, 그리고 심각한 장애에는 4일 내 대응을 약속드릴 수 있습니다.',
            reaction: "Four days? My stores can't be in the dark for four days.",
            reaction_ko: '4일요? 우리 매장들이 4일이나 깜깜이일 순 없어요.'
          },
          {
            text: "Uptime depends on a lot of things. We'd rather not put a number in the contract.",
            text_ko: '가동률은 여러 요인에 달려 있어서요. 계약서에 숫자는 안 넣었으면 해요.',
            reaction: "Then we have a problem. Legal won't sign without a number.",
            reaction_ko: '그럼 문제네요. 법무팀은 숫자 없인 서명 안 해요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "That's reasonable. Send me the revised terms and I'll share them with legal.",
        reply_ko: '합리적이네요. 수정된 조건을 보내 주면 법무팀과 공유할게요.'
      },
      {
        speaker: 'priya',
        situation: 'Priya nods at you to close the call.',
        situation_ko: '프리야가 통화를 마무리하라고 고개를 끄덕입니다.',
        line: 'Nice job. Want to wrap up?',
        line_ko: '잘했어요. 마무리할래요?',
        prompt: 'Close the call by recapping your next steps. You can get the revised terms to him today.',
        prompt_ko: '다음에 할 일을 정리하며 통화를 마무리하세요. 수정된 조건은 오늘 중으로 보낼 수 있습니다.',
        model: "Great. I'll check the price with my manager and send you the revised terms by end of day.",
        model_ko: '좋습니다. 가격은 매니저에게 확인하고, 수정된 조건은 오늘 업무 끝나기 전에 보내 드릴게요.',
        distractors: [
          {
            text: "Great. So we're at one sixty-five, and I'll send you the revised terms by end of day.",
            text_ko: '좋습니다. 그럼 16만 5천으로 하고, 수정된 조건은 오늘 업무 끝나기 전에 보내 드릴게요.',
            reaction: 'Oh, so one sixty-five is approved? I thought you had to check.',
            reaction_ko: '어, 16만 5천이 승인된 거예요? 확인해야 한다면서요.'
          },
          {
            text: "Great. I'll check the price with my manager and send the revised terms next week.",
            text_ko: '좋습니다. 가격은 매니저에게 확인하고, 수정된 조건은 다음 주에 보내 드릴게요.',
            reaction: 'Next week? I was hoping to get this to legal sooner.',
            reaction_ko: '다음 주요? 법무팀에 더 빨리 넘기고 싶었는데요.'
          },
          {
            text: "Great. Could you send us your revised terms, and we'll take a look at them?",
            text_ko: '좋습니다. 그쪽에서 수정된 조건을 보내 주시면 저희가 검토할게요.',
            reaction: 'Me? I thought your side was revising them.',
            reaction_ko: '제가요? 그쪽에서 수정하는 줄 알았는데요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Sounds good. Talk soon.',
        reply_ko: '좋아요. 또 얘기해요.'
      }
    ],
    phrases: [
      {
        id: 'd10_contract_terms.can_live_with',
        text: 'I can live with that.',
        meaning_ko: '그 정도면 받아들일 수 있어요.',
        note: 'Not perfect, but acceptable.',
        note_ko: '완벽하진 않지만 받아들일 만하다는 뜻입니다.',
        category: 'negotiation'
      },
      {
        id: 'd10_contract_terms.get_back',
        text: "I'll get back to you.",
        meaning_ko: '다시 연락드릴게요.',
        note: 'A promise to answer later.',
        note_ko: '나중에 답하겠다는 약속입니다.',
        category: 'negotiation'
      },
      {
        id: 'd10_contract_terms.meet_halfway',
        text: 'Can you meet us halfway?',
        meaning_ko: '중간에서 합의할 수 있을까요?',
        note: 'Meet halfway / meet in the middle = both sides give up a little.',
        note_ko: 'meet halfway, meet in the middle은 양쪽이 조금씩 양보한다는 뜻입니다.',
        category: 'negotiation'
      },
      {
        id: 'd10_contract_terms.net_30',
        text: 'Net 30',
        meaning_ko: '송장 발행 후 30일 이내 지급',
        note: 'Payment terms: the client pays within 30 days of the invoice. Net 45, Net 60 work the same way.',
        note_ko: '지급 조건: 송장 후 30일 안에 지급. Net 45, Net 60도 같은 방식입니다.',
        category: 'contract'
      },
      {
        id: 'd10_contract_terms.outside_budget',
        text: "That's a bit outside our budget.",
        meaning_ko: '예산을 조금 벗어나요.',
        note: 'A polite way to say the price is too high.',
        note_ko: '가격이 너무 높다는 것을 정중하게 말하는 방법입니다.',
        category: 'negotiation'
      },
      {
        id: 'd10_contract_terms.price_includes',
        text: 'Keep in mind the price includes support.',
        meaning_ko: '가격에 지원이 포함되어 있다는 걸 기억해 주세요.',
        note: 'Talk about value before you give a discount.',
        note_ko: '할인하기 전에 가치를 먼저 말하세요.',
        category: 'negotiation'
      },
      {
        id: 'd10_contract_terms.run_it_by',
        text: 'Let me run it by my manager.',
        meaning_ko: '매니저에게 확인해 볼게요.',
        note: 'Run something by someone = ask for their opinion or approval.',
        note_ko: 'run something by someone은 의견이나 승인을 구한다는 뜻입니다.',
        category: 'negotiation'
      },
      {
        id: 'd10_contract_terms.sla',
        text: 'service level agreement (SLA)',
        meaning_ko: '서비스 수준 협약',
        note: 'The part of a contract that promises uptime and response times.',
        note_ko: '가동률과 대응 시간을 약속하는 계약 조항입니다.',
        category: 'contract'
      }
    ]
  },
  {
    id: 'd10_approval',
    title: 'Getting sign-off on the discount',
    title_ko: '할인 승인 받기',
    place: 'office_manager',
    npc: 'maya',
    day_from: 10,
    day_to: 10,
    time_from: '12:30',
    time_to: '17:30',
    requires: 'd10_contract_terms',
    summary: 'Greg asked for a lower price. Explain the situation to Maya and agree on how far you can go.',
    summary_ko: '그렉이 가격을 낮춰 달라고 했습니다. 마야에게 상황을 설명하고 어디까지 양보할지 정하세요.',
    sort: 1020,
    tags: 'negotiation,manager,approval,week2',
    calendar: { day: 10, time: '14:00', title: 'Pricing sign-off with Maya', title_ko: '마야에게 가격 승인 받기' },
    turns: [
      {
        speaker: 'maya',
        situation: "You need Maya's sign-off before you answer Greg.",
        situation_ko: '그렉에게 답하기 전에 마야의 승인이 필요합니다.',
        line: "How'd the call with Greg go?",
        line_ko: '그렉이랑 통화는 어떻게 됐어요?',
        prompt: 'Report on the call, including what Greg asked for.',
        prompt_ko: '통화 결과를 보고하세요. 그렉이 무엇을 요청했는지도요.',
        model: 'It went well, but he asked for a discount. He wants to bring it down to one sixty-five.',
        model_ko: '잘 됐는데, 할인을 요청했어요. 16만 5천으로 낮추고 싶어 해요.',
        distractors: [
          {
            text: 'It went well, but he asked for a discount. He wants to bring it down to one fifty.',
            text_ko: '잘 됐는데, 할인을 요청했어요. 15만으로 낮추고 싶어 해요.',
            reaction: "One fifty? That's a big cut. Is that really his final ask?",
            reaction_ko: '15만요? 많이 깎네요. 그게 정말 최종 요청이에요?'
          },
          {
            text: 'It went well. He asked for one sixty-five, and I told him that should be totally fine.',
            text_ko: '잘 됐어요. 16만 5천을 요청해서, 그 정도면 전혀 문제없을 거라고 했어요.',
            reaction: "You told him what? You can't promise that without me.",
            reaction_ko: '뭐라고 했다고요? 나 없이 그런 약속을 하면 안 돼요.'
          },
          {
            text: "It went great. He's happy with the price, and we agreed on Net 45.",
            text_ko: '아주 잘 됐어요. 가격에 만족하고, Net 45로 합의했어요.',
            reaction: 'Great. So no pushback on price at all? Really?',
            reaction_ko: '좋네요. 가격엔 아무 말도 없었어요? 정말요?'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Figured. That's about eight percent. What do you think we should do?",
        reply_ko: '그럴 줄 알았어요. 8% 정도네요. 어떻게 하면 좋겠어요?'
      },
      {
        speaker: 'maya',
        situation: 'You think a smaller discount could work if Summit commits to more.',
        situation_ko: '서밋이 더 약속한다면 작은 할인은 괜찮다고 생각합니다.',
        line: 'I want to hear your take first.',
        line_ko: '당신 생각을 먼저 듣고 싶어요.',
        prompt: 'Propose your idea: a 5% discount, but only if Summit signs a one-year support contract.',
        prompt_ko: '당신의 생각을 제안하세요. 서밋이 1년 지원 계약을 맺는 조건으로 5% 할인입니다.',
        model: 'What if we offer five percent off in exchange for a one-year support contract?',
        model_ko: '1년 지원 계약을 맺는 조건으로 5퍼센트 할인해 주면 어떨까요?',
        distractors: [
          {
            text: "What if we just give him the full eight percent so we don't risk losing the deal?",
            text_ko: '계약을 놓칠 위험이 없게 그냥 8퍼센트 다 깎아 주면 어떨까요?',
            reaction: "And get nothing in return? I don't love that.",
            reaction_ko: '아무것도 안 받고요? 그건 별로예요.'
          },
          {
            text: 'What if we offer five percent off in exchange for paying Net 30 instead?',
            text_ko: '대신 Net 30으로 지급하는 조건으로 5퍼센트 할인해 주면 어떨까요?',
            reaction: 'We already settled on Net 45. Why reopen that?',
            reaction_ko: 'Net 45로 이미 정했잖아요. 그걸 왜 다시 꺼내요?'
          },
          {
            text: "I'm not sure. You've done more of these. What would you normally do?",
            text_ko: '잘 모르겠어요. 이런 건 더 많이 해 보셨잖아요. 보통 어떻게 해요?',
            reaction: 'I asked first. Come on, what does your gut say?',
            reaction_ko: '내가 먼저 물었잖아요. 자, 당신 직감은 어때요?'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'I like that. It keeps the relationship going. Five percent is my limit, though.',
        reply_ko: '좋네요. 관계도 계속 이어지고요. 그래도 5%가 한계예요.'
      },
      {
        speaker: 'maya',
        situation: 'Maya wants the final wording checked before anything is sent.',
        situation_ko: '마야는 무엇을 보내기 전에 최종 문구를 검토받길 원합니다.',
        line: "And don't put anything in writing until legal reviews it, okay?",
        line_ko: '그리고 법무팀이 검토하기 전엔 아무것도 서면으로 보내지 마요, 알겠죠?',
        prompt: "Repeat back the two rules Maya just set, so she knows you've got them.",
        prompt_ko: '마야가 정한 두 가지 원칙을 다시 말해 확인하세요.',
        model: 'Got it. Five percent max, and nothing in writing until legal signs off.',
        model_ko: '알겠어요. 최대 5퍼센트, 그리고 법무팀 승인 전엔 서면으로 아무것도 안 보낼게요.',
        distractors: [
          {
            text: 'Got it. Eight percent max, and nothing in writing until legal signs off.',
            text_ko: '알겠어요. 최대 8퍼센트, 그리고 법무팀 승인 전엔 서면으로 아무것도 안 보낼게요.',
            reaction: "Five, not eight. That's my limit.",
            reaction_ko: '8이 아니라 5예요. 그게 내 한계예요.'
          },
          {
            text: "Got it. I'll just text Greg the five percent offer tonight so he knows.",
            text_ko: '알겠어요. 그렉이 알 수 있게 오늘 밤 5퍼센트 제안을 문자로 보낼게요.',
            reaction: 'A text counts as writing. Hold off until legal sees it.',
            reaction_ko: '문자도 서면이에요. 법무팀이 볼 때까지 기다려요.'
          },
          {
            text: "Sure, but can't I just send a quick email? Legal takes forever.",
            text_ko: '네, 근데 간단한 메일 정도는 괜찮지 않아요? 법무팀은 너무 오래 걸려서요.',
            reaction: "I know it's slow. But no, not this time.",
            reaction_ko: '느린 건 알아요. 그래도 이번엔 안 돼요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Perfect. You're a natural at this. Go get 'em in Ridgeport.",
        reply_ko: '완벽해요. 이런 데 타고났네요. 리지포트에서 잘하고 와요.'
      }
    ],
    phrases: [
      {
        id: 'd10_approval.a_natural',
        text: "You're a natural.",
        meaning_ko: '타고났네요.',
        note: 'A compliment: you are naturally good at it.',
        note_ko: '원래 잘한다는 칭찬입니다.',
        category: 'office'
      },
      {
        id: 'd10_approval.bring_it_down',
        text: 'He wants to bring it down to one sixty-five.',
        meaning_ko: '그는 16만 5천으로 낮추고 싶어 해요.',
        note: 'In business, people often drop the word thousand: one sixty-five = $165,000.',
        note_ko: '비즈니스에서는 thousand를 자주 생략합니다. one sixty-five = 16만 5천 달러.',
        category: 'negotiation'
      },
      {
        id: 'd10_approval.in_exchange',
        text: 'Five percent off in exchange for a one-year contract.',
        meaning_ko: '1년 계약을 조건으로 5% 할인.',
        note: 'Never give a discount for nothing. Ask for something back.',
        note_ko: '공짜로 할인하지 말고 대가를 요구하세요.',
        category: 'negotiation'
      },
      {
        id: 'd10_approval.in_writing',
        text: "Don't put anything in writing yet.",
        meaning_ko: '아직 아무것도 서면으로 남기지 마세요.',
        note: 'Written offers can become binding. Check with legal first.',
        note_ko: '서면 제안은 구속력이 생길 수 있어 먼저 법무팀에 확인합니다.',
        category: 'contract'
      },
      {
        id: 'd10_approval.my_limit',
        text: 'Five percent is my limit.',
        meaning_ko: '5%가 제 한계예요.',
        note: 'The most someone can agree to.',
        note_ko: '동의할 수 있는 최대치입니다.',
        category: 'negotiation'
      },
      {
        id: 'd10_approval.sign_off',
        text: 'I need your sign-off.',
        meaning_ko: '승인이 필요해요.',
        note: 'Sign-off (noun) = approval. Sign off on something (verb) = approve it.',
        note_ko: 'sign-off(명사)는 승인, sign off on(동사)은 승인하다입니다.',
        category: 'negotiation'
      },
      {
        id: 'd10_approval.your_take',
        text: 'I want to hear your take.',
        meaning_ko: '당신 생각을 듣고 싶어요.',
        note: 'Your take = your opinion.',
        note_ko: 'your take는 당신의 의견입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'd10_handoff',
    title: 'Handing off before the trip',
    title_ko: '출장 전 인수인계',
    place: 'office_desk_team',
    npc: 'derek',
    day_from: 10,
    day_to: 10,
    time_from: '14:00',
    time_to: '19:00',
    requires: 'd9_travel_booking',
    summary: 'You will be out Thursday and Friday. Hand off your work to Derek so nothing falls through the cracks.',
    summary_ko: '목요일과 금요일에 자리를 비웁니다. 빠뜨리는 일이 없도록 데릭에게 인수인계하세요.',
    sort: 1030,
    tags: 'office,handoff,travel,week2',
    calendar: { day: 10, time: '16:00', title: 'Handoff to Derek before the trip', title_ko: '출장 전 데릭에게 인수인계' },
    turns: [
      {
        speaker: 'derek',
        situation: "Your flight is tomorrow morning. You stop by Derek's desk.",
        situation_ko: '비행기는 내일 아침입니다. 데릭 자리에 들릅니다.',
        line: "So you're off to Ridgeport, huh? What do you need from me?",
        line_ko: '리지포트 간다면서요? 나한테 필요한 게 뭐예요?',
        prompt: "You'll be gone two days. Ask Derek to look after your main project while you're out.",
        prompt_ko: '이틀 동안 자리를 비웁니다. 그동안 당신이 맡은 주 업무를 데릭에게 부탁하세요.',
        model: "Could you cover for me on the inventory API while I'm away?",
        model_ko: '출장 가 있는 동안 재고 API 좀 대신 봐 줄 수 있어요?',
        distractors: [
          {
            text: "Could you cover for me on the login page while I'm away?",
            text_ko: '출장 가 있는 동안 로그인 페이지 좀 대신 봐 줄 수 있어요?',
            reaction: "The login page? Isn't that done already?",
            reaction_ko: '로그인 페이지요? 그거 이미 끝나지 않았어요?'
          },
          {
            text: "Can you just finish the inventory API for me while I'm gone?",
            text_ko: '저 없는 동안 재고 API 그냥 마무리해 줄 수 있어요?',
            reaction: "Finish it? I've got my own stuff. I can watch it, though.",
            reaction_ko: '마무리요? 나도 내 일이 있어요. 지켜봐 줄 수는 있지만.'
          },
          {
            text: "Could you cover for me next week while I'm in Ridgeport?",
            text_ko: '다음 주에 리지포트에 가 있는 동안 대신 봐 줄 수 있어요?',
            reaction: 'Next week? I thought you were flying out tomorrow.',
            reaction_ko: '다음 주요? 내일 출발하는 줄 알았는데요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Sure thing. Where are things at right now?',
        reply_ko: '물론이죠. 지금 어디까지 됐어요?'
      },
      {
        speaker: 'derek',
        situation: 'The API is merged, but some store IDs come back empty.',
        situation_ko: 'API는 병합됐지만 일부 매장 ID가 빈 값으로 옵니다.',
        line: 'Where are things at?',
        line_ko: '지금 어디까지 됐어요?',
        prompt: "Give him the honest status, including the problem that's still open.",
        prompt_ko: '남은 문제까지 포함해 솔직하게 현황을 알려 주세요.',
        model: "The code is merged, but there's one open bug. Some store IDs come back empty.",
        model_ko: '코드는 머지됐는데, 버그가 하나 남아 있어요. 일부 매장 ID가 빈 값으로 와요.',
        distractors: [
          {
            text: "It's all merged and working. Nothing to worry about while I'm gone.",
            text_ko: '다 머지됐고 잘 돌아가요. 저 없는 동안 걱정할 거 없어요.',
            reaction: 'Nothing? Then why do you need me covering?',
            reaction_ko: '아무것도요? 그럼 왜 나한테 봐 달라고 해요?'
          },
          {
            text: "The code is still in review, and there's one bug. Some store IDs come back empty.",
            text_ko: '코드는 아직 리뷰 중이고, 버그가 하나 있어요. 일부 매장 ID가 빈 값으로 와요.',
            reaction: "Still in review? I'm pretty sure it got merged.",
            reaction_ko: '아직 리뷰 중이요? 머지된 걸로 아는데요.'
          },
          {
            text: "It's merged, but there's a bug in there somewhere. You'll figure it out, I'm sure.",
            text_ko: '머지는 됐는데, 어딘가에 버그가 있어요. 당신이라면 알아낼 거예요.',
            reaction: "Somewhere? I'm going to need more than that.",
            reaction_ko: '어딘가요? 그것보단 더 알려 줘야죠.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Okay, I'll keep an eye on it. Did you write it up anywhere?",
        reply_ko: '알겠어요, 지켜볼게요. 어디 정리해 뒀어요?'
      },
      {
        speaker: 'derek',
        situation: 'You documented everything in the ticket.',
        situation_ko: '모든 걸 티켓에 적어 두었습니다.',
        line: 'Did you write it up anywhere?',
        line_ko: '어디 정리해 뒀어요?',
        prompt: 'Tell him where your notes are, and how he can reach you on the road.',
        prompt_ko: '메모를 어디 남겼는지, 출장 중에 어떻게 연락할 수 있는지 말하세요.',
        model: "Yeah, it's all in the ticket. And I'll be reachable on chat if anything comes up.",
        model_ko: '네, 전부 티켓에 있어요. 그리고 무슨 일 생기면 채팅으로 연락돼요.',
        distractors: [
          {
            text: 'Not really, but I can walk you through all of it over the phone from Ridgeport tonight.',
            text_ko: '딱히요. 대신 오늘 밤 리지포트에서 전화로 다 설명해 줄게요.',
            reaction: "Over the phone? Write it down, man. You'll be in meetings.",
            reaction_ko: '전화로요? 글로 남겨요. 회의 중일 거잖아요.'
          },
          {
            text: "Yeah, it's all in the ticket. But please don't contact me while I'm traveling.",
            text_ko: '네, 전부 티켓에 있어요. 근데 출장 중엔 연락하지 말아 주세요.',
            reaction: 'Uh, okay. Hopefully nothing breaks, then.',
            reaction_ko: '어, 알겠어요. 그럼 아무것도 안 깨지길 빌어야겠네요.'
          },
          {
            text: "It's all in the ticket. Can you also update Priya and Maya on it every day?",
            text_ko: '전부 티켓에 있어요. 프리야랑 마야한테 매일 진행 상황도 알려 줄래요?',
            reaction: "Every day? I'm covering, not being your assistant.",
            reaction_ko: '매일요? 대신 봐 주는 거지 비서가 아니에요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Perfect. Safe travels, and don't let Greg push you around.",
        reply_ko: '완벽해요. 잘 다녀오고, 그렉한테 휘둘리지 마요.'
      }
    ],
    phrases: [
      {
        id: 'd10_handoff.cover_for_me',
        text: "Could you cover for me while I'm away?",
        meaning_ko: '제가 없는 동안 제 일 좀 봐 줄래요?',
        note: 'Cover for someone = do their work while they are out.',
        note_ko: 'cover for someone은 자리를 비운 사람의 일을 대신한다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'd10_handoff.fall_through_cracks',
        text: 'Nothing falls through the cracks.',
        meaning_ko: '빠뜨리는 일이 없어요.',
        note: 'Fall through the cracks = get forgotten by accident.',
        note_ko: 'fall through the cracks는 실수로 누락된다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'd10_handoff.if_anything_comes_up',
        text: 'Call me if anything comes up.',
        meaning_ko: '무슨 일 생기면 연락 주세요.',
        note: 'Come up = happen unexpectedly.',
        note_ko: 'come up은 뜻밖에 생기다라는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'd10_handoff.keep_an_eye',
        text: "I'll keep an eye on it.",
        meaning_ko: '지켜볼게요.',
        note: 'Watch something to make sure nothing goes wrong.',
        note_ko: '문제가 없는지 지켜본다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'd10_handoff.safe_travels',
        text: 'Safe travels!',
        meaning_ko: '조심히 다녀와요!',
        note: 'A common goodbye to someone taking a trip.',
        note_ko: '여행 떠나는 사람에게 하는 인사입니다.',
        category: 'travel'
      },
      {
        id: 'd10_handoff.where_things_are',
        text: 'Where are things at?',
        meaning_ko: '진행 상황이 어때요?',
        note: 'A casual way to ask for a status update.',
        note_ko: '진행 상황을 묻는 가벼운 표현입니다.',
        category: 'office'
      },
      {
        id: 'd10_handoff.write_it_up',
        text: 'Did you write it up?',
        meaning_ko: '정리해 뒀어요?',
        note: 'Write up = document something.',
        note_ko: 'write up은 문서로 정리한다는 뜻입니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'd11_checkin',
    title: 'Checking in for your flight',
    title_ko: '탑승 수속',
    place: 'airport_checkin',
    npc: 'amy',
    day_from: 11,
    day_to: 11,
    time_from: '06:30',
    time_to: '10:00',
    requires: 'd9_travel_booking',
    summary: 'Check in at the Crestline Air counter: show your ID, check a bag, and ask about the flight.',
    summary_ko: '크레스트라인 항공 카운터에서 탑승 수속을 합니다. 신분증을 보여 주고, 짐을 부치고, 항공편을 확인하세요.',
    sort: 1110,
    tags: 'travel,airport,trip',
    calendar: { day: 11, time: '07:30', title: 'Check in: Crestline Air 482', title_ko: '탑승 수속: 크레스트라인 482편' },
    turns: [
      {
        speaker: 'amy',
        situation: 'You arrive at the Crestline Air counter with a backpack and a small suitcase.',
        situation_ko: '배낭과 작은 여행 가방을 들고 크레스트라인 항공 카운터에 도착합니다.',
        line: 'Good morning! Where are you flying today?',
        line_ko: '안녕하세요! 오늘 어디로 가세요?',
        prompt: "Tell her where you're headed and which flight you're on.",
        prompt_ko: '어디로 가는지, 몇 시 비행기인지 말하세요.',
        model: "Good morning. I'm flying to Ridgeport on the nine-thirty flight.",
        model_ko: '안녕하세요. 9시 30분 비행기로 리지포트에 가요.',
        distractors: [
          {
            text: "Good morning. I'm flying to Ridgeport on the ten-thirty flight.",
            text_ko: '안녕하세요. 10시 30분 비행기로 리지포트에 가요.',
            reaction: "I don't have a ten-thirty to Ridgeport. Can you check your itinerary?",
            reaction_ko: '리지포트행 10시 30분 편은 없는데요. 일정표 확인해 보시겠어요?'
          },
          {
            text: "Good morning. I'm flying back from Ridgeport on Friday afternoon.",
            text_ko: '안녕하세요. 금요일 오후에 리지포트에서 돌아와요.',
            reaction: "That's your return. Which flight are you on today?",
            reaction_ko: '그건 돌아오는 편이고요. 오늘은 어느 편 타세요?'
          },
          {
            text: "Morning. Ridgeport. Just print my boarding pass, please. I'm in a hurry.",
            text_ko: '네. 리지포트요. 탑승권만 뽑아 주세요. 급해요.',
            reaction: "I'll be quick. I just need a few things from you first.",
            reaction_ko: '빨리 해 드릴게요. 먼저 몇 가지만 필요해요.'
          }
        ],
        reply_speaker: 'amy',
        reply_line: 'Great. Can I see a photo ID, please? And are you checking any bags today?',
        reply_ko: '좋아요. 사진 있는 신분증 보여 주시겠어요? 오늘 부칠 짐 있으세요?'
      },
      {
        speaker: 'amy',
        situation: 'Your suitcase is too big for the overhead bin. The backpack has your laptop.',
        situation_ko: '여행 가방은 기내 선반에 들어가기엔 큽니다. 배낭에는 노트북이 있습니다.',
        line: 'Photo ID, please. Any bags to check?',
        line_ko: '사진 있는 신분증 주세요. 부칠 짐 있으세요?',
        prompt: 'Hand over your ID. The suitcase goes under the plane; the backpack stays with you.',
        prompt_ko: '신분증을 건네세요. 여행 가방은 부치고, 배낭은 들고 탑니다.',
        model: "Here's my driver's license. I'm checking one bag, and the backpack is my carry-on.",
        model_ko: '여기 운전면허증이요. 가방 하나 부치고, 배낭은 기내에 들고 탈게요.',
        distractors: [
          {
            text: "Here's my driver's license. I'm checking both bags, the suitcase and the backpack.",
            text_ko: '여기 운전면허증이요. 여행 가방이랑 배낭 둘 다 부칠게요.',
            reaction: 'Sure. Any electronics in the backpack? Those have to stay with you.',
            reaction_ko: '네. 배낭에 전자 기기 있으세요? 그건 들고 타셔야 해요.'
          },
          {
            text: "Here's my license. No bags to check. I'll just carry the suitcase on.",
            text_ko: '여기 면허증이요. 부칠 짐은 없어요. 여행 가방은 그냥 들고 탈게요.',
            reaction: "That suitcase looks too big for the overhead bin, I'm afraid.",
            reaction_ko: '그 가방은 기내 선반에 들어가기엔 너무 커 보여요.'
          },
          {
            text: "Do I really need to show ID for this? It's only a short domestic flight.",
            text_ko: '이것도 신분증을 꼭 보여 줘야 해요? 짧은 국내선인데요.',
            reaction: 'Yes, everyone needs a photo ID to fly. Sorry!',
            reaction_ko: '네, 비행기 타려면 누구나 사진 신분증이 필요해요. 죄송해요!'
          }
        ],
        reply_speaker: 'amy',
        reply_line: 'Perfect. The first checked bag is thirty-five dollars. How would you like to pay?',
        reply_ko: '좋아요. 첫 번째 위탁 수하물은 35달러예요. 어떻게 결제하시겠어요?'
      },
      {
        speaker: 'amy',
        situation: 'Tom said the bag fee is reimbursable.',
        situation_ko: '톰이 수하물 요금은 환급된다고 했습니다.',
        line: "That's thirty-five for the bag. Card or cash?",
        line_ko: '수하물은 35달러예요. 카드로 하세요, 현금으로 하세요?',
        prompt: "Pay with the card work gave you, and make sure you'll have proof for your expense report.",
        prompt_ko: '회사에서 받은 카드로 결제하고, 경비 보고용 증빙을 꼭 챙기세요.',
        model: "I'll put it on my company card. Could I get a receipt, please?",
        model_ko: '법인 카드로 할게요. 영수증 받을 수 있을까요?',
        distractors: [
          {
            text: "Cash is fine. I don't really need a receipt for this, thanks.",
            text_ko: '현금으로 할게요. 이건 영수증 필요 없어요, 고마워요.',
            reaction: "Okay. Just so you know, I can't reprint it later.",
            reaction_ko: '알겠어요. 참고로 나중에 다시 뽑아 드릴 수는 없어요.'
          },
          {
            text: "Thirty-five? Can't you waive it? It's for a business trip.",
            text_ko: '35달러요? 면제해 주면 안 돼요? 출장인데요.',
            reaction: 'Sorry, everyone pays the bag fee. Card or cash?',
            reaction_ko: '죄송해요, 수하물 요금은 다 내셔야 해요. 카드요, 현금요?'
          },
          {
            text: "I'll put it on my company card. It was twenty-five, right?",
            text_ko: '법인 카드로 할게요. 25달러 맞죠?',
            reaction: "It's thirty-five for the first checked bag.",
            reaction_ko: '첫 번째 위탁 수하물은 35달러예요.'
          }
        ],
        reply_speaker: 'amy',
        reply_line: "Of course. The receipt will be in your email. You're in seat 14C, on the aisle.",
        reply_ko: '그럼요. 영수증은 이메일로 갈 거예요. 좌석은 14C, 통로석이에요.'
      },
      {
        speaker: 'amy',
        situation: 'Amy prints your boarding pass.',
        situation_ko: '에이미가 탑승권을 출력합니다.',
        line: "You're in boarding group three. Boarding starts at eight-fifty at gate B12. Anything else?",
        line_ko: '탑승 그룹은 3번이에요. 탑승은 8시 50분, B12 게이트에서 시작해요. 더 필요한 거 있으세요?',
        prompt: "Before you go, check whether there's any delay.",
        prompt_ko: '가기 전에 지연은 없는지 확인하세요.',
        model: 'Thanks. Is the flight on time?',
        model_ko: '고마워요. 비행기 제시간에 떠요?',
        distractors: [
          {
            text: 'Thanks. So boarding is at nine-fifty?',
            text_ko: '고마워요. 그럼 탑승이 9시 50분이죠?',
            reaction: 'Eight-fifty. The flight leaves at nine-thirty.',
            reaction_ko: '8시 50분이요. 비행기는 9시 30분에 떠요.'
          },
          {
            text: 'Thanks. Is gate B21 far from here?',
            text_ko: '고마워요. B21 게이트는 여기서 멀어요?',
            reaction: "B12, not B21. It's just past security.",
            reaction_ko: 'B21 말고 B12예요. 보안 검색대 지나면 바로예요.'
          },
          {
            text: 'Can you make sure it leaves on time?',
            text_ko: '꼭 제시간에 뜨게 해 주실 수 있어요?',
            reaction: "Ha, I wish I could. I don't fly the plane.",
            reaction_ko: '하, 저도 그러고 싶네요. 제가 조종하는 건 아니라서요.'
          }
        ],
        reply_speaker: 'amy',
        reply_line: 'As of now, yes. Keep an eye on the screens, though. Have a nice flight!',
        reply_ko: '현재로서는 네. 그래도 전광판을 잘 보세요. 즐거운 비행 되세요!'
      }
    ],
    phrases: [
      {
        id: 'd11_checkin.as_of_now',
        text: 'As of now, yes.',
        meaning_ko: '현재로서는 그래요.',
        note: 'Things might change later.',
        note_ko: '나중에 바뀔 수도 있다는 뜻을 담습니다.',
        category: 'travel'
      },
      {
        id: 'd11_checkin.boarding_group',
        text: "You're in boarding group three.",
        meaning_ko: '3번 그룹으로 탑승하세요.',
        note: 'US airlines board in numbered groups.',
        note_ko: '미국 항공사는 번호 그룹 순서로 탑승합니다.',
        category: 'travel'
      },
      {
        id: 'd11_checkin.carry_on',
        text: 'The backpack is my carry-on.',
        meaning_ko: '배낭은 기내 반입 가방이에요.',
        note: 'Carry-on = a bag you take on the plane. Most US airlines charge for checked bags.',
        note_ko: 'carry-on은 기내에 들고 타는 가방입니다. 미국 항공사는 대부분 위탁 수하물에 요금을 받습니다.',
        category: 'travel'
      },
      {
        id: 'd11_checkin.checking_bags',
        text: 'Are you checking any bags?',
        meaning_ko: '부칠 짐 있으세요?',
        note: 'Check a bag = give it to the airline to put under the plane.',
        note_ko: 'check a bag은 짐을 부친다는 뜻입니다.',
        category: 'travel'
      },
      {
        id: 'd11_checkin.on_time',
        text: 'Is the flight on time?',
        meaning_ko: '비행기가 제시간에 출발하나요?',
        note: 'On time = not delayed.',
        note_ko: 'on time은 지연되지 않았다는 뜻입니다.',
        category: 'travel'
      },
      {
        id: 'd11_checkin.photo_id',
        text: 'Can I see a photo ID?',
        meaning_ko: '사진 있는 신분증 보여 주시겠어요?',
        note: "In the US a driver's license or passport works for domestic flights.",
        note_ko: '미국 국내선에서는 운전면허증이나 여권을 씁니다.',
        category: 'travel'
      },
      {
        id: 'd11_checkin.where_flying',
        text: 'Where are you flying today?',
        meaning_ko: '오늘 어디로 가세요?',
        note: 'The first question at an airline counter.',
        note_ko: '항공사 카운터의 첫 질문입니다.',
        category: 'travel'
      }
    ]
  },
  {
    id: 'd11_security',
    title: 'Going through security',
    title_ko: '보안 검색대 통과',
    place: 'airport_security',
    npc: 'lee',
    day_from: 11,
    day_to: 11,
    time_from: '06:30',
    time_to: '10:30',
    requires: 'd11_checkin',
    summary: 'Get through the TSA checkpoint: boarding pass, bins, shoes, and a forgotten water bottle.',
    summary_ko: 'TSA 보안 검색대를 통과하세요. 탑승권, 바구니, 신발, 그리고 깜빡한 물병.',
    sort: 1120,
    tags: 'travel,airport,security,trip',
    calendar: { day: 11, time: '08:00', title: 'Security', title_ko: '보안 검색' },
    turns: [
      {
        speaker: 'lee',
        situation: 'You reach the TSA checkpoint. Officer Lee holds out his hand.',
        situation_ko: 'TSA 검색대에 도착합니다. 리 요원이 손을 내밉니다.',
        line: 'Boarding pass and ID, please.',
        line_ko: '탑승권이랑 신분증 주세요.',
        prompt: 'Hand over what he asked for.',
        prompt_ko: '그가 달라는 것을 건네세요.',
        model: 'Sure, here you go.',
        model_ko: '네, 여기 있어요.',
        distractors: [
          {
            text: 'Just the pass, right?',
            text_ko: '탑승권만 드리면 되죠?',
            reaction: 'And your ID, please.',
            reaction_ko: '신분증도 주세요.'
          },
          {
            text: "Didn't I just show it?",
            text_ko: '방금 보여 주지 않았어요?',
            reaction: 'That was the airline. This is TSA. ID, please.',
            reaction_ko: '그건 항공사고요. 여긴 TSA입니다. 신분증 주세요.'
          },
          {
            text: 'Shoes off, too?',
            text_ko: '신발도 벗어요?',
            reaction: 'One thing at a time. Pass and ID first.',
            reaction_ko: '하나씩 하죠. 탑승권이랑 신분증 먼저요.'
          }
        ],
        reply_speaker: 'lee',
        reply_line: 'Thanks. Laptops out in a separate bin. Empty your pockets, please.',
        reply_ko: '감사합니다. 노트북은 따로 바구니에 꺼내 주세요. 주머니도 비워 주세요.'
      },
      {
        speaker: 'lee',
        situation: 'You put your laptop in a bin. You are not sure about your shoes.',
        situation_ko: '노트북을 바구니에 넣습니다. 신발은 어떻게 해야 할지 모르겠습니다.',
        line: 'Laptops out, pockets empty. Next!',
        line_ko: '노트북 꺼내고, 주머니 비우세요. 다음!',
        prompt: "You're not sure what to do about your shoes. Ask.",
        prompt_ko: '신발을 어떻게 해야 할지 모르겠습니다. 물어보세요.',
        model: 'Do I need to take my shoes off too?',
        model_ko: '저 신발도 벗어야 하나요?',
        distractors: [
          {
            text: 'Do I need to take my laptop out too?',
            text_ko: '노트북도 꺼내야 해요?',
            reaction: 'I just said laptops out. You already did, right?',
            reaction_ko: '방금 노트북 꺼내라고 했죠. 이미 꺼냈잖아요?'
          },
          {
            text: 'Do I have to do all this every time?',
            text_ko: '매번 이걸 다 해야 해요?',
            reaction: 'Every time. Keep it moving, please.',
            reaction_ko: '매번요. 빨리 진행해 주세요.'
          },
          {
            text: "Can I leave my shoes on? I'm in a hurry.",
            text_ko: '신발 그냥 신어도 돼요? 급해서요.',
            reaction: 'Not in this line. Rules are the same for everyone.',
            reaction_ko: '이 줄에선 안 됩니다. 규칙은 모두 똑같아요.'
          }
        ],
        reply_speaker: 'lee',
        reply_line: "Yes, shoes off, unless you have TSA PreCheck. Then you'd use the other line.",
        reply_ko: '네, 신발 벗으세요. TSA 프리체크가 있으면 다른 줄로 가면 되고요.'
      },
      {
        speaker: 'lee',
        situation: 'The scanner beeps. You forgot a full water bottle in your bag.',
        situation_ko: '검색기가 삑 소리를 냅니다. 가방에 물이 가득 든 병을 깜빡했습니다.',
        line: "Is this your bag? There's a water bottle in here. It's over the limit.",
        line_ko: '이거 본인 가방이에요? 안에 물병이 있네요. 허용량 초과예요.',
        prompt: "It's yours, and you forgot about it. Own up and give it up.",
        prompt_ko: '당신 것이 맞고, 깜빡했습니다. 인정하고 포기하세요.',
        model: 'Oh, sorry, I totally forgot about it. You can throw it away.',
        model_ko: '아, 죄송해요, 완전히 깜빡했어요. 버리셔도 돼요.',
        distractors: [
          {
            text: "That's not my bag. Someone else must have put it there.",
            text_ko: '제 가방 아니에요. 누가 거기 둔 게 분명해요.',
            reaction: "It's got your laptop right next to it. Come on.",
            reaction_ko: '바로 옆에 당신 노트북이 있는데요. 이러지 마세요.'
          },
          {
            text: "Seriously? It's just water. Can't you let it go this once?",
            text_ko: '진짜요? 그냥 물인데요. 이번 한 번만 봐주면 안 돼요?',
            reaction: "Sorry, rules are rules. Liquids over the limit can't go.",
            reaction_ko: '죄송하지만 규칙은 규칙입니다. 한도 넘는 액체는 안 돼요.'
          },
          {
            text: 'Oh, sorry, I forgot. Can you put it in my checked suitcase?',
            text_ko: '아, 죄송해요, 깜빡했어요. 부친 가방에 넣어 주실 수 있어요?',
            reaction: "Your checked bag's long gone, I'm afraid.",
            reaction_ko: '부친 가방은 이미 한참 전에 갔어요.'
          }
        ],
        reply_speaker: 'lee',
        reply_line: "No problem. Next time, empty it before security and fill it up at the gate. You're all set.",
        reply_ko: '괜찮아요. 다음엔 검색 전에 비우고 게이트에서 채우세요. 다 됐습니다.'
      },
      {
        speaker: 'lee',
        situation: 'You put your shoes back on and grab your laptop.',
        situation_ko: '신발을 다시 신고 노트북을 챙깁니다.',
        line: "You're all set. Have a good flight.",
        line_ko: '다 됐습니다. 즐거운 비행 되세요.',
        prompt: "You're done here. Ask for directions to your gate.",
        prompt_ko: '검색이 끝났습니다. 게이트로 가는 길을 물어보세요.',
        model: 'Thanks. Which way is gate B12?',
        model_ko: '고마워요. B12 게이트는 어느 쪽이에요?',
        distractors: [
          {
            text: 'Thanks. Which way is gate B21?',
            text_ko: '고마워요. B21 게이트는 어느 쪽이에요?',
            reaction: "B21? Double-check your pass. I think it's another gate.",
            reaction_ko: 'B21요? 탑승권 다시 보세요. 다른 게이트 같은데요.'
          },
          {
            text: 'Thanks. Which way is baggage claim?',
            text_ko: '고마워요. 수하물 찾는 곳은 어느 쪽이에요?',
            reaction: "That's for arrivals. You're departing, right?",
            reaction_ko: '그건 도착하는 분들용이에요. 출발하시는 거죠?'
          },
          {
            text: "Where's my gate? You should know.",
            text_ko: '제 게이트 어디예요? 아실 거 아니에요.',
            reaction: "I don't know your flight. What does your pass say?",
            reaction_ko: '손님 항공편은 제가 모르죠. 탑승권에 뭐라고 돼 있어요?'
          }
        ],
        reply_speaker: 'lee',
        reply_line: 'Down the hall, on your left. About a five-minute walk.',
        reply_ko: '복도 따라 왼쪽이에요. 걸어서 5분쯤이요.'
      }
    ],
    phrases: [
      {
        id: 'd11_security.all_set',
        text: "You're all set.",
        meaning_ko: '다 됐어요.',
        note: 'Everything is done. You can go.',
        note_ko: '모든 게 끝났으니 가도 된다는 뜻입니다.',
        category: 'travel'
      },
      {
        id: 'd11_security.empty_pockets',
        text: 'Empty your pockets, please.',
        meaning_ko: '주머니를 비워 주세요.',
        note: 'Phones, keys and coins go in the bin.',
        note_ko: '휴대폰, 열쇠, 동전은 바구니에 넣습니다.',
        category: 'travel'
      },
      {
        id: 'd11_security.here_you_go',
        text: 'Here you go.',
        meaning_ko: '여기 있어요.',
        note: 'Say it when you hand something to someone.',
        note_ko: '무언가를 건넬 때 하는 말입니다.',
        category: 'travel'
      },
      {
        id: 'd11_security.laptops_out',
        text: 'Laptops out in a separate bin.',
        meaning_ko: '노트북은 따로 바구니에 꺼내 주세요.',
        note: 'Bin = the plastic tray at security.',
        note_ko: 'bin은 보안 검색대의 플라스틱 바구니입니다.',
        category: 'travel'
      },
      {
        id: 'd11_security.over_the_limit',
        text: "It's over the limit.",
        meaning_ko: '허용량을 넘었어요.',
        note: 'Liquids in carry-ons must be 3.4 ounces (100 ml) or less.',
        note_ko: '기내 반입 액체는 3.4온스(100ml) 이하여야 합니다.',
        category: 'travel'
      },
      {
        id: 'd11_security.precheck',
        text: 'TSA PreCheck',
        meaning_ko: 'TSA 사전 심사 프로그램',
        note: 'A US program for pre-screened travelers: shorter line, shoes stay on.',
        note_ko: '사전 심사를 받은 여행자용 미국 프로그램입니다. 줄이 짧고 신발을 벗지 않습니다.',
        category: 'travel'
      },
      {
        id: 'd11_security.which_way',
        text: 'Which way is gate B12?',
        meaning_ko: 'B12 게이트는 어느 쪽이에요?',
        note: 'A quick way to ask for directions.',
        note_ko: '길을 묻는 간단한 표현입니다.',
        category: 'travel'
      }
    ]
  },
  {
    id: 'd11_gate',
    title: 'A delay at the gate',
    title_ko: '게이트에서 지연 안내',
    place: 'airport_gate',
    npc: 'amy',
    day_from: 11,
    day_to: 11,
    time_from: '06:30',
    time_to: '11:00',
    requires: 'd11_security',
    summary: 'Your flight is delayed. Find out the new time, make sure you will make your meeting, and board.',
    summary_ko: '비행기가 지연됩니다. 새 출발 시각을 알아보고, 회의에 늦지 않을지 확인하고, 탑승하세요.',
    sort: 1130,
    tags: 'travel,airport,delay,trip',
    calendar: { day: 11, time: '09:30', title: 'Flight 482 to Ridgeport, gate B12', title_ko: '482편 리지포트행, B12 게이트' },
    turns: [
      {
        speaker: 'amy',
        situation: 'At gate B12, the screen changes to DELAYED. Amy is now working the gate desk.',
        situation_ko: 'B12 게이트 전광판이 지연(DELAYED)으로 바뀝니다. 에이미가 이제 게이트 데스크를 맡고 있습니다.',
        line: 'Attention, passengers on flight 482 to Ridgeport. We have a thirty-minute delay due to a late incoming aircraft.',
        line_ko: '리지포트행 482편 승객 여러분께 안내 말씀드립니다. 도착 항공기 지연으로 30분 지연되겠습니다.',
        prompt: "Go up to the desk and find out when you'll leave now.",
        prompt_ko: '데스크에 가서 이제 언제 출발하는지 알아보세요.',
        model: "Excuse me, what's the new departure time?",
        model_ko: '실례합니다, 새 출발 시각이 언제예요?',
        distractors: [
          {
            text: 'Excuse me, is the flight to Ridgeport canceled?',
            text_ko: '실례합니다, 리지포트행 비행기 결항이에요?',
            reaction: "No, just delayed thirty minutes. Nothing's canceled.",
            reaction_ko: '아뇨, 30분 지연일 뿐이에요. 결항은 없어요.'
          },
          {
            text: 'This is ridiculous. Why is it always late?',
            text_ko: '말도 안 돼요. 왜 맨날 늦어요?',
            reaction: "I'm sorry. The plane's coming in late from another city.",
            reaction_ko: '죄송해요. 다른 도시에서 오는 비행기가 늦게 들어와서요.'
          },
          {
            text: "Excuse me, so it's leaving an hour late now?",
            text_ko: '실례합니다, 그럼 이제 한 시간 늦게 떠요?',
            reaction: 'Just thirty minutes. Not too bad.',
            reaction_ko: '30분만요. 그렇게 나쁘진 않아요.'
          }
        ],
        reply_speaker: 'amy',
        reply_line: "We're now looking at ten o'clock, with boarding at nine-thirty.",
        reply_ko: '이제 10시 출발, 탑승은 9시 30분 예정이에요.'
      },
      {
        speaker: 'amy',
        situation: 'Your meeting at Summit Retail is at two.',
        situation_ko: '서밋 리테일과의 회의는 2시입니다.',
        line: 'Do you have a connecting flight?',
        line_ko: '연결편 있으세요?',
        prompt: "Answer her, and mention your 2 p.m. meeting. You're worried about being late.",
        prompt_ko: '대답하고, 오후 2시 회의를 언급하세요. 늦을까 걱정됩니다.',
        model: "No, it's nonstop. But I have a meeting at two. Will I still make it?",
        model_ko: '아뇨, 직항이에요. 그런데 2시에 회의가 있어요. 늦지 않을까요?',
        distractors: [
          {
            text: 'Yes, I have a connection in Ridgeport. Will I still make it?',
            text_ko: '네, 리지포트에서 갈아타요. 그래도 시간 맞을까요?',
            reaction: "Ridgeport's your final stop, though. It's a nonstop.",
            reaction_ko: '리지포트가 최종 목적지인데요. 직항편이에요.'
          },
          {
            text: "No, it's nonstop. My meeting's at four, so I'm not worried.",
            text_ko: '아뇨, 직항이에요. 회의가 4시라서 걱정 안 해요.',
            reaction: "Great, then you'll have plenty of time.",
            reaction_ko: '좋네요, 그럼 시간은 충분하겠어요.'
          },
          {
            text: "No, but I have a two o'clock meeting. You have to get me there on time.",
            text_ko: '아뇨, 그런데 2시에 회의가 있어요. 무조건 제시간에 데려다주셔야 해요.',
            reaction: "I'll do what I can, but I don't fly the plane.",
            reaction_ko: '최선을 다하겠지만, 제가 조종하는 건 아니라서요.'
          }
        ],
        reply_speaker: 'amy',
        reply_line: "You should land around twelve-fifteen, so you'll have plenty of time.",
        reply_ko: '12시 15분쯤 도착하니까 시간은 충분할 거예요.'
      },
      {
        speaker: 'amy',
        situation: 'The flight is full. Your laptop is in your backpack.',
        situation_ko: '비행기가 만석입니다. 노트북은 배낭에 있습니다.',
        line: "The flight is full today, so we're offering free gate checks for carry-on bags. Would you like to check yours?",
        line_ko: '오늘 만석이라 기내 가방은 게이트에서 무료로 부쳐 드리고 있어요. 부치시겠어요?',
        prompt: 'Turn down her offer, and say why.',
        prompt_ko: '그 제안을 거절하고 이유를 말하세요.',
        model: "No thanks. My laptop is in there, so I'd rather keep it with me.",
        model_ko: '괜찮아요. 노트북이 들어 있어서 들고 타는 게 좋겠어요.',
        distractors: [
          {
            text: 'Sure, take it. Saves me lugging it around the airport.',
            text_ko: '네, 가져가세요. 공항에서 들고 다니기 귀찮았는데 잘됐네요.',
            reaction: 'Okay. Just take out any laptops or batteries first.',
            reaction_ko: '네. 노트북이나 배터리는 먼저 꺼내 주세요.'
          },
          {
            text: "No, and honestly, you should've warned us earlier that the flight was full.",
            text_ko: '아뇨, 그리고 솔직히 만석이면 더 일찍 알려 줬어야죠.',
            reaction: "I'm sorry. It's just an option, no pressure.",
            reaction_ko: '죄송해요. 그냥 선택 사항이에요, 부담 갖지 마세요.'
          },
          {
            text: 'Is it really free? Then could you check my suitcase too?',
            text_ko: '정말 무료예요? 그럼 제 여행 가방도 부쳐 주실래요?',
            reaction: 'Your suitcase was already checked at the counter.',
            reaction_ko: '여행 가방은 카운터에서 이미 부치셨어요.'
          }
        ],
        reply_speaker: 'amy',
        reply_line: 'Totally understand. Thanks for your patience today.',
        reply_ko: '충분히 이해해요. 오늘 기다려 주셔서 감사해요.'
      },
      {
        speaker: 'amy',
        situation: 'Boarding begins at last.',
        situation_ko: '드디어 탑승이 시작됩니다.',
        line: "We're now boarding group three. Group three, welcome aboard.",
        line_ko: '지금 3번 그룹 탑승합니다. 3번 그룹, 어서 오세요.',
        prompt: 'Hand over your pass, and show you appreciate how she handled the delay.',
        prompt_ko: '탑승권을 건네고, 지연 동안 그녀가 잘 대처해 준 것에 고마움을 표하세요.',
        model: "Here's my boarding pass. Thanks for keeping us updated.",
        model_ko: '여기 탑승권이요. 계속 안내해 주셔서 고마워요.',
        distractors: [
          {
            text: "Here's my boarding pass. I'm in group one, by the way.",
            text_ko: '여기 탑승권이요. 참고로 저 1번 그룹이에요.',
            reaction: "It says group three here. But you're good to go.",
            reaction_ko: '여기 3번 그룹이라고 돼 있네요. 그래도 타시면 돼요.'
          },
          {
            text: "Here's my boarding pass. Next time, try to leave on time.",
            text_ko: '여기 탑승권이요. 다음엔 제시간에 좀 떠 주세요.',
            reaction: 'Noted. Enjoy your flight.',
            reaction_ko: '참고하죠. 즐거운 비행 되세요.'
          },
          {
            text: 'Here you go. Do I still have time to grab a coffee?',
            text_ko: '여기요. 커피 한 잔 사 올 시간 있어요?',
            reaction: "Not really, we're boarding now. Go on in!",
            reaction_ko: '아뇨, 지금 탑승 중이에요. 들어가세요!'
          }
        ],
        reply_speaker: 'amy',
        reply_line: 'My pleasure. Enjoy your flight!',
        reply_ko: '천만에요. 즐거운 비행 되세요!'
      }
    ],
    phrases: [
      {
        id: 'd11_gate.connecting',
        text: 'Do you have a connecting flight?',
        meaning_ko: '연결편 있으세요?',
        note: 'A connecting flight means you change planes on the way.',
        note_ko: '연결편은 가는 도중 비행기를 갈아탄다는 뜻입니다.',
        category: 'travel'
      },
      {
        id: 'd11_gate.due_to',
        text: 'We have a delay due to a late incoming aircraft.',
        meaning_ko: '앞 비행기가 늦게 도착해 지연됩니다.',
        note: 'Due to = because of. Very common in announcements.',
        note_ko: 'due to는 because of와 같습니다. 안내 방송에서 자주 씁니다.',
        category: 'travel'
      },
      {
        id: 'd11_gate.gate_check',
        text: "We're offering free gate checks.",
        meaning_ko: '게이트에서 무료로 짐을 부쳐 드려요.',
        note: 'On full flights, agents check carry-ons at the gate for free.',
        note_ko: '만석일 때 게이트에서 기내 가방을 무료로 부쳐 줍니다.',
        category: 'travel'
      },
      {
        id: 'd11_gate.id_rather',
        text: "I'd rather keep it with me.",
        meaning_ko: '제가 가지고 있는 게 나아요.',
        note: 'I would rather = I prefer to.',
        note_ko: 'I would rather는 차라리 …하겠다는 뜻입니다.',
        category: 'travel'
      },
      {
        id: 'd11_gate.make_it',
        text: 'Will I still make it?',
        meaning_ko: '그래도 제시간에 갈 수 있을까요?',
        note: 'Make it = arrive in time.',
        note_ko: 'make it은 제시간에 도착한다는 뜻입니다.',
        category: 'travel'
      },
      {
        id: 'd11_gate.new_departure',
        text: "What's the new departure time?",
        meaning_ko: '새 출발 시각이 언제예요?',
        note: 'Ask this whenever the screen says DELAYED.',
        note_ko: '전광판에 DELAYED가 뜨면 물어보세요.',
        category: 'travel'
      },
      {
        id: 'd11_gate.your_patience',
        text: 'Thanks for your patience.',
        meaning_ko: '기다려 주셔서 감사합니다.',
        note: 'Staff say this after delays or problems.',
        note_ko: '지연이나 문제 뒤에 직원들이 하는 말입니다.',
        category: 'travel'
      }
    ]
  },
  {
    id: 'd11_hotel_checkin',
    title: 'Checking in at the hotel',
    title_ko: '호텔 체크인',
    place: 'hotel_desk',
    npc: 'kelly',
    day_from: 11,
    day_to: 11,
    time_from: '09:00',
    time_to: '22:00',
    requires: 'd11_gate',
    summary: 'Check in at the Pinecrest Hotel in Ridgeport: early check-in, incidentals, breakfast and a late checkout.',
    summary_ko: '리지포트의 파인크레스트 호텔에 체크인합니다. 이른 체크인, 부대비용 보증금, 조식, 늦은 체크아웃.',
    sort: 1140,
    tags: 'travel,hotel,trip',
    calendar: { day: 11, time: '12:30', title: 'Hotel check-in: Pinecrest Hotel', title_ko: '호텔 체크인: 파인크레스트' },
    turns: [
      {
        speaker: 'kelly',
        situation: 'You arrive at the Pinecrest Hotel around lunchtime. Check-in is usually at three.',
        situation_ko: '점심때쯤 파인크레스트 호텔에 도착합니다. 체크인은 보통 3시입니다.',
        line: 'Welcome to the Pinecrest! Checking in?',
        line_ko: '파인크레스트에 오신 걸 환영해요! 체크인하세요?',
        prompt: "It's only lunchtime, hours before check-in. Confirm your booking and see if your room can be ready now.",
        prompt_ko: '아직 점심때라 체크인 시간 전입니다. 예약을 확인하고 지금 방에 들어갈 수 있는지 물어보세요.',
        model: 'Yes, I have a reservation under my name. Is early check-in possible?',
        model_ko: '네, 제 이름으로 예약했어요. 일찍 체크인할 수 있을까요?',
        distractors: [
          {
            text: 'Yes, I have a reservation for two nights. Can I check in now?',
            text_ko: '네, 2박 예약했어요. 지금 체크인할 수 있어요?',
            reaction: 'Hmm, I only see one night here. Is that right?',
            reaction_ko: '음, 여기엔 1박만 있는데요. 맞으세요?'
          },
          {
            text: "Yes, and I'd like to get into my room right now, please. It's been a long day.",
            text_ko: '네, 지금 바로 방에 들어가고 싶어요. 오늘 힘든 하루였거든요.',
            reaction: "I'll see what I can do, but check-in is normally at three.",
            reaction_ko: '알아볼게요, 근데 체크인은 보통 3시예요.'
          },
          {
            text: 'Yes, it should be under Summit Retail. Is early check-in possible?',
            text_ko: '네, 서밋 리테일 이름으로 돼 있을 거예요. 일찍 체크인할 수 있을까요?',
            reaction: 'Nothing under Summit Retail. Who made the booking?',
            reaction_ko: '서밋 리테일로는 없는데요. 누가 예약하셨어요?'
          }
        ],
        reply_speaker: 'kelly',
        reply_line: "Let me see… You're in luck. A room just opened up. One night, checking out Friday?",
        reply_ko: '잠시만요… 운이 좋으시네요. 방이 막 비었어요. 1박, 금요일 체크아웃 맞으시죠?'
      },
      {
        speaker: 'kelly',
        situation: 'The room is on the company card, but Kelly asks for another card.',
        situation_ko: '객실은 법인 카드로 결제됐는데, 켈리가 카드를 하나 더 달라고 합니다.',
        line: "That's right. I'll just need a card for incidentals.",
        line_ko: '맞아요. 부대비용용 카드만 하나 주시면 돼요.',
        prompt: "You're not sure why they need another card. Ask what it's for.",
        prompt_ko: '왜 카드가 하나 더 필요한지 모르겠습니다. 무엇을 위한 건지 물어보세요.',
        model: 'Sure. What exactly is the incidentals hold for?',
        model_ko: '네. 부대비용 보증금은 정확히 뭘 위한 거예요?',
        distractors: [
          {
            text: "The room's already paid. Why charge me twice?",
            text_ko: '방값은 이미 냈는데요. 왜 두 번 결제해요?',
            reaction: "It's not a charge, just a hold. Let me explain.",
            reaction_ko: '결제가 아니라 보증금이에요. 설명해 드릴게요.'
          },
          {
            text: 'Sure. Is that for my early check-in fee?',
            text_ko: '네. 그거 얼리 체크인 요금이에요?',
            reaction: "No, early check-in's free today. It's for extras.",
            reaction_ko: '아뇨, 오늘 얼리 체크인은 무료예요. 추가 비용용이에요.'
          },
          {
            text: "Do I have to? I don't plan on spending anything.",
            text_ko: '꼭 해야 해요? 아무것도 안 쓸 건데요.',
            reaction: "Sorry, it's required for every guest.",
            reaction_ko: '죄송해요, 모든 손님께 받고 있어요.'
          }
        ],
        reply_speaker: 'kelly',
        reply_line: "It's fifty dollars a night for extras like room service or the minibar. It's released when you check out.",
        reply_ko: '룸서비스나 미니바 같은 추가 비용용으로 1박에 50달러예요. 체크아웃하면 풀려요.'
      },
      {
        speaker: 'kelly',
        situation: 'Kelly hands you two key cards for room 612.',
        situation_ko: '켈리가 612호 키 카드 두 장을 건넵니다.',
        line: "Here are your key cards. You're in room 612.",
        line_ko: '키 카드 여기 있어요. 612호예요.',
        prompt: 'Find out when you can eat in the morning.',
        prompt_ko: '아침에 언제 먹을 수 있는지 물어보세요.',
        model: 'Thanks. What time is breakfast served?',
        model_ko: '고마워요. 아침 식사는 몇 시에 나와요?',
        distractors: [
          {
            text: 'Thanks. How much is breakfast, by the way?',
            text_ko: '고마워요. 그런데 아침 식사는 얼마예요?',
            reaction: "It's included with your rate. No charge.",
            reaction_ko: '요금에 포함돼 있어요. 무료예요.'
          },
          {
            text: "Thanks. So I'm in 216, on the second floor?",
            text_ko: '고마워요. 그럼 2층 216호죠?',
            reaction: 'Six-twelve, sixth floor. Elevators are on the right.',
            reaction_ko: '612호, 6층이에요. 엘리베이터는 오른쪽에 있어요.'
          },
          {
            text: 'Thanks. What time does the gym open?',
            text_ko: '고마워요. 헬스장은 몇 시에 열어요?',
            reaction: 'Five a.m. Was there anything else you wanted to know?',
            reaction_ko: '새벽 5시요. 다른 거 궁금한 거 있으세요?'
          }
        ],
        reply_speaker: 'kelly',
        reply_line: 'Six-thirty to ten, in the restaurant off the lobby.',
        reply_ko: '6시 30분부터 10시까지, 로비 옆 레스토랑에서요.'
      },
      {
        speaker: 'kelly',
        situation: 'Your flight home on Friday is in the afternoon.',
        situation_ko: '금요일 귀국편은 오후입니다.',
        line: 'Anything else I can help you with?',
        line_ko: '더 도와드릴 거 있으세요?',
        prompt: "Your flight home isn't until the afternoon. Ask to keep the room a bit longer.",
        prompt_ko: '귀국편이 오후입니다. 방을 좀 더 오래 쓸 수 있는지 물어보세요.',
        model: 'Could I get a late checkout on Friday?',
        model_ko: '금요일에 늦게 체크아웃할 수 있을까요?',
        distractors: [
          {
            text: 'Could I get a late checkout on Saturday?',
            text_ko: '토요일에 늦게 체크아웃할 수 있을까요?',
            reaction: "Saturday? You're checking out Friday, right?",
            reaction_ko: '토요일요? 금요일 체크아웃이시잖아요?'
          },
          {
            text: 'Could I stay until five on Friday for free?',
            text_ko: '금요일 5시까지 무료로 있어도 될까요?',
            reaction: "Five's a bit much. Let me see what I can do.",
            reaction_ko: '5시는 좀 무리예요. 알아볼게요.'
          },
          {
            text: 'Could I get an early checkout on Friday?',
            text_ko: '금요일에 일찍 체크아웃할 수 있을까요?',
            reaction: 'Early? Sure, just drop the keys whenever you leave.',
            reaction_ko: '일찍요? 그럼요, 나가실 때 키만 두고 가세요.'
          }
        ],
        reply_speaker: 'kelly',
        reply_line: 'I can do one p.m. at no charge. Enjoy your stay!',
        reply_ko: '오후 1시까지 무료로 해 드릴게요. 즐거운 시간 보내세요!'
      }
    ],
    phrases: [
      {
        id: 'd11_hotel_checkin.breakfast_served',
        text: 'What time is breakfast served?',
        meaning_ko: '아침은 몇 시에 나와요?',
        note: 'Served = offered to guests.',
        note_ko: 'served는 손님에게 제공된다는 뜻입니다.',
        category: 'hotel'
      },
      {
        id: 'd11_hotel_checkin.early_checkin',
        text: 'Is early check-in possible?',
        meaning_ko: '일찍 체크인할 수 있나요?',
        note: 'US hotels usually check in at 3 p.m. and check out at 11 a.m. or noon.',
        note_ko: '미국 호텔은 보통 오후 3시 체크인, 오전 11시나 정오 체크아웃입니다.',
        category: 'hotel'
      },
      {
        id: 'd11_hotel_checkin.enjoy_stay',
        text: 'Enjoy your stay!',
        meaning_ko: '즐거운 시간 보내세요!',
        note: 'The usual goodbye at a hotel front desk.',
        note_ko: '호텔 프런트의 흔한 인사입니다.',
        category: 'hotel'
      },
      {
        id: 'd11_hotel_checkin.in_luck',
        text: "You're in luck.",
        meaning_ko: '운이 좋으시네요.',
        note: 'Good news: what you want is available.',
        note_ko: '원하는 것이 된다는 좋은 소식입니다.',
        category: 'hotel'
      },
      {
        id: 'd11_hotel_checkin.incidentals',
        text: 'a hold for incidentals',
        meaning_ko: '부대비용 보증금',
        note: 'The hotel blocks some money on your card for extras. It is released after checkout.',
        note_ko: '추가 비용에 대비해 카드에 금액을 잡아 두고 체크아웃 후 풀어 줍니다.',
        category: 'hotel'
      },
      {
        id: 'd11_hotel_checkin.key_cards',
        text: 'Here are your key cards.',
        meaning_ko: '여기 키 카드예요.',
        note: 'Most hotels give two cards per room.',
        note_ko: '대부분 방마다 카드 두 장을 줍니다.',
        category: 'hotel'
      },
      {
        id: 'd11_hotel_checkin.late_checkout',
        text: 'Could I get a late checkout?',
        meaning_ko: '늦게 체크아웃할 수 있을까요?',
        note: 'Often free if you ask nicely, especially midweek.',
        note_ko: '정중히 부탁하면, 특히 주중에는 무료인 경우가 많습니다.',
        category: 'hotel'
      },
      {
        id: 'd11_hotel_checkin.under_my_name',
        text: 'I have a reservation under my name.',
        meaning_ko: '제 이름으로 예약했어요.',
        note: 'Under = booked in the name of.',
        note_ko: 'under는 … 이름으로 예약되었다는 뜻입니다.',
        category: 'hotel'
      }
    ]
  },
  {
    id: 'd11_client_visit',
    title: 'On-site at Summit Retail',
    title_ko: '서밋 리테일 방문',
    place: 'client_meeting',
    npc: 'greg',
    day_from: 11,
    day_to: 11,
    time_from: '11:00',
    time_to: '18:30',
    requires: 'd11_hotel_checkin',
    summary: 'Meet Greg in person and go through the contract draft. Push back on one clause and ask about code ownership.',
    summary_ko: '그렉을 직접 만나 계약서 초안을 검토합니다. 한 조항에 이의를 제기하고 코드 소유권을 물어보세요.',
    sort: 1150,
    tags: 'client,contract,negotiation,trip',
    calendar: { day: 11, time: '14:00', title: 'On-site at Summit Retail', title_ko: '서밋 리테일 방문' },
    turns: [
      {
        speaker: 'greg',
        situation: "You sign in as a visitor in Summit Retail's lobby and get a guest badge. Greg meets you in the conference room.",
        situation_ko: '서밋 리테일 로비에서 방문자로 등록하고 방문증을 받습니다. 그렉이 회의실에서 맞이합니다.',
        line: 'Hey, you made it! Welcome to Ridgeport. How was the flight?',
        line_ko: '어, 왔네요! 리지포트에 온 걸 환영해요. 비행은 어땠어요?',
        prompt: 'Tell him how the trip went. There was one small hiccup.',
        prompt_ko: '오는 길이 어땠는지 말하세요. 작은 문제가 하나 있었어요.',
        model: 'Not bad, thanks! Just a short delay, but I made it.',
        model_ko: '나쁘지 않았어요, 고마워요! 조금 지연됐지만 잘 도착했어요.',
        distractors: [
          {
            text: 'Awful. Your local airline made us wait forever.',
            text_ko: '최악이었어요. 여기 항공사 때문에 한참 기다렸어요.',
            reaction: 'Oof, sorry to hear that. Not the best start.',
            reaction_ko: '어휴, 안됐네요. 시작이 좋진 않았네요.'
          },
          {
            text: 'Smooth, thanks! Right on time, not a single delay.',
            text_ko: '순조로웠어요, 고마워요! 딱 제시간에, 지연 하나 없이요.',
            reaction: "Nice! Crestline on time? That's a first.",
            reaction_ko: '좋네요! 크레스트라인이 제시간에요? 처음 듣네요.'
          },
          {
            text: 'Fine, thanks. Should we start with the pricing?',
            text_ko: '괜찮았어요, 고마워요. 그럼 가격 얘기부터 할까요?',
            reaction: 'Whoa, straight to business! Sit down first, relax.',
            reaction_ko: '워, 바로 본론이네요! 일단 앉아서 좀 쉬어요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Glad to hear it. Can I get you anything before we dive in? Coffee, water?',
        reply_ko: '다행이네요. 본론 들어가기 전에 뭐 드릴까요? 커피, 물?'
      },
      {
        speaker: 'greg',
        situation: 'There is a pot of coffee and some bottled water on the table.',
        situation_ko: '테이블에 커피 한 주전자와 생수가 있습니다.',
        line: 'Coffee, water?',
        line_ko: '커피, 물?',
        prompt: 'Accept something to drink.',
        prompt_ko: '마실 것을 받으세요.',
        model: 'Water would be great, thanks.',
        model_ko: '물 주시면 좋겠어요, 고마워요.',
        distractors: [
          {
            text: "No. Let's just get this over with.",
            text_ko: '아뇨. 그냥 빨리 끝내죠.',
            reaction: "Uh, sure. Let's get to it, then.",
            reaction_ko: '어, 그러죠. 그럼 시작합시다.'
          },
          {
            text: 'Could I get an iced latte instead?',
            text_ko: '대신 아이스 라테 주실 수 있어요?',
            reaction: "Ha, we're not a café. Coffee or water?",
            reaction_ko: '하, 여기 카페가 아니라서요. 커피, 물 중에서요?'
          },
          {
            text: "I'm good. I had three on the plane.",
            text_ko: '괜찮아요. 비행기에서 세 잔 마셨어요.',
            reaction: 'Ha, okay. Let me know if you change your mind.',
            reaction_ko: '하, 알겠어요. 생각 바뀌면 말해요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "Coming right up. Okay, let's look at the contract draft.",
        reply_ko: '바로 드릴게요. 자, 계약서 초안을 봅시다.'
      },
      {
        speaker: 'greg',
        situation: "The draft says Summit can cancel with only seven days' notice. That is too short for your team.",
        situation_ko: '초안에는 서밋이 7일 전 통보만으로 해지할 수 있다고 되어 있습니다. 팀에게는 너무 짧습니다.',
        line: 'Our legal team sent back a few redlines. Anything jump out at you?',
        line_ko: '법무팀이 수정 표시를 몇 개 보냈어요. 눈에 띄는 거 있어요?',
        prompt: 'One clause gives your team too little warning if Summit cancels. Raise it and suggest 30 days.',
        prompt_ko: '서밋이 해지할 때 통보 기간이 너무 짧은 조항이 있습니다. 지적하고 30일을 제안하세요.',
        model: 'The seven-day cancellation notice is too short for us. Could we make it thirty days?',
        model_ko: '7일 전 해지 통보는 저희한테 너무 짧아요. 30일로 할 수 있을까요?',
        distractors: [
          {
            text: 'The seven-day cancellation notice is too short. Could we make it ninety days?',
            text_ko: '7일 전 해지 통보는 너무 짧아요. 90일로 할 수 있을까요?',
            reaction: "Ninety? That's a lot. Let's be reasonable.",
            reaction_ko: '90일요? 너무 길어요. 합리적으로 갑시다.'
          },
          {
            text: "Everything looks fine. We can live with seven days' notice, no problem.",
            text_ko: '다 괜찮아 보여요. 7일 전 통보도 저희는 문제없어요.',
            reaction: "Great, that makes it easy. So we're good?",
            reaction_ko: '좋아요, 그럼 쉽네요. 다 된 거죠?'
          },
          {
            text: "Your lawyers made the cancellation terms way too one-sided. That's not okay.",
            text_ko: '그쪽 변호사들이 해지 조건을 너무 일방적으로 만들었네요. 이건 아니죠.',
            reaction: "Easy. They're just being careful. What's the specific issue?",
            reaction_ko: '진정해요. 신중해서 그런 거예요. 구체적으로 뭐가 문제예요?'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "That's fair. We can do thirty. Anything else on your side?",
        reply_ko: '타당하네요. 30일로 하죠. 그쪽에서 다른 건요?'
      },
      {
        speaker: 'greg',
        situation: 'You want to know who owns the code after the project ends.',
        situation_ko: '프로젝트가 끝난 뒤 코드가 누구 소유인지 알고 싶습니다.',
        line: 'Anything else on your side?',
        line_ko: '그쪽에서 다른 건요?',
        prompt: 'You want to know what happens to the code once the project is over.',
        prompt_ko: '프로젝트가 끝나면 코드가 어떻게 되는지 알고 싶습니다.',
        model: 'Just one question: who owns the source code at the end of the project?',
        model_ko: '질문 하나만요. 프로젝트가 끝나면 소스 코드는 누구 소유예요?',
        distractors: [
          {
            text: "Just one question: who's paying for my hotel and flight here?",
            text_ko: '질문 하나만요. 여기 호텔이랑 항공권은 누가 내요?',
            reaction: 'Uh, I assumed your company handles that?',
            reaction_ko: '어, 그쪽 회사에서 처리하는 줄 알았는데요?'
          },
          {
            text: "Just one thing: we'll keep the source code after the project, of course.",
            text_ko: '하나만요. 프로젝트 끝나면 소스 코드는 당연히 저희가 갖는 거죠.',
            reaction: "Whoa, that's not how I understood it. Let's check the contract.",
            reaction_ko: '워, 제가 이해한 거랑 다른데요. 계약서 봅시다.'
          },
          {
            text: 'Just one question: who owns the store data after the project?',
            text_ko: '질문 하나만요. 프로젝트가 끝나면 매장 데이터는 누구 소유예요?',
            reaction: "The data's always ours. Anything else on your list?",
            reaction_ko: '데이터는 당연히 우리 거죠. 다른 질문 있어요?'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "Summit does, once the final invoice is paid. It's in section nine.",
        reply_ko: '최종 송장이 지급되면 서밋 소유예요. 9조에 있어요.'
      },
      {
        speaker: 'greg',
        situation: 'The meeting went well. Greg closes his laptop.',
        situation_ko: '회의가 잘 끝났습니다. 그렉이 노트북을 닫습니다.',
        line: "I think we're close. I'll send the final version to legal tonight. Dinner at your hotel at seven?",
        line_ko: '거의 다 된 것 같네요. 오늘 밤에 최종본을 법무팀에 보낼게요. 7시에 당신 호텔에서 저녁 어때요?',
        prompt: 'Greg invites you to dinner. Accept.',
        prompt_ko: '그렉이 저녁에 초대합니다. 받아들이세요.',
        model: 'Sounds great. See you at seven.',
        model_ko: '좋아요. 7시에 봬요.',
        distractors: [
          {
            text: 'Sounds great. See you at eight.',
            text_ko: '좋아요. 8시에 봬요.',
            reaction: 'Eight? I said seven, but I can push it.',
            reaction_ko: '8시요? 7시라고 했는데, 미룰 수는 있어요.'
          },
          {
            text: 'Sure. Is it on you or on us?',
            text_ko: '좋아요. 누가 내는 거예요?',
            reaction: "Ha, it's on me. Don't worry about it.",
            reaction_ko: '하, 제가 살게요. 걱정 마요.'
          },
          {
            text: 'Sure. Which hotel are you staying at?',
            text_ko: '좋아요. 어느 호텔에 묵으세요?',
            reaction: 'Your hotel. The Pinecrest, remember?',
            reaction_ko: '당신 호텔요. 파인크레스트 말이에요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Great. I made a reservation at their restaurant. See you there.',
        reply_ko: '좋아요. 호텔 레스토랑에 예약해 뒀어요. 거기서 봐요.'
      }
    ],
    phrases: [
      {
        id: 'd11_client_visit.days_notice',
        text: "thirty days' notice",
        meaning_ko: '30일 전 통보',
        note: 'Notice = a warning given in advance, usually before ending a contract.',
        note_ko: 'notice는 계약 해지 등을 미리 알리는 것입니다.',
        category: 'contract'
      },
      {
        id: 'd11_client_visit.dive_in',
        text: 'before we dive in',
        meaning_ko: '본론에 들어가기 전에',
        note: 'Dive in = start the main work with energy.',
        note_ko: 'dive in은 본격적으로 시작한다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'd11_client_visit.jump_out',
        text: 'Does anything jump out at you?',
        meaning_ko: '눈에 띄는 게 있나요?',
        note: 'Jump out = be easy to notice.',
        note_ko: 'jump out은 눈에 확 띈다는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'd11_client_visit.on_your_side',
        text: 'Anything else on your side?',
        meaning_ko: '그쪽에서 다른 건요?',
        note: 'On your side = from your team or company.',
        note_ko: 'on your side는 당신 쪽 팀이나 회사에서라는 뜻입니다.',
        category: 'meeting'
      },
      {
        id: 'd11_client_visit.redlines',
        text: 'Legal sent back a few redlines.',
        meaning_ko: '법무팀이 수정 사항을 몇 개 보냈어요.',
        note: 'Redlines = changes marked on a contract draft.',
        note_ko: 'redlines는 계약서 초안에 표시한 수정 사항입니다.',
        category: 'contract'
      },
      {
        id: 'd11_client_visit.were_close',
        text: "I think we're close.",
        meaning_ko: '거의 합의에 다 온 것 같아요.',
        note: 'Close = almost at an agreement.',
        note_ko: 'close는 합의에 거의 다다랐다는 뜻입니다.',
        category: 'negotiation'
      },
      {
        id: 'd11_client_visit.who_owns',
        text: 'Who owns the source code?',
        meaning_ko: '소스 코드는 누구 소유인가요?',
        note: 'Always check intellectual property (IP) in a software contract.',
        note_ko: '소프트웨어 계약에서는 지식재산권(IP)을 꼭 확인하세요.',
        category: 'contract'
      },
      {
        id: 'd11_client_visit.you_made_it',
        text: 'You made it!',
        meaning_ko: '잘 오셨어요!',
        note: 'A warm welcome to someone who traveled to see you.',
        note_ko: '먼 길 온 사람을 반기는 말입니다.',
        category: 'small-talk'
      }
    ]
  },
  {
    id: 'd11_dinner',
    title: 'Dinner with the client',
    title_ko: '고객과 저녁 식사',
    place: 'hotel_restaurant',
    npc: 'greg',
    day_from: 11,
    day_to: 11,
    time_from: '17:30',
    time_to: '22:30',
    requires: 'd11_client_visit',
    summary: 'Have dinner with Greg at the hotel restaurant: dietary needs, ordering, small talk, and picking up the check.',
    summary_ko: '호텔 레스토랑에서 그렉과 저녁을 먹습니다. 식이 제한, 주문, 가벼운 대화, 그리고 계산.',
    energy: 30,
    sort: 1160,
    tags: 'client,restaurant,small-talk,trip',
    calendar: { day: 11, time: '19:00', title: 'Dinner with Greg', title_ko: '그렉과 저녁 식사' },
    turns: [
      {
        speaker: 'greg',
        situation: 'You meet Greg at the hotel restaurant. The host seats you and hands you menus.',
        situation_ko: '호텔 레스토랑에서 그렉을 만납니다. 직원이 자리로 안내하고 메뉴를 건넵니다.',
        line: 'Before the server comes by, do you have any dietary restrictions? I want to make sure this place works for you.',
        line_ko: '서버 오기 전에요, 혹시 못 드시는 음식 있어요? 여기가 괜찮은 곳인지 확인하고 싶어서요.',
        prompt: 'Answer his question. You have a peanut allergy, and nothing else is off-limits.',
        prompt_ko: '그의 질문에 답하세요. 땅콩 알레르기가 있고, 그 밖에 못 먹는 건 없습니다.',
        model: "Thanks for asking. I'm allergic to peanuts, but other than that I eat everything.",
        model_ko: '물어봐 주셔서 감사해요. 땅콩 알레르기가 있는데, 그거 말고는 다 잘 먹어요.',
        distractors: [
          {
            text: "That's kind of you. I can't eat shellfish, but anything else is fine with me.",
            text_ko: '신경 써 주셔서 고마워요. 조개나 새우 같은 건 못 먹는데, 나머지는 다 괜찮아요.',
            reaction: "Shellfish, got it. I'll steer clear of the crab cakes, then.",
            reaction_ko: '갑각류, 알겠어요. 그럼 크랩 케이크는 피할게요.'
          },
          {
            text: "Honestly, this place isn't really my style. Could we try somewhere else instead?",
            text_ko: '솔직히 여긴 제 취향이 아니라서요. 다른 데로 가 보면 안 될까요?',
            reaction: 'Oh. Well, I already booked the table, but… I guess we could look around.',
            reaction_ko: '아. 음, 이미 예약은 해 뒀는데… 다른 데를 알아볼 수는 있겠죠.'
          },
          {
            text: 'Thanks for asking. This place looks great. Have you been here with your team before?',
            text_ko: '물어봐 주셔서 감사해요. 여기 분위기 좋네요. 팀분들이랑 와 보신 적 있어요?',
            reaction: "A couple of times, sure. But I asked about food. Anything you can't eat?",
            reaction_ko: '몇 번 왔죠. 그런데 음식을 물어본 거예요. 못 드시는 거 있어요?'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "Good to know. I'll mention it to the server.",
        reply_ko: '알아 둘게요. 서버에게 말해 둘게요.'
      },
      {
        speaker: 'greg',
        situation: 'The server comes to take your order. Greg gestures for you to go first.',
        situation_ko: '서버가 주문을 받으러 옵니다. 그렉이 먼저 하라고 손짓합니다.',
        line: 'Go ahead, you first.',
        line_ko: '먼저 시키세요.',
        prompt: "You've decided on the salmon, with a salad on the side. Order first, as Greg suggests.",
        prompt_ko: '연어 요리에 샐러드를 곁들이기로 했습니다. 그렉 말대로 먼저 주문하세요.',
        model: "I'll have the grilled salmon with a side salad, please.",
        model_ko: '저는 연어 구이에 사이드 샐러드로 주세요.',
        distractors: [
          {
            text: "I'll try the Thai peanut noodles with a side salad, please.",
            text_ko: '저는 태국식 땅콩 국수에 사이드 샐러드로 주세요.',
            reaction: "Peanut noodles? Didn't you just say you're allergic to peanuts?",
            reaction_ko: '땅콩 국수요? 방금 땅콩 알레르기 있다고 하지 않았어요?'
          },
          {
            text: "Oh, you're the host. Why don't you just order for both of us?",
            text_ko: '아, 오늘 초대하신 분이니까 그냥 둘 다 시켜 주실래요?',
            reaction: 'No, no, go ahead. I want you to get what you like.',
            reaction_ko: '아니에요, 어서 시켜요. 드시고 싶은 걸로 드셔야죠.'
          },
          {
            text: "Salmon. Salad on the side. And make it quick, we're busy.",
            text_ko: '연어요. 샐러드 따로. 그리고 빨리 좀 주세요, 바빠서요.',
            reaction: "Whoa, easy. We're in no hurry tonight.",
            reaction_ko: '워, 천천히 해요. 오늘 밤은 급할 거 없잖아요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "I'll do the steak, medium rare. And let's get the calamari to share.",
        reply_ko: '저는 스테이크, 미디엄 레어로요. 그리고 오징어 튀김 하나 나눠 먹죠.'
      },
      {
        speaker: 'greg',
        situation: 'Over dinner, the talk moves away from work.',
        situation_ko: '식사하며 대화가 일 얘기에서 벗어납니다.',
        line: 'So, enough about contracts. What do you like to do on the weekends?',
        line_ko: '자, 계약 얘기는 그만하고요. 주말엔 뭐 하는 걸 좋아해요?',
        prompt: 'Open up a little about your weekends. You enjoy the outdoors and exploring places to eat.',
        prompt_ko: '주말 이야기를 조금 들려주세요. 야외 활동과 맛집 탐방을 좋아합니다.',
        model: 'I like hiking, and I love trying new restaurants around town.',
        model_ko: '하이킹을 좋아하고, 동네 새 식당 가 보는 것도 정말 좋아해요.',
        distractors: [
          {
            text: "Honestly, I mostly catch up on work. The dashboard won't build itself.",
            text_ko: '솔직히 주로 밀린 일 해요. 대시보드가 저절로 만들어지진 않으니까요.',
            reaction: "Ha, you sound like my team. Come on, there's more to life than work.",
            reaction_ko: '하, 우리 팀 애들 같네요. 에이, 인생에 일만 있는 건 아니잖아요.'
          },
          {
            text: "Not much, really. I'd rather keep my weekends to myself, if that's okay.",
            text_ko: '별거 없어요. 주말 얘기는 그냥 안 하고 싶은데, 괜찮죠?',
            reaction: "Oh. Sure, of course. Sorry, didn't mean to pry.",
            reaction_ko: '아. 그럼요, 물론이죠. 미안해요, 캐물으려던 건 아니었어요.'
          },
          {
            text: "I'm into video games, and I usually just stay home and order in.",
            text_ko: '게임을 좋아해서 보통은 집에서 배달시켜 먹으며 지내요.',
            reaction: 'Ha, a homebody. Nothing wrong with that.',
            reaction_ko: '하, 집돌이시구나. 그것도 나쁘지 않죠.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Oh, then you have to try the lake trail here. Great views.',
        reply_ko: '오, 그럼 여기 호수 산책로에 꼭 가 봐요. 경치가 끝내줘요.'
      },
      {
        speaker: 'greg',
        situation: 'The check arrives and Greg reaches for it. Maya said client dinners go on the company card.',
        situation_ko: '계산서가 오자 그렉이 손을 뻗습니다. 마야는 고객 식사는 법인 카드로 하라고 했습니다.',
        line: 'Here, let me get this.',
        line_ko: '자, 이건 제가 낼게요.',
        prompt: "Don't let Greg pay. Be gracious about it.",
        prompt_ko: '그렉이 계산하게 두지 마세요. 정중하게요.',
        model: "Oh no, I'll get this one. It's on us.",
        model_ko: '아니에요, 이번엔 제가 낼게요. 저희가 대접하는 거예요.',
        distractors: [
          {
            text: "Oh, thank you! That's really kind of you.",
            text_ko: '아, 감사합니다! 정말 친절하시네요. 잘 먹었어요.',
            reaction: 'Happy to. Though usually the vendor fights me for it.',
            reaction_ko: '기꺼이요. 보통은 업체 쪽에서 서로 내겠다고 하던데.'
          },
          {
            text: 'How about we split it? Half and half?',
            text_ko: '그냥 반반 나눠서 낼까요? 각자 반씩 내는 걸로요.',
            reaction: 'Split it? Come on, one of us should just take it.',
            reaction_ko: '반반이요? 에이, 그냥 한 사람이 내죠.'
          },
          {
            text: 'Put that away. Maya would kill me.',
            text_ko: '넣어 두세요. 그랬다간 마야한테 저 죽어요.',
            reaction: "Ha! Okay, okay. I wouldn't want to get you in trouble.",
            reaction_ko: '하! 알았어요, 알았어. 곤란하게 만들면 안 되죠.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "Well, thank you. I'll get the next one when you're in town again.",
        reply_ko: '그럼 고마워요. 다음에 또 오면 제가 살게요.'
      },
      {
        speaker: 'greg',
        situation: 'The bill is $164 before tip. In the US, about 20 percent is normal for good service.',
        situation_ko: '팁 전 금액이 164달러입니다. 미국에서는 서비스가 좋으면 20% 정도가 보통입니다.',
        line: "Service was great tonight, wasn't it?",
        line_ko: '오늘 서비스 정말 좋았죠?',
        prompt: "Agree about the service, and say how much you'll tip.",
        prompt_ko: '서비스에 동의하고, 팁을 얼마나 줄지 말하세요.',
        model: "It was. I'll leave a twenty percent tip, so about thirty-three dollars.",
        model_ko: '그러게요. 팁은 20% 남길게요. 그럼 33달러쯤이네요.',
        distractors: [
          {
            text: "Definitely. I'll leave a twenty percent tip, so around sixteen dollars.",
            text_ko: '정말요. 팁은 20% 줄게요. 그러니까 16달러쯤이요.',
            reaction: 'Sixteen? I think twenty percent of one sixty-four is a bit more than that.',
            reaction_ko: '16달러요? 164달러의 20%면 그거보다 좀 더 될 텐데요.'
          },
          {
            text: "It was okay. I'll just leave five bucks. They get paid anyway, right?",
            text_ko: '그냥 그랬어요. 5달러만 둘게요. 어차피 월급 받잖아요?',
            reaction: 'Uh, not really. Servers here mostly live on tips, you know.',
            reaction_ko: '어, 그렇진 않아요. 여기 서버들은 거의 팁으로 먹고살아요.'
          },
          {
            text: "It was. Do people usually tip here? I'm not sure how it works.",
            text_ko: '맞아요. 여기선 보통 팁을 주나요? 잘 몰라서요.',
            reaction: 'Sure do. Twenty percent is pretty standard for good service.',
            reaction_ko: '그럼요. 서비스 좋으면 20%가 보통이에요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Very generous. Get some rest. Big day tomorrow!',
        reply_ko: '후하네요. 푹 쉬어요. 내일 중요한 날이잖아요!'
      }
    ],
    phrases: [
      {
        id: 'd11_dinner.allergic',
        text: "I'm allergic to peanuts.",
        meaning_ko: '땅콩 알레르기가 있어요.',
        note: 'Other than that = except for that.',
        note_ko: 'other than that은 그것 말고는이라는 뜻입니다.',
        category: 'restaurant'
      },
      {
        id: 'd11_dinner.big_day',
        text: 'Big day tomorrow!',
        meaning_ko: '내일 중요한 날이잖아요!',
        note: 'Said the night before something important.',
        note_ko: '중요한 일 전날 밤에 하는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'd11_dinner.dietary',
        text: 'Do you have any dietary restrictions?',
        meaning_ko: '가리는 음식 있어요?',
        note: 'A thoughtful question before a business meal.',
        note_ko: '비즈니스 식사 전에 배려하는 질문입니다.',
        category: 'restaurant'
      },
      {
        id: 'd11_dinner.get_this_one',
        text: "I'll get this one.",
        meaning_ko: '이번엔 제가 낼게요.',
        note: "Offer to pay. When a company pays, add: It's on us.",
        note_ko: "계산하겠다는 말입니다. 회사가 낼 때는 It's on us를 덧붙입니다.",
        category: 'restaurant'
      },
      {
        id: 'd11_dinner.ill_have',
        text: "I'll have the grilled salmon.",
        meaning_ko: '연어 구이로 할게요.',
        note: "The most natural way to order. Also: I'll do the steak.",
        note_ko: "가장 자연스러운 주문 표현입니다. I'll do the steak도 씁니다.",
        category: 'restaurant'
      },
      {
        id: 'd11_dinner.medium_rare',
        text: 'The steak, medium rare.',
        meaning_ko: '스테이크, 미디엄 레어로요.',
        note: 'Steak doneness: rare, medium rare, medium, medium well, well done.',
        note_ko: '고기 굽기: rare, medium rare, medium, medium well, well done.',
        category: 'restaurant'
      },
      {
        id: 'd11_dinner.tip_percent',
        text: "I'll leave a twenty percent tip.",
        meaning_ko: '20% 팁을 남길게요.',
        note: 'US servers earn most of their pay from tips: 18 to 22 percent is normal.',
        note_ko: '미국 서버는 수입 대부분이 팁입니다. 18~22%가 보통입니다.',
        category: 'restaurant'
      },
      {
        id: 'd11_dinner.to_share',
        text: "Let's get the calamari to share.",
        meaning_ko: '오징어 튀김 하나 나눠 먹죠.',
        note: 'Appetizers are often ordered to share.',
        note_ko: '애피타이저는 나눠 먹으려고 자주 시킵니다.',
        category: 'restaurant'
      }
    ]
  },
  {
    id: 'd12_signing',
    title: 'Signing the contract',
    title_ko: '계약 서명',
    place: 'client_meeting',
    npc: 'greg',
    day_from: 12,
    day_to: 12,
    time_from: '08:30',
    time_to: '13:00',
    requires: 'd11_client_visit',
    summary: 'Legal approved the final terms. Confirm the deal, sign it, and agree on the next steps. Seaside Labs pays you a deal bonus.',
    summary_ko: '법무팀이 최종 조건을 승인했습니다. 합의를 확인하고 서명한 뒤 다음 단계를 정하세요. 시사이드 랩스가 계약 보너스를 줍니다.',
    reward: 300,
    sort: 1210,
    tags: 'client,contract,trip',
    calendar: { day: 12, time: '09:30', title: 'Contract signing', title_ko: '계약 서명' },
    turns: [
      {
        speaker: 'greg',
        situation: 'Legal approved the final version overnight. Greg has the contract up on the screen.',
        situation_ko: '밤사이 법무팀이 최종본을 승인했습니다. 그렉이 계약서를 화면에 띄워 둡니다.',
        line: "Morning! Legal signed off. Thirty days' notice, Net 45, five percent off with the support contract. Does that match your notes?",
        line_ko: '좋은 아침이에요! 법무팀 승인 났어요. 30일 전 통지, Net 45, 지원 계약 포함 시 5% 할인. 메모하신 거랑 맞아요?',
        prompt: 'The terms are exactly what you negotiated. Confirm it.',
        prompt_ko: '협상한 조건 그대로입니다. 확인해 주세요.',
        model: "Yes, that matches my notes. I think we're in agreement.",
        model_ko: '네, 제 메모랑 일치해요. 합의가 된 것 같네요.',
        distractors: [
          {
            text: 'Almost. I had Net 30 in my notes, not Net 45. Can we check?',
            text_ko: '거의요. 제 메모엔 Net 30으로 돼 있어요. 확인해 볼까요?',
            reaction: "Net 30? We settled on Net 45 last week. It's right here in the email.",
            reaction_ko: 'Net 30이요? 지난주에 Net 45로 정했잖아요. 메일에 그대로 있어요.'
          },
          {
            text: "Sure, whatever legal says. Let's just sign and get it over with.",
            text_ko: '네, 법무팀이 된다면 뭐. 그냥 서명하고 끝내죠.',
            reaction: "Ha. Well, it's a pretty big contract, so let's at least read it.",
            reaction_ko: '하. 그래도 꽤 큰 계약이니까 읽어는 보죠.'
          },
          {
            text: "Let me run it by Maya first, and I'll get back to you next week.",
            text_ko: '먼저 마야한테 확인해 보고 다음 주에 연락드릴게요.',
            reaction: 'Next week? I thought we were signing today.',
            reaction_ko: '다음 주요? 오늘 서명하는 줄 알았는데요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "Fantastic. I'll send it out for e-signature now.",
        reply_ko: '좋아요. 지금 전자 서명 요청을 보낼게요.'
      },
      {
        speaker: 'greg',
        situation: 'Maya signs from the office, then Greg signs.',
        situation_ko: '마야가 사무실에서 서명하고, 이어서 그렉이 서명합니다.',
        line: "And… done! It's official. Welcome to the Summit family.",
        line_ko: '그리고… 끝! 공식적으로 계약됐어요. 서밋 가족이 된 걸 환영해요.',
        prompt: 'The deal is done. Show your appreciation and your enthusiasm.',
        prompt_ko: '계약이 끝났습니다. 고마움과 기대감을 전하세요.',
        model: "Thank you for your trust, Greg. We're really excited to get started.",
        model_ko: '믿어 주셔서 감사해요, 그렉. 저희도 시작하게 돼서 정말 기대돼요.',
        distractors: [
          {
            text: "Thanks, Greg. I promise you'll never see a single bug, guaranteed.",
            text_ko: '감사해요, 그렉. 버그는 단 하나도 없을 거라고 약속드려요, 장담해요.',
            reaction: "Ha, let's not get carried away. Nobody ships zero bugs.",
            reaction_ko: '하, 너무 앞서가진 말죠. 버그 없는 소프트웨어는 없어요.'
          },
          {
            text: "Great. I'll forward it to accounting so they can send the invoice.",
            text_ko: '좋네요. 회계팀에 넘겨서 청구서 보내라고 할게요.',
            reaction: 'Uh, sure. Not exactly the champagne moment I expected, but okay.',
            reaction_ko: '어, 그래요. 샴페인 터뜨릴 순간치고는 좀 건조하네요.'
          },
          {
            text: "Phew. Honestly, I wasn't sure we'd get here after the discount talk.",
            text_ko: '휴. 솔직히 할인 얘기 나왔을 때 여기까지 올 줄 몰랐어요.',
            reaction: 'Really? Ha. Well, glad it worked out.',
            reaction_ko: '정말요? 하. 뭐, 잘 풀려서 다행이네요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'So are we. So, what happens next?',
        reply_ko: '저희도요. 그럼 다음은 뭐죠?'
      },
      {
        speaker: 'greg',
        situation: 'Greg wants a clear plan for the next few weeks.',
        situation_ko: '그렉은 앞으로 몇 주의 분명한 계획을 원합니다.',
        line: 'What are the next steps?',
        line_ko: '다음 단계는 뭐죠?',
        prompt: 'Give him the plan: both teams meet for the first time next week, then he gets a written update at the end of every week, on Fridays.',
        prompt_ko: '계획을 알려 주세요. 다음 주에 양 팀이 처음 모이고, 그 뒤로는 매주 금요일에 진행 상황을 보냅니다.',
        model: "Next, we'll set up a kickoff with both teams next week, and send a weekly status update every Friday.",
        model_ko: '다음 주에 양 팀 킥오프를 잡고, 매주 금요일마다 주간 현황 보고를 보내 드릴게요.',
        distractors: [
          {
            text: "First, we'll get both teams together for a kickoff next month, then send a status report every Monday.",
            text_ko: '먼저 다음 달에 양 팀이 모여 킥오프를 하고, 매주 월요일마다 현황 보고를 드릴게요.',
            reaction: "Next month? I was hoping we'd get going sooner than that.",
            reaction_ko: '다음 달이요? 그보다는 빨리 시작했으면 했는데요.'
          },
          {
            text: "We'll start coding tomorrow, and you'll have a working version on your desk by the end of next week.",
            text_ko: '내일부터 바로 개발을 시작해서, 다음 주 말까지 돌아가는 버전을 드릴게요.',
            reaction: "By next week? That's… ambitious. Let's be realistic here.",
            reaction_ko: '다음 주까지요? 그건… 야심 차네요. 현실적으로 가죠.'
          },
          {
            text: "What would you like the next steps to be? We're flexible, so just tell us what works for your team.",
            text_ko: '다음 단계는 어떻게 하고 싶으세요? 저희는 맞출 수 있으니 편하신 대로 말씀해 주세요.',
            reaction: "I was kind of hoping you'd tell me. You're the experts.",
            reaction_ko: '그건 그쪽에서 말해 주길 바랐는데요. 전문가시잖아요.'
          }
        ],
        reply_speaker: 'greg',
        reply_line: "Perfect. And who's my point of contact day to day?",
        reply_ko: '완벽해요. 평소에는 누구에게 연락하면 되죠?'
      },
      {
        speaker: 'greg',
        situation: 'Priya manages the project. You handle the technical side.',
        situation_ko: '프로젝트는 프리야가 관리하고, 기술 쪽은 당신이 맡습니다.',
        line: 'Who should I reach out to day to day?',
        line_ko: '평소에는 누구한테 연락하면 돼요?',
        prompt: 'Tell him who handles what on your side.',
        prompt_ko: '당신 쪽에서 누가 무엇을 맡는지 알려 주세요.',
        model: "Priya will be your main point of contact, and I'll handle any technical questions.",
        model_ko: '주 담당자는 프리야이고, 기술적인 질문은 제가 맡을게요.',
        distractors: [
          {
            text: 'Maya will be your main point of contact, and Priya will cover the technical side.',
            text_ko: '주 담당자는 마야이고, 기술 쪽은 프리야가 맡을 거예요.',
            reaction: 'Priya on the technical side? I thought that was you.',
            reaction_ko: '기술 쪽이 프리야요? 그건 당신인 줄 알았는데요.'
          },
          {
            text: "Just call me anytime, nights and weekends included. I'll handle everything myself.",
            text_ko: '언제든 저한테 전화하세요, 밤이든 주말이든요. 제가 다 처리할게요.',
            reaction: "Ha, that's generous, but you'll burn out. Who's actually running the project?",
            reaction_ko: '하, 고맙지만 그러다 지쳐요. 프로젝트는 실제로 누가 맡아요?'
          },
          {
            text: 'You can find the whole team on our website. Anyone there can help you out.',
            text_ko: '저희 웹사이트에 팀 전원이 나와 있어요. 아무한테나 연락하셔도 돼요.',
            reaction: "Hmm, I'd rather have one name. Who's my go-to?",
            reaction_ko: '음, 이름 하나만 알려 주면 좋겠어요. 누구한테 하면 되죠?'
          }
        ],
        reply_speaker: 'greg',
        reply_line: 'Sounds good. Safe travels home, and thanks again. This was a great trip.',
        reply_ko: '좋아요. 조심히 돌아가고, 다시 한번 고마워요. 정말 좋은 출장이었어요.'
      }
    ],
    phrases: [
      {
        id: 'd12_signing.e_signature',
        text: "I'll send it out for e-signature.",
        meaning_ko: '전자 서명 요청을 보낼게요.',
        note: 'Most US contracts are signed online.',
        note_ko: '미국 계약은 대부분 온라인으로 서명합니다.',
        category: 'contract'
      },
      {
        id: 'd12_signing.in_agreement',
        text: "I think we're in agreement.",
        meaning_ko: '합의가 된 것 같네요.',
        note: 'A formal way to say you both agree.',
        note_ko: '양쪽이 동의한다는 격식 있는 표현입니다.',
        category: 'contract'
      },
      {
        id: 'd12_signing.its_official',
        text: "It's official.",
        meaning_ko: '이제 공식이에요.',
        note: 'Said when something is signed or announced.',
        note_ko: '서명이나 발표가 끝났을 때 하는 말입니다.',
        category: 'contract'
      },
      {
        id: 'd12_signing.legal_signed_off',
        text: 'Legal signed off.',
        meaning_ko: '법무팀이 승인했어요.',
        note: 'Legal = the legal team. Sign off = approve.',
        note_ko: 'legal은 법무팀, sign off는 승인하다입니다.',
        category: 'contract'
      },
      {
        id: 'd12_signing.next_steps',
        text: 'What are the next steps?',
        meaning_ko: '다음 단계는 뭐죠?',
        note: 'Every meeting should end with clear next steps.',
        note_ko: '모든 회의는 분명한 다음 단계로 끝나야 합니다.',
        category: 'meeting'
      },
      {
        id: 'd12_signing.point_of_contact',
        text: 'your main point of contact',
        meaning_ko: '주 담당자',
        note: 'The person to call first.',
        note_ko: '가장 먼저 연락할 사람입니다.',
        category: 'contract'
      },
      {
        id: 'd12_signing.reach_out',
        text: 'Who should I reach out to?',
        meaning_ko: '누구에게 연락하면 되죠?',
        note: 'Reach out = contact someone.',
        note_ko: 'reach out은 연락한다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'd12_signing.status_update',
        text: 'a weekly status update',
        meaning_ko: '주간 현황 보고',
        note: 'A short report on progress, sent on a fixed day.',
        note_ko: '정해진 요일에 보내는 짧은 진행 보고입니다.',
        category: 'meeting'
      }
    ]
  },
  {
    id: 'd12_checkout',
    title: 'Checking out of the hotel',
    title_ko: '호텔 체크아웃',
    place: 'hotel_desk',
    npc: 'kelly',
    day_from: 12,
    day_to: 12,
    time_from: '07:00',
    time_to: '14:00',
    requires: 'd11_hotel_checkin',
    summary: 'Check out, fix a wrong charge on the bill, get an itemized receipt, and find the airport shuttle.',
    summary_ko: '체크아웃하며 청구서의 잘못된 요금을 바로잡고, 항목별 영수증을 받고, 공항 셔틀을 찾으세요.',
    sort: 1220,
    tags: 'travel,hotel,trip',
    calendar: { day: 12, time: '12:00', title: 'Hotel checkout (late checkout until 1 p.m.)', title_ko: '호텔 체크아웃 (오후 1시까지 연장)' },
    turns: [
      {
        speaker: 'kelly',
        situation: 'You roll your suitcase to the front desk.',
        situation_ko: '여행 가방을 끌고 프런트로 갑니다.',
        line: 'Good morning! Checking out? How was your stay?',
        line_ko: '좋은 아침이에요! 체크아웃하시나요? 묵으시는 동안 어떠셨어요?',
        prompt: "You're leaving today. Answer her, and say how your time at the hotel went: you enjoyed it.",
        prompt_ko: '오늘 떠납니다. 그녀에게 답하고, 묵는 동안 어땠는지 말하세요. 좋았습니다.',
        model: "Good morning. I'd like to check out, please. The stay was great.",
        model_ko: '좋은 아침이에요. 체크아웃할게요. 아주 잘 지냈어요.',
        distractors: [
          {
            text: 'Good morning. Could I extend my stay one more night, please?',
            text_ko: '좋은 아침이에요. 하룻밤 더 연장할 수 있을까요?',
            reaction: 'One more night? Let me see… it shows you checking out today.',
            reaction_ko: '하룻밤 더요? 어디 보자… 오늘 체크아웃으로 되어 있는데요.'
          },
          {
            text: 'Yeah, checking out. Can we hurry this up? I have a flight to catch.',
            text_ko: '네, 체크아웃이요. 좀 빨리 해 줄래요? 비행기 타야 해서요.',
            reaction: "Of course. I'll be as quick as I can.",
            reaction_ko: '물론이죠. 최대한 빨리 해 드릴게요.'
          },
          {
            text: "Morning. I'm checking out. Honestly, the room was pretty noisy.",
            text_ko: '안녕하세요. 체크아웃할게요. 솔직히 방이 꽤 시끄러웠어요.',
            reaction: "Oh, I'm sorry to hear that. I'll pass it along to our manager.",
            reaction_ko: '아, 죄송해요. 매니저에게 전달해 둘게요.'
          }
        ],
        reply_speaker: 'kelly',
        reply_line: "Glad to hear it! Here's your folio. Take a look and let me know if everything's correct.",
        reply_ko: '다행이에요! 여기 청구서예요. 확인해 보시고 맞는지 알려 주세요.'
      },
      {
        speaker: 'kelly',
        situation: 'The bill shows a $14 minibar charge. You never opened the minibar.',
        situation_ko: '청구서에 미니바 14달러가 있습니다. 미니바는 열지도 않았습니다.',
        line: 'Does everything look okay?',
        line_ko: '다 괜찮아 보이세요?',
        prompt: "Point out the charge on the bill that shouldn't be there.",
        prompt_ko: '청구서에 있으면 안 되는 요금을 짚어 주세요.',
        model: "Actually, there's a minibar charge I don't recognize. I didn't use the minibar.",
        model_ko: '사실 모르는 미니바 요금이 있어요. 미니바는 쓰지 않았거든요.',
        distractors: [
          {
            text: "Actually, there's a room service charge here. I never ordered any.",
            text_ko: '사실 여기 룸서비스 요금이 있네요. 룸서비스는 시킨 적이 없어요.',
            reaction: "Room service? I don't see any room service here. Which line do you mean?",
            reaction_ko: '룸서비스요? 여기엔 룸서비스가 없는데요. 어느 줄 말씀이세요?'
          },
          {
            text: "You've charged me for the minibar. Are you guys trying to rip people off?",
            text_ko: '미니바 요금을 붙였네요. 여기 사람들 바가지 씌우는 거예요?',
            reaction: 'Of course not, sir. Let me look into it.',
            reaction_ko: '그럴 리가요, 손님. 확인해 보겠습니다.'
          },
          {
            text: "Looks fine, thanks. The company's paying for it anyway, so it doesn't really matter.",
            text_ko: '괜찮아 보여요. 어차피 회사가 내니까 상관없어요.',
            reaction: "Okay… just so you know, there's a fourteen-dollar charge on there.",
            reaction_ko: '네… 참고로 말씀드리면, 14달러짜리 항목이 하나 있어요.'
          }
        ],
        reply_speaker: 'kelly',
        reply_line: "I'm so sorry about that. I've taken it off. The room itself is on the company card.",
        reply_ko: '정말 죄송해요. 빼 드렸어요. 객실 요금은 법인 카드로 처리됐어요.'
      },
      {
        speaker: 'kelly',
        situation: 'You need the receipt for your expense report.',
        situation_ko: '경비 정산을 하려면 영수증이 필요합니다.',
        line: 'Would you like a copy of the receipt?',
        line_ko: '영수증 사본 드릴까요?',
        prompt: 'You need a receipt for your expenses, broken down line by line and sent to your email.',
        prompt_ko: '경비 처리용 영수증이 필요합니다. 항목별로 나온 것을 이메일로 받으세요.',
        model: 'Yes, please. Could you email me an itemized receipt? I need it for my expense report.',
        model_ko: '네, 부탁드려요. 항목별 영수증을 이메일로 보내 주실 수 있어요? 경비 보고서에 필요해서요.',
        distractors: [
          {
            text: 'Yes, please. Could you just print out the total for me? I need it for my expense report.',
            text_ko: '네, 부탁드려요. 합계만 출력해 주실래요? 경비 보고서에 필요해서요.',
            reaction: 'Just the total? For expenses they usually want every charge listed.',
            reaction_ko: '합계만요? 경비 처리할 때는 보통 항목이 다 나와야 하던데요.'
          },
          {
            text: "No, thanks. I'll just take a photo of the screen for my expense report.",
            text_ko: '아뇨, 괜찮아요. 경비 보고서용으로 화면만 사진 찍어 갈게요.',
            reaction: 'Um, okay… you sure? I can email you a proper copy.',
            reaction_ko: '음, 그러세요… 괜찮으시겠어요? 제대로 된 사본을 메일로 보내 드릴 수 있어요.'
          },
          {
            text: "Yes. Email it now, itemized. Accounting is very strict, so don't mess it up.",
            text_ko: '네. 지금 항목별로 메일 보내요. 회계팀이 깐깐하니까 실수하지 마시고요.',
            reaction: "I'll be very careful.",
            reaction_ko: '아주 조심하겠습니다.'
          }
        ],
        reply_speaker: 'kelly',
        reply_line: 'Done. It should be in your inbox. Anything else?',
        reply_ko: '보냈어요. 메일함에 있을 거예요. 더 필요한 거 있으세요?'
      },
      {
        speaker: 'kelly',
        situation: 'Your flight home leaves this afternoon.',
        situation_ko: '귀국편은 오늘 오후에 출발합니다.',
        line: 'Anything else I can do for you?',
        line_ko: '또 도와드릴 건 없으세요?',
        prompt: 'Ask how to get to the airport. The hotel runs a free ride there.',
        prompt_ko: '공항에 어떻게 가는지 물어보세요. 호텔에서 무료 차편을 운행합니다.',
        model: 'Yes, where can I catch the shuttle to the airport?',
        model_ko: '네, 공항 가는 셔틀은 어디서 타요?',
        distractors: [
          {
            text: 'Yes, where can I catch the shuttle to the train station?',
            text_ko: '네, 기차역 가는 셔틀은 어디서 타요?',
            reaction: "The train station? We only run a shuttle to the airport, I'm afraid.",
            reaction_ko: '기차역이요? 죄송하지만 셔틀은 공항만 가요.'
          },
          {
            text: "No, I'm all set, thanks. Have a great day!",
            text_ko: '아뇨, 다 됐어요. 감사해요. 좋은 하루 보내세요!',
            reaction: 'You too! Oh, will you need a ride to the airport?',
            reaction_ko: '손님도요! 아, 공항까지 가는 차편은 필요 없으세요?'
          },
          {
            text: 'Yes. Can someone drive me to the airport right now?',
            text_ko: '네. 누가 지금 공항까지 태워다 줄 수 있어요?',
            reaction: "I'm afraid we don't have drivers on call, but there is another option.",
            reaction_ko: '죄송하지만 대기 중인 기사는 없어요. 대신 다른 방법이 있어요.'
          }
        ],
        reply_speaker: 'kelly',
        reply_line: 'Right outside the main doors, every thirty minutes. Safe travels!',
        reply_ko: '정문 바로 밖에서 30분마다 있어요. 조심히 가세요!'
      }
    ],
    phrases: [
      {
        id: 'd12_checkout.catch_shuttle',
        text: 'Where can I catch the shuttle?',
        meaning_ko: '셔틀은 어디서 타요?',
        note: 'Catch = get on a bus, train or shuttle.',
        note_ko: 'catch는 버스, 기차, 셔틀을 탄다는 뜻입니다.',
        category: 'travel'
      },
      {
        id: 'd12_checkout.dont_recognize',
        text: "There's a charge I don't recognize.",
        meaning_ko: '모르는 요금이 있어요.',
        note: 'A polite, non-accusing way to question a bill.',
        note_ko: '상대를 탓하지 않고 청구서에 의문을 제기하는 방법입니다.',
        category: 'hotel'
      },
      {
        id: 'd12_checkout.folio',
        text: "Here's your folio.",
        meaning_ko: '여기 청구서예요.',
        note: "Folio = the hotel's bill for your stay.",
        note_ko: 'folio는 숙박 청구서입니다.',
        category: 'hotel'
      },
      {
        id: 'd12_checkout.how_was_stay',
        text: 'How was your stay?',
        meaning_ko: '지내시기 어떠셨어요?',
        note: 'The usual question at checkout.',
        note_ko: '체크아웃 때 흔히 듣는 질문입니다.',
        category: 'hotel'
      },
      {
        id: 'd12_checkout.itemized',
        text: 'Could you email me an itemized receipt?',
        meaning_ko: '항목별 영수증을 이메일로 보내 주시겠어요?',
        note: 'Itemized = every charge listed separately. Expense reports need it.',
        note_ko: 'itemized는 모든 요금이 따로 적혀 있다는 뜻입니다. 경비 정산에 필요합니다.',
        category: 'hotel'
      },
      {
        id: 'd12_checkout.taken_it_off',
        text: "I've taken it off.",
        meaning_ko: '빼 드렸어요.',
        note: 'Take something off the bill = remove the charge.',
        note_ko: 'take off the bill은 요금을 뺀다는 뜻입니다.',
        category: 'hotel'
      }
    ]
  },
  {
    id: 'd12_flight_home',
    title: 'An overbooked flight home',
    title_ko: '초과 예약된 귀국편',
    place: 'airport_gate',
    npc: 'amy',
    day_from: 12,
    day_to: 12,
    time_from: '11:00',
    time_to: '21:00',
    requires: 'd12_checkout',
    summary: 'Your flight home is overbooked. Volunteer for a later flight, but negotiate a better voucher first.',
    summary_ko: '귀국편이 초과 예약됐습니다. 나중 비행기로 양보하되, 먼저 더 좋은 바우처를 협상하세요.',
    sort: 1230,
    tags: 'travel,airport,negotiation,trip',
    calendar: { day: 12, time: '15:00', title: 'Flight home', title_ko: '귀국 비행기' },
    turns: [
      {
        speaker: 'amy',
        situation: 'At the gate for your flight home, Amy makes an announcement.',
        situation_ko: '귀국편 게이트에서 에이미가 안내 방송을 합니다.',
        line: "Folks, this flight is overbooked. We're looking for one volunteer to take the next flight, three hours later, for a travel voucher.",
        line_ko: '여러분, 이 항공편이 초과 예약됐습니다. 세 시간 뒤 다음 항공편으로 옮겨 주실 분 한 분을 찾습니다. 여행 바우처를 드려요.',
        prompt: 'You might volunteer, but first find out what the offer is.',
        prompt_ko: '자원할 수도 있지만, 먼저 보상이 얼마인지 알아보세요.',
        model: 'Excuse me, how much is the voucher worth?',
        model_ko: '저기요, 그 바우처는 얼마짜리예요?',
        distractors: [
          {
            text: 'Excuse me, what time does the next flight leave?',
            text_ko: '저기요, 다음 비행기는 몇 시에 출발해요?',
            reaction: 'Three hours after this one. I just announced it, sir.',
            reaction_ko: '이 편보다 세 시간 뒤예요. 방금 안내해 드렸어요, 손님.'
          },
          {
            text: "I'll do it, but I want first class on the next one.",
            text_ko: '할게요. 대신 다음 편은 일등석으로요.',
            reaction: "Let's start with the voucher. First class isn't on the table.",
            reaction_ko: '바우처 얘기부터 하죠. 일등석은 어려워요.'
          },
          {
            text: 'Seriously? You sold more seats than you have?',
            text_ko: '진짜요? 좌석보다 표를 더 팔았다고요?',
            reaction: "I know, I'm sorry. It happens. Would you be willing to volunteer?",
            reaction_ko: '알아요, 죄송해요. 가끔 이래요. 혹시 자원해 주실 수 있으세요?'
          }
        ],
        reply_speaker: 'amy',
        reply_line: 'Three hundred dollars toward any future flight.',
        reply_ko: '다음 항공권에 쓸 수 있는 300달러예요.'
      },
      {
        speaker: 'amy',
        situation: 'You are not in a hurry tonight, but three hundred feels a little low.',
        situation_ko: '오늘 밤 급하지는 않지만 300달러는 조금 적게 느껴집니다.',
        line: 'Would you be interested?',
        line_ko: '관심 있으세요?',
        prompt: "You're open to it, but push for more: four hundred dollars.",
        prompt_ko: '할 마음은 있지만 더 받아 내세요. 400달러로요.',
        model: 'I might be. Would you do four hundred if I take the later flight?',
        model_ko: '그럴 수도 있어요. 나중 비행기를 타면 400달러로 해 주실 수 있어요?',
        distractors: [
          {
            text: 'Maybe. Would you go up to three hundred if I take the later one?',
            text_ko: '아마도요. 나중 비행기를 타면 300달러까지 올려 주실 수 있어요?',
            reaction: "Three hundred is what I'm offering already.",
            reaction_ko: '300달러는 이미 드리는 금액인데요.'
          },
          {
            text: 'Not for three hundred. Make it a thousand, or find somebody else.',
            text_ko: '300달러로는 안 해요. 1,000달러 주든지 다른 사람 찾으세요.',
            reaction: "A thousand? I'm sorry, that's way outside what I can do.",
            reaction_ko: '1,000달러요? 죄송하지만 제 권한을 훨씬 넘어요.'
          },
          {
            text: "Sure, I'll take it. Three hundred is fine, sign me up.",
            text_ko: '네, 할게요. 300달러면 됐어요, 저로 해 주세요.',
            reaction: 'Great! Let me get your new boarding pass.',
            reaction_ko: '좋아요! 새 탑승권 뽑아 드릴게요.'
          }
        ],
        reply_speaker: 'amy',
        reply_line: 'Let me check… Okay, I can do four hundred, plus a fifteen-dollar meal voucher.',
        reply_ko: '확인해 볼게요… 좋아요, 400달러에 15달러 식사 쿠폰도 드릴게요.'
      },
      {
        speaker: 'amy',
        situation: "You want to be sure you won't get bumped again.",
        situation_ko: '다시 밀려나지 않을지 확실히 하고 싶습니다.',
        line: 'Four hundred plus a meal voucher. Deal?',
        line_ko: '400달러에 식사 쿠폰까지. 괜찮으세요?',
        prompt: "Take the offer, but make sure you won't get bumped from the next flight too.",
        prompt_ko: '제안을 받아들이되, 다음 비행기에서도 밀려나지 않는지 확인하세요.',
        model: "Deal. Just to confirm, I'm guaranteed a seat on the later flight?",
        model_ko: '좋아요. 확인차 여쭤보는데, 나중 비행기 좌석은 확실히 보장되는 거죠?',
        distractors: [
          {
            text: "Deal. Just to confirm, that's five hundred plus the meal voucher?",
            text_ko: '좋아요. 확인차 묻는 건데, 500달러에 식사 쿠폰 맞죠?',
            reaction: 'Four hundred, sir, plus fifteen for a meal.',
            reaction_ko: '400달러예요, 손님. 그리고 식사비 15달러요.'
          },
          {
            text: 'Deal. Is there a lounge I can wait in for the next three hours?',
            text_ko: '좋아요. 세 시간 동안 기다릴 라운지가 있나요?',
            reaction: 'Not with this ticket, sorry. Anything else before I print these?',
            reaction_ko: '죄송하지만 이 항공권으론 안 돼요. 출력하기 전에 다른 건 없으세요?'
          },
          {
            text: "Fine. But if I get bumped again, I'm filing a formal complaint.",
            text_ko: '알았어요. 근데 또 밀리면 정식으로 항의할 거예요.',
            reaction: "Understood. There's no need for that, sir.",
            reaction_ko: '알겠습니다. 그러실 필요는 없을 거예요, 손님.'
          }
        ],
        reply_speaker: 'amy',
        reply_line: "Yes, you're confirmed in seat 9A. Here are your vouchers. Thanks for helping us out!",
        reply_ko: '네, 9A 좌석으로 확정됐어요. 여기 바우처요. 도와주셔서 감사해요!'
      },
      {
        speaker: 'amy',
        situation: 'You have three hours to kill at the airport.',
        situation_ko: '공항에서 세 시간을 보내야 합니다.',
        line: 'Is there anything else I can do for you?',
        line_ko: '또 도와드릴 일 있으세요?',
        prompt: "You're getting hungry. Find out what you can do with the fifteen-dollar coupon.",
        prompt_ko: '배가 고파 옵니다. 15달러짜리 쿠폰으로 뭘 할 수 있는지 알아보세요.',
        model: 'Where can I use the meal voucher?',
        model_ko: '식사 쿠폰은 어디서 쓸 수 있어요?',
        distractors: [
          {
            text: 'Where can I use the travel voucher?',
            text_ko: '여행 바우처는 어디서 쓸 수 있어요?',
            reaction: "The travel voucher's for a future flight. You can't use it here.",
            reaction_ko: '여행 바우처는 다음 항공권용이에요. 여기서는 못 써요.'
          },
          {
            text: 'Can I get a cash refund instead?',
            text_ko: '대신 현금으로 돌려받을 수 있어요?',
            reaction: "I'm sorry, the vouchers can't be cashed out.",
            reaction_ko: '죄송하지만 바우처는 현금으로 바꿀 수 없어요.'
          },
          {
            text: "Where's the nearest hotel to the airport?",
            text_ko: '공항에서 제일 가까운 호텔은 어디예요?',
            reaction: "A hotel? Your flight's in three hours, sir.",
            reaction_ko: '호텔이요? 비행기가 세 시간 뒤인데요, 손님.'
          }
        ],
        reply_speaker: 'amy',
        reply_line: 'Any restaurant in this terminal. The burger place across the hall is pretty good.',
        reply_ko: '이 터미널의 식당 어디든요. 맞은편 버거집이 꽤 괜찮아요.'
      }
    ],
    phrases: [
      {
        id: 'd12_flight_home.deal',
        text: 'Deal.',
        meaning_ko: '좋아요, 그렇게 하죠.',
        note: 'One word to accept an offer.',
        note_ko: '제안을 받아들이는 한 단어입니다.',
        category: 'negotiation'
      },
      {
        id: 'd12_flight_home.guaranteed_seat',
        text: "I'm guaranteed a seat, right?",
        meaning_ko: '좌석은 보장되는 거죠?',
        note: "Make sure you won't get bumped again.",
        note_ko: '다시 밀려나지 않도록 확인하세요.',
        category: 'travel'
      },
      {
        id: 'd12_flight_home.helping_out',
        text: 'Thanks for helping us out!',
        meaning_ko: '도와주셔서 감사해요!',
        note: 'Help someone out = help them with a problem.',
        note_ko: 'help someone out은 곤란한 사람을 돕는다는 뜻입니다.',
        category: 'travel'
      },
      {
        id: 'd12_flight_home.overbooked',
        text: 'This flight is overbooked.',
        meaning_ko: '이 항공편은 초과 예약됐어요.',
        note: 'Airlines sell more seats than they have, then ask for volunteers.',
        note_ko: '항공사는 좌석보다 많이 팔고 양보할 사람을 찾습니다.',
        category: 'travel'
      },
      {
        id: 'd12_flight_home.time_to_kill',
        text: 'I have three hours to kill.',
        meaning_ko: '세 시간이나 때워야 해요.',
        note: 'Time to kill = free time while you wait.',
        note_ko: 'time to kill은 기다리며 보내야 하는 시간입니다.',
        category: 'small-talk'
      },
      {
        id: 'd12_flight_home.volunteer',
        text: "We're looking for a volunteer.",
        meaning_ko: '양보하실 분을 찾습니다.',
        note: 'Volunteering can earn you a voucher or cash.',
        note_ko: '양보하면 바우처나 현금을 받을 수 있습니다.',
        category: 'travel'
      },
      {
        id: 'd12_flight_home.voucher_worth',
        text: 'How much is the voucher worth?',
        meaning_ko: '바우처는 얼마짜리예요?',
        note: 'Worth = value. Always ask before you accept.',
        note_ko: 'worth는 가치입니다. 받기 전에 꼭 물어보세요.',
        category: 'travel'
      },
      {
        id: 'd12_flight_home.would_you_do',
        text: 'Would you do four hundred?',
        meaning_ko: '400으로 해 주실 수 있어요?',
        note: 'A casual counteroffer: Would you do + price?',
        note_ko: 'Would you do + 가격?은 가벼운 역제안입니다.',
        category: 'negotiation'
      }
    ]
  },
  {
    id: 'w_brunch',
    title: 'Weekend brunch at the diner',
    title_ko: '다이너에서 주말 브런치',
    place: 'diner_counter',
    npc: 'rosa',
    day_from: 13,
    day_to: 14,
    time_from: '08:00',
    time_to: '13:30',
    summary: 'Treat yourself to brunch after the trip: order eggs the way you like them, get a refill, and pay with a tip. Brunch and tip come to $20.',
    summary_ko: '출장 후 브런치로 자신에게 상을 주세요. 원하는 방식으로 달걀을 주문하고, 리필을 받고, 팁을 얹어 계산합니다. 브런치와 팁은 20달러.',
    reward: -20,
    energy: 30,
    sort: 1310,
    tags: 'weekend,restaurant,life',
    calendar: { day: 13, time: '09:30', title: 'Brunch at the diner', title_ko: '다이너에서 브런치' },
    turns: [
      {
        speaker: 'rosa',
        situation: 'It is a weekend morning and the diner is busy. Rosa comes over with a coffee pot.',
        situation_ko: '주말 아침, 다이너가 붐빕니다. 로사가 커피 주전자를 들고 옵니다.',
        line: 'Morning, hon! Coffee to start?',
        line_ko: '좋은 아침이에요, 자기! 커피부터 줄까요?',
        prompt: "You'd love a coffee. You also need to see what they're serving.",
        prompt_ko: '커피를 마시고 싶습니다. 무엇을 파는지도 봐야 합니다.',
        model: 'Yes, please. And could I see the brunch menu?',
        model_ko: '네, 주세요. 그리고 브런치 메뉴 좀 볼 수 있을까요?',
        distractors: [
          {
            text: 'No thanks, just water. Can I see the menu?',
            text_ko: '아뇨, 물만 주세요. 메뉴 좀 볼 수 있을까요?',
            reaction: "Water it is. You sure? It's a fresh pot.",
            reaction_ko: '물로 할게요. 정말요? 방금 내린 커피인데.'
          },
          {
            text: "Sure. And hurry with the menu, I'm starving.",
            text_ko: '네. 메뉴도 빨리 줘요, 배고파 죽겠어요.',
            reaction: 'Okay, okay. Hold your horses, hon.',
            reaction_ko: '알았어요, 알았어. 진정해요, 자기.'
          },
          {
            text: 'Yes, please. And could I see the dinner menu?',
            text_ko: '네, 주세요. 그리고 저녁 메뉴 좀 볼 수 있을까요?',
            reaction: "Dinner? Hon, it's ten in the morning. Here's brunch.",
            reaction_ko: '저녁이요? 자기, 지금 아침 열 시예요. 여기 브런치 메뉴요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Here you go. The special today is the veggie omelet.',
        reply_ko: '여기요. 오늘의 스페셜은 채소 오믈렛이에요.'
      },
      {
        speaker: 'rosa',
        situation: 'You know exactly what you want.',
        situation_ko: '먹고 싶은 게 분명합니다.',
        line: 'Ready to order?',
        line_ko: '주문하시겠어요?',
        prompt: 'Order what you want: two eggs flipped with the yolks still runny, plus bacon and wheat toast.',
        prompt_ko: '원하는 걸 주문하세요. 노른자가 흐르게 뒤집어 익힌 달걀 두 개, 베이컨, 통밀 토스트입니다.',
        model: 'Yes. Can I get two eggs over easy, with bacon and wheat toast?',
        model_ko: '네. 달걀 두 개 오버 이지로, 베이컨이랑 통밀 토스트 주실래요?',
        distractors: [
          {
            text: 'Yes. Can I get two eggs sunny side up, with sausage and white toast?',
            text_ko: '네. 달걀 두 개 서니 사이드 업으로, 소시지랑 흰 식빵 토스트 주실래요?',
            reaction: 'Sunny side up, sausage, white toast. You got it.',
            reaction_ko: '서니 사이드 업, 소시지, 흰 식빵. 알겠어요.'
          },
          {
            text: "Two eggs, bacon, wheat toast. And don't mess up the eggs this time.",
            text_ko: '달걀 두 개, 베이컨, 통밀 토스트요. 이번엔 달걀 망치지 마시고요.',
            reaction: "Wow, okay. I'll tell the cook to be extra careful.",
            reaction_ko: '와, 그래요. 요리사한테 특별히 조심하라고 할게요.'
          },
          {
            text: "What do you recommend? I can't decide between all of these.",
            text_ko: '뭐가 맛있어요? 이것저것 많아서 못 고르겠어요.',
            reaction: "The special's good. But you look like you know what you want.",
            reaction_ko: '스페셜이 맛있어요. 근데 먹고 싶은 게 있는 얼굴인데요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'You got it. Hash browns or home fries with that?',
        reply_ko: '알겠어요. 해시 브라운이요, 홈 프라이요?'
      },
      {
        speaker: 'rosa',
        situation: 'Both are fried potatoes, cut differently.',
        situation_ko: '둘 다 감자 요리인데 써는 방식이 다릅니다.',
        line: 'Hash browns or home fries?',
        line_ko: '해시 브라운이요, 홈 프라이요?',
        prompt: 'You like the shredded, crispy kind. Pick that one.',
        prompt_ko: '잘게 채 썰어 바삭하게 부친 쪽이 좋습니다. 그걸 고르세요.',
        model: 'Hash browns, please.',
        model_ko: '해시 브라운으로 주세요.',
        distractors: [
          {
            text: 'Home fries, please.',
            text_ko: '홈 프라이로 주세요.',
            reaction: 'Home fries it is. The chunky ones, right?',
            reaction_ko: '홈 프라이로요. 깍둑썰기한 거 맞죠?'
          },
          {
            text: "Both, if that's okay?",
            text_ko: '둘 다 주시면 안 돼요?',
            reaction: "Both? That's extra, hon. Just pick one?",
            reaction_ko: '둘 다요? 그럼 추가 요금이에요, 자기. 하나만 고를래요?'
          },
          {
            text: "Whatever. Doesn't matter.",
            text_ko: '아무거나요. 상관없어요.',
            reaction: "Okay… I'll surprise you, then.",
            reaction_ko: '그래요… 그럼 내 맘대로 줄게요.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Great choice. Coming right up.',
        reply_ko: '좋은 선택이에요. 금방 나와요.'
      },
      {
        speaker: 'rosa',
        situation: 'You have finished eating. Your coffee cup is empty.',
        situation_ko: '다 먹었습니다. 커피 잔이 비었습니다.',
        line: "How's everything tasting?",
        line_ko: '음식은 입에 맞아요?',
        prompt: "You enjoyed it. You'd like more coffee, and you're ready to pay.",
        prompt_ko: '맛있게 먹었습니다. 커피를 더 마시고 싶고, 계산할 준비가 됐습니다.',
        model: "Everything's great, thanks. Could I get a refill and the check, please?",
        model_ko: '다 맛있어요, 고마워요. 커피 리필이랑 계산서 좀 주실래요?',
        distractors: [
          {
            text: "Everything's great, thanks. Could I get a refill and a slice of apple pie?",
            text_ko: '다 맛있어요, 고마워요. 커피 리필이랑 사과 파이 한 조각 주실래요?',
            reaction: "Sure! One slice of apple pie. I'll hold the check, then.",
            reaction_ko: '그럼요! 사과 파이 한 조각이요. 그럼 계산서는 이따 줄게요.'
          },
          {
            text: 'Fine. The eggs were a bit cold. Just bring me the check already.',
            text_ko: '그냥 그래요. 달걀이 좀 식었더라고요. 계산서나 빨리 줘요.',
            reaction: 'Oh, sorry, hon. I can have them make you fresh ones.',
            reaction_ko: '어머, 미안해요, 자기. 새로 만들어 달라고 할게요.'
          },
          {
            text: "It's great! Could you wrap up the rest for me to take home?",
            text_ko: '맛있어요! 남은 건 싸 가게 포장해 주실래요?',
            reaction: "Wrap it? Your plate's clean, hon!",
            reaction_ko: '포장이요? 접시가 싹 비었는데요, 자기!'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: "Sure thing. That's fourteen fifty. No rush.",
        reply_ko: '그럼요. 14달러 50센트예요. 천천히 하세요.'
      },
      {
        speaker: 'rosa',
        situation: 'The bill is $14.50. You pay with a twenty, and the rest is her tip.',
        situation_ko: '14달러 50센트입니다. 20달러를 내고 나머지는 팁으로 줍니다.',
        line: 'Do you need change?',
        line_ko: '거스름돈 드릴까요?',
        prompt: 'The extra $5.50 is her tip. Let her know.',
        prompt_ko: '남는 5달러 50센트는 팁입니다. 그렇게 전하세요.',
        model: 'No, keep the change. Thanks, Rosa!',
        model_ko: '아뇨, 잔돈은 가지세요. 고마워요, 로사!',
        distractors: [
          {
            text: 'Yes, could I get five fifty back?',
            text_ko: '네, 5달러 50센트 거슬러 주실래요?',
            reaction: 'Sure thing. Be right back with your change.',
            reaction_ko: '그럼요. 금방 거스름돈 가져올게요.'
          },
          {
            text: 'Just a dollar back, please, thanks.',
            text_ko: '1달러만 거슬러 주세요, 고마워요.',
            reaction: 'One dollar back. Here you go, hon.',
            reaction_ko: '1달러 거스름돈요. 여기요, 자기.'
          },
          {
            text: "Keep it. You'll need it more than me.",
            text_ko: '가지세요. 저보다 더 필요하실 테니까.',
            reaction: 'Uh… thanks, I guess.',
            reaction_ko: '어… 고맙다고 해야겠죠.'
          }
        ],
        reply_speaker: 'rosa',
        reply_line: 'Aw, thanks, hon. Have a good weekend!',
        reply_ko: '어머, 고마워요. 좋은 주말 보내요!'
      }
    ],
    phrases: [
      {
        id: 'w_brunch.can_i_get',
        text: 'Can I get …?',
        meaning_ko: '…주실래요?',
        note: 'The most common way to order in casual American restaurants.',
        note_ko: '미국 캐주얼 식당에서 가장 흔한 주문 표현입니다.',
        category: 'restaurant'
      },
      {
        id: 'w_brunch.hash_browns',
        text: 'Hash browns or home fries?',
        meaning_ko: '해시 브라운이요, 홈 프라이요?',
        note: 'Hash browns are shredded potatoes. Home fries are cubes.',
        note_ko: '해시 브라운은 채 썬 감자, 홈 프라이는 깍둑 썬 감자입니다.',
        category: 'restaurant'
      },
      {
        id: 'w_brunch.hows_everything',
        text: "How's everything tasting?",
        meaning_ko: '음식 맛은 괜찮으세요?',
        note: 'Servers check in during the meal. Great, thanks! is enough.',
        note_ko: '식사 중 서버가 묻습니다. Great, thanks!면 충분합니다.',
        category: 'restaurant'
      },
      {
        id: 'w_brunch.keep_the_change',
        text: 'Keep the change.',
        meaning_ko: '잔돈은 가지세요.',
        note: 'The change becomes the tip.',
        note_ko: '잔돈이 팁이 됩니다.',
        category: 'restaurant'
      },
      {
        id: 'w_brunch.no_rush',
        text: 'No rush.',
        meaning_ko: '천천히 하세요.',
        note: 'Take your time.',
        note_ko: '서두르지 않아도 된다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'w_brunch.over_easy',
        text: 'Two eggs over easy, please.',
        meaning_ko: '달걀 두 개, 오버 이지로요.',
        note: 'Egg styles: sunny side up, over easy, over medium, over hard, scrambled.',
        note_ko: '달걀 방식: sunny side up, over easy, over medium, over hard, scrambled.',
        category: 'restaurant'
      },
      {
        id: 'w_brunch.refill',
        text: 'Could I get a refill?',
        meaning_ko: '리필해 주실래요?',
        note: 'Coffee and soft drinks are usually refilled for free.',
        note_ko: '커피와 탄산음료는 보통 무료로 리필해 줍니다.',
        category: 'restaurant'
      },
      {
        id: 'w_brunch.to_start',
        text: 'Coffee to start?',
        meaning_ko: '커피부터 드릴까요?',
        note: 'Diner servers often offer coffee right away.',
        note_ko: '다이너 서버는 보통 커피부터 권합니다.',
        category: 'restaurant'
      }
    ]
  },
  {
    id: 'w_neighbor_bbq',
    title: "Carl's backyard barbecue",
    title_ko: '칼의 뒷마당 바비큐',
    place: 'bus_stop',
    npc: 'carl',
    day_from: 13,
    day_to: 14,
    time_from: '09:00',
    time_to: '18:00',
    summary: 'Your neighbor Carl wants to hear about your trip, talks football, and invites you to a barbecue.',
    summary_ko: '이웃 칼이 출장 얘기를 궁금해하고, 풋볼 얘기를 하고, 바비큐에 초대합니다.',
    energy: 25,
    sort: 1320,
    tags: 'weekend,small-talk,neighbor,life',
    calendar: { day: 13, time: '16:00', title: "Barbecue at Carl's", title_ko: '칼네 바비큐' },
    turns: [
      {
        speaker: 'carl',
        situation: 'It is the weekend. Carl is out by the bus stop, walking his dog.',
        situation_ko: '주말입니다. 칼이 버스 정류장 근처에서 개를 산책시키고 있습니다.',
        line: "Hey, stranger! Haven't seen you around all week.",
        line_ko: '이게 누구야! 일주일 내내 통 안 보이던데.',
        prompt: "Tell him why you've been gone: work took you to Ridgeport all week.",
        prompt_ko: '왜 안 보였는지 말하세요. 일 때문에 한 주 내내 리지포트에 있었습니다.',
        model: 'Yeah, I was on a business trip to Ridgeport. I just got back last night.',
        model_ko: '네, 리지포트로 출장 갔었어요. 어젯밤에 막 돌아왔어요.',
        distractors: [
          {
            text: 'Yeah, I was visiting family over in Ridgeport. I just got back last night.',
            text_ko: '네, 리지포트에 가족 보러 갔었어요. 어젯밤에 막 왔어요.',
            reaction: "Oh, nice! I didn't know you had family out there.",
            reaction_ko: '오, 좋네요! 거기 가족이 있는 줄은 몰랐어요.'
          },
          {
            text: "I've been around. I just don't really like hanging out outside much.",
            text_ko: '있긴 있었어요. 그냥 밖에 잘 안 나다녀서요.',
            reaction: "Ha, fair enough. Just making sure you're alive in there.",
            reaction_ko: '하, 그럴 수 있죠. 그냥 살아 있나 확인한 거예요.'
          },
          {
            text: "Have you? I've been busy. Your dog's gotten so big, by the way!",
            text_ko: '그래요? 좀 바빴어요. 그나저나 강아지 많이 컸네요!',
            reaction: "Ha, she eats like a horse. But seriously, where've you been?",
            reaction_ko: '하, 얘가 엄청 먹어요. 근데 진짜 어디 갔었어요?'
          }
        ],
        reply_speaker: 'carl',
        reply_line: "Ridgeport! How'd it go?",
        reply_ko: '리지포트! 어떻게 됐어요?'
      },
      {
        speaker: 'carl',
        situation: 'The contract was signed on Friday.',
        situation_ko: '금요일에 계약이 체결됐습니다.',
        line: "How'd it go?",
        line_ko: '어떻게 됐어요?',
        prompt: 'Share the good news from Friday.',
        prompt_ko: '금요일에 있었던 좋은 소식을 전하세요.',
        model: 'It went really well. We closed the deal!',
        model_ko: '아주 잘 됐어요. 계약 따냈어요!',
        distractors: [
          {
            text: 'Not great, honestly. The client backed out.',
            text_ko: '솔직히 별로였어요. 고객이 발을 뺐어요.',
            reaction: 'Oh no, sorry to hear that. Their loss.',
            reaction_ko: '저런, 안됐네요. 그쪽 손해죠.'
          },
          {
            text: "Pretty good. I'll know if we got it next week.",
            text_ko: '괜찮았어요. 따냈는지는 다음 주에 알아요.',
            reaction: 'Well, fingers crossed, then!',
            reaction_ko: '그럼 잘 되길 빌게요!'
          },
          {
            text: 'Amazing. Basically I closed it all by myself.',
            text_ko: '끝내줬죠. 사실상 저 혼자 다 따냈어요.',
            reaction: "Ha! Look at you. I'm sure your boss helped a little.",
            reaction_ko: '하! 대단하네. 그래도 상사가 좀 도와줬겠죠.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'Well, look at you! Big shot. Hey, did you catch the game last night? What a finish!',
        reply_ko: '와, 대단한데요! 거물이네. 참, 어젯밤 경기 봤어요? 마무리 끝내줬는데!'
      },
      {
        speaker: 'carl',
        situation: 'You did not see the football game. You were busy traveling.',
        situation_ko: '풋볼 경기를 못 봤습니다. 이동하느라 바빴습니다.',
        line: 'Did you catch the game? What a finish!',
        line_ko: '경기 봤어요? 마무리 끝내줬는데!',
        prompt: "You didn't see it. Be honest, and find out the result.",
        prompt_ko: '경기를 못 봤습니다. 솔직히 말하고 결과를 알아보세요.',
        model: 'No, I missed it. I was on a plane. Who won?',
        model_ko: '아뇨, 못 봤어요. 비행기 안이었거든요. 누가 이겼어요?',
        distractors: [
          {
            text: 'Yeah, what a game! Did you see that last play?',
            text_ko: '네, 경기 대박이었죠! 마지막 플레이 봤어요?',
            reaction: 'Which one? The big catch or the field goal?',
            reaction_ko: '어떤 거요? 그 멋진 캐치요, 필드골이요?'
          },
          {
            text: "No. I don't really care about football, sorry.",
            text_ko: '아뇨. 풋볼엔 별 관심이 없어서요, 미안해요.',
            reaction: "Oh. Well, fair enough. Not everybody's a fan.",
            reaction_ko: '아. 뭐, 그럴 수 있죠. 다들 팬은 아니니까.'
          },
          {
            text: 'No, I missed it. I was at the office late. Who won?',
            text_ko: '아뇨, 못 봤어요. 회사에서 늦게까지 있었거든요. 누가 이겼어요?',
            reaction: 'At the office? I thought you were out of town.',
            reaction_ko: '회사에요? 출장 간 줄 알았는데.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: "We did, with a field goal in overtime! Hey, I'm grilling this afternoon. Want to come over?",
        reply_ko: '우리가 이겼죠, 연장전 필드골로! 참, 오늘 오후에 고기 굽는데 올래요?'
      },
      {
        speaker: 'carl',
        situation: 'Carl is inviting you to his backyard barbecue.',
        situation_ko: '칼이 뒷마당 바비큐에 초대합니다.',
        line: "Nothing fancy. Burgers, hot dogs, a few neighbors. Four o'clock?",
        line_ko: '별거 없어요. 버거, 핫도그, 이웃 몇 명. 4시 어때요?',
        prompt: "You'd like to go. Offer to contribute something.",
        prompt_ko: '가고 싶습니다. 뭔가 보태겠다고 하세요.',
        model: "I'd love to! What can I bring?",
        model_ko: '좋죠! 뭐 가져갈까요?',
        distractors: [
          {
            text: 'Sure! See you at seven, then.',
            text_ko: '좋아요! 그럼 7시에 봬요.',
            reaction: "Seven? No, four! The burgers'll be gone by seven.",
            reaction_ko: '7시요? 아니, 4시요! 7시면 버거 다 없어져요.'
          },
          {
            text: "I'd love to, but I'm totally wiped.",
            text_ko: '가고 싶은데 완전 지쳤어요.',
            reaction: 'No worries. Rest up. Maybe next time.',
            reaction_ko: '괜찮아요. 푹 쉬어요. 다음에 오면 되죠.'
          },
          {
            text: 'Sure. Will there be real food, too?',
            text_ko: '제대로 된 음식도 있죠?',
            reaction: 'Hey, burgers are real food! But okay…',
            reaction_ko: '이봐요, 버거도 제대로 된 음식이에요! 뭐, 알았어요…'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'Just yourself. Maybe some chips if you want. See you at four!',
        reply_ko: '몸만 와요. 원하면 칩 정도요. 4시에 봐요!'
      },
      {
        speaker: 'carl',
        situation: "At four you show up in Carl's backyard with a bag of chips. The grill is smoking.",
        situation_ko: '4시에 칩 한 봉지를 들고 칼의 뒷마당에 갑니다. 그릴에서 연기가 납니다.',
        line: 'There you are! How do you like your burger?',
        line_ko: '왔네요! 버거는 어떻게 해 줄까요?',
        prompt: 'Tell him how you like it: with cheese, cooked all the way through.',
        prompt_ko: '어떻게 먹고 싶은지 말하세요. 치즈를 얹고 속까지 완전히 익혀서요.',
        model: "With cheese, please. Well done, if that's okay.",
        model_ko: '치즈 넣어 주세요. 괜찮으면 바싹 익혀서요.',
        distractors: [
          {
            text: "With cheese, please. Medium rare, if that's okay.",
            text_ko: '치즈 넣어 주세요. 괜찮으면 미디엄 레어로요.',
            reaction: 'Medium rare, you got it. Nice and pink in the middle.',
            reaction_ko: '미디엄 레어, 알겠어요. 속은 분홍빛으로.'
          },
          {
            text: 'Oh, I brought chips. Where should I put them?',
            text_ko: '아, 칩 가져왔어요. 어디 둘까요?',
            reaction: 'Just on the table there. Thanks! So, how do you want your burger?',
            reaction_ko: '저 테이블에 두면 돼요. 고마워요! 그래서 버거는 어떻게 해 줄까요?'
          },
          {
            text: 'Well done, with cheese. And not too greasy, okay?',
            text_ko: '바싹 익혀서 치즈 넣고요. 너무 기름지지 않게요, 알았죠?',
            reaction: "Ha, I'll do my best, chef.",
            reaction_ko: '하, 최선을 다해 보죠, 셰프님.'
          }
        ],
        reply_speaker: 'carl',
        reply_line: 'Coming right up. Grab a drink from the cooler and make yourself at home.',
        reply_ko: '금방 돼요. 아이스박스에서 음료 꺼내고 편하게 있어요.'
      }
    ],
    phrases: [
      {
        id: 'w_neighbor_bbq.catch_the_game',
        text: 'Did you catch the game?',
        meaning_ko: '경기 봤어요?',
        note: 'Catch = watch. In fall, the game usually means American football.',
        note_ko: 'catch는 본다는 뜻입니다. 가을에 the game은 보통 미식축구입니다.',
        category: 'small-talk'
      },
      {
        id: 'w_neighbor_bbq.closed_the_deal',
        text: 'We closed the deal!',
        meaning_ko: '계약을 따냈어요!',
        note: 'Close a deal = successfully finish a sale or agreement.',
        note_ko: 'close a deal은 거래를 성사시킨다는 뜻입니다.',
        category: 'negotiation'
      },
      {
        id: 'w_neighbor_bbq.come_over',
        text: 'Want to come over?',
        meaning_ko: '우리 집에 올래요?',
        note: "Come over = visit someone's home.",
        note_ko: 'come over는 누군가의 집에 놀러 간다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'w_neighbor_bbq.hey_stranger',
        text: 'Hey, stranger!',
        meaning_ko: '오랜만이에요!',
        note: "A friendly greeting for someone you haven't seen in a while.",
        note_ko: '한동안 못 본 사람에게 하는 친근한 인사입니다.',
        category: 'small-talk'
      },
      {
        id: 'w_neighbor_bbq.just_got_back',
        text: 'I just got back last night.',
        meaning_ko: '어젯밤에 막 돌아왔어요.',
        note: 'Get back = return from a trip.',
        note_ko: 'get back은 여행에서 돌아온다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'w_neighbor_bbq.make_yourself_at_home',
        text: 'Make yourself at home.',
        meaning_ko: '편하게 있어요.',
        note: 'Said by a host to a guest.',
        note_ko: '집주인이 손님에게 하는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'w_neighbor_bbq.what_a_finish',
        text: 'What a finish!',
        meaning_ko: '마무리 끝내줬죠!',
        note: 'An exciting end to a game.',
        note_ko: '경기의 짜릿한 끝을 말합니다.',
        category: 'small-talk'
      },
      {
        id: 'w_neighbor_bbq.what_can_i_bring',
        text: 'What can I bring?',
        meaning_ko: '뭐 가져갈까요?',
        note: 'Americans often bring chips, drinks or a side dish to a barbecue.',
        note_ko: '미국인은 바비큐에 칩, 음료, 곁들임 음식을 자주 가져갑니다.',
        category: 'small-talk'
      }
    ]
  },
  {
    id: 'd15_trip_report',
    title: 'Trip report at standup',
    title_ko: '스탠드업에서 출장 보고',
    place: 'office_desk_team',
    npc: 'derek',
    day_from: 15,
    day_to: 15,
    time_from: '09:00',
    time_to: '11:00',
    requires: 'd12_signing',
    summary: 'Back at the office, tell the team how the Ridgeport trip went and what it means for the sprint.',
    summary_ko: '사무실로 돌아와 리지포트 출장 결과와 이번 스프린트에 미칠 영향을 팀에 알리세요.',
    sort: 1510,
    tags: 'meeting,standup,week3',
    calendar: { day: 15, time: '09:30', title: 'Standup: trip report', title_ko: '스탠드업: 출장 보고' },
    turns: [
      {
        speaker: 'derek',
        situation: 'It is the Monday standup. Everyone wants to hear about Ridgeport.',
        situation_ko: '월요일 스탠드업입니다. 모두 리지포트 이야기를 듣고 싶어 합니다.',
        line: 'Welcome back! So, how was the trip? Give us the highlights.',
        line_ko: '돌아온 걸 환영해요! 그래서 출장 어땠어요? 하이라이트만 들려줘요.',
        prompt: 'Give the team the headline: the deal is done, and the first phase starts next week.',
        prompt_ko: '팀에 핵심을 전하세요. 계약이 끝났고, 첫 단계는 다음 주에 시작합니다.',
        model: 'It went great. The contract is signed, and phase one kicks off next week.',
        model_ko: '아주 잘 됐어요. 계약 체결됐고, 1단계는 다음 주에 시작해요.',
        distractors: [
          {
            text: 'Really well. We signed, and phase one starts first thing tomorrow morning.',
            text_ko: '정말 잘 됐어요. 계약했고, 1단계는 내일 아침부터 바로 시작해요.',
            reaction: 'Tomorrow? Wait, I thought kickoff was next week.',
            reaction_ko: '내일이요? 잠깐, 킥오프는 다음 주인 줄 알았는데.'
          },
          {
            text: 'Long story. The hotel was nice, and the client dinner was amazing.',
            text_ko: '얘기하자면 길어요. 호텔 좋았고, 고객 저녁은 끝내줬어요.',
            reaction: 'Ha, glad you ate well. But did we get the deal?',
            reaction_ko: '하, 잘 먹었다니 다행이네. 근데 계약은 따낸 거예요?'
          },
          {
            text: 'Honestly, I carried the whole thing. Greg basically loved me.',
            text_ko: '솔직히 제가 다 했죠. 그렉이 저를 완전 좋아했어요.',
            reaction: 'Ha, okay, hotshot. So we got it?',
            reaction_ko: '하, 그래요, 잘난 양반. 그래서 따낸 거죠?'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Awesome! What does that mean for our sprint?',
        reply_ko: '멋지다! 우리 스프린트엔 어떤 의미예요?'
      },
      {
        speaker: 'derek',
        situation: 'The dashboard is due on November first.',
        situation_ko: '대시보드 마감은 11월 1일입니다.',
        line: 'What does that mean for our sprint?',
        line_ko: '우리 스프린트엔 어떤 의미예요?',
        prompt: "Tell the team what to focus on now, and when it's due.",
        prompt_ko: '이제 무엇에 집중해야 하고 마감이 언제인지 팀에 말하세요.',
        model: 'The dashboard is our top priority now. The deadline is November first.',
        model_ko: '이제 대시보드가 최우선이에요. 마감은 11월 1일이에요.',
        distractors: [
          {
            text: 'Everything else waits. The dashboard is due on November fifteenth.',
            text_ko: '나머지는 다 미뤄요. 대시보드 마감은 11월 15일이에요.',
            reaction: 'The fifteenth? My notes say November first.',
            reaction_ko: '15일이요? 제 메모엔 11월 1일인데.'
          },
          {
            text: 'We all need to work weekends until the dashboard ships, no exceptions.',
            text_ko: '대시보드 나갈 때까지 다들 주말에도 일해야 해요. 예외 없이요.',
            reaction: "Whoa. Weekends? Let's talk to Maya before we promise that.",
            reaction_ko: '워. 주말에도요? 그런 약속은 마야랑 얘기하고 해요.'
          },
          {
            text: "Not much changes. Let's keep going with the sprint as planned.",
            text_ko: '크게 달라지는 건 없어요. 계획대로 스프린트 계속 가죠.',
            reaction: "Really? A signed contract doesn't change anything?",
            reaction_ko: '정말요? 계약까지 했는데 달라지는 게 없다고요?'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Got it. Oh, and I fixed that store ID bug while you were out, by the way.',
        reply_ko: '알겠어요. 아, 그리고 당신 없는 동안 매장 ID 버그 고쳐 뒀어요.'
      },
      {
        speaker: 'derek',
        situation: 'Derek covered for you while you were away.',
        situation_ko: '출장 중에 데릭이 당신 일을 맡아 주었습니다.',
        line: 'It was a quick fix. No big deal.',
        line_ko: '금방 고친 거예요. 별거 아니에요.',
        prompt: "He's playing it down, but he handled your work while you were away. Show you appreciate it.",
        prompt_ko: '별일 아니라지만, 출장 중에 당신 일을 처리해 줬습니다. 고마움을 표하세요.',
        model: 'Thanks for covering for me. I owe you one.',
        model_ko: '대신 맡아 줘서 고마워요. 신세 졌네요.',
        distractors: [
          {
            text: 'Cool. I was going to fix it when I got back.',
            text_ko: '그래요. 돌아와서 고치려고 했는데.',
            reaction: "Uh, okay. You're welcome, I guess.",
            reaction_ko: '어, 그래요. 천만에요, 라고 해야 하나.'
          },
          {
            text: "Thanks. Somebody should've told me it was broken.",
            text_ko: '고마워요. 고장 났으면 누가 말해 줬어야죠.',
            reaction: 'Hey, nobody needed to tell you. You were traveling.',
            reaction_ko: '에이, 말할 필요 없었죠. 출장 중이었잖아요.'
          },
          {
            text: 'Right, no big deal. Anything else for standup?',
            text_ko: '그렇죠, 별거 아니죠. 스탠드업 더 할 거 있어요?',
            reaction: "Ha, sure. A thank-you would've been nice, but okay.",
            reaction_ko: '하, 그래요. 고맙다는 말 정도는 들을 줄 알았는데, 뭐.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Anytime. Alright, that's standup. Let's go build this thing.",
        reply_ko: '언제든지요. 자, 스탠드업 끝. 이제 만들러 갑시다.'
      }
    ],
    phrases: [
      {
        id: 'd15_trip_report.anytime',
        text: 'Anytime.',
        meaning_ko: '언제든지요.',
        note: 'A friendly reply to thanks.',
        note_ko: '감사 인사에 대한 친근한 대답입니다.',
        category: 'small-talk'
      },
      {
        id: 'd15_trip_report.highlights',
        text: 'Give us the highlights.',
        meaning_ko: '핵심만 말해 줘요.',
        note: 'Highlights = the most important or interesting parts.',
        note_ko: 'highlights는 가장 중요하거나 흥미로운 부분입니다.',
        category: 'meeting'
      },
      {
        id: 'd15_trip_report.kicks_off',
        text: 'Phase one kicks off next week.',
        meaning_ko: '1단계가 다음 주에 시작돼요.',
        note: 'Kick off = start. Kickoff (noun) = a first meeting.',
        note_ko: 'kick off는 시작하다, kickoff(명사)는 첫 회의입니다.',
        category: 'meeting'
      },
      {
        id: 'd15_trip_report.owe_you_one',
        text: 'I owe you one.',
        meaning_ko: '신세 졌어요.',
        note: 'You did me a favor, and I will return it.',
        note_ko: '도움을 받았으니 갚겠다는 뜻입니다.',
        category: 'small-talk'
      },
      {
        id: 'd15_trip_report.top_priority',
        text: 'The dashboard is our top priority.',
        meaning_ko: '대시보드가 최우선이에요.',
        note: 'Top priority = the most important task.',
        note_ko: 'top priority는 가장 중요한 일입니다.',
        category: 'meeting'
      },
      {
        id: 'd15_trip_report.welcome_back',
        text: 'Welcome back!',
        meaning_ko: '돌아온 걸 환영해요!',
        note: 'Said to someone returning from a trip or time off.',
        note_ko: '출장이나 휴가에서 돌아온 사람에게 하는 말입니다.',
        category: 'office'
      },
      {
        id: 'd15_trip_report.while_you_were_out',
        text: 'while you were out',
        meaning_ko: '당신이 없는 동안',
        note: 'Out = not in the office.',
        note_ko: 'out은 사무실에 없다는 뜻입니다.',
        category: 'office'
      }
    ]
  },
  {
    id: 'd15_expenses',
    title: 'Expense report and your paycheck',
    title_ko: '경비 정산과 급여 질문',
    place: 'office_hr',
    npc: 'linda',
    day_from: 15,
    day_to: 15,
    time_from: '09:30',
    time_to: '17:30',
    requires: 'd12_flight_home',
    summary: 'Submit your trip expenses to Linda and ask about your paycheck: taxes, net pay and the 401(k) match. Your out-of-pocket costs ($118) are reimbursed.',
    summary_ko: '린다에게 출장 경비를 제출하고 급여에 대해 물어보세요. 세금, 실수령액, 401(k) 매칭. 개인 부담 비용 118달러가 환급됩니다.',
    reward: 118,
    sort: 1520,
    tags: 'hr,expenses,payday,money,week3',
    calendar: { day: 15, time: '11:00', title: 'Expense report with Linda', title_ko: '린다와 경비 정산' },
    turns: [
      {
        speaker: 'linda',
        situation: 'You bring your trip receipts to Linda in HR.',
        situation_ko: '출장 영수증을 들고 인사팀 린다에게 갑니다.',
        line: 'Hi there! What can I do for you?',
        line_ko: '안녕하세요! 뭘 도와줄까요?',
        prompt: "Tell Linda why you're here: you have costs from the Ridgeport trip to claim.",
        prompt_ko: '왜 왔는지 말하세요. 리지포트 출장 비용을 청구하려고 합니다.',
        model: "Hi Linda. I'd like to submit an expense report for my trip to Ridgeport.",
        model_ko: '안녕하세요, 린다. 리지포트 출장 경비 보고서를 제출하고 싶어요.',
        distractors: [
          {
            text: "Hi Linda. I'd like to request some vacation days for next month.",
            text_ko: '안녕하세요, 린다. 다음 달에 휴가를 좀 신청하고 싶어요.',
            reaction: "Vacation? Sure. But aren't those receipts in your hand?",
            reaction_ko: '휴가요? 그래요. 근데 손에 든 건 영수증 아니에요?'
          },
          {
            text: "Hi, Linda. I'd like to turn in an expense report for my trip to Fairview.",
            text_ko: '안녕하세요, 린다. 페어뷰 출장 경비 보고서를 제출하고 싶어요.',
            reaction: "Fairview? That's here. Don't you mean Ridgeport?",
            reaction_ko: '페어뷰요? 여기잖아요. 리지포트 말하는 거죠?'
          },
          {
            text: 'Hi. I paid for a bunch of trip stuff myself. When do I get my money?',
            text_ko: '안녕하세요. 출장 때 제 돈으로 낸 게 많은데, 돈은 언제 받아요?',
            reaction: "Okay… let's start with an expense report, then.",
            reaction_ko: '그래요… 그럼 경비 보고서부터 시작하죠.'
          }
        ],
        reply_speaker: 'linda',
        reply_line: 'Sure! Did you keep all your receipts?',
        reply_ko: '그럼요! 영수증은 다 챙겼어요?'
      },
      {
        speaker: 'linda',
        situation: 'You have every receipt except one: the rideshare from the airport.',
        situation_ko: '영수증이 다 있는데 하나, 공항에서 탄 차량 호출 영수증이 없습니다.',
        line: 'Do you have receipts for everything?',
        line_ko: '영수증은 다 있어요?',
        prompt: "Be honest about the one receipt you're missing, and ask how to handle it.",
        prompt_ko: '없는 영수증 하나를 솔직히 말하고, 어떻게 처리하면 되는지 물어보세요.',
        model: 'Almost. I lost the receipt for the rideshare from the airport. What should I do?',
        model_ko: '거의요. 공항에서 탄 차량 호출 영수증을 잃어버렸어요. 어떻게 하면 돼요?',
        distractors: [
          {
            text: "Almost. I'm actually missing the hotel receipt. Can I just leave that one out, then?",
            text_ko: '거의요. 호텔 영수증이 없어요. 그럼 그건 그냥 빼도 돼요?',
            reaction: "The hotel? Didn't they email you an itemized receipt?",
            reaction_ko: '호텔이요? 항목별 영수증을 메일로 받지 않았어요?'
          },
          {
            text: "Yes, everything's here. I'll just write the rideshare amount by hand.",
            text_ko: '네, 다 있어요. 차량 호출 금액만 손으로 적어 넣을게요.',
            reaction: "Handwritten amounts won't fly, I'm afraid. We need proof.",
            reaction_ko: '손으로 적은 금액은 안 돼요. 증빙이 있어야 해요.'
          },
          {
            text: 'Yes, all of them. Do you need the originals, or are copies okay?',
            text_ko: '네, 전부 있어요. 원본이 필요해요, 아니면 사본도 돼요?',
            reaction: "Copies are fine. So you've got every single one, then?",
            reaction_ko: '사본도 돼요. 그럼 하나도 빠짐없이 다 있는 거죠?'
          }
        ],
        reply_speaker: 'linda',
        reply_line: 'No problem. The ride app keeps a copy in your trip history. Just download it from there.',
        reply_ko: '괜찮아요. 앱의 이용 기록에 사본이 있어요. 거기서 내려받으면 돼요.'
      },
      {
        speaker: 'linda',
        situation: 'Your meals stayed under the $65 limit, and the client dinner went on the company card.',
        situation_ko: '식비는 65달러 한도 이내였고, 고객 저녁은 법인 카드로 냈습니다.',
        line: 'Did you go over the per diem on any day?',
        line_ko: '하루라도 일비 한도를 넘은 날 있어요?',
        prompt: 'Answer her question, and mention how the client dinner was paid.',
        prompt_ko: '질문에 답하고, 고객 저녁은 어떻게 결제했는지도 말하세요.',
        model: 'No, I stayed under the per diem. The client dinner was on the company card.',
        model_ko: '아뇨, 한도 안에서 썼어요. 고객 저녁은 법인 카드로 냈어요.',
        distractors: [
          {
            text: 'No, I stayed under it every day. I put the client dinner on my own card, though.',
            text_ko: '아뇨, 매일 한도 안이었어요. 고객 저녁은 제 개인 카드로 냈지만요.',
            reaction: "Your own card? Client meals should've gone on the company card.",
            reaction_ko: '개인 카드요? 고객 식사는 법인 카드로 했어야죠.'
          },
          {
            text: 'Just once, at the client dinner. That came to $164 before tip.',
            text_ko: '딱 한 번, 고객 저녁 때요. 팁 빼고 164달러 나왔어요.',
            reaction: "Wait, didn't that one go on the company card?",
            reaction_ko: '잠깐, 그건 법인 카드로 내지 않았어요?'
          },
          {
            text: "Sorry, what's the per diem again? I just kept all my receipts.",
            text_ko: '죄송한데, 일비가 뭐였죠? 영수증은 그냥 다 챙겼어요.',
            reaction: "It's your daily meal limit, sixty-five dollars. Did you go over?",
            reaction_ko: '하루 식비 한도요, 65달러. 넘은 적 있어요?'
          }
        ],
        reply_speaker: 'linda',
        reply_line: "Perfect. You'll be reimbursed by direct deposit. Anything else?",
        reply_ko: '완벽해요. 계좌로 환급될 거예요. 또 필요한 거 있어요?'
      },
      {
        speaker: 'linda',
        situation: 'Your first paycheck came in two weeks ago, and it was much lower than the salary in your offer letter.',
        situation_ko: '2주 전에 첫 급여가 들어왔는데 제안서의 연봉보다 훨씬 적었습니다.',
        line: 'Anything else?',
        line_ko: '또 필요한 거 있어요?',
        prompt: 'Bring up your first paycheck: it was much smaller than your offer letter made you think. Find out why.',
        prompt_ko: '첫 급여 이야기를 꺼내세요. 제안서를 보고 생각한 것보다 훨씬 적었습니다. 이유를 알아보세요.',
        model: 'Yes, actually. My paycheck is lower than I expected. Why is that?',
        model_ko: '네, 사실 있어요. 급여가 생각보다 적게 들어왔어요. 왜 그런 거예요?',
        distractors: [
          {
            text: 'Yes. I think payroll made a mistake. My paycheck is way too low.',
            text_ko: '네. 급여팀이 실수한 것 같아요. 월급이 너무 적게 들어왔어요.',
            reaction: "A mistake? Let's look first. It's probably just taxes.",
            reaction_ko: '실수요? 먼저 봐요. 아마 세금 때문일 거예요.'
          },
          {
            text: "Yes. My first paycheck still hasn't come in yet. When will I get paid?",
            text_ko: '네. 첫 급여가 아직 안 들어왔어요. 언제 받을 수 있어요?',
            reaction: 'Hmm, I see a deposit two weeks ago. Did you check your bank?',
            reaction_ko: '음, 2주 전에 입금된 게 보이는데요. 은행 확인해 봤어요?'
          },
          {
            text: 'Yes, actually. Can I get my salary raised? It seems really low.',
            text_ko: '네, 사실은요. 연봉 좀 올려 줄 수 있어요? 너무 적은 것 같아요.',
            reaction: "That's a conversation for your manager, not me.",
            reaction_ko: '그건 저 말고 매니저랑 할 얘기예요.'
          }
        ],
        reply_speaker: 'linda',
        reply_line: "That's gross versus net. Federal and state taxes, Social Security, Medicare and your 401(k) all come out before it hits your account.",
        reply_ko: '세전과 세후의 차이예요. 연방·주 소득세, 사회보장세, 메디케어, 401(k)가 계좌에 들어가기 전에 빠져요.'
      },
      {
        speaker: 'linda',
        situation: 'Linda checks your benefits page. Open enrollment for the plans that start in November closes this Friday.',
        situation_ko: '린다가 복리후생 페이지를 확인합니다. 11월에 시작하는 플랜의 정기 가입이 이번 주 금요일에 끝납니다.',
        line: "Your four percent gets you the full 401(k) match, so that part's fine. But don't forget open enrollment. It closes on Friday.",
        line_ko: '4%를 넣고 있으니 401(k) 매칭은 다 받고 있어요. 그건 됐고요. 그런데 정기 가입 잊지 마요. 금요일에 끝나요.',
        prompt: 'Find out what happens if you miss the deadline.',
        prompt_ko: '마감을 놓치면 어떻게 되는지 알아보세요.',
        model: 'Good to know. What happens if I miss the deadline?',
        model_ko: '알아 둘게요. 마감을 놓치면 어떻게 돼요?',
        distractors: [
          {
            text: 'Good to know. My plan just carries over if I do nothing, right?',
            text_ko: '알아 둘게요. 아무것도 안 하면 지금 플랜이 그대로 이어지는 거죠?',
            reaction: 'Not this year. The plans change on November first, so everyone picks again.',
            reaction_ko: '올해는 아니에요. 11월 1일에 플랜이 바뀌어서 다들 다시 골라야 해요.'
          },
          {
            text: 'Good to know. Could you pick a plan for me, then?',
            text_ko: '알아 둘게요. 그럼 플랜을 대신 골라 주실 수 있어요?',
            reaction: 'I wish I could! It has to be your choice. It only takes ten minutes.',
            reaction_ko: '그러고 싶지만 안 돼요! 본인이 골라야 해요. 10분이면 돼요.'
          },
          {
            text: 'Good to know. Can I switch plans any time after that?',
            text_ko: '알아 둘게요. 그 뒤에도 아무 때나 플랜을 바꿀 수 있죠?',
            reaction: 'Only at the next open enrollment, or after a life event, like getting married.',
            reaction_ko: '다음 정기 가입 때나, 결혼 같은 생활의 변화가 있을 때만 돼요.'
          }
        ],
        reply_speaker: 'linda',
        reply_line: "You'd get the Basic HMO, just you, with no dental or vision, until next fall. So log in to the HR portal before Friday!",
        reply_ko: '치과·안과 보험 없이 본인만 베이식 HMO에 가입되고, 내년 가을까지 그대로예요. 그러니 금요일 전에 HR 포털에 들어가 봐요!'
      }
    ],
    phrases: [
      {
        id: 'd15_expenses.free_money',
        text: "That's free money.",
        meaning_ko: '공짜 돈이잖아요.',
        note: 'Something you get without extra cost.',
        note_ko: '추가 비용 없이 받는 돈입니다.',
        category: 'money'
      },
      {
        id: 'd15_expenses.full_match',
        text: 'to get the full match',
        meaning_ko: '회사 매칭을 전부 받으려고',
        note: 'Many US companies add money to your 401(k) retirement account up to a limit.',
        note_ko: '미국 회사는 401(k) 퇴직연금에 일정 한도까지 돈을 보태 줍니다.',
        category: 'money'
      },
      {
        id: 'd15_expenses.gross_net',
        text: "That's gross versus net.",
        meaning_ko: '세전과 세후의 차이예요.',
        note: 'Gross = before deductions. Net = what you take home.',
        note_ko: 'gross는 공제 전, net은 실수령액입니다.',
        category: 'money'
      },
      {
        id: 'd15_expenses.lost_receipt',
        text: 'I lost the receipt.',
        meaning_ko: '영수증을 잃어버렸어요.',
        note: 'Apps and cards usually keep a digital copy.',
        note_ko: '앱이나 카드사에 보통 전자 사본이 있습니다.',
        category: 'hr'
      },
      {
        id: 'd15_expenses.reimbursed',
        text: "You'll be reimbursed by direct deposit.",
        meaning_ko: '계좌로 환급될 거예요.',
        note: 'Direct deposit = money sent straight to your bank account.',
        note_ko: 'direct deposit은 은행 계좌로 바로 입금되는 것입니다.',
        category: 'hr'
      },
      {
        id: 'd15_expenses.submit_expenses',
        text: "I'd like to submit an expense report.",
        meaning_ko: '경비 보고서를 제출하고 싶어요.',
        note: 'An expense report lists the work costs you paid yourself.',
        note_ko: '경비 보고서는 업무로 직접 낸 비용을 정리한 것입니다.',
        category: 'hr'
      },
      {
        id: 'd15_expenses.take_home',
        text: 'take-home pay',
        meaning_ko: '실수령액',
        note: 'The amount that actually reaches your bank account.',
        note_ko: '실제로 계좌에 들어오는 금액입니다.',
        category: 'money'
      },
      {
        id: 'd15_expenses.under_per_diem',
        text: 'I stayed under the per diem.',
        meaning_ko: '식비 한도를 넘지 않았어요.',
        note: 'Go over = spend more than allowed. Stay under = spend less.',
        note_ko: 'go over는 초과, stay under는 이내라는 뜻입니다.',
        category: 'hr'
      }
    ]
  },
  {
    id: 'd15_sick_call',
    title: 'Calling in sick',
    title_ko: '병가 전화',
    place: 'home_desk',
    npc: 'maya',
    day_from: 15,
    day_to: 15,
    time_from: '19:00',
    time_to: '22:45',
    summary: 'You come down with a fever on Monday night. Call Maya, take a sick day tomorrow, and arrange cover for your meeting.',
    summary_ko: '월요일 밤 열이 납니다. 마야에게 전화해 내일 병가를 내고, 회의를 대신할 사람을 정하세요.',
    sort: 1540,
    tags: 'hr,phone,sick,week3',
    turns: [
      {
        speaker: 'maya',
        situation: 'It is Monday night. You have a fever and a sore throat, so you call Maya from home.',
        situation_ko: '월요일 밤입니다. 열이 나고 목이 아파서 집에서 마야에게 전화합니다.',
        line: "Hey, it's Maya. Everything okay?",
        line_ko: '여보세요, 마야예요. 별일 없죠?',
        prompt: "It's late. Apologize for the hour, and tell her how you're feeling.",
        prompt_ko: '늦은 시간입니다. 늦게 전화해 미안하다고 하고, 몸 상태를 말하세요.',
        model: "Hi Maya. Sorry to call so late. I'm not feeling well. I have a fever and a sore throat.",
        model_ko: '마야, 안녕하세요. 늦게 전화해서 죄송해요. 몸이 안 좋아요. 열이 나고 목이 아파요.',
        distractors: [
          {
            text: "Hey, sorry for the late call. I've got a terrible stomach bug and can't keep food down.",
            text_ko: '늦게 전화해서 죄송해요. 장염이 심하게 걸려서 아무것도 못 먹겠어요.',
            reaction: 'Oh no, a stomach bug? You poor thing.',
            reaction_ko: '어머, 장염이요? 고생이 많네요.'
          },
          {
            text: "Hi Maya. Sorry, but I think I'm dying here. Worst fever of my life. I can barely talk.",
            text_ko: '마야, 죄송한데 저 죽을 것 같아요. 살면서 이런 열은 처음이에요. 말도 겨우 해요.',
            reaction: 'Oh no! Do you need to go to urgent care?',
            reaction_ko: '어머! 응급 진료소라도 가야 하는 거 아니에요?'
          },
          {
            text: "Hi Maya. Quick question about tomorrow's planning meeting. Is it still at ten?",
            text_ko: '마야, 안녕하세요. 내일 기획 회의 때문에 잠깐 여쭤볼게요. 아직 10시 맞죠?',
            reaction: "It is. But it's late. Is everything okay? You sound awful.",
            reaction_ko: '맞아요. 근데 시간이 늦었잖아요. 괜찮아요? 목소리가 안 좋아요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "Oh no, I'm sorry to hear that. Do you want to take tomorrow off?",
        reply_ko: '어머, 안됐네요. 내일 쉴래요?'
      },
      {
        speaker: 'maya',
        situation: 'You need rest, not meetings.',
        situation_ko: '회의가 아니라 휴식이 필요합니다.',
        line: 'Do you want to take tomorrow off?',
        line_ko: '내일 쉴래요?',
        prompt: 'You need to rest. Answer her offer.',
        prompt_ko: '쉬어야 합니다. 그녀의 제안에 답하세요.',
        model: "Yes, I think I'm going to take a sick day tomorrow.",
        model_ko: '네, 내일은 병가를 내야 할 것 같아요.',
        distractors: [
          {
            text: "No, I'll be fine. I'll just come in and take it easy.",
            text_ko: '아뇨, 괜찮아요. 그냥 출근해서 살살 할게요.',
            reaction: "Please don't. You'll just get everyone else sick.",
            reaction_ko: '제발 그러지 마요. 다른 사람들까지 아파져요.'
          },
          {
            text: "Maybe I'll take the whole week off, just in case.",
            text_ko: '혹시 모르니 이번 주를 통째로 쉴까 봐요.',
            reaction: "Let's start with tomorrow and see how you feel.",
            reaction_ko: '일단 내일만 쉬고 상태를 봐요.'
          },
          {
            text: "Can I decide in the morning? I'll text you at nine.",
            text_ko: '아침에 정해도 돼요? 9시에 문자 드릴게요.',
            reaction: "I'd rather know now so I can plan. Just take it.",
            reaction_ko: '계획을 세워야 하니 지금 알고 싶어요. 그냥 쉬어요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Of course. Just rest. Is there anything that needs covering?',
        reply_ko: '그럼요. 푹 쉬어요. 대신 맡아야 할 일 있어요?'
      },
      {
        speaker: 'maya',
        situation: 'You have the phase one planning meeting at ten tomorrow.',
        situation_ko: '내일 10시에 1단계 기획 회의가 있습니다.',
        line: 'Is there anything that needs covering?',
        line_ko: '대신 맡아야 할 일 있어요?',
        prompt: "Your ten o'clock meeting needs someone to run it, and Derek knows the project. Also say how she can still reach you if it's urgent.",
        prompt_ko: '10시 회의를 맡을 사람이 필요하고, 데릭이 프로젝트를 잘 압니다. 급한 일이 생기면 어떻게 연락이 닿는지도 말하세요.',
        model: "Could Derek cover the planning meeting at ten? I'll check email if anything is urgent.",
        model_ko: '데릭이 10시 기획 회의를 대신 맡아 줄 수 있을까요? 급한 일 있으면 메일은 확인할게요.',
        distractors: [
          {
            text: "Just the client call at ten. Could Derek take it? I'll be on email if anything's urgent.",
            text_ko: '10시 고객 통화만요. 데릭이 맡아 줄 수 있을까요? 급한 일 있으면 메일 볼게요.',
            reaction: 'A client call? I thought it was the phase one planning meeting.',
            reaction_ko: '고객 통화요? 1단계 기획 회의인 줄 알았는데요.'
          },
          {
            text: "No, it's fine. I'll join the ten o'clock meeting from bed with my camera off.",
            text_ko: '아니에요, 괜찮아요. 10시 회의는 카메라 끄고 침대에서 들어갈게요.',
            reaction: "Absolutely not. You're on sick leave. Let's get you covered.",
            reaction_ko: '절대 안 돼요. 병가잖아요. 대신 맡을 사람을 정해요.'
          },
          {
            text: 'Can we just cancel the planning meeting? Nobody will miss it anyway, honestly.',
            text_ko: '기획 회의는 그냥 취소하면 안 돼요? 솔직히 아무도 아쉬워 안 할 거예요.',
            reaction: "We can't cancel it. Phase one starts soon. Who could run it?",
            reaction_ko: '취소는 못 해요. 곧 1단계 시작이잖아요. 누가 진행할 수 있어요?'
          }
        ],
        reply_speaker: 'maya',
        reply_line: "I'll ask Derek. Don't worry about work. Feel better, okay?",
        reply_ko: '데릭에게 부탁할게요. 일 걱정은 말고요. 얼른 나아요.'
      },
      {
        speaker: 'maya',
        situation: 'Maya is about to hang up.',
        situation_ko: '마야가 전화를 끊으려 합니다.',
        line: "Feel better, okay? Let me know how you're doing.",
        line_ko: '얼른 나아요, 알았죠? 상태 어떤지 알려 주고요.',
        prompt: "Say goodbye, and promise to let her know how you're doing.",
        prompt_ko: '작별 인사를 하고, 몸 상태를 알려 주겠다고 약속하세요.',
        model: "Thanks, Maya. I'll keep you posted.",
        model_ko: '고마워요, 마야. 계속 소식 전할게요.',
        distractors: [
          {
            text: 'Thanks. See you at ten tomorrow, then.',
            text_ko: '고마워요. 그럼 내일 10시에 봬요.',
            reaction: "No, you won't. You're taking the day, remember?",
            reaction_ko: '아니, 안 봐요. 내일 쉬기로 했잖아요, 기억나요?'
          },
          {
            text: "Fine. Just don't call me tomorrow, okay?",
            text_ko: '네. 내일은 전화하지 마세요, 알았죠?',
            reaction: "Oh, I wasn't planning to. Rest up.",
            reaction_ko: '아, 그럴 생각 없었어요. 푹 쉬어요.'
          },
          {
            text: "Thanks. I'll be back by noon, promise.",
            text_ko: '고마워요. 점심 전엔 복귀할게요, 약속해요.',
            reaction: "Don't rush it. Take the whole day.",
            reaction_ko: '서두르지 마요. 하루 통째로 쉬어요.'
          }
        ],
        reply_speaker: 'maya',
        reply_line: 'Take care. Get some sleep.',
        reply_ko: '몸조심해요. 푹 자고요.'
      }
    ],
    phrases: [
      {
        id: 'd15_sick_call.feel_better',
        text: 'Feel better!',
        meaning_ko: '얼른 나아요!',
        note: 'What you say to someone who is sick.',
        note_ko: '아픈 사람에게 하는 말입니다.',
        category: 'small-talk'
      },
      {
        id: 'd15_sick_call.keep_you_posted',
        text: "I'll keep you posted.",
        meaning_ko: '계속 소식 전할게요.',
        note: 'Keep someone posted = give them updates.',
        note_ko: 'keep someone posted는 계속 소식을 알린다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'd15_sick_call.needs_covering',
        text: 'Is there anything that needs covering?',
        meaning_ko: '대신 맡아야 할 일 있어요?',
        note: "Cover = handle someone else's work.",
        note_ko: 'cover는 다른 사람의 일을 맡는다는 뜻입니다.',
        category: 'office'
      },
      {
        id: 'd15_sick_call.not_feeling_well',
        text: "I'm not feeling well.",
        meaning_ko: '몸이 좋지 않아요.',
        note: 'The simplest way to say you are sick.',
        note_ko: '아프다는 것을 말하는 가장 간단한 방법입니다.',
        category: 'hr'
      },
      {
        id: 'd15_sick_call.sick_day',
        text: "I'm going to take a sick day.",
        meaning_ko: '병가를 낼게요.',
        note: 'US companies give a set number of paid sick days per year.',
        note_ko: '미국 회사는 1년에 정해진 수의 유급 병가를 줍니다.',
        category: 'hr'
      },
      {
        id: 'd15_sick_call.sore_throat',
        text: 'I have a fever and a sore throat.',
        meaning_ko: '열이 나고 목이 아파요.',
        note: 'Also: a cough, a headache, a stomachache.',
        note_ko: '그 밖에 a cough, a headache, a stomachache.',
        category: 'hr'
      },
      {
        id: 'd15_sick_call.under_the_weather',
        text: "I'm a bit under the weather.",
        meaning_ko: '몸이 좀 안 좋아요.',
        note: 'A softer, casual way to say you are sick.',
        note_ko: '아프다는 것을 부드럽고 가볍게 말하는 표현입니다.',
        category: 'hr'
      }
    ]
  }
];

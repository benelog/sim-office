// Work after the missions: meetings that come back (routines) and what comes up at your desk (tasks: a card
// with three choices).

export const routines = [
  {
    id: 'all_hands',
    title: 'All-hands meeting',
    title_ko: '전사 회의',
    days: 'thu',
    every: 'month',
    time: '16:00',
    place: 'office_meeting',
    episodes: 'rt_allhands_1,rt_allhands_2',
    people: 'maya,priya,derek,jun,tom,sam,linda',
    sort: 5
  },
  {
    id: 'one_on_one',
    title: '1:1 with Maya',
    title_ko: '마야와 1:1',
    days: 'thu',
    every: '2weeks',
    time: '11:00',
    place: 'office_manager',
    episodes: 'rt_1on1_jun_1,rt_1on1_jun_2,rt_1on1_jun_3,rt_1on1_dk_1,rt_1on1_dk_2,rt_1on1_dk_3,rt_1on1_pr_1,rt_1on1_pr_2,rt_1on1_pr_3',
    miss_points: 10,
    sort: 2
  },
  {
    id: 'planning',
    title: 'Sprint planning',
    title_ko: '스프린트 계획',
    days: 'mon',
    every: '2weeks',
    parity: 1,
    time: '13:30',
    place: 'office_meeting',
    episodes: 'rt_planning_dev_1,rt_planning_dev_2,rt_planning_pr_1,rt_planning_pr_2',
    people: 'priya,derek,jun,maya',
    miss_points: 10,
    sort: 3,
    hybrid_days: 'tue'
  },
  {
    id: 'retro',
    title: 'Sprint retro',
    title_ko: '스프린트 회고',
    days: 'fri',
    every: '2weeks',
    time: '15:00',
    place: 'office_meeting',
    episodes: 'rt_retro_1,rt_retro_2,rt_retro_3',
    people: 'maya,priya,derek,jun',
    sort: 4,
    hybrid_days: 'thu'
  },
  {
    id: 'standup',
    title: 'Daily standup',
    title_ko: '데일리 스탠드업',
    days: 'mon,tue,wed,thu,fri',
    time: '10:00',
    place: 'office_meeting',
    episodes: 'rt_standup_jun_1,rt_standup_jun_2,rt_standup_jun_3,rt_standup_jun_4,rt_standup_jun_5,rt_standup_dk_1,rt_standup_dk_2,rt_standup_dk_3,rt_standup_dk_4,rt_standup_dk_5,rt_standup_pr_1,rt_standup_pr_2,rt_standup_pr_3,rt_standup_pr_4,rt_standup_pr_5',
    people: 'priya,derek,jun',
    sort: 1,
    remote_episodes: 'rt_video_jun_1,rt_video_jun_2,rt_video_jun_3,rt_video_dk_1,rt_video_dk_2,rt_video_dk_3,rt_video_pr_1,rt_video_pr_2,rt_video_pr_3'
  }
];

export const tasks = [
  {
    id: 't_build_red',
    hero: 'jun,derek',
    kind: 'build',
    title: 'The build on main is red',
    title_ko: 'main 빌드가 빨간불',
    body: 'The build on main failed a few minutes after your merge. A unit test in the order service is failing, and two teammates are waiting to merge their own work.',
    body_ko: '내 변경을 머지하고 몇 분 뒤 main 빌드가 실패했습니다. 주문 서비스의 단위 테스트 하나가 실패하고, 동료 둘이 자기 작업을 머지하려고 기다리고 있어요.',
    choices: [
      {
        minutes: 25,
        points: 8,
        r: 'You post "Looking at it, my merge broke main." Twenty minutes later the fix is in and the build is green. Two people send a thumbs-up.',
        r_ko: '"보고 있어요, 제 머지 때문에 main이 깨졌어요"라고 올립니다. 20분 뒤 수정이 들어가고 빌드가 초록불이 됩니다. 두 사람이 엄지 이모지를 보냅니다.',
        t: "Post in the team channel that you're on it, then fix it or revert your change.",
        t_ko: '팀 채널에 내가 보고 있다고 올리고, 고치거나 내 변경을 되돌린다.'
      },
      {
        minutes: 20,
        points: -3,
        r: 'It fails the same way three times. By the time you open the test, a teammate has already reverted your change and asks you to speak up next time.',
        r_ko: '세 번 다 똑같이 실패합니다. 테스트를 열어 볼 즈음 동료가 이미 내 변경을 되돌려 놓고, 다음엔 먼저 말해 달라고 합니다.',
        t: 'Rerun the build a few times in case it was a fluke.',
        t_ko: '혹시 우연일지 몰라 빌드를 몇 번 다시 돌린다.'
      },
      {
        minutes: 0,
        points: -8,
        r: 'The build stays red all afternoon and nobody can merge. Maya asks in the channel who broke main, and the history points to you.',
        r_ko: '빌드가 오후 내내 빨간불이라 아무도 머지를 못 합니다. 마야가 채널에서 누가 main을 깨뜨렸냐고 묻고, 기록이 나를 가리킵니다.',
        t: 'Leave it. That test was probably flaky before your change.',
        t_ko: '그냥 둔다. 그 테스트는 원래 들쭉날쭉했을 거다.'
      }
    ],
    day_from: 3,
    sort: 100
  },
  {
    id: 't_dk_big_pr',
    hero: 'derek',
    kind: 'review',
    sender: 'jun',
    title: "Jun's biggest pull request yet",
    title_ko: '준의 가장 큰 풀 리퀘스트',
    body: 'Jun asked you to review his pull request: 600 lines across eleven files. Most of it is good, but two parts should really be separate changes.',
    body_ko: '준이 풀 리퀘스트 리뷰를 부탁했습니다. 파일 11개에 600줄이에요. 대부분 괜찮지만 두 부분은 따로 나눠야 할 변경입니다.',
    choices: [
      {
        minutes: 50,
        points: 8,
        r: "Jun splits it into three pull requests by the end of the day. They're easier to review, and he says he'll start smaller next time.",
        r_ko: '준이 그날 안에 세 개로 나눕니다. 리뷰하기 쉬워졌고, 다음엔 처음부터 작게 하겠다고 합니다.',
        t: "Review it today: say what's good, leave specific comments, and suggest splitting out the two parts.",
        t_ko: '오늘 리뷰한다. 잘된 점을 말하고, 구체적으로 댓글을 달고, 두 부분은 나누자고 제안한다.'
      },
      {
        minutes: 10,
        points: -4,
        r: 'It merges fast. A week later a bug turns up in one of the parts you skimmed.',
        r_ko: '빠르게 머지됩니다. 일주일 뒤 훑고 넘긴 부분에서 버그가 나옵니다.',
        t: 'Skim it and approve: "LGTM."',
        t_ko: '훑어보고 "LGTM"으로 승인한다.'
      },
      {
        minutes: 0,
        points: -6,
        r: 'Jun is blocked for three days and brings it up at standup. Maya asks you to make reviews a priority.',
        r_ko: '준이 사흘 동안 막혀 스탠드업에서 얘기를 꺼냅니다. 마야가 리뷰를 우선해 달라고 합니다.',
        t: "Leave it for next week. You're busy.",
        t_ko: '다음 주로 미룬다. 바쁘다.'
      }
    ],
    day_from: 4,
    sort: 109
  },
  {
    id: 't_dk_disk',
    hero: 'derek',
    kind: 'alert',
    title: 'The database disk is filling up',
    title_ko: '데이터베이스 디스크가 차 간다',
    body: "An alert: the reporting database is at 82% disk and grew 5% this week. At this rate it's full in about three weeks.",
    body_ko: '경보: 보고용 데이터베이스 디스크가 82%이고 이번 주에만 5% 늘었습니다. 이대로면 3주쯤 뒤에 가득 찹니다.',
    choices: [
      {
        minutes: 40,
        points: 8,
        r: 'An old log table is never cleaned up. You add a nightly cleanup job, and the graph flattens out.',
        r_ko: '오래된 로그 테이블이 한 번도 정리되지 않았습니다. 밤마다 정리하는 작업을 넣자 그래프가 평평해집니다.',
        t: "Open a ticket, find out what's growing, and plan a cleanup with the team.",
        t_ko: '티켓을 열고 무엇이 늘고 있는지 찾아서 팀과 정리 계획을 세운다.'
      },
      {
        minutes: 2,
        points: -3,
        r: "A week later it's at 88%, and now it's urgent.",
        r_ko: '일주일 뒤 88%가 되어 이제는 급한 일이 됩니다.',
        t: 'Silence the alert for a week.',
        t_ko: '경보를 일주일 동안 끈다.'
      },
      {
        minutes: 20,
        points: -7,
        r: 'The disk drops to 60%, but you deleted logs the support team needed for an open ticket. Maya asks you to go through a change ticket next time.',
        r_ko: '디스크는 60%로 내려가지만, 지원팀이 진행 중인 티켓에 필요했던 로그까지 지웠습니다. 마야가 다음엔 변경 티켓을 거쳐 달라고 합니다.',
        t: 'Log in to production and delete old logs by hand, without telling anyone.',
        t_ko: '아무에게도 말하지 않고 운영 서버에 들어가 오래된 로그를 손으로 지운다.'
      }
    ],
    day_from: 3,
    sort: 110
  },
  {
    id: 't_dk_question',
    hero: 'derek',
    kind: 'chat',
    sender: 'jun',
    title: 'A question in the middle of focus time',
    title_ko: '집중하는 중에 온 질문',
    body: "You're deep in a tricky bug when Jun messages: \"Do you have a minute? I don't get how the cache layer works.\"",
    body_ko: '까다로운 버그에 깊이 빠져 있는데 준이 메시지를 보냅니다. "잠깐 시간 돼요? 캐시 계층이 어떻게 돌아가는지 모르겠어요."',
    choices: [
      {
        minutes: 30,
        points: 8,
        r: 'You finish your bug, and the pairing session clears it up for Jun. He sends a thank-you and a diagram he drew.',
        r_ko: '버그를 마무리하고, 같이 보면서 준의 궁금증이 풀립니다. 준이 고맙다며 자기가 그린 그림을 보내 줍니다.',
        t: "\"Give me 20 minutes to finish this, then let's pair on it.\"",
        t_ko: '"이거 20분만 마무리하고 같이 봐요."'
      },
      {
        minutes: 45,
        points: 2,
        r: 'Jun gets his answer, but it takes you half an hour to find your place in the bug again.',
        r_ko: '준은 답을 얻지만, 나는 버그에서 어디까지 했는지 되찾는 데 30분이 걸립니다.',
        t: 'Drop everything and explain it right now.',
        t_ko: '하던 걸 다 내려놓고 지금 바로 설명한다.'
      },
      {
        minutes: 0,
        points: -6,
        r: 'Jun says "OK, thanks" and goes quiet. Two days later his pull request misuses the cache.',
        r_ko: '준은 "네, 고마워요" 하고 조용해집니다. 이틀 뒤 그의 풀 리퀘스트가 캐시를 잘못 씁니다.',
        t: "\"Just read the code. It's all there.\"",
        t_ko: '"그냥 코드를 읽어 봐요. 다 거기 있어요."'
      }
    ],
    day_from: 3,
    sort: 108
  },
  {
    id: 't_estimate',
    hero: 'jun,derek',
    kind: 'chat',
    sender: 'priya',
    title: 'How long will it take?',
    title_ko: '얼마나 걸려요?',
    body: "Priya: \"Quick one. Summit Retail asked for a CSV export of the inventory page. Roughly how long would that take? I'm talking to Greg this afternoon.\"",
    body_ko: '프리야: "짧게 하나만요. 서밋 리테일이 재고 페이지를 CSV로 내려받게 해 달래요. 대략 얼마나 걸릴까요? 오늘 오후에 그레그와 통화해요."',
    choices: [
      {
        minutes: 30,
        points: 8,
        r: 'After a look you tell her four days, plus one for testing. She gives Greg a range she can keep.',
        r_ko: '살펴본 뒤 나흘에 테스트 하루를 더해 말합니다. 프리야는 그레그에게 지킬 수 있는 범위를 말합니다.',
        t: "\"Let me look at the code for half an hour. My rough guess is three to five days, and I'll confirm before your call.\"",
        t_ko: '"코드를 30분만 볼게요. 대충 3~5일인데, 통화 전에 확인해 드릴게요."'
      },
      {
        minutes: 0,
        points: -4,
        r: 'Priya tells Greg two days. It takes five, and she has to call him back to explain.',
        r_ko: '프리야가 그레그에게 이틀이라고 합니다. 실제로는 닷새가 걸려서, 그녀가 다시 전화해 사정을 설명해야 했습니다.',
        t: '"Two days, easy."',
        t_ko: '"이틀이면 충분해요."'
      },
      {
        minutes: 0,
        points: -3,
        r: "Priya waits for more, then writes \"OK, I'll ask Maya.\" She goes into the call without a number.",
        r_ko: '프리야가 더 기다리다가 "알겠어요, 마야한테 물어볼게요"라고 씁니다. 결국 숫자 없이 통화에 들어갑니다.',
        t: '"No idea. It depends on a lot of things."',
        t_ko: '"모르겠어요. 여러 가지에 달렸어요."'
      }
    ],
    day_from: 3,
    time_to: '14:00',
    sort: 104
  },
  {
    id: 't_fridge',
    kind: 'chat',
    sender: 'tom',
    title: 'Fridge clean-out Friday',
    title_ko: '금요일 냉장고 정리',
    body: 'Tom: "Friendly reminder: the office fridge gets cleaned out Friday at 3 PM. Anything without a name and date goes in the trash."',
    body_ko: '톰: "알려 드려요. 사무실 냉장고는 금요일 오후 3시에 정리합니다. 이름과 날짜가 없는 건 버려요."',
    choices: [
      {
        minutes: 5,
        points: 3,
        r: 'Tom gives you a nod in the kitchen. "If only everyone did that."',
        r_ko: '부엌에서 톰이 고개를 끄덕입니다. "다들 이러면 좋을 텐데."',
        t: 'Label your lunch and toss the yogurt you forgot last week.',
        t_ko: '내 점심에 이름표를 붙이고, 지난주에 잊은 요구르트를 버린다.'
      },
      {
        minutes: 0,
        points: 0,
        r: 'Your good container goes out with the trash on Friday.',
        r_ko: '금요일에 아끼던 반찬통이 쓰레기와 함께 나갑니다.',
        t: 'Reply with a thumbs-up and forget about it.',
        t_ko: '엄지 이모지를 누르고 잊어버린다.'
      },
      {
        minutes: 0,
        points: -3,
        r: 'Forty people get your message. Tom asks you, kindly, to keep it to a direct message next time.',
        r_ko: '마흔 명이 그 메시지를 받습니다. 톰이 다음엔 개인 메시지로 해 달라고 정중히 부탁합니다.',
        t: 'Reply-all asking who keeps eating your yogurt.',
        t_ko: '전체 답장으로 누가 자꾸 내 요구르트를 먹냐고 묻는다.'
      }
    ],
    day_from: 3,
    sort: 121
  },
  {
    id: 't_jun_docs',
    hero: 'jun',
    kind: 'chat',
    title: 'The onboarding guide is out of date',
    title_ko: '온보딩 문서가 낡았어요',
    body: "Three steps in the team's onboarding guide no longer work. You figured out the new way last week, and someone new starts next month.",
    body_ko: '팀 온보딩 문서의 세 단계가 더는 맞지 않습니다. 지난주에 새 방법을 알아냈고, 다음 달에 새 사람이 들어옵니다.',
    choices: [
      {
        minutes: 30,
        points: 6,
        r: 'Maya reacts with a 🙌 and says the next new hire owes you a coffee.',
        r_ko: '마야가 🙌를 누르고, 다음 신입이 커피 한 잔 빚졌다고 합니다.',
        t: 'Fix the guide now while you remember, and mention it in the team channel.',
        t_ko: '기억날 때 지금 문서를 고치고 팀 채널에 알린다.'
      },
      {
        minutes: 2,
        points: 0,
        r: 'The note gets buried under other notes.',
        r_ko: '메모는 다른 메모 밑에 묻힙니다.',
        t: 'Make a note to fix it someday.',
        t_ko: '언젠가 고치려고 메모해 둔다.'
      },
      {
        minutes: 0,
        points: -2,
        r: 'Nothing happens today. Next month the new hire loses a whole day on the same three steps.',
        r_ko: '오늘은 아무 일도 없습니다. 다음 달 신입이 같은 세 단계에서 하루를 통째로 날립니다.',
        t: 'Leave it. Whoever comes next will figure it out like you did.',
        t_ko: '그냥 둔다. 다음 사람도 나처럼 알아서 하겠지.'
      }
    ],
    day_from: 8,
    sort: 107
  },
  {
    id: 't_jun_review',
    hero: 'jun',
    kind: 'review',
    sender: 'derek',
    title: 'Fourteen comments on your pull request',
    title_ko: '내 풀 리퀘스트에 댓글 14개',
    body: 'Derek reviewed your pull request and left fourteen comments. Most are small, two ask you to rename things, and one says the approach might not scale.',
    body_ko: '데릭이 내 풀 리퀘스트를 리뷰하고 댓글 14개를 남겼습니다. 대부분은 사소하고, 둘은 이름을 바꾸라는 것이고, 하나는 이 방식이 규모가 커지면 버티지 못할 수도 있다는 겁니다.',
    choices: [
      {
        minutes: 45,
        points: 8,
        r: 'Derek walks you through the scaling problem in ten minutes. He approves the next version: "Nice work. Thanks for the replies."',
        r_ko: '데릭이 10분 동안 규모 문제를 설명해 줍니다. 다음 버전을 승인하며 "잘했어요. 답글 고마워요."라고 합니다.',
        t: 'Fix what you agree with, reply to each comment, and ask Derek to talk through the scaling one.',
        t_ko: '동의하는 건 고치고, 댓글마다 답하고, 규모 문제는 데릭과 얘기해 보자고 한다.'
      },
      {
        minutes: 40,
        points: 2,
        r: "The code is fine, but Derek can't tell which comments you changed and which you skipped. He goes through them all again.",
        r_ko: '코드는 괜찮지만, 데릭은 어떤 댓글을 반영했고 어떤 걸 건너뛰었는지 알 수 없어 전부 다시 봅니다.',
        t: 'Fix everything quietly and mark all the comments resolved.',
        t_ko: '아무 말 없이 전부 고치고 댓글을 모두 해결됨으로 표시한다.'
      },
      {
        minutes: 15,
        points: -7,
        r: "Derek replies, \"Let's talk.\" The talk is awkward, and Maya hears about it at your next 1:1.",
        r_ko: '데릭이 "얘기 좀 해요."라고 답합니다. 대화는 어색했고, 다음 1:1에서 마야도 그 얘기를 꺼냅니다.',
        t: 'Reply that the code worked fine and the comments are just his style.',
        t_ko: '코드는 잘 돌아가고 댓글은 그냥 그의 취향일 뿐이라고 답한다.'
      }
    ],
    day_from: 4,
    sort: 105
  },
  {
    id: 't_jun_stuck',
    hero: 'jun',
    kind: 'chat',
    title: 'Stuck on a setup error',
    title_ko: '설정 오류에 막혔어요',
    body: "Your local database won't start after this morning's update. You've tried for an hour: restarting, reinstalling, searching the error message.",
    body_ko: '오늘 아침 업데이트 뒤로 로컬 데이터베이스가 안 켜집니다. 다시 켜기, 재설치, 오류 메시지 검색까지 한 시간째 해 봤어요.',
    choices: [
      {
        minutes: 10,
        points: 8,
        r: "Five minutes later Derek replies: the update changed a port, here's the one-line fix. You're back to work.",
        r_ko: '5분 뒤 데릭이 답합니다. 업데이트로 포트가 바뀌었다며 한 줄짜리 해결법을 알려 줍니다. 다시 일을 시작해요.',
        t: "Post in the team channel: the error, what you tried, and that you're blocked.",
        t_ko: '팀 채널에 오류 내용, 해 본 것, 막혀 있다는 걸 올린다.'
      },
      {
        minutes: 90,
        points: -3,
        r: 'You lose the rest of the afternoon. At standup the next morning Derek says, "Next time just ask. That one got me too."',
        r_ko: '오후를 통째로 날립니다. 다음 날 스탠드업에서 데릭이 "다음엔 그냥 물어봐요. 나도 그거 당했어요."라고 합니다.',
        t: "Keep trying on your own. You don't want to bother anyone.",
        t_ko: '혼자 계속 해 본다. 누구도 귀찮게 하고 싶지 않다.'
      },
      {
        minutes: 25,
        points: 2,
        r: "Derek writes back, \"What's the error? What did you try?\" It takes four more messages to get to the fix.",
        r_ko: '데릭이 "오류가 뭐예요? 뭘 해 봤어요?"라고 묻습니다. 해결책에 닿기까지 메시지가 네 번 더 오갑니다.',
        t: 'Send Derek a direct message: "my db is broken."',
        t_ko: '데릭에게 "제 DB가 고장 났어요."라고 개인 메시지를 보낸다.'
      }
    ],
    day_from: 3,
    sort: 106
  },
  {
    id: 't_laptop_update',
    kind: 'email',
    sender: 'sam',
    title: 'Your laptop needs a restart',
    title_ko: '노트북을 다시 켜야 해요',
    body: "Sam from IT: \"A security update is waiting on your laptop. Please restart today. If you don't, it will restart by itself at 6 PM.\"",
    body_ko: 'IT의 샘: "노트북에 보안 업데이트가 기다리고 있어요. 오늘 다시 켜 주세요. 안 하면 오후 6시에 저절로 다시 켜집니다."',
    choices: [
      {
        minutes: 10,
        points: 4,
        r: "Ten minutes later you're back, up to date.",
        r_ko: '10분 뒤 최신 상태로 돌아옵니다.',
        t: 'Save your work and restart now, while you grab some water.',
        t_ko: '작업을 저장하고 물 마시러 가는 동안 지금 다시 켠다.'
      },
      {
        minutes: 0,
        points: 1,
        r: "It restarts on time. You'd already gone home, so no harm done.",
        r_ko: '제시간에 다시 켜집니다. 이미 퇴근한 뒤라 별일 없어요.',
        t: 'Let it restart by itself at 6.',
        t_ko: '6시에 저절로 다시 켜지게 둔다.'
      },
      {
        minutes: 0,
        points: -3,
        r: "It restarts at 6:00 on the dot, in the middle of something you hadn't saved. Sam's report lists your laptop as overdue.",
        r_ko: '정확히 6시에, 저장하지 않은 작업 도중에 다시 켜집니다. 샘의 보고서에 내 노트북이 업데이트 지연으로 올라갑니다.',
        t: 'Hit "Remind me later" until it goes away.',
        t_ko: '사라질 때까지 "나중에 알림"을 누른다.'
      }
    ],
    time_to: '17:00',
    sort: 120
  },
  {
    id: 't_phishing',
    kind: 'email',
    title: 'Action required: your direct deposit',
    title_ko: '조치 필요: 급여 계좌',
    body: "An email that looks like it's from payroll: \"Your direct deposit will be paused. Confirm your bank details within 24 hours.\" The link goes to seaside-labs-payroll.co.",
    body_ko: '급여팀에서 온 것 같은 메일입니다. "급여 계좌 입금이 중단됩니다. 24시간 안에 계좌 정보를 확인하세요." 링크 주소는 seaside-labs-payroll.co입니다.',
    choices: [
      {
        minutes: 5,
        points: 8,
        r: "Sam from IT replies: \"Good catch, it's phishing. You're the third to report it.\" An all-company warning goes out ten minutes later.",
        r_ko: 'IT의 샘이 답합니다. "잘 잡았어요, 피싱이에요. 세 번째 신고예요." 10분 뒤 전사 경고가 나갑니다.',
        t: "Don't click. Report it with the \"Report phishing\" button so IT can warn everyone.",
        t_ko: '누르지 않는다. "피싱 신고" 버튼으로 신고해 IT가 모두에게 알리게 한다.'
      },
      {
        minutes: 1,
        points: 2,
        r: "You're safe, but two people down the hall aren't so lucky. IT wishes someone had reported it sooner.",
        r_ko: '나는 무사하지만 복도 끝 두 사람은 운이 나빴습니다. IT는 누군가 더 일찍 신고했으면 좋았겠다고 합니다.',
        t: 'Delete it and get on with your day.',
        t_ko: '지우고 하던 일을 계속한다.'
      },
      {
        minutes: 60,
        points: -10,
        r: 'An hour later Sam calls: your account was used to send more phishing. You spend the afternoon resetting passwords and calling the bank.',
        r_ko: '한 시간 뒤 샘이 전화합니다. 내 계정으로 피싱 메일이 더 나갔대요. 오후 내내 비밀번호를 바꾸고 은행에 전화합니다.',
        t: "Click the link and enter your details. You don't want to miss a paycheck.",
        t_ko: '링크를 눌러 정보를 입력한다. 급여를 놓치면 안 되니까.'
      }
    ],
    day_from: 3,
    sort: 118
  },
  {
    id: 't_pr_date',
    hero: 'priya',
    kind: 'chat',
    title: 'Sales wants a date',
    title_ko: '영업팀이 날짜를 원해요',
    body: "Someone from sales: \"A big prospect wants to know when offline mode will be ready. Can I tell them end of the month?\" Engineering hasn't estimated it yet.",
    body_ko: '영업팀 사람이 묻습니다. "큰 고객 후보가 오프라인 모드가 언제 되냐고 해요. 월말이라고 해도 될까요?" 개발팀은 아직 추정도 안 했어요.',
    choices: [
      {
        minutes: 15,
        points: 8,
        r: 'Derek estimates six to eight weeks. Sales passes that on, and the prospect plans around it.',
        r_ko: '데릭이 6~8주로 추정합니다. 영업팀이 그대로 전하고, 고객 후보도 거기에 맞춰 계획을 세웁니다.',
        t: "\"Not yet. I'll check with engineering and get you a range by Thursday.\"",
        t_ko: '"아직은요. 개발팀과 확인해서 목요일까지 범위로 알려 드릴게요."'
      },
      {
        minutes: 0,
        points: -5,
        r: 'That slide is three months old. Now the team has a date it never agreed to.',
        r_ko: '그 슬라이드는 석 달 전 것입니다. 이제 팀은 동의한 적 없는 날짜를 떠안게 됩니다.',
        t: 'Give them the date on the roadmap slide without checking.',
        t_ko: '확인 없이 로드맵 슬라이드에 있는 날짜를 알려 준다.'
      },
      {
        minutes: 0,
        points: -8,
        r: 'Sales promises it. When engineering hears, Maya calls a meeting about how dates get promised.',
        r_ko: '영업팀이 약속해 버립니다. 개발팀이 알게 되자 마야가 날짜를 약속하는 방식에 대해 회의를 엽니다.',
        t: '"Sure, end of the month works."',
        t_ko: '"네, 월말이면 돼요."'
      }
    ],
    day_from: 3,
    sort: 113
  },
  {
    id: 't_pr_disagree',
    hero: 'priya',
    kind: 'chat',
    sender: 'derek',
    title: 'Two developers, two plans',
    title_ko: '개발자 둘, 계획 둘',
    body: "Derek and Jun disagree on how to build store alerts. Derek: \"Can you just decide? We've been going back and forth since yesterday.\"",
    body_ko: '데릭과 준이 매장 알림을 어떻게 만들지 의견이 다릅니다. 데릭: "그냥 정해 줄래요? 어제부터 계속 오락가락이에요."',
    choices: [
      {
        minutes: 30,
        points: 8,
        r: "The notes take them fifteen minutes. You pick Jun's simpler plan for now, with Derek's idea for later. Both feel heard.",
        r_ko: '둘이 15분 만에 정리해 옵니다. 지금은 준의 단순한 안으로, 데릭의 안은 나중으로 정합니다. 둘 다 자기 말이 들렸다고 느낍니다.',
        t: 'Ask each for a short note on the trade-offs, decide by what the stores need, and write down why.',
        t_ko: '각자 장단점을 짧게 적어 달라고 하고, 매장에 필요한 것을 기준으로 정한 뒤 이유를 적어 둔다.'
      },
      {
        minutes: 5,
        points: 0,
        r: "It's a fine plan, but Jun goes quiet in meetings for the rest of the week.",
        r_ko: '괜찮은 안이지만, 준이 그 주 내내 회의에서 말이 없어집니다.',
        t: "Go with Derek's plan. He's the senior one.",
        t_ko: '데릭의 안으로 한다. 그가 선임이니까.'
      },
      {
        minutes: 0,
        points: -5,
        r: 'The argument goes on another two days, and the alerts start late.',
        r_ko: '논쟁이 이틀 더 이어지고, 알림 작업은 늦게 시작됩니다.',
        t: "\"You two figure it out. That's an engineering call.\"",
        t_ko: '"둘이 알아서 정해요. 그건 개발 쪽 결정이에요."'
      }
    ],
    day_from: 5,
    sort: 114
  },
  {
    id: 't_pr_greg_numbers',
    hero: 'priya',
    kind: 'email',
    sender: 'greg',
    title: "The numbers don't match",
    title_ko: '숫자가 안 맞아요',
    body: "Greg from Summit Retail, with his VP on copy: \"The sales numbers on the dashboard don't match our own system for last Tuesday. Our store managers are asking which one to trust.\"",
    body_ko: '서밋 리테일의 그레그가 자기 상사를 참조로 넣어 메일을 보냈습니다. "지난 화요일 대시보드 매출이 우리 시스템과 안 맞아요. 매장 관리자들이 어느 쪽을 믿어야 하냐고 묻습니다."',
    choices: [
      {
        minutes: 30,
        points: 8,
        r: "Derek finds a time zone problem in last Tuesday's data. Your update arrives before noon, and Greg's VP replies, \"Appreciate the quick follow-up.\"",
        r_ko: '데릭이 지난 화요일 데이터에서 시간대 문제를 찾습니다. 정오 전에 소식을 보내자 그레그의 상사가 "빠른 후속 조치 고맙습니다."라고 답합니다.',
        t: 'Reply within the hour: thank him, say the team is checking, and promise an update by tomorrow noon.',
        t_ko: '한 시간 안에 답한다. 고맙다고 하고, 팀이 확인 중이며 내일 정오까지 알려 주겠다고 약속한다.'
      },
      {
        minutes: 10,
        points: -2,
        r: 'The answer takes a day and a half. In the meantime Greg writes again: "Did anyone see this?"',
        r_ko: '답을 찾는 데 하루 반이 걸립니다. 그사이 그레그가 다시 씁니다. "이거 보신 분 있나요?"',
        t: 'Forward it to the developers and wait until you have the answer before replying.',
        t_ko: '개발자들에게 전달하고, 답을 알아낼 때까지 회신을 미룬다.'
      },
      {
        minutes: 10,
        points: -8,
        r: 'The next day Derek finds the bug on your side. You have to send Greg and his VP an apology.',
        r_ko: '다음 날 데릭이 우리 쪽 버그를 찾습니다. 그레그와 그의 상사에게 사과 메일을 보내야 합니다.',
        t: 'Reply that the dashboard numbers are correct and their system must be wrong.',
        t_ko: '대시보드 숫자가 맞고 그쪽 시스템이 틀렸을 거라고 답한다.'
      }
    ],
    day_from: 3,
    sort: 111
  },
  {
    id: 't_pr_notes',
    hero: 'priya',
    kind: 'chat',
    sender: 'maya',
    title: 'Release notes for the stores',
    title_ko: '매장용 배포 안내',
    body: "Maya: \"Tomorrow's release goes out to all the pilot stores. Can you get the release notes to them before you leave today?\"",
    body_ko: '마야: "내일 배포가 시범 매장 전체에 나가요. 오늘 퇴근 전에 매장들에 배포 안내를 보내 줄 수 있어요?"',
    choices: [
      {
        minutes: 40,
        points: 8,
        r: 'Derek catches one feature that slipped to next week. The notes go out right, and two managers reply with thanks.',
        r_ko: '데릭이 다음 주로 밀린 기능 하나를 잡아냅니다. 안내가 정확하게 나가고, 관리자 둘이 고맙다고 답합니다.',
        t: 'Write short notes in plain words for store managers, and ask Derek to check them for accuracy.',
        t_ko: '매장 관리자가 알기 쉬운 말로 짧게 쓰고, 데릭에게 내용이 맞는지 봐 달라고 한다.'
      },
      {
        minutes: 10,
        points: -3,
        r: "Store managers don't know what \"refactor auth middleware\" means. Support gets four calls asking what changed.",
        r_ko: '매장 관리자들은 "인증 미들웨어 리팩터링"이 뭔지 모릅니다. 무엇이 바뀌었냐는 전화가 지원팀에 네 통 옵니다.',
        t: 'Paste in the list of code changes from the release.',
        t_ko: '배포의 코드 변경 목록을 붙여 넣는다.'
      },
      {
        minutes: 0,
        points: -7,
        r: 'The buttons move, and the stores are surprised. Greg asks why nobody told them.',
        r_ko: '버튼 위치가 바뀌어 매장들이 당황합니다. 그레그가 왜 아무도 알려 주지 않았냐고 묻습니다.',
        t: 'Skip it. The changes are small.',
        t_ko: '건너뛴다. 변경이 작다.'
      }
    ],
    day_from: 4,
    time_from: '12:00',
    time_to: '16:30',
    sort: 116
  },
  {
    id: 't_pr_outage',
    hero: 'priya',
    kind: 'chat',
    sender: 'derek',
    title: 'The dashboard is down for some stores',
    title_ko: '일부 매장에서 대시보드가 안 돼요',
    body: "Derek: \"Heads-up: the dashboard is down for about a third of the pilot stores. We're rolling back, probably 20 minutes.\"",
    body_ko: '데릭: "알려 드려요. 시범 매장 3분의 1쯤에서 대시보드가 안 돼요. 되돌리는 중이고, 20분쯤 걸릴 것 같아요."',
    choices: [
      {
        minutes: 20,
        points: 8,
        r: "The stores know what's going on, and nobody calls support. Greg forwards your note to his team: \"This is how it should work.\"",
        r_ko: '매장들이 상황을 알고 있어서 지원팀에 전화하는 사람이 없습니다. 그레그가 내 안내를 자기 팀에 전달합니다. "이렇게 하는 거죠."',
        t: "Send the stores a short status note now, and another when it's fixed.",
        t_ko: '지금 매장들에 짧은 상황 안내를 보내고, 고쳐지면 한 번 더 보낸다.'
      },
      {
        minutes: 5,
        points: -2,
        r: 'It takes 40 minutes, not 20. Support gets a dozen calls in the meantime.',
        r_ko: '20분이 아니라 40분이 걸립니다. 그사이 지원팀에 전화가 열두 통 옵니다.',
        t: "Wait until it's fixed, then tell the stores what happened.",
        t_ko: '고쳐질 때까지 기다렸다가 무슨 일이었는지 알린다.'
      },
      {
        minutes: 5,
        points: -8,
        r: 'Three stores spend half an hour restarting their routers. When they find out, Greg is not happy.',
        r_ko: '세 매장이 30분 동안 공유기를 다시 켭니다. 사실을 알게 된 그레그는 언짢아합니다.',
        t: 'Tell the stores to check their internet connection.',
        t_ko: '매장들에 인터넷 연결을 확인해 보라고 한다.'
      }
    ],
    day_from: 5,
    time_from: '10:30',
    sort: 117
  },
  {
    id: 't_pr_scope',
    hero: 'priya',
    kind: 'email',
    sender: 'greg',
    title: 'Just one more chart',
    title_ko: '차트 하나만 더',
    body: 'Greg: "Before the pilot goes wider, could you just add one more chart, sales by hour? Should be quick, right?" The sprint is already full.',
    body_ko: '그레그: "시범 운영을 넓히기 전에 차트 하나만 더 넣어 줄 수 있어요? 시간대별 매출이요. 금방 되죠?" 이번 스프린트는 이미 꽉 찼어요.',
    choices: [
      {
        minutes: 20,
        points: 8,
        r: 'Greg picks the next sprint: the store alerts matter more to him. He likes knowing the trade-off.',
        r_ko: '그레그는 다음 스프린트를 고릅니다. 그에게는 매장 알림이 더 중요하거든요. 무엇과 바꾸는지 알게 되어 좋아합니다.',
        t: 'Thank him, explain what it would push back, and offer to swap it in or plan it for the next sprint.',
        t_ko: '고맙다고 하고, 그걸 넣으면 무엇이 밀리는지 설명한 뒤, 다른 것과 바꾸거나 다음 스프린트에 넣자고 제안한다.'
      },
      {
        minutes: 10,
        points: -5,
        r: 'The developers find out at standup. The chart ships, but the store alerts slip a week, and Maya asks you to bring changes to planning.',
        r_ko: '개발자들이 스탠드업에서 알게 됩니다. 차트는 나가지만 매장 알림이 일주일 밀리고, 마야가 변경은 계획 회의로 가져와 달라고 합니다.',
        t: 'Say yes and squeeze it in without telling the team.',
        t_ko: '팀에 말하지 않고 그러겠다고 한 뒤 끼워 넣는다.'
      },
      {
        minutes: 5,
        points: -3,
        r: 'Greg writes back a short "Understood." On the next call he is cooler than usual.',
        r_ko: '그레그가 짧게 "알겠습니다."라고 답합니다. 다음 통화에서 평소보다 쌀쌀합니다.',
        t: 'Reply: "No. The sprint is full."',
        t_ko: '"안 돼요. 스프린트가 꽉 찼어요."라고 답한다.'
      }
    ],
    day_from: 4,
    sort: 112
  },
  {
    id: 't_pr_survey',
    hero: 'priya',
    kind: 'email',
    title: 'Survey results from the stores',
    title_ko: '매장 설문 결과',
    body: "The pilot store survey is back. The top request, by far, is a simpler home screen. It isn't on your roadmap, and the feature you planned next came in fifth.",
    body_ko: '시범 매장 설문 결과가 나왔습니다. 가장 많은 요청은 단연 더 단순한 첫 화면이에요. 로드맵에는 없고, 다음에 하려던 기능은 5위였어요.',
    choices: [
      {
        minutes: 45,
        points: 8,
        r: 'The team agrees to move the home screen up. Greg is pleased you listened to his stores.',
        r_ko: '팀이 첫 화면 작업을 앞당기기로 합니다. 그레그는 매장 목소리를 들어 줘서 기뻐합니다.',
        t: 'Share a one-page summary with the team and bring a change to the roadmap to planning.',
        t_ko: '한 장짜리 요약을 팀에 공유하고, 로드맵 변경안을 계획 회의에 가져간다.'
      },
      {
        minutes: 5,
        points: -2,
        r: "Nothing changes. A month later the same request shows up in Greg's quarterly feedback.",
        r_ko: '아무것도 바뀌지 않습니다. 한 달 뒤 같은 요청이 그레그의 분기 피드백에 다시 나옵니다.',
        t: 'File the results and keep the current plan.',
        t_ko: '결과를 보관해 두고 지금 계획대로 간다.'
      },
      {
        minutes: 20,
        points: -7,
        r: "Derek reads the full results and asks why the top request wasn't mentioned. It's an uncomfortable meeting.",
        r_ko: '데릭이 전체 결과를 읽고 왜 1위 요청은 빠졌냐고 묻습니다. 불편한 회의가 됩니다.',
        t: 'Share only the parts that support the current plan.',
        t_ko: '지금 계획에 유리한 부분만 공유한다.'
      }
    ],
    day_from: 6,
    sort: 115
  },
  {
    id: 't_prod_errors',
    hero: 'jun,derek',
    kind: 'alert',
    title: 'Errors are up on the dashboard',
    title_ko: '대시보드 오류 급증',
    body: 'Monitoring says that since the deploy an hour ago, about one request in twenty from the pilot stores is failing. You worked on part of that release.',
    body_ko: '한 시간 전 배포 뒤로 시범 매장에서 오는 요청 스무 건 중 한 건꼴로 실패한다고 모니터링이 알립니다. 그 배포의 일부는 내가 작업한 거예요.',
    choices: [
      {
        minutes: 45,
        points: 8,
        r: 'Errors drop to zero ten minutes after the rollback. You find the bug by the end of the day, and Priya tells the stores it was fixed quickly.',
        r_ko: '되돌리고 10분 만에 오류가 0으로 떨어집니다. 그날 안에 버그를 찾고, 프리야는 매장들에 빨리 해결됐다고 알립니다.',
        t: 'Post in the incident channel, roll back the deploy, then look for the cause.',
        t_ko: '장애 채널에 알리고, 배포를 되돌린 다음 원인을 찾는다.'
      },
      {
        minutes: 60,
        points: 0,
        r: 'You find it after an hour, but the stores saw errors the whole time, and nobody else knew you were working on it.',
        r_ko: '한 시간 만에 찾았지만 그동안 매장들은 계속 오류를 겪었고, 내가 그걸 보고 있는 줄 아무도 몰랐습니다.',
        t: 'Start reading the code right away to find the bug yourself.',
        t_ko: '곧바로 코드를 읽으며 직접 버그를 찾는다.'
      },
      {
        minutes: 15,
        points: -8,
        r: "It doesn't. A store manager calls Priya, and the on-call alarm goes off for the whole team.",
        r_ko: '가라앉지 않습니다. 매장 관리자가 프리야에게 전화하고, 팀 전체에 온콜 경보가 울립니다.',
        t: 'Wait a bit. It might settle down by itself.',
        t_ko: '조금 기다린다. 저절로 가라앉을지도 모른다.'
      }
    ],
    day_from: 4,
    time_from: '11:00',
    sort: 102
  },
  {
    id: 't_security_alert',
    hero: 'jun,derek',
    kind: 'alert',
    title: 'A security alert on a library',
    title_ko: '라이브러리 보안 경고',
    body: 'The dependency scanner flagged a critical vulnerability in the date-parsing library the dashboard uses. A fixed version came out yesterday.',
    body_ko: '의존성 스캐너가 대시보드에서 쓰는 날짜 처리 라이브러리에 심각한 취약점이 있다고 알립니다. 고친 버전은 어제 나왔어요.',
    choices: [
      {
        minutes: 40,
        points: 8,
        r: 'The dashboard does call it. Your upgrade passes the tests, and Maya adds it to the next release. "Thanks for jumping on this."',
        r_ko: '대시보드가 그 함수를 실제로 씁니다. 업그레이드가 테스트를 통과하고 마야가 다음 배포에 넣습니다. "바로 챙겨 줘서 고마워요."',
        t: 'Check whether the dashboard uses the affected function, open a pull request with the upgrade, and tell Maya.',
        t_ko: '대시보드가 문제의 함수를 쓰는지 확인하고, 업그레이드 풀 리퀘스트를 올리고, 마야에게 알린다.'
      },
      {
        minutes: 5,
        points: 0,
        r: 'The ticket sits in the backlog. A week later the security team asks why a critical alert is still open.',
        r_ko: '티켓은 백로그에 머뭅니다. 일주일 뒤 보안 팀이 심각한 경고가 왜 아직 열려 있냐고 묻습니다.',
        t: 'Add a ticket to the backlog for the next sprint.',
        t_ko: '다음 스프린트용으로 백로그에 티켓을 하나 만든다.'
      },
      {
        minutes: 0,
        points: -6,
        r: "The alert is gone from your screen but not from the security team's report. Maya forwards it to you with one line: \"Please don't dismiss these.\"",
        r_ko: '경고는 내 화면에서 사라졌지만 보안 팀 보고서에는 남아 있습니다. 마야가 한 줄 붙여 전달합니다. "이런 건 무시하지 말아 주세요."',
        t: 'Dismiss the alert. The scanner cries wolf all the time.',
        t_ko: '경고를 무시한다. 스캐너는 늘 호들갑이다.'
      }
    ],
    day_from: 3,
    sort: 101
  },
  {
    id: 't_store_ticket',
    hero: 'jun,derek',
    kind: 'ticket',
    title: "A store can't export a report",
    title_ko: '매장에서 보고서를 못 내려받아요',
    body: 'Support passed you a ticket: the manager of the Oak Street store says the weekly report export does nothing when she clicks it. It works for you.',
    body_ko: '지원팀이 티켓을 넘겼습니다. 오크 스트리트 매장 관리자가 주간 보고서 내보내기를 눌러도 아무 일도 없다고 합니다. 내 컴퓨터에서는 잘 돼요.',
    choices: [
      {
        minutes: 30,
        points: 8,
        r: 'Her store has more than 10,000 rows, and the export times out. You write it up, and support tells her a fix is on the way.',
        r_ko: '그 매장은 행이 1만 개가 넘어서 내보내기가 시간 초과로 끝납니다. 정리해서 적어 두고, 지원팀이 곧 고쳐진다고 안내합니다.',
        t: "Try it with her store's settings and browser, and ask support for a screenshot.",
        t_ko: '그 매장의 설정과 브라우저로 해 보고, 지원팀에 스크린숏을 부탁한다.'
      },
      {
        minutes: 5,
        points: -3,
        r: "Support sends it back: \"She still can't export. Can you take a closer look?\" The ticket waits another day.",
        r_ko: '지원팀이 다시 보냅니다. "여전히 안 된대요. 좀 더 봐 줄 수 있어요?" 티켓이 하루 더 밀립니다.',
        t: 'Reply that it works on your machine.',
        t_ko: '내 컴퓨터에서는 잘 된다고 답한다.'
      },
      {
        minutes: 0,
        points: -7,
        r: 'The manager opens a new ticket, angrier this time, and copies her district manager. Priya asks you what happened.',
        r_ko: '관리자가 이번엔 더 화가 나서 새 티켓을 열고 지역 관리자를 참조로 넣습니다. 프리야가 어떻게 된 거냐고 묻습니다.',
        t: 'Close it as "cannot reproduce."',
        t_ko: '"재현 불가"로 닫는다.'
      }
    ],
    day_from: 3,
    sort: 103
  },
  {
    id: 't_training',
    kind: 'email',
    sender: 'linda',
    title: 'Required training is due Friday',
    title_ko: '필수 교육 마감은 금요일',
    body: "Linda from HR: \"Reminder: the yearly security and workplace conduct training (about 30 minutes) is due this Friday. It's required for everyone.\"",
    body_ko: '인사팀 린다: "알림: 연례 보안 및 직장 내 행동 교육(약 30분)을 이번 주 금요일까지 마쳐야 합니다. 전 직원 필수입니다."',
    choices: [
      {
        minutes: 30,
        points: 5,
        r: "Done in 30 minutes, certificate and all. Linda's list has one less name on it.",
        r_ko: '30분 만에 수료증까지 받습니다. 린다의 명단에서 이름이 하나 줄었어요.',
        t: "Do it now while it's quiet.",
        t_ko: '조용할 때 지금 한다.'
      },
      {
        minutes: 2,
        points: 2,
        r: 'Thursday comes, and you do it. Fine.',
        r_ko: '목요일이 되어 교육을 마칩니다. 괜찮아요.',
        t: 'Put a 30-minute block on your calendar for Thursday.',
        t_ko: '목요일에 30분을 달력에 잡아 둔다.'
      },
      {
        minutes: 0,
        points: -5,
        r: 'Linda checks. On Monday she copies Maya on a second reminder.',
        r_ko: '린다는 챙깁니다. 월요일에 마야를 참조로 넣어 다시 알림을 보냅니다.',
        t: 'Ignore it. Nobody really checks.',
        t_ko: '무시한다. 아무도 안 챙긴다.'
      }
    ],
    sort: 119
  }
];

// Jun Kim's meetings that come back after the missions (routines in db/world/work.mjs take them in turn).

export const hero = 'jun';

export const episodes = [
  {
    id: 'rt_standup_jun_1',
    title: 'Standup: a flaky test',
    title_ko: '스탠드업: 들쭉날쭉한 테스트',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: "The ten o'clock standup. Give your update, bring up the test that keeps failing at random, and accept help without holding up the meeting.",
    summary_ko: '10시 스탠드업입니다. 진행 상황을 말하고, 이따금 실패하는 테스트 얘기를 꺼내고, 회의를 붙잡지 않으면서 도움을 받으세요.',
    sort: 2000,
    tags: 'meeting,standup,routine',
    turns: [
      {
        situation: "Ten o'clock standup in the meeting room: yesterday, today, blockers, fifteen minutes. Yesterday you finished the sales-by-hour chart for the store dashboard and opened a pull request. Today you plan to start the CSV export.",
        situation_ko: '회의실에서 10시 스탠드업입니다. 어제, 오늘, 막힌 점을 15분 안에 말합니다. 어제 당신은 매장 대시보드의 시간대별 매출 차트를 끝내고 풀 리퀘스트를 올렸습니다. 오늘은 CSV 내보내기를 시작할 계획입니다.',
        line: "Morning, everyone. Jun, you're up. Yesterday, today, blockers.",
        line_ko: '좋은 아침이에요, 여러분. 준, 먼저 해요. 어제, 오늘, 막힌 점이요.',
        prompt: 'Sum up what you got done and what comes next, in two sentences.',
        prompt_ko: '한 일과 다음 할 일을 두 문장으로 정리하세요.',
        model: "Yesterday I finished the sales-by-hour chart and opened a PR. Today I'm starting the CSV export.",
        model_ko: '어제 시간대별 매출 차트를 끝내고 PR을 올렸어요. 오늘은 CSV 내보내기를 시작해요.',
        distractors: [
          {
            text: "Yesterday I started the CSV export. Today I'll finish the sales-by-hour chart and open a PR.",
            text_ko: '어제 CSV 내보내기를 시작했어요. 오늘은 시간대별 매출 차트를 끝내고 PR을 올릴게요.',
            reaction: 'Wait, I thought the chart was the one you finished?',
            reaction_ko: '잠깐요, 끝낸 건 차트 아니었어요?'
          },
          {
            text: "Yesterday I finished the sales-by-hour chart and merged it to main. Today I'm starting the export.",
            text_ko: '어제 시간대별 매출 차트를 끝내서 main에 머지했어요. 오늘은 내보내기를 시작해요.',
            reaction: 'Merged already? Did someone review it?',
            reaction_ko: '벌써 머지했어요? 리뷰는 누가 했어요?'
          },
          {
            text: 'Long day yesterday. My dentist ran late, and then the chart fought me all afternoon.',
            text_ko: '어제 하루가 길었어요. 치과가 늦게 끝났고, 오후 내내 차트랑 씨름했어요.',
            reaction: "Sorry to hear that. But what's the plan for today?",
            reaction_ko: '고생했네요. 그런데 오늘 계획은요?'
          }
        ],
        reply_line: 'Great. Any blockers?',
        reply_ko: '좋아요. 막힌 건 있어요?'
      },
      {
        situation: "One test in the build fails about one run in five, then passes when you run it again. It keeps your pull request's checks red. Nobody knows why yet.",
        situation_ko: '빌드의 테스트 하나가 다섯 번에 한 번꼴로 실패하고, 다시 돌리면 통과합니다. 그 때문에 당신의 풀 리퀘스트 검사가 계속 빨간불입니다. 아직 아무도 이유를 모릅니다.',
        line: 'Anything slowing you down?',
        line_ko: '발목 잡는 거 있어요?',
        prompt: 'Mention the build problem and ask for a hand, without blaming anyone.',
        prompt_ko: '빌드 문제를 말하고, 누구 탓도 하지 말고 도움을 청하세요.',
        model: 'One test fails randomly, maybe one run in five. Could someone look at it with me?',
        model_ko: '테스트 하나가 다섯 번에 한 번쯤 아무 때나 실패해요. 누가 같이 봐 줄 수 있을까요?',
        distractors: [
          {
            text: 'No blockers. One test fails sometimes, but I just re-run the build until it passes.',
            text_ko: '막힌 건 없어요. 테스트 하나가 가끔 실패하는데, 통과할 때까지 빌드를 다시 돌리면 돼요.',
            reaction: "Hmm. Re-running isn't really a fix, though.",
            reaction_ko: '음. 다시 돌리는 건 해결이 아니잖아요.'
          },
          {
            text: "Derek's old test is broken again. It fails every single time, so he needs to fix it.",
            text_ko: '데릭이 예전에 짠 테스트가 또 고장 났어요. 매번 실패하니까 데릭이 고쳐야 해요.',
            reaction: "Every time? Let's not point fingers before we know.",
            reaction_ko: '매번요? 원인을 알기 전에 누구 탓은 하지 말아요.'
          },
          {
            text: "One test fails randomly. I'll rewrite the whole test suite today so it never happens again.",
            text_ko: '테스트 하나가 아무 때나 실패해요. 다시는 안 그러게 오늘 테스트 전체를 새로 짤게요.',
            reaction: "The whole suite? Let's not go that far today.",
            reaction_ko: '테스트 전체를요? 오늘 그렇게까지는 말아요.'
          }
        ],
        reply_line: 'Good flag. Derek, could you take a look with Jun?',
        reply_ko: '잘 말해 줬어요. 데릭, 준이랑 같이 봐 줄래요?'
      },
      {
        speaker: 'derek',
        situation: 'Derek nods. You have nothing on your calendar at eleven.',
        situation_ko: '데릭이 고개를 끄덕입니다. 당신은 11시에 아무 일정이 없습니다.',
        line: "Sure. I bet it's the time zone one. I've got time at eleven.",
        line_ko: '그래요. 아마 시간대 테스트일 거예요. 11시에 시간 돼요.',
        prompt: 'Accept, and keep it short so the standup can move on.',
        prompt_ko: '받아들이고, 스탠드업이 넘어가도록 짧게 끝내세요.',
        model: "Eleven works. Thanks, Derek. That's all from me.",
        model_ko: '11시 좋아요. 고마워요, 데릭. 저는 여기까지예요.',
        distractors: [
          {
            text: "Eleven? Can we just look at it right now? It'll only take a minute.",
            text_ko: '11시요? 그냥 지금 보면 안 돼요? 1분이면 될 텐데요.',
            reaction: "Let's not hold up the standup. Eleven.",
            reaction_ko: '스탠드업 붙잡지 말아요. 11시에 봐요.'
          },
          {
            text: "Thanks, but eleven is bad. I'm busy all morning, so maybe Friday?",
            text_ko: '고마워요, 근데 11시는 안 돼요. 오전 내내 바빠서, 금요일은 어때요?',
            reaction: 'Friday? Your PR is stuck until then.',
            reaction_ko: '금요일요? 그때까지 PR이 묶여 있잖아요.'
          },
          {
            text: 'Eleven works. Also, quick question about the export: CSV or Excel?',
            text_ko: '11시 좋아요. 그리고 내보내기 말인데요, CSV예요, 엑셀이에요?',
            reaction: "Let's take that one after standup, too.",
            reaction_ko: '그것도 스탠드업 끝나고 얘기해요.'
          }
        ],
        reply_line: "Cool. I'll come by your desk.",
        reply_ko: '좋아요. 자리로 갈게요.'
      }
    ]
  },
  {
    id: 'rt_standup_jun_2',
    title: 'Standup: waiting on a review',
    title_ko: '스탠드업: 리뷰를 기다리며',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: "The ten o'clock standup. Give your update, mention the pull request that has waited two days for review, and settle on a time without pointing fingers.",
    summary_ko: '10시 스탠드업입니다. 진행 상황을 말하고, 이틀째 리뷰를 기다리는 풀 리퀘스트 얘기를 꺼내고, 누구 탓도 하지 말고 시간을 정하세요.',
    sort: 2001,
    tags: 'meeting,standup,routine',
    turns: [
      {
        situation: "Ten o'clock standup in the meeting room. Yesterday you fixed a rounding bug: the weekly totals on the dashboard were off by a cent. Today you plan to start the low-stock widget.",
        situation_ko: '회의실에서 10시 스탠드업입니다. 어제 당신은 반올림 버그를 고쳤습니다. 대시보드의 주간 합계가 1센트씩 틀렸거든요. 오늘은 재고 부족 위젯을 시작할 계획입니다.',
        line: "Jun, how's it going?",
        line_ko: '준, 어떻게 돼 가요?',
        prompt: "Say what you finished and what's next.",
        prompt_ko: '끝낸 일과 다음 할 일을 말하세요.',
        model: "Yesterday I fixed the rounding bug in the weekly totals. Today I'm starting the low-stock widget.",
        model_ko: '어제 주간 합계의 반올림 버그를 고쳤어요. 오늘은 재고 부족 위젯을 시작해요.',
        distractors: [
          {
            text: "Yesterday I started the low-stock widget. Today I'll look into the rounding bug in the totals.",
            text_ko: '어제 재고 부족 위젯을 시작했어요. 오늘은 합계의 반올림 버그를 볼게요.',
            reaction: "Wait, wasn't the rounding bug the one you fixed?",
            reaction_ko: '잠깐요, 반올림 버그는 고친 거 아니었어요?'
          },
          {
            text: 'Yesterday I fixed the weekly totals. The store manager was typing the numbers in wrong, as usual.',
            text_ko: '어제 주간 합계를 고쳤어요. 늘 그렇듯 매장 관리자가 숫자를 잘못 넣었더라고요.',
            reaction: "Careful. That's one of our pilot stores, and it was our bug.",
            reaction_ko: '조심해요. 우리 시범 매장이고, 우리 버그였잖아요.'
          },
          {
            text: "Yesterday I fixed the rounding bug in the weekly totals. Today, honestly, I'm not sure yet.",
            text_ko: '어제 주간 합계의 반올림 버그를 고쳤어요. 오늘은, 솔직히, 아직 모르겠어요.',
            reaction: 'Okay. Maybe have a plan by the end of the day?',
            reaction_ko: '그래요. 오늘 안에는 계획을 세워 봐요.'
          }
        ],
        reply_line: 'Nice work. Blockers?',
        reply_ko: '잘했어요. 막힌 건요?'
      },
      {
        situation: "Your pull request for the store filter has been waiting two days for a review. Derek usually reviews your code, and he's been busy on call this week.",
        situation_ko: '매장 필터 풀 리퀘스트가 이틀째 리뷰를 기다리고 있습니다. 보통 데릭이 당신 코드를 리뷰하는데, 이번 주에는 온콜로 바빴습니다.',
        line: 'Anything in your way?',
        line_ko: '걸리는 거 있어요?',
        prompt: 'Bring up the stalled review politely, without pointing fingers.',
        prompt_ko: '멈춰 있는 리뷰 얘기를, 누구 탓도 하지 말고 정중하게 꺼내세요.',
        model: 'My store filter PR has been waiting two days. Could someone take a look today?',
        model_ko: '매장 필터 PR이 이틀째 기다리고 있어요. 오늘 누가 봐 줄 수 있을까요?',
        distractors: [
          {
            text: "Derek still hasn't reviewed my PR. It's been two days, so I'm just stuck.",
            text_ko: '데릭이 아직 제 PR을 리뷰 안 했어요. 이틀째라서 그냥 꼼짝 못 하고 있어요.',
            reaction: "Derek's been on call. Let's keep it friendly.",
            reaction_ko: '데릭은 온콜이었잖아요. 좋게 말해요.'
          },
          {
            text: 'My store filter PR has been open for two weeks. Could someone look at it?',
            text_ko: '매장 필터 PR이 2주째 열려 있어요. 누가 봐 줄 수 있을까요?',
            reaction: 'Two weeks? I thought it was newer than that.',
            reaction_ko: '2주요? 그보다 최근인 줄 알았는데요.'
          },
          {
            text: "No blockers. If nobody gets to my PR today, I'll just merge it myself.",
            text_ko: '막힌 건 없어요. 오늘 아무도 PR을 안 보면 제가 그냥 머지할게요.',
            reaction: "Please don't. Everything gets a review here.",
            reaction_ko: '그러지 말아요. 여기선 전부 리뷰를 거쳐요.'
          }
        ],
        reply_line: 'Fair. Derek, can you fit it in?',
        reply_ko: '그렇네요. 데릭, 시간 낼 수 있어요?'
      },
      {
        speaker: 'derek',
        situation: 'The store filter is needed for a pilot-store demo tomorrow morning.',
        situation_ko: '매장 필터는 내일 아침 시범 매장 데모에 필요합니다.',
        line: 'Sorry, Jun. On call ate my week. I can do it after lunch, or first thing tomorrow.',
        line_ko: '미안해요, 준. 온콜 때문에 한 주가 날아갔어요. 점심 먹고 볼 수도 있고, 내일 아침 일찍 봐도 돼요.',
        prompt: 'Pick the option that gets it reviewed in time, and thank him.',
        prompt_ko: '제때 리뷰받을 수 있는 쪽을 고르고, 고맙다고 하세요.',
        model: 'After lunch is perfect. Thanks, Derek.',
        model_ko: '점심 후면 딱 좋아요. 고마워요, 데릭.',
        distractors: [
          {
            text: "Tomorrow morning works. I'll remind you first thing.",
            text_ko: '내일 아침 좋아요. 아침에 바로 알려 드릴게요.',
            reaction: "Tomorrow? Isn't that when the demo is?",
            reaction_ko: '내일요? 그때가 데모 아니에요?'
          },
          {
            text: 'After lunch? Honestly, it needed to be done yesterday.',
            text_ko: '점심 후요? 솔직히 어제 됐어야 했는데요.',
            reaction: 'Okay... I did say I was sorry.',
            reaction_ko: '그래요... 미안하다고 했잖아요.'
          },
          {
            text: "Could you just do it now, while we're all here?",
            text_ko: '다 모였을 때 지금 그냥 봐 주면 안 돼요?',
            reaction: 'Not during standup, Jun.',
            reaction_ko: '스탠드업 중엔 안 돼요, 준.'
          }
        ],
        reply_line: "Deal. I'll ping you when I start.",
        reply_ko: '좋아요. 시작할 때 메시지 보낼게요.'
      }
    ]
  },
  {
    id: 'rt_standup_jun_3',
    title: "Standup: a store manager's bug",
    title_ko: '스탠드업: 매장 관리자가 찾은 버그',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: 'A pilot store manager reported a bug last night. Report it at the standup, explain the likely cause in plain words, and help Priya answer the store without promising too much.',
    summary_ko: '시범 매장 관리자가 어젯밤 버그를 알려 왔습니다. 스탠드업에서 보고하고, 짐작되는 원인을 쉬운 말로 설명하고, 프리야가 매장에 지나친 약속 없이 답하도록 도우세요.',
    sort: 2002,
    tags: 'meeting,standup,routine',
    turns: [
      {
        situation: "Ten o'clock standup. Last night a manager at one of the pilot stores emailed you: for about an hour after midnight, the dashboard shows the day's sales as zero. You haven't fixed it yet.",
        situation_ko: '10시 스탠드업입니다. 어젯밤 시범 매장 한 곳의 관리자가 메일을 보냈습니다. 자정이 지나고 한 시간쯤 대시보드에 그날 매출이 0으로 나온다고요. 아직 고치지 못했습니다.',
        line: 'Jun, go ahead.',
        line_ko: '준, 시작해요.',
        prompt: "Tell the team about the store's report and that you're handling it.",
        prompt_ko: '매장에서 온 신고를 팀에 알리고, 당신이 맡고 있다고 말하세요.',
        model: "A pilot store manager says sales show zero for an hour after midnight. I'm looking into it today.",
        model_ko: '시범 매장 관리자가 자정 후 한 시간 동안 매출이 0으로 나온대요. 오늘 살펴볼게요.',
        distractors: [
          {
            text: 'A pilot store manager says sales show zero after midnight. I already fixed it last night.',
            text_ko: '시범 매장 관리자가 자정 후 매출이 0으로 나온대요. 어젯밤에 벌써 고쳤어요.',
            reaction: 'Already? Did it go through review?',
            reaction_ko: '벌써요? 리뷰는 거쳤어요?'
          },
          {
            text: "A store manager emailed me, but I think he's confused. The numbers look fine to me.",
            text_ko: '매장 관리자가 메일을 보냈는데, 착각하신 것 같아요. 제가 보기엔 숫자가 멀쩡해요.',
            reaction: "Let's not assume that. They're our pilot users.",
            reaction_ko: '그렇게 단정하지 말아요. 우리 시범 사용자들이에요.'
          },
          {
            text: "A pilot store manager says sales show zero all day long. I'm looking into it today.",
            text_ko: '시범 매장 관리자가 하루 종일 매출이 0으로 나온대요. 오늘 살펴볼게요.',
            reaction: 'All day? That sounds a lot worse.',
            reaction_ko: '하루 종일요? 훨씬 심각하게 들리는데요.'
          }
        ],
        reply_line: "Good. Any idea what's causing it?",
        reply_ko: '좋아요. 원인은 짐작 가요?'
      },
      {
        situation: 'You suspect the server counts days in a different time zone from the stores. Priya is not an engineer.',
        situation_ko: '서버가 매장과 다른 시간대로 날짜를 세는 것 같습니다. 프리야는 엔지니어가 아닙니다.',
        line: 'Do you know why it happens?',
        line_ko: '왜 그런지 알아요?',
        prompt: 'Explain your guess in words a non-engineer can follow.',
        prompt_ko: '엔지니어가 아닌 사람도 알아듣게 짐작을 설명하세요.',
        model: 'I think our server and the stores use different time zones, so the day ends at the wrong hour.',
        model_ko: '서버와 매장이 다른 시간대를 쓰는 것 같아요. 그래서 하루가 엉뚱한 시각에 끝나요.',
        distractors: [
          {
            text: "It's probably a UTC offset issue in the aggregation job's date truncation. Pretty standard.",
            text_ko: '아마 집계 작업의 날짜 자르기에서 UTC 오프셋 문제일 거예요. 흔한 거예요.',
            reaction: 'Um... in English, please?',
            reaction_ko: '음... 쉬운 말로 해 줄래요?'
          },
          {
            text: "I think the store's computers have the wrong time set. They should fix their clocks.",
            text_ko: '매장 컴퓨터 시간이 잘못 맞춰져 있는 것 같아요. 그쪽에서 시계를 고쳐야 해요.',
            reaction: "Their clocks? I'd rather not tell Summit that.",
            reaction_ko: '매장 시계요? 서밋에 그렇게 말하긴 싫은데요.'
          },
          {
            text: 'No idea yet, honestly. It could be anything, so it might take a few weeks.',
            text_ko: '솔직히 아직 몰라요. 뭐든 될 수 있어서 몇 주 걸릴 수도 있어요.',
            reaction: "A few weeks? Let's not say that to the store.",
            reaction_ko: '몇 주요? 매장에 그렇게 말하진 말아요.'
          }
        ],
        reply_line: 'Got it. That makes sense even to me.',
        reply_ko: '알겠어요. 저도 이해가 돼요.'
      },
      {
        situation: "You expect to have a fix ready for Derek's review by the end of the day. It can go live once he approves.",
        situation_ko: '오늘 안에 수정을 마쳐 데릭에게 리뷰를 맡길 수 있을 것 같습니다. 그가 승인하면 반영할 수 있습니다.',
        line: 'Should I tell the store manager anything?',
        line_ko: '매장 관리자한테 뭐라고 할까요?',
        prompt: 'Suggest what she can tell the store, without promising too much.',
        prompt_ko: '지나친 약속 없이, 매장에 뭐라고 하면 좋을지 제안하세요.',
        model: 'Maybe say we found the likely cause, and a fix is a day or two out.',
        model_ko: '원인을 거의 찾았고, 하루 이틀 안에 수정이 나갈 거라고 하시면 돼요.',
        distractors: [
          {
            text: "Tell him it's fixed. I'm pretty sure I'll have it done tonight anyway.",
            text_ko: '고쳤다고 하세요. 어차피 오늘 밤엔 끝낼 수 있을 거예요.',
            reaction: "I'd rather not promise that before Derek reviews it.",
            reaction_ko: '데릭이 리뷰하기 전에 그렇게 약속하긴 싫어요.'
          },
          {
            text: "Tell him the problem is on their side, so it's not really on us.",
            text_ko: '문제가 그쪽에 있다고 하세요. 그러니 우리 책임은 아니라고요.',
            reaction: 'But you just said it was our server.',
            reaction_ko: '방금 우리 서버 문제라고 했잖아요.'
          },
          {
            text: "Let's not tell him anything until it's fixed. He'll notice on his own.",
            text_ko: '고칠 때까지 아무 말 하지 말아요. 알아서 알게 될 거예요.',
            reaction: "Hmm. I'd rather keep him in the loop.",
            reaction_ko: '음. 계속 상황을 알려 드리고 싶어요.'
          }
        ],
        reply_line: "Perfect. I'll email him right after standup.",
        reply_ko: '좋아요. 스탠드업 끝나면 바로 메일 보낼게요.'
      }
    ]
  },
  {
    id: 'rt_standup_jun_4',
    title: 'Standup: take it offline',
    title_ko: '스탠드업: 따로 얘기해요',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: "Give your update, and when Derek's question turns into a long back-and-forth, move it out of the meeting and keep your own turn short.",
    summary_ko: '진행 상황을 말하고, 데릭의 질문이 길게 오가는 논쟁이 되면 회의 밖으로 미루고, 당신 차례는 짧게 끝내세요.',
    sort: 2003,
    tags: 'meeting,standup,routine',
    turns: [
      {
        situation: "Ten o'clock standup. Yesterday you finished the inventory chart and opened a pull request for Derek to review. Today you'll start the store picker. Nothing is blocking you.",
        situation_ko: '10시 스탠드업입니다. 어제 당신은 재고 차트를 끝내고 데릭에게 리뷰를 맡길 풀 리퀘스트를 올렸습니다. 오늘은 매장 선택기를 시작합니다. 막힌 건 없습니다.',
        line: 'Morning. Jun, kick us off.',
        line_ko: '좋은 아침이에요. 준, 먼저 시작해요.',
        prompt: 'Give your update in a few words.',
        prompt_ko: '진행 상황을 몇 마디로 말하세요.',
        model: 'Yesterday I finished the inventory chart and opened a PR. Today, the store picker. No blockers.',
        model_ko: '어제 재고 차트를 끝내고 PR을 올렸어요. 오늘은 매장 선택기요. 막힌 건 없어요.',
        distractors: [
          {
            text: 'Yesterday I finished the inventory chart and shipped it to the pilot stores. Today, the store picker.',
            text_ko: '어제 재고 차트를 끝내서 시범 매장에 내보냈어요. 오늘은 매장 선택기요.',
            reaction: 'Shipped? Did Derek review it first?',
            reaction_ko: '내보냈다고요? 데릭이 먼저 리뷰했어요?'
          },
          {
            text: "Yesterday I started the store picker. Today I'll finish the inventory chart and open a PR.",
            text_ko: '어제 매장 선택기를 시작했어요. 오늘은 재고 차트를 끝내고 PR을 올릴게요.',
            reaction: 'Wait, I thought the chart was done?',
            reaction_ko: '잠깐요, 차트는 끝난 줄 알았는데요?'
          },
          {
            text: 'Yesterday was the inventory chart. It got really tricky, so let me walk you through how it works.',
            text_ko: '어제는 재고 차트였어요. 꽤 까다로워서, 어떻게 돌아가는지 쭉 설명할게요.',
            reaction: 'Maybe just the headline, Jun?',
            reaction_ko: '요점만 말해 줄래요, 준?'
          }
        ],
        reply_line: 'Great. Derek, you had a question for Jun?',
        reply_ko: '좋아요. 데릭, 준한테 물어볼 게 있었죠?'
      },
      {
        speaker: 'derek',
        situation: "Your chart keeps its data for five minutes before asking the database again. Derek thinks that's too long. You two have already gone back and forth three times, and Priya and Maya are waiting.",
        situation_ko: '당신의 차트는 데이터를 5분 동안 들고 있다가 데이터베이스에 다시 묻습니다. 데릭은 너무 길다고 봅니다. 둘이 벌써 세 번이나 주거니 받거니 했고, 프리야와 마야가 기다리고 있습니다.',
        line: 'But five minutes is a long time for stock levels. Why not one minute? Or no cache at all?',
        line_ko: '근데 재고 수량에 5분은 길어요. 왜 1분은 안 돼요? 아예 캐시를 안 쓰든가요?',
        prompt: 'Take his point seriously, but move the rest of the discussion out of the meeting.',
        prompt_ko: '그의 지적은 진지하게 받되, 나머지 논의는 회의 밖으로 옮기세요.',
        model: "Fair question. Can we dig into it right after standup? I'll come by your desk.",
        model_ko: '좋은 질문이에요. 스탠드업 끝나고 바로 파 볼까요? 자리로 갈게요.',
        distractors: [
          {
            text: 'Because one minute would hit the database way too often. Let me show you the numbers.',
            text_ko: '1분이면 데이터베이스를 너무 자주 두드려요. 숫자를 보여 드릴게요.',
            reaction: 'Uh, maybe not right now? People are waiting.',
            reaction_ko: '어, 지금은 말고요? 다들 기다려요.'
          },
          {
            text: "Five minutes is fine, trust me. I already decided, so let's not change it now.",
            text_ko: '5분이면 괜찮아요, 믿어 주세요. 이미 정했으니 이제 와서 바꾸지 말아요.',
            reaction: "Whoa. It's a review, Jun. I'm allowed to ask.",
            reaction_ko: '워. 리뷰잖아요, 준. 물어볼 수는 있죠.'
          },
          {
            text: "Fair question. Let's just go with no cache at all, then. Problem solved.",
            text_ko: '좋은 질문이에요. 그럼 그냥 캐시를 아예 빼요. 해결됐네요.',
            reaction: 'No cache? That would hammer the database.',
            reaction_ko: '캐시를 빼요? 그럼 데이터베이스가 버티질 못해요.'
          }
        ],
        reply_line: 'Deal. Sorry, everyone, we got carried away.',
        reply_ko: '좋아요. 다들 미안해요, 너무 길어졌네요.'
      },
      {
        situation: "You also want to ask Maya how the mobile app, phase two, will be planned. It starts in January, so it isn't urgent, and it's a long topic.",
        situation_ko: '마야에게 2단계인 모바일 앱을 어떻게 계획할지도 묻고 싶습니다. 1월에 시작하니 급하지 않고, 이야기가 깁니다.',
        line: 'Thanks, both. Jun, anything else?',
        line_ko: '둘 다 고마워요. 준, 더 있어요?',
        prompt: 'Close your turn, and mention the other topic without spending time on it now.',
        prompt_ko: '당신 차례를 마무리하고, 다른 주제는 지금 시간을 쓰지 않는 식으로 꺼내세요.',
        model: "One thing: Maya, can I grab you later about the mobile app? That's it from me.",
        model_ko: '하나만요. 마야, 나중에 모바일 앱 얘기 좀 할 수 있을까요? 저는 여기까지예요.',
        distractors: [
          {
            text: 'Yes, a big one. Maya, how are we planning the mobile app? Like, which screens come first?',
            text_ko: '네, 큰 거 하나요. 마야, 모바일 앱은 어떻게 계획해요? 어떤 화면부터 해요?',
            reaction: "Let's keep that one for later, Jun.",
            reaction_ko: '그건 나중으로 미뤄요, 준.'
          },
          {
            text: 'Nothing else. Oh, and Derek, I still think five minutes is right, by the way.',
            text_ko: '없어요. 아, 그리고 데릭, 그래도 저는 5분이 맞다고 생각해요.',
            reaction: 'We just moved that out of standup, remember?',
            reaction_ko: '그건 방금 스탠드업 밖으로 미뤘잖아요.'
          },
          {
            text: 'One thing: Maya, can I grab you later about the mobile app? It starts next week, right?',
            text_ko: '하나만요. 마야, 나중에 모바일 앱 얘기 좀 할 수 있을까요? 다음 주에 시작하죠?',
            reaction: "Next week? It's planned for January.",
            reaction_ko: '다음 주요? 1월로 잡혀 있어요.'
          }
        ],
        reply_line: "Perfect. Thanks, Jun. Who's next?",
        reply_ko: '좋아요. 고마워요, 준. 다음은 누구죠?'
      }
    ]
  },
  {
    id: 'rt_standup_jun_5',
    title: 'Standup: before the demo',
    title_ko: '스탠드업: 데모를 앞두고',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: 'Priya demos the dashboard to Summit Retail tomorrow. Tell her honestly what will be ready, help her choose where to run it, and offer to back her up.',
    summary_ko: '프리야가 내일 서밋 리테일에 대시보드를 시연합니다. 무엇이 준비될지 솔직하게 말하고, 어디서 시연할지 고르게 돕고, 뒤를 받쳐 주겠다고 하세요.',
    sort: 2004,
    tags: 'meeting,standup,routine',
    turns: [
      {
        situation: "Ten o'clock standup. You're building the store comparison page. The page itself works, but its export button doesn't yet. You can finish the export by the end of tomorrow, after the demo.",
        situation_ko: '10시 스탠드업입니다. 당신은 매장 비교 페이지를 만들고 있습니다. 페이지는 돌아가지만 내보내기 버튼은 아직입니다. 내보내기는 데모가 끝난 뒤, 내일 퇴근 전까지 끝낼 수 있습니다.',
        line: "Reminder: I'm demoing to Greg tomorrow afternoon. Jun, where's the comparison page?",
        line_ko: '다시 알려요. 내일 오후에 그렉한테 시연해요. 준, 비교 페이지는 어디까지 됐어요?',
        prompt: "Tell her honestly what will and won't be ready for the demo.",
        prompt_ko: '데모 때 무엇이 준비되고 무엇이 안 될지 솔직하게 말하세요.',
        model: "The page works, but the export button won't be ready until after the demo.",
        model_ko: '페이지는 돌아가는데, 내보내기 버튼은 데모가 끝난 뒤에야 돼요.',
        distractors: [
          {
            text: "It'll all be ready, the export too. I'll stay late tonight if I have to.",
            text_ko: '내보내기까지 다 될 거예요. 필요하면 오늘 밤늦게까지 할게요.',
            reaction: "Let's not plan on late nights. What's realistic?",
            reaction_ko: '밤샘은 계획에 넣지 말아요. 현실적으로는요?'
          },
          {
            text: 'The comparison page works, and the export button is already done and tested too.',
            text_ko: '비교 페이지는 돌아가고, 내보내기 버튼도 벌써 다 만들어서 시험까지 했어요.',
            reaction: "Really? Last time I checked, it didn't do anything.",
            reaction_ko: '정말요? 지난번에 봤을 땐 아무 반응이 없던데요.'
          },
          {
            text: "It's not really ready. Maybe you should push the demo to next week?",
            text_ko: '아직 준비가 덜 됐어요. 데모를 다음 주로 미루시는 게 어때요?',
            reaction: "Push it? Greg's been waiting for this.",
            reaction_ko: '미루자고요? 그렉이 기다리고 있는데요.'
          }
        ],
        reply_line: "That's fine. I just won't click it.",
        reply_ko: '괜찮아요. 그 버튼만 안 누르면 되죠.'
      },
      {
        situation: "The comparison page is only on staging, which has been stable all week. Production, where the pilot stores work, doesn't have it yet.",
        situation_ko: '비교 페이지는 스테이징에만 있고, 스테이징은 이번 주 내내 안정적이었습니다. 시범 매장들이 쓰는 운영 서버에는 아직 없습니다.',
        line: 'Can I demo on staging, or is that risky?',
        line_ko: '스테이징으로 시연해도 될까요, 위험할까요?',
        prompt: 'Recommend where to run the demo, and give the reason.',
        prompt_ko: '어디서 시연할지 권하고, 이유를 말하세요.',
        model: "Staging is safer. It has the comparison page, and it's been stable all week.",
        model_ko: '스테이징이 더 안전해요. 비교 페이지도 있고, 이번 주 내내 안정적이었어요.',
        distractors: [
          {
            text: 'Use production instead. The comparison page is already live there, too.',
            text_ko: '운영 서버를 쓰세요. 비교 페이지가 벌써 거기 올라가 있어요.',
            reaction: 'Live? I thought it was only on staging.',
            reaction_ko: '올라가 있다고요? 스테이징에만 있는 줄 알았는데요.'
          },
          {
            text: "Staging is safer. It's been going down a lot this week, though.",
            text_ko: '스테이징이 더 안전해요. 이번 주에 자주 멈추긴 했지만요.',
            reaction: 'Wait, then how is it safer?',
            reaction_ko: '잠깐요, 그럼 왜 더 안전해요?'
          },
          {
            text: 'Either one is fine, honestly. Just pick whichever one you like better.',
            text_ko: '솔직히 아무 데나 괜찮아요. 마음에 드는 쪽으로 고르세요.',
            reaction: "I was hoping you'd tell me which.",
            reaction_ko: '어느 쪽인지 말해 주길 바랐는데요.'
          }
        ],
        reply_line: 'Staging it is. Thanks.',
        reply_ko: '스테이징으로 할게요. 고마워요.'
      },
      {
        situation: "Your calendar is open tomorrow afternoon. It's Priya's demo and her client.",
        situation_ko: '내일 오후 당신의 일정은 비어 있습니다. 프리야의 데모이고 그녀의 고객입니다.',
        line: 'Can you join the demo, in case Greg asks something technical?',
        line_ko: '그렉이 기술적인 걸 물을 수도 있으니, 데모에 같이 들어와 줄래요?',
        prompt: 'Agree, and offer one thing that would help her get ready.',
        prompt_ko: '그러겠다고 하고, 그녀가 준비하는 데 도움이 될 것을 하나 제안하세요.',
        model: "Sure, I'll be there. Want a quick run-through this afternoon?",
        model_ko: '그럼요, 들어갈게요. 오늘 오후에 한번 맞춰 볼래요?',
        distractors: [
          {
            text: "Sure. But I'll do most of the talking, if that's okay with you.",
            text_ko: '그럼요. 괜찮으시면 말은 주로 제가 할게요.',
            reaction: "It's my demo, Jun. Just back me up.",
            reaction_ko: '제 데모예요, 준. 뒤만 받쳐 줘요.'
          },
          {
            text: "Tomorrow afternoon? Sorry, I'm booked solid all day tomorrow.",
            text_ko: '내일 오후요? 죄송해요, 내일은 하루 종일 꽉 찼어요.',
            reaction: 'Oh? I thought your calendar was open.',
            reaction_ko: '어? 일정 비어 있는 줄 알았는데요.'
          },
          {
            text: "Sure. Let's walk through the whole demo now, while everyone's here.",
            text_ko: '그럼요. 다들 있을 때 지금 데모 전체를 한번 훑어봐요.',
            reaction: "Not now. Let's keep standup short.",
            reaction_ko: '지금은 말고요. 스탠드업은 짧게 해요.'
          }
        ],
        reply_line: "Yes, please. Let's say two o'clock.",
        reply_ko: '좋아요. 2시로 해요.'
      }
    ]
  },
  {
    id: 'rt_video_jun_1',
    title: 'Video standup: on mute',
    title_ko: '화상 스탠드업: 음소거',
    place: 'home_desk',
    npc: 'priya',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: 'The standup is a video call today. Get your update across after a muted start, ask the right person for what you need, and own up when you miss something on a noisy call.',
    summary_ko: '오늘 스탠드업은 화상 회의입니다. 음소거로 시작이 꼬여도 소식을 전하고, 필요한 것은 맞는 사람에게 부탁하고, 시끄러워서 놓친 말은 솔직하게 다시 물으세요.',
    sort: 2051,
    tags: 'meeting,standup,routine,video',
    turns: [
      {
        situation: "Ten o'clock standup on video: five faces in little squares. Yesterday you finished the store picker; today you're writing its tests. You start talking, and the chat fills up: you're on mute.",
        situation_ko: '화상으로 하는 10시 스탠드업입니다. 작은 네모 안에 얼굴 다섯이 보입니다. 어제는 매장 선택 기능을 끝냈고, 오늘은 그 테스트를 씁니다. 말을 시작하자 채팅창에 메시지가 쏟아집니다. 음소거 상태라고요.',
        line: "Jun, I think you're on mute. ... There you go. Go ahead.",
        line_ko: '준, 음소거된 것 같아요. ... 이제 들려요. 시작해요.',
        prompt: 'Brush off the mute in a few words, then give your update.',
        prompt_ko: '음소거는 짧게 넘기고, 오늘 소식을 전하세요.',
        model: "Sorry, I was muted. Yesterday I finished the store picker, and today I'm writing its tests.",
        model_ko: '죄송해요, 음소거였네요. 어제 매장 선택 기능을 끝냈고, 오늘은 그 테스트를 써요.',
        distractors: [
          {
            text: "Sorry, I was muted. Yesterday I started the store picker, and today I'm finishing it.",
            text_ko: '죄송해요, 음소거였네요. 어제 매장 선택 기능을 시작했고, 오늘 끝낼 거예요.',
            reaction: 'Started? I thought it was done.',
            reaction_ko: '시작했다고요? 끝난 줄 알았는데요.'
          },
          {
            text: "Sorry, my laptop's mic never works properly. Honestly, IT should replace this thing.",
            text_ko: '죄송해요, 노트북 마이크가 늘 말썽이에요. 솔직히 IT에서 이거 바꿔 줘야 해요.',
            reaction: "Let's take that up with Sam after standup.",
            reaction_ko: '그건 스탠드업 끝나고 샘이랑 얘기해요.'
          },
          {
            text: 'Can everyone hear me now? Maybe we should all turn our cameras off to save bandwidth.',
            text_ko: '이제 다들 들려요? 대역폭 아끼게 다 같이 카메라를 끄는 게 어때요?',
            reaction: 'Cameras are fine. Just your update, please.',
            reaction_ko: '카메라는 괜찮아요. 소식만 말해 줘요.'
          }
        ],
        reply_line: 'Got it, thanks.',
        reply_ko: '알겠어요, 고마워요.'
      },
      {
        situation: "You need test data for two pilot stores. Only Derek has access to the sales export, and you haven't asked him yet.",
        situation_ko: '시범 매장 두 곳의 테스트 데이터가 필요합니다. 매출 내보내기 권한은 데릭에게만 있고, 아직 부탁하지 않았습니다.',
        line: 'Anything blocking you?',
        line_ko: '막힌 건 없어요?',
        prompt: 'Ask for what you need, from the person who can give it.',
        prompt_ko: '필요한 것을, 그걸 해 줄 수 있는 사람에게 부탁하세요.',
        model: 'One thing: I need test data for two stores. Derek, could you pull an export for me today?',
        model_ko: '하나 있어요. 매장 두 곳 테스트 데이터가 필요해요. 데릭, 오늘 내보내기 좀 해 줄 수 있어요?',
        distractors: [
          {
            text: 'One thing: I need test data for two stores. Sam, could you pull an export for me today?',
            text_ko: '하나 있어요. 매장 두 곳 테스트 데이터가 필요해요. 샘, 오늘 내보내기 좀 해 줄 수 있어요?',
            reaction: 'Sam? I think only Derek has that access.',
            reaction_ko: '샘이요? 그 권한은 데릭만 있는 것 같은데요.'
          },
          {
            text: "Nope. If I can't get real data, I'll just make up some numbers for the tests.",
            text_ko: '없어요. 진짜 데이터를 못 구하면 테스트용 숫자는 그냥 지어낼게요.',
            reaction: 'Made-up numbers can hide real bugs. Ask for the real thing.',
            reaction_ko: '지어낸 숫자는 진짜 버그를 가릴 수 있어요. 진짜 데이터를 부탁해요.'
          },
          {
            text: "Yes, I'm stuck until Derek sends me data. I can't do anything else today.",
            text_ko: '네, 데릭이 데이터를 보내 줄 때까지 꼼짝 못 해요. 오늘은 다른 걸 못 해요.',
            reaction: 'Nothing else at all? You could start with the simple tests.',
            reaction_ko: '다른 건 하나도요? 간단한 테스트부터 시작해도 되잖아요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: "Sure. I'll send it over after lunch.",
        reply_ko: '그래요. 점심 먹고 보내 줄게요.'
      },
      {
        situation: 'A leaf blower starts up right outside your window. Priya is talking about the release, and you miss the day she says.',
        situation_ko: '창문 바로 밖에서 낙엽 청소기가 돌기 시작합니다. 프리야가 배포 얘기를 하는데, 무슨 요일이라고 했는지 놓쳤습니다.',
        line: "...so that's the plan for the release. Jun, did you catch that?",
        line_ko: '...배포는 그렇게 하기로 해요. 준, 들었어요?',
        prompt: 'Admit the noise made you miss it, and ask her to repeat the key part.',
        prompt_ko: '소음 때문에 놓쳤다고 솔직히 말하고, 중요한 부분을 다시 말해 달라고 하세요.',
        model: 'Sorry, a leaf blower just started outside. Could you repeat the release day?',
        model_ko: '죄송해요, 밖에서 낙엽 청소기가 돌기 시작해서요. 배포 날짜를 다시 말해 줄래요?',
        distractors: [
          {
            text: 'Yes, got it. The release is Tuesday, right? Sounds good to me.',
            text_ko: '네, 들었어요. 배포는 화요일 맞죠? 좋아요.',
            reaction: 'Thursday, actually. Good thing I asked.',
            reaction_ko: '사실은 목요일이에요. 물어보길 잘했네요.'
          },
          {
            text: "Sorry, it's way too loud here. Can we just do standups by email from now on?",
            text_ko: '죄송해요, 여기 너무 시끄러워요. 앞으로 스탠드업은 그냥 이메일로 하면 안 돼요?',
            reaction: "It's one noisy morning, Jun. I'll just repeat it.",
            reaction_ko: '시끄러운 건 오늘 아침뿐이잖아요, 준. 다시 말해 줄게요.'
          },
          {
            text: 'Sorry, a leaf blower just started outside. Could you repeat the part about the budget?',
            text_ko: '죄송해요, 밖에서 낙엽 청소기가 돌기 시작해서요. 예산 얘기를 다시 해 줄래요?',
            reaction: 'Budget? I was talking about the release.',
            reaction_ko: '예산이요? 배포 얘기였는데요.'
          }
        ],
        reply_line: "No problem. It's Thursday, so please have your tests merged by Wednesday.",
        reply_ko: '괜찮아요. 목요일이니까 테스트는 수요일까지 병합해 줘요.'
      }
    ]
  },
  {
    id: 'rt_video_jun_2',
    title: 'Video standup: the VPN',
    title_ko: '화상 스탠드업: VPN',
    place: 'home_desk',
    npc: 'priya',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: 'Your VPN dropped this morning. Give your update honestly, report the problem the right way, and turn your camera on when the team asks.',
    summary_ko: '오늘 아침 VPN이 끊겼습니다. 소식을 솔직하게 전하고, 문제는 맞는 방법으로 알리고, 팀이 부탁하면 카메라를 켜세요.',
    sort: 2052,
    tags: 'meeting,standup,routine,video',
    turns: [
      {
        situation: "Ten o'clock standup on video. The VPN dropped twice this morning, and you lost about an hour. Yesterday you fixed the date filter bug; today you're on the export button.",
        situation_ko: '화상으로 하는 10시 스탠드업입니다. 오늘 아침 VPN이 두 번 끊겨서 한 시간쯤 날렸습니다. 어제는 날짜 필터 버그를 고쳤고, 오늘은 내보내기 버튼을 만듭니다.',
        line: "Morning, Jun. How's it going?",
        line_ko: '좋은 아침이에요, 준. 어때요?',
        prompt: 'Give your update, and mention the connection trouble briefly.',
        prompt_ko: '오늘 소식을 전하고, 접속 문제도 짧게 말하세요.',
        model: "Yesterday I fixed the date filter. Today it's the export button. The VPN dropped twice this morning, though.",
        model_ko: '어제는 날짜 필터를 고쳤고, 오늘은 내보내기 버튼을 해요. 그런데 아침에 VPN이 두 번 끊겼어요.',
        distractors: [
          {
            text: "Yesterday I fixed the export button. Today it's the date filter. The VPN dropped twice this morning, though.",
            text_ko: '어제는 내보내기 버튼을 고쳤고, 오늘은 날짜 필터를 해요. 그런데 아침에 VPN이 두 번 끊겼어요.',
            reaction: "Wait, I thought the export was today's job.",
            reaction_ko: '잠깐, 내보내기가 오늘 할 일인 줄 알았는데요.'
          },
          {
            text: "Not great, honestly. The VPN keeps dropping, so working from home just doesn't work for me.",
            text_ko: '솔직히 별로예요. VPN이 자꾸 끊겨서 재택근무는 저랑 안 맞아요.',
            reaction: "Let's fix the VPN before we give up on home days.",
            reaction_ko: '재택을 포기하기 전에 VPN부터 고쳐 봐요.'
          },
          {
            text: "Yesterday I fixed the date filter. Today it's the export button. Everything's running perfectly.",
            text_ko: '어제는 날짜 필터를 고쳤고, 오늘은 내보내기 버튼을 해요. 다 완벽하게 돌아가요.',
            reaction: 'Really? Your status said offline for an hour.',
            reaction_ko: '정말요? 한 시간 동안 오프라인으로 떠 있던데요.'
          }
        ],
        reply_line: "Ugh, sorry. That's no fun.",
        reply_ko: '아이고, 저런. 힘들었겠네요.'
      },
      {
        situation: "Sam from IT fixes VPN problems through the help desk. You haven't filed a ticket yet.",
        situation_ko: 'IT의 샘이 헬프데스크로 VPN 문제를 처리합니다. 아직 티켓을 올리지 않았습니다.',
        line: 'Have you told Sam?',
        line_ko: '샘한테 말했어요?',
        prompt: "Say what you'll do about it, through the proper channel.",
        prompt_ko: '어떻게 할지, 정해진 방법으로 처리하겠다고 말하세요.',
        model: "Not yet. I'll file a help desk ticket right after standup, with the times it dropped.",
        model_ko: '아직요. 스탠드업 끝나면 바로 끊긴 시각을 적어서 헬프데스크 티켓을 올릴게요.',
        distractors: [
          {
            text: "Not yet. I'll call Sam on his cell tonight and ask him to take a look.",
            text_ko: '아직요. 오늘 밤에 샘 휴대전화로 전화해서 봐 달라고 할게요.',
            reaction: 'Tonight? Please use the help desk instead.',
            reaction_ko: '오늘 밤이요? 헬프데스크로 해 줘요.'
          },
          {
            text: "No. It's probably just my home Wi-Fi, so there's nothing IT can do.",
            text_ko: '아뇨. 아마 집 와이파이 문제라서 IT가 해 줄 게 없을 거예요.',
            reaction: 'Maybe, but let IT check first.',
            reaction_ko: '그럴 수도 있지만 IT가 먼저 확인하게 해요.'
          },
          {
            text: "Not yet. I'll file a help desk ticket next week, when I'm back at the office.",
            text_ko: '아직요. 다음 주에 사무실 나가면 헬프데스크 티켓을 올릴게요.',
            reaction: "Next week? You'll lose more hours before then.",
            reaction_ko: '다음 주요? 그 전에 시간을 더 날릴 거예요.'
          }
        ],
        reply_line: 'Good. The times will help him a lot.',
        reply_ko: '좋아요. 시각을 적어 주면 샘한테 큰 도움이 돼요.'
      },
      {
        speaker: 'maya',
        situation: 'Maya joins a few minutes late. Your camera is off because your room is a mess.',
        situation_ko: '마야가 몇 분 늦게 들어옵니다. 방이 어질러져 있어서 당신은 카메라를 꺼 두었습니다.',
        line: 'Quick ask, everyone: cameras on for standup, if you can. Jun, could you turn yours on?',
        line_ko: '다들 부탁 하나 할게요. 스탠드업 때는 되도록 카메라를 켜 줘요. 준, 켜 줄 수 있어요?',
        prompt: 'Agree politely and turn it on, with a light word about your room.',
        prompt_ko: '기분 좋게 알겠다고 하고 카메라를 켜면서, 방 얘기를 가볍게 덧붙이세요.',
        model: 'Sure, one sec. Please ignore the laundry behind me!',
        model_ko: '그럼요, 잠깐만요. 뒤에 빨래는 못 본 걸로 해 주세요!',
        distractors: [
          {
            text: "I'd rather not. Nobody needs to see my apartment.",
            text_ko: '안 켜고 싶어요. 제 집을 볼 필요는 없잖아요.',
            reaction: "It's only for ten minutes, but okay. We can talk later.",
            reaction_ko: '10분만인데요. 알겠어요, 나중에 얘기해요.'
          },
          {
            text: 'Sure, one sec. Though cameras on is a bit much for a ten-minute call.',
            text_ko: '네, 잠깐만요. 근데 10분짜리 통화에 카메라까지 켜는 건 좀 과한 것 같아요.',
            reaction: 'I hear you, but it helps us feel like a team.',
            reaction_ko: '무슨 말인지 알지만, 얼굴을 보면 팀처럼 느껴져요.'
          },
          {
            text: "Sure. I'll have it on for the next standup.",
            text_ko: '네. 다음 스탠드업 때는 켤게요.',
            reaction: 'Now would be great, actually.',
            reaction_ko: '사실 지금 켜 주면 좋겠어요.'
          }
        ],
        reply_line: "Ha, we've all got laundry. Good to see you!",
        reply_ko: '하하, 빨래는 다들 있죠. 얼굴 보니 좋네요!'
      }
    ]
  },
  {
    id: 'rt_video_jun_3',
    title: 'Video standup: the lag',
    title_ko: '화상 스탠드업: 지연',
    place: 'home_desk',
    npc: 'priya',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: 'The call lags, and people talk over each other. Give the floor politely, keep your update specific, and take a side question offline.',
    summary_ko: '통화가 지연되어 서로 말이 겹칩니다. 정중하게 순서를 양보하고, 소식은 구체적으로 전하고, 곁가지 질문은 회의 뒤로 미루세요.',
    sort: 2053,
    tags: 'meeting,standup,routine,video',
    turns: [
      {
        speaker: 'derek',
        situation: "Ten o'clock standup on video. The call lags a little. You and Derek both start talking at the same moment, then both stop.",
        situation_ko: '화상으로 하는 10시 스탠드업입니다. 통화가 조금 지연됩니다. 당신과 데릭이 동시에 말을 시작했다가 둘 다 멈춥니다.',
        line: 'Oh, sorry. Go ahead.',
        line_ko: '아, 미안해요. 먼저 해요.',
        prompt: 'Let him go first, politely.',
        prompt_ko: '정중하게 데릭에게 먼저 하라고 양보하세요.',
        model: "No, you go ahead, Derek. I'll go after you.",
        model_ko: '아니에요, 데릭 먼저 해요. 전 다음에 할게요.',
        distractors: [
          {
            text: "No, you go ahead, Priya. I'll go after you.",
            text_ko: '아니에요, 프리야 먼저 해요. 전 다음에 할게요.',
            reaction: "Priya's running it. I meant you.",
            reaction_ko: '진행은 프리야가 해요. 당신한테 한 말이에요.'
          },
          {
            text: "Okay, thanks. Could you mute, though? There's an echo from your side.",
            text_ko: '네, 고마워요. 근데 음소거 좀 해 줄래요? 그쪽에서 울려요.',
            reaction: "I'm on headphones, Jun. No echo here.",
            reaction_ko: '저 헤드폰 쓰고 있어요, 준. 안 울려요.'
          },
          {
            text: "Thanks. I'll be fast, since my update is more important today.",
            text_ko: '고마워요. 오늘은 제 소식이 더 중요하니까 빨리 할게요.',
            reaction: 'More important? Okay...',
            reaction_ko: '더 중요하다고요? 음...'
          }
        ],
        reply_line: "Thanks. I'll keep it short.",
        reply_ko: '고마워요. 짧게 할게요.'
      },
      {
        situation: "Your turn. Yesterday you reviewed Derek's pull request and left three comments. At two today you're pairing with Derek on the inventory chart.",
        situation_ko: '당신 차례입니다. 어제 데릭의 풀 리퀘스트를 리뷰하고 의견 세 개를 남겼습니다. 오늘 2시에는 데릭과 재고 차트를 같이 작업합니다.',
        line: 'Jun, your turn.',
        line_ko: '준, 당신 차례예요.',
        prompt: 'Give a short, specific update.',
        prompt_ko: '짧고 구체적으로 소식을 전하세요.',
        model: "Yesterday I reviewed Derek's pull request and left a few comments. At two, Derek and I are pairing on the inventory chart.",
        model_ko: '어제 데릭의 풀 리퀘스트를 리뷰하고 의견을 몇 개 남겼어요. 2시에는 데릭과 재고 차트를 같이 해요.',
        distractors: [
          {
            text: "Yesterday I reviewed Derek's pull request and approved it as is. At two, Derek and I are pairing on the inventory chart.",
            text_ko: '어제 데릭의 풀 리퀘스트를 리뷰하고 그대로 승인했어요. 2시에는 데릭과 재고 차트를 같이 해요.',
            reaction: 'Approved? I thought you had a few comments.',
            reaction_ko: '승인했다고요? 의견을 남긴 줄 알았는데요.'
          },
          {
            text: "Yesterday I reviewed Derek's pull request and left a few comments. At two, Derek and I are pairing on the sales chart.",
            text_ko: '어제 데릭의 풀 리퀘스트를 리뷰하고 의견을 몇 개 남겼어요. 2시에는 데릭과 매출 차트를 같이 해요.',
            reaction: 'The sales chart? I have inventory on the board.',
            reaction_ko: '매출 차트요? 보드에는 재고로 되어 있는데요.'
          },
          {
            text: 'Same as usual, really. Some coding, some reviews, some meetings. Nothing special.',
            text_ko: '늘 하던 거예요. 코딩 조금, 리뷰 조금, 회의 조금. 특별한 건 없어요.',
            reaction: 'Could you be a little more specific?',
            reaction_ko: '조금만 더 구체적으로 말해 줄래요?'
          }
        ],
        reply_line: 'Great, thanks.',
        reply_ko: '좋아요, 고마워요.'
      },
      {
        situation: 'The call is almost over. You have a quick question for Derek about the chart library, but it only matters to the two of you.',
        situation_ko: '통화가 거의 끝나 갑니다. 차트 라이브러리에 대해 데릭에게 물어볼 게 있지만, 두 사람에게만 해당하는 얘기입니다.',
        line: 'Anything else before we drop off?',
        line_ko: '끊기 전에 더 할 말 있어요?',
        prompt: 'Keep the call short: take your question offline.',
        prompt_ko: '통화를 짧게 끝내도록, 질문은 회의 뒤로 미루세요.',
        model: "Just one for Derek, but I'll message him after this.",
        model_ko: '데릭한테 하나 있는데, 끝나고 메시지 보낼게요.',
        distractors: [
          {
            text: 'Yes. Derek, which version of the chart library are we on? Is it the old one or the new one?',
            text_ko: '네. 데릭, 우리 차트 라이브러리 몇 버전 써요? 예전 거예요, 새 거예요?',
            reaction: 'Can that wait until after standup?',
            reaction_ko: '그건 스탠드업 끝나고 해도 되지 않아요?'
          },
          {
            text: "Just one for Derek, but let's all stay on so everyone can hear it.",
            text_ko: '데릭한테 하나 있는데, 다들 들을 수 있게 다 같이 남아 있어요.',
            reaction: 'Only if it matters to everyone.',
            reaction_ko: '다들 알아야 하는 거라면요.'
          },
          {
            text: "Just one for Sam, but I'll message him after this.",
            text_ko: '샘한테 하나 있는데, 끝나고 메시지 보낼게요.',
            reaction: 'Sam? I thought it was about the chart.',
            reaction_ko: '샘이요? 차트 얘기인 줄 알았는데요.'
          }
        ],
        reply_speaker: 'derek',
        reply_line: 'Sounds good. Ping me.',
        reply_ko: '좋아요. 메시지 줘요.'
      }
    ]
  },
  {
    id: 'rt_1on1_jun_1',
    title: '1:1: too much on your plate',
    title_ko: '1:1: 할 일이 너무 많아요',
    place: 'office_manager',
    npc: 'maya',
    day_from: 16,
    day_to: null,
    time_from: '10:45',
    time_to: '11:45',
    summary: 'Your biweekly 1:1 with Maya. Be honest about your workload, agree on what can wait, and work out how to handle the next extra request.',
    summary_ko: '격주로 하는 마야와의 1:1입니다. 업무량을 솔직하게 말하고, 미뤄도 되는 일을 정하고, 다음에 일이 더 들어오면 어떻게 할지 정하세요.',
    sort: 2100,
    tags: 'meeting,manager,one-on-one,routine',
    turns: [
      {
        situation: "Your biweekly 1:1 in Maya's office. Lately you've been staying until seven: store rollout tickets, code reviews, and an estimate Priya asked you for on the mobile app.",
        situation_ko: '마야의 방에서 격주로 하는 1:1입니다. 요즘 일곱 시까지 남아 있습니다. 매장 확대 티켓, 코드 리뷰, 거기에 프리야가 부탁한 모바일 앱 견적까지요.',
        line: 'Hi, Jun. Have a seat. So, how are things going? Be honest.',
        line_ko: '안녕하세요, 준. 앉아요. 요즘 어때요? 솔직하게요.',
        prompt: 'Tell her the truth about how the last couple of weeks have felt, and why.',
        prompt_ko: '지난 2주가 어땠는지 이유와 함께 솔직하게 말하세요.',
        model: "Honestly, I'm stretched thin. Rollout tickets, reviews, Priya's estimate... I'm here until seven.",
        model_ko: '솔직히 좀 벅차요. 확대 티켓, 리뷰, 프리야가 부탁한 견적까지... 일곱 시까지 있어요.',
        distractors: [
          {
            text: "Great, actually. The rollout is quiet, so I've had plenty of time for reviews and Priya's estimate.",
            text_ko: '좋아요, 사실. 확대 적용이 조용해서 리뷰도 하고 프리야 견적도 할 시간이 넉넉해요.',
            reaction: 'Quiet? Then why do I see you online at seven?',
            reaction_ko: '조용하다고요? 그럼 일곱 시에 왜 접속해 있는 거예요?'
          },
          {
            text: "Honestly, it's a mess. Priya keeps dumping her work on me, and I'm here until seven every night.",
            text_ko: '솔직히 엉망이에요. 프리야가 자기 일을 자꾸 저한테 떠넘겨서 매일 일곱 시까지 있어요.',
            reaction: "Let's keep it about the work, not about Priya. What did she ask for?",
            reaction_ko: '프리야 말고 일 얘기를 하죠. 프리야가 뭘 부탁했어요?'
          },
          {
            text: "It's fine. I can handle anything you give me. Feel free to add more if the team needs it.",
            text_ko: '괜찮아요. 뭘 주셔도 다 할 수 있어요. 팀에 필요하면 더 주셔도 돼요.',
            reaction: 'I appreciate that, but I need the real picture, Jun.',
            reaction_ko: '고마운 말이지만, 실제 상황을 알아야 해요, 준.'
          }
        ],
        reply_line: "Thanks for telling me. That's exactly what these 1:1s are for.",
        reply_ko: '말해 줘서 고마워요. 1:1이 바로 그러라고 있는 거예요.'
      },
      {
        situation: 'Maya pulls up the team board. The store rollout is the top priority right now. The mobile app is phase two, and no work on it has started yet.',
        situation_ko: '마야가 팀 보드를 띄웁니다. 지금 최우선은 매장 확대 적용입니다. 모바일 앱은 2단계이고, 아직 아무 작업도 시작하지 않았습니다.',
        line: "Okay. Let's look at it together. What could wait?",
        line_ko: '좋아요. 같이 봐요. 뭘 미룰 수 있을까요?',
        prompt: 'Suggest which task can be pushed back, based on what matters most right now.',
        prompt_ko: '지금 무엇이 가장 중요한지를 근거로, 뒤로 미룰 일을 제안하세요.',
        model: "The mobile estimate, I think. Phase two hasn't started, so the rollout comes first.",
        model_ko: '모바일 견적이요. 2단계는 아직 시작 전이니까 확대 적용이 먼저일 것 같아요.',
        distractors: [
          {
            text: 'The rollout tickets, I think. The stores can wait a bit, but Priya needs her estimate.',
            text_ko: '확대 티켓이요. 매장은 좀 기다려도 되지만, 프리야는 견적이 필요하잖아요.',
            reaction: 'Hmm. The stores are what Greg is watching right now.',
            reaction_ko: '흠. 지금 그렉이 지켜보는 게 바로 매장이에요.'
          },
          {
            text: 'Nothing, really. If I skip lunch for a week or two, I can get it all done.',
            text_ko: '딱히 없어요. 한두 주 점심을 거르면 다 할 수 있어요.',
            reaction: "Skipping lunch isn't a plan, Jun.",
            reaction_ko: '점심 거르는 건 계획이 아니에요, 준.'
          },
          {
            text: 'The code reviews. Derek can just merge his own changes for a while.',
            text_ko: '코드 리뷰요. 당분간 데릭이 자기 코드는 직접 머지하면 되잖아요.',
            reaction: "Without a review? I'd rather not.",
            reaction_ko: '리뷰 없이요? 그건 안 하는 게 좋겠어요.'
          }
        ],
        reply_line: "Agreed. I'll tell Priya the estimate moves to later. She'll understand.",
        reply_ko: '동의해요. 견적은 나중으로 미룬다고 제가 프리야한테 말할게요. 이해할 거예요.'
      },
      {
        situation: 'Maya taps her pen on her notebook.',
        situation_ko: '마야가 펜으로 공책을 톡톡 두드립니다.',
        line: 'Next time someone brings you something extra, what will you do?',
        line_ko: '다음에 누가 일을 더 가져오면 어떻게 할 거예요?',
        prompt: "Say how you'll handle new requests without taking everything on or turning people away.",
        prompt_ko: '모든 걸 떠안지도, 사람을 돌려보내지도 않고 새 요청을 어떻게 다룰지 말하세요.',
        model: "I'll ask how urgent it is, and check with you or Derek before I say yes.",
        model_ko: '얼마나 급한지 묻고, 수락하기 전에 마야나 데릭에게 확인할게요.',
        distractors: [
          {
            text: "I'll just say no. I already have enough work, and they can find someone else.",
            text_ko: '그냥 거절할게요. 일은 이미 충분하니까 다른 사람을 찾으면 되죠.',
            reaction: 'That might come across badly. Most requests are fair ones.',
            reaction_ko: '그러면 안 좋게 비칠 수 있어요. 대부분은 정당한 요청이에요.'
          },
          {
            text: "I'll say yes and stay late. I don't want anyone to think I'm not a team player.",
            text_ko: '수락하고 늦게까지 남을게요. 팀을 생각 안 하는 사람처럼 보이기 싫어요.',
            reaction: "That's how we got here, Jun.",
            reaction_ko: '그래서 지금 이렇게 된 거예요, 준.'
          },
          {
            text: "I'll send them all to you. You can decide on everything that comes to me.",
            text_ko: '전부 마야한테 보낼게요. 저한테 오는 건 다 마야가 정하시면 돼요.',
            reaction: "Everything? Let's not go that far. You can make some calls yourself.",
            reaction_ko: '전부요? 그렇게까진 말고요. 어떤 건 준이 직접 정해도 돼요.'
          }
        ],
        reply_line: 'Perfect. "Let me check first" is always a fine answer.',
        reply_ko: '좋아요. "먼저 확인해 볼게요"는 언제든 괜찮은 대답이에요.'
      },
      {
        situation: 'The half hour is almost up.',
        situation_ko: '30분이 거의 다 됐습니다.',
        line: 'Anything else on your mind before we wrap up?',
        line_ko: '마무리하기 전에 더 하고 싶은 얘기 있어요?',
        prompt: "Thank her, and say what you'll do right after this meeting.",
        prompt_ko: '고맙다고 하고, 회의가 끝나면 바로 무엇을 할지 말하세요.',
        model: "No, that helped a lot. I'll update the board to show the estimate as later.",
        model_ko: '아니요, 많이 도움됐어요. 견적이 뒤로 밀린 게 보이게 보드를 고쳐 둘게요.',
        distractors: [
          {
            text: "No, that helped. I'll go tell Priya myself that her estimate is cancelled.",
            text_ko: '아니요, 도움됐어요. 견적은 취소됐다고 제가 직접 프리야한테 말할게요.',
            reaction: "Cancelled? It's just later. And I said I'd talk to her.",
            reaction_ko: '취소요? 그냥 나중으로 미룬 거예요. 그리고 프리야한테는 제가 말한다고 했잖아요.'
          },
          {
            text: "Not really. I'll get back to the estimate and try to finish it tonight.",
            text_ko: '딱히요. 다시 견적으로 돌아가서 오늘 밤에 끝내 볼게요.',
            reaction: 'Tonight? We just agreed it can wait.',
            reaction_ko: '오늘 밤에요? 방금 미뤄도 된다고 했잖아요.'
          },
          {
            text: 'Actually, could we make these monthly? Every two weeks feels like a lot.',
            text_ko: '사실, 이거 한 달에 한 번으로 하면 안 될까요? 2주마다는 좀 많은 것 같아요.',
            reaction: "Let's keep them for now. I think they're helping.",
            reaction_ko: '당분간은 이대로 해요. 도움이 되고 있는 것 같아요.'
          }
        ],
        reply_line: 'Great. Let me know if you have any questions.',
        reply_ko: '좋아요. 궁금한 게 있으면 언제든 말해요.'
      }
    ]
  },
  {
    id: 'rt_1on1_jun_2',
    title: '1:1: where you want to grow',
    title_ko: '1:1: 어떻게 성장하고 싶은지',
    place: 'office_manager',
    npc: 'maya',
    day_from: 16,
    day_to: null,
    time_from: '10:45',
    time_to: '11:45',
    summary: 'Maya wants to talk about the long term. Share a career goal, ask how reviews work here, take her feedback well, and agree on a next step.',
    summary_ko: '마야가 장기적인 이야기를 하고 싶어 합니다. 커리어 목표를 말하고, 이곳의 평가가 어떻게 이뤄지는지 묻고, 그녀의 피드백을 잘 받아들이고, 다음 단계를 정하세요.',
    sort: 2101,
    tags: 'meeting,manager,one-on-one,routine',
    turns: [
      {
        situation: 'Your biweekly 1:1. Maya has a fresh page in her notebook titled "Jun: goals." You enjoy the backend data work most, and you liked working with the store managers in the pilot.',
        situation_ko: '격주 1:1입니다. 마야의 공책에 "준: 목표"라고 적힌 새 페이지가 펼쳐져 있습니다. 당신은 백엔드 데이터 작업이 제일 재미있고, 시범 운영 때 매장 관리자들과 일한 것도 좋았습니다.',
        line: "Today I'd like to talk about the long term. Where do you want to be in a year or two?",
        line_ko: '오늘은 장기적인 얘기를 하고 싶어요. 1~2년 뒤에 어디에 있고 싶어요?',
        prompt: 'Share a goal that fits what you enjoy most.',
        prompt_ko: '가장 즐기는 일에 맞는 목표를 말하세요.',
        model: "I'd like to own a backend service end to end, and keep working with the stores.",
        model_ko: '백엔드 서비스 하나를 처음부터 끝까지 맡고 싶어요. 매장과 일하는 것도 계속하고 싶고요.',
        distractors: [
          {
            text: "I'd like to move to frontend design. Data work isn't really my thing, to be honest.",
            text_ko: '프런트엔드 디자인 쪽으로 가고 싶어요. 솔직히 데이터 작업은 잘 안 맞아요.',
            reaction: 'Really? Derek says the data side is where you shine.',
            reaction_ko: '정말요? 데릭은 준이 데이터 쪽에서 빛난다던데요.'
          },
          {
            text: "Honestly, I want your job. Give me a year, and I'll be managing this whole team.",
            text_ko: '솔직히 마야 자리를 원해요. 1년만 주시면 이 팀 전체를 관리하고 있을 거예요.',
            reaction: "Ha. Ambition is good. Let's start with a step or two before that.",
            reaction_ko: '하. 야망은 좋아요. 그 전에 한두 걸음부터 시작하죠.'
          },
          {
            text: "I haven't really thought about it. I just work on whatever tickets I get each day.",
            text_ko: '별로 생각 안 해 봤어요. 그냥 매일 받는 티켓을 처리할 뿐이에요.',
            reaction: "That's okay, but I'd like you to think about it. It's your career.",
            reaction_ko: '괜찮아요, 그래도 생각해 봤으면 해요. 준의 커리어니까요.'
          }
        ],
        reply_line: 'I like that. Owning a service is a very reachable goal here.',
        reply_ko: '좋네요. 서비스 하나를 맡는 건 여기서 충분히 이룰 수 있는 목표예요.'
      },
      {
        situation: 'New hires here get a performance review and a raise discussion after their first 90 days. After that, reviews come twice a year.',
        situation_ko: '이곳 신입은 첫 90일이 지나면 성과 평가와 연봉 논의를 합니다. 그 뒤로는 1년에 두 번 평가가 있습니다.',
        line: 'That ties into your reviews. Do you know how they work here?',
        line_ko: '그게 평가와도 이어져요. 여기서 평가가 어떻게 되는지 알아요?',
        prompt: "Admit what you don't know, and ask what she looks at.",
        prompt_ko: '모르는 건 모른다고 하고, 그녀가 무엇을 보는지 물어보세요.',
        model: 'Not really. What do you look at, and how can I prepare?',
        model_ko: '잘 몰라요. 어떤 걸 보시고, 저는 어떻게 준비하면 돼요?',
        distractors: [
          {
            text: 'Sure. Reviews are just about how many tickets I close, right?',
            text_ko: '그럼요. 평가는 티켓을 몇 개 처리했는지만 보는 거죠?',
            reaction: 'Tickets are part of it, but far from all of it.',
            reaction_ko: '티켓도 일부지만, 그게 전부는 절대 아니에요.'
          },
          {
            text: "Yes. And I'd like a big raise, so let's plan for that now.",
            text_ko: '네. 그리고 연봉을 많이 올리고 싶으니까 지금부터 그걸 계획해요.',
            reaction: "Let's talk about the work first, then the numbers.",
            reaction_ko: '일 얘기를 먼저 하고, 숫자는 그다음에 하죠.'
          },
          {
            text: "Not really. But that's HR's job, so I'll just ask Linda.",
            text_ko: '잘 몰라요. 그래도 그건 인사팀 일이니까 린다한테 물어볼게요.',
            reaction: 'Linda can explain the forms, but I write your review.',
            reaction_ko: '서류는 린다가 설명해 줄 수 있지만, 평가는 제가 써요.'
          }
        ],
        reply_line: 'Impact, teamwork, and growth. Keep a short list of your wins as you go. It makes it much easier.',
        reply_ko: '성과, 팀워크, 성장이요. 잘한 일을 그때그때 짧게 적어 두세요. 훨씬 쉬워져요.'
      },
      {
        situation: 'Maya sets her pen down.',
        situation_ko: '마야가 펜을 내려놓습니다.',
        line: "Here's one thing to work on. In design discussions, you go quiet, even when you have good ideas. Derek has noticed too.",
        line_ko: '하나 개선할 점이 있어요. 설계 논의 때 좋은 아이디어가 있어도 조용해져요. 데릭도 알아챘고요.',
        prompt: 'Take the feedback well, and ask for a way to get better at it.',
        prompt_ko: '피드백을 잘 받아들이고, 나아질 방법을 청하세요.',
        model: "That's fair. I worry about being wrong. Could I get a chance to practice?",
        model_ko: '맞는 말이에요. 틀릴까 봐 걱정돼서요. 연습할 기회를 얻을 수 있을까요?',
        distractors: [
          {
            text: "That's not really fair. Derek talks so much that nobody else gets a word in.",
            text_ko: '그건 좀 불공평해요. 데릭이 말을 너무 많이 해서 다른 사람은 끼어들 틈이 없어요.',
            reaction: 'Derek does talk a lot. But this is about you, Jun.',
            reaction_ko: '데릭이 말이 많긴 하죠. 그래도 이건 준 얘기예요.'
          },
          {
            text: "Okay. From now on, I'll speak up in every meeting, about everything.",
            text_ko: '알겠어요. 이제부터 모든 회의에서 모든 것에 대해 말할게요.',
            reaction: "Every meeting? Let's aim for the ones that count.",
            reaction_ko: '모든 회의요? 중요한 회의부터 목표로 하죠.'
          },
          {
            text: "Sorry. I'm just not good at that stuff. I'm more of a quiet coder.",
            text_ko: '죄송해요. 그런 건 원래 잘 못해요. 저는 조용히 코딩하는 타입이라서요.',
            reaction: "I think you're selling yourself short.",
            reaction_ko: '스스로를 너무 낮춰 보는 것 같아요.'
          }
        ],
        reply_line: "Being wrong is fine. That's what design talks are for.",
        reply_ko: '틀려도 괜찮아요. 설계 논의가 그러라고 있는 거예요.'
      },
      {
        situation: 'The team holds a design review whenever a big piece of work starts. The next one is about a new sales report for the stores.',
        situation_ko: '팀은 큰 작업을 시작할 때마다 설계 리뷰를 합니다. 다음 리뷰는 매장용 새 매출 보고서에 관한 것입니다.',
        line: "Here's an idea. How about you lead the next design review?",
        line_ko: '이건 어때요? 다음 설계 리뷰를 준이 진행해 보는 거예요.',
        prompt: "Accept, and say what help you'd like to get ready for it.",
        prompt_ko: '받아들이고, 준비하는 데 어떤 도움을 받고 싶은지 말하세요.',
        model: "I'll do it. Could I walk Derek through my plan the day before?",
        model_ko: '할게요. 전날 데릭에게 제 계획을 먼저 보여 줘도 될까요?',
        distractors: [
          {
            text: "I'll do it, as long as Derek runs the meeting and I just take notes.",
            text_ko: '할게요. 회의는 데릭이 진행하고 저는 메모만 한다면요.',
            reaction: 'Then Derek is leading it, Jun.',
            reaction_ko: '그럼 진행하는 건 데릭이잖아요, 준.'
          },
          {
            text: "Sure, no prep needed. I'll just figure it out as I go in the room.",
            text_ko: '그럼요, 준비는 필요 없어요. 회의실에서 하면서 알아서 할게요.',
            reaction: 'A little prep would go a long way.',
            reaction_ko: '조금만 준비해도 훨씬 나을 거예요.'
          },
          {
            text: "Maybe later. Let me watch a few more first, and then I'll decide.",
            text_ko: '나중에요. 몇 번 더 지켜보고 나서 정할게요.',
            reaction: "You've watched plenty. I think you're ready.",
            reaction_ko: '충분히 지켜봤어요. 준비된 것 같아요.'
          }
        ],
        reply_line: "Great plan. He'll be glad to help. Let me know if you have any questions.",
        reply_ko: '좋은 계획이에요. 데릭도 기꺼이 도울 거예요. 궁금한 게 있으면 언제든 말해요.'
      }
    ]
  },
  {
    id: 'rt_1on1_jun_3',
    title: '1:1: a conference and feedback for Maya',
    title_ko: '1:1: 콘퍼런스, 그리고 마야에게 하는 피드백',
    place: 'office_manager',
    npc: 'maya',
    day_from: 16,
    day_to: null,
    time_from: '10:45',
    time_to: '11:45',
    summary: 'Ask Maya to use your training budget on a developer conference, explain what the team gets out of it, give her honest feedback when she asks, and say how your work will be covered.',
    summary_ko: '교육 예산으로 개발자 콘퍼런스에 가도 되는지 마야에게 묻고, 팀에 어떤 도움이 되는지 설명하고, 그녀가 물으면 솔직한 피드백을 주고, 자리를 비우는 동안 일이 어떻게 돌아갈지 말하세요.',
    sort: 2102,
    tags: 'meeting,manager,one-on-one,routine',
    turns: [
      {
        situation: "Your biweekly 1:1. Each developer has a training budget of $1,500 a year, and you haven't used yours. A two-day developer conference is coming up in Ridgeport: $600 a ticket, plus one night at a hotel.",
        situation_ko: '격주 1:1입니다. 개발자마다 1년에 1,500달러의 교육 예산이 있는데, 당신은 아직 쓰지 않았습니다. 리지포트에서 이틀짜리 개발자 콘퍼런스가 곧 열립니다. 티켓은 600달러, 호텔 1박이 추가됩니다.',
        line: "So, what's on your list today?",
        line_ko: '자, 오늘은 어떤 얘기를 할까요?',
        prompt: 'Bring up the conference, and ask whether you can go.',
        prompt_ko: '콘퍼런스 얘기를 꺼내고, 가도 되는지 물어보세요.',
        model: "There's a developer conference in Ridgeport. Could I use my training budget for it?",
        model_ko: '리지포트에서 개발자 콘퍼런스가 있어요. 거기에 교육 예산을 써도 될까요?',
        distractors: [
          {
            text: "There's a developer conference in Ridgeport. I already bought a ticket. Is that okay?",
            text_ko: '리지포트에서 개발자 콘퍼런스가 있어요. 티켓은 벌써 샀어요. 괜찮죠?',
            reaction: 'You bought it already? Next time, ask first, please.',
            reaction_ko: '벌써 샀어요? 다음엔 먼저 물어봐 줘요.'
          },
          {
            text: "There's a conference I'd like to go to. Could the company cover the whole week?",
            text_ko: '가고 싶은 콘퍼런스가 있어요. 회사에서 일주일 전부 지원해 줄 수 있어요?',
            reaction: 'A whole week? I thought it was a two-day event.',
            reaction_ko: '일주일 전부요? 이틀짜리 행사인 줄 알았는데요.'
          },
          {
            text: "Could I get some money for training? I'm not sure what for yet, but something.",
            text_ko: '교육비를 좀 받을 수 있을까요? 뭘 할지는 아직 모르겠지만 뭔가요.',
            reaction: 'Come back when you have something specific in mind.',
            reaction_ko: '구체적으로 생각한 게 생기면 다시 와요.'
          }
        ],
        reply_line: "You haven't touched your budget yet, so it's possible. Tell me more.",
        reply_ko: '아직 예산을 하나도 안 썼으니 가능해요. 더 얘기해 봐요.'
      },
      {
        situation: 'Half the talks are about building mobile apps: the same kind of work as phase two, the mobile app for Summit Retail.',
        situation_ko: '발표의 절반이 모바일 앱 개발에 관한 것입니다. 서밋 리테일의 모바일 앱인 2단계와 같은 종류의 일입니다.',
        line: 'What would you and the team get out of it?',
        line_ko: '준과 팀에는 어떤 도움이 될까요?',
        prompt: "Connect the conference to the team's upcoming work, and offer to pass on what you learn.",
        prompt_ko: '콘퍼런스를 팀의 다음 일과 연결하고, 배운 걸 전하겠다고 하세요.',
        model: "Half the talks are on mobile apps, which we'll need for phase two. I'll share notes after.",
        model_ko: '발표 절반이 모바일 앱이라 2단계에 필요해요. 다녀와서 정리한 걸 공유할게요.',
        distractors: [
          {
            text: "Half the talks are on mobile apps, and I'd love to see Ridgeport again. It's a great city.",
            text_ko: '발표 절반이 모바일 앱이고, 리지포트도 다시 가 보고 싶어요. 멋진 도시예요.',
            reaction: 'The city is a nice bonus, but I need a work reason.',
            reaction_ko: '도시는 덤이고, 업무상 이유가 필요해요.'
          },
          {
            text: "Mostly networking, honestly. It's good to meet people, in case I ever look for a new job.",
            text_ko: '솔직히 주로 인맥이요. 혹시 이직할 때를 대비해서 사람을 만나 두면 좋잖아요.',
            reaction: "Hmm. That's not quite what I want to hear, Jun.",
            reaction_ko: '흠. 그건 별로 듣고 싶은 말이 아니네요, 준.'
          },
          {
            text: "Half the talks are on web design, which we'll need for the store dashboard rollout.",
            text_ko: '발표 절반이 웹 디자인이라 매장 대시보드 확대 적용에 필요해요.',
            reaction: 'Web design? I thought it was mostly mobile.',
            reaction_ko: '웹 디자인이요? 주로 모바일인 줄 알았는데요.'
          }
        ],
        reply_line: "That's a good case. A short talk at the team meeting afterward would be great.",
        reply_ko: '좋은 근거네요. 다녀와서 팀 회의 때 짧게 발표해 주면 좋겠어요.'
      },
      {
        situation: "Maya asks everyone on her team this question. Lately, priority changes reach you late: you often find out after you've already started on something else.",
        situation_ko: '마야는 팀원 모두에게 이 질문을 합니다. 요즘 우선순위 변경이 늦게 전해집니다. 다른 일을 이미 시작한 뒤에야 알게 되는 일이 잦습니다.',
        line: "Now it's my turn to ask. What's one thing I could do better as your manager?",
        line_ko: '이번엔 제가 물어볼게요. 매니저로서 제가 더 잘할 수 있는 게 하나 있다면 뭘까요?',
        prompt: 'Give her honest, specific feedback in a constructive way.',
        prompt_ko: '솔직하고 구체적인 피드백을 건설적으로 전하세요.',
        model: "Could I hear about priority changes sooner? Sometimes I've already started something else.",
        model_ko: '우선순위가 바뀌는 걸 좀 더 일찍 들을 수 있을까요? 가끔은 이미 다른 일을 시작한 뒤라서요.',
        distractors: [
          {
            text: "Nothing, really. You're a great manager. I wouldn't change a single thing about you.",
            text_ko: '딱히 없어요. 훌륭한 매니저세요. 하나도 바꾸고 싶은 게 없어요.',
            reaction: "That's kind, but there's always something. Think about it.",
            reaction_ko: '고마운 말이지만, 뭔가 늘 있기 마련이에요. 생각해 봐요.'
          },
          {
            text: 'Honestly, priorities change all the time, and nobody around here ever tells me anything.',
            text_ko: '솔직히 우선순위가 맨날 바뀌는데, 여기선 아무도 저한테 아무 말도 안 해 줘요.',
            reaction: "Nobody? That's a little strong. Can you give me an example?",
            reaction_ko: '아무도요? 좀 지나친 말 같은데요. 예를 하나 들어 줄래요?'
          },
          {
            text: 'Could we have fewer 1:1s? I could use that time to close more of my tickets instead.',
            text_ko: '1:1을 좀 줄이면 안 될까요? 그 시간에 티켓을 더 처리할 수 있을 텐데요.',
            reaction: "I'd rather keep them. Is there something else behind that?",
            reaction_ko: '1:1은 유지하고 싶어요. 그 말 뒤에 다른 이유가 있어요?'
          }
        ],
        reply_line: "That's fair, and useful. I'll give you a heads-up as soon as I know.",
        reply_ko: '맞는 말이고, 도움이 돼요. 제가 아는 즉시 미리 알려 줄게요.'
      },
      {
        situation: "The conference is on a Thursday and Friday. You aren't on call that week, and Derek offered to keep an eye on your rollout tickets while you're away.",
        situation_ko: '콘퍼런스는 목요일과 금요일입니다. 그 주에 당신은 온콜이 아니고, 데릭이 자리를 비우는 동안 확대 티켓을 봐 주겠다고 했습니다.',
        line: "Send me the details, and I'll approve it. Who covers your work while you're gone?",
        line_ko: '자세한 걸 보내 주면 승인할게요. 없는 동안 일은 누가 맡아요?',
        prompt: 'Tell her how your work will be covered.',
        prompt_ko: '일이 어떻게 처리될지 말하세요.',
        model: "Derek offered to watch my rollout tickets, and I'm not on call that week.",
        model_ko: '데릭이 확대 티켓을 봐 주기로 했고, 그 주엔 제가 온콜이 아니에요.',
        distractors: [
          {
            text: "Nobody, really. I'll just check my email at the conference between talks.",
            text_ko: '딱히 없어요. 콘퍼런스에서 발표 사이사이에 메일을 확인할게요.',
            reaction: "Then you won't really be at the conference.",
            reaction_ko: '그럼 콘퍼런스에 제대로 있는 게 아니잖아요.'
          },
          {
            text: "Derek offered to watch my tickets, and I'll do my on-call shift from the hotel.",
            text_ko: '데릭이 티켓을 봐 주기로 했고, 온콜은 호텔에서 할게요.',
            reaction: "On call? I thought you weren't on that week.",
            reaction_ko: '온콜이요? 그 주엔 아닌 줄 알았는데요.'
          },
          {
            text: 'I figured you could watch them. You know the rollout better than anyone.',
            text_ko: '마야가 봐 주시면 될 것 같았어요. 확대 적용은 누구보다 잘 아시잖아요.',
            reaction: "Me? I don't think so. I'm in meetings all day.",
            reaction_ko: '저요? 안 될 것 같아요. 저는 하루 종일 회의예요.'
          }
        ],
        reply_line: 'Sounds good. Have fun, and learn a lot. Let me know if you have any questions.',
        reply_ko: '좋아요. 재밌게 다녀오고, 많이 배워 와요. 궁금한 게 있으면 언제든 말해요.'
      }
    ]
  }
];

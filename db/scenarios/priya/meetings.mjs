// Priya Nair's meetings that come back after the missions (routines in db/world/work.mjs take them in turn).

export const hero = 'priya';

export const episodes = [
  {
    id: 'rt_standup_pr_1',
    title: 'Standup: on the clock',
    title_ko: '스탠드업: 15분 안에',
    place: 'office_meeting',
    npc: 'derek',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: "You run the ten o'clock standup. Start on time, stop a debate that runs long, and take the last blocker as your own action item.",
    summary_ko: '10시 스탠드업은 당신이 진행합니다. 제시간에 시작하고, 길어지는 논쟁을 멈추고, 마지막으로 나온 막힌 점은 당신이 할 일로 맡으세요.',
    sort: 2020,
    tags: 'meeting,standup,routine',
    turns: [
      {
        situation: "Ten o'clock in the meeting room. Derek, Jun and Maya are all here. Sam from IT never comes to the team standup. You keep it to fifteen minutes: yesterday, today, blockers.",
        situation_ko: '회의실, 10시입니다. 데릭, 준, 마야가 모두 와 있습니다. IT의 샘은 팀 스탠드업에 오지 않습니다. 당신은 15분 안에 끝냅니다. 어제, 오늘, 막힌 점.',
        line: 'Morning. Are we waiting for anyone?',
        line_ko: '좋은 아침이에요. 누구 기다려요?',
        prompt: 'Get the meeting going and remind everyone of the format.',
        prompt_ko: '회의를 시작하고, 진행 방식을 다시 알려 주세요.',
        model: "Nope, everyone's here. Yesterday, today, blockers. Derek, want to go first?",
        model_ko: '아뇨, 다 왔어요. 어제, 오늘, 막힌 점. 데릭, 먼저 할래요?',
        distractors: [
          {
            text: "Let's give Sam five more minutes. He might join us today.",
            text_ko: '샘을 5분만 더 기다려요. 오늘은 올지도 몰라요.',
            reaction: 'Sam? He never comes to standup.',
            reaction_ko: '샘요? 스탠드업엔 안 오잖아요.'
          },
          {
            text: 'Nope. But before updates, let me walk you through the whole rollout plan.',
            text_ko: '아뇨. 근데 진행 상황 전에 확대 적용 계획을 처음부터 설명할게요.',
            reaction: 'That sounds long. Maybe after?',
            reaction_ko: '길어질 것 같은데요. 끝나고 할까요?'
          },
          {
            text: "Nope, everyone's here. Just talk about whatever's on your mind.",
            text_ko: '아뇨, 다 왔어요. 그냥 생각나는 대로 얘기해요.',
            reaction: 'Okay... where do I even start?',
            reaction_ko: '음... 어디서부터 말하죠?'
          }
        ],
        reply_line: 'Sure. Yesterday, the store export. Today, code reviews. No blockers.',
        reply_ko: '그래요. 어제는 매장 내보내기, 오늘은 코드 리뷰, 막힌 건 없어요.'
      },
      {
        speaker: 'jun',
        situation: "Jun's update has turned into a debate with Derek about switching to a new date library. It has gone on for five minutes, and Maya hasn't spoken yet.",
        situation_ko: '준의 진행 상황 보고가 새 날짜 라이브러리로 바꿀지를 두고 데릭과의 논쟁으로 번졌습니다. 벌써 5분째이고, 마야는 아직 말도 못 했습니다.',
        line: "...and that's why I really think we should switch. Derek, don't you agree?",
        line_ko: '...그래서 정말 바꿔야 한다고 생각해요. 데릭, 그렇지 않아요?',
        prompt: 'Stop the debate kindly and give it its own time.',
        prompt_ko: '논쟁을 좋게 멈추고, 따로 시간을 잡아 주세요.',
        model: "Good topic, but let's take it offline. You two, ten minutes after this?",
        model_ko: '좋은 주제인데, 따로 얘기해요. 둘이 끝나고 10분 어때요?',
        distractors: [
          {
            text: "Good topic. Let's just settle it right now. Derek, what do you think?",
            text_ko: '좋은 주제예요. 지금 결론 내요. 데릭, 어떻게 생각해요?',
            reaction: "Great! Okay, Derek, so here's the thing...",
            reaction_ko: '좋아요! 그럼 데릭, 그러니까요...'
          },
          {
            text: 'Jun, this is running way too long. Please keep it short next time.',
            text_ko: '준, 너무 길어요. 다음엔 짧게 해 줘요.',
            reaction: "Oh. Sorry. I didn't notice.",
            reaction_ko: '아. 죄송해요. 몰랐어요.'
          },
          {
            text: "Good topic. Let's put it to a quick vote right now, everyone.",
            text_ko: '좋은 주제예요. 지금 다 같이 투표해요.',
            reaction: "A vote? Maya hasn't even given her update.",
            reaction_ko: '투표요? 마야는 아직 보고도 안 했는데요.'
          }
        ],
        reply_line: 'Sure. Sorry, I got carried away.',
        reply_ko: '네. 죄송해요, 너무 신났어요.'
      },
      {
        situation: 'Maya has given her update. Fourteen minutes have passed. You are the one who talks to Greg Whitfield at Summit Retail.',
        situation_ko: '마야도 보고를 마쳤습니다. 14분이 지났습니다. 서밋 리테일의 그렉 휫필드와 연락하는 사람은 당신입니다.',
        line: "Oh, one blocker: I still don't have the store list from Summit for the next stores.",
        line_ko: '아, 막힌 거 하나요. 다음 매장 목록을 서밋에서 아직 못 받았어요.',
        prompt: 'Take this one on yourself and wrap up the meeting.',
        prompt_ko: '이 일은 당신이 맡고, 회의를 마무리하세요.',
        model: "I'll chase Greg for that today. Thanks, everyone. See you tomorrow.",
        model_ko: '오늘 그렉한테 받아 낼게요. 다들 고마워요. 내일 봐요.',
        distractors: [
          {
            text: "Can you email Greg about it yourself? I'm pretty busy today.",
            text_ko: '그렉한테 직접 메일 보내 줄래요? 제가 오늘 좀 바빠서요.',
            reaction: "Me? You're the one Greg talks to.",
            reaction_ko: '저요? 그렉이랑 얘기하는 건 프리야잖아요.'
          },
          {
            text: "I'll chase Greg today. Before we go, any other topics to discuss?",
            text_ko: '오늘 그렉한테 받아 낼게요. 가기 전에, 다른 얘기할 거 있어요?',
            reaction: "We're at fourteen minutes already.",
            reaction_ko: '벌써 14분이에요.'
          },
          {
            text: "Okay. Let's just wait for Greg to send it when he's ready.",
            text_ko: '알겠어요. 그렉이 준비되면 보내 주겠죠, 기다려요.',
            reaction: "But I can't start without it.",
            reaction_ko: '근데 그게 없으면 시작을 못 해요.'
          }
        ],
        reply_line: 'Thanks, Priya. See you.',
        reply_ko: '고마워요, 프리야. 내일 봐요.'
      }
    ]
  },
  {
    id: 'rt_standup_pr_2',
    title: 'Standup: a note from a store',
    title_ko: '스탠드업: 매장에서 온 메일',
    place: 'office_meeting',
    npc: 'derek',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: 'A pilot store emailed you about a wrong list on the dashboard. Share it without blaming anyone, get the right people on it, and keep the store in the loop.',
    summary_ko: '시범 매장이 대시보드의 잘못된 목록에 대해 메일을 보냈습니다. 누구 탓도 하지 말고 알리고, 맞는 사람에게 맡기고, 매장에도 상황을 알리세요.',
    sort: 2021,
    tags: 'meeting,standup,routine',
    turns: [
      {
        situation: "Ten o'clock standup. Before the meeting, a manager at one of the five pilot stores emailed you: the low-stock list on the dashboard shows items the store doesn't even carry. Jun built the list. Derek built the data import.",
        situation_ko: '10시 스탠드업입니다. 회의 전에 시범 매장 다섯 곳 중 한 곳의 관리자가 메일을 보냈습니다. 대시보드의 재고 부족 목록에 그 매장이 팔지도 않는 물건이 나온다고요. 목록은 준이, 데이터 가져오기는 데릭이 만들었습니다.',
        line: 'Before we start, you said you had something from the stores?',
        line_ko: '시작하기 전에, 매장에서 온 게 있다고 했죠?',
        prompt: 'Share the feedback briefly, without blaming anyone.',
        prompt_ko: '누구 탓도 하지 말고 매장 의견을 짧게 전하세요.',
        model: "Yes. A pilot store says the low-stock list shows items they don't carry.",
        model_ko: '네. 시범 매장 한 곳에서 재고 부족 목록에 안 파는 물건이 나온대요.',
        distractors: [
          {
            text: "Yes. A pilot store says Jun's low-stock list is broken again.",
            text_ko: '네. 시범 매장 한 곳에서 준이 만든 재고 부족 목록이 또 고장 났대요.',
            reaction: "Let's not put that on Jun yet.",
            reaction_ko: '아직 준 탓으로 돌리지 말아요.'
          },
          {
            text: "Yes. A pilot store says the dashboard won't load for them at all.",
            text_ko: '네. 시범 매장 한 곳에서 대시보드가 아예 안 뜬대요.',
            reaction: "Won't load? It loads fine for me.",
            reaction_ko: '안 뜬다고요? 저는 잘 뜨는데요.'
          },
          {
            text: 'Yes. The store manager wrote me a long email. Let me read you all of it.',
            text_ko: '네. 매장 관리자가 긴 메일을 보냈어요. 전부 읽어 드릴게요.',
            reaction: 'Maybe just the short version?',
            reaction_ko: '짧게 요점만 말해 줄래요?'
          }
        ],
        reply_line: 'Hmm. That might be my import, not his list.',
        reply_ko: '음. 그건 준의 목록이 아니라 제 가져오기 문제일 수도 있어요.'
      },
      {
        speaker: 'jun',
        situation: "Derek thinks the product catalog may not be filtered by store when it's imported. Other people are still waiting to give their updates.",
        situation_ko: '데릭은 상품 목록을 가져올 때 매장별로 걸러지지 않는 것 같다고 봅니다. 다른 사람들은 아직 보고를 기다리고 있습니다.',
        line: 'Should I look into it? I built that list.',
        line_ko: '제가 볼까요? 그 목록은 제가 만들었어요.',
        prompt: 'Decide who looks into it, and keep the standup moving.',
        prompt_ko: '누가 살펴볼지 정하고, 스탠드업은 계속 진행하세요.',
        model: 'Yes, with Derek. It might be the import. Can you two check after standup?',
        model_ko: '네, 데릭이랑 같이요. 가져오기 문제일 수도 있어요. 둘이 끝나고 봐 줄래요?',
        distractors: [
          {
            text: "Yes, please. Actually, let's all dig into it together right now.",
            text_ko: '네, 부탁해요. 아니, 지금 다 같이 파 봐요.',
            reaction: 'Now? Everyone else still has updates.',
            reaction_ko: '지금요? 다른 분들 보고가 아직 남았는데요.'
          },
          {
            text: "No, Derek can handle it. Jun, you don't need to touch it.",
            text_ko: '아니요, 데릭이 하면 돼요. 준은 손대지 않아도 돼요.',
            reaction: 'Oh. Okay. I just wanted to help.',
            reaction_ko: '아. 네. 그냥 돕고 싶었어요.'
          },
          {
            text: "Let's just leave it for now. It's only one store out of five, after all.",
            text_ko: '일단 그냥 둬요. 어차피 다섯 곳 중 한 곳뿐이잖아요.',
            reaction: "But it's one of our pilot stores, right?",
            reaction_ko: '근데 우리 시범 매장이잖아요?'
          }
        ],
        reply_line: "Sure. We'll sort it out.",
        reply_ko: '네. 해결해 볼게요.'
      },
      {
        situation: 'You handle all communication with the stores. Derek and Jun expect to know more by the end of the day.',
        situation_ko: '매장과의 연락은 모두 당신이 맡습니다. 데릭과 준은 오늘 안에 더 알게 될 것 같다고 합니다.',
        line: 'Should we tell the store anything?',
        line_ko: '매장에 뭐라고 해야 할까요?',
        prompt: "Say how you'll handle the store.",
        prompt_ko: '매장에 어떻게 대응할지 말하세요.',
        model: "I'll reply that we're on it, with an update by the end of the day.",
        model_ko: '지금 살펴보고 있다고 답하고, 오늘 안에 다시 알려 드릴게요.',
        distractors: [
          {
            text: "I'll just tell them it's fixed, so they stop worrying about it.",
            text_ko: '그냥 고쳤다고 할게요. 그래야 걱정을 안 하죠.',
            reaction: "Fixed? We haven't even looked yet.",
            reaction_ko: '고쳤다고요? 아직 보지도 않았는데요.'
          },
          {
            text: "Let's not reply until we know more. That could take a few days.",
            text_ko: '더 알 때까지 답하지 말아요. 며칠 걸릴 수도 있어요.',
            reaction: "A few days? They'll think we ignored them.",
            reaction_ko: '며칠요? 무시당했다고 생각할 거예요.'
          },
          {
            text: 'Maybe you could reply, Derek? You know the data better than I do.',
            text_ko: '데릭이 답해 줄래요? 데이터는 데릭이 더 잘 알잖아요.',
            reaction: "Isn't talking to the stores your thing?",
            reaction_ko: '매장 연락은 프리야 일 아니에요?'
          }
        ],
        reply_line: "Sounds good. We'll have something for you by four.",
        reply_ko: '좋아요. 4시까지 알려 드릴게요.'
      }
    ]
  },
  {
    id: 'rt_standup_pr_3',
    title: 'Standup: stale tickets',
    title_ko: '스탠드업: 묵은 티켓',
    place: 'office_meeting',
    npc: 'derek',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: "Some tickets on the team board haven't moved in weeks. Ask for updates without singling anyone out, connect two pieces of work that depend on each other, and keep the board honest.",
    summary_ko: '팀 보드의 티켓 몇 개가 몇 주째 그대로입니다. 누구를 콕 집지 말고 갱신을 부탁하고, 서로 기대는 두 작업을 이어 주고, 보드가 실제 상황을 보여 주게 하세요.',
    sort: 2022,
    tags: 'meeting,standup,routine',
    turns: [
      {
        situation: "Ten o'clock standup. The team board is up on the screen. Four tickets have said in progress for more than two weeks, and two of them have Derek's name on them.",
        situation_ko: '10시 스탠드업입니다. 화면에 팀 보드가 떠 있습니다. 티켓 네 개가 2주 넘게 진행 중으로 남아 있고, 그중 두 개에 데릭의 이름이 있습니다.',
        line: 'Morning. Want me to start?',
        line_ko: '좋은 아침이에요. 제가 먼저 할까요?',
        prompt: 'Before the updates, raise the board problem without singling anyone out.',
        prompt_ko: '진행 상황을 듣기 전에, 누구를 콕 집지 말고 보드 문제를 꺼내세요.',
        model: 'Sure, but first: a few tickets look stale. Could everyone update their statuses today?',
        model_ko: '그래요, 근데 먼저요. 묵은 티켓이 좀 보여요. 다들 오늘 상태를 갱신해 줄래요?',
        distractors: [
          {
            text: "Sure, but first: Derek, two of your tickets haven't moved in weeks. What's going on?",
            text_ko: '그래요, 근데 먼저요. 데릭, 데릭 티켓 두 개가 몇 주째 그대로예요. 어떻게 된 거예요?',
            reaction: 'Oof. Okay. In front of everyone?',
            reaction_ko: '윽. 네. 다들 보는 앞에서요?'
          },
          {
            text: "Sure, but first: let's go through every ticket on the board, one by one, right now.",
            text_ko: '그래요, 근데 먼저요. 지금 보드의 티켓을 하나하나 다 짚어 봐요.',
            reaction: "Every ticket? That's an hour.",
            reaction_ko: '티켓 전부요? 한 시간은 걸려요.'
          },
          {
            text: "Sure. The board looks great, by the way. Everything's right up to date.",
            text_ko: '그래요. 그나저나 보드가 아주 좋네요. 전부 최신 상태예요.',
            reaction: 'Really? Some of those look pretty old.',
            reaction_ko: '정말요? 꽤 오래된 것도 있던데요.'
          }
        ],
        reply_line: 'Fair. Some of mine are definitely out of date. Okay, me first.',
        reply_ko: '맞아요. 제 것도 분명 오래된 게 있어요. 그럼 저부터 할게요.'
      },
      {
        situation: 'Derek is building the data API for the new store comparison page. Jun is already building the page itself, and yesterday he said he was guessing at the data format.',
        situation_ko: '데릭은 새 매장 비교 페이지에 쓸 데이터 API를 만들고 있습니다. 준은 이미 페이지를 만들고 있고, 어제 데이터 형식을 짐작으로 하고 있다고 했습니다.',
        line: "Today I'm building the API for the comparison page. Should be done in a couple of days.",
        line_ko: '오늘은 비교 페이지 API를 만들어요. 이틀쯤이면 끝날 거예요.',
        prompt: "Connect his work to Jun's, and suggest they team up.",
        prompt_ko: '그의 일을 준의 일과 이어 주고, 둘이 손을 맞추자고 하세요.',
        model: "Jun's building that page and guessing at the format. Could you two sync after standup?",
        model_ko: '준이 그 페이지를 만들면서 형식을 짐작하고 있어요. 둘이 끝나고 맞춰 볼래요?',
        distractors: [
          {
            text: 'Great. Jun can just wait until your API is done, and then start the page.',
            text_ko: '좋아요. 준은 데릭 API가 끝날 때까지 기다렸다가 페이지를 시작하면 돼요.',
            reaction: 'Wait a couple of days? That seems like a waste.',
            reaction_ko: '이틀이나 기다려요? 아까운데요.'
          },
          {
            text: "Jun's building that page too. Can you two settle the format right now, here?",
            text_ko: '준도 그 페이지를 만들고 있어요. 둘이 지금 여기서 형식을 정할래요?',
            reaction: "Here? We'd hold everyone up.",
            reaction_ko: '여기서요? 다들 붙잡아 두게 돼요.'
          },
          {
            text: "Great. Jun hasn't started the page yet, so there's no rush on your side.",
            text_ko: '좋아요. 준은 아직 페이지를 시작 안 했으니 서두를 필요 없어요.',
            reaction: "Hasn't he? I thought he started already.",
            reaction_ko: '안 했어요? 벌써 시작한 줄 알았는데요.'
          }
        ],
        reply_line: "Good catch. Jun, let's talk right after this.",
        reply_ko: '잘 짚었어요. 준, 끝나고 바로 얘기해요.'
      },
      {
        speaker: 'jun',
        situation: "Until the format is settled, Jun can keep building the page layout, so his work isn't actually stopped.",
        situation_ko: '형식이 정해질 때까지 준은 페이지 레이아웃을 계속 만들 수 있으니, 그의 일은 실제로 멈춘 게 아닙니다.',
        line: 'Sure. Should I mark my page ticket as blocked until we agree on the format?',
        line_ko: '좋아요. 형식을 정할 때까지 제 페이지 티켓을 막힘으로 바꿀까요?',
        prompt: 'Answer so the board shows the real state of his work.',
        prompt_ko: '보드가 그의 일의 실제 상태를 보여 주도록 답하세요.',
        model: 'Not blocked, since you can keep building the layout. Just add a note about the format.',
        model_ko: '막힘은 아니에요. 레이아웃은 계속 만들 수 있으니까요. 형식 얘기만 메모로 남겨요.',
        distractors: [
          {
            text: "Yes, mark it blocked, and stop working on it until Derek's API is done.",
            text_ko: '네, 막힘으로 바꾸고 데릭 API가 끝날 때까지 손 놓고 있어요.',
            reaction: 'Stop? But I can still do the layout.',
            reaction_ko: '손 놓으라고요? 레이아웃은 계속할 수 있는데요.'
          },
          {
            text: "Don't bother with the board, honestly. Nobody really looks at it anyway.",
            text_ko: '솔직히 보드는 신경 쓰지 말아요. 어차피 아무도 잘 안 봐요.',
            reaction: "Oh. Didn't you just ask us to update it?",
            reaction_ko: '어. 방금 갱신해 달라고 하지 않았어요?'
          },
          {
            text: 'Not blocked. Actually, just mark it done, so the board looks good for Greg.',
            text_ko: '막힘은 아니에요. 그냥 완료로 바꿔요. 그렉이 보기에 좋게요.',
            reaction: "Done? But it isn't, though.",
            reaction_ko: '완료요? 아직 안 끝났는데요.'
          }
        ],
        reply_line: "Got it. I'll add the note right after this.",
        reply_ko: '알겠어요. 끝나고 바로 메모 남길게요.'
      }
    ]
  },
  {
    id: 'rt_standup_pr_4',
    title: "Standup: the design isn't ready",
    title_ko: '스탠드업: 디자인이 아직',
    place: 'office_meeting',
    npc: 'derek',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: "Jun can't start his page because the design isn't ready. Find him something useful, keep a bigger idea out of the standup, and decide whether Summit needs to hear about it.",
    summary_ko: '디자인이 준비되지 않아 준이 페이지를 시작하지 못합니다. 그에게 쓸모 있는 일을 찾아 주고, 큰 아이디어는 스탠드업 밖으로 미루고, 서밋에 알려야 할지 정하세요.',
    sort: 2023,
    tags: 'meeting,standup,routine',
    turns: [
      {
        speaker: 'jun',
        situation: "Ten o'clock standup. The designer says the design for the new store comparison page will be ready tomorrow. Meanwhile, pilot stores have asked for a fix: some dashboard colors are hard to read for color-blind staff.",
        situation_ko: '10시 스탠드업입니다. 디자이너는 새 매장 비교 페이지의 디자인이 내일 나온다고 합니다. 한편 시범 매장들은 색맹인 직원이 대시보드의 몇몇 색을 읽기 어렵다며 수정을 요청했습니다.',
        line: "Today I wanted to start the comparison page, but the design isn't ready. So I'm kind of stuck.",
        line_ko: '오늘 비교 페이지를 시작하려 했는데 디자인이 아직이에요. 그래서 좀 막혀 있어요.',
        prompt: 'Suggest something useful for Jun to do until the design arrives.',
        prompt_ko: '디자인이 나올 때까지 준이 할 만한 쓸모 있는 일을 제안하세요.',
        model: 'The design lands tomorrow. Could you take the color contrast fix today?',
        model_ko: '디자인은 내일 나와요. 오늘은 색 대비 수정을 맡아 줄래요?',
        distractors: [
          {
            text: 'The design lands tomorrow. Just start coding the page without it today.',
            text_ko: '디자인은 내일 나와요. 오늘은 디자인 없이 그냥 페이지 코딩을 시작해요.',
            reaction: 'Without a design? I might have to redo it all.',
            reaction_ko: '디자인 없이요? 전부 다시 해야 할 수도 있어요.'
          },
          {
            text: "Why isn't it ready yet? Who's holding it up this time?",
            text_ko: '왜 아직 안 됐어요? 이번엔 누가 붙잡고 있는 거예요?',
            reaction: "Uh, I'm not sure. The designer just said tomorrow.",
            reaction_ko: '어, 잘 모르겠어요. 디자이너는 그냥 내일이라고 했어요.'
          },
          {
            text: 'The design lands next week. Could you take the color fix until then?',
            text_ko: '디자인은 다음 주에 나와요. 그때까지 색 수정을 맡아 줄래요?',
            reaction: 'Next week? I heard tomorrow.',
            reaction_ko: '다음 주요? 저는 내일이라고 들었는데요.'
          }
        ],
        reply_line: 'Sure. The store managers will like that one.',
        reply_ko: '좋아요. 매장 관리자들이 좋아하겠네요.'
      },
      {
        situation: "Derek gets excited. A full redesign of the color theme would take days and isn't planned.",
        situation_ko: '데릭이 신이 납니다. 색 테마를 통째로 다시 짜면 며칠이 걸리고, 계획에도 없습니다.',
        line: "Ooh, if we're touching colors, we should rethink the whole theme. Like, the reds we use for alerts...",
        line_ko: '오, 색을 건드릴 거면 테마 전체를 다시 생각해야 해요. 예를 들어 경고에 쓰는 빨간색이...',
        prompt: 'Acknowledge the idea, but keep the standup on track.',
        prompt_ko: '아이디어는 인정하되, 스탠드업이 옆길로 새지 않게 하세요.',
        model: "Good point, but that's a bigger one. Let's talk it through after standup.",
        model_ko: '좋은 지적인데, 그건 더 큰 얘기예요. 스탠드업 끝나고 얘기해요.',
        distractors: [
          {
            text: "Good point. Let's redesign the whole theme right now, together.",
            text_ko: '좋은 지적이에요. 지금 다 같이 테마 전체를 다시 짜요.',
            reaction: "Right now? We'd be here all morning.",
            reaction_ko: '지금요? 오전 내내 여기 있게 될걸요.'
          },
          {
            text: "Derek, that's not your job. Leave the colors to the designer.",
            text_ko: '데릭, 그건 데릭 일이 아니에요. 색은 디자이너한테 맡겨요.',
            reaction: 'Whoa. I was just trying to help.',
            reaction_ko: '워. 그냥 도우려던 건데요.'
          },
          {
            text: 'Good point. Jun, go ahead and change the whole theme today, then.',
            text_ko: '좋은 지적이에요. 그럼 준, 오늘 테마 전체를 바꿔요.',
            reaction: "The whole theme? That's way more than a day.",
            reaction_ko: '테마 전체요? 하루로는 어림없어요.'
          }
        ],
        reply_line: "Fair. I'll grab you after.",
        reply_ko: '그래요. 끝나고 찾아갈게요.'
      },
      {
        speaker: 'maya',
        situation: 'The comparison page is due to Summit Retail at the end of next week. Losing one day to the design still leaves enough room in the schedule.',
        situation_ko: '비교 페이지는 다음 주 말까지 서밋 리테일에 넘기기로 했습니다. 디자인 때문에 하루를 잃어도 일정에는 아직 여유가 있습니다.',
        line: 'Do we need to tell Summit the comparison page slipped a day?',
        line_ko: '비교 페이지가 하루 밀렸다고 서밋에 알려야 해요?',
        prompt: 'Answer her, and give the reason.',
        prompt_ko: '대답하고, 이유를 말하세요.',
        model: "Not yet. There's still room in the schedule, so the date holds.",
        model_ko: '아직은요. 일정에 여유가 있어서 날짜는 안 바뀔 거예요.',
        distractors: [
          {
            text: "Yes, let's tell Greg it'll be two weeks late, just to be safe.",
            text_ko: '네, 혹시 모르니 그렉한테 2주 늦어진다고 해요.',
            reaction: 'Two weeks? For one day?',
            reaction_ko: '2주요? 하루 밀린 걸로요?'
          },
          {
            text: 'No need. Greg never really reads our updates anyway.',
            text_ko: '그럴 필요 없어요. 어차피 그렉은 우리 소식을 잘 안 읽어요.',
            reaction: "Let's not assume that.",
            reaction_ko: '그렇게 단정하지 말아요.'
          },
          {
            text: "Not yet. There's no room in the schedule, so let's just hope.",
            text_ko: '아직은요. 일정에 여유가 없으니 그냥 잘되길 바라요.',
            reaction: "Hope isn't much of a plan.",
            reaction_ko: '바라는 건 계획이 아니잖아요.'
          }
        ],
        reply_line: 'Okay. Flag it if that changes.',
        reply_ko: '좋아요. 상황이 바뀌면 알려 줘요.'
      }
    ]
  },
  {
    id: 'rt_standup_pr_5',
    title: 'Standup: a request from Greg',
    title_ko: '스탠드업: 그렉의 요청',
    place: 'office_meeting',
    npc: 'derek',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: "Greg from Summit Retail asked for something new. Share it without overpromising, give Jun's excitement its own meeting, and keep the sprint focused.",
    summary_ko: '서밋 리테일의 그렉이 새로운 걸 요청했습니다. 지나친 약속 없이 알리고, 준의 열의는 따로 회의를 잡아 받아 주고, 스프린트가 흐트러지지 않게 하세요.',
    sort: 2024,
    tags: 'meeting,standup,routine',
    turns: [
      {
        situation: "Ten o'clock standup, your turn. Yesterday Greg Whitfield called: he'd like weather on the dashboard, so stores can plan their staffing. You told him the team would look into it. Nothing was promised.",
        situation_ko: '10시 스탠드업, 당신 차례입니다. 어제 그렉 휫필드가 전화했습니다. 매장이 인력 배치를 계획할 수 있게 대시보드에 날씨를 넣고 싶다고요. 당신은 팀이 검토해 보겠다고 했고, 아무것도 약속하지 않았습니다.',
        line: 'Priya, your turn.',
        line_ko: '프리야, 차례예요.',
        prompt: "Share the news, and be clear about what you did and didn't agree to.",
        prompt_ko: '소식을 전하고, 무엇에 동의했고 무엇에 동의하지 않았는지 분명히 하세요.',
        model: "Greg asked for weather on the dashboard. I told him we'd look into it, nothing more.",
        model_ko: '그렉이 대시보드에 날씨를 넣어 달래요. 검토해 보겠다고만 했어요.',
        distractors: [
          {
            text: "Greg asked for weather on the dashboard. I said we'd have it ready next week.",
            text_ko: '그렉이 대시보드에 날씨를 넣어 달래요. 다음 주까지 해 주겠다고 했어요.',
            reaction: 'Next week? Without asking us?',
            reaction_ko: '다음 주요? 우리한테 묻지도 않고요?'
          },
          {
            text: 'Greg wants weather now. Honestly, he changes his mind every other week.',
            text_ko: '그렉이 이번엔 날씨를 원해요. 솔직히 그 사람은 툭하면 마음이 바뀌어요.',
            reaction: "Careful. He's our client on this.",
            reaction_ko: '조심해요. 이 일의 고객이잖아요.'
          },
          {
            text: "Greg called about weather. It's not that important, though, so moving on.",
            text_ko: '그렉이 날씨 얘기로 전화했어요. 별로 중요하진 않으니 넘어갈게요.',
            reaction: 'Weather? That sounds kind of big.',
            reaction_ko: '날씨요? 꽤 큰 일 같은데요.'
          }
        ],
        reply_line: 'Weather, huh. That could get big.',
        reply_ko: '날씨라. 일이 커질 수도 있겠네요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun lights up. Derek starts to say something about the cost of weather data. The standup is already at twelve minutes.',
        situation_ko: '준의 얼굴이 밝아집니다. 데릭이 날씨 데이터 비용 얘기를 꺼내려 합니다. 스탠드업은 벌써 12분째입니다.',
        line: 'Ooh, weather! We could show a forecast for each store, and color the busy days, and...',
        line_ko: '오, 날씨! 매장마다 예보를 보여 주고, 바쁜 날은 색으로 표시하고...',
        prompt: 'Thank Jun for the energy, and give the idea its own time.',
        prompt_ko: '준의 열의에 고마워하고, 그 아이디어는 따로 시간을 잡아 주세요.',
        model: "Love the energy. Let's set up thirty minutes this afternoon for it.",
        model_ko: '열정 좋아요. 오늘 오후에 30분 따로 잡아요.',
        distractors: [
          {
            text: "Love the energy. Let's design it right here, while we're all together.",
            text_ko: '열정 좋아요. 다 모였을 때 여기서 바로 설계해요.',
            reaction: "Here? We're almost out of time, though.",
            reaction_ko: '여기서요? 시간이 거의 다 됐는데요.'
          },
          {
            text: "Jun, slow down. It's not really up to you what we build.",
            text_ko: '준, 천천히 해요. 뭘 만들지는 준이 정하는 게 아니에요.',
            reaction: 'Oh. Sorry. I just got excited.',
            reaction_ko: '아. 죄송해요. 그냥 신나서요.'
          },
          {
            text: "Love the energy. Start building it today, and we'll surprise Greg.",
            text_ko: '열정 좋아요. 오늘 만들기 시작해서 그렉을 놀라게 해 줘요.',
            reaction: 'Today? I thought nothing was promised yet.',
            reaction_ko: '오늘요? 아직 약속한 건 없다면서요.'
          }
        ],
        reply_line: "Sure! I'll bring some ideas.",
        reply_ko: '좋아요! 아이디어 좀 가져갈게요.'
      },
      {
        situation: 'This sprint is already full with the rollout to the next group of stores, and Summit has said the rollout comes first.',
        situation_ko: '이번 스프린트는 다음 매장들로의 확대 적용으로 이미 꽉 찼고, 서밋은 확대 적용이 먼저라고 했습니다.',
        line: 'Before we wrap up: should weather go into this sprint?',
        line_ko: '끝내기 전에요. 날씨를 이번 스프린트에 넣어요?',
        prompt: 'Give a clear answer based on priorities.',
        prompt_ko: '우선순위에 따라 분명하게 답하세요.',
        model: "No, the rollout comes first. We'll size weather for the next sprint.",
        model_ko: '아니요, 확대 적용이 먼저예요. 날씨는 다음 스프린트를 위해 규모를 가늠해 봐요.',
        distractors: [
          {
            text: "Yes, let's squeeze it in somehow. The rollout can slip a little.",
            text_ko: '네, 끼워 넣어요. 확대 적용은 좀 밀려도 돼요.',
            reaction: 'Summit said the rollout comes first, though.',
            reaction_ko: '서밋이 확대 적용이 먼저라고 했잖아요.'
          },
          {
            text: "Yes, add it. Greg will be happy, and in the end that's what matters.",
            text_ko: '네, 넣어요. 그렉이 좋아할 거고, 그게 중요하죠.',
            reaction: "Sure, but the sprint's already full.",
            reaction_ko: '그렇긴 한데, 스프린트가 이미 꽉 찼어요.'
          },
          {
            text: "No, and let's not do weather at all. It's just a distraction.",
            text_ko: '아니요, 날씨는 아예 하지 말아요. 괜히 정신만 사나워요.',
            reaction: 'At all? Greg might not love that.',
            reaction_ko: '아예요? 그렉이 별로 안 좋아할걸요.'
          }
        ],
        reply_line: 'Works for me. Good standup.',
        reply_ko: '좋아요. 좋은 스탠드업이었어요.'
      }
    ]
  },
  {
    id: 'rt_video_pr_1',
    title: 'Video standup: starting on time',
    title_ko: '화상 스탠드업: 제시간에 시작하기',
    place: 'priya_desk',
    npc: 'derek',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: 'You run the standup on video. Start on time without Maya, share what the stores asked for, and keep a long update from taking over.',
    summary_ko: '화상 스탠드업을 진행합니다. 마야 없이도 제시간에 시작하고, 매장의 요청을 전하고, 긴 발언이 회의를 잡아먹지 않게 하세요.',
    sort: 2071,
    tags: 'meeting,standup,routine,video',
    turns: [
      {
        situation: "Ten o'clock. You run the standup on video. Derek and Jun are on the call, but Maya hasn't joined yet. It's 10:01.",
        situation_ko: '10시입니다. 화상 스탠드업은 당신이 진행합니다. 데릭과 준은 들어와 있는데 마야는 아직입니다. 지금 10시 1분입니다.',
        line: 'Should we wait for Maya?',
        line_ko: '마야를 기다릴까요?',
        prompt: 'Start on time, and say how Maya can catch up.',
        prompt_ko: '제시간에 시작하고, 마야가 내용을 어떻게 따라잡을지 말하세요.',
        model: "Let's start. I'll post notes in the chat for Maya.",
        model_ko: '시작하죠. 마야를 위해 채팅에 메모를 올릴게요.',
        distractors: [
          {
            text: "Let's give her five more minutes. She's the manager, after all.",
            text_ko: '5분만 더 기다려요. 그래도 매니저잖아요.',
            reaction: 'Five minutes times four people adds up.',
            reaction_ko: '5분씩 네 명이면 꽤 되는데요.'
          },
          {
            text: "Let's start. Maya doesn't really need to be here anyway.",
            text_ko: '시작하죠. 어차피 마야는 꼭 있어야 하는 건 아니에요.',
            reaction: 'Careful, she might join any second.',
            reaction_ko: '조심해요, 마야가 곧 들어올지도 몰라요.'
          },
          {
            text: "Let's just cancel today. It's not worth it without Maya.",
            text_ko: '오늘은 그냥 취소해요. 마야 없으면 할 의미가 없어요.',
            reaction: 'Cancel? I have things to share.',
            reaction_ko: '취소요? 전 할 얘기가 있는데요.'
          }
        ],
        reply_line: 'Works for me.',
        reply_ko: '좋아요.'
      },
      {
        situation: "Your update: yesterday you talked to two pilot store managers. Both asked for low-stock alerts by email. You haven't written the story yet.",
        situation_ko: '당신 소식: 어제 시범 매장 관리자 두 명과 얘기했습니다. 둘 다 재고 부족 알림을 이메일로 받고 싶어 합니다. 스토리는 아직 쓰지 않았습니다.',
        line: 'Your update, Priya?',
        line_ko: '프리야 소식은요?',
        prompt: "Share what you learned and what you'll do next.",
        prompt_ko: '알게 된 것과 다음에 할 일을 말하세요.',
        model: "Two store managers asked for low-stock alerts by email. I'll write the story today.",
        model_ko: '매장 관리자 두 명이 재고 부족 알림을 이메일로 받고 싶대요. 오늘 스토리를 쓸게요.',
        distractors: [
          {
            text: "Two store managers asked for low-stock alerts by text. I'll write the story today.",
            text_ko: '매장 관리자 두 명이 재고 부족 알림을 문자로 받고 싶대요. 오늘 스토리를 쓸게요.',
            reaction: 'By text? I thought the stores used email for everything.',
            reaction_ko: '문자요? 매장들은 다 이메일로 하는 줄 알았는데요.'
          },
          {
            text: 'Two store managers asked for low-stock alerts by email. Derek, can you start building it today?',
            text_ko: '매장 관리자 두 명이 재고 부족 알림을 이메일로 받고 싶대요. 데릭, 오늘 만들기 시작할 수 있어요?',
            reaction: "Today? It's not even a story yet.",
            reaction_ko: '오늘이요? 아직 스토리도 없잖아요.'
          },
          {
            text: "The store managers want a bunch of things. I'll tell you more when I know more.",
            text_ko: '매장 관리자들이 이것저것 원해요. 더 알게 되면 말할게요.',
            reaction: 'Could you be a bit more specific?',
            reaction_ko: '조금 더 구체적으로 말해 줄래요?'
          }
        ],
        reply_line: "Nice. Send it over when it's ready.",
        reply_ko: '좋네요. 다 쓰면 보내 줘요.'
      },
      {
        speaker: 'jun',
        situation: "Jun's update runs long: he's deep into the details of a layout bug. Derek is still waiting to talk, and there are three minutes left.",
        situation_ko: '준의 발언이 길어집니다. 레이아웃 버그를 아주 자세히 설명하고 있습니다. 데릭이 아직 말을 기다리고 있고, 3분 남았습니다.',
        line: '...and then the grid wraps, so everything shifts by two pixels, and...',
        line_ko: '...그래서 그리드가 줄바꿈되면서 전부 2픽셀씩 밀리고...',
        prompt: 'Politely move the meeting on, and give him a place to finish.',
        prompt_ko: '정중하게 회의를 다음으로 넘기고, 나머지는 따로 하도록 자리를 마련하세요.',
        model: "Sorry to jump in, Jun. Let's go over the details after standup. Derek, you're next.",
        model_ko: '끼어들어서 미안해요, 준. 자세한 건 스탠드업 끝나고 봐요. 데릭, 다음이요.',
        distractors: [
          {
            text: "Jun, nobody needs this much detail. Derek, you're next.",
            text_ko: '준, 그렇게까지 자세히 들을 필요는 없어요. 데릭, 다음이요.',
            reaction: 'Oh. Sorry...',
            reaction_ko: '아. 죄송해요...'
          },
          {
            text: "Sorry to jump in, Jun. Let's go over the details after standup. Maya, you're next.",
            text_ko: '끼어들어서 미안해요, 준. 자세한 건 스탠드업 끝나고 봐요. 마야, 다음이요.',
            reaction: "Maya's not on the call, though.",
            reaction_ko: '마야는 통화에 없는데요.'
          },
          {
            text: 'Interesting, Jun. Keep going. We can run a little over today.',
            text_ko: '흥미롭네요, 준. 계속해요. 오늘은 좀 넘겨도 돼요.',
            reaction: 'Okay! So, the second problem is...',
            reaction_ko: '좋아요! 그럼 두 번째 문제는요...'
          }
        ],
        reply_line: 'Sure. Sorry, I got carried away.',
        reply_ko: '네. 죄송해요, 너무 빠져들었네요.'
      }
    ]
  },
  {
    id: 'rt_video_pr_2',
    title: 'Video standup: news from IT',
    title_ko: '화상 스탠드업: IT 공지',
    place: 'priya_desk',
    npc: 'derek',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: 'Pass on a notice from IT, look out for a teammate who had a rough night, and say when the notes go out.',
    summary_ko: 'IT의 공지를 전하고, 힘든 밤을 보낸 동료를 챙기고, 회의 메모를 언제 올릴지 말하세요.',
    sort: 2072,
    tags: 'meeting,standup,routine,video',
    turns: [
      {
        situation: "Ten o'clock standup on video. Before the call, Sam from IT posted in the team chat: the build server will be down from one to two this afternoon for an update. Nobody else has seen it.",
        situation_ko: '화상으로 하는 10시 스탠드업입니다. 통화 전에 IT의 샘이 팀 채팅에 올렸습니다. 오늘 오후 1시부터 2시까지 업데이트 때문에 빌드 서버가 멈춘다고요. 아직 아무도 보지 못했습니다.',
        line: 'Morning. Anything new?',
        line_ko: '좋은 아침이에요. 새 소식 있어요?',
        prompt: "Pass on Sam's notice clearly.",
        prompt_ko: '샘의 공지를 분명하게 전하세요.',
        model: 'Sam says the build server is down from one to two today for an update.',
        model_ko: '샘이 그러는데, 오늘 1시부터 2시까지 업데이트로 빌드 서버가 멈춘대요.',
        distractors: [
          {
            text: 'Sam says the build server is down from two to three today for an update.',
            text_ko: '샘이 그러는데, 오늘 2시부터 3시까지 업데이트로 빌드 서버가 멈춘대요.',
            reaction: 'Two to three? The chat says one.',
            reaction_ko: '2시부터 3시요? 채팅에는 1시라고 되어 있는데요.'
          },
          {
            text: 'Sam posted something about the build server. Check the chat, I guess.',
            text_ko: '샘이 빌드 서버에 대해 뭘 올렸어요. 채팅 확인해 보세요.',
            reaction: 'Could you just tell us what it says?',
            reaction_ko: '그냥 뭐라고 했는지 말해 줄래요?'
          },
          {
            text: 'Sam says the build server is down all afternoon today for an update.',
            text_ko: '샘이 그러는데, 오늘 오후 내내 업데이트로 빌드 서버가 멈춘대요.',
            reaction: 'All afternoon? That would wreck my plan.',
            reaction_ko: '오후 내내요? 그럼 제 계획이 다 틀어지는데요.'
          }
        ],
        reply_line: "Thanks. I'll merge before one, then.",
        reply_ko: '고마워요. 그럼 1시 전에 병합할게요.'
      },
      {
        situation: "Derek's camera is off, and he sounds tired. He was paged twice last night for the data import. He also has a call with Greg from Summit Retail at two.",
        situation_ko: '데릭은 카메라를 껐고 목소리가 피곤합니다. 어젯밤 데이터 가져오기 때문에 두 번 호출을 받았습니다. 2시에는 서밋 리테일의 그렉과 통화도 있습니다.',
        line: "Sorry, I'm a little slow today. I got paged twice last night.",
        line_ko: '미안해요, 오늘 좀 멍해요. 어젯밤에 호출을 두 번 받았어요.',
        prompt: 'Show you care, and offer to take something off his plate.',
        prompt_ko: '걱정해 주고, 그의 일을 하나 덜어 주겠다고 하세요.',
        model: 'Oh no. Want me to move your call with Greg to tomorrow?',
        model_ko: '저런. 그렉과의 통화를 내일로 옮겨 줄까요?',
        distractors: [
          {
            text: 'Oh no. Want me to move your call with Greg to next month?',
            text_ko: '저런. 그렉과의 통화를 다음 달로 옮겨 줄까요?',
            reaction: 'Next month? Tomorrow would be fine.',
            reaction_ko: '다음 달이요? 내일이면 충분해요.'
          },
          {
            text: "That's on-call life, I guess. Anyway, Jun, you're up.",
            text_ko: '온콜이 원래 그렇죠, 뭐. 아무튼 준, 다음이요.',
            reaction: 'Thanks a lot...',
            reaction_ko: '참 고맙네요...'
          },
          {
            text: 'Oh no. Maybe turn your camera on? It might help you wake up.',
            text_ko: '저런. 카메라를 켜 보는 건요? 잠이 좀 깰 수도 있잖아요.',
            reaction: "I'd rather keep it off today.",
            reaction_ko: '오늘은 그냥 끄고 있을게요.'
          }
        ],
        reply_line: 'That would really help. Thanks, Priya.',
        reply_ko: '그러면 정말 도움이 돼요. 고마워요, 프리야.'
      },
      {
        speaker: 'jun',
        situation: 'Maya is out today. She asked you to post the standup notes in the team chat afterward.',
        situation_ko: '마야는 오늘 자리를 비웁니다. 스탠드업이 끝나면 메모를 팀 채팅에 올려 달라고 당신에게 부탁했습니다.',
        line: 'Priya, will there be notes for Maya?',
        line_ko: '프리야, 마야한테 줄 메모 있어요?',
        prompt: 'Confirm, and say when.',
        prompt_ko: '그렇다고 하고, 언제 올릴지 말하세요.',
        model: "Yes, I'll post the notes in the team chat right after this.",
        model_ko: '네, 끝나자마자 팀 채팅에 메모를 올릴게요.',
        distractors: [
          {
            text: "Yes, I'll email Maya the notes at the end of the week.",
            text_ko: '네, 이번 주 끝날 때쯤 마야한테 메모를 메일로 보낼게요.',
            reaction: "The end of the week? She'll want them today.",
            reaction_ko: '주 끝날 때요? 오늘 필요할 텐데요.'
          },
          {
            text: "Maya's out, so let's skip the notes today.",
            text_ko: '마야가 없으니까 오늘은 메모 생략해요.',
            reaction: "But she asked for them, didn't she?",
            reaction_ko: '그래도 마야가 부탁한 거 아니에요?'
          },
          {
            text: 'Yes. Jun, could you take the notes and post them?',
            text_ko: '네. 준, 메모 좀 해서 올려 줄래요?',
            reaction: 'Me? I thought she asked you.',
            reaction_ko: '저요? 프리야한테 부탁한 줄 알았는데요.'
          }
        ],
        reply_line: 'Great, thanks.',
        reply_ko: '좋아요, 고마워요.'
      }
    ]
  },
  {
    id: 'rt_video_pr_3',
    title: 'Video standup: drilling next door',
    title_ko: '화상 스탠드업: 옆집 공사',
    place: 'priya_desk',
    npc: 'derek',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: "Construction noise starts next door while you run the call. Handle it, share the client's decision and what it means, and unblock Jun right away.",
    summary_ko: '통화를 진행하는데 옆집 공사 소음이 들립니다. 소음을 처리하고, 고객의 결정과 그 의미를 전하고, 막힌 준을 바로 풀어 주세요.',
    sort: 2073,
    tags: 'meeting,standup,routine,video',
    turns: [
      {
        situation: "Ten o'clock standup on video, from your loft. Construction next door just started drilling, and you're the one running the call.",
        situation_ko: '로프트에서 화상으로 하는 10시 스탠드업입니다. 옆집 공사에서 막 드릴 소리가 나기 시작했고, 통화는 당신이 진행합니다.',
        line: "Whoa, what's that noise?",
        line_ko: '와, 무슨 소리예요?',
        prompt: 'Explain in a few words, and deal with it so the meeting can go on.',
        prompt_ko: '짧게 설명하고, 회의가 계속될 수 있게 처리하세요.',
        model: "Construction next door, sorry! I'll stay muted when I'm not talking.",
        model_ko: '옆집 공사예요, 미안해요! 말할 때 말고는 음소거할게요.',
        distractors: [
          {
            text: 'Construction next door. Just ignore it. It should stop in an hour or so.',
            text_ko: '옆집 공사예요. 그냥 신경 쓰지 마요. 한 시간쯤이면 끝날 거예요.',
            reaction: 'An hour? We can barely hear anyone.',
            reaction_ko: '한 시간이요? 지금 다들 잘 안 들려요.'
          },
          {
            text: "My neighbor's dog, sorry! I'll stay muted when I'm not talking.",
            text_ko: '이웃집 개예요, 미안해요! 말할 때 말고는 음소거할게요.',
            reaction: "That doesn't sound like a dog.",
            reaction_ko: '개 소리 같지는 않은데요.'
          },
          {
            text: 'Construction next door, sorry! Derek, could you just run standup today?',
            text_ko: '옆집 공사예요, 미안해요! 데릭, 오늘 스탠드업은 대신 진행해 줄래요?',
            reaction: "Me? You're fine, just mute between turns.",
            reaction_ko: '제가요? 괜찮아요, 차례 사이에만 음소거해요.'
          }
        ],
        reply_line: 'Ha, good luck with that.',
        reply_ko: '하하, 힘내요.'
      },
      {
        situation: 'Your update: Greg from Summit Retail approved the store comparison design yesterday. The engineers can start building it next sprint.',
        situation_ko: '당신 소식: 어제 서밋 리테일의 그렉이 매장 비교 디자인을 승인했습니다. 개발자들은 다음 스프린트에 만들기 시작할 수 있습니다.',
        line: 'Any news from Summit?',
        line_ko: '서밋에서 소식 있어요?',
        prompt: 'Share the news and what it means for the team.',
        prompt_ko: '소식과 그게 팀에 어떤 의미인지 전하세요.',
        model: 'Greg approved the comparison design, so we can start building it next sprint.',
        model_ko: '그렉이 비교 디자인을 승인해서, 다음 스프린트에 만들기 시작할 수 있어요.',
        distractors: [
          {
            text: 'Greg approved the comparison design, so we can start building it today.',
            text_ko: '그렉이 비교 디자인을 승인해서, 오늘부터 만들기 시작할 수 있어요.',
            reaction: "Today? It isn't in this sprint.",
            reaction_ko: '오늘이요? 이번 스프린트에는 없잖아요.'
          },
          {
            text: "Greg turned down the comparison design, so we're back to square one.",
            text_ko: '그렉이 비교 디자인을 거절해서, 원점으로 돌아갔어요.',
            reaction: 'Turned down? I heard he liked it.',
            reaction_ko: '거절이요? 마음에 들어 했다고 들었는데요.'
          },
          {
            text: "Greg liked something, I think. I'll find out more and let you know.",
            text_ko: '그렉이 뭔가 마음에 들어 한 것 같아요. 더 알아보고 알려 줄게요.',
            reaction: 'Liked something? What exactly?',
            reaction_ko: '뭔가요? 정확히 뭘요?'
          }
        ],
        reply_line: "Great news. I'll look at the design this afternoon.",
        reply_ko: '좋은 소식이네요. 오후에 디자인 볼게요.'
      },
      {
        speaker: 'jun',
        situation: "The drilling stops. Jun says he's blocked: he can't open the design file. You own the file, and sharing it takes a minute.",
        situation_ko: '드릴 소리가 멈춥니다. 준이 막혔다고 합니다. 디자인 파일이 안 열린대요. 그 파일은 당신 것이고, 공유하는 데 1분이면 됩니다.',
        line: "I can't open the design file. It says I need access.",
        line_ko: '디자인 파일이 안 열려요. 권한이 필요하대요.',
        prompt: 'Fix it for him right away, and tell him.',
        prompt_ko: '바로 해결해 주고, 그렇다고 말하세요.',
        model: "That's on me. I'm sharing it with you right now.",
        model_ko: '제 탓이에요. 지금 바로 공유할게요.',
        distractors: [
          {
            text: "That's an IT thing. File a ticket with Sam.",
            text_ko: '그건 IT 일이에요. 샘한테 티켓 올려요.',
            reaction: "Sam? I think it's your file.",
            reaction_ko: '샘이요? 프리야 파일인 것 같은데요.'
          },
          {
            text: "That's on me. I'll share it with you next sprint.",
            text_ko: '제 탓이에요. 다음 스프린트에 공유할게요.',
            reaction: 'Next sprint? I need it today.',
            reaction_ko: '다음 스프린트요? 오늘 필요해요.'
          },
          {
            text: 'Ask Derek. He can probably send you a screenshot.',
            text_ko: '데릭한테 물어봐요. 스크린숏은 보내 줄 수 있을 거예요.',
            reaction: 'A screenshot? I need the real file.',
            reaction_ko: '스크린숏이요? 진짜 파일이 필요해요.'
          }
        ],
        reply_line: 'Got it! Thanks, Priya.',
        reply_ko: '열렸어요! 고마워요, 프리야.'
      }
    ]
  },
  {
    id: 'rt_1on1_pr_1',
    title: 'PM-EM sync: Greg wants more',
    title_ko: 'PM-EM 싱크: 그렉이 더 원해요',
    place: 'office_manager',
    npc: 'maya',
    day_from: 16,
    day_to: null,
    time_from: '10:45',
    time_to: '11:45',
    summary: "Your biweekly sync with Maya. Tell her what the client is asking for, agree on a trade-off, and plan how you'll take it to Greg.",
    summary_ko: '마야와 격주로 하는 싱크입니다. 고객이 무엇을 요청했는지 말하고, 무엇을 내주고 무엇을 지킬지 정하고, 그렉에게 어떻게 전할지 계획하세요.',
    sort: 2106,
    tags: 'meeting,manager,one-on-one,routine',
    turns: [
      {
        situation: "Your biweekly PM-EM sync with Maya. Greg Whitfield emailed this morning: he wants a new weekly sales report on every store's dashboard before the rollout is finished. The team is already at full capacity.",
        situation_ko: '마야와 격주로 하는 PM-EM 싱크입니다. 오늘 아침 그렉 휘트필드가 메일을 보냈습니다. 확대 적용이 끝나기 전에 모든 매장 대시보드에 새 주간 매출 보고서를 넣어 달라고요. 팀은 이미 여력이 없습니다.',
        line: "Hi, Priya. What's the latest from Summit Retail?",
        line_ko: '안녕하세요, 프리야. 서밋 리테일 쪽 최근 소식은요?',
        prompt: 'Sum up the request and your concern in a few words.',
        prompt_ko: '요청과 걱정되는 점을 짧게 요약하세요.',
        model: 'Greg wants a new sales report before the rollout ends. But the team is already full.',
        model_ko: '그렉이 확대 적용이 끝나기 전에 새 매출 보고서를 원해요. 그런데 팀은 이미 꽉 찼어요.',
        distractors: [
          {
            text: 'Greg wants a new sales report, and I already told him yes. Can the team fit it in?',
            text_ko: '그렉이 새 매출 보고서를 원하는데, 이미 하겠다고 했어요. 팀이 끼워 넣을 수 있을까요?',
            reaction: 'You said yes already? That makes this harder.',
            reaction_ko: '벌써 하겠다고 했어요? 그럼 더 어려워지는데요.'
          },
          {
            text: 'Greg wants a new sales report before the rollout ends. The team has plenty of room.',
            text_ko: '그렉이 확대 적용이 끝나기 전에 새 매출 보고서를 원해요. 팀은 여유가 충분해요.',
            reaction: 'Plenty of room? Derek would disagree.',
            reaction_ko: '여유가 충분하다고요? 데릭은 생각이 다를걸요.'
          },
          {
            text: 'Greg is being difficult again. He always wants more and never wants to pay for it.',
            text_ko: '그렉이 또 까다롭게 굴어요. 늘 더 원하면서 돈은 절대 안 내려고 해요.',
            reaction: "Careful. He's our client, and a good one.",
            reaction_ko: '조심해요. 우리 고객이고, 좋은 고객이에요.'
          }
        ],
        reply_line: "Okay. It's a fair ask, but the timing is tough.",
        reply_ko: '그렇군요. 요청 자체는 무리가 아닌데, 시기가 어렵네요.'
      },
      {
        situation: 'The rollout to the remaining stores is what the contract promises. Derek thinks the report would take the team about two weeks.',
        situation_ko: '남은 매장에 확대 적용하는 건 계약에서 약속한 일입니다. 데릭은 보고서에 팀이 2주쯤 걸릴 거라고 봅니다.',
        line: 'So what do you want to tell him?',
        line_ko: '그럼 그렉한테 뭐라고 할 거예요?',
        prompt: 'Propose a trade-off that protects what the contract promises.',
        prompt_ko: '계약에서 약속한 걸 지키는 선에서 주고받을 안을 제안하세요.',
        model: 'Rollout first. Then the report right after, or he swaps it for something else.',
        model_ko: '확대 적용이 먼저예요. 보고서는 그 직후에 하거나, 그렉이 다른 걸 빼고 바꿔 넣거나요.',
        distractors: [
          {
            text: "We'll do both. The team can work a couple of weekends, and Greg never has to know.",
            text_ko: '둘 다 하죠. 팀이 주말에 두어 번 나오면 되고, 그렉은 몰라도 돼요.',
            reaction: 'Weekends? Not on my team.',
            reaction_ko: '주말이요? 우리 팀에선 안 돼요.'
          },
          {
            text: "We'll pause the rollout for two weeks and build the report first. He's the client.",
            text_ko: '확대 적용을 2주 멈추고 보고서부터 만들죠. 고객이잖아요.',
            reaction: "The rollout is what we promised. Let's not pause it.",
            reaction_ko: '확대 적용은 우리가 약속한 거예요. 멈추지 말죠.'
          },
          {
            text: "Flat out no. It wasn't in the contract, so honestly, it's not our problem at all.",
            text_ko: '딱 잘라 안 된다고 해요. 계약에 없던 거니까 솔직히 우리 문제가 아니에요.',
            reaction: 'Too blunt. We want him to keep coming back.',
            reaction_ko: '너무 직설적이에요. 계속 우리를 찾게 해야죠.'
          }
        ],
        reply_line: 'Good. Giving him a choice is better than giving him a no.',
        reply_ko: '좋아요. 안 된다고 하는 것보다 선택지를 주는 게 나아요.'
      },
      {
        situation: 'You know Greg well and would rather lead the call yourself. A written estimate from Derek would make your case stronger.',
        situation_ko: '그렉을 잘 아는 당신이 통화를 직접 이끄는 게 좋겠다고 생각합니다. 데릭의 견적이 글로 있으면 설득력이 커집니다.',
        line: 'Do you want me on the call with Greg?',
        line_ko: '그렉과 통화할 때 제가 같이 들어갈까요?',
        prompt: "Say you'll lead it, and ask for the support you need.",
        prompt_ko: '직접 이끌겠다고 하고, 필요한 지원을 요청하세요.',
        model: "I'll lead it. Could you get me Derek's estimate in writing first?",
        model_ko: '제가 이끌게요. 먼저 데릭의 견적을 글로 받아 주실 수 있어요?',
        distractors: [
          {
            text: 'Could you run it instead? Greg listens to you more than me anyway.',
            text_ko: '대신 진행해 주실래요? 어차피 그렉은 저보다 마야 말을 더 들어요.',
            reaction: 'Really? You know him much better than I do.',
            reaction_ko: '정말요? 그렉은 프리야가 저보다 훨씬 잘 알잖아요.'
          },
          {
            text: "I'll lead it. Skip the estimate. I'll just give him a rough guess.",
            text_ko: '제가 이끌게요. 견적은 됐어요. 대충 감으로 말할게요.',
            reaction: 'A guess? Greg likes real numbers.',
            reaction_ko: '감으로요? 그렉은 정확한 숫자를 좋아해요.'
          },
          {
            text: "I'll lead it, but let's keep Derek out of it. He says no to everything.",
            text_ko: '제가 이끌게요. 근데 데릭은 빼죠. 뭐든 안 된다고만 하니까요.',
            reaction: "That's not fair to Derek. Let's get his number.",
            reaction_ko: '데릭한테 공정하지 않아요. 데릭의 숫자를 받죠.'
          }
        ],
        reply_line: "I'll ask him today. You'll have it by tomorrow.",
        reply_ko: '오늘 부탁할게요. 내일까지는 받을 거예요.'
      },
      {
        situation: 'The five-store pilot is going well. Store managers say they check the dashboard every morning.',
        situation_ko: '매장 다섯 곳의 시범 운영은 잘되고 있습니다. 매장 관리자들은 매일 아침 대시보드를 확인한다고 합니다.',
        line: 'How will you open the conversation?',
        line_ko: '대화는 어떻게 시작할 거예요?',
        prompt: "Describe how you'll start: on a positive note, before the hard part.",
        prompt_ko: '어떻게 시작할지 말하세요. 어려운 얘기 전에 긍정적으로요.',
        model: "With good news: managers check it every morning. Then I'll give him the options.",
        model_ko: '좋은 소식으로요. 관리자들이 매일 아침 확인한대요. 그다음에 안을 줄게요.',
        distractors: [
          {
            text: "With the bad news first. I'll tell him it can't happen and then let him react.",
            text_ko: '나쁜 소식부터요. 안 된다고 말하고 반응을 볼게요.',
            reaction: 'That might put him on the defensive.',
            reaction_ko: '그러면 방어적으로 나올 수 있어요.'
          },
          {
            text: "With good news: the rollout is already finished. Then I'll give him the options.",
            text_ko: '좋은 소식으로요. 확대 적용이 벌써 끝났다고요. 그다음에 안을 줄게요.',
            reaction: "Finished? We're still rolling it out.",
            reaction_ko: '끝났다고요? 아직 확대 중이잖아요.'
          },
          {
            text: "With an apology. I'll say sorry the team can't keep up, and offer a discount.",
            text_ko: '사과부터요. 팀이 못 따라가서 죄송하다고 하고 할인을 제안할게요.',
            reaction: "A discount? Let's not give money away.",
            reaction_ko: '할인이요? 돈을 그냥 내주진 말죠.'
          }
        ],
        reply_line: 'Perfect. Start strong, then give him choices. Let me know if you have any questions.',
        reply_ko: '완벽해요. 힘 있게 시작하고, 선택지를 주세요. 궁금한 게 있으면 언제든 말해요.'
      }
    ]
  },
  {
    id: 'rt_1on1_pr_2',
    title: 'PM-EM sync: the hire and the roadmap',
    title_ko: 'PM-EM 싱크: 채용과 로드맵',
    place: 'office_manager',
    npc: 'maya',
    day_from: 16,
    day_to: null,
    time_from: '10:45',
    time_to: '11:45',
    summary: 'Update Maya on the backend developer hire, adjust the phase two plan to match, give balanced feedback on Jun, and tell Maya one thing that would help you.',
    summary_ko: '백엔드 개발자 채용 상황을 마야에게 알리고, 그에 맞게 2단계 계획을 조정하고, 준에 대해 균형 잡힌 피드백을 주고, 당신에게 도움이 될 한 가지를 마야에게 말하세요.',
    sort: 2107,
    tags: 'meeting,manager,one-on-one,routine',
    turns: [
      {
        situation: "Your biweekly sync with Maya. For the backend role, two candidates passed Derek's technical interview, and he was very impressed by one. The final round is with Maya, and it isn't on her calendar yet.",
        situation_ko: '마야와의 격주 싱크입니다. 백엔드 자리에 두 명이 데릭의 기술 면접을 통과했고, 데릭은 그중 한 명에게 크게 감탄했습니다. 최종 면접은 마야가 보는데, 아직 그녀의 달력에 잡혀 있지 않습니다.',
        line: 'Where are we on the backend hire?',
        line_ko: '백엔드 채용은 어디까지 왔어요?',
        prompt: "Give the update, and ask for the one thing that's holding it up.",
        prompt_ko: '현황을 알리고, 일을 막고 있는 한 가지를 요청하세요.',
        model: "Two passed Derek's round, and he loved one. We just need a slot for your final.",
        model_ko: '두 명이 데릭 면접을 통과했고, 한 명은 데릭이 아주 마음에 들어 해요. 마야의 최종 면접만 잡으면 돼요.',
        distractors: [
          {
            text: "Two passed Derek's round. I'll make an offer myself today, so we don't lose them.",
            text_ko: '두 명이 데릭 면접을 통과했어요. 놓치지 않게 오늘 제가 직접 제안할게요.',
            reaction: "An offer before the final round? Let's not skip steps.",
            reaction_ko: '최종 면접 전에 제안이요? 단계를 건너뛰진 말죠.'
          },
          {
            text: "Nobody has passed Derek's round yet. We might need to post the job again soon.",
            text_ko: '아직 데릭 면접을 통과한 사람이 없어요. 곧 공고를 다시 내야 할지도요.',
            reaction: "That's not what Derek told me.",
            reaction_ko: '데릭한테 들은 얘기랑 다른데요.'
          },
          {
            text: "Two passed Derek's round. Linda was supposed to book the final with you already.",
            text_ko: '두 명이 데릭 면접을 통과했어요. 최종 면접은 린다가 벌써 잡았어야 했는데요.',
            reaction: "Let's not worry about who. Let's just book it now.",
            reaction_ko: '누구 탓인지는 신경 쓰지 말고, 지금 잡죠.'
          }
        ],
        reply_line: "Fair. I'll find two slots this week.",
        reply_ko: '맞아요. 이번 주에 두 자리 찾아볼게요.'
      },
      {
        situation: 'Even with a quick offer, a new hire takes several weeks to start, and longer to get up to speed. Phase two, the mobile app, is next on the roadmap.',
        situation_ko: '빨리 제안하더라도 신입이 출근하기까지 몇 주, 손에 익기까지는 더 걸립니다. 로드맵에서 다음은 모바일 앱인 2단계입니다.',
        line: "Even if they say yes, they won't be up to speed for a while. How does that change phase two?",
        line_ko: '수락하더라도 한동안은 제 속도가 안 날 거예요. 2단계는 어떻게 바뀌어요?',
        prompt: 'Suggest how to adjust the plan so phase two can still begin.',
        prompt_ko: '2단계를 그래도 시작할 수 있게 계획을 어떻게 고칠지 제안하세요.',
        model: 'The current team starts on design, and the new hire takes backend work later.',
        model_ko: '지금 팀으로 설계부터 시작하고, 백엔드 일은 신입이 나중에 맡으면 돼요.',
        distractors: [
          {
            text: "It doesn't change anything. The new hire can lead phase two from their first week.",
            text_ko: '달라지는 건 없어요. 신입이 첫 주부터 2단계를 이끌면 돼요.',
            reaction: "From week one? That's a lot to ask of anyone.",
            reaction_ko: '첫 주부터요? 누구한테든 무리한 요구예요.'
          },
          {
            text: "We push phase two back six months to be safe. I'm sure Greg won't mind the wait.",
            text_ko: '안전하게 2단계를 6개월 미루죠. 그렉도 기다리는 건 괜찮을 거예요.',
            reaction: "Six months? I'm pretty sure Greg would mind.",
            reaction_ko: '6개월이요? 그렉은 분명히 신경 쓸걸요.'
          },
          {
            text: 'We start with design, and Derek covers all the backend work on top of the rollout.',
            text_ko: '설계부터 시작하고, 백엔드 일은 데릭이 확대 적용과 함께 전부 맡으면 돼요.',
            reaction: "Derek's plate is full already.",
            reaction_ko: '데릭은 이미 일이 꽉 찼어요.'
          }
        ],
        reply_line: "That works. Let's put it on the roadmap that way.",
        reply_ko: '좋아요. 로드맵에 그렇게 넣죠.'
      },
      {
        situation: "Jun's demo for the store managers went really well. One thing you've noticed: he says yes to every request you give him, then works late to finish.",
        situation_ko: '준이 매장 관리자들에게 한 시연은 아주 잘됐습니다. 눈에 띈 점이 하나 있습니다. 당신이 주는 요청은 다 받아들이고, 끝내려고 늦게까지 일합니다.',
        line: "I'm gathering feedback on Jun for his review. You work with him every day. Anything?",
        line_ko: '준의 평가를 위해 피드백을 모으고 있어요. 매일 같이 일하잖아요. 뭐 있어요?',
        prompt: 'Give balanced feedback: something specific he does well, and one area to grow.',
        prompt_ko: '균형 잡힌 피드백을 주세요. 잘하는 구체적인 점 하나와 성장할 점 하나요.',
        model: 'His store demo was excellent. But he says yes to everything, then works late.',
        model_ko: '매장 시연은 훌륭했어요. 그런데 뭐든 다 받아들이고 늦게까지 일해요.',
        distractors: [
          {
            text: "He's great. Honestly, nothing to improve. He never says no to anything I ask.",
            text_ko: '훌륭해요. 솔직히 고칠 게 없어요. 제가 뭘 부탁해도 절대 거절을 안 해요.',
            reaction: 'Never says no? That might be part of the problem.',
            reaction_ko: '절대 거절을 안 한다고요? 그게 문제의 일부일 수도 있어요.'
          },
          {
            text: "His store demo was okay, but honestly, he's slow. He's always there late.",
            text_ko: '매장 시연은 괜찮았는데, 솔직히 느려요. 늘 늦게까지 남아 있어요.',
            reaction: "Slow? I think he's just taking on too much.",
            reaction_ko: '느리다고요? 그냥 일을 너무 많이 떠안는 것 같은데요.'
          },
          {
            text: "His store demo was excellent. That's all I'd rather say about a coworker.",
            text_ko: '매장 시연은 훌륭했어요. 동료에 대해선 거기까지만 말하고 싶어요.',
            reaction: "It's okay to be honest here. It helps him grow.",
            reaction_ko: '여기선 솔직해도 돼요. 그래야 준이 성장해요.'
          }
        ],
        reply_line: "That matches what I've seen. I'll work with him on pushing back.",
        reply_ko: '제가 본 것과 같네요. 거절하는 법을 같이 연습해 볼게요.'
      },
      {
        situation: "The team's capacity numbers usually reach you after you've already shared a rough plan with Greg, so you sometimes have to walk things back.",
        situation_ko: '팀의 가용 인력 수치는 보통 당신이 그렉에게 대략적인 계획을 공유한 뒤에야 옵니다. 그래서 가끔 말을 거둬들여야 합니다.',
        line: "And what's one thing I could do to make your job easier?",
        line_ko: '그리고 프리야 일이 수월해지려면 제가 뭘 하면 될까요?',
        prompt: 'Give her specific feedback that would help your planning.',
        prompt_ko: '계획 세우는 데 도움이 될 구체적인 피드백을 주세요.',
        model: 'Could I get capacity numbers before I share plans with Greg, not after?',
        model_ko: '그렉에게 계획을 공유한 뒤가 아니라, 그 전에 가용 인력 수치를 받을 수 있을까요?',
        distractors: [
          {
            text: "Nothing at all. You're perfect. I wouldn't change anything about how you run the team.",
            text_ko: '하나도 없어요. 완벽하세요. 팀 운영 방식에서 바꿀 게 하나도 없어요.',
            reaction: "Nobody's perfect. Think about it.",
            reaction_ko: '완벽한 사람은 없어요. 생각해 봐요.'
          },
          {
            text: "Could you handle Greg from now on? Then I wouldn't need the capacity numbers at all.",
            text_ko: '앞으로 그렉은 마야가 맡아 주실래요? 그러면 가용 인력 수치가 아예 필요 없어요.',
            reaction: 'Greg is your client relationship, Priya.',
            reaction_ko: '그렉과의 관계는 프리야 몫이에요.'
          },
          {
            text: 'Honestly, your numbers always show up late, and it makes me look bad in front of Greg.',
            text_ko: '솔직히 마야 숫자는 늘 늦게 와서, 그렉 앞에서 제가 난처해져요.',
            reaction: "That's fair, but it came out a little sharp.",
            reaction_ko: '맞는 말이지만, 좀 날카롭게 들렸어요.'
          }
        ],
        reply_line: "Good point. I'll send you capacity at the start of every planning cycle. Let me know if you have any questions.",
        reply_ko: '좋은 지적이에요. 계획 주기를 시작할 때마다 가용 인력을 보내 줄게요. 궁금한 게 있으면 언제든 말해요.'
      }
    ]
  },
  {
    id: 'rt_1on1_pr_3',
    title: 'PM-EM sync: running on empty',
    title_ko: 'PM-EM 싱크: 방전 직전',
    place: 'office_manager',
    npc: 'maya',
    day_from: 16,
    day_to: null,
    time_from: '10:45',
    time_to: '11:45',
    summary: "Maya has noticed your late-night emails. Be honest about how you're doing, plan some time off with coverage, set a sensible limit, and give credit to a colleague.",
    summary_ko: '마야가 당신의 늦은 밤 메일을 알아챘습니다. 지금 상태를 솔직하게 말하고, 대신 맡을 사람을 정해 휴가를 계획하고, 적당한 선을 정하고, 동료의 공을 알리세요.',
    sort: 2108,
    tags: 'meeting,manager,one-on-one,routine',
    turns: [
      {
        situation: "Your biweekly sync. You've been answering Greg's emails around midnight, and you're running on coffee. Maya noticed the timestamps.",
        situation_ko: '격주 싱크입니다. 요즘 자정 무렵에 그렉의 메일에 답하고 있고, 커피로 버티고 있습니다. 마야가 보낸 시각을 알아챘습니다.',
        line: 'Priya, I saw emails from you at midnight. How are you doing, really?',
        line_ko: '프리야, 자정에 보낸 메일을 봤어요. 정말 괜찮아요?',
        prompt: "Admit how you're actually doing.",
        prompt_ko: '실제로 어떤 상태인지 인정하세요.',
        model: "Honestly, I'm worn out. I keep answering Greg at night, and it's catching up with me.",
        model_ko: '솔직히 지쳤어요. 밤에 계속 그렉한테 답하다 보니 몸이 못 버티네요.',
        distractors: [
          {
            text: 'Great, actually. Midnight is my most productive time. I honestly love working then.',
            text_ko: '좋아요, 사실. 자정이 제일 능률이 오르는 시간이에요. 솔직히 그때 일하는 게 좋아요.',
            reaction: 'Really? You look exhausted, Priya.',
            reaction_ko: '정말요? 많이 지쳐 보여요, 프리야.'
          },
          {
            text: 'Worn out. Greg is impossible. He expects answers at midnight, every single night.',
            text_ko: '지쳤어요. 그렉은 답이 없어요. 매일 밤 자정에 답장을 기대해요.',
            reaction: 'Every night? Has he actually asked for that?',
            reaction_ko: '매일 밤이요? 그렉이 정말 그렇게 요구했어요?'
          },
          {
            text: "Sorry about that. I'll schedule my emails to go out in the morning, so you won't see.",
            text_ko: '죄송해요. 메일은 아침에 나가게 예약해 둘게요. 그럼 안 보이실 거예요.',
            reaction: "Hiding the timestamps isn't the point.",
            reaction_ko: '시각을 숨기는 게 중요한 게 아니에요.'
          }
        ],
        reply_line: "Thanks for being honest. Let's fix this before it gets worse.",
        reply_ko: '솔직하게 말해 줘서 고마워요. 더 나빠지기 전에 바로잡죠.'
      },
      {
        situation: "You have PTO you haven't used. Derek knows the dashboard inside out and has met Greg, and Maya can handle anything urgent.",
        situation_ko: '쓰지 않은 유급 휴가가 있습니다. 데릭은 대시보드를 속속들이 알고 그렉도 만나 봤으며, 급한 일은 마야가 처리할 수 있습니다.',
        line: "I want you to take a few days off. Who could cover the client while you're out?",
        line_ko: '며칠 쉬었으면 해요. 없는 동안 고객은 누가 맡을 수 있을까요?',
        prompt: 'Propose a coverage plan using the people who know the work.',
        prompt_ko: '일을 아는 사람들로 대신 맡을 계획을 제안하세요.',
        model: 'Derek knows the dashboard and has met Greg. You could take anything urgent.',
        model_ko: '데릭이 대시보드를 알고 그렉도 만나 봤어요. 급한 일이 생기면 마야가 나서 주시고요.',
        distractors: [
          {
            text: "Nobody, really. I'll bring my laptop and check email once or twice a day.",
            text_ko: '딱히 없어요. 노트북 들고 가서 하루에 한두 번 메일을 확인할게요.',
            reaction: "That's not time off, Priya.",
            reaction_ko: '그건 쉬는 게 아니에요, 프리야.'
          },
          {
            text: "Jun could do it. He's new, but handling Greg alone would be good practice.",
            text_ko: '준이 하면 돼요. 신입이지만 그렉을 혼자 상대해 보는 게 좋은 연습이 될 거예요.',
            reaction: "Alone with Greg? That's a lot for Jun.",
            reaction_ko: '혼자 그렉을요? 준한테는 벅차요.'
          },
          {
            text: "Derek knows the dashboard, but he's never met Greg, so maybe I shouldn't go.",
            text_ko: '데릭이 대시보드는 알지만 그렉을 만난 적이 없어서, 안 가는 게 나을지도요.',
            reaction: "He's met Greg, hasn't he? I'm sure of it.",
            reaction_ko: '데릭은 그렉을 만났잖아요? 확실해요.'
          }
        ],
        reply_line: "Good. Ask Derek, and I'll be the backup.",
        reply_ko: '좋아요. 데릭한테 부탁하고, 백업은 제가 할게요.'
      },
      {
        situation: 'Greg works normal office hours. Nothing he has sent at night has been urgent so far.',
        situation_ko: '그렉은 보통 근무 시간에 일합니다. 그가 밤에 보낸 메일 중 급한 건 지금까지 하나도 없었습니다.',
        line: "And once you're back? How do we keep this from happening again?",
        line_ko: '그리고 돌아와서는요? 다시 이렇게 되지 않으려면 어떻게 할까요?',
        prompt: 'Suggest a reasonable limit on after-hours email.',
        prompt_ko: '퇴근 후 메일에 대해 합리적인 선을 제안하세요.',
        model: "I'll stop answering after seven. Nothing he's sent at night has been urgent so far.",
        model_ko: '일곱 시 이후엔 답하지 않을게요. 그렉이 밤에 보낸 것 중 급한 건 없었으니까요.',
        distractors: [
          {
            text: "I'll tell Greg he can only email us during business hours, or we stop answering.",
            text_ko: '그렉한테 근무 시간에만 메일하라고, 아니면 답 안 한다고 말할게요.',
            reaction: "Let's not lay down rules for the client.",
            reaction_ko: '고객한테 규칙을 정해 주진 말죠.'
          },
          {
            text: "I'll keep answering at night, but only for an hour. That seems like a fair deal.",
            text_ko: '밤에도 계속 답하되, 한 시간만 할게요. 그 정도면 적당한 것 같아요.',
            reaction: 'An hour every night still adds up.',
            reaction_ko: '매일 밤 한 시간도 쌓이면 커요.'
          },
          {
            text: "I'll stop answering after seven, even if the dashboard goes down for every store.",
            text_ko: '일곱 시 이후엔 답 안 할게요. 모든 매장 대시보드가 멈춰도요.',
            reaction: 'Real emergencies are different. Those still need someone.',
            reaction_ko: '진짜 비상 상황은 달라요. 그땐 누군가는 있어야 해요.'
          }
        ],
        reply_line: "That's healthy. Real emergencies go to whoever's on call anyway.",
        reply_ko: '건강한 선이네요. 진짜 비상 상황은 어차피 온콜 담당자한테 가요.'
      },
      {
        situation: "When the pilot stores' tablets lost Wi-Fi, Sam Reyes from IT stayed late to fix them, so the managers could open the dashboard the next morning.",
        situation_ko: '시범 매장의 태블릿이 와이파이에 연결되지 않았을 때, IT팀 샘 레예스가 늦게까지 남아 고쳐서 다음 날 아침 관리자들이 대시보드를 열 수 있었습니다.',
        line: 'Before you go. Anything good from the team I should know about?',
        line_ko: '가기 전에요. 제가 알아야 할 좋은 소식 있어요?',
        prompt: 'Make sure a colleague outside the team gets credit for helping.',
        prompt_ko: '팀 밖의 동료가 도와준 공을 인정받게 하세요.',
        model: "Sam from IT stayed late fixing the tablets' Wi-Fi. He kept the pilot going.",
        model_ko: 'IT팀 샘이 늦게까지 남아서 태블릿 와이파이를 고쳤어요. 덕분에 시범 운영이 안 멈췄어요.',
        distractors: [
          {
            text: "Sam from IT fixed the store tablets' Wi-Fi, but only after I reminded him three times.",
            text_ko: 'IT팀 샘이 매장 태블릿 와이파이를 고치긴 했는데, 제가 세 번이나 말한 뒤에요.',
            reaction: 'Three times? I heard he jumped right on it.',
            reaction_ko: '세 번이요? 바로 달려들었다고 들었는데요.'
          },
          {
            text: "Derek stayed late to fix the store tablets' Wi-Fi. He saved the pilot that night.",
            text_ko: '데릭이 늦게까지 남아서 매장 태블릿 와이파이를 고쳤어요. 그날 밤 시범 운영을 살렸어요.',
            reaction: 'Derek? I thought Sam handled the tablets.',
            reaction_ko: '데릭이요? 태블릿은 샘이 맡은 줄 알았는데요.'
          },
          {
            text: 'Not really. Everyone just did their jobs this time. Nothing really worth mentioning.',
            text_ko: '딱히요. 이번엔 다들 자기 일을 했을 뿐이에요. 특별히 말할 건 없어요.',
            reaction: 'I bet somebody went the extra mile.',
            reaction_ko: '분명 누군가는 더 애썼을 텐데요.'
          }
        ],
        reply_line: "I'll email his manager and copy you. Now go plan those days off. Let me know if you have any questions.",
        reply_ko: '샘의 매니저에게 메일 보내고 프리야도 참조로 넣을게요. 이제 가서 휴가 계획 세워요. 궁금한 게 있으면 언제든 말해요.'
      }
    ]
  },
  {
    id: 'rt_planning_pr_1',
    title: 'Setting the sprint goal',
    title_ko: '스프린트 목표 정하기',
    place: 'office_meeting',
    npc: 'derek',
    day_from: 16,
    day_to: null,
    time_from: '13:15',
    time_to: '14:15',
    summary: 'You run sprint planning. Give the team one clear goal, put the backlog in the right order, and keep the sprint to what the team can finish.',
    summary_ko: '스프린트 계획 회의는 당신이 진행합니다. 팀에 분명한 목표 하나를 주고, 백로그 순서를 바로잡고, 스프린트를 팀이 끝낼 수 있는 만큼으로 지키세요.',
    sort: 2220,
    tags: 'meeting,planning,routine',
    turns: [
      {
        situation: "Sprint planning. The team is in the meeting room, and the board is on the screen. Summit Retail's store managers keep saying the same thing: the dashboard is slow to load in the mornings. Every other request can wait.",
        situation_ko: '스프린트 계획 회의입니다. 팀이 회의실에 모였고 화면에 보드가 떠 있습니다. 서밋 리테일 매장 매니저들은 같은 말을 계속합니다. 아침마다 대시보드가 느리게 뜬다고요. 다른 요청은 다 기다릴 수 있습니다.',
        line: "Okay, we're all here. What's the goal for this sprint?",
        line_ko: '자, 다 모였어요. 이번 스프린트 목표는 뭐예요?',
        prompt: 'Give the team a single, clear goal based on what the client needs most.',
        prompt_ko: '고객에게 가장 필요한 것을 바탕으로 팀에 분명한 목표 하나를 주세요.',
        model: 'One goal: make the dashboard load fast in the mornings. Everything else comes second.',
        model_ko: '목표는 하나예요. 아침에 대시보드가 빨리 뜨게 하는 것. 나머지는 그다음이에요.',
        distractors: [
          {
            text: "Let's try to do a bit of everything this sprint. Every request matters equally.",
            text_ko: '이번 스프린트엔 조금씩 다 해 봐요. 모든 요청이 똑같이 중요해요.',
            reaction: 'A bit of everything usually means nothing gets finished.',
            reaction_ko: '조금씩 다 하면 보통 아무것도 안 끝나요.'
          },
          {
            text: 'One goal: start building the mobile app. The dashboard can wait a few weeks.',
            text_ko: '목표는 하나예요. 모바일 앱 만들기 시작. 대시보드는 몇 주 기다려도 돼요.',
            reaction: "The app's not until January. The stores are complaining now.",
            reaction_ko: '앱은 1월이에요. 매장들은 지금 불만이고요.'
          },
          {
            text: "One goal: make it load fast. Honestly, it's embarrassing it was ever that slow.",
            text_ko: '목표는 하나예요. 빨리 뜨게 하기. 솔직히 그렇게 느렸다니 창피해요.',
            reaction: "Hey, we built it on a tight deadline. Let's not go there.",
            reaction_ko: '이봐요, 촉박한 일정에 만든 거예요. 그 얘긴 하지 말죠.'
          }
        ],
        reply_line: "Clear enough. Speed first. I'll write it at the top of the board.",
        reply_ko: '분명하네요. 속도가 먼저. 보드 맨 위에 적을게요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun points at the backlog. Right at the top sits a new color theme for the dashboard. Greg mentioned it once, in passing. The loading fix is below it.',
        situation_ko: '준이 백로그를 가리킵니다. 맨 위에 대시보드 새 색상 테마가 있습니다. 그렉이 지나가듯 한 번 말한 것입니다. 로딩 개선은 그 아래에 있습니다.',
        line: "Should I start with the color theme? It's right at the top.",
        line_ko: '색상 테마부터 할까요? 맨 위에 있어서요.',
        prompt: 'Put the work in an order that matches the goal you just set, and explain why.',
        prompt_ko: '방금 정한 목표에 맞게 일의 순서를 정하고, 이유를 말하세요.',
        model: "Let's move the loading fix above it. Speed is our goal. The colors can wait.",
        model_ko: '로딩 개선을 그 위로 올려요. 우리 목표는 속도예요. 색상은 기다려도 돼요.',
        distractors: [
          {
            text: 'Yes, start with the colors. Greg mentioned them, so they must be urgent.',
            text_ko: '네, 색상부터 해요. 그렉이 말했으니 급한 게 분명해요.',
            reaction: 'Urgent? I think he only brought it up once.',
            reaction_ko: '급하다고요? 한 번 말한 것뿐인 것 같은데요.'
          },
          {
            text: "Let's just delete the color theme. Greg will never notice it's gone.",
            text_ko: '색상 테마는 그냥 지워요. 그렉은 없어진 줄도 모를 거예요.',
            reaction: 'Delete it? What if he asks about it later?',
            reaction_ko: '지운다고요? 나중에 물어보면요?'
          },
          {
            text: "Start wherever you like. The order of the backlog doesn't really matter.",
            text_ko: '하고 싶은 데서 시작해요. 백로그 순서는 별로 중요하지 않아요.',
            reaction: 'Then why do we keep the backlog in order?',
            reaction_ko: '그럼 백로그 순서는 왜 정해 두는 거예요?'
          }
        ],
        reply_line: "Got it. I'll grab the loading fix first.",
        reply_ko: '알겠어요. 로딩 개선부터 잡을게요.'
      },
      {
        situation: 'The sprint now holds thirty-four points. The team usually finishes about thirty, and Derek will be out on Friday. Protecting the team from overload is part of your job.',
        situation_ko: '스프린트에 지금 34포인트가 들어 있습니다. 팀은 보통 30쯤 끝내고, 데릭은 금요일에 쉽니다. 팀이 과부하에 걸리지 않게 지키는 것도 당신의 일입니다.',
        line: 'Thirty-four points. Do we go for it?',
        line_ko: '34포인트예요. 그대로 갈까요?',
        prompt: 'Keep the sprint realistic, and decide what comes out.',
        prompt_ko: '스프린트를 현실적으로 맞추고, 무엇을 뺄지 정하세요.',
        model: "No. With you out Friday, let's aim for twenty-eight. The color theme comes out.",
        model_ko: '아뇨. 금요일에 쉬니까 28로 맞춰요. 색상 테마는 빼요.',
        distractors: [
          {
            text: "Yes, let's go for it. Thirty-four is close to thirty, and we can stretch.",
            text_ko: '네, 그대로 가요. 34는 30이랑 비슷하고, 좀 무리하면 돼요.',
            reaction: "Stretch with one person out? That's a lot.",
            reaction_ko: '한 명 빠지는데 무리한다고요? 그건 많아요.'
          },
          {
            text: "No. With you out Friday, let's aim for twenty-eight. The loading fix comes out.",
            text_ko: '아뇨. 금요일에 쉬니까 28로 맞춰요. 로딩 개선은 빼요.',
            reaction: 'The loading fix is the whole goal, though.',
            reaction_ko: '로딩 개선이 목표 전부잖아요.'
          },
          {
            text: "Yes. But if we don't finish, I'm the one who explains it to Maya, so please finish.",
            text_ko: '네. 근데 못 끝내면 마야한테 설명하는 건 저니까, 꼭 끝내 줘요.',
            reaction: "No pressure, huh? That's not a great way to start.",
            reaction_ko: '부담 주는 거 아니죠? 시작부터 그건 좀 아니에요.'
          }
        ],
        reply_line: 'Twenty-eight it is. That feels doable. Nice planning.',
        reply_ko: '28로 하죠. 할 만하겠어요. 계획 잘했어요.'
      }
    ]
  },
  {
    id: 'rt_planning_pr_2',
    title: 'A surprise request at planning',
    title_ko: '계획 회의에 날아든 요청',
    place: 'office_meeting',
    npc: 'derek',
    day_from: 16,
    day_to: null,
    time_from: '13:15',
    time_to: '14:15',
    summary: 'A new request from the client lands just as planning starts. Find out how big it is, make room by trading scope instead of adding it, and wrap up with a clear commitment.',
    summary_ko: '계획 회의가 시작되자마자 고객의 새 요청이 들어옵니다. 얼마나 큰지 알아보고, 더하는 대신 범위를 맞바꿔 자리를 만들고, 분명한 약속으로 마무리하세요.',
    sort: 2230,
    tags: 'meeting,planning,routine',
    turns: [
      {
        situation: 'Planning has just started. Derek pulls up an email from Greg Whitfield: Summit Retail wants a holiday sales report for all store managers by the end of this sprint. The sprint is already full at thirty points.',
        situation_ko: '계획 회의가 막 시작됐습니다. 데릭이 그렉 휫필드의 메일을 띄웁니다. 서밋 리테일이 이번 스프린트가 끝날 때까지 모든 매장 매니저용 연말 매출 보고서를 원합니다. 스프린트는 이미 30포인트로 꽉 찼습니다.',
        line: 'Greg sent this an hour ago. A holiday sales report, by the end of the sprint.',
        line_ko: '그렉이 한 시간 전에 보냈어요. 연말 매출 보고서요, 스프린트 끝까지.',
        prompt: 'Before deciding anything, find out how big the request really is.',
        prompt_ko: '무엇이든 정하기 전에, 요청이 실제로 얼마나 큰지 알아보세요.',
        model: 'Okay. Before I answer Greg, how big is it? Can you give me a rough size?',
        model_ko: '알겠어요. 그렉한테 답하기 전에, 얼마나 커요? 대략 크기 좀 알려 줄래요?',
        distractors: [
          {
            text: "Fine, add it. Greg's the client, so whatever he asks for goes in the sprint.",
            text_ko: '좋아요, 넣어요. 그렉이 고객이니까 요청하는 건 다 스프린트에 들어가요.',
            reaction: 'On top of thirty points? Something would break.',
            reaction_ko: '30포인트 위에요? 뭔가 터질 거예요.'
          },
          {
            text: "Ignore it for now. If it's really important, Greg will send another email.",
            text_ko: '일단 무시해요. 정말 중요하면 그렉이 메일을 또 보낼 거예요.',
            reaction: "Ignore the client? That won't end well.",
            reaction_ko: '고객을 무시한다고요? 끝이 안 좋을 거예요.'
          },
          {
            text: "Okay. Let's tell Greg yes right away, and figure out the size later.",
            text_ko: '알겠어요. 그렉한테 바로 된다고 하고, 크기는 나중에 알아봐요.',
            reaction: "Yes before we know the size? That's risky.",
            reaction_ko: '크기도 모르고 된다고요? 위험해요.'
          }
        ],
        reply_line: "About eight points. The data's already there. It's mostly the layout.",
        reply_ko: '8포인트쯤이요. 데이터는 이미 있어요. 대부분 화면 배치예요.'
      },
      {
        speaker: 'maya',
        situation: 'Eight points, and the sprint is full, so something has to give. The lowest story on the board is an admin settings page no store manager has asked for. A security patch also has to ship this sprint. Maya leans in.',
        situation_ko: '8포인트인데 스프린트가 꽉 찼으니 뭔가는 빠져야 합니다. 보드에서 가장 낮은 스토리는 어느 매장 매니저도 요청하지 않은 관리자 설정 페이지입니다. 보안 패치도 이번 스프린트에 꼭 나가야 합니다. 마야가 몸을 기울입니다.',
        line: "So what's the plan? We can't add eight points to a full sprint.",
        line_ko: '그래서 계획은요? 꽉 찬 스프린트에 8포인트를 더할 순 없어요.',
        prompt: 'Propose a trade that keeps the sprint the same size.',
        prompt_ko: '스프린트 크기를 그대로 두는 맞교환을 제안하세요.',
        model: 'We swap. The report goes in, and the admin settings page moves to next sprint.',
        model_ko: '맞바꿔요. 보고서를 넣고, 관리자 설정 페이지는 다음 스프린트로 옮겨요.',
        distractors: [
          {
            text: "We add it anyway. I'll ask everyone to put in a few extra hours this week.",
            text_ko: '그냥 넣어요. 이번 주에 다들 몇 시간씩 더 일해 달라고 할게요.',
            reaction: "Extra hours? Let's not make that a habit.",
            reaction_ko: '추가 근무요? 그게 습관이 되면 안 돼요.'
          },
          {
            text: 'We swap. The report goes in, and the security patch waits until next sprint.',
            text_ko: '맞바꿔요. 보고서를 넣고, 보안 패치는 다음 스프린트까지 기다려요.',
            reaction: "The patch can't wait. Pick something else.",
            reaction_ko: '패치는 못 기다려요. 다른 걸 골라요.'
          },
          {
            text: 'We tell Greg no. Holiday reports were never part of the deal anyway.',
            text_ko: '그렉한테 안 된다고 해요. 연말 보고서는 원래 계약에 없었어요.',
            reaction: "Let's not refuse a client over eight points we can make room for.",
            reaction_ko: '자리를 만들 수 있는 8포인트 때문에 고객을 거절하진 말아요.'
          }
        ],
        reply_line: 'Good trade. Let Greg know what moved, so there are no surprises.',
        reply_ko: '좋은 맞교환이에요. 뭐가 옮겨졌는지 그렉한테 알려 줘요. 놀라지 않게요.'
      },
      {
        situation: "The board is set: thirty points, the holiday report in, admin settings out. Planning is almost over, and you need the team's commitment before everyone goes back to their desks.",
        situation_ko: '보드가 정리됐습니다. 30포인트, 연말 보고서는 넣고, 관리자 설정은 뺐습니다. 회의가 거의 끝났고, 다들 자리로 돌아가기 전에 팀의 약속을 받아야 합니다.',
        line: 'Anything else before we wrap up?',
        line_ko: '마무리하기 전에 더 할 말 있어요?',
        prompt: 'Sum up what the team is committing to, and check that everyone agrees.',
        prompt_ko: '팀이 약속하는 내용을 정리하고, 모두 동의하는지 확인하세요.',
        model: 'Quick recap: thirty points, report in, settings out. Is everyone okay with that?',
        model_ko: '짧게 정리할게요. 30포인트, 보고서는 넣고, 설정은 빼요. 다들 괜찮아요?',
        distractors: [
          {
            text: 'Quick recap: thirty-eight points, report in, nothing out. Everyone okay?',
            text_ko: '짧게 정리할게요. 38포인트, 보고서는 넣고, 빼는 건 없어요. 다들 괜찮아요?',
            reaction: 'Thirty-eight? I thought we swapped something out.',
            reaction_ko: '38이요? 하나 맞바꾼 줄 알았는데요.'
          },
          {
            text: "Nope, that's it. Back to work, everyone, and don't let me down this time.",
            text_ko: '아뇨, 끝이에요. 다들 일하러 가요. 이번엔 실망시키지 말고요.',
            reaction: 'This time? Did we let you down last time?',
            reaction_ko: '이번엔요? 지난번엔 우리가 실망시켰어요?'
          },
          {
            text: 'Quick recap: thirty points, settings in, report out. Is everyone okay?',
            text_ko: '짧게 정리할게요. 30포인트, 설정은 넣고, 보고서는 빼요. 다들 괜찮아요?',
            reaction: "Wait, isn't it the other way around?",
            reaction_ko: '잠깐, 반대 아니에요?'
          }
        ],
        reply_line: "Works for me. I'll start on the report this afternoon.",
        reply_ko: '좋아요. 보고서는 오늘 오후부터 시작할게요.'
      }
    ]
  }
];

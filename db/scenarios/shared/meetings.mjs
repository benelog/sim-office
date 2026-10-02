// Meetings for more than one hero (hero all, or a list like jun,derek), after the missions: the retro, the all-hands
// and the developers' sprint planning. The routines in db/world/work.mjs take them in turn.

export const episodes = [
  {
    id: 'rt_planning_dev_1',
    title: 'Sprint planning: what fits',
    title_ko: '스프린트 계획: 들어갈 만큼만',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 16,
    day_to: null,
    time_from: '13:15',
    time_to: '14:15',
    summary: 'Every other week, Priya plans the next two weeks with the team. Estimate a story, speak up when the sprint gets too full, and flag a risk before you commit.',
    summary_ko: '2주마다 프리야가 팀과 다음 2주를 계획합니다. 스토리를 추정하고, 스프린트가 너무 차면 말하고, 약속하기 전에 위험 요소를 알리세요.',
    sort: 2200,
    tags: 'meeting,planning,routine',
    hero: 'jun,derek',
    turns: [
      {
        situation: 'Sprint planning. Priya shares the board on the big screen. First story: store managers want to export the weekly sales table as a CSV file. You built that table last sprint, so the work is small: one button and a download.',
        situation_ko: '스프린트 계획 회의입니다. 프리야가 큰 화면에 보드를 띄웁니다. 첫 스토리는 매장 매니저들이 주간 매출 표를 CSV 파일로 내려받고 싶어 한다는 것입니다. 그 표는 지난 스프린트에 당신이 만들었으니 일은 작습니다. 버튼 하나와 다운로드뿐이에요.',
        line: 'First up, the CSV export. How many points do we think?',
        line_ko: '첫 번째는 CSV 내보내기예요. 몇 포인트쯤 될까요?',
        prompt: 'Give your estimate, and say why you think it is small.',
        prompt_ko: '추정치를 말하고, 왜 작은 일이라고 보는지 설명하세요.',
        model: "I'd say two points. The table already exists, so it's mostly one button.",
        model_ko: '2포인트요. 표는 이미 있으니까 버튼 하나가 대부분이에요.',
        distractors: [
          {
            text: "I'd say thirteen points. We've never built that table, so it's a lot of work.",
            text_ko: '13포인트요. 그 표를 만든 적이 없으니까 일이 많아요.',
            reaction: 'Never built it? You shipped that table last sprint.',
            reaction_ko: '만든 적이 없다고요? 지난 스프린트에 그 표를 내놨잖아요.'
          },
          {
            text: "Whatever you think, Priya. Just put down any number, and we'll see.",
            text_ko: '프리야 생각대로 해요. 아무 숫자나 적어 두고 두고 봐요.',
            reaction: "Any number isn't an estimate. What's your gut?",
            reaction_ko: '아무 숫자는 추정이 아니에요. 감으로는 어때요?'
          },
          {
            text: "I'd say two days. I can finish it by Wednesday if nobody bugs me.",
            text_ko: '이틀이요. 아무도 안 건드리면 수요일까지 끝낼 수 있어요.',
            reaction: 'We estimate in points, not days. And nobody will bug you, promise.',
            reaction_ko: '우린 날짜가 아니라 포인트로 추정해요. 그리고 아무도 안 건드릴게요, 약속해요.'
          }
        ],
        reply_line: 'Two points it is. Next one.',
        reply_ko: '그럼 2포인트로 해요. 다음 거요.'
      },
      {
        situation: 'Priya keeps pulling stories into the sprint. Lately the team finishes about thirty points per sprint. The sprint now holds forty-five, including a login redesign nobody has looked at yet.',
        situation_ko: '프리야가 스프린트에 스토리를 계속 끌어옵니다. 요즘 팀은 스프린트마다 30포인트쯤 끝냅니다. 지금 스프린트에는 45포인트가 들어 있고, 아직 아무도 들여다보지 않은 로그인 화면 개편도 있습니다.',
        line: "And let's pull in the login redesign too. Greg would love to see that.",
        line_ko: '로그인 화면 개편도 넣어요. 그렉이 보면 좋아할 거예요.',
        prompt: 'You think this is more than the team can finish. Say so kindly, with the numbers.',
        prompt_ko: '팀이 끝낼 수 있는 양보다 많다고 생각합니다. 숫자를 들어 정중하게 말하세요.',
        model: 'That puts us at forty-five. We usually finish about thirty. What should drop?',
        model_ko: '그러면 45가 돼요. 우린 보통 30쯤 끝내요. 뭘 빼야 할까요?',
        distractors: [
          {
            text: 'Sure, add it. We can always work late at the end of the sprint to finish.',
            text_ko: '좋아요, 넣어요. 스프린트 막판에 야근하면 끝낼 수 있어요.',
            reaction: "Late nights aren't a plan. I'd rather be honest now.",
            reaction_ko: '야근은 계획이 아니에요. 지금 솔직한 게 나아요.'
          },
          {
            text: "That puts us at forty-five. We usually finish about fifty, so we're fine.",
            text_ko: '그러면 45가 돼요. 우린 보통 50쯤 끝내니까 괜찮아요.',
            reaction: 'Fifty? Our last few sprints were closer to thirty.',
            reaction_ko: '50이요? 최근 스프린트는 30에 가까웠어요.'
          },
          {
            text: 'No way. You do this every sprint, Priya. You always pile on too much.',
            text_ko: '말도 안 돼요. 프리야는 매번 이래요. 늘 너무 많이 넣어요.',
            reaction: 'Whoa. Okay. That felt a little personal.',
            reaction_ko: '와. 알겠어요. 좀 저를 겨냥한 말 같네요.'
          }
        ],
        reply_line: 'Fair. The login redesign stays in the backlog. That gets us to thirty-one.',
        reply_ko: '맞아요. 로그인 개편은 백로그에 남겨 둘게요. 그러면 31이에요.'
      },
      {
        speaker: 'maya',
        situation: "Maya sits in on planning today. One story left in the sprint, store alerts, needs a new API from Summit Retail's team, and they haven't delivered it yet.",
        situation_ko: '오늘은 마야도 계획 회의에 들어와 있습니다. 스프린트에 남은 스토리 하나인 매장 알림은 서밋 리테일 팀의 새 API가 필요한데, 그쪽에서 아직 주지 않았습니다.',
        line: 'Before we commit, any risks we should know about?',
        line_ko: '확정하기 전에, 우리가 알아야 할 위험 요소가 있나요?',
        prompt: 'Point out what could block you, and suggest a way to follow up.',
        prompt_ko: '당신의 일을 막을 수 있는 것을 짚고, 어떻게 챙길지 제안하세요.',
        model: "The store alerts need Summit's new API, and we don't have it. Can someone check with them?",
        model_ko: '매장 알림에 서밋의 새 API가 필요한데 아직 없어요. 누가 그쪽에 확인해 줄 수 있을까요?',
        distractors: [
          {
            text: "Nope, no risks. Everything this sprint is in our own hands, so we're fine.",
            text_ko: '아뇨, 위험 요소 없어요. 이번 스프린트는 다 우리 손에 달렸으니 괜찮아요.',
            reaction: 'No risks? What about the alerts story?',
            reaction_ko: '위험 요소가 없다고요? 알림 스토리는요?'
          },
          {
            text: "The store alerts need Summit's new API. If it's late, that's their fault, not ours.",
            text_ko: '매장 알림에 서밋의 새 API가 필요해요. 늦으면 그쪽 잘못이지 우리 잘못은 아니에요.',
            reaction: "Maybe, but blame won't get us the API. What can we do?",
            reaction_ko: '그럴 수도 있지만, 탓해서 API가 오진 않아요. 우리가 뭘 할 수 있죠?'
          },
          {
            text: "The login redesign worries me. It's big, and nobody has even looked at it.",
            text_ko: '로그인 개편이 걱정돼요. 크고, 아무도 들여다보지 않았어요.',
            reaction: 'The login redesign is out of this sprint, remember?',
            reaction_ko: '로그인 개편은 이번 스프린트에서 뺐잖아요, 기억나요?'
          }
        ],
        reply_line: "Good catch. Priya will ping their team today. Then we're committed.",
        reply_ko: '잘 짚었어요. 프리야가 오늘 그쪽 팀에 연락할 거예요. 그러면 확정이에요.'
      }
    ]
  },
  {
    id: 'rt_planning_dev_2',
    title: 'Splitting the big ticket',
    title_ko: '큰 티켓 쪼개기',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 16,
    day_to: null,
    time_from: '13:15',
    time_to: '14:15',
    summary: 'Priya brings a huge, vague ticket to sprint planning. Find out what done means, suggest splitting it, and be honest about how much you can take on.',
    summary_ko: '프리야가 크고 모호한 티켓을 스프린트 계획 회의에 가져왔습니다. 완료의 기준이 뭔지 알아내고, 쪼개자고 제안하고, 당신이 얼마나 맡을 수 있는지 솔직하게 말하세요.',
    sort: 2210,
    tags: 'meeting,planning,routine',
    hero: 'jun,derek',
    turns: [
      {
        situation: "Sprint planning. Priya's top story is \"Inventory page for all stores.\" It has a title and a mockup, but no acceptance criteria. Nobody knows what \"done\" means yet.",
        situation_ko: '스프린트 계획 회의입니다. 프리야의 맨 위 스토리는 "전 매장 재고 페이지"입니다. 제목과 목업은 있지만 인수 조건이 없습니다. "완료"가 무엇인지 아직 아무도 모릅니다.',
        line: "The inventory page. It's the big one Greg keeps asking about. Can we estimate it?",
        line_ko: '재고 페이지요. 그렉이 계속 묻는 큰 거예요. 추정할 수 있을까요?',
        prompt: "You can't size it yet. Explain what's missing before anyone can put a number on it.",
        prompt_ko: '아직은 크기를 잴 수 없습니다. 숫자를 매기기 전에 무엇이 빠졌는지 설명하세요.',
        model: 'Not yet. There are no acceptance criteria. What exactly counts as done here?',
        model_ko: '아직은요. 인수 조건이 없어요. 여기선 정확히 뭐가 완료인가요?',
        distractors: [
          {
            text: "Sure, let's call it five points. It's just one page. How hard can it be?",
            text_ko: '좋아요, 5포인트로 해요. 페이지 하나잖아요. 얼마나 어렵겠어요?',
            reaction: 'Famous last words. One page can hide a lot of work.',
            reaction_ko: '다들 그렇게 말하죠. 페이지 하나에 일이 많이 숨어 있을 수 있어요.'
          },
          {
            text: "Not yet. There's no mockup, so we don't know what the page looks like.",
            text_ko: '아직은요. 목업이 없으니까 페이지가 어떻게 생겼는지 몰라요.',
            reaction: "There's a mockup, though. It's attached right there.",
            reaction_ko: '목업은 있어요. 바로 거기 첨부돼 있어요.'
          },
          {
            text: "Not yet. Honestly, whoever wrote this ticket didn't think it through.",
            text_ko: '아직은요. 솔직히 이 티켓 쓴 사람이 생각을 덜 했네요.',
            reaction: 'Ouch. I wrote it. But okay, it is a little thin.',
            reaction_ko: '아야. 제가 썼어요. 그래도 좀 부실한 건 맞네요.'
          }
        ],
        reply_line: 'Fair. Done means managers see stock levels for every store, updated every hour.',
        reply_ko: '맞아요. 완료는 매니저들이 모든 매장의 재고를 보는 거예요. 매시간 갱신되고요.'
      },
      {
        situation: "Stock for every store, updated hourly. That's three parts: a new data feed, the page itself, and the hourly refresh. All together, it's far too big for one sprint.",
        situation_ko: '모든 매장의 재고, 매시간 갱신. 세 부분입니다. 새 데이터 피드, 페이지 자체, 매시간 갱신. 한꺼번에 하면 한 스프린트에 넣기엔 너무 큽니다.',
        line: 'So how do we fit this in? Greg wants it soon.',
        line_ko: '그럼 이걸 어떻게 넣죠? 그렉은 빨리 원해요.',
        prompt: 'Suggest a way to deliver it in smaller pieces, one at a time.',
        prompt_ko: '더 작은 조각으로 하나씩 내놓을 방법을 제안하세요.',
        model: "Let's split it in three: the data feed first, then the page, then the refresh.",
        model_ko: '셋으로 나눠요. 데이터 피드 먼저, 그다음 페이지, 그다음 갱신이요.',
        distractors: [
          {
            text: "Let's just do the whole thing this sprint. If we all push hard, we'll make it.",
            text_ko: '그냥 이번 스프린트에 다 해요. 다 같이 밀어붙이면 돼요.',
            reaction: "Push hard? That's how people burn out.",
            reaction_ko: '밀어붙인다고요? 그러다 다들 지쳐요.'
          },
          {
            text: "Let's split it in two: the web page now, and the mobile app version later.",
            text_ko: '둘로 나눠요. 웹 페이지는 지금, 모바일 앱 버전은 나중에요.',
            reaction: 'The app is a separate project. I mean this page.',
            reaction_ko: '앱은 별개 프로젝트예요. 저는 이 페이지 얘기예요.'
          },
          {
            text: "Tell Greg it can't be done. It's way too big, and we're busy already.",
            text_ko: '그렉한테 안 된다고 해요. 너무 크고 우린 이미 바빠요.',
            reaction: "Let's not refuse a client when we really mean not all at once.",
            reaction_ko: '한꺼번에는 안 된다는 걸 안 된다고 고객한테 말하진 말아요.'
          }
        ],
        reply_line: 'I like it. The data feed goes in this sprint. The rest comes next.',
        reply_ko: '좋아요. 데이터 피드는 이번 스프린트에 넣어요. 나머지는 다음에요.'
      },
      {
        situation: "The data feed is five points. You already have eight points this sprint, and you're interviewing backend candidates on two afternoons.",
        situation_ko: '데이터 피드는 5포인트입니다. 당신은 이번 스프린트에 이미 8포인트를 맡았고, 이틀 오후는 백엔드 지원자 면접이 있습니다.',
        line: 'Who wants to take the data feed?',
        line_ko: '데이터 피드는 누가 맡을래요?',
        prompt: 'Be honest about your own load before you volunteer.',
        prompt_ko: '자원하기 전에 당신이 맡은 양을 솔직하게 말하세요.',
        model: "I'm at eight points, plus two interview afternoons. I could pair on it, though.",
        model_ko: '저는 8포인트에 면접 오후가 이틀이에요. 그래도 같이 짝으로 할 순 있어요.',
        distractors: [
          {
            text: "I'll take it. I've got almost nothing on my plate this sprint anyway.",
            text_ko: '제가 할게요. 어차피 이번 스프린트엔 맡은 게 거의 없어요.',
            reaction: 'Nothing? I count eight points with your name on them.',
            reaction_ko: '거의 없다고요? 당신 이름이 붙은 게 8포인트인데요.'
          },
          {
            text: "I'll take it, plus anything else, and I'll still do all the interviews.",
            text_ko: '제가 할게요. 다른 것도 다 주세요. 면접도 다 할게요.',
            reaction: "That's a lot. I don't want you working weekends.",
            reaction_ko: '그건 너무 많아요. 주말에 일하는 건 싫어요.'
          },
          {
            text: 'Not me. Interviews eat my whole week. Someone else should do them.',
            text_ko: '전 빼 주세요. 면접이 일주일을 다 잡아먹어요. 다른 사람이 해야 해요.',
            reaction: 'We really need this hire. Those interviews matter.',
            reaction_ko: '이번 채용은 정말 중요해요. 그 면접도 중요해요.'
          }
        ],
        reply_line: "Thanks for being straight with me. I'll find who has room, and you can pair.",
        reply_ko: '솔직하게 말해 줘서 고마워요. 여유 있는 사람을 찾을 테니 짝으로 해 줘요.'
      }
    ]
  },
  {
    id: 'rt_retro_1',
    title: 'Retro: the checklist and the reviews',
    title_ko: '회고: 체크리스트와 코드 리뷰',
    place: 'office_meeting',
    npc: 'maya',
    day_from: 16,
    day_to: null,
    time_from: '14:45',
    time_to: '15:45',
    summary: 'Every other week, Maya runs the sprint retro. Name what went well, raise a problem without blaming anyone, and turn it into an action item you own.',
    summary_ko: '2주마다 마야가 스프린트 회고를 진행합니다. 잘된 것을 말하고, 누구도 탓하지 않고 문제를 꺼내고, 그것을 당신이 맡는 실행 항목으로 바꾸세요.',
    sort: 2300,
    tags: 'meeting,retro,routine',
    hero: 'all',
    turns: [
      {
        situation: "Sprint retro. Maya has drawn three columns on the whiteboard: Went well, To improve, Action items. This sprint's release went out with zero bugs, thanks to a new release checklist the team tried.",
        situation_ko: '스프린트 회고입니다. 마야가 화이트보드에 세 칸을 그렸습니다. 잘된 것, 개선할 것, 실행 항목. 이번 스프린트 배포는 팀이 새로 써 본 배포 체크리스트 덕분에 버그 없이 나갔습니다.',
        line: "Let's start on a good note. What went well this sprint?",
        line_ko: '좋은 얘기로 시작하죠. 이번 스프린트에 뭐가 잘됐어요?',
        prompt: 'Share a real win from this sprint and what made it work.',
        prompt_ko: '이번 스프린트의 진짜 성과와, 무엇 덕분이었는지 말하세요.',
        model: 'The release went out with zero bugs. I think the new checklist really helped.',
        model_ko: '배포가 버그 하나 없이 나갔어요. 새 체크리스트가 정말 도움이 된 것 같아요.',
        distractors: [
          {
            text: 'The release had a few bugs, but at least we fixed them pretty fast.',
            text_ko: '배포에 버그가 좀 있었지만, 그래도 꽤 빨리 고쳤어요.',
            reaction: 'A few bugs? I counted zero. Give us some credit.',
            reaction_ko: '버그가 좀 있었다고요? 전 하나도 못 셌는데요. 우리 좀 칭찬해요.'
          },
          {
            text: 'Honestly, nothing went well. This sprint was a mess from start to finish.',
            text_ko: '솔직히 잘된 건 없어요. 이번 스프린트는 처음부터 끝까지 엉망이었어요.',
            reaction: 'Nothing? We shipped with zero bugs!',
            reaction_ko: '하나도요? 버그 없이 배포했잖아요!'
          },
          {
            text: "The release went great, mostly because I double-checked everyone's work.",
            text_ko: '배포가 잘됐어요. 주로 제가 모두의 작업을 다시 확인한 덕분이에요.',
            reaction: "Hmm. It was a team effort, though, wasn't it?",
            reaction_ko: '흠. 그래도 다 같이 한 거잖아요, 그렇죠?'
          }
        ],
        reply_line: 'Agreed. The checklist stays. That goes under Went well.',
        reply_ko: '동의해요. 체크리스트는 계속 써요. 잘된 것 칸에 적을게요.'
      },
      {
        situation: 'On to To improve. This sprint, code reviews often sat for two or three days before anyone looked at them. It slowed everyone down, you included. In retros, the team talks about the process, not about people.',
        situation_ko: '개선할 것으로 넘어갑니다. 이번 스프린트에는 코드 리뷰가 누가 보기까지 이삼일씩 묵는 일이 잦았습니다. 당신을 포함해 모두가 느려졌습니다. 회고에서 팀은 사람이 아니라 과정을 얘기합니다.',
        line: 'Okay. What could we do better?',
        line_ko: '좋아요. 뭘 더 잘할 수 있을까요?',
        prompt: 'Bring up the slow reviews without pointing at anyone.',
        prompt_ko: '누구도 지목하지 않고 느린 리뷰 문제를 꺼내세요.',
        model: 'Reviews often waited two or three days. Could we agree on a time limit?',
        model_ko: '리뷰가 이삼일씩 기다리는 일이 많았어요. 기한을 정해 볼까요?',
        distractors: [
          {
            text: 'Some people take forever to review code. I think they know who they are.',
            text_ko: '어떤 사람들은 리뷰가 한없이 느려요. 본인들은 알 거예요.',
            reaction: "Let's keep it about the process, not people.",
            reaction_ko: '사람 말고 과정 얘기로 해요.'
          },
          {
            text: "Reviews were really fast this sprint. I don't have anything to improve.",
            text_ko: '이번 스프린트엔 리뷰가 정말 빨랐어요. 개선할 게 없어요.',
            reaction: 'Fast? Some reviews sat for three days.',
            reaction_ko: '빨랐다고요? 사흘씩 묵은 리뷰도 있었어요.'
          },
          {
            text: 'Reviews waited two or three days. Maybe we should skip them for small changes.',
            text_ko: '리뷰가 이삼일씩 기다렸어요. 작은 변경은 리뷰를 건너뛰면 어떨까요.',
            reaction: "Skipping reviews is how bugs sneak in. Let's speed them up instead.",
            reaction_ko: '리뷰를 건너뛰면 버그가 숨어들어요. 대신 빨리 하는 쪽으로 해요.'
          }
        ],
        reply_line: 'Good one. Slow reviews goes under To improve.',
        reply_ko: '좋아요. 느린 리뷰를 개선할 것 칸에 적을게요.'
      },
      {
        situation: "Under Action items, Maya wants every problem turned into a small, concrete step with one person's name on it. Nobody has offered to own the review problem yet.",
        situation_ko: '실행 항목 칸에서, 마야는 모든 문제를 작고 구체적인 단계로 바꾸고 한 사람의 이름을 붙이고 싶어 합니다. 리뷰 문제를 맡겠다는 사람은 아직 없습니다.',
        line: "So what's our action item for reviews? And who owns it?",
        line_ko: '그럼 리뷰에 대한 실행 항목은 뭘까요? 그리고 누가 맡죠?',
        prompt: 'Suggest a specific step, and offer to take it on yourself.',
        prompt_ko: '구체적인 단계를 제안하고, 직접 맡겠다고 하세요.',
        model: 'Reviews within one day. I can set up a daily reminder in our team chat.',
        model_ko: '리뷰는 하루 안에요. 팀 채팅에 매일 알림을 제가 설정할게요.',
        distractors: [
          {
            text: "Let's all just try to be better about reviews. It'll work itself out.",
            text_ko: '다들 리뷰를 좀 더 잘해 보기로 해요. 알아서 해결될 거예요.',
            reaction: 'Trying to be better is hard to check next time. Something concrete?',
            reaction_ko: '더 잘해 보자는 건 다음에 확인하기 어려워요. 구체적인 걸로요?'
          },
          {
            text: 'Reviews within one day. Maybe Sam could set up the reminder for us?',
            text_ko: '리뷰는 하루 안에요. 알림은 샘이 설정해 주면 어떨까요?',
            reaction: 'Sam helps with IT, not our reviews. Could you own it?',
            reaction_ko: '샘은 IT 담당이지 우리 리뷰 담당이 아니에요. 직접 맡아 줄래요?'
          },
          {
            text: 'Reviews within one hour, every time, no matter what else is going on.',
            text_ko: '리뷰는 무슨 일이 있어도 매번 한 시간 안에요.',
            reaction: "One hour, no matter what? That would wreck everyone's focus.",
            reaction_ko: '무슨 일이 있어도 한 시간이요? 다들 집중이 다 깨질 거예요.'
          }
        ],
        reply_line: 'Perfect. One-day reviews, and the reminder is yours. Thanks, everyone.',
        reply_ko: '완벽해요. 리뷰는 하루 안에, 알림은 당신 담당이에요. 다들 고마워요.'
      }
    ]
  },
  {
    id: 'rt_retro_2',
    title: 'Retro: shout-outs and late-night messages',
    title_ko: '회고: 감사 인사와 한밤의 메시지',
    place: 'office_meeting',
    npc: 'maya',
    day_from: 16,
    day_to: null,
    time_from: '14:45',
    time_to: '15:45',
    summary: 'Sam from IT joins this retro. Give him a specific thank-you, take his feedback well, and pick up the small action item that comes out of it.',
    summary_ko: '이번 회고에는 IT의 샘이 함께합니다. 그에게 구체적으로 고맙다고 하고, 그의 의견을 잘 받아들이고, 거기서 나온 작은 실행 항목을 맡으세요.',
    sort: 2310,
    tags: 'meeting,retro,routine',
    hero: 'all',
    turns: [
      {
        situation: 'Sprint retro. Maya always opens with shout-outs. This sprint, Sam from IT stayed late on Tuesday to fix the build server, so the team could release on time. Sam has joined the retro today.',
        situation_ko: '스프린트 회고입니다. 마야는 늘 감사 인사로 시작합니다. 이번 스프린트에 IT의 샘이 화요일에 늦게까지 남아 빌드 서버를 고쳐서, 팀이 제때 배포할 수 있었습니다. 오늘은 샘도 회고에 왔습니다.',
        line: "Let's start with shout-outs. Who wants to thank someone?",
        line_ko: '감사 인사부터 해요. 누구한테 고맙다고 할 사람?',
        prompt: 'Thank the right person, and be specific about what they did.',
        prompt_ko: '고마운 사람에게, 그가 한 일을 구체적으로 들어 고맙다고 하세요.',
        model: 'Shout-out to Sam for fixing the build server Tuesday night. We shipped on time thanks to him.',
        model_ko: '화요일 밤에 빌드 서버를 고쳐 준 샘에게 고마워요. 덕분에 제때 배포했어요.',
        distractors: [
          {
            text: 'Shout-out to Sam for the build server. It was down so long I almost gave up.',
            text_ko: '빌드 서버 고쳐 준 샘에게 고마워요. 너무 오래 죽어 있어서 포기할 뻔했어요.',
            reaction: "Let's keep the thank-you a thank-you, maybe?",
            reaction_ko: '감사 인사는 감사 인사로만 할까요?'
          },
          {
            text: 'Shout-out to Tom for fixing the build server Tuesday night. He saved our release.',
            text_ko: '화요일 밤에 빌드 서버를 고쳐 준 톰에게 고마워요. 우리 배포를 살렸어요.',
            reaction: 'Tom? I think Sam fixed that one.',
            reaction_ko: '톰이요? 그건 샘이 고친 것 같은데요.'
          },
          {
            text: 'Shout-out to the whole team. Everyone was great. You all know what you did.',
            text_ko: '팀 전체에 고마워요. 다들 훌륭했어요. 뭘 했는지 다들 알잖아요.',
            reaction: 'Nice, but who did what? Specific thanks mean more.',
            reaction_ko: '좋아요, 그런데 누가 뭘 했죠? 구체적인 감사가 더 와닿아요.'
          }
        ],
        reply_line: 'Love it. Sam, you really saved us that night.',
        reply_ko: '좋아요. 샘, 그날 밤 정말 우릴 살렸어요.'
      },
      {
        speaker: 'sam',
        situation: "Sam has a point to raise. Twice this sprint, someone messaged him about a laptop problem at ten at night instead of filing a help desk ticket. He doesn't say who, and Maya reminds everyone the retro is blameless.",
        situation_ko: '샘이 꺼낼 얘기가 있습니다. 이번 스프린트에 두 번, 누군가 헬프데스크 티켓을 내는 대신 밤 10시에 노트북 문제로 그에게 메시지를 보냈습니다. 그는 누군지 말하지 않고, 마야는 회고가 누구도 탓하지 않는 자리라고 다시 말합니다.',
        line: 'Can I add one? Late-night messages about laptops. Tickets work better for me.',
        line_ko: '하나 보태도 될까요? 밤늦게 오는 노트북 메시지요. 저한텐 티켓이 더 좋아요.',
        prompt: 'Accept his point, and suggest something that would help.',
        prompt_ko: '그의 말을 받아들이고, 도움이 될 만한 것을 제안하세요.',
        model: 'Fair point. Could we put the help desk link on our team page?',
        model_ko: '맞는 말이에요. 헬프데스크 링크를 팀 페이지에 올려 둘까요?',
        distractors: [
          {
            text: "Who was it? Just tell us, so we can make sure it doesn't happen again.",
            text_ko: '누구였어요? 말해 주면 다시는 안 그러게 할게요.',
            reaction: "It's not about who. It's about the habit.",
            reaction_ko: '누구 문제가 아니에요. 습관 문제예요.'
          },
          {
            text: 'Well, tickets take forever. Messaging you directly is just faster for us.',
            text_ko: '근데 티켓은 한참 걸려요. 직접 메시지 보내는 게 우리한텐 빨라요.',
            reaction: 'Tickets are faster than you think. I check them first.',
            reaction_ko: '티켓은 생각보다 빨라요. 전 티켓부터 봐요.'
          },
          {
            text: "That's fair. Maybe IT could stay online later, so you can answer them?",
            text_ko: '맞는 말이에요. IT가 더 늦게까지 접속해 있으면 답할 수 있지 않을까요?',
            reaction: "Stay online later? I'm one guy, friend.",
            reaction_ko: '더 늦게까지요? 저 혼자예요, 친구.'
          }
        ],
        reply_line: 'That would help a lot. Thanks for hearing me out.',
        reply_ko: '그거면 정말 도움이 돼요. 들어 줘서 고마워요.'
      },
      {
        situation: "Last step: every action item needs an owner. The help desk link is the only one without a name, and it's about a five-minute job.",
        situation_ko: '마지막 단계입니다. 실행 항목마다 맡을 사람이 있어야 합니다. 헬프데스크 링크만 이름이 없고, 5분이면 되는 일입니다.',
        line: 'Who can add the help desk link to the team page?',
        line_ko: '헬프데스크 링크를 팀 페이지에 누가 올려 줄래요?',
        prompt: 'Take the small task, and say when it will be done.',
        prompt_ko: '작은 일을 맡고, 언제까지 할지 말하세요.',
        model: "I'll do it. It's a quick job. It'll be up before I leave today.",
        model_ko: '제가 할게요. 금방 하는 일이에요. 오늘 퇴근 전에 올릴게요.',
        distractors: [
          {
            text: "I'll do it, but it's a big job. Give me until the end of next sprint.",
            text_ko: '제가 할게요. 근데 큰일이라 다음 스프린트 끝까지 시간을 주세요.',
            reaction: 'Next sprint? For one link?',
            reaction_ko: '다음 스프린트요? 링크 하나에요?'
          },
          {
            text: "Sam should do it. It's his help desk, so it's really his job, not ours.",
            text_ko: '샘이 해야죠. 그의 헬프데스크니까 우리 일이 아니라 그의 일이에요.',
            reaction: "He raised it. Let's help him out.",
            reaction_ko: '샘이 꺼낸 얘기잖아요. 우리가 도와줘요.'
          },
          {
            text: "I'll do it today, and I'll redesign the whole team page while I'm at it.",
            text_ko: '오늘 할게요. 하는 김에 팀 페이지 전체도 새로 디자인할게요.',
            reaction: "Let's keep it small. Just the link.",
            reaction_ko: '작게 가요. 링크만요.'
          }
        ],
        reply_line: "Thanks. That's everything. Good sprint, everyone.",
        reply_ko: '고마워요. 이걸로 끝이에요. 다들 수고했어요.'
      }
    ]
  },
  {
    id: 'rt_retro_3',
    title: 'Retro after a rough sprint',
    title_ko: '힘든 스프린트 뒤의 회고',
    place: 'office_meeting',
    npc: 'maya',
    day_from: 16,
    day_to: null,
    time_from: '14:45',
    time_to: '15:45',
    summary: "A hard sprint: two stories didn't make it. Be honest about how it felt, describe what went wrong without blaming anyone, and give Tom useful feedback about the room.",
    summary_ko: '힘든 스프린트였습니다. 스토리 두 개를 끝내지 못했어요. 어땠는지 솔직하게 말하고, 누구도 탓하지 않고 무엇이 잘못됐는지 설명하고, 톰에게 회의실에 대해 쓸모 있는 의견을 주세요.',
    sort: 2320,
    tags: 'meeting,retro,routine',
    hero: 'all',
    turns: [
      {
        situation: "A hard sprint. A late change from the client meant redoing the store map twice, and two stories didn't make it. Maya starts the retro with a quick mood check: one word each.",
        situation_ko: '힘든 스프린트였습니다. 고객의 막판 변경 때문에 매장 지도를 두 번 다시 만들었고, 스토리 두 개를 끝내지 못했습니다. 마야가 짧은 기분 점검으로 회고를 시작합니다. 한 사람당 한 단어씩요.',
        line: 'Before we dig in, one word for how this sprint felt.',
        line_ko: '본격적으로 하기 전에, 이번 스프린트가 어땠는지 한 단어로요.',
        prompt: 'Give an honest one-word feeling, and add one short reason.',
        prompt_ko: '솔직한 기분을 한 단어로 말하고, 짧은 이유를 하나 붙이세요.',
        model: 'Tired. Redoing the store map twice took a lot out of us.',
        model_ko: '지쳤어요. 매장 지도를 두 번 다시 만드느라 힘이 많이 빠졌어요.',
        distractors: [
          {
            text: 'Amazing. Everything went exactly the way we planned it on day one.',
            text_ko: '최고였어요. 첫날 계획한 그대로 다 됐어요.',
            reaction: 'Amazing? We missed two stories, though.',
            reaction_ko: '최고였다고요? 스토리 두 개를 놓쳤는데요.'
          },
          {
            text: 'Tired. Mostly because some people kept changing their minds all sprint.',
            text_ko: '지쳤어요. 주로 어떤 사람들이 스프린트 내내 마음을 바꿔서요.',
            reaction: "Let's not say some people. What happened, not who?",
            reaction_ko: '어떤 사람들이라는 말은 빼요. 누가 아니라 무슨 일이 있었죠?'
          },
          {
            text: 'Tired. Redoing the store map three times took a lot out of us.',
            text_ko: '지쳤어요. 매장 지도를 세 번 다시 만드느라 힘이 많이 빠졌어요.',
            reaction: 'Three? I counted two. But I get it.',
            reaction_ko: '세 번이요? 전 두 번으로 셌어요. 그래도 무슨 말인지 알아요.'
          }
        ],
        reply_line: "Thanks for being honest. Tired is fair. Let's see what we can learn.",
        reply_ko: '솔직하게 말해 줘서 고마워요. 지칠 만해요. 뭘 배울 수 있는지 봐요.'
      },
      {
        situation: 'The map change arrived in the middle of the sprint, and the team said yes without checking what else would slip. Nobody did anything wrong on purpose.',
        situation_ko: '지도 변경은 스프린트 한가운데 들어왔고, 팀은 다른 무엇이 밀릴지 확인하지 않고 받아들였습니다. 일부러 잘못한 사람은 아무도 없습니다.',
        line: 'So what happened with the map, and what would we do differently?',
        line_ko: '그래서 지도는 어떻게 된 거고, 다음엔 뭘 다르게 할까요?',
        prompt: 'Describe the cause without blaming anyone, and suggest a better way next time.',
        prompt_ko: '누구도 탓하지 않고 원인을 설명하고, 다음엔 어떻게 하면 좋을지 제안하세요.',
        model: "We took the change without trading anything out. Next time, let's swap something first.",
        model_ko: '아무것도 빼지 않고 변경을 받았어요. 다음엔 먼저 하나를 맞바꿔요.',
        distractors: [
          {
            text: 'The client keeps changing their mind. Maybe we should stop working with them.',
            text_ko: '고객이 계속 마음을 바꿔요. 그쪽이랑 일을 그만해야 할지도 몰라요.',
            reaction: "They're our biggest client. Let's look at what we control.",
            reaction_ko: '우리 최대 고객이에요. 우리가 바꿀 수 있는 걸 봐요.'
          },
          {
            text: 'Whoever said yes to that change made a mistake. They should have asked first.',
            text_ko: '그 변경을 받아들인 사람이 실수했어요. 먼저 물어봤어야죠.',
            reaction: "Let's not hunt for who. What about the process?",
            reaction_ko: '누군지 찾지 말아요. 과정은 어땠죠?'
          },
          {
            text: "We took the change without trading anything out. Next time, let's just work faster.",
            text_ko: '아무것도 빼지 않고 변경을 받았어요. 다음엔 그냥 더 빨리 일해요.',
            reaction: "Faster isn't really a plan, is it?",
            reaction_ko: '더 빨리는 계획이라고 하기 어렵죠?'
          }
        ],
        reply_line: "Exactly. A change mid-sprint needs a trade. I'll write that down.",
        reply_ko: '바로 그거예요. 스프린트 중간 변경에는 맞교환이 필요해요. 적어 둘게요.'
      },
      {
        speaker: 'tom',
        situation: 'Tom from the front desk pokes his head in. He looks after the meeting room equipment. Today the projector cut out twice during the retro.',
        situation_ko: '안내 데스크의 톰이 고개를 들이밉니다. 그는 회의실 장비를 관리합니다. 오늘 회고 중에 프로젝터가 두 번 꺼졌습니다.',
        line: 'Sorry to barge in. How was the room for you folks today?',
        line_ko: '불쑥 들어와서 미안해요. 오늘 회의실 어땠어요?',
        prompt: 'Mention the equipment problem politely, so he can fix it.',
        prompt_ko: '그가 고칠 수 있게 장비 문제를 정중하게 말하세요.',
        model: 'Mostly good. The projector cut out twice, though. Could you look at it?',
        model_ko: '대체로 좋았어요. 그런데 프로젝터가 두 번 꺼졌어요. 한번 봐 주실래요?',
        distractors: [
          {
            text: 'Terrible. That projector is junk. Why do we even keep it around?',
            text_ko: '최악이었어요. 저 프로젝터는 고물이에요. 왜 아직도 두는 거예요?',
            reaction: "Whoa. Okay, I'll look at it. No need to be harsh.",
            reaction_ko: '와. 알겠어요, 볼게요. 그렇게 심하게 말할 건 없잖아요.'
          },
          {
            text: 'Great, no problems at all! Thanks for setting up the room for us.',
            text_ko: '좋았어요, 아무 문제 없었어요! 회의실 준비해 줘서 고마워요.',
            reaction: 'Really? I heard the projector acted up.',
            reaction_ko: '정말요? 프로젝터가 말썽이었다고 들었는데요.'
          },
          {
            text: 'Mostly good. The projector cut out twice. Sam should fix it tonight.',
            text_ko: '대체로 좋았어요. 프로젝터가 두 번 꺼졌어요. 샘이 오늘 밤에 고쳐야 해요.',
            reaction: "Sam's swamped. The room is my department.",
            reaction_ko: '샘은 바빠요. 회의실은 제 담당이에요.'
          }
        ],
        reply_line: "Thanks for telling me. I'll swap the cable before Monday.",
        reply_ko: '말해 줘서 고마워요. 월요일 전에 케이블을 바꿔 둘게요.'
      }
    ]
  },
  {
    id: 'rt_allhands_1',
    title: 'All-hands: news and a profile check',
    title_ko: '전사 회의: 회사 소식과 인사 정보 점검',
    place: 'office_meeting',
    npc: 'maya',
    day_from: 16,
    day_to: null,
    time_from: '15:45',
    time_to: '16:45',
    summary: "The monthly company all-hands. Ask Maya a good question about the dashboard, be honest with Linda about your HR details, and make sure you understand Tom's kitchen rule.",
    summary_ko: '매달 열리는 전사 회의입니다. 마야에게 대시보드에 대해 좋은 질문을 하고, 인사 정보에 대해 린다에게 솔직하게 말하고, 톰이 말하는 탕비실 규칙을 제대로 알아들으세요.',
    sort: 2400,
    tags: 'meeting,all-hands,routine',
    hero: 'all',
    turns: [
      {
        situation: 'The first Thursday of the month: all-hands in the meeting room, with remote folks on the screen. Maya gives the engineering update: the store dashboard is live in the five pilot stores, and managers check it about twice a day. Then she opens the floor.',
        situation_ko: '매달 첫 목요일, 회의실에서 전사 회의가 열리고 원격 근무자들은 화면으로 들어와 있습니다. 마야가 엔지니어링 소식을 전합니다. 매장 대시보드가 시범 매장 다섯 곳에서 돌아가고 있고, 매니저들은 하루에 두 번쯤 확인합니다. 그리고 질문을 받습니다.',
        line: "That's the update. Questions? Don't be shy.",
        line_ko: '소식은 여기까지예요. 질문 있어요? 부끄러워하지 말고요.',
        prompt: 'Ask something useful about what comes next for the dashboard.',
        prompt_ko: '대시보드의 다음 단계에 대해 쓸모 있는 질문을 하세요.',
        model: 'Thanks, Maya. When do you expect it to reach the rest of the stores?',
        model_ko: '고마워요, 마야. 나머지 매장에는 언제쯤 들어갈 것 같아요?',
        distractors: [
          {
            text: 'Thanks, Maya. Why do the managers only check it once a week?',
            text_ko: '고마워요, 마야. 매니저들은 왜 일주일에 한 번만 확인해요?',
            reaction: "Once a week? It's about twice a day, actually.",
            reaction_ko: '일주일에 한 번이요? 사실 하루에 두 번쯤이에요.'
          },
          {
            text: 'Thanks. Is the parking garage going to be open this weekend?',
            text_ko: '고마워요. 이번 주말에 주차장 열어요?',
            reaction: 'Ha. Better ask Tom that one in a minute.',
            reaction_ko: '하하. 그건 이따가 톰한테 물어보세요.'
          },
          {
            text: "Thanks, Maya. Could you show each store's exact sales numbers right now?",
            text_ko: '고마워요, 마야. 매장별 정확한 매출 숫자를 지금 보여 줄 수 있어요?',
            reaction: "Those are Summit's numbers. I can't put them up here.",
            reaction_ko: '그건 서밋의 숫자예요. 여기 띄울 순 없어요.'
          }
        ],
        reply_line: 'Good question. We roll out store by store, and the mobile app starts in January.',
        reply_ko: '좋은 질문이에요. 매장별로 차례로 넓히고, 모바일 앱은 1월에 시작해요.'
      },
      {
        speaker: 'linda',
        situation: "Linda from HR takes the mic. She reminds everyone to keep their emergency contact and home address up to date in the HR portal. You haven't looked at yours since your first week.",
        situation_ko: '인사팀 린다가 마이크를 잡습니다. 인사 포털에 비상 연락처와 집 주소를 최신으로 유지해 달라고 다시 당부합니다. 당신은 입사 첫 주 이후로 한 번도 들여다보지 않았습니다.',
        line: 'Quick show of hands: who has checked their emergency contact lately?',
        line_ko: '손 한번 들어 볼까요? 최근에 비상 연락처 확인하신 분?',
        prompt: "Admit honestly that you haven't, and ask where in the portal you would do it.",
        prompt_ko: '확인하지 않았다고 솔직하게 말하고, 포털 어디에서 하면 되는지 물어보세요.',
        model: 'Not since my first week, honestly. Where in the portal do I update it?',
        model_ko: '솔직히 첫 주 이후로는 안 했어요. 포털 어디에서 고치면 돼요?',
        distractors: [
          {
            text: 'Yes, I updated mine this morning. Everything is already in there.',
            text_ko: '네, 오늘 아침에 고쳤어요. 이미 다 들어가 있어요.',
            reaction: "This morning? Then you can skip this part. But I don't think so.",
            reaction_ko: '오늘 아침이요? 그럼 이건 넘어가도 되겠네요. 그런데 아닌 것 같은데요.'
          },
          {
            text: 'Not yet. Could I just email you the details, and you put them in?',
            text_ko: '아직이요. 제가 메일로 보내면 대신 넣어 주실 수 있어요?',
            reaction: "Please don't email personal details. The portal is safer, and it takes a minute.",
            reaction_ko: '개인 정보는 메일로 보내지 말아 주세요. 포털이 더 안전하고, 1분이면 돼요.'
          },
          {
            text: 'Not yet. Does HR really need that? It feels a bit personal to share.',
            text_ko: '아직이요. 인사팀에 꼭 필요해요? 알려 주기엔 좀 사적인 것 같아요.',
            reaction: "It's only for emergencies. I hope we never need it, but we might.",
            reaction_ko: '비상시에만 써요. 쓸 일이 없길 바라지만, 혹시 모르잖아요.'
          }
        ],
        reply_line: "Thanks for being honest. It's under My Profile. Please do it by the end of next week.",
        reply_ko: '솔직하게 말해 줘서 고마워요. 내 프로필 메뉴에 있어요. 다음 주 말까지 해 주세요.'
      },
      {
        speaker: 'tom',
        situation: 'Tom has the last slide: office news. The kitchen fridge gets cleaned out every Friday at 5 p.m. You keep your lunch in that fridge.',
        situation_ko: '톰이 마지막 슬라이드를 맡았습니다. 사무실 소식입니다. 탕비실 냉장고는 매주 금요일 오후 5시에 비웁니다. 당신은 그 냉장고에 점심을 넣어 둡니다.',
        line: 'And please, folks, label your food. Anything left at five on Friday goes out.',
        line_ko: '그리고 여러분, 음식에 이름 좀 붙여 주세요. 금요일 5시에 남은 건 버려요.',
        prompt: 'Repeat the rule back to make sure you understood it.',
        prompt_ko: '제대로 알아들었는지 규칙을 다시 말해 확인하세요.',
        model: 'Just to check: anything still in the fridge at five on Friday gets thrown out?',
        model_ko: '확인차 여쭤요. 금요일 5시에 냉장고에 남은 건 버려지는 거죠?',
        distractors: [
          {
            text: 'Just to check: the fridge gets cleaned out every Monday morning, right?',
            text_ko: '확인차 여쭤요. 냉장고는 매주 월요일 아침에 비우는 거죠?',
            reaction: 'Fridays at five. Mondays would be a crime scene.',
            reaction_ko: '금요일 5시요. 월요일이면 끔찍한 꼴을 보게 될 거예요.'
          },
          {
            text: 'Do we really have to label everything? That sounds like a lot of work.',
            text_ko: '꼭 다 이름을 붙여야 해요? 일이 많아 보이는데요.',
            reaction: "A marker and two seconds. Trust me, it's worth it.",
            reaction_ko: '마커 하나에 2초면 돼요. 정말 그럴 만한 가치가 있어요.'
          },
          {
            text: "Just to check: we can leave food over the weekend if it's labeled, right?",
            text_ko: '확인차 여쭤요. 이름만 붙이면 주말 동안 둬도 되는 거죠?',
            reaction: 'Nope. Labeled or not, Friday at five it goes.',
            reaction_ko: '아뇨. 이름이 있든 없든 금요일 5시면 버려요.'
          }
        ],
        reply_line: 'You got it. Label it, or lose it. Thanks, everybody.',
        reply_ko: '맞아요. 이름 붙이거나, 잃거나. 다들 고마워요.'
      }
    ]
  },
  {
    id: 'rt_allhands_2',
    title: 'All-hands: launch news and the holiday party',
    title_ko: '전사 회의: 출시 소식과 연말 파티',
    place: 'office_meeting',
    npc: 'maya',
    day_from: 16,
    day_to: null,
    time_from: '15:45',
    time_to: '16:45',
    summary: "The monthly all-hands brings good news. Say a few words that credit the team, plan around Sam's laptop update, and ask Linda a fresh question about the holiday party.",
    summary_ko: '매달 열리는 전사 회의에 좋은 소식이 있습니다. 팀에 공을 돌리는 말을 몇 마디 하고, 샘의 노트북 업데이트에 맞춰 계획을 세우고, 린다에게 연말 파티에 대해 새로운 질문을 하세요.',
    sort: 2410,
    tags: 'meeting,all-hands,routine',
    hero: 'all',
    turns: [
      {
        situation: 'Monthly all-hands. Maya starts with good news: the store dashboard just went live in another group of Summit Retail stores, and their VP sent a thank-you note. The room claps. Maya turns to you.',
        situation_ko: '매달 열리는 전사 회의입니다. 마야가 좋은 소식으로 시작합니다. 매장 대시보드가 서밋 리테일의 다른 매장들에도 막 들어갔고, 그쪽 부사장이 감사 편지를 보냈습니다. 다들 박수를 칩니다. 마야가 당신을 돌아봅니다.',
        line: 'Want to say a few words about the launch?',
        line_ko: '출시에 대해 몇 마디 해 줄래요?',
        prompt: 'Say something short that gives the credit to the whole team.',
        prompt_ko: '팀 전체에 공을 돌리는 짧은 말을 하세요.',
        model: 'Sure. This was a team effort. Thanks to everyone who built, tested and shipped it.',
        model_ko: '네. 모두가 함께한 일이에요. 만들고, 테스트하고, 내놓은 모든 분께 고마워요.',
        distractors: [
          {
            text: 'Sure. Honestly, I did most of the hard parts, but the team helped a bit too.',
            text_ko: '네. 솔직히 어려운 부분은 제가 거의 했지만, 팀도 조금 도왔어요.',
            reaction: 'Uh, okay. I think a lot of people put work in.',
            reaction_ko: '어, 그래요. 많은 사람이 애쓴 것 같은데요.'
          },
          {
            text: "Sure. It went fine, I guess. Let's see if it actually holds up next week.",
            text_ko: '네. 그럭저럭 된 것 같아요. 다음 주에도 버티는지 봐야죠.',
            reaction: "That's a little gloomy for a celebration.",
            reaction_ko: '축하 자리치고 좀 우울하네요.'
          },
          {
            text: 'Sure. Huge thanks to Greg and his team. They built most of it for us.',
            text_ko: '네. 그렉과 그 팀에 정말 고마워요. 거의 다 그쪽이 만들어 줬어요.',
            reaction: "Greg's team? We built it. They're the client.",
            reaction_ko: '그렉 팀이요? 우리가 만들었어요. 그쪽은 고객이고요.'
          }
        ],
        reply_line: "Well said. Let's give the team another round of applause.",
        reply_ko: '좋은 말이에요. 팀에 한 번 더 박수 쳐 줘요.'
      },
      {
        speaker: 'sam',
        situation: 'Sam from IT has a slide: every laptop needs a security update by the end of the month. It takes about twenty minutes and restarts the computer. You have a client demo coming up.',
        situation_ko: 'IT의 샘이 슬라이드를 띄웁니다. 모든 노트북은 이달 말까지 보안 업데이트를 해야 합니다. 20분쯤 걸리고 컴퓨터가 다시 시작됩니다. 당신은 곧 고객 시연이 있습니다.',
        line: 'Questions about the laptop update? I know nobody loves a restart.',
        line_ko: '노트북 업데이트 질문 있어요? 다시 시작되는 거 다들 싫어하는 거 알아요.',
        prompt: 'Ask something that helps you plan around your demo.',
        prompt_ko: '시연 일정에 맞춰 계획하는 데 도움이 될 질문을 하세요.',
        model: "Can I run it after work, so it won't restart in the middle of my demo?",
        model_ko: '퇴근 후에 돌려도 돼요? 시연 도중에 다시 시작되지 않게요.',
        distractors: [
          {
            text: 'Do I have to? My laptop has worked fine without updates for years.',
            text_ko: '꼭 해야 해요? 제 노트북은 몇 년째 업데이트 없이도 잘 돌아요.',
            reaction: 'Years without updates? Please come see me.',
            reaction_ko: '몇 년째 업데이트를 안 했다고요? 꼭 저한테 와 주세요.'
          },
          {
            text: "Can I skip it until after the holidays? I'm pretty busy right now.",
            text_ko: '연휴 끝날 때까지 미뤄도 돼요? 지금 좀 바빠서요.',
            reaction: "End of the month, sorry. It's a security thing.",
            reaction_ko: '이달 말까지예요, 미안해요. 보안 문제라서요.'
          },
          {
            text: 'Can I run it right before my demo? It only takes about twenty seconds.',
            text_ko: '시연 바로 전에 돌려도 돼요? 20초면 되잖아요.',
            reaction: 'Twenty minutes, not seconds. Maybe not right before a demo.',
            reaction_ko: '20초가 아니라 20분이에요. 시연 바로 전엔 안 하는 게 좋겠어요.'
          }
        ],
        reply_line: "Totally. Start it before you leave, and it'll be done by morning.",
        reply_ko: '물론이죠. 퇴근 전에 시작해 두면 아침엔 끝나 있을 거예요.'
      },
      {
        speaker: 'linda',
        situation: 'Linda closes with the holiday party: a Friday evening at the Harbor Grill on Lake Avenue, starting at six. Partners and spouses are welcome, and RSVPs go through the online form.',
        situation_ko: '린다가 연말 파티 소식으로 마무리합니다. 금요일 저녁 6시, 레이크 애비뉴의 하버 그릴에서 열립니다. 애인과 배우자도 올 수 있고, 참석 여부는 온라인 양식으로 알립니다.',
        line: 'Any questions about the party?',
        line_ko: '파티에 대해 질문 있어요?',
        prompt: "You're not sure what to wear. Ask about it.",
        prompt_ko: '무엇을 입고 가야 할지 모르겠습니다. 물어보세요.',
        model: 'Sounds fun. Is there a dress code, or is it pretty casual?',
        model_ko: '재밌겠네요. 복장 규정이 있어요, 아니면 편하게 가도 돼요?',
        distractors: [
          {
            text: 'Sounds fun. Can we bring a partner, or is it just employees this year?',
            text_ko: '재밌겠네요. 애인을 데려가도 돼요, 아니면 올해는 직원만이에요?',
            reaction: 'Partners are welcome! I mentioned it a minute ago.',
            reaction_ko: '애인도 환영이에요! 방금 말씀드렸어요.'
          },
          {
            text: "Do I have to go? I'd honestly rather just have the evening off.",
            text_ko: '꼭 가야 해요? 솔직히 그냥 저녁에 쉬고 싶어요.',
            reaction: "It's not required. But we'd love to see you there.",
            reaction_ko: '의무는 아니에요. 그래도 와 주시면 정말 좋겠어요.'
          },
          {
            text: 'Sounds fun. Is it at lunchtime, so we can go back to work after?',
            text_ko: '재밌겠네요. 점심때예요? 끝나고 다시 일하러 가게요.',
            reaction: "It's in the evening, at six. No work after, I promise.",
            reaction_ko: '저녁 6시예요. 끝나고 일은 없어요, 약속해요.'
          }
        ],
        reply_line: 'Business casual. Leave the hoodies at home, please.',
        reply_ko: '비즈니스 캐주얼이요. 후드티는 집에 두고 오세요.'
      }
    ]
  }
];

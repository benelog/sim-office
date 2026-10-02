// Derek Alvarez's meetings that come back after the missions (routines in db/world/work.mjs take them in turn).

export const hero = 'derek';

export const episodes = [
  {
    id: 'rt_standup_dk_1',
    title: 'Standup: paged at night',
    title_ko: '스탠드업: 한밤의 호출',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: "You're on call, and a page woke you last night. Explain what happened, reassure Priya about the stores, and plan a realistic day.",
    summary_ko: '당신은 온콜이고, 어젯밤 호출에 잠이 깼습니다. 무슨 일이 있었는지 설명하고, 매장 걱정을 덜어 주고, 현실적인 하루 계획을 말하세요.',
    sort: 2010,
    tags: 'meeting,standup,routine',
    turns: [
      {
        situation: "Ten o'clock standup. You're on call this week. At two in the morning a page woke you: the nightly data import from Summit Retail had failed. You restarted it, and it finished by three. You don't know why it failed.",
        situation_ko: '10시 스탠드업입니다. 당신은 이번 주 온콜입니다. 새벽 2시에 호출이 와서 깼습니다. 서밋 리테일의 야간 데이터 가져오기가 실패했던 거죠. 다시 돌렸고 3시에 끝났습니다. 왜 실패했는지는 모릅니다.',
        line: 'Derek, you look tired. Rough night?',
        line_ko: '데릭, 피곤해 보여요. 힘든 밤이었어요?',
        prompt: 'Explain briefly what happened overnight.',
        prompt_ko: '밤사이 무슨 일이 있었는지 짧게 설명하세요.',
        model: 'I got paged at two. The nightly import failed, so I restarted it. It was done by three.',
        model_ko: '2시에 호출을 받았어요. 야간 가져오기가 실패해서 다시 돌렸어요. 3시에 끝났어요.',
        distractors: [
          {
            text: "I got paged at two. The nightly import failed, and it's still down right now.",
            text_ko: '2시에 호출을 받았어요. 야간 가져오기가 실패했고, 지금도 멈춰 있어요.',
            reaction: 'Still down? Should we tell the stores?',
            reaction_ko: '아직 멈춰 있다고요? 매장에 알려야 해요?'
          },
          {
            text: "Yeah. My neighbor's dog barked half the night, and then the pager went off too.",
            text_ko: '네. 옆집 개가 밤새 짖더니, 호출기까지 울리더라고요.',
            reaction: 'Oof. But what was the page about?',
            reaction_ko: '저런. 근데 호출은 무슨 일이었어요?'
          },
          {
            text: "I got paged at two. Jun's new code broke the nightly import, I'm pretty sure.",
            text_ko: '2시에 호출을 받았어요. 준의 새 코드가 야간 가져오기를 망가뜨린 것 같아요.',
            reaction: 'Do we know that yet?',
            reaction_ko: '그건 확실히 알아요?'
          }
        ],
        reply_line: 'Thanks for handling it. Did the stores see anything wrong?',
        reply_ko: '처리해 줘서 고마워요. 매장에서 이상한 걸 봤을까요?'
      },
      {
        situation: 'The stores open at nine, so the data was in place long before anyone looked. The cause is still a mystery.',
        situation_ko: '매장은 9시에 문을 여니, 누가 보기 훨씬 전에 데이터가 들어와 있었습니다. 원인은 아직 모릅니다.',
        line: 'Did the stores see anything wrong?',
        line_ko: '매장에서 이상한 걸 봤을까요?',
        prompt: "Reassure her about the stores, and be honest about what you still don't know.",
        prompt_ko: '매장은 괜찮다고 안심시키고, 아직 모르는 건 솔직하게 말하세요.',
        model: "No, it was done long before the stores opened. I still don't know why it failed.",
        model_ko: '아니요, 매장 문 열기 한참 전에 끝났어요. 왜 실패했는지는 아직 몰라요.',
        distractors: [
          {
            text: "No, they were fine. It was a one-time glitch, so it won't happen again.",
            text_ko: '아니요, 괜찮았어요. 한 번 있는 오류라 다시는 안 일어날 거예요.',
            reaction: "How can you be sure, if we don't know the cause?",
            reaction_ko: '원인도 모르는데 어떻게 확신해요?'
          },
          {
            text: "Yes, the stores opened to empty dashboards this morning. It wasn't great.",
            text_ko: '네, 오늘 아침 매장들이 빈 대시보드를 봤어요. 좋진 않았죠.',
            reaction: "Really? Nobody's called me about it.",
            reaction_ko: '정말요? 아무도 저한테 연락 안 했는데요.'
          },
          {
            text: "Not sure, honestly. I didn't check. I went straight back to sleep.",
            text_ko: '솔직히 잘 모르겠어요. 확인 안 했어요. 바로 다시 잤거든요.',
            reaction: 'Could you check after standup, then?',
            reaction_ko: '그럼 스탠드업 끝나고 확인해 줄래요?'
          }
        ],
        reply_line: 'Good. Will you dig into it today?',
        reply_ko: '다행이에요. 오늘 원인을 파 볼 거예요?'
      },
      {
        situation: "Today you also have Jun's pull request to review and a hiring panel interview at one for the backend developer job. Digging into the import would take a couple of hours.",
        situation_ko: '오늘은 준의 풀 리퀘스트 리뷰도 있고, 1시에 백엔드 개발자 채용 면접관도 맡았습니다. 가져오기 원인을 찾는 데는 두어 시간이 걸립니다.',
        line: 'Will you dig into it today?',
        line_ko: '오늘 원인을 파 볼 거예요?',
        prompt: 'Lay out your day realistically, keeping the investigation in it.',
        prompt_ko: '원인 조사를 빼지 말고, 오늘 하루를 현실적으로 정리하세요.',
        model: "This morning, yes. Then Jun's review, and I'm on the interview panel at one.",
        model_ko: '오전에 할게요. 그다음 준의 리뷰, 1시엔 면접에 들어가요.',
        distractors: [
          {
            text: "I'm interviewing at one today, so the import will have to wait until next week.",
            text_ko: '오늘 1시에 면접이 있어서, 가져오기는 다음 주까지 기다려야 해요.',
            reaction: 'Next week? It might fail again tonight.',
            reaction_ko: '다음 주요? 오늘 밤에 또 실패할 수도 있잖아요.'
          },
          {
            text: "Yes, all day. I'll skip the interview at one. It's not that important.",
            text_ko: '네, 하루 종일요. 1시 면접은 빠질게요. 그렇게 중요하진 않아요.',
            reaction: "Please don't. Linda's counting on you.",
            reaction_ko: '그러지 말아요. 린다가 당신만 믿고 있어요.'
          },
          {
            text: "This morning, yes. Then the interview at three, and Jun's review after.",
            text_ko: '오전에 할게요. 그다음 3시에 면접, 그 뒤에 준의 리뷰요.',
            reaction: 'Three? I have it at one on the calendar.',
            reaction_ko: '3시요? 달력엔 1시로 돼 있는데요.'
          }
        ],
        reply_line: 'Sounds like a plan. Shout if you need cover.',
        reply_ko: '좋은 계획이에요. 대신 맡아 줄 사람 필요하면 말해요.'
      }
    ]
  },
  {
    id: 'rt_standup_dk_2',
    title: 'Standup: the slow page',
    title_ko: '스탠드업: 느린 페이지',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: 'Pilot stores say a dashboard page is slow, and you found out why. Explain it in plain words, give a careful timeline, and bring Jun in.',
    summary_ko: '시범 매장들이 대시보드 페이지가 느리다고 하는데, 당신이 원인을 찾았습니다. 쉬운 말로 설명하고, 신중한 일정을 말하고, 준도 끌어들이세요.',
    sort: 2011,
    tags: 'meeting,standup,routine',
    turns: [
      {
        situation: "Ten o'clock standup. Pilot store managers say the weekly sales page takes about ten seconds to load. You found that one query reads the entire sales table every time. An index should fix it.",
        situation_ko: '10시 스탠드업입니다. 시범 매장 관리자들이 주간 매출 페이지가 뜨는 데 10초쯤 걸린다고 합니다. 당신은 쿼리 하나가 매번 매출 표 전체를 읽는다는 걸 찾았습니다. 인덱스를 걸면 고쳐질 겁니다.',
        line: 'Derek, any news on the slow page?',
        line_ko: '데릭, 느린 페이지는 뭐 알아냈어요?',
        prompt: 'Say what you found in words a non-engineer can follow.',
        prompt_ko: '엔지니어가 아닌 사람도 알아듣게 찾은 걸 말하세요.',
        model: 'Yes. One query reads the whole sales table every time. An index should fix it.',
        model_ko: '네. 쿼리 하나가 매번 매출 표 전체를 읽어요. 인덱스를 걸면 고쳐질 거예요.',
        distractors: [
          {
            text: "Yes. The stores' internet is just slow. There's not much we can do about it.",
            text_ko: '네. 매장 인터넷이 느린 거예요. 우리가 할 수 있는 게 별로 없어요.',
            reaction: "Their internet? I thought you'd found something in our code.",
            reaction_ko: '매장 인터넷요? 우리 코드에서 뭘 찾은 줄 알았는데요.'
          },
          {
            text: "Yes. The page loads in about a second now, so we're all good there.",
            text_ko: '네. 이제 1초 만에 떠요. 그쪽은 다 해결됐어요.',
            reaction: 'Really? A store manager said it was slow this morning.',
            reaction_ko: '정말요? 매장 관리자가 오늘 아침에도 느리다던데요.'
          },
          {
            text: "Yes. It's a sequential scan on the sales fact table, from a missing composite index.",
            text_ko: '네. 복합 인덱스가 없어서 매출 팩트 테이블을 순차 스캔해요.',
            reaction: 'Could you say that in plain English for me?',
            reaction_ko: '쉬운 말로 다시 해 줄래요?'
          }
        ],
        reply_line: 'Great find. Can we ship it today?',
        reply_ko: '잘 찾았어요. 오늘 내보낼 수 있어요?'
      },
      {
        situation: 'You want to test the index on staging today with a copy of real data. If it goes well, it can go to production tomorrow morning, before the stores open.',
        situation_ko: '오늘 실제 데이터 사본으로 스테이징에서 인덱스를 시험하고 싶습니다. 잘되면 내일 아침, 매장 문 열기 전에 운영 서버에 반영할 수 있습니다.',
        line: 'Can we ship it today?',
        line_ko: '오늘 내보낼 수 있어요?',
        prompt: 'Give a realistic timeline, without rushing it.',
        prompt_ko: '서두르지 말고 현실적인 일정을 말하세요.',
        model: "Let's test it on staging today. If it looks good, it ships tomorrow morning.",
        model_ko: '오늘 스테이징에서 시험해요. 괜찮으면 내일 아침에 내보내요.',
        distractors: [
          {
            text: "Sure. I'll push it straight to production right after standup, then.",
            text_ko: '그럼요. 스탠드업 끝나면 바로 운영 서버에 올릴게요.',
            reaction: 'Without testing? That makes me nervous.',
            reaction_ko: '시험도 안 하고요? 불안한데요.'
          },
          {
            text: "I'd rather test it on staging first. So maybe sometime next month?",
            text_ko: '먼저 스테이징에서 시험하고 싶어요. 그러니까 다음 달쯤요?',
            reaction: "Next month? It's one index, right?",
            reaction_ko: '다음 달요? 인덱스 하나잖아요.'
          },
          {
            text: "Sure, let's ship it today. If it breaks something, we'll just roll it back.",
            text_ko: '그럼요, 오늘 내보내요. 뭐가 망가지면 그냥 되돌리면 돼요.',
            reaction: "I'd rather not find out on the pilot stores.",
            reaction_ko: '시범 매장에서 알게 되는 건 싫은데요.'
          }
        ],
        reply_line: "Tomorrow morning works. I'll tell the store managers.",
        reply_ko: '내일 아침 좋아요. 매장 관리자들한테 알릴게요.'
      },
      {
        speaker: 'jun',
        situation: 'Jun has never worked on the database side. Pairing with him would teach him a lot. The details belong after standup.',
        situation_ko: '준은 데이터베이스 쪽 일을 해 본 적이 없습니다. 같이 하면 많이 배울 겁니다. 자세한 얘기는 스탠드업 뒤에 할 일입니다.',
        line: 'I can help test it on staging, if you want.',
        line_ko: '원하시면 스테이징 시험 제가 도울게요.',
        prompt: 'Take him up on the offer, and move the details out of the standup.',
        prompt_ko: '제안을 받아들이고, 자세한 얘기는 스탠드업 밖으로 미루세요.',
        model: "That'd be great. Let's pair on it right after standup.",
        model_ko: '좋죠. 스탠드업 끝나고 바로 같이 해요.',
        distractors: [
          {
            text: 'Great. So first, open the query planner and run an explain on the...',
            text_ko: '좋아요. 그럼 먼저 쿼리 플래너를 열고 explain을 돌려서...',
            reaction: 'Uh, maybe after standup?',
            reaction_ko: '어, 스탠드업 끝나고 할까요?'
          },
          {
            text: "Thanks, but it's faster if I just do it alone. Maybe next time.",
            text_ko: '고마워요, 근데 혼자 하는 게 빨라요. 다음에 해요.',
            reaction: 'Oh. Okay, sure. I just wanted to learn.',
            reaction_ko: '아. 네, 알겠어요. 배우고 싶었는데.'
          },
          {
            text: "Sure. You do the whole thing, and I'll check it next week.",
            text_ko: '그래요. 준이 다 하고, 제가 다음 주에 확인할게요.',
            reaction: 'Next week? I thought it shipped tomorrow.',
            reaction_ko: '다음 주요? 내일 내보내는 줄 알았는데요.'
          }
        ],
        reply_line: "Cool. I'll grab my laptop.",
        reply_ko: '좋아요. 노트북 가져올게요.'
      }
    ]
  },
  {
    id: 'rt_standup_dk_3',
    title: 'Standup: a library upgrade',
    title_ko: '스탠드업: 라이브러리 업그레이드',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: "The dashboard's chart library needs an upgrade for a security fix. Give your update, explain why the upgrade matters, and keep the details for later.",
    summary_ko: '대시보드의 차트 라이브러리를 보안 수정 때문에 업그레이드해야 합니다. 진행 상황을 말하고, 업그레이드가 왜 중요한지 설명하고, 자세한 건 나중으로 미루세요.',
    sort: 2012,
    tags: 'meeting,standup,routine',
    turns: [
      {
        situation: "Ten o'clock standup. Yesterday you reviewed two of Jun's pull requests and read the upgrade notes for the chart library. Today you plan to start the upgrade. Priya hasn't heard about it yet.",
        situation_ko: '10시 스탠드업입니다. 어제 당신은 준의 풀 리퀘스트 두 개를 리뷰하고 차트 라이브러리의 업그레이드 안내를 읽었습니다. 오늘은 업그레이드를 시작할 계획입니다. 프리야는 아직 모릅니다.',
        line: "Derek, what's on your plate?",
        line_ko: '데릭, 뭐 하고 있어요?',
        prompt: 'Give your yesterday and today, including the new piece of work.',
        prompt_ko: '새로 생긴 일을 포함해서 어제와 오늘을 말하세요.',
        model: "Yesterday I reviewed two of Jun's PRs. Today I'm starting the chart library upgrade.",
        model_ko: '어제 준의 PR 두 개를 리뷰했어요. 오늘은 차트 라이브러리 업그레이드를 시작해요.',
        distractors: [
          {
            text: "Yesterday I finished the chart library upgrade. Today I'll review Jun's two PRs.",
            text_ko: '어제 차트 라이브러리 업그레이드를 끝냈어요. 오늘은 준의 PR 두 개를 리뷰할게요.',
            reaction: "Finished? I didn't even know it had started.",
            reaction_ko: '끝냈다고요? 시작한 줄도 몰랐는데요.'
          },
          {
            text: "Yesterday I reviewed Jun's PRs. Honestly, there were a lot of mistakes in them.",
            text_ko: '어제 준의 PR을 리뷰했어요. 솔직히 실수가 많더라고요.',
            reaction: "Let's keep that between you and Jun.",
            reaction_ko: '그건 준이랑 둘이서 얘기해요.'
          },
          {
            text: 'Yesterday I reviewed a couple of PRs. Today, the usual stuff. Nothing special.',
            text_ko: '어제 PR 두어 개 리뷰했어요. 오늘은 늘 하던 거요. 별거 없어요.',
            reaction: 'Nothing special? Anything I should know about?',
            reaction_ko: '별거 없어요? 제가 알아야 할 건 없고요?'
          }
        ],
        reply_line: 'An upgrade? Is that urgent?',
        reply_ko: '업그레이드요? 급한 거예요?'
      },
      {
        situation: 'The new major version has a security fix. Some charts are set up differently in it, so you estimate about two days of work.',
        situation_ko: '새 메이저 버전에는 보안 수정이 들어 있습니다. 몇몇 차트는 설정 방식이 달라져서 이틀쯤 걸릴 것으로 봅니다.',
        line: 'Is that urgent?',
        line_ko: '급한 거예요?',
        prompt: 'Explain why it matters and how long it will take.',
        prompt_ko: '왜 중요한지, 얼마나 걸릴지 설명하세요.',
        model: 'It has a security fix. About two days of work, since some charts change.',
        model_ko: '보안 수정이 들어 있어요. 차트 몇 개가 바뀌어서 이틀쯤 걸려요.',
        distractors: [
          {
            text: 'Not urgent at all. I just like to keep things on the latest version.',
            text_ko: '전혀 급하지 않아요. 그냥 최신 버전을 쓰는 게 좋아서요.',
            reaction: 'Then why now, with everything else going on?',
            reaction_ko: '그럼 왜 하필 지금요, 다른 일도 많은데?'
          },
          {
            text: "The new version has a security fix. It's a five-minute change, really.",
            text_ko: '새 버전에 보안 수정이 있어요. 사실 5분이면 바꿔요.',
            reaction: 'Five minutes? For a whole new version?',
            reaction_ko: '5분요? 완전히 새 버전인데요?'
          },
          {
            text: "Very urgent. We should stop all other work until it's done.",
            text_ko: '아주 급해요. 끝날 때까지 다른 일은 다 멈춰야 해요.',
            reaction: "Stop everything? Let's not panic.",
            reaction_ko: '다 멈추자고요? 너무 놀라지 말아요.'
          }
        ],
        reply_line: 'Okay. Does it affect the rollout?',
        reply_ko: '알겠어요. 확대 적용에 영향이 있어요?'
      },
      {
        situation: "The rollout to the next group of stores is two weeks away. Two days of work leaves plenty of room, and you'll test it on staging first.",
        situation_ko: '다음 매장들에 확대 적용하는 건 2주 뒤입니다. 이틀 일이면 여유가 충분하고, 먼저 스테이징에서 시험할 겁니다.',
        line: 'Will it affect the rollout to the next stores?',
        line_ko: '다음 매장 확대 적용에 영향이 있어요?',
        prompt: 'Reassure her, and offer to go over the details later.',
        prompt_ko: '안심시키고, 자세한 건 나중에 설명하겠다고 하세요.',
        model: "No, there's plenty of time. I can walk you through the details after standup.",
        model_ko: '아니요, 시간은 충분해요. 자세한 건 스탠드업 끝나고 설명할게요.',
        distractors: [
          {
            text: "No, there's plenty of time. Let me go through every chart that changes right now.",
            text_ko: '아니요, 시간은 충분해요. 바뀌는 차트를 지금 하나하나 짚어 볼게요.',
            reaction: 'Maybe after standup? People are waiting.',
            reaction_ko: '스탠드업 끝나고 할까요? 다들 기다려요.'
          },
          {
            text: 'Probably, yes. We may have to push the rollout back a couple of weeks.',
            text_ko: '아마 그럴 거예요. 확대 적용을 2주쯤 미뤄야 할 수도 있어요.',
            reaction: 'Push it back? For two days of work?',
            reaction_ko: '미루자고요? 이틀짜리 일 때문에요?'
          },
          {
            text: 'No idea, honestly. The rollout is more your problem than mine.',
            text_ko: '솔직히 모르겠어요. 확대 적용은 제 문제라기보다 프리야 문제잖아요.',
            reaction: "Well, we're on the same team, Derek.",
            reaction_ko: '음, 우린 같은 팀이에요, 데릭.'
          }
        ],
        reply_line: 'Perfect. Put fifteen minutes on my calendar.',
        reply_ko: '좋아요. 제 달력에 15분 잡아 줘요.'
      }
    ]
  },
  {
    id: 'rt_standup_dk_4',
    title: 'Standup: staging is down',
    title_ko: '스탠드업: 스테이징이 멈췄다',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: "Staging has been down since last night, and your work can't be tested. Report the blocker fairly, say what you've done about it, and use the time well when Sam shows up.",
    summary_ko: '스테이징이 어젯밤부터 멈춰서 작업을 시험할 수 없습니다. 막힌 점을 공정하게 알리고, 무엇을 했는지 말하고, 샘이 나타나면 남는 시간을 잘 쓰세요.',
    sort: 2013,
    tags: 'meeting,standup,routine',
    turns: [
      {
        situation: "Ten o'clock standup. Yesterday you finished the store ID cleanup for the new stores. You wanted to test it on staging today, but staging has been down since last night: every deploy fails with an access error. Nobody knows the cause yet.",
        situation_ko: '10시 스탠드업입니다. 어제 당신은 새 매장들을 위한 매장 ID 정리를 끝냈습니다. 오늘 스테이징에서 시험하려 했는데, 스테이징이 어젯밤부터 멈춰 있습니다. 배포할 때마다 접근 오류가 납니다. 아직 원인은 아무도 모릅니다.',
        line: "Derek, you're up.",
        line_ko: '데릭, 차례예요.',
        prompt: "Give your update, and name what's in your way.",
        prompt_ko: '진행 상황을 말하고, 무엇이 가로막는지 말하세요.',
        model: "I finished the store ID cleanup yesterday. But I can't test it: staging's been down since last night.",
        model_ko: '어제 매장 ID 정리를 끝냈어요. 근데 시험을 못 해요. 스테이징이 어젯밤부터 멈췄거든요.',
        distractors: [
          {
            text: "I finished the store ID cleanup. I tested it on staging this morning, and it's all good.",
            text_ko: '매장 ID 정리를 끝냈어요. 오늘 아침 스테이징에서 시험했는데 다 괜찮아요.',
            reaction: 'This morning? I heard staging was down all night.',
            reaction_ko: '오늘 아침요? 스테이징이 밤새 멈춰 있었다던데요.'
          },
          {
            text: 'I finished the store ID cleanup. Staging is down again, because IT broke it again.',
            text_ko: '매장 ID 정리를 끝냈어요. 스테이징이 또 멈췄어요. IT가 또 망가뜨렸거든요.',
            reaction: "Do we know it was IT? Let's not guess.",
            reaction_ko: 'IT 때문인 건 확실해요? 짐작하지 말아요.'
          },
          {
            text: "I finished the store ID cleanup yesterday. No blockers. Everything's running smoothly.",
            text_ko: '어제 매장 ID 정리를 끝냈어요. 막힌 건 없어요. 다 잘 돌아가요.',
            reaction: 'Huh. Jun said staging was down.',
            reaction_ko: '어? 준은 스테이징이 멈췄다던데요.'
          }
        ],
        reply_line: 'Ugh. Has anyone told Sam?',
        reply_ko: '아이고. 샘한테는 누가 알렸어요?'
      },
      {
        situation: "Sam Reyes from the IT help desk looks after the staging server. Last night you filed a ticket with him. You haven't heard back.",
        situation_ko: 'IT 헬프데스크의 샘 레예스가 스테이징 서버를 관리합니다. 어젯밤 당신이 그에게 티켓을 올렸습니다. 아직 답이 없습니다.',
        line: 'Has anyone told Sam?',
        line_ko: '샘한테는 누가 알렸어요?',
        prompt: "Say what you've done, and where it stands.",
        prompt_ko: '무엇을 했는지, 지금 어떤 상황인지 말하세요.',
        model: 'I filed a ticket with Sam last night. No reply yet.',
        model_ko: '어젯밤에 샘한테 티켓을 올렸어요. 아직 답은 없어요.',
        distractors: [
          {
            text: 'Not yet. I figured someone else would get to it.',
            text_ko: '아직요. 다른 누가 하겠거니 했어요.',
            reaction: 'Hmm. Someone should, though.',
            reaction_ko: '음. 누군가는 알려야죠.'
          },
          {
            text: 'I filed a ticket last night. Sam never answers anything, though.',
            text_ko: '어젯밤에 티켓을 올렸어요. 근데 샘은 원래 답을 안 해요.',
            reaction: "Let's be fair. He covers the whole office.",
            reaction_ko: '공정하게 말해요. 샘이 사무실 전체를 맡고 있잖아요.'
          },
          {
            text: 'I filed a ticket last night, and Sam already fixed it.',
            text_ko: '어젯밤에 티켓을 올렸고, 샘이 벌써 고쳤어요.',
            reaction: "Fixed? Then why can't you test?",
            reaction_ko: '고쳤다고요? 그럼 왜 시험을 못 해요?'
          }
        ],
        reply_line: "Okay. Let's give him a little time.",
        reply_ko: '알겠어요. 조금만 기다려 봐요.'
      },
      {
        speaker: 'sam',
        situation: 'Sam leans in at the meeting room door with his laptop. Meanwhile, Jun has a pull request waiting for your review.',
        situation_ko: '샘이 노트북을 들고 회의실 문으로 고개를 내밉니다. 마침 준의 풀 리퀘스트가 당신의 리뷰를 기다리고 있습니다.',
        line: "Sorry to barge in. The staging certificate expired last night. I'm renewing it now. About thirty minutes.",
        line_ko: '불쑥 들어와서 미안해요. 스테이징 인증서가 어젯밤 만료됐어요. 지금 갱신하고 있어요. 30분쯤 걸려요.',
        prompt: "Thank him, and say how you'll use the wait.",
        prompt_ko: '고맙다고 하고, 기다리는 동안 무엇을 할지 말하세요.',
        model: "Thanks, Sam. I'll review Jun's PR in the meantime.",
        model_ko: '고마워요, 샘. 그동안 준의 PR을 리뷰할게요.',
        distractors: [
          {
            text: "Thirty minutes? Can't you make it faster? We're all blocked.",
            text_ko: '30분요? 더 빨리 안 돼요? 다들 막혀 있어요.',
            reaction: "I'm going as fast as I can, man.",
            reaction_ko: '최대한 빨리 하는 중이에요.'
          },
          {
            text: 'Thanks, Sam. Can we set up auto-renewal right now, together?',
            text_ko: '고마워요, 샘. 지금 같이 자동 갱신을 설정할까요?',
            reaction: 'Happy to. After your standup, though?',
            reaction_ko: '좋죠. 근데 스탠드업 끝나고 해요.'
          },
          {
            text: "Thanks, Sam. I'll just deploy to production in the meantime.",
            text_ko: '고마워요, 샘. 그동안 그냥 운영 서버에 배포할게요.',
            reaction: "Whoa. Please don't do that.",
            reaction_ko: '워. 제발 그러지 마요.'
          }
        ],
        reply_line: "Cool. I'll ping you when it's back.",
        reply_ko: '좋아요. 다시 되면 메시지 보낼게요.'
      }
    ]
  },
  {
    id: 'rt_standup_dk_5',
    title: 'Standup: after an interview',
    title_ko: '스탠드업: 면접 다음 날',
    place: 'office_meeting',
    npc: 'priya',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: 'You sat on a hiring panel yesterday. Give your update without sharing what you think of the candidate, and say yes to another panel with an honest heads-up.',
    summary_ko: '어제 채용 면접관으로 들어갔습니다. 지원자에 대한 생각은 말하지 말고 진행 상황을 전하고, 면접 하나를 더 맡되 솔직하게 미리 알려 주세요.',
    sort: 2014,
    tags: 'meeting,standup,routine',
    turns: [
      {
        situation: "Ten o'clock standup. The team is interviewing for one more backend developer. Yesterday you fixed a bug in the older gift card refund code and sat on an interview panel. Today you'll write your interview feedback and pair with Jun.",
        situation_ko: '10시 스탠드업입니다. 팀은 백엔드 개발자 한 명을 더 뽑는 중입니다. 어제 당신은 예전 기프트 카드 환불 코드의 버그를 고치고 면접관으로 들어갔습니다. 오늘은 면접 평가를 쓰고 준과 짝 프로그래밍을 합니다.',
        line: "Derek, what's new?",
        line_ko: '데릭, 새로운 거 있어요?',
        prompt: 'Give your yesterday and today.',
        prompt_ko: '어제와 오늘을 말하세요.',
        model: 'Yesterday, a gift card refund bug and an interview. Today, my feedback and pairing with Jun.',
        model_ko: '어제는 기프트 카드 환불 버그랑 면접이요. 오늘은 평가 쓰고 준이랑 같이 코딩해요.',
        distractors: [
          {
            text: 'Yesterday I sat on an interview panel. The candidate was pretty weak, to be honest with you.',
            text_ko: '어제 면접에 들어갔어요. 솔직히 지원자가 좀 약했어요.',
            reaction: 'Maybe save that for the feedback form.',
            reaction_ko: '그건 평가서에 쓰는 게 좋겠어요.'
          },
          {
            text: "Yesterday I fixed a gift card refund bug. Today I'm on the interview panel, then feedback.",
            text_ko: '어제 기프트 카드 환불 버그를 고쳤어요. 오늘은 면접에 들어가고, 그다음 평가를 써요.',
            reaction: 'Today? I thought the interview was yesterday.',
            reaction_ko: '오늘요? 면접은 어제인 줄 알았는데요.'
          },
          {
            text: "Yesterday I fixed the refund bug. Today I'm just catching up on things. Nothing planned.",
            text_ko: '어제 환불 버그를 고쳤어요. 오늘은 밀린 일만 해요. 계획은 없어요.',
            reaction: "Nothing? Weren't you pairing with Jun?",
            reaction_ko: '없다고요? 준이랑 같이 하기로 하지 않았어요?'
          }
        ],
        reply_line: 'Thanks, Derek.',
        reply_ko: '고마워요, 데릭.'
      },
      {
        speaker: 'jun',
        situation: 'Linda in HR asked panelists to keep their opinions for the written feedback and the debrief, not for team chats.',
        situation_ko: '인사팀의 린다는 면접관들에게 의견은 팀 잡담이 아니라 서면 평가와 평가 회의에서만 말해 달라고 했습니다.',
        line: 'Oh, how was the candidate? Did you like them?',
        line_ko: '아, 지원자는 어땠어요? 마음에 들었어요?',
        prompt: 'Kindly decline to talk about the candidate here.',
        prompt_ko: '여기서는 지원자 얘기를 하지 않겠다고 좋게 거절하세요.',
        model: "I'll save that for the debrief. Linda wants our feedback in writing first.",
        model_ko: '그건 평가 회의 때 말할게요. 린다가 먼저 서면으로 내 달래요.',
        distractors: [
          {
            text: "Strong backend skills, but I'm a little worried about the team fit, honestly.",
            text_ko: '백엔드 실력은 좋은데, 솔직히 팀이랑 잘 맞을지 좀 걱정돼요.',
            reaction: 'Oh. Should you be telling me that?',
            reaction_ko: '아. 그거 저한테 말해도 돼요?'
          },
          {
            text: "None of your business, Jun. That's for the people on the panel.",
            text_ko: '준이 알 일이 아니에요. 그건 면접관들 일이에요.',
            reaction: 'Whoa. Sorry I asked.',
            reaction_ko: '워. 괜히 물어봤네요.'
          },
          {
            text: 'Ask Maya. She was on the panel too, so she can fill you in.',
            text_ko: '마야한테 물어봐요. 마야도 면접관이었으니 알려 줄 거예요.',
            reaction: 'Really? Is she allowed to tell me?',
            reaction_ko: '정말요? 마야는 말해도 되는 거예요?'
          }
        ],
        reply_line: 'Makes sense. Sorry, I was just curious.',
        reply_ko: '그렇겠네요. 미안해요, 그냥 궁금해서요.'
      },
      {
        situation: "Next Tuesday at two your calendar is free, but you're on call all next week and could get paged at any time.",
        situation_ko: '다음 주 화요일 2시에는 일정이 비어 있지만, 다음 주 내내 온콜이라 언제든 호출이 올 수 있습니다.',
        line: 'Speaking of hiring, Linda asked if you could do another panel next Tuesday at two.',
        line_ko: '채용 얘기가 나와서 말인데, 린다가 다음 주 화요일 2시 면접도 맡아 줄 수 있냐고 물었어요.',
        prompt: 'Agree, but mention the one thing that could get in the way.',
        prompt_ko: '그러겠다고 하되, 방해가 될 수 있는 한 가지를 말하세요.',
        model: "Sure, Tuesday at two works. Just so you know, I'm on call that week.",
        model_ko: '좋아요, 화요일 2시 괜찮아요. 참고로 그 주에 제가 온콜이에요.',
        distractors: [
          {
            text: 'Sure, Tuesday at two works. My whole week is totally clear, so no problem.',
            text_ko: '좋아요, 화요일 2시 괜찮아요. 그 주는 완전히 비어 있어서 문제없어요.',
            reaction: "Aren't you on call next week?",
            reaction_ko: '다음 주 온콜 아니에요?'
          },
          {
            text: 'No, I already did one this month. Ask someone else this time.',
            text_ko: '아니요, 저는 이번 달에 벌써 한 번 했어요. 이번엔 다른 사람한테 부탁해요.',
            reaction: 'Hmm. We all have to pitch in, Derek.',
            reaction_ko: '음. 다들 조금씩 거들어야죠, 데릭.'
          },
          {
            text: 'Sure. Can we go over the interview questions now, really quickly?',
            text_ko: '좋아요. 지금 면접 질문 좀 빨리 같이 볼까요?',
            reaction: "After standup, please. We're almost done.",
            reaction_ko: '스탠드업 끝나고요. 거의 다 끝났어요.'
          }
        ],
        reply_line: "Good to know. I'll ask Linda to line up a backup.",
        reply_ko: '알아 둘게요. 린다한테 대타도 구해 두라고 할게요.'
      }
    ]
  },
  {
    id: 'rt_video_dk_1',
    title: 'Video standup: the doorbell',
    title_ko: '화상 스탠드업: 초인종',
    place: 'derek_desk',
    npc: 'priya',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: "The doorbell rings just as it's your turn. Keep your update calm and short, tell Jun where his data is, and let the team know when you'll be away this week.",
    summary_ko: '당신 차례가 되자마자 초인종이 울립니다. 침착하고 짧게 소식을 전하고, 준에게 데이터가 어디 있는지 알려 주고, 이번 주에 자리를 비우는 때를 팀에 알리세요.',
    sort: 2061,
    tags: 'meeting,standup,routine,video',
    turns: [
      {
        situation: "Ten o'clock standup on video. The doorbell rings just as Priya calls your name: a delivery. Yesterday you finished the store ID cleanup; today you're testing it on staging.",
        situation_ko: '화상으로 하는 10시 스탠드업입니다. 프리야가 당신 이름을 부르는 순간 초인종이 울립니다. 택배입니다. 어제는 매장 ID 정리를 끝냈고, 오늘은 스테이징에서 테스트합니다.',
        line: "Derek? Oh, sounds like someone's at your door.",
        line_ko: '데릭? 아, 누가 문 앞에 왔나 봐요.',
        prompt: 'Excuse the interruption in a few words, then give your update.',
        prompt_ko: '끊긴 건 짧게 사과하고, 오늘 소식을 전하세요.',
        model: "Sorry, just a delivery. Yesterday I finished the store ID cleanup. Today I'm testing it on staging.",
        model_ko: '미안해요, 택배예요. 어제 매장 ID 정리를 끝냈고, 오늘은 스테이징에서 테스트해요.',
        distractors: [
          {
            text: 'Sorry, just a delivery. Yesterday I finished the store ID cleanup. Today it goes straight to production.',
            text_ko: '미안해요, 택배예요. 어제 매장 ID 정리를 끝냈고, 오늘 바로 운영에 올려요.',
            reaction: "Production? Didn't you want staging first?",
            reaction_ko: '운영에요? 스테이징부터 하려던 거 아니었어요?'
          },
          {
            text: "Sorry, just a delivery. Yesterday I started the store ID cleanup. Today I'm finishing it.",
            text_ko: '미안해요, 택배예요. 어제 매장 ID 정리를 시작했고, 오늘 끝낼 거예요.',
            reaction: 'Started? I thought it was done.',
            reaction_ko: '시작했다고요? 끝난 줄 알았는데요.'
          },
          {
            text: "Sorry, it's chaos here today. Can someone else go first while I deal with it?",
            text_ko: '미안해요, 오늘 여기 정신없네요. 제가 처리하는 동안 다른 사람이 먼저 해 줄래요?',
            reaction: "Sure, but it's only a delivery. Can you do it quickly?",
            reaction_ko: '그래도 되지만, 택배일 뿐이잖아요. 빨리 할 수 있어요?'
          }
        ],
        reply_line: 'Thanks, Derek.',
        reply_ko: '고마워요, 데릭.'
      },
      {
        speaker: 'jun',
        situation: 'Jun asked you for test data for two stores. You pulled it this morning and put it in the team folder.',
        situation_ko: '준이 매장 두 곳의 테스트 데이터를 부탁했습니다. 오늘 아침에 뽑아서 팀 폴더에 넣어 두었습니다.',
        line: 'Derek, did you get a chance to pull that test data?',
        line_ko: '데릭, 그 테스트 데이터 뽑아 볼 시간 있었어요?',
        prompt: "Tell him it's done and where to find it.",
        prompt_ko: '다 했다고, 어디서 찾으면 되는지 알려 주세요.',
        model: "Yes, I pulled it this morning. It's in the team folder, under Test Data.",
        model_ko: '네, 오늘 아침에 뽑았어요. 팀 폴더의 Test Data 안에 있어요.',
        distractors: [
          {
            text: "Not yet, sorry. I'll get to it this afternoon.",
            text_ko: '아직요, 미안해요. 오후에 할게요.',
            reaction: 'Oh. Sam said you did it this morning.',
            reaction_ko: '아. 샘은 오늘 아침에 했다고 하던데요.'
          },
          {
            text: 'Yes, I emailed it to Sam this morning. He can forward it to you.',
            text_ko: '네, 오늘 아침에 샘한테 메일로 보냈어요. 샘이 전달해 줄 거예요.',
            reaction: "To Sam? I don't think he has it.",
            reaction_ko: '샘한테요? 샘한테는 없는 것 같은데요.'
          },
          {
            text: 'Yes, but you should really learn to pull your own data by now.',
            text_ko: '네, 근데 이제는 데이터 정도는 직접 뽑을 줄 알아야죠.',
            reaction: 'Okay... could you show me how sometime?',
            reaction_ko: '네... 언제 방법 좀 알려 줄 수 있어요?'
          }
        ],
        reply_line: 'Found it. Thanks!',
        reply_ko: '찾았어요. 고마워요!'
      },
      {
        situation: "Your on-call week starts tonight. You'll be home with your laptop all week, but you have a dentist appointment at two on Wednesday.",
        situation_ko: '오늘 밤부터 온콜 주간입니다. 일주일 내내 노트북을 끼고 집에 있겠지만, 수요일 2시에 치과 예약이 있습니다.',
        line: 'Anything the team should know this week?',
        line_ko: '이번 주에 팀이 알아야 할 게 있어요?',
        prompt: "Mention the on-call week and the hour you'll be away.",
        prompt_ko: '온콜 주간이라는 것과 자리를 비우는 한 시간을 알리세요.',
        model: "I'm on call from tonight. And Wednesday at two, I'm at the dentist for an hour.",
        model_ko: '오늘 밤부터 온콜이에요. 그리고 수요일 2시에 한 시간 동안 치과에 가요.',
        distractors: [
          {
            text: "I'm on call from tonight. And Thursday at two, I'm at the dentist for an hour.",
            text_ko: '오늘 밤부터 온콜이에요. 그리고 목요일 2시에 한 시간 동안 치과에 가요.',
            reaction: 'Thursday? Your calendar says Wednesday.',
            reaction_ko: '목요일이요? 달력에는 수요일로 되어 있는데요.'
          },
          {
            text: "I'm on call this week, so please don't put any meetings on my calendar.",
            text_ko: '이번 주는 온콜이니까 제 일정에는 회의를 넣지 말아 주세요.',
            reaction: "On call doesn't mean no meetings, Derek.",
            reaction_ko: '온콜이라고 회의가 없는 건 아니에요, 데릭.'
          },
          {
            text: "Nothing much. Oh, and I'll be out all day Wednesday for the dentist.",
            text_ko: '별거 없어요. 아, 수요일은 치과 때문에 하루 종일 없어요.',
            reaction: 'All day? For the dentist?',
            reaction_ko: '하루 종일이요? 치과 때문에요?'
          }
        ],
        reply_line: "Thanks. I'll put it on the team calendar.",
        reply_ko: '고마워요. 팀 달력에 넣어 둘게요.'
      }
    ]
  },
  {
    id: 'rt_video_dk_2',
    title: 'Video standup: a frozen screen',
    title_ko: '화상 스탠드업: 멈춘 화면',
    place: 'derek_desk',
    npc: 'priya',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: "Jun's connection breaks up in the middle of his update. Help him get it across, point him to a bug you know, and tell the team when you'll be offline.",
    summary_ko: '준의 연결이 소식 도중에 끊깁니다. 그가 말을 전하도록 돕고, 아는 버그를 알려 주고, 언제 오프라인인지 팀에 알리세요.',
    sort: 2062,
    tags: 'meeting,standup,routine,video',
    turns: [
      {
        situation: "Ten o'clock standup on video. Jun is reporting a bug, but his picture froze a minute ago and his voice keeps cutting out.",
        situation_ko: '화상으로 하는 10시 스탠드업입니다. 준이 버그를 보고하고 있는데, 1분 전부터 화면이 멈췄고 목소리가 자꾸 끊깁니다.',
        line: 'Jun? I think we lost you.',
        line_ko: '준? 연결이 끊긴 것 같아요.',
        prompt: "Help out: tell Jun he's breaking up, and suggest a way around it.",
        prompt_ko: '도와주세요. 준에게 끊긴다고 알려 주고, 다른 방법을 제안하세요.',
        model: "Jun, you're breaking up. Could you type it in the chat?",
        model_ko: '준, 소리가 끊겨요. 채팅에 적어 줄래요?',
        distractors: [
          {
            text: "Jun, you're frozen. Let's just skip you today.",
            text_ko: '준, 화면이 멈췄어요. 오늘은 그냥 건너뛰죠.',
            reaction: "Let's not skip him. He has a bug to report.",
            reaction_ko: '건너뛰진 말아요. 버그를 보고하던 중이에요.'
          },
          {
            text: 'Jun, we can hear you fine. Keep going.',
            text_ko: '준, 잘 들려요. 계속해요.',
            reaction: "Really? It's all choppy on my end.",
            reaction_ko: '정말요? 제 쪽에서는 계속 끊기는데요.'
          },
          {
            text: "Jun, you're breaking up. Could you email it to us next week?",
            text_ko: '준, 소리가 끊겨요. 다음 주에 메일로 보내 줄래요?',
            reaction: 'Next week? It sounded urgent.',
            reaction_ko: '다음 주요? 급한 얘기 같던데요.'
          }
        ],
        reply_line: "Good idea. ...Okay, it's in the chat: the weekly totals are off by a few cents.",
        reply_ko: '좋은 생각이에요. ...채팅에 올라왔네요. 주간 합계가 몇 센트씩 안 맞는대요.'
      },
      {
        situation: "You know this bug: it's the same rounding problem you fixed in the daily totals last month.",
        situation_ko: '이 버그는 압니다. 지난달 당신이 일간 합계에서 고친 반올림 문제와 같습니다.',
        line: 'Derek, does that ring a bell?',
        line_ko: '데릭, 짚이는 거 있어요?',
        prompt: 'Say what you know, and offer to help Jun without taking over.',
        prompt_ko: '아는 것을 말하고, 일을 가져가지 말고 준을 돕겠다고 하세요.',
        model: 'Yes, it looks like the rounding bug from the daily totals. I can pair with Jun on it after lunch.',
        model_ko: '네, 일간 합계의 반올림 버그 같아요. 점심 먹고 준이랑 같이 볼게요.',
        distractors: [
          {
            text: "Yes, it's the rounding bug. I'll just fix it myself tonight. It's faster that way.",
            text_ko: '네, 반올림 버그예요. 오늘 밤에 제가 그냥 고칠게요. 그게 빨라요.',
            reaction: 'Let Jun learn this one. Maybe pair with him instead?',
            reaction_ko: '이번 건 준이 배우게 해 줘요. 같이 보는 건 어때요?'
          },
          {
            text: "No idea, sorry. That's Jun's code, so it's really his problem.",
            text_ko: '모르겠어요, 미안해요. 준의 코드니까 준이 알아서 할 문제예요.',
            reaction: "We're one team, Derek.",
            reaction_ko: '우린 한 팀이에요, 데릭.'
          },
          {
            text: 'Yes, it looks like the time zone bug from the daily totals. I can pair with Jun on it after lunch.',
            text_ko: '네, 일간 합계의 시간대 버그 같아요. 점심 먹고 준이랑 같이 볼게요.',
            reaction: "Time zone? He said it's off by cents.",
            reaction_ko: '시간대요? 몇 센트 차이라고 했는데요.'
          }
        ],
        reply_line: 'Perfect. Jun says after lunch works.',
        reply_ko: '좋아요. 준도 점심 뒤가 괜찮대요.'
      },
      {
        situation: 'Today you log off at four to pick up your sister Elena at the airport. Maya already said that was fine.',
        situation_ko: '오늘은 엘레나를 데리러 공항에 가려고 4시에 로그아웃합니다. 마야는 이미 괜찮다고 했습니다.',
        line: 'Anything else before we go?',
        line_ko: '끝내기 전에 더 있어요?',
        prompt: "Tell the team when you'll be offline today, and how to reach you.",
        prompt_ko: '오늘 언제 오프라인인지, 급하면 어떻게 연락하면 되는지 팀에 알리세요.',
        model: "I'm logging off at four today. If anything breaks, text me.",
        model_ko: '오늘은 4시에 로그아웃해요. 뭐가 고장 나면 문자 주세요.',
        distractors: [
          {
            text: "I'm logging off at two today. If anything breaks, text me.",
            text_ko: '오늘은 2시에 로그아웃해요. 뭐가 고장 나면 문자 주세요.',
            reaction: 'Two? I thought Maya said four.',
            reaction_ko: '2시요? 마야는 4시라고 했던 것 같은데요.'
          },
          {
            text: "I'm off at four, and I won't look at my phone after that, so don't bother texting.",
            text_ko: '4시에 끝나고 그 뒤로는 휴대전화를 안 볼 테니까 문자해도 소용없어요.',
            reaction: "Okay, but who do we call if it's urgent?",
            reaction_ko: '알겠어요. 그럼 급하면 누구한테 연락해요?'
          },
          {
            text: 'Nope, nothing from me. Have a good one, everyone.',
            text_ko: '아뇨, 저는 없어요. 다들 수고해요.',
            reaction: "Didn't you say you're leaving early today?",
            reaction_ko: '오늘 일찍 간다고 하지 않았어요?'
          }
        ],
        reply_line: 'Thanks for the heads-up. Safe drive!',
        reply_ko: '미리 알려 줘서 고마워요. 운전 조심해요!'
      }
    ]
  },
  {
    id: 'rt_video_dk_3',
    title: 'Video standup: the wrong window',
    title_ko: '화상 스탠드업: 엉뚱한 창',
    place: 'derek_desk',
    npc: 'priya',
    day_from: 16,
    day_to: null,
    time_from: '09:45',
    time_to: '10:30',
    summary: 'You share the wrong window on a video call. Fix it quickly, explain a slow query in plain words, and set up a call so Jun can learn from you.',
    summary_ko: '화상 회의에서 엉뚱한 창을 공유했습니다. 얼른 바로잡고, 느린 쿼리를 쉬운 말로 설명하고, 준이 배울 수 있게 통화 약속을 잡으세요.',
    sort: 2063,
    tags: 'meeting,standup,routine,video',
    turns: [
      {
        situation: "Ten o'clock standup on video. You share your screen to show the slow sales query, but your personal email is open on top.",
        situation_ko: '화상으로 하는 10시 스탠드업입니다. 느린 매출 쿼리를 보여 주려고 화면을 공유했는데, 개인 메일 창이 맨 위에 떠 있습니다.',
        line: "Derek, I think we're looking at your inbox...",
        line_ko: '데릭, 지금 메일함이 보이는 것 같은데요...',
        prompt: 'Apologize quickly and share only the right window.',
        prompt_ko: '얼른 사과하고, 맞는 창만 공유하세요.',
        model: 'Oops, sorry about that. Let me share just the browser window.',
        model_ko: '앗, 미안해요. 브라우저 창만 공유할게요.',
        distractors: [
          {
            text: 'Oops, sorry about that. Let me share my whole screen instead.',
            text_ko: '앗, 미안해요. 대신 화면 전체를 공유할게요.',
            reaction: "Your whole screen is what we're seeing now.",
            reaction_ko: '지금 보이는 게 화면 전체예요.'
          },
          {
            text: 'Ha, well, now you all know my weekend plans. Anyway, the query...',
            text_ko: '하하, 이제 다들 제 주말 계획을 알게 됐네요. 아무튼, 쿼리는...',
            reaction: 'Ha. Could you switch windows first, though?',
            reaction_ko: '하하. 그래도 창부터 바꿔 줄래요?'
          },
          {
            text: "Sorry, I'll stop sharing. You can look at the query on your own later.",
            text_ko: '미안해요, 공유를 끌게요. 쿼리는 나중에 각자 봐요.',
            reaction: 'It would really help to see it now.',
            reaction_ko: '지금 보는 게 정말 도움이 될 텐데요.'
          }
        ],
        reply_line: 'There it is. Thanks.',
        reply_ko: '이제 보여요. 고마워요.'
      },
      {
        situation: 'On screen: the weekly sales query reads the whole sales table every time. You plan to add an index today and test it on staging first.',
        situation_ko: '화면에는 주간 매출 쿼리가 매번 매출 테이블 전체를 읽는 모습이 보입니다. 오늘 인덱스를 추가하고 먼저 스테이징에서 테스트할 계획입니다.',
        line: "So what's the plan?",
        line_ko: '그래서 계획은요?',
        prompt: 'Explain the plan in plain words.',
        prompt_ko: '쉬운 말로 계획을 설명하세요.',
        model: "The query reads the whole table every time. I'll add an index today and test it on staging.",
        model_ko: '쿼리가 매번 테이블 전체를 읽어요. 오늘 인덱스를 추가하고 스테이징에서 테스트할게요.',
        distractors: [
          {
            text: "The query reads the whole table every time. I'll add an index today and put it straight into production.",
            text_ko: '쿼리가 매번 테이블 전체를 읽어요. 오늘 인덱스를 추가해서 바로 운영에 넣을게요.',
            reaction: 'Straight into production? Staging first, please.',
            reaction_ko: '바로 운영에요? 스테이징부터 해 줘요.'
          },
          {
            text: "It's a full scan on the sales fact table. I'll add a composite B-tree index on two columns.",
            text_ko: '매출 팩트 테이블 풀 스캔이에요. 두 컬럼에 복합 B-트리 인덱스를 걸게요.',
            reaction: 'Um... in plain words?',
            reaction_ko: '음... 쉬운 말로 해 줄래요?'
          },
          {
            text: "The query is just slow sometimes. I'll keep an eye on it and see if it gets worse.",
            text_ko: '쿼리가 가끔 느릴 뿐이에요. 지켜보다가 더 나빠지면 볼게요.',
            reaction: 'The stores are already complaining, though.',
            reaction_ko: '매장들은 벌써 불평하고 있는데요.'
          }
        ],
        reply_line: 'Clear. Thanks, Derek.',
        reply_ko: '알겠어요. 고마워요, 데릭.'
      },
      {
        speaker: 'jun',
        situation: 'In the chat, Jun asks if he can watch you add the index. You plan to do it at one.',
        situation_ko: '준이 채팅으로 인덱스 추가하는 걸 지켜봐도 되냐고 묻습니다. 당신은 1시에 할 계획입니다.',
        line: 'Derek, could I watch when you add the index?',
        line_ko: '데릭, 인덱스 추가할 때 옆에서 봐도 돼요?',
        prompt: 'Say yes, and set it up for a day when you both work from home.',
        prompt_ko: '좋다고 하고, 둘 다 집에서 일하는 날에 맞게 약속을 잡으세요.',
        model: "Sure. I'll send you a call link at one.",
        model_ko: '그럼요. 1시에 통화 링크 보낼게요.',
        distractors: [
          {
            text: "Sure. I'll send you a call link at three.",
            text_ko: '그럼요. 3시에 통화 링크 보낼게요.',
            reaction: 'Three? I have a meeting then.',
            reaction_ko: '3시요? 그때는 회의가 있는데요.'
          },
          {
            text: 'Sure. Just come by my desk at one.',
            text_ko: '그럼요. 1시에 제 자리로 와요.',
            reaction: "Your desk? We're both at home today.",
            reaction_ko: '자리요? 오늘은 둘 다 집인데요.'
          },
          {
            text: "Maybe another time. It's a bit too advanced for you.",
            text_ko: '다음에 해요. 아직 당신한텐 좀 어려워요.',
            reaction: 'Oh. Okay...',
            reaction_ko: '아. 네...'
          }
        ],
        reply_line: 'Thanks! See you at one.',
        reply_ko: '고마워요! 1시에 봐요.'
      }
    ]
  },
  {
    id: 'rt_1on1_dk_1',
    title: "1:1: the pager won't stop",
    title_ko: '1:1: 호출이 멈추지 않아요',
    place: 'office_manager',
    npc: 'maya',
    day_from: 16,
    day_to: null,
    time_from: '10:45',
    time_to: '11:45',
    summary: 'In your biweekly 1:1, be honest with Maya about the on-call load, propose a fix for a noisy alert, plan some real time off, and help her spread the rotation.',
    summary_ko: '격주 1:1에서 온콜 부담을 마야에게 솔직하게 말하고, 쓸데없이 울리는 알림을 고칠 방법을 제안하고, 제대로 된 휴가를 계획하고, 온콜 순번을 나누는 일을 도우세요.',
    sort: 2103,
    tags: 'meeting,manager,one-on-one,routine',
    turns: [
      {
        situation: 'Your biweekly 1:1. With more stores on the dashboard, you were paged at night three times on your last on-call week. Two were the same sync alert, and both were false alarms.',
        situation_ko: '격주 1:1입니다. 대시보드를 쓰는 매장이 늘면서, 지난 온콜 주간에 밤에 세 번 호출을 받았습니다. 두 번은 같은 동기화 알림이었고, 둘 다 오경보였습니다.',
        line: 'Derek, you look tired. How are you holding up?',
        line_ko: '데릭, 피곤해 보여요. 좀 어때요?',
        prompt: 'Be honest about how the on-call week went, with the facts.',
        prompt_ko: '온콜 주간이 어땠는지 사실대로 솔직하게 말하세요.',
        model: 'Not great. Three nights of pages, and two were false alarms from one sync alert.',
        model_ko: '별로예요. 사흘 밤 호출이 왔는데, 두 번은 같은 동기화 알림의 오경보였어요.',
        distractors: [
          {
            text: 'Fine. It was a quiet week. Just one page, and it was a real problem I fixed fast.',
            text_ko: '괜찮아요. 조용한 주였어요. 호출은 한 번뿐이었고, 진짜 문제라 금방 고쳤어요.',
            reaction: 'One? The log shows three.',
            reaction_ko: '한 번이요? 기록엔 세 번인데요.'
          },
          {
            text: "Not great. Jun's code keeps waking me up at night. Someone should talk to him.",
            text_ko: '별로예요. 준이 짠 코드 때문에 밤마다 깨요. 누가 준한테 말 좀 해야 해요.',
            reaction: "Is it really Jun's code? Let's look at the alerts first.",
            reaction_ko: '정말 준의 코드 때문이에요? 알림부터 보죠.'
          },
          {
            text: "I'm fine. I've done on call for ten years. A few pages never hurt anybody.",
            text_ko: '괜찮아요. 온콜만 10년째예요. 호출 몇 번에 큰일 안 나요.',
            reaction: 'Maybe. But you look like it hurt a little.',
            reaction_ko: '그럴지도요. 그래도 좀 힘들었던 얼굴인데요.'
          }
        ],
        reply_line: 'Three nights is a lot. And false alarms are the worst kind.',
        reply_ko: '사흘 밤이면 많아요. 게다가 오경보가 제일 나쁜 종류고요.'
      },
      {
        situation: "The sync alert fires whenever a store's data is a few minutes late, which happens every night during the stores' backups.",
        situation_ko: '동기화 알림은 매장 데이터가 몇 분만 늦어도 울리는데, 매일 밤 매장 백업 시간마다 그렇게 됩니다.',
        line: 'What would help?',
        line_ko: '뭐가 도움이 될까요?',
        prompt: 'Suggest a practical fix for the noisy alert.',
        prompt_ko: '시끄러운 알림을 고칠 현실적인 방법을 제안하세요.',
        model: "Let's change the alert so it waits out the nightly backups. I can do it this week.",
        model_ko: '알림이 밤마다 하는 백업 시간은 기다리도록 바꾸죠. 이번 주에 제가 할 수 있어요.',
        distractors: [
          {
            text: "Let's just turn off the sync alert. If something's really wrong, the stores will call us.",
            text_ko: '그냥 동기화 알림을 끄죠. 정말 문제가 있으면 매장에서 전화하겠죠.',
            reaction: "And find out from Greg? I'd rather not.",
            reaction_ko: '그걸 그렉한테 듣고 알자고요? 그건 싫어요.'
          },
          {
            text: "Let's change the alert, but I'm swamped. Could Priya ask Greg to stop the backups?",
            text_ko: '알림을 바꾸긴 해야 하는데 너무 바빠요. 프리야가 그렉한테 백업을 멈춰 달라고 할 수 있을까요?',
            reaction: "The backups are theirs, Derek. We can't ask them to stop.",
            reaction_ko: '백업은 그쪽 거예요, 데릭. 멈추라고 할 순 없어요.'
          },
          {
            text: "Honestly, someone else should take on call for a while. I've done more than my share.",
            text_ko: '솔직히 당분간 다른 사람이 온콜을 맡아야 해요. 저는 할 만큼 했어요.',
            reaction: "Maybe, but that doesn't fix the alert.",
            reaction_ko: '그럴 수도 있지만, 그런다고 알림이 고쳐지진 않아요.'
          }
        ],
        reply_line: 'Do it. Put it at the top of your list, ahead of new work.',
        reply_ko: '그렇게 해요. 새 작업보다 앞에, 목록 맨 위에 두세요.'
      },
      {
        situation: "You have nine days of PTO left this year, and you haven't taken a day off in months.",
        situation_ko: '올해 유급 휴가가 9일 남아 있고, 몇 달째 하루도 쉬지 않았습니다.',
        line: 'And when did you last take real time off?',
        line_ko: '그리고 마지막으로 제대로 쉰 게 언제예요?',
        prompt: "Admit it's been too long, and say what you'll do about it.",
        prompt_ko: '너무 오래됐다고 인정하고, 어떻게 할지 말하세요.',
        model: "It's been months. I have nine days left. I'll plan a few once the alert is fixed.",
        model_ko: '몇 달 됐어요. 9일 남았어요. 알림 고치고 나서 며칠 계획할게요.',
        distractors: [
          {
            text: "Last month, I think. I only have two days left, so I'll save them for emergencies.",
            text_ko: '지난달이었던 것 같아요. 이틀밖에 안 남아서 급할 때 쓰려고 아껴 둘게요.',
            reaction: 'Two? HR says you have nine.',
            reaction_ko: '이틀이요? 인사팀은 9일이라던데요.'
          },
          {
            text: "Not in a while. But the rollout needs me, so I'll just take time off next year.",
            text_ko: '꽤 됐어요. 그래도 확대 적용에 제가 필요하니까 휴가는 내년에 쓸게요.',
            reaction: "Days you don't take just disappear, Derek.",
            reaction_ko: '안 쓴 휴가는 그냥 사라져요, 데릭.'
          },
          {
            text: "It's been months. I'll take all nine days starting tomorrow. You'll figure it out.",
            text_ko: '몇 달 됐어요. 내일부터 9일 다 쓸게요. 알아서 해 주세요.',
            reaction: "Tomorrow? Let's give the team a little notice.",
            reaction_ko: '내일요? 팀에 조금은 미리 알려 주죠.'
          }
        ],
        reply_line: "Good. Pick days when you're not on call, and put them on the team calendar.",
        reply_ko: '좋아요. 온콜이 아닌 날로 골라서 팀 달력에 올려요.'
      },
      {
        situation: "Jun has asked to learn on call, but he hasn't been on the rotation yet.",
        situation_ko: '준이 온콜을 배우고 싶다고 했지만, 아직 순번에 들어간 적은 없습니다.',
        line: "One more thing. Should we grow the rotation, so it doesn't all land on a few people?",
        line_ko: '하나 더요. 몇 사람한테만 몰리지 않게 온콜 순번을 늘릴까요?',
        prompt: 'Agree, and suggest a careful way to bring Jun in.',
        prompt_ko: '동의하고, 준을 신중하게 합류시킬 방법을 제안하세요.',
        model: 'Yes. Jun could shadow my next on-call week, then take one with me as backup.',
        model_ko: '네. 준이 다음 제 온콜 주간을 옆에서 보고, 그다음엔 제가 백업을 서고 한 주 맡으면 돼요.',
        distractors: [
          {
            text: "Yes. Put Jun on alone next week. He'll learn fastest by figuring it out himself.",
            text_ko: '네. 다음 주에 준 혼자 맡겨요. 스스로 해결해 봐야 제일 빨리 배워요.',
            reaction: "Alone? That's a lot for his first time.",
            reaction_ko: '혼자요? 처음치고는 너무 벅차요.'
          },
          {
            text: "No. Jun asked, but he's too new. On call is a senior job, and I'd rather keep it.",
            text_ko: '아니요. 준이 원하긴 하지만 너무 신입이에요. 온콜은 시니어 일이니 제가 계속할게요.',
            reaction: "You just told me it's wearing you down.",
            reaction_ko: '방금 지쳐 간다고 했잖아요.'
          },
          {
            text: "Yes. Let's wait for the backend hire and give most of the rotation to them.",
            text_ko: '네. 백엔드 신입이 오면 순번 대부분을 그 사람한테 주죠.',
            reaction: "Most of it, in their first weeks? That's not fair to them.",
            reaction_ko: '들어오자마자 대부분을요? 그건 그 사람한테 불공평해요.'
          }
        ],
        reply_line: "I like it. Talk to Jun, and I'll update the schedule. Let me know if you have any questions.",
        reply_ko: '좋아요. 준과 얘기해 봐요. 일정표는 제가 고칠게요. 궁금한 게 있으면 언제든 말해요.'
      }
    ]
  },
  {
    id: 'rt_1on1_dk_2',
    title: '1:1: surprises mid-sprint',
    title_ko: '1:1: 스프린트 중간의 깜짝 요청',
    place: 'office_manager',
    npc: 'maya',
    day_from: 16,
    day_to: null,
    time_from: '10:45',
    time_to: '11:45',
    summary: 'Raise a working problem with Priya without blaming her, agree on how to handle it, and make sure Jun gets credit for good work.',
    summary_ko: '프리야와의 업무상 문제를 그녀를 탓하지 않고 꺼내고, 어떻게 풀지 정하고, 준이 잘한 일을 제대로 인정받게 하세요.',
    sort: 2104,
    tags: 'meeting,manager,one-on-one,routine',
    turns: [
      {
        situation: 'Your biweekly 1:1. Twice this sprint, Priya added small requests from Greg in the middle of the sprint without checking with you, and the team had to drop planned work.',
        situation_ko: '격주 1:1입니다. 이번 스프린트에 두 번, 프리야가 당신과 상의 없이 그렉의 작은 요청을 스프린트 중간에 넣었고, 팀은 계획한 일을 빼야 했습니다.',
        line: "What's on your list today?",
        line_ko: '오늘은 어떤 얘기가 있어요?',
        prompt: 'Raise the problem calmly, focusing on what it does to the team.',
        prompt_ko: '팀에 미치는 영향에 초점을 맞춰 차분하게 문제를 꺼내세요.',
        model: 'Mid-sprint requests. Twice now, new work came in and we dropped planned tickets.',
        model_ko: '스프린트 중간 요청이요. 벌써 두 번 새 일이 들어와서 계획했던 티켓을 빼야 했어요.',
        distractors: [
          {
            text: "Priya. She keeps saying yes to Greg, and I'm tired of cleaning up after her.",
            text_ko: '프리야요. 그렉한테 계속 알겠다고 하는데, 뒤처리하는 데 지쳤어요.',
            reaction: "Let's keep it about the work, not about Priya.",
            reaction_ko: '프리야 말고 일 얘기를 하죠.'
          },
          {
            text: "Mid-sprint requests. One small one came in this sprint, but it's no big deal.",
            text_ko: '스프린트 중간 요청이요. 이번에 작은 게 하나 들어왔는데, 별일 아니에요.',
            reaction: 'Then why is it on your list?',
            reaction_ko: '그럼 왜 오늘 얘기할 거리에 있어요?'
          },
          {
            text: "Mid-sprint requests. From now on, I'll just ignore anything that comes in late.",
            text_ko: '스프린트 중간 요청이요. 앞으로 늦게 들어오는 건 그냥 무시할게요.',
            reaction: "That's not your call alone, Derek.",
            reaction_ko: '그건 데릭 혼자 정할 일이 아니에요.'
          }
        ],
        reply_line: "That's a real problem. Dropped work hurts both the team and the client.",
        reply_ko: '실제로 문제네요. 계획한 일이 빠지면 팀도 고객도 손해예요.'
      },
      {
        situation: "You haven't talked to Priya about it yet. You wanted Maya's advice first.",
        situation_ko: '아직 프리야와 이 얘기를 하지 않았습니다. 먼저 마야의 조언을 듣고 싶었습니다.',
        line: 'Have you talked to Priya about it?',
        line_ko: '프리야하고 얘기해 봤어요?',
        prompt: "Answer honestly, and say how you'll take it from here.",
        prompt_ko: '솔직하게 답하고, 이제 어떻게 할지 말하세요.',
        model: "Not yet. I'll talk to her and suggest we look at new requests together first.",
        model_ko: '아직이요. 프리야와 얘기해서, 새 요청은 먼저 같이 보자고 제안할게요.',
        distractors: [
          {
            text: "Yes, twice, and she didn't listen. That's why I'm bringing it to you now.",
            text_ko: '네, 두 번이나요. 근데 안 듣더라고요. 그래서 지금 마야한테 가져온 거예요.',
            reaction: "Twice? She hasn't mentioned it to me.",
            reaction_ko: '두 번이요? 프리야는 저한테 아무 말 없었는데요.'
          },
          {
            text: "Not yet. I was hoping you could tell her for me. It's easier coming from you.",
            text_ko: '아직이요. 마야가 대신 말해 주셨으면 해요. 마야가 말하는 게 낫잖아요.',
            reaction: "It's better coming from you. You two work together every day.",
            reaction_ko: '데릭이 말하는 게 나아요. 둘이 매일 같이 일하잖아요.'
          },
          {
            text: "Not yet. I'll send her a long email tonight with every example, and copy you.",
            text_ko: '아직이요. 오늘 밤에 사례를 전부 적어서 긴 메일을 보낼게요. 마야도 참조로 넣고요.',
            reaction: 'A long email at night? A face-to-face talk would go better.',
            reaction_ko: '밤에 긴 메일이요? 얼굴 보고 얘기하는 게 나을 거예요.'
          }
        ],
        reply_line: "Good. If you two get stuck, bring it to me, and we'll sort it out together.",
        reply_ko: '좋아요. 둘이 풀리지 않으면 저한테 가져와요. 같이 정리해요.'
      },
      {
        situation: "Last sprint, Jun found a bug in a store's sales totals before the client noticed. He fixed it, wrote a clear note to the team, and stayed calm the whole time.",
        situation_ko: '지난 스프린트에 준이 고객이 알아채기 전에 한 매장의 매출 합계 버그를 찾았습니다. 그는 버그를 고치고, 팀에 명확한 설명을 남기고, 내내 침착했습니다.',
        line: 'Okay. Anything else?',
        line_ko: '좋아요. 또 있어요?',
        prompt: "Make sure Jun's work gets noticed, with the details.",
        prompt_ko: '준이 한 일이 자세히 알려지게 하세요.',
        model: 'Yes, Jun. He caught a sales totals bug before the client saw it, and his write-up was great.',
        model_ko: '네, 준이요. 고객이 보기 전에 매출 합계 버그를 잡았고, 정리한 글도 훌륭했어요.',
        distractors: [
          {
            text: 'Yes, Jun. He caught a bug in the sales totals, but honestly, I had to fix most of it myself.',
            text_ko: '네, 준이요. 매출 합계 버그를 잡긴 했는데, 솔직히 대부분은 제가 고쳤어요.',
            reaction: 'Really? His note says he fixed it.',
            reaction_ko: '정말요? 준의 글엔 자기가 고쳤다고 돼 있던데요.'
          },
          {
            text: 'Yes, the sales totals bug. I caught it before the client saw it, and I fixed it fast.',
            text_ko: '네, 매출 합계 버그요. 고객이 보기 전에 제가 잡아서 금방 고쳤어요.',
            reaction: 'You did? I heard it was Jun.',
            reaction_ko: '데릭이요? 준이 했다고 들었는데요.'
          },
          {
            text: "Yes, Jun. He's doing fine. Nothing special this sprint, but no problems either.",
            text_ko: '네, 준이요. 잘하고 있어요. 이번엔 특별한 건 없지만 문제도 없어요.',
            reaction: "Nothing special? Wasn't there a bug he caught?",
            reaction_ko: '특별한 게 없다고요? 준이 잡은 버그가 있지 않았어요?'
          }
        ],
        reply_line: "That's great to hear. I hadn't heard the details.",
        reply_ko: '좋은 소식이네요. 자세한 얘기는 못 들었었어요.'
      },
      {
        situation: "Maya writes Jun's performance reviews, and feedback from teammates goes into them.",
        situation_ko: '준의 성과 평가는 마야가 쓰고, 동료들의 피드백도 평가에 들어갑니다.',
        line: 'Should I thank him at the team meeting, or would you like to?',
        line_ko: '팀 회의에서 제가 고맙다고 할까요, 아니면 데릭이 할래요?',
        prompt: 'Suggest a way to recognize him that also helps him at review time.',
        prompt_ko: '그를 인정하면서 평가 때도 도움이 될 방법을 제안하세요.',
        model: 'Let me thank him at standup. Could you note it for his review, too?',
        model_ko: '스탠드업에서 제가 고맙다고 할게요. 평가에도 적어 주실래요?',
        distractors: [
          {
            text: "Let's not make a big deal of it. Too much praise might go to his head.",
            text_ko: '크게 만들지 말죠. 칭찬이 지나치면 우쭐해질 수도 있어요.',
            reaction: 'Hmm. A little praise goes a long way, Derek.',
            reaction_ko: '흠. 칭찬 조금이 큰 힘이 돼요, 데릭.'
          },
          {
            text: "You do it. And maybe give him a raise right away, while you're at it.",
            text_ko: '마야가 해 주세요. 하는 김에 바로 연봉도 좀 올려 주시고요.',
            reaction: 'Raises go through the review, not a team meeting.',
            reaction_ko: '연봉은 팀 회의가 아니라 평가를 거쳐요.'
          },
          {
            text: 'Let me thank him at standup. Reviews are just about numbers, so skip that.',
            text_ko: '스탠드업에서 제가 고맙다고 할게요. 평가는 숫자만 보니까 거긴 빼도 돼요.',
            reaction: 'Not just numbers. This is exactly what I look for.',
            reaction_ko: '숫자만이 아니에요. 바로 이런 걸 봐요.'
          }
        ],
        reply_line: "Deal. I'll add it to his notes. Let me know if you have any questions.",
        reply_ko: '좋아요. 평가 메모에 넣을게요. 궁금한 게 있으면 언제든 말해요.'
      }
    ]
  },
  {
    id: 'rt_1on1_dk_3',
    title: "1:1: interviews and what's next",
    title_ko: '1:1: 면접, 그리고 다음 단계',
    place: 'office_manager',
    npc: 'maya',
    day_from: 16,
    day_to: null,
    time_from: '10:45',
    time_to: '11:45',
    summary: 'Give Maya a clear update on the backend developer interviews, keep your interview load manageable, and talk honestly about your own career path.',
    summary_ko: '백엔드 개발자 면접 진행 상황을 마야에게 분명하게 알리고, 면접 부담을 감당할 만하게 조절하고, 당신의 커리어 방향을 솔직하게 이야기하세요.',
    sort: 2105,
    tags: 'meeting,manager,one-on-one,routine',
    turns: [
      {
        situation: "Your biweekly 1:1. You've interviewed four candidates for the backend role. One stood out: strong on databases and great at explaining her thinking. The other three struggled with system design.",
        situation_ko: '격주 1:1입니다. 백엔드 자리 지원자 네 명을 면접했습니다. 한 명이 돋보였습니다. 데이터베이스에 강하고 자기 생각을 잘 설명했습니다. 나머지 셋은 시스템 설계에서 고전했습니다.',
        line: "How's the backend hiring going from your side?",
        line_ko: '데릭이 보기에 백엔드 채용은 어떻게 돼 가요?',
        prompt: 'Give her a short, clear update with your recommendation.',
        prompt_ko: '추천 의견과 함께 짧고 분명하게 알리세요.',
        model: "Four interviews so far. One stood out, strong on databases. I'd move her forward.",
        model_ko: '지금까지 네 명 봤어요. 한 명이 돋보였는데, 데이터베이스에 강해요. 다음 단계로 올리고 싶어요.',
        distractors: [
          {
            text: "Four interviews so far. They were all strong, so honestly, I'd hire any of them.",
            text_ko: '지금까지 네 명 봤어요. 다 뛰어나서 솔직히 누굴 뽑아도 좋아요.',
            reaction: 'All of them? Your notes say three struggled with design.',
            reaction_ko: '다요? 메모엔 셋이 설계에서 고전했다던데요.'
          },
          {
            text: "Not great. Nobody's been good enough. Maybe we should stop looking for now.",
            text_ko: '별로예요. 괜찮은 사람이 없었어요. 당분간 채용을 멈춰야 할지도요.',
            reaction: 'Nobody? I thought one of them did really well.',
            reaction_ko: '아무도요? 한 명은 정말 잘했다고 들었는데요.'
          },
          {
            text: "Four so far. One stood out, so let's skip the rest and make her an offer today.",
            text_ko: '지금까지 넷이요. 한 명이 돋보였으니 나머지 절차는 건너뛰고 오늘 제안하죠.',
            reaction: 'Today? She still has to meet me and Priya.',
            reaction_ko: '오늘요? 아직 저랑 프리야도 만나야 해요.'
          }
        ],
        reply_line: "Good. I'll set up her final round with me and Priya.",
        reply_ko: '좋아요. 저랑 프리야와 하는 최종 면접을 잡을게요.'
      },
      {
        situation: 'The panel takes about two hours of your week: two interviews, plus a write-up for each. On busy days, the write-ups pile up.',
        situation_ko: '면접관 일은 일주일에 두 시간쯤 걸립니다. 면접 두 번에, 면접마다 평가서를 써야 합니다. 바쁜 날엔 평가서가 밀립니다.',
        line: "You're on a lot of panels. Is it too much on top of the dashboard?",
        line_ko: '면접에 많이 들어가네요. 대시보드 일까지 하면 너무 많아요?',
        prompt: "Be honest that it's mostly manageable, and suggest one change.",
        prompt_ko: '대체로 할 만하다고 솔직히 말하고, 바꿀 점 하나를 제안하세요.',
        model: 'Mostly fine, but the write-ups pile up. Could I block time right after each one?',
        model_ko: '대체로 괜찮은데 평가서가 밀려요. 면접 직후에 시간을 따로 잡아 둬도 될까요?',
        distractors: [
          {
            text: "It's way too much. Please take me off the panel completely. Someone else can do it.",
            text_ko: '너무 많아요. 면접관에서 완전히 빼 주세요. 다른 사람이 하면 돼요.',
            reaction: "Completely? You're our best interviewer, Derek.",
            reaction_ko: '완전히요? 데릭이 우리 최고의 면접관인데요.'
          },
          {
            text: "It's fine. When I'm busy, I just skip the write-ups and tell Linda in person.",
            text_ko: '괜찮아요. 바쁠 땐 평가서는 건너뛰고 린다한테 직접 말해요.',
            reaction: "We need those in writing. It's only fair to the candidates.",
            reaction_ko: '평가는 글로 남겨야 해요. 그래야 지원자한테 공정해요.'
          },
          {
            text: "Mostly it's fine. Could Jun do the write-ups for me? He has some free time.",
            text_ko: '대체로 괜찮아요. 평가서는 준이 대신 써 주면 안 될까요? 준이 좀 한가하거든요.',
            reaction: "Jun wasn't in the room. That wouldn't work.",
            reaction_ko: '준은 면접에 없었잖아요. 그건 안 돼요.'
          }
        ],
        reply_line: 'Do it. Put thirty minutes after each interview on your calendar.',
        reply_ko: '그렇게 해요. 면접마다 바로 뒤에 30분을 달력에 잡아 둬요.'
      },
      {
        situation: "You love the technical side and don't want to stop coding. Mentoring Jun has been the best part of your year.",
        situation_ko: '당신은 기술 쪽 일을 좋아하고 코딩을 그만두고 싶지 않습니다. 올해 가장 좋았던 건 준을 이끌어 준 일이었습니다.',
        line: "Now let's talk about you. Down the road, do you see yourself managing people, or growing as an engineer?",
        line_ko: '이제 데릭 얘기를 하죠. 앞으로 사람을 관리하는 쪽이에요, 엔지니어로 성장하는 쪽이에요?',
        prompt: 'Share your honest preference, and what you enjoy most.',
        prompt_ko: '솔직한 선호와 가장 즐기는 일을 말하세요.',
        model: "Growing as an engineer. But I'd like to keep mentoring. That's been the best part.",
        model_ko: '엔지니어로 성장하는 쪽이요. 그래도 멘토링은 계속하고 싶어요. 그게 제일 좋았어요.',
        distractors: [
          {
            text: "Managing people, for sure. Honestly, I'm tired of coding and ready to stop for good.",
            text_ko: '당연히 관리 쪽이요. 솔직히 코딩은 지겨워서 이제 완전히 그만두고 싶어요.',
            reaction: "Really? I've never seen you happier than in a code review.",
            reaction_ko: '정말요? 코드 리뷰할 때만큼 즐거워 보이는 걸 본 적이 없는데요.'
          },
          {
            text: "Whichever pays more, honestly. I'll go wherever the money is. No hard feelings.",
            text_ko: '솔직히 돈 더 주는 쪽이요. 돈 있는 데로 갈 거예요. 나쁜 뜻은 없어요.',
            reaction: "Ha. Fair, but let's think about what you enjoy.",
            reaction_ko: '하. 그럴 수 있죠. 그래도 뭘 즐기는지 생각해 봐요.'
          },
          {
            text: "Growing as an engineer. And I'd rather not mentor anymore. It slows me down.",
            text_ko: '엔지니어로 성장하는 쪽이요. 그리고 멘토링은 그만하고 싶어요. 속도가 느려져요.',
            reaction: "That surprises me. Jun says you're a great mentor.",
            reaction_ko: '의외네요. 준은 데릭이 훌륭한 멘토라던데요.'
          }
        ],
        reply_line: 'That makes sense. A senior engineering path has plenty of room for mentoring.',
        reply_ko: '이해돼요. 시니어 엔지니어의 길에도 멘토링할 자리는 많아요.'
      },
      {
        situation: "Phase two, a mobile app for Summit Retail, needs someone to design how it talks to the dashboard's backend.",
        situation_ko: '서밋 리테일의 모바일 앱인 2단계에는 앱이 대시보드 백엔드와 어떻게 연결될지 설계할 사람이 필요합니다.',
        line: "Then let's set a goal for your next review. Any ideas?",
        line_ko: '그럼 다음 평가 때까지의 목표를 정하죠. 생각나는 거 있어요?',
        prompt: "Suggest a concrete goal tied to the team's next big project.",
        prompt_ko: '팀의 다음 큰 프로젝트와 연결된 구체적인 목표를 제안하세요.',
        model: "I'd like to lead the technical design for the phase two mobile app.",
        model_ko: '2단계 모바일 앱의 기술 설계를 이끌고 싶어요.',
        distractors: [
          {
            text: "I'd like to rewrite the whole dashboard from scratch. It's already getting messy.",
            text_ko: '대시보드를 처음부터 전부 다시 짜고 싶어요. 벌써 지저분해지고 있어요.',
            reaction: "From scratch? It's live in the stores, Derek.",
            reaction_ko: '처음부터요? 매장에서 이미 쓰고 있어요, 데릭.'
          },
          {
            text: "I'd like to lead the phase two design, and also manage Jun officially.",
            text_ko: '2단계 설계를 이끌고, 준도 공식적으로 관리하고 싶어요.',
            reaction: "Manage Jun? You just said you'd rather not manage.",
            reaction_ko: '준을 관리한다고요? 방금 관리 쪽은 아니라고 했잖아요.'
          },
          {
            text: 'Maybe just to do good work? Goals like that are hard to pin down anyway.',
            text_ko: '그냥 일 잘하기 정도는 어때요? 어차피 그런 목표는 딱 정하기 어렵잖아요.',
            reaction: "Let's be more specific than that.",
            reaction_ko: '그보다는 더 구체적으로 정하죠.'
          }
        ],
        reply_line: "That's a great goal. I'll write it down. Let me know if you have any questions.",
        reply_ko: '좋은 목표예요. 적어 둘게요. 궁금한 게 있으면 언제든 말해요.'
      }
    ]
  }
];

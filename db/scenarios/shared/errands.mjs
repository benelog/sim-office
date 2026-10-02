// Errands anyone can run (tagged errand: not missions; the engine opens them when they apply, see careDue in the
// engine): the pharmacy and the walk-in clinic.

export const episodes = [
  {
    id: 'ph_pickup',
    title: 'Pick up your prescription',
    title_ko: '처방약 찾기',
    place: 'pharmacy',
    npc: 'omar',
    day_from: 10,
    day_to: 17,
    time_from: '09:00',
    time_to: '19:00',
    summary: 'You picked up your prescription at Fairview Pharmacy: a photo ID and your date of birth, the copay your insurance leaves to you, and a minute of advice from the pharmacist.',
    summary_ko: '페어뷰 약국에서 처방약을 찾았습니다. 사진이 있는 신분증과 생년월일을 확인하고, 보험이 남긴 본인 부담금(copay)을 내고, 약사에게 복용법을 들었어요.',
    sort: 900,
    tags: 'errand,pickup,pharmacy',
    hero: 'all',
    turns: [
      {
        situation: 'Fairview Pharmacy, at the back of Fairview Market. The pharmacy left you a voicemail: your prescription is ready. Omar, the pharmacist, looks up from his screen.',
        situation_ko: '페어뷰 마켓 안쪽의 페어뷰 약국. 처방약이 준비됐다는 음성 메시지가 와 있었어요. 약사 오마르가 화면에서 고개를 듭니다.',
        line: 'Hi there! Are you dropping off or picking up?',
        line_ko: '안녕하세요! 처방전을 맡기러 오셨어요, 약을 찾으러 오셨어요?',
        prompt: "Say you're here for the prescription the pharmacy called you about.",
        prompt_ko: '약국에서 연락받은 처방약을 찾으러 왔다고 하세요.',
        model: 'Picking up, please. You left me a message that my prescription was ready.',
        model_ko: '찾으러 왔어요. 처방약이 준비됐다고 메시지를 남기셨더라고요.',
        distractors: [
          {
            text: 'Dropping off, please. My doctor gave me a paper prescription this morning.',
            text_ko: '맡기러 왔어요. 오늘 아침에 의사가 종이 처방전을 줬어요.',
            reaction: "Oh? We already have one waiting for you. That's why we called. Picking that one up?",
            reaction_ko: '그래요? 이미 준비된 약이 있어서 전화드린 건데요. 그걸 찾아가시는 거죠?'
          },
          {
            text: "Hi. I'm looking for allergy medicine. Which aisle is it in?",
            text_ko: '안녕하세요. 알레르기 약을 찾는데, 몇 번 통로에 있어요?',
            reaction: "Aisle four. But didn't we call you about a prescription that's ready?",
            reaction_ko: '4번 통로예요. 그런데 준비된 처방약 때문에 저희가 전화드리지 않았나요?'
          },
          {
            text: "Picking up. Can you make it quick? I really don't have time to wait.",
            text_ko: '찾으러요. 빨리 좀 해 줄래요? 기다릴 시간이 정말 없어요.',
            reaction: "I'll be quick, but I still have to check a few things first.",
            reaction_ko: '빨리 해 드릴게요. 그래도 몇 가지는 먼저 확인해야 해요.'
          }
        ],
        reply_line: 'Sure thing. Let me look it up.',
        reply_ko: '그럼요. 찾아볼게요.'
      },
      {
        line: "Can I get your last name and date of birth? And I'll need to see a photo ID.",
        line_ko: '성과 생년월일을 알려 주시겠어요? 사진이 있는 신분증도 보여 주셔야 해요.',
        prompt: 'Hand over your ID and point out that both are on it.',
        prompt_ko: '신분증을 건네며 둘 다 거기 적혀 있다고 하세요.',
        model: "Sure. Here's my ID. My last name and date of birth are both on it.",
        model_ko: '네. 여기 신분증이요. 성과 생년월일이 다 적혀 있어요.',
        distractors: [
          {
            text: "Sure, here's my insurance card. That should have everything you need.",
            text_ko: '네, 여기 보험 카드요. 필요한 건 다 거기 있을 거예요.',
            reaction: "I'll need that too, but first a photo ID with your date of birth.",
            reaction_ko: '그것도 필요하지만, 먼저 생년월일이 있는 사진 신분증이 필요해요.'
          },
          {
            text: 'Sorry, I left my wallet at home. Can you give it to me without an ID?',
            text_ko: '죄송해요, 지갑을 집에 두고 왔어요. 신분증 없이 그냥 주시면 안 돼요?',
            reaction: "I'm sorry, I can't. For a prescription I have to check a photo ID.",
            reaction_ko: '죄송하지만 안 돼요. 처방약은 사진 신분증을 꼭 확인해야 해요.'
          },
          {
            text: "Do you really need my birthday? It's just my first name on the order.",
            text_ko: '생일까지 꼭 필요해요? 주문서에는 이름만 있을 텐데요.',
            reaction: 'I do, sorry. We check the date of birth on every prescription, so nobody gets the wrong one.',
            reaction_ko: '네, 죄송해요. 약이 엉뚱한 사람에게 가지 않게 모든 처방약은 생년월일을 확인해요.'
          }
        ],
        reply_line: 'Thanks. Okay, here it is: allergy tablets, a thirty-day supply.',
        reply_ko: '고마워요. 네, 여기 있네요. 알레르기 약, 30일 치예요.'
      },
      {
        line: 'It went through your insurance, so you just pay your copay today. How would you like to pay?',
        line_ko: '보험 처리가 됐으니 오늘은 본인 부담금(copay)만 내시면 돼요. 어떻게 결제하시겠어요?',
        prompt: 'Pay the copay with your debit card and ask for the receipt.',
        prompt_ko: '직불 카드로 본인 부담금을 내고 영수증을 달라고 하세요.',
        model: "I'll pay with my debit card. Could I have the receipt, please?",
        model_ko: '직불 카드로 낼게요. 영수증도 주시겠어요?',
        distractors: [
          {
            text: "Can the insurance pay all of it? I'd rather not pay anything today.",
            text_ko: '보험에서 전부 내 주면 안 돼요? 오늘은 아무것도 안 내고 싶어요.',
            reaction: 'The copay is the part your plan leaves to you. Everyone pays it at pickup.',
            reaction_ko: '본인 부담금은 보험이 남겨 둔 몫이에요. 다들 약 찾을 때 내요.'
          },
          {
            text: "Can I pay next week instead? I'll be back for groceries anyway.",
            text_ko: '다음 주에 내면 안 될까요? 어차피 장 보러 또 올 거예요.',
            reaction: 'Sorry, we need the copay when you pick it up.',
            reaction_ko: '죄송하지만 본인 부담금은 약을 찾을 때 내셔야 해요.'
          },
          {
            text: "I'll pay the full price instead. I'd rather not use my insurance.",
            text_ko: '그냥 정가로 낼게요. 보험은 안 쓰고 싶어요.',
            reaction: 'You could, but it would cost a lot more. The copay is the better deal.',
            reaction_ko: '그럴 수도 있지만 훨씬 비싸요. 본인 부담금만 내는 게 이득이에요.'
          }
        ],
        reply_line: "You're all set. Here's your receipt.",
        reply_ko: '다 됐어요. 영수증 여기 있어요.'
      },
      {
        line: "Have you taken this one before? I'm happy to go over it with you.",
        line_ko: '이 약은 전에 드셔 본 적 있어요? 복용법을 설명해 드릴게요.',
        prompt: "Say it's new for you, and ask how to take it.",
        prompt_ko: '처음 먹는 약이라고 하고 어떻게 먹는지 물어보세요.',
        model: 'No, this one is new for me. How should I take it?',
        model_ko: '아니요, 처음 먹는 약이에요. 어떻게 먹어야 해요?',
        distractors: [
          {
            text: "No thanks, I'll just look it up online when I get home.",
            text_ko: '괜찮아요, 집에 가서 인터넷으로 찾아볼게요.',
            reaction: 'Up to you, but it only takes a minute, and I can answer questions.',
            reaction_ko: '편하신 대로요. 그래도 1분이면 되고, 궁금한 건 바로 답해 드릴 수 있어요.'
          },
          {
            text: "Yes, I've taken it for years. Where do I sign for it?",
            text_ko: '네, 몇 년째 먹고 있어요. 어디에 서명하면 돼요?',
            reaction: "Our records say it's your first fill with us. Let me go over it quickly anyway.",
            reaction_ko: '저희 기록으로는 이번이 처음이시네요. 그래도 짧게 설명해 드릴게요.'
          },
          {
            text: 'No. Can I take two at once so it works faster?',
            text_ko: '아니요. 빨리 듣게 두 알씩 먹어도 돼요?',
            reaction: "Please don't. One tablet a day is the dose. More won't help.",
            reaction_ko: '그러시면 안 돼요. 하루 한 알이 정량이에요. 더 먹는다고 낫지 않아요.'
          }
        ],
        reply_line: 'One tablet a day, at the same time each day. It can make you a little drowsy, so go easy on alcohol. Call us with any questions.',
        reply_ko: '하루 한 알, 매일 같은 시간에 드세요. 조금 졸릴 수 있으니 술은 조심하시고요. 궁금한 게 있으면 전화 주세요.'
      }
    ]
  },
  {
    id: 'ph_rx',
    title: 'Pick up your flu medicine',
    title_ko: '독감 약 찾기',
    place: 'pharmacy',
    npc: 'omar',
    day_from: 16,
    day_to: null,
    time_from: '09:00',
    time_to: '19:00',
    summary: 'You picked up the antiviral the clinic sent over: your ID and date of birth, the copay, and how to take it: twice a day with food, until it is all gone.',
    summary_ko: '클리닉에서 보낸 항바이러스제를 찾았습니다. 신분증과 생년월일을 확인하고, 본인 부담금을 내고, 복용법을 들었어요. 하루 두 번, 음식과 함께, 다 먹을 때까지.',
    sort: 905,
    tags: 'errand,rx,pharmacy',
    hero: 'all',
    turns: [
      {
        situation: 'Back at the pharmacy counter, in the mask they gave you at the clinic.',
        situation_ko: '클리닉에서 받은 마스크를 쓰고 다시 약국 카운터에 왔어요.',
        line: 'Hi there. Are you picking something up?',
        line_ko: '안녕하세요. 약 찾으러 오셨어요?',
        prompt: 'Say the clinic next door just sent a prescription for you.',
        prompt_ko: '옆 클리닉에서 방금 처방전을 보냈다고 하세요.',
        model: 'Yes. The clinic next door just sent over a prescription for me.',
        model_ko: '네. 옆 클리닉에서 방금 제 처방전을 보냈어요.',
        distractors: [
          {
            text: "Yes. I'd like the strongest flu medicine you have, please.",
            text_ko: '네. 제일 센 독감 약으로 주세요.',
            reaction: 'Is there a prescription for you? Let me check what the clinic sent.',
            reaction_ko: '처방전이 있으세요? 클리닉에서 뭘 보냈는지 볼게요.'
          },
          {
            text: 'Yes, but can I get it without showing my ID? I feel awful.',
            text_ko: '네, 그런데 신분증 없이 받으면 안 될까요? 너무 아파서요.',
            reaction: "Sorry, I still need to check a photo ID, even when you're sick.",
            reaction_ko: '죄송하지만 아프셔도 사진 신분증은 꼭 확인해야 해요.'
          },
          {
            text: "No, I'm just waiting here for a friend who's shopping.",
            text_ko: '아니요, 장 보는 친구를 여기서 기다리는 중이에요.',
            reaction: 'Oh, I thought I saw something from the clinic with your name on it.',
            reaction_ko: '아, 클리닉에서 손님 이름으로 뭔가 온 것 같던데요.'
          }
        ],
        reply_line: 'Let me pull it up.',
        reply_ko: '찾아볼게요.'
      },
      {
        line: "Can I see your photo ID? And what's your date of birth?",
        line_ko: '사진 신분증 좀 보여 주시겠어요? 생년월일은 어떻게 되세요?',
        prompt: 'Hand him your ID and say your date of birth is on it.',
        prompt_ko: '신분증을 건네며 생년월일이 거기 있다고 하세요.',
        model: "Here's my ID. My date of birth is right on it.",
        model_ko: '여기 신분증이요. 생년월일이 바로 거기 있어요.',
        distractors: [
          {
            text: "Here's my insurance card. Isn't that the same thing?",
            text_ko: '여기 보험 카드요. 그게 그거 아니에요?',
            reaction: 'Not quite. I need a photo ID with your date of birth.',
            reaction_ko: '그건 달라요. 생년월일이 있는 사진 신분증이 필요해요.'
          },
          {
            text: "Can you just use the clinic's records? I'm too tired for this.",
            text_ko: '그냥 클리닉 기록을 쓰시면 안 돼요? 너무 지쳤어요.',
            reaction: "I know you're wiped out, but I have to check it myself. It takes a second.",
            reaction_ko: '많이 지치신 거 알지만 제가 직접 확인해야 해요. 금방 돼요.'
          },
          {
            text: 'Same as last time. You must remember me by now.',
            text_ko: '지난번이랑 같아요. 이제 저 기억하시잖아요.',
            reaction: 'I do, but I still check every time. It keeps everyone safe.',
            reaction_ko: '기억은 하지만 매번 확인해요. 그래야 모두 안전해요.'
          }
        ],
        reply_line: "Thanks. It's oseltamivir, an antiviral. Your copay is the same as for any prescription.",
        reply_ko: '고마워요. 항바이러스제인 오셀타미비르예요. 본인 부담금은 다른 처방약과 같아요.'
      },
      {
        line: 'Take one capsule twice a day with food, for five days.',
        line_ko: '하루 두 번, 한 캡슐씩 음식과 함께 닷새 동안 드세요.',
        prompt: 'Ask whether to keep taking it after you feel better.',
        prompt_ko: '몸이 나아진 뒤에도 계속 먹어야 하는지 물어보세요.',
        model: 'Got it. Should I keep taking it after I feel better?',
        model_ko: '알겠어요. 나아진 뒤에도 계속 먹어야 해요?',
        distractors: [
          {
            text: 'Got it. Can I take them all today so it works faster?',
            text_ko: '알겠어요. 빨리 듣게 오늘 다 먹어도 돼요?',
            reaction: 'No, please! Twice a day for five days. Spreading it out is how it works.',
            reaction_ko: '안 돼요! 하루 두 번 닷새예요. 나눠 먹어야 효과가 있어요.'
          },
          {
            text: "Got it. Can I give a few to a friend who's getting sick too?",
            text_ko: '알겠어요. 아프기 시작한 친구한테 몇 개 줘도 돼요?',
            reaction: "It's only for you. Your friend should see someone.",
            reaction_ko: '손님만 드셔야 해요. 친구분은 따로 진료받으셔야 해요.'
          },
          {
            text: 'Do I have to pay again? I already paid at the clinic.',
            text_ko: '또 내야 해요? 클리닉에서 이미 냈는데요.',
            reaction: 'The visit and the prescription are separate, so each has a copay.',
            reaction_ko: '진료와 처방약은 따로라서 본인 부담금도 각각 있어요.'
          }
        ],
        reply_line: 'Yes, finish all ten doses, even if you feel better. Get some rest, {name}.',
        reply_ko: '네, 나아져도 열 번 다 드세요. 푹 쉬세요, {name}.'
      }
    ]
  },
  {
    id: 'ph_otc',
    title: 'Ask for cold medicine',
    title_ko: '감기약 묻기',
    place: 'pharmacy',
    npc: 'omar',
    day_from: 16,
    day_to: null,
    time_from: '09:00',
    time_to: '19:00',
    summary: 'You asked the pharmacist about cold medicine: a daytime one, the store brand with the same ingredients as the name brand for less, how often to take it, and when to see a doctor.',
    summary_ko: '약사에게 감기약을 물어봤습니다. 낮에 먹는 약, 유명 브랜드와 성분이 같으면서 더 싼 자체 브랜드, 복용 간격, 그리고 진료를 받아야 할 때를 알게 됐어요.',
    sort: 910,
    tags: 'errand,otc,pharmacy',
    hero: 'all',
    turns: [
      {
        situation: 'You feel awful. At the pharmacy counter at the back of Fairview Market, Omar notices you sniffling.',
        situation_ko: '몸이 영 안 좋아요. 페어뷰 마켓 안쪽의 약국 카운터에서 오마르가 훌쩍이는 당신을 알아봅니다.',
        line: "Hi! Oof, you don't look so good. What can I do for you?",
        line_ko: '안녕하세요! 어휴, 안색이 안 좋네요. 뭘 도와드릴까요?',
        prompt: "Say you think you've caught a cold or the flu, and ask what he'd recommend.",
        prompt_ko: '감기나 독감에 걸린 것 같다고 하고 뭘 추천하는지 물어보세요.',
        model: "I think I've caught a cold or the flu. What would you recommend?",
        model_ko: '감기나 독감에 걸린 것 같아요. 뭘 추천하세요?',
        distractors: [
          {
            text: "I think I've caught a cold. Could you give me some antibiotics?",
            text_ko: '감기에 걸린 것 같아요. 항생제 좀 주실 수 있어요?',
            reaction: "Antibiotics need a prescription, and they don't work on colds. Those are viruses.",
            reaction_ko: '항생제는 처방전이 있어야 하고, 감기에는 듣지 않아요. 바이러스거든요.'
          },
          {
            text: 'I need the strongest thing you have. I have a big meeting tomorrow.',
            text_ko: '제일 센 걸로 주세요. 내일 중요한 회의가 있어요.',
            reaction: "Strongest isn't always best. Let's find what fits how you feel.",
            reaction_ko: '제일 센 게 늘 좋은 건 아니에요. 증상에 맞는 걸 찾아봐요.'
          },
          {
            text: 'Just looking, thanks. Where do you keep the vitamins?',
            text_ko: '그냥 둘러보는 중이에요. 비타민은 어디 있어요?',
            reaction: "Aisle two. But if you're feeling sick, I'm happy to help you pick something.",
            reaction_ko: '2번 통로예요. 그런데 아프시면 약 고르는 걸 도와드릴게요.'
          }
        ],
        reply_line: "Sorry you're under the weather. A couple of questions first.",
        reply_ko: '몸이 안 좋다니 안됐네요. 먼저 몇 가지 여쭤볼게요.'
      },
      {
        line: 'Do you want something for the daytime, or something to help you sleep at night? The night kind makes you drowsy.',
        line_ko: '낮에 먹는 걸 원하세요, 밤에 잠드는 걸 돕는 걸 원하세요? 밤에 먹는 건 졸려요.',
        prompt: 'Say you need to stay awake during the day.',
        prompt_ko: '낮에 깨어 있어야 한다고 하세요.',
        model: 'Something for the daytime, please. I need to stay awake.',
        model_ko: '낮에 먹는 걸로 주세요. 깨어 있어야 해서요.',
        distractors: [
          {
            text: "Both, please. I'll take them together so it works twice as fast.",
            text_ko: '둘 다 주세요. 같이 먹으면 두 배로 빨리 듣겠죠.',
            reaction: "Please don't take them together. They share ingredients, so that's a double dose.",
            reaction_ko: '같이 드시면 안 돼요. 성분이 겹쳐서 두 배를 먹게 돼요.'
          },
          {
            text: 'The night kind, please. I have to drive to work in the morning.',
            text_ko: '밤에 먹는 걸로 주세요. 아침에 운전해서 출근해야 해서요.',
            reaction: 'The night kind can leave you groggy in the morning. Not before driving.',
            reaction_ko: '밤에 먹는 건 아침까지 몽롱할 수 있어요. 운전 전에는 안 돼요.'
          },
          {
            text: "It doesn't matter. Just give me whatever's on sale this week.",
            text_ko: '상관없어요. 이번 주에 세일하는 걸로 아무거나 주세요.',
            reaction: 'It matters a little: the night kind could put you to sleep at your desk.',
            reaction_ko: '조금은 상관있어요. 밤에 먹는 걸 드시면 책상에서 잠들 수도 있거든요.'
          }
        ],
        reply_line: 'Daytime it is.',
        reply_ko: '그럼 낮에 먹는 걸로 하죠.'
      },
      {
        line: "This store brand has the same active ingredients as the name brand next to it, and it's about five dollars cheaper.",
        line_ko: '이 자체 브랜드는 옆의 유명 브랜드와 유효 성분이 같고, 5달러쯤 더 싸요.',
        prompt: 'Take the cheaper one and ask how often to take it.',
        prompt_ko: '더 싼 걸로 하고 얼마나 자주 먹는지 물어보세요.',
        model: "Then I'll take the store brand. How often do I take it?",
        model_ko: '그럼 자체 브랜드로 할게요. 얼마나 자주 먹어요?',
        distractors: [
          {
            text: "I'd rather have the name brand. The cheap one can't be as strong.",
            text_ko: '유명 브랜드로 할게요. 싼 건 그만큼 세지 않을 거예요.',
            reaction: 'Same ingredients, same strength. Only the box is different.',
            reaction_ko: '성분도 같고 효과도 같아요. 상자만 달라요.'
          },
          {
            text: "Great, I'll take two boxes so I can double up when it gets bad.",
            text_ko: '좋아요, 두 상자 살게요. 심해지면 두 배로 먹게요.',
            reaction: "Please stick to the dose on the box. More won't make you better faster.",
            reaction_ko: '상자에 적힌 양만 드세요. 더 먹는다고 빨리 낫지 않아요.'
          },
          {
            text: 'Can my insurance pay for it? I have my insurance card with me.',
            text_ko: '보험으로 낼 수 있어요? 보험 카드 가져왔어요.',
            reaction: "Insurance doesn't usually cover medicine you buy without a prescription, sorry.",
            reaction_ko: '처방 없이 사는 약은 보통 보험이 안 돼요. 죄송해요.'
          }
        ],
        reply_line: 'Every four to six hours, no more than four doses a day. And drink lots of water.',
        reply_ko: '4~6시간마다 드시고, 하루 네 번을 넘기지 마세요. 물도 많이 드시고요.'
      },
      {
        line: 'If you still have a fever after three days, or you have trouble breathing, see a doctor. The walk-in clinic is right next to us.',
        line_ko: '사흘이 지나도 열이 나거나 숨쉬기가 힘들면 진료를 받으세요. 워크인 클리닉이 바로 옆에 있어요.',
        prompt: "Thank him and say you'll go to the clinic if it doesn't get better.",
        prompt_ko: '고맙다고 하고 낫지 않으면 클리닉에 가겠다고 하세요.',
        model: "Thanks. If it isn't better in a few days, I'll go to the clinic.",
        model_ko: '고마워요. 며칠 지나도 안 나으면 클리닉에 갈게요.',
        distractors: [
          {
            text: "Thanks, but I never go to doctors. I'll just work through it.",
            text_ko: '고맙지만 전 병원에 안 가요. 그냥 일하면서 버틸게요.',
            reaction: "Rest helps more than you'd think. Please don't push it.",
            reaction_ko: '쉬는 게 생각보다 큰 도움이 돼요. 무리하지 마세요.'
          },
          {
            text: 'Thanks, but a clinic must cost a fortune without an appointment.',
            text_ko: '고맙지만 예약 없이 가면 진료비가 엄청 나오겠죠.',
            reaction: "With insurance it's just your copay, and you don't need an appointment.",
            reaction_ko: '보험이 있으면 본인 부담금만 내고, 예약도 필요 없어요.'
          },
          {
            text: 'Thanks. Should I go to the emergency room tonight, just to be safe?',
            text_ko: '고마워요. 혹시 모르니 오늘 밤 응급실에 가 볼까요?',
            reaction: 'The ER is for emergencies, like trouble breathing. For this, rest or the clinic.',
            reaction_ko: '응급실은 숨쉬기 힘들 때 같은 응급 상황에 가는 곳이에요. 지금은 쉬거나 클리닉이면 돼요.'
          }
        ],
        reply_line: 'Feel better, {name}. You can pay for it right here.',
        reply_ko: '얼른 나으세요, {name}. 계산은 여기서 하시면 돼요.'
      }
    ]
  },
  {
    id: 'cl_cold',
    title: 'See the clinic about your cold',
    title_ko: '클리닉에서 감기 진료',
    place: 'clinic',
    npc: 'grace',
    day_from: 16,
    day_to: null,
    time_from: '09:00',
    time_to: '19:00',
    summary: "A walk-in visit for your cold: your ID and insurance card at the front desk, your symptoms, why antibiotics do not help a virus, and a doctor's note for work. You paid the copay for the visit.",
    summary_ko: '감기로 워크인 클리닉에 갔습니다. 접수대에서 신분증과 보험 카드를 내고, 증상을 말하고, 바이러스에는 항생제가 듣지 않는 이유를 듣고, 회사에 낼 진단서를 받았어요. 진료비는 본인 부담금만 냈어요.',
    sort: 920,
    tags: 'errand,clinic,cold',
    hero: 'all',
    turns: [
      {
        situation: 'Fairview Walk-in Clinic, next to the pharmacy. No appointment needed. Grace, the nurse practitioner, is at the front desk.',
        situation_ko: '약국 옆의 페어뷰 워크인 클리닉. 예약 없이 진료받을 수 있어요. 전문 간호사 그레이스가 접수대에 있습니다.',
        line: 'Hi, welcome in. Are you here to be seen today?',
        line_ko: '안녕하세요, 어서 오세요. 오늘 진료받으러 오셨어요?',
        prompt: "Say you'd like to be seen for a cold that won't go away, and hand over your ID and insurance card.",
        prompt_ko: '잘 낫지 않는 감기로 진료받고 싶다고 하고, 신분증과 보험 카드를 건네세요.',
        model: "Yes, please. I've had a cold for days. Here's my ID and insurance card.",
        model_ko: '네. 며칠째 감기가 안 떨어져요. 신분증이랑 보험 카드 여기 있어요.',
        distractors: [
          {
            text: "Yes. I need to see a doctor right away. It's an emergency.",
            text_ko: '네. 당장 의사를 만나야 해요. 응급이에요.',
            reaction: "If it's an emergency, call 911. Otherwise I'll check you in, and we'll see you soon.",
            reaction_ko: '응급이면 911에 전화하세요. 아니면 접수해 드릴게요. 곧 봐 드릴 거예요.'
          },
          {
            text: 'Do I need an appointment? I can come back next week instead.',
            text_ko: '예약해야 해요? 그럼 다음 주에 다시 올게요.',
            reaction: "No appointment needed. That's the point of a walk-in clinic.",
            reaction_ko: '예약 필요 없어요. 그게 워크인 클리닉이에요.'
          },
          {
            text: "Yes, but I didn't bring my insurance card. Can you bill me later?",
            text_ko: '네, 그런데 보험 카드를 안 가져왔어요. 나중에 청구해 주실래요?',
            reaction: "Then you'd pay the full price today. Do you have a photo of the card on your phone?",
            reaction_ko: '그러면 오늘은 전액을 내셔야 해요. 휴대전화에 카드 사진 있어요?'
          }
        ],
        reply_line: "Thanks. Have a seat; it'll be about fifteen minutes.",
        reply_ko: '고마워요. 앉아서 기다리세요. 15분쯤 걸려요.'
      },
      {
        situation: 'Fifteen minutes later, in the exam room. Grace takes your temperature.',
        situation_ko: '15분 뒤, 진료실. 그레이스가 체온을 잽니다.',
        line: "So, what's going on? Tell me how you've been feeling.",
        line_ko: '자, 어디가 불편하세요? 어떻게 아팠는지 말씀해 주세요.',
        prompt: 'Describe your symptoms: a sore throat, a stuffy nose and a cough, but no real fever.',
        prompt_ko: '증상을 말하세요. 목이 아프고 코가 막히고 기침이 나지만 열은 거의 없어요.',
        model: 'A sore throat, a stuffy nose and a cough. No real fever, though.',
        model_ko: '목이 아프고, 코가 막히고, 기침이 나요. 열은 거의 없어요.',
        distractors: [
          {
            text: 'A high fever and chills, and my whole body aches. It hit me all at once.',
            text_ko: '열이 높고 오한이 나고 온몸이 쑤셔요. 한꺼번에 확 왔어요.',
            reaction: "Your temperature is normal, though. What you're describing sounds more like the flu.",
            reaction_ko: '그런데 체온은 정상이에요. 말씀하신 건 독감 증상에 더 가까운데요.'
          },
          {
            text: 'Nothing much, honestly. I mostly need a note for work. Can you just sign one?',
            text_ko: '솔직히 별거 없어요. 회사에 낼 진단서가 필요해서요. 그냥 써 주실래요?',
            reaction: "I'll write a note if you need one, but I have to examine you first.",
            reaction_ko: '필요하면 진단서는 써 드려요. 하지만 먼저 진찰은 해야 해요.'
          },
          {
            text: 'I got caught in the rain this morning, and it started right after that.',
            text_ko: '오늘 아침에 비를 맞았는데, 그 직후에 시작됐어요.',
            reaction: "A cold takes a day or two to show up. And you said it's been a few days, right?",
            reaction_ko: '감기는 걸리고 하루 이틀 지나야 증상이 나타나요. 그리고 며칠 됐다고 하셨잖아요?'
          }
        ],
        reply_line: "Let me look at your throat and listen to your lungs. Your lungs sound clear, and there's no fever.",
        reply_ko: '목 좀 보고 폐 소리 들어 볼게요. 폐 소리 깨끗하고 열도 없네요.'
      },
      {
        line: "It's a viral cold. It should clear up on its own in a few more days.",
        line_ko: '바이러스성 감기예요. 며칠 더 지나면 저절로 나을 거예요.',
        prompt: 'Ask what you can do to feel better in the meantime.',
        prompt_ko: '그동안 나아지려면 어떻게 하면 되는지 물어보세요.',
        model: 'Okay. Is there anything I can do to feel better until then?',
        model_ko: '알겠어요. 그때까지 좀 나아지려면 어떻게 하면 될까요?',
        distractors: [
          {
            text: 'Can you give me antibiotics, then? They always knock out my colds.',
            text_ko: '그럼 항생제 주실 수 있어요? 항생제 먹으면 감기가 늘 뚝 떨어지던데요.',
            reaction: "Antibiotics don't work on viruses. They'd only give you side effects.",
            reaction_ko: '항생제는 바이러스에 안 들어요. 부작용만 생길 거예요.'
          },
          {
            text: 'Great, so I can go running tonight and sweat it out, right?',
            text_ko: '다행이네요. 그럼 오늘 밤에 달리기로 땀 빼면 되겠죠?',
            reaction: "I'd skip hard workouts until you feel better. Your body's busy fighting this.",
            reaction_ko: '나을 때까지 힘든 운동은 쉬세요. 몸이 지금 감기랑 싸우느라 바빠요.'
          },
          {
            text: "So it's nothing. I'll go back to the office this afternoon, then.",
            text_ko: '별거 아니네요. 그럼 오늘 오후에 사무실로 돌아갈게요.',
            reaction: "You can, but you're still contagious for a few days. Rest if you can.",
            reaction_ko: '그래도 되지만 며칠은 아직 옮길 수 있어요. 쉴 수 있으면 쉬세요.'
          }
        ],
        reply_line: 'Rest, lots of fluids, and over-the-counter cold medicine for the symptoms. Honey in warm tea helps the cough.',
        reply_ko: '푹 쉬고, 물 많이 마시고, 증상에는 일반 감기약을 드세요. 기침에는 따뜻한 차에 꿀을 타 드시면 좋아요.'
      },
      {
        line: 'Do you need a note for work?',
        line_ko: '회사에 낼 진단서가 필요하세요?',
        prompt: 'Say yes, a note for the days you were out would help, and thank her.',
        prompt_ko: '네, 쉰 날에 대한 진단서가 있으면 좋겠다고 하고 고맙다고 하세요.',
        model: 'Yes, please. A note for the days I was out would help. Thank you.',
        model_ko: '네, 부탁드려요. 쉰 날에 대한 진단서가 있으면 좋겠어요. 고맙습니다.',
        distractors: [
          {
            text: 'Yes, and could you write that I need two more weeks off?',
            text_ko: '네, 그리고 2주 더 쉬어야 한다고 써 주실 수 있어요?',
            reaction: "I can only write what's true: a few days of rest.",
            reaction_ko: '사실대로만 쓸 수 있어요. 며칠 쉬어야 한다는 것까지요.'
          },
          {
            text: 'Yes. Could you list my symptoms and medicines on it for my boss?',
            text_ko: '네. 상사가 보게 증상이랑 먹는 약도 적어 주실래요?',
            reaction: 'Your health details are private. The note only says you were seen and when you can go back.',
            reaction_ko: '건강 정보는 개인 정보예요. 진단서에는 진료받은 날과 복귀할 수 있는 날만 적어요.'
          },
          {
            text: "No need. My manager will believe me. I'll just say I saw a doctor.",
            text_ko: '필요 없어요. 매니저는 제 말을 믿을 거예요. 의사한테 갔다고만 할게요.',
            reaction: "Some companies ask for one after a few days off. I'll print one just in case.",
            reaction_ko: '며칠 쉬면 진단서를 달라는 회사도 있어요. 혹시 모르니 뽑아 드릴게요.'
          }
        ],
        reply_line: 'Here you go. It says you were seen today and can go back to work when you feel better. Pay the copay at the front desk. Feel better!',
        reply_ko: '여기요. 오늘 진료받았고, 몸이 나아지면 출근해도 된다고 적혀 있어요. 본인 부담금은 접수대에서 내시면 돼요. 얼른 나으세요!'
      }
    ]
  },
  {
    id: 'cl_flu',
    title: 'See the clinic about the flu',
    title_ko: '클리닉에서 독감 진료',
    place: 'clinic',
    npc: 'grace',
    day_from: 16,
    day_to: null,
    time_from: '09:00',
    time_to: '19:00',
    summary: "A walk-in visit with a fever and aches: your ID and insurance card, a quick flu test, what helps (rest, fluids, maybe an antiviral) and what does not (antibiotics), staying home, and a doctor's note for work. You paid the copay for the visit.",
    summary_ko: '열과 몸살로 워크인 클리닉에 갔습니다. 신분증과 보험 카드를 내고, 간단한 독감 검사를 받고, 도움이 되는 것(휴식, 수분, 경우에 따라 항바이러스제)과 듣지 않는 것(항생제), 집에서 쉬어야 한다는 것을 듣고, 회사에 낼 진단서를 받았어요. 진료비는 본인 부담금만 냈어요.',
    sort: 921,
    tags: 'errand,clinic,flu',
    hero: 'all',
    turns: [
      {
        situation: 'Fairview Walk-in Clinic, next to the pharmacy. No appointment needed. Grace, the nurse practitioner, is at the front desk.',
        situation_ko: '약국 옆의 페어뷰 워크인 클리닉. 예약 없이 진료받을 수 있어요. 전문 간호사 그레이스가 접수대에 있습니다.',
        line: 'Hi, welcome in. Oh, you look feverish. Are you here to be seen?',
        line_ko: '안녕하세요, 어서 오세요. 열이 있어 보이네요. 진료받으러 오셨어요?',
        prompt: 'Say you have a fever and aches, and hand over your ID and insurance card.',
        prompt_ko: '열이 나고 몸이 쑤신다고 하고, 신분증과 보험 카드를 건네세요.',
        model: "Yes, please. I have a fever and I ache all over. Here's my ID and insurance card.",
        model_ko: '네. 열이 나고 온몸이 쑤셔요. 신분증이랑 보험 카드 여기 있어요.',
        distractors: [
          {
            text: 'Yes. Can I be seen without my insurance card? I left it at home.',
            text_ko: '네. 보험 카드 없이도 진료받을 수 있어요? 집에 두고 왔어요.',
            reaction: "Then you'd pay the full price. Do you have a photo of the card on your phone?",
            reaction_ko: '그러면 전액을 내셔야 해요. 휴대전화에 카드 사진 있어요?'
          },
          {
            text: "Do I need an appointment? I can come back next week when I'm free.",
            text_ko: '예약해야 해요? 한가한 다음 주에 다시 와도 돼요.',
            reaction: 'With a fever like that, today is better. And no appointment needed here.',
            reaction_ko: '그 정도 열이면 오늘 보는 게 나아요. 여기는 예약도 필요 없어요.'
          },
          {
            text: 'Yes. I need the strongest antibiotics you have, and fast, please.',
            text_ko: '네. 제일 센 항생제가 필요해요. 빨리요.',
            reaction: "Let's see what you have first. Antibiotics only help with bacteria.",
            reaction_ko: '먼저 무슨 병인지 봐요. 항생제는 세균에만 들어요.'
          }
        ],
        reply_line: "Thanks. Put on this mask and have a seat. It won't be long.",
        reply_ko: '고마워요. 이 마스크 쓰고 앉아 계세요. 오래 안 걸려요.'
      },
      {
        situation: 'In the exam room. The thermometer says 102°F.',
        situation_ko: '진료실. 체온계에 39°C 가까이 찍힙니다.',
        line: 'How did it start? Slowly, or all of a sudden?',
        line_ko: '어떻게 시작됐어요? 서서히요, 갑자기요?',
        prompt: 'Say it hit you suddenly: fever, chills and body aches.',
        prompt_ko: '열, 오한, 몸살이 갑자기 왔다고 하세요.',
        model: 'All of a sudden. Fever, chills and body aches, all at once.',
        model_ko: '갑자기요. 열이랑 오한이랑 몸살이 한꺼번에 왔어요.',
        distractors: [
          {
            text: 'Slowly, over a couple of weeks. Mostly just a runny nose.',
            text_ko: '서서히요, 2주쯤에 걸쳐서요. 거의 콧물만 났어요.',
            reaction: "Hmm, your temperature says otherwise. A runny nose doesn't bring a fever of 102.",
            reaction_ko: '음, 체온을 보면 그렇지 않은데요. 콧물만으로 39도까지 오르진 않아요.'
          },
          {
            text: "I'm not sure it's anything. Maybe it's just stress from work.",
            text_ko: '별거 아닌 것 같아요. 그냥 일 스트레스일 수도 있고요.',
            reaction: "Stress doesn't give you a fever of 102. Let's find out what this is.",
            reaction_ko: '스트레스로 39도까지 열이 나진 않아요. 뭔지 알아봐요.'
          },
          {
            text: 'My coworker gave it to me. Can you put that in my file?',
            text_ko: '동료한테 옮았어요. 그거 기록에 남겨 주실 수 있어요?',
            reaction: "I can't blame anyone in your chart. Let's focus on getting you better.",
            reaction_ko: '진료 기록에 누구 탓을 적을 순 없어요. 낫는 데 집중해요.'
          }
        ],
        reply_line: "Let's do a quick flu test, a swab in your nose. ... It's positive.",
        reply_ko: '간단한 독감 검사를 할게요. 코에 면봉을 넣어요. ... 양성이에요.'
      },
      {
        line: "You have the flu. Rest at home until you've gone a full day without a fever.",
        line_ko: '독감이에요. 열 없이 꼬박 하루가 지날 때까지 집에서 쉬세요.',
        prompt: 'Ask if any medicine helps, and whether you should stay home from work.',
        prompt_ko: '도움이 되는 약이 있는지, 회사를 쉬어야 하는지 물어보세요.',
        model: 'Is there any medicine that helps? And should I stay home from work?',
        model_ko: '도움이 되는 약이 있어요? 그리고 회사는 쉬어야 해요?',
        distractors: [
          {
            text: 'Can I still go to work tomorrow if I wear a mask all day?',
            text_ko: '하루 종일 마스크 쓰면 내일 출근해도 돼요?',
            reaction: "Please don't. You'd be contagious, and you need the rest.",
            reaction_ko: '그러지 마세요. 남에게 옮길 수 있고, 지금은 쉬어야 해요.'
          },
          {
            text: 'Can you give me some antibiotics to knock it out quickly?',
            text_ko: '빨리 떨어지게 항생제 좀 주실 수 있어요?',
            reaction: "Antibiotics don't work on the flu. It's a virus.",
            reaction_ko: '독감에는 항생제가 안 들어요. 바이러스예요.'
          },
          {
            text: 'Should I go to the emergency room tonight? It feels that bad.',
            text_ko: '오늘 밤에 응급실에 가야 할까요? 그만큼 아파요.',
            reaction: 'Only if you have trouble breathing or chest pain. Most people get better at home.',
            reaction_ko: '숨쉬기가 힘들거나 가슴이 아플 때만요. 대부분은 집에서 나아요.'
          }
        ],
        reply_line: 'Fever medicine and lots of fluids. In the first two days, an antiviral can shorten it a little. And yes, stay home.',
        reply_ko: '해열제 드시고 물 많이 마시세요. 처음 이틀 안이면 항바이러스제로 조금 빨리 나을 수 있어요. 그리고 네, 집에서 쉬세요.'
      },
      {
        line: 'Do you need a note for work?',
        line_ko: '회사에 낼 진단서가 필요하세요?',
        prompt: "Say yes, a note for the days you'll be out would help, and thank her.",
        prompt_ko: '네, 쉬는 날에 대한 진단서가 있으면 좋겠다고 하고 고맙다고 하세요.',
        model: "Yes, please. A note for the days I'll be out would help. Thank you.",
        model_ko: '네, 부탁드려요. 쉬는 날에 대한 진단서가 있으면 좋겠어요. 고맙습니다.',
        distractors: [
          {
            text: 'Yes, and could you write that I need a whole month off?',
            text_ko: '네, 그리고 한 달 내내 쉬어야 한다고 써 주실 수 있어요?',
            reaction: "I can only write what's true: a few days, until the fever is gone.",
            reaction_ko: '사실대로만 쓸 수 있어요. 열이 내릴 때까지 며칠이요.'
          },
          {
            text: 'Yes. Could you write my test result on it for my manager?',
            text_ko: '네. 매니저가 보게 검사 결과도 적어 주실래요?',
            reaction: 'Your health details are private. The note only says you were seen and when you can go back.',
            reaction_ko: '건강 정보는 개인 정보예요. 진단서에는 진료받은 날과 복귀할 수 있는 날만 적어요.'
          },
          {
            text: "No need. I'll be back at work tomorrow anyway, fever or not.",
            text_ko: '필요 없어요. 열이 있든 없든 내일은 어차피 출근할 거예요.',
            reaction: "Please don't go in with a fever. Here's a note, so you can stay home.",
            reaction_ko: '열이 있으면 출근하지 마세요. 진단서 드릴 테니 집에서 쉬세요.'
          }
        ],
        reply_line: "Here's your note: you were seen today and can go back once you've been fever-free for a day. Anything I prescribe goes to the pharmacy next door. Pay the copay at the front desk.",
        reply_ko: '진단서 여기 있어요. 오늘 진료받았고, 열이 내린 뒤 하루가 지나면 출근해도 된다고 적었어요. 처방하는 약은 옆 약국으로 보내요. 본인 부담금은 접수대에서 내시면 돼요.'
      }
    ]
  }
];

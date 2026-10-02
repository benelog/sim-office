// What comes to your phone (messages: text | email | voicemail | alert, with the replies you can send) and to
// the mailbox at home (mail). hero: all or one hero; every / last_day: it comes back.

export const messages = [
  {
    id: 'cc_offer_jun',
    hero: 'jun',
    day: 16,
    time: '12:10',
    kind: 'email',
    sender: 'Fairview Credit Union',
    subject: 'New to credit in the U.S.? Start here',
    subject_ko: '미국에서 신용을 처음 쌓으시나요? 여기서 시작하세요',
    body: 'Hi {name}, with no U.S. credit history, most card applications are turned down. Our Starter Secured Card is made for that: a $300 deposit becomes your credit limit. Use it a little, pay on time, and we report it to the credit bureaus every month. You can apply under Bank in the app.',
    body_ko: '{name} 님, 미국 신용 기록이 없으면 신용카드 신청은 대부분 거절돼요. 스타터 보증금 신용카드는 그런 분을 위한 카드예요. 보증금 300달러를 맡기면 그만큼이 신용 한도가 되고, 조금씩 쓰고 제때 갚으면 매달 신용평가기관에 보고해 드려요. 앱의 은행 메뉴에서 신청할 수 있어요. (secured card: 보증금을 담보로 하는 신용카드)'
  },
  {
    id: 'cc_tip_derek',
    hero: 'jun',
    day: 17,
    time: '19:10',
    sender: 'derek',
    body: 'Random tip from someone who learned the hard way: get a secured card, put a few small things on it every month, and pay off the whole statement. Your credit score will thank you when you rent your next place.',
    body_ko: '고생해 보고 알게 된 팁 하나 줄게요. 보증금형 신용카드를 만들어서 매달 작은 것만 몇 번 쓰고, 명세서 금액은 전부 갚아요. 다음에 집 구할 때 신용 점수가 큰 도움이 될 거예요.'
  },
  {
    id: 'hy_allhands',
    day: 32,
    time: '17:00',
    sender: 'maya',
    body: 'Thanks for coming to the all-hands today. Reminder: Monday is our first remote day. Log in from home by 9:15, and see you on video at ten.',
    body_ko: '오늘 전사 회의에 와 줘서 고마워요. 잊지 말아요: 월요일이 첫 재택근무 날이에요. 9시 15분까지 집에서 로그인하고, 10시에 화상으로 봐요.'
  },
  {
    id: 'hy_announce',
    day: 22,
    time: '09:30',
    kind: 'email',
    sender: 'linda',
    subject: 'Hybrid work starts November 9',
    subject_ko: '11월 9일부터 하이브리드 근무',
    body: 'Hi everyone, starting Monday, November 9, Seaside Labs goes hybrid. Tuesday to Thursday are office days. On Mondays and Fridays you work from home: log in at your desk at home by 9:15, the same as badging in, and stay online until at least 4. Standups on those days are video calls. Sprint planning moves to Tuesdays and the retro to Thursdays, so we can do them in person. The office stays open every day, and Tom and Sam are on site if you would rather come in. Questions? Ask me or your manager. Linda, HR',
    body_ko: '안녕하세요, 11월 9일 월요일부터 시사이드 랩스는 하이브리드 근무를 시작합니다. 화요일부터 목요일까지는 사무실에 나옵니다. 월요일과 금요일은 집에서 일합니다. 출입증을 찍을 때처럼 9시 15분까지 집 책상에서 로그인하고, 적어도 4시까지는 접속해 있어 주세요. 그날 스탠드업은 화상으로 합니다. 스프린트 계획은 화요일, 회고는 목요일로 옮겨 직접 만나서 합니다. 사무실은 매일 열려 있고, 나오고 싶으면 톰과 샘이 자리에 있습니다. 궁금한 점은 저나 매니저에게 물어보세요. 인사팀 린다'
  },
  {
    id: 'hy_first',
    day: 36,
    time: '07:40',
    sender: 'maya',
    body: 'Morning! First remote day. Log in by 9:15, and see you at standup at ten.',
    body_ko: '좋은 아침이에요! 첫 재택근무 날이에요. 9시 15분까지 로그인하고, 10시 스탠드업에서 봐요.'
  },
  {
    id: 'hy_maya',
    day: 22,
    time: '11:40',
    sender: 'maya',
    body: "Hi {name}, did you see Linda's email? Hybrid starts November 9. I'm excited about it. Just treat 9:15 on home days like you would at the office, and keep your camera on for standup.",
    body_ko: '{name}, 린다 메일 봤어요? 11월 9일부터 하이브리드예요. 기대돼요. 집에서 일하는 날에도 9시 15분은 사무실처럼 지켜 주고, 스탠드업 때는 카메라를 켜 줘요.'
  },
  {
    id: 'hy_review',
    day: 91,
    time: '18:30',
    sender: 'maya',
    body: "Quick note about tomorrow, {name}: I know Monday is a remote day, but let's do your review in person. Work from home in the morning and come by my office at 3:30.",
    body_ko: '{name}, 내일 얘기 잠깐 할게요. 월요일이 재택하는 날인 건 알지만 평가는 직접 만나서 해요. 오전엔 집에서 일하고 3시 30분에 내 방으로 와 줘요.'
  },
  {
    id: 'hy_sam',
    day: 33,
    time: '11:00',
    kind: 'email',
    sender: 'sam',
    subject: 'Working from home: a quick checklist',
    subject_ko: '재택근무 체크리스트',
    body: "Before Monday, please: 1) connect to the VPN once from home and make sure it works, 2) test your camera and mic, 3) use your home Wi-Fi, not a coffee shop's, and 4) lock your laptop whenever you step away. If something breaks, file a help desk ticket and I'll call you back. Sam, IT",
    body_ko: '월요일 전에 꼭 해 주세요. 1) 집에서 VPN에 한 번 접속해 잘 되는지 확인하기, 2) 카메라와 마이크 테스트하기, 3) 카페 와이파이가 아니라 집 와이파이 쓰기, 4) 자리를 비울 때마다 노트북 잠그기. 문제가 생기면 헬프데스크 티켓을 올려 주세요. 제가 전화드릴게요. IT 샘'
  },
  {
    id: 'm01_bank',
    day: 1,
    time: '07:20',
    kind: 'alert',
    sender: 'Fairview Credit Union',
    body: 'Alerts are on for checking ···4821. We will text you about deposits, autopay and low balances. Reply STOP to opt out.',
    body_ko: '입출금 계좌 ···4821의 알림이 켜졌습니다. 입금, 자동이체, 잔액 부족을 문자로 알려 드립니다. 받지 않으려면 STOP이라고 답장하세요.'
  },
  {
    id: 'm01_carl',
    hero: 'jun',
    day: 1,
    time: '18:40',
    sender: 'carl',
    body: "Hi {name}, it's Carl from 1A. Trash and recycling go out Thursday morning. The bins are behind the building.",
    body_ko: '안녕하세요, 1A호 칼이에요. 쓰레기와 재활용품은 목요일 아침에 내놓아요. 수거함은 건물 뒤에 있어요.',
    replies: [
      {
        label: 'Thanks, Carl! Good to know. I will put them out Wednesday night.',
        label_ko: '고마워요, 칼! 덕분에 알았어요. 수요일 밤에 내놓을게요.',
        tip_ko: '고마움을 표하고 할 일을 덧붙이면 더 친절해요.',
        answer: 'You are welcome! Welcome to the building.',
        answer_ko: '별말씀을요! 이 건물에 오신 걸 환영해요.',
        delay: 8
      },
      {
        label: 'Ok thank you.',
        label_ko: '네 고마워요.',
        tone: 'ok',
        tip_ko: '공손하지만 짧아요. 이웃이라면 한마디 더 붙이면 좋아요.',
        answer: 'Anytime.',
        answer_ko: '언제든지요.',
        delay: 8
      },
      {
        label: 'Why are you telling me this?',
        label_ko: '왜 저한테 이걸 알려 주세요?',
        tone: 'poor',
        tip_ko: '도와주려던 이웃에게 퉁명스럽게 들려요.',
        answer: 'Oh, sorry. I just thought it might help. Never mind!',
        answer_ko: '아, 미안해요. 도움이 될까 해서요. 신경 쓰지 마세요!',
        delay: 8
      }
    ]
  },
  {
    id: 'm01_lofts',
    hero: 'priya',
    day: 1,
    time: '18:40',
    kind: 'email',
    sender: 'Cedar Street Lofts',
    subject: 'Elevator maintenance on Wednesday',
    subject_ko: '수요일 엘리베이터 점검',
    body: 'The elevator will be out of service Wednesday from 9 to 11 AM for maintenance. We apologize for the inconvenience.',
    body_ko: '엘리베이터는 점검 때문에 수요일 오전 9시부터 11시까지 운행하지 않습니다. 불편을 드려 죄송합니다. (out of service: 운행 중지)'
  },
  {
    id: 'm01_tom',
    day: 1,
    time: '13:10',
    kind: 'email',
    sender: 'tom',
    subject: 'Lunch & Learn this month',
    subject_ko: '이달의 런치 앤드 런',
    body: "Hi all, this month's Lunch & Learn is on the 29th at noon. Pizza is on us. Please RSVP by the 27th so I can get a headcount.",
    body_ko: '여러분, 이달의 런치 앤드 런은 29일 정오입니다. 피자는 회사가 삽니다. 인원을 파악할 수 있게 27일까지 참석 여부를 알려 주세요. (RSVP: 참석 여부 회신, headcount: 인원수)',
    replies: [
      {
        label: 'Hi Tom, count me in for the 29th. Thanks for organizing!',
        label_ko: '톰, 29일에 참석할게요. 준비해 줘서 고마워요!',
        tip_ko: '"Count me in"은 참석하겠다는 자연스러운 말이에요.',
        answer: 'Great, you are on the list! See you there.',
        answer_ko: '좋아요, 명단에 넣었어요! 그날 봐요.',
        delay: 30
      },
      {
        label: 'I come to lunch. Yes.',
        label_ko: '점심에 가요. 네.',
        tone: 'ok',
        tip_ko: "뜻은 통하지만 어색해요. \"I'll be there.\" 또는 \"Count me in.\"이 좋아요.",
        answer: 'Got it, thanks.',
        answer_ko: '알겠어요, 고마워요.',
        delay: 30
      },
      {
        label: "Thanks for the invite, Tom, but I can't make it that day. Save me a slice!",
        label_ko: '초대 고맙지만 그날은 못 가요, 톰. 피자 한 조각 남겨 줘요!',
        tip_ko: "\"I can't make it\"은 정중하게 거절할 때 써요.",
        answer: 'No problem! I will save you a slice.',
        answer_ko: '괜찮아요! 한 조각 남겨 둘게요.',
        delay: 30
      }
    ]
  },
  {
    id: 'm01_waste',
    hero: 'derek',
    day: 1,
    time: '18:40',
    sender: 'Fairview Waste Services',
    body: 'Reminder: trash and recycling pickup on River Road is Thursday. Carts at the curb by 7 AM.',
    body_ko: '알림: 리버 로드의 쓰레기·재활용 수거는 목요일입니다. 오전 7시까지 수거통을 길가에 내놓으세요. (curb: 보도 가장자리)'
  },
  {
    id: 'm02_cu_atm',
    day: 2,
    time: '08:15',
    kind: 'email',
    sender: 'Fairview Credit Union',
    subject: 'Skip the ATM fees',
    subject_ko: '수수료 없이 현금 찾기',
    body: "Need cash? Our ATM on Lake Avenue, next to the coffee cart, is free for members around the clock and takes deposits. Other banks' ATMs charge their own fee, usually $3 or more. You can also ask for cash back when you pay with your debit card at Fairview Market.",
    body_ko: '현금이 필요하세요? 커피 카트 옆, 레이크 애비뉴에 있는 저희 ATM은 조합원이면 24시간 수수료 없이 쓸 수 있고 입금도 됩니다. 다른 은행의 ATM은 보통 3달러 이상의 자체 수수료를 받습니다. 페어뷰 마켓에서 체크카드로 계산할 때 캐시백을 받으셔도 됩니다.'
  },
  {
    id: 'm02_dental',
    day: 2,
    time: '16:30',
    sender: 'Fairview Dental',
    body: 'Hi {name}, this is a reminder of your cleaning on Oct 20 at 8:30 AM. Reply C to confirm, or call us to reschedule.',
    body_ko: '10월 20일 오전 8시 30분 스케일링 예약을 알려 드립니다. 확정하려면 C라고 답장하고, 날짜를 바꾸려면 전화 주세요. (cleaning: 스케일링, reschedule: 일정 변경)',
    replies: [
      {
        label: 'C',
        label_ko: 'C',
        tip_ko: '자동 문자는 안내한 글자 그대로 답해야 알아들어요.',
        answer: 'Thanks! Your cleaning is confirmed for Oct 20 at 8:30 AM. See you then.',
        answer_ko: '감사합니다! 10월 20일 오전 8시 30분 스케일링이 확정되었습니다.',
        delay: 1
      },
      {
        label: 'Thanks! I need to reschedule. Can I call you tomorrow?',
        label_ko: '고마워요! 일정을 바꿔야 해요. 내일 전화해도 될까요?',
        tone: 'ok',
        tip_ko: '자동 문자는 이런 문장을 못 알아들어요. 일정 변경은 전화로 해요.',
        answer: 'Sorry, we did not understand your reply. Reply C to confirm, or call us to reschedule.',
        answer_ko: '죄송합니다, 답장을 이해하지 못했어요. 확정은 C, 변경은 전화 주세요.',
        delay: 1
      }
    ]
  },
  {
    id: 'm02_spam',
    day: 2,
    time: '10:15',
    kind: 'voicemail',
    sender: 'Unknown caller',
    body: "We have been trying to reach you about your car's extended warranty. Press 1 to speak to a representative.",
    body_ko: '자동차 보증 연장 건으로 연락드렸습니다. 상담원과 통화하려면 1번을 누르세요. (미국에서 아주 흔한 스팸 전화입니다. 그냥 지우세요.)',
    replies: [
      {
        label: 'Delete the voicemail.',
        label_ko: '음성 메시지를 지운다.',
        tip_ko: '자동차 보증 전화는 미국에서 가장 흔한 스팸이에요. 무시하세요.',
        delay: 0
      },
      {
        label: 'Call the number back.',
        label_ko: '그 번호로 다시 전화한다.',
        tone: 'poor',
        tip_ko: '스팸 번호는 대개 없는 번호거나 또 다른 스팸으로 이어져요.',
        answer: 'The number you have reached is not in service. Please check the number and try again.',
        answer_ko: '연결하신 번호는 사용되지 않는 번호입니다. 번호를 확인하고 다시 걸어 주세요.',
        answer_from: 'Recording',
        delay: 0
      }
    ]
  },
  {
    id: 'm03_sam',
    day: 3,
    time: '09:40',
    kind: 'email',
    sender: 'sam',
    subject: 'Your password expires in 5 days',
    subject_ko: '비밀번호가 5일 뒤 만료됩니다',
    body: "Your network password expires in 5 days. Change it from the login screen: at least 12 characters, and don't reuse an old one. IT will never ask for your password by email.",
    body_ko: '네트워크 비밀번호가 5일 뒤에 만료됩니다. 로그인 화면에서 바꾸세요. 12자 이상이어야 하고 예전 것을 다시 쓰면 안 됩니다. IT 팀은 이메일로 비밀번호를 묻지 않습니다. (expire: 만료되다)'
  },
  {
    id: 'm03_weather',
    day: 3,
    time: '07:05',
    kind: 'alert',
    sender: 'Fairview Weather',
    body: 'Rain today, heavy at times. Allow extra time for your commute and bring an umbrella.',
    body_ko: '오늘은 비가 오고 때때로 세차게 내립니다. 출근 시간을 넉넉히 잡고 우산을 챙기세요.'
  },
  {
    id: 'm04_city',
    day: 4,
    time: '07:10',
    kind: 'alert',
    sender: 'City of Fairview',
    body: 'Street sweeping on Maple Street today, 8 to 10 AM. Cars parked on the street will be ticketed.',
    body_ko: '오늘 오전 8시부터 10시까지 메이플 스트리트 도로 청소가 있습니다. 길에 세워 둔 차에는 딱지를 뗍니다. (be ticketed: 딱지를 떼이다)'
  },
  {
    id: 'm04_dad_priya',
    hero: 'priya',
    day: 4,
    time: '19:30',
    sender: 'Dad',
    body: 'Call me this weekend? I want to show you the garden. The tomatoes finally came in.',
    body_ko: '이번 주말에 전화할래? 텃밭을 보여 주고 싶구나. 토마토가 드디어 열렸단다.',
    replies: [
      {
        label: 'Yes! I would love to see the garden. I will video call you Saturday morning.',
        label_ko: '네! 텃밭 보고 싶어요. 토요일 아침에 영상 통화할게요.',
        tip_ko: '"I would love to"는 정말 하고 싶다는 따뜻한 표현이에요.',
        answer: 'Wonderful! I will hold the phone up to the tomatoes.',
        answer_ko: '좋구나! 토마토에 전화기를 갖다 대 줄게.',
        delay: 7
      },
      {
        label: 'Ok, Dad.',
        label_ko: '네, 아빠.',
        tone: 'ok',
        tip_ko: '짧아도 괜찮지만 반가움을 한마디 더하면 좋아요.',
        answer: 'Talk this weekend then! Love you.',
        answer_ko: '그럼 주말에 얘기하자! 사랑한다.',
        delay: 7
      },
      {
        label: 'Tomatoes already? Send me a photo now, Dad!',
        label_ko: '벌써 토마토가요? 지금 사진 보내 주세요, 아빠!',
        tip_ko: '놀라움을 표현하며 대화를 이어 가는 답장이에요.',
        answer: 'Here it comes. Are they not beautiful?',
        answer_ko: '자, 보낸다. 예쁘지 않니?',
        delay: 7
      }
    ]
  },
  {
    id: 'm04_mom_jun',
    hero: 'jun',
    day: 4,
    time: '19:30',
    sender: 'Mom',
    body: 'How is the new job? Are you eating well? Call us on Sunday. Dad says hi.',
    body_ko: '새 직장은 어떠니? 밥은 잘 챙겨 먹고? 일요일에 전화하렴. 아빠가 안부 전한다. (say hi: 안부를 전하다)',
    replies: [
      {
        label: 'Work is going well, Mom! I am eating fine. I will call on Sunday. Love you!',
        label_ko: '일은 잘 되고 있어요, 엄마! 밥도 잘 먹어요. 일요일에 전화할게요. 사랑해요!',
        tip_ko: '안부 질문마다 하나씩 답하면 걱정을 덜어 드려요.',
        answer: 'So proud of you! Love you too.',
        answer_ko: '정말 자랑스럽구나! 나도 사랑해.',
        delay: 5
      },
      {
        label: 'Fine.',
        label_ko: '괜찮아요.',
        tone: 'poor',
        tip_ko: '"Fine."만 보내면 퉁명스럽게 들려요.',
        answer: 'Just fine? Please call us on Sunday. 😊',
        answer_ko: '그냥 괜찮다고? 일요일에 꼭 전화하렴.',
        delay: 5
      },
      {
        label: 'Busy, but good. Can we talk Sunday evening?',
        label_ko: '바쁘지만 좋아요. 일요일 저녁에 통화할까요?',
        tip_ko: '시간을 제안하면 약속이 분명해져요.',
        answer: 'Of course! Sunday evening works. Dad will be happy.',
        answer_ko: '물론이지! 일요일 저녁 좋아. 아빠가 좋아하시겠다.',
        delay: 5
      }
    ]
  },
  {
    id: 'm04_parcel',
    day: 4,
    time: '14:20',
    sender: 'Parcel Express',
    body: 'Your package was delivered at 2:14 PM and left at the front door. Thanks for shipping with us!',
    body_ko: '소포가 오후 2시 14분에 배달되어 현관 앞에 놓였습니다.'
  },
  {
    id: 'm04_sis_derek',
    hero: 'derek',
    day: 4,
    time: '19:30',
    sender: 'Elena (sister)',
    body: 'Are you still coming for Thanksgiving? Mom is already planning the menu. Let me know so I can save you a seat!',
    body_ko: '추수감사절에 오는 거 맞지? 엄마가 벌써 메뉴를 짜고 계셔. 자리 맡아 둘 테니 알려 줘!',
    replies: [
      {
        label: 'Yes, I will be there! Save me a seat, and tell Mom I will bring dessert.',
        label_ko: '응, 갈게! 자리 맡아 주고, 엄마께 디저트는 내가 가져간다고 전해 줘.',
        tip_ko: '"Save me a seat"는 자리를 맡아 달라는 말이에요.',
        answer: 'Yay! Mom will be thrilled. Pecan pie?',
        answer_ko: '야호! 엄마가 좋아하시겠다. 피칸 파이?',
        delay: 6
      },
      {
        label: 'I am still checking my schedule. Can I let you know next week?',
        label_ko: '아직 일정을 보는 중이야. 다음 주에 알려 줘도 될까?',
        tip_ko: '"Let you know"는 나중에 알려 주겠다는 뜻이에요.',
        answer: 'Sure, but do not wait too long. Mom needs a headcount!',
        answer_ko: '그래, 하지만 너무 미루지 마. 엄마가 인원수를 알아야 해!',
        delay: 6
      },
      {
        label: 'Maybe.',
        label_ko: '아마도.',
        tone: 'poor',
        tip_ko: '"Maybe."만 보내면 성의 없이 들려요. 언제 알려 줄지 덧붙이세요.',
        answer: 'Maybe? Come on, give me a real answer soon!',
        answer_ko: '아마도? 얼른 확실히 답해 줘!',
        delay: 6
      }
    ]
  },
  {
    id: 'm05_derek',
    day: 5,
    time: '16:45',
    sender: 'derek',
    body: 'Heads up: the build is green again. Nothing to worry about over the weekend. Have a good one!',
    body_ko: '참고로 빌드가 다시 정상이에요. 주말 동안 걱정할 일 없어요. 잘 보내요! (heads up: 미리 알려 주는 말)',
    replies: [
      {
        label: 'Thanks for the heads up, Derek. Have a great weekend!',
        label_ko: '미리 알려 줘서 고마워요, 데릭. 좋은 주말 보내요!',
        tip_ko: '"Thanks for the heads up"은 미리 알려 준 사람에게 하는 인사예요.',
        answer: 'You too!',
        answer_ko: '당신도요!',
        delay: 4
      },
      {
        label: 'Great news. Do you need anyone on standby, just in case?',
        label_ko: '좋은 소식이네요. 혹시 모르니 대기할 사람이 필요한가요?',
        tip_ko: '"Just in case"는 혹시 몰라서라는 뜻이에요.',
        answer: 'Nope, all good. Enjoy your weekend.',
        answer_ko: '아뇨, 괜찮아요. 주말 잘 보내요.',
        delay: 4
      }
    ]
  },
  {
    id: 'm05_linda',
    day: 5,
    time: '10:00',
    kind: 'email',
    sender: 'linda',
    subject: 'Open enrollment starts Monday',
    subject_ko: '월요일부터 보험 정기 가입 기간',
    body: 'Open enrollment for health, dental and vision runs October 12 through 23 in the HR portal. Our plans change on November 1, so nothing carries over this year: if you do nothing, you will get the Basic HMO with no dental or vision. Questions? My door is always open.',
    body_ko: '건강·치과·안과 보험의 정기 가입 기간은 10월 12일부터 23일까지이고, HR 포털에서 합니다. 11월 1일에 플랜이 바뀌어서 올해는 지금 보험이 이어지지 않습니다. 아무것도 하지 않으면 치과·안과 보험 없이 베이식 HMO에 가입됩니다. 궁금한 점이 있으면 언제든 찾아오세요. (open enrollment: 보험 정기 가입 기간, carry over: 이어지다)'
  },
  {
    id: 'm05_northpine',
    day: 5,
    time: '19:30',
    kind: 'email',
    sender: 'Northpine',
    subject: 'Everyday essentials, delivered',
    subject_ko: '생활용품을 문 앞까지',
    body: 'Welcome to Northpine! Order laundry pods, pantry staples and more from your phone, and get them in about two business days. Shipping is free on orders of $35 or more.',
    body_ko: '노스파인에 오신 것을 환영합니다! 세탁 세제, 식료품 같은 생활용품을 휴대전화로 주문하면 영업일 기준 약 2일 만에 받아 보실 수 있습니다. 35달러 이상 주문하면 배송비가 무료입니다.'
  },
  {
    id: 'm06_farmers',
    day: 6,
    time: '07:30',
    kind: 'email',
    sender: 'Seaside Park Farmers Market',
    subject: 'Market day!',
    subject_ko: '오늘은 장날!',
    body: "We're open today and tomorrow from 8 AM to 1 PM along the Seaside Park fence on Maple Street: peaches, honey, cider, sourdough and kettle corn. The stands take cash only, so stop by an ATM first.",
    body_ko: '오늘과 내일 오전 8시부터 오후 1시까지 메이플 스트리트의 시사이드 공원 울타리를 따라 장이 섭니다. 복숭아, 꿀, 애플 사이더, 사워도우, 케틀콘이 있어요. 가판대는 현금만 받으니 ATM에 먼저 들르세요.',
    every: 7
  },
  {
    id: 'm06_market',
    day: 6,
    time: '09:00',
    kind: 'email',
    sender: 'Fairview Market',
    subject: "This week's deals",
    subject_ko: '이번 주 할인 상품',
    body: 'Strawberries are buy one, get one free. Rain in the forecast? Compact umbrellas are in aisle 3. Prices are good through Sunday.',
    body_ko: '딸기는 하나 사면 하나 더 드립니다. 비 예보가 있나요? 접이식 우산은 3번 통로에 있습니다. 행사 가격은 일요일까지입니다. (aisle: 통로, good through: ~까지 유효)'
  },
  {
    id: 'm07_tom',
    day: 7,
    time: '18:00',
    kind: 'email',
    sender: 'tom',
    subject: 'Monday is a regular workday',
    subject_ko: '월요일은 정상 근무일입니다',
    body: 'Reminder: the office is open tomorrow. It is a federal holiday, so banks and the post office are closed and the buses run on the weekend timetable. Plan your commute!',
    body_ko: '알림: 내일 사무실은 정상 근무입니다. 연방 공휴일이라 은행과 우체국은 쉬고 버스는 주말 시간표로 다닙니다. 출근 계획을 세우세요!'
  },
  {
    id: 'm08_enroll',
    day: 8,
    time: '08:30',
    kind: 'email',
    sender: 'linda',
    subject: 'Open enrollment is open',
    subject_ko: '복리후생 정기 가입 시작',
    body: "Open enrollment is open in the HR portal until Friday, October 23. Pick a medical plan (Basic HMO, Choice PPO or Saver HSA), and dental and vision if you want them. The new plans start November 1, and the premiums come out of your paycheck before tax. If you don't submit anything, you'll get the Basic HMO with no dental or vision. You can open the portal from your phone or your work record.",
    body_ko: 'HR 포털에서 10월 23일 금요일까지 복리후생 정기 가입을 받습니다. 의료 보험(베이식 HMO, 초이스 PPO, 세이버 HSA 중 하나)을 고르고, 원하면 치과·안과 보험도 고르세요. 새 플랜은 11월 1일에 시작하고, 보험료는 급여에서 세전으로 빠집니다. 아무것도 제출하지 않으면 치과·안과 보험 없이 베이식 HMO에 가입됩니다. 포털은 휴대전화나 근무 기록에서 열 수 있어요. (premium: 보험료)'
  },
  {
    id: 'm08_fog',
    day: 8,
    time: '06:50',
    kind: 'alert',
    sender: 'Fairview Weather',
    body: 'Dense fog advisory until 10 AM. Slow down and use your low beams.',
    body_ko: '오전 10시까지 짙은 안개 주의보. 속도를 줄이고 하향등을 켜세요. (advisory: 주의보, low beams: 하향등)'
  },
  {
    id: 'm09_linda_vm',
    day: 9,
    time: '15:15',
    kind: 'voicemail',
    sender: 'linda',
    body: "Hi {name}, it's Linda from HR. I need your signature on one more form for your benefits enrollment. Could you stop by my office when you have a minute? Thanks!",
    body_ko: '안녕하세요, 인사팀 린다예요. 복리후생 가입 서류에 서명이 하나 더 필요해요. 시간 될 때 제 사무실에 들러 주실래요? 고마워요! (stop by: 잠깐 들르다)',
    replies: [
      {
        label: 'Hi Linda, it is {name}. I got your message. I will stop by tomorrow morning around nine. Does that work?',
        label_ko: '린다, 저 {name}이에요. 메시지 받았어요. 내일 아침 아홉 시쯤 들를게요. 괜찮으세요?',
        tip_ko: '회신 전화의 흐름: 누구인지, 왜 걸었는지, 제안을 차례로 말했어요.',
        answer: 'That works. I will have the form ready. Thanks, {name}!',
        answer_ko: '좋아요. 서류를 준비해 둘게요. 고마워요, {name}!',
        answer_from: 'linda',
        delay: 0
      },
      {
        label: 'Hi Linda, {name} here. Sorry I missed your call. Is now a good time to swing by?',
        label_ko: '린다, {name}이에요. 전화를 못 받아 미안해요. 지금 들러도 될까요?',
        tip_ko: '"Swing by"는 가볍게 들르다예요. "Is now a good time?"으로 상대 사정을 물어요.',
        answer: 'Sure, come on by! I am at my desk.',
        answer_ko: '그럼요, 오세요! 저 자리에 있어요.',
        answer_from: 'linda',
        delay: 0
      },
      {
        label: 'What form? I already did everything.',
        label_ko: '무슨 서류요? 다 했는데요.',
        tone: 'poor',
        tip_ko: '틀린 말은 아니지만 퉁명스러워요. "Which form is it?"이 부드러워요.',
        answer: 'Oh, it is a small one. The insurance company needs a second signature. It will not take long.',
        answer_ko: '아, 작은 거예요. 보험사가 서명을 하나 더 원해요. 오래 안 걸려요.',
        answer_from: 'linda',
        delay: 0
      }
    ]
  },
  {
    id: 'm09_sam',
    day: 9,
    time: '15:00',
    kind: 'email',
    sender: 'sam',
    subject: 'Phishing test results',
    subject_ko: '모의 피싱 결과',
    body: "Thanks to everyone who reported last week's test email. If you clicked the link, you will get a short training. When in doubt, forward it to IT.",
    body_ko: '지난주 모의 피싱 메일을 신고해 주신 분들 고맙습니다. 링크를 누른 분은 짧은 교육을 받게 됩니다. 의심스러우면 IT 팀으로 전달하세요. (when in doubt: 의심스러울 때는)'
  },
  {
    id: 'm09_scam',
    day: 9,
    time: '11:20',
    sender: '+1 (555) 0142',
    body: 'FINAL NOTICE: Your package is on hold. Confirm your address within 24 hours at the link below or it will be returned.',
    body_ko: '최종 통지: 소포가 보류 중입니다. 24시간 안에 아래 링크에서 주소를 확인하지 않으면 반송됩니다. (피싱 문자입니다. 링크를 누르지 말고 지우세요.)',
    replies: [
      {
        label: 'Delete the text and block the number.',
        label_ko: '문자를 지우고 번호를 차단한다.',
        tip_ko: '모르는 번호의 링크는 누르지 말고 지우세요. 택배사는 링크로 주소를 확인하라고 하지 않아요.',
        delay: 0
      },
      {
        label: 'Tap the link to confirm your address.',
        label_ko: '링크를 눌러 주소를 확인한다.',
        tone: 'poor',
        tip_ko: '피싱 문자예요. 링크를 누르면 개인 정보를 빼 가려고 해요.',
        answer: 'Fraud alert: we blocked a charge of $499.00 on your debit card. If this was not you, no action is needed.',
        answer_ko: '사기 알림: 체크카드에서 499달러 결제 시도를 막았습니다. 본인이 아니라면 따로 하실 일은 없습니다.',
        answer_from: 'Fairview Credit Union',
        delay: 12
      },
      {
        label: 'STOP',
        label_ko: 'STOP',
        tone: 'poor',
        tip_ko: '스팸에 답하면 이 번호가 살아 있다고 알려 주는 셈이에요.',
        answer: 'Thanks for replying! Your number is now verified.',
        answer_ko: '답장 고마워요! 이제 번호가 확인되었습니다.',
        answer_from: '+1 (555) 0142',
        delay: 5
      }
    ]
  },
  {
    id: 'm10_airline',
    hero: 'jun',
    day: 10,
    time: '17:00',
    kind: 'email',
    sender: 'Crestline Air',
    subject: 'Check in for your flight to Ridgeport',
    subject_ko: '리지포트행 항공편 체크인 안내',
    body: 'It is time to check in for your flight tomorrow. Check in now to get your boarding pass. Checked bags must be dropped off at least 45 minutes before departure.',
    body_ko: '내일 항공편의 체크인이 시작되었습니다. 지금 체크인하고 탑승권을 받으세요. 부치는 짐은 출발 45분 전까지 맡겨야 합니다. (boarding pass: 탑승권)'
  },
  {
    id: 'm10_linda',
    day: 10,
    time: '09:30',
    kind: 'email',
    sender: 'linda',
    subject: 'Flu shots next Wednesday',
    subject_ko: '다음 주 수요일 독감 예방주사',
    body: 'Free flu shots in the lobby next Wednesday, 10 AM to 2 PM. Bring your insurance card. Walk-ins are welcome.',
    body_ko: '다음 주 수요일 오전 10시부터 오후 2시까지 로비에서 독감 예방주사를 무료로 놓아 드립니다. 보험 카드를 가져오세요. 예약 없이 와도 됩니다. (flu shot: 독감 주사, walk-in: 예약 없이 오는 사람)'
  },
  {
    id: 'm10_pharmacy',
    day: 10,
    time: '15:40',
    kind: 'voicemail',
    sender: 'Fairview Pharmacy',
    body: 'Hello, this is Fairview Pharmacy calling for {name}. Your prescription is ready for pickup. We are open until 7 PM today. Please bring your ID.',
    body_ko: '안녕하세요, 페어뷰 약국입니다. 처방약이 준비되었습니다. 오늘은 오후 7시까지 엽니다. 신분증을 가져오세요. (prescription: 처방약, pickup: 찾아가기)',
    replies: [
      {
        label: 'Hi, I am returning your call. I will pick up my prescription after work. Are you open until seven?',
        label_ko: '회신 전화드려요. 퇴근 후에 처방약을 찾으러 갈게요. 7시까지 여나요?',
        tip_ko: '"Returning your call"은 걸려 온 전화에 회신할 때 쓰는 말이에요.',
        answer: 'Yes, we are open until seven. Just bring your ID and your insurance card.',
        answer_ko: '네, 7시까지 엽니다. 신분증과 보험 카드를 가져오세요.',
        answer_from: 'Fairview Pharmacy',
        delay: 0
      },
      {
        label: 'Hi, this is {name}. Could you hold the prescription until tomorrow?',
        label_ko: '{name}입니다. 처방약을 내일까지 보관해 주실 수 있나요?',
        tip_ko: '"Hold"는 맡아 두다예요. "Could you...?"는 정중한 부탁이에요.',
        answer: 'Sure, we can hold it for seven days. Just come by when you can.',
        answer_ko: '그럼요, 7일 동안 보관해 드려요. 편할 때 오세요.',
        answer_from: 'Fairview Pharmacy',
        delay: 0
      }
    ]
  },
  {
    id: 'm11_tom',
    day: 11,
    time: '08:45',
    kind: 'email',
    sender: 'tom',
    subject: 'Fridge cleanout on Friday',
    subject_ko: '금요일 냉장고 정리',
    body: 'Anything left in the kitchen fridge after 4 PM on Friday gets tossed. Please label your food. Thanks for keeping the kitchen clean!',
    body_ko: '금요일 오후 4시 이후에 탕비실 냉장고에 남은 것은 모두 버립니다. 음식에 이름을 적어 두세요. (get tossed: 버려지다)'
  },
  {
    id: 'm12_dental_vm',
    day: 12,
    time: '10:20',
    kind: 'voicemail',
    sender: 'Fairview Dental',
    body: "Hi {name}, this is Amy at Fairview Dental. I'm calling about your cleaning on the 20th. We need to move it to 10:30 AM. Please give us a call back at your convenience. Thanks!",
    body_ko: '안녕하세요, 페어뷰 치과의 에이미예요. 20일 스케일링을 오전 10시 30분으로 옮겨야 해요. 편하실 때 다시 전화 주세요. 고맙습니다! (call back: 회신 전화하다, at your convenience: 편하실 때)',
    replies: [
      {
        label: "Hi, this is {name}, returning Amy's call. Ten thirty works for me.",
        label_ko: '{name}인데 에이미 전화에 회신해요. 10시 30분 좋아요.',
        tip_ko: '이름, 용건, 답을 한 번에 말하면 통화가 빨리 끝나요.',
        answer: 'Perfect, thank you! I have moved you to 10:30 AM on the 20th. See you then.',
        answer_ko: '좋아요, 감사합니다! 20일 오전 10시 30분으로 옮겼어요. 그때 봬요.',
        answer_from: 'Fairview Dental',
        delay: 0
      },
      {
        label: 'Hi, this is {name}. Ten thirty is tough because I am at work. Do you have anything after five?',
        label_ko: '{name}입니다. 10시 30분은 일하는 시간이라 어려워요. 5시 이후에 자리가 있나요?',
        tip_ko: '"Do you have anything after five?"는 다른 시간을 묻는 자연스러운 표현이에요.',
        answer: 'Let me check. Yes, we have 5:15 that day. Would you like it?',
        answer_ko: '확인해 볼게요. 그날 5시 15분이 있어요. 그 시간으로 할까요?',
        answer_from: 'Fairview Dental',
        delay: 0
      },
      {
        label: 'I get your call. Time is bad.',
        label_ko: '전화 받았어요. 시간은 나빠요.',
        tone: 'poor',
        tip_ko: "뜻이 분명하지 않아요. \"That time doesn't work for me.\"라고 말하세요.",
        answer: 'I am sorry, could you say that again? Do you want to keep 10:30?',
        answer_ko: '죄송하지만 다시 말씀해 주실래요? 10시 30분으로 할까요?',
        answer_from: 'Fairview Dental',
        delay: 0
      }
    ]
  },
  {
    id: 'm13_library',
    day: 13,
    time: '10:30',
    sender: 'Fairview Public Library',
    body: 'Your hold is ready for pickup. We will keep it at the front desk for 7 days.',
    body_ko: '예약하신 책이 준비되었습니다. 안내 데스크에서 7일 동안 보관합니다. (hold: 예약 도서)'
  },
  {
    id: 'm14_weather',
    day: 14,
    time: '08:00',
    kind: 'alert',
    sender: 'Fairview Weather',
    body: 'Showers through the afternoon. A good day to stay in, or to bring an umbrella if you go out.',
    body_ko: '오후까지 소나기가 옵니다. 집에 있기 좋은 날이고, 나간다면 우산을 챙기세요.'
  },
  {
    id: 'r_fam_dk_1',
    hero: 'derek',
    day: 21,
    time: '18:30',
    sender: 'Elena (sister)',
    body: 'Mom wants to know if you still like pecan pie or if that was a phase. I said phase.',
    body_ko: '엄마가 너 아직도 피칸 파이 좋아하는지, 아니면 한때였는지 물어봐. 난 한때였다고 했어.',
    every: 28
  },
  {
    id: 'r_fam_dk_2',
    hero: 'derek',
    day: 28,
    time: '18:30',
    sender: 'Mom',
    body: 'Hi honey. Remember to change the furnace filter before it gets cold. Love, Mom',
    body_ko: '얘야, 추워지기 전에 난방기 필터 갈아 끼우는 거 잊지 마. 엄마가.',
    every: 28,
    last_day: 70
  },
  {
    id: 'r_fam_dk_3',
    hero: 'derek',
    day: 35,
    time: '18:30',
    sender: 'Elena (sister)',
    body: "The kids drew you a picture. I'll mail it if I can find a stamp. Who even has stamps anymore?",
    body_ko: '애들이 너 그림 그렸어. 우표 찾으면 부칠게. 요즘 누가 우표를 갖고 있어?',
    every: 28
  },
  {
    id: 'r_fam_dk_4',
    hero: 'derek',
    day: 42,
    time: '18:30',
    sender: 'Mom',
    body: 'Your father finally fixed the garage door. It only took him two years. Call when you can.',
    body_ko: '아빠가 드디어 차고 문을 고쳤어. 2년밖에 안 걸렸네. 시간 될 때 전화해.',
    every: 28
  },
  {
    id: 'r_fam_jun_1',
    hero: 'jun',
    day: 21,
    time: '18:30',
    sender: 'Mom',
    body: 'Did you eat dinner? The weather app says it is getting cold there. Wear a warm jacket.',
    body_ko: '저녁은 먹었니? 날씨 앱을 보니 거기 추워진다더라. 따뜻한 겉옷 입고 다녀.',
    every: 28
  },
  {
    id: 'r_fam_jun_2',
    hero: 'jun',
    day: 28,
    time: '18:30',
    sender: 'Dad',
    body: "Your mom told me about your job. I am proud of you. Don't work too late.",
    body_ko: '엄마한테 회사 얘기 들었다. 자랑스럽다. 너무 늦게까지 일하지 마라.',
    every: 28
  },
  {
    id: 'r_fam_jun_3',
    hero: 'jun',
    day: 35,
    time: '18:30',
    sender: 'Mom',
    body: 'Your aunt asked if you have a nice apartment. Send us a photo of your place sometime!',
    body_ko: '이모가 집은 괜찮냐고 묻더라. 언제 집 사진 좀 보내 줘!',
    every: 28
  },
  {
    id: 'r_fam_jun_4',
    hero: 'jun',
    day: 42,
    time: '18:30',
    sender: 'Mom',
    body: 'Are you saving a little every month? Even a little helps. Love you.',
    body_ko: '매달 조금씩 저축은 하니? 조금이라도 도움이 돼. 사랑해.',
    every: 28
  },
  {
    id: 'r_fam_pr_1',
    hero: 'priya',
    day: 21,
    time: '18:30',
    sender: 'Dad',
    body: 'The last tomatoes are in. Your mother made chutney. Are you eating your vegetables?',
    body_ko: '마지막 토마토를 땄단다. 엄마가 처트니를 만들었어. 채소는 잘 먹고 있니?',
    every: 28,
    last_day: 60
  },
  {
    id: 'r_fam_pr_2',
    hero: 'priya',
    day: 28,
    time: '18:30',
    sender: 'Mom',
    body: "Your cousin got engaged! I will send you the details. Don't tell anyone yet.",
    body_ko: '사촌이 약혼했어! 자세한 건 보내 줄게. 아직 아무한테도 말하지 마.',
    every: 28
  },
  {
    id: 'r_fam_pr_3',
    hero: 'priya',
    day: 35,
    time: '18:30',
    sender: 'Dad',
    body: 'Did you get your flu shot? Most pharmacies give them for free.',
    body_ko: '독감 예방 주사는 맞았니? 약국 대부분에서 무료로 놔 준단다.',
    every: 28
  },
  {
    id: 'r_fam_pr_4',
    hero: 'priya',
    day: 42,
    time: '18:30',
    sender: 'Mom',
    body: 'Work is work, but take a walk this week. Sunshine is good for you.',
    body_ko: '일은 일이고, 이번 주엔 산책 좀 해. 햇볕 쬐는 게 몸에 좋아.',
    every: 28
  },
  {
    id: 'r_linda_w2',
    day: 116,
    time: '10:00',
    kind: 'email',
    sender: 'linda',
    subject: 'Your W-2 is ready',
    subject_ko: 'W-2가 준비되었습니다',
    body: 'Your 2026 Form W-2 is now in the HR portal, and a paper copy is in the mail. You will need it to file your taxes by April 15.',
    body_ko: '2026년 W-2 양식(연간 급여·세금 명세)을 HR 포털에 올렸고, 종이 사본은 우편으로 보냈습니다. 4월 15일까지 세금 신고할 때 필요합니다. (W-2: 연말정산용 급여 명세서)'
  },
  {
    id: 'r_market_1',
    day: 18,
    time: '09:00',
    kind: 'email',
    sender: 'Fairview Market',
    subject: "This week's deals",
    subject_ko: '이번 주 할인 상품',
    body: 'Apples are 3 for $2, fresh salmon is $9.99 a pound, and bakery bread is buy one, get one half off. Prices are good through Sunday.',
    body_ko: '사과 세 개에 2달러, 생연어 파운드당 9.99달러, 빵집 빵은 하나 사면 하나 반값입니다. 행사 가격은 일요일까지입니다. (buy one, get one half off: 하나 사면 하나 반값)',
    every: 28
  },
  {
    id: 'r_market_2',
    day: 25,
    time: '09:00',
    kind: 'email',
    sender: 'Fairview Market',
    subject: "This week's deals",
    subject_ko: '이번 주 할인 상품',
    body: 'Chicken thighs are $1.99 a pound, eggs are $2.99 a dozen, and all soups are 20% off. Prices are good through Sunday.',
    body_ko: '닭 넓적다리살 파운드당 1.99달러, 달걀 한 판(12개) 2.99달러, 수프는 전부 20% 할인입니다. 행사 가격은 일요일까지입니다. (a dozen: 12개)',
    every: 28
  },
  {
    id: 'r_market_3',
    day: 32,
    time: '09:00',
    kind: 'email',
    sender: 'Fairview Market',
    subject: "This week's deals",
    subject_ko: '이번 주 할인 상품',
    body: 'Oranges are 79 cents a pound, pasta is 2 for $3, and coffee beans are $2 off. Prices are good through Sunday.',
    body_ko: '오렌지 파운드당 79센트, 파스타 두 봉지에 3달러, 원두는 2달러 할인입니다. 행사 가격은 일요일까지입니다.',
    every: 28
  },
  {
    id: 'r_market_4',
    day: 39,
    time: '09:00',
    kind: 'email',
    sender: 'Fairview Market',
    subject: "This week's deals",
    subject_ko: '이번 주 할인 상품',
    body: 'Ground beef is $4.49 a pound, frozen vegetables are 4 for $5, and laundry detergent is $3 off. Prices are good through Sunday.',
    body_ko: '다진 소고기 파운드당 4.49달러, 냉동 채소 네 봉지에 5달러, 세탁 세제는 3달러 할인입니다. 행사 가격은 일요일까지입니다. (ground beef: 다진 소고기)',
    every: 28
  },
  {
    id: 'r_market_baking',
    day: 71,
    time: '09:00',
    kind: 'email',
    sender: 'Fairview Market',
    subject: 'Bake something sweet',
    subject_ko: '달콤한 걸 구워 보세요',
    body: 'Holiday baking sale: butter, flour and sugar are 25% off, and gift cards are at every register.',
    body_ko: '연말 베이킹 세일: 버터, 밀가루, 설탕이 25% 할인이고, 상품권은 모든 계산대에 있습니다. (gift card: 상품권)'
  },
  {
    id: 'r_market_halloween',
    day: 22,
    time: '09:00',
    kind: 'email',
    sender: 'Fairview Market',
    subject: 'Get ready for trick-or-treaters',
    subject_ko: '사탕 받으러 올 아이들을 맞을 준비',
    body: 'Halloween is Saturday! Big bags of candy are $8.99, and carving pumpkins are $4.99 each while they last.',
    body_ko: '핼러윈이 토요일이에요! 큰 사탕 봉지가 8.99달러, 조각용 호박은 남아 있는 동안 개당 4.99달러입니다. (while they last: 재고가 있는 동안)'
  },
  {
    id: 'r_market_newyear',
    day: 85,
    time: '09:00',
    kind: 'email',
    sender: 'Fairview Market',
    subject: 'Happy New Year from Fairview Market',
    subject_ko: '페어뷰 마켓의 새해 인사',
    body: "Ring in the new year: sparkling cider is 2 for $6 and party platters are 10% off. We close early on New Year's Eve.",
    body_ko: '새해맞이: 탄산 사과주스 두 병에 6달러, 파티용 모둠 접시는 10% 할인입니다. 12월 31일에는 일찍 문을 닫습니다. (ring in the new year: 새해를 맞이하다)'
  },
  {
    id: 'r_market_thanksgiving',
    day: 43,
    time: '09:00',
    kind: 'email',
    sender: 'Fairview Market',
    subject: 'Thanksgiving is next week',
    subject_ko: '추수감사절이 다음 주예요',
    body: 'Fresh turkeys are $1.29 a pound. Order yours at the deli counter by Sunday. We have holiday hours on Thanksgiving Day, so check the sign on the door.',
    body_ko: '생칠면조가 파운드당 1.29달러입니다. 일요일까지 델리 카운터에서 주문하세요. 추수감사절 당일에는 휴일 영업시간이 적용되니 문에 붙은 안내를 확인하세요. (deli counter: 조리 식품 코너)'
  },
  {
    id: 'r_review_derek',
    hero: 'derek',
    day: 85,
    time: '10:00',
    kind: 'email',
    sender: 'maya',
    subject: 'Year-end review',
    subject_ko: '연말 평가 안내',
    body: "Hi Derek, your year-end review is Monday, January 4 at 3:30 in my office. We'll look at the year: attendance, meetings, your work and how you handled what came up, plus goals for next year. Enjoy the holidays!",
    body_ko: '데릭, 연말 평가는 1월 4일 월요일 오후 3시 30분, 내 방에서 해요. 근태, 회의, 한 일, 중간에 생긴 일을 어떻게 처리했는지 돌아보고 내년 목표도 정해요. 연휴 잘 보내요!'
  },
  {
    id: 'r_review_jun',
    hero: 'jun',
    day: 85,
    time: '10:00',
    kind: 'email',
    sender: 'maya',
    subject: 'Your 90-day review',
    subject_ko: '90일 평가 안내',
    body: "Hi Jun, let's do your 90-day review on Monday, January 4 at 3:30 in my office. I'll go over your attendance, the team meetings, the work at your desk and how you handled what came up. Nothing to prepare, but bring your questions. Enjoy the holidays!",
    body_ko: '준, 90일 평가를 1월 4일 월요일 오후 3시 30분에 내 방에서 해요. 근태, 팀 회의, 자리에서 한 일, 중간에 생긴 일을 어떻게 처리했는지 볼 거예요. 준비할 건 없고, 궁금한 걸 가져와요. 연휴 잘 보내요!'
  },
  {
    id: 'r_review_priya',
    hero: 'priya',
    day: 85,
    time: '10:00',
    kind: 'email',
    sender: 'maya',
    subject: 'Year-end review',
    subject_ko: '연말 평가 안내',
    body: "Hi Priya, your year-end review is Monday, January 4 at 3:30 in my office. We'll look at the year: attendance, meetings, your work and how you handled what came up, plus goals for next year. Enjoy the holidays!",
    body_ko: '프리야, 연말 평가는 1월 4일 월요일 오후 3시 30분, 내 방에서 해요. 근태, 회의, 한 일, 중간에 생긴 일을 어떻게 처리했는지 돌아보고 내년 목표도 정해요. 연휴 잘 보내요!'
  },
  {
    id: 'r_sam_patch',
    day: 23,
    time: '10:00',
    kind: 'email',
    sender: 'sam',
    subject: 'Restart your laptop tonight',
    subject_ko: '오늘 밤 노트북 다시 켜기',
    body: 'Patch Tuesday: security updates go out tonight. Please save your work and restart your laptop before you leave.',
    body_ko: '패치 화요일: 오늘 밤 보안 업데이트가 배포됩니다. 퇴근 전에 작업을 저장하고 노트북을 다시 켜 주세요. (Patch Tuesday: 매달 둘째 화요일 보안 업데이트 날)',
    every: 28
  },
  {
    id: 'r_scam_bank',
    day: 46,
    time: '20:15',
    sender: '+1 (555) 0199',
    body: 'Fairview Credit Union ALERT: your account has been locked. Verify your identity at the link to unlock it: fcu-secure-verify.com',
    body_ko: '페어뷰 신용조합 알림: 계좌가 잠겼습니다. 링크에서 본인 확인을 하면 풀립니다: fcu-secure-verify.com (진짜 은행은 문자 링크로 본인 확인을 하지 않아요. 피싱이에요.)',
    every: 38
  },
  {
    id: 'r_scam_toll',
    day: 27,
    time: '13:05',
    sender: '+1 (555) 0187',
    body: 'Fairview Toll Services: you have an unpaid toll of $4.15. Pay within 24 hours to avoid a $50 late fee: fvw-toll-pay.info',
    body_ko: '페어뷰 통행료 서비스: 미납 통행료 4.15달러가 있습니다. 50달러 연체료를 피하려면 24시간 안에 내세요: fvw-toll-pay.info (피싱 문자예요. 링크를 누르지 말고 지우세요.)',
    every: 38
  },
  {
    id: 'r_spam_warranty',
    day: 20,
    time: '11:40',
    kind: 'voicemail',
    sender: 'Unknown caller',
    body: "This is a final courtesy call about your vehicle's extended warranty. Press 1 now to speak to a specialist.",
    body_ko: '차량 보증 연장에 관한 마지막 안내 전화입니다. 상담원과 통화하려면 지금 1번을 누르세요. (흔한 스팸 전화예요. 지우면 돼요.)',
    every: 23
  },
  {
    id: 'r_team_1',
    day: 17,
    time: '16:30',
    sender: 'priya',
    body: "FYI, the coffee cart has pumpkin bread today. Not saying you need it. But it's good.",
    body_ko: '참고로 오늘 커피 카트에 호박빵 있어요. 꼭 먹으라는 건 아닌데, 맛있어요.',
    every: 28,
    last_day: 60
  },
  {
    id: 'r_team_2',
    day: 24,
    time: '16:30',
    sender: 'derek',
    body: 'Staging is back up. Thanks for your patience, everyone.',
    body_ko: '스테이징 다시 살아났어요. 다들 기다려 줘서 고마워요.',
    every: 28
  },
  {
    id: 'r_team_3',
    day: 31,
    time: '16:30',
    sender: 'maya',
    body: 'Quick reminder: please update your tickets on the board before Friday. Thanks, team!',
    body_ko: '잠깐 알림: 금요일 전에 보드에서 맡은 티켓 상태를 업데이트해 주세요. 고마워요, 여러분!',
    every: 28
  },
  {
    id: 'r_team_4',
    day: 38,
    time: '16:30',
    sender: 'jun',
    body: "Does anyone know if the 8 o'clock bus runs on holidays? Asking for a friend. The friend is me.",
    body_ko: '혹시 8시 버스가 공휴일에도 다니는지 아는 분? 친구가 궁금해해서요. 그 친구가 저예요.',
    every: 28
  },
  {
    id: 'r_tom_fridge',
    day: 25,
    time: '08:45',
    kind: 'email',
    sender: 'tom',
    subject: 'Fridge cleanout tomorrow',
    subject_ko: '내일 냉장고 정리',
    body: 'The fridge gets cleaned out tomorrow at 4 PM. Anything without a name and a date goes. Thanks!',
    body_ko: '내일 오후 4시에 냉장고를 정리합니다. 이름과 날짜가 없는 건 모두 버려요. 고맙습니다!',
    every: 14
  }
];

export const mail = [
  {
    id: 'cc_habits_jun',
    hero: 'jun',
    day: 18,
    kind: 'letter',
    sender: 'Fairview Credit Union',
    subject: 'Five habits that build credit',
    subject_ko: '신용을 쌓는 다섯 가지 습관',
    body: '1. Pay on time, every time: it is the biggest part of your score. 2. Keep your statement balance under 30% of your limit, and under 10% is even better. 3. Pay the statement balance in full, and you pay no interest. 4. Keep your first card open: the age of your credit counts. 5. Apply only for what you need: every application is a hard inquiry.',
    body_ko: '1. 매번 제때 갚으세요. 점수에서 가장 큰 부분이에요. 2. 명세서 금액을 한도의 30% 아래로 유지하세요. 10% 아래면 더 좋아요. 3. 명세서 금액을 전부 갚으면 이자가 붙지 않아요. 4. 첫 카드는 해지하지 마세요. 신용 기록의 길이도 점수에 들어가요. 5. 필요한 카드만 신청하세요. 신청할 때마다 하드 조회가 남아요. (hard inquiry: 카드·대출 신청 때 하는 신용 조회)'
  },
  {
    id: 'cc_report_all',
    day: 31,
    kind: 'letter',
    sender: 'Fairview Credit Union',
    subject: 'Know what is on your credit report',
    subject_ko: '신용 보고서에 무엇이 있는지 알아 두세요',
    body: 'You can get a free copy of your credit report from each of the three national credit bureaus. Check that every account is yours and every payment is right, and dispute any mistake with the bureau. Looking at your own report never lowers your score.',
    body_ko: '전국 3대 신용평가기관에서 각각 신용 보고서를 무료로 받아 볼 수 있어요. 모든 계좌가 본인 것인지, 납부 기록이 맞는지 확인하고, 틀린 곳이 있으면 그 기관에 정정을 요청하세요. 자기 보고서를 보는 것은 점수에 영향을 주지 않아요. (dispute: 이의를 제기하다)'
  },
  {
    id: 'mail01_card',
    day: 1,
    kind: 'letter',
    sender: 'Fairview Credit Union',
    subject: 'Your new debit card',
    subject_ko: '새 체크카드가 도착했습니다',
    body: 'Your new debit card is enclosed. To activate it, call the number on the sticker. Keep your PIN private, and never write it on the card.',
    body_ko: '새 체크카드가 들어 있습니다. 사용하려면 스티커에 적힌 번호로 전화해 활성화하세요. 비밀번호(PIN)는 남에게 알리지 말고 카드에 적지 마세요. (activate: 활성화하다)'
  },
  {
    id: 'mail01_preapproved',
    day: 1,
    sender: 'Current Resident',
    subject: 'You may already be pre-approved!',
    subject_ko: '이미 사전 승인되셨을 수 있습니다!',
    body: 'Congratulations! You may already be pre-approved for a low-rate credit card. Call now. No obligation. This offer expires soon.',
    body_ko: '축하합니다! 낮은 금리의 신용카드에 이미 사전 승인되었을 수 있습니다. 지금 전화하세요. (광고 우편입니다. 버려도 됩니다. pre-approved: 사전 승인된)'
  },
  {
    id: 'mail02_laundry_jun',
    hero: 'jun',
    day: 2,
    kind: 'notice',
    sender: 'Cedar Court Apartments',
    subject: 'Laundry room rules',
    subject_ko: '세탁실 이용 규칙',
    body: 'The laundry room in the basement is open 7 AM to 10 PM. Washers and dryers are $2.50 a cycle with the laundry app. Please take your clothes out when the cycle ends and clean the lint trap after every load.',
    body_ko: '지하 세탁실은 오전 7시부터 오후 10시까지 엽니다. 세탁기와 건조기는 앱으로 1회 2.50달러입니다. 세탁이 끝나면 옷을 바로 꺼내고, 매번 보풀 필터를 청소해 주세요. (cycle: 세탁·건조 1회, lint trap: 건조기 보풀 필터)'
  },
  {
    id: 'mail02_laundry_priya',
    hero: 'priya',
    day: 2,
    kind: 'notice',
    sender: 'Cedar Street Lofts',
    subject: 'Laundry room reminder',
    subject_ko: '세탁실 이용 안내',
    body: "Friendly reminder: the laundry room on the ground floor is open 7 AM to 10 PM. Machines take the laundry app, $2.50 a cycle. Please don't leave wet clothes in the washers.",
    body_ko: '안내: 1층 세탁실은 오전 7시부터 오후 10시까지 엽니다. 기계는 세탁 앱으로 1회 2.50달러입니다. 젖은 빨래를 세탁기에 두고 가지 마세요. (ground floor: 1층, friendly reminder: 다시 한번 알려 드립니다)'
  },
  {
    id: 'mail02_pizza',
    day: 2,
    sender: 'Pizza Palace',
    subject: 'Two large pizzas, $19.99',
    subject_ko: '라지 피자 두 판 19.99달러',
    body: 'Two large one-topping pizzas for $19.99. Carry-out or delivery. Expires Oct 31. One coupon per order.',
    body_ko: '토핑 하나 라지 피자 두 판에 19.99달러. 포장 또는 배달. 10월 31일까지. 주문 한 건에 쿠폰 한 장. (carry-out: 포장, expires: 만료되다)'
  },
  {
    id: 'mail02_power',
    day: 2,
    kind: 'bill',
    sender: 'Fairview Power & Light',
    subject: 'Your bill is ready',
    subject_ko: '요금 고지서가 나왔습니다',
    body: 'Statement date: Oct 6. Your bill is ready to view online. Your autopay is set up, so you do not need to do anything. Thank you for being a customer.',
    body_ko: '명세서 날짜: 10월 6일. 요금 고지서를 온라인에서 볼 수 있습니다. 자동이체가 설정되어 있어 따로 하실 일은 없습니다. (statement: 명세서, autopay: 자동이체)'
  },
  {
    id: 'mail03_hardware',
    day: 3,
    sender: 'Fairview Hardware',
    subject: 'Fall sale: up to 30% off',
    subject_ko: '가을 세일: 최대 30% 할인',
    body: 'Rakes, gloves and leaf bags are up to 30% off through Sunday. Bring this flyer to the register.',
    body_ko: '갈퀴, 장갑, 낙엽 봉투가 일요일까지 최대 30% 할인입니다. 계산대에 이 전단지를 가져오세요. (flyer: 전단지, register: 계산대)'
  },
  {
    id: 'mail03_missed',
    day: 3,
    kind: 'notice',
    sender: 'Fairview Post Office',
    subject: 'Sorry we missed you',
    subject_ko: '부재중 배달 안내',
    body: 'We tried to deliver a package that needed a signature. Pick it up at the post office within 15 days. Bring a photo ID.',
    body_ko: '서명이 필요한 소포를 배달하려 했지만 만나지 못했습니다. 15일 안에 우체국에서 찾아가세요. 사진이 붙은 신분증을 가져오세요. (a photo ID: 사진이 붙은 신분증)'
  },
  {
    id: 'mail04_derek',
    hero: 'derek',
    day: 4,
    kind: 'card',
    sender: 'Aunt Rosa',
    subject: 'Thinking of you',
    subject_ko: '네 생각이 나서',
    body: 'Just a little note to say hello. Come by for dinner when you have a free Sunday. We miss you. Love, Aunt Rosa',
    body_ko: '안부를 전하려고 몇 자 적어요. 일요일에 시간 나면 저녁 먹으러 와요. 보고 싶어요. 로사 이모가. (come by: 들르다)'
  },
  {
    id: 'mail04_jun',
    hero: 'jun',
    day: 4,
    kind: 'card',
    sender: 'Grandma',
    subject: 'Congratulations on the new job!',
    subject_ko: '취직 축하한다!',
    body: 'Congratulations on your new job! I am so proud of you. Have a nice lunch on me. Love, Grandma',
    body_ko: '새 직장을 축하한다! 정말 자랑스럽구나. 맛있는 점심을 먹으렴. 사랑한다, 할머니가. (have ... on me: 내가 살게)'
  },
  {
    id: 'mail04_priya',
    hero: 'priya',
    day: 4,
    kind: 'card',
    sender: 'Aunt Meera',
    subject: 'Congratulations, Priya!',
    subject_ko: '축하해, 프리야!',
    body: 'We heard about your promotion. Congratulations! Your mother tells everyone. Come visit soon. Love, Aunt Meera',
    body_ko: '승진 소식 들었다. 축하해! 네 엄마가 만나는 사람마다 자랑한단다. 조만간 놀러 오렴. 미라 이모가. (promotion: 승진)'
  },
  {
    id: 'mail05_eob',
    day: 5,
    kind: 'letter',
    sender: 'Fairview Health Plan',
    subject: 'Explanation of Benefits',
    subject_ko: '보험금 지급 내역서',
    body: 'This is not a bill. It shows what your plan paid for your recent visit. Keep it for your records.',
    body_ko: '청구서가 아닙니다. 최근 진료에서 보험이 무엇을 부담했는지 보여 줍니다. 기록으로 보관하세요. (EOB: 보험금 지급 내역서, records: 기록)'
  },
  {
    id: 'mail06_ad',
    day: 6,
    sender: 'Fairview Market',
    subject: 'Weekly ad',
    subject_ko: '주간 전단 광고',
    body: 'Fresh salmon $9.99 a pound. Apples 3 for $2. Fall pumpkins are here! Prices good through Friday.',
    body_ko: '신선한 연어 파운드당 9.99달러. 사과 세 개에 2달러. 가을 호박이 나왔어요! 금요일까지 행사 가격입니다. (a pound: 1파운드에)'
  },
  {
    id: 'mail09_fiber',
    day: 9,
    sender: 'Fairview Fiber',
    subject: 'Switch and save',
    subject_ko: '바꾸고 절약하세요',
    body: 'Internet 300 Mbps for $39.99 a month for 12 months, then the regular price applies. Taxes and fees extra.',
    body_ko: '인터넷 300Mbps를 12개월 동안 월 39.99달러에 드립니다. 이후에는 정상 요금이 적용됩니다. 세금과 수수료는 별도입니다. (then the regular price applies: 그 뒤에는 정가)'
  },
  {
    id: 'mail09_vote',
    day: 9,
    kind: 'notice',
    sender: 'City of Fairview',
    subject: 'Election Day is November 3',
    subject_ko: '선거일은 11월 3일입니다',
    body: 'Election Day is Nov 3. Register to vote by Oct 13, or check your registration online. Polls are open from 7 AM to 8 PM.',
    body_ko: '선거일은 11월 3일입니다. 10월 13일까지 유권자 등록을 하거나 등록 상태를 온라인에서 확인하세요. 투표소는 오전 7시부터 오후 8시까지 엽니다. (register to vote: 유권자 등록, polls: 투표소)'
  },
  {
    id: 'mail10_statement',
    day: 10,
    kind: 'letter',
    sender: 'Fairview Credit Union',
    subject: 'Your statement is ready',
    subject_ko: '거래 명세서가 나왔습니다',
    body: 'Your monthly statement for checking ···4821 is ready. View it online or in the app. Report any error within 60 days.',
    body_ko: '입출금 계좌 ···4821의 월 명세서가 나왔습니다. 온라인이나 앱에서 확인하세요. 오류가 있으면 60일 안에 알려 주세요. (statement: 거래 명세서)'
  },
  {
    id: 'mail11_jury',
    day: 11,
    kind: 'notice',
    sender: 'Fairview County Court',
    subject: 'Jury service questionnaire',
    subject_ko: '배심원 설문지',
    body: 'You may be selected for jury service. Complete the questionnaire online within 10 days. Failure to respond may result in a fine.',
    body_ko: '배심원으로 선정될 수 있습니다. 10일 안에 온라인으로 설문지를 작성하세요. 답하지 않으면 벌금이 나올 수 있습니다. (jury: 배심원단, fine: 벌금)'
  },
  {
    id: 'mail11_lawn',
    day: 11,
    sender: 'Green Thumb Landscaping',
    subject: 'Fall cleanup special',
    subject_ko: '가을맞이 마당 청소 특가',
    body: 'Leaves raked and gutters cleaned, from $99. Free estimates. Call today!',
    body_ko: '낙엽 치우기와 배수로 청소가 99달러부터. 견적은 무료입니다. 오늘 전화하세요! (estimate: 견적)'
  },
  {
    id: 'mail12_coupon',
    day: 12,
    sender: 'Fairview Market',
    subject: '$5 off $30',
    subject_ko: '30달러 이상 구매 시 5달러 할인',
    body: 'Save $5 when you spend $30 or more. Valid Oct 12 to 18. Not valid with other offers.',
    body_ko: '30달러 이상 사면 5달러를 깎아 드립니다. 10월 12일부터 18일까지 유효. 다른 할인과 중복 불가입니다. (valid: 유효한)'
  },
  {
    id: 'mail12_vision',
    day: 12,
    sender: 'Fairview Vision',
    subject: 'Your eyes matter',
    subject_ko: '눈 건강을 챙기세요',
    body: 'It has been over a year since your last eye exam. Book one this month and get 20% off frames.',
    body_ko: '마지막 시력 검사를 받은 지 1년이 넘었습니다. 이달에 예약하면 안경테를 20% 깎아 드립니다. (frames: 안경테)'
  },
  {
    id: 'mail13_derek',
    hero: 'derek',
    day: 13,
    kind: 'notice',
    sender: 'Fairview Waste Services',
    subject: 'New recycling rules',
    subject_ko: '재활용 규정 변경',
    body: 'Starting Nov 1, greasy pizza boxes go in the trash, not the recycling. Please rinse cans and bottles.',
    body_ko: '11월 1일부터 기름이 밴 피자 상자는 재활용이 아니라 일반 쓰레기로 버립니다. 캔과 병은 헹궈 주세요. (rinse: 헹구다)'
  },
  {
    id: 'mail13_jun',
    hero: 'jun',
    day: 13,
    kind: 'notice',
    sender: 'Maple Street Apartments',
    subject: 'Notice of entry',
    subject_ko: '세대 출입 안내',
    body: 'Carl will enter your unit on Tuesday between 9 AM and noon to check the smoke detectors. You do not need to be home.',
    body_ko: '화요일 오전 9시부터 정오 사이에 화재 감지기를 점검하러 칼이 세대에 들어갑니다. 집에 계실 필요는 없습니다. (smoke detector: 화재 감지기)'
  },
  {
    id: 'mail13_priya',
    hero: 'priya',
    day: 13,
    kind: 'notice',
    sender: 'Cedar Street Lofts',
    subject: 'Parking permit renewal',
    subject_ko: '주차 허가증 갱신 안내',
    body: 'Resident parking permits expire Oct 31. Renew at the leasing office with your license and registration.',
    body_ko: '입주민 주차 허가증이 10월 31일에 만료됩니다. 운전면허증과 차량 등록증을 가지고 관리사무소에서 갱신하세요. (permit: 허가증, renew: 갱신하다)'
  },
  {
    id: 'r_1099',
    day: 118,
    kind: 'letter',
    sender: 'Fairview Credit Union',
    subject: 'Form 1099-INT',
    subject_ko: '1099-INT 양식',
    body: 'Form 1099-INT: interest paid to you in 2026 on checking ···4821. Keep this form for your tax return.',
    body_ko: '1099-INT 양식: 2026년에 입출금 계좌 ···4821에서 받은 이자 내역입니다. 세금 신고에 쓰도록 보관하세요. (interest: 이자)'
  },
  {
    id: 'r_ad_1',
    day: 20,
    sender: 'Fairview Market',
    subject: 'Weekly ad',
    subject_ko: '주간 전단 광고',
    body: 'Russet potatoes, 5 pounds for $2.99. Rotisserie chicken $6.99. Prices good through Friday.',
    body_ko: '러셋 감자 5파운드 2.99달러. 통닭구이 6.99달러. 금요일까지 행사 가격입니다. (rotisserie chicken: 통째로 돌려 구운 닭)',
    every: 28
  },
  {
    id: 'r_ad_2',
    day: 27,
    sender: 'Fairview Market',
    subject: 'Weekly ad',
    subject_ko: '주간 전단 광고',
    body: 'Bananas 59 cents a pound. Greek yogurt 4 for $5. Fresh flowers $7.99 a bunch. Prices good through Friday.',
    body_ko: '바나나 파운드당 59센트. 그릭 요구르트 네 개에 5달러. 생화 한 다발 7.99달러. 금요일까지 행사 가격입니다. (a bunch: 한 다발)',
    every: 28
  },
  {
    id: 'r_ad_3',
    day: 34,
    sender: 'Fairview Market',
    subject: 'Weekly ad',
    subject_ko: '주간 전단 광고',
    body: 'Pork chops $3.49 a pound. Cereal 2 for $6. Paper towels 6 rolls for $7.99. Prices good through Friday.',
    body_ko: '돼지 목살 파운드당 3.49달러. 시리얼 두 상자에 6달러. 키친타월 6롤 7.99달러. 금요일까지 행사 가격입니다.',
    every: 28
  },
  {
    id: 'r_ad_4',
    day: 41,
    sender: 'Fairview Market',
    subject: 'Weekly ad',
    subject_ko: '주간 전단 광고',
    body: 'Avocados 2 for $3. Shredded cheese 2 for $5. Rice, 10 pounds for $8.99. Prices good through Friday.',
    body_ko: '아보카도 두 개에 3달러. 슬라이스 치즈 두 봉지에 5달러. 쌀 10파운드 8.99달러. 금요일까지 행사 가격입니다.',
    every: 28
  },
  {
    id: 'r_card_derek',
    hero: 'derek',
    day: 76,
    kind: 'card',
    sender: 'Aunt Rosa',
    subject: 'Happy holidays!',
    subject_ko: '즐거운 연말 보내!',
    body: 'Happy holidays, Derek! I hope the house is warm and cozy. Love from all of us. Aunt Rosa',
    body_ko: '데릭, 즐거운 연말 보내! 집이 따뜻하고 아늑하길 바란다. 우리 모두의 사랑을 담아. 로사 이모가.'
  },
  {
    id: 'r_card_jun',
    hero: 'jun',
    day: 76,
    kind: 'card',
    sender: 'Grandma',
    subject: 'Merry Christmas!',
    subject_ko: '메리 크리스마스!',
    body: 'Merry Christmas and Happy New Year, Jun! I am so proud of you. Stay warm and eat well. Love, Grandma',
    body_ko: '준아, 메리 크리스마스, 새해 복 많이 받아라! 정말 자랑스럽구나. 따뜻하게 지내고 잘 챙겨 먹으렴. 할머니가.'
  },
  {
    id: 'r_card_priya',
    hero: 'priya',
    day: 76,
    kind: 'card',
    sender: 'Aunt Meera',
    subject: "Season's greetings",
    subject_ko: '연말 인사',
    body: "Season's greetings, Priya! Wishing you a bright and happy new year. With love, Aunt Meera",
    body_ko: '프리야, 즐거운 연말 보내렴! 밝고 행복한 새해가 되길. 사랑을 담아, 미라 이모가.'
  },
  {
    id: 'r_catalog',
    day: 48,
    sender: 'Northwind Outfitters',
    subject: 'Our holiday catalog is here',
    subject_ko: '연말 카탈로그가 나왔습니다',
    body: 'Warm jackets, flannel shirts and gifts for everyone on your list. Order by December 18 for delivery before Christmas.',
    body_ko: '따뜻한 재킷, 플란넬 셔츠, 선물 목록 속 모두를 위한 선물. 12월 18일까지 주문하면 크리스마스 전에 배달됩니다.'
  },
  {
    id: 'r_fiber',
    day: 30,
    sender: 'Fairview Fiber',
    subject: 'Still paying too much for internet?',
    subject_ko: '아직도 인터넷 요금을 많이 내세요?',
    body: '500 Mbps for $45 a month for 12 months. Free installation. Taxes and fees extra.',
    body_ko: '500Mbps를 12개월 동안 월 45달러에. 설치비 무료. 세금과 수수료는 별도입니다.',
    every: 42
  },
  {
    id: 'r_hardware_winter',
    day: 50,
    sender: 'Fairview Hardware',
    subject: 'Get your home ready for winter',
    subject_ko: '집을 겨울 채비하세요',
    body: 'Space heaters, weather stripping and door sweeps are up to 25% off through Sunday.',
    body_ko: '전기난로, 문풍지, 문 밑 바람막이가 일요일까지 최대 25% 할인입니다. (weather stripping: 문풍지)',
    every: 35,
    last_day: 120
  },
  {
    id: 'r_pizza',
    day: 23,
    sender: 'Pizza Palace',
    subject: 'Large two-topping pizza, $12.99',
    subject_ko: '토핑 두 개 라지 피자 12.99달러',
    body: 'Large two-topping pizza for $12.99, carry-out only. Show this coupon at the counter.',
    body_ko: '토핑 두 개 라지 피자 12.99달러, 포장만 됩니다. 계산대에서 이 쿠폰을 보여 주세요. (carry-out only: 포장만)',
    every: 35
  },
  {
    id: 'r_preapproved_1',
    day: 22,
    sender: 'Current Resident',
    subject: "You're pre-approved!",
    subject_ko: '사전 승인되셨습니다!',
    body: '0% intro APR for 15 months on purchases and balance transfers. Respond by the date on the enclosed form.',
    body_ko: '구매와 잔액 이전에 15개월 동안 0% 우대 금리. 동봉한 양식에 적힌 날짜까지 답하세요. (APR: 연이율, intro: 처음 일정 기간의)',
    every: 42
  },
  {
    id: 'r_preapproved_2',
    day: 43,
    sender: 'Current Resident',
    subject: "You've been pre-selected",
    subject_ko: '선정되셨습니다',
    body: 'Earn 3% cash back at grocery stores and 1% on everything else. No annual fee the first year.',
    body_ko: '식료품점에서 3%, 나머지는 1% 캐시백. 첫해 연회비 없음. (cash back: 쓴 금액의 일부를 돌려받음)',
    every: 42
  },
  {
    id: 'r_statement',
    day: 41,
    kind: 'letter',
    sender: 'Fairview Credit Union',
    subject: 'Your statement is ready',
    subject_ko: '거래 명세서가 나왔습니다',
    body: 'Your monthly statement for checking ···4821 is ready. View it online or in the app. Report any error within 60 days.',
    body_ko: '입출금 계좌 ···4821의 월 명세서가 나왔습니다. 온라인이나 앱에서 확인하세요. 오류가 있으면 60일 안에 알려 주세요.',
    every: 30
  },
  {
    id: 'r_w2',
    day: 118,
    kind: 'letter',
    sender: 'Seaside Labs Payroll',
    subject: 'Form W-2: Wage and Tax Statement',
    subject_ko: 'W-2 양식: 급여 및 세금 명세서',
    body: 'Your 2026 Form W-2 is enclosed. It shows your wages and the taxes withheld last year. Keep it for your tax return, due April 15.',
    body_ko: '2026년 W-2 양식을 동봉합니다. 지난해 급여와 원천징수된 세금이 적혀 있습니다. 4월 15일까지 내는 세금 신고에 쓰도록 보관하세요. (withheld: 원천징수된)'
  }
];

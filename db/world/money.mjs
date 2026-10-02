// Bills on autopay, credit cards and the benefits plans of open enrollment.

export const bills = [
  {
    id: 'internet',
    name: 'Home internet',
    name_ko: '인터넷 요금',
    amount: 55,
    day: 16,
    note: '300 Mbps, no contract',
    note_ko: '300Mbps, 약정 없음',
    company: 'Bayline Internet'
  },
  {
    id: 'phone',
    name: 'Phone plan',
    name_ko: '휴대전화 요금',
    amount: 45,
    day: 8,
    note: 'unlimited talk and text, autopay discount',
    note_ko: '통화·문자 무제한, 자동이체 할인',
    company: 'Pacific Wireless'
  },
  {
    id: 'renters_insurance',
    name: 'Renters insurance',
    name_ko: '세입자 보험',
    amount: 14,
    day: 3,
    note: 'autopay from your checking account',
    note_ko: '입출금 계좌에서 자동이체',
    company: 'Harbor Mutual Insurance'
  },
  {
    id: 'streaming',
    name: 'Streaming subscription',
    name_ko: '스트리밍 구독',
    amount: 15.49,
    day: 10,
    note: 'renews every month until you cancel',
    note_ko: '해지할 때까지 매달 갱신',
    company: 'StreamBox'
  },
  {
    id: 'utilities',
    name: 'Electric and gas bill',
    name_ko: '전기·가스 요금',
    amount: 68.4,
    day: 12,
    note: 'Fairview Power, autopay',
    note_ko: '페어뷰 전력, 자동이체',
    company: 'Fairview Power & Light'
  }
];

export const cards = [
  {
    id: 'fcu_rewards',
    name: 'Everyday Rewards Card',
    name_ko: '에브리데이 리워드 카드',
    last4: '2604',
    credit_limit: 5000,
    apr: 19.99,
    cash_back: 1.5,
    min_score: 670,
    note: 'No annual fee, and 1.5% cash back on every purchase, credited on your statement. For members with an established credit history (a score of 670 or more).',
    note_ko: '연회비가 없고, 모든 결제 금액의 1.5%를 명세서에서 돌려드려요. 신용 기록이 쌓인 회원(점수 670점 이상)을 위한 카드예요.',
    sort: 2
  },
  {
    id: 'fcu_secured',
    name: 'Starter Secured Card',
    name_ko: '스타터 보증금 신용카드',
    kind: 'secured',
    last4: '7731',
    deposit: 300,
    credit_limit: 300,
    apr: 24.99,
    graduates_to: 'fcu_rewards',
    note: 'Builds credit from scratch: no credit history needed. Your $300 deposit is your credit limit. It is kept in savings and comes back when the card graduates. We report your payments to the credit bureaus every month.',
    note_ko: '신용 기록이 없어도 만들 수 있는, 신용을 처음 쌓는 카드예요. 보증금 300달러가 곧 신용 한도예요. 보증금은 예금으로 보관하다가 일반 카드로 바뀔 때 돌려드려요. 납부 기록은 매달 신용평가기관에 보고해요.',
    sort: 1
  }
];

export const plans = [
  {
    id: 'den_none',
    kind: 'dental',
    name: 'No dental coverage',
    name_ko: '치과 보험 없음',
    copays: { cleaning: 125, filling: 220 },
    note: "You pay the dentist's full price.",
    note_ko: '치과 비용을 전부 직접 내요.',
    sort: 50
  },
  {
    id: 'den_ppo',
    kind: 'dental',
    name: 'Coastline Dental PPO',
    name_ko: '코스트라인 치과 PPO',
    premium: 7.5,
    deductible: 50,
    copays: { cleaning: 0, filling: 45 },
    note: 'Two cleanings a year at no cost; fillings are mostly covered.',
    note_ko: '스케일링은 1년에 두 번 무료이고, 충치 치료는 대부분 보험이 내요.',
    sort: 40
  },
  {
    id: 'med_hmo',
    kind: 'medical',
    name: 'Fairview Health Basic HMO',
    name_ko: '페어뷰 헬스 베이식 HMO',
    premium: 41.5,
    deductible: 1500,
    oop_max: 4500,
    copays: { doctor: 30, er: 350, rx: 15, specialist: 60, urgent: 75 },
    note: "You pick a primary care doctor in the network, and you need a referral from them to see a specialist. The plan you get if you don't choose.",
    note_ko: '네트워크 안에서 주치의를 정하고, 전문의를 보려면 주치의의 의뢰서가 필요해요. 아무것도 고르지 않으면 이 플랜이에요.',
    sort: 10
  },
  {
    id: 'med_hsa',
    kind: 'medical',
    name: 'Fairview Health Saver HSA',
    name_ko: '페어뷰 헬스 세이버 HSA',
    premium: 12,
    deductible: 3300,
    oop_max: 6000,
    copays: { doctor: 160, er: 1400, rx: 22, specialist: 250, urgent: 200 },
    hsa: 40,
    note: 'A high-deductible plan: you pay the full price of visits and drugs until you reach the deductible. The company puts $40 a paycheck into your health savings account (HSA), and it stays yours.',
    note_ko: '공제액이 높은 플랜이에요. 공제액을 채울 때까지 진료비와 약값을 전부 내요. 회사가 급여마다 건강 저축 계좌(HSA)에 40달러를 넣어 주고, 그 돈은 계속 내 것이에요.',
    sort: 30
  },
  {
    id: 'med_ppo',
    kind: 'medical',
    name: 'Fairview Health Choice PPO',
    name_ko: '페어뷰 헬스 초이스 PPO',
    premium: 86,
    deductible: 500,
    oop_max: 3000,
    copays: { doctor: 25, er: 250, rx: 10, specialist: 40, urgent: 50 },
    note: 'See any doctor or specialist without a referral. Doctors outside the network cost more.',
    note_ko: '의뢰서 없이 어느 의사든 전문의든 볼 수 있어요. 네트워크 밖의 의사는 더 비싸요.',
    sort: 20
  },
  {
    id: 'vis_none',
    kind: 'vision',
    name: 'No vision coverage',
    name_ko: '안과 보험 없음',
    copays: { eye_exam: 110, glasses: 220 },
    note: 'You pay the full price of eye exams and glasses.',
    note_ko: '시력 검사와 안경 값을 전부 직접 내요.',
    sort: 70
  },
  {
    id: 'vis_plan',
    kind: 'vision',
    name: 'Coastline Vision',
    name_ko: '코스트라인 안과',
    premium: 2.4,
    copays: { eye_exam: 10, glasses: 25 },
    note: 'An eye exam a year for $10, and $150 toward glasses or contacts.',
    note_ko: '1년에 한 번 시력 검사가 10달러이고, 안경이나 렌즈에 150달러까지 지원돼요.',
    sort: 60
  }
];

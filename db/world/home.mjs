// Home life after the missions: things that break (repair), loud neighbors (noise: a card with four choices) and
// the messages the engine sends about them (text | email).

export const home_events = [
  {
    id: 'fix_dishwasher',
    kind: 'repair',
    hero: 'derek,priya',
    title: 'dishwasher',
    title_ko: '식기세척기',
    body: 'The dishwasher stops halfway with a puddle of gray water at the bottom. Dishes by hand for now.',
    body_ko: '식기세척기가 중간에 멈추고 바닥에 구정물이 고였습니다. 당분간 설거지는 손으로 해야 해요.',
    place: 'eat',
    effect: 'dishes',
    cost: 165,
    days: 3,
    sort: 7
  },
  {
    id: 'fix_faucet',
    kind: 'repair',
    title: 'kitchen faucet',
    title_ko: '부엌 수도꼭지',
    body: "The kitchen faucet won't stop dripping. Plink, plink, all night long.",
    body_ko: '부엌 수도꼭지에서 물이 계속 똑똑 떨어집니다. 밤새 똑, 똑.',
    place: 'eat',
    effect: 'sleep',
    cost: 140,
    days: 2,
    sort: 1
  },
  {
    id: 'fix_fridge',
    kind: 'repair',
    title: 'fridge',
    title_ko: '냉장고',
    body: "The fridge has gone quiet, and it's warm inside. Whatever is in it won't keep for long.",
    body_ko: '냉장고가 조용해지더니 안이 미지근합니다. 안에 든 음식이 오래가지 못할 거예요.',
    place: 'eat',
    effect: 'fridge',
    cost: 210,
    days: 1,
    sort: 4
  },
  {
    id: 'fix_heater',
    kind: 'repair',
    title: 'heater',
    title_ko: '난방기',
    body: 'The heater clicks on but only blows cold air, and the nights are getting chilly.',
    body_ko: '난방기가 켜지기는 하는데 찬 바람만 나옵니다. 밤 공기는 점점 쌀쌀해지는데요.',
    place: 'desk',
    effect: 'cold',
    cost: 245,
    days: 1,
    sort: 2
  },
  {
    id: 'fix_stove',
    kind: 'repair',
    title: 'stove',
    title_ko: '가스레인지',
    body: "The stove's burners click and click but won't light, and the oven won't heat up.",
    body_ko: '가스레인지 버너가 딸깍딸깍 소리만 나고 불이 붙지 않습니다. 오븐도 데워지지 않아요.',
    place: 'eat',
    effect: 'cook',
    cost: 180,
    days: 2,
    sort: 3
  },
  {
    id: 'fix_water_heater',
    kind: 'repair',
    title: 'water heater',
    title_ko: '온수기',
    body: 'No hot water this morning. The shower ran cold the whole time.',
    body_ko: '오늘 아침 온수가 나오지 않습니다. 샤워 내내 찬물이었어요.',
    place: 'sleep',
    effect: 'shower',
    cost: 320,
    days: 1,
    sort: 5
  },
  {
    id: 'fix_window',
    kind: 'repair',
    title: 'window latch',
    title_ko: '창문 걸쇠',
    body: "The window by your bed won't latch, and cold air leaks in all night.",
    body_ko: '침대 옆 창문의 걸쇠가 걸리지 않아 밤새 찬 바람이 새어 들어옵니다.',
    place: 'sleep',
    effect: 'cold',
    cost: 120,
    days: 2,
    sort: 6
  },
  {
    id: 'n_fix_ask_derek',
    kind: 'text',
    hero: 'derek',
    sender: 'Riverside Home Services',
    title: 'Appointment booked',
    title_ko: '방문 예약',
    body: 'Riverside Home Services: your appointment to repair the {thing} is booked for {when}. Estimate: {cost} for the service call, parts and labor.',
    body_ko: '리버사이드 홈 서비스: {thing} 수리 방문이 {when}로 예약되었습니다. 예상 비용은 출장비·부품·공임을 합쳐 {cost}입니다.',
    sort: 36
  },
  {
    id: 'n_fix_ask_jun',
    kind: 'text',
    hero: 'jun',
    sender: 'carl',
    title: 'Repair request',
    title_ko: '수리 요청',
    body: "Thanks for telling me, kid. I'll come fix the {thing} on {when}. You don't have to be home: I've got my key.",
    body_ko: '알려 줘서 고마워. {when}에 가서 {thing} 고쳐 줄게. 집에 없어도 돼, 내가 열쇠가 있으니까.',
    sort: 30
  },
  {
    id: 'n_fix_ask_priya',
    kind: 'email',
    hero: 'priya',
    sender: 'Cedar Street Lofts',
    title: 'Work order received',
    title_ko: '수리 요청 접수',
    body: 'We received your maintenance request for the {thing}. Work order #{order} is scheduled for {when}. A technician will let themselves in; you do not need to be home.',
    body_ko: '{thing} 수리 요청이 접수되었습니다. 작업 번호 #{order}, 방문 일정은 {when}입니다. 기사가 열쇠로 들어가니 집에 계시지 않아도 됩니다.',
    sort: 33
  },
  {
    id: 'n_fix_done_derek',
    kind: 'email',
    hero: 'derek',
    sender: 'Riverside Home Services',
    title: 'Receipt',
    title_ko: '영수증',
    body: 'Thank you for choosing Riverside Home Services! The {thing} is repaired, and {cost} was charged to your card. Our work is guaranteed for 90 days.',
    body_ko: '리버사이드 홈 서비스를 이용해 주셔서 감사합니다! {thing} 수리를 마쳤고, {cost}가 카드로 결제되었습니다. 수리는 90일 동안 보증됩니다.',
    sort: 38
  },
  {
    id: 'n_fix_done_jun',
    kind: 'text',
    hero: 'jun',
    sender: 'carl',
    title: 'Repair done',
    title_ko: '수리 완료',
    body: 'All done. The {thing} is good as new. Holler if anything else acts up.',
    body_ko: '다 고쳤어. {thing}, 이제 새것처럼 멀쩡해. 또 말썽이면 불러.',
    sort: 32
  },
  {
    id: 'n_fix_done_priya',
    kind: 'email',
    hero: 'priya',
    sender: 'Cedar Street Lofts',
    title: 'Work order completed',
    title_ko: '수리 완료',
    body: 'Work order #{order} is complete: the {thing} has been repaired. Please let us know if the problem comes back.',
    body_ko: '작업 번호 #{order}: {thing} 수리를 마쳤습니다. 문제가 다시 생기면 알려 주세요.',
    sort: 35
  },
  {
    id: 'n_fix_entry_derek',
    kind: 'text',
    hero: 'derek',
    sender: 'Riverside Home Services',
    title: 'Appointment reminder',
    title_ko: '방문 알림',
    body: 'Reminder: your technician arrives tomorrow, {when}, to repair the {thing}. Someone 18 or older needs to be home.',
    body_ko: '알림: 내일 {when}에 기사가 {thing} 수리하러 방문합니다. 만 18세 이상인 분이 집에 계셔야 합니다.',
    sort: 37
  },
  {
    id: 'n_fix_entry_jun',
    kind: 'text',
    hero: 'jun',
    sender: 'carl',
    title: 'Notice of entry',
    title_ko: '출입 안내',
    body: 'Notice of entry: I will enter your unit on {when} to repair the {thing}. (Carl, 1A)',
    body_ko: '출입 안내: {when}에 {thing} 수리하러 자네 집에 들어갈게. (1A호 칼)',
    sort: 31
  },
  {
    id: 'n_fix_entry_priya',
    kind: 'email',
    hero: 'priya',
    sender: 'Cedar Street Lofts',
    title: 'Notice of entry',
    title_ko: '세대 출입 안내',
    body: 'Notice of entry: as state law requires, we are letting you know 24 hours ahead. Maintenance will enter your unit on {when} to repair the {thing} (work order #{order}).',
    body_ko: '세대 출입 안내: 주 법에 따라 24시간 전에 알려 드립니다. {when}에 {thing} 수리를 위해 관리 직원이 세대에 들어갑니다(작업 번호 #{order}).',
    sort: 34
  },
  {
    id: 'n_trash_fee_derek',
    kind: 'email',
    hero: 'derek',
    sender: 'River Road HOA',
    title: 'HOA fine',
    title_ko: '주택소유자협회 벌금',
    body: 'Hi {name}, the trash bags are still by your garage after our notice. As set in the HOA rules, a {fee} fine has been charged to your account.',
    body_ko: '{name} 님, 안내 뒤에도 차고 옆에 쓰레기봉투가 그대로 있습니다. 협회 규약에 따라 벌금 {fee}가 부과되었습니다.',
    sort: 26
  },
  {
    id: 'n_trash_fee_jun',
    kind: 'text',
    hero: 'jun',
    sender: 'carl',
    title: 'Pest control charge',
    title_ko: '해충 방제 비용',
    body: "Kid, we've got ants in the hallway now, so I had the exterminator out. Per the lease, the {fee} is on you. Keep that trash moving, okay?",
    body_ko: '이제 복도에 개미가 생겨서 방역 업체를 불렀어. 임대 계약서대로 {fee}는 자네 몫이야. 쓰레기 좀 제때 버려, 알았지?',
    sort: 21
  },
  {
    id: 'n_trash_fee_priya',
    kind: 'email',
    hero: 'priya',
    sender: 'Cedar Street Lofts',
    title: 'Cleaning charge',
    title_ko: '청소 비용',
    body: 'Hi {name}, trash left near your unit attracted pests, and we had the area treated. As set in your lease, a {fee} charge was added to your resident account and paid with your card on file.',
    body_ko: '{name} 님, 세대 근처에 둔 쓰레기 때문에 해충이 생겨 방역을 했습니다. 임대 계약에 따라 {fee}가 입주민 계정에 청구되어 등록된 카드로 결제되었습니다.',
    sort: 23
  },
  {
    id: 'n_trash_holiday_derek',
    kind: 'text',
    hero: 'derek',
    sender: 'Fairview Waste Services',
    title: 'Holiday pickup',
    title_ko: '휴일 수거 일정',
    body: 'Holiday schedule: this week trash and recycling pickup on River Road is one day late, on {day}. Carts at the curb by 7 AM.',
    body_ko: '휴일 일정 안내: 이번 주 리버 로드의 쓰레기·재활용 수거는 하루 늦은 {day}입니다. 오전 7시까지 수거통을 길가에 내놓으세요.',
    sort: 24
  },
  {
    id: 'n_trash_smell_derek',
    kind: 'email',
    hero: 'derek',
    sender: 'River Road HOA',
    title: 'Courtesy notice',
    title_ko: '안내 통지',
    body: 'Hi {name}, a neighbor let us know that trash bags are piled up by your garage, and raccoons got into them last night. Please keep trash in your cart with the lid closed and set it out the night before pickup. Thanks! (River Road HOA)',
    body_ko: '{name} 님, 차고 옆에 쓰레기봉투가 쌓여 있고 어젯밤 너구리가 그걸 헤집어 놓았다고 이웃이 알려 왔습니다. 쓰레기는 뚜껑을 닫은 수거통에 넣고 수거 전날 밤에 내놓아 주세요. 감사합니다. (리버 로드 주택소유자협회)',
    sort: 25
  },
  {
    id: 'n_trash_smell_jun',
    kind: 'text',
    hero: 'jun',
    sender: 'carl',
    title: 'Trash smell',
    title_ko: '쓰레기 냄새',
    body: "Hey kid, there's a funny smell in the hallway by your door. Take your trash out back to the bins, would you? Don't let it pile up.",
    body_ko: '어이, 자네 집 문 앞 복도에서 이상한 냄새가 나. 쓰레기는 건물 뒤 수거함에 갖다 버려 줄래? 쌓아 두지 말고.',
    sort: 20
  },
  {
    id: 'n_trash_smell_priya',
    kind: 'email',
    hero: 'priya',
    sender: 'Cedar Street Lofts',
    title: 'Odor near your unit',
    title_ko: '세대 근처 악취',
    body: 'Hi {name}, a neighbor reported a trash odor near your unit. Please take your bags to the trash room on the ground floor, and do not leave them in the hallway or on your balcony. Thank you! (Cedar Street Lofts Management)',
    body_ko: '{name} 님, 세대 근처에서 쓰레기 냄새가 난다는 이웃의 신고가 있었습니다. 쓰레기봉투는 1층 쓰레기 처리실에 버려 주시고, 복도나 발코니에 두지 마세요. 감사합니다. (시더 스트리트 로프트 관리사무소)',
    sort: 22
  },
  {
    id: 'nz_derek_alarm',
    kind: 'noise',
    hero: 'derek',
    title: 'A car alarm',
    title_ko: '자동차 경보음',
    body: 'At 2 AM a car alarm goes off across the street. It stops, and then it starts again.',
    body_ko: '새벽 2시, 길 건너편에서 자동차 경보음이 울립니다. 멈췄나 싶으면 다시 울려요.',
    choices: [
      {
        energy: -8,
        points: 3,
        r: 'A sleepy man in slippers apologizes, finds his keys and turns the alarm off for good.',
        r_ko: '슬리퍼 차림의 잠이 덜 깬 남자가 사과하고, 열쇠를 찾아 경보를 아예 꺼 버립니다.',
        t: "Go across and knock on the owner's door.",
        t_ko: '길을 건너가 차 주인 집 문을 두드린다.'
      },
      {
        energy: -10,
        points: 1,
        r: "Three neighbors reply \"SAME,\" and someone has the owner's number. It goes quiet at 2:40.",
        r_ko: '이웃 셋이 "우리도요"라고 답하고, 누군가 차 주인 번호를 알고 있었어요. 2시 40분에 조용해집니다.',
        t: 'Post in the River Road neighborhood group chat.',
        t_ko: '리버 로드 이웃 단체 채팅방에 글을 올린다.'
      },
      {
        energy: -15,
        points: 0,
        r: "An officer comes by but can't reach the owner. The alarm finally gives up at 3.",
        r_ko: '경찰관이 오지만 차 주인과 연락이 안 됩니다. 경보는 3시가 돼서야 멈춰요.',
        t: 'Call the police non-emergency line.',
        t_ko: '경찰의 비긴급 신고 번호로 전화한다.'
      },
      {
        energy: -15,
        points: -2,
        r: "Nobody hears you over the alarm, but a neighbor's light comes on, and you feel a bit silly.",
        r_ko: '경보음 때문에 아무도 못 들었는데, 이웃집 불이 켜지고 괜히 민망해집니다.',
        t: 'Yell "Turn it off!" from the porch.',
        t_ko: '현관 앞에서 "좀 꺼요!" 하고 소리친다.'
      }
    ],
    sort: 9
  },
  {
    id: 'nz_derek_dog',
    kind: 'noise',
    hero: 'derek',
    title: 'The dog next door',
    title_ko: '옆집 개',
    body: "It's 11 PM. The dog next door has been left out in the yard and won't stop barking.",
    body_ko: '밤 11시. 옆집 개가 마당에 혼자 남겨져 쉬지 않고 짖습니다.',
    choices: [
      {
        energy: -15,
        points: 0,
        r: "Nobody's home. The barking goes on, and now the dog is barking at you.",
        r_ko: '집에 아무도 없습니다. 개는 계속 짖고, 이제는 당신을 보고 짖어요.',
        t: 'Go knock on their front door.',
        t_ko: '옆집 현관문을 두드린다.'
      },
      {
        energy: -6,
        points: 3,
        r: "\"So sorry!! We're at a concert, my brother is going over to let him in.\" The yard is quiet in twenty minutes.",
        r_ko: '"정말 미안해요!! 공연 보러 나와 있어요. 동생이 가서 들여놓을 거예요." 20분 만에 마당이 조용해집니다.',
        t: "Text your neighbor (you have each other's numbers).",
        t_ko: '이웃에게 문자를 보낸다(서로 번호를 안다).'
      },
      {
        energy: -12,
        points: -2,
        r: 'They take a report and say an officer will come by in the morning. The neighbors find a notice on their door and stop waving to you.',
        r_ko: '신고를 받고 아침에 직원이 들르겠다고 합니다. 이웃은 문에 붙은 안내문을 보고 그 뒤로 인사를 안 해요.',
        t: 'Call animal control on the non-emergency line.',
        t_ko: '비긴급 신고 번호로 동물 관리국에 신고한다.'
      },
      {
        energy: -15,
        points: 0,
        r: 'The barking stops when your neighbors get home at 12:40.',
        r_ko: '이웃이 12시 40분에 돌아오자 짖는 소리가 그칩니다.',
        t: 'Put in earplugs and wait it out.',
        t_ko: '귀마개를 하고 그칠 때까지 기다린다.'
      }
    ],
    sort: 8
  },
  {
    id: 'nz_derek_yard',
    kind: 'noise',
    hero: 'derek',
    title: 'A party next door',
    title_ko: '옆집 마당 파티',
    body: "It's 11:30 PM on River Road. The house next door has a backyard party going: a speaker on the fence, a fire pit and a crowd.",
    body_ko: '리버 로드의 밤 11시 30분. 옆집 마당에서 파티가 한창입니다. 담장 위에 스피커, 화로, 그리고 사람들.',
    choices: [
      {
        energy: -5,
        points: 3,
        r: 'Your neighbor laughs, apologizes and carries the speaker inside. "Come grab a beer next time!"',
        r_ko: '이웃이 웃으며 사과하고 스피커를 안으로 들여놓습니다. "다음엔 맥주 한잔하러 와요!"',
        t: 'Walk over and ask them to turn the speaker down.',
        t_ko: '옆집에 가서 스피커 소리를 줄여 달라고 부탁한다.'
      },
      {
        energy: -12,
        points: 0,
        r: 'No reply: his phone is in his pocket at the party. The music goes on until 1.',
        r_ko: '답이 없습니다. 휴대전화는 파티 중인 그의 주머니 속에 있어요. 음악은 새벽 1시까지 이어집니다.',
        t: "Text your neighbor (you have each other's numbers).",
        t_ko: '이웃에게 문자를 보낸다(서로 번호를 안다).'
      },
      {
        energy: -10,
        points: -2,
        r: 'A patrol car stops by at 12:45, and the party winds down. Your neighbor is cool with you for a week.',
        r_ko: '12시 45분에 순찰차가 들르고 파티가 끝납니다. 이웃은 일주일 동안 당신에게 쌀쌀맞아요.',
        t: 'Call the police non-emergency line.',
        t_ko: '경찰의 비긴급 신고 번호로 전화한다.'
      },
      {
        energy: -8,
        points: 0,
        r: "The fan helps. You're asleep by 12:30.",
        r_ko: '선풍기 소리가 도움이 됩니다. 12시 반쯤 잠이 들어요.',
        t: 'Close the windows, turn on the fan and try to sleep.',
        t_ko: '창문을 닫고 선풍기를 켠 채 잠을 청한다.'
      }
    ],
    sort: 7
  },
  {
    id: 'nz_jun_car',
    kind: 'noise',
    hero: 'jun',
    title: 'A car stereo outside',
    title_ko: '창밖의 자동차 음악',
    body: "It's 12:30 AM. A car idles in the lot under your window with the windows down and the stereo up.",
    body_ko: '밤 12시 30분. 창문 아래 주차장에 차 한 대가 시동을 켠 채 서 있습니다. 창문을 내리고 음악을 크게 틀어 놓았어요.',
    choices: [
      {
        energy: -12,
        points: -2,
        r: '"Mind your own business!" comes back, louder than the music. They drive off twenty minutes later.',
        r_ko: '"남의 일에 신경 꺼요!" 음악보다 큰 소리가 돌아옵니다. 차는 20분 뒤에야 떠나요.',
        t: 'Lean out the window and yell at them to shut it off.',
        t_ko: '창밖으로 몸을 내밀고 음악 좀 끄라고 소리친다.'
      },
      {
        energy: -6,
        points: 2,
        r: 'Carl lives on the first floor and is awake too. He walks out in his bathrobe, says something to the driver, and the car leaves.',
        r_ko: '1층에 사는 칼도 깨어 있었습니다. 목욕 가운 차림으로 나가 운전자에게 몇 마디 하자 차가 떠납니다.',
        t: 'Text Carl, the landlord, about the noise.',
        t_ko: '집주인 칼에게 소음 문제로 문자를 보낸다.'
      },
      {
        energy: -12,
        points: 0,
        r: 'A patrol car comes by forty minutes later. By then the lot is empty.',
        r_ko: '40분 뒤 순찰차가 옵니다. 그때는 주차장이 이미 비어 있어요.',
        t: 'Call the police non-emergency line.',
        t_ko: '경찰의 비긴급 신고 번호로 전화한다.'
      },
      {
        energy: -10,
        points: 0,
        r: 'The car leaves at 1:15. You lie awake a while longer.',
        r_ko: '차는 1시 15분에 떠납니다. 그 뒤로도 한동안 잠이 안 와요.',
        t: 'Shut the window, put in earplugs and wait it out.',
        t_ko: '창문을 닫고 귀마개를 한 채 차가 떠나기를 기다린다.'
      }
    ],
    sort: 3
  },
  {
    id: 'nz_jun_party',
    kind: 'noise',
    hero: 'jun',
    title: 'Music through the ceiling',
    title_ko: '천장 너머 음악 소리',
    body: "It's 11:40 PM. Upstairs, someone has people over: loud music, a thumping bass and a lot of laughing. Your alarm goes off at 7.",
    body_ko: '밤 11시 40분. 위층에 손님들이 왔는지 음악 소리가 크고, 베이스가 쿵쿵 울리고, 웃음소리가 끊이지 않습니다. 알람은 7시에 울려요.',
    choices: [
      {
        energy: -5,
        points: 3,
        r: "A guy in a party hat opens the door. \"Oh man, sorry! We didn't know it carried.\" The music drops to a murmur, and you're asleep before midnight.",
        r_ko: '고깔모자를 쓴 남자가 문을 엽니다. "아이고, 미안해요! 아래까지 들리는 줄 몰랐어요." 음악이 작아지고, 자정 전에 잠이 듭니다.',
        t: 'Go upstairs, knock and ask nicely if they could turn it down.',
        t_ko: '위층에 올라가 노크하고 소리를 좀 줄여 달라고 정중하게 부탁한다.'
      },
      {
        energy: -20,
        points: 0,
        r: "Carl is fast asleep. At 6 AM he texts back: \"Sorry kid, just saw this. I'll have a word with them.\" The party went on until 2.",
        r_ko: '칼은 곤히 자고 있습니다. 아침 6시에 답이 옵니다. "미안, 이제 봤어. 내가 한마디 할게." 파티는 새벽 2시까지 이어졌어요.',
        t: 'Text Carl, the landlord, about the noise.',
        t_ko: '집주인 칼에게 소음 문제로 문자를 보낸다.'
      },
      {
        energy: -15,
        points: -2,
        r: "An officer knocks upstairs after 1 AM, and the music stops. In the morning your upstairs neighbor won't look at you on the stairs.",
        r_ko: '새벽 1시가 넘어 경찰관이 위층 문을 두드리고 음악이 멈춥니다. 다음 날 아침 위층 이웃은 계단에서 당신과 눈도 마주치지 않아요.',
        t: 'Call the police non-emergency line.',
        t_ko: '경찰의 비긴급 신고 번호로 전화한다.'
      },
      {
        energy: -20,
        points: 0,
        r: 'The bass still gets through the pillow. You finally drift off around 2 AM.',
        r_ko: '베개를 뚫고 베이스가 계속 울립니다. 새벽 2시쯤에야 겨우 잠이 들어요.',
        t: 'Put in earplugs, pull the pillow over your head and try to sleep.',
        t_ko: '귀마개를 하고 베개를 뒤집어쓴 채 잠을 청한다.'
      }
    ],
    sort: 1
  },
  {
    id: 'nz_jun_tv',
    kind: 'noise',
    hero: 'jun',
    title: 'The TV next door',
    title_ko: '옆집 TV 소리',
    body: 'Just after midnight, the TV next door comes on loud: car chases and explosions through the thin wall.',
    body_ko: '자정이 막 지나자 옆집 TV 소리가 크게 들립니다. 얇은 벽 너머로 자동차 추격전과 폭발음이 울려요.',
    choices: [
      {
        energy: -3,
        points: 3,
        r: "Your neighbor, a nurse just home from a late shift, is embarrassed. \"I had no idea these walls were so thin.\" It's quiet in five minutes.",
        r_ko: '늦은 근무를 마치고 막 들어온 간호사인 이웃이 미안해합니다. "벽이 이렇게 얇은 줄 몰랐어요." 5분 만에 조용해집니다.',
        t: 'Knock on their door and ask them politely to turn it down.',
        t_ko: '옆집 문을 두드리고 소리를 줄여 달라고 정중하게 부탁한다.'
      },
      {
        energy: -12,
        points: 1,
        r: "No answer until morning. Then Carl says he'll remind the tenant next door about quiet hours, 10 PM to 7 AM.",
        r_ko: '아침까지 답이 없습니다. 아침에 칼이 옆집 세입자에게 조용히 해야 하는 시간(밤 10시~아침 7시)을 다시 알려 두겠다고 합니다.',
        t: 'Text Carl, the landlord, about the noise.',
        t_ko: '집주인 칼에게 소음 문제로 문자를 보낸다.'
      },
      {
        energy: -15,
        points: -2,
        r: 'The dispatcher takes your name and says a loud TV is low priority. Nobody comes, and the TV goes off at 1:30.',
        r_ko: '접수원이 이름을 받아 적고는 TV 소음은 급한 일이 아니라고 합니다. 아무도 오지 않고, TV는 1시 반에 꺼집니다.',
        t: 'Call the police non-emergency line.',
        t_ko: '경찰의 비긴급 신고 번호로 전화한다.'
      },
      {
        energy: -8,
        points: 0,
        r: 'It mostly works. You wake up once at 3 AM with the cable around your neck.',
        r_ko: '그럭저럭 효과가 있습니다. 새벽 3시에 헤드폰 줄이 목에 감긴 채 한 번 깹니다.',
        t: 'Put on headphones with rain sounds and go to sleep.',
        t_ko: '헤드폰으로 빗소리를 틀어 놓고 잠든다.'
      }
    ],
    sort: 2
  },
  {
    id: 'nz_priya_drums',
    kind: 'noise',
    hero: 'priya',
    title: 'Drums downstairs',
    title_ko: '아래층 드럼 소리',
    body: "It's 10:30 PM. The loft below yours is practicing on an electronic drum kit. The pedal thuds come right up through the floor.",
    body_ko: '밤 10시 30분. 아래층 로프트에서 전자 드럼을 연습합니다. 페달 밟는 쿵쿵 소리가 바닥을 타고 그대로 올라와요.',
    choices: [
      {
        energy: -3,
        points: 3,
        r: 'A college student answers, headphones around her neck. She had no idea the pedal carried. You agree on no drums after 9.',
        r_ko: '헤드폰을 목에 건 대학생이 문을 엽니다. 페달 소리가 위로 울리는 줄 몰랐대요. 밤 9시 이후에는 치지 않기로 합니다.',
        t: 'Go downstairs and ask them, politely, to stop for the night.',
        t_ko: '아래층에 내려가 오늘 밤은 그만해 달라고 정중하게 부탁한다.'
      },
      {
        energy: -10,
        points: 1,
        r: 'The management emails the whole floor a quiet-hours reminder the next day. Tonight the drums go on until 11:30.',
        r_ko: '다음 날 관리사무소가 층 전체에 조용한 시간 안내 메일을 보냅니다. 오늘 밤 드럼은 11시 반까지 이어져요.',
        t: 'Send a noise complaint through the resident portal.',
        t_ko: '입주민 포털에 소음 민원을 넣는다.'
      },
      {
        energy: -10,
        points: -2,
        r: 'The dispatcher says practice music before 11 is a matter for your building. You feel a little silly.',
        r_ko: '접수원이 11시 전의 악기 연습은 건물에서 해결할 일이라고 합니다. 좀 민망해지네요.',
        t: 'Call the police non-emergency line.',
        t_ko: '경찰의 비긴급 신고 번호로 전화한다.'
      },
      {
        energy: -8,
        points: 0,
        r: 'It stops at 11:30. You get a few chapters in.',
        r_ko: '11시 반에 소리가 그칩니다. 책은 몇 장 읽었어요.',
        t: 'Put in earplugs and read until it stops.',
        t_ko: '귀마개를 하고 소리가 그칠 때까지 책을 읽는다.'
      }
    ],
    sort: 5
  },
  {
    id: 'nz_priya_roof',
    kind: 'noise',
    hero: 'priya',
    title: 'A party on the roof deck',
    title_ko: '옥상 데크의 파티',
    body: "It's 11:15 PM. A party on the roof deck right above your loft is still going, past the building's 10 PM quiet hours.",
    body_ko: '밤 11시 15분. 로프트 바로 위 옥상 데크에서 파티가 아직 한창입니다. 건물의 조용한 시간(밤 10시)이 지났는데도요.',
    choices: [
      {
        energy: -5,
        points: 3,
        r: 'The host, a guy from the fourth floor, is embarrassed. "Totally lost track of time." They pack up by 11:45.',
        r_ko: '파티를 연 4층 남자가 민망해합니다. "시간 가는 줄 몰랐어요." 11시 45분에 다들 정리하고 내려갑니다.',
        t: 'Go up to the roof and ask them to wrap it up.',
        t_ko: '옥상에 올라가 이제 그만 정리해 달라고 부탁한다.'
      },
      {
        energy: -6,
        points: 2,
        r: 'A courtesy officer clears the deck in twenty minutes and logs it for the management. Nobody knows it was you.',
        r_ko: '야간 관리 요원이 20분 만에 옥상을 정리하고 관리사무소에 기록을 남깁니다. 누가 신고했는지는 아무도 몰라요.',
        t: "Call the building's after-hours courtesy line.",
        t_ko: '건물의 야간 민원 전화(courtesy line)에 전화한다.'
      },
      {
        energy: -10,
        points: -2,
        r: 'Two officers show up at 12:30, and the party ends. The next morning the building group chat is full of "Who called the cops?"',
        r_ko: '12시 반에 경찰관 두 명이 오고 파티가 끝납니다. 다음 날 아침 건물 단체 채팅방은 "누가 경찰 불렀어?"로 시끌시끌해요.',
        t: 'Call the police non-emergency line.',
        t_ko: '경찰의 비긴급 신고 번호로 전화한다.'
      },
      {
        energy: -15,
        points: 0,
        r: 'You sleep, more or less. The bass gets through until 1 AM.',
        r_ko: '자긴 잡니다, 그럭저럭. 베이스 소리가 새벽 1시까지 뚫고 들어와요.',
        t: 'Put in earplugs and turn on a white-noise app.',
        t_ko: '귀마개를 하고 백색소음 앱을 켠다.'
      }
    ],
    sort: 4
  },
  {
    id: 'nz_priya_shout',
    kind: 'noise',
    hero: 'priya',
    title: 'Shouting next door',
    title_ko: '옆집의 고함 소리',
    body: "Just after 1 AM, there's shouting next door, then a crash against the shared wall. Then it's quiet.",
    body_ko: '새벽 1시가 막 지나 옆집에서 고함 소리가 들리더니, 같이 쓰는 벽에 뭔가 쾅 부딪힙니다. 그러고는 조용해집니다.',
    choices: [
      {
        energy: -10,
        points: 1,
        r: "A tired voice behind the door says they're fine, thanks. You go back to bed, but it takes a while to fall asleep.",
        r_ko: '문 너머로 지친 목소리가 괜찮다며 고맙다고 합니다. 다시 누웠지만 잠들기까지 한참 걸려요.',
        t: 'Knock on their door and ask if everyone is okay.',
        t_ko: '옆집 문을 두드리고 다들 괜찮은지 묻는다.'
      },
      {
        energy: -12,
        points: 0,
        r: 'The courtesy officer tells you a crash and shouting is a call for the police, not for them.',
        r_ko: '야간 관리 요원은 고함과 부딪히는 소리는 자기들이 아니라 경찰에 신고할 일이라고 합니다.',
        t: "Call the building's after-hours courtesy line.",
        t_ko: '건물의 야간 민원 전화(courtesy line)에 전화한다.'
      },
      {
        energy: -8,
        points: 3,
        r: "An officer comes to check on them. Everyone is okay: a fallen shelf and a bad night. It's quiet after that.",
        r_ko: '경찰관이 와서 옆집을 살펴봅니다. 다들 괜찮대요. 선반이 넘어졌고, 힘든 밤이었을 뿐이에요. 그 뒤로는 조용합니다.',
        t: 'Call the police non-emergency line.',
        t_ko: '경찰의 비긴급 신고 번호로 전화한다.'
      },
      {
        energy: -12,
        points: -2,
        r: 'It stays quiet, but you lie awake wondering whether you should have done something.',
        r_ko: '조용하긴 한데, 뭔가 했어야 했나 싶어 한참을 뒤척입니다.',
        t: 'Put in earplugs and try not to think about it.',
        t_ko: '귀마개를 하고 신경 쓰지 않으려 애쓴다.'
      }
    ],
    sort: 6
  }
];

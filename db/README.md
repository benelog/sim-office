# 게임 데이터와 시나리오 쓰기

게임의 대화·인물·물품·달력·규칙은 모두 이 폴더의 JS 모듈에 있습니다. `node tools/db.mjs build`가 이것을 `office/data/db.js`(게임이 읽는 `window.SO_DB`)로 만들고, `node tools/db.mjs push`가 공개 사본인 DoltHub [benelog/sim-office](https://www.dolthub.com/repositories/benelog/sim-office)에 맞춰 올립니다. `db.js`는 생성물이라 직접 고치지 않습니다.

```
db/
  schema.sql                  표와 열(순서·기본값·기본 키). db.js의 열 순서도 이것을 따름
  world/                      세계: 규칙과 장소·사람·물건·전화·일·집
    config.mjs                규칙(config): 키 → [값, 설명]
    places.mjs  people.mjs  heroes.mjs  things.mjs  days.mjs  smalltalk.mjs
    phone.mjs  radio-tv.mjs  money.mjs  work.mjs  friends.mjs  home.mjs
  scenarios/                  대화(에피소드)
    jun/  derek/  priya/      주인공별: week1(1~7일) week2(8~15일) meetings(미션 뒤 회의) review calendar
    shared/                   여러 주인공 것(hero all, jun,derek …): meetings, errands(약국·클리닉)
```

파일 이름과 나누는 방식은 자유입니다. `db/` 아래의 모든 `.mjs`를 읽고, 같은 행(기본 키)이 두 파일에 있으면 오류입니다.

## 작업 순서

```sh
node tools/db.mjs build                 # db/ → office/data/db.js, 이어서 tools/db-lint.mjs (참조·턴·보기·한국어 검사)
TMPDIR=/tmp/claude-1000 tools/office-check.sh /tmp/claude-1000/oc/out   # 헤드리스로 대화 자동 진행 (SO_HERO, SO_DAYS)
source .envrc
node tools/db.mjs diff                  # DoltHub와 다른 행 (push가 보낼 REPLACE·DELETE 문)
node tools/db.mjs push                  # DoltHub에 반영 (문장 하나가 커밋 하나, 약 2초)
```

- `build`는 인터넷 없이 됩니다. 게임은 바로 새 데이터로 돌아갑니다.
- `push`는 바뀐 행만 보냅니다(새 행·바뀐 행은 몇 개씩 묶은 `REPLACE INTO`, 지운 행은 `DELETE`). 한 문장이 DoltHub API의 크기 한도를 넘지 않게 알아서 나눕니다.
- `node tools/db.mjs pull`은 DoltHub의 내용으로 `db.js`를 만듭니다(누가 DoltHub에서 직접 고쳤는지 볼 때). `db/`에 옮기는 것은 손으로 합니다.
- 표에 열을 더하거나 빼려면 `schema.sql`을 고치고, 같은 내용의 `ALTER TABLE …`을 파일에 써서 `node tools/db.mjs sql <파일>`로 DoltHub에 한 번 실행합니다. 그 뒤 `diff`가 0건이면 맞습니다.

## 시나리오(에피소드) 하나

에피소드는 한 인물과 한 장소에서 나누는 대화입니다. 턴마다 상대의 말 → 하고 싶은 말(안내) → 보기 넷(맞는 말 `model` + 그럴듯하지만 틀린 말 셋)에서 고르기 → 맞히면 상대의 답. 틀린 보기마다 상대의 반응이 있습니다. 화면에 보이는 글은 모두 한국어 짝(`_ko`)이 있어야 합니다. 대사는 영어로 읽힙니다(목소리).

```js
// db/scenarios/jun/week3.mjs
export const hero = 'jun';                 // 이 파일의 에피소드와 달력 항목의 주인공(행마다 hero를 써도 됨)

export const episodes = [
  {
    id: 'd16_parking',                     // 주인공별 접두어: Jun d<날>_…, Derek dk_…, Priya pr_…, 회의 rt_…
    title: 'A parking ticket', title_ko: '주차 위반 딱지',
    place: 'office_lobby', npc: 'tom',     // world/places.mjs, world/people.mjs의 id
    day_from: 16, day_to: 18,              // 게임 날(1일 = 2026-10-05 월요일). 기본 1~99, day_to: null은 끝없음
    time_from: '08:30', time_to: '12:00',  // 이 시간에만 열림
    requires: 'd15_expenses',              // 먼저 끝내야 하는 에피소드(쉼표로 여럿)
    summary: 'Tom found a ticket on your windshield. …', summary_ko: '톰이 당신 차 앞유리에서 딱지를 발견했습니다. …',
    reward: 0, energy: 0,                  // 끝에 받는(음수면 내는) 돈과 에너지
    sort: 10,                              // 같은 날 여러 개일 때 순서
    tags: 'coworker,small-talk',           // 엔진이 읽는 태그: phone(인물 없이 장소에서 받는 전화) errand(미션 아님)
                                           //   sick(병가 전화) review(평가) video(화상 회의)
    calendar: { day: 16, time: '09:00', title: 'Ask Tom about the ticket', title_ko: '톰에게 딱지 물어보기' },
    turns: [
      {
        speaker: 'tom',                    // 말하는 사람(없으면 npc)
        situation: 'The lobby. Tom waves a yellow envelope.', situation_ko: '로비. 톰이 노란 봉투를 흔듭니다.',
        line: 'Is this yours? It was on a blue sedan out front.', line_ko: '이거 당신 거예요? 앞에 세운 파란 세단에 있었어요.',
        prompt: 'Say yes, and ask where you can pay it.', prompt_ko: '맞다고 하고, 어디서 내는지 물어보세요.',
        model: "That's mine, thanks. Do you know where I pay it?", model_ko: '제 거예요, 고마워요. 어디서 내는지 아세요?',
        distractors: [                     // 틀린 보기 셋: 사실이 틀리거나, 말투가 안 맞거나, 묻는 말의 답이 아님
          { text: '…', text_ko: '…', reaction: '…', reaction_ko: '…' },
          { text: '…', text_ko: '…', reaction: '…', reaction_ko: '…' },
          { text: '…', text_ko: '…', reaction: '…', reaction_ko: '…' }
        ],
        reply_speaker: 'tom', reply_line: 'Online, at the city website.', reply_ko: '온라인으로요, 시청 웹사이트에서요.'
      }
    ],
    phrases: [                             // (선택) 저장에만 쌓이는 배운 표현
      { id: 'd16_parking.where_pay', text: 'Where do I pay it?', meaning_ko: '어디서 내요?', category: 'errands' }
    ]
  }
];
```

- 턴은 3~6개(lint가 검사), 턴의 순서가 `seq`(1, 2, …)입니다. 달력 항목의 장소와 주인공은 에피소드를 따릅니다(다르면 `place`를 씀).
- 쓰지 않은 열은 `schema.sql`의 기본값(없으면 NULL)이 됩니다.
- 대화 없는 달력 항목은 `export const calendar = [{ day, time, title, title_ko, place }]`로 씁니다(`scenarios/<주인공>/calendar.mjs`).
- 미션은 주인공의 에피소드 가운데 `day_from` ≤ `config.mission_days`(15)이고 `errand` 태그가 없는 것입니다. 그 뒤의 되풀이 회의는 `world/work.mjs`의 `routines`가 대화 풀(`episodes` 열)에서 차례로 꺼냅니다.
- 실존 회사·인물 이름은 쓰지 않습니다(Seaside Labs, Summit Retail, Fairview는 가상).

## 그 밖의 데이터 모양

| 모듈의 export | 표 | 안에 쓰는 것 |
|---|---|---|
| `config` | config | `{ 키: ['값', '설명'] }` (값은 문자열로, 게임은 숫자로 읽을 수 있으면 숫자) |
| `npcs` | npcs | `chatter: [{ line, line_ko }]`(지나가며 하는 말, 차례로), `schedule: [{ days, time_from, time_to, place }]`(하루 일과, 처음 맞는 줄) |
| `messages` | messages | `replies: [{ label, label_ko, tone, tip_ko, answer, answer_ko, … }]`(id는 `<메시지>_a`, `_b` …) |
| `smalltalk` | smalltalk | `{ 'weather:rain': [{ line, line_ko }], … }` |
| 그 밖의 표 이름(`places`, `items`, `tasks`, `friends`, `home_events` …) | 같은 표 | 행 그대로 |

`seq`·`id`·`sort`를 직접 쓰면 순서로 정해지는 값보다 우선합니다. 각 표와 열의 뜻은 `schema.sql`의 주석, 규칙은 `office/PLAN.md`에 있습니다.

## 새 시스템(규칙)을 더할 때

엔진은 `office/engine/*.js`(세계·화면·대화)와 `office/systems/*.js`(생활의 규칙: 근태, 휴가, 집안일, 건강, 돈 …)로 나뉩니다. 새 규칙은 `office/systems/<이름>.js`를 만들어 `office/index.html`의 systems 목록에 넣고, 엔진에는 훅으로 붙입니다(`office/engine/hooks.js`).

- `on('morning', (night) => [...줄], order)`: 하루가 끝날 때 아침 카드에 넣을 줄(순서표는 `office/engine/day.js`)
- `showChoices({ row, kind, kicker, ok, pick, done })`: 보기 몇 개 중 고르는 카드(업무 사건·이웃 소음과 같은 모양, `office/engine/choices.js`)
- `debugPart({ … })`: 헤드리스 점검용 `SO.debug`에 더할 것

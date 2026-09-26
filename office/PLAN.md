# Sim Office — 설계서 (병렬 작업의 기준)

미국 IT 회사의 개발자로 출퇴근하며 일하는 오픈 월드 영어 학습 게임. 정적 웹, 빌드 없음, `file://`에서 동작.
어린 왕자 게임(저장소 루트)과는 별개이며 `office/` 아래에 있습니다. 공유하는 것: `vendor/three-game.min.js`(three.js r186 + GLTFLoader·SkeletonUtils), `lib/matcher.js`(자유 입력 판정), `tools/game_models/kit.py`(Blender 도구), `kenney/`(CC0 원본).

## 1. 게임

- **주인공**: Fairview(가상의 미국 도시)의 IT 회사 **Lakeside Labs**에 막 입사한 개발자(기본 이름 Jun, 시작할 때 이름과 캐릭터 선택).
- **하루**: 07:00 알람 → 출근(버스·도보) → 회의·업무 → 점심 → 퇴근 → 장보기 → 집에서 잠(→ 다음 날). 시간은 걸어 다닐 때만 흐르고(초당 1분, `config.minutes_per_second`) 대화 중에는 멈춥니다. 23:00이 되면 어디에 있든 잠듭니다.
- **달력**: 1일 = 첫 월요일. 주말(6·7일, 13·14일)은 자유 시간(장보기·공원). 3주(21일) 분량의 에피소드를 목표로 하되 우선 1~2주.
- **돈**: 시작 $1,200. 격주 금요일(5일, 15일)에 순급여 $2,600이 입금(payday, direct deposit)되고 21일에 월세 $1,450이 빠져나갑니다. 커피·버스·점심·식료품·출장비를 씁니다. 급여명세서(gross, federal withholding, 401(k), net)를 읽는 에피소드가 있습니다.
- **에너지**(0~100): 깨어 있으면 시간당 6씩 줄고, 먹으면 회복(item.energy). 30 아래면 HUD가 경고하고 20 아래면 걷기가 느려집니다. 잠자면 100.
- **에피소드**(DoltHub `episodes`/`turns`): 장소+인물에서 열리는 대화. `day_from~day_to`, `time_from~time_to`, `requires`를 만족하면 그 인물 머리 위에 `!` 표시가 뜨고 말을 걸면 시작. 턴마다 인물 대사 → 안내(prompt) → 플레이어가 **입력(Type)** 또는 **선택(Choose)** → 판정(`lib/matcher.js`, 키워드 그룹) → 인물의 답(reply). 끝나면 `phrases`가 **Phrasebook**에 들어가고 완료 기록.
- **Phrasebook**: 배운 표현 목록(영어·한국어 뜻·메모), 표현마다 ▶ 버튼으로 TTS 재생.
- **TTS**: 브라우저 `speechSynthesis`. **미국 영어(en-US) 목소리 우선**, 인물마다 `voice_pitch`·`voice_rate`(·`voice_like`: 목소리 이름 정규식). 인물 대사·답·Phrasebook·상점 품목 이름을 읽어 줍니다. 헤더에 Voice 체크박스.
- **상점**: 식료품점(market)·식당(diner)·커피 카트(coffee_cart)에서 `items`를 삽니다(잔액 확인, "You can't afford that"). 식료품은 인벤토리에 들어가 집에서 먹고, 식사·음료는 바로 먹습니다.
- **잠**: 집 침대(home_bed)에서 Sleep → 다음 날 07:00, 에너지 100, 급여·월세 처리, 그날의 캘린더 요약 카드.
- **저장**: `localStorage` `so.v1.saves` = `{ [이름]: { name, model, day, minute, money, energy, zone, at, done:{episodeId:true}, inventory:{itemId:n}, phrases:[id], log:[…], saved } }`(캐릭터 이름마다 한 판), `so.v1.last` = 마지막에 한 이름. 자동 저장(에피소드 완료·구매·존 이동·잠). 예전 한 판짜리 `so.v1.save`는 시작할 때 목록으로 옮깁니다.
- **조작**: 어린 왕자 게임과 같음. ↑↓/WS 걷기, ←→/AD 돌기, Shift 달리기, E/Enter 행동. 터치: 왼쪽 아래 조이스틱, 행동 버튼. HUD: 요일·날짜·시각, $잔액, 에너지 막대, 다음 일정, 현재 목표.

## 2. 파일

```
office/
  index.html  game.css  game.js        # 엔진·화면 (A1)
  zones/index.js, zones/<zone>.js     # 존 배치 (A2)
  data/db.js                          # DoltHub에서 내려받은 데이터 (tools/dolt.mjs pull, 생성물)
  models/<pack>.js, models/<character>.js   # base64 .glb (B, 생성물)
  PLAN.md                             # 이 문서
db/schema.sql, db/seed/NN-*.sql       # DoltHub에 넣는 SQL (C, D)
tools/dolt.mjs                        # push / query / pull
tools/office-models.py                # Kenney .glb → office/models/*.js (B)
tools/office-characters.py            # Quaternius → office/models/man-*, woman-*, rig-*.js
tools/office-check.sh, office-check.mjs   # 헤드리스 Chrome 점검 (A1)
kenney/<pack>/…glb + License.txt      # 쓰는 원본만 복사 (B)
```

1차 병렬 작업(2026-09-26)은 끝났습니다. 그때 규칙: 에이전트는 자기 파일만 만들고 고치며, 다른 에이전트의 파일은 이 문서의 명세를 믿고 진행하고, 없으면 임시 대체(placeholder)를 씁니다. 커밋은 하지 않습니다.

엔진이 존 파일에서 추가로 받는 것(A1 구현): `background`, `outside`(실내 바깥 바닥색), `portal.when(api)`, `setup(api)`, `update(api, dt)`. 엔진의 추가 규칙: 침대 Sleep은 20:00 이후나 에너지 25 이하일 때만, `office_desk`에 "Work for an hour", 버스 15분·식사 20분·음료 5분 경과, `tags`에 `phone`이 든 에피소드는 인물 없이 장소에서 여는 전화 대화, 열린 에피소드가 있으면 인물은 그 에피소드의 place에 섬, 음수 `reward`는 지출, city→airport 포털은 그날 출장 에피소드가 있을 때만.

## 3. 데이터 (DoltHub `benelog/sim-office`, main)

토큰은 `.envrc`(`source .envrc`). `node tools/dolt.mjs push db/seed/10-x.sql`(문장마다 커밋 1개, 2초; **여러 행을 한 INSERT로**), `node tools/dolt.mjs query "…"`, `node tools/dolt.mjs pull`(→ `office/data/db.js`, `window.SO_DB`). 스키마는 `db/schema.sql`. 시드는 `REPLACE INTO`로 써서 다시 밀어 넣어도 됩니다. 문장 구분은 **줄 끝의 `;`** 입니다(값 안의 `;`는 줄 끝에 오지 않게).

`SO_DB` 모양: `config` `{k:v}`(숫자는 숫자), 나머지는 행 배열. `turns.answers/distractors/hints/hints_ko`는 JSON(배열)으로 풀려 있습니다.

### 장소 id(고정) — zone
| zone | places |
|---|---|
| home | home_bed(sleep) home_desk home_kitchen(eat) home_door(door→city apartment_door) |
| city | apartment_door bus_stop coffee_cart park_bench office_door diner_door market_door parking airport_shuttle(door→airport, 출장이 잡힌 날만) |
| office | office_lobby(리셉션) office_desk(내 자리) office_desk_team office_kitchen office_meeting office_manager office_hr office_it office_door(→city office_door) |
| diner | diner_counter diner_table diner_door |
| market | market_shelves market_checkout market_door |
| airport | airport_checkin airport_security airport_gate airport_door(→city) airport_arrive(→hotel) |
| hotel | hotel_desk hotel_room(sleep) hotel_restaurant hotel_door(→client) hotel_shuttle(→airport) |
| client | client_lobby client_meeting client_door(→hotel) |

### 인물 id(고정) — model — 장소
| id | 이름·역할 | model | place |
|---|---|---|---|
| maya | Maya Chen, engineering manager | woman-suit | office_manager |
| derek | Derek Alvarez, senior developer (팀 동료) | man-hoodie | office_desk_team |
| priya | Priya Nair, product manager | woman-casual-2 | office_meeting |
| tom | Tom Becker, office manager (프런트) | man-casual | office_lobby |
| sam | Sam Reyes, IT helpdesk | man-casual-2 | office_it |
| linda | Linda Park, HR | woman-formal-2 | office_hr |
| rosa | Rosa, diner server | woman-casual-3 | diner_counter |
| mike | Mike, grocery cashier | man-worker | market_checkout |
| nina | Nina, barista (coffee cart) | woman-adventurer-2 | coffee_cart |
| carl | Carl, neighbor / landlord | man-farmer | bus_stop |
| greg | Greg Whitfield, client (Summit Retail의 VP) | man-suit | client_meeting |
| amy | Amy, airline agent | woman-formal-3 | airport_checkin |
| kelly | Kelly, hotel front desk | woman-suit-2 | hotel_desk |
| lee | Lee, TSA officer | man-worker-2 | airport_security |

플레이어 기본 모델 man-casual-3. 고를 수 있는 8명(캐스트가 안 쓰는 모습): man-casual-3 man-hoodie-2 man-suit-2 man-adventurer woman-casual woman-formal woman-adventurer woman-punk. 인물 모델은 겹쳐도 됩니다(행인은 캐스트가 안 쓰는 모습을 먼저 씀, `office/life.js`).

### 에피소드 id 규칙
`d<날>_<이름>` (예 `d1_badge`, `d3_one_on_one`, `d11_checkin`). 주말·반복은 `w_` (예 `w_market`). 턴은 3~6개. `answers`는 키워드 그룹 `[{all:[…]},{any:[…]}]`(구는 정확히, 5글자 이상 단어는 오타 1개 허용). `distractors`는 3개, 문법은 맞지만 상황에 안 맞는 문장. `hints`는 2개(첫 힌트는 표현 방향, 둘째는 `Key words: …`). `phrases`는 에피소드마다 4~8개, `id`는 `<episode>.<slug>`.

## 4. 모델 팩 (B → `office/models/`)

Kenney CC0 팩(원본 zip은 `/tmp/claude-1000/kenney-packs/`에 있음). Blender 5.2(`blender -b --python tools/office-models.py -- <pack…>`)로 .glb들을 팩 하나로 합쳐 base64 js로 씁니다: `(window.SO_MODELS = window.SO_MODELS || {})['<pack>'] = '<base64>'`. 팩 안의 조각은 **Kenney 파일 이름 그대로인 노드**(`building-a`, `desk`, `cup-coffee`)로 두고, 노드는 원점에 둡니다. 텍스처(`colormap.png`)는 **glb 안에 포함**(외부 파일 참조 금지: `file://`에서 못 읽음).

엔진 라이브러리: three.js r186(`vendor/three-game.min.js`, MIT)과 Yuka 0.7.8(`vendor/yuka.min.js`, MIT — `office/life.js`의 자동차·행인이 Vehicle+FollowPathBehavior로 움직이고, 행인은 SeparationBehavior·ObstacleAvoidanceBehavior로 서로와 주인공을 피함). 길찾기는 `game.js`의 격자 A*(0.25 칸)이며, three-pathfinding(내비메시)은 2026-09-27에 시험했으나 구역마다 메시 생성이 1.3~2.7초라 쓰지 않음.

| pack | 원본 | 노드(Kenney는 파일 이름 그대로, Quaternius는 게임 이름) | 게임 기본 배율 |
|---|---|---|---|
| `man-*`, `woman-*` (22개) + `rig-umc`, `rig-women` | Quaternius Ultimate Modular Men·Women (`tools/office-characters.py`) | 인물 파일은 골격+스킨 메시(애니메이션 없음, extras `rig`), 리그 파일에 클립 idle walk sprint sit emote-yes emote-no interact-right | 1 (키 남 0.96, 여 0.94) |
| `city` | city-kit-commercial 2.1, city-kit-suburban | building-a…h, building-skyscraper-a…c, detail-awning, detail-awning-wide, detail-parasol-a, detail-parasol-b, building-type-a…h, tree-large, tree-small, fence, fence-1x3, planter, driveway-short, path-short | 3 |
| `roads` | city-kit-roads | road-straight, road-straight-half, road-crossroad, road-crossroad-line, road-intersection, road-intersection-line, road-bend, road-bend-sidewalk, road-curve, road-crossing, road-end, road-side, road-square, tile-low, light-square, light-square-double, light-curved, traffic-light, road-sign-stop, road-sign-street, construction-cone, construction-barrier, dumpster, electricity-pole, sign-highway | 3 |
| `cars` | Quaternius Cars Pack (`quaternius/cars/*.fbx`) | sedan, hatchback, sports-car, sports-car-2, suv, taxi, police (차 노드 = 자식 `<차>_body`, `_wheel-back`(뒷바퀴 둘), `_wheel-front-left`, `_wheel-front-right`; 바퀴 원점은 차축, 도장 재질은 `paint…`, 전조등·후미등 재질 `Headlights`·`TailLights`) | 0.5 |
| `furniture` | furniture-kit(GLTF format) | 140개 전부 (텍스처 없음, 재질 색) | 1 |
| `food` | food-kit | 아래 목록(≈70개) | 0.6 |
| `nature` | Quaternius Stylized Nature MegaKit(무료 standard판, `quaternius/stylized-nature-megakit/`, 텍스처 있음) | tree-common-1/2/3/5, tree-pine-1…4, tree-twisted-1(붉은 거목), tree-dead-1, bush, bush-flowers, clover, fern, flower-3, flower-3-group, flower-4, flower-4-group, grass-short, grass-tall, grass-wispy-short, grass-wispy-tall, mushroom, mushroom-laetiporus, pebble-round-1…3, pebble-square-1…3, petal-1…3, plant-1, plant-1-big, plant-7, rock-1…3, path-round-small-1…3, path-round-thin, path-round-wide, path-square-small-1…3, path-square-thin, path-square-wide — 49개. 줄기는 빌드 때 1/4로 감량, 법선·UV는 정수로 양자화 | 0.4 |
| `park` | nature-kit (Kenney Nature Kit, 텍스처 없이 색 재질; 2026-09-27까지 `nature`였던 것 중 식물이 아닌 것) | sign, lily_large, lily_small, log, log_large, stump_round, stump_old, pot_large, pot_small, canoe, statue_column, statue_obelisk, statue_block, bridge_wood, fence_simple, fence_gate — 16개, 팔레트는 전처럼 다시 칠함 | 2 |
| `homeware` | Quaternius Ultimate Furniture Pack (`quaternius/ultimate-furniture/*.glb`, poly.pizza 변환본) | bed-double, bed-twin, bookcase, armchair, chair, closet, closet-short, desk, door-1…3, night-stand, office-chair, sofa-1, sofa-2, sofa-corner, stool, table-1, table-2 — 19개, 발자국 가운데가 원점. 집(home)의 가구 | 0.4 |
| `buildings` | Quaternius Buildings Pack (`quaternius/buildings/*.glb`, poly.pizza 변환본) | building-1-large, building-1-small, building-2-large, building-2-small, building-3-big, building-3-small, building-4, house-1, house-2 — 9개, 가운데 원점, 정면 +Z. 시내의 아파트·집 둘·상가 셋 | 1 |
| `wild` | Quaternius Ultimate Nature Pack (`quaternius/ultimate-nature/*.fbx`) | tree-common-1…5, tree-autumn-1/2, tree-pine-1…5, tree-birch-1…3, tree-willow-1/2, bush-1, bush-2, bush-berries, rock-1…4, rock-moss-1/2, stump, log, grass, grass-short, flowers, plant-1, plant-2 — 33개. 마을 밖 평원에 `SO_ZONE_KIT.dress`의 `wild`가 InstancedMesh로 뿌림(존 데이터에는 안 나옴) | 1 |

food: apple banana orange lemon grapes strawberry watermelon pear cherries avocado tomato onion carrot broccoli cabbage corn pepper paprika mushroom pumpkin egg bread loaf loaf-baguette croissant muffin donut donut-sprinkles cookie cupcake cake-slicer pancakes waffle burger burger-cheese fries hot-dog pizza pizza-box sandwich sub salad taco sushi-salmon maki-salmon rice-ball chinese bowl-soup bowl-cereal plate plate-dinner glass mug cup-coffee cup-tea frappe soda soda-can soda-bottle bottle-ketchup peanut-butter honey cheese bacon meat-patty sausage turkey fish can carton carton-small bag styrofoam ice-cream popsicle candy-bar chocolate barrel.

크기 목표: 팩 하나 3MB(base64) 이하, 인물 파일 400KB 이하(지금 75~299KB). 팩마다 노드 목록·크기를 `office/models/README.md`에 적습니다. 원본 .glb와 `License.txt`는 `kenney/<pack>/`에 복사(쓴 것만). 인물 원본은 `quaternius/<pack>/`.

좌표계: glTF Y-up. Kenney 도시 타일은 1×1(배율 3이면 3×3), 인물 키 약 0.95, 가구 벽 높이 1.29, 의자 좌판 0.24. 세단은 원본 2.5 길이(배율 0.6 → 1.5).

## 5. 존 파일 명세 (A2 → `office/zones/<zone>.js`, 엔진 A1이 읽음)

```js
SO_ZONES.office = {
  name: 'Lakeside Labs, 3rd floor', name_ko: '레이크사이드 랩스 3층',
  indoor: true,                       // 실내: 하늘 대신 단색 배경, 벽 안에서만 걸음
  size: [16, 12],                     // 걸을 수 있는 직사각형(x: -8..8, z: -6..6), 원점이 중심
  floor: '#d9d3c7',                   // 바닥 색 (실외 존은 잔디/아스팔트 색)
  tiles: [ { pack:'roads', node:'road-straight', at:[x,z], turn:0 }, … ],  // 바닥에 까는 것(도로·보도·바닥판). 충돌 없음
  props: [                            // 소품·건물. at=[x,z](발 위치), turn=도(반시계, 0이면 Kenney 정면(+Z)이 +z를 봄)
    { pack:'furniture', node:'desk', at:[2, 1], turn: 90, scale: 1, solid: [0.8, 0.5], id: 'desk_me' },
    { pack:'city', node:'building-a', at:[0, -9], turn: 0, solid: [2.7, 2.7] },
    { pack:'food', node:'cup-coffee', at:[2.1, 1.1], lift: 0.38, scale: 0.5 }   // lift: 바닥에서 띄우기(책상 위)
  ],
  places: {                           // places 테이블의 id → 위치와 바라보는 방향(선택)
    office_lobby: { at: [-6, 4], face: [-6, 2] },
    office_desk: { at: [2, 2], face: [2, 1], sit: true }
  },
  portals: [ { at: [-7, 5.5], size: [1.6, 1], to: 'city', arrive: 'office_door', label: 'Leave the office' } ],
  spawn: 'office_lobby',              // 이 존에 처음 올 때(arrive가 없을 때) 서는 곳
  lights: [ { at:[x,z], height: 1.2, color:'#ffe0b0', intensity: 1.5 } ],   // 실내 조명(선택)
  ambient: 0.9,                       // 선택
  map: {                              // 선택: 지도(Menu > Map)에 적을 거리 이름과 구역 이름
    streets: [ { name: 'Maple Street', along: 'x', at: 0 }, { name: 'Lake Avenue', along: 'z', at: 0 } ],
    areas: [ { name: 'Seaside Park', name_ko: '시사이드 공원', at: [-11.5, 11.5] }, { name: 'Fairview River', at: [10, 22.4], water: true } ]
  }
};
```

- `solid`: `true`이면 노드의 바운딩 박스로, `[w,d]`이면 그 크기의 축정렬 사각형(월드 축, `at` 중심)으로 충돌. 없으면 통과. **가구 조각은 원점이 모서리**(x 0..w, z -d..0)라 가구는 `solid:true`를 씁니다. `zones/index.js`의 `SO_ZONE_KIT.prop()`은 발자국 중심으로 적은 `at`을 노드 원점으로 바꿔 줍니다.
- `scale`은 팩 기본 배율에 곱해지는 값(기본 1). `pack:'box'`, `size:[w,h,d]`, `color`는 모델 없이 상자(placeholder, 벽·카운터에도 씀).
- 존은 서로 독립된 좌표계입니다(엔진이 존을 바꿀 때 씬을 통째로 교체).
- 인물은 존 파일에 두지 않습니다. `npcs.place` → `places[id].at`에 엔진이 세웁니다. 플레이어의 시작은 `home_bed` 옆.
- `zones/index.js`: `window.SO_ZONES = {}; window.SO_ZONE_FILES = ['home','city','office','diner','market','airport','hotel','client'];` 엔진은 이 목록대로 `zones/<zone>.js`를 `<script>`로 읽습니다.

## 6. 엔진 (A1 → `office/game.js`, `index.html`, `game.css`)

어린 왕자 엔진(`/game.js`)의 툰 셰이딩·모델 로딩(base64→`GLTFLoader.parse`)·대화창·TTS·조작·디버그 API를 가져와 **평평한 세계**로 다시 씁니다. Kenney 재질의 `map`(colormap)은 유지해야 합니다(툰 재질에 `map`을 넘김).

- `index.html`: 헤더(게임 이름, 요일·시각, $, 에너지, Voice·Korean help 체크박스), 캔버스, 말풍선, 목표/일정 패널, 행동 버튼, 조이스틱, 대화창(situation·line·prompt·choices·typing·feedback·Type/Choose·Walk away·Continue), 상점 패널, Phrasebook 패널, 인벤토리, 시작 카드(이름·캐릭터 선택, 저장된 게임 목록에서 이어하기·삭제), 하루 요약 카드(잠잘 때), 메뉴 버튼(Phrasebook·Inventory·Calendar·Reset).
- 대화: 인물 대사는 말풍선+TTS+`dialog`. 정답이면 플레이어 말풍선, `emote-yes`. 3번 틀리면 모범 답 제시. Choose 모드는 `model`+`distractors`를 섞어 4개.
- 인물: `npcs`의 자리에 서서 가까이 오면 바라봄. 열린 에피소드가 있으면 머리 위 `!`. 없으면 `chatter`를 돌아가며 말함. 자리에 `sit:true`이면 `sit` 애니메이션.
- 시간·돈·에너지·잠·급여·월세·상점·인벤토리·Phrasebook·저장은 1절대로.
- 카메라: 플레이어 뒤 위(3인칭), 실내에서는 더 가깝게. 벽 뒤로 카메라가 들어가지 않게 바닥 위로 제한만.
- **지도**(Menu > Map, `M`): 존 데이터로 캔버스에 그립니다 — 도로 타일(보도 딸린 3×3 칸), 소품의 발자국(`SO_ZONE_KIT.BOX`, 건물·나무·차·가구), 장소 핀, 문, 존의 `map`에 적은 거리·구역 이름, 사람(지금 있는 자리, 다른 건물 안이면 그 건물 문 앞에 모아서, 열린 에피소드는 `!`), 목표(점선 원), 나(화살표). 실내에 있으면 Town / 지금 있는 곳 탭. 지도 아래에 사람·행동이 있는 장소 목록과 시외(공항·호텔·고객사)에 있는 사람. 열려 있는 동안 0.5초마다 다시 그립니다.
- 디버그 API `window.SO.debug`: `ready`, `state`('title'|'play'|'talk'|'shop'|'sleep'|'card'), `day`, `time`, `money`, `energy`, `zone`, `start(name?, model?)`, `goto(zone, placeId?)`, `episodes()`(지금 열 수 있는 것), `startEpisode(id)`, `advance()`(현재 턴에 모범 답 → Continue), `autoplayEpisode(id)`, `sleep()`, `buy(itemId)`, `panel(kind)`, `mapTab('town'|'room')`, `save`(현재 저장 객체), `saves`(저장된 이름들), `reset()`.
- 점검: `tools/office-check.sh <outdir> [steps.mjs] [w h]` — `tools/game-check.sh`와 같은 방식(bash에서 Chrome 헤드리스 띄우고 node가 CDP로 붙음, `TMPDIR=/tmp/claude-1000`). 기본 시나리오: 제목 화면 → 시작 → 집 → 각 존으로 goto해서 스크린숏 → 열 수 있는 에피소드 전부 autoplay → 잠 → 콘솔 오류 0, `finished: true`.
- 모델 팩이 아직 없으면(`SO_MODELS[pack]` 없음) 해당 소품은 회색 상자로 대체하고 콘솔 경고 1줄만.

## 7. 저작권·표기

Kenney 에셋은 CC0(표기 권장: "Kenney (www.kenney.nl)"), Quaternius 인물도 CC0(quaternius.com). three.js MIT. 대사·표현은 전부 자체 저작, 실제 회사·인물 이름을 쓰지 않습니다(Lakeside Labs, Summit Retail, Fairview는 가상). 안내는 영어 기본, 한국어는 `_ko`.

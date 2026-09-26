# 작업 지시서 — 어린 왕자 3D 플레이를 27장 전체로

2026-09-26 Book Play(`benelog/book-play`)의 `books/little-prince/game/`에서 시작했고, 같은 날 이 저장소로 옮겼습니다.
(옮기기 전 기록은 book-play의 커밋 579c001, 18623df에 있습니다.)

## 1. 현재 상태

- 엔진(`game.js`)과 레벨 **14장**(점등인), **15장**(지리학자)이 완성되어 있습니다. 나머지 25장이 남았습니다.
- 모델: prince, lamplighter, lamp, nature, geographer, desk, ledger, books, mountain, house, tower, tree.
- 15장 레벨 `levels/ch15.js`가 새 장을 만들 때의 본보기입니다: 장면 0 → 탐험 퀘스트(핫스폿 3개) → 장면 1 → 장면 2(바로 열림) → 장소로 걷기.
  바다와 하늘의 지구는 `setup`에서 three.js로 직접 만들고, 바다를 못 건너게 보이지 않는 소품(`ocean`, `solid`)을 둡니다.

### Book Play에서 가져온 것

| 파일 | 원본(book-play) | 비고 |
|---|---|---|
| `data/scenes.js` | `books/little-prince/scenes.js` | 장면·정답·오답. 원본을 고치면 다시 복사합니다 |
| `lib/storage.js`, `lib/matcher.js` | `js/storage.js`, `js/matcher.js` | 설정·진행 기록, 자유 입력 판정 |
| `reference/characters/` | `books/little-prince/images/characters/` | 인물 기준 이미지(자체 생성) |
| `icon.svg` | `icons/icon.svg` | |

"Back to the book" 링크는 https://book-play.benelog.net/books/little-prince/ 로 갑니다.
진행 기록(`lp.v1.little-prince.progress`)은 출처(origin)가 달라 책 사이트와 공유되지 않습니다.

## 2. 구조 (새 엔진)

- 주소: `index.html#14` = 14장, `index.html` = 장 메뉴. `levels/ch14.js`를 `<script>`로 불러오고, 레벨의 `models` 목록대로 `models/<이름>.js`를 불러옵니다(fetch 없음).
- 세계는 전부 구입니다. 작은 별은 `radius: 2`, 지구는 12~20(거의 평평). 위치는 레벨 중심(구의 꼭대기)에서 땅을 따라 잰 `[x, z]`입니다. `world.bumps`는 모래 언덕, `world.area`는 지구에서 걸을 수 있는 반경입니다.
- 레벨 명세 `LP_GAME.level({...})`:
  - `models`, `world { radius, ground, day, sun, sky, moon, stars, planets, tint, scatter[], bumps, area }`
  - `player { model: 'prince'|'pilot', at, face }`, `cast { id: { model, name, scale, at, face, voice, chat, talkRadius, idle, walk, … } }`
  - `props { id: { model, node, at, scale, turn, solid, shadow, lift, hidden } }`, `speakers { '대사 화자 이름': castId|'player' }`
  - `steps[]`: `{ goal:[en,ko], talk: id, scene: n }`(가서 말 걸기), `{ scene: n }`(바로 열리는 서술), `{ at, radius }`(장소 가기), `{ quest(g,dt) → true|0~1 }`, `{ until(g) }`
  - 훅: `enter` `leave` `opened` `answered` `replied` `skip`(자동 진행 테스트용)
  - `setup(g)`, `update(g, dt)`, `done { en, ko }`, `free`, `intro`, `camera { back, height, talkDistance }`
- 레벨이 쓰는 API `g`: `at` `ground` `orient` `dayness` `surfaceDist` `say` `speak` `goal` `meter` `hotspot(id, {at, radius, label, action, when})` `play(actor, anim, {once, hold, then})` `face` `walkTo` `addProp` `light` `halo` `glow(obj, 재질이름, on)` `show(id, on)` `shot(pos, look)` `next()` `data`, 그리고 `T`(three.js), `scene`, `cast`, `props`, `player`.
- 사람 애니메이션(Kenney 골격): idle, walk, sprint, interact-right/left, emote-yes/no, sit, pick-up, jump, crouch.
- 테스트 API `LP_GAME.debug`: `ready`, `start()`, `advance()`, `autoplay()`, `state`, `step`, `steps`.

## 3. 남은 작업 (순서대로)

### 3-2. 모델 (1차 병렬)

빌더마다 `tools/game_models/<파일>.py` 하나에 `MODELS = {'이름': build}`를 둡니다. 결과물은 `models/<이름>.js`입니다. 사람은 `kit.rig()` + `Figure` + `bind()`로 Kenney 골격에 붙이고(`prince.py` 참고), 기준 이미지 `reference/characters/<인물>.jpg`를 따릅니다.

| 묶음 | 모델 | 비고 |
|---|---|---|
| A | pilot, astronomer, grownup(1·4장의 어른들), sheep | pilot은 11개 장의 주인공 |
| B | rose(줄기·가시 4개, 흔들림), fox(네발 골격 직접: idle·walk·sit), snake(뼈 사슬, 기어가기) | Kenney 골격이 아닌 것들 |
| C | king, vainman, drinker, businessman, ~~geographer~~(완료) | 10~13장 |
| D | switchman, merchant, plane(조종사의 비행기), well(도르래·두레박), train·rail | 2·3·7·22·23·24·25장 |
| E | volcano(활화산·사화산), baobab(싹·나무), globe(유리 덮개), screen(바람막이), watering can, throne, bottles, telescope, rosebush, wheat(Kenney `crops_wheat*`), easel·drawing(모자처럼 보이는 보아뱀) | 소품. desk·ledger·books·mountain·house·tower·tree는 15장에서 만듦(19장의 큰 산은 `mountain`을 키우거나 새로) |

- 확인은 `blender -b --python tools/game-models.py -- <이름> --keep-glb <dir>`로 내보낸 뒤 EEVEE로 렌더링해서 합니다. 렌더 스크립트는 이번 세션의 scratchpad에만 있었으니 새로 만들어야 합니다. Workbench는 재질 색을 보여 주지 않습니다.
- Kenney 골격의 쉬는 자세는 T자이고, idle이 팔을 45° 내립니다. 새 팔은 35° 미리 내려서 만듭니다. 손에 드는 물건은 `posed()`로 idle 자세 기준으로 역산합니다.
- 추가 CC0 에셋은 `kenney/`에 원본 .glb와 License 파일을 함께 둡니다. CC-BY 에셋은 출처 표기를 README와 메뉴 카드에 넣어야 합니다(되도록 CC0만 씀).

### 3-3. 레벨 (2차 병렬, 모델이 끝난 뒤)

장마다 `levels/chNN.js` 하나. 장면(대사·정답·오답)은 `data/scenes.js`를 그대로 쓰고, 목표·퀘스트·완료 문구는 새로 씁니다(영어 + `ko`).

| 장 | 주인공 | 장면 수·화자 | 무대와 할 거리(제안) |
|---|---|---|---|
| 1 | pilot | 2: 어른, 낯선 사람 | 풀밭. 이젤의 그림 1호(모자 같은 보아뱀)를 어른에게 보여 줌 → 비행장의 비행기 |
| 2 | pilot | 2: 작은 목소리 / 어린 왕자 | 사하라, 불시착한 비행기, 새벽. 양 그림(상자) 건네기 |
| 3 | pilot | 2: 어린 왕자 | 사막, 비행기를 보고 묻는 왕자 |
| 4 | pilot | 2: 어른 | 천문학자와 망원경. 옷차림에 따라 믿고 안 믿는 어른들 |
| 5 | pilot | 2: 어린 왕자 | 사막에서 바오바브 이야기. 싹 뽑기 미니 게임 가능 |
| 6 | pilot | 2: 어린 왕자 | 해 질 녘. 해넘이 보기(해 움직임 활용) |
| 7 | pilot | 2: 어린 왕자 → 서술 | 비행기 볼트 고치기(핫스폿), 화난 왕자 |
| 8 | prince | 2: 장미 | B-612. 장미에 물 주기, 바람막이 가져오기 |
| 9 | prince | 2: 서술 / 장미 | 화산 청소 3곳, 바오바브 싹 뽑기, 유리 덮개, 철새 |
| 10 | prince | 2: 왕 | 왕의 별, 망토와 왕좌 |
| 11 | prince | 2: 허영쟁이 | 박수 치면 모자를 들어 인사 |
| 12 | prince | 2: 술꾼 | 병이 널린 탁자 |
| 13 | prince | 3: 사업가 | 책상, 별 세기 |
| 14 | prince | 2: 점등인 | **완료** |
| 15 | prince | 3: 지리학자 | **완료** |
| 16 | pilot | 1: 서술 | 지구와 가로등 켜는 사람들의 발레(가로등이 해 지는 선을 따라 켜짐) |
| 17 | prince | 3: 뱀 | 밤 사막, 달, 금빛 뱀 |
| 18 | prince | 2: 꽃 | 사막의 꽃잎 세 장짜리 꽃, 멀리 대상 |
| 19 | prince | 1: 산 → 어린 왕자 | 높은 산 오르기, 메아리 |
| 20 | prince | 2: 장미들 / 서술 | 장미 5000송이 정원(개수는 150 이하로) |
| 21 | prince | 5: 여우 | 밀밭. 날마다 조금씩 가까이 앉기(sit) |
| 22 | prince | 2: 전철수 | 양쪽으로 달리는 기차 |
| 23 | prince | 1: 상인 | 갈증 해소 알약 |
| 24 | pilot | 2: 어린 왕자 / 서술 | 밤 사막 걷기, 우물 찾기 |
| 25 | prince | 2: 조종사 | 새벽 우물, 도르래로 물 긷기 |
| 26 | pilot | 3: 어린 왕자 | 무너진 담, 뱀, 작별 |
| 27 | pilot | 2: 서술 | 6년 뒤, 웃는 별들 |

(주인공은 `scenes.js`의 `role`, 화자는 `speaker`에서 옮김.)

- 각 레벨은 `tools/game-check.sh <장>`으로 `finished: true`가 나오고 콘솔 오류가 없어야 합니다. 퀘스트 스텝에는 `skip()`을 달아 자동 진행이 끝까지 가게 합니다.
- 스크린숏을 직접 보고 확인합니다. 인물이 땅에 서 있는지, 대화창이 인물을 가리지 않는지, 밤 장면이 너무 어둡지 않은지.

### 3-4. 통합과 마무리 (혼자)

1. `levels/index.js`의 `LP_GAME_READY`에 끝난 장을 넣습니다.
2. 점검 도구를 추가합니다: 레벨마다 `scene` 번호가 `data/scenes.js`에 있는지, `models` 이름마다 `models/<이름>.js`가 있는지.
3. 문서(`README.md`)를 고치고, 전체 크기를 봅니다. 모델 js는 인물 하나에 300~480KB 안팎입니다.
4. 커밋합니다. 배포 방식(GitHub Pages 등)은 아직 정하지 않았습니다.

## 4. 병렬 작업 규칙

- 에이전트는 **자기 파일만** 만들고 고칩니다: `tools/game_models/<자기 파일>.py`, `models/<자기 모델>.js`, `levels/chNN.js`, 필요하면 `kenney/`의 새 원본.
- 공용 파일(`game.js`, `index.html`, `game.css`, `kit.py`, `levels/index.js`)은 고치지 않습니다. 엔진에 필요한 기능은 레벨의 `setup`/`update` 안에서 `g.T`, `g.scene`으로 해결하고, 안 되면 보고만 합니다. 통합할 때 한꺼번에 반영합니다.
- 모델 이름은 표의 것만 씁니다(겹치면 `game-models.py`가 멈춤). 커밋은 에이전트가 하지 않습니다.
- 모델 1차가 끝나야 레벨 2차를 시작합니다(레벨은 모델이 있어야 확인 가능).
- 에이전트 수는 1차 5개, 2차 6~7개(장 4개씩 묶음)를 생각했습니다.

## 5. 지켜야 할 것

- **`file://`에서 동작**: fetch 금지, 모델은 base64 js. 로컬 이미지 파일은 WebGL 텍스처로 쓸 수 없습니다(교차 출처). 그림이 필요하면 도형으로 만들거나 캔버스로 그립니다.
- **저작권**: 생텍쥐페리 그림을 따라 만들지 않습니다. 인물은 `reference/characters/` 기준 이미지를 따릅니다. 인터넷의 "Little Prince" 3D 모델(팬아트)은 쓰지 않습니다.
- 대사와 정답은 `scenes.js`를 씁니다. 새로 쓰는 문구는 자체 저작이고, 원문 인용은 몇 단어로 제한합니다. 안내는 영어가 기본이고 한국어는 `ko`로 둡니다.
- 진행 기록은 본편과 같은 `lp.v1.little-prince.progress`에 남습니다(장 완료).

## 6. 알아 둘 것 (이번 세션에서 겪은 일)

- 이미지→3D 생성(Hyper3D)을 애드온에 든 공유 무료 키로 쓰려다 권한 검사에서 막혔습니다. 쓰려면 사용자 본인의 키가 필요합니다.
- Chrome을 node에서 spawn하면 죽습니다. bash에서 띄우고 node는 CDP로 붙습니다(`game-check.sh`가 그렇게 함).
- CSS에서 `.touch { display: none }` 같은 규칙을 쓰면 `body.touch`까지 숨겨집니다. 이 때문에 휴대폰 화면이 통째로 사라진 적이 있고, 클래스 이름을 `touch-only`로 바꿨습니다.
- Blender의 `me.materials.clear()`는 면의 재질 번호를 0으로 되돌립니다. 다시 지정해야 합니다(`kit.Figure.join`에 반영됨).
- Kenney 크레이터와 바위는 그대로 쓰면 인물보다 훨씬 큽니다. 크레이터는 0.65~0.85배에 높이를 반으로 줄였습니다.
- `game-check.sh`는 `TMPDIR`이 길면(세션 scratchpad 경로 등) Chrome이 소켓 경로 길이 제한으로 바로 죽습니다. `TMPDIR=/tmp/claude-1000`처럼 짧게 줍니다.
- 소품 `turn`: 0이면 Blender의 앞(-Y)이 레벨의 +x를 보고, 90이면 -z(보통 플레이어가 오는 쪽), -90이면 +z를 봅니다.
- 별의 해 반대쪽 하늘은 밤색입니다(하늘 색은 별 중심에서 본 방향으로 정해짐). 낮 별로 두려면 `world.sky.night`를 바꿉니다.

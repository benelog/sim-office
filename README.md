# Sim Office — 어린 왕자 3D 플레이

『어린 왕자』의 장마다 그 장의 무대를 3D로 걸어 다니며 인물과 영어로 대화하는 게임입니다.
2026-09-26 [Book Play](https://github.com/benelog/book-play)의 일부로 시작했다가 같은 날 이 저장소로 옮겼습니다. 앞으로의 작업은 `PLAN.md`에 있습니다.
`index.html`을 직접 열어도(`file://`) 동작합니다. `index.html`은 장 메뉴, `index.html#14`는 14장입니다.

지금 열린 장: **14장** 점등인, **15장** 지리학자 (`levels/index.js`의 `LP_GAME_READY`).

- 인물에게 다가가 말을 걸면(`E` 또는 Talk) `data/scenes.js`(Book Play에서 복사)의 그 장 장면이 열립니다. 답 방식(Type/Choose)과 Korean help 설정은 `lp.v1.settings`에 남습니다.
- 장면 사이에는 그 장의 이야기를 몸으로 겪는 퀘스트가 있습니다.
  - 14장: 하루가 1분인 별에서 40초 동안 햇빛 속에 머물기(지는 해를 향해 걸어야 함). 점등인은 해 질 녘·해 뜰 녘마다 가로등을 켜고 끕니다.
  - 15장: 자기 별을 한 번도 본 적 없는 지리학자 대신 탐험가가 되어 산(증거로 돌 가져오기)·바다·마을 둘러보기. 마지막에 하늘 낮은 곳의 지구 쪽으로 떠납니다.
- 끝나면 그 장을 완료로 기록하고(`lp.v1.little-prince.progress`) 학습 이력에 남깁니다.
- 조작: ↑↓/WS 걷기, ←→/AD 돌기, Shift 달리기, E 행동. 터치 기기는 왼쪽 아래 조이스틱과 행동 버튼.

## 파일

| 파일 | 내용 |
|---|---|
| `game.js` | 공통 엔진: 장 메뉴, 둥근 세계, 인물·소품, 카메라, 조작, 대화, 스텝, 테스트 API |
| `index.html`, `game.css` | 화면(메뉴, 시작·완료 카드, 대화창, 목표, 진행 막대, 행동 버튼) |
| `levels/index.js` | 메뉴에 여는 장 목록 |
| `levels/chNN.js` | 장 하나의 레벨 데이터(`LP_GAME.level({...})`) |
| `models/<이름>.js` | 모델 하나의 .glb를 base64로 담은 것. **생성물이라 직접 고치지 않습니다** |
| `vendor/three-game.min.js` | three.js r186 + GLTFLoader·SkeletonUtils를 esbuild로 묶은 일반 스크립트(MIT, `vendor/three.LICENSE`) |
| `kenney/` | 원본: Kenney Mini Characters·Nature Kit·Space Kit (CC0, 라이선스 파일 포함) |
| `data/scenes.js` | 장면·정답·오답(Book Play `books/little-prince/scenes.js` 사본) |
| `lib/storage.js`, `lib/matcher.js` | 설정·진행 기록, 자유 입력 판정(Book Play `js/` 사본) |
| `reference/characters/` | 인물 기준 이미지(정면·좌우·뒷모습, Book Play에서 가져옴) |

## 레벨 명세

레벨은 자기 `models` 목록의 `models/<이름>.js`만 불러옵니다(fetch 없이 `<script>`).

- 세계는 구입니다. 작은 별은 `radius` 2~3, 지구는 12~20(거의 평평). 위치는 레벨 중심(구의 꼭대기)에서 땅을 따라 잰 `[x, z]`이고, `+z`가 해 쪽입니다(`sun`이 90° 미만일 때).
- `world { radius, ground, day(초, 0이면 해가 멈춤), sun(각도), sky{night,dusk,glow,day,blue}, stars, moon, planets, tint, scatter[], bumps, area }`
- `player { model, at, face }`, `cast { id: { model, name, scale, at, face, voice, chat, talkRadius, talkAnim, idle, walk, … } }`
- `props { id: { model, node, at, scale, turn, solid, shadow, lift, hidden, clear, ink } }`, `speakers { '화자 이름': castId | 'player' }`
- `steps[]`: `{ goal:[en,ko], talk: id, scene: n }`(가서 말 걸기), `{ scene: n, with: id }`(바로 열리는 장면), `{ at, radius }`(장소 가기), `{ quest(g,dt) → true | 0~1, meter }`, `{ until(g) }`
  - 훅: `enter` `leave` `opened` `answered` `replied`, 자동 진행 테스트용 `skip`
- `setup(g)`, `update(g, dt)`, `done { en, ko }`, `free`, `intro`, `camera { back, height, talkDistance }`
- 레벨이 쓰는 API `g`: `at` `ground` `orient` `tangent` `dayness` `surfaceDist` `say` `speak` `goal` `meter` `hotspot(id, {at, radius, label, action, when})` `play` `face` `walkTo` `addProp` `light` `halo` `glow` `show` `shot` `next`, 그리고 `T`(three.js) `scene` `toon` `cast` `props` `player`.
  엔진에 없는 것은 `setup`/`update`에서 `g.T`, `g.scene`으로 만듭니다(예: 15장의 바다와 하늘의 지구).
- 사람 애니메이션(Kenney 골격): idle, walk, sprint, interact-right/left, emote-yes/no, sit, pick-up, jump, crouch.

## 모델 만들기

```sh
blender -b --python tools/game-models.py                        # 모든 모델
blender -b --python tools/game-models.py -- geographer desk     # 이것만
blender -b --python tools/game-models.py -- --list              # 이름과 빌더 파일
blender -b --python tools/game-models.py -- desk --keep-glb /tmp/glb   # .glb도 남김(확인용)
```

- 빌더는 `tools/game_models/<파일>.py`마다 `MODELS = {'이름': build}`를 둡니다. 공통 도구는 `kit.py`.

| 빌더 | 모델 |
|---|---|
| `prince.py`, `lamplighter.py`, `geographer.py` | 인물 |
| `lamp.py` | 가로등(유리 재질 `glass`가 빛남) |
| `desk.py` | `desk`(책상, 윗면 0.32), `ledger`(펼친 큰 장부), `books`(책 더미) |
| `landmarks.py` | `mountain`, `house`, `tower`, `tree` |
| `nature.py` | Kenney 바위·풀·크레이터 묶음(노드 이름으로 고름) |

- 인물은 Kenney Mini Characters의 **골격과 애니메이션**만 쓰고, 몸은 `reference/characters/`의 기준 이미지를 보고 기본 도형으로 새로 만들어 뼈대(head·torso·arm·leg)에 강체로 붙였습니다.
- Kenney 골격은 쉬는 자세가 T자이고 idle에서 팔을 45° 내립니다. 그래서 새 팔은 미리 35° 내려서 만듭니다. 손에 드는 것(점등인의 장대)은 idle 자세 기준으로 역산해서 붙입니다(`posed()`).
- Kenney 조각은 원래 색이 밝아서 게임에서 머티리얼 이름별로 다시 칠합니다(`world.tint`). 새 모델의 머티리얼 이름은 Kenney 것(rock, grass …)과 겹치지 않게 짓습니다.
- 모양은 툰 셰이딩(3단)과 뒷면을 부풀린 잉크 외곽선으로 맞춥니다.
- 크기: 인물 하나에 300~480KB, 소품은 5~25KB.

## 점검

```sh
TMPDIR=/tmp/claude-1000 tools/game-check.sh 15 <out>            # 스크린숏 + 끝까지 자동 진행
tools/game-check.sh 15 <out> "" 390 844                          # 휴대폰 크기
tools/game-check.sh 15 <out> my-steps.mjs                        # 직접 쓴 점검(ev, shot, sleep, log)
tools/game-check.sh 0 <out>                                      # 장 메뉴
```

헤드리스 Chrome을 DevTools 프로토콜로 조작합니다. `finished: true`가 나오고 콘솔 오류가 없어야 합니다.
`TMPDIR`이 길면 Chrome이 프로필의 소켓 경로 길이 제한(107바이트)에 걸려 바로 죽습니다("could not connect to Chrome").

## 알려진 한계

- 인물이 기본 도형 조합이라 삽화보다 단순합니다. 이미지→3D 생성(Hyper3D·Hunyuan3D 등)은 개인 API 키가 있어야 시험할 수 있습니다.
- 오프라인 저장은 없습니다. 진행 기록은 책 사이트(book-play.benelog.net)와 출처가 달라 공유되지 않습니다.

## 지켜야 할 것

- **`file://`에서 동작**: fetch 금지, 모델은 base64 js. 로컬 이미지는 WebGL 텍스처로 쓸 수 없습니다(교차 출처).
- **저작권**: 『어린 왕자』 원작은 미국(2039년까지)·프랑스(2032년까지)에서 보호 중입니다. 생텍쥐페리의 그림을 따라 만들지 않고, 인물은 `reference/characters/`를 따릅니다. 인터넷의 팬아트 3D 모델은 쓰지 않습니다.
  대사는 `data/scenes.js`(자체 저작, 원문 인용은 몇 단어)를 쓰고, 새 문구도 자체 저작입니다. 안내는 영어가 기본이고 한국어는 `ko`로 둡니다.

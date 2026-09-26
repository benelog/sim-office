# Sim Office

미국의 작은 도시 Fairview에 있는 IT 회사 **Lakeside Labs**에 막 입사한 개발자가 되어, 출퇴근하고 회의하고 점심을 먹고 장을 보며 **미국 일상·직장 영어**를 배우는 오픈 월드 3D 게임입니다.
정적 웹이고 빌드가 없으며, `office/index.html`을 직접 열어도(`file://`) 동작합니다. 루트 `index.html`은 거기로 넘겨 줍니다.

```sh
google-chrome "file://$PWD/office/index.html"
```

## 게임

- **하루**: 07:00 알람 → 버스나 걸어서 출근 → 스탠드업·1:1·스프린트 플래닝·고객 협상 → 다이너 점심 → 퇴근 → 장보기 → 잠(다음 날). 시간은 걸어 다닐 때 흐르고(초당 1분) 대화 중에는 멈춥니다. 23:00이면 어디서든 잠듭니다.
- **에피소드**: 장소와 인물에서 열리는 대화(머리 위 `!`). 인물의 대사를 듣고(브라우저 TTS, 미국 영어 목소리 우선) 안내에 맞춰 **직접 입력**하거나 **보기에서 고릅니다**. 세 번 틀리면 모범 답을 보여 줍니다. 끝나면 그 대화의 표현이 **Phrasebook**에 쌓이고(▶로 다시 듣기) Korean help를 켜면 한국어 뜻이 보입니다.
- **15일치 47개 에피소드**: 출입증 받기, 온보딩, 스탠드업, 코드 리뷰, 회의 옮기기, IT 헬프데스크, 1:1, 스프린트 플래닝, 마감 협의, HR 서류(W-4·PPO/HMO·401(k)), 급여명세서 읽기, 해피아워 거절, 다이너 주문과 팁, 식료품 계산, 집주인에게 수리 요청, 고객 킥오프, 범위·가격·지급 조건(Net 30/45)·SLA 협상, 출장 승인과 per diem, 항공권·호텔 예약, 공항 체크인·보안 검색·지연, 호텔 체크인·체크아웃, 고객사 방문, 고객과 저녁, 계약 서명, 초과 예약 바우처 협상, 경비 정산, 연봉 인상 요청, 병가 전화 등.
- **돈**: 시작 $1,200. 격주 금요일(5일·19일)에 순급여 $2,600이 입금되고 21일에 월세 $1,450이 빠집니다. 커피·버스·점심·식료품·출장비를 씁니다.
- **에너지**: 깨어 있으면 시간당 6씩 줄고 먹으면 회복됩니다. 30 아래면 경고, 20 아래면 느려집니다.
- **조작**: ↑↓/WS 걷기, ←→/AD 돌기, Shift 달리기, E/Enter 행동, P Phrasebook, I 인벤토리, C 달력, M 지도(마을 전체와 지금 있는 곳: 장소·문·사람·목표·거리 이름). 휴대폰은 왼쪽 아래 조이스틱과 행동 버튼. 진행은 `localStorage`(`so.v1.save`)에 저장되고 Continue로 이어갑니다.

## 파일

| 경로 | 내용 |
|---|---|
| `office/index.html`, `game.css`, `game.js` | 엔진: 존·인물·대화·TTS·시간·돈·상점·Phrasebook·저장·디버그 API(`SO.debug`) |
| `office/zones/<zone>.js` | 존 8개의 배치(home, city, office, diner, market, airport, hotel, client). `index.js`의 `SO_ZONE_KIT`가 배치 도우미(방 꾸미기, 마을 밖 산맥·바다) |
| `office/data/db.js` | DoltHub에서 내려받은 데이터(`window.SO_DB`). **생성물** |
| `office/life.js` | 거리의 삶: 걷는 행인·앉은 사람, 달리는 차, 신호등 |
| `office/models/*.js` | 모델(base64 .glb): Kenney 소품 팩, Quaternius 인물(`man-*`, `woman-*`)과 리그(`rig-*`). **생성물**, 목록은 `office/models/README.md` |
| `office/PLAN.md` | 설계서: 규칙, 데이터 모양, 장소·인물 id, 존 파일 명세, 엔진 요구사항 |
| `db/schema.sql`, `db/seed/*.sql` | DoltHub에 넣는 스키마와 시드(대화·인물·물품·달력) |
| `tools/dolt.mjs` | DoltHub push / query / pull |
| `tools/db-lint.mjs` | 데이터 검사(참조·턴 순서·정답 판정·오답 보기) |
| `tools/office-models.py`, `office-models-check.mjs` | Kenney .glb → 소품 팩 만들기와 검사 |
| `tools/office-characters.py`, `office-characters-check.mjs` | Quaternius → 인물·리그 만들기와 검사 |
| `tools/office-check.sh`, `office-check.mjs` | 헤드리스 Chrome 점검 |
| `kenney/<kit>/` | Kenney CC0 원본 .glb, 텍스처, 라이선스(쓰는 것만) |
| `quaternius/<pack>/` | Quaternius CC0 인물 원본(.gltf, .blend), 라이선스(쓰는 것만) |
| `lib/matcher.js` | 자유 입력 판정(키워드 그룹, 축약형, 오타 1개 허용) |
| `vendor/three-game.min.js` | three.js r186 + GLTFLoader·SkeletonUtils(MIT) |

## 데이터: DoltHub

대화·인물·잡담·물품·달력·설정의 원본은 DoltHub **[benelog/sim-office](https://www.dolthub.com/repositories/benelog/sim-office)**(main)입니다. 게임은 `file://`에서 fetch를 못 쓰므로 표를 통째로 `office/data/db.js`로 내려받아 씁니다.

```sh
source .envrc                                   # DOLTHUB_TOKEN
node tools/dolt.mjs push db/seed/14-week1.sql   # SQL 파일의 문장을 하나씩 DoltHub에 (문장마다 커밋 하나, 약 2초)
node tools/dolt.mjs query "select id, title from episodes where day_from = 3"
node tools/dolt.mjs pull                        # 모든 표 → office/data/db.js
node tools/db-lint.mjs                          # 내려받은 데이터 검사
```

- 표: `config`, `places`, `npcs`, `chatter`, `episodes`, `turns`, `phrases`, `items`, `calendar` (`db/schema.sql`에 설명).
- 쓰기 API는 **문장 하나에 커밋 하나**라서 시드는 여러 행을 한 `REPLACE INTO`에 넣습니다. URL로 인코딩해 16KB를 넘는 문장은 거부되니 큰 표는 문장을 나눕니다. 문장 구분은 줄 끝의 `;`.
- 문구를 고칠 때는 `db/seed/*.sql`을 고쳐 push하고 pull합니다. `db.js`는 직접 고치지 않습니다.

## 모델: Kenney·Quaternius CC0

인물은 Quaternius의 Ultimate Modular Men과 Ultimate Modular Women(같은 골격, 옷마다 머리·몸·다리·발 부품)을 부품을 섞고 옷·머리·피부색을 바꿔 22명으로 만들었습니다(키 약 0.95, 애니메이션은 남녀 리그 파일 `rig-umc`, `rig-women`에 idle walk sprint sit emote-yes emote-no interact-right). 소품은 Kenney의 도시(City Kit Commercial·Suburban), 도로(City Kit Roads), 자동차(Car Kit), 가구(Furniture Kit 140개), 음식(Food Kit 78개), 자연물(Nature Kit 71개: 나무·덤불·꽃·바위·길, 팔레트는 도시 키트에 맞춰 다시 칠함)을 Blender 5.2로 팩 하나씩 .glb로 합쳐 base64 js로 만듭니다. 노드 이름은 Kenney 파일 이름 그대로이고 텍스처는 .glb 안에 들어 있습니다.

```sh
blender -b --python tools/office-models.py                    # 전부
blender -b --python tools/office-models.py -- city food       # 이것만
node tools/office-models-check.mjs --sizes furniture          # 조각별 크기
blender -b --python tools/office-characters.py                # 인물 22명과 리그 2개
node tools/office-characters-check.mjs                        # 키·발·앞·리그 일치·클립·크기
```

## 점검

```sh
TMPDIR=/tmp/claude-1000 tools/office-check.sh /tmp/claude-1000/office-check/out            # 3일치: 제목 → 존 8개 → 열리는 대화 전부 → 잠 → 휴대폰 화면
SO_DAYS=15 TMPDIR=/tmp/claude-1000 tools/office-check.sh /tmp/claude-1000/office-check/out # 15일치(에피소드 47개)
```

헤드리스 Chrome을 DevTools 프로토콜로 조작해 스크린숏을 찍고 `SO.debug`로 대화를 자동 진행합니다. `finished: true`가 나오고 콘솔 오류가 없어야 합니다. `TMPDIR`이 길면 Chrome이 소켓 경로 길이 제한에 걸려 바로 죽습니다.

## 알려진 한계

- 실제 휴대폰과 실제 TTS 목소리는 헤드리스에서 확인할 수 없습니다(기기마다 목소리가 다릅니다).
- 반복 가능한 생활 에피소드(주말 장보기 등)는 한 번만 열립니다.

## 저작권·출처

- 인물: [Quaternius](https://quaternius.com) — [Ultimate Modular Men](https://quaternius.com/packs/ultimatemodularmen.html), [Ultimate Modular Women](https://quaternius.com/packs/ultimatemodularwomen.html)(원본 Google Drive가 다운로드 한도로 막혀 [poly.pizza 묶음](https://poly.pizza/bundle/Ultimate-Modular-Women-Pack-aCBDXDdTNN)의 glb를 씀) — CC0.
- 소품: [Kenney](https://www.kenney.nl) — [City Kit (Commercial)](https://kenney.nl/assets/city-kit-commercial), [City Kit (Suburban)](https://kenney.nl/assets/city-kit-suburban), [City Kit (Roads)](https://kenney.nl/assets/city-kit-roads), [Car Kit](https://kenney.nl/assets/car-kit)(달리는 차와 주차된 차 전부), [Furniture Kit](https://kenney.nl/assets/furniture-kit), [Food Kit](https://kenney.nl/assets/food-kit), [Mini Market](https://kenney.nl/assets/mini-market), [Mini Arcade](https://kenney.nl/assets/mini-arcade), [Factory Kit](https://kenney.nl/assets/factory-kit), [Nature Kit](https://kenney.nl/assets/nature-kit) — CC0.
- three.js — MIT (`vendor/three.LICENSE`).
- 대사·표현·인물·회사(Lakeside Labs, Summit Retail, Fairview)는 모두 자체 저작이며 가상입니다.
- 이 저장소는 2026-09-26 어린 왕자 3D 게임으로 시작했다가 같은 날 Sim Office로 바꿨습니다(이전 게임은 커밋 609621f).

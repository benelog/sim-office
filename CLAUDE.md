# CLAUDE.md

Sim Office — 미국 IT 회사의 직원으로 출퇴근하며 미국의 일상과 직장 생활을 겪어 보는 오픈 월드 3D 게임(2026-10-02에 영어 학습에서 생활 체험으로 바꿈: 화면은 영어·한국어 중 하나, 대화는 객관식만, 점수와 지각·결근·해고). 정적 웹, 빌드 없음, `file://`에서 동작. 게임은 `office/`에 있고 설계서는 `office/PLAN.md`입니다.

- **데이터**(대화·인물·물품·달력)의 원본은 DoltHub `benelog/sim-office`(토큰은 `.envrc`). SQL은 `db/schema.sql`, `db/seed/*.sql`에 두고 `source .envrc && node tools/dolt.mjs push db/seed/<파일>.sql`로 올린 뒤 `node tools/dolt.mjs pull`로 `office/data/db.js`를 다시 만듭니다. `db.js`는 생성물이라 직접 고치지 않습니다. 쓰기 API는 문장 하나당 커밋 하나이므로 여러 행을 한 `REPLACE INTO`에 넣습니다.
- **모델**: 소품·건물·음식은 Kenney CC0 팩(원본 `kenney/<kit>/`), 자동차·식물(`nature`)·집 가구(`homeware`)·건물 일부(`buildings`)·마을 밖 숲(`wild`)은 Quaternius CC0 팩(원본 `quaternius/<kit>/`, 출처는 `office/models/README.md`)을 `blender -b --python tools/office-models.py -- <pack>`으로, 인물은 Quaternius CC0(원본 `quaternius/`, Ultimate Modular Men·Women — 같은 골격, 옷마다 머리·몸·다리·발 부품)를 `blender -b --python tools/office-characters.py`로 `office/models/*.js`(base64 .glb)로 만듭니다. 인물 파일에는 애니메이션이 없고 `rig-umc.js`·`rig-women.js`의 클립을 공유합니다. 생성물이라 직접 고치지 않습니다.
- **`file://`에서 동작해야 합니다**: `fetch()` 금지, 외부 텍스처 파일 참조 금지(glb 안에 포함).
- 점검: `TMPDIR=/tmp/claude-1000 tools/office-check.sh <출력폴더>`. `TMPDIR`이 길면 Chrome이 바로 죽습니다. 스크린숏은 직접 열어 봅니다.
- 이 컴퓨터의 Chrome 확장 탭에서는 `requestAnimationFrame`이 돌지 않습니다. 사용자에게 보여 줄 때는 `google-chrome "file://$PWD/office/index.html"`처럼 일반 창에 엽니다.
- 원격 git 저장소: `git@github.com:benelog/sim-office.git`(공개, origin/main). `git push origin main`. GitHub Pages가 main 루트를 https://benelog.github.io/sim-office/ 로 배포합니다(`.nojekyll`).
- 엔진은 three.js(MIT, `vendor/three-game.min.js`) 위에 직접 짠 것이고, 자동차·행인 조향은 Yuka(MIT, `vendor/yuka.min.js`)의 Vehicle·FollowPath·Separation·ObstacleAvoidance를 씁니다. 길찾기는 자체 격자 A*(three-pathfinding은 구역마다 메시 생성에 1~3초가 걸려 뺐음).
- **주인공은 셋**(Jun·Derek·Priya, DoltHub `heroes`): 에피소드와 달력은 `hero` 열로 나뉩니다. 시드를 올리기 전에 `node tools/seed-json.mjs <시드.sql> --out <db.js>` → `node tools/db-lint.mjs <db.js>`로 확인하고, 점검은 `SO_HERO=derek tools/office-check.sh …`처럼 주인공을 고릅니다.
- 저작권: Kenney·Quaternius 에셋은 CC0(표기 권장), three.js·Yuka는 MIT. 대사·표현은 자체 저작이고 실존 회사·인물 이름을 쓰지 않습니다(Seaside Labs, Summit Retail, Fairview는 가상). 예외: 집 TV(`tv` 표)는 사용자 요청으로 실제 미국 뉴스·IT 뉴스 YouTube 채널을 공식 임베드 플레이어로 보여 줍니다(인터넷 필요, `file://`에서는 YouTube 링크만). 영어 기본, 한국어는 `_ko`(화면에 보이는 글은 모두 `_ko` 짝이 있어야 함: 엔진은 `tr(en, ko)`·`loc(row, field)`).
- 2026-09-26 이전에 있던 어린 왕자 3D 게임은 이 저장소에서 지웠습니다(git 이력의 커밋 609621f에 남아 있음).

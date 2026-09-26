# CLAUDE.md

Sim Office — 미국 IT 회사의 개발자로 출퇴근하며 미국 일상·직장 영어를 배우는 오픈 월드 3D 게임. 정적 웹, 빌드 없음, `file://`에서 동작. 게임은 `office/`에 있고 설계서는 `office/PLAN.md`입니다.

- **데이터**(대화·인물·물품·달력)의 원본은 DoltHub `benelog/sim-office`(토큰은 `.envrc`). SQL은 `db/schema.sql`, `db/seed/*.sql`에 두고 `source .envrc && node tools/dolt.mjs push db/seed/<파일>.sql`로 올린 뒤 `node tools/dolt.mjs pull`로 `office/data/db.js`를 다시 만듭니다. `db.js`는 생성물이라 직접 고치지 않습니다. 쓰기 API는 문장 하나당 커밋 하나이므로 여러 행을 한 `REPLACE INTO`에 넣습니다.
- **모델**: 소품·건물·차·음식은 Kenney CC0 팩(원본 `kenney/<kit>/`)을 `blender -b --python tools/office-models.py -- <pack>`으로, 인물은 Quaternius CC0(원본 `quaternius/`, 남성 Ultimate Modular Characters·여성 Animated Women)를 `blender -b --python tools/office-characters.py`로 `office/models/*.js`(base64 .glb)로 만듭니다. 인물 파일에는 애니메이션이 없고 `rig-umc.js`·`rig-women.js`의 클립을 공유합니다. 생성물이라 직접 고치지 않습니다.
- **`file://`에서 동작해야 합니다**: `fetch()` 금지, 외부 텍스처 파일 참조 금지(glb 안에 포함).
- 점검: `TMPDIR=/tmp/claude-1000 tools/office-check.sh <출력폴더>`. `TMPDIR`이 길면 Chrome이 바로 죽습니다. 스크린숏은 직접 열어 봅니다.
- 이 컴퓨터의 Chrome 확장 탭에서는 `requestAnimationFrame`이 돌지 않습니다. 사용자에게 보여 줄 때는 `google-chrome "file://$PWD/office/index.html"`처럼 일반 창에 엽니다.
- 원격 git 저장소는 아직 없습니다(로컬 git만).
- 저작권: Kenney 에셋은 CC0(표기 권장), three.js는 MIT. 대사·표현은 자체 저작이고 실존 회사·인물 이름을 쓰지 않습니다(Lakeside Labs, Summit Retail, Fairview는 가상). 영어 기본, 한국어는 `_ko`.
- 2026-09-26 이전에 있던 어린 왕자 3D 게임은 이 저장소에서 지웠습니다(git 이력의 커밋 609621f에 남아 있음).

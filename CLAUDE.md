# CLAUDE.md

Sim Office — 『어린 왕자』의 장마다 무대를 3D로 걸어 다니며 영어로 대화하는 게임. 정적 웹, 빌드 없음.

구조·레벨 명세·모델 빌더·점검 방법은 `README.md`, 남은 작업과 병렬 작업 규칙은 `PLAN.md`에 있습니다.

- 2026-09-26 Book Play(`~/source/benelog/book-play`, https://book-play.benelog.net/)에서 떼어 왔습니다. `data/scenes.js`, `lib/`, `reference/characters/`는 거기서 복사한 것이라, 원본이 바뀌면 다시 복사합니다.
- 원격 저장소는 아직 없습니다(로컬 git만).
- **`file://`에서 동작해야 합니다**: `fetch()` 금지, 모델은 `models/<이름>.js`(base64 .glb). 모델 js는 직접 고치지 말고 `blender -b --python tools/game-models.py -- <이름>`으로 다시 만듭니다.
- 점검: `TMPDIR=/tmp/claude-1000 tools/game-check.sh <장> <출력폴더>`. `TMPDIR`이 길면 Chrome이 바로 죽습니다. 스크린숏은 직접 열어 봅니다.
- 이 컴퓨터의 Chrome 확장 탭에서는 `requestAnimationFrame`이 돌지 않습니다. 사용자에게 보여 줄 때는 `google-chrome "file://$PWD/index.html#15"`처럼 일반 창에 엽니다.
- 저작권: 원작은 미국·프랑스에서 보호 중. 생텍쥐페리 그림·팬아트 3D 모델을 쓰지 않고, 인물은 `reference/characters/`를 따릅니다. 새 문구는 자체 저작(영어 기본, 한국어는 `ko`).

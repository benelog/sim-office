# office/models — Sim Office 모델 팩

`tools/office-models.py`(소품: Kenney와 Quaternius의 CC0 키트)와 `tools/office-characters.py`(인물: Quaternius CC0)가 만드는 **생성물**입니다. 직접 고치지 않습니다.
파일마다 .glb 하나를 base64로 담아 `(window.SO_MODELS = window.SO_MODELS || {})['<pack>'] = '<base64>';`로 둡니다(`file://`에서 fetch 없이 `<script>`로 읽음). 텍스처(`colormap.png`)는 .glb 안에 들어 있습니다(bufferView, 외부 `uri` 없음).

## 만들기·점검

```sh
blender -b --python tools/office-models.py                               # 전부 (소품 팩 11개, 1분쯤)
blender -b --python tools/office-models.py -- city food                 # 이것만
blender -b --python tools/office-models.py -- --list                     # 팩·원본 키트·노드 수
blender -b --python tools/office-models.py -- food --keep-glb /tmp/glb   # .glb도 남김(확인용)
blender -b --python tools/office-models.py -- --copy-from /tmp/claude-1000/kenney-packs   # 원본 zip(풀린 폴더)에서 kenney/<kit>/로 복사한 뒤 만듦
node tools/office-models-check.mjs            # 크기·노드 수·텍스처 포함 검사 (문제 있으면 exit 1; 인물은 아래 office-characters-check)
node tools/office-models-check.mjs --names cars       # 노드 이름(자식은 {…})
node tools/office-models-check.mjs --sizes furniture  # 조각마다 크기 [w h d]와 최소 모서리(glTF Y-up, 근사)
node tools/office-models-check.mjs --box cars homeware # office/zones/index.js에 붙여 넣을 BOX 줄
```

- Kenney 원본: `kenney/<kit>/<이름>.glb` + `kenney/<kit>/Textures/colormap.png` + `kenney/<kit>/License.txt`. 쓰는 파일만 복사해 두었습니다.
  kit 폴더: `city-kit-commercial`(2.1), `city-kit-suburban`(2.0), `city-kit-roads`, `furniture-kit`(GLTF format 폴더의 .glb), `food-kit`, `mini-market`, `mini-arcade`, `factory-kit`(3.0), `nature-kit`(GLTF format 폴더의 .glb; `park` 팩). `car-kit`은 2026-09-27에 Quaternius 자동차로 바뀌어 더 쓰지 않습니다.
  원본 zip은 `https://kenney.nl/assets/<slug>` 페이지의 `https://kenney.nl/media/pages/assets/<slug>/<hash>/kenney_<slug>.zip` 링크에서 받습니다(curl에 User-Agent 필요).
- Quaternius 원본(`quaternius/<kit>/`, 폴더마다 `License.txt`에 출처): `cars/*.fbx`(Cars Pack, itch.io zip의 FBX), `stylized-nature-megakit/*.gltf+.bin+.png`(무료 standard판 68개 중 49개; 노멀맵·정점색을 .gltf에서 빼고 텍스처는 512px로 줄임), `ultimate-furniture/*.glb`와 `buildings/*.glb`(Google Drive가 다운로드 한도로 막혀 [poly.pizza](https://poly.pizza)가 팩의 FBX를 변환한 glb를 받음: `RootNode` 아래 배율 100의 부품들), `ultimate-nature/*.fbx`(Ultimate Nature Pack 150개 중 33개). 빌드 스크립트의 `PACKS`가 게임 이름 → 원본 파일을 정합니다.
  Quaternius 팩 페이지의 Drive 링크가 막히면 itch.io(`quaternius.itch.io/<slug>`: 다운로드 페이지의 csrf 토큰으로 `POST /<slug>/file/<upload_id>` → 60초짜리 서명 URL)나 poly.pizza에서 받습니다.
- Quaternius 조각의 정규화: 부모 빈 노드를 없애고 변환을 정점에 구움, 가구·건물은 발자국 가운데·바닥 y=0으로 옮김, 자동차는 바퀴 원점을 차축에 둠, 안 쓰는 재질 슬롯 제거. 색 재질만 있는 팩(`cars`, `homeware`, `buildings`, `wild`)은 정점을 합치고 **법선 없이** 내보내 크기를 1/3로 줄입니다(three.js GLTFLoader가 법선 없는 메시에 flatShading을 켜고, 엔진의 toon 재질이 `FLAT_SHADED`로 이어받음 — 각진 저폴리 룩 그대로). 텍스처 팩(`nature`)은 줄기를 Decimate로 1/4로 줄이고 법선을 byte, UV를 16비트로 양자화합니다(`KHR_mesh_quantization`).
- 빌드 스크립트 안에서도 검사합니다: 노드 이름 중복·누락, 조각이 원점에 있는지, 이미지가 포함됐는지, 크기 한도(팩 3MB, `nature`는 4MB, base64 기준). 하나라도 어긋나면 실패합니다.
- 내보내기: glTF Y-up, 탄젠트 없음(원본에 있던 TANGENT를 빼서 작아짐).

## 공통 규칙

- 팩의 **최상위 노드 = Kenney 파일 이름**(`building-a`, `desk`, `cup-coffee`) 또는 Quaternius 조각의 게임 이름(`sedan`, `tree-pine-1`, `bed-double`; 빌드 스크립트의 표). 모두 원점, 회전·배율 없음. Kenney는 원본 파일의 원점을 그대로(발밑 y=0), Quaternius 가구·건물은 발자국 가운데, 자동차·식물은 원본 원점(줄기 밑)입니다.
  `scene.getObjectByName('<이름>')`으로 골라 `SkeletonUtils.clone`/`clone()`하면 됩니다.
- 여러 노드로 된 조각은 원본 구조를 자식으로 둡니다. 자식 이름은 `<조각>_<원본 노드 이름>`(`sedan_body`, `desk_drawer`), 같은 이름이 겹치면 `-2`, `-3`(`cheese_wedge-2`). 원본 최상위 노드에 배율·회전이 있으면(가구 `toilet`, `kitchenCoffeeMachine` 등) 빈 노드로 한 번 감쌌습니다(`toilet` > `toilet_toilet` > `toilet_cover`). 자식 하나 없이 배율만 있던 메시(음식 대부분)는 배율을 메시에 구워 넣었습니다.
- 재질: 텍스처 팩은 재질 하나 `colormap`(도시 팩은 `colormap`(상가)과 `colormap-suburban`(주택) 두 개). 가구는 텍스처 없이 색 재질 15개를 조각들이 공유: `wood woodDark metal metalLight metalMedium metalDark glass(알파 0.5, BLEND) carpet carpetDarker carpetWhite carpetBlue fur plant lamp _defaultMat(흰색: 벽·세면대 등)`.
- 텍스처 샘플러: 도시(상가)·도로·차는 LINEAR, 주택·음식은 NEAREST(원본 그대로).

## 인물 (Quaternius) — `man-*`, `woman-*`, 공유 리그 `rig-umc`, `rig-women`

`tools/office-characters.py`가 Quaternius CC0 팩으로 만듭니다(2026-09-26에 Kenney Mini Characters 12명을 대체). 엔진은 인물을 불러올 때 `userData.rig`의 리그 팩도 읽어 그 클립을 쓰고, 사람 재질은 플랫 셰이딩, 잉크 외곽선은 절반 두께로 그립니다.

```sh
blender -b --python tools/office-characters.py                       # 인물 22개 + 리그 2개 (15초)
blender -b --python tools/office-characters.py -- man-suit rig-umc   # 이것만 ('men', 'women', 'rigs'도 됨)
blender -b --python tools/office-characters.py -- --list             # id, 원본 부품, 옷 설명
node tools/office-characters-check.mjs [--anims]                     # 키·발·앞(+Z)·리그와 뼈 일치·클립·크기 (문제 있으면 exit 1)
```

- 원본: `quaternius/ultimate-modular-characters/`([Ultimate Modular Men](https://quaternius.com/packs/ultimatemodularmen.html): `Suit Casual_2 Casual_Hoodie Worker Adventurer Farmer.gltf`, Quaternius가 `Humans_Master.blend`에서 내보낸 것; 마스터 blend 12MB와 쓰지 않은 King·Spacesuit·Swat·Beach·Punk는 복사하지 않음)와 `quaternius/ultimate-modular-women/`([Ultimate Modular Women](https://quaternius.com/packs/ultimatemodularwomen.html): `Casual Formal Suit Adventurer Punk.glb`; 쓰지 않은 Worker·SciFi·Soldier·Witch·Medieval은 복사하지 않음). 둘 다 CC0, `License.txt`.
  여성 팩은 Google Drive가 다운로드 한도로 파일을 막아, 같은 팩의 FBX를 [poly.pizza](https://poly.pizza/bundle/Ultimate-Modular-Women-Pack-aCBDXDdTNN)가 glb로 변환해 주는 것을 받았습니다(FBX2glTF: 골격이 배율 100의 `RootNode` 아래, 액션 이름 `CharacterArmature|…`, 키 시간이 1.25배 느림, `Formad_Head`(오타)). 빌드 스크립트의 `normalize_fbx()`가 남성 팩과 같은 모양으로 되돌립니다.
- **인물 파일에는 애니메이션이 없습니다.** 골격(최상위 노드 = id, glTF extras `{"rig": "rig-umc"}` → three.js `userData.rig`)과 스킨 메시 하나(`<id>-mesh`)만. 애니메이션은 리그 파일 하나에 있고, 같은 리그의 인물은 뼈 이름·쉬는 자세가 같아서(검사기가 확인) 리그의 `AnimationClip`을 인물 복제본에 그대로 틀면 됩니다(`AnimationMixer(인물)`, `clipAction(rig.animations[…])`).
- 규격: 발밑 y=0, 정면 +Z, 키 남 0.96·여 0.94(배율은 메시와 뼈에 구워 넣음, 엔진 배율 1). 쉬는 자세는 T자. 텍스처·UV 없음, 재질은 색만(Skin, Hair, Shirt …). 정점을 공유하는 부드러운 법선이라 파일이 작습니다(플랫 셰이딩은 엔진에서). 스킨 가중치는 정규화된 unsigned byte.
- 두 팩 모두 뼈 62개(손가락 포함)의 같은 골격 `CharacterArmature`이고 옷마다 머리·몸·다리·발 네 부품이라, 남녀 모두 여러 옷의 부품을 조립해 만듭니다(정장 몸에 다른 머리). 쉬는 자세는 팩마다 조금 달라 리그를 둘로 나눕니다. 손가락은 idle 첫 프레임의 편하게 굽힌 모양을 쉬는 자세로 구워 넣고 클립에서 손가락 채널을 뺐습니다.
- 리그 클립(엔진 이름): `idle walk sprint sit emote-yes emote-no interact-right`

| 클립 | rig-umc (남) | rig-women (여) |
|---|---|---|
| idle | Idle_Neutral (1.67초) | 같음 |
| walk | Walk (1.33초) | 같음 |
| sprint | Run (0.8초) | 같음 |
| sit | 만듦: 정지 자세, 엉덩이 관절 0.29(의자 좌판 0.24 위), 허벅지 수평, 정강이 수직, 손은 허벅지 위 | 같게 만듦 |
| emote-yes | Wave | 같음 |
| emote-no | 만듦: 고개 젓기 (1.67초) | 만듦: 고개 젓기 |
| interact-right | Interact (오른손을 앞으로, 1.27초) | 같음 |

- 리그 extras: `walk_speed` 0.67 / 0.68, `run_speed` 1.56 / 1.58(원본 걸음 주기에서 발이 땅에 붙어 뒤로 가는 속도, 단위/초: 엔진 이동 속도에 맞춰 `timeScale = 속도 / walk_speed`로 틀면 발이 미끄러지지 않음), `seat` 0.24.
- 빠진 것: `interact-left`, `pick-up`, `holding-*`, `crouch`, `jump`, `drive`, `static`(엔진은 없는 클립을 비슷한 것으로 대신 틀어야 함).

| id | KB | 원본 부품(머리/몸/다리/발) | 모습 | 쓰는 곳 |
|---|---|---|---|---|
| rig-umc | 133 | Suit.gltf의 애니메이션 | | |
| rig-women | 130 | Casual.glb의 애니메이션 | | |
| man-suit | 236 | Suit/Suit/Suit/Suit | 남색 정장, 빨간 넥타이, 회색 머리 | greg |
| man-suit-2 | 215 | Casual_2/Suit/Suit/Suit | 회색 정장, 파란 넥타이 | 플레이어 |
| man-casual | 228 | Suit/Casual_2/Casual_2/Suit | 파란 폴로, 카키 바지 | tom |
| man-casual-2 | 215 | Casual_Hoodie/Casual_2/Casual_2/Casual_2 | 짙은 회색 티, 청바지 | sam |
| man-casual-3 | 220 | Casual_Hoodie/Suit/Casual_2/Suit | 갈색 재킷, 하늘색 셔츠, 청바지 | 플레이어 |
| man-hoodie | 275 | Adventurer/Casual_Hoodie/Casual_2/Casual_2 | 초록 후디, 청바지, 수염 | derek |
| man-hoodie-2 | 219 | Casual_Hoodie/Casual_Hoodie/Casual_2/Casual_Hoodie | 남색 후디, 청바지 | 플레이어 |
| man-worker | 228 | Casual_Hoodie/Worker/Casual_2/Worker | 초록 매장 조끼, 흰 셔츠 | mike |
| man-worker-2 | 244 | Suit/Worker/Suit/Suit | 남색 제복 조끼, 청회색 셔츠 | lee |
| man-farmer | 290 | Adventurer/Farmer/Farmer/Farmer | 멜빵바지, 빨간 셔츠, 회색 머리·수염 | carl |
| man-adventurer | 299 | Adventurer 전부(배낭 뺌) | 야전 재킷, 카고 바지, 수염 | 플레이어 |
| woman-suit | 229 | Casual/Suit/Suit/Suit | 남색 바지 정장, 흰 블라우스, 검은 머리 | maya |
| woman-suit-2 | 229 | Formal/Suit/Suit/Suit | 버건디 정장(호텔 유니폼), 갈색 머리 | kelly |
| woman-casual | 227 | Casual/Casual/Casual/Casual | 세이지색 티, 짙은 바지, 긴 검은 머리 | 플레이어 |
| woman-casual-2 | 227 | Casual/Casual/Casual/Casual | 청록 상의, 짙은 회색 바지 | priya |
| woman-casual-3 | 227 | Casual/Casual/Casual/Casual | 분홍 다이너 티, 검은 바지 | rosa |
| woman-formal | 221 | Formal/Formal/Formal/Formal | 빨간 원피스, 금발 | 플레이어 |
| woman-formal-2 | 221 | Formal/Formal/Formal/Formal | 짙은 청록 원피스, 검은 머리 | linda |
| woman-formal-3 | 221 | Formal/Formal/Formal/Formal | 남색 유니폼 원피스, 적갈색 머리 | amy |
| woman-adventurer | 253 | Adventurer/Adventurer/Adventurer/Adventurer | 야상 재킷, 반바지, 부츠, 짧은 갈색 머리 | 플레이어 |
| woman-adventurer-2 | 253 | Adventurer/Adventurer/Adventurer/Adventurer | 겨자색 셔츠, 반바지, 적갈색 머리 | nina |
| woman-punk | 255 | Casual/Punk/Punk/Punk | 파란 크롭 톱, 검은 바지 | 플레이어 |

## city — 48개, 2393 KB (city-kit-commercial 2.1 + city-kit-suburban 2.0)

| 노드 | 크기 w×h×d |
|---|---|
| building-a, -b, -d, -h | 0.9×1.29×0.9~1.0 |
| building-c | 0.88×0.89×1.09 |
| building-e | 1.64×0.89×1.01 |
| building-f, -g | 0.84~0.97×1.69×1.0 |
| building-skyscraper-a / -b / -c | 1.36×2.88 / 1.36×4.48 / 1.28×4.08 (깊이 1.36~1.39) |
| building-type-a … -h (주택) | 1.3~1.83 × 0.74~1.24 × 0.92~1.41 |
| detail-awning, detail-awning-wide | 0.4 / 0.8 × 0.4 × 0.15 (z 0.1~0.25, 건물 앞면에 붙이는 차양) |
| detail-parasol-a, -b | 0.35×0.45×0.4 |
| tree-large, tree-small | 0.21×0.77 / 0.57 |
| fence, fence-1x3 | 0.48×0.27×0.08, 1.28×0.27×0.44 |
| planter | 0.4×0.18×0.3 |
| driveway-short, path-short | 0.36×0.2, 0.2×0.2 (두께 0.01) |
| detail-overhang, detail-overhang-wide | 0.5 / 1 × 0.4 × 0.2 (z 0.05~0.25, 기둥 둘 달린 차양. 배율 3이면 버스 정류장 지붕) |
| low-detail-building-a … -n | 0.5×0.5, 높이 0.7~2.25 (먼 풍경용 단순 건물: 실내 존의 창밖) |
| low-detail-building-wide-a, -b | 1×0.5, 높이 1.1 / 1.15 |

PLAN 목록 전부에 차양(detail-overhang 둘)과 먼 풍경용 low-detail 건물 16개를 더했습니다.

## roads — 25개, 279 KB (city-kit-roads)

road-straight road-straight-half road-crossroad road-crossroad-line road-intersection road-intersection-line road-bend road-bend-sidewalk road-curve road-crossing road-end road-side road-square tile-low light-square light-square-double light-curved traffic-light road-sign-stop road-sign-street construction-cone construction-barrier dumpster(자식 `dumpster_lid-left`, `dumpster_lid-right`) electricity-pole sign-highway

- 도로 타일은 1×1(두께 0.02, 원점이 가운데). 예외: `road-curve` 2×2, `road-side` 1×1.31, `road-straight-half` 0.5×1.
- 소품 높이: 가로등 0.6~0.67, 신호등 0.51, 표지판 0.48~0.49, 고속도로 표지 0.71, 전봇대 0.52.

## cars — 7개, 371 KB (Quaternius Cars Pack; 색 재질, 법선 없음)

sedan(NormalCar1, 파랑) hatchback(NormalCar2, 하늘색) sports-car(SportsCar, 주황) sports-car-2(SportsCar2, 흰색) suv(SUV, 흰색) taxi(Taxi, 노랑) police(Cop, 흑백)

- 차 노드 = 빈 노드, 자식 `<차>_body`, `<차>_wheel-back`(뒷바퀴 둘이 한 메시), `_wheel-front-left`, `_wheel-front-right`. 바퀴 노드의 원점이 차축(바퀴 가운데)이라 x축으로 돌리면 굴러가고 y축으로 돌리면 조향합니다(원본 NormalCar2의 오른쪽 앞바퀴 원점이 어긋나 있어 빌드 때 모든 바퀴의 원점을 경계 상자 가운데로 다시 잡음).
- 정면 +Z, 원점은 원본 그대로(가운데, 바닥 y≈0). 배율 1에서 폭 1.6~2.1, 길이 3.3~4.2, 높이 1.1~1.5 → 게임 배율 0.5.
- 재질: 차마다 도장 재질을 `paint`(`paint.001`…, 색마다 하나)로 이름 붙여 두어 life.js가 `/^paint/`에 색을 곱합니다. `Headlights`·`TailLights`는 밤에 emissive를 켭니다. 그 밖에 `Windows`, `Black`, `Grey`, 경찰차 `WhiteLights`·`BlueLights`.

## furniture — 140개, 2283 KB (furniture-kit, GLTF format 폴더의 .glb 전부)

- 원점이 가운데가 아니라 **모서리**입니다(대부분 x 0~w, z −d~0). 크기·최소 모서리는 `node tools/office-models-check.mjs --sizes furniture`. 벽(`wall` 등) 높이 1.29, 폭 1, 두께 0.05. 책상 `desk` 0.73×0.38×0.39, 의자 `chairDesk` 0.33×0.61×0.31.
- 문·서랍 등이 자식 노드: `desk_drawer`, `doorway_door`, `kitchenFridge_doorFridge`, `bedDouble_cover`, `chairDesk_chair` 등(`--names furniture`).
- 노드: bathroomCabinet bathroomCabinetDrawer bathroomMirror bathroomSink bathroomSinkSquare bathtub bear bedBunk bedDouble bedSingle bench benchCushion benchCushionLow bookcaseClosed bookcaseClosedDoors bookcaseClosedWide bookcaseOpen bookcaseOpenLow books cabinetBed cabinetBedDrawer cabinetBedDrawerTable cabinetTelevision cabinetTelevisionDoors cardboardBoxClosed cardboardBoxOpen ceilingFan chair chairCushion chairDesk chairModernCushion chairModernFrameCushion chairRounded coatRack coatRackStanding computerKeyboard computerMouse computerScreen desk deskCorner doorway doorwayFront doorwayOpen dryer floorCorner floorCornerRound floorFull floorHalf hoodLarge hoodModern kitchenBar kitchenBarEnd kitchenBlender kitchenCabinet kitchenCabinetCornerInner kitchenCabinetCornerRound kitchenCabinetDrawer kitchenCabinetUpper kitchenCabinetUpperCorner kitchenCabinetUpperDouble kitchenCabinetUpperLow kitchenCoffeeMachine kitchenFridge kitchenFridgeBuiltIn kitchenFridgeLarge kitchenFridgeSmall kitchenMicrowave kitchenSink kitchenStove kitchenStoveElectric lampRoundFloor lampRoundTable lampSquareCeiling lampSquareFloor lampSquareTable lampWall laptop loungeChair loungeChairRelax loungeDesignChair loungeDesignSofa loungeDesignSofaCorner loungeSofa loungeSofaCorner loungeSofaLong loungeSofaOttoman paneling pillow pillowBlue pillowBlueLong pillowLong plantSmall1 plantSmall2 plantSmall3 pottedPlant radio rugDoormat rugRectangle rugRound rugRounded rugSquare shower showerRound sideTable sideTableDrawers speaker speakerSmall stairs stairsCorner stairsOpen stairsOpenSingle stoolBar stoolBarSquare table tableCloth tableCoffee tableCoffeeGlass tableCoffeeGlassSquare tableCoffeeSquare tableCross tableCrossCloth tableGlass tableRound televisionAntenna televisionModern televisionVintage toaster toilet toiletSquare trashcan wall wallCorner wallCornerRond wallDoorway wallDoorwayWide wallHalf wallWindow wallWindowSlide washer washerDryerStacked

## food — 78개, 1351 KB (food-kit)

apple banana orange lemon grapes strawberry watermelon pear cherries avocado tomato onion carrot broccoli cabbage corn pepper paprika mushroom pumpkin egg bread loaf loaf-baguette croissant muffin donut donut-sprinkles cookie cupcake cake-slicer pancakes waffle burger burger-cheese fries hot-dog pizza pizza-box sandwich sub salad taco sushi-salmon maki-salmon rice-ball chinese bowl-soup bowl-cereal plate plate-dinner glass mug cup-coffee cup-tea frappe soda soda-can soda-bottle bottle-ketchup peanut-butter honey cheese bacon meat-patty sausage turkey fish can carton carton-small bag styrofoam ice-cream popsicle candy-bar chocolate barrel

- 원점이 바닥 가운데. 원본 배율이 제각각이라 크기가 들쭉날쭉합니다(원본 그대로): 대략 0.1~0.3(과일·컵·캔), 0.4~0.6(버거·샐러드·빵), 0.84~0.95(pizza, pizza-box, plate, turkey), 1.28(styrofoam). `node tools/office-models-check.mjs --sizes food`.
- `bread`는 식빵 한 조각(두께 0.04), 통식빵은 `loaf`. 여러 조각으로 된 것: burger, burger-cheese, cheese(wedge×12), pizza(slice1~8), watermelon(slice×8), sandwich, sub, pancakes, turkey, cupcake, hot-dog, chinese, pizza-box(`pizza-box_lid`), styrofoam(`styrofoam_lid`).

## extras — 13개, 427 KB (Mini Market, Mini Arcade, Factory Kit 3.0)

다른 키트에서 몇 개씩 가져온 것. 모두 원점이 바닥 가운데(`freezers-standing`만 z −0.5~0, 뒷면이 원점). 게임 기본 배율 1.

| 노드 | 원본 | 크기 w×h×d | 쓰는 곳 |
|---|---|---|---|
| cash-register | mini-market | 0.85×0.59×0.85 (L자 계산대+단말기) | 마트 계산대 위(배율 0.42) |
| shopping-cart, shopping-basket | mini-market | 0.3×0.39×0.48, 0.35×0.25×0.35 | 마트 입구(카트 배율 1.3) |
| display-fruit, display-bread | mini-market | 0.6×0.52×0.6, 0.7×0.5×0.6 | 마트 과일·빵 진열 |
| freezer, freezers-standing | mini-market | 0.8×0.35×0.6, 1×0.9×0.5 | 마트 냉동고(서 있는 것 배율 1.15) |
| shelf-boxes, shelf-bags | mini-market | 0.8×0.85~0.89×0.7 (양면 진열대, 상품 포함) | 마트 통로(한 줄에 5개) |
| vending-machine | mini-arcade | 0.5×0.75×0.47 | 사무실 탕비실, 공항 게이트(배율 1.25) |
| ticket-machine | mini-arcade | 0.4×0.92×0.4 | 공항 셀프 체크인 |
| scanner-high | factory-kit | 0.48×1.27×1.77 (z로 걸친 아치) | 공항 보안 검색대(배율 0.88, 걸어서 통과) |
| machine-window | factory-kit | 1.2×1.29×1.5 | 공항 X선 터널(배율 0.46) |

- 재질: `colormap`(Mini Market·Mini Arcade는 같은 그림이라 이미지 하나), `colormap-factory-kit`, `material-glass`.

## nature — 49개, 3665 KB (Quaternius Stylized Nature MegaKit, 무료 standard판; 텍스처 12장)

공원·정원·마을 가장자리·강변의 식물과 바위. 원점은 줄기 밑(x·z는 원본 그대로, 뿌리가 바닥 아래 0.2~0.3까지 내려가 있어 BOX의 y0은 0으로 잘라 둠 — 엔진이 띄우지 않음). 게임 기본 배율 0.4.

- 나무(10): tree-common-1/2/3/5(배율 1에서 키 6.8~9.2 → 게임 2.7~3.7), tree-pine-1…4(7.1~10), tree-twisted-1(붉은 잎의 거목 16.5 × 13.5, 공원 중앙에 배율 0.6으로), tree-dead-1(고사목 9.2). `/^tree/`라 life.js가 흔들고 지도에도 나무로 그립니다. 줄기(`Bark…` 재질)는 빌드 때 Decimate로 1/4(잎 카드는 그대로).
- 덤불·풀·꽃(15): bush(붉은 잎), bush-flowers, clover, fern(9 × 2.4의 넓은 고사리 무리), flower-3, flower-3-group, flower-4, flower-4-group(꽃대 키 2~2.4라 city.js는 0.55배로), grass-short, grass-tall, grass-wispy-short, grass-wispy-tall, plant-1, plant-1-big, plant-7, petal-1…3(바닥의 꽃잎).
- 바위·자갈(9): rock-1…3(3 × 2), pebble-round-1…3, pebble-square-1…3(0.3~0.5).
- 길(10): path-round-small-1…3, path-round-thin, path-round-wide, path-square-small-1…3, path-square-thin, path-square-wide — 돌길 판(두께 0.1~0.17), 엔진은 `path`로 시작하는 노드를 바닥판처럼(그림자 안 드리움) 둡니다.
- 버섯(2): mushroom, mushroom-laetiporus.
- 재질(텍스처마다 하나): bark bark-twisted bark-dead(불투명 → JPEG) leaves leaves-twisted leaves-pine leaves-plant flowers(알파 컷아웃 MASK → PNG) grass mushrooms path-rocks rocks. 노멀맵·정점색은 원본에서 뺐고 텍스처는 512px.

## park — 16개, 198 KB (Kenney Nature Kit; 텍스처 없이 색 재질)

2026-09-27까지 `nature` 팩이던 Kenney Nature Kit에서 Quaternius로 대신할 수 없는 것만 남긴 팩: sign lily_large lily_small log log_large stump_round stump_old pot_large pot_small canoe statue_column statue_obelisk statue_block bridge_wood fence_simple fence_gate. 원점 바닥 가운데, 바닥 아래 0.05 받침(`prop()`이 띄움), 게임 기본 배율 2, 팔레트는 전처럼 `RECOLOR`로 초록·갈색. city.js의 `n()`은 이름으로 `park`/`nature`를 고릅니다.

## homeware — 19개, 972 KB (Quaternius Ultimate Furniture Pack; 색 재질, 법선 없음)

집(home)의 가구. 발자국 가운데가 원점, 바닥 y=0, 정면 +Z. 게임 기본 배율 0.4(원본이 큼: 문 3.1, 침대 2.1 × 4.3).

| 노드 | 원본 | 크기 w×h×d (배율 1) |
|---|---|---|
| bed-double, bed-twin | BedDouble, BedTwin | 2.83 / 2.06 × 1.56 × 4.26 (머리판이 -Z) |
| bookcase | Bookcase_Books (책 포함) | 1.85×3.37×0.66 |
| armchair, chair, office-chair, stool | Sofa_individual, Chair, OfficeChair, Stool | 1.64×1.36×1.43, 0.5×1.07×0.64, 0.72×1.13×0.8, 0.5×0.57×0.54 |
| closet, closet-short | Closet, ShortCloset | 1.56×2.98×0.88, 1.56×2.27×0.9 |
| desk, night-stand | Desk, NightStand | 1.82×0.92×0.84, 0.58×0.51×0.5 |
| door-1, door-2, door-3 | Door1(나무), Door2·Door3(유리창) | 1.6~1.74×3.1×0.32 |
| sofa-1, sofa-2, sofa-corner | Sofa, Sofa2, Sofa3(ㄱ자) | 4.24×1.51×1.78, 4×1.45×1.54, 4×1.43×2.8 |
| table-1, table-2 | Table, Table2 | 1.42×0.83×2.78 |

## buildings — 9개, 2541 KB (Quaternius Buildings Pack; 색 재질, 법선 없음)

유럽풍 시내 건물. 발자국 가운데가 원점, 바닥 y=0, 정면(현관) +Z. 게임 기본 배율 1 (Kenney 상가 배율 3과 키가 비슷함: 4.7~5.9, 집 2.9~3.2).

| 노드 | 원본 | 크기 w×h×d | 쓰는 곳 |
|---|---|---|---|
| building-1-large, building-1-small | Building1_Large, Building1_Small | 8×4.67×2.74, 3.74×4.66×2.74 (붉은 지붕, 도머창) | 시내 남동 블록(small) |
| building-2-large, building-2-small | Building2_Large, Building2_Small | 5.72×5.92×2.22, 3.58×4.97×2.48 (갈색 지붕, 하늘색 벽) | Jun의 아파트(large) |
| building-3-big, building-3-small | Building3_Big, Building3_Small | 4.7×5.68×4.4, 3.06×5.68×4.4 (벽돌빛) | 북동 블록(big) |
| building-4 | Building4 | 4.64×5.49×3.86 (흰 건물, 지붕 장식) | 북동 블록 |
| house-1, house-2 | House1, House2 | 2.56×3.18×3.87 (현관 지붕), 3.64×2.93×3.09 | 북서 블록의 집 둘 |

## wild — 33개, 609 KB (Quaternius Ultimate Nature Pack; 색 재질, 법선 없음)

마을 밖 평원(주인공이 못 가는 곳)의 숲. `SO_ZONE_KIT.dress(api, { wild: { seed, rects, avoid, density } })`가 조각마다 InstancedMesh 하나로 뿌립니다(city.js: 서·동·북 평원과 강 건너편, 수백 그루에 드로우 콜 수십 개). 원점 줄기 밑, 배율 1에서 나무 키 2.4~3.6(Kenney 나무와 같은 급), 게임 기본 배율 1. 존 데이터(props)에는 쓰지 않으니 지도에도 안 나옵니다.

tree-common-1…5 tree-autumn-1/2 tree-pine-1…5 tree-birch-1…3 tree-willow-1/2 bush-1 bush-2 bush-berries rock-1…4 rock-moss-1/2 stump log grass grass-short flowers plant-1 plant-2

## 출처·라이선스

[Quaternius](https://quaternius.com) — 인물: [Ultimate Modular Men](https://quaternius.com/packs/ultimatemodularmen.html), [Ultimate Modular Women](https://quaternius.com/packs/ultimatemodularwomen.html)([poly.pizza 묶음](https://poly.pizza/bundle/Ultimate-Modular-Women-Pack-aCBDXDdTNN)); 소품: [Cars Pack](https://quaternius.com/packs/cars.html), [Stylized Nature MegaKit](https://quaternius.com/packs/stylizednaturemegakit.html)(무료 standard판), [Ultimate Furniture Pack](https://quaternius.com/packs/ultimatefurniture.html)([poly.pizza 묶음](https://poly.pizza/bundle/Furniture-Pack-pgvx8Zkq8v)), [Buildings Pack](https://quaternius.com/packs/buildings.html)(poly.pizza), [Ultimate Nature Pack](https://quaternius.com/packs/ultimatenature.html). 모두 CC0 1.0. 라이선스 원문과 출처는 `quaternius/<pack>/License.txt`.

[Kenney](https://www.kenney.nl) — [City Kit (Commercial)](https://kenney.nl/assets/city-kit-commercial) 2.1, [City Kit (Suburban)](https://kenney.nl/assets/city-kit-suburban) 2.0, [City Kit (Roads)](https://kenney.nl/assets/city-kit-roads), [Furniture Kit](https://kenney.nl/assets/furniture-kit), [Food Kit](https://kenney.nl/assets/food-kit), [Mini Market](https://kenney.nl/assets/mini-market), [Mini Arcade](https://kenney.nl/assets/mini-arcade), [Factory Kit](https://kenney.nl/assets/factory-kit) 3.0, [Nature Kit](https://kenney.nl/assets/nature-kit). 모두 CC0 1.0(표기 의무 없음, "Kenney (www.kenney.nl)" 표기 권장). 라이선스 원문은 `kenney/<kit>/License.txt`.

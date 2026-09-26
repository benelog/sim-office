# office/models — Sim Office 모델 팩

`tools/office-models.py`(소품: Kenney CC0 키트)와 `tools/office-characters.py`(인물: Quaternius CC0)가 만드는 **생성물**입니다. 직접 고치지 않습니다.
파일마다 .glb 하나를 base64로 담아 `(window.SO_MODELS = window.SO_MODELS || {})['<pack>'] = '<base64>';`로 둡니다(`file://`에서 fetch 없이 `<script>`로 읽음). 텍스처(`colormap.png`)는 .glb 안에 들어 있습니다(bufferView, 외부 `uri` 없음).

## 만들기·점검

```sh
blender -b --python tools/office-models.py                               # 전부 (소품 팩 7개, 몇 초)
blender -b --python tools/office-models.py -- city food                 # 이것만
blender -b --python tools/office-models.py -- --list                     # 팩·원본 키트·노드 수
blender -b --python tools/office-models.py -- food --keep-glb /tmp/glb   # .glb도 남김(확인용)
blender -b --python tools/office-models.py -- --copy-from /tmp/claude-1000/kenney-packs   # 원본 zip(풀린 폴더)에서 kenney/<kit>/로 복사한 뒤 만듦
node tools/office-models-check.mjs            # 크기·노드 수·텍스처 포함 검사 (문제 있으면 exit 1; 인물은 아래 office-characters-check)
node tools/office-models-check.mjs --names cars       # 노드 이름(자식은 {…})
node tools/office-models-check.mjs --sizes furniture  # 조각마다 크기 [w h d]와 최소 모서리(glTF Y-up, 근사)
```

- 원본: `kenney/<kit>/<이름>.glb` + `kenney/<kit>/Textures/colormap.png` + `kenney/<kit>/License.txt`. 쓰는 파일만 복사해 두었습니다.
  kit 폴더: `city-kit-commercial`(2.1), `city-kit-suburban`(2.0), `city-kit-roads`, `car-kit`, `furniture-kit`(GLTF format 폴더의 .glb), `food-kit`, `mini-market`, `mini-arcade`, `factory-kit`(3.0), `nature-kit`(GLTF format 폴더의 .glb).
  원본 zip은 `https://kenney.nl/assets/<slug>` 페이지의 `https://kenney.nl/media/pages/assets/<slug>/<hash>/kenney_<slug>.zip` 링크에서 받습니다(curl에 User-Agent 필요).
- 빌드 스크립트 안에서도 검사합니다: 노드 이름 중복·누락, 조각이 원점에 있는지, 이미지가 포함됐는지, 크기 한도(팩 3MB, base64 기준). 하나라도 어긋나면 실패합니다.
- 내보내기: glTF Y-up, 탄젠트 없음(원본에 있던 TANGENT를 빼서 작아짐).

## 공통 규칙

- 팩의 **최상위 노드 = Kenney 파일 이름**(`building-a`, `desk`, `cup-coffee`). 모두 원점, 회전·배율 없음. 원본 파일의 원점을 그대로 둡니다(발밑 y=0).
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

- 원본: `quaternius/ultimate-modular-characters/`(Ultimate Modular Men: `Suit Casual_2 Casual_Hoodie Worker Adventurer Farmer.gltf`, Quaternius가 `Humans_Master.blend`에서 내보낸 것; 마스터 blend 12MB와 쓰지 않은 King·Spacesuit·Swat·Beach·Punk는 복사하지 않음)와 `quaternius/animated-women/`(Animated Women: `Female_Casual Female_Dress Female_TankTop Female_Alternative.blend`). 둘 다 CC0, `License.txt`.
- **인물 파일에는 애니메이션이 없습니다.** 골격(최상위 노드 = id, glTF extras `{"rig": "rig-umc"}` → three.js `userData.rig`)과 스킨 메시 하나(`<id>-mesh`)만. 애니메이션은 리그 파일 하나에 있고, 같은 리그의 인물은 뼈 이름·쉬는 자세가 같아서(검사기가 확인) 리그의 `AnimationClip`을 인물 복제본에 그대로 틀면 됩니다(`AnimationMixer(인물)`, `clipAction(rig.animations[…])`).
- 규격: 발밑 y=0, 정면 +Z, 키 남 0.96·여 0.94(배율은 메시와 뼈에 구워 넣음, 엔진 배율 1). 쉬는 자세는 T자. 텍스처·UV 없음, 재질은 색만(Skin, Hair, Shirt …). 정점을 공유하는 부드러운 법선이라 파일이 작습니다(플랫 셰이딩은 엔진에서). 스킨 가중치는 정규화된 unsigned byte.
- 남자(UMC)는 뼈 62개(손가락 포함). 손가락은 idle 첫 프레임의 편하게 굽힌 모양을 쉬는 자세로 구워 넣고 클립에서 손가락 채널을 뺐습니다. 여자는 뼈 31개(원본의 다리 IK는 프레임마다 구워서 평범한 키로).
- 리그 클립(엔진 이름): `idle walk sprint sit emote-yes emote-no interact-right`

| 클립 | rig-umc (남) | rig-women (여) |
|---|---|---|
| idle | Idle_Neutral (1.67초) | Female_Idle (4.17초, 3프레임마다) |
| walk | Walk (1.33초) | Female_Walk (1.04초) |
| sprint | Run (0.8초) | Female_Run (0.88초) |
| sit | 만듦: 정지 자세, 엉덩이 관절 0.29(의자 좌판 0.24 위), 허벅지 수평, 정강이 수직, 손은 허벅지 위 | 같게 만듦 |
| emote-yes | Wave | Female_Clapping |
| emote-no | 만듦: 고개 젓기 (1.67초) | 만듦: 고개 젓기 |
| interact-right | Interact (오른손을 앞으로) | 만듦: 오른쪽 아래팔을 앞으로 드는 손짓 (1.42초) |

- 리그 extras: `walk_speed` 0.67 / 0.93, `run_speed` 1.56 / 2.53(원본 걸음 주기에서 발이 땅에 붙어 뒤로 가는 속도, 단위/초: 엔진 이동 속도에 맞춰 `timeScale = 속도 / walk_speed`로 틀면 발이 미끄러지지 않음), `seat` 0.24.
- 빠진 것: `interact-left`, `pick-up`, `holding-*`, `crouch`, `jump`, `drive`, `static`(엔진은 없는 클립을 비슷한 것으로 대신 틀어야 함).

| id | KB | 원본 부품(머리/몸/다리/발) 또는 blend | 모습 | 쓰는 곳 |
|---|---|---|---|---|
| rig-umc | 133 | Suit.gltf의 애니메이션 | | |
| rig-women | 119 | Female_Casual.blend의 애니메이션 | | |
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
| woman-casual | 110 | Female_Casual | 세이지색 티, 짙은 바지 | 플레이어 |
| woman-casual-2 | 110 | Female_Casual | 청록 상의, 짙은 회색 바지 | priya |
| woman-casual-3 | 110 | Female_Casual | 분홍 다이너 유니폼, 검은 바지 | rosa |
| woman-dress | 75 | Female_Dress | 빨간 원피스, 금발 포니테일 | 플레이어 |
| woman-dress-2 | 75 | Female_Dress | 짙은 청록 원피스, 검은 머리 | linda |
| woman-dress-3 | 75 | Female_Dress | 남색 유니폼 원피스, 적갈색 머리 | amy |
| woman-tanktop | 84 | Female_TankTop | 하늘색 민소매, 반바지 | 플레이어 |
| woman-tanktop-2 | 84 | Female_TankTop | 겨자색 민소매, 데님 반바지 | nina |
| woman-alt | 90 | Female_Alternative | 장밋빛 재킷, 청바지, 투톤 짧은 머리 | 플레이어 |
| woman-alt-2 | 90 | Female_Alternative | 짙은 회색 블레이저, 흰 셔츠, 검은 머리 | maya |
| woman-alt-3 | 90 | Female_Alternative | 버건디 블레이저(호텔 유니폼), 갈색 머리 | kelly |

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

## cars — 11개, 1647 KB (car-kit)

sedan sedan-sports suv hatchback-sports taxi van delivery police truck ambulance wheel-default

- 차 노드 = 바퀴 달린 완성체. 자식: `<차>_body`, `<차>_wheel-front-left`, `_wheel-front-right`, `_wheel-back-left`, `_wheel-back-right`(바퀴 노드의 원점이 바퀴 중심이라 x축으로 돌리면 굴러감), 문이 있는 차는 `ambulance_door-left/right`, `delivery_door`.
- 정면 +Z, 폭 1.3~1.5, 길이 2.55(sedan)~3.25(ambulance, delivery), 높이 1.1~1.8, 바닥 y=0.
- `wheel-default`만은 원점이 바퀴 중심(y −0.3~0.3)입니다.

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

## nature — 71개, 838 KB (Nature Kit; 텍스처 없이 색 재질)

공원·정원·마을 가장자리·강변에 쓰는 자연물. 모두 원점이 바닥 가운데이고, 키트 특성상 바닥 아래 0.05만큼 받침이 있어(`miny -0.05`) `SO_ZONE_KIT.prop()`이 그만큼 띄웁니다(길 조각은 얇은 판처럼 보이도록 city.js가 `lift`를 0.02로 덮어씀). 게임 기본 배율 2.

- 나무(20): tree_oak tree_oak_fall tree_default tree_default_fall tree_detailed tree_detailed_dark tree_fat tree_fat_fall tree_small tree_small_fall tree_tall tree_thin tree_thin_fall tree_pineDefaultA tree_pineRoundA tree_pineTallA tree_pineSmallA tree_simple tree_plateau tree_cone — 배율 1에서 키 0.97~1.71(게임에서 2~3.4).
- 덤불·풀·꽃(17): plant_bush plant_bushDetailed plant_bushLarge plant_bushSmall plant_flatShort plant_flatTall grass grass_large grass_leafs flower_purpleA/B flower_redA/B flower_yellowA/B lily_large lily_small — 꽃은 0.16~0.29 높이라 게임에서는 배율 0.55로 씀.
- 바위(8): rock_smallA/B/C rock_largeA/B rock_tallA stone_smallA stone_largeA (rock은 흙빛, stone은 회색).
- 길·구조물(16): path_stone path_stoneCircle path_stoneCorner path_stoneEnd path_wood path_woodCorner path_woodEnd bridge_wood bridge_stoneRound fence_simple fence_simpleLow fence_gate fence_planks sign statue_column statue_obelisk statue_block.
- 그 밖(10): stump_round stump_old log log_large pot_large pot_small mushroom_red mushroom_tanGroup canoe.
- 재질 19개(색만): leafsGreen leafsDark leafsFall grass woodBark woodBarkDark wood woodDark woodInner woodBirch stone stoneDark dirt dirtDark colorRed colorYellow colorPurple colorTan _defaultMat. 키트 원래 팔레트는 민트(#28e0c0)·주황(#f08858)인데, 옆에 서는 Kenney 도시 키트의 초록·갈색에 맞춰 `tools/office-models.py`의 `RECOLOR`로 다시 칠했습니다(sRGB hex → 선형).
- 원본 파일에는 `tmpParent`라는 빈 노드가 있어 Blender가 'Orphan Nodes' 컬렉션(뷰 레이어 밖)에 넣습니다. 빌드 스크립트가 씬 컬렉션에 다시 링크합니다.

## 출처·라이선스

인물: Quaternius (quaternius.com) — Ultimate Modular Men, Animated Women. CC0 1.0. 라이선스 원문은 `quaternius/<pack>/License.txt`.

Kenney (www.kenney.nl) — City Kit (Commercial) 2.1, City Kit (Suburban) 2.0, City Kit (Roads), Car Kit, Furniture Kit, Food Kit, Mini Market, Mini Arcade, Factory Kit 3.0, Nature Kit. 모두 CC0 1.0(표기 의무 없음, "Kenney (www.kenney.nl)" 표기 권장). 라이선스 원문은 `kenney/<kit>/License.txt`.

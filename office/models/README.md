# office/models — Sim Office 모델 팩

`tools/office-models.py`가 Kenney CC0 키트의 .glb로 만드는 **생성물**입니다. 직접 고치지 않습니다.
파일마다 .glb 하나를 base64로 담아 `(window.SO_MODELS = window.SO_MODELS || {})['<pack>'] = '<base64>';`로 둡니다(`file://`에서 fetch 없이 `<script>`로 읽음). 텍스처(`colormap.png`)는 .glb 안에 들어 있습니다(bufferView, 외부 `uri` 없음).

## 만들기·점검

```sh
blender -b --python tools/office-models.py                               # 전부 (17개 파일, 몇 초)
blender -b --python tools/office-models.py -- characters city            # 이것만 ('characters' = 인물 12개)
blender -b --python tools/office-models.py -- --list                     # 팩·원본 키트·노드 수
blender -b --python tools/office-models.py -- food --keep-glb /tmp/glb   # .glb도 남김(확인용)
blender -b --python tools/office-models.py -- --copy-from /tmp/claude-1000/kenney-packs   # 원본 zip(풀린 폴더)에서 kenney/<kit>/로 복사한 뒤 만듦
node tools/office-models-check.mjs            # 크기·노드 수·텍스처 포함·애니메이션 검사 (문제 있으면 exit 1)
node tools/office-models-check.mjs --names cars       # 노드 이름(자식은 {…})
node tools/office-models-check.mjs --sizes furniture  # 조각마다 크기 [w h d]와 최소 모서리(glTF Y-up, 근사)
```

- 원본: `kenney/<kit>/<이름>.glb` + `kenney/<kit>/Textures/colormap.png` + `kenney/<kit>/License.txt`. 쓰는 파일만 복사해 두었습니다.
  kit 폴더: `mini-characters`, `city-kit-commercial`(2.1), `city-kit-suburban`(2.0), `city-kit-roads`, `car-kit`, `furniture-kit`(GLTF format 폴더의 .glb), `food-kit`.
- 빌드 스크립트 안에서도 검사합니다: 노드 이름 중복·누락, 조각이 원점에 있는지, 이미지가 포함됐는지, 인물의 뼈·애니메이션, 크기 한도(팩 3MB, 인물 350KB, base64 기준). 하나라도 어긋나면 실패합니다.
- 내보내기: glTF Y-up, 탄젠트 없음(원본에 있던 TANGENT를 빼서 작아짐), 인물의 두 번째 UV(TEXCOORD_1)도 뺌.

## 공통 규칙

- 팩의 **최상위 노드 = Kenney 파일 이름**(`building-a`, `desk`, `cup-coffee`). 모두 원점, 회전·배율 없음. 원본 파일의 원점을 그대로 둡니다(발밑 y=0).
  `scene.getObjectByName('<이름>')`으로 골라 `SkeletonUtils.clone`/`clone()`하면 됩니다.
- 여러 노드로 된 조각은 원본 구조를 자식으로 둡니다. 자식 이름은 `<조각>_<원본 노드 이름>`(`sedan_body`, `desk_drawer`), 같은 이름이 겹치면 `-2`, `-3`(`cheese_wedge-2`). 원본 최상위 노드에 배율·회전이 있으면(가구 `toilet`, `kitchenCoffeeMachine` 등) 빈 노드로 한 번 감쌌습니다(`toilet` > `toilet_toilet` > `toilet_cover`). 자식 하나 없이 배율만 있던 메시(음식 대부분)는 배율을 메시에 구워 넣었습니다.
- 재질: 텍스처 팩은 재질 하나 `colormap`(도시 팩은 `colormap`(상가)과 `colormap-suburban`(주택) 두 개). 가구는 텍스처 없이 색 재질 15개를 조각들이 공유: `wood woodDark metal metalLight metalMedium metalDark glass(알파 0.5, BLEND) carpet carpetDarker carpetWhite carpetBlue fur plant lamp _defaultMat(흰색: 벽·세면대 등)`.
- 텍스처 샘플러: 도시(상가)·도로·차는 LINEAR, 주택·음식·인물은 NEAREST(원본 그대로).

## 인물 (mini-characters) — `character-male-a` … `character-male-f`, `character-female-a` … `character-female-f`

| 파일 | KB(js) | 파일 | KB(js) |
|---|---|---|---|
| character-male-a | 182 | character-female-a | 204 |
| character-male-b | 182 | character-female-b | 186 |
| character-male-c | 196 | character-female-c | 186 |
| character-male-d | 180 | character-female-d | 192 |
| character-male-e | 179 | character-female-e | 183 |
| character-male-f | 184 | character-female-f | 192 |

- 원본 그대로: 최상위 노드 `character-<…>`(골격 오브젝트) 아래 뼈 `root > leg-left, leg-right, torso > arm-left, arm-right, head`와 스킨 메시 `body-mesh`, `head-mesh`(스킨 하나, 재질 `colormap`). 키 0.67, 발밑 y=0, 정면 +Z. 쉬는 자세는 T자.
- 애니메이션 16개(이름 그대로 `AnimationClip.findByName`): `idle walk sprint sit pick-up emote-yes emote-no holding-right holding-left holding-both interact-right interact-left crouch jump drive static`. 나머지(fall, die, attack-*, wheelchair-*, *-shoot)는 뺐습니다.

## city — 30개, 2196 KB (city-kit-commercial 2.1 + city-kit-suburban 2.0)

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

빼거나 바꾼 것 없음(PLAN 목록 전부, low-detail로 바꿀 필요 없었음).

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

## 출처·라이선스

Kenney (www.kenney.nl) — Mini Characters, City Kit (Commercial) 2.1, City Kit (Suburban) 2.0, City Kit (Roads), Car Kit, Furniture Kit, Food Kit. 모두 CC0 1.0(표기 의무 없음, "Kenney (www.kenney.nl)" 표기 권장). 라이선스 원문은 `kenney/<kit>/License.txt`.

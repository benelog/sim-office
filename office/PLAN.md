# Sim Office — 설계서 (병렬 작업의 기준)

미국 IT 회사의 직원으로 출퇴근하며 미국의 일상과 직장 생활을 겪어 보는 오픈 월드 3D 생활 게임(2026-10-02까지는 영어 학습 게임이었음). 정적 웹, 빌드 없음, `file://`에서 동작.
어린 왕자 게임(저장소 루트)과는 별개이며 `office/` 아래에 있습니다. 공유하는 것: `vendor/three-game.min.js`(three.js r186 + GLTFLoader·SkeletonUtils), `tools/game_models/kit.py`(Blender 도구), `kenney/`(CC0 원본).

## 1. 게임

- **주인공**(DoltHub `heroes`): Fairview(가상의 미국 바닷가 도시)의 IT 회사 **Seaside Labs**(2026-09-27까지 Lakeside Labs)에서 일하는 세 사람 가운데 하나를 제목 화면에서 고릅니다. 이름은 정해져 있고 고칠 수 없습니다.
  | id | 이름·역할 | model | 집(존, 시내의 문) | 사무실 자리 | 시작 돈 · 순급여 · 주거비 |
  |---|---|---|---|---|---|
  | jun | Jun Kim, 신입 개발자 | man-casual-3 | `home` Maple Street Apartments 원룸 (`apartment_door`) | office_desk | $1,200 · $2,600 · Rent $1,450 |
  | derek | Derek Alvarez, 시니어 개발자·온보딩 버디 | man-hoodie | `home_derek` River Road의 단독 주택 (`derek_door`) | office_desk_team | $5,400 · $3,900 · Mortgage $2,150 |
  | priya | Priya Nair, 프로덕트 매니저 | woman-casual-2 | `home_priya` Cedar Street Lofts (`priya_door`) | office_desk_priya | $3,800 · $3,500 · Rent $1,900 |

  주인공마다 에피소드와 달력이 따로 있습니다(`episodes.hero`, `calendar.hero`; Jun 46개 `d…`·`w_…`, Derek 33개 `dk_…`, Priya 33개 `pr_…` — 모두 1~15일; 15일째 Derek·Priya는 `db/seed/72-day15.sql`, Jun의 연봉 인상 요청 `d15_raise`는 2026-10-02에 뺌, `71-missions.sql`). 다른 두 사람은 내 게임에서 인물(`npcs`의 같은 id)로 나오고, 내가 고른 사람은 인물 목록에서 빠집니다. 존 파일의 포털에 `hero: '<id>'`가 있으면 그 주인공의 게임에만 있는 문(집), 소품에 `home: '<id>'`가 있으면 지도에서 그 주인공의 집으로 칠합니다. 저장은 이름(Jun·Derek·Priya)마다 한 판.
- **하루**: 07:00 알람 → 출근(버스·도보) → 회의·업무 → 점심 → 퇴근 → 장보기 → 집에서 잠(→ 다음 날). 시간은 걸어 다닐 때만 흐르고(초당 1분, `config.minutes_per_second`) 대화 중에는 멈춥니다. 23:00이 되면 어디에 있든 잠듭니다.
- **달력**: 1일 = 첫 월요일. 주말(6·7일, 13·14일)은 자유 시간(장보기·공원).
- **미션과 자유 플레이**(`config.mission_days` 15, `mission_bonus` $1,000, `mission_points` 200): 주인공의 에피소드(`day_from` ≤ 15)가 미션. 마지막 미션을 끝내면(대화 끝 카드를 닫을 때) 축하 카드, 보너스 입금(해고됐으면 없음), 점수, 매니저 문자. 저장 `mission = { day, all, bonus }`. 15일을 마치고 자면 아침 카드에 미션 정리(못 끝냈으면 몇 개 했는지, 보너스 없음)와 자유 플레이 시작. 16일째부터는 미션 대화 대신 되풀이 회의(아래 **되풀이 회의**)가 열리고, 목표 상자는 평일 출근 전이면 "출근하세요"(사무실 쪽 안내), 아니면 "자유 플레이". 근태·해고 규칙은 그대로. `sick` 태그 대화(병가 전화)를 끝내면 다음 평일이 병가(`sickFor`, 결근 아님, 목표 상자는 "집에서 쉬세요"). 대화 끝 카드·잠자리 요약·Work record에 미션 진행(완료/전체).
- **돈**: 시작 $1,200. 격주 금요일에 순급여 $2,600이 입금(payday, direct deposit: `payday_days` 5·19일, 그 뒤 `payday_every` 14일마다, 급여일이 은행 휴일(주말·연방 공휴일)이면 전 영업일에 입금 — 2027-01-01 → 12월 31일)되고, 매달 1일(`rent_day_of_month`, 11월 1일 = 28일째)에 월세 $1,450(Derek은 주택 담보 대출)이 빠져나갑니다(입주할 때 10월 치는 냈다고 봄). 커피·버스·점심·식료품·출장비를 씁니다. 급여명세서(gross, federal withholding, 401(k), net)를 읽는 에피소드가 있습니다.
- **에너지**(0~100): 깨어 있으면 시간당 6씩 줄고, 먹으면 회복(item.energy). 30 아래면 HUD가 경고하고 20 아래면 걷기가 느려집니다. 잠자면 100.
- **에피소드**(DoltHub `episodes`/`turns`): 장소+인물에서 열리는 대화. `day_from~day_to`, `time_from~time_to`, `requires`를 만족하면 그 인물 머리 위에 `!` 표시가 뜨고 말을 걸면 시작. 턴마다 인물 대사 → 하고 싶은 말(prompt: 의도이지 대본이 아님) → **보기 넷 중 고르기**(`model` + `distractors` 3개를 섞음, 힌트 없음; 2026-10-02에 입력(Type) 모드와 `lib/matcher.js`를 없앰) → 틀리면 그 보기에 대한 상대의 반응(`reactions`)을 듣고 다시 고름 → 맞히면 인물의 답(reply). 점수는 몇 번 만에 맞혔는지로(10·5·2·0). 끝나면 완료 기록과 `epScore[episodeId] = [얻은 점수, 만점]`.
- **되풀이 회의**(DoltHub `routines`, 2026-10-02 8차: id, hero `all`·주인공·목록, title(_ko), days 요일 이름, every `week`|`2weeks`(게임 주 번호 `(day-1)/7`의 짝홀 = parity)|`month`(그달 첫 그 요일), time, place, episodes = 대화 풀, people = 대사 없이도 회의에 오는 사람(그 시각에 출근해 있으면), miss_points): 자유 플레이(16일째~)의 근무일(회사 휴일 빼고)에 열리는 회의. 데일리 스탠드업(평일 10:00, 회의실, 1일째 Priya가 말한 대로), 마야와 1:1(격주 목요일 11:00, 18일째 = 10월 22일부터), 스프린트 계획(격주 월요일 13:30, 22일째 = 10월 26일부터)과 회고(그 반대 주 금요일 15:00, 19일째 = 10월 23일부터), 전사 회의(매달 첫 목요일 16:00). 회의마다 대화 풀에서 그 주인공의 것을 차례로(몇 번째 회의인지로) 고르고, 그 대화의 `time_from`~`time_to`(회의 시각 15분 전부터)에 열림. 끝내면 그날만 완료(`G.rdone {'<routine>@<day>': 1}`, 같은 대화가 다음 차례에 다시 나옴). 달력·아침 카드에 지난주~2주 뒤 회의가 나오고, 출근한 날 빠진 회의는 하루가 끝날 때 −miss_points(스탠드업·회고·전사 회의 5, 1:1·계획 10)와 매니저 문자, 아침 카드 알림(벌점은 없음). 대화 id는 `rt_<회의>_<jun|dk|pr|dev>_n`, `rt_retro_n`, `rt_allhands_n`; 에피소드 `hero`는 목록(`jun,derek`)이나 `all`도 됨(엔진 `forHero`, lint `heroesOf`; `all`인 대화에는 주인공이 말하지 않음).
- **자리에서 일하기**(DoltHub `tasks`, 2026-10-02 8차: id, hero `all`·주인공·목록, kind `build|review|alert|ticket|email|chat`, sender(`npcs` id, 없으면 시스템), title(_ko), body(_ko), choices JSON `[{ t, t_ko, r, r_ko, points, minutes }]` 셋, day_from, time_from·time_to(NULL이면 아무 때나)): 자리(주인공의 `desk`, kind `work`)의 "Work for an hour"는 시간을 쌓음(`G.worked {day: 분}`). 그 시간 안에 내 대화가 열리거나 오늘 회의가 시작되면 그때까지만 일하고(`nextUp`), 10분이 안 남았거나 회의 중이면 일하지 않고 알림. 근무일 사무실에서 한 시간을 마치면 업무 사건이 하루 두 번까지(첫 번째 50%, 두 번째 25%, 45분 안에 내 일정이 있으면 없음) 카드로 뜸: 보기 셋을 섞어 보여 주고 고르면 결과·점수·걸린 분(근무 시간에 더함)이 나옴(카드의 Continue는 고른 뒤에만, `#card.choose`). 안 본 사건부터, 다 봤으면 2주 지난 것 중 가장 오래된 것(`G.taskLog [{day, id, pick, n}]`). 개발자 공용 5(`jun,derek`), Jun 3, Derek 3, Priya 7, 모두 4 = 22개(`db/seed/75-desk.sql`). 주간 평가(자유 플레이): 그 주의 마지막 근무일을 마치고 자면 출근한 날(on·late·noon) × `config.work_hours_day`(4시간)와 그 주(16일째부터)의 근무 시간을 견줘, 100% 이상 +`week_good_points`(15)와 매니저의 칭찬 문자, 50% 미만 −`week_low_points`(15)와 걱정 문자, 그 사이는 점수 없음(`G.weeks {day: {mins, want, grade, n}}`, 아침 카드에 표시). 목표 상자는 근무일 사무실에서 "자리에서 일하세요"(다음 일정까지, 자유 플레이에서는 오늘·이번 주 시간), 잠자리 요약에 그날 근무 시간과 처리한 사건 수, Work record에 이번 주 시간과 최근 사건 12개.
- **휴가: 연차(PTO)와 병가**(2026-10-02 8차, `config.pto_hours_year` `jun:120,derek:160,priya:120`·`pto_start` `jun:0,derek:56,priya:40`·`sick_hours` 40·`pto_notice_days` 14·`sick_call_by` 09:30, `db/seed/76-leave.sql`): Jun의 4일째 대화 `d4_pto`에서 마야가 말한 대로. 연차는 월급날마다 연간 시간의 1/26씩 쌓이고(아침 카드에 표시), 병가는 처음에 40시간(캘리포니아 최소)을 받고 1월 1일에 다시 채워짐. 하루 = 8시간. **병가**: Work record나 휴대전화의 "마야에게 문자: 병가" 버튼 — 09:30 전이고 아직 출근 전이면 오늘, 아니면 다음 근무일(이미 쉬는 날이면 버튼 없음); 병가가 없으면 연차에서, 그것도 없으면 무급(`unpaid`, 다음 급여에서 하루에 순급여의 1/10씩, 한 번에 최대 급여 전액). 마야의 답 문자, 30일 안에 세 번째면 걱정 문자(벌점 없음). `sick` 태그 대화(Jun의 `d15_sick_call`)도 같은 처리(문자 없이). **연차**: Work record에서 날짜를 골라 신청 — 미션 뒤(16일째~)의 근무일, 오늘부터 14일 뒤 ~ 8주 안, 신청 중인 것을 뺀 잔고가 하루치 이상일 때. 다음 날 아침 마야가 답함(잔고 부족이나 스프린트 계획 날이면 거절, 승인하면 잔고에서 뺌), 문자와 아침 카드. 그날 전까지 취소 가능(승인된 것은 잔고 환급). 휴가 날(`leaveOf(d)`: pto | sick | unpaid)은 나에게 쉬는 날(`myOff`): 출근 판정·회의·업무 사건·주간 평가의 기대치에서 빠지고, 근무 기록은 `pto`(연차, 유급)·`sick`(병가). 달력에 연차·병가·신청 중 표시, 목표 상자에 "오늘은 연차". 해고되면 마지막 급여에 무급일은 빠짐. 저장 `G.leave = { pto, sick, days {day: pto|sick|unpaid}, req [{day, made, status pending|approved|declined|cancelled, why}], unpaid }`.
- **되풀이되는 문자·우편**(2026-10-02 8차, `db/seed/77-recurring.sql`): `messages`·`mail`에 `every`(며칠마다, 30 이상이면 매달 같은 날짜)·`last_day`(마지막 게임 일) 열. 되풀이할 때마다 따로 도착하는 메시지(`<id>@<day>`, 첫 번째는 원래 id; 저장 `G.got`·`G.mailGot`도 그 id), 일요일·연방 공휴일에 걸린 우편은 다음 배달일로. 되풀이 행에는 답장(`replies`)을 달 수 없음(lint). 마켓 주간 이메일(목)·전단(토) 4벌씩 차례로, 주인공별 가족 문자(일요일 저녁, 4벌), 팀 문자(수요일), 냉장고 정리(격주)·패치 화요일(4주), 스팸 전화·사기 문자, 은행 월 명세서, 카드 사전 승인 광고 등. 계절에 한 번: 핼러윈 사탕, 추수감사절 칠면조, 연말 베이킹·새해, 연말 카탈로그, 가족의 크리스마스 카드, W-2(이메일·우편), 1099-INT. 엔진이 만드는 것(자유 플레이만, `made`): 날씨 서비스 알림(비·안개·영하, 그날 `Fairview Weather` 메시지가 없을 때, 06:45)과 자동이체 회사(`bills.company`)의 명세서 이메일(납부 5일 전 08:10). 휴대전화는 최근 80개, 우편함은 최근 40통을 보여 줌.
- **평가**(2026-10-02 8차, `db/seed/78-review.sql`, config `raise_meets` 3·`raise_exceeds` 5·`review_bonus` 1500·`probation_extend_days` 30): 1월 4일 월요일(92일째) 15:30 마야의 방, 금요일(96일째)까지 열리는 `review` 태그 대화(`rv_jun` 90일 수습 평가, `rv_derek`·`rv_priya` 연말 평가, 4턴씩), 12월 28일(85일째)에 마야의 안내 이메일, 달력. 대화를 마치면 결과 카드: 1일째부터의 근태 40(지각 −5, 오후 출근 −8, 결근 −12, 조퇴 −6), 팀 회의 20(출근한 자유 플레이 날의 회의 중 참석 비율), 자리에서 한 일 25(`G.weeks` 평균: 충분 1·보통 0.6·부족 0.2, 없으면 15), 중간에 생긴 일 15(사건 점수 평균/8, 없으면 10), 미션 모두 완료 +5 → 80 이상 기대 이상, 55 이상 기대 충족, 그 아래 개선 필요. 인상은 다음 급여부터(`G.raise` 배수, `netPay()`·`grossPay()`가 급여·달력·은행·마지막 급여에 씀), 연말 평가의 기대 이상은 보너스 $1,500. 신입(역할에 new hire)이 개선 필요면 수습 30일 연장: 그날 아침 평가 다음 날부터의 기록으로 다시 보고, 또 개선 필요면 해고(`fire(false, 'probation')`, 인사팀 메일 사유가 다름), 아니면 수습 통과(+15). 금요일까지 대화를 안 하면 다음 날 아침 이메일로 평가(−10점). 저장 `G.review = { day, kind probation|annual, total, rating exceeds|meets|needs, raise, bonus, missed, extendTo, final }`.
- **배운 표현**: `phrases`는 저장(`phrases`)에만 쌓이고 2026-10-02부터 화면에 보이지 않음(생활 체험으로 바꾸면서 대화 끝 카드와 Conversations에서 뺌).
- **TTS**: 브라우저 `speechSynthesis`. **미국 영어(en-US) 목소리 우선**, 인물마다 `voice_pitch`·`voice_rate`(·`voice_like`: 목소리 이름 정규식). 인물 대사·답·배운 표현·상점 품목 이름을 읽어 줍니다. 헤더에 Voice 체크박스.
- **상점**: 식료품점(market)·식당(diner)·커피 카트(coffee_cart)에서 `items`(kind `grocery|meal|drink|gear`)를 삽니다(잔액 확인, "You can't afford that"). 식료품은 인벤토리에 들어가 집에서 먹고, 식사·음료는 바로 먹습니다.
- **잠**: 집 침대(home_bed)에서 Sleep → 다음 날 07:00, 에너지 100, 급여·월세 처리, 그날의 캘린더 요약 카드.
- **저장**: `localStorage` `so.v1.saves` = `{ [이름]: { name, model, day, minute, money, energy, zone, at, done:{episodeId:true}, inventory:{itemId:n}, phrases:[id], log:[…], score, points:[{day, minute, n, en, ko}], work:{pts, record:{day: on|late|noon|absent|trip|sick}, warned, fired, streak, stopDay}, epScore, saved } }`(캐릭터 이름마다 한 판), `so.v1.last` = 마지막에 한 이름. 자동 저장(에피소드 완료·구매·존 이동·잠). 예전 한 판짜리 `so.v1.save`는 시작할 때 목록으로 옮깁니다.
- **날씨**(DoltHub `weather`, 하루 한 줄: `clear` `partly` `cloudy` `rain` `fog`, 최고·최저 기온 °F, 예보 문장): 하늘에 구름(하늘 셰이더의 `cover`), 흐리면 해가 약해지고 그림자가 옅어지며, 비 오는 날은 비가 오락가락(빗줄기 `LineSegments`), 안개는 아침에 끼고 11시까지 걷힘. 실내는 창밖 빛이 시간·날씨를 따름. HUD 시계 옆에 지금 기온, 아침 카드와 새 게임 첫 알림에 예보. 표의 마지막 날(21일째) 뒤로는 엔진이 계절로 만듦(`wxDay`: 달마다 평년 최고·최저 기온(10월 72/53 → 12·1월 58/42°F)을 날짜로 보간, 비 올 확률(10월 10% → 1월 35%, 전날 비면 2배), 여름 안개, 하루마다 같은 결과, 예보 문장은 영어·한국어 틀). 시작 날짜가 없으면 표를 되풀이.
- **세금과 팁**: 표시 가격은 세전. 식사·음료·기타 물품에 판매세(`config.sales_tax` 8.25%), 식료품·요금은 면세. 식사·음료를 파는 곳에서는 상점 창 위에 팁 선택(`tip_options`, 세전 가격 기준; 다이너·식당은 기본 `tip_default` 18%, 카운터는 기본 없음). 영수증은 `가격 + tax + tip = 합계`.
- **영업시간**(`config.hours_<존 또는 장소>`, 주말은 `…_weekend`, 그날만은 `…_<YYYY-MM-DD>` = `HH:MM-HH:MM` 또는 `closed`): 다이너 06:30~21:30, 마켓 07:00~22:00, 커피 카트 평일 06:30~15:00·주말 08:00~14:00. 휴일 영업시간(추수감사절 마켓 16시까지·다이너와 커피 카트 휴무, 크리스마스 모두 휴무, 이브·새해 전날 일찍 닫음, 새해 첫날 늦게 엶)은 아침 카드에 `Holiday hours`로 나오고, 하루 종일 닫는 곳은 문에서 `closed today`, 상점 행동은 `Closed today`. 닫혀 있으면 문으로 못 들어가고 상점 행동이 `Closed · open …`. 그 장소에 열린 에피소드가 있으면 닫지 않음.
- **인물의 일과**(DoltHub `schedule`: npc, seq, days `weekday|weekend|all`(회사 휴일은 weekend로 봄), 요일 이름 목록 `mon,tue,wed` 또는 게임 날짜 `11-12`(출장처럼 그날만), time_from, time_to, place): 맞는 첫 줄의 장소에 있고, 맞는 줄이 없거나 그 장소가 그날 하루 종일 닫았으면 없음(퇴근·휴무). **가게는 교대 근무**(2026-10-02): 마켓 계산대 Gloria(월~금 07~15)·Mike(수~일 15~22)·Tyler(토·일 07~15, 월·화 15~22), 다이너 Rosa(월~금 06:30~14:30)·Marisol(수~일 14:30~21:30)·Hector(토·일 06:30~14:30, 월·화 14:30~21:30), 커피 카트 Nina(월~금)·Jess(토·일). 같은 자리(`npcs.place`)의 동료에게 열린 에피소드가 있으면 그 시간에 근무인 사람은 자리를 비켜 줌(에피소드 인물이 우선). 줄이 없는 인물은 늘 `npcs.place`. 열린 에피소드가 있으면 그 장소가 우선(상대 인물뿐 아니라 그 에피소드의 턴에 `speaker`·`reply_speaker`로 나오는 사람도 함께 그 장소에 옴: 회의). 사무실 사람들은 평일에만 출근하고 점심때 탕비실에 번갈아 가며, **주말에는 사무실에 아무도 없음**(들어갈 수는 있음).
- **잡담**(DoltHub `smalltalk`, topic `weather:<kind>` `day:monday|friday|weekend` `time:morning|lunch|evening`): 인물이 지나가는 말 셋에 하나(첫마디 포함)는 지금 날씨·요일·시간에 맞는 말.
- **공과금과 은행**(DoltHub `bills`: 처음 자동이체되는 게임 날짜 `day`, 주기 `every`; 28일 이상이면 매달 그 날짜(10월 7일 → 11월 7일), 아니면 `every`일마다): 아침에 빠져나가고 아침 카드·달력에 표시. Menu > Bank(`B`): 잔액, 2주 안의 입출금 예정, 최근 거래(세금·팁 포함).
- **거리의 붐빔**(`office/life.js`): 존에 들어올 때의 시각·요일·날씨로 자동차와 행인 수를 정함(출퇴근 시간 자동차 1.6배, 밤에는 절반, 비 오면 행인 절반, 비 오는 날 공원 벤치에는 아무도 없음).
- **날짜와 공휴일**(`config.start_date` = 1일의 실제 날짜, 월요일이어야 함: 2026-10-05, DoltHub `holidays`: date `YYYY-MM-DD`, kind `federal|observance`): HUD·달력·은행·아침 카드는 미국식 날짜(`Mon, Oct 5`)를 쓰고 `Day n`은 곁들임. 공휴일은 달력(이번 주 + Coming up 3개)과 아침 카드에 나오고, 연방 공휴일에는 버스가 주말 시간표로 다니며 사람들이 그 얘기를 함(smalltalk `holiday`). 공휴일 표는 2027-02-15 Presidents' Day까지. **회사 휴일**(`config.company_holidays`: 추수감사절과 다음 날, 크리스마스이브·크리스마스, 새해 첫날, MLK Day, Presidents' Day)에는 사무실이 쉼: 근태 판정 없음(유급 휴일), 사무실 사람들은 주말 일과, 목표 상자 `Day off`, 아침 카드·달력에 휴무 표시, 거리는 주말처럼 한산. 그 밖의 공휴일(Columbus Day, Veterans Day)에는 사무실이 쉬지 않음.
- **휴대전화**(DoltHub `messages`: hero `all` 또는 주인공, day, time, kind `text|email|voicemail|alert`, sender = 인물 id 또는 이름, subject, body): 시각이 되면 알림음과 함께 토스트가 뜨고 Menu 버튼에 안 읽은 수. Menu > Phone(`P`)에서 최근 것부터 읽고 ▶로 들음(인물이 보낸 것은 그 목소리). 내가 고른 주인공이 보낸 것은 빠짐. 대화 중에는 오지 않고 끝난 뒤에 옴. 은행 알림(급여 입금, 자동이체, 잔액 부족, 초과 인출 수수료)은 표가 아니라 엔진이 만듦(`notify`). 저장: `got {id: 1 안 읽음 | 2 읽음}`, `notes [...]`(최근 40개). 스팸 전화·피싱 문자도 있음(한국어 설명에 표시).
- **버스 시간표**(`config.bus_every` 20분, `bus_every_weekend` 30분: 주말·연방 공휴일, `bus_first` 06:00, `bus_last` 22:30): 다음 버스를 기다렸다가 탐(기다린 시간 + 15분 경과). 정류장 행동에 다음 버스 시각, 막차 뒤에는 `No more buses tonight`.
- **비와 우산**: 밖에 비가 오면(`rain` > 0.12) 인물·행인이 우산을 씀(`shelter`, 기본 도형). 마켓에서 우산(`items` kind `gear`, 과세)을 사서 가방에 있으면 나도 씀. 없으면 젖고(`wet` 0~1, 실내에서 마름) 에너지가 더 빨리 줄며(`config.rain_energy_per_hour`), HUD 날씨 옆에 💧, 실내 사람들이 한마디 함(smalltalk `you:wet`). 빗소리(Web Audio 합성, 실내에서는 작고 먹먹하게).
- **단골 카드**(`config.punch_card_place` coffee_cart, `punch_card_every` 6): 음료 5잔을 사면 다음 한 잔이 무료. 무료 음료의 팁은 원래 가격 기준. 저장의 `punch`.
- **은행 수수료**: 자동이체 등으로 잔액이 0 아래로 내려가면 초과 인출 수수료(`config.overdraft_fee` $35, 하루 한 번), `config.low_balance`($100) 아래로 내려가면 잔액 부족 알림.
- **지각·결근·조퇴·해고**(`config.late_after` 09:15, `late_points` 2, `noon_points` 3, `absent_points` 4, `early_before` 16:00, `early_points` 2, `warn_points` 2, `final_points` 4, `fire_points` 6): 평일(회사 휴일 말고는 공휴일도 출근)에 사무실에 처음 들어간 시각을 기록(`inDay`, `inAt`)하고 근무 기록(`work.record`)에 정시(+5점)·지각(정오 전, −10점, 벌점 2)·오후 출근(−20점, 벌점 3)을 남김. 하루가 끝날 때(잠) 출근하지 않은 평일은 결근(−30점, 벌점 4). 출장 존에 간 날은 출장(`tripDay`), 그날 `sick` 태그 대화(병가 전화)를 끝냈으면 병가로 결근이 아님. 5일 연속 정시면 벌점 −1. **조퇴**: 출근한 날 `early_before` 전에 사무실에서 나가면(문으로; 출장 존은 빼고) 토스트로 알리고 목표 상자가 `Head back to work`, 다시 들어오면 없던 일(점심), 돌아오지 않은 채 하루가 끝나면 조퇴(−10점, 벌점 2, 연속 정시 끊김, `work.left {day: 나간 시각}`, 아침 카드·달력·Work record에 표시). 매니저 문자는 이유(지각·결근·조퇴)에 맞게, 인사팀 최종 경고는 셋 다 언급. 벌점이 `warn_points`면 매니저(maya)의 문자, `final_points`면 인사팀(linda)의 최종 서면 경고 이메일, `fire_points`면 해고: 출근해서 지각으로 해고되면 그 자리에서 카드와 함께 건물 밖으로, 결근으로 해고되면 아침 카드와 이메일. 해고되면 마지막 급여(지난 급여일 뒤 일한 날 × 순급여/10)가 바로 들어오고, 그 뒤 급여는 없으며, 사무실·출장 존의 대화와 동료의 전화 대화·달력 일정이 닫히고, 사무실 문에 들어서면 출입증이 막혀 프런트(tom)가 제지함(하루 한 번 카드, 그다음은 토스트). 동료들은 지각한 날 한마디(smalltalk `you:late`). HUD의 ★ 점수(누르면 Menu > Work record, `R`)와 평가(근무 양호·구두 경고·최종 경고·해고됨). 23:00에 쓰러져 잠들면 다음 날 에너지 80으로 시작.
- **유통기한과 요리**(`items.shelf_days`·`uses`·`cook_only`, DoltHub `recipes`: minutes, energy, ingredients = 물품 id 쉼표 목록, tool, steps·steps_ko는 ` | `로 구분): 가방은 묶음 단위(`lots [{id, day, left}]`, `inventory`는 거기서 계산)로 관리. 식료품은 산 날 + `shelf_days`일까지 먹을 수 있고(`best by`, NULL이면 상하지 않음) 그 뒤에는 상해서 Inventory에서 `Throw out`만 됨. 한 묶음은 `uses`회분. `cook_only`(달걀·베이컨·다진 소고기·양파·브로콜리·냉동 피자)는 그냥 못 먹음. 집 부엌의 `Cook a meal`(또는 집에서 Inventory의 버튼)에서 요리법을 고르면 재료마다 1회분을 오래된 묶음부터 쓰고 시간이 지나며 에너지가 오름. 요리법마다 만드는 법(영어 조리 동사)과 ▶ 듣기. 아침 카드에 밤새 상한 것과 오늘까지인 것. 상점 목록에 회분·보관 일수 표시. 예전 저장의 물건은 불러온 날 산 것으로 봄.
- **해돋이·해넘이**(`config.latitude` 37.6, `longitude` −122.4, `utc_offset` −7): 날짜마다 NOAA 식으로 계산(10월 5일 7:07/18:48 → 10월 25일 7:26/18:21). 하루의 빛(`KEYS`, 해돋이 6:30·해넘이 19:00 기준)을 그날의 해돋이·해넘이에 맞춰 늘이고 줄임(`solarHour`). 가로등·자동차 전조등·HUD의 달·창밖 하늘도 따름(`api.dark`, `api.solarMinute`). HUD 날씨 풍선말과 아침 카드에 해돋이·해넘이 시각. 해가 18:36 전에 지는 무렵부터는 해 질 녘에 "벌써 어둡네" 잡담(smalltalk `time:dark`). 서머타임 전환은 하지 않음(시계는 늘 같은 오프셋).
- **길 건너기**(`office/life.js`): 신호 교차로 옆 횡단보도(4곳)에 보행 신호. 나란히 가는 차가 초록불을 받으면 8초 동안 `WALK`(흰 사람), 이어서 깜빡이는 `DON'T WALK`와 남은 초(주황 손), 그다음은 `DON'T WALK`. 가장 가까운 횡단보도 건너편에 표지가 떠 있음(4.5 안). 차도를 횡단보도 아닌 곳에서 건너면 무단횡단(jaywalk), 횡단보도라도 `DON'T WALK`에 들어서면 신호 위반(dontwalk), 차가 내 앞에서 1.3초 넘게 서 있으면 경적(honk, Web Audio, 7초에 한 번). 셋 다 하루 한 번 영어 설명 토스트(한국어 도움말), 저장의 `street`에 횟수.
- **라디오**(DoltHub `radio`: day = 그날, NULL = 아무 날(돌아가며), kind `news|community|sports|traffic|ad`; `config.radio_station` KFVW 88.5): 집 책상에서 `Turn on the radio`. 방송국 소개와 시각·날짜(미국식 서수 "October 7th"), 날씨(지금 기온 °F, 오늘 또는 오늘 밤·내일 예보, 해넘이 또는 내일 해돋이, 비 오면 우산), 평일 출퇴근 시간의 교통 정보, 공휴일, 그날의 동네 소식(없으면 아무 날 소식 둘), 광고 하나, 맺음말. 조각마다 ▶, 전체 듣기 버튼.
- **TV**(DoltHub `tv`: name, kind `news|tech`, channel = YouTube 채널 id `UC…`, live = 생방송하는 채널; places kind `tv`: `home_tv`·`derek_tv`·`priya_tv`): 집 소파에서 `Watch TV` → 소파에 앉아 TV 쪽을 보고 패널이 열림. 채널마다 `Live`(`embed/live_stream?channel=`, 지금 생방송 중인 것; 한 채널이 여러 개를 동시에 방송하면 안 나올 수 있음)와 `Latest`(업로드 재생목록 `UU`+id 뒤 22자). 영어 자막(`cc_load_policy=1&cc_lang_pref=en`), 자동 재생, `Open on YouTube ↗` 링크. **인터넷이 필요하고 `file://`에서는 YouTube가 Error 153(리퍼러 없음)으로 막으므로** 그때는 YouTube 링크만 보여 줌(GitHub Pages·로컬 http 서버에서는 재생). 보는 동안 게임 시계는 멈추고, 끄면 실제로 본 시간(5분~3시간)이 흐름. 다른 패널을 열어도 꺼짐. 실존 방송사 이름은 사용자 요청에 따른 예외(공식 임베드 플레이어로 보여 줄 뿐 콘텐츠를 복사하지 않음).
- **빨래**(`config.closet_outfits` 7, `laundry_hours` 07:00-22:00, `items` `detergent` 16회분·`laundry_load` $5): 깨끗한 옷 수(`clean`, 처음 5벌)는 아침마다 한 벌 줄고, 없으면 어제 옷을 입은 날(`dirtyDay`)이라 사무실 사람들이 한마디(smalltalk `you:laundry`). 집 현관에서 `Do laundry`: 세제 1회분과 90분, 세입자(Jun·Priya)는 건물 세탁실(영업시간, $5), 집주인(Derek, housing Mortgage)은 자기 세탁기(무료, 21:00까지 시작). 끝나면 7벌. 아침 카드에 옷이 떨어져 가면 알림, Inventory 위에 깨끗한 옷 수. 세탁실 규칙 안내문이 우편함에 옴(2일).
- **목소리**: 인물마다 `npcs.voice_like`(목소리 이름 패턴, 미국 영어 목소리에서 먼저 찾음) → 없으면 모델의 성별(`man-`/`woman-`)에 맞는 미국 영어 목소리 중 id로 고른 것 → 그것도 없으면 기본 목소리의 음높이를 남자는 −0.3, 여자는 +0.3. **주인공이 한 말(입력·선택한 답)도 주인공의 목소리로 읽고**, 상대의 답은 그 뒤에 이어집니다.
- **지난 대화**(Menu > Conversations, `T`): 끝낸 대화를 최근 것부터 다시 읽고 ▶로 들음(맞는 대답과 그 대화의 점수).
- **조깅**(`office/jog.js`): 시내를 한 바퀴 도는 달리기 길 Fairview Loop(서쪽 가장자리 → 해변 → 동쪽 가장자리 → 강변, 약 175). 집 현관에서 `Go for a jog`(40분 경과, 에너지 −12) 또는 제목 화면의 `Jogging mini-game`(게임 없이 단독). 1인칭 시점으로 저절로 달리고, 박자(0.4초)에 맞춰 왼발·오른발을 번갈아 누릅니다(← → / A D / F J, 터치는 화면 좌우). Perfect·Good·OK에 따라 페이스가 올라 속도 2.2~5.6, 점수는 연속 성공 배수. 다른 주자 셋과 순위를 겨루고, 앞지를 때 "On your left!". 최고 기록은 `localStorage so.v1.jog`. 해변에 가까워지면 파도 소리(Web Audio로 합성, 시내 남쪽을 걸을 때도 들림).
- **마을 구경**(제목 화면 `Look around town`): 시내를 자유 카메라로 둘러봄. ↑↓/WS 이동, ←→/AD 회전, QE 옆으로, ZX·휠 확대, RF 높이, Shift 빠르게, Space 자동 회전, T 시간대, Y 날씨, Esc 돌아가기, 마우스·터치 끌기.
- **조작**: 어린 왕자 게임과 같음. ↑↓/WS 걷기, ←→/AD 돌기, Shift 달리기, E/Enter 행동. 터치: 왼쪽 아래 조이스틱, 행동 버튼. HUD: 요일·날짜·시각, $잔액, 에너지 막대, 다음 일정, 현재 목표.

## 2. 파일

```
office/
  index.html  game.css  game.js        # 엔진·화면 (A1)
  life.js  jog.js                     # 거리의 자동차·행인 / 조깅 미니 게임
  zones/index.js, zones/<zone>.js     # 존 배치 (A2)
  data/db.js                          # DoltHub에서 내려받은 데이터 (tools/dolt.mjs pull, 생성물)
  models/<pack>.js, models/<character>.js   # base64 .glb (B, 생성물)
  PLAN.md                             # 이 문서
db/schema.sql, db/seed/NN-*.sql       # DoltHub에 넣는 SQL (C, D)
tools/dolt.mjs                        # push / query / pull
tools/seed-json.mjs                   # 시드를 올리기 전에 db.js에 얹어 보기(lint·점검용)
tools/office-models.py                # Kenney .glb → office/models/*.js (B)
tools/office-characters.py            # Quaternius → office/models/man-*, woman-*, rig-*.js
tools/office-check.sh, office-check.mjs   # 헤드리스 Chrome 점검 (A1)
kenney/<pack>/…glb + License.txt      # 쓰는 원본만 복사 (B)
```

1차 병렬 작업(2026-09-26)은 끝났습니다. 그때 규칙: 에이전트는 자기 파일만 만들고 고치며, 다른 에이전트의 파일은 이 문서의 명세를 믿고 진행하고, 없으면 임시 대체(placeholder)를 씁니다. 커밋은 하지 않습니다.

엔진이 존 파일에서 추가로 받는 것(A1 구현): `background`, `outside`(실내 바깥 바닥색), `portal.when(api)`, `setup(api)`, `update(api, dt)`. 엔진의 추가 규칙: 침대 Sleep은 20:00 이후나 에너지 25 이하일 때만, `office_desk`에 "Work for an hour"(아래 **자리에서 일하기**), 버스 15분·식사 20분·음료 5분 경과, `tags`에 `phone`이 든 에피소드는 인물 없이 장소에서 여는 전화 대화, 열린 에피소드가 있으면 인물은 그 에피소드의 place에 섬, 음수 `reward`는 지출, city→airport 포털은 그날 출장 에피소드가 있을 때만.

## 3. 데이터 (DoltHub `benelog/sim-office`, main)

토큰은 `.envrc`(`source .envrc`). `node tools/dolt.mjs push db/seed/10-x.sql`(문장마다 커밋 1개, 2초; **여러 행을 한 INSERT로**), `node tools/dolt.mjs query "…"`, `node tools/dolt.mjs pull`(→ `office/data/db.js`, `window.SO_DB`). 스키마는 `db/schema.sql`. 시드는 `REPLACE INTO`로 써서 다시 밀어 넣어도 됩니다. 문장 구분은 **줄 끝의 `;`** 입니다(값 안의 `;`는 줄 끝에 오지 않게).

`SO_DB` 모양: `config` `{k:v}`(숫자는 숫자), 나머지는 행 배열(`places npcs chatter episodes turns phrases items calendar schedule weather smalltalk bills heroes messages holidays recipes replies mail radio tv routines tasks`). `turns.answers/distractors/hints/hints_ko`와 `tasks.choices`는 JSON으로 풀려 있습니다.

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
| gloria | Gloria, day cashier (마켓) | woman-casual | market_checkout |
| tyler | Tyler, weekend cashier (마켓) | man-hoodie-2 | market_checkout |
| marisol | Marisol, evening server (다이너) | woman-punk | diner_counter |
| hector | Hector, server, weekends (다이너) | man-adventurer | diner_counter |
| jess | Jess, weekend barista (커피 카트) | woman-adventurer | coffee_cart |

플레이어 기본 모델 man-casual-3. 고를 수 있는 8명(캐스트가 안 쓰는 모습): man-casual-3 man-hoodie-2 man-suit-2 man-adventurer woman-casual woman-formal woman-adventurer woman-punk. 인물 모델은 겹쳐도 됩니다(행인은 캐스트가 안 쓰는 모습을 먼저 씀, `office/life.js`).

### 에피소드 id 규칙
`d<날>_<이름>` (예 `d1_badge`, `d3_one_on_one`, `d11_checkin`). 주말·반복은 `w_` (예 `w_market`). 턴은 3~6개. `prompt`는 의도(정답의 낱말·관용구를 쓰지 않음, 앞에서 나오지 않은 사실만 담음). `distractors`는 3개, **그럴듯한 오답**: 정답과 비슷한 길이·말투로, 사실이 틀리거나(앞 대화·상황과 어긋남), 상대·순간에 맞지 않거나(무례·지나친 약속·떠넘기기), 묻는 말을 잘못 알아들은 것. 엉뚱한 말·문법 오류는 쓰지 않음. `reactions`는 각 오답에 대한 상대의 한마디. 화면에 보이는 모든 글에 `_ko`(`line_ko`, `model_ko`, `distractors_ko`, `reactions_ko`). `answers`·`hints`는 남아 있지만 안 씀. `phrases`는 에피소드마다 4~8개, `id`는 `<episode>.<slug>`.

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
  name: 'Seaside Labs, 3rd floor', name_ko: '시사이드 랩스 3층',
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

- `index.html`: 헤더(게임 이름, 요일·시각, $, ★ 점수, 에너지, Voice 체크박스, 🌐 언어 선택), 캔버스, 말풍선, 목표/일정 패널, 행동 버튼, 조이스틱, 대화창(situation·line·prompt·choices·feedback·Walk away·Continue), 상점 패널, Conversations 패널, 인벤토리, 시작 카드(이름·캐릭터 선택, 저장된 게임 목록에서 이어하기·삭제), 하루 요약 카드(잠잘 때), 메뉴 버튼(Phone·Work record·Conversations·Inventory·Calendar·Bank·Map·Reset). 고정 글은 `data-ko`(HTML)·`data-ko-label`(aria-label·title)에 한국어.
- 대화: 인물 대사는 말풍선+TTS+`dialog`. 정답이면 플레이어 말풍선, `emote-yes`. 오답이면 `emote-no`와 상대의 반응(`reactions`), 그 보기는 지워지고 다시 고름. 보기는 `model`+`distractors`를 섞어 4개.
- **언어**(`settings.lang` `en`|`ko`, 처음에는 브라우저 언어; 예전 Korean help가 켜져 있었으면 `ko`): 화면에는 한 언어만. 엔진은 `tr(en, ko)`·`loc(row, field)`(없으면 영어), 날짜 `dShort`·`dLong`, 시각 `clk`(한국어는 오전/오후), 한국어에서는 HUD 기온 °C. 목소리(TTS)는 늘 영어 원문(자막처럼). 바꾸면 패널·대화창·태그·HUD를 다시 그림. 조깅(`jog.js`)은 `api.lang`.
- 인물: `npcs`의 자리에 서서 가까이 오면 바라봄. 열린 에피소드가 있으면 머리 위 `!`. 없으면 `chatter`를 돌아가며 말함. 자리에 `sit:true`이면 `sit` 애니메이션.
- 시간·돈·에너지·잠·급여·월세·상점·인벤토리·배운 표현·저장은 1절대로.
- 카메라: 플레이어 뒤 위(3인칭), 실내에서는 더 가깝게. 벽 뒤로 카메라가 들어가지 않게 바닥 위로 제한만.
- **지도**(Menu > Map, `M`): 존 데이터로 캔버스에 그립니다 — 도로 타일(보도 딸린 3×3 칸), 소품의 발자국(`SO_ZONE_KIT.BOX`, 건물·나무·차·가구), 장소 핀, 문, 존의 `map`에 적은 거리·구역 이름, 사람(지금 있는 자리, 다른 건물 안이면 그 건물 문 앞에 모아서, 열린 에피소드는 `!`), 목표(점선 원), 나(화살표). 실내에 있으면 Town / 지금 있는 곳 탭. 지도 아래에 사람·행동이 있는 장소 목록과 시외(공항·호텔·고객사)에 있는 사람. 열려 있는 동안 0.5초마다 다시 그립니다.
- 디버그 API `window.SO.debug`: `ready`, `state`('title'|'play'|'talk'|'shop'|'sleep'|'card'), `day`, `time`, `money`, `energy`, `zone`, `start(heroId?)`, `hero`, `heroes`, `voice(id)`, `jog.start(story)`·`jog.state`·`jog.press(0|1)`·`jog.stop()`, `tour.start()`·`tour.do(what)`, `goto(zone, placeId?)`, `episodes()`(지금 열 수 있는 것), `startEpisode(id)`, `advance()`(현재 턴에 정답 → Continue), `wrong(n)`(n번째 오답 고르기), `choices`, `lang`(읽기·쓰기), `score`, `work`, `standing`, `arrive(zone, place)`(문으로 들어온 것처럼: 출근 판정), `autoplayEpisode(id)`, `sleep()`, `buy(itemId)`, `panel(kind)`, `mapTab('town'|'room')`, `inbox`·`unread`·`checkPhone()`, `date`·`holiday`, `rules(day)`(그날의 급여·월세·공과금·회사 휴일·휴일 영업시간·날씨), `routines(day?)`(그날의 회의와 대화, 완료 여부), `workHour()`(자리에서 한 시간: `{minute, worked, task}`), `worked(day?)`(그날 근무 분), `taskLog`, `task(id?)`(사건 카드 띄우기, id 없으면 확률대로), `pick(i?)`(보기 i, 없으면 가장 좋은 것), `week(day?)`(그 주의 출근일·근무 분·기대치·사건 수), `review`(읽기·쓰기: 평가 결과), `reviewScore(from?, to?)`, `netPay`(인상이 반영된 순급여), `leave`(잔고·휴가 날·신청), `leaveOf(day?)`, `callInSick()`, `requestPto(day)`, `cancelPto(day)`, `ptoDays()`(신청할 수 있는 날), `panel(null)`(패널 닫기), `npcAt(id)`(지금 서 있을 장소), `setDay(n)`, `nextBus(min?)`·`ride(placeId)`, `wet`·`raining`·`rainSound`·`umbrellas`, `punch`, `lots`·`recipes`(지금 만들 수 있는 것)·`cook(recipeId)`·`eat(itemId)`·`toss(n)`, `pay(amount, text)`, `arrive(zone, placeId)`(문으로 들어가듯), `save`(현재 저장 객체), `saves`(저장된 이름들), `reset()`.
- 점검: `tools/office-check.sh <outdir> [steps.mjs] [w h]` — `tools/game-check.sh`와 같은 방식(bash에서 Chrome 헤드리스 띄우고 node가 CDP로 붙음, `TMPDIR=/tmp/claude-1000`). 기본 시나리오: 제목 화면 → 시작 → 집 → 각 존으로 goto해서 스크린숏 → 열 수 있는 에피소드 전부 autoplay → 잠 → 콘솔 오류 0, `finished: true`.
- 모델 팩이 아직 없으면(`SO_MODELS[pack]` 없음) 해당 소품은 회색 상자로 대체하고 콘솔 경고 1줄만.

## 7. 저작권·표기

Kenney 에셋은 CC0(표기 권장: "Kenney (www.kenney.nl)"), Quaternius 인물도 CC0(quaternius.com). three.js MIT. 대사·표현은 전부 자체 저작, 실제 회사·인물 이름을 쓰지 않습니다(Seaside Labs, Summit Retail, Fairview는 가상). 안내는 영어 기본, 한국어는 `_ko`.

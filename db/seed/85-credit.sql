-- Credit cards and the credit score (Menu > Bank). Jun has just moved to the U.S. and has no credit history here, so
-- the only card he can get is a secured one: a $300 deposit from checking is the limit, and after three on-time
-- payments in a row the card graduates to the bank's rewards card and the deposit comes back. Derek and Priya have had
-- credit for years (credit_months) and start with the rewards card, autopay on. At a shop you pay by debit card (from
-- checking at once) or credit card (the shop panel and the bank panel switch it). A statement on the 20th of every
-- month (card_close_dom) by email and by mail, the payment due 25 days later (card_due_days): pay the statement balance
-- in full and there is no interest; the minimum is the greater of min_due or min_pct % plus interest and fees; not even
-- the minimum by the due date is a late fee, and still unpaid a month later the bank reports it late. The score
-- (300-850) is worked out by the engine at each statement from payment history, the share of the limit used, the age
-- of your credit and applications (hard inquiries); Jun has none until his first statement is reported.
-- The cards table is in db/schema.sql (this CREATE TABLE is the same).
CREATE TABLE IF NOT EXISTS cards (id varchar(32) PRIMARY KEY, name varchar(60) NOT NULL, name_ko varchar(60), kind varchar(10) NOT NULL DEFAULT 'unsecured', last4 varchar(4) NOT NULL, deposit decimal(8,2) NOT NULL DEFAULT 0, credit_limit decimal(8,2) NOT NULL DEFAULT 0, apr decimal(5,2) NOT NULL, min_due decimal(6,2) NOT NULL DEFAULT 25, min_pct decimal(4,2) NOT NULL DEFAULT 1, late_fee decimal(6,2) NOT NULL DEFAULT 30, cash_back decimal(4,2) NOT NULL DEFAULT 0, min_score int, graduates_to varchar(32), note varchar(400), note_ko varchar(400), sort int NOT NULL DEFAULT 0);

REPLACE INTO config (k, v, note) VALUES
  ('card_start', 'derek:fcu_rewards,priya:fcu_rewards', 'the card each hero already has on day 1 (hero:card id); Jun has no U.S. credit history and none'),
  ('card_limit', 'jun:1000,derek:12000,priya:8000', 'credit limit of an unsecured card for each hero (Jun: when his secured card graduates)'),
  ('card_close_dom', '20', 'a card statement closes on this date of every month'),
  ('card_due_days', '25', 'the payment is due this many days after the statement closes'),
  ('card_graduate_after', '3', 'a secured card becomes its graduates_to card after this many on-time payments in a row with no late mark (banks look after 6 to 12 months)'),
  ('card_reminder_days', '5', 'the bank emails a payment reminder this many days before the due date (autopay off)'),
  ('credit_months', 'jun:0,derek:168,priya:96', 'months of U.S. credit history each hero has on day 1 (0: no history, no score)'),
  ('credit_util_start', 'jun:0,derek:0.31,priya:0.06', 'the share of the credit limit on the last statement reported before day 1');

REPLACE INTO cards (id, name, name_ko, kind, last4, deposit, credit_limit, apr, min_due, min_pct, late_fee, cash_back, min_score, graduates_to, note, note_ko, sort) VALUES
  ('fcu_secured', 'Starter Secured Card', '스타터 보증금 신용카드', 'secured', '7731', 300, 300, 24.99, 25, 1, 30, 0, NULL, 'fcu_rewards', 'Builds credit from scratch: no credit history needed. Your $300 deposit is your credit limit. It is kept in savings and comes back when the card graduates. We report your payments to the credit bureaus every month.', '신용 기록이 없어도 만들 수 있는, 신용을 처음 쌓는 카드예요. 보증금 300달러가 곧 신용 한도예요. 보증금은 예금으로 보관하다가 일반 카드로 바뀔 때 돌려드려요. 납부 기록은 매달 신용평가기관에 보고해요.', 1),
  ('fcu_rewards', 'Everyday Rewards Card', '에브리데이 리워드 카드', 'unsecured', '2604', 0, 5000, 19.99, 25, 1, 30, 1.5, 670, NULL, 'No annual fee, and 1.5% cash back on every purchase, credited on your statement. For members with an established credit history (a score of 670 or more).', '연회비가 없고, 모든 결제 금액의 1.5%를 명세서에서 돌려드려요. 신용 기록이 쌓인 회원(점수 670점 이상)을 위한 카드예요.', 2);

REPLACE INTO messages (id, hero, day, time, kind, sender, subject, subject_ko, body, body_ko) VALUES
  ('cc_offer_jun', 'jun', 16, '12:10', 'email', 'Fairview Credit Union', 'New to credit in the U.S.? Start here', '미국에서 신용을 처음 쌓으시나요? 여기서 시작하세요', 'Hi {name}, with no U.S. credit history, most card applications are turned down. Our Starter Secured Card is made for that: a $300 deposit becomes your credit limit. Use it a little, pay on time, and we report it to the credit bureaus every month. You can apply under Bank in the app.', '{name} 님, 미국 신용 기록이 없으면 신용카드 신청은 대부분 거절돼요. 스타터 보증금 신용카드는 그런 분을 위한 카드예요. 보증금 300달러를 맡기면 그만큼이 신용 한도가 되고, 조금씩 쓰고 제때 갚으면 매달 신용평가기관에 보고해 드려요. 앱의 은행 메뉴에서 신청할 수 있어요. (secured card: 보증금을 담보로 하는 신용카드)'),
  ('cc_tip_derek', 'jun', 17, '19:10', 'text', 'derek', NULL, NULL, 'Random tip from someone who learned the hard way: get a secured card, put a few small things on it every month, and pay off the whole statement. Your credit score will thank you when you rent your next place.', '고생해 보고 알게 된 팁 하나 줄게요. 보증금형 신용카드를 만들어서 매달 작은 것만 몇 번 쓰고, 명세서 금액은 전부 갚아요. 다음에 집 구할 때 신용 점수가 큰 도움이 될 거예요.');

REPLACE INTO mail (id, hero, day, kind, sender, subject, subject_ko, body, body_ko) VALUES
  ('cc_habits_jun', 'jun', 18, 'letter', 'Fairview Credit Union', 'Five habits that build credit', '신용을 쌓는 다섯 가지 습관', '1. Pay on time, every time: it is the biggest part of your score. 2. Keep your statement balance under 30% of your limit, and under 10% is even better. 3. Pay the statement balance in full, and you pay no interest. 4. Keep your first card open: the age of your credit counts. 5. Apply only for what you need: every application is a hard inquiry.', '1. 매번 제때 갚으세요. 점수에서 가장 큰 부분이에요. 2. 명세서 금액을 한도의 30% 아래로 유지하세요. 10% 아래면 더 좋아요. 3. 명세서 금액을 전부 갚으면 이자가 붙지 않아요. 4. 첫 카드는 해지하지 마세요. 신용 기록의 길이도 점수에 들어가요. 5. 필요한 카드만 신청하세요. 신청할 때마다 하드 조회가 남아요. (hard inquiry: 카드·대출 신청 때 하는 신용 조회)'),
  ('cc_report_all', 'all', 31, 'letter', 'Fairview Credit Union', 'Know what is on your credit report', '신용 보고서에 무엇이 있는지 알아 두세요', 'You can get a free copy of your credit report from each of the three national credit bureaus. Check that every account is yours and every payment is right, and dispute any mistake with the bureau. Looking at your own report never lowers your score.', '전국 3대 신용평가기관에서 각각 신용 보고서를 무료로 받아 볼 수 있어요. 모든 계좌가 본인 것인지, 납부 기록이 맞는지 확인하고, 틀린 곳이 있으면 그 기관에 정정을 요청하세요. 자기 보고서를 보는 것은 점수에 영향을 주지 않아요. (dispute: 이의를 제기하다)');

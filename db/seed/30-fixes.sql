-- Fixes applied after the first content pass (also reflected in the seed files above).
-- Paydays are every other Friday: day 1 is a Monday, so days 5 and 19 (not 15, a Monday).
REPLACE INTO config (k, v, note) VALUES ('payday_days', '5,19', 'game days on which the paycheck arrives: every other Friday (day 1 is a Monday, so days 5 and 19)');
UPDATE episodes SET title = 'Expense report and your paycheck', title_ko = '경비 정산과 급여 질문' WHERE id = 'd15_expenses';
UPDATE turns SET situation = 'Your first paycheck came in two weeks ago, and it was much lower than the salary in your offer letter.', situation_ko = '2주 전에 첫 급여가 들어왔는데 제안서의 연봉보다 훨씬 적었습니다.' WHERE episode = 'd15_expenses' AND seq = 4;
DELETE FROM calendar WHERE day = 15 AND time = '07:00';
REPLACE INTO calendar (day, time, title, title_ko, place, episode) VALUES (19, '07:00', 'Payday: direct deposit', '월급날: 계좌 입금', NULL, NULL);

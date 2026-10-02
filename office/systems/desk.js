/* Sim Office — work at your desk (tasks table) and the week at the desk. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- work at your desk (tasks table)
// "Work for an hour" at your desk: the minutes add up (G.worked { day: minutes }), and the hour stops early when a
// meeting or a conversation of yours is about to open. Now and then something comes up at the office (a red build, a
// review request, a customer ticket, a phishing email): a card with three things you could do, each with what
// happens next, points and the minutes it takes (G.taskLog [{ day, id, pick, n }]; at most two a day, the ones you
// have not seen first). After the missions, the last working day of a week ends with a note from your manager about
// the hours at your desk against config work_hours_day for each day you came in (weekReview).
const TASKS = rows('tasks').slice().sort((a, b) => (a.sort || 0) - (b.sort || 0));
const TASK_KIND = { build: ['🔴', 'Build', '빌드'], review: ['👀', 'Code review', '코드 리뷰'], alert: ['🚨', 'Alert', '경보'], ticket: ['🎫', 'Support ticket', '고객 문의'], email: ['✉️', 'Email', '이메일'], chat: ['💬', 'Chat', '메신저'] };
const WORK_HOURS_DAY = +CFG.work_hours_day || 4;
const hrs = (m) => { const h = Math.round(m / 6) / 10; return tr(`${h} h`, `${h}시간`); };
const workedOn = (d) => (G && G.worked && G.worked[d]) || 0;
const tasksOn = (d) => (G && G.taskLog || []).filter(x => x.day === d);
// the next thing of yours today: [minute, episode] for a conversation that opens later, or a meeting of today you
// have not been to (from now while it is on)
function nextUp() {
  return episodes().filter(laterToday).map(e => [hm(e.time_from, 0), e])
    .concat(routinesOn(G.day).filter(x => !(G.rdone && G.rdone[x.key]) && hm(x.ep.time_to, 1439) > G.minute).map(x => [Math.max(hm(x.r.time, 0), G.minute), x.ep]))
    .sort((a, b) => a[0] - b[0])[0] || null;
}
function workHour() {
  if (!G) return;
  const up = nextUp(), next = up && up[0] < G.minute + 60 ? up : null;
  const mins = next ? Math.ceil(next[0] - G.minute) : 60;
  if (mins < 10) {
    if (next[0] <= G.minute && next[1].remote) toast(`${next[1].title} is on now. Join the video call.`, `지금 ${loc(next[1], 'title')} 시간이에요. 화상 회의에 참여하세요.`, 'bad', 3);          // hybrid work
    else if (next[0] <= G.minute) toast(`${next[1].title} is on now. Go to ${place(next[1].place).name}.`, `지금 ${loc(next[1], 'title')} 시간이에요. ${loc(place(next[1].place))}에 가세요.`, 'bad', 3);
    else toast(`No time to start anything: ${next[1].title} at ${clock(next[0])}.`, `뭘 시작할 시간이 없어요: ${clockKo(next[0])}에 ${loc(next[1], 'title')}.`, null, 3);
    return;
  }
  advanceMinutes(mins);
  if (state !== 'play') return;          // it got too late and you fell asleep
  const d = G.day;
  (G.worked = G.worked || {})[d] = workedOn(d) + mins;
  player.sit = true;
  play(player, 'sit');
  goalTimer = 0;
  const soon = nextUp();          // no task when something of yours starts soon (it would make you miss it)
  const t = (zoneId === 'office' || remoteHere()) && !myOff(d) && !(soon && soon[0] < G.minute + 45) && pickTask();          // things come up at home too (hybrid work)
  if (t) { showTask(t); return; }
  const today = hrs(workedOn(d));
  if (next) toast(`You worked until ${clock(G.minute)} (${today} today). Next: ${next[1].title}.`, `${clockKo(G.minute)}까지 일했어요(오늘 ${today}). 다음: ${loc(next[1], 'title')}.`, null, 3.2);
  else toast(`You worked for an hour (${today} today).`, `한 시간 일했어요(오늘 ${today}).`, null, 2.4);
}
function pickTask() {
  const n = tasksOn(G.day).length;
  if (n >= 2 || Math.random() >= (n ? 0.25 : 0.5)) return null;
  const pool = TASKS.filter(t => mine(t) && (t.day_from || 1) <= G.day && (!t.time_from || hm(t.time_from, 0) <= G.minute) && (!t.time_to || G.minute <= hm(t.time_to, 1439)));
  if (!pool.length) return null;
  const { oldest, fresh } = leastSeen(pool, G.taskLog);
  return oldest && G.day - oldest < 14 ? null : anyOf(fresh);          // null: everything came up in the last two weeks
}
// the card (engine/choices.js): the time a choice takes is work too (no falling asleep on a card)
function showTask(t) {
  const k = TASK_KIND[t.kind] || ['📌', pretty(t.kind), t.kind], from = t.sender && NPCS[t.sender];
  showChoices({ row: t, kind: 'task', kicker: `${k[0]} ${tr(k[1], k[2])}${from ? ' · ' + fullName(from) : ''}`, extra: friendTip(t), ok: tr('Back to work', '다시 일하기'),
    pick(c, i, n) {
      const mins = Math.max(0, +c.minutes || 0);
      G.taskLog = (G.taskLog || []).concat({ day: G.day, id: t.id, pick: i, n }).slice(-200);
      friendTask(t, n);
      if (mins) { (G.worked = G.worked || {})[G.day] = workedOn(G.day) + mins; G.minute += mins; }
      return `${mins ? ` · ${tr(`${mins} min`, `${mins}분`)}` : ''} · ${tr('now', '지금')} ${clk(G.minute)}`;
    },
    done() { goalTimer = 0; } });
}
// a week: the working days you came in, the minutes at your desk, and what came up (days after the missions only)
function weekStats(d) {
  const w = work(), from = Math.max(Math.floor((d - 1) / 7) * 7 + 1, MISSION_DAYS + 1), to = Math.floor((d - 1) / 7) * 7 + 7;
  let came = 0, mins = 0;
  for (let x = from; x <= to; x++) { mins += workedOn(x); if (!offWork(x) && /^(on|late|noon)$/.test(w.record[x] || '')) came++; }
  const tasks = (G.taskLog || []).filter(x => x.day >= from && x.day <= to);
  return { from, to, came, mins, want: came * WORK_HOURS_DAY * 60, tasks: tasks.length, good: tasks.filter(x => x.n > 0).length };
}
const lastWorkday = (d) => { if (myOff(d)) return false; for (let x = d + 1; x <= Math.floor((d - 1) / 7) * 7 + 7; x++) if (!myOff(x)) return false; return true; };
// the end of the last working day of a week in free play (from goToSleep): the manager's note, and points
function weekReview(d) {
  if (!G || d <= MISSION_DAYS || fired() || !lastWorkday(d)) return null;
  const s = weekStats(d);
  if (!s.came) return null;
  const r = s.mins / s.want, me = hero().name_ko || G.name;
  const grade = r >= 1 ? 'good' : r >= 0.5 ? 'ok' : 'low';
  const n = grade === 'good' ? +CFG.week_good_points || 15 : grade === 'low' ? -(Math.abs(+CFG.week_low_points || 15)) : 0;
  (G.weeks = G.weeks || {})[d] = { mins: s.mins, want: s.want, grade, n };
  addScore(n, 'The week at your desk', '이번 주 업무량');
  const handled = s.good ? ` Thanks for jumping on what came up, too.` : '', handledKo = s.good ? ' 중간에 생긴 일도 챙겨 줘서 고마워요.' : '';
  if (grade === 'good') notify(BOSS, `Nice week, ${G.name}. You put real time into the sprint work, and it shows.${handled} Have a good weekend!`, `${me}, 이번 주 수고했어요. 스프린트 일에 시간을 제대로 들인 게 보여요.${handledKo} 주말 잘 보내요!`, 'text');
  else if (grade === 'low') notify(BOSS, `Hey ${G.name}, I looked at the board, and your tickets barely moved this week. Is something blocking you? Let's talk about it at our next 1:1, or grab me any time.`, `${me}, 보드를 봤는데 이번 주에 맡은 티켓이 거의 그대로네요. 막힌 게 있어요? 다음 1:1에서 얘기하거나 아무 때나 불러 줘요.`, 'text');
  return { grade, n, mins: s.mins, want: s.want };
}
// SO.debug: the desk: an hour of work, the tasks that came up, a task card (or the dice), pick(i) on it, the week
debugPart({
  workHour() { workHour(); return { minute: Math.floor(G.minute), worked: workedOn(G.day), task: choiceOf('task') ? choiceNow.row.id : null }; },
  worked: (d) => workedOn(d == null ? G.day : d), get taskLog() { return G ? (G.taskLog || []).slice() : []; },
  task(id) { const t = id ? TASKS.find(x => x.id === id) : pickTask(); if (t) showTask(t); return t ? t.id : null; },          // show a task card (or try the dice)
  pick(i) { return pickChoice(i == null && choiceNow ? bestChoice(choiceNow.row) : +i); }, week: (d) => weekStats(d == null ? G.day : d)
});

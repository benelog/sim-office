/* Sim Office — things that come up as a card with a few choices (a task at your desk, a loud neighbor at night). One of
   the engine's plain scripts (office/engine, office/systems) that share one scope; office/index.html loads them in order. */
'use strict';
// A row with choices (tasks, home_events kind noise: title, body, choices [{ t, t_ko, r, r_ko, points, … }]) shown as
// a card: the choices in a random order; picking one scores its points and shows what you did, what happened and a
// score line. The card's button goes on only after a pick (#card.choose). spec: { row, kind, kicker, extra (HTML
// after the body), ok (the button), pick(choice, i, points) → more of the score line (' · …'), done(now) }.
let choiceNow = null;          // { spec, row, order, picked }
function showChoices(spec) {
  const r = spec.row;
  choiceNow = { spec, row: r, order: shuffle((r.choices || []).map((_, i) => i)), picked: null };
  showCard({ kicker: spec.kicker, title: shown(r.title, r.title_ko),
    body: `<p>${esc(shown(r.body, r.body_ko))}</p>${spec.extra || ''}<p class="fine">${tr('What do you do?', '어떻게 할까요?')}</p><div class="choices">${choiceNow.order.map(i => `<button type="button" data-choice="${i}">${esc(shown(r.choices[i].t, r.choices[i].t_ko))}</button>`).join('')}</div>`,
    ok: spec.ok, state: 'card', choose: true }, () => { const now = choiceNow; choiceNow = null; if (spec.done) spec.done(now); });
}
function pickChoice(i) {
  const now = choiceNow;
  if (!now || now.picked != null || !(now.row.choices || [])[i]) return false;
  const c = now.row.choices[i], n = Math.round(+c.points || 0);
  now.picked = i;
  addScore(n, now.row.title, now.row.title_ko);
  const more = now.spec.pick ? now.spec.pick(c, i, n) || '' : '';
  const card = $('card');
  card.querySelector('.card-body').innerHTML = `<p class="quote">${esc(shown(c.t, c.t_ko))}</p><p>${esc(shown(c.r, c.r_ko))}</p>
    <p class="score-line">${pointsText(n)}${more}</p>`;
  card.classList.remove('choose');
  setTimeout(() => card.querySelector('.ok').focus(), 50);
  return true;
}
$('card').addEventListener('click', (e) => { const b = e.target.closest('button[data-choice]'); if (b) pickChoice(+b.dataset.choice); });
const bestChoice = (row) => (row.choices || []).reduce((b, c, i, a) => (+c.points || 0) > (+a[b].points || 0) ? i : b, 0);
const pointsText = (n) => n ? `${n > 0 ? '+' : '−'}${Math.abs(n)} ${tr('points', '점')}` : tr('No points', '점수 없음');
const choiceOf = (kind) => choiceNow && choiceNow.spec.kind === kind ? choiceNow : null;

// What comes up next from a pool: those that came up longest ago (never is longest), by a log [{ id, day }].
// → { fresh (those rows), oldest (the day they last came up, 0 for never) }; pickFresh picks one of them.
function leastSeen(pool, log) {
  const seen = {};
  (log || []).forEach(x => { seen[x.id] = x.day; });
  const oldest = Math.min(...pool.map(r => seen[r.id] || 0));
  return { oldest, fresh: pool.filter(r => (seen[r.id] || 0) === oldest) };
}
const pickFresh = (pool, log) => pool.length ? anyOf(leastSeen(pool, log).fresh) : null;

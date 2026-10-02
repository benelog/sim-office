/* Sim Office — the menu and the title screen. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- menu
function toggleMenu(on) {
  const m = $('menu');
  m.hidden = on == null ? !m.hidden : !on;
  $('menu-btn').setAttribute('aria-expanded', String(!m.hidden));
}
$('menu-btn').addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
$('hud-score').addEventListener('click', () => { if (G && state === 'play') openPanel('work'); });
document.addEventListener('click', (e) => { if (!$('menu').hidden && !e.target.closest('#menu')) toggleMenu(false); });
$('menu').addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  const what = b.dataset.open;
  if (what === 'graphics') { settings.gfx = gfxHigh() ? 'low' : 'high'; saveSettings(); applyQuality(); return; }
  toggleMenu(false);
  if (what === 'title') { saveGame(); showTitle(); }
  else if (what === 'reset') { if (confirm(tr(`Delete ${G ? G.name + "'s" : 'your'} saved game and start over?`, `${G ? myName() + '의 ' : ''}저장된 게임을 지우고 처음부터 할까요?`))) { resetGame(); } }
  else openPanel(what);
});
function resetGame() {
  if (G) deleteSave(G.name);
  G = null;
  if (talk) endTalk();
  panel.hidden = true;
  $('card').hidden = true;
  $('card').classList.remove('choose');
  showTitle();
}

// ---------------------------------------------------------------- title: name, character, continue / new game
let state = 'title';
let chosen = heroOf(settings.hero).id;          // the hero picked on the title card
const charBox = $('chars');
HEROES.forEach(h => {
  const b = document.createElement('button');
  b.type = 'button';
  b.setAttribute('role', 'radio');
  b.dataset.hero = h.id;
  b.innerHTML = `<b></b><span></span>`;
  b.querySelector('b').textContent = loc(h);
  b.querySelector('span').textContent = tr(h.role, h.role_ko);
  b.addEventListener('click', () => { chosen = h.id; replaceArmed = false; markChosen(); newGameLabel(); });
  charBox.appendChild(b);
});
function markChosen() {
  const h = heroOf(chosen);
  charBox.querySelectorAll('button').forEach(b => {
    b.setAttribute('aria-checked', String(b.dataset.hero === chosen));
    b.querySelector('b').textContent = loc(heroOf(b.dataset.hero));
    b.querySelector('span').textContent = loc(heroOf(b.dataset.hero), 'role');
    const m = heroOf(b.dataset.hero).model;
    b.classList.toggle('nomodel', !!packs[m] && packs[m].status === 'missing');
  });
  const info = $('hero-info');
  if (info) info.innerHTML = `<p class="who"><b>${esc(tr(h.full_name || h.name, h.full_name_ko))}</b> · ${esc(loc(h, 'role'))}</p><p>${esc(loc(h, 'bio'))}</p>
    <dl><dt>${tr('Home', '집')}</dt><dd>${esc(tr(h.home_name || zoneName(h.home_zone)[0], h.home_name_ko))}</dd>
    <dt>${tr('Story', '이야기')}</dt><dd>${tr(`${missionsOf(h.id)} missions in ${MISSION_DAYS} days (all of them: a bonus), then free play`, `${MISSION_DAYS}일 동안 미션 ${missionsOf(h.id)}개(모두 해내면 보너스), 그다음은 자유 플레이`)}</dd>
    <dt>${tr('Money', '돈')}</dt><dd>${tr(`${usd(+h.start_money)} to start · ${usd(+h.salary_net)} every other Friday · ${esc(String(h.housing_name || 'Rent').toLowerCase())} ${usd(+h.housing)}`, `처음 ${usd(+h.start_money)} · 격주 금요일 ${usd(+h.salary_net)} · ${esc(h.housing_name_ko || '월세')} ${usd(+h.housing)}`)}</dd></dl>`;
  setPreview(h.model);
}
const preview = { renderer: null, scene: null, camera: null, actor: null, model: null };
function setPreview(model) {
  if (!packReady(model)) { if (preview.actor) { preview.scene.remove(preview.actor.holder); preview.actor = null; } preview.model = null; renderPreview(0); return; }
  if (!preview.renderer) {
    try {
      preview.renderer = new T.WebGLRenderer({ canvas: $('preview'), antialias: true, alpha: true });
      preview.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      preview.renderer.toneMapping = renderer.toneMapping;
      const c = $('preview');
      preview.renderer.setSize(c.clientWidth || 150, c.clientHeight || 184, false);
      preview.scene = new T.Scene();
      preview.scene.add(new T.HemisphereLight(0xffffff, 0x807060, 1.4));
      const l = new T.DirectionalLight(0xffffff, 2);
      l.position.set(2, 3, 4);
      preview.scene.add(l);
      preview.camera = new T.PerspectiveCamera(30, (c.clientWidth || 150) / (c.clientHeight || 184), 0.05, 20);
      preview.camera.position.set(0, 0.62, 2.3);          // a whole person, HEAD_Y tall
      preview.camera.lookAt(0, HEAD_Y * 0.5, 0);
    } catch (e) { preview.renderer = null; return; }
  }
  if (preview.model === model) return;
  if (preview.actor) preview.scene.remove(preview.actor.holder);
  preview.actor = makeActor('preview', model);
  preview.model = model;
  preview.scene.add(preview.actor.holder);
}
function renderPreview(dt) {
  if (!preview.renderer) return;
  if (preview.actor) {
    preview.t = (preview.t || 0) + dt;
    preview.actor.heading = Math.sin(preview.t * 0.7) * 1.1;
    preview.actor.holder.rotation.y = preview.actor.heading;
    if (preview.actor.mixer) preview.actor.mixer.update(dt);
  }
  preview.renderer.render(preview.scene, preview.camera);
}
function showTitle() {
  state = 'title';
  $('title').hidden = false;
  $('side').hidden = true;
  $('acts').innerHTML = '';
  actSig = '';
  renderSaves();
  markChosen();
}
// the saved games, one per name: continue any of them, or delete one (two clicks)
function renderSaves() {
  const box = $('saves'), games = savedGames(), last = store.get(LAST_KEY);
  box.innerHTML = '';
  box.hidden = !games.length;
  games.forEach(g => {
    const row = document.createElement('div');
    row.className = 'save' + (g.name === last ? ' last' : '');
    const go = document.createElement('button');
    go.type = 'button';
    go.className = 'go';
    go.innerHTML = `<b></b><span></span>`;
    go.querySelector('b').textContent = KO() && heroOf(g.hero).name === g.name ? loc(heroOf(g.hero)) : g.name;
    go.querySelector('span').textContent = tr(`${heroOf(g.hero).role} · ${weekday(g.day).slice(0, 3)} Day ${g.day}, ${clock(g.minute)} · ${usd(g.money)}`, `${loc(heroOf(g.hero), 'role')} · ${g.day}일째 (${WEEKDAYS_KO[(g.day - 1) % 7][0]}) ${clockKo(g.minute)} · ${usd(g.money)}`) + (g.score != null ? ` · ★ ${Math.round(g.score)}` : '') + (g.work && g.work.fired ? tr(' · let go', ' · 해고됨') : '');
    go.addEventListener('click', () => continueGame(g.name));
    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'del';
    del.textContent = '✕';
    del.setAttribute('aria-label', tr(`Delete ${g.name}'s game`, `${g.name}의 게임 지우기`));
    del.title = tr('Delete this saved game', '저장된 게임 지우기');
    let armed = 0;
    del.addEventListener('click', () => {
      if (!armed) { armed = setTimeout(() => { armed = 0; del.textContent = '✕'; del.classList.remove('armed'); }, 4000); del.textContent = tr('Delete?', '지울까요?'); del.classList.add('armed'); return; }
      clearTimeout(armed);
      deleteSave(g.name);
      renderSaves();
      newGameLabel();
    });
    row.append(go, del);
    box.appendChild(row);
  });
  newGameLabel();
}
let replaceArmed = false;
function newGameLabel() {         // 'New game', or a warning when the name is taken by a saved game
  const name = heroOf(chosen).name, taken = !!allSaves()[name];
  const btn = $('new-game'), note = $('new-note');
  if (btn.disabled) return;
  const ko = loc(heroOf(chosen)), last = ko.charCodeAt(ko.length - 1), batchim = last >= 0xac00 && last <= 0xd7a3 && (last - 0xac00) % 28 && (last - 0xac00) % 28 !== 8;
  btn.textContent = tr(`New game as ${name}`, `${ko}${batchim ? '으로' : '로'} 새 게임`);
  note.hidden = !(taken && replaceArmed);
  if (taken && replaceArmed) note.textContent = tr(`${name} already has a saved game (continue it from the list above). Click again to start over and replace it.`, `${loc(heroOf(chosen))}의 저장된 게임이 있어요(위 목록에서 이어 하세요). 한 번 더 누르면 처음부터 다시 시작하고 덮어씁니다.`);
}
function continueGame(name) {
  const s = allSaves()[name];
  if (!s) return;
  // a save from before there were heroes is Jun's game, under the name and the look it was played with
  const g = Object.assign(newGame(s.hero), s, { hero: heroOf(s.hero).id });
  if (!/^(man|woman)-/.test(g.model || '')) g.model = heroOf(g.hero).model;
  startGame(g, false);
}
async function startGame(g, fresh) {
  G = g;
  settings.hero = G.hero;
  saveSettings();
  $('title').hidden = true;
  state = 'play';
  busy = true;
  if (G.at && !fresh) await enterZone(G.zone || hero().home_zone, null, G.at, G.heading);
  else await enterZone(hero().home_zone, hero().home_bed);
  $('side').hidden = false;
  goalTimer = 0;
  hud();
  phoneBadge();
  if (fresh) {
    if (G.hero === DEFAULT_HERO) toast(`${dateLong(G.day)}. Welcome to ${CFG.city}, ${G.name}!`, `${dateKo(G.day)}. ${CFG.city}에 온 걸 환영해요!`, 'good', 4);
    else toast(`${dateLong(G.day)}. Good morning, ${G.name}!`, `${dateKo(G.day)}. 좋은 아침이에요, ${hero().name_ko || G.name}!`, 'good', 4);
    const wx = weatherOf(G.day);
    if (wx.forecast) setTimeout(() => toast(`${WX_ICON[wx.kind] || ''} ${wx.high_f}°F today. ${wx.forecast}`, `${WX_ICON[wx.kind] || ''} 오늘 최고 ${toC(wx.high_f)}°C. ${wx.forecast_ko || ''}`, null, 5), 4200);
    setTimeout(() => toast(`Work starts at ${clock(hm(CFG.work_start, 540))}. Don't be late: being late or missing work too often gets you fired.`, `업무는 ${clockKo(hm(CFG.work_start, 540))}에 시작해요. 지각이나 결근이 잦으면 해고될 수 있어요.`, null, 6), 9000);
    logEvent('start', 'New game', 0);
    saveGame();
  }
}
if ($('jog-game')) $('jog-game').addEventListener('click', () => startJog(false));
if ($('tour-game')) $('tour-game').addEventListener('click', () => startTour());
if ($('tour')) $('tour').addEventListener('click', (e) => { const b = e.target.closest('button[data-tour]'); if (b) { tourDo(b.dataset.tour); b.blur(); } });
$('new-game').addEventListener('click', () => {
  const g = newGame(chosen);
  if (allSaves()[g.name] && !replaceArmed) { replaceArmed = true; newGameLabel(); return; }
  replaceArmed = false;
  startGame(g, true);
});
window.addEventListener('pagehide', saveGame);
document.addEventListener('visibilitychange', () => { if (document.hidden) saveGame(); });

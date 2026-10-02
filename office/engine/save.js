/* Sim Office — settings and the saved games (localStorage). One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
// ---------------------------------------------------------------- storage: settings and the saves
// One saved game per character name: localStorage so.v1.saves = { [name]: game }, so.v1.last = the name played
// last. A save from before (so.v1.save, one game) is moved into the list at start.
const SAVE_KEY = 'so.v1.save', SAVES_KEY = 'so.v1.saves', LAST_KEY = 'so.v1.last', SET_KEY = 'so.v1.settings';
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } },
  del(k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }
};
const settings = Object.assign({ voice: true }, store.get(SET_KEY) || {});
if (settings.lang !== 'en' && settings.lang !== 'ko') settings.lang = settings.ko || /^ko\b/i.test(navigator.language || '') ? 'ko' : 'en';     // 'Korean help' on before: Korean
delete settings.ko; delete settings.mode;
const saveSettings = () => store.set(SET_KEY, settings);
function allSaves() { const s = store.get(SAVES_KEY); return s && typeof s === 'object' && !Array.isArray(s) ? s : {}; }
function savedGames() {          // newest first
  const s = allSaves();
  return Object.keys(s).filter(n => s[n] && typeof s[n] === 'object').map(n => s[n]).sort((a, b) => (b.saved || 0) - (a.saved || 0));
}
function lastSave() { const s = allSaves(), last = store.get(LAST_KEY); return (last && s[last]) || savedGames()[0] || null; }
function deleteSave(name) { const s = allSaves(); delete s[name]; store.set(SAVES_KEY, s); if (store.get(LAST_KEY) === name) store.del(LAST_KEY); }
(function migrateSave() {
  const old = store.get(SAVE_KEY);
  if (!old || typeof old !== 'object' || !old.name) return;
  const s = allSaves();
  if (!s[old.name] || (old.saved || 0) >= (s[old.name].saved || 0)) { s[old.name] = old; store.set(SAVES_KEY, s); store.set(LAST_KEY, old.name); }
  store.del(SAVE_KEY);
})();
let G = null;           // the game in progress (what goes into so.v1.saves under its name)
function newGame(heroId) {
  const h = heroOf(heroId);
  return {
    hero: h.id, name: h.name, model: h.model,
    day: 1, minute: DAY_START, money: +h.start_money, energy: E_MAX, zone: h.home_zone, at: null, heading: 0,
    done: {}, inventory: {}, phrases: [], log: []
  };
}
function saveGame() {
  if (!G) return;
  if (player && zoneId) { G.zone = zoneId; G.at = [+player.pos.x.toFixed(2), +player.pos.z.toFixed(2)]; G.heading = +player.heading.toFixed(3); }
  G.log = G.log.slice(-400);
  G.saved = Date.now();
  const s = allSaves();
  s[G.name] = G;
  store.set(SAVES_KEY, s);
  store.set(LAST_KEY, G.name);
}
function logEvent(type, text, amount, extra) { G.log.push(Object.assign({ day: G.day, minute: Math.floor(G.minute), type, text, amount: amount || 0 }, extra || {})); }
// a line of the log in the language of the screen: its own ko, or the Korean name of what it names
const LOG_KO = { 'Paycheck (direct deposit)': '급여 (계좌 입금)', 'Overdraft fee': '초과 인출 수수료', 'Bus fare': '버스 요금', Rent: '월세', Mortgage: '주택 담보 대출 상환' };
rows('items').concat(rows('bills')).forEach(r => { if (r.name && r.name_ko) LOG_KO[r.name] = r.name_ko; });
const logText = (l) => KO() ? (l.ko || (l.id && EPISODES[l.id] && EPISODES[l.id].title_ko) || LOG_KO[l.text] || l.text) : l.text;

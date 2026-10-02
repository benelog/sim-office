/* Sim Office: the engine. A flat open world made of zones (office/zones/<zone>.js, window.SO_ZONES), people and
   conversations from the game database (office/data/db.js, window.SO_DB, pulled from DoltHub), and models (Kenney
   props, Quaternius people) packed as base64 .glb (office/models/<pack>.js, window.SO_MODELS). See office/PLAN.md for the rules and the specs.
   Runs from file:// : every file is a plain <script>, nothing is fetched. Missing zone files or model packs fall back
   to generated rooms and boxes, so the engine runs on its own. */
(function () {
  'use strict';
  const T = window.THREE;
  const DB = window.SO_DB || {};
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rows = (t) => Array.isArray(DB[t]) ? DB[t] : [];
  const pretty = (id) => String(id || '').replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const hm = (s, dflt) => { const m = /^(\d{1,2}):(\d{2})/.exec(String(s || '')); return m ? +m[1] * 60 + +m[2] : dflt; };
  const hhmm = (min) => { min = Math.floor(min); return String(Math.floor(min / 60) % 24).padStart(2, '0') + ':' + String(min % 60).padStart(2, '0'); };
  const clock = (min) => { min = Math.floor(min); const h = Math.floor(min / 60) % 24, m = min % 60; return `${(h + 11) % 12 + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`; };
  const usd = (n) => (n < 0 ? '−' : '') + '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: Math.abs(n) % 1 ? 2 : 0, maximumFractionDigits: 2 });
  const usd2 = (n) => (n < 0 ? '−' : '') + '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const WEEKDAYS_KO = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
  const weekday = (d) => WEEKDAYS[(d - 1) % 7];
  const hash = (s) => { let h = 7; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
  const listOf = (v) => v == null ? [] : Array.isArray(v) ? v : String(v).split(/[,\s]+/).filter(Boolean);
  // The language of the screen (settings.lang 'en' | 'ko', Menu or the title screen): one at a time. tr(en, ko) picks
  // the text; a row's field in Korean is <field>_ko (falls back to English when there is none). The people still speak
  // English (the voices), the screen shows what they say in the language picked, like subtitles.
  const KO = () => settings.lang === 'ko';
  const tr = (en, ko) => (KO() && ko != null && ko !== '') ? ko : en;
  const loc = (row, k) => row ? tr(row[k || 'name'], row[(k || 'name') + '_ko']) : '';
  const clockKo = (min) => { min = Math.floor(min); const h = Math.floor(min / 60) % 24; return `${h < 12 ? '오전' : '오후'} ${(h + 11) % 12 + 1}:${String(min % 60).padStart(2, '0')}`; };
  const clk = (min) => KO() ? clockKo(min) : clock(min);
  // people's names: the screen in Korean uses npcs.name_ko / heroes.name_ko (마야 첸); the voices keep the English
  const fullName = (n) => !n ? '' : KO() && n.name_ko ? n.name_ko : n.name;
  const firstName = (n) => String(fullName(n) || '').split(' ')[0];
  const josa = (w, a, b) => { const c = String(w || '').charCodeAt(String(w || '').length - 1); return w + ((c >= 0xac00 && c <= 0xd7a3 && (c - 0xac00) % 28) ? a : b); };     // 을/를, 은/는, 이/가

  // ---------------------------------------------------------------- the rules (config table, with defaults)
  const CFG = Object.assign({
    player_name: 'Jun', company: 'Seaside Labs', city: 'Fairview', start_money: 1200, salary_net: 2600, salary_gross: 3654,
    payday_days: '5,19', payday_every: 14, rent: 1450, rent_day: 21, rent_day_of_month: 1, bus_fare: 2.5, day_start: '07:00', day_end: '23:00', work_start: '09:00', work_end: '18:00',
    minutes_per_second: 1, energy_max: 100, energy_per_hour: -6,
    sales_tax: 0.0825, tip_options: '0,15,18,20', tip_default: 18,
    start_date: '', bus_every: 0, bus_every_weekend: 0, bus_first: '06:00', bus_last: '22:30', overdraft_fee: 0, low_balance: 0,
    punch_card_place: '', punch_card_every: 0, late_after: '09:15', rain_energy_per_hour: -10, bank_name: 'Fairview Credit Union',
    late_points: 2, noon_points: 3, absent_points: 4, warn_points: 2, final_points: 4, fire_points: 6, early_before: '16:00', early_points: 2,
    company_holidays: '',
    mission_days: 15, mission_bonus: 1000, mission_points: 200
  }, DB.config || {});
  const DAY_START = hm(CFG.day_start, 420), DAY_END = hm(CFG.day_end, 1380);
  const E_MAX = +CFG.energy_max || 100;
  const PAYDAYS = listOf(CFG.payday_days).map(Number);
  const RENT_DAY = +CFG.rent_day || 21;
  const WALK = 1.25, RUN = 2.9, TURN = 2.5, PLAYER_R = 0.2, NPC_R = 0.24, TALK_R = 1.45, PLACE_R = 1.35;
  const PACK_SCALE = { city: 3, roads: 3, cars: 0.5, furniture: 1, food: 0.6, extras: 1, nature: 0.4, park: 2, homeware: 0.4, buildings: 1, wild: 1 };
  // The people you can play (heroes table): each has a name, a role, a look, a home (a zone with a bed, a kitchen,
  // a desk and its door in the city), a desk at the office, money of their own, and their own episodes and
  // calendar (episodes.hero, calendar.hero). The other heroes are in your game as people; you are not.
  const HEROES = (rows('heroes').length ? rows('heroes').slice() : [{
    id: 'jun', name: CFG.player_name || 'Jun', full_name: CFG.player_name || 'Jun', role: 'Software developer', model: 'man-casual-3',
    home_zone: 'home', home_bed: 'home_bed', home_kitchen: 'home_kitchen', home_desk: 'home_desk', home_door: 'apartment_door', desk: 'office_desk',
    start_money: +CFG.start_money, salary_net: +CFG.salary_net, salary_gross: +CFG.salary_gross, housing: +CFG.rent, housing_name: 'Rent'
  }]).sort((a, b) => (a.sort || 0) - (b.sort || 0));
  const DEFAULT_HERO = (HEROES.find(h => h.id === 'jun') || HEROES[0]).id;
  const heroOf = (id) => HEROES.find(h => h.id === id) || HEROES.find(h => h.id === DEFAULT_HERO);
  const hero = () => heroOf(G ? G.hero : DEFAULT_HERO);
  const CHARACTERS = Array.from(new Set(HEROES.map(h => h.model))), DEFAULT_CHARACTER = heroOf(DEFAULT_HERO).model;
  const forHero = (h, id) => { const s = String(h || DEFAULT_HERO); return s === 'all' || listOf(s).includes(id); };     // a hero id, a list ('jun,derek') or all
  const mine = (r) => forHero(r.hero, G ? G.hero : DEFAULT_HERO);          // a row of the hero you play
  const episodes = () => onCall(rows('episodes').filter(mine)), calendar = () => rows('calendar').filter(mine).concat(routineCal());
  const cast = () => rows('npcs').filter(n => !G || n.id !== G.hero);
  const portalsOf = (spec) => (spec.portals || []).filter(p => !p.hero || (!!G && p.hero === G.hero));     // a home's door is its owner's
  // a person (Quaternius, tools/office-characters.py) is about 0.95 tall with the feet at y=0
  const HEAD_Y = 0.95, BUBBLE_Y = 1.1, MARK_Y = 1.12;
  const INK = 0x1d2433;

  // Where things are when the zone files or the places table do not say (PLAN.md §3).
  const BUILTIN_PLACES = {
    home: ['home_bed', 'home_desk', 'home_kitchen', 'home_door'],
    city: ['apartment_door', 'bus_stop', 'coffee_cart', 'park_bench', 'office_door', 'diner_door', 'market_door', 'parking', 'airport_shuttle'],
    office: ['office_lobby', 'office_desk', 'office_desk_team', 'office_kitchen', 'office_meeting', 'office_manager', 'office_hr', 'office_it', 'office_door'],
    diner: ['diner_counter', 'diner_table', 'diner_door'],
    market: ['market_shelves', 'market_checkout', 'market_door'],
    airport: ['airport_checkin', 'airport_security', 'airport_gate', 'airport_door', 'airport_arrive'],
    hotel: ['hotel_desk', 'hotel_room', 'hotel_restaurant', 'hotel_door', 'hotel_shuttle'],
    client: ['client_lobby', 'client_meeting', 'client_door']
  };
  const BUILTIN_KIND = { home_bed: 'sleep', hotel_room: 'sleep', home_kitchen: 'eat', bus_stop: 'transit', office_desk: 'work' };
  const DOORS = {        // zone:place → [zone, arrive] (only for generated zones; zone files have their own portals)
    'home:home_door': ['city', 'apartment_door'], 'city:apartment_door': ['home', 'home_door'],
    'city:office_door': ['office', 'office_door'], 'office:office_door': ['city', 'office_door'],
    'city:diner_door': ['diner', 'diner_door'], 'diner:diner_door': ['city', 'diner_door'],
    'city:market_door': ['market', 'market_door'], 'market:market_door': ['city', 'market_door'],
    'city:airport_shuttle': ['airport', 'airport_door'], 'airport:airport_door': ['city', 'airport_shuttle'],
    'airport:airport_arrive': ['hotel', 'hotel_shuttle'], 'hotel:hotel_shuttle': ['airport', 'airport_arrive'],
    'hotel:hotel_door': ['client', 'client_door'], 'client:client_door': ['hotel', 'hotel_door']
  };
  const ZONE_NAMES = {
    home: ['Your apartment', '내 아파트'], city: ['Downtown Fairview', '페어뷰 시내'], office: ['Seaside Labs', '시사이드 랩스'],
    diner: ['Maple Street Diner', '메이플 스트리트 다이너'], market: ['Fairview Market', '페어뷰 마켓'], airport: ['Fairview Airport', '페어뷰 공항'],
    hotel: ['Harbor View Hotel', '하버 뷰 호텔'], client: ['Summit Retail HQ', '서밋 리테일 본사']
  };
  const TRAVEL_ZONES = ['airport', 'hotel', 'client'];

  // ---------------------------------------------------------------- data access
  const byId = (t) => { const m = {}; rows(t).forEach(r => { m[r.id] = r; }); return m; };
  const PLACES = byId('places'), NPCS = byId('npcs'), ITEMS = byId('items'), EPISODES = byId('episodes'), PHRASES = byId('phrases');
  const TURNS = {};
  rows('turns').forEach(t => { (TURNS[t.episode] = TURNS[t.episode] || []).push(t); });
  Object.values(TURNS).forEach(l => l.sort((a, b) => a.seq - b.seq));
  const SPEAKERS = {};            // episode → the people with a line in it besides the one you talk to
  Object.keys(TURNS).forEach(id => {
    const who = new Set();
    TURNS[id].forEach(t => [t.speaker, t.reply_speaker].forEach(x => { if (x && x !== 'player' && x !== 'you') who.add(x); }));
    SPEAKERS[id] = Array.from(who);
  });
  const CHATTER = {};
  rows('chatter').slice().sort((a, b) => a.seq - b.seq).forEach(c => { (CHATTER[c.npc] = CHATTER[c.npc] || []).push(c); });
  const SCHEDULE = {}, SMALLTALK = {};
  rows('schedule').slice().sort((a, b) => a.seq - b.seq).forEach(s => { (SCHEDULE[s.npc] = SCHEDULE[s.npc] || []).push(s); });
  rows('smalltalk').slice().sort((a, b) => a.seq - b.seq).forEach(c => { (SMALLTALK[c.topic] = SMALLTALK[c.topic] || []).push(c); });
  const WEATHER = rows('weather').slice().sort((a, b) => a.day - b.day);
  const isWeekend = (d) => (d - 1) % 7 >= 5;
  // Real dates: game day 1 is config start_date (a Monday), written the American way (Mon, Oct 5).
  // Holidays (holidays table) go by the date; on a federal one banks are closed and buses keep the weekend timetable.
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const START = (() => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(CFG.start_date || '')); return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : null; })();
  const dateOf = (d) => START == null ? null : new Date(START + (d - 1) * 864e5);
  const dateShort = (d) => { const t = dateOf(d); return t ? `${weekday(d).slice(0, 3)}, ${MONTHS[t.getUTCMonth()].slice(0, 3)} ${t.getUTCDate()}` : `${weekday(d).slice(0, 3)} · Day ${d}`; };
  const dateLong = (d) => { const t = dateOf(d); return t ? `${weekday(d)}, ${MONTHS[t.getUTCMonth()]} ${t.getUTCDate()}` : `${weekday(d)}, Day ${d}`; };
  const dateKo = (d) => { const t = dateOf(d); return (t ? `${t.getUTCMonth() + 1}월 ${t.getUTCDate()}일 ` : `${d}일째 `) + WEEKDAYS_KO[(d - 1) % 7]; };
  const dateKoShort = (d) => { const t = dateOf(d); return (t ? `${t.getUTCMonth() + 1}월 ${t.getUTCDate()}일` : `${d}일째`) + ` (${WEEKDAYS_KO[(d - 1) % 7][0]})`; };
  const dShort = (d) => KO() ? dateKoShort(d) : dateShort(d), dLong = (d) => KO() ? dateKo(d) : dateLong(d);
  const dMonth = (d) => KO() ? dateKoShort(d).replace(/ \(.\)$/, '') : dateShort(d).replace(/^\w+, /, '');      // Oct 5 / 10월 5일
  const HOLIDAYS = {};
  rows('holidays').forEach(h => { HOLIDAYS[h.date] = h; });
  const holidayOf = (d) => { const t = dateOf(d); return (t && HOLIDAYS[t.toISOString().slice(0, 10)]) || null; };
  const dayOff = (d) => { const h = holidayOf(d); return !!h && h.kind === 'federal'; };
  const isoOf = (d) => { const t = dateOf(d); return t ? t.toISOString().slice(0, 10) : null; };
  // The company's own days off (config company_holidays: dates), like Thanksgiving and the day after: nobody is
  // expected at the office. offWork: a weekend or one of those. The bank is closed on weekends and federal holidays.
  const COMPANY_OFF = new Set(listOf(CFG.company_holidays));
  const companyOff = (d) => COMPANY_OFF.has(isoOf(d));
  const offWork = (d) => isWeekend(d) || companyOff(d);
  const bankClosed = (d) => isWeekend(d) || dayOff(d);
  // Payday every other Friday: config payday_days, and then every payday_every days. When the bank is closed on a
  // payday (a federal holiday), the money comes the business day before.
  const PAY_EVERY = +CFG.payday_every || 0, PAY_LAST = Math.max(0, ...PAYDAYS);
  const payDue = (d) => PAYDAYS.includes(d) || (PAY_EVERY > 0 && PAY_LAST > 0 && d > PAY_LAST && (d - PAY_LAST) % PAY_EVERY === 0);
  function isPayday(d) {
    if (bankClosed(d)) return false;
    for (let n = d; n < d + 7; n++) { if (payDue(n)) return true; if (!bankClosed(n + 1)) return false; }
    return false;
  }
  // Rent (or the mortgage) is due on the 1st of every month (config rent_day_of_month); a monthly bill (every 28 days
  // or more) comes on the same date every month as on its first day. Without a start date: every 30 days.
  const RENT_DOM = +CFG.rent_day_of_month || 1;
  function onDateOfMonth(d, dom) {
    const t = dateOf(d);
    if (!t) return false;
    const last = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 0)).getUTCDate();
    return t.getUTCDate() === Math.min(dom, last);
  }
  const MESSAGES = rows('messages').slice().sort((a, b) => (a.day - b.day) || (hm(a.time, 0) - hm(b.time, 0)));
  const REPLIES = rows('replies').slice().sort((a, b) => (a.sort || 0) - (b.sort || 0));
  const MAIL = rows('mail').slice().sort((a, b) => a.day - b.day);
  const builtinZoneOf = (id) => Object.keys(BUILTIN_PLACES).find(z => BUILTIN_PLACES[z].includes(id)) || null;
  function place(id) {
    const owner = HEROES.find(h => h.desk === id);
    if (owner && PLACES[id]) {
      const me = owner.id === (G ? G.hero : DEFAULT_HERO);
      return Object.assign({}, PLACES[id], me ? { name: 'Your desk', name_ko: '내 자리' } : { name: `${owner.name}'s desk`, name_ko: `${owner.name_ko || owner.name}의 자리` });
    }
    if (PLACES[id]) return PLACES[id];
    return { id, name: pretty(id), zone: builtinZoneOf(id) || fileZoneOf(id), kind: BUILTIN_KIND[id] || null };
  }
  function fileZoneOf(id) { const zs = window.SO_ZONES || {}; return Object.keys(zs).find(z => zs[z] && zs[z].places && zs[z].places[id]) || null; }
  const placeKind = (id) => (PLACES[id] && PLACES[id].kind) || BUILTIN_KIND[id] || null;
  const zoneOfPlace = (id) => place(id).zone;
  function npcRow(id) {
    if (NPCS[id]) return NPCS[id];
    const ep = episodes().find(e => e.npc === id);
    return { id, name: pretty(id), model: CHARACTERS[hash(id) % CHARACTERS.length], place: ep ? ep.place : null, voice_pitch: 1, voice_rate: 0.95 };
  }
  const zoneName = (z) => { const s = zoneSpecs[z] || (window.SO_ZONES || {})[z]; return [(s && s.name) || (ZONE_NAMES[z] || [pretty(z)])[0], (s && s.name_ko) || (ZONE_NAMES[z] || [])[1] || '']; };

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

  // ---------------------------------------------------------------- page chrome
  const langBox = $('lang'), voiceBox = $('voice-on');
  langBox.value = settings.lang;
  voiceBox.checked = settings.voice !== false;
  // the page itself: an element with data-ko has its Korean (HTML) there and keeps its English in data-en
  function staticLang() {
    document.documentElement.lang = settings.lang;
    document.body.classList.toggle('lang-ko', KO());
    document.querySelectorAll('[data-ko]').forEach(el => {
      if (el.dataset.en == null) el.dataset.en = el.innerHTML;
      el.innerHTML = KO() ? el.dataset.ko : el.dataset.en;
    });
    document.querySelectorAll('[data-ko-label]').forEach(el => {
      if (el.dataset.enLabel == null) el.dataset.enLabel = el.getAttribute('aria-label') || el.title || '';
      const v = KO() ? el.dataset.koLabel : el.dataset.enLabel;
      if (el.hasAttribute('aria-label')) el.setAttribute('aria-label', v);
      if (el.title) el.title = v;
    });
  }
  function applyLang() {          // everything on screen again, in the language picked
    staticLang();
    applyQuality();
    tags.forEach(t => { if (t.en != null) t.el.textContent = tr(t.en, t.ko); });
    if (G) { hud(); phoneBadge(); goalTimer = 0; actSig = ''; }
    if (!panel.hidden && panelKind) renderPanel();
    if (talk && !dlg.hidden) relangTurn();
    if (state === 'title') { markChosen(); renderSaves(); }
    if (state === 'tour') tourLabels();
  }
  langBox.addEventListener('change', () => { settings.lang = langBox.value === 'ko' ? 'ko' : 'en'; saveSettings(); applyLang(); });
  voiceBox.addEventListener('change', () => { settings.voice = voiceBox.checked; saveSettings(); if (!voiceBox.checked && window.speechSynthesis) speechSynthesis.cancel(); });
  staticLang();
  const narrow = window.matchMedia ? matchMedia('(max-width: 640px)') : null;
  function placeSwitches() {
    const opts = Array.from(document.querySelectorAll('#bar label.opt'));
    const inMenu = narrow && narrow.matches;
    opts.forEach(o => { if (inMenu) $('menu').insertBefore(o, $('menu').querySelector('button')); else $('bar').insertBefore(o, $('menu-btn')); });
  }
  if (narrow) { placeSwitches(); if (narrow.addEventListener) narrow.addEventListener('change', placeSwitches); }
  function toast(en, ko, kind, secs) {
    const d = document.createElement('div');
    d.className = 'toast' + (kind ? ' ' + kind : '');
    d.textContent = tr(en, ko);
    $('toasts').appendChild(d);
    while ($('toasts').children.length > 3) $('toasts').firstChild.remove();
    setTimeout(() => { d.classList.add('out'); setTimeout(() => d.remove(), 500); }, (secs || 3.2) * 1000);
  }
  const loadScript = (src) => new Promise((ok, fail) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = false;
    s.onload = ok;
    s.onerror = () => { s.remove(); fail(new Error('missing ' + src)); };
    document.head.appendChild(s);
  });

  // ---------------------------------------------------------------- renderer, scene, light
  // Graphics quality: High = one soft shadow map, street lamps and ceiling lights, a vignette; Low = no shadows,
  // two point lights at most, pixel ratio 1. Phones and tablets start on Low (settings.gfx remembers a choice).
  const coarse = !!(window.matchMedia && matchMedia('(pointer: coarse)').matches);
  const gfxHigh = () => (settings.gfx || (coarse ? 'low' : 'high')) === 'high';
  const canvas = $('view');
  const renderer = new T.WebGLRenderer({ canvas, antialias: true });
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.type = T.PCFShadowMap;           // r186: PCFSoftShadowMap is gone; PCF with a radius is soft
  const scene = new T.Scene();
  scene.background = new T.Color('#9fd0f5');
  const camera = new T.PerspectiveCamera(50, 1, 0.05, 400);
  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setPixelRatio(gfxHigh() ? Math.min(window.devicePixelRatio || 1, 2) : 1);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w < h ? 64 : 50;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();
  const hemi = new T.HemisphereLight(0xe6efff, 0x6b6258, 1.1);
  const sun = new T.DirectionalLight(0xfff2dd, 2.0);        // the sun or the moon outdoors, the window light indoors
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 0.05;
  sun.shadow.radius = 1.5;
  sun.shadow.intensity = 0.8;
  scene.add(hemi, sun, sun.target);
  function applyQuality() {
    const high = gfxHigh();
    renderer.shadowMap.enabled = high;
    sun.castShadow = high;
    const size = coarse ? 1024 : 2048;
    if (sun.shadow.mapSize.x !== size) { sun.shadow.mapSize.set(size, size); if (sun.shadow.map) { sun.shadow.map.dispose(); sun.shadow.map = null; } }
    document.body.classList.toggle('gfx-low', !high);
    const b = $('gfx-btn');
    if (b) b.textContent = tr('Graphics: ' + (high ? 'High' : 'Low'), '그래픽: ' + (high ? '높음' : '낮음'));
    resize();
    shadowMat.opacity = high ? 0.6 : 1;
    if (zoneGroup) { setupLights(); lampTimer = 0; applyEnvironment(); if (life) startLife(); }
    scene.traverse(o => { if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => { m.needsUpdate = true; }); });
  }
  // what casts and what takes shadows: people, furniture, buildings, cars and trees cast; floors, tiles and food only take
  function shadows(root, cast) {
    root.traverse(o => {
      if (!o.isMesh || o.userData.ink) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      o.castShadow = !!cast && !mats.some(m => m && m.transparent && m.opacity < 0.9);
      o.receiveShadow = true;
    });
    return root;
  }

  // ---------------------------------------------------------------- toon look: stepped light on the Kenney colours; ink outline on people only
  // LOOK (for tuning; localStorage 'so.look'): 'toon5' (default), 'toon3', 'lambert' or 'standard'.
  const LOOK = (() => { try { return localStorage.getItem('so.look') || 'toon5'; } catch (e) { return 'toon5'; } })();
  function steps(levels) {
    const t = new T.DataTexture(new Uint8Array(levels), levels.length, 1, T.RedFormat);
    t.minFilter = t.magFilter = T.NearestFilter;
    t.needsUpdate = true;
    return t;
  }
  const gradient = LOOK === 'toon3' ? steps([110, 185, 255]) : steps([96, 138, 180, 220, 255]);
  function litMaterial(params) {
    let m;
    if (LOOK === 'lambert') m = new T.MeshLambertMaterial(params);
    else if (LOOK === 'standard') m = new T.MeshStandardMaterial(Object.assign({ roughness: 1, metalness: 0 }, params));
    else m = new T.MeshToonMaterial(Object.assign({ gradientMap: gradient }, params));
    m.userData.lit = true;
    return m;
  }
  const colorMats = {};
  const toon = (color) => colorMats[color] || (colorMats[color] = litMaterial({ color: new T.Color(color) }));
  const toonCache = new Map();
  function toonOf(m) {          // keeps the Kenney colormap texture (map), unlike the Little Prince engine
    if (!m || (m.userData && m.userData.lit) || m.isShaderMaterial) return m;
    if (toonCache.has(m)) return toonCache.get(m);
    const t = litMaterial({
      color: m.color ? m.color.clone() : new T.Color(0xffffff), map: m.map || null,
      transparent: !!m.transparent, opacity: m.opacity == null ? 1 : m.opacity, alphaTest: m.alphaTest || 0, side: m.side, vertexColors: !!m.vertexColors
    });
    if (m.flatShading) {          // a mesh without normals (the Quaternius colour packs): the loader asks for flat shading, which
      t.defines = Object.assign({}, t.defines, { FLAT_SHADED: '' });     // the toon material has no switch for; its shader has the define
      t.customProgramCacheKey = () => 'flat';
    }
    if (m.emissive && m.emissive.getHex() && !m.emissiveMap) t.emissive = m.emissive.clone();
    t.name = m.name;
    toonCache.set(m, t);
    return t;
  }
  const inkCache = {};
  function inkMaterial(w) {
    const key = w.toFixed(4);
    if (inkCache[key]) return inkCache[key];
    const m = new T.MeshBasicMaterial({ color: INK, side: T.BackSide });
    m.onBeforeCompile = (sh) => { sh.vertexShader = sh.vertexShader.replace('#include <begin_vertex>', `vec3 transformed = position + normal * ${key};`); };
    m.customProgramCacheKey = () => 'ink' + key;
    return (inkCache[key] = m);
  }
  function outline(root, thin) {        // thin: a factor on the line width (people: 0.5, or their faces get lines)
    const meshes = [];
    root.traverse(o => { if (o.isMesh && !o.userData.ink) meshes.push(o); });
    meshes.forEach(mesh => {
      if (!mesh.geometry.attributes.normal) return;
      if (!mesh.geometry.boundingSphere) mesh.geometry.computeBoundingSphere();
      const w = clamp(mesh.geometry.boundingSphere.radius * 0.022 * (thin || 1), 0.002, 0.03);
      let o;
      if (mesh.isSkinnedMesh) { o = new T.SkinnedMesh(mesh.geometry, inkMaterial(w)); o.bind(mesh.skeleton, mesh.bindMatrix); }
      else o = new T.Mesh(mesh.geometry, inkMaterial(w));
      o.frustumCulled = false;
      o.userData.ink = true;
      mesh.add(o);
    });
  }
  function radialTexture(stops, size) {
    const c = document.createElement('canvas');
    c.width = c.height = size || 64;
    const g = c.getContext('2d'), r = c.width / 2;
    const grd = g.createRadialGradient(r, r, 0, r, r, r);
    stops.forEach(([o, col]) => grd.addColorStop(o, col));
    g.fillStyle = grd;
    g.fillRect(0, 0, c.width, c.width);
    const t = new T.CanvasTexture(c);
    t.colorSpace = T.SRGBColorSpace;
    return t;
  }
  const shadowTex = radialTexture([[0, 'rgba(20,24,40,0.45)'], [0.6, 'rgba(20,24,40,0.2)'], [1, 'rgba(20,24,40,0)']]);
  const shadowGeo = new T.CircleGeometry(1, 20).rotateX(-Math.PI / 2);
  const shadowMat = new T.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false });
  const bangTex = (function () {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    g.fillStyle = '#f2b632'; g.strokeStyle = '#1d2433'; g.lineWidth = 5;
    g.beginPath(); g.arc(32, 32, 27, 0, Math.PI * 2); g.fill(); g.stroke();
    g.fillStyle = '#1d2433'; g.font = 'bold 40px Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText('!', 32, 34);
    const t = new T.CanvasTexture(c);
    t.colorSpace = T.SRGBColorSpace;
    return t;
  })();

  // ---------------------------------------------------------------- model packs (office/models/<pack>.js → SO_MODELS[pack])
  const packs = {};
  const reported = new Set(), pendingMissing = [];
  function b64(s) {
    const bin = atob(s), u = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return u.buffer;
  }
  function loadPack(name) {
    if (!name || name === 'box') return Promise.resolve(null);
    if (packs[name]) return packs[name].promise;
    const p = packs[name] = { status: 'loading', gltf: null, nodes: {} };
    p.promise = (async () => {
      const have = () => (window.SO_MODELS || {})[name];
      if (!have()) { try { await loadScript(`models/${name}.js`); } catch (e) { /* reported below */ } }
      if (!have()) { p.status = 'missing'; pendingMissing.push(name); return null; }
      const g = await new Promise((ok, fail) => new T.GLTFLoader().parse(b64(have()), '', ok, fail));
      g.scene.traverse(o => {
        if (o.isMesh) {
          o.material = Array.isArray(o.material) ? o.material.map(toonOf) : toonOf(o.material);
          if (o.isSkinnedMesh) o.frustumCulled = false;
        }
      });
      g.scene.children.forEach(c => { p.nodes[c.name] = c; });
      g.scene.traverse(o => { if (o.name && !p.nodes[o.name]) p.nodes[o.name] = o; });
      // a person without clips of their own names the pack that has them (glTF extras {"rig": "rig-umc"}): load it too
      g.scene.traverse(o => { if (!p.rig && o.userData && typeof o.userData.rig === 'string' && o.userData.rig !== name) p.rig = o.userData.rig; });
      if (p.rig && !g.animations.length) await loadPack(p.rig);
      // a person's mesh has smooth normals (small files, a clean ink line); it is lit flat, the look of the low-poly pack
      if (p.rig) g.scene.traverse(o => { if (o.isMesh) (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => { m.flatShading = true; m.needsUpdate = true; }); });
      g.scene.traverse(o => {           // a rig tells how fast its walk and run cycles move the feet (units per second)
        const u = o.userData || {};
        if (+u.walk_speed) p.walkSpeed = +u.walk_speed;
        if (+u.run_speed) p.runSpeed = +u.run_speed;
      });
      if (p.rig && packs[p.rig]) { p.walkSpeed = p.walkSpeed || packs[p.rig].walkSpeed; p.runSpeed = p.runSpeed || packs[p.rig].runSpeed; }
      p.gltf = g;
      p.status = 'ok';
      return g;
    })().catch(e => { p.status = 'missing'; console.warn(`Sim Office: could not read model ${name}: ${e.message}`); return null; });
    return p.promise;
  }
  function reportMissing() {       // one warning line for every batch of missing packs (not an error: boxes stand in)
    const list = pendingMissing.splice(0).filter(n => !reported.has(n));
    list.forEach(n => reported.add(n));
    if (list.length) console.warn(`Sim Office: model files not found, using boxes: ${list.map(n => `models/${n}.js`).join(', ')}`);
  }
  function warnOnce(key, msg) { if (reported.has(key)) return; reported.add(key); console.warn('Sim Office: ' + msg); }
  const packReady = (name) => packs[name] && packs[name].status === 'ok';
  const centres = {};
  function centreOf(pack, node, obj) {      // offset that puts a node's footprint centre at 0 and its lowest point on the floor
    const k = pack + ':' + node;
    if (!centres[k]) {
      obj.updateMatrixWorld(true);
      const b = new T.Box3().setFromObject(obj);
      centres[k] = b.isEmpty() ? new T.Vector3() : new T.Vector3(-(b.min.x + b.max.x) / 2, -b.min.y, -(b.min.z + b.max.z) / 2);
    }
    return centres[k];
  }
  // a copy of one named node of a pack, or null (then the caller builds a box)
  function packNode(pack, node) {
    if (!packReady(pack)) return null;
    const src = node ? packs[pack].nodes[node] : packs[pack].gltf.scene;
    if (!src) { warnOnce(pack + ':' + node, `no node "${node}" in models/${pack}.js; using a box`); return null; }
    const o = src.clone(true);
    o.position.set(0, 0, 0);
    return o;
  }

  // ---------------------------------------------------------------- people: a Quaternius character, or a box person
  const boxGeo = new T.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
  function boxPerson(model) {
    const g = new T.Group();
    const hue = (hash(model) % 360) / 360;
    const body = new T.Mesh(boxGeo, toon('#' + new T.Color().setHSL(hue, 0.45, 0.5).getHexString()));
    body.scale.set(0.28, 0.33, 0.16);          // as tall as a person model (HEAD_Y)
    body.position.y = 0.45;
    const legs = new T.Mesh(boxGeo, toon('#3b4254'));
    legs.scale.set(0.2, 0.45, 0.12);
    const head = new T.Mesh(boxGeo, toon('#e8c4a0'));
    head.scale.set(0.16, HEAD_Y - 0.78, 0.16);
    head.position.y = 0.78;
    g.add(legs, body, head);
    outline(g);
    shadows(g, true);
    return g;
  }
  // Animation names: the engine only ever asks for these (the names of the rigs' clips, tools/office-characters.py). A model
  // whose clips are named otherwise (Quaternius' own: Idle, Walk, Run, Sitting, Wave…) is mapped by ANIM_ALIASES when the actor is made:
  // an exact name first, then the same name ignoring case and punctuation, then the patterns in order. A name a
  // model has no clip for plays idle instead (loops) or is skipped (one-shot gestures), see play().
  const ANIMS = ['idle', 'walk', 'sprint', 'sit', 'pick-up', 'emote-yes', 'emote-no', 'interact-right', 'interact-left',
    'holding-right', 'holding-left', 'holding-both', 'crouch', 'jump', 'drive', 'static'];
  const ANIM_ALIASES = {
    idle: [/^idle$/i, /idle/i, /^(stand|standing)$/i], walk: [/^walk(ing)?$/i, /walk/i], sprint: [/^(sprint|run|running)$/i, /sprint|run/i],
    sit: [/^sit(ting)?$/i, /sit/i], 'pick-up': [/pick.?up/i, /gather|interact/i], 'emote-yes': [/yes|nod|agree/i, /wave/i],
    'emote-no': [/^no$|shake|disagree|refuse/i], 'interact-right': [/interact.?r|wave|hello/i, /interact|punch.?r/i],
    'interact-left': [/interact.?l/i, /interact/i], 'holding-right': [/hold.*r(ight)?$|carry/i, /hold/i], 'holding-left': [/hold.*l(eft)?$/i],
    'holding-both': [/hold.*both|carry/i], crouch: [/crouch/i], jump: [/^jump$/i, /jump/i], drive: [/drive|driving/i], static: [/static|t.?pose/i]
  };
  const squash = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
  function clipFor(clips, name) {
    let c = clips.find(x => x.name === name) || clips.find(x => squash(x.name) === squash(name));
    for (const re of (ANIM_ALIASES[name] || [])) { if (c) break; c = clips.find(x => re.test(x.name)); }
    return c || null;
  }
  // Bones by pattern (rigs name them differently): the head for a glance, the right hand (or the right arm when a rig
  // has no hand bone) for something held. Empty when a model has none: then that detail is left out.
  const HEAD_BONE = [/^(mixamorig\d*:?)?head$/i, /^head[\W_]*(bone|jnt|joint)?$/i, /head(?!.*(end|top|mesh))/i];
  const HAND_BONE = [/^(mixamorig\d*:?)?right[\W_]*hand$/i, /^(hand|wrist|fist|palm)[\W_]*r(ight)?$/i, /(hand|wrist|fist|palm)[\W_]*r(ight)?$/i, /right[\W_]*(hand|wrist)/i];
  const ARM_BONE = [/^arm[\W_]*r(ight)?$/i, /(fore|lower)[\W_]*arm[\W_]*r(ight)?$/i, /right[\W_]*(fore)?arm/i, /arm[\W_]*r(ight)?$/i];
  function findBone(root, patterns) {
    const bones = [];
    root.traverse(o => { if (o.isBone) bones.push(o); });
    for (const re of patterns) { const b = bones.find(o => re.test(o.name)); if (b) return b; }
    return null;
  }
  // where on a bone the hand is, in the bone's own space: the middle of the skin it moves (a hand bone), or near
  // the far end of it (an arm bone). Measured once per model from the skin weights.
  const gripCache = {};
  function gripPoint(root, bone, isHand, key) {
    if (gripCache[key]) return gripCache[key];
    const v = new T.Vector3(), best = new T.Vector3(), sum = new T.Vector3();
    let far = -1, n = 0;
    root.traverse(o => {
      if (!o.isSkinnedMesh) return;
      const bi = o.skeleton.bones.findIndex(b => b.name === bone.name);
      if (bi < 0) return;
      const pos = o.geometry.attributes.position, si = o.geometry.attributes.skinIndex, sw = o.geometry.attributes.skinWeight;
      if (!si || !sw) return;
      const set = new Set();              // the hand with its fingers
      o.skeleton.bones[bi].traverse(c => { const j = o.skeleton.bones.indexOf(c); if (j >= 0) set.add(j); });
      const m = new T.Matrix4().multiplyMatrices(o.skeleton.boneInverses[bi], o.bindMatrix);
      for (let i = 0; i < pos.count; i++) {
        let w = 0;
        for (let k = 0; k < 4; k++) if (set.has(si.getComponent(i, k))) w += sw.getComponent(i, k);
        if (w < 0.5) continue;
        v.fromBufferAttribute(pos, i).applyMatrix4(m);
        sum.add(v); n++;
        const d = v.lengthSq();
        if (d > far) { far = d; best.copy(v); }
      }
    });
    const out = !n ? new T.Vector3() : isHand ? sum.divideScalar(n) : best.multiplyScalar(0.88);
    return (gripCache[key] = out);
  }
  function makeActor(id, model, opts) {
    opts = opts || {};
    const holder = new T.Group();
    let root, mixer = null;
    const actions = {};
    if (packReady(model)) {
      const g = packs[model].gltf;
      root = T.SkeletonUtils.clone(g.scene);
      outline(root, 0.5);
      shadows(root, true);
      const rig = packs[model].rig, clips = g.animations.length ? g.animations : rig && packReady(rig) ? packs[rig].gltf.animations : [];
      if (clips.length) {
        mixer = new T.AnimationMixer(root);
        ANIMS.forEach(name => { const c = clipFor(clips, name); if (c) actions[name] = mixer.clipAction(c); });
        clips.forEach(c => { if (!actions[c.name]) actions[c.name] = mixer.clipAction(c); });
      }
    } else root = boxPerson(model);
    holder.add(root);
    const shadow = new T.Mesh(shadowGeo, shadowMat);
    shadow.scale.setScalar(0.28);
    shadow.position.y = 0.012;
    shadow.renderOrder = 1;
    holder.add(shadow);
    const a = { id, model, holder, root, mixer, actions, current: null, after: null, hold: false, pos: holder.position, heading: 0, want: null,
      bubbleY: BUBBLE_Y, name: opts.name || id, row: opts.row || null, place: null, sit: false, mark: null, chatIdx: -1,
      idleAnim: 'idle', headBone: findBone(root, HEAD_BONE), look: 0, lookNow: 0, headQ: null, cup: null,
      walkSpeed: packs[model] && packs[model].walkSpeed || 0, runSpeed: packs[model] && packs[model].runSpeed || 0 };
    if (mixer) mixer.addEventListener('finished', () => { const next = a.after || rest(a); a.after = null; play(a, next, { fade: 0.3 }); });
    play(a, 'idle', { fade: 0 });
    return a;
  }
  const rest = (a) => a.sit ? 'sit' : (a.idleAnim || 'idle');
  // a cup in the right hand (holding-right pose); kept upright whatever the arm does. Left out when the model has
  // no holding-right clip or no hand/arm bone, or the food pack is missing.
  function holdCup(a, on) {
    if (!on) {
      if (a.cup) { a.cup.parent && a.cup.parent.remove(a.cup); a.cup = null; }
      a.idleAnim = 'idle';
      return;
    }
    if (a.cup || !a.mixer) return;
    if (!packReady('food')) { loadPack('food').then(() => { if (a.wantCup) holdCup(a, true); }); return; }
    let bone = findBone(a.root, HAND_BONE), isHand = !!bone;
    if (!bone) bone = findBone(a.root, ARM_BONE);
    const cup = bone && packNode('food', 'cup-coffee');
    if (!cup) return;
    const grip = gripPoint(a.root, bone, isHand, a.model + ':' + bone.name);
    const g = new T.Group();
    cup.traverse(o => { if (o.isMesh) o.castShadow = true; });
    const cb = new T.Box3().setFromObject(cup);
    if (!cb.isEmpty()) cup.position.y = -(cb.min.y + cb.max.y) / 2;       // the hand holds it round the middle
    g.add(cup);
    a.root.updateMatrixWorld(true);
    const s = new T.Vector3();
    bone.getWorldScale(s);
    g.scale.setScalar((PACK_SCALE.food || 0.6) * 0.5 / (s.x || 1));
    g.position.copy(grip);
    bone.add(g);
    a.cup = g;
    a.idleAnim = a.actions['holding-right'] ? 'holding-right' : 'idle';     // no holding clip: the cup in the hand at the side
    if (!a.sit && !a.walk && !gesturing(a)) play(a, a.idleAnim, { fade: 0.3 });
  }
  // after the mixer: turn the head by a.lookNow (radians about the world's up, whatever the rig's axes), keep a cup level
  const upV = new T.Vector3(0, 1, 0), qA = new T.Quaternion(), qB = new T.Quaternion(), axisV = new T.Vector3();
  function animate(a, dt) {
    const b = a.headBone;
    if (b && a.headQ) { b.quaternion.multiply(qA.copy(a.headQ).invert()); a.headQ = null; }
    if (a.mixer) a.mixer.update(dt);
    a.lookNow += (a.look - a.lookNow) * (1 - Math.exp(-dt * 3));
    if (b && Math.abs(a.lookNow) > 0.002) {
      b.getWorldQuaternion(qA);
      axisV.copy(upV).applyQuaternion(qA.invert());
      a.headQ = new T.Quaternion().setFromAxisAngle(axisV, a.lookNow);
      b.quaternion.multiply(a.headQ);
    }
    if (a.cup && a.cup.parent) {           // level: the cup's world rotation = the person's facing
      a.cup.parent.getWorldQuaternion(qA);
      a.holder.getWorldQuaternion(qB);
      a.cup.quaternion.copy(qA.invert().multiply(qB));
    }
  }
  // what plays when a model lacks a clip: a gesture becomes interact-right (once); anything else looping becomes idle (or sit)
  const ANIM_FALLBACK = { 'interact-left': 'interact-right', 'pick-up': 'interact-right', 'holding-right': 'interact-right',
    'holding-left': 'interact-right', 'holding-both': 'interact-right', 'emote-no': 'emote-yes' };
  function play(a, name, opts) {
    opts = opts || {};
    let act = a && a.actions[name];
    if (!act && a && opts.once && ANIM_FALLBACK[name]) act = a.actions[ANIM_FALLBACK[name]];
    if (!act && a && !opts.once) act = a.actions[a.sit && a.actions.sit ? 'sit' : 'idle'];
    if (!act) return null;
    if (a.current === act && !opts.once) return act;
    act.reset();
    act.setLoop(opts.once ? T.LoopOnce : T.LoopRepeat, Infinity);
    act.clampWhenFinished = !!opts.once;
    act.timeScale = opts.speed || 1;
    act.enabled = true;
    act.setEffectiveWeight(1);
    if (a.current && a.current !== act) act.crossFadeFrom(a.current, opts.fade == null ? 0.25 : opts.fade, false);
    act.play();
    a.current = act;
    a.after = opts.once ? (opts.then || null) : null;
    return act;
  }
  const gesturing = (a) => a.current && a.current.loop === T.LoopOnce && a.current.isRunning();
  function locomotion(a, speed) {
    if (!a.mixer || gesturing(a)) return;
    if (!speed) { play(a, rest(a)); return; }
    // the clip's speed follows the ground speed: by the rig's walk_speed / run_speed (feet do not slide) when it says
    if (Math.abs(speed) > WALK + 0.1 && a.actions.sprint) { play(a, 'sprint'); if (a.current && a.runSpeed) a.current.timeScale = Math.abs(speed) / a.runSpeed; }
    else {
      play(a, 'walk');
      if (a.current) a.current.timeScale = Math.sign(speed) * (a.walkSpeed ? Math.abs(speed) / a.walkSpeed : Math.max(0.6, Math.abs(speed) / WALK) * 1.1);
    }
  }

  // ---------------------------------------------------------------- zones
  // A zone spec (PLAN.md §5) from zones/<zone>.js, normalized; or a generated room with every place of the zone in a row.
  const zoneSpecs = {};
  let zoneFiles = [];
  function placesOfZone(z) {
    const ids = rows('places').filter(p => p.zone === z).map(p => p.id);
    (BUILTIN_PLACES[z] || []).forEach(id => { if (!ids.includes(id)) ids.push(id); });
    return ids;
  }
  function zoneSpec(z) {
    if (zoneSpecs[z]) return zoneSpecs[z];
    const file = (window.SO_ZONES || {})[z];
    return (zoneSpecs[z] = file ? normalizeZone(z, file) : defaultZone(z));
  }
  function normalizeZone(z, f) {
    const Z = Object.assign({ indoor: false, size: [30, 30], floor: '#b9b4a8', tiles: [], props: [], places: {}, portals: [], lights: [] }, f);
    Z.id = z;
    Z.name = Z.name || (ZONE_NAMES[z] || [pretty(z)])[0];
    Z.name_ko = Z.name_ko || (ZONE_NAMES[z] || [])[1] || '';
    // where you can walk: the rectangle `size` round the origin, or `bounds` [x0, z0, x1, z1] when the zone says (the city: out to the trail and the beach)
    Z.walk = Array.isArray(f.bounds) ? f.bounds.slice() : [-Z.size[0] / 2, -Z.size[1] / 2, Z.size[0] / 2, Z.size[1] / 2];
    Z.places = Object.assign({}, Z.places);
    const missing = placesOfZone(z).filter(id => !Z.places[id] && (PLACES[id] ? PLACES[id].zone === z : true));
    if (missing.length) {
      const base = (Z.places[Z.spawn] || Object.values(Z.places)[0] || { at: [0, 0] }).at;
      missing.forEach((id, i) => { Z.places[id] = { at: [base[0] + (i - (missing.length - 1) / 2) * 1.4, base[1] + 1.2], guessed: true }; });
      if (rows('places').some(p => p.zone === z && missing.includes(p.id))) warnOnce('places:' + z, `zones/${z}.js has no position for ${missing.filter(id => PLACES[id]).join(', ')}; placed near the spawn`);
    }
    if (!Z.spawn || !Z.places[Z.spawn]) Z.spawn = Object.keys(Z.places)[0];
    return Z;
  }
  function defaultZone(z) {
    const ids = placesOfZone(z);
    const gap = 3.2, n = Math.max(1, ids.length);
    const indoor = z !== 'city';
    const w = n * gap + 3, d = indoor ? 9 : 12;
    const places = {}, props = [], portals = [];
    const KIND = {
      sleep: [[1.1, 0.4, 1.9], '#6d86b8'], eat: [[1.4, 0.9, 0.6], '#b9a27f'], shop: [[1.6, 1.3, 0.5], '#8fb57a'], transit: [[0.2, 2.0, 0.2], '#3f6fb0'],
      desk: [[1.2, 0.72, 0.7], '#a47d57'], work: [[1.2, 0.72, 0.7], '#a47d57'], counter: [[1.6, 0.95, 0.6], '#9c8a74']
    };
    ids.forEach((id, i) => {
      const x = -((n - 1) * gap) / 2 + i * gap;
      places[id] = { at: [x, 0.6], face: [x, 3] };
      const door = DOORS[z + ':' + id];
      if (door) {
        props.push({ pack: 'box', size: [1.1, 1.5, 0.12], color: '#7b5a3e', at: [x, -2.3] });
        portals.push({ at: [x, -1.7], size: [1.2, 0.8], to: door[0], arrive: door[1], label: 'To ' + zoneName(door[0])[0] });
      } else {
        const k = KIND[placeKind(id)] || [[1.0, 0.8, 0.6], '#9aa3b5'];
        props.push({ pack: 'box', size: k[0], color: k[1], at: [x, -1.4], solid: true });
      }
    });
    if (indoor) {
      const H = 1.4, t = 0.2;
      props.push({ pack: 'box', size: [w + t * 2, H, t], color: '#e8e2d6', at: [0, -d / 2 - t / 2] }, { pack: 'box', size: [w + t * 2, 0.3, t], color: '#e8e2d6', at: [0, d / 2 + t / 2] },
        { pack: 'box', size: [t, H, d], color: '#e8e2d6', at: [-w / 2 - t / 2, 0] }, { pack: 'box', size: [t, H, d], color: '#e8e2d6', at: [w / 2 + t / 2, 0] });
    } else {
      for (let x = -w / 2 + 2; x < w / 2; x += 4.5) props.push({ pack: 'box', size: [3.6, 3 + (hash(x) % 4), 2.4], color: ['#c9b8a4', '#a9b8c9', '#c4c0b5'][hash(x) % 3], at: [x, -d / 2 + 1.3], solid: true });
    }
    const floors = { home: '#d8c9ae', city: '#8e9a7c', office: '#cfd3d6', diner: '#caa98a', market: '#d9d6cc', airport: '#d7d9de', hotel: '#b8a58f', client: '#c9ccd2' };
    return { walk: [-w / 2, -d / 2, w / 2, d / 2], id: z, generated: true, name: zoneName(z)[0], name_ko: zoneName(z)[1], indoor, size: [w, d], floor: floors[z] || '#c8c8c8', tiles: [], props, places, portals,
      spawn: ids.find(id => DOORS[z + ':' + id]) || ids[0], lights: [], ambient: indoor ? 1 : undefined };
  }
  // the first portal to take from zone `from` to reach zone `to` (breadth-first over the portals)
  function routeTo(from, to) {
    if (from === to) return null;
    const seen = new Set([from]), queue = [[from, null]];
    while (queue.length) {
      const [z, first] = queue.shift();
      for (const p of portalsOf(zoneSpec(z))) {
        if (!p.to || seen.has(p.to)) continue;
        const f = first || p;
        if (p.to === to) return f;
        seen.add(p.to);
        queue.push([p.to, f]);
      }
    }
    return null;
  }

  // ---------------------------------------------------------------- building a zone
  let zoneId = null, Z = null, zoneGroup = null, buildToken = 0, busy = false, portalArmed = false;
  let solids = [], zoneProps = {}, zoneAll = [], npcActors = {}, tags = [], disposables = [];
  function propSize(p) {
    const s = (p.pack === 'box' ? 1 : (PACK_SCALE[p.pack] || 1)) * (p.scale || 1);
    if (p.pack === 'box') return p.size || [1, 1, 1];
    if (Array.isArray(p.solid)) return [p.solid[0], 0.8 * s, p.solid[1]];
    if (p.pack === 'city') return [0.9 * s, 1.4 * s, 0.9 * s];
    if (p.pack === 'roads') return [0.25 * s, 0.5 * s, 0.25 * s];
    if (p.pack === 'cars') return [1.8 * s, 1.2 * s, 4 * s];
    if (p.pack === 'buildings') return [4 * s, 5 * s, 3 * s];
    if (p.pack === 'homeware') return [1.5 * s, 1.5 * s, 1 * s];
    if (p.pack === 'food') return [0.25 * s, 0.25 * s, 0.25 * s];
    return [0.5 * s, 0.6 * s, 0.5 * s];
  }
  function rectOf(x, z, w, d, turn) {       // turn: the box turns with the prop (solid [w, d] is already in world axes)
    if (turn && Math.abs(Math.sin(turn * Math.PI / 180)) > 0.7) [w, d] = [d, w];
    return { x0: x - w / 2, x1: x + w / 2, z0: z - d / 2, z1: z + d / 2 };
  }
  function addProp(p, isTile) {
    if (!p || !p.at) return null;
    const holder = new T.Group();
    let obj = null, fallback = false;
    if (p.pack === 'box' || !p.pack) {
      const sz = p.size || [1, 1, 1];
      obj = new T.Mesh(boxGeo, toon(p.color || '#9aa3b5'));
      obj.scale.set(sz[0], sz[1], sz[2]);
    } else {
      obj = packNode(p.pack, p.node);
      if (obj) {
        const s = (PACK_SCALE[p.pack] || 1) * (p.scale || 1);
        if ((window.SO_ZONE_KIT || {}).ORIGIN === 'center') {      // the zone kit asks for footprint-centred nodes
          const off = centreOf(p.pack, p.node, obj);
          const g = new T.Group();
          obj.position.copy(off);
          g.add(obj);
          obj = g;
        }
        obj.scale.multiplyScalar(s);
      }
      else {
        fallback = true;
        const sz = isTile ? [3 * (p.scale || 1), 0.02, 3 * (p.scale || 1)] : propSize(p);
        obj = new T.Mesh(boxGeo, toon(isTile ? '#7d828c' : '#a7abb3'));
        obj.scale.set(sz[0], sz[1], sz[2]);
      }
    }
    holder.add(obj);
    holder.position.set(p.at[0], (p.lift || 0) + (isTile ? 0.001 : 0), p.at[1]);
    holder.rotation.y = (p.turn || 0) * Math.PI / 180;
    zoneGroup.add(holder);
    holder.updateMatrixWorld(true);
    holder.traverse(o => { o.matrixAutoUpdate = false; });
    const flat = isTile || p.pack === 'food' || /^(floor|rug|path|driveway|tile|road-(?!sign))/i.test(p.node || '');
    shadows(holder, !flat);
    if (!isTile && !flat) zoneBox.union(new T.Box3().setFromObject(holder));
    if (p.pack === 'roads' && /^light-(square|curved)/.test(p.node || '')) addLamp(p, holder);
    if (p.solid && !isTile) {
      if (Array.isArray(p.solid)) solids.push(rectOf(p.at[0], p.at[1], p.solid[0], p.solid[1], 0));
      else if (p.pack === 'box' || fallback) { const sz = p.pack === 'box' ? (p.size || [1, 1, 1]) : propSize(p); solids.push(rectOf(p.at[0], p.at[1], sz[0], sz[2], p.turn)); }
      else {
        const b = new T.Box3().setFromObject(holder);
        if (!b.isEmpty()) solids.push({ x0: b.min.x, x1: b.max.x, z0: b.min.z, z1: b.max.z });
      }
    }
    if (!isTile && !(p.pack === 'food') && !/^(floor|rug)/i.test(p.node || '')) { occluders.push(holder); occluderSet.add(holder); }
    const rec = { spec: p, holder, object: obj };
    if (p.id) zoneProps[p.id] = rec;
    zoneAll.push(rec);
    return rec;
  }
  function zonePacks(spec) {
    const need = new Set();
    (spec.tiles || []).concat(spec.props || []).forEach(p => { if (p && p.pack && p.pack !== 'box') need.add(p.pack); });
    return need;
  }
  async function enterZone(z, arrive, at, heading) {
    const token = ++buildToken;
    busy = true;
    $('fade').classList.add('on');
    const spec = zoneSpec(z);
    const need = zonePacks(spec);
    npcsIn(z).forEach(n => need.add(n.row.model));
    if (G) need.add(G.model);
    await Promise.all(Array.from(need).map(loadPack));
    reportMissing();
    if (token !== buildToken) return false;
    if (talk) endTalk();
    endLife();
    pathQueue.length = 0;
    nav = null;
    movers.length = 0;
    if (zoneGroup) scene.remove(zoneGroup);
    disposables.forEach(d => d.dispose());
    disposables = [];
    zoneGroup = new T.Group();
    scene.add(zoneGroup);
    Z = spec;
    zoneId = z;
    solids = []; zoneProps = {}; zoneAll = []; npcActors = {}; occluders = []; occluderSet = new Set(); fadedNow = new Set();
    tags.forEach(t => t.el.remove());
    tags = [];
    Object.keys(bubbles).forEach(k => { bubbles[k].remove(); delete bubbles[k]; });
    // floor: the walkable rectangle indoors, a wide ground outdoors
    const [w, d] = spec.size;
    const fw = spec.indoor ? w : w + 160, fd = spec.indoor ? d : d + 160;
    const fg = new T.PlaneGeometry(fw, fd).rotateX(-Math.PI / 2);
    disposables.push(fg);
    const floor = new T.Mesh(fg, toon(spec.floor || '#c8c8c8'));
    floor.position.y = -0.01;
    floor.receiveShadow = true;
    zoneGroup.add(floor);
    if (spec.indoor) {           // the rest of the building around the room, seen over the walls
      const og = new T.PlaneGeometry(w + 80, d + 80).rotateX(-Math.PI / 2);
      disposables.push(og);
      const outer = new T.Mesh(og, toon('#' + new T.Color(spec.outside || spec.floor || '#c8c8c8').lerp(new T.Color('#8a8f99'), 0.55).getHexString()));
      outer.position.y = -0.03;
      outer.receiveShadow = true;
      zoneGroup.add(outer);
    }
    zoneBox.makeEmpty();
    lamps.length = 0;
    (spec.tiles || []).forEach(t => addProp(t, true));
    (spec.props || []).forEach(p => addProp(p, false));
    setupLights();
    // portal signs and place labels
    portalsOf(spec).forEach(p => {
      addTag(p.label || ('To ' + zoneName(p.to)[0]), new T.Vector3(p.at[0], 1.1, p.at[1]), 'portal', 14, p.label_ko || (zoneName(p.to)[1] ? '→ ' + zoneName(p.to)[1] : ''));
      const g = new T.PlaneGeometry(p.size ? p.size[0] : 1, p.size ? p.size[1] : 1).rotateX(-Math.PI / 2);
      disposables.push(g);
      const m = new T.Mesh(g, portalMat);
      m.position.set(p.at[0], 0.015, p.at[1]);
      m.renderOrder = 1;
      zoneGroup.add(m);
    });
    Object.keys(spec.places).forEach(id => {
      if (placeActions(id).length) addTag(place(id).name, new T.Vector3(spec.places[id].at[0], 0.02, spec.places[id].at[1]), 'place', 5, place(id).name_ko);
    });
    zoneGroup.add(marker.group);
    lampTimer = 0;
    applyEnvironment();
    // people
    refreshNpcs(true);
    if (G) {
      ensurePlayer();
      const pl = arrive && spec.places[arrive] ? spec.places[arrive] : null;
      const spot = at || (pl ? pl.at : (spec.places[spec.spawn] || { at: [0, 0] }).at);
      player.pos.set(spot[0], 0, spot[1]);
      if (heading != null) player.heading = heading;
      else if (pl && pl.face) player.heading = Math.atan2(pl.face[0] - spot[0], pl.face[1] - spot[1]);
      else player.heading = Math.atan2(-spot[0], -spot[1]);
      player.sit = false;
      const onTop = Object.values(npcActors).find(a => Math.hypot(a.pos.x - player.pos.x, a.pos.z - player.pos.z) < 0.7);
      if (onTop) {
        player.pos.copy(freeSpot(onTop, 1.0));
        player.heading = Math.atan2(onTop.pos.x - player.pos.x, onTop.pos.z - player.pos.z);
      }
      collide(player.pos, true);
      scene.add(player.holder);
    }
    portalArmed = false;
    cam.ready = false;
    if (spec.setup) { try { spec.setup(api); } catch (e) { console.error(`zones/${z}.js setup:`, e); } }
    if (jogTrail) { jogTrail.dispose(); jogTrail = null; }
    if (z === 'city' && window.SO_JOG) { try { jogTrail = SO_JOG.trail(api); } catch (e) { console.error('Sim Office jog:', e); } }
    startLife();
    startSeason();
    busy = false;
    setTimeout(() => $('fade').classList.remove('on'), 60);
    if (G) { G.zone = z; if (state === 'play') arrived(z); saveGame(); }
    goalTimer = 0; actTimer = 0;
    return true;
  }
  // coming into a zone on a working day: the office is the first time at work today (on time, late), a trip zone is
  // a day away on business
  let checkedIn = null;
  function arrived(z) {
    if (myOff(G.day)) return;
    if (TRAVEL_ZONES.includes(z)) G.tripDay = G.day;
    if (z === 'office' && G.outDay === G.day) G.outDay = null;          // back from lunch or an errand
    if (z === 'office' && G.inDay !== G.day && G.minute < 17 * 60) checkedIn = checkIn();
    hybridArrived(z);          // hybrid work: came to the office on a remote day, or home again after stepping out
  }
  // going out of the office on a working day before config early_before: fine for lunch, but if you don't come back it
  // is leaving early (closeDay)
  const EARLY = () => hm(CFG.early_before, 960);
  function leftOffice(z) {
    if (!G || myOff(G.day) || fired() || G.inDay !== G.day || TRAVEL_ZONES.includes(z) || G.minute >= EARLY()) return;
    G.outDay = G.day; G.outAt = Math.floor(G.minute);
    toast(`Heading out at ${clock(G.minute)}. Be back before ${clock(EARLY())}, or it counts as leaving early.`, `${clockKo(G.minute)}에 나가요. ${clockKo(EARLY())} 전에 돌아오지 않으면 조퇴예요.`, null, 4.5);
  }
  const portalMat = new T.MeshBasicMaterial({ color: 0x3fb5ad, transparent: true, opacity: 0.35, depthWrite: false, toneMapped: false });

  // ---------------------------------------------------------------- environment: sun, sky and street lamps by the clock outdoors; window and ceiling light indoors
  // Outdoors the clock drives everything: the sun rises in the east (+x), stands in the south (+z) at noon and sets in
  // the west, at the day's own sunrise and sunset (sunOf, solarHour below); from dusk the moon (blue, from the south-west) takes over and the street lamps
  // (roads light-square / light-curved props) glow, lighting the ground with a few point lights that follow you.
  // Indoors the light does not change with the clock: a window light (from the side with the most windows) with
  // the one shadow map, ceiling lights (the zone's lights, or a grid), a warm fill; only the backdrop darkens at night.
  // The weather (weather table, one row a game day): clouds over the sky, a dimmer sun with softer shadows, rain
  // (on and off through a rainy day) and morning fog. Temperatures in Fahrenheit, highest at about 3 PM.
  const WX_NAME = { clear: 'Sunny', partly: 'Partly cloudy', cloudy: 'Cloudy', rain: 'Rain', fog: 'Fog' };
  const WX_NAME_KO = { clear: '맑음', partly: '구름 조금', cloudy: '흐림', rain: '비', fog: '안개' };
  const WX_ICON = { clear: '☀️', partly: '⛅', cloudy: '☁️', rain: '🌧️', fog: '🌫️' };
  const toC = (f) => Math.round((f - 32) * 5 / 9);
  // After the last row of the weather table the weather is made from the season at Fairview: the normal high and low
  // for the date, rain more often in winter (and more often the day after rain), fog in summer. A day always gets the
  // same weather. Without a start date the table repeats.
  const WX_ROWS = {};
  WEATHER.forEach(w => { WX_ROWS[w.day] = w; });
  const WX_LAST = WEATHER.length ? WEATHER[WEATHER.length - 1].day : 0;
  const WX_NORMAL = [[58, 42], [61, 44], [64, 46], [67, 48], [71, 51], [75, 54], [77, 56], [78, 57], [78, 56], [72, 53], [64, 47], [58, 42]];   // the middle of each month: high, low °F
  const WX_RAIN = [0.35, 0.33, 0.28, 0.15, 0.06, 0.02, 0.01, 0.01, 0.03, 0.1, 0.25, 0.33];
  const WX_FOG = [0.1, 0.08, 0.06, 0.08, 0.15, 0.25, 0.3, 0.3, 0.2, 0.12, 0.1, 0.12];
  const WX_SAY = {
    clear: [['Sunny and dry.', '맑고 건조합니다.'], ['Clear skies all day.', '하루 종일 맑은 하늘이에요.'], ['Plenty of sunshine.', '햇볕이 가득합니다.']],
    partly: [['A mix of sun and clouds.', '해와 구름이 번갈아 나옵니다.'], ['Partly cloudy and calm.', '구름이 조금 끼고 바람이 잔잔합니다.'], ['Clouds in the morning, sun in the afternoon.', '아침엔 구름, 오후엔 해가 납니다.']],
    cloudy: [['Gray skies, but dry.', '하늘은 흐리지만 비는 오지 않아요.'], ['Overcast all day.', '하루 종일 흐립니다.'], ['Cloudy and cool.', '흐리고 선선합니다.']],
    rain: [['Rain on and off. Bring an umbrella.', '비가 오락가락합니다. 우산을 챙기세요.'], ['A wet day with steady rain.', '비가 꾸준히 내리는 날이에요.'], ['Showers through the afternoon.', '오후까지 소나기가 옵니다.']],
    fog: [['Morning fog, then some sun.', '아침 안개 뒤에 해가 조금 납니다.'], ['Thick fog early, clearing by noon.', '이른 아침 짙은 안개, 정오쯤 걷힙니다.']]
  };
  const WX_ADJ = { rain: [-6, 2], cloudy: [-3, 1], fog: [-3, -1], partly: [0, 0], clear: [2, -1] };
  const wxHash = (d, k) => { const x = Math.sin(d * 12.9898 + k * 78.233) * 43758.5453; return x - Math.floor(x); };
  function wxNormal(d) {
    const t = dateOf(d), m = t.getUTCMonth(), f = (t.getUTCDate() - 15) / 30, n = (m + (f < 0 ? 11 : 1)) % 12, a = WX_NORMAL[m], b = WX_NORMAL[n], w = Math.abs(f);
    return [a[0] + (b[0] - a[0]) * w, a[1] + (b[1] - a[1]) * w];
  }
  function wxDay(d, prev) {
    const m = dateOf(d).getUTCMonth(), [hi, lo] = wxNormal(d);
    const pRain = Math.min(0.7, WX_RAIN[m] * (prev && prev.kind === 'rain' ? 2 : 0.8)), s = wxHash(d, 2);
    const kind = wxHash(d, 1) < pRain ? 'rain' : s < WX_FOG[m] ? 'fog' : s < WX_FOG[m] + 0.2 + WX_RAIN[m] ? 'cloudy' : s < 0.56 + WX_RAIN[m] ? 'partly' : 'clear';
    const noise = (wxHash(d, 3) - 0.5) * 8, high = Math.round(hi + noise + WX_ADJ[kind][0]), low = Math.min(high - 6, Math.round(lo + noise * 0.5 + WX_ADJ[kind][1]));
    const say = WX_SAY[kind][Math.floor(wxHash(d, 4) * WX_SAY[kind].length)];
    const extra = high < 60 ? [' Chilly, so grab a jacket.', ' 쌀쌀하니 재킷을 챙기세요.'] : high >= 82 ? [' Hot in the afternoon.', ' 오후에는 덥습니다.'] : ['', ''];
    return { day: d, kind, high_f: high, low_f: low, forecast: say[0] + extra[0], forecast_ko: say[1] + extra[1] };
  }
  const wxMade = {};
  let wxUpTo = WX_LAST;
  function weatherOf(day) {
    day = Math.max(1, day);
    if (WX_ROWS[day]) return WX_ROWS[day];
    if (START != null && WX_LAST && day > WX_LAST) {
      for (; wxUpTo < day; wxUpTo++) wxMade[wxUpTo + 1] = wxDay(wxUpTo + 1, wxMade[wxUpTo] || WX_ROWS[wxUpTo]);
      return wxMade[day];
    }
    return WEATHER.length ? WEATHER[(day - 1) % WEATHER.length] : { day, kind: 'clear', high_f: 72, low_f: 55, forecast: '' };
  }
  function weatherNow() {
    const day = G ? G.day : 1, h = hourNow(), w = weatherOf(day), k = !G && state === 'tour' && tour.wx ? tour.wx : w.kind;
    const rain = k === 'rain' ? clamp((0.5 + 0.62 * Math.sin(h * 1.3 + day * 2.1)) * 1.6, 0, 1) : 0;
    const fogged = k === 'fog' ? clamp((11 - h) / 2, 0, 1) : 0;
    const cover = k === 'rain' ? 1 : k === 'cloudy' ? 0.92 : k === 'partly' ? 0.45 : k === 'fog' ? Math.max(0.3, fogged * 0.8) : 0.1;
    const temp = Math.round(w.low_f + (w.high_f - w.low_f) * Math.max(0, Math.sin(Math.PI * (h - 5) / 20)));
    return { kind: k, rain, fog: fogged, cover, dark: k === 'rain' ? 0.6 + 0.4 * rain : k === 'cloudy' ? 0.35 : 0, temp, high: w.high_f, low: w.low_f, row: w };
  }
  // Sunrise and sunset go by the real date at Fairview (config latitude, longitude, utc_offset; the NOAA formulas):
  // later sunrises and earlier sunsets as autumn goes on. The clock stays on one offset (no daylight saving change).
  // The light of the day (KEYS below, made for a sunrise at 6:30 and a sunset at 7 PM) is stretched to the day's own
  // sunrise and sunset (solarHour).
  const LAT = +CFG.latitude || 37.6, LON = CFG.longitude == null ? -122.4 : +CFG.longitude, UTC_OFF = CFG.utc_offset == null ? -7 : +CFG.utc_offset, SUN_TPL = [6.5, 19];
  const sunMemo = {};
  function sunOf(day) {             // { rise, set } in minutes of the local day, or null without a start date
    if (sunMemo[day] !== undefined) return sunMemo[day];
    const t = dateOf(day);
    if (!t) return (sunMemo[day] = null);
    const doy = Math.round((t - Date.UTC(t.getUTCFullYear(), 0, 1)) / 864e5), g = 2 * Math.PI / 365 * doy, rad = Math.PI / 180;
    const eq = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
    const dec = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
    const ha = Math.acos(clamp(Math.cos(90.833 * rad) / (Math.cos(LAT * rad) * Math.cos(dec)) - Math.tan(LAT * rad) * Math.tan(dec), -1, 1)) / rad;
    const off = UTC_OFF * 60;
    return (sunMemo[day] = { rise: Math.round(720 - 4 * (LON + ha) - eq + off), set: Math.round(720 - 4 * (LON - ha) - eq + off) });
  }
  const sunDay = () => G ? G.day : 1;
  function solarHour(h, day) {       // the hour of the day's light: the clock stretched so the sun rises at 6:30 and sets at 7 PM
    const s = sunOf(day);
    h = ((h % 24) + 24) % 24;
    if (!s) return h;
    const r = s.rise / 60, t = s.set / 60, [R, S] = SUN_TPL;
    return h < r ? h * R / r : h < t ? R + (h - r) * (S - R) / (t - r) : S + (h - t) * (24 - S) / (24 - t);
  }
  const darkAt = (min, day) => { const h = solarHour(min / 60, day == null ? sunDay() : day); return h >= 19.4 || h < 6.1; };
  const sunText = (d) => { const s = sunOf(d); return s ? `Sunrise ${clock(s.rise)}, sunset ${clock(s.set)}` : ''; };
  const zoneBox = new T.Box3(), lamps = [], zoneLights = [];
  let lampPool = [], windowDir = new T.Vector3(0.45, 0.78, 0.45).normalize();
  const KEYS = [          // hour, sun colour, sun, fill sky, fill ground, fill, sky top, sky horizon, lamps, exposure
    [0, '#a4b2dc', 0.6, '#5c6788', '#22242e', 0.75, '#060b1c', '#1c2848', 1, 1.15],
    [5.0, '#a4b2dc', 0.6, '#5c6788', '#22242e', 0.75, '#060b1c', '#1c2848', 1, 1.15],
    [6.0, '#ff9868', 0.8, '#8c86b0', '#4a3e3a', 0.8, '#34416e', '#e89a7c', 0.6, 1.05],
    [7.0, '#ffb070', 1.8, '#c3cdea', '#6e5c4a', 0.9, '#6d9dd6', '#ffd0a4', 0, 0.9],
    [9.0, '#ffeedd', 2.1, '#dde8ff', '#6d6458', 0.8, '#5c9fe2', '#cde4f6', 0, 0.85],
    [12.0, '#fffaf2', 2.3, '#e4eeff', '#6d6458', 0.8, '#4e97e4', '#d0e8fa', 0, 0.85],
    [16.0, '#fff0da', 2.1, '#e0eaff', '#6d6458', 0.8, '#5899dc', '#d6e5f2', 0, 0.85],
    [17.5, '#ffbe7c', 1.9, '#d6d2e6', '#6c5848', 0.8, '#6a90ca', '#f5c898', 0, 0.9],
    [18.5, '#ff8a4c', 1.6, '#c4b8b4', '#5e4a3a', 0.8, '#4a5c98', '#f5a070', 0.25, 0.95],
    [19.5, '#ff6a40', 0.7, '#8a86a4', '#3a3238', 0.75, '#253062', '#c47a6c', 0.8, 1.05],
    [20.5, '#a4b2dc', 0.6, '#5c6788', '#22242e', 0.75, '#0a1128', '#223052', 1, 1.15],
    [24, '#a4b2dc', 0.6, '#5c6788', '#22242e', 0.75, '#060b1c', '#1c2848', 1, 1.15]
  ].map(k => k.map(v => typeof v === 'string' ? new T.Color(v) : v));
  const env = { sun: new T.Color(), sky: new T.Color(), ground: new T.Color(), top: new T.Color(), horizon: new T.Color(), sunI: 1, fillI: 1, lamp: 0, exposure: 1, night: 0, dir: new T.Vector3() };
  const MOON = new T.Vector3(-0.45, 0.78, 0.5).normalize(), sunV = new T.Vector3();
  function envAt(h) {
    h = ((h % 24) + 24) % 24;
    let k = 0;
    while (k < KEYS.length - 2 && KEYS[k + 1][0] <= h) k++;
    const A = KEYS[k], B = KEYS[k + 1], t = clamp((h - A[0]) / (B[0] - A[0]), 0, 1);
    env.sun.copy(A[1]).lerp(B[1], t); env.sunI = A[2] + (B[2] - A[2]) * t;
    env.sky.copy(A[3]).lerp(B[3], t); env.ground.copy(A[4]).lerp(B[4], t); env.fillI = A[5] + (B[5] - A[5]) * t;
    env.top.copy(A[6]).lerp(B[6], t); env.horizon.copy(A[7]).lerp(B[7], t);
    env.lamp = A[8] + (B[8] - A[8]) * t; env.exposure = A[9] + (B[9] - A[9]) * t;
    env.night = h < 5 ? 1 : h < 6.2 ? (6.2 - h) / 1.2 : h < 19.3 ? 0 : h < 20.3 ? h - 19.3 : 1;
    const az = Math.PI * (h - 6) / 12.5, el = Math.max(0.2, Math.sin(az));
    sunV.set(Math.cos(az) * Math.cos(el), Math.sin(el), Math.sin(az) * Math.cos(el));
    env.dir.copy(sunV).lerp(MOON, env.night).normalize();
    return env;
  }
  // the sky: a dome around the camera, horizon colour = fog colour, the sun (or the moon) as a soft disc, stars at night
  const sky = (function () {
    const mat = new T.ShaderMaterial({
      uniforms: { top: { value: new T.Color() }, horizon: { value: new T.Color() }, sunDir: { value: new T.Vector3(0, 1, 0) }, sunColor: { value: new T.Color() }, glow: { value: 0 }, stars: { value: 0 },
        cover: { value: 0 }, cloud: { value: new T.Color('#ffffff') }, drift: { value: 0 } },
      vertexShader: 'varying vec3 vDir; void main() { vDir = position; vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position = p.xyww; }',
      fragmentShader: `uniform vec3 top, horizon, sunDir, sunColor, cloud; uniform float glow, stars, cover, drift; varying vec3 vDir;
        float h2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float vnoise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
          return mix(mix(h2(i), h2(i + vec2(1.0, 0.0)), f.x), mix(h2(i + vec2(0.0, 1.0)), h2(i + vec2(1.0, 1.0)), f.x), f.y); }
        float fbm(vec2 p) { float a = 0.5, s = 0.0; for (int i = 0; i < 4; i++) { s += a * vnoise(p); p = p * 2.03 + 7.1; a *= 0.5; } return s; }
        void main() {
          vec3 d = normalize(vDir);
          float h = max(d.y, 0.0);
          vec3 c = mix(horizon, top, pow(smoothstep(0.0, 0.75, h), 0.7));
          float s = max(dot(d, sunDir), 0.0);
          c += sunColor * (pow(s, 12.0) * 0.45 * glow + pow(s, 3.0) * 0.18 * glow + smoothstep(0.9990, 0.9994, s));
          vec3 q = floor(d * 240.0);
          float r = fract(sin(dot(q, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
          c += stars * step(0.9975, r) * smoothstep(0.06, 0.35, d.y) * vec3(0.85, 0.88, 1.0);
          if (cover > 0.01 && d.y > 0.0) {          // clouds: a layer of noise high above, thinning toward the horizon's haze
            vec2 uv = d.xz / (d.y + 0.14) * 0.85 + vec2(drift, drift * 0.35);
            float n = fbm(uv), th = mix(0.74, 0.16, cover);
            float m = smoothstep(th, th + 0.2, n) * smoothstep(0.0, 0.1, d.y);
            c = mix(c, cloud * (0.82 + 0.3 * fbm(uv * 2.7 + 3.0)), m * mix(0.85, 0.97, cover));
          }
          gl_FragColor = vec4(c, 1.0);
          #include <colorspace_fragment>
        }`,
      side: T.BackSide, depthWrite: false, depthTest: false, fog: false, toneMapped: false
    });
    const m = new T.Mesh(new T.SphereGeometry(300, 24, 12), mat);
    m.frustumCulled = false;
    m.renderOrder = -1000;
    scene.add(m);
    return m;
  })();
  const fog = new T.Fog(0xffffff, 10, 100);
  const glowTex = radialTexture([[0, 'rgba(255,240,205,1)'], [0.22, 'rgba(255,214,150,0.6)'], [0.55, 'rgba(255,190,110,0.16)'], [1, 'rgba(255,180,100,0)']]);
  const glowMat = new T.SpriteMaterial({ map: glowTex, blending: T.AdditiveBlending, depthWrite: false, transparent: true, toneMapped: false, opacity: 0 });
  function addLamp(p, holder) {        // a street lamp: where its light hangs, and a glow sprite there
    const bb = (((window.SO_ZONE_KIT || {}).BOX || {}).roads || {})[p.node];
    const s = (PACK_SCALE.roads || 3) * (p.scale || 1), heads = [];
    if (bb) {
      const x = (bb[0] + bb[1]) / 2 * s, y = bb[5] * s - 0.08;
      heads.push(new T.Vector3(x, y, bb[2] * s + 0.1));
      if (/double/.test(p.node)) heads.push(new T.Vector3(x, y, bb[3] * s - 0.1));
    } else heads.push(new T.Vector3(0, 1.7, 0));
    heads.forEach(h => {
      holder.localToWorld(h);
      const g = new T.Sprite(glowMat);
      g.position.copy(h);
      g.scale.setScalar(0.9);
      g.renderOrder = 2;
      g.visible = false;
      zoneGroup.add(g);
      lamps.push({ at: h, glow: g });
    });
  }
  function autoLights(spec) {          // ceiling lights on a grid when the zone gives none
    const [w, d] = spec.size;
    let nx = Math.max(1, Math.round(w / 5)), nz = Math.max(1, Math.round(d / 5));
    while (nx * nz > 6) { if (nx >= nz) nx--; else nz--; }
    const out = [];
    for (let i = 0; i < nx; i++) for (let k = 0; k < nz; k++) out.push({ at: [-w / 2 + (i + 0.5) * w / nx, -d / 2 + (k + 0.5) * d / nz], height: 1.25, color: '#fff0dc', intensity: 1.0 });
    return out;
  }
  function setupLights() {
    zoneLights.forEach(l => { if (l.parent) l.parent.remove(l); });
    zoneLights.length = 0;
    lampPool = [];
    if (!Z || !zoneGroup) return;
    const high = gfxHigh();
    if (Z.indoor) {
      let list = (Z.lights && Z.lights.length ? Z.lights : autoLights(Z)).slice(0, 8);
      if (!high && list.length > 2) list = list.slice().sort((a, b) => Math.hypot(a.at[0], a.at[1]) - Math.hypot(b.at[0], b.at[1])).slice(0, 2);
      list.forEach(l => {
        const pl = new T.PointLight(l.color || '#fff0dc', (l.intensity == null ? 1.2 : l.intensity) * 1.2, l.range || 9, 1.3);
        pl.position.set(l.at[0], l.height == null ? 1.25 : l.height, l.at[1]);
        zoneGroup.add(pl);
        zoneLights.push(pl);
      });
      // the window light comes from the side of the room with the most windows (a steep angle, so the walls shade only their foot)
      const v = new T.Vector2();
      (Z.props || []).forEach(p => { if (p && /^wallWindow/.test(p.node || '')) v.add(new T.Vector2(p.at[0] / (Z.size[0] || 1), p.at[1] / (Z.size[1] || 1))); });
      const n = v.length();
      if (n > 0.6) v.divideScalar(n); else v.set(0.55, 0.8).normalize();
      windowDir.set(v.x * 0.62, 0.78, v.y * 0.62).normalize();
    } else if (lamps.length) {
      const n = Math.min(high ? 6 : 2, lamps.length);
      for (let i = 0; i < n; i++) {
        const pl = new T.PointLight('#ffc98a', 0, 7.5, 1.4);
        pl.position.copy(lamps[i].at);
        zoneGroup.add(pl);
        zoneLights.push(pl);
        lampPool.push(pl);
      }
    }
  }
  // fit the one shadow map to the zone: the props' box (with the floor, capped near the zone's size) seen from the light
  const shadowView = new T.Matrix4(), boxC = new T.Vector3(), corner = new T.Vector3(), fitBox = new T.Box3();
  function fitShadow(dir) {
    if (!Z) return;
    const [w, d] = Z.size, m = Z.indoor ? 0.6 : 6;
    fitBox.copy(zoneBox);
    fitBox.expandByPoint(corner.set(-w / 2, 0, -d / 2)).expandByPoint(corner.set(w / 2, 0, d / 2));
    fitBox.intersect(new T.Box3(new T.Vector3(-w / 2 - m, -1, -d / 2 - m), new T.Vector3(w / 2 + m, 60, d / 2 + m)));
    fitBox.getCenter(boxC);
    const r = fitBox.getSize(corner).length() + 4;
    sun.target.position.copy(boxC);
    sun.position.copy(boxC).addScaledVector(dir, r);
    sun.target.updateMatrixWorld();
    sun.updateMatrixWorld();
    const cam = sun.shadow.camera;
    cam.position.copy(sun.position);
    cam.lookAt(boxC);
    cam.updateMatrixWorld();
    shadowView.copy(cam.matrixWorld).invert();
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity, z0 = Infinity, z1 = -Infinity;
    for (let i = 0; i < 8; i++) {
      corner.set(i & 1 ? fitBox.max.x : fitBox.min.x, i & 2 ? fitBox.max.y : fitBox.min.y, i & 4 ? fitBox.max.z : fitBox.min.z).applyMatrix4(shadowView);
      x0 = Math.min(x0, corner.x); x1 = Math.max(x1, corner.x); y0 = Math.min(y0, corner.y); y1 = Math.max(y1, corner.y); z0 = Math.min(z0, corner.z); z1 = Math.max(z1, corner.z);
    }
    cam.left = x0 - 0.5; cam.right = x1 + 0.5; cam.bottom = y0 - 0.5; cam.top = y1 + 0.5;
    cam.near = Math.max(0.1, -z1 - 2); cam.far = -z0 + 2;
    cam.updateProjectionMatrix();
  }
  let envTimer = 0, lampTimer = 0;
  const hourNow = () => (G ? G.minute : state === 'tour' ? tour.minute : 600) / 60;
  function applyEnvironment() {
    if (!Z) return;
    const e = envAt(solarHour(hourNow(), sunDay())), wx = weatherNow(), day = 1 - e.night;
    rainShow(!Z.indoor && state !== 'title' ? wx.rain : 0);
    if (Z.indoor) {
      sky.visible = false;
      const bg = new T.Color(Z.background || '#cdd3dc').lerp(new T.Color('#8f98a6'), wx.cover * 0.5 + wx.dark * 0.3).lerp(new T.Color('#1a2238'), e.night * 0.85);
      scene.background = bg;
      fog.color.copy(bg);
      fog.near = Math.max(Z.size[0], Z.size[1]) * 0.9 + 6;
      fog.far = Math.max(Z.size[0], Z.size[1]) * 1.6 + 30;
      scene.fog = fog;
      // the light from the windows goes with the day outside: warm and low at dusk, a little moonlight at night, flat under clouds
      sun.color.set('#fff1de').lerp(e.sun, 0.35 * day).lerp(new T.Color('#dfe4ec'), wx.cover * 0.5 * day);
      sun.intensity = 1.2 * (0.25 + 0.75 * day) * (1 - 0.45 * wx.cover * day);
      sun.shadow.intensity = 0.8 * (1 - 0.5 * wx.cover);
      fitShadow(windowDir);
      hemi.intensity = 0.85 * (Z.ambient == null ? 0.9 : Z.ambient);
      hemi.color.set('#fff5e8');
      hemi.groundColor.set('#8a7c6a');
      renderer.toneMappingExposure = 0.85;
      return;
    }
    // under clouds the sky loses its blue and the horizon its glow; rain clouds are darker; fog whitens everything near
    const thick = clamp((wx.cover - 0.5) * 2, 0, 1), lum = (c) => 0.3 * c.r + 0.55 * c.g + 0.15 * c.b;
    const grey = (c, k) => { const l = lum(c) * k; return wxTmp.setRGB(l * 0.95, l, l * 1.07); };
    e.top.lerp(grey(e.top, 1.5 - 0.5 * wx.dark), thick * 0.9).lerp(grey(e.horizon, 1), thick * 0.35);
    e.horizon.lerp(grey(e.horizon, 1 - 0.3 * wx.dark), thick * 0.9);
    if (wx.fog) { e.horizon.lerp(wxTmp.set('#dfe3e8').multiplyScalar(0.25 + 0.75 * day), wx.fog * 0.85); e.top.lerp(e.horizon, wx.fog * 0.8); }
    const U = sky.material.uniforms;
    sky.visible = true;
    U.top.value.copy(e.top);
    U.horizon.value.copy(e.horizon);
    U.sunDir.value.copy(e.dir);
    U.sunColor.value.copy(e.sun).multiplyScalar((e.night > 0.5 ? 0.9 : 1.2) * (1 - thick) * (1 - wx.fog * 0.7));
    U.glow.value = e.night > 0.5 ? 0.35 : 1 + (1 - clamp(e.dir.y / 0.6, 0, 1)) * 1.5;
    U.stars.value = clamp((e.night - 0.5) * 2, 0, 1) * (1 - wx.cover);
    U.cover.value = wx.cover;
    U.cloud.value.set('#ffffff').lerp(e.sun, 0.25 * day).multiplyScalar((0.16 + 0.84 * day) * (1 - 0.45 * wx.dark)).lerp(e.horizon, 0.25);
    U.drift.value = elapsed * 0.004 + (G ? G.day * 3.7 + G.minute * 0.002 : 0);
    scene.background = e.horizon;
    const far = Math.max(Z.size[0], Z.size[1]) * 1.2 + 40, haze = Math.max(wx.fog, wx.rain * 0.45);
    fog.color.copy(e.horizon);
    fog.near = far * 0.55 * (1 - haze) + 1.5 * haze;
    fog.far = far * 1.4 * (1 - haze) + (wx.fog > wx.rain * 0.45 ? 26 : 60) * haze;
    scene.fog = fog;
    const dim = 1 - 0.78 * thick * day - 0.5 * wx.fog * day;
    sun.color.copy(e.sun).lerp(wxTmp.set('#e8ecf2'), thick * 0.7 * day);
    sun.intensity = e.sunI * dim;
    sun.shadow.intensity = 0.8 * (1 - 0.7 * Math.max(thick, wx.fog));
    fitShadow(e.dir);
    hemi.intensity = e.fillI * (Z.ambient == null ? 1 : Z.ambient) * (1 + (0.55 * thick + 0.3 * wx.fog) * day) * (1 - 0.22 * wx.dark);
    hemi.color.copy(e.sky).lerp(grey(e.sky, 1.05), thick * 0.8);
    hemi.groundColor.copy(e.ground);
    renderer.toneMappingExposure = e.exposure;
    // street lamps: glows on every lamp, the point lights on the ones nearest to you
    const on = Math.max(e.lamp, wx.dark > 0.8 ? 0.5 : 0, wx.fog > 0.6 ? 0.5 : 0);
    glowMat.opacity = on;
    lamps.forEach(l => { l.glow.visible = on > 0.02; });
    if (lampPool.length) {
      const c = player && state !== 'title' ? player.pos : cam.look;
      if ((lampTimer -= 1) <= 0) {
        lampTimer = 4;
        lamps.slice().sort((a, b) => a.at.distanceToSquared(c) - b.at.distanceToSquared(c)).slice(0, lampPool.length).forEach((l, i) => lampPool[i].position.copy(l.at));
      }
      lampPool.forEach(pl => { pl.intensity = on * 5; pl.visible = on > 0.02; });     // hidden by day: no cost (one shader rebuild at dusk)
    }
  }
  function envTick(dt) {
    if ((envTimer -= dt) <= 0) {
      envTimer = 0.25;
      applyEnvironment();
      rainSound.set(Z && (G ? state !== 'title' : state === 'tour') && !jog ? weatherNow().rain : 0, !!Z && !!Z.indoor);
    }
    if (Z && !Z.indoor) sky.position.copy(camera.position);
    rainTick(dt);
  }
  // Rain: short slanted streaks in a box that goes with the camera; how many are drawn follows how hard it rains
  const wxTmp = new T.Color();
  const rain = (function () {
    const N = 1600, BOX = [18, 9, 18], pos = new Float32Array(N * 6), drops = [];
    for (let i = 0; i < N; i++) drops.push({ x: (Math.random() - 0.5) * BOX[0], y: Math.random() * BOX[1], z: (Math.random() - 0.5) * BOX[2], v: 7.5 + Math.random() * 3.5 });
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.BufferAttribute(pos, 3).setUsage(T.DynamicDrawUsage));
    g.setDrawRange(0, 0);
    const m = new T.LineSegments(g, new T.LineBasicMaterial({ color: 0xdfe8f4, transparent: true, opacity: 0.42, depthWrite: false, fog: false, toneMapped: false }));
    m.frustumCulled = false;
    m.visible = false;
    m.renderOrder = 3;
    scene.add(m);
    return { N, BOX, pos, drops, mesh: m, amount: 0 };
  })();
  function rainShow(amount) {
    rain.amount = amount;
    rain.mesh.visible = amount > 0.03;
    rain.mesh.material.opacity = 0.2 + 0.25 * amount;
  }
  function rainTick(dt) {
    if (!rain.mesh.visible) return;
    const n = Math.round(rain.N * (gfxHigh() ? 1 : 0.45) * clamp(rain.amount, 0.15, 1)), B = rain.BOX, p = rain.pos, wind = 1.1, len = 0.034;
    for (let i = 0; i < n; i++) {
      const d = rain.drops[i];
      d.y -= d.v * dt; d.x += wind * dt;
      if (d.y < 0) { d.y += B[1]; d.x = (Math.random() - 0.5) * B[0]; d.z = (Math.random() - 0.5) * B[2]; }
      p[i * 6] = d.x; p[i * 6 + 1] = d.y; p[i * 6 + 2] = d.z;
      p[i * 6 + 3] = d.x + wind * len; p[i * 6 + 4] = d.y + d.v * len; p[i * 6 + 5] = d.z;
    }
    rain.mesh.geometry.setDrawRange(0, n * 2);
    rain.mesh.geometry.attributes.position.needsUpdate = true;
    rain.mesh.position.set(camera.position.x, 0, camera.position.z);
  }

  // ---------------------------------------------------------------- the player and the people around
  let player = null;
  function ensurePlayer() {
    if (player && player.model === G.model && player.boxed === !packReady(G.model)) return;
    if (player) scene.remove(player.holder);
    player = makeActor('player', G.model, { name: G.name });
    player.boxed = !packReady(G.model);
    player.bubbleY = BUBBLE_Y;
  }
  // where an npc is now: at the place of its first open episode; otherwise where the schedule table puts them at this
  // time of this day, or nowhere (null: off work, at home) when no row fits; without rows, always at their own place
  // days: 'all', 'weekday', 'weekend' (a company holiday counts as a weekend), names of days ('mon,tue,wed'), or
  // game days ('11-12'). Shift workers are not at a place that is closed all day (holiday hours).
  const DAY_NAMES = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  function scheduledPlace(n) {
    const list = SCHEDULE[n.id];
    if (!list || !G) return homeToday(n, n.place) ? null : n.place;
    const days = offWork(G.day) ? 'weekend' : 'weekday', name = DAY_NAMES[(G.day - 1) % 7];
    const onDay = (d) => { const m = /^(\d+)(?:-(\d+))?$/.exec(d); return m ? G.day >= +m[1] && G.day <= +(m[2] || m[1]) : d === 'all' || d === days || listOf(d).includes(name); };      // '11-12': those game days
    const s = list.find(s => onDay(String(s.days)) && G.minute >= hm(s.time_from, 0) && G.minute < hm(s.time_to, 1440));
    if (!s || shutAllDay(s.place) || shutAllDay(zoneOfPlace(s.place))) return null;
    if (homeToday(n, s.place)) return null;          // hybrid work: a remote day, working from home
    return s.place;
  }
  function npcPlaceNow(n) {
    if (!G) return scheduledPlace(n);
    const open = openEpisodes().filter(e => e.place);
    // their own conversation first; otherwise one they have a line in (a meeting: everybody who speaks is in the room,
    // also round the phone of a call), if it is in the building they work in (not the client on the screen)
    const ep = open.find(e => e.npc === n.id && !isPhone(e))
      || open.find(e => e.npc !== n.id && ((SPEAKERS[e.id] || []).includes(n.id) || listOf((ROUTINE_OF[e.id] || {}).people).includes(n.id)) && n.place && zoneOfPlace(n.place) === zoneOfPlace(e.place) && scheduledPlace(n) && zoneOfPlace(scheduledPlace(n)) === zoneOfPlace(e.place));
    if (ep) return ep.place;
    const lunch = lunchPlace(n);          // a coworker who invited you to lunch waits at the diner
    if (lunch) return lunch;
    // somebody on the next shift at the same counter steps away while a coworker there has a conversation waiting
    const at = scheduledPlace(n);
    if (at && open.some(e => e.place === at && e.npc && e.npc !== n.id && !isPhone(e) && npcRow(e.npc).place === n.place)) return null;
    return at;
  }
  // opening hours (config hours_<zone or place>, hours_<…>_weekend: 'HH:MM-HH:MM'); never closed while a conversation waits there
  // holiday hours: hours_<id>_<YYYY-MM-DD> ('07:00-16:00', or 'closed': [0, 0])
  function hoursOf(id, d) {
    if (!G || !id) return null;
    d = d == null ? G.day : d;
    const v = CFG['hours_' + id + '_' + isoOf(d)] || (isWeekend(d) && CFG['hours_' + id + '_weekend']) || CFG['hours_' + id];
    if (/^closed$/i.test(String(v || ''))) return [0, 0];
    const m = /^(\d{1,2}:\d{2})-(\d{1,2}:\d{2})$/.exec(String(v || ''));
    return m ? [hm(m[1], 0), hm(m[2], 1440)] : null;
  }
  const shutAllDay = (id) => { const h = hoursOf(id); return !!h && h[0] === h[1]; };
  // places with their own hours today (holiday hours): [{ id, h }]
  function holidayHours(d) {
    const iso = isoOf(d), end = '_' + iso;
    return !iso ? [] : Object.keys(CFG).filter(k => k.startsWith('hours_') && k.endsWith(end)).map(k => ({ id: k.slice(6, -end.length), h: hoursOf(k.slice(6, -end.length), d) })).filter(x => x.h);
  }
  const hoursName = (id) => (zoneSpecs[id] || (window.SO_ZONES || {})[id]) ? zoneName(id) : [place(id).name, loc(place(id))];
  function closedNow(id) {
    const h = hoursOf(id);
    if (!h || (G.minute >= h[0] && G.minute < h[1])) return false;
    return !openEpisodes().some(e => e.place === id || zoneOfPlace(e.place) === id);
  }
  const hoursText = (id) => { const h = hoursOf(id); return !h ? '' : h[0] === h[1] ? tr('closed today', '오늘 휴무') : `${clock(h[0])} – ${clock(h[1])}`; };
  function npcsIn(z) {
    const spec = zoneSpec(z);
    const out = [];
    const byPlace = {};
    cast().concat(orphanNpcs()).forEach(n => {
      const pid = npcPlaceNow(n);
      if (!pid || !placeIn(pid, z)) return;
      const pl = spec.places[pid];
      if (!pl) return;
      const k = byPlace[pid] = (byPlace[pid] || 0) + 1;
      // the first one there has the place itself; the others stand round it, clear of the furniture and of one another
      let off = [0, 0];
      if (k > 1) {
        const spots = [];
        for (const r of [0.8, 1.1, 1.4]) for (let j = 0; j < 10; j++) spots.push([Math.cos(k * 2.1 + j * 0.63) * r, Math.sin(k * 2.1 + j * 0.63) * r]);
        const B = spec.walk || [-99, -99, 99, 99];
        const free = (o) => { const x = pl.at[0] + o[0], q = pl.at[1] + o[1];
          return x > B[0] + 0.3 && x < B[2] - 0.3 && q > B[1] + 0.3 && q < B[3] - 0.3 && (z !== zoneId || !solids.some(b => x > b.x0 - NPC_R && x < b.x1 + NPC_R && q > b.z0 - NPC_R && q < b.z1 + NPC_R))
            && !out.some(w => Math.hypot(w.at[0] - x, w.at[1] - q) < 0.6); };
        off = spots.find(free) || spots[0];
      }
      out.push({ row: n, place: pid, at: [pl.at[0] + off[0], pl.at[1] + off[1]], face: pl.face, sit: !!pl.sit && k === 1 });
    });
    return out;
  }
  function orphanNpcs() {     // people named by episodes but missing from the npcs table
    const seen = new Set(cast().map(n => n.id)), out = [];
    episodes().forEach(e => { if (e.npc && !seen.has(e.npc)) { seen.add(e.npc); out.push(npcRow(e.npc)); } });
    return out;
  }
  let npcSig = '';
  function refreshNpcs(force) {
    if (!zoneId) return;
    const want = npcsIn(zoneId);
    const sig = want.map(w => w.row.id + '@' + w.place).join('|');
    if (!force && sig === npcSig) return;
    npcSig = sig;
    const keep = new Set(want.map(w => w.row.id));
    // someone whose place moved while you are here walks there (or out through the nearest door); on entering a zone,
    // at the start of a day or when the debug API sets the clock (force), everyone is simply where they belong
    const live = !force && G && state === 'play' && !busy;
    Object.keys(npcActors).forEach(id => {
      if (keep.has(id)) return;
      const a = npcActors[id];
      if (live && !a.leaving && leaveZone(a)) return;
      if (a.leaving && live) return;
      dropNpc(id);
    });
    want.forEach(w => {
      const put = () => {
        if (!zoneId || !keep.has(w.row.id)) return;
        let a = npcActors[w.row.id];
        if (!a) {
          a = npcActors[w.row.id] = makeActor(w.row.id, w.row.model, { name: w.row.name, row: w.row });
          a.mark = new T.Sprite(new T.SpriteMaterial({ map: bangTex, depthWrite: false, toneMapped: false }));
          a.mark.scale.setScalar(0.2);
          a.mark.position.y = MARK_Y;
          a.mark.renderOrder = 5;
          a.mark.visible = false;
          a.holder.add(a.mark);
          zoneGroup.add(a.holder);
        }
        a.leaving = false;
        const home = w.face ? Math.atan2(w.face[0] - w.at[0], w.face[1] - w.at[1])
          : player ? Math.atan2(player.pos.x - w.at[0], player.pos.z - w.at[1]) : Math.atan2(-w.at[0], -w.at[1]);
        if (a.place !== w.place) {
          const was = a.place;
          a.place = w.place;
          a.goal = { at: w.at, home, sit: w.sit, place: w.place };
          if (live && was) walkTo(a, w.at);
          else arrive(a);
        } else if (force && a.walk) arrive(a);
      };
      if (packs[w.row.model] && packs[w.row.model].status !== 'loading') put();
      else loadPack(w.row.model).then(() => { reportMissing(); put(); });
    });
  }
  function dropNpc(id) {
    const a = npcActors[id];
    if (!a) return;
    if (a.walk && a.walk.req) a.walk.req.cancelled = true;
    zoneGroup.remove(a.holder);
    delete npcActors[id];
    if (bubbles[id]) { bubbles[id].remove(); delete bubbles[id]; }
  }
  // standing at the goal: facing the way the place says, sitting if it is a seat, a cup in hand in a kitchen or at the coffee cart
  function arrive(a) {
    const g = a.goal;
    if (a.walk && a.walk.req) a.walk.req.cancelled = true;
    a.walk = null;
    if (!g) return;
    if (a.leaving) { dropNpc(a.id); return; }
    a.pos.set(g.at[0], 0, g.at[1]);
    a.home = g.home;
    a.heading = g.home;
    a.sit = !!g.sit;
    a.wantCup = !a.sit && /kitchen|coffee/.test(g.place || '');
    holdCup(a, a.wantCup);
    play(a, rest(a), { fade: 0.25 });
    a.gestureAt = elapsed + 12 + Math.random() * 25;
  }
  function walkTo(a, at) {
    if (a.walk && a.walk.req) a.walk.req.cancelled = true;
    a.wantCup = false;
    holdCup(a, false);
    a.sit = false;
    if (gesturing(a) || a.current !== a.actions.walk) play(a, 'idle', { fade: 0.25 });
    const w = a.walk = { path: null, i: 0, blocked: 0, req: null, to: at };
    w.req = requestPath([a.pos.x, a.pos.z], at, {}, (path) => {
      if (a.walk !== w) return;
      w.req = null;
      if (!path) arrive(a);           // no way there: just be there
      else { w.path = path; w.i = 0; }
    });
  }
  function leaveZone(a) {             // out through the nearest door; gone when there
    let best = null, bd = Infinity;
    (Z.portals || []).filter(p => !p.hero).forEach(p => { const d = Math.hypot(p.at[0] - a.pos.x, p.at[1] - a.pos.z); if (d < bd) { bd = d; best = p; } });
    if (!best || bd > 40) return false;
    a.leaving = true;
    a.place = null;
    a.goal = { at: best.at, home: a.heading, sit: false, place: null };
    walkTo(a, best.at);
    return true;
  }

  // ---------------------------------------------------------------- finding a way: A* on a grid of 0.25 over the zone, solids blocked
  // Requests wait in a queue and one is served per frame. Paths are smoothed (straight runs where nothing is in the
  // way) and end at the exact goal, even when the goal itself is next to a desk. (three-pathfinding was tried on
  // 2026-09-27: a navigation mesh of the free cells took 1.3-2.7 s to build per zone, a hitch on every first search,
  // so the grid stays.)
  const NAV_CELL = 0.25;
  let nav = null;
  const pathQueue = [];
  function navGrid() {
    const key = zoneId + ':' + solids.length;
    if (nav && nav.key === key) return nav;
    const w = Z.walk[2] - Z.walk[0], d = Z.walk[3] - Z.walk[1], nx = Math.max(1, Math.ceil(w / NAV_CELL)), nz = Math.max(1, Math.ceil(d / NAV_CELL));
    const g = { key, nx, nz, x0: Z.walk[0], z0: Z.walk[1], block: new Uint8Array(nx * nz) };
    const r = NPC_R * 0.8, m = Math.ceil(r / NAV_CELL);
    for (let i = 0; i < nx; i++) for (let k = 0; k < nz; k++) if (i < m || k < m || i >= nx - m || k >= nz - m) g.block[k * nx + i] = 1;
    solids.forEach(s => {
      const i0 = Math.max(0, Math.floor((s.x0 - r - g.x0) / NAV_CELL)), i1 = Math.min(nx - 1, Math.floor((s.x1 + r - g.x0) / NAV_CELL));
      const k0 = Math.max(0, Math.floor((s.z0 - r - g.z0) / NAV_CELL)), k1 = Math.min(nz - 1, Math.floor((s.z1 + r - g.z0) / NAV_CELL));
      for (let k = k0; k <= k1; k++) for (let i = i0; i <= i1; i++) {
        const cx = g.x0 + (i + 0.5) * NAV_CELL, cz = g.z0 + (k + 0.5) * NAV_CELL;
        if (cx > s.x0 - r && cx < s.x1 + r && cz > s.z0 - r && cz < s.z1 + r) g.block[k * nx + i] = 1;
      }
    });
    return (nav = g);
  }
  function requestPath(from, to, opts, cb) {
    const req = { from, to, opts: opts || {}, cb, zone: zoneId, cancelled: false };
    pathQueue.push(req);
    return req;
  }
  function pathTick() {
    while (pathQueue.length) {
      const r = pathQueue.shift();
      if (r.cancelled || r.zone !== zoneId || !Z) continue;
      let p = null;
      try { p = findPath(r.from, r.to, r.opts); } catch (e) { console.error('Sim Office path:', e); }
      r.cb(p);
      return;                          // one search a frame
    }
  }
  function findPath(from, to, opts) {
    const g = navGrid(), nx = g.nx, nz = g.nz;
    let block = g.block;
    if (opts.avoid && opts.avoid.length) {            // e.g. the player standing in the way: blocked for this search only
      block = block.slice();
      opts.avoid.forEach(c => {
        for (let k = Math.floor((c.z - c.r - g.z0) / NAV_CELL); k <= Math.floor((c.z + c.r - g.z0) / NAV_CELL); k++)
          for (let i = Math.floor((c.x - c.r - g.x0) / NAV_CELL); i <= Math.floor((c.x + c.r - g.x0) / NAV_CELL); i++)
            if (i >= 0 && k >= 0 && i < nx && k < nz) block[k * nx + i] = 1;
      });
    }
    const cellOf = (x, z) => [clamp(Math.floor((x - g.x0) / NAV_CELL), 0, nx - 1), clamp(Math.floor((z - g.z0) / NAV_CELL), 0, nz - 1)];
    const free = (i, k) => i >= 0 && k >= 0 && i < nx && k < nz && !block[k * nx + i];
    function nearestFree(c) {
      if (free(c[0], c[1])) return c;
      for (let r = 1; r < 14; r++) {
        let best = null, bd = Infinity;
        for (let dk = -r; dk <= r; dk++) for (let di = -r; di <= r; di++) {
          if (Math.max(Math.abs(di), Math.abs(dk)) !== r || !free(c[0] + di, c[1] + dk)) continue;
          const dd = di * di + dk * dk;
          if (dd < bd) { bd = dd; best = [c[0] + di, c[1] + dk]; }
        }
        if (best) return best;
      }
      return null;
    }
    const s = nearestFree(cellOf(from[0], from[1])), e = nearestFree(cellOf(to[0], to[1]));
    if (!s || !e) return null;
    const N = nx * nz, sI = s[1] * nx + s[0], eI = e[1] * nx + e[0];
    const gs = new Float32Array(N).fill(Infinity), came = new Int32Array(N).fill(-1), closed = new Uint8Array(N);
    const heap = [], hf = [];
    const h = (i) => { const dx = Math.abs(i % nx - e[0]), dz = Math.abs(Math.floor(i / nx) - e[1]); return Math.max(dx, dz) + 0.4142 * Math.min(dx, dz); };
    const push = (i, f) => {
      heap.push(i); hf.push(f);
      let c = heap.length - 1;
      while (c > 0) { const p = (c - 1) >> 1; if (hf[p] <= hf[c]) break; [heap[p], heap[c]] = [heap[c], heap[p]]; [hf[p], hf[c]] = [hf[c], hf[p]]; c = p; }
    };
    const pop = () => {
      const top = heap[0], li = heap.pop(), lf = hf.pop();
      if (heap.length) {
        heap[0] = li; hf[0] = lf;
        let c = 0;
        for (;;) {
          const l = c * 2 + 1, r = l + 1;
          let m = c;
          if (l < heap.length && hf[l] < hf[m]) m = l;
          if (r < heap.length && hf[r] < hf[m]) m = r;
          if (m === c) break;
          [heap[m], heap[c]] = [heap[c], heap[m]]; [hf[m], hf[c]] = [hf[c], hf[m]]; c = m;
        }
      }
      return top;
    };
    gs[sI] = 0;
    push(sI, h(sI));
    let found = sI === eI, steps = 0;
    while (heap.length && !found && steps++ < 60000) {
      const cur = pop();
      if (closed[cur]) continue;
      closed[cur] = 1;
      const ci = cur % nx, ck = (cur - ci) / nx;
      for (let dk = -1; dk <= 1; dk++) for (let di = -1; di <= 1; di++) {
        if (!di && !dk) continue;
        const ni = ci + di, nk = ck + dk;
        if (!free(ni, nk)) continue;
        if (di && dk && (!free(ci + di, ck) || !free(ci, ck + dk))) continue;      // no cutting corners
        const n = nk * nx + ni, cost = gs[cur] + (di && dk ? 1.4142 : 1);
        if (cost >= gs[n]) continue;
        gs[n] = cost;
        came[n] = cur;
        if (n === eI) { found = true; break; }
        push(n, cost + h(n));
      }
    }
    if (!found) return null;
    const cells = [];
    for (let c = eI; c !== -1; c = came[c]) { cells.push(c); if (c === sI) break; }
    cells.reverse();
    const pts = cells.map(c => [g.x0 + (c % nx + 0.5) * NAV_CELL, g.z0 + (Math.floor(c / nx) + 0.5) * NAV_CELL]);
    // straighten: from each point, jump to the farthest one in plain sight
    const sight = (a, b) => {
      const d = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.ceil(d / (NAV_CELL * 0.5));
      for (let j = 1; j < n; j++) { const c = cellOf(a[0] + (b[0] - a[0]) * j / n, a[1] + (b[1] - a[1]) * j / n); if (!free(c[0], c[1])) return false; }
      return true;
    };
    const out = [pts[0]];
    for (let i = 0; i < pts.length - 1;) {
      let j = pts.length - 1;
      while (j > i + 1 && !sight(pts[i], pts[j])) j--;
      out.push(pts[j]);
      i = j;
    }
    out.push([to[0], to[1]]);
    if (Math.hypot(out[0][0] - from[0], out[0][1] - from[1]) < NAV_CELL) out.shift();
    return out;
  }

  // ---------------------------------------------------------------- the clock, money and energy
  const openEpisodes = () => episodes().filter(isOpen).sort(epOrder);
  function epOrder(a, b) { return ((a.sort || 0) - (b.sort || 0)) || (hm(a.time_from, 0) - hm(b.time_from, 0)) || String(a.id).localeCompare(b.id); }
  const isPhone = (ep) => /(^|,)\s*phone\s*(,|$)/.test(ep.tags || '');
  const isErrand = (ep) => /(^|,)\s*errand\s*(,|$)/.test(ep.tags || '');          // the pharmacy and the clinic: not missions, open when they apply (careDue)
  const dayIn = (ep) => (ep.day_from == null || G.day >= ep.day_from) && (ep.day_to == null || G.day <= ep.day_to);
  // a place id can be in more than one zone (office_door is outside and inside): the zone's own places come first
  function placeIn(pid, z) { const sp = zoneSpec(z).places[pid]; return (!!sp && !sp.guessed) || zoneOfPlace(pid) === z; }
  function isOpen(ep) {
    if (!G) return false;
    if (ROUTINE_OF[ep.id]) { if (!routineDue(ep)) return false; }          // a meeting that comes back: today's, not done yet
    else if (isErrand(ep)) { if (!careDue(ep)) return false; }
    else if (G.done[ep.id] || (ep.day_from != null && G.day < ep.day_from) || (ep.day_to != null && G.day > ep.day_to)) return false;
    if (G.minute < hm(ep.time_from, 0) || G.minute > hm(ep.time_to, 1439) + 0.999) return false;
    if (firedOut(ep.place, ep)) return false;          // let go: the work conversations are over
    return listOf(ep.requires).every(id => G.done[id]);
  }
  function laterToday(ep) {        // not open yet, but will be later today
    if (!G || isOpen(ep) || firedOut(ep.place, ep) || isErrand(ep)) return false;
    if (ROUTINE_OF[ep.id]) { if (!routineDue(ep)) return false; }
    else if (G.done[ep.id] || (ep.day_from != null && G.day < ep.day_from) || (ep.day_to != null && G.day > ep.day_to)) return false;
    return hm(ep.time_from, 0) > G.minute && listOf(ep.requires).every(id => G.done[id]);
  }
  function tickClock(dt) {
    const mins = dt * (+CFG.minutes_per_second || 1) * debugSpeed;
    advanceMinutes(mins);
  }
  function advanceMinutes(mins) {
    if (!G) return;
    G.minute += mins;
    G.energy = clamp(G.energy + (+CFG.energy_per_hour || -6) * mins / 60, 0, E_MAX);
    if (G.minute >= DAY_END && state === 'play') { toast("It's late. You fall asleep.", '늦었어요. 잠이 듭니다.'); goToSleep(true); }
  }
  function pay(amount, text, type, extra) {
    const before = G.money;
    G.money = Math.round((G.money + amount) * 100) / 100;
    logEvent(type || (amount >= 0 ? 'income' : 'spend'), text, amount, extra);
    if (amount < 0) bankWatch(before);
  }
  // The bank: a payment that takes the account below zero costs an overdraft fee (config overdraft_fee, once a day),
  // and falling below config low_balance brings an alert on the phone
  function bankWatch(before) {
    const fee = +CFG.overdraft_fee || 0, low = +CFG.low_balance || 0;
    if (fee && G.money < 0 && G.feeDay !== G.day) {
      G.feeDay = G.day;
      G.money = Math.round((G.money - fee) * 100) / 100;
      logEvent('fee', 'Overdraft fee', -fee);
      notify(CFG.bank_name, `Your checking account is overdrawn. A ${usd2(fee)} overdraft fee was charged. Available balance: ${usd2(G.money)}.`,
        `계좌 잔액이 마이너스가 되어 초과 인출 수수료 ${usd2(fee)}가 부과되었습니다. 잔액: ${usd2(G.money)}. (overdrawn: 잔액보다 많이 빠져나간)`);
    } else if (low && before >= low && G.money < low && G.money >= 0) {
      notify(CFG.bank_name, `Low balance alert: checking ···4821 is at ${usd2(G.money)}.`, `잔액 부족 알림: 계좌 잔액이 ${usd2(G.money)}입니다.`);
    }
  }
  // ---------------------------------------------------------------- work: the score, showing up on time, getting fired
  // G.score: points for what you say (the right answer the first time 10, the second time 5, later 2) and for showing up
  // on a working day (on time +5, late −10, in after noon −20, not at all −30). Holidays are working days at the office.
  // G.work = { pts, record { day: on | late | noon | absent | trip | sick }, warned 0..2, fired (day), streak }: strikes
  // for being late (config late_points), coming in after noon (noon_points) or not coming (absent_points); five on-time
  // days in a row take one off. At warn_points the manager has a word with you (a text), at final_points HR sends a
  // final written warning, at fire_points you are let go: the last paycheck (the days you worked since the last payday)
  // comes at once, the work conversations are over, and your badge no longer opens the door of the office.
  const WORK_ZONES = ['office'].concat(TRAVEL_ZONES);
  const BOSS = 'maya', HR = 'linda';
  const work = () => G.work || (G.work = { pts: 0, record: {}, warned: 0, fired: null, streak: 0 });
  const fired = () => !!G && !!G.work && !!G.work.fired;
  // pay every other Friday: the hero's, times the raises from reviews (G.raise, 1 at the start); with the plans table,
  // the pay stub of day d (today by default): the benefits and the 401(k) in effect then (see benefits, below)
  const netPay = (d) => benefitsOn() ? payStub(d).net : cents(+hero().salary_net * ((G && G.raise) || 1)), grossPay = (d) => benefitsOn() ? payStub(d).gross : Math.round(+hero().salary_gross * ((G && G.raise) || 1));
  const colleague = (id) => !!NPCS[id] && !!NPCS[id].place && zoneOfPlace(NPCS[id].place) === 'office';
  const firedOut = (pid, ep) => fired() && ((!!pid && WORK_ZONES.includes(zoneOfPlace(pid))) || (!!ep && isPhone(ep) && colleague(ep.npc)));
  const score = () => G ? Math.round(G.score || 0) : 0;
  function addScore(n, en, ko) {
    if (!G || !n) return;
    G.score = (G.score || 0) + n;
    G.points = (G.points || []).concat({ day: G.day, minute: Math.floor(G.minute), n, en, ko }).slice(-300);
    const sc = $('hud-score');
    if (sc) { sc.classList.remove('pop', 'up', 'down'); void sc.offsetWidth; sc.classList.add('pop', n > 0 ? 'up' : 'down'); }
  }
  const STANDING = [['Good standing', '근무 양호', 'ok'], ['Verbal warning', '구두 경고', 'warn'], ['Final warning', '최종 경고', 'bad'], ['Let go', '해고됨', 'fired']];
  const standing = () => !G ? STANDING[0] : fired() ? STANDING[3] : STANDING[(G.work && G.work.warned) || 0];
  const ATTEND = {
    on: ['On time', '정시 출근', 5], late: ['Late', '지각', -10], noon: ['In after noon', '오후 출근', -20], absent: ['Did not come in', '결근', -30],
    trip: ['Business trip', '출장', 0], sick: ['Called in sick', '병가', 0], pto: ['PTO', '연차', 0], early: ['Left early', '조퇴', -10]
  };
  // the first time at work on a working day: on time, late, or in after lunch (from travel)
  function checkIn() {
    const w = work(), d = G.day, m = Math.floor(G.minute), start = hm(CFG.work_start, 540);
    G.inDay = d; G.inAt = m;
    if (w.fired || myOff(d)) return null;
    const kind = m <= hm(CFG.late_after, 555) ? 'on' : m < 12 * 60 ? 'late' : 'noon';
    w.record[d] = kind;
    addScore(ATTEND[kind][2], ATTEND[kind][0], ATTEND[kind][1]);
    if (kind === 'on') { onTime(); return kind; }
    G.lateDay = d;
    w.streak = 0;
    toast(kind === 'late' ? `You're late: it's ${clock(m)}, and work starts at ${clock(start)}.` : `It's ${clock(m)}. You've missed the whole morning.`,
      kind === 'late' ? `지각이에요. 지금은 ${clockKo(m)}이고 업무는 ${clockKo(start)}에 시작해요.` : `지금은 ${clockKo(m)}. 오전을 통째로 빠졌어요.`, 'bad', 4.5);
    strike(kind === 'late' ? +CFG.late_points : +CFG.noon_points, true, 'late');
    return kind;
  }
  function onTime() {
    const w = work();
    w.streak = (w.streak || 0) + 1;
    if (w.streak % 5 === 0 && w.pts > 0) { w.pts--; return true; }        // a good week makes up for a bad morning
    return false;
  }
  // at the end of a working day (from goToSleep): you never came in, or you were on a trip or called in sick
  function closeDay(d, away) {
    const w = work();
    if (w.fired || offWork(d)) return null;
    if (w.record[d]) return leftEarly(d, away);
    const off = leaveOf(d);          // you texted in sick, or took the day as PTO
    const kind = off ? (off === 'pto' ? 'pto' : 'sick') : (away || G.tripDay === d) ? 'trip' : G.inDay === d ? null : 'absent';
    if (!kind) return null;
    w.record[d] = kind;
    if (kind !== 'absent') return kind;
    w.streak = 0;
    addScore(ATTEND.absent[2], ATTEND.absent[0], ATTEND.absent[1]);
    strike(+CFG.absent_points, false, 'absent');
    return kind;
  }
  // you came in, went out before early_before and never came back (not for a trip): left early (w.left { day: minute })
  function leftEarly(d, away) {
    const w = work();
    if (G.outDay !== d || G.outAt == null || away || G.tripDay === d || !/^(on|late|noon)$/.test(w.record[d])) return null;
    w.left = Object.assign({}, w.left, { [d]: G.outAt });
    w.streak = 0;
    addScore(ATTEND.early[2], ATTEND.early[0], ATTEND.early[1]);
    strike(+CFG.early_points, false, 'early');
    return 'early';
  }
  // strikes add up: a word from the manager, a final warning from HR, and then you are let go
  function strike(n, now, why) {
    const w = work();
    w.pts += n;
    if (w.pts >= +CFG.fire_points) { fire(now); return; }
    if (w.pts >= +CFG.final_points && w.warned < 2) {
      w.warned = 2;
      notify(HR, `FINAL WRITTEN WARNING. ${G.name}, this is a formal warning about your attendance: you have been late, absent or gone early too often. One more late arrival, early departure or unexcused absence will lead to the end of your employment with ${CFG.company}. Please come see me if something is going on. — ${(NPCS[HR] || { name: 'HR' }).name}, HR`,
        `최종 서면 경고. ${hero().name_ko || G.name} 님, 근태에 관한 공식 경고입니다. 지각·결근·조퇴가 너무 잦습니다. 한 번 더 지각·조퇴하거나 무단결근하면 ${CFG.company}와의 고용 관계가 종료됩니다. 무슨 사정이 있다면 찾아와 주세요. — 인사팀 ${(NPCS[HR] || {}).name_ko || (NPCS[HR] || { name: 'HR' }).name}`, 'email');
    } else if (w.pts >= +CFG.warn_points && w.warned < 1) {
      w.warned = 1;
      const me = hero().name_ko || G.name, home = hybridStrike(why);          // hybrid work: the words for a remote day
      if (home) notify(BOSS, home[0], home[1], 'text');
      else if (why === 'early') notify(BOSS, `Hey ${G.name}, I came by your desk this afternoon and you had already left. Everything okay? Unless we've talked about it, please stay at least until ${clock(EARLY())}.`,
        `${me}, 오후에 자리에 가 봤더니 벌써 퇴근했더라고요. 괜찮아요? 미리 얘기한 게 아니면 적어도 ${clockKo(EARLY())}까지는 있어 주세요.`, 'text');
      else if (why === 'absent') notify(BOSS, `Hey ${G.name}, you didn't come in and I didn't hear from you. Everything okay? If you're sick, just text me before standup.`,
        `${me}, 출근도 안 하고 연락도 없었네요. 괜찮아요? 아프면 스탠드업 전에 문자만 주세요.`, 'text');
      else notify(BOSS, `Hey ${G.name}, I noticed you weren't here on time. Everything okay? We need you at standup. Please be in by ${clock(hm(CFG.work_start, 540))} from now on.`,
        `${me}, 오늘 제시간에 안 왔던데 괜찮아요? 스탠드업에 꼭 있어야 해요. 앞으로는 ${clockKo(hm(CFG.work_start, 540))}까지 와 주세요.`, 'text');
    }
    if (now) saveGame();
  }
  function fire(now, why) {          // why: 'probation' (not through probation), otherwise attendance
    const w = work();
    if (w.fired) return;
    w.fired = G.day;
    let lastPay = G.day;
    while (lastPay > 0 && !isPayday(lastPay)) lastPay--;
    const worked = Object.keys(w.record).filter(d => +d > lastPay && /^(on|late|noon|trip|sick|pto)$/.test(w.record[d]) && leaveOf(+d) !== 'unpaid').length;
    const final = cents(netPay() * worked / 10);
    addScore(-50, 'Let go', '해고');
    const because = why === 'probation' ? ['you did not pass your extended probation', '연장된 수습 기간을 통과하지 못해'] : ['of repeated lateness and absences', '잦은 지각과 결근으로'];
    notify(HR, `${G.name}, as we discussed, your employment with ${CFG.company} ends today because ${because[0]}. Your badge and your accounts have been turned off.${final ? ` Your final paycheck of ${usd2(final)} has been deposited.` : ''} Please return your laptop to the front desk. We wish you well.`,
      `${hero().name_ko || G.name} 님, ${because[1]} 오늘부로 ${CFG.company}와의 고용이 종료됩니다. 출입증과 계정은 비활성화되었습니다.${final ? ` 마지막 급여 ${usd2(final)}가 입금되었습니다.` : ''} 노트북은 프런트에 반납해 주세요. 앞날에 행운을 빕니다.`, 'email');
    if (final) pay(final, 'Final paycheck (direct deposit)', 'income', { ko: '마지막 급여 (계좌 입금)' });
    logEvent('fired', 'Let go', 0, { ko: '해고됨' });
    if (now) letGo();
  }
  // fired on the spot, at work: the manager and HR walk you out
  function letGo() {
    saveGame();
    if (zoneId !== 'office' && remoteDay(G.day)) { letGoRemote(); return; }          // hybrid work: at home, on a video call
    const boss = firstName(NPCS[BOSS] || { name: 'Maya' }), hr = firstName(NPCS[HR] || { name: 'Linda' });
    showCard({ kicker: CFG.company, title: tr("You're let go", '해고되었습니다'),
      body: tr(`<p>${esc(boss)} and ${esc(hr)} from HR are waiting for you by the front desk.</p><p class="quote">“${esc(G.name)}, we've talked about this. You've been late or absent too many times, so we're letting you go, effective today. I'm sorry it came to this.”</p><p>Your badge is turned off and you're walked out of the building. Your final paycheck goes to your bank account.</p>`,
        `<p>${esc(josa(boss, '과', '와'))} 인사팀 ${esc(josa(hr, '이', '가'))} 프런트 옆에서 기다리고 있어요.</p><p class="quote">“${esc(myName())}, 이 얘기는 전에도 했죠. 지각과 결근이 너무 많아서 오늘부로 함께할 수 없게 됐어요. 이렇게 돼서 유감이에요.”</p><p>출입증이 비활성화되고 건물 밖으로 안내받습니다. 마지막 급여는 은행 계좌로 들어옵니다.</p>`),
      ok: tr('Leave the building', '건물에서 나가기'), state: 'card' }, () => { travel('city', 'office_door'); });
    speak(`${G.name}, we've talked about this. You've been late or absent too many times, so we're letting you go, effective today.`, voiceOf(NPCS[BOSS]));
  }
  // at the door of the office after you were let go: the badge reader blinks red and the front desk stops you
  function stoppedAtDoor() {
    const w = work(), desk = NPCS.tom ? 'tom' : null, who = desk ? firstName(NPCS[desk]) : tr('The guard', '경비원');
    const line = `Sorry, ${G.name}. Your badge has been deactivated, and I can't let you in. If you left anything at your desk, HR will mail it to you.`;
    if (w.stopDay === G.day) { toast(tr('Your badge no longer opens this door.', '출입증으로 더는 이 문을 열 수 없어요.'), null, 'bad', 3); return; }
    w.stopDay = G.day;
    saveGame();
    showCard({ kicker: tr('At the front door', '정문 앞'), title: tr('Your badge doesn\'t work', '출입증이 안 열려요'),
      body: tr(`<p>The badge reader beeps and blinks red. ${esc(who)} comes over from the front desk.</p><p class="quote">“${esc(line)}”</p><p>You no longer work at ${esc(CFG.company)}.</p>`,
        `<p>출입증 리더기가 삐 소리를 내며 빨간 불이 깜빡입니다. 프런트에서 ${esc(josa(who, '이', '가'))} 다가옵니다.</p><p class="quote">“미안해요, ${esc(myName())}. 출입증이 비활성화돼서 들여보내 드릴 수가 없어요. 자리에 두고 간 물건은 인사팀이 우편으로 보내 줄 거예요.”</p><p>이제 ${esc(CFG.company)} 직원이 아닙니다.</p>`),
      ok: tr('Walk away', '돌아서기'), state: 'card' });
    speak(line, voiceOf(desk ? NPCS[desk] : null));
  }
  // ---------------------------------------------------------------- missions, then free play
  // Every conversation of the hero is a mission of the first config mission_days days (15: two weeks and the Monday
  // after). Finishing all
  // of them: a congratulation, a bonus deposit (mission_bonus) and points (mission_points). From the day after, it is
  // free play: no set conversations, only the town, the bills and the job (work still starts at 9:00, and late
  // mornings still add up). G.mission = { day, all (every mission done), bonus } once the missions are settled.
  const MISSION_DAYS = +CFG.mission_days || 14;
  const missions = () => episodes().filter(e => (e.day_from || 1) <= MISSION_DAYS && !isErrand(e));
  const missionsOf = (id) => rows('episodes').filter(e => (e.hero || DEFAULT_HERO) === id && (e.day_from || 1) <= MISSION_DAYS && !isErrand(e)).length;
  const missionCount = () => { const all = missions(); return [all.filter(e => G.done[e.id]).length, all.length]; };
  const freePlay = () => !!G && G.day > MISSION_DAYS;
  // ---------------------------------------------------------------- meetings that come back (routines table)
  // After the missions, on working days: the daily standup, a 1:1 every other week, sprint planning and retro, the
  // monthly all-hands. A routine takes its conversations (only the hero's own) in turn; one opens around its time like
  // any other conversation and is done for that day only (G.rdone { '<routine>@<day>': 1 }). A meeting you miss on a
  // day you came in costs miss_points and gets a text from the manager (missedRoutines, at the end of the day).
  const ROUTINES = rows('routines').slice().sort((a, b) => (a.sort || 0) - (b.sort || 0));
  const ROUTINE_OF = {};
  ROUTINES.forEach(r => listOf(r.episodes).concat(listOf(r.remote_episodes)).forEach(id => { if (!ROUTINE_OF[id]) ROUTINE_OF[id] = r; }));
  const routineDays = (r, d) => listOf(hybridOn(d) && r.hybrid_days ? r.hybrid_days : r.days);          // hybrid work: some meetings move to office days
  function routineOn(r, d) {
    if (d <= MISSION_DAYS || myOff(d) || !forHero(r.hero, G.hero) || !routineDays(r, d).includes(DAY_NAMES[(d - 1) % 7])) return false;
    if (r.every === '2weeks') return Math.floor((d - 1) / 7) % 2 === (+r.parity || 0);
    if (r.every === 'month') { const t = dateOf(d); return !!t && t.getUTCDate() <= 7; }
    return true;
  }
  const routineMemo = {};
  function routinesOn(d) {          // that day's meetings: [{ r, ep, key }]
    if (!G) return [];
    const remote = remoteDay(d), k = G.hero + '@' + d + (remote ? '@' + callPlace(d) : '');
    if (routineMemo[k]) return routineMemo[k];
    const out = [];
    ROUTINES.forEach(r => {
      if (!routineOn(r, d)) return;
      // a remote day: a video call, from the routine's own pool for those (remote_episodes) when it has one
      const away = (x) => !!r.remote_episodes && remoteDay(x), own = away(d);
      const pool = listOf(own ? r.remote_episodes : r.episodes).map(id => EPISODES[id]).filter(e => e && mine(e));
      if (!pool.length) return;
      let n = 0;
      for (let x = MISSION_DAYS + 1; x < d; x++) if (routineOn(r, x) && away(x) === own) n++;
      const ep = pool[n % pool.length];
      out.push({ r, ep: remote ? asCall(ep, d) : ep, key: r.id + '@' + d });
    });
    return (routineMemo[k] = out);
  }
  const routineDue = (ep) => routinesOn(G.day).some(x => x.ep.id === ep.id && !(G.rdone && G.rdone[x.key]));
  function routineCal() {          // the meetings on the calendar, from last week to two weeks ahead
    if (!G || !ROUTINES.length) return [];
    const out = [], d0 = Math.floor((G.day - 1) / 7) * 7 + 1;
    for (let d = Math.max(MISSION_DAYS + 1, d0 - 7); d < d0 + 14; d++) routinesOn(d).forEach(x => {
      if (x.ep.remote) { if (!fired()) out.push({ day: d, time: x.r.time, title: x.r.title + ' (video call)', title_ko: (x.r.title_ko || x.r.title) + ' (화상 회의)', place: x.ep.place, episode: x.ep.id, rkey: x.key }); return; }          // hybrid work
      out.push({ day: d, time: x.r.time, title: x.r.title, title_ko: x.r.title_ko, place: x.r.place, episode: x.ep.id, rkey: x.key });
    });
    return out;
  }
  const meetingName = (r) => /^\d/.test(r.title) ? 'your ' + r.title : 'the ' + r.title.charAt(0).toLowerCase() + r.title.slice(1);          // the daily standup, your 1:1 with Maya
  function missedRoutines(d) {
    const w = work();
    if (w.fired || !/^(on|late|noon)$/.test(w.record[d] || '')) return [];
    const miss = routinesOn(d).filter(x => !(G.rdone && G.rdone[x.key]) && !coveredFor(x, d));          // a close friend may give your update
    miss.forEach(x => addScore(-(x.r.miss_points == null ? 5 : +x.r.miss_points), `Missed: ${x.r.title}`, `빠짐: ${x.r.title_ko || x.r.title}`));
    if (miss.length) notify(BOSS, `Hey ${G.name}, we missed you at ${miss.map(x => meetingName(x.r)).join(' and ')} today. Please make it to the team meetings, or give me a heads-up if you can't.`,
      `${hero().name_ko || G.name}, 오늘 ${miss.map(x => x.r.title_ko || x.r.title).join('·')}에 안 보이던데요. 팀 회의에는 꼭 와 주고, 못 오면 미리 알려 줘요.`, 'text');
    return miss;
  }
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
    const seen = {};
    (G.taskLog || []).forEach(x => { seen[x.id] = x.day; });
    const pool = TASKS.filter(t => mine(t) && (t.day_from || 1) <= G.day && (!t.time_from || hm(t.time_from, 0) <= G.minute) && (!t.time_to || G.minute <= hm(t.time_to, 1439)));
    if (!pool.length) return null;
    const oldest = Math.min(...pool.map(t => seen[t.id] || 0));
    if (oldest && G.day - oldest < 14) return null;          // everything came up in the last two weeks
    const fresh = pool.filter(t => (seen[t.id] || 0) === oldest);
    return fresh[Math.floor(Math.random() * fresh.length)];
  }
  let taskNow = null;          // { t, order, picked }
  const bestChoice = (t) => (t.choices || []).reduce((b, c, i, a) => (+c.points || 0) > (+a[b].points || 0) ? i : b, 0);
  function showTask(t) {
    const k = TASK_KIND[t.kind] || ['📌', pretty(t.kind), t.kind], from = t.sender && NPCS[t.sender];
    taskNow = { t, order: shuffle((t.choices || []).map((_, i) => i)) };
    showCard({ kicker: `${k[0]} ${tr(k[1], k[2])}${from ? ' · ' + fullName(from) : ''}`, title: shown(t.title, t.title_ko),
      body: `<p>${esc(shown(t.body, t.body_ko))}</p>${friendTip(t)}<p class="fine">${tr('What do you do?', '어떻게 할까요?')}</p><div class="choices">${taskNow.order.map(i => `<button type="button" data-task="${i}">${esc(shown(t.choices[i].t, t.choices[i].t_ko))}</button>`).join('')}</div>`,
      ok: tr('Back to work', '다시 일하기'), state: 'card', choose: true }, () => { taskNow = null; goalTimer = 0; });
  }
  function chooseTask(i) {
    if (!taskNow || !taskNow.t.choices[i]) return false;
    const t = taskNow.t, c = t.choices[i], n = Math.round(+c.points || 0), mins = Math.max(0, +c.minutes || 0);
    taskNow = Object.assign({}, taskNow, { picked: i });
    G.taskLog = (G.taskLog || []).concat({ day: G.day, id: t.id, pick: i, n }).slice(-200);
    addScore(n, t.title, t.title_ko);
    friendTask(t, n);
    if (mins) { (G.worked = G.worked || {})[G.day] = workedOn(G.day) + mins; G.minute += mins; }          // the time it takes is work too (no falling asleep on a card)
    const card = $('card');
    card.querySelector('.card-body').innerHTML = `<p class="quote">${esc(shown(c.t, c.t_ko))}</p><p>${esc(shown(c.r, c.r_ko))}</p>
      <p class="score-line">${n ? `${n > 0 ? '+' : '−'}${Math.abs(n)} ${tr('points', '점')}` : tr('No points', '점수 없음')}${mins ? ` · ${tr(`${mins} min`, `${mins}분`)}` : ''} · ${tr('now', '지금')} ${clk(G.minute)}</p>`;
    card.classList.remove('choose');
    setTimeout(() => card.querySelector('.ok').focus(), 50);
    return true;
  }
  $('card').addEventListener('click', (e) => { const b = e.target.closest('button[data-task]'); if (b) chooseTask(+b.dataset.task); });
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
  // ---------------------------------------------------------------- time off: PTO and sick days
  // What Maya says on day 4: PTO builds up a little every paycheck (config pto_hours_year, 15 days a year), and sick
  // days are separate: config sick_hours (40, California's minimum) at the start, back to full on January 1. You text
  // your manager before standup (config sick_call_by) to be out sick today, or later for the next working day; with no
  // sick time left it comes out of PTO, and with none of that either the day is unpaid (taken off the next paycheck).
  // PTO is asked for in the HR portal at least config pto_notice_days ahead, after the missions; the manager answers
  // the next morning (no: not enough PTO, or the team's sprint planning). A day of leave is a day off for you: no
  // attendance, no meetings, no week review hours (myOff). G.leave = { pto, sick (hours), days { day: pto | sick |
  // unpaid }, req [{ day, made, status pending | approved | declined | cancelled, why }], unpaid (days to take off pay) }.
  const perHero = (v, id, def) => { const s = String(v == null ? '' : v); if (!/:/.test(s)) return s === '' ? def : +s; const m = listOf(s).map(x => x.split(':')).find(x => x[0].trim() === id); return m ? +m[1] : def; };
  const LEAVE_DAY = 8, SICK_HOURS = +CFG.sick_hours || 40, PTO_NOTICE = +CFG.pto_notice_days || 14;
  const ptoPerPay = () => Math.round(perHero(CFG.pto_hours_year, G.hero, 120) / 26 * 100) / 100;
  const leave = () => G.leave || (G.leave = { pto: perHero(CFG.pto_start, G.hero, 0), sick: SICK_HOURS, days: {}, req: [], unpaid: 0 });
  const leaveOf = (d) => !G ? null : (G.leave && G.leave.days[d]) || (G.sickFor === d ? 'sick' : null);
  const myOff = (d) => offWork(d) || !!leaveOf(d);          // a day you are not expected at work
  const days1 = (h) => Math.round(h / LEAVE_DAY * 10) / 10;
  const leaveText = (h) => tr(`${Math.round(h * 10) / 10} h (${days1(h)} day${days1(h) === 1 ? '' : 's'})`, `${Math.round(h * 10) / 10}시간(${days1(h)}일)`);
  const nextWorkday = (d) => { while (myOff(d)) d++; return d; };
  function leaveChanged() { Object.keys(routineMemo).forEach(k => delete routineMemo[k]); goalTimer = 0; }
  // texting in sick: today before standup if you have not come in yet, otherwise the next working day
  function sickTarget() {
    if (!G || fired()) return null;
    const today = G.minute < hm(CFG.sick_call_by, 570) && !myOff(G.day) && G.inDay !== G.day;
    if (today) return G.day;
    let d = G.day + 1;
    while (offWork(d) || leaveOf(d) === 'pto') d++;          // the next day you would go in (already off sick: nothing to text)
    return d;
  }
  function takeSick(d, quiet) {
    const L = leave();
    if (leaveOf(d) || offWork(d)) return null;
    const from = L.sick >= LEAVE_DAY ? 'sick' : L.pto >= LEAVE_DAY ? 'pto' : 'unpaid';
    if (from === 'sick') L.sick -= LEAVE_DAY; else if (from === 'pto') L.pto -= LEAVE_DAY; else L.unpaid = (L.unpaid || 0) + 1;
    L.days[d] = from === 'unpaid' ? 'unpaid' : 'sick';
    G.sickFor = d;
    leaveChanged();
    logEvent('leave', 'Called in sick', 0, { ko: '병가 연락' });
    const when = d === G.day ? 'today' : weekday(d), whenKo = d === G.day ? '오늘' : WEEKDAYS_KO[(d - 1) % 7];
    const recent = Object.keys(L.days).filter(x => +x > d - 30 && +x <= d && L.days[x] !== 'pto').length;
    if (!quiet) {
      notify(BOSS, `Sorry to hear that, ${G.name}. Take ${when} off and rest. I'll let the team know.${from === 'pto' ? ' You\'re out of sick time, so this comes out of your PTO.' : from === 'unpaid' ? ' You\'re out of sick time and PTO, so this one will be unpaid.' : ''}`,
        `${hero().name_ko || G.name}, 저런. ${whenKo}은 쉬면서 몸조리해요. 팀에는 내가 말해 둘게요.${from === 'pto' ? ' 병가가 다 떨어져서 이번은 연차에서 빠져요.' : from === 'unpaid' ? ' 병가도 연차도 없어서 이번은 무급이에요.' : ''}`, 'text');
      if (recent === 3) notify(BOSS, `${G.name}, I noticed you've been out sick a few times this month. No problem with that, but if something's going on, I'm happy to talk. Your health comes first.`,
        `${hero().name_ko || G.name}, 이번 달에 몇 번 아팠네요. 쉬는 건 괜찮은데, 혹시 무슨 일이 있으면 편하게 얘기해요. 건강이 먼저예요.`, 'text');
    }
    return { day: d, from };
  }
  function callInSick() {
    const d = sickTarget();
    if (d == null) return null;
    if (leaveOf(d)) { toast(`You're already off on ${dShort(d)}.`, `${dShort(d)}은 이미 쉬는 날이에요.`, null, 3); return null; }
    const r = takeSick(d);
    if (r) toast(tr(`You texted ${firstName(NPCS[BOSS])}: out sick ${d === G.day ? 'today' : dShort(d)}.`, `${firstName(NPCS[BOSS])}에게 문자: ${d === G.day ? '오늘' : dShort(d)} 병가.`), null, null, 3.5);
    return r;
  }
  // PTO: the days you can ask for (working days after the missions, at least pto_notice_days ahead, in the next 8 weeks)
  function ptoDays() {
    const out = [];
    for (let d = Math.max(G.day + PTO_NOTICE, MISSION_DAYS + 1); d <= G.day + 56; d++) if (!myOff(d) && !leave().req.some(r => r.day === d && r.status === 'pending')) out.push(d);
    return out;
  }
  const pendingPto = () => leave().req.filter(r => r.status === 'pending').length * LEAVE_DAY;
  function requestPto(d) {
    const L = leave();
    if (fired() || !ptoDays().includes(+d)) return false;
    if (L.pto - pendingPto() < LEAVE_DAY) { toast(`Not enough PTO: you have ${leaveText(L.pto - pendingPto())} free.`, `연차가 부족해요: 쓸 수 있는 건 ${leaveText(L.pto - pendingPto())}.`, 'bad', 3.5); return false; }
    L.req.push({ day: +d, made: G.day, status: 'pending' });
    logEvent('leave', 'Asked for PTO', 0, { ko: '연차 신청' });
    toast(`PTO request sent for ${dShort(+d)}. ${firstName(NPCS[BOSS])} will answer by tomorrow.`, `${dShort(+d)} 연차를 신청했어요. ${firstName(NPCS[BOSS])}가 내일까지 답할 거예요.`, null, 3.5);
    return true;
  }
  function cancelPto(d) {
    const L = leave(), r = L.req.find(x => x.day === +d && (x.status === 'pending' || x.status === 'approved'));
    if (!r || +d <= G.day) return false;
    if (r.status === 'approved') { L.pto += LEAVE_DAY; delete L.days[d]; leaveChanged(); }
    r.status = 'cancelled';
    return true;
  }
  // the next morning (from goToSleep): the manager answers PTO requests; payday adds PTO and takes off unpaid days;
  // January 1 fills the sick time again. Returns lines for the morning card.
  function leaveMorning() {
    const L = leave(), out = [], boss = firstName(NPCS[BOSS] || { name: 'Maya' }), me = hero().name_ko || G.name;
    L.req.filter(r => r.status === 'pending').forEach(r => {
      const planning = ROUTINES.some(x => x.id === 'planning' && routineOn(x, r.day));
      if (fired()) r.status = 'declined';
      else if (L.pto < LEAVE_DAY) { r.status = 'declined'; r.why = 'balance'; }
      else if (planning) { r.status = 'declined'; r.why = 'planning'; }
      else { r.status = 'approved'; L.pto -= LEAVE_DAY; L.days[r.day] = 'pto'; leaveChanged(); }
      if (fired()) return;
      const day = dateLong(r.day), dayKo = dateKo(r.day);
      if (r.status === 'approved') {
        notify(BOSS, `Approved your PTO for ${day}. Enjoy! Just make sure anything urgent is handed off before you go.`, `${dayKo} 연차 승인했어요. 잘 쉬어요! 급한 일은 가기 전에 넘겨 주고요.`, 'text');
        out.push(tr(`🏖️ ${esc(boss)} approved your PTO for <b>${esc(day)}</b>. PTO left: ${leaveText(L.pto)}.`, `🏖️ ${esc(josa(boss, '이', '가'))} <b>${esc(dayKo)}</b> 연차를 승인했어요. 남은 연차: ${leaveText(L.pto)}.`));
      } else {
        const why = r.why === 'planning' ? ['that\'s our sprint planning day, and I need everyone there. Could you pick another day?', '그날은 스프린트 계획 날이라 다 있어야 해요. 다른 날로 골라 줄래요?']
          : ['you don\'t have enough PTO built up for that yet.', '아직 그만큼 연차가 쌓이지 않았어요.'];
        notify(BOSS, `Sorry, ${G.name}, I can't approve PTO for ${day}: ${why[0]}`, `${me}, 미안해요. ${dayKo} 연차는 승인하기 어려워요. ${why[1]}`, 'text');
        out.push(tr(`🗓️ ${esc(boss)} turned down your PTO for <b>${esc(day)}</b>: ${esc(why[0])}`, `🗓️ ${esc(josa(boss, '이', '가'))} <b>${esc(dayKo)}</b> 연차를 거절했어요. ${esc(why[1])}`));
      }
    });
    const t = dateOf(G.day);
    if (t && t.getUTCMonth() === 0 && t.getUTCDate() === 1) { L.sick = SICK_HOURS; out.push(tr(`🩺 A new year: your sick time is back to ${leaveText(SICK_HOURS)}.`, `🩺 새해가 되어 병가가 ${leaveText(SICK_HOURS)}으로 다시 채워졌어요.`)); }
    const d = leaveOf(G.day);
    if (d === 'pto') out.push(tr('🏖️ You\'re on <b>PTO</b> today. No work: the day is yours, and it\'s paid.', '🏖️ 오늘은 <b>연차</b>예요. 출근하지 않아도 되고, 유급이에요.'));
    else if (d) out.push(tr(`🤒 You're out sick today${d === 'unpaid' ? ' (unpaid)' : ''}. Stay home and rest.`, `🤒 오늘은 병가예요${d === 'unpaid' ? '(무급)' : ''}. 집에서 쉬세요.`));
    return out;
  }
  function sickButton() {
    const d = sickTarget();
    if (d == null || leaveOf(d)) return '';
    return `<button type="button" data-leave="sick">${tr(`🤒 Text ${esc(firstName(NPCS[BOSS]))}: out sick ${d === G.day ? 'today' : esc(dShort(d))}`, `🤒 ${esc(firstName(NPCS[BOSS]))}에게 문자: ${d === G.day ? '오늘' : esc(dShort(d))} 병가`)}</button>`;
  }
  function leavePanel() {          // Work record: the balances, the requests, asking for PTO and texting in sick
    const L = leave(), free = L.pto - pendingPto(), opts = ptoDays();
    const ST = { pending: ['waiting for an answer', '답을 기다리는 중'], approved: ['approved', '승인됨'], declined: ['turned down', '거절됨'], cancelled: ['cancelled', '취소함'] };
    const reqs = L.req.filter(r => r.day >= G.day - 7).slice().sort((a, b) => a.day - b.day);
    const sick = Object.keys(L.days).map(Number).filter(d => L.days[d] !== 'pto').sort((a, b) => b - a).slice(0, 5);
    return `<h3>${tr('Time off', '휴가')}</h3><div class="sum"><div><b>${leaveText(L.pto)}</b>${tr('PTO', '연차')}</div><div><b>${leaveText(L.sick)}</b>${tr('sick time', '병가')}</div></div>
      <p class="fine">${tr(`PTO builds up ${ptoPerPay()} h every payday. Ask for it in the HR portal at least ${PTO_NOTICE} days ahead; ${esc(firstName(NPCS[BOSS]))} answers the next morning. Sick time is separate: text your manager before ${clock(hm(CFG.sick_call_by, 570))} to be out today, or later for the next working day. It fills up again on January 1. With no sick time left a sick day comes out of PTO, and then it's unpaid.`,
        `연차는 월급날마다 ${ptoPerPay()}시간씩 쌓여요. HR 포털에서 적어도 ${PTO_NOTICE}일 전에 신청하면 ${esc(firstName(NPCS[BOSS]))}가 다음 날 아침에 답해요. 병가는 따로예요: ${clockKo(hm(CFG.sick_call_by, 570))} 전에 매니저에게 문자하면 오늘, 그 뒤면 다음 근무일이 병가예요. 1월 1일에 다시 채워져요. 병가가 떨어지면 연차에서, 연차도 없으면 무급이에요.`)}</p>
      ${reqs.map(r => `<div class="row"><span class="when">${esc(dShort(r.day))}</span><div class="main"><div class="t">${tr('PTO', '연차')}</div><div class="s">${esc(tr(ST[r.status][0], ST[r.status][1]))}</div></div>${(r.status === 'pending' || r.status === 'approved') && r.day > G.day ? `<button type="button" data-leave="cancel:${r.day}">${tr('Cancel', '취소')}</button>` : ''}</div>`).join('')}
      ${sick.map(d => `<div class="row"><span class="when">${esc(dShort(d))}</span><div class="main"><div class="t">${tr('Sick day', '병가')}${L.days[d] === 'unpaid' ? tr(' (unpaid)', ' (무급)') : ''}</div></div></div>`).join('')}
      <div class="leave-ask">${opts.length && free >= LEAVE_DAY ? `<select id="pto-day" aria-label="${tr('Day', '날짜')}">${opts.map(d => `<option value="${d}">${esc(dShort(d))}</option>`).join('')}</select> <button type="button" data-leave="pto">${tr('Ask for PTO', '연차 신청')}</button>`
        : `<span class="fine">${free < LEAVE_DAY ? tr(`Not enough PTO for a day yet (${leaveText(Math.max(0, free))} free).`, `아직 하루치 연차가 없어요(쓸 수 있는 연차 ${leaveText(Math.max(0, free))}).`) : tr('No days to ask for yet.', '아직 신청할 수 있는 날이 없어요.')}</span>`} ${sickButton()}</div>`;
  }
  // ---------------------------------------------------------------- hybrid work: Mondays and Fridays from home
  // From config hybrid_from (a date after the missions; Linda's email two weeks ahead) the office days are Tuesday to
  // Thursday and config remote_days (mon,fri) are worked from home: the people in config remote_people stay away from the
  // office (Tom at the front desk and Sam from IT still come in), and you log in at your desk at home (the hero's
  // home_desk) instead of walking into the office. Logging in is checking in (checkIn: on time by late_after, late,
  // after noon), never logging in is a missed day (closeDay), and logging off or walking out of home before
  // early_before is stepping out: come back (or log back in) or it is leaving early (leftEarly), like going out of the
  // office. Coming to the office on a remote day is fine and counts the same. A meeting on a remote day is a video call
  // (asCall: it opens at the desk where you work today, like a phone call, without the people in the room), with its own
  // conversations when the routine has remote_episodes (the standup); routines.hybrid_days moves sprint planning and the
  // retro to office days. "Work for an hour" works at the home desk while you are logged in, and what comes up there
  // counts like at the office, so do the hours in the week review. work().home { day: 1 }: the days you logged in from
  // home. G.login = { day, from home | office, at, off }: where you work today, and whether you logged off.
  const HYBRID_FROM = (() => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(CFG.hybrid_from || '')); return m && START != null ? Math.round((Date.UTC(+m[1], +m[2] - 1, +m[3]) - START) / 864e5) + 1 : null; })();
  const REMOTE_DAYS = listOf(CFG.remote_days || 'mon,fri'), REMOTE_PEOPLE = listOf(CFG.remote_people);
  const hybridOn = (d) => HYBRID_FROM != null && d >= Math.max(HYBRID_FROM, MISSION_DAYS + 1);
  const remoteDay = (d) => hybridOn(d) && !offWork(d) && REMOTE_DAYS.includes(DAY_NAMES[(d - 1) % 7]);
  const homeToday = (n, pid) => !!G && !!pid && REMOTE_PEOPLE.includes(n.id) && zoneOfPlace(pid) === 'office' && remoteDay(G.day);          // (scheduledPlace)
  const loginToday = () => G && G.login && G.login.day === G.day ? G.login : null;
  // where you are with work on a remote day: null (not a remote day for you), out (not logged in yet), in (logged in at
  // home), office (came in), away (stepped out or logged off before early_before), off (logged off for the day)
  function loginState() {
    if (!G || !remoteDay(G.day) || myOff(G.day) || fired()) return null;
    const L = loginToday();
    if (G.inDay !== G.day) return 'out';
    if (G.outDay === G.day) return 'away';
    if (L && L.off) return 'off';
    return L && L.from === 'home' ? 'in' : 'office';
  }
  const remoteHere = () => loginState() === 'in' && atHome();          // working at the desk at home right now
  // the video call of a meeting: at your desk at the office if you came in today, otherwise at your desk at home
  const callPlace = (d) => { const L = loginToday(); return d === G.day && G.inDay === d && L && L.from === 'office' ? hero().desk : hero().home_desk; };
  const CALLS = {};
  function asCall(ep, d) {
    const pid = callPlace(d), k = ep.id + '@' + pid;
    return CALLS[k] || (CALLS[k] = Object.assign({}, ep, { place: pid, tags: (ep.tags ? ep.tags + ',' : '') + 'phone,video', remote: true }));
  }
  function onCall(list) {          // (episodes) today's meetings as video calls on a remote day
    return !G || !remoteDay(G.day) ? list : list.map(e => ROUTINE_OF[e.id] ? asCall(e, G.day) : e);
  }
  function logIn() {
    const s = loginState(), d = G.day, m = Math.floor(G.minute);
    if (!s || s === 'in') return null;
    if (s === 'out' && G.minute >= 17 * 60) { toast(`It's ${clock(m)}. Too late to log in today.`, `${clockKo(m)}예요. 오늘 로그인하기엔 너무 늦었어요.`, 'bad', 3); return null; }
    G.login = { day: d, from: 'home', at: s === 'out' ? m : (loginToday() || {}).at, off: false };
    if (G.outDay === d) G.outDay = null;          // back at work: not leaving early after all
    const w = work();
    w.home = Object.assign({}, w.home, { [d]: 1 });
    const kind = s === 'out' ? checkIn() : 'back';          // the first time today: on time, late, or after noon (and maybe the last strike)
    if (fired()) return kind;
    if (kind === 'on') toast(`Logged in at ${clock(m)}. You're on time.`, `${clockKo(m)}에 로그인했어요. 제시간이에요.`, 'good', 3);
    else if (kind === 'back') toast(`Logged back in at ${clock(m)}.`, `${clockKo(m)}에 다시 로그인했어요.`, null, 2.6);
    player.sit = true; play(player, 'sit');
    goalTimer = 0; actSig = '';
    saveGame();
    return kind;
  }
  function logOff() {
    if (loginState() !== 'in') return false;
    const d = G.day, m = Math.floor(G.minute);
    G.login.off = true;
    if (m < EARLY()) {          // like walking out of the office: log back in, or it is leaving early
      G.outDay = d; G.outAt = m;
      toast(`Logged off at ${clock(m)}. Log back in before ${clock(EARLY())}, or it counts as leaving early.`, `${clockKo(m)}에 로그아웃했어요. ${clockKo(EARLY())} 전에 다시 로그인하지 않으면 조퇴예요.`, 'bad', 4.5);
    } else toast(`Logged off at ${clock(m)}. ${hrs(workedOn(d))} at your desk today.`, `${clockKo(m)}에 로그아웃했어요. 오늘 자리에서 ${hrs(workedOn(d))} 일했어요.`, null, 3.2);
    player.sit = false;
    goalTimer = 0; actSig = '';
    saveGame();
    return true;
  }
  // (travel) walking out of home while logged in: stepping out, like going out of the office
  function leftHome(z) {
    if (loginState() !== 'in' || G.minute >= EARLY() || TRAVEL_ZONES.includes(z)) return;
    G.outDay = G.day; G.outAt = Math.floor(G.minute);
    toast(`Stepping away from your desk at ${clock(G.minute)}. Be back at it (or at the office) before ${clock(EARLY())}, or it counts as leaving early.`, `${clockKo(G.minute)}에 자리를 비워요. ${clockKo(EARLY())} 전에 돌아오지(또는 사무실에 가지) 않으면 조퇴예요.`, null, 4.5);
  }
  // (arrived) the office on a remote day: you work there today; home again after stepping out: back at your desk
  function hybridArrived(z) {
    if (!G || !remoteDay(G.day) || fired()) return;
    const L = loginToday();
    if (z === 'office' && G.inDay === G.day) G.login = { day: G.day, from: 'office', at: L ? L.at : Math.floor(G.minute), off: false };
    else if (z === hero().home_zone && L && L.from === 'home' && !L.off && G.outDay === G.day) { G.outDay = null; toast('Back home: still logged in.', '집에 돌아왔어요. 로그인 상태 그대로예요.', null, 2.6); }
  }
  // (computeActions) joining a video call while not logged in logs you in first
  function joinCall(ep) {
    if (ep.remote && atHome() && /^(out|away|off)$/.test(loginState() || '')) logIn();
    return !fired();
  }
  // (placeActions) the desk at home: log in, work, log off
  function hybridActions(pid) {
    const s = pid === hero().home_desk && atHome() ? loginState() : null, out = [];
    if (!s) return out;
    if (s === 'in') {
      out.push({ key: 'work:' + pid, label: tr('Work for an hour', '한 시간 일하기'), run: () => workHour() });
      out.push({ key: 'logoff:' + pid, label: tr('Log off', '로그아웃'), run: () => logOff() });
    } else if (s !== 'out' || G.minute < 17 * 60) {
      const label = s === 'out' ? tr('Log in to work', '업무 로그인') : s === 'office' ? tr('Log in from home', '집에서 로그인') : tr('Log back in', '다시 로그인');
      out.push({ key: 'login:' + pid + s, label, run: () => logIn() });
    }
    return out;
  }
  // (updateGoal) a remote day: log in at your desk at home, or log back in after stepping out
  function hybridGoal() {
    const s = loginState();
    if (!s || zoneId === 'office' || TRAVEL_ZONES.includes(zoneId)) return null;
    const home = hero().home_zone, desk = hero().home_desk, here = zoneId === home;
    let target = null;
    if (here) target = Z.places[desk] ? { at: Z.places[desk].at } : null;
    else { const via = routeTo(zoneId, home); if (via) target = { at: via.at, portal: true }; }
    const orOffice = here ? '' : tr(' (or go to the office)', ' (사무실에 가도 돼요)');
    if (s === 'out' && G.minute < 17 * 60) {
      const late = G.minute > hm(CFG.late_after, 555);
      return { warn: late, target, en: `${late ? "You're late! " : ''}<b>Remote day.</b> Log in at your desk at home${late ? '' : ` by ${clock(hm(CFG.late_after, 555))}`}${orOffice}.`,
        ko: `${late ? '지각이에요! ' : ''}<b>재택근무 날.</b> 집 책상에서 로그인하세요${late ? '' : ` (${clockKo(hm(CFG.late_after, 555))}까지)`}${orOffice}.` };
    }
    if (s === 'away' && G.minute < EARLY()) return { warn: false, target, en: `Log back in at your desk at home before ${clock(EARLY())}${orOffice}.`, ko: `${clockKo(EARLY())} 전에 집 책상에서 다시 로그인하세요${orOffice}.` };
    return null;
  }
  // (goToSleep) the morning card's work line (usual: the office one): a remote day, and the first day of hybrid work
  function hybridMorning(d, usual) {
    if (!hybridOn(d) || fired()) return usual;
    const first = d === Math.max(HYBRID_FROM, MISSION_DAYS + 1);
    const intro = first ? tr(`🏢 <b>Hybrid work</b> from today: ${esc(CFG.company)} is in the office ${officeNames()[0]} and works from home on ${remoteNames()[0]}. `, `🏢 오늘부터 <b>하이브리드 근무</b>: ${josa(officeNames()[1], '은', '는')} 사무실, ${josa(remoteNames()[1], '은', '는')} 집에서 일해요. `) : '';
    if (!remoteDay(d) || myOff(d)) return intro + usual;
    return intro + tr(`🏠 <b>Remote day.</b> Log in at your desk at home by <b>${clock(hm(CFG.late_after, 555))}</b> and stay online until at least ${clock(EARLY())}. Meetings are video calls.`,
      `🏠 <b>재택근무 날.</b> <b>${clockKo(hm(CFG.late_after, 555))}</b>까지 집 책상에서 로그인하고 적어도 ${clockKo(EARLY())}까지는 접속해 있으세요. 회의는 화상으로 해요.`);
  }
  // the days by name: [English, Korean] (remote: Mondays and Fridays; office: Tuesday to Thursday)
  const dayNames = (list, plural) => { const ix = list.map(x => DAY_NAMES.indexOf(x)).filter(i => i >= 0 && i < 5).sort(), en = ix.map(i => WEEKDAYS[i] + (plural ? 's' : '')), ko = ix.map(i => WEEKDAYS_KO[i]);
    if (ix.length > 2 && ix[ix.length - 1] - ix[0] === ix.length - 1) return [`${en[0]} to ${en[en.length - 1]}`, `${ko[0]}부터 ${ko[ko.length - 1]}까지`];
    return [en.length > 1 ? en.slice(0, -1).join(', ') + ' and ' + en[en.length - 1] : en.join(''), ko.length === 2 ? josa(ko[0], '과', '와') + ' ' + ko[1] : ko.join('·')]; };
  const remoteNames = () => dayNames(REMOTE_DAYS, true), officeNames = () => dayNames(DAY_NAMES.slice(0, 5).filter(x => !REMOTE_DAYS.includes(x)), false);
  // (calendar) a remote day ahead, or a day you worked from home
  function hybridCal(d) {
    if (!remoteDay(d) || myOff(d)) return null;
    const w = work();
    if (w.home && w.home[d]) return tr('Worked from home', '재택근무함');
    if (w.record[d]) return null;
    return tr(`Remote day: log in from home by ${clock(hm(CFG.late_after, 555))}`, `재택근무: ${clockKo(hm(CFG.late_after, 555))}까지 집에서 로그인`);
  }
  // (strike) the manager's first word on a remote day
  function hybridStrike(why) {
    if (!remoteDay(G.day) || (G.inDay === G.day && (loginToday() || {}).from === 'office')) return null;          // came to the office: the usual words
    const me = hero().name_ko || G.name;
    if (why === 'early') return [`Hey ${G.name}, I pinged you this afternoon and you'd already logged off. Everything okay? Unless we've talked about it, please stay online at least until ${clock(EARLY())} on remote days.`,
      `${me}, 오후에 메시지를 보냈는데 벌써 로그아웃했더라고요. 괜찮아요? 미리 얘기한 게 아니면 재택하는 날에도 적어도 ${clockKo(EARLY())}까지는 접속해 있어 주세요.`];
    if (why === 'absent') return [`Hey ${G.name}, you never logged in today and I didn't hear from you. Everything okay? Remote days are still work days. If you're sick, just text me before standup.`,
      `${me}, 오늘 로그인도 안 하고 연락도 없었네요. 괜찮아요? 재택하는 날도 근무일이에요. 아프면 스탠드업 전에 문자만 주세요.`];
    return [`Hey ${G.name}, you logged in late today. Everything okay? On remote days, please be online by ${clock(hm(CFG.work_start, 540))}, the same as at the office.`,
      `${me}, 오늘 로그인이 늦었네요. 괜찮아요? 재택하는 날에도 사무실처럼 ${clockKo(hm(CFG.work_start, 540))}까지는 접속해 주세요.`];
  }
  // (letGo) let go on a remote day, at home: a video call with your manager and HR
  function letGoRemote() {
    const boss = firstName(NPCS[BOSS] || { name: 'Maya' }), hr = firstName(NPCS[HR] || { name: 'Linda' });
    showCard({ kicker: CFG.company, title: tr("You're let go", '해고되었습니다'),
      body: tr(`<p>A video call pops up on your laptop: ${esc(boss)} and ${esc(hr)} from HR.</p><p class="quote">“${esc(G.name)}, we've talked about this. You've been late or absent too many times, so we're letting you go, effective today. I'm sorry it came to this.”</p><p>When the call ends, your accounts stop working. Please bring the laptop and your badge to the front desk. Your final paycheck goes to your bank account.</p>`,
        `<p>노트북에 화상 통화가 뜹니다. ${esc(josa(boss, '과', '와'))} 인사팀 ${esc(hr)}예요.</p><p class="quote">“${esc(myName())}, 이 얘기는 전에도 했죠. 지각과 결근이 너무 많아서 오늘부로 함께할 수 없게 됐어요. 이렇게 돼서 유감이에요.”</p><p>통화가 끝나자 계정이 모두 막힙니다. 노트북과 출입증은 프런트에 반납해 주세요. 마지막 급여는 은행 계좌로 들어옵니다.</p>`),
      ok: tr('Close the laptop', '노트북 닫기'), state: 'card' });
    speak(`${G.name}, we've talked about this. You've been late or absent too many times, so we're letting you go, effective today.`, voiceOf(NPCS[BOSS]));
  }
  // (Work record) the rules, today, and the days from home this week
  function hybridPanel() {
    if (HYBRID_FROM == null || G.day < HYBRID_FROM - 14 || fired()) return '';
    const s = loginState(), L = loginToday(), w = work(), from = Math.floor((G.day - 1) / 7) * 7 + 1;
    const homeDays = Object.keys(w.home || {}).map(Number).filter(d => d >= from && d < from + 7).length;
    const NOW = { out: ['Not logged in yet.', '아직 로그인하지 않았어요.'], in: [`Logged in from home${L && L.at != null ? ' at ' + clock(L.at) : ''}.`, `${L && L.at != null ? clockKo(L.at) + '에 ' : ''}집에서 로그인했어요.`],
      office: ['At the office today.', '오늘은 사무실에 나왔어요.'], away: [`Stepped away at ${clock(G.outAt || 0)}: log back in before ${clock(EARLY())}.`, `${clockKo(G.outAt || 0)}에 자리를 비웠어요. ${clockKo(EARLY())} 전에 다시 로그인하세요.`], off: ['Logged off for the day.', '오늘은 로그아웃했어요.'] };
    return `<h3>${tr('Hybrid work', '하이브리드 근무')}</h3><p class="fine">${tr(`${hybridOn(G.day) ? 'Since' : 'From'} ${esc(dateLong(HYBRID_FROM))}: ${officeNames()[0]} at the office, ${remoteNames()[0]} from home. On a remote day, log in at your desk at home by ${clock(hm(CFG.late_after, 555))} and stay online until at least ${clock(EARLY())}: logging in late is late, never logging in is a missed day. The standup is a video call, sprint planning and the retro are on office days, and you can always come to the office instead.`,
      `${dateKo(HYBRID_FROM)}${hybridOn(G.day) ? '부터' : '부터 시작'}: ${josa(officeNames()[1], '은', '는')} 사무실, ${josa(remoteNames()[1], '은', '는')} 집에서 일해요. 재택하는 날에는 ${clockKo(hm(CFG.late_after, 555))}까지 집 책상에서 로그인하고 적어도 ${clockKo(EARLY())}까지 접속해 있으세요. 늦게 로그인하면 지각, 로그인하지 않으면 결근이에요. 스탠드업은 화상으로, 스프린트 계획과 회고는 사무실 나오는 날에 하고, 언제든 사무실에 나와도 돼요.`)}</p>
      ${s ? `<p class="fine">${tr('Today', '오늘')}: ${esc(tr(NOW[s][0], NOW[s][1]))}</p>` : ''}${hybridOn(G.day) ? `<p class="fine">${tr(`This week: ${homeDays} day${homeDays === 1 ? '' : 's'} from home.`, `이번 주 재택: ${homeDays}일.`)}</p>` : ''}`;
  }
  // ---------------------------------------------------------------- the review: 90 days for Jun, the year-end review for the others
  // A conversation tagged review (one for each hero, Maya's office, early January) is the meeting; when it is over the
  // card shows how the time since you started went (reviewScore): attendance 40, the team meetings you came to 20, the
  // weeks at your desk 25, what came up at your desk 15, and 5 for every mission done. 80 or more exceeds expectations,
  // 55 meets them, below that needs improvement. A raise goes into every paycheck after (G.raise; config raise_meets,
  // raise_exceeds, in percent), the year-end review also pays review_bonus for exceeding. A new hire who needs
  // improvement has probation extended (config probation_extend_days): on that morning the time since is looked at
  // again, and needing improvement then ends the job. Missing the meeting by the last day it is open: the review
  // happens anyway, by email, 10 points lower. G.review = { day, kind, total, rating, raise, bonus, missed, extendTo, final }.
  const RATING = { exceeds: ['Exceeds expectations', '기대 이상'], meets: ['Meets expectations', '기대 충족'], needs: ['Needs improvement', '개선 필요'] };
  const reviewEp = () => episodes().find(e => /(^|,)\s*review\s*(,|$)/.test(e.tags || ''));
  const probation = () => /new hire/i.test(hero().role || '');
  function reviewScore(from, to, penalty) {
    const w = work(), rec = (d) => w.record[d] || '', parts = [];
    let att = 40, late = 0, noon = 0, absent = 0, early = 0;
    for (let d = from; d <= to; d++) { const r = rec(d); if (r === 'late') late++; if (r === 'noon') noon++; if (r === 'absent') absent++; if (w.left && w.left[d] != null) early++; }
    att = Math.max(0, att - late * 5 - noon * 8 - absent * 12 - early * 6);
    parts.push({ en: 'Attendance', ko: '근태', got: att, max: 40, note: [late || noon || absent || early ? [late && `${late} late`, noon && `${noon} in after noon`, absent && `${absent} missed`, early && `${early} left early`].filter(Boolean).join(', ') : 'on time every day',
      late || noon || absent || early ? [late && `지각 ${late}`, noon && `오후 출근 ${noon}`, absent && `결근 ${absent}`, early && `조퇴 ${early}`].filter(Boolean).join(', ') : '매일 정시'] });
    let due = 0, came = 0;
    for (let d = Math.max(from, MISSION_DAYS + 1); d <= to; d++) if (/^(on|late|noon)$/.test(rec(d))) routinesOn(d).forEach(x => { due++; if (G.rdone && G.rdone[x.key]) came++; });
    const meet = due ? Math.round(20 * came / due) : 20;
    parts.push({ en: 'Team meetings', ko: '팀 회의', got: meet, max: 20, note: due ? [`${came} of ${due}`, `${due}번 중 ${came}번`] : ['none yet', '아직 없음'] });
    const weeks = Object.keys(G.weeks || {}).map(Number).filter(d => d >= from && d <= to).map(d => G.weeks[d]);
    const desk = weeks.length ? Math.round(25 * weeks.reduce((a, x) => a + (x.grade === 'good' ? 1 : x.grade === 'ok' ? 0.6 : 0.2), 0) / weeks.length) : 15;
    parts.push({ en: 'Work at your desk', ko: '자리에서 한 일', got: desk, max: 25, note: weeks.length ? [`${weeks.filter(x => x.grade === 'good').length} good weeks of ${weeks.length}`, `${weeks.length}주 중 충분했던 주 ${weeks.filter(x => x.grade === 'good').length}`] : ['no full weeks yet', '아직 평가한 주 없음'] });
    const tasks = (G.taskLog || []).filter(x => x.day >= from && x.day <= to);
    const tk = tasks.length ? Math.round(15 * clamp(tasks.reduce((a, x) => a + x.n, 0) / tasks.length / 8, 0, 1)) : 10;
    parts.push({ en: 'What came up', ko: '중간에 생긴 일', got: tk, max: 15, note: tasks.length ? [`${tasks.filter(x => x.n > 0).length} of ${tasks.length} handled well`, `${tasks.length}건 중 ${tasks.filter(x => x.n > 0).length}건 잘 처리`] : ['nothing came up', '없었음'] });
    parts.push(...teamPart());          // coworkers who are friends
    if (from <= MISSION_DAYS && G.mission && G.mission.all) parts.push({ en: 'Your first two weeks', ko: '첫 2주', got: 5, max: 0, note: ['every mission done', '미션 모두 완료'] });
    if (penalty) parts.push({ en: 'Missed the review meeting', ko: '평가 면담에 빠짐', got: -penalty, max: 0, note: ['', ''] });
    const total = clamp(parts.reduce((a, x) => a + x.got, 0), 0, 100);
    return { total, parts, rating: total >= 80 ? 'exceeds' : total >= 55 ? 'meets' : 'needs' };
  }
  const raisePct = (k) => +CFG[k] || (k === 'raise_exceeds' ? 5 : 3);
  // the meeting is over (or missed): the result, the raise or the extension, the manager's note; returns the card body
  function holdReview(missed) {
    if (!G || G.review || fired()) return null;
    const kind = probation() ? 'probation' : 'annual', res = reviewScore(1, G.day, missed ? 10 : 0), me = hero().name_ko || G.name;
    const raise = res.rating === 'exceeds' ? raisePct('raise_exceeds') : res.rating === 'meets' ? raisePct('raise_meets') : 0;
    const bonus = kind === 'annual' && res.rating === 'exceeds' ? +CFG.review_bonus || 1500 : 0;
    const before = netPay();
    G.review = { day: G.day, kind, total: res.total, rating: res.rating, raise, bonus, missed: !!missed };
    if (raise) G.raise = Math.round(((G.raise || 1) * (1 + raise / 100)) * 10000) / 10000;
    if (bonus) pay(bonus, 'Performance bonus', 'income', { ko: '성과 보너스' });
    if (kind === 'probation' && res.rating === 'needs') G.review.extendTo = G.day + (+CFG.probation_extend_days || 30);
    addScore(res.rating === 'exceeds' ? 30 : res.rating === 'meets' ? 10 : -20, `Review: ${RATING[res.rating][0]}`, `평가: ${RATING[res.rating][1]}`);
    logEvent('review', `Review: ${RATING[res.rating][0]}`, 0, { ko: `평가: ${RATING[res.rating][1]}` });
    const what = kind === 'probation' ? ['90-day review', '90일 평가'] : ['year-end review', '연말 평가'];
    const raiseEn = raise ? ` Your pay goes up ${raise}%: from the next paycheck it's ${usd2(netPay())} instead of ${usd2(before)}.` : '';
    const raiseKo = raise ? ` 급여가 ${raise}% 오릅니다. 다음 급여부터 ${usd2(before)}가 아니라 ${usd2(netPay())}예요.` : '';
    const line = res.rating === 'needs' ? (kind === 'probation'
      ? [`Your probation is extended until ${dateLong(G.review.extendTo)}. Let's work on showing up on time, the team meetings and steady work at your desk, and we'll look again then.`, `수습 기간이 ${dateKo(G.review.extendTo)}까지 연장돼요. 제시간 출근, 팀 회의, 꾸준한 업무를 같이 챙겨 보고 그때 다시 봐요.`]
      : ['No raise this time. Let\'s put together a plan for the next quarter and check in every week.', '이번에는 인상이 없어요. 다음 분기 계획을 같이 세우고 매주 점검해요.'])
      : kind === 'probation' ? [`You've passed your probation. Welcome to the team for real.${raiseEn}`, `수습을 통과했어요. 이제 정말 팀원이에요.${raiseKo}`]
        : [`Thank you for a good year.${raiseEn}${bonus ? ` There's a ${usd(bonus)} bonus in your account, too.` : ''}`, `한 해 수고 많았어요.${raiseKo}${bonus ? ` 보너스 ${usd(bonus)}도 계좌에 넣었어요.` : ''}`];
    notify(BOSS, `${missed ? `${G.name}, since we couldn't meet, here is your ${what[0]} in writing. ` : `Thanks for the talk today, ${G.name}. `}Overall: ${RATING[res.rating][0]} (${res.total}/100). ${line[0]}`,
      `${missed ? `${me}, 만나지 못해서 ${what[1]} 결과를 글로 보내요. ` : `${me}, 오늘 얘기 고마워요. `}종합: ${RATING[res.rating][1]}(${res.total}/100). ${line[1]}`, missed ? 'email' : 'text');
    saveGame();
    return reviewBody(res, line, what);
  }
  function reviewBody(res, line, what) {
    return `<p class="big">${tr(`Overall: <b>${RATING[res.rating][0]}</b> · ${res.total}/100`, `종합: <b>${RATING[res.rating][1]}</b> · ${res.total}/100`)}</p>
      <ul>${res.parts.map(x => `<li><b>${esc(tr(x.en, x.ko))}</b> ${x.max ? `${x.got}/${x.max}` : (x.got > 0 ? '+' : '−') + Math.abs(x.got)}${x.note[0] ? ` · ${esc(tr(x.note[0], x.note[1]))}` : ''}</li>`).join('')}</ul>
      <p class="quote">“${esc(tr(line[0], line[1]))}”</p>`;
  }
  function showReview(body) {
    if (!body) return;
    const r = G.review;
    showCard({ kicker: tr(r.kind === 'probation' ? '90-day review' : 'Year-end review', r.kind === 'probation' ? '90일 평가' : '연말 평가'), title: tr(RATING[r.rating][0], RATING[r.rating][1]), body, ok: tr('Continue', '계속'), state: 'card' }, () => { goalTimer = 0; });
  }
  // the morning (from goToSleep): a missed meeting is held by email; an extended probation is looked at again
  function reviewMorning(prev) {
    const out = [];
    if (!G || fired()) return out;
    const ep = reviewEp();
    if (!G.review && ep && ep.day_to != null && prev >= ep.day_to && !G.done[ep.id]) {
      holdReview(true);
      out.push(tr(`📋 You missed your review meeting, so ${esc(firstName(NPCS[BOSS]))} sent it by email: <b>${RATING[G.review.rating][0]}</b> (${G.review.total}/100). Check your phone.`, `📋 평가 면담에 빠져서 ${esc(josa(firstName(NPCS[BOSS]), '이', '가'))} 결과를 이메일로 보냈어요: <b>${RATING[G.review.rating][1]}</b>(${G.review.total}/100). 휴대전화를 확인하세요.`));
    }
    const r = G.review;
    if (r && r.extendTo && !r.final && G.day >= r.extendTo) {
      const res = reviewScore(r.day + 1, G.day - 1, 0);
      r.final = res.rating;
      if (res.rating === 'needs') {
        fire(false, 'probation');
        out.push(tr(`📧 <b>Your probation has ended, and so has your job.</b> ${esc(CFG.company)} looked at the month since your review (${res.total}/100) and let you go.`, `📧 <b>수습 기간이 끝났고, 고용도 끝났어요.</b> ${esc(CFG.company)}가 평가 뒤 한 달(${res.total}/100)을 보고 고용을 끝냈어요.`));
      } else {
        notify(BOSS, `${G.name}, good news: the last month went well (${res.total}/100), so you've passed your probation. Keep it up!`, `${hero().name_ko || G.name}, 좋은 소식이에요. 지난 한 달이 좋았어요(${res.total}/100). 수습 통과예요. 계속 이렇게 해요!`, 'text');
        addScore(15, 'Passed probation', '수습 통과');
        out.push(tr(`✅ You've passed your probation (${res.total}/100). ${esc(firstName(NPCS[BOSS]))} sent a note.`, `✅ 수습을 통과했어요(${res.total}/100). ${esc(josa(firstName(NPCS[BOSS]), '이', '가'))} 메시지를 보냈어요.`));
      }
    }
    return out;
  }
  function checkMissions() {          // after a conversation: was it the last mission?
    if (!G || G.mission || G.day > MISSION_DAYS) return false;
    const [got, all] = missionCount();
    if (!all || got < all) return false;
    const bonus = fired() ? 0 : +CFG.mission_bonus || 0, pts = +CFG.mission_points || 0;
    G.mission = { day: G.day, all: true, bonus };
    if (bonus) pay(bonus, `Bonus from ${CFG.company}`, 'income', { ko: `${CFG.company} 보너스` });
    addScore(pts, 'Every mission done', '미션 모두 완료');
    if (!fired()) notify(BOSS, `${G.name}, you got through everything we planned for your first weeks here, and it showed. Thank you! There's a ${usd(bonus)} bonus on its way to your account.`,
      `${hero().name_ko || G.name}, 그동안 계획한 일을 전부 해냈네요. 정말 고마워요! 보너스 ${usd(bonus)}가 계좌로 들어갈 거예요.`, 'text');
    logEvent('mission', 'Finished every mission', 0, { ko: '미션 모두 완료' });
    saveGame();
    const days = MISSION_DAYS - G.day;
    showCard({ kicker: tr('Missions', '미션'), title: tr('Congratulations!', '축하합니다!'),
      body: tr(`<p class="big">🎉 You finished all <b>${all}</b> missions${fired() ? '' : ` at ${esc(CFG.company)}`}.</p>
        <div class="sum">${bonus ? `<div><b>+${usd(bonus)}</b>bonus</div>` : ''}<div><b>+${pts}</b>points</div><div><b>★ ${score()}</b>score</div><div><b>${esc(standing()[0])}</b>at work</div></div>
        ${bonus ? `<p>Maya sent a thank-you note, and a bonus of <b>${usd(bonus)}</b> is in your account.</p>` : ''}
        <p>${days > 0 ? `Until then the time is yours, and from ${esc(dateLong(MISSION_DAYS + 1))} it's <b>free play</b>` : `From tomorrow it's <b>free play</b>`}: no more set conversations. Live your life in ${esc(CFG.city)}: ${fired() ? 'find your own way' : 'go to work on time'}, pay the bills, cook, shop, jog, and explore.</p>`,
        `<p class="big">🎉 미션 <b>${all}</b>개를 모두 해냈어요.</p>
        <div class="sum">${bonus ? `<div><b>+${usd(bonus)}</b>보너스</div>` : ''}<div><b>+${pts}</b>점수</div><div><b>★ ${score()}</b>총점</div><div><b>${esc(standing()[1])}</b>근무 평가</div></div>
        ${bonus ? `<p>${esc(firstName(NPCS[BOSS] || { name: 'Maya' }))}가 감사 인사를 보냈고, 보너스 <b>${usd(bonus)}</b>가 계좌에 들어왔어요.</p>` : ''}
        <p>${days > 0 ? `남은 날은 자유롭게 보내고, ${esc(dateKo(MISSION_DAYS + 1))}부터는 <b>자유 플레이</b>예요` : '내일부터는 <b>자유 플레이</b>예요'}. 정해진 대화는 더 없어요. ${esc(zoneName('city')[1] || CFG.city)}에서 살아 보세요: ${fired() ? '새 길을 찾고' : '제시간에 출근하고'}, 공과금을 내고, 요리하고, 장 보고, 달리고, 구경하세요.</p>`),
      ok: tr('Keep going', '계속하기'), state: 'card' }, () => { goalTimer = 0; });
    speak('Congratulations!', heroVoice());
    return true;
  }
  // the end of the last day of the missions (from goToSleep): free play from tomorrow
  function closeMissions(day) {
    if (!G || day !== MISSION_DAYS) return null;
    const [got, all] = missionCount();
    if (!G.mission) G.mission = { day, all: false, bonus: 0 };
    return G.mission.all ? tr(`🎉 Your missions are behind you. From today it's <b>free play</b>: no set conversations, just your life in ${esc(CFG.city)}.`, `🎉 미션이 끝났어요. 오늘부터 <b>자유 플레이</b>예요. 정해진 대화 없이 ${esc(zoneName('city')[1] || CFG.city)}에서 살아 보세요.`)
      : tr(`🗓️ The missions are over: you finished <b>${got} of ${all}</b> missions (all of them earns a bonus, so no bonus this time). From today it's <b>free play</b>.`, `🗓️ 미션 기간이 끝났어요. 미션 <b>${all}개 중 ${got}개</b>를 해냈어요(모두 해내야 보너스가 나와서 이번에는 없어요). 오늘부터 <b>자유 플레이</b>예요.`);
  }
  // Sales tax and tips: prices on a menu or a shelf are before tax. Meals, drinks and other goods are taxed
  // (config sales_tax); groceries and fares are not. Where food or drinks are served the panel asks about a tip
  // (config tip_options, percent of the price before tax): tip_default at a table (diner, restaurant), none at a counter.
  const TAX = Math.max(0, +CFG.sales_tax || 0), TIPS = listOf(CFG.tip_options).map(Number).filter(n => n >= 0);
  const cents = (n) => Math.round(n * 100) / 100;
  const pct = (r) => +(r * 100).toFixed(2) + '%';
  const taxed = (i) => /^(meal|drink|other|gear)$/.test(i.kind);
  const tipAsked = (pid) => TIPS.length > 1 && rows('items').some(i => i.place === pid && /^(meal|drink)$/.test(i.kind) && +i.price > 0);
  const tableService = (pid) => /diner|restaurant/.test(pid || '');
  const tipChoice = {};
  const tipRate = (pid) => !tipAsked(pid) ? 0 : (tipChoice[pid] != null ? tipChoice[pid] : tableService(pid) ? +CFG.tip_default || 0 : 0) / 100;
  // A punch card (config punch_card_place, punch_card_every: 6 = buy 5 drinks, the 6th is free). The tip on a free
  // drink still goes by its full price.
  const PUNCH_AT = String(CFG.punch_card_place || ''), PUNCH_N = +CFG.punch_card_every || 0;
  const punchable = (i) => PUNCH_N > 1 && !!PUNCH_AT && i.place === PUNCH_AT && i.kind === 'drink' && +i.price > 0;
  const punches = (pid) => (G && G.punch && G.punch[pid]) || 0;
  const onTheHouse = (i) => punchable(i) && punches(i.place) >= PUNCH_N - 1;
  function billFor(i) {
    const list = +i.price || 0, free = onTheHouse(i), price = free ? 0 : list, tax = taxed(i) ? cents(price * TAX) : 0;
    const tip = /^(meal|drink)$/.test(i.kind) ? cents(list * tipRate(i.place)) : 0;
    return { price, tax, tip, total: cents(price + tax + tip), free, list };
  }
  const receipt = (b) => (b.free ? tr('free with your punch card', '스탬프 카드로 무료') : usd2(b.price)) + (b.tax ? tr(` + tax ${usd2(b.tax)}`, ` + 세금 ${usd2(b.tax)}`) : '') + (b.tip ? tr(` + tip ${usd2(b.tip)}`, ` + 팁 ${usd2(b.tip)}`) : '') + (b.tax || b.tip ? ` = ${usd2(b.total)}` : '');
  // Bills on autopay (bills table): due on their day, then every `every` days
  const billsDue = (d) => rows('bills').filter(b => d >= b.day && ((+b.every || 30) >= 28 && START != null ? onDateOfMonth(d, dateOf(b.day).getUTCDate()) : (d - b.day) % (+b.every || 30) === 0));

  // ---------------------------------------------------------------- benefits: open enrollment in the HR portal, the pay stub
  // The HR portal (a button in the Work record, and on the phone during open enrollment) has your benefits and pay. The
  // plans table has the medical, dental and vision plans (premium: out of every paycheck before tax; copays: what a
  // visit or a purchase costs you; hsa: what the company puts into a health savings account every paycheck). Open
  // enrollment runs config benefits_open – benefits_close (Oct 12–23, during the missions): pick one plan of each kind
  // and submit; submitting again replaces it until the window closes. The new plans start on benefits_start (Nov 1);
  // without a submission you get benefits_default (the Basic HMO, no dental or vision) until the next open enrollment
  // or a life event. Until then each hero has the plans of benefits_now (hero:plan+plan+plan+401k%; @episode: only once
  // that conversation is done, the default and k401_auto before). The 401(k) can change any time and counts from the
  // next paycheck; the company adds k401_match % of it, up to k401_match_up_to % of pay. A paycheck (payStub): gross
  // (salary_gross × G.raise), the premiums and the 401(k) before tax, Social Security and Medicare on pay after the
  // premiums, state tax (tax_state %) and federal tax at the hero's own rate on pay after both. That rate is worked out
  // so the plans of benefits_now come to heroes.salary_net exactly. Without a plans table the old paycheck stays
  // (salary_net × G.raise). copayFor(kind) and planOf(day) are for the pharmacy and the clinic.
  // G.benefits = { k401 [{ from (payday), pct }], draft, pick { medical, dental, vision } | null, sent (day), reminded,
  // missed, started, hsa, saved { me, co } (401(k) money paid in), stubs [the last 6 pay stubs] }.
  const PLANS = rows('plans').slice().sort((a, b) => (a.sort || 0) - (b.sort || 0)), PLAN = byId('plans');
  const PLAN_KINDS = ['medical', 'dental', 'vision'], PLAN_KIND_NAME = { medical: ['Medical', '의료'], dental: ['Dental', '치과'], vision: ['Vision', '안과'] };
  const CARE = { doctor: ['doctor visit', '진료'], specialist: ['specialist', '전문의'], urgent: ['urgent care', '긴급 진료'], er: ['emergency room', '응급실'], rx: ['generic drugs', '복제약'],
    cleaning: ['cleaning', '스케일링'], filling: ['filling', '충치 치료'], eye_exam: ['eye exam', '시력 검사'], glasses: ['glasses', '안경'] };
  const cfgNum = (k, dflt) => CFG[k] != null && CFG[k] !== '' && Number.isFinite(+CFG[k]) ? +CFG[k] : dflt;
  const K401_AUTO = cfgNum('k401_auto', 3), K401_MAX = cfgNum('k401_max', 15), MATCH = cfgNum('k401_match', 100) / 100, MATCH_UP_TO = cfgNum('k401_match_up_to', 4);
  const TAX_SS = cfgNum('tax_ss', 6.2) / 100, TAX_MED = cfgNum('tax_medicare', 1.45) / 100, TAX_STATE = cfgNum('tax_state', 5.5) / 100;
  const isoDay = (s, dflt) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || '')); return m && START != null ? Math.round((Date.UTC(+m[1], +m[2] - 1, +m[3]) - START) / 864e5) + 1 : dflt; };
  const ENROLL_FROM = isoDay(CFG.benefits_open, 8), ENROLL_TO = isoDay(CFG.benefits_close, 19), COVER_FROM = isoDay(CFG.benefits_start, 28);
  function benefitsOn() { return PLANS.some(p => p.kind === 'medical'); }
  const enrollOpen = (d) => d >= ENROLL_FROM && d <= ENROLL_TO;
  const nextPayday = (d) => { for (let n = d + 1; n < d + 40; n++) if (isPayday(n)) return n; return d + 14; };          // the first payday after day d
  function election(s) {          // 'med_ppo+den_ppo+vis_plan+4@d4_benefits' → { medical, dental, vision, pct, ep }; a kind left out: its cheapest (no coverage)
    const [list, ep] = String(s || '').split('@'), out = { ep: ep || null };
    String(list || '').split('+').map(x => x.trim()).filter(Boolean).forEach(x => { if (/^\d+(\.\d+)?$/.test(x)) out.pct = +x; else if (PLAN[x]) out[PLAN[x].kind] = x; });
    PLAN_KINDS.forEach(k => { if (!out[k]) { const p = PLANS.filter(x => x.kind === k).sort((a, b) => (+a.premium || 0) - (+b.premium || 0))[0]; out[k] = p ? p.id : null; } });
    return out;
  }
  const picksOf = (e) => ({ medical: e.medical, dental: e.dental, vision: e.vision });
  const defaultPlans = () => picksOf(election(CFG.benefits_default));
  const nowSpec = (id) => election((listOf(CFG.benefits_now).map(x => x.split(':')).find(x => x[0] === id) || [])[1] || CFG.benefits_default);
  const benefits = () => G.benefits || (G.benefits = { k401: [], draft: null, pick: null, sent: null, hsa: 0, saved: { me: 0, co: 0 }, stubs: [] });
  function before() {          // the hero's plans and 401(k) until the new plans start
    const e = nowSpec(G.hero);
    return e.ep && !G.done[e.ep] ? Object.assign(defaultPlans(), { pct: K401_AUTO }) : Object.assign(picksOf(e), { pct: e.pct != null ? e.pct : K401_AUTO });
  }
  const plansOn = (d) => d >= COVER_FROM ? Object.assign({}, benefits().pick || defaultPlans()) : picksOf(before());
  function k401On(d) { const c = benefits().k401.filter(x => x.from <= d).pop(); return c ? c.pct : before().pct; }
  const planName = (id, ko) => PLAN[id] ? (ko ? PLAN[id].name_ko || PLAN[id].name : PLAN[id].name) : String(id || '');
  const planList = (p, ko) => PLAN_KINDS.map(k => p[k]).filter(id => PLAN[id] && (PLAN[id].kind === 'medical' || +PLAN[id].premium > 0)).map(id => planName(id, ko)).join(', ');          // no 'No dental coverage'
  function stubLines(gross, picks, k401Pct, rate) {
    gross = cents(gross);
    const prem = PLAN_KINDS.map(k => PLAN[picks[k]]).filter(Boolean).map(p => ({ id: p.id, kind: p.kind, amt: cents(+p.premium || 0) }));
    const pre = cents(prem.reduce((a, p) => a + p.amt, 0)), k401 = cents(gross * k401Pct / 100), fica = gross - pre, taxable = cents(gross - pre - k401);
    const ss = cents(fica * TAX_SS), medicare = cents(fica * TAX_MED), state = cents(taxable * TAX_STATE), fed = cents(taxable * rate);
    const match = cents(gross * Math.min(k401Pct, MATCH_UP_TO) / 100 * MATCH), hsa = PLAN[picks.medical] ? +PLAN[picks.medical].hsa || 0 : 0;
    return { gross, prem, pre, pct: k401Pct, k401, ss, medicare, state, fed, taxable, match, hsa, plans: Object.assign({}, picks), net: cents(gross - pre - k401 - ss - medicare - state - fed) };
  }
  const fedMemo = {};
  function fedRate() {          // the hero's federal rate: what brings the plans of benefits_now to salary_net
    const h = hero();
    if (fedMemo[h.id] != null) return fedMemo[h.id];
    const e = nowSpec(h.id), s = stubLines(+h.salary_gross, picksOf(e), e.pct != null ? e.pct : K401_AUTO, 0);
    return (fedMemo[h.id] = s.taxable > 0 ? clamp((s.net - +h.salary_net) / s.taxable, 0, 0.5) : 0.12);
  }
  // a paycheck on day d (today by default) with the plans and the 401(k) in effect then, or the ones given
  function payStub(d, picks, k401Pct) {
    d = d == null ? G.day : d;
    return Object.assign(stubLines(+hero().salary_gross * ((G && G.raise) || 1), picks || plansOn(d), k401Pct != null ? k401Pct : k401On(d), fedRate()), { day: d });
  }
  function planOf(d) {          // for the pharmacy and the clinic: the plan rows on day d (today by default), the 401(k) percent, the HSA balance
    if (!G || !benefitsOn()) return null;
    d = d == null ? G.day : d;
    const p = plansOn(d);
    return { medical: PLAN[p.medical] || null, dental: PLAN[p.dental] || null, vision: PLAN[p.vision] || null, k401: k401On(d), hsa: benefits().hsa || 0 };
  }
  function copayFor(kind, d) {          // what you pay for a kind of care (a key of CARE) on day d with your plans; null when no plan prices it
    const p = planOf(d);
    if (!p) return null;
    for (const k of PLAN_KINDS) { const c = p[k] && p[k].copays; if (c && c[kind] != null) return +c[kind]; }
    return null;
  }
  function draftOf() { const B = benefits(); return B.draft || (B.draft = Object.assign({}, B.pick || picksOf(before()))); }
  function set401k(p) {          // from the next paycheck
    p = Math.round(+p);
    if (!G || fired() || !benefitsOn() || !Number.isFinite(p)) return false;
    p = clamp(p, 0, K401_MAX);
    const B = benefits(), from = nextPayday(G.day);
    B.k401 = B.k401.filter(x => x.from < from).concat({ from, pct: p });
    logEvent('benefits', `401(k) set to ${p}%`, 0, { ko: `401(k) ${p}%로 바꿈` });
    return true;
  }
  // submit in open enrollment: the draft, or { medical, dental, vision }, or 'plan+plan+plan' (a kind left out: none)
  function enroll(choice) {
    if (!G || fired() || !benefitsOn() || !enrollOpen(G.day)) return false;
    const B = benefits(), want = typeof choice === 'string' ? election(choice) : choice || {}, pick = Object.assign({}, draftOf());
    PLAN_KINDS.forEach(k => { if (want[k] && PLAN[want[k]] && PLAN[want[k]].kind === k) pick[k] = want[k]; });
    if (PLAN_KINDS.some(k => !PLAN[pick[k]] || PLAN[pick[k]].kind !== k)) return false;
    B.pick = pick; B.draft = Object.assign({}, pick); B.sent = G.day;
    const first = nextPayday(COVER_FROM - 1), s = payStub(first, pick);
    notify(HR, `Your benefits choices are in: ${planList(pick)}. They start ${dateLong(COVER_FROM)}. From your paycheck on ${dateLong(first)} the premiums come to ${usd2(s.pre)}, before tax. You can change them in the HR portal until ${dateLong(ENROLL_TO)}.`,
      `복리후생 선택이 접수됐어요: ${planList(pick, true)}. ${dateKo(COVER_FROM)}에 시작해요. ${dateKo(first)} 급여부터 보험료 ${usd2(s.pre)}가 세전으로 빠져요. ${dateKo(ENROLL_TO)}까지는 HR 포털에서 바꿀 수 있어요.`, 'email');
    logEvent('benefits', 'Benefits enrollment submitted', 0, { ko: '복리후생 가입 제출' });
    saveGame();
    return true;
  }
  // the morning (from goToSleep): open enrollment and its last days, missing it, the new plans starting
  function benefitsMorning() {
    const out = [];
    if (!G || fired() || !benefitsOn()) return out;
    const B = benefits(), d = G.day, me = hero().name_ko || G.name, dflt = defaultPlans();
    if (enrollOpen(d) && !B.sent) {
      const left = ENROLL_TO - d + 1, when = left === 1 ? ['today is the last day', '오늘이 마지막 날'] : left <= 3 ? [`${left} days left`, `${left}일 남음`] : null;
      out.push(tr(`🩺 <b>Open enrollment</b>: pick your medical, dental and vision plans in the HR portal (on your phone or in your work record) by ${esc(dateLong(ENROLL_TO))}${when ? ` (${when[0]})` : ''}. Without it you get the ${esc(planName(dflt.medical))} with no dental or vision.`,
        `🩺 <b>복리후생 정기 가입</b>: ${esc(dateKo(ENROLL_TO))}까지 HR 포털(휴대전화나 근무 기록)에서 의료·치과·안과 플랜을 고르세요${when ? `(${when[1]})` : ''}. 안 하면 치과·안과 없이 ${esc(planName(dflt.medical, true))}에 가입돼요.`));
      if (left <= 3 && !B.reminded) {
        B.reminded = d;
        notify(HR, `Hi ${G.name}, I don't see your benefits choices yet. Open enrollment closes ${dateLong(ENROLL_TO)}. If you don't submit, you'll get the ${planName(dflt.medical)} with no dental or vision from ${dateLong(COVER_FROM)}.`,
          `${me} 님, 아직 복리후생 선택이 안 보여요. 정기 가입은 ${dateKo(ENROLL_TO)}에 끝나요. 제출하지 않으면 ${dateKo(COVER_FROM)}부터 치과·안과 없이 ${planName(dflt.medical, true)}에 가입돼요.`, 'email');
      }
    }
    if (d > ENROLL_TO && !B.sent && !B.missed) {
      B.missed = d;
      notify(HR, `${G.name}, open enrollment closed and I didn't get your choices, so from ${dateLong(COVER_FROM)} you'll have the ${planName(dflt.medical)}, just you, with no dental or vision. You can change it at the next open enrollment, or within 30 days of a life event like getting married or having a baby.`,
        `${me} 님, 정기 가입이 끝났는데 선택한 플랜을 받지 못했어요. 그래서 ${dateKo(COVER_FROM)}부터는 치과·안과 없이 본인만 ${planName(dflt.medical, true)}에 가입돼요. 다음 정기 가입 때나, 결혼·출산 같은 생활의 변화가 있으면 30일 안에 바꿀 수 있어요.`, 'email');
      out.push(tr(`🩺 You missed open enrollment, so from ${esc(dateLong(COVER_FROM))} you have the <b>${esc(planName(dflt.medical))}</b> with no dental or vision.`, `🩺 복리후생 정기 가입을 놓쳐서 ${esc(dateKo(COVER_FROM))}부터 치과·안과 없이 <b>${esc(planName(dflt.medical, true))}</b>에 가입돼요.`));
    }
    if (d >= COVER_FROM && !B.started) {
      B.started = d;
      const p = plansOn(d);
      out.push(tr(`🩺 Your new benefits have started: ${esc(planList(p))}. Your insurance cards are in the mail.`, `🩺 새 복리후생이 시작됐어요: ${esc(planList(p, true))}. 보험 카드는 우편으로 와요.`));
    }
    return out;
  }
  // payday (from goToSleep, after the deposit): keep the stub, add to the 401(k) and the HSA; a line for the morning card
  function benefitsPaid(net, cut) {
    if (!G || !benefitsOn()) return [];
    const B = benefits(), s = Object.assign(payStub(G.day), { unpaid: cut || 0, paid: net });
    B.stubs = (B.stubs || []).concat(s).slice(-6);
    const sv = B.saved || { me: 0, co: 0 };
    B.saved = { me: cents(sv.me + s.k401), co: cents(sv.co + s.match) };
    if (s.hsa) B.hsa = cents((B.hsa || 0) + s.hsa);
    const tax = cents(s.fed + s.state + s.ss + s.medicare);
    return [tr(`🧾 Pay stub: ${usd2(s.gross)} − taxes ${usd2(tax)} − insurance ${usd2(s.pre)} − 401(k) ${usd2(s.k401)}${cut ? ` − unpaid days ${usd2(cut)}` : ''} = <b>${usd2(Math.max(0, net))}</b>. The whole stub is in the Bank.`,
      `🧾 급여명세서: ${usd2(s.gross)} − 세금 ${usd2(tax)} − 보험료 ${usd2(s.pre)} − 401(k) ${usd2(s.k401)}${cut ? ` − 무급 휴가 ${usd2(cut)}` : ''} = <b>${usd2(Math.max(0, net))}</b>. 자세한 명세서는 은행에 있어요.`)];
  }
  function stubHtml(s) {          // gross, then what comes out, in the order Linda reads it (federal, FICA, state, insurance, 401(k)), then net
    const line = (en, ko, amt, cls) => `<tr${cls ? ` class="${cls}"` : ''}><td>${esc(tr(en, ko))}</td><td>${amt}</td></tr>`, minus = (n) => '−' + usd2(n), r = (x) => +(x * 100).toFixed(2);
    return `<table class="stub">${[line('Gross pay', '세전 급여', usd2(s.gross), 'top'), line('Federal income tax', '연방 소득세', minus(s.fed)),
      line(`Social Security (${r(TAX_SS)}%)`, `사회보장세 (${r(TAX_SS)}%)`, minus(s.ss)), line(`Medicare (${r(TAX_MED)}%)`, `메디케어 (${r(TAX_MED)}%)`, minus(s.medicare)),
      line('State income tax', '주 소득세', minus(s.state)),
      ...s.prem.filter(p => p.amt).map(p => line(`${PLAN_KIND_NAME[p.kind][0]}: ${planName(p.id)}`, `${PLAN_KIND_NAME[p.kind][1]}: ${planName(p.id, true)}`, minus(p.amt))),
      line(`401(k) (${s.pct}%)`, `401(k) (${s.pct}%)`, minus(s.k401)), s.unpaid ? line('Unpaid days off', '무급 휴가', minus(s.unpaid)) : '',
      line('Net pay', '실수령액', usd2(s.paid != null ? Math.max(0, s.paid) : s.net), 'net')].join('')}</table>
      <p class="fine">${tr(`Insurance and the 401(k) come out before tax, so they lower your income tax.${s.match || s.hsa ? ` On top, from ${esc(CFG.company)}: ${[s.match ? `401(k) match ${usd2(s.match)}` : '', s.hsa ? `HSA ${usd2(s.hsa)}` : ''].filter(Boolean).join(' · ')}.` : ''}`,
        `보험료와 401(k)는 세전으로 빠져서 소득세가 줄어요.${s.match || s.hsa ? ` 회사가 따로 넣어 준 돈: ${[s.match ? `401(k) 매칭 ${usd2(s.match)}` : '', s.hsa ? `HSA ${usd2(s.hsa)}` : ''].filter(Boolean).join(' · ')}.` : ''}`)}</p>`;
  }
  function stubBox() {          // the Bank: the last pay stub
    if (!G || !benefitsOn()) return '';
    const last = (benefits().stubs || []).slice(-1)[0];
    return last ? `<h3>${tr('Pay stub', '급여명세서')} · ${esc(dShort(last.day))}</h3>${stubHtml(last)}` : '';
  }
  function benefitsLink(phone) {          // the way into the HR portal: the Work record always, the phone in open enrollment
    if (!G || fired() || !benefitsOn() || (phone && !enrollOpen(G.day))) return '';
    return `<p class="fine leave-ask"><button type="button" data-benefits="open">${enrollOpen(G.day) ? tr(`🩺 HR portal: open enrollment (until ${esc(dShort(ENROLL_TO))})`, `🩺 HR 포털: 복리후생 정기 가입 (${esc(dShort(ENROLL_TO))}까지)`) : tr('🩺 HR portal: benefits and pay', '🩺 HR 포털: 복리후생과 급여')}</button></p>`;
  }
  function benefitsPanel(h, sub, body) {
    h.textContent = tr('HR portal', 'HR 포털');
    sub.textContent = tr(`${CFG.company} · Benefits and pay`, `${ZONE_NAMES.office[1] || CFG.company} · 복리후생과 급여`);
    const B = benefits(), d = G.day, open = enrollOpen(d) && !fired(), dflt = defaultPlans();
    const sel = open ? draftOf() : d > ENROLL_TO ? plansOn(Math.max(d, COVER_FROM)) : plansOn(d), changed = open && B.sent && PLAN_KINDS.some(k => sel[k] !== B.pick[k]);
    const left = ENROLL_TO - d + 1;
    const head = d < ENROLL_FROM ? tr(`Open enrollment for the plans that start ${esc(dateLong(COVER_FROM))} runs ${esc(dMonth(ENROLL_FROM))} – ${esc(dMonth(ENROLL_TO))}. These are your plans until then.`, `${esc(dateKo(COVER_FROM))}에 시작하는 플랜의 정기 가입은 ${esc(dMonth(ENROLL_FROM))}부터 ${esc(dMonth(ENROLL_TO))}까지예요. 그때까지는 지금 플랜이에요.`)
      : open ? tr(`<b>Open enrollment is open</b> until ${esc(dateLong(ENROLL_TO))}${left === 1 ? ' (the last day)' : ` (${left} days left)`}. Pick one plan of each kind and submit; you can change and submit again until it closes. The new plans start ${esc(dateLong(COVER_FROM))}. If you don't submit, you get the ${esc(planName(dflt.medical))} with no dental or vision.`,
        `<b>복리후생 정기 가입 기간</b>이에요. ${esc(dateKo(ENROLL_TO))}까지${left === 1 ? '(오늘이 마지막 날)' : `(${left}일 남음)`} 종류마다 플랜을 하나씩 골라 제출하세요. 마감 전에는 바꿔서 다시 제출할 수 있어요. 새 플랜은 ${esc(dateKo(COVER_FROM))}에 시작해요. 제출하지 않으면 치과·안과 없이 ${esc(planName(dflt.medical, true))}에 가입돼요.`)
        : tr(`Your plans ${d >= COVER_FROM ? 'since' : 'from'} ${esc(dateLong(COVER_FROM))}${B.missed && !B.sent ? ' (you missed open enrollment, so you have the default)' : ''}. You can change them at the next open enrollment, or within 30 days of a life event such as getting married or having a baby.`,
          `${esc(dateKo(COVER_FROM))}부터의 플랜이에요${B.missed && !B.sent ? '(정기 가입을 놓쳐서 기본 플랜이에요)' : ''}. 다음 정기 가입 때나, 결혼·출산 같은 생활의 변화가 있으면 30일 안에 바꿀 수 있어요.`);
    const status = !open ? '' : B.sent && !changed ? tr(`✅ Submitted on ${esc(dShort(B.sent))}. These are your plans from ${esc(dShort(COVER_FROM))}.`, `✅ ${esc(dShort(B.sent))}에 제출했어요. ${esc(dShort(COVER_FROM))}부터 이 플랜이에요.`)
      : changed ? tr('⚠️ You changed something: submit again to keep it.', '⚠️ 바꾼 것이 있어요. 다시 제출해야 반영돼요.') : tr('⚠️ Not submitted yet.', '⚠️ 아직 제출하지 않았어요.');
    const plans = PLAN_KINDS.map(k => `<h3>${tr(PLAN_KIND_NAME[k][0], PLAN_KIND_NAME[k][1])}</h3>` + PLANS.filter(p => p.kind === k).map(p => {
      const on = sel[k] === p.id, c = p.copays || {};
      const facts = [+p.deductible ? tr(`deductible ${usd(+p.deductible)}`, `공제액 ${usd(+p.deductible)}`) : '', +p.oop_max ? tr(`out-of-pocket max ${usd(+p.oop_max)}`, `본인 부담 상한 ${usd(+p.oop_max)}`) : '',
        ...Object.keys(c).map(x => `${tr((CARE[x] || [x])[0], (CARE[x] || [])[1])} ${usd(+c[x])}`)].filter(Boolean);
      return `<div class="row plan${on ? ' on' : ''}"><div class="main"><div class="t">${esc(loc(p))}${on && !open ? ' ✓' : ''}</div><div class="s">${esc(facts.join(' · '))}</div><div class="s">${esc(tr(p.note, p.note_ko))}</div></div>
        <span class="price">${usd2(+p.premium || 0)}<small>${tr(' /paycheck', ' /급여')}</small></span>${open ? `<button type="button" data-benefits="pick:${esc(p.id)}" aria-pressed="${on}">${on ? tr('Chosen', '선택함') : tr('Choose', '고르기')}</button>` : ''}</div>`;
    }).join('')).join('');
    const next = nextPayday(d), cur = k401On(next), gross = payStub(next).gross, lost = cents(gross * Math.max(0, MATCH_UP_TO - cur) / 100 * MATCH);
    const k401 = `<h3>401(k)</h3><p class="fine">${tr(`You put <b>${cur}%</b> of every paycheck into your retirement account, before tax. ${esc(CFG.company)} adds ${MATCH === 1 ? 'the same amount' : `${Math.round(MATCH * 100)}% of it`}, up to ${MATCH_UP_TO}% of your pay. A change counts from the paycheck on ${esc(dShort(next))}.`,
      `급여마다 <b>${cur}%</b>를 세전으로 퇴직연금 계좌에 넣어요. ${esc(ZONE_NAMES.office[1] || CFG.company)}는 급여의 ${MATCH_UP_TO}%까지 ${MATCH === 1 ? '같은 금액을' : `그 ${Math.round(MATCH * 100)}%를`} 더 넣어 줘요. 바꾸면 ${esc(dShort(next))} 급여부터 적용돼요.`)}</p>
      ${fired() ? '' : `<div class="leave-ask k401"><button type="button" data-benefits="k401:${cur - 1}" aria-label="${tr('Less', '줄이기')}" ${cur <= 0 ? 'disabled' : ''}>−</button><b>${cur}%</b><button type="button" data-benefits="k401:${cur + 1}" aria-label="${tr('More', '늘리기')}" ${cur >= K401_MAX ? 'disabled' : ''}>+</button>
        <span class="fine">${lost ? tr(`You're leaving ${usd2(lost)} of the company's money on the table every paycheck.`, `급여마다 회사가 주는 돈 ${usd2(lost)}를 놓치고 있어요.`) : tr(`You get the full match: ${usd2(cents(gross * Math.min(cur, MATCH_UP_TO) / 100 * MATCH))} a paycheck.`, `매칭을 다 받아요: 급여마다 ${usd2(cents(gross * Math.min(cur, MATCH_UP_TO) / 100 * MATCH))}.`)}</span></div>`}
      <p class="fine">${tr(`Paid in so far: you ${usd2(B.saved.me)}, ${esc(CFG.company)} ${usd2(B.saved.co)}.${B.hsa || plansOn(next).medical && +(PLAN[plansOn(next).medical] || {}).hsa ? ` Your HSA: ${usd2(B.hsa || 0)}.` : ''}`, `지금까지 넣은 돈: 나 ${usd2(B.saved.me)}, 회사 ${usd2(B.saved.co)}.${B.hsa || plansOn(next).medical && +(PLAN[plansOn(next).medical] || {}).hsa ? ` HSA 잔액: ${usd2(B.hsa || 0)}.` : ''}`)}</p>`;
    // your paycheck: the first one with the plans on screen (in open enrollment: the ones you are picking)
    const first = open || (d > ENROLL_TO && d < COVER_FROM) ? nextPayday(COVER_FROM - 1) : next, s = payStub(first, sel), now = payStub(next), diff = cents(s.net - now.net);
    const pay = `<h3>${tr('Your paycheck', '내 급여')}</h3><p class="fine">${first === next ? tr(`Next paycheck, ${esc(dShort(next))}: <b>${usd2(s.net)}</b>.`, `다음 급여 ${esc(dShort(next))}: <b>${usd2(s.net)}</b>.`)
      : tr(`Next paycheck, ${esc(dShort(next))}: <b>${usd2(now.net)}</b>. With ${open ? 'these choices' : 'these plans'}, from ${esc(dShort(first))}: <b>${usd2(s.net)}</b>${diff ? ` (${diff > 0 ? '+' : '−'}${usd2(Math.abs(diff))})` : ''}.`,
        `다음 급여 ${esc(dShort(next))}: <b>${usd2(now.net)}</b>. ${open ? '지금 고른 플랜으로' : '이 플랜으로'} ${esc(dShort(first))}부터: <b>${usd2(s.net)}</b>${diff ? `(${diff > 0 ? '+' : '−'}${usd2(Math.abs(diff))})` : ''}.`)}</p>${stubHtml(s)}`;
    body.innerHTML = `<p class="fine">${head}</p>${status ? `<p class="fine"><b>${status}</b></p>` : ''}${plans}
      ${open ? `<p class="fine leave-ask"><button type="button" data-benefits="submit">${B.sent ? tr('Submit again', '다시 제출') : tr('Submit my choices', '선택 제출')}</button></p>` : ''}${k401}${pay}`;
  }
  function benefitsClick(what) {
    const [k, v] = String(what).split(':'), y = panel.querySelector('.panel-body').scrollTop;
    if (k === 'open') { openPanel('benefits'); return; }
    let ok = false;
    if (k === 'pick' && PLAN[v] && enrollOpen(G.day) && !fired()) { draftOf()[PLAN[v].kind] = v; ok = true; }
    else if (k === 'k401') ok = set401k(+v);
    else if (k === 'submit' && (ok = enroll())) note(tr('Submitted. HR sent you a confirmation email.', '제출했어요. 인사팀이 확인 이메일을 보냈어요.'));
    if (ok) { saveGame(); renderPanel(); panel.querySelector('.panel-body').scrollTop = y; }
  }

  // ---------------------------------------------------------------- the phone: texts, emails, voicemails and alerts
  // Messages (messages table) arrive when the clock passes their day and time, the bank's alerts (notify) when
  // something happens to the account. Kept in the save: G.got { id: 1 unread | 2 read }, G.notes [{ day, minute,
  // sender, kind, body, body_ko, read }]. Menu > Phone (P) lists them, newest first.
  const MSG_KIND = { text: 'Text', email: 'Email', voicemail: 'Voicemail', alert: 'Alert' }, MSG_KIND_KO = { text: '문자', email: '이메일', voicemail: '음성 메시지', alert: '알림' };
  const senderName = (id) => NPCS[id] ? fullName(NPCS[id]) : String(id || '');
  // A message or a letter can come back (messages/mail every: days between, 30 or more = the same date every month;
  // last_day: the last game day it can come): each time is its own message, '<id>@<day>' after the first. After the
  // missions the engine also sends the weather service's alerts (rain, fog, a freeze) and an email from each company
  // on autopay five days before the bill (bills.company). Kept per day (recurMemo).
  function occurrences(r, upTo) {
    const every = +r.every || 0, last = Math.min(upTo, r.last_day == null ? Infinity : +r.last_day), out = [];
    if (!every) return r.day <= last ? [r.day] : [];
    if (every >= 30 && START != null) { const dom = dateOf(r.day).getUTCDate(); for (let d = r.day; d <= last; d++) if (onDateOfMonth(d, dom)) out.push(d); }
    else for (let d = r.day; d <= last; d += every) out.push(d);
    return out;
  }
  const recurMemo = {};
  function recurring(list, key, upTo, shift) {          // the rows of a table as they arrive, up to a day (memo per hero and day)
    const k = key + '@' + G.hero + '@' + upTo;
    if (recurMemo[k]) return recurMemo[k];
    const out = [];
    list.filter(m => (!m.hero || m.hero === 'all' || m.hero === G.hero) && m.sender !== G.hero).forEach(m => occurrences(m, upTo).forEach(d => {
      const day = shift ? shift(d) : d;
      if (day <= upTo) out.push(d === m.day ? Object.assign({}, m, { day }) : Object.assign({}, m, { id: m.id + '@' + d, day, base: m.id }));
    }));
    if (key === 'msg') made(upTo).forEach(m => out.push(m));
    if (key === 'mail') creditMail(upTo).forEach(m => out.push(m));          // the bank's letters about the credit card
    out.sort((a, b) => (a.day - b.day) || (hm(a.time, 0) - hm(b.time, 0)));
    Object.keys(recurMemo).filter(x => x.startsWith(key + '@')).forEach(x => delete recurMemo[x]);
    return (recurMemo[k] = out);
  }
  const fmtDate = (d) => { const t = dateOf(d); return t ? [`${MONTHS[t.getUTCMonth()].slice(0, 3)} ${t.getUTCDate()}`, `${t.getUTCMonth() + 1}월 ${t.getUTCDate()}일`] : [`day ${d}`, `${d}일째`]; };
  function made(upTo) {          // the engine's own: weather alerts and bill statements, after the missions
    const out = [], WXS = CFG.weather_sender || 'Fairview Weather';
    for (let d = MISSION_DAYS + 1; d <= upTo; d++) {
      const w = weatherOf(d);
      if (MESSAGES.some(m => m.day === d && m.sender === WXS)) continue;
      const msg = w.kind === 'rain' ? [`Rain today, with a high of ${w.high_f}°F. Allow extra time for your commute and bring an umbrella.`, `오늘 비, 최고 ${toC(w.high_f)}°C. 출근길에 시간 여유를 두고 우산을 챙기세요.`]
        : w.kind === 'fog' ? ['Dense fog advisory until 10 AM. Slow down and use your low beams.', '오전 10시까지 짙은 안개 주의보. 속도를 줄이고 하향등을 켜세요.']
          : w.low_f <= 32 ? [`Freeze warning tonight: a low of ${w.low_f}°F. Bring pets and plants inside and cover outdoor pipes.`, `오늘 밤 한파 경보: 최저 ${toC(w.low_f)}°C. 반려동물과 화분은 안으로 들이고 바깥 수도관을 덮으세요.`] : null;
      if (msg) out.push({ id: 'wx@' + d, day: d, time: '06:45', kind: 'alert', sender: WXS, body: msg[0], body_ko: msg[1] });
    }
    rows('bills').filter(b => b.company).forEach(b => {
      for (let d = MISSION_DAYS + 6; d <= upTo + 5; d++) if (billsDue(d).includes(b) && d - 5 <= upTo) {
        const [en, ko] = fmtDate(d);
        out.push({ id: 'bill_' + b.id + '@' + d, day: d - 5, time: '08:10', kind: 'email', sender: b.company, subject: 'Your statement is ready', subject_ko: '이번 달 명세서가 나왔습니다',
          body: `Your ${String(b.name).toLowerCase()} statement is ready: ${usd2(+b.amount)} due ${en}. AutoPay is on, so it will be paid from checking ···4821 that day. No action needed.`,
          body_ko: `${b.name_ko || b.name} 명세서가 나왔습니다. ${ko}에 ${usd2(+b.amount)}가 빠져나갑니다. 자동이체가 설정되어 있어 따로 하실 일은 없습니다.` });
      }
    });
    return out;
  }
  const myMessages = () => recurring(MESSAGES, 'msg', G.day);
  const unread = () => !G ? 0 : myMessages().filter(m => (G.got || {})[m.id] === 1).length + (G.notes || []).filter(n => !n.read).length;
  const sound = (function () {          // small sounds made with Web Audio (no files): the phone's chime
    let ctx = null, failed = false;
    function context() {
      if (!ctx && !failed) { try { const A = window.AudioContext || window.webkitAudioContext; if (A) ctx = new A(); else failed = true; } catch (e) { failed = true; } }
      if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
      return ctx;
    }
    function tone(freq, at, dur, vol, type, cut) {
      const c = context();
      if (!c || c.state !== 'running') return;
      try {
        const o = c.createOscillator(), g = c.createGain(), t = c.currentTime + at;
        o.type = type || 'sine'; o.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
        g.gain.exponentialRampToValueAtTime(vol * 0.8, t + dur * 0.8);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        let out = o;
        if (cut) { const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = cut; o.connect(f); out = f; }
        out.connect(g); g.connect(c.destination);
        o.start(t); o.stop(t + dur + 0.02);
      } catch (e) { /* no sound */ }
    }
    return { context, chime() { tone(1318.5, 0, 0.22, 0.07); tone(1760, 0.11, 0.3, 0.06); },
      ring() { [0, 0.5, 1.4, 1.9].forEach(t => { tone(440, t, 0.4, 0.05); tone(480, t, 0.4, 0.05); }); },
      honk(vol) { [[0, 0.16], [0.24, 0.42]].forEach(([t, d]) => { tone(415, t, d, 0.05 * vol, 'sawtooth', 1400); tone(523, t, d, 0.04 * vol, 'sawtooth', 1400); }); } };
  })();
  function phoneBadge() {
    const n = unread(), b = $('menu-btn'), p = document.querySelector('#menu button[data-open="phone"]');
    if (n) b.dataset.n = n > 9 ? '9+' : String(n); else delete b.dataset.n;
    if (p) p.textContent = tr('Phone', '휴대전화') + (n ? ` (${n})` : '');
  }
  let hush = false;                // overnight the alerts arrive without a sound: the morning card tells
  function ping(sender, kind, text, ko) {
    if (state !== 'play' || hush) return;
    const cut = (t, n) => String(t).length > n ? String(t).slice(0, n - 2).replace(/\s+\S*$/, '') + '…' : String(t);
    const short = cut(text, 84), shortKo = ko ? cut(ko, 70) : '';
    toast(kind === 'voicemail' ? `📞 Missed call from ${senderName(sender)}. Voicemail: ${short}` : `📱 ${MSG_KIND[kind] || 'Message'} from ${senderName(sender)}: ${short}`,
      shortKo && (kind === 'voicemail' ? `📞 ${senderName(sender)}의 부재중 전화. 음성 메시지: ${shortKo}` : `📱 ${senderName(sender)}의 ${MSG_KIND_KO[kind] || '메시지'}: ${shortKo}`), 'phone', 6);
    if (kind === 'voicemail') sound.ring(); else sound.chime();
  }
  function notify(sender, body, ko, kind) {
    if (!G) return;
    G.notes = (G.notes || []).concat({ day: G.day, minute: Math.floor(G.minute), sender, kind: kind || 'alert', body, body_ko: ko || '', read: 0 }).slice(-40);
    ping(sender, kind || 'alert', body, ko);
    phoneBadge();
  }
  function checkPhone() {          // what has come in by now (only while you are walking about: not in the middle of a conversation)
    if (!G || state !== 'play') return;
    busAlert();
    G.got = G.got || {};
    const now = G.day * 1440 + G.minute;
    const back = (G.later || []).filter(x => x.at <= now);
    if (back.length) {           // the answers to your replies
      G.later = G.later.filter(x => x.at > now);
      back.forEach(x => notify(x.sender, x.body, x.body_ko, x.kind));
    }
    const due = myMessages().filter(m => !G.got[m.id] && (m.day < G.day || (m.day === G.day && hm(m.time, 0) <= G.minute)));
    if (!due.length) { if (back.length) saveGame(); return; }
    due.forEach(m => { G.got[m.id] = 1; });
    const fresh = due.filter(m => m.day === G.day && G.minute - hm(m.time, 0) < 120).pop();
    if (fresh) ping(fresh.sender, fresh.kind, fresh.subject || personal(fresh.body), fresh.subject ? fresh.subject_ko : fresh.body_ko);
    phoneBadge();
  }
  function inbox() {               // everything that has arrived, newest first
    const got = G.got || {};
    return myMessages().filter(m => got[m.id]).map(m => ({ n: -1, id: m.id, day: m.day, minute: hm(m.time, 0), sender: m.sender, kind: m.kind, subject: m.subject, subject_ko: m.subject_ko, body: personal(m.body), body_ko: m.body_ko, fresh: got[m.id] === 1 }))
      .concat((G.notes || []).map((n, i) => ({ n: i, day: n.day, minute: n.minute, sender: n.sender, kind: n.kind, body: n.body, body_ko: n.body_ko, fresh: !n.read })))
      .sort((a, b) => (b.day - a.day) || (b.minute - a.minute) || (b.n - a.n)).slice(0, 80);          // the newest 80
  }
  function readAll() {
    Object.keys(G.got || {}).forEach(id => { G.got[id] = 2; });
    (G.notes || []).forEach(n => { n.read = 1; });
    phoneBadge();
  }

  // Answering a message: a text or email goes out and the answer comes back a few minutes later (G.later), a
  // voicemail is called back and the call is heard at once. G.replied { messageId: replyId } keeps what you said.
  const repliesTo = (id) => REPLIES.filter(r => r.msg === id);
  function replyTo(msgId, replyId) {
    const m = myMessages().find(x => x.id === msgId), r = REPLIES.find(x => x.id === replyId && x.msg === msgId);
    if (!G || !m || !r || (G.replied || {})[msgId] || !(G.got || {})[msgId]) return false;
    (G.replied = G.replied || {})[msgId] = r.id;
    friendReply(m, r);
    const call = m.kind === 'voicemail';
    if (call) advanceMinutes(5);
    else if (r.answer) (G.later = G.later || []).push({ at: G.day * 1440 + Math.floor(G.minute) + Math.max(1, +r.delay || 10), sender: r.answer_from || m.sender,
      kind: m.kind === 'email' ? 'email' : 'text', body: personal(r.answer), body_ko: r.answer_ko || '' });
    logEvent('reply', call ? `Called back ${senderName(m.sender)}` : `Replied to ${senderName(m.sender)}`, 0, { ko: call ? `${senderName(m.sender)}에게 다시 전화함` : `${senderName(m.sender)}에게 답장함` });
    saveGame();
    return true;
  }
  const TONE = { good: ['👍', 'Natural', '자연스러워요'], ok: ['🙂', 'Understood, but stiff', '통하지만 딱딱해요'], poor: ['😬', 'Awkward', '어색해요'] };
  function replyBox(m) {
    if (m.n !== -1 || !m.id) return '';
    const opts = repliesTo(m.id);
    if (!opts.length) return '';
    const call = m.kind === 'voicemail', done = (G.replied || {})[m.id], mine = opts.find(o => o.id === done);
    if (!mine) return `<div class="reply"><span class="ask">${call ? tr('📞 Call back and say:', '📞 다시 전화해서:') : tr('↩︎ Reply:', '↩︎ 답장:')}</span>${opts.map(o => `<button type="button" data-reply="${esc(m.id)}|${esc(o.id)}">${esc(shown(o.label, o.label_ko))}</button>`).join('')}</div>`;
    const t = TONE[mine.tone] || TONE.good, from = mine.answer_from || m.sender;
    return `<div class="reply done"><div class="said-me"><button type="button" class="play" data-say="${esc(personal(mine.label))}" data-voice="${esc(G.hero)}" aria-label="Play">▶</button><div><b>${tr('You', '나')}${call ? tr(' (call)', ' (통화)') : ''}:</b> ${esc(shown(mine.label, mine.label_ko))}</div></div>
      ${call && mine.answer ? `<div class="said-me"><button type="button" class="play" data-say="${esc(personal(mine.answer))}" data-voice="${NPCS[from] ? esc(from) : ''}" aria-label="Play">▶</button><div><b>${esc(senderName(from))}:</b> ${esc(shown(mine.answer, mine.answer_ko))}</div></div>` : ''}
      <div class="tone ${esc(mine.tone)}">${t[0]} ${tr(t[1], t[2])}${KO() && mine.tip_ko ? ' · ' + esc(mine.tip_ko) : ''}</div></div>`;
  }

  // ---------------------------------------------------------------- the mailbox at home: what the post brings
  // Mail (mail table) comes Monday to Saturday after config mail_time, but not on federal holidays; G.mailGot { id: 1 }
  // is what you have taken out of the mailbox. Check it outside your front door (the city map, at your building).
  const mailTime = () => hm(CFG.mail_time, 13 * 60);
  const mailDay = (d) => (d - 1) % 7 !== 6 && !dayOff(d);
  const nextMailDay = (d) => { while (!mailDay(d)) d++; return d; };          // a letter due on a Sunday or a holiday comes the next mail day
  const myMail = () => recurring(MAIL, 'mail', G.day, nextMailDay).filter(m => m.day < G.day || (m.day === G.day && G.minute >= mailTime()));
  const newMail = () => !G ? [] : myMail().filter(m => !(G.mailGot || {})[m.id]);
  const MAIL_ICON = { junk: '🗑️', bill: '🧾', letter: '✉️', notice: '📋', card: '💌' }, MAIL_KIND = { junk: 'Junk mail', bill: 'Bill', letter: 'Letter', notice: 'Notice', card: 'Card' };
  const MAIL_KIND_KO = { junk: '광고 우편', bill: '청구서', letter: '편지', notice: '안내문', card: '카드' };

  // ---------------------------------------------------------------- a credit card and a credit score (cards table)
  // Jun has just moved to the U.S.: no credit history, no score, and the only card he can get is a secured one (the
  // deposit, taken from checking, is the limit). Derek and Priya have had credit for years (config credit_months) and
  // already have the bank's rewards card (config card_start), autopay on. Apply in Menu > Bank: every application is a
  // hard inquiry, and an unsecured card needs a score of cards.min_score. At a shop you pay by debit card (checking, at
  // once) or by credit card (acct.use, switched in the shop and in the bank): a charge adds to the card balance, up to
  // the limit. A statement on config card_close_dom every month (an email, and a letter by mail): the balance and a
  // minimum payment (the greater of cards.min_due or cards.min_pct % plus interest and fees, all of it when less, plus
  // anything past due), due config card_due_days later. Pay in the bank from checking (the statement balance, the
  // minimum, all, or an amount) or by autopay (off | min | statement) on the morning of the due date. The statement
  // balance paid in full by the due date keeps the grace period: no interest; otherwise the next statement charges
  // cards.apr / 365 on every day's balance. Not even the minimum by the due date: a late fee the next morning; still
  // not paid by the next due date (30 days past due), the bank reports it late: a mark on your credit report.
  // The score (300-850) is what the bureaus make of what the bank reports at each statement: 580, +10 for each month
  // paid as agreed (at most 100), −90 for each late mark in two years, the share of the limit on the last statement
  // (under 10% +70, under 30% +50, under 50% +20, under 75% 0, more −30), +1 for every two months of history (at most
  // 70), −6 for each application in a year (at most 30). The best-known score needs six months of history; this one,
  // like the free scores in banking apps, needs one statement, so Jun's first score comes with his first statement.
  // After config card_graduate_after on-time payments in a row and no late mark, a secured card becomes its
  // cards.graduates_to card (limit config card_limit) and the deposit comes back to checking.
  // G.credit = { acct: null | { id, opened, limit, deposit, bal, use debit | credit, autopay off | min | statement, acc
  // (each day's balance added up this cycle), buys, fees, grace, streak, st { day, due, bal, min, interest, fees, back,
  // paid, pastDue, late }, tx [] }, since (the first card's day), inq [days], lates [days], reports [{ day, util, ontime }],
  // scores [{ day, n }], mail [the bank's letters, as mail rows], upto (the last morning looked at) }.
  const CARDS = rows('cards').slice().sort((a, b) => (a.sort || 0) - (b.sort || 0)), CARD_BY = byId('cards');
  const CLOSE_DOM = +CFG.card_close_dom || 20, DUE_DAYS = +CFG.card_due_days || 25, GRADUATE = +CFG.card_graduate_after || 3, REMIND = +CFG.card_reminder_days || 5;
  const heroPick = (v, id) => { const m = listOf(v).map(x => String(x).split(':')).find(x => x[0].trim() === id); return m ? m[1].trim() : null; };
  const cardOf = (a) => CARD_BY[a.id] || { id: a.id, name: pretty(a.id), kind: 'unsecured', last4: '0000', apr: 20, min_due: 25, min_pct: 1, late_fee: 30, cash_back: 0 };
  const cardName = (c, ko) => `${ko ? c.name_ko || c.name : c.name} ···${c.last4}`;
  const closesOn = (d) => START != null ? onDateOfMonth(d, CLOSE_DOM) : d % 30 === 0;
  const nextClose = (d) => { let x = d + 1; while (!closesOn(x) && x < d + 32) x++; return x; };
  function credit() {
    if (G.credit) return G.credit;
    const C = G.credit = { acct: null, since: null, inq: [], lates: [], reports: [], scores: [], mail: [], upto: G.day };
    const c = CARD_BY[heroPick(CFG.card_start, G.hero)];
    if (c) { C.acct = openAcct(c, 1, 'statement'); C.since = 1; }          // had it before day 1
    const n = creditScore();
    if (n != null) C.scores.push({ day: G.day, n });
    return C;
  }
  function openAcct(c, day, autopay) {
    const secured = c.kind === 'secured';
    return { id: c.id, opened: day, limit: secured ? +c.deposit : perHero(CFG.card_limit, G.hero, +c.credit_limit || 1000), deposit: secured ? +c.deposit : 0,
      bal: 0, use: 'credit', autopay: autopay || 'off', acc: 0, buys: 0, fees: 0, grace: true, streak: 0, st: null, tx: [] };
  }
  const BANDS = [[800, 'Exceptional', '최우수'], [740, 'Very good', '매우 좋음'], [670, 'Good', '좋음'], [580, 'Fair', '보통'], [300, 'Poor', '나쁨']];
  const bandOf = (n) => BANDS.find(b => n >= b[0]) || BANDS[BANDS.length - 1];
  const utilPoints = (u) => u < 0.1 ? 70 : u < 0.3 ? 50 : u < 0.5 ? 20 : u < 0.75 ? 0 : -30;
  function creditFactors() {
    const C = G.credit, before = perHero(CFG.credit_months, G.hero, 0), last = C.reports[C.reports.length - 1];
    return {
      scored: before > 0 || C.reports.length > 0,
      months: before > 0 ? before + (G.day - 1) / 30.4 : C.since != null ? (G.day - C.since) / 30.4 : 0,
      ontime: before + C.reports.filter(r => r.ontime).length,
      util: last ? last.util : before > 0 ? perHero(CFG.credit_util_start, G.hero, 0.1) : null,
      lates: C.lates.filter(d => G.day - d < 730).length,
      inq: C.inq.filter(d => G.day - d < 365).length
    };
  }
  function creditScore() {
    const f = creditFactors();
    if (!f.scored) return null;
    return clamp(Math.round(580 + Math.min(100, f.ontime * 10) - 90 * f.lates + utilPoints(f.util == null ? 0.3 : f.util) + Math.min(70, Math.floor(f.months / 2)) - Math.min(30, 6 * f.inq)), 300, 850);
  }
  const scoreNow = () => { const s = G && G.credit && G.credit.scores; return s && s.length ? s[s.length - 1].n : null; };
  function rescore(d) {          // the bureaus update the score: [before, now]
    const C = credit(), was = scoreNow(), n = creditScore();
    if (n != null) C.scores = C.scores.concat({ day: d, n }).slice(-24);
    return [was, n];
  }
  const cardTx = (text, ko, amount) => { const a = G.credit.acct; a.tx = a.tx.concat({ day: G.day, minute: Math.floor(G.minute), text, ko: ko || '', amount }).slice(-30); };
  function addMail(m) {          // a letter from the bank (it comes with the mail; recurring() adds them to the mailbox)
    const C = credit();
    C.mail = C.mail.concat(Object.assign({ sender: CFG.bank_name, kind: 'letter' }, m)).slice(-30);
    Object.keys(recurMemo).filter(k => k.startsWith('mail@')).forEach(k => delete recurMemo[k]);
  }
  const creditMail = (upTo) => G && G.credit ? G.credit.mail.filter(m => m.day <= upTo) : [];
  // how a purchase at a shop is paid (from buy): null = the debit card (checking), 'credit' = the credit card, or why the card was declined
  function payBy(price) {
    const a = G && CARDS.length ? credit().acct : null;
    if (!a || a.use !== 'credit' || !(price > 0)) return null;
    const free = cents(a.limit - a.bal);
    if (price > free + 0.001) return tr(`Your credit card was declined: ${usd2(price)} is more than your available credit (${usd2(Math.max(0, free))}). Pay down the card in the bank, or switch to debit.`,
      `신용카드 승인이 거절됐어요. ${usd2(price)}는 사용 가능 한도(${usd2(Math.max(0, free))})보다 많아요. 은행에서 카드 대금을 갚거나 체크카드로 바꾸세요.`);
    return 'credit';
  }
  function cardCharge(amount, text, type, extra) {          // as pay(), but on the card (amount > 0)
    const a = credit().acct, c = cardOf(a);
    a.bal = cents(a.bal + amount); a.buys = cents(a.buys + amount);
    cardTx(text, (extra || {}).ko, -amount);
    logEvent('card', text, 0, Object.assign({ card: -amount }, extra || {}));          // not from checking: the bank's list leaves it out
    toast(`💳 ${usd2(amount)} on your ${cardName(c)}. Card balance ${usd2(a.bal)}.`, `💳 신용카드 결제 ${usd2(amount)} (${cardName(c, true)}). 카드 잔액 ${usd2(a.bal)}.`, null, 2.5);
  }
  // a payment from checking: what = 'statement' (the rest of the statement balance) | 'min' (the rest of the minimum) |
  // 'all' | an amount. auto: autopay (it goes through even when checking is short: the bank's overdraft rules apply).
  function cardPay(what, auto) {
    const a = G && credit().acct;
    if (!a) return 0;
    const st = a.st, owed = Math.max(0, a.bal);
    const say = (en, ko, bad) => { if (!panel.hidden && panelKind === 'bank') note(tr(en, ko), bad); else toast(en, ko, bad ? 'bad' : null, 3.5); };
    const x = cents(Math.min(owed, Math.max(0, what === 'all' ? owed : what === 'statement' ? (st ? st.bal - st.paid : 0) : what === 'min' ? (st ? st.min - st.paid : 0) : +what || 0)));
    if (!(x > 0)) { if (!auto) say('Nothing to pay.', '낼 금액이 없어요.', true); return 0; }
    if (!auto && G.money < x) { say(`Not enough in checking: you have ${usd2(G.money)}.`, `입출금 계좌 잔액이 부족해요: ${usd2(G.money)}.`, true); return 0; }
    pay(-x, auto ? 'Credit card autopay' : 'Credit card payment', 'cardpay', { ko: auto ? '신용카드 자동 납부' : '신용카드 대금 납부' });
    a.bal = cents(a.bal - x);
    if (st) st.paid = cents(st.paid + x);
    cardTx('Payment, thank you', '납부 감사합니다', x);
    if (!auto) say(`Paid ${usd2(x)} to your card from checking. Card balance ${usd2(a.bal)}.`, `입출금 계좌에서 카드 대금 ${usd2(x)}를 냈어요. 카드 잔액 ${usd2(a.bal)}.`);
    return x;
  }
  function payoff(bal, c) {          // paying only the minimum every month: how many months, and the interest (as a statement says)
    const r = (+c.apr || 0) / 100 / 12;
    let b = bal, months = 0, paid = 0;
    while (b > 0.005 && months < 600) { const i = b * r, p = Math.min(b + i, Math.max(+c.min_due || 25, b * (+c.min_pct || 1) / 100 + i)); b = b + i - p; paid += p; months++; }
    return { months, interest: cents(paid - bal) };
  }
  // the statement (the morning of the closing date): interest when the grace period is gone, cash back, the minimum,
  // the report to the credit bureaus (the share of the limit, paid as agreed), a new score, and a secured card graduating
  function closeStatement(d, out) {
    const C = G.credit, a = C.acct, c = cardOf(a), prev = a.st;
    const interest = a.grace ? 0 : cents(a.acc * (+c.apr || 0) / 100 / 365), back = cents(a.buys * (+c.cash_back || 0) / 100);
    a.bal = cents(a.bal + interest - back);
    if (interest) cardTx('Interest charge', '이자', -interest);
    if (back) cardTx('Cash back', '캐시백', back);
    const owe = Math.max(0, a.bal), pastDue = prev ? cents(Math.max(0, prev.min - prev.paid)) : 0;
    const min = owe <= 0 ? 0 : cents(Math.min(owe, Math.max(+c.min_due || 25, owe * (+c.min_pct || 1) / 100 + interest + a.fees) + pastDue));
    if (prev && prev.min > 0) a.streak = prev.late ? 0 : a.streak + 1;          // one more payment on time in a row (or back to none)
    if (owe <= 0) a.grace = true;
    a.st = { day: d, due: d + DUE_DAYS, bal: cents(a.bal), min, interest, fees: a.fees, back, buys: a.buys, paid: 0, pastDue, late: false };
    a.acc = 0; a.buys = 0; a.fees = 0;
    C.reports = C.reports.concat({ day: d, util: a.limit ? Math.round(owe / a.limit * 1000) / 1000 : 0, ontime: !prev || !prev.late }).slice(-36);
    const [was, n] = rescore(d), due = a.st.due, me = hero().name_ko || G.name;
    if (owe > 0 || interest || back) {
      const autoEn = a.autopay === 'statement' ? ' AutoPay will pay the statement balance from checking on the due date.' : a.autopay === 'min' ? ' AutoPay will pay the minimum from checking on the due date.' : ' AutoPay is off: pay it under Bank in the app.';
      const autoKo = a.autopay === 'statement' ? ' 납부 기한에 자동 납부로 명세서 금액이 입출금 계좌에서 나갑니다.' : a.autopay === 'min' ? ' 납부 기한에 자동 납부로 최소 금액이 입출금 계좌에서 나갑니다.' : ' 자동 납부가 꺼져 있습니다. 앱의 은행 메뉴에서 내 주세요.';
      notify(CFG.bank_name, `Your ${cardName(c)} statement is ready: balance ${usd2(owe)}, minimum payment ${usd2(min)} due ${dateShort(due)}.${autoEn}`,
        `${cardName(c, true)} 명세서가 나왔습니다. 청구 금액 ${usd2(owe)}, 최소 결제 금액 ${usd2(min)}, 납부 기한 ${fmtDate(due)[1]}.${autoKo}`, 'email');
      const po = owe > min + 0.005 ? payoff(owe, c) : null;
      addMail({ id: `cc_st@${d}`, day: nextMailDay(d + 2), kind: 'bill', subject: 'Your card statement', subject_ko: '신용카드 명세서',
        body: `${cardName(c)}. Statement closing date: ${dateLong(d)}. New balance: ${usd2(owe)}. Minimum payment: ${usd2(min)}, due ${dateLong(due)}.${interest ? ` Interest charged: ${usd2(interest)}.` : ''}${back ? ` Cash back: ${usd2(back)}.` : ''} Late payment warning: if we do not receive your minimum payment by the due date, you may have to pay a late fee of up to ${usd(+c.late_fee || 0)}.${po ? ` Minimum payment warning: if you make only the minimum payment each month, it will take you about ${po.months} months to pay off this balance, and you will pay about ${usd2(po.interest)} in interest.` : ''}`,
        body_ko: `${cardName(c, true)}. 명세서 마감일: ${dateKo(d)}. 이번 청구 금액: ${usd2(owe)}. 최소 결제 금액: ${usd2(min)}, 납부 기한 ${dateKo(due)}.${interest ? ` 이자: ${usd2(interest)}.` : ''}${back ? ` 캐시백: ${usd2(back)}.` : ''} 연체 경고: 납부 기한까지 최소 결제 금액이 들어오지 않으면 최대 ${usd(+c.late_fee || 0)}의 연체료가 붙을 수 있습니다.${po ? ` 최소 결제 경고: 매달 최소 금액만 내면 이 금액을 다 갚는 데 약 ${po.months}개월이 걸리고, 이자로 약 ${usd2(po.interest)}를 더 내게 됩니다.` : ''}` });
      out.push(tr(`💳 Card statement: <b>${usd2(owe)}</b>, minimum ${usd2(min)} due <b>${esc(dateShort(due))}</b>.${interest ? ` Interest ${usd2(interest)}.` : ''}${back ? ` Cash back ${usd2(back)}.` : ''}${a.autopay === 'off' ? ' Pay it in Menu > Bank.' : ' AutoPay is on.'}`,
        `💳 카드 명세서: <b>${usd2(owe)}</b>, 최소 ${usd2(min)}, 납부 기한 <b>${esc(dateKoShort(due))}</b>.${interest ? ` 이자 ${usd2(interest)}.` : ''}${back ? ` 캐시백 ${usd2(back)}.` : ''}${a.autopay === 'off' ? ' 메뉴 > 은행에서 내세요.' : ' 자동 납부가 켜져 있어요.'}`));
    }
    if (n != null && was == null) {
      notify(CFG.bank_name, `${G.name}, you have a credit score now: ${n} (${bandOf(n)[1]}). It comes from what we report to the credit bureaus each month. Check it any time under Bank in the app.`,
        `${me} 님, 이제 신용 점수가 생겼습니다: ${n}점(${bandOf(n)[2]}). 매달 신용평가기관에 보고하는 기록으로 매겨집니다. 앱의 은행 메뉴에서 언제든 확인하세요.`, 'alert');
      out.push(tr(`📈 You have a <b>credit score</b> now: <b>${n}</b> (${bandOf(n)[1]}).`, `📈 이제 <b>신용 점수</b>가 생겼어요: <b>${n}점</b>(${bandOf(n)[2]}).`));
    } else if (n != null && n !== was) out.push(tr(`📊 Your credit score: <b>${n}</b> (${n > was ? '+' : '−'}${Math.abs(n - was)}).`, `📊 신용 점수: <b>${n}점</b>(${n > was ? '+' : '−'}${Math.abs(n - was)}).`));
    const to = c.kind === 'secured' && CARD_BY[c.graduates_to];
    if (to && a.streak >= GRADUATE && !C.lates.length) graduate(a, to, out);
  }
  function graduate(a, to, out) {          // a secured card becomes an ordinary card, and the deposit comes back
    const back = a.deposit;
    a.id = to.id; a.limit = perHero(CFG.card_limit, G.hero, +to.credit_limit || 1000); a.deposit = 0;
    if (back) pay(back, 'Secured card deposit returned', 'income', { ko: '보증금형 카드 보증금 반환' });
    const me = hero().name_ko || G.name;
    notify(CFG.bank_name, `Good news, ${G.name}: after ${GRADUATE} on-time payments in a row, your secured card has graduated to the ${cardName(to)}: a ${usd(a.limit)} limit${+to.cash_back ? ` and ${+to.cash_back}% cash back` : ''}. Your ${usd(back)} deposit is back in checking.`,
      `${me} 님, 좋은 소식입니다. ${GRADUATE}번 연속으로 제때 납부하셔서 보증금형 카드가 일반 카드(${cardName(to, true)})로 바뀌었습니다. 한도는 ${usd(a.limit)}${+to.cash_back ? `, 캐시백 ${+to.cash_back}%` : ''}입니다. 보증금 ${usd(back)}는 입출금 계좌로 돌려드렸습니다.`, 'email');
    addMail({ id: `cc_grad@${G.day}`, day: nextMailDay(G.day + 3), subject: 'Your new card is enclosed', subject_ko: '새 카드를 보내 드립니다',
      body: `Congratulations! Your ${cardName(to)} is enclosed, with a credit limit of ${usd(a.limit)}. Your balance, due date and AutoPay setting stay the same. Sign the back of the card and cut up your old one.`,
      body_ko: `축하합니다! 새 카드(${cardName(to, true)})를 동봉합니다. 신용 한도는 ${usd(a.limit)}입니다. 잔액, 납부 기한, 자동 납부 설정은 그대로입니다. 카드 뒷면에 서명하고, 예전 카드는 잘라서 버리세요.` });
    out.push(tr(`🎉 Your secured card <b>graduated</b> to the ${esc(cardName(to))}: limit ${usd(a.limit)}, and your ${usd(back)} deposit is back in checking.`,
      `🎉 보증금형 카드가 <b>일반 카드</b>(${esc(cardName(to, true))})로 바뀌었어요. 한도 ${usd(a.limit)}, 보증금 ${usd(back)}는 입출금 계좌로 돌아왔어요.`));
  }
  // one morning of the card (creditMorning): the day's balance for interest, the statement, the reminder, autopay on the
  // due date, and the morning after it: a late fee, or a late mark when the last one is still unpaid
  function creditDay(d, out) {
    const C = G.credit, a = C.acct;
    if (!a) return;
    a.acc = cents(a.acc + Math.max(0, a.bal));
    if (closesOn(d) && d > a.opened) closeStatement(d, out);
    const st = a.st;
    if (!st || !(st.min > 0)) return;
    const c = cardOf(a), left = cents(st.min - st.paid), me = hero().name_ko || G.name;
    if (d === st.due - REMIND && a.autopay === 'off' && left > 0)
      notify(CFG.bank_name, `Reminder: your ${cardName(c)} payment is due ${dateShort(st.due)}. Minimum ${usd2(left)}; pay the statement balance of ${usd2(cents(st.bal - st.paid))} to avoid interest.`,
        `알림: ${cardName(c, true)} 납부 기한은 ${fmtDate(st.due)[1]}입니다. 최소 ${usd2(left)}이고, 이자를 피하려면 명세서 금액 ${usd2(cents(st.bal - st.paid))}를 모두 내세요.`, 'email');
    if (d === st.due) {
      if (a.autopay !== 'off') {
        const x = cardPay(a.autopay === 'min' ? 'min' : 'statement', true);
        if (x) {
          notify(CFG.bank_name, `AutoPay: ${usd2(x)} was paid to your ${cardName(c)} from checking ···4821.`, `자동 납부: 입출금 계좌 ···4821에서 ${cardName(c, true)} 대금 ${usd2(x)}가 나갔습니다.`);
          out.push(tr(`💳 AutoPay paid <b>${usd2(x)}</b> on your credit card.`, `💳 자동 납부로 신용카드 대금 <b>${usd2(x)}</b>를 냈어요.`));
        }
      } else if (left > 0) {
        notify(CFG.bank_name, `Your ${cardName(c)} payment is due today: minimum ${usd2(left)}.`, `오늘이 ${cardName(c, true)} 납부 기한입니다: 최소 ${usd2(left)}.`);
        out.push(tr(`⏰ Your credit card payment is due <b>today</b>: at least ${usd2(left)} (Menu > Bank).`, `⏰ 오늘이 신용카드 <b>납부 기한</b>이에요: 최소 ${usd2(left)} (메뉴 > 은행).`));
      }
    }
    if (d !== st.due + 1) return;
    if (st.paid >= st.min - 0.005) { a.grace = st.paid >= st.bal - 0.005; return; }
    st.late = true; a.grace = false;
    const fee = +c.late_fee || 0;
    if (fee) { a.bal = cents(a.bal + fee); a.fees = cents(a.fees + fee); cardTx('Late fee', '연체료', -fee); }
    if (st.pastDue > 0 && st.paid < st.pastDue - 0.005) {          // the last statement's minimum is now 30 days past due
      C.lates = C.lates.concat(d);
      const n = rescore(d)[1];
      notify(CFG.bank_name, `${G.name}, your ${cardName(c)} is 30 days past due, so we have reported a late payment to the credit bureaus. A ${usd2(fee)} late fee was added. Please pay at least ${usd2(cents(st.min - st.paid + fee))} as soon as you can.`,
        `${me} 님, ${cardName(c, true)} 대금이 30일 연체되어 신용평가기관에 연체를 보고했습니다. 연체료 ${usd2(fee)}가 붙었습니다. 되도록 빨리 최소 ${usd2(cents(st.min - st.paid + fee))}를 내 주세요.`, 'email');
      out.push(tr(`⚠️ Your card payment is <b>30 days late</b>: the bank reported it to the credit bureaus${n != null ? `, and your score fell to <b>${n}</b>` : ''}. A ${usd2(fee)} late fee was added.`,
        `⚠️ 카드 대금이 <b>30일 연체</b>되어 은행이 신용평가기관에 보고했어요${n != null ? `. 점수가 <b>${n}점</b>으로 떨어졌어요` : ''}. 연체료 ${usd2(fee)}가 붙었어요.`));
    } else {
      notify(CFG.bank_name, `We didn't receive your minimum payment of ${usd2(st.min)} on your ${cardName(c)} by ${dateShort(st.due)}. A ${usd2(fee)} late fee was added, and interest now applies to your balance. Pay before your next due date to keep it off your credit report.`,
        `${fmtDate(st.due)[1]}까지 ${cardName(c, true)}의 최소 결제 금액 ${usd2(st.min)}가 들어오지 않았습니다. 연체료 ${usd2(fee)}가 붙었고, 이제 잔액에 이자가 붙습니다. 다음 납부 기한 전에 내시면 신용 기록에는 남지 않습니다.`, 'email');
      out.push(tr(`⚠️ You missed the minimum payment on your credit card: a <b>${usd2(fee)}</b> late fee, and interest from now on. Pay before the next due date, or it goes on your credit report.`,
        `⚠️ 신용카드 최소 결제 금액을 내지 못했어요: 연체료 <b>${usd2(fee)}</b>, 이제부터 이자도 붙어요. 다음 납부 기한 전에 내지 않으면 신용 기록에 남아요.`));
    }
  }
  function creditMorning() {          // from goToSleep (and the debug api): every morning since the last one looked at
    if (!G || !CARDS.length) return [];
    const C = credit(), out = [];
    for (let d = C.upto + 1; d <= G.day; d++) creditDay(d, out);
    C.upto = Math.max(C.upto, G.day);
    return out;
  }
  // applying (Menu > Bank): a hard inquiry; a secured card takes the deposit from checking and needs no history,
  // an unsecured one needs a job and a score of cards.min_score. The answer comes at once, with a letter by mail.
  function applyCard(id) {
    const C = credit(), c = CARD_BY[id];
    if (!c || C.acct) return false;
    const say = (en, ko, bad) => { if (!panel.hidden) note(tr(en, ko), bad); else toast(en, ko, bad ? 'bad' : 'good', 4); };
    if (c.kind === 'secured' && G.money < +c.deposit) { say(`The deposit is ${usd(+c.deposit)}, and checking has ${usd2(G.money)}.`, `보증금은 ${usd(+c.deposit)}인데 입출금 계좌에는 ${usd2(G.money)}가 있어요.`, true); return false; }
    C.inq = C.inq.concat(G.day);
    const n = creditScore(), why = c.kind === 'secured' ? null : fired() ? 'income' : n == null ? 'history' : n < (+c.min_score || 0) ? 'score' : null;
    rescore(G.day);
    const me = hero().name_ko || G.name;
    if (why) {
      const r = { income: ['no current income from an employer', '현재 직장 소득이 없음'], history: ['no credit history in the U.S., not enough to give you a score', '미국 신용 기록이 없어 점수를 낼 수 없음'],
        score: [`a credit score of ${n} (this card needs ${c.min_score} or more)`, `신용 점수 ${n}점(이 카드는 ${c.min_score}점 이상)`] }[why];
      const tip = why !== 'income' && CARDS.some(x => x.kind === 'secured') ? [' A secured card is a good way to build credit first.', ' 먼저 보증금형 카드로 신용을 쌓아 보세요.'] : ['', ''];
      notify(CFG.bank_name, `${G.name}, we're sorry: we can't approve your application for the ${c.name} right now. The main reason: ${r[0]}. A letter with the details is on its way.${tip[0]}`,
        `${me} 님, 죄송합니다. 지금은 ${c.name_ko || c.name} 신청을 승인할 수 없습니다. 주된 이유: ${r[1]}. 자세한 내용은 우편으로 보내 드립니다.${tip[1]}`, 'email');
      addMail({ id: `cc_no@${G.day}_${C.inq.length}`, day: nextMailDay(G.day + 2), subject: 'About your credit card application', subject_ko: '신용카드 신청 결과 안내',
        body: `Thank you for applying for the ${c.name}. We are unable to approve it at this time. Principal reason: ${r[0]}. Our decision was based in part on information from a consumer credit bureau. You have the right to a free copy of your credit report from that bureau within 60 days, and to dispute anything in it that is wrong.`,
        body_ko: `${josa(c.name_ko || c.name, '을', '를')} 신청해 주셔서 감사합니다. 지금은 승인해 드릴 수 없습니다. 주된 이유: ${r[1]}. 이 결정에는 신용평가기관의 정보가 일부 쓰였습니다. 60일 안에 그 기관에서 신용 보고서를 무료로 받아 볼 수 있고, 틀린 내용이 있으면 정정을 요청할 수 있습니다. (adverse action notice: 신청 거절 사유 통지)` });
      logEvent('credit', `Card application declined: ${c.name}`, 0, { ko: `카드 신청 거절: ${c.name_ko || c.name}` });
      say(`Declined: ${r[0]}.${tip[0]}`, `거절됐어요: ${r[1]}.${tip[1]}`, true);
      return true;
    }
    if (c.kind === 'secured') pay(-c.deposit, 'Secured card deposit', 'cardpay', { ko: '보증금형 카드 보증금' });
    C.acct = openAcct(c, G.day, 'off');
    if (C.since == null) C.since = G.day;
    notify(CFG.bank_name, `Welcome, ${G.name}! Your ${cardName(c)} is approved, with a ${usd(C.acct.limit)} limit${C.acct.deposit ? ' (your deposit)' : ''}. It is in your phone's wallet now, and the card comes by mail in a few days. Your first statement closes ${dateShort(nextClose(G.day))}.`,
      `${me} 님, 환영합니다! 신청하신 카드(${cardName(c, true)})가 승인되었습니다. 한도는 ${usd(C.acct.limit)}${C.acct.deposit ? '(보증금)' : ''}입니다. 지금 바로 휴대전화 지갑에서 쓸 수 있고, 실물 카드는 며칠 뒤 우편으로 갑니다. 첫 명세서는 ${fmtDate(nextClose(G.day))[1]}에 마감합니다.`, 'email');
    addMail({ id: `cc_card@${G.day}`, day: nextMailDay(G.day + 3), subject: 'Your new credit card', subject_ko: '새 신용카드가 도착했습니다',
      body: `Your ${cardName(c)} is enclosed. Credit limit: ${usd(C.acct.limit)}. APR on purchases: ${+c.apr}%. Pay the statement balance in full by the due date each month and you pay no interest. Set up AutoPay in the app so you never miss a due date.`,
      body_ko: `새 카드(${cardName(c, true)})를 동봉합니다. 신용 한도: ${usd(C.acct.limit)}. 구매 연이율(APR): ${+c.apr}%. 매달 납부 기한까지 명세서 금액을 모두 내면 이자가 없습니다. 납부 기한을 놓치지 않도록 앱에서 자동 납부를 설정하세요.` });
    logEvent('credit', `Card approved: ${c.name}`, 0, { ko: `카드 승인: ${c.name_ko || c.name}` });
    say(`Approved! Your ${cardName(c)} is ready to use: limit ${usd(C.acct.limit)}. Shops now charge it (switch back to debit any time).`, `승인됐어요! 새 카드(${cardName(c, true)})를 바로 쓸 수 있어요. 한도 ${usd(C.acct.limit)}. 이제 가게에서 이 카드로 결제해요(언제든 체크카드로 바꿀 수 있어요).`);
    return true;
  }
  function cardCalendar(d) {          // the calendar: the closing date and the due date
    const a = G && G.credit && G.credit.acct, out = [];
    if (!a) return out;
    if (closesOn(d) && d > a.opened) out.push(tr('Credit card statement closes', '신용카드 명세서 마감'));
    if (a.st && a.st.due === d && a.st.min > 0) out.push(tr(`Credit card payment due: minimum ${usd2(a.st.min)}, statement ${usd2(a.st.bal)}${a.autopay !== 'off' ? ' (AutoPay)' : ''}`, `신용카드 납부 기한: 최소 ${usd2(a.st.min)}, 명세서 ${usd2(a.st.bal)}${a.autopay !== 'off' ? ' (자동 납부)' : ''}`));
    return out;
  }
  const modeGroup = (key, cur, list, label) => `<div class="mode" role="group" aria-label="${esc(label)}">${list.map(([k, en, ko]) => `<button type="button" data-credit="${key}:${k}" aria-pressed="${cur === k}">${tr(en, ko)}</button>`).join('')}</div>`;
  function cardShopRow() {          // the shop panel: pay by debit card or credit card
    const a = G && CARDS.length ? credit().acct : null;
    if (!a) return '';
    const c = cardOf(a), free = Math.max(0, cents(a.limit - a.bal));
    return `<div class="row tips"><div class="main"><div class="t">${tr('Pay with', '결제 수단')}</div><div class="s">${a.use === 'credit' ? tr(`${esc(cardName(c))}: ${usd2(free)} available`, `${esc(cardName(c, true))}: ${usd2(free)} 사용 가능`) : tr(`Debit card: from checking at once (${usd2(G.money)})`, `체크카드: 입출금 계좌에서 바로 (${usd2(G.money)})`)}</div></div>
      ${modeGroup('use', a.use, [['debit', 'Debit', '체크카드'], ['credit', 'Credit', '신용카드']], tr('Pay with', '결제 수단'))}</div>`;
  }
  const monthsText = (m) => { const y = Math.floor(m / 12), mo = Math.floor(m % 12); return y ? tr(`${y} year${y === 1 ? '' : 's'}${mo ? ` ${mo} month${mo === 1 ? '' : 's'}` : ''}`, `${y}년${mo ? ` ${mo}개월` : ''}`) : tr(`${mo} month${mo === 1 ? '' : 's'}`, `${mo}개월`); };
  function creditPanel() {          // Menu > Bank: the card (or the cards to apply for), the score and what makes it
    if (!G || !CARDS.length) return '';
    const C = credit(), a = C.acct, n = scoreNow();
    let h = `<h3>${tr('Credit card', '신용카드')}</h3>`;
    if (a) {
      const c = cardOf(a), st = a.st, free = Math.max(0, cents(a.limit - a.bal));
      h += `<div class="sum"><div><b>${usd2(a.bal)}</b>${tr('card balance', '카드 잔액')}</div><div><b>${usd2(free)}</b>${tr('available credit', '사용 가능 한도')}</div></div>
        <p class="fine">${esc(cardName(c, KO()))} · ${tr('limit', '한도')} ${usd(a.limit)}${a.deposit ? tr(` (your ${usd(a.deposit)} deposit)`, ` (보증금 ${usd(a.deposit)})`) : ''} · APR ${+c.apr}%${+c.cash_back ? tr(` · ${+c.cash_back}% cash back`, ` · 캐시백 ${+c.cash_back}%`) : ''}.
        ${tr(`Statements close on the ${ordinal(CLOSE_DOM)} of every month, and the payment is due ${DUE_DAYS} days later.`, `명세서는 매달 ${CLOSE_DOM}일에 마감하고, 대금은 ${DUE_DAYS}일 뒤까지 내요.`)}${c.kind === 'secured' && c.graduates_to ? tr(` After ${GRADUATE} on-time payments in a row it becomes an ordinary card (on time so far: ${a.streak}).`, ` ${GRADUATE}번 연속으로 제때 내면 일반 카드로 바뀌어요(지금까지 ${a.streak}번).`) : ''}</p>`;
      if (st) {
        const left = cents(st.min - st.paid), rest = cents(st.bal - st.paid);
        const state = st.min <= 0 ? tr('Nothing to pay', '낼 금액 없음') : rest <= 0.005 ? tr('Paid in full: no interest', '전액 납부: 이자 없음')
          : st.late ? tr(`Late: ${usd2(Math.max(0, left))} of the minimum unpaid`, `연체: 최소 금액 중 ${usd2(Math.max(0, left))} 미납`)
            : left > 0.005 ? tr(`${usd2(left)} of the minimum left`, `최소 금액 중 ${usd2(left)} 남음`) : tr(`Minimum paid. Pay the rest (${usd2(rest)}) by the due date to avoid interest.`, `최소 금액은 냈어요. 이자를 피하려면 나머지 ${usd2(rest)}도 기한까지 내세요.`);
        const po = rest > st.min + 0.005 && !st.late ? payoff(rest, c) : null;
        h += `<div class="row"><span class="when">${esc(dMonth(st.day))}</span><div class="main"><div class="t">${tr(`Statement ${usd2(st.bal)} · minimum ${usd2(st.min)} · due ${esc(dShort(st.due))}`, `명세서 ${usd2(st.bal)} · 최소 ${usd2(st.min)} · 기한 ${esc(dShort(st.due))}`)}</div>
          <div class="s">${state}${st.interest ? tr(` · interest ${usd2(st.interest)}`, ` · 이자 ${usd2(st.interest)}`) : ''}${st.fees ? tr(` · fees ${usd2(st.fees)}`, ` · 수수료 ${usd2(st.fees)}`) : ''}${st.back ? tr(` · cash back ${usd2(st.back)}`, ` · 캐시백 ${usd2(st.back)}`) : ''}</div>
          ${po ? `<div class="s">${tr(`Only the minimum every month: about ${po.months} months to pay off, ${usd2(po.interest)} in interest.`, `매달 최소 금액만 내면: 다 갚는 데 약 ${po.months}개월, 이자 ${usd2(po.interest)}.`)}</div>` : ''}</div></div>`;
      } else h += `<p class="fine">${tr(`No statement yet: the first closes on ${esc(dShort(nextClose(G.day)))}.`, `아직 명세서가 없어요. 첫 명세서는 ${esc(dShort(nextClose(G.day)))}에 마감해요.`)}</p>`;
      const restSt = st ? cents(st.bal - st.paid) : 0, restMin = st ? cents(st.min - st.paid) : 0;
      if (a.bal > 0) h += `<div class="leave-ask">${restSt > 0 ? `<button type="button" data-credit="pay:statement">${tr(`Pay statement ${usd2(Math.min(restSt, a.bal))}`, `명세서 금액 ${usd2(Math.min(restSt, a.bal))} 내기`)}</button>` : ''}${restMin > 0 && restMin < restSt ? `<button type="button" data-credit="pay:min">${tr(`Pay minimum ${usd2(restMin)}`, `최소 금액 ${usd2(restMin)} 내기`)}</button>` : ''}${a.bal > restSt + 0.005 ? `<button type="button" data-credit="pay:all">${tr(`Pay all ${usd2(a.bal)}`, `전액 ${usd2(a.bal)} 내기`)}</button>` : ''}
        <input id="card-amount" type="number" min="1" step="0.01" inputmode="decimal" placeholder="${tr('Amount', '금액')}" aria-label="${tr('Amount', '금액')}"><button type="button" data-credit="pay:other">${tr('Pay', '내기')}</button></div>`;
      h += `<div class="row tips"><div class="main"><div class="t">${tr('AutoPay', '자동 납부')}</div><div class="s">${tr('From checking, on the due date', '납부 기한에 입출금 계좌에서')}</div></div>${modeGroup('autopay', a.autopay, [['off', 'Off', '끄기'], ['min', 'Minimum', '최소 금액'], ['statement', 'Statement', '명세서 금액']], tr('AutoPay', '자동 납부'))}</div>
        <div class="row tips"><div class="main"><div class="t">${tr('Pay at shops with', '가게에서 결제')}</div><div class="s">${a.use === 'credit' ? tr('Credit card: pay the statement later', '신용카드: 나중에 명세서로') : tr('Debit card: from checking at once', '체크카드: 입출금 계좌에서 바로')}</div></div>${modeGroup('use', a.use, [['debit', 'Debit', '체크카드'], ['credit', 'Credit', '신용카드']], tr('Pay with', '결제 수단'))}</div>`;
      const tx = a.tx.slice().reverse().slice(0, 8);
      if (tx.length) h += tx.map(t => `<div class="row"><span class="when">${esc(dMonth(t.day))} · ${clk(t.minute)}</span><div class="main"><div class="t">${esc(tr(t.text, t.ko))}</div><div class="s">${tr('Credit card', '신용카드')}</div></div><span class="price ${t.amount < 0 ? 'out' : 'in'}">${t.amount < 0 ? '−' : '+'}${usd2(Math.abs(t.amount))}</span></div>`).join('');
    } else {
      h += `<p class="fine">${tr('You pay with your debit card: the money leaves checking at once. A credit card lets you pay later, and paying it on time builds a credit score (landlords, phone plans and car loans look at it).', '지금은 체크카드로 결제해요. 돈이 입출금 계좌에서 바로 나가요. 신용카드는 나중에 갚는 카드이고, 제때 갚으면 신용 점수가 쌓여요(집주인, 휴대전화 요금제, 자동차 대출이 이 점수를 봐요).')}</p>`
        + CARDS.map(c => `<div class="row"><div class="main"><div class="t">${esc(loc(c))}</div><div class="s">${esc(tr(c.note, c.note_ko))}</div>
          <div class="s">${c.kind === 'secured' ? tr(`Deposit ${usd(+c.deposit)} = limit`, `보증금 ${usd(+c.deposit)} = 한도`) : tr(`Score ${c.min_score}+`, `점수 ${c.min_score}점 이상`)} · APR ${+c.apr}%${+c.cash_back ? tr(` · ${+c.cash_back}% cash back`, ` · 캐시백 ${+c.cash_back}%`) : ''}</div></div>
          <button type="button" data-credit="apply:${esc(c.id)}">${tr('Apply', '신청')}</button></div>`).join('');
    }
    h += `<h3>${tr('Credit score', '신용 점수')}</h3>`;
    if (n == null) h += `<p class="fine">${tr(`No score yet: there is no U.S. credit history in your name. A score appears when a card's first statement is reported to the credit bureaus${a ? ` (${esc(dShort(nextClose(G.day)))})` : ''}.`, `아직 점수가 없어요. 내 이름으로 된 미국 신용 기록이 없어서예요. 카드의 첫 명세서가 신용평가기관에 보고되면 점수가 생겨요${a ? `(${esc(dShort(nextClose(G.day)))})` : ''}.`)}</p>`;
    else {
      const f = creditFactors(), b = bandOf(n), prev = C.scores.length > 1 ? C.scores[C.scores.length - 2].n : null;
      h += `<div class="sum"><div><b>${n}</b>${tr(b[1], b[2])} · 300–850${prev != null && prev !== n ? ` · ${n > prev ? '▲' : '▼'} ${Math.abs(n - prev)}` : ''}</div></div>`
        + [[tr('Payment history', '납부 기록'), tr(`${Math.round(f.ontime)} month${f.ontime === 1 ? '' : 's'} paid as agreed${f.lates ? `, ${f.lates} late` : ', none late'}`, `약정대로 낸 달 ${Math.round(f.ontime)}개월${f.lates ? `, 연체 ${f.lates}번` : ', 연체 없음'}`)],
          [tr('Credit used', '한도 사용률'), f.util == null ? '—' : `${Math.round(f.util * 100)}%` + tr(' of your limit on the last statement (under 30% is good, under 10% better)', ' (마지막 명세서 기준, 30% 아래면 좋고 10% 아래면 더 좋아요)')],
          [tr('Age of credit', '신용 기록 기간'), monthsText(f.months)],
          [tr('Hard inquiries', '하드 조회'), tr(`${f.inq} in the last year (applications)`, `최근 1년 ${f.inq}번(카드 신청)`)]]
          .map(([t, s]) => `<div class="row"><div class="main"><div class="t">${t}</div><div class="s">${s}</div></div></div>`).join('');
    }
    return h + `<p class="fine">${tr('Debit or credit? Debit takes the money from checking at once. Credit borrows it until the statement: pay the statement balance in full by the due date and it costs nothing (and builds your score). Carry a balance and interest (APR) is added; miss the minimum and there is a late fee, and a month later it goes on your credit report.',
      '체크카드와 신용카드의 차이: 체크카드는 입출금 계좌에서 바로 돈이 나가요. 신용카드는 명세서가 나올 때까지 빌려 쓰는 거예요. 납부 기한까지 명세서 금액을 전부 내면 비용이 없고 점수도 쌓여요. 잔액을 남기면 이자(APR)가 붙고, 최소 금액도 못 내면 연체료가, 한 달이 더 지나면 신용 기록에 연체가 남아요.')}</p>`;
  }
  function creditClick(b) {          // the buttons of the bank panel and the shop panel (data-credit="what:arg")
    const [what, arg] = String(b.dataset.credit).split(':'), C = credit(), body = panel.querySelector('.panel-body'), y = body.scrollTop;
    let ok = false;
    if (what === 'use' && C.acct) { C.acct.use = arg === 'credit' ? 'credit' : 'debit'; ok = true; }
    else if (what === 'autopay' && C.acct) { C.acct.autopay = /^(off|min|statement)$/.test(arg) ? arg : 'off'; ok = true; }
    else if (what === 'pay') ok = cardPay(arg === 'other' ? +((panel.querySelector('#card-amount') || {}).value || 0) : arg) > 0;
    else if (what === 'apply') ok = applyCard(arg);
    if (!ok) return;
    saveGame();
    const nt = panel.querySelector('.panel-note'), keep = [nt.textContent, nt.className];
    renderPanel();
    nt.textContent = keep[0]; nt.className = keep[1]; body.scrollTop = y;
  }
  const cardDebug = {          // SO.debug.card
    get state() { return G && CARDS.length ? JSON.parse(JSON.stringify(credit())) : null; },
    get score() { return G && CARDS.length ? (credit(), scoreNow()) : null; }, get factors() { return G && CARDS.length ? (credit(), creditFactors()) : null; },
    apply(id) { applyCard(id); return !!credit().acct; }, use(k) { const a = credit().acct; if (a) a.use = k === 'debit' ? 'debit' : 'credit'; return a ? a.use : null; },
    autopay(m) { const a = credit().acct; if (a) a.autopay = /^(off|min|statement)$/.test(m) ? m : 'off'; return a ? a.autopay : null; },
    pay(what) { return cardPay(what); }, tick() { return creditMorning(); }, charge(amount, text) { if (!credit().acct) return null; cardCharge(+amount, text || 'Test', 'card'); return credit().acct.bal; },
    statement() { const a = credit().acct, out = []; if (!a) return null; closeStatement(G.day, out); return Object.assign({ lines: out }, a.st); }          // close a statement now
  };

  // ---------------------------------------------------------------- the radio at home: the local station
  // Turn it on at the desk at home (Menu is not needed): the station, the time and the date said the American way, the
  // weather from the weather table with the sunset, traffic in the rush hours of a working day, the day's local news
  // (radio table: day = that game day, NULL = any day, taken in turn), a holiday, and an ad. Every part can be heard.
  const RADIO = rows('radio').slice().sort((a, b) => (a.sort || 0) - (b.sort || 0));
  const STATION = CFG.radio_station || 'KFVW 88.5';
  const RADIO_KIND = { station: 'On the air', weather: 'Weather', traffic: 'Traffic', news: 'Local news', community: 'Around town', sports: 'Sports', holiday: 'Today', ad: 'A word from our sponsors' };
  const RADIO_KIND_KO = { station: '방송 중', weather: '날씨', traffic: '교통', news: '지역 뉴스', community: '동네 소식', sports: '스포츠', holiday: '오늘', ad: '광고' };
  const ordinal = (n) => n + ((n % 100 >= 11 && n % 100 <= 13) ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] || 'th');
  const spokenDate = (d) => { const t = dateOf(d); return t ? `${weekday(d)}, ${MONTHS[t.getUTCMonth()]} ${ordinal(t.getUTCDate())}` : weekday(d); };
  const SKY = { clear: 'clear skies', partly: 'a few clouds', cloudy: 'cloudy skies', rain: 'gray skies', fog: 'some fog' };
  const rotate = (list, n, seed) => list.length ? Array.from({ length: Math.min(n, list.length) }, (_, i) => list[(seed + i) % list.length]) : [];
  function radioShow() {
    const d = G.day, m = Math.floor(G.minute), wx = weatherNow(), sun = sunOf(d), out = [];
    const hello = m < 12 * 60 ? 'Good morning' : m < 17 * 60 ? 'Good afternoon' : 'Good evening';
    out.push({ kind: 'station', en: `${hello}, ${CFG.city}! You're listening to ${STATION}, ${CFG.city} Community Radio. It's ${clock(m)} on ${spokenDate(d)}.`,
      ko: `${STATION} ${CFG.city} 커뮤니티 라디오입니다. 지금은 ${dateKo(d)} ${hhmm(m)}이에요.` });
    const w = wx.row, next = weatherOf(d + 1), wet = wx.rain > 0.12, sunNext = sunOf(d + 1);
    const sky = wx.kind === 'fog' && wx.fog < 0.05 ? 'partly' : wx.kind;         // the morning fog has lifted
    const now = `Right now it's ${wx.temp} degrees${wet ? ' and raining' : wx.kind === 'fog' && wx.fog > 0.2 ? ' and foggy' : darkAt(m) ? '' : ` with ${SKY[sky] || 'mild weather'}`}.`;
    const brolly = (w.kind === 'rain' || (m >= 15 * 60 && next.kind === 'rain')) && !/umbrella/i.test(m < 15 * 60 ? w.forecast : next.forecast);
    const day = m < 15 * 60 ? `Today: ${w.forecast || ''} A high of ${w.high_f}, and tonight a low of ${w.low_f}.` : `Tonight, a low of ${w.low_f}. Tomorrow: ${next.forecast || ''} A high of ${next.high_f}.`;
    const light = sun ? (m < sun.set ? ` Sunset this evening is at ${clock(sun.set)}.` : sunNext ? ` Sunrise tomorrow is at ${clock(sunNext.rise)}.` : '') : '';
    out.push({ kind: 'weather', en: `${now} ${day}${light}${brolly ? " Don't forget your umbrella." : ''}`,
      ko: `지금 기온 ${toC(wx.temp)}°C(${wx.temp}°F). ${m < 15 * 60 ? `${w.forecast_ko || ''} 최고 ${toC(w.high_f)}°C, 밤 최저 ${toC(w.low_f)}°C.` : `밤 최저 ${toC(w.low_f)}°C. 내일: ${next.forecast_ko || ''} 최고 ${toC(next.high_f)}°C.`}${sun ? (m < sun.set ? ` 오늘 해넘이 ${hhmm(sun.set)}.` : sunNext ? ` 내일 해돋이 ${hhmm(sunNext.rise)}.` : '') : ''}` });
    const rush = !offWork(d) && !dayOff(d) && ((m >= 6 * 60 && m < 10 * 60) || (m >= 15.5 * 60 && m < 19 * 60));
    const pool = (k) => RADIO.filter(r => r.kind === k && r.day == null);
    const bus = rush && busOnAir(d, m);          // how late the buses are running (the bus timetable)
    if (bus) out.push(bus); else if (rush) rotate(RADIO.filter(r => r.kind === 'traffic' && r.day === d).concat(pool('traffic')), 1, d * 2 + (m >= 12 * 60 ? 1 : 0)).forEach(r => out.push({ kind: 'traffic', en: r.text, ko: r.text_ko }));
    const hol = holidayOf(d);
    if (hol) out.push({ kind: 'holiday', en: `Today is ${hol.name}. ${hol.note || ''}`, ko: `오늘은 ${hol.name_ko || hol.name}. ${hol.note_ko || ''}` });
    const today = RADIO.filter(r => r.day === d && r.kind !== 'traffic' && r.kind !== 'ad');
    (today.length ? today : rotate(RADIO.filter(r => r.day == null && /^(news|community|sports)$/.test(r.kind)), 2, d * 2)).forEach(r => out.push({ kind: r.kind, en: r.text, ko: r.text_ko }));
    rotate(pool('ad'), 1, d).forEach(r => out.push({ kind: 'ad', en: r.text, ko: r.text_ko }));
    out.push({ kind: 'station', en: `That's the news at ${clock(m - m % 30)}. Stay with us: more music is coming up on ${STATION}.`, ko: `${hhmm(m - m % 30)} 뉴스였습니다. 채널 고정하세요.` });
    return out;
  }

  // ---------------------------------------------------------------- TV at home: real American news and tech news on YouTube
  // Sit on the sofa at home (places of kind tv) and pick a channel (tv table: YouTube channel id, live = the channel
  // streams live). It plays in the YouTube player with English captions: the channel's live stream, or its latest
  // uploads (the channel's uploads playlist, UU + the id after UC). It needs the internet, and YouTube does not play
  // in a page opened as a file (no referrer): there the channels open on youtube.com instead. The game clock stands
  // still while the TV is on; when you turn it off, the time you watched passes (5 minutes to 3 hours).
  const TV = rows('tv').slice().sort((a, b) => (a.sort || 0) - (b.sort || 0));
  const TV_KIND = { news: ['US news', '미국 뉴스'], tech: ['Tech news', 'IT 뉴스'] };
  const fileMode = location.protocol === 'file:';
  const tvEmbed = (c, live) => 'https://www.youtube.com/embed/' + (live ? `live_stream?channel=${encodeURIComponent(c.channel)}&` : `videoseries?list=UU${encodeURIComponent(String(c.channel).slice(2))}&`)
    + 'autoplay=1&cc_load_policy=1&cc_lang_pref=en&hl=en&rel=0&playsinline=1';
  const tvLink = (c, live) => `https://www.youtube.com/channel/${encodeURIComponent(c.channel)}/${live ? 'live' : 'videos'}`;
  const tvNow = { id: null, live: false, since: 0 };
  function tvOn(id, live) {
    const c = TV.find(x => x.id === id);
    if (!c) return false;
    if (!tvNow.since) tvNow.since = performance.now();
    tvNow.id = id; tvNow.live = !!live;
    if (window.speechSynthesis) speechSynthesis.cancel();
    return true;
  }
  function tvOff() {               // the panel closes: the video stops and the time you watched passes
    const body = panel.querySelector('.panel-body');
    body.querySelectorAll('iframe').forEach(f => f.remove());
    if (!tvNow.since || !G) { tvNow.id = null; tvNow.since = 0; return; }
    const c = TV.find(x => x.id === tvNow.id), mins = clamp(Math.round((performance.now() - tvNow.since) / 60000), 5, 180);
    tvNow.id = null; tvNow.since = 0;
    if (!c) return;
    logEvent('tv', `Watched TV: ${c.name}`, 0, { minutes: mins });
    advanceMinutes(mins);
    saveGame();
    toast(`You watched ${c.name} for ${mins} minutes.`, `${c.name}을(를) ${mins}분 동안 봤어요.`, null, 3);
  }
  function tvPanel(h, sub, body) {
    h.textContent = 'TV';
    const c = TV.find(x => x.id === tvNow.id);
    sub.textContent = c ? `${c.name}${tvNow.live ? tr(' · LIVE', ' · 생방송') : tr(' · latest videos', ' · 최신 영상')}` : tr('Pick a channel', '채널을 고르세요');
    const screen = !c ? `<div class="tv-screen off"><p>${tr('Pick a channel below. News plays live, tech channels play their latest videos, with English captions.', '아래에서 채널을 고르세요. 뉴스는 생방송, IT 채널은 최신 영상이 영어 자막과 함께 나옵니다.')}</p></div>`
      : fileMode ? `<div class="tv-screen off"><p>${tr('YouTube does not play inside a game opened from a file.', '파일로 연 게임 안에서는 YouTube가 재생되지 않아요.')} <a href="${esc(tvLink(c, tvNow.live))}" target="_blank" rel="noopener">${tr(`Watch ${esc(c.name)} on YouTube ↗`, `YouTube에서 ${esc(c.name)} 보기 ↗`)}</a>${tr(', or play the web version of the game.', ' 또는 웹 버전(GitHub Pages)에서 하세요.')}</p></div>`
        : `<div class="tv-screen"><iframe src="${esc(tvEmbed(c, tvNow.live))}" title="${esc(c.name)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
        <p class="fine">${esc(tr(c.note || '', c.note_ko))} <a href="${esc(tvLink(c, tvNow.live))}" target="_blank" rel="noopener">${tr('Open on YouTube ↗', 'YouTube에서 열기 ↗')}</a>${tvNow.live ? tr(' · Not live right now? Try <b>Latest</b>.', ' · 지금 생방송이 없나요? <b>최신</b>을 눌러 보세요.') : ''}</p>`;
    body.innerHTML = screen + Object.keys(TV_KIND).map(k => {
      const list = TV.filter(x => x.kind === k);
      if (!list.length) return '';
      return `<h3 class="tv-kind">${tr(TV_KIND[k][0], TV_KIND[k][1])}</h3><div class="tv-list">${list.map(x => `<div class="tv-ch${x.id === tvNow.id ? ' on' : ''}"><div class="t">${esc(x.name)}</div>
        <div class="b">${+x.live ? `<button type="button" data-tv="${esc(x.id)}|1"${x.id === tvNow.id && tvNow.live ? ' aria-pressed="true"' : ''}>${tr('Live', '생방송')}</button>` : ''}<button type="button" data-tv="${esc(x.id)}|0"${x.id === tvNow.id && !tvNow.live ? ' aria-pressed="true"' : ''}>${tr('Latest', '최신')}</button></div></div>`).join('')}</div>`;
    }).join('');
  }
  function sitForTv(pid) {           // sit down on the sofa, facing the TV
    const pl = Z && Z.places[pid];
    if (player && pl && pl.at) {
      player.pos.set(pl.at[0], 0, pl.at[1]);
      if (pl.face) player.heading = Math.atan2(pl.face[0] - pl.at[0], pl.face[1] - pl.at[1]);
      player.sit = true;
      play(player, 'sit');
    }
    openPanel('tv');
  }

  // ---------------------------------------------------------------- laundry: clean clothes, detergent, the laundry room
  // G.clean is how many clean outfits are in your closet (config closet_outfits, 5 at the start). Every morning you
  // put one on; with none left you wear yesterday's clothes and people notice (smalltalk you:laundry). Do a load at
  // the door of your home: renters use the building's laundry room (items laundry_load, open config laundry_hours),
  // a house has its own washer and dryer. Either way it takes a detergent pod (items detergent) and 90 minutes.
  const CLOSET = +CFG.closet_outfits || 7, LAUNDRY_MIN = 90;
  const cleanClothes = () => G ? (G.clean == null ? 5 : G.clean) : 0;
  const ownWasher = () => /mortgage/i.test(hero().housing_name || '');
  const laundryHours = () => String(CFG.laundry_hours || '07:00-22:00').split('-').map(x => hm(x, 0));
  function laundryLabel() {
    const n = cleanClothes();
    return tr(`Do laundry · ${n} clean outfit${n === 1 ? '' : 's'} left`, `빨래하기 · 깨끗한 옷 ${n}벌 남음`);
  }
  function doLaundry() {
    if (!G) return false;
    const [open, close] = laundryHours(), load = ITEMS.laundry_load, fee = ownWasher() ? 0 : +(load && load.price) || 0;
    const where = ownWasher() ? 'your washer and dryer' : 'the laundry room';
    if (cleanClothes() >= CLOSET) { toast('All your clothes are clean. No laundry today.', '옷이 다 깨끗해요. 오늘은 빨래할 게 없어요.'); return false; }
    if (!ownWasher() && (G.minute < open || G.minute + LAUNDRY_MIN > close)) {
      toast(`The laundry room is open ${clock(open)} to ${clock(close)}. Start your last load by ${clock(close - LAUNDRY_MIN)}.`, `세탁실은 ${hhmm(open)}~${hhmm(close)}에 열어요. 마지막 빨래는 ${hhmm(close - LAUNDRY_MIN)}까지 시작하세요.`, 'bad', 5);
      return false;
    }
    if (ownWasher() && (G.minute < 6 * 60 || G.minute + LAUNDRY_MIN > DAY_END - 30)) {
      toast(`It's too late to start a load tonight: the washer and the dryer take an hour and a half. Start by ${clock(DAY_END - 30 - LAUNDRY_MIN)}.`, `오늘 밤 빨래를 시작하기엔 너무 늦었어요. 세탁과 건조에 1시간 반이 걸려요. ${hhmm(DAY_END - 30 - LAUNDRY_MIN)}까지 시작하세요.`, 'bad', 5);
      return false;
    }
    if (!portions('detergent')) { toast("You're out of laundry detergent. Fairview Market sells detergent pods.", '세탁 세제가 없어요. 페어뷰 마켓에서 세제 캡슐을 팝니다.', 'bad', 5); return false; }
    if (fee && G.money < fee) { toast(`You need ${usd2(fee)} for the washer and the dryer.`, `세탁기와 건조기에 ${usd2(fee)}가 필요해요.`, 'bad'); return false; }
    useOne('detergent');
    if (fee) pay(-fee, 'Laundry room (wash and dry)', 'spend', { ko: '세탁실 (세탁·건조)' });
    advanceMinutes(LAUNDRY_MIN);
    G.clean = CLOSET;
    logEvent('laundry', 'Did the laundry', 0);
    if (player) play(player, 'interact-right', { once: true });
    saveGame();
    toast(`You washed, dried and folded a load in ${where}${fee ? ` (${usd2(fee)})` : ''}. ${CLOSET} clean outfits. ${portions('detergent')} detergent pod${portions('detergent') === 1 ? '' : 's'} left.`,
      `${ownWasher() ? '집 세탁기와 건조기로' : '세탁실에서'} 빨래를 빨고 말려서 갰어요${fee ? ` (${usd2(fee)})` : ''}. 깨끗한 옷 ${CLOSET}벌, 세제 ${portions('detergent')}회분 남음.`, 'good', 5);
    return true;
  }
  function wakeDressed() {            // in the morning: put on a clean outfit (what the morning card says about it)
    const n = cleanClothes();
    if (n > 0) { G.clean = n - 1; G.dirtyDay = null; }
    else G.dirtyDay = G.day;
    if (G.dirtyDay === G.day) return tr(`👕 You're out of clean clothes, so you put on yesterday's. <b>Do laundry</b> at home${portions('detergent') ? '' : ' (buy detergent at Fairview Market first)'}.`, `👕 깨끗한 옷이 없어서 어제 옷을 입었어요. 집에서 <b>빨래</b>하세요${portions('detergent') ? '' : '(먼저 페어뷰 마켓에서 세제를 사세요)'}.`);
    if (G.clean <= 1) return tr(`👕 ${G.clean ? 'Only one clean outfit left after today' : "You're wearing your last clean outfit"}. Time to do laundry${portions('detergent') ? '' : ': buy detergent at Fairview Market first'}.`, `👕 ${G.clean ? '오늘 입은 옷 말고 깨끗한 옷이 한 벌 남았어요' : '마지막 깨끗한 옷을 입었어요'}. 빨래할 때예요${portions('detergent') ? '' : '. 먼저 페어뷰 마켓에서 세제를 사세요'}.`);
    return null;
  }

  // ---------------------------------------------------------------- the kitchen: what keeps how long, and cooking
  // What is in your bag is kept package by package: G.lots [{ id, day (bought), left (portions) }]; G.inventory
  // (id → packages) follows it. A grocery keeps items.shelf_days days after the day it was bought (best by that
  // day; NULL keeps), then it has gone bad and can only be thrown out. A package has items.uses portions, and
  // items.cook_only things are not eaten as they are. Recipes (recipes table) take one portion of each
  // ingredient, the oldest package first, and are cooked in the kitchen at home.
  const RECIPES = rows('recipes').slice().sort((a, b) => (a.sort || 0) - (b.sort || 0));
  const usesOf = (i) => Math.max(1, +(i && i.uses) || 1);
  const bestBy = (lot) => { const i = ITEMS[lot.id], n = i && i.shelf_days != null ? +i.shelf_days : 0; return n > 0 ? lot.day + n : null; };
  const gone = (lot) => { const d = bestBy(lot); return d != null && G.day > d; };
  const shortName = (id) => String((ITEMS[id] || { name: pretty(id) }).name).replace(/\s*\(.*\)\s*/, '').replace(/,.*$/, '');
  const itemName = (id) => KO() && ITEMS[id] && ITEMS[id].name_ko ? String(ITEMS[id].name_ko).replace(/\s*\(.*\)\s*/, '') : shortName(id).toLowerCase();
  function lots() {
    if (!Array.isArray(G.lots)) {          // a save from before: everything was bought today
      G.lots = [];
      Object.keys(G.inventory || {}).forEach(id => { for (let k = 0; k < G.inventory[id]; k++) G.lots.push({ id, day: G.day, left: usesOf(ITEMS[id]) }); });
    }
    return G.lots;
  }
  function syncBag() {
    G.lots = lots().filter(l => l.left > 0);
    G.inventory = {};
    G.lots.forEach(l => { G.inventory[l.id] = (G.inventory[l.id] || 0) + 1; });
  }
  function addLot(id) { lots().push({ id, day: G.day, left: usesOf(ITEMS[id]) }); syncBag(); }
  const goodLots = (id) => lots().filter(l => l.id === id && l.left > 0 && !gone(l)).sort((a, b) => a.day - b.day);
  const portions = (id) => goodLots(id).reduce((n, l) => n + l.left, 0);
  function useOne(id) { const l = goodLots(id)[0]; if (!l) return false; l.left--; syncBag(); return true; }
  const needs = (r) => listOf(r.ingredients);
  const canCook = (r) => needs(r).every(id => portions(id) > 0);
  const atHome = () => !!G && zoneId === hero().home_zone;
  function cook(id) {
    const r = RECIPES.find(x => x.id === id);
    if (!r || !G) return false;
    if (!atHome()) { if (!panel.hidden) note(tr('You can only cook in your kitchen at home.', '요리는 집 부엌에서만 할 수 있어요.'), true); return false; }
    if (!canCook(r)) { if (!panel.hidden) note(tr(`You are missing: ${needs(r).filter(x => !portions(x)).map(shortName).join(', ').toLowerCase()}.`, `없는 재료: ${needs(r).filter(x => !portions(x)).map(itemName).join(', ')}.`), true); return false; }
    needs(r).forEach(useOne);
    G.energy = clamp(G.energy + (+r.energy || 0), 0, E_MAX);
    G.cooked = (G.cooked || 0) + 1;
    advanceMinutes(+r.minutes || 15);
    logEvent('cook', r.name, 0, { id: r.id });
    if (player) play(player, 'interact-right', { once: true });
    saveGame();
    if (!panel.hidden) { renderPanel(); note(tr(`You made ${r.name.toLowerCase()} in ${r.minutes} minutes. Energy +${r.energy}.`, `${r.minutes}분 걸려 ${josa(loc(r), '을', '를')} 만들었어요. 에너지 +${r.energy}.`)); }
    return true;
  }
  function toss(n) {
    const l = lots()[n];
    if (!l) return;
    const name = shortName(l.id);
    l.left = 0;
    syncBag();
    logEvent('toss', name, 0);
    saveGame();
    renderPanel();
    note(tr(`You threw out the ${name.toLowerCase()}.`, `${josa(itemName(l.id), '을', '를')} 버렸어요.`));
  }
  function kitchenNews() {          // in the morning: what went bad overnight, what should be used today
    const bad = lots().filter(l => bestBy(l) === G.day - 1), last = lots().filter(l => bestBy(l) === G.day);
    const names = (l) => Array.from(new Set(l.map(x => itemName(x.id)))).join(', '), out = [];
    if (bad.length) out.push(tr(`🗑️ Gone bad in your kitchen: <b>${esc(names(bad))}</b>. Throw it out (Inventory).`, `🗑️ 부엌에서 상한 것: <b>${esc(names(bad))}</b>. 가방에서 버리세요.`));
    if (last.length) out.push(tr(`Use it or lose it: the <b>${esc(names(last))}</b> ${last.length > 1 || /s$/.test(names(last)) ? 'are' : 'is'} best by today.`, `오늘까지 먹어야 해요: <b>${esc(names(last))}</b>.`));
    return out;
  }

  // ---------------------------------------------------------------- the pharmacy and the clinic: getting sick, getting better
  // Fairview Pharmacy (place kind pharmacy, Omar) and the walk-in clinic next to it (kind clinic, Grace) are at the back
  // of Fairview Market. Their conversations are tagged errand: not missions, and open only when they apply (careDue),
  // in the place's hours (config hours_pharmacy, hours_clinic) and, on a day you are expected at work, from
  // early_before (after work). Tag pickup: the prescription of the day-10 voicemail (its days, once); otc: cold medicine
  // when you are sick and have none in the bag; clinic + cold | flu: a walk-in visit (the flu at once, a cold from its
  // third day, or when HR wants a doctor's note); rx: the antiviral the clinic sent over for the flu.
  // Insurance: careCopay(kind) is what you pay: the benefits plan of the day (copayFor: a prescription is rx, the clinic
  // a doctor visit), else config copay_rx, copay_clinic, copay_flushot. Medicine without a prescription (items of kind gear sold at the pharmacy) is not
  // covered and is taxed; prescriptions are not taxed.
  // Getting sick (free play): on a morning a cold or the flu may start (config ill_chance: percent a day by month, times
  // ill_wet_factor after a day you got soaked in the rain; flu_share of them are the flu, times flu_shot_factor after a
  // flu shot this season; none for ill_rest_days after the last one), lasting ill_days. Each morning: the symptoms and
  // less energy (ILL_PAIN), a dose of medicine from the bag takes the edge off, the antiviral (from the clinic in the
  // first two days of the flu) ends it a day sooner, going to work with a fever makes it a day longer. Out sick
  // sick_note_days working days in a row, HR asks for a doctor's note (the clinic writes one): −10 the day after you
  // are back without it. G.health = { ill { kind, from, until, otc, seen, rx ready | taken, pushed }, past [{ kind,
  // from, until, seen }], well (the day the last one ended), flushot (day), paid (copays), note { from, day, kind, got,
  // closed } }.
  const careTag = (ep, t) => listOf(ep.tags).includes(t);
  const careKind = (ep) => ['pickup', 'otc', 'rx', 'clinic'].find(k => careTag(ep, k)) || null;
  function careCopay(kind) {
    const plan = kind === 'flushot' ? null : copayFor(kind === 'clinic' ? 'doctor' : kind);          // benefits: null without plans
    if (plan != null) return plan;
    const v = CFG['copay_' + kind];
    return v == null || v === '' ? ({ rx: 10, clinic: 40, flushot: 0 }[kind] || 0) : Math.max(0, +v);
  }
  const byMonth = (v, m, def) => { const x = listOf(v).map(s => s.split(':')).find(p => +p[0] === m); return x ? +x[1] : def; };
  const monthOf = (d) => { const t = dateOf(d); return t ? t.getUTCMonth() + 1 : 10; };
  const illDays = (k) => { const x = listOf(CFG.ill_days).map(s => s.split(':')).find(p => p[0] === k); return x ? +x[1] : k === 'flu' ? 6 : 4; };
  const ILL_PAIN = { cold: [20, 25, 15, 10], flu: [40, 45, 35, 25, 15, 10] };          // energy lost in the morning, day by day
  const ILL_NAME = { cold: ['cold', '감기'], flu: ['flu', '독감'] };
  const NOTE_DAYS = +CFG.sick_note_days || 3;
  const MEDS = () => rows('items').filter(i => i.kind === 'gear' && placeKind(i.place) === 'pharmacy');
  const hasMeds = () => MEDS().some(i => portions(i.id) > 0);
  const health = () => G.health || (G.health = { ill: null, past: [], well: 0, flushot: null, paid: 0, note: null });
  const illDay = () => G && G.health && G.health.ill ? G.day - G.health.ill.from + 1 : 0;
  const noteWanted = () => { const n = G && G.health && G.health.note; return !!n && !n.got && !n.closed; };
  const illHash = (d, k) => { const x = Math.sin(d * 91.3458 + k * 47.853 + hash(G.name) % 997) * 43758.5453; return x - Math.floor(x); };
  // the flu season runs from September to March; a shot is good for the season it was given in
  const fluSeason = (d) => { const t = dateOf(d); return t ? t.getUTCFullYear() + (t.getUTCMonth() >= 7 ? 1 : 0) : 1; };
  const shotSeason = (d) => { const m = monthOf(d); return m >= 9 || m <= 3; };
  const shotThisSeason = (d) => { const s = G && G.health && G.health.flushot; return s != null && fluSeason(s) === fluSeason(d); };
  function careOpen(pid) {          // the place's hours, and after work on a day you are expected there
    const h = hoursOf(pid);
    if (h && !(G.minute >= h[0] && G.minute < h[1])) return false;
    return myOff(G.day) || fired() || G.minute >= EARLY();
  }
  function careDue(ep) {          // isOpen for a conversation tagged errand (besides its time_from–time_to)
    if (!G || (ep.day_from != null && G.day < ep.day_from) || (ep.day_to != null && G.day > ep.day_to) || !careOpen(ep.place)) return false;
    const H = health(), ill = H.ill, kind = careKind(ep);
    if (kind === 'pickup') return !G.done[ep.id];
    if (kind === 'rx') return !!ill && ill.rx === 'ready';
    if (kind === 'otc') return !!ill && !ill.otc && !hasMeds();
    if (kind === 'clinic') {
      const want = careTag(ep, 'flu') ? 'flu' : 'cold';
      if (ill && !ill.seen) return ill.kind === want && (want === 'flu' || illDay() >= 3 || noteWanted());
      return !ill && noteWanted() && H.note.kind === want;          // over it, but HR still wants a note
    }
    return false;
  }
  // the chance of falling ill on the morning of day d: { p, flu }
  function illChance(d) {
    const H = health(), m = monthOf(d);
    if (H.ill || d - (H.well || 0) < (+CFG.ill_rest_days || 14)) return { p: 0, flu: 0 };
    const p = byMonth(CFG.ill_chance, m, 1) / 100 * (G.wetDay === d - 1 ? +CFG.ill_wet_factor || 3 : 1);
    const flu = byMonth(CFG.flu_share, m, 5) / 100 * (shotThisSeason(d) ? (CFG.flu_shot_factor == null ? 0.4 : +CFG.flu_shot_factor) : 1);
    return { p: Math.min(0.5, p), flu };
  }
  function illRoll(d) { const c = illChance(d); return c.p && illHash(d, 1) < c.p ? (illHash(d, 2) < c.flu ? 'flu' : 'cold') : null; }          // what the morning of day d brings
  function startIll(kind) {
    const H = health();
    H.ill = { kind, from: G.day, until: G.day + illDays(kind) - 1, otc: false, seen: null, rx: null, pushed: false };
    logEvent('health', kind === 'flu' ? 'Came down with the flu' : 'Caught a cold', 0, { ko: kind === 'flu' ? '독감에 걸림' : '감기에 걸림' });
    return H.ill;
  }
  // a day of being sick, in the morning: how you feel, less energy, a dose of medicine, what to do about work
  function illMorning() {
    const ill = health().ill, n = illDay(), out = [], pain = ILL_PAIN[ill.kind] || ILL_PAIN.cold;
    let lose = pain[Math.min(n, pain.length) - 1];
    const med = MEDS().find(i => portions(i.id) > 0);
    if (med) { useOne(med.id); lose = Math.round(lose * 0.6); }
    if (ill.rx === 'taken') lose = Math.max(0, lose - 10);
    G.energy = Math.min(G.energy, E_MAX - lose);
    const SYM = ill.kind === 'flu'
      ? (n === 1 ? ['🤒 You woke up with a fever, chills and aches all over. It feels like <b>the flu</b>.', '🤒 열이 나고 오한이 들고 온몸이 쑤신 채 깼어요. <b>독감</b> 같아요.']
        : n <= 3 ? ['🤒 The flu is hitting hard: a fever of 102°F, and getting out of bed is a struggle.', '🤒 독감이 심해요. 열이 39°C 가까이 오르고, 침대에서 일어나기도 힘들어요.']
          : ['🤒 The fever has broken, but you are still weak and coughing.', '🤒 열은 내렸지만 아직 기운이 없고 기침이 나요.'])
      : (n === 1 ? ['🤧 You woke up with a scratchy throat and a stuffy nose: you have a <b>cold</b>.', '🤧 목이 칼칼하고 코가 막힌 채 깼어요. <b>감기</b>에 걸렸어요.']
        : n === 2 ? ['🤧 Your cold is at its worst: a runny nose, a cough and a heavy head.', '🤧 감기가 가장 심해요. 콧물에 기침, 머리도 무거워요.']
          : ['🤧 Your cold is on its way out, but the cough hangs on.', '🤧 감기가 나아 가지만 기침이 남았어요.']);
    const total = ill.until - ill.from + 1;
    out.push(tr(`${SYM[0]} Day ${n} of about ${total}; energy ${Math.round(G.energy)}.`, `${SYM[1]} ${total}일 중 ${n}일째, 에너지 ${Math.round(G.energy)}.`));
    if (med) out.push(tr(`💊 You took a dose of ${esc(med.name.replace(/\s*\(.*\)$/, ''))}: it takes the edge off (${portions(med.id)} left).`, `💊 ${esc(josa(String(med.name_ko || med.name).replace(/\s*\(.*\)$/, ''), '을', '를'))} 먹었더니 좀 낫네요(${portions(med.id)}회분 남음).`));
    else if (n === 1) out.push(tr('Fairview Pharmacy, at the back of Fairview Market, sells cold medicine, and the walk-in clinic next to it sees patients without an appointment.', '페어뷰 마켓 안쪽의 페어뷰 약국에서 감기약을 팔고, 그 옆 워크인 클리닉은 예약 없이 진료해요.'));
    if (ill.rx === 'ready') out.push(tr('💊 Your flu prescription is waiting at Fairview Pharmacy.', '💊 페어뷰 약국에 독감 처방약이 준비돼 있어요.'));
    const sb = !myOff(G.day) ? sickDayButton() : '', by = hm(CFG.sick_call_by, 570);
    if (sb) out.push(`${tr(ill.kind === 'flu' && n <= 3 ? `With a fever, stay home: everyone at work would catch it. Text your manager before ${clock(by)}.` : `Plenty of people work through a cold, but rest helps. To stay home, text your manager before ${clock(by)}.`,
      ill.kind === 'flu' && n <= 3 ? `열이 있으면 집에서 쉬세요. 회사 사람들에게 옮겨요. ${clockKo(by)} 전에 매니저에게 문자하세요.` : `감기쯤은 참고 출근하는 사람도 많지만 쉬면 빨리 나아요. 쉬려면 ${clockKo(by)} 전에 매니저에게 문자하세요.`)} ${sb}`);
    return out;
  }
  const sickDayButton = () => { const ill = G.health && G.health.ill, d = sickTarget(); return ill && d != null && d <= ill.until ? sickButton() : ''; };          // only for a day you will still be sick
  function sickRun(d) {          // working days out sick in a row up to day d: { n, start }
    let n = 0, start = d;
    for (let x = d; x > 0 && n < 30; x--) { if (offWork(x)) continue; const l = leaveOf(x); if (l !== 'sick' && l !== 'unpaid') break; n++; start = x; }
    return { n, start };
  }
  // the morning (from goToSleep): the prescription back to stock, a flu made longer by going to work, getting better,
  // falling ill, the day's symptoms, and HR's doctor's note. Returns lines for the morning card.
  function careMorning(prev) {
    if (!G) return [];
    const H = health(), out = [], w = work(), me = hero().name_ko || G.name;
    const came = (d) => /^(on|late|noon)$/.test(w.record[d] || '');
    const pick = episodes().find(e => isErrand(e) && careKind(e) === 'pickup');
    if (pick && pick.day_to != null && prev === pick.day_to && !G.done[pick.id]) notify(place(pick.place).name, `Hello, this is ${place(pick.place).name} calling for ${G.name}. We held your prescription for seven days, and it has gone back to stock. If you still need it, call us or your doctor's office, and we'll fill it again.`,
      `안녕하세요, ${loc(place(pick.place))}입니다. 처방약을 7일 동안 보관했는데 찾아가지 않으셔서 재고로 돌려놓았습니다. 아직 필요하시면 저희나 병원에 연락 주세요. 다시 조제해 드리겠습니다.`, 'voicemail');
    let ill = H.ill;
    if (ill && ill.kind === 'flu' && !ill.pushed && came(prev) && prev - ill.from <= 2) {
      ill.pushed = true; ill.until++;
      if (!fired()) notify(BOSS, `${G.name}, you didn't look well at all yesterday. If you still have a fever, please stay home today and rest. That's what sick time is for. Just text me before standup.`,
        `${me}, 어제 많이 아파 보이던데요. 아직 열이 있으면 오늘은 집에서 쉬어요. 병가는 그러라고 있는 거예요. 스탠드업 전에 문자만 줘요.`, 'text');
      out.push(tr('🤒 Going to work with a fever made the flu drag on: it will last a day longer.', '🤒 열이 있는데 출근했더니 독감이 길어졌어요. 하루 더 아플 거예요.'));
    }
    if (ill && G.day > ill.until) {
      H.past = (H.past || []).concat({ kind: ill.kind, from: ill.from, until: G.day - 1, seen: ill.seen || null }).slice(-20);
      out.push(tr(`😊 You feel like yourself again: the ${ILL_NAME[ill.kind][0]} is over.`, `😊 몸이 다시 가뿐해요. ${josa(ILL_NAME[ill.kind][1], '이', '가')} 다 나았어요.`));
      H.ill = ill = null; H.well = G.day;
    }
    if (!ill && freePlay()) { const k = illRoll(G.day); if (k) ill = startIll(k); }
    if (ill) illMorning().forEach(m => out.push(m));
    // out sick NOTE_DAYS working days in a row (up to today, or up to yesterday when you are back): HR wants a note
    const r0 = sickRun(G.day), run = r0.n ? r0 : sickRun(G.day - 1);
    const seen = [H.ill, (H.past || []).slice(-1)[0]].some(x => x && x.seen != null && x.seen >= run.start - 3);
    if (!fired() && run.n >= NOTE_DAYS && !seen && !(H.note && H.note.from === run.start)) {
      H.note = { from: run.start, day: G.day, kind: (H.ill || (H.past || []).slice(-1)[0] || { kind: 'cold' }).kind, got: false, closed: false };
      notify(HR, `Hi ${G.name}, I hope you're feeling better. Since you've been out sick ${run.n} working days in a row, our policy asks for a doctor's note. The walk-in clinic next to Fairview Pharmacy can write one. Please send it when you're back. — ${(NPCS[HR] || { name: 'HR' }).name}, HR`,
        `${me} 님, 좀 나아졌기를 바라요. ${run.n}일 연속 병가를 냈으니 회사 규정상 진단서가 필요해요. 페어뷰 약국 옆 워크인 클리닉에서 써 줘요. 복귀하면 보내 주세요. — 인사팀 ${(NPCS[HR] || {}).name_ko || (NPCS[HR] || { name: 'HR' }).name}`, 'email');
      out.push(tr(`📄 HR asks for a <b>doctor's note</b> for your ${run.n} sick days in a row. The walk-in clinic next to Fairview Pharmacy writes them.`, `📄 인사팀이 ${run.n}일 연속 병가에 대한 <b>진단서</b>를 달라고 해요. 페어뷰 약국 옆 워크인 클리닉에서 받을 수 있어요.`));
    } else if (noteWanted() && prev >= H.note.day && came(prev)) {
      H.note.closed = true;
      addScore(-10, "No doctor's note", '진단서 미제출');
      notify(HR, `${G.name}, we still don't have a doctor's note for your sick days. This time I've noted it in your file. Next time, please bring one when you come back.`, `${me} 님, 병가에 대한 진단서를 아직 받지 못했어요. 이번에는 기록만 남겨 둘게요. 다음에는 복귀할 때 꼭 가져와 주세요.`, 'email');
      out.push(tr("📄 You went back to work without the doctor's note HR asked for. −10 points.", '📄 인사팀이 달라던 진단서 없이 복귀했어요. −10점.'));
    }
    return out;
  }
  // after a pharmacy or clinic conversation (from completeEpisode): the copay, the medicine, the note. Lines for the card.
  function careDone(ep) {
    if (!G || !isErrand(ep)) return [];
    const H = health(), ill = H.ill, kind = careKind(ep), out = [], who = firstName(npcRow(ep.npc));
    const charge = (n, en, ko) => { if (n > 0) pay(-n, en, 'spend', { ko }); H.paid = cents((H.paid || 0) + n); return n; };
    if (kind === 'pickup' || kind === 'rx') {
      const c = charge(careCopay('rx'), 'Prescription copay', '처방약 본인 부담금');
      out.push(tr(`<p>💊 Your insurance paid the rest: you paid the <b>${usd2(c)}</b> copay. Prescriptions have no sales tax.</p>`, `<p>💊 나머지는 보험이 냈고, 본인 부담금 <b>${usd2(c)}</b>만 냈어요. 처방약에는 판매세가 없어요.</p>`));
      if (kind === 'rx' && ill) {
        ill.rx = 'taken'; ill.until = Math.max(G.day, ill.until - 1);
        G.energy = clamp(G.energy + 5, 0, E_MAX);
        out.push(tr('<p>You take the first capsule with a snack. The flu should be over a day sooner.</p>', '<p>간식과 함께 첫 캡슐을 먹었어요. 독감이 하루 일찍 나을 거예요.</p>'));
      }
      advanceMinutes(10);
    } else if (kind === 'otc') {
      const i = ITEMS.cold_relief || MEDS()[0];
      if (i) {
        const b = billFor(i);
        pay(-b.total, i.name, 'spend', Object.assign({ ko: i.name_ko }, b.tax ? { tax: b.tax } : null));
        addLot(i.id);
        if (ill) { useOne(i.id); G.energy = clamp(G.energy + 8, 0, E_MAX); }
        out.push(tr(`<p>🧾 ${esc(i.name)}: ${receipt(b)}. Insurance doesn't cover medicine you buy without a prescription.${ill ? ' You take the first dose right away (energy +8); the rest is in your bag, a dose every morning while you are sick.' : ''}</p>`,
          `<p>🧾 ${esc(loc(i))}: ${receipt(b)}. 처방 없이 사는 약은 보험이 안 돼요.${ill ? ' 첫 복용분은 바로 먹었고(에너지 +8), 나머지는 가방에 넣었어요. 아픈 동안 아침마다 먹어요.' : ''}</p>`));
      }
      if (ill) ill.otc = true;
      advanceMinutes(5);
    } else if (kind === 'clinic') {
      const c = charge(careCopay('clinic'), 'Walk-in clinic copay', '클리닉 본인 부담금'), flu = careTag(ep, 'flu');
      advanceMinutes(40);          // the wait and the visit
      out.push(tr(`<p>🩺 You paid the <b>${usd2(c)}</b> copay for the visit; your insurance pays the rest. With the wait it took about 40 minutes.</p>`, `<p>🩺 진료비는 본인 부담금 <b>${usd2(c)}</b>만 냈고 나머지는 보험이 내요. 기다린 시간까지 40분쯤 걸렸어요.</p>`));
      if (ill) ill.seen = G.day;
      if (noteWanted()) {
        H.note.got = true;
        notify(HR, `Thanks, ${G.name}. We got your doctor's note from the clinic, and your sick days are all set. Feel better!`, `${hero().name_ko || G.name} 님, 클리닉에서 보낸 진단서 잘 받았어요. 병가 처리는 다 됐어요. 얼른 나으세요!`, 'email');
        out.push(tr("<p>📄 The clinic sent your doctor's note to HR.</p>", '<p>📄 클리닉이 진단서를 인사팀에 보냈어요.</p>'));
      } else out.push(tr("<p>📄 You have a doctor's note, in case work asks for one.</p>", '<p>📄 회사에서 달라고 할 때를 위해 진단서를 받아 두었어요.</p>'));
      if (flu && ill && !ill.rx && illDay() <= 2) {          // an antiviral helps in the first two days only
        ill.rx = 'ready';
        out.push(tr(`<p>💊 ${esc(who)} sent a prescription for an antiviral to Fairview Pharmacy next door. Pick it up there.</p>`, `<p>💊 ${esc(josa(who, '이', '가'))} 옆 페어뷰 약국으로 항바이러스제 처방전을 보냈어요. 거기서 찾으세요.</p>`));
      } else if (flu && ill && !ill.rx) out.push(tr("<p>It has been more than two days, so an antiviral wouldn't help much now: rest, fluids and fever medicine.</p>", '<p>이틀이 넘게 지나서 지금은 항바이러스제가 별 도움이 안 돼요. 쉬고, 물 많이 마시고, 해열제를 드세요.</p>'));
      const sb = sickDayButton();
      if (sb) out.push(`<p>${tr(flu ? 'Stay home until the fever has been gone for a day.' : 'If you need a day of rest, let your manager know.', flu ? '열이 내린 뒤 하루가 지날 때까지 집에서 쉬세요.' : '하루 쉬어야 하면 매니저에게 알리세요.')} ${sb}</p>`);
    }
    saveGame();
    return out;
  }
  // "Text Maya: out sick" on the morning card or after the clinic
  $('card').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-leave="sick"]');
    if (!b || !G || !callInSick()) return;
    b.disabled = true;
    b.textContent = tr(`✓ Texted ${firstName(NPCS[BOSS])}`, `✓ ${firstName(NPCS[BOSS])}에게 문자함`);
    saveGame();
  });
  // a flu shot at the pharmacy counter (September to March, once a season, not while you are sick)
  function careActions(pid) {
    if (!G || placeKind(pid) !== 'pharmacy' || !shotSeason(G.day) || shotThisSeason(G.day) || closedNow(pid)) return [];
    const c = careCopay('flushot');
    return [{ key: 'flushot:' + pid, label: tr(`Get a flu shot · ${c ? usd2(c) : 'free'}`, `독감 예방 주사 맞기 · ${c ? usd2(c) : '무료'}`), run: () => fluShot(pid) }];
  }
  function fluShot(pid) {
    const H = health(), c = careCopay('flushot'), who = firstName(rows('npcs').find(n => n.place === pid) || { name: 'The pharmacist' });
    if (H.ill) { toast(`${who}: "Let's wait until you're feeling better. Come back for it then."`, `${who}: “몸이 나은 다음에 맞아요. 그때 다시 오세요.”`, null, 3.5); return false; }
    if (c > 0 && G.money < c) { toast(`You can't afford it (${usd2(c)}).`, `돈이 부족해요 (${usd2(c)}).`, 'bad'); return false; }
    if (c > 0) { pay(-c, 'Flu shot', 'spend', { ko: '독감 예방 주사' }); H.paid = cents((H.paid || 0) + c); }
    H.flushot = G.day;
    advanceMinutes(20);
    logEvent('health', 'Flu shot', 0, { ko: '독감 예방 주사' });
    saveGame();
    showCard({ kicker: loc(place(pid)), title: tr('Flu shot', '독감 예방 주사'),
      body: tr(`<p>${esc(who)} asks a few questions (any allergies? a fever today?), and you sign a consent form. A quick pinch in the arm, then you wait fifteen minutes to be sure you feel fine.</p><p>${c ? `You paid ${usd2(c)}.` : 'With your insurance it costs <b>nothing</b>: vaccines count as preventive care.'} Your arm may be sore tomorrow, and you are much less likely to get the flu this season.</p>`,
        `<p>${esc(josa(who, '이', '가'))} 몇 가지를 묻고(알레르기 있어요? 오늘 열은요?) 동의서에 서명해요. 팔에 따끔하게 한 대 맞고, 괜찮은지 15분 기다려요.</p><p>${c ? `${usd2(c)}를 냈어요.` : '보험이 있으면 <b>무료</b>예요. 백신은 예방 진료라서요.'} 내일은 팔이 좀 뻐근할 수 있고, 이번 철에는 독감에 걸릴 확률이 훨씬 낮아져요.</p>`),
      ok: tr('Continue', '계속'), state: 'card' }, () => { goalTimer = 0; });
    return true;
  }
  function illNote() {          // a line under the goal while you are sick: [en, ko]
    const ill = G && G.health && G.health.ill;
    if (!ill) return null;
    const n = illDay(), total = ill.until - ill.from + 1, icon = ill.kind === 'flu' ? '🤒' : '🤧';
    const tip = ill.rx === 'ready' ? ['Your prescription is ready at Fairview Pharmacy.', '페어뷰 약국에 처방약이 준비돼 있어요.'] : hasMeds() ? ['', ''] : ['Medicine helps: Fairview Pharmacy.', '약이 도움이 돼요: 페어뷰 약국.'];
    return [`${icon} ${ill.kind === 'flu' ? 'The flu' : 'A cold'}: day ${n} of about ${total}. ${tip[0]}`, `${icon} ${ILL_NAME[ill.kind][1]}: ${total}일 중 ${n}일째. ${tip[1]}`];
  }
  function healthPanel() {          // Work record: sick now or not, the flu shot, copays, medicine at home, past illnesses
    if (!G) return '';
    const H = health(), ill = H.ill, meds = MEDS().filter(i => portions(i.id) > 0);
    const shot = shotThisSeason(G.day) ? dMonth(H.flushot) : '—';
    return `<h3>${tr('Health', '건강')}</h3><div class="sum"><div><b>${ill ? tr(pretty(ILL_NAME[ill.kind][0]), ILL_NAME[ill.kind][1]) : tr('Well', '건강')}</b>${ill ? tr(`day ${illDay()} of ${ill.until - ill.from + 1}`, `${ill.until - ill.from + 1}일 중 ${illDay()}일째`) : tr('now', '지금')}</div><div><b>${esc(shot)}</b>${tr('flu shot', '독감 예방 주사')}</div><div><b>${usd2(H.paid || 0)}</b>${tr('copays paid', '낸 본인 부담금')}</div></div>
      <p class="fine">${tr(`With your health insurance a prescription costs you a ${usd2(careCopay('rx'))} copay, a visit to the walk-in clinic ${usd2(careCopay('clinic'))}, a flu shot ${careCopay('flushot') ? usd2(careCopay('flushot')) : 'nothing'}. Medicine without a prescription isn't covered. Out sick ${NOTE_DAYS} working days in a row, HR asks for a doctor's note.`,
        `건강 보험이 있어서 처방약은 본인 부담금 ${usd2(careCopay('rx'))}, 워크인 클리닉 진료는 ${usd2(careCopay('clinic'))}, 독감 예방 주사는 ${careCopay('flushot') ? usd2(careCopay('flushot')) : '무료'}예요. 처방 없이 사는 약은 보험이 안 돼요. ${NOTE_DAYS}일 연속 병가를 내면 인사팀이 진단서를 달라고 해요.`)}</p>
      ${meds.length ? `<p class="fine">💊 ${tr('Medicine in your bag', '가방의 약')}: ${esc(meds.map(i => `${loc(i).replace(/\s*\(.*\)$/, '')} (${portions(i.id)})`).join(', '))}</p>` : ''}
      ${noteWanted() ? `<p class="fine">📄 ${tr("HR is waiting for a doctor's note: the walk-in clinic writes one.", '인사팀이 진단서를 기다려요. 워크인 클리닉에서 받을 수 있어요.')}</p>` : ''}
      ${(H.past || []).slice(-5).reverse().map(x => `<div class="row"><span class="when">${esc(dShort(x.from))}</span><div class="main"><div class="t">${tr(pretty(ILL_NAME[x.kind][0]), ILL_NAME[x.kind][1])}</div><div class="s">${tr(`${x.until - x.from + 1} days`, `${x.until - x.from + 1}일`)}${x.seen ? tr(' · seen at the clinic', ' · 클리닉 진료') : ''}</div></div></div>`).join('')}`;
  }
  function fallIll(kind, n) {          // the debug API: sick from today (or n days into it), with this morning's symptoms
    const H = health();
    H.ill = null;
    const ill = startIll(kind === 'flu' ? 'flu' : 'cold');
    ill.from = G.day - Math.max(1, +n || 1) + 1;
    ill.until = ill.from + illDays(ill.kind) - 1;
    goalTimer = 0;
    return illMorning();
  }

  // ---------------------------------------------------------------- the bus timetable
  // Every bus_every minutes from bus_first to bus_last (bus_every_weekend on weekends and federal holidays): you
  // wait for the next one, and after the last one you walk.
  // Buses run late (from game day bus_delay_from): on a rainy day most of them (bus_late_chance_rain) by bus_late_rain
  // minutes, a few more in the rush; in the rush hours of a working day (bus_rush) about half (bus_late_chance_rush) by
  // bus_late_rush; at other times now and then (bus_late_chance) by bus_late. In the rush hours a bus can be full
  // (bus_full_chance, half again in the rain, never two in a row): it drives past and the one behind it comes
  // bus_full_gap minutes later. Nobody gets on more than bus_delay_max minutes after the time on the timetable. It is
  // all made from the day and the departure (busRand, not the dice of the moment), so the bus panel, the button, the
  // ride, the radio's traffic report and Fairview Transit's alert on a rainy morning (transit_sender, bus_alert_time) agree.
  const busEvery = (d = G ? G.day : 0) => +((d && (isWeekend(d) || dayOff(d)) && CFG.bus_every_weekend) || CFG.bus_every) || 0;
  const busRange = (v, lo, hi) => { const m = /^\s*(\d+)\s*-\s*(\d+)\s*$/.exec(String(v == null ? '' : v)); return m ? [+m[1], Math.max(+m[1], +m[2])] : [lo, hi]; };
  const busNum = (v, dflt) => v == null || v === '' || isNaN(+v) ? dflt : +v;
  const busRand = (d, t, k) => { const x = Math.sin(d * 37.719 + t * 0.6173 + k * 11.13) * 43758.5453; return x - Math.floor(x); };
  const busPick = (r, x) => r[0] + Math.floor(x * (r[1] - r[0] + 1));
  const BUS_RUSH = listOf(CFG.bus_rush || '07:00-09:30,16:30-18:30').map(w => w.split('-').map(x => hm(x, 0)));
  const BUS_WHY = { rain: [' in the rain', '비 때문에 '], rush: [' in the rush-hour traffic', '출퇴근길 정체로 '], other: ['', ''] };
  const TRANSIT = CFG.transit_sender || 'Fairview Transit', BUS_LINE = String(CFG.bus_line || '12');
  const busMemo = {};
  function busDay(d) {             // the day's buses: [{ t: the time on the timetable, late, full, at: when it comes, board: when you get on, why }]
    if (busMemo[d]) return busMemo[d];
    const every = busEvery(d), first = hm(CFG.bus_first, 360), last = hm(CFG.bus_last, 1350), out = [];
    if (!every) return (busMemo[d] = out);
    const rain = weatherOf(d).kind === 'rain', work = !offWork(d) && !dayOff(d), max = busNum(CFG.bus_delay_max, 15), on = d >= busNum(CFG.bus_delay_from, 2) && max > 0;
    const R = { rain: busRange(CFG.bus_late_rain, 5, 10), rush: busRange(CFG.bus_late_rush, 3, 8), other: busRange(CFG.bus_late, 1, 3) }, gap = busRange(CFG.bus_full_gap, 4, 8);
    const P = { rain: busNum(CFG.bus_late_chance_rain, 0.8), rush: busNum(CFG.bus_late_chance_rush, 0.5), other: busNum(CFG.bus_late_chance, 0.1), full: busNum(CFG.bus_full_chance, 0.06) };
    let before = false;
    for (let t = first; t <= last; t += every) {
      const rush = work && BUS_RUSH.some(([a, b]) => t >= a && t < b), why = rain ? 'rain' : rush ? 'rush' : 'other';
      let late = 0, full = false;
      if (on) {
        if (busRand(d, t, 1) < (rain && rush ? 1 - (1 - P.rain) * (1 - P.rush) : P[why])) late = Math.min(max, busPick(R[why], busRand(d, t, 2)) + (rain && rush ? Math.floor(busRand(d, t, 3) * 4) : 0));
        full = rush && !before && t < last && gap[0] < max && busRand(d, t, 4) < P.full * (rain ? 1.5 : 1);
        if (full) late = Math.min(late, max - gap[0]);
      }
      const at = t + late, board = full ? Math.min(t + max, at + busPick(gap, busRand(d, t, 5))) : at;
      out.push({ t, late, full, at, board, why: late || full ? why : '' });
      before = full;
    }
    return (busMemo[d] = out);
  }
  function busAt(min, d) {         // the first bus you can still get on at min (after a full one, the bus behind it); null after the last
    if (!busEvery(d)) return { t: Math.floor(min), late: 0, full: false, at: Math.floor(min), board: Math.floor(min), why: '' };
    return busDay(d == null ? (G ? G.day : 1) : d).find(b => b.board >= min) || null;
  }
  function nextBus(min) {          // when you get on the next bus (minutes of the day); null after the last one
    const b = busAt(min);
    return b ? b.board : null;
  }
  const busLate = (b) => b.board - b.t;
  function busNext(b, min) {       // the next bus in a few words, for the button at the stop: [en, ko]
    if (b.full && min <= b.at) return [`the ${clock(b.t)} is full, next ${clock(b.board)}`, `${clockKo(b.t)} 버스 만원, 다음 ${clockKo(b.board)}`];
    return busLate(b) > 0 ? [`next ${clock(b.board)} (${busLate(b)} min late)`, `다음 ${clockKo(b.board)} (${busLate(b)}분 지연)`] : [`next ${clock(b.t)}`, `다음 ${clockKo(b.t)}`];
  }
  function busStatus(b, min) {     // the bus panel: the next bus and the three after it, [en, ko] (HTML)
    const n = Math.ceil(b.board - min), w = BUS_WHY[b.why] || BUS_WHY.other;
    const when = n >= 1 ? [`, in ${n} min`, ` (${n}분 뒤)`] : [', boarding now', ' (지금 탑승 중)'];
    const head = b.full && min <= b.at ? [`The <b>${clock(b.t)}</b> bus is full and won't stop (it passes at ${clock(b.at)}). The one behind it comes at <b>${clock(b.board)}</b>${when[0]}.`, `<b>${clockKo(b.t)}</b> 버스는 만원이라 서지 않고 지나가요(${clockKo(b.at)}). 뒤차가 <b>${clockKo(b.board)}</b>에 와요${when[1]}.`]
      : b.full ? [`The <b>${clock(b.t)}</b> bus went by full. The one behind it comes at <b>${clock(b.board)}</b>${when[0]}.`, `<b>${clockKo(b.t)}</b> 버스는 만원이라 지나갔어요. 뒤차가 <b>${clockKo(b.board)}</b>에 와요${when[1]}.`]
        : b.late ? [`The <b>${clock(b.t)}</b> bus is running ${b.late} min late${w[0]}: it comes at <b>${clock(b.board)}</b>${when[0]}.`, `<b>${clockKo(b.t)}</b> 버스가 ${w[1]}${b.late}분 늦어요. <b>${clockKo(b.board)}</b>에 와요${when[1]}.`]
          : [`Next bus at <b>${clock(b.t)}</b>${when[0]}.`, `다음 버스 <b>${clockKo(b.t)}</b>${when[1]}.`];
    const after = busDay(G.day).filter(x => x.t > b.t).slice(0, 3);
    if (!after.length) return head;
    const tag = (x) => x.full ? [' full', ' 만원'] : x.late ? [` ${x.late} min late`, ` ${x.late}분 지연`] : ['', ''];
    return [head[0] + `<br>After it: ${after.map(x => clock(x.t) + tag(x)[0]).join(' · ')}.`, head[1] + `<br>그다음: ${after.map(x => clockKo(x.t) + tag(x)[1]).join(' · ')}.`];
  }
  function busRideText(b, min, waited) {     // what the ride was like, up to the name of the stop: [en, ko]
    const w = BUS_WHY[b.why] || BUS_WHY.other;
    if (b.full && min <= b.at) return [`The ${clock(b.t)} bus was full and drove right past. You got on the one behind it at ${clock(b.board)} and rode`, `${clockKo(b.t)} 버스가 만원이라 그냥 지나갔어요. ${clockKo(b.board)}에 뒤차를 타고`];
    if (b.full) return [`You got on the ${clock(b.board)} bus, the one behind a full ${clock(b.t)}, and rode`, `만원이던 ${clockKo(b.t)} 버스의 뒤차(${clockKo(b.board)})를 타고`];
    if (b.late && waited >= 1) return [`The ${clock(b.t)} bus was ${b.late} minutes late${w[0]}. You waited ${waited} minutes and rode`, `${clockKo(b.t)} 버스가 ${w[1]}${b.late}분 늦게 왔어요. ${waited}분을 기다려 버스를 타고`];
    return [waited >= 2 ? `You waited ${waited} minutes for the ${clock(b.board)} bus and rode` : 'You ride the bus', `${waited >= 2 ? `${waited}분을 기다려 ` : ''}버스를 타고`];
  }
  function busOnAir(d, m) {        // the radio's traffic report on the buses of the next hour and a half, or null when they are on time
    const soon = busDay(d).filter(b => b.t >= m - 10 && b.t < m + 90 && (b.late >= 3 || b.full));
    if (!soon.length) return null;
    const most = Math.max(...soon.map(b => b.late)), full = soon.some(b => b.full), w = BUS_WHY[soon[0].why === 'rain' ? 'rain' : 'rush'];
    return { kind: 'traffic', en: `${TRANSIT} says the Number ${BUS_LINE} is running up to ${Math.max(3, most)} minutes behind${w[0]}${full ? ', and some buses are too full to stop, so leave a little early' : ''}.`,
      ko: `${BUS_LINE}번 버스가 ${w[1]}최대 ${Math.max(3, most)}분까지 늦게 다니고 있습니다${full ? '. 만원이라 정류장을 그냥 지나치는 버스도 있으니 조금 일찍 나서세요' : ''}.` };
  }
  function busAlert() {            // Fairview Transit's alert on a rainy day, once, from bus_alert_time
    if (!G || G.busAlert === G.day || G.minute < hm(CFG.bus_alert_time, 390)) return;
    const late = busDay(G.day).filter(b => b.why === 'rain' && b.late);
    if (!late.length) return;
    G.busAlert = G.day;
    const lo = Math.min(...late.map(b => b.late)), hi = Math.max(...late.map(b => b.late)), full = busDay(G.day).some(b => b.full);
    notify(TRANSIT, `Service alert: rain is slowing the Number ${BUS_LINE} today. Buses are running ${lo === hi ? lo : lo + ' to ' + hi} minutes late${full ? ', and some rush-hour buses may be too full to stop' : ''}. Please allow extra time.`,
      `운행 알림: 오늘은 비 때문에 ${BUS_LINE}번 버스가 ${lo === hi ? lo : lo + '~' + hi}분 늦게 다닙니다${full ? '. 출퇴근 시간에는 만원이라 정류장을 그냥 지나치는 버스도 있을 수 있습니다' : ''}. 시간 여유를 두고 나오세요.`);
  }

  // ---------------------------------------------------------------- rain on you: an umbrella, or getting wet
  // Outdoors in the rain the people of the game put up umbrellas, and so do you when there is one in your bag
  // (items kind gear, id umbrella). Without it you get wet (G.wet 0..1; it dries indoors) and lose energy faster
  // (config rain_energy_per_hour), and people remark on it (smalltalk you:wet). The rain can be heard, muffled indoors.
  const BROLLY = ['#1f3a5f', '#8a2f3a', '#2f6b4f', '#3a3a44', '#c9a227', '#5a3d7a'];
  const brollyGeo = { top: new T.ConeGeometry(0.4, 0.15, 8, 1, true), pole: new T.CylinderGeometry(0.008, 0.008, 0.62, 5), tip: new T.CylinderGeometry(0.006, 0.006, 0.07, 4) };
  const brollyMats = {};
  function shelter(a, on) {
    if (!a || !a.holder) return;
    on = !!on && !a.sit;
    if (!on) { if (a.brolly && a.brolly.visible) { a.brolly.visible = false; if (a.mark) a.mark.position.y = MARK_Y; } return; }
    if (!a.brolly) {
      const c = BROLLY[hash(a.id + a.model) % BROLLY.length];
      const mat = brollyMats[c] || (brollyMats[c] = litMaterial({ color: new T.Color(c), side: T.DoubleSide }));
      const g = new T.Group(), top = new T.Mesh(brollyGeo.top, mat), pole = new T.Mesh(brollyGeo.pole, toon('#2a2d35')), tip = new T.Mesh(brollyGeo.tip, toon('#2a2d35'));
      top.position.set(0.05, 1.235, -0.04); pole.position.y = 0.93; tip.position.set(0.05, 1.33, -0.04);          // the canopy leans over the head
      top.castShadow = true;
      g.add(top, pole, tip);
      g.position.set(-0.13, 0, 0.1);
      a.holder.add(g);
      a.brolly = g;
    }
    a.brolly.visible = true;
    if (a.mark) a.mark.position.y = MARK_Y + 0.34;
  }
  const soaked = () => !!G && (G.wet || 0) > 0.3;
  const raining = () => !!Z && !Z.indoor && weatherNow().rain > 0.12;
  const rainSound = (function () {
    let src = null, gain = null, filter = null, level = 0, muffled = null;
    function start() {
      const c = sound.context();
      if (!c) return false;
      try {
        const len = c.sampleRate * 2, buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
        src = c.createBufferSource(); src.buffer = buf; src.loop = true;
        const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 700;
        filter = c.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 6500;
        gain = c.createGain(); gain.gain.value = 0;
        src.connect(hp); hp.connect(filter); filter.connect(gain); gain.connect(c.destination);
        src.start();
        return true;
      } catch (e) { src = null; return false; }
    }
    return {
      set(v, indoors) {
        v = clamp(v, 0, 1) * (indoors ? 0.3 : 1);
        if (v > 0.02 && !src && !start()) return;
        if (!src || (Math.abs(v - level) < 0.02 && indoors === muffled)) return;
        level = v; muffled = indoors;
        const c = sound.context();
        try { gain.gain.setTargetAtTime(v * 0.16, c.currentTime, 0.8); filter.frequency.setTargetAtTime(indoors ? 1100 : 6500, c.currentTime, 0.5); } catch (e) { /* closed */ }
      },
      get level() { return level; }
    };
  })();
  function wetTick(dt) {
    const inGame = !!G && !!player && !!Z && state !== 'title' && !jog;
    const rains = inGame && raining();
    if (player) shelter(player, rains && !!(G && G.inventory.umbrella));
    Object.values(npcActors).forEach(a => shelter(a, rains && !a.leaving));
    if (!inGame || state !== 'play' || busy) return;
    const mins = dt * (+CFG.minutes_per_second || 1) * debugSpeed, hard = weatherNow().rain;
    if (rains && !G.inventory.umbrella) {
      G.wet = clamp((G.wet || 0) + hard * mins / 40, 0, 1);
      G.energy = clamp(G.energy + (+CFG.rain_energy_per_hour || 0) * hard * mins / 60, 0, E_MAX);
      if (soaked() && G.wetDay !== G.day) {
        G.wetDay = G.day;
        toast("You're getting soaked. An umbrella would help: Fairview Market sells them.", '비에 흠뻑 젖고 있어요. 우산이 있으면 좋겠네요. 페어뷰 마켓에서 팝니다.', 'bad', 5.5);
      }
    } else if (G.wet) G.wet = Math.max(0, G.wet - mins / (Z.indoor ? 50 : 120));
  }

  // ---------------------------------------------------------------- on the street: horns, jaywalking, the walk signal
  // office/life.js tells (api.street) when a car honks at you, when you walk on the road away from a crosswalk
  // (jaywalking: against the law in many American cities, and a ticket if the police see it) and when you step onto a
  // crosswalk against a steady DON'T WALK. Each is explained once a game day; G.street counts them.
  const STREET = {
    honk: ['A driver honks at you. Get out of the road and keep to the sidewalk.', '운전자가 경적을 울려요(honk). 차도에서 나와 인도로 다니세요.'],
    jaywalk: ["That's jaywalking: crossing in the middle of the block. In many US cities it can get you a ticket. Cross at the crosswalk.", '무단횡단(jaywalking)이에요. 미국의 많은 도시에서는 벌금 딱지를 받을 수 있어요. 횡단보도로 건너세요.'],
    dontwalk: ["The signal said DON'T WALK. Wait for the white walking person (WALK) before you cross.", "신호가 DON'T WALK(건너지 마시오)였어요. 흰색 걷는 사람 표시(WALK)가 켜지면 건너세요."]
  };
  function street(kind, at) {
    if (!G || state !== 'play' || !STREET[kind]) return;
    G.street = G.street || {};
    G.street[kind] = (G.street[kind] || 0) + 1;
    if (kind === 'honk') { const d = player && at ? Math.hypot(at.x - player.pos.x, at.z - player.pos.z) : 3; sound.honk(clamp(1.6 - d / 8, 0.4, 1.2)); }
    if (G.streetDay && G.streetDay[kind] === G.day) return;
    (G.streetDay = G.streetDay || {})[kind] = G.day;
    toast((kind === 'honk' ? '📯 Beep beep! ' : '🚸 ') + STREET[kind][0], (kind === 'honk' ? '📯 빵빵! ' : '🚸 ') + STREET[kind][1], 'bad', 5.5);
  }
  // the pedestrian signal across the crosswalk near you: a white walking person, or an orange hand (flashing, with
  // the seconds left, when it is too late to start crossing)
  const walkEl = document.createElement('div');
  walkEl.className = 'walk-sign';
  walkEl.hidden = true;
  $('tags').appendChild(walkEl);
  const walkV = new T.Vector3();
  function walkSignTick() {
    const w = life && life.walkSign && state === 'play' && !jog ? life.walkSign() : null;
    const p = w ? project(walkV.set(w.x, 1.25, w.z)) : null;
    if (!p || !p.ok) { walkEl.hidden = true; return; }
    walkEl.hidden = false;
    walkEl.style.left = p.x + 'px';
    walkEl.style.top = p.y + 'px';
    const sig = w.state + w.secs;
    if (walkEl.dataset.sig === sig) return;
    walkEl.dataset.sig = sig;
    walkEl.className = 'walk-sign ' + w.state;
    walkEl.innerHTML = w.state === 'walk' ? '<b>🚶</b> WALK' : `<b>✋</b> DON'T WALK${w.secs ? ` <i>${w.secs}</i>` : ''}`;
  }

  // ---------------------------------------------------------------- coworkers: how close you are (friends table)
  // Each coworker (config friend_people, without the hero you play) is 0-100 close to you: G.friends.people { id: { pts,
  // last (the last day you spent time together), chat, coffee (days) } }, starting from config friend_start for people
  // who already know each other. It grows when you chat (friend_chat, the first time a day), have lunch together in the
  // office kitchen (friend_lunch, everyone at the table), finish a conversation with them (up to friend_talk, by its
  // points; friend_meeting for everybody else in it, and in a meeting), answer their texts (friend_reply, by the tone)
  // and handle well what they sent to your desk (friend_task); after friend_fade_days apart it fades by friend_fade a
  // day. config friend_levels: Friendly, Friend, Close friend. What it brings (friends table, by kind; lines of a kind in
  // turn): from Friendly, a tip on a desk task card (tip); from Friend, a coffee on a morning chat at work (coffee, once
  // a week each), a spare umbrella on a rainy day when you have none (umbrella, given back at the end of your next day
  // at work), a text on weekends (text), and after the missions an invitation to lunch at the diner that really
  // happens (invite at friend_invite_time: they wait in the booth from 15 minutes before friend_lunch_time for an hour,
  // and you Have lunch with them there and pay for friend_diner_item; noshow when you do not come); a Close friend
  // gives your update at a team meeting you missed (cover, once every friend_cover_days: no points lost, no note from
  // the manager). What they talk about at lunch: lunch, diner. At the review, a point for each coworker who is a Friend
  // or closer (friend_review at most). G.friends also keeps { lunch (day), invite { day, npc, done, noshow }, inviteDay,
  // asked, lend { npc, day }, cover, textWeek, lastText, said { '<kind>@<id>': n }, news [[en, ko]] }.
  const FRIEND_ROWS = rows('friends').slice().sort((a, b) => (a.sort || 0) - (b.sort || 0));
  const FRIEND_PEOPLE = listOf(CFG.friend_people == null ? 'maya,derek,priya,jun,sam,linda,tom' : CFG.friend_people);
  const FRIEND_AT = (listOf(CFG.friend_levels).length === 3 ? listOf(CFG.friend_levels) : [20, 45, 70]).map(Number);
  const BOND = [['Coworker', '아는 사이'], ['Friendly', '친한 동료'], ['Friend', '친구'], ['Close friend', '절친']];
  const fcfg = (k, d) => { const v = CFG['friend_' + k]; return v == null || v === '' || isNaN(+v) ? d : +v; };
  const REPLY_PTS = { good: 3, ok: 1, poor: -2 };
  listOf(CFG.friend_reply).forEach(x => { const [k, v] = x.split(':'); if (k && v != null && !isNaN(+v)) REPLY_PTS[k] = +v; });
  const LUNCH_AT = hm(CFG.friend_lunch_time, 750), LUNCH_FROM = 11.5 * 60, LUNCH_TO = 14.5 * 60;
  const enFirst = (id) => String((NPCS[id] || { name: pretty(id) }).name).split(' ')[0];
  const koFirst = (id) => String((NPCS[id] || {}).name_ko || enFirst(id)).split(' ')[0];
  const namesEn = (ids) => { const n = ids.map(enFirst); return n.length > 1 ? n.slice(0, -1).join(', ') + ' and ' + n[n.length - 1] : n[0] || ''; };
  const namesKo = (ids, a, b) => { const n = ids.map(koFirst); return n.slice(0, -1).concat(josa(n[n.length - 1] || '', a, b)).join('·'); };
  const fill = (s, v) => String(s == null ? '' : s).replace(/\{(\w+)\}/g, (m, k) => v[k] != null ? v[k] : m);
  function isPal(id) { return !!G && !!id && id !== G.hero && FRIEND_PEOPLE.includes(id) && !!NPCS[id]; }
  function pals() { return FRIEND_PEOPLE.filter(isPal); }
  function friends() { const F = G.friends || (G.friends = {}); F.people = F.people || {}; return F; }
  function bond(id) {
    const P = friends().people;
    if (!P[id]) {          // the first time: friend_start ('jun/derek:10'), or strangers
      const s = listOf(CFG.friend_start).map(x => /^(\w+)\/(\w+):(\d+)$/.exec(x)).find(m => m && m[1] === G.hero && m[2] === id);
      P[id] = { pts: s ? +s[3] : 0, last: 0 };
    }
    return P[id];
  }
  const closeness = (id) => isPal(id) ? bond(id).pts : 0;
  const bondLevel = (pts) => FRIEND_AT.filter(n => pts >= n).length;
  const levelOf = (id) => bondLevel(closeness(id));
  function befriend(id, n) {          // closer (or not): a toast when it reaches a new level
    if (!isPal(id) || !n || fired()) return 0;
    const b = bond(id), was = bondLevel(b.pts);
    b.pts = clamp(Math.round((b.pts + n) * 10) / 10, 0, 100);
    if (n > 0) b.last = G.day;
    const now = bondLevel(b.pts);
    if (now > was && !hush) toast(`🤝 You and ${enFirst(id)} are closer now: ${BOND[now][0]}.`, `🤝 ${namesKo([id], '과', '와')} 더 가까워졌어요: ${BOND[now][1]}.`, null, 4);
    return n;
  }
  const friendLines = (id, kind) => FRIEND_ROWS.filter(r => r.npc === id && r.kind === kind && forHero(r.hero || 'all', G.hero) && closeness(id) >= (+r.need || 0));
  function friendLine(id, kind) {
    const list = friendLines(id, kind), F = friends(), k = kind + '@' + id;
    if (!list.length) return null;
    F.said = F.said || {};
    const r = list[(F.said[k] || 0) % list.length];
    F.said[k] = (F.said[k] || 0) + 1;
    return r;
  }
  // Chat with someone (chatter): closer, once a day; a Friend may have something for you. True when they said it.
  function friendChat(a) {
    if (!isPal(a.id) || fired()) return false;
    const b = bond(a.id), F = friends();
    if (b.chat !== G.day) { b.chat = G.day; befriend(a.id, fcfg('chat', 2)); }
    let r = null, done = null;
    if (levelOf(a.id) >= 2 && weatherOf(G.day).kind === 'rain' && ITEMS.umbrella && !G.inventory.umbrella && !F.lend && (r = friendLine(a.id, 'umbrella'))) {
      lots().push({ id: 'umbrella', day: G.day, left: 1, lent: a.id });
      syncBag();
      F.lend = { npc: a.id, day: G.day };
      done = [`☂️ ${enFirst(a.id)} lent you an umbrella. You'll give it back at work.`, `☂️ ${namesKo([a.id], '이', '가')} 우산을 빌려줬어요. 회사에서 돌려주면 돼요.`];
    } else if (levelOf(a.id) >= 2 && zoneId === 'office' && !myOff(G.day) && G.minute < 11 * 60 && G.day - (b.coffee || -99) >= 7 && (r = friendLine(a.id, 'coffee'))) {
      const e = fcfg('coffee_energy', 8);
      b.coffee = G.day;
      G.energy = clamp(G.energy + e, 0, E_MAX);
      done = [`☕ ${enFirst(a.id)} brought you a coffee. Energy +${e}.`, `☕ ${namesKo([a.id], '이', '가')} 커피를 사다 줬어요. 에너지 +${e}.`];
    }
    if (!r) return false;
    say(a, r.line, r.line_ko, 4);
    speak(r.line, voiceOf(a.row));
    play(a, 'interact-right', { once: true });
    toast(done[0], done[1], null, 4.5);
    saveGame();
    return true;
  }
  // Lunch together (placeActions): in the office kitchen with whoever of them is there at lunchtime, or in the booth at
  // the diner with the one who invited you today (you pay for config friend_diner_item, with tax and the tip)
  function lunchActions(pid) {
    if (!G || fired() || (pid !== 'office_kitchen' && pid !== 'diner_table') || G.minute < LUNCH_FROM || G.minute > LUNCH_TO || friends().lunch === G.day) return [];
    const diner = pid === 'diner_table', inv = friends().invite, it = diner ? ITEMS[CFG.friend_diner_item || 'diner_club'] : null;
    const ids = Object.values(npcActors).filter(a => !a.leaving && !a.walk && a.place === pid && isPal(a.id) && (!diner || (inv && inv.day === G.day && inv.npc === a.id && !inv.done))).map(a => a.id);
    if (!ids.length || (diner && !it)) return [];
    const cost = it ? ' · ' + usd2(billFor(it).total) : '';
    return [{ key: 'lunch:' + pid + ids.join(','), label: tr(`Have lunch with ${namesEn(ids)}${cost}`, `${namesKo(ids, '과', '와')} 점심 먹기${cost}`), run: () => haveLunch(pid, ids) }];
  }
  function haveLunch(pid, ids) {
    const F = friends(), it = pid === 'diner_table' ? ITEMS[CFG.friend_diner_item || 'diner_club'] : null;
    let bill = null;
    if (it) {
      bill = billFor(it);
      if (G.money < bill.total) { toast(`You can't afford lunch here (${receipt(bill)}).`, `여기서 점심을 사 먹을 돈이 부족해요 (${receipt(bill)}).`, 'bad', 3.5); return false; }
      pay(-bill.total, it.name, 'spend', Object.assign({ ko: it.name_ko }, bill.tax || bill.tip ? { tax: bill.tax, tip: bill.tip } : null));
      F.invite.done = true;
    }
    F.lunch = G.day;
    const energy = it ? +it.energy || 0 : fcfg('lunch_energy', 10), before = ids.map(closeness);
    G.energy = clamp(G.energy + energy, 0, E_MAX);
    ids.forEach(id => befriend(id, it ? fcfg('diner', 10) : fcfg('lunch', 6)));
    advanceMinutes(it ? 45 : 30);
    const said = ids.slice(0, 2).map(id => ({ id, r: friendLine(id, it ? 'diner' : 'lunch') })).filter(x => x.r);
    logEvent('lunch', `Lunch with ${namesEn(ids)}`, 0, { ko: `${namesKo(ids, '과', '와')} 점심` });
    saveGame();
    if (player) { player.sit = true; play(player, 'sit'); }
    const intro = it ? tr(`You share a booth by the window and order the ${esc(String(it.name).toLowerCase())} (${receipt(bill)}).`, `창가 부스에 함께 앉아 ${esc(josa(it.name_ko || it.name, '을', '를'))} 시켰어요 (${receipt(bill)}).`)
      : tr('You sit down together in the kitchen with something from the snack shelf.', '탕비실 간식 선반에서 먹을 걸 챙겨 함께 앉았어요.');
    showCard({ kicker: tr('Lunch', '점심'), title: tr(`Lunch with ${namesEn(ids)}`, `${namesKo(ids, '과', '와')} 점심`),
      body: `<p>${intro}</p>${said.map(x => `<p class="quote"><b>${esc(firstName(NPCS[x.id]))}:</b> “${esc(shown(x.r.line, x.r.line_ko))}”</p>`).join('')}
        <p class="score-line">${ids.map((id, k) => `🤝 ${esc(firstName(NPCS[id]))} · ${esc(tr(BOND[levelOf(id)][0], BOND[levelOf(id)][1]))} ${Math.round(closeness(id))} (${closeness(id) - before[k] >= 0 ? '+' : '−'}${Math.abs(Math.round((closeness(id) - before[k]) * 10) / 10)})`).join(' · ')}</p>
        <p class="score-line">${tr('Energy', '에너지')} +${energy} · ${tr('now', '지금')} ${clk(G.minute)}</p>`,
      ok: tr('Back to it', '돌아가기'), state: 'card' }, () => { goalTimer = 0; });
    if (said[0]) speak(said[0].r.line, voiceOf(NPCS[said[0].id]));
    return true;
  }
  // where the one who invited you is at lunchtime (npcPlaceNow): the booth at the diner, until you have eaten together
  function lunchPlace(n) {
    const inv = G && G.friends && G.friends.invite;
    return inv && inv.day === G.day && inv.npc === n.id && !inv.done && !inv.noshow && G.minute >= LUNCH_AT - 15 && G.minute < LUNCH_AT + 60 ? 'diner_table' : null;
  }
  // a working day after the missions, at friend_invite_time: a Friend at work with nothing on at lunchtime may text you
  // (force: the debug API, anyone of them, any day you work)
  function inviteLunch(id, force) {
    const F = friends(), d = G.day;
    if (fired() || myOff(d) || (F.invite && F.invite.day === d)) return null;
    const busy = (p) => routinesOn(d).some(x => hm(x.r.time, 0) < LUNCH_AT + 75 && hm(x.ep.time_to, 1439) > LUNCH_AT - 30 && listOf(x.r.people).concat(SPEAKERS[x.ep.id] || [], [x.ep.npc]).includes(p))
      || episodes().some(e => !ROUTINE_OF[e.id] && dayIn(e) && !G.done[e.id] && (e.npc === p || (SPEAKERS[e.id] || []).includes(p)) && hm(e.time_from, 0) < LUNCH_AT + 60 && hm(e.time_to, 1439) > LUNCH_AT - 15);
    const h = hoursOf('diner');
    if (!force && (d - (F.inviteDay || -99) < fcfg('invite_days', 5) || (h && (LUNCH_AT < h[0] || LUNCH_AT + 60 > h[1])))) return null;
    const can = (id ? [id] : pals()).filter(p => isPal(p) && (force || (levelOf(p) >= 2 && !busy(p) && scheduledPlace(NPCS[p]) && zoneOfPlace(scheduledPlace(NPCS[p])) === 'office')) && friendLines(p, 'invite').length);
    const who = can[Math.floor(Math.random() * can.length)];
    if (!who) return null;
    const r = friendLine(who, 'invite');
    F.invite = { day: d, npc: who };
    F.inviteDay = d;
    notify(who, fill(r.line, { time: clock(LUNCH_AT) }), fill(r.line_ko, { time: clockKo(LUNCH_AT) }), 'text');
    npcSig = '';
    return who;
  }
  function noShow(inv) {          // you did not come: a little less close, and a text that says it's fine
    inv.noshow = true;
    befriend(inv.npc, -fcfg('noshow', 4));
    const r = friendLine(inv.npc, 'noshow');
    if (r) notify(inv.npc, r.line, r.line_ko, 'text');
  }
  function weekendText() {          // the closest Friend (not the one who texted last time) says hello
    const F = friends(), list = pals().filter(p => levelOf(p) >= 2 && friendLines(p, 'text').length).sort((a, b) => closeness(b) - closeness(a));
    const p = list.find(x => x !== F.lastText) || list[0];
    if (!p) return null;
    const r = friendLine(p, 'text');
    F.lastText = p;
    notify(p, r.line, r.line_ko, 'text');
    return p;
  }
  // every half second while you walk about (frame): the invitation, a lunch you missed, the weekend text
  function friendTick() {
    if (!G || fired() || state !== 'play' || !FRIEND_ROWS.length) return;
    const F = friends(), d = G.day, m = G.minute, inv = F.invite, week = Math.floor((d - 1) / 7);
    if (inv && inv.day === d && !inv.done && !inv.noshow && m >= LUNCH_AT + 60) noShow(inv);
    if (freePlay() && F.asked !== d && m >= hm(CFG.friend_invite_time, 645) && m < LUNCH_AT - 30) { F.asked = d; if (Math.random() < fcfg('invite_chance', 0.4)) inviteLunch(null, false); }
    if (isWeekend(d) && F.textWeek !== week && m >= 11 * 60 && m < 20 * 60) { F.textWeek = week; weekendText(); }
  }
  // what they say after a conversation (completeEpisode), an answer to their text (replyTo), a task they sent (chooseTask)
  function friendsAfterTalk(ep, got, best) {
    if (!G) return;
    const rt = ROUTINE_OF[ep.id], also = new Set((SPEAKERS[ep.id] || []).concat(rt ? listOf(rt.people).filter(id => NPCS[id] && scheduledPlace(NPCS[id])) : []));
    if (isPal(ep.npc)) befriend(ep.npc, best ? Math.round(fcfg('talk', 4) * got / best) : 1);
    also.delete(ep.npc);
    also.forEach(id => befriend(id, fcfg('meeting', 1)));
  }
  function friendReply(m, r) { befriend(m.sender, REPLY_PTS[r.tone] || 0); }
  function friendTask(t, n) { if (t.sender) befriend(t.sender, Math.sign(n) * fcfg('task', 2)); }
  function friendTip(t) {          // on a desk task card: what a Friendly coworker once told you about it
    const r = FRIEND_ROWS.find(x => x.kind === 'tip' && x.task === t.id && isPal(x.npc) && forHero(x.hero || 'all', G.hero) && closeness(x.npc) >= (+x.need || 0));
    return r ? `<p class="tip">💡 <b>${esc(firstName(NPCS[r.npc]))}:</b> “${esc(shown(r.line, r.line_ko))}”</p>` : '';
  }
  // a meeting you missed on a day you came in (missedRoutines): a Close friend who was there gave your update
  function coveredFor(x, d) {
    const F = friends();
    if (fired() || (F.cover && d - F.cover < fcfg('cover_days', 14))) return false;
    const there = listOf(x.r.people).concat(SPEAKERS[x.ep.id] || [], [x.ep.npc]);
    const id = pals().filter(p => there.includes(p) && levelOf(p) >= 3 && friendLines(p, 'cover').length).sort((a, b) => closeness(b) - closeness(a))[0];
    if (!id) return false;
    const r = friendLine(id, 'cover'), what = [meetingName(x.r), x.r.title_ko || x.r.title];
    F.cover = d;
    notify(id, fill(r.line, { meeting: what[0] }), fill(r.line_ko, { meeting: what[1] }), 'text');
    (F.news = F.news || []).push([`🤝 ${esc(enFirst(id))} gave your update at ${esc(what[0])}, so missing it didn't count against you.`, `🤝 ${esc(namesKo([id], '이', '가'))} ${esc(what[1])}에서 내 진행 상황을 대신 말해 줘서 빠진 게 문제 되지 않았어요.`]);
    return true;
  }
  // the night (goToSleep, after the day changed): a lunch you missed, the umbrella back, time apart; lines for the morning card
  function friendsNight(day) {
    const F = friends(), out = [];
    if (fired() || !FRIEND_ROWS.length) return out;
    if (F.invite && F.invite.day === day && !F.invite.done && !F.invite.noshow) noShow(F.invite);
    if (F.lend && F.lend.day < day && /^(on|late|noon)$/.test(work().record[day] || '')) {
      G.lots = lots().filter(l => !l.lent);
      syncBag();
      out.push(tr(`☂️ You gave ${esc(enFirst(F.lend.npc))}'s umbrella back.`, `☂️ ${esc(koFirst(F.lend.npc))}에게 우산을 돌려줬어요.`));
      F.lend = null;
    }
    pals().forEach(id => {
      const b = bond(id), was = bondLevel(b.pts);
      if (b.pts <= 0 || day - (b.last || 0) < fcfg('fade_days', 5)) return;
      b.pts = Math.max(0, Math.round((b.pts - fcfg('fade', 1)) * 10) / 10);
      if (bondLevel(b.pts) < was) out.push(tr(`💤 You and ${esc(enFirst(id))} haven't spent time together lately: ${BOND[bondLevel(b.pts)][0]} now.`, `💤 요즘 ${esc(namesKo([id], '과', '와'))} 함께한 시간이 없어서 조금 멀어졌어요. 이제 ${BOND[bondLevel(b.pts)][1]}예요.`));
    });
    (F.news || []).forEach(n => out.push(tr(n[0], n[1])));
    F.news = [];
    return out;
  }
  // the review (reviewScore): a point for each coworker who is a Friend or closer
  function teamPart() {
    const max = fcfg('review', 3), n = G ? pals().filter(id => levelOf(id) >= 2).length : 0;
    return max > 0 && n ? [{ en: 'Teammates', ko: '동료 관계', got: Math.min(max, n), max: 0, note: [`close with ${n} coworker${n === 1 ? '' : 's'}`, `가까운 동료 ${n}명`] }] : [];
  }
  // Work record: the people at work, closest first
  function friendsPanel() {
    const list = G && FRIEND_ROWS.length ? pals().sort((a, b) => closeness(b) - closeness(a)) : [];
    if (!list.length || fired()) return '';
    const F = friends(), inv = F.invite && F.invite.day === G.day && !F.invite.done && !F.invite.noshow && G.minute < LUNCH_AT + 60 ? F.invite : null, fade = fcfg('fade_days', 5);
    return `<h3>${tr('People', '동료')}</h3>${inv ? `<p class="fine">🍽️ ${tr(`${esc(enFirst(inv.npc))} invited you to lunch: the ${esc(zoneName('diner')[0])}, ${clock(LUNCH_AT)}.`, `${esc(namesKo([inv.npc], '이', '가'))} 점심을 같이 먹자고 했어요: ${esc(zoneName('diner')[1] || zoneName('diner')[0])}, ${clockKo(LUNCH_AT)}.`)}</p>` : ''}
      <p class="fine">${tr(`Chat, have lunch together in the office kitchen around noon, and do well in conversations and meetings with them. ${BOND[1][0]} (${FRIEND_AT[0]}): tips for what comes up at your desk. ${BOND[2][0]} (${FRIEND_AT[1]}): a coffee now and then, a spare umbrella in the rain, texts on weekends, lunch at the diner. ${BOND[3][0]} (${FRIEND_AT[2]}): gives your update at a meeting you missed. After ${fade} days apart it fades.`,
        `잡담하고, 점심때 탕비실에서 같이 밥을 먹고, 함께하는 대화와 회의를 잘 해내면 가까워져요. ${BOND[1][1]}(${FRIEND_AT[0]}): 업무 중에 생긴 일에 대한 조언. ${BOND[2][1]}(${FRIEND_AT[1]}): 가끔 커피, 비 오는 날 여분 우산, 주말 문자, 다이너 점심 초대. ${BOND[3][1]}(${FRIEND_AT[2]}): 빠진 회의에서 내 진행 상황을 대신 말해 줌. ${fade}일 넘게 함께하지 않으면 조금씩 멀어져요.`)}</p>
      ${list.map(id => { const b = bond(id), lv = bondLevel(b.pts), n = NPCS[id];
        return `<div class="row bond"><div class="main"><div class="t">${esc(fullName(n))} <span class="lvl lv${lv}">${esc(tr(BOND[lv][0], BOND[lv][1]))}</span></div><div class="s"><span class="meter"><i style="width:${clamp(b.pts, 0, 100)}%"></i></span> ${esc(loc(n, 'role'))}${b.last ? ' · ' + tr(`last together ${esc(dMonth(b.last))}`, `마지막으로 함께한 날 ${esc(dMonth(b.last))}`) : ''}</div></div><span class="price">${Math.round(b.pts)}</span></div>`; }).join('')}`;
  }
  function friendsView() { const o = {}; pals().forEach(id => { o[id] = { pts: closeness(id), level: BOND[levelOf(id)][0], last: bond(id).last || 0 }; }); return o; }

  // ---------------------------------------------------------------- HUD: clock, money, energy, objective, next event
  let hudTimer = 0, goalTimer = 0, goalTarget = null;
  function hud() {
    if (!G) return;
    $('hud-day').textContent = dShort(G.day);
    const hol = holidayOf(G.day);
    $('hud-day').title = tr(`${dateLong(G.day)} · Day ${G.day}${hol ? ' · ' + hol.name : ''}`, `${dateKo(G.day)} · ${G.day}일째${hol ? ' · ' + (hol.name_ko || hol.name) : ''}`);
    $('hud-time').textContent = clk(G.minute);
    const wx = weatherNow(), hw = $('hud-weather'), dark = darkAt(G.minute);
    const dry = wx.kind === 'rain' && wx.rain < 0.04, lifted = wx.kind === 'fog' && wx.fog < 0.05;
    if (hw) {
      hw.textContent = `${dry ? '☁️' : lifted ? '⛅' : dark && wx.kind === 'clear' ? '🌙' : WX_ICON[wx.kind] || ''} ${KO() ? toC(wx.temp) + '°C' : wx.temp + '°F'}${soaked() ? ' 💧' : ''}`;
      const sun = sunOf(G.day);
      hw.title = tr(`${WX_NAME[wx.kind] || ''}, high ${wx.high}°F, low ${wx.low}°F (${toC(wx.temp)}°C now). ${wx.row.forecast || ''}${sun ? ' ' + sunText(G.day) + '.' : ''}${soaked() ? ' You are wet from the rain.' : ''}`,
        `${WX_NAME_KO[wx.kind] || ''}, 최고 ${toC(wx.high)}°C, 최저 ${toC(wx.low)}°C (지금 ${wx.temp}°F). ${wx.row.forecast_ko || ''}${sun ? ` 해돋이 ${hhmm(sun.rise)}, 해넘이 ${hhmm(sun.set)}.` : ''}${soaked() ? ' 비에 젖었어요.' : ''}`);
    }
    const m = $('hud-money');
    m.textContent = usd(G.money);
    m.classList.toggle('neg', G.money < 0);
    const e = G.energy / E_MAX;
    $('hud-energy').style.width = (e * 100).toFixed(1) + '%';
    const box = document.querySelector('#bar .energy');
    box.classList.toggle('low', G.energy < 30 && G.energy >= 20);
    box.classList.toggle('empty', G.energy < 20);
    box.title = `${tr('Energy', '에너지')} ${Math.round(G.energy)} / ${E_MAX}`;
    const sc = $('hud-score');
    if (sc) { sc.textContent = '★ ' + score(); sc.title = tr(`Score ${score()} · ${standing()[0]}`, `점수 ${score()} · ${standing()[1]}`); sc.className = 'score ' + standing()[2]; }
  }
  function setBox(el, en, ko, warn) {          // en and ko are HTML
    if (!en) { el.hidden = true; return; }
    el.hidden = false;
    el.innerHTML = tr(en, ko);
    el.classList.toggle('warn', !!warn);
  }
  function updateGoal() {
    if (!G || state === 'title' || !Z) { setBox($('goal'), null); setBox($('next'), null); goalTarget = null; return; }
    const open = openEpisodes();
    let en = null, ko = null, warn = false;
    goalTarget = null;
    if (open.length) {
      const ep = open.find(e => isPhone(e) ? placeIn(e.place, zoneId) : e.npc && npcActors[e.npc]) || open[0];
      const n = npcRow(ep.npc), pid = isPhone(ep) ? ep.place : npcPlaceNow(n) || ep.place, pz = placeIn(pid, zoneId) ? zoneId : zoneOfPlace(pid);
      const pl = place(pid);
      if (pz === zoneId && ep.remote) {          // hybrid work: a meeting on video
        en = `Join the video call at ${esc(pl.name)}: <b>${esc(ep.title)}</b>`;
        ko = `${esc(loc(pl))}에서 화상 회의에 참여하세요: <b>${esc(loc(ep, 'title'))}</b>`;
        goalTarget = Z.places[pid] ? { at: Z.places[pid].at } : null;
      } else if (pz === zoneId && isPhone(ep)) {
        en = `Take the call at ${esc(pl.name)}: <b>${esc(ep.title)}</b>`;
        ko = `${esc(loc(pl))}에서 전화하세요: <b>${esc(loc(ep, 'title'))}</b>`;
        goalTarget = Z.places[pid] ? { at: Z.places[pid].at } : null;
      } else if (pz === zoneId) {
        en = `Talk to ${esc(n.name)}: <b>${esc(ep.title)}</b>`;
        ko = `${esc(fullName(n))}에게 말을 거세요: <b>${esc(loc(ep, 'title'))}</b>`;
        goalTarget = npcActors[ep.npc] ? { actor: npcActors[ep.npc] } : (Z.places[pid] ? { at: Z.places[pid].at } : null);
      } else {
        const zn = zoneName(pz);
        en = `Go to ${esc(pl.name)} (${esc(zn[0])})`;
        ko = `${esc(loc(pl))}(${esc(zn[1] || zn[0])})에 가세요 · ${esc(loc(ep, 'title'))}`;
        const via = pz && routeTo(zoneId, pz);
        if (via) goalTarget = { at: via.at, portal: true };
      }
    } else {
      const later = episodes().filter(laterToday).sort(epOrder)[0];
      const atWork = (zoneId === 'office' || remoteHere()) && !myOff(G.day) && !fired() && G.inDay === G.day && G.minute < 17 * 60, desk = remoteHere() ? hero().home_desk : hero().desk;
      const hg = hybridGoal();          // hybrid work: a remote day asks you to log in at your desk at home
      if (hg) {
        en = hg.en; ko = hg.ko; warn = hg.warn; goalTarget = hg.target;
      } else if (later && atWork) {
        en = `Work at your desk until ${clock(hm(later.time_from, 0))}. Next: ${esc(later.title)}`;
        ko = `${clockKo(hm(later.time_from, 0))}까지 자리에서 일하세요. 다음: ${esc(loc(later, 'title'))}`;
        if (Z.places[desk]) goalTarget = { at: Z.places[desk].at };
      } else if (later) {
        en = `Free until ${clock(hm(later.time_from, 0))}. Next: ${esc(later.title)}`;
        ko = `${clockKo(hm(later.time_from, 0))}까지 자유 시간. 다음: ${esc(loc(later, 'title'))}`;
      } else if (atWork && freePlay()) {
        const s = weekStats(G.day);
        en = `<b>At work.</b> Work at your desk: ${hrs(workedOn(G.day))} today, ${hrs(s.mins)} of about ${hrs(s.want)} this week.`;
        ko = `<b>근무 중.</b> 자리에서 일하세요: 오늘 ${hrs(workedOn(G.day))}, 이번 주 약 ${hrs(s.want)} 중 ${hrs(s.mins)}.`;
        if (Z.places[desk]) goalTarget = { at: Z.places[desk].at };
      } else if (G.minute >= 20 * 60) {
        const home = TRAVEL_ZONES.includes(zoneId) ? 'hotel' : hero().home_zone;
        const bed = home === 'hotel' ? 'hotel_room' : hero().home_bed;
        if (zoneId === home) { en = 'Time for bed. Go to your bed and sleep.'; ko = '잘 시간이에요. 침대에 가서 주무세요.'; if (Z.places[bed]) goalTarget = { at: Z.places[bed].at }; }
        else { en = `Head ${home === 'hotel' ? 'back to the hotel' : 'home'} and get some sleep.`; ko = home === 'hotel' ? '호텔로 돌아가 잠을 자세요.' : '집에 가서 잠을 자세요.'; const via = routeTo(zoneId, home); if (via) goalTarget = { at: via.at, portal: true }; }
      } else if (fired()) {
        en = `You no longer work at ${esc(CFG.company)}. Your time is your own.`;
        ko = `이제 ${esc(CFG.company)} 직원이 아니에요. 시간은 마음대로 쓰세요.`;
      } else if (leaveOf(G.day) === 'pto' && G.minute < 17 * 60) {
        en = '<b>PTO today.</b> No work: the day is yours.';
        ko = '<b>오늘은 연차.</b> 출근하지 않아도 돼요. 마음대로 보내세요.';
      } else if (leaveOf(G.day) && G.inDay !== G.day) {
        en = 'You called in sick today. Stay home and rest.';
        ko = '오늘은 병가를 냈어요. 집에서 쉬세요.';
      } else if (!myOff(G.day) && G.inDay !== G.day && G.minute < 17 * 60 && zoneId !== 'office' && !TRAVEL_ZONES.includes(zoneId)) {
        const late = G.minute > hm(CFG.late_after, 555);
        en = `${late ? "You're late! " : ''}Go to work at <b>${esc(CFG.company)}</b>${late ? '' : `: be in by ${clock(hm(CFG.late_after, 555))}`}.`;
        ko = `${late ? '지각이에요! ' : ''}<b>${esc(ZONE_NAMES.office[1] || CFG.company)}</b>에 출근하세요${late ? '' : ` (${clockKo(hm(CFG.late_after, 555))}까지)`}.`;
        warn = late;
        const via = routeTo(zoneId, 'office');
        if (via) goalTarget = { at: via.at, portal: true };
      } else if (!myOff(G.day) && G.outDay === G.day && G.minute < EARLY() && zoneId !== 'office' && !TRAVEL_ZONES.includes(zoneId)) {
        en = `Head back to work at <b>${esc(CFG.company)}</b> before ${clock(EARLY())}.`;
        ko = `${clockKo(EARLY())} 전에 <b>${esc(ZONE_NAMES.office[1] || CFG.company)}</b>로 돌아가세요.`;
        const via = routeTo(zoneId, 'office');
        if (via) goalTarget = { at: via.at, portal: true };
      } else if (companyOff(G.day) && !isWeekend(G.day)) {
        const hol = holidayOf(G.day);
        en = `<b>Day off${hol ? ': ' + esc(hol.name) : ''}.</b> ${esc(CFG.company)} is closed today.`;
        ko = `<b>쉬는 날${hol ? ': ' + esc(loc(hol)) : ''}.</b> 오늘은 ${esc(ZONE_NAMES.office[1] || CFG.company)}가 쉬어요.`;
      } else if (freePlay()) {
        en = `<b>Free play.</b> Live your life in ${esc(CFG.city)}: work, shop, cook, explore.`;
        ko = `<b>자유 플레이.</b> ${esc(zoneName('city')[1] || CFG.city)}에서 살아 보세요: 일하고, 장 보고, 요리하고, 구경하세요.`;
      } else {
        en = 'Free time. Explore, shop, or grab something to eat.';
        ko = '자유 시간. 둘러보거나 장을 보거나 뭔가 먹어요.';
      }
    }
    if (G.energy < 30) { warn = true; en += `<br><small>Low energy (${Math.round(G.energy)}). Eat something or rest.</small>`; ko += `<br><small>에너지가 낮아요(${Math.round(G.energy)}). 뭔가 먹거나 쉬세요.</small>`; }
    const sick = illNote(); if (sick) { en += `<br><small>${sick[0]}</small>`; ko += `<br><small>${sick[1]}</small>`; }
    setBox($('goal'), en, ko, warn);
    const cal = calendar().filter(c => c.day === G.day && hm(c.time, 0) >= G.minute - 30 && !firedOut(c.place)).sort((a, b) => hm(a.time, 0) - hm(b.time, 0))[0];
    if (cal) setBox($('next'), `Next: <b>${clock(hm(cal.time, 0))}</b> ${esc(cal.title)}${cal.place ? ' · ' + esc(place(cal.place).name) : ''}`, `다음 일정: <b>${clockKo(hm(cal.time, 0))}</b> ${esc(loc(cal, 'title'))}${cal.place ? ' · ' + esc(loc(place(cal.place))) : ''}`);
    else setBox($('next'), null);
    Object.values(npcActors).forEach(a => { if (a.mark) a.mark.visible = open.some(e => e.npc === a.id && !isPhone(e)); });
    phoneMarks(open.filter(e => isPhone(e) && Z.places[e.place] && placeIn(e.place, zoneId) && !(talk && talk.ep.id === e.id)));
    // people with nothing to discuss make small talk as you pass (a bubble; Chat also says it aloud)
    if (state === 'play' && player) Object.values(npcActors).forEach(a => {
      if (a.leaving || open.some(e => e.npc === a.id) || !(CHATTER[a.id] || []).length) return;
      if (Math.hypot(a.pos.x - player.pos.x, a.pos.z - player.pos.z) > 2.0 || elapsed - (a.chatAt || -99) < 40) return;
      a.chatAt = elapsed;
      const c = remark(a);
      say(a, personal(c.line), c.line_ko && personalKo(c.line_ko), 3.5);
    });
  }
  // what somebody says in passing: their own lines in turn, and every third time (the first time too) a remark
  // about the weather, the day of the week or the time of day (smalltalk table)
  function remark(a) {
    a.chatN = (a.chatN || 0) + 1;
    const lines = CHATTER[a.id] || [];
    // first, what anybody would say at the sight of you: dripping wet indoors, or in late this morning
    const about = Z.indoor && soaked() ? 'you:wet' : zoneId === 'office' && G.lateDay === G.day && G.minute < 12 * 60 ? 'you:late'
      : zoneId === 'office' && G.dirtyDay === G.day && (hash(a.id) + G.day) % 2 === 0 ? 'you:laundry' : null;
    if (about && (SMALLTALK[about] || []).length && a.about !== about + G.day) {
      a.about = about + G.day;
      return SMALLTALK[about][(hash(a.id) + G.day) % SMALLTALK[about].length];
    }
    if (a.chatN % 3 === 1 || !lines.length) {
      const wx = weatherNow(), wd = (G.day - 1) % 7, m = G.minute, topics = [];
      if (wx.kind !== 'rain' || wx.rain > 0.04 || Z.indoor) topics.push('weather:' + (wx.kind === 'fog' && wx.fog < 0.05 ? 'partly' : wx.kind));
      if (wd === 0 && m < 12 * 60) topics.push('day:monday');
      if (wd === 4) topics.push('day:friday');
      if (wd >= 5) topics.push('day:weekend');
      if (dayOff(G.day)) topics.push('holiday');
      if (zoneId === 'office' && hybridOn(G.day) && !offWork(G.day)) topics.push(remoteDay(G.day) ? 'hybrid:remote' : 'hybrid:office');          // hybrid work: a quiet floor, or everybody in
      if (m < 9 * 60 && Z.indoor) topics.push('time:morning');
      if (m >= 11.5 * 60 && m < 13.5 * 60) topics.push('time:lunch');
      if (m >= 17.5 * 60) topics.push('time:evening');
      const sun = sunOf(G.day);
      if (sun && sun.set <= 18.6 * 60 && m >= sun.set - 20) topics.push('time:dark');         // autumn: dark before you leave work
      const pool = topics.reduce((l, t) => l.concat(SMALLTALK[t] || []), []).filter(c => !(darkAt(m) && /weather:(clear|partly)/.test(c.topic)));
      if (pool.length) return pool[(hash(a.id) + G.day * 7 + a.chatN) % pool.length];
    }
    if (!lines.length) return { line: 'Hi there!', line_ko: '안녕하세요!' };
    a.chatIdx = ((a.chatIdx == null ? -1 : a.chatIdx) + 1) % lines.length;
    return lines[a.chatIdx];
  }
  // a phone episode has nobody to stand there: the ! floats over the place
  let phones = {};
  function phoneMarks(list) {
    const keep = new Set(list.map(e => e.id));
    Object.keys(phones).forEach(id => { if (!keep.has(id) || phones[id].parent !== zoneGroup) { if (phones[id].parent) phones[id].parent.remove(phones[id]); delete phones[id]; } });
    list.forEach(e => {
      if (phones[e.id]) return;
      const m = new T.Sprite(new T.SpriteMaterial({ map: bangTex, depthWrite: false, toneMapped: false }));
      m.scale.setScalar(0.22);
      const at = Z.places[e.place].at;
      m.position.set(at[0], 0.95, at[1]);
      m.renderOrder = 5;
      zoneGroup.add(m);
      phones[e.id] = m;
    });
  }
  // the guide on the ground: a ring at the person, a beam at the way out toward them
  const marker = (function () {
    const group = new T.Group();
    const ring = new T.Mesh(new T.RingGeometry(0.34, 0.44, 32).rotateX(-Math.PI / 2), new T.MeshBasicMaterial({ color: 0xf2b632, transparent: true, opacity: 0.85, depthWrite: false, toneMapped: false }));
    ring.position.y = 0.02;
    const beam = new T.Mesh(new T.CylinderGeometry(0.22, 0.32, 3.2, 20, 1, true).translate(0, 1.6, 0),
      new T.MeshBasicMaterial({ color: 0xf2c75a, transparent: true, opacity: 0.2, depthWrite: false, side: T.DoubleSide, blending: T.AdditiveBlending, toneMapped: false }));
    group.add(ring, beam);
    group.visible = false;
    return { group, ring, beam };
  })();
  function markerTick(t) {
    const g = goalTarget;
    const show = !!g && (state === 'play') && !!player;
    marker.group.visible = show;
    if (!show) return;
    if (g.actor) marker.group.position.set(g.actor.pos.x, 0, g.actor.pos.z);
    else marker.group.position.set(g.at[0], 0, g.at[1]);
    const near = Math.hypot(marker.group.position.x - player.pos.x, marker.group.position.z - player.pos.z);
    marker.beam.visible = (!!g.portal || !g.actor) && near > 2.2;
    marker.beam.material.opacity = clamp((near - 2.2) / 4, 0, 1) * 0.2;
    marker.ring.scale.setScalar(1 + Math.sin(t * 4) * 0.08);
  }

  // ---------------------------------------------------------------- bubbles and tags
  const bubbles = {};
  const actorOf = (id) => id === 'player' ? player : npcActors[id] || null;
  function say(who, text, ko, secs) {
    const a = typeof who === 'string' ? actorOf(who) : who;
    if (!a || !text) return;
    let b = bubbles[a.id];
    if (!b) { b = bubbles[a.id] = document.createElement('div'); b.className = 'bubble' + (a === player ? ' me' : ''); $('bubbles').appendChild(b); }
    b.textContent = tr(text, ko);
    b.classList.remove('hide');
    clearTimeout(b.timer);
    b.timer = setTimeout(() => b.classList.add('hide'), (secs || Math.max(2.6, text.length * 0.075)) * 1000);
  }
  const hideBubbles = () => Object.values(bubbles).forEach(b => b.classList.add('hide'));
  const tmpV = new T.Vector3();
  function project(v) {
    tmpV.copy(v).project(camera);
    return { x: (tmpV.x + 1) / 2 * window.innerWidth, y: (1 - tmpV.y) / 2 * window.innerHeight, ok: tmpV.z < 1 && Math.abs(tmpV.x) < 1.15 && Math.abs(tmpV.y) < 1.15 };
  }
  function placeBubbles() {
    Object.keys(bubbles).forEach(id => {
      const b = bubbles[id], a = actorOf(id);
      if (!a || b.classList.contains('hide')) return;
      const p = project(tmpV.set(a.pos.x, a.bubbleY, a.pos.z));
      b.style.display = p.ok ? '' : 'none';
      const half = Math.min(b.offsetWidth / 2, window.innerWidth / 2 - 8) + 8;
      b.style.left = clamp(p.x, half, window.innerWidth - half) + 'px';
      b.style.top = Math.max(p.y, b.offsetHeight + 52) + 'px';
    });
  }
  function addTag(text, pos, kind, range, ko) {
    const el = document.createElement('div');
    el.className = 'tag ' + kind;
    el.textContent = tr(text, ko);
    $('tags').appendChild(el);
    tags.push({ el, pos, range, en: text, ko });
  }
  function placeTags() {
    const show = state === 'play' && player;
    tags.forEach(t => {
      const near = show && Math.hypot(t.pos.x - player.pos.x, t.pos.z - player.pos.z) < t.range;
      const p = near ? project(t.pos) : null;
      if (!p || !p.ok) { t.el.style.display = 'none'; return; }
      t.el.style.display = '';
      t.el.style.left = p.x + 'px';
      t.el.style.top = p.y + 'px';
    });
  }

  // ---------------------------------------------------------------- voice (speechSynthesis; American English first)
  let voices = [], usVoices = [];
  function pickVoices() {
    if (!window.speechSynthesis) return;
    voices = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang));
    usVoices = voices.filter(v => /^en[-_]US/i.test(v.lang));
  }
  if (window.speechSynthesis) { pickVoices(); if (speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', pickVoices); }
  // Everybody has a voice of their own, the hero too (the npcs row with the hero's id). Which of the browser's voices:
  // the one the person's voice_like names (a pattern, tried on the American voices first), else one of the American
  // voices of the person's gender (picked by their id, so people differ where the system has several), else the
  // default American voice with the pitch shifted down for a man or up for a woman. Pitch and rate are the person's.
  const MALE_VOICE = /\b(male|guy|david|mark|alex|fred|tom|aaron|eric|roger|christopher|brian|andrew|davis|tony|jason|steffan|brandon|ralph|junior|reed|rocko|eddy|albert|bruce|grandpa)\b/i;
  const FEMALE_VOICE = /\b(female|zira|aria|jenny|samantha|victoria|allison|ava|susan|michelle|ana|sara|nancy|amber|ashley|cora|elizabeth|jane|monica|kathy|nicky|joanna|kendra|kimberly|salli|ivy|emma|flo|sandy|shelley|grandma)\b|Google US English/i;
  const voiceOf = (n) => n ? { id: n.id, pitch: n.voice_pitch, rate: n.voice_rate, like: n.voice_like, male: /^man-/.test(n.model || '') } : {};
  const heroVoice = () => G ? voiceOf(NPCS[G.hero] || { id: G.hero, model: G.model, voice_pitch: 1, voice_rate: 0.97 }) : {};
  function voiceFor(v) {
    let voice = null, shift = 0;
    if (v.like) { try { const re = new RegExp('\\b(?:' + v.like + ')\\b', 'i'); voice = usVoices.find(x => re.test(x.name)) || null; } catch (e) { /* bad pattern */ } }
    if (!voice && v.male != null) {
      const pool = usVoices.filter(x => (v.male ? MALE_VOICE : FEMALE_VOICE).test(x.name) && !(v.male ? FEMALE_VOICE : MALE_VOICE).test(x.name));
      if (pool.length) voice = pool[hash(v.id || '') % pool.length];
    }
    if (!voice) {
      voice = usVoices.find(x => /Google US English/i.test(x.name)) || usVoices[0] || voices[0] || null;
      const isMale = !!voice && MALE_VOICE.test(voice.name) && !FEMALE_VOICE.test(voice.name);
      if (v.male === true && !isMale) shift = -0.3;
      if (v.male === false && isMale) shift = 0.3;
    }
    return { voice, shift };
  }
  function speak(text, v, queue) {          // queue: after what is being said now (the reply to what you just said)
    if (!voiceBox.checked || !window.speechSynthesis || !text) return;
    const clean = String(text).replace(/[…]/g, ',').replace(/^\(.*\)$/, '').trim();
    if (!clean) return;
    v = v || {};
    try {
      if (!queue) speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(clean), pick = voiceFor(v);
      if (pick.voice) { u.voice = pick.voice; u.lang = pick.voice.lang; } else u.lang = 'en-US';
      u.rate = +v.rate || 0.95;
      u.pitch = clamp((+v.pitch || 1) + pick.shift, 0.4, 1.8);
      speechSynthesis.speak(u);
    } catch (e) { /* no speech here */ }
  }

  // ---------------------------------------------------------------- input
  const keys = {};
  const stick = { x: 0, y: 0, id: null };
  const typing = (e) => e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName);
  window.addEventListener('keydown', (e) => {
    if (typing(e)) return;
    keys[e.code] = true;
    if ((e.code === 'KeyE' || e.code === 'Enter') && state === 'play' && actions.length) { e.preventDefault(); actions[0].run(); }
    if (state === 'tour') {
      const what = { Escape: 'back', Space: 'auto', KeyT: 'time', KeyY: 'weather' }[e.code];
      if (what) { e.preventDefault(); tourDo(what); }
      if (/Arrow|Space/.test(e.code)) e.preventDefault();
      return;
    }
    if (e.code === 'Escape') { if (!$('panel').hidden) closePanel(); else if (!$('menu').hidden) toggleMenu(false); }
    const panelKey = { KeyT: 'talks', KeyP: 'phone', KeyN: 'phone', KeyI: 'inventory', KeyC: 'calendar', KeyM: 'map', KeyB: 'bank', KeyR: 'work' }[e.code];
    if (panelKey && G) { if (state === 'play') openPanel(panelKey); else if (panelKind === panelKey) closePanel(); }
    if (/Arrow|Space/.test(e.code)) e.preventDefault();
  });
  window.addEventListener('keyup', (e) => { keys[e.code] = false; });
  window.addEventListener('blur', () => { Object.keys(keys).forEach(k => { keys[k] = false; }); });
  const stickEl = $('stick'), knob = stickEl.querySelector('.knob');
  function stickMove(e) {
    const r = stickEl.getBoundingClientRect();
    let x = (e.clientX - r.left - r.width / 2) / (r.width / 2), y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    const l = Math.hypot(x, y);
    if (l > 1) { x /= l; y /= l; }
    stick.x = x; stick.y = y;
    knob.style.transform = `translate(${x * 34}px, ${y * 34}px)`;
  }
  stickEl.addEventListener('pointerdown', (e) => { stick.id = e.pointerId; stickEl.setPointerCapture(e.pointerId); stickMove(e); });
  stickEl.addEventListener('pointermove', (e) => { if (e.pointerId === stick.id) stickMove(e); });
  const stickUp = (e) => { if (e.pointerId !== stick.id) return; stick.id = null; stick.x = stick.y = 0; knob.style.transform = ''; };
  stickEl.addEventListener('pointerup', stickUp);
  stickEl.addEventListener('pointercancel', stickUp);
  if (window.matchMedia && matchMedia('(pointer: coarse)').matches) document.body.classList.add('touch');
  window.addEventListener('touchstart', () => document.body.classList.add('touch'), { once: true, passive: true });
  function readInput() {
    let fwd = 0, turn = 0;
    if (keys.ArrowUp || keys.KeyW) fwd += 1;
    if (keys.ArrowDown || keys.KeyS) fwd -= 1;
    if (keys.ArrowLeft || keys.KeyA) turn += 1;
    if (keys.ArrowRight || keys.KeyD) turn -= 1;
    if (stick.id !== null) { fwd += -stick.y; turn += -stick.x * 0.9; }
    const run = keys.ShiftLeft || keys.ShiftRight || (stick.id !== null && Math.hypot(stick.x, stick.y) > 0.95);
    return { fwd: clamp(fwd, -1, 1), turn: clamp(turn, -1, 1), run };
  }

  // ---------------------------------------------------------------- movement and collision
  const insideSolid = (x, z) => solids.some(s => x > s.x0 - PLAYER_R && x < s.x1 + PLAYER_R && z > s.z0 - PLAYER_R && z < s.z1 + PLAYER_R);
  function freeSpot(a, dist) {     // where to stand to talk to a: in front if free, otherwise to the side or behind
    const f = a.home == null ? a.heading : a.home;
    const B = Z.walk;
    for (const r of [dist, dist + 0.25, dist + 0.5]) {
      for (const turn of [0, 0.6, -0.6, 1.2, -1.2, 1.7, -1.7, 2.4, -2.4, Math.PI]) {
        const x = a.pos.x + Math.sin(f + turn) * r, z = a.pos.z + Math.cos(f + turn) * r;
        if (x < B[0] + PLAYER_R || x > B[2] - PLAYER_R || z < B[1] + PLAYER_R || z > B[3] - PLAYER_R || insideSolid(x, z)) continue;
        if (Object.values(npcActors).some(o => o !== a && Math.hypot(o.pos.x - x, o.pos.z - z) < 0.5)) continue;
        return new T.Vector3(x, 0, z);
      }
    }
    return new T.Vector3(a.pos.x + Math.sin(f) * dist, 0, a.pos.z + Math.cos(f) * dist);
  }
  function collide(p, noPeople) {
    for (let pass = 0; pass < 2; pass++) {
      for (const s of solids) {
        const x0 = s.x0 - PLAYER_R, x1 = s.x1 + PLAYER_R, z0 = s.z0 - PLAYER_R, z1 = s.z1 + PLAYER_R;
        if (p.x <= x0 || p.x >= x1 || p.z <= z0 || p.z >= z1) continue;
        const dl = p.x - x0, dr = x1 - p.x, dn = p.z - z0, ds = z1 - p.z, m = Math.min(dl, dr, dn, ds);
        if (m === dl) p.x = x0; else if (m === dr) p.x = x1; else if (m === dn) p.z = z0; else p.z = z1;
      }
      if (!noPeople) Object.values(npcActors).forEach(a => {
        const dx = p.x - a.pos.x, dz = p.z - a.pos.z, d = Math.hypot(dx, dz), min = PLAYER_R + NPC_R;
        if (d < min && d > 1e-6) { p.x = a.pos.x + dx / d * min; p.z = a.pos.z + dz / d * min; }
      });
      if (!noPeople) movers.forEach(m => {          // things that move (cars, passers-by): circles set by life.js each frame
        const dx = p.x - m.x, dz = p.z - m.z, d = Math.hypot(dx, dz), min = PLAYER_R + m.r;
        if (d < min && d > 1e-6) { p.x = m.x + dx / d * min; p.z = m.z + dz / d * min; }
      });
    }
    if (Z) {
      p.x = clamp(p.x, Z.walk[0] + PLAYER_R, Z.walk[2] - PLAYER_R);
      p.z = clamp(p.z, Z.walk[1] + PLAYER_R, Z.walk[3] - PLAYER_R);
    }
  }
  const movers = [];
  const nextPos = new T.Vector3();
  function playerTick(dt) {
    if (!player) return;
    const locked = state !== 'play' || busy;
    const inp = locked ? { fwd: 0, turn: 0, run: false } : readInput();
    if (inp.fwd) player.sit = false;
    if (inp.turn) player.heading += inp.turn * TURN * dt;
    const tired = G && G.energy < 20 ? (G.energy <= 0 ? 0.45 : 0.65) : 1;
    const speed = inp.fwd * (inp.run && inp.fwd > 0 ? RUN : WALK) * tired;
    if (speed) {
      nextPos.set(player.pos.x + Math.sin(player.heading) * speed * dt, 0, player.pos.z + Math.cos(player.heading) * speed * dt);
      collide(nextPos);
      player.pos.copy(nextPos);
    }
    if (player.want != null) {         // turning to face someone
      let d = player.want - player.heading;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      player.heading += d * (1 - Math.exp(-dt * 8));
      if (Math.abs(d) < 0.01) player.want = null;
    }
    locomotion(player, speed);
    player.holder.rotation.y = player.heading;
    if (player.mixer) player.mixer.update(dt);
  }
  const NPC_WALK = 1.0, GESTURES = ['emote-yes', 'interact-right', 'pick-up'];
  function npcTick(dt, t) {
    Object.values(npcActors).forEach(a => {
      let want = a.home;
      const talking = talk && talk.actor === a;
      const toP = player ? Math.hypot(player.pos.x - a.pos.x, player.pos.z - a.pos.z) : 99;
      const faceP = player ? Math.atan2(player.pos.x - a.pos.x, player.pos.z - a.pos.z) : 0;
      if (a.walk) want = walkStep(a, dt, talking, toP, faceP);
      else if (player && (talking || (toP < 2.4 && !a.sit))) want = faceP;
      if (want != null) {
        let d = want - a.heading;
        d = Math.atan2(Math.sin(d), Math.cos(d));
        a.heading += d * (1 - Math.exp(-dt * (a.walk ? 8 : 5)));
      }
      a.holder.rotation.y = a.heading;
      if (a.mark) { a.mark.position.y = MARK_Y + Math.sin(t * 3 + a.pos.x) * 0.03; a.mark.material.opacity = talking ? 0 : 1; a.mark.material.transparent = true; }
      // now and then: a gesture when standing (every 20 to 40 s), a glance around when sitting; a seated person looks at you
      if (!a.walk && !talking && a.mixer) {
        if (a.sit) {
          if (toP < 2.4) { let d = faceP - a.heading; d = Math.atan2(Math.sin(d), Math.cos(d)); a.look = clamp(d, -0.9, 0.9); a.lookAt = t + 3; }
          else if (t > (a.lookAt || 0)) { a.look = Math.random() < 0.4 ? 0 : (Math.random() - 0.5) * 1.1; a.lookAt = t + 5 + Math.random() * 9; }
        } else {
          a.look = 0;
          if (t > (a.gestureAt || (a.gestureAt = t + 10 + Math.random() * 25)) && state !== 'talk') {
            a.gestureAt = t + 20 + Math.random() * 20;
            const list = (a.cup ? ['emote-yes'] : GESTURES).filter(n => a.actions[n]);
            if (list.length && !gesturing(a)) play(a, list[Math.floor(Math.random() * list.length)], { once: true, fade: 0.3 });
          }
        }
      } else a.look = 0;
      animate(a, dt);
    });
  }
  // one step along the way; stops for the player in front (and after a while looks for a way around)
  function walkStep(a, dt, talking, toP, faceP) {
    const w = a.walk;
    if (!w.path || talking) { locomotion(a, 0); return talking ? faceP : null; }
    const p = w.path[w.i];
    let dx = p[0] - a.pos.x, dz = p[1] - a.pos.z, d = Math.hypot(dx, dz);
    if (d < 0.03) {
      w.i++;
      if (w.i >= w.path.length) { arrive(a); return a.home; }
      return null;
    }
    dx /= d; dz /= d;
    let stop = false;
    if (player && toP < PLAYER_R + NPC_R + 0.35) {
      const ahead = ((player.pos.x - a.pos.x) * dx + (player.pos.z - a.pos.z) * dz) / (toP || 1);
      stop = ahead > 0.2;
    }
    if (stop) {
      w.blocked += dt;
      locomotion(a, 0);
      if (w.blocked > 2.5 && !w.req) {            // still in the way: go round
        w.blocked = 0;
        const goal = w.to;
        w.req = requestPath([a.pos.x, a.pos.z], goal, { avoid: [{ x: player.pos.x, z: player.pos.z, r: 0.45 }] }, (path) => {
          if (a.walk !== w) return;
          w.req = null;
          if (path) { w.path = path; w.i = 0; }
        });
      }
      return faceP;
    }
    w.blocked = Math.max(0, w.blocked - dt);
    const step = Math.min(d, NPC_WALK * dt);
    a.pos.x += dx * step;
    a.pos.z += dz * step;
    locomotion(a, NPC_WALK);
    return Math.atan2(dx, dz);
  }
  function portalTick() {
    if (!Z || !player || busy || state !== 'play') return;
    const inside = portalsOf(Z).find(p => {
      const w = (p.size || [1, 1])[0] / 2, d = (p.size || [1, 1])[1] / 2;
      return Math.abs(player.pos.x - p.at[0]) <= w && Math.abs(player.pos.z - p.at[1]) <= d;
    });
    if (!inside) { portalArmed = true; return; }
    if (!portalArmed) return;
    portalArmed = false;
    if (inside.when && !inside.when(api)) return;
    if (TRAVEL_ZONES.includes(inside.to) && !TRAVEL_ZONES.includes(zoneId) && !tripToday()) { toast('No trip scheduled.', '예정된 출장이 없어요.'); return; }
    if (closedNow(inside.to) && shutAllDay(inside.to)) { const zn = zoneName(inside.to), hol = holidayOf(G.day); toast(`${zn[0]} is closed today${hol ? ` for ${hol.name}` : ''}.`, `${zn[1] || zn[0]}은(는) 오늘 ${hol ? josa(loc(hol), '이라', '라') + ' ' : ''}문을 열지 않아요.`, 'bad', 4); return; }
    if (closedNow(inside.to)) { const zn = zoneName(inside.to); toast(`${zn[0]} is closed. Hours: ${hoursText(inside.to)}`, `${zn[1] || zn[0]}은(는) 문을 닫았어요. 영업시간 ${hoursText(inside.to)}`, 'bad', 4); return; }
    const pid = portalPlace(inside), fares = pid ? faresAt(pid) : [];
    const fare = fares.reduce((t, i) => t + +i.price, 0);
    if (fare && G.money < fare) { toast(`You can't afford the fare (${usd2(fare)}).`, '요금이 부족해요.', 'bad'); return; }
    fares.forEach(i => pay(-i.price, i.name, 'spend', { ko: i.name_ko }));
    if (fare) toast(`Paid ${usd2(fare)}: ${fares.map(i => i.name).join(', ')}`, `${usd2(fare)} 냈어요: ${fares.map(i => loc(i)).join(', ')}`);
    let flight = 0;
    if (zoneId === 'airport' && inside.to === 'hotel') { flight = 120; G.trip = true; }
    if (zoneId === 'airport' && !TRAVEL_ZONES.includes(inside.to) && G.trip) { flight = 120; G.trip = false; }
    travel(inside.to, inside.arrive, null, flight);
  }
  function tripToday() { return episodes().some(e => !G.done[e.id] && dayIn(e) && TRAVEL_ZONES.includes(zoneOfPlace(e.place))); }
  function portalPlace(p) {        // the place a portal belongs to: the nearest one in this zone
    let best = null, bd = 3;
    Object.keys(Z.places).forEach(pid => { const a = Z.places[pid].at; const d = a ? Math.hypot(a[0] - p.at[0], a[1] - p.at[1]) : 9; if (d < bd) { bd = d; best = pid; } });
    return best;
  }
  async function travel(z, arrive, at, minutes) {
    if (!z) return;
    if (z === 'office' && zoneId !== 'office' && fired()) { stoppedAtDoor(); return; }          // let go: the badge no longer opens the door
    if (zoneId === 'office' && z !== 'office' && state === 'play') leftOffice(z);
    if (G && zoneId === hero().home_zone && z !== zoneId && state === 'play') leftHome(z);          // hybrid work: out of home while logged in
    if (minutes) advanceMinutes(minutes);
    if (state !== 'play') return;
    // through a door: the camera leans in on you as the screen darkens, and pulls back out in the new place
    busy = true;
    cam.push = { t: 0, dur: 0.34 };
    $('fade').classList.add('on');
    if (!fastMode) await new Promise(r => setTimeout(r, 300));
    cam.push = null;
    if (await enterZone(z, arrive, at)) cam.pull = { t: 0, dur: 0.75 };
    const zn = zoneName(z);
    if (z === 'office' && checkedIn) {        // the first time in today (enterZone: arrived)
      const kind = checkedIn;
      checkedIn = null;
      if (kind !== 'on') return;
      if (G.minute <= hm(CFG.work_start, 540)) { toast(`${zn[0]} · ${clock(G.minute)}. You're on time.`, `${zn[1] || zn[0]} · ${clockKo(G.minute)}. 제시간에 왔어요.`, 'good', 3); return; }
    }
    if (z === 'office' && !npcsIn(z).length) {
      if (isWeekend(G.day)) toast("It's the weekend. Nobody is in the office.", '주말이라 사무실에 아무도 없어요.', null, 4);
      else if (companyOff(G.day)) toast("It's a company holiday. Nobody is in the office.", '회사 휴일이라 사무실에 아무도 없어요.', null, 4);
      else toast('The office is empty. Everyone has gone home.', '사무실이 비었어요. 모두 퇴근했어요.', null, 4);
      return;
    }
    if (minutes) toast(`After a ${minutes / 60}-hour flight: ${zn[0]}`, `${minutes / 60}시간 비행 후: ${zn[1] || zn[0]}`, null, 3);
    else toast(zn[0], zn[1], null, 2.2);
  }

  // ---------------------------------------------------------------- camera: behind and above the player; from the side in a conversation
  const cam = { pos: new T.Vector3(), look: new T.Vector3(), ready: false, orbit: 0, push: null, pull: null };
  const ease = (x) => x * x * (3 - 2 * x);
  const want = new T.Vector3(), look = new T.Vector3(), rayFrom = new T.Vector3(), rayDir = new T.Vector3();
  const ray = new T.Raycaster();
  let occluders = [];
  // keep the camera in front of walls and buildings between it and the player
  function inRoom(v) {           // indoors the camera stays inside the room's rectangle
    if (!Z || !Z.indoor) return;
    const hw = Z.size[0] / 2 - 0.15, hd = Z.size[1] / 2 - 0.15;
    v.x = clamp(v.x, -hw, hw);
    v.z = clamp(v.z, -hd, hd);
  }

  // Looking round the town (the title screen's "Look around town"): the camera circles a point you move over the
  // town. ↑↓ / W S: forward and back, ← → / A D: turn, Q E: sideways, Z X (or the wheel): closer and farther,
  // R F: higher and lower, Space: the slow circling on and off, T: the time of day, Y: the weather, Esc: back.
  const tour = { x: 0, z: 0, yaw: 0, dist: 24, pitch: 0.42, auto: true, minute: 600, wx: null, drag: null };
  const TOUR_TIMES = [[600, 'Morning', '아침'], [780, 'Afternoon', '오후'], [1105, 'Sunset', '해 질 녘'], [1290, 'Night', '밤'], [400, 'Sunrise', '해돋이']];
  const TOUR_WX = [null, 'partly', 'cloudy', 'rain', 'fog'];
  async function startTour() {
    if (busy || jog) return;
    if (G) { saveGame(); G = null; }
    if (player) scene.remove(player.holder);
    Object.assign(tour, { x: 0, z: 0, yaw: cam.orbit, dist: 24, pitch: 0.42, auto: true, minute: 600, wx: null });
    $('title').hidden = true;
    state = 'tour';
    if (zoneId !== 'city') await enterZone('city');
    state = 'tour';
    fadedNow.forEach(h => setFaded(h, false));
    fadedNow = new Set();
    marker.group.visible = false;
    $('tour').hidden = false;
    document.body.classList.add('touring');
    tourLabels();
    envTimer = 0;
  }
  function endTour() {
    if (state !== 'tour') return;
    $('tour').hidden = true;
    document.body.classList.remove('touring');
    cam.orbit = tour.yaw;
    showTitle();
    envTimer = 0;
  }
  function tourLabels() {
    const t = TOUR_TIMES.find(x => x[0] === tour.minute) || TOUR_TIMES[0];
    $('tour').querySelector('[data-tour="time"]').textContent = tr(`Time: ${t[1]}`, `시간: ${t[2] || t[1]}`);
    $('tour').querySelector('[data-tour="weather"]').textContent = tr(`Weather: ${tour.wx ? WX_NAME[tour.wx] : 'Sunny'}`, `날씨: ${tour.wx ? WX_NAME_KO[tour.wx] : '맑음'}`);
    $('tour').querySelector('[data-tour="auto"]').textContent = tr(tour.auto ? 'Circling: on' : 'Circling: off', tour.auto ? '자동 회전: 켬' : '자동 회전: 끔');
  }
  function tourDo(what) {
    if (what === 'back') { endTour(); return; }
    if (what === 'time') tour.minute = TOUR_TIMES[(TOUR_TIMES.findIndex(x => x[0] === tour.minute) + 1) % TOUR_TIMES.length][0];
    if (what === 'weather') tour.wx = TOUR_WX[(TOUR_WX.indexOf(tour.wx) + 1) % TOUR_WX.length];
    if (what === 'auto') tour.auto = !tour.auto;
    if (what === 'in') tour.dist = clamp(tour.dist * 0.8, 5, 70);
    if (what === 'out') tour.dist = clamp(tour.dist * 1.25, 5, 70);
    envTimer = 0;
    tourLabels();
  }
  function tourTick(dt) {
    const k = keys, fwd = (k.ArrowUp || k.KeyW ? 1 : 0) - (k.ArrowDown || k.KeyS ? 1 : 0), turn = (k.ArrowLeft || k.KeyA ? 1 : 0) - (k.ArrowRight || k.KeyD ? 1 : 0);
    const side = (k.KeyE ? 1 : 0) - (k.KeyQ ? 1 : 0), zoom = (k.KeyX || k.Minus ? 1 : 0) - (k.KeyZ || k.Equal ? 1 : 0), tilt = (k.KeyR ? 1 : 0) - (k.KeyF ? 1 : 0);
    const fast = k.ShiftLeft || k.ShiftRight ? 2.2 : 1, move = (6 + tour.dist * 0.35) * fast * dt;
    if (fwd || turn || side || zoom || tilt) { if (tour.auto) { tour.auto = false; tourLabels(); } }
    if (tour.auto) tour.yaw += dt * 0.06;
    tour.yaw += turn * 1.3 * dt;
    // forward is away from the camera, over the ground
    const fx = -Math.sin(tour.yaw), fz = -Math.cos(tour.yaw);
    tour.x = clamp(tour.x + (fx * fwd - fz * side) * move, -34, 34);
    tour.z = clamp(tour.z + (fz * fwd + fx * side) * move, -34, 34);
    tour.dist = clamp(tour.dist * (1 + zoom * 1.1 * dt), 5, 70);
    tour.pitch = clamp(tour.pitch + tilt * 0.7 * dt, 0.06, 1.35);
    const h = Math.cos(tour.pitch) * tour.dist;
    camera.position.set(tour.x + Math.sin(tour.yaw) * h, Math.max(0.7, Math.sin(tour.pitch) * tour.dist), tour.z + Math.cos(tour.yaw) * h);
    camera.lookAt(tour.x, 0.8, tour.z);
    cam.pos.copy(camera.position);
    cam.look.set(tour.x, 0.8, tour.z);
  }
  canvas.addEventListener('pointerdown', (e) => { if (state !== 'tour') return; tour.drag = { id: e.pointerId, x: e.clientX, y: e.clientY }; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', (e) => {
    if (state !== 'tour' || !tour.drag || tour.drag.id !== e.pointerId) return;
    tour.yaw -= (e.clientX - tour.drag.x) * 0.006;
    tour.pitch = clamp(tour.pitch + (e.clientY - tour.drag.y) * 0.004, 0.06, 1.35);
    tour.drag.x = e.clientX; tour.drag.y = e.clientY;
    if (tour.auto) { tour.auto = false; tourLabels(); }
  });
  ['pointerup', 'pointercancel'].forEach(n => canvas.addEventListener(n, () => { tour.drag = null; }));
  canvas.addEventListener('wheel', (e) => { if (state !== 'tour') return; e.preventDefault(); tour.dist = clamp(tour.dist * (e.deltaY > 0 ? 1.1 : 0.9), 5, 70); }, { passive: false });

  function cameraTick(dt) {
    if (!Z) { camera.position.set(0, 3, 8); camera.lookAt(0, 1, 0); return; }
    if (state === 'tour') { tourTick(dt); return; }
    if (state === 'title' || !player) {
      cam.orbit += dt * 0.06;
      const r = Math.max(Z.size[0], Z.size[1]) * 0.45 + 4;
      camera.position.set(Math.sin(cam.orbit) * r, Z.indoor ? 3.2 : 7, Math.cos(cam.orbit) * r);
      camera.lookAt(0, 0.6, 0);
      return;
    }
    const p = player.pos;
    const other = talk && talk.actor;
    const portrait = window.innerWidth < window.innerHeight;
    if (state === 'talk' && other) {            // a three-quarter two-shot from the player's side: the other person's face
      let dx = other.pos.x - p.x, dz = other.pos.z - p.z;
      const l = Math.hypot(dx, dz) || 1;
      dx /= l; dz /= l;
      let sx = -dz, sz = dx;
      if (!cam.side) cam.side = sx * (cam.pos.x - p.x) + sz * (cam.pos.z - p.z) < 0 ? -1 : 1;
      sx *= cam.side; sz *= cam.side;
      const back = portrait ? 1.7 : 0.9, side = portrait ? 1.7 : 2.1;          // for people HEAD_Y tall
      want.set(p.x - dx * back + sx * side, portrait ? 1.6 : 1.4, p.z - dz * back + sz * side);
      look.set(p.x + dx * l * 0.6, portrait ? -0.15 : 0.26, p.z + dz * l * 0.6);
      inRoom(want);
    } else {
      cam.side = 0;
      // behind and above; when a wall or a building is in the way, rise over it rather than zoom into the head
      const sx = Math.sin(player.heading), sz = Math.cos(player.heading);
      const back = Z.indoor ? 2.9 : 3.6, high = Z.indoor ? 1.8 : 2.1;
      want.set(p.x - sx * back, high, p.z - sz * back);
      inRoom(want);
      const squeezed = back - Math.hypot(want.x - p.x, want.z - p.z);     // a small room pushed the camera in: look down more
      if (squeezed > 0) want.y += squeezed * 0.75;
      look.set(p.x + sx * 1.0, HEAD_Y * 0.55, p.z + sz * 1.0);
      const zoom = cam.push ? ease(Math.min(1, (cam.push.t += dt) / cam.push.dur)) * 0.62
        : cam.pull ? (1 - ease(Math.min(1, (cam.pull.t += dt) / cam.pull.dur))) * 0.55 : 0;
      if (cam.pull && cam.pull.t >= cam.pull.dur) cam.pull = null;
      if (zoom) want.lerp(rayTo.set(p.x + sx * 0.25, HEAD_Y * 0.85, p.z + sz * 0.25), zoom);
    }
    const k = cam.ready ? 1 - Math.exp(-dt * (cam.push ? 9 : 3.5)) : 1;
    cam.ready = true;
    cam.pos.lerp(want, k);
    cam.look.lerp(look, k);
    if (cam.pos.y < 0.3) cam.pos.y = 0.3;
    inRoom(cam.pos);
    camera.position.copy(cam.pos);
    camera.lookAt(cam.look);
    const faded = new Set();
    fadeHits(cam.pos, rayTo.set(p.x, HEAD_Y * 0.55, p.z), faded);         // the body and the head
    fadeHits(cam.pos, rayTo.set(p.x, HEAD_Y * 0.92, p.z), faded);
    if (other) { fadeHits(cam.pos, rayTo.set(other.pos.x, HEAD_Y * 0.55, other.pos.z), faded); fadeHits(cam.pos, rayTo.set(other.pos.x, HEAD_Y * 0.92, other.pos.z), faded); }
    fadedNow.forEach(h => { if (!faded.has(h)) setFaded(h, false); });
    faded.forEach(h => { if (!fadedNow.has(h)) setFaded(h, true); });
    fadedNow = faded;
  }
  // walls, shelves and lamps between the camera and the people turn see-through
  const rayTo = new T.Vector3(), fadeMats = new Map();
  let fadedNow = new Set(), occluderSet = new Set();
  function fadeHits(from, to, out) {
    rayDir.subVectors(to, from);
    const d = rayDir.length();
    if (d < 1e-3 || !occluders.length) return;
    rayDir.divideScalar(d);
    ray.set(from, rayDir);
    ray.far = d - 0.25;
    ray.intersectObjects(occluders, true).forEach(h => {
      let o = h.object;
      while (o && !occluderSet.has(o)) o = o.parent;
      if (o) out.add(o);
    });
  }
  function fadedOf(m) {
    let f = fadeMats.get(m);
    if (!f) { f = m.clone(); f.transparent = true; f.opacity = 0.22; f.depthWrite = false; fadeMats.set(m, f); }
    return f;
  }
  function setFaded(h, on) {
    h.traverse(o => {
      if (!o.isMesh) return;
      if (on && !o.userData.solidMat) { o.userData.solidMat = o.material; o.material = Array.isArray(o.material) ? o.material.map(fadedOf) : fadedOf(o.material); }
      else if (!on && o.userData.solidMat) { o.material = o.userData.solidMat; delete o.userData.solidMat; }
    });
  }

  // ---------------------------------------------------------------- what you can do here (the action buttons)
  let actions = [], actSig = '', actTimer = 0;
  const busItem = (i) => i.kind === 'fare' && /bus/.test(i.id) && !/shuttle|airport/.test(i.id);
  function itemsAt(pid) {
    return rows('items').filter(i => i.place === pid && /^(grocery|meal|drink|gear)$/.test(i.kind));
  }
  const faresAt = (pid) => rows('items').filter(i => i.place === pid && i.kind === 'fare' && !busItem(i));
  function isBusStop(pid) { return pid === 'bus_stop' || rows('items').some(i => i.place === pid && busItem(i)); }
  function placeActions(pid) {
    const out = [], kind = placeKind(pid), pl = place(pid);
    if (kind === 'sleep') out.push({ key: 'sleep:' + pid, label: tr('Sleep', '잠자기'), run: () => trySleep(pid) });
    if (kind === 'eat' && atHome() && RECIPES.length) out.push({ key: 'cook:' + pid, label: tr('Cook a meal', '요리하기'), run: () => openPanel('cook') });
    if (kind === 'eat') out.push({ key: 'eat:' + pid, label: tr('Eat something', '뭔가 먹기'), run: () => openPanel('inventory') });
    const shut = G && (closedNow(pid) ? pid : closedNow(zoneOfPlace(pid)) ? zoneOfPlace(pid) : null);
    if (itemsAt(pid).length && shut) out.push({ key: 'shut:' + pid, label: shutAllDay(shut) ? tr('Closed today', '오늘 휴무') : tr(`Closed · open ${hoursText(shut)}`, `영업 종료 · ${hoursText(shut)}`), run: () => toast(`${pl.name} is closed. Hours: ${hoursText(shut)}`, `${loc(pl)} 영업 종료. 영업시간 ${hoursText(shut)}`, 'bad') });
    else if (itemsAt(pid).length) out.push({ key: 'shop:' + pid, label: shopLabel(pid, pl), run: () => openPanel('shop', pid) });
    if (isBusStop(pid) && zoneId === 'city') {
      const bb = G ? busAt(G.minute) : null, nb = G ? bb && bb.board : 0, bn = bb && busEvery() ? busNext(bb, G.minute) : null;
      if (nb == null) out.push({ key: 'bus:' + pid, label: tr('No more buses tonight', '오늘 버스 끊김'), run: () => toast(`The last bus left at ${clock(hm(CFG.bus_last, 1350))}. You'll have to walk.`, `막차가 ${clockKo(hm(CFG.bus_last, 1350))}에 떠났어요. 걸어가야 해요.`, 'bad', 4) });
      else out.push({ key: 'bus:' + pid, label: tr(`Take the bus · ${bn ? bn[0] + ' · ' : ''}${usd2(busFare())}`, `버스 타기 · ${bn ? bn[1] + ' · ' : ''}${usd2(busFare())}`), run: () => openPanel('bus', pid) });
    }
    if ((kind === 'work' || pid === hero().desk) && !fired()) out.push({ key: 'work:' + pid, label: tr('Work for an hour', '한 시간 일하기'), run: () => workHour() });
    if (G) hybridActions(pid).forEach(a => out.push(a));          // hybrid work: the desk at home on a remote day (log in, work, log off)
    if (MAIL.length && G && zoneId === 'city' && pid === hero().home_door) { const n = newMail().length; out.push({ key: 'mail:' + pid + n, label: tr('Check the mailbox', '우편함 보기') + (n ? ` (${n})` : ''), run: () => openPanel('mailbox') }); }
    if (TV.length && G && kind === 'tv' && atHome()) out.push({ key: 'tv:' + pid, label: tr('Watch TV', 'TV 보기'), run: () => sitForTv(pid) });
    if (RADIO.length && G && kind === 'desk' && atHome()) out.push({ key: 'radio:' + pid, label: tr(`Turn on the radio (${STATION})`, `라디오 켜기 (${STATION})`), run: () => openPanel('radio') });
    if (G && zoneId === hero().home_zone && kind === 'door' && ITEMS.detergent) out.push({ key: 'laundry:' + pid + cleanClothes(), label: laundryLabel(), run: () => doLaundry() });
    if (window.SO_JOG && G && zoneId === hero().home_zone && kind === 'door') out.push({ key: 'jog:' + pid, label: tr('Go for a jog', '조깅하기'), run: () => startJog(true) });
    if (kind === 'seat') out.push({ key: 'sit:' + pid, label: tr('Sit down', '앉기'), run: () => { player.sit = true; play(player, 'sit'); } });
    lunchActions(pid).forEach(x => out.push(x));          // lunch with coworkers (the office kitchen, the diner booth)
    careActions(pid).forEach(a => out.push(a));          // a flu shot at the pharmacy
    return out;
  }
  function shopLabel(pid, pl) {
    const its = itemsAt(pid);
    if (its.every(i => i.kind === 'fare')) return tr('Pay: ' + its[0].name, '내기: ' + loc(its[0]));
    if (its.length === 1) return tr('Buy: ' + its[0].name, '사기: ' + loc(its[0]));
    if (/coffee|cafe/.test(pid)) return tr('Order a drink', '음료 주문');
    if (/diner|restaurant|kitchen/.test(pid)) return tr('Order food', '음식 주문');
    if (/market|shelves/.test(pid)) return tr('Shop for groceries', '장보기');
    return tr('Buy at ' + pl.name, loc(pl) + '에서 사기');
  }
  function computeActions() {
    if (state !== 'play' || busy || !player || !Z) return [];
    const list = [];
    const open = openEpisodes();
    Object.values(npcActors).forEach(a => {
      const d = Math.hypot(a.pos.x - player.pos.x, a.pos.z - player.pos.z);
      if (d > TALK_R || a.leaving) return;
      const ep = open.find(e => e.npc === a.id && !isPhone(e));
      if (ep) list.push({ d: d - 1, key: 'ep:' + ep.id, label: tr(`Talk to ${a.name.split(' ')[0]}: ${ep.title}`, `${firstName(npcRow(a.id))}에게 말 걸기: ${loc(ep, 'title')}`) + (+ep.reward < 0 ? ` (${usd2(-ep.reward)})` : ''), run: () => beginEpisode(ep, a) });
      else list.push({ d: d + 0.3, key: 'chat:' + a.id, label: tr(`Chat with ${a.name.split(' ')[0]}`, `${josa(firstName(npcRow(a.id)), '과', '와')} 잡담`), run: () => chatter(a) });
    });
    Object.keys(Z.places).forEach(pid => {
      const pl = Z.places[pid];
      if (!pl || !pl.at) return;
      const d = Math.hypot(pl.at[0] - player.pos.x, pl.at[1] - player.pos.z);
      if (d > PLACE_R) return;
      open.filter(e => isPhone(e) && e.place === pid).forEach(ep => list.push({ d: d - 1, key: 'ep:' + ep.id, run: () => { if (joinCall(ep)) beginEpisode(ep, null); },
        label: ep.remote ? tr(`Join the video call: ${ep.title}`, `화상 회의 참여: ${loc(ep, 'title')}`) : tr(`Phone ${npcRow(ep.npc).name.split(' ')[0]}: ${ep.title}`, `${firstName(npcRow(ep.npc))}에게 전화: ${loc(ep, 'title')}`) }));
      placeActions(pid).forEach((a, i) => list.push(Object.assign({ d: d + 0.1 + i * 0.01 }, a)));
    });
    list.sort((a, b) => a.d - b.d);
    return list.slice(0, 3);
  }
  function renderActions() {
    const sig = actions.map(a => a.key + a.label).join('|');
    if (sig === actSig) return;
    actSig = sig;
    const box = $('acts');
    box.innerHTML = '';
    actions.forEach((a, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      if (i) b.className = 'alt';
      b.innerHTML = esc(a.label) + (i ? '' : ' <kbd>E</kbd>');
      b.addEventListener('click', () => { if (state === 'play') a.run(); });
      box.appendChild(b);
    });
  }
  function chatter(a) {
    a.chatAt = elapsed;
    if (friendChat(a)) return;          // a coworker: closer, and a Friend may have a coffee or an umbrella for you
    const c = remark(a);
    say(a, personal(c.line), c.line_ko && personalKo(c.line_ko), 3.5);
    speak(personal(c.line), voiceOf(a.row));
    play(a, 'interact-right', { once: true });
  }
  const busFare = () => { const f = rows('items').find(i => busItem(i) && !/pass/.test(i.id)); return f ? +f.price : +CFG.bus_fare || 2.5; };
  const hasPass = () => G && G.pass === G.day;

  // ---------------------------------------------------------------- conversations: an episode's turns
  const dlg = $('dialog');
  let talk = null;          // { ep, turns, idx, actor, misses }
  const personal = (s) => s == null ? '' : String(s).replace(/\{name\}/g, G ? G.name : heroOf(DEFAULT_HERO).name);          // English: shown and spoken
  const personalKo = (s) => s == null ? '' : String(s).replace(/\{name\}/g, (G ? hero() : heroOf(DEFAULT_HERO)).name_ko || (G ? G.name : ''));
  const shown = (en, ko) => KO() && ko ? personalKo(ko) : personal(en);          // a line on the screen, in its language
  const myName = () => !G ? '' : KO() && hero().name_ko ? hero().name_ko : G.name;
  function speakerOf(id) {
    if (!id) return talk && talk.actor;
    if (id === 'player' || id === 'you') return player;
    return npcActors[id] || (talk && talk.ep.npc === id ? talk.actor : null);
  }
  const speakerName = (id) => !id ? (talk ? fullName(npcRow(talk.ep.npc)) : '') : (id === 'player' || id === 'you') ? myName() : fullName(npcRow(id));
  function beginEpisode(ep, actor) {
    if (+ep.reward < 0 && G.money + +ep.reward < 0) { toast(`You can't afford this (${usd2(-ep.reward)}).`, `돈이 부족해요 (${usd2(-ep.reward)}).`, 'bad'); return; }
    const turns = TURNS[ep.id] || [];
    actor = actor || npcActors[ep.npc] || null;
    talk = { ep, turns, idx: 0, actor, misses: 0, points: 0, best: 0 };
    state = 'talk';
    goalTarget = null;
    hideBubbles();
    if (actor && player) {
      player.want = Math.atan2(actor.pos.x - player.pos.x, actor.pos.z - player.pos.z);
      player.sit = false;
    }
    if (!turns.length) { completeEpisode(); return; }
    dlg.hidden = false;
    $('side').hidden = true;
    showTurn();
  }
  // A turn: the line, what you want to get across (the prompt), and four things you could say: the right one and three
  // that sound fine but miss (a wrong fact, the wrong tone for the person, or not what was asked). A wrong one gets a
  // reaction (turns.reactions) and you pick again; points go by how many tries it took (TURN_POINTS).
  const TURN_POINTS = [10, 5, 2, 0];
  const turnText = (t, k) => shown(t[k], t[k + '_ko']);
  const choiceText = (t, i) => i < 0 ? turnText(t, 'model') : shown((t.distractors || [])[i], (t.distractors_ko || [])[i]);
  function showTurn() {
    const t = talk.turns[talk.idx];
    talk.misses = 0;
    talk.wrong = [];
    talk.showing = 'line';
    talk.fb = null;
    talk.order = shuffle([-1].concat((t.distractors || []).slice(0, 3).map((_, i) => i)));
    dlg.classList.remove('answered');
    relangTurn();
    dlg.querySelector('.leave').hidden = false;
    dlg.querySelector('.next').hidden = true;
    const who = speakerOf(t.speaker);
    if (who && who !== player) { say(who, personal(t.line), t.line_ko && personalKo(t.line_ko), 4); play(who, 'interact-right', { once: true }); }
    speak(personal(t.line), voiceOf(npcRow(t.speaker || talk.ep.npc)));
  }
  // what the conversation window shows, in the language of the screen (again when the language changes)
  function relangTurn() {
    const t = talk.turns[talk.idx];
    if (!t) return;
    dlg.querySelector('.ep').textContent = (talk.ep.remote ? '📹 ' : '') + loc(talk.ep, 'title');          // a video call (hybrid work)
    dlg.querySelector('.step').textContent = `${talk.idx + 1} / ${talk.turns.length}`;
    dlg.querySelector('.situation').textContent = turnText(t, 'situation');
    const reply = talk.showing === 'reply', rs = t.reply_speaker || t.speaker;
    dlg.querySelector('.who').textContent = speakerName(reply ? rs : t.speaker) + ':';
    dlg.querySelector('.say').textContent = reply ? shown(t.reply_line, t.reply_ko) : turnText(t, 'line');
    dlg.querySelector('.prompt').textContent = turnText(t, 'prompt');
    renderChoices();
    if (talk.fb) feedback(talk.fb[0], talk.fb[1], talk.fb[2]); else feedback('', '');
    const next = dlg.querySelector('.next');
    next.textContent = talk.idx + 1 < talk.turns.length ? tr('Continue ▸', '계속 ▸') : tr('Finish ▸', '마치기 ▸');
  }
  function renderChoices() {
    const t = talk.turns[talk.idx], box = dlg.querySelector('.choices');
    box.innerHTML = '';
    talk.order.forEach(i => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = choiceText(t, i);
      if (talk.wrong.includes(i)) { b.classList.add('wrong'); b.disabled = true; }
      b.addEventListener('click', () => pick(i));
      box.appendChild(b);
    });
  }
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function feedback(kind, en, ko) {
    const f = dlg.querySelector('.feedback');
    f.className = 'feedback ' + kind;
    f.textContent = en ? tr(en, ko) : '';
    if (talk) talk.fb = en ? [kind, en, ko] : null;
  }
  // you said something that missed: you hear yourself, then how it went down
  function pick(i) {
    if (!talk || dlg.classList.contains('answered')) return;
    if (i < 0) { answered(); return; }
    const t = talk.turns[talk.idx];
    if (talk.wrong.includes(i)) return;
    talk.misses++;
    talk.wrong.push(i);
    renderChoices();
    const said = personal((t.distractors || [])[i]);
    say(player, said, personalKo((t.distractors_ko || [])[i] || ''), 3);
    speak(said, heroVoice());
    play(player, 'emote-no', { once: true });
    const re = personal((t.reactions || [])[i] || ''), reKo = personalKo((t.reactions_ko || [])[i] || '');
    const name = speakerName(t.speaker).split(' ')[0], nameEn = npcRow(t.speaker || talk.ep.npc).name.split(' ')[0];
    if (!re) { feedback('miss', "That didn't come out right. Try something else.", '말이 잘못 나갔어요. 다른 말을 골라 보세요.'); return; }
    feedback('miss', `${nameEn}: “${re}”`, `${name}: “${reKo || re}”`);
    const who = speakerOf(t.speaker);
    if (who && who !== player) { say(who, re, reKo, 3.6); play(who, 'emote-no', { once: true }); }
    speak(re, voiceOf(npcRow(t.speaker || talk.ep.npc)), true);
  }
  dlg.querySelector('.leave').addEventListener('click', () => { endTalk(); toast('You can pick up the conversation later.', '나중에 다시 이야기할 수 있어요.', null, 2.4); });
  function endTalk() {
    dlg.hidden = true;
    $('side').hidden = false;
    talk = null;
    if (state === 'talk') state = 'play';
    hideBubbles();
    goalTimer = 0;
  }
  let replyTimer = null;
  function answered() {
    const t = talk.turns[talk.idx], mine = talk, text = personal(t.model);
    const pts = TURN_POINTS[Math.min(talk.misses, TURN_POINTS.length - 1)];
    talk.points += pts;
    talk.best += TURN_POINTS[0];
    addScore(pts, `${talk.ep.title} (${talk.idx + 1})`, `${talk.ep.title_ko || talk.ep.title} (${talk.idx + 1})`);
    dlg.classList.add('answered');
    dlg.querySelector('.leave').hidden = true;
    say(player, text, t.model_ko && personalKo(t.model_ko), 3.4);
    speak(text, heroVoice());          // you say it aloud, in your own voice; the reply waits for you to finish
    play(player, 'emote-yes', { once: true });
    feedback('ok', `✓ ${text}  +${pts}`, `✓ ${turnText(t, 'model')}  +${pts}`);
    clearTimeout(replyTimer);
    replyTimer = setTimeout(() => {
      if (talk !== mine) return;
      if (t.reply_line) {
        const rs = t.reply_speaker || t.speaker;
        talk.showing = 'reply';
        relangTurn();
        const who = speakerOf(rs);
        if (who && who !== player) { say(who, personal(t.reply_line), t.reply_ko && personalKo(t.reply_ko), 4.5); play(who, 'interact-left', { once: true }); }
        speak(personal(t.reply_line), voiceOf(npcRow(rs || talk.ep.npc)), true);
      }
      showNext();
    }, fastMode ? 250 : 1300);
  }
  function showNext() {
    const next = dlg.querySelector('.next');
    next.textContent = talk && talk.idx + 1 < talk.turns.length ? tr('Continue ▸', '계속 ▸') : tr('Finish ▸', '마치기 ▸');
    next.hidden = false;
    next.focus();
  }
  dlg.querySelector('.next').addEventListener('click', () => {
    if (!talk) return;
    talk.idx++;
    if (talk.idx < talk.turns.length) showTurn(); else completeEpisode();
  });
  function completeEpisode() {
    const ep = talk.ep, got = talk.points, best = talk.best;
    dlg.hidden = true;
    $('side').hidden = false;
    talk = null;
    G.done[ep.id] = true;
    const rt = ROUTINE_OF[ep.id] && routinesOn(G.day).find(x => x.ep.id === ep.id);
    if (rt) (G.rdone = G.rdone || {})[rt.key] = 1;          // a meeting is done for today only
    (G.epScore = G.epScore || {})[ep.id] = [got, best];
    friendsAfterTalk(ep, got, best);          // closer to the people in it
    if (/(^|,)\s*sick\s*(,|$)/.test(ep.tags || '')) takeSick(nextWorkday(G.day + 1), true);          // a sick day: the next working day (you told your manager)
    if (+ep.reward) pay(+ep.reward, ep.title, +ep.reward > 0 ? 'income' : 'spend', { ko: ep.title_ko });
    if (ep.energy) G.energy = clamp(G.energy + +ep.energy, 0, E_MAX);
    rows('phrases').filter(p => p.episode === ep.id && !G.phrases.includes(p.id)).forEach(p => G.phrases.push(p.id));
    logEvent('episode', ep.title, 0, { id: ep.id, ko: ep.title_ko });
    saveGame();
    npcSig = '';
    const body = [];
    if (ep.summary) body.push(`<p>${esc(shown(ep.summary, ep.summary_ko))}</p>`);
    if (best) body.push(`<p class="score-line">★ <b>+${got}</b> ${tr(`of ${best} points${got === best ? ': you got every turn right the first time.' : '.'}`, `/ ${best}점${got === best ? ': 모든 말을 한 번에 맞게 했어요.' : '.'}`)} ${tr('Score', '점수')} <b>${score()}</b></p>`);
    if (+ep.reward > 0) body.push(tr(`<p><b>${usd2(+ep.reward)}</b> added to your account.</p>`, `<p>계좌에 <b>${usd2(+ep.reward)}</b>가 들어왔어요.</p>`));
    if (+ep.reward < 0) body.push(tr(`<p>You paid <b>${usd2(-ep.reward)}</b>. Balance: ${usd2(G.money)}.</p>`, `<p><b>${usd2(-ep.reward)}</b>를 냈어요. 잔액: ${usd2(G.money)}.</p>`));
    careDone(ep).forEach(l => body.push(l));          // the pharmacy and the clinic: the copay, the medicine, the note
    if (!G.mission && G.day <= MISSION_DAYS) { const [got, all] = missionCount(); if (all) body.push(`<p class="score-line">${tr('Missions', '미션')} <b>${got} / ${all}</b>${got === all ? tr(' · all done!', ' · 모두 완료!') : ''}</p>`); }
    showCard({ kicker: tr('Conversation complete', '대화 끝'), title: loc(ep, 'title'), body: body.join(''), ok: tr('Continue', '계속'), state: 'card' }, () => { goalTimer = 0; if (/(^|,)\s*review\s*(,|$)/.test(ep.tags || '')) showReview(holdReview(false)); else checkMissions(); });
  }

  // ---------------------------------------------------------------- panels: shop, bus, inventory, conversations, calendar
  const panel = $('panel');
  let panelKind = null, panelArg = null, panelBack = 'play';
  function openPanel(kind, arg) {
    toggleMenu(false);
    if (!G) return;
    if (state === 'talk' || state === 'sleep' || state === 'title') return;
    if (panelKind === 'tv' && kind !== 'tv' && !panel.hidden) tvOff();          // the phone or the map over the TV turns it off
    panelKind = kind; panelArg = arg;
    if (state !== 'shop' && state !== 'card') panelBack = state;
    state = kind === 'shop' || kind === 'bus' ? 'shop' : 'card';
    panel.hidden = false;
    panel.querySelector('.panel-note').textContent = '';
    panel.querySelector('.panel-note').className = 'panel-note';
    renderPanel();
  }
  function closePanel() {
    const wasTv = panelKind === 'tv';
    panel.hidden = true;
    panelKind = null;
    if (state === 'shop' || state === 'card') state = panelBack === 'talk' ? 'play' : (panelBack || 'play');
    goalTimer = 0;
    if (wasTv) tvOff();
  }
  panel.querySelector('.close').addEventListener('click', closePanel);
  function note(text, bad) { const n = panel.querySelector('.panel-note'); n.textContent = text; n.className = 'panel-note' + (bad ? ' bad' : ''); }
  function renderPanel() {
    const h = panel.querySelector('h2'), sub = panel.querySelector('.sub'), body = panel.querySelector('.panel-body');
    sub.textContent = tr('Balance ', '잔액 ') + usd2(G.money);
    panel.classList.toggle('wide', panelKind === 'tv');
    if (panelKind === 'shop') {
      h.textContent = loc(place(panelArg));
      body.innerHTML = itemsAt(panelArg).map(i => {
        const facts = KO() ? [i.energy ? `에너지 +${i.energy}` : '', /meal|drink/.test(i.kind) ? '바로 먹음' : i.kind === 'fare' ? '' : '가방에 넣음', i.kind === 'gear' && G.inventory[i.id] ? '이미 있음' : '',
          usesOf(i) > 1 ? `${usesOf(i)}${i.kind === 'gear' ? '회' : '회분'}` : '', +i.shelf_days > 0 ? `${+i.shelf_days}일 보관` : '', +i.cook_only ? '익혀 먹어야 함' : '', i.note_ko || i.note || '']
          : [i.energy ? `energy +${i.energy}` : '', /meal|drink/.test(i.kind) ? 'eat now' : i.kind === 'fare' ? '' : 'to your bag', i.kind === 'gear' && G.inventory[i.id] ? 'you have one' : '',
            usesOf(i) > 1 ? `${usesOf(i)} ${i.kind === 'gear' ? 'uses' : 'portions'}` : '', +i.shelf_days > 0 ? `keeps ${+i.shelf_days} days` : '', +i.cook_only ? 'needs cooking' : '', i.note || ''];
        return `<div class="row"><button type="button" class="play" data-say="${esc(i.name)}" aria-label="Say it">▶</button>
        <div class="main"><div class="t">${esc(loc(i))}</div><div class="s">${esc(facts.filter(Boolean).join(' · '))}</div></div>
        <span class="price">${onTheHouse(i) ? `<s>${usd2(+i.price)}</s> ${tr('Free', '무료')}` : +i.price ? usd2(+i.price) : tr('Free', '무료')}</span><button type="button" data-buy="${esc(i.id)}">${i.kind === 'fare' ? tr('Pay', '내기') : /meal|drink/.test(i.kind) && !+i.price ? tr('Take', '받기') : tr('Buy', '사기')}</button></div>`; }).join('') || `<p class="empty">${tr('Nothing for sale here.', '여기서 파는 게 없어요.')}</p>`;
      const list = itemsAt(panelArg);
      let top = '';
      if (tipAsked(panelArg)) top += `<div class="row tips"><div class="main"><div class="t">${tr('Add a tip?', '팁을 줄까요?')}</div><div class="s">${tableService(panelArg) ? tr('15 to 20% is usual when you are served at a table', '자리에서 서빙을 받으면 보통 15~20%') : tr('Up to you at a counter', '카운터에서는 선택')}</div></div>
        <div class="mode" role="group" aria-label="Tip">${TIPS.map(t => `<button type="button" data-tip="${t}" aria-pressed="${Math.abs(tipRate(panelArg) * 100 - t) < 0.01}">${t ? t + '%' : tr('No tip', '팁 없음')}</button>`).join('')}</div></div>`;
      top += cardShopRow();          // debit or credit card
      if (list.some(punchable)) { const n = punches(panelArg);
        top += `<div class="row punch"><div class="main"><div class="t">${tr('Punch card', '스탬프 카드')} <span class="dots">${'●'.repeat(Math.min(n, PUNCH_N - 1))}${'○'.repeat(Math.max(0, PUNCH_N - 1 - n))}</span></div><div class="s">${n >= PUNCH_N - 1 ? tr('Your next drink is on the house!', '다음 음료는 무료예요!') : tr(`Buy ${PUNCH_N - 1} drinks, get the next one free`, `음료 ${PUNCH_N - 1}잔을 사면 다음 한 잔은 무료`)}</div></div></div>`; }
      if (TAX && list.some(taxed)) top += `<p class="fine">${tr(`Prices do not include ${pct(TAX)} sales tax.${list.some(i => !taxed(i)) ? ' Groceries are not taxed.' : ''}`, `표시 가격에는 판매세 ${pct(TAX)}가 빠져 있어요.${list.some(i => !taxed(i)) ? ' 식료품은 면세예요.' : ''}`)}</p>`;
      else if (list.length && list.every(i => i.kind === 'grocery')) top += `<p class="fine">${tr(`No sales tax on groceries in ${esc(CFG.city)}.`, `${esc(CFG.city)}에서는 식료품에 판매세가 없어요.`)}</p>`;
      body.innerHTML = top + body.innerHTML;
    } else if (panelKind === 'bus') {
      h.textContent = tr('Bus', '버스');
      const here = panelArg;
      const stops = Object.keys(Z.places).filter(pid => pid !== here && (DOORS['city:' + pid] || portalsOf(Z).some(p => Math.hypot(p.at[0] - Z.places[pid].at[0], p.at[1] - Z.places[pid].at[1]) < 3)));
      const pass = rows('items').find(i => busItem(i) && /pass/.test(i.id));
      const bb = busAt(G.minute), nb = bb && bb.board, bs = bb && busStatus(bb, G.minute), every = busEvery(), off = isWeekend(G.day) || dayOff(G.day);
      const times = every ? `<p class="fine">${tr(`${nb == null ? `No more buses tonight: the last one left at ${clock(hm(CFG.bus_last, 1350))}.` : bs[0]}
        Every ${every} minutes ${off ? (dayOff(G.day) ? 'today (holiday timetable)' : 'on weekends') : 'on weekdays'}, ${clock(hm(CFG.bus_first, 360))} – ${clock(hm(CFG.bus_last, 1350))}.`,
        `${nb == null ? `오늘 버스는 끊겼어요. 막차는 ${clockKo(hm(CFG.bus_last, 1350))}에 떠났어요.` : bs[1]}
        ${off ? (dayOff(G.day) ? '오늘은 공휴일 시간표로' : '주말에는') : '평일에는'} ${every}분마다, ${clockKo(hm(CFG.bus_first, 360))}~${clockKo(hm(CFG.bus_last, 1350))}.`)}</p>` : '';
      body.innerHTML = times + stops.map(pid => `<div class="row"><div class="main"><div class="t">${esc(loc(place(pid)))}</div><div class="s">${tr('about 15 minutes', '약 15분')}</div></div>
        <span class="price">${hasPass() ? tr('Pass', '정기권') : usd2(busFare())}</span><button type="button" data-ride="${esc(pid)}" ${nb == null ? 'disabled' : ''}>${tr('Ride', '타기')}</button></div>`).join('') || `<p class="empty">${tr('No stops on this line.', '이 노선에는 정류장이 없어요.')}</p>`;
      if (pass && !hasPass()) body.innerHTML += `<div class="row"><div class="main"><div class="t">${esc(loc(pass))}</div><div class="s">${esc(tr(pass.note || '', pass.note_ko))}</div></div>
        <span class="price">${usd2(+pass.price)}</span><button type="button" data-pass="${esc(pass.id)}">${tr('Buy', '사기')}</button></div>`;
    } else if (panelKind === 'inventory') {
      h.textContent = tr('Inventory', '가방');
      const canEat = zoneId === hero().home_zone || zoneId === 'hotel';
      const all = lots().map((l, n) => ({ l, n })).filter(x => x.l.left > 0).sort((a, b) => (gone(b.l) - gone(a.l)) || ((bestBy(a.l) || 999) - (bestBy(b.l) || 999)) || String(a.l.id).localeCompare(b.l.id));
      sub.textContent = tr(`${all.length} item${all.length === 1 ? '' : 's'}`, `${all.length}개`);
      const closet = ITEMS.detergent ? `<p class="fine">${tr(`👕 Clean clothes: <b>${cleanClothes()} of ${CLOSET}</b> outfits${G.dirtyDay === G.day ? " (you're wearing yesterday's)" : ''}. Do laundry at the door of your home.`, `👕 깨끗한 옷: <b>${CLOSET}벌 중 ${cleanClothes()}벌</b>${G.dirtyDay === G.day ? ' (어제 옷을 입고 있어요)' : ''}. 빨래는 집 현관에서 합니다.`)}</p>` : '';
      const head = closet + (RECIPES.length && all.length ? `<p class="fine">${atHome() ? `<button type="button" data-cook-open="1">${tr('Cook a meal', '요리하기')}</button> ` : ''}${tr('Groceries keep for a while, then go bad. Some need cooking: use the kitchen at home.', '식료품은 기한이 지나면 상합니다. 익혀야 먹는 것은 집 부엌에서 요리하세요.')}</p>` : '');
      body.innerHTML = head + all.map(({ l, n }) => {
        const i = ITEMS[l.id] || { id: l.id, name: pretty(l.id), energy: 0 }, by = bestBy(l), bad = gone(l), u = usesOf(i);
        const when = by == null ? '' : bad ? tr(`went bad after ${dateShort(by).replace(/^\w+, /, '')}`, `${dMonth(by)} 지나 상함`) : by === G.day ? tr('best by today', '오늘까지') : by === G.day + 1 ? tr('best by tomorrow', '내일까지') : tr(`best by ${dateShort(by)}`, `${dShort(by)}까지`);
        const btn = bad ? `<button type="button" class="danger" data-toss="${n}">${tr('Throw out', '버리기')}</button>`
          : +i.cook_only ? `<span class="price">${tr('Needs cooking', '익혀야 함')}</span>`
            : i.energy ? `<button type="button" data-eat="${n}" ${canEat ? '' : 'disabled'}>${canEat ? tr('Eat', '먹기') : tr('Eat at home', '집에서 먹기')}</button>` : '';
        const facts = [u > 1 ? tr(`${l.left} of ${u} ${i.kind === 'gear' ? 'uses' : 'portions'} left`, `${u}${i.kind === 'gear' ? '회' : '회분'} 중 ${l.left} 남음`) : '', i.energy && !bad && !+i.cook_only ? tr(`energy +${i.energy}`, `에너지 +${i.energy}`) : ''].filter(Boolean);
        return `<div class="row${bad ? ' bad' : by != null && by <= G.day + 1 ? ' soon' : ''}"><div class="main"><div class="t">${esc(loc(i))}</div>
          <div class="s">${esc(facts.join(' · '))}${when ? `${facts.length ? ' · ' : ''}<span class="by">${esc(when)}</span>` : ''}</div></div>${btn}</div>`; }).join('')
        || `<p class="empty">${tr('Your bag is empty. Groceries you buy at the market go here.', '가방이 비었어요. 마켓에서 산 식료품이 여기 들어와요.')}</p>`;
    } else if (panelKind === 'cook') {
      h.textContent = tr('Cook a meal', '요리하기');
      const able = RECIPES.filter(canCook);
      sub.textContent = tr(`${able.length} of ${RECIPES.length} recipes`, `요리 ${RECIPES.length}가지 중 ${able.length}가지 가능`);
      body.innerHTML = `<p class="fine">${tr('A recipe takes one portion of each ingredient, the oldest first. Buy what is missing at Fairview Market.', '재료마다 1회분씩, 오래된 것부터 씁니다. 없는 재료는 페어뷰 마켓에서 사세요.')}</p>`
        + RECIPES.slice().sort((a, b) => canCook(b) - canCook(a)).map(r => {
          const ok = canCook(r), steps = String(r.steps || '').split(' | ').filter(Boolean), ko = String(r.steps_ko || '').split(' | ');
          return `<div class="row recipe${ok ? '' : ' lack'}"><button type="button" class="play" data-say="${esc(r.name + '. ' + steps.join(' '))}" aria-label="Play">▶</button>
            <div class="main"><div class="t">${esc(loc(r))}</div><div class="s">${tr(`${r.minutes} min · energy +${r.energy}`, `${r.minutes}분 · 에너지 +${r.energy}`)}${r.tool && !KO() ? ' · ' + esc(r.tool) : ''}</div>
            <div class="s need">${needs(r).map(id => `<span class="${portions(id) ? 'have' : 'miss'}">${portions(id) ? '✓' : '✗'} ${esc(itemName(id))}</span>`).join(' ')}</div>
            ${steps.length ? `<details><summary>${tr('How to make it', '만드는 법')}</summary><ol>${steps.map((t, k) => `<li>${esc(tr(t, ko[k]))}</li>`).join('')}</ol></details>` : ''}</div>
            <button type="button" data-cook="${esc(r.id)}" ${ok && atHome() ? '' : 'disabled'}>${!atHome() ? tr('At home', '집에서') : ok ? tr('Cook', '요리') : tr('Missing', '재료 부족')}</button></div>`; }).join('');
    } else if (panelKind === 'calendar') {
      h.textContent = tr('Calendar', '달력');
      const up = Object.keys(HOLIDAYS).sort().map(k => [Math.round((Date.parse(k) - START) / 864e5) + 1, HOLIDAYS[k]]).filter(x => START != null && x[0] > Math.floor((G.day - 1) / 7) * 7 + 7).slice(0, 3);
      sub.textContent = tr(`Week ${Math.floor((G.day - 1) / 7) + 1}`, `${Math.floor((G.day - 1) / 7) + 1}주차`);
      const d0 = Math.floor((G.day - 1) / 7) * 7 + 1;
      let html = '';
      for (let d = d0; d < d0 + 7; d++) {
        const evs = calendar().filter(c => c.day === d && !(fired() && d >= G.work.fired && firedOut(c.place))).sort((a, b) => hm(a.time, 0) - hm(b.time, 0));
        const extra = [];
        if (isPayday(d) && !fired()) extra.push(tr(`Payday: ${usd(netPay(d))} direct deposit`, `월급날: ${usd(netPay(d))} 계좌 입금`));
        if (isRentDay(d)) extra.push(tr(`${hero().housing_name || 'Rent'} due: ${usd(+hero().housing)}`, `${hero().housing_name_ko || '월세'} 납부: ${usd(+hero().housing)}`));
        billsDue(d).forEach(b => extra.push(tr(`Autopay: ${b.name} ${usd2(+b.amount)}`, `자동이체: ${loc(b)} ${usd2(+b.amount)}`)));
        cardCalendar(d).forEach(x => extra.push(x));
        const hol = holidayOf(d);
        if (hol) extra.unshift(tr(`${hol.name}${hol.kind === 'federal' ? ' (federal holiday: banks and post offices closed)' : ''}`, `${loc(hol)}${hol.kind === 'federal' ? ' (연방 공휴일: 은행·우체국 휴무)' : ''}`));
        if (companyOff(d) && !isWeekend(d)) extra.push(tr(`${CFG.company} closed (paid holiday)`, `${ZONE_NAMES.office[1] || CFG.company} 휴무 (유급 휴일)`));
        const lv = leaveOf(d), rq = G.leave && G.leave.req.find(r => r.day === d && r.status === 'pending');
        if (lv && !(G.work && G.work.record[d])) extra.push(lv === 'pto' ? tr('PTO (paid day off)', '연차 (유급 휴가)') : tr('Out sick', '병가'));
        if (rq) extra.push(tr('PTO requested: waiting for an answer', '연차 신청: 답을 기다리는 중'));
        const rec = G.work && G.work.record[d];
        if (rec) extra.push(`${tr('Work', '근무')}: ${tr(ATTEND[rec][0], ATTEND[rec][1])}`);
        if (rec && G.work.left && G.work.left[d] != null) extra.push(`${tr('Work', '근무')}: ${tr(ATTEND.early[0], ATTEND.early[1])} · ${clk(G.work.left[d])}`);
        const hx = hybridCal(d);          // hybrid work: a remote day
        if (hx) extra.push(hx);
        if (!evs.length && !extra.length && d !== G.day) continue;
        html += `<h3>${tr(`${dateLong(d)} · Day ${d}${d === G.day ? ' · today' : ''}`, `${dateKo(d)} · ${d}일째${d === G.day ? ' · 오늘' : ''}`)}</h3>`;
        html += extra.map(x => `<div class="row"><span class="when"></span><div class="main"><div class="t">${esc(x)}</div></div></div>`).join('');
        html += evs.map(c => { const done = c.rkey ? !!(G.rdone && G.rdone[c.rkey]) : c.episode && G.done[c.episode]; const past = d < G.day || (d === G.day && hm(c.time, 0) < G.minute - 60);
          return `<div class="row${done ? ' done' : ''}${past && !done ? ' past' : ''}"><span class="when">${esc(c.time)}</span><div class="main"><div class="t">${esc(loc(c, 'title'))}</div><div class="s">${c.place ? esc(loc(place(c.place))) : ''}</div></div></div>`; }).join('');
        if (!evs.length && !extra.length) html += `<p class="empty">${tr('Nothing scheduled.', '일정 없음.')}</p>`;
      }
      if (up.length) html += `<h3>${tr('Coming up', '다가오는 날')}</h3>` + up.map(x => `<div class="row"><span class="when">${esc(dMonth(x[0]))}</span><div class="main"><div class="t">${esc(loc(x[1]))}</div><div class="s">${esc(tr(x[1].note || '', x[1].note_ko))}</div></div></div>`).join('');
      body.innerHTML = html;
    } else if (panelKind === 'phone') {
      h.textContent = tr('Phone', '휴대전화');
      const list = inbox(), fresh = list.filter(m => m.fresh).length;
      sub.textContent = fresh ? tr(`${fresh} new`, `새 메시지 ${fresh}개`) : tr(`${list.length} messages`, `메시지 ${list.length}개`);
      const ICON = { text: '💬', email: '✉️', voicemail: '📞', alert: '🔔' };
      const sb = G && !fired() && (G.minute >= 17 * 60 || G.minute < hm(CFG.sick_call_by, 570)) ? sickButton() : '';
      body.innerHTML = (sb ? `<p class="fine leave-ask">${sb}</p>` : '') + benefitsLink(true) + list.map(m => `<div class="row msg${m.fresh ? ' new' : ''}"><button type="button" class="play" data-say="${esc((m.subject ? m.subject + '. ' : '') + m.body)}" data-voice="${NPCS[m.sender] ? esc(m.sender) : ''}" aria-label="Play">▶</button>
        <div class="main"><div class="s">${ICON[m.kind] || ''} ${esc(tr(MSG_KIND[m.kind] || 'Message', MSG_KIND_KO[m.kind] || '메시지'))} · ${esc(dShort(m.day))}, ${clk(m.minute)}</div><div class="t">${esc(senderName(m.sender))}${m.subject ? ` <span class="subj">${esc(tr(m.subject, m.subject_ko))}</span>` : ''}</div>
        <div class="b">${esc(shown(m.body, m.body_ko))}</div>${replyBox(m)}</div></div>`).join('')
        || `<p class="empty">${tr('No messages yet. Texts, emails and alerts from your bank arrive here.', '아직 메시지가 없어요. 문자, 이메일, 은행 알림이 여기로 와요.')}</p>`;
      readAll();
    } else if (panelKind === 'tv') {
      tvPanel(h, sub, body);
    } else if (panelKind === 'radio') {
      h.textContent = tr('Radio', '라디오');
      const show = radioShow();
      sub.textContent = `${STATION} · ${clk(G.minute)}`;
      body.innerHTML = `<p class="fine"><button type="button" data-say="${esc(show.map(x => x.en).join(' '))}">${tr('▶ Listen to it all', '▶ 전부 듣기')}</button> ${tr('Local radio: the weather in Fahrenheit, traffic, the news of the town.', '지역 라디오: 날씨, 교통, 동네 소식.')}</p>`
        + show.map(x => `<div class="row msg"><button type="button" class="play" data-say="${esc(x.en)}" aria-label="Play">▶</button><div class="main"><div class="s">📻 ${esc(tr(RADIO_KIND[x.kind] || pretty(x.kind), RADIO_KIND_KO[x.kind]))}</div>
        <div class="b">${esc(tr(x.en, x.ko))}</div></div></div>`).join('');
    } else if (panelKind === 'mailbox') {
      h.textContent = tr('Mailbox', '우편함');
      const got = G.mailGot = G.mailGot || {}, list = myMail().slice().reverse().slice(0, 40), fresh = list.filter(m => !got[m.id]).map(m => m.id);
      sub.textContent = fresh.length ? tr(`${fresh.length} new`, `새 우편 ${fresh.length}통`) : tr(`${list.length} kept`, `${list.length}통 보관`);
      body.innerHTML = (list.map(m => `<div class="row msg${fresh.includes(m.id) ? ' new' : ''}"><button type="button" class="play" data-say="${esc((m.subject ? m.subject + '. ' : '') + m.body)}" aria-label="Play">▶</button>
        <div class="main"><div class="s">${MAIL_ICON[m.kind] || ''} ${esc(tr(MAIL_KIND[m.kind] || 'Mail', MAIL_KIND_KO[m.kind] || '우편'))} · ${esc(dShort(m.day))}</div><div class="t">${esc(m.sender)}${m.subject ? ` <span class="subj">${esc(tr(m.subject, m.subject_ko))}</span>` : ''}</div>
        <div class="b">${esc(shown(m.body, m.body_ko))}</div></div></div>`).join('')
        || `<p class="empty">${tr(`The mailbox is empty. The mail comes after ${clock(mailTime())}, Monday to Saturday.`, `우편함이 비었어요. 우편은 월~토요일 ${clockKo(mailTime())} 이후에 와요.`)}</p>`)
        + (list.length && !fresh.length ? `<p class="fine">${mailDay(G.day) ? (G.minute < mailTime() ? tr(`Nothing new yet. Today's mail comes after ${clock(mailTime())}.`, `아직 새 우편이 없어요. 오늘 우편은 ${clockKo(mailTime())} 이후에 와요.`) : tr('Nothing new today.', '오늘은 새 우편이 없어요.')) : tr('No mail on Sundays and federal holidays.', '일요일과 연방 공휴일에는 우편이 오지 않아요.')}</p>` : '');
      fresh.forEach(id => { got[id] = 1; });
    } else if (panelKind === 'talks' || panelKind === 'phrasebook') {
      // the conversations you have had, newest first: what was said to you, what you answered and the reply, then the
      // expressions the conversation taught (what used to be the Phrasebook); every line can be heard again
      h.textContent = tr('Conversations', '지난 대화');
      const had = G.log.filter(l => l.type === 'episode' && l.id && EPISODES[l.id] && G.done[l.id]).slice().reverse();
      sub.textContent = tr(`${had.length} finished`, `${had.length}개 끝냄`);
      const sayBtn = (text, who) => `<button type="button" class="play" data-say="${esc(text)}" data-voice="${esc(who || '')}" aria-label="Play">▶</button>`;
      body.innerHTML = had.map((l, n) => {
        const ep = EPISODES[l.id], pts = (G.epScore || {})[l.id];
        const lines = (TURNS[l.id] || []).map(t => {
          const who = t.speaker || ep.npc, rs = t.reply_speaker || who;
          return `${t.situation ? `<p class="scene">${esc(turnText(t, 'situation'))}</p>` : ''}
            <div class="said">${sayBtn(personal(t.line), who)}<div><b>${esc(firstName(npcRow(who)))}</b> ${esc(turnText(t, 'line'))}</div></div>
            <div class="said me">${sayBtn(personal(t.model), G.hero)}<div><b>${esc(myName())}</b> ${esc(turnText(t, 'model'))}</div></div>
            ${t.reply_line ? `<div class="said">${sayBtn(personal(t.reply_line), rs)}<div><b>${esc(firstName(npcRow(rs)))}</b> ${esc(shown(t.reply_line, t.reply_ko))}</div></div>` : ''}`;
        }).join('');
        return `<details class="talk"${n ? '' : ' open'}><summary><span class="when">${dShort(l.day)} · ${clk(l.minute)}${pts ? ` · ★ ${pts[0]}/${pts[1]}` : ''}</span> <b>${esc(loc(ep, 'title'))}</b><span class="with"> ${tr(`with ${esc(npcRow(ep.npc).name)} · ${esc(place(ep.place).name)}`, `${esc(fullName(npcRow(ep.npc)))} · ${esc(loc(place(ep.place)))}`)}</span></summary>${lines}</details>`;
      }).join('') || `<p class="empty">${tr('Conversations you finish are kept here, so you can read and hear them again.', '끝낸 대화가 여기 남아요. 다시 읽고 들을 수 있어요.')}</p>`;
    } else if (panelKind === 'bank') {
      h.textContent = tr('Bank', '은행');
      sub.textContent = tr('Checking ···4821', '입출금 계좌 ···4821');
      const soon = [];
      for (let d = G.day + 1; d <= G.day + 14; d++) {
        const when = dShort(d);
        if (isPayday(d) && !fired()) soon.push([when, tr('Paycheck (direct deposit)', '급여 (계좌 입금)'), netPay(d)]);
        if (isRentDay(d)) soon.push([when, tr(hero().housing_name || 'Rent', hero().housing_name_ko || '월세'), -hero().housing]);
        billsDue(d).forEach(b => soon.push([when, tr(b.name + ' (autopay)', loc(b) + ' (자동이체)'), -b.amount]));
      }
      const KIND = { income: ['Deposit', '입금'], spend: ['Debit card', '체크카드'], bill: ['Autopay', '자동이체'], fee: ['Bank fee', '은행 수수료'] };
      const line = (when, text, amount, kind) => `<div class="row"><span class="when">${esc(when)}</span><div class="main"><div class="t">${esc(text)}</div>${kind ? `<div class="s">${esc(kind)}</div>` : ''}</div><span class="price ${amount < 0 ? 'out' : 'in'}">${amount < 0 ? '−' : '+'}${usd2(Math.abs(amount)).replace('−', '')}</span></div>`;
      const past = G.log.filter(l => l.amount).slice().reverse().slice(0, 60);
      body.innerHTML = `<div class="sum"><div><b>${usd2(G.money)}</b>${tr('available balance', '사용 가능 잔액')}</div></div>
        <h3>${tr('Coming up', '예정')}</h3>${soon.map(x => line(x[0], x[1], x[2])).join('') || `<p class="empty">${tr('Nothing in the next two weeks.', '앞으로 2주 동안 없음.')}</p>`}
        ${stubBox()}${creditPanel()}
        <h3>${tr('Recent transactions', '최근 거래')}</h3>${past.map(l => line(`${dMonth(l.day)} · ${clk(l.minute)}`, logText(l), l.amount,
          (/direct deposit/i.test(l.text) ? tr('Direct deposit', '계좌 입금') : KIND[l.type] ? tr(KIND[l.type][0], KIND[l.type][1]) : '') + (l.tax ? tr(` · tax ${usd2(l.tax)}`, ` · 세금 ${usd2(l.tax)}`) : '') + (l.tip ? tr(` · tip ${usd2(l.tip)}`, ` · 팁 ${usd2(l.tip)}`) : ''))).join('') || `<p class="empty">${tr('No transactions yet.', '아직 거래가 없어요.')}</p>`}`;
    } else if (panelKind === 'work') {
      // the score and the work record: how you stand with your manager, every working day so far, and the points
      const w = work(), st = standing();
      h.textContent = tr('Work record', '근무 기록');
      sub.textContent = `${CFG.company} · ${tr(hero().role, hero().role_ko)}`;
      const days = Object.keys(w.record).map(Number).sort((a, b) => b - a);
      const left = Math.max(0, +CFG.fire_points - w.pts);
      const say = fired() ? tr(`You were let go on ${dateLong(w.fired)}. Your badge no longer opens the office.`, `${dateKo(w.fired)}에 해고되었어요. 출입증으로 더는 사무실에 들어갈 수 없어요.`)
        : w.warned === 2 ? tr('Final warning from HR: one more late morning or missed day and you are out.', '인사팀의 최종 경고: 한 번만 더 지각하거나 결근하면 해고예요.')
          : w.warned === 1 ? tr(`Your manager has talked to you about your hours. Be in by ${clock(hm(CFG.work_start, 540))} and stay until at least ${clock(EARLY())}.`, `매니저가 근무 시간 얘기를 했어요. ${clockKo(hm(CFG.work_start, 540))}까지 출근해서 적어도 ${clockKo(EARLY())}까지 있으세요.`)
            : tr(`Be at the office by ${clock(hm(CFG.late_after, 555))} on working days and stay until at least ${clock(EARLY())}. Late mornings, early afternoons and missed days add up, and too many of them get you fired.`, `평일에는 ${clockKo(hm(CFG.late_after, 555))}까지 사무실에 와서 적어도 ${clockKo(EARLY())}까지 있으세요. 지각·조퇴·결근이 쌓이면 해고될 수 있어요.`);
      const pts = (G.points || []).slice().reverse().slice(0, 40);
      body.innerHTML = `<div class="sum"><div><b>★ ${score()}</b>${tr('score', '점수')}</div><div class="standing ${st[2]}"><b>${tr(st[0], st[1])}</b>${tr('standing', '평가')}</div><div><b>${fired() ? '—' : w.pts + ' / ' + CFG.fire_points}</b>${tr('strikes', '벌점')}</div></div>
        <p class="fine">${esc(say)}${!fired() && w.pts ? tr(` ${left} more strike${left === 1 ? '' : 's'} and you are let go (late ${CFG.late_points}, in after noon ${CFG.noon_points}, leaving before ${clock(EARLY())} ${CFG.early_points}, a missed day ${CFG.absent_points}; five on-time days in a row take one off).`, ` 벌점 ${left}점이 더 쌓이면 해고예요 (지각 ${CFG.late_points}, 오후 출근 ${CFG.noon_points}, ${clockKo(EARLY())} 전 퇴근 ${CFG.early_points}, 결근 ${CFG.absent_points}; 5일 연속 정시 출근하면 1점 감소).`) : ''}</p>
        ${(() => { const [got, all] = missionCount(); const m = G.mission;
          return `<h3>${tr('Missions', '미션')}</h3><p class="fine">${m && m.all ? tr(`🎉 All ${all} done${m.bonus ? `: bonus ${usd(m.bonus)}` : ''}. ${freePlay() ? 'Free play now.' : `Free play from ${dateLong(MISSION_DAYS + 1)}.`}`, `🎉 ${all}개 모두 완료${m.bonus ? `: 보너스 ${usd(m.bonus)}` : ''}. ${freePlay() ? '지금은 자유 플레이.' : `${dateKo(MISSION_DAYS + 1)}부터 자유 플레이.`}`)
            : freePlay() ? tr(`${got} of ${all} done. The missions are over: free play now.`, `${all}개 중 ${got}개 완료. 미션 기간이 끝나 지금은 자유 플레이.`)
              : tr(`<b>${got} of ${all}</b> done, until ${dateLong(MISSION_DAYS)}. Finish all of them for a ${usd(+CFG.mission_bonus || 0)} bonus and ${+CFG.mission_points || 0} points.`, `${dateKo(MISSION_DAYS)}까지 <b>${all}개 중 ${got}개</b> 완료. 모두 해내면 보너스 ${usd(+CFG.mission_bonus || 0)}와 ${+CFG.mission_points || 0}점.`)}</p>`; })()}
        ${(() => { const s = weekStats(G.day), log = (G.taskLog || []).slice().reverse().slice(0, 12), T = byId('tasks');
          const head = freePlay() && s.came ? tr(`This week: <b>${hrs(s.mins)}</b> of about ${hrs(s.want)} (${WORK_HOURS_DAY} h for each day you come in). Your manager looks at the week on its last working day.`, `이번 주: 약 ${hrs(s.want)} 중 <b>${hrs(s.mins)}</b>(출근한 날마다 ${WORK_HOURS_DAY}시간). 매니저가 그 주의 마지막 근무일에 한 주를 돌아봐요.`)
            : tr(`Today: <b>${hrs(workedOn(G.day))}</b>. Use “Work for an hour” at your desk.${freePlay() ? '' : ` After the missions your manager expects about ${WORK_HOURS_DAY} h a day.`}`, `오늘: <b>${hrs(workedOn(G.day))}</b>. 자리에서 “한 시간 일하기”를 하세요.${freePlay() ? '' : ` 미션이 끝나면 매니저는 하루 약 ${WORK_HOURS_DAY}시간을 기대해요.`}`);
          return `<h3>${tr('At your desk', '업무')}</h3><p class="fine">${head}</p>${log.map(x => { const t = T[x.id]; if (!t) return ''; const c = (t.choices || [])[x.pick] || {};
            return `<div class="row"><span class="when">${esc(dShort(x.day))}</span><div class="main"><div class="t">${esc((TASK_KIND[t.kind] || ['📌'])[0] + ' ' + shown(t.title, t.title_ko))}</div><div class="s">${esc(shown(c.t, c.t_ko))}</div></div><span class="price ${x.n < 0 ? 'out' : 'in'}">${x.n ? (x.n > 0 ? '+' : '−') + Math.abs(x.n) : ''}</span></div>`; }).join('')}`; })()}
        ${hybridPanel()}${fired() ? '' : leavePanel()}${benefitsLink()}
        ${friendsPanel()}${healthPanel()}
        <h3>${tr('Attendance', '출근 기록')}</h3>${days.map(d => `<div class="row att ${w.record[d]}"><span class="when">${esc(dShort(d))}</span><div class="main"><div class="t">${esc(tr(ATTEND[w.record[d]][0], ATTEND[w.record[d]][1]))}</div>${d === G.inDay && G.inAt != null ? `<div class="s">${clk(G.inAt)}</div>` : ''}${w.home && w.home[d] ? `<div class="s">${tr('From home', '재택')}</div>` : ''}${w.left && w.left[d] != null ? `<div class="s">${esc(tr(ATTEND.early[0], ATTEND.early[1]))} · ${clk(w.left[d])} · −${Math.abs(ATTEND.early[2])}</div>` : ''}</div><span class="price ${ATTEND[w.record[d]][2] < 0 ? 'out' : 'in'}">${ATTEND[w.record[d]][2] ? (ATTEND[w.record[d]][2] > 0 ? '+' : '−') + Math.abs(ATTEND[w.record[d]][2]) : ''}</span></div>`).join('') || `<p class="empty">${tr('No working days yet.', '아직 근무일이 없어요.')}</p>`}
        <h3>${tr('Points', '점수 내역')}</h3>${pts.map(x => `<div class="row"><span class="when">${esc(dMonth(x.day))} · ${clk(x.minute)}</span><div class="main"><div class="t">${esc(tr(x.en, x.ko))}</div></div><span class="price ${x.n < 0 ? 'out' : 'in'}">${x.n > 0 ? '+' : '−'}${Math.abs(x.n)}</span></div>`).join('') || `<p class="empty">${tr('Points come from what you say in conversations and from showing up on time.', '점수는 대화에서 고른 말과 제시간 출근으로 쌓여요.')}</p>`}`;
    } else if (panelKind === 'map') {
      renderMapPanel(h, sub, body);
    } else if (panelKind === 'benefits') benefitsPanel(h, sub, body);          // the HR portal
    panel.classList.toggle('map', panelKind === 'map');
  }
  panel.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.say) speak(b.dataset.say, b.dataset.voice ? voiceOf(NPCS[b.dataset.voice] || npcRow(b.dataset.voice)) : undefined);
    if (b.dataset.reply && panelKind === 'phone') { const [mid, rid] = b.dataset.reply.split('|'); const y = panel.querySelector('.panel-body').scrollTop; if (replyTo(mid, rid)) { renderPanel(); panel.querySelector('.panel-body').scrollTop = y; } }
    if (b.dataset.buy) buy(b.dataset.buy);
    if (b.dataset.tip != null && panelKind === 'shop') { tipChoice[panelArg] = +b.dataset.tip; renderPanel(); }
    if (b.dataset.eat) eat(b.dataset.eat);
    if (b.dataset.toss) toss(+b.dataset.toss);
    if (b.dataset.tv && panelKind === 'tv') { const [id, live] = b.dataset.tv.split('|'); if (tvOn(id, live === '1')) renderPanel(); }
    if (b.dataset.cook) cook(b.dataset.cook);
    if (b.dataset.credit) creditClick(b);
    if (b.dataset.leave) {
      const [what, d] = b.dataset.leave.split(':'), y = panel.querySelector('.panel-body').scrollTop;
      const ok = what === 'sick' ? !!callInSick() : what === 'pto' ? requestPto(+(panel.querySelector('#pto-day') || {}).value) : what === 'cancel' ? cancelPto(+d) : false;
      if (ok) { saveGame(); renderPanel(); panel.querySelector('.panel-body').scrollTop = y; }
    }
    if (b.dataset.cookOpen) openPanel('cook');
    if (b.dataset.benefits) benefitsClick(b.dataset.benefits);
    if (b.dataset.ride) ride(b.dataset.ride);
    if (b.dataset.pass) { const it = ITEMS[b.dataset.pass]; if (G.money < +it.price) note(tr("You can't afford that.", '돈이 부족해요.'), true); else { pay(-it.price, it.name, 'spend', { ko: it.name_ko }); G.pass = G.day; saveGame(); renderPanel(); note(tr('Day pass bought. Ride as much as you like today.', '1일 승차권을 샀어요. 오늘은 마음껏 타세요.')); } }
  });
  $('card').addEventListener('click', (e) => { const b = e.target.closest('button[data-say]'); if (b) speak(b.dataset.say); });
  // ---------------------------------------------------------------- the map (Menu > Map, M): the town, or the room you are in
  // Drawn on a canvas from the zone's data: road tiles (the kit's 3 x 3 cells with sidewalks), props by their
  // footprints (SO_ZONE_KIT.BOX), places as pins, doors, the streets and areas the zone names in `map`, the people
  // (where they are now, or the door of the building they are in), the goal, and you. Redrawn while open.
  const MAP = { tab: 'town', canvas: null, zone: null };
  let mapTimer = 0;
  const MAPC = {
    grass: '#c5dcae', pave: '#e2ddd2', road: '#faf8f3', roadEdge: '#c9c2b4', line: '#d8cfba', stripe: '#ffffff',
    floor: '#ece6da', wall: '#5b6477', furniture: '#d9cdb9', furnitureEdge: '#a8967c', box: '#c9c4ba',
    building: '#efe2cc', buildingEdge: '#b39a76', tower: '#d5dfe9', towerEdge: '#8ea2b7', home: '#f5c98d', office: '#8ebfdc', diner: '#ef9b88', market: '#93cf9b',
    tree: '#5d9c4b', treeEdge: '#43773a', bush: '#7eb567', rock: '#a9a59d', rockEdge: '#7d7a73', path: '#d9cdb0', water: '#7fb8e6', waterEdge: '#5e98c9',
    car: '#8b95a6', bench: '#a67c5b', lamp: '#6b7380', fence: '#8d6d4c', planter: '#6a9d55', flower: { red: '#e0575a', yellow: '#f2c74c', purple: '#a074c9' },
    pin: '#2f7d7a', pinEdge: '#215c5a', door: '#7b5a3e', label: '#1d2433', labelBox: 'rgba(255,255,255,0.88)', street: '#7a7366', area: '#3f6b3a',
    you: '#16233b', person: '#e0a33a', personEdge: '#8a5f12', bang: '#c24a3d', goal: '#e0a33a'
  };
  const KEY_BUILDINGS = { seaside_labs: 'office', diner: 'diner', market: 'market' };      // a prop with home: '<hero>' is that hero's home
  const OPEN_DIRS = { straight: [0, 2], crossing: [0, 2], bend: [2, 1], end: [2], square: [], all: [0, 1, 2, 3] };     // east, south, west, north at turn 0
  function mapZone() { return MAP.tab === 'room' && zoneId && zoneId !== 'city' ? zoneId : 'city'; }
  // world-axis rectangle of a prop's footprint, from the zone kit's bounding boxes (like the engine's solids)
  function footprint(p) {
    const at = p.at || [0, 0], turn = p.turn || 0;
    if (p.pack === 'box' || !p.pack) { const sz = p.size || [1, 1, 1]; return rectOf(at[0], at[1], sz[0], sz[2], turn); }
    const kit = window.SO_ZONE_KIT || {}, b = kit.BOX && kit.BOX[p.pack] && kit.BOX[p.pack][p.node];
    const s = (PACK_SCALE[p.pack] || 1) * (p.scale || 1);
    if (!b) { const sz = propSize(p); return rectOf(at[0], at[1], sz[0], sz[2], turn); }
    const a = turn * Math.PI / 180, c = Math.cos(a), sn = Math.sin(a);
    const cx = (b[0] + b[1]) / 2 * s, cz = (b[2] + b[3]) / 2 * s, w = (b[1] - b[0]) * s, d = (b[3] - b[2]) * s;
    const mx = at[0] + cx * c + cz * sn, mz = at[1] - cx * sn + cz * c;
    const W = Math.abs(w * c) + Math.abs(d * sn), D = Math.abs(w * sn) + Math.abs(d * c);
    return { x0: mx - W / 2, x1: mx + W / 2, z0: mz - D / 2, z1: mz + D / 2 };
  }
  function mapBounds(spec) {
    const b = spec.walk || [-spec.size[0] / 2, -spec.size[1] / 2, spec.size[0] / 2, spec.size[1] / 2], m = spec.indoor ? 0.7 : spec.bounds ? 1.5 : 3.5;
    return { x0: b[0] - m, x1: b[2] + m, z0: b[1] - m, z1: b[3] + m };
  }
  // where someone (an npc row) is on the map of zone `mz`: their spot, or the door of the building they are in
  function personOnMap(n, mz, spec) {
    const a = npcActors[n.id];
    if (a && zoneId === mz) return a.leaving ? null : { at: [a.pos.x, a.pos.z], inside: null };
    const pid = npcPlaceNow(n), pz = zoneOfPlace(pid);
    if (!pz) return null;
    if (pz === mz) { const pl = spec.places[pid]; return pl && !pl.guessed ? { at: pl.at, inside: null } : null; }
    if (mz !== 'city') return null;
    const via = routeTo('city', pz);
    return via && via.to === pz ? { at: via.at, inside: pz } : null;
  }
  function youOnMap(mz, spec) {
    if (!player || !G) return null;
    if (zoneId === mz) return { at: [player.pos.x, player.pos.z], heading: player.heading, inside: null };
    if (mz !== 'city') return null;
    const via = routeTo('city', zoneId);
    return via ? { at: via.at, inside: via.to === zoneId ? zoneId : (TRAVEL_ZONES.includes(zoneId) ? zoneId : via.to) } : null;
  }
  function goalOnMap(mz, spec) {
    if (!G) return null;
    if (zoneId === mz && goalTarget) return goalTarget.actor ? [goalTarget.actor.pos.x, goalTarget.actor.pos.z] : goalTarget.at;
    const ep = openEpisodes()[0];
    if (!ep) return null;
    const pid = isPhone(ep) ? ep.place : npcPlaceNow(npcRow(ep.npc)) || ep.place, pz = zoneOfPlace(pid);
    if (pz === mz) { const pl = spec.places[pid]; return pl ? pl.at : null; }
    if (mz !== 'city') return null;
    const via = pz && routeTo('city', pz);
    return via ? via.at : null;
  }
  function renderMapPanel(h, sub, body) {
    const spec = zoneSpec(mapZone());
    h.textContent = MAP.tab === 'room' && spec.id !== 'city' ? loc(spec) : tr(`${CFG.city} · town map`, `${zoneName('city')[1] || CFG.city} 지도`);
    sub.textContent = tr(`${weekday(G.day)}, ${clock(G.minute)}`, `${WEEKDAYS_KO[(G.day - 1) % 7]}, ${clockKo(G.minute)}`);
    const tabs = zoneId && zoneId !== 'city' ? `<div class="tabs" role="tablist"><button type="button" role="tab" data-tab="town" aria-selected="${MAP.tab !== 'room'}">${tr('Town', '시내')}</button><button type="button" role="tab" data-tab="room" aria-selected="${MAP.tab === 'room'}">${esc(tr(zoneName(zoneId)[0], zoneName(zoneId)[1]))}</button></div>` : '';
    body.innerHTML = `${tabs}<canvas class="map" aria-label="Map"></canvas>
      <div class="legend"><span><i class="you"></i>${tr('You', '나')}</span><span><i class="person"></i>${tr('People', '사람')}</span><span><i class="bang">!</i>${tr('Someone to talk to', '이야기할 사람')}</span><span><i class="goal"></i>${tr('Where to go', '갈 곳')}</span><span><i class="door"></i>${tr('Door', '문')}</span></div>
      <div class="map-list"></div>`;
    MAP.canvas = body.querySelector('canvas.map');
    body.querySelectorAll('.tabs button').forEach(b => b.addEventListener('click', () => { MAP.tab = b.dataset.tab; renderPanel(); }));
    drawMap();
  }
  function drawMap() {
    const cv = MAP.canvas;
    if (!cv || !cv.isConnected || !G) return;
    const mz = mapZone(), spec = zoneSpec(mz), B = mapBounds(spec);
    const bw = B.x1 - B.x0, bd = B.z1 - B.z0;
    const body = cv.parentElement, avail = Math.max(240, body.clientWidth - 2);
    const maxH = Math.max(220, window.innerHeight - 250);
    const s = Math.min(avail / bw, maxH / bd);
    const W = Math.round(bw * s), H = Math.round(bd * s), dpr = Math.min(2, window.devicePixelRatio || 1);
    if (cv.width !== W * dpr || cv.height !== H * dpr) { cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px'; }
    const g = cv.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const X = (x) => (x - B.x0) * s, Y = (z) => (z - B.z0) * s;
    const rect = (r, fill, stroke, lw) => { g.beginPath(); g.rect(X(r.x0), Y(r.z0), (r.x1 - r.x0) * s, (r.z1 - r.z0) * s); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw || 1; g.stroke(); } };
    const disc = (x, z, r, fill, stroke, lw) => { g.beginPath(); g.arc(X(x), Y(z), r, 0, Math.PI * 2); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw || 1; g.stroke(); } };
    const halo = (text, x, y, font, color, align) => { g.font = font; g.textAlign = align || 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = 3; g.strokeStyle = 'rgba(255,255,255,0.9)'; g.strokeText(text, x, y); g.fillStyle = color; g.fillText(text, x, y); };
    g.fillStyle = spec.indoor ? '#d7d3ca' : MAPC.grass;
    g.fillRect(0, 0, W, H);
    g.save();
    g.beginPath(); g.rect(0, 0, W, H); g.clip();
    if (spec.indoor) rect({ x0: -spec.size[0] / 2, x1: spec.size[0] / 2, z0: -spec.size[1] / 2, z1: spec.size[1] / 2 }, MAPC.floor, MAPC.wall, 2);
    // ----- tiles: roads as cells with sidewalks, pavement, paths
    const tiles = spec.tiles || [], props = spec.props || [];
    const roadS = (PACK_SCALE.roads || 3);
    const later = [];      // crosswalk stripes over the asphalt
    tiles.forEach(p => {
      if (!p || !p.at) return;
      if (p.pack === 'roads' && /^road-/.test(p.node || '')) {
        const S = roadS * (p.scale || 1), half = S / 2, band = 0.4 * S;
        const kind = /straight|crossing/.test(p.node) ? (/crossing/.test(p.node) ? 'crossing' : 'straight') : /bend/.test(p.node) ? 'bend' : /end/.test(p.node) ? 'end' : /square/.test(p.node) ? 'square' : 'all';
        rect({ x0: p.at[0] - half, x1: p.at[0] + half, z0: p.at[1] - half, z1: p.at[1] + half }, MAPC.pave);
        const turn = Math.round((p.turn || 0) / 90), open = OPEN_DIRS[kind].map(d => (((d - turn) % 4) + 4) % 4);
        g.fillStyle = MAPC.road;
        g.fillRect(X(p.at[0] - band), Y(p.at[1] - band), 2 * band * s, 2 * band * s);
        open.forEach(d => {
          const [dx, dz] = [[1, 0], [0, 1], [-1, 0], [0, -1]][d];
          const x0 = p.at[0] + (dx > 0 ? band : dx < 0 ? -half : -band), x1 = p.at[0] + (dx > 0 ? half : dx < 0 ? -band : band);
          const z0 = p.at[1] + (dz > 0 ? band : dz < 0 ? -half : -band), z1 = p.at[1] + (dz > 0 ? half : dz < 0 ? -band : band);
          g.fillRect(X(x0), Y(z0), (x1 - x0) * s, (z1 - z0) * s);
        });
        if (kind === 'crossing') later.push([p.at, open.includes(0) ? 'x' : 'z', S]);
      } else if (p.pack === 'roads') rect({ x0: p.at[0] - roadS / 2, x1: p.at[0] + roadS / 2, z0: p.at[1] - roadS / 2, z1: p.at[1] + roadS / 2 }, MAPC.pave);
      else if (/path|floor/i.test(p.node || '')) { const r = footprint(p); if (/Circle/.test(p.node)) disc((r.x0 + r.x1) / 2, (r.z0 + r.z1) / 2, (r.x1 - r.x0) / 2 * s, MAPC.path); else rect(r, MAPC.path); }
    });
    later.forEach(([at, along, S]) => {
      g.fillStyle = MAPC.stripe;
      for (let i = -2; i <= 2; i++) {
        if (along === 'x') g.fillRect(X(at[0] + i * 0.27 * S) - 1.5, Y(at[1] - 0.36 * S), 3, 0.72 * S * s);
        else g.fillRect(X(at[0] - 0.36 * S), Y(at[1] + i * 0.27 * S) - 1.5, 0.72 * S * s, 3);
      }
    });
    // ----- props: water and ground first, then buildings and furniture, then the small things
    const order = (p) => p.pack === 'box' && (p.size || [1, 1, 1])[1] <= 0.03 ? 0 : /^(building|house|wall)/.test(p.node || '') || p.pack === 'box' ? 1 : p.pack === 'furniture' || p.pack === 'homeware' || p.pack === 'extras' ? 2 : 3;
    props.slice().sort((a, b) => order(a) - order(b)).forEach(p => {
      if (!p || !p.at) return;
      const node = p.node || '', r = footprint(p);
      if (p.pack === 'box') {
        const flat = (p.size || [1, 1, 1])[1] <= 0.03;
        if (flat) rect(r, /#4f97d6|#5aa0d8/i.test(p.color || '') ? MAPC.water : (p.color || MAPC.box));
        else if (spec.indoor && (p.size || [1])[1] >= 1) rect(r, MAPC.wall);
        else rect(r, p.color || MAPC.box, 'rgba(0,0,0,0.18)');
        return;
      }
      if (p.pack === 'city' || p.pack === 'buildings') {
        if (/^building-skyscraper/.test(node)) rect(r, MAPC.tower, MAPC.towerEdge, 1.2);
        else if (/^(building|house|low-detail)/.test(node)) { const key = p.home ? (G && p.home === G.hero ? 'home' : null) : KEY_BUILDINGS[p.id]; rect(r, key ? MAPC[key] : MAPC.building, MAPC.buildingEdge, 1.2); }
        else if (/^tree/.test(node)) disc(p.at[0], p.at[1], Math.max(3, 0.55 * s), MAPC.tree, MAPC.treeEdge);
        else if (/^fence/.test(node)) rect(r, MAPC.fence);
        else if (/^planter/.test(node)) rect(r, MAPC.planter);
        else if (/^detail-(parasol|awning|overhang)/.test(node)) rect(r, 'rgba(255,255,255,0.35)');
        return;
      }
      if (p.pack === 'nature' || p.pack === 'park' || p.pack === 'wild') {
        const sc = (PACK_SCALE[p.pack] || 1) * (p.scale || 1);
        if (/^tree/.test(node)) disc(p.at[0], p.at[1], Math.max(3, (p.pack === 'nature' ? 1.6 : 0.32) * sc * s), /fall|autumn|twisted/.test(node) ? '#c98a3e' : /dark|pine|dead/.test(node) ? '#3f7a3c' : MAPC.tree, MAPC.treeEdge);
        else if (/^plant|^grass|^bush|^fern|^clover/.test(node)) disc(p.at[0], p.at[1], Math.max(1.5, (p.pack === 'nature' ? 0.8 : 0.16) * sc * s), MAPC.bush);
        else if (/^flower|^petal/.test(node)) disc(p.at[0], p.at[1], 1.6, MAPC.flower[(node.match(/red|yellow|purple/) || [/-4/.test(node) ? 'yellow' : 'red'])[0]]);
        else if (/^(rock|stone|pebble)/.test(node)) rect(r, MAPC.rock, MAPC.rockEdge);
        else if (/^statue/.test(node)) { rect(r, '#e9e4d8', MAPC.rockEdge); }
        else if (/^fence/.test(node)) rect(r, MAPC.fence);
        else if (/^(log|stump|canoe|bridge|sign|pot)/.test(node)) rect(r, MAPC.bench);
        else if (/^lily/.test(node)) disc(p.at[0], p.at[1], 1.6, MAPC.bush);
        return;
      }
      if (p.pack === 'cars') { rect(r, MAPC.car, 'rgba(0,0,0,0.2)'); return; }
      if (p.pack === 'roads') {
        if (/^light|^traffic|^electricity/.test(node)) disc(p.at[0], p.at[1], 1.8, MAPC.lamp);
        else if (/^dumpster|^construction-barrier/.test(node)) rect(r, '#8d9aa5');
        else if (/^road-sign|^sign/.test(node)) disc(p.at[0], p.at[1], 1.4, MAPC.lamp);
        return;
      }
      if (p.pack === 'furniture') {
        if (/^wall/.test(node)) rect(r, MAPC.wall);
        else if (/^(floor|rug)/.test(node)) return;
        else if (/^bench|^chair|^stool|^lounge/.test(node)) rect(r, MAPC.bench);
        else if (/^(lamp|plant|potted|books|laptop|computer|pillow|toaster|radio|speaker)/.test(node) || (p.lift || 0) > 0.1) return;
        else rect(r, MAPC.furniture, MAPC.furnitureEdge);
        return;
      }
      if (p.pack === 'extras') { if (!p.lift) rect(r, MAPC.furniture, MAPC.furnitureEdge); return; }
    });
    // ----- streets and areas named by the zone
    const M = spec.map || {};
    g.textBaseline = 'middle';
    (M.streets || []).forEach(st => {
      g.save();
      if (st.along === 'x') { g.translate(X(B.x0 + 1.2), Y(st.at)); g.textAlign = 'left'; }
      else { g.translate(X(st.at), Y(B.z0 + 1.2)); g.rotate(Math.PI / 2); g.textAlign = 'left'; }
      g.font = '600 10px ' + getComputedStyle(document.body).fontFamily;
      g.lineWidth = 3; g.strokeStyle = 'rgba(255,255,255,0.85)'; g.strokeText(st.name, 0, 0);
      g.fillStyle = MAPC.street; g.fillText(st.name, 0, 0);
      g.restore();
    });
    (M.areas || []).forEach(a => {
      halo(loc(a), X(a.at[0]), Y(a.at[1]), 'italic 600 11px ' + getComputedStyle(document.body).fontFamily, a.water ? '#2f6f9f' : MAPC.area);
    });
    // ----- doors (portals) and places
    portalsOf(spec).forEach(p => {
      const w = Math.max(6, (p.size ? p.size[0] : 1) * s), d = Math.max(4, (p.size ? p.size[1] : 0.6) * s);
      g.fillStyle = MAPC.door; g.fillRect(X(p.at[0]) - w / 2, Y(p.at[1]) - d / 2, w, d);
      g.strokeStyle = '#fff'; g.lineWidth = 1; g.strokeRect(X(p.at[0]) - w / 2, Y(p.at[1]) - d / 2, w, d);
    });
    const font = getComputedStyle(document.body).fontFamily;
    const labels = [];
    Object.keys(spec.places).forEach(pid => {
      const pl = spec.places[pid];
      if (!pl || !pl.at || pl.guessed || HEROES.some(h => h.home_door === pid && h.id !== G.hero)) return;
      const info = place(pid), isDoor = placeKind(pid) === 'door' || /_door$/.test(pid);
      const x = X(pl.at[0]), y = Y(pl.at[1]);
      if (isDoor) { g.fillStyle = MAPC.pin; g.beginPath(); g.moveTo(x, y - 5); g.lineTo(x + 5, y); g.lineTo(x, y + 5); g.lineTo(x - 5, y); g.closePath(); g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 1.2; g.stroke(); }
      else { g.beginPath(); g.arc(x, y, 5.5, 0, Math.PI * 2); g.fillStyle = MAPC.pin; g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 1.5; g.stroke(); g.beginPath(); g.arc(x, y, 2, 0, Math.PI * 2); g.fillStyle = '#fff'; g.fill(); }
      labels.push({ x, y: y - 9, text: loc(info), sub: null, w: 0 });
    });
    // ----- the goal, the people, you
    const goal = goalOnMap(mz, spec);
    if (goal) { g.setLineDash([3, 3]); disc(goal[0], goal[1], 12, null, MAPC.goal, 2.5); g.setLineDash([]); }
    const open = openEpisodes();
    const seen = {};
    cast().forEach(n => {
      const at = personOnMap(n, mz, spec);
      if (!at) return;
      const k = at.at[0].toFixed(1) + ',' + at.at[1].toFixed(1), j = (seen[k] = (seen[k] || 0) + 1) - 1;
      const x = X(at.at[0]) + (at.inside ? (j % 3) * 9 - 9 : 0), y = Y(at.at[1]) + (at.inside ? 10 + Math.floor(j / 3) * 9 : 0);
      g.beginPath(); g.arc(x, y, 4.5, 0, Math.PI * 2); g.fillStyle = MAPC.person; g.fill(); g.strokeStyle = MAPC.personEdge; g.lineWidth = 1.2; g.stroke();
      if (open.some(e => e.npc === n.id && !isPhone(e))) { g.beginPath(); g.arc(x + 4, y - 5, 5, 0, Math.PI * 2); g.fillStyle = MAPC.bang; g.fill(); halo('!', x + 4, y - 5, 'bold 8px ' + font, '#fff'); g.lineWidth = 1; }
      if (!at.inside) labels.push({ x: x + 7, y, text: firstName(n), person: true, left: true });
      else if (j === 0) {
        const names = cast().filter(m => { const q = personOnMap(m, mz, spec); return q && q.inside === at.inside; }).map(m => firstName(m));
        const where = TRAVEL_ZONES.includes(at.inside) ? ` · ${tr(zoneName(at.inside)[0].split(',')[0], zoneName(at.inside)[1])}` : '';      // by the shuttle: say where they are
        labels.push({ x: x + 12, y: y + 4, text: (names.length > 2 ? `${names[0]}, ${names[1]} +${names.length - 2}` : names.join(', ')) + where, person: true, left: true });
      }
    });
    const you = youOnMap(mz, spec);
    if (you) {
      const x = X(you.at[0]), y = Y(you.at[1]) - (you.inside ? 12 : 0);
      g.save(); g.translate(x, y);
      if (you.heading != null) { g.rotate(-you.heading + Math.PI); g.beginPath(); g.moveTo(0, -9); g.lineTo(6, 7); g.lineTo(0, 3.5); g.lineTo(-6, 7); g.closePath(); }
      else { g.beginPath(); g.arc(0, 0, 6, 0, Math.PI * 2); }
      g.fillStyle = MAPC.you; g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 1.6; g.stroke();
      g.restore();
      labels.push({ x: x + 9, y, text: tr('You', '나') + (you.inside ? tr(` · in ${zoneName(you.inside)[0].split(',')[0]}`, ` · ${zoneName(you.inside)[1] || zoneName(you.inside)[0]} 안`) : ''), you: true, left: true });
    }
    // labels last, so that they lie over everything, each in a small box; you and the people first, then the
    // places, each label at the first of a few spots round its mark that is clear of the labels already placed
    const placed = [];
    const overlap = (a) => placed.reduce((sum, b) => sum + Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)), 0);
    labels.sort((a, b) => (b.you ? 2 : b.person ? 1 : 0) - (a.you ? 2 : a.person ? 1 : 0)).forEach(l => {
      g.font = '600 10px ' + font;
      const tw = g.measureText(l.text).width, sw = l.sub ? (g.font = '9px ' + font, g.measureText(l.sub).width) : 0;
      const w = Math.max(tw, sw) + 8, hgt = l.sub ? 23 : 14, ax = l.left ? l.x - 7 : l.x, ay = l.left ? l.y : l.y + 9;    // ax, ay: the mark
      // spots round the mark: right, left, above, below, then the corners; the first clear one, else the least covered
      const spots = [[ax + 8, ay - hgt / 2], [ax - w - 8, ay - hgt / 2], [ax - w / 2, ay - hgt - 8], [ax - w / 2, ay + 8],
        [ax + 6, ay - hgt - 6], [ax - w - 6, ay - hgt - 6], [ax + 6, ay + 6], [ax - w - 6, ay + 6]];
      if (!l.left) spots.unshift(spots.splice(2, 1)[0]);       // places: above first
      let box = null, best = Infinity;
      for (const [sx, sy] of spots) { const b = { x: clamp(sx, 0, W - w), y: clamp(sy, 0, H - hgt), w, h: hgt }, o = overlap(b); if (o < best) { best = o; box = b; } if (!o) break; }
      placed.push(box);
      g.fillStyle = l.you ? MAPC.you : MAPC.labelBox; g.beginPath(); if (g.roundRect) g.roundRect(box.x, box.y, w, hgt, 4); else g.rect(box.x, box.y, w, hgt); g.fill();
      g.fillStyle = l.you ? '#fff' : l.person ? '#6d4a0a' : MAPC.label; g.textAlign = 'left'; g.textBaseline = 'middle';
      g.font = (l.you ? '700 ' : '600 ') + '10px ' + font;
      g.fillText(l.text, box.x + 4, box.y + 7.5);
      if (l.sub) { g.font = '9px ' + font; g.fillStyle = '#5b6477'; g.fillText(l.sub, box.x + 4, box.y + 17); }
    });
    // compass
    halo('N', W - 14, 14, '700 11px ' + font, MAPC.label);
    g.beginPath(); g.moveTo(W - 14, 20); g.lineTo(W - 10, 30); g.lineTo(W - 14, 27); g.lineTo(W - 18, 30); g.closePath(); g.fillStyle = MAPC.label; g.fill();
    g.restore();
    // ----- the list under the map: places with people or something to do, and where everyone out of town is
    const list = body.querySelector('.map-list');
    if (list) {
      const items = [];
      Object.keys(spec.places).forEach(pid => {
        const pl = spec.places[pid];
        if (!pl || pl.guessed) return;
        const people = cast().filter(n => { const at = personOnMap(n, mz, spec); return at && !at.inside && Math.hypot(at.at[0] - pl.at[0], at.at[1] - pl.at[1]) < 2.2; }).map(n => firstName(n));
        const acts = placeActions(pid).map(a => a.label.replace(/ \(.*\)$/, ''));
        const talk = open.filter(e => (isPhone(e) ? e.place === pid : cast().some(n => n.id === e.npc && (npcPlaceNow(n) === pid)))).map(e => loc(e, 'title'));
        if (!people.length && !acts.length && !talk.length) return;
        items.push(`<div class="row"><div class="main"><div class="t">${esc(loc(place(pid)))}</div><div class="s">${esc(people.concat(acts).join(' · '))}</div>${talk.length ? `<div class="s talk">! ${esc(talk.join(' · '))}</div>` : ''}</div></div>`);
      });
      if (mz === 'city') {
        const gone = cast().filter(n => !personOnMap(n, mz, spec));
        const away = gone.filter(n => npcPlaceNow(n)).map(n => { const zn = zoneName(zoneOfPlace(npcPlaceNow(n))); return `${firstName(n)} (${tr(zn[0], zn[1])})`; });
        const off = gone.filter(n => !npcPlaceNow(n)).map(n => firstName(n));
        if (off.length) items.push(`<div class="row"><div class="main"><div class="t">${tr('Off today or gone home', '쉬는 날이거나 퇴근함')}</div><div class="s">${esc(off.join(', '))}</div></div></div>`);
        if (away.length) items.push(`<div class="row"><div class="main"><div class="t">${tr('Out of town', '출장 중')}</div><div class="s">${esc(away.join(', '))}${tr(' · by the airport shuttle', ' · 공항 셔틀로')}</div></div></div>`);
      }
      list.innerHTML = items.join('');
    }
  }

  function buy(id) {
    const i = ITEMS[id];
    if (!i || !G) return false;
    if (i.place && (closedNow(i.place) || closedNow(zoneOfPlace(i.place)))) { if (!panel.hidden) note(tr('Sorry, we are closed.', '죄송해요, 영업이 끝났어요.'), true); return false; }
    const b = billFor(i), price = b.total, by = payBy(price);          // by: 'credit' (the credit card), or why it was declined; null: debit
    if (by && by !== 'credit') { if (!panel.hidden) note(by, true); return false; }
    if (!by && G.money < price) { if (!panel.hidden) note(tr(`You can't afford that (${receipt(b)}).`, `돈이 부족해요 (${receipt(b)}).`), true); speak("Sorry, you can't afford that."); return false; }
    (by ? cardCharge : pay)(by ? price : -price, i.name, by ? 'card' : 'spend', Object.assign({ ko: i.name_ko }, b.tax || b.tip ? { tax: b.tax, tip: b.tip } : null));
    speak(i.name);
    if (i.kind === 'fare') note(tr(`Paid ${usd2(price)}: ${i.name}.`, `${usd2(price)} 냈어요: ${loc(i)}.`));
    else if (/^(meal|drink)$/.test(i.kind)) {
      G.energy = clamp(G.energy + (+i.energy || 0), 0, E_MAX);
      advanceMinutes(i.kind === 'meal' ? 20 : 5);
      let card = '';
      if (punchable(i)) {
        G.punch = G.punch || {};
        G.punch[i.place] = b.free ? 0 : punches(i.place) + 1;
        card = b.free ? tr(' This one was on the house.', ' 이번 잔은 무료예요.') : onTheHouse(i) ? tr(' Your punch card is full: the next drink is free.', ' 스탬프가 다 찼어요. 다음 음료는 무료예요.') : tr(` Punch card: ${punches(i.place)} of ${PUNCH_N - 1}.`, ` 스탬프 ${PUNCH_N - 1}개 중 ${punches(i.place)}개.`);
      }
      note(`${loc(i)}: ${receipt(b)}. ${tr('Energy', '에너지')} +${i.energy || 0}.${card}`);
      if (player) play(player, 'interact-right', { once: true });
    } else if (i.kind === 'grocery') {
      addLot(id);
      const by = bestBy({ id, day: G.day });
      note(tr(`${i.name} is in your bag (${G.inventory[id]}).${by != null ? ` Best by ${dateShort(by)}.` : ''}`, `${loc(i)}을(를) 가방에 넣었어요 (${G.inventory[id]}).${by != null ? ` ${dShort(by)}까지 먹으세요.` : ''}`));
    } else {
      addLot(id);
      note(tr(`${i.name}: ${receipt(b)}. It is in your bag.`, `${loc(i)}: ${receipt(b)}. 가방에 넣었어요.`));
    }
    saveGame();
    if (!panel.hidden) { const n = panel.querySelector('.panel-note').textContent; renderPanel(); panel.querySelector('.panel-note').textContent = n; }
    return true;
  }
  function eat(n) {          // a portion of a package in the bag (its place in G.lots), or of the oldest package of an item (its id)
    const l = ITEMS[n] ? goodLots(n)[0] : lots()[+n];
    if (!l || l.left < 1 || gone(l)) return false;
    const id = l.id, i = ITEMS[id] || { energy: 0, name: pretty(id) };
    if (+i.cook_only) { if (!panel.hidden) note(tr(`The ${shortName(id).toLowerCase()} needs cooking.`, `${josa(itemName(id), '은', '는')} 익혀 먹어야 해요.`), true); return false; }
    l.left--;
    syncBag();
    G.energy = clamp(G.energy + (+i.energy || 0), 0, E_MAX);
    advanceMinutes(10);
    logEvent('eat', i.name, 0);
    saveGame();
    renderPanel();
    note(tr(`You had some ${shortName(id).toLowerCase()}. Energy +${i.energy || 0}.`, `${josa(itemName(id), '을', '를')} 먹었어요. 에너지 +${i.energy || 0}.`));
    return true;
  }
  async function ride(pid) {
    const fare = hasPass() ? 0 : busFare();
    if (G.money < fare) { note(tr("You can't afford the fare.", '요금이 부족해요.'), true); return; }
    const bb = busAt(G.minute), nb = bb && bb.board;
    if (nb == null) { note(tr(`No more buses tonight. The last one left at ${clock(hm(CFG.bus_last, 1350))}.`, `오늘 버스는 끊겼어요. 막차는 ${clockKo(hm(CFG.bus_last, 1350))}에 떠났어요.`), true); return; }
    const waited = Math.max(0, Math.round(nb - G.minute)), said = busRideText(bb, G.minute, waited);
    if (fare) pay(-fare, 'Bus fare', 'spend', { ko: '버스 요금' });
    closePanel();
    advanceMinutes(waited + 15);
    await enterZone('city', pid);
    toast(`${said[0]} to ${place(pid).name}.`, `${said[1]} ${place(pid).name_ko || place(pid).name}에 왔어요.`, null, 4);
  }

  // ---------------------------------------------------------------- sleep: the end of a day
  const isRentDay = (d) => START != null ? onDateOfMonth(d, RENT_DOM) : d >= RENT_DAY && (d - RENT_DAY) % 30 === 0;
  function trySleep(pid) {
    if (G.minute < 20 * 60 && G.energy > 25) { toast("It's too early to sleep. Come back after 8 PM.", '아직 잘 시간이 아니에요. 오후 8시 이후에 오세요.'); return; }
    goToSleep(false, pid);
  }
  function goToSleep(late, pid) {
    if (!G) return;
    if (talk) endTalk();
    if (!panel.hidden) closePanel();
    const day = G.day;
    const today = G.log.filter(l => l.day === day);
    const eps = today.filter(l => l.type === 'episode');
    const spent = -today.filter(l => l.amount < 0).reduce((s, l) => s + l.amount, 0);
    const earned = today.filter(l => l.amount > 0).reduce((s, l) => s + l.amount, 0);
    const gained = (G.points || []).filter(p => p.day === day).reduce((n, p) => n + p.n, 0);
    const missed = episodes().filter(e => !G.done[e.id] && e.day_to != null && e.day_to === day && G.day >= (e.day_from || 1) && !firedOut(e.place, e));
    const away = TRAVEL_ZONES.includes(zoneId);
    logEvent('sleep', late ? 'Fell asleep' : 'Slept', 0);
    const inAt = G.inDay === day ? G.inAt : null, wasLate = G.lateDay === day, fromHome = !!(work().home || {})[day], wasRemote = remoteDay(day);          // (hybrid work)
    hush = true;
    const wasFired = fired();
    const att = closeDay(day, away);           // a working day you never came in: a strike (and maybe the end of the job)
    const skipped = missedRoutines(day);          // meetings you were at work for but did not go to
    const week = weekReview(day);          // the last working day of a week in free play: the manager's note
    const deskMins = workedOn(day), deskTasks = tasksOn(day);
    const firedNow = !wasFired && fired();
    const missionNote = closeMissions(day);          // the last day of the missions: free play from tomorrow
    G.day += 1;
    G.minute = DAY_START;
    G.energy = late ? Math.round(E_MAX * 0.8) : E_MAX;          // asleep on your feet at 11 PM is not a night's rest
    G.wet = 0;
    const morning = [];
    if (firedNow) morning.push(tr(`📧 <b>You've been let go.</b> ${esc(CFG.company)} ended your job for missing too much work. Your badge no longer works, and your final paycheck has been deposited.`, `📧 <b>해고되었습니다.</b> 결근이 너무 잦아 ${esc(CFG.company)}에서 고용을 끝냈어요. 출입증은 이제 안 열리고, 마지막 급여는 계좌에 들어왔어요.`));
    else if (att === 'early') morning.push(tr(`⚠️ You left work early yesterday (${clock(G.work.left[day])}). ${G.work.warned === 2 ? 'HR has sent you a <b>final written warning</b>.' : G.work.warned === 1 ? 'Your manager has noticed.' : ''}`, `⚠️ 어제 일찍 퇴근했어요(${clockKo(G.work.left[day])}). 조퇴예요. ${G.work.warned === 2 ? '인사팀이 <b>최종 서면 경고</b>를 보냈어요.' : G.work.warned === 1 ? '매니저가 알아챘어요.' : ''}`));
    else if (att === 'absent' && wasRemote) morning.push(tr(`⚠️ You never logged in yesterday. ${G.work.warned === 2 ? 'HR has sent you a <b>final written warning</b>.' : G.work.warned === 1 ? 'Your manager has noticed.' : ''}`, `⚠️ 어제 로그인하지 않았어요. 결근이에요. ${G.work.warned === 2 ? '인사팀이 <b>최종 서면 경고</b>를 보냈어요.' : G.work.warned === 1 ? '매니저가 알아챘어요.' : ''}`));
    else if (att === 'absent') morning.push(tr(`⚠️ You didn't show up for work yesterday. ${G.work.warned === 2 ? 'HR has sent you a <b>final written warning</b>.' : G.work.warned === 1 ? 'Your manager has noticed.' : ''}`, `⚠️ 어제 출근하지 않았어요. ${G.work.warned === 2 ? '인사팀이 <b>최종 서면 경고</b>를 보냈어요.' : G.work.warned === 1 ? '매니저가 알아챘어요.' : ''}`));
    if (skipped.length) morning.push(tr(`📅 You missed ${skipped.map(x => esc(meetingName(x.r))).join(' and ')} yesterday. Your manager noticed.`, `📅 어제 ${skipped.map(x => esc(x.r.title_ko || x.r.title)).join('·')}에 빠졌어요. 매니저가 알아챘어요.`));
    if (week) morning.push(week.grade === 'good' ? tr(`📈 Your manager liked your week: <b>${hrs(week.mins)}</b> at your desk (the team expects about ${hrs(week.want)}). +${week.n} points.`, `📈 매니저가 이번 주 일에 만족했어요: 자리에서 <b>${hrs(week.mins)}</b> 일함(팀 기대치 약 ${hrs(week.want)}). +${week.n}점.`)
      : week.grade === 'low' ? tr(`📉 This week you put <b>${hrs(week.mins)}</b> into your work (the team expects about ${hrs(week.want)}). Your manager noticed. −${Math.abs(week.n)} points.`, `📉 이번 주에 자리에서 <b>${hrs(week.mins)}</b>만 일했어요(팀 기대치 약 ${hrs(week.want)}). 매니저가 알아챘어요. −${Math.abs(week.n)}점.`)
        : tr(`📊 This week: <b>${hrs(week.mins)}</b> at your desk (the team expects about ${hrs(week.want)}).`, `📊 이번 주: 자리에서 <b>${hrs(week.mins)}</b> 일함(팀 기대치 약 ${hrs(week.want)}).`));
    if (missionNote) morning.push(missionNote);
    if (late) morning.push(tr('You stayed up too late and did not sleep well. You start the day a little tired.', '너무 늦게까지 깨어 있어서 잠을 설쳤어요. 조금 피곤한 채로 하루를 시작합니다.'));
    reviewMorning(day).forEach(m => morning.push(m));          // a missed review by email, the end of an extended probation
    if (!fired()) leaveMorning().forEach(m => morning.push(m));          // PTO answers, a day off today, the sick time of a new year
    benefitsMorning().forEach(m => morning.push(m));          // open enrollment, missing it, the new plans starting
    friendsNight(day).forEach(m => morning.push(m));          // coworkers: a lunch you missed, an umbrella back, time apart
    careMorning(day).forEach(m => morning.push(m));          // a cold or the flu, the doctor's note HR asks for
    const hol = holidayOf(G.day);
    if (hol) morning.push(tr(`🗓️ <b>${esc(hol.name)}</b>${hol.kind === 'federal' ? ' (federal holiday)' : ''}. ${esc(hol.note || '')}`, `🗓️ <b>${esc(loc(hol))}</b>${hol.kind === 'federal' ? ' (연방 공휴일)' : ''}. ${esc(hol.note_ko || '')}`));
    if (companyOff(G.day) && !isWeekend(G.day) && !fired()) morning.push(tr(`🏖️ ${esc(CFG.company)} is closed today: a paid day off.`, `🏖️ 오늘은 ${esc(ZONE_NAMES.office[1] || CFG.company)} 휴일이에요. 유급 휴일입니다.`));
    const special = holidayHours(G.day);
    if (special.length) morning.push(tr(`🕘 Holiday hours: ${special.map(x => `${esc(hoursName(x.id)[0])} ${x.h[0] === x.h[1] ? 'closed' : clock(x.h[0]) + ' – ' + clock(x.h[1])}`).join(' · ')}.`,
      `🕘 휴일 영업시간: ${special.map(x => `${esc(hoursName(x.id)[1] || hoursName(x.id)[0])} ${x.h[0] === x.h[1] ? '휴무' : clockKo(x.h[0]) + ' – ' + clockKo(x.h[1])}`).join(' · ')}.`));
    const me = hero(), housing = me.housing_name || 'Rent', housingKo = me.housing_name_ko || (/mortgage/i.test(housing) ? '주택 담보 대출' : '월세');
    if (isPayday(G.day) && !fired()) {
      // unpaid sick days come off this paycheck (a working day is a tenth of two weeks); PTO builds up a little
      const L = leave(), off = Math.min(10, L.unpaid || 0), cut = cents(netPay() * off / 10), net = cents(netPay() - cut);          // at most the whole paycheck; the rest waits for the next one
      L.unpaid = (L.unpaid || 0) - off; L.pto = Math.round((L.pto + ptoPerPay()) * 100) / 100;
      if (net > 0) pay(net, 'Paycheck (direct deposit)', 'income', { ko: '급여 (계좌 입금)' }); notify(CFG.bank_name, `A direct deposit of ${usd2(net)} from ${CFG.company} has posted to checking ···4821.`, `${CFG.company}의 급여 ${usd2(net)}가 계좌 ···4821에 입금되었습니다.`);
      morning.push(tr(`Payday: <b>${usd2(net)}</b> was deposited to your account (gross ${usd(grossPay())})${payDue(G.day) ? '' : ', early because the bank is closed on payday'}.${off ? ` ${usd2(cut)} less for ${off} unpaid day${off === 1 ? '' : 's'} off.` : ''} PTO +${ptoPerPay()} h (now ${leaveText(L.pto)}).`,
        `월급날: <b>${usd2(net)}</b>가 계좌에 들어왔어요 (세전 ${usd(grossPay())})${payDue(G.day) ? '' : '. 급여일에 은행이 쉬어서 미리 들어왔어요'}.${off ? ` 무급 휴가 ${off}일로 ${usd2(cut)} 적게 들어왔어요.` : ''} 연차 +${ptoPerPay()}시간(지금 ${leaveText(L.pto)}).`));
      benefitsPaid(net, cut).forEach(m => morning.push(m));          // the pay stub, the 401(k) and the HSA
    }
    if (isRentDay(G.day)) { pay(-me.housing, housing, 'bill', { ko: housingKo }); notify(CFG.bank_name, `${housing} payment of ${usd2(+me.housing)} was sent from checking ···4821.`, `${housingKo} ${usd2(+me.housing)}가 계좌에서 나갔습니다.`); morning.push(tr(`${housing}: <b>${usd2(+me.housing)}</b> was paid ${/mortgage/i.test(housing) ? 'to the bank' : 'to your landlord'}.`, `${housingKo}: <b>${usd2(+me.housing)}</b>를 ${/mortgage/i.test(housing) ? '은행에' : '집주인에게'} 냈어요.`)); }
    billsDue(G.day).forEach(b => { pay(-b.amount, b.name, 'bill', { ko: b.name_ko }); notify(CFG.bank_name, `Autopay: ${usd2(+b.amount)} was paid to ${b.name} from checking ···4821.`, `자동이체: ${b.name_ko || b.name} ${usd2(+b.amount)}가 빠져나갔습니다.`); morning.push(tr(`Autopay: <b>${usd2(+b.amount)}</b> for ${esc(String(b.name).toLowerCase())}.`, `자동이체: ${esc(b.name_ko || b.name)} <b>${usd2(+b.amount)}</b>.`)); });
    creditMorning().forEach(m => morning.push(m));          // the credit card: a statement, autopay, a late fee, the score
    if (G.feeDay === G.day) morning.push(tr(`The bank charged a <b>${usd2(+CFG.overdraft_fee)}</b> overdraft fee.`, `은행이 초과 인출 수수료 <b>${usd2(+CFG.overdraft_fee)}</b>를 물렸어요.`));
    if (G.money < 0) morning.push(tr(`Your account is <b>overdrawn</b>. Spend carefully${fired() ? '' : ' until payday'}.`, `계좌 잔액이 <b>마이너스</b>예요. ${fired() ? '' : '월급날까지 '}아껴 쓰세요.`));
    hush = false;
    kitchenNews().forEach(m => morning.push(m));
    if (ITEMS.detergent) { const w = wakeDressed(); if (w) morning.push(w); }
    const wx = weatherOf(G.day);
    const sun = sunOf(G.day);
    morning.unshift(tr(`${WX_ICON[wx.kind] || ''} <b>${WX_NAME[wx.kind] || pretty(wx.kind)}</b>, high ${wx.high_f}°F, low ${wx.low_f}°F. ${esc(wx.forecast || '')}${sun ? ` ${sunText(G.day)}.` : ''}`,
      `${WX_ICON[wx.kind] || ''} <b>${WX_NAME_KO[wx.kind] || wx.kind}</b>, 최고 ${toC(wx.high_f)}°C, 최저 ${toC(wx.low_f)}°C. ${esc(wx.forecast_ko || '')}${sun ? ` 해돋이 ${clockKo(sun.rise)}, 해넘이 ${clockKo(sun.set)}.` : ''}`));
    const cal = calendar().filter(c => c.day === G.day && !firedOut(c.place)).sort((a, b) => hm(a.time, 0) - hm(b.time, 0));
    const workAt = hybridMorning(G.day, !myOff(G.day) && !fired() ? tr(`Work starts at <b>${clock(hm(CFG.work_start, 540))}</b>: be in by ${clock(hm(CFG.late_after, 555))}.`, `업무는 <b>${clockKo(hm(CFG.work_start, 540))}</b>에 시작해요. ${clockKo(hm(CFG.late_after, 555))}까지 출근하세요.`) : '');          // (hybrid work: a remote day logs in from home)
    const body = `<div class="sum"><div><b>${eps.length}</b>${tr('conversations', '대화')}</div><div><b>${gained >= 0 ? '+' : '−'}${Math.abs(gained)}</b>${tr('points', '점수')}</div><div><b>${usd2(spent)}</b>${tr('spent', '지출')}</div><div><b>${usd2(earned)}</b>${tr('earned', '수입')}</div></div>
      ${eps.length ? '<ul>' + eps.map(l => `<li>${esc(logText(l))}</li>`).join('') + '</ul>' : ''}
      ${missed.length ? `<p>${tr('Missed', '놓친 일')}: ${missed.map(e => esc(loc(e, 'title'))).join(', ')}</p>` : ''}
      ${deskMins ? `<p>${tr(`You worked <b>${hrs(deskMins)}</b> at your desk${deskTasks.length ? ` and handled ${deskTasks.length === 1 ? 'one thing' : deskTasks.length + ' things'} that came up` : ''}.`, `자리에서 <b>${hrs(deskMins)}</b> 일했어요${deskTasks.length ? `. 중간에 생긴 일 ${deskTasks.length}건을 처리했어요` : ''}.`)}</p>` : ''}
      ${inAt != null ? `<p>${tr(`You ${fromHome ? 'logged in from home' : 'got to work'} at <b>${clock(inAt)}</b>${wasLate ? ', late' : inAt <= hm(CFG.work_start, 540) ? ', on time' : ''}.`, `<b>${clockKo(inAt)}</b>에 ${fromHome ? '집에서 로그인' : '출근'}했어요${wasLate ? ' (지각)' : inAt <= hm(CFG.work_start, 540) ? ' (정시)' : ''}.`)}</p>` : ''}
      <p>${tr('Score', '점수')} <b>★ ${score()}</b> · ${tr(standing()[0], standing()[1])}${day <= MISSION_DAYS ? ` · ${tr('Missions', '미션')} <b>${missionCount().join(' / ')}</b>` : ''}</p>
      <h3>${tr(`${dateLong(G.day)} · Day ${G.day}`, `${dateKo(G.day)} · ${G.day}일째`)}</h3>${morning.map(m => `<p>${m}</p>`).join('')}
      ${cal.length ? '<ul>' + cal.map(c => `<li><b>${esc(c.time)}</b> ${esc(loc(c, 'title'))}${c.place ? ' · ' + esc(loc(place(c.place))) : ''}</li>`).join('') + '</ul>' : `<p>${isWeekend(G.day) ? tr('Weekend. No work today.', '주말이에요. 오늘은 출근하지 않아요.') : companyOff(G.day) ? tr('Company holiday. No work today.', '회사 휴일이에요. 오늘은 출근하지 않아요.') : tr('Nothing on the calendar.', '달력에 일정이 없어요.')}</p>`}
      ${workAt ? `<p>${workAt}</p>` : ''}
      <p>${tr('Balance', '잔액')}: <b>${usd2(G.money)}</b></p>`;
    saveGame();
    state = 'sleep';
    const wake = pid && zoneId ? [zoneId, pid] : away ? ['hotel', 'hotel_room'] : [hero().home_zone, hero().home_bed];
    const p = enterZone(wake[0], wake[1]).then(() => { if (player) player.heading += 0; saveGame(); });
    showCard({ kicker: late ? tr('You fell asleep', '잠들었어요') : tr('Good night', '잘 자요'), title: tr(`${dateLong(day)} is over`, `${dateKo(day)}이 지났어요`), body, ok: tr('Start the day', '하루 시작'), state: 'sleep' }, () => { goalTimer = 0; });
    return p;
  }

  // ---------------------------------------------------------------- cards (conversation complete, day summary)
  let cardDone = null;
  function showCard(c, then) {
    const card = $('card');
    card.querySelector('.kicker').textContent = c.kicker || '';
    card.querySelector('h2').textContent = c.title || '';
    card.querySelector('.card-body').innerHTML = c.body || '';
    card.querySelector('.ok').textContent = c.ok || tr('Continue', '계속');
    card.classList.toggle('choose', !!c.choose);          // pick one of the choices in the body before going on
    card.hidden = false;
    state = c.state || 'card';
    cardDone = then || null;
    if (!c.choose) setTimeout(() => card.querySelector('.ok').focus(), 50);
  }
  function closeCard(force) {          // force: also a card waiting for a choice (the debug API, a new game)
    if ($('card').classList.contains('choose') && !force) return;
    $('card').classList.remove('choose');
    $('card').hidden = true;
    state = 'play';
    const f = cardDone;
    cardDone = null;
    if (f) f();
  }
  $('card').querySelector('.ok').addEventListener('click', () => closeCard());

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

  // ---------------------------------------------------------------- the api a zone file's setup/update sees
  const api = {
    T, scene, camera, renderer, toon, litMaterial, shadows, packNode, addProp: (p) => addProp(p, false), toast, say, speak, play,
    get zone() { return zoneId; }, get spec() { return Z; }, get group() { return zoneGroup; }, get player() { return player; },
    get npcs() { return npcActors; }, get props() { return zoneProps; }, get game() { return G; }, get state() { return state; },
    get day() { return G ? G.day : 0; }, get minute() { return hourNow() * 60; }, isDone: (id) => !!(G && G.done[id]),
    solid: (x0, z0, x1, z1) => solids.push({ x0, z0, x1, z1 }),
    occlude: (obj) => { occluders.push(obj); occluderSet.add(obj); },     // see-through when it hides a person from the camera
    // for office/life.js (and zone files): every placed prop and tile ({ spec, holder, object }), the static solids, people
    // made like the npcs (a.holder to add, api.animate(a, dt) each frame), a way-finder (one search a frame),
    // colliders that move (circles { x, z, r } the player is pushed out of), the light and the graphics setting
    get propList() { return zoneAll; }, get solids() { return solids; }, get movers() { return movers; },
    get elapsed() { return elapsed; }, get gfx() { return gfxHigh() ? 'high' : 'low'; }, get night() { return env.night; },
    get dark() { return darkAt(hourNow() * 60); }, get solarMinute() { return solarHour(hourNow(), sunDay()) * 60; },
    get weather() { return weatherNow(); }, get hero() { return G ? G.hero : null; }, get lang() { return settings.lang; }, get weekend() { return !!G && (offWork(G.day) || dayOff(G.day)); },
    get models() { return Object.keys(window.SO_MODELS || {}); }, characters: CHARACTERS,
    shelter, get raining() { return raining(); },          // an umbrella over a person (life.js: the passers-by)
    actor: (model, opts) => makeActor((opts && opts.id) || 'extra', model, opts), animate, locomotion, gesturing, rest, glowTexture: () => glowTex,
    loadPack, packReady, findPath: (from, to, opts, cb) => requestPath(from, to, opts, cb),
    blocked: (x, z, r) => solids.some(s => x > s.x0 - r && x < s.x1 + r && z > s.z0 - r && z < s.z1 + r),
    street: (kind, at) => street(kind, at),          // life.js: a horn, jaywalking, crossing against the signal
    get date() { return seasonDate(); }, cfg: CFG          // season.js: the game's date (a Date at UTC midnight, or null) and the config
  };

  // ---------------------------------------------------------------- jogging (office/jog.js): a run round the Fairview Loop, seen through your own eyes
  // From the door of your home (story: the run takes 40 minutes of the day and some energy, and you come back home), or
  // from the title screen as a game of its own (nobody's day: a clear morning, no clock).
  let jog = null, jogTrail = null;
  async function startJog(story) {
    if (!window.SO_JOG || jog || busy) return;
    if (story) {
      if (G.energy < 15) { toast("You're too tired to run. Eat something first.", '달리기엔 너무 지쳤어요. 먼저 뭘 좀 드세요.', 'bad'); return; }
      if (G.minute >= 21.5 * 60) { toast("It's too late for a run.", '달리기엔 너무 늦었어요.'); return; }
    }
    const from = story ? { zone: zoneId, place: Object.keys(Z.places).find(p => placeKind(p) === 'door') } : null;
    const who = story ? hero() : heroOf(chosen);
    if (!story) { if (G) { saveGame(); G = null; } if (player) scene.remove(player.holder); }
    state = 'jog';
    $('title').hidden = true;
    $('side').hidden = true;
    toggleMenu(false);
    await enterZone('city', null, SO_JOG.route.pts[0]);
    state = 'jog';
    if (player) player.holder.visible = false;
    marker.group.visible = false;
    jog = SO_JOG.create(Object.assign(Object.create(api), {
      place(x, z, heading) { if (player) { player.pos.set(x, 0, z); player.heading = heading; } cam.pos.copy(camera.position); cam.look.set(x, 0.7, z); }
    }), {
      name: who.name, model: who.model, voice: voiceOf(NPCS[who.id] || { id: who.id, model: who.model }),
      onEnd(result, again) {
        jog = null;
        if (player) player.holder.visible = true;
        resize();
        if (story && result) {
          advanceMinutes(40);
          G.energy = clamp(G.energy - 12, 0, E_MAX);
          logEvent('jog', `Jog: ${result.time.toFixed(2)} s, ${result.score} points`, 0, { time: result.time, score: result.score });
        }
        if (again && (!story || (G.energy >= 15 && G.minute < 21.5 * 60))) { state = story ? 'play' : 'title'; startJog(story); return; }
        if (story) {
          state = 'play';
          enterZone(from.zone, from.place).then(() => {
            $('side').hidden = false;
            if (result) toast(`Good run: ${result.time.toFixed(2)} s. You feel great.`, `잘 달렸어요: ${result.time.toFixed(2)}초. 기분이 상쾌해요.`, 'good', 4);
            saveGame();
          });
        } else showTitle();
      }
    });
  }

  // ---------------------------------------------------------------- the life of a zone (office/life.js): cars, passers-by, traffic lights, trees
  let life = null, lifePaused = false, lifeBroken = false, lifeMs = 0;
  function startLife() {
    endLife();
    if (!window.SO_LIFE || !Z || lifeBroken) return;
    try { life = window.SO_LIFE.create(api); } catch (e) { console.error('Sim Office life:', e); life = null; }
  }
  function endLife() {
    if (!life) return;
    try { life.dispose(); } catch (e) { console.error('Sim Office life:', e); }
    life = null;
    movers.length = 0;
  }
  function lifeTick(dt) {
    if (!life || lifePaused) return;
    const t0 = performance.now();
    try { life.update(dt); } catch (e) { console.error('Sim Office life:', e); lifeBroken = true; endLife(); }
    lifeMs += (performance.now() - t0 - lifeMs) * 0.05;
  }

  // ---------------------------------------------------------------- the season in the scenery (office/season.js): autumn colours, bare trees, fallen leaves, holiday lights
  // Made with the life of a zone (and again when the graphics setting changes) for the game's date; debug.season(iso)
  // shows another date (also on the title screen and the tour, which have none).
  let season = null, seasonGfx = null, seasonForce = null;
  const seasonDate = () => seasonForce || (G ? dateOf(G.day) : null);
  function startSeason() {
    endSeason();
    if (!window.SO_SEASON || !Z) return;
    seasonGfx = gfxHigh();
    try { season = window.SO_SEASON.create(api); } catch (e) { console.error('Sim Office season:', e); season = null; }
  }
  function endSeason() {
    if (!season) return;
    try { season.dispose(); } catch (e) { console.error('Sim Office season:', e); }
    season = null;
  }
  function seasonTick(dt) {
    if (!season) return;
    if (seasonGfx !== gfxHigh()) { startSeason(); return; }
    try { season.update(dt); } catch (e) { console.error('Sim Office season:', e); endSeason(); }
  }

  // ---------------------------------------------------------------- frame loop
  const timer = new T.Timer();
  let elapsed = 0, debugSpeed = 1, fastMode = false;
  function frame() {
    timer.update();
    const dt = Math.min(timer.getDelta(), 0.1);
    elapsed += dt;
    if (state === 'play' && !busy && G) tickClock(dt);
    pathTick();
    playerTick(dt);
    npcTick(dt, elapsed);
    lifeTick(dt);
    seasonTick(dt);
    portalTick();
    if (Z && Z.update) { try { Z.update(api, dt); } catch (e) { console.error(`zones/${zoneId}.js update:`, e); Z.update = null; } }
    if ((goalTimer -= dt) <= 0 && G) { goalTimer = 0.5; if (state === 'play' && !busy) { refreshNpcs(false); checkPhone(); friendTick(); } updateGoal(); }
    wetTick(dt);
    if ((actTimer -= dt) <= 0) { actTimer = 0.12; actions = computeActions(); renderActions(); }
    if ((hudTimer -= dt) <= 0) { hudTimer = 0.25; hud(); }
    if (panelKind === 'map' && !panel.hidden && (mapTimer -= dt) <= 0) { mapTimer = 0.5; drawMap(); }     // people move while the map is open
    envTick(dt);
    markerTick(elapsed);
    if (jog) jog.update(dt); else cameraTick(dt);
    if (window.SO_JOG && !jog) SO_JOG.sea.near(Z && zoneId === 'city' && player && state !== 'title' ? player.pos.z : -99);          // the surf, south of town
    placeBubbles();
    placeTags();
    walkSignTick();
    renderer.render(scene, camera);
    if (state === 'title') renderPreview(dt);
  }

  // ---------------------------------------------------------------- start: zone files, character models, title
  let ready = false;
  async function boot() {
    window.SO_ZONES = window.SO_ZONES || {};
    try { await loadScript('zones/index.js'); } catch (e) { /* no zone files yet */ }
    window.SO_ZONES = window.SO_ZONES || {};
    zoneFiles = Array.isArray(window.SO_ZONE_FILES) ? window.SO_ZONE_FILES.slice() : [];
    const missing = [];
    await Promise.all(zoneFiles.map(z => loadScript(`zones/${z}.js`).catch(() => missing.push(z))));
    const all = Array.from(new Set(zoneFiles.concat(Object.keys(BUILTIN_PLACES))));
    const generated = all.filter(z => !window.SO_ZONES[z]);
    if (generated.length) console.warn(`Sim Office: no zone file for ${generated.join(', ')}; using generated rooms`);
    ZONE_ORDER.push(...all);
    applyQuality();
    renderer.setAnimationLoop(frame);
    await Promise.all(CHARACTERS.map(loadPack));
    reportMissing();
    markChosen();
    const btn = $('new-game');
    btn.disabled = false;
    btn.textContent = tr('New game', '새 게임');
    showTitle();
    newGameLabel();
    ready = true;
    enterZone('city').catch(e => console.error(e));        // the backdrop behind the title
  }
  const ZONE_ORDER = [];
  boot().catch(e => { console.error(e); $('new-game').textContent = tr('Could not start', '시작할 수 없어요'); });

  // ---------------------------------------------------------------- for tests (headless Chrome): SO.debug
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  async function until(cond, ms) { for (let t = 0; t < (ms || 5000); t += 50) { if (cond()) return true; await wait(50); } return false; }
  function nearSpot(ep) {           // where to stand to talk: in front of the person
    const pid = isPhone(ep) ? ep.place : npcPlaceNow(npcRow(ep.npc)) || ep.place;
    return { zone: zoneOfPlace(pid), pid };
  }
  function debugPath(from, to, opts) {          // the way between two points and whether it crosses anything solid
    const p = findPath(from, to, opts || {}), g = navGrid(), bad = [];
    if (p) for (let i = 1; i < p.length; i++) {
      const a = p[i - 1], b = p[i], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / (NAV_CELL * 0.5));
      for (let j = 0; j < n; j++) {
        const x = a[0] + (b[0] - a[0]) * j / n, z = a[1] + (b[1] - a[1]) * j / n;
        const ci = Math.floor((x - g.x0) / NAV_CELL), ck = Math.floor((z - g.z0) / NAV_CELL);
        if (ci >= 0 && ck >= 0 && ci < g.nx && ck < g.nz && g.block[ck * g.nx + ci]) bad.push([+x.toFixed(2), +z.toFixed(2)]);
      }
    }
    return { path: p && p.map(q => [+q[0].toFixed(2), +q[1].toFixed(2)]), crosses: bad.slice(0, 5) };
  }
  const debug = {
    path: debugPath,
    get ready() { return ready; }, get state() { return state; }, get busy() { return busy; },
    get day() { return G ? G.day : null; }, get time() { return G ? hhmm(G.minute) : null; }, get minute() { return G ? G.minute : null; },
    get money() { return G ? G.money : null; }, get energy() { return G ? Math.round(G.energy * 10) / 10 : null; }, get zone() { return zoneId; },
    get zones() { return ZONE_ORDER.slice(); }, get save() { return G ? JSON.parse(JSON.stringify(G)) : lastSave(); }, get saves() { return savedGames().map(g => g.name); },
    get actions() { return actions.map(a => a.label); }, get npcs() { return Object.keys(npcActors).filter(id => !npcActors[id].leaving); },
    get walking() { return Object.keys(npcActors).filter(id => npcActors[id].walk); },
    get models() { const o = {}; Object.keys(packs).forEach(k => { o[k] = packs[k].status; }); return o; },
    set speed(v) { debugSpeed = +v || 1; }, set fast(v) { fastMode = !!v; },
    get gfx() { return gfxHigh() ? 'high' : 'low'; }, set gfx(v) { settings.gfx = v === 'low' ? 'low' : 'high'; applyQuality(); },
    get hero() { return G ? G.hero : null; }, get heroes() { return HEROES.map(h => h.id); },
    // the language of the screen, the score and the work record; wrong(n) picks the n-th wrong answer of the turn on screen
    get lang() { return settings.lang; }, set lang(v) { settings.lang = v === 'ko' ? 'ko' : 'en'; langBox.value = settings.lang; saveSettings(); applyLang(); },
    get mission() { return G ? { count: missionCount(), state: G.mission || null, free: freePlay() } : null; },
    get score() { return score(); }, get work() { return G ? JSON.parse(JSON.stringify(work())) : null; }, get standing() { return standing()[0]; },
    get choices() { return Array.from(dlg.querySelectorAll('.choices button')).map(b => b.textContent); },
    wrong(n) { if (!talk) return null; const i = talk.order.filter(x => x >= 0)[n || 0]; pick(i); return dlg.querySelector('.feedback').textContent; },
    tour: { async start() { await startTour(); return state; }, do(what) { tourDo(what); return Object.assign({}, tour); }, get view() { return Object.assign({}, tour); }, get ref() { return tour; } },
    // the jogging game: jog.start(story) and what a run says about itself; jog.press(0 | 1) steps, jog.auto(n) lands the next n steps on the beat
    jog: {
      async start(story) { await startJog(!!story); return !!jog; },
      get on() { return !!jog; }, get state() { return jog ? jog.state : null; },
      press(foot) { if (jog) jog.press(foot); },
      stop() { if (jog) jog.stop(); },
      records() { return window.SO_JOG ? SO_JOG.records() : null; }
    },
    voice(id) { const p = voiceFor(voiceOf(NPCS[id] || {})); return { name: p.voice ? p.voice.name : null, shift: p.shift }; },
    async start(heroId) {          // a new game as that hero (anything else: the first hero)
      await until(() => ready, 20000);
      if (talk) endTalk();
      $('card').hidden = true; panel.hidden = true;
      await startGame(newGame(heroId), true);
      return true;
    },
    async goto(zone, placeId) {
      if (!G) await this.start();
      if (talk) endTalk();
      if (!$('card').hidden) closeCard(true);
      if (!panel.hidden) closePanel();
      state = 'play';
      await enterZone(zone, placeId || null);
      return zoneId;
    },
    episodes() { return openEpisodes().map(e => e.id); },
    // walk: true lets people walk to where the new time puts them (as when the clock runs), instead of placing them there
    setTime(t, walk) { if (G) { G.minute = typeof t === 'number' ? t : hm(t, G.minute); goalTimer = 0; npcSig = ''; refreshNpcs(!walk); } return this.time; },
    // send someone in this zone walking to a place (as when an episode moves them); returns the path length or null
    walk(id, placeId) {
      const a = npcActors[id], pl = Z && Z.places[placeId];
      if (!a || !pl) return null;
      a.place = placeId;
      a.goal = { at: pl.at, home: pl.face ? Math.atan2(pl.face[0] - pl.at[0], pl.face[1] - pl.at[1]) : a.heading, sit: !!pl.sit, place: placeId };
      walkTo(a, pl.at);
      return true;
    },
    where(id) { const a = npcActors[id]; return a ? { at: [+a.pos.x.toFixed(2), +a.pos.z.toFixed(2)], walking: !!a.walk, sit: a.sit, anim: a.current ? a.current.getClip().name : null, cup: !!a.cup } : null; },
    // the zone's background life: counts, and paused (settable) to freeze it for screenshots
    life: {
      get paused() { return lifePaused; }, set paused(v) { lifePaused = !!v; },
      get cars() { return life && life.info ? life.info().cars : 0; }, get walkers() { return life && life.info ? life.info().walkers : 0; },
      get sitters() { return life && life.info ? life.info().sitters : 0; }, get signal() { return life && life.info ? life.info().signal : null; },
      get ms() { return +lifeMs.toFixed(3); },          // average time of one update (ms)
      info() { return life && life.info ? life.info() : null; }
    },
    setDay(d) { if (G) { G.day = +d; goalTimer = 0; refreshNpcs(true); } return G && G.day; },
    // the season in the scenery: season() what it shows here now, season('2026-12-15') as on that date, season(null) back to the game's date
    season(iso) { if (iso !== undefined) { seasonForce = iso ? new Date(iso + 'T00:00:00Z') : null; startSeason(); } return season ? season.info() : null; },
    async startEpisode(id) {
      const ep = (G && episodes().find(e => e.id === id)) || EPISODES[id];          // today's version (a video call on a remote day)
      if (!ep) throw new Error('no episode ' + id);
      if (!G) await this.start();
      if (!$('card').hidden) closeCard(true);
      if (!panel.hidden) closePanel();
      if (talk) endTalk();
      state = 'play';
      const s = nearSpot(ep);
      if (s.zone && !placeIn(s.pid, zoneId)) await enterZone(s.zone, s.pid);
      npcSig = '';
      refreshNpcs(true);
      if (isPhone(ep)) {
        const at = (Z.places[ep.place] || { at: [0, 0] }).at;
        player.pos.set(at[0], 0, at[1]);
        collide(player.pos, true);
        beginEpisode(ep, null);
        return state;
      }
      await until(() => npcActors[ep.npc] || !npcRow(ep.npc), 3000);
      const a = npcActors[ep.npc];
      if (a) {
        const spot = freeSpot(a, 0.9);
        collide(spot, true);
        player.pos.copy(spot);
        player.heading = Math.atan2(a.pos.x - spot.x, a.pos.z - spot.z);
        cam.ready = false;
      }
      beginEpisode(ep, a || null);
      return state;
    },
    // finish what is on screen now: answer the turn with the model answer, continue, or close a card or panel
    async advance() {
      if (state === 'talk' && talk) {
        if (!dlg.classList.contains('answered')) answered();
        await until(() => !dlg.querySelector('.next').hidden, 4000);
        dlg.querySelector('.next').click();
        await wait(60);
        return 'turn';
      }
      if (taskNow && taskNow.picked == null) { chooseTask(bestChoice(taskNow.t)); return 'task'; }
      if (!$('card').hidden) { closeCard(true); await wait(60); return 'card'; }
      if (!panel.hidden) { closePanel(); return 'panel'; }
      return state;
    },
    async autoplayEpisode(id) {
      if (!(talk && talk.ep.id === id)) await this.startEpisode(id);
      for (let i = 0; i < 30 && (state === 'talk' || state === 'card'); i++) await this.advance();
      return !!(G && G.done[id]);
    },
    async sleep() {
      if (!G) return false;
      if (talk) endTalk();
      if (!panel.hidden) closePanel();
      if (!$('card').hidden) closeCard(true);
      state = 'play';
      await goToSleep(false);
      await until(() => !busy, 8000);
      return G.day;
    },
    buy(itemId) { return buy(itemId); }, card: cardDebug,
    // the phone, the bus, the rain: what has arrived, when the next bus leaves, how wet you are
    get inbox() { return G ? inbox() : []; }, get unread() { return unread(); }, checkPhone() { checkPhone(); return unread(); },
    reply(msgId, replyId) { return replyTo(msgId, replyId); }, get replied() { return G ? Object.assign({}, G.replied) : {}; }, get later() { return G ? (G.later || []).slice() : []; },
    get sun() { const s = sunOf(G ? G.day : 1); return s ? { rise: hhmm(s.rise), set: hhmm(s.set), dark: darkAt(hourNow() * 60), solar: +solarHour(hourNow(), sunDay()).toFixed(2) } : null; },
    get radio() { return G ? radioShow() : []; }, tv(id, live) { return tvOn(id, !!live) && (renderPanel(), true); }, get tvNow() { return Object.assign({ file: fileMode, src: tvNow.id ? tvEmbed(TV.find(x => x.id === tvNow.id), tvNow.live) : null }, tvNow); }, get clean() { return cleanClothes(); }, set clean(v) { if (G) G.clean = +v; }, laundry() { return doLaundry(); },
    get street() { return G ? Object.assign({}, G.street) : {}; }, get walkSign() { return life && life.walkSign ? life.walkSign() : null; },
    get mail() { return G ? myMail().map(m => ({ id: m.id, day: m.day, kind: m.kind, fresh: !(G.mailGot || {})[m.id] })) : []; }, get newMail() { return newMail().length; },
    get date() { return G ? dateLong(G.day) : null; }, get holiday() { const h = G && holidayOf(G.day); return h ? h.name : null; },
    // the calendar rules for any day: payday, rent, bills, the company's days off, holiday hours, the weather
    rules: (d) => ({ date: isoOf(d), payday: isPayday(d), rent: isRentDay(d), bills: billsDue(d).map(b => b.id), off: offWork(d), company: companyOff(d), hours: holidayHours(d).map(x => [x.id, x.h]), weather: weatherOf(d) }),
    npcAt: (id) => { const n = npcRow(id); return n ? npcPlaceNow(n) : null; }, setDay: (d) => { if (G) G.day = d; },
    workHour() { workHour(); return { minute: Math.floor(G.minute), worked: workedOn(G.day), task: taskNow ? taskNow.t.id : null }; },
    worked: (d) => workedOn(d == null ? G.day : d), get taskLog() { return G ? (G.taskLog || []).slice() : []; },
    task(id) { const t = id ? TASKS.find(x => x.id === id) : pickTask(); if (t) showTask(t); return t ? t.id : null; },          // show a task card (or try the dice)
    pick(i) { return chooseTask(i == null && taskNow ? bestChoice(taskNow.t) : +i); }, week: (d) => weekStats(d == null ? G.day : d),
    get review() { return G && G.review ? Object.assign({}, G.review) : null; }, set review(v) { if (G) G.review = v; }, reviewScore(from, to) { return reviewScore(from || 1, to || G.day, 0); }, get netPay() { return netPay(); },
    get leave() { return G ? JSON.parse(JSON.stringify(leave())) : null; }, leaveOf: (d) => leaveOf(d == null ? G.day : d),
    // benefits: the save's G.benefits with the plans in effect today and from the start date; enroll(choice?) submits the draft or 'plan+plan+plan';
    // draft(planId) picks one in the portal; set401k(pct); payStub(day?) and the helpers for the pharmacy and the clinic, planOf(day?), copayFor(kind, day?)
    get benefits() { return G ? Object.assign(JSON.parse(JSON.stringify(benefits())), { now: plansOn(G.day), from: plansOn(COVER_FROM), pct: k401On(nextPayday(G.day)), open: enrollOpen(G.day), on: benefitsOn() }) : null; },
    enroll(choice) { return enroll(choice); }, draft(id) { if (!G || !PLAN[id] || !enrollOpen(G.day)) return false; draftOf()[PLAN[id].kind] = id; return true; }, set401k(p) { return set401k(p); },
    payStub(d) { return G ? payStub(d == null ? G.day : +d) : null; }, planOf(d) { return planOf(d); }, copayFor(kind, d) { return copayFor(kind, d); },
    callInSick() { return callInSick(); }, requestPto(d) { return requestPto(d); }, cancelPto(d) { return cancelPto(d); }, ptoDays() { return ptoDays(); },
    // hybrid work: is a day remote, where you are with logging in today (null | out | in | office | away | off), log in or off at the desk at home
    remote: (d) => remoteDay(d == null ? G.day : d), get hybrid() { return { from: HYBRID_FROM, days: REMOTE_DAYS.slice(), people: REMOTE_PEOPLE.slice() }; },
    get login() { return G ? { remote: remoteDay(G.day), state: loginState(), login: loginToday() ? Object.assign({}, loginToday()) : null, inAt: G.inDay === G.day ? G.inAt : null, home: !!(work().home || {})[G.day] } : null; },
    logIn() { return logIn(); }, logOff() { return logOff(); },
    // the pharmacy and the clinic: health (G.health), fallIll('cold' | 'flu', n days in), care() (what is open now), illChance(day), careCopay(kind), flushot()
    get health() { return G ? JSON.parse(JSON.stringify(health())) : null; }, fallIll(kind, n) { return G ? fallIll(kind, n) : null; }, care() { return G ? episodes().filter(e => isErrand(e) && isOpen(e)).map(e => e.id) : []; },
    illChance: (d) => illChance(d == null ? G.day : d), illRoll: (d) => illRoll(d == null ? G.day : d),
    careCopay: (k) => careCopay(k), flushot() { return fluShot('pharmacy'); },
    routines: (d) => routinesOn(d == null ? G.day : d).map(x => ({ id: x.r.id, ep: x.ep.id, time: x.r.time, done: !!(G.rdone && G.rdone[x.key]) })),
    // coworkers: closeness ({ id: { pts, level, last } }), friend(id, pts) reads or sets one, invite(id) texts an
    // invitation to lunch now, chatWith(id) is Chat with someone here, lunch(pid) has lunch where they are, friendTick()
    get friends() { return G ? friendsView() : {}; }, friend(id, pts) { if (pts != null && isPal(id)) bond(id).pts = clamp(+pts, 0, 100); return closeness(id); },
    invite(id) { return G ? inviteLunch(id || null, true) : null; }, chatWith(id) { const a = npcActors[id]; if (!a) return null; chatter(a); return closeness(id); },
    lunch(pid) { const x = G ? lunchActions(pid || 'office_kitchen')[0] : null; return x ? x.run() : false; }, friendTick() { friendTick(); return G ? JSON.parse(JSON.stringify(friends())) : null; },
    nextBus(min) { const t = G ? nextBus(min == null ? G.minute : min) : null; return t == null ? null : hhmm(t); }, ride(pid) { return ride(pid); },
    buses: (d) => busDay(d == null ? (G ? G.day : 1) : d).map(b => ({ time: hhmm(b.t), late: b.late, full: b.full, at: hhmm(b.at), board: hhmm(b.board), why: b.why })),
    get wet() { return G ? +(G.wet || 0).toFixed(2) : 0; }, set wet(v) { if (G) G.wet = +v; }, get raining() { return raining(); }, get rainSound() { return rainSound.level; },
    get umbrellas() { return Object.values(npcActors).concat(player ? [player] : []).filter(a => a.brolly && a.brolly.visible).map(a => a.id); },
    // the kitchen: the packages in the bag, the recipes that can be made now, cook(recipeId), eat(itemId), toss(n)
    get lots() { return G ? lots().map(l => Object.assign({ bestBy: bestBy(l), gone: gone(l) }, l)) : []; }, get recipes() { return G ? RECIPES.filter(canCook).map(r => r.id) : []; },
    cook(id) { return cook(id); }, eat(id) { return eat(id); }, toss(n) { toss(n); return G.lots.length; },
    get punch() { return G ? Object.assign({}, G.punch) : {}; }, pay(amount, text) { pay(+amount, text || 'Test'); return G.money; },
    arrive(z, place) { return travel(z, place); },
    panel(kind, arg) { if (kind) openPanel(kind, arg); else if (!panel.hidden) closePanel(); return state; },
    mapTab(t) { MAP.tab = t === 'room' ? 'room' : 'town'; if (panelKind === 'map') renderPanel(); return MAP.tab; },
    closeCard() { if (!$('card').hidden) closeCard(true); if (!panel.hidden) closePanel(); return state; },
    reset() { resetGame(); store.del(SET_KEY); return true; },
    // what stands between the player and the camera (for tuning zone files)
    blockers() {
      if (!player) return [];
      const from = new T.Vector3(player.pos.x, 0.9, player.pos.z), sx = Math.sin(player.heading), sz = Math.cos(player.heading);
      return [[2.6, 1.55], [3.3, 1.85]].map(([b, h]) => {
        const to = new T.Vector3(player.pos.x - sx * b, h, player.pos.z - sz * b);
        inRoom(to);
        const d = to.clone().sub(from), l = d.length();
        ray.set(from, d.normalize()); ray.far = l;
        const hit = ray.intersectObjects(occluders, true)[0];
        if (!hit) return null;
        let o = hit.object, spec = null;
        while (o && !spec) { const rec = Object.values(zoneProps).find(r => r.holder === o); if (rec) spec = rec.spec; o = o.parent; }
        const holder = occluders.find(h => { let q = hit.object; while (q) { if (q === h) return true; q = q.parent; } return false; });
        return { dist: +hit.distance.toFixed(2), mesh: hit.object.name, at: holder ? [+holder.position.x.toFixed(2), +holder.position.z.toFixed(2)] : null };
      });
    }
  };
  window.SO = { debug, api, keys };
})();

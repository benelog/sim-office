/* Sim Office: the engine. A flat open world made of zones (office/zones/<zone>.js, window.SO_ZONES), people and
   conversations from the game database (office/data/db.js, window.SO_DB, pulled from DoltHub), and models (Kenney
   props, Quaternius people) packed as base64 .glb (office/models/<pack>.js, window.SO_MODELS). See office/PLAN.md for the rules and the specs.
   Runs from file:// : every file is a plain <script>, nothing is fetched. Missing zone files or model packs fall back
   to generated rooms and boxes, so the engine runs on its own. */
(function () {
  'use strict';
  const T = window.THREE, M = window.LP_MATCHER;
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

  // ---------------------------------------------------------------- the rules (config table, with defaults)
  const CFG = Object.assign({
    player_name: 'Jun', company: 'Seaside Labs', city: 'Fairview', start_money: 1200, salary_net: 2600, salary_gross: 3654,
    payday_days: '5,15', rent: 1450, rent_day: 21, bus_fare: 2.5, day_start: '07:00', day_end: '23:00', work_start: '09:00', work_end: '18:00',
    minutes_per_second: 1, energy_max: 100, energy_per_hour: -6,
    sales_tax: 0.0825, tip_options: '0,15,18,20', tip_default: 18,
    start_date: '', bus_every: 0, bus_every_weekend: 0, bus_first: '06:00', bus_last: '22:30', overdraft_fee: 0, low_balance: 0,
    punch_card_place: '', punch_card_every: 0, late_after: '09:15', rain_energy_per_hour: -10, bank_name: 'Fairview Credit Union'
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
  const mine = (r) => (r.hero || DEFAULT_HERO) === (G ? G.hero : DEFAULT_HERO);          // a row of the hero you play
  const episodes = () => rows('episodes').filter(mine), calendar = () => rows('calendar').filter(mine);
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
  const HOLIDAYS = {};
  rows('holidays').forEach(h => { HOLIDAYS[h.date] = h; });
  const holidayOf = (d) => { const t = dateOf(d); return (t && HOLIDAYS[t.toISOString().slice(0, 10)]) || null; };
  const dayOff = (d) => { const h = holidayOf(d); return !!h && h.kind === 'federal'; };
  const MESSAGES = rows('messages').slice().sort((a, b) => (a.day - b.day) || (hm(a.time, 0) - hm(b.time, 0)));
  const REPLIES = rows('replies').slice().sort((a, b) => (a.sort || 0) - (b.sort || 0));
  const MAIL = rows('mail').slice().sort((a, b) => a.day - b.day);
  const builtinZoneOf = (id) => Object.keys(BUILTIN_PLACES).find(z => BUILTIN_PLACES[z].includes(id)) || null;
  function place(id) {
    const owner = HEROES.find(h => h.desk === id);
    if (owner && PLACES[id]) {
      const me = owner.id === (G ? G.hero : DEFAULT_HERO);
      return Object.assign({}, PLACES[id], me ? { name: 'Your desk', name_ko: '내 자리' } : { name: `${owner.name}'s desk`, name_ko: `${owner.name}의 자리` });
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
  const settings = Object.assign({ voice: true, ko: false, mode: 'type' }, store.get(SET_KEY) || {});
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

  // ---------------------------------------------------------------- page chrome
  const koBox = $('ko-on'), voiceBox = $('voice-on');
  koBox.checked = !!settings.ko;
  voiceBox.checked = settings.voice !== false;
  const applyKo = () => document.body.classList.toggle('ko-on', koBox.checked);
  koBox.addEventListener('change', () => { settings.ko = koBox.checked; saveSettings(); applyKo(); });
  voiceBox.addEventListener('change', () => { settings.voice = voiceBox.checked; saveSettings(); if (!voiceBox.checked && window.speechSynthesis) speechSynthesis.cancel(); });
  applyKo();
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
    d.innerHTML = esc(en) + (ko ? `<span class="ko">${esc(ko)}</span>` : '');
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
    if (b) b.textContent = 'Graphics: ' + (high ? 'High' : 'Low');
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
      addTag(p.label || ('To ' + zoneName(p.to)[0]), new T.Vector3(p.at[0], 1.1, p.at[1]), 'portal', 14, p.label_ko || ('→ ' + zoneName(p.to)[1]));
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
    busy = false;
    setTimeout(() => $('fade').classList.remove('on'), 60);
    if (G) { G.zone = z; saveGame(); }
    goalTimer = 0; actTimer = 0;
    return true;
  }
  const portalMat = new T.MeshBasicMaterial({ color: 0x3fb5ad, transparent: true, opacity: 0.35, depthWrite: false, toneMapped: false });

  // ---------------------------------------------------------------- environment: sun, sky and street lamps by the clock outdoors; window and ceiling light indoors
  // Outdoors the clock drives everything: the sun rises in the east (+x) at 06:00, stands in the south (+z) at noon
  // and sets in the west at 18:30; from dusk the moon (blue, from the south-west) takes over and the street lamps
  // (roads light-square / light-curved props) glow, lighting the ground with a few point lights that follow you.
  // Indoors the light does not change with the clock: a window light (from the side with the most windows) with
  // the one shadow map, ceiling lights (the zone's lights, or a grid), a warm fill; only the backdrop darkens at night.
  // The weather (weather table, one row a game day): clouds over the sky, a dimmer sun with softer shadows, rain
  // (on and off through a rainy day) and morning fog. Temperatures in Fahrenheit, highest at about 3 PM.
  const WX_NAME = { clear: 'Sunny', partly: 'Partly cloudy', cloudy: 'Cloudy', rain: 'Rain', fog: 'Fog' };
  const WX_NAME_KO = { clear: '맑음', partly: '구름 조금', cloudy: '흐림', rain: '비', fog: '안개' };
  const WX_ICON = { clear: '☀️', partly: '⛅', cloudy: '☁️', rain: '🌧️', fog: '🌫️' };
  const toC = (f) => Math.round((f - 32) * 5 / 9);
  const weatherOf = (day) => WEATHER.length ? WEATHER[(Math.max(1, day) - 1) % WEATHER.length] : { day, kind: 'clear', high_f: 72, low_f: 55, forecast: '' };
  function weatherNow() {
    const day = G ? G.day : 1, h = hourNow(), w = weatherOf(day), k = !G && state === 'tour' && tour.wx ? tour.wx : w.kind;
    const rain = k === 'rain' ? clamp((0.5 + 0.62 * Math.sin(h * 1.3 + day * 2.1)) * 1.6, 0, 1) : 0;
    const fogged = k === 'fog' ? clamp((11 - h) / 2, 0, 1) : 0;
    const cover = k === 'rain' ? 1 : k === 'cloudy' ? 0.92 : k === 'partly' ? 0.45 : k === 'fog' ? Math.max(0.3, fogged * 0.8) : 0.1;
    const temp = Math.round(w.low_f + (w.high_f - w.low_f) * Math.max(0, Math.sin(Math.PI * (h - 5) / 20)));
    return { kind: k, rain, fog: fogged, cover, dark: k === 'rain' ? 0.6 + 0.4 * rain : k === 'cloudy' ? 0.35 : 0, temp, high: w.high_f, low: w.low_f, row: w };
  }
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
    const e = envAt(hourNow()), wx = weatherNow(), day = 1 - e.night;
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
  function scheduledPlace(n) {
    const list = SCHEDULE[n.id];
    if (!list || !G) return n.place;
    const days = isWeekend(G.day) ? 'weekend' : 'weekday';
    const onDay = (d) => { const m = /^(\d+)(?:-(\d+))?$/.exec(d); return m ? G.day >= +m[1] && G.day <= +(m[2] || m[1]) : d === 'all' || d === days; };      // '11-12': those game days
    const s = list.find(s => onDay(String(s.days)) && G.minute >= hm(s.time_from, 0) && G.minute < hm(s.time_to, 1440));
    return s ? s.place : null;
  }
  function npcPlaceNow(n) {
    if (!G) return scheduledPlace(n);
    const open = openEpisodes().filter(e => e.place);
    // their own conversation first; otherwise one they have a line in (a meeting: everybody who speaks is in the room,
    // also round the phone of a call), if it is in the building they work in (not the client on the screen)
    const ep = open.find(e => e.npc === n.id && !isPhone(e))
      || open.find(e => e.npc !== n.id && (SPEAKERS[e.id] || []).includes(n.id) && n.place && zoneOfPlace(n.place) === zoneOfPlace(e.place) && scheduledPlace(n) && zoneOfPlace(scheduledPlace(n)) === zoneOfPlace(e.place));
    return ep ? ep.place : scheduledPlace(n);
  }
  // opening hours (config hours_<zone or place>, hours_<…>_weekend: 'HH:MM-HH:MM'); never closed while a conversation waits there
  function hoursOf(id) {
    const v = G && ((isWeekend(G.day) && CFG['hours_' + id + '_weekend']) || CFG['hours_' + id]);
    const m = /^(\d{1,2}:\d{2})-(\d{1,2}:\d{2})$/.exec(String(v || ''));
    return m ? [hm(m[1], 0), hm(m[2], 1440)] : null;
  }
  function closedNow(id) {
    const h = hoursOf(id);
    if (!h || (G.minute >= h[0] && G.minute < h[1])) return false;
    return !openEpisodes().some(e => e.place === id || zoneOfPlace(e.place) === id);
  }
  const hoursText = (id) => { const h = hoursOf(id); return h ? `${clock(h[0])} – ${clock(h[1])}` : ''; };
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
  const dayIn = (ep) => (ep.day_from == null || G.day >= ep.day_from) && (ep.day_to == null || G.day <= ep.day_to);
  // a place id can be in more than one zone (office_door is outside and inside): the zone's own places come first
  function placeIn(pid, z) { const sp = zoneSpec(z).places[pid]; return (!!sp && !sp.guessed) || zoneOfPlace(pid) === z; }
  function isOpen(ep) {
    if (!G || G.done[ep.id]) return false;
    if (ep.day_from != null && G.day < ep.day_from) return false;
    if (ep.day_to != null && G.day > ep.day_to) return false;
    if (G.minute < hm(ep.time_from, 0) || G.minute > hm(ep.time_to, 1439) + 0.999) return false;
    return listOf(ep.requires).every(id => G.done[id]);
  }
  function laterToday(ep) {        // not open yet, but will be later today
    if (!G || G.done[ep.id] || isOpen(ep)) return false;
    if (ep.day_from != null && G.day < ep.day_from) return false;
    if (ep.day_to != null && G.day > ep.day_to) return false;
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
  const receipt = (b) => (b.free ? 'free with your punch card' : usd2(b.price)) + (b.tax ? ` + tax ${usd2(b.tax)}` : '') + (b.tip ? ` + tip ${usd2(b.tip)}` : '') + (b.tax || b.tip ? ` = ${usd2(b.total)}` : '');
  // Bills on autopay (bills table): due on their day, then every `every` days
  const billsDue = (d) => rows('bills').filter(b => d >= b.day && (d - b.day) % (+b.every || 30) === 0);

  // ---------------------------------------------------------------- the phone: texts, emails, voicemails and alerts
  // Messages (messages table) arrive when the clock passes their day and time, the bank's alerts (notify) when
  // something happens to the account. Kept in the save: G.got { id: 1 unread | 2 read }, G.notes [{ day, minute,
  // sender, kind, body, body_ko, read }]. Menu > Phone (P) lists them, newest first.
  const MSG_KIND = { text: 'Text', email: 'Email', voicemail: 'Voicemail', alert: 'Alert' };
  const senderName = (id) => NPCS[id] ? NPCS[id].name : String(id || '');
  const myMessages = () => MESSAGES.filter(m => (!m.hero || m.hero === 'all' || m.hero === G.hero) && m.sender !== G.hero);
  const unread = () => !G ? 0 : myMessages().filter(m => (G.got || {})[m.id] === 1).length + (G.notes || []).filter(n => !n.read).length;
  const sound = (function () {          // small sounds made with Web Audio (no files): the phone's chime
    let ctx = null, failed = false;
    function context() {
      if (!ctx && !failed) { try { const A = window.AudioContext || window.webkitAudioContext; if (A) ctx = new A(); else failed = true; } catch (e) { failed = true; } }
      if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
      return ctx;
    }
    function tone(freq, at, dur, vol) {
      const c = context();
      if (!c || c.state !== 'running') return;
      try {
        const o = c.createOscillator(), g = c.createGain(), t = c.currentTime + at;
        o.type = 'sine'; o.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); g.connect(c.destination);
        o.start(t); o.stop(t + dur + 0.02);
      } catch (e) { /* no sound */ }
    }
    return { context, chime() { tone(1318.5, 0, 0.22, 0.07); tone(1760, 0.11, 0.3, 0.06); },
      ring() { [0, 0.5, 1.4, 1.9].forEach(t => { tone(440, t, 0.4, 0.05); tone(480, t, 0.4, 0.05); }); } };
  })();
  function phoneBadge() {
    const n = unread(), b = $('menu-btn'), p = document.querySelector('#menu button[data-open="phone"]');
    if (n) b.dataset.n = n > 9 ? '9+' : String(n); else delete b.dataset.n;
    if (p) p.textContent = n ? `Phone (${n})` : 'Phone';
  }
  let hush = false;                // overnight the alerts arrive without a sound: the morning card tells
  function ping(sender, kind, text, ko) {
    if (state !== 'play' || hush) return;
    const short = String(text).length > 84 ? String(text).slice(0, 82).replace(/\s+\S*$/, '') + '…' : String(text);
    toast(kind === 'voicemail' ? `📞 Missed call from ${senderName(sender)}. Voicemail: ${short}` : `📱 ${MSG_KIND[kind] || 'Message'} from ${senderName(sender)}: ${short}`, ko && String(ko).length > 70 ? String(ko).slice(0, 68) + '…' : ko, 'phone', 6);
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
    if (fresh) ping(fresh.sender, fresh.kind, fresh.subject || personal(fresh.body), fresh.subject ? '' : fresh.body_ko);
    phoneBadge();
  }
  function inbox() {               // everything that has arrived, newest first
    const got = G.got || {};
    return myMessages().filter(m => got[m.id]).map(m => ({ n: -1, id: m.id, day: m.day, minute: hm(m.time, 0), sender: m.sender, kind: m.kind, subject: m.subject, body: personal(m.body), body_ko: m.body_ko, fresh: got[m.id] === 1 }))
      .concat((G.notes || []).map((n, i) => ({ n: i, day: n.day, minute: n.minute, sender: n.sender, kind: n.kind, body: n.body, body_ko: n.body_ko, fresh: !n.read })))
      .sort((a, b) => (b.day - a.day) || (b.minute - a.minute) || (b.n - a.n));
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
    const m = MESSAGES.find(x => x.id === msgId), r = REPLIES.find(x => x.id === replyId && x.msg === msgId);
    if (!G || !m || !r || (G.replied || {})[msgId] || !(G.got || {})[msgId]) return false;
    (G.replied = G.replied || {})[msgId] = r.id;
    const call = m.kind === 'voicemail';
    if (call) advanceMinutes(5);
    else if (r.answer) (G.later = G.later || []).push({ at: G.day * 1440 + Math.floor(G.minute) + Math.max(1, +r.delay || 10), sender: r.answer_from || m.sender,
      kind: m.kind === 'email' ? 'email' : 'text', body: personal(r.answer), body_ko: r.answer_ko || '' });
    logEvent('reply', call ? `Called back ${senderName(m.sender)}` : `Replied to ${senderName(m.sender)}`, 0);
    saveGame();
    return true;
  }
  const TONE = { good: ['👍', 'Natural'], ok: ['🙂', 'Understood, but stiff'], poor: ['😬', 'Awkward'] };
  function replyBox(m) {
    if (m.n !== -1 || !m.id) return '';
    const opts = repliesTo(m.id);
    if (!opts.length) return '';
    const call = m.kind === 'voicemail', done = (G.replied || {})[m.id], mine = opts.find(o => o.id === done);
    if (!mine) return `<div class="reply"><span class="ask">${call ? '📞 Call back and say:' : '↩︎ Reply:'}</span>${opts.map(o => `<button type="button" data-reply="${esc(m.id)}|${esc(o.id)}">${esc(personal(o.label))}<span class="ko">${esc(personal(o.label_ko || ''))}</span></button>`).join('')}</div>`;
    const t = TONE[mine.tone] || TONE.good, from = mine.answer_from || m.sender;
    return `<div class="reply done"><div class="said-me"><button type="button" class="play" data-say="${esc(personal(mine.label))}" data-voice="${esc(G.hero)}" aria-label="Play">▶</button><div><b>You${call ? ' (call)' : ''}:</b> ${esc(personal(mine.label))}<span class="ko"> ${esc(personal(mine.label_ko || ''))}</span></div></div>
      ${call && mine.answer ? `<div class="said-me"><button type="button" class="play" data-say="${esc(personal(mine.answer))}" data-voice="${NPCS[from] ? esc(from) : ''}" aria-label="Play">▶</button><div><b>${esc(senderName(from))}:</b> ${esc(personal(mine.answer))}<span class="ko"> ${esc(personal(mine.answer_ko || ''))}</span></div></div>` : ''}
      <div class="tone ${esc(mine.tone)}">${t[0]} ${t[1]}${mine.tip_ko ? ' · ' + esc(mine.tip_ko) : ''}</div></div>`;
  }

  // ---------------------------------------------------------------- the mailbox at home: what the post brings
  // Mail (mail table) comes Monday to Saturday after config mail_time, but not on federal holidays; G.mailGot { id: 1 }
  // is what you have taken out of the mailbox. Check it outside your front door (the city map, at your building).
  const mailTime = () => hm(CFG.mail_time, 13 * 60);
  const mailDay = (d) => (d - 1) % 7 !== 6 && !dayOff(d);
  const myMail = () => MAIL.filter(m => (!m.hero || m.hero === 'all' || m.hero === G.hero) && (m.day < G.day || (m.day === G.day && G.minute >= mailTime())));
  const newMail = () => !G ? [] : myMail().filter(m => !(G.mailGot || {})[m.id]);
  const MAIL_ICON = { junk: '🗑️', bill: '🧾', letter: '✉️', notice: '📋', card: '💌' }, MAIL_KIND = { junk: 'Junk mail', bill: 'Bill', letter: 'Letter', notice: 'Notice', card: 'Card' };

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
    if (!atHome()) { if (!panel.hidden) note('You can only cook in your kitchen at home.', true); return false; }
    if (!canCook(r)) { if (!panel.hidden) note(`You are missing: ${needs(r).filter(x => !portions(x)).map(shortName).join(', ').toLowerCase()}.`, true); return false; }
    needs(r).forEach(useOne);
    G.energy = clamp(G.energy + (+r.energy || 0), 0, E_MAX);
    G.cooked = (G.cooked || 0) + 1;
    advanceMinutes(+r.minutes || 15);
    logEvent('cook', r.name, 0, { id: r.id });
    if (player) play(player, 'interact-right', { once: true });
    saveGame();
    if (!panel.hidden) { renderPanel(); note(`You made ${r.name.toLowerCase()} in ${r.minutes} minutes. Energy +${r.energy}.`); }
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
    note(`You threw out the ${name.toLowerCase()}.`);
  }
  function kitchenNews() {          // in the morning: what went bad overnight, what should be used today
    const bad = lots().filter(l => bestBy(l) === G.day - 1), last = lots().filter(l => bestBy(l) === G.day);
    const names = (l) => Array.from(new Set(l.map(x => shortName(x.id).toLowerCase()))).join(', '), out = [];
    if (bad.length) out.push(`🗑️ Gone bad in your kitchen: <b>${esc(names(bad))}</b>. Throw it out (Inventory).<span class="ko"> 상한 식료품이 있어요. 가방(Inventory)에서 버리세요.</span>`);
    if (last.length) out.push(`Use it or lose it: the <b>${esc(names(last))}</b> ${last.length > 1 || /s$/.test(names(last)) ? 'are' : 'is'} best by today.<span class="ko"> 오늘까지 먹어야 하는 식료품이 있어요.</span>`);
    return out;
  }

  // ---------------------------------------------------------------- the bus timetable
  // Every bus_every minutes from bus_first to bus_last (bus_every_weekend on weekends and federal holidays): you
  // wait for the next one, and after the last one you walk.
  const busEvery = () => +((G && (isWeekend(G.day) || dayOff(G.day)) && CFG.bus_every_weekend) || CFG.bus_every) || 0;
  function nextBus(min) {          // when the next bus leaves (minutes of the day); null after the last one
    const every = busEvery(), first = hm(CFG.bus_first, 360), last = hm(CFG.bus_last, 1350);
    if (!every) return Math.floor(min);
    if (min <= first) return first;
    const t = first + Math.ceil((min - first) / every) * every;
    return t <= last ? t : null;
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

  // ---------------------------------------------------------------- HUD: clock, money, energy, objective, next event
  let hudTimer = 0, goalTimer = 0, goalTarget = null;
  function hud() {
    if (!G) return;
    $('hud-day').textContent = dateShort(G.day);
    const hol = holidayOf(G.day);
    $('hud-day').title = `${dateLong(G.day)} · Day ${G.day}${hol ? ' · ' + hol.name : ''}`;
    $('hud-time').textContent = clock(G.minute);
    const wx = weatherNow(), hw = $('hud-weather'), dark = G.minute >= 19.5 * 60 || G.minute < 6 * 60;
    const dry = wx.kind === 'rain' && wx.rain < 0.04, lifted = wx.kind === 'fog' && wx.fog < 0.05;
    if (hw) {
      hw.textContent = `${dry ? '☁️' : lifted ? '⛅' : dark && wx.kind === 'clear' ? '🌙' : WX_ICON[wx.kind] || ''} ${wx.temp}°F${soaked() ? ' 💧' : ''}`;
      hw.title = `${WX_NAME[wx.kind] || ''}, high ${wx.high}°F, low ${wx.low}°F (${toC(wx.temp)}°C now). ${wx.row.forecast || ''}${soaked() ? ' You are wet from the rain.' : ''}`;
    }
    const m = $('hud-money');
    m.textContent = usd(G.money);
    m.classList.toggle('neg', G.money < 0);
    const e = G.energy / E_MAX;
    $('hud-energy').style.width = (e * 100).toFixed(1) + '%';
    const box = document.querySelector('#bar .energy');
    box.classList.toggle('low', G.energy < 30 && G.energy >= 20);
    box.classList.toggle('empty', G.energy < 20);
    box.title = `Energy ${Math.round(G.energy)} / ${E_MAX}`;
  }
  function setBox(el, en, ko, warn) {
    if (!en) { el.hidden = true; return; }
    el.hidden = false;
    el.querySelector('.en').innerHTML = en;
    el.querySelector('.ko').textContent = ko || '';
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
      if (pz === zoneId && isPhone(ep)) {
        en = `Take the call at ${esc(pl.name)}: <b>${esc(ep.title)}</b>`;
        ko = `${pl.name_ko || pl.name}에서 전화하세요: ${ep.title_ko || ep.title}`;
        goalTarget = Z.places[pid] ? { at: Z.places[pid].at } : null;
      } else if (pz === zoneId) {
        en = `Talk to ${esc(n.name)}: <b>${esc(ep.title)}</b>`;
        ko = `${n.name}에게 말을 거세요: ${ep.title_ko || ep.title}`;
        goalTarget = npcActors[ep.npc] ? { actor: npcActors[ep.npc] } : (Z.places[pid] ? { at: Z.places[pid].at } : null);
      } else {
        const zn = zoneName(pz);
        en = `Go to ${esc(pl.name)} (${esc(zn[0])})`;
        ko = `${pl.name_ko || pl.name} (${zn[1] || zn[0]})에 가세요 · ${ep.title_ko || ep.title}`;
        const via = pz && routeTo(zoneId, pz);
        if (via) goalTarget = { at: via.at, portal: true };
      }
    } else {
      const later = episodes().filter(laterToday).sort(epOrder)[0];
      if (later) {
        en = `Free until ${clock(hm(later.time_from, 0))}. Next: ${esc(later.title)}`;
        ko = `${hhmm(hm(later.time_from, 0))}까지 자유 시간. 다음: ${later.title_ko || later.title}`;
      } else if (G.minute >= 20 * 60) {
        const home = TRAVEL_ZONES.includes(zoneId) ? 'hotel' : hero().home_zone;
        const bed = home === 'hotel' ? 'hotel_room' : hero().home_bed;
        if (zoneId === home) { en = 'Time for bed. Go to your bed and sleep.'; ko = '잘 시간이에요. 침대에 가서 주무세요.'; if (Z.places[bed]) goalTarget = { at: Z.places[bed].at }; }
        else { en = `Head ${home === 'hotel' ? 'back to the hotel' : 'home'} and get some sleep.`; ko = home === 'hotel' ? '호텔로 돌아가 잠을 자세요.' : '집에 가서 잠을 자세요.'; const via = routeTo(zoneId, home); if (via) goalTarget = { at: via.at, portal: true }; }
      } else {
        en = 'Free time. Explore, shop, or grab something to eat.';
        ko = '자유 시간. 둘러보거나 장을 보거나 뭔가 먹어요.';
      }
    }
    if (G.energy < 30) { warn = true; en += `<br><small>Low energy (${Math.round(G.energy)}). Eat something or rest.</small>`; ko += ' · 에너지가 낮아요. 뭔가 드세요.'; }
    setBox($('goal'), en, ko, warn);
    const cal = calendar().filter(c => c.day === G.day && hm(c.time, 0) >= G.minute - 30).sort((a, b) => hm(a.time, 0) - hm(b.time, 0))[0];
    if (cal) setBox($('next'), `Next: <b>${hhmm(hm(cal.time, 0))}</b> ${esc(cal.title)}${cal.place ? ' · ' + esc(place(cal.place).name) : ''}`, `다음 일정: ${cal.time} ${cal.title_ko || cal.title}`);
    else setBox($('next'), null);
    Object.values(npcActors).forEach(a => { if (a.mark) a.mark.visible = open.some(e => e.npc === a.id && !isPhone(e)); });
    phoneMarks(open.filter(e => isPhone(e) && Z.places[e.place] && placeIn(e.place, zoneId) && !(talk && talk.ep.id === e.id)));
    // people with nothing to discuss make small talk as you pass (a bubble; Chat also says it aloud)
    if (state === 'play' && player) Object.values(npcActors).forEach(a => {
      if (a.leaving || open.some(e => e.npc === a.id) || !(CHATTER[a.id] || []).length) return;
      if (Math.hypot(a.pos.x - player.pos.x, a.pos.z - player.pos.z) > 2.0 || elapsed - (a.chatAt || -99) < 40) return;
      a.chatAt = elapsed;
      const c = remark(a);
      say(a, personal(c.line), c.line_ko, 3.5);
    });
  }
  // what somebody says in passing: their own lines in turn, and every third time (the first time too) a remark
  // about the weather, the day of the week or the time of day (smalltalk table)
  function remark(a) {
    a.chatN = (a.chatN || 0) + 1;
    const lines = CHATTER[a.id] || [];
    // first, what anybody would say at the sight of you: dripping wet indoors, or in late this morning
    const about = Z.indoor && soaked() ? 'you:wet' : zoneId === 'office' && G.lateDay === G.day && G.minute < 12 * 60 ? 'you:late' : null;
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
      if (m < 9 * 60 && Z.indoor) topics.push('time:morning');
      if (m >= 11.5 * 60 && m < 13.5 * 60) topics.push('time:lunch');
      if (m >= 17.5 * 60) topics.push('time:evening');
      const pool = topics.reduce((l, t) => l.concat(SMALLTALK[t] || []), []).filter(c => !(m >= 19.5 * 60 && /weather:(clear|partly)/.test(c.topic)));
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
    b.innerHTML = esc(text) + (ko ? `<span class="ko">${esc(ko)}</span>` : '');
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
    el.innerHTML = esc(text) + (ko ? ` <span class="ko">${esc(ko)}</span>` : '');
    $('tags').appendChild(el);
    tags.push({ el, pos, range });
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
  const typing = (e) => e.target && /INPUT|TEXTAREA/.test(e.target.tagName);
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
    const panelKey = { KeyT: 'talks', KeyP: 'phone', KeyN: 'phone', KeyI: 'inventory', KeyC: 'calendar', KeyM: 'map', KeyB: 'bank' }[e.code];
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
    if (closedNow(inside.to)) { const zn = zoneName(inside.to); toast(`${zn[0]} is closed. Hours: ${hoursText(inside.to)}`, `${zn[1] || zn[0]}은(는) 문을 닫았어요. 영업시간 ${hoursText(inside.to)}`, 'bad', 4); return; }
    const pid = portalPlace(inside), fares = pid ? faresAt(pid) : [];
    const fare = fares.reduce((t, i) => t + +i.price, 0);
    if (fare && G.money < fare) { toast(`You can't afford the fare (${usd2(fare)}).`, '요금이 부족해요.', 'bad'); return; }
    fares.forEach(i => pay(-i.price, i.name, 'spend'));
    if (fare) toast(`Paid ${usd2(fare)}: ${fares.map(i => i.name).join(', ')}`, fares.map(i => i.name_ko).filter(Boolean).join(', '));
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
    if (z === 'office' && !isWeekend(G.day) && G.inDay !== G.day && G.minute < 17 * 60) {        // the first time in today
      G.inDay = G.day; G.inAt = Math.floor(G.minute);
      const start = hm(CFG.work_start, 540);
      if (G.minute > hm(CFG.late_after, 555) && G.minute < 12 * 60) {
        G.lateDay = G.day;
        toast(`You're late: it's ${clock(G.minute)}, and work starts at ${clock(start)}.`, `지각이에요. 지금은 ${hhmm(G.minute)}이고 업무는 ${hhmm(start)}에 시작해요.`, 'bad', 4.5);
        return;
      }
      if (G.minute <= start) { toast(`${zn[0]} · ${clock(G.minute)}. You're on time.`, `${zn[1] || zn[0]} · 제시간에 왔어요.`, 'good', 3); return; }
    }
    if (z === 'office' && !npcsIn(z).length) {
      if (isWeekend(G.day)) toast("It's the weekend. Nobody is in the office.", '주말이라 사무실에 아무도 없어요.', null, 4);
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
  const TOUR_TIMES = [[600, 'Morning'], [780, 'Afternoon'], [1105, 'Sunset'], [1290, 'Night'], [400, 'Sunrise']];
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
    $('tour').querySelector('[data-tour="time"]').textContent = `Time: ${t[1]}`;
    $('tour').querySelector('[data-tour="weather"]').textContent = `Weather: ${tour.wx ? WX_NAME[tour.wx] : 'Sunny'}`;
    $('tour').querySelector('[data-tour="auto"]').textContent = tour.auto ? 'Circling: on' : 'Circling: off';
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
    if (kind === 'sleep') out.push({ key: 'sleep:' + pid, label: 'Sleep', run: () => trySleep(pid) });
    if (kind === 'eat' && atHome() && RECIPES.length) out.push({ key: 'cook:' + pid, label: 'Cook a meal', run: () => openPanel('cook') });
    if (kind === 'eat') out.push({ key: 'eat:' + pid, label: 'Eat something', run: () => openPanel('inventory') });
    const shut = G && (closedNow(pid) ? pid : closedNow(zoneOfPlace(pid)) ? zoneOfPlace(pid) : null);
    if (itemsAt(pid).length && shut) out.push({ key: 'shut:' + pid, label: `Closed · open ${hoursText(shut)}`, run: () => toast(`${pl.name} is closed. Hours: ${hoursText(shut)}`, `${pl.name_ko || pl.name}: 영업시간 ${hoursText(shut)}`, 'bad') });
    else if (itemsAt(pid).length) out.push({ key: 'shop:' + pid, label: shopLabel(pid, pl), run: () => openPanel('shop', pid) });
    if (isBusStop(pid) && zoneId === 'city') {
      const nb = G ? nextBus(G.minute) : 0;
      if (nb == null) out.push({ key: 'bus:' + pid, label: 'No more buses tonight', run: () => toast(`The last bus left at ${clock(hm(CFG.bus_last, 1350))}. You'll have to walk.`, '막차가 떠났어요. 걸어가야 해요.', 'bad', 4) });
      else out.push({ key: 'bus:' + pid, label: `Take the bus · ${busEvery() ? 'next ' + clock(nb) + ' · ' : ''}${usd2(busFare())}`, run: () => openPanel('bus', pid) });
    }
    if (kind === 'work' || pid === hero().desk) out.push({ key: 'work:' + pid, label: 'Work for an hour', run: () => work() });
    if (MAIL.length && G && zoneId === 'city' && pid === hero().home_door) { const n = newMail().length; out.push({ key: 'mail:' + pid + n, label: n ? `Check the mailbox (${n})` : 'Check the mailbox', run: () => openPanel('mailbox') }); }
    if (window.SO_JOG && G && zoneId === hero().home_zone && kind === 'door') out.push({ key: 'jog:' + pid, label: 'Go for a jog', run: () => startJog(true) });
    if (kind === 'seat') out.push({ key: 'sit:' + pid, label: 'Sit down', run: () => { player.sit = true; play(player, 'sit'); } });
    return out;
  }
  function shopLabel(pid, pl) {
    const its = itemsAt(pid);
    if (its.every(i => i.kind === 'fare')) return 'Pay: ' + its[0].name;
    if (its.length === 1) return 'Buy: ' + its[0].name;
    if (/coffee|cafe/.test(pid)) return 'Order a drink';
    if (/diner|restaurant|kitchen/.test(pid)) return 'Order food';
    if (/market|shelves/.test(pid)) return 'Shop for groceries';
    return 'Buy at ' + pl.name;
  }
  function computeActions() {
    if (state !== 'play' || busy || !player || !Z) return [];
    const list = [];
    const open = openEpisodes();
    Object.values(npcActors).forEach(a => {
      const d = Math.hypot(a.pos.x - player.pos.x, a.pos.z - player.pos.z);
      if (d > TALK_R || a.leaving) return;
      const ep = open.find(e => e.npc === a.id && !isPhone(e));
      if (ep) list.push({ d: d - 1, key: 'ep:' + ep.id, label: `Talk to ${a.name.split(' ')[0]}: ${ep.title}${+ep.reward < 0 ? ` (${usd2(-ep.reward)})` : ''}`, run: () => beginEpisode(ep, a) });
      else list.push({ d: d + 0.3, key: 'chat:' + a.id, label: `Chat with ${a.name.split(' ')[0]}`, run: () => chatter(a) });
    });
    Object.keys(Z.places).forEach(pid => {
      const pl = Z.places[pid];
      if (!pl || !pl.at) return;
      const d = Math.hypot(pl.at[0] - player.pos.x, pl.at[1] - player.pos.z);
      if (d > PLACE_R) return;
      open.filter(e => isPhone(e) && e.place === pid).forEach(ep => list.push({ d: d - 1, key: 'ep:' + ep.id, label: `Phone ${npcRow(ep.npc).name.split(' ')[0]}: ${ep.title}`, run: () => beginEpisode(ep, null) }));
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
    const c = remark(a);
    say(a, personal(c.line), c.line_ko, 3.5);
    speak(personal(c.line), voiceOf(a.row));
    play(a, 'interact-right', { once: true });
  }
  function work() {
    advanceMinutes(60);
    toast('You worked for an hour.', '한 시간 일했어요.', null, 2.4);
    player.sit = true;
    play(player, 'sit');
    goalTimer = 0;
  }
  const busFare = () => { const f = rows('items').find(i => busItem(i) && !/pass/.test(i.id)); return f ? +f.price : +CFG.bus_fare || 2.5; };
  const hasPass = () => G && G.pass === G.day;

  // ---------------------------------------------------------------- conversations: an episode's turns
  const dlg = $('dialog');
  let talk = null;          // { ep, turns, idx, actor, misses }
  const personal = (s) => s == null ? '' : String(s).replace(/\{name\}/g, G ? G.name : heroOf(DEFAULT_HERO).name);
  function speakerOf(id) {
    if (!id) return talk && talk.actor;
    if (id === 'player' || id === 'you') return player;
    return npcActors[id] || (talk && talk.ep.npc === id ? talk.actor : null);
  }
  const speakerName = (id) => !id ? (talk ? npcRow(talk.ep.npc).name : '') : (id === 'player' || id === 'you') ? (G ? G.name : 'You') : npcRow(id).name;
  function beginEpisode(ep, actor) {
    if (+ep.reward < 0 && G.money + +ep.reward < 0) { toast(`You can't afford this (${usd2(-ep.reward)}).`, '돈이 부족해요.', 'bad'); return; }
    const turns = TURNS[ep.id] || [];
    actor = actor || npcActors[ep.npc] || null;
    talk = { ep, turns, idx: 0, actor, misses: 0 };
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
  function showTurn() {
    const t = talk.turns[talk.idx];
    talk.misses = 0;
    dlg.classList.remove('answered');
    dlg.querySelector('.ep').textContent = talk.ep.title;
    dlg.querySelector('.step').textContent = `${talk.idx + 1} / ${talk.turns.length}`;
    dlg.querySelector('.situation').textContent = personal(t.situation);
    dlg.querySelector('.situation-ko').textContent = t.situation_ko || '';
    dlg.querySelector('.who').textContent = speakerName(t.speaker) + ':';
    dlg.querySelector('.say').textContent = personal(t.line);
    dlg.querySelector('.line-ko').textContent = '';
    dlg.querySelector('.prompt').textContent = personal(t.prompt);
    dlg.querySelector('.prompt-ko').textContent = t.prompt_ko || '';
    feedback('', '');
    const model = personal(t.model);
    const box = dlg.querySelector('.choices');
    box.innerHTML = '';
    shuffle([model].concat((t.distractors || []).slice(0, 3).map(personal))).forEach(text => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = text;
      b.addEventListener('click', () => {
        if (dlg.classList.contains('answered')) return;
        if (text === model) { b.classList.add('right'); answered(text); }
        else { b.classList.add('wrong'); b.disabled = true; feedback('miss', 'Not quite. Read the situation again.', '상황을 다시 읽어 보세요.'); }
      });
      box.appendChild(b);
    });
    dlg.querySelector('.typing input').value = '';
    dlg.querySelector('.leave').hidden = false;
    dlg.querySelector('.next').hidden = true;
    setMode(settings.mode === 'choose' ? 'choose' : 'type');
    const who = speakerOf(t.speaker);
    if (who && who !== player) { say(who, personal(t.line), null, 4); play(who, 'interact-right', { once: true }); }
    speak(personal(t.line), voiceOf(npcRow(t.speaker || talk.ep.npc)));
    if (!model && !(t.answers || []).length) { dlg.classList.add('answered'); showNext(); }
  }
  function setMode(mode) {
    settings.mode = mode;
    saveSettings();
    dlg.dataset.mode = mode;
    dlg.querySelectorAll('.mode button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
    if (mode === 'type' && !dlg.classList.contains('answered') && !document.body.classList.contains('touch')) setTimeout(() => dlg.querySelector('.typing input').focus(), 0);
  }
  function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function feedback(kind, en, ko) {
    const f = dlg.querySelector('.feedback');
    f.className = 'feedback ' + kind;
    f.innerHTML = en ? esc(en) + (ko ? `<span class="ko">${esc(ko)}</span>` : '') : '';
  }
  dlg.querySelector('.typing').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!talk || dlg.classList.contains('answered')) return;
    const t = talk.turns[talk.idx];
    const input = dlg.querySelector('.typing input');
    const text = input.value.trim();
    if (!text) return;
    const same = M.normalize(text) === M.normalize(personal(t.model));
    if (same || !(t.answers || []).length || M.match(text, t.answers)) { answered(text); return; }
    talk.misses++;
    const hints = t.hints || [], hko = t.hints_ko || [];
    if (talk.misses >= 3) feedback('miss', `Try saying: "${personal(t.model)}"`, '예시 답을 따라 입력해 보세요.');
    else feedback('miss', 'Hint: ' + (hints[talk.misses - 1] || hints[0] || M.skeleton(t.model)), hko[talk.misses - 1] || hko[0] || '');
    input.select();
  });
  dlg.querySelectorAll('.mode button').forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode)));
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
  function answered(text) {
    const t = talk.turns[talk.idx], mine = talk;
    (talk.said = talk.said || [])[talk.idx] = text;          // kept for Menu > Conversations
    dlg.classList.add('answered');
    dlg.querySelector('.leave').hidden = true;
    say(player, text, null, 3.4);
    speak(text, heroVoice());          // you say it aloud, in your own voice; the reply waits for you to finish
    play(player, 'emote-yes', { once: true });
    feedback('ok', '✓ ' + text);
    clearTimeout(replyTimer);
    replyTimer = setTimeout(() => {
      if (talk !== mine) return;
      if (t.reply_line) {
        const rs = t.reply_speaker || t.speaker;
        dlg.querySelector('.who').textContent = speakerName(rs) + ':';
        dlg.querySelector('.say').textContent = personal(t.reply_line);
        dlg.querySelector('.line-ko').textContent = t.reply_ko || '';
        const who = speakerOf(rs);
        if (who && who !== player) { say(who, personal(t.reply_line), null, 4.5); play(who, 'interact-left', { once: true }); }
        speak(personal(t.reply_line), voiceOf(npcRow(rs || talk.ep.npc)), true);
      }
      showNext();
    }, fastMode ? 250 : 1300);
  }
  function showNext() {
    const next = dlg.querySelector('.next');
    next.textContent = talk && talk.idx + 1 < talk.turns.length ? 'Continue ▸' : 'Finish ▸';
    next.hidden = false;
    next.focus();
  }
  dlg.querySelector('.next').addEventListener('click', () => {
    if (!talk) return;
    talk.idx++;
    if (talk.idx < talk.turns.length) showTurn(); else completeEpisode();
  });
  function completeEpisode() {
    const ep = talk.ep;
    dlg.hidden = true;
    $('side').hidden = false;
    if (talk.said && talk.said.length) (G.said = G.said || {})[ep.id] = talk.said.map(x => x == null ? null : String(x).slice(0, 200));
    talk = null;
    G.done[ep.id] = true;
    if (+ep.reward) pay(+ep.reward, ep.title, +ep.reward > 0 ? 'income' : 'spend');
    if (ep.energy) G.energy = clamp(G.energy + +ep.energy, 0, E_MAX);
    const learned = rows('phrases').filter(p => p.episode === ep.id && !G.phrases.includes(p.id));
    learned.forEach(p => G.phrases.push(p.id));
    logEvent('episode', ep.title, 0, { id: ep.id });
    saveGame();
    npcSig = '';
    const body = [];
    if (ep.summary) body.push(`<p>${esc(personal(ep.summary))}</p>${ep.summary_ko ? `<p class="ko">${esc(ep.summary_ko)}</p>` : ''}`);
    if (+ep.reward > 0) body.push(`<p><b>${usd2(+ep.reward)}</b> added to your account.</p>`);
    if (+ep.reward < 0) body.push(`<p>You paid <b>${usd2(-ep.reward)}</b>. Balance: ${usd2(G.money)}.</p>`);
    if (learned.length) body.push(`<p><b>Expressions to remember</b> <small>(kept with the conversation: Menu &gt; Conversations)</small></p>` + phraseRows(learned));
    showCard({ kicker: 'Conversation complete', title: ep.title, body: body.join(''), ok: 'Continue', state: 'card' }, () => { goalTimer = 0; });
  }

  // ---------------------------------------------------------------- panels: shop, bus, inventory, conversations, calendar
  const panel = $('panel');
  let panelKind = null, panelArg = null, panelBack = 'play';
  function openPanel(kind, arg) {
    toggleMenu(false);
    if (!G) return;
    if (state === 'talk' || state === 'sleep' || state === 'title') return;
    panelKind = kind; panelArg = arg;
    if (state !== 'shop' && state !== 'card') panelBack = state;
    state = kind === 'shop' || kind === 'bus' ? 'shop' : 'card';
    panel.hidden = false;
    panel.querySelector('.panel-note').textContent = '';
    panel.querySelector('.panel-note').className = 'panel-note';
    renderPanel();
  }
  function closePanel() {
    panel.hidden = true;
    panelKind = null;
    if (state === 'shop' || state === 'card') state = panelBack === 'talk' ? 'play' : (panelBack || 'play');
    goalTimer = 0;
  }
  panel.querySelector('.close').addEventListener('click', closePanel);
  function note(text, bad) { const n = panel.querySelector('.panel-note'); n.textContent = text; n.className = 'panel-note' + (bad ? ' bad' : ''); }
  function phraseRows(list) {
    return list.map(p => `<div class="row"><button type="button" class="play" data-say="${esc(p.text)}" aria-label="Play">▶</button>
      <div class="main"><div class="t">${esc(personal(p.text))}</div><div class="s">${esc(p.meaning_ko || '')}${p.note ? ' · ' + esc(p.note) : ''}</div>${p.note_ko ? `<div class="s ko">${esc(p.note_ko)}</div>` : ''}</div></div>`).join('');
  }
  function renderPanel() {
    const h = panel.querySelector('h2'), sub = panel.querySelector('.sub'), body = panel.querySelector('.panel-body');
    sub.textContent = 'Balance ' + usd2(G.money);
    if (panelKind === 'shop') {
      h.textContent = place(panelArg).name;
      body.innerHTML = itemsAt(panelArg).map(i => `<div class="row"><button type="button" class="play" data-say="${esc(i.name)}" aria-label="Say it">▶</button>
        <div class="main"><div class="t">${esc(i.name)}</div><div class="s">${esc(i.name_ko || '')}${i.energy ? ` · energy +${i.energy}` : ''}${/meal|drink/.test(i.kind) ? ' · eat now' : i.kind === 'fare' ? '' : ' · to your bag'}${i.kind === 'gear' && G.inventory[i.id] ? ' · you have one' : ''}${usesOf(i) > 1 ? ` · ${usesOf(i)} portions` : ''}${+i.shelf_days > 0 ? ` · keeps ${+i.shelf_days} days` : ''}${+i.cook_only ? ' · needs cooking' : ''}${i.note ? ' · ' + esc(i.note) : ''}</div></div>
        <span class="price">${onTheHouse(i) ? `<s>${usd2(+i.price)}</s> Free` : +i.price ? usd2(+i.price) : 'Free'}</span><button type="button" data-buy="${esc(i.id)}">${i.kind === 'fare' ? 'Pay' : /meal|drink/.test(i.kind) && !+i.price ? 'Take' : 'Buy'}</button></div>`).join('') || '<p class="empty">Nothing for sale here.</p>';
      const list = itemsAt(panelArg);
      let top = '';
      if (tipAsked(panelArg)) top += `<div class="row tips"><div class="main"><div class="t">Add a tip?</div><div class="s">${tableService(panelArg) ? '15 to 20% is usual when you are served at a table' : 'Up to you at a counter'}<span class="ko"> · ${tableService(panelArg) ? '자리에서 서빙을 받으면 보통 15~20%' : '카운터에서는 선택'}</span></div></div>
        <div class="mode" role="group" aria-label="Tip">${TIPS.map(t => `<button type="button" data-tip="${t}" aria-pressed="${Math.abs(tipRate(panelArg) * 100 - t) < 0.01}">${t ? t + '%' : 'No tip'}</button>`).join('')}</div></div>`;
      if (list.some(punchable)) { const n = punches(panelArg);
        top += `<div class="row punch"><div class="main"><div class="t">Punch card <span class="dots">${'●'.repeat(Math.min(n, PUNCH_N - 1))}${'○'.repeat(Math.max(0, PUNCH_N - 1 - n))}</span></div><div class="s">${n >= PUNCH_N - 1 ? 'Your next drink is on the house!' : `Buy ${PUNCH_N - 1} drinks, get the next one free`}<span class="ko"> · ${n >= PUNCH_N - 1 ? '다음 음료는 무료예요!' : `음료 ${PUNCH_N - 1}잔을 사면 다음 한 잔은 무료`}</span></div></div></div>`; }
      if (TAX && list.some(taxed)) top += `<p class="fine">Prices do not include ${pct(TAX)} sales tax.${list.some(i => !taxed(i)) ? ' Groceries are not taxed.' : ''}<span class="ko"> 표시 가격에는 판매세 ${pct(TAX)}가 빠져 있어요.</span></p>`;
      else if (list.length && list.every(i => i.kind === 'grocery')) top += `<p class="fine">No sales tax on groceries in ${esc(CFG.city)}.<span class="ko"> ${esc(CFG.city)}에서는 식료품에 판매세가 없어요.</span></p>`;
      body.innerHTML = top + body.innerHTML;
    } else if (panelKind === 'bus') {
      h.textContent = 'Bus';
      const here = panelArg;
      const stops = Object.keys(Z.places).filter(pid => pid !== here && (DOORS['city:' + pid] || portalsOf(Z).some(p => Math.hypot(p.at[0] - Z.places[pid].at[0], p.at[1] - Z.places[pid].at[1]) < 3)));
      const pass = rows('items').find(i => busItem(i) && /pass/.test(i.id));
      const nb = nextBus(G.minute), every = busEvery(), off = isWeekend(G.day) || dayOff(G.day);
      const times = every ? `<p class="fine">${nb == null ? `No more buses tonight: the last one left at ${clock(hm(CFG.bus_last, 1350))}.` : `Next bus at <b>${clock(nb)}</b>${nb - G.minute >= 1 ? `, in ${Math.ceil(nb - G.minute)} min` : ', boarding now'}.`}
        Every ${every} minutes ${off ? (dayOff(G.day) ? 'today (holiday timetable)' : 'on weekends') : 'on weekdays'}, ${clock(hm(CFG.bus_first, 360))} – ${clock(hm(CFG.bus_last, 1350))}.<span class="ko"> ${off ? '주말·공휴일' : '평일'}에는 ${every}분마다 다닙니다. 다음 버스를 기다렸다가 탑니다.</span></p>` : '';
      body.innerHTML = times + stops.map(pid => `<div class="row"><div class="main"><div class="t">${esc(place(pid).name)}</div><div class="s">${esc(place(pid).name_ko || '')} · about 15 minutes</div></div>
        <span class="price">${hasPass() ? 'Pass' : usd2(busFare())}</span><button type="button" data-ride="${esc(pid)}" ${nb == null ? 'disabled' : ''}>Ride</button></div>`).join('') || '<p class="empty">No stops on this line.</p>';
      if (pass && !hasPass()) body.innerHTML += `<div class="row"><div class="main"><div class="t">${esc(pass.name)}</div><div class="s">${esc(pass.name_ko || '')}${pass.note ? ' · ' + esc(pass.note) : ''}</div></div>
        <span class="price">${usd2(+pass.price)}</span><button type="button" data-pass="${esc(pass.id)}">Buy</button></div>`;
    } else if (panelKind === 'inventory') {
      h.textContent = 'Inventory';
      const canEat = zoneId === hero().home_zone || zoneId === 'hotel';
      const all = lots().map((l, n) => ({ l, n })).filter(x => x.l.left > 0).sort((a, b) => (gone(b.l) - gone(a.l)) || ((bestBy(a.l) || 999) - (bestBy(b.l) || 999)) || String(a.l.id).localeCompare(b.l.id));
      sub.textContent = `${all.length} item${all.length === 1 ? '' : 's'}`;
      const head = RECIPES.length && all.length ? `<p class="fine">${atHome() ? '<button type="button" data-cook-open="1">Cook a meal</button> ' : ''}Groceries keep for a while, then go bad. Some need cooking: use the kitchen at home.<span class="ko"> 식료품은 기한이 지나면 상합니다. 익혀야 먹는 것은 집 부엌에서 요리하세요.</span></p>` : '';
      body.innerHTML = head + all.map(({ l, n }) => {
        const i = ITEMS[l.id] || { id: l.id, name: pretty(l.id), energy: 0 }, by = bestBy(l), bad = gone(l), u = usesOf(i);
        const when = by == null ? '' : bad ? `went bad after ${dateShort(by).replace(/^\w+, /, '')}` : by === G.day ? 'best by today' : by === G.day + 1 ? 'best by tomorrow' : `best by ${dateShort(by)}`;
        const btn = bad ? `<button type="button" class="danger" data-toss="${n}">Throw out</button>`
          : +i.cook_only ? '<span class="price">Needs cooking</span>'
            : i.energy ? `<button type="button" data-eat="${n}" ${canEat ? '' : 'disabled'}>${canEat ? 'Eat' : 'Eat at home'}</button>` : '';
        return `<div class="row${bad ? ' bad' : by != null && by <= G.day + 1 ? ' soon' : ''}"><div class="main"><div class="t">${esc(i.name)}</div>
          <div class="s">${esc(i.name_ko || '')}${u > 1 ? ` · ${l.left} of ${u} portions left` : ''}${i.energy && !bad && !+i.cook_only ? ` · energy +${i.energy}` : ''}${when ? ` · <span class="by">${esc(when)}</span>` : ''}</div></div>${btn}</div>`; }).join('')
        || '<p class="empty">Your bag is empty. Groceries you buy at the market go here.</p>';
    } else if (panelKind === 'cook') {
      h.textContent = 'Cook a meal';
      const able = RECIPES.filter(canCook);
      sub.textContent = `${able.length} of ${RECIPES.length} recipes`;
      body.innerHTML = `<p class="fine">A recipe takes one portion of each ingredient, the oldest first. Buy what is missing at Fairview Market.<span class="ko"> 재료마다 1회분씩, 오래된 것부터 씁니다. 없는 재료는 마켓에서 사세요.</span></p>`
        + RECIPES.slice().sort((a, b) => canCook(b) - canCook(a)).map(r => {
          const ok = canCook(r), steps = String(r.steps || '').split(' | ').filter(Boolean), ko = String(r.steps_ko || '').split(' | ');
          return `<div class="row recipe${ok ? '' : ' lack'}"><button type="button" class="play" data-say="${esc(r.name + '. ' + steps.join(' '))}" aria-label="Play">▶</button>
            <div class="main"><div class="t">${esc(r.name)}</div><div class="s">${esc(r.name_ko || '')} · ${r.minutes} min · energy +${r.energy}${r.tool ? ' · ' + esc(r.tool) : ''}</div>
            <div class="s need">${needs(r).map(id => `<span class="${portions(id) ? 'have' : 'miss'}">${portions(id) ? '✓' : '✗'} ${esc(shortName(id).toLowerCase())}</span>`).join(' ')}</div>
            ${steps.length ? `<details><summary>How to make it</summary><ol>${steps.map((t, k) => `<li>${esc(t)}<span class="ko"> ${esc(ko[k] || '')}</span></li>`).join('')}</ol></details>` : ''}</div>
            <button type="button" data-cook="${esc(r.id)}" ${ok && atHome() ? '' : 'disabled'}>${!atHome() ? 'At home' : ok ? 'Cook' : 'Missing'}</button></div>`; }).join('');
    } else if (panelKind === 'calendar') {
      h.textContent = 'Calendar';
      const up = Object.keys(HOLIDAYS).sort().map(k => [Math.round((Date.parse(k) - START) / 864e5) + 1, HOLIDAYS[k]]).filter(x => START != null && x[0] > Math.floor((G.day - 1) / 7) * 7 + 7).slice(0, 3);
      sub.textContent = `Week ${Math.floor((G.day - 1) / 7) + 1}`;
      const d0 = Math.floor((G.day - 1) / 7) * 7 + 1;
      let html = '';
      for (let d = d0; d < d0 + 7; d++) {
        const evs = calendar().filter(c => c.day === d).sort((a, b) => hm(a.time, 0) - hm(b.time, 0));
        const extra = [];
        if (PAYDAYS.includes(d)) extra.push(`Payday: ${usd(+hero().salary_net)} direct deposit`);
        if (isRentDay(d)) extra.push(`${hero().housing_name || 'Rent'} due: ${usd(+hero().housing)}`);
        billsDue(d).forEach(b => extra.push(`Autopay: ${b.name} ${usd2(+b.amount)}`));
        const hol = holidayOf(d);
        if (hol) extra.unshift(`${hol.name}${hol.kind === 'federal' ? ' (federal holiday: banks and post offices closed)' : ''}`);
        if (!evs.length && !extra.length && d !== G.day) continue;
        html += `<h3>${dateLong(d)} · Day ${d}${d === G.day ? ' · today' : ''}</h3>`;
        html += extra.map(x => `<div class="row"><span class="when"></span><div class="main"><div class="t">${esc(x)}</div></div></div>`).join('');
        html += evs.map(c => { const done = c.episode && G.done[c.episode]; const past = d < G.day || (d === G.day && hm(c.time, 0) < G.minute - 60);
          return `<div class="row${done ? ' done' : ''}${past && !done ? ' past' : ''}"><span class="when">${esc(c.time)}</span><div class="main"><div class="t">${esc(c.title)}</div><div class="s">${c.place ? esc(place(c.place).name) : ''}${c.title_ko ? ' · ' + esc(c.title_ko) : ''}</div></div></div>`; }).join('');
        if (!evs.length && !extra.length) html += '<p class="empty">Nothing scheduled.</p>';
      }
      if (up.length) html += '<h3>Coming up</h3>' + up.map(x => `<div class="row"><span class="when">${esc(dateShort(x[0]).replace(/^\w+, /, ''))}</span><div class="main"><div class="t">${esc(x[1].name)}</div><div class="s">${esc(x[1].note || '')}<span class="ko"> ${esc(x[1].name_ko || '')}: ${esc(x[1].note_ko || '')}</span></div></div></div>`).join('');
      body.innerHTML = html;
    } else if (panelKind === 'phone') {
      h.textContent = 'Phone';
      const list = inbox(), fresh = list.filter(m => m.fresh).length;
      sub.textContent = fresh ? `${fresh} new` : `${list.length} messages`;
      const ICON = { text: '💬', email: '✉️', voicemail: '📞', alert: '🔔' };
      body.innerHTML = list.map(m => `<div class="row msg${m.fresh ? ' new' : ''}"><button type="button" class="play" data-say="${esc((m.subject ? m.subject + '. ' : '') + m.body)}" data-voice="${NPCS[m.sender] ? esc(m.sender) : ''}" aria-label="Play">▶</button>
        <div class="main"><div class="s">${ICON[m.kind] || ''} ${esc(MSG_KIND[m.kind] || 'Message')} · ${esc(dateShort(m.day))}, ${clock(m.minute)}</div><div class="t">${esc(senderName(m.sender))}${m.subject ? ` <span class="subj">${esc(m.subject)}</span>` : ''}</div>
        <div class="b">${esc(m.body)}</div>${m.body_ko ? `<div class="s ko">${esc(m.body_ko)}</div>` : ''}${replyBox(m)}</div></div>`).join('')
        || '<p class="empty">No messages yet. Texts, emails and alerts from your bank arrive here.</p>';
      readAll();
    } else if (panelKind === 'mailbox') {
      h.textContent = 'Mailbox';
      const got = G.mailGot = G.mailGot || {}, list = myMail().slice().reverse(), fresh = list.filter(m => !got[m.id]).map(m => m.id);
      sub.textContent = fresh.length ? `${fresh.length} new` : `${list.length} kept`;
      body.innerHTML = (list.map(m => `<div class="row msg${fresh.includes(m.id) ? ' new' : ''}"><button type="button" class="play" data-say="${esc((m.subject ? m.subject + '. ' : '') + m.body)}" aria-label="Play">▶</button>
        <div class="main"><div class="s">${MAIL_ICON[m.kind] || ''} ${esc(MAIL_KIND[m.kind] || 'Mail')} · ${esc(dateShort(m.day))}</div><div class="t">${esc(m.sender)}${m.subject ? ` <span class="subj">${esc(m.subject)}</span>` : ''}</div>
        <div class="b">${esc(m.body)}</div>${m.body_ko ? `<div class="s ko">${esc(m.body_ko)}</div>` : ''}</div></div>`).join('')
        || `<p class="empty">The mailbox is empty. The mail comes after ${clock(mailTime())}, Monday to Saturday.</p>`)
        + (list.length && !fresh.length ? `<p class="fine">${mailDay(G.day) ? (G.minute < mailTime() ? `Nothing new yet. Today's mail comes after ${clock(mailTime())}.` : 'Nothing new today.') : 'No mail on Sundays and federal holidays.'}<span class="ko"> 우편은 일요일과 연방 공휴일에는 오지 않아요.</span></p>` : '');
      fresh.forEach(id => { got[id] = 1; });
    } else if (panelKind === 'talks' || panelKind === 'phrasebook') {
      // the conversations you have had, newest first: what was said to you, what you answered and the reply, then the
      // expressions the conversation taught (what used to be the Phrasebook); every line can be heard again
      h.textContent = 'Conversations';
      const had = G.log.filter(l => l.type === 'episode' && l.id && EPISODES[l.id] && G.done[l.id]).slice().reverse();
      sub.textContent = `${had.length} finished · ${G.phrases.length} expressions`;
      const sayBtn = (text, who) => `<button type="button" class="play" data-say="${esc(text)}" data-voice="${esc(who || '')}" aria-label="Play">▶</button>`;
      body.innerHTML = had.map((l, n) => {
        const ep = EPISODES[l.id], said = (G.said || {})[l.id] || [];
        const lines = (TURNS[l.id] || []).map((t, i) => {
          const who = t.speaker || ep.npc, mine = personal(said[i] || t.model), rs = t.reply_speaker || who;
          return `${t.situation ? `<p class="scene">${esc(personal(t.situation))}<span class="ko"> ${esc(t.situation_ko || '')}</span></p>` : ''}
            <div class="said">${sayBtn(personal(t.line), who)}<div><b>${esc(npcRow(who).name.split(' ')[0])}</b> ${esc(personal(t.line))}</div></div>
            ${mine ? `<div class="said me">${sayBtn(mine, G.hero)}<div><b>${esc(G.name)}</b> ${esc(mine)}${said[i] && M.normalize(said[i]) !== M.normalize(personal(t.model)) ? `<span class="model">Example: ${esc(personal(t.model))}</span>` : ''}</div></div>` : ''}
            ${t.reply_line ? `<div class="said">${sayBtn(personal(t.reply_line), rs)}<div><b>${esc(npcRow(rs).name.split(' ')[0])}</b> ${esc(personal(t.reply_line))}<span class="ko"> ${esc(t.reply_ko || '')}</span></div></div>` : ''}`;
        }).join('');
        const learned = G.phrases.map(id => PHRASES[id]).filter(p => p && p.episode === l.id);
        const words = learned.length ? `<h4>Expressions</h4><div class="words">${phraseRows(learned)}</div>` : '';
        return `<details class="talk"${n ? '' : ' open'}><summary><span class="when">${dateShort(l.day)} · ${clock(l.minute)}</span> <b>${esc(ep.title)}</b><span class="with"> with ${esc(npcRow(ep.npc).name)} · ${esc(place(ep.place).name)}</span><span class="ko"> ${esc(ep.title_ko || '')}</span></summary>${lines}${words}</details>`;
      }).join('') || '<p class="empty">Conversations you finish are kept here, so you can read and hear them again.</p>';
    } else if (panelKind === 'bank') {
      h.textContent = 'Bank';
      sub.textContent = 'Checking ···4821';
      const soon = [];
      for (let d = G.day + 1; d <= G.day + 14; d++) {
        const when = dateShort(d);
        if (PAYDAYS.includes(d)) soon.push([when, 'Paycheck (direct deposit)', +hero().salary_net]);
        if (isRentDay(d)) soon.push([when, hero().housing_name || 'Rent', -hero().housing]);
        billsDue(d).forEach(b => soon.push([when, b.name + ' (autopay)', -b.amount]));
      }
      const KIND = { income: 'Deposit', spend: 'Debit card', bill: 'Autopay', fee: 'Bank fee' };
      const line = (when, text, amount, kind) => `<div class="row"><span class="when">${esc(when)}</span><div class="main"><div class="t">${esc(text)}</div>${kind ? `<div class="s">${esc(kind)}</div>` : ''}</div><span class="price ${amount < 0 ? 'out' : 'in'}">${amount < 0 ? '−' : '+'}${usd2(Math.abs(amount)).replace('−', '')}</span></div>`;
      const past = G.log.filter(l => l.amount).slice().reverse().slice(0, 60);
      body.innerHTML = `<div class="sum"><div><b>${usd2(G.money)}</b>available balance</div></div>
        <h3>Coming up</h3>${soon.map(x => line(x[0], x[1], x[2])).join('') || '<p class="empty">Nothing in the next two weeks.</p>'}
        <h3>Recent transactions</h3>${past.map(l => line(`${dateShort(l.day).replace(/^\w+, /, '')} · ${clock(l.minute)}`, l.text, l.amount,
          (/direct deposit/i.test(l.text) ? 'Direct deposit' : KIND[l.type] || '') + (l.tax ? ` · tax ${usd2(l.tax)}` : '') + (l.tip ? ` · tip ${usd2(l.tip)}` : ''))).join('') || '<p class="empty">No transactions yet.</p>'}`;
    } else if (panelKind === 'map') {
      renderMapPanel(h, sub, body);
    }
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
    if (b.dataset.cook) cook(b.dataset.cook);
    if (b.dataset.cookOpen) openPanel('cook');
    if (b.dataset.ride) ride(b.dataset.ride);
    if (b.dataset.pass) { const it = ITEMS[b.dataset.pass]; if (G.money < +it.price) note("You can't afford that.", true); else { pay(-it.price, it.name, 'spend'); G.pass = G.day; saveGame(); renderPanel(); note('Day pass bought. Ride as much as you like today.'); } }
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
    h.textContent = MAP.tab === 'room' && spec.id !== 'city' ? spec.name : `${CFG.city} · town map`;
    sub.textContent = `${weekday(G.day)}, ${clock(G.minute)}`;
    const tabs = zoneId && zoneId !== 'city' ? `<div class="tabs" role="tablist"><button type="button" role="tab" data-tab="town" aria-selected="${MAP.tab !== 'room'}">Town</button><button type="button" role="tab" data-tab="room" aria-selected="${MAP.tab === 'room'}">${esc(zoneName(zoneId)[0])}</button></div>` : '';
    body.innerHTML = `${tabs}<canvas class="map" aria-label="Map"></canvas>
      <div class="legend"><span><i class="you"></i>You</span><span><i class="person"></i>People</span><span><i class="bang">!</i>Someone to talk to</span><span><i class="goal"></i>Where to go</span><span><i class="door"></i>Door</span></div>
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
      const ko = document.body.classList.contains('ko-on') && a.name_ko;
      halo(a.name, X(a.at[0]), Y(a.at[1]) - (ko ? 6 : 0), 'italic 600 11px ' + getComputedStyle(document.body).fontFamily, a.water ? '#2f6f9f' : MAPC.area);
      if (ko) halo(a.name_ko, X(a.at[0]), Y(a.at[1]) + 7, '10px ' + getComputedStyle(document.body).fontFamily, a.water ? '#2f6f9f' : MAPC.area);
    });
    // ----- doors (portals) and places
    portalsOf(spec).forEach(p => {
      const w = Math.max(6, (p.size ? p.size[0] : 1) * s), d = Math.max(4, (p.size ? p.size[1] : 0.6) * s);
      g.fillStyle = MAPC.door; g.fillRect(X(p.at[0]) - w / 2, Y(p.at[1]) - d / 2, w, d);
      g.strokeStyle = '#fff'; g.lineWidth = 1; g.strokeRect(X(p.at[0]) - w / 2, Y(p.at[1]) - d / 2, w, d);
    });
    const font = getComputedStyle(document.body).fontFamily, koOn = document.body.classList.contains('ko-on');
    const labels = [];
    Object.keys(spec.places).forEach(pid => {
      const pl = spec.places[pid];
      if (!pl || !pl.at || pl.guessed || HEROES.some(h => h.home_door === pid && h.id !== G.hero)) return;
      const info = place(pid), isDoor = placeKind(pid) === 'door' || /_door$/.test(pid);
      const x = X(pl.at[0]), y = Y(pl.at[1]);
      if (isDoor) { g.fillStyle = MAPC.pin; g.beginPath(); g.moveTo(x, y - 5); g.lineTo(x + 5, y); g.lineTo(x, y + 5); g.lineTo(x - 5, y); g.closePath(); g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 1.2; g.stroke(); }
      else { g.beginPath(); g.arc(x, y, 5.5, 0, Math.PI * 2); g.fillStyle = MAPC.pin; g.fill(); g.strokeStyle = '#fff'; g.lineWidth = 1.5; g.stroke(); g.beginPath(); g.arc(x, y, 2, 0, Math.PI * 2); g.fillStyle = '#fff'; g.fill(); }
      labels.push({ x, y: y - 9, text: info.name, sub: koOn ? info.name_ko : null, w: 0 });
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
      if (!at.inside) labels.push({ x: x + 7, y, text: String(n.name).split(' ')[0], person: true, left: true });
      else if (j === 0) {
        const names = cast().filter(m => { const q = personOnMap(m, mz, spec); return q && q.inside === at.inside; }).map(m => String(m.name).split(' ')[0]);
        const where = TRAVEL_ZONES.includes(at.inside) ? ` · ${zoneName(at.inside)[0].split(',')[0]}` : '';      // by the shuttle: say where they are
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
      labels.push({ x: x + 9, y, text: 'You' + (you.inside ? ` · in ${zoneName(you.inside)[0].split(',')[0]}` : ''), you: true, left: true });
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
        const people = cast().filter(n => { const at = personOnMap(n, mz, spec); return at && !at.inside && Math.hypot(at.at[0] - pl.at[0], at.at[1] - pl.at[1]) < 2.2; }).map(n => String(n.name).split(' ')[0]);
        const acts = placeActions(pid).map(a => a.label.replace(/ \(.*\)$/, ''));
        const talk = open.filter(e => (isPhone(e) ? e.place === pid : cast().some(n => n.id === e.npc && (npcPlaceNow(n) === pid)))).map(e => e.title);
        if (!people.length && !acts.length && !talk.length) return;
        items.push(`<div class="row"><div class="main"><div class="t">${esc(place(pid).name)}</div><div class="s">${esc(place(pid).name_ko || '')}${people.length ? ' · ' + esc(people.join(', ')) : ''}${acts.length ? ' · ' + esc(acts.join(', ')) : ''}</div>${talk.length ? `<div class="s talk">! ${esc(talk.join(' · '))}</div>` : ''}</div></div>`);
      });
      if (mz === 'city') {
        const gone = cast().filter(n => !personOnMap(n, mz, spec));
        const away = gone.filter(n => npcPlaceNow(n)).map(n => `${String(n.name).split(' ')[0]} (${zoneName(zoneOfPlace(npcPlaceNow(n)))[0]})`);
        const off = gone.filter(n => !npcPlaceNow(n)).map(n => String(n.name).split(' ')[0]);
        if (off.length) items.push(`<div class="row"><div class="main"><div class="t">Off today or gone home</div><div class="s">${esc(off.join(', '))}</div></div></div>`);
        if (away.length) items.push(`<div class="row"><div class="main"><div class="t">Out of town</div><div class="s">${esc(away.join(', '))} · by the airport shuttle</div></div></div>`);
      }
      list.innerHTML = items.join('');
    }
  }

  function buy(id) {
    const i = ITEMS[id];
    if (!i || !G) return false;
    if (i.place && (closedNow(i.place) || closedNow(zoneOfPlace(i.place)))) { if (!panel.hidden) note('Sorry, we are closed.', true); return false; }
    const b = billFor(i), price = b.total;
    if (G.money < price) { if (!panel.hidden) note(`You can't afford that (${receipt(b)}).`, true); speak("Sorry, you can't afford that."); return false; }
    pay(-price, i.name, 'spend', b.tax || b.tip ? { tax: b.tax, tip: b.tip } : null);
    speak(i.name);
    if (i.kind === 'fare') note(`Paid ${usd2(price)}: ${i.name}.`);
    else if (/^(meal|drink)$/.test(i.kind)) {
      G.energy = clamp(G.energy + (+i.energy || 0), 0, E_MAX);
      advanceMinutes(i.kind === 'meal' ? 20 : 5);
      let card = '';
      if (punchable(i)) {
        G.punch = G.punch || {};
        G.punch[i.place] = b.free ? 0 : punches(i.place) + 1;
        card = b.free ? ' This one was on the house.' : onTheHouse(i) ? ' Your punch card is full: the next drink is free.' : ` Punch card: ${punches(i.place)} of ${PUNCH_N - 1}.`;
      }
      note(`${i.name}: ${receipt(b)}. Energy +${i.energy || 0}.${card}`);
      if (player) play(player, 'interact-right', { once: true });
    } else if (i.kind === 'grocery') {
      addLot(id);
      const by = bestBy({ id, day: G.day });
      note(`${i.name} is in your bag (${G.inventory[id]}).${by != null ? ` Best by ${dateShort(by)}.` : ''}`);
    } else {
      addLot(id);
      note(`${i.name}: ${receipt(b)}. It is in your bag.`);
    }
    saveGame();
    if (!panel.hidden) { const n = panel.querySelector('.panel-note').textContent; renderPanel(); panel.querySelector('.panel-note').textContent = n; }
    return true;
  }
  function eat(n) {          // a portion of a package in the bag (its place in G.lots), or of the oldest package of an item (its id)
    const l = ITEMS[n] ? goodLots(n)[0] : lots()[+n];
    if (!l || l.left < 1 || gone(l)) return false;
    const id = l.id, i = ITEMS[id] || { energy: 0, name: pretty(id) };
    if (+i.cook_only) { if (!panel.hidden) note(`The ${shortName(id).toLowerCase()} needs cooking.`, true); return false; }
    l.left--;
    syncBag();
    G.energy = clamp(G.energy + (+i.energy || 0), 0, E_MAX);
    advanceMinutes(10);
    logEvent('eat', i.name, 0);
    saveGame();
    renderPanel();
    note(`You had some ${shortName(id).toLowerCase()}. Energy +${i.energy || 0}.`);
    return true;
  }
  async function ride(pid) {
    const fare = hasPass() ? 0 : busFare();
    if (G.money < fare) { note("You can't afford the fare.", true); return; }
    const nb = nextBus(G.minute);
    if (nb == null) { note(`No more buses tonight. The last one left at ${clock(hm(CFG.bus_last, 1350))}.`, true); return; }
    const waited = Math.max(0, Math.round(nb - G.minute));
    if (fare) pay(-fare, 'Bus fare', 'spend');
    closePanel();
    advanceMinutes(waited + 15);
    await enterZone('city', pid);
    toast(`${waited >= 2 ? `You waited ${waited} minutes for the ${clock(nb)} bus and rode` : 'You ride the bus'} to ${place(pid).name}.`, `${waited >= 2 ? `${waited}분을 기다려 ` : ''}버스를 타고 ${place(pid).name_ko || place(pid).name}에 왔어요.`, null, 4);
  }

  // ---------------------------------------------------------------- sleep: the end of a day
  const isRentDay = (d) => d >= RENT_DAY && (d - RENT_DAY) % 30 === 0;
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
    const phrasesToday = eps.reduce((n, l) => n + rows('phrases').filter(p => p.episode === l.id).length, 0);
    const missed = episodes().filter(e => !G.done[e.id] && e.day_to != null && e.day_to === day && G.day >= (e.day_from || 1));
    const away = TRAVEL_ZONES.includes(zoneId);
    logEvent('sleep', late ? 'Fell asleep' : 'Slept', 0);
    const inAt = G.inDay === day ? G.inAt : null, wasLate = G.lateDay === day;
    hush = true;
    G.day += 1;
    G.minute = DAY_START;
    G.energy = late ? Math.round(E_MAX * 0.8) : E_MAX;          // asleep on your feet at 11 PM is not a night's rest
    G.wet = 0;
    const morning = [];
    if (late) morning.push('You stayed up too late and did not sleep well. You start the day a little tired.<span class="ko"> 너무 늦게까지 깨어 있어서 잠을 설쳤어요. 조금 피곤한 채로 하루를 시작합니다.</span>');
    const hol = holidayOf(G.day);
    if (hol) morning.push(`🗓️ <b>${esc(hol.name)}</b>${hol.kind === 'federal' ? ' (federal holiday)' : ''}. ${esc(hol.note || '')}<span class="ko"> ${esc(hol.name_ko || '')}: ${esc(hol.note_ko || '')}</span>`);
    const me = hero(), housing = me.housing_name || 'Rent';
    if (PAYDAYS.includes(G.day)) { pay(+me.salary_net, 'Paycheck (direct deposit)', 'income'); notify(CFG.bank_name, `A direct deposit of ${usd2(+me.salary_net)} from ${CFG.company} has posted to checking ···4821.`, `${CFG.company}의 급여 ${usd2(+me.salary_net)}가 계좌에 입금되었습니다. (post: 입금이 반영되다)`); morning.push(`Payday: <b>${usd2(+me.salary_net)}</b> was deposited to your account (gross ${usd(+me.salary_gross)}).`); }
    if (isRentDay(G.day)) { pay(-me.housing, housing, 'bill'); notify(CFG.bank_name, `${housing} payment of ${usd2(+me.housing)} was sent from checking ···4821.`, `${/mortgage/i.test(housing) ? '주택 담보 대출 상환금' : '월세'} ${usd2(+me.housing)}가 계좌에서 나갔습니다.`); morning.push(`${housing}: <b>${usd2(+me.housing)}</b> was paid ${/mortgage/i.test(housing) ? 'to the bank' : 'to your landlord'}.`); }
    billsDue(G.day).forEach(b => { pay(-b.amount, b.name, 'bill'); notify(CFG.bank_name, `Autopay: ${usd2(+b.amount)} was paid to ${b.name} from checking ···4821.`, `자동이체: ${b.name_ko || b.name} ${usd2(+b.amount)}가 빠져나갔습니다.`); morning.push(`Autopay: <b>${usd2(+b.amount)}</b> for ${esc(String(b.name).toLowerCase())}.<span class="ko"> 자동이체: ${esc(b.name_ko || b.name)}</span>`); });
    if (G.feeDay === G.day) morning.push(`The bank charged a <b>${usd2(+CFG.overdraft_fee)}</b> overdraft fee.<span class="ko"> 은행이 초과 인출 수수료 ${usd2(+CFG.overdraft_fee)}를 부과했어요.</span>`);
    if (G.money < 0) morning.push('Your account is <b>overdrawn</b>. Spend carefully until payday.<span class="ko"> 계좌 잔액이 마이너스예요. 월급날까지 아껴 쓰세요.</span>');
    hush = false;
    kitchenNews().forEach(m => morning.push(m));
    const wx = weatherOf(G.day);
    morning.unshift(`${WX_ICON[wx.kind] || ''} <b>${WX_NAME[wx.kind] || pretty(wx.kind)}</b>, high ${wx.high_f}°F, low ${wx.low_f}°F. ${esc(wx.forecast || '')}<span class="ko"> ${esc(wx.forecast_ko || '')} (최고 ${toC(wx.high_f)}°C)</span>`);
    const cal = calendar().filter(c => c.day === G.day).sort((a, b) => hm(a.time, 0) - hm(b.time, 0));
    const body = `<div class="sum"><div><b>${eps.length}</b>conversations</div><div><b>${phrasesToday}</b>new phrases</div><div><b>${usd2(spent)}</b>spent</div><div><b>${usd2(earned)}</b>earned</div></div>
      ${eps.length ? '<ul>' + eps.map(l => `<li>${esc(l.text)}</li>`).join('') + '</ul>' : ''}
      ${missed.length ? `<p>Missed: ${missed.map(e => esc(e.title)).join(', ')}</p>` : ''}
      ${inAt != null ? `<p>You got to work at <b>${clock(inAt)}</b>${wasLate ? ', late' : inAt <= hm(CFG.work_start, 540) ? ', on time' : ''}.<span class="ko"> ${hhmm(inAt)}에 출근했어요${wasLate ? ' (지각)' : ''}.</span></p>` : ''}
      <h3>${dateLong(G.day)} · Day ${G.day}</h3>${morning.map(m => `<p>${m}</p>`).join('')}
      ${cal.length ? '<ul>' + cal.map(c => `<li><b>${esc(c.time)}</b> ${esc(c.title)}${c.place ? ' · ' + esc(place(c.place).name) : ''}</li>`).join('') + '</ul>' : `<p>${G.day % 7 === 6 || G.day % 7 === 0 ? 'Weekend. No work today.' : 'Nothing on the calendar.'}</p>`}
      <p>Balance: <b>${usd2(G.money)}</b></p>`;
    saveGame();
    state = 'sleep';
    const wake = pid && zoneId ? [zoneId, pid] : away ? ['hotel', 'hotel_room'] : [hero().home_zone, hero().home_bed];
    const p = enterZone(wake[0], wake[1]).then(() => { if (player) player.heading += 0; saveGame(); });
    showCard({ kicker: late ? 'You fell asleep' : 'Good night', title: `${dateLong(day)} is over`, body, ok: 'Start the day', state: 'sleep' }, () => { goalTimer = 0; });
    return p;
  }

  // ---------------------------------------------------------------- cards (conversation complete, day summary)
  let cardDone = null;
  function showCard(c, then) {
    const card = $('card');
    card.querySelector('.kicker').textContent = c.kicker || '';
    card.querySelector('h2').textContent = c.title || '';
    card.querySelector('.card-body').innerHTML = c.body || '';
    card.querySelector('.ok').textContent = c.ok || 'Continue';
    card.hidden = false;
    state = c.state || 'card';
    cardDone = then || null;
    setTimeout(() => card.querySelector('.ok').focus(), 50);
  }
  function closeCard() {
    $('card').hidden = true;
    state = 'play';
    const f = cardDone;
    cardDone = null;
    if (f) f();
  }
  $('card').querySelector('.ok').addEventListener('click', closeCard);

  // ---------------------------------------------------------------- menu
  function toggleMenu(on) {
    const m = $('menu');
    m.hidden = on == null ? !m.hidden : !on;
    $('menu-btn').setAttribute('aria-expanded', String(!m.hidden));
  }
  $('menu-btn').addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
  document.addEventListener('click', (e) => { if (!$('menu').hidden && !e.target.closest('#menu')) toggleMenu(false); });
  $('menu').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const what = b.dataset.open;
    if (what === 'graphics') { settings.gfx = gfxHigh() ? 'low' : 'high'; saveSettings(); applyQuality(); return; }
    toggleMenu(false);
    if (what === 'title') { saveGame(); showTitle(); }
    else if (what === 'reset') { if (confirm(`Delete ${G ? G.name + "'s" : 'your'} saved game and start over?`)) { resetGame(); } }
    else openPanel(what);
  });
  function resetGame() {
    if (G) deleteSave(G.name);
    G = null;
    if (talk) endTalk();
    panel.hidden = true;
    $('card').hidden = true;
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
    b.innerHTML = `<b></b><span></span><span class="ko"></span>`;
    b.querySelector('b').textContent = h.name;
    b.querySelector('span').textContent = h.role;
    b.querySelector('.ko').textContent = h.role_ko || '';
    b.addEventListener('click', () => { chosen = h.id; replaceArmed = false; markChosen(); newGameLabel(); });
    charBox.appendChild(b);
  });
  function markChosen() {
    const h = heroOf(chosen);
    charBox.querySelectorAll('button').forEach(b => {
      b.setAttribute('aria-checked', String(b.dataset.hero === chosen));
      const m = heroOf(b.dataset.hero).model;
      b.classList.toggle('nomodel', !!packs[m] && packs[m].status === 'missing');
    });
    const info = $('hero-info');
    if (info) info.innerHTML = `<p class="who"><b>${esc(h.full_name || h.name)}</b> · ${esc(h.role)}</p><p>${esc(h.bio || '')}</p><p class="ko">${esc(h.bio_ko || '')}</p>
      <dl><dt>Home</dt><dd>${esc(h.home_name || zoneName(h.home_zone)[0])}<span class="ko"> ${esc(h.home_name_ko || '')}</span></dd>
      <dt>English</dt><dd>${esc(h.level || '')}<span class="ko"> ${esc(h.level_ko || '')}</span></dd>
      <dt>Money</dt><dd>${usd(+h.start_money)} to start · ${usd(+h.salary_net)} every other Friday · ${esc(String(h.housing_name || 'Rent').toLowerCase())} ${usd(+h.housing)}</dd></dl>`;
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
      go.querySelector('b').textContent = g.name;
      go.querySelector('span').textContent = `${heroOf(g.hero).role} · ${weekday(g.day).slice(0, 3)} Day ${g.day}, ${clock(g.minute)} · ${usd(g.money)}`;
      go.addEventListener('click', () => continueGame(g.name));
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'del';
      del.textContent = '✕';
      del.setAttribute('aria-label', `Delete ${g.name}'s game`);
      del.title = 'Delete this saved game';
      let armed = 0;
      del.addEventListener('click', () => {
        if (!armed) { armed = setTimeout(() => { armed = 0; del.textContent = '✕'; del.classList.remove('armed'); }, 4000); del.textContent = 'Delete?'; del.classList.add('armed'); return; }
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
    btn.textContent = `New game as ${name}`;
    note.hidden = !(taken && replaceArmed);
    if (taken && replaceArmed) note.textContent = `${name} already has a saved game (continue it from the list above). Click again to start over and replace it.`;
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
      else toast(`${dateLong(G.day)}. Good morning, ${G.name}!`, `${dateKo(G.day)}. 좋은 아침이에요, ${G.name}!`, 'good', 4);
      const wx = weatherOf(G.day);
      if (wx.forecast) setTimeout(() => toast(`${WX_ICON[wx.kind] || ''} ${wx.high_f}°F today. ${wx.forecast}`, `오늘 최고 ${toC(wx.high_f)}°C. ${wx.forecast_ko || ''}`, null, 5), 4200);
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
    get weather() { return weatherNow(); }, get hero() { return G ? G.hero : null; }, get weekend() { return !!G && isWeekend(G.day); },
    get models() { return Object.keys(window.SO_MODELS || {}); }, characters: CHARACTERS,
    shelter, get raining() { return raining(); },          // an umbrella over a person (life.js: the passers-by)
    actor: (model, opts) => makeActor((opts && opts.id) || 'extra', model, opts), animate, locomotion, gesturing, rest, glowTexture: () => glowTex,
    loadPack, packReady, findPath: (from, to, opts, cb) => requestPath(from, to, opts, cb),
    blocked: (x, z, r) => solids.some(s => x > s.x0 - r && x < s.x1 + r && z > s.z0 - r && z < s.z1 + r)
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
    portalTick();
    if (Z && Z.update) { try { Z.update(api, dt); } catch (e) { console.error(`zones/${zoneId}.js update:`, e); Z.update = null; } }
    if ((goalTimer -= dt) <= 0 && G) { goalTimer = 0.5; if (state === 'play' && !busy) { refreshNpcs(false); checkPhone(); } updateGoal(); }
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
    btn.textContent = 'New game';
    showTitle();
    newGameLabel();
    ready = true;
    enterZone('city').catch(e => console.error(e));        // the backdrop behind the title
  }
  const ZONE_ORDER = [];
  boot().catch(e => { console.error(e); $('new-game').textContent = 'Could not start'; });

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
      if (!$('card').hidden) closeCard();
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
    async startEpisode(id) {
      const ep = EPISODES[id];
      if (!ep) throw new Error('no episode ' + id);
      if (!G) await this.start();
      if (!$('card').hidden) closeCard();
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
        const t = talk.turns[talk.idx];
        if (!dlg.classList.contains('answered')) answered(personal(t.model));
        await until(() => !dlg.querySelector('.next').hidden, 4000);
        dlg.querySelector('.next').click();
        await wait(60);
        return 'turn';
      }
      if (!$('card').hidden) { closeCard(); await wait(60); return 'card'; }
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
      if (!$('card').hidden) closeCard();
      state = 'play';
      await goToSleep(false);
      await until(() => !busy, 8000);
      return G.day;
    },
    buy(itemId) { return buy(itemId); },
    // the phone, the bus, the rain: what has arrived, when the next bus leaves, how wet you are
    get inbox() { return G ? inbox() : []; }, get unread() { return unread(); }, checkPhone() { checkPhone(); return unread(); },
    reply(msgId, replyId) { return replyTo(msgId, replyId); }, get replied() { return G ? Object.assign({}, G.replied) : {}; }, get later() { return G ? (G.later || []).slice() : []; },
    get mail() { return G ? myMail().map(m => ({ id: m.id, day: m.day, kind: m.kind, fresh: !(G.mailGot || {})[m.id] })) : []; }, get newMail() { return newMail().length; },
    get date() { return G ? dateLong(G.day) : null; }, get holiday() { const h = G && holidayOf(G.day); return h ? h.name : null; },
    nextBus(min) { const t = G ? nextBus(min == null ? G.minute : min) : null; return t == null ? null : hhmm(t); }, ride(pid) { return ride(pid); },
    get wet() { return G ? +(G.wet || 0).toFixed(2) : 0; }, set wet(v) { if (G) G.wet = +v; }, get raining() { return raining(); }, get rainSound() { return rainSound.level; },
    get umbrellas() { return Object.values(npcActors).concat(player ? [player] : []).filter(a => a.brolly && a.brolly.visible).map(a => a.id); },
    // the kitchen: the packages in the bag, the recipes that can be made now, cook(recipeId), eat(itemId), toss(n)
    get lots() { return G ? lots().map(l => Object.assign({ bestBy: bestBy(l), gone: gone(l) }, l)) : []; }, get recipes() { return G ? RECIPES.filter(canCook).map(r => r.id) : []; },
    cook(id) { return cook(id); }, eat(id) { return eat(id); }, toss(n) { toss(n); return G.lots.length; },
    get punch() { return G ? Object.assign({}, G.punch) : {}; }, pay(amount, text) { pay(+amount, text || 'Test'); return G.money; },
    arrive(z, place) { return travel(z, place); },
    panel(kind, arg) { openPanel(kind, arg); return state; },
    mapTab(t) { MAP.tab = t === 'room' ? 'room' : 'town'; if (panelKind === 'map') renderPanel(); return MAP.tab; },
    closeCard() { if (!$('card').hidden) closeCard(); if (!panel.hidden) closePanel(); return state; },
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

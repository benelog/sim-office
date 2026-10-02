/* Sim Office — helpers, the language of the screen, the rules (config), the heroes. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
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
const anyOf = (list) => list[Math.floor(Math.random() * list.length)] || null;          // one at random (null from none)
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

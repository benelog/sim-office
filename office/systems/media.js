/* Sim Office — the radio and the TV at home. One of the engine's plain scripts (office/engine, office/systems) that share one scope;
   office/index.html loads them in order. See office/PLAN.md. */
'use strict';
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
// SO.debug: the radio show and the TV
debugPart({
  get radio() { return G ? radioShow() : []; }, tv(id, live) { return tvOn(id, !!live) && (renderPanel(), true); }, get tvNow() { return Object.assign({ file: fileMode, src: tvNow.id ? tvEmbed(TV.find(x => x.id === tvNow.id), tvNow.live) : null }, tvNow); }
});

// Drive Sim Office (office/index.html) in headless Chrome over the DevTools protocol. Used by tools/office-check.sh,
// which starts Chrome (spawning it from node gets it killed in some sandboxes).
//   node tools/office-check.mjs <port> <outdir> [steps.mjs] [width height]
// Default run: title → start(hero) → home → every zone (goto) → for up to 3 days, every
// conversation that opens during the day (the clock is stepped by 30 minutes) is autoplayed, then sleep → panels →
// a phone-sized (390×844) look at the city and a conversation. Prints `finished: true` and the console errors.
// SO_HERO=<jun|derek|priya> plays that hero (jun when not given). SO_DAYS=<n> plays n days instead of 3. SO_DB_JSON=<file.json> replaces office/data/db.js with that data (the shape of window.SO_DB), e.g. to try seeds
// before they are pushed and pulled.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [port, outdir, stepsFile, W, H] = process.argv.slice(2);
const here = path.dirname(new URL(import.meta.url).pathname);
const page = process.env.SO_URL || pathToFileURL(path.join(here, '..', 'office', 'index.html')).href;          // SO_URL: the game served over http (YouTube plays only there)
fs.mkdirSync(outdir, { recursive: true });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
let ws;
for (let i = 0; i < 100 && !ws; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    const t = list.find(x => x.type === 'page');
    if (t) ws = new WebSocket(t.webSocketDebuggerUrl);
  } catch { /* not up yet */ }
  if (!ws) await sleep(200);
}
if (!ws) { console.log('could not connect to Chrome'); process.exit(2); }
await new Promise(r => { ws.onopen = r; });
let id = 0;
const pending = {}, errors = [], warnings = [], missing = [];
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pending[d.id]) { pending[d.id](d); delete pending[d.id]; }
  if (d.method === 'Runtime.consoleAPICalled') {
    const text = d.params.args.map(a => a.value ?? a.description).join(' ');
    if (d.params.type === 'error') errors.push('console.error: ' + text);
    else if (d.params.type === 'warning') warnings.push(text);
  }
  if (d.method === 'Runtime.exceptionThrown') errors.push('EXCEPTION: ' + (d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text));
  if (d.method === 'Log.entryAdded' && d.params.entry.level === 'error') {
    const e = d.params.entry;
    if (e.source === 'network' && /ERR_FILE_NOT_FOUND/.test(e.text)) missing.push(e.url || e.text);
    else errors.push('log: ' + e.text + (e.url ? ' ' + e.url : ''));
  }
};
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
await send('Runtime.enable');
await send('Log.enable');
await send('Page.enable');
if (process.env.SO_DB_JSON) {
  const json = fs.readFileSync(process.env.SO_DB_JSON, 'utf8');
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `(() => { const fx = ${json}; Object.defineProperty(window, 'SO_DB', { configurable: true, get() { return fx; }, set(v) {} }); })();` });
  console.log('data: ' + process.env.SO_DB_JSON);
}
await send('Page.navigate', { url: page });
await sleep(1500);
const ev = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
  if (r.result.exceptionDetails) errors.push('EVAL ERROR: ' + expr.slice(0, 80) + ' → ' + (r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text));
  return r.result.result?.value;
};
let n = 0;
const shot = async (name) => {
  const r = await send('Page.captureScreenshot', { format: 'png' });
  const file = path.join(outdir, `${String(++n).padStart(2, '0')}-${name}.png`);
  fs.writeFileSync(file, Buffer.from(r.result.data, 'base64'));
  console.log('shot', file);
};
const log = (...a) => console.log(...a);
let finished = false;
try {
  if (stepsFile) {
    await (await import(pathToFileURL(path.resolve(stepsFile)).href)).default({ ev, shot, sleep, log, send });
    finished = true;
  } else {
    for (let i = 0; i < 120 && !(await ev('window.SO && SO.debug.ready')); i++) await sleep(250);
    await sleep(2500);
    await shot('title');
    await ev(`SO.debug.start('${process.env.SO_HERO || 'jun'}')`);
    await sleep(1500);
    await shot('home');
    await ev('SO.keys.ArrowUp = true'); await sleep(1200); await ev('SO.keys.ArrowUp = false');
    await sleep(600);
    await shot('walk');
    log('models:', JSON.stringify(await ev('SO.debug.models')));
    const zones = await ev('SO.debug.zones');
    for (const z of zones) {
      await ev(`SO.debug.goto(${JSON.stringify(z)})`);
      await sleep(1300);
      await shot('zone-' + z);
      log(`zone ${z}: people ${JSON.stringify(await ev('SO.debug.npcs'))}, actions ${JSON.stringify(await ev('SO.debug.actions'))}`);
    }
    await ev("SO.debug.goto('home', 'home_bed')");
    await ev('SO.debug.fast = true');
    let epShots = 0;
    const played = [];
    const days = +process.env.SO_DAYS || 3;
    for (let day = 1; day <= days; day++) {
      // a working day: in at the office by 8 (on time), as a player would be, before the day's conversations
      if (await ev('SO.debug.day % 7 !== 6 && SO.debug.day % 7 !== 0')) { await ev('SO.debug.setTime(8 * 60)'); await ev("SO.debug.goto('office', 'office_door')"); }
      if (await ev('SO.debug.day') !== day) break;
      for (let t = 7 * 60; t <= 22 * 60 + 30; t += 30) {
        await ev(`SO.debug.setTime(${t})`);
        const tried = new Set();
        for (let k = 0; k < 20; k++) {          // finishing one can open the next (requires)
          const e = (await ev('SO.debug.episodes()') || []).find(x => !tried.has(x));
          if (!e) break;
          tried.add(e);
          await ev(`SO.debug.startEpisode(${JSON.stringify(e)})`);
          if (epShots < 12 || !tried.has('#shot')) { await sleep(1300); await shot(`d${day}-${e}`); epShots++; tried.add('#shot'); }
          const ok = await ev(`SO.debug.autoplayEpisode(${JSON.stringify(e)})`);
          played.push(`${e}@${await ev('SO.debug.zone')}${ok ? '' : '(NOT DONE)'}`);
        }
      }
      if (day === 1) {
        const items = await ev("(SO_DB.items || []).filter(i => !/fare|rent/.test(i.kind)).map(i => i.id)") || [];
        await ev('SO.debug.setTime(18 * 60)');          // while the shops are open
        for (const it of items.slice(0, 3)) log(`buy ${it}:`, await ev(`SO.debug.buy(${JSON.stringify(it)})`), 'money', await ev('SO.debug.money'));
      }
      const left = await ev(`SO_DB.episodes.filter(e => (e.hero || 'jun') === SO.debug.hero && e.day_to === ${day} && !SO.debug.save.done[e.id]).map(e => e.id)`);
      if (left && left.length) log(`day ${day} not done:`, left.join(' '));
      await ev('SO.debug.setTime(21 * 60)');
      await ev('SO.debug.sleep()');
      await sleep(1200);
      if (day <= 3 || days <= 3) await shot(`d${day}-sleep`);
      await ev('SO.debug.advance()');
      await sleep(600);
    }
    log('played:', played.join(' ') || '(none)');
    log('mission:', JSON.stringify(await ev('SO.debug.mission')), 'score', await ev('SO.debug.score'), 'work', JSON.stringify(await ev('SO.debug.work')));
    if (await ev('SO.debug.state') === 'card') { await shot('mission-card'); await ev('SO.debug.closeCard()'); }
    for (const p of ['talks', 'calendar', 'inventory']) {
      await ev(`SO.debug.panel('${p}')`);
      await sleep(400);
      await shot('panel-' + p);
      await ev('SO.debug.closeCard()');
    }
    await ev("SO.debug.goto('city', 'bus_stop')");
    await sleep(800);
    await ev("SO.debug.panel('map')");
    await sleep(600);
    await shot('panel-map-town');
    await ev('SO.debug.closeCard()');
    await ev("SO.debug.goto('office', 'office_desk')");
    await sleep(800);
    await ev("SO.debug.panel('map')");
    await sleep(600);
    await shot('panel-map-from-office');
    await ev("SO.debug.mapTab('room')");
    await sleep(600);
    await shot('panel-map-room');
    await ev('SO.debug.closeCard()');
    const shopPlace = await ev("((SO_DB.items || []).find(i => !/fare|rent/.test(i.kind)) || {}).place");
    if (shopPlace) {
      await ev(`(async () => { const z = (SO_DB.places.find(p => p.id === ${JSON.stringify(shopPlace)}) || {}).zone; if (z) await SO.debug.goto(z, ${JSON.stringify(shopPlace)}); })()`);
      await ev(`SO.debug.panel('shop', ${JSON.stringify(shopPlace)})`);
      await sleep(900);
      await shot('panel-shop');
      await ev('SO.debug.closeCard()');
    }
    // the screen in Korean: a conversation (a wrong answer and how it goes down) and the work record
    await ev("SO.debug.lang = 'ko'");
    const koEp = await ev("SO.debug.episodes()[0] || (SO_DB.episodes.find(e => (e.hero || 'jun') === SO.debug.hero) || {}).id");
    if (koEp) {
      await ev(`SO.debug.startEpisode(${JSON.stringify(koEp)})`);
      await sleep(1200);
      log('ko choices:', JSON.stringify(await ev('SO.debug.choices')));
      log('ko wrong answer:', await ev('SO.debug.wrong(1)'));
      await sleep(700);
      await shot('ko-talk-wrong');
      await ev("document.querySelector('#dialog .leave').click()");
    }
    for (const p of ['work', 'calendar', 'bank']) { await ev(`SO.debug.panel('${p}')`); await sleep(400); await shot('ko-panel-' + p); await ev('SO.debug.closeCard()'); }
    await ev("SO.debug.lang = 'en'");
    // late three mornings in a row: a text from the manager, a final warning from HR, then let go; after that the badge
    // no longer opens the door of the office
    await ev(`SO.debug.start('${process.env.SO_HERO || 'jun'}')`);
    for (let d = 1; d <= 3; d++) {
      await ev('SO.debug.closeCard()');
      await ev("SO.debug.goto('city', 'office_door')");
      await ev('SO.debug.setTime(10 * 60)');
      await ev("SO.debug.arrive('office', 'office_door')");
      await sleep(900);
      log(`late on day ${d}:`, JSON.stringify(await ev('({ standing: SO.debug.standing, score: SO.debug.score, strikes: SO.debug.work.pts, state: SO.debug.state })')));
      if (d < 3) { await ev('SO.debug.sleep()'); await sleep(600); await ev('SO.debug.advance()'); }
    }
    await shot('fired');
    await ev('SO.debug.closeCard()');
    await sleep(1200);
    await ev('SO.debug.setTime(8 * 60)');
    await ev("SO.debug.arrive('office', 'office_door')");
    await sleep(500);
    await shot('fired-stopped-at-door');
    log('after: zone', await ev('SO.debug.zone'), 'state', await ev('SO.debug.state'), 'open', JSON.stringify(await ev('SO.debug.episodes()')));
    await ev('SO.debug.closeCard()');
    // a phone
    await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await send('Emulation.setTouchEmulationEnabled', { enabled: true });
    await ev("document.body.classList.add('touch')");
    await ev("SO.debug.goto('city')");
    await sleep(1500);
    await shot('phone-city');
    const anyEp = await ev('(SO_DB.episodes || [])[0] && SO_DB.episodes[0].id');
    if (anyEp) {
      await ev(`SO.debug.startEpisode(${JSON.stringify(anyEp)})`);
      await sleep(1500);
      await shot('phone-talk');
      log('wrong answer:', await ev('SO.debug.wrong(0)'));
      await sleep(600);
      await shot('phone-talk-wrong');
      await ev("document.querySelector('#dialog .leave').click()");
    }
    await send('Emulation.clearDeviceMetricsOverride');
    await sleep(500);
    const s = await ev('({ state: SO.debug.state, day: SO.debug.day, time: SO.debug.time, money: SO.debug.money, energy: SO.debug.energy, done: Object.keys(SO.debug.save.done).length, total: (SO_DB.episodes || []).length, phrases: SO.debug.save.phrases.length })');
    log('end:', JSON.stringify(s));
    finished = !!s && s.state === 'play';
  }
} catch (e) { errors.push('CHECK ERROR: ' + e.stack); }
if (warnings.length) console.log('warnings:\n  ' + warnings.join('\n  '));
if (missing.length) console.log('files not found (fallbacks used):\n  ' + missing.map(u => u.replace(/^.*\/office\//, 'office/')).join('\n  '));
console.log('console errors:', errors.length ? '\n  ' + errors.join('\n  ') : 0);
console.log('finished:', finished && !errors.length);
ws.close();
process.exit(errors.length || !finished ? 1 : 0);

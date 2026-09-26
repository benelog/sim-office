// Drive a 3D chapter of the Little Prince game in headless Chrome over the DevTools protocol.
// Used by tools/game-check.sh, which starts Chrome (spawning it from node gets it killed in some sandboxes).
//   node tools/game-check.mjs <port> <chapter> <outdir> [steps.mjs]
// Without steps.mjs: load, screenshot the splash, start, screenshot, walk a little, screenshot, then autoplay every
// step (LP_GAME.debug.autoplay) with a screenshot at each scene, and report the result and any console errors.
// A steps.mjs exports default async ({ ev, shot, sleep, log }) => {} for custom checks.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [port, chapter, outdir, stepsFile] = process.argv.slice(2);
const here = path.dirname(new URL(import.meta.url).pathname);
const page = pathToFileURL(path.join(here, '..', 'index.html')).href + (chapter && chapter !== '0' ? '#' + chapter : '');
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
const pending = {}, logs = [];
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pending[d.id]) { pending[d.id](d); delete pending[d.id]; }
  if (d.method === 'Runtime.consoleAPICalled' && /error|warn/.test(d.params.type)) logs.push(d.params.type + ': ' + d.params.args.map(a => a.value ?? a.description).join(' '));
  if (d.method === 'Runtime.exceptionThrown') logs.push('EXCEPTION: ' + (d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text));
};
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
await send('Runtime.enable');
await send('Page.enable');
await send('Page.navigate', { url: page });
await sleep(1500);
const ev = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
  if (r.result.exceptionDetails) logs.push('EVAL ERROR: ' + (r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text));
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
try {
  if (stepsFile) {
    await (await import(pathToFileURL(path.resolve(stepsFile)).href)).default({ ev, shot, sleep, log });
  } else {
    for (let i = 0; i < 60 && !(await ev('LP_GAME.debug && LP_GAME.debug.ready')); i++) await sleep(250);
    log('loaded:', await ev("document.getElementById('start').textContent"));
    await shot('splash');
    await ev('LP_GAME.debug.start()');
    await sleep(1200);
    await shot('start');
    await ev('LP_GAME.keys.ArrowUp = true'); await sleep(1500); await ev('LP_GAME.keys.ArrowUp = false');
    await sleep(800);
    await shot('walk');
    const total = await ev('LP_GAME.debug.steps');
    const trail = [];
    for (let i = 0; i < 80; i++) {
      if (await ev('LP_GAME.debug.state') === 'done') break;
      const r = await ev('LP_GAME.debug.advance()');
      trail.push(r);
      if (r === 'talk' || r === 'walk') { await sleep(1300); await shot('step' + (await ev('LP_GAME.debug.step'))); }
    }
    await sleep(1800);
    await shot('end');
    log('steps:', total, 'trail:', trail.join(' '));
    log('finished:', await ev("LP_GAME.debug.state === 'done' && !document.getElementById('done').hidden"));
  }
} catch (e) { logs.push('CHECK ERROR: ' + e.stack); }
if (logs.length) console.log(logs.join('\n'));
ws.close();
process.exit(0);

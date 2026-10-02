/* Sim Office — hooks: how a system (office/systems/*.js) takes part in what the engine does without the engine naming it.
   One of the engine's plain scripts (office/engine, office/systems) that share one scope; office/index.html loads them in order. */
'use strict';
//   on('morning', fn, order)    fn(night) → the lines (HTML) it adds to the morning card when a day ends; `order` places
//                               them among the others (the table is in engine/day.js)
// A hook returns a line, a list of lines, or nothing. Hooks of the same order run in the order they were added.
const HOOKS = {};
function on(event, fn, order) {
  const list = HOOKS[event] || (HOOKS[event] = []);
  list.push({ fn, order: order == null ? 500 : order });
  list.sort((a, b) => a.order - b.order);
}
function hooks(event, ...args) {
  const out = [];
  (HOOKS[event] || []).forEach(h => { [].concat(h.fn(...args) || []).forEach(x => { if (x) out.push(x); }); });
  return out;
}
//   debugPart({ … })            what a system adds to window.SO.debug for tests in headless Chrome (getters and methods;
//                               engine/debug.js puts them all together)
const DEBUG_PARTS = [];
const debugPart = (part) => { DEBUG_PARTS.push(part); };

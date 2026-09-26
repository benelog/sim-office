/* localStorage wrapper, namespaced per book. Every read is guarded: a corrupted key never crashes startup. */
window.LP_STORAGE = (function () {
  const NS = 'lp.v1';
  const KEY_SETTINGS = `${NS}.settings`;      // global (answer mode, voice, rate …)
  const KEY_HISTORY = `${NS}.history`;        // global: recent study events, newest first
  const KEY_DICT = `${NS}.dict`;              // global: dictionary lookup cache
  const HISTORY_MAX = 400, DICT_MAX = 300;
  let book = null;                             // current book id

  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const val = JSON.parse(raw);
      return val == null ? fallback : val;
    } catch (e) {
      console.warn('storage read failed', key, e);
      return fallback;
    }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); return true; }
    catch (e) { console.warn('storage write failed', key, e); return false; }
  }
  function remove(key) { try { localStorage.removeItem(key); } catch (e) { /* ignore */ } }
  const k = (name, id) => `${NS}.${id || book}.${name}`;

  function defaultProgress() {
    return { current: 1, completed: {}, read: {}, scene: {}, attempts: {}, updatedAt: null };
  }

  return {
    use(id) { book = id; },
    current: () => book,

    getChapters(id) { const c = read(k('chapters', id), null); return Array.isArray(c) && c.length ? c : null; },
    setChapters(chapters) { return write(k('chapters'), chapters); },
    clearChapters() { remove(k('chapters')); },

    getProgress(id) {
      const p = read(k('progress', id), null);
      const d = defaultProgress();
      if (!p || typeof p !== 'object') return d;
      return Object.assign(d, p);
    },
    setProgress(p) { p.updatedAt = new Date().toISOString(); return write(k('progress'), p); },
    resetProgress() { remove(k('progress')); return defaultProgress(); },

    // per-book info: text source, attribution, parser version, unlock-all flag
    getBookInfo(id) { return Object.assign({ source: null, credit: '', creditAuto: true, parserVersion: 0, freeMove: false }, read(k('book', id), {})); },
    setBookInfo(info) { return write(k('book'), info); },

    getSettings() { return Object.assign({ voice: null, rate: 0.95, autoRead: false, answerMode: 'type', koHelp: false }, read(KEY_SETTINGS, {})); },
    setSettings(s) { return write(KEY_SETTINGS, s); },

    // Study history (all books). Event: { t: ISO time, type: 'open' | 'listen' | 'done' | 'word', book, chapter, title?, mode?, word?, ko? }
    // Reopening the same chapter or looking up the same word again moves the old entry to the top instead of adding a duplicate.
    getHistory() { const h = read(KEY_HISTORY, []); return Array.isArray(h) ? h.filter(e => e && e.t && e.type) : []; },
    addHistory(ev) {
      const h = this.getHistory();
      const same = (e) => e.type === ev.type && e.book === ev.book && (ev.type === 'word' ? e.word === ev.word : e.chapter === ev.chapter);
      const i = h.findIndex(same);
      const prev = i >= 0 ? h.splice(i, 1)[0] : null;
      const fresh = {};
      Object.keys(ev).forEach(key => { if (ev[key] !== '' && ev[key] != null) fresh[key] = ev[key]; });   // an empty gloss must not erase an earlier one
      const entry = Object.assign({}, prev || {}, fresh, { t: new Date().toISOString(), count: ((prev && prev.count) || 0) + 1 });
      h.unshift(entry);
      if (h.length > HISTORY_MAX) h.length = HISTORY_MAX;
      write(KEY_HISTORY, h);
      return entry;
    },
    clearHistory() { remove(KEY_HISTORY); },

    // Dictionary cache: word → entry. Oldest entries are dropped past DICT_MAX.
    getDictEntry(word) { const c = read(KEY_DICT, {}); return c && c[word] ? c[word] : null; },
    setDictEntry(word, entry) {
      const c = read(KEY_DICT, {}) || {};
      c[word] = Object.assign({}, entry, { t: Date.now() });
      const keys = Object.keys(c);
      if (keys.length > DICT_MAX) keys.sort((a, b) => (c[a].t || 0) - (c[b].t || 0)).slice(0, keys.length - DICT_MAX).forEach(k => delete c[k]);
      return write(KEY_DICT, c);
    }
  };
})();

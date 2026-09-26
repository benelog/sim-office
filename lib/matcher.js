/* Free-text answer matching: normalize, expand contractions, keyword groups, small typo tolerance. */
window.LP_MATCHER = (function () {
  const CONTRACTIONS = [
    [/\bwon't\b/g, 'will not'], [/\bcan't\b/g, 'cannot'], [/\bshan't\b/g, 'shall not'],
    [/\bn't\b/g, ' not'], [/\bi'm\b/g, 'i am'], [/\bit's\b/g, 'it is'], [/\bthat's\b/g, 'that is'],
    [/\bwhat's\b/g, 'what is'], [/\bwhere's\b/g, 'where is'], [/\bwho's\b/g, 'who is'],
    [/\b(you|we|they)'re\b/g, '$1 are'], [/\b(i|you|we|they|he|she|it)'ll\b/g, '$1 will'],
    [/\b(i|you|we|they)'ve\b/g, '$1 have'], [/\b(i|you|we|they|he|she|it)'d\b/g, '$1 would'],
    [/\b(he|she)'s\b/g, '$1 is'], [/\blet's\b/g, 'let us']
  ];

  function normalize(s) {
    s = String(s || '').toLowerCase()
      .replace(/[’‘`´]/g, "'").replace(/[“”]/g, '"')
      .replace(/-/g, ' ');
    for (const [re, rep] of CONTRACTIONS) s = s.replace(re, rep);
    s = s.replace(/[^a-z0-9' ]+/g, ' ').replace(/'/g, '').replace(/\s+/g, ' ').trim();
    return s;
  }

  function levenshtein(a, b) {
    if (a === b) return 0;
    if (Math.abs(a.length - b.length) > 1) return 2;
    const prev = new Array(b.length + 1);
    for (let j = 0; j <= b.length; j++) prev[j] = j;
    for (let i = 1; i <= a.length; i++) {
      let last = prev[0]; prev[0] = i;
      for (let j = 1; j <= b.length; j++) {
        const tmp = prev[j];
        prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, last + (a[i - 1] === b[j - 1] ? 0 : 1));
        last = tmp;
      }
    }
    return prev[b.length];
  }

  // keyword may be a single word or a phrase. Phrase: exact word-boundary match on the normalized string.
  // Single word: exact token match, or (for words >= 5 letters) one edit away.
  function hasKeyword(norm, tokens, kw) {
    const k = normalize(kw);
    if (!k) return true;
    if (k.includes(' ')) return (' ' + norm + ' ').includes(' ' + k + ' ');
    if (tokens.includes(k)) return true;
    if (k.length >= 5) return tokens.some(t => t.length >= 4 && levenshtein(t, k) <= 1);
    return false;
  }

  /* answers: array of groups. Group = { all: [...], any: [...] }; a plain string is shorthand for { all: [str] }.
     The input matches when at least one group is satisfied. */
  function match(input, answers) {
    const norm = normalize(input);
    if (!norm) return false;
    const tokens = norm.split(' ');
    return (answers || []).some(g => {
      const grp = typeof g === 'string' ? { all: [g] } : g;
      const allOk = (grp.all || []).every(k => hasKeyword(norm, tokens, k));
      const anyOk = !grp.any || grp.any.length === 0 || grp.any.some(k => hasKeyword(norm, tokens, k));
      return allOk && anyOk;
    });
  }

  // "d___ m_ a s____" style hint from a model answer
  function skeleton(model) {
    return String(model).replace(/[A-Za-z]+/g, w => w[0] + '_'.repeat(Math.max(1, w.length - 1)));
  }

  return { normalize, match, skeleton, levenshtein };
})();

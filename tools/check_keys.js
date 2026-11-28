// Self-consistency: every stored answer must grade as correct with the app's own grader.
const fs = require('fs');
const html = fs.readFileSync('docs/index.html', 'utf8');
let js = html.match(/<script>([\s\S]*)<\/script>/)[1];
js = js.replace(/var reduced = window\.matchMedia[\s\S]*$/, '');      // cut before sound/DOM code
js = js.replace("(function () {\n'use strict';", '');
global.localStorage = { getItem: () => null, setItem: () => {} };
global.window = {}; global.document = {};
eval(js + `
let bad = 0, n = 0;
COURSES.forEach(c => {
  CUR = c;
  const ids = {};
  c.Q.forEach(q => {
    n++;
    if (ids[q.id]) { bad++; console.log('DUP id', q.id); } ids[q.id] = 1;
    if (!c.TBY[q.t]) { bad++; console.log('bad topic', q.id); }
    // questions are shuffled, so none may lean on another question ("the class above", "that project", "same two containers")
    { const t = String(q.q || '').replace(/<[^>]+>/g, ' ');
      if (/\\b(class|code|program|function|table|figure|diagram|hole and shaft|graph) above\\b|\\b(in|for|from|using|with) (that|this) same\\b|^(for|in|using|with) that\\b|\\b(in|for|from|using) the same (project|schedule|class|program|circuit|mixture|sample|setup|alloy|reaction)\\b|\\bthat (same )?project\\b|^same\\b|\\bsame (project|pair|two|mixture|class|circuit|drawing|schedule)\\b|\\bprevious (question|part)\\b|\\bfrom part\\b|\\btutorial \\d|\\bproblem \\d+\\.|\\bfrom the [^.]{0,30}(quiz|practice set|tutorial|assignment)/i.test(t)) { bad++; console.log('NEEDS CONTEXT', c.code, q.id, t.slice(0, 90)); } }
    try {
      if (q.type === 'mc') { if (!(q.a >= 0 && q.a < q.opts.length)) throw 'answer index'; fmt(q.q); q.opts.forEach(fmt); fmt(q.why); }
      else if (q.type === 'txt') { const r = gradeQ(q, [].concat(q.ans)[0]); if (!r.ok) throw 'txt self-grade'; }
      else if (q.type === 'proof' || q.type === 'order') { const r = gradeQ(q, { built: q.steps.map((_, i) => i) }); if (!r.ok) throw 'order self-grade'; (q.alt||[]).forEach(a => { if (!gradeQ(q, {built:a}).ok) throw 'alt'; if (a.length !== q.steps.length) throw 'alt len'; }); }
      else {
        const parts = partsOf(q);
        const resp = parts.map(p => {
          if (p.kind === 'expr' || normLim(p.ans) in LIMV) return [p.ans];
          const S = structOf(p.ans); return [].concat.apply([], S.rows);
        });
        const r = gradeQ(q, resp);
        if (!r.ok) throw 'num self-grade ' + JSON.stringify(r.parts) + ' ' + parts.map(p=>p.ans+'/sf'+p.sf).join(',');
        parts.forEach(p => { if (p.sf && sigFigs(p.ans) !== p.sf) throw 'sf mismatch ' + p.ans; fmt(p.ask); fmt(p.why); fmt(p.hint); });
      }
    } catch (e) { bad++; console.log('FAIL', c.code, q.id, e); }
  });
  // no duplicate questions: the same stem with the same answer, or nearly the same stem (4-character shingles, Jaccard >= 0.8) with the same answer
  { const raw = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/[\\s.,;:?!]+/g, ' ').trim().toLowerCase();
    const ans = q => q.type === 'mc' ? raw(q.opts[q.a]) : q.parts ? q.parts.map(p => String(p.ans)).join('|') : q.steps ? q.steps.map(raw).join('|') : String(q.ans || '');
    const L = c.Q.map(q => { const k = raw(q.q) + ' ' + (q.parts ? q.parts.map(p => raw(p.ask)).join(' ') : '') + ' ' + raw(q.code); const t = k.split(' ').join(''), g = new Set(); for (let i = 0; i + 4 <= t.length; i++) g.add(t.slice(i, i + 4)); return { q, k, g, a: ans(q) }; });
    for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) {
      const A = L[i], B = L[j]; if (A.a !== B.a) continue;
      let inter = 0; for (const x of A.g) if (B.g.has(x)) inter++;
      if (A.k === B.k || inter / (A.g.size + B.g.size - inter || 1) >= 0.8) { bad++; console.log('DUPLICATE', c.code, A.q.id, B.q.id, A.k.slice(0, 70)); }
    } }
  if (c.id === 'che102') c.Q.forEach(q => { const all = [q.q, q.why, q.hint].concat(q.opts || [], ...(q.parts || []).map(p => [p.ask, p.why, p.hint])).join(' '); if (all.indexOf('$') >= 0) { bad++; console.log('stray $', q.id); } });
  console.log(c.code, c.Q.length, 'questions;', c.topics.map(t => t.id + ':' + c.Q.filter(q => q.t === t.id).length).join(' '));
  // mock feasibility
  c.mock.sections.forEach(s => { const k = s.lps ? s.lps.filter(lp => c.Q.some(q => q.lp === lp)).length : c.Q.filter(s.pick).length; const need = s.lps ? s.lps.length : s.n; if (k < need) { bad++; console.log('MOCK short', c.code, s.label, k, need); } else console.log('  mock', s.label, 'pool', k, 'need', need); });
});
// parser spot checks
const T = [['1.0E4',10000],['50.E5',5e6],['8sqrt(2)',8*Math.SQRT2],['5pi/6',5*Math.PI/6],['e^3',Math.exp(3)],['-x^2+1',-3,2],['ln(2)',Math.log(2)],['pi/2+1/2',Math.PI/2+0.5],['2(3+1)',8],['(x+3)/(1-2x)',-5/3,2],['sqrt(16.0)',4],['−1/2',-0.5]];
T.forEach(t => { const v = evalExpr(t[0], t[2]); if (Math.abs(v - t[1]) > 1e-9) { bad++; console.log('PARSE', t[0], v, t[1]); } });
[['3.01E23',3],['1.0E4',2],['150.',3],['150',2],['0.0500',3],['0.455',3],['21',2],['20.0',3]].forEach(t => { if (sigFigs(t[0]) !== t[1]) { bad++; console.log('SF', t[0], sigFigs(t[0]), t[1]); } });
console.log('checked', n, 'questions,', bad, 'problems');
if (bad) process.exit(1);
`);

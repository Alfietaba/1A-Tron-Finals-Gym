const fs = require('fs');
const html = fs.readFileSync('docs/index.html', 'utf8');
let js = html.match(/<script>([\s\S]*)<\/script>/)[1];
js = js.replace(/var reduced = window\.matchMedia[\s\S]*$/, '').replace("(function () {\n'use strict';", '');
global.localStorage = { getItem: () => null, setItem: () => {} }; global.window = {}; global.document = {};
eval(js + `
let bad = 0, n = 0;
function close(a, b, tol) { return Math.abs(a - b) <= (tol || 1e-5) * Math.max(1, Math.abs(b)); }
function rankOf(M) { M = M.map(r => r.slice()); let r = 0; const rows = M.length, cols = M[0].length;
  for (let c = 0; c < cols && r < rows; c++) { let p = -1; for (let i = r; i < rows; i++) if (Math.abs(M[i][c]) > 1e-9) { p = i; break; } if (p < 0) continue;
    [M[r], M[p]] = [M[p], M[r]]; for (let i = 0; i < rows; i++) if (i !== r) { const f = M[i][c] / M[r][c]; for (let j = 0; j < cols; j++) M[i][j] -= f * M[r][j]; } r++; } return r; }
['math116', 'math115'].forEach(cid => {
  const c = COURSES.find(x => x.id === cid); CUR = c;
  c.gens.forEach((g, gi) => {
    for (let s = 1; s <= 400; s++) {
      const q = g.make(Rand(s * 13 + gi * 7));
      const ck = q.chk; const parts = partsOf(q);
      let ok = true, msg = '';
      try {
        if (ck && ck.f) {
          const a = parts[0].ans;
          if (normLim(a) === 'dne') { const L = ck.f(ck.at - 1e-7), Rr = ck.f(ck.at + 1e-7); ok = Math.abs(L - Rr) > 1e-3; msg = L + ' vs ' + Rr; }
          else if (ck.inf) { const v = ck.f(ck.at); ok = close(v, evalExpr(a), 1e-4); msg = v + ' vs ' + a; }
          else { const h1 = 1e-6, L = ck.f(ck.at - h1), Rr = ck.f(ck.at + h1); ok = close(L, evalExpr(a), 1e-4) && close(Rr, evalExpr(a), 1e-4); msg = L + ',' + Rr + ' vs ' + a; }
        } else if (ck && ck.d) { const h1 = 1e-5; const d = (ck.d(ck.at + h1) - ck.d(ck.at - h1)) / (2 * h1); ok = close(d, evalExpr(parts[0].ans), 1e-5); msg = d + ' vs ' + parts[0].ans; }
        else if (ck && ck.tl) { const h1 = 1e-5, x0 = ck.at, m = (ck.tl(x0 + h1) - ck.tl(x0 - h1)) / (2 * h1), b = ck.tl(x0) - m * x0; ok = close(m, evalExpr(parts[0].ans)) && close(b, evalExpr(parts[1].ans)); msg = m + ',' + b; }
        else if (ck && ck.inv) { parts[0].pts.forEach(x => { const y = evalExpr(parts[0].ans, x); if (isFinite(y) && !close(ck.inv(y), x, 1e-7)) { ok = false; msg = 'f(finv(' + x + '))=' + ck.inv(y); } }); }
        else if (ck && ck.rn) { const [m, nn, r, w] = ck.rn; ok = +parts[0].ans === [nn - r, m - r, r, r][w] && r <= Math.min(m, nn); msg = 'rank-nullity'; }
        else if (ck && ck.lin) { const M = parts[0].ans.split(';').map(r => r.split(',').map(Number)); const x = ck.lin[0].map((_, j) => j * 1.7 - 0.9);
          ck.lin.forEach((row, i) => { const want = row.reduce((s, v, j) => s + v * x[j], 0), got = M[i].reduce((s, v, j) => s + v * x[j], 0); if (!close(want, got)) ok = false; }); msg = 'std matrix'; }
        else if (ck && ck.det) { const M = ck.det.map(r => r.slice()); let d = 1; for (let c2 = 0; c2 < 3; c2++) { let p = c2; while (p < 3 && Math.abs(M[p][c2]) < 1e-12) p++; if (p === 3) { d = 0; break; } if (p !== c2) { [M[p], M[c2]] = [M[c2], M[p]]; d = -d; } d *= M[c2][c2]; for (let i = c2 + 1; i < 3; i++) { const f = M[i][c2] / M[c2][c2]; for (let j = c2; j < 3; j++) M[i][j] -= f * M[c2][j]; } }
          ok = close(d, +parts[0].ans, 1e-9); msg = 'det ' + d + ' vs ' + parts[0].ans; }
        else if (ck && ck.cx) { const [a, b, c2, d, op] = ck.cx; let re, im; if (op === 'mul') { re = a * c2 - b * d; im = a * d + b * c2; } else if (op === 'add') { re = a + c2; im = b + d; } else if (op === 'pow') { re = a * a - b * b; im = 2 * a * b; } else { const m2 = Math.hypot(c2, d) ** 2; re = (a * c2 + b * d) / m2; im = (b * c2 - a * d) / m2; }
          const g = parts[0].ans.slice(1, -1).split(',').map(v => evalExpr(v)); ok = close(g[0], re) && close(g[1], im); msg = 'cx ' + re + ',' + im + ' vs ' + parts[0].ans; }
        else if (ck && ck.eig) { const A = ck.eig, l = +parts[0].ans; if (ck.vec) { const v = ck.vec, Av = [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]]; ok = close(Av[0], l * v[0]) && close(Av[1], l * v[1]); }
          else { const dt = (A[0][0] - l) * (A[1][1] - l) - A[0][1] * A[1][0]; const tr = A[0][0] + A[1][1], disc = tr * tr - 4 * (A[0][0] * A[1][1] - A[0][1] * A[1][0]); const other = tr - l; ok = Math.abs(dt) < 1e-9 && disc > 0 && (/larger/.test(q.q) ? l > other : l < other); }
          msg = 'eig ' + l; }
        else if (ck && ck.val != null) { ok = close(ck.val, evalExpr(parts[0].ans)); msg = ck.val + ' vs ' + parts[0].ans; }
        else if (ck && ck.root) { ok = Math.abs(ck.root(evalExpr(parts[0].ans))) < 1e-9; msg = 'root ' + parts[0].ans; }
        else if (ck && ck.cont) { const k = evalExpr(parts[0].ans); ok = close(ck.cont(k, ck.at - 1e-9), ck.cont(k, ck.at), 1e-6); msg = 'k=' + k; }
        else if (ck && ck.rank) { ok = rankOf(ck.rank) === +parts[0].ans; msg = 'rank ' + rankOf(ck.rank) + ' vs ' + parts[0].ans; }
        else if (ck && ck.A) { const A = ck.A, I = parts[0].ans.split(';').map(r => r.split(',').map(v => evalExpr(v)));
          for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { const v = A[i][0] * I[0][j] + A[i][1] * I[1][j]; if (!close(v, i === j ? 1 : 0)) ok = false; } msg = 'A*Ainv'; }
        else if (q.parts && q.parts[1] && q.parts[1].chkAB) { const [A, B, w] = q.parts[1].chkAB, C = evalExpr(q.parts[0].ans), ph = evalExpr(q.parts[1].ans);
          [0.3, 1.1, 2.7].forEach(x => { if (!close(C * Math.sin(w * x + ph), A * Math.sin(w * x) + B * Math.cos(w * x), 1e-9)) ok = false; });
          if (!(ph > -Math.PI && ph <= Math.PI)) ok = false; msg = 'C=' + C + ' ph=' + ph; }
        else continue;
      } catch (e) { ok = false; msg = String(e); }
      n++;
      if (!ok) { bad++; if (bad < 25) console.log('FAIL', cid, gi, msg, String(q.q).slice(0, 140)); }
    }
  });
});
console.log('independent numeric checks', n, 'failures', bad);
if (bad) process.exit(1);
`);

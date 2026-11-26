/* ============================================================
   QUESTION GENERATORS (infinite mode): fresh numbers every time
   ============================================================ */
function mkRng(seed) {
  var a = seed >>> 0;
  return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
function Rand(seed) {
  var r = mkRng(seed == null ? (Math.random() * 4294967296) >>> 0 : seed);
  var R = {
    u: r,
    i: function (a, b) { return a + Math.floor(r() * (b - a + 1)); },
    p: function (arr) { return arr[Math.floor(r() * arr.length)]; },
    sg: function () { return r() < 0.5 ? -1 : 1; },
    nz: function (a, b) { var v; do { v = R.i(a, b); } while (v === 0); return v; },
    sh: function (arr) { arr = arr.slice(); for (var i = arr.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = arr[i]; arr[i] = arr[j]; arr[j] = t; } return arr; },
    f: function (a, b, dp) { var m = Math.pow(10, dp); return Math.round((a + r() * (b - a)) * m) / m; },
    chance: function (p) { return r() < p; }
  };
  return R;
}
function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a || 1; }
function frac(n, d) { if (d < 0) { n = -n; d = -d; } var g = gcd(n, d); n /= g; d /= g; return d === 1 ? String(n) : n + '/' + d; }
function fracHTML(n, d) { return minus(frac(n, d)); }
function sigCount(str) {
  var s = String(str).trim().replace(/^[+−-]/, ''), m = /^(\d*)(\.?)(\d*)(?:[eE][+-]?\d+)?$/.exec(s);
  if (!m) return -1;
  var digits = (m[1] + m[3]).replace(/^0+/, '');
  if (!m[2]) digits = digits.replace(/0+$/, '');
  return Math.max(digits.length, 1);
}
function expForm(v, n) {
  var e = Math.floor(Math.log10(Math.abs(v))), ms = (v / Math.pow(10, e)).toFixed(n - 1);
  if (Math.abs(parseFloat(ms)) >= 10) { e++; ms = (v / Math.pow(10, e)).toFixed(n - 1); }
  return ms + 'E' + e;
}
/* n significant figures, Mobius style: 1.23E4, 150., 0.0456 */
function sig(x, n) {
  if (x === 0) return '0';
  var s = Number(x.toPrecision(n)), e = Math.floor(Math.log10(Math.abs(s)));
  if (e >= 5 || e <= -4) return expForm(s, n);
  var dec = Math.max(0, n - 1 - e), str = s.toFixed(dec);
  if (dec === 0 && sigCount(str) !== n) str = str.replace('-', '').length === n ? str + '.' : expForm(s, n);
  return str;
}
/* how cout prints a double by default (6 significant digits, no trailing zeros) */
function coutD(x) {
  if (Number.isInteger(x)) return String(x);
  var s = x.toPrecision(6);
  if (s.indexOf('.') >= 0 && s.indexOf('e') < 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
  return s;
}
function code(s) { return '\u0001' + s + '\u0002'; }
function icode(s) { return '\u0003' + s + '\u0004'; }
/* multiple choice helper: correct first, distractors after; dedupes and shuffles */
function gmc(R, id, t, q, right, wrongs, why, x) {
  var seen = {}, opts = [right];
  seen[right] = 1;
  wrongs.forEach(function (w) { if (!seen[w] && opts.length < 5) { seen[w] = 1; opts.push(w); } });
  var order = R.sh(opts.map(function (_, i) { return i; }));
  return mc(id, t, q, order.map(function (i) { return opts[i]; }), order.indexOf(0), why, x);
}
var AW = { H: 1.00794, He: 4.00260, C: 12.011, N: 14.0067, O: 15.9994, Na: 22.9898, Mg: 24.3050, Al: 26.9815, Si: 28.0855, P: 30.9738, S: 32.066, Cl: 35.4527, Ar: 39.948, K: 39.0983, Ca: 40.078, Fe: 55.847, Cu: 63.546, Zn: 65.39, Ne: 20.1797, Xe: 131.29 };
function molar(f) {
  var i = 0;
  function grp() {
    var tot = 0;
    while (i < f.length && f.charAt(i) !== ')') {
      if (f.charAt(i) === '(') { i++; var sub = grp(); i++; var m = /^\d+/.exec(f.slice(i)); var k = m ? +m[0] : 1; if (m) i += m[0].length; tot += sub * k; }
      else { var e = /^([A-Z][a-z]?)(\d*)/.exec(f.slice(i)); tot += AW[e[1]] * (e[2] ? +e[2] : 1); i += e[0].length; }
    }
    return tot;
  }
  return grp();
}
function chemF(f) { return f.replace(/([A-Za-z\)])(\d+)/g, '$1<sub>$2</sub>'); }
function eqHTML(rx) {
  function side(a) { return a.map(function (t) { return (t[0] === 1 ? '' : t[0] + ' ') + chemF(t[1]); }).join(' + '); }
  return side(rx.r) + ' → ' + side(rx.p);
}
var Rg = 0.082057;

(function () {
function course(id) { return COURSES.filter(function (c) { return c.id === id; })[0]; }
var gid = 0;
function nid(k) { return 'g~' + k + '~' + (++gid); }

/* ==================== MATH 115 ==================== */
course('math115').gens = [
  { t: 't1', make: function (R) {
    var a = R.nz(-3, 4), b = R.nz(-3, 4), u = [R.i(-4, 4), R.i(-4, 4), R.i(-4, 4)], v = [R.i(-4, 4), R.i(-4, 4), R.i(-4, 4)];
    var w = u.map(function (x, i) { return a * x + b * v[i]; });
    return num(nid('lc'), 't1', 'Compute ' + a + '{{' + u.join(',') + '}} ' + (b < 0 ? '− ' + (-b) : '+ ' + b) + '{{' + v.join(',') + '}}.', '(' + w.join(',') + ')',
      'Scale each vector, then add entry by entry.', 'Entry by entry: ' + w.map(function (x, i) { return a + '(' + u[i] + ') + ' + b + '(' + v[i] + ') = ' + x; }).join(', ') + '.');
  } },
  { t: 't2', make: function (R) {
    var trip = R.p([[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [2, 6, 9, 11], [4, 4, 7, 9], [2, 10, 11, 15], [6, 6, 7, 11]]);
    var v = R.sh(trip.slice(0, 3)).map(function (x) { return x * R.sg(); });
    if (R.chance(0.5)) return num(nid('norm'), 't2', 'Compute ‖{{' + v.join(',') + '}}‖.', String(trip[3]), 'Square each entry, add, take the square root.', '√(' + v.map(function (x) { return x * x; }).join(' + ') + ') = √' + trip[3] * trip[3] + ' = ' + trip[3] + '.');
    var u = [R.i(-4, 4), R.i(-4, 4), R.i(-4, 4)], d = u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
    return num(nid('dot'), 't2', 'Let ~u~ = {{' + u.join(',') + '}} and ~v~ = {{' + v.join(',') + '}}. Compute ~u~·~v~.', String(d), 'Multiply matching entries and add.', u.map(function (x, i) { return '(' + x + ')(' + v[i] + ')'; }).join(' + ') + ' = ' + d + '.');
  } },
  { t: 't4', make: function (R) {
    var u = [R.i(-3, 4), R.i(-3, 4), R.i(-3, 4)], v = [R.i(-3, 4), R.i(-3, 4), R.i(-3, 4)];
    var c = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
    return num(nid('cross'), 't4', 'Compute {{' + u.join(',') + '}} × {{' + v.join(',') + '}}.', '(' + c.join(',') + ')',
      'Pattern: (u₂v₃ − u₃v₂, u₃v₁ − u₁v₃, u₁v₂ − u₂v₁).',
      'First: (' + u[1] + ')(' + v[2] + ') − (' + u[2] + ')(' + v[1] + ') = ' + c[0] + '. Second: (' + u[2] + ')(' + v[0] + ') − (' + u[0] + ')(' + v[2] + ') = ' + c[1] + '. Third: (' + u[0] + ')(' + v[1] + ') − (' + u[1] + ')(' + v[0] + ') = ' + c[2] + '.');
  } },
  { t: 't5', make: function (R) {
    var y = [R.i(-3, 3), R.i(-3, 3), R.i(1, 3)], x = [R.i(-4, 5), R.i(-4, 5), R.i(-4, 5)];
    var xy = x[0] * y[0] + x[1] * y[1] + x[2] * y[2], yy = y[0] * y[0] + y[1] * y[1] + y[2] * y[2];
    var p = y.map(function (c) { return frac(xy * c, yy); });
    return num(nid('proj'), 't5', 'Let ~x~ = {{' + x.join(',') + '}} and ~y~ = {{' + y.join(',') + '}}. Compute proj<sub>~y~</sub>(~x~).', '(' + p.join(',') + ')',
      'proj = ((~x~·~y~) / (~y~·~y~)) ~y~.', '~x~·~y~ = ' + xy + ' and ~y~·~y~ = ' + yy + ', so proj = (' + frac(xy, yy) + ')~y~ = {{' + p.join(',') + '}}.');
  } },
  { t: 't5', make: function (R) {
    var n = R.p([[1, 2, 2, 3], [2, -2, 1, 3], [2, 3, 6, 7], [2, 6, -3, 7], [4, 4, 7, 9]]), P = [R.i(-3, 4), R.i(-3, 4), R.i(-3, 4)];
    var lhs = n[0] * P[0] + n[1] * P[1] + n[2] * P[2], k = R.i(1, 4) * R.sg(), c = lhs - k * n[3];
    return num(nid('dpl'), 't5', 'Find the distance from P(' + P.join(', ').replace(/-/g, '−') + ') to the plane ' + n[0] + 'x₁ ' + (n[1] < 0 ? '− ' + (-n[1]) : '+ ' + n[1]) + 'x₂ ' + (n[2] < 0 ? '− ' + (-n[2]) : '+ ' + n[2]) + 'x₃ = ' + minus(c) + '.', String(Math.abs(k)),
      'distance = |~n~·P − c| / ‖~n~‖.', '~n~·P = ' + lhs + ' and ‖~n~‖ = ' + n[3] + '. Distance = |' + lhs + ' − (' + c + ')| / ' + n[3] + ' = ' + Math.abs(k) + '.');
  } },
  { t: 't6', make: function (R) {
    var A, det;
    do { A = [[R.i(-3, 3), R.i(-3, 3), R.i(-3, 3)], [R.i(-3, 3), R.i(-3, 3), R.i(-3, 3)], [R.i(-3, 3), R.i(-3, 3), R.i(-3, 3)]];
      det = A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
    } while (det === 0);
    var x = [R.i(-3, 4), R.i(-3, 4), R.i(-3, 4)], b = A.map(function (r) { return r[0] * x[0] + r[1] * x[1] + r[2] * x[2]; });
    function term(c, v, first) { if (c === 0) return ''; var s = c < 0 ? (first ? '−' : ' − ') : (first ? '' : ' + '); var a = Math.abs(c); return s + (a === 1 ? '' : a) + v; }
    var eqs = A.map(function (r, i) { var s = term(r[0], 'x₁', true); s += term(r[1], 'x₂', !s); s += term(r[2], 'x₃', !s); return (s || '0') + ' = ' + minus(b[i]); });
    return num(nid('sys3'), 't6', 'Solve the system:<br>' + eqs.join('<br>'), '(' + x.join(',') + ')', 'Row reduce the augmented matrix, then back-substitute.',
      'The unique solution is x₁ = ' + minus(x[0]) + ', x₂ = ' + minus(x[1]) + ', x₃ = ' + minus(x[2]) + '. Check it in every equation: ' + A.map(function (r, i) { return r[0] + '(' + x[0] + ') + ' + r[1] + '(' + x[1] + ') + ' + r[2] + '(' + x[2] + ') = ' + b[i]; }).join('; ') + '.', ['x₁', 'x₂', 'x₃']);
  } },
  { t: 't7', make: function (R) {
    var r = R.i(1, 3), rows = [];
    var base = [[1, R.i(-2, 2), R.i(-2, 2), R.i(-2, 2)], [0, 1, R.i(-2, 2), R.i(-2, 2)], [0, 0, 1, R.i(-2, 2)]].slice(0, r);
    for (var i = 0; i < 3; i++) {
      var c = [R.i(-2, 2), R.i(-2, 2), R.i(-2, 2)].slice(0, r);
      if (c.every(function (v) { return v === 0; })) c[0] = 1;
      if (i < r) { c = c.map(function () { return 0; }); c[i] = 1; c = c.map(function (v, k) { return k === i ? 1 : (k < i ? R.i(-1, 1) : 0); }); }
      rows.push([0, 1, 2, 3].map(function (j) { var s = 0; for (var k = 0; k < r; k++) s += c[k] * base[k][j]; return s; }));
    }
    rows = R.sh(rows);
    return num(nid('rank'), 't7', 'Find the rank of [[' + rows.map(function (rw) { return rw.join(','); }).join(';') + ']].', String(r), 'Row reduce and count the nonzero rows.',
      'Row reducing leaves ' + r + ' nonzero row' + (r > 1 ? 's' : '') + ' (the other rows are combinations of them), so the rank is ' + r + '. A 3 × 4 system with this coefficient matrix would have ' + (4 - r) + ' free variable' + (4 - r === 1 ? '' : 's') + '.', null, null, { chk: { rank: rows } });
  } },
  { t: 't9', make: function (R) {
    var m = R.p([[2, 2, 2], [2, 3, 2], [2, 2, 3], [3, 2, 2]]), A = [], B = [];
    for (var i = 0; i < m[0]; i++) { A.push([]); for (var j = 0; j < m[1]; j++) A[i].push(R.i(-3, 4)); }
    for (i = 0; i < m[1]; i++) { B.push([]); for (j = 0; j < m[2]; j++) B[i].push(R.i(-3, 4)); }
    var P = A.map(function (r) { return B[0].map(function (_, j) { var s = 0; for (var k = 0; k < m[1]; k++) s += r[k] * B[k][j]; return s; }); });
    var ms = function (M) { return '[[' + M.map(function (r) { return r.join(','); }).join(';') + ']]'; };
    return num(nid('mm'), 't9', 'Let A = ' + ms(A) + ' and B = ' + ms(B) + '. Compute AB.', P.map(function (r) { return r.join(','); }).join(';'),
      'Entry (i, j) is row i of A dotted with column j of B.', 'AB is ' + m[0] + ' × ' + m[2] + '. For example, entry (1,1) = ' + A[0].map(function (v, k) { return '(' + v + ')(' + B[k][0] + ')'; }).join(' + ') + ' = ' + P[0][0] + '.', null, 'mat');
  } },
  { t: 't10', make: function (R) {
    var a, b, c, d, det;
    do { a = R.i(-4, 5); b = R.i(-4, 5); c = R.i(-4, 5); d = R.i(-4, 5); det = a * d - b * c; } while ([1, -1, 2, -2, 3, -3, 4].indexOf(det) < 0);
    var inv = [frac(d, det), frac(-b, det), frac(-c, det), frac(a, det)];
    return num(nid('inv2'), 't10', 'Find the inverse of [[' + a + ',' + b + ';' + c + ',' + d + ']].', inv[0] + ',' + inv[1] + ';' + inv[2] + ',' + inv[3],
      'For [[a,b;c,d]] the inverse is (1/(ad − bc)) [[d,−b;−c,a]].', 'ad − bc = ' + a + '·' + d + ' − ' + b + '·' + c + ' = ' + det + '. Swap a and d, negate b and c, divide by ' + det + '. On the exam, show the row reduction of [A | I].', null, 'mat', { chk: { A: [[a, b], [c, d]] } });
  } },
  { t: 't8', make: function (R) {
    var A = [[R.i(-3, 3), R.i(-3, 3), R.i(-3, 3)], [R.i(-3, 3), R.i(-3, 3), R.i(-3, 3)]], x = [R.i(-3, 3), R.i(-3, 3), R.i(-3, 3)];
    var y = A.map(function (r) { return r[0] * x[0] + r[1] * x[1] + r[2] * x[2]; });
    return num(nid('mv'), 't8', 'Compute [[' + A.map(function (r) { return r.join(','); }).join(';') + ']]{{' + x.join(',') + '}}.', '(' + y.join(',') + ')',
      'Each output entry is a row dotted with the vector.', 'Row 1: ' + y[0] + '. Row 2: ' + y[1] + '. Equivalently, the answer is ' + x[0] + '(column 1) + ' + x[1] + '(column 2) + ' + x[2] + '(column 3).');
  } },
  /* ---------- chapters 4 to 8 ---------- */
  { t: 't14', make: function (R) {
    var m = R.i(3, 6), n = R.i(3, 8), r = R.i(1, Math.min(m, n)), w = R.i(0, 3);
    var ask = ['the nullity of A', 'dim Null(Aᵀ)', 'dim Col(A)', 'dim Row(A)'][w], ans = [n - r, m - r, r, r][w];
    var why = ['Rank–Nullity: rank + nullity = number of columns, so nullity = ' + n + ' − ' + r + ' = ' + (n - r) + '.',
      'Aᵀ is ' + n + ' × ' + m + ' with the same rank ' + r + '. Rank–Nullity for Aᵀ: dim Null(Aᵀ) = ' + m + ' − ' + r + ' = ' + (m - r) + '.',
      'dim Col(A) = rank(A) = ' + r + '.', 'dim Row(A) = rank(A) = ' + r + ', the same as dim Col(A).'][w];
    return num(nid('rn'), 't14', 'A is a ' + m + ' × ' + n + ' matrix with rank ' + r + '. What is ' + ask + '?', String(ans), 'Rank–Nullity: rank(A) + nullity(A) = number of columns.', why, null, null, { chk: { rn: [m, n, r, w] } });
  } },
  { t: 't15', make: function (R) {
    var n = R.p([2, 3]), m = R.p([2, 3]), rows = [], terms = [];
    for (var i = 0; i < m; i++) {
      var row = []; for (var j = 0; j < n; j++) row.push(R.chance(0.3) ? 0 : R.nz(-4, 5));
      if (row.every(function (v) { return v === 0; })) row[R.i(0, n - 1)] = 1;
      rows.push(row);
      terms.push(row.map(function (v, j) { return v ? (v === 1 ? '' : v === -1 ? '−' : minus(String(v))) + 'x<sub>' + (j + 1) + '</sub>' : ''; }).filter(Boolean).join(' + ').replace(/\+ −/g, '− '));
    }
    var args = []; for (var k = 1; k <= n; k++) args.push('x<sub>' + k + '</sub>');
    return num(nid('std'), 't15', 'Find the standard matrix of T(' + args.join(', ') + ') = (' + terms.join(', ') + ').', rows.map(function (r) { return r.join(','); }).join(';'),
      'Column j is T(~e~<sub>j</sub>): read off the coefficients of x<sub>j</sub>.', 'Row i of [T] holds the coefficients of output i, so [T] = [[' + rows.map(function (r) { return r.join(','); }).join(';') + ']], a ' + m + ' × ' + n + ' matrix.', null, null, { chk: { lin: rows } });
  } },
  { t: 't17', make: function (R) {
    var M = [0, 1, 2].map(function () { return [R.i(-3, 4), R.i(-3, 4), R.i(-3, 4)]; });
    var c = function (i, j) { var r = [0, 1, 2].filter(function (x) { return x !== i; }), s = [0, 1, 2].filter(function (x) { return x !== j; }); return M[r[0]][s[0]] * M[r[1]][s[1]] - M[r[0]][s[1]] * M[r[1]][s[0]]; };
    var d = M[0][0] * c(0, 0) - M[0][1] * c(0, 1) + M[0][2] * c(0, 2);
    return num(nid('det'), 't17', 'Compute det [[' + M.map(function (r) { return r.join(','); }).join(';') + ']].', String(d), 'Expand along a row or column with zeros if there is one, or use row operations.',
      'Along row 1: ' + M[0][0] + '(' + c(0, 0) + ') − ' + '(' + M[0][1] + ')(' + c(0, 1) + ') + (' + M[0][2] + ')(' + c(0, 2) + ') = ' + d + '.', null, null, { chk: { det: M } });
  } },
  { t: 't18', make: function (R) {
    var a = R.i(-5, 5), b = R.nz(-5, 5), c = R.i(-4, 4), d = R.nz(-4, 4), op = R.p(['mul', 'mul', 'div', 'add', 'pow']);
    var z = function (x, y) { return '(' + minus(String(x)) + (y < 0 ? ' − ' : ' + ') + Math.abs(y) + 'i)'; }, re, im, q, why;
    if (op === 'mul') { re = a * c - b * d; im = a * d + b * c; q = z(a, b) + z(c, d); why = 'Expand: ' + a * c + ' + ' + a * d + 'i + ' + b * c + 'i + ' + b * d + 'i², and i² = −1.'; }
    else if (op === 'add') { re = a + c; im = b + d; q = z(a, b) + ' + ' + z(c, d); why = 'Add the real parts and the imaginary parts.'; }
    else if (op === 'pow') { re = a * a - b * b; im = 2 * a * b; q = z(a, b) + '²'; why = '(a + bi)² = a² − b² + 2abi.'; }
    else { var den = c * c + d * d; re = frac(a * c + b * d, den); im = frac(b * c - a * d, den); q = z(a, b) + ' / ' + z(c, d); why = 'Multiply the top and bottom by the conjugate ' + z(c, -d) + '. The bottom becomes ' + c + '² + ' + d + '² = ' + den + '.'; }
    return num(nid('cx'), 't18', 'Write ' + q + ' in standard form a + bi.' + (op === 'div' ? ' Fractions are fine.' : ''), '(' + re + ',' + im + ')', op === 'div' ? 'Multiply by the conjugate of the denominator.' : 'Use i² = −1.', why, ['a', 'b'], null, { chk: { cx: [a, b, c, d, op] } });
  } },
  { t: 't19', make: function (R) {
    var l1 = R.i(-3, 6), l2 = R.i(-3, 6); while (l2 === l1) l2 = R.i(-3, 6);
    var P = R.p([[[1, 1], [0, 1]], [[2, 1], [1, 1]], [[1, 2], [1, 3]], [[1, 0], [1, 1]], [[3, 2], [1, 1]], [[1, 1], [1, 2]]]);
    var dP = P[0][0] * P[1][1] - P[0][1] * P[1][0], Pi = [[P[1][1] / dP, -P[0][1] / dP], [-P[1][0] / dP, P[0][0] / dP]];
    var PD = [[P[0][0] * l1, P[0][1] * l2], [P[1][0] * l1, P[1][1] * l2]];
    var A = [[PD[0][0] * Pi[0][0] + PD[0][1] * Pi[1][0], PD[0][0] * Pi[0][1] + PD[0][1] * Pi[1][1]], [PD[1][0] * Pi[0][0] + PD[1][1] * Pi[1][0], PD[1][0] * Pi[0][1] + PD[1][1] * Pi[1][1]]];
    var As = '[[' + A[0].join(',') + ';' + A[1].join(',') + ']]', w = R.i(0, 2), tr = A[0][0] + A[1][1], dt = A[0][0] * A[1][1] - A[0][1] * A[1][0];
    var poly = 'det(A − λI) = λ² − ' + tr + 'λ + ' + dt + ' = (λ − ' + l1 + ')(λ − ' + l2 + ')';
    if (w === 2) {
      var v = [P[0][0], P[1][0]];
      return num(nid('eig'), 't19', '{{' + v.join(',') + '}} is an eigenvector of ' + As + '. What is its eigenvalue?', String(l1), 'Multiply A by the vector and compare with the vector.', 'A{{' + v.join(',') + '}} = {{' + (A[0][0] * v[0] + A[0][1] * v[1]) + ',' + (A[1][0] * v[0] + A[1][1] * v[1]) + '}} = ' + l1 + '{{' + v.join(',') + '}}.', null, null, { chk: { eig: A, vec: v } });
    }
    var big = w === 0, ans = big ? Math.max(l1, l2) : Math.min(l1, l2);
    return num(nid('eig'), 't19', 'What is the ' + (big ? 'larger' : 'smaller') + ' eigenvalue of ' + As + '?', String(ans), 'Solve det(A − λI) = 0. The eigenvalues add to the trace and multiply to det A.', poly.replace(/− −/g, '+ ').replace(/\+ −/g, '− ') + '. The eigenvalues are ' + l1 + ' and ' + l2 + '.', null, null, { chk: { eig: A } });
  } }
];

/* ==================== MTE 121 ==================== */
var P121 = 'The code runs inside main(). Type the exact output.';
var WORDS = ['robot', 'sensor', 'encoder', 'gyro', 'motor', 'bumper', 'vector', 'pixel', 'stack', 'debug', 'compile', 'waterloo'];
course('mte121').gens = [
  { t: 'c1', make: function (R) {
    var a = R.i(11, 97) * (R.chance(0.25) ? -1 : 1), b = R.i(2, 9);
    var out = Math.trunc(a / b) + ' ' + (a % b) + ' ' + coutD(a / b);
    return txt(nid('div'), 'c1', P121 + code('int a = ' + a + ', b = ' + b + ';\ncout << a / b << " " << a % b << " " << (double)a / b;'), out,
      'Integer division truncates toward zero, and % keeps the sign of the left operand.', a + ' / ' + b + ' = ' + Math.trunc(a / b) + ' (truncated), ' + a + ' % ' + b + ' = ' + (a % b) + ', and the cast makes the last division real: ' + coutD(a / b) + '.');
  } },
  { t: 'c1', make: function (R) {
    var A = R.i(2, 9), B = R.i(1, 9), C = R.i(2, 5), dec = R.chance(0.4);
    var src, i, j, k, why;
    if (!dec) { src = 'int i = ' + A + ';\nint j = i++ + ' + B + ';\nint k = ++i * ' + C + ';\ncout << i << " " << j << " " << k;'; j = A + B; k = (A + 2) * C; i = A + 2; why = 'j uses the old i: ' + A + ' + ' + B + ' = ' + j + ', then i becomes ' + (A + 1) + '. ++i makes i ' + (A + 2) + ' first, so k = ' + (A + 2) + ' · ' + C + ' = ' + k + '.'; }
    else { src = 'int i = ' + A + ';\nint j = i-- - ' + B + ';\nint k = --i * ' + C + ';\ncout << i << " " << j << " " << k;'; j = A - B; k = (A - 2) * C; i = A - 2; why = 'j uses the old i: ' + A + ' − ' + B + ' = ' + j + ', then i becomes ' + (A - 1) + '. --i makes i ' + (A - 2) + ' first, so k = ' + (A - 2) + ' · ' + C + ' = ' + k + '.'; }
    return txt(nid('inc'), 'c1', P121 + code(src), i + ' ' + j + ' ' + k, 'Post-increment uses the old value; pre-increment changes first.', why);
  } },
  { t: 'c1', make: function (R) {
    var A = R.i(3, 20), B = R.i(1, 9), C = R.i(2, 4), D = R.i(2, 5), E = R.i(4, 9);
    var t1 = A + B, t2 = t1 * C, t3 = t2 - Math.trunc(t2 / D), t4 = t3 % E;
    return txt(nid('cmp'), 'c1', P121 + code('int total = ' + A + ';\ntotal += ' + B + ';\ntotal *= ' + C + ';\ntotal -= total / ' + D + ';\ntotal %= ' + E + ';\ncout << total;'), String(t4),
      'Track total line by line. total / ' + D + ' is integer division.', A + ' + ' + B + ' = ' + t1 + '. × ' + C + ' = ' + t2 + '. ' + t2 + ' / ' + D + ' = ' + Math.trunc(t2 / D) + ', so total = ' + t3 + '. ' + t3 + ' % ' + E + ' = ' + t4 + '.');
  } },
  { t: 'c1', make: function (R) {
    var v = R.i(3, 19) + R.p([0.25, 0.5, 0.75, 0.9, 0.1]), x = Math.trunc(v), d = R.i(2, 4), y = Math.trunc(x / d);
    return txt(nid('cast'), 'c1', P121 + code('int x = ' + v + ';\ndouble y = x / ' + d + ';\ncout << x << " " << y << " " << x / ' + d + '.0;'), x + ' ' + y + ' ' + coutD(x / d),
      'Storing a double in an int truncates. x / ' + d + ' is int / int.', 'x stores ' + x + '. x / ' + d + ' is integer division, ' + y + ', and the double y holds ' + y + '. x / ' + d + '.0 is real division: ' + coutD(x / d) + '.');
  } },
  { t: 'c1', make: function (R) {
    var w = R.p(WORDS), k = R.i(1, w.length - 2);
    return txt(nid('str'), 'c1', P121 + code('string w = "' + w + '";\ncout << w.length() << w[0] << w[' + k + '] << w[w.length() - 1];'), w.length + w[0] + w[k] + w[w.length - 1],
      'Indexes start at 0.', 'length() is ' + w.length + '. w[0] = ' + w[0] + ', w[' + k + '] = ' + w[k] + ', and the last character w[' + (w.length - 1) + '] = ' + w[w.length - 1] + '.');
  } },
  { t: 'c2', make: function (R) {
    var S = R.i(30, 100), T1 = R.p([80, 85, 90]), T2 = R.p([50, 60, 65]), bug = R.chance(0.4);
    var hi = bug ? T2 : T1, lo = bug ? T1 : T2, out = S >= hi ? (bug ? 'pass' : 'honours') : S >= lo ? (bug ? 'honours' : 'pass') : 'fail';
    var src = 'int score = ' + S + ';\nif (score >= ' + hi + ')\n    cout << "' + (bug ? 'pass' : 'honours') + '";\nelse if (score >= ' + lo + ')\n    cout << "' + (bug ? 'honours' : 'pass') + '";\nelse\n    cout << "fail";\nif (score % 2 == 0)\n    cout << " even";';
    out += S % 2 === 0 ? ' even' : '';
    return txt(nid('ifc'), 'c2', P121 + code(src), out, 'Only the first true branch of an else-if chain runs.',
      'score = ' + S + '. ' + (S >= hi ? S + ' >= ' + hi + ' is true, so the first branch runs.' : S >= lo ? S + ' >= ' + hi + ' is false but ' + S + ' >= ' + lo + ' is true.' : 'Both tests fail, so the else runs.') + (bug ? ' The thresholds are checked in the wrong order here, which is why a high score never reaches "honours".' : '') + ' The last if is separate: ' + S + ' % 2 = ' + (S % 2) + '.');
  } },
  { t: 'c2', make: function (R) {
    var a = R.i(1, 9), b = R.i(1, 9), c = R.i(1, 9), v = R.i(0, 2), expr, r;
    if (v === 0) { expr = '(a > b) || (b < c) && !(a == c)'; r = (a > b) || ((b < c) && !(a === c)); }
    else if (v === 1) { expr = '!(a > b && c > b) || a == c'; r = !(a > b && c > b) || a === c; }
    else { expr = '(a + b > c) && !(b >= c || a < 2)'; r = (a + b > c) && !(b >= c || a < 2); }
    return txt(nid('bool'), 'c2', P121 + code('int a = ' + a + ', b = ' + b + ', c = ' + c + ';\nbool r = ' + expr + ';\ncout << r;'), r ? '1' : '0',
      '&& binds tighter than ||. A bool prints as 1 or 0.', 'With a = ' + a + ', b = ' + b + ', c = ' + c + ' the expression is ' + (r ? 'true' : 'false') + ', so cout prints ' + (r ? 1 : 0) + '.');
  } },
  { t: 'c2', make: function (R) {
    var k0 = R.i(1, 6), T = R.i(0, 6), U = R.i(0, 6), V = R.i(0, 6), W = R.i(0, 6), k = k0, t, u;
    t = k > T ? (++k > U) : false;
    u = k > V ? true : (++k > W);
    return txt(nid('sc'), 'c2', P121 + code('int k = ' + k0 + ';\nbool t = (k > ' + T + ') && (++k > ' + U + ');\nbool u = (k > ' + V + ') || (++k > ' + W + ');\ncout << k << t << u;'), k + '' + (t ? 1 : 0) + (u ? 1 : 0),
      '&& skips its right side when the left is false; || skips it when the left is true.', 'After the first line k = ' + (k0 + (k0 > T ? 1 : 0)) + ' and t = ' + (t ? 1 : 0) + '. After the second, k = ' + k + ' and u = ' + (u ? 1 : 0) + '.');
  } },
  { t: 'c2', make: function (R) {
    var A = R.i(1, 9), Y = R.i(5, 15), B = R.chance(0.45) ? 0 : R.i(1, 6), Z = R.i(1, 4);
    var y = B !== 0 ? Z : Y;
    return txt(nid('asg'), 'c2', P121 + code('int a = ' + A + ', y = ' + Y + ';\nif (a = ' + B + ')\n    y = ' + Z + ';\ncout << a << " " << y;'), B + ' ' + y,
      'a = ' + B + ' assigns. The condition is the assigned value.', 'a becomes ' + B + '. ' + (B ? 'A nonzero value is true, so y = ' + Z + '.' : '0 is false, so y stays ' + Y + '.'));
  } },
  { t: 'c2', make: function (R) {
    var x = R.i(1, 30), P = R.i(5, 20), Q = P + R.i(1, 10);
    var out = (x > P ? (x > Q ? 'A' : 'B') : '') + 'C';
    return txt(nid('dang'), 'c2', P121 + code('int x = ' + x + ';\nif (x > ' + P + ')\n    if (x > ' + Q + ')\n        cout << "A";\n    else\n        cout << "B";\ncout << "C";'), out,
      'The else belongs to the nearest if.', 'The else pairs with if (x > ' + Q + '). ' + (x > P ? 'x > ' + P + ' is true, then ' + (x > Q ? 'x > ' + Q + ' is true: A.' : 'x > ' + Q + ' is false: B.') : 'x > ' + P + ' is false, so the inner if/else is skipped.') + ' C always prints.');
  } },
  { t: 'c3', make: function (R) {
    var A = R.i(0, 5), B = A + R.i(6, 16), C = R.i(2, 4), mode = R.i(0, 2), s = 0, ks = [];
    for (var k = A; k <= B; k += C) { ks.push(k); s += mode === 0 ? k : mode === 1 ? k * k : k % 3; }
    var body = mode === 0 ? 's += k;' : mode === 1 ? 's += k * k;' : 's += k % 3;';
    return txt(nid('fsum'), 'c3', P121 + code('int s = 0;\nfor (int k = ' + A + '; k <= ' + B + '; k += ' + C + ')\n    ' + body + '\ncout << s;'), String(s),
      'List the values k takes before it passes ' + B + '.', 'k = ' + ks.join(', ') + '. ' + (mode === 0 ? 'Their sum' : mode === 1 ? 'The sum of their squares' : 'The sum of k % 3') + ' is ' + s + '.');
  } },
  { t: 'c3', make: function (R) {
    var v = R.i(0, 1), A, B, C, n = 0, src, i;
    if (v === 0) { A = R.i(8, 30); B = R.i(2, 5); for (i = A; i > 0; i -= B) n++; src = 'for (int i = ' + A + '; i > 0; i -= ' + B + ')'; }
    else { A = R.i(0, 4); B = A + R.i(5, 20); C = R.i(2, 4); for (i = A; i < B; i += C) n++; src = 'for (int i = ' + A + '; i < ' + B + '; i += ' + C + ')'; }
    return num(nid('fcnt'), 'c3', 'How many times does ' + icode(src) + ' run its body?', String(n), 'Write out each value of i that passes the test.',
      'The loop body runs ' + n + ' times. Writing out the values of i and stopping at the first one that fails the test is the safest way to count.');
  } },
  { t: 'c3', make: function (R) {
    var A = R.i(1, 5), M = R.i(2, 4), L = R.i(20, 200), x = A, seq = [A];
    while (x < L) { x *= M; seq.push(x); }
    return txt(nid('wmul'), 'c3', P121 + code('int x = ' + A + ';\nwhile (x < ' + L + ')\n    x *= ' + M + ';\ncout << x;'), String(x), 'Keep multiplying until the test fails.', 'x goes ' + seq.join(', ') + '. At ' + x + ' the test x < ' + L + ' fails, so ' + x + ' prints.');
  } },
  { t: 'c3', make: function (R) {
    var N = R.i(3, 7), v = R.i(0, 1), cnt = v === 0 ? N * (N + 1) / 2 : N * (N - 1) / 2;
    var src = 'int count = 0;\nfor (int a = 1; a <= ' + N + '; a++)\n    for (int b = ' + (v === 0 ? 'a; b <= ' + N : '1; b < a') + '; b++)\n        count++;\ncout << count;';
    return txt(nid('nest'), 'c3', P121 + code(src), String(cnt), 'Count the inner passes for each value of a.', v === 0 ? 'For a = 1 the inner loop runs ' + N + ' times, then ' + (N - 1) + ', and so on down to 1. Total ' + cnt + '.' : 'For a = 1 the inner loop runs 0 times, then 1, 2, … up to ' + (N - 1) + '. Total ' + cnt + '.');
  } },
  { t: 'c3', make: function (R) {
    var n0 = R.i(10, 30), D = R.i(3, 7), T = R.i(1, 9), n = n0, out = [];
    do { out.push(n); n -= D; } while (n > T);
    out.push(n);
    return txt(nid('dow'), 'c3', P121 + code('int n = ' + n0 + ';\ndo\n{\n    cout << n << " ";\n    n -= ' + D + ';\n} while (n > ' + T + ');\ncout << n;'), out.join(' '),
      'A do-while checks after the body.', 'The body prints ' + out.slice(0, -1).join(', ') + '. When n = ' + n + ' the test n > ' + T + ' fails, and the last cout prints ' + n + '.');
  } },
  { t: 'c3', make: function (R) {
    var n0 = R.i(3, 20), n = n0, steps = 0;
    while (n !== 1) { n = n % 2 === 0 ? n / 2 : 3 * n + 1; steps++; }
    return txt(nid('coll'), 'c3', P121 + code('int n = ' + n0 + ', steps = 0;\nwhile (n != 1)\n{\n    if (n % 2 == 0)\n        n /= 2;\n    else\n        n = 3 * n + 1;\n    steps++;\n}\ncout << steps;'), String(steps),
      'Trace n until it reaches 1, counting passes.', 'Starting from ' + n0 + ' it takes ' + steps + ' passes to reach 1.');
  } },
  { t: 'c4', make: function (R) {
    var X = R.i(1, 5), Y = R.i(2, 4), P = R.i(1, 9), Q = R.i(1, 9), x = P + X, y = Q + X;
    var src = 'void upd(int &a, int b)\n{\n    a = a + ' + X + ';\n    b = b * ' + Y + ';\n}\nint main()\n{\n    int x = ' + P + ', y = ' + Q + ';\n    upd(x, y);\n    upd(y, x);\n    cout << x << " " << y;\n    return 0;\n}';
    return txt(nid('ref'), 'c4', 'Assume the usual includes. Type the exact output.' + code(src), x + ' ' + y, 'Only the first parameter is a reference.',
      'upd(x, y) adds ' + X + ' to x, giving ' + x + ', and only changes a copy of y. upd(y, x) adds ' + X + ' to y, giving ' + y + ', and only changes a copy of x.');
  } },
  { t: 'c4', make: function (R) {
    var X = R.i(1, 4), Y = R.i(1, 3), Z = R.i(2, 3), P = R.i(3, 9), Q = R.i(0, 5);
    var x = P, r1 = (Q + X) * Z; x -= Y; var r2 = (r1 + X) * Z; x -= Y; var w = r2 + Q;
    var src = 'int f(int a, int &b)\n{\n    a += ' + X + ';\n    b -= ' + Y + ';\n    return a * ' + Z + ';\n}\nint main()\n{\n    int w = 0, x = ' + P + ', y = ' + Q + ';\n    w = f(f(y, x), x) + y;\n    cout << w << " and " << x << " and " << y << endl;\n    return 0;\n}';
    return txt(nid('nf'), 'c4', 'Assume the usual includes. Type the exact output.' + code(src), w + ' and ' + x + ' and ' + Q,
      'The inner call runs first; only b is a reference.', 'Inner: a = ' + Q + ' + ' + X + ', x becomes ' + (P - Y) + ', returns ' + r1 + '. Outer: a = ' + r1 + ' + ' + X + ', x becomes ' + x + ', returns ' + r2 + '. w = ' + r2 + ' + ' + Q + ' = ' + w + '. y was only copied.');
  } },
  { t: 'c4', make: function (R) {
    var M = R.i(2, 3), A = R.i(-2, 3), V = R.i(0, 3), K = R.i(2, 4), v = V, tr = [];
    for (var i = 0; i < K; i++) { v = v * M + A - i; tr.push(v); }
    var src = 'int g(int n)\n{\n    return n * ' + M + (A < 0 ? ' - ' + (-A) : ' + ' + A) + ';\n}\nint main()\n{\n    int v = ' + V + ';\n    for (int i = 0; i < ' + K + '; i++)\n        v = g(v) - i;\n    cout << v;\n    return 0;\n}';
    return txt(nid('gl'), 'c4', 'Assume the usual includes. Type the exact output.' + code(src), String(v), 'Update v once per pass.', 'v after each pass: ' + tr.join(', ') + '.');
  } },
  { t: 'c4', make: function (R) {
    var a = R.i(1, 9), b = R.i(1, 9), c = R.i(1, 9), s = [a, b, c];
    function ord(i, j) { if (s[i] > s[j]) { var t = s[i]; s[i] = s[j]; s[j] = t; } }
    ord(0, 1); ord(1, 2); ord(0, 1);
    var src = 'void order(int &lo, int &hi)\n{\n    if (lo > hi)\n    {\n        int t = lo;\n        lo = hi;\n        hi = t;\n    }\n}\nint main()\n{\n    int a = ' + a + ', b = ' + b + ', c = ' + c + ';\n    order(a, b);\n    order(b, c);\n    order(a, b);\n    cout << a << " " << b << " " << c;\n    return 0;\n}';
    return txt(nid('ord'), 'c4', 'Assume the usual includes. Type the exact output.' + code(src), s.join(' '), 'Track a, b, c after each call.', 'The three calls are one pass of a sort, leaving ' + s.join(', ') + '.');
  } },
  { t: 'c5', make: function (R) {
    var mmPer = R.p([200, 250, 160, 220]), d = R.p([0.5, 0.8, 1, 1.2, 1.5, 2, 2.5]), deg = d * 1000 / mmPer * 360;
    return num(nid('vdeg'), 'c5', 'With these tires, 1 wheel turn moves the robot ' + mmPer + ' mm. How many degrees must the drive motors turn to move ' + d + ' m?', String(Math.round(deg)),
      'Convert m to mm, then to turns, then to degrees.', d + ' m = ' + d * 1000 + ' mm = ' + (d * 1000 / mmPer) + ' turns. × 360 = ' + Math.round(deg) + '°.', null, null, { tol: 0.003 });
  } },
  { t: 'c5', make: function (R) {
    var f = R.p([0.1, 0.25, 0.05, 0.2]), every = R.p([10, 15, 20, 30]), hrs = R.p([2, 3, 4, 6]), steps = hrs * 60 / every, tot = f * 360 * steps;
    return num(nid('vplat'), 'c5', 'A platform motor turns the plant ' + f + ' turns every ' + every + ' minutes. In degrees, how far has it turned after ' + hrs + ' hours?', String(Math.round(tot)),
      'Degrees per step, times the number of steps.', f + ' turns = ' + (f * 360) + '° per step. ' + hrs + ' h has ' + steps + ' steps of ' + every + ' min. ' + (f * 360) + ' × ' + steps + ' = ' + Math.round(tot) + '°.', null, null, { tol: 0.002 });
  } },
  { t: 'c5', make: function (R) {
    var T = R.p([20, 30, 45]), cond = R.p([['Optical3.color() == green', 'green is detected'], ['Bumper8.pressing()', 'the bumper is pressed'], ['Distance7.objectDistance(mm) < 300', 'something is closer than 300 mm']]);
    var neg = cond[0].indexOf('==') > 0 ? cond[0].replace('==', '!=') : cond[0].indexOf('<') > 0 ? cond[0].replace('<', '>=') : '!' + cond[0];
    var right = K_('while (Brain.Timer.time(seconds) < ' + T + ' * 60 && ' + neg + ')');
    return gmc(R, nid('vdm'), 'c5', 'The robot should keep working until ' + T + ' minutes have passed OR ' + cond[1] + '. Which loop header is correct?', right,
      [K_('while (Brain.Timer.time(seconds) < ' + T + ' * 60 || ' + neg + ')'), K_('while (Brain.Timer.time(seconds) >= ' + T + ' * 60 && ' + cond[0] + ')'), K_('while (Brain.Timer.time(seconds) < ' + T + ' && ' + neg + ')'), K_('if (Brain.Timer.time(seconds) < ' + T + ' * 60 && ' + neg + ')')],
      'Stop when (time up) OR (sensor event). Keep going while NOT that: by De Morgan, (time not up) AND (no sensor event). The timer counts seconds, so ' + T + ' minutes is ' + T + ' * 60.');
  } }
];
function K_(s) { return icode(s); }

/* ==================== CHE 102 ==================== */
var COMP = [['water', 'H2O'], ['carbon dioxide', 'CO2'], ['methane', 'CH4'], ['ethane', 'C2H6'], ['propane', 'C3H8'], ['butane', 'C4H10'], ['glucose', 'C6H12O6'], ['ammonia', 'NH3'], ['sulfuric acid', 'H2SO4'], ['sodium chloride', 'NaCl'], ['calcium carbonate', 'CaCO3'], ['ethanol', 'C2H5OH'], ['sulfur dioxide', 'SO2'], ['calcium chloride', 'CaCl2'], ['potassium chlorate', 'KClO3'], ['aluminum oxide', 'Al2O3'], ['iron(III) oxide', 'Fe2O3'], ['sodium hydroxide', 'NaOH'], ['magnesium hydroxide', 'Mg(OH)2'], ['ammonium nitrate', 'NH4NO3']];
var GASES = [['N₂', 'N2'], ['O₂', 'O2'], ['CO₂', 'CO2'], ['CH₄', 'CH4'], ['He', 'He'], ['Ar', 'Ar'], ['Ne', 'Ne'], ['NH₃', 'NH3'], ['SO₂', 'SO2'], ['C₃H₈', 'C3H8']];
var RXN = [
  { r: [[2, 'H2'], [1, 'O2']], p: [[2, 'H2O']], w: 0 },
  { r: [[1, 'N2'], [3, 'H2']], p: [[2, 'NH3']], w: 0 },
  { r: [[1, 'CaCO3'], [2, 'HCl']], p: [[1, 'CaCl2'], [1, 'CO2'], [1, 'H2O']], w: 1 },
  { r: [[4, 'Al'], [3, 'O2']], p: [[2, 'Al2O3']], w: 0 },
  { r: [[1, 'Fe2O3'], [3, 'CO']], p: [[2, 'Fe'], [3, 'CO2']], w: 0 },
  { r: [[2, 'Na'], [1, 'Cl2']], p: [[2, 'NaCl']], w: 0 },
  { r: [[1, 'C3H8'], [5, 'O2']], p: [[3, 'CO2'], [4, 'H2O']], w: 0 },
  { r: [[2, 'SO2'], [1, 'O2']], p: [[2, 'SO3']], w: 0 },
  { r: [[1, 'Mg'], [2, 'HCl']], p: [[1, 'MgCl2'], [1, 'H2']], w: 1 },
  { r: [[1, 'CH4'], [2, 'O2']], p: [[1, 'CO2'], [2, 'H2O']], w: 0 },
  { r: [[1, 'C7H6O3'], [1, 'C4H6O3']], p: [[1, 'C9H8O4'], [1, 'C2H4O2']], w: 0 }
];
function m3(R, lo, hi) { var v; for (var k = 0; k < 20; k++) { v = Number(sig(lo + R.u() * (hi - lo), 3)); if (sigCount(String(v)) === 3) return v; } return v; }
/* Units 3 to 5 generator data */
function sci(v, n) { var s = sig(v, n), m = /^(-?[\d.]+)E(-?\d+)$/.exec(s); return m ? minus(m[1]) + ' × 10<sup>' + minus(m[2]) + '</sup>' : minus(s); }
var RRX = [
  { eq: '2 N₂O₅(g) → 4 NO₂(g) + O₂(g)', s: [['N₂O₅', -2], ['NO₂', 4], ['O₂', 1]] },
  { eq: '4 NH₃(g) + 5 O₂(g) → 4 NO(g) + 6 H₂O(g)', s: [['NH₃', -4], ['O₂', -5], ['NO', 4], ['H₂O', 6]] },
  { eq: '2 NO(g) + O₂(g) → 2 NO₂(g)', s: [['NO', -2], ['O₂', -1], ['NO₂', 2]] },
  { eq: 'N₂(g) + 3 H₂(g) → 2 NH₃(g)', s: [['N₂', -1], ['H₂', -3], ['NH₃', 2]] },
  { eq: '2 HI(g) → H₂(g) + I₂(g)', s: [['HI', -2], ['H₂', 1], ['I₂', 1]] },
  { eq: 'C₃H₈(g) + 5 O₂(g) → 3 CO₂(g) + 4 H₂O(g)', s: [['C₃H₈', -1], ['O₂', -5], ['CO₂', 3], ['H₂O', 4]] },
  { eq: '3 A + B → 2 C', s: [['A', -3], ['B', -1], ['C', 2]] },
  { eq: '2 NOCl(g) → 2 NO(g) + Cl₂(g)', s: [['NOCl', -2], ['NO', 2], ['Cl₂', 1]] }
];
/* name, normal boiling point (°C), ΔHvap (kJ/mol) */
var LIQ = [['water', 100.0, 40.7], ['ethanol', 78.4, 38.6], ['benzene', 80.1, 30.8], ['acetone', 56.1, 29.1], ['methanol', 64.7, 35.2], ['diethyl ether', 34.6, 26.5], ['hexane', 68.7, 28.9], ['toluene', 110.6, 33.2]];
/* water vapour pressure, °C and mmHg */
var WVP = [[20, 17.54], [25, 23.76], [30, 31.82], [35, 42.18]];
/* ideal pairs at 25 °C: more volatile first, vapour pressures in mmHg */
var RAO = [['benzene', '95.1', 'toluene', '28.4'], ['hexane', '151', 'heptane', '45.7'], ['pentane', '512', 'hexane', '151'], ['methanol', '127', 'ethanol', '59.0'], ['acetone', '230.', 'ethanol', '59.0']];
/* Henry's constants in water at 20 °C (atm), molar mass */
var HEN = [['O₂', 4.01e4, 32.00], ['N₂', 8.04e4, 28.01], ['CH₄', 3.76e4, 16.04], ['CO', 5.36e4, 28.01], ['CO₂', 1.42e3, 44.01]];
var SOLU = [['glucose', 'C6H12O6', 1], ['sucrose', 'C12H22O11', 1], ['urea', 'CH4N2O', 1], ['ethylene glycol', 'C2H6O2', 1], ['sodium chloride', 'NaCl', 2], ['potassium chloride', 'KCl', 2], ['calcium chloride', 'CaCl2', 3], ['magnesium chloride', 'MgCl2', 3], ['sodium sulfate', 'Na2SO4', 3]];
var KRX = [['N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g)', -2], ['N₂O₄(g) ⇌ 2 NO₂(g)', 1], ['2 SO₂(g) + O₂(g) ⇌ 2 SO₃(g)', -1], ['PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)', 1], ['CO(g) + 2 H₂(g) ⇌ CH₃OH(g)', -2],
  ['CaCO₃(s) ⇌ CaO(s) + CO₂(g)', 1, 'the solids do not count'], ['C(s) + CO₂(g) ⇌ 2 CO(g)', 1, 'C(s) does not count'], ['2 NOCl(g) ⇌ 2 NO(g) + Cl₂(g)', 1], ['H₂(g) + I₂(g) ⇌ 2 HI(g)', 0]];
var KCOMB = [
  { f: '2 SO₂(g) + O₂(g) ⇌ 2 SO₃(g)', rev: '2 SO₃(g) ⇌ 2 SO₂(g) + O₂(g)', half: 'SO₂(g) + ½ O₂(g) ⇌ SO₃(g)', halfrev: 'SO₃(g) ⇌ SO₂(g) + ½ O₂(g)', dbl: '4 SO₂(g) + 2 O₂(g) ⇌ 4 SO₃(g)', dblrev: '4 SO₃(g) ⇌ 4 SO₂(g) + 2 O₂(g)' },
  { f: 'N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g)', rev: '2 NH₃(g) ⇌ N₂(g) + 3 H₂(g)', half: '½ N₂(g) + 3/2 H₂(g) ⇌ NH₃(g)', halfrev: 'NH₃(g) ⇌ ½ N₂(g) + 3/2 H₂(g)', dbl: '2 N₂(g) + 6 H₂(g) ⇌ 4 NH₃(g)', dblrev: '4 NH₃(g) ⇌ 2 N₂(g) + 6 H₂(g)' },
  { f: 'H₂(g) + I₂(g) ⇌ 2 HI(g)', rev: '2 HI(g) ⇌ H₂(g) + I₂(g)', half: '½ H₂(g) + ½ I₂(g) ⇌ HI(g)', halfrev: 'HI(g) ⇌ ½ H₂(g) + ½ I₂(g)', dbl: '2 H₂(g) + 2 I₂(g) ⇌ 4 HI(g)', dblrev: '4 HI(g) ⇌ 2 H₂(g) + 2 I₂(g)' },
  { f: 'N₂O₄(g) ⇌ 2 NO₂(g)', rev: '2 NO₂(g) ⇌ N₂O₄(g)', half: '½ N₂O₄(g) ⇌ NO₂(g)', halfrev: 'NO₂(g) ⇌ ½ N₂O₄(g)', dbl: '2 N₂O₄(g) ⇌ 4 NO₂(g)', dblrev: '4 NO₂(g) ⇌ 2 N₂O₄(g)' }
];
var QRX = [
  { eq: 'N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g)', r: [['N₂', 1], ['H₂', 3]], p: [['NH₃', 2]] },
  { eq: '2 SO₂(g) + O₂(g) ⇌ 2 SO₃(g)', r: [['SO₂', 2], ['O₂', 1]], p: [['SO₃', 2]] },
  { eq: 'PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)', r: [['PCl₅', 1]], p: [['PCl₃', 1], ['Cl₂', 1]] },
  { eq: 'H₂(g) + I₂(g) ⇌ 2 HI(g)', r: [['H₂', 1], ['I₂', 1]], p: [['HI', 2]] },
  { eq: '2 NO(g) + O₂(g) ⇌ 2 NO₂(g)', r: [['NO', 2], ['O₂', 1]], p: [['NO₂', 2]] },
  { eq: 'CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g)', r: [['CO', 1], ['H₂O', 1]], p: [['CO₂', 1], ['H₂', 1]] }
];
/* Le Chatelier: sign of ΔH, gas moles left and right, reacting gases, product gases (asked about the first), solid */
var LCR = [
  { eq: 'N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g)', dH: -1, gr: 4, gp: 2, rg: ['N₂', 'H₂'], pg: ['NH₃'] },
  { eq: 'N₂O₄(g) ⇌ 2 NO₂(g)', dH: 1, gr: 1, gp: 2, rg: ['N₂O₄'], pg: ['NO₂'] },
  { eq: '2 SO₂(g) + O₂(g) ⇌ 2 SO₃(g)', dH: -1, gr: 3, gp: 2, rg: ['SO₂', 'O₂'], pg: ['SO₃'] },
  { eq: 'CH₄(g) + H₂O(g) ⇌ CO(g) + 3 H₂(g)', dH: 1, gr: 2, gp: 4, rg: ['CH₄', 'H₂O'], pg: ['H₂', 'CO'] },
  { eq: 'C(s) + H₂O(g) ⇌ CO(g) + H₂(g)', dH: 1, gr: 1, gp: 2, rg: ['H₂O'], pg: ['CO', 'H₂'], solid: 'solid carbon' },
  { eq: '2 C(s) + O₂(g) ⇌ 2 CO(g)', dH: -1, gr: 1, gp: 2, rg: ['O₂'], pg: ['CO'], solid: 'solid carbon' },
  { eq: 'H₂(g) + I₂(g) ⇌ 2 HI(g)', dH: -1, gr: 2, gp: 2, rg: ['H₂', 'I₂'], pg: ['HI'] },
  { eq: 'PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)', dH: 1, gr: 1, gp: 2, rg: ['PCl₅'], pg: ['Cl₂', 'PCl₃'] },
  { eq: 'CaCO₃(s) ⇌ CaO(s) + CO₂(g)', dH: 1, gr: 0, gp: 1, rg: [], pg: ['CO₂'], solid: 'CaCO₃(s)' },
  { eq: '2 NO(g) + O₂(g) ⇌ 2 NO₂(g)', dH: -1, gr: 3, gp: 2, rg: ['NO', 'O₂'], pg: ['NO₂'] }
];
/* Unit 6: Table 6.1 reduction potentials (V). name, half-cell, E° */
var EHALF = [['gold', 'Au³⁺|Au', 1.520], ['silver', 'Ag⁺|Ag', 0.800], ['copper', 'Cu²⁺|Cu', 0.340], ['lead', 'Pb²⁺|Pb', -0.125], ['tin', 'Sn²⁺|Sn', -0.137],
  ['nickel', 'Ni²⁺|Ni', -0.250], ['cobalt', 'Co²⁺|Co', -0.277], ['iron', 'Fe²⁺|Fe', -0.440], ['zinc', 'Zn²⁺|Zn', -0.763], ['aluminum', 'Al³⁺|Al', -1.676], ['magnesium', 'Mg²⁺|Mg', -2.370]];
/* metals that reduce Cu2+: symbol, ion, E°, charge */
var EMET = [['Zn', 'Zn²⁺', -0.763, 2], ['Fe', 'Fe²⁺', -0.440, 2], ['Ni', 'Ni²⁺', -0.250, 2], ['Pb', 'Pb²⁺', -0.125, 2], ['Sn', 'Sn²⁺', -0.137, 2], ['Mg', 'Mg²⁺', -2.370, 2], ['Co', 'Co²⁺', -0.277, 2], ['Al', 'Al³⁺', -1.676, 3]];
/* electroplating: metal, solution, electrons per ion, molar mass */
var EPLATE = [['Cu', 'CuSO₄', 2, 63.55], ['Ag', 'AgNO₃', 1, 107.87], ['Ni', 'NiSO₄', 2, 58.69], ['Zn', 'ZnSO₄', 2, 65.39], ['Au', 'AuCl₃', 3, 196.97], ['Sn', 'SnCl₂', 2, 118.71], ['Cr', 'CrCl₃', 3, 52.00]];
course('che102').gens = [
  { t: 'h1', make: function (R) {
    var c = R.p(COMP), m = m3(R, 1.5, 95), M = molar(c[1]), N = m / M * 6.02214e23;
    return num(nid('mol'), 'h1', 'How many formula units (or molecules) are in ' + m + ' g of ' + c[0] + ' (' + chemF(c[1]) + ')? Give 3 significant figures, like 1.23E23.', sig(N, 3),
      'Grams → moles with the molar mass, then × Avogadro\'s number.', 'M(' + chemF(c[1]) + ') = ' + M.toFixed(2) + ' g/mol. ' + m + ' / ' + M.toFixed(2) + ' = ' + sig(m / M, 4) + ' mol. × 6.02214 × 10²³ = ' + sig(N, 3) + '.', null, null, { sf: 3 });
  } },
  { t: 'h1', make: function (R) {
    var c = R.p(COMP), n = m3(R, 0.1, 5), atoms = 0;
    c[1].replace(/\(([^)]+)\)(\d+)|([A-Z][a-z]?)(\d*)/g, function (mm, grp, k, el, cnt) {
      if (grp) { var s = 0; grp.replace(/([A-Z][a-z]?)(\d*)/g, function (q, e2, c2) { s += c2 ? +c2 : 1; }); atoms += s * +k; } else atoms += cnt ? +cnt : 1; return '';
    });
    var N = n * atoms * 6.02214e23;
    return num(nid('atm'), 'h1', 'How many atoms in total are in ' + n + ' mol of ' + chemF(c[1]) + '? Give 3 significant figures.', sig(N, 3),
      'Count the atoms in one formula unit first.', 'One ' + chemF(c[1]) + ' has ' + atoms + ' atoms. ' + n + ' × ' + atoms + ' × 6.02214 × 10²³ = ' + sig(N, 3) + '.', null, null, { sf: 3 });
  } },
  { t: 'h1', make: function (R) {
    var el = R.p([['Cl', 34.969, 36.966, 35.4527, 35, 37], ['Cu', 62.930, 64.928, 63.546, 63, 65], ['B', 10.013, 11.009, 10.811, 10, 11], ['Ga', 68.926, 70.925, 69.723, 69, 71]]);
    var f = (el[2] - el[3]) / (el[2] - el[1]) * 100;
    return num(nid('iso'), 'h1', el[0] + ' has two isotopes, <sup>' + el[4] + '</sup>' + el[0] + ' (' + el[1] + ' u) and <sup>' + el[5] + '</sup>' + el[0] + ' (' + el[2] + ' u). Its average atomic mass is ' + el[3] + ' u. What percentage of atoms are <sup>' + el[4] + '</sup>' + el[0] + '? Give 3 significant figures.', sig(f, 3),
      'Let x be the fraction of the lighter isotope: x·m₁ + (1 − x)·m₂ = average.', 'x = (' + el[2] + ' − ' + el[3] + ') / (' + el[2] + ' − ' + el[1] + ') = ' + sig(f / 100, 4) + ', so ' + sig(f, 3) + '%.', null, null, { sf: 3, unit: '%' });
  } },
  { t: 'h2', make: function (R) {
    var lo = R.i(-10, 20), dT = R.i(5, 25), v = R.i(0, 1);
    if (v === 0) return gmc(R, nid('dt'), 'h2', 'The temperature rises from ' + minus(lo) + ' °C to ' + minus(lo + dT) + ' °C. What is the change in °F?', sig(1.8 * dT, 3) + ' °F',
      [sig(1.8 * dT + 32, 3) + ' °F', sig(dT / 1.8, 3) + ' °F', dT + ' °F', sig((dT - 32) / 1.8, 3) + ' °F'], 'A change uses only the factor 1.8: ' + dT + ' × 1.8 = ' + sig(1.8 * dT, 3) + ' °F. The +32 offset cancels in a difference.', { k: 'c' });
    var F = R.i(-20, 110), K = (F - 32) / 1.8 + 273.15;
    return num(nid('fk'), 'h2', 'Convert ' + minus(F) + ' °F to kelvin. Give 4 significant figures.', sig(K, 4), 'T(°C) = (T(°F) − 32)/1.8, then add 273.15.', '(' + F + ' − 32)/1.8 = ' + sig((F - 32) / 1.8, 4) + ' °C, + 273.15 = ' + sig(K, 4) + ' K.', null, null, { sf: 4, unit: 'K' });
  } },
  { t: 'h2', make: function (R) {
    var c = R.p([['atm', 'psi', 14.6959], ['lbf', 'N', 1 / 0.224809], ['g/cm³', 'lbm/ft³', 62.4280], ['m', 'ft', 3.28084], ['kg', 'lbm', 2.20462], ['atm', 'mmHg', 760], ['J', 'cal', 0.239006], ['m/s', 'km/h', 3.6], ['L', 'gal (US)', 0.264172], ['bar', 'atm', 1 / 1.01325]]);
    var x = m3(R, 0.5, 90), y = x * c[2];
    return num(nid('unit'), 'h2', 'Convert ' + x + ' ' + c[0] + ' to ' + c[1] + '. Give 3 significant figures.', sig(y, 3), 'Use the conversion factor from the data sheet.',
      '1 ' + c[0] + ' = ' + sig(c[2], 6) + ' ' + c[1] + '. ' + x + ' × ' + sig(c[2], 6) + ' = ' + sig(y, 3) + ' ' + c[1] + '.', null, null, { sf: 3, unit: c[1] });
  } },
  { t: 'h3', make: function (R) {
    var rx = R.p(RXN), ri = R.i(0, rx.r.length - 1), pi = rx.w, A = rx.r[ri], P = rx.p[pi], m = m3(R, 2, 120);
    var mp = m / molar(A[1]) * P[0] / A[0] * molar(P[1]);
    return num(nid('st'), 'h3', 'For ' + eqHTML(rx) + ', what mass of ' + chemF(P[1]) + ' forms from ' + m + ' g of ' + chemF(A[1]) + ' with the other reactant in excess? Give 3 significant figures.', sig(mp, 3),
      'Grams → moles → mole ratio → grams.', m + ' g ÷ ' + molar(A[1]).toFixed(2) + ' = ' + sig(m / molar(A[1]), 4) + ' mol ' + chemF(A[1]) + '. × ' + P[0] + '/' + A[0] + ' = ' + sig(m / molar(A[1]) * P[0] / A[0], 4) + ' mol ' + chemF(P[1]) + '. × ' + molar(P[1]).toFixed(2) + ' = ' + sig(mp, 3) + ' g.', null, null, { sf: 3, unit: 'g' });
  } },
  { t: 'h4', make: function (R) {
    var rx = R.p(RXN.filter(function (x) { return x.r.length === 2; })), A = rx.r[0], B = rx.r[1], P = rx.p[rx.w];
    var mA = m3(R, 5, 80), mB = m3(R, 5, 80), nA = mA / molar(A[1]), nB = mB / molar(B[1]), ext = Math.min(nA / A[0], nB / B[0]), lim = nA / A[0] < nB / B[0] ? A : B;
    var mp = ext * P[0] * molar(P[1]);
    return num(nid('lim'), 'h4', mA + ' g of ' + chemF(A[1]) + ' and ' + mB + ' g of ' + chemF(B[1]) + ' react: ' + eqHTML(rx) + '. What mass of ' + chemF(P[1]) + ' can form? Give 3 significant figures.', sig(mp, 3),
      'Find moles of each reactant and divide by its coefficient. The smaller result is the limiting one.', 'n(' + chemF(A[1]) + ') / ' + A[0] + ' = ' + sig(nA / A[0], 4) + ' and n(' + chemF(B[1]) + ') / ' + B[0] + ' = ' + sig(nB / B[0], 4) + ', so ' + chemF(lim[1]) + ' is limiting. Product: ' + sig(ext, 4) + ' × ' + P[0] + ' × ' + molar(P[1]).toFixed(2) + ' = ' + sig(mp, 3) + ' g.', null, null, { sf: 3, unit: 'g' });
  } },
  { t: 'h4', make: function (R) {
    var rx = R.p(RXN.filter(function (x) { return x.r.length === 2; })), A = rx.r[0], B = rx.r[1];
    var nB = R.i(3, 12), ex = R.p([10, 20, 25, 30, 40, 50, 75, 100]), nA = Number(sig(nB / B[0] * A[0] * (1 + ex / 100), 3));
    var need = nB / B[0] * A[0], pe = (nA - need) / need * 100;
    return num(nid('exc'), 'h4', nA + ' mol of ' + chemF(A[1]) + ' and ' + nB + '.00 mol of ' + chemF(B[1]) + ' react: ' + eqHTML(rx) + '. ' + chemF(B[1]) + ' is limiting. What is the percent excess of ' + chemF(A[1]) + '? Give 2 significant figures.', sig(pe, 2),
      'Percent excess = (fed − needed) / needed × 100.', nB + ' mol ' + chemF(B[1]) + ' needs ' + sig(need, 4) + ' mol ' + chemF(A[1]) + '. (' + nA + ' − ' + sig(need, 4) + ') / ' + sig(need, 4) + ' = ' + sig(pe, 2) + '%.', null, null, { sf: 2, unit: '%' });
  } },
  { t: 'h5', make: function (R) {
    var rx = R.p(RXN), A = rx.r[0], P = rx.p[rx.w], m = m3(R, 4, 90), th = m / molar(A[1]) * P[0] / A[0] * molar(P[1]), y = R.i(55, 95), act = Number(sig(th * y / 100, 3)), py = act / th * 100;
    return num(nid('yld'), 'h5', m + ' g of ' + chemF(A[1]) + ' reacts with excess of everything else by ' + eqHTML(rx) + ' and gives ' + act + ' g of ' + chemF(P[1]) + '. What is the percent yield? Give 3 significant figures.', sig(py, 3),
      'Theoretical yield first.', 'Theoretical: ' + sig(th, 4) + ' g ' + chemF(P[1]) + '. ' + act + ' / ' + sig(th, 4) + ' = ' + sig(py, 3) + '%.', null, null, { sf: 3, unit: '%' });
  } },
  { t: 'h5', make: function (R) {
    var rx = R.p(RXN.filter(function (x) { return x.p.length > 1; })), P = rx.p[rx.w];
    var mr = rx.r.reduce(function (s, t) { return s + t[0] * molar(t[1]); }, 0), ae = P[0] * molar(P[1]) / mr * 100;
    return num(nid('ae'), 'h5', 'What is the atom economy for making ' + chemF(P[1]) + ' by ' + eqHTML(rx) + '? Give 3 significant figures.', sig(ae, 3),
      'Mass of desired product ÷ mass of all reactants, using the coefficients.', P[0] + ' × ' + molar(P[1]).toFixed(2) + ' = ' + sig(P[0] * molar(P[1]), 4) + ' g of product from ' + sig(mr, 4) + ' g of reactants: ' + sig(ae, 3) + '%.', null, null, { sf: 3, unit: '%' });
  } },
  { t: 'h6', make: function (R) {
    var v = R.i(0, 2);
    if (v === 0) { var M1 = m3(R, 1, 18), V1 = m3(R, 5, 95), V2 = Number(sig(V1 * R.i(3, 20), 3)), M2 = M1 * V1 / V2;
      return num(nid('dil'), 'h6', V1 + ' mL of ' + M1 + ' M solution is diluted to ' + V2 + ' mL. What is the new concentration in M? Give 3 significant figures.', sig(M2, 3), 'M₁V₁ = M₂V₂.', M1 + ' × ' + V1 + ' / ' + V2 + ' = ' + sig(M2, 3) + ' M.', null, null, { sf: 3, unit: 'M' }); }
    var c = R.p([['NaCl', 'NaCl'], ['CaCl2', 'CaCl₂'], ['NaOH', 'NaOH'], ['KCl', 'KCl'], ['H2SO4', 'H₂SO₄']]);
    if (v === 1) { var w = m3(R, 2, 20), d = R.p([1.01, 1.02, 1.04, 1.06, 1.10, 1.15]), M = w / 100 * d * 1000 / molar(c[0]);
      return num(nid('ww'), 'h6', 'What is the molarity of a ' + w + '% (w/w) ' + chemF(c[0]) + ' solution with density ' + d.toFixed(2) + ' g/mL? Give 3 significant figures.', sig(M, 3), 'Take 1 L of solution: its mass is density × 1000 mL.', '1 L = ' + (d * 1000).toFixed(0) + ' g of solution, ' + sig(w / 100 * d * 1000, 4) + ' g of ' + chemF(c[0]) + ' = ' + sig(M, 3) + ' mol, so ' + sig(M, 3) + ' M.', null, null, { sf: 3, unit: 'M' }); }
    var Vm = m3(R, 100, 900), Mm = m3(R, 0.05, 2), g = Vm / 1000 * Mm * molar(c[0]);
    return num(nid('mk'), 'h6', 'What mass of ' + chemF(c[0]) + ' is needed to make ' + Vm + ' mL of ' + Mm + ' M solution? Give 3 significant figures.', sig(g, 3), 'mol = M × V(L), then × molar mass.', (Vm / 1000) + ' L × ' + Mm + ' M = ' + sig(Vm / 1000 * Mm, 4) + ' mol × ' + molar(c[0]).toFixed(2) + ' = ' + sig(g, 3) + ' g.', null, null, { sf: 3, unit: 'g' });
  } },
  { t: 'h7', make: function (R) {
    var hc = R.p([[1, 4], [2, 6], [2, 4], [3, 8], [3, 6], [4, 10], [4, 8], [5, 12], [6, 14], [6, 6], [7, 8], [8, 18], [2, 2]]);
    var g = gcd(hc[0], hc[1]), ef = [hc[0] / g, hc[1] / g], m = m3(R, 1, 10), n = m / (hc[0] * AW.C + hc[1] * AW.H);
    var mc2 = sig(n * hc[0] * molar('CO2'), 3), mh = sig(n * hc[1] / 2 * molar('H2O'), 3);
    function f(c, h) { return 'C' + (c > 1 ? '<sub>' + c + '</sub>' : '') + 'H<sub>' + h + '</sub>'; }
    return gmc(R, nid('emp'), 'h7', 'A hydrocarbon burns completely and gives ' + mc2 + ' g of CO<sub>2</sub> and ' + mh + ' g of H<sub>2</sub>O. What is its empirical formula?', f(ef[0], ef[1]),
      [f(ef[0], ef[1] * 2), f(ef[0] * 2, ef[1]), f(ef[0], ef[1] + 1), f(1, ef[1] === 2 * ef[0] ? 3 : 2), f(ef[1], ef[0] > 1 ? ef[0] : 2)],
      'n(C) = ' + mc2 + ' / 44.01 = ' + sig(Number(mc2) / molar('CO2'), 3) + ' mol and n(H) = 2 × ' + mh + ' / 18.02 = ' + sig(2 * Number(mh) / molar('H2O'), 3) + ' mol. The ratio reduces to ' + ef[0] + ' : ' + ef[1] + '.', { k: 'n' });
  } },
  { t: 'h7', make: function (R) {
    var e = R.p([['CH2O', 'CH₂O', 'C', 'H', 'O', [1, 2, 1]], ['CH2', 'CH₂', 'C', 'H', '', [1, 2, 0]], ['C2H5', 'C₂H₅', 'C', 'H', '', [2, 5, 0]], ['C2H5NO', 'C₂H₅NO', 'C', 'H', 'NO', [2, 5, 1]], ['CH', 'CH', 'C', 'H', '', [1, 1, 0]], ['C3H4O3', 'C₃H₄O₃', 'C', 'H', 'O', [3, 4, 3]]]);
    var k = R.i(2, 6), Me = molar(e[0]), Mm = Math.round(Me * k);
    function mult(n) { return chemF(e[0].replace(/([A-Z][a-z]?)(\d*)/g, function (m, el, c) { var v = (c ? +c : 1) * n; return el + (v > 1 ? v : ''); })); }
    return gmc(R, nid('molf'), 'h7', 'A compound has empirical formula ' + e[1] + ' and a molar mass of about ' + Mm + ' g/mol. What is its molecular formula?', mult(k),
      [mult(k + 1), mult(k - 1 || 1), mult(k * 2), chemF(e[0])], e[1] + ' has a mass of ' + Me.toFixed(2) + ' g/mol. ' + Mm + ' / ' + Me.toFixed(2) + ' = ' + k + ', so multiply every subscript by ' + k + '.', { k: 'c' });
  } },
  { t: 'h8', make: function (R) {
    var g = R.p(GASES), V = m3(R, 0.5, 25), T = R.i(-20, 150), P = m3(R, 0.8, 9), n = P * V / (Rg * (T + 273.15)), m = n * molar(g[1]);
    return num(nid('igm'), 'h8', 'A ' + V + ' L rigid tank holds ' + g[0] + ' at ' + minus(T) + ' °C and ' + P + ' atm. What mass of gas is inside? Give 3 significant figures.', sig(m, 3),
      'n = PV/RT with T in kelvin and R = 0.082057 L·atm/(mol·K).', 'n = (' + P + ')(' + V + ') / (0.082057 × ' + (T + 273.15).toFixed(2) + ') = ' + sig(n, 4) + ' mol × ' + molar(g[1]).toFixed(2) + ' = ' + sig(m, 3) + ' g.', null, null, { sf: 3, unit: 'g' });
  } },
  { t: 'h8', make: function (R) {
    var g = R.p(GASES), T = R.i(-20, 200), P = m3(R, 0.5, 5), d = P * molar(g[1]) / (Rg * (T + 273.15));
    return num(nid('igd'), 'h8', 'What is the density of ' + g[0] + ' at ' + P + ' atm and ' + minus(T) + ' °C, in g/L? Give 3 significant figures.', sig(d, 3),
      'ρ = PM / RT.', '(' + P + ')(' + molar(g[1]).toFixed(2) + ') / (0.082057 × ' + (T + 273.15).toFixed(2) + ') = ' + sig(d, 3) + ' g/L.', null, null, { sf: 3, unit: 'g/L' });
  } },
  { t: 'h8', make: function (R) {
    var P1 = m3(R, 0.8, 6), T1 = R.i(0, 60), T2 = T1 + R.i(20, 250), P2 = P1 * (T2 + 273.15) / (T1 + 273.15);
    return num(nid('igt'), 'h8', 'A rigid sealed container of gas at ' + P1 + ' atm is heated from ' + T1 + ' °C to ' + T2 + ' °C. What is the new pressure in atm? Give 3 significant figures.', sig(P2, 3),
      'Fixed V and n: P is proportional to absolute T.', P1 + ' × (' + (T2 + 273.15).toFixed(2) + ' / ' + (T1 + 273.15).toFixed(2) + ') = ' + sig(P2, 3) + ' atm. Using °C directly would give the wrong ratio.', null, null, { sf: 3, unit: 'atm' });
  } },
  { t: 'h8', make: function (R) {
    var g = R.p(GASES), V = m3(R, 0.2, 3), T = R.i(0, 100), P = m3(R, 0.5, 3), m = Number(sig(P * V / (Rg * (T + 273.15)) * molar(g[1]), 3)), M = m * Rg * (T + 273.15) / (P * V);
    return num(nid('igM'), 'h8', 'A ' + m + ' g sample of an unknown gas fills ' + V + ' L at ' + P + ' atm and ' + T + ' °C. What is its molar mass in g/mol? Give 3 significant figures.', sig(M, 3),
      'M = mRT / PV.', '(' + m + ')(0.082057)(' + (T + 273.15).toFixed(2) + ') / ((' + P + ')(' + V + ')) = ' + sig(M, 3) + ' g/mol, close to ' + g[0] + '.', null, null, { sf: 3, unit: 'g/mol' });
  } },
  { t: 'h9', make: function (R) {
    var pair = R.sh(GASES).slice(0, 2), m1 = m3(R, 1, 40), m2 = m3(R, 1, 40), P = m3(R, 0.8, 8), n1 = m1 / molar(pair[0][1]), n2 = m2 / molar(pair[1][1]), p1 = n1 / (n1 + n2) * P;
    return num(nid('pp'), 'h9', 'A mixture of ' + m1 + ' g ' + pair[0][0] + ' and ' + m2 + ' g ' + pair[1][0] + ' has a total pressure of ' + P + ' atm. What is the partial pressure of ' + pair[0][0] + '? Give 3 significant figures.', sig(p1, 3),
      'P₁ = y₁ × P(total).', 'n = ' + sig(n1, 4) + ' and ' + sig(n2, 4) + ' mol, so y = ' + sig(n1 / (n1 + n2), 4) + '. × ' + P + ' = ' + sig(p1, 3) + ' atm.', null, null, { sf: 3, unit: 'atm' });
  } },
  { t: 'h9', make: function (R) {
    var V1 = m3(R, 1, 6), P1 = m3(R, 0.5, 6), V2 = m3(R, 1, 6), P2 = m3(R, 0.5, 6), Pf = (P1 * V1 + P2 * V2) / (V1 + V2);
    return num(nid('mix'), 'h9', 'A ' + V1 + ' L tank of neon at ' + P1 + ' atm is connected to a ' + V2 + ' L tank of argon at ' + P2 + ' atm. The valve opens at constant temperature. What is the final total pressure? Give 3 significant figures.', sig(Pf, 3),
      'Each gas expands into the total volume; add the partial pressures.', 'Ne: ' + P1 + ' × ' + V1 + ' / ' + sig(V1 + V2, 4) + ' and Ar: ' + P2 + ' × ' + V2 + ' / ' + sig(V1 + V2, 4) + '. Total ' + sig(Pf, 3) + ' atm.', null, null, { sf: 3, unit: 'atm' });
  } },
  { t: 'h9', make: function (R) {
    var f = R.p([['CH₄', 1, 2, 1, 2], ['C₂H₄', 2, 3, 2, 2], ['C₃H₈', 3, 5, 3, 4], ['C₂H₆', 2, 3.5, 2, 3]]), pf = R.f(0.1, 0.6, 2), xs = R.f(1.1, 3, 1), pO = Number((pf * f[2] * xs).toFixed(2));
    var co2 = pf * f[3], o2 = pO - pf * f[2], tot = co2 + o2;
    return num(nid('rv'), 'h9', 'A rigid vessel holds ' + f[0] + ' at ' + pf.toFixed(2) + ' atm and O<sub>2</sub> at ' + pO.toFixed(2) + ' atm. The fuel burns completely to CO<sub>2</sub> and H<sub>2</sub>O, and the vessel is cooled back to the start temperature so all the water condenses. What is the final pressure in atm? Give 3 significant figures.', sig(tot, 3),
      'At fixed V and T, partial pressures behave like moles. Balance per mole of fuel.', 'Per mole of fuel: ' + f[2] + ' O₂ used, ' + f[3] + ' CO₂ made. CO₂: ' + sig(co2, 3) + ' atm. O₂ left: ' + pO.toFixed(2) + ' − ' + sig(pf * f[2], 3) + ' = ' + sig(o2, 3) + ' atm. Total ' + sig(tot, 3) + ' atm.', null, null, { sf: 3, unit: 'atm' });
  } },
  /* density of a breathing mix, and the pressure that matches air's density */
  { t: 'h9', make: function (R) {
    var inert = R.p([['He', 'He'], ['Ne', 'Ne'], ['Ar', 'Ar']]), pctO = R.p([18.0, 19.5, 20.0, 21.0, 22.5, 24.0, 30.0, 32.0]), pctI = 100 - pctO;
    var M = (pctI * molar(inert[1]) + pctO * molar('O2')) / 100, AIR = 0.7808 * molar('N2') + 0.2095 * molar('O2') + 0.0093 * molar('Ar') + 0.00036 * molar('CO2');
    var pre = 'A breathing mix is ' + pctI.toFixed(1) + '% ' + inert[0] + ' and ' + pctO.toFixed(1) + '% O<sub>2</sub> by volume. ';
    if (R.chance(0.5)) {
      var tC = R.i(0, 40), P = m3(R, 0.9, 3.5), rho = P * M / (Rg * (tC + 273.15));
      return num(nid('mixd'), 'h9', pre + 'What is its density at ' + tC + ' °C and ' + P + ' atm, in g/L? Give 3 significant figures.', sig(rho, 3),
        'Volume % = mol %. Average molar mass, then ρ = PM/RT.', 'M = ' + (pctI / 100).toFixed(3) + '(' + molar(inert[1]).toFixed(3) + ') + ' + (pctO / 100).toFixed(3) + '(32.00) = ' + M.toFixed(2) + ' g/mol. ρ = ' + P + ' × ' + M.toFixed(2) + ' / (0.082057 × ' + (tC + 273.15).toFixed(2) + ') = ' + sig(rho, 3) + ' g/L.', null, null, { sf: 3, unit: 'g/L' });
    }
    var Pm = AIR / M;
    return num(nid('mixp'), 'h9', pre + 'Air is 78.08% N<sub>2</sub>, 20.95% O<sub>2</sub>, 0.93% Ar and 0.036% CO<sub>2</sub>. At what pressure does the mix have the same density as air at 1.00 atm and the same temperature, in atm? Give 3 significant figures.', sig(Pm, 3),
      'At the same T, density ∝ PM, so P(mix) M(mix) = (1.00 atm) M(air).', 'M(mix) = ' + M.toFixed(2) + ' g/mol and M(air) = ' + AIR.toFixed(2) + ' g/mol. P = ' + AIR.toFixed(2) + ' / ' + M.toFixed(2) + ' = ' + sig(Pm, 3) + ' atm.', null, null, { sf: 3, unit: 'atm' });
  } },
  /* an inert gas plus a gas that decomposes into more gas molecules */
  { t: 'h9', make: function (R) {
    var rx = R.p([['acetone, CH<sub>3</sub>COCH<sub>3</sub>', 'CH<sub>3</sub>COCH<sub>3</sub> → C<sub>2</sub>H<sub>4</sub> + CO + H<sub>2</sub>', 2], ['N<sub>2</sub>O<sub>4</sub>', 'N<sub>2</sub>O<sub>4</sub> → 2 NO<sub>2</sub>', 1], ['PCl<sub>5</sub>', 'PCl<sub>5</sub> → PCl<sub>3</sub> + Cl<sub>2</sub>', 1], ['ethane', 'C<sub>2</sub>H<sub>6</sub> → C<sub>2</sub>H<sub>4</sub> + H<sub>2</sub>', 1], ['ammonia', '2 NH<sub>3</sub> → N<sub>2</sub> + 3 H<sub>2</sub>', 1], ['dimethyl ether, CH<sub>3</sub>OCH<sub>3</sub>', 'CH<sub>3</sub>OCH<sub>3</sub> → CH<sub>4</sub> + CO + H<sub>2</sub>', 2]]);
    var inert = R.p(['argon', 'helium', 'nitrogen']), P0 = m3(R, 10, 90), y = R.f(0.08, 0.45, 2), Pf = Number(sig(P0 * (1 + rx[2] * y), 3));
    var ans = (Pf - P0) / (rx[2] * P0);
    return num(nid('dec'), 'h9', 'A rigid flask holds ' + inert + ' and ' + rx[0] + ' at ' + P0 + ' kPa. All of the ' + rx[0].split(',')[0] + ' decomposes, ' + rx[1] + ' (all gases), and the pressure rises to ' + Pf + ' kPa at the same temperature. The ' + inert + ' does not react. What was the mole fraction of ' + rx[0].split(',')[0] + ' at the start? Give 2 significant figures.', sig(ans, 2),
      'At fixed T and V, pressure tracks moles. Count the gain in gas molecules per molecule that decomposes.', 'Each molecule that decomposes adds ' + rx[2] + ' gas molecule' + (rx[2] > 1 ? 's' : '') + '. So ' + rx[2] + 'P = ' + Pf + ' − ' + P0 + ' = ' + sig(Pf - P0, 3) + ' kPa, P = ' + sig((Pf - P0) / rx[2], 3) + ' kPa, and y = that / ' + P0 + ' = ' + sig(ans, 2) + '.', null, null, { sf: 2 });
  } },
  { t: 'h10', make: function (R) {
    var g = R.p(GASES), T = R.i(200, 900), u = Math.sqrt(3 * 8.314 * T / (molar(g[1]) / 1000));
    return num(nid('urms'), 'h10', 'What is the rms speed of ' + g[0] + ' at ' + T + ' K, in m/s? Give 3 significant figures.', sig(u, 3),
      'u(rms) = √(3RT/M) with R = 8.314 J/(mol·K) and M in kg/mol.', 'M = ' + (molar(g[1]) / 1000).toFixed(5) + ' kg/mol. √(3 × 8.314 × ' + T + ' / ' + (molar(g[1]) / 1000).toFixed(5) + ') = ' + sig(u, 3) + ' m/s.', null, null, { sf: 3, unit: 'm/s' });
  } },
  { t: 'h10', make: function (R) {
    var p = R.sh(GASES).slice(0, 2), r = Math.sqrt(molar(p[1][1]) / molar(p[0][1]));
    return num(nid('urr'), 'h10', 'At the same temperature, what is u(rms) of ' + p[0][0] + ' divided by u(rms) of ' + p[1][0] + '? Give 3 significant figures.', sig(r, 3),
      'u(rms) is proportional to 1/√M.', '√(' + molar(p[1][1]).toFixed(2) + ' / ' + molar(p[0][1]).toFixed(2) + ') = ' + sig(r, 3) + '.', null, null, { sf: 3 });
  } },
  /* ---------- Units 3 to 5 ---------- */
  /* rate of reaction from one species' rate */
  { t: 'h11', make: function (R) {
    var rx = R.p(RRX), sp = R.sh(rx.s), i = sp[0], j = sp[1], r = m3(R, 0.00120, 0.0950), g = i[1] < 0 ? -r : r, Rd = r / Math.abs(i[1]);
    var askR = R.chance(0.3), ans = askR ? Rd : g * j[1] / i[1];
    var pre = 'For ' + rx.eq + ', [' + i[0] + '] is ' + (i[1] < 0 ? 'decreasing' : 'increasing') + ' at ' + sig(r, 3) + ' M/s. ';
    var why = 'Ṙ = |d[' + i[0] + ']/dt| ÷ ' + Math.abs(i[1]) + ' = ' + sig(r, 3) + ' / ' + Math.abs(i[1]) + ' = ' + sig(Rd, 4) + ' M/s. ';
    if (askR) return num(nid('rr'), 'h11', pre + 'What is the rate of reaction Ṙ, in M/s? Give 3 significant figures.', sig(ans, 3),
      'Ṙ = −(1/a) d[reactant]/dt = (1/c) d[product]/dt, and it is always positive.', why + 'Dividing by the coefficient gives one rate that every species agrees on.', null, null, { sf: 3, unit: 'M/s', chk: { f: 'rate', ni: i[1], nj: j[1], g: g, askR: true } });
    return num(nid('rr'), 'h11', pre + 'What is d[' + j[0] + ']/dt, in M/s? Use a negative sign if it is being used up. Give 3 significant figures.', sig(ans, 3),
      'Find Ṙ first by dividing by the coefficient of ' + i[0] + ', then multiply by the coefficient of ' + j[0] + '.',
      why + j[0] + ' is a ' + (j[1] < 0 ? 'reactant' : 'product') + ' with coefficient ' + Math.abs(j[1]) + ', so d[' + j[0] + ']/dt = ' + (j[1] < 0 ? '−' : '+') + Math.abs(j[1]) + ' × ' + sig(Rd, 4) + ' = ' + minus(sig(ans, 3)) + ' M/s.', null, null, { sf: 3, unit: 'M/s', chk: { f: 'rate', ni: i[1], nj: j[1], g: g, askR: false } });
  } },
  /* integrated rate laws with the course's a·k convention */
  { t: 'h12', make: function (R) {
    var n = R.i(0, 2), a = R.chance(0.35) ? 2 : 1, A0 = m3(R, 0.150, 1.20), mode = R.i(0, 2), k, ku;
    if (n === 0) { k = m3(R, 1.00e-3, 9.00e-3); ku = 'M/s'; } else if (n === 1) { k = m3(R, 1.00e-3, 4.00e-2); ku = 's⁻¹'; } else { k = m3(R, 0.0200, 0.900); ku = 'M⁻¹·s⁻¹'; }
    function conc(t) { return n === 0 ? A0 - a * k * t : n === 1 ? A0 * Math.exp(-a * k * t) : 1 / (1 / A0 + a * k * t); }
    function tTo(X) { return n === 0 ? (A0 - X) / (a * k) : n === 1 ? Math.log(A0 / X) / (a * k) : (1 / X - 1 / A0) / (a * k); }
    var lawTxt = ['[A] = [A]₀ − akt', 'ln[A] = ln[A]₀ − akt', '1/[A] = 1/[A]₀ + akt'][n], hlTxt = ['t½ = [A]₀ / (2ak)', 't½ = ln 2 / (ak)', 't½ = 1 / (ak[A]₀)'][n];
    var stem = 'For ' + (a === 2 ? '2 A' : 'A') + ' → products, the rate of reaction is Ṙ = ' + (a === 2 ? '−½ d[A]/dt' : '−d[A]/dt') + ' = k' + ['', '[A]', '[A]²'][n] + ', with k = ' + sci(k, 3) + ' ' + ku + ' and [A]₀ = ' + sig(A0, 3) + ' M. ';
    var note = a === 2 ? ' The a = 2 matters: A disappears twice as fast as Ṙ.' : '';
    var frac = R.f(0.20, 0.80, 2), t, ans, chk = { f: 'intg', n: n, a: a, k: k, A0: A0 };
    if (mode === 0) {
      t = Number(sig(tTo(frac * A0), 3)); ans = conc(t); chk.t = t; chk.ask = 'c';
      return num(nid('il'), 'h12', stem + 'What is [A] after ' + sig(t, 3) + ' s, in M? Give 3 significant figures.', sig(ans, 3), 'Order ' + n + ': ' + lawTxt + ', with a = ' + a + '.',
        [sig(A0, 3) + ' − ' + a + ' × ' + sci(k, 3) + ' × ' + sig(t, 3) + ' = ' + sig(ans, 3) + ' M', '[A] = ' + sig(A0, 3) + ' × e<sup>−' + a + ' × ' + sci(k, 3) + ' × ' + sig(t, 3) + '</sup> = ' + sig(ans, 3) + ' M', '1/[A] = 1/' + sig(A0, 3) + ' + ' + a + ' × ' + sci(k, 3) + ' × ' + sig(t, 3) + ' = ' + sig(1 / ans, 4) + ' M⁻¹, so [A] = ' + sig(ans, 3) + ' M'][n].replace(/^(\d)/, '[A] = $1') + '.' + note, null, null, { sf: 3, unit: 'M', chk: chk });
    }
    if (mode === 1) {
      var X = Number(sig(frac * A0, 3)); ans = tTo(X); chk.X = X; chk.ask = 't';
      return num(nid('il'), 'h12', stem + 'How long does it take for [A] to fall to ' + sig(X, 3) + ' M, in seconds? Give 3 significant figures.', sig(ans, 3), 'Order ' + n + ': ' + lawTxt + '. Solve for t.',
        ['t = ([A]₀ − [A]) / (ak) = (' + sig(A0, 3) + ' − ' + sig(X, 3) + ') / (' + a + ' × ' + sci(k, 3) + ')', 't = ln([A]₀/[A]) / (ak) = ln(' + sig(A0, 3) + ' / ' + sig(X, 3) + ') / (' + a + ' × ' + sci(k, 3) + ')', 't = (1/[A] − 1/[A]₀) / (ak) = (1/' + sig(X, 3) + ' − 1/' + sig(A0, 3) + ') / (' + a + ' × ' + sci(k, 3) + ')'][n] + ' = ' + sig(ans, 3) + ' s.' + note, null, null, { sf: 3, unit: 's', chk: chk });
    }
    ans = n === 0 ? A0 / (2 * a * k) : n === 1 ? Math.LN2 / (a * k) : 1 / (a * k * A0); chk.ask = 'h';
    return num(nid('il'), 'h12', stem + 'What is the half-life of A, in seconds? Give 3 significant figures.', sig(ans, 3), 'Order ' + n + ': ' + hlTxt + '.',
      hlTxt + ' = ' + sig(ans, 3) + ' s.' + (n === 1 ? ' It does not depend on [A]₀.' : '') + note, null, null, { sf: 3, unit: 's', chk: chk });
  } },
  /* method of initial rates */
  { t: 'h12', make: function (R) {
    var m = R.p([0, 1, 1, 2, 2]), nb = R.p([0, 1, 1, 2]), fA = R.p([2, 3]), fB = R.p([2, 3, 4]);
    var a0 = R.p([0.10, 0.20, 0.15, 0.050]), b0 = R.p([0.10, 0.20, 0.30, 0.25]), k = m3(R, 0.0500, 8.00);
    var r1 = k * Math.pow(a0, m) * Math.pow(b0, nb), rows = [[a0, b0, r1], [a0 * fA, b0, r1 * Math.pow(fA, m)], [a0, b0 * fB, r1 * Math.pow(fB, nb)]];
    var disp = rows.map(function (r) { return [sig(r[0], 2), sig(r[1], 2), sig(r[2], 3)]; });
    var tbl = 'Initial rates for A + B → products:<br>' + disp.map(function (d, i) { return 'Exp ' + (i + 1) + ': [A]₀ = ' + d[0] + ' M, [B]₀ = ' + d[1] + ' M, Ṙ = ' + sci(Number(d[2]), 3) + ' M/s'; }).join('<br>');
    var chk = { f: 'init', rows: disp.map(function (d) { return d.map(Number); }) }, v = R.i(0, 2);
    if (v < 2) {
      var ord = v === 0 ? m : nb, fac = v === 0 ? fA : fB, sp = v === 0 ? 'A' : 'B', ex = v === 0 ? '1 and 2' : '1 and 3';
      chk.ask = sp; chk.ans = ord;
      return gmc(R, nid('ir'), 'h12', tbl + '<br>What is the order with respect to ' + sp + '?', String(ord), ['0', '1', '2', '3', '0.5'].filter(function (o) { return o !== String(ord); }),
        'Compare Exp ' + ex + ': [' + sp + '] goes up ' + fac + ' times and ' + (ord === 0 ? 'the rate does not change, so ' + fac + '<sup>m</sup> = 1 and m = 0.' : 'the rate goes up ' + sig(Math.pow(fac, ord), 3) + ' times. ' + fac + '<sup>m</sup> = ' + sig(Math.pow(fac, ord), 3) + ' gives m = ' + ord + '.'), { k: 'n', chk: chk });
    }
    var kk = Number(disp[0][2]) / (Math.pow(Number(disp[0][0]), m) * Math.pow(Number(disp[0][1]), nb)), ov = m + nb;
    var ku = ov === 1 ? 's⁻¹' : ov === 0 ? 'M/s' : 'M<sup>' + minus(String(1 - ov)) + '</sup>·s⁻¹';
    chk.ask = 'k'; chk.m = m; chk.nb = nb;
    return num(nid('ir'), 'h12', tbl + '<br>The orders are whole numbers. What is the value of k, in ' + ku + '? Give 3 significant figures.', sig(kk, 3),
      'Find each order from a pair of experiments where only one concentration changes, then put Exp 1 into Ṙ = k[A]<sup>m</sup>[B]<sup>n</sup>.',
      'Orders: m = ' + m + ' (Exp 1 and 2) and n = ' + nb + ' (Exp 1 and 3). k = ' + sci(Number(disp[0][2]), 3) + ' / (' + disp[0][0] + (m === 1 ? '' : '<sup>' + m + '</sup>') + ' × ' + disp[0][1] + (nb === 1 ? '' : '<sup>' + nb + '</sup>') + ') = ' + sig(kk, 3) + ' ' + ku + '.', null, null, { sf: 3, chk: chk });
  } },
  /* Arrhenius */
  { t: 'h13', make: function (R) {
    var Ea = m3(R, 35.0, 140), T1c = R.i(15, 60), T1 = T1c + 273.15, dT = R.p([10, 15, 20, 25, 30, 40, 50]), T2 = T1 + dT, k1 = m3(R, 1.00e-4, 5.00e-2), mode = R.i(0, 2);
    var arr = 'ln(k₂/k₁) = −(Eₐ/R)(1/T₂ − 1/T₁), R = 8.314 J/(mol·K), T in K.';
    if (mode === 0) {
      var k2 = Number(sig(k1 * Math.exp(-Ea * 1000 / 8.314 * (1 / T2 - 1 / T1)), 3)), E = -8.314 * Math.log(k2 / k1) / (1 / T2 - 1 / T1) / 1000;
      return num(nid('ar'), 'h13', 'A rate constant is ' + sci(k1, 3) + ' s⁻¹ at ' + T1c + '.0 °C and ' + sci(k2, 3) + ' s⁻¹ at ' + (T1c + dT) + '.0 °C. What is Eₐ, in kJ/mol? Give 3 significant figures.', sig(E, 3), arr,
        'ln(k₂/k₁) = ' + sig(Math.log(k2 / k1), 4) + '. 1/T₂ − 1/T₁ = ' + sci(1 / T2 - 1 / T1, 4) + ' K⁻¹. Eₐ = ' + sig(E, 3) + ' kJ/mol.', null, null, { sf: 3, unit: 'kJ/mol', chk: { f: 'arrE', k1: k1, k2: k2, T1: T1, T2: T2 } });
    }
    if (mode === 1) {
      var kk = k1 * Math.exp(-Ea * 1000 / 8.314 * (1 / T2 - 1 / T1));
      return num(nid('ar'), 'h13', 'A reaction has Eₐ = ' + sig(Ea, 3) + ' kJ/mol and k = ' + sci(k1, 3) + ' s⁻¹ at ' + T1c + '.0 °C. What is k at ' + (T1c + dT) + '.0 °C, in s⁻¹? Give 3 significant figures, like 1.23E-3.', sig(kk, 3), arr,
        'ln(k₂/k₁) = −(' + Math.round(Ea * 1000) + ' / 8.314)(1/' + T2.toFixed(2) + ' − 1/' + T1.toFixed(2) + ') = ' + sig(Math.log(kk / k1), 4) + ', so k₂ = ' + sig(kk / k1, 4) + ' × k₁ = ' + sci(kk, 3) + ' s⁻¹.', null, null, { sf: 3, unit: 's⁻¹', chk: { f: 'arrK', Ea: Ea, k1: k1, T1: T1, T2: T2 } });
    }
    var f = R.p([2.00, 3.00, 5.00, 10.0]), iT = 1 / T1 - 8.314 * Math.log(f) / (Ea * 1000), Tc = 1 / iT - 273.15;
    return num(nid('ar'), 'h13', 'A reaction has Eₐ = ' + sig(Ea, 3) + ' kJ/mol. At what temperature, in °C, is its rate constant ' + sig(f, 3) + ' times its value at ' + T1c + '.0 °C? Give 3 significant figures.', sig(Tc, 3), arr + ' Solve for 1/T₂.',
      '1/T₂ = 1/' + T1.toFixed(2) + ' − (8.314 × ln ' + sig(f, 3) + ') / ' + Math.round(Ea * 1000) + ' = ' + iT.toFixed(7) + ' K⁻¹. T₂ = ' + (1 / iT).toFixed(1) + ' K = ' + sig(Tc, 3) + ' °C.', null, null, { sf: 3, unit: '°C', chk: { f: 'arrT', Ea: Ea, T1: T1, fac: f } });
  } },
  /* Clausius-Clapeyron */
  { t: 'h14', make: function (R) {
    var L = R.p(LIQ), Tb = L[1] + 273.15, H = L[2] * 1000, mode = R.i(0, 2), cc = 'ln(P₂/P₁) = −(ΔH<sub>vap</sub>/R)(1/T₂ − 1/T₁). The normal boiling point gives P = 760 mmHg at T<sub>b</sub>.';
    var pre = L[0].charAt(0).toUpperCase() + L[0].slice(1) + ' has a normal boiling point of ' + L[1].toFixed(1) + ' °C and ΔH<sub>vap</sub> = ' + L[2].toFixed(1) + ' kJ/mol. ';
    if (mode === 0) {
      var Tc = R.i(Math.max(-10, Math.round(L[1]) - 60), Math.round(L[1]) - 10), P = 760 * Math.exp(-H / 8.314 * (1 / (Tc + 273.15) - 1 / Tb));
      return num(nid('cc'), 'h14', pre + 'Estimate its vapour pressure at ' + minus(String(Tc)) + '.0 °C, in mmHg. Give 3 significant figures.', sig(P, 3), cc,
        'ln(P/760) = −(' + sig(H, 3) + ' / 8.314)(1/' + (Tc + 273.15).toFixed(2) + ' − 1/' + Tb.toFixed(2) + ') = ' + sig(Math.log(P / 760), 4) + ', so P = ' + sig(P, 3) + ' mmHg.', null, null, { sf: 3, unit: 'mmHg', chk: { f: 'ccP', H: H, Tb: Tb, T: Tc + 273.15 } });
    }
    if (mode === 1) {
      var Pm, iT, T2, tries = 0;
      do { Pm = R.chance(0.6) ? m3(R, 250, 700) : m3(R, 1000, 2300); iT = 1 / Tb - 8.314 * Math.log(Pm / 760) / H; T2 = 1 / iT - 273.15; } while (T2 < 10 && ++tries < 30);
      return num(nid('cc'), 'h14', pre + 'At what temperature does it boil when the pressure above it is ' + sig(Pm, 3) + ' mmHg, in °C? Give 3 significant figures.', sig(T2, 3), cc + ' It boils where P<sub>vap</sub> equals the outside pressure.',
        '1/T = 1/' + Tb.toFixed(2) + ' − (8.314 × ln(' + sig(Pm, 3) + '/760)) / ' + sig(H, 3) + ' = ' + iT.toFixed(7) + ' K⁻¹. T = ' + (1 / iT).toFixed(1) + ' K = ' + sig(T2, 3) + ' °C.', null, null, { sf: 3, unit: '°C', chk: { f: 'ccT', H: H, Tb: Tb, P: Pm } });
    }
    var t1 = R.i(Math.max(-10, Math.round(L[1]) - 55), Math.round(L[1]) - 30), t2 = t1 + R.i(15, 25);
    var p1 = Number(sig(760 * Math.exp(-H / 8.314 * (1 / (t1 + 273.15) - 1 / Tb)), 3)), p2 = Number(sig(760 * Math.exp(-H / 8.314 * (1 / (t2 + 273.15) - 1 / Tb)), 3));
    var dH = -8.314 * Math.log(p2 / p1) / (1 / (t2 + 273.15) - 1 / (t1 + 273.15)) / 1000;
    return num(nid('cc'), 'h14', 'A liquid has a vapour pressure of ' + sig(p1, 3) + ' mmHg at ' + minus(String(t1)) + '.0 °C and ' + sig(p2, 3) + ' mmHg at ' + minus(String(t2)) + '.0 °C. What is its ΔH<sub>vap</sub>, in kJ/mol? Give 3 significant figures.', sig(dH, 3), 'ln(P₂/P₁) = −(ΔH<sub>vap</sub>/R)(1/T₂ − 1/T₁), T in K.',
      'ln(' + sig(p2, 3) + '/' + sig(p1, 3) + ') = ' + sig(Math.log(p2 / p1), 4) + '. 1/T₂ − 1/T₁ = ' + sci(1 / (t2 + 273.15) - 1 / (t1 + 273.15), 4) + ' K⁻¹. ΔH<sub>vap</sub> = ' + sig(dH, 3) + ' kJ/mol.', null, null, { sf: 3, unit: 'kJ/mol', chk: { f: 'ccH', p1: p1, p2: p2, T1: t1 + 273.15, T2: t2 + 273.15 } });
  } },
  /* humidity and dew point */
  { t: 'h14', make: function (R) {
    var w = R.p(WVP), rh = R.p([45.0, 50.0, 55.0, 60.0, 65.0, 70.0, 75.0, 80.0, 85.0, 90.0]), P = R.i(740, 775), pw = rh / 100 * w[1], mode = R.i(0, 2);
    var pre = 'Air is at ' + w[0] + '.0 °C and ' + P + ' mmHg. The vapour pressure of water at ' + w[0] + '.0 °C is ' + w[1].toFixed(2) + ' mmHg. ';
    if (mode === 0) return num(nid('hu'), 'h14', pre + 'The relative humidity is ' + rh.toFixed(1) + '%. What is the mole fraction of water in the air? Give 3 significant figures.', sig(pw / P, 3),
      'RH = P(H₂O) / P<sub>vap</sub>(T), then y = P(H₂O) / P.', 'P(H₂O) = ' + (rh / 100).toFixed(3) + ' × ' + w[1].toFixed(2) + ' = ' + sig(pw, 4) + ' mmHg. y = ' + sig(pw, 4) + ' / ' + P + ' = ' + sig(pw / P, 3) + '.', null, null, { sf: 3, chk: { f: 'huY', rh: rh, pv: w[1], P: P } });
    if (mode === 1) {
      var iT, Td, tries = 0;
      do { iT = 1 / (w[0] + 273.15) - 8.314 / 44000 * Math.log(rh / 100); Td = 1 / iT - 273.15; if (Td < 10) rh = Math.min(90, rh + 5); } while (Td < 10 && ++tries < 12);
      pw = rh / 100 * w[1];
      return num(nid('hu'), 'h14', pre + 'The relative humidity is ' + rh.toFixed(1) + '%. Using ΔH<sub>vap</sub> = 44.0 kJ/mol, what is the dew point, in °C? Give 3 significant figures.', sig(Td, 3),
        'The dew point is where P<sub>vap</sub>(T) falls to the actual water pressure. Clausius–Clapeyron from ' + w[0] + '.0 °C.', 'P(H₂O) = ' + sig(pw, 4) + ' mmHg. 1/T = 1/' + (w[0] + 273.15).toFixed(2) + ' − (8.314/44 000) ln(' + (rh / 100).toFixed(3) + ') = ' + iT.toFixed(7) + ' K⁻¹. T = ' + (1 / iT).toFixed(1) + ' K = ' + sig(Td, 3) + ' °C.', null, null, { sf: 3, unit: '°C', chk: { f: 'huD', rh: rh, T: w[0] + 273.15 } });
    }
    var y = Number(sig(pw / P, 3)), RH = y * P / w[1] * 100;
    return num(nid('hu'), 'h14', pre + 'The mole fraction of water vapour is ' + sig(y, 3) + '. What is the relative humidity, in %? Give 3 significant figures.', sig(RH, 3),
      'P(H₂O) = yP, then RH = P(H₂O) / P<sub>vap</sub>(T) × 100%.', 'P(H₂O) = ' + sig(y, 3) + ' × ' + P + ' = ' + sig(y * P, 4) + ' mmHg. RH = ' + sig(y * P, 4) + ' / ' + w[1].toFixed(2) + ' × 100% = ' + sig(RH, 3) + '%.', null, null, { sf: 3, unit: '%', chk: { f: 'huR', y: y, P: P, pv: w[1] } });
  } },
  /* Raoult's law */
  { t: 'h16', make: function (R) {
    var pr = R.p(RAO), A = pr[0], pA = Number(pr[1]), B = pr[2], pB = Number(pr[3]), mode = R.i(0, 3), x = R.f(0.15, 0.85, 2), y = R.f(0.20, 0.80, 2);
    var pre = A.charAt(0).toUpperCase() + A.slice(1) + ' and ' + B + ' form an ideal solution. At 25 °C the pure vapour pressures are ' + pr[1] + ' mmHg (' + A + ') and ' + pr[3] + ' mmHg (' + B + '). ';
    var P = x * pA + (1 - x) * pB, chk = { f: 'rao', pA: pA, pB: pB, mode: mode };
    if (mode === 0) { chk.x = x; return num(nid('ra'), 'h16', pre + 'The liquid is ' + (x * 100).toFixed(1) + ' mol-% ' + A + '. What is the total vapour pressure, in mmHg? Give 3 significant figures.', sig(P, 3),
      'Raoult for each, P<sub>i</sub> = x<sub>i</sub>P<sub>i</sub><sup>vap</sup>, then add.', A.charAt(0).toUpperCase() + A.slice(1) + ': ' + x.toFixed(3) + ' × ' + pr[1] + ' = ' + sig(x * pA, 4) + '. ' + B + ': ' + (1 - x).toFixed(3) + ' × ' + pr[3] + ' = ' + sig((1 - x) * pB, 4) + '. Total ' + sig(P, 3) + ' mmHg.', null, null, { sf: 3, unit: 'mmHg', chk: chk }); }
    if (mode === 1) { chk.x = x; return num(nid('ra'), 'h16', pre + 'The liquid is ' + (x * 100).toFixed(1) + ' mol-% ' + A + '. What is the mole fraction of ' + A + ' in the vapour? Give 3 significant figures.', sig(x * pA / P, 3),
      'y<sub>A</sub> = x<sub>A</sub>P<sub>A</sub><sup>vap</sup> / P, where P is the total vapour pressure.', 'P = ' + sig(x * pA, 4) + ' + ' + sig((1 - x) * pB, 4) + ' = ' + sig(P, 4) + ' mmHg. y = ' + sig(x * pA, 4) + ' / ' + sig(P, 4) + ' = ' + sig(x * pA / P, 3) + '. The vapour is richer in the more volatile ' + A + '.', null, null, { sf: 3, chk: chk }); }
    var xl = (y / pA) / (y / pA + (1 - y) / pB), Pd = 1 / (y / pA + (1 - y) / pB);
    chk.y = y;
    if (mode === 2) return num(nid('ra'), 'h16', pre + 'The vapour above the solution is ' + (y * 100).toFixed(1) + ' mol-% ' + A + '. What is the mole fraction of ' + A + ' in the liquid? Give 3 significant figures.', sig(xl, 3),
      'x<sub>i</sub> = y<sub>i</sub>P / P<sub>i</sub><sup>vap</sup>, and the x values add to 1. Solve for P first.', '1/P = ' + y.toFixed(3) + '/' + pr[1] + ' + ' + (1 - y).toFixed(3) + '/' + pr[3] + ', so P = ' + sig(Pd, 4) + ' mmHg. x = ' + y.toFixed(3) + ' × ' + sig(Pd, 4) + ' / ' + pr[1] + ' = ' + sig(xl, 3) + '.', null, null, { sf: 3, chk: chk });
    return num(nid('ra'), 'h16', pre + 'A vapour of ' + (y * 100).toFixed(1) + ' mol-% ' + A + ' is compressed at 25 °C. At what pressure does the first drop of liquid form, in mmHg? Give 3 significant figures.', sig(Pd, 3),
      'At the dew point, the liquid mole fractions x<sub>i</sub> = y<sub>i</sub>P / P<sub>i</sub><sup>vap</sup> add to 1.', '1/P = ' + y.toFixed(3) + '/' + pr[1] + ' + ' + (1 - y).toFixed(3) + '/' + pr[3] + ' = ' + sig(1 / Pd, 4) + ' mmHg⁻¹, so P = ' + sig(Pd, 3) + ' mmHg.', null, null, { sf: 3, unit: 'mmHg', chk: chk });
  } },
  /* Henry's law */
  { t: 'h16', make: function (R) {
    var g = R.p(HEN), P = m3(R, 0.200, 8.00), mode = R.i(0, 2), x = P / g[1];
    var pre = 'At 20 °C, Henry\'s constant for ' + g[0] + ' in water is H = ' + sci(g[1], 3) + ' atm (P = Hx). ';
    if (mode === 0) return num(nid('he'), 'h16', pre + 'What mole fraction of ' + g[0] + ' dissolves when its partial pressure is ' + sig(P, 3) + ' atm? Give 3 significant figures, like 1.23E-5.', sig(x, 3),
      'x = P / H. Use the partial pressure of the gas.', 'x = ' + sig(P, 3) + ' / ' + sci(g[1], 3) + ' = ' + sci(x, 3) + '.', null, null, { sf: 3, chk: { f: 'heX', P: P, H: g[1] } });
    if (mode === 1) {
      var kg = m3(R, 0.500, 50.0), mg = x / (1 - x) * (kg * 1000 / 18.015) * g[2] * 1000;
      return num(nid('he'), 'h16', pre + 'What mass of ' + g[0] + ' dissolves in ' + sig(kg, 3) + ' kg of water when its partial pressure is ' + sig(P, 3) + ' atm, in mg? Give 3 significant figures.', sig(mg, 3),
        'x = P/H. Then n(gas) = x n(water) / (1 − x), which is about x × n(water) for a dilute solution. M(' + g[0] + ') = ' + g[2].toFixed(2) + ' g/mol.', 'x = ' + sci(x, 4) + '. n(water) = ' + sig(kg * 1000 / 18.015, 4) + ' mol, so n(gas) = ' + sci(x / (1 - x) * kg * 1000 / 18.015, 4) + ' mol and the mass is ' + sig(mg, 3) + ' mg.', null, null, { sf: 3, unit: 'mg', chk: { f: 'heM', P: P, H: g[1], kg: kg, M: g[2] } });
    }
    var s1 = m3(R, 1.00, 80.0), P2 = m3(R, 0.200, 8.00);
    return num(nid('he'), 'h16', 'The solubility of ' + g[0] + ' in water is ' + sig(s1, 3) + ' mg/L when its partial pressure is ' + sig(P, 3) + ' atm. At the same temperature, what is its solubility at ' + sig(P2, 3) + ' atm, in mg/L? Give 3 significant figures.', sig(s1 * P2 / P, 3),
      'Henry\'s law, C = kP: the solubility is proportional to the partial pressure.', 'C₂ = C₁ × P₂/P₁ = ' + sig(s1, 3) + ' × ' + sig(P2, 3) + ' / ' + sig(P, 3) + ' = ' + sig(s1 * P2 / P, 3) + ' mg/L.', null, null, { sf: 3, unit: 'mg/L', chk: { f: 'heS', s1: s1, P1: P, P2: P2 } });
  } },
  /* colligative properties in water */
  { t: 'h17', make: function (R) {
    var s = R.p(SOLU), M = molar(s[1]), ms = m3(R, 1.00, 40.0), mw = m3(R, 100, 900), mode = R.i(0, 2), m = ms / M / (mw / 1000);
    var who = s[0] + ' (' + chemF(s[1]) + ', ' + M.toFixed(2) + ' g/mol)', diss = s[2] > 1 ? ' Assume it dissociates completely.' : '';
    if (mode === 0) { var fp = -s[2] * 1.86 * m;
      return num(nid('co'), 'h17', sig(ms, 3) + ' g of ' + who + ' is dissolved in ' + sig(mw, 3) + ' g of water.' + diss + ' K<sub>f</sub> = 1.86 K·kg/mol. What is the freezing point of the solution, in °C? Give 3 significant figures.', sig(fp, 3),
        'ΔT<sub>f</sub> = −iK<sub>f</sub>m, with i = ' + s[2] + ' and m in mol per kg of water.', 'm = (' + sig(ms, 3) + ' / ' + M.toFixed(2) + ') / ' + sig(mw / 1000, 3) + ' = ' + sig(m, 4) + ' mol/kg. ΔT<sub>f</sub> = −' + s[2] + ' × 1.86 × ' + sig(m, 4) + ' = ' + minus(sig(fp, 3)) + ' °C, so it freezes at ' + minus(sig(fp, 3)) + ' °C.', null, null, { sf: 3, unit: '°C', chk: { f: 'coF', i: s[2], ms: ms, M: M, mw: mw } }); }
    if (mode === 1) { var db = s[2] * 0.512 * m;
      return num(nid('co'), 'h17', sig(ms, 3) + ' g of ' + who + ' is dissolved in ' + sig(mw, 3) + ' g of water.' + diss + ' K<sub>b</sub> = 0.512 K·kg/mol. By how much does the boiling point rise, in °C? Give 3 significant figures.', sig(db, 3),
        'ΔT<sub>b</sub> = iK<sub>b</sub>m, with i = ' + s[2] + '.', 'm = ' + sig(m, 4) + ' mol/kg. ΔT<sub>b</sub> = ' + s[2] + ' × 0.512 × ' + sig(m, 4) + ' = ' + sig(db, 3) + ' °C.', null, null, { sf: 3, unit: '°C', chk: { f: 'coB', i: s[2], ms: ms, M: M, mw: mw } }); }
    var Mu = m3(R, 60.0, 400), dT = Number(sig(1.86 * ms / Mu / (mw / 1000), 3)), Mans = 1.86 * ms / (dT * mw / 1000);
    return num(nid('co'), 'h17', sig(ms, 3) + ' g of an unknown compound that does not dissociate is dissolved in ' + sig(mw, 3) + ' g of water, and the freezing point drops by ' + sig(dT, 3) + ' °C. K<sub>f</sub> = 1.86 K·kg/mol. What is its molar mass, in g/mol? Give 3 significant figures.', sig(Mans, 3),
      'm = ΔT<sub>f</sub> / K<sub>f</sub> (i = 1). Then n = m × kg of water and M = mass / n.', 'm = ' + sig(dT, 3) + ' / 1.86 = ' + sig(dT / 1.86, 4) + ' mol/kg. n = ' + sig(dT / 1.86, 4) + ' × ' + sig(mw / 1000, 3) + ' = ' + sig(dT / 1.86 * mw / 1000, 4) + ' mol. M = ' + sig(ms, 3) + ' / that = ' + sig(Mans, 3) + ' g/mol.', null, null, { sf: 3, unit: 'g/mol', chk: { f: 'coM', ms: ms, mw: mw, dT: dT } });
  } },
  /* Kp and Kc */
  { t: 'h18', make: function (R) {
    var rx = R.p(KRX), Tc = R.i(25, 900), T = Tc + 273.15, K = Number(sig(Math.pow(10, R.f(-5, 4, 2)), 3)), toP = R.chance(0.5), RT = 0.08314 * T;
    var ans = toP ? K * Math.pow(RT, rx[1]) : K / Math.pow(RT, rx[1]);
    return num(nid('kp'), 'h18', 'For ' + rx[0] + ', K<sub>' + (toP ? 'c' : 'p') + '</sub> = ' + sci(K, 3) + ' at ' + Tc + ' °C' + (toP ? '' : ' (pressures in bar)') + '. What is K<sub>' + (toP ? 'p' : 'c') + '</sub>' + (toP ? ', with pressures in bar' : '') + '? Give 3 significant figures.', sig(ans, 3),
      'K<sub>p</sub> = K<sub>c</sub>(RT)<sup>Δn</sup>, R = 0.08314 L·bar/(mol·K), T in K, Δn counts gas moles only.',
      'Δn = ' + minus(String(rx[1])) + (rx[2] ? ' (' + rx[2] + ')' : '') + '. RT = 0.08314 × ' + T.toFixed(2) + ' = ' + sig(RT, 4) + '. ' + (rx[1] === 0 ? 'With Δn = 0, K<sub>p</sub> = K<sub>c</sub>.' : (toP ? 'K<sub>p</sub> = ' + sci(K, 3) + ' × ' + sig(RT, 4) + '<sup>' + minus(String(rx[1])) + '</sup>' : 'K<sub>c</sub> = ' + sci(K, 3) + ' / ' + sig(RT, 4) + '<sup>' + minus(String(rx[1])) + '</sup>') + ' = ' + sci(ans, 3) + '.'),
      null, null, { sf: 3, chk: { f: 'kp', K: K, T: T, dn: rx[1], toP: toP } });
  } },
  /* combining equilibrium constants */
  { t: 'h18', make: function (R) {
    var b = R.p(KCOMB), tr = R.p([['rev', -1, 'Reversing inverts K'], ['half', 0.5, 'Halving the coefficients takes the square root'], ['halfrev', -0.5, 'Reversing inverts K, and halving takes the square root'], ['dbl', 2, 'Doubling the coefficients squares K'], ['dblrev', -2, 'Reversing inverts K, and doubling squares it']]);
    var K, ans, e3, tries = 0;
    do { K = Number(sig(Math.pow(10, R.f(-4, 5, 2)), 2)); ans = Math.pow(K, tr[1]); e3 = ans.toExponential(2); } while (e3.charAt(3) === '5' && Math.abs(Number(e3) - ans) <= 1e-9 * ans && ++tries < 30);   /* skip exact rounding ties like 0.0625 */
    return num(nid('kk'), 'h18', 'At a certain temperature, K = ' + sci(K, 2) + ' for ' + b.f + '. What is K for ' + b[tr[0]] + ' at the same temperature? Give 2 significant figures.', sig(ans, 2),
      'Reverse → 1/K. Multiply the coefficients by n → K<sup>n</sup>.', tr[2] + ': K = (' + sci(K, 2) + ')<sup>' + minus(String(tr[1] === 0.5 ? '½' : tr[1] === -0.5 ? '-½' : tr[1])) + '</sup> = ' + sci(ans, 2) + '.', null, null, { sf: 2, chk: { f: 'comb', K: K, p: tr[1] } });
  } },
  /* ICE tables */
  { t: 'h19', make: function (R) {
    var mode = R.i(0, 2), K, c0, x, ans, q, why, chk;
    if (mode === 0) {
      var s = R.p([['CO', 'H₂O', 'CO₂', 'H₂'], ['CO₂', 'H₂', 'CO', 'H₂O'], ['NO₂', 'SO₂', 'NO', 'SO₃']]);
      K = m3(R, 0.200, 9.00); c0 = m3(R, 0.0500, 0.800); var rK = Math.sqrt(K); x = c0 * rK / (1 + rK);
      var askP = R.chance(0.6); ans = askP ? x : c0 - x;
      q = 'For ' + s[0] + '(g) + ' + s[1] + '(g) ⇌ ' + s[2] + '(g) + ' + s[3] + '(g), K<sub>c</sub> = ' + sig(K, 3) + '. A vessel starts with ' + sig(c0, 3) + ' M each of ' + s[0] + ' and ' + s[1] + ' and no products. What is [' + (askP ? s[2] : s[0]) + '] at equilibrium, in M? Give 3 significant figures.';
      why = 'x² / (' + sig(c0, 3) + ' − x)² = ' + sig(K, 3) + ', so x / (' + sig(c0, 3) + ' − x) = √' + sig(K, 3) + ' = ' + sig(rK, 4) + ' and x = ' + sig(x, 4) + ' M. [' + (askP ? s[2] : s[0]) + '] = ' + sig(ans, 3) + ' M.';
      chk = { f: 'ice', t: 'sq', K: K, c0: c0, askP: askP };
    } else if (mode === 1) {
      var r = R.p([['PCl₅', 'PCl₃', 'Cl₂'], ['COCl₂', 'CO', 'Cl₂'], ['SO₂Cl₂', 'SO₂', 'Cl₂']]);
      K = Number(sig(Math.pow(10, R.f(-3, 0.3, 2)), 3)); c0 = m3(R, 0.0500, 1.00); x = (-K + Math.sqrt(K * K + 4 * K * c0)) / 2;
      var askA = R.chance(0.4); ans = askA ? c0 - x : x;
      q = 'For ' + r[0] + '(g) ⇌ ' + r[1] + '(g) + ' + r[2] + '(g), K<sub>c</sub> = ' + sci(K, 3) + '. A vessel starts with ' + sig(c0, 3) + ' M ' + r[0] + ' only. What is [' + (askA ? r[0] : r[2]) + '] at equilibrium, in M? Give 3 significant figures.';
      why = 'x² / (' + sig(c0, 3) + ' − x) = ' + sci(K, 3) + ', so x² + ' + sci(K, 3) + 'x − ' + sci(K * c0, 3) + ' = 0 and x = ' + sig(x, 4) + ' M (the positive root). [' + (askA ? r[0] : r[2]) + '] = ' + sig(ans, 3) + ' M.';
      chk = { f: 'ice', t: 'dis', K: K, c0: c0, askA: askA };
    } else {
      K = m3(R, 5.00, 90.0); c0 = m3(R, 0.0500, 0.800); var rk = Math.sqrt(K); x = c0 * rk / (2 + rk); ans = 2 * x;
      q = 'For H₂(g) + I₂(g) ⇌ 2 HI(g), K<sub>c</sub> = ' + sig(K, 3) + '. A vessel starts with ' + sig(c0, 3) + ' M each of H₂ and I₂ and no HI. What is [HI] at equilibrium, in M? Give 3 significant figures.';
      why = '(2x)² / (' + sig(c0, 3) + ' − x)² = ' + sig(K, 3) + ', so 2x / (' + sig(c0, 3) + ' − x) = ' + sig(rk, 4) + ' and x = ' + sig(x, 4) + ' M. [HI] = 2x = ' + sig(ans, 3) + ' M.';
      chk = { f: 'ice', t: 'hi', K: K, c0: c0 };
    }
    return num(nid('ic'), 'h19', q, sig(ans, 3), 'ICE table: start, change (±x times each coefficient), equilibrium. Put the equilibrium row into K.', why, null, null, { sf: 3, unit: 'M', chk: chk });
  } },
  /* Q against K */
  { t: 'h19', make: function (R) {
    var rx = R.p(QRX), V = R.p([1.00, 2.00, 5.00, 10.0]), amt = {}, Q = 1;
    rx.r.concat(rx.p).forEach(function (s) { amt[s[0]] = m3(R, 0.0200, 2.00); });
    rx.p.forEach(function (s) { Q *= Math.pow(amt[s[0]] / V, s[1]); }); rx.r.forEach(function (s) { Q /= Math.pow(amt[s[0]] / V, s[1]); });
    var f = R.chance(0.5) ? R.f(2.5, 12, 1) : 1 / R.f(2.5, 12, 1), K = Number(sig(Q * f, 2)), fw = Q < K;
    var list = rx.r.concat(rx.p).map(function (s) { return sig(amt[s[0]], 3) + ' mol ' + s[0]; }).join(', ');
    return gmc(R, nid('qk'), 'h19', 'For ' + rx.eq + ', K<sub>c</sub> = ' + sci(K, 2) + ' at this temperature. A ' + sig(V, 3) + ' L vessel holds ' + list + '. Which way does the reaction go to reach equilibrium?',
      fw ? 'Forward: more products form' : 'Reverse: more reactants form', [fw ? 'Reverse: more reactants form' : 'Forward: more products form', 'Neither: it is already at equilibrium'],
      'Divide by ' + sig(V, 3) + ' L to get concentrations, then Q<sub>c</sub> = ' + sci(Q, 3) + '. Q ' + (fw ? '&lt;' : '&gt;') + ' K, so the reaction goes ' + (fw ? 'forward, making products' : 'in reverse, making reactants') + ' until Q = K.', { k: 'n', chk: { f: 'qk', Q: Q, K: K } });
  } },
  /* van 't Hoff */
  { t: 'h20', make: function (R) {
    var dH = (R.chance(0.5) ? -1 : 1) * m3(R, 15.0, 150), T1 = R.p([298, 300, 350, 400, 500, 600]), T2 = T1 + R.p([25, 50, 100, 150, 200]), K1 = Number(sig(Math.pow(10, R.f(-4, 4, 2)), 3));
    var vh = 'ln(K₂/K₁) = −(ΔH°/R)(1/T₂ − 1/T₁), R = 8.314 J/(mol·K).';
    if (R.chance(0.55)) {
      var K2 = K1 * Math.exp(-dH * 1000 / 8.314 * (1 / T2 - 1 / T1));
      return num(nid('vh'), 'h20', 'A reaction has ΔH° = ' + minus(sig(dH, 3)) + ' kJ/mol and K = ' + sci(K1, 3) + ' at ' + T1 + ' K. Estimate K at ' + T2 + ' K. Give 3 significant figures.', sig(K2, 3), vh,
        'ln(K₂/K₁) = −(' + minus(String(Math.round(dH * 1000))) + ' / 8.314)(1/' + T2 + ' − 1/' + T1 + ') = ' + minus(sig(Math.log(K2 / K1), 4)) + ', so K₂ = ' + sci(K2, 3) + '. ' + (dH > 0 ? 'Endothermic, so K rises with T.' : 'Exothermic, so K falls as T rises.'), null, null, { sf: 3, chk: { f: 'vhK', dH: dH, K1: K1, T1: T1, T2: T2 } });
    }
    var k2 = Number(sig(K1 * Math.exp(-dH * 1000 / 8.314 * (1 / T2 - 1 / T1)), 3)), H = -8.314 * Math.log(k2 / K1) / (1 / T2 - 1 / T1) / 1000;
    return num(nid('vh'), 'h20', 'A reaction has K = ' + sci(K1, 3) + ' at ' + T1 + ' K and K = ' + sci(k2, 3) + ' at ' + T2 + ' K. What is ΔH°, in kJ/mol? Include the sign. Give 3 significant figures.', sig(H, 3), vh + ' Solve for ΔH°.',
      'ln(K₂/K₁) = ' + minus(sig(Math.log(k2 / K1), 4)) + '. 1/T₂ − 1/T₁ = ' + sci(1 / T2 - 1 / T1, 4) + ' K⁻¹. ΔH° = −8.314 × ' + minus(sig(Math.log(k2 / K1), 4)) + ' / (' + sci(1 / T2 - 1 / T1, 4) + ') = ' + minus(sig(H, 3)) + ' kJ/mol. ' + (H > 0 ? 'K rises with T: endothermic.' : 'K falls as T rises: exothermic.'), null, null, { sf: 3, unit: 'kJ/mol', chk: { f: 'vhH', K1: K1, K2: k2, T1: T1, T2: T2 } });
  } },
  /* Le Chatelier */
  { t: 'h20', make: function (R) {
    var rx = R.p(LCR), dn = rx.gp - rx.gr, P = rx.pg[0], ds = [];
    if (rx.rg.length) ds.push(['addR', 'Some ' + R.p(rx.rg) + ' is added at constant volume.']);
    if (rx.pg.length > 1) ds.push(['remP', 'Some ' + rx.pg[1] + ' is removed at constant volume.']);
    ds.push(['upT', 'The temperature is raised.'], ['downT', 'The temperature is lowered.'], ['decV', 'The volume is decreased at constant temperature.'], ['incV', 'The volume is increased at constant temperature.'],
      ['inert', 'Argon is added at constant volume and temperature.'], ['cat', 'A catalyst is added.']);
    if (rx.solid) ds.push(['solid', 'More ' + rx.solid + ' is added.']);
    var d = R.p(ds), eff, why;
    if (d[0] === 'addR') { eff = 1; why = 'Adding a reactant makes Q &lt; K, so the reaction shifts forward.'; }
    else if (d[0] === 'remP') { eff = 1; why = 'Removing a product makes Q &lt; K, so the reaction shifts forward.'; }
    else if (d[0] === 'upT' || d[0] === 'downT') { eff = (d[0] === 'upT' ? 1 : -1) * rx.dH; why = 'The forward reaction is ' + (rx.dH > 0 ? 'endothermic' : 'exothermic') + '. Heating favours the endothermic direction, so ' + (d[0] === 'upT' ? 'raising' : 'lowering') + ' T shifts it ' + (eff > 0 ? 'forward' : 'back') + ' and K ' + (eff > 0 ? 'rises' : 'falls') + '.'; }
    else if (d[0] === 'decV' || d[0] === 'incV') { eff = dn === 0 ? 0 : (d[0] === 'decV' ? -1 : 1) * Math.sign(dn); why = 'Gas moles: ' + rx.gr + ' on the left, ' + rx.gp + ' on the right (solids do not count). ' + (dn === 0 ? 'They are equal, so changing the volume causes no shift.' : (d[0] === 'decV' ? 'A smaller volume favours the side with fewer gas moles' : 'A larger volume favours the side with more gas moles') + ', so it shifts ' + (eff > 0 ? 'forward' : 'back') + '.'); }
    else if (d[0] === 'inert') { eff = 0; why = 'At constant volume the partial pressures of the reacting gases do not change, so Q = K and nothing shifts.'; }
    else if (d[0] === 'cat') { eff = 0; why = 'A catalyst speeds up both directions equally. It does not change K or the equilibrium amounts.'; }
    else { eff = 0; why = 'A pure solid has an activity of 1, so adding more does not change Q. Nothing shifts.'; }
    var right = eff > 0 ? 'It increases' : eff < 0 ? 'It decreases' : 'It does not change';
    return gmc(R, nid('lc'), 'h20', rx.eq + ' is at equilibrium. The forward reaction is ' + (rx.dH > 0 ? 'endothermic' : 'exothermic') + '. ' + d[1] + ' What happens to the amount of ' + P + '?', right,
      ['It increases', 'It decreases', 'It does not change'].filter(function (o) { return o !== right; }), why, { k: 'c', chk: { f: 'lc', d: d[0], dH: rx.dH, gr: rx.gr, gp: rx.gp, eff: eff } });
  } },
  /* ---------- Unit 6 ---------- */
  { t: 'h21', make: function (R) {
    var pair;
    do { pair = R.sh(EHALF).slice(0, 2); } while (Math.abs(pair[0][2] - pair[1][2]) < 0.1);
    var cat = pair[0][2] > pair[1][2] ? pair[0] : pair[1], an = cat === pair[0] ? pair[1] : pair[0];
    var e = (cat[2] - an[2]).toFixed(3), sf = sigCount(e);
    return num(nid('ec'), 'h21', 'A galvanic cell is built from the half-cells ' + pair[0][1] + ' (E° = ' + minus(pair[0][2].toFixed(3)) + ' V) and ' + pair[1][1] + ' (E° = ' + minus(pair[1][2].toFixed(3)) + ' V). What is E°<sub>cell</sub> for the spontaneous reaction, in V? Give ' + sf + ' significant figures.', e,
      'The half-cell with the higher E° is reduced (the cathode). E°<sub>cell</sub> = E°<sub>cathode</sub> − E°<sub>anode</sub>, which comes out positive.',
      'The ' + cat[0] + ' half-cell has the higher reduction potential, so it is the cathode and ' + an[0] + ' is the anode. E°<sub>cell</sub> = ' + minus(cat[2].toFixed(3)) + ' − (' + minus(an[2].toFixed(3)) + ') = ' + e + ' V. Do not multiply E° by any coefficients.', null, null,
      { sf: sf, unit: 'V', chk: { f: 'ecell', a: pair[0][2], b: pair[1][2] } });
  } },
  { t: 'h22', make: function (R) {
    var m = R.p(EMET), c1 = R.p([0.0010, 0.0050, 0.010, 0.050, 0.10, 0.50, 1.0, 2.0]), c2 = R.p([0.0010, 0.010, 0.10, 0.50, 1.0, 2.0]);
    /* metal anode in its own ion at c1, copper cathode in Cu2+ at c2 */
    var E0 = 0.340 - m[2], two = m[3] === 2, n = two ? 2 : 6, Q = two ? c1 / c2 : Math.pow(c1, 2) / Math.pow(c2, 3);
    var E = E0 - 8.314 * 298.15 / (n * 96485) * Math.log(Q);
    var rx = two ? m[0] + '(s) + Cu²⁺(aq) → ' + m[1] + '(aq) + Cu(s)' : '2 ' + m[0] + '(s) + 3 Cu²⁺(aq) → 2 ' + m[1] + '(aq) + 3 Cu(s)';
    return num(nid('ne'), 'h22', 'Find E<sub>cell</sub> at 25 °C for ' + m[0] + '(s)|' + m[1] + '(' + sig(c1, 2) + ' M)||Cu²⁺(' + sig(c2, 2) + ' M)|Cu(s). ' + m[1] + '|' + m[0] + ': ' + minus(m[2].toFixed(3)) + ' V, Cu²⁺|Cu: +0.340 V. Give 3 significant figures.', sig(E, 3),
      'Overall reaction: ' + rx + '. Nernst: E = E° − (RT/nF) ln Q, with the solids left out of Q.',
      'E° = 0.340 − (' + minus(m[2].toFixed(3)) + ') = ' + E0.toFixed(3) + ' V and n = ' + n + '. Q = ' + (two ? '[' + m[1] + ']/[Cu²⁺]' : '[' + m[1] + ']²/[Cu²⁺]³') + ' = ' + minus(sig(Q, 3)) + '. E = ' + E0.toFixed(3) + ' − (8.314 × 298.15 / (' + n + ' × 96485)) ln(' + minus(sig(Q, 3)) + ') = ' + sig(E, 3) + ' V.', null, null,
      { sf: 3, unit: 'V', chk: { f: 'nernst', E0: E0, n: n, Q: Q } });
  } },
  { t: 'h22', make: function (R) {
    var m = R.p(EPLATE), I = m3(R, 0.500, 8.00), mode = R.i(0, 2), t, mass, mol;
    var given = ' (' + m[0] + ': ' + m[3] + ' g/mol)';
    if (mode === 0) {
      t = R.p([10.0, 15.0, 20.0, 25.0, 30.0, 45.0, 60.0, 90.0]); mol = I * t * 60 / 96485; mass = mol / m[2] * m[3];
      return num(nid('fa'), 'h22', 'A current of ' + sig(I, 3) + ' A runs for ' + t.toFixed(1) + ' min through a ' + m[1] + ' solution. What mass of ' + m[0] + ' is deposited, in g?' + given + ' Give 3 significant figures.', sig(mass, 3),
        'Q = It (t in seconds), mol e⁻ = Q/F, then divide by the ' + m[2] + ' electron' + (m[2] > 1 ? 's' : '') + ' each ' + m[0] + ' ion takes.',
        'Q = ' + sig(I, 3) + ' × ' + t * 60 + ' s = ' + sig(I * t * 60, 4) + ' C. mol e⁻ = ' + sig(I * t * 60, 4) + ' / 96485 = ' + sig(mol, 4) + '. mol ' + m[0] + ' = ' + sig(mol / m[2], 4) + ', × ' + m[3] + ' g/mol = ' + sig(mass, 3) + ' g.', null, null,
        { sf: 3, unit: 'g', chk: { f: 'far', I: I, t: t * 60, z: m[2], M: m[3], ask: 'm' } });
    }
    if (mode === 1) {
      mass = m3(R, 0.200, 9.00); mol = mass / m[3] * m[2]; t = mol * 96485 / I / 60;
      return num(nid('fa'), 'h22', 'How long does it take to deposit ' + sig(mass, 3) + ' g of ' + m[0] + ' from a ' + m[1] + ' solution with a current of ' + sig(I, 3) + ' A, in minutes?' + given + ' Give 3 significant figures.', sig(t, 3),
        'mol e⁻ = (mass ÷ M) × ' + m[2] + ', then t = (mol e⁻ × F) ÷ I.',
        'mol e⁻ = ' + sig(mass, 3) + ' / ' + m[3] + ' × ' + m[2] + ' = ' + sig(mol, 4) + '. t = ' + sig(mol, 4) + ' × 96485 / ' + sig(I, 3) + ' = ' + sig(mol * 96485 / I, 4) + ' s = ' + sig(t, 3) + ' min.', null, null,
        { sf: 3, unit: 'min', chk: { f: 'far', I: I, m: mass, z: m[2], M: m[3], ask: 't' } });
    }
    t = R.p([20.0, 30.0, 40.0, 60.0]);
    var theo = I * t * 60 / 96485 / m[2] * m[3], act = Number(sig(theo * R.f(0.70, 0.97, 2), 3)), eff = act / theo * 100;
    return num(nid('fa'), 'h22', 'A current of ' + sig(I, 3) + ' A runs for ' + t.toFixed(1) + ' min through a ' + m[1] + ' solution and deposits ' + sig(act, 3) + ' g of ' + m[0] + '. What is the current efficiency, in %?' + given + ' Give 3 significant figures.', sig(eff, 3),
      'η = actual mass ÷ theoretical mass × 100%.',
      'Theoretical mass = ' + sig(I, 3) + ' × ' + t * 60 + ' / 96485 / ' + m[2] + ' × ' + m[3] + ' = ' + sig(theo, 4) + ' g. η = ' + sig(act, 3) + ' / ' + sig(theo, 4) + ' × 100% = ' + sig(eff, 3) + '%.', null, null,
      { sf: 3, unit: '%', chk: { f: 'far', I: I, t: t * 60, z: m[2], M: m[3], act: act, ask: 'e' } });
  } }
];

/* ==================== MATH 116 ==================== */
function poly(cs, v) { /* cs: [[coef, power]] */
  var s = '';
  cs.forEach(function (t) {
    var c = t[0], p = t[1]; if (!c) return;
    var a = Math.abs(c), sign = c < 0 ? (s ? ' − ' : '−') : (s ? ' + ' : '');
    var body = p === 0 ? String(a) : (a === 1 ? '' : a) + (v || 'x') + (p === 1 ? '' : '<sup>' + p + '</sup>');
    s += sign + body;
  });
  return s || '0';
}
function lin(k) { return poly([[1, 1], [-k, 0]]); }
var TRIPS = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]];
course('math116').gens = [
  { t: 'k8', make: function (R) {
    var a = R.nz(-5, 5), b = R.nz(-6, 6), v = R.i(0, 2), q, ans, why;
    if (b === a) b = a + 1;
    if (v === 0) { q = '#lim{x→' + minus(a) + '} #frac{' + poly([[1, 2], [-(a + b), 1], [a * b, 0]]) + '}{' + poly([[1, 1], [-a, 0]]) + '}'; ans = String(a - b); why = 'Factor: (' + lin(a) + ')(' + lin(b) + ') / (' + lin(a) + ') = ' + lin(b) + ' → ' + minus(a - b) + '.'; }
    else if (v === 1) { q = '#lim{x→' + minus(a) + '} #frac{x<sup>3</sup> ' + (a * a * a < 0 ? '+ ' + (-a * a * a) : '− ' + a * a * a) + '}{' + poly([[1, 1], [-a, 0]]) + '}'; ans = String(3 * a * a); why = 'Difference of cubes: x³ − a³ = (x − a)(x² + ax + a²). Cancel and substitute: 3a² = ' + 3 * a * a + '.'; }
    else { q = '#lim{x→' + minus(a) + '} #frac{' + poly([[1, 2], [-a * a, 0]]) + '}{' + poly([[1, 2], [-(a + b), 1], [a * b, 0]]) + '}'; ans = frac(2 * a, a - b); why = '(' + lin(a) + ')(' + lin(-a) + ') / ((' + lin(a) + ')(' + lin(b) + ')) = (' + lin(-a) + ')/(' + lin(b) + ') → ' + fracHTML(2 * a, a - b) + '.'; }
    var F = v === 0 ? function (x) { return (x * x - (a + b) * x + a * b) / (x - a); } : v === 1 ? function (x) { return (x * x * x - a * a * a) / (x - a); } : function (x) { return (x * x - a * a) / (x * x - (a + b) * x + a * b); };
    return num(nid('lf'), 'k8', 'Evaluate ' + q + '.', ans, 'Direct substitution gives 0/0. Factor and cancel.', why, null, null, { lim: true, chk: { f: F, at: a } });
  } },
  { t: 'k8', make: function (R) {
    var p = R.nz(-6, 6), r = R.nz(1, 6), s = R.i(-5, 5), q2 = R.i(-9, 9), v = R.i(0, 1), dir = R.chance(0.5) ? '∞' : '−∞';
    if (v === 0) return num(nid('li'), 'k8', 'Evaluate #lim{x→' + dir + '} #frac{' + poly([[p, 2], [q2, 0]]) + '}{' + poly([[r, 2], [s, 1]]) + '}.', frac(p, r), 'Divide top and bottom by x².', 'The x² terms dominate: ' + p + '/' + r + ' = ' + fracHTML(p, r) + '.', null, null, { lim: true, chk: { f: function (x) { return (p * x * x + q2) / (r * x * x + s * x); }, at: dir === '∞' ? 1e7 : -1e7, inf: true } });
    var a = R.nz(-6, 6), c = R.i(1, 5), d = R.i(1, 9), sgn = dir === '∞' ? 1 : -1, e0 = R.i(-5, 5);
    return num(nid('lsq'), 'k8', 'Evaluate #lim{x→' + dir + '} #frac{' + poly([[a, 1], [e0, 0]]) + '}{#sqrt{' + c * c + 'x<sup>2</sup> + ' + d + '}}.', frac(sgn * a, c),
      '√(x²) = |x|, which is ' + (sgn > 0 ? 'x' : '−x') + ' here.', 'Divide by |x|: the top → ' + (sgn > 0 ? a : -a) + ' and the bottom → √' + c * c + ' = ' + c + '. Limit ' + fracHTML(sgn * a, c) + '.', null, null, { lim: true, chk: { f: function (x) { return (a * x + e0) / Math.sqrt(c * c * x * x + d); }, at: sgn * 1e7, inf: true } });
  } },
  { t: 'k8', make: function (R) {
    var k = R.nz(1, 7), m = R.nz(1, 7), v = R.i(0, 2), q, ans, why;
    if (v === 0) { q = '#frac{sin(' + k + 'x)}{' + m + 'x}'; ans = frac(k, m); why = '(' + k + '/' + m + ') · sin(' + k + 'x)/(' + k + 'x) → ' + fracHTML(k, m) + '.'; }
    else if (v === 1) { q = '#frac{tan(' + k + 'x)}{' + m + 'x}'; ans = frac(k, m); why = 'tan(' + k + 'x) = sin(' + k + 'x)/cos(' + k + 'x), and cos → 1. Limit ' + fracHTML(k, m) + '.'; }
    else { q = '#frac{1 − cos(' + k + 'x)}{x<sup>2</sup>}'; ans = frac(k * k, 2); why = 'Multiply by 1 + cos(' + k + 'x): sin²(' + k + 'x)/(x²(1 + cos(' + k + 'x))) → ' + k * k + ' · 1/2 = ' + fracHTML(k * k, 2) + '.'; }
    var F2 = v === 0 ? function (x) { return Math.sin(k * x) / (m * x); } : v === 1 ? function (x) { return Math.tan(k * x) / (m * x); } : function (x) { return (1 - Math.cos(k * x)) / (x * x); };
    return num(nid('ltr'), 'k8', 'Evaluate #lim{x→0} ' + q + '.', ans, 'Use sin(u)/u → 1 as u → 0.', why, null, null, { lim: true, chk: { f: F2, at: 0 } });
  } },
  { t: 'k8', make: function (R) {
    var a = R.i(-4, 8), sq = R.i(2, 5), c = sq * sq - a, inner = poly([[1, 1], [c, 0]]);
    return num(nid('lcj'), 'k8', 'Evaluate #lim{x→' + minus(a) + '} #frac{#sqrt{' + inner + '} − ' + sq + '}{' + lin(a) + '}.', frac(1, 2 * sq),
      'Multiply top and bottom by the conjugate √(' + inner + ') + ' + sq + '.', 'The top becomes (' + inner + ') − ' + sq * sq + ' = ' + lin(a) + ', which cancels with the bottom. What is left is 1/(√(' + inner + ') + ' + sq + ') → 1/' + 2 * sq + '.', null, null, { lim: true, chk: { f: function (x) { return (Math.sqrt(x + c) - sq) / (x - a); }, at: a } });
  } },
  { t: 'k8', make: function (R) {
    var a = R.nz(-5, 5);
    return num(nid('labs'), 'k8', 'Evaluate #lim{x→' + minus(a) + '} #frac{x<sup>2</sup> − ' + a * a + '}{|' + lin(a) + '|}.', 'dne',
      'Check each side: |' + lin(a) + '| = ' + lin(a) + ' on the right and −(' + lin(a) + ') on the left.', 'From the right the expression is ' + lin(-a) + ' → ' + minus(2 * a) + '. From the left it is −(' + lin(-a) + ') → ' + minus(-2 * a) + '. They differ, so the limit does not exist.', null, null, { lim: true, chk: { f: function (x) { return (x * x - a * a) / Math.abs(x - a); }, at: a } });
  } },
  { t: 'k10', make: function (R) {
    var a = R.nz(-4, 4), n = R.i(2, 5), b = R.nz(-6, 6), m = R.i(1, n - 1), c = R.i(-9, 9), x0 = R.i(-2, 2);
    var d = a * n * Math.pow(x0, n - 1) + b * m * Math.pow(x0, m - 1);
    return num(nid('dp'), 'k10', 'If f(x) = ' + poly([[a, n], [b, m], [c, 0]]) + ', what is f′(' + minus(x0) + ')?', String(d), 'Power rule term by term.',
      'f′(x) = ' + poly([[a * n, n - 1], [b * m, m - 1]]) + '. At x = ' + minus(x0) + ': ' + d + '.', null, null, { chk: { d: function (x) { return a * Math.pow(x, n) + b * Math.pow(x, m) + c; }, at: x0 } });
  } },
  { t: 'k10', make: function (R) {
    var a = R.nz(-4, 4), b = R.nz(-5, 5), c = R.nz(-5, 5), d = R.nz(-5, 5), x0 = R.i(-2, 3);
    if (c * x0 + d === 0) d += 1;
    if (a * d - b * c === 0) b += 1;
    return num(nid('dq'), 'k10', 'If f(x) = #frac{' + poly([[a, 1], [b, 0]]) + '}{' + poly([[c, 1], [d, 0]]) + '}, what is f′(' + minus(x0) + ')?', frac(a * d - b * c, (c * x0 + d) * (c * x0 + d)),
      'Quotient rule: (top′·bottom − top·bottom′)/bottom².', 'f′(x) = (' + a + '(' + poly([[c, 1], [d, 0]]) + ') − (' + c + ')(' + poly([[a, 1], [b, 0]]) + '))/(' + poly([[c, 1], [d, 0]]) + ')² = ' + minus(a * d - b * c) + '/(' + poly([[c, 1], [d, 0]]) + ')². At ' + minus(x0) + ': ' + fracHTML(a * d - b * c, (c * x0 + d) * (c * x0 + d)) + '.', null, null, { chk: { d: function (x) { return (a * x + b) / (c * x + d); }, at: x0 } });
  } },
  { t: 'k10', make: function (R) {
    var a = R.nz(-3, 3), b = R.nz(-4, 4), n = R.i(2, 5), x0 = R.i(-1, 2);
    var d = n * Math.pow(a * x0 + b, n - 1) * a;
    return num(nid('dc'), 'k10', 'If f(x) = (' + poly([[a, 1], [b, 0]]) + ')<sup>' + n + '</sup>, what is f′(' + minus(x0) + ')?', String(d), 'Chain rule.', 'f′(x) = ' + n + '(' + poly([[a, 1], [b, 0]]) + ')<sup>' + (n - 1) + '</sup> · ' + a + '. At ' + minus(x0) + ': ' + n + '(' + (a * x0 + b) + ')<sup>' + (n - 1) + '</sup>(' + a + ') = ' + d + '.', null, null, { chk: { d: function (x) { return Math.pow(a * x + b, n); }, at: x0 } });
  } },
  { t: 'k10', make: function (R) {
    var tr = R.p(TRIPS), sx = R.sg(), sy = R.sg(), p = tr[0] * sx, q = tr[1] * sy;
    if (R.chance(0.5)) { var t = p; p = q; q = t; }
    return num(nid('dimp'), 'k10', 'Find the slope of the tangent line to x<sup>2</sup> + y<sup>2</sup> = ' + tr[2] * tr[2] + ' at (' + minus(p) + ', ' + minus(q) + ').', frac(-p, q),
      'Differentiate implicitly: 2x + 2y y′ = 0.', 'y′ = −x/y = −(' + p + ')/(' + q + ') = ' + fracHTML(-p, q) + '.', null, null, { chk: { d: function (x) { return Math.sign(q) * Math.sqrt(tr[2] * tr[2] - x * x); }, at: p } });
  } },
  { t: 'k10', make: function (R) {
    var b = R.i(-6, 6), c = R.i(-9, 9), x0 = R.i(-3, 3), m = 2 * x0 + b, y0 = x0 * x0 + b * x0 + c, bb = y0 - m * x0;
    return multi(nid('tl'), 'k10', 'Find the tangent line to y = ' + poly([[1, 2], [b, 1], [c, 0]]) + ' at x = ' + minus(x0) + ', in the form y = mx + b.', [
      { ask: 'Find m.', ans: String(m), hint: 'm = y′(' + minus(x0) + ').', why: 'y′ = 2x + ' + b + ', so m = ' + m + '.' },
      { ask: 'Find b.', ans: String(bb), hint: 'The line passes through (' + minus(x0) + ', y(' + minus(x0) + ')).', why: 'y(' + minus(x0) + ') = ' + y0 + '. b = ' + y0 + ' − (' + m + ')(' + x0 + ') = ' + bb + '.' }
    ], 'deriv', { chk: { tl: function (x) { return x * x + b * x + c; }, at: x0 } });
  } },
  { t: 'k2', make: function (R) {
    var a, b, c, d;
    do { a = R.nz(-4, 4); b = R.i(-5, 5); c = R.nz(-3, 3); d = R.i(-5, 5); } while (a * d - b * c === 0);
    var pts = [-3.5, -1.5, 0.5, 1.7, 2.9, 4.3, 6.1].filter(function (x) { return Math.abs(c * x - a) > 0.3; });
    return num(nid('inv'), 'k2', 'Let f(x) = #frac{' + poly([[a, 1], [b, 0]]) + '}{' + poly([[c, 1], [d, 0]]) + '}. Find f<sup>−1</sup>(x).', '(' + b + '-(' + d + ')*x)/((' + c + ')*x-(' + a + '))',
      'Write y = f(x) and solve for x.', 'y(' + poly([[c, 1], [d, 0]]) + ') = ' + poly([[a, 1], [b, 0]]) + ' gives x(' + poly([[c, 1], [-a, 0]], 'y') + ') = ' + poly([[-d, 1], [b, 0]], 'y') + ', so f<sup>−1</sup>(x) = (' + poly([[-d, 1], [b, 0]]) + ')/(' + poly([[c, 1], [-a, 0]]) + ').', null, null, { kind: 'expr', pts: pts, chk: { inv: function (x) { return (a * x + b) / (c * x + d); } } });
  } },
  { t: 'k2', make: function (R) {
    var a = R.nz(-4, 4), b = R.i(-5, 5), c = R.i(-5, 5), k = R.i(-3, 3);
    var fg = a * (k * k + c) + b, gf = (a * k + b) * (a * k + b) + c;
    return num(nid('comp'), 'k2', 'Let f(x) = ' + poly([[a, 1], [b, 0]]) + ' and g(x) = ' + poly([[1, 2], [c, 0]]) + '. Compute (f∘g)(' + minus(k) + ') − (g∘f)(' + minus(k) + ').', String(fg - gf),
      'Do the inside function first each time.', '(f∘g)(' + minus(k) + ') = f(' + (k * k + c) + ') = ' + fg + '. (g∘f)(' + minus(k) + ') = g(' + (a * k + b) + ') = ' + gf + '. Difference ' + (fg - gf) + '.');
  } },
  { t: 'k6', make: function (R) {
    var ph = R.p([[1, 6], [1, 4], [1, 3], [2, 3], [3, 4], [5, 6], [-1, 6], [-1, 4], [-1, 3], [-2, 3], [-3, 4], [-5, 6]]), k = R.i(1, 3), w = R.i(1, 4);
    var quarter = ph[1] === 4, phi = ph[0] * Math.PI / ph[1], A, B, As, Bs, Cs, Ca;
    function sgnStr(v, mag, first) { return (v < 0 ? (first ? '−' : ' − ') : (first ? '' : ' + ')) + mag; }
    if (quarter) { A = Math.sign(Math.cos(phi)) * k; B = Math.sign(Math.sin(phi)) * k; As = k === 1 ? '' : String(k); Bs = As; Cs = (k === 1 ? '' : k) + '√2'; Ca = (k === 1 ? '' : k + '*') + 'sqrt(2)'; }
    else {
      var c6 = Math.cos(phi) * 2, s6 = Math.sin(phi) * 2; /* one of these is ±√3, the other ±1 */
      A = c6 * k; B = s6 * k;
      function mag(v) { return Math.abs(Math.abs(v) - Math.sqrt(3)) < 1e-9 ? (k === 1 ? '' : k) + '√3' : (k === 1 ? '' : String(k)); }
      As = mag(c6); Bs = mag(s6); Cs = String(2 * k); Ca = String(2 * k);
    }
    var wx = (w === 1 ? '' : w) + 'x', phS = (ph[0] < 0 ? '-' : '') + (Math.abs(ph[0]) === 1 ? '' : Math.abs(ph[0])) + 'pi/' + ph[1];
    var q = 'Write f(x) = ' + sgnStr(A, As, true) + ' sin(' + wx + ')' + sgnStr(B, Bs, false) + ' cos(' + wx + ') as C sin(' + wx + ' + φ), with C &gt; 0 and −π &lt; φ ≤ π.';
    return multi(nid('gs'), 'k6', q, [
      { ask: 'Find C.', ans: Ca, hint: 'C = √(A² + B²), where A and B are the coefficients of sin and cos.', why: 'C = √(' + sig(A * A, 3) + ' + ' + sig(B * B, 3) + ') = ' + Cs + '.' },
      { ask: 'Find φ. Exact forms like 5pi/6 are fine.', ans: phS, chkAB: [A, B, w], hint: 'C cos φ = coefficient of sin and C sin φ = coefficient of cos. Check the quadrant.', why: 'cos φ = ' + (A < 0 ? '−' : '') + (quarter ? '√2/2' : (Math.abs(Math.abs(A / k) - Math.sqrt(3)) < 1e-9 ? '√3/2' : '1/2')) + ' and sin φ = ' + (B < 0 ? '−' : '') + (quarter ? '√2/2' : (Math.abs(Math.abs(B / k) - Math.sqrt(3)) < 1e-9 ? '√3/2' : '1/2')) + ', so φ = ' + phS.replace('pi', 'π').replace('-', '−') + '.' }
    ], 'trig');
  } },
  { t: 'k6', make: function (R) {
    var tr = R.p(TRIPS), v = R.i(0, 2), p = tr[0], q = tr[1], h = tr[2], s, ans, why;
    if (R.chance(0.5)) { var t = p; p = q; q = t; }
    if (v === 0) { s = 'cos(tan<sup>−1</sup>(' + p + '/' + q + '))'; ans = frac(q, h); why = 'Opposite ' + p + ', adjacent ' + q + ', hypotenuse ' + h + '. cos = ' + q + '/' + h + '.'; }
    else if (v === 1) { s = 'sin(cos<sup>−1</sup>(' + q + '/' + h + '))'; ans = frac(p, h); why = 'Adjacent ' + q + ', hypotenuse ' + h + ', so opposite = ' + p + '. sin = ' + p + '/' + h + '.'; }
    else { s = 'tan(sin<sup>−1</sup>(' + p + '/' + h + '))'; ans = frac(p, q); why = 'Opposite ' + p + ', hypotenuse ' + h + ', so adjacent = ' + q + '. tan = ' + p + '/' + q + '.'; }
    var val = v === 0 ? Math.cos(Math.atan(p / q)) : v === 1 ? Math.sin(Math.acos(q / h)) : Math.tan(Math.asin(p / h));
    return num(nid('it'), 'k6', 'Find the exact value of ' + s + '.', ans, 'Draw the right triangle.', why, null, null, { chk: { val: val } });
  } },
  { t: 'k5', make: function (R) {
    var base = R.p([2, 3, 5, 10]), p = R.i(1, 4), q = R.i(1, 3), r = (p + q) * R.i(1, 3);
    var ex = r / (p + q);
    return num(nid('lg'), 'k5', 'Solve log<sub>' + base + '</sub>(x<sup>' + p + '</sup>) + log<sub>' + base + '</sub>(x<sup>' + q + '</sup>) = ' + r + ' for x &gt; 0.', String(Math.pow(base, ex)),
      'Combine: (' + p + ' + ' + q + ')·log<sub>' + base + '</sub>x.', (p + q) + ' log<sub>' + base + '</sub>x = ' + r + ', so log<sub>' + base + '</sub>x = ' + ex + ' and x = ' + base + '<sup>' + ex + '</sup> = ' + Math.pow(base, ex) + '.', null, null, { chk: { root: function (x) { return Math.log(Math.pow(x, p)) / Math.log(base) + Math.log(Math.pow(x, q)) / Math.log(base) - r; } } });
  } },
  { t: 'k4', make: function (R) {
    var a = R.i(-6, 6), b = R.i(1, 6), strict = R.chance(0.5), n = strict ? 2 * b - 1 : 2 * b + 1;
    return num(nid('abs'), 'k4', 'How many integers x satisfy |' + lin(a) + '| ' + (strict ? '&lt;' : '≤') + ' ' + b + '?', String(n),
      'Turn it into a double inequality.', minus(a - b) + ' ' + (strict ? '&lt;' : '≤') + ' x ' + (strict ? '&lt;' : '≤') + ' ' + minus(a + b) + ' contains ' + n + ' integers.');
  } },
  { t: 'k7', make: function (R) {
    var a = R.i(-3, 3), b = R.i(-2, 2), c = R.nz(-4, 4), d = R.i(0, 4), e = R.i(-3, 3), xs = R.sh([-3, -2, -1, 0, 1, 2, 3, 4]).slice(0, 3);
    function f(x) { return (x + a) * (x - b >= 0 ? 1 : 0) + c * (x - d >= 0 ? 1 : 0) + e; }
    var tot = xs.reduce(function (s, x) { return s + f(x); }, 0);
    return num(nid('hv'), 'k7', 'Let h be the Heaviside function (h(t) = 1 for t ≥ 0, else 0) and f(x) = (' + lin(-a) + ')h(' + lin(b) + ') ' + (c < 0 ? '− ' + (-c) : '+ ' + c) + 'h(' + lin(d) + ')' + (e ? (e < 0 ? ' − ' + (-e) : ' + ' + e) : '') + '. Compute ' + xs.map(function (x) { return 'f(' + minus(x) + ')'; }).join(' + ') + '.', String(tot),
      'Evaluate each h term as 0 or 1 at each point.', xs.map(function (x) { return 'f(' + minus(x) + ') = ' + f(x); }).join(', ') + '. Total ' + tot + '.');
  } },
  { t: 'k9', make: function (R) {
    var a = R.i(-2, 3), m = R.i(-5, 5), c = R.i(-6, 6), r = a * a + m;
    if (a === 0) a = 1;
    return num(nid('cont'), 'k9', 'Find k so that f is continuous at x = ' + minus(a) + ':<br>f(x) = #cases{kx ' + (c < 0 ? '− ' + (-c) : '+ ' + c) + ' | x &lt; ' + minus(a) + ';; x<sup>2</sup> ' + (m < 0 ? '− ' + (-m) : '+ ' + m) + ' | x ≥ ' + minus(a) + '}', frac(a * a + m - c, a),
      'Set the left-hand limit equal to f(' + minus(a) + ').', 'Right side: ' + minus(a) + '² + ' + m + ' = ' + (a * a + m) + '. Left side: ' + minus(a) + 'k + ' + c + '. So k = (' + (a * a + m) + ' − ' + c + ')/' + a + ' = ' + fracHTML(a * a + m - c, a) + '.', null, null, { chk: { cont: function (k, x) { return x < a ? k * x + c : x * x + m; }, at: a } });
  } },
  { t: 'k3', make: function (R) {
    var B = [['x', 1], ['x<sup>2</sup>', 0], ['x<sup>3</sup>', 1], ['sin x', 1], ['cos x', 0], ['tan x', 1], ['|x|', 0], ['sinh x', 1], ['cosh x', 0], ['e<sup>x<sup>2</sup></sup>', 0], ['x<sup>4</sup>', 0]];
    var a = R.p(B), b = R.p(B.filter(function (t) { return t !== a; })), prod = R.chance(0.6), par;
    if (prod) par = (a[1] + b[1]) % 2 === 1 ? 'Odd' : 'Even';
    else par = a[1] === b[1] ? (a[1] ? 'Odd' : 'Even') : 'Neither';
    var f = prod ? a[0] + ' · ' + b[0] : a[0] + ' + ' + b[0];
    return gmc(R, nid('par'), 'k3', 'Is f(x) = ' + f + ' even, odd, or neither?', par, ['Even', 'Odd', 'Neither'].filter(function (x) { return x !== par; }),
      prod ? 'Odd × odd and even × even give even; odd × even gives odd. ' + a[0] + ' is ' + (a[1] ? 'odd' : 'even') + ' and ' + b[0] + ' is ' + (b[1] ? 'odd' : 'even') + '.' : 'A sum of two odd functions is odd and two even is even, but odd + even is neither. ' + a[0] + ' is ' + (a[1] ? 'odd' : 'even') + ' and ' + b[0] + ' is ' + (b[1] ? 'odd' : 'even') + '.');
  } },
  /* ---------- applications of derivatives and integrals ---------- */
  { t: 'k11', make: function (R) {
    var a = R.p([2, 3, 5, 6, 7, 10, 11]), x0 = Math.round(Math.sqrt(a)) || 1, f = x0 * x0 - a, fp = 2 * x0;
    var x1n = x0 * fp - f, x1 = frac(x1n, fp);
    return num(nid('nw'), 'k11', 'Use Newton\'s method on f(x) = x² − ' + a + ' with x<sub>0</sub> = ' + x0 + '. What is x<sub>1</sub>? Give an exact fraction.', x1,
      'x<sub>1</sub> = x<sub>0</sub> − f(x<sub>0</sub>)/f′(x<sub>0</sub>), with f′(x) = 2x.',
      'f(' + x0 + ') = ' + f + ' and f′(' + x0 + ') = ' + fp + ', so x<sub>1</sub> = ' + x0 + ' − (' + f + ')/' + fp + ' = ' + x1 + ' ≈ ' + (x1n / fp).toFixed(4) + '. (√' + a + ' ≈ ' + Math.sqrt(a).toFixed(4) + '.)', null, null,
      { chk: { val: (function () { var h = 1e-6, F = function (x) { return x * x - a; }; return x0 - F(x0) / ((F(x0 + h) - F(x0 - h)) / (2 * h)); })() } });
  } },
  { t: 'k18', make: function (R) {
    var c = R.nz(-2, 3), d = R.i(-3, 4), a = R.i(-1, 2), w = R.p([1, 2]), n = R.p([2, 3, 4]), b = a + w * n / 2, side = R.p(['left', 'right', 'midpoint']);
    /* exact sum with Δx = w/2: work in quarters so the midpoints stay integers */
    var num4 = 0, pts = [];
    for (var i = 0; i < n; i++) { var x4 = 4 * a + 2 * w * i + (side === 'left' ? 0 : side === 'right' ? 2 * w : w); pts.push(frac(x4, 4)); num4 += c * x4 * x4 + 16 * d; }
    var S = frac(num4 * w, 32);   /* Δx = w/2, f(x) = c x² + d = (c x4² + 16d)/16 */
    var fstr = (c === 1 ? '' : c === -1 ? '−' : minus(String(c))) + 'x²' + (d ? (d < 0 ? ' − ' + (-d) : ' + ' + d) : '');
    return num(nid('rs'), 'k18', 'Compute the ' + side + ' Riemann sum with n = ' + n + ' for f(x) = ' + fstr + ' on [' + minus(String(a)) + ', ' + minus(frac(2 * b, 2)) + '].', S,
      'Δx = (b − a)/n. Add f at each ' + (side === 'midpoint' ? 'midpoint' : side + ' endpoint') + ', then multiply by Δx.',
      'Δx = ' + frac(w, 2) + '. The sample points are ' + pts.map(minus).join(', ') + '. Sum of f at those points, times Δx, is ' + minus(S) + '.', null, null,
      { chk: { val: (function () { var dx = (b - a) / n, s = 0; for (var j = 0; j < n; j++) { var x = a + j * dx + (side === 'left' ? 0 : side === 'right' ? dx : dx / 2); s += c * x * x + d; } return s * dx; })() } });
  } },
  { t: 'k18', make: function (R) {   /* standard sums: Σ (a i² + b i + c) */
    var N = R.i(5, 25), a = R.i(0, 2), b = R.i(-3, 4), c = R.i(-5, 6);
    if (!a && !b) b = R.nz(1, 4);
    var s1 = N * (N + 1) / 2, s2 = N * (N + 1) * (2 * N + 1) / 6, val = a * s2 + b * s1 + c * N;
    var terms = [], show = [];
    if (a) { terms.push((a === 1 ? '' : a) + 'i²'); show.push(a + ' × ' + s2); }
    if (b) { terms.push((terms.length ? (b < 0 ? ' − ' : ' + ') : (b < 0 ? '−' : '')) + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'i'); show.push(minus(String(b)) + ' × ' + s1); }
    if (c) { terms.push((c < 0 ? ' − ' : ' + ') + Math.abs(c)); show.push(minus(String(c)) + ' × ' + N); }
    return num(nid('ss'), 'k18', 'Evaluate Σ<sub>i=1</sub><sup>' + N + '</sup> (' + terms.join('') + ').', String(val),
      'Split the sum, then use Σ<sub>i=1</sub><sup>n</sup> 1 = n, Σ<sub>i=1</sub><sup>n</sup> i = n(n + 1)/2 and Σ<sub>i=1</sub><sup>n</sup> i² = n(n + 1)(2n + 1)/6.',
      'With n = ' + N + ': Σi = ' + s1 + ' and Σi² = ' + s2 + '. So the sum is ' + show.join(' + ').replace(/\+ −/g, '− ') + ' = ' + minus(String(val)) + '.', null, null,
      { chk: { val: (function () { var t = 0; for (var i = 1; i <= N; i++) t += a * i * i + b * i + c; return t; })() } });
  } },
  { t: 'k19', make: function (R) {
    var p = [R.i(-3, 3), R.i(-4, 4), R.nz(-3, 3)], a = R.i(-2, 1), b = a + R.i(1, 3);   /* f(x) = p0 + p1 x + p2 x² (times 3 so the result is tidy) */
    var F = function (x) { return 6 * p[0] * x + 3 * p[1] * x * x + 2 * p[2] * x * x * x; };   /* 6 × antiderivative */
    var val = frac(F(b) - F(a), 6);
    var terms = [[p[2], 'x²'], [p[1], 'x'], [p[0], '']].filter(function (t) { return t[0]; }).map(function (t, i) { var v = t[0], s = (Math.abs(v) === 1 && t[1] ? '' : Math.abs(v)) + t[1]; return (i === 0 ? (v < 0 ? '−' : '') : (v < 0 ? ' − ' : ' + ')) + s; }).join('');
    return num(nid('fi'), 'k19', 'Evaluate ∫<sub>' + minus(String(a)) + '</sub><sup>' + minus(String(b)) + '</sup> (' + terms + ') dx.', val,
      'Find an antiderivative term by term, then subtract: F(b) − F(a).',
      'An antiderivative is ' + (p[2] ? frac(p[2], 3) + 'x³ ' : '') + (p[1] ? (p[1] > 0 ? '+ ' : '− ') + frac(Math.abs(p[1]), 2) + 'x² ' : '') + (p[0] ? (p[0] > 0 ? '+ ' : '− ') + Math.abs(p[0]) + 'x' : '') + '. F(' + b + ') − F(' + a + ') = ' + minus(val) + '.', null, null,
      { chk: { val: (function () { var f = function (x) { return p[0] + p[1] * x + p[2] * x * x; }, N = 200, h = (b - a) / N, s = f(a) + f(b); for (var j = 1; j < N; j++) s += (j % 2 ? 4 : 2) * f(a + j * h); return s * h / 3; })() } });
  } },
  { t: 'k16', make: function (R) {
    var a = R.nz(-4, 5), b = R.nz(-4, 5), kind = R.i(0, 2), q, ans, why, f;
    if (kind === 0) { q = '(e<sup>' + a + 'x</sup> − 1)/(' + b + 'x)'; ans = frac(a, b); f = function (x) { return (Math.exp(a * x) - 1) / (b * x); }; why = 'L\'H: ' + a + 'e<sup>' + a + 'x</sup>/' + b + ' → ' + minus(ans) + '.'; }
    else if (kind === 1) { q = 'sin(' + a + 'x)/(' + b + 'x)'; ans = frac(a, b); f = function (x) { return Math.sin(a * x) / (b * x); }; why = 'L\'H: ' + a + 'cos(' + a + 'x)/' + b + ' → ' + minus(ans) + '.'; }
    else { a = Math.abs(a); b = Math.abs(b); q = '(1 − cos(' + a + 'x))/(' + b + 'x²)'; ans = frac(a * a, 2 * b); f = function (x) { return (1 - Math.cos(a * x)) / (b * x * x); }; why = 'L\'H twice: ' + a + 'sin(' + a + 'x)/(' + 2 * b + 'x), then ' + a * a + 'cos(' + a + 'x)/' + 2 * b + ' → ' + ans + '.'; }
    q = q.replace(/\(1x\)/g, '(x)').replace(/\(1x²\)/g, '(x²)').replace(/\b1x\b/g, 'x');
    return num(nid('lh'), 'k16', 'Evaluate #lim{x → 0} ' + minus(q) + '.', ans, 'It is 0/0: differentiate the top and the bottom.', why, null, null, { chk: { f: f, at: 0 } });
  } },
  { t: 'k17', make: function (R) {
    var r = R.i(3, 12), dlt = R.nz(-3, 4), x = r * r + dlt, est = frac(2 * r * r + dlt, 2 * r);
    return num(nid('la'), 'k17', 'Use the linear approximation of √x at a = ' + r * r + ' to estimate √' + x + '. Give an exact fraction.', est,
      'L(x) = √a + (x − a)/(2√a).',
      'L(' + x + ') = ' + r + ' + (' + dlt + ')/' + 2 * r + ' = ' + est + ' ≈ ' + ((2 * r * r + dlt) / (2 * r)).toFixed(4) + '. The true value is ' + Math.sqrt(x).toFixed(4) + '.', null, null,
      { chk: { val: (function () { var h = 1e-6, a0 = r * r; return Math.sqrt(a0) + (Math.sqrt(a0 + h) - Math.sqrt(a0 - h)) / (2 * h) * dlt; })() } });
  } }
];

/* ==================== MTE 100 ==================== */
var CYCLE = ['Need', 'Synthesis', 'Ideation', 'Selection', 'Design', 'Analysis', 'Prototype', 'Validation'];
var HIER = ['Public welfare', 'Employer', 'Client', 'Colleagues', 'Subordinates', 'Yourself'];
var LW = [['Cutting plane line', 0.80], ['Object line', 0.60], ['Hidden line', 0.30], ['Centerline', 0.05], ['Dimension line', 0.05]];
var FK = [['F3', 'Object Snap'], ['F7', 'Grid display'], ['F8', 'Ortho mode'], ['F10', 'Polar Tracking'], ['F11', 'Object Snap Tracking'], ['F12', 'Dynamic Input'], ['F2', 'Command line history']];
course('mte100').gens = [
  { t: 'd9', make: function (R) {
    if (R.chance(0.5)) { var d = R.p([[3, 0.5], [4, 0.7], [5, 0.8], [6, 1], [8, 1.25], [10, 1.5], [12, 1.75], [16, 2]]), turns = R.i(4, 16), L = Number((turns * d[1]).toFixed(2));
      return num(nid('mt'), 'd9', 'How many full turns does an M' + d[0] + ' × ' + d[1] + ' screw need to advance ' + L + ' mm?', String(turns), 'Pitch is the advance per turn.', L + ' mm ÷ ' + d[1] + ' mm per turn = ' + turns + ' turns.'); }
    var u = R.p([['1/4', 20, 'UNC'], ['1/4', 28, 'UNF'], ['3/8', 16, 'UNC'], ['3/8', 24, 'UNF'], ['1/2', 13, 'UNC'], ['1/2', 20, 'UNF']]), inch = R.p([0.25, 0.5, 0.75, 1]), t2 = u[1] * inch;
    return num(nid('ut'), 'd9', 'How many turns move a ' + u[0] + '-' + u[1] + ' ' + u[2] + ' screw ' + inch + ' in deeper?', String(t2), u[1] + ' is threads per inch.', inch + ' in × ' + u[1] + ' threads/in = ' + t2 + ' turns.');
  } },
  { t: 'd10', make: function (R) {
    var n = R.p([2, 4, 5, 8, 10, 16, 20]), L = R.p([2.5, 4, 5, 6, 8, 10, 12, 20, 40, 80]), up = R.chance(0.25);
    var on = up ? L * n : L / n;
    return num(nid('sc'), 'd10', 'A drawing is plotted at ' + (up ? n + ':1' : '1:' + n) + '. How long does a ' + L + ' in edge appear on the paper, in inches?', String(on),
      up ? n + ':1 means the drawing is ' + n + ' times bigger than the part.' : '1:' + n + ' means the real part is ' + n + ' times bigger than the drawing.', (up ? L + ' × ' + n : L + ' ÷ ' + n) + ' = ' + on + ' in on paper. It is still dimensioned as ' + L + '.', null, null, { tol: 0.001 });
  } },
  { t: 'd10', make: function (R) {
    var x0 = R.i(-5, 5), y0 = R.i(-5, 5), L = R.i(2, 12), th = R.p([30, 45, 60, 90, 120, 135, 150, 180, 210, 270, 300]);
    var x = x0 + L * Math.cos(th * Math.PI / 180), y = y0 + L * Math.sin(th * Math.PI / 180);
    return multi(nid('pol'), 'd10', 'A line starts at (' + minus(x0) + ', ' + minus(y0) + ') and you type @' + L + '&lt;' + th + '.', [
      { ask: 'What is the x-coordinate of the end point? Give 3 decimal places.', ans: x.toFixed(3), tol: 0.0006, hint: 'x = x₀ + L cos θ.', why: minus(x0) + ' + ' + L + ' cos ' + th + '° = ' + minus(x.toFixed(3)) + '.' },
      { ask: 'What is the y-coordinate? Give 3 decimal places.', ans: y.toFixed(3), tol: 0.0006, hint: 'y = y₀ + L sin θ.', why: minus(y0) + ' + ' + L + ' sin ' + th + '° = ' + minus(y.toFixed(3)) + '.' }
    ], 'num');
  } },
  { t: 'd2', make: function (R) {
    var raw = [R.i(1, 5), R.i(1, 5), R.i(1, 5)], tot = raw[0] + raw[1] + raw[2], names = R.sh(['cost', 'mass', 'reliability', 'safety', 'looks', 'ease of assembly']).slice(0, 3);
    var sa = [R.i(3, 10), R.i(3, 10), R.i(3, 10)], score = (raw[0] * sa[0] + raw[1] * sa[1] + raw[2] * sa[2]) / tot;
    return num(nid('wdm'), 'd2', 'Raw weights: ' + names.map(function (n, i) { return n + ' ' + raw[i]; }).join(', ') + '. A design scores ' + sa.join(', ') + ' (out of 10) on those criteria. What is its weighted score? Give 2 decimal places.', score.toFixed(2),
      'Normalize each weight by dividing by the sum (' + tot + '), then take the weighted sum.', 'Normalized weights: ' + raw.map(function (w) { return (w / tot).toFixed(3); }).join(', ') + '. Score = ' + sa.map(function (s, i) { return (raw[i] / tot).toFixed(3) + '(' + s + ')'; }).join(' + ') + ' = ' + score.toFixed(2) + '.', null, null, { tol: 0.002 });
  } },
  { t: 'd9', make: function (R) {
    var whole = R.i(1, 40), n16 = R.i(1, 15), dec = whole + n16 / 16, g = gcd(n16, 16);
    var right = whole + ' ' + (n16 / g) + '/' + (16 / g) + ' in';
    function fr(k) { var gg = gcd(k, 16); return whole + ' ' + (k / gg) + '/' + (16 / gg) + ' in'; }
    return gmc(R, nid('tape'), 'd9', 'A tape measure reads in 1/16 in steps. How is ' + dec + ' in written on it?', right,
      [fr(n16 === 15 ? 14 : n16 + 1), fr(n16 === 1 ? 2 : n16 - 1), fr(Math.max(1, Math.min(15, Math.round((dec - whole) * 10))))], (dec - whole) + ' × 16 = ' + n16 + ', so ' + n16 + '/16 = ' + (n16 / g) + '/' + (16 / g) + '.');
  } },
  { t: 'd1', make: function (R) {
    var i = R.i(0, CYCLE.length - 2), after = R.chance(0.6);
    var right = after ? CYCLE[i + 1] : CYCLE[i], asked = after ? CYCLE[i] : CYCLE[i + 1];
    return gmc(R, nid('cyc'), 'd1', 'In the design cycle from lecture, which stage comes right ' + (after ? 'after ' : 'before ') + asked + '?', right, R.sh(CYCLE.filter(function (s) { return s !== right && s !== asked; })).slice(0, 3),
      'The order is ' + CYCLE.join(' → ') + '.');
  } },
  { t: 'd3', make: function (R) {
    var p = R.sh([0, 1, 2, 3, 4, 5]).slice(0, 2), hi = Math.min(p[0], p[1]);
    return gmc(R, nid('hier'), 'd3', 'Under the hierarchy of obligations in the Code of Ethics, which ranks higher: ' + HIER[p[0]].toLowerCase() + ' or ' + HIER[p[1]].toLowerCase() + '?', HIER[hi], [HIER[Math.max(p[0], p[1])], 'They rank equally'],
      'From the top: ' + HIER.join(', ') + '. Public welfare is paramount.');
  } },
  { t: 'd6', make: function (R) {
    var pr = R.sh(LW.filter(function (l, i) { return i < 4; })).slice(0, 2), heavy = pr[0][1] > pr[1][1] ? pr[0] : pr[1];
    return gmc(R, nid('lw'), 'd6', 'Which line is drawn heavier: a ' + pr[0][0].toLowerCase() + ' or a ' + pr[1][0].toLowerCase() + '?', heavy[0], [(heavy === pr[0] ? pr[1] : pr[0])[0], 'They are the same weight'],
      'From the slides: cutting plane 0.80 mm, object 0.60 mm, hidden 0.30 mm, center and dimension 0.05 mm.');
  } },
  { t: 'd10', make: function (R) {
    var k = R.p(FK);
    return gmc(R, nid('fk'), 'd10', 'In AutoCAD, what does ' + k[0] + ' toggle?', k[1], R.sh(FK.filter(function (x) { return x !== k; })).slice(0, 3).map(function (x) { return x[1]; }),
      FK.map(function (x) { return x[0] + ' is ' + x[1]; }).join('; ') + '.');
  } },
  /* ---------- tolerancing, GD&T, gears, PWM ---------- */
  { t: 'd11', make: function (R) {
    var nom = R.p([6, 8, 10, 12, 16, 20, 25, 30, 40, 50]), hlo = nom, hhi = nom + R.p([0.02, 0.03, 0.04, 0.05, 0.08, 0.10]);
    var gap = R.p([-0.06, -0.04, -0.03, -0.02, -0.01, 0.01, 0.02, 0.03, 0.05]), shi = +(nom - gap).toFixed(2), slo = +(shi - R.p([0.02, 0.03, 0.04, 0.05, 0.06])).toFixed(2);
    var cmin = +(hlo - shi).toFixed(2), cmax = +(hhi - slo).toFixed(2), kind = cmin >= 0 ? 'clearance' : cmax <= 0 ? 'interference' : 'transition';
    var f2 = function (v) { return minus(v.toFixed(2)); };
    return multi(nid('fit'), 'd11', 'A hole is ' + hlo.toFixed(2) + ' to ' + hhi.toFixed(2) + ' mm. The shaft is ' + slo.toFixed(2) + ' to ' + shi.toFixed(2) + ' mm. Clearance = hole − shaft, so interference shows up as a negative clearance.', [
      { ask: 'What is the minimum clearance, in mm?', ans: cmin.toFixed(2), tol: 1e-6, hint: 'Smallest hole minus largest shaft.', why: hlo.toFixed(2) + ' − ' + shi.toFixed(2) + ' = ' + f2(cmin) + ' mm.' },
      { ask: 'What is the maximum clearance, in mm?', ans: cmax.toFixed(2), tol: 1e-6, hint: 'Largest hole minus smallest shaft.', why: hhi.toFixed(2) + ' − ' + slo.toFixed(2) + ' = ' + f2(cmax) + ' mm. With a minimum of ' + f2(cmin) + ' and a maximum of ' + f2(cmax) + ', this is a ' + kind + ' fit.' }
    ], 'num', { chk: { f: 'fit', h: [hlo, hhi], s: [slo, shi] } });
  } },
  { t: 'd12', make: function (R) {
    var hole = R.chance(0.5), nom = R.p([6, 8, 10, 12, 16, 20]), tolS = R.p([0.1, 0.2, 0.3]), tz = R.p([0.05, 0.1, 0.15, 0.2]);
    var lo = hole ? nom : nom - tolS, hi = hole ? nom + tolS : nom, mmc = hole ? lo : hi;
    var act = +(lo + R.i(1, Math.round(tolS * 100) - 1) / 100).toFixed(2), bonus = +Math.abs(act - mmc).toFixed(2), tot = +(tz + bonus).toFixed(2);
    var what = hole ? 'hole' : 'pin', ctrl = hole ? 'position' : 'axis straightness';
    return num(nid('bon'), 'd12', 'A ' + what + ' is toleranced Ø' + lo.toFixed(2) + ' to Ø' + hi.toFixed(2) + ' mm, with a ' + ctrl + ' tolerance of Ø' + tz.toFixed(2) + ' at MMC. It is made at Ø' + act.toFixed(2) + '. How big is the tolerance zone now, in mm?', tot.toFixed(2),
      'MMC is the most-material size: smallest for a hole, largest for a pin. Bonus = how far the actual size is from MMC.',
      'MMC = Ø' + mmc.toFixed(2) + '. The ' + what + ' is ' + bonus.toFixed(2) + ' mm from it, so the zone is ' + tz.toFixed(2) + ' + ' + bonus.toFixed(2) + ' = Ø' + tot.toFixed(2) + '.', null, null, { tol: 1e-6, chk: { f: 'bonus', hole: hole, lo: lo, hi: hi, tz: tz, act: act } });
  } },
  { t: 'd14', make: function (R) {
    var a = R.p([10, 12, 15, 16, 20, 24]), k = R.p([2, 3, 4, 5]), b = a * k, rpm = R.p([600, 900, 1200, 1500, 1800, 2400, 3000, 3600]);
    if (R.chance(0.5)) {
      var c = R.p([10, 12, 15, 18, 20]), k2 = R.p([2, 3, 4]), d = c * k2, tot = k * k2;
      if (rpm % tot) rpm = tot * R.i(20, 150);
      return num(nid('gr2'), 'd14', 'A ' + a + '-tooth gear driven at ' + rpm + ' rpm turns a ' + b + '-tooth gear. A ' + c + '-tooth gear on that same shaft drives a ' + d + '-tooth gear. What is the output speed, in rpm?', String(rpm / tot),
        'Multiply the stage ratios (driven ÷ driver), then divide the input speed.',
        'Stage 1: ' + b + '/' + a + ' = ' + k + '. Stage 2: ' + d + '/' + c + ' = ' + k2 + '. Total ' + tot + ', so ' + rpm + ' ÷ ' + tot + ' = ' + rpm / tot + ' rpm.', null, null, { chk: { f: 'gear', z: [a, b, c, d], rpm: rpm } });
    }
    var T = R.p([0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 1.2, 1.5]), Tout = +(T * k).toFixed(3);
    return multi(nid('gr'), 'd14', 'A motor turning at ' + rpm + ' rpm with ' + T + ' N·m drives a ' + a + '-tooth gear, which meshes with a ' + b + '-tooth gear. Assume no losses.', [
      { ask: 'What is the output speed, in rpm?', ans: String(rpm / k), tol: 1e-6, hint: 'Ratio = driven teeth ÷ driver teeth.', why: b + '/' + a + ' = ' + k + ', so ' + rpm + ' ÷ ' + k + ' = ' + rpm / k + ' rpm.' },
      { ask: 'What is the output torque, in N·m?', ans: String(Tout), tol: 1e-6, hint: 'Power is constant, so torque goes up by the ratio.', why: T + ' × ' + k + ' = ' + Tout + ' N·m.' }
    ], 'num', { chk: { f: 'gear', z: [a, b], rpm: rpm, T: T } });
  } },
  { t: 'd15', make: function (R) {
    var V = R.p([5, 6, 7.2, 9, 12, 24]), per = R.p([4, 5, 8, 10, 20]), on = R.i(1, per - 1), duty = on / per, avg = +(V * duty).toFixed(3);
    if (R.chance(0.5)) return num(nid('pwm'), 'd15', 'A ' + V + ' V PWM signal is on for ' + on + ' ms of every ' + per + ' ms period. What average voltage does the motor see, in V?', String(avg),
      'Duty cycle = on time ÷ period.', 'Duty = ' + on + '/' + per + ' = ' + +(duty * 100).toFixed(1) + '%. ' + (+(duty).toFixed(4)) + ' × ' + V + ' = ' + avg + ' V.', null, null, { tol: 1e-6, chk: { f: 'pwm', V: V, on: on, per: per } });
    var pct = R.p([10, 20, 25, 30, 40, 50, 60, 75, 80, 90]), want = +(V * pct / 100).toFixed(3);
    return num(nid('pwm'), 'd15', 'A motor driver runs from ' + V + ' V. What PWM duty cycle, in %, gives the motor an average of ' + want + ' V?', String(pct),
      'Duty = average voltage ÷ supply voltage.', want + ' ÷ ' + V + ' = ' + pct / 100 + ', which is ' + pct + '%.', null, null, { tol: 1e-6, chk: { f: 'pwm', V: V, want: want } });
  } }
];
})();

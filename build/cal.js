/* ============================================================
   ACTIVITY CALENDAR: tap the Streak tile for a GitHub/LeetCode-style grid of every day.
   Each day is coloured by the course you practised most that day, stronger the more XP you earned.
   Tap a day to see that day's rings. Exam days are outlined in the course colour.
   ============================================================ */
function calDate(k) { var p = k.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
function calAdd(d, n) { var x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); return x; }
function calTotal(d) { var t = 0; COURSES.forEach(function (c) { t += d[c.id] || 0; }); return t; }
function calTop(d) { var best = null, bx = 0; COURSES.forEach(function (c) { var x = d[c.id] || 0; if (x > bx) { bx = x; best = c; } }); return best; }
function calLevel(t, g) { if (t <= 0) return 0; var r = t / g; return r <= 0.5 ? 1 : r <= 1.5 ? 2 : r <= 3 ? 3 : r <= 5 ? 4 : 5; }
function calExams() { var m = {}; COURSES.forEach(function (c) { if (c.exam && c.exam.at) { var k = dayKey(new Date(c.exam.at)); (m[k] = m[k] || []).push(c); } }); return m; }
function calStats() {
  var xd = G.xd || {}, keys = Object.keys(xd).filter(function (k) { return calTotal(xd[k]) > 0; }).sort();
  var best = null, bestX = 0, run = 0, longest = 0, prev = null;
  keys.forEach(function (k) {
    var t = calTotal(xd[k]); if (t > bestX) { bestX = t; best = k; }
    run = prev && dayKey(calAdd(calDate(prev), 1)) === k ? run + 1 : 1; prev = k; if (run > longest) longest = run;
  });
  return { days: keys.length, first: keys[0] || null, best: best, bestX: bestX, longest: Math.max(longest, G.streak || 0) };
}
function calRows(k) {
  var d = dayXP(k), g = d._g || xpGoal(), live = ringCourses();
  return sortedCourses().filter(function (c) { return live.indexOf(c) >= 0 || (d[c.id] || 0) > 0; })
    .map(function (c) { return { c: c, x: d[c.id] || 0, g: g, p: (d[c.id] || 0) / g, hue: c.hue }; });
}
function calDayHTML(k) {
  var rows = calRows(k), d = dayXP(k), t = calTotal(d), closed = rows.filter(function (r) { return r.x >= r.g; }).length;
  var dt = calDate(k), isToday = k === dayKey(), ex = calExams()[k] || [];
  var when = dt.toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric' });
  return '<div class="cal-rings">' + ringsSVG(rows, 120, 13, 2.6, 'rings cal-rg') + '</div>' +
    '<div class="cal-info"><h4>' + (isToday ? 'Today, ' : '') + when + '</h4>' +
    '<p class="cal-sum">' + (t ? t.toLocaleString('en-CA') + ' XP · ' + closed + ' of ' + rows.length + ' ring' + (rows.length === 1 ? '' : 's') + ' closed' : (dt > new Date() ? 'Still to come.' : 'No practice this day.')) + '</p>' +
    (ex.length ? '<p class="cal-ex">' + ex.map(function (c) { return '<span style="--c:' + (RINGC[c.hue] || RINGC.c1)[0] + '">' + esc(c.code) + ' ' + esc((c.exam.name || 'exam').toLowerCase()) + '</span>'; }).join('') + '</p>' : '') +
    '<ul class="cal-list">' + rows.map(function (r) {
      var col = (RINGC[r.hue] || RINGC.c1)[0];
      return '<li><i style="background:' + col + '"></i><span class="cal-c">' + esc(r.c.code) + '</span><span class="cal-x">' + r.x + '<small>/' + r.g + ' XP</small></span>' + (r.x >= r.g ? '<span class="cal-ok" aria-label="closed">✓</span>' : '<span class="cal-ok"></span>') + '</li>';
    }).join('') + '</ul></div>';
}
function showCalendar() {
  var xd = G.xd || {}, st = calStats(), g = xpGoal(), today = new Date(), tk = dayKey(today), exams = calExams();
  today = calDate(tk);
  var lastExam = today; Object.keys(exams).forEach(function (k) { var d = calDate(k); if (d > lastExam) lastExam = d; });
  var start = calAdd(today, -7 * 15); if (st.first && calDate(st.first) < start) start = calDate(st.first);
  start = calAdd(start, -start.getDay());                         /* back to Sunday */
  var end = calAdd(lastExam, 6 - lastExam.getDay());               /* forward to Saturday */
  var weeks = (Math.round((end - start) / 864e5) + 1) / 7, cells = '', months = '', lastM = -1;
  for (var w = 0; w < weeks; w++) {
    var wk = calAdd(start, w * 7), wkEnd = calAdd(wk, 6);
    var m = (w === 0 ? wk : (wkEnd.getDate() <= 7 ? wkEnd : null));
    if (m && m.getMonth() !== lastM) { lastM = m.getMonth(); months += '<span style="grid-column:' + (w + 1) + '">' + m.toLocaleDateString('en-CA', { month: 'short' }) + '</span>'; }
    for (var i = 0; i < 7; i++) {
      var day = calAdd(wk, i), k = dayKey(day), d = xd[k] || {}, t = calTotal(d), top = calTop(d), fut = day > today;
      var lv = fut ? 0 : calLevel(t, d._g || g), col = top ? (RINGC[top.hue] || RINGC.c1)[0] : '';
      var ex = exams[k], exCol = ex ? (RINGC[ex[0].hue] || RINGC.c1)[0] : '';
      var nice = day.toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' });
      var lab = nice + ': ' + (fut ? (ex ? ex.map(function (c) { return c.code + ' ' + (c.exam.name || 'exam').toLowerCase(); }).join(', ') : 'still to come') : (t ? t + ' XP, mostly ' + top.code : 'no practice')) + (ex && !fut ? ' · ' + ex.map(function (c) { return c.code + ' ' + (c.exam.name || 'exam').toLowerCase(); }).join(', ') : '');
      cells += '<button type="button" class="cal-d lv' + lv + (fut ? ' fut' : '') + (k === tk ? ' now' : '') + (ex ? ' exam' : '') + '" data-k="' + k + '" tabindex="' + (k === tk ? 0 : -1) + '"' +
        ' style="' + (col ? '--c:' + col + ';' : '') + (ex ? '--x:' + exCol + ';' : '') + '" title="' + lab + '" aria-label="' + lab + '"' + (fut && !ex ? ' disabled' : '') + '></button>';
    }
  }
  var legend = '<span class="cal-less">Less</span>' + [0, 1, 2, 3, 4, 5].map(function (l) { return '<i class="cal-d lv' + l + '" style="--c:var(--ios-move)"></i>'; }).join('') + '<span class="cal-less">More</span>';
  var key = sortedCourses().map(function (c) { return '<span><i style="background:' + (RINGC[c.hue] || RINGC.c1)[0] + '"></i>' + esc(c.code) + '</span>'; }).join('');
  var nice = function (k) { return calDate(k).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' }); };
  var m = overlay(
    '<div class="cal">' +
      '<div class="mhead"><div><p class="lt-k cal-k">' + flame() + 'Streak</p><h3>Your study calendar</h3></div><button class="hl-link" type="button" id="cal-x">Done</button></div>' +
      '<div class="cal-stats">' +
        '<div><b>' + G.streak + '</b><span>day streak now</span></div>' +
        '<div><b>' + st.longest + '</b><span>longest streak</span></div>' +
        '<div><b>' + st.days + '</b><span>days practised</span></div>' +
        '<div><b>' + (st.best ? st.bestX.toLocaleString('en-CA') : '–') + '</b><span>' + (st.best ? 'XP on your best day, ' + nice(st.best) : 'best day so far') + '</span></div>' +
      '</div>' +
      '<div class="cal-scroll" id="cal-scroll"><div class="cal-grid-w" style="--w:' + weeks + '">' +
        '<div class="cal-mo" aria-hidden="true">' + months + '</div>' +
        '<div class="cal-dow" aria-hidden="true"><span></span><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span></div>' +
        '<div class="cal-grid" role="grid" aria-label="Days you studied">' + cells + '</div>' +
      '</div></div>' +
      '<div class="cal-leg"><div class="cal-key">' + key + '</div><div class="cal-scale">' + legend + '</div></div>' +
      '<p class="cal-note">Each square is a day, coloured by the course you practised most and stronger the more XP you earned. Outlined squares are exam days. Tap a day to see its rings.</p>' +
      '<div class="cal-day" id="cal-day" aria-live="polite"></div>' +
    '</div>', 'cal-modal');
  m.m.setAttribute('aria-label', 'Your study calendar');
  var grid = m.m.querySelector('.cal-grid'), panel = m.m.querySelector('#cal-day'), sel = tk;
  var pick = function (k, focus) {
    var b = grid.querySelector('[data-k="' + k + '"]'); if (!b || b.disabled) return;
    grid.querySelectorAll('.cal-d.sel').forEach(function (x) { x.classList.remove('sel'); x.tabIndex = -1; });
    b.classList.add('sel'); b.tabIndex = 0; sel = k;
    if (focus) b.focus();
    panel.innerHTML = calDayHTML(k); animateRings(panel);
  };
  grid.addEventListener('click', function (e) { var b = e.target.closest('.cal-d'); if (b) { Snd.tap(); pick(b.getAttribute('data-k')); } });
  grid.addEventListener('keydown', function (e) {
    var step = { ArrowUp: -1, ArrowDown: 1, ArrowLeft: -7, ArrowRight: 7 }[e.key]; if (!step) return;
    e.preventDefault();
    var k = dayKey(calAdd(calDate(sel), step)); if (grid.querySelector('[data-k="' + k + '"]:not([disabled])')) pick(k, true);
  });
  m.m.querySelector('#cal-x').addEventListener('click', m.close);
  pick(tk);
  var sc = m.m.querySelector('#cal-scroll'), nb = grid.querySelector('.now');
  if (sc && nb) sc.scrollLeft = Math.max(0, nb.offsetLeft - sc.clientWidth + 6 * nb.offsetWidth);
}

/* ============================================================
   THE BIRD: an original duckling that sits in the corner. Click it and it flutters and quacks.
   Colours, hats and extras unlock as your total XP (all courses) grows. Nothing is spent.
   Settings live in G.bird, so they travel with Export and Import.
   ============================================================ */
var BIRD_COLS = [
  { id: 'sun', name: 'Sunny', xp: 0, body: '#ffc93c', dark: '#f2a516', belly: '#ffe8a3' },
  { id: 'mint', name: 'Mint', xp: 200, body: '#5fd3a4', dark: '#33b383', belly: '#cdf5e3' },
  { id: 'sky', name: 'Sky', xp: 400, body: '#62b6ff', dark: '#3a92e6', belly: '#d3ebff' },
  { id: 'coral', name: 'Coral', xp: 700, body: '#ff7f6e', dark: '#e85d4c', belly: '#ffd6cf' },
  { id: 'lilac', name: 'Lilac', xp: 1000, body: '#b291ff', dark: '#9170ea', belly: '#e9e0ff' },
  { id: 'night', name: 'Night', xp: 1500, body: '#3b4a7a', dark: '#283359', belly: '#8796cc' },
  { id: 'snow', name: 'Snow', xp: 2200, body: '#f3f5fa', dark: '#cfd6e4', belly: '#ffffff' },
  { id: 'gold', name: 'Gold', xp: 3200, body: '#f6c33b', dark: '#d99a0b', belly: '#fff0b8', shine: true }
];
var BIRD_HATS = [
  { id: 'none', name: 'No hat', xp: 0 },
  { id: 'hard', name: 'Hard hat', xp: 150 },
  { id: 'beanie', name: 'Beanie', xp: 350 },
  { id: 'party', name: 'Party hat', xp: 650 },
  { id: 'prop', name: 'Propeller cap', xp: 950 },
  { id: 'wizard', name: 'Wizard hat', xp: 1300 },
  { id: 'grad', name: 'Graduation cap', xp: 2000 },
  { id: 'crown', name: 'Crown', xp: 4000 }
];
var BIRD_EXTRAS = [
  { id: 'none', name: 'Nothing', xp: 0 },
  { id: 'glasses', name: 'Glasses', xp: 250 },
  { id: 'goggles', name: 'Safety goggles', xp: 500 },
  { id: 'bow', name: 'Bow tie', xp: 800 },
  { id: 'scarf', name: 'Scarf', xp: 1100 },
  { id: 'phones', name: 'Headphones', xp: 1700 },
  { id: 'shades', name: 'Sunglasses', xp: 2600 }
];
function birdCfg() {
  var b = G.bird || (G.bird = {});
  if (!b.name) b.name = 'Pip';
  if (!b.col) b.col = 'sun';
  if (!b.hat) b.hat = 'none';
  if (!b.acc) b.acc = 'none';
  if (b.q == null) b.q = true;
  if (b.show == null) b.show = true;
  return b;
}
function totalXP() { return COURSES.reduce(function (s, c) { return s + ((c.S && c.S.xp) || 0); }, 0); }
function birdFind(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return list[0]; }
function birdEsc(s) { return String(s).replace(/[&<>"']/g, function (ch) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]; }); }

/* ---------- drawing (viewBox units; the bird faces right) ---------- */
function birdHat(id) {
  switch (id) {
    case 'hard': return '<path d="M45 34C45 18 55 11 66 11S87 18 87 34Z" fill="#f6f6f1" stroke="#c9c9bf" stroke-width="1.2"/><path d="M66 11V33" stroke="#dcdcd3" stroke-width="4"/>' +
      '<rect x="40" y="31" width="52" height="6.5" rx="3.2" fill="#ecece5" stroke="#c9c9bf" stroke-width="1.2"/>';
    case 'beanie': return '<path d="M46 33C46 16 56 10 66 10S86 16 86 33Z" fill="#e5484d"/><path d="M56 14V32M66 11V32M76 14V32" stroke="#c93b40" stroke-width="1.6"/>' +
      '<rect x="43.5" y="29" width="45" height="9" rx="4" fill="#c93b40"/><circle cx="66" cy="8.5" r="5.5" fill="#fff"/>';
    case 'party': return '<g transform="rotate(8 67 28)"><path d="M54 30L67-6L80 30Z" fill="#7c5cff"/><path d="M58.5 18L71.5 17.5L74 24L56.2 24.5Z" fill="#ffd23f"/><path d="M62.6 6.5L69.8 6L71 9.5L61.4 10Z" fill="#ff6b9a"/>' +
      '<circle cx="67" cy="-7" r="4.2" fill="#ffd23f"/></g>';
    case 'prop': return '<path d="M46 32C46 17 56 11 66 11S86 17 86 32Z" fill="#e5484d"/><path d="M66 11C61 17 59 25 59 32H73C73 25 71 17 66 11Z" fill="#ffd23f"/><path d="M46 32C47 22 52 15 58 12C56 18 55 25 55 32Z" fill="#3fa9f5"/>' +
      '<path d="M84 31Q96 30 99 35Q91 37 83 35Z" fill="#c93b40"/><rect x="64.8" y="2" width="2.4" height="9.5" rx="1" fill="#555"/>' +
      '<g class="bd-prop"><ellipse cx="66" cy="2.5" rx="13" ry="2.6" fill="#36b37e"/></g><circle cx="66" cy="2.5" r="2" fill="#444"/>';
    case 'wizard': return '<ellipse cx="66" cy="31.5" rx="26" ry="5.5" fill="#4535b3"/><path d="M50 31Q59 20 61-14Q69 6 83 31Z" fill="#5a48d6"/>' +
      '<path d="M63 10l1.3 2.7 3 .4-2.2 2 .6 3-2.7-1.5-2.7 1.5.6-3-2.2-2 3-.4Z" fill="#ffd23f"/><circle cx="72" cy="22" r="1.6" fill="#ffd23f"/><circle cx="58" cy="25" r="1.2" fill="#ffd23f"/>';
    case 'grad': return '<path d="M50 30Q50 23 66 23T82 30V35Q66 39 50 35Z" fill="#23232b"/><path d="M38 22L66 12L94 22L66 32Z" fill="#30303a"/>' +
      '<path d="M66 22L89 25V37" fill="none" stroke="#ffc83d" stroke-width="1.8"/><path d="M86.6 36h4.8l1 6h-6.8Z" fill="#ffc83d"/><circle cx="66" cy="22" r="2" fill="#ffc83d"/>';
    case 'crown': return '<path d="M47 31V15L56.5 23L66 9L75.5 23L85 15V31Z" fill="#ffcf33" stroke="#e0a400" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<rect x="47" y="27" width="38" height="5" fill="#f2b705"/><circle cx="56" cy="29.5" r="1.9" fill="#e5484d"/><circle cx="66" cy="29.5" r="2.2" fill="#3fa9f5"/><circle cx="76" cy="29.5" r="1.9" fill="#36b37e"/>';
  }
  return '';
}
function birdExtra(id) {
  switch (id) {
    case 'glasses': return '<path d="M63.6 43L46 40" stroke="#2a2a35" stroke-width="2.2" stroke-linecap="round"/><circle cx="72" cy="44" r="8.6" fill="rgba(255,255,255,.28)" stroke="#2a2a35" stroke-width="2.4"/>';
    case 'goggles': return '<path d="M44 40Q54 33 64 39" fill="none" stroke="#3a4152" stroke-width="5" stroke-linecap="round"/><rect x="62.5" y="35.5" width="19" height="16" rx="6.5" fill="rgba(120,215,255,.45)" stroke="#2f3644" stroke-width="2.5"/>' +
      '<path d="M66 39.5l3-2" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>';
    case 'bow': return '<path d="M79 66L70.5 60.5V71.5ZM79 66L87.5 60.5V71.5Z" fill="#e5484d"/><circle cx="79" cy="66" r="2.8" fill="#b8323a"/>';
    case 'scarf': return '<path d="M52 70L45.5 93L53.5 94.5L59 72Z" fill="#2fa36b"/><path d="M47 87.5l7.2 1.3M48.5 81.5l7 1.2" stroke="#fff" stroke-width="2" opacity=".85"/>' +
      '<path d="M46 63Q66 74 87 62L88 69.5Q66 81.5 45 70.5Z" fill="#36b37e"/><path d="M56 68.2Q58 74 57.6 75M70 70.8V77.6" stroke="#fff" stroke-width="2.2" opacity=".85"/>';
    case 'phones': return '<path d="M50 42C47 20 83 14 85 33" fill="none" stroke="#2a2a35" stroke-width="4.2" stroke-linecap="round"/><ellipse cx="55" cy="46" rx="6.5" ry="8.5" fill="#2a2a35"/><ellipse cx="56" cy="46" rx="3.6" ry="5.5" fill="#ff5a7a"/>';
    case 'shades': return '<path d="M63.4 41.5L46 39" stroke="#1d1f2b" stroke-width="2.2" stroke-linecap="round"/><path d="M62.5 38.5H82Q84 38.5 83.5 41L81.5 47.5Q80.5 51 77 51H69Q65.5 51 64.5 47.5L62 41Q61.5 38.5 62.5 38.5Z" fill="#1d1f2b"/>' +
      '<path d="M66.5 41.2l3.6-.1" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>';
  }
  return '';
}
function birdSVG(b, cls) {
  var c = birdFind(BIRD_COLS, b.col);
  var eyeRing = c.id === 'night' ? '<circle cx="72" cy="44" r="6.8" fill="#fff" opacity=".9"/>' : '';
  return '<svg class="bd ' + (cls || '') + '" viewBox="-4 -18 112 136" aria-hidden="true"><g class="bd-all">' +
    '<ellipse cx="58" cy="112" rx="29" ry="4.2" fill="rgba(0,0,0,.13)"/>' +
    '<path d="M41 111L47.5 102.5L54 111Q51 109 47.5 111.5Q44 109 41 111Z" fill="#ff9a1f"/><path d="M57 111L63.5 102.5L70 111Q67 109 63.5 111.5Q60 109 57 111Z" fill="#f08a10"/>' +
    '<path d="M27 78Q12 71 15 59Q24 70 35 71Z" fill="' + c.dark + '"/>' +
    '<ellipse cx="58" cy="82" rx="34" ry="27" fill="' + c.body + '"/>' +
    '<ellipse cx="66" cy="89.5" rx="21" ry="15" fill="' + c.belly + '"/>' +
    '<g class="bd-wing"><path d="M59 72C47 67 32 75 30 92C40 97 55 94 62.5 84C64.5 79 63 74 59 72Z" fill="' + c.dark + '"/><path d="M37 88Q46 89 54 82" fill="none" stroke="' + c.body + '" stroke-width="1.6" stroke-linecap="round" opacity=".7"/></g>' +
    '<circle cx="66" cy="47" r="23" fill="' + c.body + '"/>' +
    '<path d="M62 25.5Q57 14 65.5 11.5Q62.5 18 67 24.5Z" fill="' + c.dark + '"/><path d="M68 25.5Q70 15 78.5 16Q72.5 19.5 71.5 26.5Z" fill="' + c.dark + '"/>' +
    '<ellipse cx="57" cy="35" rx="8" ry="4.6" transform="rotate(-25 57 35)" fill="#fff" opacity="' + (c.shine ? '.6' : '.3') + '"/>' +
    (c.shine ? '<path d="M38 74l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5Z" fill="#fff" opacity=".85"/>' : '') +
    '<ellipse cx="77" cy="56.5" rx="4.6" ry="3" fill="#ff6f8e" opacity=".45"/>' +
    eyeRing + '<g class="bd-eye"><circle cx="72" cy="44" r="5.4" fill="#1f2233"/><circle cx="73.9" cy="42.2" r="1.9" fill="#fff"/></g>' +
    '<path d="M84 49Q98 46 103 51Q100.5 55.5 85 55Z" fill="#ff9a1f"/>' +
    '<g class="bd-jaw"><path d="M85 55Q98 55.5 101.5 55Q97.5 61 86 59.5Z" fill="#e3700f"/></g>' +
    birdExtra(b.acc) + birdHat(b.hat) +
    '</g></svg>';
}

/* ---------- sound and motion ---------- */
function quackSound() {
  Snd.init(); var c = Snd.ctx; if (!c) return;
  var two = Math.random() < 0.35, starts = two ? [0, 0.2] : [0];
  starts.forEach(function (at, k) {
    var t0 = c.currentTime + at + 0.01, d = 0.19, f0 = (k ? 270 : 300) * (0.95 + Math.random() * 0.1);
    var o = c.createOscillator(), am = c.createOscillator(), amg = c.createGain(), g = c.createGain(), out = c.createGain();
    var f1 = c.createBiquadFilter(), f2 = c.createBiquadFilter(), lp = c.createBiquadFilter();
    o.type = 'sawtooth'; o.frequency.setValueAtTime(f0 * 0.9, t0); o.frequency.linearRampToValueAtTime(f0 * 1.08, t0 + 0.035); o.frequency.exponentialRampToValueAtTime(f0 * 0.72, t0 + d);
    f1.type = 'bandpass'; f1.frequency.value = 1150; f1.Q.value = 5;
    f2.type = 'bandpass'; f2.frequency.value = 2500; f2.Q.value = 7;
    lp.type = 'lowpass'; lp.frequency.value = 3600;
    am.type = 'square'; am.frequency.value = 38; amg.gain.value = 0.35;   /* a little rasp */
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.9, t0 + 0.018); g.gain.setValueAtTime(0.9, t0 + 0.08); g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    out.gain.value = 0.42;
    am.connect(amg); amg.connect(g.gain);
    o.connect(f1); o.connect(f2); f1.connect(g); f2.connect(g); g.connect(lp); lp.connect(out); out.connect(c.destination);
    o.start(t0); am.start(t0); o.stop(t0 + d + 0.05); am.stop(t0 + d + 0.05);
  });
  return two;
}
var BIRD_SAYS = ['Quack!', 'Quack!', 'Quack!', 'Quack quack!', 'Quack! Keep going.', 'Quack! One more question?'];
function birdPoke(wrap, quiet) {
  var b = birdCfg(), two = false;
  if (b.q && !quiet) two = quackSound();
  buzz(15);
  wrap.classList.remove('flap', 'quack'); void wrap.offsetWidth; wrap.classList.add('flap', 'quack');
  clearTimeout(wrap._t); wrap._t = setTimeout(function () { wrap.classList.remove('flap', 'quack'); }, 760);
  var bub = wrap.querySelector('.bird-bub');
  if (bub) {
    bub.textContent = two ? 'Quack quack!' : BIRD_SAYS[Math.floor(Math.random() * BIRD_SAYS.length)];
    bub.classList.add('on'); clearTimeout(bub._t); bub._t = setTimeout(function () { bub.classList.remove('on'); }, 1500);
  }
}

/* ---------- the bird in the corner ---------- */
function birdBoot() {
  if (document.getElementById('bird')) return;
  var w = h('div', 'bird-dock');
  w.id = 'bird';
  w.innerHTML = '<span class="bird-bub" role="status" aria-live="polite"></span><button type="button" class="bird-btn"></button>';
  document.body.appendChild(w);
  w.querySelector('.bird-btn').addEventListener('click', function () { birdPoke(w); });
  birdDraw();
  var place = function () { birdPlace(); };
  new MutationObserver(place).observe(document.body, { childList: true });
  new MutationObserver(place).observe(app, { childList: true });
  new MutationObserver(place).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  window.addEventListener('resize', place);
}
function birdDraw() {
  var w = document.getElementById('bird'); if (!w) return;
  var b = birdCfg();
  var btn = w.querySelector('.bird-btn');
  btn.innerHTML = birdSVG(b, 'flip');
  btn.setAttribute('aria-label', b.name + ' the duck. Click to say hi.');
  var pic = document.getElementById('hb-pic');   /* keep the Summary card in step */
  if (pic) { var sv = pic.querySelector('svg'); if (sv) sv.outerHTML = birdSVG(b); pic.setAttribute('aria-label', 'Say hi to ' + b.name); var nm = document.querySelector('.hb-name'); if (nm) nm.textContent = b.name; }
  birdPlace();
}
/* Stay out of the way: hidden during mock exams, and while answering on a phone or with the formula sheet docked.
   Otherwise bottom right, above the answer bar, and on the left if the study timer sits in the right corner. */
function birdPlace() {
  var w = document.getElementById('bird'); if (!w) return;
  var b = birdCfg(), answering = !!(run && app.querySelector('.qcard')), inExam = !!(exam && document.querySelector('.bar') && !app.querySelector('.sum-top'));
  var hide = !b.show || inExam || (answering && (window.innerWidth < 760 || document.documentElement.classList.contains('docked')));
  w.hidden = hide;
  if (hide) return;
  var bar = document.querySelector('.bar'), bottom = (bar ? bar.offsetHeight : 0) + 10;
  var cd = document.querySelector('.candle'), left = false;
  if (cd) { var r = cd.getBoundingClientRect(); left = r.left > window.innerWidth / 2 && r.bottom > window.innerHeight - 200; }
  w.classList.toggle('left', left);
  w.style.bottom = 'calc(' + bottom + 'px + env(safe-area-inset-bottom, 0px))';
}

/* ---------- unlocks ---------- */
function birdAll() {
  return BIRD_COLS.map(function (x) { return { k: 'col', it: x, label: x.name + ' feathers' }; })
    .concat(BIRD_HATS.map(function (x) { return { k: 'hat', it: x, label: x.name }; }))
    .concat(BIRD_EXTRAS.map(function (x) { return { k: 'acc', it: x, label: x.name }; }))
    .filter(function (u) { return u.it.xp > 0; }).sort(function (a, b) { return a.it.xp - b.it.xp; });
}
function birdNext(t) { var all = birdAll(); for (var i = 0; i < all.length; i++) if (all[i].it.xp > t) return all[i]; return null; }
function birdUnlocks(before, after, delay) {
  var got = birdAll().filter(function (u) { return u.it.xp > before && u.it.xp <= after; });
  if (!got.length) return;
  setTimeout(function () {
    var b = birdCfg(), u = got[got.length - 1];
    var look = { col: b.col, hat: b.hat, acc: b.acc }; look[u.k] = u.it.id; look.name = b.name;
    var t = h('div', 'toast bird-toast', '<span class="bt-pic">' + birdSVG(look) + '</span><span><b>New for ' + birdEsc(b.name) + ': ' + u.label + (got.length > 1 ? ' (+' + (got.length - 1) + ' more)' : '') + '</b><small>Dress up from the Summary page.</small></span>');
    document.body.appendChild(t);
    var w = document.getElementById('bird'); if (w && !w.hidden) birdPoke(w, true);
    setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 400); }, 3200);
  }, delay || 500);
}

/* ---------- Summary card and the dress-up panel ---------- */
function birdCardHTML() {
  var b = birdCfg(), t = totalXP(), nx = birdNext(t), prev = 0;
  birdAll().forEach(function (u) { if (u.it.xp <= t) prev = u.it.xp; });
  var pct = nx ? Math.round(100 * (t - prev) / (nx.it.xp - prev)) : 100;
  return '<section class="hl-card hl-bird" aria-label="Your duck">' +
    '<button type="button" class="hb-pic" id="hb-pic" aria-label="Say hi to ' + birdEsc(b.name) + '"><span class="bird-bub" role="status" aria-live="polite"></span>' + birdSVG(b) + '</button>' +
    '<div class="hb-main"><span class="hl-tag bdt">' + duckIcon() + 'Your duck</span><div class="hb-name">' + birdEsc(b.name) + '</div>' +
    '<p class="hl-s">' + t.toLocaleString('en-CA') + ' XP earned in total. ' + (nx ? 'Next: ' + nx.label + ' at ' + nx.it.xp.toLocaleString('en-CA') + ' XP.' : 'Everything is unlocked.') + '</p>' +
    '<span class="mbar hb-bar" aria-hidden="true"><i style="width:' + pct + '%"></i></span>' +
    '<button class="hl-link" type="button" id="hb-dress">Dress up</button></div></section>';
}
function birdCardBind() {
  var pic = document.getElementById('hb-pic'), dr = document.getElementById('hb-dress');
  if (pic) pic.addEventListener('click', function () { birdPoke(pic); });
  if (dr) dr.addEventListener('click', function () { Snd.tap(); showBirdShop(); });
}
function duckIcon() { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9.5 4a4.5 4.5 0 0 1 4.4 5.5l3.6-.6c.5-.1.8.4.5.8l-1.3 1.6c1.6 1 2.5 2.8 2.3 4.7C18.7 19.2 16 21 13 21H9c-3.3 0-6-2.2-6-5 0-1.6.9-3 2.3-3.9A4.5 4.5 0 0 1 9.5 4zm0 2.6a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8z"/></svg>'; }
function lockIcon() { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1zm2 0h6V8a3 3 0 0 0-6 0z"/></svg>'; }
function showBirdShop() {
  var b = birdCfg(), t = totalXP();
  var opt = function (k, it) {
    var on = b[k] === it.id, lock = it.xp > t, look = { col: b.col, hat: b.hat, acc: b.acc };
    look[k] = it.id;
    var pic = k === 'col' ? '<span class="sw" style="--a:' + it.body + ';--b:' + it.dark + '"></span>' : birdSVG(look, 'mini');
    return '<button type="button" class="bs-opt' + (on ? ' on' : '') + (lock ? ' locked' : '') + '" data-k="' + k + '" data-id="' + it.id + '" aria-pressed="' + on + '"' + (lock ? ' aria-disabled="true"' : '') + '>' +
      pic + '<span class="bs-n">' + it.name + '</span>' + (lock ? '<span class="bs-x">' + lockIcon() + it.xp.toLocaleString('en-CA') + ' XP</span>' : '') + '</button>';
  };
  var grid = function (k, list) { return '<div class="bs-grid' + (k === 'col' ? ' cols' : '') + '">' + list.map(function (it) { return opt(k, it); }).join('') + '</div>'; };
  var m = overlay(
    '<div class="mhead"><div><h3>Dress up your duck</h3><p class="sheet-note">' + t.toLocaleString('en-CA') + ' XP earned in total, across every course. New things unlock as it grows. Nothing is spent.</p></div><button class="btn ghost" type="button" id="bs-x">Done</button></div>' +
    '<div class="bs-top"><button type="button" class="bs-big" id="bs-big" aria-label="Say hi"><span class="bird-bub" role="status" aria-live="polite"></span><span id="bs-pv">' + birdSVG(b) + '</span></button>' +
      '<div class="bs-side"><label class="bs-lab" for="bs-name">Name</label><input id="bs-name" class="bs-in" type="text" maxlength="16" autocomplete="off" spellcheck="false">' +
      '<div class="hl-li"><span>Quack sound</span><button class="tgl sw" type="button" id="bs-q" aria-pressed="' + b.q + '" aria-label="Quack sound"><i></i></button></div>' +
      '<div class="hl-li"><span>Show in the corner</span><button class="tgl sw" type="button" id="bs-show" aria-pressed="' + b.show + '" aria-label="Show the duck in the corner"><i></i></button></div></div></div>' +
    '<h4 class="bs-h">Feathers</h4>' + grid('col', BIRD_COLS) + '<h4 class="bs-h">Hat</h4>' + grid('hat', BIRD_HATS) + '<h4 class="bs-h">Extra</h4>' + grid('acc', BIRD_EXTRAS), 'wide bird-shop');
  var root = m.m, name = root.querySelector('#bs-name');
  name.value = b.name;
  var redraw = function () {
    root.querySelector('#bs-pv').innerHTML = birdSVG(b);
    root.querySelectorAll('.bs-opt').forEach(function (el) {
      var k = el.getAttribute('data-k'), id = el.getAttribute('data-id'), on = b[k] === id;
      el.classList.toggle('on', on); el.setAttribute('aria-pressed', on);
      if (k !== 'col') { var look = { col: b.col, hat: b.hat, acc: b.acc }; look[k] = id; var sv = el.querySelector('svg'); if (sv) sv.outerHTML = birdSVG(look, 'mini'); }
    });
    save(); birdDraw();
  };
  root.querySelectorAll('.bs-opt').forEach(function (el) {
    el.addEventListener('click', function () {
      if (el.classList.contains('locked')) { Snd.half(); el.classList.remove('nope'); void el.offsetWidth; el.classList.add('nope'); return; }
      Snd.tap(); b[el.getAttribute('data-k')] = el.getAttribute('data-id'); redraw();
      birdPoke(root.querySelector('#bs-big'), true);
    });
  });
  name.addEventListener('input', function () { var v = name.value.replace(/\s+/g, ' ').trim(); b.name = v || 'Pip'; save(); birdDraw(); });
  root.querySelector('#bs-big').addEventListener('click', function (e) { birdPoke(e.currentTarget); });
  [['#bs-q', 'q'], ['#bs-show', 'show']].forEach(function (p) {
    var el = root.querySelector(p[0]);
    el.addEventListener('click', function () { b[p[1]] = !b[p[1]]; el.setAttribute('aria-pressed', b[p[1]]); Snd.tap(); save(); birdDraw(); });
  });
  root.querySelector('#bs-x').addEventListener('click', m.close);
}

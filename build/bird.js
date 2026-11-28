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
  { id: 'gold', name: 'Gold', xp: 3200, body: '#f6c33b', dark: '#d99a0b', belly: '#fff0b8', shine: true },
  { id: 'ocean', name: 'Ocean', xp: 6000, body: '#1fb5c9', dark: '#0e8fa3', belly: '#c8f3f8' },
  { id: 'forest', name: 'Forest', xp: 10000, body: '#3e9b57', dark: '#2b7a41', belly: '#cdeccf' },
  { id: 'cherry', name: 'Cherry blossom', xp: 16500, body: '#ffb0cd', dark: '#f088ae', belly: '#ffe6f0' },
  { id: 'sunset', name: 'Sunset', xp: 25000, body: '#ff9966', dark: '#e2553f', belly: '#fff1dc', grad: ['#ff5e62', '#ff9966', '#ffcc33'] },
  { id: 'galaxy', name: 'Galaxy', xp: 38000, body: '#4b2a8c', dark: '#1d1550', belly: '#b6a8ff', grad: ['#1a1446', '#4b2a8c', '#2b5fbf'], shine: true, ring: true },
  { id: 'ruby', name: 'Ruby', xp: 49000, body: '#e0245e', dark: '#b0123f', belly: '#ffc6d6', shine: true },
  { id: 'diamond', name: 'Diamond', xp: 70000, body: '#d8f2ff', dark: '#8fbfe0', belly: '#ffffff', grad: ['#e0f7ff', '#b8e8ff', '#ffffff', '#c9d8ff'], shine: true },
  { id: 'rainbow', name: 'Rainbow', ach: 'all', body: '#ffcc00', dark: '#5856d6', belly: '#fff6fb', grad: ['#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#007aff', '#af52de'] }
];
var BIRD_HATS = [
  { id: 'none', name: 'No hat', xp: 0 },
  { id: 'hard', name: 'Hard hat', xp: 150 },
  { id: 'beanie', name: 'Beanie', xp: 350 },
  { id: 'party', name: 'Party hat', xp: 650 },
  { id: 'prop', name: 'Propeller cap', xp: 950 },
  { id: 'wizard', name: 'Wizard hat', xp: 1300 },
  { id: 'grad', name: 'Graduation cap', xp: 2000 },
  { id: 'crown', name: 'Crown', xp: 4000 },
  { id: 'chef', name: 'Chef hat', xp: 7200 },
  { id: 'top', name: 'Top hat', xp: 12000 },
  { id: 'viking', name: 'Viking helmet', xp: 19000 },
  { id: 'halo', name: 'Halo', xp: 29000 },
  { id: 'astro', name: 'Space helmet', xp: 43000 },
  { id: 'dcrown', name: 'Diamond crown', xp: 62000 },
  { id: 'sprout', name: 'Sprout', ach: 'q1' },
  { id: 'visor', name: 'Visor', ach: 'mock' },
  { id: 'sweat', name: 'Sweatband', ach: 'st7' },
  { id: 'laurel', name: 'Laurel wreath', ach: 'all' }
];
var BIRD_EXTRAS = [
  { id: 'none', name: 'Nothing', xp: 0 },
  { id: 'glasses', name: 'Glasses', xp: 250 },
  { id: 'goggles', name: 'Safety goggles', xp: 500 },
  { id: 'bow', name: 'Bow tie', xp: 800 },
  { id: 'scarf', name: 'Scarf', xp: 1100 },
  { id: 'phones', name: 'Headphones', xp: 1700 },
  { id: 'shades', name: 'Sunglasses', xp: 2600 },
  { id: 'calc', name: 'Calculator', xp: 5000 },
  { id: 'monocle', name: 'Monocle', xp: 8600 },
  { id: 'cape', name: 'Cape', xp: 14000 },
  { id: 'chain', name: 'Gold chain', xp: 22000 },
  { id: 'jet', name: 'Jetpack', xp: 33000 },
  { id: 'trophy', name: 'Trophy', xp: 55000 },
  { id: 'swim', name: 'Swim ring', ach: 'ring1' },
  { id: 'pencil', name: 'Pencil', ach: 'q50' },
  { id: 'whistle', name: 'Whistle', ach: 'ringall' },
  { id: 'silver', name: 'Silver medal', ach: 'half' },
  { id: 'gold', name: 'Gold medal', ach: 'one' }
];
/* milestones: once earned they stay earned (G.bird.got), even if a question later drops a box. Mastered = the top box, the green state */
function bestProg(s) { return s.bestC ? 'Best so far: ' + s.bestC.code + ', ' + Math.floor(s.best * 100) + '% mastered' : 'Nothing mastered yet'; }
var BIRD_ACH = [
  { id: 'q1', label: 'Master your first question', done: 'You mastered your first question.', test: function (s) { return s.total >= 1; } },
  { id: 'ring1', label: 'Close your first ring', done: 'You closed your first ring.', test: function (s) { return s.ring1; } },
  { id: 'mock', label: 'Finish a mock exam', done: 'You finished a mock exam.', test: function (s) { return s.mock; } },
  { id: 'st7', label: 'Study 7 days in a row', done: 'Seven days in a row.', test: function (s) { return s.streak >= 7; }, prog: function (s) { return 'Streak now ' + s.streak + ' of 7'; } },
  { id: 'q50', label: 'Master 50 questions', done: 'Fifty questions mastered.', test: function (s) { return s.total >= 50; }, prog: function (s) { return s.total + ' of 50 so far'; } },
  { id: 'ringall', label: 'Close every ring in one day', done: 'Every ring closed in one day.', test: function (s) { return s.ringAll; } },
  { id: 'half', label: 'Fully master half of a course', done: 'Half of a course fully mastered.', test: function (s) { return s.best >= 0.5; }, prog: bestProg },
  { id: 'one', label: 'Fully master a whole course', done: 'A whole course fully mastered.', test: function (s) { return s.best >= 1; }, prog: bestProg },
  { id: 'all', label: 'Fully master every course', done: 'Every course fully mastered.', test: function (s) { return s.all; }, prog: function (s) { return s.done + ' of ' + COURSES.length + ' courses fully mastered'; } }
];
function birdCfg() {
  var b = G.bird || (G.bird = {});
  if (!b.name || (b.name === 'Pip' && !b.named)) b.name = 'Moxie';   /* the old default becomes Moxie unless someone typed it */
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
    case 'sprout': return '<path d="M66 25V11" stroke="#2f9e44" stroke-width="2.4" stroke-linecap="round"/><path d="M66 15C58 16 53 11 54 5C61 4 66 9 66 15Z" fill="#34c759"/><path d="M66 13C72 13 78 9 78 3C71 2 66 7 66 13Z" fill="#28a745"/>';
    case 'visor': return '<path d="M46 31Q66 20 86 31L87 36.2Q66 26 45 36.2Z" fill="#007aff"/><path d="M84 31Q100 29 105 35.5Q95 38.5 85.5 36.6Z" fill="#0062cc"/>';
    case 'sweat': return '<path d="M46 30Q66 18 86 30L88 36.2Q66 25 44 36.2Z" fill="#ff3b30"/><path d="M45.2 33.2Q66 21.6 87 33.2" fill="none" stroke="#fff" stroke-width="1.6"/>';
    case 'laurel': return birdLaurel();
    case 'chef': return '<rect x="50" y="22" width="32" height="11" rx="3" fill="#fff" stroke="#d8d8de" stroke-width="1.2"/>' +
      '<path d="M50 24C42 21 42 8 52 8C53 0 63-2 67 4C71-2 81 0 81 8C91 8 91 21 82 24Z" fill="#fff" stroke="#d8d8de" stroke-width="1.2"/><path d="M58 22V13M66 22V10M74 22V13" stroke="#e6e6ec" stroke-width="1.4" stroke-linecap="round"/>';
    case 'top': return '<ellipse cx="66" cy="31.5" rx="25" ry="4.6" fill="#1c1c22"/><path d="M52 31V3Q52 0 55 0H77Q80 0 80 3V31Z" fill="#26262e"/>' +
      '<rect x="52" y="22.5" width="28" height="5.5" fill="#e5484d"/><path d="M56 4V20" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".18"/>';
    case 'viking': return '<path d="M48 22C40 19 34 11 33 2C39 8 45 12 51 15Z" fill="#f3ead7" stroke="#c8bb9f" stroke-width="1.2" stroke-linejoin="round"/><path d="M84 22C92 19 98 11 99 2C93 8 87 12 81 15Z" fill="#f3ead7" stroke="#c8bb9f" stroke-width="1.2" stroke-linejoin="round"/>' +
      '<path d="M46 33C46 16 56 9 66 9S86 16 86 33Z" fill="#a3acba"/><path d="M66 9V31" stroke="#8a93a2" stroke-width="3"/><path d="M53 15Q57 12 60 11" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".45"/>' +
      '<rect x="43.5" y="29" width="45" height="7" rx="3" fill="#7c8596"/><circle cx="51" cy="32.5" r="1.3" fill="#d3d8e0"/><circle cx="61" cy="32.5" r="1.3" fill="#d3d8e0"/><circle cx="71" cy="32.5" r="1.3" fill="#d3d8e0"/><circle cx="81" cy="32.5" r="1.3" fill="#d3d8e0"/>';
    case 'halo': return '<g class="bd-halo"><ellipse cx="66" cy="9" rx="18" ry="4.6" fill="none" stroke="rgba(255,214,10,.35)" stroke-width="7"/><ellipse cx="66" cy="9" rx="18" ry="4.6" fill="none" stroke="#ffd60a" stroke-width="3"/>' +
      '<path d="M52 7.5Q58 5.2 64 5" stroke="#fff" stroke-width="1.3" stroke-linecap="round" opacity=".8"/></g>';
    case 'astro': return '<path d="M42 68Q66 80 90 68L92 75Q66 89 40 75Z" fill="#e4e8ee" stroke="#b9c1cc" stroke-width="1.2"/>' +
      '<circle cx="66" cy="44" r="33.5" fill="rgba(190,230,255,.12)" stroke="#dfe6ef" stroke-width="3.2"/><path d="M42 29Q49 17 61 13.5" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>' +
      '<path d="M86 18L93 6" stroke="#b9c1cc" stroke-width="2"/><circle cx="94" cy="4.5" r="3" fill="#ff3b30"/>';
    case 'dcrown': return '<path d="M47 31V13L56.5 22L66 6L75.5 22L85 13V31Z" fill="#e3f6ff" stroke="#7fb2d6" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<rect x="47" y="26.5" width="38" height="5" fill="#bfe3f7"/><path d="M66 13l3.2 4.2L66 21.4l-3.2-4.2Z" fill="#3fa9f5"/><path d="M56.5 25.5l2-2.2 2 2.2-2 2.2Z" fill="#af52de"/><path d="M75.5 25.5l2-2.2 2 2.2-2 2.2Z" fill="#34c759"/>' +
      '<path d="M88 9l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1Z" fill="#fff" stroke="#7fb2d6" stroke-width=".5"/><path d="M44 7l.8 1.8 1.8.8-1.8.8-.8 1.8-.8-1.8-1.8-.8 1.8-.8Z" fill="#fff" stroke="#7fb2d6" stroke-width=".5"/>';
    case 'crown': return '<path d="M47 31V15L56.5 23L66 9L75.5 23L85 15V31Z" fill="#ffcf33" stroke="#e0a400" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<rect x="47" y="27" width="38" height="5" fill="#f2b705"/><circle cx="56" cy="29.5" r="1.9" fill="#e5484d"/><circle cx="66" cy="29.5" r="2.2" fill="#3fa9f5"/><circle cx="76" cy="29.5" r="1.9" fill="#36b37e"/>';
  }
  return '';
}
function birdExtra(id) {
  switch (id) {
    case 'glasses': return '<path d="M62.4 42.5L46 40" stroke="#2a2a35" stroke-width="2.2" stroke-linecap="round"/><circle cx="72" cy="43.5" r="9.8" fill="rgba(255,255,255,.28)" stroke="#2a2a35" stroke-width="2.4"/>';
    case 'goggles': return '<path d="M44 40Q54 33 64 39" fill="none" stroke="#3a4152" stroke-width="5" stroke-linecap="round"/><rect x="62.5" y="35.5" width="19" height="16" rx="6.5" fill="rgba(120,215,255,.45)" stroke="#2f3644" stroke-width="2.5"/>' +
      '<path d="M66 39.5l3-2" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>';
    case 'bow': return '<path d="M79 66L70.5 60.5V71.5ZM79 66L87.5 60.5V71.5Z" fill="#e5484d"/><circle cx="79" cy="66" r="2.8" fill="#b8323a"/>';
    case 'scarf': return '<path d="M52 70L45.5 93L53.5 94.5L59 72Z" fill="#2fa36b"/><path d="M47 87.5l7.2 1.3M48.5 81.5l7 1.2" stroke="#fff" stroke-width="2" opacity=".85"/>' +
      '<path d="M46 63Q66 74 87 62L88 69.5Q66 81.5 45 70.5Z" fill="#36b37e"/><path d="M56 68.2Q58 74 57.6 75M70 70.8V77.6" stroke="#fff" stroke-width="2.2" opacity=".85"/>';
    case 'phones': return '<path d="M50 42C47 20 83 14 85 33" fill="none" stroke="#2a2a35" stroke-width="4.2" stroke-linecap="round"/><ellipse cx="55" cy="46" rx="6.5" ry="8.5" fill="#2a2a35"/><ellipse cx="56" cy="46" rx="3.6" ry="5.5" fill="#ff5a7a"/>';
    case 'swim': return '<path d="M22 95A36 9.5 0 0 0 94 95" fill="none" stroke="#ff3b30" stroke-width="8" stroke-linecap="round"/><path d="M22 95A36 9.5 0 0 0 94 95" fill="none" stroke="#fff" stroke-width="8" stroke-dasharray="9 14"/>';
    case 'pencil': return '<g transform="rotate(-32 50 22)" stroke="#3a3a3c" stroke-width="1" stroke-linejoin="round"><rect x="30" y="18.5" width="6" height="7" rx="2" fill="#ff8fab"/><rect x="36" y="18.5" width="3.4" height="7" fill="#c7ccd6"/>' +
      '<rect x="39.4" y="18.5" width="22" height="7" fill="#007aff"/><path d="M39.4 22h22" stroke="#0062cc" stroke-width="1.4"/><path d="M61.4 18.5L69.5 22L61.4 25.5Z" fill="#f3d29b"/><path d="M66.8 20.8L69.5 22L66.8 23.2Z" fill="#3a3a3c"/></g>';
    case 'whistle': return '<path d="M70 61Q74 69 78.5 72M84 61Q83.5 67 82 71.5" fill="none" stroke="#ff3b30" stroke-width="2" stroke-linecap="round"/><rect x="75.5" y="71" width="12" height="7" rx="3.5" fill="#d1d5dc" stroke="#9aa1ad" stroke-width="1.2"/>' +
      '<rect x="86" y="72.4" width="5.5" height="3" rx="1" fill="#9aa1ad"/><circle cx="79.5" cy="74.5" r="1.4" fill="#9aa1ad"/>';
    case 'silver': return birdMedal('#007aff', '#d1d5dc', '#9aa1ad');
    case 'gold': return birdMedal('#ff3b30', '#ffcc00', '#d4a000');
    case 'calc': return '<g transform="rotate(-8 77 82)"><rect x="69" y="70" width="16" height="22" rx="2.6" fill="#3a3f4b" stroke="#262a33" stroke-width="1"/><rect x="71.2" y="72.4" width="11.6" height="5" rx="1" fill="#b7f0c1"/>' +
      '<g fill="#d7dbe3"><circle cx="73.4" cy="81" r="1.3"/><circle cx="77" cy="81" r="1.3"/><circle cx="80.6" cy="81" r="1.3"/><circle cx="73.4" cy="84.6" r="1.3"/><circle cx="77" cy="84.6" r="1.3"/><circle cx="73.4" cy="88.2" r="1.3"/><circle cx="77" cy="88.2" r="1.3"/></g>' +
      '<rect x="79.4" y="83.4" width="2.4" height="6" rx="1" fill="#ff9500"/></g>';
    case 'monocle': return '<path d="M71 52.3Q66 62 59.5 68" fill="none" stroke="#d4a000" stroke-width="1.3" stroke-dasharray="2.2 1.2"/><circle cx="72" cy="43.5" r="9" fill="rgba(255,255,255,.22)" stroke="#d4a000" stroke-width="2.2"/>' +
      '<path d="M66.5 39.5Q68.5 37 71.5 36.4" stroke="#fff" stroke-width="1.3" stroke-linecap="round" opacity=".8"/>';
    case 'cape': return '<path d="M48 64Q62 71 78 64" fill="none" stroke="#c91f37" stroke-width="3.2" stroke-linecap="round"/><circle cx="78.5" cy="64.5" r="2.6" fill="#ffcc00" stroke="#d4a000" stroke-width=".8"/>';
    case 'chain': return '<path d="M46 63Q66 80 87 62" fill="none" stroke="#d4a000" stroke-width="3.4" stroke-linecap="round"/><path d="M46 63Q66 80 87 62" fill="none" stroke="#ffd23f" stroke-width="2.2" stroke-dasharray="3.4 1.6" stroke-linecap="round"/>' +
      '<circle cx="68" cy="75.5" r="5.2" fill="#ffcf33" stroke="#d4a000" stroke-width="1.2"/><path d="M68 72.3l.9 2 2.2.3-1.6 1.5.4 2.2-1.9-1-1.9 1 .4-2.2-1.6-1.5 2.2-.3Z" fill="#d4a000"/>';
    case 'jet': return '<path d="M42 72Q62 81 85 70" fill="none" stroke="#5a6170" stroke-width="3.4" stroke-linecap="round"/><rect x="60.5" y="73.5" width="7" height="6" rx="1.4" fill="#c7ccd6" stroke="#5a6170" stroke-width="1.2"/>';
    case 'trophy': return '<g transform="rotate(-6 77 82)"><path d="M70.5 69H83.5V75Q83.5 82 77 82Q70.5 82 70.5 75Z" fill="#ffcf33" stroke="#d4a000" stroke-width="1.2"/>' +
      '<path d="M70.5 71.5Q66 71.5 66.5 75Q67 78 71 78M83.5 71.5Q88 71.5 87.5 75Q87 78 83 78" fill="none" stroke="#d4a000" stroke-width="1.5"/>' +
      '<rect x="75.6" y="81.5" width="2.8" height="5" fill="#d4a000"/><rect x="71.5" y="86" width="11" height="4.2" rx="1" fill="#8a5a2b"/><path d="M73.5 71V77" stroke="#fff" stroke-width="1.3" stroke-linecap="round" opacity=".6"/></g>';
    case 'shades': return '<g transform="translate(0 -1.8)"><path d="M63.4 41.5L46 39" stroke="#1d1f2b" stroke-width="2.2" stroke-linecap="round"/><path d="M62.5 38.5H82Q84 38.5 83.5 41L81.5 47.5Q80.5 51 77 51H69Q65.5 51 64.5 47.5L62 41Q61.5 38.5 62.5 38.5Z" fill="#1d1f2b"/>' +
      '<path d="M66.5 41.2l3.6-.1" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".7"/></g>';
  }
  return '';
}
function birdBack(id) {   /* things worn on the back sit behind the body */
  switch (id) {
    case 'cape': return '<path d="M52 62Q24 64 6 108Q24 100 38 106Q48 99 56 104Q58 86 62 68Z" fill="#e5484d"/><path d="M47 66Q28 80 18 102M52 70Q42 86 40 102" fill="none" stroke="#c91f37" stroke-width="2" stroke-linecap="round" opacity=".7"/>';
    case 'jet': return '<g><rect x="17" y="58" width="11" height="30" rx="5" fill="#9aa3b2" stroke="#6f7887" stroke-width="1.2"/><rect x="28" y="58" width="11" height="30" rx="5" fill="#b4bcc8" stroke="#6f7887" stroke-width="1.2"/>' +
      '<rect x="17" y="58" width="22" height="6" rx="3" fill="#ff3b30"/><path d="M19 88h7l-1 4h-5ZM30 88h7l-1 4h-5Z" fill="#5a6170"/>' +
      '<g class="bd-flame"><path d="M22.5 92Q19 99 22.5 106Q26 99 22.5 92Z" fill="#ff9500"/><path d="M33.5 92Q30 99 33.5 106Q37 99 33.5 92Z" fill="#ff9500"/><path d="M22.5 93Q21 98 22.5 101.5Q24 98 22.5 93ZM33.5 93Q32 98 33.5 101.5Q35 98 33.5 93Z" fill="#ffd60a"/></g></g>';
  }
  return '';
}
function birdMedal(rib, fill, edge) {
  return '<path d="M70 61L75.5 75.5M82 61L76.5 75.5" stroke="' + rib + '" stroke-width="3.6" stroke-linecap="round"/><circle cx="76" cy="80" r="6.4" fill="' + fill + '" stroke="' + edge + '" stroke-width="1.4"/>' +
    '<path d="M76 76.6l1 2.1 2.3.3-1.7 1.6.4 2.3-2-1.1-2 1.1.4-2.3-1.7-1.6 2.3-.3Z" fill="' + edge + '"/>';
}
function birdLaurel() {   /* a ring of gold leaves sitting on the crown of the head */
  var out = '', n = 11;
  for (var i = 0; i < n; i++) {
    var deg = 180 * i / (n - 1), a = deg * Math.PI / 180, x = (66 - 21 * Math.cos(a)).toFixed(1), y = (28 + 6.5 * Math.sin(a)).toFixed(1);
    var tan = Math.atan2(6.5 * Math.cos(a), 21 * Math.sin(a)) * 180 / Math.PI, tilt = i % 2 ? 32 : -32;
    out += '<ellipse cx="' + x + '" cy="' + y + '" rx="5" ry="2.3" transform="rotate(' + (tan + tilt).toFixed(0) + ' ' + x + ' ' + y + ')" fill="' + (i % 2 ? '#ffcc00' : '#f2b705') + '" stroke="#c99700" stroke-width=".7"/>';
  }
  return out;
}
var birdUid = 0;
function birdSVG(b, cls) {
  var c = birdFind(BIRD_COLS, b.col), uid = 'bdg' + (++birdUid), fill = c.body, defs = '';
  if (c.grad) { fill = 'url(#' + uid + ')'; defs = '<defs><linearGradient id="' + uid + '" x1="0" y1="0" x2="1" y2="1">' + c.grad.map(function (g, i) { return '<stop offset="' + (i / (c.grad.length - 1)).toFixed(2) + '" stop-color="' + g + '"/>'; }).join('') + '</linearGradient></defs>'; }
  var eyeRing = (c.id === 'night' || c.ring) ? '<circle cx="72" cy="43.5" r="8.3" fill="#fff" opacity=".9"/>' : '';
  return '<svg class="bd ' + (cls || '') + '" viewBox="-4 -18 112 136" aria-hidden="true">' + defs +
    '<ellipse class="bd-sh" cx="58" cy="112" rx="29" ry="4.2" fill="rgba(0,0,0,.13)"/>' +
    '<g class="bd-fx" aria-hidden="true"><g class="bd-boom" stroke="#ff9500" stroke-width="2.2" stroke-linecap="round"><path d="M33 104l-4-7M39 103l1-8M27 107l-8-3M45 106l7-4"/></g>' +
      '<circle class="bd-puff" style="--dx:-7px" cx="27" cy="110" r="4.5" fill="#c9c2b8"/><circle class="bd-puff" style="--dx:6px" cx="44" cy="111" r="4" fill="#d6d0c7"/><circle class="bd-puff" style="--dx:-1px" cx="35" cy="112" r="5" fill="#d0c9bf"/></g>' +
    '<g class="bd-all"><g class="bd-tilt">' +
    '<g class="bd-fl"><path d="M47.5 96V104" stroke="#ff9a1f" stroke-width="2.6" stroke-linecap="round"/><path d="M41 111L47.5 102.5L54 111Q51 109 47.5 111.5Q44 109 41 111Z" fill="#ff9a1f"/></g>' +
    '<g class="bd-fr"><path d="M63.5 96V104" stroke="#f08a10" stroke-width="2.6" stroke-linecap="round"/><path d="M57 111L63.5 102.5L70 111Q67 109 63.5 111.5Q60 109 57 111Z" fill="#f08a10"/></g>' +
    birdBack(b.acc) +
    '<path d="M27 78Q12 71 15 59Q24 70 35 71Z" fill="' + c.dark + '"/>' +
    '<ellipse cx="58" cy="82" rx="34" ry="27" fill="' + fill + '"/>' +
    '<ellipse cx="66" cy="89.5" rx="21" ry="15" fill="' + c.belly + '"/>' +
    '<g class="bd-wing"><path d="M59 72C47 67 32 75 30 92C40 97 55 94 62.5 84C64.5 79 63 74 59 72Z" fill="' + c.dark + '"/><path d="M37 88Q46 89 54 82" fill="none" stroke="' + (c.grad ? '#fff' : c.body) + '" stroke-width="1.6" stroke-linecap="round" opacity=".7"/></g>' +
    '<circle cx="66" cy="47" r="23" fill="' + fill + '"/>' +
    '<path d="M62 25.5Q57 14 65.5 11.5Q62.5 18 67 24.5Z" fill="' + c.dark + '"/><path d="M68 25.5Q70 15 78.5 16Q72.5 19.5 71.5 26.5Z" fill="' + c.dark + '"/>' +
    '<ellipse cx="56" cy="34" rx="7.5" ry="4.4" transform="rotate(-25 56 34)" fill="#fff" opacity="' + (c.shine ? '.6' : '.3') + '"/>' +
    (c.shine ? '<path d="M38 74l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5Z" fill="#fff" opacity=".85"/>' : '') +
    '<ellipse cx="77.5" cy="57" rx="4.6" ry="3" fill="#ff6f8e" opacity=".45"/>' +
    eyeRing + '<g class="bd-eye"><circle cx="72" cy="43.5" r="6.7" fill="#1f2233"/><circle cx="74.4" cy="41.2" r="2.4" fill="#fff"/><circle cx="69.6" cy="46.3" r="1" fill="#fff" opacity=".7"/></g>' +
    '<path d="M84 49Q98 46 103 51Q100.5 55.5 85 55Z" fill="#ff9a1f"/>' +
    '<g class="bd-jaw"><path d="M85 55Q98 55.5 101.5 55Q97.5 61 86 59.5Z" fill="#e3700f"/></g>' +
    '<g class="bd-scuff"><path d="M30 93C34 90 41 91 44 95C41 99 34 100 30 97Z" fill="#7a5a3c" opacity=".35"/><path d="M32 94.5l8 1.5M33 97l6 1" stroke="#7a5a3c" stroke-width="1.1" stroke-linecap="round" opacity=".55"/></g>' +
    birdExtra(b.acc) + birdHat(b.hat) +
    '<g class="bd-dizzy"><path d="M52 8l1.2 2.6 2.8.3-2.1 1.9.6 2.8-2.5-1.4-2.5 1.4.6-2.8-2.1-1.9 2.8-.3Z" fill="#ffcc00" stroke="#c99700" stroke-width=".6"/>' +
      '<path d="M80 6l1 2.2 2.4.3-1.8 1.6.5 2.4-2.1-1.2-2.1 1.2.5-2.4-1.8-1.6 2.4-.3Z" fill="#ffcc00" stroke="#c99700" stroke-width=".6"/><circle cx="66" cy="1" r="1.8" fill="#ffcc00"/></g>' +
    '</g></g></svg>';
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
function thudSound(at) {
  Snd.init(); var c = Snd.ctx; if (!c) return;
  var t0 = c.currentTime + at, o = c.createOscillator(), g = c.createGain();
  o.type = 'sine'; o.frequency.setValueAtTime(140, t0); o.frequency.exponentialRampToValueAtTime(48, t0 + 0.16);
  g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.5, t0 + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22);
  o.connect(g); g.connect(c.destination); o.start(t0); o.stop(t0 + 0.25);
}
var BIRD_SAYS = ['Quack!', 'Quack!', 'Quack!', 'Quack quack!', 'Quack! Keep going.', 'Quack! One more question?'];
function birdPoke(wrap, quiet) {
  var b = birdCfg(), two = false, oops = !quiet && Math.random() < 0.2;
  if (b.q && !quiet) { two = quackSound(); if (oops) thudSound(0.62); }
  buzz(oops ? [15, 600, 45] : 15);
  wrap.classList.remove('flap', 'oops', 'quack'); void wrap.offsetWidth; wrap.classList.add(oops ? 'oops' : 'flap', 'quack');
  clearTimeout(wrap._t); wrap._t = setTimeout(function () { wrap.classList.remove('flap', 'oops', 'quack'); }, oops ? 1800 : 900);
  if (oops) {   /* the scuff stays a few seconds after it gets up */
    wrap.classList.remove('scuffed'); void wrap.offsetWidth; wrap.classList.add('scuffed');
    clearTimeout(wrap._s); wrap._s = setTimeout(function () { wrap.classList.remove('scuffed'); }, 4300);
  }
  var bub = wrap.querySelector('.bird-bub');
  if (bub) {
    bub.textContent = oops ? 'Quack! Ow.' : two ? 'Quack quack!' : BIRD_SAYS[Math.floor(Math.random() * BIRD_SAYS.length)];
    bub.classList.add('on'); clearTimeout(bub._t); bub._t = setTimeout(function () { bub.classList.remove('on'); }, oops ? 1900 : 1500);
  }
}

/* A right answer: the duck hops and flaps. On a phone it hides while you answer, so it pops up
   from the corner for the hop and ducks back down. Silent, so it never talks over the answer sounds. */
function birdCheer() {
  var w = document.getElementById('bird'); if (!w || reduced || exam || !(birdCfg().show || songWantsDuck())) return;
  var peek = w.hidden && !document.documentElement.classList.contains('docked');
  if (w.hidden && !peek) return;
  if (peek) { w._peek = true; birdPlace(); w.classList.remove('peek'); void w.offsetWidth; w.classList.add('peek'); }
  w.classList.remove('flap', 'oops'); void w.offsetWidth; w.classList.add('flap');
  clearTimeout(w._t); w._t = setTimeout(function () { w.classList.remove('flap'); }, 900);
  clearTimeout(w._pk);
  if (w._peek) w._pk = setTimeout(function () { w._peek = false; w.classList.remove('peek'); birdPlace(); }, 1250);
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
  var fresh = [];
  birdCheck().forEach(function (a) { birdItemsFor(a.id).forEach(function (u) { fresh.push({ u: u, why: a.done }); }); });
  if (fresh.length) birdToast(fresh, 1500);
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
  songNames(b.name);
  var pic = document.getElementById('hb-pic');   /* keep the Summary card in step */
  if (pic) { var sv = pic.querySelector('svg'); if (sv) sv.outerHTML = birdSVG(b); pic.setAttribute('aria-label', 'Say hi to ' + b.name); var nm = document.querySelector('.hb-name'); if (nm) nm.textContent = b.name; }
  birdPlace();
}
/* Stay out of the way: hidden during mock exams, and while answering on a phone or with the formula sheet docked.
   Otherwise bottom right, above the answer bar, and on the left if the study timer sits in the right corner. */
function birdPlace() {
  var w = document.getElementById('bird'); if (!w) return;
  var b = birdCfg(), answering = !!(run && app.querySelector('.qcard')), inExam = !!(exam && document.querySelector('.bar') && !app.querySelector('.sum-top'));
  var hide = !(b.show || songWantsDuck()) || inExam || (answering && !w._peek && (window.innerWidth < 760 || document.documentElement.classList.contains('docked')));
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
    .filter(function (u) { return u.it.ach || u.it.xp > 0; });
}
function birdHas(it) { return it.ach ? !!(birdCfg().got || {})[it.ach] : it.xp <= totalXP(); }
function birdNext(t) {
  var xs = birdAll().filter(function (u) { return !u.it.ach && u.it.xp > t; }).sort(function (a, b) { return a.it.xp - b.it.xp; });
  return xs[0] || null;
}
function birdStats() {
  var s = { total: 0, best: 0, bestC: null, done: 0, all: true, ring1: false, ringAll: false, streak: G.streak || 0, mock: !!birdCfg().mock };
  COURSES.forEach(function (c) {
    var n = coreQ(c).length, k = solidN(c), f = n ? k / n : 0;
    s.total += k;
    if (f > s.best) { s.best = f; s.bestC = c; }
    if (f >= 1) s.done++; else s.all = false;
  });
  var live = ringCourses();
  Object.keys(G.xd || {}).forEach(function (day) {
    if (COURSES.some(function (c) { return closedOn(day, c.id); })) s.ring1 = true;
    if (live.every(function (c) { return closedOn(day, c.id); })) s.ringAll = true;
  });
  return s;
}
/* award any milestone reached; returns the newly earned ones */
function birdCheck() {
  var b = birdCfg(), got = b.got || (b.got = {}), st = birdStats(), fresh = [];
  BIRD_ACH.forEach(function (a) { if (!got[a.id] && a.test(st)) { got[a.id] = dayKey(); fresh.push(a); } });
  if (fresh.length) save();
  return fresh;
}
function birdItemsFor(achId) { return birdAll().filter(function (u) { return u.it.ach === achId; }); }
/* after XP is earned: one toast for whatever just unlocked, by XP or by milestone */
function birdAfter(before, delay) {
  var after = totalXP(), list = [];
  birdCheck().forEach(function (a) { birdItemsFor(a.id).forEach(function (u) { list.push({ u: u, why: a.done }); }); });
  birdAll().forEach(function (u) { if (!u.it.ach && u.it.xp > before && u.it.xp <= after) list.push({ u: u, why: u.it.xp.toLocaleString('en-CA') + ' XP earned.' }); });
  if (list.length) birdToast(list, delay);
}
function birdToast(list, delay) {
  setTimeout(function () {
    var b = birdCfg(), u = list[0].u;
    var look = { col: b.col, hat: b.hat, acc: b.acc }; look[u.k] = u.it.id;
    var t = h('div', 'toast bird-toast', '<span class="bt-pic">' + birdSVG(look) + '</span><span><b>New for ' + birdEsc(b.name) + ': ' + u.label + (list.length > 1 ? ' (+' + (list.length - 1) + ' more)' : '') + '</b><small>' + list[0].why + ' Dress up from the Summary page.</small></span>');
    document.body.appendChild(t);
    var w = document.getElementById('bird'); if (w && !w.hidden) birdPoke(w, true);
    setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 400); }, 3600);
  }, delay || 500);
}

/* ---------- Summary card and the dress-up panel ---------- */
function birdCardHTML() {
  var b = birdCfg(), t = totalXP(), nx = birdNext(t), prev = 0;
  birdAll().forEach(function (u) { if (!u.it.ach && u.it.xp <= t) prev = u.it.xp; });
  var gotN = Object.keys(b.got || {}).length;
  var pct = nx ? Math.round(100 * (t - prev) / (nx.it.xp - prev)) : 100;
  return '<section class="hl-card hl-bird" aria-label="Your duck">' +
    '<button type="button" class="hb-pic" id="hb-pic" aria-label="Say hi to ' + birdEsc(b.name) + '"><span class="bird-bub" role="status" aria-live="polite"></span>' + birdSVG(b) + '</button>' +
    '<div class="hb-main"><span class="hl-tag bdt">' + duckIcon() + 'Your duck</span><div class="hb-name">' + birdEsc(b.name) + '</div>' +
    '<p class="hl-s">' + t.toLocaleString('en-CA') + ' XP earned in total. ' + (nx ? 'Next: ' + nx.label + ' at ' + nx.it.xp.toLocaleString('en-CA') + ' XP.' : 'Every XP item is unlocked.') + ' ' + gotN + ' of ' + BIRD_ACH.length + ' milestones reached.</p>' +
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
  birdCheck();
  var b = birdCfg(), t = totalXP(), st = birdStats(), got = b.got || {};
  var opt = function (k, it) {
    var on = b[k] === it.id, lock = !birdHas(it), look = { col: b.col, hat: b.hat, acc: b.acc }, ach = it.ach && birdFind(BIRD_ACH, it.ach);
    look[k] = it.id;
    var pic = k === 'col' ? (it.grad ? '<span class="sw" style="background:linear-gradient(135deg,' + it.grad.join(',') + ')"></span>' : '<span class="sw" style="--a:' + it.body + ';--b:' + it.dark + '"></span>') : birdSVG(look, 'mini');
    return '<button type="button" class="bs-opt' + (on ? ' on' : '') + (lock ? ' locked' : '') + '" data-k="' + k + '" data-id="' + it.id + '" aria-pressed="' + on + '"' + (lock ? ' aria-disabled="true"' : '') + '>' +
      pic + '<span class="bs-n">' + it.name + '</span>' + (lock ? (ach ? '<span class="bs-x ach">' + lockIcon() + ach.label + '</span>' : '<span class="bs-x">' + lockIcon() + it.xp.toLocaleString('en-CA') + ' XP</span>') : (ach ? '<span class="bs-x won">Milestone</span>' : '')) + '</button>';
  };
  var grid = function (k, list) { return '<div class="bs-grid' + (k === 'col' ? ' cols' : '') + '">' + list.map(function (it) { return opt(k, it); }).join('') + '</div>'; };
  var m = overlay(
    '<div class="mhead"><div><h3>Dress up ' + birdEsc(b.name) + '</h3><p class="sheet-note">' + t.toLocaleString('en-CA') + ' XP earned in total, across every course. Things unlock as your XP grows and as you reach milestones. Nothing is spent.</p></div><button class="btn ghost" type="button" id="bs-x">Done</button></div>' +
    '<div class="bs-top"><button type="button" class="bs-big" id="bs-big" aria-label="Say hi"><span class="bird-bub" role="status" aria-live="polite"></span><span id="bs-pv">' + birdSVG(b) + '</span></button>' +
      '<div class="bs-side"><label class="bs-lab" for="bs-name">Name</label><input id="bs-name" class="bs-in" type="text" maxlength="16" autocomplete="off" spellcheck="false">' +
      '<div class="hl-li"><span>Quack sound</span><button class="tgl sw" type="button" id="bs-q" aria-pressed="' + b.q + '" aria-label="Quack sound"><i></i></button></div>' +
      '<div class="hl-li"><span>Show in the corner</span><button class="tgl sw" type="button" id="bs-show" aria-pressed="' + b.show + '" aria-label="Show the duck in the corner"><i></i></button></div></div></div>' +
    '<h4 class="bs-h">Feathers</h4>' + grid('col', BIRD_COLS) + '<h4 class="bs-h">Hat</h4>' + grid('hat', BIRD_HATS) + '<h4 class="bs-h">Extra</h4>' + grid('acc', BIRD_EXTRAS) +
    '<h4 class="bs-h">Milestones <span class="bs-cnt">' + Object.keys(got).length + ' of ' + BIRD_ACH.length + '</span></h4><p class="sheet-note">A question is mastered when it shows green. Fully mastering a course means every question in it is green.</p>' +
    '<div class="bs-ms">' + BIRD_ACH.map(function (a) {
      var ok = !!got[a.id], names = birdItemsFor(a.id).map(function (u) { return u.label; }).join(' and ');
      return '<div class="bs-m' + (ok ? ' ok' : '') + '"><span class="bs-mi" aria-hidden="true">' + (ok ? '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M5 12.5l4.5 4.5L19 7.5"/></svg>' : '') + '</span>' +
        '<span class="bs-mt"><b>' + a.label + '</b><small>' + (ok ? 'Done. Unlocked ' : (a.prog ? a.prog(st) + '. ' : '') + 'Unlocks ') + names + '.</small></span></div>';
    }).join('') + '</div>', 'wide bird-shop');
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
  name.addEventListener('input', function () { var v = name.value.replace(/\s+/g, ' ').trim(); b.name = v || 'Moxie'; b.named = true; save(); birdDraw(); });
  root.querySelector('#bs-big').addEventListener('click', function (e) { birdPoke(e.currentTarget); });
  [['#bs-q', 'q'], ['#bs-show', 'show']].forEach(function (p) {
    var el = root.querySelector(p[0]);
    el.addEventListener('click', function () { b[p[1]] = !b[p[1]]; el.setAttribute('aria-pressed', b[p[1]]); Snd.tap(); save(); birdDraw(); });
  });
  root.querySelector('#bs-x').addEventListener('click', m.close);
}

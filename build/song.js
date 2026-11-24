/* ============================================================
   SONG FOR A TREAT: the Settings row "Put Alfie on a good song for a treat" opens an envelope with a letter
   to write a song rec on. Send seals it and posts it to Alfie (one per device). A glowing cookie then appears
   by the duck; feeding it sets off a high double backflip, a splashdown and a thank-you bubble.
   SONG.via picks the delivery: 'formsubmit' (email), 'gform' (Google Form) or 'ntfy' (phone push).
   With no delivery set, or in a preview build, sending is pretended so the flow can be tried.
   ============================================================ */
var SONG = { via: 'formsubmit', url: 'https://formsubmit.co/ajax/8755916f7b7ac2b50eab0dea6e5cd1ea', fields: {}, preview: false, site: 'https://alfietaba.github.io/1A-Tron-Finals-Gym/' };
function songCfg() { if (!G.song || typeof G.song !== 'object') G.song = {}; return G.song; }
function songReady() { return SONG.preview || !!SONG.via; }
/* The Claude version runs in a sandbox that blocks requests to other sites, so it links to the public site instead */
function songSandboxed() { try { return window.self !== window.top && !/github\.io$/.test(location.hostname) && !/^(localhost|127\.0\.0\.1|)$/.test(location.hostname); } catch (e) { return true; } }

function songPost(rec, from) {
  if (SONG.preview || !SONG.via) return new Promise(function (ok) { setTimeout(ok, 700); });
  if (!window.fetch) return Promise.reject(new Error('This browser cannot send.'));
  var msg = rec + (from ? '\nFrom: ' + from : ''), p;
  if (SONG.via === 'ntfy') {
    p = fetch(SONG.url, { method: 'POST', body: msg, headers: { 'Title': 'Song rec from Finals Gym', 'Tags': 'musical_note' } });
  } else if (SONG.via === 'formsubmit') {
    p = fetch(SONG.url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ song: rec, from: from || 'Anonymous', _subject: 'Song rec from Finals Gym: ' + rec.slice(0, 60), _template: 'table', _captcha: 'false' }) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || String(j.success) === 'false') throw new Error('Not sent'); return r; }); });
  } else if (SONG.via === 'gform') {
    var fd = new FormData(); fd.append(SONG.fields.song, rec); if (SONG.fields.from) fd.append(SONG.fields.from, from || '');
    p = fetch(SONG.url, { method: 'POST', mode: 'no-cors', body: fd });   /* Google answers opaquely; reaching it counts */
  } else return Promise.reject(new Error('No delivery set up.'));
  var late = new Promise(function (ok, no) { setTimeout(function () { no(new Error('Timed out')); }, 15000); });
  return Promise.race([p, late]).then(function (r) { if (r && r.type !== 'opaque' && r.ok === false) throw new Error('HTTP ' + r.status); });
}

/* ---------- the Settings row ---------- */
function songRowHTML() {
  if (!songReady()) return '';
  var s = songCfg(), nm = '<span class="duck-nm">' + esc(birdCfg().name) + '</span>';
  var sub = s.sent ? (s.cookie ? 'Sent. Your cookie is waiting by ' + nm + '.' : 'Sent from this device. Thank you!') : 'Send me a song rec and ' + nm + ' gets a cookie.';
  return '<div class="hl-li sg-li"><span><span class="sg-lab">' + songEnvIcon() + 'Put Alfie on a good song for a treat</span><small>' + sub + '</small></span>' +
    '<button class="hl-link" type="button" id="sg-open"' + (s.sent ? ' disabled' : '') + '>' + (s.sent ? 'Sent' : 'Open') + '</button></div>';
}
function songEnvIcon() {
  return '<svg class="sg-ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 7l8.5 6.2L20.5 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
}
function songBind() {
  var b = document.getElementById('sg-open');
  if (b) b.addEventListener('click', function () { Snd.tap(); showSong(); });
}

/* ---------- the envelope ---------- */
function showSong() {
  var s = songCfg(), b = birdCfg();
  if (s.sent) return;
  if (!SONG.preview && songSandboxed()) {
    var q = overlay('<div class="sg"><h3>Put Alfie on a good song</h3><p>Songs send from the public site, so open it there. Your cookie shows up on that site too.</p>' +
      '<p class="sg-site"><a href="' + SONG.site + '#song" target="_blank" rel="noopener">' + SONG.site.replace(/^https:\/\//, '') + '</a></p>' +
      '<div class="aid-acts"><button class="btn" type="button" id="sg-x">Close</button></div></div>', 'sg-modal');
    q.m.querySelector('#sg-x').addEventListener('click', q.close);
    return;
  }
  var m = overlay(
    '<div class="sg">' +
      '<p class="lt-k sg-k">For a treat</p>' +
      '<h3>Put Alfie on a good song</h3>' +
      '<div class="env" id="sg-env">' +
        '<div class="env-back"></div>' +
        '<div class="env-flap"><i></i></div>' +
        '<form class="env-letter" id="sg-form" autocomplete="off" novalidate>' +
          '<p class="env-dear">Dear Alfie, you need to hear:</p>' +
          '<label class="sg-sr" for="sg-song">Song and artist</label>' +
          '<textarea id="sg-song" rows="2" maxlength="300" placeholder="Song – artist" required></textarea>' +
          '<label class="env-from"><span>From</span><input id="sg-from" maxlength="40" placeholder="your name (optional)"></label>' +
        '</form>' +
        '<div class="env-front"></div>' +
        '<div class="env-seal" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.9c0 5.4-7.5 10-7.5 10z" fill="#fff"/></svg></div>' +
      '</div>' +
      '<p class="sg-err" id="sg-err" role="alert"></p>' +
      '<div class="aid-acts sg-acts"><button class="btn ghost" type="button" id="sg-x">Not now</button><button class="btn sg-go" type="submit" form="sg-form" id="sg-go">Send</button></div>' +
      '<p class="sg-note">One per device. <span class="duck-nm">' + esc(b.name) + '</span> gets a cookie for it.</p>' +
    '</div>', 'sg-modal');
  m.m.setAttribute('aria-label', 'Put Alfie on a good song');
  var env = m.m.querySelector('#sg-env'), ta = m.m.querySelector('#sg-song'), from = m.m.querySelector('#sg-from');
  var err = m.m.querySelector('#sg-err'), go = m.m.querySelector('#sg-go'), x = m.m.querySelector('#sg-x'), busy = false;
  if (s.draft) ta.value = s.draft;
  ta.addEventListener('input', function () { s.draft = ta.value.slice(0, 300); err.textContent = ''; save(); });
  x.addEventListener('click', function () { if (!busy) m.close(); });
  setTimeout(function () { env.classList.add('open'); }, reduced ? 0 : 280);
  setTimeout(function () { if (env.isConnected) try { ta.focus({ preventScroll: true }); } catch (e) { ta.focus(); } }, reduced ? 50 : 1050);
  m.m.querySelector('#sg-form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (busy) return;
    var rec = ta.value.trim(), who = from.value.trim();
    if (rec.length < 2) { err.textContent = 'Write a song first.'; ta.focus(); return; }
    busy = true; go.disabled = true; x.disabled = true; go.textContent = 'Sending…'; err.textContent = '';
    Snd.tap(); buzz(12);
    env.classList.remove('open'); env.classList.add('sealed');
    var anim = new Promise(function (ok) { setTimeout(ok, reduced ? 200 : 1250); });
    Promise.all([songPost(rec, who), anim]).then(function () {
      s.sent = dayKey(); s.cookie = 1; delete s.draft; save();
      songWhoosh(); env.classList.add('away');
      setTimeout(function () {
        m.close();
        var y = window.scrollY; if (app.querySelector('.hl-top')) { showGym(); window.scrollTo(0, y); }
        songCookie(true);
      }, reduced ? 100 : 700);
    }, function () {
      busy = false; go.disabled = false; x.disabled = false; go.textContent = 'Try again';
      env.classList.remove('sealed'); env.classList.add('open');
      err.textContent = 'It didn\'t send. Check your connection and try again.';
    });
  });
}

/* ---------- the cookie and the backflip ---------- */
var songBusy = false;
function songWantsDuck() { var s = songCfg(); return !!s.cookie || songBusy; }
function songCookieSVG() {
  return '<svg viewBox="0 0 64 64" aria-hidden="true">' +
    '<circle cx="32" cy="33" r="26" fill="#b87333"/><circle cx="32" cy="31" r="25" fill="#e0a458"/>' +
    '<path d="M14 22c5-9 18-13 28-9" fill="none" stroke="#f5c98a" stroke-width="3" stroke-linecap="round" opacity=".8"/>' +
    '<g fill="#5b3a21"><ellipse cx="22" cy="27" rx="4" ry="3.3"/><ellipse cx="38" cy="20" rx="3.4" ry="2.8"/><ellipse cx="43" cy="35" rx="4.2" ry="3.4"/><ellipse cx="28" cy="42" rx="3.6" ry="3"/><ellipse cx="17" cy="38" rx="2.6" ry="2.2"/><ellipse cx="34" cy="31" rx="2.4" ry="2"/><ellipse cx="46" cy="25" rx="2" ry="1.7"/></g>' +
    '<g fill="#8a5a33" opacity=".5"><circle cx="26" cy="18" r="1"/><circle cx="48" cy="44" r="1.2"/><circle cx="38" cy="47" r="1"/><circle cx="12" cy="30" r="1"/></g></svg>';
}
function songCookie(fresh) {
  var s = songCfg(), w = document.getElementById('bird');
  if (!s.cookie || !w || w.querySelector('.sg-cookie')) return;
  var nm = birdCfg().name;
  var c = h('button', 'sg-cookie' + (fresh && !reduced ? ' pop' : ''), '<span class="sg-glow"></span>' + songCookieSVG() +
    '<i class="sg-tw" style="--d:0s;left:-6%;top:8%"></i><i class="sg-tw" style="--d:.7s;right:-4%;top:-6%"></i><i class="sg-tw" style="--d:1.3s;right:6%;bottom:-2%"></i>' +
    '<span class="sg-tip">Feed <span class="duck-nm">' + esc(nm) + '</span></span>');
  c.type = 'button';
  c.setAttribute('aria-label', 'A cookie from Alfie. Feed it to ' + nm + '.');
  w.insertBefore(c, w.firstChild); w.classList.add('has-cookie');
  birdPlace();
  if (fresh) { Snd.init(); if (G.snd && Snd.ctx) { Snd.tone(880, 0, 0.12, 'triangle', 0.1); Snd.tone(1318.5, 0.08, 0.25, 'triangle', 0.09); } buzz([10, 40, 10]); }
  c.addEventListener('click', function () { songFeed(c); });
}
function songFeed(c) {
  var s = songCfg(), w = document.getElementById('bird'), b = birdCfg();
  if (songBusy || !w) return;
  songBusy = true; s.cookie = 0; s.fed = 1; save();
  var btn = w.querySelector('.bird-btn'), jaw = w.querySelector('.bd-jaw'), bub = w.querySelector('.bird-bub');
  var done = function () {
    songBusy = false;
    w.classList.remove('sg-chomp', 'sg-flip', 'sg-land', 'has-cookie');
    var sp = w.querySelector('.sg-splash'); if (sp) sp.remove();
    birdPlace();
  };
  var thanks = function () {
    if (b.q) quackSound();
    if (bub) { bub.textContent = 'Thanks! – Alfie'; bub.classList.add('on', 'sg-thx'); clearTimeout(bub._t); bub._t = setTimeout(function () { bub.classList.remove('on', 'sg-thx'); }, 4600); }
  };
  if (reduced) { c.remove(); w.classList.remove('has-cookie'); thanks(); setTimeout(done, 400); return; }
  /* 1. the cookie flies into the beak */
  var cr = c.getBoundingClientRect(), jr = (jaw || btn).getBoundingClientRect();
  c.style.setProperty('--tx', (jr.left + jr.width / 2 - (cr.left + cr.width / 2)).toFixed(0) + 'px');
  c.style.setProperty('--ty', (jr.top + jr.height / 2 - (cr.top + cr.height / 2)).toFixed(0) + 'px');
  c.classList.remove('pop'); c.classList.add('eat'); c.disabled = true;
  /* 2. chomp, with crumbs */
  setTimeout(function () {
    c.remove(); w.classList.remove('has-cookie'); w.classList.add('sg-chomp');
    songMunch(); buzz([8, 60, 8, 60, 8]);
    songCrumbs(jaw || btn);
  }, 430);
  /* 3. a high double backflip */
  setTimeout(function () {
    w.classList.remove('sg-chomp'); w.classList.add('sg-flip');
    songSwish(0.1); buzz(20);
  }, 1150);
  /* 4. splashdown, then the thank-you */
  setTimeout(function () {
    w.classList.add('sg-land');
    songSplash(w); songSploosh(); buzz([30, 30, 50]);
  }, 1150 + 1360);
  setTimeout(thanks, 1150 + 1650);
  setTimeout(done, 1150 + 1650 + 4700);
}
function songCrumbs(el) {
  var r = el.getBoundingClientRect();
  for (var i = 0; i < 7; i++) {
    var k = h('i', 'sg-crumb');
    k.style.left = (r.left + r.width / 2 + (Math.random() * 14 - 7)).toFixed(0) + 'px';
    k.style.top = (r.top + r.height / 2).toFixed(0) + 'px';
    k.style.setProperty('--dx', (Math.random() * 44 - 22).toFixed(0) + 'px');
    k.style.setProperty('--dy', (30 + Math.random() * 30).toFixed(0) + 'px');
    k.style.animationDelay = (i * 0.06).toFixed(2) + 's';
    document.body.appendChild(k);
    (function (k) { setTimeout(function () { k.remove(); }, 1200); })(k);
  }
}
function songSplash(w) {
  var sp = h('div', 'sg-splash'), html = '<i class="sg-pool"></i><i class="sg-ring"></i><i class="sg-ring r2"></i>';
  for (var i = 0; i < 12; i++) {
    var a = -170 + i * (160 / 11) + (Math.random() * 8 - 4), d = 34 + Math.random() * 40, rad = a * Math.PI / 180;
    html += '<i class="sg-drop" style="--dx:' + (Math.cos(rad) * d).toFixed(0) + 'px;--dy:' + (Math.sin(rad) * (d + 20)).toFixed(0) + 'px;--s:' + (0.6 + Math.random() * 0.7).toFixed(2) + ';animation-delay:' + (Math.random() * 0.06).toFixed(2) + 's"></i>';
  }
  sp.innerHTML = html;
  w.appendChild(sp);
}

/* ---------- sounds (made on the fly, like the quack) ---------- */
function songNoise(at, dur, type, f0, f1, vol, q) {
  if (!G.snd) return; Snd.init(); var c = Snd.ctx; if (!c) return;
  var n = Math.ceil(c.sampleRate * dur), buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
  for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  var src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(), t0 = c.currentTime + at;
  src.buffer = buf; f.type = type; f.Q.value = q || 1;
  f.frequency.setValueAtTime(f0, t0); f.frequency.exponentialRampToValueAtTime(f1, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol, t0 + Math.min(0.02, dur / 4)); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(f); f.connect(g); g.connect(c.destination); src.start(t0); src.stop(t0 + dur + 0.02);
}
function songMunch() { [0, 0.2, 0.4].forEach(function (t) { songNoise(t, 0.09, 'bandpass', 2200, 900, 0.35, 1.2); }); }
function songSwish(at) { songNoise(at, 0.5, 'bandpass', 500, 2600, 0.12, 2); }
function songWhoosh() { songNoise(0, 0.45, 'bandpass', 2400, 500, 0.12, 1.5); }
function songSploosh() {
  songNoise(0, 0.55, 'lowpass', 3000, 260, 0.5, 0.7);
  if (!G.snd || !Snd.ctx) return;
  [0.08, 0.17, 0.27].forEach(function (t, i) { Snd.tone(520 + i * 140, t, 0.09, 'sine', 0.07, 1100 + i * 200); });
}
/* keep the duck's name in step everywhere when it is renamed in the shop */
function songNames(name) {
  document.querySelectorAll('.duck-nm').forEach(function (e) { e.textContent = name; });
  var c = document.querySelector('.sg-cookie'); if (c) c.setAttribute('aria-label', 'A cookie from Alfie. Feed it to ' + name + '.');
}
/* opened from a link like …/#song */
function songMaybeOpen() {
  if (location.hash === '#song' && songReady() && !songCfg().sent && (SONG.preview || !songSandboxed())) {
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* ignore */ }
    setTimeout(showSong, 400);
  }
}

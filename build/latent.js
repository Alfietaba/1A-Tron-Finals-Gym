/* ============================================================
   LATENT INVITE: a one-time pop-up on the Summary page inviting people to study with Alfie and the
   Tron group on Latent (an invite-only iPhone app). It can be opened again from Settings or the footer.
   ============================================================ */
var LATENT = { link: 'https://trylatent.co/i/XTC7JU', group: 'BKEBT2' };
function copyText(text, btn) {
  var done = function (ok) {
    if (!btn) return;
    var was = btn.getAttribute('data-label') || btn.textContent;
    btn.setAttribute('data-label', was);
    btn.textContent = ok ? 'Copied' : 'Select and copy it';
    setTimeout(function () { if (btn.isConnected) btn.textContent = was; }, 1800);
  };
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallback()); }); return; }
  } catch (e) { /* fall through */ }
  done(fallback());
  function fallback() {
    try { var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); var ok = document.execCommand('copy'); ta.remove(); return ok; }
    catch (e) { return false; }
  }
}
function showLatent() {
  G.latent = 1; save();
  var m = overlay(
    '<div class="lt">' +
    '<p class="lt-k">Invite only</p>' +
    '<h3>Study with me on Latent</h3>' +
    '<p>Latent is an iPhone app that films a timelapse while you study, logs your hours and streak, and shares your sessions with friends. Knowing the Tron group can see when I\'m studying is what gets me to start.</p>' +
    '<div class="lt-list">' +
      '<div class="lt-li"><span class="lt-lab">1. Copy this link into the app to get in</span><div class="lt-val"><code>' + LATENT.link + '</code><button class="lt-copy" type="button" id="lt-cl">Copy</button></div></div>' +
      '<div class="lt-li"><span class="lt-lab">2. Join the Tron group with this code</span><div class="lt-val"><code class="big">' + LATENT.group + '</code><button class="lt-copy" type="button" id="lt-cg">Copy</button></div></div>' +
    '</div>' +
    '<p class="lt-note">Finals Gym updates as new course material is posted, so check back before each exam. <a href="' + LATENT.link + '" target="_blank" rel="noopener">Open the invite page</a></p>' +
    '<div class="aid-acts"><button class="btn" type="button" id="lt-x">Maybe later</button></div>' +
    '</div>', 'lt-modal');
  m.m.setAttribute('aria-label', 'Study with me on Latent');
  m.m.querySelector('#lt-cl').addEventListener('click', function (e) { Snd.tap(); copyText(LATENT.link, e.currentTarget); });
  m.m.querySelector('#lt-cg').addEventListener('click', function (e) { Snd.tap(); copyText(LATENT.group, e.currentTarget); });
  m.m.querySelector('#lt-x').addEventListener('click', m.close);
  try { m.m.querySelector('#lt-x').focus({ preventScroll: true }); } catch (e) { /* older browsers */ }
  m.m.scrollTop = 0;
}
/* shown once per browser, a few seconds after the Summary page first opens, and only if you are still there */
var latentArmed = false;
function latentMaybe() {
  if (latentArmed || G.latent) return;
  latentArmed = true;
  setTimeout(function () {
    if (G.latent || CUR || run || exam || document.querySelector('.overlay') || !app.querySelector('.hl-top')) return;
    showLatent();
  }, 6000);
}

/* =========== Small JS for interactions =========== */

document.getElementById('year').textContent = new Date().getFullYear();

/* NAV toggle behavior for mobile */
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
const desktopNav = document.querySelector('.desktop-nav');

function updateMobileNavVisibility(){
  const isMobile = window.matchMedia('(max-width:899px)').matches;
  if(isMobile){
    // hide desktop nav, show toggle + mobileNav based on state
    desktopNav.style.display = 'none';
    navToggle.style.display = '';
    // mobileNav is toggled by button
  } else {
    desktopNav.style.display = 'flex';
    navToggle.style.display = 'none';
    mobileNav.style.display = 'none';
    navToggle.setAttribute('aria-expanded','false');
    mobileNav.setAttribute('aria-hidden','true');
  }
}
updateMobileNavVisibility();
window.addEventListener('resize', updateMobileNavVisibility);

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  if(!expanded){
    mobileNav.style.display = 'block';
    mobileNav.setAttribute('aria-hidden','false');
  } else {
    mobileNav.style.display = 'none';
    mobileNav.setAttribute('aria-hidden','true');
  }
});

/* Smooth scroll for nav links */
document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', (e) => {
    // internal link
    const href = a.getAttribute('href');
    if(href && href.startsWith('#')){
      e.preventDefault();
      const target = document.querySelector(href);
      if(target){
        const headerOffset = 10 + document.querySelector('.site-header').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior:'smooth'});
      }
    }
    // close mobile nav after selection
    if(window.matchMedia('(max-width:899px)').matches){
      mobileNav.style.display = 'none';
      navToggle.setAttribute('aria-expanded','false');
      mobileNav.setAttribute('aria-hidden','true');
    }
  });
});

/* Active nav highlighting on scroll */
const sectionIds = ['cover','about','music','contact'];
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

function pickActive() {
  const fromTop = window.scrollY + document.querySelector('.site-header').offsetHeight + 30;
  let current = 'cover';
  for(const id of sectionIds){
    const el = document.getElementById(id);
    if(el && el.offsetTop <= fromTop) current = id;
  }
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', pickActive);
window.addEventListener('resize', pickActive);
pickActive();

/* Contact form: by default prevent actual submit and show a simple alert;
   Replace handleContactSubmit with a real POST to your server or integration. */
function handleContactSubmit(e){
  e.preventDefault();
  const nm = document.getElementById('name').value.trim();
  const em = document.getElementById('email').value.trim();
  const msg = document.getElementById('message').value.trim();
  // Basic validation
  if(!nm || !em || !msg){ alert('Please fill all fields.'); return; }
  // Example: open default mail app (uncomment if you prefer)
  // window.location.href = `mailto:booking@example.com?subject=${encodeURIComponent('Contact from '+nm)}&body=${encodeURIComponent(msg + '\\n\\nFrom: ' + nm + ' ('+em+')')}`;

  // For now show a friendly message (replace with fetch to your backend)
  alert('Thanks! Your message was received (demo). Replace handleContactSubmit with your server-side POST to make this live.');
  e.target.reset();
}

/* Music: Add tracks client-side (dev helper only) */
const addBtn = document.getElementById('addTrackBtn');
const tracksList = document.getElementById('tracksList');
addBtn && addBtn.addEventListener('click', () => {
  const src = document.getElementById('newTrackSrc').value.trim();
  const title = document.getElementById('newTrackTitle').value.trim() || 'New Track';
  if(!src) return alert('Enter a path to the audio file (e.g. /audio/track3.mp3).');
  const id = Date.now();
  const article = document.createElement('article');
  article.className = 'track';
  article.setAttribute('data-track-id', id);
  article.innerHTML = `
    <div class="track-info">
      <p class="track-title" contenteditable="true">${escapeHtml(title)}</p>
      <p class="track-meta" contenteditable="true">— • —</p>
      <audio controls preload="metadata" src="${escapeHtml(src)}">Your browser does not support the audio element.</audio>
    </div>
  `;
  tracksList.appendChild(article);
  document.getElementById('newTrackSrc').value = '';
  document.getElementById('newTrackTitle').value = '';
});

/* small helper to avoid injection in innerHTML builder */
function escapeHtml(str){
  return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

/* Accessibility: allow enter on contenteditable h2 to blur */
document.querySelectorAll('h2[contenteditable="true"]').forEach(h => {
  h.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){ e.preventDefault(); h.blur(); }
  });
});

/* OPTIONAL: If you have a separate animation file, you can initialize it here.
   For example, if your animation script expects an element with id "logo-animation",
   it will find #logo-animation inside the cover. Example stub:

(function initUserAnimation(){
  // If you include another script that defines window.initLogoAnimation(element) it can be called:
  if(window.initLogoAnimation && typeof window.initLogoAnimation === 'function'){
    const el = document.getElementById('logo-animation');
    try{ window.initLogoAnimation(el); }catch(err){ console.warn('Logo animation error', err); }
  }
})();

Place your animation JS file after this script or modify to suit.
*/

/* End of script */
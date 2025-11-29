/* =========== Small JS for interactions =========== */

// Get current year for footer or other display
document.getElementById('year').textContent = new Date().getFullYear();

// Define necessary DOM elements
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
const desktopNav = document.querySelector('.desktop-nav');
const siteHeader = document.querySelector('.site-header'); // Cached for performance

/**
 * Updates the visibility of the mobile vs. desktop navigation based on screen width.
 */
function updateMobileNavVisibility(){
  const isMobile = window.matchMedia('(max-width:899px)').matches;

  if(isMobile){
    // hide desktop nav, show toggle
    if (desktopNav) desktopNav.style.display = 'none';
    if (navToggle) navToggle.style.display = '';
    // mobileNav state is managed by the toggle button click handler
  } else {
    // Show desktop nav, hide toggle and mobile nav
    if (desktopNav) desktopNav.style.display = 'flex';
    if (navToggle) {
      navToggle.style.display = 'none';
      navToggle.setAttribute('aria-expanded','false');
    }
    if (mobileNav) {
      mobileNav.style.display = 'none';
      mobileNav.setAttribute('aria-hidden','true');
    }
  }
}

// Initialize on load and update on resize
updateMobileNavVisibility();
window.addEventListener('resize', updateMobileNavVisibility);

/**
 * Toggle behavior for the mobile navigation button.
 */
if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    const newState = String(!expanded);

    navToggle.setAttribute('aria-expanded', newState);

    if(!expanded){
      mobileNav.style.display = 'block';
      mobileNav.setAttribute('aria-hidden','false');
    } else {
      mobileNav.style.display = 'none';
      mobileNav.setAttribute('aria-hidden','true');
    }
  });
}

/**
 * Smooth scroll for navigation links, with fix for mobile positioning.
 */
document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');

    // Only handle internal links starting with #
    if(href && href.startsWith('#')){
      e.preventDefault();
      const target = document.querySelector(href);

      if(target && siteHeader){
        const isMobile = window.matchMedia('(max-width:899px)').matches;

        // **FIX: Close mobile nav BEFORE calculating position and scrolling.**
        if(isMobile && mobileNav && navToggle){
          mobileNav.style.display = 'none';
          navToggle.setAttribute('aria-expanded','false');
          mobileNav.setAttribute('aria-hidden','true');
        }

        // Calculate the offset (header height + a little padding)
        const headerOffset = 10 + siteHeader.offsetHeight;

        // Calculate the final scroll position
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;

        // Scroll smoothly
        window.scrollTo({ top, behavior:'smooth'});
      }
    }
  });
});

/**
 * Active navigation highlighting on scroll.
 */
const sectionIds = ['cover','about','music','albumart','reachout'];
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

function pickActive() {
  if (!siteHeader) return;

  const fromTop = window.scrollY + siteHeader.offsetHeight + 10;
  let current = 'cover';

  // Find the highest section whose top edge is less than or equal to the 'fromTop' line
  for(const id of sectionIds){
    const el = document.getElementById(id);
    if(el && el.offsetTop <= fromTop) {
      current = id;
    }
  }

  // Apply 'active' class to the corresponding link
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', pickActive);
window.addEventListener('resize', pickActive);
pickActive(); // Initial call to set active link

/**
 * Handle contact form submission (demo).
 * Replace this function with a real POST to your server or integration.
 */
// Ensure the function is accessible globally if called from HTML: <form onsubmit="handleContactSubmit(event)">
window.handleContactSubmit = function(e){
  e.preventDefault();

  const nm = document.getElementById('name')?.value.trim();
  const em = document.getElementById('email')?.value.trim();
  const msg = document.getElementById('message')?.value.trim();

  // Basic validation
  if(!nm || !em || !msg){
    alert('Please fill all fields.');
    return;
  }

  // For now show a friendly message (replace with fetch to your backend)
  alert('Thanks! Your message was received.');
  e.target.reset();
}


/* Music: Add tracks client-side (dev helper only) */
const addBtn = document.getElementById('addTrackBtn');
const tracksList = document.getElementById('tracksList');

if (addBtn && tracksList) {
  addBtn.addEventListener('click', () => {
    const srcInput = document.getElementById('newTrackSrc');
    const titleInput = document.getElementById('newTrackTitle');

    const src = srcInput?.value.trim();
    const title = titleInput?.value.trim() || 'New Track';

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

    if(srcInput) srcInput.value = '';
    if(titleInput) titleInput.value = '';
  });
}

/**
 * Small helper function to escape HTML for safety when building innerHTML.
 * @param {string} str - The string to escape.
 * @returns {string} The escaped string.
 */
function escapeHtml(str){
  if (typeof str !== 'string') return str;
  return str.replace(/[&<>"']/g, m => ({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    "'":'&#39;'
  }[m]));
}

/**
 * Accessibility: allow 'Enter' key on contenteditable h2 elements to blur (stop editing).
 */
document.querySelectorAll('h2[contenteditable="true"]').forEach(h => {
  h.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      h.blur();
    }
  });
});

/* OPTIONAL: Animation initialization stub (keep if needed) */
(function initUserAnimation(){
  if(window.initLogoAnimation && typeof window.initLogoAnimation === 'function'){
    const el = document.getElementById('logo-animation');
    try{ window.initLogoAnimation(el); }catch(err){ console.warn('Logo animation error', err); }
  }
})();

/* End of script */

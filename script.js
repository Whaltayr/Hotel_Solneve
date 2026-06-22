/* ═══════════════════════════════════════
   NAVBAR SCROLL
═══════════════════════════════════════ */
const navbar = document.getElementById('navbar');
function onScroll() {
  navbar.classList.toggle('is-scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ═══════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════ */
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
let menuOpen = false;

function toggleMenu() {
  menuOpen = !menuOpen;
  burger.classList.toggle('is-open', menuOpen);
  drawer.classList.toggle('is-open', menuOpen);
  burger.setAttribute('aria-expanded', menuOpen);
  drawer.setAttribute('aria-hidden', !menuOpen);
  if (menuOpen) closeAllLangs();
}

/* ═══════════════════════════════════════
   LANGUAGE DROPDOWN
═══════════════════════════════════════ */
const langDropdown = document.getElementById('langDropdown');
const langDropdownMobile = document.getElementById('langDropdownMobile');
let langOpen = false;
let langOpenMobile = false;

function toggleLang(e) {
  e.stopPropagation();
  langOpen = !langOpen;
  if (langDropdown) {
    langDropdown.classList.toggle('is-open', langOpen);
    langDropdown.querySelector('.lang-toggle').setAttribute('aria-expanded', langOpen);
  }
  if (langOpen) closeLangMobile();
}

function toggleLangMobile(e) {
  e.stopPropagation();
  langOpenMobile = !langOpenMobile;
  if (langDropdownMobile) {
    langDropdownMobile.classList.toggle('is-open', langOpenMobile);
    langDropdownMobile.querySelector('.lang-toggle').setAttribute('aria-expanded', langOpenMobile);
  }
  if (langOpenMobile) closeLangDesktop();
}

function closeLangDesktop() {
  langOpen = false;
  if (langDropdown) langDropdown.classList.remove('is-open');
}
function closeLangMobile() {
  langOpenMobile = false;
  if (langDropdownMobile) langDropdownMobile.classList.remove('is-open');
}
function closeAllLangs() {
  closeLangDesktop();
  closeLangMobile();
}

document.addEventListener('click', () => closeAllLangs());

[langDropdown, langDropdownMobile].forEach(dd => {
  if (dd) dd.addEventListener('click', e => e.stopPropagation());
});

function setLang(code) {
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('is-active', opt.dataset.lang === code);
  });
  const label = document.getElementById('currentLang');
  const mobileLabel = document.getElementById('currentLangMobile');
  if (label) label.textContent = code.toUpperCase();
  if (mobileLabel) mobileLabel.textContent = code.toUpperCase();
  closeAllLangs();
  localStorage.setItem('solneve-lang', code);
}

const savedLang = localStorage.getItem('solneve-lang');
if (savedLang) setLang(savedLang);

/* ═══════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════ */
function scrollToSection(e, href) {
  if (e && e.preventDefault) e.preventDefault();
  const el = document.querySelector(href);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    if (menuOpen) toggleMenu();
  }
}

/* ═══════════════════════════════════════
   GALLERY SCROLL
═══════════════════════════════════════ */
function scrollGallery(dir) {
  const track = document.getElementById('galleryTrack');
  if (track) track.scrollBy({ left: dir * 340, behavior: 'smooth' });
}

/* ═══════════════════════════════════════
   FAQ ACCORDION
═══════════════════════════════════════ */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('is-open');
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('is-open');
    const trigger = el.querySelector('.faq-trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    item.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

/* ═══════════════════════════════════════
   INTERSECTION OBSERVER (fade-in)
═══════════════════════════════════════ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.anim-up').forEach(el => observer.observe(el));
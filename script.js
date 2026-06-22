
/* Gallery scroll */
function scrollGallery(dir) {
  const track = document.getElementById('galleryTrack');
  if (!track) return;
  track.scrollBy({ left: dir * 340, behavior: 'smooth' });
}

/* FAQ accordion */
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('is-open');
  // close all
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('is-open');
    el.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
  });
  // open clicked if was closed
  if (!isOpen) {
    item.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

/* IntersectionObserver fade-in */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.anim-up').forEach(el => observer.observe(el));


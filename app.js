// Navbar scroll effect
const nb = document.getElementById('navbar');
window.addEventListener('scroll', () => nb.classList.toggle('scrolled', scrollY > 20));

// Mobile menu toggle
function toggleMenu() {
  document.getElementById('mMenu').classList.toggle('open');
}

// Scroll reveal
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.fu').forEach(el => obs.observe(el));

// Hero instant reveal
setTimeout(() => {
  document.querySelectorAll('#hero .fu').forEach(el => el.classList.add('visible'));
}, 150);

// Counter animation for stats
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const dur = 2000;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val = target * ease;
    el.innerHTML = prefix + (Number.isInteger(target) ? Math.round(val) : val.toFixed(1)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && e.target.dataset.target !== undefined) {
      animateCounter(e.target);
      statObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => statObs.observe(el));

// CTA form submit handler
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('book-btn');
  btn.innerHTML = '\u2713 Demo Booked!';
  btn.style.background = 'linear-gradient(135deg,#10B981,#059669)';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = 'Book Demo';
    btn.style.background = '';
    btn.disabled = false;
    document.getElementById('cta-email').value = '';
  }, 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const el = document.querySelector(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// Parallax hero blobs on mouse move
window.addEventListener('mousemove', (e) => {
  const blobs = document.querySelectorAll('#hero .blob');
  const x = (e.clientX / innerWidth - 0.5) * 20;
  const y = (e.clientY / innerHeight - 0.5) * 20;
  blobs.forEach((b, i) => {
    const f = (i + 1) * 0.5;
    b.style.transform = 'translate(' + (x * f) + 'px,' + (y * f) + 'px)';
  });
});

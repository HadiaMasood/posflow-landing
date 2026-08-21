// Navbar Scroll Effect
const nb = document.getElementById('navbar');
window.addEventListener('scroll', () => nb.classList.toggle('scrolled', window.scrollY > 20));

// Mobile Menu Toggle
function toggleMenu() {
  document.getElementById('mMenu').classList.toggle('open');
}

// Scroll Reveal
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.fu').forEach(el => obs.observe(el));

// Hero Instant Reveal
setTimeout(() => {
  document.querySelectorAll('#hero .fu').forEach(el => el.classList.add('visible'));
}, 100);

// Counter Animation for Stats
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

// Interactive Mockup Tab Switcher
function switchMockupTab(tabId, btn) {
  document.querySelectorAll('.ui-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  document.querySelectorAll('.window-body .tab-content').forEach(c => c.classList.remove('active'));
  const targetTab = document.getElementById('tab-' + tabId);
  if (targetTab) targetTab.classList.add('active');

  const statusDot = document.getElementById('mockupStatusDot');
  if (tabId === 'offline-sync') {
    statusDot.textContent = '📡 Offline Mode (Local Cache)';
    statusDot.style.color = '#F59E0B';
    statusDot.style.background = 'rgba(245,158,11,0.15)';
  } else {
    statusDot.textContent = '● Online Mode';
    statusDot.style.color = '#10B981';
    statusDot.style.background = 'rgba(16,185,129,0.12)';
  }
}

// Interactive Feature Group Switcher
function switchFeatureGroup(groupId, btn) {
  document.querySelectorAll('.ft-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  document.querySelectorAll('.feat-tab-content').forEach(c => c.classList.remove('active'));
  const targetGroup = document.getElementById('fg-' + groupId);
  if (targetGroup) targetGroup.classList.add('active');
}

// POS Screen Simulation Click Handler
function triggerCheckoutSim() {
  alert('📡 NFC Tap Payment Approved!\nTransaction #1042 (.44) processed in 0.4s.');
}

// CTA Form Handler
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('book-btn');
  btn.innerHTML = '\u2713 Demo Booked!';
  btn.style.background = 'linear-gradient(135deg,#10B981,#059669)';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = 'Get Free Demo';
    btn.style.background = '';
    btn.disabled = false;
    document.getElementById('cta-email').value = '';
  }, 3000);
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

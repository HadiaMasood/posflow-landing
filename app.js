// ─── NAVBAR SCROLL ───────────────────────────────────────────────
const nb = document.getElementById('navbar');
window.addEventListener('scroll', () => nb.classList.toggle('scrolled', window.scrollY > 20));

// ─── MOBILE MENU ─────────────────────────────────────────────────
function toggleMenu() {
  document.getElementById('mMenu').classList.toggle('open');
}

// ─── SCROLL REVEAL (INTERSECTION OBSERVER) ────────────────────────
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.fu').forEach(el => obs.observe(el));

// Hero instant reveal
setTimeout(() => {
  document.querySelectorAll('#hero .fu').forEach(el => el.classList.add('visible'));
}, 100);

// ─── COUNTER ANIMATION ────────────────────────────────────────────
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const dur = 2000;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val = target * ease;
    const formatted = Number.isInteger(target)
      ? Math.round(val).toLocaleString()
      : val.toFixed(1);
    el.textContent = formatted + suffix;
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

// ─── STICKY BOOK DEMO BUTTON ──────────────────────────────────────
const stickyBtn = document.getElementById('stickyBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    stickyBtn.classList.add('visible');
  } else {
    stickyBtn.classList.remove('visible');
  }
});

// ─── INDUSTRY SEGMENTATION PILLS ─────────────────────────────────
function selectIndustry(industry, btn) {
  // Update active pill
  document.querySelectorAll('.industry-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');

  // Show correct panel
  document.querySelectorAll('.industry-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('panel-' + industry);
  if (panel) {
    panel.classList.add('active');
    // Re-trigger animations for panel items
    panel.querySelectorAll('.fu').forEach(el => {
      el.classList.remove('visible');
      setTimeout(() => el.classList.add('visible'), 50);
    });
  }
}

// ─── FEATURE GROUP SWITCHER ───────────────────────────────────────
function switchFeatureGroup(groupId, btn) {
  document.querySelectorAll('.ft-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.feat-tab-content').forEach(c => c.classList.remove('active'));
  const targetGroup = document.getElementById('fg-' + groupId);
  if (targetGroup) targetGroup.classList.add('active');
}

// ─── VIDEO MODAL ──────────────────────────────────────────────────
function openVideoModal() {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('demoVideo');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (video) { video.currentTime = 0; video.play(); }
}

function closeVideoModal(event) {
  if (event && event.target !== document.getElementById('videoModal') && event.type !== 'click') return;
  if (event && event.currentTarget === document.getElementById('videoModal') && event.target !== event.currentTarget) return;
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('demoVideo');
  modal.classList.remove('open');
  document.body.style.overflow = '';
  if (video) video.pause();
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeVideoModal();
});

// ─── CTA FORM HANDLER ─────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('book-btn');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Demo Booked! We'll be in touch.`;
  btn.style.background = 'linear-gradient(135deg,#10B981,#059669)';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
    btn.disabled = false;
    document.getElementById('cta-email').value = '';
  }, 4000);
}

// ─── SMOOTH SCROLL ────────────────────────────────────────────────
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

// ─── VIDEO THUMB ANIMATION ────────────────────────────────────────
// Animate chart bars on scroll
const chartBars = document.querySelectorAll('.vt-bar');
const chartObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      chartBars.forEach((bar, i) => {
        const h = bar.style.height;
        bar.style.height = '0';
        setTimeout(() => { bar.style.height = h; }, i * 80);
      });
      chartObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const chartEl = document.querySelector('.vt-chart');
if (chartEl) chartObs.observe(chartEl);

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Animated skill progress rings ----------
const CIRCUMFERENCE = 2 * Math.PI * 42; // r = 42, matches SVG circles

const ringObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const ring = entry.target;
    const percent = parseInt(ring.dataset.percent, 10) || 0;
    const fg = ring.querySelector('.ring-fg');
    const valueLabel = ring.querySelector('.skill-ring__value');
    const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

    fg.style.strokeDashoffset = offset;

    // count up the number label
    let current = 0;
    const step = Math.max(1, Math.round(percent / 30));
    const tick = setInterval(() => {
      current = Math.min(percent, current + step);
      valueLabel.textContent = current + '%';
      if (current >= percent) clearInterval(tick);
    }, 20);

    ringObserver.unobserve(ring);
  });
}, { threshold: 0.4 });

document.querySelectorAll('.skill-ring').forEach(ring => ringObserver.observe(ring));

// ---------- Footer year ----------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

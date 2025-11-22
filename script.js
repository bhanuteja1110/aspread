// Basic UI behaviours, progressive enhancement
document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Add loaded class for subtle reveals (only when user hasn't requested reduced motion)
  if (!prefersReduced) {
    requestAnimationFrame(() => document.body.classList.add('loaded'));
  } else {
    document.body.classList.add('loaded');
  }

  // Smooth internal link scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.style.display = expanded ? '' : 'flex';
      mainNav.style.flexDirection = 'column';
      mainNav.style.gap = '12px';
      mainNav.style.paddingTop = '12px';
    });
  }

  // Small pointer-based parallax for logo preview (non-essential)
  const logoWrap = document.querySelector('[data-logo-preview]');
  if (logoWrap && !prefersReduced) {
    const limit = 12;
    document.addEventListener('pointermove', (e) => {
      const midX = window.innerWidth / 2;
      const midY = window.innerHeight / 2;
      const dx = (e.clientX - midX) / midX;
      const dy = (e.clientY - midY) / midY;
      const tx = Math.max(-limit, Math.min(limit, dx * limit));
      const ty = Math.max(-limit, Math.min(limit, dy * limit));
      logoWrap.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    });

    // reset on leave
    document.addEventListener('pointerleave', () => {
      logoWrap.style.transform = '';
    });
  }
});

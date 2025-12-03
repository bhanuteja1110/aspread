// Basic UI behaviours, progressive enhancement
document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Add loaded class for subtle reveals (respect reduced motion)
  if (!prefersReduced) {
    requestAnimationFrame(() => document.body.classList.add('loaded'));
  } else {
    document.body.classList.add('loaded');
  }

  // Smooth internal link scroll + close mobile nav on click
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Close mobile nav if open
        if (mainNav && mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Mobile nav toggle (uses .open class, handled in CSS)
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      const next = !expanded;
      navToggle.setAttribute('aria-expanded', String(next));
      mainNav.classList.toggle('open', next);
    });
  }

  // Small pointer-based parallax for logo preview (non-essential)
  const logoWrap = document.querySelector('[data-logo-preview]');
  if (logoWrap && !prefersReduced && window.matchMedia('(pointer:fine)').matches) {
    const limit = 12;

    document.addEventListener('pointermove', (e) => {
      const rect = logoWrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;

      const tx = Math.max(-limit, Math.min(limit, dx * limit * 2));
      const ty = Math.max(-limit, Math.min(limit, dy * limit * 2));

      logoWrap.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    });

    document.addEventListener('pointerleave', () => {
      logoWrap.style.transform = '';
    });
  }

  // Scroll-based reveal / glow for cards
  const revealEls = document.querySelectorAll('.card-ghost, .work-card');
  if ('IntersectionObserver' in window && revealEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.25 }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    revealEls.forEach((el) => el.classList.add('revealed'));
  }
});

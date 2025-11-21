// base enhancements and small UI behaviours
document.addEventListener('DOMContentLoaded', () => {
  // respect reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // optional brand reveal
  const brandTitle = document.querySelector('.brand-title');
  if (brandTitle && !prefersReduced) {
    brandTitle.style.opacity = 0;
    brandTitle.style.transform = 'translateY(6px)';
    setTimeout(() => {
      brandTitle.style.transition = 'opacity 560ms ease, transform 560ms ease';
      brandTitle.style.opacity = 1;
      brandTitle.style.transform = 'translateY(0)';
    }, 240);
  }

  // small smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

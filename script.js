// script.js - small enhancements: type-reveal + prefers-reduced-motion support

document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const brand = document.querySelector('.brand');
  const wave = document.querySelector('.wave');

  // optional simple type-reveal on brand text
  if (!prefersReduced) {
    brand.style.opacity = 0;
    brand.style.transform = 'translateY(6px)';
    setTimeout(() => {
      brand.style.transition = 'opacity 600ms ease, transform 600ms ease';
      brand.style.opacity = 1;
      brand.style.transform = 'translateY(0)';
    }, 400);
  } else {
    brand.style.opacity = 1;
  }

  // small waving delay offsets for nicer look
  wave.style.animationDelay = '120ms';

  // "Learn more" smooth scroll placeholder example (no other sections now)
  const learn = document.getElementById('learn-more');
  learn.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Thanks — you'll expand this page soon. For now, your site is live!");
  });
});

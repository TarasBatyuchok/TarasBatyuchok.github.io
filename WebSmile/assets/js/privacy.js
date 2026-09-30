import { createGrid } from './grid.js';
import { setupReveal } from './reveal.js';

function setupPrivacyPage() {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const grid = createGrid(document.querySelector('#background'));
  let frame = 0;
  function animate() {
    grid.draw();
    frame = requestAnimationFrame(animate);
  }
  function resize() { grid.resize(); grid.draw(); }
  function updateMotion() {
    cancelAnimationFrame(frame);
    grid.draw();
    if (!reducedMotion.matches) frame = requestAnimationFrame(animate);
  }
  window.addEventListener('resize', resize);
  reducedMotion.addEventListener('change', updateMotion);
  const menu = document.querySelector('.header__menu-toggle');
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  setupReveal(reducedMotion);
  resize();
  updateMotion();
}

setupPrivacyPage();

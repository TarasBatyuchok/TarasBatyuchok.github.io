import { createGrid } from './grid.js';
import { createTerrain } from './terrain.js';
import { createBridges } from './bridges.js';
import { setupNavigation } from './navigation.js?v=restored-original-1';
import { setupMusic } from './music.js?v=language-switch-1';
import { setupReveal } from './reveal.js';
import { setupFaq } from './faq.js';
import { setupContactForm } from './contact-form.js?v=organized-1';
import { setupLanguage } from './i18n/switcher.js?v=organized-1';

// The entry point only connects independent parts of the page.
async function startApp() {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const grid = createGrid(document.querySelector('#background'));
  const terrain = createTerrain(document.querySelector('#terrain'));
  const bridgesPromise = createBridges(); // Image loading happens in parallel.
  let bridges;
  let animationFrame = 0;

  setupNavigation(reducedMotion);
  setupMusic(document.querySelector('.header__sound-toggle'));
  setupReveal(reducedMotion);
  setupFaq(reducedMotion);
  setupContactForm();
  setupLanguage();

  function draw(time) {
    grid.draw();
    terrain.draw(time);
    bridges?.draw(time);
  }

  function animate(now) {
    draw(now / 1000);
    animationFrame = requestAnimationFrame(animate);
  }

  function updateMotion() {
    cancelAnimationFrame(animationFrame);
    draw(reducedMotion.matches ? 0 : performance.now() / 1000);
    if (!reducedMotion.matches) animationFrame = requestAnimationFrame(animate);
  }

  function resize() {
    grid.resize();
    terrain.resize();
    bridges?.resize();
    updateMotion();
  }

  window.addEventListener('resize', resize);
  new ResizeObserver(resize).observe(document.querySelector('#terrain'));
  reducedMotion.addEventListener('change', updateMotion);
  resize();

  try {
    bridges = await bridgesPromise;
    bridges.resize();
    updateMotion();
  } catch (error) {
    console.error('Хвиля не завантажилась:', error);
  }
}

startApp().catch(error => console.error('Не вдалося запустити сайт:', error));

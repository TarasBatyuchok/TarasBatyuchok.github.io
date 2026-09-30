export function setupNavigation(reducedMotion) {
  const menuButton = document.querySelector('.header__menu-toggle');
  const navLinks = [...document.querySelectorAll('.header__nav-link')];
  let navFrame = 0;

  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', { en: 'Open menu', uk: 'Відкрити меню', pl: 'Otwórz menu' }[document.documentElement.lang] || 'Open menu');
  }

  function updateCurrentSection() {
    navFrame = 0;
    const position = window.scrollY + 150;
    const current = [...navLinks].reverse().find(link =>
      document.querySelector(link.getAttribute('href')).offsetTop <= position);
    navLinks.forEach(link => {
      if (link === current && position < document.querySelector('#contact').offsetTop) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  window.addEventListener('scroll', () => {
    if (!navFrame) navFrame = requestAnimationFrame(updateCurrentSection);
  }, { passive: true });
  updateCurrentSection();

  // Browser owns wheel, trackpad and touch scrolling; only anchor clicks animate.
  function scrollToPosition(position) {
    window.scrollTo({top: position, behavior: reducedMotion.matches ? 'auto' : 'smooth'});
  }

  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    const labels = { en: ['Open menu', 'Close menu'], uk: ['Відкрити меню', 'Закрити меню'], pl: ['Otwórz menu', 'Zamknij menu'] };
    menuButton.setAttribute('aria-label', labels[document.documentElement.lang]?.[open ? 0 : 1] || 'Open menu');
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      closeMenu();
      scrollToPosition(target.getBoundingClientRect().top + window.scrollY);
    });
  });
}

// Shows descriptive blocks once they enter the viewport.
export function setupReveal(reducedMotion) {
  const elements = [...document.querySelectorAll('[data-reveal]')];
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    elements.forEach(element => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .15 });

  elements.forEach(element => observer.observe(element));
}

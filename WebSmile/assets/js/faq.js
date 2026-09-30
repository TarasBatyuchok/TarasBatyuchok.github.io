// FAQ accordion behavior is kept separate from the page's animation modules.
export function setupFaq(reducedMotion) {
  const items = [...document.querySelectorAll('.faq__item')];
  const animations = new WeakMap();

  // One answer stays open across both columns. A click on it closes it.
  function setOpen(item, shouldOpen) {
    const previous = animations.get(item);
    previous?.cancel();
    animations.delete(item);

    if (item.open === shouldOpen) return;
    const answer = item.querySelector('.faq__answer');
    if (shouldOpen) item.open = true;

    if (reducedMotion.matches) {
      item.open = shouldOpen;
      return;
    }

    const height = answer.scrollHeight;
    const animation = answer.animate(
      shouldOpen
        ? [{ height: '0px', opacity: 0 }, { height: `${height}px`, opacity: 1 }]
        : [{ height: `${height}px`, opacity: 1 }, { height: '0px', opacity: 0 }],
      { duration: 300, easing: 'ease-in-out' }
    );
    animations.set(item, animation);
    animation.onfinish = () => {
      if (!shouldOpen) item.open = false;
      animations.delete(item);
    };
  }

  items.forEach(item => {
    const question = item.querySelector('.faq__question');

    question.addEventListener('click', event => {
      event.preventDefault();
      const shouldOpen = !item.open;
      if (shouldOpen) items.forEach(other => {
        if (other !== item && other.open) setOpen(other, false);
      });
      setOpen(item, shouldOpen);
    });
  });
}

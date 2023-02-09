const sectionHasTransitionEnd = ['story'];

export default ()  => {
  const screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
  screenElements.forEach((screen) => {
    if (sectionHasTransitionEnd.includes(screen.id)) {
      screen.setAttribute('data-transition-end', screen.id);
    }
  });
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
};

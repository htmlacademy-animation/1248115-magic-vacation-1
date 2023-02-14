import {AccentTypographyBuild} from './accent-typography-build';
import {sectionHasTransitionEnd, accentTypographyData} from './user-data';

const loadPage = ()  => {
  const screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
  screenElements.forEach((screen) => {
    if (sectionHasTransitionEnd.includes(screen.id)) {
      screen.setAttribute('data-transition-end', screen.id);
    }
  });

  accentTypographyData.forEach((item) => new AccentTypographyBuild(
    item.totalDelayAnimation,
    item.elementAnimation,
    item.timeAnimation,
    item.activationClass,
    item.propertyAnimation,
    item.letterDelays)
  )

  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
};

export {loadPage};

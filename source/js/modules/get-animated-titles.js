import {animatedResultTitleData} from './user-data';

const animateResultLetters = (title) => {
  let delayDash;
  let delayTranslate;
  const titleResult = document.querySelector(title.tag);
  const resultLetters = titleResult.querySelectorAll('path');
  if (title.delay) {
    delayDash = delayTranslate = parseInt(getComputedStyle(titleResult).getPropertyValue('--delay').trim());
  }
  resultLetters.forEach((item) => {
    const dash = item.getTotalLength() / title.numberPath;
    item.style.setProperty('--dash', dash);
    if (Number.isFinite(delayDash) && Number.isFinite(delayTranslate)) {
      item.style.setProperty('--delayDash', `${delayDash + title.delay[0]}ms`);
      delayDash = delayDash + title.delay[0];
      item.style.setProperty('--delayTranslate', `${delayTranslate + title.delay[1]}ms`);
      delayTranslate = delayTranslate + title.delay[1];
    }
    item.classList.add('path-letters');
  })
}

const getAnimatedTitles = () => {
  animatedResultTitleData.forEach((itemTitle) => {
    animateResultLetters(itemTitle);
  })
}

export {getAnimatedTitles};

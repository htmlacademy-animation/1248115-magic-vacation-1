import {stopTimer} from './show-remaining-time';
import Scene2DSeaCalf from './scene-2d-sea-calf';
import Scene2DCrocodile from './scene-2d-crocodile';
import {sonyaAnimationFinish} from './sonya-animation';

export default () => {
  const showResultEls = document.querySelectorAll(`.js-show-result`);
  const results = document.querySelectorAll(`.screen--result`);
  const gameScreen = document.querySelector(`#game`);
  if (results.length) {
    for (let i = 0; i < showResultEls.length; i++) {
      showResultEls[i].addEventListener(`click`, function () {
        stopTimer();
        sonyaAnimationFinish();
        gameScreen.classList.add(`show-result`);
        let target = showResultEls[i].getAttribute(`data-target`);
        [].slice.call(results).forEach(function (el) {
          el.classList.remove(`screen--show`);
          el.classList.add(`screen--hidden`);
        });
        let targetEl = [].slice.call(results).filter(function (el) {
          return el.getAttribute(`id`) === target;
        });
        targetEl[0].classList.add(`screen--show`);
        targetEl[0].classList.remove(`screen--hidden`);
        if (target === `result`) {
          new Scene2DSeaCalf();
        }
        if (target === `result3`) {
          new Scene2DCrocodile();
        }
      });
    }
  }
};

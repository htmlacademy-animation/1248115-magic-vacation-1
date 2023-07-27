import {stopTimer} from './show-remaining-time';
import Scene2DSeaCalf from './scene-2d-sea-calf.js';
import Scene2DCrocodile from './scene-2d-crocodile';
import {sonyaAnimationFinish} from './sonya-animation.js';

const results = document.querySelectorAll(`.screen--result`);
const gameScreen = document.querySelector('#game');

const getResult = (targetResult) => {
  if (results.length) {
    stopTimer();
    sonyaAnimationFinish();
    gameScreen.classList.add('show-result');
    [].slice.call(results).forEach(function (el) {
      el.classList.remove(`screen--show`);
      el.classList.add(`screen--hidden`);
    });
    let targetEl = [].slice.call(results).filter(function (el) {
      return el.getAttribute(`id`) === targetResult;
    });

    targetEl[0].classList.add(`screen--show`);
    targetEl[0].classList.remove(`screen--hidden`);
    if (targetResult === 'result') {
      new Scene2DSeaCalf();
    }
    if (targetResult === 'result3') {
      new Scene2DCrocodile();
    }
  }
}

export {getResult};

import {startTimer} from './show-remaining-time';
import {sonyaAnimationStart} from './sonya-animation';

const results = document.querySelectorAll(`.screen--result`);
const gameScreen = document.querySelector(`#game`);

const playAgain = () => {
  const playBtn = document.querySelector(`.js-play`);
  if (playBtn) {
    playBtn.addEventListener(`click`, function () {
      [].slice.call(results).forEach(function (el) {
        el.classList.remove(`screen--show`);
        el.classList.add(`screen--hidden`);
        gameScreen.classList.remove(`show-result`);
      });
      document.getElementById(`messages`).innerHTML = ``;
      document.getElementById(`message-field`).focus();
      setTimeout(startTimer, 200);
      sonyaAnimationStart();
    });
  }
};

export {playAgain};

import { getResult } from "./get-results";

const fpsInterval = 1000;
const duration = 300;
const counterTime = document.querySelector(`.game__counter`);
const counterMinutes = counterTime.querySelector(`span:first-child`);
const counterSeconds = counterTime.querySelector(`span:last-child`);
const gameScreen = document.querySelector('.screen--game');

const showRemainingTimeCallback = () => {
  getResult('result3');
};

let done = false;

const startTimer = (endTime = duration) => {
  let now,
    then = Date.now(),
    elapsed;

  const draw = () => {
    const minutes = new Date(endTime * 1000).getMinutes();
    const seconds = new Date(endTime * 1000).getSeconds();
    counterMinutes.textContent = String(minutes).padStart(2, 0);
    counterSeconds.textContent = String(seconds).padStart(2, 0);
  }

  const tick = () => {
    if (endTime < 0) {
      showRemainingTimeCallback();
    }

    if (done) {
      requestAnimationFrame(tick);
    }

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);

      if (gameScreen.classList.contains('active')) {
        draw();
      }
      endTime -= 1;
    }
  }

  done = true;
  requestAnimationFrame(tick)
}

const stopTimer = () => {
  done = false;
}

export {startTimer, stopTimer, done};

const fpsInterval = 1000;
const duration = 300;
const counterTime = document.querySelector(`.game__counter`);
const counterMinutes = counterTime.querySelector(`span:first-child`);
const counterSeconds = counterTime.querySelector(`span:last-child`);

const showRemainingTimeCallback = () => {
  stopTimer();
  const result = document.querySelector(`#result3`);
  result.classList.add(`screen--show`);
  result.classList.remove(`screen--hidden`);
};

let done = false;

const startTimer = (endTime = duration) => {
  let now,
    then = Date.now(),
    elapsed;

  function draw() {
    const minutes = new Date(endTime * 1000).getMinutes();
    const seconds = new Date(endTime * 1000).getSeconds();
    counterMinutes.textContent = String(minutes).padStart(2, 0);
    counterSeconds.textContent = String(seconds).padStart(2, 0);
    endTime -= 1;
  }

  function tick() {
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

      draw();
    }
  }

  done = true;
  requestAnimationFrame(tick)
}

const stopTimer = () => {
  done = false;
}

export {startTimer, stopTimer, done};

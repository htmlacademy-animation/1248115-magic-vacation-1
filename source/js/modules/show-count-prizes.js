const prizesData = [
  {
    element: '.prizes__item--cases b',
    values: [1, 2, 3, 4, 5, 6, 7]
  },
  {
    element: '.prizes__item--codes b',
    values: [11, 185, 371, 514, 821, 849, 900]
  }
]

const fps = 12;
const fpsInterval = 1000 / fps;

const showCountPrize = (data) => {
  const frameValues = data.values;
  const count = frameValues.length;
  const prize = document.querySelector(data.element);

  let now,
    then = Date.now(),
    elapsed,
    i = 0;

  function draw(frame) {
    prize.textContent = frame;
  }

  function tick() {
    if (i < count) {
      requestAnimationFrame(tick);
    }

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);
      draw(frameValues[i]);
      i++;
    }
  }
  requestAnimationFrame(tick);
}

const showCountPrizes = () => {
  prizesData.forEach((item) => {
    showCountPrize(item);
  });
}

export {showCountPrizes};

const fps = 12;
const fpsInterval = 1000 / fps;

const showCountPrizes = (data) => {
  const frameValues = data.values;
  const count = frameValues.length;
  const prize = document.querySelector(data.element);

  let now,
    then = Date.now(),
    elapsed,
    i = 0;

  const draw = (frame) => {
    prize.textContent = frame;
  }

  const tick = () => {
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

export {showCountPrizes};

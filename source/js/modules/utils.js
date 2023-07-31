const easeLinear = (x) => x;

const easeInCubic = (x) => x * x * x;

const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

const easeInExpo = (x) => {
  if (x === 0) {
    return 0;
  } else {
    return Math.pow(2, 10 * x - 10);
  }
};

const easeOutExpo = (x) => {
  if (x === 1) {
    return 1;
  } else {
    return 1 - Math.pow(2, -10 * x);
  }
};

const easeInElastic = (x) => {
  const c4 = (2 * Math.PI) / 3;

  if (x === 0) {
    return 0;
  } else if (x === 1) {
    return 1;
  } else {
    return Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
  }
};

const easeOutElastic = (x) => {
  const c4 = (2 * Math.PI) / 3;

  if (x === 0) {
    return 0;
  } else if (x === 1) {
    return 1;
  } else {
    return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  }
};

const easeInOutLinear = (x) => 4 * x * (1 - x);

const easeDampedWave = (x) => {
  const a = 0.015;
  const lambda = 0.1;
  const omega = 15;
  return a * Math.exp(-lambda * x) * Math.cos(omega * x);
};

const easeOutQuad = (x) => 1 - (1 - x) * (1 - x);

const easeInSine = (x) => 1 - Math.cos((x * Math.PI) / 2);

const easeInOutSine = (x) => -(Math.cos(Math.PI * x) - 1) / 2;

const easeInOutCubic = (x) => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

const easeOutSine = (x) => Math.sin((x * Math.PI) / 2);

const _ = Object.freeze({
  easeLinear,
  easeInCubic,
  easeOutCubic,
  easeInExpo,
  easeOutExpo,
  easeInElastic,
  easeOutElastic,
  easeInOutLinear,
  easeDampedWave,
  easeOutQuad,
  easeInSine,
  easeInOutSine,
  easeInOutCubic,
  easeOutSine
});

export default _;

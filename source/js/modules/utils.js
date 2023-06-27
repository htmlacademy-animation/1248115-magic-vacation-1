function easeLinear(x) {
  return x;
}

function easeInCubic(x) {
  return x * x * x;
}

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

function easeInExpo(x) {
  if (x === 0) {
    return 0;
  } else {
    return Math.pow(2, 10 * x - 10);
  }
}

function easeOutExpo(x) {
  if (x === 1) {
    return 1;
  } else {
    return 1 - Math.pow(2, -10 * x);
  }
}


function easeInElastic(x) {
  const c4 = (2 * Math.PI) / 3;

  if (x === 0) {
    return 0;
  } else if (x === 1) {
    return 1;
  } else {
    return Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
  }
}

function easeOutElastic(x) {
  const c4 = (2 * Math.PI) / 3;

  if (x === 0) {
    return 0;
  } else if (x === 1) {
    return 1;
  } else {
    return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  }
}

function easeInOutLinear(x) {
  return 4 * x * (1 - x);
}

function easeDampedWave(x) {
  const a = 0.015;
  const lambda = 0.1;
  const omega = 15;
  return a * Math.exp(-lambda * x) * Math.cos(omega * x);
}

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

function easeInSine(x) {
  return 1 - Math.cos((x * Math.PI) / 2);
}

function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

function easeInOutCubic(x){
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeOutSine(x) {
  return Math.sin((x * Math.PI) / 2);
}

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

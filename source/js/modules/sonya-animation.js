const sonyaElement = document.querySelector(`#game .game-sonya`);
let sonyaAnimation;
let pauseAnimation = false;

const sonyaAnimationInOutMove = () => {
  return sonyaElement.animate(
      [
        {transform: `translate(32.7rem, 36.9rem) rotate(-20deg) scale(0.7)`, offset: 0},
        {transform: `translate(0, 0) rotate(0) scale(1)`, offset: 1},
      ],
      {
        duration: 500,
        easing: `ease-out`,
        delay: 750,
        fill: `both`,
      }
  );
};

const sonyaAnimationShake = () => {
  return sonyaElement.animate(
      [
        {transform: `translateY(0)`, easing: `ease-in-out`, offset: 0},
        {transform: `translateY(-2rem)`, easing: `ease-in-out`, offset: 0.5},
        {transform: `translateY(0)`, offset: 1},
      ],
      {
        duration: 2000,
        fill: `both`,
      }
  );
};

const sonyaAnimationStart = () => {
  sonyaAnimation = sonyaAnimationInOutMove();

  sonyaAnimation.onfinish = () => {
    sonyaAnimation = sonyaAnimationShake();
    sonyaAnimation.onfinish = () => {
      sonyaAnimation.play();
    };
  };
};

const sonyaAnimationPause = () => {
  if (sonyaAnimation) {
    sonyaAnimation.pause();
    pauseAnimation = !pauseAnimation;
  }
};

const sonyaAnimationPlay = () => {
  if (sonyaAnimation && pauseAnimation) {
    sonyaAnimation.play();
    pauseAnimation = !pauseAnimation;
  } else {
    sonyaAnimationStart();
  }
};

const sonyaAnimationFinish = () => {
  if (!sonyaAnimation) {
    return;
  }

  sonyaAnimation.onfinish = () => {
    sonyaAnimation = sonyaAnimationInOutMove();
    sonyaAnimation.reverse();

    sonyaAnimation.onfinish = () => {
      sonyaAnimation = null;
    };
  };
};

export {sonyaAnimationStart, sonyaAnimationFinish, sonyaAnimationPlay, sonyaAnimationPause};

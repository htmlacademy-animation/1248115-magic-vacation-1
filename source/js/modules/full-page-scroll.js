import throttle from 'lodash/throttle';
import {startTimer, done} from './show-remaining-time';
import {showAnimatePrizes} from './show-animate-prizes';
import {scene3D} from './3d/init-scene-3d';
import {sonyaAnimationPause, sonyaAnimationPlay} from './sonya-animation.js';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 1000;
    this.scrollFlag = true;
    this.timeout = null;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.previousActiveScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      this.reCalculateActiveScreenPosition(evt.deltaY);
      const currentPosition = this.activeScreen;
      if (currentPosition !== this.activeScreen) {
        this.changePageDisplay();
      }
    }
    this.scrollFlag = false;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.scrollFlag = true;
    }, this.THROTTLE_TIMEOUT);
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  _animationHandler(screenScene) {
    const animateInnerHandler = (evt) => {
      if (evt.animationName === `transition-end-${screenScene.id}`) {
        screenScene.classList.remove(`transition-end`);
        this.screenElements[this.activeScreen].classList.remove('transition-start');
        screenScene.classList.add(`screen--hidden`);
        screenScene.removeEventListener(`animationend`, animateInnerHandler);
      }
    }
    return animateInnerHandler;
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    this.screenElements.forEach((screen, index) => {
      screen.classList.remove(`active`);
      if (index === this.previousActiveScreen && screen.hasAttribute('data-transition-end') && this.previousActiveScreen < this.activeScreen) {
        screen.classList.add('transition-end');
        this.screenElements[this.activeScreen].classList.add('transition-start');
        screen.addEventListener(`animationend`, this._animationHandler(screen));
      } else {
        screen.classList.add(`screen--hidden`);
      }
    });

    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    setTimeout(() => {
      this.screenElements[this.activeScreen].classList.add(`active`);
      document.body.setAttribute('data-screen', this.screenElements[this.activeScreen].id);
    }, 100);

    if (this.previousActiveScreen === 0) {
      scene3D.isIntroAnimateRender = false;
      scene3D.introScene.animations.forEach((animation) => animation.stop());
    }

    if (this.previousActiveScreen === 1) {
      scene3D.isStoryAnimateRender = false;
      scene3D.story1.animations.forEach((animation) => animation.stop());
      scene3D.story2.animations.forEach((animation) => animation.stop());
      scene3D.story3.animations.forEach((animation) => animation.stop());
      scene3D.story4.animations.forEach((animation) => animation.stop());
    }

    if (this.previousActiveScreen === 4) {
      sonyaAnimationPause();
    }

    if (this.screenElements[this.activeScreen].id === "game") {
      if (!done) {
        setTimeout(startTimer, 200);
      }
      sonyaAnimationPlay();
    }

    if (this.screenElements[this.activeScreen].id === "prizes") {
      showAnimatePrizes();
    }

    if (this.screenElements[this.activeScreen].id === "story") {
      scene3D.isStoryAnimateRender = true;
      scene3D.switchCameraRig(scene3D.slide);
      if (scene3D.slide === 1) {
        scene3D.animationSuitcase.forEach((animation) => animation.start());
      }
      if (scene3D.startIntro) {
        scene3D[`story${scene3D.slide}`].animations.forEach((animation) => animation.start());
      }
      scene3D.render();
    }

    if (this.screenElements[this.activeScreen].id === "top") {
      scene3D.isIntroAnimateRender = true;
      if (scene3D.startIntro) {
        scene3D.switchCameraRig(0);
        scene3D.introScene.animations.forEach((animation) => animation.start());//
      }
      scene3D.render();
    }

    this.previousActiveScreen = this.activeScreen;
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}

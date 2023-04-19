import throttle from 'lodash/throttle';
import {startTimer, done} from './show-remaining-time';
import {showAnimatePrizes} from './show-animate-prizes';
import slider from './slider.js';////

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
    if (this.screenElements[this.activeScreen].id === "game") {
      if (!done) {
        setTimeout(startTimer, 200);
      }
    }
    if (this.screenElements[this.activeScreen].id === "prizes") {
      showAnimatePrizes();
    }
    if (this.screenElements[this.activeScreen].id === "story") {
      slider();
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

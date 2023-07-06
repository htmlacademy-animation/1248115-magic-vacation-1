import Swiper from "swiper";
import {scene3D} from './3d/init-scene-3d.js';

export default () => {
  let storySlider;
  document.body.setAttribute('data-slide', 1);

  const setSlider = function () {
    if (((window.innerWidth / window.innerHeight) < 1) || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0 || storySlider.activeIndex === 1) {
              scene3D.setViewScene(1);
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              scene3D.setViewScene(2);
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              scene3D.setViewScene(3);
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              scene3D.setViewScene(4);
            }
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0) {
              scene3D.setViewScene(1);
              document.body.setAttribute('data-slide', 1);
            } else if (storySlider.activeIndex === 2) {
              scene3D.setViewScene(2);
              document.body.setAttribute('data-slide', 2);
            } else if (storySlider.activeIndex === 4) {
              scene3D.setViewScene(3);
              document.body.setAttribute('data-slide', 3);
            } else if (storySlider.activeIndex === 6) {
              scene3D.setViewScene(4);
              document.body.setAttribute('data-slide', 4);
            }
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    }
  };

  window.addEventListener(`resize`, function () {
    if (storySlider) {
      storySlider.destroy();
    }
    setSlider();
  });

  setSlider();
};

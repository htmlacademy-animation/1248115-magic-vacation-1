import Swiper from "swiper";
import Scene3D from './3d/scene-3d.js';
import {scene3DData} from './user-data.js';

export default () => {
  let storySlider;
  document.body.setAttribute('data-slide', 1);

  const story1 = new Scene3D(scene3DData[1]);
  story1.init();////
  const story2 = new Scene3D(scene3DData[2]);
  const story3 = new Scene3D(scene3DData[3]);
  const story4 = new Scene3D(scene3DData[4]);

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
              story1.init();
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              story2.init();
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              story3.init();
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              story4.init();
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
              story1.init();
              document.body.setAttribute('data-slide', 1);
            } else if (storySlider.activeIndex === 2) {
              story2.init();
              document.body.setAttribute('data-slide', 2);
            } else if (storySlider.activeIndex === 4) {
              story3.init();
              document.body.setAttribute('data-slide', 3);
            } else if (storySlider.activeIndex === 6) {
              story4.init();
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

import Swiper from "swiper";
import {scene3D} from './3d/init-scene-3d';

export default () => {
  let storySlider;
  document.body.setAttribute(`data-slide`, 1);
  let activeIndex;

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
              if (scene3D.isStoryAnimateRender) {
                scene3D.setViewScene(1);
              }
              document.body.setAttribute(`data-slide`, 1);
              activeIndex = storySlider.activeIndex;
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              if (scene3D.isStoryAnimateRender) {
                scene3D.setViewScene(2);
              }
              document.body.setAttribute(`data-slide`, 2);
              activeIndex = storySlider.activeIndex;
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              if (scene3D.isStoryAnimateRender) {
                scene3D.setViewScene(3);
              }
              document.body.setAttribute(`data-slide`, 3);
              activeIndex = storySlider.activeIndex;
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              if (scene3D.isStoryAnimateRender) {
                scene3D.setViewScene(4);
              }
              document.body.setAttribute(`data-slide`, 4);
              activeIndex = storySlider.activeIndex;
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
              if (scene3D.isStoryAnimateRender) {
                scene3D.setViewScene(1);
              }
              document.body.setAttribute(`data-slide`, 1);
              activeIndex = storySlider.activeIndex;
            } else if (storySlider.activeIndex === 2) {
              if (scene3D.isStoryAnimateRender) {
                scene3D.setViewScene(2);
              }
              document.body.setAttribute(`data-slide`, 2);
              activeIndex = storySlider.activeIndex;
            } else if (storySlider.activeIndex === 4) {
              if (scene3D.isStoryAnimateRender) {
                scene3D.setViewScene(3);
              }
              document.body.setAttribute(`data-slide`, 3);
              activeIndex = storySlider.activeIndex;
            } else if (storySlider.activeIndex === 6) {
              if (scene3D.isStoryAnimateRender) {
                scene3D.setViewScene(4);
              }
              document.body.setAttribute(`data-slide`, 4);
              activeIndex = storySlider.activeIndex;
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
    storySlider.slideTo(activeIndex);
  });

  setSlider();
};

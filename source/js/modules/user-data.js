import SceneIntro from "./3d/scene-intro";
import SceneSlide1 from "./3d/scene-slide-1";
import SceneSlide2 from "./3d/scene-slide-2";
import SceneSlide3 from "./3d/scene-slide-3";
import SceneSlide4 from "./3d/scene-slide-4";

const sectionHasTransitionEnd = ['story', 'prizes'];

const accentTypographyData = [
  {
    totalDelayAnimation: 470,
    elementAnimation: `.intro__title`,
    timeAnimation: 500,
    propertyAnimation: `transform`,
    letterDelays: [[133, 66, 0, 66, 100, 66, 0, 200, 100, 0, 100, 33], [366, 400, 333, 233, 366, 266]],
  },
  {
    totalDelayAnimation: 1500,
    elementAnimation: `.intro__date`,
    timeAnimation: 300,
    propertyAnimation: `transform`,
    letterDelays: [[100, 67], [67], [133, 33, 166, 67, 166], [67], [0, 133, 100, 33]],
  },
  {
    totalDelayAnimation: 0,
    elementAnimation: `.slider__item-title`,
    timeAnimation: 400,
    propertyAnimation: `transform`,
    letterDelays: [[133, 67, 0, 67, 100, 67, 0]],
  },
  {
    totalDelayAnimation: 450,
    elementAnimation: `.prizes__title`,
    timeAnimation: 500,
    propertyAnimation: `transform`,
    letterDelays: [[133, 67, 0, 67, 100]],
  },
  {
    totalDelayAnimation: 1300,
    elementAnimation: `.rules__title`,
    timeAnimation: 400,
    propertyAnimation: `transform`,
    letterDelays: [[167, 67, 33, 0, 100, 67, 0]],
  },
  {
    totalDelayAnimation: 33,
    elementAnimation: `.game__title`,
    timeAnimation: 400,
    propertyAnimation: `transform`,
    letterDelays: [[200, 100, 0, 67]],
  }
];

const animatedResultTitleData = [
  {
    tag: '#result .result__title svg',
    numberPath: 3
  },
  {
    tag: '#result2 .result__title svg',
    numberPath: 3
  },
  {
    tag: '#result3 .result__title svg',
    numberPath: 2,
    delay: [33, 66]
  }
];

const prizesData = [
  {
    element: '.prizes__item--cases b',
    values: [1, 2, 3, 4, 5, 6, 7]
  },
  {
    element: '.prizes__item--codes b',
    values: [11, 185, 371, 514, 821, 849, 900]
  }
];

const scene3DData = [
  {
    canvasId: 'canvas-intro',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x5f458c,
    alpha: 1,
    cameraOptions: {
      fov: 35,
      near: 0.1,
      far: 1500,
      positionZ: 1405
    },
    stepScene: 2048,
    textures: [
      {
        url: './img/module-5/scenes-textures/scene-0.png',
        hue: 0.0,
        hueRange: [],
        isCircles: false,
        paramCircles: [
          {},
          {},
          {}
        ],
        objectComposition: new SceneIntro(),
        scaleX: 2048,
        scaleY: 1024,
        positionX: 0,
        positionY: 0,
      },
    ],
  },
  {
    canvasId: 'canvas-story',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x5f458c,
    alpha: 1,
    cameraOptions: {
      fov: 35,
      near: 0.1,
      far: 1500,
      positionZ: 1405
    },
    stepScene: 2048,
    textures: [
      {
        url: './img/module-5/scenes-textures/scene-1.png',
        hue: 0.0,
        hueRange: [],
        isCircles: false,
        paramCircles: [
          {},
          {},
          {}
        ],
        objectComposition: new SceneSlide1(),
        scaleX: 2048,
        scaleY: 1024,
        positionX: 0,
        positionY: 0,
      },
      {
        url: './img/module-5/scenes-textures/scene-2.png',
        hue: 0.0, //угол в градусах по цветовому кругу,
        hueRange: [-5, -18],
        isCircles: true,
        paramCircles: [
          {
            radius: 0.35,
            centerX: 0.4,
            centerY: -0.15
          },
          {
            radius: 0.25,
            centerX: 0.3,
            centerY: -0.45
          },
          {
            radius: 0.12,
            centerX: 0.5,
            centerY: -0.9
          },
        ],
        objectComposition: new SceneSlide2(),
        scaleX: 2048,
        scaleY: 1024,
        positionX: 0,
        positionY: 0,
      },
      {
        url: './img/module-5/scenes-textures/scene-3.png',
        hue: 0.0,
        hueRange: [],
        isCircles: false,
        paramCircles: [
          {},
          {},
          {}
        ],
        objectComposition: new SceneSlide3(),
        scaleX: 2048,
        scaleY: 1024,
        positionX: 0,
        positionY: 0,
      },
      {
        url: './img/module-5/scenes-textures/scene-4.png',
        hue: 0.0,
        hueRange: [],
        isCircles: false,
        paramCircles: [
          {},
          {},
          {}
        ],
        objectComposition: new SceneSlide4(),
        scaleX: 2048,
        scaleY: 1024,
        positionX: 0,
        positionY: 0,
      },
    ],
  },
];

export {
  sectionHasTransitionEnd,
  accentTypographyData,
  animatedResultTitleData,
  prizesData,
  scene3DData,
};

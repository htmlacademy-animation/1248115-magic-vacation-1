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
      fov: 45,
      near: 0.1,
      far: 1200,
      positionZ: 1200
    },
    stepScene: 2048,
    textures: [
      {
        url: './img/module-5/scenes-textures/scene-0.png',
        hue: 0.0,
        isCircles: false,
        paramCircles: [
          {},
          {},
          {}
        ],
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
      fov: 45,
      near: 0.1,
      far: 1200,
      positionZ: 1200
    },
    stepScene: 2048,
    textures: [
      {
        url: './img/module-5/scenes-textures/scene-1.png',
        hue: 0.0,
        isCircles: false,
        paramCircles: [
          {},
          {},
          {}
        ],
        scaleX: 2048,
        scaleY: 1024,
        positionX: 0,
        positionY: 0,
      },
      {
        url: './img/module-5/scenes-textures/scene-2.png',
        hue: -15.0, //угол в градусах по цветовому кругу
        isCircles: true,
        paramCircles: [
          {
            radius: 0.6,
            centerX: 0.4,
            centerY: 0.5
          },
          {
            radius: 0.2,
            centerX: 0.5,
            centerY: 0.7
          },
          {
            radius: 0.4,
            centerX: 0.3,
            centerY: 0.3
          }
        ],
        scaleX: 2048,
        scaleY: 1024,
        positionX: 0,
        positionY: 0,
      },
      {
        url: './img/module-5/scenes-textures/scene-3.png',
        hue: 0.0,
        isCircles: false,
        paramCircles: [
          {},
          {},
          {}
        ],
        scaleX: 2048,
        scaleY: 1024,
        positionX: 0,
        positionY: 0,
      },
      {
        url: './img/module-5/scenes-textures/scene-4.png',
        hue: 0.0,
        isCircles: false,
        paramCircles: [
          {},
          {},
          {}
        ],
        scaleX: 2048,
        scaleY: 1024,
        positionX: 0,
        positionY: 0,
      },
    ],
  },
]

export {
  sectionHasTransitionEnd,
  accentTypographyData,
  animatedResultTitleData,
  prizesData,
  scene3DData
};

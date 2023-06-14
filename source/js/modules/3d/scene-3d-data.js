import SceneIntro from "./scene-intro";
import SceneSlide1 from "./scene-slide-1";
import SceneSlide2 from "./scene-slide-2";
import SceneSlide3 from "./scene-slide-3";
import SceneSlide4 from "./scene-slide-4";
import {loadManagerIntro, loadManagerStory} from "./load-manager";

const scene3DData = [
  {
    canvasId: 'canvas-intro',
    loadManager: loadManagerIntro,
    textures: [
      {
        url: './img/module-5/scenes-textures/scene-0.png',
        scaleX: 2048,
        scaleY: 1024,
        positionX: 0,
        positionY: 0,
      },
    ],
    objectsComposition: [new SceneIntro()],
  },
  {
    canvasId: 'canvas-story',
    loadManager: loadManagerStory,
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
        scaleX: 2048,
        scaleY: 1024,
        positionX: 0,
        positionY: 0,
      },
    ],
    objectsComposition: [new SceneSlide1(), new SceneSlide2(), new SceneSlide3(), new SceneSlide4()],
  },
];

export {scene3DData};

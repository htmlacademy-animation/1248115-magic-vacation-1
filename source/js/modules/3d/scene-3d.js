import * as THREE from 'three';
import {getRandomInteger, isMobile} from '../helpers';
import {loadManager} from "./load-manager";
import {textureLoader} from "./texture-loader";
import SceneIntro from "./scene-intro";
import SceneSlide1 from "./scene-slide-1";
import SceneSlide2 from "./scene-slide-2";
import SceneSlide3 from "./scene-slide-3";
import SceneSlide4 from "./scene-slide-4";
import CameraRig from "./camera-rig";
import CameraRigPortrait from "./camera-rig-portrait";
import Suitcase from "./suitcase";
import Animation from './../animation';
import _ from './../utils';
import FullPageScroll from './../full-page-scroll';
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
import {vertexShader} from './vertex-shader';
import {fragmentShader} from './fragment-shader';

const configScene3D = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x5f458c,
  alpha: 1,
  cameraOptions: {
    fov: 35,
    near: 50,
    far: 3800,
  },
};

const paramCircles = [
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
    centerY: -0.85
  },
];

const loadingElem = document.querySelector('#loading');
const progressBarElem = loadingElem.querySelector('.progressbar');

export default class Scene3D {
  constructor() {
    this.canvasId = 'canvas-animations';
    this.width = configScene3D.width;
    this.height = configScene3D.height;
    this.aspectRation = this.width / this.height;
    this.alpha = configScene3D.alpha;
    this.backgroundColor = configScene3D.backgroundColor;
    this.fov = configScene3D.cameraOptions.fov;
    this.near = configScene3D.cameraOptions.near;
    this.far = configScene3D.cameraOptions.far;
    this.render = this.render.bind(this);
    this.materials = [];
    this.textures = [];
    this.loadedTextures = [];
    this.isShadow = !isMobile();
    this.isIntroAnimateRender = false;
    this.isStoryAnimateRender = false;
    this.loadManager = loadManager;
    this.textureLoader = textureLoader;
    this.cameraRig = new CameraRig();
    this.cameraRigPortrait = new CameraRigPortrait();
    this.introScene = new SceneIntro();
    this.story1 = new SceneSlide1();
    this.story2 = new SceneSlide2();
    this.story3 = new SceneSlide3();
    this.story4 = new SceneSlide4();
    this.suitcase = new Suitcase();
    this.suitcaseGroup = new THREE.Group();
    this.slide = 1;
    this.prevIndex = 0;
    this.startIntro = false;
    this.startStory = false;
    this.cameraPositionZ = 1500;
    this.story1.visible = false;
    this.story2.visible = false;
    this.story3.visible = false;
    this.story4.visible = false;
    this.suitcaseGroup.visible = false;
    this.moveMouseHandler = this.moveMouseHandler.bind(this);
    this.orientation = 'landscape';
    this.currentCamera = null;
    this.loadingElem = loadingElem;
    this.progressBarElem = progressBarElem;
    this.paramCircles = paramCircles;
    this.animationsComposer = [];
    this.animationSuitcase = [];
  }

  init() {
    this.get3dInfrastructure();

    this.loadManager.onLoad = () => {
      this.loadingElem.style.display = "none";
      setTimeout(() => document.body.classList.add('loaded'), 100);
      const fullPageScroll = new FullPageScroll();
      fullPageScroll.init();
      this.addIntroComposition();
      this.addStoryScenes();
      this.addSuitcase();
      this.initSuitcaseAnimations();
      this.story1.initDogAnimation();
      this.story1.initSaturnAnimation();
      this.story2.initLeafAnimation();
      this.story3.initCompassAnimation();
      this.story4.initSaturnAnimation2();
      this.story4.initSonyaAnimation();
      this.initComposerAnimation();
      if (isMobile()) {
        this.hideObjectMobile();
      }
      this.addMouseListener();
      this.addResizeListener();
      this.resize();

      if (this.isIntroAnimateRender) {
        setTimeout(() => {
          this.introScene.specialAnimations.forEach((animation) => animation.start());
          this.introScene.animations.forEach((animation) => animation.start());
          this.startIntro = true;
        }, 500);
      }
      if (this.isStoryAnimateRender) {
        setTimeout(() => {
          this.animationSuitcase.forEach((animation) => animation.start());
          this.story1.animations.forEach((animation) => animation.start());
          this.startIntro = true;
          this.startStory = true;
          this.introActive = false;
        }, 500);
      }
      this.render();
    };

    this.loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
      const progress = itemsLoaded / itemsTotal;
      this.progressBarElem.style.transform = `scaleX(${progress})`;
    };
  };

  get3dInfrastructure() {
    this.canvas = document.getElementById(this.canvasId);
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.scene = new THREE.Scene();
    this.color = new THREE.Color(this.backgroundColor);

    this.camera = new THREE.PerspectiveCamera(this.fov, this.aspectRation, this.near, this.far);
    this.camera.name = 'camera';
    this.getLight();
    this.getCamera();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    });
    this.renderer.setClearColor(this.color, this.alpha);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    if (this.isShadow) {
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    };
    this.getComposer();
  }

  getCamera() {
    this.currentCamera = this.cameraRig;
    this.cameraRig.name = 'cameraRig';
    this.cameraRig.addObjectToCameraNull(this.camera);
    this.cameraRig.addObjectToCameraNull(this.light);
    if (this.isShadow) {
      this.cameraRig.addObjectToRotationAxis(this.pointLightGroup);
    }
    this.cameraRigPortrait.name = 'cameraRigPortrait';
    this.scene.add(this.cameraRig);
    this.scene.add(this.cameraRigPortrait);
  }

  getLight() {
    this.light = new THREE.Group();
    let lightUnit = new THREE.DirectionalLight(new THREE.Color('rgb(255,255,255)'), 0.84);
    lightUnit.position.set(0, 0, 0);
    lightUnit.target.position.set(0, Math.tan(THREE.MathUtils.degToRad(-15.0)) * this.cameraPositionZ, -1500);
    this.light.add(lightUnit);
    this.light.add(lightUnit.target);

    if (this.isShadow) {
      this.pointLightGroup = new THREE.Group();
      this.pointLightGroup.name = 'pointLightGroup';

      lightUnit = new THREE.PointLight(new THREE.Color('rgb(246,242,255)'), 0.6, 3900, 2);
      lightUnit.position.set(-785, -350, -710);

      lightUnit.castShadow = true;
      lightUnit.shadow.mapSize.width = 1000;
      lightUnit.shadow.mapSize.height = 1000;
      lightUnit.shadow.camera.near = 1;
      lightUnit.shadow.camera.far = 3000;
      lightUnit.shadow.bias = -0.005;

      this.pointLightGroup.add(lightUnit);

      lightUnit = new THREE.PointLight(new THREE.Color('rgb(245,254,255)'), 0.95, 3900, 2);
      lightUnit.position.set(730, 800, -985);

      lightUnit.castShadow = true;
      lightUnit.shadow.mapSize.width = 1000;
      lightUnit.shadow.mapSize.height = 1000;
      lightUnit.shadow.camera.near = 1;
      lightUnit.shadow.camera.far = 3000;
      lightUnit.shadow.bias = -0.005;

      this.pointLightGroup.add(lightUnit);
      this.pointLightGroup.position.set(0, 0, 2150);
    }
  };

  getComposer() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.setPixelRatio(window.devicePixelRatio);
    const renderPass = new RenderPass(this.scene, this.camera);
    this.effectMaterial = this.getEffectMaterial();
    this.effectPass = new ShaderPass(this.effectMaterial, 'map');
    this.composer.addPass(renderPass);
    this.composer.addPass(this.effectPass);
  }

  render() {
    if (this.isIntroAnimateRender || this.isStoryAnimateRender) {
      if (this.resizeInProgress) {
        this.resize();
      }
      requestAnimationFrame(this.render);
      this.resizeInProgress = false;
    }
    this.composer.render();
  }

  loadTextures() {
    this.loadedTextures = this.textures.map((texture) => this.textureLoader.load(texture.url));
  }

  switchCameraRig(i) {
    if (i >= 1) {
      this.story1.visible = true;
      this.story2.visible = true;
      this.story3.visible = true;
      this.story4.visible = true;
      this.suitcaseGroup.visible = true;
    }

    if (i >= 1 && this.prevIndex === 0) {
      this.introScene.animationForwardKeyPatch.forEach((animation) => animation.start());
    }

    if (i === 0) {
      this.introScene.visible = true;
    }

    this.cameraRig.changeStateTo(i, this);
    this.cameraRigPortrait.changeStateTo(i, this);

    if (i > 0) {
      this.slide = i
    }

    this.prevIndex = i;
  }

  setViewScene(i) {
    this.story1.animations.forEach((animation) => animation.stop());
    this.story2.animations.forEach((animation) => animation.stop());
    this.story3.animations.forEach((animation) => animation.stop());
    this.story4.animations.forEach((animation) => animation.stop());
    this.switchCameraRig(i);
    this[`story${i}`].animations.forEach((animation) => animation.start());

    if (i === 2) {
      this.material = this.effectMaterial;
      this.hue = parseFloat(getRandomInteger(-5, -18));
      this.material.uniforms.hueShift.value = 0.0;
      this.material.needsUpdate = true;
      this.animationsComposer.forEach((animation) => animation.start());
    }
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (height < 1 || width < 1) return;

    if (width > height) {
      if (this.orientation !== 'landscape') {
        this.switchResizeCamera(this.cameraRig);
        this.introScene.changeFinalPosition();
      }
      this.camera.fov = 35;
      this.orientation = 'landscape';
    } else {
      if (this.orientation !== 'portrait') {
        this.switchResizeCamera(this.cameraRigPortrait);
        this.introScene.changeFinalPosition();
      }
      this.camera.fov = (32 * height) / Math.min(width * 1.3, height);
      this.orientation = 'portrait'
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.composer.setSize(width, height);

    this.effectMaterial = this.getEffectMaterial();
    this.effectPass = new ShaderPass(this.effectMaterial, 'map');
    this.composer.addPass(this.effectPass);

    this.width = width;
    this.height = height;

    return this;
  }

  switchResizeCamera(camera) {
    this.currentCamera = camera;
    camera.addObjectToCameraNull(this.camera);
    camera.addObjectToCameraNull(this.light);
    if (this.isShadow) {
      camera.addObjectToRotationAxis(this.pointLightGroup);
    }
    camera.addObjectToRotationAxis(this.suitcaseGroup);
  }

  getEffectMaterial(texture) {
    return new THREE.RawShaderMaterial({
      uniforms: {
        map: {
          value: texture
        },
        hueShift: {
          value: 0.0
        },
        ratio: {
          value: window.innerWidth / window.innerHeight
        },
        paramArrayCircles: {
          value: [
            {
              radius: this.paramCircles[0].radius,
              centerX: this.paramCircles[0].centerX,
              centerY: this.paramCircles[0].centerY,
            },
            {
              radius: this.paramCircles[1].radius,
              centerX: this.paramCircles[1].centerX,
              centerY: this.paramCircles[1].centerY
            },
            {
              radius: this.paramCircles[2].radius,
              centerX: this.paramCircles[2].centerX,
              centerY: this.paramCircles[2].centerY
            },
          ]
        }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
  }

  addIntroComposition() {
    this.introScene.position.set(0, 0, 3270);
    this.scene.add(this.introScene);
  }

  addStoryScenes() {
    const stories = [this.story1, this.story2, this.story3, this.story4];
    const allStoryScenes = new THREE.Group();
    this.allStoryScenes = allStoryScenes;
    stories.forEach((scene, i) => {
      scene.position.set(0, 0, 0);
      scene.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(i * 90), 0));
      allStoryScenes.add(scene);
    });
    allStoryScenes.position.set(0, -700, 0);

    this.scene.add(allStoryScenes);
  }

  addSuitcase() {
    const name = 'suitcaseGroup'
    this.suitcase.castShadow = this.isShadow;
    const innerGroup = new THREE.Group();
    innerGroup.add(this.suitcase);
    this.suitcaseGroup.add(innerGroup);
    this.suitcaseGroup.name = name;
    this.suitcaseGroup.position.set(-340, -550, 790);
    this.suitcaseGroup.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-20.0), 0), `XYZ`);
    this.currentCamera.addObjectToRotationAxis(this.suitcaseGroup);
  }

  hideObjectMobile() {
    const namesHiddenObjects = ['surfobj', 'Skis', 'Table', 'Starfish_Null', 'lantern'];
    let obj;
    for (let name of namesHiddenObjects) {
      obj = this.scene.getObjectByName(name);
      if (obj) {
        obj.visible = false;
      }
    }
    for (let name of namesHiddenObjects) {
      obj = this.story4.getObjectByName(name);
      if (obj) {
        obj.visible = false;
      }
    }
  }

  initSuitcaseAnimations() {
    const objectAnimation = this.currentCamera.getObjectByName('suitcaseGroup');
    this.animationSuitcase.push(new Animation({
      func: (progress) => {
        objectAnimation.position.y = -550 - progress * 150;
      },
      duration: 300,
      delay: 1400,
      easing: _.easeInSine
    }));

    this.animationSuitcase.push(new Animation({
      func: (progress) => {
        objectAnimation.children[0].children[0].scale.set(
          1 - 0.05 * progress, 1 + 0.1 * progress, 1 - 0.05 * progress
        );
      },
      duration: 300,
      delay: 1400,
      easing: _.easeInSine
    }));
    this.animationSuitcase.push(new Animation({
      func: (progress) => {
        objectAnimation.children[0].children[0].scale.set(
          0.95 + 0.15 * progress, 1.1 - 0.15 * progress, 0.95 + 0.15 * progress
        );
      },
      duration: 250,
      delay: 1700,
      easing: _.easeInOutCubic
    }));
    this.animationSuitcase.push(new Animation({
      func: (progress) => {
        objectAnimation.children[0].children[0].scale.set(
          1.1 - 0.115 * progress, 0.95 + 0.08 * progress, 1.1 - 0.115 * progress
        );
      },
      duration: 250,
      delay: 1950,
      easing: _.easeInOutCubic
    }));
    this.animationSuitcase.push(new Animation({
      func: (progress) => {
        objectAnimation.children[0].children[0].scale.set(
          0.985 + 0.015 * progress, 1.03 - 0.03 * progress, 0.985 + 0.015 * progress
        );
      },
      duration: 150,
      delay: 2200,
      easing: _.easeInOutCubic
    }));
  }

  initComposerAnimation() {
    this.animationsComposer.push(new Animation({
      func: (progress) => {
        this.material.uniforms.paramArrayCircles.value.map((item, index) => {
          item.centerX = this.paramCircles[index].centerX + 1.8 * progress;
        })
      },
      duration: 2000,
      delay: 1600,
      easing: _.easeDampedWave,
    }));

    this.animationsComposer.push(new Animation({
      func: (progress) => {
        this.material.uniforms.paramArrayCircles.value.map((item, index) => {
          item.centerY = this.paramCircles[index].centerY + (1.45 + index / 4) * progress;
        })
      },
      duration: 2000,
      delay: 1600,
      easing: _.easeLinear,
    }));

    this.animationsComposer.push(new Animation({
      func: (progress) => {
        this.material.uniforms.hueShift.value = this.hue * progress;
      },
      duration: 2000,
      delay: 1600,
      easing: _.easeInOutLinear,
    }));
  }

  addResizeListener() {
    window.addEventListener('resize', () => {
      this.resizeInProgress = true;
    });
  }

  moveMouseHandler(evt) {
    if (this.isIntroAnimateRender || this.isStoryAnimateRender) {
      const maxAngleRotation = 0.075;
      const windowHeight = window.innerHeight;
      const centerHeight = windowHeight / 2;
      let mouseY = evt.pageY;
      let mouseShift = (centerHeight - mouseY) * 2;
      let angleRotation = maxAngleRotation * mouseShift / windowHeight;
      this.currentCamera.pitchRotation = angleRotation;
      this.currentCamera.invalidate();
    }
  }

  addMouseListener() {
    if (this.isShadow) {
      document.addEventListener('mousemove', this.moveMouseHandler);
    }
  }
}

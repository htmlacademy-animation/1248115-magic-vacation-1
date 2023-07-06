import * as THREE from 'three';
import {isMobile} from '../helpers';
import {loadManager} from "./load-manager";
import SceneIntro from "./scene-intro";
import SceneSlide1 from "./scene-slide-1";
import SceneSlide2 from "./scene-slide-2";
import SceneSlide3 from "./scene-slide-3";
import SceneSlide4 from "./scene-slide-4";
import CameraRig from "./camera-rig";

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
}

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
    this.introScene = new SceneIntro();
    this.story1 = new SceneSlide1();
    this.story2 = new SceneSlide2();
    this.story3 = new SceneSlide3();
    this.story4 = new SceneSlide4();
    this.slide = 1;
    this.startIntro = false;
    this.startStory = false;
    this.introActive = true;
    this.cameraPositionZ = 1500;
  }

  init() {
    this.get3dInfrastructure();

    this.loadManager.onLoad = () => {
      this.addIntroComposition();
      this.addStoryScenes();
      this.story1.initSuitcaseAnimations();
      this.story1.initDogAnimation();
      this.story1.initSaturnAnimation();
      this.story2.initLeafAnimation();
      this.story3.initCompassAnimation();
      this.story4.initSaturnAnimation2();
      this.story4.initSonyaAnimation();

      if (this.isIntroAnimateRender) {
        setTimeout(() => {
          this.introScene.specialAnimations.forEach((animation) => animation.start());
          this.introScene.animations.forEach((animation) => animation.start());
          this.startIntro = true;
        }, 500);
      }
      if (this.isStoryAnimateRender) {
        setTimeout(() => {
          this.story1.animationSuitcase.forEach((animation) => animation.start());
          this.story1.animations.forEach((animation) => animation.start());
          this.startIntro = true;
          this.startStory = true;
          this.introActive = false;
        }, 500);
      }
      this.render();
    };
  };

  get3dInfrastructure() {
    this.canvas = document.getElementById(this.canvasId);
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.scene = new THREE.Scene();
    this.color = new THREE.Color(this.backgroundColor);

    this.camera = new THREE.PerspectiveCamera(this.fov, this.aspectRation, this.near, this.far);
    this.cameraRig = new CameraRig(this.getCameraRigStageState(0));
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
  }

  getCamera() {
    this.cameraRig.addObjectToCameraNull(this.camera);
    this.cameraRig.addObjectToCameraNull(this.light);
    this.scene.add(this.cameraRig);
  }

  getLight() {
    this.light = new THREE.Group();
    let lightUnit = new THREE.DirectionalLight(new THREE.Color('rgb(255,255,255)'), 0.84);
    lightUnit.position.set(0, 0, 0);
    lightUnit.target.position.set(0, Math.tan(THREE.MathUtils.degToRad(-15.0)) * this.cameraPositionZ, 2 * -750);
    this.light.add(lightUnit);
    this.light.add(lightUnit.target);

    lightUnit = new THREE.PointLight(new THREE.Color('rgb(246,242,255)'), 0.6, 4 * 975, 2.0);
    lightUnit.position.set(1 * -785, 1 * -350, 1 * -710);
    if (this.isShadow) {
      lightUnit.castShadow = true;
      lightUnit.shadow.mapSize.width = 1000;
      lightUnit.shadow.mapSize.height = 1000;
      lightUnit.shadow.camera.near = 1;
      lightUnit.shadow.camera.far = 3000;
      lightUnit.shadow.bias = -0.005;
    };
    this.light.add(lightUnit);

    lightUnit = new THREE.PointLight(new THREE.Color('rgb(245,254,255)'), 0.95, 4 * 975, 2.0);
    lightUnit.position.set(1 * 730, 1 * 800, 1 * -985);
    if (this.isShadow) {
      lightUnit.castShadow = true;
      lightUnit.shadow.mapSize.width = 1000;
      lightUnit.shadow.mapSize.height = 1000;
      lightUnit.shadow.camera.near = 1;
      lightUnit.shadow.camera.far = 3000;
      lightUnit.shadow.bias = 0.005;
    };
    this.light.add(lightUnit);
  };

  addIntroComposition() {
    this.introScene.position.set(0, 0, 3270);//3270
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
    allStoryScenes.position.set(0, (-700), 0);
    this.scene.add(allStoryScenes);
  }

  loadTextures() {
    const textureLoader = new THREE.TextureLoader(this.loadManager);
    this.loadedTextures = this.textures.map((texture) => textureLoader.load(texture.url));
  };

  switchCameraRig(i) {
    this.cameraRig.changeStateTo(this.getCameraRigStageState(i));
    if (i > 0) {
      this.slide = i
    }
  }

  setViewScene(i) {
    this.slide = i;
    this.story1.animations.forEach((animation) => animation.stop());
    this.story2.animations.forEach((animation) => animation.stop());
    this.story3.animations.forEach((animation) => animation.stop());
    this.story4.animations.forEach((animation) => animation.stop());
    this.switchCameraRig(i);
    this[`story${i}`].animations.forEach((animation) => animation.start());
  }

  getCameraRigStageState(index) {
    this.introActive = true;
    if (index === 0) {
      return {
        index,
        depth: -4750,
        rotationAxisY: 0,
        rotationCameraX: 0,
      };
    }
    if ([1, 2, 3, 4].includes(index)) {
      this.introActive = false;
      return {
        index,
        depth: -2150,
        rotationAxisY: ((index - 1) * Math.PI) / 2,
        rotationCameraX: THREE.MathUtils.degToRad(-15),
      };
    }
    return {};
  }

  render() {
    //console.log('render');
    if (this.isIntroAnimateRender || this.isStoryAnimateRender) {
      requestAnimationFrame(this.render);
    }
    this.renderer.render(this.scene, this.camera);
  }
}

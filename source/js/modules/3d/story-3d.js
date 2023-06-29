import * as THREE from 'three';
import Scene3D from './scene-3d';
import AllStoryScene from './all-story-scene';
import {vertexShader} from './vertex-shader.js';
import {fragmentShader} from './fragment-shader.js';
import {getRandomInteger, isMobile} from './../helpers.js';
import _ from './../utils.js';
import {suitcaseStory} from "./get-suitcase";
import Animation from './../animation';

export default class Story3D extends Scene3D {
  constructor(options) {
    super();
    this.canvasId = options.canvasId;
    this.textures = options.textures;
    this.objectsComposition = options.objectsComposition;
    this.loadManager = options.loadManager;
    this.suitcase = suitcaseStory;
    this.animationsScene1 = [];
    this.animationsScene2 = [];
    this.animationsScene3 = [];
    this.animationsScene4 = [];
    this.start = false;

    this.currentSlide = 0;
    this.isAnimateScene = false;
    this.startTime = null;
    this.animateTotalDuration = 2000;
    this.animateHueDuration = 660;
    this.currentAnimateColorCount = 0;
    this.hue = 0.0;
    this.renderAnimation = this.renderAnimation.bind(this);
  }

  init() {
    super.init();
    this.light.position.y = 180;
    this.light.position.z = this.camera.position.z;

    //this.loadTextures();
    this.loadManager.onLoad = () => {
      //this.getTextureScenes();
      //this.getSphere();
      this.addStoryScenes();
      this.addSuitcase();
      this.initSuitcaseAnimations();
      this.initDogAnimation();
      this.initSaturnAnimation();
      this.initLeafAnimation();
      this.initCompassAnimation();
      this.initSaturnAnimation2();
      this.initSonyaAnimation();

      this.start = true;

      if (this.isAnimateRender) {
        if (this.start) {
          setTimeout(() => this.animationsScene1.forEach((animation) => animation.start(), 300));
        }
      }

      this.render();
    };
  };

  getCamera() {
    super.getCamera();
    this.camera.position.set(0, 800, 2550);
  }

  getTextureScenes() {
    const geometry = new THREE.PlaneGeometry(1, 1);
    let material;
    this.loadedTextures.forEach((texture, i) => {
      material = new THREE.RawShaderMaterial({
        uniforms: {
          map: {
            value: texture
          },
          hueShift: {
            value: this.textures[i].hue
          },
          circles: {
            value: this.textures[i].isCircles
          },
          ratio: {
            value: this.textures[i].scaleX / this.textures[i].scaleY
          },
          paramArrayCircles: {
            value: [
              {
                radius: this.textures[i].paramCircles[0].radius,
                centerX: this.textures[i].paramCircles[0].centerX,
                centerY: this.textures[i].paramCircles[0].centerY
              },
              {
                radius: this.textures[i].paramCircles[1].radius,
                centerX: this.textures[i].paramCircles[1].centerX,
                centerY: this.textures[i].paramCircles[1].centerY
              },
              {
                radius: this.textures[i].paramCircles[2].radius,
                centerX: this.textures[i].paramCircles[2].centerX,
                centerY: this.textures[i].paramCircles[2].centerY
              },
            ]
          }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      });

      this.materials.push(material);
      const image = new THREE.Mesh(geometry, material);
      image.scale.x = this.textures[i].scaleX;
      image.scale.y = this.textures[i].scaleY;
      image.position.x = this.stepScene * i + this.textures[i].positionX;
      image.position.y = this.textures[i].positionY;
      this.scene.add(image);
    });
  }

  addStoryScenes() {
    const storyScenes = new AllStoryScene();
    storyScenes.position.set(0, -180, 0);
    this.storyScenes = storyScenes;
    this.scene.add(this.storyScenes);
  }

  addSuitcase() {
    const name = 'suitcase'
    const suitcase = this.suitcase;
    suitcase.castShadow = this.isShadow;

    const outerGroup = new THREE.Group();
    const innerGroup = new THREE.Group();
    innerGroup.add(suitcase);
    outerGroup.add(innerGroup);
    outerGroup.name = name;
    outerGroup.position.set(-340, -30, 790);
    outerGroup.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-20.0), 0), `XYZ`);
    this.scene.add(outerGroup);
  }

  initSuitcaseAnimations() {
    const objectAnimation = this.scene.children.find((item) => (item.name === 'suitcase'));
    this.animationsScene1.push(new Animation({
      func: (progress) => {
        objectAnimation.position.y = -30 + progress * (-180 + 30);
      },
      duration: 300,
      delay: 0,
      easing: _.easeInSine
    }));
    this.animationsScene1.push(new Animation({
      func: (progress) => {
        objectAnimation.children[0].children[0].scale.set(
          1 - 0.05 * progress, 1 + 0.1 * progress, 1 - 0.05 * progress
        );
      },
      duration: 300,
      delay: 0,
      easing: _.easeInSine
    }));

    this.animationsScene1.push(new Animation({
      func: (progress) => {
        objectAnimation.children[0].children[0].scale.set(
          0.95 + 0.15 * progress, 1.1 - 0.15 * progress, 0.95 + 0.15 * progress
        );
      },
      duration: 250,
      delay: 300,
      easing: _.easeInOutCubic
    }));
    this.animationsScene1.push(new Animation({
      func: (progress) => {
        objectAnimation.children[0].children[0].scale.set(
          1.1 - 0.115 * progress, 0.95 + 0.08 * progress, 1.1 - 0.115 * progress
        );
      },
      duration: 250,
      delay: 550,
      easing: _.easeInOutCubic
    }));
    this.animationsScene1.push(new Animation({
      func: (progress) => {
        objectAnimation.children[0].children[0].scale.set(
          0.985 + 0.015 * progress, 1.03 - 0.03 * progress, 0.985 + 0.015 * progress
        );
      },
      duration: 150,
      delay: 800,
      easing: _.easeInOutCubic
    }));
  }

  initDogAnimation() {
    const objectAnimation = this.scene.getObjectByName('Tail');
    this.animationsScene1.push(new Animation({
      func: (progress, details) => {
        const progressFactor = Math.floor((details.currentTime - details.startTime) / 1000 % 6);
        const amp = progressFactor > 2 && progressFactor < 6 ? 0.8 : 0.4;
        objectAnimation.rotation.x = amp * Math.sin(6 * Math.PI * (details.currentTime - details.startTime) / 1000);
      },
      duration: `infinite`,
    }));
  }

  initSaturnAnimation() {
    const objectAnimation = this.scene.getObjectByName('saturn1');
    this.animationsScene1.push(new Animation({
      func: (progress, details) => {
        const time = (details.currentTime - details.startTime) / 1000;
        objectAnimation.rotation.z = THREE.MathUtils.degToRad(1 * Math.sin(time));
        objectAnimation.rotation.x = THREE.MathUtils.degToRad(-1 * Math.cos(time));
      },
      duration: `infinite`,
    }));

    const objectAnimationRing = objectAnimation.getObjectByName('ring');
    this.animationsScene1.push(new Animation({
      func: (progress, details) => {
        const time = (details.currentTime - details.startTime) / 1000;
        objectAnimationRing.rotation.x = THREE.MathUtils.degToRad(-3 * Math.sin(time));
        objectAnimationRing.rotation.y = THREE.MathUtils.degToRad(7 * Math.sin(time));
        objectAnimationRing.rotation.z = THREE.MathUtils.degToRad(-12 + 3 * Math.sin(time));
      },
      duration: `infinite`,
    }));
  }

  initLeafAnimation() {
    const objectAnimation1 = this.scene.getObjectByName('leaf1');
    this.animationsScene2.push(new Animation({
      func: (progress, details) => {
        const time = ((details.currentTime - details.startTime) / 300) % 16;
        objectAnimation1.rotation.z = 0.3 * Math.exp(-0.2 * time) * Math.cos(1.2 * time + Math.PI / 2);
      },
      duration: `infinite`,
    }));
    const objectAnimation2 = this.scene.getObjectByName('leaf2');
    this.animationsScene2.push(new Animation({
      func: (progress, details) => {
        const time = ((details.currentTime - details.startTime) / 300) % 16;
        objectAnimation2.rotation.z = 0.5 * Math.exp(-0.2 * time) * Math.cos(0.9 * time + Math.PI / 2) + THREE.MathUtils.degToRad(45);
      },
      duration: `infinite`,
    }));
  }

  initCompassAnimation() {
    const objectAnimation = this.scene.getObjectByName('compass').children[0];
    this.animationsScene3.push(new Animation({
      func: (progress, details) => {
        const time = (details.currentTime - details.startTime) / 1000;
        objectAnimation.rotation.z = THREE.MathUtils.degToRad(15) * Math.sin(2 * time);
      },
      duration: `infinite`,
    }));
  }

  initSaturnAnimation2() {
    const objectAnimation = this.scene.getObjectByName('saturn2');
    this.animationsScene4.push(new Animation({
      func: (progress, details) => {
        const time = (details.currentTime - details.startTime) / 1000;
        objectAnimation.rotation.z = THREE.MathUtils.degToRad(1 * Math.sin(time));
        objectAnimation.rotation.x = THREE.MathUtils.degToRad(-1 * Math.cos(time));
      },
      duration: `infinite`,
    }));

    const objectAnimationRing = objectAnimation.getObjectByName('ring');
    this.animationsScene4.push(new Animation({
      func: (progress, details) => {
        const time = (details.currentTime - details.startTime) / 1000;
        objectAnimationRing.rotation.x = THREE.MathUtils.degToRad(-3 * Math.sin(time));
        objectAnimationRing.rotation.y = THREE.MathUtils.degToRad(7 * Math.sin(time));
        objectAnimationRing.rotation.z = THREE.MathUtils.degToRad(-12 + 3 * Math.sin(time));
      },
      duration: `infinite`,
    }));
  }

  initSonyaAnimation() {
    const sonyaObjectAnimation = this.scene.getObjectByName('sonya');
    const rightHandObject = sonyaObjectAnimation.getObjectByName(`RightHand`);
    const leftHandObject = sonyaObjectAnimation.getObjectByName(`LeftHand`);

    this.animationsScene4.push(new Animation({
      func: (progress, details) => {
        const time = (details.currentTime - details.startTime) / 1000;
        sonyaObjectAnimation.position.y = 10 * Math.sin(time * 2) + 100;
      },
      duration: `infinite`,
    }));

    this.animationsScene4.push(new Animation({
      func: (progress, details) => {
        const time = (details.currentTime - details.startTime) / 1000;
        rightHandObject.rotation.y = THREE.MathUtils.degToRad(-55) + THREE.MathUtils.degToRad(5) * Math.cos(1.5 + time * 2);
      },
      duration: `infinite`,
    }));

    this.animationsScene4.push(new Animation({
      func: (progress, details) => {
        const time = (details.currentTime - details.startTime) / 1000;
        leftHandObject.rotation.y = THREE.MathUtils.degToRad(55) + THREE.MathUtils.degToRad(5) * Math.cos(-1.5 + time * 2);
      },
      duration: `infinite`,
    }));
  }

  setViewScene(i) {
    this.storyScenes.rotation.copy(new THREE.Euler(0, i * (-90) * THREE.Math.DEG2RAD, 0));
    this.animationsScene1.forEach((animation) => animation.stop());
    this.animationsScene2.forEach((animation) => animation.stop());
    this.animationsScene3.forEach((animation) => animation.stop());
    this.animationsScene4.forEach((animation) => animation.stop());
    this[`animationsScene${i+1}`].forEach((animation) => animation.start());
    this.render();

    if (this.loadedTextures.length) {
      this.camera.position.x = this.stepScene * i;
      this.light.position.x = this.camera.position.x;
      this.currentSlide = i;
      if (this.currentSlide === 1) {
        this.currentAnimateColorCount = 0;
        this.hue = parseFloat(getRandomInteger(this.textures[1].hueRange[0], this.textures[1].hueRange[1]));
        this.materials[1].uniforms.hueShift.value = 0.0;
        this.materials[1].needsUpdate = true;
        this.isAnimateScene = true;
        this.startTime = performance.now();
        requestAnimationFrame(this.renderAnimation);
      } else {
        this.isAnimateScene = false;
        this.startTime = null;
        this.render();
      }
    }
  }

  animateColor(progress) {
    this.materials[1].uniforms.hueShift.value = this.hue * progress;
    this.materials[1].needsUpdate = true;
  }

  animateCircles(progressX, progressY) {
    this.materials[1].uniforms.paramArrayCircles.value.map((item, index) => {
      item.centerX = this.textures[1].paramCircles[index].centerX + 1.8 * progressX;
      item.centerY = this.textures[1].paramCircles[index].centerY + (1.45 + index / 4) * progressY;
    })
    this.materials[1].needsUpdate = true;
  }

  renderAnimation(time) {
    if (this.currentSlide === 1 && this.isAnimateScene) {
      let timeFractionColor = (time - this.startTime - this.animateHueDuration * this.currentAnimateColorCount) / this.animateHueDuration;
      if (timeFractionColor > 1) {
        this.currentAnimateColorCount++;
        this.hue = parseFloat(getRandomInteger(this.textures[1].hueRange[0], this.textures[1].hueRange[1]));
      }
      let timeFractionCircle = (time - this.startTime) / this.animateTotalDuration;
      if (timeFractionCircle > 1) {
        timeFractionCircle = 1;
      }
      let progressColor = _.easeInOutLinear(timeFractionColor);
      let progressCirclesX = _.easeDampedWave(timeFractionCircle);
      let progressCirclesY = _.easeLinear(timeFractionCircle);
      this.animateColor(progressColor);
      this.animateCircles(progressCirclesX, progressCirclesY);
      this.renderer.render(this.scene, this.camera);
      if (timeFractionCircle < 1) {
        requestAnimationFrame(this.renderAnimation);
      }
    }
  }
}

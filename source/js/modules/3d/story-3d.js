import * as THREE from 'three';
import Scene3D from './scene-3d';
import AllStoryScene from './all-story-scene';
import {vertexShader} from './vertex-shader.js';
import {fragmentShader} from './fragment-shader.js';
import {getRandomInteger, isMobile} from './../helpers.js';
import _ from './../utils.js';
import {suitcaseStory} from "./get-suitcase";

export default class Story3D extends Scene3D {
  constructor(options) {
    super();
    this.canvasId = options.canvasId;
    this.textures = options.textures;
    this.objectsComposition = options.objectsComposition;
    this.loadManager = options.loadManager;
    this.suitcase = suitcaseStory;

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
    //this.light.position.y = this.camera.position.y;
    this.light.position.y = 180;
    this.light.position.z = this.camera.position.z;

    //this.loadTextures();
    this.loadManager.onLoad = () => {
      //this.getTextureScenes();
      //this.getSphere();
      this.addStoryScenes();
      this.addSuitcase();
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
    //storyScenes.position.set(0, 0, 0);
    this.storyScenes = storyScenes;
    this.scene.add(this.storyScenes);
  }

  addSuitcase() {
    const suitcase = this.suitcase;
    suitcase.position.set(-340, -180, 790);
    //suitcase.position.set(-340, 0, 790);
    suitcase.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-20.0), 0), `XYZ`);
    suitcase.castShadow = this.isShadow;
    this.scene.add(suitcase);
  }

  setViewScene(i) {
    this.storyScenes.rotation.copy(new THREE.Euler(0, i * (-90) * THREE.Math.DEG2RAD, 0));

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

import * as THREE from 'three';
import {vertexShader} from './vertex-shader.js';
import {fragmentShader} from './fragment-shader.js';
import {getRandomInteger} from './../helpers.js';
import _ from './../utils.js';

export default class Scene3D {
  constructor(options) {
    this.canvasId = options.canvasId;
    this.width = options.width;
    this.height = options.height;
    this.aspectRation = this.width / this.height;
    this.alpha = options.alpha;
    this.backgroundColor = options.backgroundColor;
    this.fov = options.cameraOptions.fov;
    this.near = options.cameraOptions.near;
    this.far = options.cameraOptions.far;
    this.positionZ = options.cameraOptions.positionZ;
    this.textures = options.textures;
    this.stepScene = options.stepScene;
    this.render = this.render.bind(this);
    this.renderAnimation = this.renderAnimation.bind(this);
    this.currentSlide = 0;
    this.isAnimateScene = false;
    this.startTime = null;
    this.materials = [];
    this.animateTotalDuration = 2000;
    this.animateHueDuration = 660;
    this.currentAnimateColorCount = 0;
    this.hue = 0.0;
  }

  init() {
    this.canvas = document.getElementById(this.canvasId);
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.scene = new THREE.Scene();
    this.color = new THREE.Color(this.backgroundColor);

    this.camera = new THREE.PerspectiveCamera(this.fov, this.aspectRation, this.near, this.far);
    this.camera.position.z = this.positionZ;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    });
    this.renderer.setClearColor(this.color, this.alpha);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);
    const loadedTextures = this.textures.map((texture) => textureLoader.load(texture.url));
    const geometry = new THREE.PlaneGeometry(1, 1);
    let material;

    loadManager.onLoad = () => {
      loadedTextures.forEach((texture, i) => {
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
      this.render()
    };
  }

  setViewScene(i) {
    this.camera.position.x = this.stepScene * i;
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

  render() {
    this.renderer.render(this.scene, this.camera);
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

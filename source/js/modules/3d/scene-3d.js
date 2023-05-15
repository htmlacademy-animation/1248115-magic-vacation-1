import * as THREE from 'three';
import {vertexShader} from './vertex-shader.js';
import {fragmentShader} from './fragment-shader.js';
import {getRandomInteger} from './../helpers.js';

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
    this.animateHueDuration = 395;
    this.currentAnimationCount = 1;
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
      this.isAnimateScene = true;
      this.startTime = Date.now();
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

  animateHue() {
    let nowTime = Date.now();
    if ((nowTime - this.startTime) / this.currentAnimationCount > this.animateHueDuration) {
      const hue = parseFloat(getRandomInteger(this.textures[1].hueRange[0], this.textures[1].hueRange[1]));
      this.materials[1].uniforms.hueShift.value = hue;
      this.materials[1].needsUpdate = true;
      this.currentAnimationCount++;
    }
  }

  renderAnimation() {
    if (this.currentSlide === 1 && this.isAnimateScene) {
      this.animateHue();
      this.renderer.render(this.scene, this.camera);
      let endTime = Date.now();
      if (endTime - this.startTime < this.animateTotalDuration) {
        requestAnimationFrame(this.renderAnimation);
      } else {
        this.currentAnimationCount = 1;
      }
    }
  }
}

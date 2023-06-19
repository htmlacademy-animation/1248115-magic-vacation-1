import * as THREE from 'three';
import Scene3D from './scene-3d';
import {vertexShader} from './vertex-shader.js';
import {fragmentShader} from './fragment-shader.js';

export default class Intro3D extends Scene3D {
  constructor(options) {
    super()
    this.canvasId = options.canvasId;
    this.textures = options.textures;
    this.composition = options.objectsComposition[0];
    this.loadManager = options.loadManager;
    this.start = false;
  }

  init() {
    super.init();
    //this.loadTextures();
    this.loadManager.onLoad = () => {
      this.getObjectsComposition();

      if (this.composition) {
        if (this.isAnimateRender) {
          setTimeout(() => this.composition.animations.forEach((animation) => animation.start(), 500));
        }
        this.start = true;
      }

      this.render();
    };
  };

  getTextureScenes() {
    const geometry = new THREE.PlaneGeometry(1, 1);
    let material;
    this.loadedTextures.forEach((texture, i) => {
      material = new THREE.RawShaderMaterial({
        uniforms: {
          map: {
            value: texture
          },
          ratio: {
            value: this.textures[i].scaleX / this.textures[i].scaleY
          },
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

  getObjectsComposition() {
    this.scene.add(this.composition);
  }
}

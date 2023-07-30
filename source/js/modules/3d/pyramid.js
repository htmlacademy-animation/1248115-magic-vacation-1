import * as THREE from "three";
import {isMobile} from './../helpers';
import {textureLoader} from './texture-loader';

export default class Pyramid extends THREE.Group {
  constructor(options) {
    super();
    this.pyramidColor = options.pyramidColor;
    this.metalness = options.metalness;
    this.roughness = options.roughness;
    this.matcapMaterial = options.matcapMaterial;
    this.isShadow = !isMobile();
    this.textureLoader = textureLoader;

    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid();
  }

  addPyramid() {
    let material;
    if (this.isShadow) {
      material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(this.pyramidColor),
        metalness: this.metalness,
        roughness: this.roughness
      });
    } else {
      material = new THREE.MeshMatcapMaterial({
        color: new THREE.Color(this.pyramidColor),
        matcap: this.textureLoader.load(this.matcapMaterial),
      });
    }
    const geometry = new THREE.ConeGeometry(Math.hypot(250, 250) / 2, 280, 4);
    const mesh = new THREE.Mesh(geometry, material);
    if (this.isShadow) {
      mesh.castShadow = this.isShadow;
      mesh.receiveShadow = this.isShadow;
    }
    this.add(mesh);
  }
}

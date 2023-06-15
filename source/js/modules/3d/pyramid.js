import * as THREE from "three";
import {isMobile} from './../helpers.js';

export default class Pyramid extends THREE.Group {
  constructor(options) {
    super();
    this.pyramidColor = options.pyramidColor;
    this.metalness = options.metalness;
    this.roughness = options.roughness;
    this.isShadow = !isMobile();

    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid();
  }

  addPyramid() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.pyramidColor),
      metalness: this.metalness,
      roughness: this.roughness
    });
    const geometry = new THREE.ConeGeometry(Math.hypot(250, 250) / 2, 280, 4);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = this.isShadow;
    mesh.receiveShadow = this.isShadow;
    this.add(mesh);
  }
}

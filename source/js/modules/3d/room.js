import * as THREE from 'three';
import {getLatheDegrees } from './three-utils';
import {loadModel} from "./model-3d-loader";
import {loadManagerStory} from "./load-manager";

export default class Room extends THREE.Group {
  constructor(options) {
    super();

    this.loadManager = loadManagerStory;
    this.wallColor = options.wallColor;
    this.floorColor = options.floorColor;
    this.metalness = options.metalness,
    this.roughness = options.roughness
    this.startDeg = 0;
    this.finishDeg = 90;

    this.constructChildren();
  }

  constructChildren() {
    this.addWall();
    this.addFloor();
  }

  addWall() {
    const name = `wallCornerUnit`;
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.wallColor),
      metalness: this.metalness,
      roughness: this.roughness,
      side: THREE.DoubleSide,
    });
    loadModel(this.loadManager, name, material, (mesh) => {
      mesh.name = name;
      const scale = 1;
      mesh.position.set(0, 0, 0);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-45.0), 0));
      this.add(mesh);
    });
  }

  addFloor() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.floorColor),
      metalness: this.metalness,
      roughness: this.roughness,
      side: THREE.DoubleSide,
    });
    const {start, length} = getLatheDegrees(this.startDeg, this.finishDeg);
    const geometry = new THREE.CircleGeometry(1350, 30, start, length);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(90), 0, THREE.MathUtils.degToRad(45)));
    this.add(mesh);
  }
};

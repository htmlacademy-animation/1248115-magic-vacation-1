import * as THREE from 'three';
import {getLathePoints, getLatheDegrees} from './three-utils';

export default class Carpet extends THREE.Group {
  constructor() {
    super();

    this.colorBase = 0x9070b7;
    this.colorStrips = 0x6548a0;
    this.width = 180;
    this.thickness = 3;
    this.innerRadius = 763;
    this.startDeg = 16;
    this.finishDeg = 74;
    this.lengthStrip = (this.finishDeg - this.startDeg) / 7;

    this.constructChildren();
  }

  constructChildren() {
    this.addBase();
    this.addStrips();
  }

  addBase() {
    const points = getLathePoints(this.width, this.thickness, this.innerRadius);
    const {start, length} = getLatheDegrees(this.startDeg, this.finishDeg);
    const material = new THREE.MeshBasicMaterial({
      color: this.colorBase,
      flatShading: true
    });
    const geometry = new THREE.LatheGeometry(points, 50, start, length);
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
  }

  addStrips() {
    const material = new THREE.MeshBasicMaterial({
      color: this.colorStrips,
      flatShading: true
    });

    for (let index = 1; index < 6; index += 2) {
      const points = getLathePoints(this.width, this.thickness, this.innerRadius);
      const {start, length} = getLatheDegrees(this.startDeg + this.lengthStrip * index, this.startDeg + this.lengthStrip * (index + 1));
      const geometry = new THREE.LatheGeometry(points, 5, start, length);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 1, 0);
      this.add(mesh);
    }
  }
}

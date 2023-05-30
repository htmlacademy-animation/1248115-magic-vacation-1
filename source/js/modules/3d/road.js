import * as THREE from 'three';
import {getLathePoints, getLatheDegrees} from './three-utils';

export default class Road extends THREE.Group {
  constructor() {
    super();

    this.colorBase = 0x555b6a;
    this.colorStrips = 0xe2e7ee;
    this.widthBase = 160;
    this.thicknessBase = 3;
    this.innerRadiusBase = 732;
    this.widthStrip = 20;
    this.thicknessStrip = 3;
    this.innerRadiusStrip = 800;
    this.startDeg = 0;
    this.finishDeg = 90;
    this.lengthStrip = (this.finishDeg - this.startDeg) / 12;

    this.constructChildren();
  }

  constructChildren() {
    this.addBase();
    this.addStrips();
  }

  addBase() {
    const points = getLathePoints(this.widthBase, this.thicknessBase, this.innerRadiusBase);
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

    for (let index = 1; index < 12; index += 3) {
      const points = getLathePoints(this.widthStrip, this.thicknessStrip, this.innerRadiusStrip);
      const {start, length} = getLatheDegrees(this.startDeg + this.lengthStrip * index, this.startDeg + this.lengthStrip * (index + 1));
      const geometry = new THREE.LatheGeometry(points, 5, start, length);
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 1, 0);
      this.add(mesh);
    }
  }
}

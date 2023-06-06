import * as THREE from 'three';
import {getLathePoints} from './three-utils';

export default class Saturn extends THREE.Group {
  constructor(options) {
    super();

    this.colorSaturn = options.colorSaturn;
    this.colorRing = options.colorRing;
    this.metalness = options.metalness,
    this.roughness = options.roughness,
    this.widthRing = 40;
    this.thicknessRing = 2;
    this.innerRadiusRing = 80;

    this.constructChildren();
  }

  constructChildren() {
    this.addSphereBig();
    this.addRing();
  }

  addSphereBig() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.colorSaturn),
      metalness: this.metalness,
      roughness: this.roughness
    });
    const geometry = new THREE.SphereGeometry(60, 50, 50);
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
  }

  addRing() {
    const points = getLathePoints(this.widthRing, this.thicknessRing, this.innerRadiusRing);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.colorRing),
      metalness: this.metalness,
      roughness: this.roughness,
      side: THREE.DoubleSide
    });
    const geometry = new THREE.LatheGeometry(points, 50);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(20.0), 0, THREE.MathUtils.degToRad(18.0)), `XYZ`);
    this.add(mesh);
  }
}

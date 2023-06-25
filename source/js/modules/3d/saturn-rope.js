import * as THREE from 'three';
import Saturn from "./saturn";

export default class SaturnRope extends Saturn {
  constructor(options) {
    super(options);

    this.colorRope = options.colorRope;
  }

  constructChildren() {
    super.constructChildren();

    this.bigSphere.position.set(0, -1000, 0);
    this.ring.position.set(0, -1000, 0);
    this.addCylinder();
    this.addSphereSmall();
  }

  addCylinder() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.colorRope),
      metalness: this.metalness,
      roughness: this.roughness
    });
    const geometry = new THREE.CylinderGeometry(1, 1, 1000, 10);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, -500, 0);
    mesh.castShadow = this.isShadow;
    this.add(mesh);
  }

  addSphereSmall() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.colorRing),
      metalness: this.metalness,
      roughness: this.roughness
    });
    const geometry = new THREE.SphereGeometry(10, 30, 30);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 120 - 1000, 0);
    mesh.castShadow = this.isShadow;
    this.add(mesh);
  }
}

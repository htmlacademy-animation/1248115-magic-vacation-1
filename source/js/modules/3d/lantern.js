import * as THREE from "three";
import {isMobile} from './../helpers';

export default class Lantern extends THREE.Group {
  constructor(options) {
    super();
    this.lanternColor = options.lanternColor;
    this.lampColor = options.lampColor;
    this.metalness = options.metalness;
    this.roughness = options.roughness;
    this.isShadow = !isMobile();

    this.constructChildren();
  }

  constructChildren() {
    this.addBottomCylinder();
    this.addSphere();
    this.addCentralCylinder();
    this.addBottomLamp();
    this.addCentralLamp();
    this.addTopLamp();
  }

  addBottomCylinder() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.lanternColor),
      metalness: this.metalness,
      roughness: this.roughness
    });
    const geometry = new THREE.CylinderGeometry(16, 16, 120, 30);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = this.isShadow;
    this.add(mesh);
  }

  addSphere() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.lanternColor),
      metalness: this.metalness,
      roughness: this.roughness
    });
    const geometry = new THREE.SphereGeometry(16, 30, 30);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = this.isShadow;
    mesh.position.set(0, 60, 0);
    this.add(mesh);
  }

  addCentralCylinder() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.lanternColor),
      metalness: this.metalness,
      roughness: this.roughness
    });
    const geometry = new THREE.CylinderGeometry(7, 7, 230, 30);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 191, 0);
    mesh.castShadow = this.isShadow;
    this.add(mesh);
  }

  addBottomLamp() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.lanternColor),
      metalness: this.metalness,
      roughness: this.roughness
    });
    const geometry = new THREE.BoxGeometry(37, 4, 37);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 303, 0);
    mesh.castShadow = this.isShadow;
    this.add(mesh);
  }

  addCentralLamp() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.lampColor),
      metalness: this.metalness,
      roughness: this.roughness,
      emissive: 0x052052,
    });
    const geometry = new THREE.CylinderGeometry(Math.hypot(42, 42) / 2, Math.hypot(34, 34) / 2, 60, 4);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 335, 0);
    mesh.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(45.0), 0, `XYZ`));
    mesh.castShadow = this.isShadow;
    this.add(mesh);
  }

  addTopLamp() {
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.lanternColor),
      metalness: this.metalness,
      roughness: this.roughness
    });
    const geometry = new THREE.CylinderGeometry(Math.hypot(45, 45) / 2, Math.hypot(57, 57) / 2, 6, 4);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 368, 0);
    mesh.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(45.0), 0, `XYZ`));
    mesh.castShadow = this.isShadow;
    this.add(mesh);
  }
}

import * as THREE from 'three';
import {isMobile} from './../helpers.js';
import {textureLoader} from './texture-loader';

export default class Snowman extends THREE.Group {
  constructor(options) {
    super();
    this.colorSphere = options.colorSphere;
    this.metalnessSphere = options.metalnessSphere;
    this.roughnessSphere = options.roughnessSphere;
    this.colorCone = options.colorCone;
    this.metalnessCone = options.metalnessCone;
    this.roughnessCone = options.roughnessCone;
    this.matcapMaterialSphere = options.matcapMaterialSphere;
    this.matcapMaterialCone = options.matcapMaterialCone;
    this.isShadow = !isMobile();
    this.textureLoader = textureLoader;

    this.constructChildren();
  }

  constructChildren() {
    this.addTopSphere();
    this.addBottomSphere();
    this.addCone();
  }

  addTopSphere() {
    let material;
    if (this.isShadow) {
      material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(this.colorSphere),
        metalness: this.metalnessSphere,
        roughness: this.roughnessSphere,
        emissive: 0x243452,
      });
    } else {
      material = new THREE.MeshMatcapMaterial({
        color: new THREE.Color(this.colorSphere),
        matcap: this.textureLoader.load(this.matcapMaterialSphere),
      });
    }
    const geometry = new THREE.SphereGeometry(44, 30, 30);
    const mesh = new THREE.Mesh(geometry, material);
    if (this.isShadow) {
      mesh.castShadow = this.isShadow;
    }
    this.add(mesh);
  }

  addBottomSphere() {
    let material;
    if (this.isShadow) {
      material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(this.colorSphere),
        metalness: this.metalnessSphere,
        roughness: this.roughnessSphere,
        emissive: 0x243452,
      });
    } else {
      material = new THREE.MeshMatcapMaterial({
        color: new THREE.Color(this.colorSphere),
        matcap: this.textureLoader.load(this.matcapMaterialSphere),
      });
    }
    const geometry = new THREE.SphereGeometry(78, 30, 30);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, -108, 0);
    if (this.isShadow) {
      mesh.castShadow = this.isShadow;
    }
    this.add(mesh);
  }

  addCone() {
    let material;
    if (this.isShadow) {
      material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(this.colorCone),
        metalness: this.metalnessCone,
        roughness: this.roughnessCone
      });
    } else {
      material = new THREE.MeshMatcapMaterial({
        color: new THREE.Color(this.colorCone),
        matcap: this.textureLoader.load(this.matcapMaterialCone),
      });
    }
    const geometry = new THREE.ConeGeometry(18, 75, 30);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.copy(new THREE.Euler(0, 0, THREE.MathUtils.degToRad(-90.0), `XYZ`));
    mesh.position.set(45, 0, 0);
    if (this.isShadow) {
      mesh.castShadow = this.isShadow;
    }
    this.add(mesh);
  }
}

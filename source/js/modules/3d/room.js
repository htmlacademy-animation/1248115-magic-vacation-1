import * as THREE from 'three';
import {getLatheDegrees} from './three-utils';
import {loadModel} from "./model-3d-loader";
import {isMobile} from './../helpers';
import {textureLoader} from './texture-loader';

export default class Room extends THREE.Group {
  constructor(options) {
    super();
    this.wallColor = options.wallColor;
    this.floorColor = options.floorColor;
    this.metalness = options.metalness;
    this.roughness = options.roughness;
    this.matcapMaterial = options.matcapMaterial;
    this.startDeg = 0;
    this.finishDeg = 90;
    this.isShadow = !isMobile();
    this.textureLoader = textureLoader;

    this.constructChildren();
  }

  constructChildren() {
    this.addWall();
    this.addFloor();
  }

  addWall() {
    const name = `wallCornerUnit`;
    let material;
    if (this.isShadow) {
      material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(this.wallColor),
        metalness: this.metalness,
        roughness: this.roughness,
        side: THREE.DoubleSide,
      });
    } else {
      material = new THREE.MeshMatcapMaterial({
        color: new THREE.Color(this.wallColor),
        matcap: this.textureLoader.load(this.matcapMaterial),
        side: THREE.DoubleSide,
      });
    }
    loadModel(name, material, (mesh) => {
      mesh.name = name;
      const scale = 1;
      mesh.position.set(0, 0, 0);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(45.0), 0));
      this.add(mesh);
    });
  }

  addFloor() {
    let material;
    if (this.isShadow) {
      material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(this.floorColor),
        metalness: this.metalness,
        roughness: this.roughness,
        side: THREE.DoubleSide,
      });
    } else {
      material = new THREE.MeshMatcapMaterial({
        color: new THREE.Color(this.floorColor),
        matcap: this.textureLoader.load(this.matcapMaterial),
      });
    }
    const {start, length} = getLatheDegrees(this.startDeg, this.finishDeg);
    const geometry = new THREE.CircleGeometry(1350, 30, start, length);
    const mesh = new THREE.Mesh(geometry, material);
    const scale = 1.3;
    mesh.scale.set(scale, scale, scale);
    mesh.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(90), 0, THREE.MathUtils.degToRad(45)));
    if (this.isShadow) {
      mesh.receiveShadow = this.isShadow;
    }
    this.add(mesh);
  }
}

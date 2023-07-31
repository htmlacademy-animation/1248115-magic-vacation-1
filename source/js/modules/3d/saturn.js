import * as THREE from 'three';
import {getLathePoints} from './three-utils';
import {isMobile} from './../helpers';
import {textureLoader} from './texture-loader';

export default class Saturn extends THREE.Group {
  constructor(options) {
    super();

    this.colorSaturn = options.colorSaturn;
    this.colorRing = options.colorRing;
    this.metalness = options.metalness;
    this.roughness = options.roughness;
    this.matcapMaterial = options.matcapMaterial;
    this.widthRing = 40;
    this.thicknessRing = 2;
    this.innerRadiusRing = 80;
    this.isShadow = !isMobile();
    this.textureLoader = textureLoader;

    this.constructChildren();
  }

  constructChildren() {
    this.addSphereBig();
    this.addRing();
  }

  addSphereBig() {
    let material;
    if (this.isShadow) {
      material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(this.colorSaturn),
        metalness: this.metalness,
        roughness: this.roughness
      });
    } else {
      material = new THREE.MeshMatcapMaterial({
        color: new THREE.Color(this.colorSaturn),
        matcap: this.textureLoader.load(this.matcapMaterial),
      });
    }
    const geometry = new THREE.SphereGeometry(60, 50, 50);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = `SphereSaturn`;
    this.bigSphere = mesh;
    if (this.isShadow) {
      mesh.castShadow = this.isShadow;
    }
    this.add(mesh);
  }

  addRing() {
    const points = getLathePoints(this.widthRing, this.thicknessRing, this.innerRadiusRing);
    let material;
    if (this.isShadow) {
      material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(this.colorRing),
        metalness: this.metalness,
        roughness: this.roughness,
        side: THREE.DoubleSide
      });
    } else {
      material = new THREE.MeshMatcapMaterial({
        color: new THREE.Color(this.colorRing),
        matcap: this.textureLoader.load(this.matcapMaterial),
      });
    }
    const geometry = new THREE.LatheGeometry(points, 50);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = `ring`;
    mesh.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(10.0), 0, THREE.MathUtils.degToRad(10.0)), `XYZ`);
    this.ring = mesh;
    if (this.isShadow) {
      mesh.castShadow = this.isShadow;
    }
    this.add(mesh);
  }
}

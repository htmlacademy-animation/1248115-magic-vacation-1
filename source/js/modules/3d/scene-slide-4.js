import * as THREE from "three";
import SvgLoader from "./svg-loader";
import {color3D} from './data-3d';
import {reflection3D} from './data-3d';
import SaturnRope from "./saturn-rope";
import Carpet from "./carpet";
import Room from "./room";
import {loadModel} from "./model-3d-loader";
import {loadManagerStory} from "./load-manager";

export default class SceneSlide4 extends THREE.Group {
  constructor() {
    super();
    this.loadManager = loadManagerStory;
    this.constructChildren();
  }

  constructChildren() {
    this.addRoom({
      wallColor: color3D.ShadowedPurple,
      floorColor: color3D.ShadowedDarkPurple,
      metalness: reflection3D.basic.metalness,
      roughness: reflection3D.basic.roughness,
    });
    this.addStaticObjects();
    this.addSonya();
    this.addSaturn({
      colorSaturn: color3D.ShadowedDominantRed,
      colorRing: color3D.ShadowedBrightPurple,
      colorRope: color3D.MetalGrey,
      metalness: reflection3D.soft.metalness,
      roughness: reflection3D.soft.roughness
    });
    this.addCarpet({
      mainColor: color3D.ShadowedLightPurple,
      additionalColor: color3D.ShadowedAdditionalPurple,
    });
    this.addFlowers();
  }

  addRoom(options) {
    const room = new Room(options);
    this.add(room);
  }

  addStaticObjects() {
    const name = `staticObjects4`;
    loadModel(this.loadManager, name, null, (mesh) => {
      mesh.name = name;
      mesh.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-45), 0), `XYZ`);
      this.add(mesh);
    });
  }

  addSonya() {
    const name = `sonya`;
    loadModel(this.loadManager, name, null, (mesh) => {
      mesh.name = name;
      const scale = 1.2;
      mesh.scale.set(scale, scale, scale);
      mesh.position.set(120, 90, 400);
      mesh.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-45), 0), `XYZ`);
      this.add(mesh);
    });
  }

  addSaturn(options) {
    const saturn = new SaturnRope(options);
    saturn.position.set(60, 480, 320);
    this.add(saturn);
  }

  addCarpet(options) {
    const carpet = new Carpet(options);
    const scale = 1;
    carpet.scale.set(scale, scale, scale);
    carpet.position.set(15, 0, 15);
    carpet.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-45.0), 0), `XYZ`);
    this.add(carpet);
  }

  addFlowers() {
    const flower = new SvgLoader(`flower2`).createSvgGroup();
    const scale = 0.8;
    flower.position.set(-240, 335, 320);
    flower.scale.set(scale, -scale, scale);
    flower.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(45.0), 0), `XYZ`);
    this.add(flower);
  }
};

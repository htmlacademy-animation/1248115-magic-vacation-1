import * as THREE from "three";
import SvgLoader from "./svg-loader";
import {color3D} from './data-3d';
import {reflection3D} from './data-3d';
import Carpet from "./carpet";
import SaturnRope from "./saturn-rope";
import Room from "./room";
import {loadModel} from "./model-3d-loader";
import {loadManagerStory} from "./load-manager";
//import {isMobile} from './../helpers.js';

export default class SceneSlide1 extends THREE.Group {
  constructor() {
    super();
    this.loadManager = loadManagerStory;
    //this.isShadow = !isMobile();
    this.constructChildren();
  }

  constructChildren() {
    this.addRoom({
      wallColor: color3D.Purple,
      floorColor: color3D.DarkPurple,
      metalness: reflection3D.soft.metalness,
      roughness: reflection3D.soft.roughness,
    });
    this.addStaticObjects();
    this.addDog();
    this.addFlowers();
    this.addCarpet({
      mainColor: color3D.LightPurple,
      additionalColor: color3D.AdditionalPurple,
    });
    this.addSaturn({
      colorSaturn: color3D.DominantRed,
      colorRing: color3D.BrightPurple,
      colorRope: color3D.MetalGrey,
      metalness: reflection3D.soft.metalness,
      roughness: reflection3D.soft.roughness
    });
  }

  addRoom(options) {
    const room = new Room(options);
    this.add(room);
  }

  addStaticObjects() {
    const name = `staticObjects1`;
    loadModel(this.loadManager, name, null, (mesh) => {
      mesh.name = name;
      mesh.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-45), 0), `XYZ`);
      this.add(mesh);
    });
  }

  addDog() {
    const name = `dog`;
    loadModel(this.loadManager, name, null, (mesh) => {
      mesh.name = name;
      mesh.position.set(50, 0, 650);
      mesh.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(15), 0), `XYZ`);
      this.add(mesh);
    });
  }

  addFlowers() {
    const flower = new SvgLoader(`flower`).createSvgGroup();
    const scale = 0.8;
    flower.position.set(-240, 335, 320);
    flower.scale.set(scale, -scale, scale);
    flower.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(43.0), 0), `XYZ`);
    this.add(flower);
  }

  addCarpet(options) {
    const carpet = new Carpet(options);
    const scale = 1;
    carpet.scale.set(scale, scale, scale);
    carpet.position.set(15, 0, 15);
    carpet.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-45.0), 0), `XYZ`);
    this.add(carpet);
  }

  addSaturn(options) {
    const saturn = new SaturnRope(options);
    saturn.position.set(60, 480, 320);
    this.add(saturn);
  }
};

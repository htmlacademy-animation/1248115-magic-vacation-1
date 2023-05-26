import * as THREE from "three";
import Lantern from "./lantern";
import Pyramid from "./pyramid";

export default class SceneSlide2 extends THREE.Group {
  constructor() {
    super();
    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid();
    this.addLantern();
  }

  addPyramid() {
    let pyramid = new Pyramid();
    pyramid.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, 0, 0, `XYZ`));
    pyramid.position.set(-8, -60, 25);
    this.add(pyramid);
  }

  addLantern() {
    let lantern = new Lantern();
    lantern.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(15.0), THREE.MathUtils.degToRad(20.0), THREE.MathUtils.degToRad(-0.0), `XYZ`));
    lantern.position.set(380, -210, 12);
    this.add(lantern);
  }
};

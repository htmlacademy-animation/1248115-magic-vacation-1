import * as THREE from "three";
import SvgLoader from "./svg-loader";
import Carpet from "./carpet";
import Saturn from "./saturn";

export default class SceneSlide1 extends THREE.Group {
  constructor() {
    super();
    this.constructChildren();
  }

  constructChildren() {
    this.addFlowers();
    this.addCarpet();
    this.addSaturn();
  }

  addFlowers() {
    const flower = new SvgLoader(`flower`).createSvgGroup();
    const scale = 0.8;
    flower.position.set(-260, 170, 140);
    flower.scale.set(scale, -scale, scale);
    flower.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(40.0), THREE.MathUtils.degToRad(7.0)), `XYZ`);
    this.add(flower);
  }

  addCarpet() {
    const carpet = new Carpet();
    const scale = 0.7;
    carpet.scale.set(scale, scale, scale);
    carpet.position.set(0, -115, 0);
    carpet.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(13.0), THREE.MathUtils.degToRad(-52.0), 0), `XYZ`);
    this.add(carpet);
  }

  addSaturn() {
    const saturn = new Saturn();
    saturn.position.set(60, 240, 100);
    this.add(saturn);
  }
};

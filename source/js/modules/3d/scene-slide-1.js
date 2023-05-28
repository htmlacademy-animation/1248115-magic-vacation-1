import * as THREE from "three";
import SvgLoader from "./svg-loader";

export default class SceneSlide1 extends THREE.Group {
  constructor() {
    super();
    this.constructChildren();
  }

  constructChildren() {
    this.addFlowers();
  }

  addFlowers() {
    const flower = new SvgLoader(`flower`).createSvgGroup();
    const scale = 0.8;
    flower.position.set(-260, 170, 140);
    flower.scale.set(scale, -scale, scale);
    flower.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(40.0), THREE.MathUtils.degToRad(7.0)), `XYZ`);
    this.add(flower);
  }
};

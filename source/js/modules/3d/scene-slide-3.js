import * as THREE from "three";
import Snowman from "./snowman";

export default class SceneSlide3 extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addSnowman();
  }

  addSnowman() {
    const snowman = new Snowman();
    snowman.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(15.0), THREE.MathUtils.degToRad(-47.0), 0, `XYZ`));
    snowman.position.set(-130, -12, 0);
    this.add(snowman);
  }
};

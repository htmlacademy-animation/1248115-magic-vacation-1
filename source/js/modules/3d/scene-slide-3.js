import * as THREE from "three";
import {color3D} from './data-3d';
import {reflection3D} from './data-3d';
import Snowman from "./snowman";
import Road from "./road";

export default class SceneSlide3 extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addSnowman({
      colorSphere: color3D.SnowColor,
      metalnessSphere: reflection3D.strong.metalness,
      roughnessSphere: reflection3D.strong.roughness,
      colorCone: color3D.Orange,
      metalnessCone: reflection3D.soft.metalness,
      roughnessCone: reflection3D.soft.roughness
    });
    this.addRoad();
  }

  addSnowman(options) {
    const snowman = new Snowman(options);
    snowman.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(15.0), THREE.MathUtils.degToRad(-47.0), 0, `XYZ`));
    snowman.position.set(-130, -12, 0);
    this.add(snowman);
  }

  addRoad() {
    const road = new Road();
    const scale = 0.735;
    road.scale.set(scale, scale, scale);
    road.position.set(0, -100, 0);
    road.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(13.5), THREE.MathUtils.degToRad(-45.0), 0), `XYZ`);
    this.add(road);
  }
};

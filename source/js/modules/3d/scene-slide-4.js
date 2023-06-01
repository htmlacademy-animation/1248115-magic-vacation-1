import * as THREE from "three";
import {color3D} from './data-3d';
import {reflection3D} from './data-3d';
import Saturn from "./saturn";

export default class SceneSlide4 extends THREE.Group {
  constructor() {
    super();
    this.constructChildren();
  }

  constructChildren() {
    this.addSaturn({
      colorSaturn: color3D.ShadowedDominantRed,
      colorRing: color3D.ShadowedBrightPurple,
      colorRope: color3D.MetalGrey,
      metalness: reflection3D.soft.metalness,
      roughness: reflection3D.soft.roughness
    });
  }

  addSaturn(options) {
    const saturn = new Saturn(options);
    saturn.position.set(80, 240, 100);
    this.add(saturn);
  }
};

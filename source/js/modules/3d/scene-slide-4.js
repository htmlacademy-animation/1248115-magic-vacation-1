import * as THREE from "three";
import SvgLoader from "./svg-loader";
import {color3D} from './data-3d';
import {reflection3D} from './data-3d';
import SaturnRope from "./saturn-rope";
import Carpet from "./carpet";

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
    this.addCarpet({
      mainColor: color3D.ShadowedLightPurple,
      additionalColor: color3D.ShadowedAdditionalPurple,
    });
    this.addFlowers();
  }

  addSaturn(options) {
    const saturn = new SaturnRope(options);
    saturn.position.set(80, 240, 100);
    this.add(saturn);
  }

  addCarpet(options) {
    const carpet = new Carpet(options);
    const scale = 0.7;
    carpet.scale.set(scale, scale, scale);
    carpet.position.set(0, -115, 0);
    carpet.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(13.0), THREE.MathUtils.degToRad(-45.0), 0), `XYZ`);
    this.add(carpet);
  }

  addFlowers() {
    const flower = new SvgLoader(`flower2`).createSvgGroup();
    const scale = 0.8;
    flower.position.set(-250, 170, 130);
    flower.scale.set(scale, -scale, scale);
    flower.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(40.0), THREE.MathUtils.degToRad(7.0)), `XYZ`);
    this.add(flower);
  }
};

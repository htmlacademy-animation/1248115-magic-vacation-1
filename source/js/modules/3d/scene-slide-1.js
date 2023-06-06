import * as THREE from "three";
import SvgLoader from "./svg-loader";
import {color3D} from './data-3d';
import {reflection3D} from './data-3d';
import Carpet from "./carpet";
import SaturnRope from "./saturn-rope";

export default class SceneSlide1 extends THREE.Group {
  constructor() {
    super();
    this.constructChildren();
  }

  constructChildren() {
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

  addFlowers() {
    const flower = new SvgLoader(`flower`).createSvgGroup();
    const scale = 0.8;
    flower.position.set(-260, 170, 140);
    flower.scale.set(scale, -scale, scale);
    flower.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(40.0), THREE.MathUtils.degToRad(7.0)), `XYZ`);
    this.add(flower);
  }

  addCarpet(options) {
    const carpet = new Carpet(options);
    const scale = 0.7;
    carpet.scale.set(scale, scale, scale);
    carpet.position.set(0, -115, 0);
    carpet.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(13.0), THREE.MathUtils.degToRad(-52.0), 0), `XYZ`);
    this.add(carpet);
  }

  addSaturn(options) {
    const saturn = new SaturnRope(options);
    saturn.position.set(60, 240, 100);
    this.add(saturn);
  }
};

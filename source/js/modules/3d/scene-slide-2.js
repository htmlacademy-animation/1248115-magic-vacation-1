import * as THREE from "three";
import {color3D} from './data-3d';
import {reflection3D} from './data-3d';
import Lantern from "./lantern";
import Pyramid from "./pyramid";
import SvgLoader from "./svg-loader";

export default class SceneSlide2 extends THREE.Group {
  constructor() {
    super();
    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid({
      pyramidColor: color3D.Blue,
      metalness: reflection3D.soft.metalness,
      roughness: reflection3D.soft.roughness
    });
    this.addLantern({
      lanternColor: color3D.Blue,
      lampColor: color3D.LightBlue,
      metalness: reflection3D.soft.metalness,
      roughness: reflection3D.soft.roughness
    });
    this.addLeaf1();
    this.addLeaf2();
  }

  addPyramid(options) {
    const pyramid = new Pyramid(options);
    pyramid.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(10.0), 0, 0, `XYZ`));
    pyramid.position.set(-8, -60, 25);
    this.add(pyramid);
  }

  addLantern(options) {
    const lantern = new Lantern(options);
    lantern.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(15.0), THREE.MathUtils.degToRad(20.0), THREE.MathUtils.degToRad(-0.0), `XYZ`));
    lantern.position.set(380, -210, 12);
    this.add(lantern);
  }

  addLeaf1() {
    const leaf = new SvgLoader(`leafPyramid`).createSvgGroup();
    const scale = 2.3;
    leaf.position.set(-260, 86, 15);
    leaf.scale.set(scale, -scale, scale);
    leaf.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(4.0), THREE.MathUtils.degToRad(1.0)), `XYZ`);
    this.add(leaf);
  }

  addLeaf2() {
    const leaf = new SvgLoader(`leafPyramid`).createSvgGroup();
    const scale = 2;
    leaf.position.set(-290, -135, 10);
    leaf.scale.set(scale, -scale, scale);
    leaf.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(10.0), THREE.MathUtils.degToRad(40.0)), `XYZ`);
    this.add(leaf);
  }
};

import * as THREE from "three";
import {color3D} from './data-3d';
import {reflection3D} from './data-3d';
import Lantern from "./lantern";
import Pyramid from "./pyramid";
import SvgLoader from "./svg-loader";
import Room from "./room";
import {loadModel} from "./model-3d-loader";
import Animation from './../animation';

export default class SceneSlide2 extends THREE.Group {
  constructor() {
    super();
    this.animations = [];

    this.constructChildren();
  }

  constructChildren() {
    this.addRoom({
      wallColor: color3D.Blue,
      floorColor: color3D.BrightBlue,
      metalness: reflection3D.basic.metalness,
      roughness: reflection3D.basic.roughness,
    });
    this.addStaticObjects();
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

  addRoom(options) {
    const room = new Room(options);
    room.name = 'room2';
    this.add(room);
  }

  addStaticObjects() {
    const name = `staticObjects2`;
    loadModel(name, null, (mesh) => {
      mesh.name = name;
      mesh.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-45), 0), `XYZ`);
      this.add(mesh);
    });
  }

  addPyramid(options) {
    const pyramid = new Pyramid(options);
    pyramid.name = 'pyramid';
    pyramid.position.set(-20, 150, 370);
    this.add(pyramid);
  }

  addLantern(options) {
    const lantern = new Lantern(options);
    lantern.name = 'lantern';
    lantern.position.set(400, 55, 535);
    this.add(lantern);
  }

  addLeaf1() {
    const leaf = new SvgLoader(`leafPyramid`).createSvgGroup();
    leaf.position.set(-64, -117, 0);
    const leafWrapper = new THREE.Group();
    leafWrapper.name = 'leaf1';;
    const scale = 2.8;
    leafWrapper.add(leaf);
    leafWrapper.position.set(-130, 40, 330);
    leafWrapper.scale.set(scale, -scale, scale);
    leafWrapper.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(45.0), 0), `XYZ`);
    this.add(leafWrapper);
  }

  addLeaf2() {
    const leaf = new SvgLoader(`leafPyramid`).createSvgGroup();
    leaf.position.set(-64, -117, 0);
    const leafWrapper = new THREE.Group();
    leafWrapper.name = 'leaf2';
    const scale = 2;
    leafWrapper.add(leaf);
    leafWrapper.position.set(-140, 55, 320);
    leafWrapper.scale.set(scale, -scale, scale);
    leafWrapper.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(45.0), THREE.MathUtils.degToRad(45.0)), `XYZ`);
    this.add(leafWrapper);
  }

  initLeafAnimation() {
    const objectAnimation1 = this.getObjectByName('leaf1');
    this.animations.push(new Animation({
      func: (progress, details) => {
        const time = ((details.currentTime - details.startTime) / 300) % 16;
        objectAnimation1.rotation.z = 0.3 * Math.exp(-0.2 * time) * Math.cos(1.2 * time + Math.PI / 2);
        //console.log('стори2 - анимация листьев');
      },
      duration: `infinite`,
    }));
    const objectAnimation2 = this.getObjectByName('leaf2');
    this.animations.push(new Animation({
      func: (progress, details) => {
        const time = ((details.currentTime - details.startTime) / 300) % 16;
        objectAnimation2.rotation.z = 0.5 * Math.exp(-0.2 * time) * Math.cos(0.9 * time + Math.PI / 2) + THREE.MathUtils.degToRad(45);
      },
      duration: `infinite`,
    }));
  }
};

import * as THREE from "three";
import SvgLoader from "./svg-loader";
import {color3D} from './data-3d';
import {reflection3D} from './data-3d';
import SaturnRope from "./saturn-rope";
import Carpet from "./carpet";
import Room from "./room";
import {loadModel} from "./model-3d-loader";
import Animation from './../animation';

export default class SceneSlide4 extends THREE.Group {
  constructor() {
    super();
    this.animations = [];

    this.constructChildren();
  }

  constructChildren() {
    this.addRoom({
      wallColor: color3D.ShadowedPurple,
      floorColor: color3D.ShadowedDarkPurple,
      metalness: reflection3D.basic.metalness,
      roughness: reflection3D.basic.roughness,
    });
    this.addStaticObjects();
    this.addSonya();
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

  addRoom(options) {
    const room = new Room(options);
    room.name = 'room4';
    this.add(room);
  }

  addStaticObjects() {
    const name = `staticObjects4`;
    loadModel(name, null, (mesh) => {
      mesh.name = name;
      mesh.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-45), 0), `XYZ`);
      this.add(mesh);
    });
  }

  addSonya() {
    const name = `sonya`;
    loadModel(name, null, (mesh) => {
      mesh.name = name;
      const scale = 1.2;
      mesh.scale.set(scale, scale, scale);
      mesh.position.set(120, 90, 400);
      mesh.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-45), 0), `XYZ`);
      this.add(mesh);
    });
  }

  addSaturn(options) {
    const saturn = new SaturnRope(options);
    saturn.name = 'saturn2';
    saturn.position.set(60, 480 + 1000, 320);
    this.add(saturn);
  }

  addCarpet(options) {
    const carpet = new Carpet(options);
    carpet.name = 'carpet';
    const scale = 1;
    carpet.scale.set(scale, scale, scale);
    carpet.position.set(15, 0, 15);
    carpet.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-45.0), 0), `XYZ`);
    this.add(carpet);
  }

  addFlowers() {
    const flower = new SvgLoader(`flower2`).createSvgGroup();
    flower.name = 'flower2';
    const scale = 0.8;
    flower.position.set(-240, 335, 320);
    flower.scale.set(scale, -scale, scale);
    flower.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(45.0), 0), `XYZ`);
    this.add(flower);
  }

  initSaturnAnimation2() {
    const objectAnimation = this.getObjectByName('saturn2');
    this.animations.push(new Animation({
      func: (progress, details) => {
        const time = (details.currentTime - details.startTime) / 1000;
        objectAnimation.rotation.z = THREE.MathUtils.degToRad(1 * Math.sin(time));
        objectAnimation.rotation.x = THREE.MathUtils.degToRad(-1 * Math.cos(time));
      },
      duration: `infinite`,
    }));

    const objectAnimationRing = objectAnimation.getObjectByName('ring');
    this.animations.push(new Animation({
      func: (progress, details) => {
        const time = (details.currentTime - details.startTime) / 1000;
        objectAnimationRing.rotation.x = THREE.MathUtils.degToRad(-3 * Math.sin(time));
        objectAnimationRing.rotation.y = THREE.MathUtils.degToRad(7 * Math.sin(time));
        objectAnimationRing.rotation.z = THREE.MathUtils.degToRad(-12 + 3 * Math.sin(time));
      },
      duration: `infinite`,
    }));
  }

  initSonyaAnimation() {
    const sonyaObjectAnimation = this.getObjectByName('sonya');
    const rightHandObject = sonyaObjectAnimation.getObjectByName(`RightHand`);
    const leftHandObject = sonyaObjectAnimation.getObjectByName(`LeftHand`);

    this.animations.push(new Animation({
      func: (progress, details) => {
        const time = (details.currentTime - details.startTime) / 1000;
        sonyaObjectAnimation.position.y = 10 * Math.sin(time * 2) + 100;
        //console.log('стори4 - анимация ИИ');
      },
      duration: `infinite`,
    }));

    this.animations.push(new Animation({
      func: (progress, details) => {
        const time = (details.currentTime - details.startTime) / 1000;
        rightHandObject.rotation.y = THREE.MathUtils.degToRad(-55) + THREE.MathUtils.degToRad(5) * Math.cos(1.5 + time * 2);
      },
      duration: `infinite`,
    }));

    this.animations.push(new Animation({
      func: (progress, details) => {
        const time = (details.currentTime - details.startTime) / 1000;
        leftHandObject.rotation.y = THREE.MathUtils.degToRad(55) + THREE.MathUtils.degToRad(5) * Math.cos(-1.5 + time * 2);
      },
      duration: `infinite`,
    }));
  }
};

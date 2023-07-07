import * as THREE from "three";
import SvgLoader from "./svg-loader";
import {color3D} from './data-3d';
import {reflection3D} from './data-3d';
import Carpet from "./carpet";
import SaturnRope from "./saturn-rope";
import Room from "./room";
import {loadModel} from "./model-3d-loader";
import Animation from './../animation';
import Suitcase from "./suitcase";
import _ from './../utils';


export default class SceneSlide1 extends THREE.Group {
  constructor() {
    super();
    this.animations = [];
    this.animationSuitcase = [];

    this.constructChildren();
  }

  constructChildren() {
    this.addRoom({
      wallColor: color3D.Purple,
      floorColor: color3D.DarkPurple,
      metalness: reflection3D.soft.metalness,
      roughness: reflection3D.soft.roughness,
    });
    this.addStaticObjects();
    this.addDog();
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
    this.addSuitcase(this.loadManager);
  }

  addRoom(options) {
    const room = new Room(options);
    room.name = 'room1';
    this.add(room);
  }

  addStaticObjects() {
    const name = `staticObjects1`;
    loadModel(name, null, (mesh) => {
      mesh.name = name;
      mesh.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-45), 0), `XYZ`);
      this.add(mesh);
    });
  }

  addDog() {
    const name = `dog`;
    loadModel(name, null, (mesh) => {
      mesh.name = name;
      mesh.position.set(50, 0, 650);
      mesh.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(15), 0), `XYZ`);
      this.add(mesh);
    });
  }

  addFlowers() {
    const flower = new SvgLoader(`flower`).createSvgGroup();
    flower.name = 'flower1';
    const scale = 0.8;
    flower.position.set(-240, 335, 320);
    flower.scale.set(scale, -scale, scale);
    flower.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(43.0), 0), `XYZ`);
    this.add(flower);
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

  addSaturn(options) {
    const saturn = new SaturnRope(options);
    saturn.name = 'saturn1';
    saturn.position.set(60, 480 + 1000, 320);
    this.add(saturn);
  }

  addSuitcase() {
    const name = 'suitcase'
    const suitcase = new Suitcase();
    suitcase.castShadow = this.isShadow;
    const outerGroup = new THREE.Group();
    const innerGroup = new THREE.Group();
    innerGroup.add(suitcase);
    outerGroup.add(innerGroup);
    outerGroup.name = name;
    outerGroup.position.set(-340, 150, 790);
    outerGroup.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-20.0), 0), `XYZ`);
    this.add(outerGroup);
  }

  initDogAnimation() {
    const objectAnimation = this.getObjectByName('Tail');
    this.animations.push(new Animation({
      func: (progress, details) => {
        const progressFactor = Math.floor((details.currentTime - details.startTime) / 1000 % 6);
        const amp = progressFactor > 2 && progressFactor < 6 ? 0.8 : 0.4;
        objectAnimation.rotation.x = amp * Math.sin(6 * Math.PI * (details.currentTime - details.startTime) / 1000);
      },
      duration: `infinite`,
    }));
  }

  initSaturnAnimation() {
    const objectAnimation = this.getObjectByName('saturn1');
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
        //console.log('стори1 - анимация кольца');
      },
      duration: `infinite`,
    }));
  }

  initSuitcaseAnimations() {
    const objectAnimation = this.children.find((item) => (item.name === 'suitcase'));
    this.animationSuitcase.push(new Animation({
      func: (progress) => {
        objectAnimation.position.y = -30 + progress * 30;
      },
      duration: 300,//300
      delay: 1400,//0//200
      easing: _.easeInSine
    }));
    this.animationSuitcase.push(new Animation({
      func: (progress) => {
        objectAnimation.children[0].children[0].scale.set(
          1 - 0.05 * progress, 1 + 0.1 * progress, 1 - 0.05 * progress
        );
      },
      duration: 300,//300
      delay: 1400,//0//200
      easing: _.easeInSine
    }));
    this.animationSuitcase.push(new Animation({
      func: (progress) => {
        objectAnimation.children[0].children[0].scale.set(
          0.95 + 0.15 * progress, 1.1 - 0.15 * progress, 0.95 + 0.15 * progress
        );
      },
      duration: 250,//250
      delay: 1700,//300//500
      easing: _.easeInOutCubic
    }));
    this.animationSuitcase.push(new Animation({
      func: (progress) => {
        objectAnimation.children[0].children[0].scale.set(
          1.1 - 0.115 * progress, 0.95 + 0.08 * progress, 1.1 - 0.115 * progress
        );
      },
      duration: 250,//250
      delay: 1950,//550//750
      easing: _.easeInOutCubic
    }));
    this.animationSuitcase.push(new Animation({
      func: (progress) => {
        objectAnimation.children[0].children[0].scale.set(
          0.985 + 0.015 * progress, 1.03 - 0.03 * progress, 0.985 + 0.015 * progress
        );
      },
      duration: 150,//150
      delay: 2200,//800//1000
      easing: _.easeInOutCubic
    }));
  }
};

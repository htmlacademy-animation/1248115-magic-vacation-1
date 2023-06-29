import * as THREE from "three";
import SvgLoader from "./svg-loader";
import {color3D} from './data-3d';
import {reflection3D} from './data-3d';
import {loadModel} from "./model-3d-loader";
import Saturn from "./saturn";
import {loadManagerIntro} from "./load-manager";
import {suitcaseIntro} from "./get-suitcase";
import _ from './../utils';
import Animation from './../animation';
import {getRandomInteger} from './../helpers';
import Airplane from "./airplane";

export default class SceneIntro extends THREE.Group {
  constructor() {
    super();
    this.loadManager = loadManagerIntro;
    this.suitcase = suitcaseIntro;
    this.objectsMoveInAnimation = [];
    this.animations = [];

    this.constructChildren();
  }

  constructChildren() {
    this.addKeyHole({
      colorFlatness: color3D.Purple,
      metalnessFlatness: reflection3D.basic.metalness,
      roughnessFlatness: reflection3D.basic.roughness
    });
    this.addFlamingo();
    this.addQuestion();
    this.addSnowFlake();
    this.addLeaf();
    this.addSaturn({
      colorSaturn: color3D.DominantRed,
      colorRing: color3D.ShadowedBrightPurple,
      metalness: reflection3D.soft.metalness,
      roughness: reflection3D.soft.roughness
    });
    this.addPlane();
    this.addSuitcase();
    this.addWatermelon();
    this.initSuitcaseAnimations();
    this.initMoveInShakeAnimations();
    this.initAirplaneAnimations();
  }

  addFlamingo() {
    const name = 'flamingo';
    this.objectsMoveInAnimation.push(name);
    const flamingo = new SvgLoader(`flamingo`).createSvgGroup();
    flamingo.scale.set(0, 0, 0);
    const outerGroup = new THREE.Group();
    const innerGroup = new THREE.Group();
    innerGroup.add(flamingo);
    outerGroup.add(innerGroup);
    outerGroup.position.set(0, 0, 40);
    outerGroup.name = name;
    outerGroup.options = {
      position: [-520, 380, 80],
      scale: [-2, -2, 2],
      rotation: [-5, 40, 25],
      amplitude: getRandomInteger(2, 10) / 10,
      period: getRandomInteger(1000, 3000),
    };
    this.add(outerGroup);
  }

  addQuestion() {
    const name = 'question';
    this.objectsMoveInAnimation.push(name);
    const question = new SvgLoader(`question`).createSvgGroup();
    question.scale.set(0, 0, 0);
    const outerGroup = new THREE.Group();
    const innerGroup = new THREE.Group();
    innerGroup.add(question);
    outerGroup.add(innerGroup);
    outerGroup.position.set(0, 0, 40);
    outerGroup.name = name;
    outerGroup.options = {
      position: [100, -330, 100],
      scale: [2, -2, 2],
      rotation: [-40, 15, 20],
      amplitude: getRandomInteger(2, 10) / 10,
      period: getRandomInteger(1000, 3000),
    };
    this.add(outerGroup);
  }

  addSnowFlake() {
    const name = 'snowflake';
    this.objectsMoveInAnimation.push(name);
    const snowflake = new SvgLoader(`snowflake`).createSvgGroup();
    snowflake.scale.set(0, 0, 0);
    const outerGroup = new THREE.Group();
    const innerGroup = new THREE.Group();
    innerGroup.add(snowflake);
    outerGroup.add(innerGroup);
    outerGroup.position.set(0, 0, 40);
    outerGroup.name = name;
    outerGroup.options = {
      position: [-450, -10, 120],
      scale: [1.7, 1.7, 1.7],
      rotation: [-10, 40, 10],
      amplitude: getRandomInteger(2, 10) / 10,
      period: getRandomInteger(1000, 3000),
    };
    this.add(outerGroup);
  }

  addLeaf() {
    const name = 'leaf';
    this.objectsMoveInAnimation.push(name);
    const leaf = new SvgLoader(`leaf`).createSvgGroup();
    leaf.scale.set(0, 0, 0);
    const outerGroup = new THREE.Group();
    const innerGroup = new THREE.Group();
    innerGroup.add(leaf);
    outerGroup.add(innerGroup);
    outerGroup.position.set(0, 0, 40);
    outerGroup.name = name;
    outerGroup.options = {
      position: [660, 340, 200],
      scale: [1, -1, 1],
      rotation: [7, -70, -70],
      amplitude: getRandomInteger(2, 10) / 10,
      period: getRandomInteger(1000, 3000),
    };
    this.add(outerGroup);
  }

  addSaturn(options) {
    const name = 'saturn';
    this.objectsMoveInAnimation.push(name);
    const saturn = new Saturn(options);
    saturn.scale.set(0, 0, 0);
    const outerGroup = new THREE.Group();
    const innerGroup = new THREE.Group();
    innerGroup.add(saturn);
    innerGroup.rotation.copy(
      new THREE.Euler(THREE.MathUtils.degToRad(0),
      THREE.MathUtils.degToRad(-90),
      THREE.MathUtils.degToRad(0), `XYZ`));
    outerGroup.add(innerGroup);
    outerGroup.position.set(0, 0, 40);
    outerGroup.name = name;
    outerGroup.options = {
      position: [420, -140, 150],
      scale: [0.7, 0.7, 0.7],
      rotation: [5, 0, 25],
      amplitude: getRandomInteger(2, 10) / 10,
      period: getRandomInteger(1000, 3000),
    };
    this.add(outerGroup);
  }

  addKeyHole(options) {
    const keyHoleGroup = new THREE.Group();

    const keyHole = new SvgLoader(`keyHole`).createSvgGroup();
    const scale = 1.5;
    keyHole.position.set(-1000 * scale, 1000 * scale, 0);
    keyHole.scale.set(scale, -scale, scale);
    keyHoleGroup.add(keyHole);

    const flatnessGeometry = new THREE.PlaneGeometry(500, 500);
    const flatnessMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(options.colorFlatness),
      metalness: options.metalnessFlatness,
      roughness: options.roughnessFlatness,
    });
    const flatnessMesh = new THREE.Mesh(flatnessGeometry, flatnessMaterial);
    flatnessMesh.position.z = -120;
    keyHoleGroup.add(flatnessMesh);

    this.add(keyHoleGroup);
  }

  addPlane() {
    const airplane = new Airplane();
    airplane.name = 'airplaneFlight';
    airplane.position.x = 135;
    airplane.position.y = -120;
    airplane.rotation.y = -Math.PI;
    airplane.options = {
      amplitude: getRandomInteger(2, 10) / 10,
      period: getRandomInteger(1000, 3000),
    };
    this.add(airplane);
  }

  addSuitcase() {
    const name = 'suitcase'
    const suitcase = this.suitcase;
    suitcase.scale.set(0, 0, 0);
    suitcase.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(-45), THREE.MathUtils.degToRad(-90), THREE.MathUtils.degToRad(0)));
    const outerGroup = new THREE.Group();
    const innerGroup = new THREE.Group();
    innerGroup.add(suitcase);
    innerGroup.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(0), THREE.MathUtils.degToRad(15)));
    outerGroup.add(innerGroup);
    outerGroup.name = name;
    outerGroup.options = {
      amplitude: getRandomInteger(2, 10) / 10,
      period: getRandomInteger(1000, 3000),
    };
    this.add(outerGroup);
  }

  addWatermelon() {
    const name = `watermelon`;
    this.objectsMoveInAnimation.push(name);
    loadModel(this.loadManager, name, null, (mesh) => {
      mesh.name = name;
      mesh.scale.set(0, 0, 0);
      const outerGroup = new THREE.Group();
      const innerGroup = new THREE.Group();
      innerGroup.add(mesh);
      outerGroup.add(innerGroup);
      outerGroup.position.set(0, 0, 40);
      outerGroup.name = name;
      outerGroup.options = {
        position: [-775, -280, 80],
        scale: [2.2, 2.2, 2.2],
        rotation: [10, 0, 140],
        amplitude: getRandomInteger(2, 10) / 10,
        period: getRandomInteger(1000, 3000),
      };
      this.add(outerGroup);
    });
  }

  initMoveInShakeAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.children.filter((item) => this.objectsMoveInAnimation.includes(item.name)).forEach((item) => {
          item.children[0].children[0].scale.set(
            item.options.scale[0] * progress,
            item.options.scale[1] * progress,
            item.options.scale[2] * progress);
          item.children[0].rotation.copy(
            new THREE.Euler(THREE.MathUtils.degToRad(item.options.rotation[0] * progress),
            THREE.MathUtils.degToRad(item.options.rotation[1] * progress),
            THREE.MathUtils.degToRad(item.options.rotation[2] * progress)));
          item.position.set(
            0 + progress * (item.options.position[0] - 0),
            0 + progress * (item.options.position[1] - 0),
            40 + progress * (item.options.position[2] - 40));
        })
      },
      duration: 1500,
      delay: 500,
      easing: _.easeOutCubic
    }));

    this.animations.push(new Animation({
      func: (progress, details) => {
        this.children.filter((item) => this.objectsMoveInAnimation.includes(item.name)).forEach((item) => {
          item.position.y = item.position.y + item.options.amplitude * Math.sin(1.5 * (details.currentTime - details.startTime) / item.options.period);
        })
      },
      duration: 'infinite',
      delay: 3000,
    }));
  }

  initSuitcaseAnimations() {
    const objectAnimation = this.getObjectByName('suitcase');
    this.animations.push(new Animation({
      func: (progress) => {
        objectAnimation.children[0].children[0].scale.set(0.45 * progress, 0.45 * progress, 0.45 * progress);
        objectAnimation.children[0].children[0].rotation.copy(
          new THREE.Euler(THREE.MathUtils.degToRad(-45 + progress * (-60 + 45)),
          THREE.MathUtils.degToRad(-90 + progress * (-110 + 90)),
          0));
        objectAnimation.children[0].rotation.copy(new THREE.Euler(0, 0, THREE.MathUtils.degToRad(15 + progress * (-50 - 15))));
        objectAnimation.position.set(progress * 10, progress * 95, progress * 120);
      },
      duration: 800,
      delay: 850,
      easing: _.easeOutQuad
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        objectAnimation.children[0].children[0].scale.set(0.45 + progress * (0.6 - 0.45), 0.45 + progress * (0.6 - 0.45), 0.45 + progress * (0.6 - 0.45));
        objectAnimation.children[0].children[0].rotation.copy(
          new THREE.Euler(THREE.MathUtils.degToRad(-60 + progress * (25 + 60)),
          THREE.MathUtils.degToRad(-115 + progress * (-145 + 115)),
          0));
        objectAnimation.children[0].rotation.copy(new THREE.Euler(0, 0, THREE.MathUtils.degToRad(-50 + progress * (-12 + 50))));
        objectAnimation.children[0].position.set(progress * -70, progress * -260, progress * 10);
      },
      duration: 800,
      delay: 1650,
      easing: _.easeInOutSine
    }));

    this.animations.push(new Animation({
      func: (progress, details) => {
        objectAnimation.position.y =
          objectAnimation.position.y + objectAnimation.options.amplitude
          * Math.sin(1.5 * (details.currentTime - details.startTime) / objectAnimation.options.period);
      },
      duration: 'infinite',
      delay: 3000,
    }));
  }

  initAirplaneAnimations() {
    const objectAnimation = this.getObjectByName('airplaneFlight');

    const initialPlaneRadius = objectAnimation.planeRadius;
    const initialFightHeight = objectAnimation.flightHeight;
    const initialFlightRotationY = objectAnimation.flightRotationY;
    const initialPlaneRotationZ = objectAnimation.planeRotationZ;
    const initialPlaneGroupRotationZ = objectAnimation.planeGroupRotationZ;
    const initialPlaneScale = objectAnimation.planeScale;

    this.animations.push(new Animation({
        func: (progress) => {
          objectAnimation.planeScale =
            initialPlaneScale +
            (objectAnimation.maxPlaneScale - initialPlaneScale) * progress;

          objectAnimation.planeRadius =
            initialPlaneRadius +
            (objectAnimation.maxPlaneRadius - initialPlaneRadius) * progress;

          objectAnimation.flightHeight =
            initialFightHeight +
            (objectAnimation.maxFlightHeight - initialFightHeight) * progress;

          objectAnimation.flightRotationY =
            initialFlightRotationY + (progress * 5 * Math.PI) / 4;

          objectAnimation.planeRotationZ =
            progress < 0.5
              ? initialPlaneRotationZ - progress * Math.PI
              : initialPlaneRotationZ -
              0.45 * Math.PI +
              (progress - 0.5) * Math.PI;

          objectAnimation.planeGroupRotationZ =
            initialPlaneGroupRotationZ + (progress * Math.PI) / 4;

          objectAnimation.invalidate(progress);
        },
        duration: 2000,
        delay: 1500,
        easing: _.easeOutQuad,
      }),
    );

    this.animations.push(new Animation({
      func: (progress, details) => {
        objectAnimation.position.y =
          objectAnimation.position.y + objectAnimation.options.amplitude
          * Math.sin(1.5 * (details.currentTime - details.startTime) / objectAnimation.options.period);
      },
      duration: 'infinite',
      delay: 3500,
    }));
  }
};

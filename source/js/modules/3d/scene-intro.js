import * as THREE from "three";
import SvgLoader from "./svg-loader";
import {color3D} from './data-3d';
import {reflection3D} from './data-3d';
import {loadModel} from "./model-3d-loader";

export default class SceneIntro extends THREE.Group {
  constructor() {
    super();
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
    this.addPlane();
    this.addSuitcase();
    this.addWatermelon();
  }

  addFlamingo() {
    const flamingo = new SvgLoader(`flamingo`).createSvgGroup();
    const scale = 2;
    flamingo.position.set(-520, 380, 80);
    flamingo.scale.set(-scale, -scale, scale);
    flamingo.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(-5.0), THREE.MathUtils.degToRad(40.0), THREE.MathUtils.degToRad(25.0)), `XYZ`);
    this.add(flamingo);
  }

  addQuestion() {
    const question = new SvgLoader(`question`).createSvgGroup();
    const scale = 2;
    question.position.set(100, -330, 100);
    question.scale.set(scale, -scale, scale);
    question.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(-40.0), THREE.MathUtils.degToRad(15.0), THREE.MathUtils.degToRad(20.0)), `XYZ`);
    this.add(question);
  }

  addSnowFlake() {
    const snowflake = new SvgLoader(`snowflake`).createSvgGroup();
    const scale = 1.7;
    snowflake.position.set(-450, -10, 120);
    snowflake.scale.set(scale, scale, scale);
    snowflake.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(-10.0), THREE.MathUtils.degToRad(40.0), THREE.MathUtils.degToRad(10.0)), `XYZ`);
    this.add(snowflake);
  }

  addLeaf() {
    const leaf = new SvgLoader(`leaf`).createSvgGroup();
    const scale = 1.7;
    leaf.position.set(660, 340, 200);
    leaf.scale.set(scale, -scale, scale);
    leaf.rotation.copy(new THREE.Euler(THREE.MathUtils.degToRad(7.0), THREE.MathUtils.degToRad(-70.0), THREE.MathUtils.degToRad(-70.0)), `XYZ`);
    this.add(leaf);
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
    flatnessMesh.position.z = 2;
    keyHoleGroup.add(flatnessMesh);

    this.add(keyHoleGroup);
  }

  addPlane() {
    const name = `airplane`;
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color3D.White),
      metalness: reflection3D.basic.metalness,
      roughness: reflection3D.basic.roughness
    });
    loadModel(name, material, (mesh) => {
      mesh.name = name;
      mesh.position.set(270, 150, 100);
      mesh.rotation.copy(new THREE.Euler(80 * THREE.Math.DEG2RAD, 130 * THREE.Math.DEG2RAD, -25 * THREE.Math.DEG2RAD), `XYZ`);
      mesh.scale.set(1.4, 1.4, 1.4);
      this.add(mesh);
    });
  }

  addSuitcase() {
    const name = `suitcase`;
    loadModel(name, null, (mesh) => {
      mesh.name = name;
      mesh.position.set(-80, -190, 60);
      mesh.rotation.copy(new THREE.Euler(25 * THREE.Math.DEG2RAD, -145 * THREE.Math.DEG2RAD, 15 * THREE.Math.DEG2RAD), `XYZ`);
      mesh.scale.set(0.8, 0.8, 0.8);
      this.add(mesh);
    });
  }

  addWatermelon() {
    const name = `watermelon`;
    loadModel(name, null, (mesh) => {
      mesh.name = name;
      mesh.position.set(-775, -280, 60);
      mesh.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, 0, 140 * THREE.Math.DEG2RAD), `XYZ`);
      mesh.scale.set(2.2, 2.2, 2.2);
      this.add(mesh);
    });
  }
};

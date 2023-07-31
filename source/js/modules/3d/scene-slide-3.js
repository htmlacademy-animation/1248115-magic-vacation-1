import * as THREE from "three";
import {color3D} from './data-3d';
import {reflection3D} from './data-3d';
import Snowman from "./snowman";
import Road from "./road";
import Room from "./room";
import {loadModel} from "./model-3d-loader";
import Animation from './../animation';

export default class SceneSlide3 extends THREE.Group {
  constructor() {
    super();
    this.animations = [];

    this.constructChildren();
  }

  constructChildren() {
    this.addRoom({
      wallColor: color3D.SkyLightBlue,
      floorColor: color3D.MountainBlue,
      metalness: reflection3D.soft.metalness,
      roughness: reflection3D.soft.roughness,
      matcapMaterial: reflection3D.soft.matcapMaterial,
    });
    this.addStaticObjects();
    this.addCompass();
    this.addSnowman({
      colorSphere: color3D.SnowColor,
      metalnessSphere: reflection3D.strong.metalness,
      roughnessSphere: reflection3D.strong.roughness,
      colorCone: color3D.Orange,
      metalnessCone: reflection3D.soft.metalness,
      roughnessCone: reflection3D.soft.roughness,
      matcapMaterialSphere: reflection3D.strong.matcapMaterial,
      matcapMaterialCone: reflection3D.soft.matcapMaterial,
    });
    this.addRoad();
  }

  addRoom(options) {
    const room = new Room(options);
    room.name = `room3`;
    this.add(room);
  }

  addStaticObjects() {
    const name = `staticObjects3`;
    loadModel(name, null, (mesh) => {
      mesh.name = name;
      mesh.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-45), 0), `XYZ`);
      this.add(mesh);
    });
  }

  addCompass() {
    const name = `compass`;
    loadModel(name, null, (mesh) => {
      mesh.name = name;
      mesh.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-45), 0), `XYZ`);
      this.add(mesh);
    });
  }

  addSnowman(options) {
    const snowman = new Snowman(options);
    snowman.name = `snowman`;
    snowman.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-47.0), 0, `XYZ`));
    snowman.position.set(-100, 230, 430);
    this.add(snowman);
  }

  addRoad() {
    const road = new Road();
    road.name = `road`;
    const scale = 1;
    road.scale.set(scale, scale, scale);
    road.position.set(15, 1, 15);
    road.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(-46.0), 0), `XYZ`);
    this.add(road);
  }

  initCompassAnimation() {
    const objectAnimation = this.getObjectByName(`compass`).children[0];
    this.animations.push(new Animation({
      func: (progress, details) => {
        const time = (details.currentTime - details.startTime) / 1000;
        objectAnimation.rotation.z = THREE.MathUtils.degToRad(15) * Math.sin(2 * time);
      },
      duration: `infinite`,
    }));
  }
}

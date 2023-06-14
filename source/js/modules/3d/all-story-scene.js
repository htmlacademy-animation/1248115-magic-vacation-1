import * as THREE from "three";
import {scene3DData} from "./scene-3d-data";

export default class AllStoryScene extends THREE.Group {
  constructor() {
    super();

    this.addScenes();
  }

  addScenes() {
    scene3DData[1].objectsComposition.forEach((scene, i) => {
      scene.position.set(0, 0, 0);
      scene.rotation.copy(new THREE.Euler(0, THREE.MathUtils.degToRad(i * 90), 0));
      this.add(scene);
    });
  }
}

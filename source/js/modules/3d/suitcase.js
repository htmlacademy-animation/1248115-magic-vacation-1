import * as THREE from "three";
import {loadModel} from "./model-3d-loader";

export default class Suitcase extends THREE.Group {
  constructor(loadManager) {
    super();
    this.loadManager = loadManager;
    this.addSuitcase();
  }

  addSuitcase() {
    const name = `suitcase`;
    loadModel(this.loadManager, name, null, (mesh) => {
      mesh.name = name;
      this.add(mesh);
    });
  }
}

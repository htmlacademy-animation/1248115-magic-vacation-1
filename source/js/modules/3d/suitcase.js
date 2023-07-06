import * as THREE from "three";
import {loadModel} from "./model-3d-loader";

export default class Suitcase extends THREE.Group {
  constructor() {
    super();
    this.addSuitcase();
  }

  addSuitcase() {
    const name = `suitcase`;
    loadModel(name, null, (mesh) => {
      mesh.name = name;
      this.add(mesh);
    });
  }
}

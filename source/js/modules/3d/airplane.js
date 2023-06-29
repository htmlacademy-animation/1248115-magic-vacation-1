import * as THREE from "three";
import {color3D} from './data-3d';
import {reflection3D} from './data-3d';
import {loadModel} from "./model-3d-loader";
import {loadManagerIntro} from "./load-manager";

export default class Airplane extends THREE.Group {
  constructor() {
    super();

    this.loadManager = loadManagerIntro;

    this._planeRadius = 100;
    this._planeRadiusChanged = true;

    this._flightHeight = -120;
    this._flightHeightChanged = true;

    this._flightRotationY = -Math.PI;
    this._flightRotationYChanged = true;

    this._planeRotationZ = 0;
    this._planeRotationZChanged = true;

    this._planeGroupRotationZ = 0;
    this._planeGroupRotationZChanged = true;

    this._planeScale = 0.6;
    this._planeScaleChanged = true;

    this.createObj();
  }

  createObj() {
    const name = `airplane`;
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color3D.White),
      metalness: reflection3D.basic.metalness,
      roughness: reflection3D.basic.roughness
    });
    loadModel(this.loadManager, name, material, (mesh) => {
      mesh.name = name;
      mesh.scale.set(0.6, 0.6, 0.6);
      mesh.position.z = 100;
      mesh.rotation.set(0, Math.PI / 2, 0);
      const outerGroup = new THREE.Group();
      outerGroup.add(mesh);
      outerGroup.name = name;
      this.add(outerGroup);
    });
  }

  get planeRadius() {
    return this._planeRadius;
  }

  set planeRadius(radius) {
    if (radius === this._planeRadius) {
      return;
    }

    this._planeRadius = radius;
    this._planeRadiusChanged = true;
  }

  get flightHeight() {
    return this._flightHeight;
  }

  set flightHeight(height) {
    if (height === this._flightHeight) {
      return;
    }

    this._flightHeight = height;
    this._flightHeightChanged = true;
  }

  get flightRotationY() {
    return this._flightRotationY;
  }

  set flightRotationY(rotation) {
    if (rotation === this._flightRotationY) {
      return;
    }

    this._flightRotationY = rotation;
    this._flightRotationYChanged = true;
  }

  get planeRotationZ() {
    return this._planeRotationZ;
  }

  set planeRotationZ(rotation) {
    if (rotation === this._planeRotationZ) {
      return;
    }

    this._planeRotationZ = rotation;
    this._planeRotationZChanged = true;
  }

  get planeGroupRotationZ() {
    return this._planeGroupRotationZ;
  }

  set planeGroupRotationZ(rotation) {
    if (rotation === this._planeGroupRotationZ) {
      return;
    }

    this._planeGroupRotationZ = rotation;
    this._planeGroupRotationZChanged = true;
  }

  get planeScale() {
    return this._planeScale;
  }

  set planeScale(scale) {
    if (scale === this._planeScale) {
      return;
    }

    this._planeScale = scale;
    this._planeScaleChanged = true;
  }

  get maxPlaneRadius() {
    return 220;
  }

  get maxFlightHeight() {
    return 100;
  }

  get maxPlaneScale() {
    return 1.3;
  }

  invalidate() {
    if (this._planeRadiusChanged) {
      this.children[0].children[0].position.z = this._planeRadius;
      this._planeRadiusChanged = false;
    }

    if (this._flightHeightChanged) {
      this.position.y = this._flightHeight;
      this._flightHeightChanged = false;
    }

    if (this._flightRotationYChanged) {
      this.rotation.y = this._flightRotationY;
      this._flightRotationYChanged = false;
    }

    if (this._planeRotationZChanged) {
      this.children[0].children[0].rotation.z = this._planeRotationZ;
      this._planeRotationZChanged = false;
    }

    if (this._planeGroupRotationZChanged) {
      this.children[0].rotation.z = this._planeGroupRotationZ;
      this._planeGroupRotationZChanged = false;
    }

    if (this._planeScaleChanged) {
      this.children[0].children[0].scale.set(this._planeScale, this._planeScale, this._planeScale);
      this._planeScaleChanged = false;
    }
  }
}

import * as THREE from "three";
import _ from './../utils';
import Animation from './../animation';

export default class CameraRig extends THREE.Group {
  constructor(stateParameters) {
    super();

    this.stateParameters = stateParameters;
    this.animations = [];

    this._depth = this.stateParameters.depth || 0;
    this._rotationAxisY = this.stateParameters.rotationAxisY || 0;
    this._rotationCameraX = this.stateParameters.rotationCameraX || 0;

    this._depthChanged = true;
    this._rotationAxisYChanged = true;
    this._rotationCameraXChanged = true;

    this.startDepth = this._depth;
    this.startRotationCameraX = this._rotationCameraX;
    this.startRotationAxisY = this._rotationAxisY;

    this.newStateParameters = stateParameters;

    this.constructRigElements();
    this.initChangestateAnimation();
    this.invalidate();
  }

  constructRigElements() {
    const depthTrack = new THREE.Group();
    const rotationAxis = new THREE.Group();
    const cameraNull = new THREE.Group();

    this.add(rotationAxis);
    rotationAxis.add(depthTrack);
    depthTrack.add(cameraNull);

    this.depthTrack = depthTrack;
    this.rotationAxis = rotationAxis;
    this.cameraNull = cameraNull;
  }

  setState(newStateParameters) {
    this.stateParameters = newStateParameters;
  }

  get depth() {
    return this._depth;
  }

  set depth(value) {
    if (value === this._depth) return;
    this._depth = value;
    this._depthChanged = true;
  }

  get rotationCameraX() {
    return this._rotationCameraX;
  }

  set rotationCameraX(value) {
    if (value === this._rotationCameraX) return;

    this._rotationCameraX = value;
    this._rotationCameraXChanged = true;
  }

  get rotationAxisY() {
    return this._rotationAxisY;
  }

  set rotationAxisY(value) {
    if (value === this._rotationAxisY) return;

    this._rotationAxisY = value;
    this._rotationAxisYChanged = true;
  }

  invalidate() {
    if (this._depthChanged) {
      this.depthTrack.position.z = -this._depth;
      this._depthChanged = false;
    }

    if (this._rotationCameraXChanged) {
      this.depthTrack.rotation.x = this._rotationCameraX;
      this._rotationCameraXChanged = false;
    }

    if (this._rotationAxisY) {
      this.rotationAxis.rotation.y = this._rotationAxisY;
      this._rotationAxisYChanged = false;
    }
  }

  addObjectToCameraNull(object) {
    this.cameraNull.add(object);
  }

  changeStateTo(newStateParameters) {
    this.newStateParameters = newStateParameters;
    //this.setState(newStateParameters);
    this.startDepth = this._depth;
    this.startRotationCameraX = this._rotationCameraX;
    this.startRotationAxisY = this._rotationAxisY;
    this.animations.forEach((animation) => animation.start());
  }

  initChangestateAnimation() {
    this.animations.push(
      new Animation({
        func: (progress) => {
          this.depth =
            this.startDepth + (this.newStateParameters.depth - this.startDepth) * progress;
          this.rotationCameraX =
            this.startRotationCameraX +
            (this.newStateParameters.rotationCameraX - this.startRotationCameraX) * progress;
          this.rotationAxisY =
            this.startRotationAxisY +
            (this.newStateParameters.rotationAxisY - this.startRotationAxisY) *
            progress;
          console.log('переход сцен');
          this.invalidate();
        },
        duration: 1600,
        easing: _.easeInOutSine,
        callback: () => {
          this.setState(this.newStateParameters);
        },
      })
    );
  }
}

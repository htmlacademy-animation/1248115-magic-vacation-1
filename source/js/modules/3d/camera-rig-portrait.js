import * as THREE from "three";
import CameraRig from "./camera-rig";
import _ from './../utils';
import Animation from './../animation';

export default class CameraRigPortrait extends CameraRig {
  constructor() {
    super();

    this.stateParameters = {
      index: 0,
      depth: 3270,
      rotationAxisY: 0,
      rotationCameraX: 0,
      pitchRotation: 0,
      pitchDepth: 1405,
      cameraRotationY: 0,
    }

    this._cameraRotationY = this.stateParameters.cameraRotationY;
    this._cameraRotationYChanged = true;
    this.startCameraRotationY = this._cameraRotationY;
  }

  get cameraRotationY() {
    return this._cameraRotationY;
  }

  set cameraRotationY(value) {
    if (value === this._cameraRotationY) return;

    this._cameraRotationY = value;
    this._cameraRotationYChanged = true;
  }

  invalidate() {
    super.invalidate();

    if (this._cameraRotationYChanged) {
      this.cameraNull.rotation.y = this._cameraRotationY;

      this._cameraRotationYChanged = false;
    }

  }

  getNewState(index) {
    this.newStateParameters = {
      index: index,
      depth: index === 0 ? 3270 : 0,
      rotationAxisY: index === 0 ? 0 : ((index - 1) * Math.PI) / 2,
      rotationCameraX: index === 0 ? 0 : THREE.MathUtils.degToRad(-20),
      pitchRotation: 0,
      pitchDepth: index === 0 ? 1405 : 2350,
      cameraRotationY: index === 0 ? 0 : THREE.MathUtils.degToRad(2.5),
    }
  }

  initChangeStateAnimation() {
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
          this.pitchRotation =
            this.startPitchRotation +
            (this.newStateParameters.pitchRotation - this.startPitchRotation) * progress;
          this.pitchDepth =
            this.startPitchDepth +
            (this.newStateParameters.pitchDepth - this.startPitchDepth) * progress;
          this.cameraRotationY =
            this.startCameraRotationY +
            (this.newStateParameters.cameraRotationY - this.startCameraRotationY) * progress;
          this.animatedObject = this.startRotationAxisY +
            (this.newStateParameters.rotationAxisY - this.startRotationAxisY) *
            progress;

          this.invalidate();
        },
        duration: this.duration,
        easing: _.easeInOutSine,
        callback: () => {
          this.setState(this.newStateParameters);
          this.changeVivisible(this.index);
          if (this.index === 0) {
            this.scene.introScene.animationBackKeyPatch.forEach((animation) => animation.start());
          }
        },
      })
    );
  }
}

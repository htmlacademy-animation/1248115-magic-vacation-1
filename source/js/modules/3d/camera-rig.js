import * as THREE from "three";
import _ from './../utils';
import Animation from './../animation';

export default class CameraRig extends THREE.Group {
  constructor() {
    super();

    this.stateParameters = {
      index: 0,
      depth: 3270,
      rotationAxisY: 0,
      rotationCameraX: 0,
      pitchRotation: 0,
      pitchDepth: 1405,
    };

    this.animations = [];

    this._depth = this.stateParameters.depth;
    this._rotationAxisY = this.stateParameters.rotationAxisY;
    this._rotationCameraX = this.stateParameters.rotationCameraX;
    this._pitchRotation = this.stateParameters.pitchRotation;
    this._pitchDepth = this.stateParameters.pitchDepth;
    this.duration = 1500;

    this._depthChanged = true;
    this._rotationAxisYChanged = true;
    this._rotationCameraXChanged = true;
    this._pitchRotationChanged = true;
    this._pitchDepthChanged = true;

    this.startDepth = this._depth;
    this.startRotationCameraX = this._rotationCameraX;
    this.startRotationAxisY = this._rotationAxisY;
    this.startPitchRotation = this._pitchRotation;
    this.startPitchDepth = this._pitchDepth;

    this.constructRigElements();
    this.initChangeStateAnimation();
    this.invalidate();
  }

  constructRigElements() {
    const depthTrack = new THREE.Group();
    depthTrack.name = `depthTrack`;
    const rotationAxis = new THREE.Group();
    rotationAxis.name = `rotationAxisY`;
    const pitchAxis = new THREE.Group();
    pitchAxis.name = `pitchAxis`;
    const cameraNull = new THREE.Group();
    cameraNull.name = `cameraNull`;

    this.add(rotationAxis);
    rotationAxis.add(depthTrack);
    depthTrack.add(pitchAxis);
    pitchAxis.add(cameraNull);

    this.depthTrack = depthTrack;
    this.rotationAxis = rotationAxis;
    this.pitchAxis = pitchAxis;
    this.cameraNull = cameraNull;

    this.pitchAxis.position.z = this.pitchDepth;
  }

  get depth() {
    return this._depth;
  }

  set depth(value) {
    if (value === this._depth) {
      return;
    }

    this._depth = value;
    this._depthChanged = true;
  }

  get rotationCameraX() {
    return this._rotationCameraX;
  }

  set rotationCameraX(value) {
    if (value === this._rotationCameraX) {
      return;
    }

    this._rotationCameraX = value;
    this._rotationCameraXChanged = true;
  }

  get rotationAxisY() {
    return this._rotationAxisY;
  }

  set rotationAxisY(value) {
    if (value === this._rotationAxisY) {
      return;
    }

    this._rotationAxisY = value;
    this._rotationAxisYChanged = true;
  }

  get pitchRotation() {
    return this._pitchRotation;
  }

  set pitchRotation(value) {
    if (value === this._pitchRotation) {
      return;
    }

    this._pitchRotation = value;
    this._pitchRotationChanged = true;
  }

  get pitchDepth() {
    return this._pitchDepth;
  }

  set pitchDepth(value) {
    if (value === this._pitchDepth) {
      return;
    }

    this._pitchDepth = value;
    this._pitchDepthChanged = true;
  }

  invalidate() {
    if (this._depthChanged) {
      this.depthTrack.position.z = this._depth;
      this._depthChanged = false;
    }

    if (this._rotationCameraXChanged) {
      this.depthTrack.rotation.x = this._rotationCameraX;
      this.pitchAxis.position.y = this._pitchDepth * Math.tan(this._rotationCameraX);

      this._rotationCameraXChanged = false;
    }

    if (this._rotationAxisY) {
      this.rotationAxis.rotation.y = this._rotationAxisY;
      this._rotationAxisYChanged = false;
    }

    if (this._pitchRotationChanged) {
      this.cameraNull.position.y = Math.tan(this._pitchRotation) * this._pitchDepth;
      this.cameraNull.rotation.x = -this._pitchRotation;

      this._pitchRotationChanged = false;
    }

    if (this._pitchDepthChanged) {
      this.pitchAxis.position.z = this._pitchDepth;

      this._pitchDepthChanged = false;
    }

  }

  addObjectToCameraNull(object) {
    this.cameraNull.add(object);
  }

  addObjectToRotationAxis(object) {
    this.rotationAxis.add(object);
  }

  getNewState(index) {
    this.newStateParameters = {
      index,
      depth: index === 0 ? 3270 : 0,
      rotationAxisY: index === 0 ? 0 : ((index - 1) * Math.PI) / 2,
      rotationCameraX: index === 0 ? 0 : THREE.MathUtils.degToRad(-15),
      pitchRotation: 0,
      pitchDepth: index === 0 ? 1405 : 2200,
    };
  }

  changeStateTo(index, scene) {
    this.scene = scene;
    this.getNewState(index);
    this.index = index;
    this.startDepth = this._depth;
    this.startRotationCameraX = this._rotationCameraX;
    this.startRotationAxisY = this._rotationAxisY;
    this.startPitchRotation = this._pitchRotation;
    this.startPitchDepth = this._pitchDepth;
    this.duration = this.index === 0 ? 1500 : 750;

    this.animations.forEach((animation) => animation.start());
  }

  setState(newStateParameters) {
    this.stateParameters = newStateParameters;
  }

  changeVivisible(index) {
    if (index >= 1) {
      this.scene.introScene.visible = false;
    }
    if (index === 0) {
      this.scene.story1.visible = false;
      this.scene.story2.visible = false;
      this.scene.story3.visible = false;
      this.scene.story4.visible = false;
      this.scene.suitcaseGroup.visible = false;
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

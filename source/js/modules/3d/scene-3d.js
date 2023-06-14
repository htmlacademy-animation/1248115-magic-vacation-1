import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const configScene3D = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x5f458c,
  alpha: 1,
  cameraOptions: {
    fov: 35,
    near: 10,
    far: 3000,
  },
  stepScene: 2048,
}

export default class Scene3D {
  constructor() {
    this.canvasId = 'canvas-intro';
    this.positionZ = 1405;
    this.width = configScene3D.width;
    this.height = configScene3D.height;
    this.aspectRation = this.width / this.height;
    this.alpha = configScene3D.alpha;
    this.backgroundColor = configScene3D.backgroundColor;
    this.fov = configScene3D.cameraOptions.fov;
    this.near = configScene3D.cameraOptions.near;
    this.far = configScene3D.cameraOptions.far;
    this.stepScene = configScene3D.stepScene;
    this.render = this.render.bind(this);
    this.materials = [];
    this.textures = [];
    this.loadedTextures = [];

    this.isAnimateRender = true;
  }

  getCamera() {
    this.camera = new THREE.PerspectiveCamera(this.fov, this.aspectRation, this.near, this.far);
    this.controls = new OrbitControls(this.camera, document.body);
    this.camera.position.z = this.positionZ;
  }

  get3dInfrastructure() {
    this.canvas = document.getElementById(this.canvasId);
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.scene = new THREE.Scene();
    this.color = new THREE.Color(this.backgroundColor);

    this.getCamera();
    this.light = new THREE.Group();
    this.getLight();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    });
    this.renderer.setClearColor(this.color, this.alpha);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
  }

  init() {
    this.get3dInfrastructure();
  };

  loadTextures() {
    const textureLoader = new THREE.TextureLoader(this.loadManager);
    this.loadedTextures = this.textures.map((texture) => textureLoader.load(texture.url));
  };

  getSphere() {
    const geometry = new THREE.SphereGeometry(2 * 100, 80, 80);

    const material = new THREE.MeshStandardMaterial({
      color: 0xff3333,
      metalness: 0.05,
      emissive: 0x0,
      roughness: 0.5
    });

    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere);
  };

  getLight() {
    let lightUnit = new THREE.DirectionalLight(new THREE.Color('rgb(255,255,255)'), 0.84);
    lightUnit.position.set(0, 0, 0);
    lightUnit.target.position.set(0, Math.tan(THREE.MathUtils.degToRad(-15.0)) * this.camera.position.z, 2 * -750);
    this.light.add(lightUnit);
    this.light.add(lightUnit.target);

    lightUnit = new THREE.PointLight(new THREE.Color('rgb(246,242,255)'), 0.6, 12 * 975, 2.0);
    lightUnit.position.set(2 * -785, 2 * -350, 2 * -710);
    this.light.add(lightUnit);

    lightUnit = new THREE.PointLight(new THREE.Color('rgb(245,254,255)'), 0.95, 12 * 975, 2.0);
    lightUnit.position.set(2 * 730, 2 * 800, 2 * -985);
    this.light.add(lightUnit);

    this.light.position.z = this.camera.position.z;
    this.scene.add(this.light);
  };

  render() {
    //this.renderer.render(this.scene, this.camera);

    if (this.isAnimateRender) {
      requestAnimationFrame(this.render);
    } else {
      cancelAnimationFrame(this.render);
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

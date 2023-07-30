import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {isMobile} from './../helpers';
import {loadManager} from "./load-manager";

const objectsConfig = {
  airplane: {
    type: `obj`,
    path: `./3d/module-6/scene-0-objects/airplane.obj`,
    castShadow: false,
    receiveShadow: false,
  },
  suitcase: {
    type: `gltf`,
    path: `./3d/module-6/scene-0-objects/suitcase.gltf`,
    castShadow: !isMobile() ? true : false,
    receiveShadow: false,
  },
  watermelon: {
    type: `gltf`,
    path: `./3d/module-6/scene-0-objects/watermelon.gltf`,
    castShadow: false,
    receiveShadow: false,
  },
  wallCornerUnit: {
    type: `obj`,
    path: `./3d/module-6/rooms-scenes/common/WallCornerUnit.obj`,
    castShadow: !isMobile() ? true : false,
    receiveShadow: !isMobile() ? true : false,
  },
  staticObjects1: {
    type: `gltf`,
    path: `./3d/module-6/rooms-scenes/scenesStatic/scene1-static-output-1.gltf`,
    castShadow: !isMobile() ? true : false,
    receiveShadow: !isMobile() ? true : false,
  },
  staticObjects2: {
    type: `gltf`,
    path: `./3d/module-6/rooms-scenes/scenesStatic/scene2-static-output-1.gltf`,
    castShadow: !isMobile() ? true : false,
    receiveShadow: !isMobile() ? true : false,
  },
  staticObjects3: {
    type: `gltf`,
    path: `./3d/module-6/rooms-scenes/scenesStatic/scene3-static-output-1.gltf`,
    castShadow: !isMobile() ? true : false,
    receiveShadow: !isMobile() ? true : false,
  },
  staticObjects4: {
    type: `gltf`,
    path: `./3d/module-6/rooms-scenes/scenesStatic/scene4-static-output-1.gltf`,
    castShadow: !isMobile() ? true : false,
    receiveShadow: !isMobile() ? true : false,
  },
  dog: {
    type: `gltf`,
    path: `./3d/module-6/rooms-scenes/objects/dog.gltf`,
    castShadow: !isMobile() ? true : false,
    receiveShadow: !isMobile() ? true : false,
  },
  compass: {
    type: `gltf`,
    path: `./3d/module-6/rooms-scenes/objects/compass.gltf`,
    castShadow: !isMobile() ? true : false,
    receiveShadow: !isMobile() ? true : false,
  },
  sonya: {
    type: `gltf`,
    path: `./3d/module-6/rooms-scenes/objects/sonya.gltf`,
    castShadow: !isMobile() ? true : false,
    receiveShadow: !isMobile() ? true : false,
  },
};

const loadObj = (path, onComplete) => {
  const loaderObj = new OBJLoader(loadManager);
  loaderObj.load(path, onComplete);
};

const loadGltf = (path, onComplete) => {
  const loaderGltf = new GLTFLoader(loadManager);
  loaderGltf.load(path, onComplete);
};

const onComplete = (obj3d, material, params, callback) => {
  if (material) {
    obj3d.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });
  }

  if (!isMobile()) {
    obj3d.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = params.castShadow;
        child.receiveShadow = params.receiveShadow;
      }
    });
  }

  if (typeof callback === `function`) {
    callback.call(null, obj3d);
  }
};

export const loadModel = (key, material, callback) => {
  const params = objectsConfig[key];

  if (!params) {
    return;
  }

  const onGltfComplete = (gltf) => {
    if (!gltf.scene) {
      return;
    }

    onComplete(gltf.scene, material, params, callback);
  };

  switch (params.type) {
    case `gltf`:
      loadGltf(params.path, onGltfComplete);

      break;
    default:
      loadObj(params.path, (model) => onComplete(model, material, params, callback));

      break;
  }
};

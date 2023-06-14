import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const objectsConfig = {
  airplane: {
    type: `obj`,
    path: `./3d/module-6/scene-0-objects/airplane.obj`,
  },
  suitcase: {
    type: `gltf`,
    path: `./3d/module-6/scene-0-objects/suitcase.gltf`,
  },
  watermelon: {
    type: `gltf`,
    path: `./3d/module-6/scene-0-objects/watermelon.gltf`,
  },
  wallCornerUnit: {
    type: `obj`,
    path: `./3d/module-6/rooms-scenes/common/WallCornerUnit.obj`,
  },
  staticObjects1: {
    type: `gltf`,
    path: `./3d/module-6/rooms-scenes/scenesStatic/scene1-static-output-1.gltf`,
  },
  staticObjects2: {
    type: `gltf`,
    path: `./3d/module-6/rooms-scenes/scenesStatic/scene2-static-output-1.gltf`,
  },
  staticObjects3: {
    type: `gltf`,
    path: `./3d/module-6/rooms-scenes/scenesStatic/scene3-static-output-1.gltf`,
  },
  staticObjects4: {
    type: `gltf`,
    path: `./3d/module-6/rooms-scenes/scenesStatic/scene4-static-output-1.gltf`,
  },
};

const loadObj = (loadManager, path, onComplete) => {
  const loaderObj = new OBJLoader(loadManager);
  loaderObj.load(path, onComplete);
};

const loadGltf = (loadManager, path, onComplete) => {
  const loaderGltf = new GLTFLoader(loadManager);
  loaderGltf.load(path, onComplete);
};

const onComplete = (obj3d, material, callback) => {
  if (material) {
    obj3d.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });
  }

  if (typeof callback === `function`) {
    callback.call(null, obj3d);
  }
};

export const loadModel = (loadManager, key, material, callback) => {
  const params = objectsConfig[key];

  if (!params) {
    return;
  }

  const onGltfComplete = (gltf) => {
    if (!gltf.scene) {
      return;
    }

    onComplete(gltf.scene, material, callback);
  };

  switch (params.type) {
    case `gltf`:
      loadGltf(loadManager, params.path, onGltfComplete);

      break;
    default:
      loadObj(loadManager, params.path, (model) => onComplete(model, material, callback));

      break;
  }
};

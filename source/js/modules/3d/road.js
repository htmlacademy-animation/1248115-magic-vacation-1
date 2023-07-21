import * as THREE from 'three';
import {getLathePoints, getLatheDegrees} from './three-utils';
import {reflection3D} from './data-3d';
import {RoadCustomMaterial} from './road-custom-material';
import {RoadCustomMaterialMobile} from './road-custom-material-mobile';
import {isMobile} from './../helpers.js';
import {textureLoader} from './texture-loader';

export default class Road extends THREE.Group {
  constructor() {
    super();

    this.widthBase = 160;
    this.thicknessBase = 3;
    this.innerRadiusBase = 732;
    this.startDeg = 0;
    this.finishDeg = 90;
    this.isShadow = !isMobile();
    this.textureLoader = textureLoader;

    this.constructChildren();
  }

  constructChildren() {
    this.addRoad();
  }

  addRoad() {
    const points = getLathePoints(this.widthBase, this.thicknessBase, this.innerRadiusBase);
    const {start, length} = getLatheDegrees(this.startDeg, this.finishDeg);
    let material;
    if (this.isShadow) {
      material = new RoadCustomMaterial({
        metalness: reflection3D.soft.metalness,
        roughness: reflection3D.soft.roughness,
      });
    } else {
      material = new RoadCustomMaterialMobile({
        matcap: this.textureLoader.load(reflection3D.soft.matcapMaterial),
      });
    }
    const geometry = new THREE.LatheGeometry(points, 50, start, length);
    const mesh = new THREE.Mesh(geometry, material);
    if (this.isShadow) {
      mesh.receiveShadow = this.isShadow;
    }
    this.add(mesh);
  }
}

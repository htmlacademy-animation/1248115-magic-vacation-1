import * as THREE from 'three';
import {getLathePoints, getLatheDegrees} from './three-utils';
import {reflection3D} from './data-3d';
import {CarpetCustomMaterial} from './carpet-custom-material';
import {CarpetCustomMaterialMobile} from './carpet-custom-material-mobile';
import {isMobile} from './../helpers';
import {textureLoader} from './texture-loader';

export default class Carpet extends THREE.Group {
  constructor(options) {
    super();

    this.width = 180;
    this.thickness = 3;
    this.innerRadius = 763;
    this.startDeg = 16;
    this.finishDeg = 74;
    this.mainColor = options.mainColor;
    this.additionalColor = options.additionalColor;
    this.isShadow = !isMobile();
    this.textureLoader = textureLoader;

    this.constructChildren();
  }

  constructChildren() {
    this.addCarpet();
  }

  addCarpet() {
    const points = getLathePoints(this.width, this.thickness, this.innerRadius);
    const {start, length} = getLatheDegrees(this.startDeg, this.finishDeg);
    let material;
    if (this.isShadow) {
      material = new CarpetCustomMaterial({
        mainColor: this.mainColor,
        additionalColor: this.additionalColor,
        metalness: reflection3D.soft.metalness,
        roughness: reflection3D.soft.roughness,
      });
    } else {
      material = new CarpetCustomMaterialMobile({
        mainColor: this.mainColor,
        additionalColor: this.additionalColor,
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

import * as THREE from 'three';
import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";
import {color3D} from './data-3d';
import {reflection3D} from './data-3d';
import {isMobile} from './../helpers';
import {textureLoader} from './texture-loader';

const mapSvgForms = {
  keyHole: {
    src: `./img/module-6/svg-forms/keyhole.svg`,
    color: color3D.DarkPurple,
    metalness: reflection3D.soft.metalness,
    roughness: reflection3D.soft.roughness,
    matcapMaterial: reflection3D.soft.matcapMaterial,
    svgHeight: 2000,
    height: 2000,
    depth: 20,
    cap: 2,
    castShadow: false,
  },
  leaf: {
    src: `./img/module-6/svg-forms/leaf.svg`,
    color: color3D.Green,
    metalness: reflection3D.basic.metalness,
    roughness: reflection3D.basic.roughness,
    matcapMaterial: reflection3D.basic.matcapMaterial,
    svgHeight: 64,
    height: 117,
    depth: 8,
    cap: 2,
    castShadow: false,
  },
  leafPyramid: {
    src: `./img/module-6/svg-forms/leaf.svg`,
    color: color3D.Green,
    metalness: reflection3D.basic.metalness,
    roughness: reflection3D.basic.roughness,
    matcapMaterial: reflection3D.basic.matcapMaterial,
    svgHeight: 64,
    height: 335,
    depth: 3,
    cap: 3,
    castShadow: !isMobile() ? true : false,
  },
  flamingo: {
    src: `./img/module-6/svg-forms/flamingo.svg`,
    color: color3D.LightDominantRed,
    metalness: reflection3D.soft.metalness,
    roughness: reflection3D.soft.roughness,
    matcapMaterial: reflection3D.soft.matcapMaterial,
    svgHeight: 38,
    height: 85,
    depth: 8,
    cap: 2,
    castShadow: false,
  },
  question: {
    src: `./img/module-6/svg-forms/question.svg`,
    color: color3D.Blue,
    metalness: reflection3D.basic.metalness,
    roughness: reflection3D.basic.roughness,
    matcapMaterial: reflection3D.basic.matcapMaterial,
    svgHeight: 55,
    height: 56,
    depth: 8,
    cap: 2,
    castShadow: false,
  },
  snowflake: {
    src: `./img/module-6/svg-forms/snowflake.svg`,
    color: color3D.Blue,
    metalness: reflection3D.basic.metalness,
    roughness: reflection3D.basic.roughness,
    matcapMaterial: reflection3D.basic.matcapMaterial,
    svgHeight: 71,
    height: 74,
    depth: 8,
    cap: 2,
    castShadow: false,
  },
  flower: {
    src: `./img/module-6/svg-forms/flower.svg`,
    color: color3D.AdditionalPurple,
    metalness: reflection3D.basic.metalness,
    roughness: reflection3D.basic.roughness,
    matcapMaterial: reflection3D.basic.matcapMaterial,
    svgHeight: 362,
    height: 413,
    depth: 4,
    cap: 2,
    castShadow: !isMobile() ? true : false,
  },
  flower2: {
    src: `./img/module-6/svg-forms/flower.svg`,
    color: color3D.ShadowedAdditionalPurple,
    metalness: reflection3D.basic.metalness,
    roughness: reflection3D.basic.roughness,
    matcapMaterial: reflection3D.basic.matcapMaterial,
    svgHeight: 362,
    height: 413,
    depth: 4,
    cap: 2,
    castShadow: !isMobile() ? true : false,
  }
};

export default class SvgLoader {
  constructor(name) {
    this.name = name;
    this.textureLoader = textureLoader;
  }

  createSvgGroup() {
    const loader = new SVGLoader();
    const group = new THREE.Group();

    loader.load(
        mapSvgForms[this.name].src,
        (data) => {
          const paths = data.paths;

          for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            let material;
            if (!isMobile()) {
              material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(mapSvgForms[this.name].color),
                metalness: mapSvgForms[this.name].metalness,
                roughness: mapSvgForms[this.name].roughness
              });
            } else {
              material = new THREE.MeshMatcapMaterial({
                color: new THREE.Color(mapSvgForms[this.name].color),
                matcap: this.textureLoader.load(mapSvgForms[this.name].matcapMaterial),
              });
            }

            const shapes = path.toShapes(false);

            for (let j = 0; j < shapes.length; j++) {
              const shape = shapes[j];
              const factorHeight = mapSvgForms[this.name].svgHeight / mapSvgForms[this.name].height;
              const geometry = new THREE.ExtrudeGeometry(shape, {
                depth: mapSvgForms[this.name].depth * factorHeight,
                bevelThickness: mapSvgForms[this.name].cap * factorHeight,
                bevelSize: mapSvgForms[this.name].cap * factorHeight,
                bevelSegments: 3
              });
              const mesh = new THREE.Mesh(geometry, material);
              if (!isMobile()) {
                mesh.castShadow = mapSvgForms[this.name].castShadow;
              }
              group.add(mesh);
            }
          }
        }
    );

    return group;
  }
}

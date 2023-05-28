import * as THREE from 'three';
import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";

const mapSvgForms = {
  keyHole: {
    src: `./img/module-6/svg-forms/keyhole.svg`,
    color: `#4e4069`,
    svgHeight: 2000,
    height: 2000,
    depth: 20,
    cap: 2
  },
  leaf: {
    src: `./img/module-6/svg-forms/leaf.svg`,
    color: `#34df96`,
    svgHeight: 64,
    height: 117,
    depth: 8,
    cap: 2
  },
  leafPyramid: {
    src: `./img/module-6/svg-forms/leaf.svg`,
    color: `#20c14f`,
    svgHeight: 64,
    height: 335,
    depth: 3,
    cap: 3
  },
  flamingo: {
    src: `./img/module-6/svg-forms/flamingo.svg`,
    color: `#fe6183`,
    svgHeight: 38,
    height: 85,
    depth: 8,
    cap: 2
  },
  question: {
    src: `./img/module-6/svg-forms/question.svg`,
    color: `#3b7bf2`,
    svgHeight: 55,
    height: 56,
    depth: 8,
    cap: 2
  },
  snowflake: {
    src: `./img/module-6/svg-forms/snowflake.svg`,
    color: `#3b7bf2`,
    svgHeight: 71,
    height: 74,
    depth: 8,
    cap: 2
  },
  flower: {
    src: `./img/module-6/svg-forms/flower.svg`,
    color: `#664ba5`,
    svgHeight: 362,
    height: 413,
    depth: 4,
    cap: 2
  }
};

export default class SvgLoader {
  constructor(name) {
    this.name = name;
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
            const material = new THREE.MeshStandardMaterial({
              color: new THREE.Color(mapSvgForms[this.name].color),
            });

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
              group.add(mesh);
            }

          }

        }
    );

    return group;
  }
}

import Scene3D from './3d/scene-3d.js';
import {scene3DData} from './user-data.js';

const intro = new Scene3D(scene3DData[0]);
const story = new Scene3D(scene3DData[1]);

export {intro, story};

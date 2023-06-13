import Intro3D from './intro-3d.js';
import Story3D from './story-3d.js';
import {scene3DData} from './scene-3d-data.js';

const intro = new Intro3D(scene3DData[0]);
const story = new Story3D(scene3DData[1]);

export {intro, story};

// modules
import mobileHeight from './modules/mobile-height-adjust.js';
//import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import {loadPage} from './modules/load-page';
import {getAnimatedTitles} from './modules/get-animated-titles';
import Scene3D from './modules/3d/scene-3d.js';
import {scene3DData} from './modules/user-data.js';

// init modules
mobileHeight();
//slider();
menu();
footer();
chat();
result();
form();
social();
loadPage();
getAnimatedTitles();

const intro = new Scene3D(scene3DData[0]);
intro.init();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
//import FullPageScroll from './modules/full-page-scroll';
import {loadPage} from './modules/load-page';
import {getAnimatedTitles} from './modules/get-animated-titles';
import {scene3D} from './modules/3d/init-scene-3d.js';

//import {sonyaAnimationPlay} from './modules/sonya-animation.js';
/*
import {
  sonyaAnimationEnd,
  sonyaAnimationStart,
} from "../helpers/sonyaAnimation";
*/


// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
loadPage();
getAnimatedTitles();

scene3D.init();

//const fullPageScroll = new FullPageScroll();
//fullPageScroll.init();

//sonyaAnimationPlay();

// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import {playAgain} from './modules/play-again.js';
import form from './modules/form.js';
import social from './modules/social.js';
import {loadPage} from './modules/load-page';
import {getAnimatedTitles} from './modules/get-animated-titles';
import {scene3D} from './modules/3d/init-scene-3d.js';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
playAgain();
form();
social();
loadPage();
getAnimatedTitles();

scene3D.init();

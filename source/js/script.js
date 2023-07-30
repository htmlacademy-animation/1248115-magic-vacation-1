// modules
import mobileHeight from './modules/mobile-height-adjust';
import slider from './modules/slider';
import menu from './modules/menu';
import footer from './modules/footer';
import chat from './modules/chat';
import result from './modules/result';
import {playAgain} from './modules/play-again';
import form from './modules/form';
import social from './modules/social';
import {loadPage} from './modules/load-page';
import {getAnimatedTitles} from './modules/get-animated-titles';
import {scene3D} from './modules/3d/init-scene-3d';

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

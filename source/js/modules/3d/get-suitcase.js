import {loadManagerIntro, loadManagerStory} from "./load-manager";
import Suitcase from "./suitcase";

const suitcaseIntro = new Suitcase(loadManagerIntro);
const suitcaseStory = new Suitcase(loadManagerStory);

export {suitcaseIntro, suitcaseStory};

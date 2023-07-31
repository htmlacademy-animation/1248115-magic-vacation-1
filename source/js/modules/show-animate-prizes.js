import {showCountPrizes} from './show-count-prizes';
import {prizesData} from './user-data';

let doneAnimatePrizes = false;

const showAnimatePrizes = () => {
  if (!doneAnimatePrizes) {
    const prizesContainer = document.querySelector(`.prizes`);
    const startAnimateDirigible = prizesContainer.querySelector(`#startDirigible`);
    startAnimateDirigible.beginElementAt(0.433);
    const prizeCases = prizesContainer.querySelector(`.prizes__item--cases`);
    setTimeout(function () {
      prizeCases.style.visibility = `visible`;
    }, 4200);
    const startAnimateCases = prizesContainer.querySelector(`#startCases`);
    startAnimateCases.beginElementAt(4.233);
    setTimeout(showCountPrizes, 5433, prizesData[0]);
    const prizeCodes = prizesContainer.querySelector(`.prizes__item--codes`);
    setTimeout(function () {
      prizeCodes.style.visibility = `visible`;
    }, 6633);
    const startAnimateCodes = prizesContainer.querySelector(`#startCodes`);
    startAnimateCodes.beginElementAt(6.666);
    setTimeout(showCountPrizes, 7600, prizesData[1]);
    setTimeout(() => prizesContainer.classList.remove(`active-count`), 8266);
    doneAnimatePrizes = true;
  }
};

export {showAnimatePrizes};

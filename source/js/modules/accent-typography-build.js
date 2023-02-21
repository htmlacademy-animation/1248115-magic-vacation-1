class AccentTypographyBuild {
  constructor(
    totalDelay,
    elementSelector,
    timer,
    property,
    wordsDelays
  ) {
    this._totalDelay = totalDelay;
    this._elementSelector = elementSelector;
    this._timer = timer;
    this._property = property;
    this._element = document.querySelector(this._elementSelector);
    this._wordsDelays = wordsDelays;
    this._seriesWordsDelays = 0;

    this.prePareText();
  }

  createElement(letter, indexDelay) {
      const span = document.createElement(`span`);
      span.textContent = letter;
      span.style.transition = `${this._property} ${this._timer}ms ease ${this._totalDelay + this._wordsDelays[this._seriesWordsDelays][indexDelay]}ms`;
      return span;
  }

  prePareText() {
    if (!this._element) {
      return;
    }

    this._element.classList.add('text');
    const text = this._element.textContent.trim().split(/\s/).filter((word)=> word !== '');
    const content = text.reduce((fragmentParent, word) => {
      const wordElement = Array.from(word).reduce((fragment, symbol, index) => {
        fragment.appendChild(this.createElement(symbol, index));
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`text__word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);
      this._seriesWordsDelays += 1;
      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }
}

export {AccentTypographyBuild};

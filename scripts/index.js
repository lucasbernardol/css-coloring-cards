const cellsContainerElement = document.querySelector(
  '[data-id="cells-container"]'
);

const CELLS_COLORS = {
  backgroundColor: '#202024',
  borderColor: '#09090a',
};

// Cells or "div" elements.
const CELLS_TOTAL = 1200;

const RANDOM_NUMBER = (from, to) => Math.floor(Math.random() * (to - from) + 1);

class Color {
  constructor() {}

  randomRgb({ toString } = {}) {
    // ['r', 'g', 'b']
    const arrayColorsParts = Array.from([1, 2, 3]);

    let interactionsIndex = 0;

    while (interactionsIndex < arrayColorsParts.length) {
      const randomNumber = RANDOM_NUMBER(1, 255);

      arrayColorsParts[interactionsIndex] = randomNumber;

      interactionsIndex++;
    }

    return {
      rgb: [...arrayColorsParts],
      rgbString: toString ? this.rgbToString(arrayColorsParts) : null,
    };
  }

  rgbToString(rgbArray = []) {
    const arrayToString = rgbArray.join(',');

    return `rgb(${arrayToString})`;
  }
}

class SquaresManipulate {
  /** @param options {{
   *    cellsContainer: HTMLElement,
   *    colorInstance: Color
   * }}
   **/
  constructor({ cellsContainer, colorInstance }) {
    this.cellsContainer = cellsContainer;
    this.colorInstance = colorInstance;
  }

  init() {
    for (let index = 0; index < CELLS_TOTAL; index++) {
      const cellElement = this._createHTMLElement('div');

      // css classname
      this.addClassName(cellElement, 'cell__item');
      this._containerAppendElement(cellElement);

      //Events
      cellElement.addEventListener('mouseover', (event) => this.onHover(event));

      cellElement.addEventListener('mouseleave', (event) =>
        this.onLeave(event)
      );
    }
  }

  /** @param name {string} */
  _createHTMLElement(name = 'div') {
    return document.createElement(name);
  }

  addClassName(element, className) {
    element.classList.add(className);
  }

  _containerAppendElement(childElement) {
    this.cellsContainer.appendChild(childElement);
  }

  onHover(event) {
    const target = event.target;

    const { rgbString } = this.colorInstance.randomRgb({ toString: true });

    target.style.backgroundColor = rgbString;
    target.style.boxShadow = `0 0 5px ${rgbString}, 0 0 10px ${rgbString}`;
  }

  onLeave(event) {
    const { target } = event;

    target.style = Object.assign(target.style, { ...CELLS_COLORS });
  }
}

function load() {
  const square = new SquaresManipulate({
    cellsContainer: cellsContainerElement,
    colorInstance: new Color(),
  });

  square.init();
}

window.addEventListener('load', () => load());

import ApiManager from './ApiManager';
import Card from './Card';

export default class Layout {
  constructor() {
    this.searchButton = document.querySelector('.search-btn');
    this.clearButton = document.querySelector('.search-clear');
    this.searchInput = document.querySelector('.search-input');
    this.cardsWrapper = document.querySelector('.carousel');
    this.fragment = document.createDocumentFragment();

    this.apiManager = new ApiManager(this);

    this.bindButtons();
  }

  bindButtons() {
    this.searchButton.onclick = () => this.apiManager.search(this.searchInput.value);
    this.clearButton.onclick = () => this.clearInput();

    this.searchInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        this.searchButton.click();
      }
    });
  }

  createMovieCards(arrayMovies) {
    this.cardsWrapper.innerHTML = '';

    for (let i = 0; i < arrayMovies.length; i += 1) {
      const card = new Card(arrayMovies[i]);
      this.fragment.appendChild(card.render());
    }
    this.cardsWrapper.appendChild(this.fragment);
    /* global Flickity */
    // eslint-disable-next-line no-new
    new Flickity(this.cardsWrapper, { wrapAround: true });
  }

  clearInput() {
    this.searchInput.value = '';
  }
}

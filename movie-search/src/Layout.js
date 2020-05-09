import ApiManager from './ApiManager';
import Card from './Card';

export default class Layout {
  constructor() {
    this.searchButton = document.querySelector('.search-btn');
    this.clearButton = document.querySelector('.search-clear');
    this.searchInput = document.querySelector('.search-input');
    this.cardsWrapper = document.querySelector('.cards-wrapper');
    this.fragment = document.createDocumentFragment();

    this.clearButton.onclick = this.clearInput;

    this.apiManager = new ApiManager(this);

    this.searchButton.onclick = () => this.apiManager.search(this.searchInput.value);
  }

  createMovieCards(arrayMovies) {
    for (let i = 0; i < arrayMovies.length; i += 1) {
      const card = new Card(arrayMovies[i]);
      this.fragment.appendChild(card.render());
    }
    this.cardsWrapper.appendChild(this.fragment);
  }

  clearInput() {
    this.searchInput.value = '';
  }
}

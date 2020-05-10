const TITLE_URL = 'https://www.imdb.com/title/';

export default class Card {
  constructor(data) {
    this.title = data.Title;
    this.poster = data.Poster;
    this.year = data.Year;
    this.id = data.imdbID;
    this.rating = 0;
  }

  render() {
    const element = document.createElement('div');
    element.classList.add('card');
    element.classList.add('carousel-cell');
    element.innerHTML = `
            <img class="card-img-top" src="${this.poster}" alt="movie poster"/>
            <div class="card-body">
                <a class="card-title" href="${TITLE_URL}${this.id}">${this.title}</a>
                <p>${this.year}</p>
<!--                <br><i class="fas fa-star">-->
            </div>`;
    return element;
  }
}

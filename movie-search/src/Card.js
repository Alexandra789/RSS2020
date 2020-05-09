export default class Card {
  constructor(data) {
    this.title = data.Title;
    this.poster = data.Poster;
    this.year = data.Year;
    this.rating = 0;
  }

  render() {
    const element = document.createElement('div');
    element.classList.add('card');
    element.innerHTML = `
        <h2>${this.title}</h2>
        <img class="image-movie" src="${this.poster}" alt="movie poster"/>
        <p>${this.year}</p>
        <br><i class="fas fa-star"><p></p>`;
    return element;
  }
}

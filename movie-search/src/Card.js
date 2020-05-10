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
    element.classList.add('col-xs-6');
    element.innerHTML = `
        <img class="card-img-top" src="${this.poster}" alt="movie poster"/>
        <div class="card-body">
            <h5 class="card-title">${this.title}</h5>
            <p>${this.year}</p>
<!--                <br><i class="fas fa-star">-->
        </div>`;
    return element;
  }
}

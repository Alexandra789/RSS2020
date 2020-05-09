const button = global.document.querySelector('.search-btn');
const clear = document.querySelector('.search-clear');
const input = document.querySelector('.search-input');
const cardsWrapper = document.querySelector('.cards-wrapper');
const fragment = document.createDocumentFragment();

function getMovieCard(arrayMovies) {
  const cardMove = document.createElement('div');
  cardMove.classList.add('card');
  cardMove.innerHTML = `
        <h2>${arrayMovies.Title}</h2>
        <img class="image-movie" src="${arrayMovies.Poster}" alt="movie poster"></img>
        <p>${arrayMovies.Year}</p>
        <br><i class="fas fa-star"><p></p>`;
  return cardMove;
}

function createMovieCard(arrayMovies) {
  for (let i = 0; i < arrayMovies.length; i += 1) {
    fragment.appendChild(getMovieCard(arrayMovies[i]));
  }
  cardsWrapper.appendChild(fragment);
}

function getInfoAboutMovie() {
  const url = `https://www.omdbapi.com/?s=${input.value}&apikey=9b67fc54`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.Search);
      createMovieCard(data.Search);
    });
}

function clearInput() {
  input.value = '';
}

button.onclick = getInfoAboutMovie;
clear.onclick = clearInput;

/*
fetch('http://jsonplaceholder.typicode.com/users', {
  method: 'GET'
})
.then(function(response) { return response.json(); })

*/

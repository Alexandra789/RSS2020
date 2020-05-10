const API_URL = 'https://www.omdbapi.com';
const API_KEY = '3fd78803';
const TITLES = ['batman', 'harry potter', 'star wars', 'tokyo'];

function getRatings(data) {
  return Promise.all(data.map((entry) => {
    const url = `${API_URL}/?i=${entry.imdbID}&apikey=${API_KEY}`;
    return fetch(url).then((res) => res.json());
  }));
}

function getRandomTitle() {
  return TITLES[Math.floor(Math.random() * TITLES.length)];
}

export default class ApiManager {
  constructor(layout) {
    this.layout = layout;
    this.search(getRandomTitle());
  }

  search(query) {
    const url = `${API_URL}/?s=${query}&apikey=${API_KEY}&type=movie`;
    this.layout.toggleLoading(true);
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!data.Search) {
          this.layout.showAlert('No results found. Try something else');
        } else {
          const result = data.Search;
          getRatings(result).then((res) => {
            for (let i = 0; i < res.length; i += 1) {
              result[i].rating = res[i].imdbRating;
            }
            this.layout.toggleLoading(false);
            this.layout.createMovieCards(result);
          });
        }
      })
      .catch((err) => {
        this.layout.showAlert(err);
      });
  }
}

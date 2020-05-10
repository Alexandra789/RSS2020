const API_URL = 'https://www.omdbapi.com';
const API_KEY = '3fd78803';
// const TITLES = ['batman', 'harry potter', 'star wars', 'lord of the rings'];

export default class ApiManager {
  constructor(layout) {
    this.layout = layout;
    this.search('batman');
  }

  async search(query) {
    const url = `${API_URL}/?s=${query}&apikey=${API_KEY}&type=movie`;
    const res = await fetch(url);
    const data = await res.json();
    this.layout.createMovieCards(data.Search);
  }

  // getRandomTitle() {
  //   return TITLES[Math.floor(Math.random() * TITLES.length)];
  // }
}

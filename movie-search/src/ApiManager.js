const API_URL = 'https://www.omdbapi.com';
const API_KEY = '3fd78803';

export default class ApiManager {
  constructor(layout) {
    this.layout = layout;
  }

  async search(query) {
    const url = `${API_URL}/?s=${query}&apikey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    this.layout.createMovieCards(data.Search);
  }
}

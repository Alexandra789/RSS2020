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
    this.layout.toggleLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data.Search) {
        this.layout.showAlert('No results found. Try something else');
      } else {
        this.layout.toggleLoading(false);
        this.layout.createMovieCards(data.Search);
      }
    } catch (err) {
      this.layout.showAlert(err);
    }
  }

  // getRandomTitle() {
  //   return TITLES[Math.floor(Math.random() * TITLES.length)];
  // }
}

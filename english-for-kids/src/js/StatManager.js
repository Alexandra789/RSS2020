export class StatManager {
  constructor() {
    this.data = {};
    this.loadStorage();
  }

  loadStorage() {
    window.onbeforeunload = () => {
      localStorage.setItem('stats', JSON.stringify(this.data));
    };
  }

  addStat(word, stat) {
    this.checkKey(word);
    this.data[word][stat]++;
  }

  getStat(word) {
    this.checkKey(word);
    return this.data[word];
  }

  getSuccessPercentage(word) {
    this.checkKey(word);
    const d = this.data[word];
    const total = d.guess + d.error;
    if (!total) {
      return 0;
    }
    return (d.error / total * 100).toFixed(1);
  }

  checkKey(word) {
    if (!(word in this.data)) {
      this.data[word] = {
        click: 0,
        guess: 0,
        error: 0,
      };
    }
  }
}

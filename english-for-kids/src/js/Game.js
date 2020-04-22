import {
  ANSWER_RIGHT, ANSWER_WRONG, STAT_GUESS, STAT_ERROR, GAMEOVER_WIN, GAMEOVER_LOSE,
} from './constants';
import cards from './cards';

export class Game {
  constructor(layout, statManager) {
    this.statManager = statManager;
    this.layout = layout;
    this.correctAnswers = 0;
    this.wrongAnswers = 0;
    this.words = this.getWords();
    this.selectedWord = '';
    this.start();
  }

  getWords() {
    const words = [];
    for (let i = 0; i < cards[this.layout.activeCategoryIndex].length; i += 1) {
      words.push(cards[this.layout.activeCategoryIndex][i].word);
    }
    return words;
  }

  checkGameOver() {
    if (this.words.length) {
      return false;
    }

    if (this.wrongAnswers) {
      this.showGameOver(GAMEOVER_LOSE);
    } else {
      this.showGameOver(GAMEOVER_WIN);
    }

    return true;
  }

  selectNewWord() {
    if (this.checkGameOver()) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * this.words.length);
    const word = this.words[randomIndex];
    this.words.splice(randomIndex, 1);
    this.selectedWord = word;
    this.layout.playAudio(word);
  }

  selectCard(e) {
    if (e.target.className !== 'card-img-top') {
      return;
    }
    const word = e.target.getAttribute('alt');
    if (word === this.selectedWord) {
      e.target.className += ' inactive';
      this.addAnswer(ANSWER_RIGHT);
    } else {
      this.addAnswer(ANSWER_WRONG);
    }
  }

  bindCards() {
    this.layout.resetCards();
    this.layout.cardsWrapper.onclick = (e) => { this.selectCard(e); };
  }

  modifyStartButton() {
    this.layout.startGameButton.innerHTML = 'Repeat word';
    this.layout.startGameButton.onclick = () => {
      this.layout.playAudio(this.selectedWord);
    };
  }

  start() {
    this.layout.resetStars();
    this.bindCards();
    this.selectNewWord();
    this.modifyStartButton();
  }

  addAnswer(answer) {
    let star;
    if (answer === ANSWER_RIGHT) {
      this.correctAnswers += 1;
      this.statManager.addStat(this.selectedWord, STAT_GUESS);
      this.layout.playAudio('correct');
      star = '<img class="star" src="../assets/images/star-win.svg">';
      setTimeout(() => this.selectNewWord(), 1000);
    } else {
      this.wrongAnswers += 1;
      this.statManager.addStat(this.selectedWord, STAT_ERROR);
      this.layout.playAudio('error');
      star = '<img class="star" src="../assets/images/star.svg">';
    }

    this.layout.starContainer.innerHTML += star;
  }
}

import cards from './cards';

export class Scope {
  constructor(layout, statManager) {
    this.statManager = statManager;
    this.layout = layout;
    this.draw();
  }

  draw() {
    const scopeWrapper = document.querySelector('.scope-wrapper');
    scopeWrapper.style.display = 'block';
    this.layout.cardsCategoryWrapper.style.display = 'none';
    this.layout.cardsWrapper.style.display = 'none !important';
    for (let i = 1; i < cards.length; i += 1) {
      const titleCategory = document.createElement('h2');
      titleCategory.className = `${cards[0][i - 1]}`;
      titleCategory.innerText = `${cards[0][i - 1]}`;
      scopeWrapper.append(titleCategory);
      for (let j = 0; j < cards[i].length; j += 1) {
        const { word } = cards[i][j];
        const stat = this.statManager.getStat(word);
        const percent = this.statManager.getSuccessPercentage(word);
        const textCard = `
              - <span>${cards[i][j].translation}</span>
              <br>Количество кликов по карточке - ${stat.click}
              <br>Количество угадываний слова - ${stat.guess}
              <br>Количество ошибок - ${stat.error} - ${percent}%`;
        scopeWrapper.append(this.layout.getCard(cards[i][j].word, cards[i][j].image, textCard));
      }
    }
  }
}

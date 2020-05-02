import { STAT_CLICK } from './constants';
import cards from './cards';
import { StatManager } from './StatManager';
import { Scope } from './Scope';
import { Game } from './Game';

export class Layout {
  constructor() {
    this.menu = document.getElementById('menu');
    this.itemsMenu = document.querySelectorAll('a[href*="#"]');
    this.cardBody = document.getElementsByClassName('card-body');
    this.menuLines = document.getElementsByClassName('line');
    this.startGameButton = document.querySelector('.button-game');
    this.cardsCategoryWrapper = document.querySelector('.cards-category-wrapper');
    this.toggle = document.getElementById('mytoggle');
    this.cardsWrapper = document.querySelector('.cards-wrapper');
    this.scopeWrapper = document.querySelector('.scope-wrapper');
    this.fragment = document.createDocumentFragment();
    this.starContainer = document.querySelector('.star-container');
    this.scope = this.menu.lastElementChild;

    this.bindCheckbox();
    this.bindStartGameButton();
    this.createCards();

    this.statManager = new StatManager();

    this.cardsCategoryWrapper.onclick = (e) => { this.clickCard(e); };
    this.cardsWrapper.onclick = (e) => { this.clickCard(e); };
    this.menu.onclick = (e) => { this.clickCard(e); };
    this.toggle.onclick = (e) => { this.changeState(e); };
    this.scope.onclick = () => { new Scope(this, this.statManager); };

    this.flag = 'train';
    this.activeCategoryIndex = 0;
  }

  getCard(title, image, rotateImg) {
    if (`${rotateImg}` === 'undefined') {
      rotateImg = '';
    }
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    if (this.flag === 'play') {
      cardElement.className += ' play';
    }
    cardElement.innerHTML = `
          <div class = front>
            <img class="card-img-top" src="../assets/images/${image}" alt="${title}">
          </div> 
          <div class="back">
              <img class="card-img-top" src="../assets/images/${image}" alt="${title}">
          </div>
          <div class="card-body">
            <p class="card-text">${title}
              ${rotateImg}
            </p>
          </div>`;
    return cardElement;
  }

  createCards() {
    this.activeCategoryIndex = 0;
    this.cardsWrapper.style.display = 'none';
    this.cardsCategoryWrapper.style.display = 'inline-flex';
    this.togglePlayButton();
    for (let i = 1; i < cards.length; i += 1) {
      this.fragment.appendChild(this.getCard(cards[0][i - 1], cards[i][i - 1].image));
    }
    this.cardsCategoryWrapper.appendChild(this.fragment);
  }

  togglePlayButton() {
    if (this.flag === 'play' && this.activeCategoryIndex) {
      this.startGameButton.style.display = 'inline-block';
    } else {
      this.startGameButton.style.display = 'none';
      this.resetStars();
      this.resetCards();
    }
  }

  rewriteCards(numberCategory) {
    this.cardsCategoryWrapper.style.display = 'none';
    this.activeCategoryIndex = numberCategory;
    this.togglePlayButton();
    const rotateImg = ' <img class="rotate" src="../assets/images/rotate.svg">';
    for (let i = 0; i < cards[numberCategory].length; i += 1) {
      this.fragment.appendChild(
        this.getCard(cards[numberCategory][i].word, cards[numberCategory][i].image, rotateImg),
      );
    }
    this.cardsWrapper.appendChild(this.fragment);
  }

  changeState() {
    this.flag = this.flag === 'play' ? 'train' : 'play';
    this.togglePlayButton();
    if (!this.menu.classList.contains('play')) {
      this.menu.classList.add('play');
      this.menu.classList.add('red');
      for (let i = 0; i < this.cardBody.length; i += 1) {
        this.cardBody[i].parentNode.className += ' play';
      }
      for (let i = 0; i < this.menuLines.length; i += 1) {
        this.menuLines[i].className += ' red';
      }
    } else {
      this.menu.classList.remove('play');
      this.menu.classList.remove('red');
      for (let i = 0; i < this.cardBody.length; i += 1) {
        this.cardBody[i].parentNode.classList.remove('play');
      }
      for (let i = 0; i < this.menuLines.length; i += 1) {
        this.menuLines[i].classList.remove('red');
      }
    }
  }

  rewriteCategory(nameCategory) {
    this.bindStartGameButton();
    this.resetStars();
    for (let i = 0; i < cards.length - 1; i += 1) {
      if (nameCategory === cards[0][i]) {
        this.cardsWrapper.innerHTML = '';
        this.rewriteCards(i + 1);
      }
    }
    if (nameCategory !== 'Scope') {
      this.cardsWrapper.style.display = 'inline-flex';
    } else {
      this.cardsWrapper.style.display = 'none';
    }
  }

  itemMenuClick(e) {
    for (let i = 0; i < this.itemsMenu.length; i += 1) {
      if (this.itemsMenu[i].classList.contains('active')) {
        this.itemsMenu[i].classList.remove('active');
      } else {
        e.target.parentNode.classList.add('active');
      }
    }
  }

  underlineMenuItem(nameCategory) {
    for (let i = 0; i < this.itemsMenu.length; i += 1) {
      if (this.itemsMenu[i].lastChild.innerText === nameCategory) {
        this.itemsMenu[i].classList.add('active');
      } else {
        this.itemsMenu[i].classList.remove('active');
      }
    }
  }

  clickWord(word) {
    this.statManager.addStat(word, STAT_CLICK);
    this.playAudio(word);
  }

  playAudio(nameCard) {
    const audio = new Audio();
    if (nameCard === 'correct' || nameCard === 'error') {
      audio.src = `../assets/audio/${nameCard}.mp3`;
    }
    for (let i = 0; i < cards.length; i += 1) {
      for (let j = 0; j < cards[i].length; j += 1) {
        if (nameCard === cards[i][j].word) {
          audio.src = `../assets/${cards[i][j].audioSrc}`;
        }
      }
    }
    audio.play();
  }

  resetCards() {
    const cardImages = document.getElementsByClassName('card-img-top');
    for (let i = 0; i < cardImages.length; i += 1) {
      cardImages[i].classList.remove('inactive');
    }
  }

  resetStars() {
    this.starContainer.innerHTML = '';
  }

  bindStartGameButton() {
    this.startGameButton.innerHTML = 'Start Game';
    this.startGameButton.onclick = () => { new Game(this, this.statManager); };
  }

  rotateCard(e) {
    const rotateImg = '<img class="rotate" src="../assets/images/rotate.svg">';
    const card = e.parentNode.parentNode.parentNode;
    e.parentNode.parentNode.parentNode.classList.add('hover');
    e.parentNode.classList.add('hover');

    const p = e.parentNode;

    p.onmouseout = () => {
      card.classList.remove('hover');
      card.parentNode.classList.remove('hover');
      p.classList.remove('hover');
      for (let i = 1; i < cards.length; i += 1) {
        for (let j = 0; j < cards[i].length; j += 1) {
          if (p.innerText === cards[i][j].translation) {
            p.innerHTML = `${cards[i][j].word} ${rotateImg}`;
          }
        }
      }
    };
    for (let i = 1; i < cards.length; i += 1) {
      for (let j = 0; j < cards[i].length; j += 1) {
        if (e.parentNode && e.parentNode.innerText === `${cards[i][j].word} `) {
          e.parentNode.innerText = `${cards[i][j].translation}`;
        }
      }
    }
  }


  clickCard(e) {
    if (e.target.className === 'card-text' || e.target.className === 'card-body' || e.target.className === 'card-img-top'
            || e.target.className === 'rotate' || e.target.className === 'front') {
      if (this.flag === 'play' && this.activeCategoryIndex) {
        return;
      }
      this.cardsCategoryWrapper.style.display = 'none';
      switch (e.target.className || e.target.tagName) {
        case 'card-text': this.underlineMenuItem(e.target.innerText); this.clickWord(e.target.innerText); this.rewriteCategory(e.target.innerText); break;
        case 'card-body': this.underlineMenuItem(e.target.lastChild.previousSibling.innerText); this.clickWord(e.target.lastChild.previousSibling.innerText); this.rewriteCategory(e.target.lastChild.previousSibling.innerText); break;
        case 'card-img-top': this.underlineMenuItem(e.target.alt); this.clickWord(e.target.alt); this.rewriteCategory(e.target.alt); break;
        case 'front': this.underlineMenuItem(e.target.lastElementChild.alt); this.clickWord(e.target.lastElementChild.alt); this.rewriteCategory(e.target.lastElementChild.alt); break;
        case 'rotate': this.rotateCard(e.target); break;
        default: break;
      }
    } else if (e.target.tagName === 'LI') {
      this.itemMenuClick(e);
      if (e.target.innerText === 'Main Page') {
        this.createCards();
      } else {
        this.rewriteCategory(e.target.innerText);
      }
    }
  }

  bindCheckbox() {
    const checkbox = document.querySelector('.checkbox');
    document.onclick = (e) => {
      if (e.toElement.className === checkbox.className) {
        return;
      }
      checkbox.checked = false;
    };
  }
}

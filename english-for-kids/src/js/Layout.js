

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
    for (let i = 0; i < cardImages.length; i++) {
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

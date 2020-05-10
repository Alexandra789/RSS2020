import TextArea from './TextArea';
import VirtualKeyboard from './VirtualKeyboard';


export default class KeyboardLayout {
  constructor(target, container, searchBtn) {
    const contentWrapper = document.createElement('div');
    const keyboard = document.createElement('div');
    const keyboardKeys = document.createElement('div');

    this.container = container;
    contentWrapper.className = 'content-wrapper';
    keyboard.className = 'keyboard';
    keyboardKeys.className = 'keyboard__keys';

    this.container.append(contentWrapper);
    contentWrapper.appendChild(keyboard);
    keyboard.appendChild(keyboardKeys);

    this.output = new TextArea(target);
    this.input = new VirtualKeyboard(keyboard, this.output, keyboardKeys, searchBtn);
    this.loadstorage();
  }

  loadstorage() {
    const self = this;

    window.onbeforeunload = function () {
      const currentLang = self.input.getCurrentLang;
      localStorage.setItem('lang', currentLang);
    };

    window.onload = function () {
      const lang = localStorage.getItem('lang');
      if (lang !== null) { self.input.changeLang(lang); }
    };
  }

  toggle(flag) {
    if (!flag) {
      this.container.style.display = 'none';
      this.output.element.onblur = () => {};
    } else {
      this.container.style.display = 'block';
      this.output.element.onblur = function () { this.focus(); };
    }
  }
}

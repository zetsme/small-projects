const uppercaseInput = document.getElementById('uppercase');
const lettersInput = document.getElementById('letters');
const minCharsInput = document.getElementById('minChars');
const searchInput = document.getElementById('search');
const textEl = document.getElementById('text');
const resultEl = document.getElementById('result');

const inputs = [...document.querySelectorAll('input')];

class Text {
  constructor(el) {
    this.textArr = el.textContent.trim().split(/\s+/g);
  }
  toUpperCase = () => (this.textArr = this.textArr.map((word) => word.toUpperCase()));
  toLetters = () => (this.textArr = this.textArr.map((word) => word.replace(/[^a-z\w]/gi, '')));
  toMinLetters = (val) =>
    (this.textArr = this.textArr.filter((word) => word.length >= Number(val)));
  search = (val) =>
    (this.textArr = this.textArr.filter((word) => word.match(new RegExp(val, 'gi'))));
  toString = () => this.textArr.join(' ');
}

const updateResults = (e) => {
  resultEl.innerHTML = '';

  const hasInputValue = inputs.some((input) => input.checkValidity());
  if (!hasInputValue) return;

  const text = new Text(textEl);

  uppercaseInput.checked && text.toUpperCase();

  lettersInput.checked && text.toLetters();

  minCharsInput.value && text.toMinLetters(e.target.value);

  searchInput.value && text.search(e.target.value);

  resultEl.innerHTML = text.toString();
};

inputs.forEach((input) => input.addEventListener('input', updateResults));
updateResults();

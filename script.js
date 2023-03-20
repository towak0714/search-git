 // Обьявляем переменные
const form = document.querySelector('.form');
const main = document.querySelector('.main');
const content = document.querySelector('.content');
const input = document.querySelector('.input');
const block = document.querySelector('.block');
const inputError = form.querySelector(`.${input.id}-error`);
const button = form.querySelector('.button');
const noSearch = document.querySelector('.no-search');


// Генерируем карточки
function createCard(item) {
  const cardTemplate = document.querySelector('#search-template').content;
  const cardElement = cardTemplate.querySelector('.search__card').cloneNode(true);
  const searchLink = cardElement.querySelector('.search__link');

  searchLink.href = `https://github.com/${item.full_name}`
  searchLink.textContent = item.name;
  cardElement.querySelector('.description').textContent = item.description;
  cardElement.querySelector('.language').textContent = item.language;


  return block.append(cardElement)
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputValue = input.value;
  const response = await fetch(`https://api.github.com/search/repositories?q=${inputValue}`);

  deleteCards();

  if (response.ok) {
    const data = await response.json();
    form.reset()
    toggleButtonState();
    dataLength = data.items;

    if ((dataLength.length === 0)) {
      noSearch.textContent = 'Ничего не найдено';
    }

    else {
      dataLength.slice(0, 10).forEach(item => createCard(item))
      noSearch.textContent = '';
    }
  }
})


function deleteCards() {
  cards = block.querySelectorAll('.search__card');
  if (cards) {
    cards.forEach(item => item.remove());
  }
}


const showError = (input, errorMessage) => {
  input.classList.add('input_type_error');
  inputError.textContent = errorMessage;
  inputError.classList.add('input_error_active');
};

const hideError = (input) => {
  input.classList.remove('input_type_error');
  inputError.classList.remove('input_error_active');
  inputError.textContent = "";
};

const checkInputValidity = () => {
  if (!input.validity.valid) {
    showError(input, input.validationMessage);
  } else {
    hideError(input);
  }
};

const toggleButtonState = () => {
  if (!input.validity.valid) {
    button.setAttribute('disabled', true);
    button.classList.remove('button_active');
  } else {
    button.removeAttribute('disabled');
    button.classList.add('button_active');
  }
}

input.addEventListener('input', function () {
  checkInputValidity();
  toggleButtonState();
});


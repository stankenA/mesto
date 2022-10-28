let editButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.popup__close');
let popupContainer = document.querySelector('.popup');

let profName = document.querySelector('.profile__name');
let profDescr = document.querySelector('.profile__description');


let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.input_name');
let descrInput = formElement.querySelector('.input_description');
let submitButton = formElement.querySelector('.form__submit');

function popupOpen() {
  popupContainer.classList.add('popup_opened');
  nameInput.value = profName.textContent;
  descrInput.value = profDescr.textContent;
}

function popupClose() {
  popupContainer.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profName.textContent = `${nameInput.value}`;
  profDescr.textContent = `${descrInput.value}`;
  popupClose();
}


editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);

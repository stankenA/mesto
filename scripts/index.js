let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close');
let popupContainer = document.querySelector('.popup');

let profName = document.querySelector('.profile__name');
let profDescr = document.querySelector('.profile__description');


let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_name');
let descrInput = formElement.querySelector('.popup__input_description');
let submitButton = formElement.querySelector('.popup__submit-button');

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

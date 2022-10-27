let editButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.close');
let popupContainer = document.querySelector('.popup');

let profName = document.querySelector('.profile__name');
let profDescr = document.querySelector('.profile__description');


let formElement = document.querySelector('.input-container');
let nameInput = formElement.querySelector('.input_name');
let descrInput = formElement.querySelector('.input_description');
let submitButton = formElement.querySelector('.submit');

function popupToggle() {
  popupContainer.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profName.textContent = `${nameInput.value}`;
  profDescr.textContent = `${descrInput.value}`;
  popupContainer.classList.remove('popup_opened');
}

nameInput.value = profName.textContent;
descrInput.value = profDescr.textContent;


editButton.addEventListener('click', popupToggle);
closeButton.addEventListener('click', popupToggle);
submitButton.addEventListener('click', formSubmitHandler);
formElement.addEventListener('submit', formSubmitHandler);

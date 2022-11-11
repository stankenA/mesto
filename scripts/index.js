let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popupContainer = document.querySelector('.popup');

let profName = document.querySelector('.profile__name');
let profDescr = document.querySelector('.profile__description');


let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let descrInput = formElement.querySelector('.popup__input_type_description');

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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.gallery__grid');

initialCards.forEach(function (item) {
  const cardsElement = cardsTemplate.cloneNode(true);

  cardsElement.querySelector('.gallery__picture').src = item.link;
  cardsElement.querySelector('.gallery__caption').textContent = item.name;

  cardsElement.querySelector('.gallery__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__like-button_active');
  })


  cardsList.prepend(cardsElement);
});

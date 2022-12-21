import Card from './Card.js';
import Validation from './FormValidator.js';

const popupProfileContainer = document.querySelector('.popup_type_profile');
const popupNewPhotoContainer = document.querySelector('.popup_type_new-photo');

const editProfileButton = document.querySelector('.profile__edit-button');

const addPhotoButton = document.querySelector('.profile__add-button');

const closeButtons = document.querySelectorAll('.popup__close-button');

const profName = document.querySelector('.profile__name');
const profDescr = document.querySelector('.profile__description');

const formProfileElement = document.forms['profile-form'];
const formPhotoElement = document.forms['card-form'];
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const descrInput = formProfileElement.querySelector('.popup__input_type_description');

const cardTitle = document.querySelector('.popup__input_type_photo-title');
const cardHref = document.querySelector('.popup__input_type_photo-href');

const cardsList = document.querySelector('.gallery__grid');

const allPopups = document.querySelectorAll('.popup');

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

//Добавление карточек при загрузке страницы

initialCards.forEach((item) => {
  const cardsElement = new Card(item.name, item.link);
  const newCard = cardsElement.createCard();
  cardsList.prepend(newCard);
});

//Закрытие попапа при нажатии на Esc

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
  }
};

//Функции открытия/закрытия попапов

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

export { openPopup, closePopup };

//Закрытие попапов при нажатии на оверлей

allPopups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    evt.target.classList.remove('popup_opened');
  });
});

//Универсальный обработчик крестиков закрытия попапов

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//Функция обработки формы в попапе редактирования профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profName.textContent = `${nameInput.value}`;
  profDescr.textContent = `${descrInput.value}`;
  closePopup(popupProfileContainer);
};

//Функция обработки формы в попапе добавления нового фото

function handlePhotoFormSubmit(evt) {
  evt.preventDefault();

  const cardsElement = new Card(cardTitle.value, cardHref.value);
  const newCard = cardsElement.createCard();
  cardsList.prepend(newCard);

  evt.target.reset();
  closePopup(popupNewPhotoContainer);
};

//Слушатели событий

editProfileButton.addEventListener('click', () => {
  openPopup(popupProfileContainer);
  nameInput.value = profName.textContent;
  descrInput.value = profDescr.textContent;
});

formProfileElement.addEventListener('submit', handleProfileFormSubmit);
addPhotoButton.addEventListener('click', () => openPopup(popupNewPhotoContainer));
formPhotoElement.addEventListener('submit', handlePhotoFormSubmit);

//Валидация форм

const selectorList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const formProfileValidation = new Validation(selectorList, formProfileElement);
formProfileValidation.enableValidation();

const formPhotoValidation = new Validation(selectorList, formPhotoElement);
formPhotoValidation.enableValidation();



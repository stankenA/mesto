import { openPopup, closePopup, closePopupEsc } from './utils.js';
import Card from './Card.js';
import Validation from './FormValidator.js';
import initialCards from './constants.js';

const popupProfileContainer = document.querySelector('.popup_type_profile');
const popupNewPhotoContainer = document.querySelector('.popup_type_new-photo');

const popupProfileOpenBtn = document.querySelector('.profile__edit-button');

const addPhotoButton = document.querySelector('.profile__add-button');

const buttonsPopuClose = document.querySelectorAll('.popup__close-button');

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
const cardTemplate = document.querySelector('#card-template').content.querySelector('.gallery__card');

//Функция создания новой карточки

function createNewCard(name, link, template, list) {
  const cardsElement = new Card(name, link, template);
  const newCard = cardsElement.createCard();
  list.prepend(newCard);
}

//Добавление карточек при загрузке страницы

initialCards.forEach((item) => {
  createNewCard(item.name, item.link, cardTemplate, cardsList);
});

//Закрытие попапов при нажатии на оверлей

allPopups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    closePopup(evt.target);
  });
});

//Универсальный обработчик крестиков закрытия попапов

buttonsPopuClose.forEach((button) => {
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

  createNewCard(cardTitle.value, cardHref.value, cardTemplate, cardsList)

  evt.target.reset();
  const btnSubmit = formPhotoElement.querySelector(selectorList.submitButtonSelector);
  btnSubmit.setAttribute('disabled', '');
  btnSubmit.classList.add(selectorList.inactiveButtonClass);

  closePopup(popupNewPhotoContainer);
};

//Слушатели событий

popupProfileOpenBtn.addEventListener('click', () => {
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



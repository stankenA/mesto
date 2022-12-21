import { openPopup, closePopup } from './utils.js'

const popupFzPhoto = document.querySelector('.popup_type_fz-photo');
const fzPhotoPicture = popupFzPhoto.querySelector('.popup__image');
const fzPhotoCaption = popupFzPhoto.querySelector('.popup__caption');

class Card {
  constructor(name, link, cardTemplate) {
    this._name = name;
    this._link = link;
    this._template = cardTemplate;
  }

  //Клонируем содержимое темплейта с карточкой
  _getTemplate() {
    const cardElement = this._template.cloneNode(true);
    return cardElement;
  }

  //Функция открытия попапа
  _openFzPopup() {
    fzPhotoPicture.src = this._link;
    fzPhotoPicture.alt = this._name;
    fzPhotoCaption.textContent = this._name;
    openPopup(popupFzPhoto);
  }

  //Функция обработки кнопки лайка
  _handleLikeBtn() {
    const likeButton = this._element.querySelector('.gallery__like-button');
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('gallery__like-button_active');
    });
  }

  //Функция удаления карточки
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  //Функция обработки кнопки удаления карточки
  _handleDeleteBtn() {
    const deleteButton = this._element.querySelector('.gallery__delete-button');
    deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });
  }

  //Функция обработки открытия попапа с фото
  _handleFzPhotoOpen() {
    const cardPicture = this._element.querySelector('.gallery__picture');
    cardPicture.addEventListener('click', () => {
      this._openFzPopup();
    });
  }

  //Функция задания слушателей событий
  _setEventListeners() {
    this._handleLikeBtn();
    this._handleDeleteBtn();
    this._handleFzPhotoOpen();
  }

  //Функция наполнения карточки нужными данными
  _setData() {
    const elementPicture = this._element.querySelector('.gallery__picture');
    elementPicture.src = this._link;
    elementPicture.alt = this._name;
    this._element.querySelector('.gallery__caption').textContent = this._name;
  }

  //Функция создания карточки
  createCard() {
    this._element = this._getTemplate();
    this._setData();
    this._setEventListeners();

    return this._element;
  }
}

export default Card;

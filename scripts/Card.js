import { openPopup, closePopup } from './index.js'

const popupFzPhoto = document.querySelector('.popup_type_fz-photo');
const fzPhotoPicture = popupFzPhoto.querySelector('.popup__image');
const fzPhotoCaption = popupFzPhoto.querySelector('.popup__caption');

class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
  }

  //Находим и клонируем содержимое темплейта с карточкой
  _getTemplate() {
    const cardElement = document.querySelector('#card-template').content.querySelector('.gallery__card').cloneNode(true);
    return cardElement;
  }

  //Функция открытия попапа
  _openFzPopup() {
    fzPhotoPicture.src = this._link;
    fzPhotoPicture.alt = this._name;
    fzPhotoCaption.textContent = this._name;
    openPopup(popupFzPhoto);
  }

  //Функция закрытия попапа
  _closeFzPopup() {
    fzPhotoPicture.src = '';
    fzPhotoPicture.alt = '';
    fzPhotoCaption.textContent = '';
    closePopup(popupFzPhoto);
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

  //Функция обработки закрытия попапа с фото
  _handleFzPhotoClose() {
    const fzPopupCloseBtn = popupFzPhoto.querySelector('.popup__close-button');
    fzPopupCloseBtn.addEventListener('click', () => {
      this._closeFzPopup();
    });
  }

  //Функция задания слушателей событий
  _setEventListeners() {
    this._handleLikeBtn();
    this._handleDeleteBtn();
    this._handleFzPhotoOpen();
    this._handleFzPhotoClose();
  }

  //Функция наполнения карточки нужными данными
  _setData() {
    this._element.querySelector('.gallery__picture').src = this._link;
    this._element.querySelector('.gallery__picture').alt = this._name;
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

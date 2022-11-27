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

const photoNameInput = formPhotoElement.querySelector('.popup__input_type_photo-title');
const photoHrefInput = formPhotoElement.querySelector('.popup__input_type_photo-href');

const cardTitle = document.querySelector('.popup__input_type_photo-title');
const cardHref = document.querySelector('.popup__input_type_photo-href');

const cardsTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.gallery__grid');

const popupFzPhoto = document.querySelector('.popup_type_fz-photo');
const fzPhotoPicture = popupFzPhoto.querySelector('.popup__image');
const fzPhotoCaption = popupFzPhoto.querySelector('.popup__caption');

const allPopups = document.querySelectorAll('.popup');

//Функции открытия/закрытия попапов

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

//Закрытие попапа при нажатии на оверлей

allPopups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    evt.target.classList.remove('popup_opened');
  });
});

//Закрытие попапа при нажатии на Esc

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    allPopups.forEach((popup) => {
      closePopup(popup);
    });
  }
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

//Функция создания новой карточки

function createCard(item) {
  const cardsElement = cardsTemplate.cloneNode(true);
  const cardPicture = cardsElement.querySelector('.gallery__picture');
  const cardCaption = cardsElement.querySelector('.gallery__caption');
  const likeButton = cardsElement.querySelector('.gallery__like-button');
  const deleteButton = cardsElement.querySelector('.gallery__delete-button');

  cardPicture.src = item.link;
  cardPicture.alt = item.name;
  cardCaption.textContent = item.name;

  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__like-button_active');
  });

  deleteButton.addEventListener('click', function (evt) {
    evt.target.closest('.gallery__card').remove();
  });

  cardPicture.addEventListener('click', function (evt) {

    openPopup(popupFzPhoto);

    fzPhotoPicture.src = item.link;
    fzPhotoPicture.alt = item.name;
    fzPhotoCaption.textContent = item.name;
  });

  return cardsElement;
};

//Функция обработки формы в попапе добавления нового фото

function handlePhotoFormSubmit(evt) {
  evt.preventDefault();

  const newObject = {
    name: cardTitle.value,
    link: cardHref.value
  };

  const cardsElement = createCard(newObject);
  cardsList.prepend(cardsElement);

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

//Добавление карточек при загрузке страницы

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

initialCards.forEach(function (item) {
  const cardsElement = createCard(item);
  cardsList.prepend(cardsElement);
});

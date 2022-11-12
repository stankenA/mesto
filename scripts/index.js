const popupProfileContainer = document.querySelector('.popup_type_profile');
const popupNewPhotoContainer = document.querySelector('.popup_type_new-photo');

const editProfileButton = document.querySelector('.profile__edit-button');
const closeProfileButton = document.querySelector('.popup__close-button');


const addPhotoButton = document.querySelector('.profile__add-button');
const closePhotoButton = popupNewPhotoContainer.querySelector('.popup__close-button');

const profName = document.querySelector('.profile__name');
const profDescr = document.querySelector('.profile__description');

const formProfileElement = document.querySelector('.popup__form_type_profile');
const formPhotoElement = document.querySelector('.popup__form_type_new-photo');
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const descrInput = formProfileElement.querySelector('.popup__input_type_description');

const photoNameInput = formPhotoElement.querySelector('.popup__input_type_photo-title');
const photoHrefInput = formPhotoElement.querySelector('.popup__input_type_photo-href');

function popupProfileOpen() {
  popupProfileContainer.classList.add('popup_opened');
  nameInput.value = profName.textContent;
  descrInput.value = profDescr.textContent;
}

function popupProfileClose() {
  popupProfileContainer.classList.remove('popup_opened');
}

function formProfileSubmit(evt) {
  evt.preventDefault();

  profName.textContent = `${nameInput.value}`;
  profDescr.textContent = `${descrInput.value}`;
  popupProfileClose();
}

function popupNewPhotoOpen() {
  popupNewPhotoContainer.classList.add('popup_opened');
}

function popupNewPhotoClose() {
  popupNewPhotoContainer.classList.remove('popup_opened');
}

function formPhotoSubmit(evt) {
  evt.preventDefault();

  const cardsElement = cardsTemplate.cloneNode(true);

  const cardTitle = document.querySelector('.popup__input_type_photo-title');
  const cardHref = document.querySelector('.popup__input_type_photo-href');


  cardsElement.querySelector('.gallery__picture').src = cardHref.value;
  cardsElement.querySelector('.gallery__caption').textContent = cardTitle.value;

  cardsElement.querySelector('.gallery__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__like-button_active');
  });

  cardsElement.querySelector('.gallery__delete-button').addEventListener('click', function (evt) {
    evt.target.closest('.gallery__card').remove();
  });

  cardsElement.querySelector('.gallery__picture').addEventListener('click', function (evt) {

    const photoElement = document.querySelector('.popup_type_fz-photo');
    photoElement.classList.add('popup_opened');

    photoElement.querySelector('.popup__image').src = evt.target.src;
    photoElement.querySelector('.popup__caption').textContent = evt.target.parentNode.querySelector('.gallery__caption').textContent;

    const photoCloseButton = photoElement.querySelector('.popup__close-button');
    photoCloseButton.addEventListener('click', function () {
      photoElement.classList.remove('popup_opened');
    })

  })

  cardsList.prepend(cardsElement);

  cardTitle.value = '';
  cardHref.value = '';

  popupNewPhotoClose();
}

editProfileButton.addEventListener('click', popupProfileOpen);
closeProfileButton.addEventListener('click', popupProfileClose);
formProfileElement.addEventListener('submit', formProfileSubmit);

addPhotoButton.addEventListener('click', popupNewPhotoOpen);
closePhotoButton.addEventListener('click', popupNewPhotoClose);
formPhotoElement.addEventListener('submit', formPhotoSubmit);

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
  });

  cardsElement.querySelector('.gallery__delete-button').addEventListener('click', function (evt) {
    evt.target.closest('.gallery__card').remove();
  });

  cardsElement.querySelector('.gallery__picture').addEventListener('click', function () {

    const photoElement = document.querySelector('.popup_type_fz-photo');
    photoElement.classList.add('popup_opened');
    photoElement.querySelector('.popup__image').src = item.link;
    photoElement.querySelector('.popup__caption').textContent = item.name;

    const photoCloseButton = photoElement.querySelector('.popup__close-button');
    photoCloseButton.addEventListener('click', function () {
      photoElement.classList.remove('popup_opened');
    })

  })

  cardsList.prepend(cardsElement);
});



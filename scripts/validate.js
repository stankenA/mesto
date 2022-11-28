//Объект с используемыми классами

const selectorList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

//Показать элемент ошибки

const showInputError = (formElement, inputElement, errorMessage, selectorList) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(selectorList.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectorList.errorClass);
}

//Спрятать элемент ошибки

const hideInputError = (formElement, inputElement, selectorList) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(selectorList.inputErrorClass);
  errorElement.classList.remove(selectorList.errorClass);
  errorElement.textContent = '';
}

//Проверить валидность поля

const isValid = (formElement, inputElement, selectorList) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectorList);
  } else {
    hideInputError(formElement, inputElement, selectorList);
  }
};

//Валидность поля для взаимодействия с состоянием кнопки

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//Включение/отключение кнопки сабмита

const toggleButtonState = (inputList, buttonElement, selectorList) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectorList.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(selectorList.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', '');
  }
};

//Живая проверка инпута на каждый ввод

const setEventListeners = (formElement, selectorList) => {
  const inputList = Array.from(formElement.querySelectorAll(selectorList.inputSelector));
  const buttonElement = formElement.querySelector(selectorList.submitButtonSelector);

  if (buttonElement.closest(selectorList.formSelector).classList.contains('popup__form_type_new-photo')) {
    toggleButtonState(inputList, buttonElement, selectorList);
  }

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, selectorList);

      toggleButtonState(inputList, buttonElement, selectorList);
    });
  });
};

//Находим все формы и вызываем функцию обработки

const enableValidation = (selectorList) => {
  const formList = Array.from(document.querySelectorAll(selectorList.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, selectorList);
  });
};

enableValidation(selectorList);



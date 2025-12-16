import { sendData } from './api.js';
import { closePhotoEditor, uploadForm } from './form.js';
import { pristine } from './hastag-validity.js';
const body = document.querySelector('body');
const formSubmitButton = document.querySelector('.img-upload__submit');
const submitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const disabledButton = (text) => {
  formSubmitButton.disabled = true;
  formSubmitButton.textContent = text;

};

const enabledButton = (text) => {
  formSubmitButton.disabled = false;
  formSubmitButton.textContent = text;

};

const templateSucces = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;

const onNotificationClick = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = existElement.querySelector('button');
  if (evt.target === existElement || evt.target === closeButton) {
    existElement.remove();
    body.removeEventListener('click', onNotificationClick);
  }

};
const onNotificationEsc = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');

  if (evt.key === 'Escape' || evt.key === 'Esc') {
    existElement.remove();
    body.removeEventListener('keydown', onNotificationEsc);
  }
};


const appendNotification = (template, trigger = null) => {
  trigger?.();
  const notificationNode = template.cloneNode(true);
  body.append(notificationNode);
  body.addEventListener('click', onNotificationClick);
  body.addEventListener('keydown', onNotificationEsc);
};
const sendFormData = async (formElement) => {
  const isValid = pristine.validate();
  if (isValid) {
    disabledButton(submitButtonText.SENDING);
    try {
      await sendData(new FormData(formElement));
      appendNotification(templateSucces, () => closePhotoEditor());
    } catch (errors) {
      appendNotification(templateError);
    } finally {
      enabledButton(submitButtonText.IDLE);
    }

  }
};
const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};
uploadForm.addEventListener('submit', onFormSubmit);



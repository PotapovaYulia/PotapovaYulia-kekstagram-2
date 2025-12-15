import { sendData } from './api.js';
import { uploadForm } from './form.js';
import { pristine } from './hastag-validity.js';
const editingForm = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('#upload-file');
const body = document.querySelector('body');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

function closePhotoEditor() {
  editingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  pristine.reset();
}
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
const closeNotification = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = existElement.querySelector('button');
  if (evt.target === existElement || evt.target === closeButton || evt.key === 'Escape' || evt.key === 'Esc') {
    existElement.remove();
    body.removeEventListener('click', closeNotification);
    body.removeEventListener('keydown', closeNotification);
  }
};

const appendNotification = (template, trigger = null) => {
  trigger?.();
  const notificationNode = template.cloneNode(true);
  body.append(notificationNode);
  body.addEventListener('click', closeNotification);
  body.addEventListener('keydown', closeNotification);
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
const formSubmitHandler = (evt) => {
  evt.preventDefault();
  sendFormData(evt.target);
};
uploadForm.addEventListener('submit', formSubmitHandler);

export { closePhotoEditor };

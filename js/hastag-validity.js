const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;
const MAX_COMMENT_SYMBOLS = 140;
const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
let errorMessage = '';

const isError = () => errorMessage;
const isHashtagValid = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();

  if (inputText.length === 0) {
    return true;
  }

  const inputsArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputsArray.some((item) => item === '#'),
      error: 'Хештег не может состоять только из одной решетки',
    },
    {
      check: inputsArray.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами',
    },
    {
      check: inputsArray.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с символа \'#\'',
    },
    {
      check: inputsArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться',
    },
    {
      check: inputsArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длинна одного хештега ${MAX_SYMBOLS} сиволов включая решетку`,
    },
    {
      check: inputsArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хештегов`,
    },
    {
      check: inputsArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хештег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isValid = rule.check;
    if (isValid) {
      errorMessage = rule.error;
    }
    return !isValid;

  });
};
export const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',

});
pristine.addValidator(hashtagInput, isHashtagValid, isError, 2, false);

const commentPristine = new Pristine(commentInput, {
  classTo: 'text__description',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'text__description',
});

commentPristine.addValidator(commentInput, (value) => {
  if (!value) {
    return true;
  }

  return value.length <= MAX_COMMENT_SYMBOLS;
}, 'Длина комментария не должна превышать 140 символов');

export { hashtagInput };

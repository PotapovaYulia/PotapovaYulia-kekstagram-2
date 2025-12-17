export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getUniqueId = (min, max, usedIds) => {
  const id = getRandomInteger(min, max);
  if (usedIds.includes(id)) {
    return getUniqueId(min, max, usedIds);
  }
  usedIds.push(id);
  return id;
};

const errorTemplate = document.querySelector('#data-error');

export const showErrorMessage = (message) => {
  if (!errorTemplate) {
    return;
  }

  const errorArea = errorTemplate.content.querySelector('.data-error').cloneNode(true);

  if (message) {
    const titleEl = errorArea.querySelector('.data-error__title');
    if (titleEl) {
      titleEl.textContent = message;
    }
  }

  body.append(errorArea);

  const errorLoadDataArea = body.querySelector('.data-error');

  setTimeout(() => {
    if (errorLoadDataArea) {
      errorLoadDataArea.remove();
    }
  }, REMOVE_MESSAGE_TIMEOUT);
};
function debounce(callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}


export { debounce };

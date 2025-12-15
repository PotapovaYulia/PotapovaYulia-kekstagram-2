const templateFragment = document.querySelector('#picture').content.querySelector('.picture');

export const container = document.querySelector('.pictures');

export const createThumbnail = (photo) => {
  const thumbnail = templateFragment.cloneNode(true);
  thumbnail.dataset.pictureId = photo.id;

  const image = thumbnail.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  const commentsCount = Array.isArray(photo.comments) ? photo.comments.length : 0;
  thumbnail.querySelector('.picture__comments').textContent = commentsCount;
  return thumbnail;
};
const clearThumbnails = () => {
  container.querySelectorAll('.picture').forEach((item) => item.remove());
};
export const renderThumbnails = (photos) => {
  clearThumbnails();
  const fragment = document.createDocumentFragment();
  photos.forEach((p) => fragment.appendChild(createThumbnail(p)));
  container.appendChild(fragment);
};

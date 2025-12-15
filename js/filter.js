import { renderThumbnails } from './thumbnails';
import { debounce } from './util';
let pictures = [];
const filterElement = document.querySelector('.img-filters');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const FILTER = {
  default: 'filter-default',
  random:'filter-random',
  discussed:'filter-discussed',
};

let currentFilter = FILTER.default;
const debounceRender = debounce(renderThumbnails);
function FilterChange(evt) {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (!targetButton.matches('button')) {
    return;
  }
  if (activeButton === targetButton) {
    return;
  }
  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');
  applyFilter();
}
function applyFilter() {
  let filteredPictures = [];
  if (currentFilter === FILTER.default) {
    filteredPictures = pictures;
  }
  if (currentFilter === FILTER.random) {
    filteredPictures = pictures.toSorted(() => 0.5 - Math.random()).slice(0, 10);
  }
  if (currentFilter === FILTER.discussed) {
    filteredPictures = pictures.toSorted((a, b) => b.comments.length - a.comments.length);

  }
  debounceRender(filteredPictures);
}
function configFilter(picturesData) {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', FilterChange);
  pictures = picturesData;
}
export { configFilter };

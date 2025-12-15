const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];
const bigPicture = document.querySelector('.big-picture');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector('.social__comment');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsShownNode = commentsCount.querySelector('.social__comment-shown-count');
const commentsTotalNode = commentsCount.querySelector('.social__comment-total-count');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
socialComments.innerHTML = '';

const renderNextComments = () => {
  const socialCommentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const renderedCommentsLength = currentCount + renderedComments.length;

  renderedComments.forEach((comment) => {
    const socialComment = socialCommentTemplate.cloneNode(true);

    socialComment.querySelector('.social__picture').src = comment.avatar;
    socialComment.querySelector('.social__picture').alt = comment.name;
    socialComment.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.appendChild(socialComment);
  });

  socialComments.appendChild(socialCommentsFragment);

  if (commentsShownNode) {
    commentsShownNode.textContent = renderedCommentsLength;
  }
  if (commentsTotalNode) {
    commentsTotalNode.textContent = comments.length;
  }

  if (renderedCommentsLength >= comments.length) {
    commentsLoader.classList.add('hidden');
  }

  currentCount += COUNT_STEP;
};

const clearComments = () => {
  currentCount = 0;
  socialComments.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', renderNextComments);
};

const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  commentsLoader.removeEventListener('click', renderNextComments);
  commentsLoader.addEventListener('click', renderNextComments);

  renderNextComments();
};

export { clearComments, renderComments };

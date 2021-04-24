import images from './gallery-items.js';
const list = document.querySelector('ul.gallery.js-gallery');
const closeBtnElem = document.querySelector('.lightbox__button');
const bigImageContent = document.querySelector('.lightbox__image');
const modal = document.querySelector('.js-lightbox');
const overlayElem = document.querySelector('.lightbox__overlay');
let url = '';
const showPic = function (e) {
  e.preventDefault();
  const target = e.target;
  url = target.dataset.source;
  modal.classList.add('is-open');
  bigImageContent.setAttribute('src', url);
}
const closeBtn = function (e) {
  bigImageContent.setAttribute('src', '');
  modal.classList.remove('is-open');
}
const keyPressed = function (e) {
  const key = e.code;
  switch (key) {
    case 'Escape':
      closeBtn();
      break;
    case 'ArrowLeft':
      images.forEach((elem, index, arr) => {
        if (elem.original === url) {
          if (index === 0) {
            index = arr.length;
          }
          url = arr[index - 1].original;
          return
        }
      });
      bigImageContent.setAttribute('src', url);
      break;
    case 'ArrowRight':
      let currentIndex;
      images.forEach((elem, index, arr) => {
        if (elem.original === url) {
          currentIndex = index;
          return
        }
      })
      currentIndex = currentIndex === images.length - 1 ? currentIndex = -1 : currentIndex;
      url = images[currentIndex + 1].original;
      bigImageContent.setAttribute('src', url);
      break;
      return
  }
}
images.forEach(({preview, original, description}) => {
  let insertingString = `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img class="gallery__image" src="${preview}"
            data-source="${original}" alt="${description}" />
        </a>
      </li>`;
  list.insertAdjacentHTML('afterbegin', insertingString);
})
list.addEventListener('click', showPic);
closeBtnElem.addEventListener('click', closeBtn);
overlayElem.addEventListener('click', closeBtn);
window.addEventListener('keydown', keyPressed);
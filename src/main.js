import { fetchImages } from './js/pixabay-api.js';
import { renderHits, galleryClean } from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const input = document.querySelector('.input');
const moreBtn = document.querySelector('.more-btn');
const galleryItem = document.querySelector('.gallery-item');


form.addEventListener('submit', event => {
  event.preventDefault();
  if (input.value.trim() === '') {
    iziToast.warning({
      title: 'Please type what you want to find',
      position: 'topRight',
      timeout: 5000,
    });
    return;
  }

  galleryClean();
  classAdd();
  moreClassRemove();

  fetchImages(input.value)
    .then(images => {
      classRemove();
      if (images.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        moreClassRemove();
        form.reset();
        return;
      }
      renderHits(images);
      moreClassAdd();
    })
    .catch(error => {
      console.log(error);
      classRemove();
      iziToast.error({
        title:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 5000,
      });
    });
  // loader class
  function classAdd() {
    loader.classList.add('active');
  }
  function classRemove() {
    loader.classList.remove('active');
  }
  // more btn class
  function moreClassAdd() {
    moreBtn.classList.add('active');
  }
  function moreClassRemove() {
    moreBtn.classList.remove('active');
  }
});

export let page = 1;
export const per_page = 15;

moreBtn.addEventListener('click', async () => {
  const totalPages = Math.ceil(totalHits / per_page);
  if (page > totalPages) {
    moreClassRemove();
    classRemove();
    iziToast.error({
      title: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      timeout: 5000,
    });
  }

  classRemove();
  moreClassRemove();

  try {
    const images = await fetchImages(input.value);
    renderHits(images);
    page += 1;

    if (page > 1) {
      moreClassAdd();
    }
  } catch (error) {
    console.log(error);
  }
  const elemHeighth = galleryItem.getBoundingClientRect();
  window.scrollBy(0, elemHeighth * 2)
});

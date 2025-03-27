import { fetchImages } from './js/pixabay-api.js';
import { renderHits, galleryClean } from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const input = document.querySelector('.input');
const moreBtn = document.querySelector('.more-btn');
const gallery = document.querySelector('.gallery');

let page = 1;
const perPage = 15;
let totalHits = 0;

// form submit
form.addEventListener('submit', async event => {
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

  page = 1; 

  try {
    const { images, totalHits: fetchedTotalHits } = await fetchImages(input.value, page);
    totalHits = fetchedTotalHits;
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
  } catch (error) {
    console.log(error);
    classRemove();
    iziToast.error({
      title:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
      timeout: 5000,
    });
  }
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

// more BTN
moreBtn.addEventListener('click', async event => {
  event.preventDefault();
  page += 1;
  classAdd();

  try {
    const { images, totalHits: fetchedTotalHits } = await fetchImages(input.value, page);
    totalHits = fetchedTotalHits; 
    const totalPages = Math.ceil(totalHits / perPage);
    classRemove();

    renderHits(images);

    if (page >= totalPages) {
      moreClassRemove();
      classRemove();
      iziToast.error({
        title: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 5000,
      });
    }
    // scroll
    setTimeout(() => {
      const galleryItem = document.querySelector('.gallery-item');
      if (galleryItem) {
        const elemHeight = galleryItem.getBoundingClientRect().height;
        window.scrollBy(0, elemHeight * 2);
      }
    }, 100);
  } catch (error) {
    classRemove();
    moreClassRemove();
    console.log(error);
  }
});
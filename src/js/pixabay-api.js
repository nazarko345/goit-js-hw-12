import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { page, per_page } from '../main.js';

export const fetchImages = async query => {
  try {
    const getResponse = await axios.get(
      `https://pixabay.com/api/?page=${page}&per_page=${per_page}`,
      {
        params: {
          key: '49409853-9b66959f7621caabc2c0e0f94',
          q: query.trim(),
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
        },
      }
    );
    return {
      images: getResponse.data.hits,
      totalHits: getResponse.data.totalHits,
    };
  } catch (error) {
    console.log(error);
    iziToast.error({
      title:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
      timeout: 5000,
    });
    throw error;
  }
};

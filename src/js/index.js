import apiService from './apiService.js';
import imgItemTemplate from '../template/img-items.hbs';
import PNotify from '../../node_modules/pnotify/dist/es/PNotify.js';
import '../../node_modules/pnotify/dist/es/PNotifyStyleMaterial.js';
import '../css/style.css';
import '../../node_modules/material-design-icons';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryList: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('button[data-action="loadmore"]'),
};

refs.searchForm.addEventListener('submit', searchFormSubmitHeandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHeandler);
refs.loadMoreBtn.addEventListener('click', () =>
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  }),
);

function searchFormSubmitHeandler(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const input = form.elements.query;

  clearListItems();

  apiService.resetPage();
  apiService.searchQuery = input.value;

  apiService.fetchImg().then(hits => {
    // const markup = imgItemTemplate(hits);
    // refs.galleryList.insertAdjacentHTML('beforeend', markup);

    if (!hits) {
      refs.galleryList.innerHTML = '';
    } else if (hits <= 0) {
      PNotify.defaults.styling = 'material';
      PNotify.error({
        title: 'Oh No!',
        text: 'Запрос некорректный.Попробуйте еще раз',
      });
    } else {
      const markup = imgItemTemplate(hits);
      refs.galleryList.insertAdjacentHTML('beforeend', markup);
    }
  });

  input.value = '';
}

function loadMoreBtnHeandler() {
  apiService.fetchImg().then(insertListItem);
}

function insertListItem(items) {
  const markup = imgItemTemplate(items);
  refs.galleryList.insertAdjacentHTML('beforeend', markup);
}

function clearListItems() {
  refs.galleryList.innerHTML = '';
}

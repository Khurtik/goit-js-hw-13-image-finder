import apiService from './apiService';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryList: document.querySelector('.gallery'),
};

refs.searchForm.addEventListener('submit', searchFormSubmitHeandler);

function searchFormSubmitHeandler(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.query.value;

  console.log(searchQuery);

  apiService.fetchImg(searchQuery).then(data => console.log(data));
}

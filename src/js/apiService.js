const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const baseUrl = 'https://pixabay.com/api/';
const API_KEY = '14297998-d1283a06c8d7c6782bc49ad77';

export default {
  page: 1,
  query: '',
  fetchImg() {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // authorization: '14297998-d1283a06c8d7c6782bc49ad77',
      },
    };
    const requestParams = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${API_KEY}`;
    return fetch(proxyUrl + baseUrl + requestParams, options)
      .then(response => {
        return response.json();
      })
      .then(parseResponsed => {
        this.incrementPage();
        return parseResponsed.hits;
      })
      .catch(error => {
        console.log(error);
      });
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};

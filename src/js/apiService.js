const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const baseUrl = 'https://pixabay.com/api/';

export default {
  page: 1,
  fetchImg(query) {
    const options = {
      headers: {
        authorization: '14297998-d1283a06c8d7c6782bc49ad77',
      },
    };
    const requestParams = `?image_type=photo&orientation=horizontal&q=${query}&page=${this.page}&per_page=12&key=14297998-d1283a06c8d7c6782bc49ad77`;
    return fetch(proxyUrl + baseUrl + requestParams, options).then(response =>
      response.json(),
    );
  },
};

import axios from 'axios';

const API_KEY =
  'live_8BYxyTJHbFSLtHvZZzKDtoom5iyPRWRxrthff4D5ynGW8xRKmOas3GkZRdFsAyUP';
const BASE_URL = 'https://api.thecatapi.com/v1';

axios.defaults.headers.common['x-api-key'] = API_KEY;

function fetchBreeds() {
  return axios(`${BASE_URL}/breeds`);
}

function fetchCatByBreed(id) {
  return axios(`${BASE_URL}/images/search?breed_ids=${id}`);
}

export { fetchBreeds, fetchCatByBreed };

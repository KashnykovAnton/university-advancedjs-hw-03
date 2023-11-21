import axios from 'axios';
const API_KEY =
  'live_8BYxyTJHbFSLtHvZZzKDtoom5iyPRWRxrthff4D5ynGW8xRKmOas3GkZRdFsAyUP';
const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

function fetchBreeds() {
  axios.defaults.headers.common['x-api-key'] = API_KEY;
  return axios(BASE_URL).then(({ data }) => data);
}

export { fetchBreeds };

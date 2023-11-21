import axios from 'axios';
import iziToast from 'izitoast';

const API_KEY =
  'live_8BYxyTJHbFSLtHvZZzKDtoom5iyPRWRxrthff4D5ynGW8xRKmOas3GkZRdFsAyUP';
const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const SEARCH_URL = 'https://api.thecatapi.com/v1/images/search?breed_ids=';

const refs = {
  select: document.querySelector('.breed-select'),
  div: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
};

// console.log('BEFORE: ', refs.loader);
// refs.loader.classList.add('hide');
// console.dir('AFTER: ', refs.loader.classList);

function fetchBreeds() {
  axios.defaults.headers.common['x-api-key'] = API_KEY;
  return axios(BASE_URL)
    .then(({ data }) => createOptionsMarkup(data))
    .catch(err => showErrorToast(err.message));
}

fetchBreeds();

function createOptionsMarkup(arr) {
  console.log(arr.length);
  arr.map(({ id, name }) => {
    const markup = `<option value=${id}>${name}</option>`;
    refs.select.insertAdjacentHTML('beforeend', markup);
  });
}

refs.select.addEventListener('change', onSelectChange);

function onSelectChange(e) {
  e.preventDefault();
  fetchCatByBreed(e.target.value);
}

function fetchCatByBreed(breedId) {
  refs.loader.style.removeProperty('display');
  axios.defaults.headers.common['x-api-key'] = API_KEY;
  return axios(SEARCH_URL + breedId)
    .then(({ data }) => createCatInfoMarkup(data))
    .catch(err => showErrorToast(err.message));
}

function createCatInfoMarkup(data) {
  console.log(...data);
  const { breeds, url } = data[0];
  const { description, name, temperament } = breeds[0];
  const markup = `<img src=${url} alt=${name}/>
  <div>
    <h2>${name}</h2>
    <p>${description}</p>
    <p><b>Temperament:</b>${temperament}</p>
  </div>`;
  refs.div.innerHTML = markup;
}

function showErrorToast(text) {
  const markup = `<strong>Oops! Something went wrong! Try reloading the page!</strong> </br> ${text}`;
  iziToast.error({
    message: markup,
    position: 'topCenter',
  });
}

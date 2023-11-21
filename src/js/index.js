import iziToast from 'izitoast';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  select: document.querySelector('.breed-select'),
  div: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader-wrapper'),
};

window.addEventListener('load', onWindowLoad);
refs.select.addEventListener('change', onSelectChange);

function onWindowLoad() {
  toggleLoader();
  fetchBreeds()
    .then(({ data }) => {
      createOptionsMarkup(data);
    })
    .catch(err => showErrorToast(err.message))
    .finally(() => {
      toggleLoader();
    });
}

function createOptionsMarkup(arr) {
  refs.select.classList.remove('hide');
  arr.map(({ id, name }) => {
    const markup = `<option value=${id}>${name}</option>`;
    renderMarkup('select', markup);
  });
}

function onSelectChange(e) {
  e.preventDefault();
  refs.div.innerHTML = '';
  toggleLoader();
  fetchCatByBreed(e.target.value)
    .then(({ data }) => createCatInfoMarkup(data))
    .catch(err => showErrorToast(err.message))
    .finally(() => toggleLoader());
}

function createCatInfoMarkup(data) {
  const { breeds, url } = data[0];
  const { description, name, temperament } = breeds[0];
  const markup = `<img src=${url} alt=${name}/>
  <div>
    <h2>${name}</h2>
    <p>${description}</p>
    <p><b>Temperament: </b>${temperament}</p>
  </div>`;
  renderMarkup('div', markup);
}

function showErrorToast(text) {
  const markup = `<strong>Oops! Something went wrong! Try reloading the page!</strong> </br> ${text}`;
  iziToast.error({
    message: markup,
    position: 'topCenter',
  });
}

function toggleLoader() {
  refs.loader.classList.toggle('hide');
}

function renderMarkup(tag, markup) {
  refs[tag].insertAdjacentHTML('beforeend', markup);
}

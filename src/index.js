import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import SlimSelect from 'slim-select';
import './style.css';

const ref = {
  selector: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};
const { selector, catInfo, loader, error } = ref;
const LOADING_DELAY = 1000;

Loading.remove(LOADING_DELAY);
catInfo.style.display = 'none';

let breedsOptions = [];
fetchBreeds()
  .then(data => {
    data.forEach(element => {
      breedsOptions.push({ value: element.id, text: element.name });
    });
    new SlimSelect({
      select: selector,
      data: breedsOptions,
    });
  })
  .catch(onFetchError);

selector.addEventListener('change', selectBreed);

function selectBreed(event) {
  Loading.dots('Loading data, please wait...');
  selector.style.visibility = 'hidden';
  catInfo.style.display = 'none';

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      Loading.remove(LOADING_DELAY);
      selector.style.visibility = 'visible';

      const { url, breeds } = data[0];

      catInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
      catInfo.style.display = 'flex';
    })
    .catch(onFetchError);
}

function onFetchError(error) {
  selector.style.visibility = 'hidden';
  Loading.remove(LOADING_DELAY);
  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!'
  );
  console.error(error);
}

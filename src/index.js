import { FetchBreeds, FetchCatByBreed } from './/js/cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const fetchBreeds = new FetchBreeds();

const selectBreed = document.querySelector('.breed-select');

const containerCatInfo = document.querySelector('.cat-info');
 
const erText = document.querySelector('.error');
erText.hidden = true;

const loader = document.querySelector('.loader');
loader.hidden = true;

const selectCatsName = breedsArr => {
  console.log(breedsArr);
  return breedsArr
    .map(breedsArr => {
      return `<option class='cat-select-js' value = ${breedsArr.id}>${breedsArr.name}</option>`;
    })
    .join('');
};

function renderCat(breedsArr) {
  selectBreed.innerHTML = selectCatsName(breedsArr);
}

selectBreed.style.width = '200px';

fetchBreeds
  .fetchBreedsProm()
  .then(catBreeds => {
    renderCat(catBreeds);
    new SlimSelect({
      select: selectBreed,
      settings: {
        contentPosition: 'absolute',
        placeholderText: 'Custom Placeholder Text',
        showOptionTooltips: true,
        hideSelected: true,
        searchText: 'There is no such breed of cat!',
      },
    });
  })
  .catch(error => {
    Notiflix.Notify.failure(erText.textContent);
  })

  selectBreed.hidden = true;

function catsSelect(data) {
  return `<div><img src= ${data[0].url} alt='#' width=100%/></div><div><h3>${data[0].breeds[0].name}</h3><p>${data[0].breeds[0].description}</p><p>Temperament: ${data[0].breeds[0].temperament}</p></div>`;
}

function markup(cat) {
  const infoBreeds = catsSelect(cat);
  containerCatInfo.insertAdjacentHTML('afterbegin', infoBreeds);
}

function fetsCatInfo(e) {
  containerCatInfo.innerHTML = '';
  const breedId = e.target.value;
  containerCatInfo.hidden = false;
  loader.hidden = false;
  Notiflix.Notify.info(loader.textContent);
  FetchCatByBreed(breedId)
    .then(data => {
      markup(data);
      loader.hidden = true;
      Notiflix.Notify.success(`${data[0].breeds[0].name}`);
    })
    .catch(error => {
      Notiflix.Notify.failure(erText.textContent);
    })
  
}

selectBreed.addEventListener('change', fetsCatInfo);

containerCatInfo.style.display = 'flex';
containerCatInfo.style.gap = '20px';


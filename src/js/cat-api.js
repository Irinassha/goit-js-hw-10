import axios from 'axios';

export class FetchBreeds {
  static BASE_URL = 'https://api.thecatapi.com';

  constructor() { }
  
  fetchBreedsProm = () => {
    return fetch(`${FetchBreeds.BASE_URL}/v1/breeds/`).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  };
}

export function FetchCatByBreed(breedId) {
  axios.defaults.headers.common['x-api-key'] =
    'live_NwZcb4Vvqr9C6l0pKX8qzWhADlJqJqZ2r4tfIWfEP1Qva59EaleclyW8kmuCRw61';

  const BASE_URL = 'https://api.thecatapi.com';
  const END_POINT = '/v1/images/search?';
  const PARANS = `breed_ids=${breedId}`;

  return axios
    .get(`${BASE_URL}${END_POINT}${PARANS}`)
    .then(res => res.data)
    .catch(function (err) {
      console.log(err);
    });
}


const BASE_URL = 'https://api.thecatapi.com/v1';
let END_POINT = 'breeds';
const api_key =
  'live_DFvxZHDW8nmuE7SOyOmzgznwHk0rCbJ6cklKNVGhexuQ80kx7O3cS97qFZiEQyFR';

export function fetchBreeds() {
  return fetch(`${BASE_URL}/${END_POINT}?api_key=${api_key}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  END_POINT = 'images/search';
  return fetch(
    `${BASE_URL}/${END_POINT}?api_key=${api_key}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

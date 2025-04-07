
import { fetchAndDisplayCharacters } from './render.js'

(() => {
  const categories = document.querySelectorAll('input[name="category"]');

  fetchAndDisplayCharacters(document.querySelector('input[name="category"]:checked').dataset.path);

  categories.forEach(category => {
    category.addEventListener('change', () => {
      const selected = document.querySelector('input[name="category"]:checked');
      fetchAndDisplayCharacters(selected.dataset.path);
    });
  });
})()
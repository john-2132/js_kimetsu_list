
import { fetchAndDisplayCharacters } from './render.js'


(async () => {
  const categories = document.querySelectorAll('input[name="category"]');

  if (categories.length === 0) {
    console.error('初期カテゴリーが未選択です。');
    return;
  }

  const getSelectedCategory = () => {
    return document.querySelector('input[name="category"]:checked');
  }

  try {
    await fetchAndDisplayCharacters(getSelectedCategory().dataset.path);
  } catch(error) {
    console.error(error.message);
  }

  categories.forEach(category => {
    category.addEventListener('change', async () => {
      const selected = getSelectedCategory();
      try {
        await fetchAndDisplayCharacters(selected.dataset.path);
      } catch(error) {
        console.error(error.message);
      }
    });
  });
})()
function preloadImages(urls) {
  return Promise.all(urls.map(src => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = `https://ihatov08.github.io${src}`;

      img.decode()
        .then(() => {
          setTimeout(() => resolve(img), 1000);
        })
        .catch(reject);
    })
  }))
}

function renderCharacters(characters, images) {
  const gallery = document.getElementById('gallery');

  let row;
  characters.forEach((chara, i) => {
    const character = document.createElement('div');
    character.classList.add('character', 'col', 'text-center', 'align-content-center');
    if (i % 3 !== 2) {
      character.classList.add('border-end');
    }

    const name = document.createElement('p');
    name.textContent = chara.name;

    const category = document.createElement('p');
    category.textContent = chara.category;
    category.className = 'mt-3';

    if (i % 3 === 0) {
      row = document.createElement('div');
      row.classList.add('row', 'border');
    }

    character.append(name);
    character.append(images[i]);
    character.append(category);
    row.append(character);
    gallery.append(row);
  });

  const remainder = characters.length % 3;
  if (remainder !== 0) {
    for (let i = 0; i < 3 - remainder; i++) {
      const dummy = document.createElement('div');
      dummy.classList.add('character', 'col');
      dummy.style.visibility = 'hidden';
      row.append(dummy);
    }
  }
}

function setLoading(isLoading) {
  const loader = document.getElementById('loader');
  loader.style.display = isLoading ? 'block' : 'none';
}

async function fetchAndDisplayCharacters(path) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  setLoading(true);

  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error('JSON fetch failed');

    const characters = await response.json();
    const imageUrls = characters.map(c => c.image);
    const images = await preloadImages(imageUrls);

    renderCharacters(characters, images);
  } catch(error) {
    console.log(error);
    gallery.innerHTML = '<p class="error">キャラクターの読み込みに失敗しました。</p>';
  } finally {
    setLoading(false);
  }
}

export {fetchAndDisplayCharacters}
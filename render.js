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

  if (!gallery) {
    throw new Error("gallery要素が見つかりません。");
  }

  characters.forEach((chara, i) => {
    const character = document.createElement('div');
    character.classList.add('character', 'text-center', 'align-content-center');

    const name = document.createElement('p');
    name.textContent = chara.name;

    const category = document.createElement('p');
    category.textContent = chara.category;

    character.append(name);
    character.append(images[i]);
    character.append(category);
    gallery.append(character);
  });
}

function setLoading(isLoading) {
  const loader = document.getElementById('loader');
  loader.style.display = isLoading ? 'block' : 'none';
}

let currentRequestId = 0;

async function fetchAndDisplayCharacters(path) {
  const gallery = document.getElementById('gallery');

  if (!gallery) {
    throw new Error("gallery要素が見つかりません。");
  }
  
  gallery.innerHTML = '';
  setLoading(true);

  const requestId = ++currentRequestId;

  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error('JSON fetch failed');

    const characters = await response.json();
    const imageUrls = characters.map(c => c.image);
    const images = await preloadImages(imageUrls);

    if (requestId !== currentRequestId) return;

    renderCharacters(characters, images);
  } catch(error) {
    if (requestId === currentRequestId) {
      gallery.innerHTML = '<p class="alert alert-danger justify-self-center w-50 g-col-3">キャラクターの読み込みに失敗しました。</p>';
      throw new Error("キャラクターの読み込みに失敗しました。" + error.message);
    }
  } finally {
    if (requestId === currentRequestId) {
      setLoading(false);
    }
  }
}

export {fetchAndDisplayCharacters}
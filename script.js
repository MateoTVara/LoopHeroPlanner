// script.js

let selectedImage = Object.keys(imageOptions)[0];

Object.keys(imageOptions).forEach(path => {
  const img = new Image();
  img.onload = () => console.log(`✅ Imagen cargada correctamente: ${path}`);
  img.onerror = () => console.error(`❌ Error al cargar la imagen: ${path}`);
  img.src = path;
});

const container = document.getElementById('grid-container');
for (let i = 0; i < 21 * 12; i++) {
  const tile = document.createElement('div');
  tile.className = 'tile';
  tile.addEventListener('click', () => {
    tile.style.backgroundImage = `url(${selectedImage})`;
    tile.style.backgroundSize = '100% 100%';
    tile.style.backgroundPosition = 'center';
    tile.style.backgroundRepeat = 'no-repeat';
  });
  container.appendChild(tile);
}

function updateQuickMenu() {
  const quickMenuInner = document.querySelector('.quick-menu-inner');
  quickMenuInner.innerHTML = '';
  Object.entries(imageOptions)
    .filter(([_, data]) => data.visible)
    .forEach(([path, data]) => {
      const div = document.createElement('div');
      div.className = 'image-option';
      div.onclick = () => selectImage(path);
      div.title = data.description;
      if (path === selectedImage) div.setAttribute('data-selected', '');
      div.innerHTML = `<img src="${path}" alt="${data.description}">`;
      quickMenuInner.appendChild(div);
    });
}

function selectImage(path) {
  selectedImage = path;
  updateQuickMenu();
}

function updateImageSettings() {
  const settings = document.getElementById('imageSettings');
  settings.innerHTML = Object.entries(imageOptions)
    .map(([path, data]) => `
      <label style="display:flex; align-items:center; margin:5px 0;">
        <input type="checkbox"
               ${data.visible ? 'checked' : ''}
               onchange="toggleImageVisibility('${path}')">
        <img src="${path}" 
             style="width:32px; height:32px; margin-left:8px"
             alt="${data.description}">
        <span style="margin-left:8px;">${data.description}</span>
      </label>
    `).join('');
}

function toggleImageVisibility(path) {
  imageOptions[path].visible = !imageOptions[path].visible;
  updateQuickMenu();
}

function toggleMenu() {
  const menu = document.getElementById('overlayMenu');
  const opening = menu.style.display !== 'block';
  menu.style.display = opening ? 'block' : 'none';
  if (opening) updateImageSettings();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') toggleMenu();
});

updateQuickMenu();

function updateQuickMenuArrows() {
  const quickMenuInner = document.querySelector('.quick-menu-inner');
  const leftArrow = document.getElementById('quickMenuArrowLeft');
  const rightArrow = document.getElementById('quickMenuArrowRight');
  if (quickMenuInner.scrollLeft > 2) {
    leftArrow.style.opacity = 1;
    leftArrow.style.pointerEvents = 'auto';
  } else {
    leftArrow.style.opacity = 0;
    leftArrow.style.pointerEvents = 'none';
  }
  if (quickMenuInner.scrollWidth - quickMenuInner.clientWidth - quickMenuInner.scrollLeft > 2) {
    rightArrow.style.opacity = 1;
    rightArrow.style.pointerEvents = 'auto';
  } else {
    rightArrow.style.opacity = 0;
    rightArrow.style.pointerEvents = 'none';
  }
}

document.getElementById('quickMenuArrowLeft').onclick = () => {
  const quickMenuInner = document.querySelector('.quick-menu-inner');
  quickMenuInner.scrollBy({ left: -120, behavior: 'smooth' });
};
document.getElementById('quickMenuArrowRight').onclick = () => {
  const quickMenuInner = document.querySelector('.quick-menu-inner');
  quickMenuInner.scrollBy({ left: 120, behavior: 'smooth' });
};

document.querySelector('.quick-menu-inner').addEventListener('scroll', updateQuickMenuArrows);

const originalUpdateQuickMenu = updateQuickMenu;
updateQuickMenu = function() {
  originalUpdateQuickMenu();
  setTimeout(updateQuickMenuArrows, 10);
};

window.addEventListener('DOMContentLoaded', updateQuickMenuArrows);

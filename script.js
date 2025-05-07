// script.js

// 1) Define your fixed set of image options and whether each is visible
//    (add more entries here as you add more files to /imgs)

let selectedImage = Object.keys(imageOptions)[0];

Object.keys(imageOptions).forEach(path => {
  const img = new Image();
  img.onload = () => console.log(`✅ Imagen cargada correctamente: ${path}`);
  img.onerror = () => console.error(`❌ Error al cargar la imagen: ${path}`);
  img.src = path;
});  // start with the first key
  
  // 2) Build the tile grid
  const container = document.getElementById('grid-container');
  for (let i = 0; i < 21 * 12; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.addEventListener('click', () => {
      tile.style.backgroundImage = `url(${selectedImage})`;
      tile.style.backgroundSize = '100% 100%'; // <-- Ensures full tile coverage
      tile.style.backgroundPosition = 'center';
      tile.style.backgroundRepeat = 'no-repeat';
    });
    container.appendChild(tile);
  }
  
  // 3) Update the quick-select menu based on which images are visible
  function updateQuickMenu() {
    const quickMenu = document.querySelector('.quick-menu');
    quickMenu.innerHTML = Object.entries(imageOptions)
      .filter(([_, data]) => data.visible)
      .map(([path, data]) => `
        <div class="image-option"
             onclick="selectImage('${path}')"
             title="${data.description}"
             ${path === selectedImage ? 'data-selected' : ''}>
          <img src="${path}" alt="${data.description}">
        </div>
      `).join('');
  }
  
  function selectImage(path) {
    selectedImage = path;
    updateQuickMenu();
  }
  
  // 4) Build the overlay menu’s checkbox list for toggling visibility
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
  
  // 5) Show/hide the overlay menu
  function toggleMenu() {
    const menu = document.getElementById('overlayMenu');
    const opening = menu.style.display !== 'block';
    menu.style.display = opening ? 'block' : 'none';
    if (opening) updateImageSettings();
  }
  
  // 6) ESC key toggles menu
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu();
  });
  
  // initial render
  updateQuickMenu();
  
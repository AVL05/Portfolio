/**
 * Inicializa la galería en una página específica.
 * @param {string} galleryId - ID del contenedor de la galería.
 * @param {string} category - Categoría de las fotos a mostrar.
 */
function initGallery(galleryId, category) {
    const gallery = document.getElementById(`${galleryId}-gallery`);
    if (!gallery) {
        console.error(`No se encontró el contenedor con ID: ${galleryId}-gallery`);
        return;
    }

    const filteredPhotos = window.fotosData.filter(photo => photo.category === category);

    if (filteredPhotos.length === 0) {
        gallery.innerHTML = '<p class="no-photos">No hay fotos en esta categoría</p>';
        return;
    }

    gallery.innerHTML = filteredPhotos.map(photo => `
        <div class="gallery-item" data-category="${photo.category}">
            <img src="${photo.src}" alt="${photo.title}" loading="lazy">
            <div class="photo-info">
                <h3>${photo.title}</h3>
            </div>
        </div>
    `).join('');

    // Inicializar lightbox
    initLightbox();
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const closeBtn = document.querySelector('.lightbox .close');

    // Abrir el lightbox al hacer clic en una imagen
    document.querySelectorAll('.gallery-item img').forEach(image => {
        image.addEventListener('click', () => {
            lightboxImage.src = image.src;
            lightbox.classList.remove('hidden');
        });
    });

    // Cerrar el lightbox al hacer clic en el botón de cerrar
    closeBtn.addEventListener('click', () => {
        lightbox.classList.add('hidden');
        lightboxImage.src = '';
    });

    // Cerrar el lightbox al hacer clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('hidden');
            lightboxImage.src = '';
        }
    });
}

// ... resto de las funciones permanecen igual ...

// Hacer las funciones disponibles globalmente
window.initGallery = initGallery;
window.initFilters = initFilters;
window.initLazyLoading = initLazyLoading;
window.initLightbox = initLightbox;
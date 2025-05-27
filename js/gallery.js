// Photo data structure
window.fotosData = [
    // Naturaleza
    {
        src: "img/naturaleza/foto1.jpg",
        title: "Amanecer en la Montaña",
        description: "Montaña nublada",
        category: "naturaleza",
        subcategory: "paisajes",
        location: "Vall de Boí, Lleida",
        camera: "Nikon D5600",
        featured: true
    },
    {
        src: "img/naturaleza/foto2.jpg",
        title: "Descenso del Río Sella",
        description: "Descenso en kayak por el río Sella",
        category: "naturaleza",
        subcategory: "flora",
        location: "Rio Sella, Asturias",
        camera: "GoPro Hero 12",
    },
    {
        src: "img/naturaleza/foto3.jpg",
        title: "Cola de Caballo",
        description: "Una cascada impresionante",
        category: "naturaleza",
        subcategory: "paisajes",
        location: "Ordesa",
        camera: "Nikon D5600",
    },
    {
        src: "img/naturaleza/foto4.jpg",
        title: "Caballos",
        description: "Animales majestuosos",
        category: "naturaleza",
        subcategory: "fauna",
        location: "Picos de Europa",
        camera: "Nikon D5600",
        featured: true
    },
    {
        src: 'img/naturaleza/foto5.jpg',
        title: 'Pájaro',
        description: "Ave en un tronco",
        category: "naturaleza",
        subcategory: "fauna",
        location: "Picos de Europa",
        camera: "Nikon D5600",
    },
    {
        src: 'img/naturaleza/foto7.jpg',
        title: 'Picos de Europa',
        description: "Montañas nubladas",
        category: "naturaleza",
        subcategory: "paisajes",
        location: "Picos de europa",
        camera: "Nikon D5600",
    },
    {
        src: 'img/naturaleza/foto8.jpg',
        title: 'Puesta de sol Picos de Europa',
        description: "",
        category: "naturaleza",
        subcategory: "paisajes",
        location: "Montanejos",
        camera: "Nikon D5600",
    },
    {
        src: 'img/naturaleza/foto9.jpg',
        title: 'Picos de Europa',
        description: "",
        category: "naturaleza",
        subcategory: "paisajes",
        location: "Montanejos",
        camera: "Nikon D5600",
    },
    {
        src: 'img/naturaleza/foto10.jpg',
        title: 'Puesta de sol Picos de Europa',
        description: "Atardecer sobre las montañas",
        category: "naturaleza",
        subcategory: "paisajes",
        location: "Montanejos",
        camera: "Nikon D5600",
    },
    {
        src: 'img/naturaleza/foto11.jpg',
        title: 'Rosa',
        description: "Detalle de una flor silvestre",
        category: "naturaleza",
        subcategory: "flora",
        location: "Montanejos",
        camera: "Nikon D5600",
    },

    // Retratos
    {
        src: "img/retratos/foto1.jpg",
        title: "Retorn de la Verge",
        description: "Retrato en luz natural",
        category: "retratos",
        subcategory: "retratos",
        location: "Valencia",
        camera: "Nikon D5600",
        featured: true
    },
    {
        src: "img/retratos/foto2.jpg",
        title: "Poema a la Virgen",
        description: "",
        category: "retratos",
        subcategory: "grupos",
        location: "A.C. Falla el Moli",
        camera: "Nikon D5600",
    },

    // Urbano
    {
        src: "img/urbano/foto2.jpg",
        title: "Arquitectura Antigua",
        description: "Líneas y formas de la arquitectura antigua",
        category: "urbano",
        subcategory: "arquitectura",
        location: "Picos de europa",
        camera: "Nikon D5600"
    },
    {
        src: "img/urbano/foto3.jpg",
        title: "Metro Oporto",
        description: "Tren pasando",
        category: "urbano",
        subcategory: "calles",
        location: "Puente Don Luis I",
        camera: "Nikon D5600",
    },
        {
        src: "img/urbano/foto7.jpg",
        title: "Luces de navidad",
        description: "Luces de navidad",
        category: "urbano",
        subcategory: "arquitectura",
        location: "",
        camera: "Nikon D5600",
        featured: true
    },
        {
        src: "img/urbano/foto8.jpg",
        title: "Catedral de Oporto",
        description: "",
        category: "urbano",
        subcategory: "arquitectura",
        location: "Jardín del Turia",
        camera: "Nikon D5600",
        featured: true
    },
        {
        src: "img/urbano/foto9.jpg",
        title: "Atardecer",
        description: "Atardecer en Oporto",
        category: "urbano",
        subcategory: "arquitectura",
        location: "Oporto",
        camera: "Nikon D5600",
        featured: true
    },
        {
        src: "img/urbano/foto10.jpg",
        title: "Atardecer",
        description: "Atardecer Portugal",
        category: "urbano",
        subcategory: "arquitectura",
        location: "Jardín del Turia",
        camera: "Nikon D5600",
        featured: true
    },
        {
        src: "img/urbano/foto11.jpg",
        title: "Señal de Camino de Santiago",
        description: "Camino de Santiago",
        category: "urbano",
        subcategory: "arquitectura",
        location: "Oporto",
        camera: "Nikon D5600",
    },
];

/**
 * Inicializa la galería en una página específica.
 * @param {string} galleryId - ID del contenedor de la galería.
 * @param {Array} photos - Array de fotos a mostrar.
 */
function initGallery(galleryId, photos) {
    const gallery = document.getElementById(`${galleryId}-gallery`);
    if (!gallery) {
        console.error(`No se encontró el contenedor con ID: ${galleryId}-gallery`);
        return;
    }

    const filteredPhotos = photos || [];

    if (filteredPhotos.length === 0) {
        gallery.innerHTML = '<p class="no-photos">No hay fotos en esta categoría</p>';
        return;
    }

    // Renderizar galería
    renderGallery(gallery, filteredPhotos);
    
    // Inicializar componentes
    initLightbox();
    initFilters();
    
    // Poblar sección destacada
    populateFeaturedPhotos(filteredPhotos);
    
    // Actualizar estadísticas
    updateStatistics(filteredPhotos[0].category, filteredPhotos);
}

/**
 * Renderiza los elementos de la galería
 * @param {HTMLElement} gallery - Contenedor de la galería
 * @param {Array} photos - Array de fotos a mostrar
 */
function renderGallery(gallery, photos) {
    gallery.innerHTML = photos.map(photo => `
        <div class="gallery-item" data-category="${photo.subcategory}">
            <img src="${photo.src}" alt="${photo.title}" loading="lazy">
            <div class="photo-info">
                <h3>${photo.title}</h3>
                <p>${photo.description}</p>
                <div class="photo-meta">
                    ${photo.location ? `<span><i class="fas fa-map-marker-alt"></i> ${photo.location}</span>` : ""}
                    ${photo.camera ? `<span><i class="fas fa-camera"></i> ${photo.camera}</span>` : ""}
                    ${photo.date ? `<span><i class="fas fa-calendar"></i> ${formatDate(photo.date)}</span>` : ""}
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Inicializa el sistema de filtros
 */
function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Actualizar estado activo
            document.querySelectorAll('.filter-btn').forEach(btn => 
                btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar galería
            filterGallery(filter);
        });
    });
}

/**
 * Filtra los elementos de la galería
 * @param {string} filter - Filtro a aplicar (subcategoría)
 */
function filterGallery(filter) {
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = '';
            item.classList.add('fade-in');
        } else {
            item.style.display = 'none';
            item.classList.remove('fade-in');
        }
    });
}

/**
 * Inicializa el lightbox
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox .close');

    // Configurar eventos de clic en imágenes
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const photo = window.fotosData.find(p => p.src === img.src);
            if (photo) {
                openLightbox(photo);
            }
        });
    });

    // Cerrar lightbox
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeLightbox();
    });
}

/**
 * Abre el lightbox con la foto seleccionada
 * @param {Object} photo - Objeto con los datos de la foto
 */
function openLightbox(photo) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    const image = lightbox.querySelector('.lightbox-image');
    const title = lightbox.querySelector('.photo-title');
    const description = lightbox.querySelector('.photo-description');
    const location = lightbox.querySelector('.location span');
    const camera = lightbox.querySelector('.camera span');
    const date = lightbox.querySelector('.date span');

    if (image) image.src = photo.src;
    if (image) image.alt = photo.title;
    if (title) title.textContent = photo.title;
    if (description) description.textContent = photo.description;
    if (location) location.textContent = photo.location || "";
    if (camera) camera.textContent = photo.camera || "";
    if (date) date.textContent = formatDate(photo.date);

    lightbox.classList.remove('hidden');
}

/**
 * Cierra el lightbox
 */
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.add('hidden');
    }
}

/**
 * Formatea una fecha en formato legible
 * @param {string} dateStr - Fecha en formato ISO
 * @returns {string} - Fecha formateada
 */
function formatDate(dateStr) {
    if (!dateStr) return "";
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    } catch (e) {
        return dateStr;
    }
}

/**
 * Actualiza las estadísticas de la página
 * @param {string} category - Categoría de las fotos
 * @param {Array} photos - Array de fotos
 */
function updateStatistics(category, photos) {
    const photoCount = document.getElementById('photo-count');
    const locationCount = document.getElementById(category === 'retratos' ? 'subject-count' : 'location-count');
    
    if (photoCount) photoCount.textContent = photos.length;
    if (locationCount) {
        const uniqueLocations = new Set(photos.map(photo => photo.location));
        locationCount.textContent = uniqueLocations.size;
    }
}

/**
 * Popula la sección de fotos destacadas
 * @param {Array} photos - Array de fotos
 */
function populateFeaturedPhotos(photos) {
    const featuredGrid = document.querySelector('.featured-grid');
    if (!featuredGrid) return;

    // Obtener hasta 4 fotos destacadas
    let featuredPhotos = photos.filter(photo => photo.featured).slice(0, 4);
    
    // Si no hay suficientes destacadas, usar las primeras
    if (featuredPhotos.length < 4) {
        const nonFeatured = photos.filter(photo => !photo.featured);
        featuredPhotos = [...featuredPhotos, ...nonFeatured.slice(0, 4 - featuredPhotos.length)];
    }
    
    // Generar HTML
    featuredGrid.innerHTML = featuredPhotos.map(photo => `
        <div class="gallery-item">
            <img src="${photo.src}" alt="${photo.title}" loading="lazy">
            <div class="photo-info">
                <h3>${photo.title}</h3>
                <p>${photo.description}</p>
                <div class="photo-meta">
                    ${photo.location ? `<span><i class="fas fa-map-marker-alt"></i> ${photo.location}</span>` : ""}
                    ${photo.camera ? `<span><i class="fas fa-camera"></i> ${photo.camera}</span>` : ""}
                    ${photo.date ? `<span><i class="fas fa-calendar"></i> ${formatDate(photo.date)}</span>` : ""}
                </div>
            </div>
        </div>
    `).join('');
    
    // Añadir eventos de lightbox
    featuredGrid.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const photo = window.fotosData.find(p => p.src === img.src);
            if (photo) {
                openLightbox(photo);
            }
        });
    });
}

/**
 * Obtiene las ubicaciones únicas para estadísticas
 * @param {Array} photos - Array de fotos
 * @returns {Array} - Array de ubicaciones únicas
 */
function getUniqueLocations(photos) {
    return [...new Set(photos.map(photo => photo.location))];
}

// Añadir animación de fade-in
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeIn 0.5s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    // Inicializar lazy loading para imágenes
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Exportar funciones para uso en HTML
window.initGallery = initGallery;
window.filterGallery = filterGallery;
window.getUniqueLocations = getUniqueLocations;
window.populateFeaturedPhotos = populateFeaturedPhotos;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

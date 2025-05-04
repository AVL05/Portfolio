/**
 * GALLERY.JS - Sistema de galería fotográfica
 * 
 * Funcionalidades:
 * - Inicialización de galerías por categoría
 * - Filtrado por tags
 * - Lazy loading de imágenes
 * - Placeholder mientras cargan
 * - Integración con fotos.js
 */

// Configuración global de la galería
const galleryConfig = {
    placeholderImage: '../assets/img/placeholder.webp',
    animationDuration: 300,
    breakpoints: {
        mobile: 576,
        tablet: 768,
        desktop: 992
    }
};

/**
 * Inicializa una galería específica
 * @param {string} galleryId - ID de la galería (sin el sufijo -gallery)
 * @param {string} category - Categoría de fotos a mostrar
 */
function initGallery(galleryId, category) {
    const galleryElement = document.getElementById(`${galleryId}-gallery`);
    
    // Validar que exista el elemento y los datos
    if (!galleryElement) {
        console.error(`Elemento #${galleryId}-gallery no encontrado`);
        return;
    }
    
    if (!window.fotosData || !Array.isArray(window.fotosData)) {
        console.error('Datos de fotos no cargados correctamente');
        galleryElement.innerHTML = '<p class="no-photos">Error al cargar las fotos</p>';
        return;
    }
    
    // Filtrar fotos por categoría
    const filteredPhotos = window.fotosData.filter(photo => {
        return photo.category === category;
    });
    
    // Mostrar mensaje si no hay fotos
    if (filteredPhotos.length === 0) {
        galleryElement.innerHTML = `
            <div class="no-photos-message">
                <i class="fas fa-camera"></i>
                <p>No hay fotos disponibles en esta categoría</p>
            </div>
        `;
        return;
    }
    
    // Generar HTML de la galería
    galleryElement.innerHTML = filteredPhotos.map(photo => `
        <div class="gallery-item" 
             data-tags="${photo.tags || ''}" 
             data-date="${photo.date || ''}"
             data-title="${photo.title.toLowerCase()}">
            <div class="gallery-image-container">
                <img src="${galleryConfig.placeholderImage}" 
                     data-src="../${photo.src}" 
                     alt="${photo.title || 'Foto sin título'}"
                     class="gallery-image"
                     loading="lazy">
                <div class="image-overlay"></div>
            </div>
            <div class="photo-info">
                ${photo.title ? `<h3 class="photo-title">${photo.title}</h3>` : ''}
                ${photo.location ? `<p class="photo-location"><i class="fas fa-map-marker-alt"></i> ${photo.location}</p>` : ''}
                ${photo.date ? `<p class="photo-date"><i class="far fa-calendar-alt"></i> ${formatDate(photo.date)}</p>` : ''}
            </div>
        </div>
    `).join('');
    
    // Inicializar funcionalidades
    initFilters(galleryElement);
    initLazyLoading();
    setupGalleryHoverEffects();
    setupLightbox();
}

/**
 * Inicializa los filtros de la galería
 * @param {HTMLElement} galleryElement - Elemento contenedor de la galería
 */
function initFilters(galleryElement) {
    const filterContainer = galleryElement.closest('.gallery-section')?.querySelector('.gallery-filter');
    
    if (!filterContainer) return;
    
    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    const searchInput = filterContainer.querySelector('.gallery-search');
    
    // Filtrar al hacer clic en botones
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Obtener valor del filtro
            const filterValue = this.dataset.filter;
            filterGalleryItems(galleryElement, filterValue);
        });
    });
    
    // Buscar por texto (si hay input de búsqueda)
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterGalleryItems(galleryElement, 'all', searchTerm);
        });
    }
}

/**
 * Filtra los elementos de la galería
 * @param {HTMLElement} galleryElement - Elemento contenedor
 * @param {string} filterValue - Valor del filtro (tag)
 * @param {string} searchTerm - Término de búsqueda
 */
function filterGalleryItems(galleryElement, filterValue = 'all', searchTerm = '') {
    const items = galleryElement.querySelectorAll('.gallery-item');
    let visibleCount = 0;
    
    items.forEach(item => {
        const matchesFilter = filterValue === 'all' || 
                            item.dataset.tags.includes(filterValue) || 
                            item.dataset.date.includes(filterValue);
        
        const matchesSearch = searchTerm === '' || 
                            item.dataset.title.includes(searchTerm);
        
        if (matchesFilter && matchesSearch) {
            item.style.display = 'block';
            visibleCount++;
            
            // Animación de aparición
            item.style.opacity = 0;
            setTimeout(() => {
                item.style.transition = `opacity ${galleryConfig.animationDuration}ms ease`;
                item.style.opacity = 1;
            }, 10);
        } else {
            item.style.display = 'none';
        }
    });
    
    // Mostrar mensaje si no hay resultados
    const noResultsMsg = galleryElement.querySelector('.no-results-message');
    if (visibleCount === 0) {
        if (!noResultsMsg) {
            galleryElement.insertAdjacentHTML('beforeend', `
                <div class="no-results-message">
                    <i class="fas fa-search"></i>
                    <p>No se encontraron fotos con estos criterios</p>
                </div>
            `);
        }
    } else if (noResultsMsg) {
        noResultsMsg.remove();
    }
}

/**
 * Configura el lazy loading para imágenes
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.gallery-image[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores sin IntersectionObserver
        lazyImages.forEach(loadImage);
    }
}

/**
 * Carga una imagen individual
 * @param {HTMLImageElement} img - Elemento imagen a cargar
 */
function loadImage(img) {
    const src = img.getAttribute('data-src');
    
    if (!src) return;
    
    const tempImg = new Image();
    tempImg.src = src;
    
    tempImg.onload = () => {
        img.src = src;
        img.removeAttribute('data-src');
        img.parentElement.classList.add('loaded');
        
        // Forzar repaint para la animación
        void img.offsetWidth;
        img.style.opacity = 1;
    };
    
    tempImg.onerror = () => {
        console.error(`Error al cargar la imagen: ${src}`);
        img.parentElement.classList.add('error');
    };
}

/**
 * Configura efectos hover para los items de la galería
 */
function setupGalleryHoverEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const imgContainer = item.querySelector('.gallery-image-container');
        const info = item.querySelector('.photo-info');
        
        if (!imgContainer || !info) return;
        
        item.addEventListener('mouseenter', () => {
            gsap.to(imgContainer.querySelector('.image-overlay'), {
                opacity: 0.7,
                duration: 0.3
            });
            
            gsap.to(info, {
                y: 0,
                opacity: 1,
                duration: 0.3
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(imgContainer.querySelector('.image-overlay'), {
                opacity: 0,
                duration: 0.3
            });
            
            gsap.to(info, {
                y: '100%',
                opacity: 0,
                duration: 0.3
            });
        });
    });
}

/**
 * Configura el lightbox para la galería
 */
function setupLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    function openLightbox(index) {
        // Implementación del lightbox aquí
        console.log('Abrir lightbox con imagen índice:', index);
        // (Puedes usar la implementación de lightbox del script.js unificado)
    }
}

/**
 * Formatea una fecha para mostrarla
 * @param {string} dateString - Fecha en formato string
 * @returns {string} Fecha formateada
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Exportar funciones para uso global (si es necesario)
if (typeof window !== 'undefined') {
    window.initGallery = initGallery;
    window.initFilters = initFilters;
    window.initLazyLoading = initLazyLoading;
}
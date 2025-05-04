/**
 * PORTFOLIO UNIFICADO - Alex Vicente López
 * Combina funcionalidades del portfolio personal y fotográfico
 * 
 * Funcionalidades principales:
 * - Preloader combinado
 * - Navegación responsive unificada
 * - Scroll suave
 * - Gestión de menú activo
 * - Animaciones con GSAP
 * - Inicialización de galerías
 * - Lazy loading de imágenes
 * - Filtros de galería
 * - Actualización automática del año
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // PRELOADER COMBINADO
    // =============================================
    const preloaderElements = [
        document.querySelector('.preloader'),
        document.querySelector('.loader')
    ].filter(el => el !== null);

    const hidePreloader = () => {
        preloaderElements.forEach(el => {
            el.style.opacity = '0';
            setTimeout(() => {
                el.style.display = 'none';
            }, 500);
        });
    };

    // Ocultar preloader cuando todo esté cargado
    window.addEventListener('load', () => {
        setTimeout(hidePreloader, 800);
    });

    // =============================================
    // NAVEGACIÓN UNIFICADA
    // =============================================
    const navbar = document.querySelector('.navbar') || document.querySelector('.main-header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links') || document.querySelector('.main-nav ul');
    const allNavLinks = document.querySelectorAll('.nav-link, .main-nav a');

    // Efecto scroll en navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Menú hamburguesa
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Bloquear scroll cuando el menú está abierto
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Cerrar menú al hacer clic en un enlace
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Comportamiento especial para enlaces con submenú
            if (this.classList.contains('has-submenu')) {
                e.preventDefault();
                const submenu = this.nextElementSibling;
                submenu.classList.toggle('active');
                return;
            }

            // Cerrar menú móvil si está abierto
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }

            // Scroll suave para enlaces internos
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - navbar.offsetHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mostrar/ocultar submenú en dispositivos móviles
    document.querySelectorAll('.nav-item.has-submenu > a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const submenu = this.nextElementSibling;
            submenu.classList.toggle('active');
        });
    });

    // =============================================
    // GESTIÓN DE PÁGINA ACTIVA
    // =============================================
    function setActivePage() {
        const currentPage = location.pathname.split('/').pop() || 'index.html';
        
        allNavLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (currentPage === linkPage || 
                (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    setActivePage();

    // =============================================
    // ANIMACIONES CON GSAP
    // =============================================
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animaciones del hero
        const heroAnimations = () => {
            gsap.from('.hero-title .title-line', {
                duration: 1,
                y: 50,
                opacity: 0,
                stagger: 0.2,
                ease: 'power3.out'
            });
            
            gsap.from('.hero-subtitle', {
                duration: 1,
                y: 30,
                opacity: 0,
                delay: 0.6,
                ease: 'power3.out'
            });
            
            gsap.from('.hero-cta', {
                duration: 1,
                y: 30,
                opacity: 0,
                delay: 0.8,
                ease: 'power3.out'
            });
            
            gsap.from('.hero-social', {
                duration: 1,
                y: 30,
                opacity: 0,
                delay: 1,
                ease: 'power3.out'
            });
            
            gsap.from('.image-wrapper', {
                duration: 1,
                x: 50,
                opacity: 0,
                delay: 0.4,
                ease: 'power3.out'
            });
        };

        // Animaciones al hacer scroll
        const scrollAnimations = () => {
            const animateElements = gsap.utils.toArray('[data-animate]');
            
            animateElements.forEach(element => {
                gsap.from(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                });
            });
        };

        // Inicializar animaciones
        if (document.querySelector('.hero')) {
            heroAnimations();
        }
        scrollAnimations();
    }

    // =============================================
    // FUNCIONALIDADES DE GALERÍA FOTOGRÁFICA
    // =============================================
    // Inicializar lazy loading
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.onload = () => {
                            img.removeAttribute('data-src');
                            img.parentElement.classList.add('loaded');
                        };
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '200px 0px',
                threshold: 0.01
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback para navegadores sin soporte
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    // Inicializar filtros de galería
    function initFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Actualizar botones activos
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filtrar elementos
                const filterValue = this.dataset.filter;
                const galleryItems = document.querySelectorAll('.gallery-item');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.dataset.tags.includes(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Inicializar galerías si existen en la página
    if (document.querySelector('.gallery')) {
        initLazyLoading();
        initFilters();
    }

    // =============================================
    // FUNCIONALIDADES GENERALES
    // =============================================
    // Actualizar año en el footer
    const yearElements = document.querySelectorAll('#year, #current-year');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // Tooltips básicos
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
    });

    function showTooltip(e) {
        const tooltipText = this.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
    }

    function hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // =============================================
    // INICIALIZACIÓN DE COMPONENTES ESPECÍFICOS
    // =============================================
    // Inicializar lightbox si existe
    if (document.querySelector('[data-lightbox]')) {
        initLightbox();
    }

    // Inicializar carruseles si existen
    if (document.querySelector('.carousel')) {
        initCarousels();
    }
});

// =============================================
// FUNCIONES DE GALERÍA (llamadas desde HTML)
// =============================================
function initGallery(galleryId, category) {
    const gallery = document.getElementById(`${galleryId}-gallery`);
    
    if (!gallery || !window.fotosData) return;
    
    // Filtrar fotos por categoría
    const filteredPhotos = window.fotosData.filter(photo => photo.category === category);
    
    if (filteredPhotos.length === 0) {
        gallery.innerHTML = '<p class="no-photos">No hay fotos en esta categoría</p>';
        return;
    }
    
    // Generar HTML de la galería
    gallery.innerHTML = filteredPhotos.map(photo => `
        <div class="gallery-item" data-tags="${photo.tags || ''}">
            <img src="assets/img/placeholder.webp" data-src="assets/${photo.src}" alt="${photo.title}" loading="lazy">
            <div class="photo-info">
                <h3>${photo.title}</h3>
                ${photo.location ? `<p><i class="fas fa-map-marker-alt"></i> ${photo.location}</p>` : ''}
            </div>
        </div>
    `).join('');
    
    // Inicializar funcionalidades
    initLazyLoading();
    initFilters();
}

function initLightbox() {
    // Implementación básica de lightbox
    const images = document.querySelectorAll('[data-lightbox]');
    let currentIndex = 0;
    
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            openLightbox(img.src, img.alt);
        });
    });
    
    function openLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close">&times;</span>
                <img src="${src}" alt="${alt}">
                <div class="caption">${alt}</div>
                <a class="prev">&#10094;</a>
                <a class="next">&#10095;</a>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Event listeners para lightbox
        lightbox.querySelector('.close').addEventListener('click', () => {
            lightbox.remove();
        });
        
        lightbox.querySelector('.prev').addEventListener('click', () => {
            navigate(-1);
        });
        
        lightbox.querySelector('.next').addEventListener('click', () => {
            navigate(1);
        });
        
        // Navegación con teclado
        document.addEventListener('keydown', function handleKeydown(e) {
            if (e.key === 'Escape') lightbox.remove();
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
            document.removeEventListener('keydown', handleKeydown);
        });
    }
    
    function navigate(direction) {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        const newImg = images[currentIndex];
        document.querySelector('.lightbox').remove();
        openLightbox(newImg.src, newImg.alt);
    }
}

function initCarousels() {
    // Implementación básica de carrusel
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const items = carousel.querySelectorAll('.carousel-item');
        let currentIndex = 0;
        
        function showItem(index) {
            items.forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
        }
        
        if (carousel.querySelector('.carousel-prev')) {
            carousel.querySelector('.carousel-prev').addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                showItem(currentIndex);
            });
        }
        
        if (carousel.querySelector('.carousel-next')) {
            carousel.querySelector('.carousel-next').addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % items.length;
                showItem(currentIndex);
            });
        }
        
        // Auto-rotación opcional
        if (carousel.dataset.autoRotate) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % items.length;
                showItem(currentIndex);
            }, 5000);
        }
        
        showItem(currentIndex);
    });
}

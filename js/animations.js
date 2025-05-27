// Animations and transitions for photography pages
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero section parallax effect
    gsap.to('.hero-overlay', {
        scrollTrigger: {
            trigger: '.photo-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        opacity: 0.8,
        scale: 1.1
    });

    // Animate hero content on load
    gsap.from('.hero-content', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat span');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        gsap.from(stat, {
            textContent: 0,
            duration: 2,
            ease: 'power1.out',
            snap: { textContent: 1 },
            scrollTrigger: {
                trigger: stat,
                start: 'top center+=100',
                once: true
            }
        });
    });

    // Process steps stagger animation
    gsap.from('.step', {
        scrollTrigger: {
            trigger: '.process-steps',
            start: 'top center+=100'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Gallery items reveal animation
    gsap.from('.gallery-item', {
        scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top center+=100'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: {
            amount: 0.8,
            grid: 'auto'
        },
        ease: 'power2.out'
    });

    // Equipment items slide in
    gsap.from('.equipment-item', {
        scrollTrigger: {
            trigger: '.intro-stats',
            start: 'top center+=100'
        },
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });

    // Gallery filters animation
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            gsap.from('.gallery-item:not([style*="display: none"])', {
                opacity: 0,
                y: 20,
                duration: 0.4,
                stagger: {
                    amount: 0.4,
                    grid: 'auto'
                },
                ease: 'power2.out',
                clearProps: 'all'
            });
        });
    });

    // Lightbox animations
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        // Open animation
        function animateLightboxOpen() {
            gsap.fromTo(lightbox, 
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.out' }
            );
            gsap.fromTo('.lightbox-image',
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.1 }
            );
            gsap.fromTo('.lightbox-info',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.2 }
            );
        }

        // Close animation
        function animateLightboxClose() {
            gsap.to(['.lightbox-image', '.lightbox-info'], {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in',
                onComplete: () => lightbox.classList.add('hidden')
            });
        }

        // Override default lightbox open/close
        window.openLightbox = function(photo) {
            lightbox.classList.remove('hidden');
            const image = lightbox.querySelector('.lightbox-image');
            const title = lightbox.querySelector('.photo-title');
            const description = lightbox.querySelector('.photo-description');
            const location = lightbox.querySelector('.location span');
            const camera = lightbox.querySelector('.camera span');
            const date = lightbox.querySelector('.date span');

            image.src = photo.src;
            image.alt = photo.title;
            title.textContent = photo.title;
            description.textContent = photo.description;
            location.textContent = photo.location;
            camera.textContent = photo.camera;
            date.textContent = formatDate(photo.date);

            animateLightboxOpen();
        };

        window.closeLightbox = function() {
            animateLightboxClose();
        };
    }
});


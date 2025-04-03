/**
 * Portfolio Profesional - Alex Vicente López
 * 
 * Funcionalidades:
 * - Preloader
 * - Navegación suave
 * - Animaciones con GSAP
 * - Barras de progreso circulares
 * - Año actual en footer
 */

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    });

    // Año actual en footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Navegación móvil
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Navbar scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Inicializar GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Animaciones del hero
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

    // Animaciones al hacer scroll
    const animateOnScroll = (elements) => {
        elements.forEach(element => {
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

    // Elementos a animar
    const scrollElements = gsap.utils.toArray('[data-animate]');
    animateOnScroll(scrollElements);

    // Barras de habilidades circulares
    const skillCircles = document.querySelectorAll('.skill-circle');
    
    skillCircles.forEach(circle => {
        const skillLevel = circle.getAttribute('data-skill');
        const circlePath = circle.querySelector('.progress-ring-circle');
        const radius = circlePath.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (skillLevel / 100) * circumference;
        
        circlePath.style.strokeDasharray = circumference;
        circlePath.style.strokeDashoffset = circumference;
        
        // Animación cuando el elemento es visible
        ScrollTrigger.create({
            trigger: circle,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(circlePath, {
                    strokeDashoffset: offset,
                    duration: 1.5,
                    ease: 'power3.out'
                });
            }
        });
    });
});
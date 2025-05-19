/**
 * D3MAS1ADØ - Animations JavaScript
 * 
 * Gestisce le animazioni e gli effetti visivi del sito
 */

document.addEventListener('DOMContentLoaded', function() {
    // Riferimenti agli elementi DOM
    const fadeElements = document.querySelectorAll('.fade-in');
    const staggeredElements = document.querySelectorAll('.staggered-item');
    const heroLogo = document.querySelector('.hero-logo');
    const heroTitle = document.querySelector('.hero-title');
    
    // Inizializzazione
    initAnimations();
    initScrollAnimations();
    
    /**
     * Inizializza le animazioni base
     */
    function initAnimations() {
        // Fade-in elements
        setTimeout(() => {
            fadeElements.forEach(el => {
                el.classList.add('visible');
            });
        }, 500);
        
        // Animazione logo e titolo hero
        if (heroLogo) {
            heroLogo.classList.add('animate');
        }
        
        if (heroTitle) {
            setTimeout(() => {
                heroTitle.classList.add('visible');
            }, 800);
        }
    }
    
    /**
     * Inizializza le animazioni al scroll
     */
    function initScrollAnimations() {
        // Intersection Observer per animazioni al scroll
        if ('IntersectionObserver' in window) {
            // Observer per fade-in al scroll
            const fadeInObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            });
            
            // Observer per elementi staggered
            const staggerObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Aggiungi classe visible con delay in base all'indice
                        const el = entry.target;
                        const parent = el.parentElement;
                        const children = Array.from(parent.children);
                        const index = children.indexOf(el);
                        
                        setTimeout(() => {
                            el.classList.add('visible');
                        }, index * 100);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            });
            
            // Osserva elementi fade-in-scroll
            document.querySelectorAll('.fade-in-scroll').forEach(el => {
                fadeInObserver.observe(el);
            });
            
            // Osserva elementi staggered
            staggeredElements.forEach(el => {
                staggerObserver.observe(el);
            });
        }
    }
    
    /**
     * Effetto parallax per sezioni
     */
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Parallax per hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const heroOverlay = heroSection.querySelector('.hero-overlay');
            if (heroOverlay) {
                heroOverlay.style.transform = `translateY(${scrollTop * 0.4}px)`;
            }
        }
        
        // Parallax per altre sezioni con classe .parallax
        document.querySelectorAll('.parallax').forEach(section => {
            const offset = section.offsetTop;
            const parallaxElements = section.querySelectorAll('.parallax-element');
            
            parallaxElements.forEach(el => {
                const speed = el.getAttribute('data-speed') || 0.2;
                const yPos = -(scrollTop - offset) * speed;
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    });
    
    /**
     * Animazione glitch per testi
     */
    function initGlitchEffect() {
        const glitchTexts = document.querySelectorAll('.glitch');
        
        glitchTexts.forEach(text => {
            // Imposta il data-text attribute uguale al testo contenuto
            if (!text.getAttribute('data-text')) {
                text.setAttribute('data-text', text.textContent);
            }
            
            // Aggiungi animazione casuale
            setInterval(() => {
                if (Math.random() > 0.9) {
                    text.classList.add('active');
                    setTimeout(() => {
                        text.classList.remove('active');
                    }, 200);
                }
            }, 3000);
        });
    }
    
    // Inizializza effetto glitch
    initGlitchEffect();
});

/**
 * D3MAS1ADØ - Main JavaScript
 * 
 * Funzioni principali per il sito D3MAS1ADØ
 * Gestisce preloader, navigazione, animazioni e interazioni UI
 */

document.addEventListener('DOMContentLoaded', function() {
    // Riferimenti agli elementi DOM
    const preloader = document.querySelector('.preloader');
    const preloaderBar = document.querySelector('.preloader-bar');
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const sections = document.querySelectorAll('section');
    const adminLink = document.querySelector('.admin-link');
    const adminModal = document.querySelector('.admin-modal');
    const adminModalClose = document.querySelector('.admin-modal-close');
    const adminForm = document.querySelector('.admin-form');
    
    // Configurazione
    const config = {
        preloaderDuration: 2000,
        scrollOffset: 100,
        animationDelay: 300
    };
    
    // Rimuovi immediatamente la classe preload dal body
    document.body.classList.remove('preload');
    
    // Inizializzazione
    initPreloader();
    initNavigation();
    initScrollEffects();
    initLazyLoading();
    initAdminPanel();
    
    /**
     * Inizializza il preloader
     */
    function initPreloader() {
        console.log("Inizializzazione preloader...");
        // Simula caricamento
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            if (preloaderBar) {
                preloaderBar.style.width = `${progress}%`;
                console.log(`Preloader progress: ${progress}%`);
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                console.log("Preloader completato, nascondendo...");
                
                // Nascondi preloader dopo il completamento
                setTimeout(() => {
                    if (preloader) {
                        preloader.classList.add('fade-out');
                        document.body.classList.remove('loading');
                        console.log("Preloader fade-out applicato");
                        
                        // Rimuovi completamente dopo l'animazione
                        setTimeout(() => {
                            if (preloader) {
                                preloader.style.display = 'none';
                                console.log("Preloader nascosto completamente");
                            }
                        }, 500);
                    }
                }, 500);
            }
        }, config.preloaderDuration / 20);
    }
    
    /**
     * Inizializza la navigazione e il menu mobile
     */
    function initNavigation() {
        // Toggle menu mobile
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                if (mobileMenu) {
                    if (mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        mobileMenu.classList.add('inactive');
                        document.body.classList.remove('no-scroll');
                    } else {
                        mobileMenu.classList.remove('inactive');
                        mobileMenu.classList.add('active');
                        document.body.classList.add('no-scroll');
                    }
                }
            });
        }
        
        // Smooth scroll per link interni
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // Ignora se è solo "#"
                if (targetId === '#') return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Chiudi menu mobile se aperto
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        mobileMenu.classList.add('inactive');
                        document.body.classList.remove('no-scroll');
                    }
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - (header ? header.offsetHeight : 0),
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Gestione scroll indicator
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function() {
                const firstSection = document.querySelector('section');
                if (firstSection) {
                    window.scrollTo({
                        top: firstSection.offsetTop - (header ? header.offsetHeight : 0),
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
    
    /**
     * Inizializza effetti di scroll
     */
    function initScrollEffects() {
        // Header sticky al scroll
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Header sticky
            if (header) {
                if (scrollTop > 50) {
                    header.classList.add('sticky');
                    
                    // Nascondi header quando si scrolla verso il basso
                    if (scrollTop > lastScrollTop && scrollTop > 200) {
                        header.classList.add('hidden');
                    } else {
                        header.classList.remove('hidden');
                    }
                } else {
                    header.classList.remove('sticky');
                }
            }
            
            // Nascondi scroll indicator
            if (scrollIndicator && scrollTop > 100) {
                scrollIndicator.classList.add('hidden');
            } else if (scrollIndicator) {
                scrollIndicator.classList.remove('hidden');
            }
            
            // Animazioni al scroll
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollTop > sectionTop - window.innerHeight + config.scrollOffset && 
                    scrollTop < sectionTop + sectionHeight) {
                    section.classList.add('in-view');
                    
                    // Elementi con animazione fade-in
                    const fadeElements = section.querySelectorAll('.fade-in-scroll');
                    fadeElements.forEach(el => {
                        el.classList.add('visible');
                    });
                    
                    // Elementi con animazione staggered
                    const staggeredElements = section.querySelectorAll('.staggered-item');
                    staggeredElements.forEach(el => {
                        el.classList.add('visible');
                    });
                }
            });
            
            lastScrollTop = scrollTop;
        });
    }
    
    /**
     * Inizializza lazy loading per immagini
     */
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                        }
                        
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    /**
     * Inizializza il pannello admin
     */
    function initAdminPanel() {
        if (adminLink && adminModal) {
            // Apri modal al click sul link admin
            adminLink.addEventListener('click', function(e) {
                e.preventDefault();
                adminModal.classList.add('active');
                document.body.classList.add('no-scroll');
            });
            
            // Chiudi modal
            if (adminModalClose) {
                adminModalClose.addEventListener('click', function() {
                    adminModal.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                });
            }
            
            // Click fuori dal modal per chiudere
            adminModal.addEventListener('click', function(e) {
                if (e.target === adminModal) {
                    adminModal.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
            
            // Gestione form admin
            if (adminForm) {
                adminForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const username = document.getElementById('admin-username').value;
                    const password = document.getElementById('admin-password').value;
                    
                    // Verifica credenziali (esempio)
                    if (username === 'admin' && password === 'demasiadoadmin') {
                        // Reindirizza all'area admin o mostra pannello
                        alert('Login effettuato con successo!');
                        // Qui puoi reindirizzare o mostrare il pannello admin
                    } else {
                        alert('Credenziali non valide');
                    }
                });
            }
        }
    }
    
    /**
     * Gestione WebP fallback
     */
    function supportsWebP() {
        const elem = document.createElement('canvas');
        if (elem.getContext && elem.getContext('2d')) {
            return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        }
        return false;
    }
    
    // Aggiungi classe al body se WebP non è supportato
    if (!supportsWebP()) {
        document.body.classList.add('no-webp');
    }
    
    /**
     * Gestione cookie consent
     */
    function checkCookieConsent() {
        const cookieConsent = localStorage.getItem('d3masiado_cookie_consent');
        const cookieBanner = document.querySelector('.cookie-banner');
        
        if (!cookieConsent && cookieBanner) {
            cookieBanner.classList.add('active');
            
            const acceptButton = cookieBanner.querySelector('.cookie-accept');
            if (acceptButton) {
                acceptButton.addEventListener('click', function() {
                    localStorage.setItem('d3masiado_cookie_consent', 'accepted');
                    cookieBanner.classList.remove('active');
                });
            }
        }
    }
    
    // Controlla cookie consent
    setTimeout(checkCookieConsent, 2000);
    
    // Log di inizializzazione
    console.log('D3MAS1ADØ website initialized');
});

// Assicurati che il preloader venga rimosso anche se ci sono errori
window.addEventListener('load', function() {
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        if (preloader && preloader.style.display !== 'none') {
            console.log('Rimozione forzata del preloader dopo caricamento completo');
            preloader.style.display = 'none';
            document.body.classList.remove('preload');
        }
    }, 3000);
});

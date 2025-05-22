// Main JavaScript per D3MAS1ADØ - Esperienza cinematografica

/**
 * D3MAS1ADØ - Main JavaScript
 * 
 * Questo file contiene le funzionalità principali del sito D3MAS1ADØ,
 * inclusi preloader, smooth scrolling, animazioni e interazioni base.
 * 
 * Il codice è strutturato in modo modulare per facilitare la manutenzione
 * e l'aggiornamento da parte del cliente.
 */

// Attendi che il DOM sia completamente caricato
document.addEventListener('DOMContentLoaded', function() {
    // Inizializza il preloader
    initPreloader();
    
    // Inizializza lo smooth scrolling con Lenis
    initSmoothScroll();
    
    // Inizializza le animazioni di scroll
    initScrollAnimations();
    
    // Inizializza gli eventi di base
    initBaseEvents();
    
    // Inizializza il carrello
    initCart();
    
    // Inizializza il cambio lingua
    initLanguageSwitch();
});

/**
 * Inizializza il preloader
 * Gestisce l'animazione di caricamento e la transizione alla pagina principale
 */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    // Simula il caricamento delle risorse
    setTimeout(() => {
        // Nascondi il preloader con fade out
        if (preloader) {
            preloader.style.opacity = '0';
            
            // Rimuovi il preloader dal DOM dopo la transizione
            setTimeout(() => {
                preloader.style.display = 'none';
                
                // Attiva le animazioni iniziali dopo la rimozione del preloader
                triggerInitialAnimations();
            }, 500);
        }
    }, 2000); // 2 secondi di preloader per effetto cinematografico
}

/**
 * Attiva le animazioni iniziali dopo il preloader
 */
function triggerInitialAnimations() {
    // Animazioni per la hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('animated');
    }
    
    // Rivela gli elementi con classe .reveal-on-scroll che sono visibili all'inizio
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

/**
 * Inizializza lo smooth scrolling con Lenis
 * Richiede la libreria Lenis.js inclusa nel progetto
 */
function initSmoothScroll() {
    // Verifica se la libreria Lenis è disponibile
    if (typeof Lenis === 'function') {
        // Inizializza Lenis con le opzioni cinematografiche
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false
        });
        
        // Funzione per aggiornare Lenis ad ogni frame
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        
        // Avvia il loop di animazione
        requestAnimationFrame(raf);
        
        // Aggiungi listener per gli anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Estrai l'id dalla href
                const targetId = this.getAttribute('href');
                
                // Scorri alla sezione target
                lenis.scrollTo(targetId, {
                    offset: 0,
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            });
        });
    } else {
        console.warn('Lenis.js non è caricato. Lo smooth scrolling non funzionerà.');
    }
}

/**
 * Inizializza le animazioni di scroll
 * Utilizza Intersection Observer per rilevare quando gli elementi entrano nel viewport
 */
function initScrollAnimations() {
    // Crea un nuovo Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se l'elemento è visibile nel viewport
            if (entry.isIntersecting) {
                // Aggiungi la classe 'visible' per attivare l'animazione
                entry.target.classList.add('visible');
                
                // Smetti di osservare l'elemento dopo che è stato animato
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // Usa il viewport come container
        rootMargin: '0px', // Nessun margine
        threshold: 0.1 // Attiva quando almeno il 10% dell'elemento è visibile
    });
    
    // Osserva tutti gli elementi con la classe 'reveal-on-scroll'
    document.querySelectorAll('.reveal-on-scroll').forEach(element => {
        observer.observe(element);
    });
    
    // Osserva anche altri elementi animati
    document.querySelectorAll('.fade-in-stagger').forEach(element => {
        observer.observe(element);
    });
}

/**
 * Inizializza gli eventi di base
 * Gestisce interazioni come apertura/chiusura menu, toggle carrello, etc.
 */
function initBaseEvents() {
    // Toggle del carrello
    const cartToggle = document.querySelector('.cart-toggle');
    const cartContainer = document.getElementById('shopping-cart');
    const cartClose = document.querySelector('.cart-close');
    
    if (cartToggle && cartContainer && cartClose) {
        cartToggle.addEventListener('click', () => {
            cartContainer.classList.toggle('active');
        });
        
        cartClose.addEventListener('click', () => {
            cartContainer.classList.remove('active');
        });
    }
    
    // Riproduzione video al click
    const videoPlayButtons = document.querySelectorAll('.video-play-button');
    videoPlayButtons.forEach(button => {
        button.addEventListener('click', function() {
            const videoElement = this.parentElement.querySelector('video');
            if (videoElement) {
                if (videoElement.paused) {
                    videoElement.play();
                    this.style.opacity = '0';
                } else {
                    videoElement.pause();
                    this.style.opacity = '1';
                }
            }
        });
    });
    
    // Gestione form Unidad-31Ø
    const unidadForm = document.getElementById('unidad-login-form');
    if (unidadForm) {
        unidadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simula un accesso negato (come richiesto nel brief)
            const errorMessage = document.querySelector('.unidad-error');
            if (errorMessage) {
                errorMessage.classList.remove('hidden');
                
                // Riproduci suono di errore se disponibile
                const errorSound = document.getElementById('error-sound');
                if (errorSound) {
                    errorSound.play();
                }
                
                // Effetto glitch sul form
                unidadForm.classList.add('glitch-effect');
                setTimeout(() => {
                    unidadForm.classList.remove('glitch-effect');
                }, 1000);
            }
        });
    }
    
    // Gestione form Newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostra messaggio di successo
            const successMessage = document.querySelector('.newsletter-success');
            if (successMessage) {
                successMessage.classList.remove('hidden');
                newsletterForm.style.display = 'none';
            }
        });
    }
}

/**
 * Inizializza il carrello
 * Gestisce l'aggiunta/rimozione di prodotti e il checkout
 */
function initCart() {
    // Elementi del carrello
    const cartItems = document.querySelector('.cart-items');
    const cartTotalAmount = document.querySelector('.cart-total-amount');
    const cartCount = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const checkoutButton = document.querySelector('.cart-checkout');
    
    // Array per memorizzare gli elementi del carrello
    let cart = [];
    
    // Carica il carrello dal localStorage se disponibile
    if (localStorage.getItem('d3masiadoCart')) {
        try {
            cart = JSON.parse(localStorage.getItem('d3masiadoCart'));
            updateCartUI();
        } catch (e) {
            console.error('Errore nel caricamento del carrello:', e);
            localStorage.removeItem('d3masiadoCart');
        }
    }
    
    // Aggiungi event listener ai pulsanti "Aggiungi al carrello"
    if (addToCartButtons) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Ottieni i dati del prodotto
                const productId = this.getAttribute('data-product');
                const productName = this.getAttribute('data-name');
                const productPrice = parseFloat(this.getAttribute('data-price'));
                
                // Ottieni la taglia selezionata
                const sizeElement = this.parentElement.querySelector('.size-option.selected');
                let size = 'Unica';
                if (sizeElement) {
                    size = sizeElement.getAttribute('data-size');
                }
                
                // Aggiungi il prodotto al carrello
                addToCart(productId, productName, productPrice, size);
                
                // Mostra notifica
                showNotification('Prodotto aggiunto al carrello');
            });
        });
    }
    
    // Aggiungi event listener ai pulsanti delle taglie
    const sizeOptions = document.querySelectorAll('.size-option');
    if (sizeOptions) {
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Rimuovi la classe 'selected' da tutte le opzioni nel gruppo
                const siblings = this.parentElement.querySelectorAll('.size-option');
                siblings.forEach(sib => sib.classList.remove('selected'));
                
                // Aggiungi la classe 'selected' all'opzione cliccata
                this.classList.add('selected');
            });
        });
    }
    
    // Aggiungi event listener al pulsante checkout
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            // Qui si integrerebbe con Stripe Checkout
            // Per ora, mostriamo solo un messaggio
            alert('Checkout non implementato in questa versione. Integrazione Stripe richiesta.');
        });
    }
    
    /**
     * Aggiunge un prodotto al carrello
     */
    function addToCart(id, name, price, size) {
        // Controlla se il prodotto è già nel carrello
        const existingItem = cart.find(item => item.id === id && item.size === size);
        
        if (existingItem) {
            // Incrementa la quantità se il prodotto esiste già
            existingItem.quantity += 1;
        } else {
            // Aggiungi un nuovo elemento al carrello
            cart.push({
                id: id,
                name: name,
                price: price,
                size: size,
                quantity: 1
            });
        }
        
        // Salva il carrello nel localStorage
        localStorage.setItem('d3masiadoCart', JSON.stringify(cart));
        
        // Aggiorna l'interfaccia del carrello
        updateCartUI();
    }
    
    /**
     * Rimuove un prodotto dal carrello
     */
    function removeFromCart(index) {
        // Rimuovi l'elemento dall'array
        cart.splice(index, 1);
        
        // Salva il carrello nel localStorage
        localStorage.setItem('d3masiadoCart', JSON.stringify(cart));
        
        // Aggiorna l'interfaccia del carrello
        updateCartUI();
    }
    
    /**
     * Aggiorna l'interfaccia del carrello
     */
    function updateCartUI() {
        // Aggiorna il conteggio degli elementi
        if (cartCount) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
        
        // Aggiorna il contenuto del carrello
        if (cartItems) {
            // Svuota il contenuto attuale
            cartItems.innerHTML = '';
            
            // Aggiungi ogni elemento del carrello
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                
                cartItem.innerHTML = `
                    <div class="cart-item-image" data-image="product-${item.id}"></div>
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">€${item.price.toFixed(2)}</div>
                        <div class="cart-item-size">Taglia: ${item.size}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" data-index="${index}">-</button>
                            <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                            <button class="quantity-btn plus" data-index="${index}">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" data-index="${index}">&times;</button>
                `;
                
                cartItems.appendChild(cartItem);
            });
            
            // Aggiungi event listener ai pulsanti di quantità
            const minusButtons = cartItems.querySelectorAll('.minus');
            const plusButtons = cartItems.querySelectorAll('.plus');
            const removeButtons = cartItems.querySelectorAll('.cart-item-remove');
            
            minusButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    if (cart[index].quantity > 1) {
                        cart[index].quantity -= 1;
                        localStorage.setItem('d3masiadoCart', JSON.stringify(cart));
                        updateCartUI();
                    }
                });
            });
            
            plusButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    cart[index].quantity += 1;
                    localStorage.setItem('d3masiadoCart', JSON.stringify(cart));
                    updateCartUI();
                });
            });
            
            removeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    removeFromCart(index);
                });
            });
        }
        
        // Aggiorna il totale
        if (cartTotalAmount) {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotalAmount.textContent = `€${total.toFixed(2)}`;
        }
    }
    
    /**
     * Mostra una notifica temporanea
     */
    function showNotification(message) {
        // Crea l'elemento di notifica
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Aggiungi la notifica al DOM
        document.body.appendChild(notification);
        
        // Mostra la notifica con animazione
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Rimuovi la notifica dopo 3 secondi
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

/**
 * Inizializza il cambio lingua
 */
function initLanguageSwitch() {
    const langIt = document.querySelector('.lang-it');
    const langEn = document.querySelector('.lang-en');
    
    if (langIt && langEn) {
        // Imposta la lingua predefinita in base al browser
        const userLang = navigator.language || navigator.userLanguage;
        let currentLang = userLang.startsWith('it') ? 'it' : 'en';
        
        // Carica la lingua dal localStorage se disponibile
        if (localStorage.getItem('d3masiadoLang')) {
            currentLang = localStorage.getItem('d3masiadoLang');
        }
        
        // Imposta la lingua iniziale
        setLanguage(currentLang);
        
        // Aggiungi event listener ai pulsanti di lingua
        langIt.addEventListener('click', function(e) {
            e.preventDefault();
            setLanguage('it');
        });
        
        langEn.addEventListener('click', function(e) {
            e.preventDefault();
            setLanguage('en');
        });
    }
    
    /**
     * Imposta la lingua del sito
     */
    function setLanguage(lang) {
        // Salva la lingua nel localStorage
        localStorage.setItem('d3masiadoLang', lang);
        
        // Aggiorna la classe attiva sui pulsanti di lingua
        if (lang === 'it') {
            langIt.classList.add('active');
            langEn.classList.remove('active');
        } else {
            langIt.classList.remove('active');
            langEn.classList.add('active');
        }
        
        // Aggiorna l'attributo lang dell'HTML
        document.documentElement.lang = lang;
        
        // Aggiorna i testi in base alla lingua
        // Nota: in una versione completa, questi testi sarebbero caricati da un file JSON
        const translations = {
            it: {
                heroTitle: "L'unico modo che conosciamo",
                manifestoTitle: "Manifesto",
                collectionsTitle: "Collezioni",
                lookbookTitle: "Lookbook",
                unidadTitle: "Unidad-31Ø",
                shopTitle: "Shop",
                newsletterTitle: "Vuoi entrare nella familia?",
                // Aggiungi altre traduzioni qui
            },
            en: {
                heroTitle: "The only way we know",
                manifestoTitle: "Manifesto",
                collectionsTitle: "Collections",
                lookbookTitle: "Lookbook",
                unidadTitle: "Unidad-31Ø",
                shopTitle: "Shop",
                newsletterTitle: "Want to join the familia?",
                // Aggiungi altre traduzioni qui
            }
        };
        
        // Applica le traduzioni
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }
}

/**
 * Verifica se un elemento è visibile nel viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Main JavaScript per D3MAS1ADØ

document.addEventListener('DOMContentLoaded', function() {
    // Rimuovi preloader
    setTimeout(function() {
        document.body.classList.remove('preload');
        document.getElementById('preloader').style.display = 'none';
    }, 1500);

    // Animazioni al scroll
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    
    const fadeInOnScroll = function() {
        fadeElements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight) && (elementBottom > 0);
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Esegui al caricamento

    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(function(element) {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Modal Manifesto
    const openManifestoBtn = document.getElementById('open-manifesto');
    const manifestoModal = document.getElementById('manifesto-modal');
    const closeManifestoBtn = document.querySelector('.manifesto-modal-close');
    
    if (openManifestoBtn && manifestoModal && closeManifestoBtn) {
        openManifestoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            manifestoModal.classList.add('active');
            document.body.classList.add('no-scroll');
        });
        
        closeManifestoBtn.addEventListener('click', function() {
            manifestoModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === manifestoModal) {
                manifestoModal.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // Collections Slider
    const collectionsSlider = document.querySelector('.collections-slider');
    const prevCollectionBtn = document.querySelector('.prev-collection');
    const nextCollectionBtn = document.querySelector('.next-collection');
    const collectionItems = document.querySelectorAll('.collection-item');
    
    if (collectionsSlider && prevCollectionBtn && nextCollectionBtn) {
        let currentCollectionIndex = 0;
        
        const showCollection = function(index) {
            const scrollAmount = collectionsSlider.clientWidth * index;
            collectionsSlider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            currentCollectionIndex = index;
        };
        
        prevCollectionBtn.addEventListener('click', function() {
            currentCollectionIndex = (currentCollectionIndex > 0) ? currentCollectionIndex - 1 : collectionItems.length - 1;
            showCollection(currentCollectionIndex);
        });
        
        nextCollectionBtn.addEventListener('click', function() {
            currentCollectionIndex = (currentCollectionIndex < collectionItems.length - 1) ? currentCollectionIndex + 1 : 0;
            showCollection(currentCollectionIndex);
        });
        
        // Swipe detection for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        collectionsSlider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        collectionsSlider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        const handleSwipe = function() {
            if (touchEndX < touchStartX) {
                // Swipe left
                nextCollectionBtn.click();
            } else if (touchEndX > touchStartX) {
                // Swipe right
                prevCollectionBtn.click();
            }
        };
    }

    // Lookbook Carousel
    const lookbookCarousel = document.querySelector('.lookbook-carousel');
    const prevLookbookBtn = document.querySelector('.prev-lookbook');
    const nextLookbookBtn = document.querySelector('.next-lookbook');
    const lookbookItems = document.querySelectorAll('.lookbook-item');
    const videoPlayButtons = document.querySelectorAll('.video-play-button');
    
    if (lookbookCarousel && prevLookbookBtn && nextLookbookBtn) {
        let currentLookbookIndex = 0;
        
        const showLookbook = function(index) {
            const scrollAmount = lookbookCarousel.clientWidth * index;
            lookbookCarousel.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            currentLookbookIndex = index;
        };
        
        prevLookbookBtn.addEventListener('click', function() {
            currentLookbookIndex = (currentLookbookIndex > 0) ? currentLookbookIndex - 1 : lookbookItems.length - 1;
            showLookbook(currentLookbookIndex);
        });
        
        nextLookbookBtn.addEventListener('click', function() {
            currentLookbookIndex = (currentLookbookIndex < lookbookItems.length - 1) ? currentLookbookIndex + 1 : 0;
            showLookbook(currentLookbookIndex);
        });
        
        // Video play functionality
        videoPlayButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const video = this.parentElement.querySelector('video');
                if (video) {
                    if (video.paused) {
                        video.play();
                        this.innerHTML = '<i class="fas fa-pause"></i>';
                    } else {
                        video.pause();
                        this.innerHTML = '<i class="fas fa-play"></i>';
                    }
                }
            });
        });
        
        // Swipe detection for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        lookbookCarousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        lookbookCarousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        const handleSwipe = function() {
            if (touchEndX < touchStartX) {
                // Swipe left
                nextLookbookBtn.click();
            } else if (touchEndX > touchStartX) {
                // Swipe right
                prevLookbookBtn.click();
            }
        };
    }

    // Unidad-31Ø Login
    const unidadLoginForm = document.getElementById('unidad-login-form');
    
    if (unidadLoginForm) {
        unidadLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('unidad-email').value;
            const code = document.getElementById('unidad-code').value;
            
            // Simulazione di login (in un'app reale, qui ci sarebbe una chiamata API)
            if (email && code) {
                alert('Accesso effettuato con successo! Benvenuto nell\'area privata Unidad-31Ø.');
                // Qui reindirizzare all'area privata o mostrare contenuti esclusivi
            } else {
                alert('Per favore, inserisci email e codice di accesso.');
            }
        });
    }

    // Shopping Cart
    const cartToggle = document.querySelector('.cart-toggle');
    const cartContainer = document.getElementById('shopping-cart');
    const cartClose = document.querySelector('.cart-close');
    
    if (cartToggle && cartContainer && cartClose) {
        cartToggle.addEventListener('click', function() {
            cartContainer.classList.add('active');
            document.body.classList.add('no-scroll');
        });
        
        cartClose.addEventListener('click', function() {
            cartContainer.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === cartContainer) {
                cartContainer.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // Lana AI Chatbot
    const lanaToggle = document.querySelector('.lana-toggle');
    const lanaWindow = document.querySelector('.lana-chat-window');
    const lanaClose = document.querySelector('.lana-close');
    const lanaInput = document.querySelector('.lana-input input');
    const lanaSend = document.querySelector('.lana-send');
    const lanaMessages = document.querySelector('.lana-messages');
    
    if (lanaToggle && lanaWindow && lanaClose) {
        lanaToggle.addEventListener('click', function() {
            lanaWindow.classList.toggle('active');
            if (lanaInput) {
                setTimeout(() => lanaInput.focus(), 300);
            }
        });
        
        lanaClose.addEventListener('click', function() {
            lanaWindow.classList.remove('active');
        });
        
        if (lanaSend && lanaInput && lanaMessages) {
            lanaSend.addEventListener('click', sendLanaMessage);
            lanaInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendLanaMessage();
                }
            });
        }
    }
    
    function sendLanaMessage() {
        const message = lanaInput.value.trim();
        if (message) {
            // Aggiungi messaggio utente
            const userMessageEl = document.createElement('div');
            userMessageEl.className = 'lana-message user';
            userMessageEl.innerHTML = `<p>${message}</p>`;
            lanaMessages.appendChild(userMessageEl);
            
            // Pulisci input
            lanaInput.value = '';
            
            // Scroll to bottom
            lanaMessages.scrollTop = lanaMessages.scrollHeight;
            
            // Simula risposta di Lana (in un'app reale, qui ci sarebbe una chiamata API)
            setTimeout(function() {
                const lanaResponse = getLanaResponse(message);
                const lanaMessageEl = document.createElement('div');
                lanaMessageEl.className = 'lana-message lana';
                lanaMessageEl.innerHTML = `<p>${lanaResponse}</p>`;
                lanaMessages.appendChild(lanaMessageEl);
                
                // Scroll to bottom
                lanaMessages.scrollTop = lanaMessages.scrollHeight;
            }, 1000);
        }
    }
    
    function getLanaResponse(message) {
        message = message.toLowerCase();
        
        if (message.includes('ciao') || message.includes('salve') || message.includes('hey')) {
            return "Ciao! Sono Lana, l'assistente AI di D3MAS1ADØ. Come posso aiutarti oggi?";
        } else if (message.includes('collezione') || message.includes('worldwide') || message.includes('intifada') || message.includes('revolucion')) {
            return "Le nostre collezioni WorldWide, Intifada e Revolución rappresentano la nostra visione di lusso urbano. Ogni capo è prodotto in edizione limitata con materiali di alta qualità. Vuoi saperne di più su una collezione specifica?";
        } else if (message.includes('prezzo') || message.includes('costo') || message.includes('quanto costa')) {
            return "I nostri capi hanno prezzi variabili in base alla collezione e al tipo di prodotto. Ti consiglio di visitare la sezione SHOP o fare un preordine per ricevere informazioni dettagliate sui prezzi.";
        } else if (message.includes('spedizione') || message.includes('consegna')) {
            return "Effettuiamo spedizioni in tutto il mondo. I tempi di consegna variano da 3-5 giorni lavorativi per l'Italia a 7-14 giorni per le spedizioni internazionali. Tutte le spedizioni sono tracciabili.";
        } else if (message.includes('reso') || message.includes('rimborso') || message.includes('cambio')) {
            return "Accettiamo resi entro 14 giorni dalla ricezione del prodotto. Il capo deve essere in condizioni perfette con etichette ancora attaccate. Contatta il nostro servizio clienti per avviare la procedura di reso.";
        } else if (message.includes('manifesto')) {
            return "Il nostro manifesto rappresenta la filosofia di D3MAS1ADØ: un lusso urbano autentico che non scende a compromessi. Puoi leggere il manifesto completo cliccando sul link nella sezione dedicata del sito.";
        } else if (message.includes('grazie') || message.includes('thank')) {
            return "Figurati! Sono qui per aiutarti. C'è altro di cui hai bisogno?";
        } else {
            return "Interessante! Posso aiutarti con informazioni sulle nostre collezioni, spedizioni, resi o preordini. Fammi sapere cosa ti interessa.";
        }
    }

    // Shop Filters
    const shopFilters = document.querySelectorAll('.shop-filter');
    
    if (shopFilters.length > 0) {
        shopFilters.forEach(function(filter) {
            filter.addEventListener('click', function() {
                // Rimuovi classe active da tutti i filtri
                shopFilters.forEach(function(f) {
                    f.classList.remove('active');
                });
                
                // Aggiungi classe active al filtro cliccato
                this.classList.add('active');
                
                // Filtra i prodotti
                const filterValue = this.getAttribute('data-filter');
                filterProducts(filterValue);
            });
        });
    }
    
    function filterProducts(filter) {
        const products = document.querySelectorAll('.product-item');
        
        products.forEach(function(product) {
            if (filter === 'all') {
                product.style.display = 'block';
            } else {
                const productCollection = product.getAttribute('data-collection');
                
                if (productCollection === filter) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            }
        });
    }

    // Smooth scrolling per link interni
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.site-header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Cinematic hover effects
    const cinematicElements = document.querySelectorAll('.cinematic-hover');
    
    cinematicElements.forEach(function(element) {
        element.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });

    // Glitch effect trigger
    const glitchElements = document.querySelectorAll('.glitch-trigger');
    
    glitchElements.forEach(function(element) {
        element.addEventListener('mouseenter', function() {
            const target = document.querySelector(this.getAttribute('data-glitch-target'));
            
            if (target) {
                target.classList.add('glitch-active');
                
                setTimeout(function() {
                    target.classList.remove('glitch-active');
                }, 1000);
            }
        });
    });
});

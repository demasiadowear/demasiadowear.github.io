/**
 * D3MAS1ADØ Lookbook Gallery Interactive
 * 
 * Script per la gestione della galleria lookbook interattiva
 * con effetti di transizione, zoom e navigazione touch-friendly
 */

document.addEventListener('DOMContentLoaded', function() {
    // Riferimenti agli elementi
    const lookbookSection = document.querySelector('#lookbook');
    const lookbookSlider = document.querySelector('.lookbook-slider');
    const lookbookCta = document.querySelector('.lookbook-cta');
    
    // Configurazione lookbook
    const lookbookConfig = {
        collections: ['intifada', 'revolucion', 'land-of-smile'],
        imagesPerCollection: 3,
        transitionSpeed: 400, // ms
        autoplaySpeed: 5000, // ms
        enableZoom: true,
        enableSwipe: true
    };
    
    // Stato corrente
    let currentSlide = 0;
    let totalSlides = 0;
    let autoplayInterval = null;
    let isZoomed = false;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Funzione per inizializzare la galleria
    function initLookbookGallery() {
        if (!lookbookSlider) return;
        
        // Pulire il contenuto esistente
        lookbookSlider.innerHTML = '';
        
        // Creare gli elementi della galleria
        lookbookConfig.collections.forEach(collection => {
            for (let i = 1; i <= lookbookConfig.imagesPerCollection; i++) {
                createSlide(collection, i);
            }
        });
        
        // Aggiornare il conteggio totale delle slide
        totalSlides = lookbookSlider.children.length;
        
        // Aggiungere i controlli di navigazione
        createNavigation();
        
        // Impostare la prima slide come attiva
        if (totalSlides > 0) {
            lookbookSlider.children[0].classList.add('active');
        }
        
        // Avviare l'autoplay
        startAutoplay();
        
        // Aggiungere event listeners per swipe su mobile
        if (lookbookConfig.enableSwipe) {
            setupSwipeListeners();
        }
    }
    
    // Funzione per creare una slide
    function createSlide(collection, index) {
        const slide = document.createElement('div');
        slide.className = 'lookbook-slide';
        slide.setAttribute('data-collection', collection);
        
        const img = document.createElement('img');
        img.className = 'lookbook-img';
        img.src = `images/lookbook/${collection}-${index}.webp`;
        img.alt = `D3MAS1ADØ ${collection.toUpperCase()} Lookbook`;
        img.loading = 'lazy';
        
        // Fallback per browser che non supportano WebP
        img.onerror = function() {
            this.src = `images/lookbook/${collection}-${index}.jpg`;
        };
        
        slide.appendChild(img);
        
        // Aggiungere overlay con info
        const overlay = document.createElement('div');
        overlay.className = 'lookbook-overlay';
        
        const info = document.createElement('div');
        info.className = 'lookbook-info';
        
        const title = document.createElement('h3');
        title.className = 'lookbook-title';
        title.textContent = formatCollectionName(collection);
        
        info.appendChild(title);
        overlay.appendChild(info);
        slide.appendChild(overlay);
        
        // Aggiungere event listener per zoom
        if (lookbookConfig.enableZoom) {
            slide.addEventListener('click', function(e) {
                if (!isZoomed) {
                    zoomIn(this);
                } else {
                    zoomOut();
                }
            });
        }
        
        lookbookSlider.appendChild(slide);
    }
    
    // Funzione per formattare il nome della collezione
    function formatCollectionName(collection) {
        switch(collection) {
            case 'intifada':
                return 'INTIFADA';
            case 'revolucion':
                return 'REVOLUCIÓN';
            case 'land-of-smile':
                return 'LAND OF SMILE';
            default:
                return collection.toUpperCase();
        }
    }
    
    // Funzione per creare i controlli di navigazione
    function createNavigation() {
        // Creare container per i controlli
        const navContainer = document.createElement('div');
        navContainer.className = 'lookbook-nav';
        
        // Pulsante precedente
        const prevButton = document.createElement('button');
        prevButton.className = 'lookbook-nav-btn prev';
        prevButton.setAttribute('aria-label', 'Slide precedente');
        prevButton.innerHTML = '&lt;';
        prevButton.addEventListener('click', function() {
            goToSlide(currentSlide - 1);
        });
        
        // Pulsante successivo
        const nextButton = document.createElement('button');
        nextButton.className = 'lookbook-nav-btn next';
        nextButton.setAttribute('aria-label', 'Slide successiva');
        nextButton.innerHTML = '&gt;';
        nextButton.addEventListener('click', function() {
            goToSlide(currentSlide + 1);
        });
        
        // Indicatori
        const indicators = document.createElement('div');
        indicators.className = 'lookbook-indicators';
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'lookbook-indicator';
            dot.setAttribute('aria-label', `Vai alla slide ${i + 1}`);
            dot.addEventListener('click', function() {
                goToSlide(i);
            });
            indicators.appendChild(dot);
        }
        
        // Aggiungere elementi al container
        navContainer.appendChild(prevButton);
        navContainer.appendChild(indicators);
        navContainer.appendChild(nextButton);
        
        // Aggiungere il container dopo lo slider
        if (lookbookSlider.parentNode) {
            lookbookSlider.parentNode.insertBefore(navContainer, lookbookSlider.nextSibling);
        }
    }
    
    // Funzione per andare a una slide specifica
    function goToSlide(index) {
        // Fermare l'autoplay
        stopAutoplay();
        
        // Gestire l'indice circolare
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }
        
        // Rimuovere la classe active dalla slide corrente
        if (lookbookSlider.children[currentSlide]) {
            lookbookSlider.children[currentSlide].classList.remove('active');
        }
        
        // Aggiungere la classe active alla nuova slide
        if (lookbookSlider.children[index]) {
            lookbookSlider.children[index].classList.add('active');
        }
        
        // Aggiornare l'indice corrente
        currentSlide = index;
        
        // Aggiornare gli indicatori
        updateIndicators();
        
        // Riavviare l'autoplay
        startAutoplay();
    }
    
    // Funzione per aggiornare gli indicatori
    function updateIndicators() {
        const indicators = document.querySelectorAll('.lookbook-indicator');
        
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Funzione per avviare l'autoplay
    function startAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
        
        autoplayInterval = setInterval(function() {
            goToSlide(currentSlide + 1);
        }, lookbookConfig.autoplaySpeed);
    }
    
    // Funzione per fermare l'autoplay
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }
    
    // Funzione per zoom in
    function zoomIn(slide) {
        if (isZoomed) return;
        
        // Creare container per lo zoom
        const zoomContainer = document.createElement('div');
        zoomContainer.className = 'lookbook-zoom-container';
        
        // Clonare l'immagine
        const img = slide.querySelector('.lookbook-img');
        const zoomImg = document.createElement('img');
        zoomImg.src = img.src;
        zoomImg.alt = img.alt;
        zoomImg.className = 'lookbook-zoom-img';
        
        // Aggiungere pulsante di chiusura
        const closeButton = document.createElement('button');
        closeButton.className = 'lookbook-zoom-close';
        closeButton.innerHTML = '&times;';
        closeButton.setAttribute('aria-label', 'Chiudi zoom');
        closeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            zoomOut();
        });
        
        // Aggiungere elementi al container
        zoomContainer.appendChild(zoomImg);
        zoomContainer.appendChild(closeButton);
        
        // Aggiungere il container al body
        document.body.appendChild(zoomContainer);
        
        // Aggiungere classe per prevenire lo scroll
        document.body.classList.add('no-scroll');
        
        // Aggiungere event listener per chiudere con Escape
        document.addEventListener('keydown', handleEscapeKey);
        
        // Aggiungere event listener per chiudere con click fuori
        zoomContainer.addEventListener('click', function(e) {
            if (e.target === this) {
                zoomOut();
            }
        });
        
        // Impostare lo stato
        isZoomed = true;
        
        // Fermare l'autoplay
        stopAutoplay();
    }
    
    // Funzione per zoom out
    function zoomOut() {
        if (!isZoomed) return;
        
        // Rimuovere il container dello zoom
        const zoomContainer = document.querySelector('.lookbook-zoom-container');
        if (zoomContainer) {
            zoomContainer.remove();
        }
        
        // Rimuovere classe per prevenire lo scroll
        document.body.classList.remove('no-scroll');
        
        // Rimuovere event listener per Escape
        document.removeEventListener('keydown', handleEscapeKey);
        
        // Impostare lo stato
        isZoomed = false;
        
        // Riavviare l'autoplay
        startAutoplay();
    }
    
    // Funzione per gestire il tasto Escape
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            zoomOut();
        }
    }
    
    // Funzione per impostare i listener per swipe
    function setupSwipeListeners() {
        if (!lookbookSlider) return;
        
        lookbookSlider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        lookbookSlider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    // Funzione per gestire lo swipe
    function handleSwipe() {
        const swipeThreshold = 50; // px
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe a sinistra -> slide successiva
            goToSlide(currentSlide + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe a destra -> slide precedente
            goToSlide(currentSlide - 1);
        }
    }
    
    // Funzione per aprire il lookbook completo
    function openFullLookbook() {
        // Qui si potrebbe implementare l'apertura di una versione più completa
        // del lookbook, magari in una nuova pagina o in un overlay
        console.log('Opening full lookbook');
        
        // Per ora, simuliamo un'apertura con un alert
        alert('Lookbook completo in fase di sviluppo');
    }
    
    // Event listener per il pulsante CTA
    if (lookbookCta) {
        lookbookCta.addEventListener('click', function(e) {
            e.preventDefault();
            openFullLookbook();
        });
    }
    
    // Inizializzare la galleria
    initLookbookGallery();
    
    // Stili CSS per la galleria
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .lookbook-slider {
            position: relative;
            width: 100%;
            height: 500px;
            overflow: hidden;
            border: 1px solid #00ff14;
            box-shadow: 0 0 20px rgba(0, 255, 20, 0.3);
        }
        
        .lookbook-slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity ${lookbookConfig.transitionSpeed}ms ease;
            cursor: pointer;
        }
        
        .lookbook-slide.active {
            opacity: 1;
            z-index: 1;
        }
        
        .lookbook-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
        
        .lookbook-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 20px;
            background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
            color: #fff;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lookbook-slide:hover .lookbook-overlay,
        .lookbook-slide.active .lookbook-overlay {
            opacity: 1;
        }
        
        .lookbook-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 24px;
            margin: 0;
            color: #00ff14;
            text-shadow: 0 0 10px rgba(0, 255, 20, 0.7);
        }
        
        .lookbook-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
        }
        
        .lookbook-nav-btn {
            background-color: #000;
            color: #00ff14;
            border: 1px solid #00ff14;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 18px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.3s ease;
        }
        
        .lookbook-nav-btn:hover {
            background-color: #00ff14;
            color: #000;
            box-shadow: 0 0 15px rgba(0, 255, 20, 0.7);
        }
        
        .lookbook-indicators {
            display: flex;
            gap: 10px;
        }
        
        .lookbook-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #333;
            border: 1px solid #00ff14;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .lookbook-indicator.active {
            background-color: #00ff14;
            box-shadow: 0 0 10px rgba(0, 255, 20, 0.7);
        }
        
        .lookbook-cta {
            display: inline-block;
            margin-top: 30px;
            padding: 12px 25px;
            background-color: transparent;
            color: #00ff14;
            border: 1px solid #00ff14;
            font-family: 'Orbitron', sans-serif;
            text-transform: uppercase;
            letter-spacing: 2px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
        }
        
        .lookbook-cta:hover {
            background-color: #00ff14;
            color: #000;
            box-shadow: 0 0 15px rgba(0, 255, 20, 0.7);
        }
        
        .lookbook-zoom-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            cursor: zoom-out;
        }
        
        .lookbook-zoom-img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
        }
        
        .lookbook-zoom-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background-color: transparent;
            color: #00ff14;
            border: none;
            font-size: 30px;
            cursor: pointer;
            z-index: 1001;
        }
        
        .no-scroll {
            overflow: hidden;
        }
        
        @media (max-width: 768px) {
            .lookbook-slider {
                height: 350px;
            }
            
            .lookbook-title {
                font-size: 18px;
            }
            
            .lookbook-nav-btn {
                width: 30px;
                height: 30px;
                font-size: 14px;
            }
            
            .lookbook-indicator {
                width: 8px;
                height: 8px;
            }
        }
    `;
    document.head.appendChild(styleSheet);
});

// Collections JavaScript per D3MAS1ADØ - Esperienza cinematografica

/**
 * D3MAS1ADØ - Collections JavaScript
 * 
 * Questo file gestisce la funzionalità della sezione Collezioni,
 * inclusi slider, espansione delle collezioni e animazioni correlate.
 * 
 * Il codice è strutturato in modo modulare per facilitare la manutenzione
 * e l'aggiornamento da parte del cliente.
 */

// Attendi che il DOM sia completamente caricato
document.addEventListener('DOMContentLoaded', function() {
    // Inizializza lo slider delle collezioni
    initCollectionsSlider();
    
    // Inizializza l'espansione delle collezioni
    initCollectionsExpand();
});

/**
 * Inizializza lo slider delle collezioni
 * Gestisce la navigazione tra le diverse collezioni
 */
function initCollectionsSlider() {
    // Elementi dello slider
    const collectionCards = document.querySelectorAll('.collection-card');
    const prevButton = document.querySelector('.prev-collection');
    const nextButton = document.querySelector('.next-collection');
    
    // Indice della collezione attiva
    let activeIndex = 0;
    
    // Se non ci sono collezioni, esci dalla funzione
    if (collectionCards.length === 0) return;
    
    // Imposta la prima collezione come attiva
    collectionCards[activeIndex].classList.add('active');
    
    // Aggiungi event listener ai pulsanti di navigazione
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', showPreviousCollection);
        nextButton.addEventListener('click', showNextCollection);
    }
    
    // Aggiungi swipe per dispositivi touch
    let touchStartX = 0;
    let touchEndX = 0;
    
    const collectionsContainer = document.querySelector('.collections-container');
    if (collectionsContainer) {
        collectionsContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        collectionsContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }
    
    /**
     * Gestisce lo swipe sullo slider delle collezioni
     */
    function handleSwipe() {
        // Calcola la distanza dello swipe
        const swipeDistance = touchEndX - touchStartX;
        
        // Se lo swipe è significativo (più di 50px)
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) {
                // Swipe verso destra -> collezione precedente
                showPreviousCollection();
            } else {
                // Swipe verso sinistra -> collezione successiva
                showNextCollection();
            }
        }
    }
    
    /**
     * Mostra la collezione precedente
     */
    function showPreviousCollection() {
        // Rimuovi le classi attuali
        collectionCards[activeIndex].classList.remove('active');
        collectionCards[activeIndex].classList.add('next');
        
        // Aggiorna l'indice (con loop)
        activeIndex = (activeIndex - 1 + collectionCards.length) % collectionCards.length;
        
        // Aggiorna le classi per la nuova collezione attiva
        collectionCards.forEach((card, index) => {
            if (index !== activeIndex) {
                card.classList.remove('prev', 'active');
                card.classList.add(index < activeIndex ? 'prev' : 'next');
            } else {
                card.classList.remove('prev', 'next');
                card.classList.add('active');
            }
        });
        
        // Riproduci suono di transizione se disponibile
        const transitionSound = document.getElementById('transition-sound');
        if (transitionSound) {
            transitionSound.currentTime = 0;
            transitionSound.play();
        }
    }
    
    /**
     * Mostra la collezione successiva
     */
    function showNextCollection() {
        // Rimuovi le classi attuali
        collectionCards[activeIndex].classList.remove('active');
        collectionCards[activeIndex].classList.add('prev');
        
        // Aggiorna l'indice (con loop)
        activeIndex = (activeIndex + 1) % collectionCards.length;
        
        // Aggiorna le classi per la nuova collezione attiva
        collectionCards.forEach((card, index) => {
            if (index !== activeIndex) {
                card.classList.remove('prev', 'active');
                card.classList.add(index < activeIndex ? 'prev' : 'next');
            } else {
                card.classList.remove('prev', 'next');
                card.classList.add('active');
            }
        });
        
        // Riproduci suono di transizione se disponibile
        const transitionSound = document.getElementById('transition-sound');
        if (transitionSound) {
            transitionSound.currentTime = 0;
            transitionSound.play();
        }
    }
    
    // Imposta un intervallo per cambiare automaticamente le collezioni (opzionale)
    // Decommentare per attivare
    /*
    const autoplayInterval = 5000; // 5 secondi
    let autoplayTimer = setInterval(showNextCollection, autoplayInterval);
    
    // Ferma l'autoplay quando l'utente interagisce con lo slider
    collectionsContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayTimer);
    });
    
    // Riprendi l'autoplay quando l'utente smette di interagire
    collectionsContainer.addEventListener('mouseleave', () => {
        autoplayTimer = setInterval(showNextCollection, autoplayInterval);
    });
    */
}

/**
 * Inizializza l'espansione delle collezioni
 * Gestisce l'apertura/chiusura della vista dettagliata delle collezioni
 */
function initCollectionsExpand() {
    // Elementi per l'espansione
    const collectionLinks = document.querySelectorAll('.collection-link');
    const expandedSections = document.querySelectorAll('.collection-expanded');
    const closeButtons = document.querySelectorAll('.close-expanded');
    
    // Aggiungi event listener ai link delle collezioni
    collectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Trova la collezione parent
            const collectionCard = this.closest('.collection-card');
            if (!collectionCard) return;
            
            // Trova la sezione espansa corrispondente
            const expandedSection = collectionCard.querySelector('.collection-expanded');
            if (!expandedSection) return;
            
            // Mostra la sezione espansa
            expandedSection.classList.add('active');
            
            // Disabilita lo scroll della pagina
            document.body.style.overflow = 'hidden';
            
            // Riproduci suono di apertura se disponibile
            const openSound = document.getElementById('open-sound');
            if (openSound) {
                openSound.currentTime = 0;
                openSound.play();
            }
        });
    });
    
    // Aggiungi event listener ai pulsanti di chiusura
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Trova la sezione espansa parent
            const expandedSection = this.closest('.collection-expanded');
            if (!expandedSection) return;
            
            // Nascondi la sezione espansa
            expandedSection.classList.remove('active');
            
            // Riabilita lo scroll della pagina
            document.body.style.overflow = '';
            
            // Riproduci suono di chiusura se disponibile
            const closeSound = document.getElementById('close-sound');
            if (closeSound) {
                closeSound.currentTime = 0;
                closeSound.play();
            }
        });
    });
    
    // Chiudi la sezione espansa quando si preme ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Trova la sezione espansa attiva
            const activeSection = document.querySelector('.collection-expanded.active');
            if (activeSection) {
                // Nascondi la sezione espansa
                activeSection.classList.remove('active');
                
                // Riabilita lo scroll della pagina
                document.body.style.overflow = '';
                
                // Riproduci suono di chiusura se disponibile
                const closeSound = document.getElementById('close-sound');
                if (closeSound) {
                    closeSound.currentTime = 0;
                    closeSound.play();
                }
            }
        }
    });
}

/**
 * Funzione per aggiungere una nuova collezione dinamicamente
 * Può essere utilizzata dal cliente per aggiungere collezioni in futuro
 * 
 * @param {Object} collectionData - Dati della collezione
 * @param {string} collectionData.id - ID univoco della collezione
 * @param {string} collectionData.title - Titolo della collezione
 * @param {string} collectionData.description - Descrizione breve della collezione
 * @param {string} collectionData.imagePath - Percorso dell'immagine principale
 * @param {string} collectionData.fullDescription - Descrizione completa per la vista espansa
 * @param {Array} collectionData.gallery - Array di percorsi immagine per la galleria
 */
function addCollection(collectionData) {
    // Verifica che i dati necessari siano presenti
    if (!collectionData || !collectionData.id || !collectionData.title) {
        console.error('Dati collezione incompleti');
        return;
    }
    
    // Crea l'elemento della collezione
    const collectionCard = document.createElement('div');
    collectionCard.className = 'collection-card';
    collectionCard.setAttribute('data-collection', collectionData.id);
    
    // Struttura HTML della collezione
    collectionCard.innerHTML = `
        <div class="collection-image">
            <div class="image-placeholder" data-image="${collectionData.id}">
                <!-- Immagine da inserire qui: ${collectionData.imagePath || `assets/images/collections/${collectionData.id}.jpg`} -->
            </div>
        </div>
        <div class="collection-info">
            <h3 class="collection-title">${collectionData.title}</h3>
            <p class="collection-description">${collectionData.description || ''}</p>
            <a href="#" class="collection-link">ESPLORA</a>
        </div>
        
        <!-- Contenuto espanso della collezione (visibile al click) -->
        <div class="collection-expanded">
            <div class="expanded-header">
                <h3>${collectionData.title}</h3>
                <button class="close-expanded">&times;</button>
            </div>
            <div class="expanded-content">
                <div class="expanded-description">
                    <p>${collectionData.fullDescription || collectionData.description || ''}</p>
                </div>
                <div class="expanded-gallery">
                    ${(collectionData.gallery || []).map((img, index) => `
                        <div class="gallery-item" data-image="${collectionData.id}-${index + 1}">
                            <!-- Immagine da inserire qui: ${img} -->
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Aggiungi la collezione al container
    const collectionsContainer = document.querySelector('.collections-container');
    if (collectionsContainer) {
        collectionsContainer.appendChild(collectionCard);
        
        // Reinizializza lo slider e l'espansione
        initCollectionsSlider();
        initCollectionsExpand();
    }
}

// Esporta le funzioni per l'uso esterno
window.d3masiado = window.d3masiado || {};
window.d3masiado.collections = {
    addCollection: addCollection
};

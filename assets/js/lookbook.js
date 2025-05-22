// Lookbook JavaScript per D3MAS1ADØ - Esperienza cinematografica

/**
 * D3MAS1ADØ - Lookbook JavaScript
 * 
 * Questo file gestisce la funzionalità della sezione Lookbook,
 * inclusi slider, riproduzione video e animazioni correlate.
 * 
 * Il codice è strutturato in modo modulare per facilitare la manutenzione
 * e l'aggiornamento da parte del cliente.
 */

// Attendi che il DOM sia completamente caricato
document.addEventListener('DOMContentLoaded', function() {
    // Inizializza lo slider del lookbook
    initLookbookSlider();
    
    // Inizializza la riproduzione video
    initVideoPlayback();
});

/**
 * Inizializza lo slider del lookbook
 * Gestisce la navigazione tra le diverse slide del lookbook
 */
function initLookbookSlider() {
    // Elementi dello slider
    const lookbookSlides = document.querySelectorAll('.lookbook-slide');
    const prevButton = document.querySelector('.prev-lookbook');
    const nextButton = document.querySelector('.next-lookbook');
    const dots = document.querySelectorAll('.lookbook-dots .dot');
    
    // Indice della slide attiva
    let activeIndex = 0;
    
    // Se non ci sono slide, esci dalla funzione
    if (lookbookSlides.length === 0) return;
    
    // Imposta la prima slide come attiva
    lookbookSlides[activeIndex].classList.add('active');
    
    // Aggiungi event listener ai pulsanti di navigazione
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', showPreviousSlide);
        nextButton.addEventListener('click', showNextSlide);
    }
    
    // Aggiungi event listener ai dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToSlide(index);
        });
    });
    
    // Aggiungi swipe per dispositivi touch
    let touchStartX = 0;
    let touchEndX = 0;
    
    const lookbookSlider = document.querySelector('.lookbook-slider');
    if (lookbookSlider) {
        lookbookSlider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        lookbookSlider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }
    
    /**
     * Gestisce lo swipe sullo slider del lookbook
     */
    function handleSwipe() {
        // Calcola la distanza dello swipe
        const swipeDistance = touchEndX - touchStartX;
        
        // Se lo swipe è significativo (più di 50px)
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) {
                // Swipe verso destra -> slide precedente
                showPreviousSlide();
            } else {
                // Swipe verso sinistra -> slide successiva
                showNextSlide();
            }
        }
    }
    
    /**
     * Mostra la slide precedente
     */
    function showPreviousSlide() {
        // Pausa eventuali video in riproduzione
        pauseAllVideos();
        
        // Rimuovi la classe attiva dalla slide corrente
        lookbookSlides[activeIndex].classList.remove('active');
        
        // Aggiorna l'indice (con loop)
        activeIndex = (activeIndex - 1 + lookbookSlides.length) % lookbookSlides.length;
        
        // Aggiungi la classe attiva alla nuova slide
        lookbookSlides[activeIndex].classList.add('active');
        
        // Aggiorna i dots
        updateDots();
        
        // Riproduci suono di transizione se disponibile
        const transitionSound = document.getElementById('transition-sound');
        if (transitionSound) {
            transitionSound.currentTime = 0;
            transitionSound.play();
        }
    }
    
    /**
     * Mostra la slide successiva
     */
    function showNextSlide() {
        // Pausa eventuali video in riproduzione
        pauseAllVideos();
        
        // Rimuovi la classe attiva dalla slide corrente
        lookbookSlides[activeIndex].classList.remove('active');
        
        // Aggiorna l'indice (con loop)
        activeIndex = (activeIndex + 1) % lookbookSlides.length;
        
        // Aggiungi la classe attiva alla nuova slide
        lookbookSlides[activeIndex].classList.add('active');
        
        // Aggiorna i dots
        updateDots();
        
        // Riproduci suono di transizione se disponibile
        const transitionSound = document.getElementById('transition-sound');
        if (transitionSound) {
            transitionSound.currentTime = 0;
            transitionSound.play();
        }
    }
    
    /**
     * Va a una slide specifica
     */
    function goToSlide(index) {
        // Se l'indice è uguale a quello attivo, non fare nulla
        if (index === activeIndex) return;
        
        // Pausa eventuali video in riproduzione
        pauseAllVideos();
        
        // Rimuovi la classe attiva dalla slide corrente
        lookbookSlides[activeIndex].classList.remove('active');
        
        // Aggiorna l'indice
        activeIndex = index;
        
        // Aggiungi la classe attiva alla nuova slide
        lookbookSlides[activeIndex].classList.add('active');
        
        // Aggiorna i dots
        updateDots();
        
        // Riproduci suono di transizione se disponibile
        const transitionSound = document.getElementById('transition-sound');
        if (transitionSound) {
            transitionSound.currentTime = 0;
            transitionSound.play();
        }
    }
    
    /**
     * Aggiorna lo stato dei dots
     */
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    /**
     * Pausa tutti i video in riproduzione
     */
    function pauseAllVideos() {
        const videos = document.querySelectorAll('.lookbook-video video');
        videos.forEach(video => {
            if (!video.paused) {
                video.pause();
                
                // Mostra nuovamente il pulsante play
                const playButton = video.parentElement.querySelector('.video-play-button');
                if (playButton) {
                    playButton.style.opacity = '1';
                }
            }
        });
    }
    
    // Imposta un intervallo per cambiare automaticamente le slide (opzionale)
    // Decommentare per attivare
    /*
    const autoplayInterval = 5000; // 5 secondi
    let autoplayTimer = setInterval(showNextSlide, autoplayInterval);
    
    // Ferma l'autoplay quando l'utente interagisce con lo slider
    lookbookSlider.addEventListener('mouseenter', () => {
        clearInterval(autoplayTimer);
    });
    
    // Riprendi l'autoplay quando l'utente smette di interagire
    lookbookSlider.addEventListener('mouseleave', () => {
        autoplayTimer = setInterval(showNextSlide, autoplayInterval);
    });
    */
}

/**
 * Inizializza la riproduzione video
 * Gestisce la riproduzione/pausa dei video nel lookbook
 */
function initVideoPlayback() {
    // Elementi video
    const videoSlides = document.querySelectorAll('.video-slide');
    
    videoSlides.forEach(slide => {
        const video = slide.querySelector('video');
        const playButton = slide.querySelector('.video-play-button');
        
        if (video && playButton) {
            // Aggiungi event listener al pulsante play
            playButton.addEventListener('click', function() {
                if (video.paused) {
                    // Pausa tutti gli altri video
                    pauseAllVideosExcept(video);
                    
                    // Riproduci questo video
                    video.play();
                    
                    // Nascondi il pulsante play
                    this.style.opacity = '0';
                } else {
                    // Pausa il video
                    video.pause();
                    
                    // Mostra il pulsante play
                    this.style.opacity = '1';
                }
            });
            
            // Aggiungi event listener per la fine del video
            video.addEventListener('ended', function() {
                // Mostra il pulsante play
                playButton.style.opacity = '1';
                
                // Riavvolgi il video
                video.currentTime = 0;
            });
        }
    });
    
    /**
     * Pausa tutti i video tranne quello specificato
     */
    function pauseAllVideosExcept(exceptVideo) {
        const videos = document.querySelectorAll('.lookbook-video video');
        videos.forEach(video => {
            if (video !== exceptVideo && !video.paused) {
                video.pause();
                
                // Mostra nuovamente il pulsante play
                const playButton = video.parentElement.querySelector('.video-play-button');
                if (playButton) {
                    playButton.style.opacity = '1';
                }
            }
        });
    }
}

/**
 * Funzione per aggiungere una nuova slide al lookbook dinamicamente
 * Può essere utilizzata dal cliente per aggiungere slide in futuro
 * 
 * @param {Object} slideData - Dati della slide
 * @param {string} slideData.type - Tipo di slide ('image' o 'video')
 * @param {string} slideData.imagePath - Percorso dell'immagine (per slide di tipo 'image')
 * @param {string} slideData.videoPath - Percorso del video (per slide di tipo 'video')
 * @param {string} slideData.title - Titolo della slide
 * @param {string} slideData.description - Descrizione della slide
 * @param {number} slideData.position - Posizione della slide (opzionale, default: alla fine)
 */
function addLookbookSlide(slideData) {
    // Verifica che i dati necessari siano presenti
    if (!slideData || !slideData.type || (!slideData.imagePath && !slideData.videoPath)) {
        console.error('Dati slide incompleti');
        return;
    }
    
    // Crea l'elemento della slide
    const slide = document.createElement('div');
    slide.className = 'lookbook-slide';
    
    if (slideData.type === 'video') {
        slide.classList.add('video-slide');
        
        // Struttura HTML per slide video
        slide.innerHTML = `
            <div class="lookbook-video">
                <video class="video-element" muted loop data-video="${slideData.videoPath.split('/').pop().split('.')[0]}">
                    <!-- Video da inserire qui: ${slideData.videoPath} -->
                </video>
                <div class="video-play-button">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="lookbook-caption">
                <h3>${slideData.title || 'Titolo Video'}</h3>
                <p>${slideData.description || 'Descrizione breve del video lookbook.'}</p>
            </div>
        `;
    } else {
        // Struttura HTML per slide immagine
        slide.innerHTML = `
            <div class="lookbook-image" data-image="${slideData.imagePath.split('/').pop().split('.')[0]}">
                <!-- Immagine da inserire qui: ${slideData.imagePath} -->
            </div>
            <div class="lookbook-caption">
                <h3>${slideData.title || 'Titolo Lookbook'}</h3>
                <p>${slideData.description || 'Descrizione breve del lookbook.'}</p>
            </div>
        `;
    }
    
    // Aggiungi la slide al container
    const lookbookSlider = document.querySelector('.lookbook-slider');
    if (lookbookSlider) {
        // Se è specificata una posizione, inserisci la slide in quella posizione
        if (typeof slideData.position === 'number') {
            const slides = lookbookSlider.querySelectorAll('.lookbook-slide');
            if (slideData.position >= 0 && slideData.position < slides.length) {
                lookbookSlider.insertBefore(slide, slides[slideData.position]);
            } else {
                lookbookSlider.appendChild(slide);
            }
        } else {
            // Altrimenti, aggiungi la slide alla fine
            lookbookSlider.appendChild(slide);
        }
        
        // Aggiungi un nuovo dot
        const dotsContainer = document.querySelector('.lookbook-dots');
        if (dotsContainer) {
            const newDot = document.createElement('span');
            newDot.className = 'dot';
            newDot.setAttribute('data-slide', dotsContainer.children.length);
            dotsContainer.appendChild(newDot);
        }
        
        // Reinizializza lo slider e la riproduzione video
        initLookbookSlider();
        initVideoPlayback();
    }
}

// Esporta le funzioni per l'uso esterno
window.d3masiado = window.d3masiado || {};
window.d3masiado.lookbook = {
    addLookbookSlide: addLookbookSlide
};

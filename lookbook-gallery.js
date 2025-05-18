/**
 * D3MAS1ADØ - Galleria Lookbook Interattiva
 * 
 * Questo script implementa una galleria interattiva per la sezione Lookbook
 * con effetti di transizione, zoom e navigazione avanzata.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Configurazione galleria
  const lookbookConfig = {
    containerId: 'lookbook-gallery',
    images: [
      {
        src: 'images/lookbook/lookbook-1.jpg',
        alt: 'D3MAS1ADØ Lookbook - Urban Attitude',
        caption: 'Urban Attitude - D3MAS1ADØ FW25'
      },
      {
        src: 'images/lookbook/lookbook-2.jpg',
        alt: 'D3MAS1ADØ Lookbook - Street Culture',
        caption: 'Street Culture - D3MAS1ADØ FW25'
      },
      {
        src: 'images/lookbook/lookbook-3.jpg',
        alt: 'D3MAS1ADØ Lookbook - Luxury Details',
        caption: 'Luxury Details - D3MAS1ADØ FW25'
      },
      {
        src: 'images/lookbook/lookbook-4.jpg',
        alt: 'D3MAS1ADØ Lookbook - Urban Luxury',
        caption: 'Urban Luxury - D3MAS1ADØ FW25'
      },
      {
        src: 'images/lookbook/lookbook-5.jpg',
        alt: 'D3MAS1ADØ Lookbook - Concrete Jungle',
        caption: 'Concrete Jungle - D3MAS1ADØ FW25'
      }
    ],
    autoplay: true,
    autoplaySpeed: 5000,
    showCaptions: true,
    showControls: true,
    showThumbnails: true,
    enableZoom: true,
    enableFullscreen: true
  };
  
  /**
   * Inizializza la galleria Lookbook
   */
  function initLookbookGallery() {
    // Cerca la sezione Lookbook esistente
    const lookbookSection = findLookbookSection();
    
    if (!lookbookSection) {
      console.warn('Sezione Lookbook non trovata. La galleria non può essere inizializzata.');
      return;
    }
    
    // Crea il container della galleria se non esiste
    let galleryContainer = document.getElementById(lookbookConfig.containerId);
    if (!galleryContainer) {
      galleryContainer = createGalleryContainer();
      lookbookSection.appendChild(galleryContainer);
    }
    
    // Popola la galleria con le immagini
    populateGallery(galleryContainer);
    
    // Aggiungi stili CSS
    addGalleryStyles();
    
    // Inizializza funzionalità interattive
    initGalleryInteractions(galleryContainer);
  }
  
  /**
   * Trova la sezione Lookbook esistente
   */
  function findLookbookSection() {
    // Cerca per titolo
    const lookbookHeadings = Array.from(document.querySelectorAll('h2, h3, h4')).filter(
      heading => heading.textContent.toLowerCase().includes('lookbook')
    );
    
    if (lookbookHeadings.length > 0) {
      // Trova il container parent più appropriato
      let section = lookbookHeadings[0].closest('section') || lookbookHeadings[0].parentElement;
      return section;
    }
    
    // Cerca per ID o classe
    const lookbookByIdOrClass = document.querySelector('#lookbook, .lookbook, [data-section="lookbook"]');
    if (lookbookByIdOrClass) {
      return lookbookByIdOrClass;
    }
    
    // Fallback: crea una nuova sezione
    const newSection = document.createElement('section');
    newSection.id = 'lookbook';
    newSection.innerHTML = '<h2>LOOKBOOK</h2>';
    
    // Inserisci dopo la sezione Manifesto o prima di Unidad-31Ø
    const manifestoSection = Array.from(document.querySelectorAll('h2, h3, h4')).find(
      heading => heading.textContent.toLowerCase().includes('manifesto')
    );
    
    if (manifestoSection) {
      const parentSection = manifestoSection.closest('section') || manifestoSection.parentElement;
      parentSection.parentNode.insertBefore(newSection, parentSection.nextSibling);
    } else {
      // Fallback: aggiungi alla fine del contenuto principale
      const mainContent = document.querySelector('main') || document.querySelector('#root') || document.body;
      mainContent.appendChild(newSection);
    }
    
    return newSection;
  }
  
  /**
   * Crea il container della galleria
   */
  function createGalleryContainer() {
    const container = document.createElement('div');
    container.id = lookbookConfig.containerId;
    container.className = 'lookbook-gallery';
    return container;
  }
  
  /**
   * Popola la galleria con le immagini
   */
  function populateGallery(container) {
    // Struttura base della galleria
    container.innerHTML = `
      <div class="gallery-main">
        <div class="gallery-viewport">
          <div class="gallery-slides"></div>
          <div class="gallery-caption"></div>
        </div>
        <div class="gallery-controls">
          <button class="gallery-prev" aria-label="Immagine precedente">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
            </svg>
          </button>
          <button class="gallery-next" aria-label="Immagine successiva">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="gallery-thumbnails"></div>
    `;
    
    // Popola le slides
    const slidesContainer = container.querySelector('.gallery-slides');
    const thumbnailsContainer = container.querySelector('.gallery-thumbnails');
    
    lookbookConfig.images.forEach((image, index) => {
      // Crea slide
      const slide = document.createElement('div');
      slide.className = 'gallery-slide';
      slide.dataset.index = index;
      if (index === 0) slide.classList.add('active');
      
      slide.innerHTML = `
        <div class="slide-image-container">
          <img src="${image.src}" alt="${image.alt}" class="slide-image" loading="lazy">
        </div>
      `;
      
      slidesContainer.appendChild(slide);
      
      // Crea thumbnail
      if (lookbookConfig.showThumbnails) {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'gallery-thumbnail';
        thumbnail.dataset.index = index;
        if (index === 0) thumbnail.classList.add('active');
        
        thumbnail.innerHTML = `<img src="${image.src}" alt="${image.alt}" loading="lazy">`;
        thumbnailsContainer.appendChild(thumbnail);
      }
    });
    
    // Imposta la prima caption
    if (lookbookConfig.showCaptions) {
      const captionContainer = container.querySelector('.gallery-caption');
      captionContainer.textContent = lookbookConfig.images[0].caption;
    }
  }
  
  /**
   * Aggiungi stili CSS per la galleria
   */
  function addGalleryStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .lookbook-gallery {
        width: 100%;
        max-width: 1200px;
        margin: 2rem auto;
        background-color: rgba(0, 0, 0, 0.8);
        border: 1px solid rgba(57, 255, 20, 0.3);
      }
      
      .gallery-main {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%; /* 16:9 aspect ratio */
        overflow: hidden;
      }
      
      .gallery-viewport {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      
      .gallery-slides {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      
      .gallery-slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.5s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .gallery-slide.active {
        opacity: 1;
        z-index: 1;
      }
      
      .slide-image-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .slide-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
      
      .gallery-caption {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 1rem;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        font-family: 'Orbitron', sans-serif;
        transform: translateY(100%);
        transition: transform 0.3s ease;
        z-index: 2;
      }
      
      .gallery-viewport:hover .gallery-caption {
        transform: translateY(0);
      }
      
      .gallery-controls {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 3;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .gallery-main:hover .gallery-controls {
        opacity: 1;
      }
      
      .gallery-prev,
      .gallery-next {
        background-color: rgba(0, 0, 0, 0.5);
        border: none;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin: 0 1rem;
        transition: background-color 0.3s ease, transform 0.3s ease;
      }
      
      .gallery-prev:hover,
      .gallery-next:hover {
        background-color: rgba(57, 255, 20, 0.7);
        color: black;
        transform: scale(1.1);
      }
      
      .gallery-thumbnails {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5rem;
        padding: 1rem;
        background-color: rgba(0, 0, 0, 0.8);
      }
      
      .gallery-thumbnail {
        width: 80px;
        height: 60px;
        cursor: pointer;
        border: 2px solid transparent;
        transition: border-color 0.3s ease, transform 0.3s ease;
        overflow: hidden;
      }
      
      .gallery-thumbnail.active {
        border-color: #39FF14;
      }
      
      .gallery-thumbnail:hover {
        transform: scale(1.05);
      }
      
      .gallery-thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      /* Responsive */
      @media (max-width: 768px) {
        .gallery-thumbnails {
          gap: 0.25rem;
          padding: 0.5rem;
        }
        
        .gallery-thumbnail {
          width: 60px;
          height: 45px;
        }
        
        .gallery-prev,
        .gallery-next {
          width: 32px;
          height: 32px;
          margin: 0 0.5rem;
        }
      }
      
      /* Zoom effect */
      .slide-image.zoomed {
        cursor: zoom-out;
        transform: scale(1.5);
        transition: transform 0.3s ease;
      }
      
      .slide-image:not(.zoomed) {
        cursor: zoom-in;
        transition: transform 0.3s ease;
      }
    `;
    
    document.head.appendChild(style);
  }
  
  /**
   * Inizializza le interazioni della galleria
   */
  function initGalleryInteractions(container) {
    const slides = container.querySelectorAll('.gallery-slide');
    const thumbnails = container.querySelectorAll('.gallery-thumbnail');
    const prevButton = container.querySelector('.gallery-prev');
    const nextButton = container.querySelector('.gallery-next');
    const captionContainer = container.querySelector('.gallery-caption');
    
    let currentIndex = 0;
    let autoplayInterval;
    
    // Funzione per mostrare una slide specifica
    function showSlide(index) {
      // Normalizza l'indice
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      
      // Aggiorna slide attiva
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');
      
      // Aggiorna thumbnail attiva
      thumbnails.forEach(thumb => thumb.classList.remove('active'));
      if (thumbnails[index]) thumbnails[index].classList.add('active');
      
      // Aggiorna caption
      if (lookbookConfig.showCaptions && captionContainer) {
        captionContainer.textContent = lookbookConfig.images[index].caption;
      }
      
      currentIndex = index;
    }
    
    // Event listeners per i controlli
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        showSlide(currentIndex - 1);
        resetAutoplay();
      });
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        showSlide(currentIndex + 1);
        resetAutoplay();
      });
    }
    
    // Event listeners per le thumbnails
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
        const index = parseInt(thumbnail.dataset.index);
        showSlide(index);
        resetAutoplay();
      });
    });
    
    // Zoom sulle immagini
    if (lookbookConfig.enableZoom) {
      slides.forEach(slide => {
        const image = slide.querySelector('.slide-image');
        if (image) {
          image.addEventListener('click', () => {
            image.classList.toggle('zoomed');
          });
        }
      });
    }
    
    // Autoplay
    function startAutoplay() {
      if (lookbookConfig.autoplay && slides.length > 1) {
        autoplayInterval = setInterval(() => {
          showSlide(currentIndex + 1);
        }, lookbookConfig.autoplaySpeed);
      }
    }
    
    function resetAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        startAutoplay();
      }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', event => {
      if (container.closest('body')) { // Check if gallery is in DOM
        if (event.key === 'ArrowLeft') {
          showSlide(currentIndex - 1);
          resetAutoplay();
        } else if (event.key === 'ArrowRight') {
          showSlide(currentIndex + 1);
          resetAutoplay();
        }
      }
    });
    
    // Start autoplay
    startAutoplay();
  }
  
  // Inizializza la galleria
  initLookbookGallery();
  
  // Esponi API pubblica
  window.D3MASIADO_LOOKBOOK = {
    init: initLookbookGallery
  };
});

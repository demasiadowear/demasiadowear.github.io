// animations.js
/**
 * D3MAS1ADØ - Animazioni Premium
 * 
 * Questo script gestisce:
 * - Effetto glitch animato sul logo
 * - Transizioni fluide tra sezioni
 * - Micro-interazioni al passaggio del mouse/touch
 */

document.addEventListener('DOMContentLoaded', function() {
  // Configurazione
  const config = {
    glitchIntensity: 0.7,    // Intensità dell'effetto glitch (0-1)
    glitchFrequency: 0.3,    // Frequenza dell'effetto glitch (0-1)
    scrollAnimationDuration: 800,  // Durata delle animazioni di scroll in ms
    colorPrimary: '#39FF14',  // Verde neon
    colorBackground: '#000000'  // Nero
  };
  
  /**
   * Inizializza tutte le animazioni
   */
  function init() {
    // Inizializza l'effetto glitch sul logo
    initLogoGlitch();
    
    // Inizializza le transizioni fluide tra sezioni
    initSmoothScrolling();
    
    // Inizializza le animazioni di scroll
    initScrollAnimations();
    
    // Inizializza le micro-interazioni
    initMicroInteractions();
    
    console.log('D3MAS1ADØ animations initialized');
  }
  
  /**
   * Inizializza l'effetto glitch sul logo
   */
  function initLogoGlitch() {
    // Seleziona tutti i loghi con classe .logo o #logo
    const logos = document.querySelectorAll('.logo, #logo, .brand-logo');
    
    logos.forEach(logo => {
      // Crea i layer per l'effetto glitch
      createGlitchLayers(logo);
      
      // Avvia l'animazione glitch
      startGlitchAnimation(logo);
    });
  }
  
  /**
   * Crea i layer necessari per l'effetto glitch
   */
  function createGlitchLayers(element) {
    // Salva il contenuto originale
    const originalContent = element.innerHTML;
    const originalClasses = element.className;
    
    // Svuota l'elemento
    element.innerHTML = '';
    
    // Crea il container per l'effetto glitch
    const glitchContainer = document.createElement('div');
    glitchContainer.className = 'glitch-container';
    
    // Crea i layer
    const baseLayer = document.createElement('div');
    baseLayer.className = 'glitch-base ' + originalClasses;
    baseLayer.innerHTML = originalContent;
    
    const redLayer = document.createElement('div');
    redLayer.className = 'glitch-layer glitch-red ' + originalClasses;
    redLayer.innerHTML = originalContent;
    
    const blueLayer = document.createElement('div');
    blueLayer.className = 'glitch-layer glitch-blue ' + originalClasses;
    blueLayer.innerHTML = originalContent;
    
    const greenLayer = document.createElement('div');
    greenLayer.className = 'glitch-layer glitch-green ' + originalClasses;
    greenLayer.innerHTML = originalContent;
    
    // Assembla i layer
    glitchContainer.appendChild(baseLayer);
    glitchContainer.appendChild(redLayer);
    glitchContainer.appendChild(blueLayer);
    glitchContainer.appendChild(greenLayer);
    
    // Inserisci il container nell'elemento originale
    element.appendChild(glitchContainer);
    
    // Aggiungi stili CSS
    addGlitchStyles();
  }
  
  /**
   * Avvia l'animazione glitch
   */
  function startGlitchAnimation(element) {
    const redLayer = element.querySelector('.glitch-red');
    const blueLayer = element.querySelector('.glitch-blue');
    const greenLayer = element.querySelector('.glitch-green');
    
    // Funzione per generare un effetto glitch casuale
    function randomGlitch() {
      // Salta alcuni frame per rendere l'effetto più naturale
      if (Math.random() > config.glitchFrequency) return;
      
      // Calcola offset casuali per ogni layer
      const offsetX = Math.random() * 10 - 5;
      const offsetY = Math.random() * 10 - 5;
      const scaleX = 1 + (Math.random() * 0.1 - 0.05);
      const scaleY = 1 + (Math.random() * 0.1 - 0.05);
      
      // Applica trasformazioni ai layer
      if (redLayer) {
        redLayer.style.transform = `translate(${offsetX * 0.5}px, ${offsetY * 0.5}px) scale(${scaleX}, ${scaleY})`;
        redLayer.style.opacity = Math.random() * config.glitchIntensity;
      }
      
      if (blueLayer) {
        blueLayer.style.transform = `translate(${-offsetX * 0.7}px, ${offsetY * 0.3}px) scale(${scaleX * 0.95}, ${scaleY * 1.05})`;
        blueLayer.style.opacity = Math.random() * config.glitchIntensity;
      }
      
      if (greenLayer) {
        greenLayer.style.transform = `translate(${offsetX * 0.3}px, ${-offsetY * 0.6}px) scale(${scaleX * 1.05}, ${scaleY * 0.95})`;
        greenLayer.style.opacity = Math.random() * config.glitchIntensity;
      }
      
      // Ripristina dopo un breve intervallo
      setTimeout(() => {
        if (redLayer) {
          redLayer.style.transform = 'translate(0, 0) scale(1, 1)';
          redLayer.style.opacity = 0;
        }
        
        if (blueLayer) {
          blueLayer.style.transform = 'translate(0, 0) scale(1, 1)';
          blueLayer.style.opacity = 0;
        }
        
        if (greenLayer) {
          greenLayer.style.transform = 'translate(0, 0) scale(1, 1)';
          greenLayer.style.opacity = 0;
        }
      }, 50 + Math.random() * 200);
    }
    
    // Avvia l'animazione a intervalli casuali
    setInterval(randomGlitch, 2000 + Math.random() * 4000);
    
    // Trigger iniziale
    setTimeout(randomGlitch, 1000);
    
    // Trigger al passaggio del mouse
    element.addEventListener('mouseenter', () => {
      for (let i = 0; i < 3; i++) {
        setTimeout(randomGlitch, i * 100);
      }
    });
  }
  
  /**
   * Aggiunge gli stili CSS per l'effetto glitch
   */
  function addGlitchStyles() {
    // Verifica se gli stili sono già stati aggiunti
    if (document.getElementById('glitch-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'glitch-styles';
    style.textContent = `
      .glitch-container {
        position: relative;
        display: inline-block;
        transform-style: preserve-3d;
      }
      
      .glitch-base {
        position: relative;
        z-index: 1;
      }
      
      .glitch-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        mix-blend-mode: screen;
        pointer-events: none;
        transition: transform 0.1s ease, opacity 0.1s ease;
      }
      
      .glitch-red {
        color: #FF0040;
        z-index: 2;
      }
      
      .glitch-blue {
        color: #0040FF;
        z-index: 3;
      }
      
      .glitch-green {
        color: ${config.colorPrimary};
        z-index: 4;
      }
    `;
    
    document.head.appendChild(style);
  }
  
  /**
   * Inizializza lo scrolling fluido tra sezioni
   */
  function initSmoothScrolling() {
    // Seleziona tutti i link interni
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Previeni il comportamento predefinito
        e.preventDefault();
        
        // Ottieni l'ID della destinazione
        const targetId = this.getAttribute('href');
        
        // Salta se l'ID è solo "#"
        if (targetId === '#') return;
        
        // Trova l'elemento di destinazione
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Calcola la posizione di destinazione
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          
          // Esegui lo scroll fluido
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Aggiorna l'URL senza ricaricare la pagina
          history.pushState(null, null, targetId);
        }
      });
    });
  }
  
  /**
   * Inizializza le animazioni di scroll
   */
  function initScrollAnimations() {
    // Seleziona tutti gli elementi con attributo data-animate
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    // Configura l'Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Aggiungi la classe per avviare l'animazione
          entry.target.classList.add('animated');
          
          // Smetti di osservare l'elemento dopo l'animazione
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,  // Avvia l'animazione quando almeno il 10% dell'elemento è visibile
      rootMargin: '0px 0px -100px 0px'  // Margine negativo per anticipare l'animazione
    });
    
    // Osserva tutti gli elementi
    animatedElements.forEach(element => {
      // Aggiungi la classe di base
      element.classList.add('animate-ready');
      
      // Aggiungi la classe specifica in base al tipo di animazione
      const animationType = element.getAttribute('data-animate');
      if (animationType) {
        element.classList.add(`animate-${animationType}`);
      }
      
      // Inizia a osservare l'elemento
      observer.observe(element);
    });
    
    // Aggiungi stili CSS per le animazioni
    addScrollAnimationStyles();
  }
  
  /**
   * Aggiunge gli stili CSS per le animazioni di scroll
   */
  function addScrollAnimationStyles() {
    // Verifica se gli stili sono già stati aggiunti
    if (document.getElementById('scroll-animation-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'scroll-animation-styles';
    style.textContent = `
      .animate-ready {
        opacity: 0;
        transition: opacity ${config.scrollAnimationDuration}ms ease,
                    transform ${config.scrollAnimationDuration}ms ease;
      }
      
      .animate-fade-in {
        opacity: 0;
      }
      
      .animate-fade-in.animated {
        opacity: 1;
      }
      
      .animate-fade-up {
        opacity: 0;
        transform: translateY(30px);
      }
      
      .animate-fade-up.animated {
        opacity: 1;
        transform: translateY(0);
      }
      
      .animate-fade-down {
        opacity: 0;
        transform: translateY(-30px);
      }
      
      .animate-fade-down.animated {
        opacity: 1;
        transform: translateY(0);
      }
      
      .animate-fade-left {
        opacity: 0;
        transform: translateX(30px);
      }
      
      .animate-fade-left.animated {
        opacity: 1;
        transform: translateX(0);
      }
      
      .animate-fade-right {
        opacity: 0;
        transform: translateX(-30px);
      }
      
      .animate-fade-right.animated {
        opacity: 1;
        transform: translateX(0);
      }
      
      .animate-zoom-in {
        opacity: 0;
        transform: scale(0.9);
      }
      
      .animate-zoom-in.animated {
        opacity: 1;
        transform: scale(1);
      }
      
      .animate-zoom-out {
        opacity: 0;
        transform: scale(1.1);
      }
      
      .animate-zoom-out.animated {
        opacity: 1;
        transform: scale(1);
      }
      
      /* Ritardi per animazioni in sequenza */
      .animate-delay-100 { transition-delay: 100ms; }
      .animate-delay-200 { transition-delay: 200ms; }
      .animate-delay-300 { transition-delay: 300ms; }
      .animate-delay-400 { transition-delay: 400ms; }
      .animate-delay-500 { transition-delay: 500ms; }
    `;
    
    document.head.appendChild(style);
  }
  
  /**
   * Inizializza le micro-interazioni
   */
  function initMicroInteractions() {
    // Aggiungi effetti hover ai pulsanti
    initButtonHoverEffects();
    
    // Aggiungi effetti hover alle immagini
    initImageHoverEffects();
    
    // Aggiungi effetti di parallasse
    initParallaxEffects();
  }
  
  /**
   * Inizializza gli effetti hover sui pulsanti
   */
  function initButtonHoverEffects() {
    // Seleziona tutti i pulsanti e link
    const buttons = document.querySelectorAll('button, .btn, .button, a.cta');
    
    buttons.forEach(button => {
      // Aggiungi la classe per gli effetti hover
      button.classList.add('hover-effect');
    });
    
    // Aggiungi stili CSS per gli effetti hover
    addButtonHoverStyles();
  }
  
  /**
   * Aggiunge gli stili CSS per gli effetti hover sui pulsanti
   */
  function addButtonHoverStyles() {
    // Verifica se gli stili sono già stati aggiunti
    if (document.getElementById('button-hover-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'button-hover-styles';
    style.textContent = `
      .hover-effect {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
      }
      
      .hover-effect::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${config.colorPrimary};
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: -1;
      }
      
      .hover-effect:hover {
        color: ${config.colorBackground};
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(57, 255, 20, 0.3);
      }
      
      .hover-effect:hover::before {
        opacity: 1;
        transform: scale(1);
      }
      
      .hover-effect:active {
        transform: translateY(1px);
      }
    `;
    
    document.head.appendChild(style);
  }
  
  /**
   * Inizializza gli effetti hover sulle immagini
   */
  function initImageHoverEffects() {
    // Seleziona tutte le immagini in container specifici
    const images = document.querySelectorAll('.product-image img, .gallery-image img, .lookbook-image img');
    
    images.forEach(image => {
      // Crea un container per l'effetto se non esiste già
      if (!image.parentElement.classList.contains('image-hover-container')) {
        const container = document.createElement('div');
        container.className = 'image-hover-container';
        
        // Sposta l'immagine nel nuovo container
        image.parentElement.insertBefore(container, image);
        container.appendChild(image);
      }
    });
    
    // Aggiungi stili CSS per gli effetti hover
    addImageHoverStyles();
  }
  
  /**
   * Aggiunge gli stili CSS per gli effetti hover sulle immagini
   */
  function addImageHoverStyles() {
    // Verifica se gli stili sono già stati aggiunti
    if (document.getElementById('image-hover-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'image-hover-styles';
    style.textContent = `
      .image-hover-container {
        position: relative;
        overflow: hidden;
        display: block;
      }
      
      .image-hover-container img {
        transition: transform 0.5s ease, filter 0.5s ease;
        display: block;
        width: 100%;
        height: auto;
      }
      
      .image-hover-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${config.colorPrimary};
        opacity: 0;
        mix-blend-mode: overlay;
        transition: opacity 0.5s ease;
        z-index: 1;
        pointer-events: none;
      }
      
      .image-hover-container:hover img {
        transform: scale(1.05);
        filter: contrast(1.1);
      }
      
      .image-hover-container:hover::before {
        opacity: 0.2;
      }
    `;
    
    document.head.appendChild(style);
  }
  
  /**
   * Inizializza gli effetti di parallasse
   */
  function initParallaxEffects() {
    // Seleziona tutti gli elementi con attributo data-parallax
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    // Funzione per aggiornare la posizione degli elementi
    function updateParallaxPositions() {
      const scrollTop = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-parallax')) || 0.2;
        const offset = scrollTop * speed;
        
        element.style.transform = `translateY(${offset}px)`;
      });
    }
    
    // Aggiungi listener per lo scroll
    window.addEventListener('scroll', updateParallaxPositions);
    
    // Aggiorna le posizioni iniziali
    updateParallaxPositions();
  }
  
  // Inizializza tutte le animazioni
  init();
});

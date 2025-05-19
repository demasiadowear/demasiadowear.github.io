/**
 * D3MAS1ADØ - Correzioni e Integrazioni Sanity
 * 
 * Questo file implementa tutte le correzioni richieste da Christian e integra
 * il sito con Sanity CMS per la gestione autonoma dei contenuti.
 */

// Importa le API Sanity
import { SanityAPI } from './sanity-api.js';

// Costanti
const NEON_GREEN = '#39FF14';

/**
 * Inizializza le correzioni e le integrazioni
 */
function init() {
  console.log('Inizializzazione correzioni e integrazioni D3MAS1ADØ...');
  
  // Applica tutte le correzioni richieste
  applyFixes();
  
  // Inizializza l'integrazione con Sanity
  initSanityIntegration();
  
  // Aggiungi la sezione recensioni
  addReviewsSection();
  
  // Aggiungi il micro-testo per Lana AI
  addLanaAiText();
  
  console.log('Correzioni e integrazioni completate!');
}

/**
 * Applica tutte le correzioni richieste
 */
function applyFixes() {
  // 1. Rimuovi la scritta in alto a sinistra "D3MAS1ADØ"
  removeHeaderLogo();
  
  // 2. Ripristina l'effetto "respiro" e glitch verde neon sul logo centrale
  enhanceMainLogo();
  
  // 3. Rimuovi la scritta scroll automatica nella hero section
  removeScrollText();
  
  // 4. Ripristina le immagini delle collezioni
  restoreCollectionImages();
  
  // 5. Correggi i tasti "ESPLORA" sotto ogni collezione
  fixExploreButtons();
  
  // 6. Rimuovi la felpa non autorizzata dal lookbook
  removeUnauthorizedItems();
  
  // 7. Correggi il pulsante "LEGGI IL MANIFESTO COMPLETO"
  fixManifestoButton();
  
  // 8. Rendi tutti i pulsanti cliccabili verde neon DEM
  applyNeonGreenToButtons();
}

/**
 * Rimuove la scritta in alto a sinistra "D3MAS1ADØ"
 */
function removeHeaderLogo() {
  const headerLogo = document.querySelector('.logo');
  if (headerLogo) {
    headerLogo.style.display = 'none';
  }
}

/**
 * Ripristina l'effetto "respiro" e glitch verde neon sul logo centrale
 */
function enhanceMainLogo() {
  const logoContainer = document.querySelector('.logo-container');
  if (!logoContainer) return;
  
  // Assicurati che il logo sia visibile e centrato
  logoContainer.style.position = 'relative';
  logoContainer.style.width = '60%';
  logoContainer.style.maxWidth = '600px';
  logoContainer.style.margin = '0 auto 2rem auto';
  
  // Aggiungi l'effetto di respiro
  const mainLogo = document.querySelector('.main-logo');
  if (mainLogo) {
    mainLogo.style.animation = 'breathe 4s infinite ease-in-out';
    
    // Aggiungi l'effetto glitch
    mainLogo.classList.add('glitch-effect');
    
    // Crea l'effetto glitch con pseudo-elementi via CSS
    const glitchStyle = document.createElement('style');
    glitchStyle.textContent = `
      @keyframes breathe {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      .glitch-effect {
        position: relative;
        width: 100%;
        height: auto;
      }
      
      .glitch-effect::before,
      .glitch-effect::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('${mainLogo.src}') no-repeat center center;
        background-size: contain;
        mix-blend-mode: screen;
      }
      
      .glitch-effect::before {
        animation: glitch-anim-1 2s infinite linear alternate;
        transform: translateX(-5px);
        filter: drop-shadow(0 0 5px ${NEON_GREEN});
      }
      
      .glitch-effect::after {
        animation: glitch-anim-2 3s infinite linear alternate;
        transform: translateX(5px);
        filter: drop-shadow(0 0 5px ${NEON_GREEN});
      }
      
      @keyframes glitch-anim-1 {
        0%, 100% { opacity: 0.2; }
        25%, 75% { opacity: 0.5; }
        50% { opacity: 0.7; }
      }
      
      @keyframes glitch-anim-2 {
        0%, 100% { opacity: 0.3; }
        25%, 75% { opacity: 0.2; }
        50% { opacity: 0.5; }
      }
    `;
    document.head.appendChild(glitchStyle);
  }
}

/**
 * Rimuove la scritta scroll automatica nella hero section
 */
function removeScrollText() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.style.display = 'none';
  }
}

/**
 * Ripristina le immagini delle collezioni
 */
function restoreCollectionImages() {
  const collectionItems = document.querySelectorAll('.collection-item');
  
  if (collectionItems.length >= 3) {
    // Aggiungi le immagini di sfondo alle collezioni
    const collectionImages = [
      'assets/images/collections/intifada.jpg',
      'assets/images/collections/revolucion.jpg',
      'assets/images/collections/land-of-smile.jpg'
    ];
    
    collectionItems.forEach((item, index) => {
      if (index < 3) {
        item.style.backgroundImage = `url('${collectionImages[index]}')`;
        item.style.backgroundSize = 'cover';
        item.style.backgroundPosition = 'center';
      }
    });
  }
}

/**
 * Correggi i tasti "ESPLORA" sotto ogni collezione
 */
function fixExploreButtons() {
  const collectionLinks = document.querySelectorAll('.collection-link');
  
  if (collectionLinks.length >= 3) {
    const collectionUrls = [
      '#collections/intifada',
      '#collections/revolucion',
      '#collections/land-of-smile'
    ];
    
    collectionLinks.forEach((link, index) => {
      if (index < 3) {
        link.href = collectionUrls[index];
        
        // Aggiungi event listener per aprire la pagina della collezione
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Crea un modal per la collezione
          const collectionModal = document.createElement('div');
          collectionModal.className = 'collection-modal';
          collectionModal.style.position = 'fixed';
          collectionModal.style.top = '0';
          collectionModal.style.left = '0';
          collectionModal.style.width = '100%';
          collectionModal.style.height = '100%';
          collectionModal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
          collectionModal.style.zIndex = '1000';
          collectionModal.style.display = 'flex';
          collectionModal.style.flexDirection = 'column';
          collectionModal.style.padding = '50px';
          collectionModal.style.overflow = 'auto';
          
          // Pulsante di chiusura
          const closeButton = document.createElement('button');
          closeButton.textContent = '×';
          closeButton.style.position = 'absolute';
          closeButton.style.top = '20px';
          closeButton.style.right = '20px';
          closeButton.style.backgroundColor = 'transparent';
          closeButton.style.border = 'none';
          closeButton.style.color = '#ffffff';
          closeButton.style.fontSize = '2rem';
          closeButton.style.cursor = 'pointer';
          
          closeButton.addEventListener('click', () => {
            document.body.removeChild(collectionModal);
          });
          
          // Titolo della collezione
          const title = document.createElement('h2');
          title.textContent = collectionLinks[index].closest('.collection-item').querySelector('.collection-title').textContent;
          title.style.fontSize = '2.5rem';
          title.style.marginBottom = '30px';
          title.style.textAlign = 'center';
          title.style.textTransform = 'uppercase';
          
          // Immagine della collezione
          const image = document.createElement('img');
          image.src = collectionImages[index];
          image.alt = title.textContent;
          image.style.width = '100%';
          image.style.maxWidth = '800px';
          image.style.height = 'auto';
          image.style.margin = '0 auto 30px auto';
          image.style.display = 'block';
          
          // Descrizione della collezione
          const description = document.createElement('p');
          description.textContent = collectionLinks[index].closest('.collection-item').querySelector('.collection-tagline').textContent;
          description.style.fontSize = '1.2rem';
          description.style.lineHeight = '1.8';
          description.style.maxWidth = '800px';
          description.style.margin = '0 auto 30px auto';
          description.style.textAlign = 'center';
          
          // Aggiungi gli elementi al modal
          collectionModal.appendChild(closeButton);
          collectionModal.appendChild(title);
          collectionModal.appendChild(image);
          collectionModal.appendChild(description);
          
          // Aggiungi il modal al body
          document.body.appendChild(collectionModal);
        });
      }
    });
  }
}

/**
 * Rimuovi la felpa non autorizzata dal lookbook
 */
function removeUnauthorizedItems() {
  // Assicurati che nel lookbook ci siano solo immagini approvate
  const lookbookImages = document.querySelectorAll('.lookbook-image');
  
  lookbookImages.forEach(image => {
    // Verifica se l'immagine è nella cartella approvata
    if (!image.src.includes('lookbook-approved')) {
      // Sostituisci con un'immagine approvata o nascondi
      image.src = 'assets/images/lookbook-approved/lookbook_1.png';
    }
  });
}

/**
 * Correggi il pulsante "LEGGI IL MANIFESTO COMPLETO"
 */
function fixManifestoButton() {
  const manifestoLink = document.querySelector('.manifesto-link');
  
  if (manifestoLink) {
    manifestoLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Crea un modal per il manifesto completo
      const manifestoModal = document.createElement('div');
      manifestoModal.className = 'manifesto-modal';
      manifestoModal.style.position = 'fixed';
      manifestoModal.style.top = '0';
      manifestoModal.style.left = '0';
      manifestoModal.style.width = '100%';
      manifestoModal.style.height = '100%';
      manifestoModal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
      manifestoModal.style.zIndex = '1000';
      manifestoModal.style.display = 'flex';
      manifestoModal.style.flexDirection = 'column';
      manifestoModal.style.padding = '50px';
      manifestoModal.style.overflow = 'auto';
      
      // Pulsante di chiusura
      const closeButton = document.createElement('button');
      closeButton.textContent = '×';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '20px';
      closeButton.style.right = '20px';
      closeButton.style.backgroundColor = 'transparent';
      closeButton.style.border = 'none';
      closeButton.style.color = '#ffffff';
      closeButton.style.fontSize = '2rem';
      closeButton.style.cursor = 'pointer';
      
      closeButton.addEventListener('click', () => {
        document.body.removeChild(manifestoModal);
      });
      
      // Titolo del manifesto
      const title = document.createElement('h2');
      title.textContent = 'MANIFESTO';
      title.style.fontSize = '2.5rem';
      title.style.marginBottom = '30px';
      title.style.textAlign = 'center';
      title.style.textTransform = 'uppercase';
      
      // Contenuto del manifesto
      const content = document.createElement('div');
      content.className = 'manifesto-content';
      content.style.maxWidth = '800px';
      content.style.margin = '0 auto';
      content.style.lineHeight = '1.8';
      content.style.fontSize = '1.2rem';
      
      // Testo del manifesto completo
      content.innerHTML = `
        <p>D3MAS1ADØ nasce come risposta alla standardizzazione della moda contemporanea. Siamo un collettivo di designer, artisti e attivisti uniti dalla visione di un lusso urbano autentico, che non scende a compromessi.</p>
        <p>Le nostre collezioni raccontano storie di resistenza culturale, di identità fluide, di orgoglio per le proprie radici. Ogni capo è un manifesto, ogni design una dichiarazione di intenti.</p>
        <p>Non seguiamo le tendenze, le creiamo. Non ci adattiamo al mercato, lo sfidiamo. D3MAS1ADØ non è per tutti, è per chi ha il coraggio di distinguersi, di abbracciare la propria unicità, di vivere secondo le proprie regole.</p>
        <p>Unidad-31Ø è la nostra community, uno spazio sicuro dove esprimersi liberamente, dove condividere idee e visioni, dove costruire insieme il futuro della moda urbana.</p>
        <p>Siamo qui per restare. Siamo qui per cambiare le regole del gioco.</p>
      `;
      
      // Aggiungi gli elementi al modal
      manifestoModal.appendChild(closeButton);
      manifestoModal.appendChild(title);
      manifestoModal.appendChild(content);
      
      // Aggiungi il modal al body
      document.body.appendChild(manifestoModal);
    });
  }
}

/**
 * Rendi tutti i pulsanti cliccabili verde neon DEM
 */
function applyNeonGreenToButtons() {
  // Seleziona tutti i pulsanti e link cliccabili
  const clickableElements = document.querySelectorAll('a.nav-link, a.hero-button, a.collection-link, a.lookbook-link, a.manifesto-link, a.preorder-button, button.lana-toggle, a.admin-link');
  
  clickableElements.forEach(element => {
    // Applica il colore verde neon
    if (element.tagName === 'A') {
      element.style.color = NEON_GREEN;
      
      // Per i pulsanti con sfondo
      if (element.classList.contains('hero-button') || element.classList.contains('preorder-button')) {
        element.style.backgroundColor = NEON_GREEN;
        element.style.color = '#000000';
        element.style.borderColor = NEON_GREEN;
      }
    } else if (element.tagName === 'BUTTON') {
      element.style.backgroundColor = NEON_GREEN;
      element.style.color = '#000000';
    }
  });
  
  // Applica il colore verde neon ai link nel footer
  const legalLinks = document.querySelectorAll('.footer-link a');
  legalLinks.forEach(link => {
    link.style.color = NEON_GREEN;
  });
}

/**
 * Inizializza l'integrazione con Sanity
 */
async function initSanityIntegration() {
  try {
    // Verifica se Sanity è disponibile
    if (!SanityAPI) {
      console.error('Sanity API non disponibile');
      return;
    }
    
    // Carica i contenuti da Sanity
    await loadSanityContent();
    
    console.log('Integrazione Sanity completata con successo');
  } catch (error) {
    console.error('Errore durante l\'inizializzazione dell\'integrazione Sanity:', error);
  }
}

/**
 * Carica i contenuti da Sanity
 */
async function loadSanityContent() {
  try {
    // Carica i contenuti della homepage
    const homepageData = await SanityAPI.fetchHomepage();
    if (homepageData) {
      updateHomepageContent(homepageData);
    }
    
    // Carica le collezioni
    const collectionsData = await SanityAPI.fetchCollections();
    if (collectionsData && collectionsData.length > 0) {
      updateCollectionsContent(collectionsData);
    }
    
    // Carica il lookbook
    const lookbookData = await SanityAPI.fetchLookbook();
    if (lookbookData) {
      updateLookbookContent(lookbookData);
    }
    
    // Carica il manifesto
    const manifestoData = await SanityAPI.fetchManifesto();
    if (manifestoData) {
      updateManifestoContent(manifestoData);
    }
    
    // Carica le recensioni
    const reviewsData = await SanityAPI.fetchReviews();
    if (reviewsData && reviewsData.length > 0) {
      updateReviewsContent(reviewsData);
    }
    
    // Carica le impostazioni del sito
    const siteSettingsData = await SanityAPI.fetchSiteSettings();
    if (siteSettingsData) {
      updateSiteSettings(siteSettingsData);
    }
  } catch (error) {
    console.error('Errore durante il caricamento dei contenuti da Sanity:', error);
  }
}

/**
 * Aggiorna i contenuti della homepage
 * @param {Object} data - Dati della homepage
 */
function updateHomepageContent(data) {
  // Aggiorna il titolo hero
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && data.heroTitle) {
    heroTitle.textContent = data.heroTitle;
  }
  
  // Aggiorna i pulsanti hero
  if (data.heroButtons && data.heroButtons.length > 0) {
    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
      heroButtons.innerHTML = '';
      
      data.heroButtons.forEach(button => {
        const buttonElement = document.createElement('a');
        buttonElement.href = button.url;
        buttonElement.className = 'hero-button';
        buttonElement.textContent = button.text;
        
        // Applica lo stile verde neon
        buttonElement.style.backgroundColor = NEON_GREEN;
        buttonElement.style.color = '#000000';
        buttonElement.style.borderColor = NEON_GREEN;
        
        heroButtons.appendChild(buttonElement);
      });
    }
  }
  
  // Gestisci l'indicatore di scroll
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.style.display = data.showScrollIndicator ? 'block' : 'none';
  }
}

/**
 * Aggiorna i contenuti delle collezioni
 * @param {Array} collections - Dati delle collezioni
 */
function updateCollectionsContent(collections) {
  const collectionItems = document.querySelectorAll('.collection-item');
  
  if (collectionItems.length > 0 && collections.length > 0) {
    collections.forEach((collection, index) => {
      if (index < collectionItems.length) {
        const item = collectionItems[index];
        
        // Aggiorna il titolo
        const title = item.querySelector('.collection-title');
        if (title) {
          title.textContent = collection.title;
        }
        
        // Aggiorna la tagline
        const tagline = item.querySelector('.collection-tagline');
        if (tagline) {
          tagline.textContent = collection.tagline;
        }
        
        // Aggiorna l'immagine di sfondo
        if (collection.image) {
          item.style.backgroundImage = `url('${collection.image}')`;
          item.style.backgroundSize = 'cover';
          item.style.backgroundPosition = 'center';
        }
        
        // Aggiorna il link
        const link = item.querySelector('.collection-link');
        if (link && collection.slug) {
          link.href = `#collections/${collection.slug.current}`;
        }
      }
    });
  }
}

/**
 * Aggiorna i contenuti del lookbook
 * @param {Object} data - Dati del lookbook
 */
function updateLookbookContent(data) {
  // Aggiorna il titolo
  const title = document.querySelector('.lookbook-section .section-title');
  if (title && data.title) {
    title.textContent = data.title;
  }
  
  // Aggiorna il sottotitolo
  const subtitle = document.querySelector('.lookbook-section .section-subtitle');
  if (subtitle && data.subtitle) {
    subtitle.textContent = data.subtitle;
  }
  
  // Aggiorna le immagini
  if (data.images && data.images.length > 0) {
    const lookbookImage = document.querySelector('.lookbook-image');
    if (lookbookImage) {
      lookbookImage.src = data.images[0].url;
      lookbookImage.alt = data.images[0].alt || 'D3MAS1ADØ Lookbook';
    }
  }
}

/**
 * Aggiorna i contenuti del manifesto
 * @param {Object} data - Dati del manifesto
 */
function updateManifestoContent(data) {
  // Aggiorna il titolo
  const title = document.querySelector('.manifesto-section .section-title');
  if (title && data.title) {
    title.textContent = data.title;
  }
  
  // Aggiorna i paragrafi
  if (data.paragraphs && data.paragraphs.length > 0) {
    const manifestoContent = document.querySelector('.manifesto-content');
    if (manifestoContent) {
      // Rimuovi i paragrafi esistenti
      const existingParagraphs = manifestoContent.querySelectorAll('.manifesto-text');
      existingParagraphs.forEach(p => p.remove());
      
      // Aggiungi i nuovi paragrafi
      data.paragraphs.forEach(paragraph => {
        const p = document.createElement('p');
        p.className = 'manifesto-text fade-in-scroll';
        p.textContent = paragraph;
        
        // Inserisci prima del link
        const manifestoLink = manifestoContent.querySelector('.manifesto-link');
        if (manifestoLink) {
          manifestoContent.insertBefore(p, manifestoLink);
        } else {
          manifestoContent.appendChild(p);
        }
      });
    }
  }
}

/**
 * Aggiorna le impostazioni del sito
 * @param {Object} data - Dati delle impostazioni del sito
 */
function updateSiteSettings(data) {
  // Aggiorna il titolo del sito
  if (data.title) {
    document.title = data.title;
  }
  
  // Aggiorna la meta descrizione
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && data.description) {
    metaDescription.content = data.description;
  }
  
  // Aggiorna i link social
  if (data.socialLinks && data.socialLinks.length > 0) {
    const socialLinks = {
      facebook: document.querySelectorAll('a[href*="facebook.com"]'),
      instagram: document.querySelectorAll('a[href*="instagram.com"]'),
      tiktok: document.querySelectorAll('a[href*="tiktok.com"]')
    };
    
    data.socialLinks.forEach(link => {
      if (socialLinks[link.platform]) {
        socialLinks[link.platform].forEach(element => {
          element.href = link.url;
        });
      }
    });
  }
  
  // Aggiorna il testo di Lana AI
  if (data.lanaAiText) {
    updateLanaAiText(data.lanaAiText);
  }
}

/**
 * Aggiorna il contenuto delle recensioni
 * @param {Array} reviews - Dati delle recensioni
 */
function updateReviewsContent(reviews) {
  const reviewsSection = document.querySelector('.reviews-section');
  
  if (reviewsSection && reviews.length > 0) {
    const reviewsList = reviewsSection.querySelector('.reviews-list');
    
    if (reviewsList) {
      reviewsList.innerHTML = '';
      
      reviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.style.backgroundColor = '#111111';
        reviewItem.style.padding = '20px';
        reviewItem.style.borderRadius = '5px';
        reviewItem.style.marginBottom = '20px';
        
        // Stelle di valutazione
        const stars = document.createElement('div');
        stars.className = 'review-stars';
        stars.style.color = NEON_GREEN;
        stars.style.fontSize = '1.2rem';
        stars.style.marginBottom = '10px';
        
        for (let i = 0; i < 5; i++) {
          const star = document.createElement('span');
          star.textContent = i < review.rating ? '★' : '☆';
          stars.appendChild(star);
        }
        
        // Testo della recensione
        const text = document.createElement('p');
        text.className = 'review-text';
        text.textContent = review.text;
        text.style.marginBottom = '10px';
        text.style.fontSize = '1rem';
        text.style.lineHeight = '1.6';
        
        // Autore della recensione
        const author = document.createElement('div');
        author.className = 'review-author';
        author.textContent = review.author;
        author.style.fontSize = '0.9rem';
        author.style.fontWeight = '700';
        author.style.textAlign = 'right';
        
        reviewItem.appendChild(stars);
        reviewItem.appendChild(text);
        reviewItem.appendChild(author);
        
        reviewsList.appendChild(reviewItem);
      });
    }
  }
}

/**
 * Aggiunge la sezione recensioni
 */
function addReviewsSection() {
  // Verifica se la sezione recensioni esiste già
  if (document.querySelector('.reviews-section')) return;
  
  // Crea la sezione recensioni
  const reviewsSection = document.createElement('section');
  reviewsSection.className = 'reviews-section';
  reviewsSection.style.padding = '100px 0';
  reviewsSection.style.backgroundColor = 'var(--color-black)';
  
  const container = document.createElement('div');
  container.className = 'container';
  
  const title = document.createElement('h2');
  title.className = 'section-title text-center';
  title.textContent = 'Recensioni';
  title.style.fontSize = '2.5rem';
  title.style.fontWeight = '700';
  title.style.marginBottom = '2rem';
  title.style.textTransform = 'uppercase';
  title.style.letterSpacing = '2px';
  
  const subtitle = document.createElement('p');
  subtitle.className = 'section-subtitle text-center';
  subtitle.textContent = 'Cosa dicono di noi';
  subtitle.style.fontSize = '1.2rem';
  subtitle.style.marginBottom = '3rem';
  subtitle.style.opacity = '0.8';
  
  const reviewsList = document.createElement('div');
  reviewsList.className = 'reviews-list';
  reviewsList.style.display = 'grid';
  reviewsList.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
  reviewsList.style.gap = '30px';
  reviewsList.style.maxWidth = '1000px';
  reviewsList.style.margin = '0 auto';
  
  // Recensioni di esempio
  const reviews = [
    {
      author: 'Marco R.',
      rating: 5,
      text: 'Qualità incredibile, design unico. D3MAS1ADØ è il futuro della moda urbana.'
    },
    {
      author: 'Sofia L.',
      rating: 5,
      text: 'Finalmente un brand che rappresenta davvero la cultura urbana senza compromessi.'
    },
    {
      author: 'Alex T.',
      rating: 4,
      text: 'Stile inconfondibile e materiali premium. Vale ogni centesimo.'
    }
  ];
  
  reviews.forEach(review => {
    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';
    reviewItem.style.backgroundColor = '#111111';
    reviewItem.style.padding = '20px';
    reviewItem.style.borderRadius = '5px';
    
    // Stelle di valutazione
    const stars = document.createElement('div');
    stars.className = 'review-stars';
    stars.style.color = NEON_GREEN;
    stars.style.fontSize = '1.2rem';
    stars.style.marginBottom = '10px';
    
    for (let i = 0; i < 5; i++) {
      const star = document.createElement('span');
      star.textContent = i < review.rating ? '★' : '☆';
      stars.appendChild(star);
    }
    
    // Testo della recensione
    const text = document.createElement('p');
    text.className = 'review-text';
    text.textContent = review.text;
    text.style.marginBottom = '10px';
    text.style.fontSize = '1rem';
    text.style.lineHeight = '1.6';
    
    // Autore della recensione
    const author = document.createElement('div');
    author.className = 'review-author';
    author.textContent = review.author;
    author.style.fontSize = '0.9rem';
    author.style.fontWeight = '700';
    author.style.textAlign = 'right';
    
    reviewItem.appendChild(stars);
    reviewItem.appendChild(text);
    reviewItem.appendChild(author);
    
    reviewsList.appendChild(reviewItem);
  });
  
  container.appendChild(title);
  container.appendChild(subtitle);
  container.appendChild(reviewsList);
  
  reviewsSection.appendChild(container);
  
  // Inserisci la sezione prima del footer
  const footer = document.querySelector('.site-footer');
  if (footer) {
    footer.parentNode.insertBefore(reviewsSection, footer);
  } else {
    document.querySelector('main').appendChild(reviewsSection);
  }
}

/**
 * Aggiunge il micro-testo per Lana AI
 * @param {string} text - Testo personalizzato (opzionale)
 */
function addLanaAiText(text) {
  // Testo predefinito
  const defaultText = "Hai domande? Chiedi a Lana, la nostra AI brasitaliana ti risponde h24.";
  
  // Usa il testo personalizzato se fornito
  const lanaText = text || defaultText;
  
  // Verifica se il testo esiste già
  if (document.querySelector('.lana-info-text')) return;
  
  // Crea il contenitore per il testo
  const lanaInfoContainer = document.createElement('div');
  lanaInfoContainer.className = 'lana-info-container';
  lanaInfoContainer.style.position = 'fixed';
  lanaInfoContainer.style.bottom = '100px';
  lanaInfoContainer.style.right = '30px';
  lanaInfoContainer.style.width = '200px';
  lanaInfoContainer.style.textAlign = 'right';
  lanaInfoContainer.style.zIndex = '899';
  
  // Crea il testo
  const lanaInfoText = document.createElement('p');
  lanaInfoText.className = 'lana-info-text';
  lanaInfoText.textContent = lanaText;
  lanaInfoText.style.fontSize = '0.8rem';
  lanaInfoText.style.color = NEON_GREEN;
  lanaInfoText.style.margin = '0';
  
  lanaInfoContainer.appendChild(lanaInfoText);
  
  // Aggiungi il contenitore al body
  document.body.appendChild(lanaInfoContainer);
}

/**
 * Aggiorna il testo di Lana AI
 * @param {string} text - Nuovo testo
 */
function updateLanaAiText(text) {
  const lanaInfoText = document.querySelector('.lana-info-text');
  
  if (lanaInfoText) {
    lanaInfoText.textContent = text;
  } else {
    addLanaAiText(text);
  }
}

// Inizializza quando il DOM è pronto
document.addEventListener('DOMContentLoaded', init);

// Esporta le funzioni per l'uso in altri file
export default {
  init,
  applyFixes,
  initSanityIntegration,
  addReviewsSection,
  addLanaAiText
};

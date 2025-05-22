// Sanity Integration JavaScript per D3MAS1ADØ

// Configurazione Sanity Client
const sanityClient = {
  projectId: 'yy05mm62',
  dataset: 'production',
  apiVersion: '2023-05-03', // Usa la data di oggi come versione API
  useCdn: true, // Abilita CDN per prestazioni migliori in produzione
};

// Funzione per inizializzare il client Sanity
function initSanityClient(token = null) {
  // Questa funzione verrà completata quando l'API token sarà disponibile
  // Per ora, prepariamo la struttura base
  console.log('Sanity client inizializzato con projectId:', sanityClient.projectId);
  
  // Se il token è fornito, lo aggiungiamo alla configurazione
  if (token) {
    sanityClient.token = token;
    console.log('Token API aggiunto alla configurazione Sanity');
  }
  
  return sanityClient;
}

// Funzioni per recuperare i dati da Sanity
async function fetchProducts() {
  // Query GROQ per recuperare tutti i prodotti
  const query = `*[_type == "product"] {
    _id,
    name,
    price,
    description,
    "imageUrl": image.asset->url,
    sizes,
    collection->{name},
    available
  }`;
  
  // Placeholder per la chiamata API effettiva
  console.log('Fetching prodotti con query:', query);
  
  // Simulazione dati per sviluppo
  return [
    {
      _id: 'product-1',
      name: 'T-Shirt Manifesto',
      price: 89.00,
      description: 'T-shirt in cotone organico con stampa manifesto D3MAS1ADØ',
      imageUrl: 'assets/images/products/product-1.jpg',
      sizes: ['S', 'M', 'L', 'XL'],
      collection: { name: 'worldwide' },
      available: true
    },
    {
      _id: 'product-2',
      name: 'Felpa Intifada',
      price: 149.00,
      description: 'Felpa oversize con dettagli Intifada collection',
      imageUrl: 'assets/images/products/product-2.jpg',
      sizes: ['S', 'M', 'L', 'XL'],
      collection: { name: 'intifada' },
      available: true
    }
    // Altri prodotti verranno aggiunti dinamicamente da Sanity
  ];
}

async function fetchCollections() {
  // Query GROQ per recuperare tutte le collezioni
  const query = `*[_type == "collection"] {
    _id,
    name,
    description,
    "imageUrl": heroImage.asset->url
  }`;
  
  console.log('Fetching collezioni con query:', query);
  
  // Simulazione dati per sviluppo
  return [
    {
      _id: 'collection-1',
      name: 'WorldWide',
      description: 'Lusso urbano globale, senza confini',
      imageUrl: 'assets/images/collections/worldwide.jpg'
    },
    {
      _id: 'collection-2',
      name: 'Intifada',
      description: 'Resistenza urbana, orgoglio e identità',
      imageUrl: 'assets/images/collections/intifada.jpg'
    },
    {
      _id: 'collection-3',
      name: 'Revolución',
      description: 'L\'anima latina della ribellione urbana',
      imageUrl: 'assets/images/collections/revolucion.jpg'
    }
    // Altre collezioni verranno aggiunte dinamicamente da Sanity
  ];
}

async function fetchLookbook() {
  // Query GROQ per recuperare tutti gli elementi del lookbook
  const query = `*[_type == "lookbookItem"] | order(order asc) {
    _id,
    title,
    description,
    "imageUrl": image.asset->url,
    "videoUrl": video.asset->url,
    isVideo
  }`;
  
  console.log('Fetching lookbook con query:', query);
  
  // Simulazione dati per sviluppo
  return [
    {
      _id: 'lookbook-1',
      title: 'Titolo Lookbook 1',
      description: 'Descrizione breve del lookbook.',
      imageUrl: 'assets/images/lookbook/lookbook-1.jpg',
      videoUrl: null,
      isVideo: false
    },
    {
      _id: 'lookbook-2',
      title: 'Titolo Lookbook 2',
      description: 'Descrizione breve del lookbook con video.',
      imageUrl: null,
      videoUrl: 'assets/videos/lookbook-2.mp4',
      isVideo: true
    }
    // Altri elementi lookbook verranno aggiunti dinamicamente da Sanity
  ];
}

async function fetchManifesto() {
  // Query GROQ per recuperare il manifesto
  const query = `*[_type == "manifesto"][0] {
    title,
    paragraphs
  }`;
  
  console.log('Fetching manifesto con query:', query);
  
  // Simulazione dati per sviluppo
  return {
    title: 'Manifesto',
    paragraphs: [
      'D3MAS1ADØ nasce come risposta alla standardizzazione della moda contemporanea.',
      'Siamo un collettivo di designer, artisti e attivisti uniti dalla visione di un lusso urbano autentico, che non scende a compromessi.',
      'Le nostre collezioni raccontano storie di resistenza culturale, di identità fluide, di orgoglio per le proprie radici. Ogni capo è un manifesto, ogni design una dichiarazione di intenti.',
      'Crediamo in un lusso che non sia esclusione ma inclusione consapevole. Un lusso che parla il linguaggio della strada ma che non rinuncia alla qualità artigianale e alla ricerca estetica.'
    ]
  };
}

async function fetchChatbotResponses() {
  // Query GROQ per recuperare le risposte della chatbot
  const query = `*[_type == "chatbotResponse"] {
    keyword,
    response
  }`;
  
  console.log('Fetching risposte chatbot con query:', query);
  
  // Simulazione dati per sviluppo
  return [
    {
      keyword: 'ciao',
      response: "E aí? Tutto bene? Sono Lana, l'anima digitale di D3MAS1ADØ. Cosa ti serve?"
    },
    {
      keyword: 'taglie',
      response: "Le nostre taglie vanno da S a XL. Vestiamo largo, urban style. Se sei indeciso, scegli una taglia in meno. Siamo ribelli, non oversize."
    },
    {
      keyword: 'spedizione',
      response: "Spediamo in tutto il mondo in 3-5 giorni lavorativi. Gratis sopra i 150€. Sotto, sono 12€. Veloce come una rivolta urbana."
    }
    // Altre risposte verranno aggiunte dinamicamente da Sanity
  ];
}

// Funzioni per renderizzare i dati nel DOM
function renderProducts(products) {
  const productsContainer = document.querySelector('.products-grid');
  if (!productsContainer) return;
  
  productsContainer.innerHTML = '';
  
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.dataset.collection = product.collection.name;
    
    productCard.innerHTML = `
      <div class="product-image" style="background-image: url('${product.imageUrl}')"></div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">€${product.price.toFixed(2)}</p>
        <div class="product-sizes">
          ${product.sizes.map(size => `<button class="size-option" data-size="${size}">${size}</button>`).join('')}
        </div>
        <button class="add-to-cart" data-product="${product._id}" data-name="${product.name}" data-price="${product.price}">AGGIUNGI AL CARRELLO</button>
      </div>
    `;
    
    productsContainer.appendChild(productCard);
  });
  
  // Aggiorna gli event listener dopo il rendering
  initProductEvents();
}

function renderCollections(collections) {
  const collectionsContainer = document.querySelector('.collections-container');
  if (!collectionsContainer) return;
  
  collectionsContainer.innerHTML = '';
  
  collections.forEach(collection => {
    const collectionCard = document.createElement('div');
    collectionCard.className = 'collection-card';
    
    collectionCard.innerHTML = `
      <div class="collection-image" style="background-image: url('${collection.imageUrl}')">
        <div class="collection-overlay"></div>
        <div class="collection-content">
          <h3 class="collection-title">${collection.name}</h3>
          <p class="collection-description">${collection.description}</p>
          <a href="#" class="collection-button" data-collection="${collection._id}">ESPLORA</a>
        </div>
      </div>
    `;
    
    collectionsContainer.appendChild(collectionCard);
  });
  
  // Aggiorna gli event listener dopo il rendering
  initCollectionEvents();
}

function renderLookbook(lookbookItems) {
  const lookbookContainer = document.querySelector('.lookbook-slider');
  if (!lookbookContainer) return;
  
  lookbookContainer.innerHTML = '';
  
  lookbookItems.forEach(item => {
    const lookbookSlide = document.createElement('div');
    lookbookSlide.className = 'lookbook-slide';
    
    if (item.isVideo) {
      lookbookSlide.innerHTML = `
        <div class="lookbook-media">
          <video src="${item.videoUrl}" controls></video>
        </div>
        <div class="lookbook-info">
          <h3 class="lookbook-title">${item.title}</h3>
          <p class="lookbook-description">${item.description}</p>
        </div>
      `;
    } else {
      lookbookSlide.innerHTML = `
        <div class="lookbook-media">
          <img src="${item.imageUrl}" alt="${item.title}">
        </div>
        <div class="lookbook-info">
          <h3 class="lookbook-title">${item.title}</h3>
          <p class="lookbook-description">${item.description}</p>
        </div>
      `;
    }
    
    lookbookContainer.appendChild(lookbookSlide);
  });
  
  // Inizializza lo slider dopo il rendering
  initLookbookSlider();
}

function renderManifesto(manifesto) {
  const manifestoContainer = document.querySelector('.manifesto-paragraphs');
  if (!manifestoContainer) return;
  
  manifestoContainer.innerHTML = '';
  
  manifesto.paragraphs.forEach(paragraph => {
    const p = document.createElement('p');
    p.className = 'manifesto-text reveal-on-scroll';
    p.textContent = paragraph;
    manifestoContainer.appendChild(p);
  });
  
  // Aggiorna gli effetti di scroll dopo il rendering
  initScrollEffects();
}

function updateChatbotResponses(responses) {
  // Aggiorna le risposte della chatbot con i dati da Sanity
  window.chatbotResponses = responses;
  console.log('Risposte chatbot aggiornate:', responses);
}

// Funzione principale per caricare tutti i dati da Sanity
async function loadAllSanityData() {
  try {
    // Inizializza il client Sanity (senza token per ora)
    initSanityClient();
    
    // Carica tutti i dati in parallelo
    const [products, collections, lookbookItems, manifesto, chatbotResponses] = await Promise.all([
      fetchProducts(),
      fetchCollections(),
      fetchLookbook(),
      fetchManifesto(),
      fetchChatbotResponses()
    ]);
    
    // Renderizza i dati nel DOM
    renderProducts(products);
    renderCollections(collections);
    renderLookbook(lookbookItems);
    renderManifesto(manifesto);
    updateChatbotResponses(chatbotResponses);
    
    console.log('Tutti i dati caricati e renderizzati con successo');
  } catch (error) {
    console.error('Errore nel caricamento dei dati da Sanity:', error);
  }
}

// Inizializza gli event listener e gli effetti
function initProductEvents() {
  // Implementazione degli event listener per i prodotti
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.dataset.product;
      const productName = this.dataset.name;
      const productPrice = parseFloat(this.dataset.price);
      const selectedSize = this.parentElement.querySelector('.size-option.selected')?.dataset.size;
      
      if (!selectedSize) {
        alert('Seleziona una taglia prima di aggiungere al carrello');
        return;
      }
      
      // Aggiungi al carrello
      addToCart(productId, productName, productPrice, selectedSize);
    });
  });
  
  const sizeOptions = document.querySelectorAll('.size-option');
  sizeOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Rimuovi la selezione precedente
      this.parentElement.querySelectorAll('.size-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      
      // Seleziona questa taglia
      this.classList.add('selected');
    });
  });
}

function initCollectionEvents() {
  // Implementazione degli event listener per le collezioni
  const collectionButtons = document.querySelectorAll('.collection-button');
  collectionButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const collectionId = this.dataset.collection;
      
      // Filtra i prodotti per collezione
      const collectionName = this.parentElement.querySelector('.collection-title').textContent.toLowerCase();
      filterProductsByCollection(collectionName);
      
      // Scorri alla sezione shop
      document.querySelector('#shop').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function initLookbookSlider() {
  // Implementazione dello slider per il lookbook
  const lookbookSlider = document.querySelector('.lookbook-slider');
  if (!lookbookSlider) return;
  
  // Aggiungi controlli di navigazione
  const prevButton = document.createElement('button');
  prevButton.className = 'lookbook-nav prev';
  prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
  
  const nextButton = document.createElement('button');
  nextButton.className = 'lookbook-nav next';
  nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
  
  lookbookSlider.parentElement.appendChild(prevButton);
  lookbookSlider.parentElement.appendChild(nextButton);
  
  // Inizializza lo slider
  let currentSlide = 0;
  const slides = lookbookSlider.querySelectorAll('.lookbook-slide');
  
  // Mostra la prima slide
  if (slides.length > 0) {
    slides[0].classList.add('active');
  }
  
  // Event listener per i pulsanti di navigazione
  prevButton.addEventListener('click', () => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  });
  
  nextButton.addEventListener('click', () => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  });
}

function initScrollEffects() {
  // Implementazione degli effetti di scroll
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  const revealOnScroll = () => {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };
  
  // Aggiungi l'event listener per lo scroll
  window.addEventListener('scroll', revealOnScroll);
  
  // Esegui una volta all'inizio
  revealOnScroll();
}

function filterProductsByCollection(collectionName) {
  const productCards = document.querySelectorAll('.product-card');
  
  if (collectionName === 'all') {
    // Mostra tutti i prodotti
    productCards.forEach(card => {
      card.style.display = 'block';
    });
  } else {
    // Filtra per collezione
    productCards.forEach(card => {
      if (card.dataset.collection === collectionName) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
}

// Funzioni per il carrello
let cart = [];

function addToCart(productId, productName, productPrice, size) {
  // Controlla se il prodotto è già nel carrello con la stessa taglia
  const existingItemIndex = cart.findIndex(item => 
    item.productId === productId && item.size === size
  );
  
  if (existingItemIndex !== -1) {
    // Incrementa la quantità
    cart[existingItemIndex].quantity += 1;
  } else {
    // Aggiungi nuovo prodotto al carrello
    cart.push({
      productId,
      productName,
      productPrice,
      size,
      quantity: 1
    });
  }
  
  // Aggiorna la visualizzazione del carrello
  updateCartUI();
  
  // Mostra notifica
  showNotification(`${productName} (${size}) aggiunto al carrello`);
}

function updateCartUI() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total');
  const cartCount = document.querySelector('.cart-count');
  
  if (!cartItemsContainer || !cartTotal) return;
  
  // Aggiorna il conteggio degli articoli
  if (cartCount) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';
  }
  
  // Aggiorna gli elementi del carrello
  cartItemsContainer.innerHTML = '';
  
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    cartItem.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.productName}</h4>
        <p>Taglia: ${item.size}</p>
        <p>Quantità: ${item.quantity}</p>
        <p>€${(item.productPrice * item.quantity).toFixed(2)}</p>
      </div>
      <button class="remove-from-cart" data-index="${index}">
        <i class="fas fa-trash"></i>
      </button>
    `;
    
    cartItemsContainer.appendChild(cartItem);
  });
  
  // Aggiorna il totale
  const total = cart.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);
  cartTotal.textContent = `Totale: €${total.toFixed(2)}`;
  
  // Aggiungi event listener per i pulsanti di rimozione
  document.querySelectorAll('.remove-from-cart').forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      removeFromCart(index);
    });
  });
}

function removeFromCart(index) {
  // Rimuovi l'elemento dal carrello
  const removedItem = cart.splice(index, 1)[0];
  
  // Aggiorna la visualizzazione del carrello
  updateCartUI();
  
  // Mostra notifica
  showNotification(`${removedItem.productName} rimosso dal carrello`);
}

function showNotification(message) {
  // Crea l'elemento di notifica
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  // Aggiungi al DOM
  document.body.appendChild(notification);
  
  // Mostra con animazione
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Rimuovi dopo 3 secondi
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Inizializzazione al caricamento della pagina
document.addEventListener('DOMContentLoaded', function() {
  // Carica tutti i dati da Sanity
  loadAllSanityData();
  
  // Inizializza il carrello
  updateCartUI();
  
  // Aggiungi event listener per il pulsante del carrello
  const cartToggle = document.querySelector('.cart-toggle');
  const cartPanel = document.querySelector('.cart-panel');
  
  if (cartToggle && cartPanel) {
    cartToggle.addEventListener('click', function() {
      cartPanel.classList.toggle('open');
    });
  }
  
  // Aggiungi event listener per il pulsante di checkout
  const checkoutButton = document.querySelector('.checkout-button');
  
  if (checkoutButton) {
    checkoutButton.addEventListener('click', function() {
      if (cart.length === 0) {
        alert('Il carrello è vuoto');
        return;
      }
      
      // Qui verrà implementata l'integrazione con Stripe Checkout
      alert('Reindirizzamento al checkout...');
      
      // Simulazione di reindirizzamento
      console.log('Dati carrello per checkout:', cart);
    });
  }
  
  // Aggiungi event listener per i filtri di collezione
  const collectionFilters = document.querySelectorAll('.collection-filter');
  
  if (collectionFilters) {
    collectionFilters.forEach(filter => {
      filter.addEventListener('click', function() {
        // Rimuovi la classe active da tutti i filtri
        collectionFilters.forEach(f => f.classList.remove('active'));
        
        // Aggiungi la classe active a questo filtro
        this.classList.add('active');
        
        // Filtra i prodotti
        const collection = this.dataset.collection;
        filterProductsByCollection(collection);
      });
    });
  }
});

// Esporta le funzioni per l'uso in altri moduli
window.sanityIntegration = {
  loadAllSanityData,
  initSanityClient,
  fetchProducts,
  fetchCollections,
  fetchLookbook,
  fetchManifesto,
  fetchChatbotResponses
};

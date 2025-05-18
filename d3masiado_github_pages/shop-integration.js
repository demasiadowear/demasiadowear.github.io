// shop-integration.js
/**
 * D3MAS1ADØ - Integrazione Shop con Stripe
 * 
 * Questo script gestisce:
 * - Integrazione con Stripe per pagamenti
 * - Carrello di acquisto con Snipcart
 * - Gestione prodotti e varianti (taglie)
 * - Supporto multilingua per shop
 */

document.addEventListener('DOMContentLoaded', function() {
  // Configurazione
  const config = {
    stripePublicKey: 'pk_test_placeholder', // Da sostituire con chiave reale
    currency: 'EUR',
    snipcartApiKey: 'placeholder_snipcart_api_key', // Da sostituire con chiave reale
    defaultLanguage: 'it'
  };
  
  // Stato corrente
  let currentLanguage = config.defaultLanguage;
  
  /**
   * Inizializza l'integrazione shop
   */
  function init() {
    // Ascolta i cambiamenti di lingua
    document.addEventListener('languageChanged', function(e) {
      currentLanguage = e.detail.language;
      updateShopLanguage();
    });
    
    // Rileva la lingua corrente
    currentLanguage = window.D3MASIADO_LANGUAGE ? 
      window.D3MASIADO_LANGUAGE.getCurrentLanguage() : config.defaultLanguage;
    
    // Carica Snipcart
    loadSnipcart();
    
    // Inizializza i pulsanti di acquisto
    initBuyButtons();
    
    console.log('D3MAS1ADØ shop integration initialized');
  }
  
  /**
   * Carica Snipcart
   */
  function loadSnipcart() {
    // Aggiungi CSS di Snipcart
    const snipcartCSS = document.createElement('link');
    snipcartCSS.rel = 'stylesheet';
    snipcartCSS.href = 'https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.css';
    document.head.appendChild(snipcartCSS);
    
    // Aggiungi div per Snipcart
    const snipcartDiv = document.createElement('div');
    snipcartDiv.id = 'snipcart';
    snipcartDiv.setAttribute('data-api-key', config.snipcartApiKey);
    snipcartDiv.setAttribute('data-config-modal-style', 'side');
    snipcartDiv.setAttribute('data-config-add-product-behavior', 'none');
    snipcartDiv.hidden = true;
    document.body.appendChild(snipcartDiv);
    
    // Carica script di Snipcart
    const snipcartScript = document.createElement('script');
    snipcartScript.src = 'https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.js';
    snipcartScript.async = true;
    document.body.appendChild(snipcartScript);
    
    // Configura Snipcart quando è caricato
    snipcartScript.addEventListener('load', function() {
      if (window.Snipcart) {
        window.Snipcart.api.session.setLanguage(currentLanguage);
        
        // Evento per aggiornamento carrello
        window.Snipcart.events.on('cart.ready', updateCartCounter);
        window.Snipcart.events.on('item.added', updateCartCounter);
        window.Snipcart.events.on('item.removed', updateCartCounter);
        
        // Personalizzazione tema
        window.Snipcart.api.theme.customization = {
          colors: {
            primary: '#39FF14',
            primaryLight: 'rgba(57, 255, 20, 0.5)',
            primaryDark: '#32CC10',
            accent: '#000000',
            accentLight: '#333333',
            accentDark: '#000000',
            background: '#000000',
            backgroundLight: '#111111',
            backgroundDark: '#000000'
          },
          fonts: {
            primary: 'Orbitron, sans-serif'
          }
        };
      }
    });
  }
  
  /**
   * Inizializza i pulsanti di acquisto
   */
  function initBuyButtons() {
    // Seleziona tutti i pulsanti con attributo data-product-id
    const buyButtons = document.querySelectorAll('[data-product-id]');
    
    buyButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const productId = this.getAttribute('data-product-id');
        const productName = this.getAttribute('data-product-name');
        const productPrice = this.getAttribute('data-product-price');
        const productImage = this.getAttribute('data-product-image');
        const productUrl = this.getAttribute('data-product-url') || window.location.href;
        
        // Gestione varianti (taglie)
        let selectedSize = 'M'; // Default
        const sizeSelector = document.querySelector(`[data-size-selector="${productId}"]`);
        if (sizeSelector) {
          selectedSize = sizeSelector.value;
        }
        
        // Aggiungi al carrello Snipcart
        if (window.Snipcart) {
          window.Snipcart.api.cart.items.add({
            id: `${productId}-${selectedSize}`,
            name: productName,
            price: productPrice,
            url: productUrl,
            image: productImage,
            description: `${getTranslation('product.size')}: ${selectedSize}`,
            customFields: [
              {
                name: 'Size',
                options: 'S|M|L|XL|XXL',
                value: selectedSize
              }
            ]
          });
        }
      });
    });
    
    // Inizializza selettori taglia
    initSizeSelectors();
  }
  
  /**
   * Inizializza i selettori di taglia
   */
  function initSizeSelectors() {
    const sizeSelectors = document.querySelectorAll('[data-size-selector]');
    
    sizeSelectors.forEach(selector => {
      // Popola il selettore con le taglie
      const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
      
      sizes.forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size;
        
        // Imposta M come default
        if (size === 'M') {
          option.selected = true;
        }
        
        selector.appendChild(option);
      });
    });
  }
  
  /**
   * Aggiorna il contatore del carrello
   */
  function updateCartCounter() {
    if (!window.Snipcart) return;
    
    window.Snipcart.store.subscribe(() => {
      const state = window.Snipcart.store.getState();
      
      if (state.cart && state.cart.items) {
        const itemCount = state.cart.items.count;
        
        // Aggiorna il contatore visibile
        const cartCounter = document.querySelector('.cart-counter');
        if (cartCounter) {
          cartCounter.textContent = itemCount;
          cartCounter.style.display = itemCount > 0 ? 'flex' : 'none';
        }
      }
    });
  }
  
  /**
   * Aggiorna la lingua dello shop
   */
  function updateShopLanguage() {
    if (window.Snipcart) {
      window.Snipcart.api.session.setLanguage(currentLanguage);
    }
    
    // Aggiorna i testi dei pulsanti
    const buyButtons = document.querySelectorAll('[data-product-id]');
    buyButtons.forEach(button => {
      button.textContent = getTranslation('product.addtocart');
    });
    
    // Aggiorna etichette taglia
    const sizeLabels = document.querySelectorAll('.size-label');
    sizeLabels.forEach(label => {
      label.textContent = getTranslation('product.size');
    });
  }
  
  /**
   * Ottiene una traduzione dal sistema globale
   */
  function getTranslation(key) {
    if (window.D3MASIADO_TRANSLATIONS && 
        window.D3MASIADO_TRANSLATIONS[key] && 
        window.D3MASIADO_TRANSLATIONS[key][currentLanguage]) {
      return window.D3MASIADO_TRANSLATIONS[key][currentLanguage];
    }
    
    // Fallback
    const fallbacks = {
      'product.addtocart': {it: 'Aggiungi al carrello', en: 'Add to cart'},
      'product.size': {it: 'Taglia', en: 'Size'},
      'product.outofstock': {it: 'Esaurito', en: 'Out of stock'}
    };
    
    return fallbacks[key] ? fallbacks[key][currentLanguage] : key;
  }
  
  /**
   * Crea un elemento prodotto nel DOM
   */
  function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.className = 'product-card';
    
    // Traduci nome e descrizione in base alla lingua corrente
    const productName = product.name[currentLanguage] || product.name.it || 'Prodotto';
    const productDescription = product.description[currentLanguage] || product.description.it || '';
    
    productElement.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${productName}" loading="lazy">
      </div>
      <div class="product-info">
        <h3 class="product-title">${productName}</h3>
        <p class="product-description">${productDescription}</p>
        <div class="product-price">€${product.price.toFixed(2)}</div>
        <div class="product-actions">
          <div class="size-selector-container">
            <label class="size-label">${getTranslation('product.size')}</label>
            <select class="size-selector" data-size-selector="${product.id}"></select>
          </div>
          <button class="add-to-cart-button" 
            data-product-id="${product.id}"
            data-product-name="${productName}"
            data-product-price="${product.price}"
            data-product-image="${product.image}"
            data-product-url="${product.url || window.location.href}">
            ${getTranslation('product.addtocart')}
          </button>
        </div>
      </div>
    `;
    
    return productElement;
  }
  
  /**
   * Renderizza una lista di prodotti in un container
   */
  function renderProductList(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Svuota il container
    container.innerHTML = '';
    
    // Aggiungi ogni prodotto
    products.forEach(product => {
      const productElement = createProductElement(product);
      container.appendChild(productElement);
    });
    
    // Inizializza i pulsanti di acquisto
    initBuyButtons();
  }
  
  // Esponi API pubblica
  window.D3MASIADO_SHOP = {
    renderProductList: renderProductList
  };
  
  // Inizializza lo shop
  init();
});

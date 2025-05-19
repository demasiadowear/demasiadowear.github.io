/**
 * D3MAS1ADØ - Backend CMS per Gestione Autonoma Shop
 * 
 * Questo script implementa l'integrazione con un CMS headless (Sanity.io)
 * per la gestione autonoma dei prodotti, prezzi, taglie, sconti e stock.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Configurazione CMS
  const cmsConfig = {
    projectId: 'demasiadowear',
    dataset: 'production',
    apiVersion: '2023-05-03',
    useCdn: true,
    token: null, // Token non necessario per operazioni di lettura pubblica
    adminUrl: 'https://demasiadowear.sanity.studio/',
    shopSection: '#shop-section',
    productsPerPage: 12,
    enableFilters: true,
    enableSearch: true,
    enableSorting: true,
    enableWishlist: true,
    enableCart: true,
    currencySymbol: '€',
    defaultLanguage: 'it'
  };
  
  // Configurazione Snipcart
  const snipcartConfig = {
    publicApiKey: 'YOUR_SNIPCART_PUBLIC_API_KEY', // Da sostituire con la chiave reale
    defaultCurrency: 'EUR',
    allowedCountries: ['IT', 'FR', 'DE', 'ES', 'UK', 'US'],
    shippingMethods: [
      {
        id: 'standard',
        name: 'Standard',
        description: 'Consegna in 3-5 giorni lavorativi',
        price: 5.99
      },
      {
        id: 'express',
        name: 'Express',
        description: 'Consegna in 1-2 giorni lavorativi',
        price: 9.99
      }
    ],
    discountCodes: true,
    customFields: [
      {
        name: 'note',
        type: 'textarea',
        required: false,
        placeholder: 'Note per l\'ordine'
      }
    ]
  };
  
  /**
   * Inizializza il backend CMS
   */
  function initCmsBackend() {
    // Carica lo script Sanity Client
    loadSanityClient()
      .then(() => {
        console.log('Sanity client loaded');
        initSanityClient();
      })
      .catch(error => {
        console.error('Failed to load Sanity client:', error);
      });
    
    // Carica lo script Snipcart
    loadSnipcartScript()
      .then(() => {
        console.log('Snipcart loaded');
        initSnipcart();
      })
      .catch(error => {
        console.error('Failed to load Snipcart:', error);
      });
    
    // Aggiungi stili CSS
    addShopStyles();
  }
  
  /**
   * Carica lo script Sanity Client
   */
  function loadSanityClient() {
    return new Promise((resolve, reject) => {
      if (window.sanityClient) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@sanity/client@6.1.3/dist/index.min.js';
      script.async = true;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Sanity client script'));
      
      document.head.appendChild(script);
    });
  }
  
  /**
   * Carica lo script Snipcart
   */
  function loadSnipcartScript() {
    return new Promise((resolve, reject) => {
      if (window.Snipcart) {
        resolve();
        return;
      }
      
      // Aggiungi CSS Snipcart
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.css';
      document.head.appendChild(link);
      
      // Aggiungi script Snipcart
      const script = document.createElement('script');
      script.src = 'https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.js';
      script.async = true;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Snipcart script'));
      
      document.head.appendChild(script);
      
      // Aggiungi div Snipcart
      const snipcartDiv = document.createElement('div');
      snipcartDiv.hidden = true;
      snipcartDiv.id = 'snipcart';
      snipcartDiv.setAttribute('data-api-key', snipcartConfig.publicApiKey);
      snipcartDiv.setAttribute('data-currency', snipcartConfig.defaultCurrency);
      
      document.body.appendChild(snipcartDiv);
    });
  }
  
  /**
   * Inizializza il client Sanity
   */
  function initSanityClient() {
    if (!window.sanityClient) {
      console.error('Sanity client not loaded');
      return;
    }
    
    window.D3MASIADO_CMS = {
      client: window.sanityClient({
        projectId: cmsConfig.projectId,
        dataset: cmsConfig.dataset,
        apiVersion: cmsConfig.apiVersion,
        useCdn: cmsConfig.useCdn,
        token: cmsConfig.token
      }),
      
      /**
       * Ottieni tutti i prodotti
       */
      getProducts: async function(options = {}) {
        const { limit = cmsConfig.productsPerPage, offset = 0, category = null, sort = 'title', language = cmsConfig.defaultLanguage } = options;
        
        let query = `*[_type == "product"`;
        
        if (category) {
          query += ` && "${category}" in categories[]->slug.current`;
        }
        
        query += `] {
          _id,
          title,
          "slug": slug.current,
          "mainImage": mainImage.asset->url,
          "categories": categories[]->title,
          "variants": variants[] {
            _key,
            title,
            price,
            sku,
            "size": size->title,
            stock,
            preorder,
            "images": images[].asset->url
          },
          description,
          details
        }`;
        
        if (sort === 'title') {
          query += ` | order(title asc)`;
        } else if (sort === 'price_asc') {
          query += ` | order(variants[0].price asc)`;
        } else if (sort === 'price_desc') {
          query += ` | order(variants[0].price desc)`;
        } else if (sort === 'newest') {
          query += ` | order(_createdAt desc)`;
        }
        
        query += ` [${offset}...${offset + limit}]`;
        
        try {
          const products = await this.client.fetch(query);
          return products;
        } catch (error) {
          console.error('Error fetching products:', error);
          return [];
        }
      },
      
      /**
       * Ottieni un singolo prodotto per slug
       */
      getProductBySlug: async function(slug) {
        const query = `*[_type == "product" && slug.current == "${slug}"][0] {
          _id,
          title,
          "slug": slug.current,
          "mainImage": mainImage.asset->url,
          "images": images[].asset->url,
          "categories": categories[]->title,
          "variants": variants[] {
            _key,
            title,
            price,
            sku,
            "size": size->title,
            stock,
            preorder,
            "images": images[].asset->url
          },
          description,
          details,
          "related": *[_type == "product" && slug.current != "${slug}" && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(title asc) [0...4] {
            _id,
            title,
            "slug": slug.current,
            "mainImage": mainImage.asset->url,
            "variants": variants[] {
              _key,
              price
            }
          }
        }`;
        
        try {
          const product = await this.client.fetch(query);
          return product;
        } catch (error) {
          console.error('Error fetching product:', error);
          return null;
        }
      },
      
      /**
       * Ottieni tutte le categorie
       */
      getCategories: async function() {
        const query = `*[_type == "category"] | order(title asc) {
          _id,
          title,
          "slug": slug.current,
          description
        }`;
        
        try {
          const categories = await this.client.fetch(query);
          return categories;
        } catch (error) {
          console.error('Error fetching categories:', error);
          return [];
        }
      },
      
      /**
       * Ottieni tutte le taglie
       */
      getSizes: async function() {
        const query = `*[_type == "size"] | order(sortOrder asc) {
          _id,
          title,
          sortOrder
        }`;
        
        try {
          const sizes = await this.client.fetch(query);
          return sizes;
        } catch (error) {
          console.error('Error fetching sizes:', error);
          return [];
        }
      },
      
      /**
       * Ottieni i codici sconto attivi
       */
      getDiscountCodes: async function() {
        const query = `*[_type == "discountCode" && active == true && validUntil > now()] {
          _id,
          code,
          discountType,
          discountValue,
          validUntil,
          minimumOrder,
          usageLimit,
          usageCount
        }`;
        
        try {
          const discountCodes = await this.client.fetch(query);
          return discountCodes;
        } catch (error) {
          console.error('Error fetching discount codes:', error);
          return [];
        }
      }
    };
    
    // Inizializza la sezione shop
    initShopSection();
  }
  
  /**
   * Inizializza Snipcart
   */
  function initSnipcart() {
    if (!window.Snipcart) {
      console.error('Snipcart not loaded');
      return;
    }
    
    // Configura Snipcart
    document.addEventListener('snipcart.ready', () => {
      // Personalizza Snipcart
      window.Snipcart.api.session.setLanguage('it');
      
      // Aggiungi eventi Snipcart
      window.Snipcart.events.on('item.added', (item) => {
        console.log('Item added to cart:', item);
        // Qui puoi aggiungere analytics o altre azioni
      });
      
      window.Snipcart.events.on('order.completed', (order) => {
        console.log('Order completed:', order);
        // Qui puoi aggiungere analytics o altre azioni
      });
    });
  }
  
  /**
   * Aggiungi stili CSS per lo shop
   */
  function addShopStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .shop-section {
        padding: 2rem 0;
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .shop-header {
        margin-bottom: 2rem;
        text-align: center;
      }
      
      .shop-title {
        font-family: 'Orbitron', sans-serif;
        color: #39FF14;
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      
      .shop-description {
        color: white;
        max-width: 800px;
        margin: 0 auto;
      }
      
      .shop-filters {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 2rem;
        padding: 1rem;
        background-color: rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(57, 255, 20, 0.3);
      }
      
      .filter-group {
        flex: 1;
        min-width: 200px;
      }
      
      .filter-label {
        display: block;
        margin-bottom: 0.5rem;
        color: white;
        font-weight: bold;
      }
      
      .filter-select {
        width: 100%;
        padding: 0.5rem;
        background-color: #111;
        color: white;
        border: 1px solid rgba(57, 255, 20, 0.5);
      }
      
      .filter-select:focus {
        border-color: #39FF14;
        outline: none;
      }
      
      .shop-products {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 2rem;
      }
      
      .product-card {
        background-color: rgba(0, 0, 0, 0.7);
        border: 1px solid rgba(57, 255, 20, 0.3);
        transition: transform 0.3s ease, border-color 0.3s ease;
        overflow: hidden;
      }
      
      .product-card:hover {
        transform: translateY(-5px);
        border-color: #39FF14;
      }
      
      .product-image-container {
        position: relative;
        padding-top: 125%; /* 4:5 aspect ratio */
        overflow: hidden;
      }
      
      .product-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }
      
      .product-card:hover .product-image {
        transform: scale(1.05);
      }
      
      .product-info {
        padding: 1rem;
      }
      
      .product-title {
        font-family: 'Orbitron', sans-serif;
        color: white;
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }
      
      .product-price {
        color: #39FF14;
        font-weight: bold;
        font-size: 1.1rem;
        margin-bottom: 1rem;
      }
      
      .product-actions {
        display: flex;
        gap: 0.5rem;
      }
      
      .btn-view-product,
      .btn-add-to-cart {
        flex: 1;
        padding: 0.5rem;
        text-align: center;
        font-family: 'Orbitron', sans-serif;
        font-size: 0.9rem;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease;
      }
      
      .btn-view-product {
        background-color: transparent;
        color: white;
        border: 1px solid white;
      }
      
      .btn-view-product:hover {
        background-color: white;
        color: black;
      }
      
      .btn-add-to-cart {
        background-color: #39FF14;
        color: black;
      }
      
      .btn-add-to-cart:hover {
        background-color: #2be010;
      }
      
      .shop-pagination {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 2rem;
      }
      
      .pagination-button {
        padding: 0.5rem 1rem;
        background-color: transparent;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
      }
      
      .pagination-button:hover,
      .pagination-button.active {
        background-color: #39FF14;
        color: black;
        border-color: #39FF14;
      }
      
      .pagination-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      /* Product Detail */
      .product-detail {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-bottom: 3rem;
      }
      
      .product-gallery {
        position: relative;
      }
      
      .product-main-image {
        width: 100%;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        margin-bottom: 1rem;
      }
      
      .product-thumbnails {
        display: flex;
        gap: 0.5rem;
        overflow-x: auto;
      }
      
      .product-thumbnail {
        width: 80px;
        height: 80px;
        object-fit: cover;
        cursor: pointer;
        border: 2px solid transparent;
        transition: border-color 0.3s ease;
      }
      
      .product-thumbnail.active {
        border-color: #39FF14;
      }
      
      .product-details {
        color: white;
      }
      
      .product-detail-title {
        font-family: 'Orbitron', sans-serif;
        color: #39FF14;
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      
      .product-detail-price {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
      }
      
      .product-options {
        margin-bottom: 1.5rem;
      }
      
      .option-label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: bold;
      }
      
      .size-options {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
      }
      
      .size-option {
        padding: 0.5rem 1rem;
        background-color: transparent;
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
      }
      
      .size-option:hover,
      .size-option.active {
        background-color: #39FF14;
        color: black;
        border-color: #39FF14;
      }
      
      .size-option.out-of-stock {
        opacity: 0.5;
        cursor: not-allowed;
        text-decoration: line-through;
      }
      
      .quantity-selector {
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
      }
      
      .quantity-button {
        width: 40px;
        height: 40px;
        background-color: transparent;
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease;
      }
      
      .quantity-button:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      .quantity-input {
        width: 60px;
        height: 40px;
        text-align: center;
        background-color: transparent;
        border-top: 1px solid rgba(255, 255, 255, 0.3);
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        border-left: none;
        border-right: none;
        color: white;
        font-size: 1rem;
      }
      
      .add-to-cart-button {
        width: 100%;
        padding: 1rem;
        background-color: #39FF14;
        color: black;
        border: none;
        font-family: 'Orbitron', sans-serif;
        font-size: 1.1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-bottom: 1.5rem;
      }
      
      .add-to-cart-button:hover {
        background-color: #2be010;
      }
      
      .product-description {
        margin-bottom: 1.5rem;
      }
      
      .product-description h3 {
        font-family: 'Orbitron', sans-serif;
        color: #39FF14;
        margin-bottom: 0.5rem;
      }
      
      .product-tabs {
        margin-top: 2rem;
      }
      
      .tabs-header {
        display: flex;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        margin-bottom: 1rem;
      }
      
      .tab-button {
        padding: 0.5rem 1rem;
        background-color: transparent;
        color: white;
        border: none;
        cursor: pointer;
        transition: color 0.3s ease;
        font-family: 'Orbitron', sans-serif;
      }
      
      .tab-button.active {
        color: #39FF14;
        border-bottom: 2px solid #39FF14;
      }
      
      .tab-content {
        display: none;
        padding: 1rem 0;
      }
      
      .tab-content.active {
        display: block;
      }
      
      /* Responsive */
      @media (max-width: 768px) {
        .product-detail {
          grid-template-columns: 1fr;
        }
        
        .shop-products {
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
        }
      }
    `;
    
    document.head.appendChild(style);
  }
  
  /**
   * Inizializza la sezione shop
   */
  function initShopSection() {
    // Cerca la sezione shop esistente
    let shopSection = document.querySelector(cmsConfig.shopSection);
    
    if (!shopSection) {
      // Crea la sezione shop
      shopSection = document.createElement('section');
      shopSection.id = cmsConfig.shopSection.substring(1); // Rimuovi il # dall'id
      shopSection.className = 'shop-section';
      
      // Trova dove inserire la sezione shop
      const mainContent = document.querySelector('main') || document.querySelector('#root') || document.body;
      mainContent.appendChild(shopSection);
    }
    
    // Struttura base della sezione shop
    shopSection.innerHTML = `
      <div class="shop-header">
        <h2 class="shop-title">SHOP</h2>
        <p class="shop-description">Esplora la collezione D3MAS1ADØ. Urban-luxury senza compromessi.</p>
      </div>
      
      <div class="shop-filters">
        <div class="filter-group">
          <label class="filter-label" for="category-filter">Categoria</label>
          <select class="filter-select" id="category-filter">
            <option value="">Tutte le categorie</option>
            <!-- Le categorie verranno popolate dinamicamente -->
          </select>
        </div>
        
        <div class="filter-group">
          <label class="filter-label" for="size-filter">Taglia</label>
          <select class="filter-select" id="size-filter">
            <option value="">Tutte le taglie</option>
            <!-- Le taglie verranno popolate dinamicamente -->
          </select>
        </div>
        
        <div class="filter-group">
          <label class="filter-label" for="sort-filter">Ordina per</label>
          <select class="filter-select" id="sort-filter">
            <option value="title">Nome (A-Z)</option>
            <option value="price_asc">Prezzo (crescente)</option>
            <option value="price_desc">Prezzo (decrescente)</option>
            <option value="newest">Più recenti</option>
          </select>
        </div>
      </div>
      
      <div class="shop-products">
        <!-- I prodotti verranno popolati dinamicamente -->
        <div class="loading-products">Caricamento prodotti...</div>
      </div>
      
      <div class="shop-pagination">
        <!-- La paginazione verrà popolata dinamicamente -->
      </div>
    `;
    
    // Carica le categorie
    loadCategories();
    
    // Carica le taglie
    loadSizes();
    
    // Carica i prodotti
    loadProducts();
    
    // Aggiungi event listeners
    const categoryFilter = shopSection.querySelector('#category-filter');
    const sizeFilter = shopSection.querySelector('#size-filter');
    const sortFilter = shopSection.querySelector('#sort-filter');
    
    categoryFilter.addEventListener('change', () => {
      loadProducts({
        category: categoryFilter.value,
        size: sizeFilter.value,
        sort: sortFilter.value
      });
    });
    
    sizeFilter.addEventListener('change', () => {
      loadProducts({
        category: categoryFilter.value,
        size: sizeFilter.value,
        sort: sortFilter.value
      });
    });
    
    sortFilter.addEventListener('change', () => {
      loadProducts({
        category: categoryFilter.value,
        size: sizeFilter.value,
        sort: sortFilter.value
      });
    });
  }
  
  /**
   * Carica le categorie
   */
  async function loadCategories() {
    if (!window.D3MASIADO_CMS) {
      console.error('CMS not initialized');
      return;
    }
    
    try {
      const categories = await window.D3MASIADO_CMS.getCategories();
      const categoryFilter = document.querySelector('#category-filter');
      
      if (categoryFilter && categories.length > 0) {
        categories.forEach(category => {
          const option = document.createElement('option');
          option.value = category.slug;
          option.textContent = category.title;
          categoryFilter.appendChild(option);
        });
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }
  
  /**
   * Carica le taglie
   */
  async function loadSizes() {
    if (!window.D3MASIADO_CMS) {
      console.error('CMS not initialized');
      return;
    }
    
    try {
      const sizes = await window.D3MASIADO_CMS.getSizes();
      const sizeFilter = document.querySelector('#size-filter');
      
      if (sizeFilter && sizes.length > 0) {
        sizes.forEach(size => {
          const option = document.createElement('option');
          option.value = size.title;
          option.textContent = size.title;
          sizeFilter.appendChild(option);
        });
      }
    } catch (error) {
      console.error('Error loading sizes:', error);
    }
  }
  
  /**
   * Carica i prodotti
   */
  async function loadProducts(options = {}) {
    if (!window.D3MASIADO_CMS) {
      console.error('CMS not initialized');
      return;
    }
    
    const { category = '', size = '', sort = 'title', page = 1 } = options;
    const limit = cmsConfig.productsPerPage;
    const offset = (page - 1) * limit;
    
    try {
      // Mostra loading
      const productsContainer = document.querySelector('.shop-products');
      productsContainer.innerHTML = '<div class="loading-products">Caricamento prodotti...</div>';
      
      // Carica i prodotti
      const products = await window.D3MASIADO_CMS.getProducts({
        limit,
        offset,
        category,
        sort,
        language: cmsConfig.defaultLanguage
      });
      
      // Filtra per taglia se necessario
      let filteredProducts = products;
      if (size) {
        filteredProducts = products.filter(product => {
          return product.variants.some(variant => variant.size === size);
        });
      }
      
      // Renderizza i prodotti
      renderProducts(filteredProducts);
      
      // Aggiorna la paginazione
      // Nota: in un'implementazione reale, dovresti ottenere il conteggio totale dei prodotti dal CMS
      const totalProducts = 24; // Esempio, in realtà dovresti ottenere questo valore dal CMS
      const totalPages = Math.ceil(totalProducts / limit);
      renderPagination(page, totalPages, options);
    } catch (error) {
      console.error('Error loading products:', error);
      
      // Mostra errore
      const productsContainer = document.querySelector('.shop-products');
      productsContainer.innerHTML = '<div class="error-message">Errore nel caricamento dei prodotti. Riprova più tardi.</div>';
    }
  }
  
  /**
   * Renderizza i prodotti
   */
  function renderProducts(products) {
    const productsContainer = document.querySelector('.shop-products');
    
    if (!productsContainer) {
      console.error('Products container not found');
      return;
    }
    
    if (products.length === 0) {
      productsContainer.innerHTML = '<div class="no-products">Nessun prodotto trovato.</div>';
      return;
    }
    
    // Svuota il container
    productsContainer.innerHTML = '';
    
    // Renderizza ogni prodotto
    products.forEach(product => {
      // Trova la variante con il prezzo più basso
      const lowestPriceVariant = product.variants.reduce((lowest, variant) => {
        return variant.price < lowest.price ? variant : lowest;
      }, product.variants[0]);
      
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <div class="product-image-container">
          <img src="${product.mainImage}" alt="${product.title}" class="product-image">
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <div class="product-price">${cmsConfig.currencySymbol}${lowestPriceVariant.price.toFixed(2)}</div>
          <div class="product-actions">
            <button class="btn-view-product" data-slug="${product.slug}">Dettagli</button>
            <button class="btn-add-to-cart" 
              data-id="${product._id}"
              data-name="${product.title}"
              data-price="${lowestPriceVariant.price}"
              data-image="${product.mainImage}"
              data-url="/shop/${product.slug}"
            >Carrello</button>
          </div>
        </div>
      `;
      
      // Aggiungi event listeners
      const viewButton = productCard.querySelector('.btn-view-product');
      viewButton.addEventListener('click', () => {
        // In un'implementazione reale, dovresti navigare alla pagina del prodotto
        console.log('View product:', product.slug);
        showProductDetail(product.slug);
      });
      
      const addToCartButton = productCard.querySelector('.btn-add-to-cart');
      addToCartButton.addEventListener('click', () => {
        // Aggiungi al carrello Snipcart
        if (window.Snipcart) {
          window.Snipcart.api.cart.items.add({
            id: lowestPriceVariant.sku,
            name: product.title,
            price: lowestPriceVariant.price,
            url: window.location.origin + '/shop/' + product.slug,
            image: product.mainImage,
            quantity: 1,
            customFields: [
              {
                name: 'Size',
                options: product.variants.map(v => v.size),
                value: lowestPriceVariant.size
              }
            ]
          });
        } else {
          console.error('Snipcart not initialized');
        }
      });
      
      productsContainer.appendChild(productCard);
    });
  }
  
  /**
   * Renderizza la paginazione
   */
  function renderPagination(currentPage, totalPages, options) {
    const paginationContainer = document.querySelector('.shop-pagination');
    
    if (!paginationContainer) {
      console.error('Pagination container not found');
      return;
    }
    
    // Svuota il container
    paginationContainer.innerHTML = '';
    
    // Aggiungi pulsante precedente
    const prevButton = document.createElement('button');
    prevButton.className = 'pagination-button prev';
    prevButton.textContent = '←';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        loadProducts({
          ...options,
          page: currentPage - 1
        });
      }
    });
    paginationContainer.appendChild(prevButton);
    
    // Aggiungi pulsanti pagina
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement('button');
      pageButton.className = `pagination-button page ${i === currentPage ? 'active' : ''}`;
      pageButton.textContent = i;
      pageButton.addEventListener('click', () => {
        loadProducts({
          ...options,
          page: i
        });
      });
      paginationContainer.appendChild(pageButton);
    }
    
    // Aggiungi pulsante successivo
    const nextButton = document.createElement('button');
    nextButton.className = 'pagination-button next';
    nextButton.textContent = '→';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        loadProducts({
          ...options,
          page: currentPage + 1
        });
      }
    });
    paginationContainer.appendChild(nextButton);
  }
  
  /**
   * Mostra i dettagli del prodotto
   */
  async function showProductDetail(slug) {
    if (!window.D3MASIADO_CMS) {
      console.error('CMS not initialized');
      return;
    }
    
    try {
      const product = await window.D3MASIADO_CMS.getProductBySlug(slug);
      
      if (!product) {
        console.error('Product not found:', slug);
        return;
      }
      
      // Crea modal per i dettagli del prodotto
      const modal = document.createElement('div');
      modal.className = 'product-modal';
      modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
          <button class="modal-close">&times;</button>
          <div class="product-detail">
            <div class="product-gallery">
              <img src="${product.mainImage}" alt="${product.title}" class="product-main-image" id="main-product-image">
              <div class="product-thumbnails">
                ${product.images ? product.images.map((image, index) => `
                  <img src="${image}" alt="${product.title} - Image ${index + 1}" class="product-thumbnail ${index === 0 ? 'active' : ''}" data-image="${image}">
                `).join('') : ''}
              </div>
            </div>
            <div class="product-details">
              <h2 class="product-detail-title">${product.title}</h2>
              <div class="product-detail-price">${cmsConfig.currencySymbol}${product.variants[0].price.toFixed(2)}</div>
              
              <div class="product-options">
                <label class="option-label">Taglia</label>
                <div class="size-options">
                  ${product.variants.map(variant => `
                    <button class="size-option ${variant.stock <= 0 ? 'out-of-stock' : ''}" 
                      data-size="${variant.size}"
                      data-price="${variant.price}"
                      data-sku="${variant.sku}"
                      data-stock="${variant.stock}"
                      ${variant.stock <= 0 ? 'disabled' : ''}
                    >
                      ${variant.size}
                    </button>
                  `).join('')}
                </div>
                
                <div class="quantity-selector">
                  <button class="quantity-button decrease">-</button>
                  <input type="number" class="quantity-input" value="1" min="1" max="10">
                  <button class="quantity-button increase">+</button>
                </div>
                
                <button class="add-to-cart-button" data-product-id="${product._id}">
                  ${product.variants[0].stock > 0 ? 'AGGIUNGI AL CARRELLO' : 'ESAURITO'}
                </button>
              </div>
              
              <div class="product-description">
                <h3>Descrizione</h3>
                <p>${product.description}</p>
              </div>
              
              <div class="product-tabs">
                <div class="tabs-header">
                  <button class="tab-button active" data-tab="details">Dettagli</button>
                  <button class="tab-button" data-tab="shipping">Spedizione</button>
                  <button class="tab-button" data-tab="returns">Resi</button>
                </div>
                
                <div class="tab-content active" data-tab="details">
                  ${product.details || 'Nessun dettaglio disponibile.'}
                </div>
                
                <div class="tab-content" data-tab="shipping">
                  <p>Spediamo in tutto il mondo. Le spedizioni in Italia richiedono 2-4 giorni lavorativi, quelle internazionali 5-10 giorni.</p>
                </div>
                
                <div class="tab-content" data-tab="returns">
                  <p>Accettiamo resi entro 14 giorni dalla consegna. Il capo deve essere nelle condizioni originali con etichette intatte.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Aggiungi stili CSS per il modal
      const style = document.createElement('style');
      style.textContent = `
        .product-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          z-index: -1;
        }
        
        .modal-content {
          background-color: #111;
          width: 90%;
          max-width: 1000px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 2rem;
          position: relative;
          border: 1px solid #39FF14;
        }
        
        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          z-index: 10;
        }
        
        .modal-close:hover {
          color: #39FF14;
        }
      `;
      document.head.appendChild(style);
      
      // Aggiungi il modal al DOM
      document.body.appendChild(modal);
      
      // Aggiungi event listeners
      const closeButton = modal.querySelector('.modal-close');
      closeButton.addEventListener('click', () => {
        modal.remove();
      });
      
      const modalOverlay = modal.querySelector('.modal-overlay');
      modalOverlay.addEventListener('click', () => {
        modal.remove();
      });
      
      // Thumbnails
      const thumbnails = modal.querySelectorAll('.product-thumbnail');
      const mainImage = modal.querySelector('#main-product-image');
      
      thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
          // Aggiorna immagine principale
          mainImage.src = thumbnail.dataset.image;
          
          // Aggiorna classe active
          thumbnails.forEach(t => t.classList.remove('active'));
          thumbnail.classList.add('active');
        });
      });
      
      // Size options
      const sizeOptions = modal.querySelectorAll('.size-option');
      const priceElement = modal.querySelector('.product-detail-price');
      const addToCartButton = modal.querySelector('.add-to-cart-button');
      
      sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
          if (option.classList.contains('out-of-stock')) return;
          
          // Aggiorna classe active
          sizeOptions.forEach(o => o.classList.remove('active'));
          option.classList.add('active');
          
          // Aggiorna prezzo
          priceElement.textContent = `${cmsConfig.currencySymbol}${parseFloat(option.dataset.price).toFixed(2)}`;
          
          // Aggiorna pulsante
          addToCartButton.dataset.sku = option.dataset.sku;
          addToCartButton.dataset.price = option.dataset.price;
          addToCartButton.dataset.size = option.dataset.size;
        });
      });
      
      // Seleziona la prima taglia disponibile
      const firstAvailableSize = Array.from(sizeOptions).find(option => !option.classList.contains('out-of-stock'));
      if (firstAvailableSize) {
        firstAvailableSize.click();
      }
      
      // Quantity selector
      const quantityInput = modal.querySelector('.quantity-input');
      const decreaseButton = modal.querySelector('.decrease');
      const increaseButton = modal.querySelector('.increase');
      
      decreaseButton.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
          quantityInput.value = currentValue - 1;
        }
      });
      
      increaseButton.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
          quantityInput.value = currentValue + 1;
        }
      });
      
      // Add to cart
      addToCartButton.addEventListener('click', () => {
        const activeSize = modal.querySelector('.size-option.active');
        
        if (!activeSize) {
          alert('Seleziona una taglia');
          return;
        }
        
        if (window.Snipcart) {
          window.Snipcart.api.cart.items.add({
            id: activeSize.dataset.sku,
            name: product.title,
            price: parseFloat(activeSize.dataset.price),
            url: window.location.origin + '/shop/' + product.slug,
            image: product.mainImage,
            quantity: parseInt(quantityInput.value),
            customFields: [
              {
                name: 'Size',
                value: activeSize.dataset.size
              }
            ]
          });
          
          // Chiudi il modal
          modal.remove();
        } else {
          console.error('Snipcart not initialized');
        }
      });
      
      // Tabs
      const tabButtons = modal.querySelectorAll('.tab-button');
      const tabContents = modal.querySelectorAll('.tab-content');
      
      tabButtons.forEach(button => {
        button.addEventListener('click', () => {
          const tab = button.dataset.tab;
          
          // Aggiorna classe active per i pulsanti
          tabButtons.forEach(b => b.classList.remove('active'));
          button.classList.add('active');
          
          // Aggiorna classe active per i contenuti
          tabContents.forEach(c => c.classList.remove('active'));
          modal.querySelector(`.tab-content[data-tab="${tab}"]`).classList.add('active');
        });
      });
    } catch (error) {
      console.error('Error showing product detail:', error);
    }
  }
  
  // Inizializza il backend CMS
  initCmsBackend();
  
  // Esponi API pubblica
  window.D3MASIADO_SHOP = {
    loadProducts,
    showProductDetail,
    getAdminUrl: () => cmsConfig.adminUrl
  };
});

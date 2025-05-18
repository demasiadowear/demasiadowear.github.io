// product-catalog.js
/**
 * D3MAS1ADØ - Catalogo Prodotti
 * 
 * Questo script gestisce:
 * - Definizione del catalogo prodotti iniziale
 * - Supporto multilingua per prodotti
 * - Integrazione con lo shop
 */

document.addEventListener('DOMContentLoaded', function() {
  // Catalogo prodotti iniziale
  const products = [
    {
      id: 'dem-hoodie-01',
      name: {
        it: 'Felpa D3MAS1ADØ Logo',
        en: 'D3MAS1ADØ Logo Hoodie'
      },
      description: {
        it: 'Felpa con cappuccio D3MAS1ADØ con logo frontale e scritta verticale sul retro. 100% cotone organico.',
        en: 'D3MAS1ADØ hoodie with front logo and vertical text on the back. 100% organic cotton.'
      },
      price: 89.00,
      image: '/images/products/hoodie-front.jpg',
      images: [
        '/images/products/hoodie-front.jpg',
        '/images/products/hoodie-back.jpg'
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      inStock: true,
      featured: true
    },
    {
      id: 'dem-tshirt-01',
      name: {
        it: 'T-Shirt D3MAS1ADØ Essenziale',
        en: 'D3MAS1ADØ Essential T-Shirt'
      },
      description: {
        it: 'T-shirt D3MAS1ADØ con logo minimalista. Tessuto premium 100% cotone.',
        en: 'D3MAS1ADØ t-shirt with minimalist logo. Premium 100% cotton fabric.'
      },
      price: 49.00,
      image: '/images/products/tshirt-placeholder.jpg',
      images: [
        '/images/products/tshirt-placeholder.jpg'
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      inStock: true,
      featured: false
    },
    {
      id: 'dem-cap-01',
      name: {
        it: 'Cappello D3MAS1ADØ Ø',
        en: 'D3MAS1ADØ Ø Cap'
      },
      description: {
        it: 'Cappello con simbolo Ø ricamato. Regolabile, taglia unica.',
        en: 'Cap with embroidered Ø symbol. Adjustable, one size fits all.'
      },
      price: 35.00,
      image: '/images/products/cap-placeholder.jpg',
      images: [
        '/images/products/cap-placeholder.jpg'
      ],
      sizes: ['UNICA'],
      inStock: true,
      featured: false
    }
  ];
  
  /**
   * Inizializza il catalogo prodotti
   */
  function init() {
    // Renderizza i prodotti in evidenza nella homepage
    renderFeaturedProducts();
    
    // Renderizza tutti i prodotti nella pagina shop (se esiste)
    renderShopProducts();
    
    console.log('D3MAS1ADØ product catalog initialized');
  }
  
  /**
   * Renderizza i prodotti in evidenza nella homepage
   */
  function renderFeaturedProducts() {
    const featuredProducts = products.filter(product => product.featured);
    
    if (window.D3MASIADO_SHOP && featuredProducts.length > 0) {
      window.D3MASIADO_SHOP.renderProductList(featuredProducts, 'featured-products');
    }
  }
  
  /**
   * Renderizza tutti i prodotti nella pagina shop
   */
  function renderShopProducts() {
    if (window.D3MASIADO_SHOP) {
      window.D3MASIADO_SHOP.renderProductList(products, 'shop-products');
    }
  }
  
  /**
   * Ottiene un prodotto per ID
   */
  function getProductById(productId) {
    return products.find(product => product.id === productId) || null;
  }
  
  /**
   * Ottiene tutti i prodotti
   */
  function getAllProducts() {
    return [...products];
  }
  
  /**
   * Ottiene i prodotti in evidenza
   */
  function getFeaturedProducts() {
    return products.filter(product => product.featured);
  }
  
  // Esponi API pubblica
  window.D3MASIADO_CATALOG = {
    getProductById: getProductById,
    getAllProducts: getAllProducts,
    getFeaturedProducts: getFeaturedProducts
  };
  
  // Inizializza il catalogo
  init();
});

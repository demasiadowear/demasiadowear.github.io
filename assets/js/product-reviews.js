/**
 * D3MAS1ADØ - Sistema di recensioni prodotto
 * 
 * Questo script implementa un sistema di recensioni prodotto integrato
 * nelle schede shop, con supporto per recensioni interne e Trustpilot.
 */

// Configurazione
const reviewsConfig = {
  useInternalSystem: true,  // true = sistema interno, false = Trustpilot
  moderationEnabled: true,  // Richiede approvazione prima di pubblicare
  maxReviewsPerProduct: 5,  // Numero massimo di recensioni visualizzate per prodotto
  trustpilotBusinessId: 'demasiadowear' // ID business Trustpilot
};

// Classe per gestire le recensioni
class ProductReviews {
  constructor(config) {
    this.config = config;
    this.reviewsData = {};
    this.init();
  }

  init() {
    // Inizializza il sistema di recensioni
    if (this.config.useInternalSystem) {
      this.initInternalSystem();
    } else {
      this.initTrustpilot();
    }
    
    // Aggiungi listener per i form di recensione
    document.addEventListener('DOMContentLoaded', () => {
      this.setupReviewForms();
      this.loadReviews();
    });
  }

  // Inizializza il sistema interno di recensioni
  initInternalSystem() {
    console.log('Inizializzazione sistema recensioni interno');
    
    // Crea i container per le recensioni in ogni scheda prodotto
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      const productId = card.dataset.productId;
      const reviewsContainer = document.createElement('div');
      reviewsContainer.className = 'product-reviews';
      reviewsContainer.innerHTML = `
        <div class="reviews-header">
          <h4 class="reviews-title">Recensioni</h4>
          <div class="reviews-average">
            <span class="reviews-stars">★★★★★</span>
            <span class="reviews-count">(0)</span>
          </div>
        </div>
        <div class="reviews-list" id="reviews-${productId}"></div>
        <button class="review-add-btn">Aggiungi recensione</button>
        <div class="review-form-container" style="display: none;">
          <form class="review-form" data-product-id="${productId}">
            <div class="form-group">
              <label for="review-name-${productId}">Nome</label>
              <input type="text" id="review-name-${productId}" name="name" required>
            </div>
            <div class="form-group">
              <label for="review-rating-${productId}">Valutazione</label>
              <div class="rating-select">
                <span class="star" data-value="1">★</span>
                <span class="star" data-value="2">★</span>
                <span class="star" data-value="3">★</span>
                <span class="star" data-value="4">★</span>
                <span class="star" data-value="5">★</span>
                <input type="hidden" id="review-rating-${productId}" name="rating" value="5">
              </div>
            </div>
            <div class="form-group">
              <label for="review-text-${productId}">Recensione</label>
              <textarea id="review-text-${productId}" name="text" rows="4" required></textarea>
            </div>
            <button type="submit" class="review-submit">Invia recensione</button>
          </form>
        </div>
      `;
      
      // Aggiungi il container alla scheda prodotto
      card.querySelector('.product-details').appendChild(reviewsContainer);
    });
  }

  // Inizializza Trustpilot
  initTrustpilot() {
    console.log('Inizializzazione Trustpilot');
    
    // Carica lo script Trustpilot
    const script = document.createElement('script');
    script.src = `//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js`;
    script.async = true;
    document.head.appendChild(script);
    
    // Aggiungi i widget Trustpilot alle schede prodotto
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      const productId = card.dataset.productId;
      const trustpilotContainer = document.createElement('div');
      trustpilotContainer.className = 'trustpilot-widget';
      trustpilotContainer.setAttribute('data-locale', 'it-IT');
      trustpilotContainer.setAttribute('data-template-id', 'product-mini');
      trustpilotContainer.setAttribute('data-businessunit-id', this.config.trustpilotBusinessId);
      trustpilotContainer.setAttribute('data-style-height', '150px');
      trustpilotContainer.setAttribute('data-style-width', '100%');
      trustpilotContainer.setAttribute('data-theme', 'dark');
      trustpilotContainer.setAttribute('data-sku', productId);
      
      // Aggiungi il container alla scheda prodotto
      card.querySelector('.product-details').appendChild(trustpilotContainer);
    });
  }

  // Configura i form per l'invio delle recensioni
  setupReviewForms() {
    if (!this.config.useInternalSystem) return;
    
    // Gestisci i pulsanti per mostrare/nascondere il form
    const addButtons = document.querySelectorAll('.review-add-btn');
    addButtons.forEach(button => {
      button.addEventListener('click', () => {
        const container = button.nextElementSibling;
        container.style.display = container.style.display === 'none' ? 'block' : 'none';
      });
    });
    
    // Gestisci la selezione delle stelle
    const stars = document.querySelectorAll('.rating-select .star');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const value = star.dataset.value;
        const container = star.closest('.rating-select');
        const input = container.querySelector('input[type="hidden"]');
        input.value = value;
        
        // Aggiorna la visualizzazione delle stelle
        container.querySelectorAll('.star').forEach(s => {
          s.classList.toggle('selected', s.dataset.value <= value);
        });
      });
    });
    
    // Gestisci l'invio del form
    const forms = document.querySelectorAll('.review-form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const productId = form.dataset.productId;
        const name = form.querySelector('[name="name"]').value;
        const rating = form.querySelector('[name="rating"]').value;
        const text = form.querySelector('[name="text"]').value;
        
        this.submitReview(productId, name, rating, text);
        form.reset();
        form.closest('.review-form-container').style.display = 'none';
      });
    });
  }

  // Invia una nuova recensione
  submitReview(productId, name, rating, text) {
    // In un'implementazione reale, questa funzione invierebbe i dati al server
    console.log(`Recensione inviata per il prodotto ${productId}:`, { name, rating, text });
    
    // Simula il salvataggio della recensione
    if (!this.reviewsData[productId]) {
      this.reviewsData[productId] = [];
    }
    
    const review = {
      id: Date.now(),
      name,
      rating: parseInt(rating),
      text,
      date: new Date().toISOString(),
      approved: !this.config.moderationEnabled
    };
    
    this.reviewsData[productId].push(review);
    
    // Se la moderazione è disabilitata, mostra subito la recensione
    if (!this.config.moderationEnabled) {
      this.displayReviews(productId);
    } else {
      alert('La tua recensione è stata inviata e sarà pubblicata dopo l\'approvazione.');
    }
    
    // Salva le recensioni nel localStorage (simulazione database)
    localStorage.setItem('dem_reviews', JSON.stringify(this.reviewsData));
  }

  // Carica le recensioni dal "database" (localStorage)
  loadReviews() {
    if (!this.config.useInternalSystem) return;
    
    // Carica le recensioni dal localStorage
    const savedReviews = localStorage.getItem('dem_reviews');
    if (savedReviews) {
      this.reviewsData = JSON.parse(savedReviews);
      
      // Visualizza le recensioni per ogni prodotto
      Object.keys(this.reviewsData).forEach(productId => {
        this.displayReviews(productId);
      });
    }
  }

  // Visualizza le recensioni per un prodotto
  displayReviews(productId) {
    if (!this.config.useInternalSystem) return;
    
    const container = document.getElementById(`reviews-${productId}`);
    if (!container) return;
    
    // Filtra le recensioni approvate
    const reviews = this.reviewsData[productId].filter(review => review.approved);
    
    // Limita il numero di recensioni visualizzate
    const displayReviews = reviews.slice(0, this.config.maxReviewsPerProduct);
    
    // Calcola la valutazione media
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
    
    // Aggiorna il contatore e la media delle recensioni
    const card = container.closest('.product-card');
    const starsElement = card.querySelector('.reviews-stars');
    const countElement = card.querySelector('.reviews-count');
    
    if (starsElement && countElement) {
      // Aggiorna le stelle
      const fullStars = Math.round(averageRating);
      starsElement.innerHTML = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
      
      // Aggiorna il contatore
      countElement.textContent = `(${reviews.length})`;
    }
    
    // Svuota il container
    container.innerHTML = '';
    
    // Aggiungi le recensioni
    if (displayReviews.length === 0) {
      container.innerHTML = '<p class="no-reviews">Nessuna recensione disponibile</p>';
    } else {
      displayReviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-item';
        reviewElement.innerHTML = `
          <div class="review-header">
            <span class="review-author">${review.name}</span>
            <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
          </div>
          <div class="review-content">${review.text}</div>
          <div class="review-date">${new Date(review.date).toLocaleDateString()}</div>
        `;
        container.appendChild(reviewElement);
      });
    }
  }
}

// Inizializza il sistema di recensioni
const productReviews = new ProductReviews(reviewsConfig);

// Esporta la classe per l'uso in altri moduli
export default ProductReviews;

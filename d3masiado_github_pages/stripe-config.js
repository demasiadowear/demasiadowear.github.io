// stripe-config.js
/**
 * D3MAS1ADØ - Configurazione Stripe
 * 
 * Questo script gestisce:
 * - Configurazione dell'account Stripe
 * - Integrazione con Snipcart per il checkout
 * - Gestione pagamenti sicuri
 */

(function() {
  // Configurazione Stripe (placeholder - da sostituire con valori reali)
  const stripeConfig = {
    publishableKey: 'pk_test_placeholder',
    accountId: 'acct_placeholder',
    webhookSecret: 'whsec_placeholder',
    currency: 'EUR',
    locale: 'auto'
  };
  
  // Carica Stripe.js
  function loadStripe() {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    document.head.appendChild(script);
    
    script.onload = function() {
      if (window.Stripe) {
        initStripe();
      }
    };
  }
  
  // Inizializza Stripe
  function initStripe() {
    window.stripeInstance = Stripe(stripeConfig.publishableKey);
    
    // Configura l'integrazione con Snipcart
    if (window.Snipcart) {
      window.Snipcart.events.on('payment.processed', handlePaymentSuccess);
      window.Snipcart.events.on('payment.error', handlePaymentError);
    }
    
    console.log('Stripe initialized for D3MAS1ADØ shop');
  }
  
  // Gestisce il successo del pagamento
  function handlePaymentSuccess(event) {
    console.log('Payment successful', event);
    // Qui si possono aggiungere analytics, tracciamento conversioni, ecc.
  }
  
  // Gestisce gli errori di pagamento
  function handlePaymentError(event) {
    console.error('Payment error', event);
    // Qui si possono aggiungere gestione errori, notifiche, ecc.
  }
  
  // Carica Stripe quando il documento è pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadStripe);
  } else {
    loadStripe();
  }
  
  // Esponi API pubblica
  window.D3MASIADO_STRIPE = {
    getConfig: function() {
      return {...stripeConfig, publishableKey: '***'};
    }
  };
})();

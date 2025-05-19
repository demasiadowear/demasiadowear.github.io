// analytics.js
/**
 * D3MAS1ADØ - Tracking & Analytics
 * 
 * Questo script gestisce:
 * - Configurazione Google Analytics 4
 * - Implementazione Microsoft Clarity per heatmap
 * - Tracciamento eventi personalizzati
 */

document.addEventListener('DOMContentLoaded', function() {
  // Configurazione
  const config = {
    ga4Id: 'G-PLACEHOLDER', // Da sostituire con ID reale
    clarityId: 'placeholder', // Da sostituire con ID reale
    enabledInDevMode: false,
    trackingConsent: true
  };
  
  /**
   * Inizializza tutti i sistemi di analytics
   */
  function init() {
    // Verifica se siamo in ambiente di sviluppo
    const isDevelopment = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1';
    
    // Salta il tracking in ambiente di sviluppo se non abilitato
    if (isDevelopment && !config.enabledInDevMode) {
      console.log('Analytics disabilitati in ambiente di sviluppo');
      return;
    }
    
    // Inizializza Google Analytics 4
    initGA4();
    
    // Inizializza Microsoft Clarity
    initClarity();
    
    // Configura eventi personalizzati
    setupCustomEvents();
    
    console.log('D3MAS1ADØ analytics initialized');
  }
  
  /**
   * Inizializza Google Analytics 4
   */
  function initGA4() {
    // Carica lo script di Google Analytics
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.ga4Id}`;
    script.async = true;
    document.head.appendChild(script);
    
    // Configura Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', config.ga4Id, {
      'send_page_view': true,
      'anonymize_ip': true,
      'cookie_flags': 'SameSite=None;Secure'
    });
    
    // Salva la funzione gtag per uso futuro
    window.gtag = gtag;
  }
  
  /**
   * Inizializza Microsoft Clarity
   */
  function initClarity() {
    // Carica lo script di Microsoft Clarity
    const script = document.createElement('script');
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${config.clarityId}");
    `;
    document.head.appendChild(script);
  }
  
  /**
   * Configura eventi personalizzati
   */
  function setupCustomEvents() {
    // Traccia click su "Shop"
    trackElementClicks('shop-link', 'click_shop');
    
    // Traccia click su "Lookbook"
    trackElementClicks('lookbook-link', 'click_lookbook');
    
    // Traccia cambio lingua
    document.addEventListener('languageChanged', function(e) {
      trackEvent('language_change', {
        language: e.detail.language
      });
    });
    
    // Traccia interazioni con Lana AI
    trackLanaInteractions();
    
    // Traccia interazioni con lo shop
    trackShopInteractions();
    
    // Traccia scroll profondo
    trackDeepScroll();
  }
  
  /**
   * Traccia click su elementi specifici
   */
  function trackElementClicks(className, eventName) {
    const elements = document.querySelectorAll(`.${className}, [data-track="${className}"]`);
    
    elements.forEach(element => {
      element.addEventListener('click', function(e) {
        // Ottieni dati aggiuntivi dall'elemento
        const data = {
          element_text: element.textContent.trim(),
          element_url: element.href || '',
          element_id: element.id || ''
        };
        
        // Traccia l'evento
        trackEvent(eventName, data);
      });
    });
  }
  
  /**
   * Traccia interazioni con Lana AI
   */
  function trackLanaInteractions() {
    // Ascolta eventi personalizzati da Lana
    document.addEventListener('lana_chat_open', function() {
      trackEvent('lana_chat_open');
    });
    
    document.addEventListener('lana_chat_close', function() {
      trackEvent('lana_chat_close');
    });
    
    document.addEventListener('lana_message_sent', function(e) {
      trackEvent('lana_message_sent', {
        message_length: e.detail.message.length
      });
    });
  }
  
  /**
   * Traccia interazioni con lo shop
   */
  function trackShopInteractions() {
    // Traccia eventi Snipcart
    if (window.Snipcart) {
      // Prodotto aggiunto al carrello
      window.Snipcart.events.on('item.added', function(item) {
        trackEvent('add_to_cart', {
          item_id: item.id,
          item_name: item.name,
          item_price: item.price,
          currency: 'EUR'
        });
      });
      
      // Checkout iniziato
      window.Snipcart.events.on('checkout.started', function(data) {
        trackEvent('begin_checkout', {
          value: data.subtotal,
          currency: 'EUR',
          items: data.items.map(item => ({
            item_id: item.id,
            item_name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        });
      });
      
      // Acquisto completato
      window.Snipcart.events.on('order.completed', function(data) {
        trackEvent('purchase', {
          transaction_id: data.token,
          value: data.total,
          currency: 'EUR',
          tax: data.taxesTotal,
          shipping: data.shippingTotal,
          items: data.items.map(item => ({
            item_id: item.id,
            item_name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        });
      });
    }
  }
  
  /**
   * Traccia scroll profondo
   */
  function trackDeepScroll() {
    // Punti percentuali di scroll da tracciare
    const scrollPoints = [25, 50, 75, 90];
    let scrollPointsReached = {};
    
    // Inizializza i punti come non raggiunti
    scrollPoints.forEach(point => {
      scrollPointsReached[point] = false;
    });
    
    // Funzione per calcolare la percentuale di scroll
    function getScrollPercentage() {
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      return (scrollPosition / documentHeight) * 100;
    }
    
    // Listener per lo scroll
    window.addEventListener('scroll', function() {
      const scrollPercentage = getScrollPercentage();
      
      // Verifica se abbiamo raggiunto nuovi punti di scroll
      scrollPoints.forEach(point => {
        if (!scrollPointsReached[point] && scrollPercentage >= point) {
          scrollPointsReached[point] = true;
          
          // Traccia l'evento
          trackEvent('scroll_depth', {
            depth_percentage: point
          });
        }
      });
    });
  }
  
  /**
   * Traccia un evento personalizzato
   */
  function trackEvent(eventName, params = {}) {
    // Aggiungi parametri comuni
    const commonParams = {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    };
    
    // Unisci i parametri
    const eventParams = {...commonParams, ...params};
    
    // Traccia con Google Analytics 4
    if (window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
    
    // Traccia con Microsoft Clarity (se supporta eventi personalizzati)
    if (window.clarity && typeof window.clarity.event === 'function') {
      window.clarity.event(eventName, eventParams);
    }
    
    // Log in console (solo in sviluppo)
    if (config.enabledInDevMode) {
      console.log(`Analytics Event: ${eventName}`, eventParams);
    }
  }
  
  // Inizializza gli analytics
  init();
  
  // Esponi API pubblica
  window.D3MASIADO_ANALYTICS = {
    trackEvent: trackEvent
  };
});

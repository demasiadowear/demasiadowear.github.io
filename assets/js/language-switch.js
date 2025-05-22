// Language Switch JavaScript per D3MAS1ADØ

document.addEventListener('DOMContentLoaded', function() {
    // Elementi UI
    const langIT = document.querySelector('.lang-it');
    const langEN = document.querySelector('.lang-en');
    
    // Contenuti multilingua
    const translations = {
        it: {
            // Hero Section
            'hero-title': 'L\'unico modo che conosciamo',
            
            // Manifesto Section
            'section-title-manifesto': 'Manifesto',
            'manifesto-text-1': 'D3MAS1ADØ nasce come risposta alla standardizzazione della moda contemporanea. Siamo un collettivo di designer, artisti e attivisti uniti dalla visione di un lusso urbano autentico, che non scende a compromessi.',
            'manifesto-text-2': 'Le nostre collezioni raccontano storie di resistenza culturale, di identità fluide, di orgoglio per le proprie radici. Ogni capo è un manifesto, ogni design una dichiarazione di intenti.',
            'manifesto-text-3': 'Crediamo in un lusso che non sia esclusione ma inclusione consapevole. Un lusso che parla il linguaggio della strada ma che non rinuncia alla qualità artigianale e alla ricerca estetica.',
            'manifesto-link': 'LEGGI IL MANIFESTO COMPLETO',
            
            // Collections Section
            'section-title-collections': 'Collezioni',
            'collection-worldwide-title': 'WorldWide',
            'collection-worldwide-desc': 'Lusso urbano globale, senza confini',
            'collection-intifada-title': 'Intifada',
            'collection-intifada-desc': 'Resistenza urbana, identità senza compromessi',
            'collection-revolucion-title': 'Revolución',
            'collection-revolucion-desc': 'Ribellione estetica, lusso sovversivo',
            'collection-link': 'ESPLORA',
            
            // Lookbook Section
            'section-title-lookbook': 'Lookbook',
            
            // Unidad-31Ø Section
            'section-title-unidad': 'Unidad-31Ø',
            'unidad-subtitle': 'Area privata per contenuti esclusivi',
            'unidad-email-placeholder': 'Email',
            'unidad-code-placeholder': 'Codice di accesso',
            'unidad-submit': 'ACCEDI',
            'unidad-info': 'Accedi all\'area riservata per contenuti esclusivi, preordini e collezioni in anteprima.',
            
            // Shop Section
            'section-title-shop': 'Shop',
            'shop-filter-all': 'Tutti',
            'shop-filter-worldwide': 'WorldWide',
            'shop-filter-intifada': 'Intifada',
            'shop-filter-revolucion': 'Revolución',
            'add-to-cart': 'AGGIUNGI AL CARRELLO',
            
            // Cart
            'cart-title': 'Carrello',
            'cart-empty': 'Il carrello è vuoto',
            'cart-total': 'Totale:',
            'cart-checkout': 'CHECKOUT',
            
            // Footer
            'footer-contact': 'Email:',
            'footer-privacy': 'Privacy Policy',
            'footer-terms': 'Termini e Condizioni',
            'footer-shipping': 'Spedizioni',
            'footer-returns': 'Resi',
            'footer-copyright': '© 2025 D3MAS1ADØ. Tutti i diritti riservati.',
            
            // Lana AI
            'lana-info': 'Hai domande? Chiedi a Lana, la nostra AI brasitaliana ti risponde h24.',
            'lana-header': 'Lana AI',
            'lana-placeholder': 'Scrivi un messaggio...',
            'lana-greeting': 'Ciao! Sono Lana, l\'assistente AI di D3MAS1ADØ. Come posso aiutarti oggi?'
        },
        en: {
            // Hero Section
            'hero-title': 'The only way we know',
            
            // Manifesto Section
            'section-title-manifesto': 'Manifesto',
            'manifesto-text-1': 'D3MAS1ADØ was born as a response to the standardization of contemporary fashion. We are a collective of designers, artists and activists united by the vision of an authentic urban luxury that makes no compromises.',
            'manifesto-text-2': 'Our collections tell stories of cultural resistance, fluid identities, pride in one\'s roots. Each piece is a manifesto, each design a statement of intent.',
            'manifesto-text-3': 'We believe in a luxury that is not exclusion but conscious inclusion. A luxury that speaks the language of the street but does not give up craftsmanship and aesthetic research.',
            'manifesto-link': 'READ THE FULL MANIFESTO',
            
            // Collections Section
            'section-title-collections': 'Collections',
            'collection-worldwide-title': 'WorldWide',
            'collection-worldwide-desc': 'Global urban luxury, without boundaries',
            'collection-intifada-title': 'Intifada',
            'collection-intifada-desc': 'Urban resistance, uncompromising identity',
            'collection-revolucion-title': 'Revolución',
            'collection-revolucion-desc': 'Aesthetic rebellion, subversive luxury',
            'collection-link': 'EXPLORE',
            
            // Lookbook Section
            'section-title-lookbook': 'Lookbook',
            
            // Unidad-31Ø Section
            'section-title-unidad': 'Unidad-31Ø',
            'unidad-subtitle': 'Private area for exclusive content',
            'unidad-email-placeholder': 'Email',
            'unidad-code-placeholder': 'Access code',
            'unidad-submit': 'LOGIN',
            'unidad-info': 'Access the reserved area for exclusive content, pre-orders and preview collections.',
            
            // Shop Section
            'section-title-shop': 'Shop',
            'shop-filter-all': 'All',
            'shop-filter-worldwide': 'WorldWide',
            'shop-filter-intifada': 'Intifada',
            'shop-filter-revolucion': 'Revolución',
            'add-to-cart': 'ADD TO CART',
            
            // Cart
            'cart-title': 'Cart',
            'cart-empty': 'Your cart is empty',
            'cart-total': 'Total:',
            'cart-checkout': 'CHECKOUT',
            
            // Footer
            'footer-contact': 'Email:',
            'footer-privacy': 'Privacy Policy',
            'footer-terms': 'Terms and Conditions',
            'footer-shipping': 'Shipping',
            'footer-returns': 'Returns',
            'footer-copyright': '© 2025 D3MAS1ADØ. All rights reserved.',
            
            // Lana AI
            'lana-info': 'Questions? Ask Lana, our Brazilian-Italian AI responds 24/7.',
            'lana-header': 'Lana AI',
            'lana-placeholder': 'Type a message...',
            'lana-greeting': 'Hi! I\'m Lana, D3MAS1ADØ\'s AI assistant. How can I help you today?'
        }
    };
    
    // Lingua predefinita
    let currentLang = getBrowserLanguage();
    
    // Inizializza la lingua
    setLanguage(currentLang);
    
    // Event listeners per i pulsanti di cambio lingua
    if (langIT && langEN) {
        langIT.addEventListener('click', function(e) {
            e.preventDefault();
            setLanguage('it');
        });
        
        langEN.addEventListener('click', function(e) {
            e.preventDefault();
            setLanguage('en');
        });
    }
    
    // Funzione per impostare la lingua
    function setLanguage(lang) {
        // Aggiorna la lingua corrente
        currentLang = lang;
        
        // Aggiorna la classe active sui pulsanti di lingua
        if (langIT && langEN) {
            if (lang === 'it') {
                langIT.classList.add('active');
                langEN.classList.remove('active');
            } else {
                langIT.classList.remove('active');
                langEN.classList.add('active');
            }
        }
        
        // Aggiorna l'attributo lang dell'HTML
        document.documentElement.setAttribute('lang', lang);
        
        // Aggiorna i testi
        updateTexts(lang);
        
        // Salva la preferenza di lingua
        localStorage.setItem('d3masiadoLang', lang);
    }
    
    // Funzione per aggiornare i testi
    function updateTexts(lang) {
        // Hero Section
        updateElementText('.hero-title', 'hero-title', lang);
        
        // Manifesto Section
        updateElementText('.section-title', 'section-title-manifesto', lang);
        updateElementText('.manifesto-text:nth-of-type(1)', 'manifesto-text-1', lang);
        updateElementText('.manifesto-text:nth-of-type(2)', 'manifesto-text-2', lang);
        updateElementText('.manifesto-text:nth-of-type(3)', 'manifesto-text-3', lang);
        updateElementText('.manifesto-link', 'manifesto-link', lang);
        
        // Collections Section
        updateElementText('.collections-section .section-title', 'section-title-collections', lang);
        updateElementText('.collection-item:nth-of-type(1) .collection-title', 'collection-worldwide-title', lang);
        updateElementText('.collection-item:nth-of-type(1) .collection-description', 'collection-worldwide-desc', lang);
        updateElementText('.collection-item:nth-of-type(2) .collection-title', 'collection-intifada-title', lang);
        updateElementText('.collection-item:nth-of-type(2) .collection-description', 'collection-intifada-desc', lang);
        updateElementText('.collection-item:nth-of-type(3) .collection-title', 'collection-revolucion-title', lang);
        updateElementText('.collection-item:nth-of-type(3) .collection-description', 'collection-revolucion-desc', lang);
        document.querySelectorAll('.collection-link').forEach(el => {
            el.textContent = translations[lang]['collection-link'];
        });
        
        // Lookbook Section
        updateElementText('.lookbook-section .section-title', 'section-title-lookbook', lang);
        
        // Unidad-31Ø Section
        updateElementText('.unidad-section .section-title', 'section-title-unidad', lang);
        updateElementText('.unidad-section .section-subtitle', 'unidad-subtitle', lang);
        updateElementPlaceholder('#unidad-email', 'unidad-email-placeholder', lang);
        updateElementPlaceholder('#unidad-code', 'unidad-code-placeholder', lang);
        updateElementText('.unidad-submit', 'unidad-submit', lang);
        updateElementText('.unidad-info', 'unidad-info', lang);
        
        // Shop Section
        updateElementText('.shop-section .section-title', 'section-title-shop', lang);
        updateElementText('.shop-filter[data-filter="all"]', 'shop-filter-all', lang);
        updateElementText('.shop-filter[data-filter="worldwide"]', 'shop-filter-worldwide', lang);
        updateElementText('.shop-filter[data-filter="intifada"]', 'shop-filter-intifada', lang);
        updateElementText('.shop-filter[data-filter="revolucion"]', 'shop-filter-revolucion', lang);
        document.querySelectorAll('.add-to-cart').forEach(el => {
            el.innerHTML = `<i class="fas fa-shopping-cart"></i> ${translations[lang]['add-to-cart']}`;
        });
        
        // Cart
        updateElementText('.cart-header h3', 'cart-title', lang);
        updateElementText('.cart-empty', 'cart-empty', lang);
        updateElementText('.cart-total span:first-child', 'cart-total', lang);
        updateElementText('.cart-checkout', 'cart-checkout', lang);
        
        // Footer
        updateElementText('.footer-contact p', 'footer-contact', lang);
        updateElementText('.footer-links a:nth-of-type(1)', 'footer-privacy', lang);
        updateElementText('.footer-links a:nth-of-type(2)', 'footer-terms', lang);
        updateElementText('.footer-links a:nth-of-type(3)', 'footer-shipping', lang);
        updateElementText('.footer-links a:nth-of-type(4)', 'footer-returns', lang);
        updateElementText('.footer-copyright p', 'footer-copyright', lang);
        
        // Lana AI
        updateElementText('.lana-info', 'lana-info', lang);
        updateElementText('.lana-header h3', 'lana-header', lang);
        updateElementPlaceholder('.lana-input input', 'lana-placeholder', lang);
        updateElementText('.lana-message.lana p', 'lana-greeting', lang);
    }
    
    // Funzione di supporto per aggiornare il testo di un elemento
    function updateElementText(selector, key, lang) {
        const element = document.querySelector(selector);
        if (element && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    }
    
    // Funzione di supporto per aggiornare il placeholder di un elemento
    function updateElementPlaceholder(selector, key, lang) {
        const element = document.querySelector(selector);
        if (element && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    }
    
    // Funzione per ottenere la lingua del browser
    function getBrowserLanguage() {
        // Controlla se c'è una preferenza salvata
        const savedLang = localStorage.getItem('d3masiadoLang');
        if (savedLang) {
            return savedLang;
        }
        
        // Altrimenti usa la lingua del browser
        const browserLang = navigator.language || navigator.userLanguage;
        return browserLang.startsWith('it') ? 'it' : 'en';
    }
});

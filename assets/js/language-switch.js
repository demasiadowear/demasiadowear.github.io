/**
 * D3MAS1ADØ - Language Switch
 * 
 * Gestisce il cambio di lingua del sito (IT/EN)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Riferimenti agli elementi DOM
    const langOptions = document.querySelectorAll('.lang-option');
    const mobileLangOptions = document.querySelectorAll('.mobile-lang-option');
    
    // Contenuti multilingua
    const translations = {
        'it': {
            'hero-title': 'L\'unico modo che conosciamo',
            'shop-button': 'SHOP',
            'lookbook-button': 'LOOKBOOK',
            'collections-title': 'Collezioni',
            'collections-subtitle': 'Tre mondi. Tre storie. Un\'identità.',
            'intifada-tagline': 'La nostra arma è restare vivi. Vestiti per combattere.',
            'revolucion-tagline': 'Vestiti come se stessi scappando. O resistendo. O facendo l\'amore sotto un portico.',
            'landofsmile-tagline': 'Nel paese dei sorrisi, l\'unico vero è quello di chi non si finge.',
            'explore': 'Esplora',
            'lookbook-title': 'Lookbook',
            'lookbook-subtitle': 'Stile urbano. Attitudine globale.',
            'explore-lookbook': 'Esplora il lookbook completo',
            'manifesto-text-1': 'D3MAS1ADØ non è solo un brand. È un movimento culturale che nasce dalle strade, dalle periferie, dai margini.',
            'manifesto-text-2': 'Creiamo capi che raccontano storie di resistenza, di orgoglio, di identità.',
            'manifesto-text-3': 'Unidad-31Ø è la nostra community. Un rifugio per chi cerca autenticità in un mondo di apparenze.',
            'read-manifesto': 'Leggi il manifesto completo',
            'unidad-title': '#Unidad310',
            'unidad-subtitle': 'La nostra community. Il nostro movimento.',
            'preorder-title': 'Preorder Now',
            'preorder-subtitle': 'Accesso anticipato alle nuove collezioni',
            'preorder-cta': 'Preordina ora',
            'nav-shop': 'Shop',
            'nav-manifesto': 'Manifesto',
            'nav-lookbook': 'Lookbook',
            'nav-unidad': 'Unidad-310',
            'nav-about': 'About',
            'footer-nav': 'Naviga',
            'footer-legal': 'Legal',
            'footer-social': 'Social',
            'footer-terms': 'Termini e Condizioni',
            'footer-cookies': 'Cookie Policy',
            'footer-join': 'Join Us',
            'lana-greeting': 'Ciao, sono Lana. Stylist digitale di D3MAS1ADØ. Cosa stai cercando oggi?',
            'lana-placeholder': 'Scrivi un messaggio...',
            'lana-send': 'Invia',
            'admin-title': 'Admin Login',
            'admin-username': 'Username',
            'admin-password': 'Password',
            'admin-login': 'Login'
        },
        'en': {
            'hero-title': 'The only way we know',
            'shop-button': 'SHOP',
            'lookbook-button': 'LOOKBOOK',
            'collections-title': 'Collections',
            'collections-subtitle': 'Three worlds. Three stories. One identity.',
            'intifada-tagline': 'Our weapon is staying alive. Dress to fight.',
            'revolucion-tagline': 'Dress like you\'re running away. Or resisting. Or making love under a porch.',
            'landofsmile-tagline': 'In the land of smiles, the only real one is from those who don\'t pretend.',
            'explore': 'Explore',
            'lookbook-title': 'Lookbook',
            'lookbook-subtitle': 'Urban style. Global attitude.',
            'explore-lookbook': 'Explore the full lookbook',
            'manifesto-text-1': 'D3MAS1ADØ is not just a brand. It\'s a cultural movement born from the streets, the outskirts, the margins.',
            'manifesto-text-2': 'We create garments that tell stories of resistance, pride, and identity.',
            'manifesto-text-3': 'Unidad-31Ø is our community. A refuge for those seeking authenticity in a world of appearances.',
            'read-manifesto': 'Read the full manifesto',
            'unidad-title': '#Unidad310',
            'unidad-subtitle': 'Our community. Our movement.',
            'preorder-title': 'Preorder Now',
            'preorder-subtitle': 'Early access to new collections',
            'preorder-cta': 'Preorder now',
            'nav-shop': 'Shop',
            'nav-manifesto': 'Manifesto',
            'nav-lookbook': 'Lookbook',
            'nav-unidad': 'Unidad-310',
            'nav-about': 'About',
            'footer-nav': 'Navigate',
            'footer-legal': 'Legal',
            'footer-social': 'Social',
            'footer-terms': 'Terms & Conditions',
            'footer-cookies': 'Cookie Policy',
            'footer-join': 'Join Us',
            'lana-greeting': 'Hi, I\'m Lana. D3MAS1ADØ\'s digital stylist. What are you looking for today?',
            'lana-placeholder': 'Type a message...',
            'lana-send': 'Send',
            'admin-title': 'Admin Login',
            'admin-username': 'Username',
            'admin-password': 'Password',
            'admin-login': 'Login'
        }
    };
    
    // Inizializzazione
    initLanguageSwitch();
    
    /**
     * Inizializza il cambio lingua
     */
    function initLanguageSwitch() {
        // Determina lingua iniziale
        let currentLang = getBrowserLanguage();
        setActiveLanguage(currentLang);
        
        // Event listener per opzioni lingua desktop
        if (langOptions) {
            langOptions.forEach(option => {
                option.addEventListener('click', function(e) {
                    e.preventDefault();
                    const lang = this.getAttribute('data-lang');
                    setActiveLanguage(lang);
                });
            });
        }
        
        // Event listener per opzioni lingua mobile
        if (mobileLangOptions) {
            mobileLangOptions.forEach(option => {
                option.addEventListener('click', function(e) {
                    e.preventDefault();
                    const lang = this.getAttribute('data-lang');
                    setActiveLanguage(lang);
                });
            });
        }
    }
    
    /**
     * Imposta la lingua attiva
     */
    function setActiveLanguage(lang) {
        // Salva la lingua nelle preferenze
        localStorage.setItem('d3masiado_lang', lang);
        
        // Aggiorna classi attive
        updateActiveClasses(lang);
        
        // Traduci contenuti
        translateContent(lang);
    }
    
    /**
     * Aggiorna classi attive per le opzioni lingua
     */
    function updateActiveClasses(lang) {
        // Desktop
        if (langOptions) {
            langOptions.forEach(option => {
                if (option.getAttribute('data-lang') === lang) {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }
            });
        }
        
        // Mobile
        if (mobileLangOptions) {
            mobileLangOptions.forEach(option => {
                if (option.getAttribute('data-lang') === lang) {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }
            });
        }
    }
    
    /**
     * Traduci i contenuti del sito
     */
    function translateContent(lang) {
        if (!translations[lang]) return;
        
        // Traduci elementi con attributo data-translate
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        
        // Traduci elementi specifici per ID
        for (const key in translations[lang]) {
            const el = document.getElementById(key);
            if (el) {
                el.textContent = translations[lang][key];
            }
        }
        
        // Traduci placeholder
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });
        
        // Aggiorna attributo lang dell'html
        document.documentElement.lang = lang;
    }
    
    /**
     * Ottieni la lingua del browser
     */
    function getBrowserLanguage() {
        // Controlla se c'è una preferenza salvata
        const savedLang = localStorage.getItem('d3masiado_lang');
        if (savedLang) return savedLang;
        
        // Altrimenti usa la lingua del browser
        const browserLang = navigator.language || navigator.userLanguage;
        
        // Default a italiano se la lingua del browser è italiano, altrimenti inglese
        return browserLang.startsWith('it') ? 'it' : 'en';
    }
});

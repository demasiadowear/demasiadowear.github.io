// language-switch.js
/**
 * D3MAS1ADØ - Sistema di gestione multilingua IT/EN
 * 
 * Questo script gestisce:
 * - Rilevamento automatico della lingua preferita dell'utente
 * - Switch manuale tra italiano e inglese
 * - Persistenza della scelta lingua tramite localStorage
 * - Aggiornamento dinamico dei contenuti localizzati
 * - Gestione corretta di SEO (lang, hreflang)
 */

document.addEventListener('DOMContentLoaded', function() {
  // Configurazione lingue supportate
  const SUPPORTED_LANGUAGES = ['it', 'en'];
  const DEFAULT_LANGUAGE = 'it';
  
  // Elementi DOM per lo switch lingua
  let languageSwitch;
  let languageButtons = {};
  
  // Stato corrente
  let currentLanguage = DEFAULT_LANGUAGE;
  
  /**
   * Rileva la lingua preferita dell'utente
   * Priorità: 1. localStorage, 2. browser language, 3. default (it)
   */
  function detectPreferredLanguage() {
    // Controlla se c'è una preferenza salvata
    const savedLanguage = localStorage.getItem('d3masiado_language');
    if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Controlla la lingua del browser
    const browserLanguage = navigator.language.split('-')[0];
    if (browserLanguage === 'it') {
      return 'it';
    }
    
    // Default: inglese per tutti gli altri
    return 'en';
  }
  
  /**
   * Cambia la lingua corrente
   */
  function switchLanguage(lang) {
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      console.error(`Lingua non supportata: ${lang}`);
      return;
    }
    
    // Aggiorna lo stato corrente
    currentLanguage = lang;
    
    // Salva la preferenza
    localStorage.setItem('d3masiado_language', lang);
    
    // Aggiorna l'attributo lang dell'HTML
    document.documentElement.lang = lang;
    
    // Aggiorna lo stato visivo dei pulsanti
    updateLanguageButtons();
    
    // Aggiorna tutti i contenuti localizzati
    updateLocalizedContent();
    
    // Aggiorna i meta tag hreflang
    updateHreflangTags();
    
    // Evento personalizzato per altri componenti (es. Lana AI)
    const event = new CustomEvent('languageChanged', { detail: { language: lang } });
    document.dispatchEvent(event);
  }
  
  /**
   * Aggiorna lo stato visivo dei pulsanti lingua
   */
  function updateLanguageButtons() {
    Object.keys(languageButtons).forEach(lang => {
      if (lang === currentLanguage) {
        languageButtons[lang].classList.add('active');
      } else {
        languageButtons[lang].classList.remove('active');
      }
    });
  }
  
  /**
   * Aggiorna tutti i contenuti localizzati nella pagina
   */
  function updateLocalizedContent() {
    // Seleziona tutti gli elementi con attributo data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translations = window.D3MASIADO_TRANSLATIONS || {};
      
      if (translations[key] && translations[key][currentLanguage]) {
        element.innerHTML = translations[key][currentLanguage];
      }
    });
  }
  
  /**
   * Aggiorna i meta tag hreflang per SEO
   */
  function updateHreflangTags() {
    // Rimuovi eventuali tag hreflang esistenti
    const existingTags = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingTags.forEach(tag => tag.remove());
    
    // Crea i nuovi tag hreflang
    const head = document.head;
    const currentUrl = window.location.href.split('?')[0]; // URL base senza parametri
    
    SUPPORTED_LANGUAGES.forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = lang;
      link.href = `${currentUrl}${lang === DEFAULT_LANGUAGE ? '' : `?lang=${lang}`}`;
      head.appendChild(link);
    });
    
    // Aggiungi anche il tag x-default
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = currentUrl;
    head.appendChild(defaultLink);
  }
  
  /**
   * Crea lo switch lingua nell'interfaccia
   */
  function createLanguageSwitch() {
    // Crea il container per lo switch
    languageSwitch = document.createElement('div');
    languageSwitch.className = 'language-switch';
    
    // Crea i pulsanti per ogni lingua
    SUPPORTED_LANGUAGES.forEach(lang => {
      const button = document.createElement('button');
      button.className = 'language-button';
      button.setAttribute('data-lang', lang);
      button.textContent = lang.toUpperCase();
      
      // Aggiungi evento click
      button.addEventListener('click', () => switchLanguage(lang));
      
      // Salva il riferimento
      languageButtons[lang] = button;
      
      // Aggiungi al container
      languageSwitch.appendChild(button);
      
      // Aggiungi separatore (tranne dopo l'ultimo)
      if (lang !== SUPPORTED_LANGUAGES[SUPPORTED_LANGUAGES.length - 1]) {
        const separator = document.createElement('span');
        separator.className = 'language-separator';
        separator.textContent = '|';
        languageSwitch.appendChild(separator);
      }
    });
    
    // Aggiungi lo switch al DOM
    const header = document.querySelector('header');
    if (header) {
      header.appendChild(languageSwitch);
    } else {
      // Fallback: aggiungi all'inizio del body
      document.body.insertBefore(languageSwitch, document.body.firstChild);
    }
    
    // Aggiungi stili CSS
    addLanguageSwitchStyles();
  }
  
  /**
   * Aggiungi stili CSS per lo switch lingua
   */
  function addLanguageSwitchStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .language-switch {
        display: flex;
        align-items: center;
        margin-left: auto;
        padding: 0.5rem;
      }
      
      .language-button {
        background: none;
        border: none;
        color: white;
        font-family: 'Orbitron', sans-serif;
        font-size: 0.875rem;
        cursor: pointer;
        padding: 0.25rem 0.5rem;
        transition: color 0.3s ease;
      }
      
      .language-button:hover {
        color: #39FF14;
      }
      
      .language-button.active {
        color: #39FF14;
        font-weight: bold;
      }
      
      .language-separator {
        color: rgba(255, 255, 255, 0.5);
        margin: 0 0.25rem;
      }
      
      @media (max-width: 767px) {
        .language-switch {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
        }
        
        .language-button {
          font-size: 0.75rem;
          padding: 0.25rem;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  /**
   * Inizializza il sistema multilingua
   */
  function init() {
    // Rileva la lingua preferita
    currentLanguage = detectPreferredLanguage();
    
    // Crea lo switch lingua
    createLanguageSwitch();
    
    // Imposta la lingua iniziale
    switchLanguage(currentLanguage);
    
    console.log(`D3MAS1ADØ language system initialized: ${currentLanguage}`);
  }
  
  // Avvia il sistema
  init();
  
  // Esponi API pubblica
  window.D3MASIADO_LANGUAGE = {
    getCurrentLanguage: () => currentLanguage,
    switchLanguage: switchLanguage
  };
});

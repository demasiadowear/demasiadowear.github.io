// Language Switch JavaScript per D3MAS1ADØ
document.addEventListener('DOMContentLoaded', function() {
  // Elementi per il cambio lingua
  const langIt = document.querySelector('.lang-it');
  const langEn = document.querySelector('.lang-en');
  
  // Elementi con contenuto multilingua
  const multilingualElements = document.querySelectorAll('[data-it][data-en]');
  
  // Funzione per impostare la lingua
  function setLanguage(lang) {
    // Aggiorna classe attiva sui pulsanti lingua
    if (lang === 'it') {
      langIt.classList.add('active');
      langEn.classList.remove('active');
      document.documentElement.lang = 'it';
    } else {
      langEn.classList.add('active');
      langIt.classList.remove('active');
      document.documentElement.lang = 'en';
    }
    
    // Aggiorna tutti gli elementi multilingua
    multilingualElements.forEach(el => {
      el.textContent = el.getAttribute(`data-${lang}`);
    });
    
    // Salva la preferenza nel localStorage
    localStorage.setItem('d3masiado-language', lang);
  }
  
  // Gestione click sui pulsanti lingua
  if (langIt) {
    langIt.addEventListener('click', function(e) {
      e.preventDefault();
      setLanguage('it');
    });
  }
  
  if (langEn) {
    langEn.addEventListener('click', function(e) {
      e.preventDefault();
      setLanguage('en');
    });
  }
  
  // Imposta lingua iniziale
  const savedLang = localStorage.getItem('d3masiado-language');
  const browserLang = navigator.language.substring(0, 2);
  
  // Priorità: 1. Lingua salvata, 2. Lingua browser (it), 3. Default (en)
  if (savedLang) {
    setLanguage(savedLang);
  } else if (browserLang === 'it') {
    setLanguage('it');
  } else {
    setLanguage('en');
  }
});

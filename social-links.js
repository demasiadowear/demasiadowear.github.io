/**
 * D3MAS1ADØ - Social Media Links
 * 
 * Questo script gestisce l'integrazione dei link ai social media ufficiali
 * e l'attivazione dei bottoni principali del sito.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Configurazione link social
  const socialLinks = {
    facebook: 'https://www.facebook.com/profile.php?id=61576386110261',
    instagram: 'https://www.instagram.com/demasiadowear?igsh=bXQ0bGxtZTgwaTV0',
    tiktok: 'https://www.tiktok.com/@demasiadowear'
  };
  
  // Configurazione bottoni principali
  const mainButtons = {
    preorder: {
      url: '#preorder-form',
      isForm: true,
      formId: 'preorder-form'
    },
    shop: {
      url: '#shop-section',
      isForm: false
    },
    lookbook: {
      url: '#lookbook-section',
      isForm: false
    },
    joinus: {
      url: 'https://wa.me/+393XXXXXXXXX', // Sostituire con numero WhatsApp Business
      isForm: false,
      newTab: true
    }
  };
  
  /**
   * Inizializza i link social
   */
  function initSocialLinks() {
    // Crea il container per i social se non esiste
    if (!document.querySelector('.social-links')) {
      createSocialIcons();
    }
    
    // Collega i link social esistenti
    updateExistingSocialLinks();
  }
  
  /**
   * Crea le icone social se non esistono
   */
  function createSocialIcons() {
    // Crea il container per i social
    const socialContainer = document.createElement('div');
    socialContainer.className = 'social-links';
    
    // Aggiungi le icone social
    const socialHTML = `
      <a href="${socialLinks.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      </a>
      <a href="${socialLinks.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </a>
      <a href="${socialLinks.tiktok}" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
          <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
          <path d="M15 8v8a4 4 0 0 1-4 4"></path>
          <line x1="15" y1="4" x2="15" y2="12"></line>
        </svg>
      </a>
    `;
    
    socialContainer.innerHTML = socialHTML;
    
    // Aggiungi stili CSS
    const style = document.createElement('style');
    style.textContent = `
      .social-links {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-left: auto;
      }
      
      .social-links a {
        color: white;
        transition: color 0.3s ease;
      }
      
      .social-links a:hover {
        color: #39FF14;
      }
      
      @media (max-width: 767px) {
        .social-links {
          position: absolute;
          top: 0.5rem;
          right: 5rem;
        }
        
        .social-links a svg {
          width: 20px;
          height: 20px;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Inserisci nel DOM
    const header = document.querySelector('header');
    if (header) {
      header.appendChild(socialContainer);
    } else {
      // Fallback: aggiungi al body
      document.body.insertBefore(socialContainer, document.body.firstChild);
    }
  }
  
  /**
   * Aggiorna i link social esistenti
   */
  function updateExistingSocialLinks() {
    // Cerca tutti i link social esistenti
    const facebookLinks = document.querySelectorAll('a[href*="facebook.com"]');
    const instagramLinks = document.querySelectorAll('a[href*="instagram.com"]');
    const tiktokLinks = document.querySelectorAll('a[href*="tiktok.com"]');
    
    // Aggiorna i link Facebook
    facebookLinks.forEach(link => {
      link.href = socialLinks.facebook;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
    
    // Aggiorna i link Instagram
    instagramLinks.forEach(link => {
      link.href = socialLinks.instagram;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
    
    // Aggiorna i link TikTok
    tiktokLinks.forEach(link => {
      link.href = socialLinks.tiktok;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
  }
  
  /**
   * Inizializza i bottoni principali
   */
  function initMainButtons() {
    // Bottone PREORDER
    const preorderButtons = document.querySelectorAll('button:contains("PREORDER"), a:contains("PREORDER")');
    preorderButtons.forEach(button => {
      if (mainButtons.preorder.isForm) {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          showPreorderForm();
        });
      } else {
        if (button.tagName === 'BUTTON') {
          // Converti in link se necessario
          const link = document.createElement('a');
          link.href = mainButtons.preorder.url;
          link.className = button.className;
          link.innerHTML = button.innerHTML;
          if (mainButtons.preorder.newTab) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
          }
          button.parentNode.replaceChild(link, button);
        } else {
          button.href = mainButtons.preorder.url;
          if (mainButtons.preorder.newTab) {
            button.target = '_blank';
            button.rel = 'noopener noreferrer';
          }
        }
      }
    });
    
    // Bottone SHOP
    const shopButtons = document.querySelectorAll('button:contains("SHOP"), a:contains("SHOP")');
    shopButtons.forEach(button => {
      if (button.tagName === 'BUTTON') {
        // Converti in link se necessario
        const link = document.createElement('a');
        link.href = mainButtons.shop.url;
        link.className = button.className;
        link.innerHTML = button.innerHTML;
        if (mainButtons.shop.newTab) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
        button.parentNode.replaceChild(link, button);
      } else {
        button.href = mainButtons.shop.url;
        if (mainButtons.shop.newTab) {
          button.target = '_blank';
          button.rel = 'noopener noreferrer';
        }
      }
    });
    
    // Bottone LOOKBOOK
    const lookbookButtons = document.querySelectorAll('button:contains("LOOKBOOK"), a:contains("LOOKBOOK")');
    lookbookButtons.forEach(button => {
      if (button.tagName === 'BUTTON') {
        // Converti in link se necessario
        const link = document.createElement('a');
        link.href = mainButtons.lookbook.url;
        link.className = button.className;
        link.innerHTML = button.innerHTML;
        if (mainButtons.lookbook.newTab) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
        button.parentNode.replaceChild(link, button);
      } else {
        button.href = mainButtons.lookbook.url;
        if (mainButtons.lookbook.newTab) {
          button.target = '_blank';
          button.rel = 'noopener noreferrer';
        }
      }
    });
    
    // Bottone JOIN US
    const joinusButtons = document.querySelectorAll('button:contains("JOIN US"), a:contains("JOIN US")');
    joinusButtons.forEach(button => {
      if (button.tagName === 'BUTTON') {
        // Converti in link se necessario
        const link = document.createElement('a');
        link.href = mainButtons.joinus.url;
        link.className = button.className;
        link.innerHTML = button.innerHTML;
        if (mainButtons.joinus.newTab) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
        button.parentNode.replaceChild(link, button);
      } else {
        button.href = mainButtons.joinus.url;
        if (mainButtons.joinus.newTab) {
          button.target = '_blank';
          button.rel = 'noopener noreferrer';
        }
      }
    });
  }
  
  /**
   * Mostra il form di preordine
   */
  function showPreorderForm() {
    // Verifica se il form esiste già
    let preorderForm = document.getElementById(mainButtons.preorder.formId);
    
    if (!preorderForm) {
      // Crea il form
      preorderForm = document.createElement('div');
      preorderForm.id = mainButtons.preorder.formId;
      preorderForm.className = 'preorder-form-container';
      
      // Contenuto del form
      preorderForm.innerHTML = `
        <div class="preorder-form-overlay"></div>
        <div class="preorder-form">
          <button class="close-form">&times;</button>
          <h2>PREORDINA ORA</h2>
          <p>Compila il form per preordinare i prodotti D3MAS1ADØ</p>
          <form id="preorder-form-element">
            <div class="form-group">
              <label for="name">Nome e Cognome</label>
              <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="phone">Telefono</label>
              <input type="tel" id="phone" name="phone">
            </div>
            <div class="form-group">
              <label for="product">Prodotto</label>
              <select id="product" name="product" required>
                <option value="">Seleziona un prodotto</option>
                <option value="felpa">Felpa D3MAS1ADØ Logo</option>
                <option value="tshirt">T-Shirt D3MAS1ADØ Essenziale</option>
                <option value="cap">Cappello D3MAS1ADØ Ø</option>
              </select>
            </div>
            <div class="form-group">
              <label for="size">Taglia</label>
              <select id="size" name="size" required>
                <option value="">Seleziona una taglia</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
            <div class="form-group">
              <label for="notes">Note</label>
              <textarea id="notes" name="notes" rows="3"></textarea>
            </div>
            <div class="form-group">
              <button type="submit" class="submit-button">INVIA PREORDINE</button>
            </div>
          </form>
        </div>
      `;
      
      // Aggiungi stili CSS
      const style = document.createElement('style');
      style.textContent = `
        .preorder-form-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        .preorder-form-container.active {
          opacity: 1;
          visibility: visible;
        }
        
        .preorder-form-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          z-index: -1;
        }
        
        .preorder-form {
          background-color: #111;
          border: 2px solid #39FF14;
          padding: 2rem;
          width: 90%;
          max-width: 500px;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .close-form {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }
        
        .close-form:hover {
          color: #39FF14;
        }
        
        .preorder-form h2 {
          color: #39FF14;
          margin-bottom: 1rem;
          font-family: 'Orbitron', sans-serif;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: white;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          font-family: inherit;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #39FF14;
        }
        
        .submit-button {
          background-color: #39FF14;
          color: black;
          border: none;
          padding: 0.75rem 1.5rem;
          font-family: 'Orbitron', sans-serif;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .submit-button:hover {
          background-color: #2be010;
        }
      `;
      document.head.appendChild(style);
      
      // Aggiungi al DOM
      document.body.appendChild(preorderForm);
      
      // Aggiungi event listeners
      const closeButton = preorderForm.querySelector('.close-form');
      closeButton.addEventListener('click', function() {
        preorderForm.classList.remove('active');
      });
      
      const overlay = preorderForm.querySelector('.preorder-form-overlay');
      overlay.addEventListener('click', function() {
        preorderForm.classList.remove('active');
      });
      
      const form = preorderForm.querySelector('#preorder-form-element');
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Qui puoi implementare l'invio del form a un endpoint o a Google Forms
        // Per ora, mostriamo un messaggio di successo
        form.innerHTML = `
          <div class="success-message">
            <h3>Preordine inviato con successo!</h3>
            <p>Grazie per il tuo interesse in D3MAS1ADØ. Ti contatteremo presto per confermare il tuo preordine.</p>
          </div>
        `;
        
        // Chiudi il form dopo 3 secondi
        setTimeout(function() {
          preorderForm.classList.remove('active');
        }, 3000);
      });
    }
    
    // Mostra il form
    preorderForm.classList.add('active');
  }
  
  // Inizializza i link social e i bottoni principali
  initSocialLinks();
  initMainButtons();
  
  // Esponi API pubblica
  window.D3MASIADO_SOCIAL = {
    showPreorderForm: showPreorderForm
  };
});

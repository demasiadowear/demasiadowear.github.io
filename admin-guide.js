// admin-guide.js
/**
 * D3MAS1ADØ - Script per l'integrazione della guida tecnica nel backoffice
 * 
 * Questo script aggiunge un link alla guida tecnica PDF nel backoffice CMS
 * e crea una sezione admin nel sito per accedere alla documentazione.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Configurazione
  const config = {
    guidePdfUrl: 'admin/D3MASIADO_GUIDA_TECNICA.pdf',
    adminSectionId: 'admin-section',
    cmsBackofficeSelector: '.sanity-studio',
    adminPassword: 'D3M4S14D0-2025' // Password semplice per accesso admin
  };
  
  /**
   * Inizializza l'integrazione della guida
   */
  function initGuideIntegration() {
    // Verifica se siamo nel backoffice CMS
    if (document.querySelector(config.cmsBackofficeSelector)) {
      addGuideLinkToCms();
    } else {
      // Siamo nel frontend, aggiungi sezione admin se non esiste
      createAdminSection();
    }
  }
  
  /**
   * Aggiungi link alla guida nel backoffice CMS
   */
  function addGuideLinkToCms() {
    // Attendi che il menu del CMS sia caricato
    const checkInterval = setInterval(() => {
      const navMenu = document.querySelector('.sanity-studio nav');
      
      if (navMenu) {
        clearInterval(checkInterval);
        
        // Crea elemento link
        const guideLink = document.createElement('a');
        guideLink.href = config.guidePdfUrl;
        guideLink.target = '_blank';
        guideLink.className = 'guide-link';
        guideLink.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" stroke-width="2"/>
            <path d="M14 2V8H20" stroke="currentColor" stroke-width="2"/>
            <path d="M16 13H8" stroke="currentColor" stroke-width="2"/>
            <path d="M16 17H8" stroke="currentColor" stroke-width="2"/>
            <path d="M10 9H8" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span>Guida Tecnica</span>
        `;
        
        // Aggiungi stili
        const style = document.createElement('style');
        style.textContent = `
          .guide-link {
            display: flex;
            align-items: center;
            padding: 0.5rem 1rem;
            margin: 0.5rem;
            color: inherit;
            text-decoration: none;
            border-radius: 4px;
            transition: background-color 0.3s ease;
          }
          
          .guide-link:hover {
            background-color: rgba(0, 0, 0, 0.1);
          }
          
          .guide-link svg {
            margin-right: 0.5rem;
          }
        `;
        document.head.appendChild(style);
        
        // Aggiungi al menu
        navMenu.appendChild(guideLink);
      }
    }, 500);
  }
  
  /**
   * Crea sezione admin nel frontend
   */
  function createAdminSection() {
    // Verifica se la sezione admin esiste già
    if (document.getElementById(config.adminSectionId)) {
      return;
    }
    
    // Crea sezione admin nascosta
    const adminSection = document.createElement('div');
    adminSection.id = config.adminSectionId;
    adminSection.className = 'admin-section';
    adminSection.style.display = 'none';
    
    // Contenuto della sezione admin
    adminSection.innerHTML = `
      <div class="admin-overlay"></div>
      <div class="admin-panel">
        <div class="admin-header">
          <h2>D3MAS1ADØ - Area Admin</h2>
          <button class="close-admin">&times;</button>
        </div>
        
        <div class="admin-content">
          <div class="admin-login" style="display: block;">
            <h3>Accesso Area Admin</h3>
            <p>Inserisci la password per accedere all'area admin.</p>
            <div class="password-input">
              <input type="password" id="admin-password" placeholder="Password">
              <button id="login-button">Accedi</button>
            </div>
          </div>
          
          <div class="admin-dashboard" style="display: none;">
            <h3>Documentazione Tecnica</h3>
            <div class="admin-card">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#39FF14" stroke="black" stroke-width="2"/>
                  <path d="M14 2V8H20" stroke="black" stroke-width="2"/>
                  <path d="M16 13H8" stroke="black" stroke-width="2"/>
                  <path d="M16 17H8" stroke="black" stroke-width="2"/>
                  <path d="M10 9H8" stroke="black" stroke-width="2"/>
                </svg>
              </div>
              <div class="card-content">
                <h4>Guida Tecnica D3MAS1ADØ</h4>
                <p>Documentazione completa per la gestione autonoma del sito.</p>
                <a href="${config.guidePdfUrl}" target="_blank" class="admin-button">Scarica PDF</a>
              </div>
            </div>
            
            <h3>Accesso Rapido</h3>
            <div class="admin-card">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" fill="#39FF14" stroke="black" stroke-width="2"/>
                  <path d="M9 12H15" stroke="black" stroke-width="2"/>
                  <path d="M12 9L12 15" stroke="black" stroke-width="2"/>
                </svg>
              </div>
              <div class="card-content">
                <h4>Sanity Studio CMS</h4>
                <p>Gestisci prodotti, lookbook, manifesto e contenuti del sito.</p>
                <a href="https://demasiadowear.sanity.studio/" target="_blank" class="admin-button">Apri CMS</a>
              </div>
            </div>
            
            <div class="admin-card">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#39FF14" stroke="black" stroke-width="2"/>
                  <path d="M2 17L12 22L22 17" stroke="black" stroke-width="2"/>
                  <path d="M2 12L12 17L22 12" stroke="black" stroke-width="2"/>
                </svg>
              </div>
              <div class="card-content">
                <h4>Stripe Dashboard</h4>
                <p>Gestisci pagamenti, ordini e transazioni.</p>
                <a href="https://dashboard.stripe.com/" target="_blank" class="admin-button">Apri Stripe</a>
              </div>
            </div>
            
            <div class="admin-card">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z" fill="#39FF14" stroke="black" stroke-width="2"/>
                  <path d="M16 21V5C16 3.9 15.1 3 14 3H10C8.9 3 8 3.9 8 5V21" stroke="black" stroke-width="2"/>
                </svg>
              </div>
              <div class="card-content">
                <h4>Snipcart Dashboard</h4>
                <p>Gestisci carrello, checkout e ordini.</p>
                <a href="https://app.snipcart.com/" target="_blank" class="admin-button">Apri Snipcart</a>
              </div>
            </div>
            
            <div class="admin-card">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3H3V10H10V3Z" fill="#39FF14" stroke="black" stroke-width="2"/>
                  <path d="M21 3H14V10H21V3Z" fill="#39FF14" stroke="black" stroke-width="2"/>
                  <path d="M21 14H14V21H21V14Z" fill="#39FF14" stroke="black" stroke-width="2"/>
                  <path d="M10 14H3V21H10V14Z" fill="#39FF14" stroke="black" stroke-width="2"/>
                </svg>
              </div>
              <div class="card-content">
                <h4>Google Analytics</h4>
                <p>Monitora traffico, conversioni e comportamento utenti.</p>
                <a href="https://analytics.google.com/" target="_blank" class="admin-button">Apri Analytics</a>
              </div>
            </div>
            
            <div class="admin-card">
              <div class="card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#39FF14" stroke="black" stroke-width="2"/>
                  <path d="M12 16V12" stroke="black" stroke-width="2" stroke-linecap="round"/>
                  <path d="M12 8H12.01" stroke="black" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="card-content">
                <h4>Microsoft Clarity</h4>
                <p>Visualizza heatmap e registrazioni sessioni utente.</p>
                <a href="https://clarity.microsoft.com/" target="_blank" class="admin-button">Apri Clarity</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Aggiungi stili CSS
    const style = document.createElement('style');
    style.textContent = `
      .admin-section {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        display: none;
      }
      
      .admin-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
      }
      
      .admin-panel {
        position: relative;
        width: 90%;
        max-width: 1000px;
        max-height: 90vh;
        overflow-y: auto;
        background-color: #111;
        margin: 2rem auto;
        border: 2px solid #39FF14;
        border-radius: 8px;
        box-shadow: 0 0 20px rgba(57, 255, 20, 0.3);
      }
      
      .admin-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: #000;
        border-bottom: 1px solid #39FF14;
      }
      
      .admin-header h2 {
        margin: 0;
        color: #39FF14;
        font-family: 'Orbitron', sans-serif;
      }
      
      .close-admin {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
      }
      
      .close-admin:hover {
        color: #39FF14;
      }
      
      .admin-content {
        padding: 1rem;
      }
      
      .admin-login {
        max-width: 400px;
        margin: 0 auto;
        padding: 1rem;
      }
      
      .admin-login h3 {
        color: #39FF14;
        font-family: 'Orbitron', sans-serif;
      }
      
      .password-input {
        display: flex;
        margin-top: 1rem;
      }
      
      .password-input input {
        flex: 1;
        padding: 0.5rem;
        background-color: #222;
        border: 1px solid #444;
        color: white;
      }
      
      .password-input button {
        padding: 0.5rem 1rem;
        background-color: #39FF14;
        border: none;
        color: black;
        font-weight: bold;
        cursor: pointer;
      }
      
      .admin-dashboard h3 {
        color: #39FF14;
        font-family: 'Orbitron', sans-serif;
        margin-top: 2rem;
      }
      
      .admin-card {
        display: flex;
        background-color: rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(57, 255, 20, 0.3);
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
        transition: transform 0.3s ease, border-color 0.3s ease;
      }
      
      .admin-card:hover {
        transform: translateY(-3px);
        border-color: #39FF14;
      }
      
      .card-icon {
        margin-right: 1rem;
      }
      
      .card-content {
        flex: 1;
      }
      
      .card-content h4 {
        margin-top: 0;
        color: white;
        font-family: 'Orbitron', sans-serif;
      }
      
      .admin-button {
        display: inline-block;
        padding: 0.5rem 1rem;
        background-color: #39FF14;
        color: black;
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
        transition: background-color 0.3s ease;
      }
      
      .admin-button:hover {
        background-color: #2be010;
      }
      
      /* Responsive */
      @media (max-width: 768px) {
        .admin-card {
          flex-direction: column;
        }
        
        .card-icon {
          margin-right: 0;
          margin-bottom: 1rem;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Aggiungi al DOM
    document.body.appendChild(adminSection);
    
    // Aggiungi event listeners
    const closeButton = adminSection.querySelector('.close-admin');
    closeButton.addEventListener('click', () => {
      adminSection.style.display = 'none';
    });
    
    const loginButton = adminSection.querySelector('#login-button');
    loginButton.addEventListener('click', () => {
      const passwordInput = adminSection.querySelector('#admin-password');
      if (passwordInput.value === config.adminPassword) {
        adminSection.querySelector('.admin-login').style.display = 'none';
        adminSection.querySelector('.admin-dashboard').style.display = 'block';
      } else {
        alert('Password non corretta. Riprova.');
      }
    });
    
    // Aggiungi tasto per aprire admin panel
    addAdminButton();
  }
  
  /**
   * Aggiungi pulsante per aprire il pannello admin
   */
  function addAdminButton() {
    const adminButton = document.createElement('div');
    adminButton.className = 'admin-button-trigger';
    adminButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L4 8L12 12L20 8L12 4Z" fill="#39FF14" stroke="black" stroke-width="2"/>
        <path d="M4 16L12 20L20 16" stroke="black" stroke-width="2"/>
        <path d="M4 12L12 16L20 12" stroke="black" stroke-width="2"/>
      </svg>
    `;
    
    // Aggiungi stili
    const style = document.createElement('style');
    style.textContent = `
      .admin-button-trigger {
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 40px;
        height: 40px;
        background-color: black;
        border: 2px solid #39FF14;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 999;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .admin-button-trigger:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 15px rgba(57, 255, 20, 0.3);
      }
    `;
    document.head.appendChild(style);
    
    // Aggiungi al DOM
    document.body.appendChild(adminButton);
    
    // Aggiungi event listener
    adminButton.addEventListener('click', () => {
      const adminSection = document.getElementById(config.adminSectionId);
      if (adminSection) {
        adminSection.style.display = 'block';
      }
    });
  }
  
  // Inizializza
  initGuideIntegration();
});

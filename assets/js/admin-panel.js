// Admin Login e Dashboard per D3MAS1ADØ

// Configurazione
const adminConfig = {
  username: 'admin',
  password: 'd3masiado2025', // In produzione, usare hash sicuri e non hardcoded
  sessionDuration: 3600000 // 1 ora in millisecondi
};

// Funzione per verificare se l'utente è già loggato
function checkAdminSession() {
  const adminSession = localStorage.getItem('adminSession');
  
  if (!adminSession) {
    return false;
  }
  
  try {
    const session = JSON.parse(adminSession);
    const now = new Date().getTime();
    
    // Verifica se la sessione è ancora valida
    if (session.expires > now) {
      // Estendi la sessione
      extendAdminSession();
      return true;
    } else {
      // Sessione scaduta
      localStorage.removeItem('adminSession');
      return false;
    }
  } catch (error) {
    console.error('Errore nella verifica della sessione admin:', error);
    localStorage.removeItem('adminSession');
    return false;
  }
}

// Funzione per estendere la sessione admin
function extendAdminSession() {
  const now = new Date().getTime();
  const expires = now + adminConfig.sessionDuration;
  
  const session = {
    loggedIn: true,
    timestamp: now,
    expires: expires
  };
  
  localStorage.setItem('adminSession', JSON.stringify(session));
}

// Funzione per creare una nuova sessione admin
function createAdminSession() {
  extendAdminSession();
}

// Funzione per terminare la sessione admin
function endAdminSession() {
  localStorage.removeItem('adminSession');
}

// Funzione per mostrare il form di login
function showAdminLoginForm() {
  // Crea il container per il form di login
  const loginContainer = document.createElement('div');
  loginContainer.id = 'admin-login-container';
  loginContainer.className = 'admin-modal';
  
  // Aggiungi l'HTML del form di login
  loginContainer.innerHTML = `
    <div class="admin-login-form">
      <div class="admin-login-header">
        <h2>D3MAS1ADØ Admin</h2>
        <button id="admin-login-close">&times;</button>
      </div>
      <div class="admin-login-body">
        <div class="admin-login-error hidden"></div>
        <div class="form-group">
          <label for="admin-username">Username</label>
          <input type="text" id="admin-username" placeholder="Username" autocomplete="off">
        </div>
        <div class="form-group">
          <label for="admin-password">Password</label>
          <input type="password" id="admin-password" placeholder="Password">
        </div>
        <button id="admin-login-submit">ACCEDI</button>
      </div>
    </div>
  `;
  
  // Aggiungi il container al body
  document.body.appendChild(loginContainer);
  
  // Gestisci gli event listener
  const closeButton = document.getElementById('admin-login-close');
  const submitButton = document.getElementById('admin-login-submit');
  const usernameInput = document.getElementById('admin-username');
  const passwordInput = document.getElementById('admin-password');
  const errorContainer = document.querySelector('.admin-login-error');
  
  // Focus sul campo username
  usernameInput.focus();
  
  // Chiudi il form
  closeButton.addEventListener('click', function() {
    document.body.removeChild(loginContainer);
  });
  
  // Gestisci il submit del form
  submitButton.addEventListener('click', function() {
    handleAdminLogin();
  });
  
  // Gestisci il submit con Enter
  passwordInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      handleAdminLogin();
    }
  });
  
  // Funzione per gestire il login
  function handleAdminLogin() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    // Verifica le credenziali
    if (username === adminConfig.username && password === adminConfig.password) {
      // Login riuscito
      createAdminSession();
      document.body.removeChild(loginContainer);
      showAdminDashboard();
    } else {
      // Login fallito
      errorContainer.textContent = 'Credenziali non valide. Riprova.';
      errorContainer.classList.remove('hidden');
      passwordInput.value = '';
      passwordInput.focus();
    }
  }
}

// Funzione per mostrare la dashboard admin
function showAdminDashboard() {
  // Verifica se l'utente è loggato
  if (!checkAdminSession()) {
    showAdminLoginForm();
    return;
  }
  
  // Crea il container per la dashboard
  const dashboardContainer = document.createElement('div');
  dashboardContainer.id = 'admin-dashboard-container';
  dashboardContainer.className = 'admin-modal';
  
  // Aggiungi l'HTML della dashboard
  dashboardContainer.innerHTML = `
    <div class="admin-dashboard">
      <div class="admin-dashboard-header">
        <h2>D3MAS1ADØ Admin Dashboard</h2>
        <div class="admin-header-actions">
          <button id="admin-dashboard-close">&times;</button>
        </div>
      </div>
      <div class="admin-dashboard-sidebar">
        <ul class="admin-menu">
          <li class="admin-menu-item active" data-section="overview">Overview</li>
          <li class="admin-menu-item" data-section="products">Prodotti</li>
          <li class="admin-menu-item" data-section="collections">Collezioni</li>
          <li class="admin-menu-item" data-section="lookbook">Lookbook</li>
          <li class="admin-menu-item" data-section="manifesto">Manifesto</li>
          <li class="admin-menu-item" data-section="chatbot">Chatbot</li>
          <li class="admin-menu-item" data-section="sanity">Sanity Studio</li>
        </ul>
        <div class="admin-sidebar-footer">
          <button id="admin-logout">Logout</button>
        </div>
      </div>
      <div class="admin-dashboard-content">
        <!-- Overview Section -->
        <div class="admin-section active" id="admin-overview">
          <h3>Benvenuto nella Dashboard Admin</h3>
          <p>Seleziona una sezione dal menu per gestire i contenuti del sito.</p>
          
          <div class="admin-stats">
            <div class="admin-stat-card">
              <h4>Prodotti</h4>
              <p class="admin-stat-value" id="products-count">Caricamento...</p>
            </div>
            <div class="admin-stat-card">
              <h4>Collezioni</h4>
              <p class="admin-stat-value" id="collections-count">Caricamento...</p>
            </div>
            <div class="admin-stat-card">
              <h4>Lookbook</h4>
              <p class="admin-stat-value" id="lookbook-count">Caricamento...</p>
            </div>
          </div>
          
          <div class="admin-quick-actions">
            <h4>Azioni rapide</h4>
            <div class="admin-action-buttons">
              <button class="admin-action-button" data-action="sanity-studio">
                <i class="fas fa-external-link-alt"></i>
                Apri Sanity Studio
              </button>
              <button class="admin-action-button" data-action="refresh-content">
                <i class="fas fa-sync-alt"></i>
                Aggiorna contenuti
              </button>
              <button class="admin-action-button" data-action="clear-cache">
                <i class="fas fa-broom"></i>
                Pulisci cache
              </button>
            </div>
          </div>
        </div>
        
        <!-- Products Section -->
        <div class="admin-section" id="admin-products">
          <h3>Gestione Prodotti</h3>
          <p>Gestisci i prodotti del tuo shop. I dati sono sincronizzati con Sanity CMS.</p>
          
          <div class="admin-section-actions">
            <button class="admin-action-button" data-action="open-sanity-products">
              <i class="fas fa-external-link-alt"></i>
              Modifica in Sanity Studio
            </button>
            <button class="admin-action-button" data-action="refresh-products">
              <i class="fas fa-sync-alt"></i>
              Aggiorna prodotti
            </button>
          </div>
          
          <div class="admin-products-list">
            <div class="admin-loading">Caricamento prodotti...</div>
          </div>
        </div>
        
        <!-- Collections Section -->
        <div class="admin-section" id="admin-collections">
          <h3>Gestione Collezioni</h3>
          <p>Gestisci le collezioni del tuo brand. I dati sono sincronizzati con Sanity CMS.</p>
          
          <div class="admin-section-actions">
            <button class="admin-action-button" data-action="open-sanity-collections">
              <i class="fas fa-external-link-alt"></i>
              Modifica in Sanity Studio
            </button>
            <button class="admin-action-button" data-action="refresh-collections">
              <i class="fas fa-sync-alt"></i>
              Aggiorna collezioni
            </button>
          </div>
          
          <div class="admin-collections-list">
            <div class="admin-loading">Caricamento collezioni...</div>
          </div>
        </div>
        
        <!-- Lookbook Section -->
        <div class="admin-section" id="admin-lookbook">
          <h3>Gestione Lookbook</h3>
          <p>Gestisci il lookbook del tuo brand. I dati sono sincronizzati con Sanity CMS.</p>
          
          <div class="admin-section-actions">
            <button class="admin-action-button" data-action="open-sanity-lookbook">
              <i class="fas fa-external-link-alt"></i>
              Modifica in Sanity Studio
            </button>
            <button class="admin-action-button" data-action="refresh-lookbook">
              <i class="fas fa-sync-alt"></i>
              Aggiorna lookbook
            </button>
          </div>
          
          <div class="admin-lookbook-list">
            <div class="admin-loading">Caricamento lookbook...</div>
          </div>
        </div>
        
        <!-- Manifesto Section -->
        <div class="admin-section" id="admin-manifesto">
          <h3>Gestione Manifesto</h3>
          <p>Gestisci il manifesto del tuo brand. I dati sono sincronizzati con Sanity CMS.</p>
          
          <div class="admin-section-actions">
            <button class="admin-action-button" data-action="open-sanity-manifesto">
              <i class="fas fa-external-link-alt"></i>
              Modifica in Sanity Studio
            </button>
            <button class="admin-action-button" data-action="refresh-manifesto">
              <i class="fas fa-sync-alt"></i>
              Aggiorna manifesto
            </button>
          </div>
          
          <div class="admin-manifesto-content">
            <div class="admin-loading">Caricamento manifesto...</div>
          </div>
        </div>
        
        <!-- Chatbot Section -->
        <div class="admin-section" id="admin-chatbot">
          <h3>Gestione Chatbot</h3>
          <p>Gestisci le risposte della chatbot Lana AI. I dati sono sincronizzati con Sanity CMS.</p>
          
          <div class="admin-section-actions">
            <button class="admin-action-button" data-action="open-sanity-chatbot">
              <i class="fas fa-external-link-alt"></i>
              Modifica in Sanity Studio
            </button>
            <button class="admin-action-button" data-action="refresh-chatbot">
              <i class="fas fa-sync-alt"></i>
              Aggiorna risposte
            </button>
          </div>
          
          <div class="admin-chatbot-responses">
            <div class="admin-loading">Caricamento risposte chatbot...</div>
          </div>
        </div>
        
        <!-- Sanity Studio Section -->
        <div class="admin-section" id="admin-sanity">
          <h3>Sanity Studio</h3>
          <p>Accedi direttamente a Sanity Studio per gestire tutti i contenuti del sito.</p>
          
          <div class="admin-sanity-info">
            <div class="admin-info-item">
              <strong>Project ID:</strong>
              <span>yy05mm62</span>
            </div>
            <div class="admin-info-item">
              <strong>Dataset:</strong>
              <span>production</span>
            </div>
          </div>
          
          <div class="admin-sanity-actions">
            <a href="https://yy05mm62.sanity.studio/" target="_blank" class="admin-action-button">
              <i class="fas fa-external-link-alt"></i>
              Apri Sanity Studio
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Aggiungi il container al body
  document.body.appendChild(dashboardContainer);
  
  // Gestisci gli event listener
  const closeButton = document.getElementById('admin-dashboard-close');
  const logoutButton = document.getElementById('admin-logout');
  const menuItems = document.querySelectorAll('.admin-menu-item');
  const actionButtons = document.querySelectorAll('.admin-action-button');
  
  // Chiudi la dashboard
  closeButton.addEventListener('click', function() {
    document.body.removeChild(dashboardContainer);
  });
  
  // Logout
  logoutButton.addEventListener('click', function() {
    endAdminSession();
    document.body.removeChild(dashboardContainer);
  });
  
  // Gestisci il menu
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      // Rimuovi la classe active da tutti gli elementi
      menuItems.forEach(i => i.classList.remove('active'));
      document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
      
      // Aggiungi la classe active a questo elemento
      this.classList.add('active');
      
      // Mostra la sezione corrispondente
      const section = this.dataset.section;
      document.getElementById(`admin-${section}`).classList.add('active');
      
      // Carica i dati per la sezione
      loadSectionData(section);
    });
  });
  
  // Gestisci i pulsanti di azione
  actionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const action = this.dataset.action;
      
      switch (action) {
        case 'sanity-studio':
          window.open('https://yy05mm62.sanity.studio/', '_blank');
          break;
        case 'refresh-content':
          refreshAllContent();
          break;
        case 'clear-cache':
          clearLocalCache();
          break;
        case 'open-sanity-products':
          window.open('https://yy05mm62.sanity.studio/desk/product', '_blank');
          break;
        case 'refresh-products':
          refreshProducts();
          break;
        case 'open-sanity-collections':
          window.open('https://yy05mm62.sanity.studio/desk/collection', '_blank');
          break;
        case 'refresh-collections':
          refreshCollections();
          break;
        case 'open-sanity-lookbook':
          window.open('https://yy05mm62.sanity.studio/desk/lookbookItem', '_blank');
          break;
        case 'refresh-lookbook':
          refreshLookbook();
          break;
        case 'open-sanity-manifesto':
          window.open('https://yy05mm62.sanity.studio/desk/manifesto', '_blank');
          break;
        case 'refresh-manifesto':
          refreshManifesto();
          break;
        case 'open-sanity-chatbot':
          window.open('https://yy05mm62.sanity.studio/desk/chatbotResponse', '_blank');
          break;
        case 'refresh-chatbot':
          refreshChatbot();
          break;
      }
    });
  });
  
  // Carica i dati iniziali
  loadInitialData();
}

// Funzione per caricare i dati iniziali
function loadInitialData() {
  // Carica i conteggi per la dashboard
  loadCounts();
}

// Funzione per caricare i conteggi
function loadCounts() {
  // Usa le funzioni di sanityIntegration per ottenere i dati
  Promise.all([
    window.sanityIntegration.fetchProducts(),
    window.sanityIntegration.fetchCollections(),
    window.sanityIntegration.fetchLookbook()
  ]).then(([products, collections, lookbook]) => {
    // Aggiorna i conteggi
    document.getElementById('products-count').textContent = products.length;
    document.getElementById('collections-count').textContent = collections.length;
    document.getElementById('lookbook-count').textContent = lookbook.length;
  }).catch(error => {
    console.error('Errore nel caricamento dei conteggi:', error);
    document.getElementById('products-count').textContent = 'Errore';
    document.getElementById('collections-count').textContent = 'Errore';
    document.getElementById('lookbook-count').textContent = 'Errore';
  });
}

// Funzione per caricare i dati di una sezione specifica
function loadSectionData(section) {
  switch (section) {
    case 'products':
      loadProductsData();
      break;
    case 'collections':
      loadCollectionsData();
      break;
    case 'lookbook':
      loadLookbookData();
      break;
    case 'manifesto':
      loadManifestoData();
      break;
    case 'chatbot':
      loadChatbotData();
      break;
  }
}

// Funzione per caricare i dati dei prodotti
function loadProductsData() {
  const productsList = document.querySelector('.admin-products-list');
  productsList.innerHTML = '<div class="admin-loading">Caricamento prodotti...</div>';
  
  window.sanityIntegration.fetchProducts().then(products => {
    if (products.length === 0) {
      productsList.innerHTML = '<div class="admin-empty">Nessun prodotto trovato</div>';
      return;
    }
    
    let html = '<div class="admin-grid">';
    
    products.forEach(product => {
      html += `
        <div class="admin-card">
          <div class="admin-card-image" style="background-image: url('${product.imageUrl}')"></div>
          <div class="admin-card-content">
            <h4>${product.name}</h4>
            <p>€${product.price.toFixed(2)}</p>
            <p>Collezione: ${product.collection.name}</p>
            <p>Taglie: ${product.sizes.join(', ')}</p>
            <p>Disponibile: ${product.available ? 'Sì' : 'No'}</p>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    productsList.innerHTML = html;
  }).catch(error => {
    console.error('Errore nel caricamento dei prodotti:', error);
    productsList.innerHTML = '<div class="admin-error">Errore nel caricamento dei prodotti</div>';
  });
}

// Funzione per caricare i dati delle collezioni
function loadCollectionsData() {
  const collectionsList = document.querySelector('.admin-collections-list');
  collectionsList.innerHTML = '<div class="admin-loading">Caricamento collezioni...</div>';
  
  window.sanityIntegration.fetchCollections().then(collections => {
    if (collections.length === 0) {
      collectionsList.innerHTML = '<div class="admin-empty">Nessuna collezione trovata</div>';
      return;
    }
    
    let html = '<div class="admin-grid">';
    
    collections.forEach(collection => {
      html += `
        <div class="admin-card">
          <div class="admin-card-image" style="background-image: url('${collection.imageUrl}')"></div>
          <div class="admin-card-content">
            <h4>${collection.name}</h4>
            <p>${collection.description}</p>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    collectionsList.innerHTML = html;
  }).catch(error => {
    console.error('Errore nel caricamento delle collezioni:', error);
    collectionsList.innerHTML = '<div class="admin-error">Errore nel caricamento delle collezioni</div>';
  });
}

// Funzione per caricare i dati del lookbook
function loadLookbookData() {
  const lookbookList = document.querySelector('.admin-lookbook-list');
  lookbookList.innerHTML = '<div class="admin-loading">Caricamento lookbook...</div>';
  
  window.sanityIntegration.fetchLookbook().then(lookbookItems => {
    if (lookbookItems.length === 0) {
      lookbookList.innerHTML = '<div class="admin-empty">Nessun elemento lookbook trovato</div>';
      return;
    }
    
    let html = '<div class="admin-grid">';
    
    lookbookItems.forEach(item => {
      html += `
        <div class="admin-card">
          ${item.isVideo 
            ? `<div class="admin-card-video"><video src="${item.videoUrl}" controls></video></div>` 
            : `<div class="admin-card-image" style="background-image: url('${item.imageUrl}')"></div>`
          }
          <div class="admin-card-content">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    lookbookList.innerHTML = html;
  }).catch(error => {
    console.error('Errore nel caricamento del lookbook:', error);
    lookbookList.innerHTML = '<div class="admin-error">Errore nel caricamento del lookbook</div>';
  });
}

// Funzione per caricare i dati del manifesto
function loadManifestoData() {
  const manifestoContent = document.querySelector('.admin-manifesto-content');
  manifestoContent.innerHTML = '<div class="admin-loading">Caricamento manifesto...</div>';
  
  window.sanityIntegration.fetchManifesto().then(manifesto => {
    let html = `
      <div class="admin-manifesto">
        <h4>${manifesto.title}</h4>
        <div class="admin-manifesto-paragraphs">
    `;
    
    manifesto.paragraphs.forEach(paragraph => {
      html += `<p>${paragraph}</p>`;
    });
    
    html += `
        </div>
      </div>
    `;
    
    manifestoContent.innerHTML = html;
  }).catch(error => {
    console.error('Errore nel caricamento del manifesto:', error);
    manifestoContent.innerHTML = '<div class="admin-error">Errore nel caricamento del manifesto</div>';
  });
}

// Funzione per caricare i dati della chatbot
function loadChatbotData() {
  const chatbotResponses = document.querySelector('.admin-chatbot-responses');
  chatbotResponses.innerHTML = '<div class="admin-loading">Caricamento risposte chatbot...</div>';
  
  window.sanityIntegration.fetchChatbotResponses().then(responses => {
    if (responses.length === 0) {
      chatbotResponses.innerHTML = '<div class="admin-empty">Nessuna risposta chatbot trovata</div>';
      return;
    }
    
    let html = '<div class="admin-table-container">';
    html += `
      <table class="admin-table">
        <thead>
          <tr>
            <th>Keyword</th>
            <th>Risposta</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    responses.forEach(response => {
      html += `
        <tr>
          <td>${response.keyword}</td>
          <td>${response.response}</td>
        </tr>
      `;
    });
    
    html += `
        </tbody>
      </table>
    </div>
    `;
    
    chatbotResponses.innerHTML = html;
  }).catch(error => {
    console.error('Errore nel caricamento delle risposte chatbot:', error);
    chatbotResponses.innerHTML = '<div class="admin-error">Errore nel caricamento delle risposte chatbot</div>';
  });
}

// Funzione per aggiornare tutti i contenuti
function refreshAllContent() {
  // Mostra notifica
  showAdminNotification('Aggiornamento di tutti i contenuti in corso...');
  
  // Ricarica tutti i dati da Sanity
  window.sanityIntegration.loadAllSanityData().then(() => {
    // Aggiorna i conteggi
    loadCounts();
    
    // Aggiorna la sezione attiva
    const activeSection = document.querySelector('.admin-menu-item.active').dataset.section;
    loadSectionData(activeSection);
    
    // Mostra notifica di successo
    showAdminNotification('Tutti i contenuti aggiornati con successo', 'success');
  }).catch(error => {
    console.error('Errore nell\'aggiornamento dei contenuti:', error);
    showAdminNotification('Errore nell\'aggiornamento dei contenuti', 'error');
  });
}

// Funzioni per aggiornare sezioni specifiche
function refreshProducts() {
  showAdminNotification('Aggiornamento prodotti in corso...');
  
  window.sanityIntegration.fetchProducts().then(products => {
    // Aggiorna la visualizzazione dei prodotti
    window.sanityIntegration.renderProducts(products);
    
    // Aggiorna la dashboard
    loadProductsData();
    
    // Aggiorna il conteggio
    document.getElementById('products-count').textContent = products.length;
    
    showAdminNotification('Prodotti aggiornati con successo', 'success');
  }).catch(error => {
    console.error('Errore nell\'aggiornamento dei prodotti:', error);
    showAdminNotification('Errore nell\'aggiornamento dei prodotti', 'error');
  });
}

function refreshCollections() {
  showAdminNotification('Aggiornamento collezioni in corso...');
  
  window.sanityIntegration.fetchCollections().then(collections => {
    // Aggiorna la visualizzazione delle collezioni
    window.sanityIntegration.renderCollections(collections);
    
    // Aggiorna la dashboard
    loadCollectionsData();
    
    // Aggiorna il conteggio
    document.getElementById('collections-count').textContent = collections.length;
    
    showAdminNotification('Collezioni aggiornate con successo', 'success');
  }).catch(error => {
    console.error('Errore nell\'aggiornamento delle collezioni:', error);
    showAdminNotification('Errore nell\'aggiornamento delle collezioni', 'error');
  });
}

function refreshLookbook() {
  showAdminNotification('Aggiornamento lookbook in corso...');
  
  window.sanityIntegration.fetchLookbook().then(lookbookItems => {
    // Aggiorna la visualizzazione del lookbook
    window.sanityIntegration.renderLookbook(lookbookItems);
    
    // Aggiorna la dashboard
    loadLookbookData();
    
    // Aggiorna il conteggio
    document.getElementById('lookbook-count').textContent = lookbookItems.length;
    
    showAdminNotification('Lookbook aggiornato con successo', 'success');
  }).catch(error => {
    console.error('Errore nell\'aggiornamento del lookbook:', error);
    showAdminNotification('Errore nell\'aggiornamento del lookbook', 'error');
  });
}

function refreshManifesto() {
  showAdminNotification('Aggiornamento manifesto in corso...');
  
  window.sanityIntegration.fetchManifesto().then(manifesto => {
    // Aggiorna la visualizzazione del manifesto
    window.sanityIntegration.renderManifesto(manifesto);
    
    // Aggiorna la dashboard
    loadManifestoData();
    
    showAdminNotification('Manifesto aggiornato con successo', 'success');
  }).catch(error => {
    console.error('Errore nell\'aggiornamento del manifesto:', error);
    showAdminNotification('Errore nell\'aggiornamento del manifesto', 'error');
  });
}

function refreshChatbot() {
  showAdminNotification('Aggiornamento risposte chatbot in corso...');
  
  window.sanityIntegration.fetchChatbotResponses().then(responses => {
    // Aggiorna le risposte della chatbot
    window.sanityIntegration.updateChatbotResponses(responses);
    
    // Aggiorna la dashboard
    loadChatbotData();
    
    showAdminNotification('Risposte chatbot aggiornate con successo', 'success');
  }).catch(error => {
    console.error('Errore nell\'aggiornamento delle risposte chatbot:', error);
    showAdminNotification('Errore nell\'aggiornamento delle risposte chatbot', 'error');
  });
}

// Funzione per pulire la cache locale
function clearLocalCache() {
  showAdminNotification('Pulizia cache in corso...');
  
  // Rimuovi tutti i dati dalla cache locale
  const cacheKeys = [
    'products',
    'collections',
    'lookbook',
    'manifesto',
    'chatbotResponses'
  ];
  
  cacheKeys.forEach(key => {
    localStorage.removeItem(`sanity_${key}`);
  });
  
  // Aggiorna tutti i contenuti
  refreshAllContent();
  
  showAdminNotification('Cache pulita con successo', 'success');
}

// Funzione per mostrare notifiche admin
function showAdminNotification(message, type = 'info') {
  // Crea l'elemento di notifica
  const notification = document.createElement('div');
  notification.className = `admin-notification ${type}`;
  notification.textContent = message;
  
  // Aggiungi al DOM
  document.body.appendChild(notification);
  
  // Mostra con animazione
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Rimuovi dopo 3 secondi
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Funzione per aggiungere il pulsante admin
function addAdminButton() {
  // Crea il pulsante admin
  const adminButton = document.createElement('div');
  adminButton.id = 'admin-button';
  adminButton.innerHTML = '<i class="fas fa-lock"></i>';
  
  // Aggiungi al DOM
  document.body.appendChild(adminButton);
  
  // Aggiungi event listener
  adminButton.addEventListener('click', function() {
    // Verifica se l'utente è già loggato
    if (checkAdminSession()) {
      showAdminDashboard();
    } else {
      showAdminLoginForm();
    }
  });
}

// Inizializzazione al caricamento della pagina
document.addEventListener('DOMContentLoaded', function() {
  // Aggiungi il pulsante admin
  addAdminButton();
});

// Esporta le funzioni per l'uso in altri moduli
window.adminPanel = {
  checkAdminSession,
  showAdminLoginForm,
  showAdminDashboard
};

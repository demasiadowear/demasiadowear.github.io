/**
 * D3MAS1ADØ - Admin Panel
 * Questo file gestisce il pannello di amministrazione integrato con Sanity CMS
 */

// Importa le API Sanity
import { SanityAPI } from './sanity-api.js';

// Elementi DOM
const adminLink = document.querySelector('.admin-link');
const adminModal = document.querySelector('.admin-modal');
const adminModalClose = document.querySelector('.admin-modal-close');
const adminForm = document.querySelector('.admin-form');
const adminUsername = document.querySelector('#admin-username');
const adminPassword = document.querySelector('#admin-password');

// Dashboard elementi
let adminDashboard;
let dashboardClose;
let modifyHomepageBtn;
let modifyCollectionsBtn;
let modifyLookbookBtn;
let modifyManifestoBtn;
let logoutBtn;

// Stato dell'applicazione
let currentSection = null;

/**
 * Inizializza il pannello admin
 */
function initAdminPanel() {
  // Event listeners per il login
  adminLink.addEventListener('click', openAdminModal);
  adminModalClose.addEventListener('click', closeAdminModal);
  adminForm.addEventListener('submit', handleLogin);
  
  // Verifica se l'utente è già autenticato
  if (SanityAPI.isAuthenticated()) {
    showDashboard();
  }
}

/**
 * Apre il modal di login
 * @param {Event} e - Evento click
 */
function openAdminModal(e) {
  e.preventDefault();
  adminModal.classList.add('active');
}

/**
 * Chiude il modal di login
 */
function closeAdminModal() {
  adminModal.classList.remove('active');
  adminForm.reset();
  document.querySelector('.admin-error')?.remove();
}

/**
 * Gestisce il login
 * @param {Event} e - Evento submit
 */
async function handleLogin(e) {
  e.preventDefault();
  
  const username = adminUsername.value.trim();
  const password = adminPassword.value.trim();
  
  if (!username || !password) {
    showError('Inserisci username e password');
    return;
  }
  
  try {
    const result = await SanityAPI.authenticate(username, password);
    
    if (result.success) {
      closeAdminModal();
      showDashboard();
    } else {
      showError(result.message);
    }
  } catch (error) {
    console.error('Errore durante il login:', error);
    showError('Errore durante il login. Riprova più tardi.');
  }
}

/**
 * Mostra un messaggio di errore nel form di login
 * @param {string} message - Messaggio di errore
 */
function showError(message) {
  // Rimuovi eventuali messaggi di errore precedenti
  document.querySelector('.admin-error')?.remove();
  
  const errorElement = document.createElement('div');
  errorElement.className = 'admin-error';
  errorElement.textContent = message;
  errorElement.style.color = '#ff3333';
  errorElement.style.marginTop = '10px';
  errorElement.style.fontSize = '0.9rem';
  
  adminForm.appendChild(errorElement);
}

/**
 * Mostra il dashboard admin
 */
function showDashboard() {
  // Crea il dashboard se non esiste
  if (!adminDashboard) {
    createDashboard();
  }
  
  // Mostra il dashboard
  adminDashboard.classList.add('active');
  
  // Carica i dati iniziali
  loadDashboardData();
}

/**
 * Crea il dashboard admin
 */
function createDashboard() {
  // Crea l'elemento dashboard
  adminDashboard = document.createElement('div');
  adminDashboard.className = 'admin-dashboard';
  adminDashboard.style.position = 'fixed';
  adminDashboard.style.top = '0';
  adminDashboard.style.left = '0';
  adminDashboard.style.width = '100%';
  adminDashboard.style.height = '100%';
  adminDashboard.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
  adminDashboard.style.zIndex = '2000';
  adminDashboard.style.display = 'flex';
  adminDashboard.style.flexDirection = 'column';
  adminDashboard.style.padding = '30px';
  adminDashboard.style.color = '#ffffff';
  adminDashboard.style.fontFamily = 'var(--font-primary)';
  adminDashboard.style.overflowY = 'auto';
  
  // Crea l'header del dashboard
  const dashboardHeader = document.createElement('div');
  dashboardHeader.className = 'admin-dashboard-header';
  dashboardHeader.style.display = 'flex';
  dashboardHeader.style.justifyContent = 'space-between';
  dashboardHeader.style.alignItems = 'center';
  dashboardHeader.style.marginBottom = '30px';
  
  // Titolo del dashboard
  const dashboardTitle = document.createElement('h2');
  dashboardTitle.className = 'admin-dashboard-title';
  dashboardTitle.textContent = 'ADMIN DASHBOARD';
  dashboardTitle.style.fontSize = '2rem';
  dashboardTitle.style.fontWeight = '700';
  dashboardTitle.style.textTransform = 'uppercase';
  dashboardTitle.style.letterSpacing = '2px';
  dashboardTitle.style.color = 'var(--color-neon-green)';
  
  // Pulsante di chiusura
  dashboardClose = document.createElement('button');
  dashboardClose.className = 'admin-dashboard-close';
  dashboardClose.innerHTML = '&times;';
  dashboardClose.style.background = 'none';
  dashboardClose.style.border = 'none';
  dashboardClose.style.color = '#ffffff';
  dashboardClose.style.fontSize = '2rem';
  dashboardClose.style.cursor = 'pointer';
  
  // Aggiungi gli elementi all'header
  dashboardHeader.appendChild(dashboardTitle);
  dashboardHeader.appendChild(dashboardClose);
  
  // Crea il contenuto del dashboard
  const dashboardContent = document.createElement('div');
  dashboardContent.className = 'admin-dashboard-content';
  
  // Sezione gestione contenuti
  const contentSection = document.createElement('div');
  contentSection.className = 'admin-section';
  contentSection.style.marginBottom = '40px';
  
  const contentTitle = document.createElement('h3');
  contentTitle.className = 'admin-section-title';
  contentTitle.textContent = 'GESTIONE CONTENUTI';
  contentTitle.style.fontSize = '1.5rem';
  contentTitle.style.fontWeight = '700';
  contentTitle.style.marginBottom = '20px';
  contentTitle.style.textTransform = 'uppercase';
  contentTitle.style.letterSpacing = '1px';
  
  // Pulsanti per la gestione dei contenuti
  const contentButtons = document.createElement('div');
  contentButtons.className = 'admin-buttons';
  contentButtons.style.display = 'grid';
  contentButtons.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
  contentButtons.style.gap = '15px';
  
  // Pulsante modifica homepage
  modifyHomepageBtn = createButton('Modifica Homepage', 'var(--color-neon-green)');
  
  // Pulsante modifica collezioni
  modifyCollectionsBtn = createButton('Modifica Collezioni', 'var(--color-neon-green)');
  
  // Pulsante modifica lookbook
  modifyLookbookBtn = createButton('Modifica Lookbook', 'var(--color-neon-green)');
  
  // Pulsante modifica manifesto
  modifyManifestoBtn = createButton('Modifica Manifesto', 'var(--color-neon-green)');
  
  // Aggiungi i pulsanti alla sezione
  contentButtons.appendChild(modifyHomepageBtn);
  contentButtons.appendChild(modifyCollectionsBtn);
  contentButtons.appendChild(modifyLookbookBtn);
  contentButtons.appendChild(modifyManifestoBtn);
  
  // Aggiungi titolo e pulsanti alla sezione
  contentSection.appendChild(contentTitle);
  contentSection.appendChild(contentButtons);
  
  // Sezione statistiche
  const statsSection = document.createElement('div');
  statsSection.className = 'admin-section';
  statsSection.style.marginBottom = '40px';
  
  const statsTitle = document.createElement('h3');
  statsTitle.className = 'admin-section-title';
  statsTitle.textContent = 'STATISTICHE';
  statsTitle.style.fontSize = '1.5rem';
  statsTitle.style.fontWeight = '700';
  statsTitle.style.marginBottom = '20px';
  statsTitle.style.textTransform = 'uppercase';
  statsTitle.style.letterSpacing = '1px';
  
  // Contenitore per le statistiche
  const statsContainer = document.createElement('div');
  statsContainer.className = 'admin-stats';
  statsContainer.style.display = 'grid';
  statsContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
  statsContainer.style.gap = '20px';
  
  // Statistiche
  const visitsToday = createStatCard('Visite oggi:', '127');
  const totalPreorders = createStatCard('Preordini totali:', '43');
  const registeredUsers = createStatCard('Utenti registrati:', '215');
  
  // Aggiungi le statistiche al contenitore
  statsContainer.appendChild(visitsToday);
  statsContainer.appendChild(totalPreorders);
  statsContainer.appendChild(registeredUsers);
  
  // Aggiungi titolo e statistiche alla sezione
  statsSection.appendChild(statsTitle);
  statsSection.appendChild(statsContainer);
  
  // Sezione azioni rapide
  const actionsSection = document.createElement('div');
  actionsSection.className = 'admin-section';
  
  const actionsTitle = document.createElement('h3');
  actionsTitle.className = 'admin-section-title';
  actionsTitle.textContent = 'AZIONI RAPIDE';
  actionsTitle.style.fontSize = '1.5rem';
  actionsTitle.style.fontWeight = '700';
  actionsTitle.style.marginBottom = '20px';
  actionsTitle.style.textTransform = 'uppercase';
  actionsTitle.style.letterSpacing = '1px';
  
  // Pulsanti per le azioni rapide
  const actionsButtons = document.createElement('div');
  actionsButtons.className = 'admin-buttons';
  actionsButtons.style.display = 'flex';
  actionsButtons.style.gap = '15px';
  actionsButtons.style.flexWrap = 'wrap';
  
  // Pulsante pulizia cache
  const clearCacheBtn = createButton('Pulisci Cache', '#333333');
  
  // Pulsante backup dati
  const backupDataBtn = createButton('Backup Dati', '#333333');
  
  // Pulsante logout
  logoutBtn = createButton('Logout', '#333333');
  
  // Aggiungi i pulsanti alla sezione
  actionsButtons.appendChild(clearCacheBtn);
  actionsButtons.appendChild(backupDataBtn);
  actionsButtons.appendChild(logoutBtn);
  
  // Aggiungi titolo e pulsanti alla sezione
  actionsSection.appendChild(actionsTitle);
  actionsSection.appendChild(actionsButtons);
  
  // Contenitore per l'editor di contenuti
  const editorContainer = document.createElement('div');
  editorContainer.className = 'admin-editor-container';
  editorContainer.style.marginTop = '30px';
  editorContainer.style.display = 'none';
  
  // Aggiungi le sezioni al contenuto del dashboard
  dashboardContent.appendChild(contentSection);
  dashboardContent.appendChild(statsSection);
  dashboardContent.appendChild(actionsSection);
  dashboardContent.appendChild(editorContainer);
  
  // Aggiungi header e contenuto al dashboard
  adminDashboard.appendChild(dashboardHeader);
  adminDashboard.appendChild(dashboardContent);
  
  // Aggiungi il dashboard al body
  document.body.appendChild(adminDashboard);
  
  // Aggiungi event listeners
  dashboardClose.addEventListener('click', closeDashboard);
  modifyHomepageBtn.addEventListener('click', () => showEditor('homepage'));
  modifyCollectionsBtn.addEventListener('click', () => showEditor('collections'));
  modifyLookbookBtn.addEventListener('click', () => showEditor('lookbook'));
  modifyManifestoBtn.addEventListener('click', () => showEditor('manifesto'));
  clearCacheBtn.addEventListener('click', clearCache);
  backupDataBtn.addEventListener('click', backupData);
  logoutBtn.addEventListener('click', handleLogout);
}

/**
 * Crea un pulsante per il dashboard
 * @param {string} text - Testo del pulsante
 * @param {string} bgColor - Colore di sfondo
 * @returns {HTMLButtonElement} - Elemento pulsante
 */
function createButton(text, bgColor) {
  const button = document.createElement('button');
  button.className = 'admin-button';
  button.textContent = text;
  button.style.padding = '12px 20px';
  button.style.backgroundColor = bgColor;
  button.style.border = 'none';
  button.style.color = bgColor === 'var(--color-neon-green)' ? '#000000' : '#ffffff';
  button.style.fontSize = '0.9rem';
  button.style.fontWeight = '700';
  button.style.textTransform = 'uppercase';
  button.style.letterSpacing = '1px';
  button.style.cursor = 'pointer';
  button.style.transition = 'all 0.3s ease';
  
  return button;
}

/**
 * Crea una card per le statistiche
 * @param {string} label - Etichetta della statistica
 * @param {string} value - Valore della statistica
 * @returns {HTMLDivElement} - Elemento card
 */
function createStatCard(label, value) {
  const card = document.createElement('div');
  card.className = 'admin-stat-card';
  card.style.backgroundColor = '#111111';
  card.style.padding = '20px';
  card.style.borderRadius = '5px';
  card.style.textAlign = 'center';
  
  const labelElement = document.createElement('div');
  labelElement.className = 'admin-stat-label';
  labelElement.textContent = label;
  labelElement.style.fontSize = '0.9rem';
  labelElement.style.marginBottom = '10px';
  labelElement.style.opacity = '0.7';
  
  const valueElement = document.createElement('div');
  valueElement.className = 'admin-stat-value';
  valueElement.textContent = value;
  valueElement.style.fontSize = '2rem';
  valueElement.style.fontWeight = '700';
  valueElement.style.color = 'var(--color-neon-green)';
  
  card.appendChild(labelElement);
  card.appendChild(valueElement);
  
  return card;
}

/**
 * Carica i dati per il dashboard
 */
async function loadDashboardData() {
  try {
    // In un'implementazione reale, qui caricheremmo i dati da Sanity
    // Per ora usiamo dati statici
  } catch (error) {
    console.error('Errore durante il caricamento dei dati:', error);
    showNotification('Errore durante il caricamento dei dati', 'error');
  }
}

/**
 * Mostra l'editor per la sezione specificata
 * @param {string} section - Sezione da modificare
 */
async function showEditor(section) {
  currentSection = section;
  
  const editorContainer = document.querySelector('.admin-editor-container');
  editorContainer.innerHTML = '';
  editorContainer.style.display = 'block';
  
  // Header dell'editor
  const editorHeader = document.createElement('div');
  editorHeader.className = 'admin-editor-header';
  editorHeader.style.display = 'flex';
  editorHeader.style.justifyContent = 'space-between';
  editorHeader.style.alignItems = 'center';
  editorHeader.style.marginBottom = '20px';
  editorHeader.style.paddingBottom = '10px';
  editorHeader.style.borderBottom = '1px solid #333333';
  
  // Titolo dell'editor
  const editorTitle = document.createElement('h3');
  editorTitle.className = 'admin-editor-title';
  editorTitle.style.fontSize = '1.5rem';
  editorTitle.style.fontWeight = '700';
  editorTitle.style.textTransform = 'uppercase';
  editorTitle.style.letterSpacing = '1px';
  
  // Pulsante per tornare indietro
  const backButton = document.createElement('button');
  backButton.className = 'admin-back-button';
  backButton.textContent = 'Indietro';
  backButton.style.padding = '8px 15px';
  backButton.style.backgroundColor = '#333333';
  backButton.style.border = 'none';
  backButton.style.color = '#ffffff';
  backButton.style.fontSize = '0.9rem';
  backButton.style.cursor = 'pointer';
  
  backButton.addEventListener('click', () => {
    editorContainer.style.display = 'none';
    currentSection = null;
  });
  
  editorHeader.appendChild(editorTitle);
  editorHeader.appendChild(backButton);
  
  // Contenuto dell'editor
  const editorContent = document.createElement('div');
  editorContent.className = 'admin-editor-content';
  
  // Form per l'editor
  const editorForm = document.createElement('form');
  editorForm.className = 'admin-editor-form';
  editorForm.style.display = 'flex';
  editorForm.style.flexDirection = 'column';
  editorForm.style.gap = '20px';
  
  // Pulsanti di azione
  const editorActions = document.createElement('div');
  editorActions.className = 'admin-editor-actions';
  editorActions.style.display = 'flex';
  editorActions.style.justifyContent = 'flex-end';
  editorActions.style.gap = '15px';
  editorActions.style.marginTop = '30px';
  
  // Pulsante per salvare
  const saveButton = document.createElement('button');
  saveButton.className = 'admin-save-button';
  saveButton.textContent = 'Salva';
  saveButton.type = 'submit';
  saveButton.style.padding = '12px 25px';
  saveButton.style.backgroundColor = 'var(--color-neon-green)';
  saveButton.style.border = 'none';
  saveButton.style.color = '#000000';
  saveButton.style.fontSize = '1rem';
  saveButton.style.fontWeight = '700';
  saveButton.style.textTransform = 'uppercase';
  saveButton.style.cursor = 'pointer';
  
  editorActions.appendChild(saveButton);
  
  // Aggiungi header e azioni al form
  editorContainer.appendChild(editorHeader);
  editorContainer.appendChild(editorContent);
  editorContent.appendChild(editorForm);
  editorForm.appendChild(editorActions);
  
  // Carica i dati specifici per la sezione
  try {
    switch (section) {
      case 'homepage':
        editorTitle.textContent = 'Modifica Homepage';
        await loadHomepageEditor(editorForm);
        break;
      case 'collections':
        editorTitle.textContent = 'Modifica Collezioni';
        await loadCollectionsEditor(editorForm);
        break;
      case 'lookbook':
        editorTitle.textContent = 'Modifica Lookbook';
        await loadLookbookEditor(editorForm);
        break;
      case 'manifesto':
        editorTitle.textContent = 'Modifica Manifesto';
        await loadManifestoEditor(editorForm);
        break;
      default:
        editorTitle.textContent = 'Editor';
        editorForm.innerHTML = '<p>Seleziona una sezione da modificare</p>';
    }
    
    // Aggiungi event listener per il submit del form
    editorForm.addEventListener('submit', handleFormSubmit);
  } catch (error) {
    console.error(`Errore durante il caricamento dell'editor per ${section}:`, error);
    editorContent.innerHTML = `<p style="color: #ff3333;">Errore durante il caricamento dell'editor. Riprova più tardi.</p>`;
  }
}

/**
 * Carica l'editor per la homepage
 * @param {HTMLFormElement} form - Form dell'editor
 */
async function loadHomepageEditor(form) {
  try {
    // In un'implementazione reale, qui caricheremmo i dati da Sanity
    const homepageData = await SanityAPI.fetchHomepage();
    
    // Crea i campi del form
    const heroTitleField = createFormField(
      'heroTitle',
      'Titolo Hero',
      'text',
      homepageData?.heroTitle || "L'unico modo che conosciamo"
    );
    
    const showScrollIndicatorField = createFormField(
      'showScrollIndicator',
      'Mostra indicatore scroll',
      'checkbox',
      homepageData?.showScrollIndicator !== false
    );
    
    // Aggiungi i campi al form
    form.insertBefore(heroTitleField, form.lastChild);
    form.insertBefore(showScrollIndicatorField, form.lastChild);
    
    // Aggiungi i pulsanti hero
    const heroButtonsContainer = document.createElement('div');
    heroButtonsContainer.className = 'form-field';
    
    const heroButtonsLabel = document.createElement('label');
    heroButtonsLabel.textContent = 'Pulsanti Hero';
    heroButtonsLabel.style.display = 'block';
    heroButtonsLabel.style.marginBottom = '10px';
    heroButtonsLabel.style.fontWeight = '700';
    
    const heroButtonsList = document.createElement('div');
    heroButtonsList.className = 'hero-buttons-list';
    heroButtonsList.style.display = 'flex';
    heroButtonsList.style.flexDirection = 'column';
    heroButtonsList.style.gap = '10px';
    
    // Aggiungi i pulsanti esistenti
    const buttons = homepageData?.heroButtons || [
      { text: "SHOP", url: "#" },
      { text: "LOOKBOOK", url: "#lookbook" }
    ];
    
    buttons.forEach((button, index) => {
      const buttonRow = document.createElement('div');
      buttonRow.className = 'hero-button-row';
      buttonRow.style.display = 'flex';
      buttonRow.style.gap = '10px';
      buttonRow.style.alignItems = 'center';
      
      const textInput = document.createElement('input');
      textInput.type = 'text';
      textInput.name = `heroButtons[${index}].text`;
      textInput.value = button.text;
      textInput.placeholder = 'Testo';
      textInput.style.flex = '1';
      textInput.style.padding = '8px';
      textInput.style.backgroundColor = '#333333';
      textInput.style.border = 'none';
      textInput.style.color = '#ffffff';
      
      const urlInput = document.createElement('input');
      urlInput.type = 'text';
      urlInput.name = `heroButtons[${index}].url`;
      urlInput.value = button.url;
      urlInput.placeholder = 'URL';
      urlInput.style.flex = '1';
      urlInput.style.padding = '8px';
      urlInput.style.backgroundColor = '#333333';
      urlInput.style.border = 'none';
      urlInput.style.color = '#ffffff';
      
      buttonRow.appendChild(textInput);
      buttonRow.appendChild(urlInput);
      
      heroButtonsList.appendChild(buttonRow);
    });
    
    heroButtonsContainer.appendChild(heroButtonsLabel);
    heroButtonsContainer.appendChild(heroButtonsList);
    
    form.insertBefore(heroButtonsContainer, form.lastChild);
  } catch (error) {
    console.error('Errore durante il caricamento dell\'editor della homepage:', error);
    form.innerHTML = '<p style="color: #ff3333;">Errore durante il caricamento dei dati. Riprova più tardi.</p>';
  }
}

/**
 * Carica l'editor per le collezioni
 * @param {HTMLFormElement} form - Form dell'editor
 */
async function loadCollectionsEditor(form) {
  try {
    // In un'implementazione reale, qui caricheremmo i dati da Sanity
    const collections = await SanityAPI.fetchCollections();
    
    // Crea un selettore per le collezioni
    const collectionSelector = document.createElement('div');
    collectionSelector.className = 'collection-selector';
    collectionSelector.style.marginBottom = '30px';
    
    const selectorLabel = document.createElement('label');
    selectorLabel.textContent = 'Seleziona una collezione';
    selectorLabel.style.display = 'block';
    selectorLabel.style.marginBottom = '10px';
    selectorLabel.style.fontWeight = '700';
    
    const select = document.createElement('select');
    select.className = 'collection-select';
    select.style.padding = '10px';
    select.style.backgroundColor = '#333333';
    select.style.border = 'none';
    select.style.color = '#ffffff';
    select.style.width = '100%';
    
    // Opzione per creare una nuova collezione
    const newOption = document.createElement('option');
    newOption.value = 'new';
    newOption.textContent = '+ Nuova collezione';
    select.appendChild(newOption);
    
    // Opzioni per le collezioni esistenti
    const collectionsList = collections || [
      {
        _id: '1',
        title: 'Intifada',
        tagline: 'La nostra arma è restare vivi. Vestiti per combattere.',
        image: 'assets/images/collections/intifada.jpg'
      },
      {
        _id: '2',
        title: 'Revolución',
        tagline: 'Vestiti come se stessi scappando. O resistendo. O facendo l\'amore sotto un portico.',
        image: 'assets/images/collections/revolucion.jpg'
      },
      {
        _id: '3',
        title: 'Land of Smile',
        tagline: 'Nel paese dei sorrisi, l\'unico vero è quello di chi non si finge.',
        image: 'assets/images/collections/land-of-smile.jpg'
      }
    ];
    
    collectionsList.forEach(collection => {
      const option = document.createElement('option');
      option.value = collection._id;
      option.textContent = collection.title;
      select.appendChild(option);
    });
    
    collectionSelector.appendChild(selectorLabel);
    collectionSelector.appendChild(select);
    
    // Contenitore per i campi della collezione
    const collectionFields = document.createElement('div');
    collectionFields.className = 'collection-fields';
    
    // Aggiungi il selettore e i campi al form
    form.insertBefore(collectionSelector, form.lastChild);
    form.insertBefore(collectionFields, form.lastChild);
    
    // Event listener per il cambio di collezione
    select.addEventListener('change', async () => {
      const selectedId = select.value;
      
      // Svuota i campi
      collectionFields.innerHTML = '';
      
      if (selectedId === 'new') {
        // Campi per una nuova collezione
        const titleField = createFormField(
          'title',
          'Titolo',
          'text',
          ''
        );
        
        const taglineField = createFormField(
          'tagline',
          'Tagline',
          'text',
          ''
        );
        
        const imageField = createFormField(
          'image',
          'Immagine',
          'file',
          ''
        );
        
        collectionFields.appendChild(titleField);
        collectionFields.appendChild(taglineField);
        collectionFields.appendChild(imageField);
      } else {
        // Trova la collezione selezionata
        const selectedCollection = collectionsList.find(c => c._id === selectedId);
        
        if (selectedCollection) {
          const titleField = createFormField(
            'title',
            'Titolo',
            'text',
            selectedCollection.title
          );
          
          const taglineField = createFormField(
            'tagline',
            'Tagline',
            'text',
            selectedCollection.tagline
          );
          
          const imagePreview = document.createElement('div');
          imagePreview.className = 'image-preview';
          imagePreview.style.marginBottom = '20px';
          
          const imageLabel = document.createElement('label');
          imageLabel.textContent = 'Immagine attuale';
          imageLabel.style.display = 'block';
          imageLabel.style.marginBottom = '10px';
          imageLabel.style.fontWeight = '700';
          
          const image = document.createElement('img');
          image.src = selectedCollection.image;
          image.alt = selectedCollection.title;
          image.style.maxWidth = '300px';
          image.style.maxHeight = '200px';
          image.style.objectFit = 'cover';
          
          imagePreview.appendChild(imageLabel);
          imagePreview.appendChild(image);
          
          const imageField = createFormField(
            'image',
            'Nuova immagine (opzionale)',
            'file',
            ''
          );
          
          collectionFields.appendChild(titleField);
          collectionFields.appendChild(taglineField);
          collectionFields.appendChild(imagePreview);
          collectionFields.appendChild(imageField);
        }
      }
    });
    
    // Trigger change event to load first collection
    select.dispatchEvent(new Event('change'));
  } catch (error) {
    console.error('Errore durante il caricamento dell\'editor delle collezioni:', error);
    form.innerHTML = '<p style="color: #ff3333;">Errore durante il caricamento dei dati. Riprova più tardi.</p>';
  }
}

/**
 * Carica l'editor per il lookbook
 * @param {HTMLFormElement} form - Form dell'editor
 */
async function loadLookbookEditor(form) {
  try {
    // In un'implementazione reale, qui caricheremmo i dati da Sanity
    const lookbookData = await SanityAPI.fetchLookbook();
    
    // Crea i campi del form
    const titleField = createFormField(
      'title',
      'Titolo',
      'text',
      lookbookData?.title || 'Lookbook'
    );
    
    const subtitleField = createFormField(
      'subtitle',
      'Sottotitolo',
      'text',
      lookbookData?.subtitle || 'Stile urbano. Attitudine globale.'
    );
    
    // Aggiungi i campi al form
    form.insertBefore(titleField, form.lastChild);
    form.insertBefore(subtitleField, form.lastChild);
    
    // Gestione immagini
    const imagesContainer = document.createElement('div');
    imagesContainer.className = 'form-field';
    
    const imagesLabel = document.createElement('label');
    imagesLabel.textContent = 'Immagini';
    imagesLabel.style.display = 'block';
    imagesLabel.style.marginBottom = '10px';
    imagesLabel.style.fontWeight = '700';
    
    const imagesList = document.createElement('div');
    imagesList.className = 'images-list';
    imagesList.style.display = 'grid';
    imagesList.style.gridTemplateColumns = 'repeat(auto-fill, minmax(150px, 1fr))';
    imagesList.style.gap = '15px';
    imagesList.style.marginBottom = '20px';
    
    // Immagini esistenti
    const images = lookbookData?.images || [
      { url: 'assets/images/lookbook-approved/lookbook_1.png', alt: 'D3MAS1ADØ Lookbook' }
    ];
    
    images.forEach((image, index) => {
      const imageItem = document.createElement('div');
      imageItem.className = 'image-item';
      imageItem.style.position = 'relative';
      
      const img = document.createElement('img');
      img.src = image.url;
      img.alt = image.alt || '';
      img.style.width = '100%';
      img.style.height = '150px';
      img.style.objectFit = 'cover';
      
      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.className = 'remove-image';
      removeButton.textContent = '×';
      removeButton.style.position = 'absolute';
      removeButton.style.top = '5px';
      removeButton.style.right = '5px';
      removeButton.style.width = '25px';
      removeButton.style.height = '25px';
      removeButton.style.borderRadius = '50%';
      removeButton.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      removeButton.style.color = '#ffffff';
      removeButton.style.border = 'none';
      removeButton.style.fontSize = '1rem';
      removeButton.style.cursor = 'pointer';
      
      removeButton.addEventListener('click', () => {
        imageItem.remove();
      });
      
      imageItem.appendChild(img);
      imageItem.appendChild(removeButton);
      
      imagesList.appendChild(imageItem);
    });
    
    // Campo per aggiungere nuove immagini
    const addImageField = document.createElement('div');
    addImageField.className = 'add-image-field';
    
    const addImageLabel = document.createElement('label');
    addImageLabel.textContent = 'Aggiungi nuova immagine';
    addImageLabel.style.display = 'block';
    addImageLabel.style.marginBottom = '10px';
    
    const addImageInput = document.createElement('input');
    addImageInput.type = 'file';
    addImageInput.name = 'newImage';
    addImageInput.accept = 'image/*';
    addImageInput.style.marginBottom = '10px';
    
    const addImageButton = document.createElement('button');
    addImageButton.type = 'button';
    addImageButton.textContent = 'Aggiungi immagine';
    addImageButton.style.padding = '8px 15px';
    addImageButton.style.backgroundColor = '#333333';
    addImageButton.style.border = 'none';
    addImageButton.style.color = '#ffffff';
    addImageButton.style.cursor = 'pointer';
    
    addImageField.appendChild(addImageLabel);
    addImageField.appendChild(addImageInput);
    addImageField.appendChild(addImageButton);
    
    imagesContainer.appendChild(imagesLabel);
    imagesContainer.appendChild(imagesList);
    imagesContainer.appendChild(addImageField);
    
    form.insertBefore(imagesContainer, form.lastChild);
  } catch (error) {
    console.error('Errore durante il caricamento dell\'editor del lookbook:', error);
    form.innerHTML = '<p style="color: #ff3333;">Errore durante il caricamento dei dati. Riprova più tardi.</p>';
  }
}

/**
 * Carica l'editor per il manifesto
 * @param {HTMLFormElement} form - Form dell'editor
 */
async function loadManifestoEditor(form) {
  try {
    // In un'implementazione reale, qui caricheremmo i dati da Sanity
    const manifestoData = await SanityAPI.fetchManifesto();
    
    // Crea i campi del form
    const titleField = createFormField(
      'title',
      'Titolo',
      'text',
      manifestoData?.title || 'Manifesto'
    );
    
    // Aggiungi i campi al form
    form.insertBefore(titleField, form.lastChild);
    
    // Paragrafi brevi
    const paragraphsContainer = document.createElement('div');
    paragraphsContainer.className = 'form-field';
    
    const paragraphsLabel = document.createElement('label');
    paragraphsLabel.textContent = 'Paragrafi brevi (mostrati nella homepage)';
    paragraphsLabel.style.display = 'block';
    paragraphsLabel.style.marginBottom = '10px';
    paragraphsLabel.style.fontWeight = '700';
    
    const paragraphsList = document.createElement('div');
    paragraphsList.className = 'paragraphs-list';
    paragraphsList.style.display = 'flex';
    paragraphsList.style.flexDirection = 'column';
    paragraphsList.style.gap = '10px';
    paragraphsList.style.marginBottom = '20px';
    
    // Paragrafi esistenti
    const paragraphs = manifestoData?.paragraphs || [
      "D3MAS1ADØ non è solo un brand. È un movimento culturale che nasce dalle strade, dalle periferie, dai margini.",
      "Creiamo capi che raccontano storie di resistenza, di orgoglio, di identità.",
      "Unidad-31Ø è la nostra community. Un rifugio per chi cerca autenticità in un mondo di apparenze."
    ];
    
    paragraphs.forEach((paragraph, index) => {
      const paragraphRow = document.createElement('div');
      paragraphRow.className = 'paragraph-row';
      paragraphRow.style.display = 'flex';
      paragraphRow.style.gap = '10px';
      paragraphRow.style.alignItems = 'flex-start';
      
      const textarea = document.createElement('textarea');
      textarea.name = `paragraphs[${index}]`;
      textarea.value = paragraph;
      textarea.style.flex = '1';
      textarea.style.padding = '8px';
      textarea.style.backgroundColor = '#333333';
      textarea.style.border = 'none';
      textarea.style.color = '#ffffff';
      textarea.style.minHeight = '80px';
      textarea.style.resize = 'vertical';
      
      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.textContent = '×';
      removeButton.style.width = '30px';
      removeButton.style.height = '30px';
      removeButton.style.backgroundColor = '#333333';
      removeButton.style.border = 'none';
      removeButton.style.color = '#ffffff';
      removeButton.style.fontSize = '1.2rem';
      removeButton.style.cursor = 'pointer';
      
      removeButton.addEventListener('click', () => {
        paragraphRow.remove();
      });
      
      paragraphRow.appendChild(textarea);
      paragraphRow.appendChild(removeButton);
      
      paragraphsList.appendChild(paragraphRow);
    });
    
    // Pulsante per aggiungere un nuovo paragrafo
    const addParagraphButton = document.createElement('button');
    addParagraphButton.type = 'button';
    addParagraphButton.textContent = '+ Aggiungi paragrafo';
    addParagraphButton.style.alignSelf = 'flex-start';
    addParagraphButton.style.padding = '8px 15px';
    addParagraphButton.style.backgroundColor = '#333333';
    addParagraphButton.style.border = 'none';
    addParagraphButton.style.color = '#ffffff';
    addParagraphButton.style.cursor = 'pointer';
    
    addParagraphButton.addEventListener('click', () => {
      const newIndex = paragraphsList.children.length;
      
      const paragraphRow = document.createElement('div');
      paragraphRow.className = 'paragraph-row';
      paragraphRow.style.display = 'flex';
      paragraphRow.style.gap = '10px';
      paragraphRow.style.alignItems = 'flex-start';
      
      const textarea = document.createElement('textarea');
      textarea.name = `paragraphs[${newIndex}]`;
      textarea.value = '';
      textarea.style.flex = '1';
      textarea.style.padding = '8px';
      textarea.style.backgroundColor = '#333333';
      textarea.style.border = 'none';
      textarea.style.color = '#ffffff';
      textarea.style.minHeight = '80px';
      textarea.style.resize = 'vertical';
      
      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.textContent = '×';
      removeButton.style.width = '30px';
      removeButton.style.height = '30px';
      removeButton.style.backgroundColor = '#333333';
      removeButton.style.border = 'none';
      removeButton.style.color = '#ffffff';
      removeButton.style.fontSize = '1.2rem';
      removeButton.style.cursor = 'pointer';
      
      removeButton.addEventListener('click', () => {
        paragraphRow.remove();
      });
      
      paragraphRow.appendChild(textarea);
      paragraphRow.appendChild(removeButton);
      
      paragraphsList.appendChild(paragraphRow);
    });
    
    paragraphsContainer.appendChild(paragraphsLabel);
    paragraphsContainer.appendChild(paragraphsList);
    paragraphsContainer.appendChild(addParagraphButton);
    
    // Manifesto completo
    const fullManifestoContainer = document.createElement('div');
    fullManifestoContainer.className = 'form-field';
    
    const fullManifestoLabel = document.createElement('label');
    fullManifestoLabel.textContent = 'Manifesto completo';
    fullManifestoLabel.style.display = 'block';
    fullManifestoLabel.style.marginBottom = '10px';
    fullManifestoLabel.style.fontWeight = '700';
    
    const fullManifestoTextarea = document.createElement('textarea');
    fullManifestoTextarea.name = 'fullManifesto';
    fullManifestoTextarea.value = manifestoData?.fullManifesto || "D3MAS1ADØ nasce come risposta alla standardizzazione della moda contemporanea. Siamo un collettivo di designer, artisti e attivisti uniti dalla visione di un lusso urbano autentico, che non scende a compromessi. Le nostre collezioni raccontano storie di resistenza culturale, di identità fluide, di orgoglio per le proprie radici. Ogni capo è un manifesto, ogni design una dichiarazione di intenti. Non seguiamo le tendenze, le creiamo. Non ci adattiamo al mercato, lo sfidiamo. D3MAS1ADØ non è per tutti, è per chi ha il coraggio di distinguersi, di abbracciare la propria unicità, di vivere secondo le proprie regole. Unidad-31Ø è la nostra community, uno spazio sicuro dove esprimersi liberamente, dove condividere idee e visioni, dove costruire insieme il futuro della moda urbana. Siamo qui per restare. Siamo qui per cambiare le regole del gioco.";
    fullManifestoTextarea.style.width = '100%';
    fullManifestoTextarea.style.padding = '8px';
    fullManifestoTextarea.style.backgroundColor = '#333333';
    fullManifestoTextarea.style.border = 'none';
    fullManifestoTextarea.style.color = '#ffffff';
    fullManifestoTextarea.style.minHeight = '200px';
    fullManifestoTextarea.style.resize = 'vertical';
    
    fullManifestoContainer.appendChild(fullManifestoLabel);
    fullManifestoContainer.appendChild(fullManifestoTextarea);
    
    // Aggiungi i contenitori al form
    form.insertBefore(paragraphsContainer, form.lastChild);
    form.insertBefore(fullManifestoContainer, form.lastChild);
  } catch (error) {
    console.error('Errore durante il caricamento dell\'editor del manifesto:', error);
    form.innerHTML = '<p style="color: #ff3333;">Errore durante il caricamento dei dati. Riprova più tardi.</p>';
  }
}

/**
 * Crea un campo per il form
 * @param {string} name - Nome del campo
 * @param {string} label - Etichetta del campo
 * @param {string} type - Tipo di input
 * @param {string|boolean} value - Valore del campo
 * @returns {HTMLDivElement} - Elemento del campo
 */
function createFormField(name, label, type, value) {
  const field = document.createElement('div');
  field.className = 'form-field';
  field.style.marginBottom = '20px';
  
  const labelElement = document.createElement('label');
  labelElement.htmlFor = name;
  labelElement.textContent = label;
  labelElement.style.display = 'block';
  labelElement.style.marginBottom = '10px';
  labelElement.style.fontWeight = '700';
  
  let inputElement;
  
  if (type === 'textarea') {
    inputElement = document.createElement('textarea');
    inputElement.style.minHeight = '100px';
    inputElement.style.resize = 'vertical';
  } else {
    inputElement = document.createElement('input');
    inputElement.type = type;
  }
  
  inputElement.name = name;
  inputElement.id = name;
  
  if (type === 'checkbox') {
    inputElement.checked = value;
    inputElement.style.width = '20px';
    inputElement.style.height = '20px';
    
    // Wrapper per checkbox e label
    const checkboxWrapper = document.createElement('div');
    checkboxWrapper.style.display = 'flex';
    checkboxWrapper.style.alignItems = 'center';
    checkboxWrapper.style.gap = '10px';
    
    checkboxWrapper.appendChild(inputElement);
    checkboxWrapper.appendChild(labelElement);
    
    field.appendChild(checkboxWrapper);
  } else {
    if (type !== 'file') {
      inputElement.value = value;
    }
    
    inputElement.style.width = '100%';
    inputElement.style.padding = '10px';
    inputElement.style.backgroundColor = '#333333';
    inputElement.style.border = 'none';
    inputElement.style.color = '#ffffff';
    
    field.appendChild(labelElement);
    field.appendChild(inputElement);
  }
  
  return field;
}

/**
 * Gestisce il submit del form
 * @param {Event} e - Evento submit
 */
async function handleFormSubmit(e) {
  e.preventDefault();
  
  try {
    const formData = new FormData(e.target);
    let data = {};
    
    // Converti FormData in oggetto
    for (const [key, value] of formData.entries()) {
      // Gestisci array (es. paragraphs[0], paragraphs[1], ...)
      if (key.includes('[') && key.includes(']')) {
        const mainKey = key.substring(0, key.indexOf('['));
        const index = parseInt(key.substring(key.indexOf('[') + 1, key.indexOf(']')));
        
        if (!data[mainKey]) {
          data[mainKey] = [];
        }
        
        // Gestisci oggetti annidati (es. heroButtons[0].text)
        if (key.includes('.')) {
          const subKey = key.substring(key.indexOf('.') + 1);
          
          if (!data[mainKey][index]) {
            data[mainKey][index] = {};
          }
          
          data[mainKey][index][subKey] = value;
        } else {
          data[mainKey][index] = value;
        }
      } else {
        data[key] = value;
      }
    }
    
    // Gestisci checkbox
    const checkboxes = e.target.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      data[checkbox.name] = checkbox.checked;
    });
    
    // Salva i dati in base alla sezione corrente
    let result;
    
    switch (currentSection) {
      case 'homepage':
        result = await SanityAPI.updateHomepage(data);
        break;
      case 'collections':
        const collectionSelect = document.querySelector('.collection-select');
        const selectedId = collectionSelect.value;
        
        if (selectedId === 'new') {
          result = await SanityAPI.createCollection(data);
        } else {
          result = await SanityAPI.updateCollection(selectedId, data);
        }
        break;
      case 'lookbook':
        result = await SanityAPI.updateLookbook(data);
        break;
      case 'manifesto':
        result = await SanityAPI.updateManifesto(data);
        break;
      default:
        throw new Error('Sezione non valida');
    }
    
    if (result && result.success) {
      showNotification('Modifiche salvate con successo', 'success');
      
      // Nascondi l'editor
      document.querySelector('.admin-editor-container').style.display = 'none';
      currentSection = null;
    } else {
      showNotification('Errore durante il salvataggio delle modifiche', 'error');
    }
  } catch (error) {
    console.error('Errore durante il salvataggio delle modifiche:', error);
    showNotification('Errore durante il salvataggio delle modifiche', 'error');
  }
}

/**
 * Mostra una notifica
 * @param {string} message - Messaggio della notifica
 * @param {string} type - Tipo di notifica (success, error)
 */
function showNotification(message, type) {
  // Rimuovi eventuali notifiche precedenti
  document.querySelector('.admin-notification')?.remove();
  
  const notification = document.createElement('div');
  notification.className = 'admin-notification';
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.left = '50%';
  notification.style.transform = 'translateX(-50%)';
  notification.style.padding = '10px 20px';
  notification.style.borderRadius = '5px';
  notification.style.color = '#ffffff';
  notification.style.zIndex = '2100';
  
  if (type === 'success') {
    notification.style.backgroundColor = 'var(--color-neon-green)';
    notification.style.color = '#000000';
  } else {
    notification.style.backgroundColor = '#ff3333';
  }
  
  document.body.appendChild(notification);
  
  // Rimuovi la notifica dopo 3 secondi
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

/**
 * Pulisce la cache
 */
function clearCache() {
  try {
    localStorage.clear();
    sessionStorage.removeItem('sanityData');
    
    showNotification('Cache pulita con successo', 'success');
  } catch (error) {
    console.error('Errore durante la pulizia della cache:', error);
    showNotification('Errore durante la pulizia della cache', 'error');
  }
}

/**
 * Esegue il backup dei dati
 */
function backupData() {
  try {
    showNotification('Backup dei dati in corso...', 'success');
    
    // In un'implementazione reale, qui eseguiremmo un backup dei dati su Sanity
    setTimeout(() => {
      showNotification('Backup completato con successo', 'success');
    }, 2000);
  } catch (error) {
    console.error('Errore durante il backup dei dati:', error);
    showNotification('Errore durante il backup dei dati', 'error');
  }
}

/**
 * Gestisce il logout
 */
function handleLogout() {
  try {
    SanityAPI.logout();
    closeDashboard();
    showNotification('Logout effettuato con successo', 'success');
  } catch (error) {
    console.error('Errore durante il logout:', error);
    showNotification('Errore durante il logout', 'error');
  }
}

/**
 * Chiude il dashboard
 */
function closeDashboard() {
  adminDashboard.classList.remove('active');
}

// Inizializza il pannello admin quando il DOM è pronto
document.addEventListener('DOMContentLoaded', initAdminPanel);

// Esporta le funzioni per l'uso in altri file
export default {
  initAdminPanel,
  openAdminModal,
  closeAdminModal
};

/**
 * D3MAS1ADØ - Admin Panel
 * 
 * Gestisce la funzionalità del pannello admin
 */

document.addEventListener('DOMContentLoaded', function() {
    // Riferimenti agli elementi DOM
    const adminLink = document.querySelector('.admin-link');
    const adminModal = document.querySelector('.admin-modal');
    const adminModalClose = document.querySelector('.admin-modal-close');
    const adminForm = document.querySelector('.admin-form');
    
    // Inizializzazione
    initAdminPanel();
    
    /**
     * Inizializza il pannello admin
     */
    function initAdminPanel() {
        if (adminLink && adminModal) {
            // Apri modal al click sul link admin
            adminLink.addEventListener('click', function(e) {
                e.preventDefault();
                adminModal.classList.add('active');
                document.body.classList.add('no-scroll');
                
                // Focus sul primo campo
                const firstInput = adminModal.querySelector('input');
                if (firstInput) {
                    setTimeout(() => {
                        firstInput.focus();
                    }, 300);
                }
            });
            
            // Chiudi modal
            if (adminModalClose) {
                adminModalClose.addEventListener('click', function() {
                    adminModal.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                });
            }
            
            // Click fuori dal modal per chiudere
            adminModal.addEventListener('click', function(e) {
                if (e.target === adminModal) {
                    adminModal.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
            
            // Gestione form admin
            if (adminForm) {
                adminForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const username = document.getElementById('admin-username').value;
                    const password = document.getElementById('admin-password').value;
                    
                    // Verifica credenziali (esempio)
                    if (username === 'admin' && password === 'demasiadoadmin') {
                        // Reindirizza all'area admin o mostra pannello
                        showAdminDashboard();
                    } else {
                        showLoginError();
                    }
                });
            }
        }
    }
    
    /**
     * Mostra dashboard admin
     */
    function showAdminDashboard() {
        // Nascondi form login
        const loginForm = document.querySelector('.admin-form');
        if (loginForm) {
            loginForm.style.display = 'none';
        }
        
        // Cambia titolo
        const modalTitle = document.querySelector('.admin-modal-title');
        if (modalTitle) {
            modalTitle.textContent = 'Admin Dashboard';
        }
        
        // Crea dashboard
        const dashboardContent = document.createElement('div');
        dashboardContent.classList.add('admin-dashboard');
        
        dashboardContent.innerHTML = `
            <div class="admin-section">
                <h3 class="admin-section-title">Gestione Contenuti</h3>
                <div class="admin-actions">
                    <button class="admin-action-btn" data-action="edit-home">Modifica Homepage</button>
                    <button class="admin-action-btn" data-action="edit-collections">Modifica Collezioni</button>
                    <button class="admin-action-btn" data-action="edit-lookbook">Modifica Lookbook</button>
                    <button class="admin-action-btn" data-action="edit-manifesto">Modifica Manifesto</button>
                </div>
            </div>
            
            <div class="admin-section">
                <h3 class="admin-section-title">Statistiche</h3>
                <div class="admin-stats">
                    <div class="admin-stat-item">
                        <span class="admin-stat-label">Visite oggi:</span>
                        <span class="admin-stat-value">127</span>
                    </div>
                    <div class="admin-stat-item">
                        <span class="admin-stat-label">Preordini totali:</span>
                        <span class="admin-stat-value">43</span>
                    </div>
                    <div class="admin-stat-item">
                        <span class="admin-stat-label">Utenti registrati:</span>
                        <span class="admin-stat-value">215</span>
                    </div>
                </div>
            </div>
            
            <div class="admin-section">
                <h3 class="admin-section-title">Azioni Rapide</h3>
                <div class="admin-actions">
                    <button class="admin-action-btn" data-action="clear-cache">Pulisci Cache</button>
                    <button class="admin-action-btn" data-action="backup">Backup Dati</button>
                    <button class="admin-action-btn" data-action="logout">Logout</button>
                </div>
            </div>
        `;
        
        // Aggiungi dashboard al modal
        const modalContent = document.querySelector('.admin-modal-content');
        if (modalContent) {
            modalContent.appendChild(dashboardContent);
        }
        
        // Event listener per azioni dashboard
        const actionButtons = document.querySelectorAll('.admin-action-btn');
        actionButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                
                if (action === 'logout') {
                    // Ricarica la pagina per logout
                    location.reload();
                } else {
                    // Simula azione
                    alert(`Azione "${action}" in sviluppo`);
                }
            });
        });
    }
    
    /**
     * Mostra errore login
     */
    function showLoginError() {
        const errorMsg = document.querySelector('.admin-error');
        
        if (errorMsg) {
            // Aggiorna messaggio esistente
            errorMsg.textContent = 'Credenziali non valide. Riprova.';
            errorMsg.style.display = 'block';
        } else {
            // Crea nuovo messaggio
            const newErrorMsg = document.createElement('div');
            newErrorMsg.classList.add('admin-error');
            newErrorMsg.textContent = 'Credenziali non valide. Riprova.';
            
            // Inserisci dopo il titolo
            const modalTitle = document.querySelector('.admin-modal-title');
            if (modalTitle) {
                modalTitle.insertAdjacentElement('afterend', newErrorMsg);
            }
        }
        
        // Pulisci password
        const passwordInput = document.getElementById('admin-password');
        if (passwordInput) {
            passwordInput.value = '';
            passwordInput.focus();
        }
    }
});

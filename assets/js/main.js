// JavaScript per D3MAS1ADØ - Funzioni principali

document.addEventListener('DOMContentLoaded', function() {
    // Rimuovi preloader
    setTimeout(function() {
        document.body.classList.remove('preload');
        document.getElementById('preloader').style.display = 'none';
    }, 1500);

    // Header scroll
    let lastScrollTop = 0;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
            
            if (scrollTop > lastScrollTop && scrollTop > 300) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Modal Manifesto
    const openManifestoBtn = document.getElementById('open-manifesto');
    const manifestoModal = document.getElementById('manifesto-modal');
    const closeManifestoBtn = document.querySelector('.manifesto-modal-close');
    
    if (openManifestoBtn && manifestoModal && closeManifestoBtn) {
        openManifestoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            manifestoModal.classList.add('active');
            document.body.classList.add('no-scroll');
        });
        
        closeManifestoBtn.addEventListener('click', function() {
            manifestoModal.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === manifestoModal) {
                manifestoModal.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // Lana AI Chatbot
    const lanaToggle = document.querySelector('.lana-toggle');
    const lanaWindow = document.querySelector('.lana-chat-window');
    const lanaClose = document.querySelector('.lana-close');
    const lanaInput = document.querySelector('.lana-input input');
    const lanaSend = document.querySelector('.lana-send');
    const lanaMessages = document.querySelector('.lana-messages');
    
    if (lanaToggle && lanaWindow && lanaClose) {
        lanaToggle.addEventListener('click', function() {
            lanaWindow.classList.toggle('active');
            if (lanaInput) {
                setTimeout(() => lanaInput.focus(), 300);
            }
        });
        
        lanaClose.addEventListener('click', function() {
            lanaWindow.classList.remove('active');
        });
        
        if (lanaSend && lanaInput && lanaMessages) {
            lanaSend.addEventListener('click', sendLanaMessage);
            lanaInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendLanaMessage();
                }
            });
        }
    }
    
    function sendLanaMessage() {
        const message = lanaInput.value.trim();
        if (message) {
            // Aggiungi messaggio utente
            const userMessageEl = document.createElement('div');
            userMessageEl.className = 'lana-message user';
            userMessageEl.innerHTML = `<p>${message}</p>`;
            lanaMessages.appendChild(userMessageEl);
            
            // Pulisci input
            lanaInput.value = '';
            
            // Scroll to bottom
            lanaMessages.scrollTop = lanaMessages.scrollHeight;
            
            // Simula risposta di Lana (in un'app reale, qui ci sarebbe una chiamata API)
            setTimeout(function() {
                const lanaResponse = getLanaResponse(message);
                const lanaMessageEl = document.createElement('div');
                lanaMessageEl.className = 'lana-message lana';
                lanaMessageEl.innerHTML = `<p>${lanaResponse}</p>`;
                lanaMessages.appendChild(lanaMessageEl);
                
                // Scroll to bottom
                lanaMessages.scrollTop = lanaMessages.scrollHeight;
            }, 1000);
        }
    }
    
    function getLanaResponse(message) {
        message = message.toLowerCase();
        
        if (message.includes('ciao') || message.includes('salve') || message.includes('hey')) {
            return "Ciao! Sono Lana, l'assistente AI di D3MAS1ADØ. Come posso aiutarti oggi?";
        } else if (message.includes('collezione') || message.includes('intifada') || message.includes('revolucion') || message.includes('land of smile')) {
            return "Le nostre collezioni INTIFADA, REVOLUCIÓN e LAND OF SMILE rappresentano la nostra visione di lusso urbano. Ogni capo è prodotto in edizione limitata con materiali di alta qualità. Vuoi saperne di più su una collezione specifica?";
        } else if (message.includes('prezzo') || message.includes('costo') || message.includes('quanto costa')) {
            return "I nostri capi hanno prezzi variabili in base alla collezione e al tipo di prodotto. Ti consiglio di visitare la sezione SHOP o fare un preordine per ricevere informazioni dettagliate sui prezzi.";
        } else if (message.includes('spedizione') || message.includes('consegna')) {
            return "Effettuiamo spedizioni in tutto il mondo. I tempi di consegna variano da 3-5 giorni lavorativi per l'Italia a 7-14 giorni per le spedizioni internazionali. Tutte le spedizioni sono tracciabili.";
        } else if (message.includes('reso') || message.includes('rimborso') || message.includes('cambio')) {
            return "Accettiamo resi entro 14 giorni dalla ricezione del prodotto. Il capo deve essere in condizioni perfette con etichette ancora attaccate. Contatta il nostro servizio clienti per avviare la procedura di reso.";
        } else if (message.includes('manifesto')) {
            return "Il nostro manifesto rappresenta la filosofia di D3MAS1ADØ: un lusso urbano autentico che non scende a compromessi. Puoi leggere il manifesto completo cliccando sul link nella sezione dedicata del sito.";
        } else if (message.includes('grazie') || message.includes('thank')) {
            return "Figurati! Sono qui per aiutarti. C'è altro di cui hai bisogno?";
        } else {
            return "Interessante! Posso aiutarti con informazioni sulle nostre collezioni, spedizioni, resi o preordini. Fammi sapere cosa ti interessa.";
        }
    }

    // Admin Panel
    const adminLink = document.querySelector('.admin-link');
    const adminModal = document.getElementById('admin-modal');
    const closeAdminModal = document.querySelector('.close-modal');
    const loginBtn = document.getElementById('login-btn');
    const adminDashboard = document.getElementById('admin-dashboard');
    const closeDashboard = document.querySelector('.close-dashboard');
    
    if (adminLink && adminModal && closeAdminModal) {
        adminLink.addEventListener('click', function(e) {
            e.preventDefault();
            adminModal.style.display = 'flex';
        });
        
        closeAdminModal.addEventListener('click', function() {
            adminModal.style.display = 'none';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === adminModal) {
                adminModal.style.display = 'none';
            }
        });
        
        if (loginBtn) {
            loginBtn.addEventListener('click', function() {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const loginError = document.getElementById('login-error');
                
                if (username === 'admin' && password === 'd3masiado2025') {
                    adminModal.style.display = 'none';
                    if (adminDashboard) {
                        adminDashboard.style.display = 'flex';
                    }
                } else {
                    if (loginError) {
                        loginError.textContent = 'Username o password non validi';
                    }
                }
            });
        }
        
        if (closeDashboard) {
            closeDashboard.addEventListener('click', function() {
                adminDashboard.style.display = 'none';
            });
            
            window.addEventListener('click', function(e) {
                if (e.target === adminDashboard) {
                    adminDashboard.style.display = 'none';
                }
            });
        }
    }

    // Sanity CMS Integration
    // Nota: questa è una simulazione dell'integrazione con Sanity
    // In un'implementazione reale, qui ci sarebbero le chiamate API a Sanity
    const editHomepage = document.getElementById('edit-homepage');
    const editCollections = document.getElementById('edit-collections');
    const editLookbook = document.getElementById('edit-lookbook');
    const editManifesto = document.getElementById('edit-manifesto');
    
    if (editHomepage) {
        editHomepage.addEventListener('click', function() {
            alert('Funzione di modifica homepage in sviluppo. Connessione a Sanity CMS (ID: yy05mm62)');
        });
    }
    
    if (editCollections) {
        editCollections.addEventListener('click', function() {
            alert('Funzione di modifica collezioni in sviluppo. Connessione a Sanity CMS (ID: yy05mm62)');
        });
    }
    
    if (editLookbook) {
        editLookbook.addEventListener('click', function() {
            alert('Funzione di modifica lookbook in sviluppo. Connessione a Sanity CMS (ID: yy05mm62)');
        });
    }
    
    if (editManifesto) {
        editManifesto.addEventListener('click', function() {
            alert('Funzione di modifica manifesto in sviluppo. Connessione a Sanity CMS (ID: yy05mm62)');
        });
    }

    // Animazioni al scroll
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    
    const fadeInOnScroll = function() {
        fadeElements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight) && (elementBottom > 0);
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Esegui al caricamento
});

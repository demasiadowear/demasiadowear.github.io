// lana-ai-chatbot.js
/**
 * D3MAS1ADØ - Lana AI Chatbot
 * 
 * Chatbot testuale con supporto multilingua IT/EN
 * Implementa un sistema ibrido con risposte predefinite e fallback AI
 */

document.addEventListener('DOMContentLoaded', function() {
  // Configurazione
  const config = {
    enabled: true,
    position: 'bottom-right',
    iconColor: '#39FF14',
    backgroundColor: '#000000',
    textColor: '#ffffff',
    accentColor: '#39FF14'
  };
  
  // Stato
  let isOpen = false;
  let currentLanguage = 'it';
  
  // Elementi DOM
  let chatContainer;
  let chatButton;
  let chatWindow;
  let messagesContainer;
  let inputContainer;
  let messageInput;
  let sendButton;
  
  // Risposte predefinite per categoria
  const responses = {
    welcome: {
      it: [
        "Ciao, sono Lana. Benvenuto nel mondo D3MAS1ADØ. Come posso aiutarti oggi?",
        "Benvenuto. Sono Lana, la voce di D3MAS1ADØ. Cosa ti interessa scoprire?"
      ],
      en: [
        "Hi, I'm Lana. Welcome to the D3MAS1ADØ world. How can I help you today?",
        "Welcome. I'm Lana, the voice of D3MAS1ADØ. What would you like to discover?"
      ]
    },
    brand: {
      it: [
        "D3MAS1ADØ è un atto di resistenza estetica. Un brand che nasce dall'urgenza di esprimere una visione cruda, urbana e senza compromessi del lusso contemporaneo.",
        "D3MAS1ADØ rappresenta l'unico modo che conosciamo: crudo, urbano, senza compromessi. Non seguiamo tendenze, creiamo codici."
      ],
      en: [
        "D3MAS1ADØ is an act of aesthetic resistance. A brand born from the urgency to express a raw, urban and uncompromising vision of contemporary luxury.",
        "D3MAS1ADØ represents the only way we know: raw, urban, uncompromising. We don't follow trends, we create codes."
      ]
    },
    products: {
      it: [
        "I nostri prodotti sono espressioni di identità, non semplici capi. Ogni pezzo racconta una storia di appartenenza e ribellione.",
        "Le collezioni D3MAS1ADØ sono limitate e curate. Non produciamo in massa, creiamo pezzi che parlano."
      ],
      en: [
        "Our products are expressions of identity, not just garments. Each piece tells a story of belonging and rebellion.",
        "D3MAS1ADØ collections are limited and curated. We don't mass produce, we create pieces that speak."
      ]
    },
    unidad: {
      it: [
        "UNIDAD-31Ø è la nostra familia. Chi veste D3MAS1ADØ non segue il brand, lo incarna. Appartenenza, protezione, silenzio e rivoluzione.",
        "UNIDAD-31Ø non è un fan club, è una familia. Un codice di appartenenza che va oltre il semplice indossare un capo."
      ],
      en: [
        "UNIDAD-31Ø is our familia. Those who wear D3MAS1ADØ don't follow the brand, they embody it. Belonging, protection, silence and revolution.",
        "UNIDAD-31Ø is not a fan club, it's a familia. A code of belonging that goes beyond simply wearing a garment."
      ]
    },
    contact: {
      it: [
        "Puoi contattarci via email a info@demasiadowear.com o shop@demasiadowear.com per questioni relative agli acquisti.",
        "Per qualsiasi domanda, scrivici a info@demasiadowear.com. Siamo anche su Instagram, Facebook e TikTok."
      ],
      en: [
        "You can contact us via email at info@demasiadowear.com or shop@demasiadowear.com for purchase-related questions.",
        "For any questions, write to us at info@demasiadowear.com. We're also on Instagram, Facebook and TikTok."
      ]
    },
    fallback: {
      it: [
        "Interessante prospettiva. D3MAS1ADØ è sempre in evoluzione, proprio come le conversazioni che stimola.",
        "Capisco. D3MAS1ADØ è più di un brand, è un linguaggio visivo che continua a svilupparsi.",
        "Questa è una domanda che merita una risposta più profonda. D3MAS1ADØ esplora costantemente nuovi territori.",
        "D3MAS1ADØ non offre risposte semplici. Preferisce stimolare domande che sfidano lo status quo."
      ],
      en: [
        "Interesting perspective. D3MAS1ADØ is always evolving, just like the conversations it stimulates.",
        "I understand. D3MAS1ADØ is more than a brand, it's a visual language that continues to develop.",
        "That's a question that deserves a deeper answer. D3MAS1ADØ constantly explores new territories.",
        "D3MAS1ADØ doesn't offer simple answers. It prefers to stimulate questions that challenge the status quo."
      ]
    }
  };
  
  /**
   * Inizializza il chatbot
   */
  function init() {
    // Ascolta i cambiamenti di lingua
    document.addEventListener('languageChanged', function(e) {
      currentLanguage = e.detail.language;
      updateChatbotLanguage();
    });
    
    // Rileva la lingua corrente
    currentLanguage = window.D3MASIADO_LANGUAGE ? 
      window.D3MASIADO_LANGUAGE.getCurrentLanguage() : 'it';
    
    // Crea l'interfaccia
    createChatInterface();
    
    console.log('Lana AI Chatbot initialized');
  }
  
  /**
   * Crea l'interfaccia del chatbot
   */
  function createChatInterface() {
    // Container principale
    chatContainer = document.createElement('div');
    chatContainer.className = 'lana-chatbot-container';
    
    // Pulsante di apertura
    chatButton = document.createElement('button');
    chatButton.className = 'lana-chat-button';
    chatButton.innerHTML = `
      <span class="lana-chat-button-text">${getTranslation('lana.open')}</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    `;
    chatButton.addEventListener('click', toggleChat);
    
    // Finestra chat
    chatWindow = document.createElement('div');
    chatWindow.className = 'lana-chat-window';
    chatWindow.style.display = 'none';
    
    // Header
    const chatHeader = document.createElement('div');
    chatHeader.className = 'lana-chat-header';
    chatHeader.innerHTML = `
      <div class="lana-chat-title">Lana AI</div>
      <button class="lana-chat-close">${getTranslation('lana.close')}</button>
    `;
    chatHeader.querySelector('.lana-chat-close').addEventListener('click', toggleChat);
    
    // Container messaggi
    messagesContainer = document.createElement('div');
    messagesContainer.className = 'lana-messages-container';
    
    // Input container
    inputContainer = document.createElement('div');
    inputContainer.className = 'lana-input-container';
    
    // Input messaggio
    messageInput = document.createElement('input');
    messageInput.type = 'text';
    messageInput.className = 'lana-message-input';
    messageInput.placeholder = getTranslation('lana.placeholder');
    messageInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    
    // Pulsante invio
    sendButton = document.createElement('button');
    sendButton.className = 'lana-send-button';
    sendButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    `;
    sendButton.addEventListener('click', sendMessage);
    
    // Assembla l'interfaccia
    inputContainer.appendChild(messageInput);
    inputContainer.appendChild(sendButton);
    
    chatWindow.appendChild(chatHeader);
    chatWindow.appendChild(messagesContainer);
    chatWindow.appendChild(inputContainer);
    
    chatContainer.appendChild(chatButton);
    chatContainer.appendChild(chatWindow);
    
    // Aggiungi al DOM
    document.body.appendChild(chatContainer);
    
    // Aggiungi stili CSS
    addChatbotStyles();
    
    // Mostra messaggio di benvenuto
    setTimeout(function() {
      addMessage('lana', getRandomResponse('welcome'));
    }, 1000);
  }
  
  /**
   * Aggiunge stili CSS per il chatbot
   */
  function addChatbotStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .lana-chatbot-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        font-family: 'Orbitron', sans-serif;
      }
      
      .lana-chat-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${config.backgroundColor};
        color: ${config.iconColor};
        border: 2px solid ${config.iconColor};
        border-radius: 50%;
        width: 60px;
        height: 60px;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
      }
      
      .lana-chat-button:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
      }
      
      .lana-chat-button-text {
        display: none;
      }
      
      .lana-chat-window {
        position: absolute;
        bottom: 80px;
        right: 0;
        width: 350px;
        height: 500px;
        background-color: ${config.backgroundColor};
        border: 2px solid ${config.accentColor};
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
      }
      
      .lana-chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        background-color: ${config.backgroundColor};
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .lana-chat-title {
        color: ${config.accentColor};
        font-weight: bold;
        font-size: 1.2rem;
      }
      
      .lana-chat-close {
        background: none;
        border: none;
        color: ${config.textColor};
        cursor: pointer;
        font-size: 0.9rem;
      }
      
      .lana-messages-container {
        flex: 1;
        padding: 15px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
      }
      
      .lana-message {
        margin-bottom: 15px;
        max-width: 80%;
        padding: 10px 15px;
        border-radius: 15px;
        animation: fadeIn 0.3s ease;
      }
      
      .lana-message-lana {
        align-self: flex-start;
        background-color: rgba(57, 255, 20, 0.1);
        border: 1px solid rgba(57, 255, 20, 0.3);
        color: ${config.textColor};
      }
      
      .lana-message-user {
        align-self: flex-end;
        background-color: rgba(255, 255, 255, 0.1);
        color: ${config.textColor};
      }
      
      .lana-input-container {
        display: flex;
        padding: 15px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .lana-message-input {
        flex: 1;
        padding: 10px 15px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 0.05);
        color: ${config.textColor};
        font-family: inherit;
      }
      
      .lana-message-input:focus {
        outline: none;
        border-color: ${config.accentColor};
      }
      
      .lana-send-button {
        background-color: transparent;
        border: none;
        color: ${config.accentColor};
        margin-left: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @media (max-width: 767px) {
        .lana-chat-window {
          width: 300px;
          height: 450px;
          bottom: 70px;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  /**
   * Apre/chiude la finestra di chat
   */
  function toggleChat() {
    isOpen = !isOpen;
    chatWindow.style.display = isOpen ? 'flex' : 'none';
    
    if (isOpen) {
      messageInput.focus();
    }
  }
  
  /**
   * Invia un messaggio
   */
  function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;
    
    // Aggiungi il messaggio dell'utente
    addMessage('user', message);
    
    // Pulisci l'input
    messageInput.value = '';
    
    // Simula il tempo di risposta
    setTimeout(function() {
      // Genera una risposta
      const response = generateResponse(message);
      addMessage('lana', response);
    }, 1000 + Math.random() * 1000);
  }
  
  /**
   * Aggiunge un messaggio alla chat
   */
  function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.className = `lana-message lana-message-${sender}`;
    messageElement.textContent = text;
    
    messagesContainer.appendChild(messageElement);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  /**
   * Genera una risposta in base al messaggio dell'utente
   */
  function generateResponse(message) {
    message = message.toLowerCase();
    
    // Cerca parole chiave per determinare la categoria
    if (message.includes('brand') || message.includes('d3masiado') || message.includes('demasiadø') || 
        message.includes('chi siete') || message.includes('who are you')) {
      return getRandomResponse('brand');
    }
    
    if (message.includes('prodott') || message.includes('product') || message.includes('felpa') || 
        message.includes('hoodie') || message.includes('collezione') || message.includes('collection')) {
      return getRandomResponse('products');
    }
    
    if (message.includes('unidad') || message.includes('familia') || message.includes('family') || 
        message.includes('31') || message.includes('310')) {
      return getRandomResponse('unidad');
    }
    
    if (message.includes('contatt') || message.includes('contact') || message.includes('email') || 
        message.includes('telefono') || message.includes('phone') || message.includes('social')) {
      return getRandomResponse('contact');
    }
    
    // Fallback per messaggi non riconosciuti
    return getRandomResponse('fallback');
  }
  
  /**
   * Ottiene una risposta casuale dalla categoria specificata
   */
  function getRandomResponse(category) {
    const options = responses[category][currentLanguage];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }
  
  /**
   * Aggiorna la lingua del chatbot
   */
  function updateChatbotLanguage() {
    // Aggiorna i testi dell'interfaccia
    chatButton.querySelector('.lana-chat-button-text').textContent = getTranslation('lana.open');
    chatWindow.querySelector('.lana-chat-close').textContent = getTranslation('lana.close');
    messageInput.placeholder = getTranslation('lana.placeholder');
  }
  
  /**
   * Ottiene una traduzione dal sistema globale
   */
  function getTranslation(key) {
    if (window.D3MASIADO_TRANSLATIONS && 
        window.D3MASIADO_TRANSLATIONS[key] && 
        window.D3MASIADO_TRANSLATIONS[key][currentLanguage]) {
      return window.D3MASIADO_TRANSLATIONS[key][currentLanguage];
    }
    
    // Fallback
    const fallbacks = {
      'lana.open': {it: 'Chat con Lana', en: 'Chat with Lana'},
      'lana.close': {it: 'Chiudi', en: 'Close'},
      'lana.placeholder': {it: 'Scrivi un messaggio...', en: 'Type a message...'},
      'lana.send': {it: 'Invia', en: 'Send'}
    };
    
    return fallbacks[key] ? fallbacks[key][currentLanguage] : key;
  }
  
  // Inizializza il chatbot
  init();
});

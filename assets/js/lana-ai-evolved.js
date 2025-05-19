/**
 * D3MAS1ADØ - Lana AI Chatbot Evoluto
 * 
 * Questo script implementa un chatbot avanzato con supporto multilingua,
 * risposte predefinite e tone of voice coerente con l'identità del brand.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Configurazione Lana AI
  const lanaConfig = {
    chatbotId: 'lana-ai-chatbot',
    defaultLanguage: 'it',
    availableLanguages: ['it', 'en'],
    autoDetectLanguage: true,
    alwaysVisible: true,
    position: 'bottom-right',
    avatarImage: 'images/logo/logo-symbol.png',
    welcomeMessage: {
      it: 'Ciao, sono Lana. Come posso aiutarti oggi?',
      en: 'Hi, I\'m Lana. How can I help you today?'
    },
    placeholderText: {
      it: 'Scrivi un messaggio...',
      en: 'Type a message...'
    },
    sendButtonText: {
      it: 'Invia',
      en: 'Send'
    },
    offlineMessage: {
      it: 'Al momento non sono disponibile. Lascia un messaggio e ti risponderò al più presto.',
      en: 'I\'m currently unavailable. Leave a message and I\'ll get back to you soon.'
    }
  };
  
  // Risposte predefinite
  const predefinedResponses = {
    it: {
      'ciao': 'Ciao, benvenut* nel mondo D3MAS1ADØ. Cosa posso fare per te oggi?',
      'chi sei': 'Sono Lana, l\'intelligenza artificiale di D3MAS1ADØ. Sono qui per guidarti attraverso l\'universo urban-luxury del brand.',
      'aiuto': 'Certo, sono qui per aiutarti. Puoi chiedermi informazioni sui prodotti, sul brand, o su come effettuare un ordine.',
      'prodotti': 'D3MAS1ADØ offre capi urban-luxury di alta qualità. Dai un\'occhiata alla sezione SHOP per scoprire l\'intera collezione.',
      'prezzo': 'I nostri prodotti rappresentano l\'eccellenza dell\'urban-luxury. I prezzi variano in base al capo, visita la sezione SHOP per dettagli specifici.',
      'spedizione': 'Spediamo in tutto il mondo. Le spedizioni in Italia richiedono 2-4 giorni lavorativi, quelle internazionali 5-10 giorni.',
      'resi': 'Accettiamo resi entro 14 giorni dalla consegna. Il capo deve essere nelle condizioni originali con etichette intatte.',
      'taglie': 'Offriamo taglie dalla S alla XXL. Ogni prodotto ha una guida taglie specifica nella sua pagina.',
      'materiali': 'Utilizziamo solo materiali premium, selezionati per qualità e sostenibilità, in linea con la nostra filosofia urban-luxury.',
      'manifesto': 'D3MAS1ADØ rappresenta l\'essenza dell\'urban-luxury multiculturale, un brand che sfida le convenzioni e ridefinisce i confini tra moda, arte e attivismo.',
      'contatti': 'Puoi contattarci via email a info@demasiadowear.com o seguirci sui social @demasiadowear',
      'social': 'Seguici su Instagram, Facebook e TikTok @demasiadowear per le ultime novità e contenuti esclusivi.',
      'grazie': 'Figurati. D3MAS1ADØ è più di un brand, è uno stato mentale. Resta con noi.',
      'default': 'Interessante. D3MAS1ADØ è un universo in continua evoluzione. Posso aiutarti con qualcos\'altro?'
    },
    en: {
      'hello': 'Hello, welcome to the D3MAS1ADØ world. What can I do for you today?',
      'hi': 'Hi there, welcome to D3MAS1ADØ. How can I assist you?',
      'who are you': 'I\'m Lana, D3MAS1ADØ\'s AI assistant. I\'m here to guide you through the brand\'s urban-luxury universe.',
      'help': 'Sure, I\'m here to help. You can ask me about products, the brand, or how to place an order.',
      'products': 'D3MAS1ADØ offers high-quality urban-luxury garments. Check out the SHOP section to discover the entire collection.',
      'price': 'Our products represent the excellence of urban-luxury. Prices vary depending on the item, visit the SHOP section for specific details.',
      'shipping': 'We ship worldwide. Deliveries within Europe take 3-5 business days, international shipments 5-10 days.',
      'returns': 'We accept returns within 14 days of delivery. The item must be in its original condition with tags intact.',
      'sizes': 'We offer sizes from S to XXL. Each product has a specific size guide on its page.',
      'materials': 'We only use premium materials, selected for quality and sustainability, in line with our urban-luxury philosophy.',
      'manifesto': 'D3MAS1ADØ represents the essence of multicultural urban-luxury, a brand that challenges conventions and redefines the boundaries between fashion, art, and activism.',
      'contact': 'You can contact us via email at info@demasiadowear.com or follow us on social media @demasiadowear',
      'social': 'Follow us on Instagram, Facebook, and TikTok @demasiadowear for the latest news and exclusive content.',
      'thanks': 'You\'re welcome. D3MAS1ADØ is more than a brand, it\'s a state of mind. Stay with us.',
      'default': 'Interesting. D3MAS1ADØ is a constantly evolving universe. Can I help you with anything else?'
    }
  };
  
  // Frasi casuali per risposte non trovate
  const randomResponses = {
    it: [
      'Interessante prospettiva. Nel mondo D3MAS1ADØ, ogni visione conta.',
      'Questo è esattamente ciò che ci distingue: pensare oltre i confini.',
      'Urban-luxury significa anche questo: ridefinire continuamente le regole.',
      'La tua domanda riflette perfettamente lo spirito D3MAS1ADØ: mai scontato.',
      'Provocazione e stile. Continua così, sei sulla strada giusta.',
      'D3MAS1ADØ è per chi non si accontenta delle risposte facili.',
      'Mi piace come pensi. Sei decisamente nel posto giusto.',
      'Questa è la mentalità che cerchiamo nella nostra community.',
      'Continua a sfidare lo status quo. È ciò che facciamo ogni giorno.',
      'La tua domanda merita una risposta all\'altezza. Lasciami pensare...'
    ],
    en: [
      'Interesting perspective. In the D3MAS1ADØ world, every vision matters.',
      'This is exactly what sets us apart: thinking beyond boundaries.',
      'Urban-luxury also means this: continuously redefining the rules.',
      'Your question perfectly reflects the D3MAS1ADØ spirit: never predictable.',
      'Provocation and style. Keep it up, you\'re on the right track.',
      'D3MAS1ADØ is for those who don\'t settle for easy answers.',
      'I like how you think. You\'re definitely in the right place.',
      'This is the mindset we look for in our community.',
      'Keep challenging the status quo. It\'s what we do every day.',
      'Your question deserves a worthy answer. Let me think...'
    ]
  };
  
  /**
   * Inizializza Lana AI Chatbot
   */
  function initLanaAI() {
    // Verifica se il chatbot esiste già
    let chatbotContainer = document.getElementById(lanaConfig.chatbotId);
    
    if (!chatbotContainer) {
      // Crea il container del chatbot
      chatbotContainer = createChatbotContainer();
      document.body.appendChild(chatbotContainer);
    }
    
    // Aggiungi stili CSS
    addChatbotStyles();
    
    // Inizializza funzionalità interattive
    initChatbotInteractions(chatbotContainer);
  }
  
  /**
   * Crea il container del chatbot
   */
  function createChatbotContainer() {
    // Determina la lingua corrente
    const currentLanguage = detectUserLanguage();
    
    // Crea il container
    const container = document.createElement('div');
    container.id = lanaConfig.chatbotId;
    container.className = 'lana-chatbot';
    container.dataset.language = currentLanguage;
    
    // Struttura HTML del chatbot
    container.innerHTML = `
      <div class="chatbot-button">
        <img src="${lanaConfig.avatarImage}" alt="Lana AI" class="chatbot-avatar">
      </div>
      <div class="chatbot-panel">
        <div class="chatbot-header">
          <div class="chatbot-title">Lana AI</div>
          <div class="chatbot-controls">
            <button class="language-toggle">${currentLanguage === 'it' ? 'EN' : 'IT'}</button>
            <button class="close-chatbot">&times;</button>
          </div>
        </div>
        <div class="chatbot-messages">
          <div class="message bot-message">
            <div class="message-content">${lanaConfig.welcomeMessage[currentLanguage]}</div>
          </div>
        </div>
        <div class="chatbot-input">
          <input type="text" placeholder="${lanaConfig.placeholderText[currentLanguage]}" class="message-input">
          <button class="send-message">${lanaConfig.sendButtonText[currentLanguage]}</button>
        </div>
      </div>
    `;
    
    return container;
  }
  
  /**
   * Aggiungi stili CSS per il chatbot
   */
  function addChatbotStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .lana-chatbot {
        position: fixed;
        ${lanaConfig.position === 'bottom-right' ? 'bottom: 20px; right: 20px;' : ''}
        ${lanaConfig.position === 'bottom-left' ? 'bottom: 20px; left: 20px;' : ''}
        ${lanaConfig.position === 'top-right' ? 'top: 20px; right: 20px;' : ''}
        ${lanaConfig.position === 'top-left' ? 'top: 20px; left: 20px;' : ''}
        z-index: 1000;
        font-family: 'Arial', sans-serif;
      }
      
      .chatbot-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #000;
        border: 2px solid #39FF14;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .chatbot-button:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(57, 255, 20, 0.3);
      }
      
      .chatbot-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }
      
      .chatbot-panel {
        position: absolute;
        bottom: 70px;
        right: 0;
        width: 320px;
        height: 400px;
        background-color: #111;
        border: 2px solid #39FF14;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
      }
      
      .lana-chatbot.open .chatbot-panel {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      
      .chatbot-header {
        padding: 15px;
        background-color: #000;
        border-bottom: 1px solid #39FF14;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .chatbot-title {
        color: #39FF14;
        font-weight: bold;
        font-family: 'Orbitron', sans-serif;
        font-size: 18px;
      }
      
      .chatbot-controls {
        display: flex;
        gap: 10px;
      }
      
      .language-toggle,
      .close-chatbot {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        transition: color 0.3s ease;
      }
      
      .language-toggle:hover,
      .close-chatbot:hover {
        color: #39FF14;
      }
      
      .close-chatbot {
        font-size: 20px;
      }
      
      .chatbot-messages {
        flex: 1;
        padding: 15px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .message {
        max-width: 80%;
        padding: 10px 15px;
        border-radius: 15px;
        margin-bottom: 5px;
      }
      
      .bot-message {
        align-self: flex-start;
        background-color: #222;
        color: white;
        border-bottom-left-radius: 5px;
      }
      
      .user-message {
        align-self: flex-end;
        background-color: #39FF14;
        color: black;
        border-bottom-right-radius: 5px;
      }
      
      .chatbot-input {
        padding: 15px;
        background-color: #000;
        border-top: 1px solid #39FF14;
        display: flex;
        gap: 10px;
      }
      
      .message-input {
        flex: 1;
        padding: 10px;
        border: 1px solid #333;
        border-radius: 20px;
        background-color: #222;
        color: white;
        outline: none;
      }
      
      .message-input:focus {
        border-color: #39FF14;
      }
      
      .send-message {
        background-color: #39FF14;
        color: black;
        border: none;
        border-radius: 20px;
        padding: 10px 15px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s ease;
      }
      
      .send-message:hover {
        background-color: #2be010;
      }
      
      /* Animazioni */
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      
      .chatbot-button.pulse {
        animation: pulse 1.5s infinite;
      }
      
      /* Responsive */
      @media (max-width: 480px) {
        .chatbot-panel {
          width: 280px;
          height: 350px;
          bottom: 60px;
        }
      }
    `;
    
    document.head.appendChild(style);
  }
  
  /**
   * Inizializza le interazioni del chatbot
   */
  function initChatbotInteractions(container) {
    const chatbotButton = container.querySelector('.chatbot-button');
    const closeButton = container.querySelector('.close-chatbot');
    const languageToggle = container.querySelector('.language-toggle');
    const messageInput = container.querySelector('.message-input');
    const sendButton = container.querySelector('.send-message');
    const messagesContainer = container.querySelector('.chatbot-messages');
    
    // Apri/chiudi chatbot
    chatbotButton.addEventListener('click', function() {
      container.classList.toggle('open');
      chatbotButton.classList.remove('pulse');
      
      // Scroll to bottom
      if (container.classList.contains('open')) {
        scrollToBottom(messagesContainer);
        messageInput.focus();
      }
    });
    
    closeButton.addEventListener('click', function() {
      container.classList.remove('open');
    });
    
    // Toggle lingua
    languageToggle.addEventListener('click', function() {
      const currentLanguage = container.dataset.language;
      const newLanguage = currentLanguage === 'it' ? 'en' : 'it';
      
      // Aggiorna lingua
      container.dataset.language = newLanguage;
      languageToggle.textContent = newLanguage === 'it' ? 'EN' : 'IT';
      
      // Aggiorna placeholder e testo pulsante
      messageInput.placeholder = lanaConfig.placeholderText[newLanguage];
      sendButton.textContent = lanaConfig.sendButtonText[newLanguage];
      
      // Aggiungi messaggio di cambio lingua
      const changeMessage = newLanguage === 'it' 
        ? 'Ho cambiato la lingua in Italiano.'
        : 'I\'ve changed the language to English.';
      
      addBotMessage(messagesContainer, changeMessage);
    });
    
    // Invia messaggio
    function sendMessage() {
      const message = messageInput.value.trim();
      if (message === '') return;
      
      // Aggiungi messaggio utente
      addUserMessage(messagesContainer, message);
      
      // Pulisci input
      messageInput.value = '';
      
      // Genera risposta
      setTimeout(() => {
        const response = generateResponse(message, container.dataset.language);
        addBotMessage(messagesContainer, response);
        
        // Animazione pulsante se chatbot è chiuso
        if (!container.classList.contains('open')) {
          chatbotButton.classList.add('pulse');
        }
      }, 500 + Math.random() * 1000); // Ritardo casuale per simulare digitazione
    }
    
    sendButton.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    
    // Attiva pulsante pulsante dopo 5 secondi
    setTimeout(() => {
      if (!container.classList.contains('open')) {
        chatbotButton.classList.add('pulse');
      }
    }, 5000);
  }
  
  /**
   * Aggiungi messaggio utente
   */
  function addUserMessage(container, message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message user-message';
    messageElement.innerHTML = `<div class="message-content">${escapeHTML(message)}</div>`;
    
    container.appendChild(messageElement);
    scrollToBottom(container);
  }
  
  /**
   * Aggiungi messaggio bot
   */
  function addBotMessage(container, message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message bot-message';
    messageElement.innerHTML = `<div class="message-content">${message}</div>`;
    
    container.appendChild(messageElement);
    scrollToBottom(container);
  }
  
  /**
   * Genera risposta in base al messaggio e alla lingua
   */
  function generateResponse(message, language) {
    // Converti in minuscolo per il matching
    const lowerMessage = message.toLowerCase();
    
    // Cerca nelle risposte predefinite
    const responses = predefinedResponses[language];
    
    // Cerca corrispondenza esatta
    if (responses[lowerMessage]) {
      return responses[lowerMessage];
    }
    
    // Cerca corrispondenza parziale
    for (const key in responses) {
      if (lowerMessage.includes(key)) {
        return responses[key];
      }
    }
    
    // Risposta casuale se non trovata
    const randomIndex = Math.floor(Math.random() * randomResponses[language].length);
    return randomResponses[language][randomIndex];
  }
  
  /**
   * Rileva lingua utente
   */
  function detectUserLanguage() {
    if (!lanaConfig.autoDetectLanguage) {
      return lanaConfig.defaultLanguage;
    }
    
    // Controlla lingua browser
    const browserLang = navigator.language || navigator.userLanguage;
    
    if (browserLang.startsWith('it')) {
      return 'it';
    }
    
    // Fallback a inglese per tutte le altre lingue
    return 'en';
  }
  
  /**
   * Scroll alla fine dei messaggi
   */
  function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
  }
  
  /**
   * Escape HTML per sicurezza
   */
  function escapeHTML(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  
  // Inizializza Lana AI
  initLanaAI();
  
  // Esponi API pubblica
  window.LANA_AI = {
    open: function() {
      const chatbot = document.getElementById(lanaConfig.chatbotId);
      if (chatbot) {
        chatbot.classList.add('open');
      }
    },
    close: function() {
      const chatbot = document.getElementById(lanaConfig.chatbotId);
      if (chatbot) {
        chatbot.classList.remove('open');
      }
    },
    setLanguage: function(language) {
      if (lanaConfig.availableLanguages.includes(language)) {
        const chatbot = document.getElementById(lanaConfig.chatbotId);
        if (chatbot) {
          chatbot.dataset.language = language;
          const languageToggle = chatbot.querySelector('.language-toggle');
          if (languageToggle) {
            languageToggle.textContent = language === 'it' ? 'EN' : 'IT';
          }
          
          const messageInput = chatbot.querySelector('.message-input');
          if (messageInput) {
            messageInput.placeholder = lanaConfig.placeholderText[language];
          }
          
          const sendButton = chatbot.querySelector('.send-message');
          if (sendButton) {
            sendButton.textContent = lanaConfig.sendButtonText[language];
          }
        }
      }
    }
  };
});

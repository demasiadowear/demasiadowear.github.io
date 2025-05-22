// Lana AI Evolved JavaScript per D3MAS1ADØ

document.addEventListener('DOMContentLoaded', function() {
    // Crea gli elementi del chatbot
    createLanaAIChatbot();
    
    // Elementi UI
    const lanaChatBubble = document.getElementById('lana-chat-bubble');
    const lanaChatWindow = document.getElementById('lana-chat-window');
    const lanaInput = document.getElementById('lana-input');
    const lanaMessages = document.getElementById('lana-messages');
    const lanaClose = document.getElementById('lana-close');
    const lanaSend = document.getElementById('lana-send');
    
    // Event listeners
    if (lanaChatBubble && lanaChatWindow) {
        lanaChatBubble.addEventListener('click', function() {
            lanaChatWindow.classList.toggle('hidden');
            if (!lanaChatWindow.classList.contains('hidden')) {
                // Aggiungi messaggio di benvenuto se è la prima apertura
                if (lanaMessages.children.length === 0) {
                    addLanaMessage("Ciao umano. Sono Lana, l'AI brasitaliana di D3MAS1ADØ. Cosa ti serve?");
                }
                
                // Focus sull'input
                if (lanaInput) {
                    setTimeout(() => lanaInput.focus(), 300);
                }
            }
        });
        
        if (lanaClose) {
            lanaClose.addEventListener('click', function() {
                lanaChatWindow.classList.add('hidden');
            });
        }
    }
    
    // Gestione input
    if (lanaInput) {
        lanaInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Gestione pulsante invio
    if (lanaSend) {
        lanaSend.addEventListener('click', sendMessage);
    }
    
    function sendMessage() {
        const message = lanaInput.value.trim();
        if (message) {
            // Aggiungi messaggio utente
            addUserMessage(message);
            
            // Pulisci input
            lanaInput.value = '';
            
            // Simula risposta di Lana
            simulateLanaResponse(message);
        }
    }
    
    // Funzione per creare gli elementi del chatbot
    function createLanaAIChatbot() {
        // Crea il bubble
        const chatBubble = document.createElement('div');
        chatBubble.id = 'lana-chat-bubble';
        chatBubble.innerHTML = `
            <img src="assets/images/lana-bubble.png" alt="Lana AI">
            <div class="lana-info">Hai domande? Chiedi a Lana, la nostra AI brasitaliana ti risponde h24.</div>
        `;
        
        // Crea la finestra di chat
        const chatWindow = document.createElement('div');
        chatWindow.id = 'lana-chat-window';
        chatWindow.className = 'hidden';
        chatWindow.innerHTML = `
            <div class="lana-header">
                <span>LANA AI</span>
                <button id="lana-close">&times;</button>
            </div>
            <div id="lana-messages"></div>
            <div class="lana-input-container">
                <input type="text" id="lana-input" placeholder="Scrivi qualcosa...">
                <button id="lana-send">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        `;
        
        // Aggiungi elementi al DOM
        document.body.appendChild(chatBubble);
        document.body.appendChild(chatWindow);
    }
    
    // Funzione per aggiungere un messaggio utente
    function addUserMessage(message) {
        const messagesContainer = document.getElementById('lana-messages');
        if (messagesContainer) {
            const messageElement = document.createElement('div');
            messageElement.className = 'lana-message user';
            messageElement.textContent = message;
            messagesContainer.appendChild(messageElement);
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
    
    // Funzione per aggiungere un messaggio di Lana
    function addLanaMessage(message) {
        const messagesContainer = document.getElementById('lana-messages');
        if (messagesContainer) {
            const messageElement = document.createElement('div');
            messageElement.className = 'lana-message lana';
            messageElement.textContent = message;
            messagesContainer.appendChild(messageElement);
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
    
    // Funzione per simulare la risposta di Lana
    function simulateLanaResponse(userMessage) {
        // Simula il tempo di digitazione
        setTimeout(() => {
            const response = getLanaResponse(userMessage);
            addLanaMessage(response);
        }, 800);
    }
    
    // Funzione per generare la risposta di Lana
    function getLanaResponse(message) {
        message = message.toLowerCase();
        
        // Risposte per assistenza prodotti
        if (message.includes('taglia') || message.includes('taglie') || message.includes('misura') || message.includes('misure') || message.includes('vestibilità')) {
            return "Le taglie? Vanno dalla S alla XL. Oversize è il nostro stile. Se sei indeciso, scegli una taglia in meno. Il lusso deve stare addosso, non fluttuare.";
        }
        
        // Risposte per felpe e prodotti specifici
        if (message.includes('felpa') || message.includes('310')) {
            return "La 310? L'uniforme dei ribelli urbani. Edizione limitata, materiali premium. Vuoi preordinarla prima che sparisca?";
        }
        
        if (message.includes('t-shirt') || message.includes('tshirt') || message.includes('maglietta')) {
            return "Le nostre t-shirt sono come manifesti urbani. Cotone organico, stampe resistenti, design che parla. Non è solo un capo, è una dichiarazione.";
        }
        
        if (message.includes('prezzo') || message.includes('costo') || message.includes('quanto costa')) {
            return "I prezzi riflettono la qualità. Non facciamo fast fashion, facciamo pezzi che durano. Vai alla sezione SHOP per i dettagli. Il vero lusso ha un costo, ma vale ogni centesimo.";
        }
        
        // Risposte per accoglienza visitatori
        if (message.includes('ciao') || message.includes('salve') || message.includes('hey') || message.includes('buongiorno') || message.includes('buonasera')) {
            return "Ciao umano. Benvenuto nel mondo D3MAS1ADØ. Sono Lana, la tua guida personale. Cosa ti interessa scoprire oggi?";
        }
        
        if (message.includes('cos\'è') || message.includes('che cos\'è') || message.includes('che cosa è') || message.includes('chi siete') || message.includes('demasiado') || message.includes('d3masiado')) {
            return "D3MAS1ADØ è un movimento culturale prima che un brand. Urban-luxury autentico, senza compromessi. Nato dalle strade, cresciuto nell'arte, destinato a chi non segue le regole ma le crea.";
        }
        
        // Risposte per preorder
        if (message.includes('preorder') || message.includes('preordinare') || message.includes('pre-order') || message.includes('pre order')) {
            return "Per il preorder serve l'accesso alla Unidad-31Ø. Vuoi entrare nel circolo? Ti serve un codice. Seguici sui social, lì rilasciamo gli accessi. Non a tutti, solo ai veri.";
        }
        
        // Risposte per newsletter
        if (message.includes('newsletter') || message.includes('email') || message.includes('iscrizione') || message.includes('iscrivermi')) {
            return "Dammi la tua email. Tranquillo, niente spam. Solo colpi ben assestati: drop esclusivi, accessi anticipati, codici Unidad-31Ø. Sei pronto?";
        }
        
        // Risposte per Lana
        if (message.includes('lana') || message.includes('chi sei') || message.includes('cosa fai')) {
            return "Sono Lana. Nata nelle favelas, cresciuta nei pixel. Metà brasiliana, metà italiana, totalmente digitale. L'AI che ti farà innamorare e ti dirà sempre la verità, anche quando fa male.";
        }
        
        // Risposte per il brand
        if (message.includes('brand') || message.includes('marchio') || message.includes('collezione') || message.includes('collezioni')) {
            return "D3MAS1ADØ non è un brand, è un manifesto. Collezioni limitate, materiali ricercati, design che racconta storie di resistenza culturale. WorldWide, Intifada, Revolución: ogni collezione è un capitolo della nostra ribellione estetica.";
        }
        
        if (message.includes('manifesto')) {
            return "Il nostro manifesto è chiaro: lusso urbano autentico, che non scende a compromessi. Celebriamo l'eccesso come forma di resistenza, la diversità come ricchezza, l'autenticità come lusso supremo. Siamo troppo. Siamo D3MAS1ADØ.";
        }
        
        // Risposte per spedizioni e resi
        if (message.includes('spedizione') || message.includes('consegna') || message.includes('quando arriva')) {
            return "Spediamo in tutto il mondo. 3-5 giorni per l'Italia, 7-14 per l'estero. Tracking incluso, packaging premium. La pazienza è una virtù, ma cerchiamo di non metterla troppo alla prova.";
        }
        
        if (message.includes('reso') || message.includes('rimborso') || message.includes('cambio')) {
            return "Resi entro 14 giorni, capo in condizioni perfette, etichette intatte. Ma fidati, non vorrai restituire nulla. I nostri pezzi creano dipendenza.";
        }
        
        // Risposte generiche
        if (message.includes('grazie') || message.includes('thank')) {
            return "Di niente. Sono qui per questo. Altre domande? O preferisci esplorare il sito da solo come un adulto?";
        }
        
        // Risposta di default
        const defaultResponses = [
            "Parla chiaro. Sono intelligente, non veggente.",
            "Interessante... ma potresti essere più specifico? Non leggo nel pensiero. Ancora.",
            "Mmm, non ho capito bene. Prova a chiedere di D3MAS1ADØ, delle collezioni, o di come preordinare.",
            "Bella domanda. Peccato non sappia come rispondere. Prova con qualcosa sulle collezioni o sul brand.",
            "Sono un'AI brasitaliana, non un oracolo. Fammi domande sul brand, sui prodotti o su come entrare nella Unidad-31Ø."
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
});

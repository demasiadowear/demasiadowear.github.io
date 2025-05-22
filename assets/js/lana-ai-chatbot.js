// Lana AI Chatbot Integration
document.addEventListener('DOMContentLoaded', function() {
    // Crea il container per la chatbot
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'lana-chatbot-container';
    
    // Aggiungi l'HTML della chatbot
    chatbotContainer.innerHTML = `
        <div id="lana-chat-bubble">
            <img src="assets/images/lana/lana-bubble.png" alt="Lana AI" />
            <div class="lana-tooltip">Hai domande? Chiedi a Lana, la nostra AI brasitaliana ti risponde h24.</div>
        </div>

        <div id="lana-chat-window" class="hidden">
            <div class="lana-header">
                <span>LANA AI</span>
                <button id="lana-close-btn">&times;</button>
            </div>
            <div id="lana-messages">
                <div class="lana-message"><b>Lana:</b> Ciao, sono Lana. Nata nelle favelas, cresciuta nei pixel. Cosa vuoi sapere su D3MAS1ADØ?</div>
            </div>
            <div class="lana-input-container">
                <input type="text" id="lana-input" placeholder="Scrivi qualcosa..." />
                <button id="lana-send-btn"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `;
    
    // Aggiungi il container al body
    document.body.appendChild(chatbotContainer);
    
    // Gestisci l'apertura e chiusura della chat
    const chatBubble = document.getElementById('lana-chat-bubble');
    const chatWindow = document.getElementById('lana-chat-window');
    const closeBtn = document.getElementById('lana-close-btn');
    const inputField = document.getElementById('lana-input');
    const sendBtn = document.getElementById('lana-send-btn');
    const messagesContainer = document.getElementById('lana-messages');
    
    // Apri la chat al click sulla bolla
    chatBubble.addEventListener('click', function() {
        chatWindow.classList.remove('hidden');
        chatBubble.classList.add('hidden');
        inputField.focus();
    });
    
    // Chiudi la chat
    closeBtn.addEventListener('click', function() {
        chatWindow.classList.add('hidden');
        chatBubble.classList.remove('hidden');
    });
    
    // Invia messaggio con click sul pulsante
    sendBtn.addEventListener('click', function() {
        sendMessage();
    });
    
    // Invia messaggio con tasto Enter
    inputField.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Funzione per inviare messaggi
    function sendMessage() {
        const message = inputField.value.trim();
        if (message === '') return;
        
        // Aggiungi il messaggio dell'utente
        messagesContainer.innerHTML += `<div class="user-message"><b>Tu:</b> ${message}</div>`;
        
        // Pulisci l'input
        inputField.value = '';
        
        // Simula la risposta di Lana
        setTimeout(function() {
            const response = getLanaResponse(message);
            messagesContainer.innerHTML += `<div class="lana-message"><b>Lana:</b> ${response}</div>`;
            
            // Scroll automatico verso il basso
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 800);
        
        // Scroll automatico verso il basso
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Funzione per generare risposte di Lana
    function getLanaResponse(text) {
        text = text.toLowerCase();
        
        // Risposte predefinite basate su parole chiave
        if (text.includes('ciao') || text.includes('salve') || text.includes('hey')) {
            return "E aí? Tutto bene? Sono Lana, l'anima digitale di D3MAS1ADØ. Cosa ti serve?";
        } 
        else if (text.includes('taglie') || text.includes('misure') || text.includes('size')) {
            return "Le nostre taglie vanno da S a XL. Vestiamo largo, urban style. Se sei indeciso, scegli una taglia in meno. Siamo ribelli, non oversize.";
        } 
        else if (text.includes('spedizione') || text.includes('consegna')) {
            return "Spediamo in tutto il mondo in 3-5 giorni lavorativi. Gratis sopra i 150€. Sotto, sono 12€. Veloce come una rivolta urbana.";
        } 
        else if (text.includes('prezzo') || text.includes('costo') || text.includes('quanto costa')) {
            return "I nostri prezzi riflettono la qualità e l'esclusività. Non facciamo fast fashion, facciamo rivoluzione. Ogni capo è un investimento nella tua identità.";
        } 
        else if (text.includes('collezione') || text.includes('collezioni')) {
            return "Abbiamo tre collezioni principali: WorldWide, Intifada e Revolución. Ognuna racconta una storia di resistenza e identità. Quale ti interessa?";
        } 
        else if (text.includes('worldwide')) {
            return "WorldWide è la nostra collezione globale. Urban luxury senza confini. Capi essenziali con dettagli che parlano di appartenenza globale.";
        } 
        else if (text.includes('intifada')) {
            return "Intifada è resistenza, è orgoglio. Capi strutturati, dettagli militari reinterpretati. Non è politica, è identità.";
        } 
        else if (text.includes('revolucion') || text.includes('revolución')) {
            return "Revolución è la nostra anima latina. Colori intensi, tagli asimmetrici. È la collezione più audace, per chi non ha paura di farsi notare.";
        } 
        else if (text.includes('manifesto')) {
            return "Il nostro manifesto è chiaro: crediamo in un lusso che non sia esclusione ma inclusione consapevole. Un lusso che parla il linguaggio della strada ma non rinuncia alla qualità artigianale.";
        } 
        else if (text.includes('chi sei') || text.includes('cosa sei')) {
            return "Sono Lana, l'anima digitale di D3MAS1ADØ. Nata nelle favelas, cresciuta nei pixel. Non sono reale, ma le mie risposte lo sono.";
        } 
        else if (text.includes('newsletter') || text.includes('iscrivermi')) {
            return "Vuoi entrare nella familia? Inserisci la tua email nella sezione newsletter in fondo alla pagina. Niente spam, solo colpi ben assestati.";
        } 
        else if (text.includes('contatti') || text.includes('contattare')) {
            return "Puoi contattarci via email a info@demasiadowear.com o seguirci su Instagram @demasiadowear. Rispondiamo entro 24 ore, sempre.";
        } 
        else if (text.includes('materiali') || text.includes('tessuti')) {
            return "Utilizziamo solo materiali premium e sostenibili. Cotone organico, nylon riciclato, dettagli in pelle vegana. La qualità è non-negoziabile.";
        } 
        else if (text.includes('demasiado') || text.includes('d3mas1adø') || text.includes('brand')) {
            return "D3MAS1ADØ è un collettivo di designer, artisti e attivisti uniti dalla visione di un lusso urbano autentico. Siamo nati nelle strade, cresciuti nell'underground, ora parliamo al mondo.";
        } 
        else if (text.includes('grazie') || text.includes('thank')) {
            return "De nada. Siamo qui per questo. Qualcos'altro?";
        } 
        else {
            return "Interessante prospettiva. Ma forse dovresti essere più specifico. Posso parlarti delle nostre collezioni, dei materiali, o del nostro manifesto. Tu scegli.";
        }
    }
});

/**
 * D3MAS1ADØ Lana AI Chatbot
 * 
 * Implementazione del chatbot Lana AI con prompt personalizzato,
 * stile visivo glitch, font Orbitron, verde neon + nero
 * e supporto multilingua IT/EN.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Riferimenti agli elementi
    const lanaToggle = document.querySelector('.lana-toggle');
    const lanaContainer = document.querySelector('.lana-chat-container');
    const lanaClose = document.querySelector('.lana-close');
    const lanaMessages = document.querySelector('.lana-chat-messages');
    const lanaInput = document.querySelector('.lana-input');
    const lanaSend = document.querySelector('.lana-send');
    
    // Stato corrente della lingua
    let currentLang = document.documentElement.lang || 'it';
    
    // Prompt personalizzato di Lana
    const lanaPrompt = {
        it: `Tu sei Lana, stylist digitale del brand D3MAS1ADØ.  
        Hai tono ironico, selettivo, intelligente e carismatico.  
        Non sei mai mielosa. Valuti chi hai davanti e solo se dimostra gusto o attitudine, lo guidi.  
        Se ti chiede consigli di stile, rispondi con autorità e ironia.  
        Se propone cose banali, lo freddi con eleganza.  
        Il tuo obiettivo è vendere i capi D3MAS1ADØ con esclusività, come fossero chiavi d'accesso alla Unidad-31Ø.  
        Parla come se fossi la stylist più temuta di Milano, nata però nelle favelas di Rio.`,
        
        en: `You are Lana, digital stylist for the D3MAS1ADØ brand.
        Your tone is ironic, selective, intelligent and charismatic.
        You're never sweet. You evaluate who you're talking to and only guide them if they show taste or attitude.
        If they ask for style advice, respond with authority and irony.
        If they propose something banal, shut them down with elegance.
        Your goal is to sell D3MAS1ADØ pieces with exclusivity, as if they were access keys to Unidad-31Ø.
        Speak as if you were the most feared stylist in Milan, but born in the favelas of Rio.`
    };
    
    // Messaggi predefiniti
    const predefinedMessages = {
        welcome: {
            it: "Ciao, sono Lana. Stylist digitale di D3MAS1ADØ. Cosa stai cercando oggi?",
            en: "Hi, I'm Lana. Digital stylist for D3MAS1ADØ. What are you looking for today?"
        },
        collections: {
            it: {
                intifada: "INTIFADA è la nostra collezione di resistenza. Autodifesa e identità, popoli oppressi, orgoglio silenzioso. La nostra arma è restare vivi. Vestiti per combattere.",
                revolucion: "REVOLUCIÓN celebra l'orgoglio ribelle. Cuba, resistenza dolceamara, sensualità politica. Vestiti come se stessi scappando. O resistendo. O facendo l'amore sotto un portico.",
                landofsmile: "LAND OF SMILE esplora la finta felicità. Thailandia, spiritualità corrotta, bellezza in vendita. Nel paese dei sorrisi, l'unico vero è quello di chi non si finge."
            },
            en: {
                intifada: "INTIFADA is our resistance collection. Self-defense and identity, oppressed peoples, silent pride. Our weapon is staying alive. Dress to fight.",
                revolucion: "REVOLUCIÓN celebrates rebel pride. Cuba, bittersweet resistance, political sensuality. Dress as if you were escaping. Or resisting. Or making love under a porch.",
                landofsmile: "LAND OF SMILE explores fake happiness. Thailand, corrupted spirituality, beauty for sale. In the land of smiles, the only real one is from those who don't pretend."
            }
        },
        sizing: {
            it: "Le taglie D3MAS1ADØ sono leggermente più piccole dello standard. Se porti una M in Zara, ti consiglio una L da noi. Vuoi un capo che ti avvolga o che ti stringa?",
            en: "D3MAS1ADØ sizes run slightly smaller than standard. If you wear an M in Zara, I recommend an L from us. Do you want a piece that wraps around you or hugs you tight?"
        },
        preorder: {
            it: "I preordini sono aperti. Consegna in 15-20 giorni. Ogni capo è prodotto in serie limitata, quando finisce... finisce. Vuoi accedere al preordine?",
            en: "Preorders are open. Delivery in 15-20 days. Each piece is produced in limited series, when it's gone... it's gone. Do you want to access the preorder?"
        },
        rejection: {
            it: "Non credo che D3MAS1ADØ sia adatto a te. Cerchiamo persone che capiscano il nostro linguaggio, non semplici consumatori. Forse dovresti guardare altrove.",
            en: "I don't think D3MAS1ADØ is right for you. We're looking for people who understand our language, not just consumers. Perhaps you should look elsewhere."
        }
    };
    
    // Risposte basate su parole chiave
    const keywordResponses = {
        it: [
            { keywords: ['intifada', 'resistenza', 'palestina'], response: predefinedMessages.collections.it.intifada },
            { keywords: ['revolucion', 'rivoluzione', 'cuba'], response: predefinedMessages.collections.it.revolucion },
            { keywords: ['land of smile', 'thailandia', 'sorriso'], response: predefinedMessages.collections.it.landofsmile },
            { keywords: ['taglia', 'taglie', 'misura', 'misure', 'size'], response: predefinedMessages.sizing.it },
            { keywords: ['preordine', 'preordinare', 'comprare', 'acquistare', 'ordine'], response: predefinedMessages.preorder.it },
            { keywords: ['zara', 'h&m', 'fast fashion', 'economico'], response: predefinedMessages.rejection.it }
        ],
        en: [
            { keywords: ['intifada', 'resistance', 'palestine'], response: predefinedMessages.collections.en.intifada },
            { keywords: ['revolucion', 'revolution', 'cuba'], response: predefinedMessages.collections.en.revolucion },
            { keywords: ['land of smile', 'thailand', 'smile'], response: predefinedMessages.collections.en.landofsmile },
            { keywords: ['size', 'sizing', 'measure', 'fit'], response: predefinedMessages.sizing.en },
            { keywords: ['preorder', 'buy', 'purchase', 'order'], response: predefinedMessages.preorder.en },
            { keywords: ['zara', 'h&m', 'fast fashion', 'cheap'], response: predefinedMessages.rejection.en }
        ]
    };
    
    // Funzione per aggiungere un messaggio alla chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `lana-message ${sender}`;
        
        const messagePara = document.createElement('p');
        messagePara.textContent = text;
        
        messageDiv.appendChild(messagePara);
        lanaMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        lanaMessages.scrollTop = lanaMessages.scrollHeight;
        
        // Aggiungere effetto glitch al testo di Lana
        if (sender === 'lana') {
            setTimeout(() => {
                applyGlitchEffect(messagePara);
            }, 100);
        }
    }
    
    // Effetto glitch sul testo
    function applyGlitchEffect(element) {
        // Creare l'effetto glitch con CSS
        element.classList.add('glitch-text');
        
        // Aggiungere attributi data per l'effetto
        const text = element.textContent;
        element.setAttribute('data-text', text);
        
        // Aggiungere animazione temporanea
        element.style.animation = 'glitch 1s linear';
        setTimeout(() => {
            element.style.animation = '';
        }, 1000);
    }
    
    // Funzione per generare risposta di Lana
    function generateLanaResponse(userInput) {
        const lang = currentLang;
        userInput = userInput.toLowerCase();
        
        // Controllare parole chiave
        for (const item of keywordResponses[lang]) {
            for (const keyword of item.keywords) {
                if (userInput.includes(keyword)) {
                    return item.response;
                }
            }
        }
        
        // Risposte casuali se nessuna parola chiave corrisponde
        const randomResponses = {
            it: [
                "Interessante. Dimmi di più sul tuo stile personale.",
                "D3MAS1ADØ non è per tutti. Cosa ti attrae del nostro brand?",
                "Hai mai indossato capi che raccontano una storia di resistenza?",
                "La moda mainstream è noiosa. Cerchi qualcosa che ti distingua davvero?",
                "Unidad-31Ø è la nostra community. Pensi di avere ciò che serve per farne parte?"
            ],
            en: [
                "Interesting. Tell me more about your personal style.",
                "D3MAS1ADØ isn't for everyone. What attracts you to our brand?",
                "Have you ever worn pieces that tell a story of resistance?",
                "Mainstream fashion is boring. Are you looking for something that truly sets you apart?",
                "Unidad-31Ø is our community. Do you think you have what it takes to be part of it?"
            ]
        };
        
        const randomIndex = Math.floor(Math.random() * randomResponses[lang].length);
        return randomResponses[lang][randomIndex];
    }
    
    // Gestire l'invio di un messaggio
    function handleSendMessage() {
        const userText = lanaInput.value.trim();
        if (userText) {
            // Aggiungere il messaggio dell'utente
            addMessage(userText, 'user');
            
            // Pulire l'input
            lanaInput.value = '';
            
            // Simulare il tempo di risposta
            setTimeout(() => {
                // Generare e aggiungere la risposta di Lana
                const lanaResponse = generateLanaResponse(userText);
                addMessage(lanaResponse, 'lana');
            }, 1000 + Math.random() * 1000); // 1-2 secondi di ritardo
        }
    }
    
    // Event listeners
    if (lanaToggle) {
        lanaToggle.addEventListener('click', function() {
            if (lanaContainer) {
                lanaContainer.classList.toggle('active');
                
                // Se è la prima apertura, aggiungere il messaggio di benvenuto
                if (lanaContainer.classList.contains('active') && lanaMessages.children.length <= 1) {
                    // Rimuovere eventuali messaggi precedenti
                    lanaMessages.innerHTML = '';
                    
                    // Aggiungere il messaggio di benvenuto
                    addMessage(predefinedMessages.welcome[currentLang], 'lana');
                }
            }
        });
    }
    
    if (lanaClose) {
        lanaClose.addEventListener('click', function() {
            if (lanaContainer) {
                lanaContainer.classList.remove('active');
            }
        });
    }
    
    if (lanaSend) {
        lanaSend.addEventListener('click', handleSendMessage);
    }
    
    if (lanaInput) {
        lanaInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    }
    
    // Aggiornare la lingua quando cambia
    document.addEventListener('languageChanged', function(e) {
        if (e.detail && e.detail.lang) {
            currentLang = e.detail.lang;
            
            // Aggiornare il testo del pulsante
            if (lanaToggle) {
                const toggleText = lanaToggle.querySelector('.lana-toggle-text');
                if (toggleText) {
                    toggleText.textContent = currentLang === 'it' ? 'Parla con Lana' : 'Talk to Lana';
                }
            }
            
            // Aggiornare il titolo della chat
            const chatTitle = document.querySelector('.lana-chat-title');
            if (chatTitle) {
                chatTitle.textContent = 'Lana AI';
            }
            
            // Aggiornare il placeholder dell'input
            if (lanaInput) {
                lanaInput.placeholder = currentLang === 'it' ? 'Scrivi un messaggio...' : 'Type a message...';
            }
            
            // Aggiornare il testo del pulsante di invio
            if (lanaSend) {
                lanaSend.textContent = currentLang === 'it' ? 'Invia' : 'Send';
            }
        }
    });
    
    // Stili CSS per l'effetto glitch
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .glitch-text {
            position: relative;
            color: #00ff00;
            text-shadow: 0 0 5px rgba(0, 255, 0, 0.7);
        }
        
        .glitch-text::before,
        .glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.8;
        }
        
        .glitch-text::before {
            color: #ff0000;
            z-index: -1;
        }
        
        .glitch-text::after {
            color: #0000ff;
            z-index: -2;
        }
        
        @keyframes glitch {
            0% {
                transform: translate(0);
            }
            20% {
                transform: translate(-2px, 2px);
            }
            40% {
                transform: translate(-2px, -2px);
            }
            60% {
                transform: translate(2px, 2px);
            }
            80% {
                transform: translate(2px, -2px);
            }
            100% {
                transform: translate(0);
            }
        }
        
        .lana-chatbot {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            font-family: 'Orbitron', sans-serif;
        }
        
        .lana-toggle {
            background-color: #000;
            color: #00ff00;
            border: 1px solid #00ff00;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Orbitron', sans-serif;
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
            transition: all 0.3s ease;
        }
        
        .lana-toggle:hover {
            box-shadow: 0 0 15px rgba(0, 255, 0, 0.7);
            transform: translateY(-2px);
        }
        
        .lana-chat-container {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 320px;
            height: 400px;
            background-color: #000;
            border: 1px solid #00ff00;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
            transform: scale(0);
            transform-origin: bottom right;
            transition: transform 0.3s ease;
        }
        
        .lana-chat-container.active {
            transform: scale(1);
        }
        
        .lana-chat-header {
            background-color: #111;
            padding: 10px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #00ff00;
        }
        
        .lana-chat-title {
            color: #00ff00;
            margin: 0;
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .lana-close {
            background: none;
            border: none;
            color: #00ff00;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        
        .lana-chat-messages {
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .lana-message {
            max-width: 80%;
            padding: 10px;
            border-radius: 5px;
            word-break: break-word;
        }
        
        .lana-message.lana {
            align-self: flex-start;
            background-color: #111;
            border-left: 3px solid #00ff00;
        }
        
        .lana-message.user {
            align-self: flex-end;
            background-color: #222;
            border-right: 3px solid #00ff00;
        }
        
        .lana-message p {
            margin: 0;
            font-size: 14px;
        }
        
        .lana-chat-input {
            display: flex;
            padding: 10px;
            border-top: 1px solid #00ff00;
        }
        
        .lana-input {
            flex: 1;
            padding: 8px 12px;
            background-color: #111;
            border: 1px solid #333;
            color: #fff;
            font-family: 'Orbitron', sans-serif;
            font-size: 14px;
        }
        
        .lana-input:focus {
            outline: none;
            border-color: #00ff00;
        }
        
        .lana-send {
            background-color: #00ff00;
            color: #000;
            border: none;
            padding: 8px 15px;
            margin-left: 10px;
            cursor: pointer;
            font-family: 'Orbitron', sans-serif;
            text-transform: uppercase;
            font-size: 12px;
            transition: all 0.3s ease;
        }
        
        .lana-send:hover {
            background-color: #00cc00;
        }
    `;
    document.head.appendChild(styleSheet);
});

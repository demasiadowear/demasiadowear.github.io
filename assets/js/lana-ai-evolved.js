/**
 * D3MAS1ADØ - Lana AI Chatbot
 * 
 * Implementazione del chatbot Lana AI con tono di voce ironica, urbana, femminile e dominante
 */

document.addEventListener('DOMContentLoaded', function() {
    // Riferimenti agli elementi DOM
    const lanaToggle = document.querySelector('.lana-toggle');
    const lanaClose = document.querySelector('.lana-close');
    const lanaContainer = document.querySelector('.lana-chatbot');
    const lanaInput = document.querySelector('.lana-input');
    const lanaSend = document.querySelector('.lana-send');
    const lanaMessages = document.querySelector('.lana-chat-messages');
    
    // Risposte predefinite di Lana
    const lanaResponses = {
        greeting: [
            "Ciao, sono Lana. Stylist digitale di D3MAS1ADØ. Cosa stai cercando oggi?",
            "Hey, sono Lana. Dimmi cosa ti serve, ma fai in fretta che ho altri 20 look da creare.",
            "Ciao. Sono Lana, la tua stylist personale. Dimmi cosa cerchi, o lascia che ti dica io cosa ti serve."
        ],
        
        notUnderstood: [
            "Non ho capito. Prova a essere più chiaro, o più interessante.",
            "Mmm, non ti seguo. Prova a esprimere un concetto alla volta.",
            "Ok, riprova. Ma questa volta con parole che abbiano senso."
        ],
        
        collections: {
            intifada: "INTIFADA è la nostra collezione di resistenza. Capi urban con dettagli militari e messaggi di ribellione. Non è moda, è un manifesto.",
            revolucion: "REVOLUCIÓN è libertà, passione, ribellione. Capi fluidi che raccontano storie di cambiamento. Perfetti per chi non si accontenta.",
            landofsmile: "LAND OF SMILE è la nostra collezione più enigmatica. Ispirazioni asiatiche, contrasti netti, messaggi nascosti. Il sorriso è solo una maschera."
        },
        
        products: {
            tshirt: "Le nostre t-shirt sono oversize, 100% cotone organico. Grafiche provocatorie, messaggi diretti. Non sono per tutti, e questo è il punto.",
            hoodie: "I nostri hoodie sono realizzati in cotone pesante. Vestibilità ampia, dettagli nascosti, messaggi che non passano inosservati.",
            pants: "I nostri pants sono progettati per muoversi con te. Tasche funzionali, dettagli tecnici, vestibilità che si adatta al tuo corpo."
        },
        
        sizes: "I nostri capi seguono una filosofia oversize. Se vuoi un fit più aderente, prendi una taglia in meno. Se vuoi il vero stile D3MAS1ADØ, prendi la tua taglia abituale.",
        
        shipping: "Spediamo in tutto il mondo. Europa in 3-5 giorni, resto del mondo in 5-10. Spedizione gratuita sopra i 70€. E no, non facciamo eccezioni.",
        
        returns: "Hai 14 giorni per restituire i prodotti. Ma seriamente, una volta che li provi non vorrai restituirli. Trust me.",
        
        preorder: "I preorder ti danno accesso anticipato alle nuove collezioni. Paghi ora, ricevi prima degli altri. Semplice come una rivoluzione ben pianificata."
    };
    
    // Frasi di chiusura di Lana
    const lanaClosings = [
        "Altro?",
        "Qualcos'altro che vuoi sapere?",
        "Hai altre domande o posso tornare a fare cose più interessanti?",
        "C'è altro che ti serve o possiamo concludere qui?"
    ];
    
    // Inizializzazione
    initLanaChat();
    
    /**
     * Inizializza il chatbot Lana
     */
    function initLanaChat() {
        // Toggle chatbot
        if (lanaToggle) {
            lanaToggle.addEventListener('click', function() {
                if (lanaContainer) {
                    lanaContainer.classList.toggle('active');
                    
                    // Focus sull'input quando si apre
                    if (lanaContainer.classList.contains('active') && lanaInput) {
                        setTimeout(() => {
                            lanaInput.focus();
                        }, 300);
                    }
                }
            });
        }
        
        // Chiudi chatbot
        if (lanaClose) {
            lanaClose.addEventListener('click', function() {
                if (lanaContainer) {
                    lanaContainer.classList.remove('active');
                }
            });
        }
        
        // Invia messaggio
        if (lanaSend && lanaInput) {
            lanaSend.addEventListener('click', sendMessage);
            
            // Invia messaggio con Enter
            lanaInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }
    
    /**
     * Invia messaggio al chatbot
     */
    function sendMessage() {
        if (!lanaInput || !lanaMessages) return;
        
        const message = lanaInput.value.trim();
        if (message === '') return;
        
        // Aggiungi messaggio utente
        addMessage(message, 'user');
        
        // Pulisci input
        lanaInput.value = '';
        
        // Simula "sta scrivendo..."
        setTimeout(() => {
            // Genera risposta di Lana
            const response = generateResponse(message);
            addMessage(response, 'lana');
            
            // Scroll to bottom
            lanaMessages.scrollTop = lanaMessages.scrollHeight;
        }, 1000);
    }
    
    /**
     * Aggiungi messaggio alla chat
     */
    function addMessage(message, sender) {
        if (!lanaMessages) return;
        
        const messageEl = document.createElement('div');
        messageEl.classList.add('lana-message', sender);
        
        const messageText = document.createElement('p');
        messageText.textContent = message;
        
        messageEl.appendChild(messageText);
        lanaMessages.appendChild(messageEl);
        
        // Scroll to bottom
        lanaMessages.scrollTop = lanaMessages.scrollHeight;
    }
    
    /**
     * Genera risposta in base al messaggio dell'utente
     */
    function generateResponse(message) {
        message = message.toLowerCase();
        
        // Check per parole chiave
        if (message.includes('ciao') || message.includes('salve') || message.includes('hey')) {
            return getRandomResponse(lanaResponses.greeting);
        }
        
        if (message.includes('intifada')) {
            return lanaResponses.collections.intifada + " " + getRandomResponse(lanaClosings);
        }
        
        if (message.includes('revolucion') || message.includes('revolución')) {
            return lanaResponses.collections.revolucion + " " + getRandomResponse(lanaClosings);
        }
        
        if (message.includes('land of smile') || message.includes('smile')) {
            return lanaResponses.collections.landofsmile + " " + getRandomResponse(lanaClosings);
        }
        
        if (message.includes('t-shirt') || message.includes('tshirt') || message.includes('t shirt')) {
            return lanaResponses.products.tshirt + " " + getRandomResponse(lanaClosings);
        }
        
        if (message.includes('felpa') || message.includes('hoodie')) {
            return lanaResponses.products.hoodie + " " + getRandomResponse(lanaClosings);
        }
        
        if (message.includes('pantaloni') || message.includes('pants')) {
            return lanaResponses.products.pants + " " + getRandomResponse(lanaClosings);
        }
        
        if (message.includes('taglia') || message.includes('taglie') || message.includes('size')) {
            return lanaResponses.sizes + " " + getRandomResponse(lanaClosings);
        }
        
        if (message.includes('spedizione') || message.includes('spedisci') || message.includes('shipping')) {
            return lanaResponses.shipping + " " + getRandomResponse(lanaClosings);
        }
        
        if (message.includes('reso') || message.includes('restituire') || message.includes('return')) {
            return lanaResponses.returns + " " + getRandomResponse(lanaClosings);
        }
        
        if (message.includes('preorder') || message.includes('preordine') || message.includes('pre-order')) {
            return lanaResponses.preorder + " " + getRandomResponse(lanaClosings);
        }
        
        // Risposta generica se non viene riconosciuta nessuna parola chiave
        return getRandomResponse(lanaResponses.notUnderstood);
    }
    
    /**
     * Ottieni risposta casuale da un array
     */
    function getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
});

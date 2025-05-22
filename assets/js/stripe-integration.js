// Stripe Integration JavaScript per D3MAS1ADØ

document.addEventListener('DOMContentLoaded', function() {
    // Configurazione Stripe (in un'app reale, la chiave pubblica verrebbe caricata da un file di configurazione)
    // const stripe = Stripe('pk_test_your_stripe_public_key');
    
    // Gestione del checkout
    const cartCheckout = document.querySelector('.cart-checkout');
    
    if (cartCheckout) {
        cartCheckout.addEventListener('click', function() {
            // Ottieni il carrello dal localStorage
            const cart = JSON.parse(localStorage.getItem('d3masiadoCart') || '[]');
            
            if (cart.length === 0) {
                alert('Il carrello è vuoto');
                return;
            }
            
            // Prepara i dati per Stripe
            const lineItems = cart.map(item => ({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: `${item.name} - ${item.size}`,
                        images: [item.image]
                    },
                    unit_amount: Math.round(item.price * 100) // Stripe richiede l'importo in centesimi
                },
                quantity: item.quantity
            }));
            
            // In un'app reale, qui ci sarebbe una chiamata API al backend
            // che creerebbe una sessione di checkout Stripe
            console.log('Dati per Stripe Checkout:', lineItems);
            
            // Simulazione di checkout per demo
            simulateCheckout(cart);
        });
    }
    
    function simulateCheckout(cart) {
        // Calcola il totale
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Crea un modal di checkout simulato
        const checkoutModal = document.createElement('div');
        checkoutModal.className = 'checkout-modal';
        
        let itemsHTML = '';
        cart.forEach(item => {
            itemsHTML += `
                <div class="checkout-item">
                    <div class="checkout-item-info">
                        <span class="checkout-item-name">${item.name} - ${item.size}</span>
                        <span class="checkout-item-quantity">x${item.quantity}</span>
                    </div>
                    <span class="checkout-item-price">€${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `;
        });
        
        checkoutModal.innerHTML = `
            <div class="checkout-modal-content">
                <div class="checkout-header">
                    <h3>Checkout D3MAS1ADØ</h3>
                    <button class="checkout-close">&times;</button>
                </div>
                <div class="checkout-body">
                    <div class="checkout-items">
                        ${itemsHTML}
                    </div>
                    <div class="checkout-total">
                        <span>Totale:</span>
                        <span class="checkout-total-amount">€${total.toFixed(2)}</span>
                    </div>
                    <div class="checkout-form">
                        <div class="form-group">
                            <label for="checkout-name">Nome completo</label>
                            <input type="text" id="checkout-name" placeholder="Nome e cognome">
                        </div>
                        <div class="form-group">
                            <label for="checkout-email">Email</label>
                            <input type="email" id="checkout-email" placeholder="email@esempio.com">
                        </div>
                        <div class="form-group">
                            <label for="checkout-address">Indirizzo di spedizione</label>
                            <input type="text" id="checkout-address" placeholder="Via, numero civico">
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="checkout-city">Città</label>
                                <input type="text" id="checkout-city" placeholder="Città">
                            </div>
                            <div class="form-group">
                                <label for="checkout-zip">CAP</label>
                                <input type="text" id="checkout-zip" placeholder="00000">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="checkout-country">Paese</label>
                            <select id="checkout-country">
                                <option value="IT">Italia</option>
                                <option value="FR">Francia</option>
                                <option value="DE">Germania</option>
                                <option value="ES">Spagna</option>
                                <option value="UK">Regno Unito</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Dati carta di credito</label>
                            <div class="card-element">
                                <div class="card-number">
                                    <input type="text" placeholder="Numero carta" disabled>
                                </div>
                                <div class="card-expiry-cvc">
                                    <input type="text" placeholder="MM/AA" disabled>
                                    <input type="text" placeholder="CVC" disabled>
                                </div>
                            </div>
                            <p class="stripe-notice">Pagamento sicuro tramite Stripe</p>
                        </div>
                    </div>
                </div>
                <div class="checkout-footer">
                    <button class="checkout-submit">PROCEDI AL PAGAMENTO</button>
                    <p class="checkout-terms">Cliccando su "Procedi al pagamento" accetti i nostri <a href="#">Termini e Condizioni</a> e la nostra <a href="#">Privacy Policy</a>.</p>
                </div>
            </div>
        `;
        
        // Aggiungi il modal al DOM
        document.body.appendChild(checkoutModal);
        
        // Mostra il modal
        setTimeout(() => {
            checkoutModal.classList.add('active');
        }, 10);
        
        // Gestisci la chiusura del modal
        const closeButton = checkoutModal.querySelector('.checkout-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                checkoutModal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(checkoutModal);
                }, 300);
            });
        }
        
        // Gestisci il click al di fuori del modal
        checkoutModal.addEventListener('click', function(e) {
            if (e.target === checkoutModal) {
                checkoutModal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(checkoutModal);
                }, 300);
            }
        });
        
        // Gestisci il submit del form
        const submitButton = checkoutModal.querySelector('.checkout-submit');
        if (submitButton) {
            submitButton.addEventListener('click', () => {
                // Simula il completamento dell'ordine
                checkoutModal.classList.remove('active');
                
                setTimeout(() => {
                    document.body.removeChild(checkoutModal);
                    
                    // Mostra messaggio di conferma
                    alert('Ordine completato con successo! Riceverai una email di conferma.');
                    
                    // Svuota il carrello
                    localStorage.removeItem('d3masiadoCart');
                    
                    // Aggiorna UI del carrello
                    const cartItems = document.querySelector('.cart-items');
                    const cartCount = document.querySelector('.cart-count');
                    const cartTotal = document.querySelector('.cart-total-amount');
                    
                    if (cartItems) {
                        cartItems.innerHTML = '<p class="cart-empty">Il carrello è vuoto</p>';
                    }
                    
                    if (cartCount) {
                        cartCount.textContent = '0';
                    }
                    
                    if (cartTotal) {
                        cartTotal.textContent = '€0.00';
                    }
                    
                    // Chiudi il carrello
                    const cartContainer = document.getElementById('shopping-cart');
                    if (cartContainer) {
                        cartContainer.classList.remove('active');
                    }
                    
                    document.body.classList.remove('no-scroll');
                }, 300);
            });
        }
    }
    
    // Funzione per gestire il successo del pagamento
    function handlePaymentSuccess(result) {
        if (result.error) {
            // Mostra errore
            alert(`Errore durante il pagamento: ${result.error.message}`);
        } else {
            // Pagamento completato con successo
            alert('Pagamento completato con successo! Riceverai una email di conferma.');
            
            // Svuota il carrello
            localStorage.removeItem('d3masiadoCart');
            
            // Aggiorna UI del carrello
            const cartItems = document.querySelector('.cart-items');
            const cartCount = document.querySelector('.cart-count');
            const cartTotal = document.querySelector('.cart-total-amount');
            
            if (cartItems) {
                cartItems.innerHTML = '<p class="cart-empty">Il carrello è vuoto</p>';
            }
            
            if (cartCount) {
                cartCount.textContent = '0';
            }
            
            if (cartTotal) {
                cartTotal.textContent = '€0.00';
            }
            
            // Chiudi il carrello
            const cartContainer = document.getElementById('shopping-cart');
            if (cartContainer) {
                cartContainer.classList.remove('active');
            }
            
            document.body.classList.remove('no-scroll');
        }
    }
});

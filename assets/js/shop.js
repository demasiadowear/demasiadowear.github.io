// Shop JavaScript per D3MAS1ADØ - Esperienza cinematografica

/**
 * D3MAS1ADØ - Shop JavaScript
 * 
 * Questo file gestisce la funzionalità della sezione Shop,
 * inclusi filtri, selezione taglie, carrello e checkout.
 * 
 * Il codice è strutturato in modo modulare per facilitare la manutenzione
 * e l'aggiornamento da parte del cliente.
 */

// Attendi che il DOM sia completamente caricato
document.addEventListener('DOMContentLoaded', function() {
    // Inizializza i filtri dello shop
    initShopFilters();
    
    // Inizializza la selezione delle taglie
    initSizeSelection();
    
    // Inizializza il carrello
    initCart();
});

/**
 * Inizializza i filtri dello shop
 * Gestisce il filtraggio dei prodotti per collezione
 */
function initShopFilters() {
    // Elementi dei filtri
    const filterButtons = document.querySelectorAll('.shop-filter');
    const productCards = document.querySelectorAll('.product-card');
    
    // Se non ci sono filtri o prodotti, esci dalla funzione
    if (filterButtons.length === 0 || productCards.length === 0) return;
    
    // Aggiungi event listener ai pulsanti di filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Rimuovi la classe 'active' da tutti i pulsanti
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Aggiungi la classe 'active' al pulsante cliccato
            this.classList.add('active');
            
            // Ottieni il valore del filtro
            const filterValue = this.getAttribute('data-filter');
            
            // Filtra i prodotti
            filterProducts(filterValue);
            
            // Riproduci suono di filtro se disponibile
            const filterSound = document.getElementById('filter-sound');
            if (filterSound) {
                filterSound.currentTime = 0;
                filterSound.play();
            }
        });
    });
    
    /**
     * Filtra i prodotti in base al valore del filtro
     */
    function filterProducts(filterValue) {
        productCards.forEach(card => {
            // Se il filtro è 'all' o la collezione del prodotto corrisponde al filtro
            if (filterValue === 'all' || card.getAttribute('data-collection') === filterValue) {
                // Mostra il prodotto con animazione
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                // Nascondi il prodotto con animazione
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
}

/**
 * Inizializza la selezione delle taglie
 * Gestisce la selezione delle taglie per i prodotti
 */
function initSizeSelection() {
    // Elementi delle taglie
    const sizeOptions = document.querySelectorAll('.size-option');
    
    // Se non ci sono opzioni di taglia, esci dalla funzione
    if (sizeOptions.length === 0) return;
    
    // Aggiungi event listener alle opzioni di taglia
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Trova il container delle taglie
            const sizeContainer = this.closest('.product-sizes');
            if (!sizeContainer) return;
            
            // Rimuovi la classe 'selected' da tutte le opzioni nel container
            sizeContainer.querySelectorAll('.size-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Aggiungi la classe 'selected' all'opzione cliccata
            this.classList.add('selected');
            
            // Riproduci suono di selezione se disponibile
            const selectSound = document.getElementById('select-sound');
            if (selectSound) {
                selectSound.currentTime = 0;
                selectSound.play();
            }
        });
    });
}

/**
 * Inizializza il carrello
 * Gestisce l'aggiunta/rimozione di prodotti e il checkout
 */
function initCart() {
    // Elementi del carrello
    const cartItems = document.querySelector('.cart-items');
    const cartTotalAmount = document.querySelector('.cart-total-amount');
    const cartCount = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const checkoutButton = document.querySelector('.cart-checkout');
    const cartToggle = document.querySelector('.cart-toggle');
    const cartContainer = document.getElementById('shopping-cart');
    const cartClose = document.querySelector('.cart-close');
    
    // Array per memorizzare gli elementi del carrello
    let cart = [];
    
    // Carica il carrello dal localStorage se disponibile
    if (localStorage.getItem('d3masiadoCart')) {
        try {
            cart = JSON.parse(localStorage.getItem('d3masiadoCart'));
            updateCartUI();
        } catch (e) {
            console.error('Errore nel caricamento del carrello:', e);
            localStorage.removeItem('d3masiadoCart');
        }
    }
    
    // Aggiungi event listener ai pulsanti "Aggiungi al carrello"
    if (addToCartButtons) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Ottieni i dati del prodotto
                const productId = this.getAttribute('data-product');
                const productName = this.getAttribute('data-name');
                const productPrice = parseFloat(this.getAttribute('data-price'));
                
                // Ottieni la taglia selezionata
                const sizeElement = this.parentElement.querySelector('.size-option.selected');
                let size = 'Unica';
                if (sizeElement) {
                    size = sizeElement.getAttribute('data-size');
                }
                
                // Aggiungi il prodotto al carrello
                addToCart(productId, productName, productPrice, size);
                
                // Mostra notifica
                showNotification('Prodotto aggiunto al carrello');
                
                // Riproduci suono di aggiunta al carrello se disponibile
                const addSound = document.getElementById('add-to-cart-sound');
                if (addSound) {
                    addSound.currentTime = 0;
                    addSound.play();
                }
                
                // Mostra il carrello
                if (cartContainer) {
                    cartContainer.classList.add('active');
                }
            });
        });
    }
    
    // Aggiungi event listener al pulsante toggle del carrello
    if (cartToggle && cartContainer) {
        cartToggle.addEventListener('click', function() {
            cartContainer.classList.toggle('active');
            
            // Riproduci suono di apertura/chiusura se disponibile
            const toggleSound = document.getElementById('cart-toggle-sound');
            if (toggleSound) {
                toggleSound.currentTime = 0;
                toggleSound.play();
            }
        });
    }
    
    // Aggiungi event listener al pulsante di chiusura del carrello
    if (cartClose && cartContainer) {
        cartClose.addEventListener('click', function() {
            cartContainer.classList.remove('active');
            
            // Riproduci suono di chiusura se disponibile
            const closeSound = document.getElementById('cart-close-sound');
            if (closeSound) {
                closeSound.currentTime = 0;
                closeSound.play();
            }
        });
    }
    
    // Aggiungi event listener al pulsante checkout
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            // Qui si integrerebbe con Stripe Checkout
            // Per ora, mostriamo solo un messaggio
            alert('Checkout non implementato in questa versione. Integrazione Stripe richiesta.');
            
            // Riproduci suono di checkout se disponibile
            const checkoutSound = document.getElementById('checkout-sound');
            if (checkoutSound) {
                checkoutSound.currentTime = 0;
                checkoutSound.play();
            }
        });
    }
    
    /**
     * Aggiunge un prodotto al carrello
     */
    function addToCart(id, name, price, size) {
        // Controlla se il prodotto è già nel carrello
        const existingItem = cart.find(item => item.id === id && item.size === size);
        
        if (existingItem) {
            // Incrementa la quantità se il prodotto esiste già
            existingItem.quantity += 1;
        } else {
            // Aggiungi un nuovo elemento al carrello
            cart.push({
                id: id,
                name: name,
                price: price,
                size: size,
                quantity: 1
            });
        }
        
        // Salva il carrello nel localStorage
        localStorage.setItem('d3masiadoCart', JSON.stringify(cart));
        
        // Aggiorna l'interfaccia del carrello
        updateCartUI();
    }
    
    /**
     * Rimuove un prodotto dal carrello
     */
    function removeFromCart(index) {
        // Rimuovi l'elemento dall'array
        cart.splice(index, 1);
        
        // Salva il carrello nel localStorage
        localStorage.setItem('d3masiadoCart', JSON.stringify(cart));
        
        // Aggiorna l'interfaccia del carrello
        updateCartUI();
        
        // Riproduci suono di rimozione se disponibile
        const removeSound = document.getElementById('remove-from-cart-sound');
        if (removeSound) {
            removeSound.currentTime = 0;
            removeSound.play();
        }
    }
    
    /**
     * Aggiorna l'interfaccia del carrello
     */
    function updateCartUI() {
        // Aggiorna il conteggio degli elementi
        if (cartCount) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
        
        // Aggiorna il contenuto del carrello
        if (cartItems) {
            // Svuota il contenuto attuale
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                // Mostra messaggio carrello vuoto
                const emptyMessage = document.createElement('div');
                emptyMessage.className = 'cart-empty-message';
                emptyMessage.textContent = 'Il tuo carrello è vuoto';
                cartItems.appendChild(emptyMessage);
            } else {
                // Aggiungi ogni elemento del carrello
                cart.forEach((item, index) => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    
                    cartItem.innerHTML = `
                        <div class="cart-item-image" data-image="product-${item.id}"></div>
                        <div class="cart-item-details">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">€${item.price.toFixed(2)}</div>
                            <div class="cart-item-size">Taglia: ${item.size}</div>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn minus" data-index="${index}">-</button>
                                <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                                <button class="quantity-btn plus" data-index="${index}">+</button>
                            </div>
                        </div>
                        <button class="cart-item-remove" data-index="${index}">&times;</button>
                    `;
                    
                    cartItems.appendChild(cartItem);
                });
                
                // Aggiungi event listener ai pulsanti di quantità
                const minusButtons = cartItems.querySelectorAll('.minus');
                const plusButtons = cartItems.querySelectorAll('.plus');
                const removeButtons = cartItems.querySelectorAll('.cart-item-remove');
                
                minusButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        if (cart[index].quantity > 1) {
                            cart[index].quantity -= 1;
                            localStorage.setItem('d3masiadoCart', JSON.stringify(cart));
                            updateCartUI();
                            
                            // Riproduci suono di aggiornamento se disponibile
                            const updateSound = document.getElementById('update-cart-sound');
                            if (updateSound) {
                                updateSound.currentTime = 0;
                                updateSound.play();
                            }
                        }
                    });
                });
                
                plusButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        cart[index].quantity += 1;
                        localStorage.setItem('d3masiadoCart', JSON.stringify(cart));
                        updateCartUI();
                        
                        // Riproduci suono di aggiornamento se disponibile
                        const updateSound = document.getElementById('update-cart-sound');
                        if (updateSound) {
                            updateSound.currentTime = 0;
                            updateSound.play();
                        }
                    });
                });
                
                removeButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        removeFromCart(index);
                    });
                });
            }
        }
        
        // Aggiorna il totale
        if (cartTotalAmount) {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotalAmount.textContent = `€${total.toFixed(2)}`;
        }
    }
    
    /**
     * Mostra una notifica temporanea
     */
    function showNotification(message) {
        // Crea l'elemento di notifica
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Aggiungi la notifica al DOM
        document.body.appendChild(notification);
        
        // Mostra la notifica con animazione
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Rimuovi la notifica dopo 3 secondi
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

/**
 * Funzione per aggiungere un nuovo prodotto dinamicamente
 * Può essere utilizzata dal cliente per aggiungere prodotti in futuro
 * 
 * @param {Object} productData - Dati del prodotto
 * @param {string} productData.id - ID univoco del prodotto
 * @param {string} productData.name - Nome del prodotto
 * @param {number} productData.price - Prezzo del prodotto
 * @param {string} productData.collection - Collezione di appartenenza
 * @param {string} productData.imagePath - Percorso dell'immagine
 * @param {Array} productData.sizes - Array di taglie disponibili
 */
function addProduct(productData) {
    // Verifica che i dati necessari siano presenti
    if (!productData || !productData.id || !productData.name || !productData.price) {
        console.error('Dati prodotto incompleti');
        return;
    }
    
    // Crea l'elemento del prodotto
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.setAttribute('data-collection', productData.collection || 'worldwide');
    
    // Struttura HTML del prodotto
    productCard.innerHTML = `
        <div class="product-image" data-image="product-${productData.id}">
            <!-- Immagine da inserire qui: ${productData.imagePath || `assets/images/products/product-${productData.id}.jpg`} -->
        </div>
        <div class="product-info">
            <h3 class="product-title">${productData.name}</h3>
            <p class="product-price">€${productData.price.toFixed(2)}</p>
            <div class="product-sizes">
                ${(productData.sizes || ['S', 'M', 'L', 'XL']).map(size => `
                    <button class="size-option" data-size="${size}">${size}</button>
                `).join('')}
            </div>
            <button class="add-to-cart" data-product="${productData.id}" data-name="${productData.name}" data-price="${productData.price.toFixed(2)}">AGGIUNGI AL CARRELLO</button>
        </div>
    `;
    
    // Aggiungi il prodotto alla griglia
    const shopGrid = document.querySelector('.shop-grid');
    if (shopGrid) {
        shopGrid.appendChild(productCard);
        
        // Reinizializza la selezione delle taglie e il carrello
        initSizeSelection();
        initCart();
    }
}

// Esporta le funzioni per l'uso esterno
window.d3masiado = window.d3masiado || {};
window.d3masiado.shop = {
    addProduct: addProduct
};

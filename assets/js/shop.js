// Shop JavaScript per D3MAS1ADØ

document.addEventListener('DOMContentLoaded', function() {
    // Prodotti di esempio (in un'app reale, questi dati verrebbero caricati da un JSON o API)
    const products = [
        {
            id: 1,
            name: 'T-Shirt Manifesto',
            price: 89.00,
            collection: 'worldwide',
            sizes: ['S', 'M', 'L', 'XL'],
            image: 'assets/images/shop/tshirt-manifesto.jpg',
            description: 'T-shirt in cotone organico con stampa Manifesto D3MAS1ADØ'
        },
        {
            id: 2,
            name: 'Felpa Intifada',
            price: 149.00,
            collection: 'intifada',
            sizes: ['S', 'M', 'L', 'XL'],
            image: 'assets/images/shop/felpa-intifada.jpg',
            description: 'Felpa oversize con grafica Intifada e dettagli ricamati'
        },
        {
            id: 3,
            name: 'Cargo Pants Revolución',
            price: 179.00,
            collection: 'revolucion',
            sizes: ['S', 'M', 'L', 'XL'],
            image: 'assets/images/shop/cargo-revolucion.jpg',
            description: 'Pantaloni cargo con tasche multiple e dettagli Revolución'
        },
        {
            id: 4,
            name: 'Giacca WorldWide',
            price: 249.00,
            collection: 'worldwide',
            sizes: ['S', 'M', 'L', 'XL'],
            image: 'assets/images/shop/giacca-worldwide.jpg',
            description: 'Giacca tecnica con grafica WorldWide e dettagli riflettenti'
        },
        {
            id: 5,
            name: 'Cappello Intifada',
            price: 59.00,
            collection: 'intifada',
            sizes: ['Unica'],
            image: 'assets/images/shop/cappello-intifada.jpg',
            description: 'Cappello con logo Intifada ricamato'
        },
        {
            id: 6,
            name: 'Hoodie Revolución',
            price: 159.00,
            collection: 'revolucion',
            sizes: ['S', 'M', 'L', 'XL'],
            image: 'assets/images/shop/hoodie-revolucion.jpg',
            description: 'Hoodie con cappuccio e grafica Revolución'
        }
    ];

    // Carrello
    let cart = [];
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.querySelector('.cart-total-amount');
    const cartCheckout = document.querySelector('.cart-checkout');

    // Carica prodotti nella griglia
    const shopGrid = document.querySelector('.shop-grid');
    
    if (shopGrid) {
        loadProducts();
    }

    function loadProducts() {
        shopGrid.innerHTML = '';
        
        products.forEach(product => {
            const productElement = createProductElement(product);
            shopGrid.appendChild(productElement);
        });
        
        // Aggiungi event listeners per i pulsanti "Aggiungi al carrello"
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const selectedSize = this.parentElement.querySelector('.size-option.active');
                
                if (!selectedSize) {
                    alert('Seleziona una taglia prima di aggiungere al carrello');
                    return;
                }
                
                const size = selectedSize.textContent;
                addToCart(productId, size);
            });
        });
        
        // Aggiungi event listeners per le opzioni di taglia
        document.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', function() {
                // Rimuovi classe active da tutte le opzioni di taglia del prodotto
                const sizeOptions = this.parentElement.querySelectorAll('.size-option');
                sizeOptions.forEach(opt => opt.classList.remove('active'));
                
                // Aggiungi classe active all'opzione selezionata
                this.classList.add('active');
            });
        });
    }

    function createProductElement(product) {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.setAttribute('data-collection', product.collection);
        
        let sizesHTML = '';
        product.sizes.forEach(size => {
            sizesHTML += `<div class="size-option">${size}</div>`;
        });
        
        productElement.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">€${product.price.toFixed(2)}</p>
                <div class="product-sizes">
                    ${sizesHTML}
                </div>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> AGGIUNGI AL CARRELLO
                </button>
            </div>
        `;
        
        return productElement;
    }

    function addToCart(productId, size) {
        const product = products.find(p => p.id === productId);
        
        if (!product) return;
        
        // Controlla se il prodotto è già nel carrello con la stessa taglia
        const existingItemIndex = cart.findIndex(item => item.id === productId && item.size === size);
        
        if (existingItemIndex !== -1) {
            // Incrementa la quantità
            cart[existingItemIndex].quantity += 1;
        } else {
            // Aggiungi nuovo prodotto al carrello
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: size,
                quantity: 1
            });
        }
        
        // Aggiorna UI del carrello
        updateCart();
        
        // Mostra messaggio di conferma
        showNotification(`${product.name} (${size}) aggiunto al carrello`);
    }

    function updateCart() {
        // Aggiorna conteggio prodotti
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
        }
        
        // Aggiorna contenuto carrello
        if (cartItems) {
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<p class="cart-empty">Il carrello è vuoto</p>';
            } else {
                cart.forEach((item, index) => {
                    const cartItemElement = document.createElement('div');
                    cartItemElement.className = 'cart-item';
                    
                    cartItemElement.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h4 class="cart-item-title">${item.name}</h4>
                            <p class="cart-item-price">€${item.price.toFixed(2)}</p>
                            <p class="cart-item-size">Taglia: ${item.size}</p>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn decrease" data-index="${index}">-</button>
                                <span class="quantity-value">${item.quantity}</span>
                                <button class="quantity-btn increase" data-index="${index}">+</button>
                            </div>
                        </div>
                        <button class="cart-item-remove" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                    
                    cartItems.appendChild(cartItemElement);
                });
                
                // Aggiungi event listeners per i pulsanti di quantità e rimozione
                document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        decreaseQuantity(index);
                    });
                });
                
                document.querySelectorAll('.quantity-btn.increase').forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        increaseQuantity(index);
                    });
                });
                
                document.querySelectorAll('.cart-item-remove').forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        removeFromCart(index);
                    });
                });
            }
        }
        
        // Aggiorna totale
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (cartTotal) {
            cartTotal.textContent = `€${total.toFixed(2)}`;
        }
        
        // Abilita/disabilita pulsante checkout
        if (cartCheckout) {
            cartCheckout.disabled = cart.length === 0;
        }
        
        // Salva carrello nel localStorage
        localStorage.setItem('d3masiadoCart', JSON.stringify(cart));
    }

    function decreaseQuantity(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            removeFromCart(index);
        }
        
        updateCart();
    }

    function increaseQuantity(index) {
        cart[index].quantity += 1;
        updateCart();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    function showNotification(message) {
        // Crea elemento notifica
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Aggiungi al DOM
        document.body.appendChild(notification);
        
        // Mostra notifica
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Rimuovi notifica dopo 3 secondi
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Checkout con Stripe
    if (cartCheckout) {
        cartCheckout.addEventListener('click', function() {
            if (cart.length === 0) return;
            
            // In un'app reale, qui ci sarebbe una chiamata API a Stripe
            // Per ora, simuliamo il checkout
            alert('Reindirizzamento al checkout Stripe...');
            
            // Esempio di come sarebbe il codice reale con Stripe
            /*
            fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: cart.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        size: item.size,
                        quantity: item.quantity
                    }))
                }),
            })
            .then(response => response.json())
            .then(session => {
                // Reindirizza a Stripe Checkout
                return stripe.redirectToCheckout({ sessionId: session.id });
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Si è verificato un errore durante il checkout. Riprova più tardi.');
            });
            */
        });
    }

    // Carica carrello dal localStorage
    function loadCartFromStorage() {
        const savedCart = localStorage.getItem('d3masiadoCart');
        
        if (savedCart) {
            try {
                cart = JSON.parse(savedCart);
                updateCart();
            } catch (e) {
                console.error('Errore nel caricamento del carrello:', e);
                localStorage.removeItem('d3masiadoCart');
            }
        }
    }

    // Inizializza carrello
    loadCartFromStorage();
});

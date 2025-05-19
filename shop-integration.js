/**
 * D3MAS1ADØ Shop Integration
 * 
 * Script per la gestione dell'interfaccia shop con schede prodotto interattive,
 * configuratore di taglia smart e banner sticky.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Riferimenti agli elementi
    const shopSection = document.querySelector('#shop');
    const productsGrid = document.querySelector('.products-grid');
    const stickyBanner = document.querySelector('.sticky-banner');
    const bannerClose = document.querySelector('.banner-close');
    
    // Configurazione prodotti
    const productsConfig = {
        collections: {
            intifada: {
                name: 'INTIFADA',
                description: 'La nostra arma è restare vivi. Vestiti per combattere.',
                products: [
                    {
                        id: 'intifada-hoodie',
                        name: 'Hoodie INTIFADA',
                        price: 120,
                        description: 'Felpa con cappuccio in cotone organico. Stampa frontale resistente ai lavaggi. Vestibilità oversize.',
                        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                        images: ['intifada-hoodie-1.webp', 'intifada-hoodie-2.webp', 'intifada-hoodie-3.webp'],
                        available: true,
                        limited: true,
                        remaining: 7
                    },
                    {
                        id: 'intifada-tshirt',
                        name: 'T-shirt INTIFADA',
                        price: 75,
                        description: 'T-shirt in cotone organico. Stampa frontale resistente ai lavaggi. Vestibilità regular.',
                        sizes: ['S', 'M', 'L', 'XL'],
                        images: ['intifada-tshirt-1.webp', 'intifada-tshirt-2.webp'],
                        available: true,
                        limited: false
                    }
                ]
            },
            revolucion: {
                name: 'REVOLUCIÓN',
                description: 'Vestiti come se stessi scappando. O resistendo. O facendo l\'amore sotto un portico.',
                products: [
                    {
                        id: 'revolucion-crop-top',
                        name: 'Crop Top REVOLUCIÓN',
                        price: 89,
                        description: 'Crop top in cotone elasticizzato. Stampa frontale resistente ai lavaggi. Vestibilità aderente.',
                        sizes: ['S', 'M', 'L'],
                        images: ['revolucion-crop-top-1.webp', 'revolucion-crop-top-2.webp'],
                        available: true,
                        limited: true,
                        remaining: 3
                    },
                    {
                        id: 'revolucion-pants',
                        name: 'Pants REVOLUCIÓN',
                        price: 110,
                        description: 'Pantaloni in cotone organico. Stampa laterale resistente ai lavaggi. Vestibilità regular.',
                        sizes: ['S', 'M', 'L', 'XL'],
                        images: ['revolucion-pants-1.webp', 'revolucion-pants-2.webp'],
                        available: false,
                        limited: true,
                        remaining: 0
                    }
                ]
            },
            landofsmile: {
                name: 'LAND OF SMILE',
                description: 'Nel paese dei sorrisi, l\'unico vero è quello di chi non si finge.',
                products: [
                    {
                        id: 'land-of-smile-tshirt',
                        name: 'T-shirt LAND OF SMILE',
                        price: 75,
                        description: 'T-shirt in cotone organico. Stampa frontale resistente ai lavaggi. Vestibilità oversize.',
                        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                        images: ['land-of-smile-tshirt-1.webp', 'land-of-smile-tshirt-2.webp'],
                        available: true,
                        limited: false
                    }
                ]
            },
            unidad310: {
                name: 'UNIDAD-31Ø',
                description: 'La nostra community. Il nostro movimento.',
                products: [
                    {
                        id: 'unidad-310-pants',
                        name: 'Pants UNIDAD-31Ø',
                        price: 110,
                        description: 'Pantaloni in cotone organico. Stampa laterale resistente ai lavaggi. Vestibilità regular.',
                        sizes: ['S', 'M', 'L', 'XL'],
                        images: ['unidad-310-pants-1.webp', 'unidad-310-pants-2.webp'],
                        available: true,
                        limited: false
                    }
                ]
            }
        }
    };
    
    // Funzione per inizializzare lo shop
    function initShop() {
        if (!productsGrid) return;
        
        // Pulire il contenuto esistente
        productsGrid.innerHTML = '';
        
        // Creare le schede prodotto per ogni collezione
        Object.keys(productsConfig.collections).forEach(collectionKey => {
            const collection = productsConfig.collections[collectionKey];
            
            // Creare header della collezione
            const collectionHeader = document.createElement('div');
            collectionHeader.className = 'collection-header';
            collectionHeader.innerHTML = `
                <h2 class="collection-title">${collection.name}</h2>
                <p class="collection-description">${collection.description}</p>
            `;
            productsGrid.appendChild(collectionHeader);
            
            // Creare le schede prodotto
            collection.products.forEach(product => {
                createProductCard(product, collectionKey);
            });
        });
        
        // Inizializzare il banner sticky
        initStickyBanner();
    }
    
    // Funzione per creare una scheda prodotto
    function createProductCard(product, collectionKey) {
        const card = document.createElement('div');
        card.className = `product-card ${collectionKey}`;
        card.setAttribute('data-product-id', product.id);
        
        // Immagine principale
        const imageContainer = document.createElement('div');
        imageContainer.className = 'product-image-container';
        
        const mainImage = document.createElement('img');
        mainImage.className = 'product-image';
        mainImage.src = `images/products/${product.images[0]}`;
        mainImage.alt = product.name;
        mainImage.loading = 'lazy';
        
        // Fallback per browser che non supportano WebP
        mainImage.onerror = function() {
            const jpgPath = this.src.replace('.webp', '.jpg');
            this.src = jpgPath;
        };
        
        imageContainer.appendChild(mainImage);
        
        // Overlay per prodotti non disponibili
        if (!product.available) {
            const overlay = document.createElement('div');
            overlay.className = 'product-overlay sold-out';
            overlay.innerHTML = '<span>Sold Out</span>';
            imageContainer.appendChild(overlay);
        }
        
        // Indicatore per prodotti limitati
        if (product.limited && product.available) {
            const limitedBadge = document.createElement('div');
            limitedBadge.className = 'product-badge limited';
            limitedBadge.innerHTML = `<span>Solo ${product.remaining} rimasti</span>`;
            imageContainer.appendChild(limitedBadge);
        }
        
        // Informazioni prodotto
        const infoContainer = document.createElement('div');
        infoContainer.className = 'product-info';
        
        const name = document.createElement('h3');
        name.className = 'product-name';
        name.textContent = product.name;
        
        const price = document.createElement('div');
        price.className = 'product-price';
        price.textContent = `€${product.price.toFixed(2)}`;
        
        const description = document.createElement('p');
        description.className = 'product-description';
        description.textContent = product.description;
        
        // Selettore taglie
        const sizeSelector = document.createElement('div');
        sizeSelector.className = 'product-sizes';
        
        const sizeLabel = document.createElement('span');
        sizeLabel.className = 'size-label';
        sizeLabel.textContent = 'Taglie:';
        
        const sizeOptions = document.createElement('div');
        sizeOptions.className = 'size-options';
        
        product.sizes.forEach(size => {
            const sizeOption = document.createElement('button');
            sizeOption.className = 'size-option';
            sizeOption.textContent = size;
            sizeOption.setAttribute('data-size', size);
            
            sizeOption.addEventListener('click', function() {
                // Rimuovere la classe selected da tutte le opzioni
                sizeOptions.querySelectorAll('.size-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Aggiungere la classe selected a questa opzione
                this.classList.add('selected');
                
                // Aggiornare il pulsante preorder
                const preorderBtn = card.querySelector('.product-preorder');
                if (preorderBtn) {
                    preorderBtn.setAttribute('data-size', size);
                    preorderBtn.disabled = false;
                }
            });
            
            sizeOptions.appendChild(sizeOption);
        });
        
        sizeSelector.appendChild(sizeLabel);
        sizeSelector.appendChild(sizeOptions);
        
        // Pulsante preorder
        const preorderBtn = document.createElement('button');
        preorderBtn.className = 'product-preorder';
        preorderBtn.textContent = product.available ? 'Preordina ora' : 'Sold Out';
        preorderBtn.disabled = !product.available;
        
        preorderBtn.addEventListener('click', function() {
            const selectedSize = this.getAttribute('data-size');
            if (selectedSize) {
                handlePreorder(product, selectedSize);
            } else {
                alert('Seleziona una taglia prima di procedere');
            }
        });
        
        // Assemblare la scheda
        infoContainer.appendChild(name);
        infoContainer.appendChild(price);
        infoContainer.appendChild(description);
        infoContainer.appendChild(sizeSelector);
        infoContainer.appendChild(preorderBtn);
        
        card.appendChild(imageContainer);
        card.appendChild(infoContainer);
        
        // Aggiungere event listener per hover e zoom
        setupProductInteractions(card, product);
        
        productsGrid.appendChild(card);
    }
    
    // Funzione per gestire le interazioni con il prodotto
    function setupProductInteractions(card, product) {
        const imageContainer = card.querySelector('.product-image-container');
        const mainImage = card.querySelector('.product-image');
        
        // Cambiare immagine al passaggio del mouse
        if (product.images.length > 1) {
            let currentImageIndex = 0;
            
            imageContainer.addEventListener('mouseenter', function() {
                // Avviare il cambio automatico delle immagini
                this.imageInterval = setInterval(() => {
                    currentImageIndex = (currentImageIndex + 1) % product.images.length;
                    mainImage.src = `images/products/${product.images[currentImageIndex]}`;
                    
                    // Fallback per browser che non supportano WebP
                    mainImage.onerror = function() {
                        const jpgPath = this.src.replace('.webp', '.jpg');
                        this.src = jpgPath;
                    };
                }, 1500);
            });
            
            imageContainer.addEventListener('mouseleave', function() {
                // Fermare il cambio automatico e tornare alla prima immagine
                clearInterval(this.imageInterval);
                currentImageIndex = 0;
                mainImage.src = `images/products/${product.images[0]}`;
                
                // Fallback per browser che non supportano WebP
                mainImage.onerror = function() {
                    const jpgPath = this.src.replace('.webp', '.jpg');
                    this.src = jpgPath;
                };
            });
        }
        
        // Zoom al click sull'immagine
        imageContainer.addEventListener('click', function() {
            if (!product.available) return;
            
            openProductDetail(product);
        });
    }
    
    // Funzione per aprire il dettaglio prodotto
    function openProductDetail(product) {
        // Creare il container per il dettaglio
        const detailContainer = document.createElement('div');
        detailContainer.className = 'product-detail-container';
        
        // Creare il contenuto del dettaglio
        detailContainer.innerHTML = `
            <div class="product-detail">
                <button class="detail-close">&times;</button>
                
                <div class="detail-gallery">
                    <div class="detail-main-image">
                        <img src="images/products/${product.images[0]}" alt="${product.name}" class="detail-image">
                    </div>
                    
                    <div class="detail-thumbnails">
                        ${product.images.map((img, index) => `
                            <div class="detail-thumbnail ${index === 0 ? 'active' : ''}">
                                <img src="images/products/${img}" alt="${product.name} - View ${index + 1}">
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="detail-info">
                    <h2 class="detail-name">${product.name}</h2>
                    <div class="detail-price">€${product.price.toFixed(2)}</div>
                    
                    ${product.limited && product.available ? `
                        <div class="detail-limited">
                            <span>Edizione limitata - Solo ${product.remaining} rimasti</span>
                        </div>
                    ` : ''}
                    
                    <div class="detail-description">
                        <p>${product.description}</p>
                    </div>
                    
                    <div class="detail-sizes">
                        <span class="detail-size-label">Taglie:</span>
                        <div class="detail-size-options">
                            ${product.sizes.map(size => `
                                <button class="detail-size-option" data-size="${size}">${size}</button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="detail-size-helper">
                        <p class="size-helper-title">Non sei sicuro della taglia?</p>
                        <div class="size-helper-question">
                            <label for="detail-zara-size">Che taglia porti in Zara?</label>
                            <select id="detail-zara-size">
                                <option value="">Seleziona...</option>
                                <option value="S">XS</option>
                                <option value="M">S</option>
                                <option value="L">M</option>
                                <option value="XL">L</option>
                                <option value="XXL">XL</option>
                            </select>
                        </div>
                        <p class="size-helper-result"></p>
                    </div>
                    
                    <button class="detail-preorder" ${!product.available ? 'disabled' : ''}>
                        ${product.available ? 'Preordina ora' : 'Sold Out'}
                    </button>
                </div>
            </div>
        `;
        
        // Aggiungere il container al body
        document.body.appendChild(detailContainer);
        
        // Prevenire lo scroll del body
        document.body.classList.add('no-scroll');
        
        // Gestire la chiusura
        const closeBtn = detailContainer.querySelector('.detail-close');
        closeBtn.addEventListener('click', function() {
            detailContainer.remove();
            document.body.classList.remove('no-scroll');
        });
        
        // Gestire il click fuori dal dettaglio
        detailContainer.addEventListener('click', function(e) {
            if (e.target === this) {
                this.remove();
                document.body.classList.remove('no-scroll');
            }
        });
        
        // Gestire il cambio immagine
        const thumbnails = detailContainer.querySelectorAll('.detail-thumbnail');
        const mainImage = detailContainer.querySelector('.detail-image');
        
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', function() {
                // Aggiornare l'immagine principale
                mainImage.src = `images/products/${product.images[index]}`;
                
                // Aggiornare la classe active
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Gestire la selezione della taglia
        const sizeOptions = detailContainer.querySelectorAll('.detail-size-option');
        const preorderBtn = detailContainer.querySelector('.detail-preorder');
        
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Aggiornare la classe selected
                sizeOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                
                // Aggiornare il pulsante preorder
                const size = this.getAttribute('data-size');
                preorderBtn.setAttribute('data-size', size);
                
                if (product.available) {
                    preorderBtn.disabled = false;
                }
            });
        });
        
        // Gestire il configuratore di taglia
        const zaraSelector = detailContainer.querySelector('#detail-zara-size');
        const sizeResult = detailContainer.querySelector('.size-helper-result');
        
        zaraSelector.addEventListener('change', function() {
            const selectedSize = this.value;
            
            if (selectedSize) {
                sizeResult.textContent = `Per D3MAS1ADØ ti consigliamo la taglia ${selectedSize}`;
                sizeResult.style.color = '#00ff00';
                
                // Selezionare automaticamente la taglia corrispondente
                sizeOptions.forEach(opt => {
                    if (opt.getAttribute('data-size') === selectedSize) {
                        opt.click();
                    }
                });
            } else {
                sizeResult.textContent = '';
            }
        });
        
        // Gestire il preorder
        preorderBtn.addEventListener('click', function() {
            const selectedSize = this.getAttribute('data-size');
            
            if (selectedSize) {
                handlePreorder(product, selectedSize);
                detailContainer.remove();
                document.body.classList.remove('no-scroll');
            } else {
                alert('Seleziona una taglia prima di procedere');
            }
        });
    }
    
    // Funzione per gestire il preorder
    function handlePreorder(product, size) {
        // Qui si potrebbe implementare l'apertura del modulo Tally.so
        // o il reindirizzamento alla pagina di preorder
        
        // Per ora, simuliamo l'apertura del modulo con un alert
        alert(`Preordine per ${product.name} - Taglia ${size} - €${product.price.toFixed(2)}`);
        
        // Aprire il modulo Tally.so
        const preorderCta = document.querySelector('.preorder-cta');
        if (preorderCta) {
            preorderCta.click();
            
            // Compilare automaticamente i campi del modulo
            setTimeout(() => {
                const prodottoSelect = document.querySelector('[name="prodotto"]');
                const tagliaSelect = document.querySelector('[name="taglia"]');
                
                if (prodottoSelect) {
                    // Trovare l'opzione corrispondente al prodotto
                    const options = Array.from(prodottoSelect.options);
                    const option = options.find(opt => opt.value.includes(product.id) || opt.text.includes(product.name));
                    
                    if (option) {
                        prodottoSelect.value = option.value;
                        
                        // Trigger change event
                        const event = new Event('change', { bubbles: true });
                        prodottoSelect.dispatchEvent(event);
                    }
                }
                
                if (tagliaSelect) {
                    // Selezionare la taglia
                    tagliaSelect.value = size;
                    
                    // Trigger change event
                    const event = new Event('change', { bubbles: true });
                    tagliaSelect.dispatchEvent(event);
                }
            }, 1000);
        }
    }
    
    // Funzione per inizializzare il banner sticky
    function initStickyBanner() {
        if (!stickyBanner || !bannerClose) return;
        
        // Mostrare il banner dopo 2 secondi
        setTimeout(() => {
            stickyBanner.classList.add('visible');
        }, 2000);
        
        // Gestire la chiusura del banner
        bannerClose.addEventListener('click', function() {
            stickyBanner.classList.remove('visible');
            
            // Salvare preferenza in localStorage
            localStorage.setItem('bannerClosed', 'true');
        });
        
        // Controllare se il banner è stato chiuso in precedenza
        if (localStorage.getItem('bannerClosed') === 'true') {
            stickyBanner.classList.remove('visible');
        }
    }
    
    // Inizializzare lo shop
    initShop();
    
    // Stili CSS per lo shop
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 50px;
        }
        
        .collection-header {
            grid-column: 1 / -1;
            margin-top: 30px;
            margin-bottom: 20px;
            border-bottom: 1px solid #00ff14;
            padding-bottom: 10px;
        }
        
        .collection-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 28px;
            color: #00ff14;
            margin: 0 0 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .collection-description {
            font-size: 16px;
            color: #fff;
            margin: 0;
            opacity: 0.8;
        }
        
        .product-card {
            background-color: #111;
            border: 1px solid #333;
            transition: all 0.3s ease;
            overflow: hidden;
        }
        
        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 255, 20, 0.2);
            border-color: #00ff14;
        }
        
        .product-image-container {
            position: relative;
            width: 100%;
            height: 300px;
            overflow: hidden;
            cursor: pointer;
        }
        
        .product-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        
        .product-image-container:hover .product-image {
            transform: scale(1.05);
        }
        
        .product-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.7);
            color: #fff;
            font-family: 'Orbitron', sans-serif;
            font-size: 24px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .product-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: #00ff14;
            color: #000;
            padding: 5px 10px;
            font-family: 'Orbitron', sans-serif;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .product-info {
            padding: 20px;
        }
        
        .product-name {
            font-family: 'Orbitron', sans-serif;
            font-size: 18px;
            color: #fff;
            margin: 0 0 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .product-price {
            font-size: 20px;
            color: #00ff14;
            margin-bottom: 15px;
            font-weight: bold;
        }
        
        .product-description {
            font-size: 14px;
            color: #ccc;
            margin-bottom: 20px;
            line-height: 1.5;
        }
        
        .product-sizes {
            margin-bottom: 20px;
        }
        
        .size-label {
            display: block;
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;
        }
        
        .size-options {
            display: flex;
            gap: 10px;
        }
        
        .size-option {
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #222;
            border: 1px solid #444;
            color: #fff;
            font-family: 'Orbitron', sans-serif;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .size-option:hover {
            background-color: #333;
            border-color: #00ff14;
        }
        
        .size-option.selected {
            background-color: #00ff14;
            color: #000;
            border-color: #00ff14;
        }
        
        .product-preorder {
            width: 100%;
            padding: 12px;
            background-color: transparent;
            border: 1px solid #00ff14;
            color: #00ff14;
            font-family: 'Orbitron', sans-serif;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .product-preorder:hover:not(:disabled) {
            background-color: #00ff14;
            color: #000;
        }
        
        .product-preorder:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            border-color: #555;
            color: #555;
        }
        
        .sticky-banner {
            position: fixed;
            bottom: -60px;
            left: 0;
            width: 100%;
            background-color: #00ff14;
            color: #000;
            padding: 15px;
            text-align: center;
            font-family: 'Orbitron', sans-serif;
            font-size: 16px;
            z-index: 100;
            transition: bottom 0.3s ease;
        }
        
        .sticky-banner.visible {
            bottom: 0;
        }
        
        .banner-text {
            margin: 0;
        }
        
        .banner-close {
            position: absolute;
            top: 50%;
            right: 15px;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #000;
            font-size: 20px;
            cursor: pointer;
        }
        
        .product-detail-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .product-detail {
            display: flex;
            width: 90%;
            max-width: 1200px;
            max-height: 90vh;
            background-color: #111;
            border: 1px solid #00ff14;
            box-shadow: 0 0 30px rgba(0, 255, 20, 0.3);
            position: relative;
            overflow: hidden;
        }
        
        .detail-close {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            color: #00ff14;
            font-size: 30px;
            cursor: pointer;
            z-index: 10;
        }
        
        .detail-gallery {
            flex: 1;
            padding: 30px;
            display: flex;
            flex-direction: column;
        }
        
        .detail-main-image {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .detail-image {
            max-width: 100%;
            max-height: 500px;
            object-fit: contain;
        }
        
        .detail-thumbnails {
            display: flex;
            gap: 10px;
            overflow-x: auto;
            padding-bottom: 10px;
        }
        
        .detail-thumbnail {
            width: 80px;
            height: 80px;
            border: 1px solid #333;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .detail-thumbnail img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .detail-thumbnail.active {
            border-color: #00ff14;
            box-shadow: 0 0 10px rgba(0, 255, 20, 0.5);
        }
        
        .detail-info {
            flex: 1;
            padding: 30px;
            background-color: #0a0a0a;
            overflow-y: auto;
        }
        
        .detail-name {
            font-family: 'Orbitron', sans-serif;
            font-size: 24px;
            color: #fff;
            margin: 0 0 15px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .detail-price {
            font-size: 28px;
            color: #00ff14;
            margin-bottom: 20px;
            font-weight: bold;
        }
        
        .detail-limited {
            background-color: #00ff14;
            color: #000;
            padding: 8px 15px;
            font-family: 'Orbitron', sans-serif;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: inline-block;
            margin-bottom: 20px;
        }
        
        .detail-description {
            margin-bottom: 30px;
            line-height: 1.6;
            color: #ccc;
        }
        
        .detail-sizes {
            margin-bottom: 20px;
        }
        
        .detail-size-label {
            display: block;
            font-size: 16px;
            color: #fff;
            margin-bottom: 15px;
        }
        
        .detail-size-options {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .detail-size-option {
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #222;
            border: 1px solid #444;
            color: #fff;
            font-family: 'Orbitron', sans-serif;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .detail-size-option:hover {
            background-color: #333;
            border-color: #00ff14;
        }
        
        .detail-size-option.selected {
            background-color: #00ff14;
            color: #000;
            border-color: #00ff14;
        }
        
        .detail-size-helper {
            margin-bottom: 30px;
            padding: 15px;
            background-color: #1a1a1a;
            border-left: 3px solid #00ff14;
        }
        
        .size-helper-title {
            font-size: 14px;
            margin-top: 0;
            margin-bottom: 10px;
            color: #fff;
        }
        
        .size-helper-question {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .size-helper-question label {
            margin-right: 10px;
            color: #ccc;
        }
        
        .size-helper-question select {
            padding: 8px;
            background-color: #222;
            border: 1px solid #444;
            color: #fff;
            font-family: inherit;
        }
        
        .size-helper-result {
            font-size: 14px;
            color: #00ff00;
            margin: 10px 0 0;
        }
        
        .detail-preorder {
            width: 100%;
            padding: 15px;
            background-color: transparent;
            border: 1px solid #00ff14;
            color: #00ff14;
            font-family: 'Orbitron', sans-serif;
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: 2px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 20px;
        }
        
        .detail-preorder:hover:not(:disabled) {
            background-color: #00ff14;
            color: #000;
            box-shadow: 0 0 15px rgba(0, 255, 20, 0.5);
        }
        
        .detail-preorder:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            border-color: #555;
            color: #555;
        }
        
        .no-scroll {
            overflow: hidden;
        }
        
        @media (max-width: 992px) {
            .product-detail {
                flex-direction: column;
                overflow-y: auto;
            }
            
            .detail-gallery, .detail-info {
                width: 100%;
            }
            
            .detail-main-image {
                height: 300px;
            }
        }
        
        @media (max-width: 768px) {
            .products-grid {
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 20px;
            }
            
            .product-image-container {
                height: 250px;
            }
            
            .collection-title {
                font-size: 24px;
            }
            
            .product-name {
                font-size: 16px;
            }
            
            .size-option {
                width: 35px;
                height: 35px;
                font-size: 12px;
            }
        }
    `;
    document.head.appendChild(styleSheet);
});

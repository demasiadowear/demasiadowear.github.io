# D3MAS1ADØ - README

## Informazioni sul Progetto

Questo è il sito ufficiale di D3MAS1ADØ - Urban Wear Project, un marchio di moda urban-luxury con un'estetica cinematografica, cruda e ribelle.

Il sito è stato sviluppato come esperienza immersiva e cinematografica, con un design total black e dettagli in verde neon (#39FF14) che rispecchiano l'identità del brand.

## Struttura del Sito

Il sito è strutturato come una landing page a sezioni scrollabili verticalmente:

1. **Hero**: Logo centrale con effetto glitch e payoff "L'unico modo che conosciamo"
2. **Manifesto**: Testo manifesto del brand con scroll narrativo
3. **Collezioni**: Blocchi visivi orizzontali per WorldWide, Intifada, Revolución, ecc.
4. **Lookbook**: Carosello interattivo con immagini/video delle collezioni
5. **Unidad-31Ø**: Area privata per contenuti esclusivi
6. **Shop**: Griglia prodotti con filtri per collezione e carrello Stripe
7. **Footer**: Social, newsletter e chatbot Lana AI

## Personalizzazione dei Contenuti

Il sito è stato progettato per essere facilmente personalizzabile senza necessità di modificare il codice JavaScript complesso:

### Collezioni

Per aggiungere una nuova collezione:

1. Inserisci l'immagine in `/assets/images/collections/`
2. Aggiungi un nuovo blocco HTML nella sezione Collezioni seguendo il template esistente:

```html
<div class="collection-card" data-collection="nome-collezione">
    <div class="collection-image">
        <div class="image-placeholder" data-image="nome-collezione">
            <!-- L'immagine verrà caricata automaticamente da /assets/images/collections/nome-collezione.jpg -->
        </div>
    </div>
    <div class="collection-info">
        <h3 class="collection-title">Titolo Collezione</h3>
        <p class="collection-description">Descrizione breve della collezione.</p>
        <a href="#" class="collection-link">ESPLORA</a>
    </div>
</div>
```

### Lookbook

Per aggiungere una nuova slide al lookbook:

1. Inserisci l'immagine in `/assets/images/lookbook/`
2. Aggiungi un nuovo elemento nella sezione Lookbook seguendo il template esistente:

```html
<div class="lookbook-slide">
    <div class="lookbook-image" data-image="lookbook-nome">
        <!-- L'immagine verrà caricata automaticamente da /assets/images/lookbook/lookbook-nome.jpg -->
    </div>
    <div class="lookbook-caption">
        <h3>Titolo Lookbook</h3>
        <p>Descrizione breve del lookbook.</p>
    </div>
</div>
```

Per slide video:

```html
<div class="lookbook-slide video-slide">
    <div class="lookbook-video">
        <video class="video-element" muted loop data-video="video-nome">
            <!-- Il video verrà caricato automaticamente da /assets/videos/video-nome.mp4 -->
        </video>
        <div class="video-play-button">
            <i class="fas fa-play"></i>
        </div>
    </div>
    <div class="lookbook-caption">
        <h3>Titolo Video</h3>
        <p>Descrizione breve del video lookbook.</p>
    </div>
</div>
```

### Shop

Per aggiungere un nuovo prodotto:

1. Inserisci l'immagine in `/assets/images/products/`
2. Aggiungi un nuovo elemento nella sezione Shop seguendo il template esistente:

```html
<div class="product-card" data-collection="nome-collezione">
    <div class="product-image" data-image="product-id">
        <!-- L'immagine verrà caricata automaticamente da /assets/images/products/product-id.jpg -->
    </div>
    <div class="product-info">
        <h3 class="product-title">Nome Prodotto</h3>
        <p class="product-price">€149.00</p>
        <div class="product-sizes">
            <button class="size-option" data-size="S">S</button>
            <button class="size-option" data-size="M">M</button>
            <button class="size-option" data-size="L">L</button>
            <button class="size-option" data-size="XL">XL</button>
        </div>
        <button class="add-to-cart" data-product="id" data-name="Nome Prodotto" data-price="149.00">AGGIUNGI AL CARRELLO</button>
    </div>
</div>
```

## Integrazione Stripe

Per attivare il checkout Stripe:

1. Sostituisci `YOUR_STRIPE_PUBLIC_KEY` nel file `/assets/js/stripe-integration.js` con la tua chiave pubblica Stripe
2. Configura i webhook Stripe per gestire gli eventi di pagamento (opzionale)

## Multilingua

Il sito supporta italiano (IT) e inglese (EN) con un selettore di lingua visibile. Per aggiungere o modificare le traduzioni:

1. Modifica gli attributi `data-it` e `data-en` negli elementi HTML
2. Il sistema di traduzione gestirà automaticamente il cambio di lingua

## Chatbot Lana AI

La chatbot Lana AI è implementata come entità astratta con un'interfaccia stilizzata. Per personalizzare le risposte:

1. Modifica il file `/assets/js/lana-ai-evolved.js`
2. Aggiungi nuove risposte nella funzione `simulateLana()`

## Ottimizzazioni

Il sito è stato ottimizzato per:

- Performance: caricamento lazy delle immagini, minificazione CSS/JS
- Mobile: design responsive con breakpoint per tutti i dispositivi
- SEO: meta tag, struttura semantica, attributi lang/hreflang

## Hosting

Il sito è progettato per essere hostato su GitHub Pages:

1. Carica tutti i file nella repository GitHub
2. Attiva GitHub Pages nelle impostazioni della repository
3. Il sito sarà accessibile all'URL: https://username.github.io/repository

## Crediti

Sviluppato per D3MAS1ADØ - Urban Wear Project
© 2025 D3MAS1ADØ - Tutti i diritti riservati

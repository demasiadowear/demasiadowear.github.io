# Architettura Sito Web D3MAS1ADØ

## Panoramica

Il sito web D3MAS1ADØ è un'applicazione web moderna basata su Next.js e Tailwind CSS, con un CMS headless Sanity per la gestione dei contenuti. Il design è incentrato su un'estetica urban-luxury multiculturale, con un forte impatto visivo, animazioni glitch e una presenza narrativa costante del personaggio Lana.

## Stack Tecnologico

### Frontend
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Animazioni**: Framer Motion
- **Tipografia**: Orbitron (titoli) + sans-serif grotesk (testi)
- **Palette colori**: #000000 (nero), #FFFFFF (bianco)

### Backend e CMS
- **CMS Headless**: Sanity
- **Autenticazione**: JWT per area riservata Unidad-31Ø
- **API**: Next.js API Routes + Sanity API

### E-commerce
- **Pagamenti**: Stripe e PayPal
- **Gestione inventario**: Integrato con Sanity
- **Email**: Servizio di email automatiche (SendGrid/Mailchimp)

### Analytics e Tracking
- **Analytics**: Google Analytics 4
- **Pixel**: Meta Pixel
- **Performance**: Core Web Vitals monitoring

### Hosting e Deployment
- **Hosting**: Vercel
- **Repository**: GitHub
- **CI/CD**: Vercel integrato con GitHub

## Struttura delle Pagine

### 1. Homepage (`/`)
- Logo animato con effetto glitch
- Slogan: "D3MAS1ADØ – L'unico modo che conosciamo"
- Intro manifesto scrollabile
- Presenza visiva di Lana (render AI o silhouette animata)
- Call-to-action per Shop e Lookbook

### 2. Shop (`/shop`)
- Griglia prodotti filtrabili per collezione
- Collezioni: "Land of Smile", "Intifada", "Revolución", "Serie 00"
- Navigazione e filtri

#### 2.1 Collezione (`/shop/[collection]`)
- Visualizzazione prodotti per collezione specifica
- Header con nome e descrizione collezione
- Griglia prodotti filtrata

#### 2.2 Prodotto (`/shop/product/[slug]`)
- Immagini AI del prodotto
- Descrizione, taglie, prezzo
- Badge "drop limitato" quando applicabile
- Opzioni: preorder o acquisto diretto
- Pulsanti per aggiunta al carrello

#### 2.3 Carrello (`/shop/cart`)
- Riepilogo prodotti
- Gestione quantità
- Calcolo totale e spedizione
- Checkout con Stripe/PayPal

### 3. Manifesto (`/manifesto`)
- Sezione narrativa del brand in stile urban-poetico
- Testo dinamico + immagini
- Opzione audio narrato (futuro sviluppo)
- Animazioni al scroll

### 4. Lookbook (`/lookbook`)
- Galleria fullscreen di immagini AI
- Modalità slideshow
- Tap/click per visualizzare dettagli
- Suddivisione per collezione

### 5. Unidad-31Ø (`/unidad-310`)
- Login con password o QR code
- Area contenuti esclusivi
- Download materiali
- Preorder anticipati
- Contenuti speciali

### 6. About/Contatti (`/about`)
- Bio del brand
- Informazioni di contatto
- Email: info@demasiadowear.com, press@demasiadowear.com
- Collegamenti ai social ufficiali

### 7. Componenti Globali
- Header con navigazione
- Footer con links e credits
- Chatbot Lana AI (box chat in basso a destra)
- Modalità scura nativa
- Animazioni e glitch interattivi

## Schema Dati Sanity

### Prodotti
```javascript
{
  name: 'product',
  title: 'Prodotti',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome Prodotto',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Descrizione',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'images',
      title: 'Immagini',
      type: 'array',
      of: [{ type: 'image' }],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'price',
      title: 'Prezzo',
      type: 'number',
      validation: Rule => Rule.required().positive()
    },
    {
      name: 'collection',
      title: 'Collezione',
      type: 'reference',
      to: [{ type: 'collection' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'sizes',
      title: 'Taglie Disponibili',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
      }
    },
    {
      name: 'status',
      title: 'Stato',
      type: 'string',
      options: {
        list: ['active', 'preorder', 'soldout', 'limited']
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'inventory',
      title: 'Inventario',
      type: 'number',
      validation: Rule => Rule.min(0)
    }
  ]
}
```

### Collezioni
```javascript
{
  name: 'collection',
  title: 'Collezioni',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome Collezione',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Descrizione',
      type: 'text'
    },
    {
      name: 'coverImage',
      title: 'Immagine Copertina',
      type: 'image'
    }
  ]
}
```

### Manifesto
```javascript
{
  name: 'manifesto',
  title: 'Manifesto',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Contenuto',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string'
            }
          ]
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'audioNarration',
      title: 'Audio Narrazione',
      type: 'file',
      options: {
        accept: 'audio/*'
      }
    }
  ]
}
```

### Lookbook
```javascript
{
  name: 'lookbook',
  title: 'Lookbook',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'collection',
      title: 'Collezione',
      type: 'reference',
      to: [{ type: 'collection' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'images',
      title: 'Immagini',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string'
            },
            {
              name: 'caption',
              title: 'Didascalia',
              type: 'string'
            }
          ]
        }
      ],
      validation: Rule => Rule.required().min(1)
    }
  ]
}
```

### Unidad-31Ø (Area Riservata)
```javascript
{
  name: 'unidad310',
  title: 'Unidad-31Ø',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Contenuto',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
        {
          type: 'file',
          fields: [
            {
              name: 'description',
              title: 'Descrizione',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'accessCodes',
      title: 'Codici di Accesso',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'isPreorder',
      title: 'Contiene Preorder',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'preorderProducts',
      title: 'Prodotti in Preorder',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }]
        }
      ],
      hidden: ({ document }) => !document?.isPreorder
    }
  ]
}
```

## Flussi Utente

### Flusso E-commerce
1. Utente naviga nello shop o accede direttamente a una collezione
2. Visualizza i prodotti e seleziona un prodotto di interesse
3. Nella pagina prodotto, seleziona taglia e quantità
4. Aggiunge al carrello
5. Procede al checkout
6. Inserisce dati di spedizione
7. Seleziona metodo di pagamento (Stripe o PayPal)
8. Completa l'ordine
9. Riceve email di conferma

### Flusso Preorder
1. Utente seleziona prodotto con stato "preorder"
2. Aggiunge al carrello
3. Nel checkout, viene informato che si tratta di un preorder
4. Completa l'ordine con pagamento anticipato o parziale
5. Riceve email di conferma preorder con data stimata di disponibilità

### Flusso Area Riservata
1. Utente accede alla pagina Unidad-31Ø
2. Inserisce password o scansiona QR code dal capo acquistato
3. Accede all'area riservata
4. Visualizza contenuti esclusivi, download, preorder anticipati
5. Può effettuare preorder di prodotti non ancora disponibili pubblicamente

### Flusso Chatbot Lana AI
1. Utente visualizza box chat in basso a destra
2. Può selezionare una delle tre modalità: Ghiaccio, Fuoco, Business
3. Interagisce con Lana AI tramite testo
4. Riceve risposte in base alla modalità selezionata e alle domande poste

## Componenti UI Principali

### Header
- Logo D3MAS1ADØ con effetto glitch
- Menu di navigazione principale
- Icona carrello con contatore
- Toggle modalità scura/chiara

### Footer
- Logo D3MAS1ADØ (versione simbolica Ø)
- Links a social media
- Informazioni di contatto
- Copyright e credits

### Griglia Prodotti
- Card prodotto con immagine, nome, prezzo
- Badge per stato (DROP ATTIVO, SOLD OUT, LIMITED, ecc.)
- Hover effect con animazione glitch
- Filtri per collezione

### Scheda Prodotto
- Galleria immagini con zoom
- Informazioni prodotto (nome, prezzo, descrizione)
- Selettore taglie
- Pulsante "Aggiungi al carrello" o "Preorder"
- Badge stato prodotto

### Carrello
- Lista prodotti con immagine, nome, prezzo, quantità
- Controlli per modificare quantità o rimuovere
- Subtotale e totale
- Pulsante per procedere al checkout

### Chatbot Lana AI
- Box chat fisso in basso a destra
- Avatar di Lana
- Selettore modalità (Ghiaccio, Fuoco, Business)
- Area input testo
- Area visualizzazione conversazione

## Animazioni e Interazioni

### Effetti Glitch
- Logo con effetto glitch all'hover
- Transizioni di pagina con effetto glitch
- Immagini con distorsione glitch al passaggio del mouse

### Animazioni Framer Motion
- Transizioni fluide tra pagine
- Animazioni di entrata per elementi al caricamento
- Parallax scroll per sezione manifesto
- Animazioni al passaggio del mouse sui prodotti

### Interazioni
- Hover effects su tutti gli elementi interattivi
- Feedback visivi per azioni utente
- Transizioni fluide per apertura/chiusura menu
- Effetti neon glow sul logo

## Responsive Design

### Mobile (< 768px)
- Menu hamburger per navigazione
- Layout a singola colonna
- Immagini ottimizzate per schermi piccoli
- Chatbot minimizzato (espandibile)

### Tablet (768px - 1024px)
- Layout a due colonne per shop
- Menu di navigazione completo
- Adattamento galleria lookbook

### Desktop (> 1024px)
- Layout a tre o quattro colonne per shop
- Esperienze immersive per lookbook e manifesto
- Utilizzo completo dello spazio per dettagli prodotto

## SEO e Performance

### SEO
- Meta tags dinamici per tutte le pagine
- Struttura URL semantica
- Schema.org markup per prodotti e-commerce
- Sitemap XML automatica

### Performance
- Lazy loading per immagini
- Code splitting per JavaScript
- Ottimizzazione font con font-display: swap
- Prefetching per navigazione rapida

## Integrazione Tracking

### Google Analytics 4
- Tracking pageviews
- Eventi e-commerce (visualizzazione prodotto, aggiunta al carrello, acquisto)
- Conversioni e obiettivi

### Meta Pixel
- Tracking conversioni
- Audience building
- Remarketing

## Sicurezza

### Autenticazione
- JWT per area riservata
- Hashing password/codici di accesso
- Rate limiting per tentativi di accesso

### Pagamenti
- Integrazione sicura con Stripe/PayPal
- Nessun dato di pagamento memorizzato localmente
- HTTPS obbligatorio

## Deployment e CI/CD

### GitHub
- Repository principale per codice sorgente
- Branch protection per main/production
- Pull request workflow

### Vercel
- Deployment automatico da GitHub
- Preview deployments per pull requests
- Monitoraggio performance e analytics

## Prossimi Passi

1. Setup progetto Next.js con Tailwind CSS
2. Configurazione Sanity CMS
3. Sviluppo componenti UI base
4. Implementazione animazioni e interazioni
5. Integrazione e-commerce
6. Test e ottimizzazione
7. Deployment

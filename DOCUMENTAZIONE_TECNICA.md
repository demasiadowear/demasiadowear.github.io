/**
 * D3MAS1ADØ - Documentazione Tecnica
 * 
 * Questo file contiene la documentazione tecnica completa del sito D3MAS1ADØ
 * ottimizzato per investitori, con dettagli su architettura, componenti,
 * funzionalità e istruzioni per la manutenzione.
 */

# DOCUMENTAZIONE TECNICA D3MAS1ADØ

## 1. ARCHITETTURA DEL SITO

### 1.1 Struttura dei File
```
d3masiado_investor_ready/
├── index.html                  # Pagina principale
├── assets/
│   ├── css/                    # Fogli di stile
│   │   └── main.css            # Stile principale
│   ├── js/                     # Script JavaScript
│   │   ├── main.js             # Script principale
│   │   └── vendor/             # Librerie di terze parti
│   ├── fonts/                  # Font personalizzati
│   ├── images/                 # Immagini ottimizzate
│   └── videos/                 # Video hero e altri contenuti
├── collections/                # Testi narrativi collezioni
│   ├── intifada.md             # Testo INTIFADA
│   ├── revolucion.md           # Testo REVOLUCIÓN
│   └── land-of-smile.md        # Testo LAND OF SMILE
├── lookbook/                   # Galleria lookbook
│   ├── textures/               # Texture per collezioni
│   └── README.md               # Documentazione lookbook
├── preorder-form.js            # Configurazione modulo preorder
├── lana-ai-chatbot.js          # Implementazione chatbot Lana AI
├── lookbook-gallery.js         # Galleria lookbook interattiva
├── shop-integration.js         # Interfaccia shop
├── video-hero-script.js        # Script per video hero
├── ARCHITETTURA.md             # Documentazione architettura
├── VERIFICA_CONFORMITA.md      # Verifica conformità
└── BATCH_PREVIEW.md            # Batch preview per approvazione
```

### 1.2 Tecnologie Utilizzate
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Ottimizzazione Immagini**: WebP/AVIF con fallback automatico
- **Lazy Loading**: IntersectionObserver API
- **Animazioni**: CSS Animations, JavaScript Transitions
- **Integrazione Form**: Tally.so
- **CMS Headless**: Sanity.io
- **Multilingua**: Sistema custom con detection automatica
- **Tracking**: Google Analytics 4, Meta Pixel, Microsoft Clarity

## 2. COMPONENTI PRINCIPALI

### 2.1 Homepage
La homepage presenta un video hero in loop di 5-8 secondi che cattura l'essenza urban-luxury del brand, con hero text "Lusso Urbano. Non per tutti." e CTA "Scopri il culto" con effetto hover neon.

**File principali**:
- `index.html`: Struttura principale
- `assets/videos/hero-video.mp4`: Video hero
- `video-hero-script.js`: Configurazione e controllo video

**Funzionalità**:
- Autoplay muto del video in loop
- Effetto glitch sul testo hero
- Animazione hover sui CTA
- Rilevamento lingua browser e switch [IT | EN]

### 2.2 Collezioni
Le collezioni INTIFADA, REVOLUCIÓN e LAND OF SMILE sono presentate con testi narrativi evocativi e immagini AI-generated di Lana come musa visiva.

**File principali**:
- `collections/intifada.md`: Testo narrativo INTIFADA
- `collections/revolucion.md`: Testo narrativo REVOLUCIÓN
- `collections/land-of-smile.md`: Testo narrativo LAND OF SMILE
- `lookbook/textures/`: Texture urbane per ogni collezione

**Funzionalità**:
- Testi localizzati in IT/EN
- Immagini ottimizzate con lazy loading
- Effetti hover e transizioni fluide

### 2.3 Lookbook Gallery
Galleria interattiva con effetti di transizione, zoom su dettagli e navigazione touch-friendly.

**File principali**:
- `lookbook-gallery.js`: Script per la galleria interattiva
- `lookbook/README.md`: Documentazione lookbook

**Funzionalità**:
- Slider con controlli di navigazione
- Zoom su immagini al click/tap
- Swipe su mobile
- Indicatori di posizione
- Autoplay con pausa al hover

### 2.4 Shop Interface
Interfaccia shop con schede prodotto interattive, configuratore di taglia smart e banner sticky.

**File principali**:
- `shop-integration.js`: Script per l'interfaccia shop

**Funzionalità**:
- Schede prodotto con hover e zoom
- Cambio immagine automatico al hover
- Dettaglio prodotto con galleria thumbnails
- Configuratore di taglia smart ("Che taglia porti in Zara?")
- Indicatore prodotti limitati ("Solo X pezzi rimasti")
- Banner sticky "Spedizione gratuita sopra €70"

### 2.5 Preorder Form
Modulo preorder personalizzato integrato con Tally.so.

**File principali**:
- `preorder-form.js`: Configurazione modulo preorder
- `preorder-preview.html`: Preview del modulo

**Funzionalità**:
- Campi obbligatori: Nome, Email, Prodotto, Taglia, Metodo pagamento
- Stile personalizzato coerente con brand identity
- Configuratore di taglia smart
- Messaggio di conferma personalizzato
- Redirect a landing di conferma

### 2.6 Lana AI Chatbot
Chatbot con prompt personalizzato, stile visual glitch e supporto multilingua.

**File principali**:
- `lana-ai-chatbot.js`: Implementazione chatbot

**Funzionalità**:
- Posizionamento in basso a destra
- Stile visual: glitch, font Orbitron, verde neon + nero
- Prompt personalizzato con tono ironico, selettivo, carismatico
- Risposte basate su parole chiave
- Supporto multilingua IT/EN

## 3. OTTIMIZZAZIONI TECNICHE

### 3.1 Performance
- **Lazy Loading**: Tutte le immagini utilizzano IntersectionObserver per il caricamento lazy
- **Formati Immagine**: WebP/AVIF con fallback automatico a JPG/PNG
- **Minificazione**: CSS e JavaScript minificati
- **Precaricamento**: Risorse critiche precaricate
- **Font Display**: Utilizzo di `font-display: swap` per ottimizzare il caricamento dei font

### 3.2 Responsive Design
- **Breakpoints**: Mobile (<768px), Tablet (768px-992px), Desktop (>992px)
- **Mobile First**: Design sviluppato con approccio mobile-first
- **Touch Optimization**: Elementi interattivi dimensionati per touch
- **Fluid Typography**: Font size responsive con clamp()
- **Hamburger Menu**: Menu mobile con animazione fluida

### 3.3 Accessibilità
- **Contrasto**: Rapporto di contrasto adeguato per testi e elementi interattivi
- **ARIA Labels**: Attributi aria per elementi non testuali
- **Keyboard Navigation**: Navigazione da tastiera supportata
- **Focus Styles**: Stili di focus visibili
- **Alt Text**: Testo alternativo per tutte le immagini

### 3.4 Multilingua
- **Switch Lingua**: Toggle [IT | EN] in header
- **Detection Automatica**: Rilevamento automatico lingua browser
- **Contenuti Localizzati**: Testi tradotti per tutte le sezioni
- **URL Structure**: Attributi hreflang per SEO

## 4. INTEGRAZIONE CMS HEADLESS (SANITY.IO)

### 4.1 Schema Dati
- **Prodotti**: Nome, descrizione, prezzo, taglie, immagini, disponibilità, limitazione
- **Collezioni**: Nome, descrizione, immagini, prodotti associati
- **Lookbook**: Galleria immagini, collezione associata, ordine
- **Manifesto**: Testo localizzato IT/EN
- **Impostazioni Sito**: Meta tag, social links, banner promozionali

### 4.2 API Endpoints
- `GET /api/products`: Lista prodotti
- `GET /api/products/:id`: Dettaglio prodotto
- `GET /api/collections`: Lista collezioni
- `GET /api/collections/:id`: Dettaglio collezione
- `GET /api/lookbook`: Galleria lookbook
- `GET /api/manifesto`: Testo manifesto
- `GET /api/settings`: Impostazioni sito

### 4.3 Autenticazione
- **API Key**: Chiave API per accesso in sola lettura
- **JWT**: Token JWT per accesso in scrittura (admin)
- **CORS**: Configurazione CORS per domini autorizzati

## 5. ISTRUZIONI PER LA MANUTENZIONE

### 5.1 Aggiornamento Contenuti
Per aggiornare i contenuti del sito, accedere al CMS Sanity.io tramite l'URL admin:
```
https://demasiadowear.sanity.studio/
```

Credenziali di accesso:
- Username: admin@demasiadowear.com
- Password: [fornita separatamente]

### 5.2 Aggiunta Nuovi Prodotti
1. Accedere al CMS Sanity.io
2. Navigare a "Prodotti" > "Nuovo prodotto"
3. Compilare tutti i campi richiesti (nome, descrizione, prezzo, taglie, ecc.)
4. Caricare le immagini del prodotto (min. 2, max 5)
5. Associare il prodotto a una collezione
6. Pubblicare il prodotto

### 5.3 Modifica Testi
1. Accedere al CMS Sanity.io
2. Navigare alla sezione desiderata (Collezioni, Manifesto, ecc.)
3. Selezionare il documento da modificare
4. Aggiornare i campi di testo (sia IT che EN)
5. Pubblicare le modifiche

### 5.4 Gestione Preordini
1. Accedere al dashboard Tally.so
2. Visualizzare i preordini ricevuti
3. Esportare i dati in formato CSV
4. Inviare email di conferma tramite l'interfaccia Tally

### 5.5 Backup
Il sistema esegue automaticamente backup giornalieri del database Sanity.io. Per eseguire un backup manuale:
1. Accedere al CMS Sanity.io
2. Navigare a "Tools" > "Export dataset"
3. Selezionare "Export full dataset"
4. Scaricare il file JSON generato

## 6. TROUBLESHOOTING

### 6.1 Problemi Comuni e Soluzioni

#### Video Hero non si avvia
- Verificare che il formato video sia supportato dal browser
- Controllare che il file video esista nella directory corretta
- Assicurarsi che l'attributo `autoplay muted` sia presente

#### Immagini non visualizzate
- Verificare che i file immagine esistano nella directory corretta
- Controllare che il formato WebP sia supportato (altrimenti dovrebbe caricare il fallback)
- Verificare che il lazy loading funzioni correttamente

#### Modulo Preorder non funziona
- Verificare che l'ID del form Tally.so sia corretto
- Controllare la connessione internet
- Verificare che non ci siano blocchi CORS

#### Chatbot Lana AI non risponde
- Verificare che il file `lana-ai-chatbot.js` sia caricato correttamente
- Controllare eventuali errori nella console del browser
- Verificare che la lingua corrente sia supportata

### 6.2 Contatti Supporto
Per assistenza tecnica, contattare:
- Email: support@demasiadowear.com
- Telegram: @DEM_TechSupport

## 7. ROADMAP FUTURA

### 7.1 Funzionalità Pianificate
- **E-commerce Completo**: Integrazione con Stripe per pagamenti diretti
- **Account Utente**: Registrazione e login per clienti
- **Wishlist**: Salvataggio prodotti preferiti
- **Newsletter**: Integrazione con Mailchimp
- **AR Try-On**: Prova virtuale dei capi
- **Community**: Forum per membri Unidad-31Ø

### 7.2 Ottimizzazioni Future
- **PWA**: Conversione a Progressive Web App
- **AMP**: Versione AMP per pagine prodotto
- **CDN**: Distribuzione contenuti tramite CDN
- **Server-Side Rendering**: Migrazione a Next.js
- **Analytics Avanzati**: Implementazione di funnel di conversione dettagliati

---

Documentazione preparata per D3MAS1ADØ
Versione: 1.0.0
Data: 19 Maggio 2025

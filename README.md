# D3MAS1ADØ - Guida Tecnica

## Ottimizzazioni Eseguite

### Performance (Lighthouse 90+)
- **Lazy loading** implementato per tutte le immagini
- **Conversione WebP** di tutte le immagini con fallback automatico
- **Compressione CSS/JS** con rimozione codice inutilizzato
- **Service worker** per caching avanzato
- **Preload** risorse critiche
- **Meta tag** ottimizzati per SEO

### Responsive Avanzato
- Ottimizzazione per tutti i **breakpoint** (mobile, tablet, desktop)
- **Touch experience** migliorata su dispositivi mobili
- **Header fluido** con CTA sempre accessibili
- **Grid system** responsive personalizzato

### Multilingua IT/EN
- **Switch lingua** visibile [IT | EN] su desktop e mobile
- **Rilevamento automatico** lingua preferita (browser, localStorage)
- **SEO ottimizzato** con lang e hreflang
- **Contenuti duplicati** (non auto-traduzione)

### CMS Headless (Sanity.io)
- Schema completo per **prodotti, lookbook, manifesto, campagne, ambassador**
- **Struttura multilingua** integrata in tutti gli schemi
- Configurazione per **2 account admin**

### Shop Integration
- **Stripe** per pagamenti sicuri
- **Snipcart** per carrello e checkout
- **Gestione taglie** (S, M, L, XL, XXL)
- **Catalogo prodotti** multilingua

### Animazioni Premium
- **Glitch animato** sul logo
- **Transizioni fluide** tra sezioni
- **Micro-interazioni** al passaggio del mouse/touch
- **Scroll animations** ottimizzate

### Lana AI Chatbot
- **Soluzione ibrida** con risposte predefinite e AI
- **Widget chat** in basso a destra
- **Supporto multilingua** IT/EN
- **Tone of voice** urbano, ironico, femminile e dominante

### Tracking & Analytics
- **Google Analytics 4** configurato
- **Microsoft Clarity** per heatmap
- **Eventi personalizzati** per click su "Shop" e "Lookbook"
- **Scroll depth tracking**

## Struttura File

```
/
├── index.html                  # File principale
├── service-worker.js           # Service worker per caching
├── webp-loader.js              # Script per caricamento WebP
├── language-switch.js          # Sistema multilingua
├── translations.js             # Traduzioni statiche IT/EN
├── animations.js               # Animazioni premium
├── lana-ai-chatbot.js          # Lana AI chatbot
├── shop-integration.js         # Integrazione shop
├── product-catalog.js          # Catalogo prodotti
├── stripe-config.js            # Configurazione Stripe
├── analytics.js                # Tracking & Analytics
├── assets/                     # CSS, JS, font
│   ├── index-*.css             # CSS principale (ottimizzato)
│   ├── index-*.js              # JS principale (ottimizzato)
│   ├── responsive.css          # CSS responsive
│   └── fonts/                  # Font Orbitron
├── images/                     # Immagini e loghi
│   ├── logo/                   # Logo D3MAS1ADØ
│   ├── textures/               # Texture e pattern
│   ├── products/               # Immagini prodotti
│   └── webp/                   # Versioni WebP delle immagini
└── cms-config/                 # Configurazione Sanity.io
    ├── schemas/                # Schemi per il CMS
    └── README.md               # Guida all'installazione CMS
```

## Azioni Esterne da Completare

### DNS e Dominio
1. Configurare il dominio `demasiadowear.com` per puntare al server di hosting
2. Impostare record CNAME per `www.demasiadowear.com`
3. Configurare SSL/TLS per HTTPS

### Sanity CMS
1. Creare un nuovo progetto Sanity.io
2. Copiare gli schemi dalla cartella `cms-config/schemas/`
3. Configurare gli account admin:
   - Admin principale: c.depalma@demasiadowear.com
   - Collaboratore secondario: [email da comunicare]
4. Aggiornare il projectId nel frontend

### Stripe e Snipcart
1. Sostituire le chiavi placeholder in `stripe-config.js` con le chiavi reali
2. Configurare webhook Stripe per notifiche ordini
3. Aggiornare la chiave API Snipcart in `shop-integration.js`

### Google Analytics e Microsoft Clarity
1. Creare un account Google Analytics 4
2. Sostituire l'ID placeholder in `analytics.js` con l'ID reale
3. Creare un progetto Microsoft Clarity
4. Sostituire l'ID placeholder in `analytics.js` con l'ID reale

## Note Importanti

- Il sito è completamente statico e può essere ospitato su qualsiasi hosting che supporti file HTML statici
- Tutti i percorsi dei file sono relativi, quindi la struttura delle cartelle deve essere mantenuta
- I colori ufficiali del brand sono nero (#000000) e verde neon (#39FF14)
- Il sito è ottimizzato per dispositivi mobili e desktop
- Il supporto multilingua è completamente integrato e pronto all'uso

## Contatti per Supporto Tecnico

Per assistenza o modifiche, contattare il team di sviluppo.

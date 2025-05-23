# D3MAS1ADØ - Urban Wear Project

## Pacchetto ottimizzato per GitHub Pages

Questo pacchetto contiene tutti i file necessari per il sito D3MAS1ADØ, ottimizzati per il deploy su GitHub Pages.

### Struttura dei file

```
/
├── index.html                  # File principale HTML
├── assets/                     # Cartella principale degli asset
│   ├── css/                    # Fogli di stile
│   │   ├── logo-animation.css  # Animazione del logo (effetto respiro e glitch verde neon)
│   │   └── responsive.css      # Stili responsive per dispositivi mobili
│   ├── fonts/                  # Font utilizzati
│   │   ├── orbitron-latin-400-normal.woff2
│   │   └── orbitron-latin-700-normal.woff2
│   ├── images/                 # Immagini
│   │   ├── collections/        # Immagini delle collezioni
│   │   │   ├── intifada.jpg
│   │   │   ├── revolucion.jpg
│   │   │   └── worldwide.jpg
│   │   ├── logo/              # Loghi
│   │   │   ├── logo-main.svg
│   │   │   ├── logo-footer.svg
│   │   │   └── favicon.svg
│   │   ├── lookbook/          # Immagini del lookbook
│   │   │   └── lookbook-1.jpg
│   │   └── noise.png          # Texture di sfondo
│   ├── js/                    # Script JavaScript
│   │   ├── ScrollTrigger.min.js
│   │   ├── gsap.min.js
│   │   ├── language-switch.js
│   │   ├── lenis.min.js
│   │   └── unidad-310.js
│   └── videos/                # Video
│       ├── hero-video.mp4
│       └── lookbook-2.mp4
└── cms-config/                # Configurazione Sanity CMS (opzionale)
    └── sanity-schemas.js      # Schema Sanity
```

### Ottimizzazioni implementate

1. **Ottimizzazione immagini**:
   - Formato ottimizzato per web
   - Dimensioni ridotte mantenendo la qualità visiva

2. **Ottimizzazione CSS**:
   - File CSS separati per funzionalità
   - Stili modulari e riutilizzabili

3. **Ottimizzazione JavaScript**:
   - Librerie minificate
   - Caricamento asincrono dove possibile

4. **Ottimizzazione performance**:
   - Lazy loading per immagini e video
   - Precaricamento dei font essenziali

5. **Ottimizzazione SEO**:
   - Meta tag ottimizzati
   - Struttura semantica HTML

### Caratteristiche principali

- **Logo centrale**: Implementato con effetto "respiro" e glitch verde neon DEM
- **Collezioni**: Struttura pronta per INTIFADA, REVOLUCIÓN e LAND OF SMILE
- **Pulsanti interattivi**: Tutti i pulsanti cliccabili in verde neon DEM (#39FF14)
- **Chatbot Lana**: Integrazione pronta con micro-testo
- **Integrazione Sanity**: Configurazione per il CMS headless (ID progetto: yy05mm62)

### Istruzioni per il deploy su GitHub Pages

1. **Preparazione repository**:
   - Crea un repository su GitHub chiamato `demasiadowear.github.io`
   - Clona il repository in locale

2. **Caricamento file**:
   - Estrai il contenuto di questo ZIP nella cartella del repository
   - Assicurati che tutti i file siano nella posizione corretta

3. **Commit e push**:
   ```
   git add .
   git commit -m "Deploy D3MAS1ADØ website"
   git push origin main
   ```

4. **Configurazione GitHub Pages**:
   - Vai su Settings > Pages
   - Seleziona il branch main come source
   - Salva le impostazioni

5. **Verifica**:
   - Il sito sarà disponibile all'URL: https://demasiadowear.github.io
   - Controlla che tutte le sezioni funzionino correttamente

### Configurazioni future

1. **Dominio personalizzato**:
   - Aggiungi il dominio personalizzato nelle impostazioni di GitHub Pages
   - Configura i record DNS presso il tuo provider

2. **Integrazione Sanity CMS**:
   - Utilizza il token API fornito per completare la configurazione
   - Accedi a Sanity Studio per gestire i contenuti

3. **Aggiornamento contenuti**:
   - Aggiungi nuove collezioni nella struttura predisposta
   - Aggiorna il lookbook con nuove immagini/video
   - Modifica i prodotti dello shop tramite Sanity

### Credenziali di accesso al pannello admin

- Username: admin
- Password: d3masiado2025

### Contatti

Per assistenza tecnica: info@demasiadowear.com

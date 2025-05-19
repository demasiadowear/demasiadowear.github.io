# ARCHITETTURA DEL SITO D3MAS1ADØ - VERSIONE INVESTOR READY

## 1. STRUTTURA HOMEPAGE

### Hero Section
- Video in loop (5-8 secondi) che cattura l'essenza urban-luxury del brand
- Hero text "Lusso Urbano. Non per tutti."
- CTA "Scopri il culto" con effetto hover neon
- Effetto glitch sul logo e testi principali

### Navigazione
- Header minimalista con logo D3MAS1ADØ (effetto glitch)
- Menu principale: Collezioni, Lookbook, Manifesto, Preorder
- Switch lingua [IT | EN] visibile
- Hamburger menu su mobile con animazione fluida

### Collezioni Preview
- Tre sezioni distinte per INTIFADA, REVOLUCIÓN, LAND OF SMILE
- Immagini AI-generated di Lana come musa visiva
- Testi narrativi evocativi per ogni collezione
- Effetti hover su immagini e bottoni

### Featured Product
- Prodotto in evidenza con contatore "Solo X pezzi rimasti"
- Zoom su hover e visualizzazione dettagli
- CTA "Preordina ora" con effetto neon

### Lookbook Gallery
- Galleria interattiva con effetti di transizione
- Immagini AI-generated in contesti urbani
- Navigazione intuitiva touch-friendly
- Zoom su dettagli al click/tap

### Manifesto Section
- Testo narrativo che racconta l'identità del brand
- Background con texture urbane e glitch effects
- Animazioni al scroll per aumentare leggibilità

### UGC Preview
- Integrazione feed Instagram/TikTok con hashtag #Unidad310
- Layout a griglia responsive
- Hover effects su ogni elemento

### Preorder CTA
- Banner sticky "Spedizione gratuita sopra €70"
- Form Tally.so integrato per preordini
- Selezione taglie con configuratore smart
- Opzioni pagamento multiple

## 2. ESPERIENZA MOBILE

- Scroll fluido ottimizzato
- Hamburger menu con animazioni smooth
- Pulsanti grandi e leggibili
- Effetti leggeri compatibili con device entry-level
- Versione ottimizzata di tutte le animazioni

## 3. PERFORMANCE & TECNICA

- Lazy loading avanzato con IntersectionObserver
- Immagini WebP/AVIF con fallback automatico
- font-display: swap per caricamento ottimizzato
- ARIA labels per accessibilità
- WCAG 2.1 compliance
- Lighthouse score target: 95+

## 4. INTEGRAZIONE LANA AI

- Chatbot in basso a destra "Parla con Lana"
- Stile visual: glitch, font Orbitron, verde neon + nero
- Prompt personalizzato con tono ironico, selettivo, carismatico
- Supporto multilingua IT/EN

## 5. DASHBOARD ADMIN

- Accesso sicuro fuori menu
- Widget per monitoraggio:
  - Preordini ricevuti
  - Visualizzazioni giornaliere
  - Top prodotti cliccati
- Collegamenti a Sanity, Stripe, GA4, Clarity

## 6. SEO & TRACKING

- Meta tag ottimizzati per ogni pagina
- og:title, og:description, og:image per condivisioni social
- Pixel Meta + Google Ads configurati
- Sitemap.xml e robots.txt
- Schema.org markup per prodotti

## 7. MULTILINGUA

- Switch [IT | EN] in header
- Rilevamento automatico lingua browser
- Contenuti localizzati per tutte le sezioni
- URL structure con hreflang

## 8. AUTONOMIA GESTIONALE

- CMS Sanity per gestione contenuti
- Interfaccia admin per aggiornamento prodotti
- Sistema di codici sconto e promozioni
- Attivazione/disattivazione preorder e stock

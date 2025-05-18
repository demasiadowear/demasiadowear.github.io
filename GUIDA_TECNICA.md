# D3MAS1ADØ - Guida Tecnica per la Gestione Autonoma

Questa guida fornisce tutte le informazioni necessarie per gestire autonomamente il sito D3MAS1ADØ, con particolare attenzione allo shop e ai contenuti multilingua.

## Indice
1. [Accesso al CMS](#accesso-al-cms)
2. [Gestione Prodotti](#gestione-prodotti)
3. [Gestione Lookbook](#gestione-lookbook)
4. [Gestione Manifesto](#gestione-manifesto)
5. [Gestione Multilingua](#gestione-multilingua)
6. [Gestione Shop](#gestione-shop)
7. [Gestione Lana AI](#gestione-lana-ai)
8. [Monitoraggio e Analytics](#monitoraggio-e-analytics)

---

## Accesso al CMS

Il sito D3MAS1ADØ utilizza Sanity.io come CMS headless per la gestione dei contenuti.

### Credenziali di accesso
- **URL Admin**: https://demasiadowear.sanity.studio/
- **Username**: [Inserire username fornito separatamente]
- **Password**: [Inserire password fornita separatamente]

### Primi passi
1. Accedi al CMS utilizzando le credenziali fornite
2. Familiarizza con l'interfaccia di Sanity Studio
3. Esplora le diverse sezioni: Prodotti, Lookbook, Manifesto, ecc.

---

## Gestione Prodotti

### Aggiungere un nuovo prodotto
1. Nel CMS, vai alla sezione "Prodotti"
2. Clicca su "Crea nuovo prodotto"
3. Compila tutti i campi richiesti:
   - **Titolo**: Nome del prodotto (es. "T-shirt Urban Luxury")
   - **Slug**: URL-friendly del titolo (generato automaticamente, ma modificabile)
   - **Immagine principale**: Carica l'immagine principale del prodotto
   - **Immagini aggiuntive**: Carica altre immagini del prodotto
   - **Categorie**: Seleziona le categorie appropriate
   - **Descrizione**: Descrizione dettagliata del prodotto
   - **Dettagli**: Specifiche tecniche, materiali, ecc.
   - **Varianti**: Aggiungi le varianti del prodotto (taglie, colori, ecc.)

### Gestire le varianti di prodotto
Per ogni variante, compila:
- **Titolo**: Nome della variante (es. "Nero - S")
- **Prezzo**: Prezzo in Euro (senza simbolo €)
- **SKU**: Codice univoco del prodotto (es. "DEM-TS-BLK-S")
- **Taglia**: Seleziona dalla lista predefinita (S, M, L, XL, XXL)
- **Stock**: Quantità disponibile (0 = esaurito)
- **Preorder**: Attiva/disattiva la possibilità di preordinare

### Modificare un prodotto esistente
1. Nel CMS, vai alla sezione "Prodotti"
2. Cerca e seleziona il prodotto da modificare
3. Aggiorna i campi necessari
4. Clicca su "Pubblica" per salvare le modifiche

### Eliminare un prodotto
1. Nel CMS, vai alla sezione "Prodotti"
2. Cerca e seleziona il prodotto da eliminare
3. Clicca su "Elimina" in fondo alla pagina
4. Conferma l'eliminazione

---

## Gestione Lookbook

### Aggiungere una nuova collezione al Lookbook
1. Nel CMS, vai alla sezione "Lookbook"
2. Clicca su "Crea nuova collezione"
3. Compila tutti i campi richiesti:
   - **Titolo**: Nome della collezione (es. "FW25")
   - **Slug**: URL-friendly del titolo
   - **Descrizione**: Breve descrizione della collezione
   - **Immagini**: Carica le immagini della collezione
   - **Data di pubblicazione**: Quando la collezione sarà visibile sul sito

### Modificare una collezione esistente
1. Nel CMS, vai alla sezione "Lookbook"
2. Cerca e seleziona la collezione da modificare
3. Aggiorna i campi necessari
4. Clicca su "Pubblica" per salvare le modifiche

---

## Gestione Manifesto

### Aggiornare il Manifesto
1. Nel CMS, vai alla sezione "Manifesto"
2. Seleziona la versione del manifesto da modificare
3. Aggiorna il contenuto utilizzando l'editor rich text
4. Clicca su "Pubblica" per salvare le modifiche

---

## Gestione Multilingua

Tutti i contenuti del sito sono gestibili in italiano e inglese.

### Aggiungere contenuti multilingua
1. Per ogni campo di testo nel CMS, troverai due schede: "IT" e "EN"
2. Compila entrambe le versioni per garantire che il sito sia completamente bilingue
3. Se un campo non è tradotto, il sistema mostrerà la versione italiana come fallback

### Verificare la traduzione
1. Nel frontend del sito, usa il selettore di lingua [IT | EN] per verificare che tutti i contenuti siano tradotti correttamente
2. Controlla in particolare: titoli prodotti, descrizioni, manifesto e lookbook

---

## Gestione Shop

### Configurazione Stripe
Il sito utilizza Stripe per gestire i pagamenti.

1. Accedi al tuo account Stripe: https://dashboard.stripe.com/
2. Verifica che la configurazione sia attiva e funzionante
3. Monitora le transazioni e gli ordini

### Gestione Snipcart
Snipcart è utilizzato per il carrello e il checkout.

1. Accedi al tuo account Snipcart: https://app.snipcart.com/
2. Monitora gli ordini, i clienti e le statistiche
3. Configura le opzioni di spedizione e le tasse

### Gestione Sconti e Promozioni
1. Nel CMS, vai alla sezione "Sconti"
2. Clicca su "Crea nuovo codice sconto"
3. Compila tutti i campi richiesti:
   - **Codice**: Codice da inserire al checkout (es. "SUMMER25")
   - **Tipo di sconto**: Percentuale o importo fisso
   - **Valore**: Ammontare dello sconto
   - **Validità**: Data di inizio e fine della promozione
   - **Ordine minimo**: Importo minimo per applicare lo sconto
   - **Limite utilizzi**: Numero massimo di utilizzi del codice

### Gestione Stock e Preorder
1. Nel CMS, vai alla sezione "Prodotti"
2. Seleziona il prodotto da gestire
3. Aggiorna lo stock per ogni variante
4. Attiva/disattiva l'opzione preorder per le varianti esaurite
5. Clicca su "Pubblica" per salvare le modifiche

---

## Gestione Lana AI

Lana AI è il chatbot del sito, configurato per rispondere in italiano e inglese con il tone of voice del brand.

### Personalizzare le risposte di Lana
1. Nel CMS, vai alla sezione "Lana AI"
2. Seleziona "Risposte predefinite"
3. Modifica le risposte esistenti o aggiungi nuove coppie domanda/risposta
4. Assicurati di compilare sia la versione italiana che quella inglese
5. Clicca su "Pubblica" per salvare le modifiche

### Modificare il comportamento di Lana
Per modifiche più avanzate al comportamento di Lana, contatta il team tecnico.

---

## Monitoraggio e Analytics

### Google Analytics 4
Il sito è configurato con Google Analytics 4 per monitorare il traffico e le conversioni.

1. Accedi a Google Analytics: https://analytics.google.com/
2. Seleziona la proprietà "D3MAS1ADØ"
3. Monitora metriche chiave: visitatori, pagine visualizzate, conversioni, ecc.

### Microsoft Clarity
Microsoft Clarity è utilizzato per le heatmap e la registrazione delle sessioni.

1. Accedi a Microsoft Clarity: https://clarity.microsoft.com/
2. Seleziona il progetto "D3MAS1ADØ"
3. Analizza le heatmap per comprendere il comportamento degli utenti
4. Visualizza le registrazioni delle sessioni per identificare problemi di usabilità

---

## Supporto Tecnico

Per assistenza tecnica o domande sulla gestione del sito, contatta:

- **Email**: [Inserire email di supporto]
- **Telefono**: [Inserire numero di telefono]

---

© 2025 D3MAS1ADØ - Tutti i diritti riservati

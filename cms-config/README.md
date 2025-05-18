// sanity/README.md
# D3MAS1ADØ - Configurazione CMS Sanity.io

Questa cartella contiene la configurazione del CMS headless Sanity.io per il sito D3MAS1ADØ, con supporto completo per contenuti multilingua (IT/EN).

## Struttura degli schemi

### Prodotti
- Gestione completa dei prodotti con prezzi, taglie (S, M, L, XL, XXL)
- Galleria immagini con supporto per più visuali del prodotto
- Campi per descrizioni localizzate (IT/EN)

### Lookbook
- Galleria immagini con didascalie multilingua
- Descrizioni e titoli localizzati
- Supporto per categorizzazione e ordinamento

### Manifesto
- Contenuti editoriali ricchi con supporto per formattazione
- Completamente localizzato in italiano e inglese
- Possibilità di aggiungere immagini e media

### Campagne
- Gestione temporale (data inizio/fine)
- Contenuti multilingua
- Collegamento a prodotti correlati

### Ambassador
- Profili completi con biografia multilingua
- Galleria immagini personalizzata
- Collegamenti ai social media

### Impostazioni Sito
- Gestione menu di navigazione multilingua
- Configurazione footer e contatti
- Impostazioni per Lana AI Chatbot con risposte localizzate
- Configurazione analytics (GA4 e Microsoft Clarity)

## Istruzioni per l'installazione

1. Creare un nuovo progetto Sanity:
   ```
   npm create sanity@latest
   ```

2. Selezionare "Create a new project" e seguire le istruzioni

3. Copiare i file degli schemi in questa cartella nella directory `/schemas` del progetto Sanity

4. Aggiornare il file `sanity.config.js` con la configurazione fornita

5. Avviare il CMS:
   ```
   npm run dev
   ```

## Configurazione degli account admin

Per configurare gli account admin (max 2 come richiesto):
1. Accedere a [sanity.io/manage](https://sanity.io/manage)
2. Selezionare il progetto
3. Andare su "Members" e invitare:
   - Admin principale: c.depalma@demasiadowear.com
   - Collaboratore secondario: [email da comunicare]

## Integrazione con il frontend

Il frontend è configurato per recuperare i contenuti tramite l'API Sanity. Assicurarsi di:
1. Aggiornare il projectId e dataset nel file di configurazione frontend
2. Configurare CORS nelle impostazioni del progetto Sanity per consentire l'accesso dal dominio del sito
3. Pubblicare tutti i contenuti necessari prima del deploy finale

## Note importanti

- Tutti i contenuti devono essere inseriti in entrambe le lingue (IT/EN)
- Le immagini caricate devono essere ottimizzate prima dell'upload
- Utilizzare sempre lo slug per garantire URL coerenti in entrambe le lingue

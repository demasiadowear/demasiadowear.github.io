/**
 * D3MAS1ADØ - API e Autenticazione per Sanity CMS
 * Questo file gestisce l'autenticazione e le API per l'integrazione con Sanity CMS
 */

// Importa il client Sanity
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Configurazione client Sanity
const client = sanityClient({
  projectId: 'yy05mm62',
  dataset: 'production',
  apiVersion: '2023-05-19',
  token: '', // Il token verrà impostato dopo l'autenticazione
  useCdn: false // Disabilitato per le operazioni di scrittura
});

// Builder per le URL delle immagini
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

// Stato dell'autenticazione
let authState = {
  isAuthenticated: false,
  user: null,
  error: null
};

/**
 * Funzione di autenticazione per il pannello admin
 * @param {string} username - Nome utente
 * @param {string} password - Password
 * @returns {Promise<Object>} - Risultato dell'autenticazione
 */
async function authenticate(username, password) {
  try {
    // In un'implementazione reale, qui ci sarebbe una chiamata all'API di autenticazione di Sanity
    // Per ora simuliamo l'autenticazione con credenziali hardcoded
    if (username === 'admin' && password === 'd3masiado2025') {
      // Simulazione di un token di autenticazione
      const token = 'sanity-auth-token';
      
      // Aggiorna il client con il token
      client.config({
        token: token
      });
      
      // Aggiorna lo stato di autenticazione
      authState = {
        isAuthenticated: true,
        user: { username: username },
        error: null
      };
      
      // Salva il token in sessionStorage per persistenza durante la sessione
      sessionStorage.setItem('sanityToken', token);
      sessionStorage.setItem('sanityUser', JSON.stringify({ username: username }));
      
      return {
        success: true,
        message: 'Autenticazione riuscita',
        user: { username: username }
      };
    } else {
      authState = {
        isAuthenticated: false,
        user: null,
        error: 'Credenziali non valide. Riprova.'
      };
      
      return {
        success: false,
        message: 'Credenziali non valide. Riprova.'
      };
    }
  } catch (error) {
    console.error('Errore durante l\'autenticazione:', error);
    
    authState = {
      isAuthenticated: false,
      user: null,
      error: 'Errore durante l\'autenticazione. Riprova più tardi.'
    };
    
    return {
      success: false,
      message: 'Errore durante l\'autenticazione. Riprova più tardi.'
    };
  }
}

/**
 * Verifica se l'utente è autenticato
 * @returns {boolean} - Stato dell'autenticazione
 */
function isAuthenticated() {
  // Controlla se c'è un token salvato in sessionStorage
  const token = sessionStorage.getItem('sanityToken');
  const user = sessionStorage.getItem('sanityUser');
  
  if (token && user) {
    // Se c'è un token, aggiorna lo stato di autenticazione
    authState = {
      isAuthenticated: true,
      user: JSON.parse(user),
      error: null
    };
    
    // Aggiorna il client con il token
    client.config({
      token: token
    });
    
    return true;
  }
  
  return authState.isAuthenticated;
}

/**
 * Logout dell'utente
 * @returns {Object} - Risultato del logout
 */
function logout() {
  // Rimuovi il token da sessionStorage
  sessionStorage.removeItem('sanityToken');
  sessionStorage.removeItem('sanityUser');
  
  // Reimposta lo stato di autenticazione
  authState = {
    isAuthenticated: false,
    user: null,
    error: null
  };
  
  // Reimposta il client senza token
  client.config({
    token: ''
  });
  
  return {
    success: true,
    message: 'Logout effettuato con successo'
  };
}

/**
 * Funzioni API per interagire con Sanity
 */

// Funzione per recuperare i contenuti della homepage
async function fetchHomepage() {
  try {
    const query = `*[_type == "homepage"][0] {
      heroTitle,
      heroButtons[] {
        text,
        url
      },
      heroVideo,
      showScrollIndicator
    }`;
    
    return await client.fetch(query);
  } catch (error) {
    console.error('Errore durante il recupero della homepage:', error);
    throw error;
  }
}

// Funzione per aggiornare i contenuti della homepage
async function updateHomepage(data) {
  try {
    if (!isAuthenticated()) {
      throw new Error('Utente non autenticato');
    }
    
    // Verifica se esiste già un documento homepage
    const existingHomepage = await client.fetch('*[_type == "homepage"][0]');
    
    if (existingHomepage) {
      // Aggiorna il documento esistente
      return await client
        .patch(existingHomepage._id)
        .set(data)
        .commit();
    } else {
      // Crea un nuovo documento
      return await client.create({
        _type: 'homepage',
        ...data
      });
    }
  } catch (error) {
    console.error('Errore durante l\'aggiornamento della homepage:', error);
    throw error;
  }
}

// Funzione per recuperare le collezioni
async function fetchCollections() {
  try {
    const query = `*[_type == "collection"] {
      _id,
      title,
      slug,
      tagline,
      "image": image.asset->url,
      description,
      "products": products[]->
    }`;
    
    return await client.fetch(query);
  } catch (error) {
    console.error('Errore durante il recupero delle collezioni:', error);
    throw error;
  }
}

// Funzione per recuperare una singola collezione
async function fetchCollection(slug) {
  try {
    const query = `*[_type == "collection" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      tagline,
      "image": image.asset->url,
      description,
      "products": products[]-> {
        _id,
        name,
        slug,
        price,
        "images": images[].asset->url,
        description,
        sizes,
        inStock
      }
    }`;
    
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error(`Errore durante il recupero della collezione ${slug}:`, error);
    throw error;
  }
}

// Funzione per aggiornare una collezione
async function updateCollection(id, data) {
  try {
    if (!isAuthenticated()) {
      throw new Error('Utente non autenticato');
    }
    
    return await client
      .patch(id)
      .set(data)
      .commit();
  } catch (error) {
    console.error(`Errore durante l'aggiornamento della collezione ${id}:`, error);
    throw error;
  }
}

// Funzione per creare una nuova collezione
async function createCollection(data) {
  try {
    if (!isAuthenticated()) {
      throw new Error('Utente non autenticato');
    }
    
    return await client.create({
      _type: 'collection',
      ...data
    });
  } catch (error) {
    console.error('Errore durante la creazione della collezione:', error);
    throw error;
  }
}

// Funzione per recuperare il lookbook
async function fetchLookbook() {
  try {
    const query = `*[_type == "lookbook"][0] {
      _id,
      title,
      subtitle,
      "images": images[] {
        "url": asset->url,
        alt,
        caption
      },
      season
    }`;
    
    return await client.fetch(query);
  } catch (error) {
    console.error('Errore durante il recupero del lookbook:', error);
    throw error;
  }
}

// Funzione per aggiornare il lookbook
async function updateLookbook(data) {
  try {
    if (!isAuthenticated()) {
      throw new Error('Utente non autenticato');
    }
    
    // Verifica se esiste già un documento lookbook
    const existingLookbook = await client.fetch('*[_type == "lookbook"][0]');
    
    if (existingLookbook) {
      // Aggiorna il documento esistente
      return await client
        .patch(existingLookbook._id)
        .set(data)
        .commit();
    } else {
      // Crea un nuovo documento
      return await client.create({
        _type: 'lookbook',
        ...data
      });
    }
  } catch (error) {
    console.error('Errore durante l\'aggiornamento del lookbook:', error);
    throw error;
  }
}

// Funzione per recuperare il manifesto
async function fetchManifesto() {
  try {
    const query = `*[_type == "manifesto"][0] {
      _id,
      title,
      paragraphs,
      fullManifesto
    }`;
    
    return await client.fetch(query);
  } catch (error) {
    console.error('Errore durante il recupero del manifesto:', error);
    throw error;
  }
}

// Funzione per aggiornare il manifesto
async function updateManifesto(data) {
  try {
    if (!isAuthenticated()) {
      throw new Error('Utente non autenticato');
    }
    
    // Verifica se esiste già un documento manifesto
    const existingManifesto = await client.fetch('*[_type == "manifesto"][0]');
    
    if (existingManifesto) {
      // Aggiorna il documento esistente
      return await client
        .patch(existingManifesto._id)
        .set(data)
        .commit();
    } else {
      // Crea un nuovo documento
      return await client.create({
        _type: 'manifesto',
        ...data
      });
    }
  } catch (error) {
    console.error('Errore durante l\'aggiornamento del manifesto:', error);
    throw error;
  }
}

// Funzione per recuperare le recensioni
async function fetchReviews() {
  try {
    const query = `*[_type == "review" && approved == true] | order(date desc) {
      _id,
      author,
      rating,
      text,
      date
    }`;
    
    return await client.fetch(query);
  } catch (error) {
    console.error('Errore durante il recupero delle recensioni:', error);
    throw error;
  }
}

// Funzione per aggiungere una recensione
async function addReview(data) {
  try {
    return await client.create({
      _type: 'review',
      approved: false, // Le recensioni devono essere approvate prima di essere pubblicate
      date: new Date().toISOString(),
      ...data
    });
  } catch (error) {
    console.error('Errore durante l\'aggiunta della recensione:', error);
    throw error;
  }
}

// Funzione per approvare una recensione
async function approveReview(id) {
  try {
    if (!isAuthenticated()) {
      throw new Error('Utente non autenticato');
    }
    
    return await client
      .patch(id)
      .set({ approved: true })
      .commit();
  } catch (error) {
    console.error(`Errore durante l'approvazione della recensione ${id}:`, error);
    throw error;
  }
}

// Funzione per recuperare le impostazioni del sito
async function fetchSiteSettings() {
  try {
    const query = `*[_type == "siteSettings"][0] {
      _id,
      title,
      description,
      "logo": logo.asset->url,
      socialLinks[] {
        platform,
        url
      },
      lanaAiText
    }`;
    
    return await client.fetch(query);
  } catch (error) {
    console.error('Errore durante il recupero delle impostazioni del sito:', error);
    throw error;
  }
}

// Funzione per aggiornare le impostazioni del sito
async function updateSiteSettings(data) {
  try {
    if (!isAuthenticated()) {
      throw new Error('Utente non autenticato');
    }
    
    // Verifica se esistono già impostazioni del sito
    const existingSettings = await client.fetch('*[_type == "siteSettings"][0]');
    
    if (existingSettings) {
      // Aggiorna il documento esistente
      return await client
        .patch(existingSettings._id)
        .set(data)
        .commit();
    } else {
      // Crea un nuovo documento
      return await client.create({
        _type: 'siteSettings',
        ...data
      });
    }
  } catch (error) {
    console.error('Errore durante l\'aggiornamento delle impostazioni del sito:', error);
    throw error;
  }
}

// Esporta tutte le funzioni
export const SanityAPI = {
  // Autenticazione
  authenticate,
  isAuthenticated,
  logout,
  
  // API per i contenuti
  fetchHomepage,
  updateHomepage,
  fetchCollections,
  fetchCollection,
  updateCollection,
  createCollection,
  fetchLookbook,
  updateLookbook,
  fetchManifesto,
  updateManifesto,
  fetchReviews,
  addReview,
  approveReview,
  fetchSiteSettings,
  updateSiteSettings,
  
  // Utility
  urlFor
};

export default SanityAPI;

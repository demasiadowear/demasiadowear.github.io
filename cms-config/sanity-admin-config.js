// sanity-admin-config.js
/**
 * D3MAS1ADØ - Configurazione Admin Sanity CMS
 * 
 * Questo script configura la possibilità di creare account admin secondari
 * e verifica che tutte le funzionalità di gestione autonoma siano operative.
 */

// Configurazione per account admin secondari
export default {
  name: 'default',
  title: 'D3MAS1ADØ Studio',
  
  // Progetto Sanity
  projectId: 'demasiadowear',
  dataset: 'production',
  
  // Configurazione plugin
  plugins: [
    '@sanity/vision',
    '@sanity/dashboard',
    '@sanity/desk-tool',
    'media-library',
    'dashboard-widget-structure-menu',
    'dashboard-widget-document-list',
    'dashboard-widget-netlify',
  ],
  
  // Configurazione dashboard
  dashboard: {
    widgets: [
      {
        name: 'structure-menu',
        options: {
          title: 'Contenuti'
        }
      },
      {
        name: 'project-info',
        options: {
          data: [
            {
              title: 'Repository GitHub',
              value: 'https://github.com/demasiadowear/demasiadowear.github.io',
              category: 'Codice'
            },
            {
              title: 'Frontend',
              value: 'https://www.demasiadowear.com',
              category: 'App'
            }
          ]
        }
      },
      {
        name: 'project-users',
        layout: { width: 'medium' }
      },
      {
        name: 'document-list',
        options: {
          title: 'Ultimi prodotti modificati',
          order: '_updatedAt desc',
          types: ['product']
        },
        layout: { width: 'medium' }
      },
      {
        name: 'netlify',
        options: {
          title: 'Netlify Deploys',
          sites: [
            {
              title: 'Website',
              apiId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
              buildHookId: 'xxxxxxxxxxxxxxxxxxxxxxxx',
              name: 'demasiadowear'
            }
          ]
        }
      }
    ]
  },
  
  // Configurazione struttura studio
  studio: {
    components: {
      logo: () => {
        return {
          render: () => {
            return {
              elementType: 'div',
              props: {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#39FF14'
                },
                children: [
                  {
                    elementType: 'img',
                    props: {
                      src: '/static/logo.png',
                      alt: 'D3MAS1ADØ',
                      style: {
                        width: '2rem',
                        height: '2rem'
                      }
                    }
                  },
                  {
                    elementType: 'span',
                    props: {
                      children: 'D3MAS1ADØ'
                    }
                  }
                ]
              }
            }
          }
        }
      }
    }
  },
  
  // Configurazione CORS per API
  api: {
    cors: {
      allowOrigins: ['https://www.demasiadowear.com', 'http://localhost:3000'],
      allowCredentials: true,
      allowHeaders: ['Authorization', 'Content-Type'],
      maxAge: 600
    }
  },
  
  // Configurazione autenticazione e utenti
  auth: {
    loginMethod: 'dual',
    providers: {
      mode: 'append',
      redirectOnSingle: false,
      entries: [
        {
          name: 'saml',
          title: 'Single Sign-On',
          url: '/auth/saml/login'
        }
      ]
    }
  },
  
  // Configurazione gestione utenti
  users: {
    // Ruoli personalizzati
    roles: [
      {
        name: 'administrator',
        title: 'Administrator',
        description: 'Accesso completo a tutti i contenuti e impostazioni'
      },
      {
        name: 'editor',
        title: 'Editor',
        description: 'Può modificare tutti i contenuti ma non le impostazioni'
      },
      {
        name: 'contributor',
        title: 'Contributor',
        description: 'Può creare e modificare contenuti ma non pubblicarli'
      }
    ],
    
    // Permessi per ruoli
    permissions: [
      {
        role: 'administrator',
        permissions: [
          {
            resource: 'content',
            access: ['create', 'read', 'update', 'delete', 'publish']
          },
          {
            resource: 'settings',
            access: ['read', 'update']
          },
          {
            resource: 'users',
            access: ['create', 'read', 'update', 'delete']
          }
        ]
      },
      {
        role: 'editor',
        permissions: [
          {
            resource: 'content',
            access: ['create', 'read', 'update', 'delete', 'publish']
          },
          {
            resource: 'settings',
            access: ['read']
          }
        ]
      },
      {
        role: 'contributor',
        permissions: [
          {
            resource: 'content',
            access: ['create', 'read', 'update']
          }
        ]
      }
    ]
  },
  
  // Configurazione documenti
  documents: {
    // Azioni personalizzate
    actions: [
      {
        name: 'publish',
        title: 'Pubblica',
        color: 'success',
        icon: () => '📢',
        shortcut: 'Ctrl+Alt+P'
      },
      {
        name: 'unpublish',
        title: 'Ritira',
        color: 'danger',
        icon: () => '🔒',
        shortcut: 'Ctrl+Alt+U'
      },
      {
        name: 'duplicate',
        title: 'Duplica',
        icon: () => '🔄',
        shortcut: 'Ctrl+Alt+D'
      }
    ]
  },
  
  // Configurazione internazionalizzazione
  i18n: {
    languages: [
      { id: 'it', title: 'Italiano', isDefault: true },
      { id: 'en', title: 'English' }
    ],
    base: 'it',
    withTranslationsMaintenance: true
  }
};

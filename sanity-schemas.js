/* Sanity Schema per D3MAS1ADØ */

// Questo file contiene gli schemi Sanity per il sito D3MAS1ADØ
// Questi schemi possono essere importati direttamente in Sanity Studio

export default [
  // Schema per i prodotti
  {
    name: 'product',
    title: 'Prodotto',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Nome',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'image',
        title: 'Immagine',
        type: 'image',
        options: {
          hotspot: true
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'price',
        title: 'Prezzo',
        type: 'number',
        validation: Rule => Rule.required().min(0)
      },
      {
        name: 'description',
        title: 'Descrizione',
        type: 'text',
        validation: Rule => Rule.required()
      },
      {
        name: 'sizes',
        title: 'Taglie',
        type: 'array',
        of: [{ type: 'string' }],
        options: {
          list: [
            { title: 'XS', value: 'XS' },
            { title: 'S', value: 'S' },
            { title: 'M', value: 'M' },
            { title: 'L', value: 'L' },
            { title: 'XL', value: 'XL' },
            { title: 'XXL', value: 'XXL' }
          ]
        },
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
        name: 'available',
        title: 'Disponibile',
        type: 'boolean',
        initialValue: true
      },
      {
        name: 'preorder',
        title: 'Preordine',
        type: 'boolean',
        initialValue: false
      },
      {
        name: 'stripeProductId',
        title: 'ID Prodotto Stripe',
        type: 'string'
      },
      {
        name: 'stripePriceId',
        title: 'ID Prezzo Stripe',
        type: 'string'
      },
      {
        name: 'order',
        title: 'Ordine',
        type: 'number',
        initialValue: 0
      },
      {
        name: 'locale',
        title: 'Lingua',
        type: 'string',
        options: {
          list: [
            { title: 'Italiano', value: 'it' },
            { title: 'Inglese', value: 'en' }
          ]
        },
        initialValue: 'it'
      }
    ],
    preview: {
      select: {
        title: 'name',
        subtitle: 'collection.name',
        media: 'image'
      }
    }
  },
  
  // Schema per le collezioni
  {
    name: 'collection',
    title: 'Collezione',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Nome',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96
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
        name: 'heroImage',
        title: 'Immagine Hero',
        type: 'image',
        options: {
          hotspot: true
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'order',
        title: 'Ordine',
        type: 'number',
        initialValue: 0
      },
      {
        name: 'locale',
        title: 'Lingua',
        type: 'string',
        options: {
          list: [
            { title: 'Italiano', value: 'it' },
            { title: 'Inglese', value: 'en' }
          ]
        },
        initialValue: 'it'
      }
    ],
    preview: {
      select: {
        title: 'name',
        media: 'heroImage'
      }
    }
  },
  
  // Schema per il lookbook
  {
    name: 'lookbookItem',
    title: 'Elemento Lookbook',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Titolo',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'description',
        title: 'Descrizione',
        type: 'text'
      },
      {
        name: 'isVideo',
        title: 'È un video',
        type: 'boolean',
        initialValue: false
      },
      {
        name: 'image',
        title: 'Immagine',
        type: 'image',
        options: {
          hotspot: true
        },
        hidden: ({ document }) => document?.isVideo
      },
      {
        name: 'video',
        title: 'Video',
        type: 'file',
        options: {
          accept: 'video/*'
        },
        hidden: ({ document }) => !document?.isVideo
      },
      {
        name: 'order',
        title: 'Ordine',
        type: 'number',
        initialValue: 0
      },
      {
        name: 'locale',
        title: 'Lingua',
        type: 'string',
        options: {
          list: [
            { title: 'Italiano', value: 'it' },
            { title: 'Inglese', value: 'en' }
          ]
        },
        initialValue: 'it'
      }
    ],
    preview: {
      select: {
        title: 'title',
        media: 'image'
      }
    }
  },
  
  // Schema per il manifesto
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
        name: 'paragraphs',
        title: 'Paragrafi',
        type: 'array',
        of: [{ type: 'text' }],
        validation: Rule => Rule.required()
      },
      {
        name: 'locale',
        title: 'Lingua',
        type: 'string',
        options: {
          list: [
            { title: 'Italiano', value: 'it' },
            { title: 'Inglese', value: 'en' }
          ]
        },
        initialValue: 'it'
      }
    ],
    preview: {
      select: {
        title: 'title'
      }
    }
  },
  
  // Schema per le risposte della chatbot
  {
    name: 'chatbotResponse',
    title: 'Risposta Chatbot',
    type: 'document',
    fields: [
      {
        name: 'keyword',
        title: 'Parola chiave',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'response',
        title: 'Risposta',
        type: 'text',
        validation: Rule => Rule.required()
      },
      {
        name: 'locale',
        title: 'Lingua',
        type: 'string',
        options: {
          list: [
            { title: 'Italiano', value: 'it' },
            { title: 'Inglese', value: 'en' }
          ]
        },
        initialValue: 'it'
      }
    ],
    preview: {
      select: {
        title: 'keyword',
        subtitle: 'response'
      }
    }
  },
  
  // Schema per le impostazioni del sito
  {
    name: 'siteSettings',
    title: 'Impostazioni Sito',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Titolo Sito',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'description',
        title: 'Descrizione Sito',
        type: 'text',
        validation: Rule => Rule.required()
      },
      {
        name: 'payoff',
        title: 'Payoff',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'footerText',
        title: 'Testo Footer',
        type: 'text'
      },
      {
        name: 'socialLinks',
        title: 'Link Social',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'platform',
                title: 'Piattaforma',
                type: 'string',
                options: {
                  list: [
                    { title: 'Instagram', value: 'instagram' },
                    { title: 'TikTok', value: 'tiktok' },
                    { title: 'Twitter', value: 'twitter' },
                    { title: 'Facebook', value: 'facebook' },
                    { title: 'YouTube', value: 'youtube' }
                  ]
                }
              },
              {
                name: 'url',
                title: 'URL',
                type: 'url'
              }
            ]
          }
        ]
      },
      {
        name: 'contactEmail',
        title: 'Email di Contatto',
        type: 'string'
      },
      {
        name: 'locale',
        title: 'Lingua',
        type: 'string',
        options: {
          list: [
            { title: 'Italiano', value: 'it' },
            { title: 'Inglese', value: 'en' }
          ]
        },
        initialValue: 'it'
      }
    ]
  }
];

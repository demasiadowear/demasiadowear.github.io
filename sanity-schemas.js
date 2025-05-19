/**
 * D3MAS1ADØ - Schemi Sanity
 * Definizione degli schemi per il CMS Sanity
 */

// Schema per la Homepage
export const homepageSchema = {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Titolo Hero',
      type: 'string',
      description: 'Il titolo principale mostrato nella hero section',
      validation: Rule => Rule.required()
    },
    {
      name: 'heroButtons',
      title: 'Pulsanti Hero',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Testo',
              type: 'string'
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'heroVideo',
      title: 'Video Hero',
      type: 'file',
      description: 'Video di sfondo per la hero section'
    },
    {
      name: 'showScrollIndicator',
      title: 'Mostra indicatore scroll',
      type: 'boolean',
      description: 'Attiva/disattiva l\'indicatore di scroll nella hero section'
    }
  ]
};

// Schema per le Collezioni
export const collectionSchema = {
  name: 'collection',
  title: 'Collezione',
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
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      description: 'Breve descrizione della collezione'
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
      name: 'description',
      title: 'Descrizione',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'products',
      title: 'Prodotti',
      type: 'array',
      of: [{type: 'reference', to: {type: 'product'}}]
    }
  ]
};

// Schema per i Prodotti
export const productSchema = {
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
      name: 'price',
      title: 'Prezzo',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'images',
      title: 'Immagini',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'description',
      title: 'Descrizione',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'sizes',
      title: 'Taglie',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'collection',
      title: 'Collezione',
      type: 'reference',
      to: [{type: 'collection'}]
    },
    {
      name: 'inStock',
      title: 'Disponibile',
      type: 'boolean',
      description: 'Indica se il prodotto è disponibile o in preordine'
    }
  ]
};

// Schema per il Lookbook
export const lookbookSchema = {
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
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'string'
    },
    {
      name: 'images',
      title: 'Immagini',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              title: 'Testo alternativo',
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
    },
    {
      name: 'season',
      title: 'Stagione',
      type: 'string'
    }
  ]
};

// Schema per il Manifesto
export const manifestoSchema = {
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
      of: [{type: 'text'}],
      description: 'Paragrafi brevi mostrati nella homepage'
    },
    {
      name: 'fullManifesto',
      title: 'Manifesto completo',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Testo completo del manifesto'
    }
  ]
};

// Schema per le Recensioni
export const reviewSchema = {
  name: 'review',
  title: 'Recensione',
  type: 'document',
  fields: [
    {
      name: 'author',
      title: 'Autore',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'rating',
      title: 'Valutazione',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5)
    },
    {
      name: 'text',
      title: 'Testo',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Data',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'approved',
      title: 'Approvata',
      type: 'boolean',
      description: 'Indica se la recensione è approvata e visibile sul sito'
    }
  ]
};

// Schema per le impostazioni del sito
export const siteSettingsSchema = {
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
      title: 'Descrizione',
      type: 'text',
      description: 'Meta descrizione per SEO'
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true
      }
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
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'TikTok', value: 'tiktok'}
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
      name: 'lanaAiText',
      title: 'Testo Lana AI',
      type: 'text',
      description: 'Testo di presentazione per il chatbot Lana AI'
    }
  ]
};

// Esporta tutti gli schemi
export default [
  homepageSchema,
  collectionSchema,
  productSchema,
  lookbookSchema,
  manifestoSchema,
  reviewSchema,
  siteSettingsSchema
];

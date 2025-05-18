// schemas/siteSettings.js
export default {
  name: 'siteSettings',
  title: 'Impostazioni Sito',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titolo Sito',
      type: 'object',
      fields: [
        {name: 'it', title: 'Italiano', type: 'string'},
        {name: 'en', title: 'English', type: 'string'}
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Descrizione Sito',
      type: 'object',
      fields: [
        {name: 'it', title: 'Italiano', type: 'text', rows: 3},
        {name: 'en', title: 'English', type: 'text', rows: 3}
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'keywords',
      title: 'Parole Chiave',
      type: 'object',
      fields: [
        {name: 'it', title: 'Italiano', type: 'array', of: [{type: 'string'}]},
        {name: 'en', title: 'English', type: 'array', of: [{type: 'string'}]}
      ]
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
      name: 'logoSymbol',
      title: 'Logo Simbolo (Ø)',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'mainNavigation',
      title: 'Menu Principale',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Titolo',
              type: 'object',
              fields: [
                {name: 'it', title: 'Italiano', type: 'string'},
                {name: 'en', title: 'English', type: 'string'}
              ]
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string'
            }
          ],
          preview: {
            select: {
              title: 'title.it',
              subtitle: 'link'
            }
          }
        }
      ]
    },
    {
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        {
          name: 'contactEmail',
          title: 'Email Contatto',
          type: 'string'
        },
        {
          name: 'shopEmail',
          title: 'Email Shop',
          type: 'string'
        },
        {
          name: 'whatsappNumber',
          title: 'Numero WhatsApp',
          type: 'string'
        },
        {
          name: 'socialLinks',
          title: 'Social Media',
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
                      {title: 'Instagram', value: 'instagram'},
                      {title: 'TikTok', value: 'tiktok'},
                      {title: 'Facebook', value: 'facebook'},
                      {title: 'YouTube', value: 'youtube'},
                      {title: 'Altro', value: 'other'}
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
          name: 'copyright',
          title: 'Copyright',
          type: 'object',
          fields: [
            {name: 'it', title: 'Italiano', type: 'string'},
            {name: 'en', title: 'English', type: 'string'}
          ]
        },
        {
          name: 'slogan',
          title: 'Slogan',
          type: 'object',
          fields: [
            {name: 'it', title: 'Italiano', type: 'string'},
            {name: 'en', title: 'English', type: 'string'}
          ]
        }
      ]
    },
    {
      name: 'lanaAI',
      title: 'Lana AI Chatbot',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Attivato',
          type: 'boolean',
          initialValue: true
        },
        {
          name: 'welcomeMessage',
          title: 'Messaggio di Benvenuto',
          type: 'object',
          fields: [
            {name: 'it', title: 'Italiano', type: 'text', rows: 2},
            {name: 'en', title: 'English', type: 'text', rows: 2}
          ]
        },
        {
          name: 'responses',
          title: 'Risposte Predefinite',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'category',
                  title: 'Categoria',
                  type: 'string'
                },
                {
                  name: 'content',
                  title: 'Contenuto',
                  type: 'object',
                  fields: [
                    {name: 'it', title: 'Italiano', type: 'text', rows: 3},
                    {name: 'en', title: 'English', type: 'text', rows: 3}
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string'
        },
        {
          name: 'microsoftClarityId',
          title: 'Microsoft Clarity ID',
          type: 'string'
        }
      ]
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Impostazioni Sito'
      }
    }
  }
}

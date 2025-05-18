// schemas/campaign.js
export default {
  name: 'campaign',
  title: 'Campagne',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'object',
      fields: [
        {name: 'it', title: 'Italiano', type: 'string'},
        {name: 'en', title: 'English', type: 'string'}
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: doc => doc.title?.it || '',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Descrizione',
      type: 'object',
      fields: [
        {
          name: 'it', 
          title: 'Italiano', 
          type: 'array', 
          of: [{type: 'block'}]
        },
        {
          name: 'en', 
          title: 'English', 
          type: 'array', 
          of: [{type: 'block'}]
        }
      ]
    },
    {
      name: 'mainImage',
      title: 'Immagine Principale',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Galleria Immagini',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'caption',
              type: 'object',
              fields: [
                {name: 'it', title: 'Italiano', type: 'string'},
                {name: 'en', title: 'English', type: 'string'}
              ]
            },
            {
              name: 'alt',
              title: 'Testo Alternativo',
              type: 'string',
              description: 'Importante per SEO e accessibilità'
            }
          ]
        }
      ]
    },
    {
      name: 'startDate',
      title: 'Data Inizio',
      type: 'datetime'
    },
    {
      name: 'endDate',
      title: 'Data Fine',
      type: 'datetime'
    },
    {
      name: 'active',
      title: 'Attiva',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'featured',
      title: 'In Evidenza',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'relatedProducts',
      title: 'Prodotti Correlati',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title.it',
      titleEn: 'title.en',
      media: 'mainImage',
      active: 'active'
    },
    prepare({title, titleEn, media, active}) {
      return {
        title: title || titleEn || 'Campagna senza titolo',
        subtitle: `${active ? '✅ Attiva' : '❌ Inattiva'} | EN: ${titleEn || ''}`,
        media
      }
    }
  }
}

// schemas/lookbook.js
export default {
  name: 'lookbook',
  title: 'Lookbook',
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
        {name: 'it', title: 'Italiano', type: 'text', rows: 4},
        {name: 'en', title: 'English', type: 'text', rows: 4}
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
              title: 'Didascalia',
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
      name: 'releaseDate',
      title: 'Data di Pubblicazione',
      type: 'datetime'
    },
    {
      name: 'featured',
      title: 'In Evidenza',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title.it',
      titleEn: 'title.en',
      media: 'mainImage'
    },
    prepare({title, titleEn, media}) {
      return {
        title: title || titleEn || 'Lookbook senza titolo',
        subtitle: title && titleEn ? `EN: ${titleEn}` : '',
        media
      }
    }
  }
}

// schemas/ambassador.js
export default {
  name: 'ambassador',
  title: 'Ambassador',
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
      name: 'bio',
      title: 'Biografia',
      type: 'object',
      fields: [
        {name: 'it', title: 'Italiano', type: 'text', rows: 4},
        {name: 'en', title: 'English', type: 'text', rows: 4}
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'quote',
      title: 'Citazione',
      type: 'object',
      fields: [
        {name: 'it', title: 'Italiano', type: 'text', rows: 2},
        {name: 'en', title: 'English', type: 'text', rows: 2}
      ]
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
      name: 'gallery',
      title: 'Galleria Immagini',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
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
                  {title: 'Twitter', value: 'twitter'},
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
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url'
            }
          }
        }
      ]
    },
    {
      name: 'featured',
      title: 'In Evidenza',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Ordine',
      type: 'number',
      initialValue: 1
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      featured: 'featured'
    },
    prepare({title, media, featured}) {
      return {
        title,
        subtitle: featured ? '✅ In Evidenza' : '',
        media
      }
    }
  }
}

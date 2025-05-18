// schemas/manifesto.js
export default {
  name: 'manifesto',
  title: 'Manifesto',
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
      name: 'content',
      title: 'Contenuto',
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
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Immagine',
      type: 'image',
      options: {
        hotspot: true
      }
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
      title: 'title.it',
      titleEn: 'title.en',
      order: 'order'
    },
    prepare({title, titleEn, order}) {
      return {
        title: title || titleEn || 'Manifesto senza titolo',
        subtitle: `Ordine: ${order || 1} | EN: ${titleEn || ''}`
      }
    }
  }
}

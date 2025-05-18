export default {
  name: 'manifesto',
  title: 'Manifesto',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'content',
      title: 'Contenuto',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string'
            }
          ]
        }
      ],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'audioNarration',
      title: 'Audio Narrazione',
      type: 'file',
      options: {
        accept: 'audio/*'
      }
    }
  ]
}

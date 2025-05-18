export default {
  name: 'lookbook',
  title: 'Lookbook',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'collection',
      title: 'Collezione',
      type: 'reference',
      to: [{ type: 'collection' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'images',
      title: 'Immagini',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
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
      validation: (Rule: any) => Rule.required().min(1)
    }
  ]
}

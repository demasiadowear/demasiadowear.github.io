export default {
  name: 'unidad310',
  title: 'Unidad-31Ø',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title'
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'content',
      title: 'Contenuto',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
        {
          type: 'file',
          fields: [
            {
              name: 'description',
              title: 'Descrizione',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'accessCodes',
      title: 'Codici di Accesso',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'isPreorder',
      title: 'Contiene Preorder',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'preorderProducts',
      title: 'Prodotti in Preorder',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }]
        }
      ],
      hidden: ({ document }: { document: any }) => !document?.isPreorder
    }
  ]
}

export default {
  name: 'collection',
  title: 'Collezioni',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome Collezione',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name'
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Descrizione',
      type: 'text'
    },
    {
      name: 'coverImage',
      title: 'Immagine Copertina',
      type: 'image'
    }
  ]
}

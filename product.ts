export default {
  name: 'product',
  title: 'Prodotti',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nome Prodotto',
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
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'images',
      title: 'Immagini',
      type: 'array',
      of: [{ type: 'image' }],
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'price',
      title: 'Prezzo',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive()
    },
    {
      name: 'collection',
      title: 'Collezione',
      type: 'reference',
      to: [{ type: 'collection' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'sizes',
      title: 'Taglie Disponibili',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
      }
    },
    {
      name: 'status',
      title: 'Stato',
      type: 'string',
      options: {
        list: ['active', 'preorder', 'soldout', 'limited']
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'inventory',
      title: 'Inventario',
      type: 'number',
      validation: (Rule: any) => Rule.min(0)
    }
  ]
}

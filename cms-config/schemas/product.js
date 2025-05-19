// schemas/product.js
export default {
  name: 'product',
  title: 'Prodotti',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
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
      name: 'images',
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
      name: 'description',
      title: 'Descrizione',
      type: 'text',
      rows: 4
    },
    {
      name: 'price',
      title: 'Prezzo',
      type: 'number',
      validation: Rule => Rule.required().positive()
    },
    {
      name: 'sizes',
      title: 'Taglie Disponibili',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'S', value: 'S'},
              {title: 'M', value: 'M'},
              {title: 'L', value: 'L'},
              {title: 'XL', value: 'XL'},
              {title: 'XXL', value: 'XXL'}
            ]
          }
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'inStock',
      title: 'Disponibile',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'featured',
      title: 'In Evidenza',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'releaseDate',
      title: 'Data di Rilascio',
      type: 'datetime'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      price: 'price'
    },
    prepare({title, media, price}) {
      return {
        title,
        subtitle: `€${price}`,
        media
      }
    }
  }
}

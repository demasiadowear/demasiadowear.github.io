import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'your-project-id', // Da sostituire con l'ID progetto Sanity
  dataset: 'production',
  useCdn: true, // `false` se vuoi dati sempre aggiornati
  apiVersion: '2023-05-03', // Usa una data recente
})

// Helper per le URL delle immagini Sanity
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Funzioni di query per i dati
export async function getProducts() {
  return client.fetch(`*[_type == "product"]{
    _id,
    name,
    slug,
    description,
    price,
    "collection": collection->name,
    "collectionSlug": collection->slug.current,
    status,
    inventory,
    sizes,
    "imageUrl": images[0].asset->url
  }`)
}

export async function getProductBySlug(slug: string) {
  return client.fetch(`*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    description,
    price,
    "collection": collection->name,
    "collectionSlug": collection->slug.current,
    status,
    inventory,
    sizes,
    "images": images[]{
      "url": asset->url,
      "alt": asset->altText
    }
  }`, { slug })
}

export async function getCollections() {
  return client.fetch(`*[_type == "collection"]{
    _id,
    name,
    slug,
    description,
    "imageUrl": coverImage.asset->url
  }`)
}

export async function getCollectionBySlug(slug: string) {
  return client.fetch(`*[_type == "collection" && slug.current == $slug][0]{
    _id,
    name,
    slug,
    description,
    "imageUrl": coverImage.asset->url,
    "products": *[_type == "product" && references(^._id)]{
      _id,
      name,
      slug,
      price,
      status,
      "imageUrl": images[0].asset->url
    }
  }`, { slug })
}

export async function getManifesto() {
  return client.fetch(`*[_type == "manifesto"][0]{
    title,
    content,
    "audioUrl": audioNarration.asset->url
  }`)
}

export async function getLookbooks() {
  return client.fetch(`*[_type == "lookbook"]{
    _id,
    title,
    "collection": collection->name,
    "collectionSlug": collection->slug.current,
    "images": images[]{
      "url": asset->url,
      "alt": alt,
      "caption": caption
    }
  }`)
}

export async function getUnidad310Content(accessCode: string) {
  return client.fetch(`*[_type == "unidad310" && $accessCode in accessCodes][0]{
    _id,
    title,
    slug,
    content,
    isPreorder,
    "preorderProducts": preorderProducts[]->{
      _id,
      name,
      slug,
      price,
      "imageUrl": images[0].asset->url
    }
  }`, { accessCode })
}

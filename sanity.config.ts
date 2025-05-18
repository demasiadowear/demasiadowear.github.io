import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'D3MASIADO',
  title: 'D3MAS1ADØ Admin',
  projectId: 'your-project-id', // Da sostituire con l'ID progetto Sanity
  dataset: 'production',
  plugins: [
    deskTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      // Componenti personalizzati per Sanity Studio
    },
  },
})

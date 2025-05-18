// sanity.config.js
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'demasiadowear',
  title: 'D3MAS1ADØ CMS',
  
  projectId: 'placeholder-project-id',
  dataset: 'production',
  
  plugins: [
    deskTool(),
    visionTool()
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  studio: {
    components: {
      logo: () => {
        return (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: '#39FF14'
          }}>
            D3MAS1ADØ
          </div>
        )
      }
    }
  }
})

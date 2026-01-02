import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'avqamki4'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'timber-international-studio',
  title: 'Timber International',

  projectId,
  dataset,

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },

  // Increase file upload limits and configure timeouts
  // Note: Sanity's hard limit is 100MB, but larger files may timeout
  // For files over 50MB, use the public folder + backgroundVideoUrl instead
  form: {
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources
      },
      // directUploads: true enables resumable uploads for better reliability
      directUploads: true,
    },
  },
})

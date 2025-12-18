import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'avqamki4',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
})

async function cleanupSanity() {
  try {
    console.log('🧹 Cleaning up old Sanity documents...\n')

    // Check if we have a write token
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      throw new Error('SANITY_API_WRITE_TOKEN is required.')
    }

    // Fetch all page documents
    const pages = await client.fetch(`*[_type == "page"]`)

    console.log(`Found ${pages.length} page documents to delete\n`)

    // Delete all pages
    for (const page of pages) {
      console.log(`🗑️  Deleting: ${page.title} (${page._id})`)
      await client.delete(page._id)
    }

    console.log('\n✅ Cleanup complete!')
  } catch (error: any) {
    console.error('❌ Error cleaning up Sanity:', error.message)
    process.exit(1)
  }
}

cleanupSanity()

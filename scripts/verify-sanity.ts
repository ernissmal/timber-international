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

async function verifySanity() {
  try {
    console.log('🔍 Verifying Sanity content...\n')
    console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'avqamki4')
    console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')
    console.log()

    // Check if we have a write token
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      throw new Error('SANITY_API_WRITE_TOKEN is required.')
    }

    // Fetch all documents
    console.log('📊 Fetching all documents...')
    const allDocs = await client.fetch(`*[!(_id in path("_.**"))] | order(_type asc) {_id, _type, title}`)

    console.log(`\nTotal documents: ${allDocs.length}\n`)

    if (allDocs.length === 0) {
      console.log('⚠️  NO DOCUMENTS FOUND IN DATASET!')
      console.log('\nPossible issues:')
      console.log('1. Content was created in a different dataset')
      console.log('2. Documents were deleted')
      console.log('3. Wrong project ID or dataset configured')
      return
    }

    // Group by type
    const byType = allDocs.reduce((acc: any, doc: any) => {
      if (!acc[doc._type]) acc[doc._type] = []
      acc[doc._type].push(doc)
      return acc
    }, {})

    console.log('Documents by type:')
    Object.entries(byType).forEach(([type, docs]: [string, any]) => {
      console.log(`\n  ${type}: ${docs.length}`)
      docs.forEach((doc: any) => {
        console.log(`    - ${doc.title || doc._id}`)
      })
    })

    // Fetch one page in detail to check structure
    console.log('\n\n📄 Checking detailed structure of first page...')
    const pages = await client.fetch(`*[_type == "page"] | order(_createdAt asc) [0]`)

    if (pages) {
      console.log('\nFirst page structure:')
      console.log(JSON.stringify(pages, null, 2))
    }

    // Check for schema validation issues
    console.log('\n\n🔍 Checking for validation issues...')
    const pagesWithBlocks = await client.fetch(`*[_type == "page"] {
      title,
      "blockCount": count(blocks),
      "blockTypes": blocks[]._type
    }`)

    console.log('\nPages with blocks:')
    pagesWithBlocks.forEach((page: any) => {
      console.log(`\n  ${page.title}:`)
      console.log(`    Blocks: ${page.blockCount}`)
      console.log(`    Types: ${page.blockTypes?.join(', ')}`)
    })

  } catch (error: any) {
    console.error('\n❌ Error verifying Sanity:', error.message)
    if (error.response) {
      console.error('Response:', error.response)
    }
    process.exit(1)
  }
}

verifySanity()

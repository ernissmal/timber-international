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

// Helper to convert plain text to portable text blocks
function textToPortableText(text: string) {
  return text.split('\n\n').map((paragraph) => ({
    _type: 'block',
    _key: Math.random().toString(36).substring(7),
    style: paragraph.startsWith('**') ? 'normal' : 'normal',
    children: [
      {
        _type: 'span',
        _key: Math.random().toString(36).substring(7),
        text: paragraph,
        marks: [],
      },
    ],
    markDefs: [],
  }))
}

async function fixEditorial() {
  try {
    console.log('🔧 Fixing editorialText blocks...\n')

    // Fetch all pages
    const pages = await client.fetch(`*[_type == "page"] {
      _id,
      title,
      "editorialBlocks": blocks[_type == "editorialText"]
    }`)

    for (const page of pages) {
      if (!page.editorialBlocks || page.editorialBlocks.length === 0) {
        continue
      }

      console.log(`📄 Processing: ${page.title}`)

      // Fetch full page to get all blocks
      const fullPage = await client.fetch(`*[_id == $id][0]`, { id: page._id })

      // Update editorial blocks
      const updatedBlocks = fullPage.blocks.map((block: any) => {
        if (block._type === 'editorialText' && block.content) {
          console.log(`  ✓ Fixing editorialText block: ${block._key}`)

          // Convert plain text content to portable text
          const portableTextContent = textToPortableText(block.content)

          // Return updated block with correct field name and format
          const { content, ...rest } = block
          return {
            ...rest,
            contentLeft: portableTextContent,
          }
        }
        return block
      })

      // Update the page
      await client.patch(page._id).set({ blocks: updatedBlocks }).commit()
      console.log(`  ✅ Updated ${page.title}\n`)
    }

    console.log('🎉 All editorialText blocks fixed!')
  } catch (error: any) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

fixEditorial()

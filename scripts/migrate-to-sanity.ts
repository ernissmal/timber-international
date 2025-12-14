/**
 * Migration script to import MDX content into Sanity
 * Run with: npx ts-node --esm scripts/migrate-to-sanity.ts
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6pfau3iy'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// You need a write token from sanity.io/manage
const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error('Error: SANITY_API_WRITE_TOKEN environment variable is required')
  console.log('Get your token from: https://www.sanity.io/manage/project/6pfau3iy/api#tokens')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const contentDir = path.join(process.cwd(), 'content/pages')

// Map MDX _template values to Sanity _type values
const templateToType: Record<string, string> = {
  hero: 'hero',
  featuresGrid: 'featuresGrid',
  editorialText: 'editorialText',
  imageSection: 'imageSection',
  cta: 'cta',
  stats: 'stats',
  testimonial: 'testimonial',
}

function generateKey(): string {
  return Math.random().toString(36).substring(2, 15)
}

function transformBlock(block: any): any {
  const { _template, ...rest } = block
  const _type = templateToType[_template] || _template

  // Transform the block to Sanity format
  const transformed: any = {
    _type,
    _key: generateKey(),
  }

  // Copy over all fields, transforming as needed
  for (const [key, value] of Object.entries(rest)) {
    if (key === 'backgroundImage' || key === 'image') {
      // Skip image fields for now - they need to be uploaded separately
      // Store the path for reference
      transformed[`${key}Path`] = value
    } else if (key === 'items' && Array.isArray(value)) {
      // Transform nested items (like in featuresGrid)
      transformed.items = value.map((item: any) => ({
        _key: generateKey(),
        title: item.title,
        description: item.description,
        link: item.link,
        // imagePath: item.image, // if images exist in items
      }))
    } else if (key === 'contentLeft' || key === 'contentRight') {
      // Transform text content to portable text
      if (value && typeof value === 'string' && value.trim()) {
        transformed[key] = [
          {
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            markDefs: [],
            children: [
              {
                _type: 'span',
                _key: generateKey(),
                text: value,
                marks: [],
              },
            ],
          },
        ]
      }
    } else {
      transformed[key] = value
    }
  }

  return transformed
}

async function migratePages() {
  console.log('Starting migration...\n')

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx'))

  for (const file of files) {
    const filePath = path.join(contentDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(content)

    const slug = file.replace('.mdx', '')

    console.log(`Processing: ${slug}`)

    // Transform blocks
    const blocks = (data.blocks || []).map(transformBlock)

    // Create the page document
    const pageDoc = {
      _type: 'page',
      _id: `page-${slug}`,
      title: data.title || slug,
      slug: {
        _type: 'slug',
        current: slug,
      },
      description: data.description || '',
      blocks,
      seo: data.seo
        ? {
            title: data.seo.title,
            description: data.seo.description,
          }
        : undefined,
    }

    try {
      const result = await client.createOrReplace(pageDoc)
      console.log(`  ✓ Created/Updated: ${result._id}`)
    } catch (error) {
      console.error(`  ✗ Error creating ${slug}:`, error)
    }
  }

  console.log('\nMigration complete!')
  console.log('\nNote: Images need to be uploaded manually through Sanity Studio.')
  console.log('Image paths have been preserved in fields like "backgroundImagePath".')
}

migratePages().catch(console.error)

/**
 * Verify all required SPA section documents exist in Sanity
 * Run with: npm run verify:sections
 */
import { client } from '../sanity/lib/client'

const REQUIRED_SLUGS = [
  'home',
  'about',
  'oak-slabs',
  'warehouse',
  'products',
  'manufacturing',
  'sustainability',
  'contact'
]

async function verifySections() {
  console.log('Verifying SPA section documents in Sanity...\n')

  const results = await Promise.all(
    REQUIRED_SLUGS.map(async (slug) => {
      try {
        const doc = await client.fetch(
          `*[_type == "page" && slug.current == $slug][0]{ _id, title, "blockCount": count(blocks) }`,
          { slug }
        )
        return {
          slug,
          exists: !!doc,
          title: doc?.title || null,
          blockCount: doc?.blockCount || 0
        }
      } catch (error) {
        return { slug, exists: false, title: null, blockCount: 0, error: String(error) }
      }
    })
  )

  const existing = results.filter(r => r.exists)
  const missing = results.filter(r => !r.exists)

  console.log('✅ Existing documents:')
  existing.forEach(r => {
    console.log(`   ${r.slug}: "${r.title}" (${r.blockCount} blocks)`)
  })

  if (missing.length > 0) {
    console.log('\n❌ Missing documents:')
    missing.forEach(r => {
      console.log(`   ${r.slug}`)
    })
    console.log('\nCreate these documents in Sanity Studio or run: npm run migrate:sanity')
    process.exit(1)
  }

  console.log('\n✅ All required section documents exist!')
}

verifySections().catch(console.error)

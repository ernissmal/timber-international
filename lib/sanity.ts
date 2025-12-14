import { client } from '@/sanity/lib/client'
import { homePageQuery, pageBySlugQuery, allPagesQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

// Types for Sanity page data
export interface SanityBlock {
  _type: string
  _key: string
  [key: string]: any
}

export interface SanityPage {
  _id: string
  title: string
  slug: string
  description?: string
  blocks: SanityBlock[]
  seo?: {
    title?: string
    description?: string
    ogImage?: any
  }
}

// Map Sanity _type to __typename format expected by BlockRenderer
const typeToTypename: Record<string, string> = {
  hero: 'PageBlocksHero',
  featuresGrid: 'PageBlocksFeaturesGrid',
  editorialText: 'PageBlocksEditorialText',
  imageSection: 'PageBlocksImageSection',
  cta: 'PageBlocksCta',
  stats: 'PageBlocksStats',
  testimonial: 'PageBlocksTestimonial',
}

// Transform Sanity blocks to format expected by BlockRenderer
function transformSanityBlocks(blocks: SanityBlock[] | null | undefined): any[] {
  if (!blocks || !Array.isArray(blocks)) return []

  return blocks.map((block) => {
    const { _type, _key, ...rest } = block
    const __typename = typeToTypename[_type] || `PageBlocks${_type.charAt(0).toUpperCase()}${_type.slice(1)}`

    // Transform image fields to URLs
    const transformed: any = {
      __typename,
      _key,
    }

    for (const [key, value] of Object.entries(rest)) {
      if (key === 'backgroundImage' || key === 'image') {
        // Convert Sanity image to URL
        if (value?.asset) {
          transformed[key] = urlFor(value).url()
        } else if (typeof value === 'string') {
          // Already a URL string
          transformed[key] = value
        }
      } else if (key === 'items' && Array.isArray(value)) {
        // Transform items (like in featuresGrid)
        transformed.items = value.map((item: any) => ({
          ...item,
          image: item.image?.asset ? urlFor(item.image).url() : item.image,
        }))
      } else if (key.endsWith('Path')) {
        // Skip path fields (used in migration)
        continue
      } else {
        transformed[key] = value
      }
    }

    return transformed
  })
}

// Fetch page from Sanity
export async function getSanityPage(slug: string): Promise<SanityPage | null> {
  try {
    const isHome = slug === 'home' || slug === '/'
    const query = isHome ? homePageQuery : pageBySlugQuery
    const params = isHome ? {} : { slug }

    const page = await client.fetch<SanityPage>(query, params)

    if (!page) return null

    return {
      ...page,
      blocks: transformSanityBlocks(page.blocks),
    }
  } catch (error) {
    console.error('Error fetching page from Sanity:', error)
    return null
  }
}

// Fetch all pages for static generation
export async function getAllSanityPages(): Promise<{ slug: string }[]> {
  try {
    const pages = await client.fetch<{ slug: string }[]>(allPagesQuery)
    return pages || []
  } catch (error) {
    console.error('Error fetching all pages from Sanity:', error)
    return []
  }
}

// For compatibility with existing TinaPageProps interface
export interface SanityPageProps {
  query: string
  variables: { relativePath: string }
  data: {
    page: {
      __typename: 'Page'
      title: string
      description?: string
      blocks: any[]
      seo?: {
        title?: string
        description?: string
        ogImage?: any
      }
      _sys: any
      id: string
      _values: any
    }
  }
}

// Get page props in TinaCMS-compatible format (for gradual migration)
export async function getPagePropsFromSanity(slug: string): Promise<SanityPageProps | null> {
  const page = await getSanityPage(slug)

  if (!page) return null

  return {
    query: '',
    variables: { relativePath: `${slug}.mdx` },
    data: {
      page: {
        __typename: 'Page',
        title: page.title,
        description: page.description,
        blocks: page.blocks,
        seo: page.seo,
        _sys: {
          filename: slug,
          basename: `${slug}.mdx`,
          breadcrumbs: [slug],
          path: `content/pages/${slug}.mdx`,
          relativePath: `${slug}.mdx`,
          extension: '.mdx',
          template: '',
          collection: {} as any,
        },
        id: page._id,
        _values: {},
      },
    },
  }
}

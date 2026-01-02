import { client } from '@/sanity/lib/client'
import { homePageQuery, pageBySlugQuery, allPagesQuery, allSectionsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

// Types for Sanity page data
export interface SanityBlock {
  _type: string
  _key: string
  [key: string]: any
}

// Transformed block type (after transformSanityBlocks)
export interface PageBlock {
  __typename: string
  _key: string
  [key: string]: any
}

// Raw response from Sanity (before transformation)
export interface RawSanityPage {
  _id: string
  title: string
  slug: string
  description?: string
  blocks: SanityBlock[]  // Raw blocks with _type
  seo?: {
    title?: string
    description?: string
    ogImage?: any
  }
}

// Transformed page (after transformSanityBlocks)
export interface SanityPage {
  _id: string
  title: string
  slug: string
  description?: string
  blocks: PageBlock[]  // Transformed blocks with __typename
  seo?: {
    title?: string
    description?: string
    ogImage?: any
  }
}

// Raw sections data from Sanity (before transformation)
interface RawAllSectionsData {
  hero: RawSanityPage | null
  about: RawSanityPage | null
  oakSlabs: RawSanityPage | null
  warehouse: RawSanityPage | null
  products: RawSanityPage | null
  manufacturing: RawSanityPage | null
  sustainability: RawSanityPage | null
  contact: RawSanityPage | null
}

// Consolidated sections data for SPA (after transformation)
export interface AllSectionsData {
  hero: SanityPage | null
  about: SanityPage | null
  oakSlabs: SanityPage | null
  warehouse: SanityPage | null
  products: SanityPage | null
  manufacturing: SanityPage | null
  sustainability: SanityPage | null
  contact: SanityPage | null
}

// Section component props pattern
export interface SectionProps {
  data: SanityPage | null
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
function transformSanityBlocks(blocks: SanityBlock[] | null | undefined): PageBlock[] {
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

    const page = await client.fetch<RawSanityPage>(query, params)

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

// Empty sections data for error fallback
const emptySections: AllSectionsData = {
  hero: null,
  about: null,
  oakSlabs: null,
  warehouse: null,
  products: null,
  manufacturing: null,
  sustainability: null,
  contact: null,
}

/**
 * Fetches all section data for the SPA in a single query.
 * Returns null for any section that doesn't exist in Sanity.
 * On complete failure, returns empty sections object (all null).
 *
 * Uses existing transformSanityBlocks() for consistent block transformation:
 * - _type → __typename conversion
 * - Image asset refs → URLs via urlFor()
 */
export async function getAllSections(): Promise<AllSectionsData> {
  try {
    const data = await client.fetch<RawAllSectionsData>(allSectionsQuery, {}, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    })

    if (!data) {
      console.warn('getAllSections: No data returned from Sanity')
      return emptySections
    }

    // Transform blocks for each section using EXISTING transformSanityBlocks
    // This function already handles _type → __typename and asset._ref → URL
    const transformSection = (section: RawSanityPage | null): SanityPage | null => {
      if (!section) return null
      return {
        ...section,
        blocks: transformSanityBlocks(section.blocks),
      }
    }

    return {
      hero: transformSection(data.hero),
      about: transformSection(data.about),
      oakSlabs: transformSection(data.oakSlabs),
      warehouse: transformSection(data.warehouse),
      products: transformSection(data.products),
      manufacturing: transformSection(data.manufacturing),
      sustainability: transformSection(data.sustainability),
      contact: transformSection(data.contact),
    }
  } catch (error) {
    console.error('getAllSections: Error fetching sections:', error)
    return emptySections
  }
}

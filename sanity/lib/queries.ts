import { groq } from 'next-sanity'

// Get all pages (for static generation)
export const allPagesQuery = groq`
  *[_type == "page"] {
    "slug": slug.current
  }
`

// Get single page by slug
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    description,
    "slug": slug.current,
    blocks[] {
      _type,
      _key,
      ...,
      // Expand image references
      backgroundImage {
        ...,
        asset->
      },
      image {
        ...,
        asset->
      },
      items[] {
        ...,
        image {
          ...,
          asset->
        }
      }
    },
    seo {
      title,
      description,
      ogImage {
        asset->
      }
    }
  }
`

// Get home page (slug = "home" or first page)
export const homePageQuery = groq`
  *[_type == "page" && (slug.current == "home" || slug.current == "/")][0] {
    _id,
    title,
    description,
    "slug": slug.current,
    blocks[] {
      _type,
      _key,
      ...,
      backgroundImage {
        ...,
        asset->
      },
      image {
        ...,
        asset->
      },
      items[] {
        ...,
        image {
          ...,
          asset->
        }
      }
    },
    seo {
      title,
      description,
      ogImage {
        asset->
      }
    }
  }
`

// Get site settings (if we add a settings document)
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    logo {
      asset->
    },
    navigation[] {
      label,
      href
    },
    footer {
      copyright,
      socialLinks[] {
        platform,
        url
      }
    }
  }
`

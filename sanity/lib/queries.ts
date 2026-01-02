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

// Reusable block projection - matches existing pageBySlugQuery pattern
// NOTE: Images keep asset structure - urlFor() converts to URLs in transform
// NOTE: Videos use file type with asset reference for URL resolution
const blockProjection = `{
  _type,
  _key,
  heading,
  subheading,
  text,
  content,
  eyebrow,
  alignment,
  backgroundColor,
  buttonText,
  buttonLink,
  ctaText,
  ctaLink,
  stats,
  quote,
  author,
  role,
  size,
  overlayPosition,
  backgroundType,
  backgroundImage {
    _type,
    asset,
    alt,
    hotspot,
    crop
  },
  backgroundVideo {
    _type,
    asset->{
      _id,
      url
    }
  },
  videoPoster {
    _type,
    asset,
    alt,
    hotspot,
    crop
  },
  image {
    _type,
    asset,
    alt,
    hotspot,
    crop
  },
  video {
    _type,
    asset->{
      _id,
      url
    }
  },
  items[] {
    _key,
    title,
    description,
    icon,
    stat,
    label,
    value,
    image {
      _type,
      asset,
      alt
    }
  }
}`

// Consolidated query for SPA - fetches all sections at once
// Uses nested seo{} to match existing SanityPage interface
export const allSectionsQuery = groq`{
  "hero": *[_type == "page" && slug.current == "home"][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    seo {
      title,
      description,
      ogImage
    },
    blocks[] ${blockProjection}
  },
  "about": *[_type == "page" && slug.current == "about"][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    seo {
      title,
      description,
      ogImage
    },
    blocks[] ${blockProjection}
  },
  "oakSlabs": *[_type == "page" && slug.current == "oak-slabs"][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    seo {
      title,
      description,
      ogImage
    },
    blocks[] ${blockProjection}
  },
  "warehouse": *[_type == "page" && slug.current == "warehouse"][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    seo {
      title,
      description,
      ogImage
    },
    blocks[] ${blockProjection}
  },
  "products": *[_type == "page" && slug.current == "products"][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    seo {
      title,
      description,
      ogImage
    },
    blocks[] ${blockProjection}
  },
  "manufacturing": *[_type == "page" && slug.current == "manufacturing"][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    seo {
      title,
      description,
      ogImage
    },
    blocks[] ${blockProjection}
  },
  "sustainability": *[_type == "page" && slug.current == "sustainability"][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    seo {
      title,
      description,
      ogImage
    },
    blocks[] ${blockProjection}
  },
  "contact": *[_type == "page" && slug.current == "contact"][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    seo {
      title,
      description,
      ogImage
    },
    blocks[] ${blockProjection}
  }
}`

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

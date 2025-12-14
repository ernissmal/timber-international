'use client'

import Hero from '@/components/Hero'
import { BlockRenderer } from '@/components/blocks'
import type { TinaPageProps } from '@/lib/tina'

// Feature flag: use Sanity mode (no useTina hook needed)
const USE_SANITY = process.env.NEXT_PUBLIC_USE_SANITY === 'true'

export default function HomePageClient(props: TinaPageProps) {
  // When using Sanity, we don't need the useTina hook
  // The data is already fetched and ready to use
  const content = props.data.page

  // If blocks exist, render them using BlockRenderer
  if (content.blocks && content.blocks.length > 0) {
    return <BlockRenderer blocks={content.blocks} />
  }

  // Fallback to legacy hero-based rendering
  return (
    <>
      <Hero
        heading={content.hero?.heading || "Exceptional Design for Modern Living"}
        subheading={content.hero?.subheading || "Where innovation meets craftsmanship"}
        ctaText="Discover Our Work"
        ctaLink="/products"
      />

      {/* Legacy content notice */}
      <section className="content-block bg-yellow-50 py-12">
        <div className="content-narrow text-center">
          <p className="text-yellow-800">
            This page is using legacy content format.
            Please add blocks in the CMS admin to use the new block-based layout.
          </p>
        </div>
      </section>
    </>
  )
}

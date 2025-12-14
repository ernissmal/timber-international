'use client'

import HeroBlock from './HeroBlock'
import FeaturesGridBlock from './FeaturesGridBlock'
import EditorialTextBlock from './EditorialTextBlock'
import ImageSectionBlock from './ImageSectionBlock'
import CTABlock from './CTABlock'
import StatsBlock from './StatsBlock'
import TestimonialBlock from './TestimonialBlock'

// Generic block type that works with both TinaCMS and Sanity data
interface PageBlock {
  __typename: string
  [key: string]: any
}

interface BlockRendererProps {
  blocks: PageBlock[] | null | undefined
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <>
      {blocks.map((block, index) => {
        if (!block) return null

        const key = `block-${index}-${block.__typename}`

        switch (block.__typename) {
          case 'PageBlocksHero':
            return <HeroBlock key={key} data={block as any} />
          case 'PageBlocksFeaturesGrid':
            return <FeaturesGridBlock key={key} data={block as any} />
          case 'PageBlocksEditorialText':
            return <EditorialTextBlock key={key} data={block as any} />
          case 'PageBlocksImageSection':
            return <ImageSectionBlock key={key} data={block as any} />
          case 'PageBlocksCta':
            return <CTABlock key={key} data={block as any} />
          case 'PageBlocksStats':
            return <StatsBlock key={key} data={block as any} />
          case 'PageBlocksTestimonial':
            return <TestimonialBlock key={key} data={block as any} />
          default:
            console.warn(`Unknown block type: ${(block as any).__typename}`)
            return (
              <div key={key} className="p-8 bg-yellow-100 text-yellow-800">
                Unknown block type: {(block as any).__typename}
              </div>
            )
        }
      })}
    </>
  )
}

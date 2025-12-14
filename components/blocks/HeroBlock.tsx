'use client'

import Hero from '@/components/Hero'

interface HeroBlockProps {
  data: {
    heading?: string
    subheading?: string
    ctaText?: string
    ctaLink?: string
    backgroundImage?: string
    size?: string
  }
}

export default function HeroBlock({ data }: HeroBlockProps) {
  return (
    <Hero
      heading={data.heading || 'Welcome'}
      subheading={data.subheading || undefined}
      ctaText={data.ctaText || undefined}
      ctaLink={data.ctaLink || undefined}
      backgroundImage={data.backgroundImage || undefined}
      size={(data.size as 'default' | 'small') || 'default'}
    />
  )
}

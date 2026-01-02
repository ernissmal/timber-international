'use client'

import Hero from '@/components/Hero'

interface HeroBlockProps {
  data: {
    heading?: string
    subheading?: string
    ctaText?: string
    ctaLink?: string
    backgroundImage?: string
    backgroundVideo?: string
    backgroundVideoUrl?: string
    videoPoster?: string
    backgroundType?: 'image' | 'video'
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
      backgroundVideo={data.backgroundVideo || undefined}
      backgroundVideoUrl={data.backgroundVideoUrl || undefined}
      videoPoster={data.videoPoster || undefined}
      backgroundType={(data.backgroundType as 'image' | 'video') || 'image'}
      size={(data.size as 'default' | 'small') || 'default'}
    />
  )
}

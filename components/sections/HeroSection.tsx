'use client'

import { BlockRenderer } from '@/components/blocks'
import type { SanityPage } from '@/lib/sanity'

interface HeroSectionProps {
  data: SanityPage | null
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section id="hero" className="scroll-mt-20" aria-label="Hero">
      {data?.blocks && data.blocks.length > 0 ? (
        <BlockRenderer blocks={data.blocks as any} />
      ) : (
        // Inline fallback - don't use Hero component because it uses <Link> for CTA
        // which doesn't work correctly with anchor hrefs like "#contact"
        <div className="h-[90vh] relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-moooi-cream via-moooi-sand to-moooi-gold opacity-30" />
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in">
              Industrial Timber Supply You Can Build Your Business On
            </h1>
            <p className="text-xl md:text-2xl text-moooi-slate mb-8 animate-slide-up">
              Your supply chain doesn't have room for inconsistency. Precision-manufactured solid oak furniture components with documented quality standards.
            </p>
            <a
              href="#contact"
              className="inline-block bg-moooi-charcoal text-white px-10 py-4 rounded-full font-medium hover:bg-moooi-gold hover:text-moooi-charcoal transition-all duration-300 transform hover:scale-105"
            >
              Request a Quote
            </a>
          </div>
        </div>
      )}
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { BlockRenderer } from '@/components/blocks'
import type { SanityPage } from '@/lib/sanity'

interface AboutSectionProps {
  data: SanityPage | null
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className="scroll-mt-20" aria-label="About Us">
      {data?.blocks && data.blocks.length > 0 ? (
        <BlockRenderer blocks={data.blocks as any} />
      ) : (
        <div className="py-20 px-6 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              About Timber International
            </h2>
            <p className="text-xl text-moooi-slate">
              A partnership-driven timber manufacturer committed to reliability and quality.
              We scaled our operations to meet industrial demand while maintaining
              the craftsmanship standards our partners depend on.
            </p>
          </motion.div>
        </div>
      )}
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { BlockRenderer } from '@/components/blocks'
import type { SanityPage } from '@/lib/sanity'

interface SustainabilitySectionProps {
  data: SanityPage | null
}

export default function SustainabilitySection({ data }: SustainabilitySectionProps) {
  return (
    <section id="sustainability" className="scroll-mt-20 bg-moooi-sand" aria-label="Sustainability">
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
              Responsible Sourcing
            </h2>
            <p className="text-xl text-moooi-slate mb-8">
              FSC certified timber from responsibly managed forests.
              Complete chain of custody documentation for compliance requirements.
            </p>
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="bg-white px-6 py-3 rounded-full font-medium">
                FSC Certified
              </div>
              <div className="bg-white px-6 py-3 rounded-full font-medium">
                PEFC Available
              </div>
              <div className="bg-white px-6 py-3 rounded-full font-medium">
                EU Timber Regulation
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}

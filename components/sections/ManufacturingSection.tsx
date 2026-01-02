'use client'

import { motion } from 'framer-motion'
import { BlockRenderer } from '@/components/blocks'
import type { SanityPage } from '@/lib/sanity'

interface ManufacturingSectionProps {
  data: SanityPage | null
}

export default function ManufacturingSection({ data }: ManufacturingSectionProps) {
  return (
    <section id="manufacturing" className="scroll-mt-20" aria-label="Manufacturing">
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
              Manufacturing Excellence
            </h2>
            <p className="text-xl text-moooi-slate">
              State-of-the-art CNC machinery and skilled craftsmen ensure every component
              meets your exact specifications. Quality control at every step, from raw
              material to finished product.
            </p>
          </motion.div>
        </div>
      )}
    </section>
  )
}

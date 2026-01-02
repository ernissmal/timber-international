'use client'

import { motion } from 'framer-motion'
import { BlockRenderer } from '@/components/blocks'
import type { SanityPage } from '@/lib/sanity'

interface OakSlabsSectionProps {
  data: SanityPage | null
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
}

export default function OakSlabsSection({ data }: OakSlabsSectionProps) {
  return (
    <section id="oak-slabs" className="scroll-mt-20 bg-moooi-sand" aria-label="Oak Slabs">
      {data?.blocks && data.blocks.length > 0 ? (
        <BlockRenderer blocks={data.blocks as any} />
      ) : (
        <div className="py-20 px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Solid Oak. Industrial Scale.
            </h2>
            <p className="text-xl text-moooi-slate max-w-3xl mx-auto">
              Premium solid oak slabs manufactured to your specifications.
              Consistent quality, reliable supply, competitive pricing.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Custom Dimensions</h3>
              <p className="text-moooi-slate">
                Cut to your exact specifications with precision CNC machinery.
                Tolerances within ±0.5mm.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Kiln Dried</h3>
              <p className="text-moooi-slate">
                Moisture content controlled to 8-12% for stability and longevity.
                Documented drying records available.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4">FSC Certified</h3>
              <p className="text-moooi-slate">
                Responsibly sourced from sustainable European forests.
                Chain of custody documentation provided.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <a
              href="#contact"
              className="inline-block bg-moooi-gold text-white px-8 py-4 rounded-full font-medium hover:bg-moooi-gold/90 transition-colors"
            >
              Request Specifications
            </a>
          </motion.div>
        </div>
      )}
    </section>
  )
}

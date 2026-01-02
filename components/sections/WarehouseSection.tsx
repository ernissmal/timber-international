'use client'

import { motion } from 'framer-motion'
import { BlockRenderer } from '@/components/blocks'
import { Warehouse, Truck, Clock } from 'lucide-react'
import type { SanityPage } from '@/lib/sanity'

interface WarehouseSectionProps {
  data: SanityPage | null
}

const features = [
  {
    icon: Warehouse,
    title: '10,000m² Storage',
    description: 'Climate-controlled facilities for optimal timber preservation.'
  },
  {
    icon: Truck,
    title: 'Pan-European Delivery',
    description: 'Reliable logistics network covering all major markets.'
  },
  {
    icon: Clock,
    title: '48-Hour Dispatch',
    description: 'In-stock items shipped within 2 business days.'
  }
]

export default function WarehouseSection({ data }: WarehouseSectionProps) {
  return (
    <section id="warehouse" className="scroll-mt-20" aria-label="Warehouse">
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
              Storage & Logistics Excellence
            </h2>
            <p className="text-xl text-moooi-slate max-w-3xl mx-auto">
              Modern warehouse facilities ensure your timber is stored properly
              and shipped efficiently to meet your production schedules.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center p-8"
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-moooi-gold" />
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-moooi-slate">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

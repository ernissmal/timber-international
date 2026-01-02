'use client'

import { motion } from 'framer-motion'
import { BlockRenderer } from '@/components/blocks'
import ContactForm from '@/components/ContactForm'
import type { SanityPage } from '@/lib/sanity'

interface ContactSectionProps {
  data: SanityPage | null
}

export default function ContactSection({ data }: ContactSectionProps) {
  return (
    <section id="contact" className="scroll-mt-20" aria-label="Contact">
      {data?.blocks && data.blocks.length > 0 ? (
        <BlockRenderer blocks={data.blocks as any} />
      ) : (
        <div className="py-20 px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-center">
              Let's Discuss Your Requirements
            </h2>
            <p className="text-xl text-moooi-slate mb-12 text-center">
              Tell us about your project and we'll prepare a detailed quote.
            </p>
            <ContactForm />
          </motion.div>
        </div>
      )}
    </section>
  )
}

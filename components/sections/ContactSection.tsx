'use client'

import { motion } from 'framer-motion'
import { BlockRenderer } from '@/components/blocks'
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
        <div className="py-20 px-6 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-moooi-slate mb-8">
              Ready to discuss your timber component requirements? Our team is here
              to provide quotes, technical specifications, and delivery timelines.
            </p>
            <a
              href="mailto:info@timber-international.com"
              className="inline-block bg-moooi-charcoal text-white px-10 py-4 rounded-full font-medium hover:bg-moooi-gold hover:text-moooi-charcoal transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      )}
    </section>
  )
}

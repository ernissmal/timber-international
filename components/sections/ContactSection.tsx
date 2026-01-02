'use client'

import { motion } from 'framer-motion'
import { BlockRenderer } from '@/components/blocks'
import type { SanityPage } from '@/lib/sanity'
import MaterialIcon from '@/components/MaterialIcon'

interface ContactSectionProps {
  data: SanityPage | null
}

export default function ContactSection({ data }: ContactSectionProps) {
  return (
    <section id="contact" className="scroll-mt-20" aria-label="Contact">
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
            <MaterialIcon name="handshake" size="2xl" className="text-moooi-gold mb-6" />
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-moooi-slate max-w-2xl mx-auto">
              Ready to discuss your timber component requirements? Our team is here
              to provide quotes, technical specifications, and delivery timelines.
            </p>
          </motion.div>

          {/* Contact Info Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-8 bg-white rounded-2xl shadow-sm"
            >
              <MaterialIcon name="mail" size="lg" className="text-moooi-gold mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <a href="mailto:info@timber-international.com" className="text-moooi-slate hover:text-moooi-gold transition-colors">
                info@timber-international.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-8 bg-white rounded-2xl shadow-sm"
            >
              <MaterialIcon name="call" size="lg" className="text-moooi-gold mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <a href="tel:+371123456789" className="text-moooi-slate hover:text-moooi-gold transition-colors">
                +371 123 456 789
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-8 bg-white rounded-2xl shadow-sm"
            >
              <MaterialIcon name="location_on" size="lg" className="text-moooi-gold mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-moooi-slate">
                Riga, Latvia
              </p>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <a
              href="mailto:info@timber-international.com"
              className="inline-flex items-center gap-3 bg-moooi-charcoal text-white px-10 py-4 rounded-full font-medium hover:bg-moooi-gold hover:text-moooi-charcoal transition-all duration-300 transform hover:scale-105"
            >
              <MaterialIcon name="mail" size="md" />
              Contact Us
            </a>
          </motion.div>
        </div>
      )}
    </section>
  )
}

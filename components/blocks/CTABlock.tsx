'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface CTABlockProps {
  data: {
    heading?: string
    subheading?: string
    text?: string
    buttonText?: string
    buttonLink?: string
    theme?: string
    variant?: string
  }
}

export default function CTABlock({ data }: CTABlockProps) {
  const isDark = data.theme === 'dark'

  return (
    <section
      className={`content-block py-40 ${
        isDark ? 'bg-black text-white' : 'bg-cream text-black'
      }`}
    >
      <div className="content-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {data.heading && (
            <h2 className="display-large mb-8">{data.heading}</h2>
          )}

          {data.subheading && (
            <p
              className={`text-xl md:text-2xl mb-12 max-w-2xl mx-auto ${
                isDark ? 'text-white/80' : 'text-gray-600'
              }`}
            >
              {data.subheading}
            </p>
          )}

          {data.buttonText && data.buttonLink && (
            <Link
              href={data.buttonLink}
              className={`inline-block px-12 py-5 border-2 text-lg font-semibold transition-all duration-500 ${
                isDark
                  ? 'border-white text-white hover:bg-white hover:text-black'
                  : 'border-black text-black hover:bg-black hover:text-white'
              }`}
            >
              {data.buttonText}
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  )
}

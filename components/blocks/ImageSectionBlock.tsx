'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

interface ImageSectionBlockProps {
  data: {
    heading?: string
    text?: string
    image?: string
    videoSrc?: string
    ctaText?: string
    ctaLink?: string
    overlayPosition?: string
    theme?: string
  }
}

export default function ImageSectionBlock({ data }: ImageSectionBlockProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const theme = data.theme || 'light'
  const glassClass = theme === 'dark' ? 'glass-dark text-white' : 'glass-light'

  const positionClass = {
    center: 'items-center justify-center',
    'bottom-left': 'items-end justify-start',
    'bottom-right': 'items-end justify-end',
  }[data.overlayPosition || 'bottom-left'] || 'items-end justify-start'

  return (
    <section ref={ref} className="section-fullscreen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {data.videoSrc ? (
          <motion.video
            style={{ y }}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={data.videoSrc} type="video/mp4" />
          </motion.video>
        ) : data.image ? (
          <motion.div
            style={{ y }}
            className="w-full h-full"
          >
            <img
              src={data.image}
              alt={data.heading || 'Section image'}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
            <span className="text-2xl">Image/Video</span>
          </div>
        )}
      </div>

      {/* Overlay Content */}
      {(data.heading || data.text || data.ctaText) && (
        <div className={`relative z-10 content-block content-wide flex min-h-screen ${positionClass}`}>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className={`${glassClass} rounded-3xl p-12 md:p-16 max-w-2xl`}
          >
            {data.heading && (
              <h2 className="display-large mb-8">{data.heading}</h2>
            )}

            {data.text && (
              <p className={`text-xl md:text-2xl mb-8 leading-relaxed ${theme === 'dark' ? 'opacity-90' : ''}`}>
                {data.text}
              </p>
            )}

            {data.ctaText && data.ctaLink && (
              <Link
                href={data.ctaLink}
                className={`inline-block px-10 py-4 border-2 font-semibold transition-all duration-500 ${
                  theme === 'dark'
                    ? 'border-white text-white hover:bg-white hover:text-black'
                    : 'border-black text-black hover:bg-black hover:text-white'
                }`}
              >
                {data.ctaText}
              </Link>
            )}
          </motion.div>
        </div>
      )}
    </section>
  )
}

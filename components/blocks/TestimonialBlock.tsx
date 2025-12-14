'use client'

import { motion } from 'framer-motion'

interface TestimonialBlockProps {
  data: {
    quote?: string
    author?: string
    role?: string
    authorImage?: string
    image?: string
    backgroundColor?: string
    layout?: string
  }
}

export default function TestimonialBlock({ data }: TestimonialBlockProps) {
  const bgColor = {
    white: 'bg-white',
    cream: 'bg-off-white',
    black: 'bg-black text-white',
  }[data.backgroundColor || 'cream'] || 'bg-off-white'

  const isDark = data.backgroundColor === 'black'

  return (
    <section className={`content-block ${bgColor} py-32`}>
      <div className="content-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          {/* Quote Icon */}
          <div
            className={`text-6xl mb-8 ${isDark ? 'text-white/20' : 'text-gray-200'}`}
          >
            "
          </div>

          {/* Quote */}
          <blockquote
            className={`text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed mb-12 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}
          >
            {data.quote}
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-center gap-4">
            {data.authorImage && (
              <img
                src={data.authorImage}
                alt={data.author}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div className="text-left">
              <div className="font-semibold text-lg">{data.author}</div>
              {data.role && (
                <div
                  className={`${isDark ? 'text-white/70' : 'text-gray-600'}`}
                >
                  {data.role}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

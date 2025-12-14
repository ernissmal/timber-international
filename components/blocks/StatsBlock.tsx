'use client'

import { motion } from 'framer-motion'

interface StatItem {
  value?: string
  label?: string
  suffix?: string
}

interface StatsBlockProps {
  data: {
    heading?: string
    backgroundColor?: string
    items?: StatItem[]
  }
}

export default function StatsBlock({ data }: StatsBlockProps) {
  const bgColor = {
    white: 'bg-white',
    cream: 'bg-off-white',
    black: 'bg-black text-white',
  }[data.backgroundColor || 'white'] || 'bg-white'

  const isDark = data.backgroundColor === 'black'

  return (
    <section className={`content-block ${bgColor} py-24`}>
      <div className="content-wide">
        {data.heading && (
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="display-medium mb-16 text-center"
          >
            {data.heading}
          </motion.h2>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {data.items?.map((item, index) => {
            if (!item) return null

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold mb-2">
                  {item.value}
                </div>
                <div
                  className={`text-lg ${
                    isDark ? 'text-white/70' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

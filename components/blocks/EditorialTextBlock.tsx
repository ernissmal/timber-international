'use client'

import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'

// Generic props type that works with both TinaCMS and Sanity
interface EditorialTextBlockProps {
  data: {
    heading?: string
    layout?: string
    backgroundColor?: string
    contentLeft?: any
    contentRight?: any
  }
}

// Helper to render rich text (supports both Sanity Portable Text and plain strings)
function RichTextContent({ content }: { content: any }) {
  if (!content) return null

  // If it's an array (Sanity Portable Text)
  if (Array.isArray(content)) {
    return <PortableText value={content} />
  }

  // If it's a string
  if (typeof content === 'string') {
    return <p>{content}</p>
  }

  return null
}

export default function EditorialTextBlock({ data }: EditorialTextBlockProps) {
  const bgColor = {
    white: 'bg-white',
    cream: 'bg-off-white',
    black: 'bg-black text-white',
  }[data.backgroundColor || 'cream'] || 'bg-off-white'

  const isTwoColumn = data.layout === 'two-column'

  return (
    <section className={`content-block ${bgColor}`}>
      <div className="content-narrow py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {data.heading && (
            <h2 className="display-medium mb-12">{data.heading}</h2>
          )}

          <div
            className={`${
              isTwoColumn ? 'grid md:grid-cols-2 gap-12' : ''
            } text-lg leading-relaxed ${
              data.backgroundColor === 'black' ? 'text-white/80' : 'text-gray-600'
            }`}
          >
            {data.contentLeft && (
              <div className="prose prose-lg max-w-none">
                <RichTextContent content={data.contentLeft} />
              </div>
            )}

            {isTwoColumn && data.contentRight && (
              <div className="prose prose-lg max-w-none">
                <RichTextContent content={data.contentRight} />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

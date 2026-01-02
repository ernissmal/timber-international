'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Box } from 'lucide-react'
import MaterialIcon from '@/components/MaterialIcon'

interface FeatureItem {
  title?: string
  description?: string
  icon?: string
  image?: string
  link?: string
}

interface FeaturesGridBlockProps {
  data: {
    heading?: string
    columns?: string
    items?: FeatureItem[]
  }
}

// Material icon names (lowercase with underscores)
const materialIconNames = [
  'forest', 'park', 'eco', 'nature', 'yard',
  'factory', 'precision_manufacturing', 'construction', 'carpenter',
  'handshake', 'mail', 'call', 'location_on', 'schedule', 'business', 'groups', 'person', 'support_agent',
  'local_shipping', 'inventory_2', 'warehouse', 'package_2',
  'check_circle', 'verified', 'star', 'thumb_up', 'workspace_premium',
  'speed', 'security', 'savings', 'trending_up', 'insights',
]

// Check if icon name is a Material icon
function isMaterialIcon(name: string): boolean {
  return materialIconNames.includes(name)
}

// Dynamic icon component - supports Material Icons
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  if (isMaterialIcon(name)) {
    return <MaterialIcon name={name} size="xl" className={className} />
  }
  // Fallback for unknown icons
  return <MaterialIcon name="help" size="xl" className={className} />
}

export default function FeaturesGridBlock({ data }: FeaturesGridBlockProps) {
  // Auto-detect columns based on item count if not explicitly set
  const itemCount = data.items?.length || 0
  const autoColumns = itemCount === 4 ? '4' : itemCount === 2 ? '2' : '3'
  const columns = data.columns || autoColumns

  const gridCols = {
    '2': 'sm:grid-cols-2',
    '3': 'sm:grid-cols-2 lg:grid-cols-3',
    '4': 'sm:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section className="content-block content-wide py-32">
      {data.heading && (
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="display-medium mb-20"
        >
          {data.heading}
        </motion.h2>
      )}

      <div className={`grid ${gridCols} gap-12`}>
        {data.items?.map((item, index) => {
          if (!item) return null

          const content = (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={item.link ? 'group block hover-lift' : ''}
            >
              <div className="aspect-square bg-cream mb-6 flex items-center justify-center hover-scale overflow-hidden rounded-2xl">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : item.icon ? (
                  <DynamicIcon name={item.icon} className="text-moooi-charcoal group-hover:text-moooi-gold transition-colors duration-300" />
                ) : (
                  <Box className="w-24 h-24 text-gray-400" />
                )}
              </div>
              <h3 className="text-3xl font-bold mb-4 group-hover:text-gray-600 transition-colors">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-gray-600 text-lg leading-relaxed">
                  {item.description}
                </p>
              )}
            </motion.div>
          )

          if (item.link) {
            return (
              <Link key={index} href={item.link}>
                {content}
              </Link>
            )
          }

          return <div key={index}>{content}</div>
        })}
      </div>
    </section>
  )
}

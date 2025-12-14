'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  // Default/fallback icons
  HelpCircle,
  Box,
  // Product icons
  Grid3x3,
  Armchair,
  Layers,
  Cpu,
  Square,
  // Sustainability icons
  TreePine,
  Infinity,
  CheckCircle,
  Leaf,
  // Contact icons
  MapPin,
  Mail,
  Phone,
  // About icons
  Shield,
  History,
  Heart,
  // Home page icons
  Handshake,
  TreeDeciduous,
  // Manufacturing icons
  Clock,
  Maximize,
  Wallet,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

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

// Map icon names to actual components
const iconMap: Record<string, LucideIcon> = {
  // Default/fallback
  HelpCircle,
  Box,
  // Product icons
  Grid3x3,
  Armchair,
  Layers,
  Cpu,
  Square,
  // Sustainability icons
  TreePine,
  Infinity,
  CheckCircle,
  Leaf,
  // Contact icons
  MapPin,
  Mail,
  Phone,
  // About icons
  Shield,
  History,
  Heart,
  // Home page icons
  Handshake,
  TreeDeciduous,
  // Manufacturing icons
  Clock,
  Maximize,
  Wallet,
}

// Dynamic icon component
function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = iconMap[name]
  if (!IconComponent) {
    console.warn(`Icon not found: ${name}`)
    return <HelpCircle className={className} />
  }
  return <IconComponent className={className} />
}

export default function FeaturesGridBlock({ data }: FeaturesGridBlockProps) {
  const columns = data.columns || '3'
  const gridCols = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-4',
  }[columns] || 'md:grid-cols-3'

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
                  <DynamicIcon name={item.icon} className="w-16 h-16 text-moooi-charcoal group-hover:text-moooi-gold transition-colors duration-300" />
                ) : (
                  <Box className="w-16 h-16 text-gray-400" />
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

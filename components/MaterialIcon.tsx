interface MaterialIconProps {
  name: string
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  filled?: boolean
}

const sizeClasses = {
  sm: 'text-5xl',
  md: 'text-6xl',
  lg: 'text-7xl',
  xl: 'text-8xl',
  '2xl': 'text-9xl',
}

/**
 * Material Symbols Icon Component
 *
 * Usage:
 *   <MaterialIcon name="handshake" />
 *   <MaterialIcon name="mail" size="lg" className="text-moooi-gold" />
 *   <MaterialIcon name="factory" filled />
 *
 * Find icons at: https://fonts.google.com/icons
 *
 * Common B2B/Timber icons:
 *   - handshake, mail, call, location_on, schedule
 *   - factory, local_shipping, inventory_2, warehouse
 *   - forest, park, eco, nature, yard
 *   - precision_manufacturing, construction, carpenter
 *   - business, groups, person, support_agent
 *   - check_circle, verified, star, thumb_up
 */
export default function MaterialIcon({
  name,
  className = '',
  size = 'md',
  filled = false
}: MaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined ${sizeClasses[size]} ${className}`}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
      aria-hidden="true"
    >
      {name}
    </span>
  )
}

// Pre-defined icon sets for common use cases
export const TIMBER_ICONS = {
  // Nature & Wood
  forest: 'forest',
  park: 'park',
  eco: 'eco',
  nature: 'nature',
  yard: 'yard',

  // Manufacturing
  factory: 'factory',
  precision_manufacturing: 'precision_manufacturing',
  construction: 'construction',
  carpenter: 'carpenter',

  // Business & Contact
  handshake: 'handshake',
  mail: 'mail',
  call: 'call',
  location_on: 'location_on',
  schedule: 'schedule',
  business: 'business',
  groups: 'groups',
  person: 'person',
  support_agent: 'support_agent',

  // Logistics
  local_shipping: 'local_shipping',
  inventory_2: 'inventory_2',
  warehouse: 'warehouse',
  package_2: 'package_2',

  // Quality & Trust
  check_circle: 'check_circle',
  verified: 'verified',
  star: 'star',
  thumb_up: 'thumb_up',
  workspace_premium: 'workspace_premium',

  // Features
  speed: 'speed',
  security: 'security',
  savings: 'savings',
  trending_up: 'trending_up',
  insights: 'insights',
} as const

export type TimberIconName = keyof typeof TIMBER_ICONS

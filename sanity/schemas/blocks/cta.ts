import { defineType, defineField } from 'sanity'

// Shared icon list for reuse across schemas
export const materialIconOptions = [
  // Nature & Wood
  { title: '🌲 Forest', value: 'forest' },
  { title: '🌳 Park', value: 'park' },
  { title: '🌿 Eco', value: 'eco' },
  { title: '🍃 Nature', value: 'nature' },
  { title: '🌱 Yard', value: 'yard' },
  // Manufacturing
  { title: '🏭 Factory', value: 'factory' },
  { title: '⚙️ Precision Manufacturing', value: 'precision_manufacturing' },
  { title: '🔨 Construction', value: 'construction' },
  { title: '🪚 Carpenter', value: 'carpenter' },
  // Business & Contact
  { title: '🤝 Handshake', value: 'handshake' },
  { title: '✉️ Mail', value: 'mail' },
  { title: '📞 Call', value: 'call' },
  { title: '📍 Location', value: 'location_on' },
  { title: '🕐 Schedule', value: 'schedule' },
  { title: '🏢 Business', value: 'business' },
  { title: '👥 Groups', value: 'groups' },
  { title: '👤 Person', value: 'person' },
  { title: '🎧 Support Agent', value: 'support_agent' },
  // Logistics
  { title: '🚚 Shipping', value: 'local_shipping' },
  { title: '📦 Inventory', value: 'inventory_2' },
  { title: '🏬 Warehouse', value: 'warehouse' },
  { title: '📦 Package', value: 'package_2' },
  // Quality & Trust
  { title: '✅ Check Circle', value: 'check_circle' },
  { title: '✓ Verified', value: 'verified' },
  { title: '⭐ Star', value: 'star' },
  { title: '👍 Thumb Up', value: 'thumb_up' },
  { title: '🏆 Premium', value: 'workspace_premium' },
  // Features
  { title: '⚡ Speed', value: 'speed' },
  { title: '🔒 Security', value: 'security' },
  { title: '💰 Savings', value: 'savings' },
  { title: '📈 Trending Up', value: 'trending_up' },
  { title: '💡 Insights', value: 'insights' },
]

export default defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon (optional)',
      type: 'string',
      options: {
        list: materialIconOptions,
      },
      description: 'Optional icon displayed above the heading',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
    }),
    defineField({
      name: 'variant',
      title: 'Style Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Light (White Background)', value: 'light' },
          { title: 'Dark (Black Background)', value: 'dark' },
        ],
      },
      initialValue: 'light',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'CTA Section',
        subtitle: 'Call to Action',
      }
    },
  },
})

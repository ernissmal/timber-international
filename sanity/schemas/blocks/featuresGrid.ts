import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'featuresGrid',
  title: 'Features Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'Optional heading above the grid',
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'string',
      options: {
        list: [
          { title: '2 Columns', value: '2' },
          { title: '3 Columns', value: '3' },
          { title: '4 Columns', value: '4' },
        ],
      },
      initialValue: '3',
      description: 'Number of columns on desktop',
    }),
    defineField({
      name: 'items',
      title: 'Feature Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'icon',
              title: 'Material Icon',
              type: 'string',
              options: {
                list: [
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
                ],
              },
              description: 'Select a Material icon. Browse all at fonts.google.com/icons',
            }),
            defineField({
              name: 'image',
              title: 'Image (optional)',
              type: 'image',
              options: { hotspot: true },
              description: 'Optional image. If provided, overrides the icon.',
            }),
            defineField({
              name: 'link',
              title: 'Link URL',
              type: 'string',
              description: 'Optional link for the feature card',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      items: 'items',
    },
    prepare({ title, items }) {
      return {
        title: title || 'Features Grid',
        subtitle: `${items?.length || 0} items`,
      }
    },
  },
})

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'editorialText',
  title: 'Editorial Text Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Single Column', value: 'single' },
          { title: 'Two Columns', value: 'two-column' },
        ],
      },
      initialValue: 'single',
    }),
    defineField({
      name: 'contentLeft',
      title: 'Content (Left/Main)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Main text content or left column',
    }),
    defineField({
      name: 'contentRight',
      title: 'Content (Right)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Right column content (only for two-column layout)',
    }),
    defineField({
      name: 'backgroundType',
      title: 'Background Type',
      type: 'string',
      options: {
        list: [
          { title: 'Solid Color', value: 'color' },
          { title: 'Image', value: 'image' },
        ],
        layout: 'radio',
      },
      initialValue: 'color',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Cream', value: 'cream' },
          { title: 'Black', value: 'black' },
        ],
      },
      initialValue: 'white',
      hidden: ({ parent }) => parent?.backgroundType === 'image',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Full-width background image',
      hidden: ({ parent }) => parent?.backgroundType !== 'image',
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay Opacity',
      type: 'number',
      description: 'Dark overlay opacity (0-100) to improve text readability',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 50,
      hidden: ({ parent }) => parent?.backgroundType !== 'image',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Editorial Text',
        subtitle: 'Editorial Text',
      }
    },
  },
})

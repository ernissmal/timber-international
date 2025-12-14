import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'imageSection',
  title: 'Full-Width Image Section',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Required unless using a video background',
    }),
    defineField({
      name: 'heading',
      title: 'Overlay Heading',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Overlay Text',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
    }),
    defineField({
      name: 'overlayPosition',
      title: 'Content Position',
      type: 'string',
      options: {
        list: [
          { title: 'Center', value: 'center' },
          { title: 'Bottom Left', value: 'bottom-left' },
          { title: 'Bottom Right', value: 'bottom-right' },
        ],
      },
      initialValue: 'center',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Image Section',
        subtitle: 'Image Section',
        media,
      }
    },
  },
})

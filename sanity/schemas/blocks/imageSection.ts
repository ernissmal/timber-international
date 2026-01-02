import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'imageSection',
  title: 'Full-Width Media Section',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundType',
      title: 'Background Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      description: 'Choose between image or video background',
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Full-width background image',
      hidden: ({ parent }) => parent?.backgroundType === 'video',
    }),
    defineField({
      name: 'video',
      title: 'Background Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Full-width background video (MP4 recommended)',
      hidden: ({ parent }) => parent?.backgroundType !== 'video',
    }),
    defineField({
      name: 'videoPoster',
      title: 'Video Poster Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Fallback image shown while video loads',
      hidden: ({ parent }) => parent?.backgroundType !== 'video',
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
      backgroundType: 'backgroundType',
    },
    prepare({ title, media, backgroundType }) {
      return {
        title: title || 'Media Section',
        subtitle: `Media Section (${backgroundType === 'video' ? 'Video' : 'Image'})`,
        media,
      }
    },
  },
})

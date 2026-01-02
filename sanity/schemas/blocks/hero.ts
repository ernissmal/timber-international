import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main headline text (5-10 words for impact)',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
      description: 'Supporting text below the headline',
    }),
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
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Full-screen background image (recommended: 1920x1080+)',
      hidden: ({ parent }) => parent?.backgroundType === 'video',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video (Upload)',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload video file (MP4 recommended, max 100MB). For larger videos, use the URL field below.',
      hidden: ({ parent }) => parent?.backgroundType !== 'video',
    }),
    defineField({
      name: 'backgroundVideoUrl',
      title: 'Background Video URL (Alternative)',
      type: 'url',
      description: 'External video URL. Use this for large videos hosted elsewhere (e.g., /uploads/backgrounds/hero-video.mp4)',
      hidden: ({ parent }) => parent?.backgroundType !== 'video',
    }),
    defineField({
      name: 'videoPoster',
      title: 'Video Poster Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Fallback image shown while video loads (recommended)',
      hidden: ({ parent }) => parent?.backgroundType !== 'video',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Call-to-action button text (leave empty to hide)',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      description: 'URL for the CTA button',
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'Full Screen', value: 'default' },
          { title: 'Compact (70vh)', value: 'small' },
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage',
      backgroundType: 'backgroundType',
    },
    prepare({ title, media, backgroundType }) {
      return {
        title: title || 'Hero Section',
        subtitle: `Hero (${backgroundType === 'video' ? 'Video' : 'Image'})`,
        media,
      }
    },
  },
})

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
        accept: 'video/mp4,video/webm',
      },
      description: 'Upload video file (MP4/WebM, max 50MB recommended). Large files may timeout - use URL field below instead.',
      validation: (Rule) => Rule.custom((value: any) => {
        if (!value) return true
        // Note: File size validation happens on upload, not here
        return true
      }),
      hidden: ({ parent }) => parent?.backgroundType !== 'video',
    }),
    defineField({
      name: 'backgroundVideoUrl',
      title: 'Background Video URL (Recommended for large files)',
      type: 'string',
      description: 'Path to video in /public folder (e.g., /uploads/backgrounds/hero-video.mp4) or external URL. Use this for files over 50MB to avoid upload timeouts.',
      placeholder: '/uploads/backgrounds/hero-video.mp4',
      validation: (Rule) => Rule.custom((value: any, context: any) => {
        const parent = context.parent as any
        // At least one video source is required when backgroundType is video
        if (parent?.backgroundType === 'video' && !value && !parent?.backgroundVideo) {
          return 'Either upload a video or provide a video URL'
        }
        return true
      }),
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

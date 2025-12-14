import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial Section',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Author Role/Title',
      type: 'string',
      description: 'e.g., "CEO, Company Name"',
    }),
    defineField({
      name: 'image',
      title: 'Author Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Centered', value: 'centered' },
          { title: 'With Image Left', value: 'image-left' },
          { title: 'With Image Right', value: 'image-right' },
        ],
      },
      initialValue: 'centered',
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'quote',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Testimonial',
        subtitle: subtitle ? `"${subtitle.substring(0, 50)}..."` : 'Testimonial',
        media,
      }
    },
  },
})

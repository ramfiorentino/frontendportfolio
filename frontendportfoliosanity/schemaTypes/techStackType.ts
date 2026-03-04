import {defineField, defineType} from 'sanity'

export const techStackType = defineType({
  name: 'techStack',
  title: 'Tech Stack',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'SVG code as a string',
    }),
  ],
})

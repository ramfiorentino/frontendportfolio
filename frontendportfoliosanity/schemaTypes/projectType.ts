import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'slug', title: 'Slug', type: 'string'}),
    defineField({name: 'dateAndLocation', title: 'Date and Location', type: 'string'}),
    defineField({name: 'livesite', title: 'Live Site', type: 'url'}),
    defineField({name: 'shortDescription', title: 'Short Description', type: 'string'}),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'techStack'}]}],
    }),
    defineField({name: 'techStackText', title: 'Tech Stack Text', type: 'text'}),
    defineField({name: 'image', title: 'Image', type: 'image'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'keyFeatures'}]}],
    }),
    defineField({name: 'solutions', title: 'Solutions', type: 'text'}),
    defineField({name: 'gifUrl', title: 'GIF URL', type: 'url'}),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'value', title: 'Value', type: 'string'}),
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'highlight', title: 'Highlight', type: 'boolean'}),
          ],
        },
      ],
    }),
  ],
})

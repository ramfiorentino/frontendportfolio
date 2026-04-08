import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
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
    defineField({name: 'gifUrl', title: 'GIF / thumbnail image', type: 'image', options: {accept: 'image/*'}}),
    defineField({name: 'heroGifUrl', title: 'Hero GIF / image (project page)', type: 'image', options: {accept: 'image/*'}}),
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
            defineField({name: 'highlight', title: 'Highlight (filled chip)', type: 'boolean'}),
            defineField({name: 'isProjected', title: 'Is Projected?', type: 'boolean'}),
            defineField({name: 'source', title: 'Source (if projected)', type: 'string'}),
          ],
        },
      ],
    }),
    defineField({name: 'role', title: 'Role', type: 'string'}),
    defineField({name: 'githubUrl', title: 'GitHub URL', type: 'url'}),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'body', title: 'Body (prose)', type: 'text'}),
            defineField({
              name: 'bullets',
              title: 'Bullets (list)',
              type: 'array',
              of: [{type: 'string'}],
            }),
          ],
        },
      ],
    }),
    defineField({name: 'retrospective', title: "What I'd do differently", type: 'text'}),
  ],
})

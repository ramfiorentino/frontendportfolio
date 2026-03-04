import {defineField, defineType} from 'sanity'

export const keyFeaturesType = defineType({
  name: 'keyFeatures',
  title: 'Key Features',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Project + Title', type: 'string'}),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),  
  ],
})

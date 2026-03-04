import {defineField, defineType} from 'sanity'

export const bioType = defineType({
  name: 'bio',
  title: 'Bio',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Bio Heading',
      type: 'text',
    }),
    defineField({
      name: 'paragraphDesk',
      title: 'Bio Paragraph for Desktop',
      type: 'text',
    }),
    defineField({
      name: 'paragraphMobile',
      title: 'Bio Paragraph for Mobile',
      type: 'text',
    })
  ],
})
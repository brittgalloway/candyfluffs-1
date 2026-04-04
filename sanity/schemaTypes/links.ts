import {defineField, defineType} from 'sanity'

export const links = defineType({
  name: 'links',
  title: 'Link Page',
  type: 'document',
  fields: [
    defineField({
      title: 'Website Name',
      name: 'website_name',
      type: 'string',
    }),
    defineField({
      title: 'Website Link',
      name: 'href',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      })
    }),
    defineField({
      name: 'updatedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
})
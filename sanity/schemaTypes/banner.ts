import {defineField, defineType} from 'sanity'

export const banner = defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    defineField({
      title: 'Link',
      name: 'href',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      })
    }),
    defineField({
      title: 'Banner Image',
      name: 'banner_image',
      type: 'image',
      fields: [
        defineField({
          name: 'caption',
          type: 'string',
        }),
        defineField({
          name: 'alt_text',
          type: 'string',
        })
      ]
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
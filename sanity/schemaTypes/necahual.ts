import {defineField, defineType} from 'sanity'

export const necahualPage = defineType({
  name: 'necahual_page',
  title: 'Necahual Page',
  type: 'document',
  fields: [
    defineField({
      title: 'Page Title',
      name: 'page_title',
      type: 'string',
      description:'This will likely, literally be "Necahual"'
    }),
    defineField({
      title: 'Summary',
      name: 'summary',
      type: 'text',
      description:'This is a blurb about the comic.'
    }),
    defineField({
      title: 'Patreon Disclaimer',
      name: 'patreon_disclaim',
      type: 'string',
      description:'If applicable, meantion the discount for patreon members'
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'image',
      description:'A square image works best. WEBP and JPG prefered.',
      fields: [
        defineField({
          name: 'caption',
          type: 'string',
        }),
        defineField({
          name: 'attribution',
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
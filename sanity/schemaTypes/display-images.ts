import {defineField, defineType} from 'sanity'

export const imageGallery = defineType({
  name: 'imageGallery',
  title: 'Image Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [{type: 'image',
        fields: [
          defineField({
            name: 'caption',
            type: 'string',
          }),
          defineField({
            name: 'alt_text',
            type: 'string',
            validation: (rule) => rule.required(),
          })
        ],
      }],
      validation: (rule) => rule.required(),
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
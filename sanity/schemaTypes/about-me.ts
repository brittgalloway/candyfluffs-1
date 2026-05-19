import {defineField, defineType} from 'sanity'

export const aboutMe = defineType({
  name: 'about_me',
  title: 'About Me',
  type: 'document',
  fields: [
    defineField({
      title: 'gretting',
      name: 'greeting',
      type: 'string',
      description:'Greeting to the reader'
    }),
    defineField({
      title: 'Bio',
      name: 'bio',
      type: 'text',
      description:'This is a blurb about you!'
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'image',
      description:'Likely the C Joy image. WEBP and PNG prefered.',
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
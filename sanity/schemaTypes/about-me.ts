import { defineField, defineType } from 'sanity';

export const aboutMe = defineType({
  name: 'aboutMe',
  title: 'About Me',
  type: 'document',
  // Singleton — only one document of this type
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'bioImage',
      title: 'Bio Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string', validation: (r) => r.required() }),
      ],
    }),
  ],
  preview: {
    select: { title: 'bio.0.children.0.text', media: 'bioImage' },
  },
});
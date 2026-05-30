import { defineField, defineType } from 'sanity';

export const necahual = defineType({
  name: 'necahual',
  title: 'Necahual Page',
  type: 'document',
  // Singleton — only one document of this type
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'pageTitle', title: 'Page Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'necahualImage',
      title: 'Necahual Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string', validation: (r) => r.required() }),
      ],
    }),
    defineField({ name: 'patreonDisclaimer', title: 'Patreon Disclaimer', type: 'text' }),
  ],
  preview: {
    select: { title: 'pageTitle', media: 'necahualImage' },
  },
});
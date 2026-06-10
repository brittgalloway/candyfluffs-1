import { defineField, defineType } from 'sanity';

export const linkPage = defineType({
  name: 'linkPage',
  title: 'Link',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'url', title: 'URL', type: 'url', validation: (r) => r.required() }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'url' },
  },
});
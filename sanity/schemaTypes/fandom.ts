import { defineField, defineType } from 'sanity';

export const fandom = defineType({
  name: 'fandom',
  title: 'Fandom',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
});
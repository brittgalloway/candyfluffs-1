import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'price', title: 'Price', type: 'number', validation: (r) => r.required().min(0) }),
    defineField({ name: 'weight', title: 'Weight (grams)', type: 'number' }),
    defineField({ name: 'size', title: 'Size', type: 'string' }),
    defineField({ name: 'fandoms', title: 'Fandom', type: 'string' }),
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: {
        list: ['Book', 'Print', 'Scroll', 'Charm', 'Button', 'Sticker'],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'productImages',
      title: 'Product Images',
      description: 'Upload images (jpg, png, webp), GIFs, or WebM video files. Remember square formats are best!',
      type: 'array',
      of: [
        {
          type: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
          ],
        },
        {
          type: 'file',
          title: 'GIF or WebM',
          options: {
            accept: 'image/gif,video/webm',
          },
          fields: [
            defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
          ],
        },
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'variation',
      title: 'Variations',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'price', title: 'Price', type: 'number' }),
          defineField({ name: 'size', title: 'Size', type: 'string' }),
          defineField({ name: 'weight', title: 'Weight', type: 'number' }),
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
        ],
      }],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'productImages.0' },
  },
});
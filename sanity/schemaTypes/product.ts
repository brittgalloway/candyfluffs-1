import {defineField, defineType} from 'sanity'

const variantID = crypto.randomUUID();

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      title: 'Product Title',
      name: 'product_title',
      type: 'string',
    }),
    defineField({
      title: 'Price',
      name: 'price',
      type: 'number',
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'text',
    }),
    defineField({
        name: 'productType',
        type: 'string',
        options: {
            list: [
              { title: "book", value: "book" },
              { title: "button", value: "button" },
              { title: "print", value: "print" },
              { title: "charm", value: "charm" },
              { title: "sticker", value: "sticker" },
              { title: "scroll", value: "scroll" },
              { title: "shirt", value: "shirt" },
            ],
        },
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'fandom',
        type: 'string',
        options: {
            list: [
              { title: "castlevania", value: "castlevania" },
              { title: "danmei", value: "danmei" },
              { title: "ghibli", value: "ghibli" },
              { title: "inuyasha", value: "inuyasha" },
              { title: "miraculous ladybug", value: "miraculous-ladybug" },
              { title: "necahual", value: "necahual" },
              { title: "shonen", value: "shonen" },
              { title: "shoujo", value: "shoujo" },
              { title: "vampire hunter d", value: "vampire-hunter-d" },
            ],
        },
        validation: (rule) => rule.required(),
    }),
     defineField({
        title: 'Display Image(s)',
        name: 'display_images',
        type: 'reference', 
        to: [{type: 'imageGallery'}],
        description: 'The 1st image is also the thumbnail, so it should be a square. WEBP and JPG prefered.',
        validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'variant',
      type: 'array',
      of: [{ type:'document',
        fields: [
            defineField({
                name: 'ID',
                type: 'string',
                description: 'Identifier',
                initialValue: variantID,
            }),
            defineField({
                name: 'title',
                type: 'string',
                description: 'The defining difference, usually size, color,  or character name. Please put the default first.',
            }),
            defineField({
              title: 'Variant Image',
              name: 'variant_image',
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
                name: 'price',
                type: 'number',
                description: 'variant price',
            }),
            defineField({
              title: 'Weight (g)',
              name: 'weight',
              type: 'number',
            }),
            defineField({
              title: 'Size (H x W)',
              name: 'height',
              type: 'string',
            }),
            defineField({
                name: 'stock',
                type: 'number',
                description: 'No negative numbers',
            }),
        ]
      }],
    }),
    defineField({
      title: 'Stock',
      name: 'stock',
      type: 'number',
    }),
    defineField({
      title: 'SKU',
      name: 'sku',
      type: 'string',
    }),
    defineField({
      title: 'Weight (g)',
      name: 'weight',
      type: 'number',
    }),
    defineField({
      title: 'Size (H x W)',
      name: 'height',
      type: 'string',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
      source: 'title',
      slugify: input => input
                .toLowerCase()
                .replace(/\s+/g, '-')
                .slice(0, 200)
    }
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
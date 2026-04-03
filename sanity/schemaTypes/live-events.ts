import {defineField, defineType} from 'sanity'

export const liveEvent = defineType({
  name: 'live_event',
  title: 'Live Events',
  type: 'document',
  fields: [
    defineField({
      title: 'Website',
      name: 'href',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      })
    }),
    defineField({
      title: 'Event Name',
      name: 'event_name',
      type: 'string',
    }),
    defineField({
      title: 'Start Date',
      name: 'start_date',
      type: 'date',
    }),
    defineField({
      title: 'End Date',
      name: 'end_date',
      type: 'date',
    }),
    defineField({
      title: 'Address',
      name: 'address',
      type: 'string',
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
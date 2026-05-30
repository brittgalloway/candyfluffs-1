import { defineField, defineType } from 'sanity';

export const liveEvent = defineType({
  name: 'liveEvent',
  title: 'Live Event',
  type: 'document',
  fields: [
    defineField({ name: 'eventName', title: 'Event Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'startDate', title: 'Start Date', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'endDate', title: 'End Date', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'website', title: 'Website', type: 'url' }),
    defineField({ name: 'address', title: 'Address', type: 'string' }),
  ],
  preview: {
    select: { title: 'eventName', subtitle: 'startDate' },
  },
});
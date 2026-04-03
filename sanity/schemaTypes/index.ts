import { type SchemaTypeDefinition } from 'sanity';
import { banner } from './banner';
import { liveEvent } from './live-events';


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    banner,
    liveEvent,
  ],
}

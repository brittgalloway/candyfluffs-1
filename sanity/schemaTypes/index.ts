import { type SchemaTypeDefinition } from 'sanity';
import { banner } from './banner';
import { liveEvent } from './live-events';
import { necahualPage } from './necahual';
import { aboutMe } from './about-me';
import { links } from './links';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    banner,
    liveEvent,
    necahualPage,
    aboutMe,
    links,
    
  ],
}

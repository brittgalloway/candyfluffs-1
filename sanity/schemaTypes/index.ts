import { type SchemaTypeDefinition } from 'sanity';
import { banner } from './banner';
import { liveEvent } from './live-events';
import { necahualPage } from './necahual';
import { aboutMe } from './about-me';
import { links } from './links';
import { product } from './product';
import { imageGallery } from './display-images';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    banner,
    liveEvent,
    necahualPage,
    aboutMe,
    links,
    product,
    imageGallery,
  ],
}

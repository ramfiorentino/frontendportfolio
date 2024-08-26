import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanityClient';
const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

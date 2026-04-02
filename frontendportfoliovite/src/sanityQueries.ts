import sanityClient from './sanityClient';

export const fetchProjectById = async (slug: string) => {
  const query = `*[_type == "project" && slug == $slug][0] {
    _id,
    title,
    slug,
    dateAndLocation,
    shortDescription,
    livesite,
    image,
    "description": description,
    "techStack": techStack[]->{
      _id,
      title,
      icon
    },
    techStackText,
    "keyFeatures": keyFeatures[]->{
      _id,
      title,
      "imageUrl": images[0].asset->url,
      description
    },
    solutions,
    gifUrl,
    heroGifUrl,
    "metrics": metrics,
    role,
    githubUrl,
    "sections": sections[] {
      title,
      body,
      bullets
    },
    retrospective
  }`;

  return await sanityClient.fetch(query, { slug });
};

export const fetchAllProjectSlugs = async (): Promise<{ title: string; slug: string }[]> => {
  const query = `*[_type == "project"] | order(_createdAt asc) { title, slug }`;
  return await sanityClient.fetch(query);
};

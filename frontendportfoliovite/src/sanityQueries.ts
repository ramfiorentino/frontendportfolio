import sanityClient from './sanityClient'; // Ensure this is the correct path to your Sanity client

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
      "imageUrl": images[0].asset->url, // Assuming you want to display the first image
      description
    },
    solutions
  }`;

  const params = { slug };
  return await sanityClient.fetch(query, params);
};

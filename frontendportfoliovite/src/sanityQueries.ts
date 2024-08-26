import sanityClient from './sanityClient'; // Ensure this is the correct path to your Sanity client

export const fetchProjectById = async (projectId: string) => {
  const query = `*[_type == "project" && _id == $projectId][0] {
    _id,
    title,
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

  const params = { projectId };
  return await sanityClient.fetch(query, params);
};

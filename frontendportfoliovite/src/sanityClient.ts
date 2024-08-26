import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '7dm3a4l2', // replace with your Sanity project ID
  dataset: 'production', // replace with your dataset name
  apiVersion: '2023-08-26', // use the current date
  useCdn: true, // `false` if you want to ensure fresh data
});

export default client;


// https://docs.astro.build/en/guides/content-collections/#defining-collections

import { z, defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),                           // Blog post title
      description: z.string(),                    // Blog post description
      author: z.string(),                         // Author's name
      authorImage: image().optional(),
      authorImageAlt: z.string().optional(),
      date: z.string().transform((str) => new Date(str)), // Convert string to Date object
      image: image(),                                         // Valid image formats
      categories: z.array(z.string()),            // Required array of categories
      tags: z.array(z.string()).optional(),       // Optional array of tags
    }),
});


export const collections = {
  docs: defineCollection({
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string(),
        heroImage: image().optional(),
        slug: z.string(),
      }),
  }),
  blog: blogCollection,
};

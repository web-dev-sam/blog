// 1. Import utilities from `astro:content`

import { z, defineCollection } from "astro:content";

// 2. Define a schema for each collection you'd like to validate.
const blogCollection = defineCollection({
    schema: z.object({
        draft: z.boolean().default(false),
        date: z.date().transform((str) => new Date(str)),
        title: z.string(),
        tags: z.array(z.string()).optional(),
        share: z
            .object({
                image: z.string().url().optional(),
                title: z.string(),
                description: z.string(),
            })
            .strict(),
    }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
    blog: blogCollection,
};

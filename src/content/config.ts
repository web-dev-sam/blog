import { z, defineCollection } from "astro:content";

export const collections = {
    blog: defineCollection({
        schema: z.object({
            draft: z.boolean().default(false),
            date: z.date().transform((str) => new Date(str)),
            title: z.string(),
            author: z.string(),
            cover: z.string(),
            tags: z.array(z.string()),
            devto: z.string().url(),
            share: z
                .object({
                    image: z.string().url().optional(),
                    title: z.string(),
                    description: z.string(),
                })
                .strict(),
        }),
    }),
    author: defineCollection({
        schema: z.object({
            name: z.string(),
            image: z.string(),
            devto: z.string().url().optional(),
            linkedin: z.string().url().optional(),
        }),
    }),
};

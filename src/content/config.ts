import { z, defineCollection } from "astro:content";

export const collections = {
    blog: defineCollection({
        schema: z.object({
            devtoid: z.number(),
            date: z.date().transform((str) => new Date(str)),
            moddate: z.date().transform((str) => new Date(str)),
            title: z.string(),
            author: z.string(),
            cover: z.string(),
            tags: z.array(z.string()),
            devto: z.string().url(),
            min: z.number(),
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
            devto: z.string().url(),
            linkedin: z.string().url(),
        }),
    }),
};

import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    updatedDate: z.string().optional(),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    socialImage: z.string().optional(),
    featuredRank: z.number().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    uiBlock: z.enum(["risk-checklist"]).optional(),
    faq: z.array(
      z.object({
        question: z.string(),
        answer: z.string()
      })
    ).optional()
  })
});

export const collections = { blog };

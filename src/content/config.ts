// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content"

// 2. Define a schema for each collection you'd like to validate.
const projectCollection = defineCollection({
	schema: z.object({
		draft: z.boolean(),
		title: z.string(),
		description: z.string(),
		image: z.object({
			src: z.string(),
			alt: z.string()
		}),
		link: z.string(),
		tags: z.array(z.string()),
		createdDate: z.string().transform((string) => new Date(string))
	})
})

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
	project: projectCollection,
  };
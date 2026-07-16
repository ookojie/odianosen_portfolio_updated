import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Hardware/software projects: NFC card, PCB motor research, KiCad work, etc.
//
// Each entry is a folder, e.g. src/content/projects/my-project/index.md, with
// its images sitting right next to it. Image fields below use the `image()`
// helper: you reference images by relative path ("./cover.jpg") and Astro
// optimizes, resizes, and validates them at build time.
const projects = defineCollection({
	// pattern matches index.md one level down (src/content/projects/<slug>/index.md).
	loader: glob({ base: './src/content/projects', pattern: '*/index.md' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Start date, used for sorting. `status` (below) covers ongoing vs finished.
			date: z.coerce.date(),
			// Multiple tags per project, e.g. ["KiCad", "NFC"]
			tags: z.array(z.string()),
			coverImage: image(),
			galleryImages: z.array(image()).optional(),
			repoUrl: z.string().url().optional(),
			status: z.enum(['ongoing', 'completed']),
		}),
});

// Monthly writing: technical write-ups, French B2 journey, learning-in-public posts.
const writings = defineCollection({
	loader: glob({ base: './src/content/writings', pattern: '*/index.md' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			pubDate: z.coerce.date(),
			tags: z.array(z.string()),
			summary: z.string(),
			coverImage: image().optional(),
		}),
});

// Talks and events, e.g. Netca seminars.
const talks = defineCollection({
	loader: glob({ base: './src/content/talks', pattern: '*/index.md' }),
	schema: ({ image }) =>
		z.object({
			eventName: z.string(),
			date: z.coerce.date(),
			location: z.string(),
			topic: z.string(),
			audienceSize: z.number(),
			photos: z.array(image()).optional(),
			recordingUrl: z.string().url().optional(),
		}),
});

export const collections = { projects, writings, talks };

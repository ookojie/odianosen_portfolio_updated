import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const writings = await getCollection('writings');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: writings.map((writing) => ({
			title: writing.data.title,
			description: writing.data.summary,
			pubDate: writing.data.pubDate,
			link: `/writings/${writing.id}/`,
		})),
	});
}

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export const get = async (context) => {
  const blog = await getCollection('blog');

  return rss({
    title: 'Bagus Merta',
    description: 'software engineer from Indonesia who\'s passionate about Mobile and Front-end development',
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
       // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/blog/[slug]` routes
      link: `/blog/${post.slug}`,
    })),
  });
}
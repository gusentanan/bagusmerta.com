import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export const get = async (context) => {
  const blog = await getCollection('blog');
  const customDataTags = [
    // enable Atom feed, as some RSS readers use that format
    // https://www.fpds.gov/wiki/index.php/FAADC_Atom_Feed_Specifications_V_1.0
    `<atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />`,
    `<language>en-us</language>`,
  ];

  return rss({
    title: 'Bagus Merta',
    description: 'software engineer from Indonesia who\'s passionate about Mobile and Front-end development',
    site: context.site,
    customData: customDataTags.join(''),
    xmlns: {
      // the namespace that enables Atom feed
      atom: 'http://www.w3.org/2005/Atom',
      content: 'http://purl.org/rss/1.0/modules/content/',
    },
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      content: sanitizeHtml(parser.render(post.body)),
       // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/blog/[slug]` routes
      link: `/blog/${post.slug}`,
    })),
  });
}
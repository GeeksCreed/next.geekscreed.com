// import { createElement } from "react";
// import rehype2react from "rehype-react";
import unified from 'unified';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';
import rehypePrism from '@mapbox/rehype-prism';

export default async function markdownToHtml(markdown) {
  const result = await unified()
    .use(remarkParse)
    .use(remark2rehype)
    .use(rehypePrism)
    .use(html)
    // .use(rehype2react, { createElement: createElement })
    .process(markdown);

  return result.toString();
  // return result.result;
}

import TAGS from '../../_content/tags';

const TAGS_MAP = {};

TAGS.forEach((TAG) => {
  TAGS_MAP[TAG.slug] = TAG;
});

const getTagSlugs = () => {
  return Object.keys(TAGS_MAP);
};

export const getTagBySlug = (slug) => {
  return TAGS_MAP[slug];
};

const getTagObjectsFromTagSlugs = (tagSlugs = []) => {
  return tagSlugs.map((slug) => getTagBySlug(slug));
};

export default {
  getTagBySlug,
  getTagObjectsFromTagSlugs,
  getTagSlugs,
};

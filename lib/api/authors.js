import AUTHORS from '../../_content/authors';

const AUTHORS_MAP = {};

AUTHORS.forEach((author) => {
  AUTHORS_MAP[author.id] = author;
});

const getAuthorIds = () => {
  return Object.keys(AUTHORS_MAP);
};

export const getAuthorById = (slug) => {
  return AUTHORS_MAP[slug];
};

export const getAuthorsFromIds = (ids = []) => {
  return ids.map((id) => getAuthorById(id));
};

export default {
  getAuthorById,
  getAuthorsFromIds,
  getAuthorIds,
};

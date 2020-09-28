import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '@components/Layout';
import { AuthorAPI, PostAPI } from '@lib/api';
import HeroImage from '@components/Image/HeroImage';
import PostCard from '@components/PostCard';
import Head from 'next/head';

const Author = ({ author, posts }) => {
  const length = posts?.length;
  const site_title = process.env.NEXT_PUBLIC_SITE_TITLE;

  return (
    <Layout>
      <Head>
        <title> {`Posts by ${author.name} | ${site_title}`} </title>
      </Head>
      <main className="main-wrap">
        <HeroImage source={author.cover_image}>
          <div className="m-hero__content" data-aos="fade-down">
            <div
              className="m-hero-avatar"
              style={{
                backgroundImage: `url(${
                  author.profile_image ||
                  '/images/default-avatar-square-normal.jpg'
                })`,
              }}
            />

            <h1 className="m-hero-title">{author.name}</h1>

            {author.bio && <p className="m-hero-description">{author.bio}</p>}

            <div className="m-hero__meta">
              <ul className="m-hero-social">
                {author.website && (
                  <li>
                    <a
                      href={author.website}
                      target="_blank"
                      rel="noopener"
                      aria-label="Website"
                    >
                      {/* aria-label="{{t "Website"}}" */}
                      <span className="icon-globe"></span>
                    </a>
                  </li>
                )}
                {author.facebook && (
                  <li>
                    <a
                      href={`https://facebook.com/${author.facebook}`}
                      target="_blank"
                      rel="noopener"
                      aria-label="Facebook"
                    >
                      <span className="icon-facebook"></span>
                    </a>
                  </li>
                )}
                {author.twitter && (
                  <li>
                    <a
                      href={`https://twitter.com/${author.twitter}`}
                      target="_blank"
                      rel="noopener"
                      aria-label="Twitter"
                    >
                      <span className="icon-twitter"></span>
                    </a>
                  </li>
                )}
                {author.linkedin && (
                  <li>
                    <a
                      href={`https://linkedin.com/in/${author.linkedin}`}
                      target="_blank"
                      rel="noopener"
                      aria-label="Linkedin"
                    >
                      <span className="icon-linkedin"></span>
                    </a>
                  </li>
                )}
              </ul>

              <ul className="m-hero-stats">
                <li>
                  {length
                    ? `${length} ${length === 1 ? 'post' : 'posts'}`
                    : 'No Posts'}
                </li>
                {author.location && (
                  <React.Fragment>
                    <li>&bull;</li>
                    <li>{author.location}</li>
                  </React.Fragment>
                )}
              </ul>
            </div>
          </div>
        </HeroImage>

        <div className="l-content">
          <div className="l-wrapper" data-aos="fade-up" data-aos-delay="300">
            <div className="l-grid centered">
              {posts?.map((post) => (
                <PostCard post={post} key={post.slug} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Author;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const authorId = params.id as string;
  const author = AuthorAPI.getAuthorById(authorId);
  const posts = PostAPI.getPostsByAuthor(authorId, [
    'title',
    'published_at',
    'slug',
    'authors',
    'featured',
    'reading_time',
    'feature_image',
    'primary_tag',
    'tags',
  ]);

  return {
    props: {
      author,
      posts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const authorIds = AuthorAPI.getAuthorIds().map((id) => ({
    params: {
      id,
    },
  }));

  return {
    paths: authorIds,
    fallback: false,
  };
};

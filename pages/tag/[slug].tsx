import Head from 'next/head';
import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

import { TagAPI, PostAPI } from '@lib/api';

import Layout from '@components/Layout';
import HeroImage from '@components/Image/HeroImage';
import PostCard from '@components/PostCard';

const Tag = ({ tag, posts }) => {
  const length = posts?.length;

  const site_title = process.env.NEXT_PUBLIC_SITE_TITLE;

  return (
    <Layout>
      <Head>
        <title> {`Posts tagged under ${tag.name} | ${site_title}`} </title>
      </Head>
      <main className="main-wrap">
        <HeroImage source={tag.feature_image}>
          <div className="m-hero__content" data-aos="fade-down">
            <h1 className="m-hero-title bigger">{tag.name}</h1>
            {tag.description && (
              <p className="m-hero-description">{tag.description}</p>
            )}
            <div className="m-hero__meta">
              <ul className="m-hero-stats">
                <li>
                  {/* {{plural ../pagination.total empty=(t "No posts") singular=(t "1 post") plural=(t "% posts")}} {{t "with this tag"}} */}
                  {length
                    ? `${length} ${
                        length === 1 ? 'post' : 'posts'
                      } with this tag`
                    : 'No Posts'}
                </li>
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

export default Tag;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tagSlug = params.slug as string;
  const tag = TagAPI.getTagBySlug(tagSlug);
  const posts = PostAPI.getPostsByTag(tagSlug, [
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
      tag,
      posts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tagSlugs = TagAPI.getTagSlugs().map((slug) => ({
    params: {
      slug,
    },
  }));

  return {
    paths: tagSlugs,
    fallback: false,
  };
};

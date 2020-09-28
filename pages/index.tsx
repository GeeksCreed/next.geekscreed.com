import React from 'react';
import Head from 'next/head';

import { PostAPI, TagAPI } from '@lib/api';
import Layout from '@components/Layout';
import HeroImage from '@components/Image/HeroImage';
import PostCard from '@components/PostCard';
import FeaturedPosts from '@components/FeaturedPosts';

export default function Home(props) {
  const { posts, featuredPosts } = props;
  const site_title = process.env.NEXT_PUBLIC_SITE_TITLE;
  const site_description = process.env.NEXT_PUBLIC_SITE_DESCRIPTION;
  const site_cover_image = process.env.NEXT_PUBLIC_SITE_COVER_IMAGE;

  return (
    <Layout>
      <React.Fragment>
        <Head>
          <title>
            {site_title} | {site_description}
          </title>
        </Head>
        <main className="main-wrap">
          <HeroImage source={site_cover_image}>
            <div className="m-hero__content" data-aos="fade-down">
              <h1 className="m-hero-title bigger">{site_title}</h1>
              <p className="m-hero-description bigger">{site_description}</p>
            </div>
          </HeroImage>
          <div className="l-content">
            <div className="l-wrapper" data-aos="fade-up" data-aos-delay="300">
              <div className="l-grid centered">
                {featuredPosts?.length ? (
                  <FeaturedPosts posts={featuredPosts} />
                ) : null}
                {posts.map((post) => (
                  <PostCard post={post} key={post.slug} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const fieldsToGet = [
    'title',
    'published_at',
    'featured',
    'slug',
    'authors',
    'reading_time',
    'excerpt',
    'feature_image',
    'tags',
    'primary_tag',
  ];

  const posts = PostAPI.getAllPosts(fieldsToGet);

  const featuredPosts = PostAPI.getAllPosts(fieldsToGet, { featured: true });

  return {
    props: {
      posts,
      featuredPosts,
    },
  };
}

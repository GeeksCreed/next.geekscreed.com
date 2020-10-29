import { useEffect, useState, useLayoutEffect, useMemo, Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Tippy from '@tippyjs/react';
import { NextSeo } from 'next-seo';
import { useInView } from 'react-intersection-observer';

import { PostAPI, TagAPI } from '@lib/api';
import markdownToHtml from '@lib/markdownToHtml';
import { getPageUrl } from '@lib/utils';

import PageProgressButton from '@components/posts/PageProgressButton';
import Layout from '@components/Layout';
import HeroImage from '@components/Image/HeroImage';

// import 'prism-themes/themes/prism-darcula.css';

const DiscussionEmbed: React.ComponentType<any> = dynamic(
  () => import('disqus-react').then((mod) => mod.DiscussionEmbed),
  { ssr: false }
);

const loadPolyfills = async () => {
  if (typeof window.IntersectionObserver === 'undefined') {
    await import('intersection-observer');
  }
};

export default function Post({ post, tags }) {
  const router = useRouter();

  const [showContent, setShowContent] = useState(false);

  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    loadPolyfills();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const { ref: commentsSectionRef, inView: commentsSectionInView } = useInView({
    triggerOnce: true,
  });

  let url = getPageUrl(router.asPath);

  const site_title = process.env.NEXT_PUBLIC_SITE_TITLE;

  const title = `${post.title} | ${site_title}`;

  const disqusShortName = process.env.NEXT_PUBLIC_SITE_COMMENTS_DISQUS;

  const disqusConfig = useMemo(
    () => ({
      url: url,
      identifier: post.slug,
      title: title,
    }),
    []
  );

  const { primary_tag, authors } = post;

  const primary_author = authors[0];

  const handleLoadCommentsClick = () => setShowComment(true);

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <NextSeo
        title={title}
        canonical={url}
        twitter={{
          cardType: 'summary_large_image',
          handle: primary_author.twitter && `@${primary_author.twitter}`,
        }}
        openGraph={{
          type: 'article',
          url: url,
          title: title,
          description: post.excerpt,
          images: [{ url: post.feature_image }],
        }}
      />

      <main className="main-wrap">
        <article>
          <div className="l-content in-post">
            <HeroImage source={post.feature_image} post />
            <div
              className="l-wrapper in-post js-aos-wrapper"
              data-aos={showContent ? undefined : 'fade-up'}
              data-aos-delay="300"
            >
              <div className="l-post-content js-progress-content">
                <header className="m-heading">
                  <h1 className="m-heading__title in-post">{post.title}</h1>
                  <div className="m-heading__meta">
                    {primary_tag && (
                      <Fragment>
                        <Link href={`/tag/${primary_tag.slug}`}>
                          <a className="m-heading__meta__tag">
                            {primary_tag.name}
                          </a>
                        </Link>
                        <span
                          className="m-heading__meta__divider"
                          aria-hidden="true"
                        >
                          &bull;
                        </span>
                      </Fragment>
                    )}
                    <span className="m-heading__meta__time">
                      {post.published_at}
                    </span>
                  </div>
                </header>
                <div className="pos-relative js-post-content">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  <div className="m-share">
                    <div className="m-share__content js-sticky">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                        className="m-icon-button filled in-share"
                        target="_blank"
                        rel="noopener"
                        aria-label="Facebook"
                      >
                        <span
                          className="icon-facebook"
                          aria-hidden="true"
                        ></span>
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?text=${post.title}&url=${url}`}
                        className="m-icon-button filled in-share"
                        target="_blank"
                        rel="noopener"
                        aria-label="Twitter"
                      >
                        <span
                          className="icon-twitter"
                          aria-hidden="true"
                        ></span>
                      </a>
                      <PageProgressButton />
                    </div>
                  </div>
                  {tags?.length > 0 && (
                    <section className="m-tags in-post">
                      <h3 className="m-submenu-title">
                        Tags
                        {/* {{t "Tags"}} */}
                      </h3>
                      <ul>
                        {tags?.map((tag) => {
                          return (
                            <li key={tag.id}>
                              <Link href={`/tag/${tag.slug}`}>
                                <a>
                                  {/* {{ name }} */}
                                  {tag.name}
                                </a>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  )}
                </div>
              </div>
            </div>

            <section className="m-author">
              <div className="m-author__content">
                <div className="m-author__picture">
                  <Link href={`/author/${primary_author.id}`}>
                    <a
                      className="m-author-picture"
                      aria-label={primary_author.name}
                    >
                      <div
                        style={{
                          backgroundImage: `url(${
                            primary_author.profile_image ||
                            '/images/default-avatar-square-small.jpg'
                          })`,
                        }}
                      />
                    </a>
                  </Link>
                </div>
                <div className="m-author__info">
                  <h4 className="m-author__name">
                    <Link href={`/author/${primary_author.id}`}>
                      <a>{primary_author.name}</a>
                    </Link>
                  </h4>
                  {/* {{#has author="count:>1"}}
                <p className="m-small-text in-author-along-with">
                  {{authors separator=", " prefix=(t "Among with no break line") from="2"}}
                </p>
              {{/has}} */}
                  {primary_author.bio && (
                    <p className="m-author__bio">{primary_author.bio}</p>
                  )}
                  <ul className="m-author-links">
                    {primary_author.website && (
                      <li>
                        <a
                          href={primary_author.website}
                          target="_blank"
                          rel="noopener"
                          aria-label="Website"
                        >
                          <span
                            className="icon-globe"
                            aria-hidden="true"
                          ></span>
                        </a>
                      </li>
                    )}
                    {primary_author.facebook && (
                      <li>
                        <a
                          href={`https://facebook.com/${primary_author.facebook}`}
                          target="_blank"
                          rel="noopener"
                          aria-label="Facebook"
                        >
                          <span
                            className="icon-facebook"
                            aria-hidden="true"
                          ></span>
                        </a>
                      </li>
                    )}
                    {primary_author.twitter && (
                      <li>
                        <a
                          href={`https://twitter.com/${primary_author.twitter}`}
                          target="_blank"
                          rel="noopener"
                          aria-label="Twitter"
                        >
                          <span
                            className="icon-twitter"
                            aria-hidden="true"
                          ></span>
                        </a>
                      </li>
                    )}
                    {primary_author.linkedin && (
                      <li>
                        <a
                          href={`https://linkedin.com/in/${primary_author.linkedin}`}
                          target="_blank"
                          rel="noopener"
                          aria-label="Linkedin"
                        >
                          <span
                            className="icon-linkedin"
                            aria-hidden="true"
                          ></span>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </section>

            {disqusShortName && (
              <section className="m-comments" ref={commentsSectionRef}>
                <div className={`m-load-comments ${showComment ? 'hide' : ''}`}>
                  <div className="m-load-comments__line"></div>
                  <Tippy content="Load comments">
                    <button
                      className="m-icon-button filled as-load-comments js-tooltip js-load-comments"
                      onClick={handleLoadCommentsClick}
                    >
                      <span className="icon-comments"></span>
                    </button>
                  </Tippy>
                </div>

                <div
                  className={`m-load-comments__iframe l-wrapper in-comments js-comments-iframe ${
                    showComment ? '' : 'hide'
                  }`}
                  data-aos="fade-up"
                >
                  <div id="disqus_thread">
                    {commentsSectionInView && (
                      <DiscussionEmbed
                        shortname={disqusShortName}
                        config={disqusConfig}
                      />
                    )}
                  </div>
                </div>
              </section>
            )}
          </div>
        </article>
      </main>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = PostAPI.getPostBySlug(params.slug, [
    'title',
    'published_at',
    'slug',
    'authors',
    'content',
    'excerpt',
    'feature_image',
    'primary_tag',
    'tags',
  ]);

  const content = await markdownToHtml(post.content || '');

  const tags = TagAPI.getTagObjectsFromTagSlugs(post.tags);

  return {
    props: {
      post: {
        ...post,
        content,
      },
      tags,
    },
  };
}

export async function getStaticPaths() {
  const posts = PostAPI.getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

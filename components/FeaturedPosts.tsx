import { FC, Fragment, useEffect } from 'react';
import classnames from 'classnames';
import Link from 'next/link';

interface Props {
  posts: any[];
}

const FeaturedPosts: FC<Props> = (props) => {
  const { posts } = props;

  useEffect(() => {
    import('@glidejs/glide').then((Glide) => {
      new Glide.default('.glide', {
        type: 'slider',
      }).mount();
    });
  }, []);

  return (
    <Fragment>
      <div className="m-featured-slider glide js-featured-slider">
        <div className="glide__track" data-glide-el="track">
          <div className="m-featured-slider__list glide__slides">
            {posts.map((post) => {
              const { primary_tag } = post;
              const primary_author = post.authors[0];
              return (
                <div
                  className="m-featured-slider__list__item glide__slide js-featured-slide"
                  key={post.slug}
                >
                  <article
                    className={classnames('m-featured-article', {
                      'no-picture': !post.feature_image,
                    })}
                  >
                    <div className="m-featured-article__picture">
                      {post.feature_image && (
                        <Fragment>
                          <style>
                            {/* #featured-bg-{{id}} {
                    background-image: url({{img_url feature_image size='l'}});
                  }
                
                  @media(max-width: 768px) {
                    #featured-bg-{{id}} {
                      background-image: url({{img_url feature_image size='m'}});
                    }
                  } */}
                          </style>
                          <div
                            id="featured-bg-{{id}}"
                            style={{
                              backgroundImage: `url(${post.feature_image})`,
                            }}
                          ></div>
                        </Fragment>
                      )}
                    </div>
                    <div className="m-featured-article__meta">
                      <Link href={`/author/${primary_author.id}`}>
                        <a
                          className="m-featured-article__author js-tooltip"
                          aria-label={primary_author.name}
                        >
                          {/*  data-tippy-content="{{t "Posted by"}} {{primary_author.name}} {{authors autolink="false" from="2" prefix=(t "Among with") separator=" , "}}" */}
                          <div
                            style={{
                              backgroundImage: `url(${
                                primary_author.profile_image ||
                                '/assets/images/default-avatar-square-small.jpg'
                              })`,
                            }}
                          />
                        </a>
                      </Link>
                      {primary_tag && (
                        <Link href={`/tag/${primary_tag.slug}`}>
                          <a className="m-featured-article__tag">
                            {primary_tag.name}
                          </a>
                        </Link>
                      )}
                    </div>
                    <div className="m-featured-article__ribbon">
                      <span className="icon-star"></span>
                      <span>Featured</span>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <a href="{{url}}" className="m-featured-article__content">
                        <h2
                          className="m-featured-article__title js-featured-article-title"
                          title="{{title}}"
                        >
                          {post.title}
                        </h2>
                        <div className="m-featured-article__timestamp">
                          <span>{post.published_at}</span>
                          <span>&bull;</span>
                          <span>{post.reading_time}</span>
                        </div>
                      </a>
                    </Link>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
        <div
          data-glide-el="controls"
          className="glide__arrows js-featured-slider-controls"
        >
          <button
            data-glide-dir="<"
            className="m-icon-button in-featured-articles glide-prev js-featured-slider-previous"
            aria-label="Previous"
          >
            <span className="icon-arrow-left" aria-hidden="true"></span>
          </button>
          <button
            data-glide-dir=">"
            className="m-icon-button in-featured-articles glide-next js-featured-slider-next"
            aria-label="Next"
          >
            <span className="icon-arrow-right" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default FeaturedPosts;

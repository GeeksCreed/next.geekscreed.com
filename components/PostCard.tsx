import React from 'react';
import Link from 'next/link';
import Tippy from '@tippyjs/react';
import Image from './Image/Image';

const PostCard = (props) => {
  const { post } = props;

  const { primary_tag, authors } = post;

  const primary_author = authors[0];

  const cardContent = (
    <Link href={`/blog/${post.slug}`}>
      <a className="m-article-card__info-link" aria-label={post.title}>
        <div>
          <h2
            className="m-article-card__title js-article-card-title"
            title={post.title}
          >
            {post.title}
          </h2>
        </div>
        <div className="m-article-card__timestamp">
          <span>{post.published_at}</span>
          <span>&bull;</span>
          <span>{post.reading_time}</span>
        </div>
      </a>
    </Link>
  );

  return (
    <article className="m-article-card  post">
      {/* {{#unless feature_image}}no-picture{{/unless}} */}
      <div className="m-article-card__picture">
        <Link href={`/blog/${post.slug}`}>
          <a
            className="m-article-card__picture-link"
            aria-hidden="true"
            tabIndex={-1}
          ></a>
        </Link>
        <Image
          className="m-article-card__picture-background"
          loading="lazy"
          source={post.feature_image}
          alt=""
        />
        <Link href={`/author/${primary_author.id}`}>
          <a
            className="m-article-card__author js-tooltip"
            aria-label={primary_author.name}
          >
            <Tippy content={`Posted by ${primary_author.name}`}>
              <React.Fragment>
                {/* data-tippy-content="{{t "Posted by"}} {{primary_author.name}} {{authors autolink="false" from="2" prefix=(t "Among with") separator=" , "}}" */}
                {/* {{#if primary_author.profile_image}} */}
                {/* {{else}} */}
                {/* <div style="background-image: url({{asset "images/default-avatar-square-small.jpg"}});"></div> */}
                {/* {{/if}} */}
                <div
                  style={{
                    backgroundImage: `url(${
                      primary_author.profile_image ||
                      '/assets/images/default-avatar-square-small.jpg'
                    })`,
                  }}
                />
              </React.Fragment>
            </Tippy>
          </a>
        </Link>
        {post.featured && (
          <Link href={`/blog/${post.slug}`}>
            <a className="m-article-card__featured js-tooltip">
              {/* data-tippy-content="{{t "Featured"}}" aria-label="{{t "Featured"}}" */}
              <span className="icon-star" aria-hidden="true"></span>
            </a>
          </Link>
        )}
      </div>
      {primary_tag ? (
        <div className="m-article-card__info">
          <Link href={`/tag/${primary_tag.slug}`}>
            <a className="m-article-card__tag">{primary_tag.name}</a>
          </Link>
          {cardContent}
        </div>
      ) : (
        <div className="m-article-card__info no-tag">{cardContent}</div>
      )}
    </article>
  );
};

{
  /* <div className="m-recommended-slider__item glide__slide">
    </div> */
}

export default PostCard;

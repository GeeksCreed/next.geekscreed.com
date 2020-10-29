import { useEffect, useState } from 'react';
import classnames from 'classnames';

import { useLqipImage } from './hooks';

import styles from './Image.module.scss';

interface Props {
  source: any;
  post?: boolean;
  children?: React.ReactNode;
}

const HeroImage = (props: Props) => {
  const { source, children } = props;

  // const { lqipImage, image } = useLqipImage(source);

  return source ? (
    <section className="m-hero with-picture" data-aos="fade">
      <div
        style={{
          backgroundImage: `url(${source})`,
          // backgroundImage: `url(${image || lqipImage})`,
        }}
        className={classnames(
          'm-hero__picture',
          // styles.image,
          {
            'in-post': props.post,
            // [styles.imageBeforeLoad]: !image,
          }
        )}
      ></div>
      {children}
    </section>
  ) : (
    <section className="m-hero no-picture" data-aos="fade">
      {children}
    </section>
  );
};

export default HeroImage;

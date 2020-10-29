import { Fragment, useState } from 'react';
// import Img from 'react-optimized-image';
import { default as NextImage } from 'next/image';
import classnames from 'classnames';

import { useLqipImage } from './hooks';

import styles from './Image.module.scss';

interface Props extends HTMLImageElement {
  source: any;
}

const Image = (props) => {
  const { source, className, ...rest } = props;

  // const lqipImage = source ? require(`../../public${source}?lqip`) : null;

  // const { lqipImage, image } = useLqipImage(source);

  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Fragment>
      {/* <img
      {...rest}
      className={classnames(styles.image, className, {
        [styles.imageBeforeLoad]: !image,
      })}
      loading="lazy"
      src={image || lqipImage}
    /> */}
      <NextImage src={source} className={className} unsized quality={100} />
      {/* <NextImage
        src={source}
        className={className}
        width={4032}
        height={3024}
      /> */}
      {/* <img
        {...rest}
        src={source}
        className={className}
        loading="lazy"
        onLoad={handleImageLoad}
        style={{ opacity: loading ? 0 : undefined }}
      />
      <img
        {...rest}
        className={className}
        src={lqipImage}
        style={{ opacity: loading ? undefined : 0 }}
      /> */}
    </Fragment>
  );
};

export default Image;

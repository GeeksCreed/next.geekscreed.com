import { useState, useEffect } from 'react';

export const useLqipImage = (source) => {
  const [image, setFinalImage] = useState(null);

  const lqipImage = source ? require(`../../public${source}?lqip`) : null;

  useEffect(() => {
    setTimeout(() => {
      if (source)
        fetch(source)
          .then((res) => res.blob())
          .then((img) => {
            setFinalImage(URL.createObjectURL(img));
          });
    }, 0);
  }, [source]);

  return { lqipImage, image };
};

import { useEffect } from 'react';
import { useRouter } from 'next/router';

import * as gtag from '@lib/gtag';

import '../styles/fonts.css';

import '../styles/app.scss';
import '../styles/404.scss';
import '../styles/listing.scss';
import '../styles/post.scss';
import '../styles/home.scss';
import '../styles/tags.scss';

import '../styles/overrides.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    import('aos').then((AOS) =>
      AOS.init({
        once: true,
        startEvent: 'DOMContentLoaded',
      })
    );
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;

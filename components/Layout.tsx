import { Fragment } from 'react';
import Head from 'next/head';
import { NextSeo, SocialProfileJsonLd } from 'next-seo';

import Header from './Header';
import Footer from './Footer';

import 'tippy.js/dist/tippy.css';

const Layout = ({ children }) => {
  const favicon = process.env.NEXT_PUBLIC_SITE_ICON;
  const site_title = process.env.NEXT_PUBLIC_SITE_TITLE;
  const site_facebook = process.env.NEXT_PUBLIC_SITE_FACEBOOK;
  const site_twitter = process.env.NEXT_PUBLIC_SITE_TWITTER;
  const site_description = process.env.NEXT_PUBLIC_SITE_DESCRIPTION;
  const site_url = process.env.NEXT_PUBLIC_SITE_URL;

  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="preconnect" href="https://polyfill.io" />
        <link rel="dns-prefetch" href="https://polyfill.io" />

        <link rel="icon" href={favicon} />
      </Head>
      <NextSeo
        description={site_description}
        openGraph={{
          site_name: site_title,
          description: site_description,
        }}
        twitter={{
          site: `@${site_twitter}`,
        }}
      />

      <SocialProfileJsonLd
        type="Organization"
        name={site_title}
        url={site_url}
        sameAs={[
          `http://www.facebook.com/${site_facebook}`,
          `http://www.twitter.com/${site_twitter}`,
        ]}
      />
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

export default Layout;

import Layout from '@components/Layout';
import Link from 'next/link';

const Custom404Page = () => {
  return (
    <Layout>
      <main className="l-fullscreen">
        <section
          className="l-fullscreen__content"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h1 className="m-404-title">404</h1>
          <p className="m-404-subtitle">Page not found</p>
          <p className="m-404-text">
            Unfortunately the page you were looking for could not be found.
          </p>
          <Link href="/">
            <a className="m-button outlined">Go to the home page</a>
          </Link>
        </section>
      </main>
    </Layout>
  );
};

export default Custom404Page;

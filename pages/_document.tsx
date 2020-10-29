import { Fragment } from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_SITE_GOOGLE_ANALYTICS;
const GOOGLE_AD_SENSE_CLIENT =
  process.env.NEXT_PUBLIC_SITE_GOOGLE_AD_SENSE_CLIENT;

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    const isProduction = process.env.NODE_ENV === 'production';

    return (
      <Html lang="en">
        <Head>
          {isProduction && (
            <Fragment>
              {GOOGLE_AD_SENSE_CLIENT && (
                <script
                  data-ad-client={GOOGLE_AD_SENSE_CLIENT}
                  async
                  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                ></script>
              )}

              {GA_TRACKING_ID && (
                <Fragment>
                  <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                  />
                  <script
                    dangerouslySetInnerHTML={{
                      __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_TRACKING_ID}', {
                          page_path: window.location.pathname,
                        });
                      `,
                    }}
                  />
                </Fragment>
              )}
            </Fragment>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

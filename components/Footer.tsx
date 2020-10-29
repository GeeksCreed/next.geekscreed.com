const Footer = () => {
  const site_title = process.env.NEXT_PUBLIC_SITE_TITLE;

  const site_facebook = process.env.NEXT_PUBLIC_SITE_FACEBOOK;
  const site_twitter = process.env.NEXT_PUBLIC_SITE_TWITTER;

  return (
    <footer className="m-footer">
      <div className="m-footer__content">
        <p className="m-footer-copyright">
          <span>{site_title} &copy; 2020</span>
          <span>&nbsp; &bull; &nbsp;</span>

          <span>
            Theme by{' '}
            <a href="https://eduardogomez.io/" target="_blank" rel="noopener">
              Eduardo Gómez
            </a>
          </span>
          <span> &nbsp; </span>

          <span>
            {/* {{t "Published with"}}  */}
            Built with{' '}
            <a href="https://nextjs.org" target="_blank" rel="noopener">
              Next.js
            </a>
          </span>
        </p>

        <nav className="m-footer-social">
          {site_facebook && (
            <a
              href={`https://facebook.com/${site_facebook}`}
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
            >
              <span className="icon-facebook" aria-hidden="true"></span>
            </a>
          )}
          {site_twitter && (
            <a
              href={`https://twitter.com/${site_twitter}`}
              target="_blank"
              rel="noopener"
              aria-label="Twitter"
            >
              <span className="icon-twitter" aria-hidden="true"></span>
            </a>
          )}
          {/*
             
                  <a href="{{@site.url}}/rss" aria-label="RSS">
                    <span className="icon-rss" aria-hidden="true"></span>
                  </a> */}
        </nav>
        {/* <p className="m-footer-copyright jslicense">
                  <a href="{{asset "html/javascript.html"}}" rel="jslicense">{{t "JavaScript license information"}}</a>
                </p> */}
      </div>
    </footer>
  );
};

export default Footer;

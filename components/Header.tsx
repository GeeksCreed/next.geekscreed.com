import { useState, useEffect } from 'react';
import Link from 'next/link';
import Tippy from '@tippyjs/react';
import classnames from 'classnames';

import config from '../_content/config';
import navigation from '../_content/navigation';
import secondaryNavigation from '../_content/secondary-navigation';

const Header = () => {
  const [theme, setTheme] = useState('light');

  const [showSecondaryNavigation, setShowSecondaryNavigation] = useState(false);

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const currentSavedTheme = localStorage.getItem('theme');

    if (currentSavedTheme) {
      setTheme(currentSavedTheme);
    } else {
      const darkModeMatcher = window?.matchMedia(
        '(prefers-color-scheme: dark)'
      );

      if (darkModeMatcher?.matches) {
        setTheme('dark');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.querySelector('html').dataset.theme = theme;
  }, [theme]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked ? 'dark' : 'light';
    setTheme(value);
  };

  const handleMoreClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowSecondaryNavigation(true);
  };

  const toggleMobileMenu = () =>
    setShowMobileMenu((showMobileMenu) => !showMobileMenu);

  const handleOutsideClick = () => {
    setShowSecondaryNavigation(false);
  };

  const site_title = process.env.NEXT_PUBLIC_SITE_TITLE;

  const site_logo = process.env.NEXT_PUBLIC_SITE_LOGO;

  const mobileTopBar = (
    <div className="m-mobile-topbar" data-aos="fade-down">
      <button
        className="m-icon-button in-mobile-topbar js-open-menu"
        aria-label="Open menu"
        onClick={toggleMobileMenu}
      >
        <span className="icon-menu" aria-hidden="true"></span>
      </button>
      {site_logo ? (
        <Link href="/">
          <a className="m-logo in-mobile-topbar">
            <img src={site_logo} alt={site_title} />
          </a>
        </Link>
      ) : (
        <Link href="/">
          <a className="m-site-name in-mobile-topbar">{config.siteTitle}</a>
        </Link>
      )}
      {/* <button
        className="m-icon-button in-mobile-topbar js-open-search"
        aria-label="Open search"
      >
        <span className="icon-search" aria-hidden="true"></span>
      </button> */}
      <div className="m-icon-button in-mobile-topbar js-open-search"></div>
    </div>
  );

  const desktopTopBar = (
    <div
      className={classnames('m-menu js-menu', {
        opened: showMobileMenu,
      })}
    >
      <button
        className="m-icon-button outlined as-close-menu js-close-menu"
        onClick={toggleMobileMenu}
      >
        {/* aria-label="{{t "Close menu"}}" */}
        <span className="icon-close"></span>
      </button>
      <div className="m-menu__main" data-aos="fade-down">
        <div className="l-wrapper">
          <div className="m-nav js-main-nav">
            <nav className="m-nav__left js-main-nav-left" role="navigation">
              {/* aria-label="{{t "Main menu"}}" */}
              <ul>
                {site_logo ? (
                  <li className="only-desktop">
                    <Link href="/">
                      <a className="m-logo">
                        <img src={site_logo} alt={site_title} />
                      </a>
                    </Link>
                  </li>
                ) : (
                  <li className="only-desktop">
                    <Link href="/">
                      <a className="m-site-name in-desktop-menu">
                        {config.siteTitle}
                      </a>
                    </Link>
                  </li>
                )}
                {navigation.map((navigationItem, index) => (
                  <li
                    key={index}
                    className="nav-{{slug}}{{#if current}} nav-current{{/if}}"
                  >
                    <Link href={navigationItem.url}>
                      <a>{navigationItem.label}</a>
                    </Link>
                  </li>
                ))}
                {secondaryNavigation?.length > 0 && (
                  <Tippy
                    arrow
                    interactive
                    appendTo={() => document.body}
                    visible={showSecondaryNavigation}
                    onClickOutside={handleOutsideClick}
                    placement="bottom"
                    content={
                      <div id="secondary-navigation-template">
                        <ul className="m-secondary-menu">
                          {secondaryNavigation.map((navigationItem, index) => (
                            <li
                              key={index}
                              className="nav-{{slug}}{{#if current}} nav-current{{/if}}"
                            >
                              <Link href={navigationItem.url}>
                                <a> {navigationItem.label}</a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    }
                  >
                    <li className="more">
                      <span>
                        <a
                          href="#"
                          className="js-open-secondary-menu"
                          onClick={handleMoreClick}
                        >
                          {/* {{t "More"}} */}
                          More
                          <span
                            className="icon-chevron-down"
                            aria-hidden="true"
                          ></span>
                        </a>
                      </span>
                    </li>
                  </Tippy>
                )}
              </ul>
            </nav>

            <div className="m-nav__right">
              {/* <button className="m-icon-button in-menu-main js-open-search">
              aria-label="{{t "Open search"}}"
              <span className="icon-search" aria-hidden="true"></span>
              </button> */}
              <Tippy content="Toggle dark mode">
                <div className="m-toggle-darkmode js-tooltip" tabIndex={0}>
                  {/* data-tippy-content="{{t "Toggle dark mode"}}" */}
                  <label htmlFor="toggle-darkmode" className="sr-only">
                    {/* {{t "Toggle dark mode"}} */}
                    Toggle dark mode
                  </label>
                  <input
                    id="toggle-darkmode"
                    type="checkbox"
                    className="js-toggle-darkmode"
                    checked={theme === 'dark'}
                    onChange={handleThemeChange}
                  />
                  <div>
                    <span className="icon-moon moon" aria-hidden="true"></span>
                    <span className="icon-sunny sun" aria-hidden="true"></span>
                  </div>
                </div>
              </Tippy>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <header
      className={classnames('m-header with-picture js-header', {
        'mobile-menu-opened': showMobileMenu,
      })}
    >
      {mobileTopBar}
      {desktopTopBar}
    </header>
  );

  //               <li className="submenu-option js-submenu-option">
  //                 <button className="m-icon-button in-menu-main more js-toggle-submenu" aria-label="{{t "Open submenu"}}">
  //                   <span className="icon-more" aria-hidden="true"></span>
  //                 </button>
  //                 <div className="m-submenu js-submenu">
  //                   <div className="l-wrapper in-submenu">
  //                     <section className="m-recent-articles">
  //                       <h3 className="m-submenu-title in-recent-articles">{{t "Recent articles"}}</h3>
  //                       {{#get "posts" limit="4" order="published_at desc" as |recent|}}
  //                         {{#if recent}}
  //                           <div className="glide js-recent-slider">
  //                             <div className="glide__track" data-glide-el="track">
  //                               <div className="glide__slides">
  //                                 {{#foreach recent}}
  //                                 <div className="glide__slide">
  //                                   <a href="{{url}}" className="m-recent-article">
  //                                     <div className="m-recent-article__picture {{#unless feature_image}}no-picture{{/unless}}">
  //                                       {{#if feature_image}}
  //                                         <img src="{{img_url feature_image size="s"}}" loading="lazy" alt="">
  //                                       {{else}}
  //                                         <img src="{{asset "images/no-image.png"}}" loading="lazy" alt="">
  //                                       {{/if}}
  //                                     </div>
  //                                     <h3 className="m-recent-article__title js-recent-article-title" title="{{title}}">
  //                                       {{title}}
  //                                     </h3>
  //                                     <span className="m-recent-article__date">{{date published_at timeago="true"}}</span>
  //                                   </a>
  //                                 </div>
  //                                 {{/foreach}}
  //                               </div>
  //                             </div>
  //                           </div>
  //                         {{else}}
  //                           <div className="m-not-found in-recent-articles">{{t "No recent articles found :("}}</div>
  //                         {{/if}}
  //                       {{/get}}
  //                     </section>
  //                     <section className="m-tags">
  //                       <h3 className="m-submenu-title">{{t "Tags"}}</h3>
  //                       {{#get "tags" limit="10"}}
  //                         <ul>
  //                           {{#foreach tags}}
  //                             <li>
  //                               <a href="{{url}}">{{name}}</a>
  //                             </li>
  //                             {{else}}
  //                               <li className="m-not-found">{{t "No tags found :("}}</li>
  //                           {{/foreach}}
  //                         </ul>
  //                       {{/get}}
  //                     </section>
  //                   </div>
  //                 </div>
  //               </li>
  //             </ul>
  //           </nav>
  //
  //         </div>
  //       </div>
  //     </div>

  //   {{#if @site.secondary_navigation}}
  //
  //   {{/if}}
};

export default Header;

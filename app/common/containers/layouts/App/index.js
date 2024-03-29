import React from 'react';
import Helmet from 'react-helmet';

const { APP_ENV = 'local' } = global.process.env;

const ENV_TITLE = {
  preprod: '[Pre-production]',
  demo: '[Demo]',
  dev: '[Development]',
  local: '[Local]',
};

const App = ({ children }) => (
  <div>
    <Helmet
      htmlAttributes={{ lang: 'ru', amp: undefined }} // amp takes no value
      titleTemplate={[ENV_TITLE[APP_ENV], 'Messages Gateway  - %s'].filter(Boolean).join(' ')}
      defaultTitle="Панель управління"
      link={[
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/images/icons/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/images/icons/favicon-32x32.png',
          sizes: '32x32',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: '/images/icons/favicon-16x16.png',
          sizes: '16x16',
        },
        { rel: 'manifest', href: '/images/icons/manifest.json' },
        {
          rel: 'mask-icon',
          href: '/images/icons/safari-pinned-tab.svg',
          color: '#2c83b5',
        },
        { rel: 'shortcut icon', href: '/favicon.ico?v=216' },
      ]}
      meta={[
        { charset: 'utf-8' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          name: 'description',
          content: 'Messages Gateway - Панель управління',
        },
        { property: 'og:title', content: 'Панель управління' },
        { property: 'og:site_name', content: 'Messages Gateway' },
        {
          property: 'og:description',
          content: 'Messages Gateway - Панель управління',
        },
        { name: 'apple-mobile-web-app-title', content: 'Messages Gateway' },
        { name: 'application-name', content: 'Messages Gateway' },
        { name: 'msapplication-TileColor', content: '#2b5797' },
        {
          name: 'msapplication-TileImage',
          content: '/images/icons/mstile-150x150.png',
        },
        {
          name: 'msapplication-config',
          content: '/images/icons/browserconfig.xml',
        },
        { name: 'theme-color', content: '#ffffff' },
      ]}
    />
    {children}
  </div>
);

export default App;

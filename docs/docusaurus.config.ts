import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Awesome Mobile App Animations',
  tagline: 'A collection of animations from popular apps, built with React Native',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://adithyavis.github.io',
  baseUrl: '/awesome-mobile-app-animations/',

  organizationName: 'adithyavis',
  projectName: 'awesome-mobile-app-animations',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/adithyavis/awesome-mobile-app-animations/tree/main/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Awesome Mobile App Animations',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/adithyavis/awesome-mobile-app-animations',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
          ],
        },
        {
          title: 'Animations',
          items: [
            {
              label: 'Wolt - Image Loading',
              to: '/docs/animations/wolt-shop-loading',
            },
            {
              label: 'Duolingo - Drag Sort',
              to: '/docs/animations/duolingo-drag-sort',
            },
            {
              label: 'Threads - Pull to Refresh',
              to: '/docs/animations/threads-pull-to-refresh',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/adithyavis/awesome-mobile-app-animations',
            },
            {
              label: 'Author',
              href: 'https://bit.ly/3qSe5BN',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Adithya Viswamithiran. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

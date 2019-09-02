// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'Webpack',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: '/img/webpack.svg',
    infoLink: 'https://webpack.js.org',
    pinned: true,
  },
  {
    caption: 'Angular',
    image: '/img/angular.svg',
    infoLink: 'https://angular.io/',
    pinned: true,
  },
];

const sponsors = [
  {
    caption: 'CKEditor',
    image: 'https://ckeditor.com/assets/images/favicons/180x180-b998f23431.png',
    infoLink: 'https://ckeditor.com',
    pinned: true,
  },
  {
    caption: '38elements',
    image: 'https://avatars2.githubusercontent.com/u/2399132?s=460&v=4',
    infoLink: 'https://github.com/38elements',
    pinned: true,
  }
];

const algolia = {
  apiKey: '1cb245a69775e2d0a25930e5626dde28',
  indexName: 'terser'
}

const siteConfig = {
  title: 'terser', // Title for your website.
  tagline: 'JavaScript parser, mangler and compressor toolkit for ES6+',
  url: 'https://terser.org', // Your website URL
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  cname: 'terser.org',

  // Used for publishing and more
  projectName: 'terser.github.io',
  organizationName: 'terser',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {href: 'https://try.terser.org', label: 'REPL'},
    {doc: 'cli-usage', label: 'Docs'},
    {blog: true, label: 'Blog'},
    {search: true}
  ],

  users,
  sponsors,

  /* path to images for header/footer */
  headerIcon: 'img/terser-square-logo.png',
  footerIcon: 'img/terser-square-logo.png',
  favicon: 'img/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#fd5e1c',
    secondaryColor: '#16181d',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} terser.org`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  // docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/terser/website',

  algolia,
};

module.exports = siteConfig;

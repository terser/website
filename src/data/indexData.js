export const openCollectiveSponsors = require('./sponsors.json')

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
export const users = [
  {
    caption: 'Webpack',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: '/img/webpack.svg',
    infoLink: 'https://webpack.js.org',
    pinned: true
  },
  {
    caption: 'Angular',
    image: '/img/angular.svg',
    infoLink: 'https://angular.io/',
    pinned: true
  },
  {
    caption: 'Next.js',
    image: '/img/next.svg',
    fillBackground: true,
    infoLink: 'https://nextjs.org/',
    pinned: true
  },
  {
    caption: 'Parcel',
    image: '/img/parcel.png',
    infoLink: 'https://parceljs.org',
    pinned: true
  },
  {
    caption: 'Aurelia',
    image: '/img/aurelia.png',
    infoLink: 'https://aurelia.io',
    pinned: true
  }
];

export const sponsors = [
  {
    caption: 'CKEditor',
    image: 'https://avatars.githubusercontent.com/u/825710?s=200&v=4',
    infoLink: 'https://ckeditor.com',
    pinned: true
  },
  {
    caption: '38elements',
    image: 'https://avatars2.githubusercontent.com/u/2399132?s=460&v=4',
    infoLink: 'https://github.com/38elements',
    pinned: true
  }
].concat(openCollectiveSponsors);

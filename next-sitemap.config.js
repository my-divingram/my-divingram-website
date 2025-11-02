/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.my-divingram.com/',
  generateRobotsTxt: true,
  exclude: [
      // '/search',
      '/fish/kana/*',
  ],
};
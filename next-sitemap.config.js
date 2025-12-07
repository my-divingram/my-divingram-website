/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.my-divingram.com/',
  generateRobotsTxt: true,
  exclude: [
      '/fish/kana/*',
      '/fish/recent_updates.js',
  ],
};
/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');

const isProd = process.env.NODE_ENV === 'production';

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: !isProd,
  },
});

const withImages = require('next-images');
module.exports = withImages({
  esModule: true,
});

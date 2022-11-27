const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const { i18n } = require('./next-i18next.config');
module.exports = withPWA({
  reactStrictMode: true,
  i18n,
  pwa: {
    disable: process.env.NODE_ENV !== 'production',
    dest: 'public',
    runtimeCaching,
  },
  images: {
    domains: [
      'hz.mcjovial.dev',
      'hz-api.herokuapp.com',
      '151.106.113.197',
      'via.placeholder.com',
      'res.cloudinary.com',
      's3.amazonaws.com',
      '18.141.64.26',
      '127.0.0.1',
      'localhost',
      'picsum.photos',
      'lh3.googleusercontent.com',
      'api.teamxmv.com',
    ],
  },
  ...(process.env.FRAMEWORK_PROVIDER === 'graphql' && {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.graphql$/,
        exclude: /node_modules/,
        use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
      });

      config.module.rules.push({
        test: /\.ya?ml$/,
        type: 'json',
        use: 'yaml-loader',
      });

      return config;
    },
  }),
  typescript: {
    ignoreBuildErrors: true,
  },
});

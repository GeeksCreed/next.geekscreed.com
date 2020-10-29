const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // sassOptions: {
  //   includePaths: [join(__dirname, "styles")],
  // },
};

module.exports = withPlugins(
  [
    // [
    //   optimizedImages,
    //   {
    //     optimizeImagesInDev: true,
    //   },
    // ],
    withBundleAnalyzer,
  ],
  nextConfig
);

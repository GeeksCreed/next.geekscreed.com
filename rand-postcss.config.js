module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    [
      '@fullhuman/postcss-purgecss',
      {
        content: ['./src/**/*', './src/**/**/*'],
      },
    ],
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
  ],
};

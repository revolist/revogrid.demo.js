const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  stories: ['../stories/**/*.stories.([tj](s|sx)|mdx)', '../docs/**/*.stories.mdx'],
  addons: [
    '@storybook/preset-typescript',
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y'
  ],
  webpackFinal: (config) => {
    return webpackConfig(config);
  }
};


function webpackConfig(config) {
  config.stats = 'verbose';
  config.resolve.extensions.push('.scss');

  return {
    ...config,
    plugins: [...config.plugins, new VueLoaderPlugin()],
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.vue$/,
          loader: require.resolve('vue-loader'),
          options: {},
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ],
          include: path.resolve(__dirname, '../assets')
        },
        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader'],
        }
      ],
    },
    resolve: {
      ...config.resolve,
      extensions: [...config.resolve.extensions, '.vue'],
      alias: {
        ...config.resolve.alias,
        vue$: require.resolve('vue/dist/vue.esm.js'),
      },
    },
  };
}
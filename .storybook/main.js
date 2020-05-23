const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const Resolver = require('module-to-cdn');

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
    plugins: [
        ...config.plugins,
      new VueLoaderPlugin(),

      new DynamicCdnWebpackPlugin({
        env: 'production',
        resolver: (path, version, env) => {
          switch (true) {
            case /vue$/.test(path):
              return new Promise(resolve => {
                resolve({
                  "name": "vue",
                  "var": "Vue",
                  "url": `https://unpkg.com/vue@${version}/dist/vue.min.js`,
                  "version": version
                });
              });
          }
          return Resolver(path, version, env);
        }
      })
    ],
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
      extensions: [...config.resolve.extensions, '.vue', '.js', '.jsx', '.ts', '.tsx', '.json', '.mjs'],
      alias: {
        ...config.resolve.alias,
        vue$: require.resolve('vue/dist/vue.esm.js'),
      },
    },
  };
}
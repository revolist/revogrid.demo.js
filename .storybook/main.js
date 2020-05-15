module.exports = {
  stories: ['../stories/**/*.stories.([tj](s|sx)|mdx)'],
  addons: [
    '@storybook/preset-typescript',
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y'
  ],
};

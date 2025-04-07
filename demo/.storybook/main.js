const config = {
  stories: [
    '../src/**/*.mdx',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  addons: [
    '@storybook/addon-docs'
  ],
  docs: {
    autodocs: 'tag'
  }
};

export default config;

import { dirname, join, resolve } from 'path';

export default {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-links'),
    '@storybook/addon-storysource',
    'storybook-addon-performance',
    getAbsolutePath('storybook-dark-mode'),
    getAbsolutePath('storybook-addon-mock'),
    ...(process.env?.TRANSPILER === 'swc'
      ? [getAbsolutePath('storybook-addon-swc')]
      : [])
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {}
  },
  webpackFinal: async config => {
    // 👈 and add this here
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/': resolve(__dirname, '../src/')
    };
    return config;
  },
  docs: {
    autodocs: true
  }
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}

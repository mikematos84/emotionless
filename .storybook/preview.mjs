import withTheme, { themeType } from './decorators/withTheme/index.mjs';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  layout: 'fullscreen',
  storySort: {
    method: 'alphabetical',
    order: ['Welcome', 'Components'],
    locales: 'en-US'
  }
};

export const globalTypes = {
  ...themeType
};

export const decorators = [withTheme];

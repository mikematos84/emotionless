/* eslint-disable sort-keys */

/**
 * Basic light/dark mode colors pulled from
 * https://mui.com/material-ui/customization/dark-mode/
 */

import lightTheme from '../light';
import colors from './colors.json';

const darkTheme = {
  ...lightTheme,
  name: 'heavydev-dark',
  displayName: 'Heavydev Dark',
  description: 'The dark theme for heavydev',
  tokens: {
    ...lightTheme.tokens,
    colors
  }
};

export default darkTheme;

/* eslint-disable sort-keys */

/**
 * Basic light/dark mode colors pulled from
 * https://mui.com/material-ui/customization/dark-mode/
 */

import colors from './colors.json';
import sizing from './sizing.json';

const lightTheme = {
  name: 'heavydev-light',
  displayName: 'Heavydev Light',
  description: 'The light theme for heavydev',
  tokens: {
    colors,
    sizing
  }
};

export default lightTheme;

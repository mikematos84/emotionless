import { darkTheme, lightTheme } from '@/themes/heavydev';
import { startCase } from 'lodash';

const allThemes = [lightTheme, darkTheme];

export const themesMap = allThemes.map(theme => {
  const { name } = theme;
  return {
    id: name,
    title: startCase(name),
    theme
  };
});

import { LocalStorageProvider } from '@/context/localStorageContext';
import { ThemeProvider } from '@/context/themeContext';
import { THEME_EVENTS, subscribe, unsubscribe } from '@/themes/events';
import { useGlobals } from '@storybook/client-api';
import { useEffect } from 'react';
import { themesMap } from './themesMap.mjs';

export const themeType = {
  theme: {
    name: 'Theme',
    description: 'The theme to use for the component',
    defaultValue: themesMap?.[0]?.id,
    toolbar: {
      icon: 'paintbrush',
      items: themesMap.map(({ id, title }) => ({ value: id, title })),
      dynamicTitle: true,
      showName: true
    }
  }
};

const withTheme = (Story, context) => {
  const [globals, updateGlobals] = useGlobals();
  const themeSelector = themesMap.find(({ id }) => id === globals.theme) || {};
  const localStoragePrefix = 'sb_';

  useEffect(() => {
    localStorage.setItem(
      `${localStoragePrefix}darkMode`,
      themeSelector?.theme?.name.includes('dark')
    );
  }, [themeSelector]);

  // Update theme selector to dark them when dark mode is enabled
  useEffect(() => {
    const onChange = ({ detail: { darkMode } }) => {
      const [baseId] = themeSelector?.theme?.name.split('-');
      const themeId = `${baseId}-${darkMode ? 'dark' : 'light'}`;
      updateGlobals({ theme: themeId });
    };
    subscribe(THEME_EVENTS.ON_DARK_MODE_CHANGE, onChange);
    return () => unsubscribe(THEME_EVENTS.ON_DARK_MODE_CHANGE, onChange);
  }, []);

  return (
    <LocalStorageProvider prefix={localStoragePrefix}>
      <ThemeProvider theme={themeSelector?.theme} exposeTokens>
        <Story {...context} />
      </ThemeProvider>
    </LocalStorageProvider>
  );
};

export default withTheme;

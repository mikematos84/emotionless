import {
  THEME_EVENTS,
  dispatch,
  subscribe,
  unsubscribe
} from '@/themes/events';
import { toCssTokens } from '@/utils/cssHelpers';
import {
  ThemeProvider as EmotionThemeProvider,
  Global,
  css
} from '@emotion/react';
import PropTypes from 'prop-types';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useLocalStorage } from './localStorageContext';

const ThemeContext = createContext();
ThemeContext.displayName = 'ThemeContext';

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useArticleContext must be used within a ArticleProvider');
  }
  return context;
};

const themeTokens = (theme, prefersColorScheme) => css`
  @media (prefers-color-scheme: ${prefersColorScheme}) {
    /* Light mode overrides */
    :root {
      ${toCssTokens(theme?.tokens || {})}
    }
  }

  [data-prefers-color-scheme='${prefersColorScheme}'] {
    ${toCssTokens(theme?.tokens || {})}
  }
`;

const getPreferseColorScheme = () =>
  window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches
    ? 'dark'
    : 'light';

const ThemeProvider = ({ children, exposeTokens, theme, ...props }) => {
  const { items, setItems } = useLocalStorage();
  const [prefersColorScheme, setPrefersColorScheme] = useState(
    items?.prefersColorScheme || getPreferseColorScheme()
  );

  const themeProps = useMemo(
    () => ({
      exposeTokens,
      theme,
      ...props
    }),
    [exposeTokens, theme, props]
  );

  // subscribe system (css) change
  useEffect(() => {
    const onChange = ({ detail: { colorScheme } }) => {
      setPrefersColorScheme(colorScheme);
      setItems(prev => ({ ...prev, prefersColorScheme: colorScheme }));
    };
    subscribe(THEME_EVENTS.ON_PREFERS_COLOR_SCHEME_CHANGE, onChange);
    return () => {
      unsubscribe(THEME_EVENTS.ON_PREFERS_COLOR_SCHEME_CHANGE, onChange);
    };
  }, [setItems]);

  useEffect(() => {
    const [html] = document.getElementsByTagName('html');
    html.dataset.prefersColorScheme = prefersColorScheme;
  }, [prefersColorScheme]);

  // subscribe theme change from dropdown
  useEffect(() => {
    const [html] = document.getElementsByTagName('html');
    html.dataset.theme = theme?.name;
  }, [theme]);

  useEffect(() => {
    const onChange = () => {
      const value = getPreferseColorScheme();
      setPrefersColorScheme(value);
      dispatch(THEME_EVENTS.ON_PREFERS_COLOR_SCHEME_CHANGE, {
        colorScheme: value
      });
    };

    window
      ?.matchMedia?.('(prefers-color-scheme:dark)')
      ?.addEventListener('change', onChange);

    return () => {
      window
        ?.matchMedia?.('(prefers-color-scheme:dark)')
        ?.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={themeProps}>
      {exposeTokens && (
        <Global styles={() => themeTokens(theme, prefersColorScheme)} />
      )}
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  exposeTokens: PropTypes.bool,
  theme: PropTypes.shape({
    description: PropTypes.string,
    displayName: PropTypes.string,
    name: PropTypes.string,
    tokens: PropTypes.shape({})
  })
};

ThemeProvider.defaultProps = {
  children: undefined,
  exposeTokens: false,
  theme: {
    description: undefined,
    displayName: undefined,
    name: undefined,
    tokens: undefined
  }
};

export { ThemeProvider, useThemeContext };

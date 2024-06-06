export const THEME_EVENTS = {
  ON_DARK_MODE_CHANGE: 'onDarkModeChange',
  ON_PREFERS_COLOR_SCHEME_CHANGE: 'onPrefersColorSchemeChange'
};

export const subscribe = (type, callback) =>
  document.addEventListener(type, callback, { passive: true });

export const unsubscribe = (type, callback) =>
  document.removeEventListener(type, callback);

export const dispatch = (type, detail) =>
  document.dispatchEvent(new CustomEvent(type, { detail }));

export const customThemeEvent = (type, detail) =>
  new CustomEvent(type, { detail });

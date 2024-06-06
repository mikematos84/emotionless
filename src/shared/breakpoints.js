/* eslint-disable sort-keys */
/*
https://css-tricks.com/optimizing-large-scale-displays

48em, 768px, 'smartphone',
64em, 1024px, 'tablets',
85.375em, 1366px, 'desktop',
120em, 1920px, 'desktop-xl',
160em, 2560px, 'desktop-xxl',
*/

export const breakpoints = {
  sm: { maxWidth: 767 }, // smartphones
  md: { minWidth: 768 }, // tablets
  lg: { minWidth: 1024 }, // desktop
  xl: { minWidth: 1366 },
  xxl: { minWidth: 1920 },
  xxxl: { minWidth: 2560 }
};

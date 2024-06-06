import { breakpoints } from '../../shared/breakpoints';
import breakpointExists from './breakpointExists';

/**
 * Returns a min-width media query based on a breakpoint key
 *
 * @param {string} size
 * @returns {string}
 */

const respondToMinWidth = size => {
  if (!breakpointExists(size)) return false;
  const { minWidth, maxWidth } = breakpoints[size];
  return `@media screen and (min-width: ${minWidth || maxWidth}px)`;
};

export default respondToMinWidth;

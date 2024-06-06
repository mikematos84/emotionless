import { breakpoints } from '../../shared/breakpoints';
import breakpointExists from './breakpointExists';

/**
 * Returns a max-width media query based on a breakpoint key
 *
 * @param {string} size
 * @returns {string|boolean}
 */

const respondToMaxWidth = size => {
  if (!breakpointExists(size)) return false;
  const { minWidth, maxWidth } = breakpoints[size];
  return `@media screen and (max-width: ${minWidth || maxWidth}px)`;
};

export default respondToMaxWidth;

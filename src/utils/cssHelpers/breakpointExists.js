import { breakpoints } from '../../shared/breakpoints';

/**
 * Checks to see if a breakpoint key exists
 *
 * @param {string} size
 * @returns {boolean}
 */
const breakpointExists = size => {
  if (!breakpoints[size]) return false;
  return true;
};

export default breakpointExists;

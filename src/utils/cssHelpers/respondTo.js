import { kebabCase } from 'lodash';
import { breakpoints } from '../../shared/breakpoints';
import breakpointExists from './breakpointExists';

/**
 * Returns a media query based on a breakpoint key
 *
 * @param {string} size
 * @returns {string|boolean}
 */
const respondTo = size => {
  if (!breakpointExists(size)) return false;
  const breaks = Object.entries(breakpoints[size])
    .map(([key, value]) => {
      const width = kebabCase(key);
      return `(${width}: ${value}px)`;
    })
    .join(' and ');
  return `@media screen and ${breaks}`;
};

export default respondTo;

import { breakpoints } from '../../shared/breakpoints';
import breakpointExists from './breakpointExists';

/**
 * Returns an object of min/max values based on a breakpoint key. If the requested key does not contain a minWidth or maxWidth key value pair, the next closest required key value pairs will be resolved
 *
 * @param {string} size
 * @returns {object}
 */
const resolveMinMaxValues = {
  create: size => {
    if (!breakpointExists(size)) return false;

    const keys = Object.keys(breakpoints);
    const index = keys.indexOf(size);
    const prevSize = keys[index - 1];
    const nextSize = keys[index + 1];

    let { minWidth, maxWidth } = breakpoints[size];

    if (!minWidth) {
      const { minWidth: prevMinWidth, maxWidth: prevMaxWidth } =
        breakpoints[prevSize];
      minWidth = prevMinWidth || prevMaxWidth + 1 || 0;
    }

    if (!maxWidth) {
      const { minWidth: nextMinWidth, maxWidth: nextMaxWidth } =
        breakpoints[nextSize];
      maxWidth = nextMinWidth - 1 || nextMaxWidth;
    }

    return { maxWidth, minWidth };
  }
};

export default resolveMinMaxValues;

import resolveMinMaxValues from './resolveMinMaxValues';

/**
 * Returns a min/max width media query based on a minSize breakpoint key and maxSize breakpoint key
 *
 * @param {string} minSize
 * @param {string} maxSize
 * @returns
 */

const respondToMinMaxWidth = (minSize, maxSize) => {
  const { minWidth = 0 } = resolveMinMaxValues(minSize);
  const { maxWidth = undefined } = resolveMinMaxValues(maxSize);
  const breaks = [];
  if (!Number.isNaN(minWidth)) breaks.push(`(min-width: ${minWidth}px)`);
  if (!Number.isNaN(maxWidth)) breaks.push(`(max-width: ${maxWidth}px)`);
  return `@media screen and ${breaks.join(' and ')}`;
};

export default respondToMinMaxWidth;

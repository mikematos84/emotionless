/**
 * Converts rem size to pixel and accepts the base as second argument. default base is 16px
 *
 * @param {number|string} rem
 * @param {number} base
 * @returns {string}
 */
const toPixelValue = (rem, base = 16) => {
  let tempRem = rem;
  if (typeof rem === 'string' || rem instanceof String)
    tempRem = tempRem.replace('rem', '');

  tempRem = parseFloat(tempRem);
  return `${tempRem * base}px`;
};

export default toPixelValue;
